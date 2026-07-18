import type { RealityPressureSeedCandidate } from "./realityPressureSeedCaptureContract";
import type { RealityProductionPressureSeedSession } from "./realityProductionPressureSeedConsumer";

export type RealityPressureSeedPresentationBoundary = Readonly<{
  productionPressureSeedPresentationOnly: true;
  v2PressureSeedSessionOnly: true;
  statelessPresentationOnly: true;
  candidateSurfaceAndShellOnly: true;
  explicitRecognitionCallbackOnly: true;
  explicitNextBundleCallbackOnly: true;
  explicitPauseCallbackOnly: true;
  sourceReferenceReadOnly: true;
  noFixtureSource: true;
  noPrototypeAuthorization: true;
  noDefaultCandidate: true;
  noAutomaticSelection: true;
  noSourceResolution: true;
  noEngineInvocation: true;
  noPressureCalculation: true;
  noPressureSeedMatching: true;
  noCaptureExecution: true;
  noConsumerInvocation: true;
  noGravityExecution: true;
  noChoiceExecution: true;
  noCrystalExecution: true;
  noRendererInvocation: true;
  noNavigationMutation: true;
  noStorageRead: true;
  noStorageWrite: true;
}>;

export type RealityPressureSeedPresentationProps = Readonly<{
  session: RealityProductionPressureSeedSession;
  onRecognize: (candidateReferenceId: string) => void;
  onRequestNextBundle: () => void;
  onPause: () => void;
}>;

export type RealityPressureSeedCandidatePresentationProps = Readonly<{
  candidate: RealityPressureSeedCandidate;
  recognitionAvailable: boolean;
  onRecognize: (candidateReferenceId: string) => void;
}>;
