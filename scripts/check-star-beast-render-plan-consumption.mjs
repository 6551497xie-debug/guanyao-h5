import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import process from "node:process";
import { build } from "esbuild";

const rootDir = process.cwd();
const typePath = path.join(rootDir, "src/types/starBeastRenderPlanConsumption.ts");
const typeIndexPath = path.join(rootDir, "src/types/index.ts");
const servicePath = path.join(rootDir, "src/services/starBeastRenderPlanConsumptionService.ts");
const adapterPath = path.join(rootDir, "src/services/starBeastRenderPlanAdapter.ts");
const visualMappingPath = path.join(rootDir, "src/services/starBeastVisualStateMapping.ts");
const protocolPath = path.join(rootDir, "docs/GUANYAO_STAR_BEAST_RENDER_PLAN_CONSUMPTION_PROTOCOL.md");
const adapterProtocolPath = path.join(rootDir, "docs/GUANYAO_STAR_BEAST_RENDER_PLAN_ADAPTER_PROTOCOL.md");
const packagePath = path.join(rootDir, "package.json");
const tempModulePath = path.join(os.tmpdir(), `guanyao-star-beast-render-plan-consumption-${process.pid}.mjs`);

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
  ["render plan consumption type", typePath],
  ["type index", typeIndexPath],
  ["render plan consumption service", servicePath],
  ["render plan adapter", adapterPath],
  ["visual state mapping", visualMappingPath],
  ["render plan consumption protocol", protocolPath],
  ["render plan adapter protocol", adapterProtocolPath],
  ["package manifest", packagePath],
]) {
  if (!fs.existsSync(filePath)) failures.push(`${name} file missing=${filePath}`);
  else console.log(`PASS | ${name} file exists`);
}

