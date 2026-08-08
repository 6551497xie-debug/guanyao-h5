import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";
import {
  commitXinmaiContinuousSceneOutcome,
  resolveXinmaiContinuousScenePresentation,
  resolveXinmaiContinuousSceneStaticFallback,
} from "../services/xinmaiContinuousScenePresentationResolver";
import { XINMAI_CONTINUOUS_SCENE_PRESENTATION_POLICY } from "../services/xinmaiContinuousScenePresentationPolicy";
import type { XinmaiContinuousSceneRuntime } from "../renderers/xinmaiContinuousSceneRendererAdapter";
import type {
  XinmaiContinuousSceneInput,
  XinmaiContinuousSceneOutcome,
  XinmaiContinuousScenePlan,
  XinmaiContinuousScenePresenterCommitProof,
} from "../types/xinmaiContinuousScenePresentation";
import {
  XinmaiContinuousSceneHostContext,
  type XinmaiContinuousSceneHostContextValue,
  type XinmaiContinuousSceneRegistration,
} from "./XinmaiContinuousSceneHostContext";

type RegisteredPresentation = Readonly<{
  sequence: number;
  registration: XinmaiContinuousSceneRegistration;
}>;

const outcomeKey = (outcome: XinmaiContinuousSceneOutcome): string =>
  outcome.status === "CONTINUOUS_SCENE_SAFE_WITHHELD"
    ? `${outcome.status}:${outcome.consumerSurface}:${outcome.scenePlanReferenceId ?? "NONE"}:${outcome.reason}`
    : `${outcome.status}:${outcome.consumerSurface}:${outcome.scenePlanReferenceId}:${outcome.proof.presenter}`;

function XinmaiContinuousStaticPresenter({
  plan,
  sameLifeSurface,
  children,
  onCommitted,
}: Readonly<{
  plan: Extract<XinmaiContinuousScenePlan, { status: "PRESENTABLE" }>;
  sameLifeSurface: XinmaiContinuousSceneInput["sameLifeSurface"];
  children: ReactNode;
  onCommitted: (proof: XinmaiContinuousScenePresenterCommitProof) => void;
}>) {
  useLayoutEffect(() => {
    const sameLifeOutcome = sameLifeSurface?.publicOutcome ?? null;
    const sameLifeProof =
      sameLifeOutcome !== null &&
      sameLifeOutcome.status !== "SAME_LIFE_SURFACE_SAFE_WITHHELD"
        ? sameLifeOutcome.proof
        : null;
    const bodyRequired = plan.sameLifeSurfaceSelection !== null;
    if (bodyRequired && sameLifeProof === null) return;
    onCommitted(
      Object.freeze({
        presenter: "SEMANTIC_STATIC_CONTINUOUS_SCENE" as const,
        scenePlanReferenceId: plan.scenePlanReferenceId,
        sourceReferenceId: plan.sourceReferenceId,
        sourceRenderPlanReferenceId: plan.sourceRenderPlanReferenceId,
        sceneHostCount: 1 as const,
        worldPresenterCount: 1 as const,
        worldContextCount: 0 as const,
        webglContextCount: 0 as const,
        rafOwnerCount: 0 as const,
        bodyPresenterCount: bodyRequired ? 1 as const : 0 as const,
        interactiveNearObjectCount:
          plan.depth.near.interactiveObjectCount,
        sameLifeSurfaceCommitProof: sameLifeProof,
      }),
    );
  }, [onCommitted, plan, sameLifeSurface]);

  return (
    <div
      className="xinmai-continuous-scene-host__static"
      aria-hidden="true"
      data-continuous-scene-static-presenter="SEMANTIC_STATIC_CONTINUOUS_SCENE"
      data-scene-plan-reference-id={plan.scenePlanReferenceId}
    >
      {children ?? <span className="xinmai-continuous-scene-host__static-field" />}
    </div>
  );
}

