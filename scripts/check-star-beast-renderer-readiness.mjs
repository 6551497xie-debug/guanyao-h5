import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import process from "node:process";
import { build } from "esbuild";

const rootDir = process.cwd();
const readinessTypePath = path.join(
  rootDir,
  "src/types/starBeastRendererReadiness.ts",
);
const readinessServicePath = path.join(
  rootDir,
  "src/services/starBeastRendererReadinessService.ts",
);
const endpointPath = path.join(
  rootDir,
  "src/services/starBeastRenderPlanEndpoint.ts",
);
const adapterPath = path.join(
  rootDir,
  "src/services/starBeastRenderPlanAdapter.ts",
);
const consumptionPath = path.join(
  rootDir,
  "src/services/starBeastRenderPlanConsumptionService.ts",
);
const visualMappingPath = path.join(
  rootDir,
  "src/services/starBeastVisualStateMapping.ts",
);
const typeIndexPath = path.join(rootDir, "src/types/index.ts");
const protocolPath = path.join(
  rootDir,
  "docs/GUANYAO_STAR_BEAST_RENDERER_READINESS_PROTOCOL.md",
);
const freezeProtocolPath = path.join(
  rootDir,
  "docs/GUANYAO_STAR_BEAST_RENDER_PLAN_CHAIN_FREEZE_PROTOCOL.md",
);
const packagePath = path.join(rootDir, "package.json");
const tempReadinessModulePath = path.join(
  os.tmpdir(),
  `guanyao-star-beast-renderer-readiness-${process.pid}.mjs`,
);
const tempEndpointModulePath = path.join(
  os.tmpdir(),
  `guanyao-star-beast-render-plan-endpoint-for-readiness-${process.pid}.mjs`,
);

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
  if (actual !== expected) {
    failures.push(`${name} expected=${expected} actual=${actual}`);
  } else {
    console.log(`PASS | ${name} | expected=${expected} | actual=${actual}`);
  }
};

const collectTypeScriptSourcePaths = (directoryPath) =>
  fs.readdirSync(directoryPath, { withFileTypes: true }).flatMap((entry) => {
    const entryPath = path.join(directoryPath, entry.name);
    if (entry.isDirectory()) return collectTypeScriptSourcePaths(entryPath);
    return /\.tsx?$/.test(entry.name) ? [entryPath] : [];
  });

for (const [name, filePath] of [
  ["renderer readiness type", readinessTypePath],
  ["renderer readiness service", readinessServicePath],
  ["render plan endpoint", endpointPath],
  ["render plan adapter", adapterPath],
  ["render plan consumption", consumptionPath],
  ["visual state mapping", visualMappingPath],
  ["type index", typeIndexPath],
  ["renderer readiness protocol", protocolPath],
  ["render plan chain freeze protocol", freezeProtocolPath],
  ["package manifest", packagePath],
]) {
  if (!fs.existsSync(filePath)) failures.push(`${name} file missing=${filePath}`);
  else console.log(`PASS | ${name} file exists`);
}

