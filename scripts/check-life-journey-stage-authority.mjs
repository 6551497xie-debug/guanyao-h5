import fs from "node:fs";
import path from "node:path";
import process from "node:process";

const rootDir = process.cwd();
const authorityTypePath = path.join(rootDir, "src/types/lifeJourneyStageAuthority.ts");
const typeIndexPath = path.join(rootDir, "src/types/index.ts");
const schemaTypePath = path.join(rootDir, "src/types/originalSelfLifeSchema.ts");
const foundationTypePath = path.join(rootDir, "src/types/originalSelf.ts");
const stageSourcePath = path.join(rootDir, "src/services/lifeJourneyStageSource.ts");
const protocolPath = path.join(rootDir, "docs/GUANYAO_LIFE_JOURNEY_STAGE_AUTHORITY_PROTOCOL.md");
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
  ["stage authority type", authorityTypePath],
  ["type index", typeIndexPath],
  ["life schema type", schemaTypePath],
  ["foundation type", foundationTypePath],
  ["stage source", stageSourcePath],
  ["stage authority protocol", protocolPath],
  ["package manifest", packagePath],
]) {
  if (!fs.existsSync(filePath)) failures.push(`${name} file missing=${filePath}`);
  else console.log(`PASS | ${name} file exists`);
}

if (failures.length === 0) {
  const authorityTypeSource = fs.readFileSync(authorityTypePath, "utf8");
  const typeIndexSource = fs.readFileSync(typeIndexPath, "utf8");
  const schemaTypeSource = fs.readFileSync(schemaTypePath, "utf8");
  const foundationTypeSource = fs.readFileSync(foundationTypePath, "utf8");
  const stageSource = fs.readFileSync(stageSourcePath, "utf8");
  const protocolSource = fs.readFileSync(protocolPath, "utf8");
  const packageJson = JSON.parse(fs.readFileSync(packagePath, "utf8"));

  [
    "export type LifeJourneyStageAuthority",
    '"original_self_life_journey_orchestrator"',
    "export type LifeJourneyStageAuthorityDeclaration",
    "authority: LifeJourneyStageAuthority",
    'sourceBoundary: "upper_schema"',
    'semanticRole: "EXPLICIT_LIFE_JOURNEY_STAGE_DECLARATION"',
    "lifeJourneyStage: LifeJourneyStage",
    "explicit: true",
    "noAutomaticProgression: true",
    "noRuntimeInference: true",
    "noFoundationPhaseInference: true",
    "export type LifeJourneyStageAuthorityBoundary",
    "exclusiveAuthority: true",
    "triggerRulesDeferred: true",
    "noStageTransition: true",
    "noRuntimeAdapter: true",
    "noPersistence: true",
    "noUIAuthority: true",
  ].forEach((marker) => assertIncludes("stage authority type contract", authorityTypeSource, marker));

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
  ].forEach((marker) => assertExcludes("stage authority stays upper-schema-only", authorityTypeSource, marker));

  [
    "LifeJourneyStageAuthority",
    "LifeJourneyStageAuthorityBoundary",
    "LifeJourneyStageAuthorityDeclaration",
    'from "./lifeJourneyStageAuthority"',
  ].forEach((marker) => assertIncludes("type index exports authority", typeIndexSource, marker));

  [
    "export type LifeJourneyStage",
    '"ORIGIN"',
    '"AWAKENING"',
    '"REALITY"',
    '"PRESSURE"',
    '"CHOICE"',
    '"CRYSTAL"',
    '"ARCHIVE"',
  ].forEach((marker) => assertIncludes("authority reuses fixed life stages", schemaTypeSource, marker));

  assertExcludes("foundation does not own stage authority", foundationTypeSource, "LifeJourneyStageAuthority");
  assertExcludes("P15 source does not consume authority declaration", stageSource, "LifeJourneyStageAuthority");
  assertIncludes("P15 source remains generic upper boundary", stageSource, 'source: "upper_schema_caller"');
  assertIncludes("P15 source remains explicit", stageSource, "noRuntimeInference: true");

  const authorityReferences = collectTypeScriptSourcePaths(path.join(rootDir, "src"))
    .filter((filePath) => fs.readFileSync(filePath, "utf8").includes("LifeJourneyStageAuthorityDeclaration"))
    .map((filePath) => path.relative(rootDir, filePath))
    .sort();
  assertEqual(
    "authority declaration is only constructed by explicit authority declaration resolver",
    authorityReferences.join(","),
    [
      "src/services/lifeJourneyStageAuthorityDeclarationResolver.ts",
      "src/types/index.ts",
      "src/types/lifeJourneyStageAuthority.ts",
    ]
      .sort()
      .join(","),
  );

  [
    "RC-LIFE-JOURNEY-STAGE-AUTHORITY-P21",
    "EXPLICIT STAGE AUTHORITY",
    "original_self_life_journey_orchestrator",
    "谁有权显式声明",
    "页面、路由或视觉组件",
    "P21 将 `upper_schema_caller` 的正式权威身份限定为",
    "LifeJourneyStageAuthorityDeclaration",
    "LifeJourneyStageSourceInput",
    "不新增 Authority → Source Adapter",
    "triggerRulesDeferred: true",
    "noStageTransition: true",
    "P21 不修改",
  ].forEach((marker) => assertIncludes("stage authority protocol", protocolSource, marker));

  assertIncludes(
    "stage authority gate command is registered",
    packageJson.scripts?.["check:life-journey-stage-authority"] ?? "",
    "node scripts/check-life-journey-stage-authority.mjs",
  );
  assertIncludes(
    "stage authority gate participates in release",
    packageJson.scripts?.["check:release"] ?? "",
    "npm run check:life-journey-stage-authority",
  );
}

if (failures.length > 0) {
  console.error("\n[LIFE JOURNEY STAGE AUTHORITY] FAIL");
  failures.forEach((failure) => console.error(`- ${failure}`));
  process.exit(1);
}

console.log("\n[LIFE JOURNEY STAGE AUTHORITY] PASS");
