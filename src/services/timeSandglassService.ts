import type { ChronoProfile, TimeSandglassState, TimeSandglassUnlocks } from "../types";

const TIME_SANDGLASS_KEY = "guanyao_h5_time_sandglass";
const defaultMaxEnergy = 6;
const defaultRecoveryIntervalMinutes = 360;

const defaultUnlocks: TimeSandglassUnlocks = {
  canStartSandbox: true,
  canRevealGuaField: true,
  canCompleteYaoFlow: true,
  canViewYaoCodeCard: true,
  canViewDefenseBook90d: true,
  canSaveArchive: true,
  canViewDeepSource: true,
};

function canUseStorage(): boolean {
  return typeof window !== "undefined" && Boolean(window.localStorage);
}

function addMinutes(date: Date, minutes: number) {
  return new Date(date.getTime() + minutes * 60 * 1000).toISOString();
}

function emitTimeSandglassChange() {
  if (typeof window !== "undefined") {
    window.dispatchEvent(new Event("guanyao:timeSandglass"));
  }
}

function persistTimeSandglass(nextState: TimeSandglassState): TimeSandglassState {
  if (canUseStorage()) {
    try {
      window.localStorage.setItem(TIME_SANDGLASS_KEY, JSON.stringify(nextState));
    } catch {
      return nextState;
    }
  }

  emitTimeSandglassChange();
  return nextState;
}

function buildStableId(chronoProfile?: ChronoProfile | null) {
  return `sandglass_${chronoProfile?.chronoHash ?? chronoProfile?.birthDate ?? "session"}`;
}

export function buildInitialTimeSandglass(chronoProfile?: ChronoProfile | null): TimeSandglassState {
  const now = new Date();

  return {
    id: buildStableId(chronoProfile),
    currentEnergy: defaultMaxEnergy,
    maxEnergy: defaultMaxEnergy,
    unitName: "砂",
    status: "stable",
    lastRecoveredAt: now.toISOString(),
    nextRecoveryAt: addMinutes(now, defaultRecoveryIntervalMinutes),
    recoveryIntervalMinutes: defaultRecoveryIntervalMinutes,
    recoveryAmount: 1,
    totalConsumed: 0,
    totalRecharged: 0,
    unlocks: defaultUnlocks,
    consumptionLog: [
      {
        id: `log_${now.getTime()}_chrono`,
        action: "chrono_calibration",
        amount: 0,
        occurredAt: now.toISOString(),
        note: "元码已生成，沙漏已点亮",
      },
    ],
    mockPayment: {
      enabled: false,
    },
  };
}

export function getTimeSandglassState(): TimeSandglassState | null {
  if (!canUseStorage()) return null;

  try {
    const rawState = window.localStorage.getItem(TIME_SANDGLASS_KEY);
    return rawState ? (JSON.parse(rawState) as TimeSandglassState) : null;
  } catch {
    return null;
  }
}

export function initializeTimeSandglassAfterChrono(chronoProfile: ChronoProfile): TimeSandglassState {
  const existingState = getTimeSandglassState();
  if (existingState?.id === buildStableId(chronoProfile)) {
    return existingState;
  }

  return persistTimeSandglass(buildInitialTimeSandglass(chronoProfile));
}

export function consumeEnergy(action: string, amount: number, note?: string): TimeSandglassState {
  const currentState = getTimeSandglassState() ?? buildInitialTimeSandglass();
  const now = new Date();
  const nextEnergy = Math.max(0, currentState.currentEnergy - amount);
  const nextStatus = nextEnergy <= 0 ? "empty" : nextEnergy <= 1 ? "low" : currentState.status === "mock_paid" ? "mock_paid" : "stable";
  const nextState: TimeSandglassState = {
    ...currentState,
    currentEnergy: nextEnergy,
    status: nextStatus,
    totalConsumed: (currentState.totalConsumed ?? 0) + amount,
    consumptionLog: [
      ...(currentState.consumptionLog ?? []),
      {
        id: `log_${now.getTime()}_${action}`,
        action,
        amount,
        occurredAt: now.toISOString(),
        note,
      },
    ],
  };

  return persistTimeSandglass(nextState);
}

export function recoverEnergy(): TimeSandglassState {
  const currentState = getTimeSandglassState() ?? buildInitialTimeSandglass();
  const now = new Date();
  const recoveredEnergy = Math.min(currentState.maxEnergy, currentState.currentEnergy + (currentState.recoveryAmount ?? 1));
  const nextState: TimeSandglassState = {
    ...currentState,
    currentEnergy: recoveredEnergy,
    status: recoveredEnergy <= 1 ? "low" : "stable",
    lastRecoveredAt: now.toISOString(),
    nextRecoveryAt: addMinutes(now, currentState.recoveryIntervalMinutes ?? defaultRecoveryIntervalMinutes),
    totalRecharged: (currentState.totalRecharged ?? 0) + (currentState.recoveryAmount ?? 1),
  };

  return persistTimeSandglass(nextState);
}

export function mockRecharge(packageId: string): TimeSandglassState {
  const currentState = getTimeSandglassState() ?? buildInitialTimeSandglass();
  const now = new Date();
  const nextState: TimeSandglassState = {
    ...currentState,
    currentEnergy: currentState.maxEnergy,
    status: "mock_paid",
    totalRecharged: (currentState.totalRecharged ?? 0) + currentState.maxEnergy,
    mockPayment: {
      enabled: true,
      lastMockPaidAt: now.toISOString(),
      lastMockAmount: currentState.maxEnergy,
      packageId,
    },
  };

  return persistTimeSandglass(nextState);
}

export function canUnlock(featureKey: keyof TimeSandglassUnlocks): boolean {
  const currentState = getTimeSandglassState();
  return currentState?.unlocks?.[featureKey] ?? true;
}

export function getConsumptionLog() {
  return getTimeSandglassState()?.consumptionLog ?? [];
}
