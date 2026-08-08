import type {
  XinmaiContinuousScenePlan,
  XinmaiContinuousScenePresenterCommitProof,
  XinmaiContinuousSceneRendererFailure,
} from "../types/xinmaiContinuousScenePresentation";
import { createGenesisWebGLRendererCore } from "./genesisWebGLRendererCore";
import { createGenesisProductionRendererHost } from "./genesisProductionRendererHost";
import type { GenesisWebGLRendererCoreInput } from "../types/genesisWebGLRendererCore";
import type {
  GenesisProductionRendererHostInput,
} from "../types/genesisProductionRendererHost";
import type { XinmaiSameLifeSurfaceCommitProof } from "../types/xinmaiSameLifeSurfacePresentation";

export type XinmaiContinuousScenePointerEvent =
  | PointerEvent
  | MouseEvent
  | KeyboardEvent;

export type XinmaiContinuousSceneRuntime = Readonly<{
  contextKind: "CANVAS_2D" | "WEBGL";
  renderFrame: (timestamp: number) => void;
  resize: (width: number, height: number, pixelRatio: number) => void;
  handlePointerEvent?: (
    type: "pointerdown" | "pointermove" | "pointerup" | "pointercancel",
    event: PointerEvent,
  ) => void;
  readCommitProof: () => XinmaiContinuousScenePresenterCommitProof | null;
  readFailure: () => XinmaiContinuousSceneRendererFailure | null;
  dispose: () => void;
}>;

export type XinmaiContinuousSceneRuntimeFactoryResult =
  | Readonly<{
      status: "READY";
      runtime: XinmaiContinuousSceneRuntime;
    }>
  | Readonly<{
      status: "FALLBACK_REQUIRED";
      reason: "WEBGL_UNAVAILABLE" | "RENDERER_INITIALIZATION_FAILED";
    }>
  | Readonly<{
      status: "SAFE_WITHHELD";
      reason: "PRESENTER_UNAVAILABLE" | "PLAN_MISMATCH";
    }>;

export type XinmaiContinuousSceneRuntimeFactory = Readonly<{
  factoryReferenceId: string;
  contextKind: "CANVAS_2D" | "WEBGL";
  create: (input: Readonly<{
    canvas: HTMLCanvasElement;
    context2D: CanvasRenderingContext2D | null;
    plan: Extract<XinmaiContinuousScenePlan, { status: "PRESENTABLE" }>;
  }>) => XinmaiContinuousSceneRuntimeFactoryResult;
}>;

export type XinmaiContinuousSceneDeferredCanvas2DDelegate = Readonly<{
  renderFrame: (timestamp: number) => void;
  resize: (width: number, height: number, pixelRatio: number) => void;
  handlePointerEvent?: XinmaiContinuousSceneRuntime["handlePointerEvent"];
  readCommitProof: XinmaiContinuousSceneRuntime["readCommitProof"];
  readFailure: XinmaiContinuousSceneRuntime["readFailure"];
  dispose: () => void;
}>;

export type XinmaiContinuousSceneDeferredCanvas2DSession = Readonly<{
  sessionReferenceId: string;
  canvas: HTMLCanvasElement;
  context2D: CanvasRenderingContext2D;
  plan: Extract<XinmaiContinuousScenePlan, { status: "PRESENTABLE" }>;
  attach: (
    delegate: XinmaiContinuousSceneDeferredCanvas2DDelegate,
  ) => () => void;
}>;

export const XINMAI_CONTINUOUS_SCENE_RENDERER_ADAPTER_BOUNDARY =
  Object.freeze({
    existingRendererCoreOnly: true,
    hostInvokesFactory: true,
    hostOwnsCanvas: true,
    hostOwnsAnimationFrame: true,
    hostOwnsResize: true,
    hostOwnsVisibility: true,
    hostOwnsCanvasPointerListeners: true,
    noStorageRead: true,
    noStorageWrite: true,
    noAuthorityWriteback: true,
    noOutcomeFromFrameCount: true,
  });

type ExistingRendererCallbacks = Readonly<{
  onSameLifeSurfaceCommitProof?: (
    proof: XinmaiSameLifeSurfaceCommitProof,
  ) => void;
  onLifeWhisperVisualOutcome?: (
    outcome: ReturnType<
      Extract<
        ReturnType<typeof createGenesisWebGLRendererCore>,
        { status: "READY" }
      >["controller"]["getSnapshot"]
    >["lifeWhisperVisualResponseOutcome"],
  ) => void;
}>;

