import type {
  GuanyaoAgeSegment,
  GuanyaoPressureField,
} from "./guanyaoPressureSeed";

export type RealityPressureCrossFieldBundleGroup = "GROUP_A" | "GROUP_B";

export type RealityPressureCrossFieldBundleCursor = Readonly<{
  schemaVersion: "GUANYAO_REALITY_PRESSURE_CROSS_FIELD_CURSOR_V1";
  sourceReferenceId: string;
  ageSegment: GuanyaoAgeSegment;
  nextBundleSequence: number;
  nextFieldGroup: RealityPressureCrossFieldBundleGroup;
}>;

export type RealityPressureCrossFieldCandidateSlot = Readonly<{
  pressureField: GuanyaoPressureField;
  fieldSeedOffset: number;
}>;

export type RealityPressureCrossFieldCandidateBundlePlan = Readonly<{
  schemaVersion: "GUANYAO_REALITY_PRESSURE_CROSS_FIELD_BUNDLE_PLAN_V1";
  source: "reality_pressure_cross_field_candidate_bundle_contract";
  sourceReferenceId: string;
  ageSegment: GuanyaoAgeSegment;
  bundleSequence: number;
  fieldGroup: RealityPressureCrossFieldBundleGroup;
  slots: readonly RealityPressureCrossFieldCandidateSlot[];
  nextCursor: RealityPressureCrossFieldBundleCursor;
}>;

export type RealityPressureCrossFieldCandidateBundleBlockedReason =
  | "SOURCE_REFERENCE_REQUIRED"
  | "CANDIDATE_CURSOR_INVALID"
  | "CANDIDATE_CATALOG_EXHAUSTED";

export type RealityPressureCrossFieldCandidateBundlePlanResult =
  | Readonly<{
      status: "READY";
      plan: RealityPressureCrossFieldCandidateBundlePlan;
      reason: null;
    }>
  | Readonly<{
      status: "SOURCE_NOT_READY" | "BLOCKED";
      plan: null;
      reason: RealityPressureCrossFieldCandidateBundleBlockedReason;
    }>;

export type RealityPressureCrossFieldCandidateBundleBoundary = Readonly<{
  contractOnly: true;
  existingPressureSeedMatrixOnly: true;
  deterministicCrossFieldComposition: true;
  explicitAgeCatalogRequired: true;
  sourceReferenceContinuityRequired: true;
  threeDistinctFieldsPerBundleRequired: true;
  twoBundlesCoverAllSixFieldsRequired: true;
  existingCandidatePresentationShapePreserved: true;
  noRandomSelection: true;
  noAutomaticRecognition: true;
  noNewPressureEngine: true;
  noMatrixRead: true;
  noCandidateSourceIntegration: true;
  noCaptureAdapterChange: true;
  noRuntimeIntegration: true;
  noUiIntegration: true;
  noRendererInvocation: true;
  noRouteMutation: true;
  noStorageRead: true;
  noStorageWrite: true;
}>;

export type RealityPressureCrossFieldCandidateBundleContract = Readonly<{
  schemaVersion: "GUANYAO_REALITY_PRESSURE_CROSS_FIELD_BUNDLE_CONTRACT_V1";
  semanticRole: "REALITY_PRESSURE_CROSS_FIELD_CANDIDATE_BUNDLE_CONTRACT";
  candidatesPerBundle: 3;
  distinctFieldsPerBundle: 3;
  bundlesPerCompleteFieldCoverage: 2;
  seedsPerField: 15;
  bundleCapacity: 30;
  fieldRotation: Readonly<{
    GROUP_A: readonly ["POWER", "RELATION", "FAMILY"];
    GROUP_B: readonly ["EXISTENCE", "INTEREST", "SOCIAL"];
  }>;
  exhaustionReason: "CANDIDATE_CATALOG_EXHAUSTED";
  boundary: RealityPressureCrossFieldCandidateBundleBoundary;
}>;
