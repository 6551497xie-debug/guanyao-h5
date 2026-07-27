import { useState } from "react";
import { RealityPressureSeedPresentation } from "./RealityPressureSeedPresentation";
import { RealityLifeUniverseCanvas } from "./RealityLifeUniverseCanvas";
import { bridgeRealityPressureActivationCandidateRequestContext } from "../services/realityPressureActivationCandidateRequestBridge";
import { advanceRealityPressureActivationDeliveryOrchestration } from "../services/realityPressureActivationDeliveryOrchestrationBridge";
import { isRealityProductionPressureHostInputReady } from "../services/realityProductionPressureHostInputContract";
import {
  advanceRealityPressureSeedContinuationContext,
  attachRealityPressureSeedSessionToContinuationContext,
} from "../services/realityPressureSeedContinuationContext";
import {
  advanceRealityProductionPressureSeedConsumer,
  initializeRealityProductionPressureSeedConsumer,
} from "../services/realityProductionPressureSeedConsumer";
import type { RealityPressureSeedContinuationContextResult } from "../types/realityPressureSeedContinuationContext";
import type { RealityProductionPressureSeedConsumerResult } from "../types/realityProductionPressureSeedConsumer";
import type {
  RealityProductionHostBoundary,
  RealityProductionHostProps,
} from "../types/realityProductionRouteEntry";

export const REALITY_PRODUCTION_HOST_BOUNDARY:
  RealityProductionHostBoundary = Object.freeze({
    productionRealityHostOnly: true,
    authorizedRealitySourceOnly: true,
    productionPressureSeedConsumerOnly: true,
    productionPressureHostInputRequired: true,
    pressureSeedContinuationContextRequired: true,
    pressureSeedConsumerActivated: true,
    v1PressureConsumerForbidden: true,
    v2PressureSeedPresentationOnly: true,
    explicitPressureSeedRecognitionOnly: true,
    explicitNextBundleRequestOnly: true,
    explicitGravityContinuationCallbackOnly: true,
    noFixtureSource: true,
    noPrototypeSource: true,
    noDefaultSource: true,
    noEngineInvocation: true,
    noPressureEngine: true,
    noPressureSeedMatching: true,
    noAutomaticSelection: true,
    noGravityExecution: true,
    noChoiceExecution: true,
    noCrystalExecution: true,
    noRendererInvocation: true,
    noLegacyDynamicsRuntime: true,
    noSourceMutation: true,
    noStorageRead: true,
    noStorageWrite: true,
    noNavigationMutation: true,
  });

type RealityPressureHostState = Readonly<{
  consumerResult: RealityProductionPressureSeedConsumerResult;
  continuationResult: RealityPressureSeedContinuationContextResult;
}>;

const initializePressureHostState = (
  pressureSeedContinuationContext: RealityProductionHostProps["pressureSeedContinuationContext"],
): RealityPressureHostState => {
  const consumerResult = initializeRealityProductionPressureSeedConsumer(
    pressureSeedContinuationContext.consumerInput,
  );
  const continuationResult =
    attachRealityPressureSeedSessionToContinuationContext({
      context: pressureSeedContinuationContext,
      consumerResult,
    });
  return Object.freeze({ consumerResult, continuationResult });
};

