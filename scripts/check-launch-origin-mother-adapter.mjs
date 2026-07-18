import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import process from "node:process";
import { build } from "esbuild";

const rootDir = process.cwd();
const adapterPath = path.join(rootDir, "src/services/guanyaoLaunchOriginMotherInputAdapter.ts");
const starbeastSourcePath = path.join(rootDir, "src/services/guanyaoLaunchStarbeastDerivationSourceAdapter.ts");
const inputTypePath = path.join(rootDir, "src/types/guanyaoLaunchOriginMother.ts");
const launchPath = path.join(rootDir, "src/pages/LaunchLab.tsx");
const adapterSource = fs.readFileSync(adapterPath, "utf8");
const starbeastSource = fs.readFileSync(starbeastSourcePath, "utf8");
const inputTypeSource = fs.readFileSync(inputTypePath, "utf8");
const launchSource = fs.readFileSync(launchPath, "utf8");
const tempModulePath = path.join(os.tmpdir(), `guanyao-launch-origin-mother-adapter-${process.pid}.mjs`);
const tempStarbeastSourceModulePath = path.join(os.tmpdir(), `guanyao-launch-starbeast-source-${process.pid}.mjs`);

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
  await Promise.all([
    build({
      entryPoints: [adapterPath],
      outfile: tempModulePath,
      bundle: true,
      platform: "node",
      format: "esm",
      target: "node20",
      logLevel: "silent",
    }),
    build({
      entryPoints: [starbeastSourcePath],
      outfile: tempStarbeastSourceModulePath,
      bundle: true,
      platform: "node",
      format: "esm",
      target: "node20",
      logLevel: "silent",
    }),
  ]);

  const {
    adaptLaunchOriginMotherInput,
    resolveLaunchOriginMother,
  } = await import(`file://${tempModulePath}?t=${Date.now()}`);
  const { resolveLaunchStarbeastDerivationSource } = await import(
    `file://${tempStarbeastSourceModulePath}?t=${Date.now()}`
  );

  assertIncludes("neutral input type owns launch adapter input", inputTypeSource, "export type LaunchOriginMotherInput");
  assertExcludes("neutral launch input does not import services", inputTypeSource, 'from "../services/');
  assertIncludes("adapter consumes neutral launch input", adapterSource, 'from "../types/guanyaoLaunchOriginMother"');
  assertIncludes("adapter delegates full mother code landing", adapterSource, "runMotherCodeLandingEngine");
  assertIncludes("adapter delegates starbeast source carrier", adapterSource, "resolveLaunchStarbeastDerivationSource");
  assertExcludes("adapter no longer calls starbeast engine directly", adapterSource, "resolveStarbeastFromBirthDate");
  assertIncludes("adapter delegates mother fusion", adapterSource, "runGeoChronoMotherFusionEngine");
  assertIncludes("source carrier owns formal starbeast result", starbeastSource, "starBeastResult: StarbeastDerivationResult");
  assertIncludes("source carrier delegates starbeast derivation", starbeastSource, "resolveStarbeastFromBirthDate(input)");
  assertExcludes("source carrier does not consume geography", starbeastSource, "GeoLayerInput");
  assertExcludes("source carrier does not consume birth time", starbeastSource, "hourBranch");
  assertExcludes("source carrier does not persist", starbeastSource, "localStorage");
  assertExcludes("adapter does not depend on Launch state", adapterSource, "m.coords");
  assertExcludes("adapter does not depend on visual nodes", adapterSource, "NODES");
  assertExcludes("adapter does not own eight-division arithmetic", adapterSource, "fieldSeed");
  assertIncludes("launch captures complete origin source results", launchSource, "resolveLaunchOriginMotherSourceResults(launchInput)");
  assertIncludes("launch stores immutable life source session", launchSource, "createLaunchLifeSourceSession({");
  assertExcludes("launch does not call fusion engine", launchSource, "runGeoChronoMotherFusionEngine");
  assertExcludes("launch does not call trigram resolver", launchSource, "resolveLunarTrigramLanding");
  assertExcludes("launch does not call starbeast resolver", launchSource, "resolveStarbeastFromBirthDate");

  const input = {
    birth: { year: 1979, month: 4, day: 15, hourBranch: "子时" },
    periodIndex: 0,
    geo: { province: "甘肃", city: "兰州" },
    starbeast: { nodeCount: 28, primaryNodeIndex: 6, originLightTrace: "28光兽入口" },
  };
  const adapted = adaptLaunchOriginMotherInput(input);
  const result = resolveLaunchOriginMother(input);
  const birthDate = Object.freeze({ year: 1979, month: 4, day: 15 });
  const birthDateSnapshot = JSON.stringify(birthDate);
  const starbeastSourceCarrier = resolveLaunchStarbeastDerivationSource(birthDate);

  assertEqual("adapter resolves lunar trigram", adapted.trigramLanding.fieldMapping.trigram, "兑");
  assertEqual("adapter resolves birth-date four symbol", adapted.fourSymbol, "青龙");
  assertEqual("adapter preserves geo province", adapted.geo.province, "甘肃");
  assertEqual("adapter preserves chrono period index", adapted.chrono.periodIndex, 0);
  assertEqual("adapter preserves starbeast residue input", adapted.starbeast.primaryNodeIndex, 6);
  assertEqual("adapter output reaches mother fusion", result.mother.trigram, "兑");
  assertEqual("adapter output keeps mother starbeast", result.starbeast.fourSymbol, "青龙");
  assertEqual("adapter output keeps geo semantic clean", "symbol" in result.geo, false);
  assertEqual("source carrier identifies launch source", starbeastSourceCarrier.source, "launch_starbeast_derivation_source");
  assertEqual("source carrier preserves formal result status", starbeastSourceCarrier.starBeastResult.status, "READY");
  assertEqual("source carrier preserves mansion", starbeastSourceCarrier.starBeastResult.mansion, "箕");
  assertEqual("source carrier preserves four symbol", starbeastSourceCarrier.starBeastResult.fourSymbol, "青龙");
  assertEqual("source carrier is frozen", Object.isFrozen(starbeastSourceCarrier), true);
  assertEqual("source carrier does not mutate birth date", JSON.stringify(birthDate), birthDateSnapshot);

  const invalidStarbeastSourceCarrier = resolveLaunchStarbeastDerivationSource({ year: 1979, month: 2, day: 30 });
  assertEqual("source carrier preserves invalid result", invalidStarbeastSourceCarrier.starBeastResult.status, "INVALID_DATE");
  assertEqual(
    "source carrier preserves invalid reason",
    invalidStarbeastSourceCarrier.starBeastResult.reason,
    "INVALID_GREGORIAN_BIRTH_DATE",
  );

  console.log("\n[LAUNCH ORIGIN MOTHER ADAPTER] PASS");
} catch (error) {
  console.error("[LAUNCH ORIGIN MOTHER ADAPTER] FAIL");
  console.error(error instanceof Error ? error.message : error);
  process.exit(1);
} finally {
  fs.rmSync(tempModulePath, { force: true });
  fs.rmSync(tempStarbeastSourceModulePath, { force: true });
}
