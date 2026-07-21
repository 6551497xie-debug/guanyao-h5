import { createGenesisWebGLRendererCore } from "../renderers/genesisWebGLRendererCore";
import { createIsolatedWebGLPrototypeRenderPlanReference } from "../services/isolatedWebGLPrototypeRenderPlanReference";
import type {
  IsolatedWebGLRendererPrototypeBoundary,
  IsolatedWebGLRendererPrototypeInput,
  IsolatedWebGLRendererPrototypeResult,
} from "../types/isolatedWebGLRendererPrototype";
import type { PersonalStarBeastRenderPlan } from "../types/personalStarBeastRenderPlan";

export { projectPersonalStarBeastRenderPlanToWebGLScene } from "../renderers/genesisWebGLRendererCore";

const PROTOTYPE_BOUNDARY: IsolatedWebGLRendererPrototypeBoundary =
  Object.freeze({
    experimentOnly: true,
    renderPlanOnly: true,
    authorizationRequired: true,
    manualFrameDriverOnly: true,
    noIdentityInput: true,
    noEngineInvocation: true,
    noSceneModelInput: true,
    noAnimationLoopOwnership: true,
    noProductionIntegration: true,
    noUIIntegration: true,
    noFormalUserIntegration: true,
    noRuntimeIntegration: true,
    noStorageWrite: true,
  });

const blocked = (
  reason: Extract<
    IsolatedWebGLRendererPrototypeResult,
    { status: "BLOCKED" }
  >["reason"],
): IsolatedWebGLRendererPrototypeResult =>
  Object.freeze({
    status: "BLOCKED" as const,
    source: "isolated_webgl_renderer_prototype" as const,
    reason,
    noRenderer: true as const,
    boundary: PROTOTYPE_BOUNDARY,
  });

const isPlanBoundaryValid = (plan: PersonalStarBeastRenderPlan): boolean =>
  plan.semanticRole === "PERSONAL_STAR_BEAST_RENDER_PLAN" &&
  plan.rendererNeutral === true &&
  plan.expressionOnly === true &&
  plan.identityBlind === true &&
  plan.noLifeFactCopy === true &&
  plan.noIdentityCalculation === true &&
  plan.noPixelOutput === true &&
  plan.noDrawCommands === true &&
  plan.noRendererInvocation === true;

export function createIsolatedWebGLRendererPrototype(
  input: IsolatedWebGLRendererPrototypeInput,
): IsolatedWebGLRendererPrototypeResult {
  const authorization = input.authorization;
  if (authorization === null) return blocked("AUTHORIZATION_REQUIRED");

  if (
    authorization.authorizationId !==
      "GUANYAO_ISOLATED_WEBGL_RENDERER_PROTOTYPE_AUTHORIZATION_V1" ||
    authorization.classification !== "EXPERIMENT" ||
    authorization.prototypeScope !==
      "ISOLATED_WEBGL_RENDERER_PROTOTYPE_ONLY" ||
    authorization.productionStatus !== "FORBIDDEN" ||
    authorization.uiIntegrationStatus !== "FORBIDDEN" ||
    authorization.formalUserStatus !== "FORBIDDEN"
  ) {
    return blocked("AUTHORIZATION_SCOPE_INVALID");
  }

  if (input.renderPlan !== null) {
    if (!isPlanBoundaryValid(input.renderPlan)) {
      return blocked("RENDER_PLAN_BOUNDARY_INVALID");
    }
    const planReference =
      createIsolatedWebGLPrototypeRenderPlanReference(input.renderPlan);
    if (
      !authorization.renderPlanReferences.some(
        (reference) => reference.referenceId === planReference.referenceId,
      )
    ) {
      return blocked("RENDER_PLAN_NOT_AUTHORIZED");
    }
  }

  const coreResult = createGenesisWebGLRendererCore({
    canvas: input.canvas,
    renderPlan: input.renderPlan,
    width: input.width,
    height: input.height,
    pixelRatio: input.pixelRatio,
    reducedMotion: input.reducedMotion,
    twentyEightMansionCoordinateProjection:
      input.twentyEightMansionCoordinateProjection,
    timeSequenceRecognitionProjection:
      input.timeSequenceRecognitionProjection,
    birthMansionIgnitionProjection: input.birthMansionIgnitionProjection,
    morphologicalFieldAlignmentProjection:
      input.morphologicalFieldAlignmentProjection,
    lifeForceInfusionProjection: input.lifeForceInfusionProjection,
    personalRevealProjection: input.personalRevealProjection,
    realityPressureProjection: input.realityPressureProjection,
    genesisVisualRealization: input.genesisVisualRealization,
    genesisPerspectiveCalibration: input.genesisPerspectiveCalibration,
    genesisPresenceRecognitionCalibration:
      input.genesisPresenceRecognitionCalibration,
    genesisSpatialDistanceCalibration:
      input.genesisSpatialDistanceCalibration,
  });

  if (coreResult.status === "BLOCKED") return blocked(coreResult.reason);
  if (coreResult.status === "FALLBACK_REQUIRED") {
    return Object.freeze({
      status: "FALLBACK_REQUIRED" as const,
      source: "isolated_webgl_renderer_prototype" as const,
      fallback: coreResult.fallback,
      boundary: PROTOTYPE_BOUNDARY,
    });
  }

  return Object.freeze({
    status: "READY" as const,
    source: "isolated_webgl_renderer_prototype" as const,
    controller: coreResult.controller,
    boundary: PROTOTYPE_BOUNDARY,
  });
}
