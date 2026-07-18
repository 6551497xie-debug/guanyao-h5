import type {
  ChoiceCrystalReadiness,
  ChoiceExperienceInteractionAvailability,
} from "./choiceExperienceUIRuntime";

export type RealityChoicePresentationBoundary = Readonly<{
  sharedFrozenChoicePresentationOnly: true;
  statelessPresentationOnly: true;
  explicitActiveResponseCallbackOnly: true;
  userOwnedResponseOnly: true;
  noSourceResolution: true;
  noFixtureSource: true;
  noPrototypeAuthorization: true;
  noEngineInvocation: true;
  noBehaviorGeneration: true;
  noRecommendedAction: true;
  noBestChoice: true;
  noUserJudgement: true;
  noCrystalExecution: true;
  noRendererInvocation: true;
  noStorageRead: true;
  noStorageWrite: true;
}>;

export type RealityChoicePresentationProps = Readonly<{
  choiceActiveResponseConfirmed: boolean;
  interactionAvailability: ChoiceExperienceInteractionAvailability;
  crystalReadiness: ChoiceCrystalReadiness;
  onActivate: () => void;
}>;
