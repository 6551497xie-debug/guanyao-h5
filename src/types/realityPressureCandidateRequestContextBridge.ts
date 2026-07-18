import type { GuanyaoAgeSegment } from "./guanyaoPressureSeed";
import type { LaunchLifeSourceSession } from "./launchLifeSourceSession";
import type { RealityPressureSeedCandidateRequest } from "./realityPressureSeedCaptureContract";

export type RealityPressureCandidateCatalogRequest =
  RealityPressureSeedCandidateRequest &
    Readonly<{
      ageSegment: GuanyaoAgeSegment;
      ageSegmentRole: "CATALOG_ROUTING_ONLY";
    }>;

export type RealityPressureCandidateRequestContextBridgeBoundary = Readonly<{
  requestContextBridgeOnly: true;
  existingLaunchLifeSourceSessionOnly: true;
  confirmedBirthCoordinateOnly: true;
  ageSegmentCatalogRoutingOnly: true;
  explicitAsOfDateRequired: true;
  deterministicAgeResolutionOnly: true;
  sourceReferenceContinuityRequired: true;
  immutableOutputOnly: true;
  noFixtureSource: true;
  noPrototypeSource: true;
  noDefaultSource: true;
  noReferenceOnlySource: true;
  noSourceFallback: true;
  noSystemClock: true;
  noEngineInvocation: true;
  noMatrixRead: true;
  noCandidateSourceInvocation: true;
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

export type RealityPressureCandidateRequestContextBridgeInput = Readonly<{
  lifeSourceSession: LaunchLifeSourceSession;
  asOfDate: string;
  candidateCursor: string | null;
  excludedCandidateReferenceIds: readonly string[];
}>;

export type RealityPressureCandidateRequestContext = Readonly<{
  schemaVersion: "GUANYAO_REALITY_PRESSURE_CANDIDATE_REQUEST_CONTEXT_V1";
  source: "reality_pressure_candidate_request_context_bridge";
  sourceExperienceMode: "REAL_USER_EXPERIENCE";
  sourceProvenance: "REAL_USER_SESSION";
  sourceReferenceId: string;
  asOfDate: string;
  ageAtRequest: number;
  ageSegment: GuanyaoAgeSegment;
  ageSegmentRole: "CATALOG_ROUTING_ONLY";
  candidateRequest: RealityPressureCandidateCatalogRequest;
  provenance: Readonly<{
    lifeSource: "LAUNCH_LIFE_SOURCE_SESSION";
    birthSource: "LAUNCH_USER_CONFIRMED";
    ageResolution: "CONFIRMED_BIRTH_COORDINATE_AGE_ROUTING";
    noPressureInference: true;
  }>;
  boundary: RealityPressureCandidateRequestContextBridgeBoundary;
}>;

export type RealityPressureCandidateRequestContextBridgeBlockedReason =
  | "REAL_LIFE_SOURCE_SESSION_REQUIRED"
  | "SOURCE_REFERENCE_REQUIRED"
  | "SOURCE_REFERENCE_MISMATCH"
  | "FORBIDDEN_SOURCE_REFERENCE"
  | "AS_OF_DATE_REQUIRED"
  | "AS_OF_DATE_INVALID"
  | "BIRTH_COORDINATE_INVALID"
  | "BIRTH_DATE_AFTER_AS_OF_DATE"
  | "AGE_NOT_SUPPORTED"
  | "EXCLUDED_CANDIDATE_REFERENCES_INVALID";

export type RealityPressureCandidateRequestContextBridgeResult =
  | Readonly<{
      status: "READY";
      source: "reality_pressure_candidate_request_context_bridge";
      context: RealityPressureCandidateRequestContext;
      reason: null;
      boundary: RealityPressureCandidateRequestContextBridgeBoundary;
    }>
  | Readonly<{
      status: "SOURCE_NOT_READY" | "BLOCKED";
      source: "reality_pressure_candidate_request_context_bridge";
      context: null;
      reason: RealityPressureCandidateRequestContextBridgeBlockedReason;
      boundary: RealityPressureCandidateRequestContextBridgeBoundary;
    }>;
