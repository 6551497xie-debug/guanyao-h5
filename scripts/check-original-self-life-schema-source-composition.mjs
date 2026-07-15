import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import process from "node:process";
import { build } from "esbuild";

const rootDir = process.cwd();
const entryPath = path.join(rootDir, "src/services/originalSelfLifeSchemaEntry.ts");
const motherSourcePath = path.join(rootDir, "src/services/motherCodeLifeArchetypeSource.ts");
const stageSourcePath = path.join(rootDir, "src/services/lifeJourneyStageSource.ts");
const mappingPath = path.join(rootDir, "src/services/originalSelfLifeSchemaMapping.ts");
const registryPath = path.join(rootDir, "src/data/guanyaoMotherCodeRegistry.ts");
const foundationTypePath = path.join(rootDir, "src/types/originalSelf.ts");
const protocolPath = path.join(
  rootDir,
  "docs/GUANYAO_ORIGINAL_SELF_LIFE_SCHEMA_SOURCE_COMPOSITION_PROTOCOL.md",
);
const packagePath = path.join(rootDir, "package.json");
const tempEntryModulePath = path.join(os.tmpdir(), `guanyao-life-schema-source-composition-${process.pid}.mjs`);
const tempRegistryModulePath = path.join(os.tmpdir(), `guanyao-life-schema-source-registry-${process.pid}.mjs`);

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
  ["life schema entry", entryPath],
  ["mother code source", motherSourcePath],
  ["life journey stage source", stageSourcePath],
  ["life schema mapping", mappingPath],
  ["mother code registry", registryPath],
  ["foundation type", foundationTypePath],
  ["source composition protocol", protocolPath],
  ["package manifest", packagePath],
]) {
  if (!fs.existsSync(filePath)) failures.push(`${name} file missing=${filePath}`);
  else console.log(`PASS | ${name} file exists`);
}

