import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import process from "node:process";
import { build } from "esbuild";

const rootDir = process.cwd();
const typePath = path.join(rootDir, "src/types/starBeastRendererImplementationUnfreezeDeclarationEndpoint.ts");
const servicePath = path.join(rootDir, "src/services/starBeastRendererImplementationUnfreezeDeclarationEndpoint.ts");
const protocolPath = path.join(rootDir, "docs/GUANYAO_STAR_BEAST_RENDERER_IMPLEMENTATION_UNFREEZE_DECLARATION_ENDPOINT_PROTOCOL.md");
const consumptionProtocolPath = path.join(rootDir, "docs/GUANYAO_STAR_BEAST_RENDERER_IMPLEMENTATION_UNFREEZE_DECLARATION_CONSUMPTION_PROTOCOL.md");
const typeIndexPath = path.join(rootDir, "src/types/index.ts");
const packagePath = path.join(rootDir, "package.json");
const tempModulePath = path.join(os.tmpdir(), `guanyao-unfreeze-declaration-endpoint-${process.pid}.mjs`);
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
  ["P59 type", typePath],
  ["P59 service", servicePath],
  ["P59 protocol", protocolPath],
  ["P58 protocol", consumptionProtocolPath],
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
    "StarBeastRendererImplementationUnfreezeDeclarationEndpointInput",
    "consumptionResult: StarBeastRendererImplementationUnfreezeDeclarationConsumptionResult | null",
    'semanticRole: "STAR_BEAST_RENDERER_IMPLEMENTATION_UNFREEZE_DECLARATION_ENDPOINT"',
    "sourceConsumptionResult: StarBeastRendererImplementationUnfreezeDeclarationConsumptionAvailable",
    "declarationConsumptionReference:",
    "declarationReference:",
    "sourceCommandReference:",
    "authorityReference:",
    "readinessReference:",
    "authorizationEndpointGovernanceReference:",
    "implementationScenarioReference:",
    "backendCandidateReferences:",
    "fallbackStrategyReference:",
    "acceptanceScopeReference:",
    'endpointStatus: "AVAILABLE_FOR_IMPLEMENTATION_UNFREEZE_GOVERNANCE_HANDOFF"',
    "declarationHandoffOnly: true",
    "unfreezeExecutionDeferred: true",
    "noUnfreezeIssued: true",
    "noAuthorizationEndpointConsumption: true",
    "noFinalBackendSelection: true",
    "noRendererCreation: true",
    "noRenderExecution: true",
    'reason: "UNFREEZE_DECLARATION_CONSUMPTION_NOT_READY"',
    '"UNFREEZE_DECLARATION_CONSUMPTION_RESULT_REQUIRED"',
    '"UNFREEZE_DECLARATION_CONSUMPTION_UNAVAILABLE"',
  ].forEach((marker) => assertIncludes("P59 type contract", typeSource, marker));

  [
    "resolveStarBeastRendererImplementationUnfreezeDeclarationEndpoint",
    "const sourceConsumptionResult = input.consumptionResult",
    "sourceConsumptionResult === null",
    'sourceConsumptionResult.status === "UNAVAILABLE"',
    'sourceConsumptionResult.status === "NOT_READY"',
    "const declarationConsumptionReference =",
    "sourceConsumptionResult.consumption",
    '"STAR_BEAST_RENDERER_IMPLEMENTATION_UNFREEZE_DECLARATION_ENDPOINT"',
    "sourceConsumptionResult,",
    "declarationReference:",
    '"AVAILABLE_FOR_IMPLEMENTATION_UNFREEZE_GOVERNANCE_HANDOFF"',
    "declarationHandoffOnly: true",
    "unfreezeExecutionDeferred: true",
    "noUnfreezeIssued: true",
    'status: "AVAILABLE"',
  ].forEach((marker) => assertIncludes("P59 service contract", serviceSource, marker));

  [
    "consumeStarBeastRendererImplementationUnfreezeDeclaration(",
    "resolveStarBeastRendererImplementationUnfreezeDeclaration(",
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
  ].forEach((marker) => assertExcludes("P59 remains governance endpoint only", serviceSource, marker));

  [
    "StarBeastRendererImplementationUnfreezeDeclarationEndpoint",
    "StarBeastRendererImplementationUnfreezeDeclarationEndpointInput",
    "StarBeastRendererImplementationUnfreezeDeclarationEndpointResult",
    'from "./starBeastRendererImplementationUnfreezeDeclarationEndpoint"',
  ].forEach((marker) => assertIncludes("type index exports P59", typeIndexSource, marker));

  const sourcePaths = collectTypeScriptSourcePaths(path.join(rootDir, "src"));
  const callSites = (symbol) => sourcePaths
    .filter((filePath) => fs.readFileSync(filePath, "utf8").includes(symbol))
    .map((filePath) => path.relative(rootDir, filePath))
    .sort()
    .join(",");
  assertEqual(
    "P58 service has no direct external caller",
    callSites("consumeStarBeastRendererImplementationUnfreezeDeclaration("),
    "src/services/starBeastRendererImplementationUnfreezeDeclarationConsumptionService.ts",
  );
  assertEqual(
    "P59 endpoint has no downstream consumer",
    callSites("resolveStarBeastRendererImplementationUnfreezeDeclarationEndpoint("),
    "src/services/starBeastRendererImplementationUnfreezeDeclarationEndpoint.ts",
  );

  [
    "RC-STAR-BEAST-RENDERER-IMPLEMENTATION-UNFREEZE-DECLARATION-ENDPOINT-P59",
    "IMPLEMENTATION UNFREEZE DECLARATION ENDPOINT",
    "Endpoint 只允许未来独立治理步骤读取已确认的声明交接",
    "P59 只消费调用方提供的 P58 Result",
    "AVAILABLE_FOR_IMPLEMENTATION_UNFREEZE_GOVERNANCE_HANDOFF",
    "P58 Consumption Result → only P59 Unfreeze Declaration Endpoint",
    "P59 Endpoint Result → no downstream consumer",
    "不消费 `StarBeastRendererImplementationAuthorizationEndpointResult`",
  ].forEach((marker) => assertIncludes("P59 protocol", protocolSource, marker));
  [
    "P58 Consumption Result → only P59 Unfreeze Declaration Endpoint",
    "P58 Consumption Service → no direct external caller",
    "P59 只消费调用方提供的 P58 Result",
  ].forEach((marker) => assertIncludes("P58 protocol permits P59 only", consumptionProtocolSource, marker));

  assertIncludes(
    "P59 gate registered",
    packageJson.scripts?.["check:star-beast-renderer-implementation-unfreeze-declaration-endpoint"] ?? "",
    "node scripts/check-star-beast-renderer-implementation-unfreeze-declaration-endpoint.mjs",
  );
  assertIncludes(
    "P59 gate in release",
    packageJson.scripts?.["check:release"] ?? "",
    "npm run check:star-beast-renderer-implementation-unfreeze-declaration-endpoint",
  );

  await build({ entryPoints: [servicePath], outfile: tempModulePath, bundle: true, platform: "node", format: "esm", target: "node20", logLevel: "silent" });
  const { resolveStarBeastRendererImplementationUnfreezeDeclarationEndpoint } = await import(`file://${tempModulePath}?t=${Date.now()}`);

  const declarationReference = Object.freeze({ id: "p57" });
  const sourceCommandReference = Object.freeze({ id: "p56" });
  const authorityReference = Object.freeze({ id: "authority" });
  const readinessReference = Object.freeze({ id: "p55" });
  const authorizationEndpointGovernanceReference = Object.freeze({ id: "p53" });
  const implementationScenarioReference = Object.freeze({ id: "scenario" });
  const backendCandidateReferences = Object.freeze([Object.freeze({ id: "backend" })]);
  const fallbackStrategyReference = Object.freeze({ id: "fallback" });
  const acceptanceScopeReference = Object.freeze({ id: "scope" });
  const consumption = Object.freeze({ declarationReference, sourceCommandReference, authorityReference, readinessReference, authorizationEndpointGovernanceReference, implementationScenarioReference, backendCandidateReferences, fallbackStrategyReference, acceptanceScopeReference });
  const consumptionResult = Object.freeze({ status: "AVAILABLE", consumption });
  const input = Object.freeze({ consumptionResult });
  const snapshot = JSON.stringify(input);
  const available = resolveStarBeastRendererImplementationUnfreezeDeclarationEndpoint(input);

  assertEqual("AVAILABLE consumption creates endpoint", available.status, "AVAILABLE");
  assertEqual("consumption ref preserved", available.endpoint.declarationConsumptionReference === consumption, true);
  assertEqual("source result preserved", available.endpoint.sourceConsumptionResult === consumptionResult, true);
  assertEqual("declaration ref preserved", available.endpoint.declarationReference === declarationReference, true);
  assertEqual("candidate refs preserved", available.endpoint.backendCandidateReferences === backendCandidateReferences, true);
  assertEqual("endpoint defers unfreeze", available.endpoint.unfreezeExecutionDeferred, true);
  assertEqual("endpoint issues no unfreeze", available.endpoint.noUnfreezeIssued, true);
  assertEqual("endpoint selects no backend", available.endpoint.noFinalBackendSelection, true);
  assertEqual("endpoint creates no renderer", available.endpoint.noRendererCreation, true);
  assertEqual("endpoint frozen", Object.isFrozen(available.endpoint), true);
  assertEqual("result frozen", Object.isFrozen(available), true);
  assertEqual("input unchanged", JSON.stringify(input), snapshot);

  const notReady = resolveStarBeastRendererImplementationUnfreezeDeclarationEndpoint(Object.freeze({ consumptionResult: Object.freeze({ status: "NOT_READY", reason: "IMPLEMENTATION_UNFREEZE_DECLARATION_NOT_READY" }) }));
  assertEqual("NOT_READY preserved", notReady.status, "NOT_READY");
  assertEqual("NOT_READY reason stable", notReady.reason, "UNFREEZE_DECLARATION_CONSUMPTION_NOT_READY");
  assertEqual("source reason preserved", notReady.sourceConsumptionReason, "IMPLEMENTATION_UNFREEZE_DECLARATION_NOT_READY");

  const unavailable = resolveStarBeastRendererImplementationUnfreezeDeclarationEndpoint(Object.freeze({ consumptionResult: Object.freeze({ status: "UNAVAILABLE", reason: "IMPLEMENTATION_UNFREEZE_DECLARATION_UNAVAILABLE" }) }));
  assertEqual("UNAVAILABLE preserved", unavailable.status, "UNAVAILABLE");
  assertEqual("UNAVAILABLE reason stable", unavailable.reason, "UNFREEZE_DECLARATION_CONSUMPTION_UNAVAILABLE");

  const missing = resolveStarBeastRendererImplementationUnfreezeDeclarationEndpoint(Object.freeze({ consumptionResult: null }));
  assertEqual("missing result unavailable", missing.status, "UNAVAILABLE");
  assertEqual("missing reason stable", missing.reason, "UNFREEZE_DECLARATION_CONSUMPTION_RESULT_REQUIRED");
}

try { fs.rmSync(tempModulePath, { force: true }); } catch { /* best-effort cleanup */ }
if (failures.length > 0) {
  console.error("\nStar Beast renderer implementation unfreeze declaration endpoint gate failed:");
  failures.forEach((failure) => console.error(`- ${failure}`));
  process.exit(1);
}
console.log("\nStar Beast renderer implementation unfreeze declaration endpoint gate passed.");
