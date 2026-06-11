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
  GuanyaoAsset,
  HexagramFieldReading,
  InitialCoordinates,
  MotherCodeAsset,
  MotherCodeCard,
  PressureExposureOption,
  PressureExposureResult,
  PressureSeed,
  RepairMethod,
  YaoDevice,
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
