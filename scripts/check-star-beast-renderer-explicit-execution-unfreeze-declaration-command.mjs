import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import process from "node:process";
import { build } from "esbuild";

const rootDir = process.cwd();
const typePath = path.join(rootDir, "src/types/starBeastRendererExplicitExecutionUnfreezeDeclarationCommand.ts");
const servicePath = path.join(rootDir, "src/services/starBeastRendererExplicitExecutionUnfreezeDeclarationCommandService.ts");
const readinessServicePath = path.join(rootDir, "src/services/starBeastRendererExecutionUnfreezeReadinessService.ts");
const protocolPath = path.join(rootDir, "docs/GUANYAO_STAR_BEAST_RENDERER_EXPLICIT_EXECUTION_UNFREEZE_DECLARATION_COMMAND_PROTOCOL.md");
const readinessProtocolPath = path.join(rootDir, "docs/GUANYAO_STAR_BEAST_RENDERER_EXECUTION_UNFREEZE_READINESS_PROTOCOL.md");
const typeIndexPath = path.join(rootDir, "src/types/index.ts");
const packagePath = path.join(rootDir, "package.json");
const tempModulePath = path.join(os.tmpdir(), `guanyao-renderer-explicit-execution-unfreeze-command-${process.pid}.mjs`);
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
  ["P62 type", typePath],
  ["P62 service", servicePath],
  ["P61 service", readinessServicePath],
  ["P62 protocol", protocolPath],
  ["P61 protocol", readinessProtocolPath],
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
    "StarBeastRendererExecutionUnfreezeAuthorityReference",
    'referenceType: "STAR_BEAST_RENDERER_EXECUTION_UNFREEZE_AUTHORITY"',
    '"DECLARE_EXECUTION_UNFREEZE"',
    "readinessResult: StarBeastRendererExecutionUnfreezeReadinessResult | null",
    "StarBeastRendererExplicitExecutionUnfreezeDeclarationCommand",
    'semanticRole: "STAR_BEAST_RENDERER_EXPLICIT_EXECUTION_UNFREEZE_DECLARATION_COMMAND"',
    'declarationIntent: "DECLARE_STAR_BEAST_RENDERER_EXECUTION_UNFREEZE"',
    "readinessReference: StarBeastRendererExecutionUnfreezeReadinessReady",
    "unfreezeDeclarationEndpointGovernanceReference:",
    "authorizationEndpointGovernanceReference:",
    "executionScopeReference:",
    "runtimeBoundaryReference:",
    "rollbackStrategyReference:",
    "acceptanceScopeReference:",
    "commandOnly: true",
    "notExecutionUnfreezeDeclaration: true",
    "noExecutionUnfreezeIssued: true",
    "noP53ResultConsumption: true",
    "noP59ResultConsumption: true",
    "noFrozenEndpointResultConsumption: true",
    "noFinalBackendSelection: true",
    "noRendererCreation: true",
    "noRenderExecution: true",
    '"EXECUTION_UNFREEZE_READINESS_NOT_READY"',
    '"EXECUTION_UNFREEZE_AUTHORITY_REFERENCE_REQUIRED"',
    '"EXECUTION_UNFREEZE_AUTHORITY_REFERENCE_INVALID"',
    '"EXPLICIT_DECLARE_EXECUTION_UNFREEZE_DECISION_REQUIRED"',
    '"EXECUTION_UNFREEZE_READINESS_RESULT_REQUIRED"',
    '"EXECUTION_UNFREEZE_READINESS_UNAVAILABLE"',
  ].forEach((marker) => assertIncludes("P62 type contract", typeSource, marker));

  [
    "resolveStarBeastRendererExplicitExecutionUnfreezeDeclarationCommand",
    "const readiness = input.readinessResult",
    "readiness === null",
    'readiness.status === "UNAVAILABLE"',
    'readiness.status === "NOT_READY"',
    "isValidAuthorityReference",
    'input.decision !== "DECLARE_EXECUTION_UNFREEZE"',
    "readinessReference: readiness",
    "readiness.unfreezeDeclarationEndpointGovernanceReference",
    "readiness.authorizationEndpointGovernanceReference",
    "readiness.executionScopeReference",
    "readiness.runtimeBoundaryReference",
    "readiness.rollbackStrategyReference",
    "readiness.acceptanceScopeReference",
    'status: "AVAILABLE"',
  ].forEach((marker) => assertIncludes("P62 service contract", serviceSource, marker));

  [
    "resolveStarBeastRendererExecutionUnfreezeReadiness(",
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
  ].forEach((marker) => assertExcludes("P62 stays command-only", serviceSource, marker));

  [
    "StarBeastRendererExecutionUnfreezeAuthorityReference",
    "StarBeastRendererExplicitExecutionUnfreezeDeclarationCommandInput",
    "StarBeastRendererExplicitExecutionUnfreezeDeclarationCommandResult",
    'from "./starBeastRendererExplicitExecutionUnfreezeDeclarationCommand"',
  ].forEach((marker) => assertIncludes("type index exports P62", typeIndexSource, marker));

  const sourcePaths = collectTypeScriptSourcePaths(path.join(rootDir, "src"));
  const callSites = (symbol) => sourcePaths
    .filter((filePath) => fs.readFileSync(filePath, "utf8").includes(symbol))
    .map((filePath) => path.relative(rootDir, filePath))
    .sort()
    .join(",");
  assertEqual(
    "P61 resolver remains owner-only",
    callSites("resolveStarBeastRendererExecutionUnfreezeReadiness("),
    "src/services/starBeastRendererExecutionUnfreezeReadinessService.ts",
  );
  assertEqual(
    "P62 resolver has no downstream caller",
    callSites("resolveStarBeastRendererExplicitExecutionUnfreezeDeclarationCommand("),
    "src/services/starBeastRendererExplicitExecutionUnfreezeDeclarationCommandService.ts",
  );

  [
    "RC-STAR-BEAST-RENDERER-EXPLICIT-EXECUTION-UNFREEZE-DECLARATION-COMMAND-P62",
    "EXPLICIT EXECUTION UNFREEZE DECLARATION COMMAND",
    "P61 READY_FOR_EXPLICIT_RENDERER_EXECUTION_UNFREEZE_DECLARATION",
    "explicit DECLARE_EXECUTION_UNFREEZE decision",
    "系统不能根据 READY 自动执行解冻",
    "Command 不是正式 Execution Unfreeze Declaration，也不是实际 Execution Unfreeze",
    "P61 Readiness Result → only P62 Explicit Execution Unfreeze Declaration Command",
    "P62 只消费调用方提供的 P61 Result",
    "P62 Command Result → only P63 Execution Unfreeze Declaration Resolver",
    "P62 Command Resolver → no direct external caller",
    "P63 只消费调用方提供的 P62 Result",
  ].forEach((marker) => assertIncludes("P62 protocol", protocolSource, marker));
  [
    "P61 Execution Unfreeze Readiness Result → only P62 Explicit Execution Unfreeze Declaration Command",
    "P61 Readiness Resolver → no direct external caller",
    "P62 只消费调用方提供的 P61 Result",
  ].forEach((marker) => assertIncludes("P61 permits only P62", readinessProtocolSource, marker));

  assertIncludes(
    "P62 gate registered",
    packageJson.scripts?.["check:star-beast-renderer-explicit-execution-unfreeze-declaration-command"] ?? "",
    "node scripts/check-star-beast-renderer-explicit-execution-unfreeze-declaration-command.mjs",
  );
  assertIncludes(
    "P62 gate in release",
    packageJson.scripts?.["check:release"] ?? "",
    "npm run check:star-beast-renderer-explicit-execution-unfreeze-declaration-command",
  );

  await build({ entryPoints: [servicePath], outfile: tempModulePath, bundle: true, platform: "node", format: "esm", target: "node20", logLevel: "silent" });
  const { resolveStarBeastRendererExplicitExecutionUnfreezeDeclarationCommand } = await import(`file://${tempModulePath}?t=${Date.now()}`);

  const unfreezeDeclarationEndpointGovernanceReference = Object.freeze({ referenceType: "STAR_BEAST_RENDERER_UNFREEZE_DECLARATION_ENDPOINT_GOVERNANCE", referenceId: "p59:governance" });
  const authorizationEndpointGovernanceReference = Object.freeze({ referenceType: "STAR_BEAST_RENDERER_AUTHORIZATION_ENDPOINT_GOVERNANCE", referenceId: "p53:governance" });
  const executionScopeReference = Object.freeze({ referenceType: "STAR_BEAST_RENDERER_EXECUTION_SCOPE", referenceId: "execution:first-slice" });
  const runtimeBoundaryReference = Object.freeze({ referenceType: "STAR_BEAST_RENDERER_RUNTIME_BOUNDARY", referenceId: "runtime:isolated" });
  const rollbackStrategyReference = Object.freeze({ referenceType: "STAR_BEAST_RENDERER_EXECUTION_ROLLBACK_STRATEGY", referenceId: "rollback:disable-renderer" });
  const acceptanceScopeReference = Object.freeze({ referenceType: "STAR_BEAST_RENDERER_EXECUTION_ACCEPTANCE_SCOPE", referenceId: "acceptance:first-slice" });
  const readinessReady = Object.freeze({ status: "READY", readiness: "READY_FOR_EXPLICIT_RENDERER_EXECUTION_UNFREEZE_DECLARATION", unfreezeDeclarationEndpointGovernanceReference, authorizationEndpointGovernanceReference, executionScopeReference, runtimeBoundaryReference, rollbackStrategyReference, acceptanceScopeReference });
  const authorityReference = Object.freeze({ referenceType: "STAR_BEAST_RENDERER_EXECUTION_UNFREEZE_AUTHORITY", referenceId: "authority:product-owner" });
  const input = Object.freeze({ readinessResult: readinessReady, authorityReference, decision: "DECLARE_EXECUTION_UNFREEZE" });
  const snapshot = JSON.stringify(input);
  const available = resolveStarBeastRendererExplicitExecutionUnfreezeDeclarationCommand(input);

  assertEqual("READY plus explicit decision creates command", available.status, "AVAILABLE");
  assertEqual("command preserves readiness", available.command.readinessReference === readinessReady, true);
  assertEqual("command preserves P59 governance", available.command.unfreezeDeclarationEndpointGovernanceReference === unfreezeDeclarationEndpointGovernanceReference, true);
  assertEqual("command preserves P53 governance", available.command.authorizationEndpointGovernanceReference === authorizationEndpointGovernanceReference, true);
  assertEqual("command preserves execution scope", available.command.executionScopeReference === executionScopeReference, true);
  assertEqual("command preserves runtime boundary", available.command.runtimeBoundaryReference === runtimeBoundaryReference, true);
  assertEqual("command preserves rollback", available.command.rollbackStrategyReference === rollbackStrategyReference, true);
  assertEqual("command preserves acceptance", available.command.acceptanceScopeReference === acceptanceScopeReference, true);
  assertEqual("command preserves authority", available.command.authorityReference === authorityReference, true);
  assertEqual("command is not declaration", available.command.notExecutionUnfreezeDeclaration, true);
  assertEqual("command issues no execution unfreeze", available.command.noExecutionUnfreezeIssued, true);
  assertEqual("command consumes no P53 result", available.command.noP53ResultConsumption, true);
  assertEqual("command consumes no P59 result", available.command.noP59ResultConsumption, true);
  assertEqual("command selects no backend", available.command.noFinalBackendSelection, true);
  assertEqual("command creates no renderer", available.command.noRendererCreation, true);
  assertEqual("command executes no render", available.command.noRenderExecution, true);
  assertEqual("command is frozen", Object.isFrozen(available.command), true);
  assertEqual("result is frozen", Object.isFrozen(available), true);
  assertEqual("input unchanged", JSON.stringify(input), snapshot);

  const missingAuthority = resolveStarBeastRendererExplicitExecutionUnfreezeDeclarationCommand(Object.freeze({ ...input, authorityReference: null }));
  assertEqual("missing authority not ready", missingAuthority.reason, "EXECUTION_UNFREEZE_AUTHORITY_REFERENCE_REQUIRED");
  const invalidAuthority = resolveStarBeastRendererExplicitExecutionUnfreezeDeclarationCommand(Object.freeze({ ...input, authorityReference: Object.freeze({ referenceType: "STAR_BEAST_RENDERER_EXECUTION_UNFREEZE_AUTHORITY", referenceId: " " }) }));
  assertEqual("invalid authority not ready", invalidAuthority.reason, "EXECUTION_UNFREEZE_AUTHORITY_REFERENCE_INVALID");
  const missingDecision = resolveStarBeastRendererExplicitExecutionUnfreezeDeclarationCommand(Object.freeze({ ...input, decision: null }));
  assertEqual("missing explicit decision not ready", missingDecision.reason, "EXPLICIT_DECLARE_EXECUTION_UNFREEZE_DECISION_REQUIRED");
  const notReady = resolveStarBeastRendererExplicitExecutionUnfreezeDeclarationCommand(Object.freeze({ ...input, readinessResult: Object.freeze({ status: "NOT_READY", reason: "RUNTIME_BOUNDARY_REFERENCE_REQUIRED" }) }));
  assertEqual("NOT_READY cannot create command", notReady.reason, "EXECUTION_UNFREEZE_READINESS_NOT_READY");
  const unavailable = resolveStarBeastRendererExplicitExecutionUnfreezeDeclarationCommand(Object.freeze({ ...input, readinessResult: Object.freeze({ status: "UNAVAILABLE", reason: "UNFREEZE_DECLARATION_ENDPOINT_GOVERNANCE_REFERENCE_REQUIRED" }) }));
  assertEqual("UNAVAILABLE cannot create command", unavailable.reason, "EXECUTION_UNFREEZE_READINESS_UNAVAILABLE");
  const missingReadiness = resolveStarBeastRendererExplicitExecutionUnfreezeDeclarationCommand(Object.freeze({ ...input, readinessResult: null }));
  assertEqual("missing readiness unavailable", missingReadiness.reason, "EXECUTION_UNFREEZE_READINESS_RESULT_REQUIRED");
}

try { fs.rmSync(tempModulePath, { force: true }); } catch { /* best-effort cleanup */ }
if (failures.length > 0) {
  console.error("\nStar Beast renderer explicit execution unfreeze declaration command gate failed:");
  failures.forEach((failure) => console.error(`- ${failure}`));
  process.exit(1);
}
console.log("\nStar Beast renderer explicit execution unfreeze declaration command gate passed.");
