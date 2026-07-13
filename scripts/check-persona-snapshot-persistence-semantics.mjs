import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import process from "node:process";
import { build } from "esbuild";

const rootDir = process.cwd();
const tempDir = fs.mkdtempSync(path.join(os.tmpdir(), "guanyao-persona-snapshot-semantics-"));
const paths = {
  adapter: path.join(rootDir, "src/services/guanyaoStoredMotherContextAdapter.ts"),
  cache: path.join(rootDir, "src/services/guanyaoPersonaSnapshotCache.ts"),
  engine: path.join(rootDir, "src/services/guanyaoDeterministicPersonaEngine.ts"),
  trigger: path.join(rootDir, "src/services/guanyaoPersonaGenerationTrigger.ts"),
  persistence: path.join(rootDir, "src/services/guanyaoPersonaSnapshotPersistenceAdapter.ts"),
  runtimeTypes: path.join(rootDir, "src/types/gravityRuntimeInput.ts"),
  launch: path.join(rootDir, "src/pages/LaunchLab.tsx"),
  gravity: path.join(rootDir, "src/pages/GravityPage.tsx"),
  motherLab: path.join(rootDir, "src/pages/MotherLab.tsx"),
  fixtures: path.join(rootDir, "src/services/fixtures/changeExperienceRuntimeSmokeFixtures.ts"),
};

