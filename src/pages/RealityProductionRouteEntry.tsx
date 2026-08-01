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
  recoverCurrentRealityEncounter,
  rollbackRealityEncounterAdmission,
  retryRealityEncounterAcceptance,
} from "../services/xinmaiRealityEncounterIntentController";
import {
  subscribeToRealityAdventureContinuityRevision,
} from "../services/xinmaiRealityAdventureContinuityRevisionObserver";
import { subscribeToXinmaiLivedGrowthRecoveryRevision } from "../services/xinmaiLivedGrowthRecoveryRevisionObserver";
import { readXinmaiCanonicalBodyImprintRecovery } from "../services/xinmaiCanonicalBodyImprintRecoveryAdapter";
import {
  createRealityExplicitLeaveRequestFromAdmission,
  createRealityExplicitLeaveRequestFromIntent,
} from "../services/realityExplicitLeaveTerminationTransaction";
import { resolveDynamicsInputContext } from "../services/guanyaoDynamicsInputContextAdapter";
import { executeRealityToGravityCutover } from "../services/realityToGravityCutoverTransaction";
import { observeRealityToGravityCutoverResult } from "../services/gravityEntryAcceptanceRuntimePort";
import { readXinmaiChoiceReturnResolutionProof } from "../services/xinmaiChoiceReturnResolutionProofAdapter";
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
  RealityPressureRecognitionReceipt,
} from "../types/xinmaiRealityAdventureContinuity";
import type {
  RealityProductionRouteActivationAuthorization,
} from "../types/realityProductionRouteAuthorization";
import type {
  RealityRouteActivationSourceContextResult,
} from "../types/realityRouteActivationSourceContext";
import {
  XINMAI_CANONICAL_BODY_IMPRINT_UNAVAILABLE_DECISION,
  type XinmaiCanonicalBodyImprintDecision,
} from "../types/xinmaiCanonicalBodyImprint";

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
      }>;
      returningEntry?: "SAME_LIFE_NEW_REALITY";
      choiceReturn?: "CHOICE_RETURN_LIVED_RESPONSE_RESOLVED";
      choiceLifeTraceMemoryKey?: string;
      choiceLifeTraceSourceSlot?: number;
      choiceActionIntentionReferenceId?: string;
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
  canonicalRevision: number;
  recognitionReceipt:
    RealityPressureRecognitionReceipt | null;
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
  const [continuitySuperseded, setContinuitySuperseded] =
    useState(false);
  const [historicalLifeMemory] = useState(() => {
    const previousReality =
      resolveDynamicsInputContext({}).selectedPressureSeedContext;
    return Object.freeze({
      historicalRealityMemoryKey:
        previousReality?.selectedPressureSeedId?.trim() ||
        previousReality?.surface?.trim() ||
        null,
    });
  });
  const [identityRecovery] = useState(() =>
    recoverRealityRecognizedIdentity({
      visualContinuity: routeVisualContinuity,
    }),
  );
  const [canonicalBodyImprintDecision, setCanonicalBodyImprintDecision] =
    useState<XinmaiCanonicalBodyImprintDecision>(
      XINMAI_CANONICAL_BODY_IMPRINT_UNAVAILABLE_DECISION,
    );

  useEffect(() => {
    if (identityRecovery.status !== "READY") {
      setCanonicalBodyImprintDecision(
        XINMAI_CANONICAL_BODY_IMPRINT_UNAVAILABLE_DECISION,
      );
      return undefined;
    }
    let disposed = false;
    const read = () => {
      void readXinmaiCanonicalBodyImprintRecovery({
        identityReferences: identityRecovery.identityReferences,
        visualContinuity: identityRecovery.visualContinuity,
        focusedChoiceActionIntentionReferenceId:
          routeState?.choiceActionIntentionReferenceId ?? null,
      }).then((decision) => {
        if (!disposed) setCanonicalBodyImprintDecision(decision);
      });
    };
    read();
    const unsubscribe =
      subscribeToXinmaiLivedGrowthRecoveryRevision(read);
    return () => {
      disposed = true;
      unsubscribe();
    };
  }, [
    identityRecovery,
    routeState?.choiceActionIntentionReferenceId,
  ]);

  useEffect(() => {
    if (identityRecovery.status !== "READY") return undefined;
    let disposed = false;
    const unsubscribe =
      subscribeToRealityAdventureContinuityRevision((notice) => {
        const currentReceipt = activeCommitReceipt;
        if (
          currentReceipt !== null &&
          currentReceipt.encounterCycleId !==
            notice.encounterCycleId
        ) {
          return;
        }
        void recoverCurrentRealityEncounter({
          identityReferences:
            identityRecovery.identityReferences,
        }).then((record) => {
          if (
            disposed ||
            record === null ||
            record.encounterCycleId !==
              notice.encounterCycleId
          ) {
            return;
          }
          if (
            record.lifecycle === "GRAVITY_ADMITTED" ||
            record.lifecycle === "ACTIVE_IN_GRAVITY" ||
            record.lifecycle === "TERMINAL"
          ) {
            setContinuitySuperseded(true);
            return;
          }
          if (
            record.lifecycle === "PRESSURE_RECOGNIZED" &&
            record.realityIntent.state ===
              "ACTIVE_IN_REALITY" &&
            record.recognitionReceipt !== null
          ) {
            setActiveCommitReceipt((current) =>
              current === null ||
              current.encounterCycleId !==
                record.encounterCycleId
                ? current
                : Object.freeze({
                    ...current,
                    activeRevision:
                      record.realityIntent.revision,
                    canonicalRevision:
                      record.canonicalRevision,
                    recognitionReceipt:
                      record.recognitionReceipt,
                  }),
            );
          }
        });
      });
    return () => {
      disposed = true;
      unsubscribe();
    };
  }, [
    activeCommitReceipt?.encounterCycleId,
    identityRecovery,
  ]);

  const routeReturningLifeMemory =
    routeState?.returningLifeMemory ?? null;
  const returningLifeWorldEntry =
    routeState?.returningEntry === "SAME_LIFE_NEW_REALITY";
  const choiceReturn =
    routeState?.choiceReturn ===
    "CHOICE_RETURN_LIVED_RESPONSE_RESOLVED"
      ? "CHOICE_RETURN_LIVED_RESPONSE_RESOLVED"
      : null;
  const choiceLifeTraceMemoryKey =
    choiceReturn !== null &&
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

    void (async () => {
      if (identityRecovery.status !== "READY") {
        publishFailure(
          Object.freeze({
            stage: "ROUTE_AUTHORIZATION" as const,
            reason: "IDENTITY_MISMATCH" as const,
            guardReason: identityRecovery.reason,
          }),
          false,
        );
        return;
      }

      let currentIntent = readCurrentRealityEncounterIntent();
      if (currentIntent === null) {
        const recoveredRecord = await recoverCurrentRealityEncounter({
          identityReferences: identityRecovery.identityReferences,
        });
        currentIntent = recoveredRecord?.realityIntent ?? null;
      }
      if (currentIntent?.origin === "CHOICE_RETURN") {
        const growthProof =
          await readXinmaiChoiceReturnResolutionProof(currentIntent);
        if (growthProof.status !== "READY") {
          publishFailure(
            Object.freeze({
              stage: "ROUTE_AUTHORIZATION" as const,
              reason: "INTENT_NOT_CURRENT" as const,
              guardReason: growthProof.reason,
            }),
            true,
          );
          return;
        }
      }
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
        return;
      }

      const admissionResult =
        attemptVersion > 0 &&
        currentIntent?.state === "FAILED_RETRYABLE"
          ? await retryRealityEncounterAcceptance({
              intentReferenceId: currentIntent.intentReferenceId,
              identityReferences:
                identityRecovery.identityReferences,
            })
          : await establishRealityEncounterAdmission({
              intentReferenceId: requestedIntentReferenceId,
              identityReferences:
                identityRecovery.identityReferences,
            });

      if (admissionResult.status !== "READY") {
        publishFailure(
          Object.freeze({
            stage:
              admissionResult.reason ===
              "RECOVERY_STORAGE_UNAVAILABLE"
                ? ("RECOVERY" as const)
                : ("ROUTE_AUTHORIZATION" as const),
            reason:
              admissionResult.reason ===
              "RECOVERY_STORAGE_UNAVAILABLE"
                ? ("RECOVERY_STORAGE_UNAVAILABLE" as const)
                : ("INTENT_NOT_CURRENT" as const),
            guardReason: admissionResult.reason,
          }),
          admissionResult.status === "RETRY_REQUIRED" ||
            admissionResult.reason ===
              "RECOVERY_STORAGE_UNAVAILABLE",
        );
        return;
      }

      const encounterAdmission = admissionResult.admission;
      const authorization = authorizeRealityProductionRoute({
        routeTarget: REALITY_PRODUCTION_ROUTE_TARGET,
        identityEntryContext:
          identityRecovery.realityEntryContext,
        encounterAdmission,
      });
      if (authorization.status !== "READY") {
        const rollback =
          await rollbackRealityEncounterAdmission({
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
        return;
      }

      const requestDateSource =
        captureExplicitRealityRequestDateSource({
          sourceReferenceId:
            identityRecovery.identityReferences.sourceReferenceId,
          calendarInstant: new Date(),
        });
      if (requestDateSource === null) {
        const rollback =
          await rollbackRealityEncounterAdmission({
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
        return;
      }

      const activationSourceResult =
        activateRealityRouteActivationSourceContext({
          routeAuthorization: authorization,
          encounterAdmission,
          realityEntryContext:
            identityRecovery.realityEntryContext,
          lifeSourceSession:
            identityRecovery.lifeSourceSession,
          requestDateSource,
        });
      if (activationSourceResult.status !== "AVAILABLE") {
        clearRealityRouteActivationSourceContextForAdmission(
          encounterAdmission,
        );
        const rollback =
          await rollbackRealityEncounterAdmission({
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
        return;
      }

      const latestIntent =
        readCurrentRealityEncounterIntent();
      if (
        latestIntent === null ||
        latestIntent.state !== "ACCEPTING_REALITY" ||
        latestIntent.intentReferenceId !==
          encounterAdmission.intentReferenceId ||
        latestIntent.encounterCycleId !==
          encounterAdmission.encounterCycleId ||
        latestIntent.revision !==
          encounterAdmission.intentRevision ||
        latestIntent.sourceReferenceId !==
          encounterAdmission.identityReferences.sourceReferenceId
      ) {
        clearRealityRouteActivationSourceContextForAdmission(
          encounterAdmission,
        );
        await rollbackRealityEncounterAdmission({
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
        return;
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
    })();

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
    let cancelled = false;
    void failRealityEncounterAcceptance({
      intentReferenceId: encounterAdmission.intentReferenceId,
      encounterCycleId: encounterAdmission.encounterCycleId,
      intentRevision: encounterAdmission.intentRevision,
      stage: assemblyFailure.stage,
      reason: assemblyFailure.reason,
    }).then((failure) => {
      if (
        !cancelled &&
        failure.status === "FAILED_RETRYABLE"
      ) {
        setHostAcceptanceFailure(assemblyFailure);
      }
    });
    return () => {
      cancelled = true;
    };
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
    async (outcome: RealityHostAcceptanceOutcome) => {
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
        const failure = await failRealityEncounterAcceptance({
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
        await commitRealityEncounterActive(outcome);
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
            canonicalRevision:
              commitResult.canonicalRevision,
            recognitionReceipt:
              commitResult.recognitionReceipt,
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

  if (continuitySuperseded) {
    return (
      <main
        className="gy-reality-route-guard"
        data-reality-adventure-continuity="SUPERSEDED_BY_GRAVITY"
      >
        <p role="status">
          这次现实已经由同一生命承接，继续回到它正在发生的地方。
        </p>
        <button
          type="button"
          onClick={() => navigate(GUANYAO_ROUTES.dynamics)}
        >
          继续同行
        </button>
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
          canonicalRevision:
            activeCommitReceipt.canonicalRevision,
          recognitionReceipt:
            activeCommitReceipt.recognitionReceipt,
          activeIntent: currentRealityIntent,
        })
      : preActivePresentationReady
        ? Object.freeze({
            phase: "PRE_ACTIVE_PRESENTATION" as const,
            admissionRevision:
              encounterAdmission.intentRevision,
            activeRevision: null,
            canonicalRevision: null,
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
  const requestGravityTransfer = async (
    request: GravityEntryTransferRequest,
  ) => {
    const cutover =
      await executeRealityToGravityCutover(request);
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
      canonicalBodyImprintDecision={canonicalBodyImprintDecision}
      returningLifeWorldEntry={returningLifeWorldEntry}
      choiceReturn={choiceReturn}
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
