import {
  useCallback,
  useEffect,
  useRef,
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
  clearRealityRouteActivationSourceContextForAdmission,
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
  rollbackRealityEncounterAdmission,
  retryRealityEncounterAcceptance,
} from "../services/xinmaiRealityEncounterIntentController";
import {
  createRealityExplicitLeaveRequestFromAdmission,
  createRealityExplicitLeaveRequestFromIntent,
} from "../services/realityExplicitLeaveTerminationTransaction";
import { resolveDynamicsInputContext } from "../services/guanyaoDynamicsInputContextAdapter";
import { executeRealityToGravityCutover } from "../services/realityToGravityCutoverTransaction";
import { observeRealityToGravityCutoverResult } from "../services/gravityEntryAcceptanceRuntimePort";
import { readPersonalityRingLite } from "../services/personalityRingLiteService";
import { resolveLifeUniverseCrystalSourceSlot } from "../renderers/lifeUniverseStarField";
import { GUANYAO_ROUTES } from "../routes/guanyaoRoutes";
import type {
  RealityHostInteractionAuthority,
  RealityProductionHostProps,
  RealityProductionRouteEntryBoundary,
  RealityProductionRouteEntryProps,
} from "../types/realityProductionRouteEntry";
import type { GravityEntryTransferRequest } from "../types/xinmaiGravityEntryAdmission";
import type {
  RealityEncounterAdmissionResult,
  RealityEncounterFailureReason,
  RealityEncounterFailureStage,
  RealityHostAcceptanceOutcome,
} from "../types/xinmaiRealityEncounterIntent";
import type {
  RealityProductionRouteActivationAuthorization,
} from "../types/realityProductionRouteAuthorization";
import type {
  RealityRouteActivationSourceContextResult,
} from "../types/realityRouteActivationSourceContext";

