import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import process from "node:process";
import { build } from "esbuild";

const rootDir = process.cwd();
const typePath = path.join(rootDir, "src/types/starBeastRendererBackendSelectionConsumption.ts");
const servicePath = path.join(rootDir, "src/services/starBeastRendererBackendSelectionConsumptionService.ts");
const selectionServicePath = path.join(rootDir, "src/services/starBeastRendererBackendSelectionResolver.ts");
const protocolPath = path.join(rootDir, "docs/GUANYAO_STAR_BEAST_RENDERER_BACKEND_SELECTION_CONSUMPTION_PROTOCOL.md");
const selectionProtocolPath = path.join(rootDir, "docs/GUANYAO_STAR_BEAST_RENDERER_BACKEND_SELECTION_RESOLVER_PROTOCOL.md");
const typeIndexPath = path.join(rootDir, "src/types/index.ts");
const packagePath = path.join(rootDir, "package.json");
const tempModulePath = path.join(os.tmpdir(), "guanyao-renderer-backend-selection-consumption-" + process.pid + ".mjs");
const failures = [];

const assertIncludes = (name, source, expected) => {
  if (!source.includes(expected)) failures.push(name + " missing=" + expected);
  else console.log("PASS | " + name + " | includes=" + expected);
};
const assertExcludes = (name, source, forbidden) => {
  if (source.includes(forbidden)) failures.push(name + " forbidden=" + forbidden);
  else console.log("PASS | " + name + " | forbidden=absent");
};
const assertEqual = (name, actual, expected) => {
  if (actual !== expected) failures.push(name + " expected=" + expected + " actual=" + actual);
  else console.log("PASS | " + name + " | expected=" + expected + " | actual=" + actual);
};
const collectTypeScriptSourcePaths = (directoryPath) =>
  fs.readdirSync(directoryPath, { withFileTypes: true }).flatMap((entry) => {
    const entryPath = path.join(directoryPath, entry.name);
    if (entry.isDirectory()) return collectTypeScriptSourcePaths(entryPath);
    return /\.tsx?$/.test(entry.name) ? [entryPath] : [];
  });

for (const [name, filePath] of [
  ["P76 type", typePath],
  ["P76 service", servicePath],
  ["P75 resolver", selectionServicePath],
  ["P76 protocol", protocolPath],
  ["P75 protocol", selectionProtocolPath],
  ["type index", typeIndexPath],
  ["package manifest", packagePath],
]) {
  if (!fs.existsSync(filePath)) failures.push(name + " missing=" + filePath);
  else console.log("PASS | " + name + " file exists");
}

