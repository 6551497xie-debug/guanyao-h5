import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import process from "node:process";
import { build } from "esbuild";

const rootDir = process.cwd();
const typePath = path.join(rootDir, "src/types/starBeastRendererExecutionProtocolReadiness.ts");
const servicePath = path.join(rootDir, "src/services/starBeastRendererExecutionProtocolReadinessService.ts");
const protocolPath = path.join(rootDir, "docs/GUANYAO_STAR_BEAST_RENDERER_EXECUTION_PROTOCOL_READINESS_PROTOCOL.md");
const freezeProtocolPath = path.join(rootDir, "docs/GUANYAO_STAR_BEAST_RENDERER_EXECUTION_UNFREEZE_DECLARATION_CHAIN_FREEZE_PROTOCOL.md");
const typeIndexPath = path.join(rootDir, "src/types/index.ts");
const packagePath = path.join(rootDir, "package.json");
const tempModulePath = path.join(os.tmpdir(), `guanyao-renderer-execution-protocol-readiness-${process.pid}.mjs`);
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
  ["P67 type", typePath],
  ["P67 service", servicePath],
  ["P67 protocol", protocolPath],
  ["P66 freeze protocol", freezeProtocolPath],
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
    "StarBeastRendererExecutionUnfreezeEndpointGovernanceReference",
    'referenceType: "STAR_BEAST_RENDERER_EXECUTION_UNFREEZE_ENDPOINT_GOVERNANCE"',
    'referenceType: "STAR_BEAST_RENDERER_BACKEND_SELECTION_AUTHORITY"',
    'referenceType: "STAR_BEAST_RENDERER_EXECUTION_SLICE"',
    'referenceType: "STAR_BEAST_RENDERER_EXECUTION_FAILURE_STOP"',
    'referenceType: "STAR_BEAST_RENDERER_EXECUTION_PROTOCOL_ROLLBACK"',
    'referenceType: "STAR_BEAST_RENDERER_EXECUTION_PROTOCOL_ACCEPTANCE"',
    "StarBeastRendererExecutionProtocolReadinessInput",
    'readiness: "READY_FOR_EXPLICIT_RENDERER_EXECUTION_PROTOCOL_AUTHORIZATION"',
    "explicitExecutionProtocolAuthorizationRequired: true",
    "executionProtocolAuthorizationDeferred: true",
    "noP65ResultConsumption: true",
    "noFrozenEndpointResultConsumption: true",
    "noBackendSelection: true",
    "noRendererCreation: true",
    "noRenderExecution: true",
    '"EXECUTION_UNFREEZE_ENDPOINT_GOVERNANCE_REFERENCE_REQUIRED"',
    '"BACKEND_SELECTION_AUTHORITY_REFERENCE_REQUIRED"',
    '"EXECUTION_SLICE_REFERENCE_REQUIRED"',
    '"FAILURE_STOP_REFERENCE_REQUIRED"',
    '"EXECUTION_PROTOCOL_ROLLBACK_REFERENCE_REQUIRED"',
    '"EXECUTION_PROTOCOL_ACCEPTANCE_REFERENCE_REQUIRED"',
  ].forEach((marker) => assertIncludes("P67 type contract", typeSource, marker));

  [
    "resolveStarBeastRendererExecutionProtocolReadiness",
    "const endpointGovernanceReference =",
    '"STAR_BEAST_RENDERER_EXECUTION_UNFREEZE_ENDPOINT_GOVERNANCE"',
    "input.backendSelectionAuthorityReference === null",
    "input.executionSliceReference === null",
    "input.failureStopReference === null",
    "input.rollbackReference === null",
    "input.acceptanceReference === null",
    'status: "READY"',
    '"READY_FOR_EXPLICIT_RENDERER_EXECUTION_PROTOCOL_AUTHORIZATION"',
    "noP65ResultConsumption: true",
    "noBackendSelection: true",
    "noRendererCreation: true",
    "noRenderExecution: true",
  ].forEach((marker) => assertIncludes("P67 service contract", serviceSource, marker));

  [
    "StarBeastRendererExecutionUnfreezeDeclarationEndpointResult",
    "resolveStarBeastRendererExecutionUnfreezeDeclarationEndpoint(",
    "resolveStarBeastRendererExecutionUnfreezeDeclarationConsumption(",
    "resolveStarBeastRendererExecutionUnfreezeDeclaration(",
    "resolveStarBeastRendererExplicitExecutionUnfreezeDeclarationCommand(",
    "resolveStarBeastRendererExecutionUnfreezeReadiness(",
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
  ].forEach((marker) => assertExcludes("P67 respects P66 freeze", serviceSource, marker));

  [
    "StarBeastRendererExecutionProtocolReadinessInput",
    "StarBeastRendererExecutionProtocolReadinessResult",
    "StarBeastRendererBackendSelectionAuthorityReference",
    "StarBeastRendererExecutionUnfreezeEndpointGovernanceReference",
    'from "./starBeastRendererExecutionProtocolReadiness"',
  ].forEach((marker) => assertIncludes("type index exports P67", typeIndexSource, marker));

  const sourcePaths = collectTypeScriptSourcePaths(path.join(rootDir, "src"));
  const callSites = sourcePaths
    .filter((filePath) => fs.readFileSync(filePath, "utf8").includes("resolveStarBeastRendererExecutionProtocolReadiness("))
    .map((filePath) => path.relative(rootDir, filePath))
    .sort()
    .join(",");
  assertEqual("P67 resolver has no downstream caller", callSites, "src/services/starBeastRendererExecutionProtocolReadinessService.ts");

  [
    "RC-STAR-BEAST-RENDERER-EXECUTION-PROTOCOL-READINESS-P67",
    "EXECUTION PROTOCOL AUTHORIZATION READINESS ONLY",
    "P65 opaque governance reference",
    "READY_FOR_EXPLICIT_RENDERER_EXECUTION_PROTOCOL_AUTHORIZATION",
    "READY 不是 Authorization，不是 Backend Selection，也不是 Renderer Execution",
    "不导入 `StarBeastRendererExecutionUnfreezeDeclarationEndpointResult`",
    "不解除 P54/P60/P66 三重冻结",
    "P67 Result → no consumer before explicit execution protocol authorization command",
    "P67 不消费 P65 Result，不调用 P61–P65",
    "P67 Readiness Result → only P68 Explicit Execution Protocol Authorization Command",
    "P67 Readiness Resolver → no direct external caller",
    "P68 只消费调用方提供的 P67 Result",
    "P68 Command Result → no consumer before P69 formal Execution Protocol Authorization Resolver",
    "P68 Command 不是正式 Authorization",
  ].forEach((marker) => assertIncludes("P67 protocol", protocolSource, marker));

  [
    "P67 独立 Execution Protocol Readiness",
    "P67 位于 P66 冻结链之外",
    "P65 的 opaque governance reference",
    "P67 READY 只表示可以进入未来显式 Execution Protocol Authorization",
    "P67 不解除 P54/P60/P66 三重冻结",
  ].forEach((marker) => assertIncludes("P66 permits reference-only P67", freezeProtocolSource, marker));

  assertIncludes(
    "P67 gate registered",
    packageJson.scripts?.["check:star-beast-renderer-execution-protocol-readiness"] ?? "",
    "node scripts/check-star-beast-renderer-execution-protocol-readiness.mjs",
  );
  assertIncludes(
    "P67 gate in release",
    packageJson.scripts?.["check:release"] ?? "",
    "npm run check:star-beast-renderer-execution-protocol-readiness",
  );

  await build({ entryPoints: [servicePath], outfile: tempModulePath, bundle: true, platform: "node", format: "esm", target: "node20", logLevel: "silent" });
  const { resolveStarBeastRendererExecutionProtocolReadiness } = await import(`file://${tempModulePath}?t=${Date.now()}`);
  const executionUnfreezeEndpointGovernanceReference = Object.freeze({ referenceType: "STAR_BEAST_RENDERER_EXECUTION_UNFREEZE_ENDPOINT_GOVERNANCE", referenceId: "p65:governance" });
  const backendSelectionAuthorityReference = Object.freeze({ referenceType: "STAR_BEAST_RENDERER_BACKEND_SELECTION_AUTHORITY", referenceId: "authority:backend-selection" });
  const executionSliceReference = Object.freeze({ referenceType: "STAR_BEAST_RENDERER_EXECUTION_SLICE", referenceId: "slice:first-reversible" });
  const failureStopReference = Object.freeze({ referenceType: "STAR_BEAST_RENDERER_EXECUTION_FAILURE_STOP", referenceId: "stop:first-failure" });
  const rollbackReference = Object.freeze({ referenceType: "STAR_BEAST_RENDERER_EXECUTION_PROTOCOL_ROLLBACK", referenceId: "rollback:disable-slice" });
  const acceptanceReference = Object.freeze({ referenceType: "STAR_BEAST_RENDERER_EXECUTION_PROTOCOL_ACCEPTANCE", referenceId: "acceptance:first-slice" });
  const input = Object.freeze({ executionUnfreezeEndpointGovernanceReference, backendSelectionAuthorityReference, executionSliceReference, failureStopReference, rollbackReference, acceptanceReference });
  const snapshot = JSON.stringify(input);
  const ready = resolveStarBeastRendererExecutionProtocolReadiness(input);

  assertEqual("complete governance is ready", ready.status, "READY");
  assertEqual("readiness status stable", ready.readiness, "READY_FOR_EXPLICIT_RENDERER_EXECUTION_PROTOCOL_AUTHORIZATION");
  assertEqual("P65 governance ref preserved", ready.executionUnfreezeEndpointGovernanceReference === executionUnfreezeEndpointGovernanceReference, true);
  assertEqual("backend authority preserved", ready.backendSelectionAuthorityReference === backendSelectionAuthorityReference, true);
  assertEqual("execution slice preserved", ready.executionSliceReference === executionSliceReference, true);
  assertEqual("failure stop preserved", ready.failureStopReference === failureStopReference, true);
  assertEqual("rollback preserved", ready.rollbackReference === rollbackReference, true);
  assertEqual("acceptance preserved", ready.acceptanceReference === acceptanceReference, true);
  assertEqual("P65 result not consumed", ready.noP65ResultConsumption, true);
  assertEqual("no backend selected", ready.noBackendSelection, true);
  assertEqual("no renderer created", ready.noRendererCreation, true);
  assertEqual("no render executed", ready.noRenderExecution, true);
  assertEqual("input unchanged", JSON.stringify(input), snapshot);

  const missingP65 = resolveStarBeastRendererExecutionProtocolReadiness(Object.freeze({ ...input, executionUnfreezeEndpointGovernanceReference: null }));
  assertEqual("missing P65 governance is unavailable", missingP65.status, "UNAVAILABLE");
  assertEqual("missing P65 reason stable", missingP65.reason, "EXECUTION_UNFREEZE_ENDPOINT_GOVERNANCE_REFERENCE_REQUIRED");
  const invalidP65 = resolveStarBeastRendererExecutionProtocolReadiness(Object.freeze({ ...input, executionUnfreezeEndpointGovernanceReference: Object.freeze({ ...executionUnfreezeEndpointGovernanceReference, referenceId: " " }) }));
  assertEqual("invalid P65 governance is unavailable", invalidP65.reason, "EXECUTION_UNFREEZE_ENDPOINT_GOVERNANCE_REFERENCE_INVALID");

  for (const [field, reason] of [
    ["backendSelectionAuthorityReference", "BACKEND_SELECTION_AUTHORITY_REFERENCE_REQUIRED"],
    ["executionSliceReference", "EXECUTION_SLICE_REFERENCE_REQUIRED"],
    ["failureStopReference", "FAILURE_STOP_REFERENCE_REQUIRED"],
    ["rollbackReference", "EXECUTION_PROTOCOL_ROLLBACK_REFERENCE_REQUIRED"],
    ["acceptanceReference", "EXECUTION_PROTOCOL_ACCEPTANCE_REFERENCE_REQUIRED"],
  ]) {
    const result = resolveStarBeastRendererExecutionProtocolReadiness(Object.freeze({ ...input, [field]: null }));
    assertEqual(`${field} missing is not ready`, result.status, "NOT_READY");
    assertEqual(`${field} missing reason stable`, result.reason, reason);
  }
}

try { fs.rmSync(tempModulePath, { force: true }); } catch { /* best-effort cleanup */ }
if (failures.length > 0) {
  console.error("\nStar Beast renderer execution protocol readiness gate failed:");
  failures.forEach((failure) => console.error(`- ${failure}`));
  process.exit(1);
}
console.log("\nStar Beast renderer execution protocol readiness gate passed.");
