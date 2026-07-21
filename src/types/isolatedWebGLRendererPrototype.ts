import type {
  GenesisWebGLRendererCoreController,
  GenesisWebGLRendererCoreFallback,
  GenesisWebGLRendererCoreInput,
  GenesisWebGLRendererCoreSceneProjection,
  GenesisWebGLRendererCoreSnapshot,
  GenesisWebGLRendererCoreContextState,
} from "./genesisWebGLRendererCore";
import type { IsolatedWebGLRendererPrototypeAuthorization } from "./isolatedWebGLRendererPrototypeAuthorization";

export type IsolatedWebGLRendererPrototypeSceneProjection =
  GenesisWebGLRendererCoreSceneProjection;

export type IsolatedWebGLRendererPrototypeInput =
  GenesisWebGLRendererCoreInput &
    Readonly<{
      authorization: IsolatedWebGLRendererPrototypeAuthorization | null;
    }>;

export type IsolatedWebGLRendererPrototypeContextState =
  GenesisWebGLRendererCoreContextState;

export type IsolatedWebGLRendererPrototypeSnapshot =
  GenesisWebGLRendererCoreSnapshot;

export type IsolatedWebGLRendererPrototypeController =
  GenesisWebGLRendererCoreController;

export type IsolatedWebGLRendererPrototypeFallback =
  GenesisWebGLRendererCoreFallback;

export type IsolatedWebGLRendererPrototypeBlockedReason =
  | "AUTHORIZATION_REQUIRED"
  | "AUTHORIZATION_SCOPE_INVALID"
  | "RENDER_PLAN_REQUIRED"
  | "RENDER_PLAN_BOUNDARY_INVALID"
  | "RENDER_PLAN_NOT_AUTHORIZED"
  | "MANSION_COORDINATE_PROJECTION_INVALID"
  | "VIEWPORT_INVALID";

export type IsolatedWebGLRendererPrototypeResult =
  | Readonly<{
      status: "READY";
      source: "isolated_webgl_renderer_prototype";
      controller: IsolatedWebGLRendererPrototypeController;
      boundary: IsolatedWebGLRendererPrototypeBoundary;
    }>
  | Readonly<{
      status: "FALLBACK_REQUIRED";
      source: "isolated_webgl_renderer_prototype";
      fallback: IsolatedWebGLRendererPrototypeFallback;
      boundary: IsolatedWebGLRendererPrototypeBoundary;
    }>
  | Readonly<{
      status: "BLOCKED";
      source: "isolated_webgl_renderer_prototype";
      reason: IsolatedWebGLRendererPrototypeBlockedReason;
      noRenderer: true;
      boundary: IsolatedWebGLRendererPrototypeBoundary;
    }>;

export type IsolatedWebGLRendererPrototypeBoundary = Readonly<{
  experimentOnly: true;
  renderPlanOnly: true;
  authorizationRequired: true;
  manualFrameDriverOnly: true;
  noIdentityInput: true;
  noEngineInvocation: true;
  noSceneModelInput: true;
  noAnimationLoopOwnership: true;
  noProductionIntegration: true;
  noUIIntegration: true;
  noFormalUserIntegration: true;
  noRuntimeIntegration: true;
  noStorageWrite: true;
}>;
