import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import process from "node:process";
import { build } from "esbuild";

const rootDir = process.cwd();
const files = Object.freeze({
  type: "src/types/starBeastAssetPrototypeAdapter.ts",
  service: "src/services/starBeastAssetPrototypeAdapter.ts",
  consumptionService: "src/services/starBeastAssetPrototypeConsumptionService.ts",
  readinessService: "src/services/starBeastAssetPrototypeReadiness.ts",
  assetMapping: "src/services/starBeastAssetArchitectureMapping.ts",
  protocol: "docs/GUANYAO_STAR_BEAST_ASSET_PROTOTYPE_ADAPTER_CONTRACT.md",
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
    "export type StarBeastAssetPrototypeAdapterInput",
    "assetDefinitionReference: StarBeastAssetDefinition | null",
    "prototypeConsumptionReference: StarBeastAssetPrototypeConsumption | null",
    "visualStateReference: StarBeastPrototypeVisualStateReference | null",
    "rendererContractReference: StarBeastRendererContractReference | null",
    "export type StarBeastPrototypeExpressionChannel",
    'channelKind: "CORE_BONE_CHANNEL"',
    'channelKind: "STAR_CORE_CHANNEL"',
    'channelKind: "STAR_PATTERN_CHANNEL"',
    'channelKind: "LIGHT_BOUNDARY_CHANNEL"',
    'channelKind: "COSMIC_CONSCIOUSNESS_CHANNEL"',
    'channelKind: "CRYSTAL_IMPRINT_CHANNEL"',
    "structureDirectionReference",
    "corePositionReference",
    "manifestationIntensityReference",
    "lifePathReference",
    "presenceBoundaryReference",
    "consciousnessFlowReference",
    "crystalImprintReference",
    'status: "AVAILABLE"',
    'status: "UNAVAILABLE"',
    'status: "BLOCKED"',
    "referenceProjectionOnly: true",
    "noAssetFactCopy: true",
    "noRenderExecution: true",
    "noCanvasConnection: true",
    "noAnimationDevelopment: true",
    "noLifeStateMutation: true",
    "noStorageWrite: true",
  ].forEach((marker) => assertIncludes("asset prototype adapter type", typeSource, marker));

  [
    "export function adaptStarBeastAssetPrototype",
    "input: StarBeastAssetPrototypeAdapterInput",
    "): StarBeastAssetPrototypeAdapterResult",
    '"CORE_BONE"',
    '"STAR_CORE"',
    '"STAR_PATTERN"',
    '"LIGHT_BOUNDARY"',
    '"COSMIC_CONSCIOUSNESS"',
    '"CRYSTAL_IMPRINT"',
    '"ASSET_CONSUMPTION_REFERENCE_MISMATCH"',
    '"VISUAL_STATE_COMPATIBILITY_REFERENCE_MISMATCH"',
    '"RENDERER_CONTRACT_REFERENCE_MISMATCH"',
    '"PROTOTYPE_CONSUMPTION_BOUNDARY_INVALID"',
    '"ASSET_EXPRESSION_LAYER_MISSING"',
    'status: "AVAILABLE"',
    "channelCount: 6",
    'adapterStatus: "AVAILABLE_FOR_FUTURE_PROTOTYPE_RENDERER"',
  ].forEach((marker) => assertIncludes("asset prototype adapter service", serviceSource, marker));

  [
    "resolveStarBeastAssetDefinition(",
    "resolveStarBeastAssetPrototypeReadiness(",
    "consumeStarBeastAssetPrototype(",
    "resolveStarBeastRenderPlan",
    "requestAnimationFrame",
    "performance.now",
    "getContext(",
    "CanvasRenderingContext",
    "localStorage",
    "sessionStorage",
    "fetch(",
    "WebGL",
    'from "three"',
    'from "react"',
  ].forEach((marker) => assertExcludes("adapter stays semantic-only", serviceSource, marker));

  [
    "StarBeastAssetPrototypeAdapter",
    "adaptStarBeastAssetPrototype",
    "starBeastAssetPrototypeAdapter",
  ].forEach((marker) => assertExcludes("StarbeastLab remains disconnected", labSource, marker));

  const callSites = [];
  const collect = (directoryPath) => {
    for (const entry of fs.readdirSync(directoryPath, { withFileTypes: true })) {
      const entryPath = path.join(directoryPath, entry.name);
      if (entry.isDirectory()) collect(entryPath);
      else if (/\.tsx?$/.test(entry.name)) {
        const source = fs.readFileSync(entryPath, "utf8");
        if (source.includes("adaptStarBeastAssetPrototype(")) {
          callSites.push(path.relative(rootDir, entryPath));
        }
      }
    }
  };
  collect(path.join(rootDir, "src"));
  assertEqual("adapter has no runtime consumer", callSites.join(","), files.service);

  [
    "RC-STAR-BEAST-ASSET-PROTOTYPE-ADAPTER-CONTRACT-P80",
    "Asset Definition 描述“星兽由什么组成”",
    "Prototype Adapter 描述“这些组成如何被原型系统理解”",
    "Renderer 负责未来“如何显示”",
    "输入只保存 Asset Definition、P79 Consumption、Visual State 与 Renderer Contract 引用",
    "CORE_BONE_CHANNEL",
    "STAR_CORE_CHANNEL",
    "STAR_PATTERN_CHANNEL",
    "LIGHT_BOUNDARY_CHANNEL",
    "COSMIC_CONSCIOUSNESS_CHANNEL",
    "CRYSTAL_IMPRINT_CHANNEL",
    "不反向调用 P77、P78 或 P79 Service",
    "不访问 Canvas",
    "不修改 StarbeastLab",
    "不建立实际 Renderer 消费者",
  ].forEach((marker) => assertIncludes("asset prototype adapter protocol", protocolSource, marker));

  assertIncludes("type index exports adapter input", typeIndexSource, "StarBeastAssetPrototypeAdapterInput");
  assertIncludes("type index exports expression channel", typeIndexSource, "StarBeastPrototypeExpressionChannel");
  assertIncludes("type index exports adapter result", typeIndexSource, "StarBeastAssetPrototypeAdapterResult");
  assertIncludes(
    "adapter gate registered",
    packageJson.scripts?.["check:star-beast-asset-prototype-adapter-contract"] ?? "",
    "node scripts/check-star-beast-asset-prototype-adapter-contract.mjs",
  );
  assertIncludes(
    "adapter gate participates in release",
    packageJson.scripts?.["postcheck:release"] ?? "",
    "npm run check:star-beast-asset-prototype-adapter-contract",
  );

  const modulePaths = Object.freeze({
    adapter: path.join(os.tmpdir(), `guanyao-asset-adapter-${process.pid}.mjs`),
    consumption: path.join(os.tmpdir(), `guanyao-asset-consumption-${process.pid}.mjs`),
    readiness: path.join(os.tmpdir(), `guanyao-asset-readiness-${process.pid}.mjs`),
    mapping: path.join(os.tmpdir(), `guanyao-asset-mapping-${process.pid}.mjs`),
  });
  await Promise.all([
    build({ entryPoints: [absolute.service], outfile: modulePaths.adapter, bundle: true, platform: "node", format: "esm", target: "node20", logLevel: "silent" }),
    build({ entryPoints: [absolute.consumptionService], outfile: modulePaths.consumption, bundle: true, platform: "node", format: "esm", target: "node20", logLevel: "silent" }),
    build({ entryPoints: [absolute.readinessService], outfile: modulePaths.readiness, bundle: true, platform: "node", format: "esm", target: "node20", logLevel: "silent" }),
    build({ entryPoints: [absolute.assetMapping], outfile: modulePaths.mapping, bundle: true, platform: "node", format: "esm", target: "node20", logLevel: "silent" }),
  ]);
  const { adaptStarBeastAssetPrototype } = await import(`file://${modulePaths.adapter}?t=${Date.now()}`);
  const { consumeStarBeastAssetPrototype } = await import(`file://${modulePaths.consumption}?t=${Date.now()}`);
  const { resolveStarBeastAssetPrototypeReadiness } = await import(`file://${modulePaths.readiness}?t=${Date.now()}`);
  const { resolveStarBeastAssetDefinition } = await import(`file://${modulePaths.mapping}?t=${Date.now()}`);

  const qian = Object.freeze({
    source: "mother_code_profile",
    sourceMotherCodeId: "test:QIAN",
    code: "QIAN",
    trigram: "乾",
    semanticRole: "ORIGINAL_LIFE_FORCE",
    originalForce: "test-force",
    lifeIntention: "test-intention",
    shadowPattern: "test-shadow",
    awakeningDirection: "test-awakening",
    nonFinalIdentity: true,
    notHexagram: true,
    notPersonalityLabel: true,
  });
  const assetDefinition = resolveStarBeastAssetDefinition(qian).assetDefinition;
  const visualCompatibilityReference = Object.freeze({
    referenceType: "STAR_BEAST_VISUAL_STATE_COMPATIBILITY",
    referenceId: "test:visual-compatibility",
  });
  const rendererContractReference = Object.freeze({
    referenceType: "STAR_BEAST_RENDERER_CONTRACT",
    referenceId: "test:renderer-contract-p40",
  });
  const readinessResult = resolveStarBeastAssetPrototypeReadiness(Object.freeze({
    assetDefinitionReference: assetDefinition,
    lifeArchetypeProfileReference: qian,
    visualStateCompatibilityReference: visualCompatibilityReference,
    rendererContractReference,
  }));
  const consumptionResult = consumeStarBeastAssetPrototype(Object.freeze({
    readinessResultReference: readinessResult,
    assetDefinitionReference: assetDefinition,
    visualStateCompatibilityReference: visualCompatibilityReference,
    rendererContractReference,
  }));
  const visualStateReference = Object.freeze({
    referenceType: "STAR_BEAST_PROTOTYPE_VISUAL_STATE",
    referenceId: "test:visual-state",
    compatibilityReference: visualCompatibilityReference,
  });
  const availableInput = Object.freeze({
    assetDefinitionReference: assetDefinition,
    prototypeConsumptionReference: consumptionResult.consumption,
    visualStateReference,
    rendererContractReference,
  });
  const before = JSON.stringify(availableInput);
  const available = adaptStarBeastAssetPrototype(availableInput);
  const expectedChannels = [
    "CORE_BONE_CHANNEL",
    "STAR_CORE_CHANNEL",
    "STAR_PATTERN_CHANNEL",
    "LIGHT_BOUNDARY_CHANNEL",
    "COSMIC_CONSCIOUSNESS_CHANNEL",
    "CRYSTAL_IMPRINT_CHANNEL",
  ];

  assertEqual("complete references are available", available.status, "AVAILABLE");
  assertEqual("six channels are produced", available.channelCount, 6);
  assertEqual("channel order is stable", available.expressionChannels.map(({ channelKind }) => channelKind).join(","), expectedChannels.join(","));
  assertEqual("asset reference is preserved", available.expressionChannels.every(({ sourceAssetDefinitionReference }) => sourceAssetDefinitionReference === assetDefinition), true);
  assertEqual("visual reference is preserved", available.expressionChannels.every(({ sourceVisualStateReference }) => sourceVisualStateReference === visualStateReference), true);
  assertEqual("core channel references source system", available.expressionChannels[1].corePositionReference === assetDefinition.coreSystem, true);
  assertEqual("pattern channel references source system", available.expressionChannels[2].lifePathReference === assetDefinition.patternSystem, true);
  assertEqual("boundary channel references source system", available.expressionChannels[3].presenceBoundaryReference === assetDefinition.boundarySystem, true);
  assertEqual("consciousness channel references source system", available.expressionChannels[4].consciousnessFlowReference === assetDefinition.consciousnessSystem, true);
  assertEqual("crystal channel references source system", available.expressionChannels[5].crystalImprintReference === assetDefinition.crystalSystem, true);
  assertEqual("adapter does not render", available.boundary.noRenderExecution, true);
  assertEqual("adapter does not connect Canvas", available.boundary.noCanvasConnection, true);
  assertEqual("adapter input is unchanged", JSON.stringify(availableInput), before);

  const unavailable = adaptStarBeastAssetPrototype(Object.freeze({
    ...availableInput,
    visualStateReference: null,
  }));
  assertEqual("missing input is unavailable", unavailable.status, "UNAVAILABLE");
  assertEqual("missing reason is explicit", unavailable.reason, "VISUAL_STATE_REFERENCE_REQUIRED");

  const wrongCompatibility = Object.freeze({
    ...visualStateReference,
    compatibilityReference: Object.freeze({
      ...visualCompatibilityReference,
      referenceId: "test:wrong-compatibility",
    }),
  });
  const blockedCompatibility = adaptStarBeastAssetPrototype(Object.freeze({
    ...availableInput,
    visualStateReference: wrongCompatibility,
  }));
  assertEqual("compatibility mismatch is blocked", blockedCompatibility.status, "BLOCKED");
  assertEqual("compatibility mismatch reason", blockedCompatibility.reason, "VISUAL_STATE_COMPATIBILITY_REFERENCE_MISMATCH");

  const incompleteAsset = Object.freeze({
    ...assetDefinition,
    visualLayers: Object.freeze(assetDefinition.visualLayers.filter(({ kind }) => kind !== "CRYSTAL_IMPRINT")),
  });
  const incompleteConsumption = Object.freeze({
    ...consumptionResult.consumption,
    assetDefinitionReference: incompleteAsset,
  });
  const blockedLayer = adaptStarBeastAssetPrototype(Object.freeze({
    ...availableInput,
    assetDefinitionReference: incompleteAsset,
    prototypeConsumptionReference: incompleteConsumption,
  }));
  assertEqual("missing expression layer is blocked", blockedLayer.status, "BLOCKED");
  assertEqual("missing layer reason", blockedLayer.reason, "ASSET_EXPRESSION_LAYER_MISSING");
  assertEqual("missing layer is reported", blockedLayer.missingChannelSources.includes("CRYSTAL_IMPRINT"), true);

  Object.values(modulePaths).forEach((modulePath) => fs.rmSync(modulePath, { force: true }));
}

if (failures.length > 0) {
  console.error(`FAIL | star beast asset prototype adapter contract | count=${failures.length}`);
  failures.forEach((failure) => console.error(`- ${failure}`));
  process.exit(1);
}

console.log("PASS | star beast asset prototype adapter contract gate");
