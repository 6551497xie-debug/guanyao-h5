import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import process from "node:process";
import { build } from "esbuild";

const rootDir = process.cwd();
const adapterPath = path.join(rootDir, "src/services/guanyaoDynamicsPersonalityRingDepositAdapter.ts");
const gravityPath = path.join(rootDir, "src/pages/GravityPage.tsx");
const adapterSource = fs.readFileSync(adapterPath, "utf8");
const gravitySource = fs.readFileSync(gravityPath, "utf8");
const tempModulePath = path.join(os.tmpdir(), `guanyao-personality-ring-deposit-${process.pid}.mjs`);

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
let rejectWrites = false;
globalThis.window = {
  localStorage: {
    getItem: (key) => storage.get(key) ?? null,
    setItem: (key, value) => {
      if (rejectWrites) throw new Error("storage write rejected");
      storage.set(key, String(value));
    },
  },
};

const currentCrystalEndState = (createdAt = "2026-07-14T00:00:00.000Z") => ({
  source: "dynamics",
  status: "CRYSTALLIZED",
  createdAt,
  mother: {
    motherCodeName: "兑｜连接者",
    lowerTrigram: "兑",
  },
  pressure: {
    selectedPressureSeedId: "deposit-seed",
    surface: "不进入展示但保留既有 V1 条目结构",
    pressureField: "POWER",
  },
  hexagram: {
    lowerTrigram: "兑",
    upperTrigram: "乾",
    hexagramCode: "010",
    hexagramName: "天泽履",
    hexagramTitle: "冰上",
  },
  transmission: {
    completedNodeCount: 6,
    primaryDimension: "action",
  },
  crystal: {
    title: "本局结晶",
    copy: "这一局把快速行动恢复掌控，转向先判断真正要解决的问题。",
  },
});

