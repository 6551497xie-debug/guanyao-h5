import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import process from "node:process";
import { build } from "esbuild";

const rootDir = process.cwd();
const typePath = path.join(rootDir, "src/types/starBeastRendererExecutionUnfreezeReadiness.ts");
const servicePath = path.join(rootDir, "src/services/starBeastRendererExecutionUnfreezeReadinessService.ts");
const protocolPath = path.join(rootDir, "docs/GUANYAO_STAR_BEAST_RENDERER_EXECUTION_UNFREEZE_READINESS_PROTOCOL.md");
const freezeProtocolPath = path.join(rootDir, "docs/GUANYAO_STAR_BEAST_RENDERER_IMPLEMENTATION_UNFREEZE_DECLARATION_CHAIN_FREEZE_PROTOCOL.md");
const typeIndexPath = path.join(rootDir, "src/types/index.ts");
const packagePath = path.join(rootDir, "package.json");
const tempModulePath = path.join(os.tmpdir(), `guanyao-renderer-execution-unfreeze-readiness-${process.pid}.mjs`);
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
  ["P61 type", typePath],
  ["P61 service", servicePath],
  ["P61 protocol", protocolPath],
  ["P60 freeze protocol", freezeProtocolPath],
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
  const freezeProtocolSource = fs.readFileSync(freezeProtocolPath, "utf8");
  const typeIndexSource = fs.readFileSync(typeIndexPath, "utf8");
  const packageJson = JSON.parse(fs.readFileSync(packagePath, "utf8"));

  [
    "StarBeastRendererUnfreezeDeclarationEndpointGovernanceReference",
    'referenceType: "STAR_BEAST_RENDERER_UNFREEZE_DECLARATION_ENDPOINT_GOVERNANCE"',
    "StarBeastRendererAuthorizationEndpointGovernanceReference",
    'referenceType: "STAR_BEAST_RENDERER_EXECUTION_SCOPE"',
    'referenceType: "STAR_BEAST_RENDERER_RUNTIME_BOUNDARY"',
    'referenceType: "STAR_BEAST_RENDERER_EXECUTION_ROLLBACK_STRATEGY"',
    'referenceType: "STAR_BEAST_RENDERER_EXECUTION_ACCEPTANCE_SCOPE"',
    "StarBeastRendererExecutionUnfreezeReadinessInput",
    'readiness: "READY_FOR_EXPLICIT_RENDERER_EXECUTION_UNFREEZE_DECLARATION"',
    "explicitExecutionUnfreezeDeclarationRequired: true",
    "executionUnfreezeDeferred: true",
    "noP53ResultConsumption: true",
    "noP59ResultConsumption: true",
    "noFrozenEndpointResultConsumption: true",
    "noFinalBackendSelection: true",
    "noRendererCreation: true",
    "noRenderExecution: true",
    '"UNFREEZE_DECLARATION_ENDPOINT_GOVERNANCE_REFERENCE_REQUIRED"',
    '"AUTHORIZATION_ENDPOINT_GOVERNANCE_REFERENCE_REQUIRED"',
    '"EXECUTION_SCOPE_REFERENCE_REQUIRED"',
    '"RUNTIME_BOUNDARY_REFERENCE_REQUIRED"',
    '"ROLLBACK_STRATEGY_REFERENCE_REQUIRED"',
    '"EXECUTION_ACCEPTANCE_SCOPE_REFERENCE_REQUIRED"',
  ].forEach((marker) => assertIncludes("P61 type contract", typeSource, marker));

  [
    "resolveStarBeastRendererExecutionUnfreezeReadiness",
    "const unfreezeGovernanceReference =",
    "const authorizationGovernanceReference =",
    '"STAR_BEAST_RENDERER_UNFREEZE_DECLARATION_ENDPOINT_GOVERNANCE"',
    '"STAR_BEAST_RENDERER_AUTHORIZATION_ENDPOINT_GOVERNANCE"',
    "input.executionScopeReference === null",
    "input.runtimeBoundaryReference === null",
    "input.rollbackStrategyReference === null",
    "input.acceptanceScopeReference === null",
    'status: "READY"',
    '"READY_FOR_EXPLICIT_RENDERER_EXECUTION_UNFREEZE_DECLARATION"',
    "noP53ResultConsumption: true",
    "noP59ResultConsumption: true",
    "noRenderExecution: true",
  ].forEach((marker) => assertIncludes("P61 service contract", serviceSource, marker));

  [
    "StarBeastRendererImplementationAuthorizationEndpointResult",
    "StarBeastRendererImplementationUnfreezeDeclarationEndpointResult",
    "resolveStarBeastRendererImplementationAuthorizationEndpoint(",
    "resolveStarBeastRendererImplementationUnfreezeDeclarationEndpoint(",
    "resolveStarBeastRendererImplementationUnfreezeReadiness(",
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
  ].forEach((marker) => assertExcludes("P61 respects double freeze", serviceSource, marker));

  [
    "StarBeastRendererExecutionUnfreezeReadinessInput",
    "StarBeastRendererExecutionUnfreezeReadinessResult",
    "StarBeastRendererUnfreezeDeclarationEndpointGovernanceReference",
    "StarBeastRendererRuntimeBoundaryReference",
    'from "./starBeastRendererExecutionUnfreezeReadiness"',
  ].forEach((marker) => assertIncludes("type index exports P61", typeIndexSource, marker));

  const sourcePaths = collectTypeScriptSourcePaths(path.join(rootDir, "src"));
  const callSites = sourcePaths
    .filter((filePath) => fs.readFileSync(filePath, "utf8").includes("resolveStarBeastRendererExecutionUnfreezeReadiness("))
    .map((filePath) => path.relative(rootDir, filePath))
    .sort()
    .join(",");
  assertEqual("P61 resolver has no downstream caller", callSites, "src/services/starBeastRendererExecutionUnfreezeReadinessService.ts");

  [
    "RC-STAR-BEAST-RENDERER-EXECUTION-UNFREEZE-READINESS-P61",
    "EXECUTION UNFREEZE READINESS",
    "P59 terminal governance reference",
    "P53 terminal governance reference",
    "READY_FOR_EXPLICIT_RENDERER_EXECUTION_UNFREEZE_DECLARATION",
    "READY 不是 Execution Unfreeze，不是 Backend Selection，也不是 Renderer Implementation",
    "P61 不导入、复制、拼接或消费两个冻结 Endpoint Result",
    "系统不得根据 READY 自动执行解冻",
    "P61 不修改 P39–P60，不解除 P54/P60 双重冻结",
    "P61 Execution Unfreeze Readiness Result → only P62 Explicit Execution Unfreeze Declaration Command",
    "P61 Readiness Resolver → no direct external caller",
    "P62 只消费调用方提供的 P61 Result",
  ].forEach((marker) => assertIncludes("P61 protocol", protocolSource, marker));
  [
    "P61 Execution Unfreeze Readiness Extension",
    "P61 位于 P60 冻结链之外",
    "P61 不消费 P59/P53 Result",
    "READY 只允许进入未来主体显式执行解冻声明流程",
  ].forEach((marker) => assertIncludes("P60 permits reference-only P61", freezeProtocolSource, marker));

  assertIncludes(
    "P61 gate registered",
    packageJson.scripts?.["check:star-beast-renderer-execution-unfreeze-readiness"] ?? "",
    "node scripts/check-star-beast-renderer-execution-unfreeze-readiness.mjs",
  );
  assertIncludes(
    "P61 gate in release",
    packageJson.scripts?.["check:release"] ?? "",
    "npm run check:star-beast-renderer-execution-unfreeze-readiness",
  );

  await build({ entryPoints: [servicePath], outfile: tempModulePath, bundle: true, platform: "node", format: "esm", target: "node20", logLevel: "silent" });
  const { resolveStarBeastRendererExecutionUnfreezeReadiness } = await import(`file://${tempModulePath}?t=${Date.now()}`);
  const unfreezeDeclarationEndpointGovernanceReference = Object.freeze({ referenceType: "STAR_BEAST_RENDERER_UNFREEZE_DECLARATION_ENDPOINT_GOVERNANCE", referenceId: "p59:governance" });
  const authorizationEndpointGovernanceReference = Object.freeze({ referenceType: "STAR_BEAST_RENDERER_AUTHORIZATION_ENDPOINT_GOVERNANCE", referenceId: "p53:governance" });
  const executionScopeReference = Object.freeze({ referenceType: "STAR_BEAST_RENDERER_EXECUTION_SCOPE", referenceId: "execution:first-slice" });
  const runtimeBoundaryReference = Object.freeze({ referenceType: "STAR_BEAST_RENDERER_RUNTIME_BOUNDARY", referenceId: "runtime:isolated" });
  const rollbackStrategyReference = Object.freeze({ referenceType: "STAR_BEAST_RENDERER_EXECUTION_ROLLBACK_STRATEGY", referenceId: "rollback:disable-renderer" });
  const acceptanceScopeReference = Object.freeze({ referenceType: "STAR_BEAST_RENDERER_EXECUTION_ACCEPTANCE_SCOPE", referenceId: "acceptance:first-slice" });
  const input = Object.freeze({ unfreezeDeclarationEndpointGovernanceReference, authorizationEndpointGovernanceReference, executionScopeReference, runtimeBoundaryReference, rollbackStrategyReference, acceptanceScopeReference });
  const snapshot = JSON.stringify(input);
  const ready = resolveStarBeastRendererExecutionUnfreezeReadiness(input);

  assertEqual("complete references are ready", ready.status, "READY");
  assertEqual("readiness status stable", ready.readiness, "READY_FOR_EXPLICIT_RENDERER_EXECUTION_UNFREEZE_DECLARATION");
  assertEqual("P59 governance ref preserved", ready.unfreezeDeclarationEndpointGovernanceReference === unfreezeDeclarationEndpointGovernanceReference, true);
  assertEqual("P53 governance ref preserved", ready.authorizationEndpointGovernanceReference === authorizationEndpointGovernanceReference, true);
  assertEqual("execution scope preserved", ready.executionScopeReference === executionScopeReference, true);
  assertEqual("runtime boundary preserved", ready.runtimeBoundaryReference === runtimeBoundaryReference, true);
  assertEqual("rollback preserved", ready.rollbackStrategyReference === rollbackStrategyReference, true);
  assertEqual("acceptance preserved", ready.acceptanceScopeReference === acceptanceScopeReference, true);
  assertEqual("P53 result not consumed", ready.noP53ResultConsumption, true);
  assertEqual("P59 result not consumed", ready.noP59ResultConsumption, true);
  assertEqual("no backend selected", ready.noFinalBackendSelection, true);
  assertEqual("no renderer created", ready.noRendererCreation, true);
  assertEqual("no render executed", ready.noRenderExecution, true);
  assertEqual("input unchanged", JSON.stringify(input), snapshot);

  const missingP59 = resolveStarBeastRendererExecutionUnfreezeReadiness(Object.freeze({ ...input, unfreezeDeclarationEndpointGovernanceReference: null }));
  assertEqual("missing P59 governance is unavailable", missingP59.status, "UNAVAILABLE");
  assertEqual("missing P59 reason stable", missingP59.reason, "UNFREEZE_DECLARATION_ENDPOINT_GOVERNANCE_REFERENCE_REQUIRED");
  const missingP53 = resolveStarBeastRendererExecutionUnfreezeReadiness(Object.freeze({ ...input, authorizationEndpointGovernanceReference: null }));
  assertEqual("missing P53 governance is unavailable", missingP53.reason, "AUTHORIZATION_ENDPOINT_GOVERNANCE_REFERENCE_REQUIRED");
  const missingScope = resolveStarBeastRendererExecutionUnfreezeReadiness(Object.freeze({ ...input, executionScopeReference: null }));
  assertEqual("missing execution scope not ready", missingScope.reason, "EXECUTION_SCOPE_REFERENCE_REQUIRED");
  const missingBoundary = resolveStarBeastRendererExecutionUnfreezeReadiness(Object.freeze({ ...input, runtimeBoundaryReference: null }));
  assertEqual("missing runtime boundary not ready", missingBoundary.reason, "RUNTIME_BOUNDARY_REFERENCE_REQUIRED");
  const missingRollback = resolveStarBeastRendererExecutionUnfreezeReadiness(Object.freeze({ ...input, rollbackStrategyReference: null }));
  assertEqual("missing rollback not ready", missingRollback.reason, "ROLLBACK_STRATEGY_REFERENCE_REQUIRED");
  const missingAcceptance = resolveStarBeastRendererExecutionUnfreezeReadiness(Object.freeze({ ...input, acceptanceScopeReference: null }));
  assertEqual("missing acceptance not ready", missingAcceptance.reason, "EXECUTION_ACCEPTANCE_SCOPE_REFERENCE_REQUIRED");
}

try { fs.rmSync(tempModulePath, { force: true }); } catch { /* best-effort cleanup */ }
if (failures.length > 0) {
  console.error("\nStar Beast renderer execution unfreeze readiness gate failed:");
  failures.forEach((failure) => console.error(`- ${failure}`));
  process.exit(1);
}
console.log("\nStar Beast renderer execution unfreeze readiness gate passed.");
