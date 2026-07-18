import type { RealityPressureSeedCandidateSourceResult } from "./realityPressureSeedCandidateSource";

export type RealityPressureCandidateDeliverySessionBoundary = Readonly<{
  deliverySessionOnly: true;
  readyCandidateSourceResultOnly: true;
  immutableDeliveryHistoryOnly: true;
  sourceReferenceContinuityRequired: true;
  candidateCursorContinuityRequired: true;
  cumulativeCandidateHistoryRequired: true;
  uniqueCandidateDeliveryRequired: true;
  noFixtureSource: true;
  noPrototypeSource: true;
  noDefaultSource: true;
  noReferenceOnlySource: true;
  noSourceFallback: true;
  noCandidateSourceResolution: true;
  noCandidateAssembly: true;
  noEngineInvocation: true;
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

export type RealityPressureCandidateDeliverySession = Readonly<{
  schemaVersion: "GUANYAO_REALITY_PRESSURE_CANDIDATE_DELIVERY_SESSION_V1";
  source: "reality_pressure_candidate_delivery_session";
  sourceExperienceMode: "REAL_USER_EXPERIENCE";
  sourceProvenance: "REAL_USER_SESSION";
  candidateSource: "PRESSURE_SEED_MATRIX_V2";
  sourceReferenceId: string;
  deliverySequence: number;
  deliveryState: "BUNDLE_READY";
  currentBundleReferenceId: string;
  nextCandidateCursor: string | null;
  deliveredBundleReferenceIds: readonly string[];
  deliveredCandidateReferenceIds: readonly string[];
  boundary: RealityPressureCandidateDeliverySessionBoundary;
}>;

export type RealityPressureCandidateDeliverySessionInitializeInput = Readonly<{
  candidateSourceResult: RealityPressureSeedCandidateSourceResult;
}>;

export type RealityPressureCandidateDeliverySessionAdvanceInput = Readonly<{
  session: RealityPressureCandidateDeliverySession;
  candidateSourceResult: RealityPressureSeedCandidateSourceResult;
}>;

export type RealityPressureCandidateDeliverySessionBlockedReason =
  | "CANDIDATE_SOURCE_NOT_READY"
  | "CANDIDATE_SOURCE_CONTEXT_INVALID"
  | "FORBIDDEN_SOURCE_REFERENCE"
  | "SOURCE_REFERENCE_MISMATCH"
  | "CANDIDATE_CURSOR_MISMATCH"
  | "DELIVERY_HISTORY_MISMATCH"
  | "DUPLICATE_CANDIDATE_DELIVERY"
  | "DELIVERY_SESSION_INVALID";

export type RealityPressureCandidateDeliverySessionResult =
  | Readonly<{
      status: "READY";
      operation: "INITIALIZE" | "ADVANCE";
      session: RealityPressureCandidateDeliverySession;
      reason: null;
      boundary: RealityPressureCandidateDeliverySessionBoundary;
    }>
  | Readonly<{
      status: "BLOCKED";
      operation: "INITIALIZE" | "ADVANCE";
      session: RealityPressureCandidateDeliverySession | null;
      reason: RealityPressureCandidateDeliverySessionBlockedReason;
      boundary: RealityPressureCandidateDeliverySessionBoundary;
    }>;
