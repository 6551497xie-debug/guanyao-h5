import type { GuanyaoPressureSeed } from "../types/guanyaoPressureSeed";
import type { SelectedPressureSeedContext } from "../types/primaryPetal";
import type {
  RealityPressureSeedCaptureBlockedReason,
  RealityPressureSeedCaptureState,
} from "../types/realityPressureSeedCaptureContract";
import type {
  RealityPressureSeedCaptureAdapterBoundary,
  RealityPressureSeedCaptureAdapterInput,
  RealityPressureSeedCaptureAdapterResult,
} from "../types/realityPressureSeedCaptureAdapter";
import type { RealityPressureSeedCandidateSourceContext } from "../types/realityPressureSeedCandidateSource";
import { buildSelectedPressureSeedContext } from "./guanyaoPressureSeedSceneBindingService";

export const REALITY_PRESSURE_SEED_CAPTURE_ADAPTER_BOUNDARY:
  RealityPressureSeedCaptureAdapterBoundary = Object.freeze({
    captureAdapterOnly: true,
    authorizedCandidateSourceContextOnly: true,
    explicitUserRecognitionOnly: true,
    existingSelectedContextBuilderOnly: true,
    sourceReferenceContinuityRequired: true,
    bundleReferenceContinuityRequired: true,
    candidateMembershipRequired: true,
    immutableOutputOnly: true,
    dualSourceProvenanceRequired: true,
    gravityReadinessOutputOnly: true,
    noFixtureSource: true,
    noPrototypeSource: true,
    noDefaultSource: true,
    noReferenceOnlySource: true,
    noSourceFallback: true,
    noCandidateSourceResolution: true,
    noCandidateAssembly: true,
    noNewPressureEngine: true,
    noAutomaticSelection: true,
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

const blocked = (
  captureState: Exclude<RealityPressureSeedCaptureState, "SEED_RECOGNIZED">,
  reason: RealityPressureSeedCaptureBlockedReason,
): RealityPressureSeedCaptureAdapterResult => Object.freeze({
  status: "BLOCKED" as const,
  source: "reality_pressure_seed_capture_adapter" as const,
  captureState,
  selectedPressureSeedContext: null,
  provenance: null,
  gravityReadiness: "NOT_READY" as const,
  reason,
  boundary: REALITY_PRESSURE_SEED_CAPTURE_ADAPTER_BOUNDARY,
});

const isSourceContextValid = (
  context: RealityPressureSeedCandidateSourceContext,
): boolean => {
  const bundle = context.candidateBundle;
  return (
    Object.isFrozen(context) &&
    Object.isFrozen(context.candidateRecords) &&
    Object.isFrozen(bundle) &&
    Object.isFrozen(bundle.candidates) &&
    Object.isFrozen(bundle.provenance) &&
    context.schemaVersion ===
      "GUANYAO_REALITY_PRESSURE_CANDIDATE_SOURCE_CONTEXT_V1" &&
    context.source === "reality_pressure_seed_candidate_source" &&
    context.sourceExperienceMode === "REAL_USER_EXPERIENCE" &&
    context.sourceReferenceId.trim().length > 0 &&
    context.bundleReferenceId.trim().length > 0 &&
    bundle.schemaVersion ===
      "GUANYAO_REALITY_PRESSURE_CANDIDATE_BUNDLE_V1" &&
    bundle.source === "reality_pressure_seed_candidate_source" &&
    bundle.sourceExperienceMode === "REAL_USER_EXPERIENCE" &&
    bundle.sourceReferenceId === context.sourceReferenceId &&
    bundle.bundleReferenceId === context.bundleReferenceId &&
    bundle.selectionMode === "USER_RECOGNITION_REQUIRED" &&
    bundle.provenance.candidateSource === "PRESSURE_SEED_MATRIX_V2" &&
    bundle.provenance.userRecognitionRequired === true &&
    bundle.provenance.noAutomaticSelection === true &&
    bundle.provenance.noDefaultCandidate === true &&
    context.boundary.productionCandidateSourceOnly === true &&
    context.boundary.existingMatrixResolverOnly === true &&
    context.boundary.noDefaultSource === true &&
    context.boundary.noAutomaticSelection === true &&
    context.boundary.noCaptureExecution === true
  );
};

const cloneSeed = (seed: Readonly<GuanyaoPressureSeed>): GuanyaoPressureSeed => ({
  ...seed,
  ageBias: [...seed.ageBias],
  relationBias: [...seed.relationBias],
  core: { ...seed.core },
  tags: [...seed.tags],
});

const freezeSelectedContext = (
  context: SelectedPressureSeedContext,
): SelectedPressureSeedContext => {
  const tags = context.tags ? [...context.tags] : undefined;
  const semanticTags = context.semanticTags
    ? [...context.semanticTags]
    : undefined;
  if (tags) Object.freeze(tags);
  if (semanticTags) Object.freeze(semanticTags);
  return Object.freeze({
    ...context,
    tags,
    semanticTags,
  });
};

export function captureRealityPressureSeed(
  input: RealityPressureSeedCaptureAdapterInput,
): RealityPressureSeedCaptureAdapterResult {
  const { sourceContext, command } = input;
  if (
    hasForbiddenSourceReference(sourceContext.sourceReferenceId) ||
    hasForbiddenSourceReference(command.sourceReferenceId)
  ) {
    return blocked("OBSERVING_CANDIDATES", "FORBIDDEN_SOURCE_REFERENCE");
  }
  if (!isSourceContextValid(sourceContext)) {
    return blocked("OBSERVING_CANDIDATES", "CANDIDATE_BUNDLE_NOT_READY");
  }
  if (command.sourceReferenceId !== sourceContext.sourceReferenceId) {
    return blocked("OBSERVING_CANDIDATES", "SOURCE_REFERENCE_MISMATCH");
  }
  if (
    command.candidateBundleReferenceId !== sourceContext.bundleReferenceId
  ) {
    return blocked("OBSERVING_CANDIDATES", "CANDIDATE_BUNDLE_NOT_READY");
  }
  if (
    command.event !== "PRESSURE_SEED_RECOGNIZE" ||
    !command.recognizedCandidateReferenceId
  ) {
    return blocked(
      command.event === "PRESSURE_SEED_PAUSE"
        ? "PAUSED"
        : "OBSERVING_CANDIDATES",
      "USER_RECOGNITION_REQUIRED",
    );
  }

  const candidateReferenceId = command.recognizedCandidateReferenceId;
  const candidate = sourceContext.candidateBundle.candidates.find(
    (entry) => entry.candidateReferenceId === candidateReferenceId,
  );
  const candidateRecord = sourceContext.candidateRecords.find(
    (entry) => entry.candidateReferenceId === candidateReferenceId,
  );
  if (
    !candidate ||
    !candidateRecord ||
    candidateRecord.seed.id !== candidateReferenceId ||
    candidate.surface !== candidateRecord.seed.surface ||
    candidate.shell !== candidateRecord.seed.shell
  ) {
    return blocked("OBSERVING_CANDIDATES", "CANDIDATE_NOT_IN_BUNDLE");
  }

  const selectedPressureSeedContext = freezeSelectedContext(
    buildSelectedPressureSeedContext(cloneSeed(candidateRecord.seed)),
  );
  const provenance = Object.freeze({
    candidateSource: "PRESSURE_SEED_MATRIX_V2" as const,
    recognitionSource: "REAL_USER_SESSION" as const,
    sourceReferenceId: sourceContext.sourceReferenceId,
    bundleReferenceId: sourceContext.bundleReferenceId,
    candidateReferenceId,
  });

  return Object.freeze({
    status: "CAPTURED" as const,
    source: "reality_pressure_seed_capture_adapter" as const,
    captureState: "SEED_RECOGNIZED" as const,
    selectedPressureSeedContext,
    provenance,
    gravityReadiness: "READY" as const,
    reason: null,
    boundary: REALITY_PRESSURE_SEED_CAPTURE_ADAPTER_BOUNDARY,
  });
}
