import {
  demoBreachScan,
  demoDynamicsResult,
  demoPressureExposureOptions,
  demoPressureSeed,
  demoRepairMethods,
  demoYaoDevices,
  motherCodeAssets,
} from "../data/guanyaoInteractionMock";
import type {
  BreachScanResult,
  BreachScanReading,
  ArchiveAssetSnapshot,
  GuanyaoAsset,
  HexagramFieldReading,
  InitialCoordinates,
  MotherCodeAsset,
  MotherCodeCard,
  PressureExposureOption,
  PressureExposureResult,
  PressureSeed,
  RepairMethod,
  RepairMethodDelivery,
  YaoDevice,
  YaoDeviceDelivery,
} from "../types";

export function getDemoInitialCoordinates(): InitialCoordinates {
  return {
    birthChrono: "1995 / 06 / 02 · 23:00-01:00",
    agePhase: "责任叠压期",
    behaviorRing: "硬撑轨道 · 最近一轮",
    geoAnchor: "当前常驻地 · 地利锚点",
  };
}

function buildMotherCardId(initialCoordinates: InitialCoordinates) {
  const sourceText = [
    initialCoordinates.birthChrono,
    initialCoordinates.agePhase,
    initialCoordinates.behaviorRing,
  ].join("|");
  let hash = 0;

  for (let index = 0; index < sourceText.length; index += 1) {
    hash = (hash * 31 + sourceText.charCodeAt(index)) % 100000;
  }

  return `MOTHER_CARD_${String(hash).padStart(5, "0")}`;
}

export function generateMotherCodeFromInitialCoordinates(
  initialCoordinates: InitialCoordinates,
  cardStatus: MotherCodeCard["cardStatus"] = "embedded",
): MotherCodeCard {
  return {
    id: buildMotherCardId(initialCoordinates),
    source: "initial_coordinates_mock",
    cardStatus,
  };
}

export function getMotherCodeAssets(): MotherCodeAsset[] {
  return motherCodeAssets;
}

export function getDemoMotherCode(): MotherCodeAsset {
  return motherCodeAssets[0];
}

export function getDemoPressureSeed(): PressureSeed {
  return demoPressureSeed;
}

export function getDemoPressureExposureOptions(): PressureExposureOption[] {
  return demoPressureExposureOptions;
}

export function getDemoDynamicsResult() {
  return demoDynamicsResult;
}

export function getDemoHexagramFieldReading(): HexagramFieldReading {
  return {
    identity: {
      hexagramNo: "047",
      hexagramName: "泽水困",
      fieldTitle: "围墙里的沉默者",
      lowerGuaLabel: "母码底盘",
      upperGuaLabel: "压力场",
      hexagramCode: "10101",
      renderStatus: "HEXAGRAM_CODE_RENDERED",
    },
    formation: {
      lowerSource: "母码惯性",
      upperSource: "压力牵引",
      collisionLine: "母码与压力场正在发生对撞。",
    },
    scriptState: {
      scriptName: "围墙困锁态",
      stateTag: "困锁",
      shareableTitle: "你不是没有路。你是在一个已经失去氧气的系统里，继续逼自己撑住。",
    },
    hitText: {
      line1: "你不是没有路。",
      line2: "你是在一个已经失去氧气的系统里，继续逼自己撑住。",
    },
    fieldReadings: [
      {
        dimension: "母码惯性",
        tag: "扛住",
        text: "你会先把压力压进身体，而不是立刻承认自己已经被卡住。",
      },
      {
        dimension: "压力牵引",
        tag: "困锁",
        text: "这个外部场正在反复制造一种“动也不是，不动也不是”的牵制感。",
      },
      {
        dimension: "现实切片",
        tag: "沉默",
        text: "那一幕真正触发你的，不是冲突本身，而是你发现自己又一次说不出口。",
      },
      {
        dimension: "行为反应",
        tag: "硬撑",
        text: "你会继续表现得还能处理，直到系统把你压到没有余量。",
      },
    ],
    next: {
      prompt: "场域已经显影。开始启动人格行为动力引擎。",
      cta: "启动人格行为动力引擎",
    },
  };
}

export function getDemoBreachScan(): BreachScanResult {
  return demoBreachScan;
}

export function getDemoBreachScanReading(): BreachScanReading {
  return {
    engineStatus: "BEHAVIOR_ENGINE_ACTIVATED",
    headline: "人格行为动力引擎已启动。",
    intro: "系统正在从本局人格行为场域中，扫描真正卡住你的切口。",
    primaryBreach: {
      id: "mud-point",
      type: "primary",
      title: "硬撑切口",
      tag: "主切口",
      description: "你真正卡住的地方，不是事情太多，而是你太快把所有压力都接到自己身上。",
      riskLine: "继续硬撑，会让你越来越难开口求助。",
    },
    secondaryBreaches: [
      {
        id: "wound-point",
        type: "secondary",
        title: "沉默切口",
        tag: "副切口",
        description: "你已经感觉不舒服，但仍然选择先不说。",
        riskLine: "沉默会让别人默认你还能承受。",
      },
      {
        id: "standby-point",
        type: "secondary",
        title: "补位切口",
        tag: "副切口",
        description: "当局面出现缺口时，你会本能地先去补位。",
        riskLine: "补位越快，别人越难意识到这不是你的责任。",
      },
    ],
    next: {
      prompt: "选择一个切口，作为本局下刀位置。",
      cta: "从这里下刀",
    },
  };
}

export function getYaoDevices(): YaoDevice[] {
  return demoYaoDevices;
}

export function activateYaoDeviceByBreachId(breachId: string): YaoDevice | undefined {
  const breach = demoBreachScan.breaches.find((item) => item.id === breachId);
  return breach ? demoYaoDevices.find((device) => device.id === breach.deviceId) : undefined;
}

