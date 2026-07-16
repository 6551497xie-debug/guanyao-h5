import type { PersonalStarBeastRenderPlan } from "../types/personalStarBeastRenderPlan";
import type {
  IsolatedWebGLRendererPrototypeAuthorizationBlockedReason,
  IsolatedWebGLRendererPrototypeAuthorizationInput,
  IsolatedWebGLRendererPrototypeAuthorizationResult,
  IsolatedWebGLRendererPrototypeAuthorizationUnavailableReason,
} from "../types/isolatedWebGLRendererPrototypeAuthorization";
import { createIsolatedWebGLPrototypeRenderPlanReference } from "./isolatedWebGLPrototypeRenderPlanReference";

const AUTHORIZATION_BOUNDARY = Object.freeze({
  explicitAuthorizationOnly: true,
  authorizationContractOnly: true,
  firstRendererExperimentAuthorized: true,
  renderPlanOnly: true,
  twoFormalPlansRequired: true,
  noIdentityInput: true,
  noEngineInput: true,
  noRendererImplementation: true,
  noDependencyInstallation: true,
  noBackendActivation: true,
  noProductionIntegration: true,
  noUIIntegration: true,
  noFormalUserIntegration: true,
  noRuntimeIntegration: true,
  noStorageWrite: true,
} as const);

const unavailable = (
  input: IsolatedWebGLRendererPrototypeAuthorizationInput,
  reason: IsolatedWebGLRendererPrototypeAuthorizationUnavailableReason,
): IsolatedWebGLRendererPrototypeAuthorizationResult =>
  Object.freeze({
    status: "UNAVAILABLE",
    source: "isolated_webgl_renderer_prototype_authorization",
    reason,
    input,
    noAuthorization: true,
    boundary: AUTHORIZATION_BOUNDARY,
  });

const blocked = (
  input: IsolatedWebGLRendererPrototypeAuthorizationInput,
  reason: IsolatedWebGLRendererPrototypeAuthorizationBlockedReason,
): IsolatedWebGLRendererPrototypeAuthorizationResult =>
  Object.freeze({
    status: "BLOCKED",
    source: "isolated_webgl_renderer_prototype_authorization",
    reason,
    input,
    noAuthorization: true,
    boundary: AUTHORIZATION_BOUNDARY,
  });

const isAuthorizedPlan = (plan: PersonalStarBeastRenderPlan): boolean =>
  plan.semanticRole === "PERSONAL_STAR_BEAST_RENDER_PLAN" &&
  plan.rendererNeutral === true &&
  plan.expressionOnly === true &&
  plan.identityBlind === true &&
  plan.semanticChannelsOnly === true &&
  plan.noLifeFactCopy === true &&
  plan.noIdentityCalculation === true &&
  plan.noPixelOutput === true &&
  plan.noDrawCommands === true &&
  plan.noRendererInvocation === true &&
  plan.noBackendSelection === true &&
  plan.noWebGLActivation === true;

