import type { GuanyaoAgeSegment } from "./guanyaoPressureSeed";
import type { SelectedPressureSeedContext } from "./primaryPetal";

export type RealityPressureSeedCandidateSource = "PRESSURE_SEED_MATRIX_V2";
export type RealityPressureSeedRecognitionSource = "REAL_USER_SESSION";

export type RealityPressureSeedCandidateRequest = Readonly<{
  sourceExperienceMode: "REAL_USER_EXPERIENCE";
  sourceReferenceId: string;
  candidateCursor: string | null;
  excludedCandidateReferenceIds: readonly string[];
  ageSegment?: GuanyaoAgeSegment;
  ageSegmentRole?: "CATALOG_ROUTING_ONLY";
}>;

export type RealityPressureSeedCandidate = Readonly<{
  candidateReferenceId: string;
  surface: string;
  shell: string;
}>;

export type RealityPressureSeedCandidateBundleProvenance = Readonly<{
  candidateSource: RealityPressureSeedCandidateSource;
  candidateSourceService: "guanyao_pressure_seed_scene_binding_service";
  userRecognitionRequired: true;
  noAutomaticSelection: true;
  noDefaultCandidate: true;
}>;

export type RealityPressureSeedCandidateBundle = Readonly<{
  schemaVersion: "GUANYAO_REALITY_PRESSURE_CANDIDATE_BUNDLE_V1";
  source: "reality_pressure_seed_candidate_source";
  sourceExperienceMode: "REAL_USER_EXPERIENCE";
  sourceReferenceId: string;
  bundleReferenceId: string;
  selectionMode: "USER_RECOGNITION_REQUIRED";
  candidates: readonly RealityPressureSeedCandidate[];
  nextCandidateCursor: string | null;
  provenance: RealityPressureSeedCandidateBundleProvenance;
}>;

export type RealityPressureSeedCaptureEvent =
  | "PRESSURE_SEED_RECOGNIZE"
  | "PRESSURE_SEED_REQUEST_NEXT_BUNDLE"
  | "PRESSURE_SEED_PAUSE";

export type RealityPressureSeedCaptureState =
  | "OBSERVING_CANDIDATES"
  | "SEED_RECOGNIZED"
  | "PAUSED";

export type RealityPressureSeedCaptureCommand = Readonly<{
  event: RealityPressureSeedCaptureEvent;
  sourceReferenceId: string;
  candidateBundleReferenceId: string;
  recognizedCandidateReferenceId: string | null;
}>;

export type RealityPressureSeedCaptureProvenance = Readonly<{
  candidateSource: RealityPressureSeedCandidateSource;
  recognitionSource: RealityPressureSeedRecognitionSource;
  sourceReferenceId: string;
  bundleReferenceId: string;
  candidateReferenceId: string;
}>;

export type RealityPressureSeedCaptureBlockedReason =
  | "CANDIDATE_BUNDLE_NOT_READY"
  | "SOURCE_REFERENCE_MISMATCH"
  | "CANDIDATE_NOT_IN_BUNDLE"
  | "USER_RECOGNITION_REQUIRED"
  | "FORBIDDEN_SOURCE_REFERENCE";

export type RealityPressureSeedCaptureResult =
  | Readonly<{
      status: "CAPTURED";
      captureState: "SEED_RECOGNIZED";
      selectedPressureSeedContext: SelectedPressureSeedContext;
      provenance: RealityPressureSeedCaptureProvenance;
      gravityReadiness: "READY";
      reason: null;
    }>
  | Readonly<{
      status: "BLOCKED";
      captureState: Exclude<
        RealityPressureSeedCaptureState,
        "SEED_RECOGNIZED"
      >;
      selectedPressureSeedContext: null;
      provenance: null;
      gravityReadiness: "NOT_READY";
      reason: RealityPressureSeedCaptureBlockedReason;
    }>;

export type RealityPressureSeedCaptureContractBoundary = Readonly<{
  contractOnly: true;
  existingPressureSeedMatrixOnly: true;
  explicitUserRecognitionRequired: true;
  dualSourceProvenanceRequired: true;
  sourceReferenceContinuityRequired: true;
  immutableCandidateBundleRequired: true;
  selectedContextOutputOnlyAfterRecognition: true;
  gravityReadinessOutputOnlyAfterRecognition: true;
  noFixtureSource: true;
  noPrototypeSource: true;
  noDefaultSource: true;
  noReferenceOnlySource: true;
  noSourceFallback: true;
  noEngineInvocation: true;
  noCandidateSourceImplementation: true;
  noCandidateAssembly: true;
  noCaptureExecution: true;
  noPressureConsumerIntegration: true;
  noGravityIntegration: true;
  noUiIntegration: true;
  noRendererInvocation: true;
  noRouteMutation: true;
  noNavigationMutation: true;
  noStorageRead: true;
  noStorageWrite: true;
}>;

export type RealityPressureSeedCaptureContract = Readonly<{
  schemaVersion: "GUANYAO_REALITY_PRESSURE_SEED_CAPTURE_CONTRACT_V1";
  semanticRole: "REALITY_PRESSURE_SEED_CAPTURE_CONTRACT";
  candidateSource: RealityPressureSeedCandidateSource;
  recognitionSource: RealityPressureSeedRecognitionSource;
  selectionMode: "USER_RECOGNITION_REQUIRED";
  allowedEvents: readonly RealityPressureSeedCaptureEvent[];
  readyState: "SEED_RECOGNIZED";
  gravityReadyState: "READY";
  boundary: RealityPressureSeedCaptureContractBoundary;
}>;
