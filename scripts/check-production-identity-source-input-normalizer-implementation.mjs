import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import process from "node:process";
import { build } from "esbuild";

const rootDir = process.cwd();
const files = Object.freeze({
  type: "src/types/productionIdentitySourceInputNormalizer.ts",
  service: "src/services/productionIdentitySourceInputNormalizer.ts",
  readinessType: "src/types/productionIdentitySourceInputNormalizerImplementationReadiness.ts",
  readinessService: "src/services/productionIdentitySourceInputNormalizerImplementationReadiness.ts",
  protocol: "docs/GUANYAO_FORMAL_IDENTITY_SOURCE_INPUT_NORMALIZER_IMPLEMENTATION_PROTOCOL.md",
  typeIndex: "src/types/index.ts",
  packageManifest: "package.json",
});

const failures = [];
const assertIncludes = (name, source, expected) => {
  if (!source.includes(expected)) failures.push(`${name} missing=${expected}`);
  else console.log(`PASS | ${name} | includes=${expected}`);
};
const assertExcludes = (name, source, forbidden) => {
  if (source.includes(forbidden)) failures.push(`${name} forbidden=${forbidden}`);
  else console.log(`PASS | ${name} | forbidden=absent`);
};
const assertEqual = (name, actual, expected) => {
  if (actual !== expected) failures.push(`${name} expected=${String(expected)} actual=${String(actual)}`);
  else console.log(`PASS | ${name} | expected=${String(expected)}`);
};

const absolute = Object.fromEntries(
  Object.entries(files).map(([name, relativePath]) => [name, path.join(rootDir, relativePath)]),
);

for (const [name, filePath] of Object.entries(absolute)) {
  if (!fs.existsSync(filePath)) failures.push(`${name} missing=${filePath}`);
  else console.log(`PASS | ${name} file exists`);
}