export function authorizeIsolatedWebGLRendererPrototype(
  input: IsolatedWebGLRendererPrototypeAuthorizationInput,
): IsolatedWebGLRendererPrototypeAuthorizationResult {
  if (input.authorizationReviewReference === null) {
    return unavailable(input, "AUTHORIZATION_REVIEW_REFERENCE_REQUIRED");
  }
  if (input.explicitAuthorityReference === null) {
    return unavailable(input, "EXPLICIT_AUTHORITY_REFERENCE_REQUIRED");
  }
  if (input.renderPlanResults === null) {
    return unavailable(input, "TWO_RENDER_PLAN_RESULTS_REQUIRED");
  }

  if (
    input.authorizationReviewReference.protocolId !==
      "RC-EXPLICIT-WEBGL-PROTOTYPE-AUTHORIZATION-REVIEW-P95" ||
    input.authorizationReviewReference.recommendation !==
      "RECOMMENDED_FOR_EXPLICIT_ISOLATED_WEBGL_PROTOTYPE_AUTHORIZATION" ||
    input.authorizationReviewReference.priorExecutionStatus !==
      "NOT_AUTHORIZED_PENDING_TOTAL_CONTROL_DECISION"
  ) {
    return blocked(input, "AUTHORIZATION_REVIEW_INVALID");
  }

  if (
    input.explicitAuthorityReference.authority !==
      "TOTAL_CONTROL_EXPLICIT_DECISION" ||
    input.explicitAuthorityReference.decision !==
      "AUTHORIZE_FIRST_ISOLATED_WEBGL_RENDERER_PROTOTYPE" ||
    input.explicitAuthorityReference.decisionReferenceId.trim().length === 0
  ) {
    return blocked(input, "EXPLICIT_AUTHORITY_DECISION_INVALID");
  }

  if (input.prototypeScope !== "ISOLATED_WEBGL_RENDERER_PROTOTYPE_ONLY") {
    return blocked(input, "PROTOTYPE_SCOPE_INVALID");
  }

  const [leftResult, rightResult] = input.renderPlanResults;
  if (leftResult.status !== "PLANNED" || rightResult.status !== "PLANNED") {
    return blocked(input, "RENDER_PLAN_RESULT_NOT_PLANNED");
  }
  if (
    leftResult.source !== "personal_star_beast_scene_model_adapter" ||
    rightResult.source !== "personal_star_beast_scene_model_adapter" ||
    leftResult.boundary.outputPlanIsIdentityBlind !== true ||
    rightResult.boundary.outputPlanIsIdentityBlind !== true ||
    leftResult.boundary.noRendererInvocation !== true ||
    rightResult.boundary.noRendererInvocation !== true ||
    !isAuthorizedPlan(leftResult.plan) ||
    !isAuthorizedPlan(rightResult.plan)
  ) {
    return blocked(input, "RENDER_PLAN_BOUNDARY_INVALID");
  }

  const leftReference = createIsolatedWebGLPrototypeRenderPlanReference(
    leftResult.plan,
  );
  const rightReference = createIsolatedWebGLPrototypeRenderPlanReference(
    rightResult.plan,
  );
  if (leftReference.referenceId === rightReference.referenceId) {
    return blocked(input, "RENDER_PLAN_PAIR_NOT_DISTINCT");
  }
  const renderPlanReferences = Object.freeze([
    leftReference,
    rightReference,
  ] as const);

  return Object.freeze({
    status: "AUTHORIZED",
    source: "isolated_webgl_renderer_prototype_authorization",
    input,
    authorization: Object.freeze({
      authorizationId:
        "GUANYAO_ISOLATED_WEBGL_RENDERER_PROTOTYPE_AUTHORIZATION_V1",
      classification: "EXPERIMENT",
      authorizedTarget: "FIRST_ISOLATED_WEBGL_RENDERER_PROTOTYPE",
      validationObjective:
        "RENDER_PLAN_TO_LIFE_MANIFESTATION_EXPERIENCE",
      backendCandidate: "THREE_JS_WEBGL2",
      authorizedInput: "PERSONAL_STAR_BEAST_RENDER_PLAN_ONLY",
      renderPlanReferences,
      prototypeScope: "ISOLATED_WEBGL_RENDERER_PROTOTYPE_ONLY",
      implementationStatus: "AUTHORIZED_NOT_IMPLEMENTED",
      backendActivationStatus: "AUTHORIZED_NOT_ACTIVATED",
      productionStatus: "FORBIDDEN",
      uiIntegrationStatus: "FORBIDDEN",
      formalUserStatus: "FORBIDDEN",
      runtimeIntegrationStatus: "FORBIDDEN",
      storageIntegrationStatus: "FORBIDDEN",
      fallbackRequired: true,
      twoPlanValidationRequired: true,
    }),
    boundary: AUTHORIZATION_BOUNDARY,
  });
}
