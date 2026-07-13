import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import process from "node:process";
import { build } from "esbuild";

const rootDir = process.cwd();
const persistencePath = path.join(rootDir, "src/runtime/entry/entryBaselinePersistenceAdapter.ts");
const contextPath = path.join(rootDir, "src/runtime/entry/baselineContext.ts");
const decisionPath = path.join(rootDir, "src/runtime/entry/entryDecision.ts");
const launchPath = path.join(rootDir, "src/pages/LaunchLab.tsx");
const persistenceSource = fs.readFileSync(persistencePath, "utf8");
const contextSource = fs.readFileSync(contextPath, "utf8");
const decisionSource = fs.readFileSync(decisionPath, "utf8");
const launchSource = fs.readFileSync(launchPath, "utf8");
const tempModulePath = path.join(
  os.tmpdir(),
  `guanyao-entry-baseline-persistence-${process.pid}.mjs`,
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
  },
};

try {
  await build({
    stdin: {
      contents: [
        'export { getBaselineContext } from "./src/runtime/entry/baselineContext.ts";',
        'export { getEntryUserType } from "./src/runtime/entry/entryDecision.ts";',
      ].join("\n"),
      resolveDir: rootDir,
      sourcefile: "entry-baseline-gate.ts",
      loader: "ts",
    },
    outfile: tempModulePath,
    bundle: true,
    platform: "node",
    format: "esm",
    target: "node20",
    logLevel: "silent",
  });

  const { getBaselineContext, getEntryUserType } = await import(
    `file://${tempModulePath}?t=${Date.now()}`
  );

  assertEqual("missing baseline stays new user", getEntryUserType(), "NEW_USER");
  assertEqual("missing baseline context does not exist", getBaselineContext().exists, false);

  storage.set("rue_baseline", JSON.stringify({ createdAt: 1710000000000 }));
  const datedContext = getBaselineContext();
  assertEqual("legacy baseline marks returning user", getEntryUserType(), "OLD_USER");
  assertEqual("legacy baseline keeps local storage source", datedContext.source, "localStorage");
  assertEqual("legacy baseline keeps numeric creation time", datedContext.createdAt, 1710000000000);

  storage.set("rue_baseline", JSON.stringify({}));
  assertEqual("baseline presence without timestamp stays old user", getEntryUserType(), "OLD_USER");

  storage.set("rue_baseline", "{invalid-json");
  assertEqual("corrupted baseline falls back to new user", getEntryUserType(), "NEW_USER");

  assertIncludes("baseline context delegates persisted reading", contextSource, "readPersistedEntryBaseline()");
  assertIncludes("baseline context preserves existence signal", contextSource, "exists: true");
  assertIncludes("baseline context preserves source signal", contextSource, 'source: "localStorage"');
  assertExcludes("baseline context does not own legacy key", contextSource, "rue_baseline");
  assertExcludes("baseline context stays localStorage neutral", contextSource, "window.localStorage");
  assertIncludes("entry decision still consumes baseline existence", decisionSource, "hasBaseline: baseline.exists");
  assertIncludes("Launch keeps runtime entry decision", launchSource, "getEntryUserType()");
  assertIncludes(
    "adapter owns legacy baseline key",
    persistenceSource,
    'LEGACY_ENTRY_BASELINE_STORAGE_KEY = "rue_baseline"',
  );
  assertExcludes("baseline adapter remains read only", persistenceSource, "setItem");
  assertExcludes("baseline adapter does not clear external baseline", persistenceSource, "removeItem");

  console.log("\n[ENTRY BASELINE PERSISTENCE SEMANTICS] PASS");
} catch (error) {
  console.error("[ENTRY BASELINE PERSISTENCE SEMANTICS] FAIL");
  console.error(error instanceof Error ? error.message : error);
  process.exit(1);
} finally {
  fs.rmSync(tempModulePath, { force: true });
}
