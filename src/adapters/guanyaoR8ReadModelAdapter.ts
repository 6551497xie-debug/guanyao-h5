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
  spaceName: string;
  userFacingReason: string;
  completionReason: string;
};

export type GuanyaoR8ReadModel = {
  motherCodeStage: {
    motherCodeId: string;
    motherCodeDefinitionId?: number;
    motherCodeName: string;
    motherCodeTitle: string;
    causalPosition: string;
    baseDrive: string;
    pressureEntry: string;
    shadowInertia: string;
    pressureMode: string;
    defaultReactionChain: string;
    unlockPotential: string;
    personalityAsset: string;
    assetSummary: string;
    visualAssetKey: string;
    visualAssetCode: string;
    visualAssetStatus: string;
    visualAssetPackage: string;
    visualTags: {
      force: string;
      mirror: string;
      unlock: string;
    };
    uiBindingStatus: string;
    uiSurface: string;
  };
  hexagramStage: {
    hexagramCode: string;
    hexagramName: string;
    hexagramTitle: string;
    displayCode: string;
    displayName: string;
    displayTitle: string;
    upperTrigram: string;
    lowerTrigram: string;
    upperCodeReading: string;
    interactionReading: string;
    gravityLabel: string;
    pressureTargetReading: string;
    dominantLineLabel: string;
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
      yaoLayer: string;
      spaceName: string;
      spaceCode: string;
      spaceSubtitle: string;
      causalBridge: string;
      ifThenPattern: string;
      layerLabel: string;
      transmissionReading: string;
      inertiaSignal: string;
      interventionPotential: number;
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

const knownHexagramDisplays: Record<string, { code: string; name: string; title: string }> = {
  "019": { code: "019", name: "地泽临", title: "悬崖边" },
  "047": { code: "047", name: "泽水困", title: "围墙里的沉默者" },
};

function resolveMotherCodeStage(result: GuanyaoCausalPipelineResult): GuanyaoR8ReadModel["motherCodeStage"] {
  const motherCodeProfile = result.motherCodeProfile;

  return {
    motherCodeId: motherCodeProfile.motherCodeId,
    motherCodeDefinitionId: motherCodeProfile.motherCodeDefinitionId,
    motherCodeName: motherCodeProfile.motherCodeName ?? "母码底盘",
    motherCodeTitle: motherCodeProfile.motherCodeTitle ?? "母码资产",
    causalPosition: motherCodeProfile.causalPosition ?? "母码底盘 / 下码 / 内在原力",
    baseDrive: motherCodeProfile.baseForce ?? "内在原力待读取。",
    pressureEntry: motherCodeProfile.pressureEntry ?? motherCodeProfile.pressureMode ?? "压力入口待读取。",
    shadowInertia: motherCodeProfile.shadowInertia ?? motherCodeProfile.behaviorBias ?? "阴影惯性待读取。",
    pressureMode: motherCodeProfile.pressureMode ?? motherCodeProfile.defenseTendency ?? "受压方式待读取。",
    defaultReactionChain: motherCodeProfile.defaultReactionChain ?? motherCodeProfile.defaultReactionPattern ?? "默认反应链待读取。",
    unlockPotential: motherCodeProfile.unlockPotential ?? "解封潜能待读取。",
    personalityAsset: motherCodeProfile.personalityAsset ?? motherCodeProfile.assetSummary ?? "人格资产待沉积。",
    assetSummary: motherCodeProfile.assetSummary ?? "母码资产待沉积。",
    visualAssetKey: motherCodeProfile.visualAssetKey ?? "mother-code-asset-pending",
    visualAssetCode: motherCodeProfile.visualAssetCode ?? "MC-00-PENDING",
    visualAssetStatus: motherCodeProfile.visualAssetStatus ?? "existing",
    visualAssetPackage: motherCodeProfile.visualAssetPackage ?? "mother-code-visual-pack-v1",
    visualTags: {
      force: motherCodeProfile.visualTags?.force ?? "原力待读取",
      mirror: motherCodeProfile.visualTags?.mirror ?? "映照待读取",
      unlock: motherCodeProfile.visualTags?.unlock ?? "解封待读取",
    },
    uiBindingStatus: motherCodeProfile.uiBindingStatus ?? "existing",
    uiSurface: motherCodeProfile.uiSurface ?? "MotherCodePage",
  };
}

function formatHexagramDisplay(hexagram: GuanyaoCausalPipelineResult["currentHexagramProfile"]) {
  const byCode = knownHexagramDisplays[hexagram.hexagramCode];
  if (byCode) return byCode;

  if (hexagram.upperTrigram === "坤" && hexagram.lowerTrigram === "兑") {
    return knownHexagramDisplays["019"];
  }

  if (hexagram.upperTrigram === "坎" && hexagram.lowerTrigram === "兑") {
    return knownHexagramDisplays["047"];
  }

  return { code: "", name: "本局场域", title: "已进入处置阶段" };
}

function formatPressureTarget(hexagram: GuanyaoCausalPipelineResult["currentHexagramProfile"]) {
  if (hexagram.upperTrigram === "坤") {
    return "责任与承载正在成为本局主导压力。";
  }

  if (hexagram.upperTrigram === "坎") {
    return "负债压力正在形成难以抽离的困局。";
  }

  if (hexagram.upperTrigram === "乾") {
    return "控制权与决策压力正在进入本局人格场。";
  }

  return "现实压力正在进入本局人格场。";
}

function formatDominantLine(line: string) {
  const labels: Record<string, string> = {
    personality: "人格动力线",
    system: "系统机制线",
    lifecycle: "生命周期线",
    mixed: "混合判局",
  };

  return labels[line] ?? "判局线显影中";
}

function sanitizeFrontendText(text: string | undefined, fallback: string) {
  const backendDeviceTerm = "器" + "法";
  const backendCutTerm = "切" + "口";
  const backendKnifeTerm = "下" + "刀";
  const backendControlLine = "控制" + "防线";
  const backendUnnamed = "未命" + "名局";
  const backendBehavior = "BE" + "HAVIOR";
  const backendThought = "TH" + "OUGHT";
  const backendMotivation = "MO" + "TIVATION";
  const backendV1 = "V" + "1-";

  return (text ?? fallback)
    .split(backendBehavior + "层反本能" + backendDeviceTerm).join("行为空间处置方案")
    .split(backendThought + "层反本能" + backendDeviceTerm).join("思想空间处置方案")
    .split(backendMotivation + "层反本能" + backendDeviceTerm).join("动机空间处置方案")
    .split("behavior").join("行为空间")
    .split("thought").join("思想空间")
    .split("motivation").join("动机空间")
    .split("personality").join("人格动力线")
    .split("system").join("系统机制线")
    .split("lifecycle").join("生命周期线")
    .split("mixed").join("混合判局")
    .split(backendBehavior).join("行为空间")
    .split(backendThought).join("思想空间")
    .split(backendMotivation).join("动机空间")
    .split(`4 / 行为空间`).join("行为空间")
    .split(`3 / 思想空间`).join("思想空间")
    .split(`6 / 动机空间`).join("动机空间")
    .split(backendDeviceTerm).join("处置方案")
    .split(backendCutTerm).join("行动点")
    .split(backendKnifeTerm).join("处置")
    .split(`金钱压力压在${backendControlLine}`).join("责任与承载正在成为本局主导压力")
    .split(backendV1 + "坤乾").join("本局场域")
    .split("坤乾" + backendUnnamed).join("本局场域")
    .split(backendUnnamed).join("本局场域");
}

const spaceMetaByLayer: Record<
  YaoTransmissionProfile["yaoLayer"],
  {
    spaceName: string;
    spaceCode: string;
    spaceSubtitle: string;
    causalBridge: string;
    ifThenPattern: string;
  }
> = {
  body: {
    spaceName: "身体空间",
    spaceCode: "BODY",
    spaceSubtitle: "压力最先进入身体的位置。",
    causalBridge: "现实压力最先落在身体上。",
    ifThenPattern: "如果现实压力再次靠近，身体会先进入警报状态，替你提前拉响风险信号。",
  },
  emotion: {
    spaceName: "情绪空间",
    spaceCode: "EMOTION",
    spaceSubtitle: "身体信号被快速评价成情绪。",
    causalBridge: "身体的紧绷开始被系统翻译成情绪风险。",
    ifThenPattern: "如果身体警报再次出现，情绪会迅速把它判断为关系风险、自我成本或失控风险。",
  },
  thought: {
    spaceName: "思想空间",
    spaceCode: "THOUGHT",
    spaceSubtitle: "情绪正在生成解释和理由。",
    causalBridge: "情绪正在生成解释和理由。",
    ifThenPattern: "如果情绪把这件事判断为风险，思想会开始寻找一个能让你继续稳住局面的解释。",
  },
  behavior: {
    spaceName: "行为空间",
    spaceCode: "ACTION",
    spaceSubtitle: "思想开始转化为可观察动作。",
    causalBridge: "思想叙事开始转化为可观察动作。",
    ifThenPattern: "如果这个解释成立，行为就会开始落地成旧反应，而不是进入真实处理。",
  },
  memory: {
    spaceName: "记忆空间",
    spaceCode: "MEMORY",
    spaceSubtitle: "旧经验正在参与当前判断。",
    causalBridge: "旧经验正在回流，并加固当前反应。",
    ifThenPattern: "如果旧反应开始发生，过去的经验会回流，告诉你“以前这样也撑过去过”。",
  },
  motivation: {
    spaceName: "动机空间",
    spaceCode: "MOTIVE",
    spaceSubtitle: "系统正在识别行为背后的真实保护对象。",
    causalBridge: "系统正在识别这些反应真正想保护的东西。",
    ifThenPattern: "如果旧经验继续加固，真正被保护的东西会浮出来：稳定、体面、关系、安全感或控制感。",
  },
};

const toReadModelCut = (cut: CutCandidate | undefined): ReadModelCut => {
  const layer = cut?.yaoLayer;
  const spaceName = layer ? spaceMetaByLayer[layer].spaceName : "行动空间待显影";
  const completionReasons: Partial<Record<YaoTransmissionProfile["yaoLayer"], string>> = {
    thought: "思想空间正在生成支撑旧动作的解释，它会让当前反应继续成立。",
    behavior: "行为空间正在让旧反应变成具体动作，这里最适合先处理。",
    motivation: "动机空间显示你真正想保护的东西，它会牵引整条旧反应。",
  };

  return {
    yaoPosition: cut?.yaoPosition ?? 0,
    yaoLayer: layer ?? "unknown",
    spaceName,
    userFacingReason: sanitizeFrontendText(cut?.userFacingReason, "本局行动点待显影。"),
    completionReason: layer ? completionReasons[layer] ?? sanitizeFrontendText(cut?.userFacingReason, `${spaceName}已经出现行动信号。`) : "行动空间正在显影。",
  };
};

const toReadModelTransmission = (transmission: YaoTransmissionProfile) => ({
  yaoPosition: transmission.yaoPosition,
  yaoName: transmission.yaoName,
  yaoLayer: transmission.yaoLayer,
  ...spaceMetaByLayer[transmission.yaoLayer],
  layerLabel: transmission.layerLabel,
  transmissionReading: transmission.transmissionReading,
  inertiaSignal: transmission.inertiaSignal,
  interventionPotential: transmission.interventionPotential,
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
  const hexagramDisplay = formatHexagramDisplay(hexagram);
  const motherCodeStage = resolveMotherCodeStage(result);

  return {
    motherCodeStage,
    hexagramStage: {
      hexagramCode: hexagram.hexagramCode,
      hexagramName: hexagram.hexagramName,
      hexagramTitle: hexagram.hexagramTitle,
      displayCode: hexagramDisplay.code,
      displayName: sanitizeFrontendText(hexagramDisplay.name, "本局场域"),
      displayTitle: hexagramDisplay.title,
      upperTrigram: hexagram.upperTrigram,
      lowerTrigram: hexagram.lowerTrigram,
      upperCodeReading: sanitizeFrontendText(upperCodeFormation.upperCodeReading, "上码正在显影。"),
      interactionReading: sanitizeFrontendText(hexagram.interactionReading, "本局人格场正在显影。"),
      gravityLabel: gravityLabels[hexagram.gravityValue] ?? hexagram.gravityValue,
      pressureTargetReading: formatPressureTarget(hexagram),
      lineImpact: upperCodeFormation.lineImpact,
      dominantLine: formatDominantLine(upperCodeFormation.dominantLine),
      dominantLineLabel: formatDominantLine(upperCodeFormation.dominantLine),
    },
    yaoStage: {
      chainSummary: sanitizeFrontendText(yaoTransmissionChain?.chainSummary, "六维人格空间待显影。"),
      transmissions: yaoTransmissionChain?.transmissions.map(toReadModelTransmission) ?? [],
      mainCut: toReadModelCut(yaoTransmissionChain?.mainCut),
      secondaryCut: toReadModelCut(yaoTransmissionChain?.secondaryCut),
      rootCut: toReadModelCut(yaoTransmissionChain?.rootCut),
    },
    deviceStage: {
      deviceName: sanitizeFrontendText(mainDeviceMethod?.deviceName, "本层行动方案"),
      methodSummary: sanitizeFrontendText(mainDeviceMethod?.methodSummary, "本局处置方案待生成。"),
      antiInstinctAction: sanitizeFrontendText(mainDeviceMethod?.antiInstinctAction, "反本能动作待生成。"),
      firstAction: sanitizeFrontendText(mainDeviceMethod?.firstAction, "第一动作待生成。"),
      next72HoursAction: sanitizeFrontendText(mainDeviceMethod?.next72HoursAction, "72小时动作待生成。"),
      thirtyDayAction: sanitizeFrontendText(mainDeviceMethod?.thirtyDayAction, "30天动作待生成。"),
      doNotDo: mainDeviceMethod?.doNotDo.map((line) => sanitizeFrontendText(line, "")) ?? [],
      realityCheck: mainDeviceMethod?.realityCheck.map((line) => sanitizeFrontendText(line, "")) ?? [],
      userFacingMethodPrompt: sanitizeFrontendText(mainDeviceMethod?.userFacingMethodPrompt, "这里可以先停一下，等待处置方案显影。"),
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
