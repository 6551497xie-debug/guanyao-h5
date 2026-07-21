import type { GenesisFourSymbolDirectionFieldVisualCalibration } from "./genesisFourSymbolDirectionFieldVisualCalibration";
import type { GenesisLifeArchetypeProjection } from "./genesisLifeArchetypeProjection";
import type { GenesisRendererVisualRealizationLayer } from "./genesisRendererVisualRealization";

export type GenesisLifeArchetypeForceCondensationPhase =
  | "HIDDEN"
  | "CONDENSING"
  | "ESTABLISHED";

export type GenesisLifeArchetypeForceCondensationVisualCalibrationInput =
  Readonly<{
    lifeArchetypeProjection: GenesisLifeArchetypeProjection | null;
    directionFieldCalibration:
      | GenesisFourSymbolDirectionFieldVisualCalibration
      | null;
    activeVisualLayer: GenesisRendererVisualRealizationLayer | null;
  }>;

export type GenesisLifeArchetypeForceCondensationVisualCalibration =
  Readonly<{
    semanticRole: "GENESIS_LIFE_ARCHETYPE_FORCE_CONDENSATION_VISUAL_CALIBRATION";
    sourceReferenceId: string;
    motherCodeProfileReferenceId: string;
    directionSourceReferenceId: string;
    archetypeProjectionReference: "GENESIS_LIFE_ARCHETYPE_PROJECTION";
    activeVisualLayer: GenesisRendererVisualRealizationLayer | null;
    phase: GenesisLifeArchetypeForceCondensationPhase;
    forceCondensationExpression: Readonly<{
      density: number;
      radialBias: number;
      axisTiltRadians: number;
      formAspectRatio: number;
      flowRotationSpeed: number;
      ringOpacity: number;
      breathingPeriodSeconds: number;
      breathingAmplitude: number;
      ringCount: 3;
    }>;
    responseMessage: string;
    provenance: Readonly<{
      sourceReferenceId: string;
      motherCodeProfileReferenceId: string;
      lifeArchetypeSource: "mother_code_profile";
      directionSourceReferenceId: string;
      archetypeProjectionSemanticRole: "GENESIS_LIFE_ARCHETYPE_PROJECTION";
    }>;
    existingLifeArchetypeProjectionOnly: true;
    existingDirectionFieldCalibrationOnly: true;
    noLifeArchetypeCalculation: true;
    noMotherCodeCalculation: true;
    noPersonalityLabel: true;
    noArchetypeNameDisplay: true;
    noStarBeastGeneration: true;
    noStarBeastAmplification: true;
    noEngineInvocation: true;
    noSourceMutation: true;
    noTimelineMutation: true;
  }>;

export type GenesisLifeArchetypeForceCondensationVisualCalibrationBoundary =
  Readonly<{
    visualCalibrationOnly: true;
    existingLifeArchetypeProjectionOnly: true;
    existingDirectionFieldCalibrationOnly: true;
    directionAwakeningBeforeForceCondensation: true;
    forceExpressionNotPersonalityLabel: true;
    noLifeArchetypeCalculation: true;
    noMotherCodeCalculation: true;
    noArchetypeNameDisplay: true;
    noStarBeastGeneration: true;
    noStarBeastAmplification: true;
    noEngineInvocation: true;
    noSourceMutation: true;
    noTimelineSpeedMutation: true;
    noRendererAuthorizationMutation: true;
    noUIFlowMutation: true;
    noStorageWrite: true;
  }>;

export type GenesisLifeArchetypeForceCondensationVisualCalibrationResult =
  | Readonly<{
      status: "AVAILABLE";
      calibration: GenesisLifeArchetypeForceCondensationVisualCalibration;
      input: GenesisLifeArchetypeForceCondensationVisualCalibrationInput;
      boundary: GenesisLifeArchetypeForceCondensationVisualCalibrationBoundary;
    }>
  | Readonly<{
      status: "UNAVAILABLE";
      reason:
        | "LIFE_ARCHETYPE_PROJECTION_REQUIRED"
        | "DIRECTION_FIELD_CALIBRATION_REQUIRED"
        | "SOURCE_CONTINUITY_INVALID";
      calibration: null;
      input: GenesisLifeArchetypeForceCondensationVisualCalibrationInput;
      boundary: GenesisLifeArchetypeForceCondensationVisualCalibrationBoundary;
    }>;
