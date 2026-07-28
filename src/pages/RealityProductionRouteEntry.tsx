import {
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { RealityProductionHost } from "../components/RealityProductionHost";
import {
  authorizeRealityProductionRoute,
  REALITY_PRODUCTION_ROUTE_TARGET,
} from "../services/realityProductionRouteAuthorization";
import {
  activateRealityRouteActivationSourceContext,
  captureExplicitRealityRequestDateSource,
  clearRealityRouteActivationSourceContext,
} from "../services/realityRouteActivationSourceContext";
import { bridgeRealityRouteToPressureCandidateActivation } from "../services/realityRoutePressureCandidateActivationBridge";
import { bridgeRealityRouteCandidateRequestContext } from "../services/realityRouteCandidateRequestContextBridge";
import { bridgeRealityRouteDeliveryOrchestration } from "../services/realityRouteDeliveryOrchestrationBridge";
import { resolveRealityProductionPressureHostInput } from "../services/realityProductionPressureHostInputContract";
import { createRealityPressureSeedContinuationContext } from "../services/realityPressureSeedContinuationContext";
import {
  activateGenesisRealityPresenceContinuityContext,
  readGenesisRealityPresenceContinuityContext,
} from "../services/genesisRealityPresenceContinuityBridge";
import { recoverRealityRecognizedIdentity } from "../services/realityRecognizedIdentityRecoveryAdapter";
import {
  commitRealityEncounterActive,
  establishRealityEncounterAdmission,
  failRealityEncounterAcceptance,
  readCurrentRealityEncounterIntent,
  retryRealityEncounterAcceptance,
  terminateRealityEncounter,
} from "../services/xinmaiRealityEncounterIntentController";
import { writeSelectedPressureSeedContext } from "../services/guanyaoSelectedPressureSeedContextPersistenceAdapter";
import { resolveDynamicsInputContext } from "../services/guanyaoDynamicsInputContextAdapter";
import { readPersonalityRingLite } from "../services/personalityRingLiteService";
import { resolveLifeUniverseCrystalSourceSlot } from "../renderers/lifeUniverseStarField";
import { GUANYAO_ROUTES } from "../routes/guanyaoRoutes";
import type {
  RealityProductionHostProps,
  RealityProductionRouteEntryBoundary,
} from "../types/realityProductionRouteEntry";
import type { DynamicsHandoffState } from "../types/gravityRuntimeInput";
import type {
  RealityEncounterFailureReason,
  RealityEncounterFailureStage,
  RealityHostAcceptanceOutcome,
} from "../types/xinmaiRealityEncounterIntent";

export const REALITY_PRODUCTION_ROUTE_ENTRY_BOUNDARY:
  RealityProductionRouteEntryBoundary = Object.freeze({
    productionRouteEntryOnly: true,
    exactRealityRouteOnly: true,
    inMemoryRealityEntryContextOnly: true,
    realityEncounterIntentAuthorityRequired: true,
    realityRouteActivationSourceContextRequired: true,
    pressureCandidateActivationContextRequired: true,
    pressureCandidateRequestContextRequired: true,
    pressureDeliveryOrchestrationRequired: true,
    pressureSeedContinuationContextRequired: true,
    genesisPresenceContinuityContextRequired: true,
    routeAuthorizationRequired: true,
    sourceNotReadyRecoveryRequired: true,
    sourceReferenceExcludedFromUrl: true,
    noFixtureSource: true,
    noPrototypeSource: true,
    noDefaultSource: true,
    noEngineInvocation: true,
    noPressureExecution: true,
    noGravityExecution: true,
    noChoiceExecution: true,
    noCrystalExecution: true,
    noRendererInvocation: true,
    noSourceRecalculation: true,
    noStorageRead: true,
    routeStateIsPresentationOnly: true,
    selectedPressureSeedHandoffWriteOnly: true,
    explicitDynamicsNavigationOnly: true,
    noGenesisNavigationMutation: true,
    noPresenceMutation: true,
  });

type RealityRouteState =
  | Readonly<{
      intentReferenceId?: string;
      visualContinuity?: RealityProductionHostProps["visualContinuity"];
      returningLifeMemory?: Readonly<{
        historicalRealityMemoryKey?: string | null;
        latestCrystalMemoryKey?: string | null;
        latestCrystalSourceSlot?: number | null;
      }>;
      returningEntry?: "SAME_LIFE_NEW_REALITY";
      choiceContinuation?: "AWAITING_LIVED_RESPONSE_RECOGNITION";
      choiceLifeTraceMemoryKey?: string;
      choiceLifeTraceSourceSlot?: number;
    }>
  | null;

type AcceptanceAssemblyFailure = Readonly<{
  stage: RealityEncounterFailureStage;
  reason: RealityEncounterFailureReason;
  guardReason: string;
}>;

export function RealityProductionRouteEntry() {
  const navigate = useNavigate();
  const location = useLocation();
  const routeState = location.state as RealityRouteState;
  const routeVisualContinuity = routeState?.visualContinuity ?? null;
  const requestedIntentReferenceId =
    typeof routeState?.intentReferenceId === "string" &&
    routeState.intentReferenceId.trim().length > 0
      ? routeState.intentReferenceId
      : null;
  const [attemptVersion, setAttemptVersion] = useState(0);
  const [activeIntentReferenceId, setActiveIntentReferenceId] =
    useState<string | null>(null);
  const [hostAcceptanceFailure, setHostAcceptanceFailure] =
    useState<AcceptanceAssemblyFailure | null>(null);
  const [historicalLifeMemory] = useState(() => {
    const previousReality =
      resolveDynamicsInputContext({}).selectedPressureSeedContext;
    const latestCrystal =
      readPersonalityRingLite()
        .entries.slice()
        .sort(
          (left, right) =>
            Date.parse(right.createdAt) - Date.parse(left.createdAt),
        )[0] ?? null;
    return Object.freeze({
      historicalRealityMemoryKey:
        previousReality?.selectedPressureSeedId?.trim() ||
        previousReality?.surface?.trim() ||
        null,
      latestCrystalMemoryKey: latestCrystal?.crystal.copy.trim() || null,
      latestCrystalSourceSlot: latestCrystal
        ? resolveLifeUniverseCrystalSourceSlot(
            latestCrystal.transmission.primaryDimension,
          )
        : null,
    });
  });
  const [identityRecovery] = useState(() =>
    recoverRealityRecognizedIdentity({
      visualContinuity: routeVisualContinuity,
    }),
  );

  const routeReturningLifeMemory =
    routeState?.returningLifeMemory ?? null;
  const returningLifeWorldEntry =
    routeState?.returningEntry === "SAME_LIFE_NEW_REALITY";
  const choiceContinuation =
    routeState?.choiceContinuation ===
    "AWAITING_LIVED_RESPONSE_RECOGNITION"
      ? "AWAITING_LIVED_RESPONSE_RECOGNITION"
      : null;
  const choiceLifeTraceMemoryKey =
    choiceContinuation !== null &&
    typeof routeState?.choiceLifeTraceMemoryKey === "string" &&
    routeState.choiceLifeTraceMemoryKey.trim().length > 0
      ? routeState.choiceLifeTraceMemoryKey
      : null;
  const choiceLifeTraceSourceSlot =
    choiceLifeTraceMemoryKey !== null &&
    typeof routeState?.choiceLifeTraceSourceSlot === "number" &&
    Number.isInteger(routeState.choiceLifeTraceSourceSlot) &&
    routeState.choiceLifeTraceSourceSlot >= 0 &&
    routeState.choiceLifeTraceSourceSlot <= 6
      ? routeState.choiceLifeTraceSourceSlot
      : null;

  const admissionResult = useMemo(
    () =>
      identityRecovery.status === "READY"
        ? establishRealityEncounterAdmission({
            intentReferenceId: requestedIntentReferenceId,
            identityReferences: identityRecovery.identityReferences,
          })
        : null,
    [
      attemptVersion,
      identityRecovery,
      requestedIntentReferenceId,
    ],
  );
  const encounterAdmission =
    admissionResult?.status === "READY"
      ? admissionResult.admission
      : null;
  const authorization = authorizeRealityProductionRoute({
    routeTarget: REALITY_PRODUCTION_ROUTE_TARGET,
    identityEntryContext:
      identityRecovery.status === "READY"
        ? identityRecovery.realityEntryContext
        : null,
    encounterAdmission,
  });
  const activationSourceResult = useMemo(() => {
    clearRealityRouteActivationSourceContext();
    if (
      identityRecovery.status !== "READY" ||
      encounterAdmission === null ||
      authorization.status !== "READY"
    ) {
      return null;
    }
    const requestDateSource =
      captureExplicitRealityRequestDateSource({
        sourceReferenceId:
          identityRecovery.identityReferences.sourceReferenceId,
        calendarInstant: new Date(),
      });
    return requestDateSource === null
      ? null
      : activateRealityRouteActivationSourceContext({
          routeAuthorization: authorization,
          encounterAdmission,
          realityEntryContext:
            identityRecovery.realityEntryContext,
          lifeSourceSession: identityRecovery.lifeSourceSession,
          requestDateSource,
        });
  }, [
    attemptVersion,
    authorization,
    encounterAdmission,
    identityRecovery,
  ]);
  const activationSourceContext =
    activationSourceResult?.status === "AVAILABLE"
      ? activationSourceResult.context
      : null;
  const genesisPresenceContinuityContext =
    identityRecovery.status === "READY"
      ? readGenesisRealityPresenceContinuityContext() ??
        activateGenesisRealityPresenceContinuityContext({
          presenceRealization:
            identityRecovery.presenceVisualRealization,
          realityEntryContext:
            identityRecovery.realityEntryContext,
        })
      : null;
  const candidateActivationResult =
    authorization.status === "READY" &&
    activationSourceContext !== null
      ? bridgeRealityRouteToPressureCandidateActivation({
          routeAuthorization: authorization,
          routeActivationSourceContext: activationSourceContext,
        })
      : null;
  const candidateRequestResult = candidateActivationResult
    ? bridgeRealityRouteCandidateRequestContext({
        routeCandidateActivationResult: candidateActivationResult,
      })
    : null;
  const deliveryResult =
    authorization.status === "READY" && candidateRequestResult
      ? bridgeRealityRouteDeliveryOrchestration({
          routeAuthorization: authorization,
          routeCandidateRequestResult: candidateRequestResult,
        })
      : null;
  const pressureHostInputResult =
    authorization.status === "READY" && deliveryResult
      ? resolveRealityProductionPressureHostInput({
          routeAuthorization: authorization,
          routeDeliveryResult: deliveryResult,
        })
      : null;
  const pressureSeedContinuationResult =
    authorization.status === "READY" &&
    candidateActivationResult &&
    candidateRequestResult &&
    deliveryResult
      ? createRealityPressureSeedContinuationContext({
          routeAuthorization: authorization,
          routeCandidateActivationResult:
            candidateActivationResult,
          routeCandidateRequestResult: candidateRequestResult,
          routeDeliveryResult: deliveryResult,
        })
      : null;

  const assemblyFailure: AcceptanceAssemblyFailure | null =
    identityRecovery.status !== "READY"
      ? Object.freeze({
          stage: "ROUTE_AUTHORIZATION" as const,
          reason: "IDENTITY_MISMATCH" as const,
          guardReason: identityRecovery.reason,
        })
      : admissionResult?.status !== "READY"
        ? Object.freeze({
            stage: "ROUTE_AUTHORIZATION" as const,
            reason: "INTENT_NOT_CURRENT" as const,
            guardReason:
              admissionResult?.reason ??
              "REALITY_ENCOUNTER_INTENT_NOT_AVAILABLE",
          })
        : authorization.status !== "READY"
          ? Object.freeze({
              stage: "ROUTE_AUTHORIZATION" as const,
              reason: "ROUTE_AUTHORIZATION_REJECTED" as const,
              guardReason: authorization.guardReason,
            })
          : activationSourceContext === null
            ? Object.freeze({
                stage: "ACTIVATION_SOURCE" as const,
                reason: "ACTIVATION_SOURCE_UNAVAILABLE" as const,
                guardReason:
                  activationSourceResult?.reason ??
                  "REALITY_ACTIVATION_SOURCE_CONTEXT_NOT_AVAILABLE",
              })
            : candidateActivationResult?.status !== "READY"
              ? Object.freeze({
                  stage: "CANDIDATE_ACTIVATION" as const,
                  reason:
                    "CANDIDATE_ACTIVATION_UNAVAILABLE" as const,
                  guardReason:
                    candidateActivationResult?.reason ??
                    "PRESSURE_CANDIDATE_ACTIVATION_NOT_READY",
                })
              : candidateRequestResult?.status !== "READY"
                ? Object.freeze({
                    stage: "CANDIDATE_REQUEST" as const,
                    reason:
                      "CANDIDATE_REQUEST_UNAVAILABLE" as const,
                    guardReason:
                      candidateRequestResult?.reason ??
                      "PRESSURE_CANDIDATE_REQUEST_NOT_READY",
                  })
                : deliveryResult?.status !== "READY"
                  ? Object.freeze({
                      stage: "DELIVERY" as const,
                      reason: "DELIVERY_UNAVAILABLE" as const,
                      guardReason:
                        deliveryResult?.reason ??
                        "PRESSURE_DELIVERY_ORCHESTRATION_NOT_READY",
                    })
                  : pressureHostInputResult?.status !== "READY"
                    ? Object.freeze({
                        stage: "HOST_INPUT" as const,
                        reason: "HOST_INPUT_UNAVAILABLE" as const,
                        guardReason:
                          pressureHostInputResult?.reason ??
                          "PRESSURE_HOST_INPUT_NOT_READY",
                      })
                    : pressureSeedContinuationResult?.status !==
                          "READY" ||
                        pressureSeedContinuationResult.context.phase !==
                          "READY_FOR_CONSUMER_INITIALIZATION" ||
                        genesisPresenceContinuityContext === null ||
                        genesisPresenceContinuityContext.sourceReferenceId !==
                          authorization.sourceReferenceId ||
                        genesisPresenceContinuityContext.bridge
                          .continuityState !== "CARRIED_TO_REALITY"
                      ? Object.freeze({
                          stage: "HOST_INPUT" as const,
                          reason:
                            "HOST_INPUT_UNAVAILABLE" as const,
                          guardReason:
                            pressureSeedContinuationResult?.status !==
                            "READY"
                              ? pressureSeedContinuationResult?.reason ??
                                "PRESSURE_SEED_CONTINUATION_NOT_READY"
                              : "GENESIS_PRESENCE_CONTINUITY_NOT_READY",
                        })
                      : null;

  useEffect(() => {
    if (
      assemblyFailure === null ||
      encounterAdmission === null
    ) {
      return;
    }
    const failure = failRealityEncounterAcceptance({
      intentReferenceId: encounterAdmission.intentReferenceId,
      encounterCycleId: encounterAdmission.encounterCycleId,
      intentRevision: encounterAdmission.intentRevision,
      stage: assemblyFailure.stage,
      reason: assemblyFailure.reason,
    });
    if (failure.status === "FAILED_RETRYABLE") {
      setHostAcceptanceFailure(assemblyFailure);
    }
  }, [assemblyFailure, encounterAdmission]);

  const retryCurrentEncounter = useCallback(() => {
    if (identityRecovery.status !== "READY") return;
    const currentIntent = readCurrentRealityEncounterIntent();
    if (
      currentIntent === null ||
      currentIntent.state !== "FAILED_RETRYABLE"
    ) {
      return;
    }
    const retry = retryRealityEncounterAcceptance({
      intentReferenceId: currentIntent.intentReferenceId,
      identityReferences: identityRecovery.identityReferences,
    });
    if (retry.status === "READY") {
      setHostAcceptanceFailure(null);
      setActiveIntentReferenceId(null);
      setAttemptVersion((current) => current + 1);
    }
  }, [identityRecovery]);

  const handleRealityAcceptanceOutcome = useCallback(
    (outcome: RealityHostAcceptanceOutcome) => {
      if (outcome.status === "REALITY_HOST_UNAVAILABLE") {
        const failure = failRealityEncounterAcceptance({
          intentReferenceId: outcome.intentReferenceId,
          encounterCycleId: outcome.encounterCycleId,
          intentRevision: outcome.intentRevision,
          stage: "MINIMUM_SURFACE",
          reason: "MINIMUM_SURFACE_NOT_PRESENTED",
        });
        if (failure.status === "FAILED_RETRYABLE") {
          setHostAcceptanceFailure(
            Object.freeze({
              stage: "MINIMUM_SURFACE" as const,
              reason: "MINIMUM_SURFACE_NOT_PRESENTED" as const,
              guardReason: outcome.reason,
            }),
          );
        }
        setActiveIntentReferenceId(null);
        return;
      }
      const commitResult =
        commitRealityEncounterActive(outcome);
      if (commitResult.status === "ACTIVE") {
        setHostAcceptanceFailure(null);
        setActiveIntentReferenceId(
          commitResult.intent.intentReferenceId,
        );
      }
    },
    [],
  );

  const acceptanceFailure =
    assemblyFailure ?? hostAcceptanceFailure;

  if (
    identityRecovery.status !== "READY" ||
    admissionResult?.status !== "READY" ||
    encounterAdmission === null ||
    acceptanceFailure !== null ||
    authorization.status !== "READY" ||
    activationSourceContext === null ||
    candidateActivationResult?.status !== "READY" ||
    candidateRequestResult?.status !== "READY" ||
    deliveryResult?.status !== "READY" ||
    pressureHostInputResult?.status !== "READY" ||
    pressureSeedContinuationResult?.status !== "READY" ||
    pressureSeedContinuationResult.context.phase !==
      "READY_FOR_CONSUMER_INITIALIZATION" ||
    genesisPresenceContinuityContext === null
  ) {
    const currentIntent = readCurrentRealityEncounterIntent();
    const retryAvailable =
      currentIntent?.state === "FAILED_RETRYABLE" ||
      admissionResult?.status === "RETRY_REQUIRED";
    return (
      <main
        data-production-reality-status="SOURCE_NOT_READY"
        data-reality-intent-authority={
          currentIntent?.state ?? "ABSENT"
        }
        data-reality-encounter-cycle-id={
          currentIntent?.encounterCycleId ?? "NONE"
        }
        data-guard-reason={
          acceptanceFailure?.guardReason ??
          admissionResult?.reason ??
          identityRecovery.reason
        }
      >
        <p role="status">
          这一次现实还没有被完整承接。
        </p>
        {retryAvailable ? (
          <button
            type="button"
            data-interaction="RETRY_SAME_REALITY_ENCOUNTER"
            onClick={retryCurrentEncounter}
          >
            继续这一轮
          </button>
        ) : (
          <button
            type="button"
            onClick={() =>
              navigate("/launch-lab", { replace: true })
            }
          >
            回到生命世界
          </button>
        )}
      </main>
    );
  }

  const visualContinuity = identityRecovery.visualContinuity;
  const continueToGravity: RealityProductionHostProps["onContinueToGravity"] =
    (selectedPressureSeedContext) => {
      if (
        activeIntentReferenceId !==
        encounterAdmission.intentReferenceId
      ) {
        return;
      }
      const termination = terminateRealityEncounter(
        "ENCOUNTER_COMPLETED",
      );
      if (termination.status !== "TERMINATED") return;
      const handoffState: DynamicsHandoffState &
        Readonly<{
          visualContinuity: RealityProductionHostProps["visualContinuity"];
          choiceContinuation:
            | "AWAITING_LIVED_RESPONSE_RECOGNITION"
            | null;
          innerViewEntry: "CURRENT_LIFE_WEATHER_BODY_APPROACHED";
        }> = Object.freeze({
        selectedPressureSeedContext: writeSelectedPressureSeedContext(
          selectedPressureSeedContext,
        ),
        visualContinuity,
        choiceContinuation,
        innerViewEntry: "CURRENT_LIFE_WEATHER_BODY_APPROACHED",
      });
      navigate(GUANYAO_ROUTES.dynamics, { state: handoffState });
    };

  return (
    <RealityProductionHost
      key={`${encounterAdmission.encounterCycleId}:${encounterAdmission.intentRevision}`}
      routeAuthorization={authorization}
      encounterAdmission={encounterAdmission}
      pressureSeedHostInput={pressureHostInputResult.input}
      pressureSeedContinuationContext={
        pressureSeedContinuationResult.context
      }
      genesisPresenceContinuityContext={
        genesisPresenceContinuityContext
      }
      visualContinuity={visualContinuity}
      historicalRealityMemoryKey={
        routeReturningLifeMemory?.historicalRealityMemoryKey ??
        historicalLifeMemory.historicalRealityMemoryKey
      }
      latestCrystalMemoryKey={
        routeReturningLifeMemory?.latestCrystalMemoryKey ??
        (historicalLifeMemory.latestCrystalMemoryKey
          ? `${visualContinuity.sourceReferenceId}:${historicalLifeMemory.latestCrystalMemoryKey}`
          : null)
      }
      latestCrystalSourceSlot={
        routeReturningLifeMemory?.latestCrystalSourceSlot ??
        historicalLifeMemory.latestCrystalSourceSlot
      }
      returningLifeWorldEntry={returningLifeWorldEntry}
      choiceContinuation={choiceContinuation}
      choiceLifeTraceMemoryKey={choiceLifeTraceMemoryKey}
      choiceLifeTraceSourceSlot={choiceLifeTraceSourceSlot}
      onRealityAcceptanceOutcome={
        handleRealityAcceptanceOutcome
      }
      onContinueToGravity={continueToGravity}
    />
  );
}
