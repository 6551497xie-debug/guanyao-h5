import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import process from "node:process";
import { build } from "esbuild";

const rootDir = process.cwd();
const typePath = path.join(rootDir, "src/types/starBeastRendererBackendSelection.ts");
const servicePath = path.join(rootDir, "src/services/starBeastRendererBackendSelectionResolver.ts");
const commandServicePath = path.join(rootDir, "src/services/starBeastRendererExplicitBackendSelectionCommandService.ts");
const protocolPath = path.join(rootDir, "docs/GUANYAO_STAR_BEAST_RENDERER_BACKEND_SELECTION_RESOLVER_PROTOCOL.md");
const commandProtocolPath = path.join(rootDir, "docs/GUANYAO_STAR_BEAST_RENDERER_EXPLICIT_BACKEND_SELECTION_COMMAND_PROTOCOL.md");
const typeIndexPath = path.join(rootDir, "src/types/index.ts");
const packagePath = path.join(rootDir, "package.json");
const tempModulePath = path.join(os.tmpdir(), "guanyao-renderer-backend-selection-" + process.pid + ".mjs");
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
  ["P75 type", typePath],
  ["P75 resolver", servicePath],
  ["P74 service", commandServicePath],
  ["P75 protocol", protocolPath],
  ["P74 protocol", commandProtocolPath],
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
  const commandProtocolSource = fs.readFileSync(commandProtocolPath, "utf8");
  const typeIndexSource = fs.readFileSync(typeIndexPath, "utf8");
  const packageJson = JSON.parse(fs.readFileSync(packagePath, "utf8"));

  [
    "StarBeastRendererBackendSelectionInput",
    "commandResult: StarBeastRendererExplicitBackendSelectionCommandResult | null",
    "StarBeastRendererBackendSelection",
    'semanticRole: "STAR_BEAST_RENDERER_BACKEND_SELECTION"',
    'selectionStatus: "SELECTED_FOR_RENDERER_BACKEND_GOVERNANCE"',
    'selectionScope: "STAR_BEAST_RENDERER_BACKEND_CANDIDATE_REFERENCE"',
    "sourceCommandReference:",
    "authorityReference:",
    "candidateReference:",
    "readinessReference:",
    "authorizationEndpointGovernanceReference:",
    'selectionDecision: "SELECT_RENDERER_BACKEND"',
    "explicitAuthorityConfirmed: true",
    "backendSelectionOnly: true",
    "candidateReferenceOnly: true",
    "candidateResolutionDeferred: true",
    "backendActivationDeferred: true",
    "noAutomaticActivation: true",
    "noP71ResultConsumption: true",
    "noFrozenEndpointResultConsumption: true",
    "noCapabilityProbe: true",
    "noDeviceDetection: true",
    "noRendererCreation: true",
    "noRenderExecution: true",
    'status: "SELECTED"',
    '"EXPLICIT_BACKEND_SELECTION_COMMAND_NOT_READY"',
    '"EXPLICIT_BACKEND_SELECTION_COMMAND_INVALID"',
    '"EXPLICIT_BACKEND_SELECTION_COMMAND_RESULT_REQUIRED"',
    '"EXPLICIT_BACKEND_SELECTION_COMMAND_UNAVAILABLE"',
  ].forEach((marker) => assertIncludes("P75 type contract", typeSource, marker));

  [
    "resolveStarBeastRendererBackendSelection",
    "const commandResult = input.commandResult",
    "commandResult === null",
    'commandResult.status === "UNAVAILABLE"',
    'commandResult.status === "NOT_READY"',
    "const { command, readiness } = commandResult",
    "const sourceInput = commandResult.input",
    "const isValidExplicitCommand =",
    '"explicit_renderer_backend_selection_decision"',
    '"STAR_BEAST_RENDERER_EXPLICIT_BACKEND_SELECTION_COMMAND"',
    '"STAR_BEAST_RENDERER_BACKEND_SELECTION_AUTHORITY"',
    '"STAR_BEAST_RENDERER_BACKEND_CANDIDATE"',
    '"SELECT_RENDERER_BACKEND"',
    '"SELECT_STAR_BEAST_RENDERER_BACKEND_CANDIDATE"',
    "command.readinessReference === readiness",
    "readiness.authorizationEndpointGovernanceReference",
    "sourceInput.readinessResult === readiness",
    "sourceInput.authorityReference === command.authorityReference",
    "sourceInput.candidateReference === command.candidateReference",
    "sourceInput.decision === command.decision",
    '"EXPLICIT_BACKEND_SELECTION_COMMAND_INVALID"',
    '"STAR_BEAST_RENDERER_BACKEND_SELECTION"',
    '"SELECTED_FOR_RENDERER_BACKEND_GOVERNANCE"',
    "sourceCommandReference: command",
    "candidateReference: command.candidateReference",
    'status: "SELECTED"',
  ].forEach((marker) => assertIncludes("P75 resolver contract", serviceSource, marker));

  [
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
  ].forEach((marker) => assertExcludes("P75 remains selection-reference-only", serviceSource, marker));

  [
    "StarBeastRendererBackendSelectionInput",
    "StarBeastRendererBackendSelectionResult",
    "StarBeastRendererBackendSelectionSelected",
    'from "./starBeastRendererBackendSelection"',
  ].forEach((marker) => assertIncludes("type index exports P75", typeIndexSource, marker));

  const sourcePaths = collectTypeScriptSourcePaths(path.join(rootDir, "src"));
  const callSites = (symbol) => sourcePaths
    .filter((filePath) => fs.readFileSync(filePath, "utf8").includes(symbol))
    .map((filePath) => path.relative(rootDir, filePath))
    .sort()
    .join(",");
  assertEqual(
    "P74 resolver remains owner-only",
    callSites("resolveStarBeastRendererExplicitBackendSelectionCommand("),
    "src/services/starBeastRendererExplicitBackendSelectionCommandService.ts",
  );
  assertEqual(
    "P75 resolver has no downstream caller",
    callSites("resolveStarBeastRendererBackendSelection("),
    "src/services/starBeastRendererBackendSelectionResolver.ts",
  );

  [
    "RC-STAR-BEAST-RENDERER-BACKEND-SELECTION-RESOLVER-P75",
    "BACKEND CANDIDATE REFERENCE SELECTION ONLY",
    "P74 AVAILABLE Command Result",
    "SELECTED_FOR_RENDERER_BACKEND_GOVERNANCE",
    "正式 Selection 只选择 Backend Candidate opaque reference",
    "Command、P74 Input 与 P73 READY 中的 Authority、Candidate、Readiness、Governance 引用保持同一对象引用",
    "EXPLICIT_BACKEND_SELECTION_COMMAND_INVALID",
    "selectionScope: STAR_BEAST_RENDERER_BACKEND_CANDIDATE_REFERENCE",
    "candidateResolutionDeferred: true",
    "backendActivationDeferred: true",
    "P74 Command Result → only P75 Backend Selection Resolver",
    "P75 Selection Result → no consumer before P76 Backend Selection Consumption",
    "P75 只读取上位调用方提供的 P74 Result",
    "P75 的正式 Selection 不解除 P54/P60/P66/P72 四重冻结",
    "Selection 不解析候选、不探测设备、不激活 Backend",
    "P75 Selection Result → only P76 Backend Selection Consumption",
    "P75 Selection Resolver → no direct external caller",
    "P76 Consumption Result → no consumer before P77 Backend Selection Endpoint",
    "P76 Consumption Service → no direct external caller",
    "P76 只消费调用方提供的 P75 Result",
  ].forEach((marker) => assertIncludes("P75 protocol", protocolSource, marker));
  [
    "P74 Command Result → only P75 Backend Selection Resolver",
    "P74 Command Resolver → no direct external caller",
    "P75 Selection Result → no consumer before P76 Backend Selection Consumption",
    "P75 Selection Resolver → no direct external caller",
    "P75 正式 Selection 只选择 Candidate opaque reference",
  ].forEach((marker) => assertIncludes("P74 permits only P75", commandProtocolSource, marker));

  assertIncludes(
    "P75 gate registered",
    packageJson.scripts?.["check:star-beast-renderer-backend-selection-resolver"] ?? "",
    "node scripts/check-star-beast-renderer-backend-selection-resolver.mjs",
  );
  assertIncludes(
    "P75 gate in release",
    packageJson.scripts?.["check:release"] ?? "",
    "npm run check:star-beast-renderer-backend-selection-resolver",
  );

  await build({ entryPoints: [servicePath], outfile: tempModulePath, bundle: true, platform: "node", format: "esm", target: "node20", logLevel: "silent" });
  const runtimeModule = await import("file://" + tempModulePath + "?t=" + Date.now());
  const resolveStarBeastRendererBackendSelection = runtimeModule.resolveStarBeastRendererBackendSelection;

  const governanceReference = Object.freeze({ referenceType: "STAR_BEAST_RENDERER_EXECUTION_PROTOCOL_AUTHORIZATION_ENDPOINT_GOVERNANCE", referenceId: "p71:governance" });
  const readiness = Object.freeze({ status: "READY", readiness: "READY_FOR_EXPLICIT_RENDERER_BACKEND_SELECTION", authorizationEndpointGovernanceReference: governanceReference });
  const authorityReference = Object.freeze({ referenceType: "STAR_BEAST_RENDERER_BACKEND_SELECTION_AUTHORITY", referenceId: "authority:backend-selection" });
  const candidateReference = Object.freeze({ referenceType: "STAR_BEAST_RENDERER_BACKEND_CANDIDATE", referenceId: "candidate:renderer-backend" });
  const sourceInput = Object.freeze({ readinessResult: readiness, authorityReference, candidateReference, decision: "SELECT_RENDERER_BACKEND" });
  const command = Object.freeze({
    source: "explicit_renderer_backend_selection_decision",
    semanticRole: "STAR_BEAST_RENDERER_EXPLICIT_BACKEND_SELECTION_COMMAND",
    authorityReference,
    candidateReference,
    decision: "SELECT_RENDERER_BACKEND",
    selectionIntent: "SELECT_STAR_BEAST_RENDERER_BACKEND_CANDIDATE",
    readinessReference: readiness,
    authorizationEndpointGovernanceReference: governanceReference,
    authorityConfirmed: true,
    explicit: true,
    commandOnly: true,
    candidateReferenceOnly: true,
    notBackendSelection: true,
    backendSelectionDeferred: true,
    noP71ResultConsumption: true,
    noFrozenEndpointResultConsumption: true,
    noCapabilityProbe: true,
    noDeviceDetection: true,
    noRendererCreation: true,
    noRenderExecution: true,
  });
  const availableCommandResult = Object.freeze({ status: "AVAILABLE", source: "star_beast_renderer_explicit_backend_selection_command", input: sourceInput, readiness, command });
  const input = Object.freeze({ commandResult: availableCommandResult });
  const snapshot = JSON.stringify(input);
  const selected = resolveStarBeastRendererBackendSelection(input);

  assertEqual("valid explicit command is selected", selected.status, "SELECTED");
  assertEqual("selection scope remains reference-only", selected.selection.selectionScope, "STAR_BEAST_RENDERER_BACKEND_CANDIDATE_REFERENCE");
  assertEqual("selection preserves command", selected.selection.sourceCommandReference === command, true);
  assertEqual("selection preserves authority", selected.selection.authorityReference === authorityReference, true);
  assertEqual("selection preserves candidate", selected.selection.candidateReference === candidateReference, true);
  assertEqual("selection preserves readiness", selected.selection.readinessReference === readiness, true);
  assertEqual("selection preserves P71 governance", selected.selection.authorizationEndpointGovernanceReference === governanceReference, true);
  assertEqual("candidate resolution remains deferred", selected.selection.candidateResolutionDeferred, true);
  assertEqual("backend activation remains deferred", selected.selection.backendActivationDeferred, true);
  assertEqual("selection consumes no P71 result", selected.selection.noP71ResultConsumption, true);
  assertEqual("selection runs no capability probe", selected.selection.noCapabilityProbe, true);
  assertEqual("selection runs no device detection", selected.selection.noDeviceDetection, true);
  assertEqual("selection creates no renderer", selected.selection.noRendererCreation, true);
  assertEqual("selection executes no render", selected.selection.noRenderExecution, true);
  assertEqual("selection remains frozen", Object.isFrozen(selected.selection), true);
  assertEqual("result remains frozen", Object.isFrozen(selected), true);
  assertEqual("input unchanged", JSON.stringify(input), snapshot);

  for (const field of [
    "authorityReference",
    "candidateReference",
    "readinessReference",
    "authorizationEndpointGovernanceReference",
  ]) {
    const replacedCommand = Object.freeze({ ...command, [field]: Object.freeze({ ...command[field] }) });
    const result = resolveStarBeastRendererBackendSelection(Object.freeze({ commandResult: Object.freeze({ ...availableCommandResult, command: replacedCommand }) }));
    assertEqual(field + " replacement is rejected", result.reason, "EXPLICIT_BACKEND_SELECTION_COMMAND_INVALID");
  }

  const replacedReadiness = resolveStarBeastRendererBackendSelection(Object.freeze({ commandResult: Object.freeze({ ...availableCommandResult, readiness: Object.freeze({ ...readiness }) }) }));
  assertEqual("replaced readiness is rejected", replacedReadiness.reason, "EXPLICIT_BACKEND_SELECTION_COMMAND_INVALID");
  const replacedInputCandidate = resolveStarBeastRendererBackendSelection(Object.freeze({ commandResult: Object.freeze({ ...availableCommandResult, input: Object.freeze({ ...sourceInput, candidateReference: Object.freeze({ ...candidateReference }) }) }) }));
  assertEqual("replaced input candidate is rejected", replacedInputCandidate.reason, "EXPLICIT_BACKEND_SELECTION_COMMAND_INVALID");
  const notReady = resolveStarBeastRendererBackendSelection(Object.freeze({ commandResult: Object.freeze({ status: "NOT_READY", reason: "BACKEND_CANDIDATE_REFERENCE_REQUIRED" }) }));
  assertEqual("P74 NOT_READY remains not ready", notReady.status, "NOT_READY");
  assertEqual("P74 NOT_READY reason preserved", notReady.sourceCommandReason, "BACKEND_CANDIDATE_REFERENCE_REQUIRED");
  const unavailable = resolveStarBeastRendererBackendSelection(Object.freeze({ commandResult: Object.freeze({ status: "UNAVAILABLE", reason: "BACKEND_SELECTION_READINESS_RESULT_REQUIRED" }) }));
  assertEqual("P74 UNAVAILABLE remains unavailable", unavailable.status, "UNAVAILABLE");
  assertEqual("P74 UNAVAILABLE reason preserved", unavailable.sourceCommandReason, "BACKEND_SELECTION_READINESS_RESULT_REQUIRED");
  const missing = resolveStarBeastRendererBackendSelection(Object.freeze({ commandResult: null }));
  assertEqual("missing P74 result remains unavailable", missing.reason, "EXPLICIT_BACKEND_SELECTION_COMMAND_RESULT_REQUIRED");
}

try { fs.rmSync(tempModulePath, { force: true }); } catch { /* best-effort cleanup */ }
if (failures.length > 0) {
  console.error("\nStar Beast renderer backend selection resolver gate failed:");
  failures.forEach((failure) => console.error("- " + failure));
  process.exit(1);
}
console.log("\nStar Beast renderer backend selection resolver gate passed.");
