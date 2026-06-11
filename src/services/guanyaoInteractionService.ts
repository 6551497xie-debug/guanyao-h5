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
