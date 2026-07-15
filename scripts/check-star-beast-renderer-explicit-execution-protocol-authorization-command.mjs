import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import process from "node:process";
import { build } from "esbuild";

const rootDir = process.cwd();
const typePath = path.join(rootDir, "src/types/starBeastRendererExplicitExecutionProtocolAuthorizationCommand.ts");
const servicePath = path.join(rootDir, "src/services/starBeastRendererExplicitExecutionProtocolAuthorizationCommandService.ts");
const readinessServicePath = path.join(rootDir, "src/services/starBeastRendererExecutionProtocolReadinessService.ts");
const protocolPath = path.join(rootDir, "docs/GUANYAO_STAR_BEAST_RENDERER_EXPLICIT_EXECUTION_PROTOCOL_AUTHORIZATION_COMMAND_PROTOCOL.md");
const readinessProtocolPath = path.join(rootDir, "docs/GUANYAO_STAR_BEAST_RENDERER_EXECUTION_PROTOCOL_READINESS_PROTOCOL.md");
const typeIndexPath = path.join(rootDir, "src/types/index.ts");
const packagePath = path.join(rootDir, "package.json");
const tempModulePath = path.join(os.tmpdir(), `guanyao-renderer-explicit-execution-protocol-authorization-command-${process.pid}.mjs`);
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
  ["P68 type", typePath],
  ["P68 service", servicePath],
  ["P67 service", readinessServicePath],
  ["P68 protocol", protocolPath],
  ["P67 protocol", readinessProtocolPath],
  ["type index", typeIndexPath],
  ["package manifest", packagePath],
]) {
  if (!fs.existsSync(filePath)) failures.push(`${name} missing=${filePath}`);
  else console.log(`PASS | ${name} file exists`);
}

