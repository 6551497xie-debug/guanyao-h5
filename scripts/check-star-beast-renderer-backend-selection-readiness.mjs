import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import process from "node:process";
import { build } from "esbuild";

const rootDir = process.cwd();
const typePath = path.join(rootDir, "src/types/starBeastRendererBackendSelectionReadiness.ts");
const servicePath = path.join(rootDir, "src/services/starBeastRendererBackendSelectionReadinessService.ts");
const protocolPath = path.join(rootDir, "docs/GUANYAO_STAR_BEAST_RENDERER_BACKEND_SELECTION_READINESS_PROTOCOL.md");
const freezeProtocolPath = path.join(rootDir, "docs/GUANYAO_STAR_BEAST_RENDERER_EXECUTION_PROTOCOL_AUTHORIZATION_CHAIN_FREEZE_PROTOCOL.md");
const typeIndexPath = path.join(rootDir, "src/types/index.ts");
const packagePath = path.join(rootDir, "package.json");
const tempModulePath = path.join(os.tmpdir(), `guanyao-renderer-backend-selection-readiness-${process.pid}.mjs`);
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
  ["P73 type", typePath],
  ["P73 service", servicePath],
  ["P73 protocol", protocolPath],
  ["P72 freeze protocol", freezeProtocolPath],
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
    "StarBeastRendererExecutionProtocolAuthorizationEndpointGovernanceReference",
    'referenceType: "STAR_BEAST_RENDERER_EXECUTION_PROTOCOL_AUTHORIZATION_ENDPOINT_GOVERNANCE"',
    "StarBeastRendererBackendSelectionReadinessInput",
    "authorizationEndpointGovernanceReference:",
    'readiness: "READY_FOR_EXPLICIT_RENDERER_BACKEND_SELECTION"',
    "explicitBackendSelectionRequired: true",
    "backendSelectionDeferred: true",
    "governanceReferenceOnly: true",
    "noP71ResultConsumption: true",
    "noFrozenEndpointResultConsumption: true",
    "noBackendCandidate: true",
    "noBackendSelection: true",
    "noCapabilityProbe: true",
    "noDeviceDetection: true",
    "noRendererCreation: true",
    "noRenderExecution: true",
    '"EXECUTION_PROTOCOL_AUTHORIZATION_ENDPOINT_GOVERNANCE_REFERENCE_REQUIRED"',
    '"EXECUTION_PROTOCOL_AUTHORIZATION_ENDPOINT_GOVERNANCE_REFERENCE_INVALID"',
  ].forEach((marker) => assertIncludes("P73 type contract", typeSource, marker));

  [
    "resolveStarBeastRendererBackendSelectionReadiness",
    "const governanceReference =",
    "input.authorizationEndpointGovernanceReference",
    '"STAR_BEAST_RENDERER_EXECUTION_PROTOCOL_AUTHORIZATION_ENDPOINT_GOVERNANCE"',
    'status: "UNAVAILABLE"',
    'status: "READY"',
    '"READY_FOR_EXPLICIT_RENDERER_BACKEND_SELECTION"',
    "authorizationEndpointGovernanceReference: governanceReference",
    "explicitBackendSelectionRequired: true",
    "backendSelectionDeferred: true",
    "noP71ResultConsumption: true",
    "noBackendCandidate: true",
    "noBackendSelection: true",
    "noCapabilityProbe: true",
    "noDeviceDetection: true",
    "noRendererCreation: true",
    "noRenderExecution: true",
  ].forEach((marker) => assertIncludes("P73 service contract", serviceSource, marker));

  [
    "StarBeastRendererExecutionProtocolAuthorizationEndpointResult",
    "resolveStarBeastRendererExecutionProtocolAuthorizationEndpoint(",
    "consumeStarBeastRendererExecutionProtocolAuthorization(",
    "resolveStarBeastRendererExecutionProtocolAuthorization(",
    "resolveStarBeastRendererExplicitExecutionProtocolAuthorizationCommand(",
    "resolveStarBeastRendererExecutionProtocolReadiness(",
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
  ].forEach((marker) => assertExcludes("P73 remains readiness-only", `${typeSource}\n${serviceSource}`, marker));

  [
    "StarBeastRendererBackendSelectionReadinessInput",
    "StarBeastRendererBackendSelectionReadinessResult",
    "StarBeastRendererExecutionProtocolAuthorizationEndpointGovernanceReference",
    'from "./starBeastRendererBackendSelectionReadiness"',
  ].forEach((marker) => assertIncludes("type index exports P73", typeIndexSource, marker));

  const sourcePaths = collectTypeScriptSourcePaths(path.join(rootDir, "src"));
  const callSites = sourcePaths
    .filter((filePath) => fs.readFileSync(filePath, "utf8").includes("resolveStarBeastRendererBackendSelectionReadiness("))
    .map((filePath) => path.relative(rootDir, filePath))
    .sort()
    .join(",");
  assertEqual("P73 resolver has no downstream caller", callSites, "src/services/starBeastRendererBackendSelectionReadinessService.ts");

  [
    "RC-STAR-BEAST-RENDERER-BACKEND-SELECTION-READINESS-P73",
    "BACKEND SELECTION READINESS ONLY",
    "P71 opaque governance reference",
    "READY_FOR_EXPLICIT_RENDERER_BACKEND_SELECTION",
    "P73 只判断是否可以进入未来显式技术选择",
    "READY 表示“可以请求选择技术”，不是已经选择技术",
    "不导入 `StarBeastRendererExecutionProtocolAuthorizationEndpointResult`",
    "不消费 P53/P59/P65/P71 冻结 Endpoint Result",
    "不解除 P54/P60/P66/P72 四重冻结",
    "P71 opaque governance reference → only P73 readiness input",
    "P73 Result → no consumer before explicit renderer backend selection command",
    "P73 不产生候选技术，不选择 Backend，不运行能力或设备探测",
  ].forEach((marker) => assertIncludes("P73 protocol", protocolSource, marker));

  [
    "P73 独立 Backend Selection Readiness",
    "P73 位于 P72 冻结链之外",
    "P71 的 opaque governance reference",
    "P73 READY 只表示可以进入未来显式 Renderer Backend Selection",
    "P73 不解除 P54/P60/P66/P72 四重冻结",
  ].forEach((marker) => assertIncludes("P72 permits reference-only P73", freezeProtocolSource, marker));

  assertIncludes(
    "P73 gate registered",
    packageJson.scripts?.["check:star-beast-renderer-backend-selection-readiness"] ?? "",
    "node scripts/check-star-beast-renderer-backend-selection-readiness.mjs",
  );
  assertIncludes(
    "P73 gate in release",
    packageJson.scripts?.["check:release"] ?? "",
    "npm run check:star-beast-renderer-backend-selection-readiness",
  );

  await build({ entryPoints: [servicePath], outfile: tempModulePath, bundle: true, platform: "node", format: "esm", target: "node20", logLevel: "silent" });
  const { resolveStarBeastRendererBackendSelectionReadiness } = await import(`file://${tempModulePath}?t=${Date.now()}`);
  const governanceReference = Object.freeze({ referenceType: "STAR_BEAST_RENDERER_EXECUTION_PROTOCOL_AUTHORIZATION_ENDPOINT_GOVERNANCE", referenceId: "p71:governance" });
  const input = Object.freeze({ authorizationEndpointGovernanceReference: governanceReference });
  const snapshot = JSON.stringify(input);
  const ready = resolveStarBeastRendererBackendSelectionReadiness(input);

  assertEqual("valid governance is ready", ready.status, "READY");
  assertEqual("readiness status stable", ready.readiness, "READY_FOR_EXPLICIT_RENDERER_BACKEND_SELECTION");
  assertEqual("P71 governance ref preserved", ready.authorizationEndpointGovernanceReference === governanceReference, true);
  assertEqual("explicit selection remains required", ready.explicitBackendSelectionRequired, true);
  assertEqual("selection remains deferred", ready.backendSelectionDeferred, true);
  assertEqual("P71 result not consumed", ready.noP71ResultConsumption, true);
  assertEqual("no backend candidate produced", ready.noBackendCandidate, true);
  assertEqual("no backend selected", ready.noBackendSelection, true);
  assertEqual("no capability probe", ready.noCapabilityProbe, true);
  assertEqual("no device detection", ready.noDeviceDetection, true);
  assertEqual("no renderer created", ready.noRendererCreation, true);
  assertEqual("no render executed", ready.noRenderExecution, true);
  assertEqual("ready result frozen", Object.isFrozen(ready), true);
  assertEqual("input unchanged", JSON.stringify(input), snapshot);

  const missing = resolveStarBeastRendererBackendSelectionReadiness(Object.freeze({ authorizationEndpointGovernanceReference: null }));
  assertEqual("missing governance is unavailable", missing.status, "UNAVAILABLE");
  assertEqual("missing governance reason stable", missing.reason, "EXECUTION_PROTOCOL_AUTHORIZATION_ENDPOINT_GOVERNANCE_REFERENCE_REQUIRED");
  const invalidType = resolveStarBeastRendererBackendSelectionReadiness(Object.freeze({ authorizationEndpointGovernanceReference: Object.freeze({ referenceType: "INVALID", referenceId: "p71:governance" }) }));
  assertEqual("invalid governance type rejected", invalidType.reason, "EXECUTION_PROTOCOL_AUTHORIZATION_ENDPOINT_GOVERNANCE_REFERENCE_INVALID");
  const invalidId = resolveStarBeastRendererBackendSelectionReadiness(Object.freeze({ authorizationEndpointGovernanceReference: Object.freeze({ ...governanceReference, referenceId: " " }) }));
  assertEqual("blank governance id rejected", invalidId.reason, "EXECUTION_PROTOCOL_AUTHORIZATION_ENDPOINT_GOVERNANCE_REFERENCE_INVALID");
}

try { fs.rmSync(tempModulePath, { force: true }); } catch { /* best-effort cleanup */ }
if (failures.length > 0) {
  console.error("\nStar Beast renderer backend selection readiness gate failed:");
  failures.forEach((failure) => console.error(`- ${failure}`));
  process.exit(1);
}
console.log("\nStar Beast renderer backend selection readiness gate passed.");
