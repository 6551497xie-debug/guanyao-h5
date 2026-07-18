import type {
  RealityPressureSeedCaptureCommand,
  RealityPressureSeedCaptureResult,
} from "./realityPressureSeedCaptureContract";
import type { RealityPressureSeedCandidateSourceContext } from "./realityPressureSeedCandidateSource";

export type RealityPressureSeedCaptureAdapterBoundary = Readonly<{
  captureAdapterOnly: true;
  authorizedCandidateSourceContextOnly: true;
  explicitUserRecognitionOnly: true;
  existingSelectedContextBuilderOnly: true;
  sourceReferenceContinuityRequired: true;
  bundleReferenceContinuityRequired: true;
  candidateMembershipRequired: true;
  immutableOutputOnly: true;
  dualSourceProvenanceRequired: true;
  gravityReadinessOutputOnly: true;
  noFixtureSource: true;
  noPrototypeSource: true;
  noDefaultSource: true;
  noReferenceOnlySource: true;
  noSourceFallback: true;
  noCandidateSourceResolution: true;
  noCandidateAssembly: true;
  noNewPressureEngine: true;
  noAutomaticSelection: true;
  noPressureConsumerIntegration: true;
  noGravityIntegration: true;
  noUiIntegration: true;
  noRendererInvocation: true;
  noRouteMutation: true;
  noNavigationMutation: true;
  noStorageRead: true;
  noStorageWrite: true;
}>;

export type RealityPressureSeedCaptureAdapterInput = Readonly<{
  sourceContext: RealityPressureSeedCandidateSourceContext;
  command: RealityPressureSeedCaptureCommand;
}>;

export type RealityPressureSeedCaptureAdapterResult =
  RealityPressureSeedCaptureResult &
    Readonly<{
      source: "reality_pressure_seed_capture_adapter";
      boundary: RealityPressureSeedCaptureAdapterBoundary;
    }>;
