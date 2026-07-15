import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import process from "node:process";
import { build } from "esbuild";

const rootDir = process.cwd();
const sourcePath = path.join(rootDir, "src/services/lifeJourneyStageSource.ts");
const schemaTypePath = path.join(rootDir, "src/types/originalSelfLifeSchema.ts");
const foundationTypePath = path.join(rootDir, "src/types/originalSelf.ts");
const entryPath = path.join(rootDir, "src/services/originalSelfLifeSchemaEntry.ts");
const protocolPath = path.join(rootDir, "docs/GUANYAO_LIFE_JOURNEY_STAGE_SOURCE_PROTOCOL.md");
const packagePath = path.join(rootDir, "package.json");
const tempModulePath = path.join(os.tmpdir(), `guanyao-life-journey-stage-source-${process.pid}.mjs`);

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
  ["life journey stage source", sourcePath],
  ["life schema type", schemaTypePath],
  ["foundation type", foundationTypePath],
  ["life schema entry", entryPath],
  ["stage source protocol", protocolPath],
  ["package manifest", packagePath],
]) {
  if (!fs.existsSync(filePath)) failures.push(`${name} file missing=${filePath}`);
  else console.log(`PASS | ${name} file exists`);
}

if (failures.length === 0) {
  const source = fs.readFileSync(sourcePath, "utf8");
  const schemaTypeSource = fs.readFileSync(schemaTypePath, "utf8");
  const foundationTypeSource = fs.readFileSync(foundationTypePath, "utf8");
  const entrySource = fs.readFileSync(entryPath, "utf8");
  const protocolSource = fs.readFileSync(protocolPath, "utf8");
  const packageJson = JSON.parse(fs.readFileSync(packagePath, "utf8"));

  [
    "export type LifeJourneyStageSourceInput",
    "export type LifeJourneyStageSourceProfile",
    "export type LifeJourneyStageSourceNotReadyReason",
    "export type LifeJourneyStageSourceResult",
    "export function resolveLifeJourneyStageSource",
    'source: "upper_schema_caller"',
    'semanticRole: "EXPLICIT_LIFE_JOURNEY_STAGE"',
    "currentStage: LifeJourneyStage",
    "explicit: true",
    "noRuntimeInference: true",
    '"LIFE_JOURNEY_STAGE_MISSING"',
    '"LIFE_JOURNEY_STAGE_INVALID"',
    '"ORIGIN"',
    '"AWAKENING"',
    '"REALITY"',
    '"PRESSURE"',
    '"CHOICE"',
    '"CRYSTAL"',
    '"ARCHIVE"',
  ].forEach((marker) => assertIncludes("life journey stage source contract", source, marker));

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
  ].forEach((marker) => assertExcludes("stage source stays explicit-schema-only", source, marker));

  [
    "export type LifeJourneyStage",
    '"ORIGIN"',
    '"AWAKENING"',
    '"REALITY"',
    '"PRESSURE"',
    '"CHOICE"',
    '"CRYSTAL"',
    '"ARCHIVE"',
  ].forEach((marker) => assertIncludes("existing life journey stage contract", schemaTypeSource, marker));

  assertExcludes("foundation does not own life journey source", foundationTypeSource, "LifeJourneyStageSource");
  assertIncludes("P14 keeps explicit stage input", entrySource, "lifeJourneyStage: LifeJourneyStage");
  assertExcludes("P14 is not changed to consume P15", entrySource, "resolveLifeJourneyStageSource");

  const sourceCallSites = collectTypeScriptSourcePaths(path.join(rootDir, "src"))
    .filter((filePath) => fs.readFileSync(filePath, "utf8").includes("resolveLifeJourneyStageSource"))
    .map((filePath) => path.relative(rootDir, filePath))
    .sort();
  assertEqual(
    "stage source has no runtime or entry consumer",
    sourceCallSites.join(","),
    "src/services/lifeJourneyStageSource.ts",
  );

  [
    "RC-LIFE-JOURNEY-STAGE-SOURCE-P15",
    "upper_schema_caller",
    "LifeJourneyStageSourceProfile",
    "LIFE_JOURNEY_STAGE_MISSING",
    "LIFE_JOURNEY_STAGE_INVALID",
    "不提供默认阶段",
    "OriginalSelfJourneyPhase",
    "Foundation `HEXAGRAM` 等于 Life Journey `PRESSURE`",
    "P15 Source 尚未成为 Entry 消费者",
    "P15 不修改",
  ].forEach((marker) => assertIncludes("life journey stage source protocol", protocolSource, marker));

  assertIncludes(
    "stage source gate command is registered",
    packageJson.scripts?.["check:life-journey-stage-source"] ?? "",
    "node scripts/check-life-journey-stage-source.mjs",
  );
  assertIncludes(
    "stage source gate participates in release",
    packageJson.scripts?.["check:release"] ?? "",
    "npm run check:life-journey-stage-source",
  );

  await build({
    entryPoints: [sourcePath],
    outfile: tempModulePath,
    bundle: true,
    platform: "node",
    format: "esm",
    target: "node20",
    logLevel: "silent",
  });

  const { resolveLifeJourneyStageSource } = await import(`file://${tempModulePath}?t=${Date.now()}`);
  const stages = ["ORIGIN", "AWAKENING", "REALITY", "PRESSURE", "CHOICE", "CRYSTAL", "ARCHIVE"];

  for (const stage of stages) {
    const input = Object.freeze({ source: "upper_schema_caller", lifeJourneyStage: stage });
    const snapshot = JSON.stringify(input);
    const result = resolveLifeJourneyStageSource(input);
    assertEqual(`${stage} source is ready`, result.status, "READY");
    assertEqual(`${stage} preserves source`, result.source, "upper_schema_caller");
    assertEqual(`${stage} preserves input reference`, result.input === input, true);
    assertEqual(`${stage} preserves explicit stage`, result.stageSource?.currentStage, stage);
    assertEqual(`${stage} is marked explicit`, result.stageSource?.explicit, true);
    assertEqual(`${stage} blocks runtime inference`, result.stageSource?.noRuntimeInference, true);
    assertEqual(`${stage} result is frozen`, Object.isFrozen(result), true);
    assertEqual(`${stage} profile is frozen`, Object.isFrozen(result.stageSource), true);
    assertEqual(`${stage} does not mutate input`, JSON.stringify(input), snapshot);
  }

  const missingInput = Object.freeze({ source: "upper_schema_caller" });
  const missing = resolveLifeJourneyStageSource(missingInput);
  assertEqual("missing stage is not ready", missing.status, "NOT_READY");
  assertEqual("missing stage reason", missing.reason, "LIFE_JOURNEY_STAGE_MISSING");
  assertEqual("missing stage preserves input", missing.input === missingInput, true);
  assertEqual("missing stage provides no default profile", "stageSource" in missing, false);
  assertEqual("missing stage result is frozen", Object.isFrozen(missing), true);

  const invalidInput = Object.freeze({ source: "upper_schema_caller", lifeJourneyStage: "HEXAGRAM" });
  const invalid = resolveLifeJourneyStageSource(invalidInput);
  assertEqual("invalid stage is not ready", invalid.status, "NOT_READY");
  assertEqual("invalid stage reason", invalid.reason, "LIFE_JOURNEY_STAGE_INVALID");
  assertEqual("invalid stage preserves input", invalid.input === invalidInput, true);
  assertEqual("invalid stage provides no profile", "stageSource" in invalid, false);
  assertEqual("invalid stage result is frozen", Object.isFrozen(invalid), true);
}

fs.rmSync(tempModulePath, { force: true });

if (failures.length > 0) {
  console.error("\n[LIFE JOURNEY STAGE SOURCE] FAIL");
  failures.forEach((failure) => console.error(`- ${failure}`));
  process.exit(1);
}

console.log("\n[LIFE JOURNEY STAGE SOURCE] PASS");
