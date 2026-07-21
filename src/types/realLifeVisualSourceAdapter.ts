import type { GenesisBirthMansionIgnitionProjection } from "./genesisBirthMansionIgnitionProjection";
import type { GenesisFourSymbolAlignmentProjection } from "./genesisFourSymbolAlignmentProjection";
import type { GenesisFourSymbolLifeDirectionProjection } from "./genesisFourSymbolLifeDirectionProjection";
import type { GenesisLifeArchetypeProjection } from "./genesisLifeArchetypeProjection";
import type { GenesisStarBeastManifestationSource } from "./genesisStarBeastManifestationSource";
import type { GenesisLifeForceInfusionProjection } from "./genesisLifeForceInfusionProjection";
import type { GenesisPersonalRevealProjection } from "./genesisPersonalRevealProjection";
import type { GenesisRealityPressureProjection } from "./genesisRealityPressureProjection";
import type { GenesisTimeSequenceRecognitionProjection } from "./genesisTimeSequenceRecognitionProjection";
import type { GenesisTwentyEightMansionCoordinateProjection } from "./genesisTwentyEightMansionCoordinateProjection";
import type { LunarMotherCodeLandingResult } from "./guanyaoLunarMotherCode";
import type { StarbeastDerivationReady } from "./guanyaoStarbeast";
import type { PersonalStarBeastRenderPlan, PersonalStarBeastRenderPlanAdapterResult } from "./personalStarBeastRenderPlan";
import type { PersonalStarBeastSceneModel } from "./personalStarBeastSceneModel";
import type { SelectedPressureSeedContext } from "./primaryPetal";
import type { StarBeastIdentitySource } from "./starBeastIdentitySource";
import type { StarBeastGenesisSourceIdentity } from "./starBeastGenesisSourceIdentity";
import type { StarMansionLifeTrajectorySource } from "./starMansionLifeTrajectory";

export type RealLifeVisualSourceKind =
  | "REAL_ENGINE_RESULT"
  | "ISOLATED_FIXTURE_ENGINE_RESULT";

export type RealLifeVisualSourceAdapterInput = Readonly<{
  sourceKind: RealLifeVisualSourceKind;
  sourceReferenceId: string;
  starbeastDerivationResult: StarbeastDerivationReady;
  motherCodeLandingResult: LunarMotherCodeLandingResult;
  selectedPressureSeedContext?: SelectedPressureSeedContext | null;
}>;

export type RealLifeVisualProjectionBundle = Readonly<{
  twentyEightMansionCoordinateProjection: GenesisTwentyEightMansionCoordinateProjection;
  fourSymbolLifeDirectionProjection: GenesisFourSymbolLifeDirectionProjection;
  lifeArchetypeProjection: GenesisLifeArchetypeProjection;
  starBeastManifestationSource: GenesisStarBeastManifestationSource;
  timeSequenceRecognitionProjection: GenesisTimeSequenceRecognitionProjection;
  birthMansionIgnitionProjection: GenesisBirthMansionIgnitionProjection;
  morphologicalFieldAlignmentProjection: GenesisFourSymbolAlignmentProjection;
  lifeForceInfusionProjection: GenesisLifeForceInfusionProjection;
  personalRevealProjection: GenesisPersonalRevealProjection;
  realityPressureProjection: GenesisRealityPressureProjection | null;
}>;

export type RealLifeVisualSourceProvenance = Readonly<{
  sourceKind: RealLifeVisualSourceKind;
  sourceReferenceId: string;
  starbeastEngine: "guanyao_starbeast_engine";
  motherCodeEngine: "guanyao_lunar_mother_code_landing";
  gregorianBirthDate: string;
  mansion: StarbeastDerivationReady["mansion"];
  fourSymbol: StarbeastDerivationReady["fourSymbol"];
  motherCodeId: string;
  selectedPressureSeedId: string | null;
}>;

export type RealLifeVisualSource = Readonly<{
  provenance: RealLifeVisualSourceProvenance;
  sourceIdentity: StarBeastGenesisSourceIdentity;
  trajectorySource: StarMansionLifeTrajectorySource;
  identitySourceReference: StarBeastIdentitySource;
  sceneModel: PersonalStarBeastSceneModel;
  renderPlan: PersonalStarBeastRenderPlan;
  renderPlanResult: Extract<PersonalStarBeastRenderPlanAdapterResult, { status: "PLANNED" }>;
  projectionBundle: RealLifeVisualProjectionBundle;
}>;

export type RealLifeVisualSourceAdapterBlockedReason =
  | "SOURCE_REFERENCE_ID_REQUIRED"
  | "SOURCE_CALIBRATION_FAILED"
  | "LIFE_ARCHETYPE_SOURCE_FAILED"
  | "TRAJECTORY_SOURCE_FAILED"
  | "MANIFESTATION_READINESS_FAILED"
  | "MANSION_COORDINATE_PROJECTION_FAILED"
  | "TIME_SEQUENCE_PROJECTION_FAILED"
  | "BIRTH_MANSION_PROJECTION_FAILED"
  | "FOUR_SYMBOL_LIFE_DIRECTION_PROJECTION_FAILED"
  | "LIFE_ARCHETYPE_PROJECTION_FAILED"
  | "STAR_BEAST_MANIFESTATION_SOURCE_FAILED"
  | "FOUR_SYMBOL_PROJECTION_FAILED"
  | "LIFE_FORCE_PROJECTION_FAILED"
  | "PERSONAL_REVEAL_PROJECTION_FAILED"
  | "REALITY_PRESSURE_PROJECTION_FAILED"
  | "RENDER_PLAN_ADAPTER_FAILED";

export type RealLifeVisualSourceAdapterBoundary = Readonly<{
  sourceAssemblyOnly: true;
  existingEngineResultsOnly: true;
  noEngineInvocation: true;
  noIdentityRecalculation: true;
  noStarBeastGeneration: true;
  noPressureCalculation: true;
  noHexagramCalculation: true;
  noCrystalCalculation: true;
  noRendererInvocation: true;
  noRuntimeMutation: true;
  noVisualCalibrationMutation: true;
  noUIIntegration: true;
  noStorageWrite: true;
}>;

export type RealLifeVisualSourceAdapterResult =
  | Readonly<{
      status: "AVAILABLE";
      source: "real_life_visual_source_adapter";
      input: RealLifeVisualSourceAdapterInput;
      visualSource: RealLifeVisualSource;
      boundary: RealLifeVisualSourceAdapterBoundary;
    }>
  | Readonly<{
      status: "BLOCKED";
      source: "real_life_visual_source_adapter";
      reason: RealLifeVisualSourceAdapterBlockedReason;
      input: RealLifeVisualSourceAdapterInput;
      visualSource: null;
      boundary: RealLifeVisualSourceAdapterBoundary;
    }>;