if (failures.length === 0) {
  const entrySource = fs.readFileSync(entryPath, "utf8");
  const foundationTypeSource = fs.readFileSync(foundationTypePath, "utf8");
  const protocolSource = fs.readFileSync(protocolPath, "utf8");
  const packageJson = JSON.parse(fs.readFileSync(packagePath, "utf8"));

  [
    "lifeJourneyStageSource: LifeJourneyStageSourceInput",
    "resolveLifeArchetypeProfileFromMotherCode(input.motherCodeProfile)",
    "resolveLifeJourneyStageSource(input.lifeJourneyStageSource)",
    'sourceBoundary: "mother_code"',
    'sourceBoundary: "life_journey_stage"',
    "export type OriginalSelfLifeSchemaEntryNotReadyReason",
    "sourceResults: Object.freeze({",
    "motherCode: motherCodeSourceResult",
    "lifeJourneyStage: lifeJourneyStageSourceResult",
    "lifeArchetypeProfile: motherCodeSourceResult.lifeArchetypeProfile",
    "lifeJourneyStage: lifeJourneyStageSourceResult.stageSource.currentStage",
    "mapOriginalSelfLifeSchemaToFoundation(",
  ].forEach((marker) => assertIncludes("dual source entry contract", entrySource, marker));

  const motherCallIndex = entrySource.indexOf(
    "resolveLifeArchetypeProfileFromMotherCode(input.motherCodeProfile)",
  );
  const stageCallIndex = entrySource.indexOf(
    "resolveLifeJourneyStageSource(input.lifeJourneyStageSource)",
  );
  const mappingCallIndex = entrySource.indexOf("mapOriginalSelfLifeSchemaToFoundation(");
  assertEqual("mother source resolves before stage source", motherCallIndex < stageCallIndex, true);
  assertEqual("stage source resolves before mapping", stageCallIndex < mappingCallIndex, true);

  [
    "fourSymbol",
    "StarBeast",
    "Gravity",
    "Dynamics",
    "localStorage",
    "sessionStorage",
    "fetch(",
    'from "react"',
  ].forEach((marker) => assertExcludes("dual source entry stays semantic-only", entrySource, marker));

  assertExcludes("foundation does not consume source composition", foundationTypeSource, "LifeSchemaSourceComposition");

  const typeScriptSourcePaths = collectTypeScriptSourcePaths(path.join(rootDir, "src"));
  const entryCallSites = typeScriptSourcePaths
    .filter((filePath) => fs.readFileSync(filePath, "utf8").includes("resolveOriginalSelfLifeSchemaFromSources"))
    .map((filePath) => path.relative(rootDir, filePath));
  assertEqual(
    "composed entry is only consumed by endpoint",
    entryCallSites.sort().join(","),
    [
      "src/services/originalSelfLifeSchemaEndpoint.ts",
      "src/services/originalSelfLifeSchemaEntry.ts",
    ].sort().join(","),
  );

  [
    "RC-ORIGINAL-SELF-LIFE-SCHEMA-SOURCE-COMPOSITION-P16",
    "P13 MotherCodeLifeArchetypeSourceResult",
    "P15 LifeJourneyStageSourceResult",
    "双 READY",
    "lifeJourneyStageSource: LifeJourneyStageSourceInput",
    "sourceBoundary",
    "MOTHER_CODE_TRIGRAM_MISSING",
    "MOTHER_CODE_LIFE_SEMANTICS_MISSING",
    "LIFE_JOURNEY_STAGE_MISSING",
    "LIFE_JOURNEY_STAGE_INVALID",
    "不得生成部分 Mapping",
    "P16 不修改 P0–P11 Foundation",
  ].forEach((marker) => assertIncludes("source composition protocol", protocolSource, marker));

  assertIncludes(
    "composition gate command is registered",
    packageJson.scripts?.["check:original-self-life-schema-source-composition"] ?? "",
    "node scripts/check-original-self-life-schema-source-composition.mjs",
  );
  assertIncludes(
    "composition gate participates in release",
    packageJson.scripts?.["check:release"] ?? "",
    "npm run check:original-self-life-schema-source-composition",
  );

  await Promise.all([
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
  const stageSourceInput = Object.freeze({
    source: "upper_schema_caller",
    lifeJourneyStage: "CHOICE",
  });
  const input = Object.freeze({
    motherCodeProfile,
    lifeJourneyStageSource: stageSourceInput,
    lifeArchetypeState,
    foundationJourneyPhase: "YAO",
  });
  const inputSnapshot = JSON.stringify(input);
  const ready = resolveOriginalSelfLifeSchemaFromSources(input);

  assertEqual("dual source entry is ready", ready.status, "READY");
  assertEqual("ready keeps mother source", ready.sourceResults?.motherCode.motherCodeProfile === motherCodeProfile, true);
  assertEqual("ready keeps stage source", ready.sourceResults?.lifeJourneyStage.input === stageSourceInput, true);
  assertEqual("mapping profile comes from mother source", ready.mapping?.schema.lifeArchetypeProfile === ready.sourceResults?.motherCode.lifeArchetypeProfile, true);
  assertEqual("mapping stage comes from stage source", ready.mapping?.schema.journey.currentStage, "CHOICE");
  assertEqual("mapping keeps foundation state", ready.mapping?.foundation.lifeArchetypeState === lifeArchetypeState, true);
  assertEqual("ready source results are frozen", Object.isFrozen(ready.sourceResults), true);
  assertEqual("ready result is frozen", Object.isFrozen(ready), true);
  assertEqual("entry does not mutate input", JSON.stringify(input), inputSnapshot);

  const cases = [
    {
      name: "missing mother trigram",
      input: {
        ...input,
        motherCodeProfile: Object.freeze({ ...motherCodeProfile, lowerTrigram: undefined }),
      },
      boundary: "mother_code",
      reason: "MOTHER_CODE_TRIGRAM_MISSING",
    },
    {
      name: "missing mother semantics",
      input: {
        ...input,
        motherCodeProfile: Object.freeze({ ...motherCodeProfile, personalityAsset: undefined }),
      },
      boundary: "mother_code",
      reason: "MOTHER_CODE_LIFE_SEMANTICS_MISSING",
    },
    {
      name: "missing journey stage",
      input: {
        ...input,
        lifeJourneyStageSource: Object.freeze({ source: "upper_schema_caller" }),
      },
      boundary: "life_journey_stage",
      reason: "LIFE_JOURNEY_STAGE_MISSING",
    },
    {
      name: "invalid journey stage",
      input: {
        ...input,
        lifeJourneyStageSource: Object.freeze({
          source: "upper_schema_caller",
          lifeJourneyStage: "HEXAGRAM",
        }),
      },
      boundary: "life_journey_stage",
      reason: "LIFE_JOURNEY_STAGE_INVALID",
    },
  ];

  for (const testCase of cases) {
    const result = resolveOriginalSelfLifeSchemaFromSources(testCase.input);
    assertEqual(`${testCase.name} is not ready`, result.status, "NOT_READY");
    assertEqual(`${testCase.name} preserves boundary`, result.sourceBoundary, testCase.boundary);
    assertEqual(`${testCase.name} preserves reason`, result.reason, testCase.reason);
    assertEqual(`${testCase.name} preserves source result reason`, result.sourceResult?.reason, testCase.reason);
    assertEqual(`${testCase.name} creates no partial mapping`, "mapping" in result, false);
    assertEqual(`${testCase.name} result is frozen`, Object.isFrozen(result), true);
  }

  const motherPriority = resolveOriginalSelfLifeSchemaFromSources({
    ...input,
    motherCodeProfile: Object.freeze({ ...motherCodeProfile, lowerTrigram: undefined }),
    lifeJourneyStageSource: Object.freeze({
      source: "upper_schema_caller",
      lifeJourneyStage: "HEXAGRAM",
    }),
  });
  assertEqual("mother source keeps composition priority", motherPriority.sourceBoundary, "mother_code");
  assertEqual("mother priority preserves mother reason", motherPriority.reason, "MOTHER_CODE_TRIGRAM_MISSING");
}

fs.rmSync(tempEntryModulePath, { force: true });
fs.rmSync(tempRegistryModulePath, { force: true });

if (failures.length > 0) {
  console.error("\n[ORIGINAL SELF LIFE SCHEMA SOURCE COMPOSITION] FAIL");
  failures.forEach((failure) => console.error(`- ${failure}`));
  process.exit(1);
}

console.log("\n[ORIGINAL SELF LIFE SCHEMA SOURCE COMPOSITION] PASS");
