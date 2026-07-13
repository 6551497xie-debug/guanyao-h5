import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import process from "node:process";
import ts from "typescript";

const rootDir = process.cwd();
const calendarServicePath = path.join(rootDir, "src/services/guanyaoBirthCalendarService.ts");
const calendarTypePath = path.join(rootDir, "src/types/guanyaoBirthCalendar.ts");
const servicePath = path.join(rootDir, "src/services/guanyaoStarbeastEngineService.ts");
const typePath = path.join(rootDir, "src/types/guanyaoStarbeast.ts");
const calendarServiceSource = fs.readFileSync(calendarServicePath, "utf8");
const calendarTypeSource = fs.readFileSync(calendarTypePath, "utf8");
const serviceSource = fs.readFileSync(servicePath, "utf8");
const typeSource = fs.readFileSync(typePath, "utf8");
const tempModulePath = path.join(os.tmpdir(), `guanyao-star-beast-engine-${process.pid}.mjs`);
const calendarRuntimeImport = 'import { resolveBirthCalendarFromGregorianDate } from "./guanyaoBirthCalendarService";\n';
const combinedRuntimeSource = `${calendarServiceSource}\n${serviceSource.replace(calendarRuntimeImport, "")}`;

const transpiled = ts.transpileModule(combinedRuntimeSource, {
  compilerOptions: {
    module: ts.ModuleKind.ES2022,
    target: ts.ScriptTarget.ES2022,
    strict: true,
  },
});

