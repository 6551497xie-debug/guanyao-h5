import type { RealityPressureSeedCandidate } from "./realityPressureSeedCaptureContract";
import type { RealityProductionPressureSeedSession } from "./realityProductionPressureSeedConsumer";
import type {
  RealityExplicitLeaveUiState,
} from "./realityProductionRouteEntry";
import type {
  RealityPressureSurfaceOutcome,
  RealitySurfaceAdmissionAttempt,
} from "./xinmaiRealitySurfaceAdmission";

export type RealityPressureSeedPresentationBoundary = Readonly<{
  productionPressureSeedPresentationOnly: true;
  v2PressureSeedSessionOnly: true;
  statelessPresentationOnly: true;
  candidateSurfaceAndShellOnly: true;
  explicitRecognitionCallbackOnly: true;
  explicitNextBundleCallbackOnly: true;
  explicitPauseCallbackOnly: true;
  explicitLeaveCallbackOnly: true;
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
  explicitLeaveState: RealityExplicitLeaveUiState;
  onExplicitLeaveRequest: () => void;
  realitySurfaceAdmissionAttempt: RealitySurfaceAdmissionAttempt;
  onRealityPressureSurfaceOutcome: (
    outcome: RealityPressureSurfaceOutcome,
  ) => void;
}>;

export type RealityPressureSeedCandidatePresentationProps = Readonly<{
  candidate: RealityPressureSeedCandidate;
  recognitionAvailable: boolean;
  onRecognize: (candidateReferenceId: string) => void;
}>;
