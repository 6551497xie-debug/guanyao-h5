import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import process from "node:process";
import { build } from "esbuild";

const rootDir = process.cwd();
const paths = {
  persistence: path.join(rootDir, "src/services/guanyaoMotherCodeProfilePersistenceAdapter.ts"),
  runtimeTypes: path.join(rootDir, "src/types/gravityRuntimeInput.ts"),
  launch: path.join(rootDir, "src/pages/LaunchLab.tsx"),
  chrono: path.join(rootDir, "src/pages/ChronoPage.tsx"),
  gravity: path.join(rootDir, "src/pages/GravityPage.tsx"),
  r8: path.join(rootDir, "src/adapters/guanyaoR8ReadModelAdapter.ts"),
};
const sources = Object.fromEntries(
  Object.entries(paths).map(([key, filePath]) => [key, fs.readFileSync(filePath, "utf8")]),
);
const tempModulePath = path.join(
  os.tmpdir(),
  `guanyao-mother-code-profile-persistence-${process.pid}.mjs`,
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
    entryPoints: [paths.persistence],
    outfile: tempModulePath,
    bundle: true,
    platform: "node",
    format: "esm",
    target: "node20",
    logLevel: "silent",
  });

  const {
    GUANYAO_MOTHER_CODE_PROFILE_SCHEMA_VERSION,
    readPersistedMotherCodeProfile,
    writeMotherCodeProfile,
  } = await import(`file://${tempModulePath}?t=${Date.now()}`);

  storage.set("guanyao:motherCodeProfile", JSON.stringify({ motherCodeName: "兑｜转化者" }));
  assertEqual(
    "persistence adapter reads unversioned legacy profile",
    readPersistedMotherCodeProfile()?.motherCodeName,
    "兑｜转化者",
  );

  const versionedProfile = writeMotherCodeProfile({
    motherCodeName: "震｜行动者",
    trigram: "震",
  });
  assertEqual(
    "persistence adapter attaches schema version",
    versionedProfile.schemaVersion,
    GUANYAO_MOTHER_CODE_PROFILE_SCHEMA_VERSION,
  );
  assertEqual("persistence adapter preserves profile immutability", Object.isFrozen(versionedProfile), true);
  assertEqual(
    "persistence adapter stores schema version",
    JSON.parse(storage.get("guanyao:motherCodeProfile")).schemaVersion,
    "GUANYAO_MOTHER_CODE_PROFILE_V2",
  );

  rejectWrites = true;
  const rejectedWriteProfile = writeMotherCodeProfile({
    motherCodeName: "坎｜洞察者",
    trigram: "坎",
  });
  rejectWrites = false;
  assertEqual(
    "rejected storage write preserves generated profile",
    rejectedWriteProfile.motherCodeName,
    "坎｜洞察者",
  );
  assertEqual(
    "rejected storage write preserves schema version",
    rejectedWriteProfile.schemaVersion,
    GUANYAO_MOTHER_CODE_PROFILE_SCHEMA_VERSION,
  );
  assertEqual(
    "rejected storage write preserves profile immutability",
    Object.isFrozen(rejectedWriteProfile),
    true,
  );
  assertEqual(
    "rejected storage write does not replace persisted profile",
    JSON.parse(storage.get("guanyao:motherCodeProfile")).motherCodeName,
    "震｜行动者",
  );

  const availableWindow = globalThis.window;
  globalThis.window = {};
  const unavailableStorageProfile = writeMotherCodeProfile({
    motherCodeName: "离｜照见者",
    trigram: "离",
  });
  globalThis.window = availableWindow;
  assertEqual(
    "unavailable storage preserves generated profile",
    unavailableStorageProfile.motherCodeName,
    "离｜照见者",
  );
  assertEqual(
    "unavailable storage preserves profile immutability",
    Object.isFrozen(unavailableStorageProfile),
    true,
  );

  const storedTypeBlock = sources.runtimeTypes.slice(
    sources.runtimeTypes.indexOf("export type StoredMotherCodeProfile"),
    sources.runtimeTypes.indexOf("export type StoredPersonaOutputSnapshot"),
  );
  assertIncludes(
    "stored profile type recognizes schema version",
    storedTypeBlock,
    'schemaVersion?: "GUANYAO_MOTHER_CODE_PROFILE_V2"',
  );
  assertIncludes(
    "Launch delegates profile persistence",
    sources.launch,
    "writeMotherCodeProfile(motherHandoff.motherCodeProfile)",
  );
  assertExcludes("Launch does not own profile storage key", sources.launch, "guanyao:motherCodeProfile");
  assertIncludes("Chrono delegates profile persistence", sources.chrono, "writeMotherCodeProfile(motherCodeProfile)");
  assertExcludes("Chrono does not own profile storage key", sources.chrono, "guanyao:motherCodeProfile");
  assertIncludes("Gravity delegates profile reading", sources.gravity, "readPersistedMotherCodeProfile()");
  assertExcludes("Gravity does not own profile storage key", sources.gravity, "guanyao:motherCodeProfile");
  assertIncludes("R8 delegates profile reading", sources.r8, "readPersistedMotherCodeProfile()");
  assertExcludes("R8 does not own profile storage key", sources.r8, "guanyao:motherCodeProfile");
  assertIncludes(
    "persistence adapter owns profile storage key",
    sources.persistence,
    'GUANYAO_MOTHER_CODE_PROFILE_STORAGE_KEY = "guanyao:motherCodeProfile"',
  );
  assertIncludes(
    "persistence adapter owns schema version",
    sources.persistence,
    '"GUANYAO_MOTHER_CODE_PROFILE_V2" as const',
  );

  console.log("\n[MOTHER CODE PROFILE PERSISTENCE SEMANTICS] PASS");
} catch (error) {
  console.error("[MOTHER CODE PROFILE PERSISTENCE SEMANTICS] FAIL");
  console.error(error instanceof Error ? error.message : error);
  process.exit(1);
} finally {
  fs.rmSync(tempModulePath, { force: true });
}
