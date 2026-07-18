import type {
  PressureRecognitionGravityReadiness,
  PressureRecognitionInteractionAvailability,
} from "./pressureRecognitionUIRuntime";

export type RealityPressurePresentationBoundary = Readonly<{
  sharedFrozenPressurePresentationOnly: true;
  statelessPresentationOnly: true;
  explicitConfirmationCallbackOnly: true;
  noSourceResolution: true;
  noFixtureSource: true;
  noPrototypeAuthorization: true;
  noEngineInvocation: true;
  noPressureCalculation: true;
  noPressureSeedMatching: true;
  noDiagnosis: true;
  noGravityExecution: true;
  noChoiceExecution: true;
  noCrystalExecution: true;
  noRendererInvocation: true;
  noStorageRead: true;
  noStorageWrite: true;
}>;

export type RealityPressurePresentationProps = Readonly<{
  pressureObservationConfirmed: boolean;
  interactionAvailability: PressureRecognitionInteractionAvailability;
  gravityReadiness: PressureRecognitionGravityReadiness;
  onConfirm: () => void;
}>;
