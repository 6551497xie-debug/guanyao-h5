import {
  AdditiveBlending,
  AmbientLight,
  BufferGeometry,
  CanvasTexture,
  Color,
  Float32BufferAttribute,
  Group,
  Line,
  LineBasicMaterial,
  LineSegments,
  Mesh,
  MeshBasicMaterial,
  NormalBlending,
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
import { projectPersonalStarBeastRenderPlanToLifePresence } from "../services/personalStarBeastLifePresenceProjection";
import { projectLifePresenceToLifeStarCore } from "../services/personalStarBeastLifeStarCoreProjection";
import { calibrateGenesisTwentyEightMansionVisualLayer } from "../services/genesisTwentyEightMansionVisualLayerCalibration";
import type { GenesisTimeSequenceRecognitionProjection } from "../types/genesisTimeSequenceRecognitionProjection";
import type { GenesisBirthMansionIgnitionProjection } from "../types/genesisBirthMansionIgnitionProjection";
import type { GenesisFourSymbolAlignmentProjection } from "../types/genesisFourSymbolAlignmentProjection";
import type { GenesisFourSymbolDirectionFieldVisualCalibration } from "../types/genesisFourSymbolDirectionFieldVisualCalibration";
import type { GenesisLifeForceInfusionProjection } from "../types/genesisLifeForceInfusionProjection";
import type { GenesisLifeArchetypeForceCondensationVisualCalibration } from "../types/genesisLifeArchetypeForceCondensationVisualCalibration";
import type { GenesisPersonalRevealProjection } from "../types/genesisPersonalRevealProjection";
import type { GenesisRealityPressureProjection } from "../types/genesisRealityPressureProjection";
import type { GenesisTwentyEightMansionCoordinateProjection } from "../types/genesisTwentyEightMansionCoordinateProjection";
import type { PersonalStarBeastRenderPlan } from "../types/personalStarBeastRenderPlan";
import type {
  GenesisPerspectiveCalibrationCore,
  GenesisPresenceRecognitionCalibrationCore,
  GenesisRendererVisualRealizationCore,
  GenesisSpatialDistanceCalibrationCore,
} from "../types/genesisProductionVisualCalibrationBridge";
import type {
  GenesisWebGLRendererCoreBoundary,
  GenesisWebGLRendererCoreController,
  GenesisWebGLRendererCoreFallback,
  GenesisWebGLRendererCoreInput,
  GenesisWebGLRendererCoreResult,
  GenesisWebGLRendererCoreSceneProjection,
} from "../types/genesisWebGLRendererCore";
import {
  LIFE_UNIVERSE_CORE_IDENTITY,
  LIFE_UNIVERSE_STAR_FIELD,
} from "./lifeUniverseStarField";

const GENESIS_WEBGL_RENDERER_CORE_BOUNDARY: GenesisWebGLRendererCoreBoundary =
  Object.freeze({
    rendererCoreOnly: true,
    renderPlanOnly: true,
    authorizationExternal: true,
    manualFrameDriverOnly: true,
    noIdentityInput: true,
    noEngineInvocation: true,
    noSceneModelInput: true,
    noAnimationLoopOwnership: true,
    noSourceSelection: true,
    noAuthorizationDecision: true,
    noUIIntegration: true,
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

const FIRST_IMPRESSION_MOTION_CALIBRATION = Object.freeze({
  rotationBase: 0.06,
  rotationRange: 0.14,
  fieldFlowBase: 0.18,
  fieldFlowBendScale: 0.22,
});

const createSeededRandom = (seed: number): (() => number) => {
  let state = seed || 1;
  return () => {
    state = Math.imul(state ^ (state >>> 15), 1 | state);
    state ^= state + Math.imul(state ^ (state >>> 7), 61 | state);
    return ((state ^ (state >>> 14)) >>> 0) / 4294967296;
  };
};

const createLifeOriginStarTexture = (): CanvasTexture | null => {
  if (typeof document === "undefined") return null;

  const sprite = document.createElement("canvas");
  sprite.width = 64;
  sprite.height = 64;
  const context = sprite.getContext("2d");
  if (context === null) return null;

  const gradient = context.createRadialGradient(32, 32, 0, 32, 32, 30);
  gradient.addColorStop(0, "rgba(255,255,255,1)");
  gradient.addColorStop(0.18, "rgba(239,250,255,0.96)");
  gradient.addColorStop(0.48, "rgba(184,224,235,0.44)");
  gradient.addColorStop(1, "rgba(111,168,182,0)");
  context.fillStyle = gradient;
  context.fillRect(0, 0, 64, 64);

  const texture = new CanvasTexture(sprite);
  texture.needsUpdate = true;
  return texture;
};

const createInkWashLifeAuraTexture = (): CanvasTexture | null => {
  if (typeof document === "undefined") return null;

  const sprite = document.createElement("canvas");
  sprite.width = 96;
  sprite.height = 96;
  const context = sprite.getContext("2d");
  if (context === null) return null;

  context.clearRect(0, 0, 96, 96);
  context.save();
  context.translate(48, 48);
  context.scale(1, 0.72);

  const wash = context.createRadialGradient(0, 0, 2, 0, 0, 44);
  wash.addColorStop(0, "rgba(238,251,249,0.54)");
  wash.addColorStop(0.24, "rgba(205,235,232,0.34)");
  wash.addColorStop(0.58, "rgba(126,181,183,0.16)");
  wash.addColorStop(0.82, "rgba(72,119,126,0.07)");
  wash.addColorStop(1, "rgba(30,66,74,0)");
  context.fillStyle = wash;
  context.beginPath();
  context.arc(0, 0, 44, 0, Math.PI * 2);
  context.fill();

  // Break the perfect radial edge into a restrained ink wash. This remains a
  // reusable material for the existing body topology, never an animal mask.
  context.globalCompositeOperation = "destination-out";
  for (let index = 0; index < 18; index += 1) {
    const angle = (index / 18) * Math.PI * 2;
    const radius = 35 + Math.sin(index * 2.37) * 5;
    const washoutRadius = 4 + (index % 4) * 1.3;
    context.globalAlpha = 0.22 + (index % 3) * 0.08;
    context.beginPath();
    context.arc(
      Math.cos(angle) * radius,
      Math.sin(angle) * radius,
      washoutRadius,
      0,
      Math.PI * 2,
    );
    context.fill();
  }
  context.restore();

  const texture = new CanvasTexture(sprite);
  texture.needsUpdate = true;
  return texture;
};

export function projectPersonalStarBeastRenderPlanToWebGLScene(
  plan: PersonalStarBeastRenderPlan,
  timeSequenceRecognition: GenesisTimeSequenceRecognitionProjection | null = null,
  birthMansionIgnition: GenesisBirthMansionIgnitionProjection | null = null,
  morphologicalFieldAlignment: GenesisFourSymbolAlignmentProjection | null = null,
  lifeForceInfusion: GenesisLifeForceInfusionProjection | null = null,
  personalReveal: GenesisPersonalRevealProjection | null = null,
  realityPressure: GenesisRealityPressureProjection | null = null,
  genesisVisualRealization: GenesisRendererVisualRealizationCore | null = null,
  genesisPerspectiveCalibration: GenesisPerspectiveCalibrationCore | null = null,
  genesisPresenceRecognitionCalibration: GenesisPresenceRecognitionCalibrationCore | null = null,
  genesisSpatialDistanceCalibration: GenesisSpatialDistanceCalibrationCore | null = null,
  twentyEightMansionCoordinateProjection: GenesisTwentyEightMansionCoordinateProjection | null = null,
  fourSymbolDirectionFieldVisualCalibration: GenesisFourSymbolDirectionFieldVisualCalibration | null = null,
  lifeArchetypeForceCondensationVisualCalibration: GenesisLifeArchetypeForceCondensationVisualCalibration | null = null,
): GenesisWebGLRendererCoreSceneProjection {
  const planReference =
    createIsolatedWebGLPrototypeRenderPlanReference(plan);
  const lifePresence = projectPersonalStarBeastRenderPlanToLifePresence(
    plan,
    timeSequenceRecognition,
    birthMansionIgnition,
    morphologicalFieldAlignment,
    lifeForceInfusion,
    personalReveal,
    realityPressure,
  );
  const lifeStarCore = projectLifePresenceToLifeStarCore(lifePresence);
  const mansionCoordinateVisualLayerResult =
    calibrateGenesisTwentyEightMansionVisualLayer(
      Object.freeze({
        coordinateProjection: twentyEightMansionCoordinateProjection,
        activeVisualLayer:
          genesisVisualRealization?.activeVisualLayer ?? null,
      }),
    );
  const structureUnit = referenceUnit(
    plan.spatialExpression.structureDensity.referenceId,
  );
  const fieldUnit = referenceUnit(plan.fieldBehavior.spatialBias.referenceId);
  const flowUnit = referenceUnit(plan.fieldBehavior.flowDirection.referenceId);
  const lightUnit = referenceUnit(plan.lightExpression.coreLight.referenceId);

  return Object.freeze({
    semanticRole: "ISOLATED_WEBGL_LIFE_MANIFESTATION_SCENE",
    sourceRenderPlanReferenceId: planReference.referenceId,
    cosmicField: Object.freeze({
      particleCount: 160 + Math.round(structureUnit * 160),
      spread: 7 + structureUnit * 3,
      opacity: 0.28 + lightUnit * 0.24,
    }),
    mansionStructure: Object.freeze({
      anchorCount:
        lifePresence.stellarSkeleton.spineSegments +
        lifePresence.stellarSkeleton.branchCount,
      radius: lifePresence.stellarSkeleton.spineLength,
      lineOpacity: 0.24 + lifePresence.corePresence.coherence * 0.34,
    }),
    mansionCoordinateField:
      twentyEightMansionCoordinateProjection === null
        ? null
        : Object.freeze({
            coordinateSystem: "GENESIS_NORMALIZED_MANSION_ORBIT" as const,
            coordinateCount: 28 as const,
            coordinates:
              twentyEightMansionCoordinateProjection.coordinates,
            birthCoordinateIndex:
              twentyEightMansionCoordinateProjection.birthMansion
                .mansionIndex,
            sourceProjectionConsumed: true as const,
            noMansionName: true as const,
            noIdentityCalculation: true as const,
          }),
    mansionCoordinateVisualLayer:
      mansionCoordinateVisualLayerResult.status === "AVAILABLE"
        ? mansionCoordinateVisualLayerResult.calibration
        : null,
    fourSymbolDirectionFieldVisualCalibration,
    lifeArchetypeForceCondensationVisualCalibration,
    formField: Object.freeze({
      hue: 0.08 + fieldUnit * 0.52,
      boundaryScale: lifePresence.morphologicalField.fieldScale,
      flowSpeed:
        FIRST_IMPRESSION_MOTION_CALIBRATION.fieldFlowBase +
        Math.abs(lifePresence.morphologicalField.bend) *
          FIRST_IMPRESSION_MOTION_CALIBRATION.fieldFlowBendScale,
    }),
    lifeCore: Object.freeze({
      hue: 0.06 + lightUnit * 0.12,
      intensity: 0.75 + lifePresence.corePresence.lightReach,
      breathingAmplitude: lifePresence.corePresence.breathingAmplitude,
    }),
    motion: Object.freeze({
      rotationSpeed:
        FIRST_IMPRESSION_MOTION_CALIBRATION.rotationBase +
        flowUnit * FIRST_IMPRESSION_MOTION_CALIBRATION.rotationRange,
      driftAmplitude:
        0.025 + Math.abs(lifePresence.morphologicalField.bend) * 0.055,
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
    lifePresence,
    lifeStarCore,
    timeSequenceRecognition,
    birthMansionIgnition,
    morphologicalFieldAlignment,
    lifeForceInfusion,
    personalReveal,
    realityPressure,
    genesisVisualRealization,
    genesisPerspectiveCalibration,
    genesisPresenceRecognitionCalibration,
    genesisSpatialDistanceCalibration,
    rendererParametersOnly: true,
    identityBlind: true,
    noLifeFactCopy: true,
  });
}

const fallback = (
  sceneProjection: GenesisWebGLRendererCoreSceneProjection,
  reason: GenesisWebGLRendererCoreFallback["reason"],
): GenesisWebGLRendererCoreResult =>
  Object.freeze({
    status: "FALLBACK_REQUIRED",
    source: "genesis_webgl_renderer_core",
    fallback: Object.freeze({
      mode: "SEMANTIC_STATIC_FALLBACK",
      reason,
      sceneProjection,
      preservesRenderPlanSemantics: true,
      noIdentityRecalculation: true,
    }),
    boundary: GENESIS_WEBGL_RENDERER_CORE_BOUNDARY,
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

const isMansionCoordinateProjectionValid = (
  projection: GenesisTwentyEightMansionCoordinateProjection,
): boolean => {
  const activeCoordinates = projection.coordinates.filter(
    (coordinate) => coordinate.isBirthMansionCoordinate,
  );
  return (
    projection.semanticRole ===
      "GENESIS_TWENTY_EIGHT_MANSION_COORDINATE_PROJECTION" &&
    projection.coordinateSystem === "GENESIS_NORMALIZED_MANSION_ORBIT" &&
    projection.coordinateCount === 28 &&
    projection.coordinates.length === 28 &&
    activeCoordinates.length === 1 &&
    activeCoordinates[0]?.coordinateIndex ===
      projection.birthMansion.mansionIndex &&
    projection.existingMansionResultOnly === true &&
    projection.noMansionCalculation === true &&
    projection.noIdentitySelection === true &&
    projection.noRendererParameters === true &&
    projection.noFallback === true
  );
};

export function createGenesisWebGLRendererCore(
  input: GenesisWebGLRendererCoreInput,
): GenesisWebGLRendererCoreResult {
  const plan = input.renderPlan;
  if (plan === null) {
    return Object.freeze({
      status: "BLOCKED",
      source: "genesis_webgl_renderer_core",
      reason: "RENDER_PLAN_REQUIRED",
      noRenderer: true,
      boundary: GENESIS_WEBGL_RENDERER_CORE_BOUNDARY,
    });
  }
  if (!isPlanBoundaryValid(plan)) {
    return Object.freeze({
      status: "BLOCKED",
      source: "genesis_webgl_renderer_core",
      reason: "RENDER_PLAN_BOUNDARY_INVALID",
      noRenderer: true,
      boundary: GENESIS_WEBGL_RENDERER_CORE_BOUNDARY,
    });
  }

  const mansionCoordinateProjection =
    input.twentyEightMansionCoordinateProjection ?? null;
  if (
    mansionCoordinateProjection !== null &&
    !isMansionCoordinateProjectionValid(mansionCoordinateProjection)
  ) {
    return Object.freeze({
      status: "BLOCKED",
      source: "genesis_webgl_renderer_core",
      reason: "MANSION_COORDINATE_PROJECTION_INVALID",
      noRenderer: true,
      boundary: GENESIS_WEBGL_RENDERER_CORE_BOUNDARY,
    });
  }

  const planReference =
    createIsolatedWebGLPrototypeRenderPlanReference(plan);

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
      source: "genesis_webgl_renderer_core",
      reason: "VIEWPORT_INVALID",
      noRenderer: true,
      boundary: GENESIS_WEBGL_RENDERER_CORE_BOUNDARY,
    });
  }

  const isRealityCanvas =
    input.canvas?.hasAttribute("data-reality-life-universe-renderer") === true;
  // The formal projection travels with the same real-user source, but it only
  // becomes visually active inside the existing Reality canvas consumer.
  // Genesis therefore closes on an undisturbed recognized life.
  const realityPressureProjection =
    isRealityCanvas
      ? input.realityPressureProjection ?? null
      : null;
  const sceneProjection = projectPersonalStarBeastRenderPlanToWebGLScene(
    plan,
    input.timeSequenceRecognitionProjection ?? null,
    input.birthMansionIgnitionProjection ?? null,
    input.morphologicalFieldAlignmentProjection ?? null,
    input.lifeForceInfusionProjection ?? null,
    input.personalRevealProjection ?? null,
    realityPressureProjection,
    input.genesisVisualRealization ?? null,
    input.genesisPerspectiveCalibration ?? null,
    input.genesisPresenceRecognitionCalibration ?? null,
    input.genesisSpatialDistanceCalibration ?? null,
    mansionCoordinateProjection,
    input.fourSymbolDirectionFieldVisualCalibration ?? null,
    input.lifeArchetypeForceCondensationVisualCalibration ?? null,
  );
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
  const lifeUniverseAnchorOffsetY =
    2 *
    Math.tan((camera.fov * Math.PI) / 360) *
    camera.position.z *
    (0.5 - LIFE_UNIVERSE_CORE_IDENTITY.anchorY);
  root.position.y = lifeUniverseAnchorOffsetY;
  scene.add(root);
  scene.add(new AmbientLight(0xb9c6ff, 0.18));

  const genesisVisualRealization = sceneProjection.genesisVisualRealization;
  const genesisPerspectiveCalibration =
    sceneProjection.genesisPerspectiveCalibration;
  const presenceRecognitionCalibration =
    sceneProjection.genesisPresenceRecognitionCalibration;
  const spatialDistanceCalibration =
    sceneProjection.genesisSpatialDistanceCalibration;
  const activeVisualLayer = genesisVisualRealization?.activeVisualLayer ?? null;
  const isMoonOrigin = activeVisualLayer === "MOON_ORIGIN";
  const isStarRiver = activeVisualLayer === "STAR_RIVER";
  const isTimeResonance = activeVisualLayer === "TIME_RESONANCE";
  const isSymbolReveal = activeVisualLayer === "SYMBOL_REVEAL";
  const isHexagramImprint = activeVisualLayer === "HEXAGRAM_IMPRINT";
  const isLifeForce = activeVisualLayer === "LIFE_FORCE";
  const isStarBeastReveal = activeVisualLayer === "STAR_BEAST_REVEAL";
  const isCompletion = activeVisualLayer === "COMPLETION";
  // Genesis and Reality both consume the same completed identity scene.
  // Genesis lets the user discover its source order; Reality keeps the order
  // as a quiet memory. Neither consumer creates a second life or a new model.
  const isGenesisLifeOriginStarMapReveal =
    !isRealityCanvas &&
    isCompletion &&
    input.canvas?.hasAttribute("data-life-origin-discovery-phase") === true;
  const isLifeOriginStarMapReveal =
    (isRealityCanvas || isGenesisLifeOriginStarMapReveal) && isCompletion;
  const lifeOriginStarTexture = isLifeOriginStarMapReveal
    ? createLifeOriginStarTexture()
    : null;
  const isLifeCoordinateStage = isSymbolReveal;
  const isLifeDirectionStage = isHexagramImprint || isLifeForce;
  const isContinuityPresenceStage =
    isMoonOrigin || isStarRiver || isTimeResonance;
  const isPresenceStage = isStarBeastReveal || isCompletion;
  const inkWashLifeAuraTexture = isPresenceStage
    ? createInkWashLifeAuraTexture()
    : null;
  const realizationProgress = genesisVisualRealization?.transitionProgress ?? 0;
  const perspectiveBalance = genesisPerspectiveCalibration?.presenceBalance;
  const perspectiveMoonWeight = perspectiveBalance?.moonWeight ?? 1;
  const perspectiveStarWeight = perspectiveBalance?.starWeight ?? 1;
  const perspectiveTimeWeight = perspectiveBalance?.timeResponseWeight ?? 1;
  const perspectiveCoreSuppression =
    perspectiveBalance?.coreSuppression ?? 0;
  const perspectiveBackgroundDepth = perspectiveBalance?.backgroundDepth ?? 1;
  const perspectiveResponseIntensity =
    perspectiveBalance?.responseIntensity ?? 0;
  const perspectiveLifeAxisStrength =
    perspectiveBalance?.lifeAxisStrength ?? 0;
  const perspectiveMorphologicalTension =
    perspectiveBalance?.morphologicalTension ?? 0;
  const perspectiveMemorySedimentation =
    perspectiveBalance?.memorySedimentation ?? 0;
  const perspectiveForceRhythm = perspectiveBalance?.forceRhythm ?? 0;
  const perspectiveInnerMotionDifference =
    perspectiveBalance?.innerMotionDifference ?? 0;
  const perspectiveFormationContinuity =
    perspectiveBalance?.formationContinuity ?? 1;
  const perspectiveSubjectAxisStrength =
    perspectiveBalance?.subjectAxisStrength ?? 0;
  const perspectiveBodyCohesion = perspectiveBalance?.bodyCohesion ?? 0;
  const perspectivePresenceBreath = perspectiveBalance?.presenceBreath ?? 0;
  const perspectiveSubjectForeground =
    perspectiveBalance?.subjectForeground ?? 0;
  const perspectiveCompletionStillness =
    perspectiveBalance?.completionStillness ?? 0;
  const perspectiveRecognitionStability =
    perspectiveBalance?.recognitionStability ?? 0;
  const recognitionSubjectWeight =
    presenceRecognitionCalibration?.subjectWeight ?? 1;
  const recognitionCosmicSupportWeight =
    presenceRecognitionCalibration?.cosmicSupportWeight ?? 1;
  const recognitionCenterInfluence =
    presenceRecognitionCalibration?.centerInfluence ?? 1;
  const recognitionHold =
    presenceRecognitionCalibration?.recognitionHold ?? 0;
  const recognitionStillness =
    presenceRecognitionCalibration?.stillness ?? 0;
  const spatialDepthScale = spatialDistanceCalibration?.depthScale ?? 1;
  const spatialContrast = spatialDistanceCalibration?.contrast ?? 1;
  const spatialEdgeDefinition =
    spatialDistanceCalibration?.edgeDefinition ?? 0.82;
  const spatialFocusStrength = spatialDistanceCalibration?.focusStrength ?? 0.5;
  const spatialApproachProgress =
    spatialDistanceCalibration?.approachProgress ?? 0;
  const spatialPresenceCarry =
    spatialDistanceCalibration?.presenceCarry ?? 0;
  const recognitionIdentityLock = isCompletion
    ? Math.min(
        1,
        Math.max(
          0,
          recognitionHold * recognitionStillness * spatialPresenceCarry,
        ),
      )
    : 0;
  const recognitionCoreVisibility = isStarBeastReveal
    ? 0.7 + recognitionCenterInfluence * 0.06
    : isCompletion
      ? 0.7 +
        recognitionCenterInfluence * 0.07 +
        recognitionIdentityLock * 0.06
      : 1;
  const perspectiveCoreDimming =
    isMoonOrigin || isStarRiver || isTimeResonance
      ? 1 - perspectiveCoreSuppression * 0.42
      : isStarBeastReveal
        ? 0.9 - perspectiveSubjectForeground * 0.04
        : isCompletion
          ? 0.92 - perspectiveRecognitionStability * 0.02
          : 1;
  const random = createSeededRandom(hashReference(planReference.referenceId));
  // Geometry is intentionally stage-invariant. Density changes are expressed
  // through opacity so the user never sees the universe get regenerated. The
  // field itself is the same immutable topology used before Genesis.
  const cosmicParticleCount = LIFE_UNIVERSE_STAR_FIELD.length;
  const cosmicPositions = new Float32Array(cosmicParticleCount * 3);
  LIFE_UNIVERSE_STAR_FIELD.forEach((star, index) => {
    const offset = index * 3;
    cosmicPositions[offset] = star.x;
    cosmicPositions[offset + 1] = star.y;
    cosmicPositions[offset + 2] = star.z;
  });
  const cosmicGeometry = new BufferGeometry();
  cosmicGeometry.setAttribute(
    "position",
    new Float32BufferAttribute(cosmicPositions, 3),
  );
  const cosmicMaterial = new PointsMaterial({
    color: new Color().setHSL(sceneProjection.formField.hue, 0.42, 0.7),
    map: lifeOriginStarTexture,
    alphaTest: isLifeOriginStarMapReveal ? 0.018 : 0,
    size: isMoonOrigin
      ? 0.022
      : isStarRiver
        ? 0.022
        : isSymbolReveal
          ? 0.024
          : isHexagramImprint
            ? 0.021
            : isLifeForce
              ? 0.022
              : isPresenceStage
                ? isLifeOriginStarMapReveal
                  ? 0.027
                  : 0.023
              : 0.02,
    sizeAttenuation: true,
    transparent: true,
    opacity:
      sceneProjection.cosmicField.opacity *
      (isMoonOrigin
        ? 0.7
        : isStarRiver
          ? 1.12
          : isTimeResonance
            ? 0.96
            : isSymbolReveal
              ? 1.06
              : isHexagramImprint
                ? 0.9
                : isLifeForce
                  ? 0.98
                  : isStarBeastReveal
                    ? 0.92
                    : isCompletion
                      ? 0.84
                  : 1) *
      (isMoonOrigin
        ? 0.82 + perspectiveMoonWeight * 0.2
        : isStarRiver
          ? 0.86 + perspectiveStarWeight * 0.2
          : isTimeResonance
            ? 0.86 + perspectiveTimeWeight * 0.18
            : 1) *
      (isMoonOrigin || isStarRiver || isTimeResonance
        ? 0.84 + perspectiveBackgroundDepth * 0.16
        : isPresenceStage
          ? 0.78 + perspectiveBackgroundDepth * 0.1
          : 1) *
      (0.78 + spatialContrast * 0.22),
    blending: AdditiveBlending,
    depthWrite: false,
  });
  const cosmicField = new Points(cosmicGeometry, cosmicMaterial);
  const cosmicPointMaterial = cosmicField.material as PointsMaterial;
  cosmicField.position.y = lifeUniverseAnchorOffsetY;
  cosmicField.position.z = -(spatialDepthScale - 0.78) * 0.18;
  // The universe is camera space, not a child of the manifested body. Body
  // posture may change between stages without rotating the star topology.
  scene.add(cosmicField);

  const mansionCoordinateVisualLayer =
    sceneProjection.mansionCoordinateVisualLayer;
  // Mansion Presence Signature is a renderer-only reading of the existing
  // birth-mansion index. It gives the shared skeleton, core and aura one
  // personal cadence without calculating identity or inventing any star.
  const birthMansionPresenceIndex =
    mansionCoordinateVisualLayer?.birthCoordinate.coordinateIndex ??
    sceneProjection.mansionCoordinateField?.birthCoordinateIndex ??
    0;
  const birthMansionPresencePhase =
    (birthMansionPresenceIndex / 28) * Math.PI * 2;
  const birthMansionQuarterSlot = birthMansionPresenceIndex % 7;
  const birthMansionPresenceBreathRate =
    0.27 + ((birthMansionPresenceIndex * 5) % 7) * 0.012;
  const birthMansionAuraCurl =
    Math.sin(birthMansionPresencePhase) * 0.42;
  const birthMansionAuraEnclosure =
    0.88 + Math.cos(birthMansionPresencePhase * 2) * 0.08;
  const mansionCoordinateGroup = new Group();
  let mansionHeavenOrderMaterial: LineBasicMaterial | null = null;
  let birthMansionBoneMaterial: LineBasicMaterial | null = null;
  let birthMansionGroupPointMaterial: PointsMaterial | null = null;
  let birthCoordinateAxisMaterial: LineBasicMaterial | null = null;
  let birthMansionPointMaterial: PointsMaterial | null = null;
  const seekingResponseMaterials: PointsMaterial[] = [];
  let coordinateBaseScaleX = 1;
  let coordinateBaseScaleY = 1;
  const coordinateFormationExpression =
    mansionCoordinateVisualLayer?.coordinateFormationExpression ?? null;
  // Launch has already delivered time. Genesis must receive the living core,
  // not restart it inside a rotating 28-mansion orbit.
  const retainMotherContinuityOrbit = false;
  // The same quiet 28-mansion field that answered the birth-time key remains
  // present across the route threshold. It carries no selected coordinate or
  // axis until the existing coordinate-reveal consumer reaches that phase.
  const retainEntranceMansionField = isContinuityPresenceStage;
  const motherContinuityOrbitPhase = 0;
  const continuityCoordinatePosition = (coordinateIndex: number) => {
    const angle =
      (coordinateIndex / 28) * Math.PI * 2 -
      Math.PI / 2 +
      motherContinuityOrbitPhase;
    return {
      x: Math.cos(angle) * 2.65,
      y: Math.sin(angle) * 1.32,
    };
  };
  if (
    mansionCoordinateVisualLayer !== null &&
    (mansionCoordinateVisualLayer.visibility !== "HIDDEN" ||
      retainMotherContinuityOrbit ||
      retainEntranceMansionField ||
      isLifeOriginStarMapReveal)
  ) {
    const birthCoordinateRevealed =
      mansionCoordinateVisualLayer.visibility ===
      "BIRTH_MANSION_COORDINATE_REVEALED";
    const birthCoordinateVisible =
      birthCoordinateRevealed ||
      retainMotherContinuityOrbit ||
      isLifeOriginStarMapReveal;
    const coordinateDepth = Math.abs(
      camera.position.z - mansionCoordinateVisualLayer.birthCoordinate.z,
    );
    const pixelsPerWorld =
      input.height /
      (2 * Math.tan((camera.fov * Math.PI) / 360) * coordinateDepth);
    coordinateBaseScaleX =
      Math.min(
        input.width * (isLifeOriginStarMapReveal ? 0.68 : 0.43),
        isLifeOriginStarMapReveal ? 310 : 168,
      ) /
      (2.65 * pixelsPerWorld);
    coordinateBaseScaleY =
      Math.min(
        input.width * (isLifeOriginStarMapReveal ? 0.28 : 0.19),
        isLifeOriginStarMapReveal ? 128 : 74,
      ) /
      (1.32 * pixelsPerWorld);
    const birthIndex =
      mansionCoordinateVisualLayer.birthCoordinate.coordinateIndex;
    const birthQuarterStart = Math.floor(birthIndex / 7) * 7;
    const birthQuarterEnd = birthQuarterStart + 6;
    const birthQuarterCoordinates =
      mansionCoordinateVisualLayer.coordinates.filter(
        (coordinate) =>
          coordinate.coordinateIndex >= birthQuarterStart &&
          coordinate.coordinateIndex <= birthQuarterEnd,
      );
    const birthQuarterCenter = birthQuarterCoordinates.reduce(
      (center, coordinate) => ({
        x: center.x + coordinate.x / birthQuarterCoordinates.length,
        y: center.y + coordinate.y / birthQuarterCoordinates.length,
      }),
      { x: 0, y: 0 },
    );
    const lifeOriginCoordinatePosition = (coordinateIndex: number) => {
      const coordinate =
        mansionCoordinateVisualLayer.coordinates[coordinateIndex]!;
      if (!isGenesisLifeOriginStarMapReveal) {
        return coordinate;
      }
      // The personal seven-mansion source remains made from the existing
      // coordinates, but is brought into one shared visual focus around the
      // life core. This is a camera-space emphasis, not a new star topology.
      const centeredX = coordinate.x - birthQuarterCenter.x;
      const centeredY = coordinate.y - birthQuarterCenter.y;
      // The seven existing source stars lean very slightly around the actual
      // birth star. The topology remains unchanged; the personal coordinate
      // now reads as the origin of this particular body's posture.
      const identityLean = (birthMansionQuarterSlot - 3) * 0.008;
      return {
        x: centeredX * 0.76 + centeredY * identityLean,
        y: centeredY * 0.76 - centeredX * identityLean + 0.08,
        z: coordinate.z,
      };
    };
    const keepBirthCoordinateInExistingField =
      coordinateFormationExpression?.phase === "SEEKING_TO_FOUND";
    const neutralCoordinates =
      isGenesisLifeOriginStarMapReveal
        ? mansionCoordinateVisualLayer.coordinates.filter(
            (coordinate) =>
              coordinate.coordinateIndex < birthQuarterStart ||
              coordinate.coordinateIndex > birthQuarterEnd,
          )
      : birthCoordinateVisible && !keepBirthCoordinateInExistingField
      ? mansionCoordinateVisualLayer.coordinates.filter(
          (coordinate) =>
            coordinate.coordinateIndex !==
            mansionCoordinateVisualLayer.birthCoordinate.coordinateIndex,
        )
      : mansionCoordinateVisualLayer.coordinates;
    const neutralPositions = new Float32Array(neutralCoordinates.length * 3);
    neutralCoordinates.forEach((coordinate, index) => {
      const offset = index * 3;
      const continuityPosition = retainMotherContinuityOrbit
        ? continuityCoordinatePosition(coordinate.coordinateIndex)
        : coordinate;
      neutralPositions[offset] = continuityPosition.x;
      neutralPositions[offset + 1] = continuityPosition.y;
      neutralPositions[offset + 2] = coordinate.z;
    });
    const neutralGeometry = new BufferGeometry();
    neutralGeometry.setAttribute(
      "position",
      new Float32BufferAttribute(neutralPositions, 3),
    );
    const mansionNeutralPointMaterial = new PointsMaterial({
      color: new Color(
        isLifeOriginStarMapReveal ? 0x9bc8d2 : 0xb9cbec,
      ),
      map: lifeOriginStarTexture,
      alphaTest: isLifeOriginStarMapReveal ? 0.018 : 0,
      size:
        mansionCoordinateVisualLayer.fieldExpression.neutralPointSize *
        (isLifeCoordinateStage
          ? 1.28
          : isLifeDirectionStage
            ? 1.08
            : isContinuityPresenceStage
              ? 1.18
              : isLifeOriginStarMapReveal
                ? 1.62
              : 1),
      sizeAttenuation: true,
      transparent: true,
      opacity: Math.min(
        0.78,
        mansionCoordinateVisualLayer.fieldExpression.neutralOpacity *
        (retainMotherContinuityOrbit ? 0.72 : 1) *
          (retainEntranceMansionField
            ? isMoonOrigin
              ? 0.46
              : isStarRiver
                ? 0.56
                : 0.66
            : isGenesisLifeOriginStarMapReveal
              ? 0.28
            : isLifeOriginStarMapReveal
              ? 0.72
            : 1) *
          (isLifeCoordinateStage
            ? 1.42
            : isHexagramImprint
              ? 0.66
              : isLifeForce
                ? 0.48
                : isLifeOriginStarMapReveal
                  ? 1.08
                : isPresenceStage
                  ? isCompletion
                    ? 0.24
                    : 0.34
                  : 1),
      ),
      blending: AdditiveBlending,
      depthWrite: false,
    });
    mansionCoordinateGroup.add(
      new Points(neutralGeometry, mansionNeutralPointMaterial),
    );

    if (isGenesisLifeOriginStarMapReveal) {
      // The user's source quarter is still made from the existing 28-mansion
      // coordinates. It receives a distinct breath and material so the eye
      // can recognize "these stars belong together" without inventing inner
      // stars, a new constellation system, or seven-star meridians.
      const birthQuarterCompanionCoordinates =
        birthQuarterCoordinates.filter(
          (coordinate) => coordinate.coordinateIndex !== birthIndex,
        );
      const birthQuarterPositions = new Float32Array(
        birthQuarterCompanionCoordinates.length * 3,
      );
      birthQuarterCompanionCoordinates.forEach((coordinate, index) => {
        const offset = index * 3;
        const focusedPosition = lifeOriginCoordinatePosition(
          coordinate.coordinateIndex,
        );
        birthQuarterPositions[offset] = focusedPosition.x;
        birthQuarterPositions[offset + 1] = focusedPosition.y;
        birthQuarterPositions[offset + 2] = focusedPosition.z;
      });
      const birthQuarterGeometry = new BufferGeometry();
      birthQuarterGeometry.setAttribute(
        "position",
        new Float32BufferAttribute(birthQuarterPositions, 3),
      );
      birthMansionGroupPointMaterial = new PointsMaterial({
        color: new Color(0xadd8de),
        map: lifeOriginStarTexture,
        alphaTest: 0.018,
        size:
          mansionCoordinateVisualLayer.fieldExpression.neutralPointSize * 1.82,
        sizeAttenuation: true,
        transparent: true,
        opacity: 0.16,
        blending: AdditiveBlending,
        depthWrite: false,
      });
      mansionCoordinateGroup.add(
        new Points(
          birthQuarterGeometry,
          birthMansionGroupPointMaterial,
        ),
      );
    }

    if (isLifeOriginStarMapReveal) {
      // The 28 points read as one ordered sky before the personal body is
      // noticed. Lines only connect the existing four groups of seven; they
      // never invent stars inside a mansion or pretend to be the inner
      // seven-star meridians.
      const heavenOrderPositions: number[] = [];
      for (let mansionGroupIndex = 0; mansionGroupIndex < 4; mansionGroupIndex += 1) {
        const groupStart = mansionGroupIndex * 7;
        for (let mansionSlot = 0; mansionSlot < 6; mansionSlot += 1) {
          const sourceCoordinate =
            mansionCoordinateVisualLayer.coordinates[groupStart + mansionSlot]!;
          const targetCoordinate =
            mansionCoordinateVisualLayer.coordinates[
              groupStart + mansionSlot + 1
            ]!;
          heavenOrderPositions.push(
            sourceCoordinate.x,
            sourceCoordinate.y,
            sourceCoordinate.z,
            targetCoordinate.x,
            targetCoordinate.y,
            targetCoordinate.z,
          );
        }
      }
      const heavenOrderGeometry = new BufferGeometry();
      heavenOrderGeometry.setAttribute(
        "position",
        new Float32BufferAttribute(heavenOrderPositions, 3),
      );
      mansionHeavenOrderMaterial = new LineBasicMaterial({
        color: new Color(0x8cb8c5),
        transparent: true,
        opacity: 0,
        blending: AdditiveBlending,
        depthWrite: false,
      });
      mansionCoordinateGroup.add(
        new LineSegments(
          heavenOrderGeometry,
          mansionHeavenOrderMaterial,
        ),
      );

      // Personal recognition is carried by stars that already belong to the
      // same seven-mansion quarter. The nearest existing coordinates answer
      // with the birth mansion; no decorative star or inner meridian is added.
      const birthBonePositions: number[] = [];
      const birthCoordinate =
        mansionCoordinateVisualLayer.coordinates[birthIndex]!;
      if (isGenesisLifeOriginStarMapReveal) {
        for (
          let sourceIndex = birthQuarterStart;
          sourceIndex < birthQuarterEnd;
          sourceIndex += 1
        ) {
          const source = lifeOriginCoordinatePosition(sourceIndex);
          const target = lifeOriginCoordinatePosition(sourceIndex + 1);
          birthBonePositions.push(
            source.x,
            source.y,
            source.z,
            target.x,
            target.y,
            target.z,
          );
        }
        // Two faint response ribs make the real birth star the perceptual
        // anchor of its existing seven-mansion source group. No inner star or
        // seven-star meridian is added.
        [birthIndex - 2, birthIndex + 2].forEach((responseIndex) => {
          if (
            responseIndex < birthQuarterStart ||
            responseIndex > birthQuarterEnd
          ) {
            return;
          }
          const source = lifeOriginCoordinatePosition(birthIndex);
          const target = lifeOriginCoordinatePosition(responseIndex);
          birthBonePositions.push(
            source.x,
            source.y,
            source.z,
            target.x,
            target.y,
            target.z,
          );
        });
      } else {
        [birthIndex - 1, birthIndex + 1].forEach((neighborIndex) => {
          if (
            neighborIndex < birthQuarterStart ||
            neighborIndex > birthQuarterEnd
          ) {
            return;
          }
          const neighbor =
            mansionCoordinateVisualLayer.coordinates[neighborIndex]!;
          birthBonePositions.push(
            neighbor.x,
            neighbor.y,
            neighbor.z,
            birthCoordinate.x,
            birthCoordinate.y,
            birthCoordinate.z,
          );
        });
      }
      if (birthBonePositions.length > 0) {
        const birthBoneGeometry = new BufferGeometry();
        birthBoneGeometry.setAttribute(
          "position",
          new Float32BufferAttribute(birthBonePositions, 3),
        );
        birthMansionBoneMaterial = new LineBasicMaterial({
          color: new Color(0xc5e7e8),
          transparent: true,
          opacity: 0,
          blending: AdditiveBlending,
          depthWrite: false,
        });
        mansionCoordinateGroup.add(
          new LineSegments(
            birthBoneGeometry,
            birthMansionBoneMaterial,
          ),
        );
      }
    }

    if (coordinateFormationExpression?.phase === "SEEKING_TO_FOUND") {
      const responseOffsets = [-10, -7, -4, -2, 2, 4, 7, 10] as const;
      responseOffsets.forEach((responseOffset) => {
        const responseIndex =
          (mansionCoordinateVisualLayer.birthCoordinate.coordinateIndex +
            responseOffset +
            mansionCoordinateVisualLayer.coordinates.length) %
          mansionCoordinateVisualLayer.coordinates.length;
        const responseCoordinate =
          mansionCoordinateVisualLayer.coordinates[responseIndex]!;
        const responseGeometry = new BufferGeometry();
        responseGeometry.setAttribute(
          "position",
          new Float32BufferAttribute(
            [
              responseCoordinate.x,
              responseCoordinate.y,
              responseCoordinate.z,
            ],
            3,
          ),
        );
        const responseMaterial = new PointsMaterial({
          color: new Color(0xdbe6f5),
          map: lifeOriginStarTexture,
          alphaTest: isLifeOriginStarMapReveal ? 0.018 : 0,
          size: 0.038,
          sizeAttenuation: true,
          transparent: true,
          opacity: 0,
          blending: AdditiveBlending,
          depthWrite: false,
        });
        seekingResponseMaterials.push(responseMaterial);
        mansionCoordinateGroup.add(
          new Points(responseGeometry, responseMaterial),
        );
      });
    }

    if (
      coordinateFormationExpression !== null &&
      (coordinateFormationExpression.phase === "SEEKING_TO_FOUND" ||
        coordinateFormationExpression.phase === "FOUND" ||
        retainMotherContinuityOrbit)
    ) {
      const birthPosition = mansionCoordinateVisualLayer.birthCoordinate;
      const continuityBirthPosition = retainMotherContinuityOrbit
        ? continuityCoordinatePosition(birthPosition.coordinateIndex)
        : lifeOriginCoordinatePosition(birthPosition.coordinateIndex);
      const birthAxisGeometry = new BufferGeometry();
      birthAxisGeometry.setAttribute(
        "position",
        new Float32BufferAttribute(
          [
            0,
            0,
            birthPosition.z,
            continuityBirthPosition.x,
            continuityBirthPosition.y,
            birthPosition.z,
          ],
          3,
        ),
      );
      birthCoordinateAxisMaterial = new LineBasicMaterial({
        color: new Color(
          isLifeOriginStarMapReveal ? 0xaadce4 : 0xd8c58e,
        ),
        transparent: true,
        opacity:
          isLifeOriginStarMapReveal
            ? 0
            : retainMotherContinuityOrbit
            ? 0.18
            : coordinateFormationExpression.phase === "FOUND"
            ? coordinateFormationExpression.birthAxisOpacity * 0.12
            : 0,
        blending: AdditiveBlending,
        depthWrite: false,
      });
      mansionCoordinateGroup.add(
        new Line(birthAxisGeometry, birthCoordinateAxisMaterial),
      );
    }

    if (birthCoordinateVisible) {
      const birthCoordinate = mansionCoordinateVisualLayer.birthCoordinate;
      const continuityBirthPosition = retainMotherContinuityOrbit
        ? continuityCoordinatePosition(birthCoordinate.coordinateIndex)
        : lifeOriginCoordinatePosition(birthCoordinate.coordinateIndex);
      const birthGeometry = new BufferGeometry();
      birthGeometry.setAttribute(
        "position",
        new Float32BufferAttribute(
          [
            continuityBirthPosition.x,
            continuityBirthPosition.y,
            birthCoordinate.z,
          ],
          3,
        ),
      );
      birthMansionPointMaterial = new PointsMaterial({
        color: new Color(
          isLifeOriginStarMapReveal ? 0xd9f2f2 : 0xe7d4a1,
        ),
        map: lifeOriginStarTexture,
        alphaTest: isLifeOriginStarMapReveal ? 0.018 : 0,
        size:
          mansionCoordinateVisualLayer.birthCoordinateExpression.pointSize *
          (isLifeOriginStarMapReveal ? 1.08 : 0.72),
        sizeAttenuation: true,
        transparent: true,
        opacity:
          isLifeOriginStarMapReveal
            ? mansionCoordinateVisualLayer.birthCoordinateExpression.opacity *
              0.84
            : retainMotherContinuityOrbit
            ? mansionCoordinateVisualLayer.birthCoordinateExpression.opacity * 0.82
            : coordinateFormationExpression?.phase === "SEEKING_TO_FOUND"
            ? 0
            : mansionCoordinateVisualLayer.birthCoordinateExpression.opacity,
        blending: AdditiveBlending,
        depthWrite: false,
      });
      mansionCoordinateGroup.add(
        new Points(birthGeometry, birthMansionPointMaterial),
      );
    }
    if (coordinateFormationExpression?.phase === "SEEKING_TO_FOUND") {
      mansionCoordinateGroup.rotation.z =
        coordinateFormationExpression.initialAngularOffsetRadians * 0.08;
      const quietInitialScale =
        1 +
        (coordinateFormationExpression.initialRadialScale - 1) * 0.12;
      mansionCoordinateGroup.scale.set(
        coordinateBaseScaleX * quietInitialScale,
        -coordinateBaseScaleY * quietInitialScale,
        1,
      );
    } else {
      mansionCoordinateGroup.scale.set(
        coordinateBaseScaleX,
        -coordinateBaseScaleY,
        1,
      );
    }
    root.add(mansionCoordinateGroup);
  }

  const directionFieldCalibration =
    sceneProjection.fourSymbolDirectionFieldVisualCalibration;
  const directionFieldExpression =
    directionFieldCalibration?.directionFieldExpression ?? null;
  const directionFieldGroup = new Group();
  let directionFieldMaterial: PointsMaterial | null = null;
  let directionFieldPositions: Float32Array | null = null;
  let directionFieldPositionAttribute: Float32BufferAttribute | null = null;
  let directionFieldParticleCount = 0;
  let directionOriginX = 0;
  let directionOriginY = 0;
  let directionOriginZ = -0.42;
  const directionAxisX = directionFieldExpression?.axisX ?? 0;
  const directionAxisY = directionFieldExpression?.axisY ?? 0;
  const directionEastGrowth = Math.max(0, directionAxisX);
  const directionWestConvergence = Math.max(0, -directionAxisX);
  const directionNorthDepth = Math.max(0, directionAxisY);
  const directionSouthExpansion = Math.max(0, -directionAxisY);
  let directionViewportScale = 1;
  let directionSourceReach = 0;
  let directionCoreBiasMaterial: MeshBasicMaterial | null = null;
  if (
    directionFieldCalibration !== null &&
    directionFieldCalibration.phase !== "HIDDEN" &&
    directionFieldExpression !== null
  ) {
    const axisX = directionFieldExpression.axisX;
    const axisY = directionFieldExpression.axisY;
    const perpendicularX = -axisY;
    const perpendicularY = axisX;
    const directionOrigin =
      mansionCoordinateVisualLayer?.birthCoordinate ?? null;
    directionOriginX =
      (directionOrigin?.x ?? 0) * coordinateBaseScaleX;
    directionOriginY =
      (directionOrigin?.y ?? 0) * -coordinateBaseScaleY;
    directionOriginZ = (directionOrigin?.z ?? -0.55) + 0.08;
    directionViewportScale =
      Math.abs(axisX) * coordinateBaseScaleX +
      Math.abs(axisY) * coordinateBaseScaleY;
    const directionViewportHalfHeight =
      Math.tan((camera.fov * Math.PI) / 360) * camera.position.z;
    const directionViewportHalfWidth =
      directionViewportHalfHeight * camera.aspect;
    const directionViewportCenterY = -lifeUniverseAnchorOffsetY;
    const directionOriginProjection =
      directionOriginX * axisX + directionOriginY * axisY;
    const directionViewportCenterProjection =
      directionViewportCenterY * axisY;
    const directionViewportHalfExtent =
      Math.abs(axisX) * directionViewportHalfWidth +
      Math.abs(axisY) * directionViewportHalfHeight;
    const directionBoundaryReach =
      directionViewportCenterProjection +
      directionViewportHalfExtent -
      directionOriginProjection -
      0.24;
    directionSourceReach = Math.max(
      directionFieldExpression.fieldReach * directionViewportScale * 1.08,
      directionBoundaryReach,
    );
    directionFieldParticleCount = directionFieldExpression.lineCount * 24;
    directionFieldPositions = new Float32Array(
      directionFieldParticleCount * 3,
    );
    for (let index = 0; index < directionFieldParticleCount; index += 1) {
      const progress =
        (((index * 37) % directionFieldParticleCount) + 0.5) /
        directionFieldParticleCount;
      const birthPassage = 0.32;
      const lane =
        Math.sin(index * 1.618 + progress * Math.PI * 2) * 0.68 +
        Math.cos(index * 0.731 - progress * Math.PI) * 0.32;
      const offset = index * 3;
      if (progress > birthPassage) {
        const sourceProgress =
          (progress - birthPassage) / (1 - birthPassage);
        const sourceEnvelope = Math.sin(sourceProgress * Math.PI * 0.5);
        const spread =
          sourceEnvelope *
          directionFieldExpression.parallelSpread *
          (0.48 +
            directionEastGrowth * 0.12 +
            directionSouthExpansion * 0.18 -
            directionWestConvergence * 0.12 -
            directionNorthDepth * 0.08);
        directionFieldPositions[offset] =
          directionOriginX +
          axisX * directionSourceReach * sourceProgress +
          perpendicularX * lane * spread;
        directionFieldPositions[offset + 1] =
          directionOriginY +
          axisY * directionSourceReach * sourceProgress +
          perpendicularY * lane * spread;
        directionFieldPositions[offset + 2] =
          directionOriginZ +
          Math.sin(index * 2.173 + sourceProgress * Math.PI * 1.4) *
            (0.12 + directionNorthDepth * 0.16) +
          sourceProgress * directionNorthDepth * 0.16;
      } else {
        const corePassage = progress / birthPassage;
        const coreEnvelope = Math.sin(corePassage * Math.PI);
        const coreSpread =
          coreEnvelope *
          directionFieldExpression.parallelSpread *
          0.14;
        directionFieldPositions[offset] =
          directionOriginX * corePassage +
          perpendicularX * lane * coreSpread;
        directionFieldPositions[offset + 1] =
          directionOriginY * corePassage +
          perpendicularY * lane * coreSpread;
        directionFieldPositions[offset + 2] =
          directionOriginZ * corePassage +
          Math.sin(index * 1.37) * coreEnvelope * 0.04;
      }
    }
    const geometry = new BufferGeometry();
    directionFieldPositionAttribute = new Float32BufferAttribute(
      directionFieldPositions,
      3,
    );
    geometry.setAttribute("position", directionFieldPositionAttribute);
    directionFieldMaterial = new PointsMaterial({
      color: new Color(0x9ebee4),
      size: isLifeForce ? 0.032 : 0.029,
      sizeAttenuation: true,
      transparent: true,
      opacity: 0,
      blending: AdditiveBlending,
      depthWrite: false,
    });
    directionFieldGroup.add(new Points(geometry, directionFieldMaterial));

    const directionCoreBias = new Mesh(
      new SphereGeometry(0.42, 18, 14),
      new MeshBasicMaterial({
        color: new Color(0xfff1cf),
        transparent: true,
        opacity: 0,
        blending: AdditiveBlending,
        depthWrite: false,
      }),
    );
    directionCoreBiasMaterial =
      directionCoreBias.material as MeshBasicMaterial;
    directionCoreBias.position.set(
      axisX * 0.34,
      axisY * 0.34,
      -0.08,
    );
    directionCoreBias.rotation.z = Math.atan2(axisY, axisX);
    directionCoreBias.scale.set(1.12, 0.28, 0.28);
    directionFieldGroup.add(directionCoreBias);
    root.add(directionFieldGroup);
  }

  const archetypeForceCalibration =
    sceneProjection.lifeArchetypeForceCondensationVisualCalibration;
  const forceCondensationExpression =
    archetypeForceCalibration?.forceCondensationExpression ?? null;
  const forceExpressionDensity =
    forceCondensationExpression?.density ?? 0;
  const forceExpressionRadialBias =
    forceCondensationExpression?.radialBias ?? 0;
  const forceExpressionAspectRatio =
    forceCondensationExpression?.formAspectRatio ?? 1;
  const forceExpressionFlowSpeed =
    forceCondensationExpression?.flowRotationSpeed ?? 0;
  const forceExpressionBreathingPeriod =
    forceCondensationExpression?.breathingPeriodSeconds ??
    LIFE_UNIVERSE_CORE_IDENTITY.breathPeriodSeconds;
  const forceExpressionBreathingAmplitude =
    forceCondensationExpression?.breathingAmplitude ?? 0;
  const forceExpressionAxisAngle =
    Math.atan2(directionAxisY, directionAxisX) +
    (forceCondensationExpression?.axisTiltRadians ?? 0);
  const forceExpressionAxisX = Math.cos(forceExpressionAxisAngle);
  const forceExpressionAxisY = Math.sin(forceExpressionAxisAngle);
  const forceExpressionPerpendicularX = -forceExpressionAxisY;
  const forceExpressionPerpendicularY = forceExpressionAxisX;

  const lifePresence = sceneProjection.lifePresence;
  const lifeStarCore = sceneProjection.lifeStarCore;
  const timeSequenceRecognition = sceneProjection.timeSequenceRecognition;
  const birthMansionIgnition = sceneProjection.birthMansionIgnition;
  const morphologicalFieldAlignment = sceneProjection.morphologicalFieldAlignment;
  const lifeForceInfusion = sceneProjection.lifeForceInfusion;
  const personalReveal = sceneProjection.personalReveal;
  const realityPressure = sceneProjection.realityPressure;
  const fieldAlignment =
    morphologicalFieldAlignment?.morphologicalFieldExpression ?? null;
  const fieldEnvelopeScale = fieldAlignment?.envelopeScale ?? 1;
  const fieldDirectionalFlow = fieldAlignment?.directionalFlow ?? 0;
  const fieldPostureBias = fieldAlignment?.postureBias ?? 0;
  const forceExpression = lifeForceInfusion?.lifeForceExpression ?? null;
  const forceCorePull = forceExpression?.corePull ?? 0;
  const forceAggregation = forceExpression?.aggregationStrength ?? 0;
  const forceStability = forceExpression?.stability ?? 0;
  const forceDirectionalBias = forceExpression?.directionalBias ?? 0;
  const revealExpression = personalReveal?.revealExpression ?? null;
  const revealOpacity = revealExpression?.revealOpacity ?? 0;
  const revealCoreConvergence = revealExpression?.coreConvergence ?? 0;
  const revealFieldIntegration = revealExpression?.fieldIntegration ?? 0;
  const pressureExpression = realityPressure?.pressureExpression ?? null;
  const pressureFieldCompression = pressureExpression?.fieldCompression ?? 0;
  const pressureBoundaryLoad = pressureExpression?.boundaryLoad ?? 0;
  const pressureCoreResistance = pressureExpression?.coreResistance ?? 0;
  const pressureFlowDeflection = pressureExpression?.flowDeflection ?? 0;
  const pressureTemporalWeight = pressureExpression?.temporalWeight ?? 0;
  const pressureStructureResponse = realityPressure?.presenceResponse.structureResponse ?? 0;
  const pressureCoreResponse = realityPressure?.presenceResponse.coreResponse ?? 0;
  const spineSegments = lifePresence.stellarSkeleton.spineSegments;
  const branchCount = lifePresence.stellarSkeleton.branchCount;
  const fieldPoseScale =
    lifePresence.morphologicalField.mode === "EXPANSIVE"
      ? 1.16
      : lifePresence.morphologicalField.mode === "CONVERGING"
        ? 0.92
        : lifePresence.morphologicalField.mode === "WRAPPED"
          ? 0.84
          : 1;
  const axisX = Math.cos(lifePresence.stellarSkeleton.axisAngle);
  const axisY = Math.sin(lifePresence.stellarSkeleton.axisAngle);
  const perpendicularX = -axisY;
  const perpendicularY = axisX;
  const pressureContactSign = pressureFlowDeflection >= 0 ? 1 : -1;
  const pressureContactAxisX = perpendicularX * pressureContactSign;
  const pressureContactAxisY = perpendicularY * pressureContactSign;
  const spinePositions = new Float32Array(spineSegments * 3);
  const nodePositions = new Float32Array((spineSegments + branchCount) * 3);
  const branchPositions = new Float32Array(branchCount * 12);
  const getSpinePoint = (progress: number): [number, number, number] => {
    const offset =
      (progress - 0.45) * lifePresence.stellarSkeleton.spineLength;
    const bend =
      Math.sin(progress * Math.PI) *
      (lifePresence.morphologicalField.bend +
        lifePresence.morphologicalField.postureBias * 0.5 +
        fieldPostureBias * 0.28 +
        (forceCorePull - 0.5) * 0.18);
    const depth =
      Math.sin(progress * Math.PI * 2) *
      lifePresence.morphologicalField.enclosure *
      0.08;
    return [
      axisX * offset + perpendicularX * bend,
      axisY * offset + perpendicularY * bend,
      depth,
    ];
  };

  for (let index = 0; index < spineSegments; index += 1) {
    const progress = index / Math.max(1, spineSegments - 1);
    const point = getSpinePoint(progress);
    const offset = index * 3;
    spinePositions[offset] = point[0];
    spinePositions[offset + 1] = point[1];
    spinePositions[offset + 2] = point[2];
    nodePositions[offset] = point[0];
    nodePositions[offset + 1] = point[1];
    nodePositions[offset + 2] = point[2];
  }

  for (let index = 0; index < branchCount; index += 1) {
    const originIndex =
      Math.floor(
        index * lifePresence.morphologicalField.nodeDistributionBias,
      ) % Math.max(1, spineSegments - 1);
    const originOffset = originIndex * 3;
    const origin: [number, number, number] = [
      spinePositions[originOffset],
      spinePositions[originOffset + 1],
      spinePositions[originOffset + 2],
    ];
    const side = index % 2 === 0 ? 1 : -1;
    const branchLength =
      lifePresence.stellarSkeleton.branchSpread *
      fieldPoseScale *
      (isPresenceStage
        ? 0.7 - perspectiveBodyCohesion * 0.12
        : 1) *
      (1 + lifePresence.morphologicalField.spatialContraction * 0.32) *
      (isSymbolReveal ? 1 + perspectiveMorphologicalTension * 0.14 : 1) *
      (0.74 + (index % 3) * 0.12);
    const branchCurl =
      (lifePresence.morphologicalField.bend +
        lifePresence.morphologicalField.postureBias * 0.5 +
        fieldPostureBias * 0.22 +
        (forceDirectionalBias + forceCorePull - 0.5) * 0.12) *
      (0.35 + index * 0.06);
    const mid: [number, number, number] = [
      origin[0] + perpendicularX * side * branchLength * 0.42 + axisX * branchCurl,
      origin[1] + perpendicularY * side * branchLength * 0.42 + axisY * branchCurl,
      origin[2] + (random() - 0.5) * 0.18,
    ];
    const tip: [number, number, number] = [
      origin[0] + perpendicularX * side * branchLength + axisX * branchCurl * 1.8,
      origin[1] + perpendicularY * side * branchLength + axisY * branchCurl * 1.8,
      origin[2] + (random() - 0.5) * 0.3,
    ];
    const branchOffset = index * 12;
    branchPositions.set([...origin, ...mid, ...mid, ...tip], branchOffset);
    const nodeOffset = (spineSegments + index) * 3;
    nodePositions[nodeOffset] = tip[0];
    nodePositions[nodeOffset + 1] = tip[1];
    nodePositions[nodeOffset + 2] = tip[2];
  }

  if (isPresenceStage) {
    let minX = Number.POSITIVE_INFINITY;
    let maxX = Number.NEGATIVE_INFINITY;
    let minY = Number.POSITIVE_INFINITY;
    let maxY = Number.NEGATIVE_INFINITY;
    for (let offset = 0; offset < nodePositions.length; offset += 3) {
      minX = Math.min(minX, nodePositions[offset]);
      maxX = Math.max(maxX, nodePositions[offset]);
      minY = Math.min(minY, nodePositions[offset + 1]);
      maxY = Math.max(maxY, nodePositions[offset + 1]);
    }
    const presenceCenterX = (minX + maxX) * 0.5;
    const presenceCenterY = (minY + maxY) * 0.5;
    [spinePositions, nodePositions, branchPositions].forEach((positions) => {
      for (let offset = 0; offset < positions.length; offset += 3) {
        positions[offset] -= presenceCenterX;
        positions[offset + 1] -= presenceCenterY;
      }
    });
  }

  // The presence is not swapped in as a finished constellation. Keep one
  // immutable body plan, then let the reveal stage grow that plan outward
  // from the same Life Core that carried time, coordinate, direction and
  // force. Completion starts from the already formed plan.
  const finalSpinePositions = spinePositions.slice();
  const finalNodePositions = nodePositions.slice();
  const finalBranchPositions = branchPositions.slice();
  let presenceCoreSpineIndex = 0;
  let presenceCoreSpineDistance = Number.POSITIVE_INFINITY;
  for (let index = 0; index < spineSegments; index += 1) {
    const offset = index * 3;
    const distance =
      finalSpinePositions[offset] * finalSpinePositions[offset] +
      finalSpinePositions[offset + 1] * finalSpinePositions[offset + 1];
    if (distance < presenceCoreSpineDistance) {
      presenceCoreSpineDistance = distance;
      presenceCoreSpineIndex = index;
    }
  }
  const presenceSpineReach = Math.max(
    1,
    presenceCoreSpineIndex,
    spineSegments - 1 - presenceCoreSpineIndex,
  );
  if (isStarBeastReveal) {
    spinePositions.fill(0);
    nodePositions.fill(0);
    branchPositions.fill(0);
  }

  const spineGeometry = new BufferGeometry();
  const spinePositionAttribute = new Float32BufferAttribute(
    spinePositions,
    3,
  );
  spineGeometry.setAttribute(
    "position",
    spinePositionAttribute,
  );
  const branchGeometry = new BufferGeometry();
  const branchPositionAttribute = new Float32BufferAttribute(
    branchPositions,
    3,
  );
  branchGeometry.setAttribute(
    "position",
    branchPositionAttribute,
  );
  const nodeGeometry = new BufferGeometry();
  const nodePositionAttribute = new Float32BufferAttribute(
    nodePositions,
    3,
  );
  nodeGeometry.setAttribute(
    "position",
    nodePositionAttribute,
  );
  const anchorColor = isLifeOriginStarMapReveal
    ? new Color(0xb8e0e3)
    : new Color().setHSL(
        sceneProjection.lifeCore.hue,
        0.72,
        0.76,
      );
  const structureOpacityScale = isMoonOrigin
    ? 0.06
    : isStarRiver
      ? 1.16
      : isTimeResonance
        ? 0.94
        : isSymbolReveal
          ? 1.24
          : isHexagramImprint
            ? 1.08
            : isLifeForce
              ? 1.14
              : isStarBeastReveal
                ? 1.38
              : isCompletion
                  ? 1.16
              : 0.94;
  const distanceStructureScale =
    (0.86 + spatialContrast * 0.14) * (0.94 + spatialEdgeDefinition * 0.06);
  const perspectiveStructureWeight = isStarRiver
    ? perspectiveStarWeight
    : isTimeResonance
      ? perspectiveTimeWeight
      : 1;
  const formationContinuityScale =
    0.96 + perspectiveFormationContinuity * 0.04;
  const subjectForegroundScale = isPresenceStage
    ? 0.96 + perspectiveSubjectForeground * 0.12 +
      (recognitionSubjectWeight - 1) * 0.24
    : 1;
  const symbolicFieldScale = isSymbolReveal ? 1.08 + realizationProgress * 0.12 : 1;
  const changeImprintScale = isHexagramImprint ? 1.02 + realizationProgress * 0.06 : 1;
  const lifeForceScale = isLifeForce ? 1.02 + realizationProgress * 0.1 : 1;
  const presenceScale = isStarBeastReveal
    ? 0.36 + spatialApproachProgress * 0.14
    : isCompletion
      ? 0.52
      : isContinuityPresenceStage
        ? 0.34
        : 1;
  const spineOpacity =
    sceneProjection.mansionStructure.lineOpacity *
    structureOpacityScale *
    perspectiveStructureWeight *
    formationContinuityScale *
    subjectForegroundScale *
    distanceStructureScale *
    (1 + perspectiveBodyCohesion * 0.14) *
    (1 + perspectiveSubjectAxisStrength * 0.3) *
    (isPresenceStage ? 1 + (recognitionSubjectWeight - 1) * 0.34 : 1) *
    (0.82 + revealOpacity * 0.18);
  const branchOpacity =
    sceneProjection.mansionStructure.lineOpacity *
    structureOpacityScale *
    perspectiveStructureWeight *
    formationContinuityScale *
    subjectForegroundScale *
    distanceStructureScale *
    (1 + perspectiveBodyCohesion * 0.14) *
    (isPresenceStage ? 1 + (recognitionSubjectWeight - 1) * 0.26 : 1) *
    (0.82 + perspectiveBodyCohesion * 0.18) *
    (0.68 + revealOpacity * 0.2);
  const spineLine = new Line(
    spineGeometry,
    new LineBasicMaterial({
      color: anchorColor,
      transparent: true,
      opacity: isPresenceStage
        ? Math.min(spineOpacity, isCompletion ? 0.055 : 0.065)
        : spineOpacity,
      blending: AdditiveBlending,
    }),
  );
  const spineMaterial = spineLine.material as LineBasicMaterial;
  const spineBaseOpacity = spineMaterial.opacity;
  const branchLines = new LineSegments(
    branchGeometry,
    new LineBasicMaterial({
      color: anchorColor,
      transparent: true,
      opacity: isPresenceStage
        ? Math.min(branchOpacity, isCompletion ? 0.018 : 0.026)
        : branchOpacity,
      blending: AdditiveBlending,
    }),
  );
  const branchMaterial = branchLines.material as LineBasicMaterial;
  const branchBaseOpacity = branchMaterial.opacity;
  spineLine.visible = !isContinuityPresenceStage;
  branchLines.visible = !isContinuityPresenceStage;
  const structurePoints = new Points(
    nodeGeometry,
    new PointsMaterial({
      color: anchorColor,
      map: lifeOriginStarTexture,
      alphaTest: isLifeOriginStarMapReveal ? 0.018 : 0,
      size:
        lifePresence.stellarSkeleton.nodeScale *
        (0.96 + spatialEdgeDefinition * 0.08) *
        (isPresenceStage ? 0.92 : 1),
      transparent: true,
      opacity:
        structureOpacityScale *
        perspectiveStructureWeight *
        formationContinuityScale *
        subjectForegroundScale *
        distanceStructureScale *
        (1 + perspectiveBodyCohesion * 0.14) *
        (isPresenceStage ? 1 + (recognitionSubjectWeight - 1) * 0.3 : 1) *
        (0.7 + revealOpacity * 0.16),
      blending: AdditiveBlending,
      depthWrite: false,
    }),
  );
  const structurePointMaterial = structurePoints.material as PointsMaterial;
  const bodyFieldSpineParticleCount = Math.max(104, spineSegments * 14);
  const bodyFieldBranchParticleCount = Math.max(84, branchCount * 12);
  const bodyFieldParticleCount =
    bodyFieldSpineParticleCount + bodyFieldBranchParticleCount;
  const bodyFieldPositions = new Float32Array(bodyFieldParticleCount * 3);
  const bodyFieldEmergence = new Float32Array(bodyFieldParticleCount);
  const bodyFieldWidth =
    (0.07 + lifePresence.morphologicalField.enclosure * 0.1) *
    (0.78 + perspectiveBodyCohesion * 0.92) *
    (isPresenceStage ? 1 + (recognitionSubjectWeight - 1) * 0.8 : 1) *
    (isPresenceStage ? 1.55 : 1);
  for (let index = 0; index < bodyFieldSpineParticleCount; index += 1) {
    const progress =
      (index + 0.35 + random() * 0.3) / bodyFieldSpineParticleCount;
    const scaledIndex = progress * Math.max(1, spineSegments - 1);
    const sourceIndex = Math.min(
      spineSegments - 1,
      Math.floor(scaledIndex),
    );
    const targetIndex = Math.min(spineSegments - 1, sourceIndex + 1);
    const interpolation = scaledIndex - sourceIndex;
    const sourceOffset = sourceIndex * 3;
    const targetOffset = targetIndex * 3;
    const positionOffset = index * 3;
    const rawLateral = random() * 2 - 1;
    const lateral =
      Math.sign(rawLateral) *
      Math.pow(Math.abs(rawLateral), 1.55) *
      bodyFieldWidth *
      (0.86 + Math.sin(progress * Math.PI) * 0.34);
    const axialNoise = (random() * 2 - 1) * bodyFieldWidth * 0.24;
    bodyFieldPositions[positionOffset] =
      finalSpinePositions[sourceOffset] +
      (finalSpinePositions[targetOffset] -
        finalSpinePositions[sourceOffset]) *
        interpolation +
      perpendicularX * lateral +
      axisX * axialNoise;
    bodyFieldPositions[positionOffset + 1] =
      finalSpinePositions[sourceOffset + 1] +
      (finalSpinePositions[targetOffset + 1] -
        finalSpinePositions[sourceOffset + 1]) *
        interpolation +
      perpendicularY * lateral +
      axisY * axialNoise;
    bodyFieldPositions[positionOffset + 2] =
      finalSpinePositions[sourceOffset + 2] +
      (finalSpinePositions[targetOffset + 2] -
        finalSpinePositions[sourceOffset + 2]) *
        interpolation +
      (random() * 2 - 1) * (0.045 + bodyFieldWidth * 0.28);
    bodyFieldEmergence[index] =
      0.04 +
      Math.abs(progress - 0.5) * 0.46 +
      random() * 0.12;
  }
  for (let index = 0; index < bodyFieldBranchParticleCount; index += 1) {
    const particleIndex = bodyFieldSpineParticleCount + index;
    const positionOffset = particleIndex * 3;
    const branchIndex = index % Math.max(1, branchCount);
    const branchOffset = branchIndex * 12;
    const branchProgress =
      0.12 +
      ((Math.floor(index / Math.max(1, branchCount)) + random() * 0.62) /
        Math.max(
          1,
          Math.ceil(bodyFieldBranchParticleCount / Math.max(1, branchCount)),
        )) *
        0.82;
    const firstSegment = branchProgress <= 0.5;
    const segmentProgress = firstSegment
      ? branchProgress * 2
      : (branchProgress - 0.5) * 2;
    const sourceOffset = branchOffset + (firstSegment ? 0 : 6);
    const targetOffset = branchOffset + (firstSegment ? 3 : 9);
    const branchLateral =
      (random() * 2 - 1) *
      bodyFieldWidth *
      (0.28 + Math.sin(branchProgress * Math.PI) * 0.42);
    bodyFieldPositions[positionOffset] =
      finalBranchPositions[sourceOffset] +
      (finalBranchPositions[targetOffset] -
        finalBranchPositions[sourceOffset]) *
        segmentProgress +
      perpendicularX * branchLateral;
    bodyFieldPositions[positionOffset + 1] =
      finalBranchPositions[sourceOffset + 1] +
      (finalBranchPositions[targetOffset + 1] -
        finalBranchPositions[sourceOffset + 1]) *
        segmentProgress +
      perpendicularY * branchLateral;
    bodyFieldPositions[positionOffset + 2] =
      finalBranchPositions[sourceOffset + 2] +
      (finalBranchPositions[targetOffset + 2] -
        finalBranchPositions[sourceOffset + 2]) *
        segmentProgress +
      (random() * 2 - 1) * (0.035 + bodyFieldWidth * 0.2);
    bodyFieldEmergence[particleIndex] =
      0.36 +
      branchProgress * 0.28 +
      (branchIndex / Math.max(1, branchCount)) * 0.08 +
      random() * 0.08;
  }
  // Recognition is encoded inside the existing body, never as a badge or a
  // second source. The birth coordinate selects one quiet density memory,
  // direction shifts the luminous weight, and force keeps its own axial bias.
  let bodyAxisMinimum = Number.POSITIVE_INFINITY;
  let bodyAxisMaximum = Number.NEGATIVE_INFINITY;
  let bodyDirectionExtent = 0.001;
  for (let index = 0; index < bodyFieldParticleCount; index += 1) {
    const positionOffset = index * 3;
    const positionX = bodyFieldPositions[positionOffset];
    const positionY = bodyFieldPositions[positionOffset + 1];
    const bodyAxisPosition = positionX * axisX + positionY * axisY;
    const directionPosition =
      positionX * directionAxisX + positionY * directionAxisY;
    bodyAxisMinimum = Math.min(bodyAxisMinimum, bodyAxisPosition);
    bodyAxisMaximum = Math.max(bodyAxisMaximum, bodyAxisPosition);
    bodyDirectionExtent = Math.max(
      bodyDirectionExtent,
      Math.abs(directionPosition),
    );
  }
  const bodyAxisRange = Math.max(0.001, bodyAxisMaximum - bodyAxisMinimum);
  const birthCoordinateProgress =
    (mansionCoordinateVisualLayer?.birthCoordinate.coordinateIndex ?? 13) /
    27;
  const birthDensityAxis =
    bodyAxisMinimum + bodyAxisRange * birthCoordinateProgress;
  const bodyFieldColors = new Float32Array(bodyFieldParticleCount * 3);
  const bodyIdentityColor = new Color();
  const bodyBirthMemoryColor = new Color(
    isLifeOriginStarMapReveal ? 0xd7eef0 : 0xffe8b8,
  );
  for (let index = 0; index < bodyFieldParticleCount; index += 1) {
    const positionOffset = index * 3;
    const positionX = bodyFieldPositions[positionOffset];
    const positionY = bodyFieldPositions[positionOffset + 1];
    const bodyAxisPosition = positionX * axisX + positionY * axisY;
    const directionPosition =
      positionX * directionAxisX + positionY * directionAxisY;
    const directionAffinity = Math.min(
      1,
      Math.max(
        0,
        0.5 + directionPosition / (bodyDirectionExtent * 2),
      ),
    );
    const birthDistance =
      (bodyAxisPosition - birthDensityAxis) / (bodyAxisRange * 0.18);
    const birthMemory = Math.exp(-birthDistance * birthDistance);
    const forceAxisPosition =
      positionX * forceExpressionAxisX +
      positionY * forceExpressionAxisY;
    const forceAffinity = Math.min(
      1,
      Math.abs(forceAxisPosition) / Math.max(0.001, bodyAxisRange * 0.6),
    );
    const identityLuminance = Math.min(
      1,
      0.48 +
        directionAffinity * 0.2 +
        birthMemory * 0.2 +
        forceAffinity * (0.05 + forceExpressionDensity * 0.04),
    );
    bodyIdentityColor
      .copy(anchorColor)
      .multiplyScalar(identityLuminance)
      .lerp(
        bodyBirthMemoryColor,
        birthMemory * (0.08 + forceAggregation * 0.04),
      );
    bodyFieldColors[positionOffset] = bodyIdentityColor.r;
    bodyFieldColors[positionOffset + 1] = bodyIdentityColor.g;
    bodyFieldColors[positionOffset + 2] = bodyIdentityColor.b;
  }
  const finalBodyFieldPositions = bodyFieldPositions.slice();
  const applyBodyFieldReveal = (
    revealProgress: number,
    rhythmScale = 1,
  ) => {
    const clampedReveal = Math.min(1, Math.max(0, revealProgress));
    for (let index = 0; index < bodyFieldParticleCount; index += 1) {
      const positionOffset = index * 3;
      const emergence = bodyFieldEmergence[index];
      const localRevealRaw = Math.min(
        1,
        Math.max(
          0,
          (clampedReveal - emergence) /
            Math.max(0.22, 0.58 - emergence * 0.34),
        ),
      );
      const localReveal =
        localRevealRaw *
        localRevealRaw *
        (3 - 2 * localRevealRaw);
      if (localReveal <= 0.002) {
        bodyFieldPositions[positionOffset] = 0;
        bodyFieldPositions[positionOffset + 1] = 0;
        bodyFieldPositions[positionOffset + 2] = 100;
        continue;
      }
      const finalX = finalBodyFieldPositions[positionOffset];
      const finalY = finalBodyFieldPositions[positionOffset + 1];
      const finalZ = finalBodyFieldPositions[positionOffset + 2];
      const forceAxisPosition =
        finalX * forceExpressionAxisX + finalY * forceExpressionAxisY;
      const forceLateralPosition =
        finalX * forceExpressionPerpendicularX +
        finalY * forceExpressionPerpendicularY;
      const revealedAxis =
        forceAxisPosition * localReveal * rhythmScale;
      const revealedLateral =
        forceLateralPosition *
        localReveal *
        (2 - Math.min(1.08, rhythmScale));
      bodyFieldPositions[positionOffset] =
        forceExpressionAxisX * revealedAxis +
        forceExpressionPerpendicularX * revealedLateral;
      bodyFieldPositions[positionOffset + 1] =
        forceExpressionAxisY * revealedAxis +
        forceExpressionPerpendicularY * revealedLateral;
      bodyFieldPositions[positionOffset + 2] =
        finalZ * localReveal * (0.9 + rhythmScale * 0.1);
    }
  };
  const initialBodyReveal = isSymbolReveal
    ? 0.28
    : isHexagramImprint
      ? 0.5
      : isLifeForce
        ? 0.65
        : isStarBeastReveal
          ? 0.82
          : isCompletion
            ? 1
            : 0;
  if (
    isSymbolReveal ||
    isHexagramImprint ||
    isLifeForce ||
    isStarBeastReveal
  ) {
    applyBodyFieldReveal(initialBodyReveal);
  }
  const bodyFieldGeometry = new BufferGeometry();
  const bodyFieldPositionAttribute = new Float32BufferAttribute(
    bodyFieldPositions,
    3,
  );
  bodyFieldGeometry.setAttribute(
    "position",
    bodyFieldPositionAttribute,
  );
  bodyFieldGeometry.setAttribute(
    "color",
    new Float32BufferAttribute(bodyFieldColors, 3),
  );
  const bodyFieldMaterial = new PointsMaterial({
    color: new Color(0xffffff),
    vertexColors: true,
    map: lifeOriginStarTexture,
    alphaTest: isLifeOriginStarMapReveal ? 0.014 : 0,
    size:
      lifePresence.stellarSkeleton.nodeScale *
      (0.5 + (isPresenceStage ? (recognitionSubjectWeight - 1) * 0.16 : 0)) *
      (isCompletion ? 0.92 : 1),
    transparent: true,
    opacity: isSymbolReveal
      ? 0.07
      : isHexagramImprint
        ? 0.1
        : isLifeForce
          ? 0.15
          : isPresenceStage
            ? 0.22 + perspectiveBodyCohesion * 0.3 +
              (recognitionSubjectWeight - 1) * 0.18
            : 0,
    blending: AdditiveBlending,
    depthWrite: false,
  });
  const bodyFieldBaseSize = bodyFieldMaterial.size;
  const bodyField = new Points(bodyFieldGeometry, bodyFieldMaterial);
  bodyField.visible =
    isSymbolReveal ||
    isHexagramImprint ||
    isLifeForce ||
    isPresenceStage;
  // Ink-Wash Life Aura uses the same immutable spine and force direction as
  // the body field. It is a low-frequency density envelope around the life,
  // not a new beast, outline asset, or identity source.
  const lifeAuraParticleCount = isPresenceStage ? 168 : 0;
  const lifeAuraPositions = new Float32Array(lifeAuraParticleCount * 3);
  const lifeAuraSpineOrigins = new Float32Array(lifeAuraParticleCount * 3);
  const lifeAuraLateralOffsets = new Float32Array(lifeAuraParticleCount);
  const lifeAuraAxialOffsets = new Float32Array(lifeAuraParticleCount);
  const lifeAuraPhases = new Float32Array(lifeAuraParticleCount);
  const lifeAuraColors = new Float32Array(lifeAuraParticleCount * 3);
  const lifeAuraDeepWaterColor = new Color(0x315b64);
  const lifeAuraLivingJadeColor = new Color(0x8fbfc0);
  const lifeAuraColor = new Color();
  for (let index = 0; index < lifeAuraParticleCount; index += 1) {
    const progress =
      (index + 0.28 + random() * 0.44) /
      Math.max(1, lifeAuraParticleCount);
    const scaledIndex = progress * Math.max(1, spineSegments - 1);
    const sourceIndex = Math.min(
      spineSegments - 1,
      Math.floor(scaledIndex),
    );
    const targetIndex = Math.min(spineSegments - 1, sourceIndex + 1);
    const interpolation = scaledIndex - sourceIndex;
    const sourceOffset = sourceIndex * 3;
    const targetOffset = targetIndex * 3;
    const positionOffset = index * 3;
    const spineX =
      finalSpinePositions[sourceOffset] +
      (finalSpinePositions[targetOffset] -
        finalSpinePositions[sourceOffset]) *
        interpolation;
    const spineY =
      finalSpinePositions[sourceOffset + 1] +
      (finalSpinePositions[targetOffset + 1] -
        finalSpinePositions[sourceOffset + 1]) *
        interpolation;
    const spineZ =
      finalSpinePositions[sourceOffset + 2] +
      (finalSpinePositions[targetOffset + 2] -
        finalSpinePositions[sourceOffset + 2]) *
        interpolation;
    const signedWash = random() * 2 - 1;
    const identityWash =
      Math.sin(
        progress * Math.PI * 2 +
          birthMansionPresencePhase +
          signedWash * 0.48,
      ) * birthMansionAuraCurl;
    const lateralOffset =
      Math.sign(signedWash) *
      Math.pow(Math.abs(signedWash), 0.74) *
      bodyFieldWidth *
      (1.95 + Math.sin(progress * Math.PI) * 1.45) *
      birthMansionAuraEnclosure +
      identityWash * bodyFieldWidth * 0.34;
    const axialOffset =
      (random() * 2 - 1) *
      bodyFieldWidth *
        (0.36 + Math.sin(progress * Math.PI) * 0.22) +
      Math.cos(progress * Math.PI * 3 + birthMansionPresencePhase) *
        bodyFieldWidth *
        0.08;
    const depthOffset =
      (random() * 2 - 1) *
      (0.08 + bodyFieldWidth * 0.44);
    lifeAuraSpineOrigins[positionOffset] = spineX;
    lifeAuraSpineOrigins[positionOffset + 1] = spineY;
    lifeAuraSpineOrigins[positionOffset + 2] = spineZ + depthOffset;
    lifeAuraLateralOffsets[index] = lateralOffset;
    lifeAuraAxialOffsets[index] = axialOffset;
    lifeAuraPhases[index] =
      random() * Math.PI * 2 +
      progress * Math.PI * 3 +
      birthMansionPresencePhase;
    lifeAuraPositions[positionOffset] =
      spineX + perpendicularX * lateralOffset + axisX * axialOffset;
    lifeAuraPositions[positionOffset + 1] =
      spineY + perpendicularY * lateralOffset + axisY * axialOffset;
    lifeAuraPositions[positionOffset + 2] = spineZ + depthOffset;

    const birthDistance =
      ((spineX * axisX + spineY * axisY) - birthDensityAxis) /
      (bodyAxisRange * 0.24);
    const birthAffinity = Math.exp(-birthDistance * birthDistance);
    lifeAuraColor
      .copy(lifeAuraDeepWaterColor)
      .lerp(lifeAuraLivingJadeColor, 0.18 + birthAffinity * 0.34)
      .multiplyScalar(0.62 + random() * 0.22);
    lifeAuraColors[positionOffset] = lifeAuraColor.r;
    lifeAuraColors[positionOffset + 1] = lifeAuraColor.g;
    lifeAuraColors[positionOffset + 2] = lifeAuraColor.b;
  }
  const lifeAuraGeometry = new BufferGeometry();
  const lifeAuraPositionAttribute = new Float32BufferAttribute(
    lifeAuraPositions,
    3,
  );
  lifeAuraGeometry.setAttribute("position", lifeAuraPositionAttribute);
  lifeAuraGeometry.setAttribute(
    "color",
    new Float32BufferAttribute(lifeAuraColors, 3),
  );
  const lifeAuraMaterial = new PointsMaterial({
    color: new Color(0xffffff),
    vertexColors: true,
    map: inkWashLifeAuraTexture,
    alphaTest: 0.004,
    size: lifePresence.stellarSkeleton.nodeScale * 2.7,
    sizeAttenuation: true,
    transparent: true,
    opacity: 0,
    blending: NormalBlending,
    depthWrite: false,
  });
  const lifeAuraBaseSize = lifeAuraMaterial.size;
  const lifeAura = new Points(lifeAuraGeometry, lifeAuraMaterial);
  lifeAura.visible = isPresenceStage;
  const pressureTracePointCount = 5;
  const pressureTracePositions = new Float32Array(pressureTracePointCount * 3);
  const pressureTraceGeometry = new BufferGeometry();
  const pressureTracePositionAttribute = new Float32BufferAttribute(
    pressureTracePositions,
    3,
  );
  pressureTraceGeometry.setAttribute("position", pressureTracePositionAttribute);
  const pressureTraceMaterial = new PointsMaterial({
    color: new Color(0xf2d79b),
    map: lifeOriginStarTexture,
    alphaTest: isLifeOriginStarMapReveal ? 0.018 : 0,
    size: lifePresence.stellarSkeleton.nodeScale * 0.9,
    transparent: true,
    opacity: 0,
    blending: AdditiveBlending,
    depthWrite: false,
  });
  const pressureTrace = new Points(
    pressureTraceGeometry,
    pressureTraceMaterial,
  );
  pressureTrace.visible = pressureExpression !== null && isPresenceStage;
  const structureGroup = new Group();
  structureGroup.scale.setScalar(
    sceneProjection.formField.boundaryScale *
      fieldPoseScale *
      (1 + lifePresence.morphologicalField.spatialContraction * 0.22) *
      (1 + (fieldEnvelopeScale - 1) * 0.32) *
      (1 + (forceAggregation - 0.5) * 0.18) *
      (1 + revealCoreConvergence * 0.1) *
      symbolicFieldScale *
      changeImprintScale *
      lifeForceScale *
      presenceScale *
      formationContinuityScale *
      subjectForegroundScale *
      (1 + perspectiveBodyCohesion * 0.08) *
      (0.94 + spatialEdgeDefinition * 0.06) *
      (0.98 + spatialPresenceCarry * 0.04) *
      (isPresenceStage ? 1 + (recognitionSubjectWeight - 1) * 0.55 : 1) *
      1.45,
  );
  structureGroup.rotation.z =
    lifePresence.morphologicalField.bend * 0.12 +
    lifePresence.morphologicalField.postureBias * 0.08 +
    lifePresence.morphologicalField.flowDirection * 0.04;
  structureGroup.rotation.z += fieldDirectionalFlow * 0.03 + forceDirectionalBias * 0.04;
  structureGroup.rotation.z +=
    (isSymbolReveal ? perspectiveLifeAxisStrength * 0.035 : 0) +
    (isLifeForce ? perspectiveInnerMotionDifference * 0.02 : 0) +
    (isPresenceStage ? perspectiveSubjectAxisStrength * 0.04 : 0);
  structureGroup.position.z = isPresenceStage
    ? 0.08 + perspectiveSubjectForeground * 0.12 +
      (recognitionSubjectWeight - 1) * 0.08 +
      spatialFocusStrength * 0.04
    : (spatialFocusStrength - 0.5) * 0.03;
  const structureGroupRestingX = structureGroup.position.x;
  const structureGroupRestingY = structureGroup.position.y;
  const structureGroupRestingDepth = structureGroup.position.z;
  structureGroup.rotation.x = isSymbolReveal
    ? fieldDirectionalFlow * 0.06
    : isHexagramImprint
      ? Math.sin(realizationProgress * Math.PI) * 0.035
      : isLifeForce
        ? forceDirectionalBias * 0.08
        : isStarBeastReveal
          ? lifePresence.morphologicalField.flowDirection * 0.025
          : isCompletion
            ? lifePresence.morphologicalField.flowDirection * 0.012
        : 0;
  structureGroup.add(
    lifeAura,
    spineLine,
    branchLines,
    structurePoints,
    bodyField,
    pressureTrace,
  );
  // At the Genesis threshold, carry only the luminous joints of the same
  // stellar skeleton. Lines and animal outline remain absent until the later
  // manifestation stages earn them.
  spineLine.visible = isPresenceStage;
  branchLines.visible = isPresenceStage;
  structurePoints.visible = isPresenceStage;
  structureGroup.visible =
    isSymbolReveal ||
    isHexagramImprint ||
    isLifeForce ||
    isPresenceStage;
  root.add(structureGroup);

  // The first direction response belongs to the coordinate itself. Hexagram
  // strokes and animal construction remain absent from these two screens.
  const imprintTraceGroup = new Group();

  const coreColor = new Color(LIFE_UNIVERSE_CORE_IDENTITY.threeColor);
  // At the production camera distance this resolves to the same ~24px core
  // used by the entrance and Launch at the 390px acceptance viewport.
  const coreRadius = isGenesisLifeOriginStarMapReveal
    ? 0.078
    : isLifeOriginStarMapReveal
      ? 0.052
      : 0.14;
  const coreStageOpacity = isMoonOrigin
    ? 0.86
    : isStarRiver
      ? 0.78
      : isTimeResonance
        ? 0.72
        : isSymbolReveal
          ? 0.58
          : isHexagramImprint
            ? 0.52
            : isLifeForce
              ? 0.66
              : isStarBeastReveal
                ? 0.64
                : isCompletion
                  ? 0.62
              : 0.72;
  const core = new Mesh(
    new SphereGeometry(coreRadius, 20, 20),
    new MeshBasicMaterial({
      color: coreColor,
      transparent: true,
      opacity: (coreStageOpacity +
        revealOpacity * 0.12 +
        lifeStarCore.surfacePresence.surfaceVariation *
          (isMoonOrigin ? 0.22 : 0.7)) *
        recognitionCoreVisibility *
        perspectiveCoreDimming *
        (0.72 + spatialContrast * 0.28),
      blending: AdditiveBlending,
    }),
  );
  const coreMaterial = core.material as MeshBasicMaterial;
  const coreBaseOpacity = coreMaterial.opacity;
  core.visible = !isLifeOriginStarMapReveal;
  const coreSurface = new Mesh(
    new SphereGeometry(
      coreRadius * LIFE_UNIVERSE_CORE_IDENTITY.surfaceToCoreRatio,
      18,
      18,
    ),
    new MeshBasicMaterial({
      color: coreColor,
      transparent: true,
      opacity:
        ((isMoonOrigin ? 0.14 : 0.08) +
          lifeStarCore.surfacePresence.surfaceVariation *
            (isMoonOrigin ? 0.18 : 0.34)) *
        recognitionCoreVisibility *
        perspectiveCoreDimming *
        (0.74 + spatialContrast * 0.26),
      blending: AdditiveBlending,
      depthWrite: false,
    }),
  );
  const coreSurfaceMaterial = coreSurface.material as MeshBasicMaterial;
  const coreSurfaceBaseOpacity = coreSurfaceMaterial.opacity;
  coreSurface.visible = !isLifeOriginStarMapReveal;
  const coreHalo = new Mesh(
    new SphereGeometry(
      coreRadius * LIFE_UNIVERSE_CORE_IDENTITY.haloToCoreRatio,
      18,
      18,
    ),
    new MeshBasicMaterial({
      color: coreColor,
      transparent: true,
      opacity:
        lifeStarCore.surfacePresence.atmosphereOpacity *
        (isLifeCoordinateStage
          ? 0.045
          : isLifeDirectionStage
            ? 0.035
            : isContinuityPresenceStage
              ? 0.18
              : isPresenceStage
                ? 0.11
                : 0.18) *
        recognitionCoreVisibility *
        perspectiveCoreDimming *
        (0.68 + spatialContrast * 0.32),
      blending: AdditiveBlending,
      depthWrite: false,
    }),
  );
  const coreHaloMaterial = coreHalo.material as MeshBasicMaterial;
  const coreHaloBaseOpacity = coreHaloMaterial.opacity;
  coreHalo.visible = !isLifeOriginStarMapReveal;
  const coreLight = new PointLight(
    coreColor,
    sceneProjection.lifeCore.intensity *
      lifeStarCore.coreInfluence.lightFlowReach *
      (isMoonOrigin
        ? 0.28
        : isStarRiver
          ? 0.52
          : isTimeResonance
            ? 0.68
            : isSymbolReveal
              ? 0.74
              : isHexagramImprint
                ? 0.66
                : isLifeForce
                  ? 0.86
                  : isStarBeastReveal
                    ? 0.94
                    : isCompletion
                      ? 0.82
                  : 0.68) *
      perspectiveCoreDimming *
        (0.62 + spatialContrast * 0.38),
    6,
    1.7,
  );
  const coreLightBaseIntensity = coreLight.intensity;
  // Time enters the existing life core as a slower change of rhythm and
  // luminance. It must never introduce a new orbital ring around the life.
  const coreIdentityGroup = new Group();
  core.add(coreLight);
  const lifeOriginCoreMistGeometry = new BufferGeometry();
  const lifeOriginCoreMistMaterial = new PointsMaterial({
    color: new Color(0xf0e8d0),
    map: lifeOriginStarTexture,
    alphaTest: isLifeOriginStarMapReveal ? 0.012 : 0,
    size: 0.028,
    sizeAttenuation: true,
    transparent: true,
    opacity: 0,
    blending: AdditiveBlending,
    depthWrite: false,
  });
  const lifeOriginCoreMist = new Points(
    lifeOriginCoreMistGeometry,
    lifeOriginCoreMistMaterial,
  );
  if (isLifeOriginStarMapReveal) {
    const mistParticleCount = isGenesisLifeOriginStarMapReveal ? 88 : 64;
    const mistPositions = new Float32Array(mistParticleCount * 3);
    for (let mistIndex = 0; mistIndex < mistParticleCount; mistIndex += 1) {
      const mistOffset = mistIndex * 3;
      const radialProgress = Math.sqrt((mistIndex + 0.5) / mistParticleCount);
      const angle =
        mistIndex * 2.399963229728653 +
        (random() - 0.5) * 0.42;
      const radius =
        0.06 +
        radialProgress *
          (isGenesisLifeOriginStarMapReveal ? 0.34 : 0.24);
      mistPositions[mistOffset] =
        Math.cos(angle) *
        radius *
        (isGenesisLifeOriginStarMapReveal
          ? 0.62 + random() * 0.58
          : 0.72 + random() * 0.34);
      mistPositions[mistOffset + 1] =
        Math.sin(angle) *
        radius *
        (isGenesisLifeOriginStarMapReveal
          ? 0.5 + random() * 0.42
          : 0.72 + random() * 0.34);
      mistPositions[mistOffset + 2] =
        (random() - 0.5) *
        (isGenesisLifeOriginStarMapReveal ? 0.14 : 0.08);
    }
    lifeOriginCoreMistGeometry.setAttribute(
      "position",
      new Float32BufferAttribute(mistPositions, 3),
    );
  }
  coreIdentityGroup.add(coreHalo);
  coreIdentityGroup.add(lifeOriginCoreMist);
  coreIdentityGroup.add(coreSurface);
  coreIdentityGroup.add(core);
  root.add(coreIdentityGroup);

  let frameCount = 0;
  let recognitionResponseStartedAtMilliseconds: number | null = null;
  let lifeWhisperResponseStartedAtMilliseconds: number | null = null;
  let lifeOriginDiscoveryStartedAtMilliseconds: number | null = null;
  let realityEntryCarryStartedAtMilliseconds: number | null = null;
  let realityPressureStartedAtMilliseconds: number | null = null;
  let realityPressureRecognitionStartedAtMilliseconds: number | null = null;
  let realityPressureRecoveryStartedAtMilliseconds: number | null = null;
  let realityLifeWeatherStartedAtMilliseconds: number | null = null;
  let gravityMemoryInfluenceStartedAtMilliseconds: number | null = null;
  let choiceResponsePauseStartedAtMilliseconds: number | null = null;
  let choiceResponseSpaceStartedAtMilliseconds: number | null = null;
  let crystalSedimentStartedAtMilliseconds: number | null = null;
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

  const controller: GenesisWebGLRendererCoreController = Object.freeze({
    sceneProjection,
    renderFrame: (elapsedMilliseconds: number) => {
      if (disposed || contextState === "LOST") return;
      const elapsedSeconds =
        (Number.isFinite(elapsedMilliseconds)
          ? Math.max(0, elapsedMilliseconds)
          : 0) / 1000;
      const safeElapsedMilliseconds = elapsedSeconds * 1000;
      const realityArrivalPhase = isRealityCanvas
        ? input.canvas?.getAttribute("data-reality-arrival-phase")
        : null;
      const realityPressureCanApproach =
        !isRealityCanvas || realityArrivalPhase !== "IDENTITY_HOLD";
      const realityPressureVisualState = isRealityCanvas
        ? input.canvas
            ?.closest("[data-reality-pressure-visual-state]")
            ?.getAttribute("data-reality-pressure-visual-state")
        : null;
      const realityLifeWeatherPhase = isRealityCanvas
        ? input.canvas?.getAttribute("data-reality-life-weather-phase")
        : null;
      if (
        realityLifeWeatherPhase === "CURRENT_REALITY_SENSING" &&
        realityLifeWeatherStartedAtMilliseconds === null
      ) {
        realityLifeWeatherStartedAtMilliseconds = safeElapsedMilliseconds;
      } else if (realityLifeWeatherPhase === "QUIET_WITH_MEMORY") {
        realityLifeWeatherStartedAtMilliseconds = null;
      }
      const realityLifeWeatherRaw =
        realityLifeWeatherPhase === "CURRENT_REALITY_SETTLED"
          ? 1
          : realityLifeWeatherPhase === "CURRENT_REALITY_SENSING" &&
              realityLifeWeatherStartedAtMilliseconds !== null
            ? Math.min(
                1,
                Math.max(
                  0,
                  (safeElapsedMilliseconds -
                    realityLifeWeatherStartedAtMilliseconds) /
                    2_800,
                ),
              )
            : realityLifeWeatherPhase === null
              ? 1
              : 0;
      const realityLifeWeatherProgress =
        realityLifeWeatherRaw *
        realityLifeWeatherRaw *
        (3 - 2 * realityLifeWeatherRaw);
      const gravityInertiaField = isRealityCanvas
        ? input.canvas
            ?.closest(".gy-reality-life-universe")
            ?.querySelector("[data-inertia-path-state]")
        : null;
      const gravityInertiaPathState = gravityInertiaField?.getAttribute(
        "data-inertia-path-state",
      );
      const gravityMemoryInfluenceIsActive =
        gravityInertiaPathState === "MEMORY_GUIDING";
      const choiceResponseState = input.canvas
        ?.closest("[data-choice-response-state]")
        ?.getAttribute("data-choice-response-state");
      const choiceResponsePauseIsActive =
        choiceResponseState === "OLD_PATH_RESTARTING_THEN_PAUSE";
      const choiceCrystalStage = input.canvas
        ?.closest("[data-choice-crystal-stage]")
        ?.getAttribute("data-choice-crystal-stage");
      const crystalSedimentIsActive = choiceCrystalStage === "AVAILABLE";
      if (
        crystalSedimentIsActive &&
        crystalSedimentStartedAtMilliseconds === null
      ) {
        crystalSedimentStartedAtMilliseconds = safeElapsedMilliseconds;
      } else if (!crystalSedimentIsActive) {
        crystalSedimentStartedAtMilliseconds = null;
      }
      const crystalSedimentRaw =
        crystalSedimentStartedAtMilliseconds === null
          ? 0
          : Math.min(
              1,
              Math.max(
                0,
                (safeElapsedMilliseconds -
                  crystalSedimentStartedAtMilliseconds) /
                  3_200,
              ),
            );
      const crystalSedimentProgress =
        crystalSedimentRaw *
        crystalSedimentRaw *
        (3 - 2 * crystalSedimentRaw);
      if (
        choiceResponsePauseIsActive &&
        choiceResponsePauseStartedAtMilliseconds === null
      ) {
        choiceResponsePauseStartedAtMilliseconds = safeElapsedMilliseconds;
      } else if (!choiceResponsePauseIsActive) {
        choiceResponsePauseStartedAtMilliseconds = null;
      }
      const choiceResponsePauseRaw =
        choiceResponsePauseStartedAtMilliseconds === null
          ? choiceResponseState === "NEW_RESPONSE_POSSIBILITY" ||
            choiceResponseState === "RESPONSE_SEDIMENTED"
            ? 1
            : 0
          : Math.min(
              1,
              Math.max(
                0,
                (safeElapsedMilliseconds -
                  choiceResponsePauseStartedAtMilliseconds -
                  920) /
                  2_200,
              ),
            );
      const choiceResponsePauseProgress =
        choiceResponsePauseRaw *
        choiceResponsePauseRaw *
        (3 - 2 * choiceResponsePauseRaw);
      const choiceResponseSpaceIsActive =
        choiceResponseState === "NEW_RESPONSE_POSSIBILITY" ||
        choiceResponseState === "RESPONSE_SEDIMENTED";
      if (
        choiceResponseSpaceIsActive &&
        choiceResponseSpaceStartedAtMilliseconds === null
      ) {
        choiceResponseSpaceStartedAtMilliseconds =
          safeElapsedMilliseconds;
      } else if (!choiceResponseSpaceIsActive) {
        choiceResponseSpaceStartedAtMilliseconds = null;
      }
      const choiceResponseSpaceRaw =
        choiceResponseSpaceStartedAtMilliseconds === null
          ? 0
          : Math.min(
              1,
              Math.max(
                0,
                (safeElapsedMilliseconds -
                  choiceResponseSpaceStartedAtMilliseconds) /
                  2_400,
              ),
            );
      const choiceResponseSpaceProgress =
        choiceResponseSpaceRaw *
        choiceResponseSpaceRaw *
        (3 - 2 * choiceResponseSpaceRaw);
      const choiceLifePauseWeight = choiceResponsePauseIsActive
        ? choiceResponsePauseProgress
        : 0;
      const choiceSpatialMotionWeight =
        1 -
        choiceLifePauseWeight * 0.72 +
        choiceResponseSpaceProgress * 0.08;
      const choiceMemoryInfluenceWeight =
        1 - choiceResponsePauseProgress * 0.74;
      if (
        gravityMemoryInfluenceIsActive &&
        gravityMemoryInfluenceStartedAtMilliseconds === null
      ) {
        gravityMemoryInfluenceStartedAtMilliseconds =
          safeElapsedMilliseconds;
      } else if (!gravityMemoryInfluenceIsActive) {
        gravityMemoryInfluenceStartedAtMilliseconds = null;
      }
      const gravityMemoryInfluenceRaw =
        gravityMemoryInfluenceStartedAtMilliseconds === null
          ? 0
          : Math.min(
              1,
              Math.max(
                0,
                (safeElapsedMilliseconds -
                  gravityMemoryInfluenceStartedAtMilliseconds) /
                  3_200,
              ),
            );
      const gravityMemoryInfluenceProgress =
        gravityMemoryInfluenceRaw *
        gravityMemoryInfluenceRaw *
        (3 - 2 * gravityMemoryInfluenceRaw);
      const gravityRepetitionDepth = Math.max(
        1,
        Math.min(
          6,
          Number(gravityInertiaField?.getAttribute("data-repetition-depth")) ||
            1,
        ),
      );
      const gravityRememberedDirection =
        Math.sign(pressureFlowDeflection || pressureContactSign || 1) *
        (0.34 + Math.min(1, Math.abs(pressureFlowDeflection)) * 0.66);
      const gravityMemoryRecurrence =
        0.82 +
        Math.max(0, Math.sin(elapsedSeconds * 0.72 - 0.4)) * 0.18;
      const gravityMemoryResponseBias =
        gravityMemoryInfluenceProgress *
        gravityRememberedDirection *
        (0.015 + gravityRepetitionDepth * 0.0016) *
        gravityMemoryRecurrence *
        choiceMemoryInfluenceWeight;
      if (
        realityPressureVisualState === "PRESSURE_RECOVERING" &&
        realityPressureRecoveryStartedAtMilliseconds === null
      ) {
        realityPressureRecoveryStartedAtMilliseconds =
          safeElapsedMilliseconds;
      } else if (
        realityPressureVisualState === "PRESSURE_RECOGNIZED" ||
        realityPressureVisualState === "PRESSURE_OBSERVING"
      ) {
        realityPressureRecoveryStartedAtMilliseconds = null;
      }
      const realityPressureRecoveryRaw =
        realityPressureVisualState === "PRESSURE_RECOVERED"
          ? 1
          : realityPressureVisualState === "PRESSURE_RECOVERING" &&
              realityPressureRecoveryStartedAtMilliseconds !== null
            ? Math.min(
                1,
                Math.max(
                  0,
                  (safeElapsedMilliseconds -
                    realityPressureRecoveryStartedAtMilliseconds) /
                    2_400,
                ),
              )
            : 0;
      const realityPressureRecoveryProgress =
        realityPressureRecoveryRaw *
        realityPressureRecoveryRaw *
        (3 - 2 * realityPressureRecoveryRaw);
      if (
        realityPressureVisualState === "PRESSURE_RECOGNIZED" &&
        realityPressureRecognitionStartedAtMilliseconds === null
      ) {
        realityPressureRecognitionStartedAtMilliseconds =
          gravityInertiaField === null
            ? safeElapsedMilliseconds
            : safeElapsedMilliseconds - 1_650;
      } else if (realityPressureVisualState !== "PRESSURE_RECOGNIZED") {
        realityPressureRecognitionStartedAtMilliseconds = null;
      }
      const realityPressureRecognitionRaw =
        realityPressureRecognitionStartedAtMilliseconds === null
          ? 0
          : Math.min(
              1,
              Math.max(
                0,
                (safeElapsedMilliseconds -
                  realityPressureRecognitionStartedAtMilliseconds) /
                  1_650,
              ),
            );
      const realityPressureRecognitionProgress =
        realityPressureRecognitionRaw *
        realityPressureRecognitionRaw *
        (3 - 2 * realityPressureRecognitionRaw);
      const realityPressureStateWeight =
        realityPressureVisualState === "PRESSURE_PAUSED"
          ? 0.16
          : realityPressureVisualState === "PRESSURE_RECOVERED"
            ? 0.24
            : realityPressureVisualState === "PRESSURE_RECOVERING"
              ? 1 - realityPressureRecoveryProgress * 0.76
              : realityPressureVisualState === "PRESSURE_RECOGNIZED"
                ? 0.72 + realityPressureRecognitionProgress * 0.28
                : 0.72;
      const realityIdentityCarriesPressureExperience =
        isRealityCanvas &&
        isCompletion &&
        (realityPressureVisualState === "PRESSURE_RECOGNIZED" ||
          realityPressureVisualState === "PRESSURE_RECOVERING" ||
          realityPressureVisualState === "PRESSURE_RECOVERED");
      if (
        isRealityCanvas &&
        realityPressureCanApproach &&
        realityPressureStartedAtMilliseconds === null
      ) {
        // A pressure selection rebuilds the visual consumer with the selected
        // projection. If Reality has already arrived, inherit the completed
        // approach instead of replaying an unpressured body from frame zero.
        realityPressureStartedAtMilliseconds =
          realityArrivalPhase === "SETTLED"
            ? safeElapsedMilliseconds - 2_830
            : safeElapsedMilliseconds;
      } else if (isRealityCanvas && !realityPressureCanApproach) {
        realityPressureStartedAtMilliseconds = null;
      }
      const realityPressureElapsedSeconds = isRealityCanvas
        ? realityPressureStartedAtMilliseconds === null
          ? 0
          : Math.max(
              0,
              (safeElapsedMilliseconds -
                realityPressureStartedAtMilliseconds) /
                1000,
            )
        : elapsedSeconds;
      const recognitionVisualState = input.canvas
        ?.closest("[data-genesis-presence-visual-state]")
        ?.getAttribute("data-genesis-presence-visual-state");
      const recognitionResponseIsActive =
        isCompletion &&
        !isRealityCanvas &&
        recognitionVisualState === "RECOGNIZED";
      if (
        recognitionResponseIsActive &&
        recognitionResponseStartedAtMilliseconds === null
      ) {
        recognitionResponseStartedAtMilliseconds = elapsedMilliseconds;
      } else if (!recognitionResponseIsActive) {
        recognitionResponseStartedAtMilliseconds = null;
      }
      const recognitionResponseElapsedSeconds =
        recognitionResponseStartedAtMilliseconds === null
          ? 0
          : Math.max(
              0,
              (elapsedMilliseconds -
                recognitionResponseStartedAtMilliseconds) /
                1000,
            );
      const recognitionResponseProgress = recognitionResponseIsActive
        ? Math.min(1, recognitionResponseElapsedSeconds / 1.25)
        : 0;
      const recognitionResponseWave =
        Math.sin(recognitionResponseProgress * Math.PI) *
        (1 - recognitionResponseProgress * 0.18);
      const recognitionRelationshipRaw = recognitionResponseIsActive
        ? Math.min(1, recognitionResponseElapsedSeconds / 1.08)
        : 0;
      const recognitionRelationshipSettled =
        recognitionRelationshipRaw *
        recognitionRelationshipRaw *
        (3 - 2 * recognitionRelationshipRaw);
      const lifeWhisperContainer = input.canvas?.closest(
        "[data-life-whisper-response-phase]",
      );
      const lifeWhisperFact = lifeWhisperContainer?.getAttribute(
        "data-life-whisper-fact",
      );
      const lifeWhisperResponsePhase = lifeWhisperContainer?.getAttribute(
        "data-life-whisper-response-phase",
      );
      const lifeWhisperResponseIsActive =
        isCompletion &&
        !isRealityCanvas &&
        lifeWhisperFact === "WHISPER_SUBMITTED" &&
        lifeWhisperResponsePhase === "RESPONDING";
      if (
        lifeWhisperResponseIsActive &&
        lifeWhisperResponseStartedAtMilliseconds === null
      ) {
        lifeWhisperResponseStartedAtMilliseconds = elapsedMilliseconds;
      } else if (
        lifeWhisperFact !== "WHISPER_SUBMITTED" ||
        lifeWhisperResponsePhase === "DORMANT" ||
        lifeWhisperResponsePhase === "SKIPPED"
      ) {
        lifeWhisperResponseStartedAtMilliseconds = null;
      }
      const lifeWhisperResponseElapsedSeconds =
        lifeWhisperResponseStartedAtMilliseconds === null
          ? 0
          : Math.max(
              0,
              (elapsedMilliseconds -
                lifeWhisperResponseStartedAtMilliseconds) /
                1000,
            );
      const lifeWhisperResponseProgress = lifeWhisperResponseIsActive
        ? Math.min(1, lifeWhisperResponseElapsedSeconds / 1.6)
        : 0;
      const lifeWhisperResponseWave = input.reducedMotion
        ? 0
        : Math.sin(lifeWhisperResponseProgress * Math.PI) *
          (1 - lifeWhisperResponseProgress * 0.22);
      const lifeWhisperRelationshipSettled =
        lifeWhisperFact === "WHISPER_SUBMITTED" &&
        lifeWhisperResponsePhase === "SETTLED"
          ? 1
          : lifeWhisperResponseIsActive
            ? lifeWhisperResponseProgress *
              lifeWhisperResponseProgress *
              (3 - 2 * lifeWhisperResponseProgress)
            : 0;
      const realityEntryEligibility = input.canvas
        ?.closest("[data-reality-entry-eligibility]")
        ?.getAttribute("data-reality-entry-eligibility");
      const realityEntryCarryIsActive =
        isCompletion &&
        !isRealityCanvas &&
        realityEntryEligibility === "ELIGIBLE";
      if (
        realityEntryCarryIsActive &&
        realityEntryCarryStartedAtMilliseconds === null
      ) {
        realityEntryCarryStartedAtMilliseconds = safeElapsedMilliseconds;
      } else if (!realityEntryCarryIsActive) {
        realityEntryCarryStartedAtMilliseconds = null;
      }
      const realityEntryCarryProgress =
        realityEntryCarryStartedAtMilliseconds === null
          ? 0
          : Math.min(
              1,
              Math.max(
                0,
                (safeElapsedMilliseconds -
                  realityEntryCarryStartedAtMilliseconds) /
                  560,
              ),
            );
      const realityEntryCarryWave = Math.sin(
        realityEntryCarryProgress * Math.PI,
      );
      const universeSeconds = performance.now() / 1000;
      const lifeOriginDiscoveryPhase = isGenesisLifeOriginStarMapReveal
        ? input.canvas?.getAttribute("data-life-origin-discovery-phase")
        : null;
      const lifeOriginDiscoveryIsActive =
        lifeOriginDiscoveryPhase === "DISCOVERING";
      if (
        lifeOriginDiscoveryIsActive &&
        lifeOriginDiscoveryStartedAtMilliseconds === null
      ) {
        lifeOriginDiscoveryStartedAtMilliseconds = safeElapsedMilliseconds;
      } else if (
        isGenesisLifeOriginStarMapReveal &&
        lifeOriginDiscoveryPhase === "DORMANT"
      ) {
        lifeOriginDiscoveryStartedAtMilliseconds = null;
      }
      const lifeOriginRevealRaw = isLifeOriginStarMapReveal
        ? isGenesisLifeOriginStarMapReveal
          ? lifeOriginDiscoveryPhase === "REVEALED"
            ? 1
            : lifeOriginDiscoveryStartedAtMilliseconds === null
              ? 0
              : Math.min(
                  1,
                  Math.max(
                    0,
                    (safeElapsedMilliseconds -
                      lifeOriginDiscoveryStartedAtMilliseconds) /
                      4_800,
                  ),
                )
          : Math.min(1, Math.max(0, (elapsedSeconds - 0.28) / 4.8))
        : 0;
      const lifeOriginRevealProgress =
        lifeOriginRevealRaw *
        lifeOriginRevealRaw *
        (3 - 2 * lifeOriginRevealRaw);
      const lifeOriginResponseBreath = isLifeOriginStarMapReveal
        ? 1 + Math.sin(universeSeconds * 0.48) * 0.035
        : 1;
      const realityPressureEntryRaw =
        pressureExpression !== null && isCompletion
          ? realityPressureCanApproach
            ? Math.min(
                1,
                Math.max(
                  0,
                  (realityPressureElapsedSeconds - 0.18) / 2.65,
                ),
              )
            : 0
          : pressureExpression !== null
            ? 1
            : 0;
      const realityPressureEntryProgress =
        realityPressureEntryRaw *
        realityPressureEntryRaw *
        (3 - 2 * realityPressureEntryRaw);
      // The existing life senses Reality before the interface names it.
      // This is the same pressure projection with a slightly earlier body
      // response; the surrounding space keeps the original approach timing.
      const lifePressurePerceptionProgress =
        (isRealityCanvas
          ? 1 - Math.pow(1 - realityPressureEntryProgress, 1.55)
          : realityPressureEntryProgress) * realityLifeWeatherProgress;
      // Reality begins with the relationship already settled in Genesis.
      // Pressure may occupy more of the shared space, but it must never reset
      // the recognized life to an anonymous idle pose.
      const realityCompanionshipCarry =
        isRealityCanvas && isCompletion
          ? 1 - realityPressureEntryProgress * 0.58
          : 0;
      const recognizedLifeRelationshipContinuity = Math.max(
        recognitionRelationshipSettled,
        realityCompanionshipCarry,
      );
      const realityPressurePhase =
        universeSeconds * (0.11 + pressureTemporalWeight * 0.08) * Math.PI * 2;
      const realityPressurePulse =
        0.5 +
        Math.sin(realityPressurePhase) *
          0.5 *
          (1 - realityPressureRecoveryProgress * 0.9);
      const realityRecoveryBodyRhythm =
        1 +
        Math.sin(
          (universeSeconds /
            (LIFE_UNIVERSE_CORE_IDENTITY.breathPeriodSeconds *
              (1 + pressureTemporalWeight * 0.045))) *
            Math.PI *
            2 +
            pressureFlowDeflection * 0.12,
        ) *
          LIFE_UNIVERSE_CORE_IDENTITY.breathingAmplitude *
          realityPressureRecoveryProgress *
          0.22;
      let coordinateFormationProgress = 1;
      let coordinateIdentityBreath = 1;
      const directionRevealRaw = isHexagramImprint
        ? Math.min(1, Math.max(0, (elapsedSeconds - 0.58) / 1.42))
        : isLifeForce
          ? 1
          : isStarBeastReveal || isCompletion
            ? 1
          : 0;
      const directionRevealProgress =
        directionRevealRaw *
        directionRevealRaw *
        (3 - 2 * directionRevealRaw);
      const forceAbsorptionRaw = isLifeForce
        ? Math.min(1, Math.max(0, elapsedSeconds / 1.08))
        : 0;
      const forceAbsorptionEnvelope =
        Math.sin(forceAbsorptionRaw * Math.PI);
      const forceExpressionRaw = isLifeForce
        ? Math.min(1, Math.max(0, (elapsedSeconds - 0.52) / 1.18))
        : isStarBeastReveal || isCompletion
          ? 1
        : 0;
      const forceExpressionProgress =
        forceExpressionRaw *
        forceExpressionRaw *
        (3 - 2 * forceExpressionRaw);
      const forceRhythmRevealRaw = isLifeForce
        ? Math.min(1, Math.max(0, (elapsedSeconds - 0.18) / 1.1))
        : isStarBeastReveal || isCompletion
          ? 1
          : 0;
      const forceRhythmRevealProgress =
        forceRhythmRevealRaw *
        forceRhythmRevealRaw *
        (3 - 2 * forceRhythmRevealRaw);
      const forceRecoveryRaw = isLifeForce
        ? Math.min(1, Math.max(0, (elapsedSeconds - 1.78) / 1.42))
        : isStarBeastReveal || isCompletion
          ? 1
        : 0;
      const forceRecoveryProgress =
        forceRecoveryRaw *
        forceRecoveryRaw *
        (3 - 2 * forceRecoveryRaw);
      const forceActionPresence =
        forceExpressionProgress * (1 - forceRecoveryProgress * 0.62);
      const forceRhythmPhase =
        (universeSeconds / forceExpressionBreathingPeriod) *
        Math.PI *
        2;
      const forceRhythmBreath =
        1 +
        Math.sin(forceRhythmPhase) *
          forceExpressionBreathingAmplitude *
          forceExpressionProgress;
      const identityContinuityPhase =
        (universeSeconds /
          LIFE_UNIVERSE_CORE_IDENTITY.breathPeriodSeconds) *
        Math.PI *
        2;
      const identityContinuityBreath =
        1 +
        Math.sin(identityContinuityPhase) *
          LIFE_UNIVERSE_CORE_IDENTITY.breathingAmplitude;
      const choiceLifeBodyBreath =
        1 +
        (identityContinuityBreath - 1) *
          (1 - choiceLifePauseWeight * 0.68) +
        Math.sin(identityContinuityPhase * 0.72 + 0.34) *
          LIFE_UNIVERSE_CORE_IDENTITY.breathingAmplitude *
          choiceResponseSpaceProgress *
          0.24;
      const coordinateBodyRevealRaw = isSymbolReveal
        ? Math.min(1, Math.max(0, elapsedSeconds / 2.4))
        : 0;
      const directionBodyRevealRaw = isHexagramImprint
        ? Math.min(1, Math.max(0, elapsedSeconds / 1.9))
        : 0;
      const forceBodyRevealRaw = isLifeForce
        ? Math.min(1, Math.max(0, elapsedSeconds / 2.5))
        : 0;
      const smoothReveal = (progress: number) =>
        progress * progress * (3 - 2 * progress);
      const recognitionAttentionRaw = isCompletion
        ? isRealityCanvas
          ? 1
          : Math.min(1, Math.max(0, (elapsedSeconds - 0.62) / 1.18))
        : 0;
      const recognitionAttentionProgress = smoothReveal(
        recognitionAttentionRaw,
      );
      const presenceCoreTransmissionRaw = isStarBeastReveal
        ? Math.min(1, Math.max(0, elapsedSeconds / 0.58))
        : isCompletion
          ? 1
          : 0;
      const presenceCoreTransmission =
        presenceCoreTransmissionRaw *
        presenceCoreTransmissionRaw *
        (3 - 2 * presenceCoreTransmissionRaw);
      const presenceSkeletonRevealRaw = isStarBeastReveal
        ? Math.min(1, Math.max(0, (elapsedSeconds - 0.62) / 0.96))
        : isCompletion
          ? 1
          : 0;
      const presenceSkeletonReveal =
        presenceSkeletonRevealRaw *
        presenceSkeletonRevealRaw *
        (3 - 2 * presenceSkeletonRevealRaw);
      const presenceBodyRevealRaw = isStarBeastReveal
        ? Math.min(1, Math.max(0, elapsedSeconds / 1.46))
        : isCompletion
          ? 1
          : 0;
      const presenceBodyReveal =
        presenceBodyRevealRaw *
        presenceBodyRevealRaw *
        (3 - 2 * presenceBodyRevealRaw);
      const bodyContinuityReveal = isSymbolReveal
        ? 0.28 + smoothReveal(coordinateBodyRevealRaw) * 0.22
        : isHexagramImprint
          ? 0.5 + smoothReveal(directionBodyRevealRaw) * 0.15
          : isLifeForce
            ? 0.65 + smoothReveal(forceBodyRevealRaw) * 0.17
            : isStarBeastReveal
              ? 0.82 + presenceBodyReveal * 0.18
              : isCompletion
                ? 1
                : 0;
      const bodyContinuityRhythm =
        1 +
        (choiceLifeBodyBreath - 1) *
          (isSymbolReveal ? 0.34 : isHexagramImprint ? 0.42 : 0.52) +
        (forceRhythmBreath - 1) *
          (isLifeForce ? 0.9 : isPresenceStage ? 0.74 : 0);
      if (
        isSymbolReveal ||
        isHexagramImprint ||
        isLifeForce ||
        isPresenceStage
      ) {
        applyBodyFieldReveal(
          bodyContinuityReveal,
          bodyContinuityRhythm,
        );
        bodyFieldPositionAttribute.needsUpdate = true;
      }
      const recognitionRecoveryEnvelope = isCompletion && !isRealityCanvas
        ? Math.exp(-elapsedSeconds / (1.15 + forceStability * 0.9))
        : 0;
      const recognitionRecoveryWave = isCompletion && !isRealityCanvas
        ? Math.sin(
            (elapsedSeconds /
              Math.max(1.6, forceExpressionBreathingPeriod * 0.48)) *
              Math.PI *
              2,
          ) *
          recognitionRecoveryEnvelope *
          (0.016 +
            Math.abs(forceExpressionRadialBias) * 0.016 +
            (1 - forceStability) * 0.008)
        : 0;
      const presenceSourceCarry = isStarBeastReveal
        ? 1 - presenceSkeletonReveal * 0.86
        : isCompletion
          ? 0.06 + recognitionIdentityLock * 0.02
          : 1;
      if (isStarBeastReveal) {
        // Grow the stellar skeleton from the core instead of cross-fading a
        // finished network over it. The spine appears in both directions
        // first; each branch can only grow after its own joint exists.
        const getSpineReveal = (index: number) => {
          const distanceFromCore =
            Math.abs(index - presenceCoreSpineIndex) / presenceSpineReach;
          const rawReveal = Math.min(
            1,
            Math.max(
              0,
              (presenceSkeletonReveal - distanceFromCore * 0.68) / 0.32,
            ),
          );
          return rawReveal * rawReveal * (3 - 2 * rawReveal);
        };
        const negativeSpineReach = Math.max(1, presenceCoreSpineIndex);
        const positiveSpineReach = Math.max(
          1,
          spineSegments - 1 - presenceCoreSpineIndex,
        );
        for (let index = 0; index < spineSegments; index += 1) {
          const offset = index * 3;
          const direction = index < presenceCoreSpineIndex ? -1 : 1;
          const distanceFromCore = Math.abs(
            index - presenceCoreSpineIndex,
          );
          const sideReach =
            direction < 0 ? negativeSpineReach : positiveSpineReach;
          const visibleDistance = presenceSkeletonReveal * sideReach;
          const clampedDistance = Math.min(
            distanceFromCore,
            visibleDistance,
          );
          const sourceDistance = Math.floor(clampedDistance);
          const targetDistance = Math.min(
            sideReach,
            Math.ceil(clampedDistance),
          );
          const interpolation = clampedDistance - sourceDistance;
          const sourceIndex =
            presenceCoreSpineIndex + direction * sourceDistance;
          const targetIndex =
            presenceCoreSpineIndex + direction * targetDistance;
          const sourceOffset = sourceIndex * 3;
          const targetOffset = targetIndex * 3;
          spinePositions[offset] =
            finalSpinePositions[sourceOffset] +
            (finalSpinePositions[targetOffset] -
              finalSpinePositions[sourceOffset]) *
              interpolation;
          spinePositions[offset + 1] =
            finalSpinePositions[sourceOffset + 1] +
            (finalSpinePositions[targetOffset + 1] -
              finalSpinePositions[sourceOffset + 1]) *
              interpolation;
          spinePositions[offset + 2] =
            finalSpinePositions[sourceOffset + 2] +
            (finalSpinePositions[targetOffset + 2] -
              finalSpinePositions[sourceOffset + 2]) *
              interpolation;
          const jointIsVisible =
            distanceFromCore <= visibleDistance + 0.001;
          nodePositions[offset] = jointIsVisible
            ? spinePositions[offset]
            : 0;
          nodePositions[offset + 1] = jointIsVisible
            ? spinePositions[offset + 1]
            : 0;
          nodePositions[offset + 2] = jointIsVisible
            ? spinePositions[offset + 2]
            : 100;
        }
        for (let index = 0; index < branchCount; index += 1) {
          const originIndex =
            Math.floor(
              index *
                lifePresence.morphologicalField.nodeDistributionBias,
            ) % Math.max(1, spineSegments - 1);
          const originOffset = originIndex * 3;
          const branchOffset = index * 12;
          const nodeOffset = (spineSegments + index) * 3;
          const branchWake =
            0.3 + (index % 4) * 0.055 + Math.floor(index / 4) * 0.025;
          const branchRevealRaw = Math.min(
            1,
            Math.max(
              0,
              (presenceSkeletonRevealRaw - branchWake) /
                Math.max(0.24, 1 - branchWake),
            ),
          );
          const branchReveal =
            branchRevealRaw *
            branchRevealRaw *
            (3 - 2 * branchRevealRaw) *
            getSpineReveal(originIndex);
          const originX = spinePositions[originOffset];
          const originY = spinePositions[originOffset + 1];
          const originZ = spinePositions[originOffset + 2];
          const finalOriginX = finalBranchPositions[branchOffset];
          const finalOriginY = finalBranchPositions[branchOffset + 1];
          const finalOriginZ = finalBranchPositions[branchOffset + 2];
          const midX =
            originX +
            (finalBranchPositions[branchOffset + 3] - finalOriginX) *
              branchReveal;
          const midY =
            originY +
            (finalBranchPositions[branchOffset + 4] - finalOriginY) *
              branchReveal;
          const midZ =
            originZ +
            (finalBranchPositions[branchOffset + 5] - finalOriginZ) *
              branchReveal;
          const tipX =
            originX +
            (finalNodePositions[nodeOffset] - finalOriginX) *
              branchReveal;
          const tipY =
            originY +
            (finalNodePositions[nodeOffset + 1] - finalOriginY) *
              branchReveal;
          const tipZ =
            originZ +
            (finalNodePositions[nodeOffset + 2] - finalOriginZ) *
              branchReveal;
          branchPositions.set(
            [
              originX,
              originY,
              originZ,
              midX,
              midY,
              midZ,
              midX,
              midY,
              midZ,
              tipX,
              tipY,
              tipZ,
            ],
            branchOffset,
          );
          const branchJointIsVisible = branchReveal > 0.035;
          nodePositions[nodeOffset] = branchJointIsVisible ? tipX : 0;
          nodePositions[nodeOffset + 1] = branchJointIsVisible ? tipY : 0;
          nodePositions[nodeOffset + 2] = branchJointIsVisible
            ? tipZ
            : 100;
        }
        spinePositionAttribute.needsUpdate = true;
        branchPositionAttribute.needsUpdate = true;
        nodePositionAttribute.needsUpdate = true;
      } else if (isCompletion) {
        // Completion keeps the exact identity plan that emerged from the Life
        // Core. Reality may shift the body's particle state, but never rewrites
        // the core, stellar skeleton, birth memory, direction, or force rhythm.
        for (let index = 0; index < bodyFieldParticleCount; index += 1) {
          const positionOffset = index * 3;
          const finalX = finalBodyFieldPositions[positionOffset];
          const finalY = finalBodyFieldPositions[positionOffset + 1];
          const forceAxisPosition =
            finalX * forceExpressionAxisX +
            finalY * forceExpressionAxisY;
          const forceLateralPosition =
            finalX * forceExpressionPerpendicularX +
            finalY * forceExpressionPerpendicularY;
          const recoveredAxis =
            forceAxisPosition *
            (1 +
              recognitionRecoveryWave * (0.72 + forceAggregation * 0.28) +
              recognitionResponseWave *
                (0.07 + forceAggregation * 0.022) +
              recognizedLifeRelationshipContinuity * 0.018 +
              lifeWhisperResponseWave *
                (0.052 + forceAggregation * 0.016) +
              lifeWhisperRelationshipSettled * 0.01);
          const recoveredLateral =
            forceLateralPosition *
            (1 -
              recognitionRecoveryWave * 0.28 -
              recognitionResponseWave * 0.016 -
              lifeWhisperResponseWave * 0.01);
          const recoveredX =
            forceExpressionAxisX * recoveredAxis +
            forceExpressionPerpendicularX * recoveredLateral;
          const recoveredY =
            forceExpressionAxisY * recoveredAxis +
            forceExpressionPerpendicularY * recoveredLateral;
          const pressureContactProjection =
            recoveredX * pressureContactAxisX +
            recoveredY * pressureContactAxisY;
          const pressureContactEdge = Math.min(
            1,
            Math.max(
              0,
              0.5 +
                pressureContactProjection /
                  Math.max(0.001, bodyDirectionExtent * 2),
            ),
          );
          const pressureBodyEnvelope =
            realityPressureStateWeight *
            lifePressurePerceptionProgress *
            pressureContactEdge;
          const pressureInwardShift =
            pressureBoundaryLoad *
            pressureBodyEnvelope *
            (0.018 + realityPressurePulse * 0.014);
          const pressureAxialDrag =
            pressureFlowDeflection *
            pressureBodyEnvelope *
            (0.006 + realityPressurePulse * 0.008);
          const rememberedResponseAffinity =
            gravityMemoryInfluenceProgress *
            (0.24 + pressureContactEdge * 0.76);
          const crystalSedimentAffinity =
            crystalSedimentProgress *
            Math.max(
              0,
              1 - Math.abs(pressureContactEdge - 0.58) / 0.42,
            );
          bodyFieldPositions[positionOffset] =
            recoveredX -
            pressureContactAxisX * pressureInwardShift +
            axisX * pressureAxialDrag +
            perpendicularX *
              gravityMemoryResponseBias *
              rememberedResponseAffinity +
            perpendicularX *
              gravityRememberedDirection *
              crystalSedimentAffinity *
              0.0028;
          bodyFieldPositions[positionOffset + 1] =
            recoveredY -
            pressureContactAxisY * pressureInwardShift +
            axisY * pressureAxialDrag +
            perpendicularY *
              gravityMemoryResponseBias *
              rememberedResponseAffinity +
            perpendicularY *
              gravityRememberedDirection *
              crystalSedimentAffinity *
              0.0028;
          bodyFieldPositions[positionOffset + 2] =
            finalBodyFieldPositions[positionOffset + 2] *
            (1 +
              recognitionRecoveryWave * 0.18 +
              recognitionResponseWave * 0.025 -
              pressureBodyEnvelope * 0.035 +
              lifeWhisperResponseWave * 0.018 +
              lifeWhisperRelationshipSettled * 0.004);
        }
        bodyFieldPositionAttribute.needsUpdate = true;
      }
      if (isPresenceStage && lifeAuraParticleCount > 0) {
        const pressureAuraContraction =
          (pressureExpression === null
            ? 0
            : Math.min(
                1,
                pressureFieldCompression * 0.42 +
                  pressureBoundaryLoad * 0.26 +
                  Math.abs(pressureFlowDeflection) * 0.2 +
                  pressureTemporalWeight * 0.12,
              )) *
          realityPressureEntryProgress *
          realityPressureStateWeight *
          (1 - realityPressureRecoveryProgress * 0.78);
        const lifeAuraRelease =
          realityPressureRecoveryProgress * 0.78 +
          choiceResponseSpaceProgress * 0.14 +
          lifeWhisperResponseWave * 0.1 +
          lifeWhisperRelationshipSettled * 0.025;
        const lifeAuraFlowSpeed =
          (0.15 +
            Math.abs(lifePresence.morphologicalField.flowDirection) * 0.055 +
            (birthMansionPresenceBreathRate - 0.27) * 0.22) *
          (1 - pressureAuraContraction * 0.62 + lifeAuraRelease * 0.24);
        const lifeAuraBreath =
          1 +
          (identityContinuityBreath - 1) *
            (0.74 - pressureAuraContraction * 0.26);
        for (let index = 0; index < lifeAuraParticleCount; index += 1) {
          const positionOffset = index * 3;
          const phase =
            lifeAuraPhases[index] + universeSeconds * lifeAuraFlowSpeed;
          const flowShift =
            (Math.sin(phase) *
              (0.012 +
                Math.abs(lifePresence.morphologicalField.flowDirection) *
                  0.007) +
              Math.cos(phase * 0.52 + birthMansionPresencePhase) *
                birthMansionAuraCurl *
                0.004) *
            (1 - pressureAuraContraction * 0.58);
          const lateralBreath =
            lifeAuraBreath *
            (1 -
              pressureAuraContraction * 0.2 +
              lifeAuraRelease * 0.055 +
              Math.sin(phase * 0.63) * 0.018);
          const lateralOffset =
            lifeAuraLateralOffsets[index] * lateralBreath;
          const axialOffset =
            lifeAuraAxialOffsets[index] *
              (1 - pressureAuraContraction * 0.08) +
            flowShift;
          const contactProjection =
            lifeAuraSpineOrigins[positionOffset] * pressureContactAxisX +
            lifeAuraSpineOrigins[positionOffset + 1] *
              pressureContactAxisY;
          const contactAffinity = Math.min(
            1,
            Math.max(
              0,
              0.5 +
                contactProjection /
                  Math.max(0.001, bodyDirectionExtent * 2.4),
            ),
          );
          const pressureShift =
            pressureAuraContraction *
            contactAffinity *
            (0.012 + realityPressurePulse * 0.008);
          lifeAuraPositions[positionOffset] =
            lifeAuraSpineOrigins[positionOffset] +
            perpendicularX * lateralOffset +
            axisX * axialOffset -
            pressureContactAxisX * pressureShift;
          lifeAuraPositions[positionOffset + 1] =
            lifeAuraSpineOrigins[positionOffset + 1] +
            perpendicularY * lateralOffset +
            axisY * axialOffset -
            pressureContactAxisY * pressureShift;
          lifeAuraPositions[positionOffset + 2] =
            lifeAuraSpineOrigins[positionOffset + 2] +
            Math.sin(phase * 0.47) *
              0.012 *
              (1 - pressureAuraContraction * 0.64);
        }
        lifeAuraPositionAttribute.needsUpdate = true;
      }
      const birthDirectionResponseRaw = isHexagramImprint
        ? Math.min(1, Math.max(0, (elapsedSeconds - 0.08) / 1.08))
        : 1;
      const birthDirectionResponse =
        isHexagramImprint
          ? Math.sin(birthDirectionResponseRaw * Math.PI)
          : 0;
      let directionCoreBreath = 1;
      if (coordinateFormationExpression?.phase === "SEEKING_TO_FOUND") {
        const rawProgress = Math.min(
          1,
          Math.max(
            0,
            (elapsedSeconds * 1000) /
              coordinateFormationExpression.settleDurationMilliseconds,
          ),
        );
        coordinateFormationProgress = 1 - Math.pow(1 - rawProgress, 3);
        const inverseProgress = 1 - coordinateFormationProgress;
        const coordinateFieldScale =
          1 +
          (coordinateFormationExpression.initialRadialScale - 1) *
            inverseProgress *
            0.12;
        mansionCoordinateGroup.rotation.z =
          coordinateFormationExpression.initialAngularOffsetRadians *
          inverseProgress *
          0.08;
        mansionCoordinateGroup.scale.set(
          coordinateBaseScaleX * coordinateFieldScale,
          -coordinateBaseScaleY * coordinateFieldScale,
          1,
        );
      }
      if (isLifeOriginStarMapReveal) {
        const originFieldScale =
          (0.96 + lifeOriginRevealProgress * 0.04) *
          lifeOriginResponseBreath;
        mansionCoordinateGroup.scale.set(
          coordinateBaseScaleX * originFieldScale,
          -coordinateBaseScaleY * originFieldScale,
          1,
        );
        mansionCoordinateGroup.rotation.z =
          Math.sin(universeSeconds * 0.12) * 0.0035;
        if (mansionHeavenOrderMaterial !== null) {
          mansionHeavenOrderMaterial.opacity =
            (isGenesisLifeOriginStarMapReveal
              ? 0
              : 0.018 + lifeOriginRevealProgress * 0.052) *
            (0.94 + Math.sin(universeSeconds * 0.2) * 0.06);
        }
        if (birthMansionGroupPointMaterial !== null) {
          const sourceGroupBreath =
            0.94 +
            Math.sin(
              universeSeconds * birthMansionPresenceBreathRate +
                birthMansionPresencePhase,
            ) *
              0.06;
          birthMansionGroupPointMaterial.opacity =
            (0.26 + lifeOriginRevealProgress * 0.5) *
            sourceGroupBreath;
          birthMansionGroupPointMaterial.size =
            mansionCoordinateVisualLayer!.fieldExpression.neutralPointSize *
            (1.8 + lifeOriginRevealProgress * 0.85) *
            sourceGroupBreath;
        }
        if (birthMansionBoneMaterial !== null) {
          const identityBoneBreath =
            0.92 +
            Math.sin(
              universeSeconds * birthMansionPresenceBreathRate +
                birthMansionPresencePhase,
            ) *
              0.08;
          birthMansionBoneMaterial.opacity =
            (isGenesisLifeOriginStarMapReveal
              ? 0.042 + lifeOriginRevealProgress * 0.34
              : 0.025 + lifeOriginRevealProgress * 0.23) *
            identityBoneBreath;
        }
      }
      const birthRevealProgress =
        coordinateFormationExpression?.phase === "FOUND"
          ? 1
          : coordinateFormationExpression?.phase === "SEEKING_TO_FOUND"
            ? Math.min(
                1,
                Math.max(
                  0,
                  (coordinateFormationProgress -
                    coordinateFormationExpression.birthRevealStartProgress) /
                    (1 -
                      coordinateFormationExpression.birthRevealStartProgress),
                ),
              )
            : 0;
      seekingResponseMaterials.forEach((material, responseIndex) => {
        const responseCenter = 0.16 + responseIndex * 0.13;
        const responseStrength = Math.max(
          0,
          1 -
            Math.abs(coordinateFormationProgress - responseCenter) /
              0.24,
        );
        material.opacity =
          responseStrength *
          0.34 *
          (1 - birthRevealProgress * 0.72);
        material.size = 0.036 + responseStrength * 0.016;
      });
      if (
        birthCoordinateAxisMaterial !== null &&
        coordinateFormationExpression !== null
      ) {
        birthCoordinateAxisMaterial.opacity =
          isLifeOriginStarMapReveal
            ? (isGenesisLifeOriginStarMapReveal
                ? 0.012 + lifeOriginRevealProgress * 0.054
                : 0.035 + lifeOriginRevealProgress * 0.115) *
              (0.94 +
                Math.sin(
                  universeSeconds * birthMansionPresenceBreathRate +
                    birthMansionPresencePhase,
                ) *
                  0.06)
            : retainMotherContinuityOrbit
            ? 0.18
            : coordinateFormationExpression.birthAxisOpacity *
              birthRevealProgress *
              0.12 *
              (isLifeDirectionStage ? 0.04 : 1) *
              (isPresenceStage ? (isCompletion ? 0.34 : 0.44) : 1);
      }
      if (
        birthMansionPointMaterial !== null &&
        mansionCoordinateVisualLayer !== null
      ) {
        const birthExpression =
          mansionCoordinateVisualLayer.birthCoordinateExpression;
        const birthPhase =
          (universeSeconds / birthExpression.breathingPeriodSeconds) *
            Math.PI *
            2 +
          birthMansionPresencePhase;
        const birthBreath =
          1 + Math.sin(birthPhase) * birthExpression.breathingAmplitude;
        coordinateIdentityBreath =
          1 +
          (birthBreath - 1) *
            birthRevealProgress *
            0.5;
        birthMansionPointMaterial.size =
          birthExpression.pointSize *
          (isLifeOriginStarMapReveal ? 1.08 : 0.72) *
          birthBreath *
          (1 + birthDirectionResponse * 0.34) *
          (isLifeOriginStarMapReveal
            ? 1
            : retainMotherContinuityOrbit
            ? 1
            : 0.82 + birthRevealProgress * 0.18);
        birthMansionPointMaterial.opacity =
          isLifeOriginStarMapReveal
            ? Math.min(
                1,
                birthExpression.opacity *
                  (0.46 + lifeOriginRevealProgress * 0.46) *
                  (0.94 + Math.sin(birthPhase) * 0.06),
              )
            : Math.min(
                1,
                birthExpression.opacity *
                  (retainMotherContinuityOrbit ? 0.82 : birthRevealProgress) *
                  (0.94 + Math.sin(birthPhase) * 0.06) *
                  (1 + birthDirectionResponse * 0.18) *
                  (isHexagramImprint
                    ? 0.74
                    : isLifeForce
                      ? 0.46 + (1 - forceRhythmRevealProgress) * 0.12
                      : 1),
              );
      }
      if (
        directionFieldExpression !== null &&
        directionFieldMaterial !== null &&
        directionFieldPositions !== null &&
        directionFieldPositionAttribute !== null &&
        directionFieldParticleCount > 0
      ) {
        const directionPhase =
          (universeSeconds /
            directionFieldExpression.breathingPeriodSeconds) *
          Math.PI *
          2;
        const responseBreath =
          1 +
          Math.sin(directionPhase) *
            directionFieldExpression.breathingAmplitude;
        const axisX = directionAxisX;
        const axisY = directionAxisY;
        const perpendicularX = -axisY;
        const perpendicularY = axisX;
        const forceDensity = forceCondensationExpression?.density ?? 0;
        const forceAspect =
          forceCondensationExpression?.formAspectRatio ?? 1;
        const travelSpeed = isLifeForce
          ? 0.012 + forceExpressionFlowSpeed * 0.2
          : isStarBeastReveal || isCompletion
            ? 0.01 + forceExpressionFlowSpeed * 0.16
          : 0.018;
        const fieldReach =
          directionSourceReach *
          (isLifeForce ? 1 + forceDensity * 0.04 : 0.96);
        const fieldNarrowing = isLifeForce
          ? Math.max(0.46, 0.72 / forceAspect)
          : Math.max(
              0.58,
              1 +
                directionEastGrowth * 0.08 +
                directionSouthExpansion * 0.14 -
                directionWestConvergence * 0.2 -
                directionNorthDepth * 0.12,
            );
        // Direction grows from the birth mansion that was just found. The
        // field does not arrive as a completed new effect or a replacement
        // source light: its celestial reach and its path into the existing
        // core become spatially legible from that same coordinate.
        const directionSpatialReveal = directionRevealProgress;
        for (
          let index = 0;
          index < directionFieldParticleCount;
          index += 1
        ) {
          const seed =
            (((index * 37) % directionFieldParticleCount) + 0.5) /
            directionFieldParticleCount;
          // Once the birth mansion has answered, matter returns from the
          // corresponding celestial boundary toward that same coordinate.
          // The same matter then passes through the birth coordinate and
          // reaches the existing core. This is one continuous force passage,
          // never a diagram line, orbit, or second identity light.
          const progress =
            1 - ((seed + universeSeconds * travelSpeed) % 1);
          const birthPassage = 0.32;
          const lane =
            Math.sin(index * 1.618 + progress * Math.PI * 2) * 0.68 +
            Math.cos(index * 0.731 - progress * Math.PI) * 0.32;
          const offset = index * 3;
          if (progress > birthPassage) {
            const sourceProgress =
              (progress - birthPassage) / (1 - birthPassage);
            const sourceEnvelope = Math.sin(
              sourceProgress * Math.PI * 0.5,
            );
            const lateralBreath =
              sourceEnvelope *
              directionFieldExpression.parallelSpread *
              0.42 *
              fieldNarrowing *
              responseBreath;
            const axialProgress =
              sourceProgress *
              sourceProgress *
              (3 - 2 * sourceProgress);
            directionFieldPositions[offset] =
              directionOriginX +
              (axisX * (0.04 + fieldReach * axialProgress) +
                perpendicularX * lane * lateralBreath) *
                directionSpatialReveal;
            directionFieldPositions[offset + 1] =
              directionOriginY +
              (axisY * (0.04 + fieldReach * axialProgress) +
                perpendicularY * lane * lateralBreath) *
                directionSpatialReveal;
            directionFieldPositions[offset + 2] =
              directionOriginZ +
              (Math.sin(
                  index * 2.173 + sourceProgress * Math.PI * 1.4,
                ) *
                  (isLifeForce
                    ? 0.2
                    : 0.11 + directionNorthDepth * 0.17) +
                axialProgress *
                  (0.08 + directionNorthDepth * 0.15) +
                ((index % 3) - 1) * 0.018) *
                directionSpatialReveal;
          } else {
            const corePassage = progress / birthPassage;
            const coreEnvelope = Math.sin(corePassage * Math.PI);
            const coreSpread =
              coreEnvelope *
              directionFieldExpression.parallelSpread *
              0.14 *
              responseBreath;
            const coreTargetX =
              directionOriginX * corePassage +
              perpendicularX * lane * coreSpread;
            const coreTargetY =
              directionOriginY * corePassage +
              perpendicularY * lane * coreSpread;
            const coreTargetZ =
              directionOriginZ * corePassage +
              Math.sin(index * 1.37) * coreEnvelope * 0.04;
            directionFieldPositions[offset] =
              directionOriginX +
              (coreTargetX - directionOriginX) *
                directionSpatialReveal;
            directionFieldPositions[offset + 1] =
              directionOriginY +
              (coreTargetY - directionOriginY) *
                directionSpatialReveal;
            directionFieldPositions[offset + 2] =
              directionOriginZ +
              (coreTargetZ - directionOriginZ) *
                directionSpatialReveal;
          }
        }
        directionFieldPositionAttribute.needsUpdate = true;
        directionFieldMaterial.opacity =
          (isLifeForce
            ? 0.24 + forceDensity * 0.08
            : isStarBeastReveal
              ? 0.16 + forceDensity * 0.04
              : isCompletion
                ? 0.1 + recognitionIdentityLock * 0.04
                : 0.32) *
          directionRevealProgress *
          (isLifeForce
            ? 1 - forceRhythmRevealProgress * 0.78
            : 1) *
          presenceSourceCarry *
          (0.94 + (responseBreath - 1) * 1.5);
        directionFieldMaterial.size =
          (isLifeForce ? 0.032 + forceDensity * 0.004 : 0.028) *
          (0.96 + (responseBreath - 1));
        directionCoreBreath =
          1 +
          (responseBreath - 1) *
            directionRevealProgress *
            (isLifeForce ? 0.34 : 0.28);
        if (directionCoreBiasMaterial !== null) {
          directionCoreBiasMaterial.opacity = 0;
        }
      }
      // Presence keeps its identity through breath and recovery. It never
      // proves aliveness by orbiting the camera.
      const presenceRotation = 0;
      root.rotation.y = elapsedSeconds * presenceRotation;
      let cosmicFieldScale = 1;
      let cosmicFieldOpacity = sceneProjection.cosmicField.opacity;
      // Continue the entrance camera language in Genesis: the stellar volume
      // reveals depth through quiet yaw and pitch, never by spinning a flat
      // star plate around the screen axis.
      cosmicField.rotation.x = Math.cos(universeSeconds * 0.071) * 0.052;
      cosmicField.rotation.x *= choiceSpatialMotionWeight;
      cosmicField.rotation.y =
        Math.sin(universeSeconds * 0.085) *
        0.075 *
        choiceSpatialMotionWeight;
      cosmicField.rotation.z = 0;
      const lifeCoreGravity = isLifeForce
        ? 0.28
        : isStarBeastReveal
          ? 0.34
          : isCompletion
            ? 0.26
            : 0;
      const realitySpacePressure =
        pressureExpression !== null && isPresenceStage
          ? Math.min(
              1,
              pressureFieldCompression * 0.34 +
                pressureBoundaryLoad * 0.28 +
                Math.abs(pressureFlowDeflection) * 0.22 +
                pressureTemporalWeight * 0.16,
            ) *
              realityPressureEntryProgress *
              realityPressureStateWeight
          : 0;
      LIFE_UNIVERSE_STAR_FIELD.forEach((star, index) => {
        const offset = index * 3;
        const radialDistance = Math.hypot(star.x, star.y);
        const gravityInfluence =
          lifeCoreGravity *
          Math.pow(Math.max(0, 1 - radialDistance / 4.2), 2) *
          (0.62 + ((star.z + 1.7) / 3.4) * 0.38);
        const bend =
          gravityInfluence *
          (0.16 + Math.sin(universeSeconds * 0.18 + star.phase) * 0.035);
        const bendCos = Math.cos(bend);
        const bendSin = Math.sin(bend);
        const pull = 1 - gravityInfluence * 0.09;
        const gravityX =
          (star.x * bendCos - star.y * bendSin) * pull;
        const gravityY =
          (star.x * bendSin + star.y * bendCos) * pull;
        const directionProjection =
          gravityX * directionAxisX + gravityY * directionAxisY;
        const directionLateral =
          gravityX * -directionAxisY + gravityY * directionAxisX;
        const directionSideWeight =
          directionRevealProgress *
          Math.max(
            0,
            Math.min(1, (directionProjection + 0.25) / 2.8),
          ) *
          Math.max(0.18, 1 - Math.abs(directionLateral) / 3.4) *
          (0.54 + ((star.z + 1.7) / 3.4) * 0.46);
        const directionSpaceShift =
          (isLifeForce ? 0.11 : isHexagramImprint ? 0.06 : 0) *
          directionSideWeight;
        const directedGravityX =
          gravityX - directionAxisX * directionSpaceShift;
        const directedGravityY =
          gravityY - directionAxisY * directionSpaceShift;
        const forceWorldInfluence =
          (isLifeForce ? forceActionPresence : 0) *
          Math.pow(Math.max(0, 1 - radialDistance / 3.2), 2) *
          (0.54 + forceExpressionDensity * 0.46);
        const forceAxialPosition =
          directedGravityX * forceExpressionAxisX +
          directedGravityY * forceExpressionAxisY;
        const forceLateralPosition =
          directedGravityX * forceExpressionPerpendicularX +
          directedGravityY * forceExpressionPerpendicularY;
        const forceRadialScale =
          1 + forceWorldInfluence * forceExpressionRadialBias * 0.12;
        const forceAspectStretch =
          forceWorldInfluence *
          (forceExpressionAspectRatio - 1) *
          0.08;
        const forceActedAxial =
          forceAxialPosition *
          (forceRadialScale + forceAspectStretch);
        const forceActedLateral =
          forceLateralPosition *
          (forceRadialScale - forceAspectStretch * 0.5);
        const forceActedGravityX =
          forceExpressionAxisX * forceActedAxial +
          forceExpressionPerpendicularX * forceActedLateral;
        const forceActedGravityY =
          forceExpressionAxisY * forceActedAxial +
          forceExpressionPerpendicularY * forceActedLateral;
        const pressureDepth = (star.z + 1.7) / 3.4;
        const pressureContactProjection =
          forceActedGravityX * pressureContactAxisX +
          forceActedGravityY * pressureContactAxisY;
        const pressureSourceAffinity = Math.min(
          1,
          Math.max(0, 0.5 + pressureContactProjection / 5.8),
        );
        const pressureCoreDistanceProtection = Math.min(
          1,
          Math.max(0, (radialDistance - 0.42) / 3.5),
        );
        const pressureInfluence =
          realitySpacePressure *
          (0.38 + pressureDepth * 0.62) *
          (0.28 + pressureSourceAffinity * 0.72) *
          (0.18 + pressureCoreDistanceProtection * 0.82);
        const axialPosition =
          forceActedGravityX * axisX + forceActedGravityY * axisY;
        const lateralPosition =
          forceActedGravityX * perpendicularX +
          forceActedGravityY * perpendicularY;
        const compressedAxial =
          axialPosition *
          (1 - pressureFieldCompression * pressureInfluence * 0.14);
        const deflectedLateral =
          lateralPosition +
          pressureFlowDeflection *
            pressureInfluence *
            (0.12 +
              realityPressurePulse * 0.08 * choiceSpatialMotionWeight) +
          pressureContactSign *
            pressureBoundaryLoad *
            pressureInfluence *
            (0.025 +
              realityPressurePulse * 0.035 * choiceSpatialMotionWeight) +
          gravityMemoryResponseBias *
            Math.pow(Math.max(0, 1 - radialDistance / 3.6), 2) *
            (0.42 + pressureSourceAffinity * 0.58);
        cosmicPositions[offset] =
          axisX * compressedAxial + perpendicularX * deflectedLateral;
        cosmicPositions[offset + 1] =
          axisY * compressedAxial + perpendicularY * deflectedLateral;
        cosmicPositions[offset + 2] =
          star.z +
          Math.sin(universeSeconds * 0.13 + star.phase) *
            gravityInfluence *
            0.12 *
            choiceSpatialMotionWeight +
          Math.sin(realityPressurePhase + star.phase) *
            pressureInfluence *
            0.18 *
            choiceSpatialMotionWeight *
            (1 - realityPressureRecoveryProgress * 0.86);
      });
      cosmicGeometry.getAttribute("position").needsUpdate = true;
      cosmicFieldScale *=
        0.98 + spatialDepthScale * 0.012 + spatialApproachProgress * 0.008;
      cosmicFieldOpacity *= 0.82 + spatialContrast * 0.12 + spatialApproachProgress * 0.06;
      if (timeSequenceRecognition !== null) {
        const recognitionPhase =
          (universeSeconds /
            timeSequenceRecognition.temporalRhythm.periodSeconds) *
            Math.PI *
            2 +
          timeSequenceRecognition.temporalRhythm.phaseOffset;
        const recognitionBreath =
          1 +
          Math.sin(recognitionPhase) *
            timeSequenceRecognition.temporalRhythm.breathingAmplitude;
        cosmicField.rotation.z =
          universeSeconds * 0.004 +
          timeSequenceRecognition.cosmicResponseExpression.directionalDrift *
            0.018 +
          Math.sin(recognitionPhase * 0.35) * 0.006;
        cosmicFieldScale =
          1 +
          timeSequenceRecognition.cosmicResponseExpression.fieldGathering *
            0.08 *
            recognitionBreath;
        cosmicFieldOpacity =
          sceneProjection.cosmicField.opacity *
          (0.92 +
            timeSequenceRecognition.cosmicResponseExpression.responseStrength *
              0.16 *
              recognitionBreath);
      }
      if (isStarRiver) {
        cosmicFieldScale *= 1.02 + realizationProgress * 0.04;
        cosmicFieldOpacity *= 1.08;
      }
      if (isMoonOrigin) {
        cosmicFieldOpacity *= 0.72;
      }
      if (isTimeResonance) {
        const timeGathering =
          1 +
          Math.sin(universeSeconds * 0.22) *
            (0.02 + perspectiveResponseIntensity * 0.024) +
          realizationProgress * 0.06;
        cosmicFieldScale *= timeGathering;
        cosmicFieldOpacity *=
          0.94 + realizationProgress * 0.1 + perspectiveResponseIntensity * 0.04;
      }
      if (isMoonOrigin) {
        cosmicFieldScale *= 0.96 + perspectiveBackgroundDepth * 0.04;
        cosmicFieldOpacity *= 0.94 + perspectiveMoonWeight * 0.04;
      }
      if (isStarRiver) {
        cosmicFieldScale *= 1 + perspectiveBackgroundDepth * 0.035;
        cosmicFieldOpacity *= 0.96 + perspectiveStarWeight * 0.05;
      }
      if (isSymbolReveal) {
        cosmicFieldScale *= 1.03 + Math.sin(universeSeconds * 0.16) * 0.018;
        cosmicFieldOpacity *= 1.04;
      }
      if (isHexagramImprint) {
        cosmicFieldScale *= 0.99 + Math.sin(universeSeconds * 0.18) * 0.014;
        cosmicFieldOpacity *= 0.92 + realizationProgress * 0.08;
      }
      if (isLifeForce) {
        cosmicFieldScale *= 1.01 + Math.sin(universeSeconds * 0.42) * 0.022;
        cosmicFieldOpacity *= 1.02;
      }
      if (isStarBeastReveal) {
        cosmicFieldScale *=
          1.02 + Math.sin(universeSeconds * 0.2) * (0.008 + perspectivePresenceBreath * 0.006);
        cosmicFieldOpacity *= 0.98 + perspectiveRecognitionStability * 0.04;
      }
      if (isCompletion) {
        cosmicFieldScale *= 1.01 + perspectiveRecognitionStability * 0.01;
        cosmicFieldOpacity *= 0.96 + perspectiveRecognitionStability * 0.04;
      }
      if (isPresenceStage) {
        cosmicFieldOpacity *= 0.82 + recognitionCosmicSupportWeight * 0.12;
        cosmicFieldScale *= 0.99 + recognitionCosmicSupportWeight * 0.01;
      }
      if (isLifeOriginStarMapReveal) {
        // Random depth stars remain the sky, but no longer compete with the
        // ordered 28-mansion foreground or the personal source structure.
        cosmicFieldOpacity *= isGenesisLifeOriginStarMapReveal
          ? 0.24 + lifeOriginRevealProgress * 0.025
          : 0.54 + lifeOriginRevealProgress * 0.08;
        cosmicFieldScale *= 1.04;
        if (isGenesisLifeOriginStarMapReveal) {
          const originStillness = 1 - lifeOriginRevealProgress * 0.78;
          cosmicField.rotation.x *= originStillness;
          cosmicField.rotation.y *= originStillness;
        }
      }
      if (birthMansionIgnition !== null) {
        const ignitionPhase =
          (universeSeconds / birthMansionIgnition.temporalRhythm.periodSeconds) *
            Math.PI *
            2 +
          birthMansionIgnition.temporalRhythm.phaseOffset;
        const claimBreath =
          1 +
          Math.sin(ignitionPhase) *
            birthMansionIgnition.temporalRhythm.breathingAmplitude;
        cosmicFieldScale *=
          1 +
          birthMansionIgnition.cosmicRecognitionExpression.fieldConvergence *
            0.06 *
            claimBreath;
        cosmicFieldOpacity *=
          1 - birthMansionIgnition.cosmicRecognitionExpression.backgroundAttenuation;
        cosmicField.rotation.z +=
          birthMansionIgnition.cosmicRecognitionExpression.responseDirection *
          0.008;
      }
      cosmicField.scale.setScalar(cosmicFieldScale);
      // The deep universe never disappears behind a stage. Early Genesis
      // keeps a stronger floor so the retained 28-mansion foreground reads as
      // nearer coordinates inside space, not as a diagram on black.
      cosmicPointMaterial.opacity = Math.max(
        cosmicFieldOpacity,
        isMoonOrigin
          ? 0.2
          : isStarRiver || isTimeResonance
            ? 0.18
            : isLifeOriginStarMapReveal
              ? isGenesisLifeOriginStarMapReveal
                ? 0.026
                : 0.038
              : 0.12,
      );
      const rhythmPhase =
        (universeSeconds /
          LIFE_UNIVERSE_CORE_IDENTITY.breathPeriodSeconds) *
        Math.PI *
        2;
      const breath =
        1 +
          Math.sin(rhythmPhase) *
            LIFE_UNIVERSE_CORE_IDENTITY.breathingAmplitude;
      const choiceLifeCoreBreath =
        1 +
        (breath - 1) * (1 - choiceLifePauseWeight * 0.68) +
        Math.sin(rhythmPhase * 0.72 + 0.34) *
          LIFE_UNIVERSE_CORE_IDENTITY.breathingAmplitude *
          choiceResponseSpaceProgress *
          0.24;
      const structureInfluence =
        1 +
        (choiceLifeCoreBreath - 1) *
          (lifeStarCore.coreInfluence.structureResponse +
            sceneProjection.lifePresence.corePresence.aggregationStrength *
              0.04);
      const presenceBreathScale = isPresenceStage
        ? 1 +
          (forceRhythmBreath - 1) *
            (isCompletion
              ? 0.72 + recognitionIdentityLock * 0.12
              : 0.68)
        : 1;
      const coreObservationScale =
        (isLifeForce ? 1 + perspectiveForceRhythm * 0.05 : 1) *
        (isMoonOrigin
          ? 1.02
          : isStarRiver
            ? 0.86
            : isTimeResonance
              ? 0.92
              : isSymbolReveal
                ? 0.96
                : isHexagramImprint
                  ? 0.94
                  : isLifeForce
                    ? 0.98
                    : isStarBeastReveal
                      ? 0.94
                      : isCompletion
                        ? 0.92
                        : 0.92);
      const forceAbsorptionScale =
        isLifeForce
          ? 1 -
            forceAbsorptionEnvelope *
              (0.018 + forceExpressionDensity * 0.016)
          : 1;
      coreIdentityGroup.scale.setScalar(
        choiceLifeCoreBreath *
          coreObservationScale *
          coordinateIdentityBreath *
          directionCoreBreath *
          forceAbsorptionScale *
          forceRhythmBreath *
          (isCompletion
            ? 1 +
              recognitionAttentionProgress * 0.008 +
              recognitionResponseWave * 0.034 +
              recognizedLifeRelationshipContinuity * 0.018 +
              lifeWhisperResponseWave * 0.026 +
              lifeWhisperRelationshipSettled * 0.006 +
              realityEntryCarryWave * 0.012
            : 1),
      );
      coreIdentityGroup.position.z = isCompletion
        ? recognitionAttentionProgress * 0.01 +
          recognitionResponseWave * 0.025 +
          recognizedLifeRelationshipContinuity * 0.017 +
          lifeWhisperResponseWave * 0.018 +
          lifeWhisperRelationshipSettled * 0.005 +
          realityEntryCarryWave * 0.01
        : 0;
      core.scale.setScalar(1);
      // Force changes how the one core breathes; it does not project a
      // directional shield around it. Directional identity is carried by the
      // body's particle density instead of an elliptical halo.
      const forceCoreBehaviorScale =
        1 +
        forceExpressionRadialBias *
          forceRhythmRevealProgress *
          0.08 +
        (forceRhythmBreath - 1) *
          (isLifeForce ? 0.55 : isPresenceStage ? 0.34 : 0);
      coreSurface.rotation.z = 0;
      coreSurface.scale.setScalar(
        1 + (forceCoreBehaviorScale - 1) * 0.42,
      );
      coreHalo.rotation.z = 0;
      coreHalo.scale.setScalar(forceCoreBehaviorScale);
      coreMaterial.opacity =
        coreBaseOpacity *
        (1 +
          forceAbsorptionEnvelope * 0.06 +
          forceActionPresence * 0.035 +
          recognitionResponseWave * 0.08 +
          recognizedLifeRelationshipContinuity * 0.04 +
          lifeWhisperResponseWave * 0.06 +
          lifeWhisperRelationshipSettled * 0.018) *
        (1 +
          choiceLifePauseWeight * 0.018 +
          choiceResponseSpaceProgress * 0.024);
      coreSurfaceMaterial.opacity =
        coreSurfaceBaseOpacity *
        (1 +
          forceAbsorptionEnvelope * 0.18 +
          forceActionPresence *
            (0.2 + forceExpressionDensity * 0.12) +
          recognitionResponseWave * 0.14 +
          recognizedLifeRelationshipContinuity * 0.06 +
          lifeWhisperResponseWave * 0.09 +
          lifeWhisperRelationshipSettled * 0.024) *
        (1 +
          choiceLifePauseWeight * 0.02 +
          choiceResponseSpaceProgress * 0.026);
      coreHaloMaterial.opacity =
        coreHaloBaseOpacity *
        (1 +
          forceActionPresence *
            (0.28 + forceExpressionDensity * 0.2) +
          recognitionResponseWave * 0.18 +
          recognizedLifeRelationshipContinuity * 0.08 +
          lifeWhisperResponseWave * 0.11 +
          lifeWhisperRelationshipSettled * 0.03) *
        (1 +
          choiceLifePauseWeight * 0.018 +
          choiceResponseSpaceProgress * 0.03);
      if (isLifeOriginStarMapReveal) {
        const originMistBreath =
          0.93 + Math.sin(universeSeconds * 0.48) * 0.07;
        lifeOriginCoreMistMaterial.opacity =
          (isGenesisLifeOriginStarMapReveal
            ? 0.075 + lifeOriginRevealProgress * 0.17
            : 0.09 + lifeOriginRevealProgress * 0.16) *
          originMistBreath;
        lifeOriginCoreMistMaterial.size =
          isGenesisLifeOriginStarMapReveal
            ? 0.014 + lifeOriginRevealProgress * 0.009
            : 0.018 + lifeOriginRevealProgress * 0.011;
        lifeOriginCoreMist.rotation.z =
          Math.sin(universeSeconds * 0.11) * 0.035;
        lifeOriginCoreMist.scale.setScalar(
          (isGenesisLifeOriginStarMapReveal ? 1.26 : 1.14) +
            lifeOriginRevealProgress *
              (isGenesisLifeOriginStarMapReveal ? 0.28 : 0.2) +
            Math.sin(universeSeconds * 0.48) * 0.025,
        );
        coreMaterial.opacity =
          coreBaseOpacity *
          (isGenesisLifeOriginStarMapReveal
            ? 0.008 + lifeOriginRevealProgress * 0.006
            : 0.045 + lifeOriginRevealProgress * 0.018);
        coreSurfaceMaterial.opacity =
          coreSurfaceBaseOpacity *
          (isGenesisLifeOriginStarMapReveal
            ? 0.1 + lifeOriginRevealProgress * 0.04
            : 0.24 + lifeOriginRevealProgress * 0.08);
        coreHaloMaterial.opacity =
          coreHaloBaseOpacity *
          (isGenesisLifeOriginStarMapReveal
            ? 1.72 + lifeOriginRevealProgress * 0.64
            : 1.55 + lifeOriginRevealProgress * 0.5);
      }
      coreLight.intensity =
        coreLightBaseIntensity *
        (1 +
          forceAbsorptionEnvelope * 0.05 +
          forceActionPresence *
            (0.08 + forceExpressionDensity * 0.08) +
          recognitionResponseWave * 0.1 +
          recognizedLifeRelationshipContinuity * 0.05);
      structureGroup.scale.setScalar(
        sceneProjection.formField.boundaryScale *
          fieldPoseScale *
          (1 +
            sceneProjection.lifePresence.morphologicalField.spatialContraction *
              0.22) *
          (1 + (fieldEnvelopeScale - 1) * 0.32) *
          (1 + (forceAggregation - 0.5) * 0.18) *
          (1 + revealCoreConvergence * 0.1) *
          (1 + lifePresence.timeSequenceResponse.presenceIntensity * 0.045) *
          (1 + lifePresence.birthMansionIgnitionResponse.presenceIntensity * 0.04) *
          1.45 *
          symbolicFieldScale *
          changeImprintScale *
          lifeForceScale *
          presenceScale *
          formationContinuityScale *
          subjectForegroundScale *
          (1 + perspectiveBodyCohesion * 0.06) *
          presenceBreathScale *
          (isLifeForce
            ? 1 +
              Math.sin(elapsedSeconds * (0.34 + perspectiveForceRhythm * 0.18)) *
                (0.028 + realizationProgress * 0.025 + perspectiveForceRhythm * 0.024)
            : 1) *
          structureInfluence,
      );
      // Pressure posture is resolved from the immutable resting position on
      // every frame. Accumulating offsets would make the same body drift out
      // of view and falsely read as an identity disappearing over time.
      structureGroup.position.x = structureGroupRestingX;
      structureGroup.position.y = structureGroupRestingY;
      if (isStarBeastReveal) {
        structureGroup.scale.multiplyScalar(
          0.8 + presenceBodyReveal * 0.2,
        );
      }
      if (isSymbolReveal) {
        structureGroup.scale.x *= 1.12 + perspectiveLifeAxisStrength * 0.12;
        structureGroup.scale.y *= 0.9 - perspectiveMorphologicalTension * 0.06;
        structureGroup.rotation.z += perspectiveLifeAxisStrength * 0.022;
      }
      if (isHexagramImprint) {
        structureGroup.scale.x *= 0.98 - perspectiveMemorySedimentation * 0.025;
        structureGroup.scale.y *= 1.02 + perspectiveMemorySedimentation * 0.05;
      }
      if (isLifeForce) {
        structureGroup.scale.x *= 0.96 - perspectiveInnerMotionDifference * 0.04;
        structureGroup.scale.y *= 1.04 + perspectiveForceRhythm * 0.06;
      }
      structureGroup.rotation.z =
        sceneProjection.lifePresence.morphologicalField.bend * 0.12 +
        sceneProjection.lifePresence.morphologicalField.postureBias * 0.08 +
        sceneProjection.lifePresence.morphologicalField.flowDirection * 0.04 +
        fieldDirectionalFlow * 0.03 +
        forceDirectionalBias * 0.04 +
        revealFieldIntegration * 0.018 +
        Math.sin(elapsedSeconds * sceneProjection.formField.flowSpeed) *
          sceneProjection.motion.driftAmplitude;
      if (isSymbolReveal) {
        structureGroup.rotation.x =
          fieldDirectionalFlow * 0.06 +
          perspectiveMorphologicalTension * 0.02 +
          Math.sin(elapsedSeconds * 0.16) * 0.012;
      }
      if (isHexagramImprint) {
        structureGroup.rotation.x =
          Math.sin(elapsedSeconds * 0.12) * 0.035;
        imprintTraceGroup.rotation.z = elapsedSeconds * 0.012;
        imprintTraceGroup.scale.setScalar(
          0.98 + realizationProgress * 0.05 + Math.sin(elapsedSeconds * 0.18) * 0.012,
        );
        imprintTraceGroup.children.forEach((child, index) => {
          const material = (child as Line).material as LineBasicMaterial;
          material.opacity =
            0.1 +
            perspectiveMemorySedimentation * 0.2 +
            index * (0.008 + perspectiveMemorySedimentation * 0.006) +
            Math.sin(elapsedSeconds * 0.18 + index * 0.3) *
              (0.018 + perspectiveMemorySedimentation * 0.02);
        });
      }
      if (isLifeForce) {
        structureGroup.rotation.x =
          forceDirectionalBias * 0.08 +
          perspectiveInnerMotionDifference * 0.04 +
          Math.sin(elapsedSeconds * (0.2 + perspectiveForceRhythm * 0.12)) *
            (0.014 + perspectiveForceRhythm * 0.018);
      }
      if (isStarBeastReveal) {
        structureGroup.rotation.x =
          fieldDirectionalFlow * 0.035 +
          perspectiveSubjectAxisStrength * 0.028 +
          Math.sin(elapsedSeconds * 0.16) *
            (0.006 + perspectivePresenceBreath * 0.008);
        structureGroup.scale.x *=
          1.04 + perspectiveSubjectAxisStrength * 0.04;
        structureGroup.scale.y *= 1.02 + perspectiveBodyCohesion * 0.04;
      }
      if (isCompletion) {
        const recognitionFacingSide =
          forceExpressionAxisX >= 0 ? 1 : -1;
        structureGroup.rotation.z *= 0.34 - perspectiveCompletionStillness * 0.08;
        structureGroup.rotation.x =
          Math.sin(elapsedSeconds * 0.14) *
          (0.004 + perspectivePresenceBreath * 0.004);
        structureGroup.rotation.y =
          recognitionFacingSide *
          ((1 - recognitionAttentionProgress) * 0.105 -
            recognitionResponseWave * 0.075 +
            recognizedLifeRelationshipContinuity * 0.024 -
            lifeWhisperResponseWave * 0.048 +
            lifeWhisperRelationshipSettled * 0.01);
        structureGroup.position.z =
          structureGroupRestingDepth +
          recognitionAttentionProgress * 0.045 +
          recognitionResponseWave * 0.035 +
          recognizedLifeRelationshipContinuity * 0.03 +
          lifeWhisperResponseWave * 0.024 +
          lifeWhisperRelationshipSettled * 0.008 +
          realityEntryCarryWave * 0.012;
        structureGroup.scale.multiplyScalar(
          1 +
            recognitionAttentionProgress * 0.018 +
            recognitionResponseWave * 0.036 +
            recognizedLifeRelationshipContinuity * 0.022 +
            lifeWhisperResponseWave * 0.028 +
            lifeWhisperRelationshipSettled * 0.008 +
            realityEntryCarryWave * 0.008,
        );
        structureGroup.scale.x *=
          1.02 + perspectiveSubjectAxisStrength * 0.025;
        structureGroup.scale.y *= 1.01 + perspectiveBodyCohesion * 0.025;
      }
      if (isLifeOriginStarMapReveal) {
        // The body is not summoned in Reality. Its already existing topology
        // simply becomes readable inside the source field, with a slow rise
        // in visibility and no model swap.
        structureGroup.scale.multiplyScalar(
          isGenesisLifeOriginStarMapReveal
            ? 0.62 + lifeOriginRevealProgress * 0.1
            : 0.72 + lifeOriginRevealProgress * 0.16,
        );
        structureGroup.position.z += 0.04;
      }
      if (pressureExpression !== null && isPresenceStage) {
        const pressurePhase =
          elapsedSeconds * (0.11 + pressureTemporalWeight * 0.08);
        const pressurePulse = realityPressurePulse;
        const pressureCompression =
          pressureFieldCompression *
          lifePressurePerceptionProgress *
          (0.024 + pressurePulse * 0.022);
        const pressureLift =
          pressureCoreResistance *
          lifePressurePerceptionProgress *
          (0.012 + pressurePulse * 0.018);
        const pressurePosture =
          realityPressureStateWeight *
          lifePressurePerceptionProgress *
          (0.62 + pressurePulse * 0.38);
        structureGroup.rotation.z +=
          pressureFlowDeflection *
          pressurePosture *
          0.012;
        structureGroup.rotation.z +=
          gravityMemoryResponseBias *
          (0.22 + gravityRepetitionDepth * 0.018);
        structureGroup.position.x +=
          -pressureContactAxisX *
          pressureBoundaryLoad *
          pressurePosture *
          (0.004 + pressureCompression * 0.08);
        structureGroup.position.y +=
          -pressureContactAxisY *
          pressureBoundaryLoad *
          pressurePosture *
          (0.004 + pressureLift * 0.06);

        for (let index = 0; index < pressureTracePointCount; index += 1) {
          const pressureTraceTravel =
            pressurePhase * 0.38 * (1 - realityPressureRecoveryProgress) +
            0.58 * realityPressureRecoveryProgress;
          const traceProgress =
            ((pressureTraceTravel - index * 0.045) % 1 + 1) % 1;
          const scaledIndex = traceProgress * Math.max(1, spineSegments - 1);
          const sourceIndex = Math.min(
            spineSegments - 1,
            Math.floor(scaledIndex),
          );
          const targetIndex = Math.min(spineSegments - 1, sourceIndex + 1);
          const interpolation = scaledIndex - sourceIndex;
          const sourceOffset = sourceIndex * 3;
          const targetOffset = targetIndex * 3;
          const traceOffset = index * 3;
          const localDeflection =
            Math.sin(traceProgress * Math.PI) *
            pressureFlowDeflection *
            realityPressureEntryProgress *
            realityPressureStateWeight *
            (0.018 + pressurePulse * 0.026);
          pressureTracePositions[traceOffset] =
            spinePositions[sourceOffset] +
            (spinePositions[targetOffset] - spinePositions[sourceOffset]) *
              interpolation +
            perpendicularX * localDeflection;
          pressureTracePositions[traceOffset + 1] =
            spinePositions[sourceOffset + 1] +
            (spinePositions[targetOffset + 1] -
              spinePositions[sourceOffset + 1]) *
              interpolation +
            perpendicularY * localDeflection;
          pressureTracePositions[traceOffset + 2] =
            spinePositions[sourceOffset + 2] +
            (spinePositions[targetOffset + 2] -
              spinePositions[sourceOffset + 2]) *
              interpolation +
            0.08 + index * 0.012;
        }
        pressureTracePositionAttribute.needsUpdate = true;
        const activePressureTraceOpacity =
          (0.18 +
            pressureStructureResponse * 0.26 +
            pressurePulse * 0.24) *
          realityPressureEntryProgress *
          realityPressureStateWeight;
        const recoveredPressureTraceOpacity =
          0.026 +
          pressureStructureResponse * 0.034 +
          pressureBoundaryLoad * 0.018;
        const sedimentedPressureTraceOpacity =
          0.105 +
          pressureStructureResponse * 0.06 +
          pressureBoundaryLoad * 0.028;
        pressureTraceMaterial.opacity =
          (activePressureTraceOpacity *
              (1 - realityPressureRecoveryProgress) +
            recoveredPressureTraceOpacity *
              realityPressureRecoveryProgress) *
            (1 - crystalSedimentProgress) +
          sedimentedPressureTraceOpacity * crystalSedimentProgress;
        pressureTraceMaterial.size =
          lifePresence.stellarSkeleton.nodeScale *
          (0.72 +
            pressureCoreResponse * 0.34 +
            pressurePulse * 0.18 -
            crystalSedimentProgress * 0.12);
        spineMaterial.opacity =
          Math.max(spineOpacity, isCompletion ? 0.08 : 0.16) *
          (1 +
            (-0.025 + pressurePulse * 0.04) *
              realityPressureEntryProgress *
              realityPressureStateWeight);
        branchMaterial.opacity =
          Math.max(branchOpacity, isCompletion ? 0.035 : 0.08) *
          (1 +
            (-0.02 + pressurePulse * 0.032) *
              realityPressureEntryProgress *
              realityPressureStateWeight);
        if (realityPressureVisualState === "PRESSURE_RECOGNIZED") {
          spineMaterial.opacity *=
            0.12 + realityPressureRecognitionProgress * 0.3;
          branchMaterial.opacity *=
            0.08 + realityPressureRecognitionProgress * 0.26;
        }
      }
      const stagePointOpacity = isSymbolReveal
        ? 0.86
        : isHexagramImprint
          ? 0.78
          : isLifeForce
            ? 0.92
            : isStarBeastReveal
              ? 0.16
              : isCompletion
                ? 0.04
                : isContinuityPresenceStage
                  ? 0.28
                  : 0.74;
      structurePointMaterial.opacity =
        (stagePointOpacity +
          (isPresenceStage ? (recognitionSubjectWeight - 1) * 0.1 : 0) +
          lifeStarCore.coreInfluence.nodeBreathCoupling *
            0.16 *
            (0.94 + (breath - 1) * 2) -
          (isPresenceStage
            ? perspectiveBodyCohesion * 0.08 * (0.96 + (breath - 1) * 2)
            : 0)) *
        (isStarBeastReveal
          ? presenceCoreTransmission * presenceSkeletonReveal
          : 1);
      if (realityIdentityCarriesPressureExperience) {
        // Pressure changes posture and rhythm, never the legibility of the
        // existing life body. These are visibility floors for the same
        // skeleton and nodes, not a new pressure effect or a second identity.
        const pressureIdentityStructureVisibility =
          0.35 + realityPressureRecognitionProgress * 0.65;
        spineMaterial.opacity = Math.max(
          spineMaterial.opacity,
          (0.032 + perspectiveSubjectAxisStrength * 0.008) *
            pressureIdentityStructureVisibility,
        );
        branchMaterial.opacity = Math.max(
          branchMaterial.opacity,
          (0.01 + perspectiveBodyCohesion * 0.005) *
            pressureIdentityStructureVisibility,
        );
        structurePointMaterial.opacity = Math.max(
          structurePointMaterial.opacity,
          (0.07 + perspectiveBodyCohesion * 0.018) *
            pressureIdentityStructureVisibility,
        );
      }
      if (isLifeOriginStarMapReveal) {
        spineMaterial.opacity = Math.max(
          spineMaterial.opacity,
          isGenesisLifeOriginStarMapReveal
            ? 0.05 + lifeOriginRevealProgress * 0.085
            : 0.12 + lifeOriginRevealProgress * 0.16,
        );
        branchMaterial.opacity = Math.max(
          branchMaterial.opacity,
          isGenesisLifeOriginStarMapReveal
            ? 0.018 + lifeOriginRevealProgress * 0.045
            : 0.045 + lifeOriginRevealProgress * 0.095,
        );
        structurePointMaterial.opacity = Math.max(
          structurePointMaterial.opacity,
          isGenesisLifeOriginStarMapReveal
            ? 0.08 + lifeOriginRevealProgress * 0.16
            : 0.22 + lifeOriginRevealProgress * 0.29,
        );
      }
      structurePointMaterial.size =
        lifePresence.stellarSkeleton.nodeScale *
        (0.96 +
          lifeStarCore.coreInfluence.nodeBreathCoupling * 0.12 * breath +
          (isPresenceStage ? perspectiveBodyCohesion * 0.34 : 0)) *
        (isStarBeastReveal
          ? 0.64
          : isCompletion
            ? 0.68
            : isPresenceStage
              ? 0.92
              : 1) *
        (isGenesisLifeOriginStarMapReveal
          ? 1.45
          : isLifeOriginStarMapReveal
            ? 2.05
            : 1);
      bodyFieldMaterial.opacity = isSymbolReveal
        ? 0.12 + bodyContinuityReveal * 0.18
        : isHexagramImprint
          ? 0.14 + bodyContinuityReveal * 0.18
          : isLifeForce
            ? 0.16 + bodyContinuityReveal * 0.25
            : isPresenceStage
              ? (isCompletion ? 0.56 : 0.4) +
                perspectiveBodyCohesion * (isCompletion ? 0.3 : 0.32) +
                (recognitionSubjectWeight - 1) * 0.18 +
                recognitionResponseWave * 0.12 +
                recognizedLifeRelationshipContinuity * 0.08 +
                lifeWhisperResponseWave * 0.085 +
                lifeWhisperRelationshipSettled * 0.025 +
                Math.sin(rhythmPhase * 0.72 + 0.5) *
                  (0.008 + perspectivePresenceBreath * 0.012)
              : 0;
      if (realityIdentityCarriesPressureExperience) {
        bodyFieldMaterial.opacity = Math.max(
          bodyFieldMaterial.opacity,
          0.68 +
            perspectiveBodyCohesion * 0.2 +
            recognitionIdentityLock * 0.04,
        );
      }
      if (isLifeOriginStarMapReveal) {
        bodyFieldMaterial.opacity =
          (isGenesisLifeOriginStarMapReveal ? 0.02 : 0.25) +
          lifeOriginRevealProgress *
            (isGenesisLifeOriginStarMapReveal ? 0.065 : 0.2) +
          Math.sin(rhythmPhase * 0.72 + 0.5) *
                  (isGenesisLifeOriginStarMapReveal ? 0.006 : 0.012);
      }
      if (isPresenceStage) {
        const pressureAuraContraction =
          (pressureExpression === null
            ? 0
            : Math.min(
                1,
                pressureFieldCompression * 0.42 +
                  pressureBoundaryLoad * 0.26 +
                  Math.abs(pressureFlowDeflection) * 0.2 +
                  pressureTemporalWeight * 0.12,
              )) *
          realityPressureEntryProgress *
          realityPressureStateWeight *
          (1 - realityPressureRecoveryProgress * 0.78);
        const settledAuraOpacity = isGenesisLifeOriginStarMapReveal
          ? 0.046 + lifeOriginRevealProgress * 0.094
          : isRealityCanvas
            ? 0.12 + lifeOriginRevealProgress * 0.045
            : 0.072 + recognitionIdentityLock * 0.035;
        lifeAuraMaterial.opacity = Math.min(
          0.2,
          (settledAuraOpacity +
            recognizedLifeRelationshipContinuity * 0.03 +
            lifeWhisperResponseWave * 0.045 +
            lifeWhisperRelationshipSettled * 0.014) *
            (1 -
              pressureAuraContraction * 0.16 +
              realityPressureRecoveryProgress * 0.08 +
              choiceResponseSpaceProgress * 0.035),
        );
        lifeAuraMaterial.size =
          lifeAuraBaseSize *
          (isGenesisLifeOriginStarMapReveal
            ? 1.08 + lifeOriginRevealProgress * 0.12
            : 1.16) *
          (1 -
            pressureAuraContraction * 0.11 +
            realityPressureRecoveryProgress * 0.07);
      }
      bodyFieldMaterial.size =
        bodyFieldBaseSize *
        (1 +
          (choiceLifeCoreBreath - 1) *
            (1.1 + perspectivePresenceBreath * 0.45)) *
        (1 +
          (forceRhythmBreath - 1) *
            (isLifeForce ? 1.6 : isPresenceStage ? 1.05 : 0)) *
        (isSymbolReveal
          ? 1.32
          : isHexagramImprint
            ? 1.24
            : isLifeForce
              ? 1.16
              : isPresenceStage
                ? 1.24
                : 1) *
        (isGenesisLifeOriginStarMapReveal
          ? 1.55
          : isLifeOriginStarMapReveal
            ? 2.1
            : 1);
      if (isStarBeastReveal) {
        spineMaterial.opacity =
          spineBaseOpacity * 0.85 * presenceSkeletonReveal;
        branchMaterial.opacity =
          branchBaseOpacity *
          0.7 *
          Math.max(
            0,
            Math.min(1, (presenceSkeletonRevealRaw - 0.34) / 0.66),
          );
        bodyFieldMaterial.opacity += presenceBodyReveal * 0.08;
      }
      bodyField.scale.setScalar(
        isPresenceStage
          ? (0.98 +
              perspectiveBodyCohesion * 0.06 +
              (choiceLifeCoreBreath - 1) * 0.4) *
              realityRecoveryBodyRhythm *
              (1 -
                choiceLifePauseWeight * 0.012 +
                choiceResponseSpaceProgress * 0.008)
          : 1,
      );
      coreLight.intensity =
        sceneProjection.lifeCore.intensity *
        lifeStarCore.coreInfluence.lightFlowReach *
        (isMoonOrigin
          ? 0.28
          : isStarRiver
            ? 0.52
            : isTimeResonance
              ? 0.68
              : isSymbolReveal
                ? 0.74
                : isHexagramImprint
                  ? 0.66
                    : isLifeForce
                    ? 0.86
                    : isStarBeastReveal
                      ? 0.78
                      : isCompletion
                        ? 0.76
                    : 0.68) *
        (0.94 + forceStability * 0.08) *
        (0.92 +
          sceneProjection.lifePresence.corePresence.coherence * 0.08 * breath);
      coreLight.intensity *= perspectiveCoreDimming;
      coreLight.intensity *= isPresenceStage
        ? (0.72 + recognitionCenterInfluence * 0.04) * recognitionCoreVisibility
        : 1;
      coreLight.intensity *= isCompletion
        ? 1 +
          recognitionAttentionProgress * 0.035 +
          recognitionResponseWave * 0.08 +
          recognizedLifeRelationshipContinuity * 0.07 +
          lifeWhisperResponseWave * 0.055 +
          lifeWhisperRelationshipSettled * 0.018 +
          realityEntryCarryWave * 0.06
        : 1;
      coreLight.intensity *=
        1 -
        choiceLifePauseWeight * 0.035 +
        choiceResponseSpaceProgress * 0.025;
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
      lifeOriginStarTexture?.dispose();
      inkWashLifeAuraTexture?.dispose();
      renderer.dispose();
      scene.clear();
    },
  });

  return Object.freeze({
    status: "READY",
    source: "genesis_webgl_renderer_core",
    controller,
    boundary: GENESIS_WEBGL_RENDERER_CORE_BOUNDARY,
  });
}
