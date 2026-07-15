import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import process from "node:process";
import { build } from "esbuild";

const rootDir = process.cwd();
const typePath = path.join(
  rootDir,
  "src/types/starBeastRendererExplicitImplementationUnfreezeDeclarationCommand.ts",
);
const servicePath = path.join(
  rootDir,
  "src/services/starBeastRendererExplicitImplementationUnfreezeDeclarationCommandService.ts",
);
const readinessServicePath = path.join(
  rootDir,
  "src/services/starBeastRendererImplementationUnfreezeReadinessService.ts",
);
const typeIndexPath = path.join(rootDir, "src/types/index.ts");
const protocolPath = path.join(
  rootDir,
  "docs/GUANYAO_STAR_BEAST_RENDERER_EXPLICIT_IMPLEMENTATION_UNFREEZE_DECLARATION_COMMAND_PROTOCOL.md",
);
const readinessProtocolPath = path.join(
  rootDir,
  "docs/GUANYAO_STAR_BEAST_RENDERER_IMPLEMENTATION_UNFREEZE_READINESS_PROTOCOL.md",
);
const packagePath = path.join(rootDir, "package.json");
const tempModulePath = path.join(
  os.tmpdir(),
  `guanyao-star-beast-renderer-explicit-unfreeze-command-${process.pid}.mjs`,
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
  ["explicit unfreeze command type", typePath],
  ["explicit unfreeze command service", servicePath],
  ["unfreeze readiness service", readinessServicePath],
  ["type index", typeIndexPath],
  ["explicit unfreeze command protocol", protocolPath],
  ["unfreeze readiness protocol", readinessProtocolPath],
  ["package manifest", packagePath],
]) {
  if (!fs.existsSync(filePath)) failures.push(`${name} file missing=${filePath}`);
  else console.log(`PASS | ${name} file exists`);
}

