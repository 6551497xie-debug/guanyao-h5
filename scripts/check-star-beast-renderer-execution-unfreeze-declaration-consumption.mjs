import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import process from "node:process";
import { build } from "esbuild";

const rootDir = process.cwd();
const typePath = path.join(rootDir, "src/types/starBeastRendererExecutionUnfreezeDeclarationConsumption.ts");
const servicePath = path.join(rootDir, "src/services/starBeastRendererExecutionUnfreezeDeclarationConsumptionService.ts");
const protocolPath = path.join(rootDir, "docs/GUANYAO_STAR_BEAST_RENDERER_EXECUTION_UNFREEZE_DECLARATION_CONSUMPTION_PROTOCOL.md");
const declarationProtocolPath = path.join(rootDir, "docs/GUANYAO_STAR_BEAST_RENDERER_EXECUTION_UNFREEZE_DECLARATION_PROTOCOL.md");
const typeIndexPath = path.join(rootDir, "src/types/index.ts");
const packagePath = path.join(rootDir, "package.json");
const tempModulePath = path.join(os.tmpdir(), `guanyao-renderer-execution-unfreeze-consumption-${process.pid}.mjs`);
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
  ["P64 type", typePath],
  ["P64 service", servicePath],
  ["P64 protocol", protocolPath],
  ["P63 protocol", declarationProtocolPath],
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
  const declarationProtocolSource = fs.readFileSync(declarationProtocolPath, "utf8");
  const typeIndexSource = fs.readFileSync(typeIndexPath, "utf8");
  const packageJson = JSON.parse(fs.readFileSync(packagePath, "utf8"));

  [
    "StarBeastRendererExecutionUnfreezeDeclarationConsumptionInput",
    "declarationResult: StarBeastRendererExecutionUnfreezeDeclarationResult | null",
    'semanticRole: "STAR_BEAST_RENDERER_EXECUTION_UNFREEZE_DECLARATION_CONSUMPTION"',
    "declarationReference: StarBeastRendererExecutionUnfreezeDeclaration",
    "sourceDeclarationResult: StarBeastRendererExecutionUnfreezeDeclarationDeclared",
    "sourceCommandReference:",
    "authorityReference:",
    "readinessReference:",
    "unfreezeDeclarationEndpointGovernanceReference:",
    "authorizationEndpointGovernanceReference:",
    "executionScopeReference:",
    "runtimeBoundaryReference:",
    "rollbackStrategyReference:",
    "acceptanceScopeReference:",
    'consumptionStatus: "AVAILABLE_FOR_FUTURE_RENDERER_EXECUTION_UNFREEZE_ENDPOINT"',
    "declarationConsumedOnly: true",
    "executionUnfreezeDeferred: true",
    "noExecutionUnfreezeIssued: true",
    "noP53ResultConsumption: true",
    "noP59ResultConsumption: true",
    "noFrozenEndpointResultConsumption: true",
    "noFinalBackendSelection: true",
    "noRendererCreation: true",
    "noRenderExecution: true",
    'reason: "EXECUTION_UNFREEZE_DECLARATION_NOT_READY"',
    '"EXECUTION_UNFREEZE_DECLARATION_RESULT_REQUIRED"',
    '"EXECUTION_UNFREEZE_DECLARATION_UNAVAILABLE"',
  ].forEach((marker) => assertIncludes("P64 type contract", typeSource, marker));

  [
    "consumeStarBeastRendererExecutionUnfreezeDeclaration",
    "const sourceDeclarationResult = input.declarationResult",
    "sourceDeclarationResult === null",
    'sourceDeclarationResult.status === "UNAVAILABLE"',
    'sourceDeclarationResult.status === "NOT_READY"',
    "const declarationReference = sourceDeclarationResult.declaration",
    '"STAR_BEAST_RENDERER_EXECUTION_UNFREEZE_DECLARATION_CONSUMPTION"',
    "sourceDeclarationResult,",
    "sourceCommandReference: declarationReference.sourceCommandReference",
    "declarationReference.unfreezeDeclarationEndpointGovernanceReference",
    "declarationReference.authorizationEndpointGovernanceReference",
    '"AVAILABLE_FOR_FUTURE_RENDERER_EXECUTION_UNFREEZE_ENDPOINT"',
    "declarationConsumedOnly: true",
    "executionUnfreezeDeferred: true",
    "noExecutionUnfreezeIssued: true",
    "noP53ResultConsumption: true",
    "noP59ResultConsumption: true",
    'status: "AVAILABLE"',
  ].forEach((marker) => assertIncludes("P64 service contract", serviceSource, marker));

  [
    "resolveStarBeastRendererExecutionUnfreezeDeclaration(",
    "StarBeastRendererImplementationAuthorizationEndpointResult",
    "StarBeastRendererImplementationUnfreezeDeclarationEndpointResult",
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
  ].forEach((marker) => assertExcludes("P64 remains consumption-only", serviceSource, marker));

  [
    "StarBeastRendererExecutionUnfreezeDeclarationConsumption",
    "StarBeastRendererExecutionUnfreezeDeclarationConsumptionInput",
    "StarBeastRendererExecutionUnfreezeDeclarationConsumptionResult",
    'from "./starBeastRendererExecutionUnfreezeDeclarationConsumption"',
  ].forEach((marker) => assertIncludes("type index exports P64", typeIndexSource, marker));

  const sourcePaths = collectTypeScriptSourcePaths(path.join(rootDir, "src"));
  const callSites = (symbol) => sourcePaths
    .filter((filePath) => fs.readFileSync(filePath, "utf8").includes(symbol))
    .map((filePath) => path.relative(rootDir, filePath))
    .sort()
    .join(",");
  assertEqual(
    "P63 resolver remains owner-only",
    callSites("resolveStarBeastRendererExecutionUnfreezeDeclaration("),
    "src/services/starBeastRendererExecutionUnfreezeDeclarationResolver.ts",
  );
  assertEqual(
    "P64 service has no downstream consumer",
    callSites("consumeStarBeastRendererExecutionUnfreezeDeclaration("),
    "src/services/starBeastRendererExecutionUnfreezeDeclarationConsumptionService.ts",
  );

  [
    "RC-STAR-BEAST-RENDERER-EXECUTION-UNFREEZE-DECLARATION-CONSUMPTION-P64",
    "EXECUTION UNFREEZE DECLARATION CONSUMPTION",
    "Consumption 只证明正式声明已被治理层接收",
    "P64 只消费调用方提供的 P63 Result",
    "AVAILABLE_FOR_FUTURE_RENDERER_EXECUTION_UNFREEZE_ENDPOINT",
    "P63 Declaration Result → only P64 Declaration Consumption",
    "P64 Consumption Result → only P65 Execution Unfreeze Declaration Endpoint",
    "P64 Consumption Service → no direct external caller",
    "P65 只消费调用方提供的 P64 Result",
    "P64 不消费 P53/P59 Endpoint Result",
  ].forEach((marker) => assertIncludes("P64 protocol", protocolSource, marker));
  [
    "P63 Declaration Result → only P64 Declaration Consumption",
    "P63 Declaration Resolver → no direct external caller",
    "P64 只消费调用方提供的 P63 Result",
  ].forEach((marker) => assertIncludes("P63 permits only P64", declarationProtocolSource, marker));

  assertIncludes(
    "P64 gate registered",
    packageJson.scripts?.["check:star-beast-renderer-execution-unfreeze-declaration-consumption"] ?? "",
    "node scripts/check-star-beast-renderer-execution-unfreeze-declaration-consumption.mjs",
  );
  assertIncludes(
    "P64 gate in release",
    packageJson.scripts?.["check:release"] ?? "",
    "npm run check:star-beast-renderer-execution-unfreeze-declaration-consumption",
  );

  await build({ entryPoints: [servicePath], outfile: tempModulePath, bundle: true, platform: "node", format: "esm", target: "node20", logLevel: "silent" });
  const { consumeStarBeastRendererExecutionUnfreezeDeclaration } = await import(`file://${tempModulePath}?t=${Date.now()}`);

  const sourceCommandReference = Object.freeze({ id: "p62" });
  const authorityReference = Object.freeze({ id: "authority" });
  const readinessReference = Object.freeze({ id: "p61" });
  const unfreezeDeclarationEndpointGovernanceReference = Object.freeze({ id: "p59" });
  const authorizationEndpointGovernanceReference = Object.freeze({ id: "p53" });
  const executionScopeReference = Object.freeze({ id: "execution" });
  const runtimeBoundaryReference = Object.freeze({ id: "runtime" });
  const rollbackStrategyReference = Object.freeze({ id: "rollback" });
  const acceptanceScopeReference = Object.freeze({ id: "acceptance" });
  const declaration = Object.freeze({ sourceCommandReference, authorityReference, readinessReference, unfreezeDeclarationEndpointGovernanceReference, authorizationEndpointGovernanceReference, executionScopeReference, runtimeBoundaryReference, rollbackStrategyReference, acceptanceScopeReference });
  const declarationResult = Object.freeze({ status: "DECLARED", declaration });
  const input = Object.freeze({ declarationResult });
  const snapshot = JSON.stringify(input);
  const available = consumeStarBeastRendererExecutionUnfreezeDeclaration(input);

  assertEqual("DECLARED becomes AVAILABLE", available.status, "AVAILABLE");
  assertEqual("declaration ref preserved", available.consumption.declarationReference === declaration, true);
  assertEqual("source result preserved", available.consumption.sourceDeclarationResult === declarationResult, true);
  assertEqual("command ref preserved", available.consumption.sourceCommandReference === sourceCommandReference, true);
  assertEqual("readiness ref preserved", available.consumption.readinessReference === readinessReference, true);
  assertEqual("P59 governance preserved", available.consumption.unfreezeDeclarationEndpointGovernanceReference === unfreezeDeclarationEndpointGovernanceReference, true);
  assertEqual("P53 governance preserved", available.consumption.authorizationEndpointGovernanceReference === authorizationEndpointGovernanceReference, true);
  assertEqual("execution scope preserved", available.consumption.executionScopeReference === executionScopeReference, true);
  assertEqual("runtime boundary preserved", available.consumption.runtimeBoundaryReference === runtimeBoundaryReference, true);
  assertEqual("rollback preserved", available.consumption.rollbackStrategyReference === rollbackStrategyReference, true);
  assertEqual("acceptance preserved", available.consumption.acceptanceScopeReference === acceptanceScopeReference, true);
  assertEqual("execution unfreeze deferred", available.consumption.executionUnfreezeDeferred, true);
  assertEqual("no execution unfreeze issued", available.consumption.noExecutionUnfreezeIssued, true);
  assertEqual("no P53 result consumed", available.consumption.noP53ResultConsumption, true);
  assertEqual("no P59 result consumed", available.consumption.noP59ResultConsumption, true);
  assertEqual("no backend selected", available.consumption.noFinalBackendSelection, true);
  assertEqual("no renderer created", available.consumption.noRendererCreation, true);
  assertEqual("no render executed", available.consumption.noRenderExecution, true);
  assertEqual("consumption frozen", Object.isFrozen(available.consumption), true);
  assertEqual("result frozen", Object.isFrozen(available), true);
  assertEqual("input unchanged", JSON.stringify(input), snapshot);

  const notReady = consumeStarBeastRendererExecutionUnfreezeDeclaration(Object.freeze({ declarationResult: Object.freeze({ status: "NOT_READY", reason: "EXPLICIT_EXECUTION_UNFREEZE_DECLARATION_COMMAND_INVALID" }) }));
  assertEqual("NOT_READY preserved", notReady.reason, "EXECUTION_UNFREEZE_DECLARATION_NOT_READY");
  assertEqual("source reason preserved", notReady.sourceDeclarationReason, "EXPLICIT_EXECUTION_UNFREEZE_DECLARATION_COMMAND_INVALID");
  const unavailable = consumeStarBeastRendererExecutionUnfreezeDeclaration(Object.freeze({ declarationResult: Object.freeze({ status: "UNAVAILABLE", reason: "EXPLICIT_EXECUTION_UNFREEZE_DECLARATION_COMMAND_UNAVAILABLE" }) }));
  assertEqual("UNAVAILABLE preserved", unavailable.reason, "EXECUTION_UNFREEZE_DECLARATION_UNAVAILABLE");
  const missing = consumeStarBeastRendererExecutionUnfreezeDeclaration(Object.freeze({ declarationResult: null }));
  assertEqual("missing result unavailable", missing.reason, "EXECUTION_UNFREEZE_DECLARATION_RESULT_REQUIRED");
}

try { fs.rmSync(tempModulePath, { force: true }); } catch { /* best-effort cleanup */ }
if (failures.length > 0) {
  console.error("\nStar Beast renderer execution unfreeze declaration consumption gate failed:");
  failures.forEach((failure) => console.error(`- ${failure}`));
  process.exit(1);
}
console.log("\nStar Beast renderer execution unfreeze declaration consumption gate passed.");
