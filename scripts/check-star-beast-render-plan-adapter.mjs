import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import process from "node:process";
import { build } from "esbuild";

const rootDir = process.cwd();
const adapterPath = path.join(rootDir, "src/services/starBeastRenderPlanAdapter.ts");
const contractPath = path.join(rootDir, "src/types/starBeastRendererContract.ts");
const visualStatePath = path.join(rootDir, "src/types/starBeastVisualState.ts");
const visualMappingPath = path.join(rootDir, "src/services/starBeastVisualStateMapping.ts");
const protocolPath = path.join(rootDir, "docs/GUANYAO_STAR_BEAST_RENDER_PLAN_ADAPTER_PROTOCOL.md");
const rendererProtocolPath = path.join(rootDir, "docs/GUANYAO_STAR_BEAST_RENDERER_CONTRACT_PROTOCOL.md");
const visualProtocolPath = path.join(rootDir, "docs/GUANYAO_STAR_BEAST_VISUAL_STATE_SCHEMA_PROTOCOL.md");
const packagePath = path.join(rootDir, "package.json");
const tempModulePath = path.join(os.tmpdir(), `guanyao-star-beast-render-plan-adapter-${process.pid}.mjs`);

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
  ["render plan adapter", adapterPath],
  ["renderer contract", contractPath],
  ["visual state type", visualStatePath],
  ["visual state mapping", visualMappingPath],
  ["render plan adapter protocol", protocolPath],
  ["renderer contract protocol", rendererProtocolPath],
  ["visual state protocol", visualProtocolPath],
  ["package manifest", packagePath],
]) {
  if (!fs.existsSync(filePath)) failures.push(`${name} file missing=${filePath}`);
  else console.log(`PASS | ${name} file exists`);
}