if (failures.length === 0) {
  const readinessTypeSource = fs.readFileSync(readinessTypePath, "utf8");
  const readinessServiceSource = fs.readFileSync(readinessServicePath, "utf8");
  const typeIndexSource = fs.readFileSync(typeIndexPath, "utf8");
  const protocolSource = fs.readFileSync(protocolPath, "utf8");
  const freezeProtocolSource = fs.readFileSync(freezeProtocolPath, "utf8");
  const packageJson = JSON.parse(fs.readFileSync(packagePath, "utf8"));
  const typeScriptSourcePaths = collectTypeScriptSourcePaths(
    path.join(rootDir, "src"),
  );

  const assertCallSites = (name, symbol, expectedRelativePaths) => {
    const actual = typeScriptSourcePaths
      .filter((filePath) => fs.readFileSync(filePath, "utf8").includes(symbol))
      .map((filePath) => path.relative(rootDir, filePath))
      .sort();
    assertEqual(name, actual.join(","), [...expectedRelativePaths].sort().join(","));
  };

  [
    "export type StarBeastRendererReadinessInput",
    "endpointResult: StarBeastRenderPlanConsumptionResult | null",
    "export type StarBeastRendererReadinessReady",
    'status: "READY"',
    'readiness: "READY_FOR_RENDERER_IMPLEMENTATION_PROTOCOL"',
    "sourceEndpointResult: StarBeastRenderPlanEndpointAvailable",
    "renderPlanConsumptionReference:",
    "renderPlanReference:",
    "sourceRequestReference:",
    "export type StarBeastRendererReadinessNotReady",
    'reason: StarBeastRendererReadinessNotReadyReason',
    '"RENDER_PLAN_CONSUMPTION_NOT_AVAILABLE"',
    "sourceConsumptionUnavailableReason: StarBeastRenderPlanConsumptionUnavailableReason",
    "sourceRendererUnavailableReason: StarBeastRendererUnavailableReason | null",
    "export type StarBeastRendererReadinessUnavailable",
    '"RENDER_PLAN_ENDPOINT_RESULT_REQUIRED"',
    "export type StarBeastRendererReadinessResult",
    "rendererImplementationDeferred: true",
    "noRenderExecution: true",
    "noUIIntegration: true",
    "noRuntimeIntegration: true",
    "noStorageWrite: true",
  ].forEach((marker) =>
    assertIncludes("renderer readiness type contract", readinessTypeSource, marker),
  );

  [
    "STAR_BEAST_RENDERER_READINESS_GUARDRAILS",
    "export function resolveStarBeastRendererReadiness",
    "const endpointResult = input.endpointResult",
    "endpointResult === null",
    'status: "UNAVAILABLE"',
    'reason: "RENDER_PLAN_ENDPOINT_RESULT_REQUIRED"',
    'endpointResult.status === "UNAVAILABLE"',
    'status: "NOT_READY"',
    'reason: "RENDER_PLAN_CONSUMPTION_NOT_AVAILABLE"',
    "sourceConsumptionUnavailableReason: endpointResult.reason",
    "sourceRendererUnavailableReason: endpointResult.sourceUnavailableReason",
    'status: "READY"',
    'readiness: "READY_FOR_RENDERER_IMPLEMENTATION_PROTOCOL"',
    "sourceEndpointResult: endpointResult",
    "renderPlanConsumptionReference: endpointResult.consumption",
    "renderPlanReference: endpointResult.consumption.renderPlanReference",
    "sourceRequestReference: endpointResult.consumption.sourceRequestReference",
  ].forEach((marker) =>
    assertIncludes("renderer readiness service contract", readinessServiceSource, marker),
  );

  [
    "adaptStarBeastRendererInputToRenderPlan(",
    "consumeStarBeastRenderPlan(",
    "resolveStarBeastRenderPlanConsumption(",
    "mapStarBeastLifeStateToVisualState(",
    ".channels",
    "manifestationDepth",
    "energyFlowState",
    "lightState",
    "starPatternState",
    "crystalPresenceState",
    "fourSymbol",
    "FourSymbol",
    "Hexagram",
    "personality",
    "Persona",
    "HTMLCanvasElement",
    "CanvasRenderingContext",
    "WebGLRenderingContext",
    "requestAnimationFrame",
    "drawImage(",
    "getContext(",
    'from "three"',
    'from "@react-three',
    'from "react"',
    "/pages/",
    "/components/",
    "localStorage",
    "sessionStorage",
    "fetch(",
  ].forEach((marker) =>
    assertExcludes("readiness stays qualification-only", readinessServiceSource, marker),
  );

  [
    "StarBeastRendererReadinessInput",
    "StarBeastRendererReadinessNotReady",
    "StarBeastRendererReadinessReady",
    "StarBeastRendererReadinessResult",
    "StarBeastRendererReadinessUnavailable",
    'from "./starBeastRendererReadiness"',
  ].forEach((marker) =>
    assertIncludes("type index exports renderer readiness", typeIndexSource, marker),
  );

  assertCallSites(
    "P39 mapping still has no business consumer",
    "mapStarBeastLifeStateToVisualState(",
    ["src/services/starBeastVisualStateMapping.ts"],
  );
  assertCallSites(
    "P41 adapter remains owned by P43",
    "adaptStarBeastRendererInputToRenderPlan(",
    [
      "src/services/starBeastRenderPlanAdapter.ts",
      "src/services/starBeastRenderPlanEndpoint.ts",
    ],
  );
  assertCallSites(
    "P42 consumption remains owned by P43",
    "consumeStarBeastRenderPlan(",
    [
      "src/services/starBeastRenderPlanConsumptionService.ts",
      "src/services/starBeastRenderPlanEndpoint.ts",
    ],
  );
  assertCallSites(
    "P43 resolver still has no external direct caller",
    "resolveStarBeastRenderPlanConsumption(",
    ["src/services/starBeastRenderPlanEndpoint.ts"],
  );
  assertCallSites(
    "P45 readiness has no Renderer UI or Runtime consumer",
    "resolveStarBeastRendererReadiness(",
    ["src/services/starBeastRendererReadinessService.ts"],
  );

  [
    "RC-STAR-BEAST-RENDERER-READINESS-P45",
    "RENDERER IMPLEMENTATION READINESS",
    "P43 StarBeastRenderPlanConsumptionResult",
    "READY_FOR_RENDERER_IMPLEMENTATION_PROTOCOL",
    "RENDER_PLAN_CONSUMPTION_NOT_AVAILABLE",
    "RENDER_PLAN_ENDPOINT_RESULT_REQUIRED",
    "P45 是 P44 Freeze Protocol 授权的唯一 Result Consumer",
    "P43 Resolver → no direct external caller",
    "P43 Result → only consumed by P45 Readiness",
    "P45 不调用 P41、P42 或 P43",
    "Canvas、WebGL、Three.js",
    "UI、Launch、Gravity、Crystal 页面接入",
    "P46 `StarBeastRendererImplementationCandidate` 是 P45 Result 的唯一授权消费者",
    "P45 Resolver 继续保持无外部直接调用者",
    "P45 Result 只允许流向 P46 Candidate",
  ].forEach((marker) =>
    assertIncludes("renderer readiness protocol", protocolSource, marker),
  );

  [
    "P45 Renderer Readiness Extension",
    "P43 Resolver 必须继续保持无外部直接调用者",
    "P45 是 P43 Result 的唯一授权消费者",
    "resolveStarBeastRendererReadiness",
  ].forEach((marker) =>
    assertIncludes("P44 freeze protocol authorizes only P45", freezeProtocolSource, marker),
  );

  assertIncludes(
    "renderer readiness gate command is registered",
    packageJson.scripts?.["check:star-beast-renderer-readiness"] ?? "",
    "node scripts/check-star-beast-renderer-readiness.mjs",
  );
  assertIncludes(
    "renderer readiness gate participates in release",
    packageJson.scripts?.["check:release"] ?? "",
    "npm run check:star-beast-renderer-readiness",
  );

  await Promise.all([
    build({
      entryPoints: [readinessServicePath],
      outfile: tempReadinessModulePath,
      bundle: true,
      platform: "node",
      format: "esm",
      target: "node20",
      logLevel: "silent",
    }),
    build({
      entryPoints: [endpointPath],
      outfile: tempEndpointModulePath,
      bundle: true,
      platform: "node",
      format: "esm",
      target: "node20",
      logLevel: "silent",
    }),
  ]);

  const { resolveStarBeastRendererReadiness } = await import(
    `file://${tempReadinessModulePath}?t=${Date.now()}`
  );
  const { resolveStarBeastRenderPlanConsumption } = await import(
    `file://${tempEndpointModulePath}?t=${Date.now()}`
  );

  const requestReference = Object.freeze({
    referenceType: "STAR_BEAST_RENDER_REQUEST",
    referenceId: "render-request:readiness",
  });
  const visualStateReference = Object.freeze({
    semanticRole: "STAR_BEAST_VISUAL_STATE",
    manifestationDepth: "EMERGING",
    presenceState: "RETURNING_TO_PRESENCE",
    energyFlowState: "RECOVERING",
    lightState: "RETURNING",
    starPatternState: "RECONNECTING_PATTERN",
    crystalPresenceState: "NOT_REFERENCED",
    expression: Object.freeze({
      breathingRhythm: "RECOVERING",
      lightFlowDirection: "OUTWARD",
      intensity: 0.68,
      particleDensity: 0.52,
      constellationComplexity: 0.58,
    }),
  });
  const fullCapabilities = Object.freeze([
    "MANIFESTATION_LAYER",
    "ENERGY_FLOW_CHANNEL",
    "LIGHT_FLOW_CHANNEL",
    "BREATHING_CHANNEL",
    "STAR_FIELD_CHANNEL",
    "CRYSTAL_PRESENCE_CHANNEL",
  ]);
  const completeEndpointInput = Object.freeze({
    requestReference,
    visualStateReference,
    capabilityDeclaration: Object.freeze({ capabilities: fullCapabilities }),
  });
  const availableEndpointResult =
    resolveStarBeastRenderPlanConsumption(completeEndpointInput);
  const readyInput = Object.freeze({ endpointResult: availableEndpointResult });
  const readySnapshot = JSON.stringify(readyInput);
  const ready = resolveStarBeastRendererReadiness(readyInput);

  assertEqual("available P43 result becomes ready", ready.status, "READY");
  assertEqual(
    "ready exposes implementation protocol marker",
    ready.readiness,
    "READY_FOR_RENDERER_IMPLEMENTATION_PROTOCOL",
  );
  assertEqual(
    "ready preserves P43 result reference",
    ready.sourceEndpointResult === availableEndpointResult,
    true,
  );
  assertEqual(
    "ready preserves P42 consumption reference",
    ready.renderPlanConsumptionReference === availableEndpointResult.consumption,
    true,
  );
  assertEqual(
    "ready preserves P41 plan reference",
    ready.renderPlanReference === availableEndpointResult.consumption.renderPlanReference,
    true,
  );
  assertEqual(
    "ready preserves request reference",
    ready.sourceRequestReference === requestReference,
    true,
  );
  assertEqual("ready does not copy channels", "channels" in ready, false);
  assertEqual("ready result is frozen", Object.isFrozen(ready), true);
  assertEqual(
    "readiness does not mutate available input",
    JSON.stringify(readyInput),
    readySnapshot,
  );

  const incompleteEndpointInput = Object.freeze({
    ...completeEndpointInput,
    capabilityDeclaration: Object.freeze({ capabilities: Object.freeze([]) }),
  });
  const unavailableEndpointResult =
    resolveStarBeastRenderPlanConsumption(incompleteEndpointInput);
  const notReadyInput = Object.freeze({ endpointResult: unavailableEndpointResult });
  const notReady = resolveStarBeastRendererReadiness(notReadyInput);

  assertEqual("unavailable P43 result becomes not ready", notReady.status, "NOT_READY");
  assertEqual(
    "not ready reason is stable",
    notReady.reason,
    "RENDER_PLAN_CONSUMPTION_NOT_AVAILABLE",
  );
  assertEqual(
    "not ready preserves P43 result reference",
    notReady.sourceEndpointResult === unavailableEndpointResult,
    true,
  );
  assertEqual(
    "not ready preserves P42 unavailable reason",
    notReady.sourceConsumptionUnavailableReason,
    "RENDER_PLAN_OUTPUT_UNAVAILABLE",
  );
  assertEqual(
    "not ready preserves P41 renderer unavailable reason",
    notReady.sourceRendererUnavailableReason,
    "RENDERER_CAPABILITY_UNAVAILABLE",
  );
  assertEqual("not ready result is frozen", Object.isFrozen(notReady), true);

  const missingInput = Object.freeze({ endpointResult: null });
  const unavailable = resolveStarBeastRendererReadiness(missingInput);

  assertEqual("missing P43 result is unavailable", unavailable.status, "UNAVAILABLE");
  assertEqual(
    "missing P43 result reason is stable",
    unavailable.reason,
    "RENDER_PLAN_ENDPOINT_RESULT_REQUIRED",
  );
  assertEqual("unavailable declares no endpoint result", unavailable.noEndpointResult, true);
  assertEqual("unavailable result is frozen", Object.isFrozen(unavailable), true);
}

fs.rmSync(tempReadinessModulePath, { force: true });
fs.rmSync(tempEndpointModulePath, { force: true });

if (failures.length > 0) {
  console.error("\nStar Beast renderer readiness gate failed:");
  failures.forEach((failure) => console.error(`- ${failure}`));
  process.exit(1);
}

console.log("\nStar Beast renderer readiness gate passed.");
