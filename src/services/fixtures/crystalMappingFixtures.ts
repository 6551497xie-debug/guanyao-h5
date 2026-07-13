import type {
  CrystalMappingInput,
  CrystalState,
  CrystalStateStructureSource,
  PersonaMigrationImpact,
} from "../../types/personaTransmission";

export const ACTION_FIVE_AWARENESS_CRYSTAL_FIXTURE_ID = "action-five-awareness";

export const actionFiveAwarenessCrystalStructureSource: CrystalStateStructureSource = {
  source: "currentHexagramProfile",
  currentHexagramProfile: {
    lowerTrigram: "艮",
    lowerSource: "mother_code",
    upperTrigram: "巽",
    upperSource: "pressure_seed_classification",
    hexagramCode: "53",
    hexagramName: "风山渐",
    hexagramTitle: "行动重新校准的一局",
    upperCodeFormation: {
      pressureSeedLabel: "面对推进压力，用户试图通过立即行动恢复掌控。",
      lineImpact: {
        personalityDynamicsLine: 5,
        systemMechanismLine: 4,
        lifecycleStageLine: 3,
      },
      dominantLine: "personality",
      externalEnvironmentType: "xun_uncertainty_choice",
      upperTrigram: "巽",
      formationReason: "压力来自一个需要推进但结果不确定的现实局面。",
      upperCodeReading: "外部压力把行动推向不确定选择。",
    },
    layerClassification: {
      personalityDynamics: "行动空间被优先激活。",
      systemMechanism: "旧模型通过快速行动维持掌控感。",
      lifecycleStage: "本局处在重新判断方向的阶段。",
      dominantLayer: "personality",
      externalEnvironmentType: "xun_uncertainty_choice",
      externalEnvironmentName: "不确定选择场",
      upperTrigram: "巽",
      externalPressureReading: "现实压力要求推进，但方向尚未完全清楚。",
      classificationReason: "行动冲动和不确定选择同时出现。",
    },
    gravityValue: "P5",
    innerForceReading: "母码底盘倾向先稳住边界，再判断行动。",
    externalPressureReading: "压力催促用户立刻推进。",
    interactionReading: "内在需要稳定，外部要求推进，形成行动觉察的一局。",
    currentSandboxReading: "这不是最终卦码，而是母码遇压力后的本局卦象定位。",
  },
};

export const actionFiveAwarenessMigrationImpact: PersonaMigrationImpact = {
  sourceUnit: {
    unitId: ACTION_FIVE_AWARENESS_CRYSTAL_FIXTURE_ID,
    dimension: "action",
    yaoStage: "awareness",
  },
  dimension: "action",
  yaoStage: "awareness",
  fromModel: "通过行动恢复掌控感。",
  toResponse: "先判断，再行动。",
  deflectionVector: "controlNeed ↓ / agency ↑ / tolerance ↑",
  beastImpact: {
    before: "方向光轨过快外射。",
    after: "方向重新稳定展开。",
    cue: "星兽从向前急冲，转为先稳住方向。",
  },
  crystalImprint: {
    imprintLine: "从自动行动转向有意识行动。",
    shouldFeedCrystal: true,
    shouldDepositToRingLite: true,
  },
  impactReadiness: "READY_FOR_CRYSTAL",
  guardrails: {
    noStorageWrite: true,
    noLongTermProfile: true,
    noScore: true,
    noGrowthValue: true,
    noRawEngineLanguage: true,
    no384Yao: true,
    noArchive: true,
  },
};

export const actionFiveAwarenessCrystalMappingInput: CrystalMappingInput = {
  structureSource: actionFiveAwarenessCrystalStructureSource,
  migrationImpacts: [actionFiveAwarenessMigrationImpact],
  source: "fixture",
};

export const actionFiveAwarenessCrystalState: CrystalState = {
  structureSource: actionFiveAwarenessCrystalStructureSource,
  impactSources: [actionFiveAwarenessMigrationImpact],
  dominantImpact: actionFiveAwarenessMigrationImpact,
  readiness: "READY_TO_CRYSTALLIZE",
  crystalMeaning: "这一局把行动中的自动掌控，转向先判断再行动的回应。",
  assetBoundary: {
    canCreateCurrentCrystalEndState: true,
    canExposeHexagramAsset: false,
    canDepositToRingLite: false,
  },
  ringDepositMeaning: {
    traceLine: actionFiveAwarenessMigrationImpact.crystalImprint.imprintLine,
    shouldDepositToRingLite: false,
  },
  guardrails: {
    noStorageWrite: true,
    noHexagramGeneration: true,
    noCrystalEngineMutation: true,
    noCollectibleAsset: true,
    noScore: true,
    noLevel: true,
    noGrowthValue: true,
    noPetGrowth: true,
    no384Yao: true,
    noArchive: true,
    noOldR8: true,
  },
};
