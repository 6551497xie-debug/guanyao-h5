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
  MotherCodeAsset,
  PressureExposureOption,
  PressureExposureResult,
  PressureSeed,
  RepairMethod,
  YaoDevice,
} from "../types";

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
