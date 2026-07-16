import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import process from "node:process";
import { build } from "esbuild";

const rootDir = process.cwd();
const files = Object.freeze({
  type: "src/types/starBeastGenesisPrototypeAsset.ts",
  service: "src/services/starBeastGenesisPrototypeAsset.ts",
  protocol: "docs/GUANYAO_WHITE_TIGER_GENESIS_ASSET_PROTOCOL.md",
  existingP84: "docs/GUANYAO_STAR_BEAST_PROTOTYPE_RENDERER_EXECUTION_READINESS_PROTOCOL.md",
  typeIndex: "src/types/index.ts",
  app: "src/App.tsx",
  launch: "src/pages/LaunchLab.tsx",
  gravity: "src/pages/GravityPage.tsx",
  lab: "src/pages/StarbeastLab.tsx",
  genesisPreview: "src/pages/StarBeastGenesisPreview.tsx",
  rendererSlicePreview: "src/pages/StarBeastGenesisRendererSlicePreview.tsx",
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
    "export type StarBeastGenesisPrototypeAsset",
    'protocolVersion: "RC-STAR-BEAST-GENESIS-PROTOTYPE-ASSET-P84"',
    'identity: "WHITE_TIGER_GENGENESIS"',
    'origin: "WESTERN_SEVEN_MANSIONS"',
    'symbolicForm: "WHITE_TIGER"',
    'lifeArchetype: "GEN"',
    '"MANSION_BONE"',
    '"FOUR_SYMBOL_FORM"',
    '"LIFE_FORCE_CORE"',
    '"COSMIC_CONSCIOUSNESS"',
    '"CRYSTAL_READINESS"',
    '"COSMIC_FIELD"',
    '"WESTERN_MANSION_ALIGNMENT"',
    '"WHITE_TIGER_FORMATION"',
    '"GEN_INFUSION"',
    '"WHITE_TIGER_REVEAL"',
    "mansionToFourSymbolIdentity: true",
    "motherCodeToLifeArchetype: true",
    "fourSymbolToLifeArchetype: false",
    "independentSourcesMergeAtAsset: true",
    "assetDefinitionOnly: true",
    "noRendererInvocation: true",
    "noCanvasInvocation: true",
    "noUIIntegration: true",
    "noRuntimeIntegration: true",
    "noStorageWrite: true",
  ].forEach((marker) => assertIncludes("genesis prototype asset type", source.type, marker));

  [
    "export function resolveWhiteTigerGenGenesisPrototypeAsset",
    'profile.source === "mother_code_profile"',
    'profile.code === "GEN"',
    'profile.trigram === "艮"',
    'westernMansion.direction !== "西"',
    'westernMansion.fourSymbol !== "白虎"',
    'identity: "WHITE_TIGER_GENGENESIS"',
    'formation: "SEVEN_MANSION_LIFE_STRUCTURE"',
    'force: "GEN_STABLE_WATCHING_FORCE"',
    "fourSymbolToLifeArchetype: false",
    "Object.freeze({",
  ].forEach((marker) => assertIncludes("white tiger Gen asset resolver", source.service, marker));

  [
    "resolveLifeArchetypeProfileFromMotherCode",
    "resolveStarBeastAssetDefinition",
    'from "../pages',
    'from "../runtime',
    'from "../components',
    "localStorage",
    "sessionStorage",
    "fetch(",
    "requestAnimationFrame",
    "getContext(",
    "CanvasRenderingContext",
    "WebGL",
    'from "three"',
    'from "react"',
  ].forEach((marker) => assertExcludes("asset resolver stays definition-only", source.service, marker));

  [
    "RC-STAR-BEAST-GENESIS-PROTOTYPE-ASSET-P84",
    "StarBeastGenesisPrototypeAsset",
    "艮之白虎 Genesis Prototype",
    "西方七宿星骨不是动物轮廓、动物线稿或白虎图片",
    "古老、稳定、秩序",
    "宇宙守望生命",
    "安静、威严、守护与在场",
    "山岳稳定、边界光与沉稳内核",
    "MotherCodeProfile → LifeArchetypeProfile",
    "禁止以白虎、四象方位或星宿反推艮",
    "五层表达资产",
    "Genesis 五阶段",
    "不执行动画，不产生像素，不调用 Renderer",
    "不代表替代或覆盖",
    "RC-STAR-BEAST-PROTOTYPE-RENDERER-EXECUTION-READINESS-P84",
  ].forEach((marker) => assertIncludes("white tiger genesis asset protocol", source.protocol, marker));

  assertIncludes(
    "existing P84 renderer readiness remains intact",
    source.existingP84,
    "RC-STAR-BEAST-PROTOTYPE-RENDERER-EXECUTION-READINESS-P84",
  );
  assertIncludes("type index exports genesis prototype asset", source.typeIndex, "StarBeastGenesisPrototypeAsset");
  assertIncludes("type index exports Gen profile", source.typeIndex, "GenLifeArchetypeProfile");

  ["app", "launch", "gravity", "lab", "genesisPreview"].forEach((name) => {
    assertExcludes("existing product surfaces remain disconnected", source[name], "resolveWhiteTigerGenGenesisPrototypeAsset");
    assertExcludes("existing product surfaces remain disconnected", source[name], "StarBeastGenesisPrototypeAsset");
  });

  const collectTypeScript = (directoryPath) =>
    fs.readdirSync(directoryPath, { withFileTypes: true }).flatMap((entry) => {
      const entryPath = path.join(directoryPath, entry.name);
      if (entry.isDirectory()) return collectTypeScript(entryPath);
      return /\.tsx?$/.test(entry.name) ? [entryPath] : [];
    });
  const callSites = collectTypeScript(path.join(rootDir, "src"))
    .filter((filePath) => fs.readFileSync(filePath, "utf8").includes("resolveWhiteTigerGenGenesisPrototypeAsset("))
    .map((filePath) => path.relative(rootDir, filePath))
    .sort();
  assertEqual(
    "asset resolver is consumed only by the isolated P85 preview",
    callSites.join(","),
    [files.rendererSlicePreview, files.service].sort().join(","),
  );

  assertIncludes(
    "genesis prototype asset gate registered",
    packageJson.scripts?.["check:star-beast-genesis-prototype-asset"] ?? "",
    "node scripts/check-star-beast-genesis-prototype-asset.mjs",
  );
  assertIncludes(
    "genesis prototype asset gate participates in release",
    packageJson.scripts?.["postcheck:release"] ?? "",
    "npm run check:star-beast-genesis-prototype-asset",
  );

  const modulePath = path.join(os.tmpdir(), `guanyao-star-beast-genesis-prototype-asset-${process.pid}.mjs`);
  await build({
    entryPoints: [absolute.service],
    outfile: modulePath,
    bundle: true,
    platform: "node",
    format: "esm",
    target: "node20",
    logLevel: "silent",
  });
  const { resolveWhiteTigerGenGenesisPrototypeAsset } = await import(`file://${modulePath}?t=${Date.now()}`);

  const makeMansion = (overrides = {}) => Object.freeze({
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
    ...overrides,
  });
  const makeProfile = (overrides = {}) => Object.freeze({
    source: "mother_code_profile",
    sourceMotherCodeId: "mother-gen-watcher",
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
    ...overrides,
  });

  const mansion = makeMansion();
  const profile = makeProfile();
  const input = Object.freeze({ westernMansionReference: mansion, lifeArchetypeProfileReference: profile });
  const before = JSON.stringify(input);
  const available = resolveWhiteTigerGenGenesisPrototypeAsset(input);
  assertEqual("valid independent sources make asset available", available.status, "AVAILABLE");
  assertEqual("asset identity is fixed", available.asset.identity, "WHITE_TIGER_GENGENESIS");
  assertEqual("asset origin is western seven mansions", available.asset.origin, "WESTERN_SEVEN_MANSIONS");
  assertEqual("asset symbolic form is white tiger", available.asset.symbolicForm, "WHITE_TIGER");
  assertEqual("asset life archetype is Gen", available.asset.lifeArchetype, "GEN");
  assertEqual("mansion reference is preserved", available.asset.sourceReferences.westernMansionReference === mansion, true);
  assertEqual("Gen profile reference is preserved", available.asset.sourceReferences.lifeArchetypeProfileReference === profile, true);
  assertEqual("five expression layers are fixed", available.asset.expressionLayers.map(({ kind }) => kind).join(","), "MANSION_BONE,FOUR_SYMBOL_FORM,LIFE_FORCE_CORE,COSMIC_CONSCIOUSNESS,CRYSTAL_READINESS");
  assertEqual("five genesis stages are fixed", available.asset.genesisStages.map(({ stage }) => stage).join(","), "COSMIC_FIELD,WESTERN_MANSION_ALIGNMENT,WHITE_TIGER_FORMATION,GEN_INFUSION,WHITE_TIGER_REVEAL");
  assertEqual("all layers reject independent animal assets", available.asset.expressionLayers.every(({ notAnimalAsset }) => notAnimalAsset), true);
  assertEqual("four symbol cannot infer archetype", available.asset.sourceBoundary.fourSymbolToLifeArchetype, false);
  assertEqual("asset is definition-only", available.asset.boundary.assetDefinitionOnly, true);
  assertEqual("input is not mutated", JSON.stringify(input), before);
  assertEqual(
    "asset definition is immutable",
    Object.isFrozen(available.asset) &&
      Object.isFrozen(available.asset.sourceReferences) &&
      Object.isFrozen(available.asset.westernMansionBone) &&
      Object.isFrozen(available.asset.expressionLayers) &&
      Object.isFrozen(available.asset.genesisStages) &&
      Object.isFrozen(available.asset.sourceBoundary) &&
      Object.isFrozen(available.asset.boundary),
    true,
  );

  const wrongMansion = resolveWhiteTigerGenGenesisPrototypeAsset(Object.freeze({
    westernMansionReference: makeMansion({ mansion: "角" }),
    lifeArchetypeProfileReference: profile,
  }));
  assertEqual("non-western mansion is blocked", wrongMansion.reason, "WESTERN_MANSION_SOURCE_INVALID");

  const wrongSymbol = resolveWhiteTigerGenGenesisPrototypeAsset(Object.freeze({
    westernMansionReference: makeMansion({ fourSymbol: "青龙" }),
    lifeArchetypeProfileReference: profile,
  }));
  assertEqual("non-white-tiger source is blocked", wrongSymbol.reason, "WHITE_TIGER_SOURCE_INVALID");

  const wrongArchetype = resolveWhiteTigerGenGenesisPrototypeAsset(Object.freeze({
    westernMansionReference: mansion,
    lifeArchetypeProfileReference: makeProfile({ code: "QIAN", trigram: "乾" }),
  }));
  assertEqual("white tiger cannot infer Gen", wrongArchetype.reason, "GEN_LIFE_ARCHETYPE_SOURCE_INVALID");
  assertEqual("blocked source creates no asset", wrongArchetype.noAsset, true);
  fs.rmSync(modulePath, { force: true });
}

if (failures.length > 0) {
  console.error(`FAIL | star beast genesis prototype asset | count=${failures.length}`);
  failures.forEach((failure) => console.error(`- ${failure}`));
  process.exit(1);
}

console.log("PASS | star beast genesis prototype asset gate");