export const REALITY_PRODUCTION_ROUTE_ENTRY_BOUNDARY:
  RealityProductionRouteEntryBoundary = Object.freeze({
    productionRouteEntryOnly: true,
    exactRealityRouteOnly: true,
    typedIdentityRecoveryAdapterConsumptionOnly: true,
    typedIntentRecoveryViaControllerOnly: true,
    noDirectStorageRead: true,
    recoveryCandidateIsNotAuthority: true,
    identityOnlyAuthorizationForbidden: true,
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
    routeStateIsPresentationOnly: true,
    typedGravityTransferRequestOnly: true,
    gravityCutoverTransactionRequired: true,
    noGenesisNavigationMutation: true,
    noPresenceMutation: true,
    typedSurfaceAdmissionTransactionRequired: true,
    postCommitAdmissionTransactionRequired: true,
    renderPhaseAdmissionMutationForbidden: true,
    ordinaryCleanupDoesNotTerminateIntent: true,
    singleAdmissionSuccessPath: true,
    preActiveHostSurfaceRequired: true,
    singleHostPhaseTransitionRequired: true,
    controllerActiveAuthorityOnly: true,
    admissionActiveRevisionSeparationRequired: true,
    explicitLeaveTransactionRequired: true,
    routeOwnsExplicitLeaveTransaction: true,
    noDirectIntentTerminationFromHost: true,
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

type RealityActiveCommitReceipt = Readonly<{
  intentReferenceId: string;
  encounterCycleId: string;
  sourceReferenceId: string;
  starBeastIdentityReferenceId: string;
  mansionCoordinateReferenceId: string;
  admissionRevision: number;
  activeRevision: number;
}>;

type PostCommitAdmissionTransactionState =
  | Readonly<{
      status: "PENDING";
      attemptVersion: number;
    }>
  | Readonly<{
      status: "READY";
      attemptVersion: number;
      transactionKey: string;
      admissionResult: Extract<
        RealityEncounterAdmissionResult,
        { status: "READY" }
      >;
      authorization: Extract<
        RealityProductionRouteActivationAuthorization,
        { status: "READY" }
      >;
      activationSourceResult: Extract<
        RealityRouteActivationSourceContextResult,
        { status: "AVAILABLE" }
      >;
    }>
  | Readonly<{
      status: "FAILED";
      attemptVersion: number;
      retryAvailable: boolean;
      failure: AcceptanceAssemblyFailure;
    }>;

export function RealityProductionRouteEntry({
  explicitLeaveState,
  onExplicitLeaveRequest,
  onReturnToLifeWorld,
}: RealityProductionRouteEntryProps) {
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
  const [postCommitTransaction, setPostCommitTransaction] =
    useState<PostCommitAdmissionTransactionState>(() =>
      Object.freeze({
        status: "PENDING" as const,
        attemptVersion: 0,
      }),
    );
  const postCommitTransactionEpochRef = useRef(0);
  const committedPostCommitTransactionRef = useRef<
    Extract<
      PostCommitAdmissionTransactionState,
      { status: "READY" }
    > | null
  >(null);
  const [activeCommitReceipt, setActiveCommitReceipt] =
    useState<RealityActiveCommitReceipt | null>(null);
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

  useEffect(() => {
    const transactionEpoch =
      postCommitTransactionEpochRef.current + 1;
    postCommitTransactionEpochRef.current = transactionEpoch;
    let disposed = false;

    const publishFailure = (
      failure: AcceptanceAssemblyFailure,
      retryAvailable: boolean,
    ) => {
      if (
        disposed ||
        postCommitTransactionEpochRef.current !== transactionEpoch
      ) {
        return;
      }
      setPostCommitTransaction(
        Object.freeze({
          status: "FAILED" as const,
          attemptVersion,
          retryAvailable,
          failure,
        }),
      );
    };

    if (identityRecovery.status !== "READY") {
      publishFailure(
        Object.freeze({
          stage: "ROUTE_AUTHORIZATION" as const,
          reason: "IDENTITY_MISMATCH" as const,
          guardReason: identityRecovery.reason,
        }),
        false,
      );
      return () => {
        disposed = true;
      };
    }

    const currentIntent = readCurrentRealityEncounterIntent();
    const committedTransaction =
      committedPostCommitTransactionRef.current;
    if (
      committedTransaction !== null &&
      currentIntent !== null &&
      currentIntent.intentReferenceId ===
        committedTransaction.admissionResult.admission
          .intentReferenceId &&
      currentIntent.encounterCycleId ===
        committedTransaction.admissionResult.admission
          .encounterCycleId &&
      currentIntent.sourceReferenceId ===
        identityRecovery.identityReferences.sourceReferenceId &&
      currentIntent.starBeastIdentityReferenceId ===
        identityRecovery.identityReferences
          .starBeastIdentityReferenceId &&
      currentIntent.mansionCoordinateReferenceId ===
        identityRecovery.identityReferences
          .mansionCoordinateReferenceId &&
      ((currentIntent.state === "ACCEPTING_REALITY" &&
        currentIntent.revision ===
          committedTransaction.admissionResult.admission
            .intentRevision) ||
        (currentIntent.state === "ACTIVE_IN_REALITY" &&
          currentIntent.revision ===
            committedTransaction.admissionResult.admission
              .intentRevision +
              1))
    ) {
      setPostCommitTransaction(committedTransaction);
      return () => {
        disposed = true;
      };
    }

    const admissionResult =
      attemptVersion > 0 &&
      currentIntent?.state === "FAILED_RETRYABLE"
        ? retryRealityEncounterAcceptance({
            intentReferenceId: currentIntent.intentReferenceId,
            identityReferences: identityRecovery.identityReferences,
          })
        : establishRealityEncounterAdmission({
            intentReferenceId: requestedIntentReferenceId,
            identityReferences: identityRecovery.identityReferences,
          });

    if (admissionResult.status !== "READY") {
      publishFailure(
        Object.freeze({
          stage:
            admissionResult.reason === "RECOVERY_STORAGE_UNAVAILABLE"
              ? ("RECOVERY" as const)
              : ("ROUTE_AUTHORIZATION" as const),
          reason:
            admissionResult.reason === "RECOVERY_STORAGE_UNAVAILABLE"
              ? ("RECOVERY_STORAGE_UNAVAILABLE" as const)
              : ("INTENT_NOT_CURRENT" as const),
          guardReason: admissionResult.reason,
        }),
        admissionResult.status === "RETRY_REQUIRED" ||
          admissionResult.reason === "RECOVERY_STORAGE_UNAVAILABLE",
      );
      return () => {
        disposed = true;
      };
    }

    const encounterAdmission = admissionResult.admission;
    const authorization = authorizeRealityProductionRoute({
      routeTarget: REALITY_PRODUCTION_ROUTE_TARGET,
      identityEntryContext: identityRecovery.realityEntryContext,
      encounterAdmission,
    });
    if (authorization.status !== "READY") {
      const rollback = rollbackRealityEncounterAdmission({
        admission: encounterAdmission,
      });
      publishFailure(
        Object.freeze({
          stage: "ROUTE_AUTHORIZATION" as const,
          reason: "ROUTE_AUTHORIZATION_REJECTED" as const,
          guardReason:
            rollback.status === "ROLLED_BACK"
              ? authorization.guardReason
              : `${authorization.guardReason}:${rollback.reason}`,
        }),
        true,
      );
      return () => {
        disposed = true;
      };
    }

    const requestDateSource =
      captureExplicitRealityRequestDateSource({
        sourceReferenceId:
          identityRecovery.identityReferences.sourceReferenceId,
        calendarInstant: new Date(),
      });
    if (requestDateSource === null) {
      const rollback = rollbackRealityEncounterAdmission({
        admission: encounterAdmission,
      });
      publishFailure(
        Object.freeze({
          stage: "ACTIVATION_SOURCE" as const,
          reason: "ACTIVATION_SOURCE_UNAVAILABLE" as const,
          guardReason:
            rollback.status === "ROLLED_BACK"
              ? "EXPLICIT_REQUEST_DATE_UNAVAILABLE"
              : `EXPLICIT_REQUEST_DATE_UNAVAILABLE:${rollback.reason}`,
        }),
        true,
      );
      return () => {
        disposed = true;
      };
    }

    const activationSourceResult =
      activateRealityRouteActivationSourceContext({
        routeAuthorization: authorization,
        encounterAdmission,
        realityEntryContext: identityRecovery.realityEntryContext,
        lifeSourceSession: identityRecovery.lifeSourceSession,
        requestDateSource,
      });
    if (activationSourceResult.status !== "AVAILABLE") {
      clearRealityRouteActivationSourceContextForAdmission(
        encounterAdmission,
      );
      const rollback = rollbackRealityEncounterAdmission({
        admission: encounterAdmission,
      });
      publishFailure(
        Object.freeze({
          stage: "ACTIVATION_SOURCE" as const,
          reason: "ACTIVATION_SOURCE_UNAVAILABLE" as const,
          guardReason:
            rollback.status === "ROLLED_BACK"
              ? activationSourceResult.reason
              : `${activationSourceResult.reason}:${rollback.reason}`,
        }),
        true,
      );
      return () => {
        disposed = true;
      };
    }

    const latestIntent = readCurrentRealityEncounterIntent();
    if (
      latestIntent === null ||
      latestIntent.state !== "ACCEPTING_REALITY" ||
      latestIntent.intentReferenceId !==
        encounterAdmission.intentReferenceId ||
      latestIntent.encounterCycleId !==
        encounterAdmission.encounterCycleId ||
      latestIntent.revision !== encounterAdmission.intentRevision ||
      latestIntent.sourceReferenceId !==
        encounterAdmission.identityReferences.sourceReferenceId
    ) {
      clearRealityRouteActivationSourceContextForAdmission(
        encounterAdmission,
      );
      rollbackRealityEncounterAdmission({
        admission: encounterAdmission,
      });
      publishFailure(
        Object.freeze({
          stage: "ACTIVATION_SOURCE" as const,
          reason: "INTENT_NOT_CURRENT" as const,
          guardReason: "POST_COMMIT_TRANSACTION_STALE",
        }),
        true,
      );
      return () => {
        disposed = true;
      };
    }

    const transactionKey = [
      encounterAdmission.encounterCycleId,
      encounterAdmission.identityReferences.sourceReferenceId,
      encounterAdmission.identityReferences
        .starBeastIdentityReferenceId,
      encounterAdmission.identityReferences
        .mansionCoordinateReferenceId,
      String(encounterAdmission.intentRevision),
      REALITY_PRODUCTION_ROUTE_TARGET,
    ].join("|");

    if (
      !disposed &&
      postCommitTransactionEpochRef.current === transactionEpoch
    ) {
      const committedTransactionState = Object.freeze({
          status: "READY" as const,
          attemptVersion,
          transactionKey,
          admissionResult,
          authorization,
          activationSourceResult,
        });
      committedPostCommitTransactionRef.current =
        committedTransactionState;
      setPostCommitTransaction(committedTransactionState);
    }

    return () => {
      // Cleanup invalidates UI publication only. A committed Admission remains
      // recoverable and is never interpreted as explicit leave.
      disposed = true;
    };
  }, [
    attemptVersion,
    identityRecovery,
    location.key,
    requestedIntentReferenceId,
  ]);

  const admissionResult =
    postCommitTransaction.status === "READY"
      ? postCommitTransaction.admissionResult
      : null;
  const encounterAdmission = admissionResult?.admission ?? null;
  const authorization =
    postCommitTransaction.status === "READY"
      ? postCommitTransaction.authorization
      : null;
  const activationSourceResult =
    postCommitTransaction.status === "READY"
      ? postCommitTransaction.activationSourceResult
      : null;
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
    authorization !== null &&
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
    authorization !== null && candidateRequestResult
      ? bridgeRealityRouteDeliveryOrchestration({
          routeAuthorization: authorization,
          routeCandidateRequestResult: candidateRequestResult,
        })
      : null;
  const pressureHostInputResult =
    authorization !== null && deliveryResult
      ? resolveRealityProductionPressureHostInput({
          routeAuthorization: authorization,
          routeDeliveryResult: deliveryResult,
        })
      : null;
  const pressureSeedContinuationResult =
    authorization !== null &&
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
    postCommitTransaction.status !== "READY"
      ? null
      : authorization === null
        ? Object.freeze({
            stage: "ROUTE_AUTHORIZATION" as const,
            reason: "ROUTE_AUTHORIZATION_REJECTED" as const,
            guardReason: "POST_COMMIT_AUTHORIZATION_NOT_AVAILABLE",
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
    const nextAttemptVersion = attemptVersion + 1;
    committedPostCommitTransactionRef.current = null;
    setHostAcceptanceFailure(null);
    setActiveCommitReceipt(null);
    setPostCommitTransaction(
      Object.freeze({
        status: "PENDING" as const,
        attemptVersion: nextAttemptVersion,
      }),
    );
    setAttemptVersion(nextAttemptVersion);
  }, [attemptVersion]);

  const requestExplicitLeave = useCallback(() => {
    const currentIntent = readCurrentRealityEncounterIntent();
    if (currentIntent === null) {
      onReturnToLifeWorld();
      return;
    }
    const request =
      encounterAdmission !== null &&
      (currentIntent.intentReferenceId !==
        encounterAdmission.intentReferenceId ||
        currentIntent.encounterCycleId !==
          encounterAdmission.encounterCycleId)
        ? createRealityExplicitLeaveRequestFromAdmission(
            encounterAdmission,
          )
        : createRealityExplicitLeaveRequestFromIntent(
            currentIntent,
          );
    if (request === null) {
      onReturnToLifeWorld();
      return;
    }
    onExplicitLeaveRequest(request);
  }, [
    encounterAdmission,
    onExplicitLeaveRequest,
    onReturnToLifeWorld,
  ]);

  const handleRealityAcceptanceOutcome = useCallback(
    (outcome: RealityHostAcceptanceOutcome) => {
      if (
        encounterAdmission === null ||
        outcome.intentReferenceId !==
          encounterAdmission.intentReferenceId ||
        outcome.encounterCycleId !==
          encounterAdmission.encounterCycleId ||
        outcome.intentRevision !==
          encounterAdmission.intentRevision ||
        outcome.sourceReferenceId !==
          encounterAdmission.identityReferences.sourceReferenceId
      ) {
        return;
      }
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
        setActiveCommitReceipt(null);
        return;
      }
      const commitResult =
        commitRealityEncounterActive(outcome);
      if (
        commitResult.status === "ACTIVE" &&
        commitResult.intent.state === "ACTIVE_IN_REALITY" &&
        commitResult.intent.revision ===
          encounterAdmission.intentRevision + 1 &&
        commitResult.intent.sourceReferenceId ===
          encounterAdmission.identityReferences.sourceReferenceId &&
        commitResult.intent.starBeastIdentityReferenceId ===
          encounterAdmission.identityReferences
            .starBeastIdentityReferenceId &&
        commitResult.intent.mansionCoordinateReferenceId ===
          encounterAdmission.identityReferences
            .mansionCoordinateReferenceId
      ) {
        setHostAcceptanceFailure(null);
        setActiveCommitReceipt(
          Object.freeze({
            intentReferenceId:
              commitResult.intent.intentReferenceId,
            encounterCycleId:
              commitResult.intent.encounterCycleId,
            sourceReferenceId:
              commitResult.intent.sourceReferenceId,
            starBeastIdentityReferenceId:
              commitResult.intent.starBeastIdentityReferenceId,
            mansionCoordinateReferenceId:
              commitResult.intent.mansionCoordinateReferenceId,
            admissionRevision:
              encounterAdmission.intentRevision,
            activeRevision: commitResult.intent.revision,
          }),
        );
        return;
      }
      setActiveCommitReceipt(null);
      setHostAcceptanceFailure(
        Object.freeze({
          stage: "MINIMUM_SURFACE" as const,
          reason: "HOST_OUTCOME_MISMATCH" as const,
          guardReason:
            commitResult.status === "REJECTED"
              ? commitResult.reason
              : "ACTIVE_COMMIT_RECEIPT_MISMATCH",
        }),
      );
    },
    [encounterAdmission],
  );

  const acceptanceFailure =
    (postCommitTransaction.status === "FAILED"
      ? postCommitTransaction.failure
      : assemblyFailure) ?? hostAcceptanceFailure;

  if (
    identityRecovery.status !== "READY" ||
    postCommitTransaction.status !== "READY" ||
    admissionResult?.status !== "READY" ||
    encounterAdmission === null ||
    acceptanceFailure !== null ||
    authorization === null ||
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
      postCommitTransaction.status === "FAILED" &&
        postCommitTransaction.retryAvailable;
    return (
      <main
        className="gy-reality-route-guard"
        data-production-reality-status="SOURCE_NOT_READY"
        data-reality-intent-authority={
          currentIntent?.state ?? "ABSENT"
        }
        data-reality-encounter-cycle-id={
          currentIntent?.encounterCycleId ?? "NONE"
        }
        data-guard-reason={
          acceptanceFailure?.guardReason ??
          (postCommitTransaction.status === "PENDING"
            ? "POST_COMMIT_TRANSACTION_PENDING"
            : null) ??
          identityRecovery.reason
        }
        data-reality-post-commit-transaction={
          postCommitTransaction.status
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
        ) : currentIntent === null ? (
          <button
            type="button"
            onClick={onReturnToLifeWorld}
          >
            回到生命世界
          </button>
        ) : null}
        {currentIntent !== null ? (
          <button
            type="button"
            data-interaction="REALITY_EXPLICIT_LEAVE"
            disabled={explicitLeaveState.status === "PENDING"}
            onClick={requestExplicitLeave}
          >
            {explicitLeaveState.status === "PENDING"
              ? "正在让这一轮安静下来"
              : "这一轮先到这里"}
          </button>
        ) : null}
        {explicitLeaveState.status === "RETRYABLE" ? (
          <p role="status" data-reality-explicit-leave-feedback="RETRYABLE">
            这一轮还没有完整停下，可以再试一次。
          </p>
        ) : null}
      </main>
    );
  }

  const visualContinuity = identityRecovery.visualContinuity;
  const currentRealityIntent =
    readCurrentRealityEncounterIntent();
  const preActivePresentationReady =
    currentRealityIntent !== null &&
    currentRealityIntent.state === "ACCEPTING_REALITY" &&
    currentRealityIntent.intentReferenceId ===
      encounterAdmission.intentReferenceId &&
    currentRealityIntent.encounterCycleId ===
      encounterAdmission.encounterCycleId &&
    currentRealityIntent.revision ===
      encounterAdmission.intentRevision &&
    currentRealityIntent.sourceReferenceId ===
      encounterAdmission.identityReferences.sourceReferenceId &&
    currentRealityIntent.starBeastIdentityReferenceId ===
      encounterAdmission.identityReferences
        .starBeastIdentityReferenceId &&
    currentRealityIntent.mansionCoordinateReferenceId ===
      encounterAdmission.identityReferences
        .mansionCoordinateReferenceId;
  const activeInteractionReady =
    currentRealityIntent !== null &&
    currentRealityIntent.state === "ACTIVE_IN_REALITY" &&
    activeCommitReceipt !== null &&
    activeCommitReceipt.intentReferenceId ===
      encounterAdmission.intentReferenceId &&
    activeCommitReceipt.encounterCycleId ===
      encounterAdmission.encounterCycleId &&
    activeCommitReceipt.sourceReferenceId ===
      encounterAdmission.identityReferences.sourceReferenceId &&
    activeCommitReceipt.starBeastIdentityReferenceId ===
      encounterAdmission.identityReferences
        .starBeastIdentityReferenceId &&
    activeCommitReceipt.mansionCoordinateReferenceId ===
      encounterAdmission.identityReferences
        .mansionCoordinateReferenceId &&
    activeCommitReceipt.admissionRevision ===
      encounterAdmission.intentRevision &&
    activeCommitReceipt.activeRevision ===
      encounterAdmission.intentRevision + 1 &&
    currentRealityIntent.intentReferenceId ===
      activeCommitReceipt.intentReferenceId &&
    currentRealityIntent.encounterCycleId ===
      activeCommitReceipt.encounterCycleId &&
    currentRealityIntent.revision ===
      activeCommitReceipt.activeRevision &&
    currentRealityIntent.sourceReferenceId ===
      activeCommitReceipt.sourceReferenceId &&
    currentRealityIntent.starBeastIdentityReferenceId ===
      activeCommitReceipt.starBeastIdentityReferenceId &&
    currentRealityIntent.mansionCoordinateReferenceId ===
      activeCommitReceipt.mansionCoordinateReferenceId;
  const realityInteractionAuthority:
    RealityHostInteractionAuthority | null =
    activeInteractionReady
      ? Object.freeze({
          phase: "ACTIVE_INTERACTION" as const,
          admissionRevision:
            encounterAdmission.intentRevision,
          activeRevision:
            currentRealityIntent.revision,
          activeIntent: currentRealityIntent,
        })
      : preActivePresentationReady
        ? Object.freeze({
            phase: "PRE_ACTIVE_PRESENTATION" as const,
            admissionRevision:
              encounterAdmission.intentRevision,
            activeRevision: null,
            activeIntent: null,
          })
        : null;
  if (realityInteractionAuthority === null) {
    return (
      <main
        className="gy-reality-route-guard"
        data-production-reality-status="SOURCE_NOT_READY"
        data-guard-reason="REALITY_INTENT_ATTEMPT_NOT_CURRENT"
      >
        <p role="status">这一轮现实还没有被完整承接。</p>
      </main>
    );
  }
  const requestGravityTransfer = (
    request: GravityEntryTransferRequest,
  ) => {
    const cutover = executeRealityToGravityCutover(request);
    observeRealityToGravityCutoverResult(cutover);
    if (cutover.status === "COMMITTED") {
      navigate(GUANYAO_ROUTES.dynamics, {
        state: Object.freeze({
          gravityRouteTicket: cutover.routeTicket,
        }),
      });
    }
    return cutover;
  };

  return (
    <RealityProductionHost
      key={`${encounterAdmission.encounterCycleId}:${encounterAdmission.intentRevision}`}
      routeAuthorization={authorization}
      encounterAdmission={encounterAdmission}
      realityInteractionAuthority={
        realityInteractionAuthority
      }
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
      explicitLeaveState={explicitLeaveState}
      onExplicitLeaveRequest={requestExplicitLeave}
      onRequestGravityTransfer={requestGravityTransfer}
    />
  );
}
