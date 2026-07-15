import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import process from "node:process";
import { build } from "esbuild";

const rootDir = process.cwd();
const typePath = path.join(rootDir, "src/types/starBeastRendererExplicitBackendSelectionCommand.ts");
const servicePath = path.join(rootDir, "src/services/starBeastRendererExplicitBackendSelectionCommandService.ts");
const readinessServicePath = path.join(rootDir, "src/services/starBeastRendererBackendSelectionReadinessService.ts");
const protocolPath = path.join(rootDir, "docs/GUANYAO_STAR_BEAST_RENDERER_EXPLICIT_BACKEND_SELECTION_COMMAND_PROTOCOL.md");
const readinessProtocolPath = path.join(rootDir, "docs/GUANYAO_STAR_BEAST_RENDERER_BACKEND_SELECTION_READINESS_PROTOCOL.md");
const typeIndexPath = path.join(rootDir, "src/types/index.ts");
const packagePath = path.join(rootDir, "package.json");
const tempModulePath = path.join(os.tmpdir(), `guanyao-renderer-explicit-backend-selection-command-${process.pid}.mjs`);
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
  ["P74 type", typePath],
  ["P74 service", servicePath],
  ["P73 service", readinessServicePath],
  ["P74 protocol", protocolPath],
  ["P73 protocol", readinessProtocolPath],
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
    'import type { StarBeastRendererBackendCandidateReference } from "./starBeastRendererImplementationUnfreezeReadiness"',
    '"SELECT_RENDERER_BACKEND"',
    "readinessResult: StarBeastRendererBackendSelectionReadinessResult | null",
    "authorityReference: StarBeastRendererBackendSelectionAuthorityReference | null",
    "candidateReference: StarBeastRendererBackendCandidateReference | null",
    "StarBeastRendererExplicitBackendSelectionCommand",
    'semanticRole: "STAR_BEAST_RENDERER_EXPLICIT_BACKEND_SELECTION_COMMAND"',
    'selectionIntent: "SELECT_STAR_BEAST_RENDERER_BACKEND_CANDIDATE"',
    "readinessReference: StarBeastRendererBackendSelectionReadinessReady",
    "authorizationEndpointGovernanceReference:",
    "authorityConfirmed: true",
    "explicit: true",
    "commandOnly: true",
    "candidateReferenceOnly: true",
    "notBackendSelection: true",
    "backendSelectionDeferred: true",
    "noP71ResultConsumption: true",
    "noFrozenEndpointResultConsumption: true",
    "noCapabilityProbe: true",
    "noDeviceDetection: true",
    "noRendererCreation: true",
    "noRenderExecution: true",
    '"BACKEND_SELECTION_AUTHORITY_REFERENCE_REQUIRED"',
    '"BACKEND_CANDIDATE_REFERENCE_REQUIRED"',
    '"EXPLICIT_BACKEND_SELECTION_DECISION_REQUIRED"',
    '"BACKEND_SELECTION_READINESS_RESULT_REQUIRED"',
    '"BACKEND_SELECTION_READINESS_UNAVAILABLE"',
  ].forEach((marker) => assertIncludes("P74 type contract", typeSource, marker));

  [
    "resolveStarBeastRendererExplicitBackendSelectionCommand",
    "const readiness = input.readinessResult",
    "readiness === null",
    'readiness.status === "UNAVAILABLE"',
    "isValidAuthorityReference",
    "isValidCandidateReference",
    'input.decision !== "SELECT_RENDERER_BACKEND"',
    '"STAR_BEAST_RENDERER_BACKEND_SELECTION_AUTHORITY"',
    '"STAR_BEAST_RENDERER_BACKEND_CANDIDATE"',
    '"STAR_BEAST_RENDERER_EXPLICIT_BACKEND_SELECTION_COMMAND"',
    "readinessReference: readiness",
    "readiness.authorizationEndpointGovernanceReference",
    "authorityReference: input.authorityReference",
    "candidateReference: input.candidateReference",
    "commandOnly: true",
    "candidateReferenceOnly: true",
    "notBackendSelection: true",
    "backendSelectionDeferred: true",
    'status: "AVAILABLE"',
  ].forEach((marker) => assertIncludes("P74 service contract", serviceSource, marker));

  [
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
  ].forEach((marker) => assertExcludes("P74 stays command-only", serviceSource, marker));

  [
    "StarBeastRendererExplicitBackendSelectionCommandInput",
    "StarBeastRendererExplicitBackendSelectionCommandResult",
    'from "./starBeastRendererExplicitBackendSelectionCommand"',
  ].forEach((marker) => assertIncludes("type index exports P74", typeIndexSource, marker));

  const sourcePaths = collectTypeScriptSourcePaths(path.join(rootDir, "src"));
  const callSites = (symbol) => sourcePaths
    .filter((filePath) => fs.readFileSync(filePath, "utf8").includes(symbol))
    .map((filePath) => path.relative(rootDir, filePath))
    .sort()
    .join(",");
  assertEqual(
    "P73 resolver remains owner-only",
    callSites("resolveStarBeastRendererBackendSelectionReadiness("),
    "src/services/starBeastRendererBackendSelectionReadinessService.ts",
  );
  assertEqual(
    "P74 resolver has no downstream caller",
    callSites("resolveStarBeastRendererExplicitBackendSelectionCommand("),
    "src/services/starBeastRendererExplicitBackendSelectionCommandService.ts",
  );

  [
    "RC-STAR-BEAST-RENDERER-EXPLICIT-BACKEND-SELECTION-COMMAND-P74",
    "EXPLICIT BACKEND SELECTION COMMAND ONLY",
    "P73 READY_FOR_EXPLICIT_RENDERER_BACKEND_SELECTION",
    "STAR_BEAST_RENDERER_BACKEND_SELECTION_AUTHORITY reference",
    "STAR_BEAST_RENDERER_BACKEND_CANDIDATE opaque reference",
    "explicit SELECT_RENDERER_BACKEND decision",
    "系统不能根据 P73 READY 自动选择技术",
    "P74 不读取候选引用背后的技术名称、能力、设备支持或实现事实",
    "Command 不是正式 Backend Selection，也不是 Renderer Execution",
    "P73 Readiness Result → only P74 Explicit Backend Selection Command",
    "P73 Readiness Resolver → no direct external caller",
    "P74 Command Result → no consumer before P75 formal Backend Selection Resolver",
    "P74 Command Resolver → no direct external caller",
    "P74 不能反向调用 P73，也不能消费 P71 Endpoint Result",
  ].forEach((marker) => assertIncludes("P74 protocol", protocolSource, marker));
  [
    "P73 Readiness Result → only P74 Explicit Backend Selection Command",
    "P73 Readiness Resolver → no direct external caller",
    "P74 只消费调用方提供的 P73 Result",
    "P74 Command Result → no consumer before P75 formal Backend Selection Resolver",
    "P74 Command 只保存主体、决定与不透明候选引用",
  ].forEach((marker) => assertIncludes("P73 permits only P74", readinessProtocolSource, marker));

  assertIncludes(
    "P74 gate registered",
    packageJson.scripts?.["check:star-beast-renderer-explicit-backend-selection-command"] ?? "",
    "node scripts/check-star-beast-renderer-explicit-backend-selection-command.mjs",
  );
  assertIncludes(
    "P74 gate in release",
    packageJson.scripts?.["check:release"] ?? "",
    "npm run check:star-beast-renderer-explicit-backend-selection-command",
  );

  await build({ entryPoints: [servicePath], outfile: tempModulePath, bundle: true, platform: "node", format: "esm", target: "node20", logLevel: "silent" });
  const { resolveStarBeastRendererExplicitBackendSelectionCommand } = await import(`file://${tempModulePath}?t=${Date.now()}`);

  const governanceReference = Object.freeze({ referenceType: "STAR_BEAST_RENDERER_EXECUTION_PROTOCOL_AUTHORIZATION_ENDPOINT_GOVERNANCE", referenceId: "p71:governance" });
  const readinessReady = Object.freeze({ status: "READY", readiness: "READY_FOR_EXPLICIT_RENDERER_BACKEND_SELECTION", authorizationEndpointGovernanceReference: governanceReference });
  const authorityReference = Object.freeze({ referenceType: "STAR_BEAST_RENDERER_BACKEND_SELECTION_AUTHORITY", referenceId: "authority:backend-selection" });
  const candidateReference = Object.freeze({ referenceType: "STAR_BEAST_RENDERER_BACKEND_CANDIDATE", referenceId: "candidate:renderer-backend" });
  const input = Object.freeze({ readinessResult: readinessReady, authorityReference, candidateReference, decision: "SELECT_RENDERER_BACKEND" });
  const snapshot = JSON.stringify(input);
  const available = resolveStarBeastRendererExplicitBackendSelectionCommand(input);

  assertEqual("READY plus explicit decision creates command", available.status, "AVAILABLE");
  assertEqual("command preserves readiness", available.command.readinessReference === readinessReady, true);
  assertEqual("command preserves P71 governance", available.command.authorizationEndpointGovernanceReference === governanceReference, true);
  assertEqual("command preserves authority", available.command.authorityReference === authorityReference, true);
  assertEqual("command preserves candidate ref", available.command.candidateReference === candidateReference, true);
  assertEqual("command preserves decision", available.command.decision, "SELECT_RENDERER_BACKEND");
  assertEqual("command is not selection", available.command.notBackendSelection, true);
  assertEqual("selection remains deferred", available.command.backendSelectionDeferred, true);
  assertEqual("command consumes no P71 result", available.command.noP71ResultConsumption, true);
  assertEqual("command runs no capability probe", available.command.noCapabilityProbe, true);
  assertEqual("command runs no device detection", available.command.noDeviceDetection, true);
  assertEqual("command creates no renderer", available.command.noRendererCreation, true);
  assertEqual("command executes no render", available.command.noRenderExecution, true);
  assertEqual("command is frozen", Object.isFrozen(available.command), true);
  assertEqual("result is frozen", Object.isFrozen(available), true);
  assertEqual("input unchanged", JSON.stringify(input), snapshot);

  const missingAuthority = resolveStarBeastRendererExplicitBackendSelectionCommand(Object.freeze({ ...input, authorityReference: null }));
  assertEqual("missing authority not ready", missingAuthority.reason, "BACKEND_SELECTION_AUTHORITY_REFERENCE_REQUIRED");
  const invalidAuthority = resolveStarBeastRendererExplicitBackendSelectionCommand(Object.freeze({ ...input, authorityReference: Object.freeze({ ...authorityReference, referenceId: " " }) }));
  assertEqual("invalid authority not ready", invalidAuthority.reason, "BACKEND_SELECTION_AUTHORITY_REFERENCE_INVALID");
  const missingCandidate = resolveStarBeastRendererExplicitBackendSelectionCommand(Object.freeze({ ...input, candidateReference: null }));
  assertEqual("missing candidate not ready", missingCandidate.reason, "BACKEND_CANDIDATE_REFERENCE_REQUIRED");
  const invalidCandidate = resolveStarBeastRendererExplicitBackendSelectionCommand(Object.freeze({ ...input, candidateReference: Object.freeze({ ...candidateReference, referenceId: " " }) }));
  assertEqual("invalid candidate not ready", invalidCandidate.reason, "BACKEND_CANDIDATE_REFERENCE_INVALID");
  const missingDecision = resolveStarBeastRendererExplicitBackendSelectionCommand(Object.freeze({ ...input, decision: null }));
  assertEqual("missing explicit decision not ready", missingDecision.reason, "EXPLICIT_BACKEND_SELECTION_DECISION_REQUIRED");
  const unavailable = resolveStarBeastRendererExplicitBackendSelectionCommand(Object.freeze({ ...input, readinessResult: Object.freeze({ status: "UNAVAILABLE", reason: "EXECUTION_PROTOCOL_AUTHORIZATION_ENDPOINT_GOVERNANCE_REFERENCE_REQUIRED" }) }));
  assertEqual("UNAVAILABLE cannot create command", unavailable.reason, "BACKEND_SELECTION_READINESS_UNAVAILABLE");
  assertEqual("UNAVAILABLE preserves source reason", unavailable.sourceReadinessReason, "EXECUTION_PROTOCOL_AUTHORIZATION_ENDPOINT_GOVERNANCE_REFERENCE_REQUIRED");
  const missingReadiness = resolveStarBeastRendererExplicitBackendSelectionCommand(Object.freeze({ ...input, readinessResult: null }));
  assertEqual("missing readiness unavailable", missingReadiness.reason, "BACKEND_SELECTION_READINESS_RESULT_REQUIRED");
}

try { fs.rmSync(tempModulePath, { force: true }); } catch { /* best-effort cleanup */ }
if (failures.length > 0) {
  console.error("\nStar Beast renderer explicit backend selection command gate failed:");
  failures.forEach((failure) => console.error(`- ${failure}`));
  process.exit(1);
}
console.log("\nStar Beast renderer explicit backend selection command gate passed.");
