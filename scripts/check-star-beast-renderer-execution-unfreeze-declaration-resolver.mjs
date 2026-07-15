import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import process from "node:process";
import { build } from "esbuild";

const rootDir = process.cwd();
const typePath = path.join(rootDir, "src/types/starBeastRendererExecutionUnfreezeDeclaration.ts");
const servicePath = path.join(rootDir, "src/services/starBeastRendererExecutionUnfreezeDeclarationResolver.ts");
const commandServicePath = path.join(rootDir, "src/services/starBeastRendererExplicitExecutionUnfreezeDeclarationCommandService.ts");
const protocolPath = path.join(rootDir, "docs/GUANYAO_STAR_BEAST_RENDERER_EXECUTION_UNFREEZE_DECLARATION_PROTOCOL.md");
const commandProtocolPath = path.join(rootDir, "docs/GUANYAO_STAR_BEAST_RENDERER_EXPLICIT_EXECUTION_UNFREEZE_DECLARATION_COMMAND_PROTOCOL.md");
const typeIndexPath = path.join(rootDir, "src/types/index.ts");
const packagePath = path.join(rootDir, "package.json");
const tempModulePath = path.join(os.tmpdir(), `guanyao-renderer-execution-unfreeze-declaration-${process.pid}.mjs`);
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
  ["P63 type", typePath],
  ["P63 resolver", servicePath],
  ["P62 service", commandServicePath],
  ["P63 protocol", protocolPath],
  ["P62 protocol", commandProtocolPath],
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
  const commandProtocolSource = fs.readFileSync(commandProtocolPath, "utf8");
  const typeIndexSource = fs.readFileSync(typeIndexPath, "utf8");
  const packageJson = JSON.parse(fs.readFileSync(packagePath, "utf8"));

  [
    "StarBeastRendererExecutionUnfreezeDeclarationInput",
    "commandResult: StarBeastRendererExplicitExecutionUnfreezeDeclarationCommandResult | null",
    "StarBeastRendererExecutionUnfreezeDeclaration",
    'semanticRole: "STAR_BEAST_RENDERER_EXECUTION_UNFREEZE_DECLARATION"',
    'declarationStatus: "DECLARED_FOR_RENDERER_EXECUTION_UNFREEZE_PROTOCOL"',
    'declarationScope: "STAR_BEAST_RENDERER_EXECUTION_UNFREEZE_PROTOCOL"',
    "sourceCommandReference:",
    "authorityReference:",
    "readinessReference:",
    "unfreezeDeclarationEndpointGovernanceReference:",
    "authorizationEndpointGovernanceReference:",
    "executionScopeReference:",
    "runtimeBoundaryReference:",
    "rollbackStrategyReference:",
    "acceptanceScopeReference:",
    'executionUnfreezeDecision: "DECLARE_EXECUTION_UNFREEZE"',
    "explicitAuthorityConfirmed: true",
    "declarationOnly: true",
    "executionUnfreezeDeferred: true",
    "noExecutionUnfreezeIssued: true",
    "noP53ResultConsumption: true",
    "noP59ResultConsumption: true",
    "noFrozenEndpointResultConsumption: true",
    "noFinalBackendSelection: true",
    "noRendererCreation: true",
    "noRenderExecution: true",
    'status: "DECLARED"',
    '"EXPLICIT_EXECUTION_UNFREEZE_DECLARATION_COMMAND_NOT_READY"',
    '"EXPLICIT_EXECUTION_UNFREEZE_DECLARATION_COMMAND_INVALID"',
    '"EXPLICIT_EXECUTION_UNFREEZE_DECLARATION_COMMAND_RESULT_REQUIRED"',
    '"EXPLICIT_EXECUTION_UNFREEZE_DECLARATION_COMMAND_UNAVAILABLE"',
  ].forEach((marker) => assertIncludes("P63 type contract", typeSource, marker));

  [
    "resolveStarBeastRendererExecutionUnfreezeDeclaration",
    "const commandResult = input.commandResult",
    "commandResult === null",
    'commandResult.status === "UNAVAILABLE"',
    'commandResult.status === "NOT_READY"',
    "const isValidExplicitCommand =",
    'command.source === "explicit_renderer_execution_unfreeze_decision"',
    'command.decision === "DECLARE_EXECUTION_UNFREEZE"',
    "command.readinessReference === readiness",
    "command.unfreezeDeclarationEndpointGovernanceReference ===",
    "command.authorizationEndpointGovernanceReference ===",
    "command.executionScopeReference === readiness.executionScopeReference",
    "command.runtimeBoundaryReference === readiness.runtimeBoundaryReference",
    "command.rollbackStrategyReference === readiness.rollbackStrategyReference",
    "command.acceptanceScopeReference === readiness.acceptanceScopeReference",
    '"STAR_BEAST_RENDERER_EXECUTION_UNFREEZE_DECLARATION"',
    "sourceCommandReference: command",
    "executionUnfreezeDeferred: true",
    "noExecutionUnfreezeIssued: true",
    'status: "DECLARED"',
  ].forEach((marker) => assertIncludes("P63 resolver contract", serviceSource, marker));

  [
    "resolveStarBeastRendererExplicitExecutionUnfreezeDeclarationCommand(",
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
  ].forEach((marker) => assertExcludes("P63 stays declaration-only", serviceSource, marker));

  [
    "StarBeastRendererExecutionUnfreezeDeclaration",
    "StarBeastRendererExecutionUnfreezeDeclarationInput",
    "StarBeastRendererExecutionUnfreezeDeclarationResult",
    "StarBeastRendererExecutionUnfreezeDeclarationUnavailableReason",
    'from "./starBeastRendererExecutionUnfreezeDeclaration"',
  ].forEach((marker) => assertIncludes("type index exports P63", typeIndexSource, marker));

  const sourcePaths = collectTypeScriptSourcePaths(path.join(rootDir, "src"));
  const callSites = (symbol) => sourcePaths
    .filter((filePath) => fs.readFileSync(filePath, "utf8").includes(symbol))
    .map((filePath) => path.relative(rootDir, filePath))
    .sort()
    .join(",");
  assertEqual(
    "P62 resolver remains owner-only",
    callSites("resolveStarBeastRendererExplicitExecutionUnfreezeDeclarationCommand("),
    "src/services/starBeastRendererExplicitExecutionUnfreezeDeclarationCommandService.ts",
  );
  assertEqual(
    "P63 resolver has no downstream caller",
    callSites("resolveStarBeastRendererExecutionUnfreezeDeclaration("),
    "src/services/starBeastRendererExecutionUnfreezeDeclarationResolver.ts",
  );

  [
    "RC-STAR-BEAST-RENDERER-EXECUTION-UNFREEZE-DECLARATION-RESOLVER-P63",
    "EXECUTION UNFREEZE DECLARATION",
    "P62 Explicit Execution Unfreeze Declaration Command Result",
    "Declaration 不是实际 Execution Unfreeze，不解除 P54/P60 双冻结",
    "P63 只消费调用方提供的 P62 Result",
    "DECLARED_FOR_RENDERER_EXECUTION_UNFREEZE_PROTOCOL",
    "P62 Command Result → only P63 Execution Unfreeze Declaration Resolver",
    "P63 Declaration Result → only P64 Declaration Consumption",
    "P63 Declaration Resolver → no direct external caller",
    "P64 只消费调用方提供的 P63 Result",
    "P63 不消费 P53/P59 Endpoint Result",
  ].forEach((marker) => assertIncludes("P63 protocol", protocolSource, marker));
  [
    "P62 Command Result → only P63 Execution Unfreeze Declaration Resolver",
    "P62 Command Resolver → no direct external caller",
    "P63 只消费调用方提供的 P62 Result",
  ].forEach((marker) => assertIncludes("P62 permits only P63", commandProtocolSource, marker));

  assertIncludes(
    "P63 gate registered",
    packageJson.scripts?.["check:star-beast-renderer-execution-unfreeze-declaration-resolver"] ?? "",
    "node scripts/check-star-beast-renderer-execution-unfreeze-declaration-resolver.mjs",
  );
  assertIncludes(
    "P63 gate in release",
    packageJson.scripts?.["check:release"] ?? "",
    "npm run check:star-beast-renderer-execution-unfreeze-declaration-resolver",
  );

  await build({ entryPoints: [servicePath], outfile: tempModulePath, bundle: true, platform: "node", format: "esm", target: "node20", logLevel: "silent" });
  const { resolveStarBeastRendererExecutionUnfreezeDeclaration } = await import(`file://${tempModulePath}?t=${Date.now()}`);

  const unfreezeDeclarationEndpointGovernanceReference = Object.freeze({ referenceId: "p59:governance" });
  const authorizationEndpointGovernanceReference = Object.freeze({ referenceId: "p53:governance" });
  const executionScopeReference = Object.freeze({ referenceId: "execution:first-slice" });
  const runtimeBoundaryReference = Object.freeze({ referenceId: "runtime:isolated" });
  const rollbackStrategyReference = Object.freeze({ referenceId: "rollback:disable-renderer" });
  const acceptanceScopeReference = Object.freeze({ referenceId: "acceptance:first-slice" });
  const readiness = Object.freeze({ status: "READY", unfreezeDeclarationEndpointGovernanceReference, authorizationEndpointGovernanceReference, executionScopeReference, runtimeBoundaryReference, rollbackStrategyReference, acceptanceScopeReference });
  const authorityReference = Object.freeze({ referenceType: "STAR_BEAST_RENDERER_EXECUTION_UNFREEZE_AUTHORITY", referenceId: "authority:product-owner" });
  const command = Object.freeze({
    source: "explicit_renderer_execution_unfreeze_decision",
    semanticRole: "STAR_BEAST_RENDERER_EXPLICIT_EXECUTION_UNFREEZE_DECLARATION_COMMAND",
    authorityReference,
    decision: "DECLARE_EXECUTION_UNFREEZE",
    declarationIntent: "DECLARE_STAR_BEAST_RENDERER_EXECUTION_UNFREEZE",
    readinessReference: readiness,
    unfreezeDeclarationEndpointGovernanceReference,
    authorizationEndpointGovernanceReference,
    executionScopeReference,
    runtimeBoundaryReference,
    rollbackStrategyReference,
    acceptanceScopeReference,
    authorityConfirmed: true,
    explicit: true,
    commandOnly: true,
    notExecutionUnfreezeDeclaration: true,
    noExecutionUnfreezeIssued: true,
    noP53ResultConsumption: true,
    noP59ResultConsumption: true,
    noFrozenEndpointResultConsumption: true,
  });
  const commandResult = Object.freeze({ status: "AVAILABLE", readiness, command });
  const input = Object.freeze({ commandResult });
  const snapshot = JSON.stringify(input);
  const declared = resolveStarBeastRendererExecutionUnfreezeDeclaration(input);

  assertEqual("valid P62 command is declared", declared.status, "DECLARED");
  assertEqual("declaration preserves command", declared.declaration.sourceCommandReference === command, true);
  assertEqual("declaration preserves authority", declared.declaration.authorityReference === authorityReference, true);
  assertEqual("declaration preserves readiness", declared.declaration.readinessReference === readiness, true);
  assertEqual("declaration preserves P59 governance", declared.declaration.unfreezeDeclarationEndpointGovernanceReference === unfreezeDeclarationEndpointGovernanceReference, true);
  assertEqual("declaration preserves P53 governance", declared.declaration.authorizationEndpointGovernanceReference === authorizationEndpointGovernanceReference, true);
  assertEqual("declaration preserves scope", declared.declaration.executionScopeReference === executionScopeReference, true);
  assertEqual("declaration preserves boundary", declared.declaration.runtimeBoundaryReference === runtimeBoundaryReference, true);
  assertEqual("declaration preserves rollback", declared.declaration.rollbackStrategyReference === rollbackStrategyReference, true);
  assertEqual("declaration preserves acceptance", declared.declaration.acceptanceScopeReference === acceptanceScopeReference, true);
  assertEqual("declaration defers execution unfreeze", declared.declaration.executionUnfreezeDeferred, true);
  assertEqual("declaration issues no execution unfreeze", declared.declaration.noExecutionUnfreezeIssued, true);
  assertEqual("declaration consumes no P53 result", declared.declaration.noP53ResultConsumption, true);
  assertEqual("declaration consumes no P59 result", declared.declaration.noP59ResultConsumption, true);
  assertEqual("declaration selects no backend", declared.declaration.noFinalBackendSelection, true);
  assertEqual("declaration creates no renderer", declared.declaration.noRendererCreation, true);
  assertEqual("declaration executes no render", declared.declaration.noRenderExecution, true);
  assertEqual("declaration frozen", Object.isFrozen(declared.declaration), true);
  assertEqual("result frozen", Object.isFrozen(declared), true);
  assertEqual("input unchanged", JSON.stringify(input), snapshot);

  const invalid = resolveStarBeastRendererExecutionUnfreezeDeclaration(Object.freeze({ commandResult: Object.freeze({ status: "AVAILABLE", readiness, command: Object.freeze({ ...command, runtimeBoundaryReference: Object.freeze({ referenceId: "runtime:replaced" }) }) }) }));
  assertEqual("inconsistent command not ready", invalid.reason, "EXPLICIT_EXECUTION_UNFREEZE_DECLARATION_COMMAND_INVALID");
  const notReady = resolveStarBeastRendererExecutionUnfreezeDeclaration(Object.freeze({ commandResult: Object.freeze({ status: "NOT_READY", reason: "EXECUTION_UNFREEZE_READINESS_NOT_READY" }) }));
  assertEqual("P62 NOT_READY remains not ready", notReady.reason, "EXPLICIT_EXECUTION_UNFREEZE_DECLARATION_COMMAND_NOT_READY");
  const unavailable = resolveStarBeastRendererExecutionUnfreezeDeclaration(Object.freeze({ commandResult: Object.freeze({ status: "UNAVAILABLE", reason: "EXECUTION_UNFREEZE_READINESS_UNAVAILABLE" }) }));
  assertEqual("P62 UNAVAILABLE remains unavailable", unavailable.reason, "EXPLICIT_EXECUTION_UNFREEZE_DECLARATION_COMMAND_UNAVAILABLE");
  const missing = resolveStarBeastRendererExecutionUnfreezeDeclaration(Object.freeze({ commandResult: null }));
  assertEqual("missing P62 result unavailable", missing.reason, "EXPLICIT_EXECUTION_UNFREEZE_DECLARATION_COMMAND_RESULT_REQUIRED");
}

try { fs.rmSync(tempModulePath, { force: true }); } catch { /* best-effort cleanup */ }
if (failures.length > 0) {
  console.error("\nStar Beast renderer execution unfreeze declaration resolver gate failed:");
  failures.forEach((failure) => console.error(`- ${failure}`));
  process.exit(1);
}
console.log("\nStar Beast renderer execution unfreeze declaration resolver gate passed.");
