import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import process from "node:process";
import { build } from "esbuild";

const rootDir = process.cwd();
const readinessPath = path.join(rootDir, "src/services/originalSelfLifeSchemaReadiness.ts");
const endpointPath = path.join(rootDir, "src/services/originalSelfLifeSchemaEndpoint.ts");
const entryPath = path.join(rootDir, "src/services/originalSelfLifeSchemaEntry.ts");
const consumptionPath = path.join(
  rootDir,
  "src/services/originalSelfLifeSchemaResultConsumption.ts",
);
const registryPath = path.join(rootDir, "src/data/guanyaoMotherCodeRegistry.ts");
const foundationTypePath = path.join(rootDir, "src/types/originalSelf.ts");
const protocolPath = path.join(
  rootDir,
  "docs/GUANYAO_ORIGINAL_SELF_LIFE_SCHEMA_READINESS_PROTOCOL.md",
);
const packagePath = path.join(rootDir, "package.json");
const tempReadinessModulePath = path.join(os.tmpdir(), `guanyao-life-schema-readiness-${process.pid}.mjs`);
const tempRegistryModulePath = path.join(os.tmpdir(), `guanyao-life-schema-readiness-registry-${process.pid}.mjs`);

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
  ["life schema readiness", readinessPath],
  ["life schema endpoint", endpointPath],
  ["life schema entry", entryPath],
  ["life schema consumption", consumptionPath],
  ["mother code registry", registryPath],
  ["foundation type", foundationTypePath],
  ["readiness protocol", protocolPath],
  ["package manifest", packagePath],
]) {
  if (!fs.existsSync(filePath)) failures.push(`${name} file missing=${filePath}`);
  else console.log(`PASS | ${name} file exists`);
}

