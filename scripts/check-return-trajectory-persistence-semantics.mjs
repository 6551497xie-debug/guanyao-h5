import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import process from "node:process";
import { build } from "esbuild";

const rootDir = process.cwd();
const persistencePath = path.join(rootDir, "src/services/guanyaoReturnTrajectoryPersistenceAdapter.ts");
const pagePath = path.join(rootDir, "src/pages/ReturnLab.tsx");
const persistenceSource = fs.readFileSync(persistencePath, "utf8");
const pageSource = fs.readFileSync(pagePath, "utf8");
const tempModulePath = path.join(
  os.tmpdir(),
  `guanyao-return-trajectory-persistence-${process.pid}.mjs`,
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
    GUANYAO_RETURN_TRAJECTORY_MAX_POINTS,
    GUANYAO_RETURN_TRAJECTORY_SCHEMA_VERSION,
    readPersistedReturnTrajectory,
    writeReturnTrajectory,
  } = await import(`file://${tempModulePath}?t=${Date.now()}`);

  const legacyPoints = Array.from({ length: 18 }, (_, index) => index / 20);
  storage.set("guanyao:returnTraj", JSON.stringify(legacyPoints));
  const migratedLegacyPoints = readPersistedReturnTrajectory();
  assertEqual("adapter keeps the existing trajectory limit", GUANYAO_RETURN_TRAJECTORY_MAX_POINTS, 14);
  assertEqual("adapter reads legacy raw arrays", migratedLegacyPoints.length, 14);
  assertEqual("adapter keeps the newest legacy point", migratedLegacyPoints.at(-1), 0.85);

  const versionedTrajectory = writeReturnTrajectory([...legacyPoints, 0.91]);
  assertEqual(
    "adapter attaches schema version",
    versionedTrajectory.schemaVersion,
    GUANYAO_RETURN_TRAJECTORY_SCHEMA_VERSION,
  );
  assertEqual("adapter freezes versioned trajectory", Object.isFrozen(versionedTrajectory), true);
  assertEqual("adapter freezes trajectory points", Object.isFrozen(versionedTrajectory.points), true);
  assertEqual("adapter trims written trajectory", versionedTrajectory.points.length, 14);
  assertEqual(
    "adapter stores V2 trajectory",
    JSON.parse(storage.get("guanyao:returnTraj")).schemaVersion,
    "GUANYAO_RETURN_TRAJECTORY_V2",
  );

  const setItem = window.localStorage.setItem;
  window.localStorage.setItem = () => {
    throw new Error("storage unavailable");
  };
  const unavailableStorageTrajectory = writeReturnTrajectory([0.33]);
  assertEqual(
    "adapter keeps trajectory flow alive when storage is unavailable",
    unavailableStorageTrajectory.points[0],
    0.33,
  );
  window.localStorage.setItem = setItem;

  storage.set("guanyao:returnTraj", JSON.stringify({ schemaVersion: "UNKNOWN", points: [0.9] }));
  const fallbackTrajectory = readPersistedReturnTrajectory();
  assertEqual("adapter restores existing default trajectory", fallbackTrajectory.join(","), "0.5,0.62,0.45,0.58,0.5,0.4");

  assertIncludes("ReturnLab delegates trajectory reading", pageSource, "readPersistedReturnTrajectory()");
  assertIncludes("ReturnLab delegates trajectory writing", pageSource, "writeReturnTrajectory(m.history)");
  assertIncludes(
    "ReturnLab consumes centralized trajectory limit",
    pageSource,
    "maxPoints: GUANYAO_RETURN_TRAJECTORY_MAX_POINTS",
  );
  assertExcludes("ReturnLab does not own trajectory storage key", pageSource, "guanyao:returnTraj");
  assertExcludes("ReturnLab does not access localStorage directly", pageSource, "localStorage");
  assertIncludes(
    "adapter owns trajectory storage key",
    persistenceSource,
    'GUANYAO_RETURN_TRAJECTORY_STORAGE_KEY = "guanyao:returnTraj"',
  );
  assertIncludes(
    "adapter owns trajectory schema version",
    persistenceSource,
    '"GUANYAO_RETURN_TRAJECTORY_V2" as const',
  );

  console.log("\n[RETURN TRAJECTORY PERSISTENCE SEMANTICS] PASS");
} catch (error) {
  console.error("[RETURN TRAJECTORY PERSISTENCE SEMANTICS] FAIL");
  console.error(error instanceof Error ? error.message : error);
  process.exit(1);
} finally {
  fs.rmSync(tempModulePath, { force: true });
}
