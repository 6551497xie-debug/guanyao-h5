import {
  AdditiveBlending,
  AmbientLight,
  BufferGeometry,
  Color,
  Float32BufferAttribute,
  Group,
  LineBasicMaterial,
  LineLoop,
  Mesh,
  MeshBasicMaterial,
  PerspectiveCamera,
  PointLight,
  Points,
  PointsMaterial,
  Scene,
  SphereGeometry,
  SRGBColorSpace,
  WebGLRenderer,
} from "three";
import { createIsolatedWebGLPrototypeRenderPlanReference } from "../services/isolatedWebGLPrototypeRenderPlanReference";
import type { PersonalStarBeastRenderPlan } from "../types/personalStarBeastRenderPlan";
import type {
  IsolatedWebGLRendererPrototypeBoundary,
  IsolatedWebGLRendererPrototypeController,
  IsolatedWebGLRendererPrototypeFallback,
  IsolatedWebGLRendererPrototypeInput,
  IsolatedWebGLRendererPrototypeResult,
  IsolatedWebGLRendererPrototypeSceneProjection,
} from "../types/isolatedWebGLRendererPrototype";

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

const hashReference = (referenceId: string): number => {
  let hash = 2166136261;
  for (let index = 0; index < referenceId.length; index += 1) {
    hash ^= referenceId.charCodeAt(index);
    hash = Math.imul(hash, 16777619);
  }
  return hash >>> 0;
};

const referenceUnit = (referenceId: string): number =>
  hashReference(referenceId) / 0xffffffff;

const createSeededRandom = (seed: number): (() => number) => {
  let state = seed || 1;
  return () => {
    state = Math.imul(state ^ (state >>> 15), 1 | state);
    state ^= state + Math.imul(state ^ (state >>> 7), 61 | state);
    return ((state ^ (state >>> 14)) >>> 0) / 4294967296;
  };
};

export function projectPersonalStarBeastRenderPlanToWebGLScene(
  plan: PersonalStarBeastRenderPlan,
): IsolatedWebGLRendererPrototypeSceneProjection {
  const planReference =
    createIsolatedWebGLPrototypeRenderPlanReference(plan);
  const structureUnit = referenceUnit(
    plan.spatialExpression.structureDensity.referenceId,
  );
  const anchorUnit = referenceUnit(
    plan.spatialExpression.anchorBehavior.referenceId,
  );
  const fieldUnit = referenceUnit(plan.fieldBehavior.spatialBias.referenceId);
  const boundaryUnit = referenceUnit(
    plan.fieldBehavior.boundaryBehavior.referenceId,
  );
  const flowUnit = referenceUnit(plan.fieldBehavior.flowDirection.referenceId);
  const lightUnit = referenceUnit(plan.lightExpression.coreLight.referenceId);
  const rhythmUnit = referenceUnit(
    plan.motionExpression.energyRhythm.referenceId,
  );
  const motionUnit = referenceUnit(
    plan.motionExpression.aggregationMode.referenceId,
  );

  return Object.freeze({
    semanticRole: "ISOLATED_WEBGL_LIFE_MANIFESTATION_SCENE",
    sourceRenderPlanReferenceId: planReference.referenceId,
    cosmicField: Object.freeze({
      particleCount: 160 + Math.round(structureUnit * 160),
      spread: 7 + anchorUnit * 3,
      opacity: 0.28 + lightUnit * 0.24,
    }),
    mansionStructure: Object.freeze({
      anchorCount: 9 + Math.round(structureUnit * 9),
      radius: 1.35 + anchorUnit * 0.8,
      lineOpacity: 0.24 + boundaryUnit * 0.34,
    }),
    formField: Object.freeze({
      hue: 0.08 + fieldUnit * 0.52,
      boundaryScale: 1.05 + boundaryUnit * 0.42,
      flowSpeed: 0.035 + flowUnit * 0.075,
    }),
    lifeCore: Object.freeze({
      hue: 0.06 + lightUnit * 0.12,
      intensity: 0.75 + lightUnit * 1.1,
      breathingAmplitude: 0.035 + rhythmUnit * 0.055,
    }),
    motion: Object.freeze({
      rotationSpeed: 0.018 + flowUnit * 0.042,
      driftAmplitude: 0.025 + motionUnit * 0.055,
    }),
    crystal: Object.freeze({
      visible: plan.crystalExpression !== null,
      nodeCount:
        plan.crystalExpression === null
          ? 0
          : 2 + Math.round(
              referenceUnit(
                plan.crystalExpression.imprintLayer.referenceId,
              ) * 4,
            ),
    }),
    rendererParametersOnly: true,
    identityBlind: true,
    noLifeFactCopy: true,
  });
}