if (failures.length === 0) {
  const adapterSource = fs.readFileSync(adapterPath, "utf8");
  const contractSource = fs.readFileSync(contractPath, "utf8");
  const visualStateSource = fs.readFileSync(visualStatePath, "utf8");
  const visualMappingSource = fs.readFileSync(visualMappingPath, "utf8");
  const protocolSource = fs.readFileSync(protocolPath, "utf8");
  const rendererProtocolSource = fs.readFileSync(rendererProtocolPath, "utf8");
  const visualProtocolSource = fs.readFileSync(visualProtocolPath, "utf8");
  const packageJson = JSON.parse(fs.readFileSync(packagePath, "utf8"));

  [
    "STAR_BEAST_REQUIRED_RENDERER_CAPABILITIES",
    '"MANIFESTATION_LAYER"',
    '"ENERGY_FLOW_CHANNEL"',
    '"LIGHT_FLOW_CHANNEL"',
    '"BREATHING_CHANNEL"',
    '"STAR_FIELD_CHANNEL"',
    '"CRYSTAL_PRESENCE_CHANNEL"',
    "export function adaptStarBeastRendererInputToRenderPlan",
    "input: StarBeastRendererInput",
    "): StarBeastRendererOutput",
    "STAR_BEAST_REQUIRED_RENDERER_CAPABILITIES.every",
    "input.capabilityDeclaration.capabilities.includes(capability)",
    'status: "UNAVAILABLE"',
    'reason: "RENDERER_CAPABILITY_UNAVAILABLE"',
    "noRenderPlan: true",
    'semanticRole: "STAR_BEAST_RENDER_PLAN"',
    "sourceVisualStateReference: visualState",
    "manifestation: Object.freeze",
    "energy: Object.freeze",
    "light: Object.freeze",
    "starField: Object.freeze",
    "crystal: Object.freeze",
    "rendererNeutral: true",
    "semanticChannelsOnly: true",
    "noPixelOutput: true",
    "noDrawCommands: true",
    "noAssetGeneration: true",
    'status: "PLANNED"',
  ].forEach((marker) => assertIncludes("render plan adapter contract", adapterSource, marker));

  [
    "mapStarBeastLifeStateToVisualState(",
    "StarBeastLifeState",
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
  ].forEach((marker) => assertExcludes("render plan adapter stays semantic-only", adapterSource, marker));

  assertIncludes("P40 owns renderer input", contractSource, "export type StarBeastRendererInput");
  assertIncludes("P40 owns render plan", contractSource, "export type StarBeastRenderPlan");
  assertIncludes("P39 owns visual state", visualStateSource, "export type StarBeastVisualState");
  assertExcludes("P39 mapping does not consume P41 adapter", visualMappingSource, "adaptStarBeastRendererInputToRenderPlan");

  const adapterCallSites = collectTypeScriptSourcePaths(path.join(rootDir, "src"))
    .filter((filePath) => fs.readFileSync(filePath, "utf8").includes("adaptStarBeastRendererInputToRenderPlan("))
    .map((filePath) => path.relative(rootDir, filePath))
    .sort();
  assertEqual(
    "render plan adapter has no downstream consumer",
    adapterCallSites.join(","),
    "src/services/starBeastRenderPlanAdapter.ts",
  );

  const visualMappingCallSites = collectTypeScriptSourcePaths(path.join(rootDir, "src"))
    .filter((filePath) => fs.readFileSync(filePath, "utf8").includes("mapStarBeastLifeStateToVisualState("))
    .map((filePath) => path.relative(rootDir, filePath))
    .sort();
  assertEqual(
    "P41 does not call P39 visual mapping",
    visualMappingCallSites.join(","),
    "src/services/starBeastVisualStateMapping.ts",
  );

  const renderPlanReferences = collectTypeScriptSourcePaths(path.join(rootDir, "src"))
    .filter((filePath) => fs.readFileSync(filePath, "utf8").includes("StarBeastRenderPlan"))
    .map((filePath) => path.relative(rootDir, filePath))
    .sort();
  assertEqual(
    "render plan is only owned by P40 and constructed by P41",
    renderPlanReferences.join(","),
    [
      "src/services/starBeastRenderPlanAdapter.ts",
      "src/services/starBeastRenderPlanConsumptionService.ts",
      "src/types/index.ts",
      "src/types/starBeastRenderPlanConsumption.ts",
      "src/types/starBeastRendererContract.ts",
    ].sort().join(","),
  );

  [
    "RC-STAR-BEAST-RENDER-PLAN-ADAPTER-P41",
    "SEMANTIC RENDER PLAN ADAPTER",
    "Renderer Capability Validation",
    "P41 不是 Renderer",
    "P41 不调用 P39 `mapStarBeastLifeStateToVisualState`",
    "六类语义能力",
    "RENDERER_CAPABILITY_UNAVAILABLE",
    "五个通道",
    "P41 是具体 `StarBeastRenderPlan` 的唯一正式构造边界",
    "P41 Renderer Output 只允许由 P42 Render Plan Consumption 消费",
    "P41 当前没有 Renderer 业务消费者",
    "P42 只建立稳定消费边界，不实现 Renderer",
    "Future Renderer 只能在后续独立边界中消费 P42 AVAILABLE 结果",
    "Canvas、WebGL、Three.js",
    "不修改 P0–P40",
  ].forEach((marker) => assertIncludes("render plan adapter protocol", protocolSource, marker));

  [
    "P40 Renderer Input / Output Contract 只由 P41 Render Plan Adapter 实现",
    "P41 是具体 `StarBeastRenderPlan` 的唯一正式构造边界",
    "P41 当前没有 Renderer 业务消费者",
  ].forEach((marker) => assertIncludes("P40 ownership is calibrated", rendererProtocolSource, marker));
  assertIncludes(
    "P39 ownership is calibrated",
    visualProtocolSource,
    "P41 只建立 Render Plan Adapter，不实现 Renderer",
  );

  assertIncludes(
    "render plan adapter gate command is registered",
    packageJson.scripts?.["check:star-beast-render-plan-adapter"] ?? "",
    "node scripts/check-star-beast-render-plan-adapter.mjs",
  );
  assertIncludes(
    "render plan adapter gate participates in release",
    packageJson.scripts?.["check:release"] ?? "",
    "npm run check:star-beast-render-plan-adapter",
  );

  await build({
    entryPoints: [adapterPath],
    outfile: tempModulePath,
    bundle: true,
    platform: "node",
    format: "esm",
    target: "node20",
    logLevel: "silent",
  });

  const {
    STAR_BEAST_REQUIRED_RENDERER_CAPABILITIES,
    adaptStarBeastRendererInputToRenderPlan,
  } = await import(`file://${tempModulePath}?t=${Date.now()}`);

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
    sourceReferences: Object.freeze({
      lifeStateReference: Object.freeze({ referenceType: "STAR_BEAST_LIFE_STATE", referenceId: "life-state:awareness" }),
      memoryReference: null,
      crystalReference: null,
    }),
    visualMappingOnly: true,
    noLifeStateMutation: true,
    noRendering: true,
    noMemoryGrowthInference: true,
  });
  const requestReference = Object.freeze({ referenceType: "STAR_BEAST_RENDER_REQUEST", referenceId: "render-request:awareness" });
  const capabilityGuardrails = Object.freeze({
    consumesVisualStateOnly: true,
    producesRenderPlanOnly: true,
    noLifeStateInference: true,
    noLifeStateMutation: true,
    noMemoryInference: true,
    noGrowthInference: true,
  });
  const completeInput = Object.freeze({
    requestReference,
    visualStateReference: visualState,
    capabilityDeclaration: Object.freeze({
      capabilities: STAR_BEAST_REQUIRED_RENDERER_CAPABILITIES,
      ...capabilityGuardrails,
    }),
  });
  const completeInputSnapshot = JSON.stringify(completeInput);
  const planned = adaptStarBeastRendererInputToRenderPlan(completeInput);

  assertEqual("complete capability declaration is planned", planned.status, "PLANNED");
  assertEqual("planned output preserves input", planned.input === completeInput, true);
  assertEqual("plan preserves visual state reference", planned.plan.sourceVisualStateReference === visualState, true);
  assertEqual("manifestation depth is projected", planned.plan.channels.manifestation.depth, visualState.manifestationDepth);
  assertEqual("manifestation presence is projected", planned.plan.channels.manifestation.presence, visualState.presenceState);
  assertEqual("energy flow is projected", planned.plan.channels.energy.flow, visualState.energyFlowState);
  assertEqual("breathing rhythm is projected", planned.plan.channels.energy.breathingRhythm, visualState.expression.breathingRhythm);
  assertEqual("light state is projected", planned.plan.channels.light.state, visualState.lightState);
  assertEqual("light direction is projected", planned.plan.channels.light.direction, visualState.expression.lightFlowDirection);
  assertEqual("light intensity is projected", planned.plan.channels.light.intensity, visualState.expression.intensity);
  assertEqual("star pattern is projected", planned.plan.channels.starField.pattern, visualState.starPatternState);
  assertEqual("particle density is projected", planned.plan.channels.starField.particleDensity, visualState.expression.particleDensity);
  assertEqual("constellation complexity is projected", planned.plan.channels.starField.constellationComplexity, visualState.expression.constellationComplexity);
  assertEqual("crystal presence is projected", planned.plan.channels.crystal.presence, visualState.crystalPresenceState);
  assertEqual("planned output is frozen", Object.isFrozen(planned), true);
  assertEqual("render plan is frozen", Object.isFrozen(planned.plan), true);
  assertEqual("render channels are frozen", Object.isFrozen(planned.plan.channels), true);
  Object.entries(planned.plan.channels).forEach(([channelName, channel]) =>
    assertEqual(`${channelName} channel is frozen`, Object.isFrozen(channel), true),
  );
  assertEqual("adapter does not mutate input", JSON.stringify(completeInput), completeInputSnapshot);

  const reversedInput = Object.freeze({
    ...completeInput,
    capabilityDeclaration: Object.freeze({
      capabilities: Object.freeze([...STAR_BEAST_REQUIRED_RENDERER_CAPABILITIES].reverse()),
      ...capabilityGuardrails,
    }),
  });
  assertEqual(
    "capability order does not affect planning",
    adaptStarBeastRendererInputToRenderPlan(reversedInput).status,
    "PLANNED",
  );

  const incompleteInput = Object.freeze({
    ...completeInput,
    capabilityDeclaration: Object.freeze({
      capabilities: Object.freeze(STAR_BEAST_REQUIRED_RENDERER_CAPABILITIES.slice(0, -1)),
      ...capabilityGuardrails,
    }),
  });
  const unavailable = adaptStarBeastRendererInputToRenderPlan(incompleteInput);
  assertEqual("incomplete capability declaration is unavailable", unavailable.status, "UNAVAILABLE");
  assertEqual("unavailable reason is stable", unavailable.reason, "RENDERER_CAPABILITY_UNAVAILABLE");
  assertEqual("unavailable output preserves input", unavailable.input === incompleteInput, true);
  assertEqual("unavailable output has no render plan", "plan" in unavailable, false);
  assertEqual("unavailable output is frozen", Object.isFrozen(unavailable), true);
}

fs.rmSync(tempModulePath, { force: true });

if (failures.length > 0) {
  console.error("\n[STAR BEAST RENDER PLAN ADAPTER] FAIL");
  failures.forEach((failure) => console.error(`- ${failure}`));
  process.exit(1);
}
console.log("\n[STAR BEAST RENDER PLAN ADAPTER] PASS");
