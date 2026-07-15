import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import process from "node:process";
import { build } from "esbuild";

const rootDir = process.cwd();
const bindingTypePath = path.join(
  rootDir,
  "src/types/starBeastRendererImplementationCapabilityBinding.ts",
);
const bindingServicePath = path.join(
  rootDir,
  "src/services/starBeastRendererImplementationCapabilityBindingService.ts",
);
const candidateServicePath = path.join(
  rootDir,
  "src/services/starBeastRendererImplementationCandidateService.ts",
);
const capabilityServicePath = path.join(
  rootDir,
  "src/services/starBeastRendererBackendCapabilityService.ts",
);
const typeIndexPath = path.join(rootDir, "src/types/index.ts");
const protocolPath = path.join(
  rootDir,
  "docs/GUANYAO_STAR_BEAST_RENDERER_IMPLEMENTATION_CAPABILITY_BINDING_PROTOCOL.md",
);
const candidateProtocolPath = path.join(
  rootDir,
  "docs/GUANYAO_STAR_BEAST_RENDERER_IMPLEMENTATION_CANDIDATE_PROTOCOL.md",
);
const capabilityProtocolPath = path.join(
  rootDir,
  "docs/GUANYAO_STAR_BEAST_RENDERER_BACKEND_CAPABILITY_SCHEMA_PROTOCOL.md",
);
const freezeProtocolPath = path.join(
  rootDir,
  "docs/GUANYAO_STAR_BEAST_RENDER_PLAN_CHAIN_FREEZE_PROTOCOL.md",
);
const packagePath = path.join(rootDir, "package.json");
const tempModulePath = path.join(
  os.tmpdir(),
  `guanyao-star-beast-renderer-implementation-capability-binding-${process.pid}.mjs`,
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
  ["capability binding type", bindingTypePath],
  ["capability binding service", bindingServicePath],
  ["implementation candidate service", candidateServicePath],
  ["backend capability service", capabilityServicePath],
  ["type index", typeIndexPath],
  ["capability binding protocol", protocolPath],
  ["implementation candidate protocol", candidateProtocolPath],
  ["backend capability protocol", capabilityProtocolPath],
  ["render plan chain freeze protocol", freezeProtocolPath],
  ["package manifest", packagePath],
]) {
  if (!fs.existsSync(filePath)) failures.push(`${name} file missing=${filePath}`);
  else console.log(`PASS | ${name} file exists`);
}

