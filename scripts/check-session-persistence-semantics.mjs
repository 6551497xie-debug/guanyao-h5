import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import process from "node:process";
import { build } from "esbuild";

const rootDir = process.cwd();
const persistencePath = path.join(rootDir, "src/services/guanyaoSessionPersistenceAdapter.ts");
const servicePath = path.join(rootDir, "src/services/sessionService.ts");
const persistenceSource = fs.readFileSync(persistencePath, "utf8");
const serviceSource = fs.readFileSync(servicePath, "utf8");
const tempModulePath = path.join(
  os.tmpdir(),
  `guanyao-session-persistence-${process.pid}.mjs`,
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
    GUANYAO_SESSION_SCHEMA_VERSION,
    clearPersistedSessionState,
    readPersistedSessionState,
    writePersistedSessionState,
  } = await import(`file://${tempModulePath}?t=${Date.now()}`);

  const legacySession = {
    selectedForceId: "force-legacy",
    autoYaoPath: [1, 0, 1, 1, 0],
    finalChoiceCode: "101100",
  };
  storage.set("guanyao_h5_session", JSON.stringify(legacySession));
  const persistedLegacySession = readPersistedSessionState();
  assertEqual("adapter reads legacy raw session objects", persistedLegacySession?.selectedForceId, "force-legacy");
  assertEqual("adapter preserves legacy yao path", persistedLegacySession?.autoYaoPath?.join(""), "10110");

  const versionedState = writePersistedSessionState(legacySession);
  assertEqual("adapter attaches schema version", versionedState.schemaVersion, GUANYAO_SESSION_SCHEMA_VERSION);
  assertEqual("adapter freezes V2 envelope", Object.isFrozen(versionedState), true);
  assertEqual(
    "adapter stores V2 session envelope",
    JSON.parse(storage.get("guanyao_h5_session")).schemaVersion,
    "GUANYAO_SESSION_V2",
  );
  assertEqual("adapter reads V2 session payload", readPersistedSessionState()?.finalChoiceCode, "101100");

  storage.set("guanyao_h5_session", JSON.stringify({ schemaVersion: "UNKNOWN", session: legacySession }));
  assertEqual("adapter rejects unknown session schema", readPersistedSessionState(), null);

  writePersistedSessionState(legacySession);
  clearPersistedSessionState();
  assertEqual("adapter clears the formal session key", storage.has("guanyao_h5_session"), false);

  assertIncludes("session service delegates persisted state reading", serviceSource, "readPersistedSessionState<Partial<GuanyaoSession>>()");
  assertIncludes("session service preserves default-first merge", serviceSource, "...defaultSession");
  assertIncludes("session service preserves partial update merge", serviceSource, "...getSession()");
  assertIncludes("session service delegates state writing", serviceSource, "writePersistedSessionState(nextSession)");
  assertIncludes("session service delegates state clearing", serviceSource, "clearPersistedSessionState()");
  assertIncludes("session service keeps chrono profile projection", serviceSource, "chronoProfile,");
  assertIncludes("session service keeps mother code projection", serviceSource, "currentMotherCode: motherCode");
  assertIncludes("session service keeps yao path defaults", serviceSource, "interactiveYaoPath: []");
  assertIncludes("session service keeps time sandglass defaults", serviceSource, "timeSandglass: null");
  assertExcludes("session service does not own persistence key", serviceSource, "guanyao_h5_session");
  assertExcludes("session service stays localStorage neutral", serviceSource, "localStorage");
  assertIncludes(
    "adapter owns session storage key",
    persistenceSource,
    'GUANYAO_SESSION_STORAGE_KEY = "guanyao_h5_session"',
  );
  assertIncludes(
    "adapter owns session schema version",
    persistenceSource,
    'GUANYAO_SESSION_SCHEMA_VERSION = "GUANYAO_SESSION_V2"',
  );

  console.log("\n[SESSION PERSISTENCE SEMANTICS] PASS");
} catch (error) {
  console.error("[SESSION PERSISTENCE SEMANTICS] FAIL");
  console.error(error instanceof Error ? error.message : error);
  process.exit(1);
} finally {
  fs.rmSync(tempModulePath, { force: true });
}
