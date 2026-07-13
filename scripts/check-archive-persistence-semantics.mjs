import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import process from "node:process";
import { build } from "esbuild";

const rootDir = process.cwd();
const persistencePath = path.join(rootDir, "src/services/guanyaoArchivePersistenceAdapter.ts");
const servicePath = path.join(rootDir, "src/services/archiveService.ts");
const persistenceSource = fs.readFileSync(persistencePath, "utf8");
const serviceSource = fs.readFileSync(servicePath, "utf8");
const tempModulePath = path.join(
  os.tmpdir(),
  `guanyao-archive-persistence-${process.pid}.mjs`,
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
    removeItem: (key) => storage.delete(key),
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
    GUANYAO_ARCHIVE_SCHEMA_VERSION,
    clearPersistedArchives,
    readPersistedArchives,
    writePersistedArchives,
  } = await import(`file://${tempModulePath}?t=${Date.now()}`);

  const olderArchive = { archiveId: "archive-old", createdAt: "2026-01-01T00:00:00.000Z" };
  const newerArchive = { archiveId: "archive-new", createdAt: "2026-02-01T00:00:00.000Z" };
  storage.set("guanyao_h5_archive", JSON.stringify([newerArchive, olderArchive]));
  const legacyArchives = readPersistedArchives();
  assertEqual("adapter reads legacy raw archive arrays", legacyArchives.length, 2);
  assertEqual("adapter preserves legacy archive order", legacyArchives[0]?.archiveId, "archive-new");

  const versionedState = writePersistedArchives(legacyArchives);
  assertEqual("adapter attaches schema version", versionedState.schemaVersion, GUANYAO_ARCHIVE_SCHEMA_VERSION);
  assertEqual("adapter freezes versioned archive state", Object.isFrozen(versionedState), true);
  assertEqual("adapter freezes versioned archive items", Object.isFrozen(versionedState.items), true);
  assertEqual(
    "adapter stores V2 archive state",
    JSON.parse(storage.get("guanyao_h5_archive")).schemaVersion,
    "GUANYAO_ARCHIVE_V2",
  );
  assertEqual("adapter reads V2 archive order", readPersistedArchives()[0]?.archiveId, "archive-new");

  const setItem = window.localStorage.setItem;
  window.localStorage.setItem = () => {
    throw new Error("storage unavailable");
  };
  assertEqual(
    "adapter keeps archive result when storage is unavailable",
    writePersistedArchives(legacyArchives).items.length,
    2,
  );
  window.localStorage.setItem = setItem;

  clearPersistedArchives();
  assertEqual("adapter clears the formal archive key", storage.has("guanyao_h5_archive"), false);

  assertIncludes("domain service delegates archive reading", serviceSource, "return readPersistedArchives()");
  assertIncludes("domain service preserves newest-first ordering", serviceSource, "[archiveItem, ...getArchives()]");
  assertIncludes("domain service delegates archive writing", serviceSource, "writePersistedArchives(nextArchive)");
  assertIncludes("domain service delegates archive clearing", serviceSource, "clearPersistedArchives()");
  assertExcludes("domain service does not own archive storage key", serviceSource, "guanyao_h5_archive");
  assertExcludes("domain service stays persistence neutral", serviceSource, "localStorage");
  assertIncludes(
    "adapter owns archive storage key",
    persistenceSource,
    'GUANYAO_ARCHIVE_STORAGE_KEY = "guanyao_h5_archive"',
  );
  assertIncludes(
    "adapter owns archive schema version",
    persistenceSource,
    'GUANYAO_ARCHIVE_SCHEMA_VERSION = "GUANYAO_ARCHIVE_V2"',
  );

  console.log("\n[ARCHIVE PERSISTENCE SEMANTICS] PASS");
} catch (error) {
  console.error("[ARCHIVE PERSISTENCE SEMANTICS] FAIL");
  console.error(error instanceof Error ? error.message : error);
  process.exit(1);
} finally {
  fs.rmSync(tempModulePath, { force: true });
}
