import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import process from "node:process";
import { build } from "esbuild";

const rootDir = process.cwd();
const persistencePath = path.join(rootDir, "src/services/guanyaoPersonalityRingLitePersistenceAdapter.ts");
const servicePath = path.join(rootDir, "src/services/personalityRingLiteService.ts");
const gravityPath = path.join(rootDir, "src/pages/GravityPage.tsx");
const persistenceSource = fs.readFileSync(persistencePath, "utf8");
const serviceSource = fs.readFileSync(servicePath, "utf8");
const gravitySource = fs.readFileSync(gravityPath, "utf8");
const tempModulePath = path.join(
  os.tmpdir(),
  `guanyao-personality-ring-lite-persistence-${process.pid}.mjs`,
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
    entryPoints: [persistencePath],
    outfile: tempModulePath,
    bundle: true,
    platform: "node",
    format: "esm",
    target: "node20",
    logLevel: "silent",
  });

  const {
    readPersistedPersonalityRingLiteState,
    writePersistedPersonalityRingLiteState,
  } = await import(`file://${tempModulePath}?t=${Date.now()}`);

  const v1State = {
    version: "1.0",
    updatedAt: "2026-07-14T00:00:00.000Z",
    entries: [{ id: "ring-1", createdAt: "2026-07-14T00:00:00.000Z" }],
  };
  storage.set("guanyao:personalityRingLite", JSON.stringify(v1State));
  const persistedV1State = readPersistedPersonalityRingLiteState();
  assertEqual("adapter reads existing V1 state", persistedV1State?.version, "1.0");
  assertEqual("adapter preserves existing entries", persistedV1State?.entries?.[0]?.id, "ring-1");

  assertEqual(
    "adapter reports successful storage",
    writePersistedPersonalityRingLiteState(v1State),
    "STORED",
  );
  assertEqual(
    "adapter stores the domain state without reshaping",
    JSON.parse(storage.get("guanyao:personalityRingLite")).version,
    "1.0",
  );

  const setItem = window.localStorage.setItem;
  window.localStorage.setItem = () => {
    throw new Error("storage unavailable");
  };
  assertEqual(
    "adapter distinguishes failed storage",
    writePersistedPersonalityRingLiteState(v1State),
    "FAILED",
  );
  window.localStorage.setItem = setItem;

  const browserWindow = globalThis.window;
  delete globalThis.window;
  assertEqual(
    "adapter distinguishes unavailable storage",
    writePersistedPersonalityRingLiteState(v1State),
    "UNAVAILABLE",
  );
  globalThis.window = browserWindow;

  assertIncludes("domain service delegates persisted state reading", serviceSource, "readPersistedPersonalityRingLiteState()");
  assertIncludes("domain service delegates persisted state writing", serviceSource, "writePersistedPersonalityRingLiteState(next)");
  assertIncludes("domain service keeps V1 state", serviceSource, 'version: "1.0"');
  assertIncludes("domain service keeps created-at deduplication", serviceSource, "item.createdAt === entry.createdAt");
  assertIncludes("domain service keeps failed-write rollback", serviceSource, 'writeStatus === "FAILED" ? current : next');
  assertExcludes("domain service does not own persistence key", serviceSource, "guanyao:personalityRingLite");
  assertExcludes("domain service stays localStorage neutral", serviceSource, "localStorage");
  assertIncludes(
    "Gravity keeps explicit crystal entry formation",
    gravitySource,
    "createPersonalityRingLiteEntryFromCrystal(state)",
  );
  assertIncludes(
    "Gravity keeps explicit personality ring deposition",
    gravitySource,
    "savePersonalityRingLiteEntry(entry)",
  );
  assertIncludes(
    "adapter owns personality ring storage key",
    persistenceSource,
    '"guanyao:personalityRingLite"',
  );
  assertExcludes(
    "persistence adapter stays domain-version neutral",
    persistenceSource,
    '"1.0"',
  );

  console.log("\n[PERSONALITY RING LITE PERSISTENCE SEMANTICS] PASS");
} catch (error) {
  console.error("[PERSONALITY RING LITE PERSISTENCE SEMANTICS] FAIL");
  console.error(error instanceof Error ? error.message : error);
  process.exit(1);
} finally {
  fs.rmSync(tempModulePath, { force: true });
}
