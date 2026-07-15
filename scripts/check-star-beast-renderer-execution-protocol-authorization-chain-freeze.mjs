import fs from "node:fs";
import path from "node:path";
import process from "node:process";

const rootDir = process.cwd();
const files = Object.freeze({
  p67Type: "src/types/starBeastRendererExecutionProtocolReadiness.ts",
  p67Service: "src/services/starBeastRendererExecutionProtocolReadinessService.ts",
  p68Type: "src/types/starBeastRendererExplicitExecutionProtocolAuthorizationCommand.ts",
  p68Service: "src/services/starBeastRendererExplicitExecutionProtocolAuthorizationCommandService.ts",
  p69Type: "src/types/starBeastRendererExecutionProtocolAuthorization.ts",
  p69Service: "src/services/starBeastRendererExecutionProtocolAuthorizationResolver.ts",
  p70Type: "src/types/starBeastRendererExecutionProtocolAuthorizationConsumption.ts",
  p70Service: "src/services/starBeastRendererExecutionProtocolAuthorizationConsumptionService.ts",
  p71Type: "src/types/starBeastRendererExecutionProtocolAuthorizationEndpoint.ts",
  p71Service: "src/services/starBeastRendererExecutionProtocolAuthorizationEndpoint.ts",
  p71Protocol: "docs/GUANYAO_STAR_BEAST_RENDERER_EXECUTION_PROTOCOL_AUTHORIZATION_ENDPOINT_PROTOCOL.md",
  p66Protocol: "docs/GUANYAO_STAR_BEAST_RENDERER_EXECUTION_UNFREEZE_DECLARATION_CHAIN_FREEZE_PROTOCOL.md",
  p72Protocol: "docs/GUANYAO_STAR_BEAST_RENDERER_EXECUTION_PROTOCOL_AUTHORIZATION_CHAIN_FREEZE_PROTOCOL.md",
  packageManifest: "package.json",
});
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

const paths = Object.fromEntries(
  Object.entries(files).map(([name, relativePath]) => [name, path.join(rootDir, relativePath)]),
);
for (const [name, filePath] of Object.entries(paths)) {
  if (!fs.existsSync(filePath)) failures.push(`${name} missing=${filePath}`);
  else console.log(`PASS | ${name} file exists`);
}

