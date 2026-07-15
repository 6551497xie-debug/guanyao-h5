import fs from "node:fs";
import path from "node:path";
import process from "node:process";

const rootDir = process.cwd();
const triggerTypePath = path.join(rootDir, "src/types/lifeJourneyStageTrigger.ts");
const authorityTypePath = path.join(rootDir, "src/types/lifeJourneyStageAuthority.ts");
const schemaTypePath = path.join(rootDir, "src/types/originalSelfLifeSchema.ts");
const typeIndexPath = path.join(rootDir, "src/types/index.ts");
const stageSourcePath = path.join(rootDir, "src/services/lifeJourneyStageSource.ts");
const protocolPath = path.join(rootDir, "docs/GUANYAO_LIFE_JOURNEY_STAGE_TRIGGER_PROTOCOL.md");
const packagePath = path.join(rootDir, "package.json");

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
  ["stage trigger type", triggerTypePath],
  ["stage authority type", authorityTypePath],
  ["life schema type", schemaTypePath],
  ["type index", typeIndexPath],
  ["stage source", stageSourcePath],
  ["stage trigger protocol", protocolPath],
  ["package manifest", packagePath],
]) {
  if (!fs.existsSync(filePath)) failures.push(`${name} file missing=${filePath}`);
  else console.log(`PASS | ${name} file exists`);
}

if (failures.length === 0) {
  const triggerTypeSource = fs.readFileSync(triggerTypePath, "utf8");
  const authorityTypeSource = fs.readFileSync(authorityTypePath, "utf8");
  const schemaTypeSource = fs.readFileSync(schemaTypePath, "utf8");
  const typeIndexSource = fs.readFileSync(typeIndexPath, "utf8");
  const stageSource = fs.readFileSync(stageSourcePath, "utf8");
  const protocolSource = fs.readFileSync(protocolPath, "utf8");
  const packageJson = JSON.parse(fs.readFileSync(packagePath, "utf8"));

  const triggerStagePairs = Object.freeze([
    ["LIFE_ORIGIN_ESTABLISHED", "ORIGIN"],
    ["ORIGINAL_SELF_AWAKENED", "AWAKENING"],
    ["REALITY_EXPERIENCE_ENTERED", "REALITY"],
    ["REALITY_PRESSURE_ENCOUNTERED", "PRESSURE"],
    ["LIFE_DIRECTION_CHOICE_COMPLETED", "CHOICE"],
    ["LIFE_IMPRINT_CRYSTALLIZED", "CRYSTAL"],
    ["LIFE_IMPRINT_ARCHIVED", "ARCHIVE"],
  ]);

  [
    "export type LifeJourneyStageTriggerCode",
    "type LifeJourneyStageTriggerFor<",
    "export type LifeJourneyStageTrigger =",
    'semanticRole: "LIFE_JOURNEY_STAGE_TRIGGER_EVIDENCE"',
    "explicit: true",
    "requiresAuthorityDeclaration: true",
    "noTransitionDecision: true",
    "noAutomaticProgression: true",
    "export type LifeJourneyStageTriggerBoundary",
    "closedVocabulary: true",
    "oneTriggerOneSemanticStage: true",
    "noTransitionOrder: true",
    "noStageCompletionInference: true",
    "noRuntimeAdapter: true",
    "noPersistence: true",
  ].forEach((marker) => assertIncludes("stage trigger type contract", triggerTypeSource, marker));

  for (const [trigger, stage] of triggerStagePairs) {
    assertIncludes(
      `${trigger} maps to ${stage}`,
      triggerTypeSource,
      `LifeJourneyStageTriggerFor<"${trigger}", "${stage}">`,
    );
  }

  assertEqual("trigger vocabulary count", triggerStagePairs.length, 7);
  assertEqual("trigger vocabulary uniqueness", new Set(triggerStagePairs.map(([trigger]) => trigger)).size, 7);
  assertEqual("semantic stage uniqueness", new Set(triggerStagePairs.map(([, stage]) => stage)).size, 7);

  [
    "OriginalSelfJourneyPhase",
    "fourSymbol",
    "StarBeast",
    "MotherCode",
    "Hexagram",
    "Gravity",
    "Dynamics",
    "CrystalState",
    "localStorage",
    "sessionStorage",
    "fetch(",
    'from "react"',
    "fromStage",
    "toStage",
  ].forEach((marker) => assertExcludes("stage trigger stays semantic-only", triggerTypeSource, marker));

  [
    "LifeJourneyStageTrigger",
    "LifeJourneyStageTriggerBoundary",
    "LifeJourneyStageTriggerCode",
    'from "./lifeJourneyStageTrigger"',
  ].forEach((marker) => assertIncludes("type index exports stage trigger", typeIndexSource, marker));

  assertIncludes("trigger reuses fixed stage type", schemaTypeSource, "export type LifeJourneyStage");
  assertIncludes("P21 keeps exclusive authority", authorityTypeSource, "exclusiveAuthority: true");
  assertIncludes("P21 keeps trigger rules outside authority", authorityTypeSource, "triggerRulesDeferred: true");
  assertExcludes("P15 source does not consume trigger", stageSource, "LifeJourneyStageTrigger");

  const triggerReferences = collectTypeScriptSourcePaths(path.join(rootDir, "src"))
    .filter((filePath) => fs.readFileSync(filePath, "utf8").includes("LifeJourneyStageTriggerCode"))
    .map((filePath) => path.relative(rootDir, filePath))
    .sort();
  assertEqual(
    "trigger contract has no service or runtime consumer",
    triggerReferences.join(","),
    ["src/types/index.ts", "src/types/lifeJourneyStageTrigger.ts"].sort().join(","),
  );

  [
    "RC-LIFE-JOURNEY-STAGE-TRIGGER-CONTRACT-P22",
    "SEMANTIC TRIGGER CONTRACT",
    "Trigger 是生命事件证据，不是状态机命令",
    "LIFE_ORIGIN_ESTABLISHED",
    "ORIGINAL_SELF_AWAKENED",
    "REALITY_EXPERIENCE_ENTERED",
    "REALITY_PRESSURE_ENCOUNTERED",
    "LIFE_DIRECTION_CHOICE_COMPLETED",
    "LIFE_IMPRINT_CRYSTALLIZED",
    "LIFE_IMPRINT_ARCHIVED",
    "requiresAuthorityDeclaration: true",
    "不新增 Trigger → Authority Adapter",
    "P21 的 `triggerRulesDeferred: true`",
    "P22 明确不定义",
    "P22 不修改",
  ].forEach((marker) => assertIncludes("stage trigger protocol", protocolSource, marker));

  assertIncludes(
    "stage trigger gate command is registered",
    packageJson.scripts?.["check:life-journey-stage-trigger"] ?? "",
    "node scripts/check-life-journey-stage-trigger.mjs",
  );
  assertIncludes(
    "stage trigger gate participates in release",
    packageJson.scripts?.["check:release"] ?? "",
    "npm run check:life-journey-stage-trigger",
  );
}

if (failures.length > 0) {
  console.error("\n[LIFE JOURNEY STAGE TRIGGER] FAIL");
  failures.forEach((failure) => console.error(`- ${failure}`));
  process.exit(1);
}

console.log("\n[LIFE JOURNEY STAGE TRIGGER] PASS");