const sources = Object.fromEntries(
  Object.entries(paths).map(([key, filePath]) => [key, fs.readFileSync(filePath, "utf8")]),
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

const bundleAndImport = async (entryPath, outputName) => {
  const outfile = path.join(tempDir, outputName);
  await build({
    entryPoints: [entryPath],
    outfile,
    bundle: true,
    platform: "node",
    format: "esm",
    target: "node20",
    logLevel: "silent",
  });
  return import(`file://${outfile}?t=${Date.now()}`);
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

try {
  const [adapterModule, cacheModule, engineModule, triggerModule, persistenceModule] = await Promise.all([
    bundleAndImport(paths.adapter, "adapter.mjs"),
    bundleAndImport(paths.cache, "cache.mjs"),
    bundleAndImport(paths.engine, "engine.mjs"),
    bundleAndImport(paths.trigger, "trigger.mjs"),
    bundleAndImport(paths.persistence, "persistence.mjs"),
  ]);
  const { resolveStoredMotherFourSymbol } = adapterModule;
  const { readCachedPersonaOutput } = cacheModule;
  const {
    buildPersonaOutputSnapshot,
    generatePersona,
    writePersonaOutputSnapshotFromDeterministicEngine,
  } = engineModule;
  const { PERSONA_GENERATION_TRIGGER_STATE, triggerPersonaGeneration } = triggerModule;
  const {
    GUANYAO_PERSONA_SNAPSHOT_SCHEMA_VERSION,
    readPersistedPersonaOutputSnapshot,
    writePersonaOutputSnapshot,
  } = persistenceModule;

  const context = (originMotherContext, personaOutputSnapshot) => ({
    selectedPressureSeedContext: null,
    motherCodeProfile: null,
    originMotherContext,
    personaOutputSnapshot,
  });
  assertEqual(
    "formal persona fourSymbol wins all legacy fallbacks",
    resolveStoredMotherFourSymbol(context(
      { fourBeast: "白虎", geo: { symbol: "玄武" } },
      { starbeast: { fourSymbol: "青龙" }, fourBeast: "朱雀", direction: "白虎" },
    )),
    "青龙",
  );
  assertEqual(
    "legacy persona fourBeast remains readable",
    resolveStoredMotherFourSymbol(context(null, { fourBeast: "朱雀" })),
    "朱雀",
  );
  assertEqual(
    "legacy persona direction remains readable",
    resolveStoredMotherFourSymbol(context(null, { direction: "玄武" })),
    "玄武",
  );

  storage.set("guanyao:personaOutputSnapshot", JSON.stringify({
    motherCode: "兑",
    trigram: "兑",
    starOrigin: { index: 6 },
    starbeast: { fourSymbol: "青龙" },
    fourBeast: "朱雀",
    direction: "白虎",
  }));
  assertEqual("MotherLab cache prioritizes formal fourSymbol", readCachedPersonaOutput()?.fourSymbol, "青龙");

  storage.set("guanyao:personaOutputSnapshot", JSON.stringify({
    motherCode: "兑",
    trigram: "兑",
    starOrigin: { index: 6 },
    direction: "白虎",
  }));
  assertEqual("MotherLab cache reads legacy direction", readCachedPersonaOutput()?.fourSymbol, "白虎");
  assertEqual(
    "persistence adapter reads unversioned legacy snapshot",
    readPersistedPersonaOutputSnapshot()?.direction,
    "白虎",
  );

  const versionedByAdapter = writePersonaOutputSnapshot({
    motherCode: "兑",
    trigram: "兑",
    starbeast: { fourSymbol: "青龙" },
  });
  assertEqual(
    "persistence adapter attaches schema version",
    versionedByAdapter.schemaVersion,
    GUANYAO_PERSONA_SNAPSHOT_SCHEMA_VERSION,
  );
  assertEqual("persistence adapter preserves snapshot immutability", Object.isFrozen(versionedByAdapter), true);
  assertEqual(
    "persistence adapter stores schema version",
    JSON.parse(storage.get("guanyao:personaOutputSnapshot")).schemaVersion,
    "GUANYAO_PERSONA_SNAPSHOT_V2",
  );

  rejectWrites = true;
  const rejectedAdapterWrite = writePersonaOutputSnapshot({
    motherCode: "坎",
    trigram: "坎",
    starbeast: { fourSymbol: "玄武" },
  });
  rejectWrites = false;
  assertEqual(
    "rejected adapter write preserves formal snapshot",
    rejectedAdapterWrite.starbeast.fourSymbol,
    "玄武",
  );
  assertEqual(
    "rejected adapter write preserves schema version",
    rejectedAdapterWrite.schemaVersion,
    GUANYAO_PERSONA_SNAPSHOT_SCHEMA_VERSION,
  );
  assertEqual(
    "rejected adapter write preserves snapshot immutability",
    Object.isFrozen(rejectedAdapterWrite),
    true,
  );
  assertEqual(
    "rejected adapter write does not replace persisted snapshot",
    JSON.parse(storage.get("guanyao:personaOutputSnapshot")).trigram,
    "兑",
  );

  const availableWindow = globalThis.window;
  globalThis.window = {};
  const unavailableStorageSnapshot = writePersonaOutputSnapshot({
    motherCode: "离",
    trigram: "离",
    starbeast: { fourSymbol: "朱雀" },
  });
  globalThis.window = availableWindow;
  assertEqual(
    "unavailable storage preserves formal snapshot",
    unavailableStorageSnapshot.starbeast.fourSymbol,
    "朱雀",
  );
  assertEqual(
    "unavailable storage preserves snapshot immutability",
    Object.isFrozen(unavailableStorageSnapshot),
    true,
  );

  const generationInput = {
    chrono: { year: 1995, month: 6, day: 2, hour: "酉时" },
    geo: { province: "广东", city: "广州" },
  };
  const result = generatePersona(generationInput);
  const formalSnapshot = buildPersonaOutputSnapshot(result);
  assertEqual("deterministic snapshot declares schema version", formalSnapshot.schemaVersion, "GUANYAO_PERSONA_SNAPSHOT_V2");
  assertEqual("deterministic writer builds formal fourSymbol", formalSnapshot.starbeast.fourSymbol, result.direction);
  assertEqual("deterministic writer omits direction", "direction" in formalSnapshot, false);
  assertEqual("deterministic writer omits fourBeast", "fourBeast" in formalSnapshot, false);

  const legacySnapshot = { ...formalSnapshot, direction: formalSnapshot.starbeast.fourSymbol };
  delete legacySnapshot.starbeast;
  delete legacySnapshot.schemaVersion;
  storage.set("guanyao:personaOutputSnapshot", JSON.stringify(legacySnapshot));
  const compatibleWrite = writePersonaOutputSnapshotFromDeterministicEngine(result);
  assertEqual("deterministic writer accepts matching legacy cache", compatibleWrite.starbeast.fourSymbol, result.direction);
  assertEqual("deterministic writer leaves matching legacy cache untouched", JSON.parse(storage.get("guanyao:personaOutputSnapshot")).schemaVersion, undefined);

  storage.clear();
  writePersonaOutputSnapshotFromDeterministicEngine(result);
  assertEqual(
    "deterministic writer delegates versioned persistence",
    JSON.parse(storage.get("guanyao:personaOutputSnapshot")).schemaVersion,
    "GUANYAO_PERSONA_SNAPSHOT_V2",
  );

  storage.clear();
  rejectWrites = true;
  const rejectedDeterministicWrite = writePersonaOutputSnapshotFromDeterministicEngine(result);
  rejectWrites = false;
  assertEqual(
    "rejected deterministic write preserves formal fourSymbol",
    rejectedDeterministicWrite.starbeast.fourSymbol,
    result.direction,
  );
  assertEqual(
    "rejected deterministic write preserves schema version",
    rejectedDeterministicWrite.schemaVersion,
    GUANYAO_PERSONA_SNAPSHOT_SCHEMA_VERSION,
  );
  assertEqual(
    "rejected deterministic write preserves snapshot immutability",
    Object.isFrozen(rejectedDeterministicWrite),
    true,
  );
  assertEqual("rejected deterministic write leaves storage empty", storage.size, 0);

  assertEqual(
    "trigger state names snapshot completion without claiming persistence",
    PERSONA_GENERATION_TRIGGER_STATE.SNAPSHOT_FINALIZED,
    "snapshot_finalized",
  );
  assertEqual(
    "trigger state removes written success claim",
    "WRITTEN" in PERSONA_GENERATION_TRIGGER_STATE,
    false,
  );
  storage.clear();
  rejectWrites = true;
  const rejectedTriggerWrite = await triggerPersonaGeneration(generationInput);
  rejectWrites = false;
  assertEqual(
    "rejected trigger write preserves formal snapshot",
    rejectedTriggerWrite.starbeast.fourSymbol,
    result.direction,
  );
  assertEqual(
    "rejected trigger write preserves schema version",
    rejectedTriggerWrite.schemaVersion,
    GUANYAO_PERSONA_SNAPSHOT_SCHEMA_VERSION,
  );
  assertEqual("rejected trigger write leaves storage empty", storage.size, 0);

  const storedTypeBlock = sources.runtimeTypes.slice(
    sources.runtimeTypes.indexOf("export type StoredPersonaOutputSnapshot"),
    sources.runtimeTypes.indexOf("export type StoredOriginMotherContext"),
  );
  const launchSnapshotBlock = sources.launch.slice(
    sources.launch.indexOf("const personaOutputSnapshot ="),
    sources.launch.indexOf("try {", sources.launch.indexOf("const personaOutputSnapshot =")),
  );
  const engineSnapshotTypeBlock = sources.engine.slice(
    sources.engine.indexOf("export type PersonaOutputSnapshot"),
    sources.engine.indexOf("export const PERSONA_ENGINE_STATE"),
  );
  const triggerFunctionBlock = sources.trigger.slice(
    sources.trigger.indexOf("export async function triggerPersonaGeneration"),
  );
  assertIncludes("formal stored persona type owns starbeast", storedTypeBlock, "starbeast?: {");
  assertIncludes("stored persona type recognizes schema version", storedTypeBlock, 'schemaVersion?: "GUANYAO_PERSONA_SNAPSHOT_V2"');
  assertIncludes("formal stored persona type owns fourSymbol", storedTypeBlock, "fourSymbol?: string;");
  assertExcludes("formal stored persona type excludes fourBeast", storedTypeBlock, "fourBeast?:");
  assertExcludes("formal stored persona type excludes direction", storedTypeBlock, "direction?:");
  assertIncludes("Launch writes formal persona starbeast", launchSnapshotBlock, "starbeast: {");
  assertIncludes("Launch writes formal persona fourSymbol", launchSnapshotBlock, "fourSymbol: reveal.starbeast.fourSymbol");
  assertExcludes("Launch stops persona fourBeast writes", launchSnapshotBlock, "fourBeast:");
  assertExcludes("Launch stops persona direction writes", launchSnapshotBlock, "direction:");
  assertIncludes("Launch delegates persona persistence", sources.launch, "writePersonaOutputSnapshot(personaOutputSnapshot)");
  assertExcludes("Launch does not own persona storage key", sources.launch, "guanyao:personaOutputSnapshot");
  assertIncludes("deterministic snapshot type owns formal starbeast", engineSnapshotTypeBlock, "starbeast: {");
  assertIncludes("deterministic snapshot type owns schema version", engineSnapshotTypeBlock, "schemaVersion: typeof GUANYAO_PERSONA_SNAPSHOT_SCHEMA_VERSION");
  assertExcludes("deterministic snapshot type excludes direction", engineSnapshotTypeBlock, "direction: Direction;");
  assertIncludes("deterministic writer delegates persona persistence", sources.engine, "writePersonaOutputSnapshot(snapshot)");
  assertExcludes("deterministic engine does not own persona storage key", sources.engine, "guanyao:personaOutputSnapshot");
  assertIncludes(
    "trigger finalizes snapshot after deterministic writer returns",
    triggerFunctionBlock,
    "const snapshot = writePersonaOutputSnapshotFromDeterministicEngine(result);\n  state = PERSONA_GENERATION_TRIGGER_STATE.SNAPSHOT_FINALIZED;",
  );
  assertExcludes("trigger does not claim snapshot was persisted", sources.trigger, "WRITTEN");
  assertIncludes("persistence adapter owns persona storage key", sources.persistence, 'GUANYAO_PERSONA_SNAPSHOT_STORAGE_KEY = "guanyao:personaOutputSnapshot"');
  assertIncludes("persistence adapter owns schema version", sources.persistence, 'GUANYAO_PERSONA_SNAPSHOT_SCHEMA_VERSION = "GUANYAO_PERSONA_SNAPSHOT_V2"');
  assertExcludes("MotherLab cache does not own persona storage key", sources.cache, "guanyao:personaOutputSnapshot");
  assertIncludes("Gravity delegates persona snapshot reading", sources.gravity, "readPersistedPersonaOutputSnapshot()");
  assertExcludes("Gravity does not own persona storage key", sources.gravity, "guanyao:personaOutputSnapshot");
  assertIncludes("MotherLab consumes normalized fourSymbol", sources.motherLab, "snapshot.fourSymbol");
  assertExcludes("formal smoke fixtures exclude fourBeast", sources.fixtures, "fourBeast:");
  assertExcludes("formal smoke fixtures exclude direction", sources.fixtures, "direction:");

  console.log("\n[PERSONA SNAPSHOT PERSISTENCE SEMANTICS] PASS");
} catch (error) {
  console.error("[PERSONA SNAPSHOT PERSISTENCE SEMANTICS] FAIL");
  console.error(error instanceof Error ? error.message : error);
  process.exit(1);
} finally {
  delete globalThis.window;
  fs.rmSync(tempDir, { recursive: true, force: true });
}
