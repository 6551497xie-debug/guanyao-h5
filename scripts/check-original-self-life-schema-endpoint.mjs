import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import process from "node:process";
import { build } from "esbuild";

const rootDir = process.cwd();
const endpointPath = path.join(rootDir, "src/services/originalSelfLifeSchemaEndpoint.ts");
const entryPath = path.join(rootDir, "src/services/originalSelfLifeSchemaEntry.ts");
const consumptionPath = path.join(
  rootDir,
  "src/services/originalSelfLifeSchemaResultConsumption.ts",
);
const mappingPath = path.join(rootDir, "src/services/originalSelfLifeSchemaMapping.ts");
const registryPath = path.join(rootDir, "src/data/guanyaoMotherCodeRegistry.ts");
const foundationTypePath = path.join(rootDir, "src/types/originalSelf.ts");
const protocolPath = path.join(
  rootDir,
  "docs/GUANYAO_ORIGINAL_SELF_LIFE_SCHEMA_ENDPOINT_PROTOCOL.md",
);
const packagePath = path.join(rootDir, "package.json");
const tempEndpointModulePath = path.join(os.tmpdir(), `guanyao-life-schema-endpoint-${process.pid}.mjs`);
const tempRegistryModulePath = path.join(os.tmpdir(), `guanyao-life-schema-endpoint-registry-${process.pid}.mjs`);

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
  ["life schema endpoint", endpointPath],
  ["life schema entry", entryPath],
  ["life schema consumption", consumptionPath],
  ["life schema mapping", mappingPath],
  ["mother code registry", registryPath],
  ["foundation type", foundationTypePath],
  ["endpoint protocol", protocolPath],
  ["package manifest", packagePath],
]) {
  if (!fs.existsSync(filePath)) failures.push(`${name} file missing=${filePath}`);
  else console.log(`PASS | ${name} file exists`);
}

