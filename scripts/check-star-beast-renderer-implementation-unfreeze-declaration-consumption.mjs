import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import process from "node:process";
import { build } from "esbuild";

const rootDir = process.cwd();
const typePath = path.join(rootDir, "src/types/starBeastRendererImplementationUnfreezeDeclarationConsumption.ts");
const servicePath = path.join(rootDir, "src/services/starBeastRendererImplementationUnfreezeDeclarationConsumptionService.ts");
const protocolPath = path.join(rootDir, "docs/GUANYAO_STAR_BEAST_RENDERER_IMPLEMENTATION_UNFREEZE_DECLARATION_CONSUMPTION_PROTOCOL.md");
const declarationProtocolPath = path.join(rootDir, "docs/GUANYAO_STAR_BEAST_RENDERER_IMPLEMENTATION_UNFREEZE_DECLARATION_PROTOCOL.md");
const typeIndexPath = path.join(rootDir, "src/types/index.ts");
const packagePath = path.join(rootDir, "package.json");
const tempModulePath = path.join(os.tmpdir(), `guanyao-unfreeze-declaration-consumption-${process.pid}.mjs`);
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
  ["P58 type", typePath],
  ["P58 service", servicePath],
  ["P58 protocol", protocolPath],
  ["P57 protocol", declarationProtocolPath],
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
    "StarBeastRendererImplementationUnfreezeDeclarationConsumptionInput",
    "declarationResult: StarBeastRendererImplementationUnfreezeDeclarationResult | null",
    'semanticRole: "STAR_BEAST_RENDERER_IMPLEMENTATION_UNFREEZE_DECLARATION_CONSUMPTION"',
    "declarationReference: StarBeastRendererImplementationUnfreezeDeclaration",
    "sourceDeclarationResult: StarBeastRendererImplementationUnfreezeDeclarationDeclared",
    "sourceCommandReference:",
    "authorityReference:",
    "readinessReference:",
    "authorizationEndpointGovernanceReference:",
    "implementationScenarioReference:",
    "backendCandidateReferences:",
    "fallbackStrategyReference:",
    "acceptanceScopeReference:",
    'consumptionStatus: "AVAILABLE_FOR_FUTURE_IMPLEMENTATION_UNFREEZE_ENDPOINT"',
    "declarationConsumedOnly: true",
    "unfreezeExecutionDeferred: true",
    "noUnfreezeIssued: true",
    "noAuthorizationEndpointConsumption: true",
    "noFinalBackendSelection: true",
    "noRendererCreation: true",
    "noRenderExecution: true",
    'reason: "IMPLEMENTATION_UNFREEZE_DECLARATION_NOT_READY"',
    '"IMPLEMENTATION_UNFREEZE_DECLARATION_RESULT_REQUIRED"',
    '"IMPLEMENTATION_UNFREEZE_DECLARATION_UNAVAILABLE"',
  ].forEach((marker) => assertIncludes("P58 type contract", typeSource, marker));

  [
    "consumeStarBeastRendererImplementationUnfreezeDeclaration",
    "const sourceDeclarationResult = input.declarationResult",
    "sourceDeclarationResult === null",
    'sourceDeclarationResult.status === "UNAVAILABLE"',
    'sourceDeclarationResult.status === "NOT_READY"',
    "const declarationReference = sourceDeclarationResult.declaration",
    '"STAR_BEAST_RENDERER_IMPLEMENTATION_UNFREEZE_DECLARATION_CONSUMPTION"',
    "sourceDeclarationResult,",
    "sourceCommandReference: declarationReference.sourceCommandReference",
    '"AVAILABLE_FOR_FUTURE_IMPLEMENTATION_UNFREEZE_ENDPOINT"',
    "declarationConsumedOnly: true",
    "unfreezeExecutionDeferred: true",
    "noUnfreezeIssued: true",
    'status: "AVAILABLE"',
  ].forEach((marker) => assertIncludes("P58 service contract", serviceSource, marker));

  [
    "resolveStarBeastRendererImplementationUnfreezeDeclaration(",
    "StarBeastRendererImplementationAuthorizationEndpointResult",
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
  ].forEach((marker) => assertExcludes("P58 remains consumption-only", serviceSource, marker));

  [
    "StarBeastRendererImplementationUnfreezeDeclarationConsumption",
    "StarBeastRendererImplementationUnfreezeDeclarationConsumptionInput",
    "StarBeastRendererImplementationUnfreezeDeclarationConsumptionResult",
    'from "./starBeastRendererImplementationUnfreezeDeclarationConsumption"',
  ].forEach((marker) => assertIncludes("type index exports P58", typeIndexSource, marker));

  const sourcePaths = collectTypeScriptSourcePaths(path.join(rootDir, "src"));
  const callSites = (symbol) => sourcePaths
    .filter((filePath) => fs.readFileSync(filePath, "utf8").includes(symbol))
    .map((filePath) => path.relative(rootDir, filePath))
    .sort()
    .join(",");
  assertEqual(
    "P57 resolver has no direct external caller",
    callSites("resolveStarBeastRendererImplementationUnfreezeDeclaration("),
    "src/services/starBeastRendererImplementationUnfreezeDeclarationResolver.ts",
  );
  assertEqual(
    "P58 service has no downstream consumer",
    callSites("consumeStarBeastRendererImplementationUnfreezeDeclaration("),
    "src/services/starBeastRendererImplementationUnfreezeDeclarationConsumptionService.ts",
  );

  [
    "RC-STAR-BEAST-RENDERER-IMPLEMENTATION-UNFREEZE-DECLARATION-CONSUMPTION-P58",
    "IMPLEMENTATION UNFREEZE DECLARATION CONSUMPTION",
    "Consumption 只证明正式声明已被治理层接收",
    "P58 只消费调用方提供的 P57 Result",
    "AVAILABLE_FOR_FUTURE_IMPLEMENTATION_UNFREEZE_ENDPOINT",
    "P57 Declaration Result → only P58 Declaration Consumption",
    "P58 Consumption Result → only P59 Unfreeze Declaration Endpoint",
    "P58 Consumption Service → no direct external caller",
    "P59 只消费调用方提供的 P58 Result",
    "不消费 `StarBeastRendererImplementationAuthorizationEndpointResult`",
  ].forEach((marker) => assertIncludes("P58 protocol", protocolSource, marker));
  [
    "P57 Declaration Result → only P58 Declaration Consumption",
    "P57 Declaration Resolver → no direct external caller",
    "P58 只消费调用方提供的 P57 Result",
  ].forEach((marker) => assertIncludes("P57 protocol permits P58 only", declarationProtocolSource, marker));

  assertIncludes(
    "P58 gate registered",
    packageJson.scripts?.["check:star-beast-renderer-implementation-unfreeze-declaration-consumption"] ?? "",
    "node scripts/check-star-beast-renderer-implementation-unfreeze-declaration-consumption.mjs",
  );
  assertIncludes(
    "P58 gate in release",
    packageJson.scripts?.["check:release"] ?? "",
    "npm run check:star-beast-renderer-implementation-unfreeze-declaration-consumption",
  );

  await build({ entryPoints: [servicePath], outfile: tempModulePath, bundle: true, platform: "node", format: "esm", target: "node20", logLevel: "silent" });
  const { consumeStarBeastRendererImplementationUnfreezeDeclaration } = await import(`file://${tempModulePath}?t=${Date.now()}`);

  const sourceCommandReference = Object.freeze({ id: "p56" });
  const authorityReference = Object.freeze({ id: "authority" });
  const readinessReference = Object.freeze({ id: "p55" });
  const authorizationEndpointGovernanceReference = Object.freeze({ id: "p53" });
  const implementationScenarioReference = Object.freeze({ id: "scenario" });
  const backendCandidateReferences = Object.freeze([Object.freeze({ id: "backend" })]);
  const fallbackStrategyReference = Object.freeze({ id: "fallback" });
  const acceptanceScopeReference = Object.freeze({ id: "scope" });
  const declaration = Object.freeze({ sourceCommandReference, authorityReference, readinessReference, authorizationEndpointGovernanceReference, implementationScenarioReference, backendCandidateReferences, fallbackStrategyReference, acceptanceScopeReference });
  const declarationResult = Object.freeze({ status: "DECLARED", declaration });
  const input = Object.freeze({ declarationResult });
  const snapshot = JSON.stringify(input);
  const available = consumeStarBeastRendererImplementationUnfreezeDeclaration(input);

  assertEqual("DECLARED becomes AVAILABLE", available.status, "AVAILABLE");
  assertEqual("declaration ref preserved", available.consumption.declarationReference === declaration, true);
  assertEqual("source result preserved", available.consumption.sourceDeclarationResult === declarationResult, true);
  assertEqual("command ref preserved", available.consumption.sourceCommandReference === sourceCommandReference, true);
  assertEqual("candidate refs preserved", available.consumption.backendCandidateReferences === backendCandidateReferences, true);
  assertEqual("unfreeze remains deferred", available.consumption.unfreezeExecutionDeferred, true);
  assertEqual("no unfreeze issued", available.consumption.noUnfreezeIssued, true);
  assertEqual("no backend selected", available.consumption.noFinalBackendSelection, true);
  assertEqual("no renderer created", available.consumption.noRendererCreation, true);
  assertEqual("consumption frozen", Object.isFrozen(available.consumption), true);
  assertEqual("result frozen", Object.isFrozen(available), true);
  assertEqual("input unchanged", JSON.stringify(input), snapshot);

  const notReady = consumeStarBeastRendererImplementationUnfreezeDeclaration(Object.freeze({ declarationResult: Object.freeze({ status: "NOT_READY", reason: "EXPLICIT_UNFREEZE_DECLARATION_COMMAND_INVALID" }) }));
  assertEqual("NOT_READY preserved", notReady.status, "NOT_READY");
  assertEqual("NOT_READY reason stable", notReady.reason, "IMPLEMENTATION_UNFREEZE_DECLARATION_NOT_READY");
  assertEqual("source reason preserved", notReady.sourceDeclarationReason, "EXPLICIT_UNFREEZE_DECLARATION_COMMAND_INVALID");

  const unavailable = consumeStarBeastRendererImplementationUnfreezeDeclaration(Object.freeze({ declarationResult: Object.freeze({ status: "UNAVAILABLE", reason: "EXPLICIT_UNFREEZE_DECLARATION_COMMAND_UNAVAILABLE" }) }));
  assertEqual("UNAVAILABLE preserved", unavailable.status, "UNAVAILABLE");
  assertEqual("UNAVAILABLE reason stable", unavailable.reason, "IMPLEMENTATION_UNFREEZE_DECLARATION_UNAVAILABLE");

  const missing = consumeStarBeastRendererImplementationUnfreezeDeclaration(Object.freeze({ declarationResult: null }));
  assertEqual("missing result unavailable", missing.status, "UNAVAILABLE");
  assertEqual("missing reason stable", missing.reason, "IMPLEMENTATION_UNFREEZE_DECLARATION_RESULT_REQUIRED");
}

try { fs.rmSync(tempModulePath, { force: true }); } catch { /* best-effort cleanup */ }
if (failures.length > 0) {
  console.error("\nStar Beast renderer implementation unfreeze declaration consumption gate failed:");
  failures.forEach((failure) => console.error(`- ${failure}`));
  process.exit(1);
}
console.log("\nStar Beast renderer implementation unfreeze declaration consumption gate passed.");
