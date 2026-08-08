import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import process from "node:process";
import { build } from "esbuild";

const rootDir = process.cwd();
const tempDir = fs.mkdtempSync(
  path.join(os.tmpdir(), "xinmai-genesis-source-recovery-"),
);
const entryPath = path.join(tempDir, "entry.ts");
const outputPath = path.join(tempDir, "bundle.mjs");
const modulePath = (relative) => JSON.stringify(path.join(rootDir, relative));
const assert = (condition, message) => {
  if (!condition) throw new Error(message);
};

class MemoryStorage {
  #values = new Map();
  getItem(key) {
    return this.#values.has(key) ? this.#values.get(key) : null;
  }
  setItem(key, value) {
    this.#values.set(key, String(value));
  }
  removeItem(key) {
    this.#values.delete(key);
  }
  clear() {
    this.#values.clear();
  }
}

try {
  fs.writeFileSync(
    entryPath,
    [
      `export { resolveLaunchOriginMotherSourceResults } from ${modulePath("src/services/guanyaoLaunchOriginMotherInputAdapter.ts")};`,
      `export { createLaunchLifeSourceSession } from ${modulePath("src/services/launchLifeSourceSession.ts")};`,
      `export { persistLaunchLifeSourceSession, readPersistedLaunchLifeSourceRecoveryRepresentations } from ${modulePath("src/services/sessionService.ts")};`,
      `export { writeOriginMotherContext } from ${modulePath("src/services/guanyaoOriginMotherContextPersistenceAdapter.ts")};`,
      `export { recoverXinmaiGenesisBirthSource } from ${modulePath("src/services/xinmaiGenesisBirthSourceRecoveryController.ts")};`,
      `export { clearRealUserGenesisVisualSourceContext } from ${modulePath("src/services/realUserGenesisVisualSourceContext.ts")};`,
    ].join("\n"),
  );
  await build({
    entryPoints: [entryPath],
    outfile: outputPath,
    bundle: true,
    platform: "node",
    format: "esm",
    target: "node20",
    logLevel: "silent",
  });

  const runtime = await import(`file://${outputPath}?t=${Date.now()}`);
  const localStorage = new MemoryStorage();
  globalThis.window = { localStorage };

  const createSession = (sourceReferenceId, year, month, day, hourBranch) => {
    const input = {
      birth: { year, month, day, hourBranch },
      periodIndex: 0,
      geo: { province: "未采集", city: "未采集" },
      starbeast: {
        nodeCount: 28,
        primaryNodeIndex: 14,
        originLightTrace: "28光兽入口",
      },
    };
    const sources = runtime.resolveLaunchOriginMotherSourceResults(input);
    const result = runtime.createLaunchLifeSourceSession({
      sourceReferenceId,
      birthCoordinate: input.birth,
      ...sources,
    });
    assert(result.status === "AVAILABLE", "public source session setup blocked");
    return result.session;
  };

  const sourceA = createSession("launch:recovery:a", 1988, 8, 8, "辰时");
  const sourceB = createSession("launch:recovery:b", 1992, 2, 2, "午时");
  const reset = () => {
    localStorage.clear();
    runtime.clearRealUserGenesisVisualSourceContext();
  };

  reset();
  const missing = runtime.recoverXinmaiGenesisBirthSource({
    intent: "AUTHORIZE_GENESIS_ROUTE",
  });
  assert(
    missing.status === "SOURCE_NOT_READY" &&
      missing.reason === "PERSISTED_SOURCE_NOT_FOUND",
    "missing source does not remain not-ready",
  );

  runtime.persistLaunchLifeSourceSession(sourceA);
  const primaryOnly = runtime.recoverXinmaiGenesisBirthSource({
    intent: "AUTHORIZE_GENESIS_ROUTE",
    expectedSourceReferenceId: sourceA.sourceReferenceId,
  });
  assert(
    primaryOnly.status === "READY" &&
      primaryOnly.sourceReferenceId === sourceA.sourceReferenceId &&
      primaryOnly.proof === "PRIMARY",
    "canonical primary cannot recover exact source",
  );

  runtime.writeOriginMotherContext({ lifeSourceSession: sourceA });
  const matched = runtime.recoverXinmaiGenesisBirthSource({
    intent: "AUTHORIZE_GENESIS_ROUTE",
    expectedSourceReferenceId: sourceA.sourceReferenceId,
  });
  assert(
    matched.status === "READY" &&
      matched.sourceReferenceId === sourceA.sourceReferenceId &&
      matched.proof === "PRIMARY_AND_ORIGIN_MATCHED",
    "matching primary and mirror do not converge",
  );

  reset();
  runtime.persistLaunchLifeSourceSession(sourceA);
  runtime.writeOriginMotherContext({ lifeSourceSession: sourceB });
  const conflictState =
    runtime.readPersistedLaunchLifeSourceRecoveryRepresentations();
  const conflict = runtime.recoverXinmaiGenesisBirthSource({
    intent: "AUTHORIZE_GENESIS_ROUTE",
  });
  assert(conflictState.status === "CONFLICT", "reference conflict not typed");
  assert(
    conflict.status === "SAFE_WITHHELD" &&
      conflict.reason === "PERSISTED_SOURCE_CONFLICT",
    "persisted reference conflict selects a silent winner",
  );

  reset();
  runtime.writeOriginMotherContext({ lifeSourceSession: sourceA });
  const mirrorGenesis = runtime.recoverXinmaiGenesisBirthSource({
    intent: "AUTHORIZE_GENESIS_ROUTE",
  });
  assert(
    mirrorGenesis.status === "SOURCE_NOT_READY" &&
      mirrorGenesis.reason === "PRIMARY_SOURCE_REQUIRED",
    "origin-only mirror authorizes a new Genesis route",
  );
  const mirrorReturning = runtime.recoverXinmaiGenesisBirthSource({
    intent: "RESTORE_RETURNING_LIFE",
    recognizedSourceReferenceId: sourceA.sourceReferenceId,
  });
  assert(
    mirrorReturning.status === "READY" &&
      mirrorReturning.proof === "LEGACY_RECOGNIZED_MATCH",
    "recognized legacy mirror cannot recover through typed proof",
  );

  reset();
  runtime.persistLaunchLifeSourceSession(sourceA);
  runtime.writeOriginMotherContext({ lifeSourceSession: sourceA });
  const activeA = runtime.recoverXinmaiGenesisBirthSource({
    intent: "AUTHORIZE_GENESIS_ROUTE",
    expectedSourceReferenceId: sourceA.sourceReferenceId,
  });
  assert(activeA.status === "READY", "source A did not become active");
  runtime.persistLaunchLifeSourceSession(sourceB);
  runtime.writeOriginMotherContext({ lifeSourceSession: sourceB });
  const fencedB = runtime.recoverXinmaiGenesisBirthSource({
    intent: "AUTHORIZE_GENESIS_ROUTE",
    expectedSourceReferenceId: sourceB.sourceReferenceId,
  });
  assert(
    fencedB.status === "SAFE_WITHHELD" &&
      fencedB.reason === "ACTIVE_SOURCE_REFERENCE_CONFLICT",
    "different source replaced the active source without fencing",
  );

  console.log("[XINMAI GENESIS BIRTH SOURCE REFRESH RECOVERY] PASS");
} finally {
  delete globalThis.window;
  fs.rmSync(tempDir, { recursive: true, force: true });
}