const fallback = (
  sceneProjection: IsolatedWebGLRendererPrototypeSceneProjection,
  reason: IsolatedWebGLRendererPrototypeFallback["reason"],
): IsolatedWebGLRendererPrototypeResult =>
  Object.freeze({
    status: "FALLBACK_REQUIRED",
    source: "isolated_webgl_renderer_prototype",
    fallback: Object.freeze({
      mode: "SEMANTIC_STATIC_FALLBACK",
      reason,
      sceneProjection,
      preservesRenderPlanSemantics: true,
      noIdentityRecalculation: true,
    }),
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
  if (authorization === null) {
    return Object.freeze({
      status: "BLOCKED",
      source: "isolated_webgl_renderer_prototype",
      reason: "AUTHORIZATION_REQUIRED",
      noRenderer: true,
      boundary: PROTOTYPE_BOUNDARY,
    });
  }
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
    return Object.freeze({
      status: "BLOCKED",
      source: "isolated_webgl_renderer_prototype",
      reason: "AUTHORIZATION_SCOPE_INVALID",
      noRenderer: true,
      boundary: PROTOTYPE_BOUNDARY,
    });
  }

  const plan = input.renderPlan;
  if (plan === null) {
    return Object.freeze({
      status: "BLOCKED",
      source: "isolated_webgl_renderer_prototype",
      reason: "RENDER_PLAN_REQUIRED",
      noRenderer: true,
      boundary: PROTOTYPE_BOUNDARY,
    });
  }
  if (!isPlanBoundaryValid(plan)) {
    return Object.freeze({
      status: "BLOCKED",
      source: "isolated_webgl_renderer_prototype",
      reason: "RENDER_PLAN_BOUNDARY_INVALID",
      noRenderer: true,
      boundary: PROTOTYPE_BOUNDARY,
    });
  }

  const planReference =
    createIsolatedWebGLPrototypeRenderPlanReference(plan);
  if (
    !authorization.renderPlanReferences.some(
      (reference) => reference.referenceId === planReference.referenceId,
    )
  ) {
    return Object.freeze({
      status: "BLOCKED",
      source: "isolated_webgl_renderer_prototype",
      reason: "RENDER_PLAN_NOT_AUTHORIZED",
      noRenderer: true,
      boundary: PROTOTYPE_BOUNDARY,
    });
  }

  if (
    !Number.isFinite(input.width) ||
    !Number.isFinite(input.height) ||
    !Number.isFinite(input.pixelRatio) ||
    input.width <= 0 ||
    input.height <= 0 ||
    input.pixelRatio <= 0
  ) {
    return Object.freeze({
      status: "BLOCKED",
      source: "isolated_webgl_renderer_prototype",
      reason: "VIEWPORT_INVALID",
      noRenderer: true,
      boundary: PROTOTYPE_BOUNDARY,
    });
  }

  const sceneProjection = projectPersonalStarBeastRenderPlanToWebGLScene(plan);
  if (input.reducedMotion) {
    return fallback(sceneProjection, "REDUCED_MOTION_REQUESTED");
  }
  if (input.canvas === null) {
    return fallback(sceneProjection, "CANVAS_REQUIRED");
  }

  const context = input.canvas.getContext("webgl2", {
    alpha: true,
    antialias: true,
    depth: true,
    powerPreference: "high-performance",
    premultipliedAlpha: true,
  });
  if (context === null) {
    return fallback(sceneProjection, "WEBGL2_UNAVAILABLE");
  }

  let renderer: WebGLRenderer;
  try {
    renderer = new WebGLRenderer({
      canvas: input.canvas,
      context,
      alpha: true,
      antialias: true,
      powerPreference: "high-performance",
    });
  } catch {
    return fallback(sceneProjection, "RENDERER_INITIALIZATION_FAILED");
  }

  const scene = new Scene();
  const camera = new PerspectiveCamera(
    42,
    input.width / input.height,
    0.1,
    100,
  );
  camera.position.set(0, 0, 6.4);

  renderer.outputColorSpace = SRGBColorSpace;
  renderer.setClearColor(0x02030a, 0);
  renderer.setPixelRatio(Math.min(2, Math.max(1, input.pixelRatio)));
  renderer.setSize(input.width, input.height, false);

  const root = new Group();
  scene.add(root);
  scene.add(new AmbientLight(0xb9c6ff, 0.18));

  const random = createSeededRandom(hashReference(planReference.referenceId));
  const cosmicPositions = new Float32Array(
    sceneProjection.cosmicField.particleCount * 3,
  );
  for (
    let index = 0;
    index < sceneProjection.cosmicField.particleCount;
    index += 1
  ) {
    const offset = index * 3;
    cosmicPositions[offset] =
      (random() - 0.5) * sceneProjection.cosmicField.spread;
    cosmicPositions[offset + 1] =
      (random() - 0.5) * sceneProjection.cosmicField.spread * 0.72;
    cosmicPositions[offset + 2] = (random() - 0.5) * 4;
  }
  const cosmicGeometry = new BufferGeometry();
  cosmicGeometry.setAttribute(
    "position",
    new Float32BufferAttribute(cosmicPositions, 3),
  );
  const cosmicMaterial = new PointsMaterial({
    color: new Color().setHSL(sceneProjection.formField.hue, 0.42, 0.7),
    size: 0.025,
    transparent: true,
    opacity: sceneProjection.cosmicField.opacity,
    blending: AdditiveBlending,
    depthWrite: false,
  });
  const cosmicField = new Points(cosmicGeometry, cosmicMaterial);
  root.add(cosmicField);

  const anchorPositions = new Float32Array(
    sceneProjection.mansionStructure.anchorCount * 3,
  );
  for (
    let index = 0;
    index < sceneProjection.mansionStructure.anchorCount;
    index += 1
  ) {
    const ratio = index / sceneProjection.mansionStructure.anchorCount;
    const angle = ratio * Math.PI * 2 + (random() - 0.5) * 0.45;
    const radius =
      sceneProjection.mansionStructure.radius * (0.72 + random() * 0.36);
    const offset = index * 3;
    anchorPositions[offset] = Math.cos(angle) * radius;
    anchorPositions[offset + 1] = Math.sin(angle) * radius * 0.62;
    anchorPositions[offset + 2] = (random() - 0.5) * 0.55;
  }
  const anchorGeometry = new BufferGeometry();
  anchorGeometry.setAttribute(
    "position",
    new Float32BufferAttribute(anchorPositions, 3),
  );
  const anchorColor = new Color().setHSL(
    sceneProjection.lifeCore.hue,
    0.72,
    0.76,
  );
  const structureLine = new LineLoop(
    anchorGeometry,
    new LineBasicMaterial({
      color: anchorColor,
      transparent: true,
      opacity: sceneProjection.mansionStructure.lineOpacity,
      blending: AdditiveBlending,
    }),
  );
  const structurePoints = new Points(
    anchorGeometry,
    new PointsMaterial({
      color: anchorColor,
      size: 0.075,
      transparent: true,
      opacity: 0.86,
      blending: AdditiveBlending,
      depthWrite: false,
    }),
  );
  const structureGroup = new Group();
  structureGroup.scale.setScalar(sceneProjection.formField.boundaryScale);
  structureGroup.add(structureLine, structurePoints);
  root.add(structureGroup);

  const coreColor = new Color().setHSL(
    sceneProjection.lifeCore.hue,
    0.76,
    0.7,
  );
  const core = new Mesh(
    new SphereGeometry(0.12, 20, 20),
    new MeshBasicMaterial({
      color: coreColor,
      transparent: true,
      opacity: 0.92,
      blending: AdditiveBlending,
    }),
  );
  const coreLight = new PointLight(
    coreColor,
    sceneProjection.lifeCore.intensity,
    6,
    1.7,
  );
  core.add(coreLight);
  root.add(core);

  let frameCount = 0;
  let disposed = false;
  let contextState: "ACTIVE" | "LOST" | "RESTORED" | "DISPOSED" =
    "ACTIVE";
  let width = input.width;
  let height = input.height;

  const onContextLost = (event: Event) => {
    event.preventDefault();
    contextState = "LOST";
  };
  const onContextRestored = () => {
    if (!disposed) contextState = "RESTORED";
  };
  input.canvas.addEventListener("webglcontextlost", onContextLost, false);
  input.canvas.addEventListener("webglcontextrestored", onContextRestored, false);

  const controller: IsolatedWebGLRendererPrototypeController = Object.freeze({
    sceneProjection,
    renderFrame: (elapsedMilliseconds: number) => {
      if (disposed || contextState === "LOST") return;
      const elapsedSeconds =
        (Number.isFinite(elapsedMilliseconds)
          ? Math.max(0, elapsedMilliseconds)
          : 0) / 1000;
      root.rotation.y =
        elapsedSeconds * sceneProjection.motion.rotationSpeed;
      structureGroup.rotation.z =
        Math.sin(elapsedSeconds * sceneProjection.formField.flowSpeed) *
        sceneProjection.motion.driftAmplitude;
      const breath =
        1 +
        Math.sin(elapsedSeconds * 0.72) *
          sceneProjection.lifeCore.breathingAmplitude;
      core.scale.setScalar(breath);
      renderer.render(scene, camera);
      frameCount += 1;
    },
    resize: (nextWidth: number, nextHeight: number, nextPixelRatio = 1) => {
      if (
        disposed ||
        !Number.isFinite(nextWidth) ||
        !Number.isFinite(nextHeight) ||
        nextWidth <= 0 ||
        nextHeight <= 0
      ) {
        return;
      }
      width = nextWidth;
      height = nextHeight;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      const safePixelRatio =
        Number.isFinite(nextPixelRatio) && nextPixelRatio > 0
          ? nextPixelRatio
          : 1;
      renderer.setPixelRatio(Math.min(2, Math.max(1, safePixelRatio)));
      renderer.setSize(width, height, false);
    },
    getSnapshot: () =>
      Object.freeze({
        sourceRenderPlanReferenceId: planReference.referenceId,
        contextState,
        frameCount,
        width,
        height,
        disposed,
      }),
    dispose: () => {
      if (disposed) return;
      disposed = true;
      contextState = "DISPOSED";
      input.canvas?.removeEventListener("webglcontextlost", onContextLost, false);
      input.canvas?.removeEventListener(
        "webglcontextrestored",
        onContextRestored,
        false,
      );
      scene.traverse((object) => {
        if ("geometry" in object && object.geometry instanceof BufferGeometry) {
          object.geometry.dispose();
        }
        if ("material" in object) {
          const materials = Array.isArray(object.material)
            ? object.material
            : [object.material];
          for (const material of materials) {
            if (
              material !== null &&
              typeof material === "object" &&
              "dispose" in material &&
              typeof material.dispose === "function"
            ) {
              material.dispose();
            }
          }
        }
      });
      renderer.dispose();
      scene.clear();
    },
  });

  return Object.freeze({
    status: "READY",
    source: "isolated_webgl_renderer_prototype",
    controller,
    boundary: PROTOTYPE_BOUNDARY,
  });
}
