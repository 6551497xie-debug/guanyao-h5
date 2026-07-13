import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import process from "node:process";
import { build } from "esbuild";

const rootDir = process.cwd();
const paths = {
  persistence: path.join(rootDir, "src/services/guanyaoBreachSelectionPersistenceAdapter.ts"),
  choice: path.join(rootDir, "src/pages/ChoicePage.tsx"),
  migration: path.join(rootDir, "src/pages/MigrationPage.tsx"),
  archive: path.join(rootDir, "src/pages/ArchivePage.tsx"),
};
const sources = Object.fromEntries(
  Object.entries(paths).map(([key, filePath]) => [key, fs.readFileSync(filePath, "utf8")]),
);
const tempModulePath = path.join(
  os.tmpdir(),
  `guanyao-breach-selection-persistence-${process.pid}.mjs`,
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
    GUANYAO_BREACH_SELECTION_SCHEMA_VERSION,
    readPersistedBreachSelectionState,
    writeBreachSelectionState,
  } = await import(`file://${tempModulePath}?t=${Date.now()}`);

  storage.set("guanyao:selectedBreachId", "mud-point");
  storage.set("guanyao:assetStatus", "sealed");
  const legacyState = readPersistedBreachSelectionState();
  assertEqual("adapter reads legacy selected breach", legacyState?.selectedBreachId, "mud-point");
  assertEqual("adapter reads legacy asset status", legacyState?.assetStatus, "sealed");

  const selectedState = writeBreachSelectionState({ selectedBreachId: "main-cut" });
  assertEqual("adapter attaches schema version", selectedState.schemaVersion, GUANYAO_BREACH_SELECTION_SCHEMA_VERSION);
  assertEqual("adapter preserves legacy status while migrating", selectedState.assetStatus, "sealed");
  assertEqual("adapter freezes versioned state", Object.isFrozen(selectedState), true);
  assertEqual(
    "adapter stores V2 state",
    JSON.parse(storage.get("guanyao:breachSelectionState")).schemaVersion,
    "GUANYAO_BREACH_SELECTION_V2",
  );

  const activatedState = writeBreachSelectionState({ assetStatus: "activated" });
  assertEqual("adapter preserves selected breach across partial writes", activatedState.selectedBreachId, "main-cut");
  assertEqual("adapter updates asset status", activatedState.assetStatus, "activated");

  storage.set("guanyao:breachSelectionState", "{invalid-json");
  assertEqual(
    "adapter falls back to legacy state when V2 payload is damaged",
    readPersistedBreachSelectionState()?.selectedBreachId,
    "mud-point",
  );

  for (const [pageName, source] of Object.entries({
    Choice: sources.choice,
    Migration: sources.migration,
    Archive: sources.archive,
  })) {
    assertExcludes(`${pageName} does not own legacy selected breach key`, source, "guanyao:selectedBreachId");
    assertExcludes(`${pageName} does not own legacy asset status key`, source, "guanyao:assetStatus");
  }

  assertIncludes("Choice delegates persisted state reading", sources.choice, "readPersistedBreachSelectionState()");
  assertIncludes("Choice delegates persisted state writing", sources.choice, "writeBreachSelectionState({");
  assertIncludes("Migration delegates persisted state reading", sources.migration, "readPersistedBreachSelectionState()");
  assertIncludes("Migration delegates persisted state writing", sources.migration, "writeBreachSelectionState({");
  assertIncludes("Archive delegates persisted state reading", sources.archive, "readPersistedBreachSelectionState()");
  assertIncludes(
    "adapter owns V2 storage key",
    sources.persistence,
    'GUANYAO_BREACH_SELECTION_STORAGE_KEY = "guanyao:breachSelectionState"',
  );
  assertIncludes(
    "adapter owns legacy selected breach fallback",
    sources.persistence,
    'LEGACY_SELECTED_BREACH_STORAGE_KEY = "guanyao:selectedBreachId"',
  );
  assertIncludes(
    "adapter owns legacy asset status fallback",
    sources.persistence,
    'LEGACY_ASSET_STATUS_STORAGE_KEY = "guanyao:assetStatus"',
  );

  console.log("\n[BREACH SELECTION PERSISTENCE SEMANTICS] PASS");
} catch (error) {
  console.error("[BREACH SELECTION PERSISTENCE SEMANTICS] FAIL");
  console.error(error instanceof Error ? error.message : error);
  process.exit(1);
} finally {
  fs.rmSync(tempModulePath, { force: true });
}
