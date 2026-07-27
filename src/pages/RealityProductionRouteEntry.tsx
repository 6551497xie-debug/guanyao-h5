import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { RealityProductionHost } from "../components/RealityProductionHost";
import {
  readGenesisProductionRealityEntryContext,
  restoreGenesisProductionRealityEntryContext,
} from "../services/genesisProductionRecognitionRealityEntry";
import {
  authorizeRealityProductionRoute,
  REALITY_PRODUCTION_ROUTE_TARGET,
} from "../services/realityProductionRouteAuthorization";
import {
  activateRealityRouteActivationSourceContext,
  captureExplicitRealityRequestDateSource,
  clearRealityRouteActivationSourceContext,
  readRealityRouteActivationSourceContext,
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
import { writeSelectedPressureSeedContext } from "../services/guanyaoSelectedPressureSeedContextPersistenceAdapter";
import { resolveDynamicsInputContext } from "../services/guanyaoDynamicsInputContextAdapter";
import { readPersonalityRingLite } from "../services/personalityRingLiteService";
import {
  readPersistedGenesisPresenceVisualRealization,
  readPersistedGenesisVisualContinuity,
  readPersistedLaunchLifeSourceSession,
  restorePersistedRealUserGenesisVisualSourceContext,
} from "../services/sessionService";
import { readRealUserGenesisVisualSourceContext } from "../services/realUserGenesisVisualSourceContext";
import { resolveLifeUniverseCrystalSourceSlot } from "../renderers/lifeUniverseStarField";
import { GUANYAO_ROUTES } from "../routes/guanyaoRoutes";
import type { RealityProductionRouteEntryBoundary } from "../types/realityProductionRouteEntry";
import type { RealityProductionHostProps } from "../types/realityProductionRouteEntry";
import type { DynamicsHandoffState } from "../types/gravityRuntimeInput";

export const REALITY_PRODUCTION_ROUTE_ENTRY_BOUNDARY:
  RealityProductionRouteEntryBoundary = Object.freeze({
    productionRouteEntryOnly: true,
    exactRealityRouteOnly: true,
    inMemoryRealityEntryContextOnly: true,
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
    selectedPressureSeedHandoffWriteOnly: true,
    explicitDynamicsNavigationOnly: true,
    noGenesisNavigationMutation: true,
    noPresenceMutation: true,
  });

export function RealityProductionRouteEntry() {
  const navigate = useNavigate();
  const location = useLocation();
  const [entryCycle] = useState(() => {
    clearRealityRouteActivationSourceContext();
    return "NEW_REALITY_ENCOUNTER" as const;
  });
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
  const routeState = location.state as
    | {
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
      }
    | null;
  const routeVisualContinuity = routeState?.visualContinuity ?? null;
  const routeReturningLifeMemory = routeState?.returningLifeMemory ?? null;
  const returningLifeWorldEntry =
    routeState?.returningEntry === "SAME_LIFE_NEW_REALITY";
  const choiceContinuation =
    routeState?.choiceContinuation === "AWAITING_LIVED_RESPONSE_RECOGNITION"
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
    Number.isInteger(routeState?.choiceLifeTraceSourceSlot) &&
    (routeState?.choiceLifeTraceSourceSlot ?? -1) >= 0 &&
    (routeState?.choiceLifeTraceSourceSlot ?? 7) <= 6
      ? routeState?.choiceLifeTraceSourceSlot ?? null
      : null;
  const persistedVisualContinuity =
    readPersistedGenesisVisualContinuity();
  const persistedLifeSourceSession =
    readPersistedLaunchLifeSourceSession();
  const visualContinuity =
    routeVisualContinuity ?? persistedVisualContinuity;
  const realUserContext =
    readRealUserGenesisVisualSourceContext() ??
    restorePersistedRealUserGenesisVisualSourceContext();
  const persistedPresenceVisualRealization =
    readPersistedGenesisPresenceVisualRealization();
  const restoredIdentityReady =
    visualContinuity !== null &&
    realUserContext !== null &&
    persistedPresenceVisualRealization !== null &&
    visualContinuity.sourceReferenceId === realUserContext.sourceReferenceId &&
    visualContinuity.sourceReferenceId ===
      persistedPresenceVisualRealization.sourceReferenceId;
  const entryContext =
    readGenesisProductionRealityEntryContext() ??
    (restoredIdentityReady
      ? restoreGenesisProductionRealityEntryContext(
          visualContinuity.sourceReferenceId,
        )
      : null);
  const restoredRequestDateSource =
    restoredIdentityReady && entryContext !== null
      ? captureExplicitRealityRequestDateSource({
          sourceReferenceId: entryContext.sourceReferenceId,
          calendarInstant: new Date(),
        })
      : null;
  const restoredActivationSourceResult =
    restoredIdentityReady &&
    entryContext !== null &&
    realUserContext !== null &&
    restoredRequestDateSource !== null
      ? activateRealityRouteActivationSourceContext({
          realityEntryContext: entryContext,
          lifeSourceSession: realUserContext.lifeSourceSession,
          requestDateSource: restoredRequestDateSource,
        })
      : null;
  const activationSourceContext =
    readRealityRouteActivationSourceContext() ??
    (restoredActivationSourceResult?.status === "AVAILABLE"
      ? restoredActivationSourceResult.context
      : null);
  const genesisPresenceContinuityContext =
    readGenesisRealityPresenceContinuityContext() ??
    (restoredIdentityReady &&
    entryContext !== null &&
    persistedPresenceVisualRealization !== null
      ? activateGenesisRealityPresenceContinuityContext({
          presenceRealization: persistedPresenceVisualRealization,
          realityEntryContext: entryContext,
        })
      : null);
  const authorization = authorizeRealityProductionRoute({
    routeTarget: REALITY_PRODUCTION_ROUTE_TARGET,
    sourceReferenceId: entryContext?.sourceReferenceId ?? null,
  });
  const candidateActivationResult =
    authorization.status === "READY" && activationSourceContext !== null
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
          routeCandidateActivationResult: candidateActivationResult,
          routeCandidateRequestResult: candidateRequestResult,
          routeDeliveryResult: deliveryResult,
        })
      : null;

  if (
    authorization.status !== "READY" ||
    activationSourceContext === null ||
    activationSourceContext.sourceReferenceId !==
      authorization.sourceReferenceId ||
    candidateActivationResult?.status !== "READY" ||
    candidateRequestResult?.status !== "READY" ||
    deliveryResult?.status !== "READY" ||
    pressureHostInputResult?.status !== "READY" ||
    pressureSeedContinuationResult?.status !== "READY" ||
    pressureSeedContinuationResult.context.phase !==
      "READY_FOR_CONSUMER_INITIALIZATION" ||
    genesisPresenceContinuityContext === null ||
    genesisPresenceContinuityContext.sourceReferenceId !==
      authorization.sourceReferenceId ||
    genesisPresenceContinuityContext.bridge.continuityState !==
      "CARRIED_TO_REALITY" ||
    visualContinuity === null ||
    visualContinuity.sourceReferenceId !== authorization.sourceReferenceId ||
    visualContinuity.consumerSourceResult.consumerSource.sourceReferenceId !==
      authorization.sourceReferenceId ||
    visualContinuity.visualCalibrationBundle.sourceReferenceId !==
      authorization.sourceReferenceId ||
    visualContinuity.visualCalibrationBundle.runtimeStage !== "COMPLETION"
  ) {
    // The legacy recovery destination is still 返回出生信息; only the
    // user-facing language now describes the life state instead of an
    // engineering failure.
    return (
      <main
        data-production-reality-status="SOURCE_NOT_READY"
        data-player-life-source-restored={
          realUserContext === null ? "false" : "true"
        }
        data-player-life-source-asset-restored={
          persistedLifeSourceSession === null ? "false" : "true"
        }
        data-player-life-recognition-restored={
          persistedPresenceVisualRealization === null ? "false" : "true"
        }
        data-player-life-visual-restored={
          visualContinuity === null ? "false" : "true"
        }
        data-guard-reason={
          authorization.status !== "READY"
            ? authorization.guardReason
            : activationSourceContext === null ||
              activationSourceContext.sourceReferenceId !==
                authorization.sourceReferenceId
            ? "REALITY_ACTIVATION_SOURCE_CONTEXT_NOT_AVAILABLE"
            : candidateActivationResult?.status !== "READY"
            ? candidateActivationResult?.reason ??
              "PRESSURE_CANDIDATE_ACTIVATION_NOT_READY"
            : candidateRequestResult?.status !== "READY"
            ? candidateRequestResult?.reason ??
              "PRESSURE_CANDIDATE_REQUEST_NOT_READY"
            : deliveryResult?.status !== "READY"
            ? deliveryResult?.reason ??
              "PRESSURE_DELIVERY_ORCHESTRATION_NOT_READY"
            : pressureHostInputResult?.status !== "READY"
            ? pressureHostInputResult?.reason ??
              "PRESSURE_HOST_INPUT_NOT_READY"
            : pressureSeedContinuationResult?.status !== "READY"
            ? pressureSeedContinuationResult?.reason ??
              "PRESSURE_SEED_CONTINUATION_NOT_READY"
            : genesisPresenceContinuityContext === null
            ? "GENESIS_PRESENCE_CONTINUITY_NOT_AVAILABLE"
            : genesisPresenceContinuityContext.sourceReferenceId !==
                authorization.sourceReferenceId
              ? "GENESIS_PRESENCE_CONTINUITY_SOURCE_MISMATCH"
              : visualContinuity === null
                ? "GENESIS_VISUAL_CONTINUITY_NOT_AVAILABLE"
                : visualContinuity.sourceReferenceId !==
                    authorization.sourceReferenceId
                  ? "GENESIS_VISUAL_CONTINUITY_SOURCE_MISMATCH"
              : "GENESIS_PRESENCE_CONTINUITY_NOT_READY"
        }
      >
        <p role="status">你的生命世界还未唤醒。</p>
        <button
          type="button"
          onClick={() => navigate("/launch-lab", { replace: true })}
        >
          唤醒生命世界
        </button>
      </main>
    );
  }

  const continueToGravity: RealityProductionHostProps["onContinueToGravity"] =
    (selectedPressureSeedContext) => {
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
      key={entryCycle}
      routeAuthorization={authorization}
      pressureSeedHostInput={pressureHostInputResult.input}
      pressureSeedContinuationContext={pressureSeedContinuationResult.context}
      genesisPresenceContinuityContext={genesisPresenceContinuityContext}
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
      onContinueToGravity={continueToGravity}
    />
  );
}
