import type { MotherCodeProfile } from "./guanyaoCausalEngine";
import type {
  LifeArchetypeCode,
  LifeArchetypeProfile,
} from "./originalSelfLifeSchema";
import type { PersonalStarBeastManifestationReadinessReference } from "./personalStarBeastSceneModel";
import type { GenesisFourSymbolLifeDirectionProjection } from "./genesisFourSymbolLifeDirectionProjection";
import type { StarBeastGenesisMotherCodeProfileReference } from "./starBeastGenesisSourceIdentity";

export type GenesisLifeArchetypeDirection =
  | "创造"
  | "承载"
  | "启动"
  | "融入"
  | "穿越"
  | "显明"
  | "守护"
  | "连接";

export type GenesisLifeArchetypeName =
  | "创世者"
  | "承载者"
  | "行动者"
  | "渗透者"
  | "深潜者"
  | "照见者"
  | "守望者"
  | "连接者";

export type GenesisLifeArchetypeProjectionInput = Readonly<{
  sourceReferenceId: string;
  fourSymbolDirectionProjection:
    | GenesisFourSymbolLifeDirectionProjection
    | null;
  motherCodeProfileReference: StarBeastGenesisMotherCodeProfileReference | null;
  lifeArchetypeProfileReference: LifeArchetypeProfile | null;
  manifestationReadinessReference:
    | PersonalStarBeastManifestationReadinessReference
    | null;
}>;

export type GenesisLifeArchetypeProjectionProvenance = Readonly<{
  sourceReferenceId: string;
  fourSymbolDirectionSourceReferenceId: string;
  motherCodeProfileReferenceType: "STAR_BEAST_GENESIS_MOTHER_CODE_PROFILE";
  motherCodeProfileReferenceId: string;
  motherCodeSourceEngine: "guanyao_lunar_mother_code_landing";
  lifeArchetypeSource: "mother_code_profile";
  lifeArchetypeCode: LifeArchetypeCode;
  lifeArchetypeSourceMotherCodeId: string;
}>;

export type GenesisLifeArchetypeProjection = Readonly<{
  semanticRole: "GENESIS_LIFE_ARCHETYPE_PROJECTION";
  sourceReferenceId: string;
  fourSymbolDirectionReference: GenesisFourSymbolLifeDirectionProjection;
  lifeArchetype: LifeArchetypeCode;
  archetypeName: GenesisLifeArchetypeName;
  archetypeDirection: GenesisLifeArchetypeDirection;
  originalForce: string;
  lifeIntention: string;
  shadowPattern: string;
  awakeningDirection: string;
  starBeastManifestationReadiness:
    "READY_FOR_PERSONAL_STAR_BEAST_MANIFESTATION_DESIGN";
  starBeastManifestationReadinessReference: PersonalStarBeastManifestationReadinessReference;
  provenance: GenesisLifeArchetypeProjectionProvenance;
  sourceLifeArchetypeProfileReference: LifeArchetypeProfile;
  sourceMotherCodeProfileReference: MotherCodeProfile;
  existingLifeArchetypeProfileOnly: true;
  existingMotherCodeProfileOnly: true;
  existingFourSymbolDirectionProjectionOnly: true;
  noLifeArchetypeCalculation: true;
  noMotherCodeCalculation: true;
  noFourSymbolCalculation: true;
  noStarBeastGeneration: true;
  noRendererParameters: true;
  noTimelineMutation: true;
  noVisualCalibrationMutation: true;
  noFallback: true;
}>;

export type GenesisLifeArchetypeProjectionBlockedReason =
  | "SOURCE_REFERENCE_ID_REQUIRED"
  | "FOUR_SYMBOL_DIRECTION_PROJECTION_REQUIRED"
  | "FOUR_SYMBOL_DIRECTION_PROJECTION_INVALID"
  | "MOTHER_CODE_PROFILE_REFERENCE_REQUIRED"
  | "MOTHER_CODE_PROFILE_REFERENCE_INVALID"
  | "LIFE_ARCHETYPE_PROFILE_REFERENCE_REQUIRED"
  | "LIFE_ARCHETYPE_PROFILE_REFERENCE_INVALID"
  | "MOTHER_CODE_LIFE_ARCHETYPE_SOURCE_MISMATCH"
  | "MANIFESTATION_READINESS_REFERENCE_REQUIRED"
  | "MANIFESTATION_READINESS_REFERENCE_INVALID"
  | "LIFE_ARCHETYPE_MAPPING_INVALID";

export type GenesisLifeArchetypeProjectionBoundary = Readonly<{
  projectionOnly: true;
  existingLifeArchetypeProfileOnly: true;
  existingMotherCodeProfileOnly: true;
  existingFourSymbolDirectionProjectionOnly: true;
  noLifeArchetypeCalculation: true;
  noMotherCodeCalculation: true;
  noFourSymbolCalculation: true;
  noStarBeastGeneration: true;
  noRendererInvocation: true;
  noRendererInputMutation: true;
  noTimelineMutation: true;
  noVisualCalibrationMutation: true;
  noUIIntegration: true;
  noRuntimeIntegration: true;
  noStorageWrite: true;
  noFallback: true;
}>;

export type GenesisLifeArchetypeProjectionResult =
  | Readonly<{
      status: "AVAILABLE";
      projection: GenesisLifeArchetypeProjection;
      input: GenesisLifeArchetypeProjectionInput;
      boundary: GenesisLifeArchetypeProjectionBoundary;
    }>
  | Readonly<{
      status: "BLOCKED";
      reason: GenesisLifeArchetypeProjectionBlockedReason;
      projection: null;
      input: GenesisLifeArchetypeProjectionInput;
      boundary: GenesisLifeArchetypeProjectionBoundary;
    }>;
