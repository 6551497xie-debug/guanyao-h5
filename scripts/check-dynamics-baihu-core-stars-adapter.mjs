import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import process from "node:process";
import { build } from "esbuild";

const rootDir = process.cwd();
const adapterPath = path.join(rootDir, "src/services/guanyaoDynamicsBaiHuCoreStarsAdapter.ts");
const typePath = path.join(rootDir, "src/types/dynamicsBaiHuCoreStars.ts");
const gravityPath = path.join(rootDir, "src/pages/GravityPage.tsx");
const adapterSource = fs.readFileSync(adapterPath, "utf8");
const typeSource = fs.readFileSync(typePath, "utf8");
const gravitySource = fs.readFileSync(gravityPath, "utf8");
const tempModulePath = path.join(os.tmpdir(), `guanyao-baihu-core-stars-${process.pid}.mjs`);

const assertEqual = (name, actual, expected) => {
  if (actual !== expected) throw new Error(`${name} expected=${expected} actual=${actual}`);
  console.log(`PASS | ${name} | expected=${expected} | actual=${actual}`);
};

const assertClose = (name, actual, expected) => {
  if (Math.abs(actual - expected) > 1e-9) throw new Error(`${name} expected=${expected} actual=${actual}`);
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

const fixtureInput = {
  seedId: "seed-baihu",
  seedText: "现实压力进入",
  primaryDimension: "action",
  beastTone: "charge",
  currentNode: 3,
  runtimePrimarySpaceId: "action",
  beastResonance: 0.68,
  seedIntensity: 0.72,
  selectedPressureSeedSurface: "现实压力",
};

const expectedStars = [
  [19.64, 44.50927776395653, 6.2],
  [30.772, 35.96819516914335, 5.2],
  [43.928, 30.529984855302715, 5.6],
  [58.096000000000004, 27.15116360965554, 6.8],
  [70.24000000000001, 30.015735203933303, 5.4],
  [79.348, 34.41376959681538, 6.9],
  [86.432, 40.28149971485739, 5.2],
];

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

  const { resolveDynamicsBaiHuCoreStars } = await import(`file://${tempModulePath}?t=${Date.now()}`);

  const inputSnapshot = JSON.stringify(fixtureInput);
  const first = resolveDynamicsBaiHuCoreStars(fixtureInput);
  const second = resolveDynamicsBaiHuCoreStars({ ...fixtureInput });
  assertEqual("adapter owns BaiHu semantic role", first.semanticRole, "BAIHU_CORE_STARS");
  assertEqual("result declares determinism", first.deterministic, true);
  assertEqual("same input yields same result", JSON.stringify(second), JSON.stringify(first));
  assertEqual("adapter does not mutate input", JSON.stringify(fixtureInput), inputSnapshot);
  assertEqual("constellation hash remains compatible", first.hashes.constellation, 887024521);
  assertEqual("pressure hash remains compatible", first.hashes.pressure, 977689174);
  assertEqual("mansion index remains compatible", first.pressureBeastSeed.index, 5);
  assertEqual("beast intensity remains compatible", first.pressureBeastSeed.intensity, 5);
  assertEqual("pressure resonance remains compatible", first.pressureBeastSeed.resonance, 4);
  assertEqual("BaiHu core star count", first.coreStars.length, 7);
  first.coreStars.forEach((star, index) => {
    assertClose(`star ${index + 1} x`, star[0], expectedStars[index][0]);
    assertClose(`star ${index + 1} y`, star[1], expectedStars[index][1]);
    assertClose(`star ${index + 1} size`, star[2], expectedStars[index][2]);
  });
  assertEqual("result is frozen", Object.isFrozen(first), true);
  assertEqual("hash trace is frozen", Object.isFrozen(first.hashes), true);
  assertEqual("pressure beast seed is frozen", Object.isFrozen(first.pressureBeastSeed), true);
  assertEqual("core star collection is frozen", Object.isFrozen(first.coreStars), true);
  assertEqual("individual core stars are frozen", first.coreStars.every(Object.isFrozen), true);

  const changedSeed = resolveDynamicsBaiHuCoreStars({ ...fixtureInput, seedText: "另一颗现实压力" });
  assertEqual("seed text changes constellation hash", changedSeed.hashes.constellation === first.hashes.constellation, false);
  assertEqual("seed text changes star projection", JSON.stringify(changedSeed.coreStars) === JSON.stringify(first.coreStars), false);

  const changedSurface = resolveDynamicsBaiHuCoreStars({ ...fixtureInput, selectedPressureSeedSurface: "另一种表述" });
  assertEqual("surface does not change constellation hash", changedSurface.hashes.constellation, first.hashes.constellation);
  assertEqual("surface changes pressure hash", changedSurface.hashes.pressure === first.hashes.pressure, false);

  const upperBounds = resolveDynamicsBaiHuCoreStars({
    ...fixtureInput,
    beastResonance: 2,
    seedIntensity: 2,
  });
  assertEqual("beast intensity clamps to seven", upperBounds.pressureBeastSeed.intensity, 7);
  assertEqual("pressure resonance clamps to five", upperBounds.pressureBeastSeed.resonance, 5);

  const lowerBounds = resolveDynamicsBaiHuCoreStars({
    ...fixtureInput,
    beastResonance: -2,
    seedIntensity: -2,
  });
  assertEqual("beast intensity clamps to one", lowerBounds.pressureBeastSeed.intensity, 1);
  assertEqual("pressure resonance clamps to one", lowerBounds.pressureBeastSeed.resonance, 1);

  assertEqual("adapter forbids random source", first.guardrails.usesRandom, false);
  assertEqual("adapter never advances runtime", first.guardrails.advancesRuntime, false);
  assertEqual("adapter never writes storage", first.guardrails.writesStorage, false);
  assertIncludes("adapter input type is independent", typeSource, "export type DynamicsBaiHuCoreStarsAdapterInput");
  assertIncludes("adapter result type is independent", typeSource, "export type DynamicsBaiHuCoreStarsResult");
  assertIncludes("adapter exposes deterministic resolver", adapterSource, "export function resolveDynamicsBaiHuCoreStars");
  assertExcludes("adapter does not use Math random", adapterSource, "Math.random");
  assertExcludes("adapter does not consume execution snapshot", adapterSource, "ExecutionSnapshot");
  assertExcludes("adapter does not consume runtime projection", adapterSource, "RuntimeProjection");
  assertExcludes("adapter does not access DOM", adapterSource, "document.");
  assertExcludes("adapter stays localStorage neutral", adapterSource, "localStorage");
  assertIncludes("Gravity delegates BaiHu core stars", gravitySource, "resolveDynamicsBaiHuCoreStars({");
  assertIncludes("Gravity passes seed identity", gravitySource, "seedId: executionSnapshot.seed.id");
  assertIncludes("Gravity passes pressure surface", gravitySource, "selectedPressureSeedSurface,");
  assertIncludes("Gravity consumes projected core stars", gravitySource, "coreStars={baiHuCoreStars.coreStars}");
  assertExcludes("Gravity no longer owns BaiHu hash", gravitySource, "hashPressureBeastInput");
  assertExcludes("Gravity no longer owns pressure beast seed", gravitySource, "resolvePressureBeastSeed");
  assertExcludes("Gravity no longer builds BaiHu core stars", gravitySource, "buildRuntimeBaiHuCoreStars");

  console.log("\n[DYNAMICS BAIHU CORE STARS ADAPTER] PASS");
} catch (error) {
  console.error("[DYNAMICS BAIHU CORE STARS ADAPTER] FAIL");
  console.error(error instanceof Error ? error.message : error);
  process.exit(1);
} finally {
  fs.rmSync(tempModulePath, { force: true });
}
