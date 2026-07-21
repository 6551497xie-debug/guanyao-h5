import type {
  RealityCoordinatePresenceVisualSourceProjection,
  RealityCoordinatePresenceVisualSourceProjectionBlockedReason,
  RealityCoordinatePresenceVisualSourceProjectionBoundary,
  RealityCoordinatePresenceVisualSourceProjectionInput,
  RealityCoordinatePresenceVisualSourceProjectionResult,
} from "../types/realityCoordinatePresenceVisualSourceProjection";

export const REALITY_COORDINATE_PRESENCE_VISUAL_SOURCE_PROJECTION_BOUNDARY: RealityCoordinatePresenceVisualSourceProjectionBoundary =
  Object.freeze({
    sourceProjectionOnly: true,
    existingRealUserVisualSourceOnly: true,
    recognizedPresenceContinuityRequired: true,
    authorizedRealityRouteOnly: true,
    sourceReferenceContinuityRequired: true,
    manifestationReferenceContinuityRequired: true,
    immutableProjectionOnly: true,
    preserveExistingVisualObjectIdentity: true,
    noVisualSourceCopy: true,
    noEngineInvocation: true,
    noSourceRecalculation: true,
    noEntityGeneration: true,
    noAssetGeneration: true,
    noPresenceMutation: true,
    noRendererInvocation: true,
    noRendererInputMutation: true,
    noVisualCalibration: true,
    noPressureExecution: true,
    noPressureMutation: true,
    noGravityMutation: true,
    noChoiceMutation: true,
    noCrystalMutation: true,
    noRouteMutation: true,
    noUiIntegration: true,
    noStorageRead: true,
    noStorageWrite: true,
    noFixtureSource: true,
    noPrototypeSource: true,
    noDefaultSource: true,
    noFallback: true,
  });

const unavailable = (
  input: RealityCoordinatePresenceVisualSourceProjectionInput,
  reason: RealityCoordinatePresenceVisualSourceProjectionBlockedReason,
): RealityCoordinatePresenceVisualSourceProjectionResult =>
  Object.freeze({
    status: "SOURCE_NOT_READY" as const,
    source: "reality_coordinate_presence_visual_source_projection" as const,
    reason,
    projection: null,
    input,
    boundary:
      REALITY_COORDINATE_PRESENCE_VISUAL_SOURCE_PROJECTION_BOUNDARY,
  });

const blocked = (
  input: RealityCoordinatePresenceVisualSourceProjectionInput,
  reason: RealityCoordinatePresenceVisualSourceProjectionBlockedReason,
): RealityCoordinatePresenceVisualSourceProjectionResult =>
  Object.freeze({
    status: "BLOCKED" as const,
    source: "reality_coordinate_presence_visual_source_projection" as const,
    reason,
    projection: null,
    input,
    boundary:
      REALITY_COORDINATE_PRESENCE_VISUAL_SOURCE_PROJECTION_BOUNDARY,
  });

const hasForbiddenReference = (referenceId: string): boolean =>
  ["fixture", "prototype", "default", "referenceonly"].some((marker) =>
    referenceId.toLowerCase().includes(marker),
  );