export function getRepairMethodByDeviceId(deviceId: string): RepairMethod | undefined {
  if (deviceId === "stop-anchor") {
    return demoRepairMethods.find((method) => method.id === "withdraw-premature-commitment");
  }

  return undefined;
}

export function getDemoYaoDeviceDelivery(selectedBreachId = "mud-point"): YaoDeviceDelivery {
  const sourceBreach = getDemoBreachScanReading().primaryBreach.id === selectedBreachId
    ? getDemoBreachScanReading().primaryBreach
    : getDemoBreachScanReading().secondaryBreaches.find((breach) => breach.id === selectedBreachId) ??
      getDemoBreachScanReading().primaryBreach;

  return {
    deviceId: "yao-device-001",
    deviceName: "止进锚",
    deviceCode: "021-5",
    sourceBreachId: sourceBreach.id,
    sourceBreachTitle: sourceBreach.title,
    deviceStatus: "YAO_DEVICE_ACTIVATED",
    coreFunction: "把你从继续硬撑的自动反应里钉住。",
    deviceLine: "它不是让你更强，而是在你再次想硬推时，把你钉回一个可等待的位置。",
  };
}

export function getDemoRepairMethodDelivery(deviceId = "yao-device-001"): RepairMethodDelivery {
  return {
    methodId: "repair-method-001",
    methodName: "撤回一个过早承诺",
    methodStatus: "REPAIR_METHOD_RENDERED",
    sourceDeviceId: deviceId,
    firstAction: "今天暂停一个你已经答应、但其实风险未明的推进动作。",
    forbiddenAction: "不要继续用“我能处理”掩盖你已经陷进去。",
    relapseWarning: "你最容易在别人质疑你能力时，重新启动强行推进。",
    executionWindow: "24小时内",
  };
}

export function getDemoArchiveAssetSnapshot(): ArchiveAssetSnapshot {
  return {
    assetId: "archive-asset-001",
    archiveStatus: "PERSONALITY_ASSET_ARCHIVED",
    title: "撤回一个过早承诺",
    motherCodeRef: "母码已嵌入",
    pressureSeedRef: "现实压力种子已填装",
    hexagramRef: "本局卦码已生成",
    breachRef: "硬撑切口",
    yaoDeviceRef: "止进锚",
    repairMethodRef: "撤回一个过早承诺",
    assetLine: "压力没有白白消耗你，它已经沉积为一份人格资产。",
    package: {
      title: "本局人格行为资产包",
      scriptName: "围墙困锁态",
      primaryBreach: "硬撑切口",
      yaoDevice: "止进锚",
      firstCut: "撤回一个过早承诺",
    },
    todayFirstCut: {
      methodName: "撤回一个过早承诺",
      firstAction: "今天暂停一个你已经答应、但其实风险未明的推进动作。",
      forbiddenAction: "不要继续用“我能处理”掩盖你已经陷进去。",
      executionWindow: "24小时内",
      relapseWarning: "你最容易在别人质疑你能力时，重新启动强行推进。",
    },
    defense90d: {
      title: "90天行为防御本已生成",
      intro: "这不是一次性结果。它会在未来90天里，成为你识别复发、拦截旧反应、重写行为路径的防御资产。",
      phases: [
        {
          range: "第1—7天",
          name: "止血期",
          goal: "先停止旧反应扩大损失。",
        },
        {
          range: "第8—30天",
          name: "复发识别期",
          goal: "识别旧习惯回潮的触发器。",
        },
        {
          range: "第31—90天",
          name: "行为重写期",
          goal: "把本局器法沉积成新的行为路径。",
        },
      ],
    },
    deposit: [
      { label: "母码", value: "已嵌入" },
      { label: "现实压力", value: "已填装" },
      { label: "本局卦码", value: "已生成" },
      { label: "切口", value: "已下刀" },
      { label: "爻器", value: "已激活" },
      { label: "器法", value: "已落地" },
      { label: "90天防御本", value: "已生成" },
      { label: "状态", value: "PERSONALITY_ASSET_ARCHIVED" },
    ],
  };
}

type CreateSealedAssetInput = {
  motherCodeId?: string;
  pressureSeed?: PressureSeed;
  pressureExposure?: PressureExposureResult;
  breachScan?: BreachScanResult;
};

export function createSealedAsset(input: CreateSealedAssetInput = {}): GuanyaoAsset {
  const now = new Date().toISOString();

  return {
    id: `guanyao-asset-${now}`,
    motherCodeId: input.motherCodeId ?? getDemoMotherCode().id,
    pressureSeed: input.pressureSeed ?? demoPressureSeed,
    pressureExposure: input.pressureExposure,
    dynamicsResult: demoDynamicsResult,
    breachScan: input.breachScan ?? demoBreachScan,
    isBroken: false,
    status: "sealed",
    createdAt: now,
    updatedAt: now,
  };
}

type CreateActivatedAssetInput = CreateSealedAssetInput & {
  selectedBreachId: string;
};

export function createActivatedAsset(input: CreateActivatedAssetInput): GuanyaoAsset {
  const sealedAsset = createSealedAsset(input);
  const yaoDevice = activateYaoDeviceByBreachId(input.selectedBreachId);
  const repairMethod = yaoDevice ? getRepairMethodByDeviceId(yaoDevice.id) : undefined;
  const now = new Date().toISOString();

  return {
    ...sealedAsset,
    selectedBreachId: input.selectedBreachId,
    isBroken: true,
    yaoDevice,
    repairMethod,
    status: repairMethod ? "completed" : "activated",
    updatedAt: now,
  };
}
