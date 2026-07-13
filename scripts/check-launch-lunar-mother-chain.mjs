import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import process from "node:process";
import { build } from "esbuild";

const rootDir = process.cwd();
const fusionPath = path.join(rootDir, "src/services/guanyaoGeoChronoMotherFusionEngine.ts");
const trigramPath = path.join(rootDir, "src/services/guanyaoLunarTrigramLandingResolver.ts");
const starbeastPath = path.join(rootDir, "src/services/guanyaoStarbeastEngineService.ts");
const visualPath = path.join(rootDir, "src/data/fourBeastTrigramVisualGrammar.ts");
const launchPath = path.join(rootDir, "src/pages/LaunchLab.tsx");
const adapterPath = path.join(rootDir, "src/services/guanyaoLaunchOriginMotherInputAdapter.ts");
const fusionSource = fs.readFileSync(fusionPath, "utf8");
const launchSource = fs.readFileSync(launchPath, "utf8");
const adapterSource = fs.readFileSync(adapterPath, "utf8");
const tempDir = fs.mkdtempSync(path.join(os.tmpdir(), "guanyao-launch-mother-chain-"));

const assertEqual = (name, actual, expected) => {
  if (actual !== expected) {
    throw new Error(`${name} expected=${expected} actual=${actual}`);
  }
  console.log(`PASS | ${name} | expected=${expected} | actual=${actual}`);
};

const assertIncludes = (name, source, expected) => {
  if (!source.includes(expected)) {
    throw new Error(`${name} missing=${expected}`);
  }
  console.log(`PASS | ${name} | includes=${expected}`);
};

const assertExcludes = (name, source, forbidden) => {
  if (source.includes(forbidden)) {
    throw new Error(`${name} forbidden=${forbidden}`);
  }
  console.log(`PASS | ${name} | forbidden=absent`);
};

const bundleAndImport = async (entryPath, outputName) => {
  const outfile = path.join(tempDir, outputName);
  await build({
    entryPoints: [entryPath],
    outfile,
    bundle: true,
    platform: "node",
    format: "esm",
    target: "node20",
    logLevel: "silent",
  });
  return import(`file://${outfile}?t=${Date.now()}`);
};

try {
  const [fusionModule, trigramModule, starbeastModule, visualModule] = await Promise.all([
    bundleAndImport(fusionPath, "fusion.mjs"),
    bundleAndImport(trigramPath, "trigram.mjs"),
    bundleAndImport(starbeastPath, "starbeast.mjs"),
    bundleAndImport(visualPath, "visual.mjs"),
  ]);

  const { runGeoChronoMotherFusionEngine } = fusionModule;
  const { resolveLunarTrigramLanding } = trigramModule;
  const { resolveStarbeastFromBirthDate } = starbeastModule;
  const { getFourBeastTrigramVisualGrammar } = visualModule;

  assertIncludes("adapter consumes lunar trigram resolver", adapterSource, "resolveLunarTrigramLanding");
  assertIncludes("adapter consumes birth-date starbeast resolver", adapterSource, "resolveStarbeastFromBirthDate");
  assertIncludes("adapter feeds resolved trigram landing", adapterSource, "trigramLanding,");
  assertIncludes("adapter feeds resolved four symbol", adapterSource, "fourSymbol: starbeastDerivation.fourSymbol");
  assertIncludes("launch delegates origin mother resolution", launchSource, "resolveLaunchOriginMother({");
  assertExcludes("launch no longer calls lunar trigram resolver", launchSource, "resolveLunarTrigramLanding");
  assertExcludes("launch no longer calls starbeast resolver", launchSource, "resolveStarbeastFromBirthDate");
  assertExcludes("launch no longer calls fusion engine", launchSource, "runGeoChronoMotherFusionEngine");
  assertIncludes("fusion reads resolved trigram", fusionSource, "input.trigramLanding.fieldMapping.trigram");
  assertIncludes("fusion reads resolved four symbol", fusionSource, "const symbol = input.fourSymbol");
  assertExcludes("fusion no longer derives beast from geography", fusionSource, "resolveGeoSymbol");
  assertExcludes("fusion no longer recalculates trigram index", fusionSource, "fusionIndex");
  assertExcludes("fusion no longer owns trigram order", fusionSource, "trigramOrder");

  const birthDate = { year: 1979, month: 4, day: 15 };
  const trigramLanding = resolveLunarTrigramLanding({ ...birthDate, hourBranch: "子时" });
  const starbeast = resolveStarbeastFromBirthDate(birthDate);
  assertEqual("example starbeast is ready", starbeast.status, "READY");

  const buildFusion = (province, city) => runGeoChronoMotherFusionEngine({
    geo: { province, city },
    chrono: { ...birthDate, periodIndex: 0 },
    starbeast: { nodeCount: 28, primaryNodeIndex: 6, originLightTrace: "28光兽入口" },
    fourSymbol: starbeast.fourSymbol,
    trigramLanding,
  });

  const gansu = buildFusion("甘肃", "兰州");
  const malaysia = buildFusion("马来西亚", "吉隆坡");
  assertEqual("production mother uses lunar trigram", gansu.mother.trigram, "兑");
  assertEqual("production mother uses birth-date starbeast", gansu.geo.symbol, "青龙");
  assertEqual("location does not change production trigram", malaysia.mother.trigram, gansu.mother.trigram);
  assertEqual("location does not change production starbeast", malaysia.geo.symbol, gansu.geo.symbol);
  assertEqual("mother profile follows resolved trigram", gansu.mother.profile.lowerTrigram, "兑");

  const visual = getFourBeastTrigramVisualGrammar(gansu.geo.symbol, gansu.mother.trigram);
  assertEqual("resolved beast lands in resolved trigram", visual.key, "青龙_兑");
  assertEqual("fusion result keeps geo shape", gansu.geo.province, "甘肃");
  assertEqual("fusion result keeps chrono shape", gansu.chrono.role, "temporal axis");
  assertEqual("fusion result keeps starbeast residue shape", gansu.starbeast.role, "identity residue");

  console.log("\n[LAUNCH LUNAR MOTHER CHAIN] PASS");
} catch (error) {
  console.error("[LAUNCH LUNAR MOTHER CHAIN] FAIL");
  console.error(error instanceof Error ? error.message : error);
  process.exit(1);
} finally {
  fs.rmSync(tempDir, { recursive: true, force: true });
}