fs.writeFileSync(tempModulePath, transpiled.outputText);

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
  const {
    GUANYAO_LUNAR_MONTH_START_MANSIONS,
    GUANYAO_TWENTY_EIGHT_MANSIONS,
    resolveStarbeastFromBirthDate,
  } = await import(`file://${tempModulePath}?t=${Date.now()}`);

  assertEqual("twenty-eight mansion count", GUANYAO_TWENTY_EIGHT_MANSIONS.length, 28);
  assertEqual("twenty-eight mansion uniqueness", new Set(GUANYAO_TWENTY_EIGHT_MANSIONS).size, 28);
  assertEqual(
    "lunar month first-day mansion anchors",
    GUANYAO_LUNAR_MONTH_START_MANSIONS.join(""),
    "室奎胃毕参鬼张角氐心斗虚",
  );

  const inputTypeBlock = calendarTypeSource.match(/export type GregorianBirthDateInput[\s\S]*?}>;/)?.[0] ?? "";
  assertIncludes("shared Gregorian input is explicit", inputTypeBlock, "year: number");
  assertExcludes("starbeast input excludes location", inputTypeBlock, "location");
  assertExcludes("starbeast input excludes birth time", inputTypeBlock, "hour");
  assertIncludes(
    "starbeast input reuses shared Gregorian input",
    typeSource,
    "export type StarbeastDerivationInput = GregorianBirthDateInput",
  );
  assertIncludes("starbeast result locks location independence", typeSource, "locationIndependent: true");
  assertIncludes("starbeast result locks birth time independence", typeSource, "birthTimeIndependent: true");
  assertIncludes("starbeast exposes symbolic trigram only", typeSource, "symbolicTrigram: FourSymbolTrigram");
  assertExcludes("starbeast does not expose mother-code trigram source", typeSource, "associatedTrigram");
  assertExcludes("starbeast service does not resolve mother code", serviceSource, "MotherCode");
  assertIncludes(
    "service converts Gregorian input to lunar month-day protocol",
    serviceSource,
    'calculationBasis: "GREGORIAN_TO_LUNAR_MONTH_DAY_MANSION"',
  );
  assertIncludes(
    "shared calendar fixes Chinese calendar timezone",
    calendarServiceSource,
    'GUANYAO_BIRTH_CALENDAR_TIME_ZONE = "Asia/Shanghai"',
  );
  assertIncludes(
    "starbeast delegates Gregorian lunar conversion",
    serviceSource,
    "resolveBirthCalendarFromGregorianDate(input)",
  );
  assertExcludes("starbeast no longer owns calendar formatter", serviceSource, "new Intl.DateTimeFormat");
  assertExcludes("service removes Gregorian absolute-day anchor", serviceSource, "referenceDayNumber");

  const fixtures = [
    {
      name: "1979 example follows lunar month-day table",
      input: { year: 1979, month: 4, day: 15 },
      lunar: { relatedYear: 1979, month: 3, day: 19, isLeapMonth: false },
      expected: { mansion: "箕", fourSymbol: "青龙", direction: "东", symbolicTrigram: "震" },
    },
    {
      name: "lunar new year starts at room mansion",
      input: { year: 2024, month: 2, day: 10 },
      lunar: { relatedYear: 2024, month: 1, day: 1, isLeapMonth: false },
      expected: { mansion: "室", fourSymbol: "玄武", direction: "北", symbolicTrigram: "坎" },
    },
    {
      name: "lunar first-month day seven resolves net mansion",
      input: { year: 2024, month: 2, day: 16 },
      lunar: { relatedYear: 2024, month: 1, day: 7, isLeapMonth: false },
      expected: { mansion: "毕", fourSymbol: "白虎", direction: "西", symbolicTrigram: "兑" },
    },
    {
      name: "lunar second-month day five resolves net mansion",
      input: { year: 2024, month: 3, day: 14 },
      lunar: { relatedYear: 2024, month: 2, day: 5, isLeapMonth: false },
      expected: { mansion: "毕", fourSymbol: "白虎", direction: "西", symbolicTrigram: "兑" },
    },
    {
      name: "leap lunar month repeats the same month anchor",
      input: { year: 2023, month: 3, day: 22 },
      lunar: { relatedYear: 2023, month: 2, day: 1, isLeapMonth: true },
      expected: { mansion: "奎", fourSymbol: "白虎", direction: "西", symbolicTrigram: "兑" },
    },
  ];

  fixtures.forEach((fixture) => {
    const first = resolveStarbeastFromBirthDate(fixture.input);
    const second = resolveStarbeastFromBirthDate(fixture.input);
    assertEqual(`${fixture.name} status`, first.status, "READY");
    assertEqual(`${fixture.name} repeat`, JSON.stringify(second), JSON.stringify(first));
    assertEqual(`${fixture.name} lunar date`, JSON.stringify(first.lunarBirthDate), JSON.stringify(fixture.lunar));
    assertEqual(`${fixture.name} mansion`, first.mansion, fixture.expected.mansion);
    assertEqual(`${fixture.name} four symbol`, first.fourSymbol, fixture.expected.fourSymbol);
    assertEqual(`${fixture.name} direction`, first.direction, fixture.expected.direction);
    assertEqual(`${fixture.name} symbolic trigram`, first.symbolicTrigram, fixture.expected.symbolicTrigram);
  });

  const invalid = resolveStarbeastFromBirthDate({ year: 2023, month: 2, day: 29 });
  assertEqual("invalid Gregorian date status", invalid.status, "INVALID_DATE");
  assertEqual("invalid Gregorian date reason", invalid.reason, "INVALID_GREGORIAN_BIRTH_DATE");

  const unsupported = resolveStarbeastFromBirthDate({ year: 1900, month: 1, day: 1 });
  assertEqual("unsupported conversion range status", unsupported.status, "INVALID_DATE");
  assertEqual("unsupported conversion range reason", unsupported.reason, "OUTSIDE_SUPPORTED_GREGORIAN_RANGE");

  console.log("\n[STAR BEAST ENGINE] PASS");
} catch (error) {
  console.error("[STAR BEAST ENGINE] FAIL");
  console.error(error instanceof Error ? error.message : error);
  process.exit(1);
} finally {
  fs.rmSync(tempModulePath, { force: true });
}