if (failures.length === 0) {
  const typeSource = fs.readFileSync(typePath, "utf8");
  const serviceSource = fs.readFileSync(servicePath, "utf8");
  const typeIndexSource = fs.readFileSync(typeIndexPath, "utf8");
  const protocolSource = fs.readFileSync(protocolPath, "utf8");
  const readinessProtocolSource = fs.readFileSync(readinessProtocolPath, "utf8");
  const packageJson = JSON.parse(fs.readFileSync(packagePath, "utf8"));
  const sourcePaths = collectTypeScriptSourcePaths(path.join(rootDir, "src"));
  const assertCallSites = (name, symbol, expectedRelativePaths) => {
    const actual = sourcePaths
      .filter((filePath) => fs.readFileSync(filePath, "utf8").includes(symbol))
      .map((filePath) => path.relative(rootDir, filePath))
      .sort();
    assertEqual(name, actual.join(","), [...expectedRelativePaths].sort().join(","));
  };

  [
    "export type StarBeastRendererImplementationUnfreezeAuthorityReference",
    'referenceType: "STAR_BEAST_RENDERER_IMPLEMENTATION_UNFREEZE_AUTHORITY"',
    '"DECLARE_UNFREEZE"',
    "readinessResult: StarBeastRendererImplementationUnfreezeReadinessResult | null",
    "export type StarBeastRendererExplicitImplementationUnfreezeDeclarationCommand",
    'semanticRole: "STAR_BEAST_RENDERER_EXPLICIT_IMPLEMENTATION_UNFREEZE_DECLARATION_COMMAND"',
    'declarationIntent: "DECLARE_STAR_BEAST_RENDERER_IMPLEMENTATION_UNFREEZE"',
    "readinessReference: StarBeastRendererImplementationUnfreezeReadinessReady",
    "authorizationEndpointGovernanceReference:",
    "implementationScenarioReference:",
    "backendCandidateReferences:",
    "fallbackStrategyReference:",
    "acceptanceScopeReference:",
    "commandOnly: true",
    "notUnfreezeDeclaration: true",
    "noUnfreezeIssued: true",
    "noAuthorizationEndpointConsumption: true",
    "noFinalBackendSelection: true",
    "noRendererCreation: true",
    "noRenderExecution: true",
    '"UNFREEZE_READINESS_NOT_READY"',
    '"UNFREEZE_AUTHORITY_REFERENCE_REQUIRED"',
    '"UNFREEZE_AUTHORITY_REFERENCE_INVALID"',
    '"EXPLICIT_DECLARE_UNFREEZE_DECISION_REQUIRED"',
    '"UNFREEZE_READINESS_RESULT_REQUIRED"',
    '"UNFREEZE_READINESS_UNAVAILABLE"',
  ].forEach((marker) => assertIncludes("P56 type contract", typeSource, marker));

  [
    "export function resolveStarBeastRendererExplicitImplementationUnfreezeDeclarationCommand",
    "const readiness = input.readinessResult",
    "readiness === null",
    'readiness.status === "UNAVAILABLE"',
    'readiness.status === "NOT_READY"',
    "isValidAuthorityReference",
    'input.decision !== "DECLARE_UNFREEZE"',
    "readinessReference: readiness",
    "readiness.authorizationEndpointGovernanceReference",
    "readiness.implementationScenarioReference",
    "readiness.backendCandidateReferences",
    "readiness.fallbackStrategyReference",
    "readiness.acceptanceScopeReference",
    'status: "AVAILABLE"',
  ].forEach((marker) => assertIncludes("P56 service contract", serviceSource, marker));

  [
    "resolveStarBeastRendererImplementationUnfreezeReadiness(",
    "StarBeastRendererImplementationAuthorizationEndpointResult",
    "resolveStarBeastRendererImplementationAuthorizationEndpoint(",
    "HTMLCanvasElement",
    "CanvasRenderingContext",
    "WebGLRenderingContext",
    "requestAnimationFrame",
    "drawImage(",
    "getContext(",
    'from "three"',
    'from "react"',
    "/pages/",
    "/components/",
    "localStorage",
    "sessionStorage",
    "fetch(",
    "fourSymbol",
    "Hexagram",
    "personality",
  ].forEach((marker) => assertExcludes("P56 stays governance-only", serviceSource, marker));

  [
    "StarBeastRendererExplicitImplementationUnfreezeDeclarationCommand",
    "StarBeastRendererExplicitImplementationUnfreezeDeclarationCommandInput",
    "StarBeastRendererExplicitImplementationUnfreezeDeclarationCommandResult",
    "StarBeastRendererImplementationUnfreezeAuthorityReference",
    'from "./starBeastRendererExplicitImplementationUnfreezeDeclarationCommand"',
  ].forEach((marker) => assertIncludes("type index exports P56", typeIndexSource, marker));

  assertCallSites(
    "P55 resolver remains without direct external caller",
    "resolveStarBeastRendererImplementationUnfreezeReadiness(",
    ["src/services/starBeastRendererImplementationUnfreezeReadinessService.ts"],
  );
  assertCallSites(
    "P56 command resolver has no downstream consumer",
    "resolveStarBeastRendererExplicitImplementationUnfreezeDeclarationCommand(",
    ["src/services/starBeastRendererExplicitImplementationUnfreezeDeclarationCommandService.ts"],
  );

  [
    "RC-STAR-BEAST-RENDERER-EXPLICIT-IMPLEMENTATION-UNFREEZE-DECLARATION-COMMAND-P56",
    "EXPLICIT IMPLEMENTATION UNFREEZE DECLARATION COMMAND",
    "P55 READY_FOR_EXPLICIT_IMPLEMENTATION_UNFREEZE_DECLARATION",
    "explicit DECLARE_UNFREEZE decision",
    "系统不能根据 READY 自动解冻",
    "Command 不是正式 Unfreeze Declaration，也不是实际 Unfreeze",
    "P55 Readiness Result → only P56 Explicit Unfreeze Declaration Command",
    "P56 只消费调用方提供的 P55 Result",
    "P56 Command Result → only P57 Implementation Unfreeze Declaration Resolver",
    "P56 Command Resolver → no direct external caller",
    "P57 只消费调用方提供的 P56 Result",
  ].forEach((marker) => assertIncludes("P56 protocol", protocolSource, marker));
  [
    "P55 Readiness Result → only P56 Explicit Unfreeze Declaration Command",
    "P55 Readiness Resolver → no direct external caller",
    "P56 只消费调用方提供的 P55 Result",
  ].forEach((marker) => assertIncludes("P55 protocol permits only P56", readinessProtocolSource, marker));

  assertIncludes(
    "P56 gate is registered",
    packageJson.scripts?.["check:star-beast-renderer-explicit-implementation-unfreeze-declaration-command"] ?? "",
    "node scripts/check-star-beast-renderer-explicit-implementation-unfreeze-declaration-command.mjs",
  );
  assertIncludes(
    "P56 gate participates in release",
    packageJson.scripts?.["check:release"] ?? "",
    "npm run check:star-beast-renderer-explicit-implementation-unfreeze-declaration-command",
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
  const { resolveStarBeastRendererExplicitImplementationUnfreezeDeclarationCommand } =
    await import(`file://${tempModulePath}?t=${Date.now()}`);

  const authorizationEndpointGovernanceReference = Object.freeze({
    referenceType: "STAR_BEAST_RENDERER_AUTHORIZATION_ENDPOINT_GOVERNANCE",
    referenceId: "authorization-endpoint-governance:p53",
  });
  const implementationScenarioReference = Object.freeze({
    referenceType: "STAR_BEAST_RENDERER_IMPLEMENTATION_SCENARIO",
    referenceId: "scenario:first-presence",
  });
  const backendCandidateReferences = Object.freeze([
    Object.freeze({
      referenceType: "STAR_BEAST_RENDERER_BACKEND_CANDIDATE",
      referenceId: "backend:canvas2d",
    }),
  ]);
  const fallbackStrategyReference = Object.freeze({
    referenceType: "STAR_BEAST_RENDERER_FALLBACK_STRATEGY",
    referenceId: "fallback:static-presence",
  });
  const acceptanceScopeReference = Object.freeze({
    referenceType: "STAR_BEAST_RENDERER_IMPLEMENTATION_ACCEPTANCE_SCOPE",
    referenceId: "acceptance:first-renderer-slice",
  });
  const readinessReady = Object.freeze({
    status: "READY",
    readiness: "READY_FOR_EXPLICIT_IMPLEMENTATION_UNFREEZE_DECLARATION",
    authorizationEndpointGovernanceReference,
    implementationScenarioReference,
    backendCandidateReferences,
    fallbackStrategyReference,
    acceptanceScopeReference,
  });
  const authorityReference = Object.freeze({
    referenceType: "STAR_BEAST_RENDERER_IMPLEMENTATION_UNFREEZE_AUTHORITY",
    referenceId: "unfreeze-authority:product-owner",
  });
  const availableInput = Object.freeze({
    readinessResult: readinessReady,
    authorityReference,
    decision: "DECLARE_UNFREEZE",
  });
  const snapshot = JSON.stringify(availableInput);
  const available = resolveStarBeastRendererExplicitImplementationUnfreezeDeclarationCommand(availableInput);

  assertEqual("READY plus explicit decision creates command", available.status, "AVAILABLE");
  assertEqual("command preserves readiness", available.command.readinessReference === readinessReady, true);
  assertEqual("command preserves governance ref", available.command.authorizationEndpointGovernanceReference === authorizationEndpointGovernanceReference, true);
  assertEqual("command preserves scenario ref", available.command.implementationScenarioReference === implementationScenarioReference, true);
  assertEqual("command preserves candidate refs", available.command.backendCandidateReferences === backendCandidateReferences, true);
  assertEqual("command preserves fallback ref", available.command.fallbackStrategyReference === fallbackStrategyReference, true);
  assertEqual("command preserves scope ref", available.command.acceptanceScopeReference === acceptanceScopeReference, true);
  assertEqual("command preserves authority", available.command.authorityReference === authorityReference, true);
  assertEqual("command is not declaration", available.command.notUnfreezeDeclaration, true);
  assertEqual("command issues no unfreeze", available.command.noUnfreezeIssued, true);
  assertEqual("command selects no backend", available.command.noFinalBackendSelection, true);
  assertEqual("command creates no renderer", available.command.noRendererCreation, true);
  assertEqual("command is frozen", Object.isFrozen(available.command), true);
  assertEqual("result is frozen", Object.isFrozen(available), true);
  assertEqual("input is not mutated", JSON.stringify(availableInput), snapshot);

  const missingAuthority = resolveStarBeastRendererExplicitImplementationUnfreezeDeclarationCommand(
    Object.freeze({ ...availableInput, authorityReference: null }),
  );
  assertEqual("missing authority is not ready", missingAuthority.status, "NOT_READY");
  assertEqual("missing authority reason", missingAuthority.reason, "UNFREEZE_AUTHORITY_REFERENCE_REQUIRED");

  const invalidAuthority = resolveStarBeastRendererExplicitImplementationUnfreezeDeclarationCommand(
    Object.freeze({
      ...availableInput,
      authorityReference: Object.freeze({ ...authorityReference, referenceId: " " }),
    }),
  );
  assertEqual("invalid authority is not ready", invalidAuthority.status, "NOT_READY");
  assertEqual("invalid authority reason", invalidAuthority.reason, "UNFREEZE_AUTHORITY_REFERENCE_INVALID");

  const missingDecision = resolveStarBeastRendererExplicitImplementationUnfreezeDeclarationCommand(
    Object.freeze({ ...availableInput, decision: null }),
  );
  assertEqual("missing decision is not ready", missingDecision.status, "NOT_READY");
  assertEqual("missing decision reason", missingDecision.reason, "EXPLICIT_DECLARE_UNFREEZE_DECISION_REQUIRED");

  const notReady = resolveStarBeastRendererExplicitImplementationUnfreezeDeclarationCommand(
    Object.freeze({
      ...availableInput,
      readinessResult: Object.freeze({ status: "NOT_READY", reason: "IMPLEMENTATION_SCENARIO_REFERENCE_REQUIRED" }),
    }),
  );
  assertEqual("upstream NOT_READY stays NOT_READY", notReady.status, "NOT_READY");
  assertEqual("upstream NOT_READY reason", notReady.reason, "UNFREEZE_READINESS_NOT_READY");
  assertEqual("source reason is preserved", notReady.sourceReadinessReason, "IMPLEMENTATION_SCENARIO_REFERENCE_REQUIRED");

  const unavailable = resolveStarBeastRendererExplicitImplementationUnfreezeDeclarationCommand(
    Object.freeze({
      ...availableInput,
      readinessResult: Object.freeze({ status: "UNAVAILABLE", reason: "AUTHORIZATION_ENDPOINT_GOVERNANCE_REFERENCE_REQUIRED" }),
    }),
  );
  assertEqual("upstream UNAVAILABLE stays UNAVAILABLE", unavailable.status, "UNAVAILABLE");
  assertEqual("upstream UNAVAILABLE reason", unavailable.reason, "UNFREEZE_READINESS_UNAVAILABLE");

  const missingReadiness = resolveStarBeastRendererExplicitImplementationUnfreezeDeclarationCommand(
    Object.freeze({ ...availableInput, readinessResult: null }),
  );
  assertEqual("missing readiness is unavailable", missingReadiness.status, "UNAVAILABLE");
  assertEqual("missing readiness reason", missingReadiness.reason, "UNFREEZE_READINESS_RESULT_REQUIRED");
}

try {
  fs.rmSync(tempModulePath, { force: true });
} catch {
  // Temporary gate output is best-effort cleanup only.
}

if (failures.length > 0) {
  console.error("\nStar Beast renderer explicit implementation unfreeze declaration command gate failed:");
  failures.forEach((failure) => console.error(`- ${failure}`));
  process.exit(1);
}

console.log("\nStar Beast renderer explicit implementation unfreeze declaration command gate passed.");
