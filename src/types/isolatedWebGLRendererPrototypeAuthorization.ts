import type {
  PersonalStarBeastRenderPlan,
  PersonalStarBeastRenderPlanAdapterResult,
} from "./personalStarBeastRenderPlan";

export type IsolatedWebGLPrototypeAuthorizationReviewReference = Readonly<{
  referenceType: "ISOLATED_WEBGL_PROTOTYPE_AUTHORIZATION_REVIEW";
  protocolId: "RC-EXPLICIT-WEBGL-PROTOTYPE-AUTHORIZATION-REVIEW-P95";
  recommendation:
    "RECOMMENDED_FOR_EXPLICIT_ISOLATED_WEBGL_PROTOTYPE_AUTHORIZATION";
  priorExecutionStatus: "NOT_AUTHORIZED_PENDING_TOTAL_CONTROL_DECISION";
}>;

export type IsolatedWebGLPrototypeExplicitAuthorityReference = Readonly<{
  referenceType: "ISOLATED_WEBGL_PROTOTYPE_EXPLICIT_AUTHORITY";
  authority: "TOTAL_CONTROL_EXPLICIT_DECISION";
  decision: "AUTHORIZE_FIRST_ISOLATED_WEBGL_RENDERER_PROTOTYPE";
  decisionReferenceId: string;
}>;

export type IsolatedWebGLPrototypeRenderPlanReference = Readonly<{
  referenceType: "ISOLATED_WEBGL_PROTOTYPE_RENDER_PLAN";
  referenceId: string;
  source: "personal_star_beast_scene_model_adapter";
  sourceSemanticRole: PersonalStarBeastRenderPlan["semanticRole"];
  identityBlind: true;
  rendererNeutral: true;
}>;

export type IsolatedWebGLRendererPrototypeAuthorizationInput = Readonly<{
  authorizationReviewReference:
    | IsolatedWebGLPrototypeAuthorizationReviewReference
    | null;
  explicitAuthorityReference:
    | IsolatedWebGLPrototypeExplicitAuthorityReference
    | null;
  renderPlanResults: readonly [
    PersonalStarBeastRenderPlanAdapterResult,
    PersonalStarBeastRenderPlanAdapterResult,
  ] | null;
  prototypeScope: "ISOLATED_WEBGL_RENDERER_PROTOTYPE_ONLY";
}>;

export type IsolatedWebGLRendererPrototypeAuthorization = Readonly<{
  authorizationId: "GUANYAO_ISOLATED_WEBGL_RENDERER_PROTOTYPE_AUTHORIZATION_V1";
  classification: "EXPERIMENT";
  authorizedTarget: "FIRST_ISOLATED_WEBGL_RENDERER_PROTOTYPE";
  validationObjective:
    "RENDER_PLAN_TO_LIFE_MANIFESTATION_EXPERIENCE";
  backendCandidate: "THREE_JS_WEBGL2";
  authorizedInput: "PERSONAL_STAR_BEAST_RENDER_PLAN_ONLY";
  renderPlanReferences: readonly [
    IsolatedWebGLPrototypeRenderPlanReference,
    IsolatedWebGLPrototypeRenderPlanReference,
  ];
  prototypeScope: "ISOLATED_WEBGL_RENDERER_PROTOTYPE_ONLY";
  implementationStatus: "AUTHORIZED_NOT_IMPLEMENTED";
  backendActivationStatus: "AUTHORIZED_NOT_ACTIVATED";
  productionStatus: "FORBIDDEN";
  uiIntegrationStatus: "FORBIDDEN";
  formalUserStatus: "FORBIDDEN";
  runtimeIntegrationStatus: "FORBIDDEN";
  storageIntegrationStatus: "FORBIDDEN";
  fallbackRequired: true;
  twoPlanValidationRequired: true;
}>;

export type IsolatedWebGLRendererPrototypeAuthorizationUnavailableReason =
  | "AUTHORIZATION_REVIEW_REFERENCE_REQUIRED"
  | "EXPLICIT_AUTHORITY_REFERENCE_REQUIRED"
  | "TWO_RENDER_PLAN_RESULTS_REQUIRED";

export type IsolatedWebGLRendererPrototypeAuthorizationBlockedReason =
  | "AUTHORIZATION_REVIEW_INVALID"
  | "EXPLICIT_AUTHORITY_DECISION_INVALID"
  | "PROTOTYPE_SCOPE_INVALID"
  | "RENDER_PLAN_RESULT_NOT_PLANNED"
  | "RENDER_PLAN_BOUNDARY_INVALID"
  | "RENDER_PLAN_PAIR_NOT_DISTINCT";

export type IsolatedWebGLRendererPrototypeAuthorizationResult =
  | Readonly<{
      status: "AUTHORIZED";
      source: "isolated_webgl_renderer_prototype_authorization";
      input: IsolatedWebGLRendererPrototypeAuthorizationInput;
      authorization: IsolatedWebGLRendererPrototypeAuthorization;
      boundary: IsolatedWebGLRendererPrototypeAuthorizationBoundary;
    }>
  | Readonly<{
      status: "UNAVAILABLE";
      source: "isolated_webgl_renderer_prototype_authorization";
      reason: IsolatedWebGLRendererPrototypeAuthorizationUnavailableReason;
      input: IsolatedWebGLRendererPrototypeAuthorizationInput;
      noAuthorization: true;
      boundary: IsolatedWebGLRendererPrototypeAuthorizationBoundary;
    }>
  | Readonly<{
      status: "BLOCKED";
      source: "isolated_webgl_renderer_prototype_authorization";
      reason: IsolatedWebGLRendererPrototypeAuthorizationBlockedReason;
      input: IsolatedWebGLRendererPrototypeAuthorizationInput;
      noAuthorization: true;
      boundary: IsolatedWebGLRendererPrototypeAuthorizationBoundary;
    }>;

export type IsolatedWebGLRendererPrototypeAuthorizationBoundary = Readonly<{
  explicitAuthorizationOnly: true;
  authorizationContractOnly: true;
  firstRendererExperimentAuthorized: true;
  renderPlanOnly: true;
  twoFormalPlansRequired: true;
  noIdentityInput: true;
  noEngineInput: true;
  noRendererImplementation: true;
  noDependencyInstallation: true;
  noBackendActivation: true;
  noProductionIntegration: true;
  noUIIntegration: true;
  noFormalUserIntegration: true;
  noRuntimeIntegration: true;
  noStorageWrite: true;
}>;
