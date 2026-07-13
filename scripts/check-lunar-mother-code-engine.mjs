import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import process from "node:process";
import { build } from "esbuild";

const rootDir = process.cwd();
const servicePath = path.join(rootDir, "src/services/guanyaoLunarMotherCodeEngineService.ts");
const numericProtocolPath = path.join(rootDir, "src/data/guanyaoNumericProtocol.ts");
const chronoPagePath = path.join(rootDir, "src/pages/ChronoPage.tsx");
const serviceSource = fs.readFileSync(servicePath, "utf8");
const numericProtocolSource = fs.readFileSync(numericProtocolPath, "utf8");
const chronoPageSource = fs.readFileSync(chronoPagePath, "utf8");
const tempModulePath = path.join(os.tmpdir(), `guanyao-lunar-mother-code-${process.pid}.mjs`);

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
  await build({
    entryPoints: [servicePath],
    outfile: tempModulePath,
    bundle: true,
    platform: "node",
    format: "esm",
    target: "node20",
    logLevel: "silent",
  });

  const {
    GUANYAO_HOUR_BRANCH_ORDINALS,
    runMotherCodeLandingEngine,
  } = await import(`file://${tempModulePath}?t=${Date.now()}`);

  assertIncludes(
    "mother engine consumes shared birth calendar",
    serviceSource,
    "resolveBirthCalendarFromGregorianDate",
  );
  assertIncludes(
    "mother engine uses complete lunar chrono sum",
    serviceSource,
    "const fieldSeed = relatedYear + month + day + hourBranchOrdinal",
  );
  assertExcludes("mother engine removes Gregorian digit sum", serviceSource, "sumDigits");
  assertExcludes("mother engine does not import starbeast", serviceSource, "Starbeast");
  assertExcludes("mother engine does not consume location", serviceSource, "locationAnchor");
  assertExcludes("numeric protocol no longer owns mother engine", numericProtocolSource, "runMotherCodeLandingEngine");
  assertIncludes(
    "chrono page consumes lunar mother engine",
    chronoPageSource,
    'from "../services/guanyaoLunarMotherCodeEngineService"',
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

  const ziResult = runMotherCodeLandingEngine({ year: 1979, month: 4, day: 15, hourBranch: "子时" });
  const ziRepeat = runMotherCodeLandingEngine({ year: 1979, month: 4, day: 15, hourBranch: "子时" });
  assertEqual("1979 example lunar date", JSON.stringify(ziResult.calendarResolution.lunarBirthDate), JSON.stringify({ relatedYear: 1979, month: 3, day: 19, isLeapMonth: false }));
  assertEqual("1979 example hour ordinal", ziResult.lunarChrono.hourBranchOrdinal, 1);
  assertEqual("1979 example complete chrono sum", ziResult.fieldSeed, 2002);
  assertEqual("1979 example remainder", ziResult.fieldRemainder, 2);
  assertEqual("1979 example mother trigram", ziResult.fieldMapping.trigram, "兑");
  assertEqual("1979 example deterministic repeat", ziRepeat.fieldSeed, ziResult.fieldSeed);
  assertEqual("1979 example deterministic mother repeat", ziRepeat.motherCodeProfile.motherCodeId, ziResult.motherCodeProfile.motherCodeId);

  const chouResult = runMotherCodeLandingEngine({ year: 1979, month: 4, day: 15, hourBranch: "丑时" });
  assertEqual("same date next branch changes temporal sum", chouResult.fieldSeed, 2003);
  assertEqual("same date next branch changes trigram", chouResult.fieldMapping.trigram, "离");
  assertEqual("same date keeps starbeast-independent marker", chouResult.starbeastIndependent, true);

  const leapMonthResult = runMotherCodeLandingEngine({ year: 2023, month: 3, day: 22, hourBranch: "子时" });
  assertEqual("leap month is preserved", leapMonthResult.lunarChrono.isLeapMonth, true);
  assertEqual("leap month uses lunar month number", leapMonthResult.fieldSeed, 2027);

  const locationA = runMotherCodeLandingEngine({
    year: 2024,
    month: 2,
    day: 10,
    hourBranch: "子时",
    locationAnchorLabel: "甘肃",
  });
  const locationB = runMotherCodeLandingEngine({
    year: 2024,
    month: 2,
    day: 10,
    hourBranch: "子时",
    locationAnchorLabel: "马来西亚",
  });
  assertEqual("location does not change temporal sum", locationB.fieldSeed, locationA.fieldSeed);
  assertEqual("location does not change mother trigram", locationB.fieldMapping.trigram, locationA.fieldMapping.trigram);
  assertEqual("location-independent marker", locationB.locationIndependent, true);

  const firstEightBranches = ["子时", "丑时", "寅时", "卯时", "辰时", "巳时", "午时", "未时"];
  const coverage = firstEightBranches.map((hourBranch) =>
    runMotherCodeLandingEngine({ year: 2024, month: 2, day: 10, hourBranch }),
  );
  assertEqual("eight consecutive branches cover every remainder", new Set(coverage.map((item) => item.fieldRemainder)).size, 8);
  assertEqual("eight consecutive branches cover every trigram", new Set(coverage.map((item) => item.fieldMapping.trigram)).size, 8);

  let invalidReason = "";
  try {
    runMotherCodeLandingEngine({ year: 1900, month: 1, day: 1, hourBranch: "子时" });
  } catch (error) {
    invalidReason = error instanceof Error ? error.message : String(error);
  }
  assertEqual(
    "unsupported calendar range blocks mother code",
    invalidReason,
    "MOTHER_CODE_CALENDAR_NOT_READY:OUTSIDE_SUPPORTED_GREGORIAN_RANGE",
  );

  console.log("\n[LUNAR MOTHER CODE ENGINE] PASS");
} catch (error) {
  console.error("[LUNAR MOTHER CODE ENGINE] FAIL");
  console.error(error instanceof Error ? error.message : error);
  process.exit(1);
} finally {
  fs.rmSync(tempModulePath, { force: true });
}