if (failures.length === 0) {
  const sources = Object.fromEntries(
    Object.entries(paths).map(([name, filePath]) => [name, fs.readFileSync(filePath, "utf8")]),
  );
  const packageJson = JSON.parse(sources.packageManifest);
  const sourcePaths = collectTypeScriptSourcePaths(path.join(rootDir, "src"));
  const callSites = (symbol) => sourcePaths
    .filter((filePath) => fs.readFileSync(filePath, "utf8").includes(symbol))
    .map((filePath) => path.relative(rootDir, filePath))
    .sort()
    .join(",");

  [
    ["P67 resolver stays owner-only", "resolveStarBeastRendererExecutionProtocolReadiness(", files.p67Service],
    ["P68 resolver stays owner-only", "resolveStarBeastRendererExplicitExecutionProtocolAuthorizationCommand(", files.p68Service],
    ["P69 resolver stays owner-only", "resolveStarBeastRendererExecutionProtocolAuthorization(", files.p69Service],
    ["P70 service stays owner-only", "consumeStarBeastRendererExecutionProtocolAuthorization(", files.p70Service],
    ["P71 endpoint stays terminal", "resolveStarBeastRendererExecutionProtocolAuthorizationEndpoint(", files.p71Service],
  ].forEach(([name, symbol, expectedPath]) => assertEqual(name, callSites(symbol), expectedPath));

  const frozenSource = [
    sources.p67Type,
    sources.p67Service,
    sources.p68Type,
    sources.p68Service,
    sources.p69Type,
    sources.p69Service,
    sources.p70Type,
    sources.p70Service,
    sources.p71Type,
    sources.p71Service,
  ].join("\n");

  [
    'from "three"',
    'from "@react-three',
    'from "react"',
    "HTMLCanvasElement",
    "CanvasRenderingContext",
    "WebGLRenderingContext",
    "navigator.",
    "window.",
    "document.",
    "requestAnimationFrame",
    "drawImage(",
    "getContext(",
    "/pages/",
    "/components/",
    "localStorage",
    "sessionStorage",
    "fetch(",
    "StarBeastRendererImplementationAuthorizationEndpointResult",
    "StarBeastRendererImplementationUnfreezeDeclarationEndpointResult",
    "StarBeastRendererExecutionUnfreezeDeclarationEndpointResult",
  ].forEach((marker) => assertExcludes("frozen execution protocol authorization chain has no runtime dependency", frozenSource, marker));

  [
    'readiness: "READY_FOR_EXPLICIT_RENDERER_EXECUTION_PROTOCOL_AUTHORIZATION"',
    'semanticRole: "STAR_BEAST_RENDERER_EXPLICIT_EXECUTION_PROTOCOL_AUTHORIZATION_COMMAND"',
    'semanticRole: "STAR_BEAST_RENDERER_EXECUTION_PROTOCOL_AUTHORIZATION"',
    'authorizationStatus: "AUTHORIZED_FOR_RENDERER_EXECUTION_PROTOCOL"',
    'semanticRole: "STAR_BEAST_RENDERER_EXECUTION_PROTOCOL_AUTHORIZATION_CONSUMPTION"',
    'semanticRole: "STAR_BEAST_RENDERER_EXECUTION_PROTOCOL_AUTHORIZATION_ENDPOINT"',
    'endpointStatus: "AVAILABLE_FOR_RENDERER_EXECUTION_PROTOCOL_GOVERNANCE_HANDOFF"',
    "noAutomaticExecution: true",
    "noP65ResultConsumption: true",
    "noFrozenEndpointResultConsumption: true",
    "noBackendSelection: true",
    "noRendererCreation: true",
    "noRenderExecution: true",
  ].forEach((marker) => assertIncludes("P67-P71 semantic boundary remains frozen", frozenSource, marker));

  [
    "RC-STAR-BEAST-RENDERER-EXECUTION-PROTOCOL-AUTHORIZATION-CHAIN-FREEZE-P72",
    "EXECUTION PROTOCOL AUTHORIZATION CHAIN FROZEN",
    "P65 opaque governance reference",
    "P67 Execution Protocol Readiness",
    "P68 Explicit Execution Protocol Authorization Command",
    "P69 Execution Protocol Authorization",
    "P70 Authorization Consumption",
    "P71 Authorization Endpoint",
    "P71 Result → no consumer after P72 freeze",
    "P71 Endpoint Result 是执行协议授权治理链的冻结终止出口",
    "P72 不解除 P54、P60 或 P66",
    "P53 Runtime Authorization Endpoint Result → P54 frozen terminal",
    "P59 Implementation Unfreeze Declaration Endpoint Result → P60 frozen terminal",
    "P65 Execution Unfreeze Declaration Endpoint Result → P66 frozen terminal",
    "P71 Execution Protocol Authorization Endpoint Result → P72 frozen terminal",
    "未来真实 Renderer 执行必须建立新的独立 Renderer Execution Activation Protocol",
    "P72 不新增或修改业务类型、Service、Resolver、Endpoint、UI、Runtime、Storage 或视觉资产",
  ].forEach((marker) => assertIncludes("P72 freeze protocol", sources.p72Protocol, marker));

  [
    "P72 Execution Protocol Authorization Chain Freeze",
    "P71 Endpoint Result 是执行协议授权治理链的冻结终止出口",
    "P72 冻结后禁止任何下游消费",
    "P72 不解除 P54/P60/P66",
  ].forEach((marker) => assertIncludes("P71 protocol declares P72 freeze", sources.p71Protocol, marker));

  [
    "P72 Execution Protocol Authorization Chain Freeze",
    "P67–P71 已建立并由 P72 冻结为独立的执行协议授权治理链",
    "P71 Result 是执行协议授权治理链冻结终止出口",
    "P72 不解除 P54/P60/P66",
  ].forEach((marker) => assertIncludes("P66 protocol records four frozen terminals", sources.p66Protocol, marker));

  assertIncludes(
    "P72 gate registered",
    packageJson.scripts?.["check:star-beast-renderer-execution-protocol-authorization-chain-freeze"] ?? "",
    "node scripts/check-star-beast-renderer-execution-protocol-authorization-chain-freeze.mjs",
  );
  assertIncludes(
    "P72 gate in release",
    packageJson.scripts?.["check:release"] ?? "",
    "npm run check:star-beast-renderer-execution-protocol-authorization-chain-freeze",
  );
}

if (failures.length > 0) {
  console.error("\nStar Beast renderer execution protocol authorization chain freeze gate failed:");
  failures.forEach((failure) => console.error(`- ${failure}`));
  process.exit(1);
}
console.log("\nStar Beast renderer execution protocol authorization chain freeze gate passed.");
