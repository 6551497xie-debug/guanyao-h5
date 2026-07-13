import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import process from "node:process";
import { build } from "esbuild";

const rootDir = process.cwd();
const paths = {
  persistence: path.join(rootDir, "src/services/guanyaoSelectedPressureSeedContextPersistenceAdapter.ts"),
  tripleForce: path.join(rootDir, "src/services/guanyaoTripleForceLandingService.ts"),
  runtimeTypes: path.join(rootDir, "src/types/gravityRuntimeInput.ts"),
  domainTypes: path.join(rootDir, "src/types/primaryPetal.ts"),
  launch: path.join(rootDir, "src/pages/LaunchLab.tsx"),
  scene: path.join(rootDir, "src/pages/ScenePage.tsx"),
  gravity: path.join(rootDir, "src/pages/GravityPage.tsx"),
  r8: path.join(rootDir, "src/adapters/guanyaoR8ReadModelAdapter.ts"),
};
const sources = Object.fromEntries(
  Object.entries(paths).map(([key, filePath]) => [key, fs.readFileSync(filePath, "utf8")]),
);
const tempModulePath = path.join(
  os.tmpdir(),
  `guanyao-selected-pressure-seed-context-persistence-${process.pid}.mjs`,
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
globalThis.window = {
  localStorage: {
    getItem: (key) => storage.get(key) ?? null,
    setItem: (key, value) => storage.set(key, value),
  },
};

try {
  await build({
    entryPoints: [paths.persistence],
    outfile: tempModulePath,
    bundle: true,
    platform: "node",
    format: "esm",
    target: "node20",
    logLevel: "silent",
  });

  const {
    GUANYAO_SELECTED_PRESSURE_SEED_CONTEXT_SCHEMA_VERSION,
    readPersistedSelectedPressureSeedContext,
    writeSelectedPressureSeedContext,
  } = await import(`file://${tempModulePath}?t=${Date.now()}`);

  storage.set(
    "guanyao:selectedPressureSeedContext",
    JSON.stringify({ selectedPressureSeedId: "legacy-seed", pressureField: "关系压力" }),
  );
  assertEqual(
    "persistence adapter reads unversioned legacy context",
    readPersistedSelectedPressureSeedContext()?.selectedPressureSeedId,
    "legacy-seed",
  );

  const versionedContext = writeSelectedPressureSeedContext({
    selectedPressureSeedId: "current-seed",
    pressureField: "行动受阻",
  });
  assertEqual(
    "persistence adapter attaches schema version",
    versionedContext.schemaVersion,
    GUANYAO_SELECTED_PRESSURE_SEED_CONTEXT_SCHEMA_VERSION,
  );
  assertEqual("persistence adapter preserves context immutability", Object.isFrozen(versionedContext), true);
  assertEqual(
    "persistence adapter stores schema version",
    JSON.parse(storage.get("guanyao:selectedPressureSeedContext")).schemaVersion,
    "GUANYAO_SELECTED_PRESSURE_SEED_CONTEXT_V2",
  );

  assertIncludes(
    "stored context type recognizes schema version",
    sources.runtimeTypes,
    'schemaVersion?: "GUANYAO_SELECTED_PRESSURE_SEED_CONTEXT_V2"',
  );
  assertExcludes(
    "domain pressure context stays persistence-neutral",
    sources.domainTypes,
    "GUANYAO_SELECTED_PRESSURE_SEED_CONTEXT_V2",
  );
  assertIncludes("Launch delegates context persistence", sources.launch, "writeSelectedPressureSeedContext(selectedPressureSeedContext)");
  assertExcludes("Launch does not own context storage key", sources.launch, "guanyao:selectedPressureSeedContext");
  assertExcludes("Launch does not persist orphaned triple force result", sources.launch, "guanyao:tripleForceLandingResult");
  assertExcludes("Launch does not persist orphaned triple force front stage", sources.launch, "guanyao:tripleForceFrontStage");
  assertExcludes("Launch does not compute unused triple force result", sources.launch, "buildTripleForceLandingResult");
  assertExcludes("Launch does not persist legacy pressure seed id mirror", sources.launch, "guanyao:selectedPressureSeedId");
  assertExcludes("Launch does not persist legacy pressure slice id mirror", sources.launch, "guanyao:selectedPressureSliceId");
  assertExcludes("Launch does not persist legacy pressure slice text mirror", sources.launch, "guanyao:selectedPressureSliceText");
  assertIncludes("Scene delegates context persistence", sources.scene, "writeSelectedPressureSeedContext(selectedPressureSeedContext)");
  assertExcludes("Scene does not own context storage key", sources.scene, "guanyao:selectedPressureSeedContext");
  assertExcludes("Scene does not persist orphaned triple force result", sources.scene, "guanyao:tripleForceLandingResult");
  assertExcludes("Scene does not persist orphaned triple force front stage", sources.scene, "guanyao:tripleForceFrontStage");
  assertExcludes("Scene does not compute unused triple force result", sources.scene, "buildTripleForceLandingResult");
  assertExcludes("Scene does not persist legacy pressure seed id mirror", sources.scene, "guanyao:selectedPressureSeedId");
  assertExcludes("Scene does not persist legacy pressure slice id mirror", sources.scene, "guanyao:selectedPressureSliceId");
  assertExcludes("Scene does not persist legacy pressure slice text mirror", sources.scene, "guanyao:selectedPressureSliceText");
  assertIncludes("Gravity delegates context reading", sources.gravity, "readPersistedSelectedPressureSeedContext()");
  assertExcludes("Gravity does not own context storage key", sources.gravity, "guanyao:selectedPressureSeedContext");
  assertIncludes("R8 delegates context reading", sources.r8, "readPersistedSelectedPressureSeedContext()");
  assertExcludes("R8 does not own context storage key", sources.r8, "guanyao:selectedPressureSeedContext");
  assertIncludes(
    "persistence adapter owns context storage key",
    sources.persistence,
    '"guanyao:selectedPressureSeedContext"',
  );
  assertIncludes(
    "persistence adapter owns schema version",
    sources.persistence,
    '"GUANYAO_SELECTED_PRESSURE_SEED_CONTEXT_V2" as const',
  );
  assertIncludes("formal pressure context owns selected seed id", sources.domainTypes, "selectedPressureSeedId?: string;");
  assertIncludes("formal pressure context owns selected seed text", sources.domainTypes, "surface?: string;");
  assertIncludes(
    "triple force remains available as an on-demand derivation",
    sources.tripleForce,
    "export function buildTripleForceLandingResult(",
  );
  assertIncludes(
    "triple force front stage remains available on demand",
    sources.tripleForce,
    "export function getTripleForceFrontStage(",
  );

  console.log("\n[SELECTED PRESSURE SEED CONTEXT PERSISTENCE SEMANTICS] PASS");
} catch (error) {
  console.error("[SELECTED PRESSURE SEED CONTEXT PERSISTENCE SEMANTICS] FAIL");
  console.error(error instanceof Error ? error.message : error);
  process.exit(1);
} finally {
  fs.rmSync(tempModulePath, { force: true });
}
