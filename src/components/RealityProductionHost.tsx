import { useState } from "react";
import { RealityChoicePresentation } from "./RealityChoicePresentation";
import { RealityGravityPresentation } from "./RealityGravityPresentation";
import { RealityPressurePresentation } from "./RealityPressurePresentation";
import {
  advanceRealityProductionChoiceConsumer,
  initializeRealityProductionChoiceConsumer,
} from "../services/realityProductionChoiceConsumer";
import {
  advanceRealityProductionGravityConsumer,
  initializeRealityProductionGravityConsumer,
} from "../services/realityProductionGravityConsumer";
import {
  advanceRealityProductionPressureConsumer,
  initializeRealityProductionPressureConsumer,
} from "../services/realityProductionPressureConsumer";
import { isRealityProductionPressureHostInputReady } from "../services/realityProductionPressureHostInputContract";
import type {
  RealityProductionHostBoundary,
  RealityProductionHostProps,
} from "../types/realityProductionRouteEntry";

export const REALITY_PRODUCTION_HOST_BOUNDARY:
  RealityProductionHostBoundary = Object.freeze({
    productionRealityHostOnly: true,
    authorizedRealitySourceOnly: true,
    productionPressureConsumerOnly: true,
    productionPressureHostInputRequired: true,
    pressureSeedConsumerInputReadOnly: true,
    pressureSeedConsumerNotActivated: true,
    sharedFrozenPressurePresentationOnly: true,
    explicitPressureObservationOnly: true,
    productionGravityConsumerOnly: true,
    sharedFrozenGravityPresentationOnly: true,
    explicitGravityObservationOnly: true,
    productionChoiceConsumerOnly: true,
    sharedFrozenChoicePresentationOnly: true,
    explicitChoiceActiveResponseOnly: true,
    crystalReadinessHoldOnly: true,
    noFixtureSource: true,
    noPrototypeSource: true,
    noDefaultSource: true,
    noEngineInvocation: true,
    noPressureEngine: true,
    noPressureSeedMatching: true,
    noPressureResult: true,
    noInertiaEngine: true,
    noBehaviorEngine: true,
    noRecommendedAction: true,
    noBestChoice: true,
    noCrystalExecution: true,
    noRendererInvocation: true,
    noLegacyDynamicsRuntime: true,
    noSourceMutation: true,
    noStorageRead: true,
    noStorageWrite: true,
    noNavigationMutation: true,
  });

