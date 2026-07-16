import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import process from "node:process";
import { build } from "esbuild";

const rootDir = process.cwd();
const files = Object.freeze({
  type: "src/types/starBeastPrototypeRendererInputContract.ts",
  service: "src/services/starBeastPrototypeRendererInputContract.ts",
  expressionConsumptionService: "src/services/starBeastPrototypeExpressionChannelConsumption.ts",
  expressionReadinessService: "src/services/starBeastPrototypeExpressionChannelReadiness.ts",
  adapterService: "src/services/starBeastAssetPrototypeAdapter.ts",
  assetConsumptionService: "src/services/starBeastAssetPrototypeConsumptionService.ts",
  assetReadinessService: "src/services/starBeastAssetPrototypeReadiness.ts",
  assetMapping: "src/services/starBeastAssetArchitectureMapping.ts",
  protocol: "docs/GUANYAO_STAR_BEAST_PROTOTYPE_RENDERER_INPUT_CONTRACT_PROTOCOL.md",
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
    "export type StarBeastPrototypeRendererRequestReference",
    'referenceType: "STAR_BEAST_PROTOTYPE_RENDERER_REQUEST"',
    'requestPurpose: "VALIDATE_ISOLATED_PROTOTYPE_EXPRESSION"',
    "export type StarBeastPrototypeRendererInputContractInput",
    "expressionChannelConsumptionResultReference:",
    "prototypeRendererInputReference:",
    "rendererRequestReference: StarBeastPrototypeRendererRequestReference | null",
    "export type StarBeastPrototypeRendererInputContract",
    'semanticRole: "STAR_BEAST_PROTOTYPE_RENDERER_INPUT_CONTRACT"',
    "expressionChannelsReference:",
    "rendererContractReference:",
    "isolatedPrototypeScopeReference:",
    '"AVAILABLE_FOR_FUTURE_PROTOTYPE_RENDERER_EXECUTION_READINESS"',
    "rendererNeutral: true",
    "referenceOnly: true",
    'status: "AVAILABLE"',
    'status: "UNAVAILABLE"',
    'status: "BLOCKED"',
    "inputContractOnly: true",
    "noRendererInvocation: true",
    "noRenderExecution: true",
    "noDrawCommands: true",
    "noPixelParameters: true",
    "noRenderPlanGeneration: true",
    "noCanvasConnection: true",
    "noStarbeastLabConnection: true",
    "noRuntimeIntegration: true",
    "noStorageWrite: true",
  ].forEach((marker) => assertIncludes("prototype renderer input contract type", typeSource, marker));

  [
    "export function resolveStarBeastPrototypeRendererInputContract",
    "input: StarBeastPrototypeRendererInputContractInput",
    "): StarBeastPrototypeRendererInputContractResult",
    'consumptionResult.status === "UNAVAILABLE"',
    'consumptionResult.status === "BLOCKED"',
    '"PROTOTYPE_RENDERER_INPUT_REFERENCE_MISMATCH"',
    '"PROTOTYPE_RENDERER_REQUEST_REFERENCE_INVALID"',
    '"PROTOTYPE_RENDERER_INPUT_REFERENCE_BOUNDARY_INVALID"',
    '"EXPRESSION_CHANNEL_CONSUMPTION_BOUNDARY_INVALID"',
    'semanticRole: "STAR_BEAST_PROTOTYPE_RENDERER_INPUT_CONTRACT"',
    'contractStatus:',
    '"AVAILABLE_FOR_FUTURE_PROTOTYPE_RENDERER_EXECUTION_READINESS"',
    'status: "AVAILABLE"',
  ].forEach((marker) => assertIncludes("prototype renderer input contract service", serviceSource, marker));

  [
    "consumeStarBeastPrototypeExpressionChannels(",
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
  ].forEach((marker) => assertExcludes("input contract stays contract-only", serviceSource, marker));

  [
    "StarBeastPrototypeRendererInputContract",
    "resolveStarBeastPrototypeRendererInputContract",
    "starBeastPrototypeRendererInputContract",
  ].forEach((marker) => assertExcludes("StarbeastLab remains disconnected", labSource, marker));

  const callSites = [];
  const collect = (directoryPath) => {
    for (const entry of fs.readdirSync(directoryPath, { withFileTypes: true })) {
      const entryPath = path.join(directoryPath, entry.name);
      if (entry.isDirectory()) collect(entryPath);
      else if (/\.tsx?$/.test(entry.name)) {
        const source = fs.readFileSync(entryPath, "utf8");
        if (source.includes("resolveStarBeastPrototypeRendererInputContract(")) {
          callSites.push(path.relative(rootDir, entryPath));
        }
      }
    }
  };
  collect(path.join(rootDir, "src"));
  assertEqual("input contract has no runtime consumer", callSites.join(","), files.service);

  [
    "RC-STAR-BEAST-PROTOTYPE-RENDERER-INPUT-CONTRACT-P83",
    "Input Contract 不是 Render Execution",
    "不是 Draw Command",
    "不是 Pixel Parameter",
    "不是 Render Plan",
    "VALIDATE_ISOLATED_PROTOTYPE_EXPRESSION",
    "不复制生命事实、资产事实、坐标、强度、轨迹或视觉参数",
    "AVAILABLE",
    "UNAVAILABLE",
    "BLOCKED",
    "不反向调用 P82 Service",
    "不连接 Canvas、StarbeastLab、UI、Storage 或正式 Runtime",
    "AVAILABLE_FOR_FUTURE_PROTOTYPE_RENDERER_EXECUTION_READINESS",
    "不建立 Renderer Execution Readiness",
  ].forEach((marker) => assertIncludes("prototype renderer input contract protocol", protocolSource, marker));

  assertIncludes("type index exports contract input", typeIndexSource, "StarBeastPrototypeRendererInputContractInput");
  assertIncludes("type index exports request reference", typeIndexSource, "StarBeastPrototypeRendererRequestReference");
  assertIncludes("type index exports contract result", typeIndexSource, "StarBeastPrototypeRendererInputContractResult");
  assertIncludes(
    "input contract gate registered",
    packageJson.scripts?.["check:star-beast-prototype-renderer-input-contract"] ?? "",
    "node scripts/check-star-beast-prototype-renderer-input-contract.mjs",
  );
  assertIncludes(
    "input contract gate participates in release",
    packageJson.scripts?.["postcheck:release"] ?? "",
    "npm run check:star-beast-prototype-renderer-input-contract",
  );

  const entries = [
    ["inputContract", absolute.service],
    ["expressionConsumption", absolute.expressionConsumptionService],
    ["expressionReadiness", absolute.expressionReadinessService],
    ["adapter", absolute.adapterService],
    ["assetConsumption", absolute.assetConsumptionService],
    ["assetReadiness", absolute.assetReadinessService],
    ["mapping", absolute.assetMapping],
  ];
  const modulePaths = Object.fromEntries(entries.map(([name]) => [
    name,
    path.join(os.tmpdir(), `guanyao-${name}-${process.pid}.mjs`),
  ]));
  await Promise.all(entries.map(([name, entryPoint]) => build({
    entryPoints: [entryPoint],
    outfile: modulePaths[name],
    bundle: true,
    platform: "node",
    format: "esm",
    target: "node20",
    logLevel: "silent",
  })));
  const { resolveStarBeastPrototypeRendererInputContract } = await import(`file://${modulePaths.inputContract}?t=${Date.now()}`);
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
  const visualCompatibilityReference = Object.freeze({ referenceType: "STAR_BEAST_VISUAL_STATE_COMPATIBILITY", referenceId: "test:visual" });
  const rendererContractReference = Object.freeze({ referenceType: "STAR_BEAST_RENDERER_CONTRACT", referenceId: "test:renderer-contract" });
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
  const isolationScopeReference = Object.freeze({
    referenceType: "STAR_BEAST_PROTOTYPE_ISOLATION_SCOPE",
    referenceId: "test:isolated",
    scope: "ISOLATED_PROTOTYPE_ONLY",
  });
  const expressionReadinessInput = Object.freeze({
    adapterResultReference: adapterResult,
    expressionChannelsReference: adapterResult.expressionChannels,
    rendererContractReference,
    isolationScopeReference,
  });
  const expressionReadiness = resolveStarBeastPrototypeExpressionChannelReadiness(expressionReadinessInput);
  const expressionConsumptionInput = Object.freeze({
    expressionChannelReadinessReference: expressionReadiness,
    prototypeAdapterReference: adapterResult,
    rendererContractReference,
    isolatedPrototypeScopeReference: isolationScopeReference,
  });
  const expressionConsumption = consumeStarBeastPrototypeExpressionChannels(expressionConsumptionInput);
  const inputReference = expressionConsumption.consumption.prototypeRendererInputReference;
  const rendererRequestReference = Object.freeze({
    referenceType: "STAR_BEAST_PROTOTYPE_RENDERER_REQUEST",
    referenceId: "test:renderer-request",
    requestPurpose: "VALIDATE_ISOLATED_PROTOTYPE_EXPRESSION",
  });
  const availableInput = Object.freeze({
    expressionChannelConsumptionResultReference: expressionConsumption,
    prototypeRendererInputReference: inputReference,
    rendererRequestReference,
  });
  const before = JSON.stringify(availableInput);
  const available = resolveStarBeastPrototypeRendererInputContract(availableInput);

  assertEqual("P82 AVAILABLE forms input contract", available.status, "AVAILABLE");
  assertEqual("consumption result reference preserved", available.contract.sourceConsumptionResultReference === expressionConsumption, true);
  assertEqual("input reference preserved", available.contract.sourceInputReference === inputReference, true);
  assertEqual("request reference preserved", available.contract.rendererRequestReference === rendererRequestReference, true);
  assertEqual("expression channels preserved", available.contract.expressionChannelsReference === adapterResult.expressionChannels, true);
  assertEqual("renderer contract preserved", available.contract.rendererContractReference === rendererContractReference, true);
  assertEqual("scope preserved", available.contract.isolatedPrototypeScopeReference === isolationScopeReference, true);
  assertEqual("contract remains renderer neutral", available.contract.rendererNeutral, true);
  assertEqual("contract executes no render", available.contract.boundary.noRenderExecution, true);
  assertEqual("contract has no draw commands", available.contract.boundary.noDrawCommands, true);
  assertEqual("input unchanged", JSON.stringify(availableInput), before);

  const unavailableConsumption = consumeStarBeastPrototypeExpressionChannels(Object.freeze({
    ...expressionConsumptionInput,
    prototypeAdapterReference: null,
  }));
  const unavailable = resolveStarBeastPrototypeRendererInputContract(Object.freeze({
    ...availableInput,
    expressionChannelConsumptionResultReference: unavailableConsumption,
  }));
  assertEqual("P82 UNAVAILABLE stays unavailable", unavailable.status, "UNAVAILABLE");
  assertEqual("unavailable source reason preserved", unavailable.sourceUnavailableReason, "PROTOTYPE_ADAPTER_REFERENCE_REQUIRED");

  const blockedConsumption = consumeStarBeastPrototypeExpressionChannels(Object.freeze({
    ...expressionConsumptionInput,
    prototypeAdapterReference: Object.freeze({ ...adapterResult }),
  }));
  const blocked = resolveStarBeastPrototypeRendererInputContract(Object.freeze({
    ...availableInput,
    expressionChannelConsumptionResultReference: blockedConsumption,
  }));
  assertEqual("P82 BLOCKED stays blocked", blocked.status, "BLOCKED");
  assertEqual("blocked source reason preserved", blocked.sourceBlockedReason, "PROTOTYPE_ADAPTER_REFERENCE_MISMATCH");

  const missingReference = resolveStarBeastPrototypeRendererInputContract(Object.freeze({
    ...availableInput,
    prototypeRendererInputReference: null,
  }));
  assertEqual("missing input reference is unavailable", missingReference.status, "UNAVAILABLE");

  const driftedReference = resolveStarBeastPrototypeRendererInputContract(Object.freeze({
    ...availableInput,
    prototypeRendererInputReference: Object.freeze({ ...inputReference }),
  }));
  assertEqual("input reference drift is blocked", driftedReference.status, "BLOCKED");
  assertEqual("input drift reason", driftedReference.reason, "PROTOTYPE_RENDERER_INPUT_REFERENCE_MISMATCH");

  const invalidRequest = resolveStarBeastPrototypeRendererInputContract(Object.freeze({
    ...availableInput,
    rendererRequestReference: Object.freeze({ ...rendererRequestReference, requestPurpose: "EXECUTE_RENDER" }),
  }));
  assertEqual("execution request is blocked", invalidRequest.status, "BLOCKED");
  assertEqual("execution request reason", invalidRequest.reason, "PROTOTYPE_RENDERER_REQUEST_REFERENCE_INVALID");

  Object.values(modulePaths).forEach((modulePath) => fs.rmSync(modulePath, { force: true }));
}

if (failures.length > 0) {
  console.error(`FAIL | star beast prototype renderer input contract | count=${failures.length}`);
  failures.forEach((failure) => console.error(`- ${failure}`));
  process.exit(1);
}

console.log("PASS | star beast prototype renderer input contract gate");
