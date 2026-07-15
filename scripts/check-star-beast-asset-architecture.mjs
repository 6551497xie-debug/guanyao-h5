import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import process from "node:process";
import { build } from "esbuild";

const rootDir = process.cwd();
const files = Object.freeze({
  type: "src/types/starBeastAssetArchitecture.ts",
  service: "src/services/starBeastAssetArchitectureMapping.ts",
  protocol: "docs/GUANYAO_STAR_BEAST_ASSET_ARCHITECTURE_PROTOCOL.md",
  typeIndex: "src/types/index.ts",
  lab: "src/pages/StarbeastLab.tsx",
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
  const typeSource = fs.readFileSync(absolute.type, "utf8");
  const serviceSource = fs.readFileSync(absolute.service, "utf8");
  const protocolSource = fs.readFileSync(absolute.protocol, "utf8");
  const typeIndexSource = fs.readFileSync(absolute.typeIndex, "utf8");
  const labSource = fs.readFileSync(absolute.lab, "utf8");
  const packageJson = JSON.parse(fs.readFileSync(absolute.packageManifest, "utf8"));

  [
    "export type StarBeastAssetDefinition",
    'semanticRole: "STAR_BEAST_ASSET_DEFINITION"',
    "identity: StarBeastAssetIdentityReference",
    "archetype: StarBeastAssetArchetypeReference",
    "visualLayers: readonly StarBeastVisualLayer[]",
    "coreSystem: Readonly<",
    "patternSystem: Readonly<",
    "boundarySystem: Readonly<",
    "consciousnessSystem: Readonly<",
    "crystalSystem: Readonly<",
    "rendererConsumable: true",
    "visualReferenceOnly: true",
    "noFourSymbolInference: true",
    "noLifeStateMutation: true",
    "noImageGeneration: true",
    "noModelGeneration: true",
    "noRendererCreation: true",
  ].forEach((marker) => assertIncludes("asset definition type", typeSource, marker));

  [
    '"CORE_BONE"',
    '"STAR_CORE"',
    '"STAR_PATTERN"',
    '"LIGHT_BOUNDARY"',
    '"COSMIC_CONSCIOUSNESS"',
    '"CRYSTAL_IMPRINT"',
  ].forEach((marker) => assertIncludes("six visual layers", typeSource, marker));

  [
    "export function resolveStarBeastAssetDefinition",
    "lifeArchetypeProfile: LifeArchetypeProfile",
    "): StarBeastAssetArchitectureResult",
    'lifeArchetypeProfile.code !== "QIAN"',
    'assetDefinitionId: "STAR_BEAST_ASSET_QIAN_V1"',
    'structureDirection: "UPWARD_OUTWARD"',
    'boneLogic: "RADIANT_LOAD_BEARING_AXIS"',
    'patternLogic: "CENTER_TO_PERIPHERY_ASCENDING"',
    'lightFlowDirection: "RADIAL_ASCENDING"',
    'presenceSource: "CRYSTAL_REFERENCE_ONLY"',
    "sourceProfileReference: lifeArchetypeProfile",
    "Object.freeze({",
  ].forEach((marker) => assertIncludes("LifeArchetype drives Qian asset definition", serviceSource, marker));

  [
    "fourSymbol",
    "StarbeastDerivation",
    "MotherCode",
    "Hexagram",
    "StarBeastVisualState",
    "StarBeastRenderPlan",
    "RendererInput",
    "localStorage",
    "sessionStorage",
    "fetch(",
    "requestAnimationFrame",
    "performance.now",
    "getContext(",
    "CanvasRenderingContext",
    "WebGL",
    'from "three"',
    'from "react"',
  ].forEach((marker) => assertExcludes("asset mapping stays semantic-only", serviceSource, marker));

  [
    "StarBeastAssetDefinition",
    "resolveStarBeastAssetDefinition",
    "starBeastAssetArchitectureMapping",
  ].forEach((marker) => assertExcludes("StarbeastLab remains unchanged and disconnected", labSource, marker));

  const mappingCallSites = [];
  const collect = (directoryPath) => {
    for (const entry of fs.readdirSync(directoryPath, { withFileTypes: true })) {
      const entryPath = path.join(directoryPath, entry.name);
      if (entry.isDirectory()) collect(entryPath);
      else if (/\.tsx?$/.test(entry.name)) {
        const source = fs.readFileSync(entryPath, "utf8");
        if (source.includes("resolveStarBeastAssetDefinition(")) {
          mappingCallSites.push(path.relative(rootDir, entryPath));
        }
      }
    }
  };
  collect(path.join(rootDir, "src"));
  assertEqual(
    "asset mapping has no runtime or UI consumer",
    mappingCallSites.join(","),
    files.service,
  );

  [
    "RC-STAR-BEAST-ASSET-ARCHITECTURE-P77",
    "StarBeastAssetDefinition",
    "它不是星座、图标、宠物、动物模型或游戏角色",
    "宇宙生命体",
    "六层视觉结构",
    "骨承载生命结构",
    "魂由星核与意识显化",
    "忆由 Crystal 与生命纹理留下",
    "当前概念图仅作为 Visual Reference",
    "不是像素复刻目标",
    "LifeArchetypeProfile",
    "不得读取或经过 fourSymbol",
    "乾星兽 Asset Definition V1",
    "其余七生命原型在正式定义建立前返回 `NOT_AVAILABLE`",
    "当前 Renderer 只具备未来消费该定义的类型边界",
  ].forEach((marker) => assertIncludes("asset architecture protocol", protocolSource, marker));

  assertIncludes("type index exports asset definition", typeIndexSource, "StarBeastAssetDefinition");
  assertIncludes("type index exports visual layer", typeIndexSource, "StarBeastVisualLayer");
  assertIncludes(
    "asset architecture gate registered",
    packageJson.scripts?.["check:star-beast-asset-architecture"] ?? "",
    "node scripts/check-star-beast-asset-architecture.mjs",
  );
  assertIncludes(
    "asset architecture gate participates in release",
    packageJson.scripts?.["postcheck:release"] ?? "",
    "npm run check:star-beast-asset-architecture",
  );

  const tempModulePath = path.join(os.tmpdir(), `guanyao-star-beast-asset-architecture-${process.pid}.mjs`);
  await build({
    entryPoints: [absolute.service],
    outfile: tempModulePath,
    bundle: true,
    platform: "node",
    format: "esm",
    target: "node20",
    logLevel: "silent",
  });
  const { resolveStarBeastAssetDefinition } = await import(`file://${tempModulePath}?t=${Date.now()}`);
  const makeArchetype = (code, trigram) => Object.freeze({
    source: "mother_code_profile",
    sourceMotherCodeId: `test:${code}`,
    code,
    trigram,
    semanticRole: "ORIGINAL_LIFE_FORCE",
    originalForce: "test-force",
    lifeIntention: "test-intention",
    shadowPattern: "test-shadow",
    awakeningDirection: "test-awakening",
    nonFinalIdentity: true,
    notHexagram: true,
    notPersonalityLabel: true,
  });
  const qian = makeArchetype("QIAN", "乾");
  const qianBefore = JSON.stringify(qian);
  const qianResult = resolveStarBeastAssetDefinition(qian);
  const kun = makeArchetype("KUN", "坤");
  const kunResult = resolveStarBeastAssetDefinition(kun);

  assertEqual("Qian asset definition is available", qianResult.status, "AVAILABLE");
  assertEqual("Qian source reference is preserved", qianResult.sourceLifeArchetypeReference === qian, true);
  assertEqual("LifeArchetype input is not mutated", JSON.stringify(qian), qianBefore);
  assertEqual("Qian has exactly six visual layers", qianResult.assetDefinition.visualLayers.length, 6);
  assertEqual(
    "Qian visual layer order is fixed",
    qianResult.assetDefinition.visualLayers.map(({ kind }) => kind).join(","),
    "CORE_BONE,STAR_CORE,STAR_PATTERN,LIGHT_BOUNDARY,COSMIC_CONSCIOUSNESS,CRYSTAL_IMPRINT",
  );
  assertEqual(
    "Qian anchors are normalized",
    [
      ...qianResult.assetDefinition.coreSystem.starCoreAnchors,
      ...qianResult.assetDefinition.crystalSystem.crystalAnchors,
    ].every(({ x, y }) => x >= 0 && x <= 1 && y >= 0 && y <= 1),
    true,
  );
  assertEqual("Qian definition is renderer-consumable", qianResult.assetDefinition.rendererConsumable, true);
  assertEqual("Qian definition blocks four-symbol inference", qianResult.assetDefinition.noFourSymbolInference, true);
  assertEqual("Qian definition does not mutate life state", qianResult.assetDefinition.noLifeStateMutation, true);
  assertEqual(
    "Qian definition is immutable",
    Object.isFrozen(qianResult.assetDefinition) &&
      Object.isFrozen(qianResult.assetDefinition.visualLayers) &&
      Object.isFrozen(qianResult.assetDefinition.coreSystem) &&
      Object.isFrozen(qianResult.assetDefinition.patternSystem) &&
      Object.isFrozen(qianResult.assetDefinition.boundarySystem) &&
      Object.isFrozen(qianResult.assetDefinition.consciousnessSystem) &&
      Object.isFrozen(qianResult.assetDefinition.crystalSystem),
    true,
  );
  assertEqual("undefined archetype stays unavailable", kunResult.status, "NOT_AVAILABLE");
  assertEqual("undefined archetype does not borrow Qian asset", "assetDefinition" in kunResult, false);
  fs.rmSync(tempModulePath, { force: true });
}

if (failures.length > 0) {
  console.error(`FAIL | star beast asset architecture | count=${failures.length}`);
  failures.forEach((failure) => console.error(`- ${failure}`));
  process.exit(1);
}

console.log("PASS | star beast asset architecture gate");
