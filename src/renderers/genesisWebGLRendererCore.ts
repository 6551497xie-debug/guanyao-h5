import {
  AdditiveBlending,
  AmbientLight,
  BufferGeometry,
  Color,
  Float32BufferAttribute,
  Group,
  Line,
  LineBasicMaterial,
  LineLoop,
  LineSegments,
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

  const sceneProjection = projectPersonalStarBeastRenderPlanToWebGLScene(
    plan,
    input.timeSequenceRecognitionProjection ?? null,
    input.birthMansionIgnitionProjection ?? null,
    input.morphologicalFieldAlignmentProjection ?? null,
    input.lifeForceInfusionProjection ?? null,
    input.personalRevealProjection ?? null,
    input.realityPressureProjection ?? null,
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
  const isLifeCoordinateStage = isSymbolReveal;
  const isLifeDirectionStage = isHexagramImprint || isLifeForce;
  const isContinuityPresenceStage =
    isMoonOrigin || isStarRiver || isTimeResonance;
  const isPresenceStage = isStarBeastReveal || isCompletion;
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
  const recognitionCoreVisibility = isStarBeastReveal
    ? 0.4 + recognitionCenterInfluence * 0.05
    : isCompletion
      ? 0.34 + recognitionCenterInfluence * 0.04
      : 1;
  const perspectiveCoreDimming =
    isMoonOrigin || isStarRiver || isTimeResonance
      ? 1 - perspectiveCoreSuppression * 0.42
      : isStarBeastReveal
        ? 0.9 - perspectiveSubjectForeground * 0.04
        : isCompletion
          ? 0.84 - perspectiveRecognitionStability * 0.04
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
                ? 0.023
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
  const mansionCoordinateGroup = new Group();
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
      retainMotherContinuityOrbit)
  ) {
    const birthCoordinateRevealed =
      mansionCoordinateVisualLayer.visibility ===
      "BIRTH_MANSION_COORDINATE_REVEALED";
    const birthCoordinateVisible =
      birthCoordinateRevealed || retainMotherContinuityOrbit;
    const coordinateDepth = Math.abs(
      camera.position.z - mansionCoordinateVisualLayer.birthCoordinate.z,
    );
    const pixelsPerWorld =
      input.height /
      (2 * Math.tan((camera.fov * Math.PI) / 360) * coordinateDepth);
    coordinateBaseScaleX =
      Math.min(input.width * 0.43, 168) / (2.65 * pixelsPerWorld);
    coordinateBaseScaleY =
      Math.min(input.width * 0.19, 74) / (1.32 * pixelsPerWorld);
    const keepBirthCoordinateInExistingField =
      coordinateFormationExpression?.phase === "SEEKING_TO_FOUND";
    const neutralCoordinates =
      birthCoordinateVisible && !keepBirthCoordinateInExistingField
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
      color: new Color(0xb9cbec),
      size:
        mansionCoordinateVisualLayer.fieldExpression.neutralPointSize *
        (isLifeCoordinateStage ? 1.14 : isLifeDirectionStage ? 1.12 : 1),
      sizeAttenuation: true,
      transparent: true,
      opacity: Math.min(
        0.78,
        mansionCoordinateVisualLayer.fieldExpression.neutralOpacity *
        (retainMotherContinuityOrbit ? 0.72 : 1) *
          (isLifeCoordinateStage
            ? 1.18
            : isLifeDirectionStage
              ? 1.2
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

    if (coordinateFormationExpression?.phase === "SEEKING_TO_FOUND") {
      const responseOffsets = [-6, -3, 3, 6] as const;
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
          size: 0.044,
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
        : birthPosition;
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
        color: new Color(0xd8c58e),
        transparent: true,
        opacity:
          retainMotherContinuityOrbit
            ? 0.18
            : coordinateFormationExpression.phase === "FOUND"
            ? coordinateFormationExpression.birthAxisOpacity
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
        : birthCoordinate;
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
        color: new Color(0xe7d4a1),
        size:
          mansionCoordinateVisualLayer.birthCoordinateExpression.pointSize,
        sizeAttenuation: true,
        transparent: true,
        opacity:
          retainMotherContinuityOrbit
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
    directionFieldParticleCount = directionFieldExpression.lineCount * 14;
    directionFieldPositions = new Float32Array(
      directionFieldParticleCount * 3,
    );
    for (let index = 0; index < directionFieldParticleCount; index += 1) {
      const progress =
        (((index * 37) % directionFieldParticleCount) + 0.5) /
        directionFieldParticleCount;
      const laneBase =
        ((index % directionFieldExpression.lineCount) /
          Math.max(1, directionFieldExpression.lineCount - 1) -
          0.5) *
        2;
      const lane =
        laneBase * 0.44 +
        Math.sin(index * 1.618 + progress * Math.PI * 2) * 0.56;
      const spread =
        Math.sin(progress * Math.PI) *
        directionFieldExpression.parallelSpread *
        0.42;
      const offset = index * 3;
      directionFieldPositions[offset] =
        directionOriginX +
        axisX * directionSourceReach * progress +
        perpendicularX * lane * spread;
      directionFieldPositions[offset + 1] =
        directionOriginY +
        axisY * directionSourceReach * progress +
        perpendicularY * lane * spread;
      directionFieldPositions[offset + 2] =
        directionOriginZ + Math.sin(progress * Math.PI) * 0.18;
    }
    const geometry = new BufferGeometry();
    directionFieldPositionAttribute = new Float32BufferAttribute(
      directionFieldPositions,
      3,
    );
    geometry.setAttribute("position", directionFieldPositionAttribute);
    directionFieldMaterial = new PointsMaterial({
      color: new Color(0x9ebee4),
      size: isLifeForce ? 0.038 : 0.032,
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

  const positivePresenceTips: [number, number, number][] = [];
  const negativePresenceTips: [number, number, number][] = [];
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
        ? 0.78 - perspectiveBodyCohesion * 0.1
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
    (side > 0 ? positivePresenceTips : negativePresenceTips).push(tip);
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
    [...positivePresenceTips, ...negativePresenceTips].forEach((tip) => {
      tip[0] -= presenceCenterX;
      tip[1] -= presenceCenterY;
    });
  }

  const spineGeometry = new BufferGeometry();
  spineGeometry.setAttribute(
    "position",
    new Float32BufferAttribute(spinePositions, 3),
  );
  const branchGeometry = new BufferGeometry();
  branchGeometry.setAttribute(
    "position",
    new Float32BufferAttribute(branchPositions, 3),
  );
  const nodeGeometry = new BufferGeometry();
  nodeGeometry.setAttribute(
    "position",
    new Float32BufferAttribute(nodePositions, 3),
  );
  const anchorColor = new Color().setHSL(
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
                ? 2
              : isCompletion
                  ? 2.2
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
    ? 0.22 + spatialApproachProgress * 0.08
    : isCompletion
      ? 0.34
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
    (0.82 + revealOpacity * 0.18 - pressureBoundaryLoad * 0.08);
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
    (0.68 + revealOpacity * 0.2 - pressureBoundaryLoad * 0.12);
  const spineLine = new Line(
    spineGeometry,
    new LineBasicMaterial({
      color: anchorColor,
      transparent: true,
      opacity: isPresenceStage
        ? Math.max(spineOpacity, isCompletion ? 0.5 : 0.42)
        : spineOpacity,
      blending: AdditiveBlending,
    }),
  );
  const branchLines = new LineSegments(
    branchGeometry,
    new LineBasicMaterial({
      color: anchorColor,
      transparent: true,
      opacity: isPresenceStage
        ? Math.max(branchOpacity, isCompletion ? 0.4 : 0.34)
        : branchOpacity,
      blending: AdditiveBlending,
    }),
  );
  spineLine.visible = !isContinuityPresenceStage;
  branchLines.visible = !isContinuityPresenceStage;
  const structurePoints = new Points(
    nodeGeometry,
    new PointsMaterial({
      color: anchorColor,
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
        (0.7 + revealOpacity * 0.16 - pressureBoundaryLoad * 0.08),
      blending: AdditiveBlending,
      depthWrite: false,
    }),
  );
  const structurePointMaterial = structurePoints.material as PointsMaterial;
  const bodyFieldPositions = new Float32Array(spineSegments * 12);
  const bodyFieldWidth =
    (0.05 + lifePresence.morphologicalField.enclosure * 0.08) *
    (0.72 + perspectiveBodyCohesion * 0.8) *
    (isPresenceStage ? 1 + (recognitionSubjectWeight - 1) * 0.8 : 1);
  for (let index = 0; index < spineSegments; index += 1) {
    const sourceOffset = index * 3;
    const targetOffset = index * 12;
    const sourceX = spinePositions[sourceOffset];
    const sourceY = spinePositions[sourceOffset + 1];
    const sourceZ = spinePositions[sourceOffset + 2];
    const offsets = [-1, -0.42, 0.42, 1];
    offsets.forEach((offset, offsetIndex) => {
      const offsetTarget = targetOffset + offsetIndex * 3;
      bodyFieldPositions[offsetTarget] = sourceX + perpendicularX * bodyFieldWidth * offset;
      bodyFieldPositions[offsetTarget + 1] =
        sourceY + perpendicularY * bodyFieldWidth * offset;
      bodyFieldPositions[offsetTarget + 2] = sourceZ + (offsetIndex % 2 === 0 ? 0.025 : -0.025);
    });
  }
  const bodyFieldGeometry = new BufferGeometry();
  bodyFieldGeometry.setAttribute(
    "position",
    new Float32BufferAttribute(bodyFieldPositions, 3),
  );
  const bodyFieldMaterial = new PointsMaterial({
    color: anchorColor,
    size:
      lifePresence.stellarSkeleton.nodeScale *
      (1.04 + (isPresenceStage ? (recognitionSubjectWeight - 1) * 0.34 : 0)) *
      (isPresenceStage ? 1.08 : 1),
    transparent: true,
    opacity: isPresenceStage
      ? 0.22 + perspectiveBodyCohesion * 0.3 +
        (recognitionSubjectWeight - 1) * 0.18
      : 0,
    blending: AdditiveBlending,
    depthWrite: false,
  });
  const bodyField = new Points(bodyFieldGeometry, bodyFieldMaterial);
  bodyField.visible = isPresenceStage;
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
  const tipAxisPosition = (tip: [number, number, number]) =>
    tip[0] * axisX + tip[1] * axisY;
  positivePresenceTips.sort((a, b) => tipAxisPosition(a) - tipAxisPosition(b));
  negativePresenceTips.sort((a, b) => tipAxisPosition(b) - tipAxisPosition(a));
  const presenceEnvelopeGeometry = new BufferGeometry();
  presenceEnvelopeGeometry.setAttribute(
    "position",
    new Float32BufferAttribute(
      [...positivePresenceTips, ...negativePresenceTips].flat(),
      3,
    ),
  );
  const presenceEnvelopeMaterial = new LineBasicMaterial({
    color: new Color(0xe7d4a1),
    transparent: true,
    opacity: isPresenceStage ? (isCompletion ? 0.7 : 0.58) : 0,
    blending: AdditiveBlending,
    depthWrite: false,
  });
  const presenceEnvelope = new LineLoop(
    presenceEnvelopeGeometry,
    presenceEnvelopeMaterial,
  );
  presenceEnvelope.visible = isPresenceStage;
  presenceEnvelope.position.z = 0.12;
  presenceEnvelope.scale.setScalar(1.15);
  const presenceEnvelopeGlowMaterial = new LineBasicMaterial({
    color: new Color(0xe7d4a1),
    transparent: true,
    opacity: isPresenceStage ? (isCompletion ? 0.2 : 0.14) : 0,
    blending: AdditiveBlending,
    depthWrite: false,
  });
  const presenceEnvelopeGlow = new LineLoop(
    presenceEnvelopeGeometry,
    presenceEnvelopeGlowMaterial,
  );
  presenceEnvelopeGlow.visible = isPresenceStage;
  presenceEnvelopeGlow.position.z = 0.1;
  presenceEnvelopeGlow.scale.setScalar(1.3);
  const structureGroup = new Group();
  structureGroup.scale.setScalar(
    sceneProjection.formField.boundaryScale *
      fieldPoseScale *
      (1 + lifePresence.morphologicalField.spatialContraction * 0.22) *
      (1 + (fieldEnvelopeScale - 1) * 0.32) *
      (1 + (forceAggregation - 0.5) * 0.18) *
      (1 + revealCoreConvergence * 0.1) *
      (1 - pressureFieldCompression * 0.08) *
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
    lifePresence.morphologicalField.flowDirection * 0.04 +
    pressureFlowDeflection * 0.025;
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
    spineLine,
    branchLines,
    structurePoints,
    bodyField,
    pressureTrace,
    presenceEnvelope,
    presenceEnvelopeGlow,
  );
  // At the Genesis threshold, carry only the luminous joints of the same
  // stellar skeleton. Lines and animal outline remain absent until the later
  // manifestation stages earn them.
  structureGroup.visible =
    !isLifeCoordinateStage && !isLifeDirectionStage;
  root.add(structureGroup);

  // The first direction response belongs to the coordinate itself. Hexagram
  // strokes and animal construction remain absent from these two screens.
  const imprintTraceGroup = new Group();

  const coreColor = new Color(LIFE_UNIVERSE_CORE_IDENTITY.threeColor);
  // At the production camera distance this resolves to the same ~24px core
  // used by the entrance and Launch at the 390px acceptance viewport.
  const coreRadius = 0.14;
  const coreStageOpacity = isMoonOrigin
    ? 0.46
    : isStarRiver
      ? 0.48
      : isTimeResonance
        ? 0.54
        : isSymbolReveal
          ? 0.58
          : isHexagramImprint
            ? 0.52
            : isLifeForce
              ? 0.66
              : isStarBeastReveal
                ? 0.4
                : isCompletion
                  ? 0.34
              : 0.72;
  const core = new Mesh(
    new SphereGeometry(coreRadius, 20, 20),
    new MeshBasicMaterial({
      color: coreColor,
      transparent: true,
      opacity: (coreStageOpacity +
        revealOpacity * 0.12 +
        lifeStarCore.surfacePresence.surfaceVariation *
          (isMoonOrigin ? 0.22 : 0.7) -
        pressureCoreResistance * 0.04) *
        recognitionCoreVisibility *
        perspectiveCoreDimming *
        (0.72 + spatialContrast * 0.28),
      blending: AdditiveBlending,
    }),
  );
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
          ? 0.18
          : isLifeDirectionStage
            ? 0.16
            : isContinuityPresenceStage
              ? 0.3
              : 1) *
        recognitionCoreVisibility *
        perspectiveCoreDimming *
        (0.68 + spatialContrast * 0.32),
      blending: AdditiveBlending,
      depthWrite: false,
    }),
  );
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
  // Time enters the existing life core as a slower change of rhythm and
  // luminance. It must never introduce a new orbital ring around the life.
  const coreIdentityGroup = new Group();
  core.add(coreLight);
  coreIdentityGroup.add(coreHalo);
  coreIdentityGroup.add(coreSurface);
  coreIdentityGroup.add(core);
  root.add(coreIdentityGroup);

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

  const controller: GenesisWebGLRendererCoreController = Object.freeze({
    sceneProjection,
    renderFrame: (elapsedMilliseconds: number) => {
      if (disposed || contextState === "LOST") return;
      const elapsedSeconds =
        (Number.isFinite(elapsedMilliseconds)
          ? Math.max(0, elapsedMilliseconds)
          : 0) / 1000;
      const universeSeconds = performance.now() / 1000;
      let coordinateFormationProgress = 1;
      let coordinateIdentityBreath = 1;
      const directionRevealRaw = isHexagramImprint
        ? Math.min(1, Math.max(0, (elapsedSeconds - 0.58) / 1.42))
        : isLifeForce
          ? 1
          : 0;
      const directionRevealProgress =
        directionRevealRaw *
        directionRevealRaw *
        (3 - 2 * directionRevealRaw);
      const forceTendencyRaw = isLifeForce
        ? Math.min(1, Math.max(0, (elapsedSeconds - 0.18) / 1.8))
        : 0;
      const forceTendencyProgress =
        forceTendencyRaw *
        forceTendencyRaw *
        (3 - 2 * forceTendencyRaw);
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
          0.44 *
          (1 - birthRevealProgress * 0.72);
        material.size = 0.044 + responseStrength * 0.024;
      });
      if (
        birthCoordinateAxisMaterial !== null &&
        coordinateFormationExpression !== null
      ) {
        birthCoordinateAxisMaterial.opacity =
          retainMotherContinuityOrbit
            ? 0.18
            : coordinateFormationExpression.birthAxisOpacity *
              birthRevealProgress *
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
          2;
        const birthBreath =
          1 + Math.sin(birthPhase) * birthExpression.breathingAmplitude;
        coordinateIdentityBreath =
          1 +
          (birthBreath - 1) *
            birthRevealProgress *
            0.5;
        birthMansionPointMaterial.size =
          birthExpression.pointSize *
          birthBreath *
          (1 + birthDirectionResponse * 0.34) *
          (retainMotherContinuityOrbit
            ? 1
            : 0.82 + birthRevealProgress * 0.18);
        birthMansionPointMaterial.opacity =
          Math.min(
            1,
            birthExpression.opacity *
              (retainMotherContinuityOrbit ? 0.82 : birthRevealProgress) *
              (0.94 + Math.sin(birthPhase) * 0.06) *
              (1 + birthDirectionResponse * 0.18),
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
          ? 0.022 + forceDensity * 0.006
          : 0.018;
        const fieldReach =
          directionSourceReach *
          (isLifeForce ? 1 + forceDensity * 0.04 : 0.96);
        const fieldNarrowing = isLifeForce
          ? Math.max(0.46, 0.72 / forceAspect)
          : 1;
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
          // The axis establishes where the force comes from; it is not an
          // orbital path or a second identity light.
          const progress =
            1 - ((seed + universeSeconds * travelSpeed) % 1);
          const laneBase =
            ((index % directionFieldExpression.lineCount) /
              Math.max(1, directionFieldExpression.lineCount - 1) -
              0.5) *
            2;
          const lane =
            laneBase * 0.44 +
            Math.sin(index * 1.618 + progress * Math.PI * 2) * 0.56;
          const lateralBreath =
            Math.sin(progress * Math.PI) *
            directionFieldExpression.parallelSpread *
            0.32 *
            fieldNarrowing *
            responseBreath;
          const axialProgress =
            progress * progress * (3 - 2 * progress);
          const offset = index * 3;
          directionFieldPositions[offset] =
            directionOriginX +
            axisX *
              (0.04 +
                fieldReach * axialProgress * directionRevealProgress) +
            perpendicularX *
              lane *
              lateralBreath *
              directionRevealProgress;
          directionFieldPositions[offset + 1] =
            directionOriginY +
            axisY *
              (0.04 +
                fieldReach * axialProgress * directionRevealProgress) +
            perpendicularY *
              lane *
              lateralBreath *
              directionRevealProgress;
          directionFieldPositions[offset + 2] =
            directionOriginZ +
            Math.sin(progress * Math.PI) *
              (isLifeForce ? 0.24 : 0.18) +
            axialProgress * 0.1 +
            ((index % 3) - 1) * 0.018;
        }
        directionFieldPositionAttribute.needsUpdate = true;
        directionFieldMaterial.opacity =
          (isLifeForce ? 0.24 + forceDensity * 0.08 : 0.28) *
          directionRevealProgress *
          (0.94 + (responseBreath - 1) * 1.5);
        directionFieldMaterial.size =
          (isLifeForce ? 0.034 + forceDensity * 0.006 : 0.03) *
          (0.96 + (responseBreath - 1));
        directionCoreBreath =
          1 +
          (responseBreath - 1) *
            directionRevealProgress *
            (isLifeForce ? 0.34 : 0.2);
        if (directionCoreBiasMaterial !== null) {
          directionCoreBiasMaterial.opacity =
            (0.038 + forceDensity * 0.02) *
            forceTendencyProgress *
            (0.94 + (responseBreath - 1) * 1.4);
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
      cosmicField.rotation.y = Math.sin(universeSeconds * 0.085) * 0.075;
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
            )
          : 0;
      const realityPressurePhase =
        universeSeconds * (0.11 + pressureTemporalWeight * 0.08) * Math.PI * 2;
      const realityPressurePulse =
        0.5 + Math.sin(realityPressurePhase) * 0.5;
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
        const pressureDepth = (star.z + 1.7) / 3.4;
        const pressureInfluence =
          realitySpacePressure *
          (0.38 + pressureDepth * 0.62) *
          (0.52 + Math.max(0, 1 - radialDistance / 4.2) * 0.48);
        const axialPosition =
          directedGravityX * axisX + directedGravityY * axisY;
        const lateralPosition =
          directedGravityX * perpendicularX +
          directedGravityY * perpendicularY;
        const compressedAxial =
          axialPosition *
          (1 - pressureFieldCompression * pressureInfluence * 0.14);
        const deflectedLateral =
          lateralPosition +
          pressureFlowDeflection *
            pressureInfluence *
            (0.12 + realityPressurePulse * 0.08) +
          pressureBoundaryLoad *
            pressureInfluence *
            (0.025 + realityPressurePulse * 0.035);
        cosmicPositions[offset] =
          axisX * compressedAxial + perpendicularX * deflectedLateral;
        cosmicPositions[offset + 1] =
          axisY * compressedAxial + perpendicularY * deflectedLateral;
        cosmicPositions[offset + 2] =
          star.z +
          Math.sin(universeSeconds * 0.13 + star.phase) *
            gravityInfluence *
            0.12 +
          Math.sin(realityPressurePhase + star.phase) *
            pressureInfluence *
            0.18;
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
        isMoonOrigin ? 0.2 : isStarRiver || isTimeResonance ? 0.18 : 0.12,
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
      const structureInfluence =
        1 +
        (breath - 1) *
          (lifeStarCore.coreInfluence.structureResponse +
            sceneProjection.lifePresence.corePresence.aggregationStrength *
              0.04);
      const presenceBreathScale = isPresenceStage
        ? 1 +
          Math.sin(rhythmPhase * 0.72 + 0.5) *
            (0.008 + perspectivePresenceBreath * 0.018)
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
                    ? 1.02
                    : isStarBeastReveal
                      ? 1.06
                      : isCompletion
                        ? 1.02
                        : 0.92);
      coreIdentityGroup.scale.setScalar(
        breath *
          coreObservationScale *
          coordinateIdentityBreath *
          directionCoreBreath,
      );
      core.scale.setScalar(1);
      coreSurface.scale.setScalar(1);
      coreHalo.scale.setScalar(1);
      structureGroup.scale.setScalar(
        sceneProjection.formField.boundaryScale *
          fieldPoseScale *
          (1 +
            sceneProjection.lifePresence.morphologicalField.spatialContraction *
              0.22) *
          (1 + (fieldEnvelopeScale - 1) * 0.32) *
          (1 + (forceAggregation - 0.5) * 0.18) *
          (1 + revealCoreConvergence * 0.1) *
          (1 - pressureFieldCompression * 0.08) *
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
        pressureFlowDeflection * 0.025 +
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
        structureGroup.rotation.z *= 0.34 - perspectiveCompletionStillness * 0.08;
        structureGroup.rotation.x =
          Math.sin(elapsedSeconds * 0.14) *
          (0.004 + perspectivePresenceBreath * 0.004);
        structureGroup.scale.x *=
          1.02 + perspectiveSubjectAxisStrength * 0.025;
        structureGroup.scale.y *= 1.01 + perspectiveBodyCohesion * 0.025;
      }
      if (pressureExpression !== null && isPresenceStage) {
        const pressurePhase =
          elapsedSeconds * (0.11 + pressureTemporalWeight * 0.08);
        const pressurePulse =
          0.5 + Math.sin(pressurePhase * Math.PI * 2) * 0.5;
        const pressureCompression =
          pressureFieldCompression * (0.024 + pressurePulse * 0.022);
        const pressureLift =
          pressureCoreResistance * (0.012 + pressurePulse * 0.018);
        structureGroup.scale.x *= 1 - pressureCompression;
        structureGroup.scale.y *= 1 + pressureLift;
        structureGroup.rotation.z +=
          pressureFlowDeflection * (0.018 + pressurePulse * 0.032);
        structureGroup.position.x =
          perpendicularX * pressureBoundaryLoad *
          (0.008 + pressurePulse * 0.018);
        structureGroup.position.y =
          perpendicularY * pressureBoundaryLoad *
          (0.008 + pressurePulse * 0.018);

        for (let index = 0; index < pressureTracePointCount; index += 1) {
          const traceProgress =
            ((pressurePhase * 0.38 - index * 0.045) % 1 + 1) % 1;
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
        pressureTraceMaterial.opacity =
          0.18 +
          pressureStructureResponse * 0.26 +
          pressurePulse * 0.24;
        pressureTraceMaterial.size =
          lifePresence.stellarSkeleton.nodeScale *
          (0.72 + pressureCoreResponse * 0.34 + pressurePulse * 0.18);
        (spineLine.material as LineBasicMaterial).opacity =
          Math.max(spineOpacity, isCompletion ? 0.5 : 0.42) *
          (0.9 + pressurePulse * 0.18);
        (branchLines.material as LineBasicMaterial).opacity =
          Math.max(branchOpacity, isCompletion ? 0.4 : 0.34) *
          (0.88 + pressurePulse * 0.14);
      }
      const stagePointOpacity = isSymbolReveal
        ? 0.86
        : isHexagramImprint
          ? 0.78
          : isLifeForce
            ? 0.92
            : isStarBeastReveal
              ? 0.72
              : isCompletion
                ? 0.66
                : isContinuityPresenceStage
                  ? 0.28
                  : 0.74;
      structurePointMaterial.opacity =
        stagePointOpacity +
        (isPresenceStage ? (recognitionSubjectWeight - 1) * 0.1 : 0) +
        lifeStarCore.coreInfluence.nodeBreathCoupling *
          0.16 *
          (0.94 + (breath - 1) * 2) -
        (isPresenceStage
          ? perspectiveBodyCohesion * 0.08 * (0.96 + (breath - 1) * 2)
          : 0) +
        pressureBoundaryLoad * 0.06;
      structurePointMaterial.size =
        lifePresence.stellarSkeleton.nodeScale *
        (0.96 +
          lifeStarCore.coreInfluence.nodeBreathCoupling * 0.12 * breath +
          (isPresenceStage ? perspectiveBodyCohesion * 0.34 : 0)) *
        (isPresenceStage ? 0.92 : 1);
      bodyFieldMaterial.opacity = isPresenceStage
        ? 0.22 +
          perspectiveBodyCohesion * 0.3 +
          (recognitionSubjectWeight - 1) * 0.18 +
          Math.sin(rhythmPhase * 0.72 + 0.5) *
            (0.008 + perspectivePresenceBreath * 0.012)
        : 0;
      presenceEnvelopeMaterial.opacity = isPresenceStage
        ? (isCompletion ? 0.7 : 0.58) *
          (0.94 + (breath - 1) * 1.8)
        : 0;
      presenceEnvelopeGlowMaterial.opacity = isPresenceStage
        ? (isCompletion ? 0.2 : 0.14) *
          (0.96 + (breath - 1) * 1.2)
        : 0;
      bodyField.scale.setScalar(
        isPresenceStage
          ? 0.98 + perspectiveBodyCohesion * 0.06 + (breath - 1) * 0.4
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
                        ? 0.68
                    : 0.68) *
        (0.94 + forceStability * 0.08) *
        (0.92 +
          sceneProjection.lifePresence.corePresence.coherence * 0.08 * breath);
      coreLight.intensity *= perspectiveCoreDimming;
      coreLight.intensity *= isPresenceStage
        ? (0.72 + recognitionCenterInfluence * 0.04) * recognitionCoreVisibility
        : 1;
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
    source: "genesis_webgl_renderer_core",
    controller,
    boundary: GENESIS_WEBGL_RENDERER_CORE_BOUNDARY,
  });
}
