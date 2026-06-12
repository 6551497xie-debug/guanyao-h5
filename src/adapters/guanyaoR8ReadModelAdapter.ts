import { runGuanyaoCausalPipeline } from "../services/guanyaoCausalEngineService";
import type {
  CutCandidate,
  GuanyaoCausalPipelineResult,
  PersonalityGravityValue,
  YaoTransmissionProfile,
} from "../types/guanyaoCausalEngine";

type ReadModelCut = {
  yaoPosition: number;
  yaoLayer: string;
  userFacingReason: string;
};

export type GuanyaoR8ReadModel = {
  hexagramStage: {
    hexagramCode: string;
    hexagramName: string;
    hexagramTitle: string;
    upperTrigram: string;
    lowerTrigram: string;
    upperCodeReading: string;
    interactionReading: string;
    gravityLabel: string;
    lineImpact: {
      personalityDynamicsLine: number;
      systemMechanismLine: number;
      lifecycleStageLine: number;
    };
    dominantLine: string;
  };
  yaoStage: {
    chainSummary: string;
    transmissions: {
      yaoPosition: number;
      yaoName: string;
      layerLabel: string;
      transmissionReading: string;
      inertiaSignal: string;
      pauseSignal: string;
      pauseReason: string;
      userFacingPausePrompt: string;
      userFacingContinuePrompt: string;
    }[];
    mainCut: ReadModelCut;
    secondaryCut: ReadModelCut;
    rootCut: ReadModelCut;
  };
  deviceStage: {
    deviceName: string;
    methodSummary: string;
    antiInstinctAction: string;
    firstAction: string;
    next72HoursAction: string;
    thirtyDayAction: string;
    doNotDo: string[];
    realityCheck: string[];
    userFacingMethodPrompt: string;
  };
  assetStage: {
    assetName: string;
    assetType: string;
    assetSummary: string;
    beforePattern: string;
    afterCapability: string;
    archiveSummary: string;
    migrationTrace: string[];
    defensePath90d: {
      pathName: string;
      phases: {
        phaseId: string;
        phaseName: string;
        phaseGoal: string;
        keyAction: string;
        riskSignal: string;
        defenseInstruction: string;
      }[];
      relapseWarning: string[];
      antiInstinctReminder: string;
    };
  };
};

const gravityLabels: Record<PersonalityGravityValue, string> = {
  P1: "P1｜轻微牵引",
  P2: "P2｜局部承压",
  P3: "P3｜冲突放大",
  P4: "P4｜结构承压",
  P5: "P5｜临界暴露",
  P6: "P6｜重组关口",
};

const toReadModelCut = (cut: CutCandidate | undefined): ReadModelCut => ({
  yaoPosition: cut?.yaoPosition ?? 0,
  yaoLayer: cut?.yaoLayer ?? "unknown",
  userFacingReason: cut?.userFacingReason ?? "本局切口待显影。",
});

const toReadModelTransmission = (transmission: YaoTransmissionProfile) => ({
  yaoPosition: transmission.yaoPosition,
  yaoName: transmission.yaoName,
  layerLabel: transmission.layerLabel,
  transmissionReading: transmission.transmissionReading,
  inertiaSignal: transmission.inertiaSignal,
  pauseSignal: transmission.pauseSignal,
  pauseReason: transmission.pauseReason,
  userFacingPausePrompt: transmission.userFacingPausePrompt,
  userFacingContinuePrompt: transmission.userFacingContinuePrompt,
});

export function buildGuanyaoR8ReadModel(result: GuanyaoCausalPipelineResult): GuanyaoR8ReadModel {
  const hexagram = result.currentHexagramProfile;
  const upperCodeFormation = hexagram.upperCodeFormation;
  const yaoTransmissionChain = result.yaoTransmissionChain;
  const deviceMethodPackage = result.deviceMethodPackage;
  const mainDeviceMethod = deviceMethodPackage?.mainDeviceMethod;
  const personalityAssetDeposition = result.personalityAssetDeposition;

  return {
    hexagramStage: {
      hexagramCode: hexagram.hexagramCode,
      hexagramName: hexagram.hexagramName,
      hexagramTitle: hexagram.hexagramTitle,
      upperTrigram: hexagram.upperTrigram,
      lowerTrigram: hexagram.lowerTrigram,
      upperCodeReading: upperCodeFormation.upperCodeReading,
      interactionReading: hexagram.interactionReading,
      gravityLabel: gravityLabels[hexagram.gravityValue] ?? hexagram.gravityValue,
      lineImpact: upperCodeFormation.lineImpact,
      dominantLine: upperCodeFormation.dominantLine,
    },
    yaoStage: {
      chainSummary: yaoTransmissionChain?.chainSummary ?? "六爻传导链待显影。",
      transmissions: yaoTransmissionChain?.transmissions.map(toReadModelTransmission) ?? [],
      mainCut: toReadModelCut(yaoTransmissionChain?.mainCut),
      secondaryCut: toReadModelCut(yaoTransmissionChain?.secondaryCut),
      rootCut: toReadModelCut(yaoTransmissionChain?.rootCut),
    },
    deviceStage: {
      deviceName: mainDeviceMethod?.deviceName ?? "器法待生成",
      methodSummary: mainDeviceMethod?.methodSummary ?? "本局器法待生成。",
      antiInstinctAction: mainDeviceMethod?.antiInstinctAction ?? "反本能动作待生成。",
      firstAction: mainDeviceMethod?.firstAction ?? "第一动作待生成。",
      next72HoursAction: mainDeviceMethod?.next72HoursAction ?? "72小时动作待生成。",
      thirtyDayAction: mainDeviceMethod?.thirtyDayAction ?? "30天动作待生成。",
      doNotDo: mainDeviceMethod?.doNotDo ?? [],
      realityCheck: mainDeviceMethod?.realityCheck ?? [],
      userFacingMethodPrompt: mainDeviceMethod?.userFacingMethodPrompt ?? "这里可以先停一下，等待器法显影。",
    },
    assetStage: {
      assetName: personalityAssetDeposition?.assetName ?? "人格资产待沉积",
      assetType: personalityAssetDeposition?.assetType ?? "self_regulation",
      assetSummary: personalityAssetDeposition?.assetSummary ?? "人格资产尚未沉积。",
      beforePattern: personalityAssetDeposition?.beforePattern ?? "旧反应待记录。",
      afterCapability: personalityAssetDeposition?.afterCapability ?? "新能力待沉积。",
      archiveSummary: personalityAssetDeposition?.archiveSummary ?? "归档摘要待生成。",
      migrationTrace: personalityAssetDeposition?.migrationTrace ?? [],
      defensePath90d: {
        pathName: personalityAssetDeposition?.defensePath90d.pathName ?? "90天防御路径待生成",
        phases:
          personalityAssetDeposition?.defensePath90d.phases.map((phase) => ({
            phaseId: phase.phaseId,
            phaseName: phase.phaseName,
            phaseGoal: phase.phaseGoal,
            keyAction: phase.keyAction,
            riskSignal: phase.riskSignal,
            defenseInstruction: phase.defenseInstruction,
          })) ?? [],
        relapseWarning: personalityAssetDeposition?.defensePath90d.relapseWarning ?? [],
        antiInstinctReminder: personalityAssetDeposition?.defensePath90d.antiInstinctReminder ?? "反本能提醒待生成。",
      },
    },
  };
}

export function getGuanyaoR8ReadModel(): GuanyaoR8ReadModel {
  return buildGuanyaoR8ReadModel(runGuanyaoCausalPipeline());
}
