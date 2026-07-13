import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import process from "node:process";
import { build } from "esbuild";

const rootDir = process.cwd();
const resolverPath = path.join(rootDir, "src/services/guanyaoLunarTrigramLandingResolver.ts");
const adapterPath = path.join(rootDir, "src/services/guanyaoLunarMotherCodeLandingAdapter.ts");
const visualGrammarPath = path.join(rootDir, "src/data/fourBeastTrigramVisualGrammar.ts");
const fusionEnginePath = path.join(rootDir, "src/services/guanyaoGeoChronoMotherFusionEngine.ts");
const fusionTypePath = path.join(rootDir, "src/types/guanyaoGeoChronoMotherFusion.ts");
const launchLabPath = path.join(rootDir, "src/pages/LaunchLab.tsx");
const chronoPagePath = path.join(rootDir, "src/pages/ChronoPage.tsx");
const resolverSource = fs.readFileSync(resolverPath, "utf8");
const adapterSource = fs.readFileSync(adapterPath, "utf8");
const fusionEngineSource = fs.readFileSync(fusionEnginePath, "utf8");
const fusionTypeSource = fs.readFileSync(fusionTypePath, "utf8");
const launchLabSource = fs.readFileSync(launchLabPath, "utf8");
const chronoPageSource = fs.readFileSync(chronoPagePath, "utf8");
const tempResolverPath = path.join(os.tmpdir(), `guanyao-lunar-trigram-${process.pid}.mjs`);
const tempVisualPath = path.join(os.tmpdir(), `guanyao-four-beast-trigram-${process.pid}.mjs`);

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

