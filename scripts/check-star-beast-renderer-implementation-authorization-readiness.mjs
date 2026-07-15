import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import process from "node:process";
import { build } from "esbuild";

const rootDir = process.cwd();
const readinessTypePath = path.join(
  rootDir,
  "src/types/starBeastRendererImplementationAuthorizationReadiness.ts",
);
const readinessServicePath = path.join(
  rootDir,
  "src/services/starBeastRendererImplementationAuthorizationReadinessService.ts",
);
const bindingServicePath = path.join(
  rootDir,
  "src/services/starBeastRendererImplementationCapabilityBindingService.ts",
);
const typeIndexPath = path.join(rootDir, "src/types/index.ts");
const protocolPath = path.join(
  rootDir,
  "docs/GUANYAO_STAR_BEAST_RENDERER_IMPLEMENTATION_AUTHORIZATION_READINESS_PROTOCOL.md",
);
const bindingProtocolPath = path.join(
  rootDir,
  "docs/GUANYAO_STAR_BEAST_RENDERER_IMPLEMENTATION_CAPABILITY_BINDING_PROTOCOL.md",
);
const freezeProtocolPath = path.join(
  rootDir,
  "docs/GUANYAO_STAR_BEAST_RENDER_PLAN_CHAIN_FREEZE_PROTOCOL.md",
);
const packagePath = path.join(rootDir, "package.json");
const tempModulePath = path.join(
  os.tmpdir(),
  `guanyao-star-beast-renderer-implementation-authorization-readiness-${process.pid}.mjs`,
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
  ["authorization readiness type", readinessTypePath],
  ["authorization readiness service", readinessServicePath],
  ["capability binding service", bindingServicePath],
  ["type index", typeIndexPath],
  ["authorization readiness protocol", protocolPath],
  ["capability binding protocol", bindingProtocolPath],
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
  const bindingProtocolSource = fs.readFileSync(bindingProtocolPath, "utf8");
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
    "export type StarBeastRendererImplementationAuthorizationReadinessInput",
    "bindingResult: StarBeastRendererImplementationCapabilityBindingResult | null",
    "export type StarBeastRendererImplementationAuthorizationReadinessReady",
    'status: "READY"',
    'readiness: "READY_FOR_EXPLICIT_RENDERER_IMPLEMENTATION_AUTHORIZATION"',
    "sourceBindingResult: StarBeastRendererImplementationCapabilityBindingAvailable",
    "bindingReference: StarBeastRendererImplementationCapabilityBindingAvailable",
    "explicitAuthorizationRequired: true",
    "authorizationDeferred: true",
    "noAuthorizationIssued: true",
    "noBackendSelection: true",
    "noRenderExecution: true",
    "noUIIntegration: true",
    "noRuntimeIntegration: true",
    "noStorageWrite: true",
    "export type StarBeastRendererImplementationAuthorizationReadinessNotReady",
    '"CAPABILITY_BINDING_NOT_READY"',
    "sourceBindingReason:",
    "export type StarBeastRendererImplementationAuthorizationReadinessUnavailable",
    '"CAPABILITY_BINDING_RESULT_REQUIRED"',
    '"CAPABILITY_BINDING_UNAVAILABLE"',
    "export type StarBeastRendererImplementationAuthorizationReadinessResult",
  ].forEach((marker) =>
    assertIncludes("authorization readiness type contract", readinessTypeSource, marker),
  );

  [
    "STAR_BEAST_RENDERER_IMPLEMENTATION_AUTHORIZATION_GUARDRAILS",
    "export function resolveStarBeastRendererImplementationAuthorizationReadiness",
    "const bindingResult = input.bindingResult",
    "bindingResult === null",
    'status: "UNAVAILABLE"',
    'reason: "CAPABILITY_BINDING_RESULT_REQUIRED"',
    'bindingResult.status === "UNAVAILABLE"',
    'reason: "CAPABILITY_BINDING_UNAVAILABLE"',
    "sourceBindingReason: bindingResult.reason",
    'bindingResult.status === "NOT_READY"',
    'status: "NOT_READY"',
    'reason: "CAPABILITY_BINDING_NOT_READY"',
    'status: "READY"',
    'readiness: "READY_FOR_EXPLICIT_RENDERER_IMPLEMENTATION_AUTHORIZATION"',
    "sourceBindingResult: bindingResult",
    "bindingReference: bindingResult.binding",
    "explicitAuthorizationRequired: true",
    "authorizationDeferred: true",
    "noAuthorizationIssued: true",
    "noBackendSelection: true",
    "noRenderExecution: true",
  ].forEach((marker) =>
    assertIncludes("authorization readiness service contract", readinessServiceSource, marker),
  );

  [
    "resolveStarBeastRendererImplementationCapabilityBinding(",
    "resolveStarBeastRendererImplementationCandidate(",
    "resolveStarBeastRendererBackendCapabilityDeclaration(",
    "resolveStarBeastRendererReadiness(",
    "resolveStarBeastRenderPlanConsumption(",
    "consumeStarBeastRenderPlan(",
    "adaptStarBeastRendererInputToRenderPlan(",
    ".capabilities",
    ".channels",
    "referenceId",
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
    assertExcludes("authorization readiness stays qualification-only", readinessServiceSource, marker),
  );

  [
    "StarBeastRendererImplementationAuthorizationReadinessInput",
    "StarBeastRendererImplementationAuthorizationReadinessReady",
    "StarBeastRendererImplementationAuthorizationReadinessResult",
    'from "./starBeastRendererImplementationAuthorizationReadiness"',
  ].forEach((marker) =>
    assertIncludes("type index exports authorization readiness", typeIndexSource, marker),
  );

  assertCallSites(
    "P48 resolver remains without external direct caller",
    "resolveStarBeastRendererImplementationCapabilityBinding(",
    ["src/services/starBeastRendererImplementationCapabilityBindingService.ts"],
  );
  assertCallSites(
    "P49 readiness resolver has no downstream consumer",
    "resolveStarBeastRendererImplementationAuthorizationReadiness(",
    ["src/services/starBeastRendererImplementationAuthorizationReadinessService.ts"],
  );

  [
    "RC-STAR-BEAST-RENDERER-IMPLEMENTATION-AUTHORIZATION-READINESS-P49",
    "IMPLEMENTATION AUTHORIZATION READINESS",
    "P48 StarBeastRendererImplementationCapabilityBindingResult",
    "READY_FOR_EXPLICIT_RENDERER_IMPLEMENTATION_AUTHORIZATION",
    "CAPABILITY_BINDING_NOT_READY",
    "CAPABILITY_BINDING_RESULT_REQUIRED",
    "CAPABILITY_BINDING_UNAVAILABLE",
    "Readiness 不是授权",
    "explicitAuthorizationRequired: true",
    "authorizationDeferred: true",
    "noAuthorizationIssued: true",
    "P48 Result → only P49 Authorization Readiness",
    "P49 禁止直接调用 P41–P48",
    "P49 不创建 Authorization Command，不创建 Authorization",
  ].forEach((marker) =>
    assertIncludes("authorization readiness protocol", protocolSource, marker),
  );

  assertIncludes(
    "P48 protocol authorizes only P49 result consumer",
    bindingProtocolSource,
    "P48 Binding Result → only P49 Authorization Readiness",
  );
  [
    "P49 Implementation Authorization Readiness Extension",
    "P48 Result 只允许由 P49 Authorization Readiness 消费",
    "READY 不等于 Authorization",
    "resolveStarBeastRendererImplementationAuthorizationReadiness",
  ].forEach((marker) =>
    assertIncludes("freeze protocol extends through P49", freezeProtocolSource, marker),
  );

  assertIncludes(
    "authorization readiness gate command is registered",
    packageJson.scripts?.["check:star-beast-renderer-implementation-authorization-readiness"] ?? "",
    "node scripts/check-star-beast-renderer-implementation-authorization-readiness.mjs",
  );
  assertIncludes(
    "authorization readiness gate participates in release",
    packageJson.scripts?.["check:release"] ?? "",
    "npm run check:star-beast-renderer-implementation-authorization-readiness",
  );

  await build({
    entryPoints: [readinessServicePath],
    outfile: tempModulePath,
    bundle: true,
    platform: "node",
    format: "esm",
    target: "node20",
    logLevel: "silent",
  });

  const { resolveStarBeastRendererImplementationAuthorizationReadiness } =
    await import(`file://${tempModulePath}?t=${Date.now()}`);

  const binding = Object.freeze({
    semanticRole: "STAR_BEAST_RENDERER_IMPLEMENTATION_CAPABILITY_BINDING",
    bindingStatus: "BACKEND_CAPABILITY_REFERENCE_MATCHED",
  });
  const availableBindingResult = Object.freeze({
    status: "AVAILABLE",
    source: "star_beast_renderer_implementation_capability_binding",
    binding,
  });
  const readyInput = Object.freeze({ bindingResult: availableBindingResult });
  const readySnapshot = JSON.stringify(readyInput);
  const ready = resolveStarBeastRendererImplementationAuthorizationReadiness(readyInput);

  assertEqual("available binding becomes ready", ready.status, "READY");
  assertEqual("ready contract requires explicit authorization", ready.explicitAuthorizationRequired, true);
  assertEqual("ready contract defers authorization", ready.authorizationDeferred, true);
  assertEqual("ready contract issues no authorization", ready.noAuthorizationIssued, true);
  assertEqual("ready contract preserves binding result", ready.sourceBindingResult === availableBindingResult, true);
  assertEqual("ready contract preserves binding", ready.bindingReference === binding, true);
  assertEqual("ready contract selects no backend", ready.noBackendSelection, true);
  assertEqual("ready contract executes no render", ready.noRenderExecution, true);
  assertEqual("ready result is frozen", Object.isFrozen(ready), true);
  assertEqual("readiness does not mutate input", JSON.stringify(readyInput), readySnapshot);

  const notReadyBindingResult = Object.freeze({
    status: "NOT_READY",
    reason: "IMPLEMENTATION_CANDIDATE_NOT_READY",
  });
  const notReady = resolveStarBeastRendererImplementationAuthorizationReadiness(
    Object.freeze({ bindingResult: notReadyBindingResult }),
  );
  assertEqual("not-ready binding stays not ready", notReady.status, "NOT_READY");
  assertEqual("not-ready reason is stable", notReady.reason, "CAPABILITY_BINDING_NOT_READY");
  assertEqual("not-ready preserves upstream reason", notReady.sourceBindingReason, "IMPLEMENTATION_CANDIDATE_NOT_READY");
  assertEqual("not-ready issues no authorization", notReady.noAuthorizationIssued, true);

  const unavailableBindingResult = Object.freeze({
    status: "UNAVAILABLE",
    reason: "BACKEND_CAPABILITY_REFERENCE_MISMATCH",
  });
  const unavailable = resolveStarBeastRendererImplementationAuthorizationReadiness(
    Object.freeze({ bindingResult: unavailableBindingResult }),
  );
  assertEqual("unavailable binding stays unavailable", unavailable.status, "UNAVAILABLE");
  assertEqual("unavailable reason is stable", unavailable.reason, "CAPABILITY_BINDING_UNAVAILABLE");
  assertEqual("unavailable preserves upstream reason", unavailable.sourceBindingReason, "BACKEND_CAPABILITY_REFERENCE_MISMATCH");
  assertEqual("unavailable issues no authorization", unavailable.noAuthorizationIssued, true);

  const missing = resolveStarBeastRendererImplementationAuthorizationReadiness(
    Object.freeze({ bindingResult: null }),
  );
  assertEqual("missing binding is unavailable", missing.status, "UNAVAILABLE");
  assertEqual("missing binding reason is stable", missing.reason, "CAPABILITY_BINDING_RESULT_REQUIRED");
  assertEqual("missing binding preserves no invented reason", missing.sourceBindingReason, null);
  assertEqual("missing binding issues no authorization", missing.noAuthorizationIssued, true);
}

try {
  fs.rmSync(tempModulePath, { force: true });
} catch {
  // Temporary gate output is best-effort cleanup only.
}

if (failures.length > 0) {
  console.error("\nStar Beast renderer implementation authorization readiness gate failed:");
  failures.forEach((failure) => console.error(`- ${failure}`));
  process.exit(1);
}

console.log("\nStar Beast renderer implementation authorization readiness gate passed.");
