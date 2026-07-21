import type {
  RealityPresenceProductionRendererHostAuthorization,
  RealityPresenceRendererAuthorizationBlockedReason,
  RealityPresenceRendererAuthorizationBoundary,
  RealityPresenceRendererAuthorizationInput,
  RealityPresenceRendererAuthorizationResult,
} from "../types/realityPresenceRendererAuthorization";

export const REALITY_PRESENCE_RENDERER_AUTHORIZATION_BOUNDARY: RealityPresenceRendererAuthorizationBoundary =
  Object.freeze({
    rendererAuthorizationOnly: true,
    existingPresenceVisualSourceProjectionOnly: true,
    existingVisualCalibrationHandoffSnapshotOnly: true,
    recognizedPresenceOnly: true,
    realityApproachingOnly: true,
    sourceReferenceContinuityRequired: true,
    manifestationReferenceContinuityRequired: true,
    productionHostEligibilityOnly: true,
    immutableAuthorizationOnly: true,
    noEngineResult: true,
    noUserData: true,
    noSceneModel: true,
    noRenderPlan: true,
    noCalibrationCopy: true,
    noCalibrationMutation: true,
    noEngineInvocation: true,
    noRendererInvocation: true,
    noRendererCoreInvocation: true,
    noRendererHostImplementation: true,
    noRouteIntegration: true,
    noNavigationMutation: true,
    noUiIntegration: true,
    noTimelineMutation: true,
    noPressureExecution: true,
    noGravityExecution: true,
    noChoiceExecution: true,
    noCrystalExecution: true,
    noStorageRead: true,
    noStorageWrite: true,
    noFixtureSource: true,
    noPrototypeSource: true,
    noDefaultSource: true,
    noFallbackSource: true,
  });

const unavailable = (
  input: RealityPresenceRendererAuthorizationInput,
  guardReason: RealityPresenceRendererAuthorizationBlockedReason,
): RealityPresenceRendererAuthorizationResult =>
  Object.freeze({
    status: "SOURCE_NOT_READY" as const,
    source: "reality_presence_renderer_authorization" as const,
    authorizationState: "SOURCE_NOT_READY" as const,
    guardReason,
    authorization: null,
    input,
    boundary: REALITY_PRESENCE_RENDERER_AUTHORIZATION_BOUNDARY,
  });

const blocked = (
  input: RealityPresenceRendererAuthorizationInput,
  guardReason: RealityPresenceRendererAuthorizationBlockedReason,
): RealityPresenceRendererAuthorizationResult =>
  Object.freeze({
    status: "BLOCKED" as const,
    source: "reality_presence_renderer_authorization" as const,
    authorizationState: "BLOCKED" as const,
    guardReason,
    authorization: null,
    input,
    boundary: REALITY_PRESENCE_RENDERER_AUTHORIZATION_BOUNDARY,
  });

const hasForbiddenReference = (referenceId: string): boolean =>
  ["fixture", "prototype", "default", "referenceonly"].some((marker) =>
    referenceId.toLowerCase().includes(marker),
  );

