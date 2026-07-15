import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import process from "node:process";
import { build } from "esbuild";

const rootDir = process.cwd();
const typePath = path.join(rootDir, "src/types/starBeastRendererExecutionProtocolAuthorizationConsumption.ts");
const servicePath = path.join(rootDir, "src/services/starBeastRendererExecutionProtocolAuthorizationConsumptionService.ts");
const authorizationServicePath = path.join(rootDir, "src/services/starBeastRendererExecutionProtocolAuthorizationResolver.ts");
const protocolPath = path.join(rootDir, "docs/GUANYAO_STAR_BEAST_RENDERER_EXECUTION_PROTOCOL_AUTHORIZATION_CONSUMPTION_PROTOCOL.md");
const authorizationProtocolPath = path.join(rootDir, "docs/GUANYAO_STAR_BEAST_RENDERER_EXECUTION_PROTOCOL_AUTHORIZATION_RESOLVER_PROTOCOL.md");
const typeIndexPath = path.join(rootDir, "src/types/index.ts");
const packagePath = path.join(rootDir, "package.json");
const tempModulePath = path.join(os.tmpdir(), `guanyao-renderer-execution-protocol-authorization-consumption-${process.pid}.mjs`);
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
  ["P70 type", typePath],
  ["P70 service", servicePath],
  ["P69 resolver", authorizationServicePath],
  ["P70 protocol", protocolPath],
  ["P69 protocol", authorizationProtocolPath],
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
  const authorizationProtocolSource = fs.readFileSync(authorizationProtocolPath, "utf8");
  const typeIndexSource = fs.readFileSync(typeIndexPath, "utf8");
  const packageJson = JSON.parse(fs.readFileSync(packagePath, "utf8"));

  [
    "StarBeastRendererExecutionProtocolAuthorizationConsumptionInput",
    "authorizationResult: StarBeastRendererExecutionProtocolAuthorizationResult | null",
    "StarBeastRendererExecutionProtocolAuthorizationConsumption",
    'semanticRole: "STAR_BEAST_RENDERER_EXECUTION_PROTOCOL_AUTHORIZATION_CONSUMPTION"',
    "authorizationReference:",
    "sourceAuthorizationResult:",
    "sourceCommandReference:",
    "authorityReference:",
    "readinessReference:",
    "executionUnfreezeEndpointGovernanceReference:",
    "backendSelectionAuthorityReference:",
    "executionSliceReference:",
    "failureStopReference:",
    "rollbackReference:",
    "acceptanceReference:",
    'consumptionStatus: "AVAILABLE_FOR_FUTURE_RENDERER_EXECUTION_PROTOCOL_ENDPOINT"',
    "authorizationConsumedOnly: true",
    "executionProtocolEndpointDeferred: true",
    "noAutomaticExecution: true",
    "noP65ResultConsumption: true",
    "noFrozenEndpointResultConsumption: true",
    "noBackendSelection: true",
    "noRendererCreation: true",
    "noRenderExecution: true",
    "noUIIntegration: true",
    "noRuntimeIntegration: true",
    "noStorageWrite: true",
    '"EXECUTION_PROTOCOL_AUTHORIZATION_NOT_READY"',
    '"EXECUTION_PROTOCOL_AUTHORIZATION_RESULT_REQUIRED"',
    '"EXECUTION_PROTOCOL_AUTHORIZATION_UNAVAILABLE"',
  ].forEach((marker) => assertIncludes("P70 type contract", typeSource, marker));

  [
    "consumeStarBeastRendererExecutionProtocolAuthorization",
    "const sourceAuthorizationResult = input.authorizationResult",
    "sourceAuthorizationResult === null",
    'sourceAuthorizationResult.status === "UNAVAILABLE"',
    'sourceAuthorizationResult.status === "NOT_READY"',
    "const authorizationReference = sourceAuthorizationResult.authorization",
    '"STAR_BEAST_RENDERER_EXECUTION_PROTOCOL_AUTHORIZATION_CONSUMPTION"',
    "authorizationReference,",
    "sourceAuthorizationResult,",
    "sourceCommandReference: authorizationReference.sourceCommandReference",
    "authorityReference: authorizationReference.authorityReference",
    "readinessReference: authorizationReference.readinessReference",
    "authorizationReference.executionUnfreezeEndpointGovernanceReference",
    "authorizationReference.backendSelectionAuthorityReference",
    "authorizationReference.executionSliceReference",
    "authorizationReference.failureStopReference",
    "authorizationReference.rollbackReference",
    "authorizationReference.acceptanceReference",
    '"AVAILABLE_FOR_FUTURE_RENDERER_EXECUTION_PROTOCOL_ENDPOINT"',
    "authorizationConsumedOnly: true",
    "executionProtocolEndpointDeferred: true",
    'status: "AVAILABLE"',
  ].forEach((marker) => assertIncludes("P70 service contract", serviceSource, marker));

  [
    "resolveStarBeastRendererExecutionProtocolAuthorization(",
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
  ].forEach((marker) => assertExcludes("P70 remains consumption-only", serviceSource, marker));

  [
    "StarBeastRendererExecutionProtocolAuthorizationConsumption",
    "StarBeastRendererExecutionProtocolAuthorizationConsumptionInput",
    "StarBeastRendererExecutionProtocolAuthorizationConsumptionResult",
    'from "./starBeastRendererExecutionProtocolAuthorizationConsumption"',
  ].forEach((marker) => assertIncludes("type index exports P70", typeIndexSource, marker));

  const sourcePaths = collectTypeScriptSourcePaths(path.join(rootDir, "src"));
  const callSites = (symbol) => sourcePaths
    .filter((filePath) => fs.readFileSync(filePath, "utf8").includes(symbol))
    .map((filePath) => path.relative(rootDir, filePath))
    .sort()
    .join(",");
  assertEqual(
    "P69 resolver remains owner-only",
    callSites("resolveStarBeastRendererExecutionProtocolAuthorization("),
    "src/services/starBeastRendererExecutionProtocolAuthorizationResolver.ts",
  );
  assertEqual(
    "P70 service has no downstream caller",
    callSites("consumeStarBeastRendererExecutionProtocolAuthorization("),
    "src/services/starBeastRendererExecutionProtocolAuthorizationConsumptionService.ts",
  );

  [
    "RC-STAR-BEAST-RENDERER-EXECUTION-PROTOCOL-AUTHORIZATION-CONSUMPTION-P70",
    "EXECUTION PROTOCOL AUTHORIZATION CONSUMPTION ONLY",
    "P69 AUTHORIZED Result",
    "AVAILABLE_FOR_FUTURE_RENDERER_EXECUTION_PROTOCOL_ENDPOINT",
    "Consumption 不是 Endpoint，不是 Backend Selection，不是 Renderer，也不是 Render Execution",
    "P69 Authorization Result → only P70 Authorization Consumption",
    "P70 Consumption Result → no consumer before P71 Execution Protocol Authorization Endpoint",
    "P70 只读取上位调用方提供的 P69 Result",
    "P70 不解除 P54/P60/P66 三重冻结",
    "不选择 Backend、不创建 Renderer、不执行 Render",
  ].forEach((marker) => assertIncludes("P70 protocol", protocolSource, marker));
  [
    "P69 Authorization Result → only P70 Authorization Consumption",
    "P69 Authorization Resolver → no direct external caller",
    "P70 Consumption Result → no consumer before P71 Execution Protocol Authorization Endpoint",
    "P70 Authorization Consumption → no direct external caller",
    "P70 只消费调用方提供的 P69 Result",
  ].forEach((marker) => assertIncludes("P69 permits only P70", authorizationProtocolSource, marker));

  assertIncludes(
    "P70 gate registered",
    packageJson.scripts?.["check:star-beast-renderer-execution-protocol-authorization-consumption"] ?? "",
    "node scripts/check-star-beast-renderer-execution-protocol-authorization-consumption.mjs",
  );
  assertIncludes(
    "P70 gate in release",
    packageJson.scripts?.["check:release"] ?? "",
    "npm run check:star-beast-renderer-execution-protocol-authorization-consumption",
  );

  await build({ entryPoints: [servicePath], outfile: tempModulePath, bundle: true, platform: "node", format: "esm", target: "node20", logLevel: "silent" });
  const { consumeStarBeastRendererExecutionProtocolAuthorization } = await import(`file://${tempModulePath}?t=${Date.now()}`);

  const executionUnfreezeEndpointGovernanceReference = Object.freeze({ referenceType: "STAR_BEAST_RENDERER_EXECUTION_UNFREEZE_ENDPOINT_GOVERNANCE", referenceId: "p65:governance" });
  const backendSelectionAuthorityReference = Object.freeze({ referenceType: "STAR_BEAST_RENDERER_BACKEND_SELECTION_AUTHORITY", referenceId: "authority:backend-selection" });
  const executionSliceReference = Object.freeze({ referenceType: "STAR_BEAST_RENDERER_EXECUTION_SLICE", referenceId: "slice:first-reversible" });
  const failureStopReference = Object.freeze({ referenceType: "STAR_BEAST_RENDERER_EXECUTION_FAILURE_STOP", referenceId: "stop:first-failure" });
  const rollbackReference = Object.freeze({ referenceType: "STAR_BEAST_RENDERER_EXECUTION_PROTOCOL_ROLLBACK", referenceId: "rollback:disable-slice" });
  const acceptanceReference = Object.freeze({ referenceType: "STAR_BEAST_RENDERER_EXECUTION_PROTOCOL_ACCEPTANCE", referenceId: "acceptance:first-slice" });
  const readinessReference = Object.freeze({ readiness: "READY_FOR_EXPLICIT_RENDERER_EXECUTION_PROTOCOL_AUTHORIZATION" });
  const authorityReference = Object.freeze({ referenceType: "STAR_BEAST_RENDERER_EXECUTION_PROTOCOL_AUTHORITY", referenceId: "authority:product-owner" });
  const sourceCommandReference = Object.freeze({ semanticRole: "STAR_BEAST_RENDERER_EXPLICIT_EXECUTION_PROTOCOL_AUTHORIZATION_COMMAND" });
  const authorization = Object.freeze({ source: "explicit_renderer_execution_protocol_authorization_command", semanticRole: "STAR_BEAST_RENDERER_EXECUTION_PROTOCOL_AUTHORIZATION", authorizationStatus: "AUTHORIZED_FOR_RENDERER_EXECUTION_PROTOCOL", authorizationScope: "STAR_BEAST_RENDERER_EXECUTION_PROTOCOL", sourceCommandReference, authorityReference, readinessReference, executionUnfreezeEndpointGovernanceReference, backendSelectionAuthorityReference, executionSliceReference, failureStopReference, rollbackReference, acceptanceReference, authorizationDecision: "AUTHORIZE_RENDERER_EXECUTION_PROTOCOL", explicitAuthorityConfirmed: true, authorizationOnly: true, noAutomaticExecution: true, executionProtocolActivationDeferred: true, noP65ResultConsumption: true, noFrozenEndpointResultConsumption: true, noBackendSelection: true, noRendererCreation: true, noRenderExecution: true, noUIIntegration: true, noRuntimeIntegration: true, noStorageWrite: true });
  const authorizedResult = Object.freeze({ status: "AUTHORIZED", source: "star_beast_renderer_execution_protocol_authorization_resolver", input: Object.freeze({}), commandResult: Object.freeze({}), authorization });
  const input = Object.freeze({ authorizationResult: authorizedResult });
  const snapshot = JSON.stringify(input);
  const available = consumeStarBeastRendererExecutionProtocolAuthorization(input);

  assertEqual("AUTHORIZED result is consumable", available.status, "AVAILABLE");
  assertEqual("consumption targets future endpoint only", available.consumption.consumptionStatus, "AVAILABLE_FOR_FUTURE_RENDERER_EXECUTION_PROTOCOL_ENDPOINT");
  assertEqual("consumption preserves authorization", available.consumption.authorizationReference === authorization, true);
  assertEqual("consumption preserves source result", available.consumption.sourceAuthorizationResult === authorizedResult, true);
  assertEqual("consumption preserves command", available.consumption.sourceCommandReference === sourceCommandReference, true);
  assertEqual("consumption preserves authority", available.consumption.authorityReference === authorityReference, true);
  assertEqual("consumption preserves readiness", available.consumption.readinessReference === readinessReference, true);
  assertEqual("consumption preserves P65 governance", available.consumption.executionUnfreezeEndpointGovernanceReference === executionUnfreezeEndpointGovernanceReference, true);
  assertEqual("consumption preserves backend authority", available.consumption.backendSelectionAuthorityReference === backendSelectionAuthorityReference, true);
  assertEqual("consumption preserves execution slice", available.consumption.executionSliceReference === executionSliceReference, true);
  assertEqual("consumption preserves failure stop", available.consumption.failureStopReference === failureStopReference, true);
  assertEqual("consumption preserves rollback", available.consumption.rollbackReference === rollbackReference, true);
  assertEqual("consumption preserves acceptance", available.consumption.acceptanceReference === acceptanceReference, true);
  assertEqual("consumption does not consume P65 result", available.consumption.noP65ResultConsumption, true);
  assertEqual("consumption selects no backend", available.consumption.noBackendSelection, true);
  assertEqual("consumption creates no renderer", available.consumption.noRendererCreation, true);
  assertEqual("consumption executes no render", available.consumption.noRenderExecution, true);
  assertEqual("consumption remains frozen", Object.isFrozen(available.consumption), true);
  assertEqual("result remains frozen", Object.isFrozen(available), true);
  assertEqual("input unchanged", JSON.stringify(input), snapshot);

  const notReady = consumeStarBeastRendererExecutionProtocolAuthorization(Object.freeze({ authorizationResult: Object.freeze({ status: "NOT_READY", reason: "EXPLICIT_EXECUTION_PROTOCOL_AUTHORIZATION_COMMAND_INVALID" }) }));
  assertEqual("P69 NOT_READY remains not ready", notReady.status, "NOT_READY");
  assertEqual("P69 NOT_READY reason preserved", notReady.sourceAuthorizationReason, "EXPLICIT_EXECUTION_PROTOCOL_AUTHORIZATION_COMMAND_INVALID");
  const unavailable = consumeStarBeastRendererExecutionProtocolAuthorization(Object.freeze({ authorizationResult: Object.freeze({ status: "UNAVAILABLE", reason: "EXPLICIT_EXECUTION_PROTOCOL_AUTHORIZATION_COMMAND_UNAVAILABLE" }) }));
  assertEqual("P69 UNAVAILABLE remains unavailable", unavailable.status, "UNAVAILABLE");
  assertEqual("P69 UNAVAILABLE reason preserved", unavailable.sourceAuthorizationReason, "EXPLICIT_EXECUTION_PROTOCOL_AUTHORIZATION_COMMAND_UNAVAILABLE");
  const missing = consumeStarBeastRendererExecutionProtocolAuthorization(Object.freeze({ authorizationResult: null }));
  assertEqual("missing P69 result remains unavailable", missing.reason, "EXECUTION_PROTOCOL_AUTHORIZATION_RESULT_REQUIRED");
}

try { fs.rmSync(tempModulePath, { force: true }); } catch { /* best-effort cleanup */ }
if (failures.length > 0) {
  console.error("\nStar Beast renderer execution protocol authorization consumption gate failed:");
  failures.forEach((failure) => console.error(`- ${failure}`));
  process.exit(1);
}
console.log("\nStar Beast renderer execution protocol authorization consumption gate passed.");