export function createXinmaiContinuousSceneSameLifeRendererAdapter(input: Readonly<{
  factoryReferenceId: string;
  coreInput: Omit<
    GenesisWebGLRendererCoreInput,
    "canvas" | "width" | "height" | "pixelRatio" | "reducedMotion"
  >;
  callbacks?: ExistingRendererCallbacks;
}>): XinmaiContinuousSceneRuntimeFactory {
  return Object.freeze({
    factoryReferenceId: input.factoryReferenceId,
    contextKind: "WEBGL" as const,
    create: ({ canvas, plan }) => {
      const bounds = canvas.getBoundingClientRect();
      const renderer = createGenesisWebGLRendererCore({
        ...input.coreInput,
        canvas,
        width: Math.max(1, bounds.width),
        height: Math.max(1, bounds.height),
        pixelRatio: Math.min(2, Math.max(1, window.devicePixelRatio || 1)),
        reducedMotion: false,
      });
      if (renderer.status === "FALLBACK_REQUIRED") {
        return Object.freeze({
          status: "FALLBACK_REQUIRED" as const,
          reason: renderer.fallback.reason === "WEBGL2_UNAVAILABLE"
            ? "WEBGL_UNAVAILABLE" as const
            : "RENDERER_INITIALIZATION_FAILED" as const,
        });
      }
      if (renderer.status === "BLOCKED") {
        return Object.freeze({
          status: "SAFE_WITHHELD" as const,
          reason: "PLAN_MISMATCH" as const,
        });
      }

      const controller = renderer.controller;
      const startedAt = performance.now();
      let proof: XinmaiContinuousScenePresenterCommitProof | null = null;
      let failure: XinmaiContinuousSceneRendererFailure | null = null;
      const runtime: XinmaiContinuousSceneRuntime = Object.freeze({
        contextKind: "WEBGL" as const,
        renderFrame: (timestamp) => {
          controller.renderFrame(Math.max(0, timestamp - startedAt));
          const snapshot = controller.getSnapshot();
          if (snapshot.contextState === "LOST") {
            failure = Object.freeze({
              status: "CONTINUOUS_SCENE_RENDERER_FAILED" as const,
              stage: "RUNTIME" as const,
              reason: "CONTEXT_LOST" as const,
              scenePlanReferenceId: plan.scenePlanReferenceId,
            });
            return;
          }
          if (snapshot.lifeWhisperVisualResponseOutcome !== null) {
            input.callbacks?.onLifeWhisperVisualOutcome?.(
              snapshot.lifeWhisperVisualResponseOutcome,
            );
          }
          if (snapshot.sameLifeSurfaceCommitProof === null) return;
          input.callbacks?.onSameLifeSurfaceCommitProof?.(
            snapshot.sameLifeSurfaceCommitProof,
          );
          proof = Object.freeze({
            presenter: "WEBGL_CONTINUOUS_SCENE" as const,
            scenePlanReferenceId: plan.scenePlanReferenceId,
            sourceReferenceId: plan.sourceReferenceId,
            sourceRenderPlanReferenceId:
              plan.sourceRenderPlanReferenceId,
            sceneHostCount: 1 as const,
            worldPresenterCount: 1 as const,
            worldContextCount: 1 as const,
            webglContextCount: 1 as const,
            rafOwnerCount: 1 as const,
            bodyPresenterCount: 1 as const,
            interactiveNearObjectCount:
              plan.depth.near.interactiveObjectCount,
            sameLifeSurfaceCommitProof:
              snapshot.sameLifeSurfaceCommitProof,
          });
        },
        resize: (width, height, pixelRatio) =>
          controller.resize(width, height, Math.min(2, pixelRatio)),
        readCommitProof: () => proof,
        readFailure: () => failure,
        dispose: () => controller.dispose(),
      });
      return Object.freeze({ status: "READY" as const, runtime });
    },
  });
}

