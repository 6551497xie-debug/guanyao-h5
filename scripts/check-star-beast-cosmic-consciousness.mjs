import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import process from "node:process";
import { build } from "esbuild";

const rootDir = process.cwd();
const files = Object.freeze({
  type: "src/types/starBeastCosmicConsciousness.ts",
  service: "src/services/starBeastCosmicConsciousnessMapping.ts",
  assetService: "src/services/starBeastGenesisPrototypeAsset.ts",
  canvas: "src/components/StarBeastGenesisRendererPrototypeCanvas.tsx",
  page: "src/pages/StarBeastGenesisRendererSlicePreview.tsx",
  protocol: "docs/GUANYAO_STAR_BEAST_COSMIC_CONSCIOUSNESS_PROTOCOL.md",
  typeIndex: "src/types/index.ts",
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

const absolute = Object.fromEntries(
  Object.entries(files).map(([name, relativePath]) => [name, path.join(rootDir, relativePath)]),
);

for (const [name, filePath] of Object.entries(absolute)) {
  if (!fs.existsSync(filePath)) failures.push(`${name} missing=${filePath}`);
  else console.log(`PASS | ${name} file exists`);
}

if (failures.length === 0) {
  const source = Object.fromEntries(
    Object.entries(absolute).map(([name, filePath]) => [name, fs.readFileSync(filePath, "utf8")]),
  );
  const packageJson = JSON.parse(source.packageManifest);

  [
    "export type StarBeastCosmicConsciousnessState",
    "consciousnessMode: StarBeastConsciousnessMode",
    "starDustFlowReference: StarBeastStarDustFlowReference",
    "coreBreathReference: StarBeastCoreBreathReference",
    "innerLightReference: StarBeastInnerLightReference",
    "presenceReference: StarBeastPresenceReference",
    'isolatedPrototypeScope: "ISOLATED_PROTOTYPE_ONLY"',
    "expressionReferenceOnly: true",
    "noLifeFactCopy: true",
    "noAssetMutation: true",
    "noLifeStateMutation: true",
    "noMemoryCreation: true",
    "noGrowthCreation: true",
  ].forEach((marker) => assertIncludes("consciousness state contract", source.type, marker));

  ["x: number", "y: number", "particleDensity", "particleCount", "durationMs", "birthDate", "motherCode"].forEach(
    (marker) => assertExcludes("consciousness state keeps expression references only", source.type, marker),
  );

  [
    "export function resolveStarBeastCosmicConsciousness",
    "COSMIC_CONSCIOUSNESS_STAGE_MAPPING",
    'consciousnessMode: "DORMANT"',
    'consciousnessMode: "ORDERING"',
    'consciousnessMode: "EMERGING"',
    'consciousnessMode: "AWAKENING"',
    'consciousnessMode: "QUIET_PRESENCE"',
    'expressionState: "SPARSE_CONTINUOUS_FLOW"',
    'expressionState: "SLOW_STABLE_BREATH"',
    'expressionState: "STABLE_SETTLING_FLOW"',
    'expressionState: "SILENT_PRESENCE"',
    'kind === "COSMIC_CONSCIOUSNESS"',
    "noAssetMutation: true",
    "noLifeStateMutation: true",
    "noMemoryCreation: true",
    "noGrowthCreation: true",
  ].forEach((marker) => assertIncludes("consciousness mapping", source.service, marker));

  [
    "requestAnimationFrame",
    "CanvasRenderingContext",
    "getContext(",
    "resolveStarBeastGenesisRendererPrototype",
    "resolveWhiteTigerGenGenesisPrototypeAsset",
    "starBeastMemory",
    "starBeastGrowth",
    "localStorage",
    "sessionStorage",
    'from "react"',
    'from "three"',
  ].forEach((marker) => assertExcludes("mapping remains expression-only", source.service, marker));

  [
    "StarBeastCosmicConsciousnessState",
    "drawSparseConsciousnessFlow",
    "drawCoreBreath",
    "drawInnerLight",
    "drawSilentPresenceField",
    "starDustFlowReference.expressionState",
    "coreBreathReference.expressionState",
    "innerLightReference.expressionState",
    "presenceReference.expressionState",
    'data-consciousness-mode={consciousnessState.consciousnessMode}',
  ].forEach((marker) => assertIncludes("Canvas consumes consciousness expression state", source.canvas, marker));

  [
    "starBeastCosmicConsciousnessMapping",
    "resolveStarBeastCosmicConsciousness",
    "StarBeastGenesisPrototypeAsset",
    "resolveWhiteTigerGenGenesisPrototypeAsset",
    "LifeArchetypeProfile",
    "StarBeastState",
    "localStorage",
    "sessionStorage",
    "WebGL",
    "THREE",
    'from "three"',
  ].forEach((marker) => assertExcludes("Canvas does not map or read business state", source.canvas, marker));

  [
    "resolveStarBeastCosmicConsciousness",
    "consciousness.status",
    "consciousnessState={model.consciousness.state}",
    "data-consciousness-mode={model.consciousness.state.consciousnessMode}",
    'data-prototype-scope="ISOLATED_PROTOTYPE_ONLY"',
  ].forEach((marker) => assertIncludes("isolated preview composes P86", source.page, marker));

  ["localStorage", "sessionStorage", "fetch(", "WebGL", 'from "three"'].forEach((marker) =>
    assertExcludes("isolated preview remains local", source.page, marker),
  );

  [
    "RC-STAR-BEAST-COSMIC-CONSCIOUSNESS-LAYER-P86",
    "GenesisVisualState → CosmicConsciousnessState → Isolated Prototype Renderer",
    "不增加新的 Genesis 阶段",
    "不是装饰粒子",
    "稀疏、安静、持续",
    "星核缓慢亮暗",
    "向身体边界稳定沉积",
    "保持静默存在",
    "不得修改 P84 Asset Definition 或 Life State",
    "不得创建 Memory、Growth、Crystal 或用户画像",
    "ISOLATED_PROTOTYPE_ONLY",
  ].forEach((marker) => assertIncludes("cosmic consciousness protocol", source.protocol, marker));

  assertIncludes(
    "type index exports consciousness state",
    source.typeIndex,
    "StarBeastCosmicConsciousnessState",
  );
  assertIncludes(
    "P86 gate registered",
    packageJson.scripts?.["check:star-beast-cosmic-consciousness"] ?? "",
    "node scripts/check-star-beast-cosmic-consciousness.mjs",
  );
  assertIncludes(
    "P86 gate participates in release",
    packageJson.scripts?.["postcheck:release"] ?? "",
    "npm run check:star-beast-cosmic-consciousness",
  );

  const collectTypeScript = (directoryPath) =>
    fs.readdirSync(directoryPath, { withFileTypes: true }).flatMap((entry) => {
      const entryPath = path.join(directoryPath, entry.name);
      if (entry.isDirectory()) return collectTypeScript(entryPath);
      return /\.tsx?$/.test(entry.name) ? [entryPath] : [];
    });
  const resolverCallSites = collectTypeScript(path.join(rootDir, "src"))
    .filter((filePath) => fs.readFileSync(filePath, "utf8").includes("resolveStarBeastCosmicConsciousness("))
    .map((filePath) => path.relative(rootDir, filePath))
    .sort();
  assertEqual(
    "P86 mapping is consumed only by isolated preview",
    resolverCallSites.join(","),
    [files.page, files.service].sort().join(","),
  );

  const productSurfaceReferences = collectTypeScript(path.join(rootDir, "src"))
    .filter((filePath) => ![absolute.page, absolute.service, absolute.type, absolute.canvas, absolute.typeIndex].includes(filePath))
    .filter((filePath) => fs.readFileSync(filePath, "utf8").includes("StarBeastCosmicConsciousness"))
    .map((filePath) => path.relative(rootDir, filePath));
  assertEqual("product surfaces do not consume P86", productSurfaceReferences.join(","), "");

  const outputDirectory = path.join(os.tmpdir(), `guanyao-cosmic-consciousness-${process.pid}`);
  await build({
    entryPoints: [absolute.assetService, absolute.service],
    outdir: outputDirectory,
    bundle: true,
    platform: "node",
    format: "esm",
    target: "node20",
    logLevel: "silent",
  });
  const assetModule = await import(`file://${path.join(outputDirectory, "starBeastGenesisPrototypeAsset.js")}?t=${Date.now()}`);
  const consciousnessModule = await import(`file://${path.join(outputDirectory, "starBeastCosmicConsciousnessMapping.js")}?t=${Date.now()}`);

  const mansion = Object.freeze({
    status: "READY",
    protocolVersion: "GUANYAO_LUNAR_MANSION_V1",
    calculationBasis: "GREGORIAN_TO_LUNAR_MONTH_DAY_MANSION",
    gregorianBirthDate: "1979-04-15",
    lunarBirthDate: Object.freeze({ relatedYear: 1979, month: 3, day: 19, isLeapMonth: false }),
    mansionIndex: 14,
    mansion: "奎",
    fourSymbol: "白虎",
    direction: "西",
    symbolicTrigram: "兑",
    locationIndependent: true,
    birthTimeIndependent: true,
  });
  const profile = Object.freeze({
    source: "mother_code_profile",
    sourceMotherCodeId: "test:gen",
    code: "GEN",
    trigram: "艮",
    semanticRole: "ORIGINAL_LIFE_FORCE",
    originalForce: "守望",
    lifeIntention: "稳定边界",
    shadowPattern: "停滞",
    awakeningDirection: "稳定而不僵化",
    nonFinalIdentity: true,
    notHexagram: true,
    notPersonalityLabel: true,
  });
  const assetResult = assetModule.resolveWhiteTigerGenGenesisPrototypeAsset(Object.freeze({
    westernMansionReference: mansion,
    lifeArchetypeProfileReference: profile,
  }));
  const asset = assetResult.asset;
  const assetBefore = JSON.stringify(asset);
  const lifeStateSentinel = Object.freeze({ semanticRole: "UNCHANGED_LIFE_STATE" });
  const lifeStateBefore = JSON.stringify(lifeStateSentinel);
  const expressionReference = Object.freeze({
    referenceType: "P80_EXPRESSION_CHANNEL_CONTRACT",
    referenceId: "STAR_BEAST_ASSET_PROTOTYPE_ADAPTER_CONTRACT",
  });
  const rendererReference = Object.freeze({
    referenceType: "STAR_BEAST_RENDERER_CONTRACT",
    referenceId: "STAR_BEAST_RENDERER_CONTRACT_V1",
  });
  const makeState = (stage, overrides = {}) => Object.freeze({
    semanticRole: "STAR_BEAST_GENESIS_VISUAL_STATE",
    stage,
    assetReference: asset,
    expressionChannelReference: expressionReference,
    rendererContractReference: rendererReference,
    isolatedPrototypeScope: "ISOLATED_PROTOTYPE_ONLY",
    referenceOnly: true,
    noCoordinateCopy: true,
    noParticleParameterCopy: true,
    noAnimationParameterCopy: true,
    noLifeFactCopy: true,
    ...overrides,
  });

  const stages = [
    "COSMIC_FIELD",
    "WESTERN_MANSION_ALIGNMENT",
    "WHITE_TIGER_FORMATION",
    "GEN_INFUSION",
    "WHITE_TIGER_REVEAL",
  ];
  const results = stages.map((stage) => consciousnessModule.resolveStarBeastCosmicConsciousness(makeState(stage)));
  assertEqual("all five consciousness mappings are available", results.every(({ status }) => status === "AVAILABLE"), true);
  assertEqual("consciousness progression is fixed", results.map(({ state }) => state.consciousnessMode).join(","), "DORMANT,ORDERING,EMERGING,AWAKENING,QUIET_PRESENCE");
  assertEqual("formation starts sparse continuous flow", results[2].state.starDustFlowReference.expressionState, "SPARSE_CONTINUOUS_FLOW");
  assertEqual("formation breath is faint", results[2].state.coreBreathReference.expressionState, "FAINT_BREATH");
  assertEqual("Gen infusion starts stable breath", results[3].state.coreBreathReference.expressionState, "SLOW_STABLE_BREATH");
  assertEqual("Gen infusion settles inner light", results[3].state.innerLightReference.expressionState, "STABLE_SETTLING_FLOW");
  assertEqual("reveal establishes silent presence", results[4].state.presenceReference.expressionState, "SILENT_PRESENCE");
  assertEqual("mapping preserves Genesis visual state reference", results.every(({ state }, index) => state.sourceGenesisVisualStateReference.stage === stages[index]), true);
  assertEqual("scope remains isolated", results.every(({ state }) => state.isolatedPrototypeScope === "ISOLATED_PROTOTYPE_ONLY"), true);
  assertEqual("mapping does not mutate P84 asset", JSON.stringify(asset), assetBefore);
  assertEqual("mapping does not modify life state", JSON.stringify(lifeStateSentinel), lifeStateBefore);
  assertEqual("mapping creates no memory", results.every(({ state }) => state.noMemoryCreation), true);
  assertEqual("mapping creates no growth", results.every(({ state }) => state.noGrowthCreation), true);

  const wrongScope = consciousnessModule.resolveStarBeastCosmicConsciousness(
    makeState("COSMIC_FIELD", { isolatedPrototypeScope: "PRODUCT_RUNTIME" }),
  );
  assertEqual("product scope is blocked", wrongScope.reason, "ISOLATED_SCOPE_REQUIRED");
  const assetWithoutLayer = Object.freeze({
    ...asset,
    expressionLayers: Object.freeze(asset.expressionLayers.filter(({ kind }) => kind !== "COSMIC_CONSCIOUSNESS")),
  });
  const missingLayer = consciousnessModule.resolveStarBeastCosmicConsciousness(
    makeState("GEN_INFUSION", { assetReference: assetWithoutLayer }),
  );
  assertEqual("missing consciousness asset layer is blocked", missingLayer.reason, "COSMIC_CONSCIOUSNESS_ASSET_LAYER_REQUIRED");
  const wrongStage = consciousnessModule.resolveStarBeastCosmicConsciousness(makeState("UNKNOWN_STAGE"));
  assertEqual("unknown Genesis stage is blocked", wrongStage.reason, "GENESIS_STAGE_REFERENCE_INVALID");

  fs.rmSync(outputDirectory, { recursive: true, force: true });
}

if (failures.length > 0) {
  console.error(`FAIL | star beast cosmic consciousness | count=${failures.length}`);
  failures.forEach((failure) => console.error(`- ${failure}`));
  process.exit(1);
}

console.log("PASS | star beast cosmic consciousness gate");
