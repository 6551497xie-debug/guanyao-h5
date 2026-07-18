import type { SelectedPressureSeedContext } from "./primaryPetal";
import type {
  RealityPressureSeedCandidateBundle,
  RealityPressureSeedCaptureCommand,
  RealityPressureSeedCaptureEvent,
  RealityPressureSeedCaptureProvenance,
  RealityPressureSeedCaptureState,
} from "./realityPressureSeedCaptureContract";
import type { RealityPressureSeedCandidateSourceContext } from "./realityPressureSeedCandidateSource";
import type { RealityProductionRouteActivationAuthorization } from "./realityProductionRouteAuthorization";

export type RealityProductionPressureSeedConsumerBoundary = Readonly<{
  productionPressureSeedConsumerOnly: true;
  authorizedRealitySourceOnly: true;
  authorizedCandidateSourceContextOnly: true;
  existingCaptureAdapterOnly: true;
  immutableSessionOnly: true;
  sourceReferenceContinuityRequired: true;
  bundleReferenceContinuityRequired: true;
  explicitUserRecognitionRequired: true;
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
  noGravityExecution: true;
  noChoiceExecution: true;
  noCrystalExecution: true;
  noUiIntegration: true;
  noRendererInvocation: true;
  noRouteMutation: true;
  noNavigationMutation: true;
  noStorageRead: true;
  noStorageWrite: true;
}>;

export type RealityProductionPressureSeedSession = Readonly<{
  schemaVersion: "GUANYAO_REALITY_PRODUCTION_PRESSURE_SEED_SESSION_V2";
  source: "reality_production_pressure_seed_consumer";
  sourceExperienceMode: "REAL_USER_EXPERIENCE";
  sourceProvenance: "REAL_USER_SESSION";
  sourceReferenceId: string;
  realityEntryEligibility: "ELIGIBLE";
  candidateBundle: RealityPressureSeedCandidateBundle;
  candidateBundleReferenceId: string;
  captureState: RealityPressureSeedCaptureState;
  selectedPressureSeedContext: Readonly<SelectedPressureSeedContext> | null;
  captureProvenance: RealityPressureSeedCaptureProvenance | null;
  gravityReadiness: "NOT_READY" | "READY";
  availableEvents: readonly RealityPressureSeedCaptureEvent[];
  boundary: RealityProductionPressureSeedConsumerBoundary;
}>;

export type RealityProductionPressureSeedConsumerInitializeInput = Readonly<{
  routeAuthorization: RealityProductionRouteActivationAuthorization;
  candidateSourceContext: RealityPressureSeedCandidateSourceContext;
}>;

export type RealityProductionPressureSeedConsumerAdvanceInput = Readonly<{
  session: RealityProductionPressureSeedSession;
  candidateSourceContext: RealityPressureSeedCandidateSourceContext;
  command: RealityPressureSeedCaptureCommand;
}>;

export type RealityProductionPressureSeedConsumerBlockedReason =
  | "REALITY_ROUTE_AUTHORIZATION_REQUIRED"
  | "CANDIDATE_SOURCE_CONTEXT_INVALID"
  | "FORBIDDEN_SOURCE_REFERENCE"
  | "SOURCE_REFERENCE_MISMATCH"
  | "CANDIDATE_BUNDLE_REFERENCE_MISMATCH"
  | "PRESSURE_SEED_SESSION_INVALID"
  | "PRESSURE_SEED_ALREADY_RECOGNIZED"
  | "CAPTURE_ADAPTER_BLOCKED"
  | "NEXT_CANDIDATE_BUNDLE_REQUIRED";

export type RealityProductionPressureSeedConsumerResult =
  | Readonly<{
      status: "READY";
      operation: "INITIALIZE" | "ADVANCE";
      session: RealityProductionPressureSeedSession;
      reason: null;
      boundary: RealityProductionPressureSeedConsumerBoundary;
    }>
  | Readonly<{
      status: "BLOCKED";
      operation: "INITIALIZE" | "ADVANCE";
      session: RealityProductionPressureSeedSession | null;
      reason: RealityProductionPressureSeedConsumerBlockedReason;
      boundary: RealityProductionPressureSeedConsumerBoundary;
    }>;