if (failures.length === 0) {
  const readinessSource = fs.readFileSync(readinessPath, "utf8");
  const foundationTypeSource = fs.readFileSync(foundationTypePath, "utf8");
  const protocolSource = fs.readFileSync(protocolPath, "utf8");
  const packageJson = JSON.parse(fs.readFileSync(packagePath, "utf8"));

  [
    "export type OriginalSelfLifeSchemaReadinessInput",
    "motherCodeProfile: MotherCodeProfile | null",
    "lifeJourneyStageSource: LifeJourneyStageSourceInput | null",
    "lifeArchetypeState: LifeArchetypeState | null",
    "foundationJourneyPhase: OriginalSelfJourneyPhase | null",
    "export type OriginalSelfLifeSchemaReadinessNotReadyReason",
    "export type OriginalSelfLifeSchemaReadiness",
    "export function resolveOriginalSelfLifeSchemaReadiness",
    'readiness: "READY_FOR_ORIGINAL_SELF_LIFE_SCHEMA"',
    '"MOTHER_CODE_PROFILE_MISSING"',
    '"LIFE_JOURNEY_STAGE_SOURCE_MISSING"',
    '"LIFE_ARCHETYPE_STATE_MISSING"',
    '"FOUNDATION_JOURNEY_PHASE_MISSING"',
    "const endpointInput: OriginalSelfLifeSchemaEndpointInput = Object.freeze({",
    "consumption: resolveOriginalSelfLifeSchemaConsumption(endpointInput)",
  ].forEach((marker) => assertIncludes("life schema readiness contract", readinessSource, marker));

  [
    "resolveLifeArchetypeProfileFromMotherCode(",
    "resolveLifeJourneyStageSource(",
    "mapOriginalSelfLifeSchemaToFoundation(",
    "fourSymbol",
    "Gravity",
    "Dynamics",
    "CrystalState",
    "localStorage",
    "sessionStorage",
    "fetch(",
    'from "react"',
  ].forEach((marker) => assertExcludes("readiness stays presence-only", readinessSource, marker));

  assertExcludes("foundation does not consume life schema readiness", foundationTypeSource, "OriginalSelfLifeSchemaReadiness");

  const typeScriptSourcePaths = collectTypeScriptSourcePaths(path.join(rootDir, "src"));
  const readinessCallSites = typeScriptSourcePaths
    .filter((filePath) => fs.readFileSync(filePath, "utf8").includes("resolveOriginalSelfLifeSchemaReadiness"))
    .map((filePath) => path.relative(rootDir, filePath));
  assertEqual(
    "readiness has no runtime or UI consumer",
    readinessCallSites.join(","),
    "src/services/originalSelfLifeSchemaReadiness.ts",
  );

  const endpointCallSites = typeScriptSourcePaths
    .filter((filePath) => fs.readFileSync(filePath, "utf8").includes("resolveOriginalSelfLifeSchemaConsumption"))
    .map((filePath) => path.relative(rootDir, filePath))
    .sort();
  assertEqual(
    "endpoint is only consumed by readiness",
    endpointCallSites.join(","),
    [
      "src/services/originalSelfLifeSchemaEndpoint.ts",
      "src/services/originalSelfLifeSchemaReadiness.ts",
    ].sort().join(","),
  );

  [
    "RC-ORIGINAL-SELF-LIFE-SCHEMA-READINESS-P19",
    "MOTHER_CODE_PROFILE_MISSING",
    "LIFE_JOURNEY_STAGE_SOURCE_MISSING",
    "LIFE_ARCHETYPE_STATE_MISSING",
    "FOUNDATION_JOURNEY_PHASE_MISSING",
    "READY_FOR_ORIGINAL_SELF_LIFE_SCHEMA",
    "READY 只代表输入已经具备",
    "输入已存在但内容未就绪",
    "不建立第二套母码或阶段校验规则",
    "本刀不接 Dynamics",
  ].forEach((marker) => assertIncludes("life schema readiness protocol", protocolSource, marker));

  assertIncludes(
    "readiness gate command is registered",
    packageJson.scripts?.["check:original-self-life-schema-readiness"] ?? "",
    "node scripts/check-original-self-life-schema-readiness.mjs",
  );
  assertIncludes(
    "readiness gate participates in release",
    packageJson.scripts?.["check:release"] ?? "",
    "npm run check:original-self-life-schema-readiness",
  );

  await Promise.all([
    build({
      entryPoints: [readinessPath],
      outfile: tempReadinessModulePath,
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

  const { resolveOriginalSelfLifeSchemaReadiness } = await import(
    `file://${tempReadinessModulePath}?t=${Date.now()}`
  );
  const { guanyaoMotherCodeRegistry, toMotherCodeProfile } = await import(
    `file://${tempRegistryModulePath}?t=${Date.now()}`
  );

  const motherCodeProfile = toMotherCodeProfile(guanyaoMotherCodeRegistry[0]);
  const lifeJourneyStageSource = Object.freeze({
    source: "upper_schema_caller",
    lifeJourneyStage: "REALITY",
  });
  const lifeArchetypeState = Object.freeze({
    source: "starBeast",
    semanticRole: "LIFE_ARCHETYPE",
    fourSymbol: "青龙",
    stableOrigin: true,
    nonFinalIdentity: true,
  });
  const completeInput = Object.freeze({
    motherCodeProfile,
    lifeJourneyStageSource,
    lifeArchetypeState,
    foundationJourneyPhase: "LIFE_ARCHETYPE",
  });
  const completeSnapshot = JSON.stringify(completeInput);
  const ready = resolveOriginalSelfLifeSchemaReadiness(completeInput);

  assertEqual("complete input is ready", ready.status, "READY");
  assertEqual("complete input exposes readiness marker", ready.readiness, "READY_FOR_ORIGINAL_SELF_LIFE_SCHEMA");
  assertEqual("ready preserves input", ready.input === completeInput, true);
  assertEqual("ready preserves mother reference", ready.endpointInput?.motherCodeProfile === motherCodeProfile, true);
  assertEqual("ready preserves stage source reference", ready.endpointInput?.lifeJourneyStageSource === lifeJourneyStageSource, true);
  assertEqual("ready preserves life archetype state", ready.endpointInput?.lifeArchetypeState === lifeArchetypeState, true);
  assertEqual("ready delegates to available endpoint", ready.consumption?.status, "AVAILABLE");
  assertEqual("ready preserves explicit stage", ready.consumption?.mapping.schema.journey.currentStage, "REALITY");
  assertEqual("ready endpoint input is frozen", Object.isFrozen(ready.endpointInput), true);
  assertEqual("ready result is frozen", Object.isFrozen(ready), true);
  assertEqual("readiness does not mutate complete input", JSON.stringify(completeInput), completeSnapshot);

  const missingCases = [
    {
      name: "mother code profile",
      input: Object.freeze({ ...completeInput, motherCodeProfile: null }),
      reason: "MOTHER_CODE_PROFILE_MISSING",
    },
    {
      name: "life journey stage source",
      input: Object.freeze({ ...completeInput, lifeJourneyStageSource: null }),
      reason: "LIFE_JOURNEY_STAGE_SOURCE_MISSING",
    },
    {
      name: "life archetype state",
      input: Object.freeze({ ...completeInput, lifeArchetypeState: null }),
      reason: "LIFE_ARCHETYPE_STATE_MISSING",
    },
    {
      name: "foundation journey phase",
      input: Object.freeze({ ...completeInput, foundationJourneyPhase: null }),
      reason: "FOUNDATION_JOURNEY_PHASE_MISSING",
    },
  ];

  for (const testCase of missingCases) {
    const result = resolveOriginalSelfLifeSchemaReadiness(testCase.input);
    assertEqual(`missing ${testCase.name} is not ready`, result.status, "NOT_READY");
    assertEqual(`missing ${testCase.name} readiness`, result.readiness, "NOT_READY");
    assertEqual(`missing ${testCase.name} reason`, result.reason, testCase.reason);
    assertEqual(`missing ${testCase.name} preserves input`, result.input === testCase.input, true);
    assertEqual(`missing ${testCase.name} does not delegate`, "consumption" in result, false);
    assertEqual(`missing ${testCase.name} result is frozen`, Object.isFrozen(result), true);
  }

  const incompleteMother = resolveOriginalSelfLifeSchemaReadiness(
    Object.freeze({
      ...completeInput,
      motherCodeProfile: Object.freeze({ ...motherCodeProfile, lowerTrigram: undefined }),
    }),
  );
  assertEqual("present incomplete mother is readiness-ready", incompleteMother.status, "READY");
  assertEqual("incomplete mother delegates unavailable", incompleteMother.consumption?.status, "UNAVAILABLE");
  assertEqual("incomplete mother preserves boundary", incompleteMother.consumption?.sourceBoundary, "mother_code");
  assertEqual("incomplete mother preserves source reason", incompleteMother.consumption?.reason, "MOTHER_CODE_TRIGRAM_MISSING");

  const missingStageValue = resolveOriginalSelfLifeSchemaReadiness(
    Object.freeze({
      ...completeInput,
      lifeJourneyStageSource: Object.freeze({ source: "upper_schema_caller" }),
    }),
  );
  assertEqual("present source without stage is readiness-ready", missingStageValue.status, "READY");
  assertEqual("missing stage value delegates unavailable", missingStageValue.consumption?.status, "UNAVAILABLE");
  assertEqual("missing stage value preserves boundary", missingStageValue.consumption?.sourceBoundary, "life_journey_stage");
  assertEqual("missing stage value preserves source reason", missingStageValue.consumption?.reason, "LIFE_JOURNEY_STAGE_MISSING");
}

fs.rmSync(tempReadinessModulePath, { force: true });
fs.rmSync(tempRegistryModulePath, { force: true });

if (failures.length > 0) {
  console.error("\n[ORIGINAL SELF LIFE SCHEMA READINESS] FAIL");
  failures.forEach((failure) => console.error(`- ${failure}`));
  process.exit(1);
}

console.log("\n[ORIGINAL SELF LIFE SCHEMA READINESS] PASS");