export function authorizeRealityPresenceRenderer(
  input: RealityPresenceRendererAuthorizationInput,
): RealityPresenceRendererAuthorizationResult {
  const projection = input.presenceVisualSourceProjection;
  if (projection === null) {
    return unavailable(input, "PRESENCE_VISUAL_SOURCE_PROJECTION_REQUIRED");
  }
  const snapshot = input.visualCalibrationHandoffSnapshot;
  if (snapshot === null) {
    return unavailable(input, "VISUAL_CALIBRATION_HANDOFF_SNAPSHOT_REQUIRED");
  }

  if (
    projection.semanticRole !==
      "REALITY_COORDINATE_PRESENCE_VISUAL_SOURCE_PROJECTION" ||
    projection.sourceExperienceMode !== "REAL_USER_EXPERIENCE" ||
    projection.sourceProvenance !== "REAL_USER_SESSION" ||
    projection.presenceState !== "RECOGNIZED" ||
    projection.continuityState !== "CARRIED_TO_REALITY" ||
    projection.arrivalState !== "REALITY_APPROACHING" ||
    projection.coordinateRole !== "REALITY_COORDINATE_OBSERVATION" ||
    projection.existingVisualSourceReferencesOnly !== true ||
    projection.sameManifestationSourceOnly !== true ||
    projection.noVisualSourceCopy !== true ||
    projection.noEntityGeneration !== true ||
    projection.noEngineInvocation !== true ||
    projection.noRendererInvocation !== true ||
    projection.noRendererInputMutation !== true ||
    projection.noFallback !== true
  ) {
    return blocked(input, "PRESENCE_VISUAL_SOURCE_PROJECTION_INVALID");
  }

  if (
    snapshot.schemaVersion !==
      "GUANYAO_REALITY_PRESENCE_VISUAL_CALIBRATION_HANDOFF_SNAPSHOT_V1" ||
    snapshot.semanticRole !==
      "REALITY_PRESENCE_VISUAL_CALIBRATION_HANDOFF_SNAPSHOT" ||
    snapshot.sourceProvenance !== "REAL_USER_SESSION" ||
    snapshot.runtimeStage !== "COMPLETION" ||
    snapshot.presenceState !== "RECOGNIZED" ||
    snapshot.handoffState !==
      "READY_FOR_REALITY_PRESENCE_RENDERER_AUTHORIZATION" ||
    snapshot.existingCalibrationReferencesOnly !== true ||
    snapshot.preserveExistingCalibrationObjectIdentity !== true ||
    snapshot.noCalibrationCopy !== true ||
    snapshot.noCalibrationMutation !== true ||
    snapshot.noEngineInvocation !== true ||
    snapshot.noRendererInvocation !== true ||
    snapshot.noRendererAuthorization !== true ||
    snapshot.noRouteIntegration !== true ||
    snapshot.noFallback !== true
  ) {
    return blocked(input, "VISUAL_CALIBRATION_HANDOFF_SNAPSHOT_INVALID");
  }

  if (
    hasForbiddenReference(projection.sourceReferenceId) ||
    hasForbiddenReference(snapshot.sourceReferenceId) ||
    hasForbiddenReference(projection.manifestationSourceReferenceId) ||
    hasForbiddenReference(snapshot.manifestationSourceReferenceId)
  ) {
    return blocked(input, "FORBIDDEN_SOURCE_REFERENCE");
  }
  if (projection.sourceReferenceId !== snapshot.sourceReferenceId) {
    return blocked(input, "SOURCE_REFERENCE_MISMATCH");
  }
  if (
    projection.manifestationSourceReferenceId !==
      snapshot.manifestationSourceReferenceId ||
    projection.manifestationSourceReferenceId !==
      snapshot.presenceVisualRealization.manifestationSourceReferenceId ||
    projection.manifestationSourceReferenceId !==
      snapshot.presenceRecognitionContinuityActivation
        .manifestationSourceReferenceId
  ) {
    return blocked(input, "MANIFESTATION_SOURCE_REFERENCE_MISMATCH");
  }

  const authorization: RealityPresenceProductionRendererHostAuthorization =
    Object.freeze({
      authorizationId:
        "GUANYAO_REALITY_PRESENCE_PRODUCTION_RENDERER_AUTHORIZATION_V1",
      classification: "PRODUCTION",
      authorizedTarget: "REALITY_PRESENCE_PRODUCTION_RENDERER_HOST",
      authorizedRendererCore: "GENESIS_WEBGL_RENDERER_CORE",
      authorizedSourceMode: "REAL_USER_EXPERIENCE",
      authorizedSourceProvenance: "REAL_USER_SESSION",
      authorizedSourceReferenceId: projection.sourceReferenceId,
      authorizedManifestationSourceReferenceId:
        projection.manifestationSourceReferenceId,
      authorizedPresenceState: "RECOGNIZED",
      authorizedRealityArrivalState: "REALITY_APPROACHING",
      authorizedCalibrationSnapshotSchema:
        "GUANYAO_REALITY_PRESENCE_VISUAL_CALIBRATION_HANDOFF_SNAPSHOT_V1",
      hostEligibility: "ELIGIBLE",
      productionRenderingStatus: "AUTHORIZED",
      sourceProjectionStatus: "AUTHORIZED",
      calibrationHandoffStatus: "AUTHORIZED",
      fixtureSourceStatus: "FORBIDDEN",
      prototypeAuthorizationStatus: "NOT_ACCEPTED",
      routeIntegrationStatus: "NOT_AUTHORIZED_IN_THIS_CONTRACT",
      rendererInvocationStatus: "NOT_STARTED",
      fallbackRequired: true,
    });

  return Object.freeze({
    status: "READY" as const,
    source: "reality_presence_renderer_authorization" as const,
    authorizationState:
      "AUTHORIZED_REALITY_PRESENCE_PRODUCTION_RENDERER" as const,
    guardReason: null,
    authorization,
    input,
    boundary: REALITY_PRESENCE_RENDERER_AUTHORIZATION_BOUNDARY,
  });
}
