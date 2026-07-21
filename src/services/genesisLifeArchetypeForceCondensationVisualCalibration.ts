import type { LifeArchetypeCode } from "../types/originalSelfLifeSchema";
import type {
  GenesisLifeArchetypeForceCondensationPhase,
  GenesisLifeArchetypeForceCondensationVisualCalibration,
  GenesisLifeArchetypeForceCondensationVisualCalibrationBoundary,
  GenesisLifeArchetypeForceCondensationVisualCalibrationInput,
  GenesisLifeArchetypeForceCondensationVisualCalibrationResult,
} from "../types/genesisLifeArchetypeForceCondensationVisualCalibration";

export const GENESIS_LIFE_ARCHETYPE_FORCE_CONDENSATION_VISUAL_CALIBRATION_BOUNDARY: GenesisLifeArchetypeForceCondensationVisualCalibrationBoundary =
  Object.freeze({
    visualCalibrationOnly: true,
    existingLifeArchetypeProjectionOnly: true,
    existingDirectionFieldCalibrationOnly: true,
    directionAwakeningBeforeForceCondensation: true,
    forceExpressionNotPersonalityLabel: true,
    noLifeArchetypeCalculation: true,
    noMotherCodeCalculation: true,
    noArchetypeNameDisplay: true,
    noStarBeastGeneration: true,
    noStarBeastAmplification: true,
    noEngineInvocation: true,
    noSourceMutation: true,
    noTimelineSpeedMutation: true,
    noRendererAuthorizationMutation: true,
    noUIFlowMutation: true,
    noStorageWrite: true,
  });

type ForceProfile = Readonly<{
  density: number;
  radialBias: number;
  axisTiltRadians: number;
  formAspectRatio: number;
  flowRotationSpeed: number;
  breathingPeriodSeconds: number;
  breathingAmplitude: number;
  responseMessage: string;
}>;

const FORCE_PROFILE_BY_ARCHETYPE: Readonly<Record<LifeArchetypeCode, ForceProfile>> =
  Object.freeze({
    QIAN: Object.freeze({ density: 0.7, radialBias: 0.12, axisTiltRadians: 0.2, formAspectRatio: 1.12, flowRotationSpeed: 0.034, breathingPeriodSeconds: 4.8, breathingAmplitude: 0.06, responseMessage: "生命力量正在凝聚为创造的倾向。" }),
    KUN: Object.freeze({ density: 0.9, radialBias: -0.02, axisTiltRadians: 0.04, formAspectRatio: 1.22, flowRotationSpeed: 0.012, breathingPeriodSeconds: 7.4, breathingAmplitude: 0.025, responseMessage: "生命力量正在凝聚为承载的厚度。" }),
    ZHEN: Object.freeze({ density: 0.76, radialBias: 0.08, axisTiltRadians: 0.38, formAspectRatio: 0.94, flowRotationSpeed: 0.052, breathingPeriodSeconds: 4.2, breathingAmplitude: 0.07, responseMessage: "生命力量正在凝聚为启动的节奏。" }),
    XUN: Object.freeze({ density: 0.62, radialBias: 0.06, axisTiltRadians: -0.26, formAspectRatio: 1.16, flowRotationSpeed: 0.028, breathingPeriodSeconds: 5.6, breathingAmplitude: 0.045, responseMessage: "生命力量正在凝聚为融入的流动。" }),
    KAN: Object.freeze({ density: 0.86, radialBias: -0.08, axisTiltRadians: -0.42, formAspectRatio: 0.82, flowRotationSpeed: 0.016, breathingPeriodSeconds: 7.8, breathingAmplitude: 0.03, responseMessage: "生命力量正在凝聚为穿越的深度。" }),
    LI: Object.freeze({ density: 0.66, radialBias: 0.1, axisTiltRadians: 0.32, formAspectRatio: 1.04, flowRotationSpeed: 0.042, breathingPeriodSeconds: 5, breathingAmplitude: 0.06, responseMessage: "生命力量正在凝聚为显明的光度。" }),
    GEN: Object.freeze({ density: 0.94, radialBias: -0.1, axisTiltRadians: 0.08, formAspectRatio: 1.28, flowRotationSpeed: 0.008, breathingPeriodSeconds: 8.2, breathingAmplitude: 0.02, responseMessage: "生命力量正在凝聚为守护的边界。" }),
    DUI: Object.freeze({ density: 0.6, radialBias: 0.04, axisTiltRadians: -0.18, formAspectRatio: 1.08, flowRotationSpeed: 0.038, breathingPeriodSeconds: 5.2, breathingAmplitude: 0.055, responseMessage: "生命力量正在凝聚为连接的回响。" }),
  });

