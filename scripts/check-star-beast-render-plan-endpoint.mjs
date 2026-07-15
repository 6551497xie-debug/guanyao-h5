import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import process from "node:process";
import { build } from "esbuild";

const rootDir = process.cwd();
const endpointPath = path.join(rootDir, "src/services/starBeastRenderPlanEndpoint.ts");
const adapterPath = path.join(rootDir, "src/services/starBeastRenderPlanAdapter.ts");
const consumptionPath = path.join(rootDir, "src/services/starBeastRenderPlanConsumptionService.ts");
const visualMappingPath = path.join(rootDir, "src/services/starBeastVisualStateMapping.ts");
const protocolPath = path.join(rootDir, "docs/GUANYAO_STAR_BEAST_RENDER_PLAN_ENDPOINT_PROTOCOL.md");
const adapterProtocolPath = path.join(rootDir, "docs/GUANYAO_STAR_BEAST_RENDER_PLAN_ADAPTER_PROTOCOL.md");
const consumptionProtocolPath = path.join(rootDir, "docs/GUANYAO_STAR_BEAST_RENDER_PLAN_CONSUMPTION_PROTOCOL.md");
const packagePath = path.join(rootDir, "package.json");
const tempModulePath = path.join(os.tmpdir(), `guanyao-star-beast-render-plan-endpoint-${process.pid}.mjs`);

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

for (const [name, filePath] of [
  ["render plan endpoint", endpointPath],
  ["render plan adapter", adapterPath],
  ["render plan consumption", consumptionPath],
  ["visual state mapping", visualMappingPath],
  ["render plan endpoint protocol", protocolPath],
  ["render plan adapter protocol", adapterProtocolPath],
  ["render plan consumption protocol", consumptionProtocolPath],
  ["package manifest", packagePath],
]) {
  if (!fs.existsSync(filePath)) failures.push(`${name} file missing=${filePath}`);
  else console.log(`PASS | ${name} file exists`);
}

