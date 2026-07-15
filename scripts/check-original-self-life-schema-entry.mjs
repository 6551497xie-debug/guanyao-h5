import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import process from "node:process";
import { build } from "esbuild";

const rootDir = process.cwd();
const entryPath = path.join(rootDir, "src/services/originalSelfLifeSchemaEntry.ts");
const sourcePath = path.join(rootDir, "src/services/motherCodeLifeArchetypeSource.ts");
const stageSourcePath = path.join(rootDir, "src/services/lifeJourneyStageSource.ts");
const mappingPath = path.join(rootDir, "src/services/originalSelfLifeSchemaMapping.ts");
const foundationTypePath = path.join(rootDir, "src/types/originalSelf.ts");
const registryPath = path.join(rootDir, "src/data/guanyaoMotherCodeRegistry.ts");
const protocolPath = path.join(rootDir, "docs/GUANYAO_ORIGINAL_SELF_LIFE_SCHEMA_ENTRY_PROTOCOL.md");
const packagePath = path.join(rootDir, "package.json");
const tempEntryModulePath = path.join(os.tmpdir(), `guanyao-original-self-life-schema-entry-${process.pid}.mjs`);
const tempRegistryModulePath = path.join(os.tmpdir(), `guanyao-original-self-life-schema-entry-registry-${process.pid}.mjs`);

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
  ["mother code source", sourcePath],
  ["life journey stage source", stageSourcePath],
  ["life schema mapping", mappingPath],
  ["foundation type", foundationTypePath],
  ["mother code registry", registryPath],
  ["entry protocol", protocolPath],
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
    "export type OriginalSelfLifeSchemaEntryInput",
    "motherCodeProfile: MotherCodeProfile",
    "lifeJourneyStageSource: LifeJourneyStageSourceInput",
    "lifeArchetypeState: LifeArchetypeState",
    "foundationJourneyPhase: OriginalSelfJourneyPhase",
    "export type OriginalSelfLifeSchemaEntryResult",
    "export function resolveOriginalSelfLifeSchemaFromSources",
    "resolveLifeArchetypeProfileFromMotherCode(input.motherCodeProfile)",
    "resolveLifeJourneyStageSource(input.lifeJourneyStageSource)",
    'source: "original_self_life_schema_entry"',
    'sourceBoundary: "mother_code"',
    'sourceBoundary: "life_journey_stage"',
    "reason: motherCodeSourceResult.reason",
    "reason: lifeJourneyStageSourceResult.reason",
    "sourceResults: Object.freeze({",
    "mapOriginalSelfLifeSchemaToFoundation(",
    "lifeArchetypeProfile: motherCodeSourceResult.lifeArchetypeProfile",
    "lifeJourneyStage: lifeJourneyStageSourceResult.stageSource.currentStage",
    "lifeArchetypeState: input.lifeArchetypeState",
    "foundationJourneyPhase: input.foundationJourneyPhase",
  ].forEach((marker) => assertIncludes("life schema entry contract", entrySource, marker));

  [
    "fourSymbol",
    "StarBeast",
    "resolveStarbeastFromBirthDate",
    "MotherCodeEngine",
    "HexagramEngine",
    "GravityEngine",
    "CrystalEngine",
    "Dynamics",
    "localStorage",
    "sessionStorage",
    "fetch(",
    'from "react"',
  ].forEach((marker) => assertExcludes("life schema entry stays composition-only", entrySource, marker));

  assertIncludes("foundation contract remains present", foundationTypeSource, "export type OriginalSelfState");
  assertExcludes("foundation does not consume schema entry", foundationTypeSource, "OriginalSelfLifeSchemaEntry");

  const typeScriptSourcePaths = collectTypeScriptSourcePaths(path.join(rootDir, "src"));
  const entryCallSites = typeScriptSourcePaths
    .filter((filePath) => fs.readFileSync(filePath, "utf8").includes("resolveOriginalSelfLifeSchemaFromSources"))
    .map((filePath) => path.relative(rootDir, filePath));
  assertEqual(
    "life schema entry is only consumed by endpoint",
    entryCallSites.sort().join(","),
    [
      "src/services/originalSelfLifeSchemaEndpoint.ts",
      "src/services/originalSelfLifeSchemaEntry.ts",
    ].sort().join(","),
  );

  const mappingCallSites = typeScriptSourcePaths
    .filter((filePath) => fs.readFileSync(filePath, "utf8").includes("mapOriginalSelfLifeSchemaToFoundation"))
    .map((filePath) => path.relative(rootDir, filePath))
    .sort();
  assertEqual(
    "life schema mapping is only consumed by entry",
    mappingCallSites.join(","),
    [
      "src/services/originalSelfLifeSchemaEntry.ts",
      "src/services/originalSelfLifeSchemaMapping.ts",
    ].sort().join(","),
  );

  [
    "RC-ORIGINAL-SELF-LIFE-SCHEMA-ENTRY-P14",
    "resolveLifeArchetypeProfileFromMotherCode",
    "MotherCodeLifeArchetypeSourceResult",
    "mapOriginalSelfLifeSchemaToFoundation",
    "OriginalSelfLifeSchemaMapping",
    "resolveOriginalSelfLifeSchemaFromSources",
    "不得绕过 Entry",
    "Life Journey Stage",
    "不从 Foundation phase 推断",
    "MOTHER_CODE_TRIGRAM_MISSING",
    "MOTHER_CODE_LIFE_SEMANTICS_MISSING",
    "不能降级为 `null`",
    "P14 不修改",
  ].forEach((marker) => assertIncludes("life schema entry protocol", protocolSource, marker));

  assertIncludes(
    "entry gate command is registered",
    packageJson.scripts?.["check:original-self-life-schema-entry"] ?? "",
    "node scripts/check-original-self-life-schema-entry.mjs",
  );
  assertIncludes(
    "entry gate participates in release",
    packageJson.scripts?.["check:release"] ?? "",
    "npm run check:original-self-life-schema-entry",
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
  const input = Object.freeze({
    motherCodeProfile,
    lifeJourneyStageSource: Object.freeze({
      source: "upper_schema_caller",
      lifeJourneyStage: "PRESSURE",
    }),
    lifeArchetypeState,
    foundationJourneyPhase: "HEXAGRAM",
  });
  const inputSnapshot = JSON.stringify(input);
  const result = resolveOriginalSelfLifeSchemaFromSources(input);

  assertEqual("entry resolves ready source", result.status, "READY");
  assertEqual("entry identifies its source", result.source, "original_self_life_schema_entry");
  assertEqual("entry preserves mother source result", result.sourceResults?.motherCode.motherCodeProfile === motherCodeProfile, true);
  assertEqual("entry preserves stage source input", result.sourceResults?.lifeJourneyStage.input === input.lifeJourneyStageSource, true);
  assertEqual("entry preserves QIAN profile", result.mapping?.schema.lifeArchetypeProfile.code, "QIAN");
  assertEqual("entry preserves explicit life stage", result.mapping?.schema.journey.currentStage, "PRESSURE");
  assertEqual("entry preserves foundation state reference", result.mapping?.foundation.lifeArchetypeState === lifeArchetypeState, true);
  assertEqual("entry preserves explicit foundation phase", result.mapping?.foundation.journeyPhase, "HEXAGRAM");
  assertEqual("entry result is frozen", Object.isFrozen(result), true);
  assertEqual("entry mapping is frozen", Object.isFrozen(result.mapping), true);
  assertEqual("entry does not mutate input", JSON.stringify(input), inputSnapshot);

  const incompleteMotherCodeProfile = Object.freeze({
    ...motherCodeProfile,
    unlockPotential: undefined,
  });
  const notReady = resolveOriginalSelfLifeSchemaFromSources({
    ...input,
    motherCodeProfile: incompleteMotherCodeProfile,
  });
  assertEqual("entry preserves not-ready status", notReady.status, "NOT_READY");
  assertEqual("entry preserves source reason", notReady.reason, "MOTHER_CODE_LIFE_SEMANTICS_MISSING");
  assertEqual("entry identifies mother source boundary", notReady.sourceBoundary, "mother_code");
  assertEqual("entry preserves original source result", notReady.sourceResult?.motherCodeProfile === incompleteMotherCodeProfile, true);
  assertEqual("entry does not create partial mapping", "mapping" in notReady, false);
  assertEqual("entry freezes not-ready result", Object.isFrozen(notReady), true);

  const missingStage = resolveOriginalSelfLifeSchemaFromSources({
    ...input,
    lifeJourneyStageSource: Object.freeze({ source: "upper_schema_caller" }),
  });
  assertEqual("entry blocks missing stage", missingStage.status, "NOT_READY");
  assertEqual("entry preserves missing stage reason", missingStage.reason, "LIFE_JOURNEY_STAGE_MISSING");
  assertEqual("entry identifies stage source boundary", missingStage.sourceBoundary, "life_journey_stage");
  assertEqual("entry preserves missing stage source result", missingStage.sourceResult?.input.lifeJourneyStage, undefined);
  assertEqual("entry does not map missing stage", "mapping" in missingStage, false);

  const invalidStage = resolveOriginalSelfLifeSchemaFromSources({
    ...input,
    lifeJourneyStageSource: Object.freeze({
      source: "upper_schema_caller",
      lifeJourneyStage: "HEXAGRAM",
    }),
  });
  assertEqual("entry blocks invalid stage", invalidStage.status, "NOT_READY");
  assertEqual("entry preserves invalid stage reason", invalidStage.reason, "LIFE_JOURNEY_STAGE_INVALID");
  assertEqual("entry identifies invalid stage boundary", invalidStage.sourceBoundary, "life_journey_stage");
  assertEqual("entry does not map invalid stage", "mapping" in invalidStage, false);
}

fs.rmSync(tempEntryModulePath, { force: true });
fs.rmSync(tempRegistryModulePath, { force: true });

if (failures.length > 0) {
  console.error("[ORIGINAL SELF LIFE SCHEMA ENTRY] FAIL");
  failures.forEach((failure) => console.error(`- ${failure}`));
  process.exit(1);
}

console.log("\n[ORIGINAL SELF LIFE SCHEMA ENTRY] PASS");
