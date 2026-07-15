import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import process from "node:process";
import { build } from "esbuild";

const rootDir = process.cwd();
const typePath = path.join(rootDir, "src/types/starBeastRendererExecutionUnfreezeDeclarationEndpoint.ts");
const servicePath = path.join(rootDir, "src/services/starBeastRendererExecutionUnfreezeDeclarationEndpoint.ts");
const protocolPath = path.join(rootDir, "docs/GUANYAO_STAR_BEAST_RENDERER_EXECUTION_UNFREEZE_DECLARATION_ENDPOINT_PROTOCOL.md");
const consumptionProtocolPath = path.join(rootDir, "docs/GUANYAO_STAR_BEAST_RENDERER_EXECUTION_UNFREEZE_DECLARATION_CONSUMPTION_PROTOCOL.md");
const typeIndexPath = path.join(rootDir, "src/types/index.ts");
const packagePath = path.join(rootDir, "package.json");
const tempModulePath = path.join(os.tmpdir(), `guanyao-renderer-execution-unfreeze-endpoint-${process.pid}.mjs`);
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
  ["P65 type", typePath],
  ["P65 service", servicePath],
  ["P65 protocol", protocolPath],
  ["P64 protocol", consumptionProtocolPath],
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
    "StarBeastRendererExecutionUnfreezeDeclarationEndpointInput",
    "consumptionResult: StarBeastRendererExecutionUnfreezeDeclarationConsumptionResult | null",
    'semanticRole: "STAR_BEAST_RENDERER_EXECUTION_UNFREEZE_DECLARATION_ENDPOINT"',
    "sourceConsumptionResult: StarBeastRendererExecutionUnfreezeDeclarationConsumptionAvailable",
    "declarationConsumptionReference:",
    "declarationReference:",
    "sourceCommandReference:",
    "authorityReference:",
    "readinessReference:",
    "unfreezeDeclarationEndpointGovernanceReference:",
    "authorizationEndpointGovernanceReference:",
    "executionScopeReference:",
    "runtimeBoundaryReference:",
    "rollbackStrategyReference:",
    "acceptanceScopeReference:",
    'endpointStatus: "AVAILABLE_FOR_RENDERER_EXECUTION_UNFREEZE_GOVERNANCE_HANDOFF"',
    "declarationHandoffOnly: true",
    "executionUnfreezeDeferred: true",
    "noExecutionUnfreezeIssued: true",
    "noP53ResultConsumption: true",
    "noP59ResultConsumption: true",
    "noFrozenEndpointResultConsumption: true",
    "noFinalBackendSelection: true",
    "noRendererCreation: true",
    "noRenderExecution: true",
    'reason: "EXECUTION_UNFREEZE_DECLARATION_CONSUMPTION_NOT_READY"',
    '"EXECUTION_UNFREEZE_DECLARATION_CONSUMPTION_RESULT_REQUIRED"',
    '"EXECUTION_UNFREEZE_DECLARATION_CONSUMPTION_UNAVAILABLE"',
  ].forEach((marker) => assertIncludes("P65 type contract", typeSource, marker));

  [
    "resolveStarBeastRendererExecutionUnfreezeDeclarationEndpoint",
    "const sourceConsumptionResult = input.consumptionResult",
    "sourceConsumptionResult === null",
    'sourceConsumptionResult.status === "UNAVAILABLE"',
    'sourceConsumptionResult.status === "NOT_READY"',
    "const declarationConsumptionReference = sourceConsumptionResult.consumption",
    '"STAR_BEAST_RENDERER_EXECUTION_UNFREEZE_DECLARATION_ENDPOINT"',
    "sourceConsumptionResult,",
    "declarationReference:",
    "declarationConsumptionReference.unfreezeDeclarationEndpointGovernanceReference",
    "declarationConsumptionReference.authorizationEndpointGovernanceReference",
    '"AVAILABLE_FOR_RENDERER_EXECUTION_UNFREEZE_GOVERNANCE_HANDOFF"',
    "declarationHandoffOnly: true",
    "executionUnfreezeDeferred: true",
    "noExecutionUnfreezeIssued: true",
    "noP53ResultConsumption: true",
    "noP59ResultConsumption: true",
    'status: "AVAILABLE"',
  ].forEach((marker) => assertIncludes("P65 service contract", serviceSource, marker));

  [
    "consumeStarBeastRendererExecutionUnfreezeDeclaration(",
    "resolveStarBeastRendererExecutionUnfreezeDeclaration(",
    "StarBeastRendererImplementationAuthorizationEndpointResult",
    "StarBeastRendererImplementationUnfreezeDeclarationEndpointResult",
    "resolveStarBeastRendererImplementationAuthorizationEndpoint(",
    "resolveStarBeastRendererImplementationUnfreezeDeclarationEndpoint(",
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
  ].forEach((marker) => assertExcludes("P65 remains governance endpoint only", serviceSource, marker));

  [
    "StarBeastRendererExecutionUnfreezeDeclarationEndpoint",
    "StarBeastRendererExecutionUnfreezeDeclarationEndpointInput",
    "StarBeastRendererExecutionUnfreezeDeclarationEndpointResult",
    'from "./starBeastRendererExecutionUnfreezeDeclarationEndpoint"',
  ].forEach((marker) => assertIncludes("type index exports P65", typeIndexSource, marker));

  const sourcePaths = collectTypeScriptSourcePaths(path.join(rootDir, "src"));
  const callSites = (symbol) => sourcePaths
    .filter((filePath) => fs.readFileSync(filePath, "utf8").includes(symbol))
    .map((filePath) => path.relative(rootDir, filePath))
    .sort()
    .join(",");
  assertEqual(
    "P64 service remains owner-only",
    callSites("consumeStarBeastRendererExecutionUnfreezeDeclaration("),
    "src/services/starBeastRendererExecutionUnfreezeDeclarationConsumptionService.ts",
  );
  assertEqual(
    "P65 endpoint has no downstream consumer",
    callSites("resolveStarBeastRendererExecutionUnfreezeDeclarationEndpoint("),
    "src/services/starBeastRendererExecutionUnfreezeDeclarationEndpoint.ts",
  );

  [
    "RC-STAR-BEAST-RENDERER-EXECUTION-UNFREEZE-DECLARATION-ENDPOINT-P65",
    "EXECUTION UNFREEZE DECLARATION ENDPOINT",
    "Endpoint 只允许未来独立治理步骤读取已确认的执行解冻声明交接",
    "P65 只消费调用方提供的 P64 Result",
    "AVAILABLE_FOR_RENDERER_EXECUTION_UNFREEZE_GOVERNANCE_HANDOFF",
    "P64 Consumption Result → only P65 Execution Unfreeze Declaration Endpoint",
    "P65 Endpoint Result → no downstream consumer",
    "P65 不消费 P53/P59 Endpoint Result",
    "P65 AVAILABLE 不是 Runtime 可执行许可",
    "P66 Execution Unfreeze Declaration Chain Freeze",
    "P65 Result 是当前执行解冻声明治理链的冻结终止出口",
    "独立 Renderer Execution Protocol 建立前不得新增下游消费者",
  ].forEach((marker) => assertIncludes("P65 protocol", protocolSource, marker));
  [
    "P64 Consumption Result → only P65 Execution Unfreeze Declaration Endpoint",
    "P64 Consumption Service → no direct external caller",
    "P65 只消费调用方提供的 P64 Result",
  ].forEach((marker) => assertIncludes("P64 permits only P65", consumptionProtocolSource, marker));

  assertIncludes(
    "P65 gate registered",
    packageJson.scripts?.["check:star-beast-renderer-execution-unfreeze-declaration-endpoint"] ?? "",
    "node scripts/check-star-beast-renderer-execution-unfreeze-declaration-endpoint.mjs",
  );
  assertIncludes(
    "P65 gate in release",
    packageJson.scripts?.["check:release"] ?? "",
    "npm run check:star-beast-renderer-execution-unfreeze-declaration-endpoint",
  );

  await build({ entryPoints: [servicePath], outfile: tempModulePath, bundle: true, platform: "node", format: "esm", target: "node20", logLevel: "silent" });
  const { resolveStarBeastRendererExecutionUnfreezeDeclarationEndpoint } = await import(`file://${tempModulePath}?t=${Date.now()}`);

  const declarationReference = Object.freeze({ id: "p63" });
  const sourceCommandReference = Object.freeze({ id: "p62" });
  const authorityReference = Object.freeze({ id: "authority" });
  const readinessReference = Object.freeze({ id: "p61" });
  const unfreezeDeclarationEndpointGovernanceReference = Object.freeze({ id: "p59" });
  const authorizationEndpointGovernanceReference = Object.freeze({ id: "p53" });
  const executionScopeReference = Object.freeze({ id: "execution" });
  const runtimeBoundaryReference = Object.freeze({ id: "runtime" });
  const rollbackStrategyReference = Object.freeze({ id: "rollback" });
  const acceptanceScopeReference = Object.freeze({ id: "acceptance" });
  const consumption = Object.freeze({ declarationReference, sourceCommandReference, authorityReference, readinessReference, unfreezeDeclarationEndpointGovernanceReference, authorizationEndpointGovernanceReference, executionScopeReference, runtimeBoundaryReference, rollbackStrategyReference, acceptanceScopeReference });
  const consumptionResult = Object.freeze({ status: "AVAILABLE", consumption });
  const input = Object.freeze({ consumptionResult });
  const snapshot = JSON.stringify(input);
  const available = resolveStarBeastRendererExecutionUnfreezeDeclarationEndpoint(input);

  assertEqual("AVAILABLE consumption creates endpoint", available.status, "AVAILABLE");
  assertEqual("consumption ref preserved", available.endpoint.declarationConsumptionReference === consumption, true);
  assertEqual("source result preserved", available.endpoint.sourceConsumptionResult === consumptionResult, true);
  assertEqual("declaration ref preserved", available.endpoint.declarationReference === declarationReference, true);
  assertEqual("command ref preserved", available.endpoint.sourceCommandReference === sourceCommandReference, true);
  assertEqual("P59 governance preserved", available.endpoint.unfreezeDeclarationEndpointGovernanceReference === unfreezeDeclarationEndpointGovernanceReference, true);
  assertEqual("P53 governance preserved", available.endpoint.authorizationEndpointGovernanceReference === authorizationEndpointGovernanceReference, true);
  assertEqual("scope preserved", available.endpoint.executionScopeReference === executionScopeReference, true);
  assertEqual("boundary preserved", available.endpoint.runtimeBoundaryReference === runtimeBoundaryReference, true);
  assertEqual("rollback preserved", available.endpoint.rollbackStrategyReference === rollbackStrategyReference, true);
  assertEqual("acceptance preserved", available.endpoint.acceptanceScopeReference === acceptanceScopeReference, true);
  assertEqual("endpoint defers execution unfreeze", available.endpoint.executionUnfreezeDeferred, true);
  assertEqual("endpoint issues no execution unfreeze", available.endpoint.noExecutionUnfreezeIssued, true);
  assertEqual("endpoint consumes no P53 result", available.endpoint.noP53ResultConsumption, true);
  assertEqual("endpoint consumes no P59 result", available.endpoint.noP59ResultConsumption, true);
  assertEqual("endpoint selects no backend", available.endpoint.noFinalBackendSelection, true);
  assertEqual("endpoint creates no renderer", available.endpoint.noRendererCreation, true);
  assertEqual("endpoint executes no render", available.endpoint.noRenderExecution, true);
  assertEqual("endpoint frozen", Object.isFrozen(available.endpoint), true);
  assertEqual("result frozen", Object.isFrozen(available), true);
  assertEqual("input unchanged", JSON.stringify(input), snapshot);

  const notReady = resolveStarBeastRendererExecutionUnfreezeDeclarationEndpoint(Object.freeze({ consumptionResult: Object.freeze({ status: "NOT_READY", reason: "EXECUTION_UNFREEZE_DECLARATION_NOT_READY" }) }));
  assertEqual("NOT_READY preserved", notReady.reason, "EXECUTION_UNFREEZE_DECLARATION_CONSUMPTION_NOT_READY");
  assertEqual("source reason preserved", notReady.sourceConsumptionReason, "EXECUTION_UNFREEZE_DECLARATION_NOT_READY");
  const unavailable = resolveStarBeastRendererExecutionUnfreezeDeclarationEndpoint(Object.freeze({ consumptionResult: Object.freeze({ status: "UNAVAILABLE", reason: "EXECUTION_UNFREEZE_DECLARATION_UNAVAILABLE" }) }));
  assertEqual("UNAVAILABLE preserved", unavailable.reason, "EXECUTION_UNFREEZE_DECLARATION_CONSUMPTION_UNAVAILABLE");
  const missing = resolveStarBeastRendererExecutionUnfreezeDeclarationEndpoint(Object.freeze({ consumptionResult: null }));
  assertEqual("missing result unavailable", missing.reason, "EXECUTION_UNFREEZE_DECLARATION_CONSUMPTION_RESULT_REQUIRED");
}

try { fs.rmSync(tempModulePath, { force: true }); } catch { /* best-effort cleanup */ }
if (failures.length > 0) {
  console.error("\nStar Beast renderer execution unfreeze declaration endpoint gate failed:");
  failures.forEach((failure) => console.error(`- ${failure}`));
  process.exit(1);
}
console.log("\nStar Beast renderer execution unfreeze declaration endpoint gate passed.");
