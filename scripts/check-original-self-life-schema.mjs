import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import process from "node:process";
import { build } from "esbuild";

const rootDir = process.cwd();
const typePath = path.join(rootDir, "src/types/originalSelfLifeSchema.ts");
const typeIndexPath = path.join(rootDir, "src/types/index.ts");
const foundationTypePath = path.join(rootDir, "src/types/originalSelf.ts");
const mappingPath = path.join(rootDir, "src/services/originalSelfLifeSchemaMapping.ts");
const protocolPath = path.join(rootDir, "docs/GUANYAO_ORIGINAL_SELF_LIFE_SCHEMA_PROTOCOL.md");
const packagePath = path.join(rootDir, "package.json");
const tempModulePath = path.join(os.tmpdir(), `guanyao-original-self-life-schema-${process.pid}.mjs`);

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

for (const [name, filePath] of [
  ["life schema type", typePath],
  ["type index", typeIndexPath],
  ["foundation type", foundationTypePath],
  ["life schema mapping", mappingPath],
  ["life schema protocol", protocolPath],
  ["package manifest", packagePath],
]) {
  if (!fs.existsSync(filePath)) failures.push(`${name} file missing=${filePath}`);
  else console.log(`PASS | ${name} file exists`);
}

if (failures.length === 0) {
  const typeSource = fs.readFileSync(typePath, "utf8");
  const typeIndexSource = fs.readFileSync(typeIndexPath, "utf8");
  const foundationTypeSource = fs.readFileSync(foundationTypePath, "utf8");
  const mappingSource = fs.readFileSync(mappingPath, "utf8");
  const protocolSource = fs.readFileSync(protocolPath, "utf8");
  const packageJson = JSON.parse(fs.readFileSync(packagePath, "utf8"));

  [
    "export type LifeJourneyStage",
    '"ORIGIN"',
    '"AWAKENING"',
    '"REALITY"',
    '"PRESSURE"',
    '"CHOICE"',
    '"CRYSTAL"',
    '"ARCHIVE"',
    "export type LifeJourneySchemaPath",
    "export type LifeArchetypeCode",
    "export type LifeArchetypeProfile",
    'LifeArchetypeProfileFor<"QIAN", "乾">',
    'LifeArchetypeProfileFor<"KUN", "坤">',
    'LifeArchetypeProfileFor<"ZHEN", "震">',
    'LifeArchetypeProfileFor<"XUN", "巽">',
    'LifeArchetypeProfileFor<"KAN", "坎">',
    'LifeArchetypeProfileFor<"LI", "离">',
    'LifeArchetypeProfileFor<"GEN", "艮">',
    'LifeArchetypeProfileFor<"DUI", "兑">',
    'source: "mother_code_profile"',
    "sourceMotherCodeId: string",
    'semanticRole: "ORIGINAL_LIFE_FORCE"',
    "originalForce: string",
    "lifeIntention: string",
    "shadowPattern: string",
    "awakeningDirection: string",
    "nonFinalIdentity: true",
    "notHexagram: true",
    "notPersonalityLabel: true",
    "export type OriginalSelfLifeSchemaMappingInput",
    "lifeArchetypeState: LifeArchetypeState",
    "foundationJourneyPhase: OriginalSelfJourneyPhase",
    "export type OriginalSelfLifeSchemaMapping",
    "explicitProfileRequired: true",
    "explicitJourneyStageRequired: true",
    "noFourSymbolInference: true",
    "noFoundationMutation: true",
    "noRuntimeProgression: true",
    "noPersistence: true",
  ].forEach((marker) => assertIncludes("life schema type contract", typeSource, marker));

  [
    "CurrentHexagramProfile",
    "YaoTransmissionProfile",
    "CrystalState",
    "StarbeastDerivationResult",
    "localStorage",
    "sessionStorage",
    'from "react"',
  ].forEach((marker) => assertExcludes("life schema stays upper-semantic-only", typeSource, marker));

  assertIncludes("life schema reuses foundation state", typeSource, "LifeArchetypeState, OriginalSelfJourneyPhase");
  assertIncludes("type index exports life schema", typeIndexSource, 'from "./originalSelfLifeSchema"');
  assertIncludes("foundation keeps life archetype state", foundationTypeSource, "export type LifeArchetypeState");
  assertIncludes("foundation keeps stable semantic path", foundationTypeSource, "export type OriginalSelfSemanticPath");
  assertExcludes("foundation is not replaced by life journey schema", foundationTypeSource, "export type LifeJourneyStage");
  assertExcludes("foundation is not replaced by profile layer", foundationTypeSource, "export type LifeArchetypeProfile");

  [
    "export const LIFE_JOURNEY_SCHEMA_PATH",
    "export function mapOriginalSelfLifeSchemaToFoundation",
    "input: OriginalSelfLifeSchemaMappingInput",
    'source: "original_self_life_schema_mapping"',
    "lifeArchetypeProfile: input.lifeArchetypeProfile",
    "currentStage: input.lifeJourneyStage",
    "lifeArchetypeState: input.lifeArchetypeState",
    "journeyPhase: input.foundationJourneyPhase",
    "boundary: ORIGINAL_SELF_LIFE_SCHEMA_MAPPING_BOUNDARY",
  ].forEach((marker) => assertIncludes("life schema mapping contract", mappingSource, marker));

  [
    "input.lifeArchetypeState.fourSymbol",
    "resolveStarbeastFromBirthDate",
    "MotherCodeEngine",
    "HexagramEngine",
    "GravityEngine",
    "CrystalEngine",
    "localStorage",
    "sessionStorage",
    "fetch(",
    'from "react"',
    "if (",
    "switch (",
  ].forEach((marker) => assertExcludes("life schema mapping stays projection-only", mappingSource, marker));

  [
    "RC-ORIGINAL-SELF-LIFE-SCHEMA-P12",
    "ORIGIN",
    "AWAKENING",
    "REALITY",
    "PRESSURE",
    "CHOICE",
    "CRYSTAL",
    "ARCHIVE",
    "LifeArchetypeProfile",
    "QIAN",
    "KUN",
    "ZHEN",
    "XUN",
    "KAN",
    "LI",
    "GEN",
    "DUI",
    "现有 `LifeArchetypeState` 保持不变",
    "不从 `fourSymbol` 反推八原型",
    "Life Journey Stage 必须由上位调用者显式给出",
    "不声明两者一一对应",
    "P12 不修改",
  ].forEach((marker) => assertIncludes("life schema protocol contract", protocolSource, marker));

  assertIncludes(
    "life schema gate command is registered",
    packageJson.scripts?.["check:original-self-life-schema"] ?? "",
    "node scripts/check-original-self-life-schema.mjs",
  );
  assertIncludes(
    "life schema gate participates in release",
    packageJson.scripts?.["check:release"] ?? "",
    "npm run check:original-self-life-schema",
  );

  await build({
    entryPoints: [mappingPath],
    outfile: tempModulePath,
    bundle: true,
    platform: "node",
    format: "esm",
    target: "node20",
    logLevel: "silent",
  });

  const { LIFE_JOURNEY_SCHEMA_PATH, mapOriginalSelfLifeSchemaToFoundation } = await import(
    `file://${tempModulePath}?t=${Date.now()}`
  );
  const profile = Object.freeze({
    source: "mother_code_profile",
    sourceMotherCodeId: "mother-qian-creator",
    code: "QIAN",
    trigram: "乾",
    semanticRole: "ORIGINAL_LIFE_FORCE",
    originalForce: "原始力量",
    lifeIntention: "生命意图",
    shadowPattern: "阴影惯性",
    awakeningDirection: "觉醒方向",
    nonFinalIdentity: true,
    notHexagram: true,
    notPersonalityLabel: true,
  });
  const foundationState = Object.freeze({
    source: "starBeast",
    semanticRole: "LIFE_ARCHETYPE",
    fourSymbol: "青龙",
    stableOrigin: true,
    nonFinalIdentity: true,
  });
  const input = Object.freeze({
    lifeArchetypeProfile: profile,
    lifeJourneyStage: "PRESSURE",
    lifeArchetypeState: foundationState,
    foundationJourneyPhase: "HEXAGRAM",
  });
  const inputSnapshot = JSON.stringify(input);
  const mapping = mapOriginalSelfLifeSchemaToFoundation(input);

  assertEqual("life journey path is fixed", LIFE_JOURNEY_SCHEMA_PATH.join(" → "), "ORIGIN → AWAKENING → REALITY → PRESSURE → CHOICE → CRYSTAL → ARCHIVE");
  assertEqual("mapping identifies its source", mapping.source, "original_self_life_schema_mapping");
  assertEqual("mapping preserves explicit profile reference", mapping.schema.lifeArchetypeProfile === profile, true);
  assertEqual("mapping preserves profile original force", mapping.schema.lifeArchetypeProfile.originalForce, "原始力量");
  assertEqual("mapping preserves explicit life stage", mapping.schema.journey.currentStage, "PRESSURE");
  assertEqual("mapping preserves foundation state reference", mapping.foundation.lifeArchetypeState === foundationState, true);
  assertEqual("mapping preserves independent foundation phase", mapping.foundation.journeyPhase, "HEXAGRAM");
  assertEqual("mapping forbids four-symbol inference", mapping.boundary.noFourSymbolInference, true);
  assertEqual("mapping forbids foundation mutation", mapping.boundary.noFoundationMutation, true);
  assertEqual("mapping forbids runtime progression", mapping.boundary.noRuntimeProgression, true);
  assertEqual("mapping forbids persistence", mapping.boundary.noPersistence, true);
  assertEqual("mapping is frozen", Object.isFrozen(mapping), true);
  assertEqual("mapping schema is frozen", Object.isFrozen(mapping.schema), true);
  assertEqual("mapping journey is frozen", Object.isFrozen(mapping.schema.journey), true);
  assertEqual("mapping foundation reference boundary is frozen", Object.isFrozen(mapping.foundation), true);
  assertEqual("mapping does not mutate input", JSON.stringify(input), inputSnapshot);

  const explicitAlternativeProfile = Object.freeze({
    ...profile,
    code: "KUN",
    trigram: "坤",
  });
  const explicitAlternative = mapOriginalSelfLifeSchemaToFoundation({
    ...input,
    lifeArchetypeProfile: explicitAlternativeProfile,
    lifeJourneyStage: "ARCHIVE",
    foundationJourneyPhase: "CRYSTAL",
  });
  assertEqual("mapping accepts explicit alternative profile", explicitAlternative.schema.lifeArchetypeProfile.code, "KUN");
  assertEqual("mapping does not infer archive from foundation", explicitAlternative.schema.journey.currentStage, "ARCHIVE");
  assertEqual("mapping keeps explicit crystal foundation phase", explicitAlternative.foundation.journeyPhase, "CRYSTAL");
}

fs.rmSync(tempModulePath, { force: true });

if (failures.length > 0) {
  console.error("[ORIGINAL SELF LIFE SCHEMA] FAIL");
  failures.forEach((failure) => console.error(`- ${failure}`));
  process.exit(1);
}

console.log("\n[ORIGINAL SELF LIFE SCHEMA] PASS");