if (failures.length === 0) {
  const typeSource = fs.readFileSync(typePath, "utf8");
  const serviceSource = fs.readFileSync(servicePath, "utf8");
  const protocolSource = fs.readFileSync(protocolPath, "utf8");
  const selectionProtocolSource = fs.readFileSync(selectionProtocolPath, "utf8");
  const typeIndexSource = fs.readFileSync(typeIndexPath, "utf8");
  const packageJson = JSON.parse(fs.readFileSync(packagePath, "utf8"));

  [
    "StarBeastRendererBackendSelectionConsumptionInput",
    "selectionResult: StarBeastRendererBackendSelectionResult | null",
    "StarBeastRendererBackendSelectionConsumption",
    'semanticRole: "STAR_BEAST_RENDERER_BACKEND_SELECTION_CONSUMPTION"',
    "selectionReference:",
    "sourceSelectionResult:",
    "sourceCommandReference:",
    "authorityReference:",
    "candidateReference:",
    "readinessReference:",
    "authorizationEndpointGovernanceReference:",
    'consumptionStatus: "AVAILABLE_FOR_FUTURE_RENDERER_BACKEND_SELECTION_ENDPOINT"',
    "selectionConsumedOnly: true",
    "candidateReferenceOnly: true",
    "candidateResolutionDeferred: true",
    "backendSelectionEndpointDeferred: true",
    "backendActivationDeferred: true",
    "noAutomaticActivation: true",
    "noP71ResultConsumption: true",
    "noFrozenEndpointResultConsumption: true",
    "noCapabilityProbe: true",
    "noDeviceDetection: true",
    "noRendererCreation: true",
    "noRenderExecution: true",
    '"BACKEND_SELECTION_NOT_READY"',
    '"BACKEND_SELECTION_RESULT_REQUIRED"',
    '"BACKEND_SELECTION_UNAVAILABLE"',
  ].forEach((marker) => assertIncludes("P76 type contract", typeSource, marker));

  [
    "consumeStarBeastRendererBackendSelection",
    "const sourceSelectionResult = input.selectionResult",
    "sourceSelectionResult === null",
    'sourceSelectionResult.status === "UNAVAILABLE"',
    'sourceSelectionResult.status === "NOT_READY"',
    "const selectionReference = sourceSelectionResult.selection",
    '"STAR_BEAST_RENDERER_BACKEND_SELECTION_CONSUMPTION"',
    "selectionReference,",
    "sourceSelectionResult,",
    "sourceCommandReference: selectionReference.sourceCommandReference",
    "authorityReference: selectionReference.authorityReference",
    "candidateReference: selectionReference.candidateReference",
    "readinessReference: selectionReference.readinessReference",
    "selectionReference.authorizationEndpointGovernanceReference",
    '"AVAILABLE_FOR_FUTURE_RENDERER_BACKEND_SELECTION_ENDPOINT"',
    "selectionConsumedOnly: true",
    "candidateResolutionDeferred: true",
    "backendSelectionEndpointDeferred: true",
    "backendActivationDeferred: true",
    'status: "AVAILABLE"',
  ].forEach((marker) => assertIncludes("P76 service contract", serviceSource, marker));

  [
    "resolveStarBeastRendererBackendSelection(",
    "resolveStarBeastRendererExplicitBackendSelectionCommand(",
    "resolveStarBeastRendererBackendSelectionReadiness(",
    "StarBeastRendererExecutionProtocolAuthorizationEndpointResult",
    "resolveStarBeastRendererExecutionProtocolAuthorizationEndpoint(",
    "selectedBackend",
    "backendName",
    "backendType",
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
  ].forEach((marker) => assertExcludes("P76 remains consumption-only", serviceSource, marker));

  [
    "StarBeastRendererBackendSelectionConsumption",
    "StarBeastRendererBackendSelectionConsumptionInput",
    "StarBeastRendererBackendSelectionConsumptionResult",
    'from "./starBeastRendererBackendSelectionConsumption"',
  ].forEach((marker) => assertIncludes("type index exports P76", typeIndexSource, marker));

  const sourcePaths = collectTypeScriptSourcePaths(path.join(rootDir, "src"));
  const callSites = (symbol) => sourcePaths
    .filter((filePath) => fs.readFileSync(filePath, "utf8").includes(symbol))
    .map((filePath) => path.relative(rootDir, filePath))
    .sort()
    .join(",");
  assertEqual(
    "P75 resolver remains owner-only",
    callSites("resolveStarBeastRendererBackendSelection("),
    "src/services/starBeastRendererBackendSelectionResolver.ts",
  );
  assertEqual(
    "P76 service has no downstream caller",
    callSites("consumeStarBeastRendererBackendSelection("),
    "src/services/starBeastRendererBackendSelectionConsumptionService.ts",
  );

  [
    "RC-STAR-BEAST-RENDERER-BACKEND-SELECTION-CONSUMPTION-P76",
    "BACKEND SELECTION CONSUMPTION ONLY",
    "P75 SELECTED Result",
    "AVAILABLE_FOR_FUTURE_RENDERER_BACKEND_SELECTION_ENDPOINT",
    "Consumption 不是 Endpoint，不解析 Candidate，不激活 Backend",
    "P75 Selection Result → only P76 Backend Selection Consumption",
    "P75 Selection Resolver → no direct external caller",
    "P76 Consumption Result → no consumer before P77 Backend Selection Endpoint",
    "P76 Consumption Service → no direct external caller",
    "P76 只读取上位调用方提供的 P75 Result",
    "P76 不解除 P54/P60/P66/P72 四重冻结",
    "Consumption 不解析候选、不探测设备、不激活 Backend",
  ].forEach((marker) => assertIncludes("P76 protocol", protocolSource, marker));
  [
    "P75 Selection Result → only P76 Backend Selection Consumption",
    "P75 Selection Resolver → no direct external caller",
    "P76 Consumption Result → no consumer before P77 Backend Selection Endpoint",
    "P76 Consumption Service → no direct external caller",
    "P76 只消费调用方提供的 P75 Result",
  ].forEach((marker) => assertIncludes("P75 permits only P76", selectionProtocolSource, marker));

  assertIncludes(
    "P76 gate registered",
    packageJson.scripts?.["check:star-beast-renderer-backend-selection-consumption"] ?? "",
    "node scripts/check-star-beast-renderer-backend-selection-consumption.mjs",
  );
  assertIncludes(
    "P76 gate in release",
    packageJson.scripts?.["check:release"] ?? "",
    "npm run check:star-beast-renderer-backend-selection-consumption",
  );

  await build({ entryPoints: [servicePath], outfile: tempModulePath, bundle: true, platform: "node", format: "esm", target: "node20", logLevel: "silent" });
  const runtimeModule = await import("file://" + tempModulePath + "?t=" + Date.now());
  const consumeStarBeastRendererBackendSelection = runtimeModule.consumeStarBeastRendererBackendSelection;

  const governanceReference = Object.freeze({ referenceType: "STAR_BEAST_RENDERER_EXECUTION_PROTOCOL_AUTHORIZATION_ENDPOINT_GOVERNANCE", referenceId: "p71:governance" });
  const readinessReference = Object.freeze({ readiness: "READY_FOR_EXPLICIT_RENDERER_BACKEND_SELECTION", authorizationEndpointGovernanceReference: governanceReference });
  const authorityReference = Object.freeze({ referenceType: "STAR_BEAST_RENDERER_BACKEND_SELECTION_AUTHORITY", referenceId: "authority:backend-selection" });
  const candidateReference = Object.freeze({ referenceType: "STAR_BEAST_RENDERER_BACKEND_CANDIDATE", referenceId: "candidate:renderer-backend" });
  const sourceCommandReference = Object.freeze({ semanticRole: "STAR_BEAST_RENDERER_EXPLICIT_BACKEND_SELECTION_COMMAND" });
  const selection = Object.freeze({
    source: "explicit_renderer_backend_selection_command",
    semanticRole: "STAR_BEAST_RENDERER_BACKEND_SELECTION",
    selectionStatus: "SELECTED_FOR_RENDERER_BACKEND_GOVERNANCE",
    selectionScope: "STAR_BEAST_RENDERER_BACKEND_CANDIDATE_REFERENCE",
    sourceCommandReference,
    authorityReference,
    candidateReference,
    readinessReference,
    authorizationEndpointGovernanceReference: governanceReference,
    selectionDecision: "SELECT_RENDERER_BACKEND",
    explicitAuthorityConfirmed: true,
    backendSelectionOnly: true,
    candidateReferenceOnly: true,
    candidateResolutionDeferred: true,
    backendActivationDeferred: true,
    noAutomaticActivation: true,
    noP71ResultConsumption: true,
    noFrozenEndpointResultConsumption: true,
    noCapabilityProbe: true,
    noDeviceDetection: true,
    noRendererCreation: true,
    noRenderExecution: true,
  });
  const selectedResult = Object.freeze({ status: "SELECTED", source: "star_beast_renderer_backend_selection_resolver", input: Object.freeze({}), commandResult: Object.freeze({}), selection });
  const input = Object.freeze({ selectionResult: selectedResult });
  const snapshot = JSON.stringify(input);
  const available = consumeStarBeastRendererBackendSelection(input);

  assertEqual("SELECTED result is consumable", available.status, "AVAILABLE");
  assertEqual("consumption targets future endpoint only", available.consumption.consumptionStatus, "AVAILABLE_FOR_FUTURE_RENDERER_BACKEND_SELECTION_ENDPOINT");
  assertEqual("consumption preserves selection", available.consumption.selectionReference === selection, true);
  assertEqual("consumption preserves source result", available.consumption.sourceSelectionResult === selectedResult, true);
  assertEqual("consumption preserves command", available.consumption.sourceCommandReference === sourceCommandReference, true);
  assertEqual("consumption preserves authority", available.consumption.authorityReference === authorityReference, true);
  assertEqual("consumption preserves candidate", available.consumption.candidateReference === candidateReference, true);
  assertEqual("consumption preserves readiness", available.consumption.readinessReference === readinessReference, true);
  assertEqual("consumption preserves P71 governance", available.consumption.authorizationEndpointGovernanceReference === governanceReference, true);
  assertEqual("candidate resolution remains deferred", available.consumption.candidateResolutionDeferred, true);
  assertEqual("endpoint remains deferred", available.consumption.backendSelectionEndpointDeferred, true);
  assertEqual("backend activation remains deferred", available.consumption.backendActivationDeferred, true);
  assertEqual("consumption does not consume P71 result", available.consumption.noP71ResultConsumption, true);
  assertEqual("consumption runs no capability probe", available.consumption.noCapabilityProbe, true);
  assertEqual("consumption runs no device detection", available.consumption.noDeviceDetection, true);
  assertEqual("consumption creates no renderer", available.consumption.noRendererCreation, true);
  assertEqual("consumption executes no render", available.consumption.noRenderExecution, true);
  assertEqual("consumption remains frozen", Object.isFrozen(available.consumption), true);
  assertEqual("result remains frozen", Object.isFrozen(available), true);
  assertEqual("input unchanged", JSON.stringify(input), snapshot);

  const notReady = consumeStarBeastRendererBackendSelection(Object.freeze({ selectionResult: Object.freeze({ status: "NOT_READY", reason: "EXPLICIT_BACKEND_SELECTION_COMMAND_INVALID" }) }));
  assertEqual("P75 NOT_READY remains not ready", notReady.status, "NOT_READY");
  assertEqual("P75 NOT_READY reason preserved", notReady.sourceSelectionReason, "EXPLICIT_BACKEND_SELECTION_COMMAND_INVALID");
  const unavailable = consumeStarBeastRendererBackendSelection(Object.freeze({ selectionResult: Object.freeze({ status: "UNAVAILABLE", reason: "EXPLICIT_BACKEND_SELECTION_COMMAND_UNAVAILABLE" }) }));
  assertEqual("P75 UNAVAILABLE remains unavailable", unavailable.status, "UNAVAILABLE");
  assertEqual("P75 UNAVAILABLE reason preserved", unavailable.sourceSelectionReason, "EXPLICIT_BACKEND_SELECTION_COMMAND_UNAVAILABLE");
  const missing = consumeStarBeastRendererBackendSelection(Object.freeze({ selectionResult: null }));
  assertEqual("missing P75 result remains unavailable", missing.reason, "BACKEND_SELECTION_RESULT_REQUIRED");
}

try { fs.rmSync(tempModulePath, { force: true }); } catch { /* best-effort cleanup */ }
if (failures.length > 0) {
  console.error("\nStar Beast renderer backend selection consumption gate failed:");
  failures.forEach((failure) => console.error("- " + failure));
  process.exit(1);
}
console.log("\nStar Beast renderer backend selection consumption gate passed.");