export function XinmaiContinuousSceneHost({
  children,
}: Readonly<{ children: ReactNode }>) {
  const registrationsRef = useRef(
    new Map<string, RegisteredPresentation>(),
  );
  const registrationSequenceRef = useRef(0);
  const [registrationRevision, setRegistrationRevision] = useState(0);
  const [currentOutcome, setCurrentOutcome] =
    useState<XinmaiContinuousSceneOutcome | null>(null);
  const currentOutcomeKeyRef = useRef<string | null>(null);
  const [presenterProof, setPresenterProof] =
    useState<XinmaiContinuousScenePresenterCommitProof | null>(null);
  const [failedMotionPlanReferenceId, setFailedMotionPlanReferenceId] =
    useState<string | null>(null);
  const [nativeReducedMotion, setNativeReducedMotion] = useState(() =>
    window.matchMedia("(prefers-reduced-motion: reduce)").matches,
  );
  const [saveData, setSaveData] = useState(() => {
    const connection = (
      navigator as Navigator & {
        connection?: Readonly<{ saveData?: boolean }>;
      }
    ).connection;
    return connection?.saveData === true;
  });
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const runtimeRef = useRef<XinmaiContinuousSceneRuntime | null>(null);

  const registerPresentation = useCallback(
    (registration: XinmaiContinuousSceneRegistration) => {
      const token = Symbol(registration.registrationReferenceId);
      const sequence = ++registrationSequenceRef.current;
      const tagged = Object.freeze({
        sequence,
        registration: Object.freeze({
          ...registration,
          __registrationToken: token,
        }) as XinmaiContinuousSceneRegistration,
      });
      registrationsRef.current.set(
        registration.registrationReferenceId,
        tagged,
      );
      setRegistrationRevision((revision) => revision + 1);
      return () => {
        const current = registrationsRef.current.get(
          registration.registrationReferenceId,
        );
        if (current !== tagged) return;
        registrationsRef.current.delete(
          registration.registrationReferenceId,
        );
        setRegistrationRevision((revision) => revision + 1);
      };
    },
    [],
  );

  const activeRegistration = useMemo(() => {
    void registrationRevision;
    return [...registrationsRef.current.values()]
      .sort(
        (left, right) =>
          right.registration.priority - left.registration.priority ||
          right.sequence - left.sequence,
      )[0]?.registration ?? null;
  }, [registrationRevision]);

  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setNativeReducedMotion(query.matches);
    query.addEventListener("change", update);
    return () => query.removeEventListener("change", update);
  }, []);

  useEffect(() => {
    const connection = (
      navigator as Navigator & {
        connection?: EventTarget & Readonly<{ saveData?: boolean }>;
      }
    ).connection;
    if (connection === undefined) return undefined;
    const update = () => setSaveData(connection.saveData === true);
    connection.addEventListener("change", update);
    return () => connection.removeEventListener("change", update);
  }, []);

  const effectiveInput = useMemo(() => {
    if (activeRegistration === null) return null;
    return Object.freeze({
      ...activeRegistration.input,
      nativeMotionPreference: nativeReducedMotion
        ? "REDUCED_MOTION" as const
        : "MOTION_ALLOWED" as const,
      qualityTier: saveData
        ? "CONSERVE_DATA" as const
        : activeRegistration.input.qualityTier,
    });
  }, [activeRegistration, nativeReducedMotion, saveData]);

  const resolvedPlan = useMemo(
    () =>
      effectiveInput === null
        ? null
        : resolveXinmaiContinuousScenePresentation(effectiveInput),
    [effectiveInput],
  );
  const plan = useMemo(() => {
    if (
      resolvedPlan === null ||
      resolvedPlan.status !== "PRESENTABLE" ||
      resolvedPlan.scenePlanReferenceId !== failedMotionPlanReferenceId
    ) {
      return resolvedPlan;
    }
    return resolveXinmaiContinuousSceneStaticFallback(resolvedPlan);
  }, [failedMotionPlanReferenceId, resolvedPlan]);

  useEffect(() => {
    if (
      resolvedPlan === null ||
      resolvedPlan.status !== "PRESENTABLE" ||
      resolvedPlan.scenePlanReferenceId === failedMotionPlanReferenceId
    ) {
      return;
    }
    setFailedMotionPlanReferenceId(null);
  }, [failedMotionPlanReferenceId, resolvedPlan]);

  const canvasRequired =
    plan?.status === "PRESENTABLE" &&
    plan.presentationMode === "MOTION" &&
    activeRegistration?.runtimeFactory !== null;
  const canvasContextKind =
    canvasRequired && activeRegistration?.runtimeFactory !== null
      ? activeRegistration.runtimeFactory.contextKind
      : "STATIC";
  const activeRegistrationReferenceId =
    activeRegistration?.registrationReferenceId ?? null;
  const activeRuntimeFactoryReferenceId =
    activeRegistration?.runtimeFactory?.factoryReferenceId ?? null;
  const activePointerInteraction =
    activeRegistration?.pointerInteraction ?? "NONE";
  const activePlanReferenceId = plan?.scenePlanReferenceId ?? null;
  const activePlanMode =
    plan?.status === "PRESENTABLE" ? plan.presentationMode : "WITHHELD";

  useEffect(() => {
    setPresenterProof(null);
    const registration = activeRegistration;
    const currentPlan = plan;
    const canvas = canvasRef.current;
    if (
      registration === null ||
      currentPlan === null ||
      currentPlan.status !== "PRESENTABLE" ||
      currentPlan.presentationMode !== "MOTION" ||
      registration.runtimeFactory === null ||
      canvas === null
    ) {
      runtimeRef.current?.dispose();
      runtimeRef.current = null;
      return undefined;
    }

    const requestStaticFallback = (
      reason: "WEBGL_INITIALIZATION_FAILED" | "WEBGL_RUNTIME_FAILED",
    ) => {
      const fallbackOutcome: XinmaiContinuousSceneOutcome = Object.freeze({
        status: "CONTINUOUS_SCENE_SAFE_WITHHELD" as const,
        consumerSurface: currentPlan.consumerSurface,
        scenePlanReferenceId: currentPlan.scenePlanReferenceId,
        reason,
        proof: null,
        reportedAt: new Date().toISOString(),
      });
      currentOutcomeKeyRef.current = outcomeKey(fallbackOutcome);
      setCurrentOutcome(fallbackOutcome);
      registration.onOutcome?.(fallbackOutcome);
      setFailedMotionPlanReferenceId(currentPlan.scenePlanReferenceId);
    };

    const context2D =
      registration.runtimeFactory.contextKind === "CANVAS_2D"
        ? canvas.getContext("2d")
        : null;
    const result = registration.runtimeFactory.create({
      canvas,
      context2D,
      plan: currentPlan,
    });
    if (result.status !== "READY") {
      runtimeRef.current = null;
      if (result.status === "FALLBACK_REQUIRED") {
        requestStaticFallback("WEBGL_INITIALIZATION_FAILED");
      } else {
        const fallbackOutcome: XinmaiContinuousSceneOutcome = Object.freeze({
          status: "CONTINUOUS_SCENE_SAFE_WITHHELD" as const,
          consumerSurface: currentPlan.consumerSurface,
          scenePlanReferenceId: currentPlan.scenePlanReferenceId,
          reason: "PRESENTER_UNAVAILABLE" as const,
          proof: null,
          reportedAt: new Date().toISOString(),
        });
        currentOutcomeKeyRef.current = outcomeKey(fallbackOutcome);
        setCurrentOutcome(fallbackOutcome);
        registration.onOutcome?.(fallbackOutcome);
      }
      return undefined;
    }

    const runtime = result.runtime;
    runtimeRef.current = runtime;
    let animationFrame = 0;
    let disposed = false;
    let visible = !document.hidden;
    const pixelRatio = () =>
      Math.min(2, Math.max(1, window.devicePixelRatio || 1));
    const resize = (width: number, height: number) => {
      const dpr = pixelRatio();
      const targetWidth = Math.max(1, Math.round(width * dpr));
      const targetHeight = Math.max(1, Math.round(height * dpr));
      if (canvas.width !== targetWidth) canvas.width = targetWidth;
      if (canvas.height !== targetHeight) canvas.height = targetHeight;
      if (context2D !== null) {
        context2D.setTransform(dpr, 0, 0, dpr, 0, 0);
      }
      runtime.resize(Math.max(1, width), Math.max(1, height), dpr);
    };
    const bounds = canvas.getBoundingClientRect();
    resize(bounds.width, bounds.height);

    const render = (timestamp: number) => {
      if (disposed || !visible) return;
      try {
        runtime.renderFrame(timestamp);
      } catch {
        disposed = true;
        runtime.dispose();
        runtimeRef.current = null;
        requestStaticFallback("WEBGL_RUNTIME_FAILED");
        return;
      }
      const failure = runtime.readFailure();
      if (failure !== null) {
        disposed = true;
        runtime.dispose();
        runtimeRef.current = null;
        requestStaticFallback("WEBGL_RUNTIME_FAILED");
        return;
      }
      const proof = runtime.readCommitProof();
      if (proof !== null) setPresenterProof(proof);
      animationFrame = window.requestAnimationFrame(render);
    };

    const resizeObserver = new ResizeObserver((entries) => {
      const entry = entries[0];
      if (entry === undefined) return;
      resize(entry.contentRect.width, entry.contentRect.height);
    });
    const handleVisibility = () => {
      visible = !document.hidden;
      if (!visible) {
        window.cancelAnimationFrame(animationFrame);
        return;
      }
      animationFrame = window.requestAnimationFrame(render);
    };
    const relayPointer = (
      type: "pointerdown" | "pointermove" | "pointerup" | "pointercancel",
    ) => (event: PointerEvent) => runtime.handlePointerEvent?.(type, event);
    const pointerDown = relayPointer("pointerdown");
    const pointerMove = relayPointer("pointermove");
    const pointerUp = relayPointer("pointerup");
    const pointerCancel = relayPointer("pointercancel");

    resizeObserver.observe(canvas);
    document.addEventListener("visibilitychange", handleVisibility);
    if (registration.pointerInteraction === "HOST_CANVAS") {
      canvas.addEventListener("pointerdown", pointerDown);
      canvas.addEventListener("pointermove", pointerMove);
      canvas.addEventListener("pointerup", pointerUp);
      canvas.addEventListener("pointercancel", pointerCancel);
    }
    animationFrame = window.requestAnimationFrame(render);

    return () => {
      disposed = true;
      window.cancelAnimationFrame(animationFrame);
      resizeObserver.disconnect();
      document.removeEventListener("visibilitychange", handleVisibility);
      canvas.removeEventListener("pointerdown", pointerDown);
      canvas.removeEventListener("pointermove", pointerMove);
      canvas.removeEventListener("pointerup", pointerUp);
      canvas.removeEventListener("pointercancel", pointerCancel);
      runtime.dispose();
      if (runtimeRef.current === runtime) runtimeRef.current = null;
    };
  }, [
    activePointerInteraction,
    activeRegistrationReferenceId,
    activeRuntimeFactoryReferenceId,
    activePlanMode,
    activePlanReferenceId,
    canvasContextKind,
  ]);

  const acceptStaticProof = useCallback(
    (proof: XinmaiContinuousScenePresenterCommitProof) => {
      setPresenterProof(proof);
    },
    [],
  );

  useEffect(() => {
    if (activeRegistration === null || plan === null) {
      currentOutcomeKeyRef.current = null;
      setCurrentOutcome(null);
      return;
    }
    const outcome = commitXinmaiContinuousSceneOutcome({
      plan,
      proof: presenterProof,
      sameLifePublicOutcome:
        effectiveInput?.sameLifeSurface?.publicOutcome ?? null,
      now: new Date().toISOString(),
    });
    const key = outcomeKey(outcome);
    if (currentOutcomeKeyRef.current === key) return;
    currentOutcomeKeyRef.current = key;
    setCurrentOutcome(outcome);
    activeRegistration.onOutcome?.(outcome);
  }, [
    activeRegistration,
    effectiveInput?.sameLifeSurface?.publicOutcome,
    plan,
    presenterProof,
  ]);

  const contextValue = useMemo<XinmaiContinuousSceneHostContextValue>(
    () => Object.freeze({ registerPresentation, currentOutcome }),
    [currentOutcome, registerPresentation],
  );

  return (
    <XinmaiContinuousSceneHostContext.Provider value={contextValue}>
      <div
        className="xinmai-continuous-scene-host"
        data-continuous-scene-host="SINGLE_APP_SHELL_OWNER"
        data-continuous-scene-policy={
          XINMAI_CONTINUOUS_SCENE_PRESENTATION_POLICY
        }
        data-continuous-scene-outcome={
          currentOutcome?.status ?? "CONTINUOUS_SCENE_SAFE_WITHHELD"
        }
        data-continuous-scene-consumer={
          activeRegistration?.input.consumerSurface ?? "NONE"
        }
        data-continuous-scene-plan={
          plan?.scenePlanReferenceId ?? "NONE"
        }
        data-continuous-scene-world-presenter-count={
          currentOutcome !== null &&
          currentOutcome.status !== "CONTINUOUS_SCENE_SAFE_WITHHELD"
            ? 1
            : 0
        }
      >
        {canvasRequired ? (
          <canvas
            key={canvasContextKind}
            ref={canvasRef}
            className={`xinmai-continuous-scene-host__canvas ${activeRegistration?.canvasClassName ?? ""}`.trim()}
            style={activeRegistration?.canvasStyle}
            aria-hidden="true"
            data-continuous-scene-canvas-owner="XINMAI_CONTINUOUS_SCENE_HOST"
            data-continuous-scene-context-kind={canvasContextKind}
            data-continuous-scene-pointer-owner={
              activeRegistration?.pointerInteraction ?? "NONE"
            }
            {...(activeRegistration?.canvasAttributes ?? {})}
          />
        ) : null}
        {plan?.status === "PRESENTABLE" &&
        plan.presentationMode === "STATIC" &&
        effectiveInput !== null ? (
          <XinmaiContinuousStaticPresenter
            plan={plan}
            sameLifeSurface={effectiveInput.sameLifeSurface}
            onCommitted={acceptStaticProof}
          >
            {activeRegistration?.staticSurface}
          </XinmaiContinuousStaticPresenter>
        ) : null}
      </div>
      {children}
    </XinmaiContinuousSceneHostContext.Provider>
  );
}