if (failures.length === 0) {
  const typeSource = fs.readFileSync(typePath, "utf8");
  const serviceSource = fs.readFileSync(servicePath, "utf8");
  const protocolSource = fs.readFileSync(protocolPath, "utf8");
  const readinessProtocolSource = fs.readFileSync(readinessProtocolPath, "utf8");
  const typeIndexSource = fs.readFileSync(typeIndexPath, "utf8");
  const packageJson = JSON.parse(fs.readFileSync(packagePath, "utf8"));

  [
    "StarBeastRendererExecutionProtocolAuthorityReference",
    'referenceType: "STAR_BEAST_RENDERER_EXECUTION_PROTOCOL_AUTHORITY"',
    '"AUTHORIZE_RENDERER_EXECUTION_PROTOCOL"',
    "readinessResult: StarBeastRendererExecutionProtocolReadinessResult | null",
    "StarBeastRendererExplicitExecutionProtocolAuthorizationCommand",
    'semanticRole: "STAR_BEAST_RENDERER_EXPLICIT_EXECUTION_PROTOCOL_AUTHORIZATION_COMMAND"',
    'authorizationIntent: "AUTHORIZE_STAR_BEAST_RENDERER_EXECUTION_PROTOCOL"',
    "readinessReference: StarBeastRendererExecutionProtocolReadinessReady",
    "executionUnfreezeEndpointGovernanceReference:",
    "backendSelectionAuthorityReference:",
    "executionSliceReference:",
    "failureStopReference:",
    "rollbackReference:",
    "acceptanceReference:",
    "commandOnly: true",
    "notExecutionProtocolAuthorization: true",
    "executionProtocolAuthorizationDeferred: true",
    "noP65ResultConsumption: true",
    "noFrozenEndpointResultConsumption: true",
    "noBackendSelection: true",
    "noRendererCreation: true",
    "noRenderExecution: true",
    '"EXECUTION_PROTOCOL_READINESS_NOT_READY"',
    '"EXECUTION_PROTOCOL_AUTHORITY_REFERENCE_REQUIRED"',
    '"EXECUTION_PROTOCOL_AUTHORITY_REFERENCE_INVALID"',
    '"EXPLICIT_AUTHORIZE_EXECUTION_PROTOCOL_DECISION_REQUIRED"',
    '"EXECUTION_PROTOCOL_READINESS_RESULT_REQUIRED"',
    '"EXECUTION_PROTOCOL_READINESS_UNAVAILABLE"',
  ].forEach((marker) => assertIncludes("P68 type contract", typeSource, marker));

  [
    "resolveStarBeastRendererExplicitExecutionProtocolAuthorizationCommand",
    "const readiness = input.readinessResult",
    "readiness === null",
    'readiness.status === "UNAVAILABLE"',
    'readiness.status === "NOT_READY"',
    "isValidAuthorityReference",
    'input.decision !== "AUTHORIZE_RENDERER_EXECUTION_PROTOCOL"',
    "readinessReference: readiness",
    "readiness.executionUnfreezeEndpointGovernanceReference",
    "readiness.backendSelectionAuthorityReference",
    "readiness.executionSliceReference",
    "readiness.failureStopReference",
    "readiness.rollbackReference",
    "readiness.acceptanceReference",
    'status: "AVAILABLE"',
  ].forEach((marker) => assertIncludes("P68 service contract", serviceSource, marker));

  [
    "resolveStarBeastRendererExecutionProtocolReadiness(",
    "StarBeastRendererExecutionUnfreezeDeclarationEndpointResult",
    "resolveStarBeastRendererExecutionUnfreezeDeclarationEndpoint(",
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
  ].forEach((marker) => assertExcludes("P68 stays command-only", serviceSource, marker));

  [
    "StarBeastRendererExecutionProtocolAuthorityReference",
    "StarBeastRendererExplicitExecutionProtocolAuthorizationCommandInput",
    "StarBeastRendererExplicitExecutionProtocolAuthorizationCommandResult",
    'from "./starBeastRendererExplicitExecutionProtocolAuthorizationCommand"',
  ].forEach((marker) => assertIncludes("type index exports P68", typeIndexSource, marker));

  const sourcePaths = collectTypeScriptSourcePaths(path.join(rootDir, "src"));
  const callSites = (symbol) => sourcePaths
    .filter((filePath) => fs.readFileSync(filePath, "utf8").includes(symbol))
    .map((filePath) => path.relative(rootDir, filePath))
    .sort()
    .join(",");
  assertEqual(
    "P67 resolver remains owner-only",
    callSites("resolveStarBeastRendererExecutionProtocolReadiness("),
    "src/services/starBeastRendererExecutionProtocolReadinessService.ts",
  );
  assertEqual(
    "P68 resolver has no downstream caller",
    callSites("resolveStarBeastRendererExplicitExecutionProtocolAuthorizationCommand("),
    "src/services/starBeastRendererExplicitExecutionProtocolAuthorizationCommandService.ts",
  );

  [
    "RC-STAR-BEAST-RENDERER-EXPLICIT-EXECUTION-PROTOCOL-AUTHORIZATION-COMMAND-P68",
    "EXPLICIT EXECUTION PROTOCOL AUTHORIZATION COMMAND ONLY",
    "P67 READY_FOR_EXPLICIT_RENDERER_EXECUTION_PROTOCOL_AUTHORIZATION",
    "explicit AUTHORIZE_RENDERER_EXECUTION_PROTOCOL decision",
    "系统不能根据 P67 READY 自动授权",
    "Command 不是正式 Execution Protocol Authorization，也不是实际 Renderer Execution",
    "P67 Readiness Result → only P68 Explicit Execution Protocol Authorization Command",
    "P68 只消费调用方提供的 P67 Result",
    "P68 Command Result → no consumer before P69 formal Execution Protocol Authorization Resolver",
    "P68 Command Resolver → no direct external caller",
    "P68 Command Result → only P69 Execution Protocol Authorization Resolver",
    "P69 Authorization Result → no consumer before P70 Authorization Consumption",
    "P69 Authorization Resolver → no direct external caller",
    "P69 正式 Authorization 只开放独立 Execution Protocol",
  ].forEach((marker) => assertIncludes("P68 protocol", protocolSource, marker));
  [
    "P67 Readiness Result → only P68 Explicit Execution Protocol Authorization Command",
    "P67 Readiness Resolver → no direct external caller",
    "P68 只消费调用方提供的 P67 Result",
    "P68 Command Result → no consumer before P69 formal Execution Protocol Authorization Resolver",
    "P68 Command 不是正式 Authorization",
  ].forEach((marker) => assertIncludes("P67 permits only P68", readinessProtocolSource, marker));

  assertIncludes(
    "P68 gate registered",
    packageJson.scripts?.["check:star-beast-renderer-explicit-execution-protocol-authorization-command"] ?? "",
    "node scripts/check-star-beast-renderer-explicit-execution-protocol-authorization-command.mjs",
  );
  assertIncludes(
    "P68 gate in release",
    packageJson.scripts?.["check:release"] ?? "",
    "npm run check:star-beast-renderer-explicit-execution-protocol-authorization-command",
  );

  await build({ entryPoints: [servicePath], outfile: tempModulePath, bundle: true, platform: "node", format: "esm", target: "node20", logLevel: "silent" });
  const { resolveStarBeastRendererExplicitExecutionProtocolAuthorizationCommand } = await import(`file://${tempModulePath}?t=${Date.now()}`);

  const executionUnfreezeEndpointGovernanceReference = Object.freeze({ referenceType: "STAR_BEAST_RENDERER_EXECUTION_UNFREEZE_ENDPOINT_GOVERNANCE", referenceId: "p65:governance" });
  const backendSelectionAuthorityReference = Object.freeze({ referenceType: "STAR_BEAST_RENDERER_BACKEND_SELECTION_AUTHORITY", referenceId: "authority:backend-selection" });
  const executionSliceReference = Object.freeze({ referenceType: "STAR_BEAST_RENDERER_EXECUTION_SLICE", referenceId: "slice:first-reversible" });
  const failureStopReference = Object.freeze({ referenceType: "STAR_BEAST_RENDERER_EXECUTION_FAILURE_STOP", referenceId: "stop:first-failure" });
  const rollbackReference = Object.freeze({ referenceType: "STAR_BEAST_RENDERER_EXECUTION_PROTOCOL_ROLLBACK", referenceId: "rollback:disable-slice" });
  const acceptanceReference = Object.freeze({ referenceType: "STAR_BEAST_RENDERER_EXECUTION_PROTOCOL_ACCEPTANCE", referenceId: "acceptance:first-slice" });
  const readinessReady = Object.freeze({ status: "READY", readiness: "READY_FOR_EXPLICIT_RENDERER_EXECUTION_PROTOCOL_AUTHORIZATION", executionUnfreezeEndpointGovernanceReference, backendSelectionAuthorityReference, executionSliceReference, failureStopReference, rollbackReference, acceptanceReference });
  const authorityReference = Object.freeze({ referenceType: "STAR_BEAST_RENDERER_EXECUTION_PROTOCOL_AUTHORITY", referenceId: "authority:product-owner" });
  const input = Object.freeze({ readinessResult: readinessReady, authorityReference, decision: "AUTHORIZE_RENDERER_EXECUTION_PROTOCOL" });
  const snapshot = JSON.stringify(input);
  const available = resolveStarBeastRendererExplicitExecutionProtocolAuthorizationCommand(input);

  assertEqual("READY plus explicit decision creates command", available.status, "AVAILABLE");
  assertEqual("command preserves readiness", available.command.readinessReference === readinessReady, true);
  assertEqual("command preserves P65 governance", available.command.executionUnfreezeEndpointGovernanceReference === executionUnfreezeEndpointGovernanceReference, true);
  assertEqual("command preserves backend authority", available.command.backendSelectionAuthorityReference === backendSelectionAuthorityReference, true);
  assertEqual("command preserves execution slice", available.command.executionSliceReference === executionSliceReference, true);
  assertEqual("command preserves failure stop", available.command.failureStopReference === failureStopReference, true);
  assertEqual("command preserves rollback", available.command.rollbackReference === rollbackReference, true);
  assertEqual("command preserves acceptance", available.command.acceptanceReference === acceptanceReference, true);
  assertEqual("command preserves subject authority", available.command.authorityReference === authorityReference, true);
  assertEqual("command is not authorization", available.command.notExecutionProtocolAuthorization, true);
  assertEqual("authorization remains deferred", available.command.executionProtocolAuthorizationDeferred, true);
  assertEqual("command consumes no P65 result", available.command.noP65ResultConsumption, true);
  assertEqual("command selects no backend", available.command.noBackendSelection, true);
  assertEqual("command creates no renderer", available.command.noRendererCreation, true);
  assertEqual("command executes no render", available.command.noRenderExecution, true);
  assertEqual("command is frozen", Object.isFrozen(available.command), true);
  assertEqual("result is frozen", Object.isFrozen(available), true);
  assertEqual("input unchanged", JSON.stringify(input), snapshot);

  const missingAuthority = resolveStarBeastRendererExplicitExecutionProtocolAuthorizationCommand(Object.freeze({ ...input, authorityReference: null }));
  assertEqual("missing authority not ready", missingAuthority.reason, "EXECUTION_PROTOCOL_AUTHORITY_REFERENCE_REQUIRED");
  const invalidAuthority = resolveStarBeastRendererExplicitExecutionProtocolAuthorizationCommand(Object.freeze({ ...input, authorityReference: Object.freeze({ referenceType: "STAR_BEAST_RENDERER_EXECUTION_PROTOCOL_AUTHORITY", referenceId: " " }) }));
  assertEqual("invalid authority not ready", invalidAuthority.reason, "EXECUTION_PROTOCOL_AUTHORITY_REFERENCE_INVALID");
  const missingDecision = resolveStarBeastRendererExplicitExecutionProtocolAuthorizationCommand(Object.freeze({ ...input, decision: null }));
  assertEqual("missing explicit decision not ready", missingDecision.reason, "EXPLICIT_AUTHORIZE_EXECUTION_PROTOCOL_DECISION_REQUIRED");
  const notReady = resolveStarBeastRendererExplicitExecutionProtocolAuthorizationCommand(Object.freeze({ ...input, readinessResult: Object.freeze({ status: "NOT_READY", reason: "EXECUTION_SLICE_REFERENCE_REQUIRED" }) }));
  assertEqual("NOT_READY cannot create command", notReady.reason, "EXECUTION_PROTOCOL_READINESS_NOT_READY");
  assertEqual("NOT_READY preserves source reason", notReady.sourceReadinessReason, "EXECUTION_SLICE_REFERENCE_REQUIRED");
  const unavailable = resolveStarBeastRendererExplicitExecutionProtocolAuthorizationCommand(Object.freeze({ ...input, readinessResult: Object.freeze({ status: "UNAVAILABLE", reason: "EXECUTION_UNFREEZE_ENDPOINT_GOVERNANCE_REFERENCE_REQUIRED" }) }));
  assertEqual("UNAVAILABLE cannot create command", unavailable.reason, "EXECUTION_PROTOCOL_READINESS_UNAVAILABLE");
  assertEqual("UNAVAILABLE preserves source reason", unavailable.sourceReadinessReason, "EXECUTION_UNFREEZE_ENDPOINT_GOVERNANCE_REFERENCE_REQUIRED");
  const missingReadiness = resolveStarBeastRendererExplicitExecutionProtocolAuthorizationCommand(Object.freeze({ ...input, readinessResult: null }));
  assertEqual("missing readiness unavailable", missingReadiness.reason, "EXECUTION_PROTOCOL_READINESS_RESULT_REQUIRED");
}

try { fs.rmSync(tempModulePath, { force: true }); } catch { /* best-effort cleanup */ }
if (failures.length > 0) {
  console.error("\nStar Beast renderer explicit execution protocol authorization command gate failed:");
  failures.forEach((failure) => console.error(`- ${failure}`));
  process.exit(1);
}
console.log("\nStar Beast renderer explicit execution protocol authorization command gate passed.");
