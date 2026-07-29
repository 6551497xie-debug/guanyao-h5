import {
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { GravityProductionSurfaceHost } from "../components/GravityProductionSurfaceHost";
import { resolveGravityProductionRuntimeInput } from "../services/gravityProductionRuntimeInputAdapter";
import { recoverRealityRecognizedIdentity } from "../services/realityRecognizedIdentityRecoveryAdapter";
import {
  observeGravityActiveCommit,
  observeGravityHostAcceptanceOutcome,
  observeGravityRouteAdmissionResult,
  observeGravityRouteGuard,
} from "../services/gravityEntryAcceptanceRuntimePort";
import {
  commitGravityEntryActive,
  establishGravityRouteAdmission,
  failGravityEntryAcceptance,
  retryGravityEntryAcceptance,
} from "../services/xinmaiGravityEntryAdmissionController";
import type {
  GravityEntryFailureReason,
  GravityEntryAdmission,
  GravityHostAcceptanceOutcome,
  GravityProductionRuntimeInput,
  GravityRouteAdmission,
  GravityRouteTicket,
} from "../types/xinmaiGravityEntryAdmission";

type GravityRouteState =
  | Readonly<{ gravityRouteTicket?: GravityRouteTicket }>
  | null;

type GravityRouteAssemblyState =
  | Readonly<{ status: "PENDING" }>
  | Readonly<{
      status: "READY";
      routeAdmission: GravityRouteAdmission;
      admission: GravityEntryAdmission;
      runtimeInput: GravityProductionRuntimeInput;
    }>
  | Readonly<{
      status: "RETRYABLE" | "BLOCKED";
      reason: GravityEntryFailureReason;
      admissionReferenceId: string | null;
      gravityCycleId: string | null;
    }>;

export const GRAVITY_PRODUCTION_ROUTE_ENTRY_BOUNDARY =
  Object.freeze({
    exactDynamicsRouteOnly: true as const,
    postCommitAdmissionOnly: true as const,
    typedRecoveryViaControllerOnly: true as const,
    recognizedIdentityRecoveryOnly: true as const,
    routeStateIsTicketOnly: true as const,
    noRenderPhaseMutation: true as const,
    noDirectStorageRead: true as const,
    noDirectStorageWrite: true as const,
    noIdentityOnlyAdmission: true as const,
    noFixtureSource: true as const,
    noHistoricalPressureAuthority: true as const,
    routeCannotCommitActive: true as const,
    hostTypedOutcomeRequired: true as const,
  });

export function GravityProductionRouteEntry() {
  const location = useLocation();
  const navigate = useNavigate();
  const routeState = location.state as GravityRouteState;
  const routeTicket = routeState?.gravityRouteTicket ?? null;
  const [identityRecovery] = useState(() =>
    recoverRealityRecognizedIdentity(),
  );
  const [assembly, setAssembly] =
    useState<GravityRouteAssemblyState>(() =>
      Object.freeze({ status: "PENDING" as const }),
    );
  const transactionEpochRef = useRef(0);

  useEffect(() => {
    if (identityRecovery.status !== "READY") {
      observeGravityRouteGuard("IDENTITY_MISMATCH");
      setAssembly(
        Object.freeze({
          status: "BLOCKED" as const,
          reason: "IDENTITY_MISMATCH" as const,
          admissionReferenceId: null,
          gravityCycleId: null,
        }),
      );
      return;
    }
    const epoch = transactionEpochRef.current + 1;
    transactionEpochRef.current = epoch;
    const routeAdmission = establishGravityRouteAdmission({
      routeTicket,
      identityReferences: identityRecovery.identityReferences,
    });
    observeGravityRouteAdmissionResult(routeAdmission);
    if (transactionEpochRef.current !== epoch) return;
    if (routeAdmission.status !== "READY") {
      setAssembly(
        Object.freeze({
          status:
            routeAdmission.status === "RETRY_REQUIRED"
              ? "RETRYABLE" as const
              : "BLOCKED" as const,
          reason: routeAdmission.reason,
          admissionReferenceId:
            routeAdmission.intent?.admissionReferenceId ?? null,
          gravityCycleId:
            routeAdmission.intent?.gravityCycleId ?? null,
        }),
      );
      return;
    }
    const runtimeInput = resolveGravityProductionRuntimeInput({
      admission: routeAdmission.intent,
      lifeSourceSession: identityRecovery.lifeSourceSession,
      visualContinuity: identityRecovery.visualContinuity,
    });
    if (runtimeInput.status !== "READY") {
      failGravityEntryAcceptance({
        admissionReferenceId:
          routeAdmission.intent.admissionReferenceId,
        gravityCycleId: routeAdmission.intent.gravityCycleId,
        admissionRevision: routeAdmission.intent.revision,
        stage: "RUNTIME_INPUT",
        reason: "RUNTIME_INPUT_UNAVAILABLE",
      });
      setAssembly(
        Object.freeze({
          status: "RETRYABLE" as const,
          reason: "RUNTIME_INPUT_UNAVAILABLE" as const,
          admissionReferenceId:
            routeAdmission.intent.admissionReferenceId,
          gravityCycleId: routeAdmission.intent.gravityCycleId,
        }),
      );
      return;
    }
    setAssembly(
      Object.freeze({
        status: "READY" as const,
        routeAdmission: routeAdmission.admission,
        admission: routeAdmission.intent,
        runtimeInput: runtimeInput.input,
      }),
    );
  }, [
    identityRecovery,
    routeTicket?.admissionReferenceId,
    routeTicket?.gravityCycleId,
  ]);

  const handleAcceptanceOutcome = useCallback(
    (outcome: GravityHostAcceptanceOutcome) => {
      observeGravityHostAcceptanceOutcome(outcome);
      if (outcome.status === "GRAVITY_HOST_UNAVAILABLE") {
        const failed = failGravityEntryAcceptance({
          admissionReferenceId: outcome.admissionReferenceId,
          gravityCycleId: outcome.gravityCycleId,
          admissionRevision: outcome.admissionRevision,
          stage: "MINIMUM_SURFACE",
          reason: "MINIMUM_SURFACE_NOT_PRESENTED",
        });
        setAssembly(
          Object.freeze({
            status: "RETRYABLE" as const,
            reason: "MINIMUM_SURFACE_NOT_PRESENTED" as const,
            admissionReferenceId:
              failed?.admissionReferenceId ??
              outcome.admissionReferenceId,
            gravityCycleId:
              failed?.gravityCycleId ?? outcome.gravityCycleId,
          }),
        );
        return;
      }
      const active = commitGravityEntryActive(outcome);
      observeGravityActiveCommit(active);
      if (active?.state !== "ACTIVE_IN_GRAVITY") {
        setAssembly(
          Object.freeze({
            status: "RETRYABLE" as const,
            reason: "RECOVERY_AFTER_INCOMPLETE_ACCEPTANCE" as const,
            admissionReferenceId: outcome.admissionReferenceId,
            gravityCycleId: outcome.gravityCycleId,
          }),
        );
      }
    },
    [],
  );

  const retry = useCallback(() => {
    if (
      assembly.status !== "RETRYABLE" ||
      assembly.admissionReferenceId === null ||
      assembly.gravityCycleId === null ||
      identityRecovery.status !== "READY"
    ) {
      return;
    }
    const result = retryGravityEntryAcceptance({
      admissionReferenceId: assembly.admissionReferenceId,
      gravityCycleId: assembly.gravityCycleId,
      identityReferences: identityRecovery.identityReferences,
    });
    if (result.status !== "READY") return;
    const runtimeInput = resolveGravityProductionRuntimeInput({
      admission: result.intent,
      lifeSourceSession: identityRecovery.lifeSourceSession,
      visualContinuity: identityRecovery.visualContinuity,
    });
    if (runtimeInput.status !== "READY") return;
    setAssembly(
      Object.freeze({
        status: "READY" as const,
        routeAdmission: result.admission,
        admission: result.intent,
        runtimeInput: runtimeInput.input,
      }),
    );
  }, [assembly, identityRecovery]);

  if (assembly.status !== "READY") {
    return (
      <main
        className="gy-reality-route-guard"
        data-gravity-production-route={assembly.status}
      >
        <p role="status">
          {assembly.status === "PENDING"
            ? "同一生命正在靠近这次看见。"
            : "这次看见还没有被完整承接。"}
        </p>
        {assembly.status === "RETRYABLE" ? (
          <button type="button" onClick={retry}>
            继续靠近
          </button>
        ) : null}
        {assembly.status === "BLOCKED" ? (
          <button
            type="button"
            onClick={() => navigate("/launch-lab", { replace: true })}
          >
            回到生命世界
          </button>
        ) : null}
      </main>
    );
  }

  return (
    <GravityProductionSurfaceHost
      key={
        `${assembly.runtimeInput.gravityCycleId}:` +
        `${assembly.runtimeInput.admissionRevision}`
      }
      routeAdmission={assembly.routeAdmission}
      admission={assembly.admission}
      runtimeInput={assembly.runtimeInput}
      onAcceptanceOutcome={handleAcceptanceOutcome}
    />
  );
}