export function createXinmaiContinuousSceneGenesisRendererAdapter(input: Readonly<{
  factoryReferenceId: string;
  rendererInput: Omit<
    GenesisProductionRendererHostInput,
    "canvas" | "width" | "height" | "pixelRatio" | "reducedMotion"
  >;
  onLifeWhisperVisualOutcome?: ExistingRendererCallbacks["onLifeWhisperVisualOutcome"];
}>): XinmaiContinuousSceneRuntimeFactory {
  return Object.freeze({
    factoryReferenceId: input.factoryReferenceId,
    contextKind: "WEBGL" as const,
    create: ({ canvas, plan }) => {
      const bounds = canvas.getBoundingClientRect();
      const renderer = createGenesisProductionRendererHost({
        ...input.rendererInput,
        canvas,
        width: Math.max(1, bounds.width),
        height: Math.max(1, bounds.height),
        pixelRatio: Math.min(2, Math.max(1, window.devicePixelRatio || 1)),
        reducedMotion: false,
      });
      if (renderer.status === "FALLBACK_REQUIRED") {
        return Object.freeze({
          status: "FALLBACK_REQUIRED" as const,
          reason: renderer.fallback.reason === "WEBGL2_UNAVAILABLE"
            ? "WEBGL_UNAVAILABLE" as const
            : "RENDERER_INITIALIZATION_FAILED" as const,
        });
      }
      if (renderer.status === "BLOCKED") {
        return Object.freeze({
          status: "SAFE_WITHHELD" as const,
          reason: "PLAN_MISMATCH" as const,
        });
      }
      const controller = renderer.controller;
      const startedAt = performance.now();
      let proof: XinmaiContinuousScenePresenterCommitProof | null = null;
      let failure: XinmaiContinuousSceneRendererFailure | null = null;
      const runtime: XinmaiContinuousSceneRuntime = Object.freeze({
        contextKind: "WEBGL" as const,
        renderFrame: (timestamp) => {
          controller.renderFrame(Math.max(0, timestamp - startedAt));
          const snapshot = controller.getSnapshot();
          if (snapshot.contextState === "LOST") {
            failure = Object.freeze({
              status: "CONTINUOUS_SCENE_RENDERER_FAILED" as const,
              stage: "RUNTIME" as const,
              reason: "CONTEXT_LOST" as const,
              scenePlanReferenceId: plan.scenePlanReferenceId,
            });
            return;
          }
          input.onLifeWhisperVisualOutcome?.(
            snapshot.lifeWhisperVisualResponseOutcome,
          );
          proof = Object.freeze({
            presenter: "WEBGL_CONTINUOUS_SCENE" as const,
            scenePlanReferenceId: plan.scenePlanReferenceId,
            sourceReferenceId: plan.sourceReferenceId,
            sourceRenderPlanReferenceId:
              plan.sourceRenderPlanReferenceId,
            sceneHostCount: 1 as const,
            worldPresenterCount: 1 as const,
            worldContextCount: 1 as const,
            webglContextCount: 1 as const,
            rafOwnerCount: 1 as const,
            bodyPresenterCount: 0 as const,
            interactiveNearObjectCount:
              plan.depth.near.interactiveObjectCount,
            sameLifeSurfaceCommitProof: null,
          });
        },
        resize: (width, height, pixelRatio) =>
          controller.resize(width, height, Math.min(2, pixelRatio)),
        readCommitProof: () => proof,
        readFailure: () => failure,
        dispose: () => controller.dispose(),
      });
      return Object.freeze({ status: "READY" as const, runtime });
    },
  });
}

export function createXinmaiContinuousSceneDeferredCanvas2DRendererAdapter(
  input: Readonly<{
    factoryReferenceId: string;
    onSession: (
      session: XinmaiContinuousSceneDeferredCanvas2DSession,
    ) => void;
    onSessionClosed: (sessionReferenceId: string) => void;
  }>,
): XinmaiContinuousSceneRuntimeFactory {
  return Object.freeze({
    factoryReferenceId: input.factoryReferenceId,
    contextKind: "CANVAS_2D" as const,
    create: ({ canvas, context2D, plan }) => {
      if (context2D === null) {
        return Object.freeze({
          status: "SAFE_WITHHELD" as const,
          reason: "PRESENTER_UNAVAILABLE" as const,
        });
      }
      const sessionReferenceId =
        `${input.factoryReferenceId}:${plan.scenePlanReferenceId}`;
      let delegate: XinmaiContinuousSceneDeferredCanvas2DDelegate | null =
        null;
      const session = Object.freeze({
        sessionReferenceId,
        canvas,
        context2D,
        plan,
        attach: (nextDelegate: XinmaiContinuousSceneDeferredCanvas2DDelegate) => {
          delegate = nextDelegate;
          return () => {
            if (delegate === nextDelegate) delegate = null;
          };
        },
      });
      input.onSession(session);
      const runtime: XinmaiContinuousSceneRuntime = Object.freeze({
        contextKind: "CANVAS_2D" as const,
        renderFrame: (timestamp) => delegate?.renderFrame(timestamp),
        resize: (width, height, pixelRatio) =>
          delegate?.resize(width, height, pixelRatio),
        handlePointerEvent: (type, event) =>
          delegate?.handlePointerEvent?.(type, event),
        readCommitProof: () => delegate?.readCommitProof() ?? null,
        readFailure: () => delegate?.readFailure() ?? null,
        dispose: () => {
          delegate?.dispose();
          delegate = null;
          input.onSessionClosed(sessionReferenceId);
        },
      });
      return Object.freeze({ status: "READY" as const, runtime });
    },
  });
}
