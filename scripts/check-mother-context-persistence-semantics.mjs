import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import process from "node:process";
import { build } from "esbuild";

const rootDir = process.cwd();
const adapterPath = path.join(rootDir, "src/services/guanyaoStoredMotherContextAdapter.ts");
const typePath = path.join(rootDir, "src/types/gravityRuntimeInput.ts");
const fusionTypePath = path.join(rootDir, "src/types/guanyaoGeoChronoMotherFusion.ts");
const launchPath = path.join(rootDir, "src/pages/LaunchLab.tsx");
const gravityPath = path.join(rootDir, "src/pages/GravityPage.tsx");
const adapterSource = fs.readFileSync(adapterPath, "utf8");
const typeSource = fs.readFileSync(typePath, "utf8");
const fusionTypeSource = fs.readFileSync(fusionTypePath, "utf8");
const launchSource = fs.readFileSync(launchPath, "utf8");
const gravitySource = fs.readFileSync(gravityPath, "utf8");
const tempModulePath = path.join(os.tmpdir(), `guanyao-mother-context-persistence-${process.pid}.mjs`);

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

try {
  await build({
    entryPoints: [adapterPath],
    outfile: tempModulePath,
    bundle: true,
    platform: "node",
    format: "esm",
    target: "node20",
    logLevel: "silent",
  });

  const { resolveStoredMotherFourSymbol } = await import(`file://${tempModulePath}?t=${Date.now()}`);
  const context = (originMotherContext, personaOutputSnapshot = null) => ({
    selectedPressureSeedContext: null,
    motherCodeProfile: null,
    originMotherContext,
    personaOutputSnapshot,
  });

  assertEqual(
    "formal starbeast fourSymbol wins conflicting legacy values",
    resolveStoredMotherFourSymbol(context(
      { starbeast: { fourSymbol: "青龙" }, fourBeast: "白虎", geo: { symbol: "玄武" } },
      { fourBeast: "朱雀", direction: "白虎" },
    )),
    "青龙",
  );
  assertEqual(
    "legacy top-level fourBeast remains readable",
    resolveStoredMotherFourSymbol(context({ fourBeast: "白虎" })),
    "白虎",
  );
  assertEqual(
    "legacy geo symbol remains readable",
    resolveStoredMotherFourSymbol(context({ geo: { symbol: "玄武", province: "甘肃" } })),
    "玄武",
  );
  assertEqual(
    "legacy persona fourBeast remains readable",
    resolveStoredMotherFourSymbol(context(null, { fourBeast: "朱雀" })),
    "朱雀",
  );
  assertEqual(
    "oldest persona direction remains readable",
    resolveStoredMotherFourSymbol(context(null, { direction: "青龙" })),
    "青龙",
  );

  const originPersistenceBlock = launchSource.slice(
    launchSource.indexOf("const originMotherContext ="),
    launchSource.indexOf("const personaOutputSnapshot ="),
  );
  const geoResultBlock = fusionTypeSource.slice(
    fusionTypeSource.indexOf("geo: Readonly<{"),
    fusionTypeSource.indexOf("chrono: Readonly<{"),
  );
  const storedContextBlock = typeSource.slice(
    typeSource.indexOf("export type StoredOriginMotherContext"),
    typeSource.indexOf("export type DynamicsInputContext"),
  );
  assertIncludes("stored context type owns formal starbeast", typeSource, "starbeast?: {");
  assertIncludes("stored context type owns formal fourSymbol", typeSource, "fourSymbol?: string;");
  assertExcludes("formal stored context excludes geo symbol", storedContextBlock, "symbol?:");
  assertExcludes("formal stored context excludes top-level fourBeast", storedContextBlock, "fourBeast?:");
  assertIncludes("new writes persist complete starbeast context", originPersistenceBlock, "starbeast: reveal.starbeast");
  assertExcludes("new writes stop top-level fourBeast mirror", originPersistenceBlock, "fourBeast:");
  assertExcludes("fusion geo contract does not carry symbol", geoResultBlock, "symbol:");
  assertIncludes("fusion starbeast contract carries formal fourSymbol", fusionTypeSource, "fourSymbol: FourSymbol;");
  assertIncludes("gravity delegates stored fourSymbol resolution", gravitySource, "resolveStoredMotherFourSymbol(input)");
  assertExcludes("gravity does not read legacy geo symbol directly", gravitySource, "originMotherContext?.geo?.symbol");
  assertIncludes("adapter isolates legacy context shape", adapterSource, "type LegacyStoredOriginMotherContext");
  assertIncludes("adapter retains legacy geo symbol fallback", adapterSource, "legacyContext?.geo?.symbol");

  console.log("\n[MOTHER CONTEXT PERSISTENCE SEMANTICS] PASS");
} catch (error) {
  console.error("[MOTHER CONTEXT PERSISTENCE SEMANTICS] FAIL");
  console.error(error instanceof Error ? error.message : error);
  process.exit(1);
} finally {
  fs.rmSync(tempModulePath, { force: true });
}
