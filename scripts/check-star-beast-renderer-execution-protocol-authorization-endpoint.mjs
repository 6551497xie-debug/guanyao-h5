import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import process from "node:process";
import { build } from "esbuild";

const rootDir = process.cwd();
const typePath = path.join(rootDir, "src/types/starBeastRendererExecutionProtocolAuthorizationEndpoint.ts");
const servicePath = path.join(rootDir, "src/services/starBeastRendererExecutionProtocolAuthorizationEndpoint.ts");
const consumptionServicePath = path.join(rootDir, "src/services/starBeastRendererExecutionProtocolAuthorizationConsumptionService.ts");
const protocolPath = path.join(rootDir, "docs/GUANYAO_STAR_BEAST_RENDERER_EXECUTION_PROTOCOL_AUTHORIZATION_ENDPOINT_PROTOCOL.md");
const consumptionProtocolPath = path.join(rootDir, "docs/GUANYAO_STAR_BEAST_RENDERER_EXECUTION_PROTOCOL_AUTHORIZATION_CONSUMPTION_PROTOCOL.md");
const typeIndexPath = path.join(rootDir, "src/types/index.ts");
const packagePath = path.join(rootDir, "package.json");
const tempModulePath = path.join(os.tmpdir(), `guanyao-renderer-execution-protocol-authorization-endpoint-${process.pid}.mjs`);
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
  ["P71 type", typePath],
  ["P71 endpoint", servicePath],
  ["P70 service", consumptionServicePath],
  ["P71 protocol", protocolPath],
  ["P70 protocol", consumptionProtocolPath],
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
  const consumptionProtocolSource = fs.readFileSync(consumptionProtocolPath, "utf8");
  const typeIndexSource = fs.readFileSync(typeIndexPath, "utf8");
  const packageJson = JSON.parse(fs.readFileSync(packagePath, "utf8"));

  [
    "StarBeastRendererExecutionProtocolAuthorizationEndpointInput",
    "consumptionResult: StarBeastRendererExecutionProtocolAuthorizationConsumptionResult | null",
    "StarBeastRendererExecutionProtocolAuthorizationEndpoint",
    'semanticRole: "STAR_BEAST_RENDERER_EXECUTION_PROTOCOL_AUTHORIZATION_ENDPOINT"',
    "sourceConsumptionResult:",
    "authorizationConsumptionReference:",
    "authorizationReference:",
    "sourceCommandReference:",
    "authorityReference:",
    "readinessReference:",
    "executionUnfreezeEndpointGovernanceReference:",
    "backendSelectionAuthorityReference:",
    "executionSliceReference:",
    "failureStopReference:",
    "rollbackReference:",
    "acceptanceReference:",
    'endpointStatus: "AVAILABLE_FOR_RENDERER_EXECUTION_PROTOCOL_GOVERNANCE_HANDOFF"',
    "authorizationHandoffOnly: true",
    "executionProtocolActivationDeferred: true",
    "noAutomaticExecution: true",
    "noP65ResultConsumption: true",
    "noFrozenEndpointResultConsumption: true",
    "noBackendSelection: true",
    "noRendererCreation: true",
    "noRenderExecution: true",
    "noUIIntegration: true",
    "noRuntimeIntegration: true",
    "noStorageWrite: true",
    '"EXECUTION_PROTOCOL_AUTHORIZATION_CONSUMPTION_NOT_READY"',
    '"EXECUTION_PROTOCOL_AUTHORIZATION_CONSUMPTION_RESULT_REQUIRED"',
    '"EXECUTION_PROTOCOL_AUTHORIZATION_CONSUMPTION_UNAVAILABLE"',
  ].forEach((marker) => assertIncludes("P71 type contract", typeSource, marker));

  [
    "resolveStarBeastRendererExecutionProtocolAuthorizationEndpoint",
    "const sourceConsumptionResult = input.consumptionResult",
    "sourceConsumptionResult === null",
    'sourceConsumptionResult.status === "UNAVAILABLE"',
    'sourceConsumptionResult.status === "NOT_READY"',
    "const authorizationConsumptionReference =",
    "sourceConsumptionResult.consumption",
    '"STAR_BEAST_RENDERER_EXECUTION_PROTOCOL_AUTHORIZATION_ENDPOINT"',
    "sourceConsumptionResult,",
    "authorizationConsumptionReference,",
    "authorizationConsumptionReference.authorizationReference",
    "authorizationConsumptionReference.sourceCommandReference",
    "authorizationConsumptionReference.authorityReference",
    "authorizationConsumptionReference.readinessReference",
    "authorizationConsumptionReference.executionUnfreezeEndpointGovernanceReference",
    "authorizationConsumptionReference.backendSelectionAuthorityReference",
    "authorizationConsumptionReference.executionSliceReference",
    "authorizationConsumptionReference.failureStopReference",
    "authorizationConsumptionReference.rollbackReference",
    "authorizationConsumptionReference.acceptanceReference",
    '"AVAILABLE_FOR_RENDERER_EXECUTION_PROTOCOL_GOVERNANCE_HANDOFF"',
    "authorizationHandoffOnly: true",
    "executionProtocolActivationDeferred: true",
    'status: "AVAILABLE"',
  ].forEach((marker) => assertIncludes("P71 service contract", serviceSource, marker));

  [
    "consumeStarBeastRendererExecutionProtocolAuthorization(",
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
  ].forEach((marker) => assertExcludes("P71 remains endpoint-only", serviceSource, marker));

  [
    "StarBeastRendererExecutionProtocolAuthorizationEndpoint",
    "StarBeastRendererExecutionProtocolAuthorizationEndpointInput",
    "StarBeastRendererExecutionProtocolAuthorizationEndpointResult",
    'from "./starBeastRendererExecutionProtocolAuthorizationEndpoint"',
  ].forEach((marker) => assertIncludes("type index exports P71", typeIndexSource, marker));

  const sourcePaths = collectTypeScriptSourcePaths(path.join(rootDir, "src"));
  const callSites = (symbol) => sourcePaths
    .filter((filePath) => fs.readFileSync(filePath, "utf8").includes(symbol))
    .map((filePath) => path.relative(rootDir, filePath))
    .sort()
    .join(",");
  assertEqual(
    "P70 service remains owner-only",
    callSites("consumeStarBeastRendererExecutionProtocolAuthorization("),
    "src/services/starBeastRendererExecutionProtocolAuthorizationConsumptionService.ts",
  );
  assertEqual(
    "P71 endpoint has no downstream consumer",
    callSites("resolveStarBeastRendererExecutionProtocolAuthorizationEndpoint("),
    "src/services/starBeastRendererExecutionProtocolAuthorizationEndpoint.ts",
  );

  [
    "RC-STAR-BEAST-RENDERER-EXECUTION-PROTOCOL-AUTHORIZATION-ENDPOINT-P71",
    "EXECUTION PROTOCOL AUTHORIZATION GOVERNANCE ENDPOINT ONLY",
    "P70 AVAILABLE Authorization Consumption",
    "AVAILABLE_FOR_RENDERER_EXECUTION_PROTOCOL_GOVERNANCE_HANDOFF",
    "Endpoint 是授权治理交接边界，不是 Execution Protocol Activation，不是 Backend Selection，也不是 Renderer Execution",
    "P70 Consumption Result → only P71 Execution Protocol Authorization Endpoint",
    "P71 Authorization Endpoint → no downstream consumer before P72 chain freeze",
    "P71 只读取调用方提供的 P70 Result",
    "P71 不解除 P54/P60/P66 三重冻结",
    "不激活协议、不选择 Backend、不创建 Renderer、不执行 Render",
  ].forEach((marker) => assertIncludes("P71 protocol", protocolSource, marker));
  [
    "P70 Consumption Result → only P71 Execution Protocol Authorization Endpoint",
    "P70 Consumption Service → no direct external caller",
    "P71 Authorization Endpoint → no downstream consumer before P72 chain freeze",
    "P71 Endpoint Result → governance terminal pending P72 freeze",
    "P71 只消费调用方提供的 P70 Result",
  ].forEach((marker) => assertIncludes("P70 permits only P71", consumptionProtocolSource, marker));

  assertIncludes(
    "P71 gate registered",
    packageJson.scripts?.["check:star-beast-renderer-execution-protocol-authorization-endpoint"] ?? "",
    "node scripts/check-star-beast-renderer-execution-protocol-authorization-endpoint.mjs",
  );
  assertIncludes(
    "P71 gate in release",
    packageJson.scripts?.["check:release"] ?? "",
    "npm run check:star-beast-renderer-execution-protocol-authorization-endpoint",
  );

  await build({ entryPoints: [servicePath], outfile: tempModulePath, bundle: true, platform: "node", format: "esm", target: "node20", logLevel: "silent" });
  const { resolveStarBeastRendererExecutionProtocolAuthorizationEndpoint } = await import(`file://${tempModulePath}?t=${Date.now()}`);

  const executionUnfreezeEndpointGovernanceReference = Object.freeze({ referenceType: "STAR_BEAST_RENDERER_EXECUTION_UNFREEZE_ENDPOINT_GOVERNANCE", referenceId: "p65:governance" });
  const backendSelectionAuthorityReference = Object.freeze({ referenceType: "STAR_BEAST_RENDERER_BACKEND_SELECTION_AUTHORITY", referenceId: "authority:backend-selection" });
  const executionSliceReference = Object.freeze({ referenceType: "STAR_BEAST_RENDERER_EXECUTION_SLICE", referenceId: "slice:first-reversible" });
  const failureStopReference = Object.freeze({ referenceType: "STAR_BEAST_RENDERER_EXECUTION_FAILURE_STOP", referenceId: "stop:first-failure" });
  const rollbackReference = Object.freeze({ referenceType: "STAR_BEAST_RENDERER_EXECUTION_PROTOCOL_ROLLBACK", referenceId: "rollback:disable-slice" });
  const acceptanceReference = Object.freeze({ referenceType: "STAR_BEAST_RENDERER_EXECUTION_PROTOCOL_ACCEPTANCE", referenceId: "acceptance:first-slice" });
  const readinessReference = Object.freeze({ readiness: "READY_FOR_EXPLICIT_RENDERER_EXECUTION_PROTOCOL_AUTHORIZATION" });
  const authorityReference = Object.freeze({ referenceType: "STAR_BEAST_RENDERER_EXECUTION_PROTOCOL_AUTHORITY", referenceId: "authority:product-owner" });
  const sourceCommandReference = Object.freeze({ semanticRole: "STAR_BEAST_RENDERER_EXPLICIT_EXECUTION_PROTOCOL_AUTHORIZATION_COMMAND" });
  const authorizationReference = Object.freeze({ semanticRole: "STAR_BEAST_RENDERER_EXECUTION_PROTOCOL_AUTHORIZATION", sourceCommandReference, authorityReference, readinessReference, executionUnfreezeEndpointGovernanceReference, backendSelectionAuthorityReference, executionSliceReference, failureStopReference, rollbackReference, acceptanceReference });
  const authorizationConsumptionReference = Object.freeze({ semanticRole: "STAR_BEAST_RENDERER_EXECUTION_PROTOCOL_AUTHORIZATION_CONSUMPTION", authorizationReference, sourceAuthorizationResult: Object.freeze({}), sourceCommandReference, authorityReference, readinessReference, executionUnfreezeEndpointGovernanceReference, backendSelectionAuthorityReference, executionSliceReference, failureStopReference, rollbackReference, acceptanceReference, consumptionStatus: "AVAILABLE_FOR_FUTURE_RENDERER_EXECUTION_PROTOCOL_ENDPOINT", authorizationConsumedOnly: true, executionProtocolEndpointDeferred: true, noAutomaticExecution: true, noP65ResultConsumption: true, noFrozenEndpointResultConsumption: true, noBackendSelection: true, noRendererCreation: true, noRenderExecution: true, noUIIntegration: true, noRuntimeIntegration: true, noStorageWrite: true });
  const availableConsumptionResult = Object.freeze({ status: "AVAILABLE", source: "star_beast_renderer_execution_protocol_authorization_consumption", input: Object.freeze({}), consumption: authorizationConsumptionReference });
  const input = Object.freeze({ consumptionResult: availableConsumptionResult });
  const snapshot = JSON.stringify(input);
  const available = resolveStarBeastRendererExecutionProtocolAuthorizationEndpoint(input);

  assertEqual("AVAILABLE consumption reaches endpoint", available.status, "AVAILABLE");
  assertEqual("endpoint exposes governance handoff only", available.endpoint.endpointStatus, "AVAILABLE_FOR_RENDERER_EXECUTION_PROTOCOL_GOVERNANCE_HANDOFF");
  assertEqual("endpoint preserves consumption result", available.endpoint.sourceConsumptionResult === availableConsumptionResult, true);
  assertEqual("endpoint preserves consumption", available.endpoint.authorizationConsumptionReference === authorizationConsumptionReference, true);
  assertEqual("endpoint preserves authorization", available.endpoint.authorizationReference === authorizationReference, true);
  assertEqual("endpoint preserves command", available.endpoint.sourceCommandReference === sourceCommandReference, true);
  assertEqual("endpoint preserves authority", available.endpoint.authorityReference === authorityReference, true);
  assertEqual("endpoint preserves readiness", available.endpoint.readinessReference === readinessReference, true);
  assertEqual("endpoint preserves P65 governance", available.endpoint.executionUnfreezeEndpointGovernanceReference === executionUnfreezeEndpointGovernanceReference, true);
  assertEqual("endpoint preserves backend authority", available.endpoint.backendSelectionAuthorityReference === backendSelectionAuthorityReference, true);
  assertEqual("endpoint preserves execution slice", available.endpoint.executionSliceReference === executionSliceReference, true);
  assertEqual("endpoint preserves failure stop", available.endpoint.failureStopReference === failureStopReference, true);
  assertEqual("endpoint preserves rollback", available.endpoint.rollbackReference === rollbackReference, true);
  assertEqual("endpoint preserves acceptance", available.endpoint.acceptanceReference === acceptanceReference, true);
  assertEqual("endpoint does not consume P65 result", available.endpoint.noP65ResultConsumption, true);
  assertEqual("endpoint selects no backend", available.endpoint.noBackendSelection, true);
  assertEqual("endpoint creates no renderer", available.endpoint.noRendererCreation, true);
  assertEqual("endpoint executes no render", available.endpoint.noRenderExecution, true);
  assertEqual("endpoint remains frozen", Object.isFrozen(available.endpoint), true);
  assertEqual("result remains frozen", Object.isFrozen(available), true);
  assertEqual("input unchanged", JSON.stringify(input), snapshot);

  const notReady = resolveStarBeastRendererExecutionProtocolAuthorizationEndpoint(Object.freeze({ consumptionResult: Object.freeze({ status: "NOT_READY", reason: "EXECUTION_PROTOCOL_AUTHORIZATION_NOT_READY" }) }));
  assertEqual("P70 NOT_READY remains not ready", notReady.status, "NOT_READY");
  assertEqual("P70 NOT_READY reason preserved", notReady.sourceConsumptionReason, "EXECUTION_PROTOCOL_AUTHORIZATION_NOT_READY");
  const unavailable = resolveStarBeastRendererExecutionProtocolAuthorizationEndpoint(Object.freeze({ consumptionResult: Object.freeze({ status: "UNAVAILABLE", reason: "EXECUTION_PROTOCOL_AUTHORIZATION_UNAVAILABLE" }) }));
  assertEqual("P70 UNAVAILABLE remains unavailable", unavailable.status, "UNAVAILABLE");
  assertEqual("P70 UNAVAILABLE reason preserved", unavailable.sourceConsumptionReason, "EXECUTION_PROTOCOL_AUTHORIZATION_UNAVAILABLE");
  const missing = resolveStarBeastRendererExecutionProtocolAuthorizationEndpoint(Object.freeze({ consumptionResult: null }));
  assertEqual("missing P70 result remains unavailable", missing.reason, "EXECUTION_PROTOCOL_AUTHORIZATION_CONSUMPTION_RESULT_REQUIRED");
}

try { fs.rmSync(tempModulePath, { force: true }); } catch { /* best-effort cleanup */ }
if (failures.length > 0) {
  console.error("\nStar Beast renderer execution protocol authorization endpoint gate failed:");
  failures.forEach((failure) => console.error(`- ${failure}`));
  process.exit(1);
}
console.log("\nStar Beast renderer execution protocol authorization endpoint gate passed.");
