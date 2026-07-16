import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import process from "node:process";
import { build } from "esbuild";

const rootDir = process.cwd();
const files = Object.freeze({
  type: "src/types/starBeastGenesisVisualState.ts",
  service: "src/services/starBeastGenesisRendererPrototype.ts",
  assetService: "src/services/starBeastGenesisPrototypeAsset.ts",
  assetGate: "scripts/check-star-beast-genesis-prototype-asset.mjs",
  canvas: "src/components/StarBeastGenesisRendererPrototypeCanvas.tsx",
  page: "src/pages/StarBeastGenesisRendererSlicePreview.tsx",
  style: "src/styles/starbeast-genesis-renderer-slice.css",
  routes: "src/router/previewRoutes.ts",
  appShell: "src/components/AppShell.tsx",
  existingPreview: "src/pages/StarBeastGenesisPreview.tsx",
  launch: "src/pages/LaunchLab.tsx",
  gravity: "src/pages/GravityPage.tsx",
  lab: "src/pages/StarbeastLab.tsx",
  protocol: "docs/GUANYAO_STAR_BEAST_GENESIS_RENDERER_SLICE_PROTOCOL.md",
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
    "export type GenesisVisualStage",
    '"COSMIC_FIELD"',
    '"WESTERN_MANSION_ALIGNMENT"',
    '"WHITE_TIGER_FORMATION"',
    '"GEN_INFUSION"',
    '"WHITE_TIGER_REVEAL"',
    "export type StarBeastGenesisVisualState",
    "assetReference: StarBeastGenesisPrototypeAsset",
    "expressionChannelReference: StarBeastGenesisExpressionChannelReference",
    "rendererContractReference: StarBeastRendererContractReference",
    'isolatedPrototypeScope: "ISOLATED_PROTOTYPE_ONLY"',
    "referenceOnly: true",
    "noCoordinateCopy: true",
    "noParticleParameterCopy: true",
    "noAnimationParameterCopy: true",
    "noLifeFactCopy: true",
    "export type StarBeastGenesisRendererPrototypeInput",
    'rendererMode: "CANVAS_2D_ISOLATED_PROTOTYPE"',
    "noAssetMutation: true",
    "noLifeStateMutation: true",
  ].forEach((marker) => assertIncludes("genesis visual state contract", source.type, marker));

  ["x: number", "y: number", "particleDensity", "durationMs", "birthDate", "motherCode"].forEach(
    (marker) => assertExcludes("visual state keeps references only", source.type, marker),
  );

  [
    "export function resolveStarBeastGenesisRendererPrototype",
    "GENESIS_STAGE_MAPPING",
    'field: "DEEP_SPACE_WITH_FAINT_LIGHT"',
    'mansionVisibility: "HIDDEN"',
    'field: "WESTERN_SEVEN_MANSION_ORDER"',
    'mansionVisibility: "SEVEN_NODES"',
    'symbolicFormVisibility: "HIDDEN"',
    'field: "STAR_BONE_LIFE_STRUCTURE"',
    'beastPresence: "LIFE_STRUCTURE_ONLY"',
    'field: "GEN_STABLE_FORCE_FIELD"',
    'lifeForcePresence: "STABLE_CORE"',
    'field: "QUIET_WHITE_TIGER_PRESENCE"',
    'beastPresence: "QUIET_WATCHING_PRESENCE"',
    "noCombatPose: true",
    "noTrigramText: true",
    "noAssetCreation: true",
    "noLifeJudgment: true",
    "noAssetMutation: true",
    "STAR_BEAST_GENESIS_STAGE_ORDER",
  ].forEach((marker) => assertIncludes("genesis stage adapter", source.service, marker));

  [
    "resolveWhiteTigerGenGenesisPrototypeAsset(",
    "resolveLifeArchetypeProfileFromMotherCode",
    "localStorage",
    "sessionStorage",
    "fetch(",
    "requestAnimationFrame",
    "getContext(",
    "CanvasRenderingContext",
    "WebGL",
    'from "three"',
    'from "react"',
  ].forEach((marker) => assertExcludes("adapter stays mapping-only", source.service, marker));

  [
    "StarBeastGenesisRendererPrototypeInput",
    'canvas.getContext("2d")',
    "window.requestAnimationFrame(draw)",
    "drawTigerPresence",
    "if (stageDepth >= 4)",
    "MANSION_POINTS",
    "MANSION_CONNECTIONS",
  ].forEach((marker) => assertIncludes("isolated Canvas prototype", source.canvas, marker));
  [
    "StarBeastGenesisPrototypeAsset",
    "resolveWhiteTigerGenGenesisPrototypeAsset",
    "LifeArchetypeProfile",
    "MotherCode",
    "fourSymbol",
    "localStorage",
    "sessionStorage",
    "WebGL",
    "THREE",
    'from "three"',
  ].forEach((marker) => assertExcludes("Canvas consumes P85 input only", source.canvas, marker));

  [
    "resolveWhiteTigerGenGenesisPrototypeAsset",
    "resolveStarBeastGenesisRendererPrototype",
    "StarBeastGenesisRendererPrototypeCanvas",
    'data-prototype-scope="ISOLATED_PROTOTYPE_ONLY"',
    "STAR_BEAST_GENESIS_STAGE_ORDER",
    "轻触，继续显化",
    "非最终视觉资产",
  ].forEach((marker) => assertIncludes("isolated preview composes the slice", source.page, marker));
  ["localStorage", "sessionStorage", "fetch(", "WebGL", 'from "three"'].forEach((marker) =>
    assertExcludes("isolated preview stays local", source.page, marker),
  );

  [
    "STAR_BEAST_GENESIS_RENDERER_SLICE_PREVIEW_ROUTE",
    '"/starbeast-genesis-renderer-slice-preview"',
    "createElement(StarBeastGenesisRendererSlicePreview)",
  ].forEach((marker) => assertIncludes("isolated preview route", source.routes, marker));
  assertIncludes(
    "isolated preview bypasses product shell",
    source.appShell,
    'location.pathname === "/starbeast-genesis-renderer-slice-preview"',
  );

  ["launch", "gravity", "lab", "existingPreview"].forEach((name) => {
    assertExcludes("existing surfaces remain disconnected", source[name], "StarBeastGenesisRendererPrototypeCanvas");
    assertExcludes("existing surfaces remain disconnected", source[name], "resolveStarBeastGenesisRendererPrototype");
  });

  [
    "RC-STAR-BEAST-GENESIS-RENDERER-SLICE-P85",
    "GenesisVisualState → GenesisRendererPrototypeInput → Isolated Prototype Renderer",
    "不复制坐标、粒子参数、动画参数或生命事实",
    "不伪造 P80 Available 结果",
    "COSMIC_FIELD",
    "WESTERN_MANSION_ALIGNMENT",
    "WHITE_TIGER_FORMATION",
    "GEN_INFUSION",
    "WHITE_TIGER_REVEAL",
    "禁止直接出现兽形",
    "不是动物轮廓",
    "禁止用文字解释乾坤艮",
    "禁止战斗姿态",
    "Canvas 内部可以拥有绘制坐标",
    "禁止 WebGL、Three.js、3D 模型、毛发系统与写实动物",
    "/starbeast-genesis-renderer-slice-preview",
  ].forEach((marker) => assertIncludes("genesis renderer slice protocol", source.protocol, marker));

  assertIncludes("type index exports visual state", source.typeIndex, "StarBeastGenesisVisualState");
  assertIncludes("type index exports prototype input", source.typeIndex, "StarBeastGenesisRendererPrototypeInput");
  assertIncludes(
    "P84 gate allows only isolated P85 consumption",
    source.assetGate,
    "asset resolver is consumed only by the isolated P85 preview",
  );
  assertIncludes(
    "renderer slice gate registered",
    packageJson.scripts?.["check:star-beast-genesis-renderer-slice"] ?? "",
    "node scripts/check-star-beast-genesis-renderer-slice.mjs",
  );
  assertIncludes(
    "renderer slice gate participates in release",
    packageJson.scripts?.["postcheck:release"] ?? "",
    "npm run check:star-beast-genesis-renderer-slice",
  );

  const collectTypeScript = (directoryPath) =>
    fs.readdirSync(directoryPath, { withFileTypes: true }).flatMap((entry) => {
      const entryPath = path.join(directoryPath, entry.name);
      if (entry.isDirectory()) return collectTypeScript(entryPath);
      return /\.tsx?$/.test(entry.name) ? [entryPath] : [];
    });
  const resolverCallSites = collectTypeScript(path.join(rootDir, "src"))
    .filter((filePath) => fs.readFileSync(filePath, "utf8").includes("resolveStarBeastGenesisRendererPrototype("))
    .map((filePath) => path.relative(rootDir, filePath))
    .sort();
  assertEqual(
    "P85 adapter is consumed only by isolated preview",
    resolverCallSites.join(","),
    [files.page, files.service].sort().join(","),
  );

  const outputDirectory = path.join(os.tmpdir(), `guanyao-genesis-renderer-slice-${process.pid}`);
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
  const rendererModule = await import(`file://${path.join(outputDirectory, "starBeastGenesisRendererPrototype.js")}?t=${Date.now()}`);

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

  const stageOrder = rendererModule.STAR_BEAST_GENESIS_STAGE_ORDER;
  assertEqual("Genesis stage order is fixed", stageOrder.join(","), "COSMIC_FIELD,WESTERN_MANSION_ALIGNMENT,WHITE_TIGER_FORMATION,GEN_INFUSION,WHITE_TIGER_REVEAL");
  const results = stageOrder.map((stage) => rendererModule.resolveStarBeastGenesisRendererPrototype(makeState(stage)));
  assertEqual("all five stages are available", results.every(({ status }) => status === "AVAILABLE"), true);
  assertEqual("cosmic field has no beast", results[0].input.stageExpressionReference.beastPresence, "ABSENT");
  assertEqual("mansion alignment reveals seven nodes", results[1].input.stageExpressionReference.mansionVisibility, "SEVEN_NODES");
  assertEqual("mansion alignment has no beast form", results[1].input.stageExpressionReference.symbolicFormVisibility, "HIDDEN");
  assertEqual("white tiger formation is structure only", results[2].input.stageExpressionReference.beastPresence, "LIFE_STRUCTURE_ONLY");
  assertEqual("Gen infusion follows formation", results[3].input.stageExpressionReference.lifeForcePresence, "STABLE_CORE");
  assertEqual("Gen infusion has no trigram text", results[3].input.stageExpressionReference.noTrigramText, true);
  assertEqual("reveal is quiet presence", results[4].input.stageExpressionReference.beastPresence, "QUIET_WATCHING_PRESENCE");
  assertEqual("reveal forbids combat pose", results[4].input.stageExpressionReference.noCombatPose, true);
  assertEqual("renderer does not mutate P84 asset", JSON.stringify(asset), assetBefore);
  assertEqual("prototype input preserves P84 reference", results.every(({ input }) => input.visualStateReference.assetReference === asset), true);
  assertEqual("scope remains isolated", results.every(({ input }) => input.isolatedPrototypeScope === "ISOLATED_PROTOTYPE_ONLY"), true);
  assertEqual("prototype input forbids life mutation", results.every(({ input }) => input.noLifeStateMutation), true);

  const wrongScope = rendererModule.resolveStarBeastGenesisRendererPrototype(makeState("COSMIC_FIELD", { isolatedPrototypeScope: "PRODUCT_RUNTIME" }));
  assertEqual("product scope is blocked", wrongScope.reason, "ISOLATED_SCOPE_REQUIRED");
  const wrongP80 = rendererModule.resolveStarBeastGenesisRendererPrototype(makeState("COSMIC_FIELD", {
    expressionChannelReference: Object.freeze({ referenceType: "P80_EXPRESSION_CHANNEL_CONTRACT", referenceId: "DRIFTED" }),
  }));
  assertEqual("P80 reference drift is blocked", wrongP80.reason, "P80_EXPRESSION_CHANNEL_REFERENCE_INVALID");
  const wrongStage = rendererModule.resolveStarBeastGenesisRendererPrototype(makeState("UNKNOWN_STAGE"));
  assertEqual("unknown stage is blocked", wrongStage.reason, "GENESIS_STAGE_REFERENCE_INVALID");
  fs.rmSync(outputDirectory, { recursive: true, force: true });
}

if (failures.length > 0) {
  console.error(`FAIL | star beast genesis renderer slice | count=${failures.length}`);
  failures.forEach((failure) => console.error(`- ${failure}`));
  process.exit(1);
}

console.log("PASS | star beast genesis renderer slice gate");
