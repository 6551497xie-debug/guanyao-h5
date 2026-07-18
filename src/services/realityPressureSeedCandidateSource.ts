import type { GuanyaoPressureSeed } from "../types/guanyaoPressureSeed";
import type { RealityPressureSeedCandidateRequest } from "../types/realityPressureSeedCaptureContract";
import type {
  RealityPressureSeedCandidateSourceBlockedReason,
  RealityPressureSeedCandidateSourceBoundary,
  RealityPressureSeedCandidateSourceContext,
  RealityPressureSeedCandidateSourceResult,
} from "../types/realityPressureSeedCandidateSource";
import { getPressureSeedSceneTriplet } from "./guanyaoPressureSeedSceneBindingService";

export const REALITY_PRESSURE_SEED_CANDIDATE_SOURCE_BOUNDARY:
  RealityPressureSeedCandidateSourceBoundary = Object.freeze({
    productionCandidateSourceOnly: true,
    existingMatrixResolverOnly: true,
    explicitCatalogRoutingContextRequired: true,
    sourceReferenceContinuityRequired: true,
    immutableSourceContextOnly: true,
    presentationSafeBundleOnly: true,
    internalCandidateRecordsIsolated: true,
    noFixtureSource: true,
    noPrototypeSource: true,
    noDefaultSource: true,
    noReferenceOnlySource: true,
    noSourceFallback: true,
    noNewPressureEngine: true,
    noDirectMatrixRead: true,
    noAutomaticSelection: true,
    noCaptureExecution: true,
    noSelectedPressureSeedContext: true,
    noPressureConsumerIntegration: true,
    noGravityIntegration: true,
    noUiIntegration: true,
    noRendererInvocation: true,
    noRouteMutation: true,
    noNavigationMutation: true,
    noStorageRead: true,
    noStorageWrite: true,
  });

const forbiddenSourceMarkers = [
  "fixture",
  "prototype",
  "default",
  "referenceonly",
] as const;

const hasForbiddenSourceReference = (sourceReferenceId: string): boolean => {
  const normalized = sourceReferenceId.toLowerCase();
  return forbiddenSourceMarkers.some((marker) => normalized.includes(marker));
};

const expectedCursor = (excludedCount: number): string | null =>
  excludedCount === 0 ? null : `pressure-seed-cursor:${excludedCount}`;

const sourceNotReady = (
  request: RealityPressureSeedCandidateRequest,
  reason: RealityPressureSeedCandidateSourceBlockedReason,
): RealityPressureSeedCandidateSourceResult => Object.freeze({
  status: "SOURCE_NOT_READY" as const,
  source: "reality_pressure_seed_candidate_source" as const,
  request,
  context: null,
  reason,
  boundary: REALITY_PRESSURE_SEED_CANDIDATE_SOURCE_BOUNDARY,
});

const blocked = (
  request: RealityPressureSeedCandidateRequest,
  reason: RealityPressureSeedCandidateSourceBlockedReason,
): RealityPressureSeedCandidateSourceResult => Object.freeze({
  status: "BLOCKED" as const,
  source: "reality_pressure_seed_candidate_source" as const,
  request,
  context: null,
  reason,
  boundary: REALITY_PRESSURE_SEED_CANDIDATE_SOURCE_BOUNDARY,
});

const freezeArray = <T>(values: readonly T[]): T[] => {
  const copy = [...values];
  Object.freeze(copy);
  return copy;
};

const freezeSeed = (seed: GuanyaoPressureSeed): Readonly<GuanyaoPressureSeed> =>
  Object.freeze({
    ...seed,
    ageBias: freezeArray(seed.ageBias),
    relationBias: freezeArray(seed.relationBias),
    core: Object.freeze({ ...seed.core }),
    tags: freezeArray(seed.tags),
  });

