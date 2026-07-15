import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import process from "node:process";
import { build } from "esbuild";

const rootDir = process.cwd();
const typePath = path.join(rootDir, "src/types/starBeastRendererExecutionProtocolAuthorization.ts");
const servicePath = path.join(rootDir, "src/services/starBeastRendererExecutionProtocolAuthorizationResolver.ts");
const commandServicePath = path.join(rootDir, "src/services/starBeastRendererExplicitExecutionProtocolAuthorizationCommandService.ts");
const protocolPath = path.join(rootDir, "docs/GUANYAO_STAR_BEAST_RENDERER_EXECUTION_PROTOCOL_AUTHORIZATION_RESOLVER_PROTOCOL.md");
const commandProtocolPath = path.join(rootDir, "docs/GUANYAO_STAR_BEAST_RENDERER_EXPLICIT_EXECUTION_PROTOCOL_AUTHORIZATION_COMMAND_PROTOCOL.md");
const typeIndexPath = path.join(rootDir, "src/types/index.ts");
const packagePath = path.join(rootDir, "package.json");
const tempModulePath = path.join(os.tmpdir(), `guanyao-renderer-execution-protocol-authorization-${process.pid}.mjs`);
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
  ["P69 type", typePath],
  ["P69 resolver", servicePath],
  ["P68 service", commandServicePath],
  ["P69 protocol", protocolPath],
  ["P68 protocol", commandProtocolPath],
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
  const commandProtocolSource = fs.readFileSync(commandProtocolPath, "utf8");
  const typeIndexSource = fs.readFileSync(typeIndexPath, "utf8");
  const packageJson = JSON.parse(fs.readFileSync(packagePath, "utf8"));

  [
    "StarBeastRendererExecutionProtocolAuthorizationInput",
    "commandResult: StarBeastRendererExplicitExecutionProtocolAuthorizationCommandResult | null",
    "StarBeastRendererExecutionProtocolAuthorization",
    'semanticRole: "STAR_BEAST_RENDERER_EXECUTION_PROTOCOL_AUTHORIZATION"',
    'authorizationStatus: "AUTHORIZED_FOR_RENDERER_EXECUTION_PROTOCOL"',
    'authorizationScope: "STAR_BEAST_RENDERER_EXECUTION_PROTOCOL"',
    "sourceCommandReference:",
    "authorityReference:",
    "readinessReference:",
    "executionUnfreezeEndpointGovernanceReference:",
    "backendSelectionAuthorityReference:",
    "executionSliceReference:",
    "failureStopReference:",
    "rollbackReference:",
    "acceptanceReference:",
    'authorizationDecision: "AUTHORIZE_RENDERER_EXECUTION_PROTOCOL"',
    "explicitAuthorityConfirmed: true",
    "authorizationOnly: true",
    "noAutomaticExecution: true",
    "executionProtocolActivationDeferred: true",
    "noP65ResultConsumption: true",
    "noFrozenEndpointResultConsumption: true",
    "noBackendSelection: true",
    "noRendererCreation: true",
    "noRenderExecution: true",
    "noUIIntegration: true",
    "noRuntimeIntegration: true",
    "noStorageWrite: true",
    'status: "AUTHORIZED"',
    '"EXPLICIT_EXECUTION_PROTOCOL_AUTHORIZATION_COMMAND_NOT_READY"',
    '"EXPLICIT_EXECUTION_PROTOCOL_AUTHORIZATION_COMMAND_INVALID"',
    '"EXPLICIT_EXECUTION_PROTOCOL_AUTHORIZATION_COMMAND_RESULT_REQUIRED"',
    '"EXPLICIT_EXECUTION_PROTOCOL_AUTHORIZATION_COMMAND_UNAVAILABLE"',
  ].forEach((marker) => assertIncludes("P69 type contract", typeSource, marker));

  [
    "resolveStarBeastRendererExecutionProtocolAuthorization",
    "const commandResult = input.commandResult",
    "commandResult === null",
    'commandResult.status === "UNAVAILABLE"',
    'commandResult.status === "NOT_READY"',
    "const isValidExplicitCommand =",
    'command.decision === "AUTHORIZE_RENDERER_EXECUTION_PROTOCOL"',
    "command.authorityConfirmed === true",
    "command.explicit === true",
    "command.readinessReference === readiness",
    "readiness.executionUnfreezeEndpointGovernanceReference",
    "readiness.backendSelectionAuthorityReference",
    "readiness.executionSliceReference",
    "readiness.failureStopReference",
    "readiness.rollbackReference",
    "readiness.acceptanceReference",
    'reason: "EXPLICIT_EXECUTION_PROTOCOL_AUTHORIZATION_COMMAND_INVALID"',
    'semanticRole: "STAR_BEAST_RENDERER_EXECUTION_PROTOCOL_AUTHORIZATION"',
    "sourceCommandReference: command",
    "authorizationOnly: true",
    'status: "AUTHORIZED"',
  ].forEach((marker) => assertIncludes("P69 resolver contract", serviceSource, marker));

  [
    "resolveStarBeastRendererExplicitExecutionProtocolAuthorizationCommand(",
    "resolveStarBeastRendererExecutionProtocolReadiness(",
    "StarBeastRendererExecutionUnfreezeDeclarationEndpointResult",
    "resolveStarBeastRendererExecutionUnfreezeDeclarationEndpoint(",
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
    'from "react"',
    "/pages/",
    "/components/",
    "localStorage",
    "sessionStorage",
    "fetch(",
  ].forEach((marker) => assertExcludes("P69 remains authorization-only", serviceSource, marker));

  [
    "StarBeastRendererExecutionProtocolAuthorization",
    "StarBeastRendererExecutionProtocolAuthorizationInput",
    "StarBeastRendererExecutionProtocolAuthorizationResult",
    'from "./starBeastRendererExecutionProtocolAuthorization"',
  ].forEach((marker) => assertIncludes("type index exports P69", typeIndexSource, marker));

  const sourcePaths = collectTypeScriptSourcePaths(path.join(rootDir, "src"));
  const callSites = (symbol) => sourcePaths
    .filter((filePath) => fs.readFileSync(filePath, "utf8").includes(symbol))
    .map((filePath) => path.relative(rootDir, filePath))
    .sort()
    .join(",");
  assertEqual(
    "P68 resolver remains owner-only",
    callSites("resolveStarBeastRendererExplicitExecutionProtocolAuthorizationCommand("),
    "src/services/starBeastRendererExplicitExecutionProtocolAuthorizationCommandService.ts",
  );
  assertEqual(
    "P69 resolver has no downstream caller",
    callSites("resolveStarBeastRendererExecutionProtocolAuthorization("),
    "src/services/starBeastRendererExecutionProtocolAuthorizationResolver.ts",
  );

  [
    "RC-STAR-BEAST-RENDERER-EXECUTION-PROTOCOL-AUTHORIZATION-RESOLVER-P69",
    "EXECUTION PROTOCOL AUTHORIZATION ONLY",
    "P68 AVAILABLE Command Result",
    "AUTHORIZED_FOR_RENDERER_EXECUTION_PROTOCOL",
    "EXPLICIT_EXECUTION_PROTOCOL_AUTHORIZATION_COMMAND_INVALID",
    "P68 Command Result → only P69 Execution Protocol Authorization Resolver",
    "P69 Authorization Result → no consumer before P70 Authorization Consumption",
    "P69 只读取上位调用方提供的 P68 Result",
    "P69 的正式授权不解除 P54/P60/P66 三重冻结",
    "不选择 Backend、不创建 Renderer、不执行 Render",
  ].forEach((marker) => assertIncludes("P69 protocol", protocolSource, marker));
  [
    "P68 Command Result → only P69 Execution Protocol Authorization Resolver",
    "P68 Command Resolver → no direct external caller",
    "P69 Authorization Result → no consumer before P70 Authorization Consumption",
    "P69 Authorization Resolver → no direct external caller",
    "P69 正式 Authorization 只开放独立 Execution Protocol",
  ].forEach((marker) => assertIncludes("P68 permits only P69", commandProtocolSource, marker));

  assertIncludes(
    "P69 gate registered",
    packageJson.scripts?.["check:star-beast-renderer-execution-protocol-authorization-resolver"] ?? "",
    "node scripts/check-star-beast-renderer-execution-protocol-authorization-resolver.mjs",
  );
  assertIncludes(
    "P69 gate in release",
    packageJson.scripts?.["check:release"] ?? "",
    "npm run check:star-beast-renderer-execution-protocol-authorization-resolver",
  );

  await build({ entryPoints: [servicePath], outfile: tempModulePath, bundle: true, platform: "node", format: "esm", target: "node20", logLevel: "silent" });
  const { resolveStarBeastRendererExecutionProtocolAuthorization } = await import(`file://${tempModulePath}?t=${Date.now()}`);

  const executionUnfreezeEndpointGovernanceReference = Object.freeze({ referenceType: "STAR_BEAST_RENDERER_EXECUTION_UNFREEZE_ENDPOINT_GOVERNANCE", referenceId: "p65:governance" });
  const backendSelectionAuthorityReference = Object.freeze({ referenceType: "STAR_BEAST_RENDERER_BACKEND_SELECTION_AUTHORITY", referenceId: "authority:backend-selection" });
  const executionSliceReference = Object.freeze({ referenceType: "STAR_BEAST_RENDERER_EXECUTION_SLICE", referenceId: "slice:first-reversible" });
  const failureStopReference = Object.freeze({ referenceType: "STAR_BEAST_RENDERER_EXECUTION_FAILURE_STOP", referenceId: "stop:first-failure" });
  const rollbackReference = Object.freeze({ referenceType: "STAR_BEAST_RENDERER_EXECUTION_PROTOCOL_ROLLBACK", referenceId: "rollback:disable-slice" });
  const acceptanceReference = Object.freeze({ referenceType: "STAR_BEAST_RENDERER_EXECUTION_PROTOCOL_ACCEPTANCE", referenceId: "acceptance:first-slice" });
  const readiness = Object.freeze({ status: "READY", readiness: "READY_FOR_EXPLICIT_RENDERER_EXECUTION_PROTOCOL_AUTHORIZATION", executionUnfreezeEndpointGovernanceReference, backendSelectionAuthorityReference, executionSliceReference, failureStopReference, rollbackReference, acceptanceReference });
  const authorityReference = Object.freeze({ referenceType: "STAR_BEAST_RENDERER_EXECUTION_PROTOCOL_AUTHORITY", referenceId: "authority:product-owner" });
  const command = Object.freeze({ source: "explicit_renderer_execution_protocol_authorization_decision", semanticRole: "STAR_BEAST_RENDERER_EXPLICIT_EXECUTION_PROTOCOL_AUTHORIZATION_COMMAND", authorityReference, decision: "AUTHORIZE_RENDERER_EXECUTION_PROTOCOL", authorizationIntent: "AUTHORIZE_STAR_BEAST_RENDERER_EXECUTION_PROTOCOL", readinessReference: readiness, executionUnfreezeEndpointGovernanceReference, backendSelectionAuthorityReference, executionSliceReference, failureStopReference, rollbackReference, acceptanceReference, authorityConfirmed: true, explicit: true, commandOnly: true, notExecutionProtocolAuthorization: true });
  const availableCommandResult = Object.freeze({ status: "AVAILABLE", source: "star_beast_renderer_explicit_execution_protocol_authorization_command", input: Object.freeze({}), readiness, command });
  const input = Object.freeze({ commandResult: availableCommandResult });
  const snapshot = JSON.stringify(input);
  const authorized = resolveStarBeastRendererExecutionProtocolAuthorization(input);

  assertEqual("valid explicit command is authorized", authorized.status, "AUTHORIZED");
  assertEqual("authorization scope remains protocol-only", authorized.authorization.authorizationScope, "STAR_BEAST_RENDERER_EXECUTION_PROTOCOL");
  assertEqual("authorization preserves command", authorized.authorization.sourceCommandReference === command, true);
  assertEqual("authorization preserves subject authority", authorized.authorization.authorityReference === authorityReference, true);
  assertEqual("authorization preserves readiness", authorized.authorization.readinessReference === readiness, true);
  assertEqual("authorization preserves P65 governance", authorized.authorization.executionUnfreezeEndpointGovernanceReference === executionUnfreezeEndpointGovernanceReference, true);
  assertEqual("authorization preserves backend authority", authorized.authorization.backendSelectionAuthorityReference === backendSelectionAuthorityReference, true);
  assertEqual("authorization preserves execution slice", authorized.authorization.executionSliceReference === executionSliceReference, true);
  assertEqual("authorization preserves failure stop", authorized.authorization.failureStopReference === failureStopReference, true);
  assertEqual("authorization preserves rollback", authorized.authorization.rollbackReference === rollbackReference, true);
  assertEqual("authorization preserves acceptance", authorized.authorization.acceptanceReference === acceptanceReference, true);
  assertEqual("authorization does not consume P65 result", authorized.authorization.noP65ResultConsumption, true);
  assertEqual("authorization selects no backend", authorized.authorization.noBackendSelection, true);
  assertEqual("authorization creates no renderer", authorized.authorization.noRendererCreation, true);
  assertEqual("authorization executes no render", authorized.authorization.noRenderExecution, true);
  assertEqual("authorization remains frozen", Object.isFrozen(authorized.authorization), true);
  assertEqual("result remains frozen", Object.isFrozen(authorized), true);
  assertEqual("input unchanged", JSON.stringify(input), snapshot);

  for (const field of [
    "executionUnfreezeEndpointGovernanceReference",
    "backendSelectionAuthorityReference",
    "executionSliceReference",
    "failureStopReference",
    "rollbackReference",
    "acceptanceReference",
  ]) {
    const replacedCommand = Object.freeze({ ...command, [field]: Object.freeze({ ...command[field] }) });
    const result = resolveStarBeastRendererExecutionProtocolAuthorization(Object.freeze({ commandResult: Object.freeze({ ...availableCommandResult, command: replacedCommand }) }));
    assertEqual(`${field} replacement is rejected`, result.reason, "EXPLICIT_EXECUTION_PROTOCOL_AUTHORIZATION_COMMAND_INVALID");
  }

  const replacedReadiness = resolveStarBeastRendererExecutionProtocolAuthorization(Object.freeze({ commandResult: Object.freeze({ ...availableCommandResult, readiness: Object.freeze({ ...readiness }) }) }));
  assertEqual("replaced readiness is rejected", replacedReadiness.reason, "EXPLICIT_EXECUTION_PROTOCOL_AUTHORIZATION_COMMAND_INVALID");
  const notReady = resolveStarBeastRendererExecutionProtocolAuthorization(Object.freeze({ commandResult: Object.freeze({ status: "NOT_READY", reason: "EXECUTION_PROTOCOL_AUTHORITY_REFERENCE_REQUIRED" }) }));
  assertEqual("P68 NOT_READY remains not ready", notReady.status, "NOT_READY");
  assertEqual("P68 NOT_READY reason preserved", notReady.sourceCommandReason, "EXECUTION_PROTOCOL_AUTHORITY_REFERENCE_REQUIRED");
  const unavailable = resolveStarBeastRendererExecutionProtocolAuthorization(Object.freeze({ commandResult: Object.freeze({ status: "UNAVAILABLE", reason: "EXECUTION_PROTOCOL_READINESS_RESULT_REQUIRED" }) }));
  assertEqual("P68 UNAVAILABLE remains unavailable", unavailable.status, "UNAVAILABLE");
  assertEqual("P68 UNAVAILABLE reason preserved", unavailable.sourceCommandReason, "EXECUTION_PROTOCOL_READINESS_RESULT_REQUIRED");
  const missing = resolveStarBeastRendererExecutionProtocolAuthorization(Object.freeze({ commandResult: null }));
  assertEqual("missing P68 result remains unavailable", missing.reason, "EXPLICIT_EXECUTION_PROTOCOL_AUTHORIZATION_COMMAND_RESULT_REQUIRED");
}

try { fs.rmSync(tempModulePath, { force: true }); } catch { /* best-effort cleanup */ }
if (failures.length > 0) {
  console.error("\nStar Beast renderer execution protocol authorization resolver gate failed:");
  failures.forEach((failure) => console.error(`- ${failure}`));
  process.exit(1);
}
console.log("\nStar Beast renderer execution protocol authorization resolver gate passed.");
