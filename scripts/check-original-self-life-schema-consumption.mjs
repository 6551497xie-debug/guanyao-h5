import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import process from "node:process";
import { build } from "esbuild";

const rootDir = process.cwd();
const consumptionPath = path.join(
  rootDir,
  "src/services/originalSelfLifeSchemaResultConsumption.ts",
);
const entryPath = path.join(rootDir, "src/services/originalSelfLifeSchemaEntry.ts");
const mappingPath = path.join(rootDir, "src/services/originalSelfLifeSchemaMapping.ts");
const motherSourcePath = path.join(rootDir, "src/services/motherCodeLifeArchetypeSource.ts");
const stageSourcePath = path.join(rootDir, "src/services/lifeJourneyStageSource.ts");
const registryPath = path.join(rootDir, "src/data/guanyaoMotherCodeRegistry.ts");
const foundationTypePath = path.join(rootDir, "src/types/originalSelf.ts");
const protocolPath = path.join(
  rootDir,
  "docs/GUANYAO_ORIGINAL_SELF_LIFE_SCHEMA_CONSUMPTION_PROTOCOL.md",
);
const packagePath = path.join(rootDir, "package.json");
const tempConsumptionModulePath = path.join(
  os.tmpdir(),
  `guanyao-life-schema-consumption-${process.pid}.mjs`,
);
const tempEntryModulePath = path.join(os.tmpdir(), `guanyao-life-schema-entry-${process.pid}.mjs`);
const tempRegistryModulePath = path.join(os.tmpdir(), `guanyao-life-schema-registry-${process.pid}.mjs`);

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
  if (actual !== expected) failures.push(`${name} expected=${expected} actual=${actual}`);
  else console.log(`PASS | ${name} | expected=${expected} | actual=${actual}`);
};

const collectTypeScriptSourcePaths = (directoryPath) =>
  fs.readdirSync(directoryPath, { withFileTypes: true }).flatMap((entry) => {
    const entryPath = path.join(directoryPath, entry.name);
    if (entry.isDirectory()) return collectTypeScriptSourcePaths(entryPath);
    return /\.tsx?$/.test(entry.name) ? [entryPath] : [];
  });

for (const [name, filePath] of [
  ["life schema consumption", consumptionPath],
  ["life schema entry", entryPath],
  ["life schema mapping", mappingPath],
  ["mother code source", motherSourcePath],
  ["life journey stage source", stageSourcePath],
  ["mother code registry", registryPath],
  ["foundation type", foundationTypePath],
  ["consumption protocol", protocolPath],
  ["package manifest", packagePath],
]) {
  if (!fs.existsSync(filePath)) failures.push(`${name} file missing=${filePath}`);
  else console.log(`PASS | ${name} file exists`);
}