export function resolveRealityPressureSeedCandidateSource(
  request: RealityPressureSeedCandidateRequest,
): RealityPressureSeedCandidateSourceResult {
  const sourceReferenceId = request.sourceReferenceId.trim();
  if (!sourceReferenceId) {
    return sourceNotReady(request, "SOURCE_REFERENCE_REQUIRED");
  }
  if (hasForbiddenSourceReference(sourceReferenceId)) {
    return blocked(request, "FORBIDDEN_SOURCE_REFERENCE");
  }
  if (request.sourceExperienceMode !== "REAL_USER_EXPERIENCE") {
    return blocked(request, "REAL_USER_EXPERIENCE_REQUIRED");
  }
  if (!request.ageSegment) {
    return sourceNotReady(request, "AGE_SEGMENT_REQUIRED");
  }
  if (request.ageSegmentRole !== "CATALOG_ROUTING_ONLY") {
    return blocked(request, "CATALOG_ROUTING_ROLE_REQUIRED");
  }

  const excludedCandidateReferenceIds = [
    ...request.excludedCandidateReferenceIds,
  ];
  if (
    excludedCandidateReferenceIds.some((reference) => !reference.trim()) ||
    new Set(excludedCandidateReferenceIds).size !==
      excludedCandidateReferenceIds.length
  ) {
    return blocked(request, "EXCLUDED_CANDIDATE_REFERENCES_INVALID");
  }
  if (
    request.candidateCursor !==
    expectedCursor(excludedCandidateReferenceIds.length)
  ) {
    return blocked(request, "CANDIDATE_CURSOR_MISMATCH");
  }

  const triplet = getPressureSeedSceneTriplet({
    ageSegment: request.ageSegment,
    excludeSeedIds: excludedCandidateReferenceIds,
  });
  if (triplet.seeds.length !== 3) {
    return sourceNotReady(request, "CANDIDATE_BUNDLE_NOT_AVAILABLE");
  }
  if (triplet.seeds.some((seed) => seed.primaryAge !== request.ageSegment)) {
    return blocked(request, "CANDIDATE_SOURCE_AGE_SEGMENT_MISMATCH");
  }
  if (
    triplet.seeds.some(
      (seed) =>
        !seed.id.trim() ||
        !seed.surface.trim() ||
        !seed.shell.trim() ||
        excludedCandidateReferenceIds.includes(seed.id),
    )
  ) {
    return blocked(request, "CANDIDATE_SOURCE_FALLBACK_DETECTED");
  }

  const candidateIds = triplet.seeds.map((seed) => seed.id);
  if (new Set(candidateIds).size !== candidateIds.length) {
    return blocked(request, "CANDIDATE_SOURCE_FALLBACK_DETECTED");
  }

  const bundleReferenceId = [
    "pressure-seed-bundle",
    sourceReferenceId,
    request.ageSegment,
    ...candidateIds,
  ].join(":");
  const nextCandidateCursor = expectedCursor(
    excludedCandidateReferenceIds.length + candidateIds.length,
  );
  const candidates = Object.freeze(
    triplet.seeds.map((seed) =>
      Object.freeze({
        candidateReferenceId: seed.id,
        surface: seed.surface,
        shell: seed.shell,
      }),
    ),
  );
  const candidateRecords = Object.freeze(
    triplet.seeds.map((seed) =>
      Object.freeze({
        candidateReferenceId: seed.id,
        seed: freezeSeed(seed),
      }),
    ),
  );
  const provenance = Object.freeze({
    candidateSource: "PRESSURE_SEED_MATRIX_V2" as const,
    candidateSourceService:
      "guanyao_pressure_seed_scene_binding_service" as const,
    userRecognitionRequired: true as const,
    noAutomaticSelection: true as const,
    noDefaultCandidate: true as const,
  });
  const candidateBundle = Object.freeze({
    schemaVersion: "GUANYAO_REALITY_PRESSURE_CANDIDATE_BUNDLE_V1" as const,
    source: "reality_pressure_seed_candidate_source" as const,
    sourceExperienceMode: "REAL_USER_EXPERIENCE" as const,
    sourceReferenceId,
    bundleReferenceId,
    selectionMode: "USER_RECOGNITION_REQUIRED" as const,
    candidates,
    nextCandidateCursor,
    provenance,
  });
  const context: RealityPressureSeedCandidateSourceContext = Object.freeze({
    schemaVersion:
      "GUANYAO_REALITY_PRESSURE_CANDIDATE_SOURCE_CONTEXT_V1" as const,
    source: "reality_pressure_seed_candidate_source" as const,
    sourceExperienceMode: "REAL_USER_EXPERIENCE" as const,
    sourceReferenceId,
    bundleReferenceId,
    candidateBundle,
    candidateRecords,
    boundary: REALITY_PRESSURE_SEED_CANDIDATE_SOURCE_BOUNDARY,
  });

  return Object.freeze({
    status: "READY" as const,
    source: "reality_pressure_seed_candidate_source" as const,
    request,
    context,
    reason: null,
    boundary: REALITY_PRESSURE_SEED_CANDIDATE_SOURCE_BOUNDARY,
  });
}