const phaseFor = (
  activeVisualLayer: GenesisLifeArchetypeForceCondensationVisualCalibrationInput["activeVisualLayer"],
): GenesisLifeArchetypeForceCondensationPhase => {
  if (activeVisualLayer === "LIFE_FORCE") return "CONDENSING";
  if (
    activeVisualLayer === "STAR_BEAST_REVEAL" ||
    activeVisualLayer === "COMPLETION"
  ) {
    return "ESTABLISHED";
  }
  return "HIDDEN";
};

const unavailable = (
  input: GenesisLifeArchetypeForceCondensationVisualCalibrationInput,
  reason:
    | "LIFE_ARCHETYPE_PROJECTION_REQUIRED"
    | "DIRECTION_FIELD_CALIBRATION_REQUIRED"
    | "SOURCE_CONTINUITY_INVALID",
): GenesisLifeArchetypeForceCondensationVisualCalibrationResult =>
  Object.freeze({
    status: "UNAVAILABLE" as const,
    reason,
    calibration: null,
    input,
    boundary:
      GENESIS_LIFE_ARCHETYPE_FORCE_CONDENSATION_VISUAL_CALIBRATION_BOUNDARY,
  });

export function calibrateGenesisLifeArchetypeForceCondensation(
  input: GenesisLifeArchetypeForceCondensationVisualCalibrationInput,
): GenesisLifeArchetypeForceCondensationVisualCalibrationResult {
  const projection = input.lifeArchetypeProjection;
  if (projection === null) {
    return unavailable(input, "LIFE_ARCHETYPE_PROJECTION_REQUIRED");
  }
  const directionCalibration = input.directionFieldCalibration;
  if (directionCalibration === null) {
    return unavailable(input, "DIRECTION_FIELD_CALIBRATION_REQUIRED");
  }
  if (
    projection.sourceReferenceId !== directionCalibration.sourceReferenceId ||
    projection.fourSymbolDirectionReference.sourceReferenceId !==
      directionCalibration.sourceReferenceId ||
    projection.fourSymbolDirectionReference.direction !==
      directionCalibration.direction ||
    projection.noLifeArchetypeCalculation !== true ||
    projection.noFallback !== true ||
    directionCalibration.noFourSymbolCalculation !== true
  ) {
    return unavailable(input, "SOURCE_CONTINUITY_INVALID");
  }

  const profile = FORCE_PROFILE_BY_ARCHETYPE[projection.lifeArchetype];
  const phase = phaseFor(input.activeVisualLayer);
  const calibration: GenesisLifeArchetypeForceCondensationVisualCalibration =
    Object.freeze({
      semanticRole:
        "GENESIS_LIFE_ARCHETYPE_FORCE_CONDENSATION_VISUAL_CALIBRATION",
      sourceReferenceId: projection.sourceReferenceId,
      motherCodeProfileReferenceId:
        projection.provenance.motherCodeProfileReferenceId,
      directionSourceReferenceId:
        projection.provenance.fourSymbolDirectionSourceReferenceId,
      archetypeProjectionReference: "GENESIS_LIFE_ARCHETYPE_PROJECTION",
      activeVisualLayer: input.activeVisualLayer,
      phase,
      forceCondensationExpression: Object.freeze({
        density: profile.density,
        radialBias: profile.radialBias,
        axisTiltRadians: profile.axisTiltRadians,
        formAspectRatio: profile.formAspectRatio,
        flowRotationSpeed: profile.flowRotationSpeed,
        ringOpacity:
          phase === "CONDENSING" ? 0.2 : phase === "ESTABLISHED" ? 0.07 : 0,
        breathingPeriodSeconds: profile.breathingPeriodSeconds,
        breathingAmplitude: profile.breathingAmplitude,
        ringCount: 3 as const,
      }),
      responseMessage: profile.responseMessage,
      provenance: Object.freeze({
        sourceReferenceId: projection.sourceReferenceId,
        motherCodeProfileReferenceId:
          projection.provenance.motherCodeProfileReferenceId,
        lifeArchetypeSource: projection.provenance.lifeArchetypeSource,
        directionSourceReferenceId:
          projection.provenance.fourSymbolDirectionSourceReferenceId,
        archetypeProjectionSemanticRole: projection.semanticRole,
      }),
      existingLifeArchetypeProjectionOnly: true,
      existingDirectionFieldCalibrationOnly: true,
      noLifeArchetypeCalculation: true,
      noMotherCodeCalculation: true,
      noPersonalityLabel: true,
      noArchetypeNameDisplay: true,
      noStarBeastGeneration: true,
      noStarBeastAmplification: true,
      noEngineInvocation: true,
      noSourceMutation: true,
      noTimelineMutation: true,
    });

  return Object.freeze({
    status: "AVAILABLE" as const,
    calibration,
    input,
    boundary:
      GENESIS_LIFE_ARCHETYPE_FORCE_CONDENSATION_VISUAL_CALIBRATION_BOUNDARY,
  });
}