export function RealityProductionHost({
  routeAuthorization,
  pressureSeedHostInput,
}: RealityProductionHostProps) {
  const sourceContext = routeAuthorization.sourceContext;
  const [pressureResult, setPressureResult] = useState(() =>
    initializeRealityProductionPressureConsumer({ routeAuthorization }),
  );
  const [gravityResult, setGravityResult] = useState<
    ReturnType<typeof initializeRealityProductionGravityConsumer> | null
  >(null);
  const [choiceResult, setChoiceResult] = useState<
    ReturnType<typeof initializeRealityProductionChoiceConsumer> | null
  >(null);
  const pressureSeedHostInputReady =
    isRealityProductionPressureHostInputReady(
      pressureSeedHostInput,
      routeAuthorization.sourceReferenceId,
    );

  if (
    !pressureSeedHostInputReady ||
    pressureResult.status !== "READY" ||
    gravityResult?.status === "BLOCKED" ||
    choiceResult?.status === "BLOCKED"
  ) {
    return (
      <main
        data-production-reality-status="SOURCE_NOT_READY"
        data-guard-reason={
          !pressureSeedHostInputReady
            ? "PRESSURE_SEED_HOST_INPUT_NOT_READY"
            : pressureResult.status === "BLOCKED"
            ? pressureResult.reason
            : gravityResult?.status === "BLOCKED"
            ? gravityResult.reason
            : choiceResult?.reason
        }
      >
        <p role="status">SOURCE_NOT_READY</p>
      </main>
    );
  }

  const pressureSession = pressureResult.session;
  const gravitySession =
    gravityResult?.status === "READY" ? gravityResult.session : null;
  const choiceSession =
    choiceResult?.status === "READY" ? choiceResult.session : null;
  const confirmPressureObservation = () => {
    if (
      pressureSession.interactionAvailability !==
      "PRESSURE_OBSERVATION_CONFIRM"
    ) {
      return;
    }
    const nextPressureResult = advanceRealityProductionPressureConsumer({
      session: pressureSession,
      event: "PRESSURE_OBSERVATION_CONFIRM",
    });
    setPressureResult(nextPressureResult);
    if (nextPressureResult.status === "READY") {
      setGravityResult(
        initializeRealityProductionGravityConsumer({
          pressureSession: nextPressureResult.session,
        }),
      );
    }
  };
  const confirmGravityObservation = () => {
    if (
      gravitySession?.interactionAvailability !==
      "GRAVITY_OBSERVATION_CONFIRM"
    ) {
      return;
    }
    const nextGravityResult = advanceRealityProductionGravityConsumer({
      session: gravitySession,
      event: "GRAVITY_OBSERVATION_CONFIRM",
    });
    setGravityResult(nextGravityResult);
    if (nextGravityResult.status === "READY") {
      setChoiceResult(
        initializeRealityProductionChoiceConsumer({
          gravitySession: nextGravityResult.session,
        }),
      );
    }
  };
  const activateChoiceResponse = () => {
    if (
      choiceSession?.interactionAvailability !== "CHOICE_ACTIVE_RESPONSE"
    ) {
      return;
    }
    setChoiceResult(
      advanceRealityProductionChoiceConsumer({
        session: choiceSession,
        event: "CHOICE_ACTIVE_RESPONSE",
      }),
    );
  };

  return (
    <main
      data-production-reality-status="AUTHORIZED_PRODUCTION_REALITY_SOURCE"
      data-reality-production-host-state={
        choiceSession?.crystalReadiness === "READY"
          ? "CRYSTAL_READY_HOLD"
          : choiceSession
          ? "CHOICE_RESPONSE_SPACE"
          : gravitySession
          ? "GRAVITY_OBSERVATION"
          : "PRESSURE_OBSERVATION"
      }
      data-source-experience-mode={sourceContext.sourceExperienceMode}
      data-source-provenance={sourceContext.sourceProvenance}
      data-source-reference-id={sourceContext.sourceReferenceId}
      data-pressure-seed-host-input="READY"
      data-pressure-seed-delivery-reference={
        pressureSeedHostInput.deliverySession.currentBundleReferenceId
      }
      data-pressure-recognition-state={pressureSession.pressureStageState}
      data-pressure-observation-state={pressureSession.observationState}
      data-pressure-tension-awareness={pressureSession.tensionAwareness}
      data-gravity-readiness={pressureSession.gravityReadiness}
      data-pressure-interaction={pressureSession.interactionAvailability}
      data-gravity-stage={gravitySession?.gravityStageState ?? "NOT_STARTED"}
      data-automatic-response-state={
        gravitySession?.automaticResponseState ?? "WAITING_FOR_GRAVITY"
      }
      data-pattern-awareness={
        gravitySession?.patternAwarenessState ?? "UNSEEN"
      }
      data-choice-readiness={gravitySession?.choiceReadiness ?? "NOT_READY"}
      data-gravity-interaction={
        gravitySession?.interactionAvailability ?? "NONE"
      }
      data-choice-stage={choiceSession?.choiceStageState ?? "NOT_STARTED"}
      data-response-gap-state={
        choiceSession?.responseGapState ?? "WAITING_FOR_GRAVITY"
      }
      data-alternative-response-state={
        choiceSession?.alternativeResponseState ?? "UNSEEN"
      }
      data-crystal-readiness={
        choiceSession?.crystalReadiness ?? "NOT_READY"
      }
      data-choice-interaction={
        choiceSession?.interactionAvailability ?? "NONE"
      }
    >
      {choiceSession ? (
        <RealityChoicePresentation
          choiceActiveResponseConfirmed={
            choiceSession.choiceActiveResponseConfirmed
          }
          interactionAvailability={choiceSession.interactionAvailability}
          crystalReadiness={choiceSession.crystalReadiness}
          onActivate={activateChoiceResponse}
        />
      ) : gravitySession ? (
        <RealityGravityPresentation
          gravityObservationConfirmed={
            gravitySession.gravityObservationConfirmed
          }
          interactionAvailability={gravitySession.interactionAvailability}
          choiceReadiness={gravitySession.choiceReadiness}
          onConfirm={confirmGravityObservation}
        />
      ) : (
        <RealityPressurePresentation
          pressureObservationConfirmed={
            pressureSession.pressureObservationConfirmed
          }
          interactionAvailability={pressureSession.interactionAvailability}
          gravityReadiness={pressureSession.gravityReadiness}
          onConfirm={confirmPressureObservation}
        />
      )}
    </main>
  );
}
