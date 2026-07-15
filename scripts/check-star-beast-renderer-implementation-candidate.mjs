import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import process from "node:process";
import { build } from "esbuild";

const rootDir = process.cwd();
const candidateTypePath = path.join(
  rootDir,
  "src/types/starBeastRendererImplementationCandidate.ts",
);
const candidateServicePath = path.join(
  rootDir,
  "src/services/starBeastRendererImplementationCandidateService.ts",
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
const typeIndexPath = path.join(rootDir, "src/types/index.ts");
const protocolPath = path.join(
  rootDir,
  "docs/GUANYAO_STAR_BEAST_RENDERER_IMPLEMENTATION_CANDIDATE_PROTOCOL.md",
);
const readinessProtocolPath = path.join(
  rootDir,
  "docs/GUANYAO_STAR_BEAST_RENDERER_READINESS_PROTOCOL.md",
);
const freezeProtocolPath = path.join(
  rootDir,
  "docs/GUANYAO_STAR_BEAST_RENDER_PLAN_CHAIN_FREEZE_PROTOCOL.md",
);
const packagePath = path.join(rootDir, "package.json");
const tempCandidateModulePath = path.join(
  os.tmpdir(),
  `guanyao-star-beast-renderer-implementation-candidate-${process.pid}.mjs`,
);
const tempReadinessModulePath = path.join(
  os.tmpdir(),
  `guanyao-star-beast-renderer-readiness-for-candidate-${process.pid}.mjs`,
);
const tempEndpointModulePath = path.join(
  os.tmpdir(),
  `guanyao-star-beast-render-plan-endpoint-for-candidate-${process.pid}.mjs`,
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
  ["implementation candidate type", candidateTypePath],
  ["implementation candidate service", candidateServicePath],
  ["renderer readiness service", readinessServicePath],
  ["render plan endpoint", endpointPath],
  ["render plan adapter", adapterPath],
  ["render plan consumption", consumptionPath],
  ["type index", typeIndexPath],
  ["implementation candidate protocol", protocolPath],
  ["renderer readiness protocol", readinessProtocolPath],
  ["render plan chain freeze protocol", freezeProtocolPath],
  ["package manifest", packagePath],
]) {
  if (!fs.existsSync(filePath)) failures.push(`${name} file missing=${filePath}`);
  else console.log(`PASS | ${name} file exists`);
}

