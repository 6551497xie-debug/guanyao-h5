import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import process from "node:process";
import { build } from "esbuild";

const rootDir = process.cwd();
const files = Object.freeze({
  type: "src/types/starBeastStellarFlesh.ts",
  service: "src/services/starBeastStellarFleshMapping.ts",
  consciousnessService: "src/services/starBeastCosmicConsciousnessMapping.ts",
  assetService: "src/services/starBeastGenesisPrototypeAsset.ts",
  canvas: "src/components/StarBeastGenesisRendererPrototypeCanvas.tsx",
  page: "src/pages/StarBeastGenesisRendererSlicePreview.tsx",
  protocol: "docs/GUANYAO_STAR_BEAST_STELLAR_FLESH_LAYER_PROTOCOL.md",
  consciousnessGate: "scripts/check-star-beast-cosmic-consciousness.mjs",
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
    "export type StarBeastStellarFleshState",
    "fleshMode: StarBeastStellarFleshMode",
    "densityReference: StarBeastStellarFleshDensityReference",
    "innerFieldReference: StarBeastStellarFleshInnerFieldReference",
    "boundaryFieldReference: StarBeastStellarFleshBoundaryFieldReference",
    "consciousnessReference: StarBeastCosmicConsciousnessState",
    "presenceReference: StarBeastPresenceReference",
    'isolatedPrototypeScope: "ISOLATED_PROTOTYPE_ONLY"',
    "expressionReferenceOnly: true",
    "noVisualFactCopy: true",
    "noSourceInference: true",
    "noAssetMutation: true",
    "noGenesisStateMutation: true",
    "noLifeStateMutation: true",
    "noRendererContractMutation: true",
    "noMemoryCreation: true",
  ].forEach((marker) => assertIncludes("Stellar Flesh state contract", source.type, marker));

  ["x: number", "y: number", "particleDensity", "particleCount", "opacity", "color", "durationMs", "birthDate", "fourSymbol", "motherCode"].forEach(
    (marker) => assertExcludes("Stellar Flesh state keeps references only", source.type, marker),
  );

  [
    "export function resolveStarBeastStellarFlesh",
    "STELLAR_FLESH_CONSCIOUSNESS_MAPPING",
    'fleshMode: "DORMANT"',
    'fleshMode: "SEEDING"',
    'fleshMode: "THIN_FIELD"',
    'fleshMode: "SETTLING_FIELD"',
    'fleshMode: "STABLE_LIVING_FIELD"',
    'expressionState: "SPARSE_LAYERED"',
    'expressionState: "STABLE_TRANSLUCENT_FIELD"',
    "consciousnessReference.presenceReference",
    "noSourceInference: true",
    "noAssetMutation: true",
    "noGenesisStateMutation: true",
    "noLifeStateMutation: true",
    "noRendererContractMutation: true",
    "noMemoryCreation: true",
  ].forEach((marker) => assertIncludes("Stellar Flesh mapping", source.service, marker));

  [
    "TwentyEightMansion",
    "FourSymbol",
    "LifeArchetype",
    "MotherCode",
    "StarBeastGenesisPrototypeAsset",
    "StarBeastGenesisVisualState",
    "StarBeastRendererContract",
    "resolveStarBeastCosmicConsciousness",
    "requestAnimationFrame",
    "CanvasRenderingContext",
    "localStorage",
    "sessionStorage",
    'from "react"',
    'from "three"',
  ].forEach((marker) => assertExcludes("mapping has no source inference or rendering", source.service, marker));

  [
    "StarBeastStellarFleshState",
    "drawStellarFleshField",
    "STELLAR_FLESH_POINTS",
    "stellarFleshState.innerFieldReference.expressionState",
    "stellarFleshState.fleshMode",
    'data-stellar-flesh-mode={stellarFleshState.fleshMode}',
    "createRadialGradient",
    "ctx.clip(createTigerBoundary())",
  ].forEach((marker) => assertIncludes("Canvas consumes Stellar Flesh expressions", source.canvas, marker));

  [
    "starBeastStellarFleshMapping",
    "resolveStarBeastStellarFlesh",
    "TwentyEightMansion",
    "FourSymbol",
    "LifeArchetypeProfile",
    "StarBeastGenesisPrototypeAsset",
    "localStorage",
    "sessionStorage",
    "WebGL",
    "Shader",
    "THREE",
    'from "three"',
  ].forEach((marker) => assertExcludes("Canvas does not map or read source facts", source.canvas, marker));

  [
    "resolveStarBeastStellarFlesh",
    "stellarFlesh.status",
    "stellarFleshState={model.stellarFlesh.state}",
    "data-stellar-flesh-mode={model.stellarFlesh.state.fleshMode}",
    'data-prototype-scope="ISOLATED_PROTOTYPE_ONLY"',
  ].forEach((marker) => assertIncludes("isolated preview composes P87", source.page, marker));

  ["localStorage", "sessionStorage", "fetch(", "WebGL", "Shader", 'from "three"'].forEach((marker) =>
    assertExcludes("isolated preview remains local", source.page, marker),
  );

  [
    "RC-STAR-BEAST-STELLAR-FLESH-LAYER-P87",
    "CosmicConsciousnessState → StellarFleshState → Isolated Prototype Renderer",
    "星辰秩序聚合后形成的半透明生命场",
    "不是填满轮廓",
    "空间厚度不是 3D 模型",
    "内部沉积、缓慢流动与稳定边界",
    "唯一来源是 `CosmicConsciousnessState`",
    "不得修改 P84 Genesis Asset、Genesis State、Life State 或 Renderer Contract",
    "不得创建 Memory、Growth、Crystal 或用户画像",
    "ISOLATED_PROTOTYPE_ONLY",
  ].forEach((marker) => assertIncludes("Stellar Flesh protocol", source.protocol, marker));

  assertIncludes("type index exports Stellar Flesh state", source.typeIndex, "StarBeastStellarFleshState");
  assertIncludes(
    "P86 ownership gate allows isolated P87",
    source.consciousnessGate,
    "product surfaces do not consume the isolated P86/P87 chain",
  );
  assertIncludes(
    "P87 gate registered",
    packageJson.scripts?.["check:star-beast-stellar-flesh-layer"] ?? "",
    "node scripts/check-star-beast-stellar-flesh-layer.mjs",
  );
  assertIncludes(
    "P87 gate participates in release",
    packageJson.scripts?.["postcheck:release"] ?? "",
    "npm run check:star-beast-stellar-flesh-layer",
  );

  const collectTypeScript = (directoryPath) =>
    fs.readdirSync(directoryPath, { withFileTypes: true }).flatMap((entry) => {
      const entryPath = path.join(directoryPath, entry.name);
      if (entry.isDirectory()) return collectTypeScript(entryPath);
      return /\.tsx?$/.test(entry.name) ? [entryPath] : [];
    });
  const resolverCallSites = collectTypeScript(path.join(rootDir, "src"))
    .filter((filePath) => fs.readFileSync(filePath, "utf8").includes("resolveStarBeastStellarFlesh("))
    .map((filePath) => path.relative(rootDir, filePath))
    .sort();
  assertEqual(
    "P87 mapping is consumed only by isolated preview",
    resolverCallSites.join(","),
    [files.page, files.service].sort().join(","),
  );

  const allowedFiles = Object.freeze([
    absolute.page,
    absolute.service,
    absolute.type,
    absolute.canvas,
    absolute.typeIndex,
  ]);
  const productSurfaceReferences = collectTypeScript(path.join(rootDir, "src"))
    .filter((filePath) => !allowedFiles.includes(filePath))
    .filter((filePath) => fs.readFileSync(filePath, "utf8").includes("StarBeastStellarFlesh"))
    .map((filePath) => path.relative(rootDir, filePath));
  assertEqual("product surfaces do not consume P87", productSurfaceReferences.join(","), "");

  const outputDirectory = path.join(os.tmpdir(), `guanyao-stellar-flesh-${process.pid}`);
  await build({
    entryPoints: [absolute.assetService, absolute.consciousnessService, absolute.service],
    outdir: outputDirectory,
    bundle: true,
    platform: "node",
    format: "esm",
    target: "node20",
    logLevel: "silent",
  });
  const assetModule = await import(`file://${path.join(outputDirectory, "starBeastGenesisPrototypeAsset.js")}?t=${Date.now()}`);
  const consciousnessModule = await import(`file://${path.join(outputDirectory, "starBeastCosmicConsciousnessMapping.js")}?t=${Date.now()}`);
  const stellarFleshModule = await import(`file://${path.join(outputDirectory, "starBeastStellarFleshMapping.js")}?t=${Date.now()}`);

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
  const expressionReference = Object.freeze({
    referenceType: "P80_EXPRESSION_CHANNEL_CONTRACT",
    referenceId: "STAR_BEAST_ASSET_PROTOTYPE_ADAPTER_CONTRACT",
  });
  const rendererReference = Object.freeze({
    referenceType: "STAR_BEAST_RENDERER_CONTRACT",
    referenceId: "STAR_BEAST_RENDERER_CONTRACT_V1",
  });
  const makeGenesisState = (stage) => Object.freeze({
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
  });

  const stages = ["COSMIC_FIELD", "WESTERN_MANSION_ALIGNMENT", "WHITE_TIGER_FORMATION", "GEN_INFUSION", "WHITE_TIGER_REVEAL"];
  const genesisStates = stages.map(makeGenesisState);
  const genesisBefore = JSON.stringify(genesisStates);
  const rendererContractBefore = JSON.stringify(rendererReference);
  const consciousnessResults = genesisStates.map((state) => consciousnessModule.resolveStarBeastCosmicConsciousness(state));
  const results = consciousnessResults.map(({ state }) => stellarFleshModule.resolveStarBeastStellarFlesh(state));

  assertEqual("all five Stellar Flesh mappings are available", results.every(({ status }) => status === "AVAILABLE"), true);
  assertEqual("Stellar Flesh progression is fixed", results.map(({ state }) => state.fleshMode).join(","), "DORMANT,SEEDING,THIN_FIELD,SETTLING_FIELD,STABLE_LIVING_FIELD");
  assertEqual("formation begins thin field", results[2].state.innerFieldReference.expressionState, "EMERGING_TRANSLUCENT_FIELD");
  assertEqual("Gen infusion settles layered density", results[3].state.densityReference.expressionState, "SETTLING_LAYERED");
  assertEqual("reveal keeps stable translucent field", results[4].state.innerFieldReference.expressionState, "STABLE_TRANSLUCENT_FIELD");
  assertEqual("source is the exact consciousness state", results.every(({ state }, index) => state.consciousnessReference === consciousnessResults[index].state), true);
  assertEqual("Presence remains the consciousness reference", results.every(({ state }, index) => state.presenceReference === consciousnessResults[index].state.presenceReference), true);
  assertEqual("scope remains isolated", results.every(({ state }) => state.isolatedPrototypeScope === "ISOLATED_PROTOTYPE_ONLY"), true);
  assertEqual("mapping does not mutate Genesis Asset", JSON.stringify(asset), assetBefore);
  assertEqual("mapping does not mutate Genesis State", JSON.stringify(genesisStates), genesisBefore);
  assertEqual("mapping does not mutate Renderer Contract", JSON.stringify(rendererReference), rendererContractBefore);
  assertEqual("mapping creates no Memory", results.every(({ state }) => state.noMemoryCreation), true);

  const invalidSource = stellarFleshModule.resolveStarBeastStellarFlesh(Object.freeze({
    ...consciousnessResults[0].state,
    semanticRole: "DRIFTED_CONSCIOUSNESS_STATE",
  }));
  assertEqual("invalid consciousness source is blocked", invalidSource.reason, "COSMIC_CONSCIOUSNESS_SOURCE_INVALID");
  const wrongScope = stellarFleshModule.resolveStarBeastStellarFlesh(Object.freeze({
    ...consciousnessResults[0].state,
    isolatedPrototypeScope: "PRODUCT_RUNTIME",
  }));
  assertEqual("product scope is blocked", wrongScope.reason, "ISOLATED_SCOPE_REQUIRED");
  const wrongMode = stellarFleshModule.resolveStarBeastStellarFlesh(Object.freeze({
    ...consciousnessResults[0].state,
    consciousnessMode: "UNKNOWN_MODE",
  }));
  assertEqual("unknown consciousness mode is blocked", wrongMode.reason, "CONSCIOUSNESS_MODE_INVALID");

  fs.rmSync(outputDirectory, { recursive: true, force: true });
}

if (failures.length > 0) {
  console.error(`FAIL | star beast Stellar Flesh layer | count=${failures.length}`);
  failures.forEach((failure) => console.error(`- ${failure}`));
  process.exit(1);
}

console.log("PASS | star beast Stellar Flesh layer gate");
