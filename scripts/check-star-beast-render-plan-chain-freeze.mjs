import fs from "node:fs";
import path from "node:path";
import process from "node:process";

const rootDir = process.cwd();

const files = Object.freeze({
  visualStateType: "src/types/starBeastVisualState.ts",
  visualMapping: "src/services/starBeastVisualStateMapping.ts",
  rendererContract: "src/types/starBeastRendererContract.ts",
  renderPlanAdapter: "src/services/starBeastRenderPlanAdapter.ts",
  consumptionType: "src/types/starBeastRenderPlanConsumption.ts",
  consumptionService:
    "src/services/starBeastRenderPlanConsumptionService.ts",
  endpoint: "src/services/starBeastRenderPlanEndpoint.ts",
  readinessType: "src/types/starBeastRendererReadiness.ts",
  readinessService: "src/services/starBeastRendererReadinessService.ts",
  candidateType: "src/types/starBeastRendererImplementationCandidate.ts",
  candidateService:
    "src/services/starBeastRendererImplementationCandidateService.ts",
  backendCapabilityType:
    "src/types/starBeastRendererBackendCapability.ts",
  backendCapabilityService:
    "src/services/starBeastRendererBackendCapabilityService.ts",
  capabilityBindingType:
    "src/types/starBeastRendererImplementationCapabilityBinding.ts",
  capabilityBindingService:
    "src/services/starBeastRendererImplementationCapabilityBindingService.ts",
  endpointProtocol:
    "docs/GUANYAO_STAR_BEAST_RENDER_PLAN_ENDPOINT_PROTOCOL.md",
  freezeProtocol:
    "docs/GUANYAO_STAR_BEAST_RENDER_PLAN_CHAIN_FREEZE_PROTOCOL.md",
  readinessProtocol:
    "docs/GUANYAO_STAR_BEAST_RENDERER_READINESS_PROTOCOL.md",
  candidateProtocol:
    "docs/GUANYAO_STAR_BEAST_RENDERER_IMPLEMENTATION_CANDIDATE_PROTOCOL.md",
  backendCapabilityProtocol:
    "docs/GUANYAO_STAR_BEAST_RENDERER_BACKEND_CAPABILITY_SCHEMA_PROTOCOL.md",
  capabilityBindingProtocol:
    "docs/GUANYAO_STAR_BEAST_RENDERER_IMPLEMENTATION_CAPABILITY_BINDING_PROTOCOL.md",
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

const absolutePathByName = Object.fromEntries(
  Object.entries(files).map(([name, relativePath]) => [
    name,
    path.join(rootDir, relativePath),
  ]),
);

for (const [name, filePath] of Object.entries(absolutePathByName)) {
  if (!fs.existsSync(filePath)) failures.push(`${name} file missing=${filePath}`);
  else console.log(`PASS | ${name} file exists`);
}

if (failures.length === 0) {
  const sources = Object.fromEntries(
    Object.entries(absolutePathByName).map(([name, filePath]) => [
      name,
      fs.readFileSync(filePath, "utf8"),
    ]),
  );
  const packageJson = JSON.parse(sources.packageManifest);
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

  assertCallSites(
    "P39 visual mapping has no business consumer",
    "mapStarBeastLifeStateToVisualState(",
    [files.visualMapping],
  );
  assertCallSites(
    "P41 adapter is only composed by P43 endpoint",
    "adaptStarBeastRendererInputToRenderPlan(",
    [files.renderPlanAdapter, files.endpoint],
  );
  assertCallSites(
    "P42 consumption is only composed by P43 endpoint",
    "consumeStarBeastRenderPlan(",
    [files.consumptionService, files.endpoint],
  );
  assertCallSites(
    "P43 resolver has no external direct caller",
    "resolveStarBeastRenderPlanConsumption(",
    [files.endpoint],
  );
  assertCallSites(
    "P45 readiness has no Renderer UI or Runtime consumer",
    "resolveStarBeastRendererReadiness(",
    [files.readinessService],
  );
  assertCallSites(
    "P46 candidate has no downstream consumer",
    "resolveStarBeastRendererImplementationCandidate(",
    [files.candidateService],
  );
  assertCallSites(
    "P47 backend capability resolver has no downstream consumer",
    "resolveStarBeastRendererBackendCapabilityDeclaration(",
    [files.backendCapabilityService],
  );
  assertCallSites(
    "P48 capability binding resolver has no downstream consumer",
    "resolveStarBeastRendererImplementationCapabilityBinding(",
    [files.capabilityBindingService],
  );

  [
    'semanticRole: "STAR_BEAST_VISUAL_STATE"',
    "visualMappingOnly: true",
    "noLifeStateMutation: true",
    "noRendering: true",
    "noMemoryGrowthInference: true",
  ].forEach((marker) =>
    assertIncludes("P39 visual state boundary remains frozen", sources.visualStateType, marker),
  );

  [
    "STAR_BEAST_VISUAL_PHASE_PROJECTIONS",
    "export function mapStarBeastLifeStateToVisualState",
    "sourceReferences: Object.freeze({",
    "visualMappingOnly: true",
    "noRendering: true",
  ].forEach((marker) =>
    assertIncludes("P39 visual mapping remains semantic-only", sources.visualMapping, marker),
  );

  [
    "export type StarBeastRendererInput",
    "export type StarBeastRenderPlan",
    "export type StarBeastRendererOutput",
    "MANIFESTATION_LAYER",
    "ENERGY_FLOW_CHANNEL",
    "LIGHT_FLOW_CHANNEL",
    "BREATHING_CHANNEL",
    "STAR_FIELD_CHANNEL",
    "CRYSTAL_PRESENCE_CHANNEL",
    "rendererNeutral: true",
    "semanticChannelsOnly: true",
    "noPixelOutput: true",
    "noDrawCommands: true",
    "noAssetGeneration: true",
  ].forEach((marker) =>
    assertIncludes("P40 renderer contract remains type-only", sources.rendererContract, marker),
  );
  assertExcludes(
    "P40 renderer contract contains no executable function",
    sources.rendererContract,
    "function ",
  );

  [
    "STAR_BEAST_REQUIRED_RENDERER_CAPABILITIES.every",
    "input.capabilityDeclaration.capabilities.includes",
    'status: "UNAVAILABLE"',
    'reason: "RENDERER_CAPABILITY_UNAVAILABLE"',
    'semanticRole: "STAR_BEAST_RENDER_PLAN"',
    "manifestation: Object.freeze({",
    "energy: Object.freeze({",
    "light: Object.freeze({",
    "starField: Object.freeze({",
    "crystal: Object.freeze({",
    'status: "PLANNED"',
  ].forEach((marker) =>
    assertIncludes("P41 adapter remains sole plan constructor", sources.renderPlanAdapter, marker),
  );

  [
    'semanticRole: "STAR_BEAST_RENDER_PLAN_CONSUMPTION"',
    'consumptionStatus: "AVAILABLE_FOR_FUTURE_RENDERER"',
    "sourceRendererOutput: StarBeastRendererPlannedOutput",
    "sourceRequestReference:",
    "noRenderExecution: true",
    "noPlanMutation: true",
  ].forEach((marker) =>
    assertIncludes("P42 consumption contract remains reference-only", sources.consumptionType, marker),
  );

  [
    "export function consumeStarBeastRenderPlan",
    'sourceRendererOutput.status === "UNAVAILABLE"',
    'input.renderPlanReference === null',
    "input.renderPlanReference !== sourceRendererOutput.plan",
    'status: "AVAILABLE"',
    "renderPlanReference: input.renderPlanReference",
    "noRenderExecution: true",
  ].forEach((marker) =>
    assertIncludes("P42 consumption service remains a stable boundary", sources.consumptionService, marker),
  );

  [
    "export type StarBeastRenderPlanEndpointInput = StarBeastRendererInput",
    "export function resolveStarBeastRenderPlanConsumption",
    "const rendererOutput = adaptStarBeastRendererInputToRenderPlan(input)",
    "return consumeStarBeastRenderPlan(",
    'rendererOutput.status === "PLANNED" ? rendererOutput.plan : null',
    "StarBeastRenderPlanConsumptionResult",
  ].forEach((marker) =>
    assertIncludes("P43 remains the sole composition endpoint", sources.endpoint, marker),
  );

  [
    "endpointResult: StarBeastRenderPlanConsumptionResult | null",
    'readiness: "READY_FOR_RENDERER_IMPLEMENTATION_PROTOCOL"',
    'status: "NOT_READY"',
    'status: "UNAVAILABLE"',
    "rendererImplementationDeferred: true",
    "noRenderExecution: true",
    "noUIIntegration: true",
    "noRuntimeIntegration: true",
    "noStorageWrite: true",
  ].forEach((marker) =>
    assertIncludes("P45 readiness type remains qualification-only", sources.readinessType, marker),
  );

  [
    "export function resolveStarBeastRendererReadiness",
    "const endpointResult = input.endpointResult",
    'endpointResult.status === "UNAVAILABLE"',
    'reason: "RENDER_PLAN_CONSUMPTION_NOT_AVAILABLE"',
    'reason: "RENDER_PLAN_ENDPOINT_RESULT_REQUIRED"',
    "sourceConsumptionUnavailableReason: endpointResult.reason",
    "sourceRendererUnavailableReason: endpointResult.sourceUnavailableReason",
    "renderPlanConsumptionReference: endpointResult.consumption",
    "renderPlanReference: endpointResult.consumption.renderPlanReference",
  ].forEach((marker) =>
    assertIncludes("P45 consumes only P43 result references", sources.readinessService, marker),
  );

  [
    "adaptStarBeastRendererInputToRenderPlan(",
    "consumeStarBeastRenderPlan(",
    "resolveStarBeastRenderPlanConsumption(",
    "mapStarBeastLifeStateToVisualState(",
  ].forEach((marker) =>
    assertExcludes("P45 does not bypass or invoke the frozen chain", sources.readinessService, marker),
  );

  [
    "readinessResult: StarBeastRendererReadinessResult | null",
    'semanticRole: "STAR_BEAST_RENDERER_IMPLEMENTATION_CANDIDATE"',
    "implementationRequestReference:",
    "backendCapabilityReference:",
    "candidateOnly: true",
    "backendAgnostic: true",
    "noBackendSelection: true",
    "rendererImplementationDeferred: true",
    "noRenderExecution: true",
  ].forEach((marker) =>
    assertIncludes("P46 candidate type remains reference-only", sources.candidateType, marker),
  );

  [
    "export function resolveStarBeastRendererImplementationCandidate",
    "const readinessResult = input.readinessResult",
    'readinessResult.status === "UNAVAILABLE"',
    'readinessResult.status === "NOT_READY"',
    'reason: "RENDERER_READINESS_NOT_READY"',
    'semanticRole: "STAR_BEAST_RENDERER_IMPLEMENTATION_CANDIDATE"',
    "sourceReadinessReference: readinessResult",
    "renderPlanReference: readinessResult.renderPlanReference",
    "implementationRequestReference: input.implementationRequestReference",
    "backendCapabilityReference: input.backendCapabilityReference",
  ].forEach((marker) =>
    assertIncludes("P46 consumes only P45 result and explicit references", sources.candidateService, marker),
  );

  [
    "export type StarBeastRendererBackendCapabilityReference",
    "export type StarBeastRendererBackendCapabilityDeclaration",
    'semanticRole: "STAR_BEAST_RENDERER_BACKEND_CAPABILITY_DECLARATION"',
    "backendUnspecified: true",
    "noBackendSelection: true",
    "noDeviceDetection: true",
    "noRuntimeProbe: true",
    "noRenderExecution: true",
  ].forEach((marker) =>
    assertIncludes("P47 backend capability remains schema-only", sources.backendCapabilityType, marker),
  );

  [
    "export function resolveStarBeastRendererBackendCapabilityDeclaration",
    "STAR_BEAST_REQUIRED_BACKEND_CAPABILITIES.every",
    '"BACKEND_CAPABILITY_SET_INCOMPLETE"',
    "backendUnspecified: true",
    "noBackendSelection: true",
    "noDeviceDetection: true",
    "noRenderExecution: true",
  ].forEach((marker) =>
    assertIncludes("P47 resolver validates declarations only", sources.backendCapabilityService, marker),
  );

  assertIncludes(
    "P46 imports P47 backend capability reference",
    sources.candidateType,
    'from "./starBeastRendererBackendCapability"',
  );

  [
    "candidateResult: StarBeastRendererImplementationCandidateResult | null",
    "backendCapabilityResult: StarBeastRendererBackendCapabilityResult | null",
    'semanticRole: "STAR_BEAST_RENDERER_IMPLEMENTATION_CAPABILITY_BINDING"',
    'bindingStatus: "BACKEND_CAPABILITY_REFERENCE_MATCHED"',
    "bindingOnly: true",
    "noImplementationAuthorization: true",
    "noBackendSelection: true",
    "noRenderExecution: true",
  ].forEach((marker) =>
    assertIncludes("P48 binding remains qualification-only", sources.capabilityBindingType, marker),
  );

  [
    "export function resolveStarBeastRendererImplementationCapabilityBinding",
    'candidateResult.status === "UNAVAILABLE"',
    'candidateResult.status === "NOT_READY"',
    'backendCapabilityResult.status === "UNAVAILABLE"',
    "candidateCapabilityReference.referenceType ===",
    "candidateCapabilityReference.referenceId ===",
    '"BACKEND_CAPABILITY_REFERENCE_MISMATCH"',
    "sourceCandidateReference: candidateResult.candidate",
    "sourceCapabilityDeclarationReference:",
  ].forEach((marker) =>
    assertIncludes("P48 binding checks supplied references only", sources.capabilityBindingService, marker),
  );

  [
    "resolveStarBeastRendererImplementationCandidate(",
    "resolveStarBeastRendererBackendCapabilityDeclaration(",
    "resolveStarBeastRendererReadiness(",
    "resolveStarBeastRenderPlanConsumption(",
  ].forEach((marker) =>
    assertExcludes("P48 does not invoke upstream resolvers", sources.capabilityBindingService, marker),
  );

  [
    "adaptStarBeastRendererInputToRenderPlan(",
    "consumeStarBeastRenderPlan(",
    "resolveStarBeastRenderPlanConsumption(",
    "resolveStarBeastRendererReadiness(",
    "mapStarBeastLifeStateToVisualState(",
  ].forEach((marker) =>
    assertExcludes("P46 does not bypass or invoke the frozen chain", sources.candidateService, marker),
  );

  const frozenTypeAndServiceSource = [
    sources.visualStateType,
    sources.visualMapping,
    sources.rendererContract,
    sources.renderPlanAdapter,
    sources.consumptionType,
    sources.consumptionService,
    sources.endpoint,
    sources.readinessType,
    sources.readinessService,
    sources.candidateType,
    sources.candidateService,
    sources.backendCapabilityType,
    sources.backendCapabilityService,
    sources.capabilityBindingType,
    sources.capabilityBindingService,
  ].join("\n");

  [
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
    "textureUrl",
    "assetUrl",
    "fourSymbol",
    "FourSymbol",
    "Hexagram",
    "personality",
    "Persona",
  ].forEach((marker) =>
    assertExcludes("frozen chain has no forbidden implementation dependency", frozenTypeAndServiceSource, marker),
  );

  [
    "RC-STAR-BEAST-RENDER-PLAN-CHAIN-FREEZE-P44",
    "RENDER PLAN CHAIN FROZEN",
    "P39 StarBeastVisualState",
    "P40 StarBeastRendererContract",
    "P41 Render Plan Adapter",
    "P42 Render Plan Consumption",
    "P43 Render Plan Endpoint",
    "固定调用拓扑",
    "唯一授权出口",
    "StarBeastRenderPlanConsumptionResult",
    "P45 Renderer Readiness Extension",
    "P43 Resolver 必须继续保持无外部直接调用者",
    "P45 是 P43 Result 的唯一授权消费者",
    "resolveStarBeastRendererReadiness",
    "P46 Renderer Implementation Candidate Extension",
    "P46 是 P45 Result 的唯一授权消费者",
    "resolveStarBeastRendererImplementationCandidate",
    "P47 Backend Capability Schema Extension",
    "P46 只导入 Reference，不调用 P47 Resolver",
    "resolveStarBeastRendererBackendCapabilityDeclaration",
    "P48 Implementation Capability Binding Extension",
    "P46/P47 Result 只由 P48 Capability Binding 消费",
    "resolveStarBeastRendererImplementationCapabilityBinding",
    "P44 不修改 P39–P43 类型或服务源码",
    "Canvas、WebGL、Three.js",
    "不修改 Foundation、Dynamics、Crystal、UI、Storage",
  ].forEach((marker) =>
    assertIncludes("P44 freeze protocol", sources.freezeProtocol, marker),
  );

  [
    "## 08｜P44 Chain Freeze",
    "P44 冻结 P39–P43 的类型边界、调用所有权与禁止绕行规则",
    "StarBeastRenderPlanConsumptionResult` 是冻结链唯一授权出口",
    "P45 Renderer Readiness 已通过独立施工协议成为该 Result 的唯一消费者",
    "P43 Resolver 继续保持无外部直接调用者",
  ].forEach((marker) =>
    assertIncludes("P43 protocol declares the frozen exit", sources.endpointProtocol, marker),
  );

  [
    "RC-STAR-BEAST-RENDERER-READINESS-P45",
    "P43 StarBeastRenderPlanConsumptionResult",
    "READY_FOR_RENDERER_IMPLEMENTATION_PROTOCOL",
    "P45 是 P44 Freeze Protocol 授权的唯一 Result Consumer",
    "P45 不调用 P41、P42 或 P43",
  ].forEach((marker) =>
    assertIncludes("P45 readiness protocol extends the frozen exit", sources.readinessProtocol, marker),
  );

  [
    "RC-STAR-BEAST-RENDERER-IMPLEMENTATION-CANDIDATE-P46",
    "P45 StarBeastRendererReadinessResult",
    "STAR_BEAST_RENDERER_IMPLEMENTATION_CANDIDATE",
    "P45 Result → only P46 Candidate",
    "P46 禁止直接调用 P41、P42、P43 或 P45",
  ].forEach((marker) =>
    assertIncludes("P46 candidate protocol extends P45 only", sources.candidateProtocol, marker),
  );

  [
    "RC-STAR-BEAST-RENDERER-BACKEND-CAPABILITY-SCHEMA-P47",
    "P46 只保存 P47 声明引用",
    "不选择后端、不探测设备、不执行渲染",
  ].forEach((marker) =>
    assertIncludes("P47 protocol owns capability source only", sources.backendCapabilityProtocol, marker),
  );

  [
    "RC-STAR-BEAST-RENDERER-IMPLEMENTATION-CAPABILITY-BINDING-P48",
    "P46 Result → only P48 Binding",
    "P47 Result → only P48 Binding",
    "P48 禁止直接调用 P41–P47",
  ].forEach((marker) =>
    assertIncludes("P48 protocol binds only P46 and P47 results", sources.capabilityBindingProtocol, marker),
  );

  assertIncludes(
    "render plan chain freeze gate command is registered",
    packageJson.scripts?.["check:star-beast-render-plan-chain-freeze"] ?? "",
    "node scripts/check-star-beast-render-plan-chain-freeze.mjs",
  );
  assertIncludes(
    "render plan chain freeze gate participates in release",
    packageJson.scripts?.["check:release"] ?? "",
    "npm run check:star-beast-render-plan-chain-freeze",
  );
}

if (failures.length > 0) {
  console.error("\nStar Beast render plan chain freeze gate failed:");
  failures.forEach((failure) => console.error(`- ${failure}`));
  process.exit(1);
}

console.log("\nStar Beast render plan chain freeze gate passed.");
