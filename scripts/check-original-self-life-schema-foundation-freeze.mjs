import fs from "node:fs";
import path from "node:path";
import process from "node:process";

const rootDir = process.cwd();

const files = Object.freeze({
  motherCodeSource: "src/services/motherCodeLifeArchetypeSource.ts",
  isolatedSceneModelFixture: "src/mocks/starBeastSceneModelFixtures.ts",
  isolatedGenesisPreview: "src/pages/StarBeastGenesisPreview.tsx",
  isolatedGenesisRendererPreview:
    "src/pages/StarBeastGenesisRendererSlicePreview.tsx",
  stageSource: "src/services/lifeJourneyStageSource.ts",
  mapping: "src/services/originalSelfLifeSchemaMapping.ts",
  entry: "src/services/originalSelfLifeSchemaEntry.ts",
  consumption: "src/services/originalSelfLifeSchemaResultConsumption.ts",
  endpoint: "src/services/originalSelfLifeSchemaEndpoint.ts",
  readiness: "src/services/originalSelfLifeSchemaReadiness.ts",
  foundationType: "src/types/originalSelf.ts",
  lifeSchemaType: "src/types/originalSelfLifeSchema.ts",
  protocol: "docs/GUANYAO_ORIGINAL_SELF_LIFE_SCHEMA_FOUNDATION_FREEZE_PROTOCOL.md",
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
  if (actual !== expected) failures.push(`${name} expected=${expected} actual=${actual}`);
  else console.log(`PASS | ${name} | expected=${expected} | actual=${actual}`);
};

const collectTypeScriptSourcePaths = (directoryPath) =>
  fs.readdirSync(directoryPath, { withFileTypes: true }).flatMap((entry) => {
    const entryPath = path.join(directoryPath, entry.name);
    if (entry.isDirectory()) return collectTypeScriptSourcePaths(entryPath);
    return /\.tsx?$/.test(entry.name) ? [entryPath] : [];
  });

const absolutePathByName = Object.fromEntries(
  Object.entries(files).map(([name, relativePath]) => [name, path.join(rootDir, relativePath)]),
);

for (const [name, filePath] of Object.entries(absolutePathByName)) {
  if (!fs.existsSync(filePath)) failures.push(`${name} file missing=${filePath}`);
  else console.log(`PASS | ${name} file exists`);
}

if (failures.length === 0) {
  const sources = Object.fromEntries(
    Object.entries(absolutePathByName).map(([name, filePath]) => [name, fs.readFileSync(filePath, "utf8")]),
  );
  const packageJson = JSON.parse(sources.packageManifest);
  const typeScriptSourcePaths = collectTypeScriptSourcePaths(path.join(rootDir, "src"));

  const assertCallSites = (name, symbol, expectedRelativePaths) => {
    const actual = typeScriptSourcePaths
      .filter((filePath) => fs.readFileSync(filePath, "utf8").includes(symbol))
      .map((filePath) => path.relative(rootDir, filePath))
      .sort();
    assertEqual(name, actual.join(","), [...expectedRelativePaths].sort().join(","));
  };

  assertCallSites(
    "mother code source is owned by entry, isolated genesis previews, scene model fixtures, and formal identity convergence",
    "resolveLifeArchetypeProfileFromMotherCode",
    [
      files.motherCodeSource,
      files.entry,
      files.isolatedSceneModelFixture,
      files.isolatedGenesisPreview,
      files.isolatedGenesisRendererPreview,
      "src/services/productionIdentitySourceConvergence.ts",
    ],
  );
  assertCallSites(
    "explicit stage source is owned by entry",
    "resolveLifeJourneyStageSource",
    [files.stageSource, files.entry],
  );
  assertCallSites(
    "life schema mapping is owned by entry",
    "mapOriginalSelfLifeSchemaToFoundation",
    [files.mapping, files.entry],
  );
  assertCallSites(
    "life schema entry is owned by endpoint",
    "resolveOriginalSelfLifeSchemaFromSources",
    [files.entry, files.endpoint],
  );
  assertCallSites(
    "result consumption is owned by endpoint",
    "consumeOriginalSelfLifeSchemaResult",
    [files.consumption, files.endpoint],
  );
  assertCallSites(
    "endpoint is owned by readiness",
    "resolveOriginalSelfLifeSchemaConsumption",
    [files.endpoint, files.readiness],
  );
  assertCallSites(
    "readiness has no runtime consumer",
    "resolveOriginalSelfLifeSchemaReadiness",
    [files.readiness],
  );

  [
    'source: "mother_code_profile"',
    "lifeArchetypeProfile: LifeArchetypeProfile",
    'semanticRole: "ORIGINAL_LIFE_FORCE"',
    "notHexagram: true",
    "notPersonalityLabel: true",
  ].forEach((marker) => assertIncludes("mother code remains archetype source", sources.motherCodeSource, marker));

  [
    'source: "upper_schema_caller"',
    'semanticRole: "EXPLICIT_LIFE_JOURNEY_STAGE"',
    "explicit: true",
    "noRuntimeInference: true",
  ].forEach((marker) => assertIncludes("journey stage remains explicit", sources.stageSource, marker));

  [
    "explicitProfileRequired: true",
    "explicitJourneyStageRequired: true",
    "noFourSymbolInference: true",
    "noFoundationMutation: true",
    "noRuntimeProgression: true",
    "noPersistence: true",
  ].forEach((marker) => assertIncludes("mapping boundary remains frozen", sources.mapping, marker));

  [
    "originalSelfLifeSchemaEntry",
    "originalSelfLifeSchemaResultConsumption",
    "originalSelfLifeSchemaEndpoint",
    "originalSelfLifeSchemaReadiness",
  ].forEach((marker) => assertExcludes("foundation stays independent", sources.foundationType, marker));

  const chainSource = [
    sources.motherCodeSource,
    sources.stageSource,
    sources.mapping,
    sources.entry,
    sources.consumption,
    sources.endpoint,
    sources.readiness,
  ].join("\n");

  [
    "localStorage",
    "sessionStorage",
    'from "react"',
    'from "react-router-dom"',
    "fetch(",
    "/pages/",
    "/components/",
    "originalSelfFoundationAdapter",
    "originalSelfFoundationResolver",
    "originalSelfFoundationEndpoint",
    "originalSelfFoundationEntry",
  ].forEach((marker) => assertExcludes("frozen chain has no forbidden dependency", chainSource, marker));

  [
    "RC-ORIGINAL-SELF-LIFE-SCHEMA-FOUNDATION-FREEZE-P20",
    "FOUNDATION ARCHITECTURE FROZEN",
    "MotherCodeProfile",
    "LifeJourneyStageSourceInput",
    "Mother Code Source、Stage Source、Mapping → Entry",
    "Entry、Result Consumption → Endpoint",
    "Endpoint → Readiness",
    "Readiness 当前不得被 Runtime",
    "Mother Code 仍是 LifeArchetypeProfile 的唯一正式来源",
    "LifeJourneyStage 仍来自显式上位输入",
    "P20 不修改 P0–P19",
  ].forEach((marker) => assertIncludes("foundation freeze protocol", sources.protocol, marker));

  assertIncludes(
    "foundation freeze gate command is registered",
    packageJson.scripts?.["check:original-self-life-schema-foundation-freeze"] ?? "",
    "node scripts/check-original-self-life-schema-foundation-freeze.mjs",
  );
  assertIncludes(
    "foundation freeze gate participates in release",
    packageJson.scripts?.["check:release"] ?? "",
    "npm run check:original-self-life-schema-foundation-freeze",
  );
}

if (failures.length > 0) {
  console.error("\nOriginal Self Life Schema foundation freeze gate failed:");
  failures.forEach((failure) => console.error(`- ${failure}`));
  process.exit(1);
}

console.log("\nOriginal Self Life Schema foundation freeze gate passed.");