if (failures.length === 0) {
  const source = Object.fromEntries(
    Object.entries(absolute).map(([name, filePath]) => [name, fs.readFileSync(filePath, "utf8")]),
  );
  const packageJson = JSON.parse(source.packageManifest);

  [
    "export type ProductionIdentitySourceInputNormalizerInput",
    "export type ProductionIdentitySourceInputNormalizerResult",
    "export type ProductionIdentitySourceInputNormalizationReference",
    "GREGORIAN_DATE_TIME_WITH_LOCATION_CONTEXT",
    "FORMAL_IDENTITY_SOURCE_NORMALIZATION_REFERENCE",
    "BIRTH_LOCATION_CONTEXT_REFERENCE",
    "locationExcludedFromStarBeastDerivation: true",
    "locationExcludedFromMotherCodeDerivation: true",
    "noRawUserDataInResult: true",
    "noStarBeastCreation: true",
    "status: \"READY\"",
    "status: \"UNAVAILABLE\"",
    "status: \"BLOCKED\"",
  ].forEach((marker) => assertIncludes("P122 normalizer type", source.type, marker));

  [
    "export function normalizeProductionIdentitySourceInput",
    "resolveBirthCalendarFromGregorianDate",
    "GUANYAO_HOUR_BRANCH_ORDINALS",
    "DATE_REQUIRED",
    "TIME_REQUIRED",
    "INVALID_DATE",
    "INVALID_TIME",
    "INVALID_LOCATION_CONTEXT",
    "calendarResolution.status === \"CALENDAR_UNAVAILABLE\"",
  ].forEach((marker) => assertIncludes("P122 normalizer service", source.service, marker));

  [
    "resolveStarbeastFromBirthDate",
    "runMotherCodeLandingEngine",
    "resolveLifeArchetypeProfileFromMotherCode",
    "localStorage",
    "sessionStorage",
    "document.",
    "createPersonalStarBeast",
    "createRenderer",
  ].forEach((marker) => assertExcludes("P122 normalizer remains isolated", source.service, marker));

  [
    "RC-FORMAL-INPUT-NORMALIZER-ISOLATED-IMPLEMENTATION-P122",
    "FORMAL_IDENTITY_SOURCE_NORMALIZATION_READY",
    "NO_PRODUCT_INTEGRATION",
    "resolveBirthCalendarFromGregorianDate",
    "地点只输出无原文的上下文引用",
    "不参与星兽推导",
    "不参与母码推导",
    "写入 Storage",
  ].forEach((marker) => assertIncludes("P122 normalizer protocol", source.protocol, marker));

  [
    "ProductionIdentitySourceInputNormalizerInput",
    "ProductionIdentitySourceInputNormalizerResult",
    "ProductionIdentitySourceInputNormalizerBoundary",
    "from \"./productionIdentitySourceInputNormalizer\"",
  ].forEach((marker) => assertIncludes("P122 type index export", source.typeIndex, marker));

  assertIncludes(
    "P122 gate registered",
    packageJson.scripts?.["check:production-identity-source-input-normalizer-implementation"] ?? "",
    "node scripts/check-production-identity-source-input-normalizer-implementation.mjs",
  );
  assertIncludes(
    "P122 release gate registered",
    packageJson.scripts?.["postcheck:release"] ?? "",
    "npm run check:production-identity-source-input-normalizer-implementation",
  );

  const modulePath = path.join(
    os.tmpdir(),
    `guanyao-production-identity-source-input-normalizer-${process.pid}.mjs`,
  );
  await build({
    stdin: {
      contents: `
        export { normalizeProductionIdentitySourceInput } from "./src/services/productionIdentitySourceInputNormalizer.ts";
      `,
      resolveDir: rootDir,
      sourcefile: "production-identity-source-input-normalizer-gate-entry.ts",
      loader: "ts",
    },
    outfile: modulePath,
    bundle: true,
    platform: "node",
    format: "esm",
    target: "node20",
    logLevel: "silent",
  });

  const runtime = await import(`file://${modulePath}?t=${Date.now()}`);
  const baseDate = Object.freeze({ year: 1979, month: 3, day: 28 });
  const ready = runtime.normalizeProductionIdentitySourceInput(
    Object.freeze({
      gregorianBirthDate: baseDate,
      localBirthTime: "13:30",
      birthLocationContext: Object.freeze({ country: "CN", region: "Gansu", city: "Lanzhou" }),
    }),
  );
  assertEqual("valid input is ready", ready.status, "READY");
  if (ready.status === "READY") {
    assertEqual("normalized date is preserved", ready.normalizationReference.gregorianBirthDate, "1979-03-28");
    assertEqual("local time maps to 未时", ready.normalizationReference.hourBranch, "未时");
    assertEqual("hour branch ordinal is 8", ready.normalizationReference.hourBranchOrdinal, 8);
    assertEqual("location is context reference", ready.normalizationReference.locationContextReference?.contextPresent, true);
    assertEqual("location excluded from starbeast", ready.normalizationReference.locationExcludedFromStarBeastDerivation, true);
    assertEqual("location excluded from mother code", ready.normalizationReference.locationExcludedFromMotherCodeDerivation, true);
    assertEqual("raw location is absent from result", JSON.stringify(ready).includes("Lanzhou"), false);
    assertEqual("raw time is absent from result", JSON.stringify(ready).includes("13:30"), false);
    assertEqual("normalizer does not create starbeast", ready.boundary.noStarBeastCreation, true);
  }

  const sameBirthDifferentLocation = runtime.normalizeProductionIdentitySourceInput(
    Object.freeze({
      gregorianBirthDate: baseDate,
      localBirthTime: "13:30",
      birthLocationContext: Object.freeze({ country: "MY", region: "Selangor", city: "Kuala Lumpur" }),
    }),
  );
  assertEqual("different location input is ready", sameBirthDifferentLocation.status, "READY");
  if (ready.status === "READY" && sameBirthDifferentLocation.status === "READY") {
    assertEqual(
      "location does not change normalized date",
      sameBirthDifferentLocation.normalizationReference.gregorianBirthDate,
      ready.normalizationReference.gregorianBirthDate,
    );
    assertEqual(
      "location does not change hour branch",
      sameBirthDifferentLocation.normalizationReference.hourBranch,
      ready.normalizationReference.hourBranch,
    );
  }

  const missingDate = runtime.normalizeProductionIdentitySourceInput(
    Object.freeze({ gregorianBirthDate: null, localBirthTime: "13:30" }),
  );
  assertEqual("missing date is unavailable", missingDate.status, "UNAVAILABLE");
  assertEqual("missing date reason", missingDate.reason, "DATE_REQUIRED");

  const missingTime = runtime.normalizeProductionIdentitySourceInput(
    Object.freeze({ gregorianBirthDate: baseDate, localBirthTime: null }),
  );
  assertEqual("missing time is unavailable", missingTime.status, "UNAVAILABLE");
  assertEqual("missing time reason", missingTime.reason, "TIME_REQUIRED");

  const invalidDate = runtime.normalizeProductionIdentitySourceInput(
    Object.freeze({
      gregorianBirthDate: Object.freeze({ year: 1979, month: 2, day: 30 }),
      localBirthTime: "13:30",
    }),
  );
  assertEqual("invalid date is blocked", invalidDate.status, "BLOCKED");
  assertEqual("invalid date reason", invalidDate.reason, "INVALID_DATE");

  const invalidTime = runtime.normalizeProductionIdentitySourceInput(
    Object.freeze({ gregorianBirthDate: baseDate, localBirthTime: "25:00" }),
  );
  assertEqual("invalid time is blocked", invalidTime.status, "BLOCKED");
  assertEqual("invalid time reason", invalidTime.reason, "INVALID_TIME");

  const invalidLocation = runtime.normalizeProductionIdentitySourceInput(
    Object.freeze({
      gregorianBirthDate: baseDate,
      localBirthTime: "13:30",
      birthLocationContext: Object.freeze({ country: "", region: "", city: "" }),
    }),
  );
  assertEqual("invalid location context is blocked", invalidLocation.status, "BLOCKED");
  assertEqual("invalid location reason", invalidLocation.reason, "INVALID_LOCATION_CONTEXT");
}

if (failures.length > 0) {
  console.error("\nProduction Identity Source Input Normalizer Implementation gate failed:");
  failures.forEach((failure) => console.error(`- ${failure}`));
  process.exit(1);
}

console.log("\nProduction Identity Source Input Normalizer Implementation gate passed.");