try {
  await Promise.all([
    build({
      entryPoints: [resolverPath],
      outfile: tempResolverPath,
      bundle: true,
      platform: "node",
      format: "esm",
      target: "node20",
      logLevel: "silent",
    }),
    build({
      entryPoints: [visualGrammarPath],
      outfile: tempVisualPath,
      bundle: true,
      platform: "node",
      format: "esm",
      target: "node20",
      logLevel: "silent",
    }),
  ]);

  const {
    GUANYAO_HOUR_BRANCH_ORDINALS,
    resolveLunarTrigramLanding,
  } = await import(`file://${tempResolverPath}?t=${Date.now()}`);
  const { getFourBeastTrigramVisualGrammar } = await import(`file://${tempVisualPath}?t=${Date.now()}`);

  assertIncludes(
    "trigram resolver consumes shared birth calendar",
    resolverSource,
    "resolveBirthCalendarFromGregorianDate",
  );
  assertIncludes(
    "trigram resolver uses complete lunar chrono sum",
    resolverSource,
    "const fieldSeed = relatedYear + month + day + hourBranchOrdinal",
  );
  assertIncludes(
    "trigram resolver declares lunar-only source scope",
    resolverSource,
    'trigramSourceScope: "LUNAR_CHRONO_ONLY"',
  );
  assertExcludes("trigram resolver does not own mother registry", resolverSource, "MotherCode");
  assertExcludes("trigram resolver does not import starbeast input", resolverSource, "StarbeastLayerInput");
  assertExcludes("trigram resolver does not consume location", resolverSource, "locationAnchor");
  assertIncludes("mother landing adapter consumes trigram resolver", adapterSource, "resolveLunarTrigramLanding");
  assertExcludes("mother landing adapter does not recalculate field seed", adapterSource, "fieldSeed =");
  assertIncludes(
    "legacy chrono page consumes compatibility adapter",
    chronoPageSource,
    'from "../services/guanyaoLunarMotherCodeLandingAdapter"',
  );

  const expectedHourOrdinals = {
    子时: 1,
    丑时: 2,
    寅时: 3,
    卯时: 4,
    辰时: 5,
    巳时: 6,
    午时: 7,
    未时: 8,
    申时: 9,
    酉时: 10,
    戌时: 11,
    亥时: 12,
  };
  assertEqual("twelve branch ordinal mapping", JSON.stringify(GUANYAO_HOUR_BRANCH_ORDINALS), JSON.stringify(expectedHourOrdinals));

  const ziResult = resolveLunarTrigramLanding({ year: 1979, month: 4, day: 15, hourBranch: "子时" });
  assertEqual("1979 example lunar date", JSON.stringify(ziResult.calendarResolution.lunarBirthDate), JSON.stringify({ relatedYear: 1979, month: 3, day: 19, isLeapMonth: false }));
  assertEqual("1979 example complete chrono sum", ziResult.fieldSeed, 2002);
  assertEqual("1979 example remainder", ziResult.fieldRemainder, 2);
  assertEqual("1979 example trigram", ziResult.fieldMapping.trigram, "兑");
  assertEqual("trigram-only scope marker", ziResult.trigramSourceScope, "LUNAR_CHRONO_ONLY");

  const starbeastA = resolveLunarTrigramLanding({
    year: 1979,
    month: 4,
    day: 15,
    hourBranch: "子时",
    starbeast: "白虎",
  });
  const starbeastB = resolveLunarTrigramLanding({
    year: 1979,
    month: 4,
    day: 15,
    hourBranch: "子时",
    starbeast: "青龙",
  });
  assertEqual("starbeast does not change trigram landing", starbeastB.fieldMapping.trigram, starbeastA.fieldMapping.trigram);
  assertEqual("starbeast independence is scoped to trigram", starbeastB.trigramIndependentOfStarbeast, true);

  const locationA = resolveLunarTrigramLanding({ year: 2024, month: 2, day: 10, hourBranch: "子时", locationAnchorLabel: "甘肃" });
  const locationB = resolveLunarTrigramLanding({ year: 2024, month: 2, day: 10, hourBranch: "子时", locationAnchorLabel: "马来西亚" });
  assertEqual("location does not change trigram landing", locationB.fieldMapping.trigram, locationA.fieldMapping.trigram);
  assertEqual("location independence is scoped to trigram", locationB.trigramIndependentOfLocation, true);

  const fourBeasts = ["青龙", "朱雀", "白虎", "玄武"];
  const sameTrigramVisuals = fourBeasts.map((beast) => getFourBeastTrigramVisualGrammar(beast, "兑"));
  assertEqual("same trigram keeps four beast landing variants", new Set(sameTrigramVisuals.map((item) => item.key)).size, 4);
  assertEqual("same trigram keeps four life postures", new Set(sameTrigramVisuals.map((item) => item.beastBase)).size, 4);
  assertEqual("four beast variants keep resolved trigram", new Set(sameTrigramVisuals.map((item) => item.trigram)).size, 1);
  assertIncludes("production fusion input still carries starbeast", fusionTypeSource, "starbeast: StarbeastLayerInput");
  assertIncludes("production fusion engine still consumes starbeast", fusionEngineSource, "resolveStarbeastResidue(input.starbeast)");
  assertIncludes("launch chain still resolves four beast x trigram grammar", launchLabSource, "getFourBeastTrigramVisualGrammar(result.geo.symbol, result.mother.trigram)");

  let invalidReason = "";
  try {
    resolveLunarTrigramLanding({ year: 1900, month: 1, day: 1, hourBranch: "子时" });
  } catch (error) {
    invalidReason = error instanceof Error ? error.message : String(error);
  }
  assertEqual(
    "unsupported calendar range blocks trigram landing",
    invalidReason,
    "LUNAR_TRIGRAM_CALENDAR_NOT_READY:OUTSIDE_SUPPORTED_GREGORIAN_RANGE",
  );

  console.log("\n[LUNAR TRIGRAM LANDING] PASS");
} catch (error) {
  console.error("[LUNAR TRIGRAM LANDING] FAIL");
  console.error(error instanceof Error ? error.message : error);
  process.exit(1);
} finally {
  fs.rmSync(tempResolverPath, { force: true });
  fs.rmSync(tempVisualPath, { force: true });
}