try {
  await build({
    entryPoints: [adapterPath],
    outfile: tempModulePath,
    bundle: true,
    platform: "node",
    format: "esm",
    target: "node20",
    logLevel: "silent",
  });

  const { depositDynamicsCurrentCrystalToPersonalityRing } = await import(
    `file://${tempModulePath}?t=${Date.now()}`
  );

  assertEqual("loading deposit adapter does not write", storage.size, 0);

  const deposited = depositDynamicsCurrentCrystalToPersonalityRing({
    currentCrystalEndState: currentCrystalEndState(),
  });
  assertEqual("eligible crystal is deposited", deposited.status, "DEPOSITED");
  assertEqual("deposited state keeps V1 schema", deposited.state.version, "1.0");
  assertEqual("deposited state contains one entry", deposited.state.entries.length, 1);
  assertEqual("deposited entry keeps timestamp", deposited.entry?.createdAt, "2026-07-14T00:00:00.000Z");
  assertEqual("deposited entry keeps crystal copy", deposited.entry?.crystal.copy, currentCrystalEndState().crystal.copy);
  assertEqual(
    "successful deposit writes one persisted entry",
    JSON.parse(storage.get("guanyao:personalityRingLite")).entries.length,
    1,
  );

  const duplicate = depositDynamicsCurrentCrystalToPersonalityRing({
    currentCrystalEndState: currentCrystalEndState(),
  });
  assertEqual("same crystal is reported as duplicate", duplicate.status, "DUPLICATE");
  assertEqual("duplicate keeps existing state", duplicate.state.entries.length, 1);
  assertEqual(
    "duplicate does not append persisted entry",
    JSON.parse(storage.get("guanyao:personalityRingLite")).entries.length,
    1,
  );

  storage.clear();
  const invalidCrystal = {
    ...currentCrystalEndState("2026-07-14T01:00:00.000Z"),
    status: "NOT_READY",
  };
  const rejectedCrystal = depositDynamicsCurrentCrystalToPersonalityRing({
    currentCrystalEndState: invalidCrystal,
  });
  assertEqual("ineligible crystal is rejected", rejectedCrystal.status, "REJECTED");
  assertEqual("ineligible crystal reports reason", rejectedCrystal.reason, "CRYSTAL_NOT_ELIGIBLE");
  assertEqual("ineligible crystal does not write", storage.size, 0);

  rejectWrites = true;
  const rejectedPersistence = depositDynamicsCurrentCrystalToPersonalityRing({
    currentCrystalEndState: currentCrystalEndState("2026-07-14T02:00:00.000Z"),
  });
  rejectWrites = false;
  assertEqual("failed persistence is rejected", rejectedPersistence.status, "REJECTED");
  assertEqual("failed persistence reports reason", rejectedPersistence.reason, "PERSISTENCE_REJECTED");
  assertEqual("failed persistence returns unchanged state", rejectedPersistence.state.entries.length, 0);
  assertEqual("failed persistence leaves storage empty", storage.size, 0);

  const browserWindow = globalThis.window;
  delete globalThis.window;
  const unavailablePersistence = depositDynamicsCurrentCrystalToPersonalityRing({
    currentCrystalEndState: currentCrystalEndState("2026-07-14T03:00:00.000Z"),
  });
  globalThis.window = browserWindow;
  assertEqual("unavailable persistence is rejected", unavailablePersistence.status, "REJECTED");
  assertEqual("unavailable persistence reports reason", unavailablePersistence.reason, "PERSISTENCE_REJECTED");
  assertEqual("unavailable persistence returns empty state", unavailablePersistence.state.entries.length, 0);

  assertIncludes(
    "deposit adapter owns independent input",
    adapterSource,
    "export type DynamicsPersonalityRingDepositAdapterInput",
  );
  assertIncludes(
    "deposit adapter owns discriminated result",
    adapterSource,
    "export type DynamicsPersonalityRingDepositResult",
  );
  assertIncludes("deposit adapter exposes deposited status", adapterSource, 'status: "DEPOSITED"');
  assertIncludes("deposit adapter exposes duplicate status", adapterSource, 'status: "DUPLICATE"');
  assertIncludes("deposit adapter exposes rejected status", adapterSource, 'status: "REJECTED"');
  assertIncludes(
    "deposit adapter delegates entry formation",
    adapterSource,
    "createPersonalityRingLiteEntryFromCrystal(input.currentCrystalEndState)",
  );
  assertIncludes(
    "deposit adapter delegates ring persistence",
    adapterSource,
    "savePersonalityRingLiteEntry(entry)",
  );
  assertIncludes(
    "deposit adapter verifies persisted state through domain service",
    adapterSource,
    "const persistedState = readPersonalityRingLite()",
  );
  assertExcludes("deposit adapter does not own storage key", adapterSource, "guanyao:personalityRingLite");
  assertExcludes("deposit adapter stays localStorage neutral", adapterSource, "localStorage");

  const handlerStart = gravitySource.indexOf("function saveToPersonalityRingLite()");
  const handlerEnd = gravitySource.indexOf("\n  }\n\n  return (", handlerStart);
  const handlerSource = gravitySource.slice(handlerStart, handlerEnd);
  assertIncludes(
    "user click handler delegates deposit adapter",
    handlerSource,
    "depositDynamicsCurrentCrystalToPersonalityRing({",
  );
  assertEqual(
    "Gravity has one explicit deposit trigger",
    gravitySource.match(/depositDynamicsCurrentCrystalToPersonalityRing\(\{/g)?.length,
    1,
  );
  assertExcludes(
    "Gravity no longer forms ring entries directly",
    gravitySource,
    "createPersonalityRingLiteEntryFromCrystal",
  );
  assertExcludes(
    "Gravity no longer persists ring entries directly",
    gravitySource,
    "savePersonalityRingLiteEntry",
  );

  console.log("\n[DYNAMICS PERSONALITY RING DEPOSIT ADAPTER] PASS");
} catch (error) {
  console.error("[DYNAMICS PERSONALITY RING DEPOSIT ADAPTER] FAIL");
  console.error(error instanceof Error ? error.message : error);
  process.exit(1);
} finally {
  fs.rmSync(tempModulePath, { force: true });
}