if (failures.length === 0) {
  const endpointSource = fs.readFileSync(endpointPath, "utf8");
  const adapterSource = fs.readFileSync(adapterPath, "utf8");
  const consumptionSource = fs.readFileSync(consumptionPath, "utf8");
  const visualMappingSource = fs.readFileSync(visualMappingPath, "utf8");
  const protocolSource = fs.readFileSync(protocolPath, "utf8");
  const adapterProtocolSource = fs.readFileSync(adapterProtocolPath, "utf8");
  const consumptionProtocolSource = fs.readFileSync(consumptionProtocolPath, "utf8");
  const packageJson = JSON.parse(fs.readFileSync(packagePath, "utf8"));

  [
    'from "./starBeastRenderPlanAdapter"',
    'from "./starBeastRenderPlanConsumptionService"',
    "export type StarBeastRenderPlanEndpointInput = StarBeastRendererInput",
    "export function resolveStarBeastRenderPlanConsumption",
    "input: StarBeastRenderPlanEndpointInput",
    "): StarBeastRenderPlanConsumptionResult",
    "const rendererOutput = adaptStarBeastRendererInputToRenderPlan(input)",
    "return consumeStarBeastRenderPlan(",
    "Object.freeze({",
    "rendererOutput,",
    'rendererOutput.status === "PLANNED" ? rendererOutput.plan : null',
    "export type { StarBeastRenderPlanConsumptionResult }",
  ].forEach((marker) => assertIncludes("render plan endpoint composition", endpointSource, marker));

  [
    "mapStarBeastLifeStateToVisualState(",
    "STAR_BEAST_REQUIRED_RENDERER_CAPABILITIES",
    "MANIFESTATION_LAYER",
    "RENDERER_CAPABILITY_UNAVAILABLE",
    "RENDER_PLAN_REFERENCE_REQUIRED",
    "RENDER_PLAN_REFERENCE_MISMATCH",
    'semanticRole: "STAR_BEAST_RENDER_PLAN"',
    "fourSymbol",
    "FourSymbol",
    "Hexagram",
    "hexagram",
    "personality",
    "Persona",
    "Canvas",
    "canvas",
    "WebGL",
    "THREE",
    "three",
    "requestAnimationFrame",
    "drawImage(",
    "getContext(",
    "shader",
    "textureUrl",
    "assetUrl",
    "localStorage",
    "sessionStorage",
    "fetch(",
    'from "react"',
    "/pages/",
    "/components/",
  ].forEach((marker) => assertExcludes("render plan endpoint stays composition-only", endpointSource, marker));

  assertIncludes("P41 owns plan adaptation", adapterSource, "export function adaptStarBeastRendererInputToRenderPlan");
  assertIncludes("P42 owns plan consumption", consumptionSource, "export function consumeStarBeastRenderPlan");
  assertExcludes("P39 mapping does not consume endpoint", visualMappingSource, "resolveStarBeastRenderPlanConsumption(");

  const endpointCallSites = collectTypeScriptSourcePaths(path.join(rootDir, "src"))
    .filter((filePath) => fs.readFileSync(filePath, "utf8").includes("resolveStarBeastRenderPlanConsumption("))
    .map((filePath) => path.relative(rootDir, filePath))
    .sort();
  assertEqual(
    "render plan endpoint has no external consumer",
    endpointCallSites.join(","),
    "src/services/starBeastRenderPlanEndpoint.ts",
  );

  const adapterCallSites = collectTypeScriptSourcePaths(path.join(rootDir, "src"))
    .filter((filePath) => fs.readFileSync(filePath, "utf8").includes("adaptStarBeastRendererInputToRenderPlan("))
    .map((filePath) => path.relative(rootDir, filePath))
    .sort();
  assertEqual(
    "P41 adapter is only composed by P43 endpoint",
    adapterCallSites.join(","),
    [
      "src/services/starBeastRenderPlanAdapter.ts",
      "src/services/starBeastRenderPlanEndpoint.ts",
    ].sort().join(","),
  );

  const consumptionCallSites = collectTypeScriptSourcePaths(path.join(rootDir, "src"))
    .filter((filePath) => fs.readFileSync(filePath, "utf8").includes("consumeStarBeastRenderPlan("))
    .map((filePath) => path.relative(rootDir, filePath))
    .sort();
  assertEqual(
    "P42 consumption is only composed by P43 endpoint",
    consumptionCallSites.join(","),
    [
      "src/services/starBeastRenderPlanConsumptionService.ts",
      "src/services/starBeastRenderPlanEndpoint.ts",
    ].sort().join(","),
  );

  const visualMappingCallSites = collectTypeScriptSourcePaths(path.join(rootDir, "src"))
    .filter((filePath) => fs.readFileSync(filePath, "utf8").includes("mapStarBeastLifeStateToVisualState("))
    .map((filePath) => path.relative(rootDir, filePath))
    .sort();
  assertEqual(
    "P43 does not invoke P39 visual mapping",
    visualMappingCallSites.join(","),
    "src/services/starBeastVisualStateMapping.ts",
  );

  [
    "RC-STAR-BEAST-RENDER-PLAN-ENDPOINT-P43",
    "STABLE RENDER PLAN ENDPOINT",
    "P43 闭合 P40–P42 语义计划链",
    "P41 Render Plan Adapter",
    "P42 Render Plan Consumption",
    "P43 不是 Renderer",
    "resolveStarBeastRenderPlanConsumption",
    "同一个 Plan 引用交给 P42",
    "只返回 P42 `StarBeastRenderPlanConsumptionResult`",
    "P43 是 P40–P42 链唯一正式入口",
    "P43 当前没有 Renderer、UI 或 Runtime 消费者",
    "Future Renderer 必须消费 P43 Endpoint 的 AVAILABLE 结果",
    "P44 冻结 P39–P43 的类型边界、调用所有权与禁止绕行规则",
    "StarBeastRenderPlanConsumptionResult` 是冻结链唯一授权出口",
    "P45 Renderer Readiness 已通过独立施工协议成为该 Result 的唯一消费者",
    "P43 Resolver 继续保持无外部直接调用者",
    "P43 Result 只允许流向 P45 Readiness",
    "Canvas、WebGL、Three.js",
    "不修改 P0–P42",
  ].forEach((marker) => assertIncludes("render plan endpoint protocol", protocolSource, marker));

  [
    "P41 Adapter 只允许由 P43 Render Plan Endpoint 组合调用",
    "P42 只建立稳定消费边界，P43 只闭合调用链，二者都不实现 Renderer",
    "Future Renderer 只能在后续独立边界中消费 P43 Endpoint 的 AVAILABLE 结果",
  ].forEach((marker) => assertIncludes("P41 ownership is endpoint-calibrated", adapterProtocolSource, marker));
  [
    "P42 Consumption Result 只允许由 P43 Render Plan Endpoint 对外提供",
    "P43 只闭合 P41 / P42 调用链，不实现 Renderer",
    "Future Renderer 必须消费 P43 Endpoint 的 AVAILABLE 结果",
  ].forEach((marker) => assertIncludes("P42 ownership is endpoint-calibrated", consumptionProtocolSource, marker));

  assertIncludes(
    "render plan endpoint gate command is registered",
    packageJson.scripts?.["check:star-beast-render-plan-endpoint"] ?? "",
    "node scripts/check-star-beast-render-plan-endpoint.mjs",
  );
  assertIncludes(
    "render plan endpoint gate participates in release",
    packageJson.scripts?.["check:release"] ?? "",
    "npm run check:star-beast-render-plan-endpoint",
  );

  await build({
    entryPoints: [endpointPath],
    outfile: tempModulePath,
    bundle: true,
    platform: "node",
    format: "esm",
    target: "node20",
    logLevel: "silent",
  });

  const { resolveStarBeastRenderPlanConsumption } = await import(`file://${tempModulePath}?t=${Date.now()}`);

  const requestReference = Object.freeze({ referenceType: "STAR_BEAST_RENDER_REQUEST", referenceId: "render-request:awareness" });
  const visualState = Object.freeze({
    semanticRole: "STAR_BEAST_VISUAL_STATE",
    identity: Object.freeze({ referenceType: "STAR_BEAST_IDENTITY", referenceId: "identity:self" }),
    archetype: Object.freeze({ referenceType: "LIFE_ARCHETYPE", referenceId: "archetype:qian" }),
    journeyState: "AWARENESS",
    manifestationDepth: "EMERGING",
    energyFlowState: "RECOVERING",
    lightState: "RETURNING",
    starPatternState: "RECONNECTING_PATTERN",
    crystalPresenceState: "NOT_REFERENCED",
    presenceState: "RETURNING_TO_PRESENCE",
    expression: Object.freeze({
      intensity: 0.68,
      particleDensity: 0.52,
      lightFlowDirection: "OUTWARD",
      breathingRhythm: "RECOVERING",
      constellationComplexity: 0.58,
      expressionParametersOnly: true,
      notLifeFacts: true,
    }),
    sourceReferences: Object.freeze({ lifeStateReference: null, memoryReference: null, crystalReference: null }),
    visualMappingOnly: true,
    noLifeStateMutation: true,
    noRendering: true,
    noMemoryGrowthInference: true,
  });
  const capabilities = Object.freeze([
    "MANIFESTATION_LAYER",
    "ENERGY_FLOW_CHANNEL",
    "LIGHT_FLOW_CHANNEL",
    "BREATHING_CHANNEL",
    "STAR_FIELD_CHANNEL",
    "CRYSTAL_PRESENCE_CHANNEL",
  ]);
  const capabilityGuardrails = Object.freeze({
    consumesVisualStateOnly: true,
    producesRenderPlanOnly: true,
    noLifeStateInference: true,
    noLifeStateMutation: true,
    noMemoryInference: true,
    noGrowthInference: true,
  });
  const readyInput = Object.freeze({
    requestReference,
    visualStateReference: visualState,
    capabilityDeclaration: Object.freeze({ capabilities, ...capabilityGuardrails }),
  });
  const readyInputSnapshot = JSON.stringify(readyInput);
  const available = resolveStarBeastRenderPlanConsumption(readyInput);

  assertEqual("complete input reaches available consumption", available.status, "AVAILABLE");
  assertEqual("endpoint returns P42 source", available.source, "star_beast_render_plan_consumption");
  assertEqual("P41 output is planned", available.consumption.sourceRendererOutput.status, "PLANNED");
  assertEqual("endpoint passes the same plan reference", available.consumption.renderPlanReference === available.consumption.sourceRendererOutput.plan, true);
  assertEqual("endpoint preserves renderer input", available.consumption.sourceRendererOutput.input === readyInput, true);
  assertEqual("endpoint preserves request reference", available.consumption.sourceRequestReference === requestReference, true);
  assertEqual("endpoint consumption input is frozen", Object.isFrozen(available.input), true);
  assertEqual("endpoint result is frozen", Object.isFrozen(available), true);
  assertEqual("endpoint does not mutate input", JSON.stringify(readyInput), readyInputSnapshot);

  const unavailableInput = Object.freeze({
    ...readyInput,
    capabilityDeclaration: Object.freeze({
      capabilities: Object.freeze(capabilities.slice(0, -1)),
      ...capabilityGuardrails,
    }),
  });
  const unavailable = resolveStarBeastRenderPlanConsumption(unavailableInput);
  assertEqual("incomplete input reaches unavailable consumption", unavailable.status, "UNAVAILABLE");
  assertEqual("P42 unavailable reason is preserved", unavailable.reason, "RENDER_PLAN_OUTPUT_UNAVAILABLE");
  assertEqual("P41 unavailable reason is preserved", unavailable.sourceUnavailableReason, "RENDERER_CAPABILITY_UNAVAILABLE");
  assertEqual("P41 output stays unavailable", unavailable.sourceRendererOutput.status, "UNAVAILABLE");
  assertEqual("unavailable endpoint result has no consumption", "consumption" in unavailable, false);
  assertEqual("unavailable endpoint input is frozen", Object.isFrozen(unavailable.input), true);
}

fs.rmSync(tempModulePath, { force: true });

if (failures.length > 0) {
  console.error("\n[STAR BEAST RENDER PLAN ENDPOINT] FAIL");
  failures.forEach((failure) => console.error(`- ${failure}`));
  process.exit(1);
}
console.log("\n[STAR BEAST RENDER PLAN ENDPOINT] PASS");
