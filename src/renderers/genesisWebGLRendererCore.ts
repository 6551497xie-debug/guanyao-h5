import {
  AdditiveBlending,
  AmbientLight,
  BufferGeometry,
  Color,
  Float32BufferAttribute,
  Group,
  Line,
  LineBasicMaterial,
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
  TorusGeometry,
  WebGLRenderer,
} from "three";
import { createIsolatedWebGLPrototypeRenderPlanReference } from "../services/isolatedWebGLPrototypeRenderPlanReference";
import { projectPersonalStarBeastRenderPlanToLifePresence } from "../services/personalStarBeastLifePresenceProjection";
import { projectLifePresenceToLifeStarCore } from "../services/personalStarBeastLifeStarCoreProjection";
import type { GenesisTimeSequenceRecognitionProjection } from "../types/genesisTimeSequenceRecognitionProjection";
import type { GenesisBirthMansionIgnitionProjection } from "../types/genesisBirthMansionIgnitionProjection";
import type { GenesisFourSymbolAlignmentProjection } from "../types/genesisFourSymbolAlignmentProjection";
import type { GenesisLifeForceInfusionProjection } from "../types/genesisLifeForceInfusionProjection";
import type { GenesisPersonalRevealProjection } from "../types/genesisPersonalRevealProjection";
import type { GenesisRealityPressureProjection } from "../types/genesisRealityPressureProjection";
import type { PersonalStarBeastRenderPlan } from "../types/personalStarBeastRenderPlan";
import type { GenesisRendererVisualRealization } from "../types/genesisRendererVisualRealization";
import type { GenesisPerspectiveCalibration } from "../types/genesisPerspectiveCalibration";
import type { GenesisPresenceRecognitionCalibration } from "../types/genesisPresenceRecognitionCalibration";
import type { GenesisSpatialDistanceCalibration } from "../types/genesisSpatialDistanceCalibration";
import type {
  GenesisWebGLRendererCoreBoundary,
  GenesisWebGLRendererCoreController,
  GenesisWebGLRendererCoreFallback,
  GenesisWebGLRendererCoreInput,
  GenesisWebGLRendererCoreResult,
  GenesisWebGLRendererCoreSceneProjection,
} from "../types/genesisWebGLRendererCore";

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
  genesisVisualRealization: GenesisRendererVisualRealization | null = null,
  genesisPerspectiveCalibration: GenesisPerspectiveCalibration | null = null,
  genesisPresenceRecognitionCalibration: GenesisPresenceRecognitionCalibration | null = null,
  genesisSpatialDistanceCalibration: GenesisSpatialDistanceCalibration | null = null,
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
  const recognitionCoreVisibility = isPresenceStage
    ? 0.48 + recognitionCenterInfluence * 0.08
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
  const cosmicParticleCount = isMoonOrigin
    ? Math.round(
        sceneProjection.cosmicField.particleCount *
          0.62 *
          (0.86 + perspectiveMoonWeight * 0.12),
      )
    : isStarRiver
      ? Math.round(
          sceneProjection.cosmicField.particleCount *
            1.18 *
            (0.9 + perspectiveStarWeight * 0.2),
        )
      : isTimeResonance
        ? Math.round(
            sceneProjection.cosmicField.particleCount *
              (0.96 + perspectiveTimeWeight * 0.1),
          )
      : isSymbolReveal
        ? Math.round(sceneProjection.cosmicField.particleCount * 1.28)
        : isHexagramImprint
          ? Math.round(sceneProjection.cosmicField.particleCount * 1.12)
            : isLifeForce
              ? Math.round(sceneProjection.cosmicField.particleCount * 1.04)
              : isPresenceStage
                ? Math.round(
                    sceneProjection.cosmicField.particleCount *
                      (0.78 + recognitionCosmicSupportWeight * 0.22),
                  )
              : sceneProjection.cosmicField.particleCount;
  const cosmicPositions = new Float32Array(cosmicParticleCount * 3);
  const moonCosmicSpread =
    sceneProjection.cosmicField.spread *
    (0.56 + perspectiveBackgroundDepth * 0.12) *
    (0.92 + spatialDepthScale * 0.08);
  for (
    let index = 0;
    index < cosmicParticleCount;
    index += 1
  ) {
    const offset = index * 3;
    if (
      isStarRiver ||
      isTimeResonance ||
      isSymbolReveal ||
      isHexagramImprint ||
      isLifeForce ||
      isPresenceStage
    ) {
      const angle = random() * Math.PI * 2;
      const radius = 1.25 + random() * 2.5;
      cosmicPositions[offset] = Math.cos(angle) * radius;
      cosmicPositions[offset + 1] = Math.sin(angle) * radius * 0.48;
      cosmicPositions[offset + 2] = (random() - 0.5) * 3.4;
    } else {
      cosmicPositions[offset] =
        (random() - 0.5) *
        (isMoonOrigin ? moonCosmicSpread : sceneProjection.cosmicField.spread);
      cosmicPositions[offset + 1] =
        (random() - 0.5) *
        (isMoonOrigin ? moonCosmicSpread : sceneProjection.cosmicField.spread) *
          0.72;
      cosmicPositions[offset + 2] = (random() - 0.5) * 4;
    }
  }
  const cosmicGeometry = new BufferGeometry();
  cosmicGeometry.setAttribute(
    "position",
    new Float32BufferAttribute(cosmicPositions, 3),
  );
  const cosmicMaterial = new PointsMaterial({
    color: new Color().setHSL(sceneProjection.formField.hue, 0.42, 0.7),
    size: isMoonOrigin
      ? 0.018
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
  cosmicField.position.z = -(spatialDepthScale - 0.78) * 0.18;
  root.add(cosmicField);

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
    const branchOffset = index * 12;
    branchPositions.set([...origin, ...mid, ...mid, ...tip], branchOffset);
    const nodeOffset = (spineSegments + index) * 3;
    nodePositions[nodeOffset] = tip[0];
    nodePositions[nodeOffset + 1] = tip[1];
    nodePositions[nodeOffset + 2] = tip[2];
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
                ? 1.7
              : isCompletion
                  ? 1.5
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
    ? 1.06 + realizationProgress * 0.08
    : isCompletion
      ? 1.02
      : 1;
  const spineLine = new Line(
    spineGeometry,
    new LineBasicMaterial({
      color: anchorColor,
      transparent: true,
      opacity:
        sceneProjection.mansionStructure.lineOpacity *
        structureOpacityScale *
        perspectiveStructureWeight *
        formationContinuityScale *
        subjectForegroundScale *
        distanceStructureScale *
        (1 + perspectiveBodyCohesion * 0.14) *
        (1 + perspectiveSubjectAxisStrength * 0.3) *
        (isPresenceStage ? 1 + (recognitionSubjectWeight - 1) * 0.34 : 1) *
        (0.82 + revealOpacity * 0.18 - pressureBoundaryLoad * 0.08),
      blending: AdditiveBlending,
    }),
  );
  const branchLines = new LineSegments(
    branchGeometry,
    new LineBasicMaterial({
      color: anchorColor,
      transparent: true,
      opacity:
        sceneProjection.mansionStructure.lineOpacity *
        structureOpacityScale *
        perspectiveStructureWeight *
        formationContinuityScale *
        subjectForegroundScale *
        distanceStructureScale *
        (1 + perspectiveBodyCohesion * 0.14) *
        (isPresenceStage ? 1 + (recognitionSubjectWeight - 1) * 0.26 : 1) *
        (0.82 + perspectiveBodyCohesion * 0.18) *
        (0.68 + revealOpacity * 0.2 - pressureBoundaryLoad * 0.12),
      blending: AdditiveBlending,
    }),
  );
  const structurePoints = new Points(
    nodeGeometry,
    new PointsMaterial({
      color: anchorColor,
      size:
        lifePresence.stellarSkeleton.nodeScale *
        (0.96 + spatialEdgeDefinition * 0.08),
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
      (1.04 + (isPresenceStage ? (recognitionSubjectWeight - 1) * 0.34 : 0)),
    transparent: true,
    opacity: isPresenceStage
      ? 0.14 + perspectiveBodyCohesion * 0.24 +
        (recognitionSubjectWeight - 1) * 0.18
      : 0,
    blending: AdditiveBlending,
    depthWrite: false,
  });
  const bodyField = new Points(bodyFieldGeometry, bodyFieldMaterial);
  bodyField.visible = isPresenceStage;
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
  structureGroup.add(spineLine, branchLines, structurePoints, bodyField);
  structureGroup.visible = !isMoonOrigin;
  root.add(structureGroup);

  const imprintTraceGroup = new Group();
  if (isHexagramImprint) {
    for (let index = 0; index < 6; index += 1) {
      const startProgress = 0.08 + index * 0.14;
      const first = getSpinePoint(startProgress);
      const second = getSpinePoint(Math.min(0.98, startProgress + 0.07));
      const third = getSpinePoint(Math.min(0.99, startProgress + 0.14));
      const offset = index % 2 === 0 ? 1 : -1;
      const offsetX = perpendicularX * offset * 0.08;
      const offsetY = perpendicularY * offset * 0.08;
      const imprintGeometry = new BufferGeometry();
      imprintGeometry.setAttribute(
        "position",
        new Float32BufferAttribute(
          [
            first[0] + offsetX,
            first[1] + offsetY,
            first[2] + index * 0.012,
            second[0] + offsetX * 1.15,
            second[1] + offsetY * 1.15,
            second[2] + index * 0.012,
            third[0] + offsetX * 0.72,
            third[1] + offsetY * 0.72,
            third[2] + index * 0.012,
          ],
          3,
        ),
      );
      imprintTraceGroup.add(
        new Line(
          imprintGeometry,
          new LineBasicMaterial({
            color: new Color(0xb8a36e),
            transparent: true,
            opacity:
              0.12 +
              perspectiveMemorySedimentation * 0.18 +
              index * (0.008 + perspectiveMemorySedimentation * 0.006),
            blending: AdditiveBlending,
          }),
        ),
      );
    }
    imprintTraceGroup.position.z = 0.04;
    root.add(imprintTraceGroup);
  }

  const coreColor = isMoonOrigin
    ? new Color(0xd8d2c4)
    : new Color().setHSL(sceneProjection.lifeCore.hue, 0.76, 0.7);
  const coreRadius = isMoonOrigin
    ? 0.34 + lifeStarCore.surfacePresence.innerLayerDepth * 0.12
    : (0.1 + lifeStarCore.surfacePresence.innerLayerDepth * 0.42) *
      (isPresenceStage ? 0.78 : 1);
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
                ? 0.62
                : isCompletion
                  ? 0.56
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
      coreRadius * (1.18 + lifeStarCore.surfacePresence.surfaceVariation * 0.4),
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
      coreRadius * lifeStarCore.surfacePresence.atmosphereRadius,
      18,
      18,
    ),
    new MeshBasicMaterial({
      color: coreColor,
      transparent: true,
      opacity:
        lifeStarCore.surfacePresence.atmosphereOpacity *
        (isMoonOrigin ? 0.58 : 1) *
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
  const timeRing = isTimeResonance
    ? new Mesh(
        new TorusGeometry(coreRadius * 1.72, 0.012, 8, 96),
        new MeshBasicMaterial({
          color: new Color(0xcdbb8f),
          transparent: true,
          opacity: 0.32,
          blending: AdditiveBlending,
          depthWrite: false,
        }),
      )
    : null;
  core.add(coreLight);
  root.add(coreHalo);
  root.add(coreSurface);
  root.add(core);
  if (timeRing !== null) root.add(timeRing);

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
      const presenceRotation = isCompletion
        ? 0.004 *
          (1 - perspectiveCompletionStillness * 0.78 - recognitionStillness * 0.06)
        : isStarBeastReveal
          ? sceneProjection.motion.rotationSpeed *
            (0.18 - perspectiveRecognitionStability * 0.035 - recognitionHold * 0.018)
          : sceneProjection.motion.rotationSpeed;
      root.rotation.y = elapsedSeconds * presenceRotation;
      let cosmicFieldScale = 1;
      let cosmicFieldOpacity = sceneProjection.cosmicField.opacity;
      cosmicFieldScale *=
        0.98 + spatialDepthScale * 0.012 + spatialApproachProgress * 0.008;
      cosmicFieldOpacity *= 0.82 + spatialContrast * 0.12 + spatialApproachProgress * 0.06;
      if (timeSequenceRecognition !== null) {
        const recognitionPhase =
          (elapsedSeconds /
            timeSequenceRecognition.temporalRhythm.periodSeconds) *
            Math.PI *
            2 +
          timeSequenceRecognition.temporalRhythm.phaseOffset;
        const recognitionBreath =
          1 +
          Math.sin(recognitionPhase) *
            timeSequenceRecognition.temporalRhythm.breathingAmplitude;
        cosmicField.rotation.z =
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
      } else {
        cosmicField.rotation.z = elapsedSeconds * 0.004;
      }
      if (isStarRiver) {
        cosmicField.rotation.z += elapsedSeconds * 0.0025;
        cosmicFieldScale *= 1.02 + realizationProgress * 0.04;
        cosmicFieldOpacity *= 1.08;
      }
      if (isMoonOrigin) {
        cosmicField.rotation.z *= 0.35;
        cosmicFieldOpacity *= 0.72;
      }
      if (isTimeResonance) {
        const timeGathering =
          1 +
          Math.sin(elapsedSeconds * 0.22) *
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
        cosmicField.rotation.z += elapsedSeconds * 0.0035;
        cosmicFieldScale *= 1.03 + Math.sin(elapsedSeconds * 0.16) * 0.018;
        cosmicFieldOpacity *= 1.04;
      }
      if (isHexagramImprint) {
        cosmicField.rotation.z += elapsedSeconds * 0.0018;
        cosmicFieldScale *= 0.99 + Math.sin(elapsedSeconds * 0.18) * 0.014;
        cosmicFieldOpacity *= 0.92 + realizationProgress * 0.08;
      }
      if (isLifeForce) {
        cosmicField.rotation.z += elapsedSeconds * 0.0042;
        cosmicFieldScale *= 1.01 + Math.sin(elapsedSeconds * 0.42) * 0.022;
        cosmicFieldOpacity *= 1.02;
      }
      if (isStarBeastReveal) {
        cosmicField.rotation.z += elapsedSeconds * 0.0012;
        cosmicFieldScale *=
          1.02 + Math.sin(elapsedSeconds * 0.2) * (0.008 + perspectivePresenceBreath * 0.006);
        cosmicFieldOpacity *= 0.98 + perspectiveRecognitionStability * 0.04;
      }
      if (isCompletion) {
        cosmicField.rotation.z *= 0.16 - perspectiveCompletionStillness * 0.04;
        cosmicFieldScale *= 1.01 + perspectiveRecognitionStability * 0.01;
        cosmicFieldOpacity *= 0.96 + perspectiveRecognitionStability * 0.04;
      }
      if (isPresenceStage) {
        cosmicFieldOpacity *= 0.82 + recognitionCosmicSupportWeight * 0.12;
        cosmicFieldScale *= 0.99 + recognitionCosmicSupportWeight * 0.01;
      }
      if (birthMansionIgnition !== null) {
        const ignitionPhase =
          (elapsedSeconds / birthMansionIgnition.temporalRhythm.periodSeconds) *
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
      cosmicPointMaterial.opacity = cosmicFieldOpacity;
      const rhythmPhase =
        (elapsedSeconds / lifeStarCore.temporalRhythm.periodSeconds) *
        Math.PI *
        2;
      const breath =
        1 +
          Math.sin(rhythmPhase) *
            lifeStarCore.temporalRhythm.breathingAmplitude;
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
      const surfaceVariation =
        0.96 +
        Math.sin(rhythmPhase * 0.72 + 0.8) *
          lifeStarCore.temporalRhythm.variationAmount;
      core.scale.setScalar(
        breath *
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
                          : 0.92),
      );
      coreSurface.scale.setScalar(surfaceVariation);
      coreHalo.scale.setScalar(
        lifeStarCore.surfacePresence.atmosphereRadius *
          (0.94 + breath * 0.06),
      );
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
      const stagePointOpacity = isSymbolReveal
        ? 0.86
        : isHexagramImprint
          ? 0.78
          : isLifeForce
            ? 0.92
            : isStarBeastReveal
              ? 0.98
              : isCompletion
                ? 0.9
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
          (isPresenceStage ? perspectiveBodyCohesion * 0.34 : 0));
      bodyFieldMaterial.opacity = isPresenceStage
        ? 0.14 +
          perspectiveBodyCohesion * 0.24 +
          (recognitionSubjectWeight - 1) * 0.18 +
          Math.sin(rhythmPhase * 0.72 + 0.5) *
            (0.008 + perspectivePresenceBreath * 0.012)
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
      if (timeRing !== null) {
        timeRing.rotation.z = elapsedSeconds * 0.035;
        timeRing.scale.setScalar(
          0.96 +
            Math.sin(elapsedSeconds * 0.22) * 0.025 +
            realizationProgress * 0.05,
        );
        (timeRing.material as MeshBasicMaterial).opacity =
          0.24 + Math.sin(elapsedSeconds * 0.22) * 0.04;
      }
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
