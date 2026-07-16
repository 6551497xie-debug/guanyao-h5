import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import process from "node:process";
import { build } from "esbuild";

const rootDir = process.cwd();
const files = Object.freeze({
  type: "src/types/starBeastPrototypeExpressionChannelReadiness.ts",
  service: "src/services/starBeastPrototypeExpressionChannelReadiness.ts",
  adapterService: "src/services/starBeastAssetPrototypeAdapter.ts",
  consumptionService: "src/services/starBeastAssetPrototypeConsumptionService.ts",
  readinessService: "src/services/starBeastAssetPrototypeReadiness.ts",
  assetMapping: "src/services/starBeastAssetArchitectureMapping.ts",
  protocol: "docs/GUANYAO_STAR_BEAST_PROTOTYPE_EXPRESSION_CHANNEL_READINESS_PROTOCOL.md",
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
    "export type StarBeastPrototypeExpressionChannelReadinessInput",
    "adapterResultReference: StarBeastAssetPrototypeAdapterResult | null",
    "expressionChannelsReference: StarBeastPrototypeExpressionChannels | null",
    "rendererContractReference: StarBeastRendererContractReference | null",
    "isolationScopeReference: StarBeastPrototypeIsolationScopeReference | null",
    'scope: "ISOLATED_PROTOTYPE_ONLY"',
    'status: "READY"',
    'status: "UNAVAILABLE"',
    'status: "BLOCKED"',
    'readiness: "READY_FOR_ISOLATED_PROTOTYPE_RENDERER_CONSUMPTION"',
    "readinessOnly: true",
    "noChannelConsumption: true",
    "noRenderExecution: true",
    "noCanvasConnection: true",
    "noStarbeastLabConnection: true",
    "noLifeStateMutation: true",
    "noStorageWrite: true",
  ].forEach((marker) => assertIncludes("expression readiness type", typeSource, marker));

  [
    "export function resolveStarBeastPrototypeExpressionChannelReadiness",
    "input: StarBeastPrototypeExpressionChannelReadinessInput",
    "): StarBeastPrototypeExpressionChannelReadinessResult",
    'adapterResult.status === "UNAVAILABLE"',
    'adapterResult.status === "BLOCKED"',
    '"CORE_BONE_CHANNEL"',
    '"STAR_CORE_CHANNEL"',
    '"STAR_PATTERN_CHANNEL"',
    '"LIGHT_BOUNDARY_CHANNEL"',
    '"COSMIC_CONSCIOUSNESS_CHANNEL"',
    '"CRYSTAL_IMPRINT_CHANNEL"',
    '"EXPRESSION_CHANNELS_REFERENCE_MISMATCH"',
    '"RENDERER_CONTRACT_REFERENCE_MISMATCH"',
    '"ISOLATION_SCOPE_REFERENCE_INVALID"',
    '"ADAPTER_BOUNDARY_INVALID"',
    '"EXPRESSION_CHANNEL_CONTRACT_INVALID"',
    '"EXPRESSION_CHANNEL_SOURCE_MISMATCH"',
    'status: "READY"',
    'readiness: "READY_FOR_ISOLATED_PROTOTYPE_RENDERER_CONSUMPTION"',
  ].forEach((marker) => assertIncludes("expression readiness service", serviceSource, marker));

  [
    "adaptStarBeastAssetPrototype(",
    "consumeStarBeastAssetPrototype(",
    "resolveStarBeastAssetPrototypeReadiness(",
    "resolveStarBeastAssetDefinition(",
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
  ].forEach((marker) => assertExcludes("readiness stays judgment-only", serviceSource, marker));

  [
    "StarBeastPrototypeExpressionChannelReadiness",
    "resolveStarBeastPrototypeExpressionChannelReadiness",
    "starBeastPrototypeExpressionChannelReadiness",
  ].forEach((marker) => assertExcludes("StarbeastLab remains disconnected", labSource, marker));

  const callSites = [];
  const collect = (directoryPath) => {
    for (const entry of fs.readdirSync(directoryPath, { withFileTypes: true })) {
      const entryPath = path.join(directoryPath, entry.name);
      if (entry.isDirectory()) collect(entryPath);
      else if (/\.tsx?$/.test(entry.name)) {
        const source = fs.readFileSync(entryPath, "utf8");
        if (source.includes("resolveStarBeastPrototypeExpressionChannelReadiness(")) {
          callSites.push(path.relative(rootDir, entryPath));
        }
      }
    }
  };
  collect(path.join(rootDir, "src"));
  assertEqual("readiness has no runtime consumer", callSites.join(","), files.service);

  [
    "RC-STAR-BEAST-PROTOTYPE-EXPRESSION-CHANNEL-CONSUMPTION-READINESS-P81",
    "Readiness 不等于 Consumption",
    "输入只保存引用",
    "READY | UNAVAILABLE | BLOCKED",
    "P80 Adapter Result 为 `AVAILABLE`",
    "通道数量为六，顺序固定且不重复",
    "ISOLATED_PROTOTYPE_ONLY",
    "READY_FOR_ISOLATED_PROTOTYPE_RENDERER_CONSUMPTION",
    "不反向调用 P80 Adapter",
    "不连接 Canvas 或 StarbeastLab",
    "不建立 Prototype Expression Channel Consumer",
  ].forEach((marker) => assertIncludes("expression readiness protocol", protocolSource, marker));

  assertIncludes("type index exports readiness input", typeIndexSource, "StarBeastPrototypeExpressionChannelReadinessInput");
  assertIncludes("type index exports readiness result", typeIndexSource, "StarBeastPrototypeExpressionChannelReadinessResult");
  assertIncludes("type index exports isolation scope", typeIndexSource, "StarBeastPrototypeIsolationScopeReference");
  assertIncludes(
    "expression readiness gate registered",
    packageJson.scripts?.["check:star-beast-prototype-expression-channel-readiness"] ?? "",
    "node scripts/check-star-beast-prototype-expression-channel-readiness.mjs",
  );
  assertIncludes(
    "expression readiness gate participates in release",
    packageJson.scripts?.["postcheck:release"] ?? "",
    "npm run check:star-beast-prototype-expression-channel-readiness",
  );

  const modulePaths = Object.freeze({
    expressionReadiness: path.join(os.tmpdir(), `guanyao-expression-readiness-${process.pid}.mjs`),
    adapter: path.join(os.tmpdir(), `guanyao-asset-adapter-${process.pid}.mjs`),
    consumption: path.join(os.tmpdir(), `guanyao-asset-consumption-${process.pid}.mjs`),
    assetReadiness: path.join(os.tmpdir(), `guanyao-asset-readiness-${process.pid}.mjs`),
    mapping: path.join(os.tmpdir(), `guanyao-asset-mapping-${process.pid}.mjs`),
  });
  await Promise.all([
    build({ entryPoints: [absolute.service], outfile: modulePaths.expressionReadiness, bundle: true, platform: "node", format: "esm", target: "node20", logLevel: "silent" }),
    build({ entryPoints: [absolute.adapterService], outfile: modulePaths.adapter, bundle: true, platform: "node", format: "esm", target: "node20", logLevel: "silent" }),
    build({ entryPoints: [absolute.consumptionService], outfile: modulePaths.consumption, bundle: true, platform: "node", format: "esm", target: "node20", logLevel: "silent" }),
    build({ entryPoints: [absolute.readinessService], outfile: modulePaths.assetReadiness, bundle: true, platform: "node", format: "esm", target: "node20", logLevel: "silent" }),
    build({ entryPoints: [absolute.assetMapping], outfile: modulePaths.mapping, bundle: true, platform: "node", format: "esm", target: "node20", logLevel: "silent" }),
  ]);
  const { resolveStarBeastPrototypeExpressionChannelReadiness } = await import(`file://${modulePaths.expressionReadiness}?t=${Date.now()}`);
  const { adaptStarBeastAssetPrototype } = await import(`file://${modulePaths.adapter}?t=${Date.now()}`);
  const { consumeStarBeastAssetPrototype } = await import(`file://${modulePaths.consumption}?t=${Date.now()}`);
  const { resolveStarBeastAssetPrototypeReadiness } = await import(`file://${modulePaths.assetReadiness}?t=${Date.now()}`);
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
  const assetReadiness = resolveStarBeastAssetPrototypeReadiness(Object.freeze({
    assetDefinitionReference: assetDefinition,
    lifeArchetypeProfileReference: qian,
    visualStateCompatibilityReference: visualCompatibilityReference,
    rendererContractReference,
  }));
  const consumption = consumeStarBeastAssetPrototype(Object.freeze({
    readinessResultReference: assetReadiness,
    assetDefinitionReference: assetDefinition,
    visualStateCompatibilityReference: visualCompatibilityReference,
    rendererContractReference,
  })).consumption;
  const visualStateReference = Object.freeze({
    referenceType: "STAR_BEAST_PROTOTYPE_VISUAL_STATE",
    referenceId: "test:visual-state",
    compatibilityReference: visualCompatibilityReference,
  });
  const adapterInput = Object.freeze({
    assetDefinitionReference: assetDefinition,
    prototypeConsumptionReference: consumption,
    visualStateReference,
    rendererContractReference,
  });
  const adapterResult = adaptStarBeastAssetPrototype(adapterInput);
  const isolationScopeReference = Object.freeze({
    referenceType: "STAR_BEAST_PROTOTYPE_ISOLATION_SCOPE",
    referenceId: "test:isolated-prototype",
    scope: "ISOLATED_PROTOTYPE_ONLY",
  });
  const readyInput = Object.freeze({
    adapterResultReference: adapterResult,
    expressionChannelsReference: adapterResult.expressionChannels,
    rendererContractReference,
    isolationScopeReference,
  });
  const before = JSON.stringify(readyInput);
  const ready = resolveStarBeastPrototypeExpressionChannelReadiness(readyInput);

  assertEqual("complete P80 channels are ready", ready.status, "READY");
  assertEqual("ready preserves adapter result", ready.sourceAdapterResultReference === adapterResult, true);
  assertEqual("ready preserves channels", ready.expressionChannelsReference === adapterResult.expressionChannels, true);
  assertEqual("ready preserves renderer contract", ready.rendererContractReference === rendererContractReference, true);
  assertEqual("ready preserves isolation scope", ready.isolationScopeReference === isolationScopeReference, true);
  assertEqual("readiness consumes no channels", ready.boundary.noChannelConsumption, true);
  assertEqual("readiness does not render", ready.boundary.noRenderExecution, true);
  assertEqual("readiness does not connect Canvas", ready.boundary.noCanvasConnection, true);
  assertEqual("readiness does not mutate input", JSON.stringify(readyInput), before);

  const unavailable = resolveStarBeastPrototypeExpressionChannelReadiness(Object.freeze({
    ...readyInput,
    expressionChannelsReference: null,
  }));
  assertEqual("missing channels are unavailable", unavailable.status, "UNAVAILABLE");
  assertEqual("missing channels reason", unavailable.reason, "EXPRESSION_CHANNELS_REFERENCE_REQUIRED");

  const mismatchedChannels = Object.freeze([...adapterResult.expressionChannels]);
  const blockedReference = resolveStarBeastPrototypeExpressionChannelReadiness(Object.freeze({
    ...readyInput,
    expressionChannelsReference: mismatchedChannels,
  }));
  assertEqual("channel reference mismatch is blocked", blockedReference.status, "BLOCKED");
  assertEqual("channel reference mismatch reason", blockedReference.reason, "EXPRESSION_CHANNELS_REFERENCE_MISMATCH");

  const invalidScope = resolveStarBeastPrototypeExpressionChannelReadiness(Object.freeze({
    ...readyInput,
    isolationScopeReference: Object.freeze({
      ...isolationScopeReference,
      scope: "PRODUCT_RUNTIME",
    }),
  }));
  assertEqual("non-isolated scope is blocked", invalidScope.status, "BLOCKED");
  assertEqual("non-isolated scope reason", invalidScope.reason, "ISOLATION_SCOPE_REFERENCE_INVALID");

  const corruptedChannels = Object.freeze([
    Object.freeze({
      ...adapterResult.expressionChannels[0],
      sourceVisualStateReference: Object.freeze({ ...visualStateReference }),
    }),
    ...adapterResult.expressionChannels.slice(1),
  ]);
  const corruptedAdapterResult = Object.freeze({
    ...adapterResult,
    expressionChannels: corruptedChannels,
  });
  const blockedSource = resolveStarBeastPrototypeExpressionChannelReadiness(Object.freeze({
    ...readyInput,
    adapterResultReference: corruptedAdapterResult,
    expressionChannelsReference: corruptedChannels,
  }));
  assertEqual("channel source mismatch is blocked", blockedSource.status, "BLOCKED");
  assertEqual("channel source mismatch reason", blockedSource.reason, "EXPRESSION_CHANNEL_SOURCE_MISMATCH");

  Object.values(modulePaths).forEach((modulePath) => fs.rmSync(modulePath, { force: true }));
}

if (failures.length > 0) {
  console.error(`FAIL | star beast prototype expression channel readiness | count=${failures.length}`);
  failures.forEach((failure) => console.error(`- ${failure}`));
  process.exit(1);
}

console.log("PASS | star beast prototype expression channel readiness gate");
