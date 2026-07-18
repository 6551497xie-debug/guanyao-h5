import { useState } from "react";
import { RealityGravityPresentation } from "./RealityGravityPresentation";
import { RealityPressurePresentation } from "./RealityPressurePresentation";
import {
  advanceRealityProductionGravityConsumer,
  initializeRealityProductionGravityConsumer,
} from "../services/realityProductionGravityConsumer";
import {
  advanceRealityProductionPressureConsumer,
  initializeRealityProductionPressureConsumer,
} from "../services/realityProductionPressureConsumer";
import type {
  RealityProductionHostBoundary,
  RealityProductionHostProps,
} from "../types/realityProductionRouteEntry";

export const REALITY_PRODUCTION_HOST_BOUNDARY:
  RealityProductionHostBoundary = Object.freeze({
    productionRealityHostOnly: true,
    authorizedRealitySourceOnly: true,
    productionPressureConsumerOnly: true,
    sharedFrozenPressurePresentationOnly: true,
    explicitPressureObservationOnly: true,
    productionGravityConsumerOnly: true,
    sharedFrozenGravityPresentationOnly: true,
    explicitGravityObservationOnly: true,
    choiceReadinessHoldOnly: true,
    noFixtureSource: true,
    noPrototypeSource: true,
    noDefaultSource: true,
    noEngineInvocation: true,
    noPressureEngine: true,
    noPressureSeedMatching: true,
    noPressureResult: true,
    noInertiaEngine: true,
    noChoiceExecution: true,
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
}: RealityProductionHostProps) {
  const sourceContext = routeAuthorization.sourceContext;
  const [pressureResult, setPressureResult] = useState(() =>
    initializeRealityProductionPressureConsumer({ routeAuthorization }),
  );
  const [gravityResult, setGravityResult] = useState<
    ReturnType<typeof initializeRealityProductionGravityConsumer> | null
  >(null);

  if (
    pressureResult.status !== "READY" ||
    gravityResult?.status === "BLOCKED"
  ) {
    return (
      <main
        data-production-reality-status="SOURCE_NOT_READY"
        data-guard-reason={
          pressureResult.status === "BLOCKED"
            ? pressureResult.reason
            : gravityResult?.reason
        }
      >
        <p role="status">SOURCE_NOT_READY</p>
      </main>
    );
  }

  const pressureSession = pressureResult.session;
  const gravitySession =
    gravityResult?.status === "READY" ? gravityResult.session : null;
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
    setGravityResult(
      advanceRealityProductionGravityConsumer({
        session: gravitySession,
        event: "GRAVITY_OBSERVATION_CONFIRM",
      }),
    );
  };

  return (
    <main
      data-production-reality-status="AUTHORIZED_PRODUCTION_REALITY_SOURCE"
      data-reality-production-host-state={
        gravitySession?.choiceReadiness === "READY"
          ? "CHOICE_READY_HOLD"
          : gravitySession
          ? "GRAVITY_OBSERVATION"
          : "PRESSURE_OBSERVATION"
      }
      data-source-experience-mode={sourceContext.sourceExperienceMode}
      data-source-provenance={sourceContext.sourceProvenance}
      data-source-reference-id={sourceContext.sourceReferenceId}
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
    >
      {gravitySession ? (
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
