import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import process from "node:process";
import { build } from "esbuild";

const rootDir = process.cwd();
const files = Object.freeze({
  type: "src/types/starBeastPrototypeExpressionChannelConsumption.ts",
  service: "src/services/starBeastPrototypeExpressionChannelConsumption.ts",
  expressionReadinessService: "src/services/starBeastPrototypeExpressionChannelReadiness.ts",
  adapterService: "src/services/starBeastAssetPrototypeAdapter.ts",
  assetConsumptionService: "src/services/starBeastAssetPrototypeConsumptionService.ts",
  assetReadinessService: "src/services/starBeastAssetPrototypeReadiness.ts",
  assetMapping: "src/services/starBeastAssetArchitectureMapping.ts",
  protocol: "docs/GUANYAO_STAR_BEAST_PROTOTYPE_EXPRESSION_CHANNEL_CONSUMPTION_PROTOCOL.md",
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
    "export type StarBeastPrototypeExpressionChannelConsumptionInput",
    "expressionChannelReadinessReference:",
    "prototypeAdapterReference: StarBeastAssetPrototypeAdapterAvailable | null",
    "rendererContractReference: StarBeastRendererContractReference | null",
    "isolatedPrototypeScopeReference:",
    "export type StarBeastPrototypeRendererInputReference",
    'referenceType: "STAR_BEAST_PROTOTYPE_RENDERER_INPUT_REFERENCE"',
    "stableConsumptionReference: true",
    "notRenderInput: true",
    "notRenderPlan: true",
    "notVisualOutput: true",
    "noVisualParametersCopied: true",
    'status: "AVAILABLE"',
    'status: "UNAVAILABLE"',
    'status: "BLOCKED"',
    "referenceConsumptionOnly: true",
    "noRendererInvocation: true",
    "noRenderPlanGeneration: true",
    "noExpressionChannelMutation: true",
    "noAssetDefinitionMutation: true",
    "noCanvasConnection: true",
    "noStarbeastLabConnection: true",
    "noRuntimeIntegration: true",
    "noStorageWrite: true",
  ].forEach((marker) => assertIncludes("expression consumption type", typeSource, marker));

  [
    "export function consumeStarBeastPrototypeExpressionChannels",
    "input: StarBeastPrototypeExpressionChannelConsumptionInput",
    "): StarBeastPrototypeExpressionChannelConsumptionResult",
    'readiness.status === "UNAVAILABLE"',
    'readiness.status === "BLOCKED"',
    '"PROTOTYPE_ADAPTER_REFERENCE_MISMATCH"',
    '"RENDERER_CONTRACT_REFERENCE_MISMATCH"',
    '"ISOLATED_PROTOTYPE_SCOPE_REFERENCE_MISMATCH"',
    '"ISOLATED_PROTOTYPE_SCOPE_REFERENCE_INVALID"',
    '"READINESS_BOUNDARY_INVALID"',
    'referenceType: "STAR_BEAST_PROTOTYPE_RENDERER_INPUT_REFERENCE"',
    'consumptionStatus:',
    '"AVAILABLE_FOR_FUTURE_ISOLATED_PROTOTYPE_RENDERER"',
    'status: "AVAILABLE"',
  ].forEach((marker) => assertIncludes("expression consumption service", serviceSource, marker));

  [
    "resolveStarBeastPrototypeExpressionChannelReadiness(",
    "adaptStarBeastAssetPrototype(",
    "consumeStarBeastAssetPrototype(",
    "resolveStarBeastAssetPrototypeReadiness(",
    "resolveStarBeastAssetDefinition(",
    "StarBeastRenderPlan",
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
  ].forEach((marker) => assertExcludes("consumption stays reference-only", serviceSource, marker));

  [
    "StarBeastPrototypeExpressionChannelConsumption",
    "consumeStarBeastPrototypeExpressionChannels",
    "starBeastPrototypeExpressionChannelConsumption",
  ].forEach((marker) => assertExcludes("StarbeastLab remains disconnected", labSource, marker));

  const callSites = [];
  const collect = (directoryPath) => {
    for (const entry of fs.readdirSync(directoryPath, { withFileTypes: true })) {
      const entryPath = path.join(directoryPath, entry.name);
      if (entry.isDirectory()) collect(entryPath);
      else if (/\.tsx?$/.test(entry.name)) {
        const source = fs.readFileSync(entryPath, "utf8");
        if (source.includes("consumeStarBeastPrototypeExpressionChannels(")) {
          callSites.push(path.relative(rootDir, entryPath));
        }
      }
    }
  };
  collect(path.join(rootDir, "src"));
  assertEqual("consumption has no runtime consumer", callSites.join(","), files.service);

  [
    "RC-STAR-BEAST-PROTOTYPE-EXPRESSION-CHANNEL-CONSUMPTION-P82",
    "Consumption 不是 Renderer",
    "不是 Render Execution",
    "不是 Visual Output",
    "输入和输出只保存引用",
    "AVAILABLE",
    "UNAVAILABLE",
    "BLOCKED",
    "StarBeastPrototypeRendererInputReference",
    "不是 Render Input",
    "notRenderInput",
    "不反向调用 P81 Readiness",
    "不生成 Render Plan",
    "不连接 Canvas、StarbeastLab、UI、Storage 或正式 Runtime",
    "不建立实际 Prototype Renderer",
  ].forEach((marker) => assertIncludes("expression consumption protocol", protocolSource, marker));

  assertIncludes("type index exports consumption input", typeIndexSource, "StarBeastPrototypeExpressionChannelConsumptionInput");
  assertIncludes("type index exports renderer input reference", typeIndexSource, "StarBeastPrototypeRendererInputReference");
  assertIncludes("type index exports consumption result", typeIndexSource, "StarBeastPrototypeExpressionChannelConsumptionResult");
  assertIncludes(
    "expression consumption gate registered",
    packageJson.scripts?.["check:star-beast-prototype-expression-channel-consumption"] ?? "",
    "node scripts/check-star-beast-prototype-expression-channel-consumption.mjs",
  );
  assertIncludes(
    "expression consumption gate participates in release",
    packageJson.scripts?.["postcheck:release"] ?? "",
    "npm run check:star-beast-prototype-expression-channel-consumption",
  );

  const modulePaths = Object.freeze({
    expressionConsumption: path.join(os.tmpdir(), `guanyao-expression-consumption-${process.pid}.mjs`),
    expressionReadiness: path.join(os.tmpdir(), `guanyao-expression-readiness-${process.pid}.mjs`),
    adapter: path.join(os.tmpdir(), `guanyao-asset-adapter-${process.pid}.mjs`),
    assetConsumption: path.join(os.tmpdir(), `guanyao-asset-consumption-${process.pid}.mjs`),
    assetReadiness: path.join(os.tmpdir(), `guanyao-asset-readiness-${process.pid}.mjs`),
    mapping: path.join(os.tmpdir(), `guanyao-asset-mapping-${process.pid}.mjs`),
  });
  const sources = [
    absolute.service,
    absolute.expressionReadinessService,
    absolute.adapterService,
    absolute.assetConsumptionService,
    absolute.assetReadinessService,
    absolute.assetMapping,
  ];
  await Promise.all(Object.values(modulePaths).map((outfile, index) => build({
    entryPoints: [sources[index]],
    outfile,
    bundle: true,
    platform: "node",
    format: "esm",
    target: "node20",
    logLevel: "silent",
  })));
  const { consumeStarBeastPrototypeExpressionChannels } = await import(`file://${modulePaths.expressionConsumption}?t=${Date.now()}`);
  const { resolveStarBeastPrototypeExpressionChannelReadiness } = await import(`file://${modulePaths.expressionReadiness}?t=${Date.now()}`);
  const { adaptStarBeastAssetPrototype } = await import(`file://${modulePaths.adapter}?t=${Date.now()}`);
  const { consumeStarBeastAssetPrototype } = await import(`file://${modulePaths.assetConsumption}?t=${Date.now()}`);
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
  const assetConsumption = consumeStarBeastAssetPrototype(Object.freeze({
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
  const adapterResult = adaptStarBeastAssetPrototype(Object.freeze({
    assetDefinitionReference: assetDefinition,
    prototypeConsumptionReference: assetConsumption,
    visualStateReference,
    rendererContractReference,
  }));
  const isolatedPrototypeScopeReference = Object.freeze({
    referenceType: "STAR_BEAST_PROTOTYPE_ISOLATION_SCOPE",
    referenceId: "test:isolated-prototype",
    scope: "ISOLATED_PROTOTYPE_ONLY",
  });
  const expressionReadinessInput = Object.freeze({
    adapterResultReference: adapterResult,
    expressionChannelsReference: adapterResult.expressionChannels,
    rendererContractReference,
    isolationScopeReference: isolatedPrototypeScopeReference,
  });
  const expressionReadiness = resolveStarBeastPrototypeExpressionChannelReadiness(expressionReadinessInput);
  const availableInput = Object.freeze({
    expressionChannelReadinessReference: expressionReadiness,
    prototypeAdapterReference: adapterResult,
    rendererContractReference,
    isolatedPrototypeScopeReference,
  });
  const before = JSON.stringify(availableInput);
  const available = consumeStarBeastPrototypeExpressionChannels(availableInput);
  const inputReference = available.consumption.prototypeRendererInputReference;

  assertEqual("READY becomes AVAILABLE", available.status, "AVAILABLE");
  assertEqual("readiness reference is preserved", inputReference.sourceReadinessReference === expressionReadiness, true);
  assertEqual("adapter reference is preserved", inputReference.prototypeAdapterReference === adapterResult, true);
  assertEqual("channel reference is preserved", inputReference.expressionChannelsReference === adapterResult.expressionChannels, true);
  assertEqual("renderer contract is preserved", inputReference.rendererContractReference === rendererContractReference, true);
  assertEqual("scope reference is preserved", inputReference.isolatedPrototypeScopeReference === isolatedPrototypeScopeReference, true);
  assertEqual("reference is not render input", inputReference.notRenderInput, true);
  assertEqual("reference is not render plan", inputReference.notRenderPlan, true);
  assertEqual("reference is not visual output", inputReference.notVisualOutput, true);
  assertEqual("consumption does not invoke renderer", available.consumption.boundary.noRendererInvocation, true);
  assertEqual("consumption does not mutate input", JSON.stringify(availableInput), before);

  const unavailableReadiness = resolveStarBeastPrototypeExpressionChannelReadiness(Object.freeze({
    ...expressionReadinessInput,
    expressionChannelsReference: null,
  }));
  const unavailable = consumeStarBeastPrototypeExpressionChannels(Object.freeze({
    ...availableInput,
    expressionChannelReadinessReference: unavailableReadiness,
  }));
  assertEqual("UNAVAILABLE readiness stays unavailable", unavailable.status, "UNAVAILABLE");
  assertEqual("unavailable source reason is preserved", unavailable.sourceUnavailableReason, "EXPRESSION_CHANNELS_REFERENCE_REQUIRED");

  const blockedReadiness = resolveStarBeastPrototypeExpressionChannelReadiness(Object.freeze({
    ...expressionReadinessInput,
    isolationScopeReference: Object.freeze({
      ...isolatedPrototypeScopeReference,
      scope: "PRODUCT_RUNTIME",
    }),
  }));
  const blocked = consumeStarBeastPrototypeExpressionChannels(Object.freeze({
    ...availableInput,
    expressionChannelReadinessReference: blockedReadiness,
  }));
  assertEqual("BLOCKED readiness stays blocked", blocked.status, "BLOCKED");
  assertEqual("blocked source reason is preserved", blocked.sourceBlockedReason, "ISOLATION_SCOPE_REFERENCE_INVALID");

  const missingAdapter = consumeStarBeastPrototypeExpressionChannels(Object.freeze({
    ...availableInput,
    prototypeAdapterReference: null,
  }));
  assertEqual("missing adapter is unavailable", missingAdapter.status, "UNAVAILABLE");

  const driftedAdapter = consumeStarBeastPrototypeExpressionChannels(Object.freeze({
    ...availableInput,
    prototypeAdapterReference: Object.freeze({ ...adapterResult }),
  }));
  assertEqual("adapter drift is blocked", driftedAdapter.status, "BLOCKED");
  assertEqual("adapter drift reason", driftedAdapter.reason, "PROTOTYPE_ADAPTER_REFERENCE_MISMATCH");

  Object.values(modulePaths).forEach((modulePath) => fs.rmSync(modulePath, { force: true }));
}

if (failures.length > 0) {
  console.error(`FAIL | star beast prototype expression channel consumption | count=${failures.length}`);
  failures.forEach((failure) => console.error(`- ${failure}`));
  process.exit(1);
}

console.log("PASS | star beast prototype expression channel consumption gate");
