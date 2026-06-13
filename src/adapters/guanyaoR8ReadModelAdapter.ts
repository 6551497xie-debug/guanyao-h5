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
    motherCodeName: string;
    motherCodeTitle: string;
    baseDrive: string;
    shadowInertia: string;
    pressureMode: string;
    defaultReactionChain: string;
    unlockPotential: string;
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

const motherCodeAssets: Record<
  string,
  {
    motherCodeName: string;
    motherCodeTitle: string;
    baseDrive: string;
    shadowInertia: string;
    pressureMode: string;
    defaultReactionChain: string;
    unlockPotential: string;
  }
> = {
  乾: {
    motherCodeName: "乾｜创世者",
    motherCodeTitle: "创世者",
    baseDrive: "你最容易在混乱中站出来，替局面定方向、开第一步，把事情推起来。",
    shadowInertia: "别人越慢，你越想亲自下场；局面越乱，你越难放手，最后变成一个人硬撑。",
    pressureMode: "压力最先压中的，是你的掌控感、决策权和对局面失序的敏感。",
    defaultReactionChain: "接管 → 收紧 → 硬扛",
    unlockPotential: "乾的解封，不是放弃掌控，而是把控制欲升级为控制能力。",
  },
  坤: {
    motherCodeName: "坤｜承载者",
    motherCodeTitle: "承载者",
    baseDrive: "你最容易先把事情接住，让人、关系和局面先稳定下来。",
    shadowInertia: "凡事习惯先往自己身上揽；局面一不稳，你就习惯先让步，最后把自己耗空。",
    pressureMode: "压力最先压中的，是你的责任边界、承载能力和被需要感。",
    defaultReactionChain: "接住 → 让步 → 耗空",
    unlockPotential: "坤的解封，不是不再承受，而是把无边界的承受升级为有边界的托底能力。",
  },
  震: {
    motherCodeName: "震｜行动者",
    motherCodeTitle: "行动者",
    baseDrive: "你最容易先动起来，用行动破局，把停滞的事情尽快推动。",
    shadowInertia: "别人越犹豫，你越想加速推进，最后容易把节奏推乱。",
    pressureMode: "压力最先压中的，是你的行动通道、推进速度和对停滞的忍耐度。",
    defaultReactionChain: "启动 → 加速 → 推乱",
    unlockPotential: "震的解封，不是不再行动，而是提升行动前的思考力。",
  },
  巽: {
    motherCodeName: "巽｜渗透者",
    motherCodeTitle: "渗透者",
    baseDrive: "你最容易用旁观者的视角找到缝隙，再用迂回、绕行的方式解决问题。",
    shadowInertia: "局面越复杂，选择越多，你越容易反复权衡，最后错过该进入的最佳时机。",
    pressureMode: "压力最先压中的，是你的判断确定性、进入时机和对变化的敏感度。",
    defaultReactionChain: "观察 → 权衡 → 错过",
    unlockPotential: "巽的解封，不是不再观察，而是把反复权衡升级为谋而后动的判断力。",
  },
  坎: {
    motherCodeName: "坎｜深陷者",
    motherCodeTitle: "深陷者",
    baseDrive: "你最容易陷入问题内部，反复复盘、承压和寻找出口，直到真正看清困局的底层结构。",
    shadowInertia: "一旦陷入某个局面，你就容易反复琢磨；越想弄清楚，越难抽离，最后困在同一个问题里消耗自己。",
    pressureMode: "压力最先压中的，是你对困局的沉浸感、反复复盘的惯性，以及从问题里抽身的能力。",
    defaultReactionChain: "陷入 → 复盘 → 难拔",
    unlockPotential: "坎的解封，不是不再深入，而是把反复深陷升级为穿越困局的能力。",
  },
  离: {
    motherCodeName: "离｜照见者",
    motherCodeTitle: "照见者",
    baseDrive: "你最容易把看见的问题说出来，让模糊、隐藏的信息浮到台前。",
    shadowInertia: "别人越误解你，你越想解释清楚，最后容易陷入反复证明自己。",
    pressureMode: "压力最先压中的，是你表达时容易被误解的挫败感，以及对真相不被重视的敏感度。",
    defaultReactionChain: "看见 → 表达 → 证明",
    unlockPotential: "离的解封，不是不再表达，而是把证明欲升级为抓住本质问题的表达能力。",
  },
  艮: {
    motherCodeName: "艮｜停滞者",
    motherCodeTitle: "停滞者",
    baseDrive: "你最容易在局面失控前刹车，用及时止损和边界感，阻止事情被无效推进。",
    shadowInertia: "事情越急，你越想先停住；别人越想推动你，你越容易把边界收紧，最后把该动的机会也挡在外面。",
    pressureMode: "压力最先压中的，是你的边界感、止损判断和对无效消耗的敏感度。",
    defaultReactionChain: "停住 → 收紧 → 挡住",
    unlockPotential: "艮的解封，不是不再停下，而是把过度的防御性升级为及时止损的预见性。",
  },
  兑: {
    motherCodeName: "兑｜转化者",
    motherCodeTitle: "转化者",
    baseDrive: "你最容易在紧张关系中找到松动点，用沟通、交换和转化，让僵住的局面重新流动起来。",
    shadowInertia: "气氛越僵，冲突越明显，你越容易避重就轻，看似局面缓解了，但实际上只是问题被搁置。",
    pressureMode: "压力最先压中的，是你对维持关系的过度关注和对冲突失控的担心。",
    defaultReactionChain: "缓和 → 转开 → 失真",
    unlockPotential: "兑的解封，不是不再缓和，而是把回避冲突升级为化解僵局的沟通能力。",
  },
};

function resolveMotherCodeAsset(result: GuanyaoCausalPipelineResult) {
  const motherCodeProfile = result.motherCodeProfile;
  const profileText = `${motherCodeProfile.motherCodeName}${motherCodeProfile.motherCodeId}`;
  const trigram =
    motherCodeProfile.lowerTrigram ??
    (profileText.includes("乾") || profileText.includes("control") ? "乾" : undefined) ??
    (profileText.includes("坤") || profileText.includes("hard") ? "坤" : undefined) ??
    (profileText.includes("震") ? "震" : undefined) ??
    (profileText.includes("巽") ? "巽" : undefined) ??
    (profileText.includes("坎") ? "坎" : undefined) ??
    (profileText.includes("离") ? "离" : undefined) ??
    (profileText.includes("艮") || profileText.includes("retreat") ? "艮" : undefined) ??
    (profileText.includes("兑") || profileText.includes("transform") ? "兑" : undefined) ??
    result.currentHexagramProfile.lowerTrigram;
  const asset = motherCodeAssets[trigram] ?? motherCodeAssets.兑;

  return {
    motherCodeId: motherCodeProfile.motherCodeId,
    ...asset,
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
  const motherCodeStage = resolveMotherCodeAsset(result);

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