if (failures.length === 0) {
  const candidateTypeSource = fs.readFileSync(candidateTypePath, "utf8");
  const candidateServiceSource = fs.readFileSync(candidateServicePath, "utf8");
  const typeIndexSource = fs.readFileSync(typeIndexPath, "utf8");
  const protocolSource = fs.readFileSync(protocolPath, "utf8");
  const readinessProtocolSource = fs.readFileSync(
    readinessProtocolPath,
    "utf8",
  );
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
    "export type StarBeastRendererImplementationRequestReference",
    'referenceType: "STAR_BEAST_RENDERER_IMPLEMENTATION_REQUEST"',
    "export type StarBeastRendererBackendCapabilityReference",
    'referenceType: "STAR_BEAST_RENDERER_BACKEND_CAPABILITY_DECLARATION"',
    "export type StarBeastRendererImplementationCandidateInput",
    "readinessResult: StarBeastRendererReadinessResult | null",
    "implementationRequestReference: StarBeastRendererImplementationRequestReference | null",
    "backendCapabilityReference: StarBeastRendererBackendCapabilityReference | null",
    "export type StarBeastRendererImplementationCandidate",
    'semanticRole: "STAR_BEAST_RENDERER_IMPLEMENTATION_CANDIDATE"',
    "sourceReadinessReference: StarBeastRendererReadinessReady",
    "renderPlanConsumptionReference:",
    "renderPlanReference:",
    "sourceRequestReference:",
    "candidateOnly: true",
    "backendAgnostic: true",
    "noBackendSelection: true",
    "rendererImplementationDeferred: true",
    "noRenderExecution: true",
    "noUIIntegration: true",
    "noRuntimeIntegration: true",
    "noStorageWrite: true",
    "export type StarBeastRendererImplementationCandidateResult",
  ].forEach((marker) =>
    assertIncludes("implementation candidate type contract", candidateTypeSource, marker),
  );

  [
    "export function resolveStarBeastRendererImplementationCandidate",
    "const readinessResult = input.readinessResult",
    "readinessResult === null",
    '"RENDERER_READINESS_RESULT_REQUIRED"',
    'readinessResult.status === "UNAVAILABLE"',
    '"RENDERER_READINESS_UNAVAILABLE"',
    'readinessResult.status === "NOT_READY"',
    'reason: "RENDERER_READINESS_NOT_READY"',
    "input.implementationRequestReference === null",
    '"IMPLEMENTATION_REQUEST_REFERENCE_REQUIRED"',
    "input.backendCapabilityReference === null",
    '"BACKEND_CAPABILITY_REFERENCE_REQUIRED"',
    "const candidate: StarBeastRendererImplementationCandidate = Object.freeze",
    "sourceReadinessReference: readinessResult",
    "renderPlanConsumptionReference:",
    "readinessResult.renderPlanConsumptionReference",
    "renderPlanReference: readinessResult.renderPlanReference",
    "sourceRequestReference: readinessResult.sourceRequestReference",
    "implementationRequestReference: input.implementationRequestReference",
    "backendCapabilityReference: input.backendCapabilityReference",
    'status: "AVAILABLE"',
  ].forEach((marker) =>
    assertIncludes("implementation candidate service contract", candidateServiceSource, marker),
  );

  [
    "adaptStarBeastRendererInputToRenderPlan(",
    "consumeStarBeastRenderPlan(",
    "resolveStarBeastRenderPlanConsumption(",
    "resolveStarBeastRendererReadiness(",
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
    assertExcludes("candidate stays reference-only", candidateServiceSource, marker),
  );

  [
    "StarBeastRendererBackendCapabilityReference",
    "StarBeastRendererImplementationCandidate",
    "StarBeastRendererImplementationCandidateInput",
    "StarBeastRendererImplementationCandidateResult",
    "StarBeastRendererImplementationRequestReference",
    'from "./starBeastRendererImplementationCandidate"',
  ].forEach((marker) =>
    assertIncludes("type index exports implementation candidate", typeIndexSource, marker),
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
    "P43 resolver has no external direct caller",
    "resolveStarBeastRenderPlanConsumption(",
    ["src/services/starBeastRenderPlanEndpoint.ts"],
  );
  assertCallSites(
    "P45 resolver has no external direct caller",
    "resolveStarBeastRendererReadiness(",
    ["src/services/starBeastRendererReadinessService.ts"],
  );
  assertCallSites(
    "P46 candidate has no downstream consumer",
    "resolveStarBeastRendererImplementationCandidate(",
    ["src/services/starBeastRendererImplementationCandidateService.ts"],
  );

  [
    "RC-STAR-BEAST-RENDERER-IMPLEMENTATION-CANDIDATE-P46",
    "RENDERER IMPLEMENTATION CANDIDATE",
    "P45 StarBeastRendererReadinessResult",
    "STAR_BEAST_RENDERER_IMPLEMENTATION_CANDIDATE",
    "RENDERER_READINESS_NOT_READY",
    "RENDERER_READINESS_RESULT_REQUIRED",
    "RENDERER_READINESS_UNAVAILABLE",
    "IMPLEMENTATION_REQUEST_REFERENCE_REQUIRED",
    "BACKEND_CAPABILITY_REFERENCE_REQUIRED",
    "candidateOnly: true",
    "backendAgnostic: true",
    "noBackendSelection: true",
    "P45 Result → only P46 Candidate",
    "P46 禁止直接调用 P41、P42、P43 或 P45",
    "选择 Canvas、WebGL、Three.js、SVG 或 DOM 后端",
  ].forEach((marker) =>
    assertIncludes("implementation candidate protocol", protocolSource, marker),
  );

  [
    "## 09｜P46 Implementation Candidate",
    "P46 `StarBeastRendererImplementationCandidate` 是 P45 Result 的唯一授权消费者",
    "P45 Resolver 继续保持无外部直接调用者",
    "P45 Result 只允许流向 P46 Candidate",
  ].forEach((marker) =>
    assertIncludes("P45 protocol authorizes only P46", readinessProtocolSource, marker),
  );

  [
    "P46 Renderer Implementation Candidate Extension",
    "P46 是 P45 Result 的唯一授权消费者",
    "resolveStarBeastRendererImplementationCandidate",
  ].forEach((marker) =>
    assertIncludes("P44 freeze protocol extends through P46", freezeProtocolSource, marker),
  );

  assertIncludes(
    "candidate gate command is registered",
    packageJson.scripts?.["check:star-beast-renderer-implementation-candidate"] ?? "",
    "node scripts/check-star-beast-renderer-implementation-candidate.mjs",
  );
  assertIncludes(
    "candidate gate participates in release",
    packageJson.scripts?.["check:release"] ?? "",
    "npm run check:star-beast-renderer-implementation-candidate",
  );

  await Promise.all([
    build({
      entryPoints: [candidateServicePath],
      outfile: tempCandidateModulePath,
      bundle: true,
      platform: "node",
      format: "esm",
      target: "node20",
      logLevel: "silent",
    }),
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

  const { resolveStarBeastRendererImplementationCandidate } = await import(
    `file://${tempCandidateModulePath}?t=${Date.now()}`
  );
  const { resolveStarBeastRendererReadiness } = await import(
    `file://${tempReadinessModulePath}?t=${Date.now()}`
  );
  const { resolveStarBeastRenderPlanConsumption } = await import(
    `file://${tempEndpointModulePath}?t=${Date.now()}`
  );

  const requestReference = Object.freeze({
    referenceType: "STAR_BEAST_RENDER_REQUEST",
    referenceId: "render-request:implementation-candidate",
  });
  const visualStateReference = Object.freeze({
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
  const endpointInput = Object.freeze({
    requestReference,
    visualStateReference,
    capabilityDeclaration: Object.freeze({ capabilities: fullCapabilities }),
  });
  const endpointAvailable = resolveStarBeastRenderPlanConsumption(endpointInput);
  const readinessReady = resolveStarBeastRendererReadiness(
    Object.freeze({ endpointResult: endpointAvailable }),
  );
  const implementationRequestReference = Object.freeze({
    referenceType: "STAR_BEAST_RENDERER_IMPLEMENTATION_REQUEST",
    referenceId: "renderer-implementation-request:phase-2",
  });
  const backendCapabilityReference = Object.freeze({
    referenceType: "STAR_BEAST_RENDERER_BACKEND_CAPABILITY_DECLARATION",
    referenceId: "renderer-backend-capability:future-provider",
  });
  const availableInput = Object.freeze({
    readinessResult: readinessReady,
    implementationRequestReference,
    backendCapabilityReference,
  });
  const availableSnapshot = JSON.stringify(availableInput);
  const available = resolveStarBeastRendererImplementationCandidate(availableInput);

  assertEqual("ready input creates candidate", available.status, "AVAILABLE");
  assertEqual(
    "candidate preserves P45 reference",
    available.candidate.sourceReadinessReference === readinessReady,
    true,
  );
  assertEqual(
    "candidate preserves P42 consumption reference",
    available.candidate.renderPlanConsumptionReference ===
      readinessReady.renderPlanConsumptionReference,
    true,
  );
  assertEqual(
    "candidate preserves P41 plan reference",
    available.candidate.renderPlanReference === readinessReady.renderPlanReference,
    true,
  );
  assertEqual(
    "candidate preserves implementation request reference",
    available.candidate.implementationRequestReference ===
      implementationRequestReference,
    true,
  );
  assertEqual(
    "candidate preserves backend capability reference",
    available.candidate.backendCapabilityReference === backendCapabilityReference,
    true,
  );
  assertEqual("candidate does not copy channels", "channels" in available.candidate, false);
  assertEqual("candidate is backend agnostic", available.candidate.backendAgnostic, true);
  assertEqual("candidate does not select backend", available.candidate.noBackendSelection, true);
  assertEqual("candidate is frozen", Object.isFrozen(available.candidate), true);
  assertEqual("available result is frozen", Object.isFrozen(available), true);
  assertEqual(
    "candidate does not mutate input",
    JSON.stringify(availableInput),
    availableSnapshot,
  );

  const endpointUnavailable = resolveStarBeastRenderPlanConsumption(
    Object.freeze({
      ...endpointInput,
      capabilityDeclaration: Object.freeze({ capabilities: Object.freeze([]) }),
    }),
  );
  const readinessNotReady = resolveStarBeastRendererReadiness(
    Object.freeze({ endpointResult: endpointUnavailable }),
  );
  const notReady = resolveStarBeastRendererImplementationCandidate(
    Object.freeze({ ...availableInput, readinessResult: readinessNotReady }),
  );
  assertEqual("P45 not ready stays not ready", notReady.status, "NOT_READY");
  assertEqual(
    "not ready reason is stable",
    notReady.reason,
    "RENDERER_READINESS_NOT_READY",
  );
  assertEqual("not ready creates no candidate", "candidate" in notReady, false);

  const readinessUnavailable = resolveStarBeastRendererReadiness(
    Object.freeze({ endpointResult: null }),
  );
  const upstreamUnavailable = resolveStarBeastRendererImplementationCandidate(
    Object.freeze({ ...availableInput, readinessResult: readinessUnavailable }),
  );
  assertEqual(
    "P45 unavailable stays unavailable",
    upstreamUnavailable.status,
    "UNAVAILABLE",
  );
  assertEqual(
    "upstream unavailable reason is stable",
    upstreamUnavailable.reason,
    "RENDERER_READINESS_UNAVAILABLE",
  );
  assertEqual(
    "upstream unavailable preserves P45 result",
    upstreamUnavailable.sourceReadinessResult === readinessUnavailable,
    true,
  );

  const missingReadiness = resolveStarBeastRendererImplementationCandidate(
    Object.freeze({ ...availableInput, readinessResult: null }),
  );
  assertEqual("missing readiness is unavailable", missingReadiness.status, "UNAVAILABLE");
  assertEqual(
    "missing readiness reason is stable",
    missingReadiness.reason,
    "RENDERER_READINESS_RESULT_REQUIRED",
  );

  const missingRequest = resolveStarBeastRendererImplementationCandidate(
    Object.freeze({ ...availableInput, implementationRequestReference: null }),
  );
  assertEqual("missing request is unavailable", missingRequest.status, "UNAVAILABLE");
  assertEqual(
    "missing request reason is stable",
    missingRequest.reason,
    "IMPLEMENTATION_REQUEST_REFERENCE_REQUIRED",
  );

  const missingBackend = resolveStarBeastRendererImplementationCandidate(
    Object.freeze({ ...availableInput, backendCapabilityReference: null }),
  );
  assertEqual("missing backend reference is unavailable", missingBackend.status, "UNAVAILABLE");
  assertEqual(
    "missing backend reason is stable",
    missingBackend.reason,
    "BACKEND_CAPABILITY_REFERENCE_REQUIRED",
  );
}

fs.rmSync(tempCandidateModulePath, { force: true });
fs.rmSync(tempReadinessModulePath, { force: true });
fs.rmSync(tempEndpointModulePath, { force: true });

if (failures.length > 0) {
  console.error("\nStar Beast renderer implementation candidate gate failed:");
  failures.forEach((failure) => console.error(`- ${failure}`));
  process.exit(1);
}

console.log("\nStar Beast renderer implementation candidate gate passed.");
