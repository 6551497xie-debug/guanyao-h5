import {
  useCallback,
  useEffect,
  useMemo,
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
  readCanonicalGravityAdmission,
  retryGravityEntryAcceptance,
} from "../services/xinmaiGravityEntryAdmissionController";
import {
  subscribeToRealityAdventureContinuityRevision,
} from "../services/xinmaiRealityAdventureContinuityRevisionObserver";
import {
  establishGravityObservationAvailable,
  recognizeGravityObservation,
} from "../services/xinmaiGravityEncounterContinuityController";
import {
  resolveGravityEncounterResumeDecision,
} from "../services/xinmaiGravityEncounterContinuityRecoveryAdapter";
import {
  readChoiceGrowthTerminalSummary,
} from "../services/xinmaiChoiceGrowthTerminalSummaryAdapter";
import { readXinmaiCanonicalBodyImprintRecovery } from "../services/xinmaiCanonicalBodyImprintRecoveryAdapter";
import {
  subscribeToXinmaiLivedGrowthRecoveryRevision,
} from "../services/xinmaiLivedGrowthRecoveryRevisionObserver";
import type {
  GravityEntryFailureReason,
  GravityEntryAdmission,
  GravityHostAcceptanceOutcome,
  GravityProductionRuntimeInput,
  GravityRouteAdmission,
  GravityRouteTicket,
} from "../types/xinmaiGravityEntryAdmission";
import type {
  GravityObservationRecognitionOutcome,
  GravityObservationRecognitionProvenance,
  GravityObservationResumeDecision,
} from "../types/xinmaiGravityObservationContinuity";
import type {
  ChoiceGrowthTerminalSummary,
  ChoiceGrowthTerminalSummaryRequest,
} from "../types/xinmaiChoicePresentationReadiness";
import type { XinmaiCanonicalBodyImprintDecision } from "../types/xinmaiCanonicalBodyImprint";

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
      continuityDecision: GravityObservationResumeDecision;
      growthTerminalSummary: ChoiceGrowthTerminalSummary;
      canonicalBodyImprintDecision: XinmaiCanonicalBodyImprintDecision;
      growthSummaryPending: boolean;
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
  const growthSummaryEpochRef = useRef(0);
  const continuityRefreshEpochRef = useRef(0);

  const createGrowthSummaryRequest = useCallback(
    (
      admission: GravityEntryAdmission,
    ): ChoiceGrowthTerminalSummaryRequest =>
      Object.freeze({
        identityReferences: admission.identityReferences,
        sourceEncounterCycleId:
          admission.sourceReality.encounterCycleId,
        gravityCycleId: admission.gravityCycleId,
        gravityObservationReferenceId:
          admission.gravityObservationReferenceId,
      }),
    [],
  );

  useEffect(() => {
    let cancelled = false;
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
      return () => {
        cancelled = true;
      };
    }
    const epoch = transactionEpochRef.current + 1;
    transactionEpochRef.current = epoch;
    void (async () => {
      const routeAdmission = await establishGravityRouteAdmission({
        routeTicket,
        identityReferences: identityRecovery.identityReferences,
      });
      observeGravityRouteAdmissionResult(routeAdmission);
      if (
        cancelled ||
        transactionEpochRef.current !== epoch
      ) return;
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
        await failGravityEntryAcceptance({
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
      const [
        continuityDecision,
        growthTerminalSummary,
        canonicalBodyImprintDecision,
      ] =
        await Promise.all([
          resolveGravityEncounterResumeDecision(
            routeAdmission.intent,
          ),
          readChoiceGrowthTerminalSummary(
            createGrowthSummaryRequest(routeAdmission.intent),
          ),
          readXinmaiCanonicalBodyImprintRecovery({
            identityReferences: routeAdmission.intent.identityReferences,
            visualContinuity: identityRecovery.visualContinuity,
          }),
        ]);
      if (
        cancelled ||
        transactionEpochRef.current !== epoch
      ) return;
      setAssembly(
        Object.freeze({
          status: "READY" as const,
          routeAdmission: routeAdmission.admission,
          admission: routeAdmission.intent,
          runtimeInput: runtimeInput.input,
          continuityDecision,
          growthTerminalSummary,
          canonicalBodyImprintDecision,
          growthSummaryPending: false,
        }),
      );
    })();
    return () => {
      cancelled = true;
    };
  }, [
    identityRecovery,
    routeTicket?.admissionReferenceId,
    routeTicket?.gravityCycleId,
    routeTicket?.gravityObservationReferenceId,
    createGrowthSummaryRequest,
  ]);

  const readyGrowthSummaryRequest = useMemo(
    () =>
      assembly.status === "READY"
        ? createGrowthSummaryRequest(assembly.admission)
        : null,
    [assembly, createGrowthSummaryRequest],
  );

  useEffect(() => {
    if (
      assembly.status !== "READY" ||
      identityRecovery.status !== "READY"
    ) {
      return undefined;
    }
    let cancelled = false;
    const admissionReferenceId =
      assembly.admission.admissionReferenceId;
    const gravityCycleId = assembly.admission.gravityCycleId;
    const sourceEncounterCycleId =
      assembly.admission.sourceReality.encounterCycleId;
    const currentAdmissionRevision =
      assembly.admission.revision;
    const routeAdmission = assembly.routeAdmission;
    const unsubscribe =
      subscribeToRealityAdventureContinuityRevision((notice) => {
        if (
          notice.encounterCycleId !==
            sourceEncounterCycleId
        ) {
          return;
        }
        const epoch = continuityRefreshEpochRef.current + 1;
        continuityRefreshEpochRef.current = epoch;
        void readCanonicalGravityAdmission({
          admissionReferenceId,
        }).then(async (admission) => {
          if (
            cancelled ||
            continuityRefreshEpochRef.current !== epoch ||
            admission === null ||
            admission.admissionReferenceId !==
              admissionReferenceId ||
            admission.gravityCycleId !== gravityCycleId ||
            admission.revision <= currentAdmissionRevision
          ) {
            return;
          }
          if (admission.state === "TERMINAL") {
            setAssembly(Object.freeze({
              status: "BLOCKED" as const,
              reason: "ADMISSION_NOT_CURRENT" as const,
              admissionReferenceId,
              gravityCycleId,
            }));
            return;
          }
          const runtimeInput =
            resolveGravityProductionRuntimeInput({
              admission,
              lifeSourceSession:
                identityRecovery.lifeSourceSession,
              visualContinuity:
                identityRecovery.visualContinuity,
            });
          if (runtimeInput.status !== "READY") return;
          const [
            continuityDecision,
            growthTerminalSummary,
            canonicalBodyImprintDecision,
          ] =
            await Promise.all([
              resolveGravityEncounterResumeDecision(admission),
              readChoiceGrowthTerminalSummary(
                createGrowthSummaryRequest(admission),
              ),
              readXinmaiCanonicalBodyImprintRecovery({
                identityReferences: admission.identityReferences,
                visualContinuity:
                  identityRecovery.visualContinuity,
              }),
            ]);
          if (
            cancelled ||
            continuityRefreshEpochRef.current !== epoch
          ) {
            return;
          }
          setAssembly(Object.freeze({
            status: "READY" as const,
            routeAdmission,
            admission,
            runtimeInput: runtimeInput.input,
            continuityDecision,
            growthTerminalSummary,
            canonicalBodyImprintDecision,
            growthSummaryPending: false,
          }));
        });
      });
    return () => {
      cancelled = true;
      continuityRefreshEpochRef.current += 1;
      unsubscribe();
    };
  }, [
    assembly,
    createGrowthSummaryRequest,
    identityRecovery,
  ]);

  useEffect(() => {
    if (readyGrowthSummaryRequest === null) return undefined;
    let cancelled = false;
    const refresh = () => {
      const epoch = growthSummaryEpochRef.current + 1;
      growthSummaryEpochRef.current = epoch;
      setAssembly((current) =>
        current.status === "READY"
          ? Object.freeze({
              ...current,
              growthSummaryPending: true,
            })
          : current,
      );
      void Promise.all([
        readChoiceGrowthTerminalSummary(readyGrowthSummaryRequest),
        readXinmaiCanonicalBodyImprintRecovery({
          identityReferences:
            readyGrowthSummaryRequest.identityReferences,
          visualContinuity: identityRecovery.status === "READY"
            ? identityRecovery.visualContinuity
            : { sourceReferenceId: "UNAVAILABLE" },
        }),
      ]).then(([growthTerminalSummary, canonicalBodyImprintDecision]) => {
        if (
          cancelled ||
          growthSummaryEpochRef.current !== epoch
        ) {
          return;
        }
        setAssembly((current) =>
          current.status === "READY" &&
          current.admission.gravityCycleId ===
            readyGrowthSummaryRequest.gravityCycleId &&
          current.admission.gravityObservationReferenceId ===
            readyGrowthSummaryRequest
              .gravityObservationReferenceId
            ? Object.freeze({
                ...current,
                growthTerminalSummary,
                canonicalBodyImprintDecision,
                growthSummaryPending: false,
              })
            : current,
        );
      });
    };
    const unsubscribe =
      subscribeToXinmaiLivedGrowthRecoveryRevision(refresh);
    return () => {
      cancelled = true;
      growthSummaryEpochRef.current += 1;
      unsubscribe();
    };
  }, [
    readyGrowthSummaryRequest?.gravityCycleId,
    readyGrowthSummaryRequest
      ?.gravityObservationReferenceId,
    readyGrowthSummaryRequest?.sourceEncounterCycleId,
    readyGrowthSummaryRequest?.identityReferences.sourceReferenceId,
  ]);

  const handleAcceptanceOutcome = useCallback(
    async (outcome: GravityHostAcceptanceOutcome) => {
      observeGravityHostAcceptanceOutcome(outcome);
      if (outcome.status === "GRAVITY_HOST_UNAVAILABLE") {
        const failed = await failGravityEntryAcceptance({
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
      const active = await commitGravityEntryActive(outcome);
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
        return;
      }
      void Promise.all([
        establishGravityObservationAvailable({
          admission: active,
          transaction: outcome.transaction,
        }),
        readChoiceGrowthTerminalSummary(
          createGrowthSummaryRequest(active),
        ),
      ]).then(
        ([continuityDecision, growthTerminalSummary]) => {
          setAssembly((current) =>
            current.status === "READY" &&
            current.admission.admissionReferenceId ===
              outcome.admissionReferenceId &&
            current.admission.gravityCycleId ===
              outcome.gravityCycleId
              ? Object.freeze({
                  ...current,
                  continuityDecision,
                  growthTerminalSummary,
                  growthSummaryPending: false,
                })
              : current,
          );
        },
      );
    },
    [createGrowthSummaryRequest],
  );

  const handleObservationRecognitionRequested = useCallback(
    async (
      recognition: GravityObservationRecognitionProvenance,
      expectedCheckpointRevision: number,
    ): Promise<GravityObservationRecognitionOutcome> => {
      if (assembly.status !== "READY") {
        return Object.freeze({
          status: "REJECTED" as const,
          decision: Object.freeze({
            status: "BLOCKED" as const,
            gravityObservationReferenceId: "unavailable",
            checkpointRevision: 0,
            recognition: null,
            choiceActionIntention: null,
            reason: "ADMISSION_NOT_CURRENT" as const,
          }),
        });
      }
      const result = await recognizeGravityObservation({
        admission: assembly.admission,
        gravityObservationReferenceId:
          assembly.continuityDecision
            .gravityObservationReferenceId,
        expectedCheckpointRevision,
        recognition,
      });
      if (
        result.status === "RECOGNIZED" ||
        result.status === "ALREADY_RECOGNIZED"
      ) {
        setAssembly((current) =>
          current.status === "READY"
            ? Object.freeze({
                ...current,
                continuityDecision: result.decision,
              })
            : current,
        );
      }
      return result;
    },
    [assembly],
  );

  const handleGrowthTerminalSummaryRefreshRequested =
    useCallback(async (): Promise<void> => {
      if (assembly.status !== "READY") return;
      const request = createGrowthSummaryRequest(
        assembly.admission,
      );
      const epoch = growthSummaryEpochRef.current + 1;
      growthSummaryEpochRef.current = epoch;
      setAssembly((current) =>
        current.status === "READY"
          ? Object.freeze({
              ...current,
              growthSummaryPending: true,
            })
          : current,
      );
      const growthTerminalSummary =
        await readChoiceGrowthTerminalSummary(request);
      if (growthSummaryEpochRef.current !== epoch) return;
      setAssembly((current) =>
        current.status === "READY" &&
        current.admission.gravityCycleId ===
          request.gravityCycleId &&
        current.admission.gravityObservationReferenceId ===
          request.gravityObservationReferenceId
          ? Object.freeze({
              ...current,
              growthTerminalSummary,
              growthSummaryPending: false,
            })
          : current,
      );
    }, [
      assembly,
      createGrowthSummaryRequest,
    ]);

  const handleExplicitDepartureCommitted = useCallback(() => {
    navigate("/launch-lab", { replace: true });
  }, [navigate]);

  const retry = useCallback(async () => {
    if (
      assembly.status !== "RETRYABLE" ||
      assembly.admissionReferenceId === null ||
      assembly.gravityCycleId === null ||
      identityRecovery.status !== "READY"
    ) {
      return;
    }
    const result = await retryGravityEntryAcceptance({
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
    void Promise.all([
      resolveGravityEncounterResumeDecision(result.intent),
      readChoiceGrowthTerminalSummary(
        createGrowthSummaryRequest(result.intent),
      ),
      readXinmaiCanonicalBodyImprintRecovery({
        identityReferences: result.intent.identityReferences,
        visualContinuity: identityRecovery.visualContinuity,
      }),
    ]).then(
      ([continuityDecision, growthTerminalSummary, canonicalBodyImprintDecision]) => {
        setAssembly(
          Object.freeze({
            status: "READY" as const,
            routeAdmission: result.admission,
            admission: result.intent,
            runtimeInput: runtimeInput.input,
            continuityDecision,
            growthTerminalSummary,
            canonicalBodyImprintDecision,
            growthSummaryPending: false,
          }),
        );
      },
    );
  }, [
    assembly,
    createGrowthSummaryRequest,
    identityRecovery,
  ]);

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
      continuityDecision={assembly.continuityDecision}
      growthTerminalSummary={assembly.growthTerminalSummary}
      canonicalBodyImprintDecision={
        assembly.canonicalBodyImprintDecision
      }
      growthSummaryPending={assembly.growthSummaryPending}
      onExplicitDepartureCommitted={
        handleExplicitDepartureCommitted
      }
      onGrowthTerminalSummaryRefreshRequested={
        handleGrowthTerminalSummaryRefreshRequested
      }
      onObservationRecognitionRequested={
        handleObservationRecognitionRequested
      }
      onAcceptanceOutcome={handleAcceptanceOutcome}
    />
  );
}
