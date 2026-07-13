import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import process from "node:process";
import { build } from "esbuild";

const rootDir = process.cwd();
const persistencePath = path.join(rootDir, "src/services/guanyaoTimeSandglassPersistenceAdapter.ts");
const servicePath = path.join(rootDir, "src/services/timeSandglassService.ts");
const sessionPath = path.join(rootDir, "src/services/sessionService.ts");
const persistenceSource = fs.readFileSync(persistencePath, "utf8");
const serviceSource = fs.readFileSync(servicePath, "utf8");
const sessionSource = fs.readFileSync(sessionPath, "utf8");
const tempModulePath = path.join(
  os.tmpdir(),
  `guanyao-time-sandglass-persistence-${process.pid}.mjs`,
);

const assertEqual = (name, actual, expected) => {
  if (actual !== expected) throw new Error(`${name} expected=${expected} actual=${actual}`);
  console.log(`PASS | ${name} | expected=${expected} | actual=${actual}`);
};

const assertIncludes = (name, source, expected) => {
  if (!source.includes(expected)) throw new Error(`${name} missing=${expected}`);
  console.log(`PASS | ${name} | includes=${expected}`);
};

const assertExcludes = (name, source, forbidden) => {
  if (source.includes(forbidden)) throw new Error(`${name} forbidden=${forbidden}`);
  console.log(`PASS | ${name} | forbidden=absent`);
};

const storage = new Map();
const events = [];
globalThis.window = {
  localStorage: {
    getItem: (key) => storage.get(key) ?? null,
    setItem: (key, value) => storage.set(key, value),
  },
  dispatchEvent: (event) => {
    events.push(event.type);
    return true;
  },
};

try {
  await build({
    entryPoints: [servicePath],
    outfile: tempModulePath,
    bundle: true,
    platform: "node",
    format: "esm",
    target: "node20",
    logLevel: "silent",
  });

  const {
    consumeEnergy,
    getTimeSandglassState,
    mockRecharge,
    recoverEnergy,
  } = await import(`file://${tempModulePath}?t=${Date.now()}`);

  const legacyState = {
    id: "sandglass_legacy",
    currentEnergy: 4,
    maxEnergy: 6,
    unitName: "砂",
    status: "stable",
    recoveryAmount: 1,
    recoveryIntervalMinutes: 360,
    totalConsumed: 1,
    totalRecharged: 0,
    unlocks: { canSaveArchive: true },
    consumptionLog: [],
  };
  storage.set("guanyao_h5_time_sandglass", JSON.stringify(legacyState));
  assertEqual("service reads legacy raw sandglass state", getTimeSandglassState()?.currentEnergy, 4);

  const consumedState = consumeEnergy("runtime-check", 2, "gate");
  assertEqual("consume keeps energy subtraction", consumedState.currentEnergy, 2);
  assertEqual("consume keeps cumulative accounting", consumedState.totalConsumed, 3);
  assertEqual("consume appends action log", consumedState.consumptionLog.at(-1)?.action, "runtime-check");
  assertEqual("successful persistence emits change event", events.length, 1);
  assertEqual(
    "service writes V2 sandglass envelope",
    JSON.parse(storage.get("guanyao_h5_time_sandglass")).schemaVersion,
    "GUANYAO_TIME_SANDGLASS_V2",
  );

  const recoveredState = recoverEnergy();
  assertEqual("recover keeps capped energy addition", recoveredState.currentEnergy, 3);
  assertEqual("recover emits change event", events.length, 2);

  const rechargedState = mockRecharge("gate-package");
  assertEqual("mock recharge restores max energy", rechargedState.currentEnergy, 6);
  assertEqual("mock recharge keeps mock-paid status", rechargedState.status, "mock_paid");
  assertEqual("mock recharge emits change event", events.length, 3);

  storage.set("guanyao_h5_time_sandglass", JSON.stringify(legacyState));
  const setItem = window.localStorage.setItem;
  window.localStorage.setItem = () => {
    throw new Error("storage unavailable");
  };
  const failedWriteState = consumeEnergy("failed-write", 1);
  assertEqual("failed storage still returns calculated state", failedWriteState.currentEnergy, 3);
  assertEqual("failed storage preserves no-event timing", events.length, 3);
  window.localStorage.setItem = setItem;

  storage.set(
    "guanyao_h5_time_sandglass",
    JSON.stringify({ schemaVersion: "UNKNOWN", state: legacyState }),
  );
  assertEqual("unknown sandglass schema is rejected", getTimeSandglassState(), null);

  assertIncludes("sandglass service delegates persisted state reading", serviceSource, "readPersistedTimeSandglassState<TimeSandglassState>()");
  assertIncludes("sandglass service delegates persisted state writing", serviceSource, "writePersistedTimeSandglassState(nextState)");
  assertIncludes("sandglass service preserves failed-write event boundary", serviceSource, 'writeStatus !== "FAILED"');
  assertIncludes("sandglass service keeps change event", serviceSource, 'new Event("guanyao:timeSandglass")');
  assertIncludes("sandglass service keeps default energy", serviceSource, "const defaultMaxEnergy = 6");
  assertIncludes("sandglass service keeps recovery interval", serviceSource, "const defaultRecoveryIntervalMinutes = 360");
  assertIncludes("sandglass service keeps consume floor", serviceSource, "Math.max(0, currentState.currentEnergy - amount)");
  assertIncludes("sandglass service keeps recovery cap", serviceSource, "Math.min(currentState.maxEnergy");
  assertExcludes("sandglass service does not own persistence key", serviceSource, "guanyao_h5_time_sandglass");
  assertExcludes("sandglass service stays localStorage neutral", serviceSource, "localStorage");
  assertIncludes("session keeps chrono-triggered sandglass initialization", sessionSource, "initializeTimeSandglassAfterChrono(chronoProfile)");
  assertIncludes(
    "adapter owns sandglass storage key",
    persistenceSource,
    'GUANYAO_TIME_SANDGLASS_STORAGE_KEY = "guanyao_h5_time_sandglass"',
  );
  assertIncludes(
    "adapter owns sandglass schema version",
    persistenceSource,
    '"GUANYAO_TIME_SANDGLASS_V2" as const',
  );

  console.log("\n[TIME SANDGLASS PERSISTENCE SEMANTICS] PASS");
} catch (error) {
  console.error("[TIME SANDGLASS PERSISTENCE SEMANTICS] FAIL");
  console.error(error instanceof Error ? error.message : error);
  process.exit(1);
} finally {
  fs.rmSync(tempModulePath, { force: true });
}
