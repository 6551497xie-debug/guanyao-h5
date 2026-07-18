import type {
  GravityChoiceReadiness,
  GravityExperienceInteractionAvailability,
} from "./gravityExperienceUIRuntime";

export type RealityGravityPresentationBoundary = Readonly<{
  sharedFrozenGravityPresentationOnly: true;
  statelessPresentationOnly: true;
  explicitConfirmationCallbackOnly: true;
  noSourceResolution: true;
  noFixtureSource: true;
  noPrototypeAuthorization: true;
  noEngineInvocation: true;
  noInertiaCalculation: true;
  noBehaviorScoring: true;
  noUserDiagnosis: true;
  noChoiceExecution: true;
  noCrystalExecution: true;
  noRendererInvocation: true;
  noStorageRead: true;
  noStorageWrite: true;
}>;

export type RealityGravityPresentationProps = Readonly<{
  gravityObservationConfirmed: boolean;
  interactionAvailability: GravityExperienceInteractionAvailability;
  choiceReadiness: GravityChoiceReadiness;
  onConfirm: () => void;
}>;