if (failures.length === 0) {
  const endpointSource = fs.readFileSync(endpointPath, "utf8");
  const foundationTypeSource = fs.readFileSync(foundationTypePath, "utf8");
  const protocolSource = fs.readFileSync(protocolPath, "utf8");
  const packageJson = JSON.parse(fs.readFileSync(packagePath, "utf8"));

  [
    'export type { OriginalSelfLifeSchemaConsumption } from "./originalSelfLifeSchemaResultConsumption"',
    "export type OriginalSelfLifeSchemaEndpointInput = OriginalSelfLifeSchemaEntryInput",
    "export function resolveOriginalSelfLifeSchemaConsumption",
    "input: OriginalSelfLifeSchemaEndpointInput",
    "): OriginalSelfLifeSchemaConsumption",
    "consumeOriginalSelfLifeSchemaResult(resolveOriginalSelfLifeSchemaFromSources(input))",
  ].forEach((marker) => assertIncludes("life schema endpoint contract", endpointSource, marker));

  [
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
    "if (",
    "switch (",
  ].forEach((marker) => assertExcludes("endpoint stays composition-only", endpointSource, marker));

  assertExcludes("foundation does not consume life schema endpoint", foundationTypeSource, "OriginalSelfLifeSchemaEndpoint");

  const typeScriptSourcePaths = collectTypeScriptSourcePaths(path.join(rootDir, "src"));
  const endpointCallSites = typeScriptSourcePaths
    .filter((filePath) => fs.readFileSync(filePath, "utf8").includes("resolveOriginalSelfLifeSchemaConsumption"))
    .map((filePath) => path.relative(rootDir, filePath));
  assertEqual(
    "endpoint is only consumed by readiness",
    endpointCallSites.sort().join(","),
    [
      "src/services/originalSelfLifeSchemaEndpoint.ts",
      "src/services/originalSelfLifeSchemaReadiness.ts",
    ].sort().join(","),
  );

  const entryCallSites = typeScriptSourcePaths
    .filter((filePath) => fs.readFileSync(filePath, "utf8").includes("resolveOriginalSelfLifeSchemaFromSources"))
    .map((filePath) => path.relative(rootDir, filePath))
    .sort();
  assertEqual(
    "entry is only consumed by endpoint",
    entryCallSites.join(","),
    [
      "src/services/originalSelfLifeSchemaEndpoint.ts",
      "src/services/originalSelfLifeSchemaEntry.ts",
    ].sort().join(","),
  );

  const consumptionCallSites = typeScriptSourcePaths
    .filter((filePath) => fs.readFileSync(filePath, "utf8").includes("consumeOriginalSelfLifeSchemaResult"))
    .map((filePath) => path.relative(rootDir, filePath))
    .sort();
  assertEqual(
    "consumption is only consumed by endpoint",
    consumptionCallSites.join(","),
    [
      "src/services/originalSelfLifeSchemaEndpoint.ts",
      "src/services/originalSelfLifeSchemaResultConsumption.ts",
    ].sort().join(","),
  );

  [
    "RC-ORIGINAL-SELF-LIFE-SCHEMA-ENDPOINT-P18",
    "resolveOriginalSelfLifeSchemaFromSources",
    "consumeOriginalSelfLifeSchemaResult",
    "OriginalSelfLifeSchemaConsumption",
    "LifeJourneyStageSourceInput",
    "MOTHER_CODE_TRIGRAM_MISSING",
    "MOTHER_CODE_LIFE_SEMANTICS_MISSING",
    "LIFE_JOURNEY_STAGE_MISSING",
    "LIFE_JOURNEY_STAGE_INVALID",
    "不允许增加默认值",
    "P18 不修改",
  ].forEach((marker) => assertIncludes("life schema endpoint protocol", protocolSource, marker));

  assertIncludes(
    "endpoint gate command is registered",
    packageJson.scripts?.["check:original-self-life-schema-endpoint"] ?? "",
    "node scripts/check-original-self-life-schema-endpoint.mjs",
  );
  assertIncludes(
    "endpoint gate participates in release",
    packageJson.scripts?.["check:release"] ?? "",
    "npm run check:original-self-life-schema-endpoint",
  );

  await Promise.all([
    build({
      entryPoints: [endpointPath],
      outfile: tempEndpointModulePath,
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

  const { resolveOriginalSelfLifeSchemaConsumption } = await import(
    `file://${tempEndpointModulePath}?t=${Date.now()}`
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
  const input = Object.freeze({
    motherCodeProfile,
    lifeJourneyStageSource: Object.freeze({
      source: "upper_schema_caller",
      lifeJourneyStage: "CHOICE",
    }),
    lifeArchetypeState,
    foundationJourneyPhase: "YAO",
  });
  const inputSnapshot = JSON.stringify(input);
  const available = resolveOriginalSelfLifeSchemaConsumption(input);

  assertEqual("endpoint exposes available consumption", available.status, "AVAILABLE");
  assertEqual("endpoint preserves consumption source", available.source, "original_self_life_schema_consumption");
  assertEqual("endpoint preserves mother profile", available.mapping?.schema.lifeArchetypeProfile.code, "QIAN");
  assertEqual("endpoint preserves explicit stage", available.mapping?.schema.journey.currentStage, "CHOICE");
  assertEqual("endpoint preserves foundation state", available.mapping?.foundation.lifeArchetypeState === lifeArchetypeState, true);
  assertEqual("endpoint returns frozen consumption", Object.isFrozen(available), true);
  assertEqual("endpoint does not mutate input", JSON.stringify(input), inputSnapshot);

  const missingMother = resolveOriginalSelfLifeSchemaConsumption({
    ...input,
    motherCodeProfile: Object.freeze({ ...motherCodeProfile, lowerTrigram: undefined }),
  });
  assertEqual("endpoint exposes missing mother as unavailable", missingMother.status, "UNAVAILABLE");
  assertEqual("endpoint preserves mother boundary", missingMother.sourceBoundary, "mother_code");
  assertEqual("endpoint preserves mother reason", missingMother.reason, "MOTHER_CODE_TRIGRAM_MISSING");
  assertEqual("endpoint preserves mother source result", missingMother.sourceResult === missingMother.result.sourceResult, true);
  assertEqual("endpoint exposes no mapping for missing mother", "mapping" in missingMother, false);

  const missingStage = resolveOriginalSelfLifeSchemaConsumption({
    ...input,
    lifeJourneyStageSource: Object.freeze({ source: "upper_schema_caller" }),
  });
  assertEqual("endpoint exposes missing stage as unavailable", missingStage.status, "UNAVAILABLE");
  assertEqual("endpoint preserves stage boundary", missingStage.sourceBoundary, "life_journey_stage");
  assertEqual("endpoint preserves stage reason", missingStage.reason, "LIFE_JOURNEY_STAGE_MISSING");
  assertEqual("endpoint preserves stage source result", missingStage.sourceResult === missingStage.result.sourceResult, true);
  assertEqual("endpoint exposes no mapping for missing stage", "mapping" in missingStage, false);
}

fs.rmSync(tempEndpointModulePath, { force: true });
fs.rmSync(tempRegistryModulePath, { force: true });

if (failures.length > 0) {
  console.error("\n[ORIGINAL SELF LIFE SCHEMA ENDPOINT] FAIL");
  failures.forEach((failure) => console.error(`- ${failure}`));
  process.exit(1);
}

console.log("\n[ORIGINAL SELF LIFE SCHEMA ENDPOINT] PASS");
