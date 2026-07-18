import { createGenesisWebGLRendererCore } from "./genesisWebGLRendererCore";
import type {
  GenesisProductionRendererHostAuthorization,
  GenesisProductionRendererHostBlockedReason,
  GenesisProductionRendererHostBoundary,
  GenesisProductionRendererHostInput,
  GenesisProductionRendererHostResult,
} from "../types/genesisProductionRendererHost";

const GENESIS_PRODUCTION_RENDERER_HOST_BOUNDARY: GenesisProductionRendererHostBoundary =
  Object.freeze({
    productionRendererHostOnly: true,
    explicitProductionAuthorizationRequired: true,
    realUserSessionSourceOnly: true,
    renderPlanAndProjectionPassThroughOnly: true,
    sharedRendererCoreDelegationOnly: true,
    manualFrameDriverOnly: true,
    noPrototypeAuthorization: true,
    noFixtureSource: true,
    noSourceResolution: true,
    noSourceFallback: true,
    noEngineInvocation: true,
    noIdentityRecalculation: true,
    noRenderPlanMutation: true,
    noProjectionMutation: true,
    noVisualCalibrationMutation: true,
    noTimelineMutation: true,
    noRouteIntegration: true,
    noUIIntegration: true,
    noAnimationLoopOwnership: true,
    noStorageWrite: true,
  });

const blocked = (
  reason: GenesisProductionRendererHostBlockedReason,
): GenesisProductionRendererHostResult =>
  Object.freeze({
    status: "BLOCKED" as const,
    source: "genesis_production_renderer_host" as const,
    reason,
    noRenderer: true as const,
    boundary: GENESIS_PRODUCTION_RENDERER_HOST_BOUNDARY,
  });

const isAuthorizationValid = (
  authorization: GenesisProductionRendererHostAuthorization,
): boolean =>
  authorization.authorizationId ===
    "GUANYAO_GENESIS_PRODUCTION_RENDERER_HOST_AUTHORIZATION_V2" &&
  authorization.classification === "PRODUCTION" &&
  authorization.authorizedRouteTarget === "/genesis" &&
  authorization.routeActivationEligibility === "ELIGIBLE" &&
  authorization.authorizedTarget === "GENESIS_PRODUCTION_RENDERER_HOST" &&
  authorization.authorizedRendererCore === "GENESIS_WEBGL_RENDERER_CORE" &&
  authorization.authorizedSourceMode === "REAL_USER_EXPERIENCE" &&
  authorization.authorizedSourceProvenance === "REAL_USER_SESSION" &&
  authorization.authorizedSourceReferenceId.trim().length > 0 &&
  authorization.productionRenderingStatus === "AUTHORIZED" &&
  authorization.formalUserSourceStatus === "AUTHORIZED" &&
  authorization.fixtureSourceStatus === "FORBIDDEN" &&
  authorization.prototypeAuthorizationStatus === "NOT_ACCEPTED" &&
  authorization.routeIntegrationStatus ===
    "AUTHORIZED_EXPLICIT_ROUTE_ACTIVATION" &&
  authorization.fallbackRequired === true;

export function createGenesisProductionRendererHost(
  input: GenesisProductionRendererHostInput,
): GenesisProductionRendererHostResult {
  const authorization = input.authorization;
  if (authorization === null) return blocked("AUTHORIZATION_REQUIRED");
  if (!isAuthorizationValid(authorization)) {
    return blocked("AUTHORIZATION_SCOPE_INVALID");
  }

  const sourceResult = input.consumerSourceResult;
  if (sourceResult === null || sourceResult.status !== "READY") {
    return blocked("SOURCE_NOT_READY");
  }
  if (
    sourceResult.source !== "genesis_visual_consumer_source" ||
    sourceResult.consumerSource.sourceExperienceMode !== "REAL_USER_EXPERIENCE"
  ) {
    return blocked("SOURCE_MODE_INVALID");
  }
  if (sourceResult.consumerSource.sourceProvenance !== "REAL_USER_SESSION") {
    return blocked("SOURCE_PROVENANCE_INVALID");
  }
  if (
    sourceResult.consumerSource.sourceReferenceId.trim().length === 0 ||
    sourceResult.consumerSource.sourceReferenceId !==
      authorization.authorizedSourceReferenceId
  ) {
    return blocked("SOURCE_REFERENCE_NOT_AUTHORIZED");
  }

  const sourceBoundary = sourceResult.boundary;
  if (
    sourceBoundary.consumerSourceSelectionOnly !== true ||
    sourceBoundary.explicitExperienceModeRequired !== true ||
    sourceBoundary.realUserContextOnly !== true ||
    sourceBoundary.fixturePreviewOnly !== true ||
    sourceBoundary.noCrossModeFallback !== true ||
    sourceBoundary.noEngineInvocation !== true ||
    sourceBoundary.noRendererInvocation !== true ||
    sourceBoundary.rendererInputShapePreserved !== true ||
    sourceBoundary.noRenderPlanMutation !== true ||
    sourceBoundary.noProjectionMutation !== true ||
    sourceBoundary.noVisualCalibrationMutation !== true ||
    sourceBoundary.noTimelineMutation !== true ||
    sourceBoundary.noUIMutation !== true ||
    sourceBoundary.noStorageWrite !== true ||
    sourceBoundary.productionRendererActivation !== false
  ) {
    return blocked("SOURCE_BOUNDARY_INVALID");
  }

  const consumerSource = sourceResult.consumerSource;
  const renderPlan = consumerSource.renderPlanResult.plan;
  const projectionBundle = consumerSource.projectionBundle;
  const coreResult = createGenesisWebGLRendererCore({
    canvas: input.canvas,
    renderPlan,
    width: input.width,
    height: input.height,
    pixelRatio: input.pixelRatio,
    reducedMotion: input.reducedMotion,
    timeSequenceRecognitionProjection:
      projectionBundle.timeSequenceRecognitionProjection,
    birthMansionIgnitionProjection:
      projectionBundle.birthMansionIgnitionProjection,
    morphologicalFieldAlignmentProjection:
      projectionBundle.morphologicalFieldAlignmentProjection,
    lifeForceInfusionProjection:
      projectionBundle.lifeForceInfusionProjection,
    personalRevealProjection: projectionBundle.personalRevealProjection,
    realityPressureProjection: projectionBundle.realityPressureProjection,
    genesisVisualRealization: input.genesisVisualRealization,
    genesisPerspectiveCalibration: input.genesisPerspectiveCalibration,
    genesisPresenceRecognitionCalibration:
      input.genesisPresenceRecognitionCalibration,
    genesisSpatialDistanceCalibration:
      input.genesisSpatialDistanceCalibration,
  });

  if (coreResult.status === "BLOCKED") return blocked(coreResult.reason);

  const sourceTrace = Object.freeze({
    sourceReferenceId: consumerSource.sourceReferenceId,
    sourceProvenance: "REAL_USER_SESSION" as const,
  });
  if (coreResult.status === "FALLBACK_REQUIRED") {
    return Object.freeze({
      status: "FALLBACK_REQUIRED" as const,
      source: "genesis_production_renderer_host" as const,
      ...sourceTrace,
      fallback: coreResult.fallback,
      boundary: GENESIS_PRODUCTION_RENDERER_HOST_BOUNDARY,
    });
  }

  return Object.freeze({
    status: "READY" as const,
    source: "genesis_production_renderer_host" as const,
    ...sourceTrace,
    controller: coreResult.controller,
    boundary: GENESIS_PRODUCTION_RENDERER_HOST_BOUNDARY,
  });
}
