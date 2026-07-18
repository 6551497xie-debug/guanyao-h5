import type { GuanyaoAgeSegment } from "../types/guanyaoPressureSeed";
import type {
  RealityPressureCrossFieldBundleCursor,
  RealityPressureCrossFieldBundleGroup,
  RealityPressureCrossFieldCandidateBundleBoundary,
  RealityPressureCrossFieldCandidateBundleContract,
  RealityPressureCrossFieldCandidateBundlePlanResult,
} from "../types/realityPressureCrossFieldCandidateBundleContract";

const SEEDS_PER_FIELD = 15;
const BUNDLE_CAPACITY = SEEDS_PER_FIELD * 2;

export const REALITY_PRESSURE_CROSS_FIELD_BUNDLE_BOUNDARY:
  RealityPressureCrossFieldCandidateBundleBoundary = Object.freeze({
    contractOnly: true,
    existingPressureSeedMatrixOnly: true,
    deterministicCrossFieldComposition: true,
    explicitAgeCatalogRequired: true,
    sourceReferenceContinuityRequired: true,
    threeDistinctFieldsPerBundleRequired: true,
    twoBundlesCoverAllSixFieldsRequired: true,
    existingCandidatePresentationShapePreserved: true,
    noRandomSelection: true,
    noAutomaticRecognition: true,
    noNewPressureEngine: true,
    noMatrixRead: true,
    noCandidateSourceIntegration: true,
    noCaptureAdapterChange: true,
    noRuntimeIntegration: true,
    noUiIntegration: true,
    noRendererInvocation: true,
    noRouteMutation: true,
    noStorageRead: true,
    noStorageWrite: true,
  });

export const REALITY_PRESSURE_CROSS_FIELD_BUNDLE_CONTRACT:
  RealityPressureCrossFieldCandidateBundleContract = Object.freeze({
    schemaVersion: "GUANYAO_REALITY_PRESSURE_CROSS_FIELD_BUNDLE_CONTRACT_V1",
    semanticRole: "REALITY_PRESSURE_CROSS_FIELD_CANDIDATE_BUNDLE_CONTRACT",
    candidatesPerBundle: 3,
    distinctFieldsPerBundle: 3,
    bundlesPerCompleteFieldCoverage: 2,
    seedsPerField: 15,
    bundleCapacity: 30,
    fieldRotation: Object.freeze({
      GROUP_A: Object.freeze(["POWER", "RELATION", "FAMILY"] as const),
      GROUP_B: Object.freeze(["EXISTENCE", "INTEREST", "SOCIAL"] as const),
    }),
    exhaustionReason: "CANDIDATE_CATALOG_EXHAUSTED",
    boundary: REALITY_PRESSURE_CROSS_FIELD_BUNDLE_BOUNDARY,
  });

const groupForSequence = (
  bundleSequence: number,
): RealityPressureCrossFieldBundleGroup =>
  bundleSequence % 2 === 0 ? "GROUP_A" : "GROUP_B";

export function createRealityPressureCrossFieldBundleCursor(
  sourceReferenceId: string,
  ageSegment: GuanyaoAgeSegment,
): RealityPressureCrossFieldBundleCursor {
  return Object.freeze({
    schemaVersion: "GUANYAO_REALITY_PRESSURE_CROSS_FIELD_CURSOR_V1",
    sourceReferenceId: sourceReferenceId.trim(),
    ageSegment,
    nextBundleSequence: 0,
    nextFieldGroup: "GROUP_A",
  });
}

const isValidCursor = (
  cursor: RealityPressureCrossFieldBundleCursor,
): boolean =>
  cursor.schemaVersion === "GUANYAO_REALITY_PRESSURE_CROSS_FIELD_CURSOR_V1" &&
  Number.isInteger(cursor.nextBundleSequence) &&
  cursor.nextBundleSequence >= 0 &&
  cursor.nextFieldGroup === groupForSequence(cursor.nextBundleSequence);

export function resolveRealityPressureCrossFieldCandidateBundlePlan(
  cursor: RealityPressureCrossFieldBundleCursor,
): RealityPressureCrossFieldCandidateBundlePlanResult {
  if (!cursor.sourceReferenceId.trim()) {
    return Object.freeze({
      status: "BLOCKED" as const,
      plan: null,
      reason: "SOURCE_REFERENCE_REQUIRED" as const,
    });
  }

  if (!isValidCursor(cursor)) {
    return Object.freeze({
      status: "BLOCKED" as const,
      plan: null,
      reason: "CANDIDATE_CURSOR_INVALID" as const,
    });
  }

  if (cursor.nextBundleSequence >= BUNDLE_CAPACITY) {
    return Object.freeze({
      status: "SOURCE_NOT_READY" as const,
      plan: null,
      reason: "CANDIDATE_CATALOG_EXHAUSTED" as const,
    });
  }

  const bundleSequence = cursor.nextBundleSequence;
  const fieldGroup = groupForSequence(bundleSequence);
  const fieldSeedOffset = Math.floor(bundleSequence / 2);
  const fields = REALITY_PRESSURE_CROSS_FIELD_BUNDLE_CONTRACT.fieldRotation[fieldGroup];
  const nextBundleSequence = bundleSequence + 1;
  const nextCursor = Object.freeze({
    schemaVersion: "GUANYAO_REALITY_PRESSURE_CROSS_FIELD_CURSOR_V1" as const,
    sourceReferenceId: cursor.sourceReferenceId,
    ageSegment: cursor.ageSegment,
    nextBundleSequence,
    nextFieldGroup: groupForSequence(nextBundleSequence),
  });

  return Object.freeze({
    status: "READY" as const,
    plan: Object.freeze({
      schemaVersion: "GUANYAO_REALITY_PRESSURE_CROSS_FIELD_BUNDLE_PLAN_V1" as const,
      source: "reality_pressure_cross_field_candidate_bundle_contract" as const,
      sourceReferenceId: cursor.sourceReferenceId,
      ageSegment: cursor.ageSegment,
      bundleSequence,
      fieldGroup,
      slots: Object.freeze(
        fields.map((pressureField) =>
          Object.freeze({ pressureField, fieldSeedOffset }),
        ),
      ),
      nextCursor,
    }),
    reason: null,
  });
}