export function projectRealityCoordinatePresenceVisualSource(
  input: RealityCoordinatePresenceVisualSourceProjectionInput,
): RealityCoordinatePresenceVisualSourceProjectionResult {
  const visualContext = input.realUserGenesisVisualSourceContext;
  if (visualContext === null) {
    return unavailable(input, "GENESIS_VISUAL_SOURCE_CONTEXT_REQUIRED");
  }
  const referenceId = visualContext.sourceReferenceId;
  const visualSource = visualContext.visualSource;
  if (
    visualContext.sourceMode !== "REAL_USER_EXPERIENCE" ||
    visualContext.lifeSourceSession.sourceKind !== "REAL_ENGINE_RESULT" ||
    visualContext.visualSourceAdapterInput.sourceKind !==
      "REAL_ENGINE_RESULT" ||
    visualSource.provenance.sourceKind !== "REAL_ENGINE_RESULT" ||
    visualContext.lifeSourceSession.sourceReferenceId !== referenceId ||
    visualContext.visualSourceAdapterInput.sourceReferenceId !== referenceId ||
    visualSource.provenance.sourceReferenceId !== referenceId ||
    hasForbiddenReference(referenceId)
  ) {
    return blocked(input, "GENESIS_VISUAL_SOURCE_CONTEXT_INVALID");
  }

  const continuityContext = input.genesisPresenceContinuityContext;
  if (continuityContext === null) {
    return unavailable(
      input,
      "GENESIS_PRESENCE_CONTINUITY_CONTEXT_REQUIRED",
    );
  }
  const continuity = continuityContext.bridge;
  if (
    continuityContext.source !==
      "genesis_reality_presence_continuity_context" ||
    continuity.presenceState !== "RECOGNIZED" ||
    continuity.continuityState !== "CARRIED_TO_REALITY" ||
    continuity.arrivalState !== "REALITY_APPROACHING" ||
    continuity.presenceOrigin !== "EXISTING_IN_LIFE_COORDINATE" ||
    continuity.sourceProvenance !== "REAL_USER_SESSION" ||
    continuity.noEntityGeneration !== true ||
    continuity.noAssetGeneration !== true ||
    continuity.noPresenceMutation !== true ||
    hasForbiddenReference(continuity.sourceReferenceId)
  ) {
    return blocked(input, "GENESIS_PRESENCE_CONTINUITY_CONTEXT_INVALID");
  }

  const authorization = input.realityRouteAuthorization;
  if (authorization === null) {
    return unavailable(input, "REALITY_ROUTE_AUTHORIZATION_REQUIRED");
  }
  if (
    authorization.status !== "READY" ||
    authorization.routeTarget !== "/reality" ||
    authorization.authorizationState !==
      "AUTHORIZED_PRODUCTION_REALITY_SOURCE" ||
    authorization.sourceContext.sourceExperienceMode !==
      "REAL_USER_EXPERIENCE" ||
    authorization.sourceContext.sourceProvenance !== "REAL_USER_SESSION" ||
    authorization.sourceContext.realityEntryEligibility !== "ELIGIBLE"
  ) {
    return blocked(input, "REALITY_ROUTE_AUTHORIZATION_INVALID");
  }

  if (
    referenceId !== continuityContext.sourceReferenceId ||
    referenceId !== continuity.sourceReferenceId ||
    referenceId !== authorization.sourceReferenceId ||
    referenceId !== authorization.sourceContext.sourceReferenceId
  ) {
    return blocked(input, "SOURCE_REFERENCE_MISMATCH");
  }
  const manifestationSource =
    visualSource.projectionBundle.starBeastManifestationSource;
  if (
    continuity.manifestationSourceReferenceId !==
      manifestationSource.manifestationReferenceId ||
    visualSource.projectionBundle.lifeForceManifestationBridge.provenance
      .manifestationSourceReferenceId !==
      manifestationSource.manifestationReferenceId
  ) {
    return blocked(input, "MANIFESTATION_SOURCE_REFERENCE_MISMATCH");
  }

  const projection: RealityCoordinatePresenceVisualSourceProjection =
    Object.freeze({
      semanticRole:
        "REALITY_COORDINATE_PRESENCE_VISUAL_SOURCE_PROJECTION",
      sourceExperienceMode: "REAL_USER_EXPERIENCE",
      sourceProvenance: "REAL_USER_SESSION",
      sourceReferenceId: referenceId,
      manifestationSourceReferenceId:
        manifestationSource.manifestationReferenceId,
      presenceReferenceId: manifestationSource.presenceReference.referenceId,
      presenceState: "RECOGNIZED",
      continuityState: "CARRIED_TO_REALITY",
      arrivalState: "REALITY_APPROACHING",
      coordinateRole: "REALITY_COORDINATE_OBSERVATION",
      presenceRole: "RECOGNIZED_LIFE_PRESENCE",
      visualSource,
      sceneModel: visualSource.sceneModel,
      renderPlan: visualSource.renderPlan,
      renderPlanResult: visualSource.renderPlanResult,
      projectionBundle: visualSource.projectionBundle,
      genesisVisualSourceContext: visualContext,
      genesisPresenceContinuityContext: continuityContext,
      realityRouteAuthorization: authorization,
      existingVisualSourceReferencesOnly: true,
      sameManifestationSourceOnly: true,
      noVisualSourceCopy: true,
      noEntityGeneration: true,
      noAssetGeneration: true,
      noPresenceMutation: true,
      noEngineInvocation: true,
      noRendererInvocation: true,
      noRendererInputMutation: true,
      noVisualCalibration: true,
      noPressureMutation: true,
      noGravityMutation: true,
      noChoiceMutation: true,
      noCrystalMutation: true,
      noFallback: true,
    });

  return Object.freeze({
    status: "READY" as const,
    source: "reality_coordinate_presence_visual_source_projection" as const,
    projection,
    input,
    boundary:
      REALITY_COORDINATE_PRESENCE_VISUAL_SOURCE_PROJECTION_BOUNDARY,
  });
}