if (failures.length === 0) {
  const consumptionSource = fs.readFileSync(consumptionPath, "utf8");
  const foundationTypeSource = fs.readFileSync(foundationTypePath, "utf8");
  const protocolSource = fs.readFileSync(protocolPath, "utf8");
  const packageJson = JSON.parse(fs.readFileSync(packagePath, "utf8"));

  [
    "export type OriginalSelfLifeSchemaAvailable",
    "export type OriginalSelfLifeSchemaUnavailable",
    "export type OriginalSelfLifeSchemaConsumption",
    "export function consumeOriginalSelfLifeSchemaResult",
    "result: OriginalSelfLifeSchemaEntryResult",
    'status: "AVAILABLE"',
    'status: "UNAVAILABLE"',
    'source: "original_self_life_schema_consumption"',
    "mapping: result.mapping",
    "sourceBoundary: result.sourceBoundary",
    "reason: result.reason",
    "sourceResult: result.sourceResult",
  ].forEach((marker) => assertIncludes("life schema consumption contract", consumptionSource, marker));

  [
    "resolveOriginalSelfLifeSchemaFromSources(",
    "resolveLifeArchetypeProfileFromMotherCode(",
    "resolveLifeJourneyStageSource(",
    "mapOriginalSelfLifeSchemaToFoundation(",
    "fourSymbol",
    "Gravity",
    "Dynamics",
    "localStorage",
    "sessionStorage",
    "fetch(",
    'from "react"',
  ].forEach((marker) => assertExcludes("consumption stays result-only", consumptionSource, marker));

  assertExcludes("foundation does not consume life schema consumption", foundationTypeSource, "OriginalSelfLifeSchemaConsumption");

  const consumptionCallSites = collectTypeScriptSourcePaths(path.join(rootDir, "src"))
    .filter((filePath) => fs.readFileSync(filePath, "utf8").includes("consumeOriginalSelfLifeSchemaResult"))
    .map((filePath) => path.relative(rootDir, filePath));
  assertEqual(
    "consumption is only consumed by endpoint",
    consumptionCallSites.sort().join(","),
    [
      "src/services/originalSelfLifeSchemaEndpoint.ts",
      "src/services/originalSelfLifeSchemaResultConsumption.ts",
    ].sort().join(","),
  );

  [
    "RC-ORIGINAL-SELF-LIFE-SCHEMA-CONSUMPTION-P17",
    "OriginalSelfLifeSchemaEntryResult",
    "AVAILABLE + OriginalSelfLifeSchemaMapping",
    "UNAVAILABLE + sourceBoundary + reason + sourceResult",
    "MOTHER_CODE_TRIGRAM_MISSING",
    "MOTHER_CODE_LIFE_SEMANTICS_MISSING",
    "LIFE_JOURNEY_STAGE_MISSING",
    "LIFE_JOURNEY_STAGE_INVALID",
    "不提供默认阶段",
    "不调用 P14/P16 Entry Resolver",
    "本刀不新增 Endpoint",
  ].forEach((marker) => assertIncludes("life schema consumption protocol", protocolSource, marker));

  assertIncludes(
    "consumption gate command is registered",
    packageJson.scripts?.["check:original-self-life-schema-consumption"] ?? "",
    "node scripts/check-original-self-life-schema-consumption.mjs",
  );
  assertIncludes(
    "consumption gate participates in release",
    packageJson.scripts?.["check:release"] ?? "",
    "npm run check:original-self-life-schema-consumption",
  );

  await Promise.all([
    build({
      entryPoints: [consumptionPath],
      outfile: tempConsumptionModulePath,
      bundle: true,
      platform: "node",
      format: "esm",
      target: "node20",
      logLevel: "silent",
    }),
    build({
      entryPoints: [entryPath],
      outfile: tempEntryModulePath,
      bundle: true,
      platform: "node",
      format: "esm",
      target: "node20",
      logLevel: "silent",
    }),
    build({
      entryPoints: [registryPath],
      outfile: tempRegistryModulePath,
      bundle: true,
      platform: "node",
      format: "esm",
      target: "node20",
      logLevel: "silent",
    }),
  ]);

  const { consumeOriginalSelfLifeSchemaResult } = await import(
    `file://${tempConsumptionModulePath}?t=${Date.now()}`
  );
  const { resolveOriginalSelfLifeSchemaFromSources } = await import(
    `file://${tempEntryModulePath}?t=${Date.now()}`
  );
  const { guanyaoMotherCodeRegistry, toMotherCodeProfile } = await import(
    `file://${tempRegistryModulePath}?t=${Date.now()}`
  );

  const motherCodeProfile = toMotherCodeProfile(guanyaoMotherCodeRegistry[0]);
  const lifeArchetypeState = Object.freeze({
    source: "starBeast",
    semanticRole: "LIFE_ARCHETYPE",
    fourSymbol: "青龙",
    stableOrigin: true,
    nonFinalIdentity: true,
  });
  const readyEntry = resolveOriginalSelfLifeSchemaFromSources({
    motherCodeProfile,
    lifeJourneyStageSource: Object.freeze({
      source: "upper_schema_caller",
      lifeJourneyStage: "CRYSTAL",
    }),
    lifeArchetypeState,
    foundationJourneyPhase: "CRYSTAL",
  });
  const readySnapshot = JSON.stringify(readyEntry);
  const available = consumeOriginalSelfLifeSchemaResult(readyEntry);

  assertEqual("ready entry becomes available", available.status, "AVAILABLE");
  assertEqual("available identifies consumption source", available.source, "original_self_life_schema_consumption");
  assertEqual("available preserves entry result", available.result === readyEntry, true);
  assertEqual("available preserves mapping", available.mapping === readyEntry.mapping, true);
  assertEqual("available preserves profile", available.mapping?.schema.lifeArchetypeProfile.code, "QIAN");
  assertEqual("available preserves stage", available.mapping?.schema.journey.currentStage, "CRYSTAL");
  assertEqual("available is frozen", Object.isFrozen(available), true);
  assertEqual("consumption does not mutate ready result", JSON.stringify(readyEntry), readySnapshot);

  const cases = [
    {
      name: "missing mother trigram",
      result: resolveOriginalSelfLifeSchemaFromSources({
        motherCodeProfile: Object.freeze({ ...motherCodeProfile, lowerTrigram: undefined }),
        lifeJourneyStageSource: Object.freeze({
          source: "upper_schema_caller",
          lifeJourneyStage: "ORIGIN",
        }),
        lifeArchetypeState,
        foundationJourneyPhase: "ORIGINAL_SELF",
      }),
      boundary: "mother_code",
      reason: "MOTHER_CODE_TRIGRAM_MISSING",
    },
    {
      name: "missing mother semantics",
      result: resolveOriginalSelfLifeSchemaFromSources({
        motherCodeProfile: Object.freeze({ ...motherCodeProfile, unlockPotential: undefined }),
        lifeJourneyStageSource: Object.freeze({
          source: "upper_schema_caller",
          lifeJourneyStage: "AWAKENING",
        }),
        lifeArchetypeState,
        foundationJourneyPhase: "LIFE_ARCHETYPE",
      }),
      boundary: "mother_code",
      reason: "MOTHER_CODE_LIFE_SEMANTICS_MISSING",
    },
    {
      name: "missing journey stage",
      result: resolveOriginalSelfLifeSchemaFromSources({
        motherCodeProfile,
        lifeJourneyStageSource: Object.freeze({ source: "upper_schema_caller" }),
        lifeArchetypeState,
        foundationJourneyPhase: "HEXAGRAM",
      }),
      boundary: "life_journey_stage",
      reason: "LIFE_JOURNEY_STAGE_MISSING",
    },
    {
      name: "invalid journey stage",
      result: resolveOriginalSelfLifeSchemaFromSources({
        motherCodeProfile,
        lifeJourneyStageSource: Object.freeze({
          source: "upper_schema_caller",
          lifeJourneyStage: "HEXAGRAM",
        }),
        lifeArchetypeState,
        foundationJourneyPhase: "YAO",
      }),
      boundary: "life_journey_stage",
      reason: "LIFE_JOURNEY_STAGE_INVALID",
    },
  ];

  for (const testCase of cases) {
    const snapshot = JSON.stringify(testCase.result);
    const unavailable = consumeOriginalSelfLifeSchemaResult(testCase.result);
    assertEqual(`${testCase.name} becomes unavailable`, unavailable.status, "UNAVAILABLE");
    assertEqual(`${testCase.name} preserves entry result`, unavailable.result === testCase.result, true);
    assertEqual(`${testCase.name} preserves boundary`, unavailable.sourceBoundary, testCase.boundary);
    assertEqual(`${testCase.name} preserves reason`, unavailable.reason, testCase.reason);
    assertEqual(`${testCase.name} preserves source result`, unavailable.sourceResult === testCase.result.sourceResult, true);
    assertEqual(`${testCase.name} exposes no mapping`, "mapping" in unavailable, false);
    assertEqual(`${testCase.name} consumption is frozen`, Object.isFrozen(unavailable), true);
    assertEqual(`${testCase.name} result is not mutated`, JSON.stringify(testCase.result), snapshot);
  }
}

fs.rmSync(tempConsumptionModulePath, { force: true });
fs.rmSync(tempEntryModulePath, { force: true });
fs.rmSync(tempRegistryModulePath, { force: true });

if (failures.length > 0) {
  console.error("\n[ORIGINAL SELF LIFE SCHEMA CONSUMPTION] FAIL");
  failures.forEach((failure) => console.error(`- ${failure}`));
  process.exit(1);
}

console.log("\n[ORIGINAL SELF LIFE SCHEMA CONSUMPTION] PASS");
