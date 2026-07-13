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
  runtimeTypes: path.join(rootDir, "src/types/gravityRuntimeInput.ts"),
  launch: path.join(rootDir, "src/pages/LaunchLab.tsx"),
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
globalThis.window = {
  localStorage: {
    getItem: (key) => storage.get(key) ?? null,
    setItem: (key, value) => storage.set(key, String(value)),
  },
};

try {
  const [adapterModule, cacheModule, engineModule] = await Promise.all([
    bundleAndImport(paths.adapter, "adapter.mjs"),
    bundleAndImport(paths.cache, "cache.mjs"),
    bundleAndImport(paths.engine, "engine.mjs"),
  ]);
  const { resolveStoredMotherFourSymbol } = adapterModule;
  const { readCachedPersonaOutput } = cacheModule;
  const {
    buildPersonaOutputSnapshot,
    generatePersona,
    writePersonaOutputSnapshotFromDeterministicEngine,
  } = engineModule;

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

  const generationInput = {
    chrono: { year: 1995, month: 6, day: 2, hour: "酉时" },
    geo: { province: "广东", city: "广州" },
  };
  const result = generatePersona(generationInput);
  const formalSnapshot = buildPersonaOutputSnapshot(result);
  assertEqual("deterministic writer builds formal fourSymbol", formalSnapshot.starbeast.fourSymbol, result.direction);
  assertEqual("deterministic writer omits direction", "direction" in formalSnapshot, false);
  assertEqual("deterministic writer omits fourBeast", "fourBeast" in formalSnapshot, false);

  const legacySnapshot = { ...formalSnapshot, direction: formalSnapshot.starbeast.fourSymbol };
  delete legacySnapshot.starbeast;
  storage.set("guanyao:personaOutputSnapshot", JSON.stringify(legacySnapshot));
  const compatibleWrite = writePersonaOutputSnapshotFromDeterministicEngine(result);
  assertEqual("deterministic writer accepts matching legacy cache", compatibleWrite.starbeast.fourSymbol, result.direction);

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
  assertIncludes("formal stored persona type owns starbeast", storedTypeBlock, "starbeast?: {");
  assertIncludes("formal stored persona type owns fourSymbol", storedTypeBlock, "fourSymbol?: string;");
  assertExcludes("formal stored persona type excludes fourBeast", storedTypeBlock, "fourBeast?:");
  assertExcludes("formal stored persona type excludes direction", storedTypeBlock, "direction?:");
  assertIncludes("Launch writes formal persona starbeast", launchSnapshotBlock, "starbeast: {");
  assertIncludes("Launch writes formal persona fourSymbol", launchSnapshotBlock, "fourSymbol: reveal.starbeast.fourSymbol");
  assertExcludes("Launch stops persona fourBeast writes", launchSnapshotBlock, "fourBeast:");
  assertExcludes("Launch stops persona direction writes", launchSnapshotBlock, "direction:");
  assertIncludes("deterministic snapshot type owns formal starbeast", engineSnapshotTypeBlock, "starbeast: {");
  assertExcludes("deterministic snapshot type excludes direction", engineSnapshotTypeBlock, "direction: Direction;");
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
