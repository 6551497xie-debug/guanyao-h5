import { useState } from "react";
import { RealityPressureSeedPresentation } from "./RealityPressureSeedPresentation";
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
    gravityReadinessHoldOnly: true,
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

  return (
    <main
      data-production-reality-status="AUTHORIZED_PRODUCTION_REALITY_SOURCE"
      data-reality-production-host-state={
        pressureSeedSession.gravityReadiness === "READY"
          ? "GRAVITY_READY_HOLD"
          : "PRESSURE_SEED_RECOGNITION"
      }
      data-source-experience-mode={sourceContext.sourceExperienceMode}
      data-source-provenance={sourceContext.sourceProvenance}
      data-source-reference-id={sourceContext.sourceReferenceId}
      data-pressure-runtime="V2_PRESSURE_SEED_ONLY"
      data-pressure-seed-host-input="READY"
      data-pressure-seed-continuation="ACTIVE"
      data-pressure-seed-delivery-reference={
        continuationContext.deliverySession.currentBundleReferenceId
      }
      data-pressure-seed-capture-state={pressureSeedSession.captureState}
      data-pressure-seed-bundle-reference={
        pressureSeedSession.candidateBundleReferenceId
      }
      data-gravity-readiness={pressureSeedSession.gravityReadiness}
      data-gravity-stage="NOT_STARTED"
      data-choice-stage="NOT_STARTED"
      data-crystal-readiness="NOT_READY"
    >
      <RealityPressureSeedPresentation
        session={pressureSeedSession}
        onRecognize={recognizePressureSeed}
        onRequestNextBundle={requestNextPressureSeedBundle}
        onPause={pausePressureSeed}
      />
    </main>
  );
}