if (failures.length === 0) {
  const bindingTypeSource = fs.readFileSync(bindingTypePath, "utf8");
  const bindingServiceSource = fs.readFileSync(bindingServicePath, "utf8");
  const typeIndexSource = fs.readFileSync(typeIndexPath, "utf8");
  const protocolSource = fs.readFileSync(protocolPath, "utf8");
  const candidateProtocolSource = fs.readFileSync(candidateProtocolPath, "utf8");
  const capabilityProtocolSource = fs.readFileSync(capabilityProtocolPath, "utf8");
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
    "export type StarBeastRendererImplementationCapabilityBindingInput",
    "candidateResult: StarBeastRendererImplementationCandidateResult | null",
    "backendCapabilityResult: StarBeastRendererBackendCapabilityResult | null",
    "export type StarBeastRendererImplementationCapabilityBinding",
    'semanticRole: "STAR_BEAST_RENDERER_IMPLEMENTATION_CAPABILITY_BINDING"',
    "sourceCandidateReference: StarBeastRendererImplementationCandidate",
    "sourceCapabilityDeclarationReference: StarBeastRendererBackendCapabilityDeclaration",
    'bindingStatus: "BACKEND_CAPABILITY_REFERENCE_MATCHED"',
    "referenceMatched: true",
    "capabilityDeclarationVerified: true",
    "bindingOnly: true",
    "noImplementationAuthorization: true",
    "noBackendSelection: true",
    "noRenderExecution: true",
    "noUIIntegration: true",
    "noRuntimeIntegration: true",
    "noStorageWrite: true",
    "export type StarBeastRendererImplementationCapabilityBindingResult",
  ].forEach((marker) =>
    assertIncludes("capability binding type contract", bindingTypeSource, marker),
  );

  [
    "export function resolveStarBeastRendererImplementationCapabilityBinding",
    "const candidateResult = input.candidateResult",
    "candidateResult === null",
    '"IMPLEMENTATION_CANDIDATE_RESULT_REQUIRED"',
    'candidateResult.status === "UNAVAILABLE"',
    '"IMPLEMENTATION_CANDIDATE_UNAVAILABLE"',
    'candidateResult.status === "NOT_READY"',
    '"IMPLEMENTATION_CANDIDATE_NOT_READY"',
    "const backendCapabilityResult = input.backendCapabilityResult",
    "backendCapabilityResult === null",
    '"BACKEND_CAPABILITY_RESULT_REQUIRED"',
    'backendCapabilityResult.status === "UNAVAILABLE"',
    '"BACKEND_CAPABILITY_UNAVAILABLE"',
    "candidateCapabilityReference.referenceType ===",
    "candidateCapabilityReference.referenceId ===",
    '"BACKEND_CAPABILITY_REFERENCE_MISMATCH"',
    "sourceCandidateReference: candidateResult.candidate",
    "sourceCapabilityDeclarationReference:",
    'bindingStatus: "BACKEND_CAPABILITY_REFERENCE_MATCHED"',
    "noImplementationAuthorization: true",
    'status: "AVAILABLE"',
  ].forEach((marker) =>
    assertIncludes("capability binding service contract", bindingServiceSource, marker),
  );

  [
    "resolveStarBeastRendererImplementationCandidate(",
    "resolveStarBeastRendererBackendCapabilityDeclaration(",
    "resolveStarBeastRendererReadiness(",
    "resolveStarBeastRenderPlanConsumption(",
    "consumeStarBeastRenderPlan(",
    "adaptStarBeastRendererInputToRenderPlan(",
    "mapStarBeastLifeStateToVisualState(",
    ".capabilities",
    "renderPlanReference:",
    "channels:",
    "HTMLCanvasElement",
    "CanvasRenderingContext",
    "WebGLRenderingContext",
    "navigator.",
    "window.",
    "document.",
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
    "fourSymbol",
    "FourSymbol",
    "Hexagram",
    "personality",
    "Persona",
  ].forEach((marker) =>
    assertExcludes("binding remains reference-only", bindingServiceSource, marker),
  );

  [
    "StarBeastRendererImplementationCapabilityBinding",
    "StarBeastRendererImplementationCapabilityBindingInput",
    "StarBeastRendererImplementationCapabilityBindingResult",
    'from "./starBeastRendererImplementationCapabilityBinding"',
  ].forEach((marker) =>
    assertIncludes("type index exports capability binding", typeIndexSource, marker),
  );

  assertCallSites(
    "P46 resolver remains without external direct caller",
    "resolveStarBeastRendererImplementationCandidate(",
    ["src/services/starBeastRendererImplementationCandidateService.ts"],
  );
  assertCallSites(
    "P47 resolver remains without external direct caller",
    "resolveStarBeastRendererBackendCapabilityDeclaration(",
    ["src/services/starBeastRendererBackendCapabilityService.ts"],
  );
  assertCallSites(
    "P48 resolver has no downstream consumer",
    "resolveStarBeastRendererImplementationCapabilityBinding(",
    ["src/services/starBeastRendererImplementationCapabilityBindingService.ts"],
  );

  [
    "RC-STAR-BEAST-RENDERER-IMPLEMENTATION-CAPABILITY-BINDING-P48",
    "IMPLEMENTATION CAPABILITY BINDING",
    "P46 StarBeastRendererImplementationCandidateResult",
    "P47 StarBeastRendererBackendCapabilityResult",
    "BACKEND_CAPABILITY_REFERENCE_MATCHED",
    "IMPLEMENTATION_CANDIDATE_NOT_READY",
    "IMPLEMENTATION_CANDIDATE_RESULT_REQUIRED",
    "IMPLEMENTATION_CANDIDATE_UNAVAILABLE",
    "BACKEND_CAPABILITY_RESULT_REQUIRED",
    "BACKEND_CAPABILITY_UNAVAILABLE",
    "BACKEND_CAPABILITY_REFERENCE_MISMATCH",
    "P46 Result → only P48 Binding",
    "P47 Result → only P48 Binding",
    "P48 禁止直接调用 P41–P47",
    "不创建实现授权、不选择后端、不执行渲染",
  ].forEach((marker) =>
    assertIncludes("capability binding protocol", protocolSource, marker),
  );

  assertIncludes(
    "P46 protocol authorizes only P48 result consumer",
    candidateProtocolSource,
    "P46 Candidate Result → only P48 Capability Binding",
  );
  assertIncludes(
    "P47 protocol authorizes only P48 result consumer",
    capabilityProtocolSource,
    "P47 Result 只允许由 P48 Capability Binding 消费",
  );
  [
    "P48 Implementation Capability Binding Extension",
    "P46/P47 Result 只由 P48 Capability Binding 消费",
    "resolveStarBeastRendererImplementationCapabilityBinding",
  ].forEach((marker) =>
    assertIncludes("freeze protocol extends through P48", freezeProtocolSource, marker),
  );

  assertIncludes(
    "capability binding gate command is registered",
    packageJson.scripts?.["check:star-beast-renderer-implementation-capability-binding"] ?? "",
    "node scripts/check-star-beast-renderer-implementation-capability-binding.mjs",
  );
  assertIncludes(
    "capability binding gate participates in release",
    packageJson.scripts?.["check:release"] ?? "",
    "npm run check:star-beast-renderer-implementation-capability-binding",
  );

  await build({
    entryPoints: [bindingServicePath],
    outfile: tempModulePath,
    bundle: true,
    platform: "node",
    format: "esm",
    target: "node20",
    logLevel: "silent",
  });

  const { resolveStarBeastRendererImplementationCapabilityBinding } = await import(
    `file://${tempModulePath}?t=${Date.now()}`
  );

  const backendCapabilityReference = Object.freeze({
    referenceType: "STAR_BEAST_RENDERER_BACKEND_CAPABILITY_DECLARATION",
    referenceId: "renderer-backend-capability:binding-source",
  });
  const candidate = Object.freeze({
    semanticRole: "STAR_BEAST_RENDERER_IMPLEMENTATION_CANDIDATE",
    backendCapabilityReference,
  });
  const candidateAvailable = Object.freeze({
    status: "AVAILABLE",
    source: "star_beast_renderer_implementation_candidate",
    candidate,
  });
  const declaration = Object.freeze({
    semanticRole: "STAR_BEAST_RENDERER_BACKEND_CAPABILITY_DECLARATION",
    declarationReference: backendCapabilityReference,
    capabilities: Object.freeze([]),
  });
  const capabilityAvailable = Object.freeze({
    status: "AVAILABLE",
    source: "star_beast_renderer_backend_capability_schema",
    declaration,
  });
  const availableInput = Object.freeze({
    candidateResult: candidateAvailable,
    backendCapabilityResult: capabilityAvailable,
  });
  const availableSnapshot = JSON.stringify(availableInput);
  const available = resolveStarBeastRendererImplementationCapabilityBinding(availableInput);

  assertEqual("matching available inputs create binding", available.status, "AVAILABLE");
  assertEqual(
    "binding preserves candidate reference",
    available.binding.sourceCandidateReference === candidate,
    true,
  );
  assertEqual(
    "binding preserves declaration reference",
    available.binding.sourceCapabilityDeclarationReference === declaration,
    true,
  );
  assertEqual("binding confirms exact reference match", available.binding.referenceMatched, true);
  assertEqual("binding does not authorize implementation", available.binding.noImplementationAuthorization, true);
  assertEqual("binding does not select backend", available.binding.noBackendSelection, true);
  assertEqual("binding does not execute render", available.binding.noRenderExecution, true);
  assertEqual("binding does not copy capabilities", "capabilities" in available.binding, false);
  assertEqual("binding is frozen", Object.isFrozen(available.binding), true);
  assertEqual("available result is frozen", Object.isFrozen(available), true);
  assertEqual("binding does not mutate input", JSON.stringify(availableInput), availableSnapshot);

  const notReadyCandidate = Object.freeze({
    status: "NOT_READY",
    source: "star_beast_renderer_implementation_candidate",
    reason: "RENDERER_READINESS_NOT_READY",
  });
  const notReady = resolveStarBeastRendererImplementationCapabilityBinding(
    Object.freeze({ ...availableInput, candidateResult: notReadyCandidate }),
  );
  assertEqual("candidate not ready stays not ready", notReady.status, "NOT_READY");
  assertEqual("not ready reason is stable", notReady.reason, "IMPLEMENTATION_CANDIDATE_NOT_READY");
  assertEqual("not ready creates no binding", "binding" in notReady, false);

  const missingCandidate = resolveStarBeastRendererImplementationCapabilityBinding(
    Object.freeze({ ...availableInput, candidateResult: null }),
  );
  assertEqual("missing candidate is unavailable", missingCandidate.status, "UNAVAILABLE");
  assertEqual("missing candidate reason is stable", missingCandidate.reason, "IMPLEMENTATION_CANDIDATE_RESULT_REQUIRED");

  const candidateUnavailable = resolveStarBeastRendererImplementationCapabilityBinding(
    Object.freeze({
      ...availableInput,
      candidateResult: Object.freeze({ status: "UNAVAILABLE" }),
    }),
  );
  assertEqual("unavailable candidate stays unavailable", candidateUnavailable.status, "UNAVAILABLE");
  assertEqual("unavailable candidate reason is stable", candidateUnavailable.reason, "IMPLEMENTATION_CANDIDATE_UNAVAILABLE");

  const missingCapability = resolveStarBeastRendererImplementationCapabilityBinding(
    Object.freeze({ ...availableInput, backendCapabilityResult: null }),
  );
  assertEqual("missing capability is unavailable", missingCapability.status, "UNAVAILABLE");
  assertEqual("missing capability reason is stable", missingCapability.reason, "BACKEND_CAPABILITY_RESULT_REQUIRED");

  const capabilityUnavailable = resolveStarBeastRendererImplementationCapabilityBinding(
    Object.freeze({
      ...availableInput,
      backendCapabilityResult: Object.freeze({ status: "UNAVAILABLE" }),
    }),
  );
  assertEqual("unavailable capability stays unavailable", capabilityUnavailable.status, "UNAVAILABLE");
  assertEqual("unavailable capability reason is stable", capabilityUnavailable.reason, "BACKEND_CAPABILITY_UNAVAILABLE");

  const mismatchedCapability = Object.freeze({
    ...capabilityAvailable,
    declaration: Object.freeze({
      ...declaration,
      declarationReference: Object.freeze({
        ...backendCapabilityReference,
        referenceId: "renderer-backend-capability:different-source",
      }),
    }),
  });
  const mismatch = resolveStarBeastRendererImplementationCapabilityBinding(
    Object.freeze({
      ...availableInput,
      backendCapabilityResult: mismatchedCapability,
    }),
  );
  assertEqual("mismatched reference is unavailable", mismatch.status, "UNAVAILABLE");
  assertEqual("mismatch reason is stable", mismatch.reason, "BACKEND_CAPABILITY_REFERENCE_MISMATCH");
  assertEqual("mismatch creates no binding", "binding" in mismatch, false);
}

try {
  fs.rmSync(tempModulePath, { force: true });
} catch {
  // Temporary gate output is best-effort cleanup only.
}

if (failures.length > 0) {
  console.error("\nStar Beast renderer implementation capability binding gate failed:");
  failures.forEach((failure) => console.error(`- ${failure}`));
  process.exit(1);
}

console.log("\nStar Beast renderer implementation capability binding gate passed.");
