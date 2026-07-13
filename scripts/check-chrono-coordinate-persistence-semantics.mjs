import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import process from "node:process";
import { build } from "esbuild";

const rootDir = process.cwd();
const persistencePath = path.join(rootDir, "src/services/guanyaoChronoNumericPersistenceAdapter.ts");
const chronoPagePath = path.join(rootDir, "src/pages/ChronoPage.tsx");
const persistenceSource = fs.readFileSync(persistencePath, "utf8");
const chronoPageSource = fs.readFileSync(chronoPagePath, "utf8");
const tempModulePath = path.join(
  os.tmpdir(),
  `guanyao-chrono-coordinate-persistence-${process.pid}.mjs`,
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
let rejectWrites = false;
globalThis.window = {
  localStorage: {
    getItem: (key) => storage.get(key) ?? null,
    setItem: (key, value) => {
      if (rejectWrites) throw new Error("storage write rejected");
      storage.set(key, value);
    },
  },
};

try {
  await build({
    entryPoints: [persistencePath],
    outfile: tempModulePath,
    bundle: true,
    platform: "node",
    format: "esm",
    target: "node20",
    logLevel: "silent",
  });

  const {
    GUANYAO_CHRONO_NUMERIC_SCHEMA_VERSION,
    readPersistedChronoNumericCoordinates,
    writeChronoNumericCoordinates,
  } = await import(`file://${tempModulePath}?t=${Date.now()}`);

  storage.set(
    "guanyao:chronoNumeric",
    JSON.stringify({ year: 1979, month: 4, day: 15, periodIndex: 0 }),
  );
  const legacyCoordinates = readPersistedChronoNumericCoordinates();
  assertEqual("adapter reads unversioned legacy year", legacyCoordinates?.year, 1979);
  assertEqual("adapter reads unversioned legacy period", legacyCoordinates?.periodIndex, 0);

  storage.set("guanyao:chronoNumeric", JSON.stringify({ year: "1979", month: 4, day: 15, periodIndex: 0 }));
  assertEqual("adapter rejects invalid legacy shape", readPersistedChronoNumericCoordinates(), null);

  const versionedCoordinates = writeChronoNumericCoordinates({
    year: 1995,
    month: 6,
    day: 2,
    periodIndex: 9,
  });
  assertEqual(
    "adapter attaches schema version",
    versionedCoordinates.schemaVersion,
    GUANYAO_CHRONO_NUMERIC_SCHEMA_VERSION,
  );
  assertEqual("adapter freezes written coordinates", Object.isFrozen(versionedCoordinates), true);
  assertEqual(
    "adapter stores schema version",
    JSON.parse(storage.get("guanyao:chronoNumeric")).schemaVersion,
    "GUANYAO_CHRONO_NUMERIC_V2",
  );

  rejectWrites = true;
  const rejectedWriteCoordinates = writeChronoNumericCoordinates({
    year: 2001,
    month: 8,
    day: 12,
    periodIndex: 4,
  });
  rejectWrites = false;
  assertEqual(
    "rejected storage write preserves runtime coordinates",
    rejectedWriteCoordinates.year,
    2001,
  );
  assertEqual(
    "rejected storage write preserves schema version",
    rejectedWriteCoordinates.schemaVersion,
    GUANYAO_CHRONO_NUMERIC_SCHEMA_VERSION,
  );
  assertEqual(
    "rejected storage write preserves coordinate immutability",
    Object.isFrozen(rejectedWriteCoordinates),
    true,
  );
  assertEqual(
    "rejected storage write does not replace persisted coordinates",
    JSON.parse(storage.get("guanyao:chronoNumeric")).year,
    1995,
  );

  const availableWindow = globalThis.window;
  globalThis.window = {};
  const unavailableStorageCoordinates = writeChronoNumericCoordinates({
    year: 2010,
    month: 1,
    day: 3,
    periodIndex: 7,
  });
  globalThis.window = availableWindow;
  assertEqual(
    "unavailable storage preserves runtime coordinates",
    unavailableStorageCoordinates.year,
    2010,
  );
  assertEqual(
    "unavailable storage preserves coordinate immutability",
    Object.isFrozen(unavailableStorageCoordinates),
    true,
  );

  assertIncludes("Chrono delegates coordinate reading", chronoPageSource, "readPersistedChronoNumericCoordinates()");
  assertIncludes("Chrono delegates coordinate writing", chronoPageSource, "writeChronoNumericCoordinates(coords)");
  assertExcludes("Chrono does not own numeric coordinate key", chronoPageSource, "guanyao:chronoNumeric");
  assertExcludes("Chrono removes orphaned initial coordinate key", chronoPageSource, "guanyao:initialCoordinates");
  assertIncludes("Chrono preserves mother profile persistence", chronoPageSource, "writeMotherCodeProfile(motherCodeProfile)");
  assertIncludes(
    "adapter owns numeric coordinate key",
    persistenceSource,
    'GUANYAO_CHRONO_NUMERIC_STORAGE_KEY = "guanyao:chronoNumeric"',
  );
  assertIncludes(
    "adapter owns schema version",
    persistenceSource,
    'GUANYAO_CHRONO_NUMERIC_SCHEMA_VERSION = "GUANYAO_CHRONO_NUMERIC_V2"',
  );

  console.log("\n[CHRONO COORDINATE PERSISTENCE SEMANTICS] PASS");
} catch (error) {
  console.error("[CHRONO COORDINATE PERSISTENCE SEMANTICS] FAIL");
  console.error(error instanceof Error ? error.message : error);
  process.exit(1);
} finally {
  fs.rmSync(tempModulePath, { force: true });
}