if (failures.length === 0) {
  const typeSource = fs.readFileSync(typePath, "utf8");
  const typeIndexSource = fs.readFileSync(typeIndexPath, "utf8");
  const serviceSource = fs.readFileSync(servicePath, "utf8");
  const adapterSource = fs.readFileSync(adapterPath, "utf8");
  const visualMappingSource = fs.readFileSync(visualMappingPath, "utf8");
  const protocolSource = fs.readFileSync(protocolPath, "utf8");
  const adapterProtocolSource = fs.readFileSync(adapterProtocolPath, "utf8");
  const packageJson = JSON.parse(fs.readFileSync(packagePath, "utf8"));

  [
    "export type StarBeastRenderPlanConsumptionInput",
    "rendererOutput: StarBeastRendererOutput",
    "renderPlanReference: StarBeastRenderPlan | null",
    "export type StarBeastRenderPlanConsumption",
    'semanticRole: "STAR_BEAST_RENDER_PLAN_CONSUMPTION"',
    "renderPlanReference: StarBeastRenderPlan",
    "sourceRendererOutput: StarBeastRendererPlannedOutput",
    "sourceRequestReference:",
    'consumptionStatus: "AVAILABLE_FOR_FUTURE_RENDERER"',
    "rendererImplementationDeferred: true",
    "noRenderExecution: true",
    "noPlanMutation: true",
    "export type StarBeastRenderPlanConsumptionAvailable",
    'status: "AVAILABLE"',
    "export type StarBeastRenderPlanConsumptionUnavailableReason",
    '"RENDER_PLAN_OUTPUT_UNAVAILABLE"',
    '"RENDER_PLAN_REFERENCE_REQUIRED"',
    '"RENDER_PLAN_REFERENCE_MISMATCH"',
    "export type StarBeastRenderPlanConsumptionUnavailable",
    'status: "UNAVAILABLE"',
    "sourceUnavailableReason: StarBeastRendererUnavailableReason | null",
    "noRenderPlanConsumption: true",
    "export type StarBeastRenderPlanConsumptionResult",
  ].forEach((marker) => assertIncludes("render plan consumption type contract", typeSource, marker));

  [
    "export function consumeStarBeastRenderPlan",
    "input: StarBeastRenderPlanConsumptionInput",
    "): StarBeastRenderPlanConsumptionResult",
    'sourceRendererOutput.status === "UNAVAILABLE"',
    '"RENDER_PLAN_OUTPUT_UNAVAILABLE"',
    "input.renderPlanReference === null",
    '"RENDER_PLAN_REFERENCE_REQUIRED"',
    "input.renderPlanReference !== sourceRendererOutput.plan",
    '"RENDER_PLAN_REFERENCE_MISMATCH"',
    'semanticRole: "STAR_BEAST_RENDER_PLAN_CONSUMPTION"',
    "renderPlanReference: input.renderPlanReference",
    "sourceRendererOutput",
    "sourceRequestReference: sourceRendererOutput.input.requestReference",
    'consumptionStatus: "AVAILABLE_FOR_FUTURE_RENDERER"',
    "rendererImplementationDeferred: true",
    "noRenderExecution: true",
    "noPlanMutation: true",
    'status: "AVAILABLE"',
  ].forEach((marker) => assertIncludes("render plan consumption service contract", serviceSource, marker));

  [
    "adaptStarBeastRendererInputToRenderPlan(",
    "mapStarBeastLifeStateToVisualState(",
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
  ].forEach((marker) => assertExcludes("render plan consumption stays reference-only", serviceSource, marker));

  [
    "StarBeastRenderPlanConsumption",
    "StarBeastRenderPlanConsumptionInput",
    "StarBeastRenderPlanConsumptionResult",
    "StarBeastRenderPlanConsumptionUnavailableReason",
    'from "./starBeastRenderPlanConsumption"',
  ].forEach((marker) => assertIncludes("type index exports render plan consumption", typeIndexSource, marker));

  assertExcludes("P41 adapter does not consume P42", adapterSource, "consumeStarBeastRenderPlan(");
  assertExcludes("P39 mapping does not consume P42", visualMappingSource, "consumeStarBeastRenderPlan(");

  const consumptionCallSites = collectTypeScriptSourcePaths(path.join(rootDir, "src"))
    .filter((filePath) => fs.readFileSync(filePath, "utf8").includes("consumeStarBeastRenderPlan("))
    .map((filePath) => path.relative(rootDir, filePath))
    .sort();
  assertEqual(
    "render plan consumption is only composed by P43 endpoint",
    consumptionCallSites.join(","),
    [
      "src/services/starBeastRenderPlanConsumptionService.ts",
      "src/services/starBeastRenderPlanEndpoint.ts",
    ].sort().join(","),
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

  [
    "RC-STAR-BEAST-RENDER-PLAN-CONSUMPTION-P42",
    "RENDER PLAN CONSUMPTION BOUNDARY",
    "Render Plan Reference Validation",
    "Render Plan Consumption 不是 Renderer",
    "P42 不调用 P41 Adapter",
    "PLANNED",
    "AVAILABLE_FOR_FUTURE_RENDERER",
    "RENDER_PLAN_OUTPUT_UNAVAILABLE",
    "RENDER_PLAN_REFERENCE_REQUIRED",
    "RENDER_PLAN_REFERENCE_MISMATCH",
    "P42 是 P41 Renderer Output 的唯一正式消费边界",
    "P42 Consumption Result 只允许由 P43 Render Plan Endpoint 对外提供",
    "P42 当前没有 Renderer 业务消费者",
    "P43 只闭合 P41 / P42 调用链，不实现 Renderer",
    "Future Renderer 必须消费 P43 Endpoint 的 AVAILABLE 结果",
    "Canvas、WebGL、Three.js",
    "不修改 P0–P41",
  ].forEach((marker) => assertIncludes("render plan consumption protocol", protocolSource, marker));

  [
    "P41 Renderer Output 只允许由 P42 Render Plan Consumption 消费",
    "P41 Adapter 只允许由 P43 Render Plan Endpoint 组合调用",
    "P42 只建立稳定消费边界，P43 只闭合调用链，二者都不实现 Renderer",
    "Future Renderer 只能在后续独立边界中消费 P43 Endpoint 的 AVAILABLE 结果",
  ].forEach((marker) => assertIncludes("P41 ownership is calibrated", adapterProtocolSource, marker));

  assertIncludes(
    "render plan consumption gate command is registered",
    packageJson.scripts?.["check:star-beast-render-plan-consumption"] ?? "",
    "node scripts/check-star-beast-render-plan-consumption.mjs",
  );
  assertIncludes(
    "render plan consumption gate participates in release",
    packageJson.scripts?.["check:release"] ?? "",
    "npm run check:star-beast-render-plan-consumption",
  );

  await build({
    entryPoints: [servicePath],
    outfile: tempModulePath,
    bundle: true,
    platform: "node",
    format: "esm",
    target: "node20",
    logLevel: "silent",
  });

  const { consumeStarBeastRenderPlan } = await import(`file://${tempModulePath}?t=${Date.now()}`);

  const requestReference = Object.freeze({ referenceType: "STAR_BEAST_RENDER_REQUEST", referenceId: "render-request:awareness" });
  const rendererInput = Object.freeze({
    requestReference,
    visualStateReference: Object.freeze({ semanticRole: "STAR_BEAST_VISUAL_STATE", referenceId: "visual-state:awareness" }),
    capabilityDeclaration: Object.freeze({ capabilities: Object.freeze(["MANIFESTATION_LAYER"]) }),
  });
  const renderPlan = Object.freeze({
    semanticRole: "STAR_BEAST_RENDER_PLAN",
    sourceVisualStateReference: rendererInput.visualStateReference,
    channels: Object.freeze({
      manifestation: Object.freeze({ depth: "EMERGING", presence: "RETURNING_TO_PRESENCE" }),
      energy: Object.freeze({ flow: "RECOVERING", breathingRhythm: "RECOVERING" }),
      light: Object.freeze({ state: "RETURNING", direction: "OUTWARD", intensity: 0.68 }),
      starField: Object.freeze({ pattern: "RECONNECTING_PATTERN", particleDensity: 0.52, constellationComplexity: 0.58 }),
      crystal: Object.freeze({ presence: "NOT_REFERENCED" }),
    }),
    rendererNeutral: true,
    semanticChannelsOnly: true,
    noPixelOutput: true,
    noDrawCommands: true,
    noAssetGeneration: true,
  });
  const plannedOutput = Object.freeze({
    status: "PLANNED",
    source: "star_beast_renderer_contract",
    input: rendererInput,
    plan: renderPlan,
  });
  const availableInput = Object.freeze({ rendererOutput: plannedOutput, renderPlanReference: renderPlan });
  const availableInputSnapshot = JSON.stringify(availableInput);
  const available = consumeStarBeastRenderPlan(availableInput);

  assertEqual("planned output with same plan reference is available", available.status, "AVAILABLE");
  assertEqual("available result preserves input", available.input === availableInput, true);
  assertEqual("consumption preserves plan reference", available.consumption.renderPlanReference === renderPlan, true);
  assertEqual("consumption preserves renderer output", available.consumption.sourceRendererOutput === plannedOutput, true);
  assertEqual("consumption preserves request reference", available.consumption.sourceRequestReference === requestReference, true);
  assertEqual("future renderer status is explicit", available.consumption.consumptionStatus, "AVAILABLE_FOR_FUTURE_RENDERER");
  assertEqual("available result is frozen", Object.isFrozen(available), true);
  assertEqual("consumption is frozen", Object.isFrozen(available.consumption), true);
  assertEqual("consumption does not copy channels", "channels" in available.consumption, false);
  assertEqual("available input is not mutated", JSON.stringify(availableInput), availableInputSnapshot);

  const missingReferenceInput = Object.freeze({ rendererOutput: plannedOutput, renderPlanReference: null });
  const missingReference = consumeStarBeastRenderPlan(missingReferenceInput);
  assertEqual("missing plan reference is unavailable", missingReference.status, "UNAVAILABLE");
  assertEqual("missing plan reason is stable", missingReference.reason, "RENDER_PLAN_REFERENCE_REQUIRED");
  assertEqual("missing plan does not create consumption", "consumption" in missingReference, false);

  const mismatchedPlan = Object.freeze({ ...renderPlan });
  const mismatchedInput = Object.freeze({ rendererOutput: plannedOutput, renderPlanReference: mismatchedPlan });
  const mismatched = consumeStarBeastRenderPlan(mismatchedInput);
  assertEqual("mismatched plan reference is unavailable", mismatched.status, "UNAVAILABLE");
  assertEqual("mismatched plan reason is stable", mismatched.reason, "RENDER_PLAN_REFERENCE_MISMATCH");
  assertEqual("mismatched plan does not create consumption", "consumption" in mismatched, false);

  const unavailableOutput = Object.freeze({
    status: "UNAVAILABLE",
    source: "star_beast_renderer_contract",
    reason: "RENDERER_CAPABILITY_UNAVAILABLE",
    input: rendererInput,
    noRenderPlan: true,
  });
  const unavailableInput = Object.freeze({ rendererOutput: unavailableOutput, renderPlanReference: null });
  const unavailableResult = consumeStarBeastRenderPlan(unavailableInput);
  assertEqual("unavailable renderer output stays unavailable", unavailableResult.status, "UNAVAILABLE");
  assertEqual("unavailable output reason is stable", unavailableResult.reason, "RENDER_PLAN_OUTPUT_UNAVAILABLE");
  assertEqual("source unavailable reason is preserved", unavailableResult.sourceUnavailableReason, "RENDERER_CAPABILITY_UNAVAILABLE");
  assertEqual("unavailable output reference is preserved", unavailableResult.sourceRendererOutput === unavailableOutput, true);
  assertEqual("unavailable result does not create consumption", "consumption" in unavailableResult, false);
  assertEqual("unavailable result is frozen", Object.isFrozen(unavailableResult), true);
}

fs.rmSync(tempModulePath, { force: true });

if (failures.length > 0) {
  console.error("\n[STAR BEAST RENDER PLAN CONSUMPTION] FAIL");
  failures.forEach((failure) => console.error(`- ${failure}`));
  process.exit(1);
}
console.log("\n[STAR BEAST RENDER PLAN CONSUMPTION] PASS");