export function RealityProductionHost({
  routeAuthorization,
  pressureSeedHostInput,
  pressureSeedContinuationContext,
  genesisPresenceContinuityContext,
  visualContinuity,
  historicalRealityMemoryKey = null,
  latestCrystalMemoryKey = null,
  latestCrystalSourceSlot = null,
  returningLifeWorldEntry = false,
  choiceContinuation = null,
  onContinueToGravity,
}: RealityProductionHostProps) {
  const sourceContext = routeAuthorization.sourceContext;
  const [pressureHostState, setPressureHostState] =
    useState<RealityPressureHostState>(() =>
      initializePressureHostState(pressureSeedContinuationContext),
    );
  const pressureSeedHostInputReady =
    isRealityProductionPressureHostInputReady(
      pressureSeedHostInput,
      routeAuthorization.sourceReferenceId,
    );
  const continuationResult = pressureHostState.continuationResult;
  const consumerResult = pressureHostState.consumerResult;

  if (
    !pressureSeedHostInputReady ||
    pressureSeedContinuationContext.phase !==
      "READY_FOR_CONSUMER_INITIALIZATION" ||
    pressureSeedContinuationContext.sourceReferenceId !==
      routeAuthorization.sourceReferenceId ||
    pressureSeedHostInput.deliverySession !==
      pressureSeedContinuationContext.deliverySession ||
    pressureSeedHostInput.consumerInput !==
      pressureSeedContinuationContext.consumerInput ||
    consumerResult.status !== "READY" ||
    continuationResult.status !== "READY" ||
    continuationResult.context.phase !== "ACTIVE"
  ) {
    return (
      <main
        data-production-reality-status="SOURCE_NOT_READY"
        data-guard-reason={
          !pressureSeedHostInputReady
            ? "PRESSURE_SEED_HOST_INPUT_NOT_READY"
            : consumerResult.status !== "READY"
              ? consumerResult.reason
              : continuationResult.status !== "READY"
                ? continuationResult.reason
                : "PRESSURE_SEED_CONTINUATION_NOT_READY"
        }
      >
        <p role="status">SOURCE_NOT_READY</p>
      </main>
    );
  }

  const continuationContext = continuationResult.context;
  const pressureSeedSession = continuationContext.pressureSeedSession;
  const pressureVisualState =
    pressureSeedSession.captureState === "SEED_RECOGNIZED"
      ? "PRESSURE_RECOGNIZED"
      : pressureSeedSession.captureState === "PAUSED"
        ? "PRESSURE_PAUSED"
        : "PRESSURE_OBSERVING";
  const choiceRhythmValidationActive =
    choiceContinuation === "AWAITING_LIVED_RESPONSE_RECOGNITION";
  const choiceRhythmValidationState = choiceRhythmValidationActive
    ? pressureSeedSession.captureState === "SEED_RECOGNIZED"
      ? "CURRENT_REALITY_RESPONSE_READY_FOR_OBSERVATION"
      : pressureSeedSession.captureState === "PAUSED"
        ? "REALITY_CONTACT_PAUSED_BY_USER"
        : "AWAITING_REALITY_CONTACT"
    : "NOT_ACTIVE";
  const realityContinuityCopy = choiceRhythmValidationActive
    ? pressureVisualState === "PRESSURE_RECOGNIZED"
      ? "新的现实已经触碰到它。先看身体怎样回应，不急着把不同叫作改变。"
      : pressureVisualState === "PRESSURE_PAUSED"
        ? "你和它仍在这里，新的回应暂时不必接受检验。"
        : "刚刚出现的空间仍在身体里，新的现实从远处靠近。"
    : pressureVisualState === "PRESSURE_RECOGNIZED"
      ? "新的现实触碰了它，它仍是同一个生命。"
      : pressureVisualState === "PRESSURE_PAUSED"
        ? "你和它仍在这里，现实暂时停在远处。"
        : "你和它仍在同一片星河里。现实开始从远处靠近。";
  const realityLifeWeather =
    pressureVisualState === "PRESSURE_RECOGNIZED"
      ? "CURRENT_REALITY_MOVING_THROUGH_SAME_LIFE"
      : pressureVisualState === "PRESSURE_PAUSED"
        ? "CURRENT_REALITY_HELD_AT_DISTANCE"
        : "QUIET_IDENTITY_WITH_MEMORY";

  const applyConsumerResult = (
    nextConsumerResult: RealityProductionPressureSeedConsumerResult,
  ) => {
    setPressureHostState(
      Object.freeze({
        consumerResult: nextConsumerResult,
        continuationResult:
          attachRealityPressureSeedSessionToContinuationContext({
            context: continuationContext,
            consumerResult: nextConsumerResult,
          }),
      }),
    );
  };

  const recognizePressureSeed = (candidateReferenceId: string) => {
    if (
      !pressureSeedSession.availableEvents.includes(
        "PRESSURE_SEED_RECOGNIZE",
      )
    ) {
      return;
    }
    applyConsumerResult(
      advanceRealityProductionPressureSeedConsumer({
        session: pressureSeedSession,
        candidateSourceContext: continuationContext.candidateSourceContext,
        command: Object.freeze({
          event: "PRESSURE_SEED_RECOGNIZE" as const,
          sourceReferenceId: pressureSeedSession.sourceReferenceId,
          candidateBundleReferenceId:
            pressureSeedSession.candidateBundleReferenceId,
          recognizedCandidateReferenceId: candidateReferenceId,
        }),
      }),
    );
  };

  const pausePressureSeed = () => {
    if (!pressureSeedSession.availableEvents.includes("PRESSURE_SEED_PAUSE")) {
      return;
    }
    applyConsumerResult(
      advanceRealityProductionPressureSeedConsumer({
        session: pressureSeedSession,
        candidateSourceContext: continuationContext.candidateSourceContext,
        command: Object.freeze({
          event: "PRESSURE_SEED_PAUSE" as const,
          sourceReferenceId: pressureSeedSession.sourceReferenceId,
          candidateBundleReferenceId:
            pressureSeedSession.candidateBundleReferenceId,
          recognizedCandidateReferenceId: null,
        }),
      }),
    );
  };

  const requestNextPressureSeedBundle = () => {
    if (
      !pressureSeedSession.availableEvents.includes(
        "PRESSURE_SEED_REQUEST_NEXT_BUNDLE",
      )
    ) {
      return;
    }
    const requestResult =
      bridgeRealityPressureActivationCandidateRequestContext({
        activationContext: continuationContext.candidateActivationContext,
        deliverySession: continuationContext.deliverySession,
      });
    if (requestResult.status !== "READY") {
      setPressureHostState(
        Object.freeze({
          consumerResult,
          continuationResult: Object.freeze({
            status: "SOURCE_NOT_READY" as const,
            context: null,
            reason: "ACTIVATION_REQUEST_NOT_READY" as const,
            boundary: continuationResult.boundary,
          }),
        }),
      );
      return;
    }
    const deliveryResult =
      advanceRealityPressureActivationDeliveryOrchestration({
        deliverySession: continuationContext.deliverySession,
        pressureSeedSession,
        activationRequestContext: requestResult.context,
      });
    if (
      deliveryResult.status !== "READY" ||
      deliveryResult.operation !== "ADVANCE"
    ) {
      setPressureHostState(
        Object.freeze({
          consumerResult,
          continuationResult: Object.freeze({
            status: "SOURCE_NOT_READY" as const,
            context: null,
            reason: "DELIVERY_ADVANCE_NOT_READY" as const,
            boundary: continuationResult.boundary,
          }),
        }),
      );
      return;
    }
    const nextConsumerResult =
      advanceRealityProductionPressureSeedConsumer(
        deliveryResult.consumerInput,
      );
    setPressureHostState(
      Object.freeze({
        consumerResult: nextConsumerResult,
        continuationResult: advanceRealityPressureSeedContinuationContext({
          context: continuationContext,
          activationRequestResult: requestResult,
          deliveryResult,
          consumerResult: nextConsumerResult,
        }),
      }),
    );
  };

  const continueToGravity = () => {
    if (
      pressureSeedSession.gravityReadiness !== "READY" ||
      pressureSeedSession.selectedPressureSeedContext === null
    ) {
      return;
    }
    onContinueToGravity(pressureSeedSession.selectedPressureSeedContext);
  };

  return (
    <main
      className="gy-reality-life-universe"
      data-production-reality-status="AUTHORIZED_PRODUCTION_REALITY_SOURCE"
      data-reality-production-host-state={
        pressureSeedSession.gravityReadiness === "READY"
          ? "GRAVITY_READY_TO_CONTINUE"
          : "PRESSURE_SEED_RECOGNITION"
      }
      data-source-experience-mode={sourceContext.sourceExperienceMode}
      data-source-provenance={sourceContext.sourceProvenance}
      data-source-reference-id={sourceContext.sourceReferenceId}
      data-genesis-presence-continuity={
        genesisPresenceContinuityContext.bridge.continuityState
      }
      data-genesis-presence-arrival={
        genesisPresenceContinuityContext.bridge.arrivalState
      }
      data-pressure-runtime="V2_PRESSURE_SEED_ONLY"
      data-pressure-seed-host-input="READY"
      data-pressure-seed-continuation="ACTIVE"
      data-pressure-seed-delivery-reference={
        continuationContext.deliverySession.currentBundleReferenceId
      }
      data-pressure-seed-capture-state={pressureSeedSession.captureState}
      data-reality-entry-cycle="NEW_REALITY_ENCOUNTER"
      data-reality-entry-origin={
        returningLifeWorldEntry
          ? "RETURNING_LIFE_WORLD"
          : "GENESIS_CONTINUATION"
      }
      data-reality-historical-pressure-role={
        historicalRealityMemoryKey ? "MEMORY_ONLY" : "NONE"
      }
      data-reality-current-pressure-role={
        pressureSeedSession.selectedPressureSeedContext
          ? "CURRENT_USER_RECOGNIZED"
          : "AWAITING_NEW_RECOGNITION"
      }
      data-reality-crystal-memory-role={
        latestCrystalMemoryKey ? "BODY_IMPRINT" : "NONE"
      }
      data-choice-response-state={
        choiceRhythmValidationActive
          ? "NEW_RESPONSE_POSSIBILITY"
          : "INACTIVE"
      }
      data-choice-rhythm-continuity={
        choiceRhythmValidationActive
          ? "SAME_BODY_NEW_CADENCE_CARRIED_TO_REALITY"
          : "NONE"
      }
      data-choice-rhythm-validation={choiceRhythmValidationState}
      data-choice-body-continuity="SAME_CORE_SAME_BODY"
      data-choice-identity-effect="RESPONSE_ONLY"
      data-choice-growth-claim="NONE_UNTIL_USER_RECOGNIZES"
      data-choice-crystal-stage="NOT_STARTED"
      data-reality-pressure-visual-state={pressureVisualState}
      data-reality-life-weather={realityLifeWeather}
      data-reality-life-weather-input={
        pressureSeedSession.selectedPressureSeedContext
          ? "CURRENT_RECOGNIZED_REALITY"
          : "NONE"
      }
      data-reality-life-weather-memory-boundary="PAST_IN_BODY_NOT_CURRENT_STATE"
      data-reality-life-weather-identity-invariant="SAME_CORE_SAME_BODY_SAME_LIFE"
      data-pressure-seed-bundle-reference={
        pressureSeedSession.candidateBundleReferenceId
      }
      data-gravity-readiness={pressureSeedSession.gravityReadiness}
      data-gravity-stage="NOT_STARTED"
      data-choice-stage="NOT_STARTED"
      data-crystal-readiness="NOT_READY"
    >
      <RealityLifeUniverseCanvas
        visualContinuity={visualContinuity}
        currentRealityWeatherEnabled
        selectedPressureSeedContext={
          pressureSeedSession.selectedPressureSeedContext
        }
        historicalRealityMemoryKey={historicalRealityMemoryKey}
        latestCrystalMemoryKey={latestCrystalMemoryKey}
        latestCrystalSourceSlot={latestCrystalSourceSlot}
      />
      <p
        className="gy-reality-life-universe__arrival-copy"
        role="status"
      >
        {choiceRhythmValidationActive
          ? "你和它，带着新的呼吸继续走。"
          : "你和它，继续走进现实。"}
      </p>
      <div className="gy-reality-life-universe__disturbance" aria-hidden="true">
        <span />
        <span />
        <span />
      </div>
      <p className="gy-reality-life-universe__continuity-copy">
        {realityContinuityCopy}
      </p>
      <RealityPressureSeedPresentation
        session={pressureSeedSession}
        onRecognize={recognizePressureSeed}
        onRequestNextBundle={requestNextPressureSeedBundle}
        onPause={pausePressureSeed}
        onContinueToGravity={continueToGravity}
      />
    </main>
  );
}
