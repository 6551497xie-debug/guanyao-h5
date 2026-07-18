import { useState } from "react";
import { RealityPressurePresentation } from "./RealityPressurePresentation";
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
    gravityReadinessHoldOnly: true,
    noFixtureSource: true,
    noPrototypeSource: true,
    noDefaultSource: true,
    noEngineInvocation: true,
    noPressureEngine: true,
    noPressureSeedMatching: true,
    noPressureResult: true,
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

export function RealityProductionHost({
  routeAuthorization,
}: RealityProductionHostProps) {
  const sourceContext = routeAuthorization.sourceContext;
  const [pressureResult, setPressureResult] = useState(() =>
    initializeRealityProductionPressureConsumer({ routeAuthorization }),
  );

  if (pressureResult.status !== "READY") {
    return (
      <main
        data-production-reality-status="SOURCE_NOT_READY"
        data-guard-reason={pressureResult.reason}
      >
        <p role="status">SOURCE_NOT_READY</p>
      </main>
    );
  }

  const pressureSession = pressureResult.session;
  const confirmPressureObservation = () => {
    if (
      pressureSession.interactionAvailability !==
      "PRESSURE_OBSERVATION_CONFIRM"
    ) {
      return;
    }
    setPressureResult(
      advanceRealityProductionPressureConsumer({
        session: pressureSession,
        event: "PRESSURE_OBSERVATION_CONFIRM",
      }),
    );
  };

  return (
    <main
      data-production-reality-status="AUTHORIZED_PRODUCTION_REALITY_SOURCE"
      data-reality-production-host-state={
        pressureSession.gravityReadiness === "READY"
          ? "GRAVITY_READY_HOLD"
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
    >
      <RealityPressurePresentation
        pressureObservationConfirmed={
          pressureSession.pressureObservationConfirmed
        }
        interactionAvailability={pressureSession.interactionAvailability}
        gravityReadiness={pressureSession.gravityReadiness}
        onConfirm={confirmPressureObservation}
      />
    </main>
  );
}
