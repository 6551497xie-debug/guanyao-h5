import type {
  GuanyaoAgeSegment,
  GuanyaoPressureSeed,
} from "./guanyaoPressureSeed";
import type {
  RealityPressureSeedCandidateBundle,
  RealityPressureSeedCandidateRequest,
} from "./realityPressureSeedCaptureContract";
import type { RealityPressureFailureEnvelope } from "./realityPressureFailureEnvelope";

export type RealityPressureSeedCandidateSourceBoundary = Readonly<{
  productionCandidateSourceOnly: true;
  existingMatrixResolverOnly: true;
  crossFieldBundleContractRequired: true;
  explicitCatalogExhaustionRequired: true;
  explicitCatalogRoutingContextRequired: true;
  sourceReferenceContinuityRequired: true;
  immutableSourceContextOnly: true;
  presentationSafeBundleOnly: true;
  internalCandidateRecordsIsolated: true;
  noFixtureSource: true;
  noPrototypeSource: true;
  noDefaultSource: true;
  noReferenceOnlySource: true;
  noSourceFallback: true;
  noNewPressureEngine: true;
  noDirectMatrixRead: true;
  noAutomaticSelection: true;
  noCaptureExecution: true;
  noSelectedPressureSeedContext: true;
  noPressureConsumerIntegration: true;
  noGravityIntegration: true;
  noUiIntegration: true;
  noRendererInvocation: true;
  noRouteMutation: true;
  noNavigationMutation: true;
  noStorageRead: true;
  noStorageWrite: true;
}>;

export type RealityPressureSeedCandidateSourceRecord = Readonly<{
  candidateReferenceId: string;
  candidateRevisionReferenceId: string;
  seed: Readonly<GuanyaoPressureSeed>;
}>;

export type RealityPressureSeedCandidateSourceContext = Readonly<{
  schemaVersion: "GUANYAO_REALITY_PRESSURE_CANDIDATE_SOURCE_CONTEXT_V1";
  source: "reality_pressure_seed_candidate_source";
  sourceExperienceMode: "REAL_USER_EXPERIENCE";
  sourceReferenceId: string;
  ageSegment: GuanyaoAgeSegment;
  catalogRevision: string;
  bundleReferenceId: string;
  bundleRevisionReferenceId: string;
  candidateBundle: RealityPressureSeedCandidateBundle;
  candidateRecords: readonly RealityPressureSeedCandidateSourceRecord[];
  boundary: RealityPressureSeedCandidateSourceBoundary;
}>;

export type RealityPressureSeedCandidateSourceBlockedReason =
  | "SOURCE_REFERENCE_REQUIRED"
  | "FORBIDDEN_SOURCE_REFERENCE"
  | "REAL_USER_EXPERIENCE_REQUIRED"
  | "AGE_SEGMENT_REQUIRED"
  | "CATALOG_ROUTING_ROLE_REQUIRED"
  | "CANDIDATE_CURSOR_MISMATCH"
  | "EXCLUDED_CANDIDATE_REFERENCES_INVALID"
  | "CANDIDATE_BUNDLE_NOT_AVAILABLE"
  | "CANDIDATE_CATALOG_EXHAUSTED"
  | "CANDIDATE_SOURCE_AGE_SEGMENT_MISMATCH"
  | "CANDIDATE_SOURCE_FALLBACK_DETECTED"
  | "STAGE_NOT_IN_CATALOG"
  | "CATALOG_REVISION_UNKNOWN"
  | "CATALOG_ARTIFACT_UNAVAILABLE"
  | "SOURCE_REVISION_MISMATCH"
  | "RUNTIME_ID_BINDING_MISSING"
  | "PRESSURE_NATURE_BINDING_MISSING"
  | "TARGET_450_NEW_CREATION_SAFE_WITHHELD";

export type RealityPressureSeedCandidateSourceResult =
  | Readonly<{
      status: "READY";
      source: "reality_pressure_seed_candidate_source";
      request: RealityPressureSeedCandidateRequest;
      context: RealityPressureSeedCandidateSourceContext;
      reason: null;
      failure: null;
      boundary: RealityPressureSeedCandidateSourceBoundary;
    }>
  | Readonly<{
      status: "SOURCE_NOT_READY" | "BLOCKED";
      source: "reality_pressure_seed_candidate_source";
      request: RealityPressureSeedCandidateRequest;
      context: null;
      reason: RealityPressureSeedCandidateSourceBlockedReason;
      failure: RealityPressureFailureEnvelope;
      boundary: RealityPressureSeedCandidateSourceBoundary;
    }>;
