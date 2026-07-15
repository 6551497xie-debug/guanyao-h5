import fs from "node:fs";
import path from "node:path";
import process from "node:process";

const rootDir = process.cwd();
const files = Object.freeze({
  p61Type: "src/types/starBeastRendererExecutionUnfreezeReadiness.ts",
  p61Service: "src/services/starBeastRendererExecutionUnfreezeReadinessService.ts",
  p62Type: "src/types/starBeastRendererExplicitExecutionUnfreezeDeclarationCommand.ts",
  p62Service: "src/services/starBeastRendererExplicitExecutionUnfreezeDeclarationCommandService.ts",
  p63Type: "src/types/starBeastRendererExecutionUnfreezeDeclaration.ts",
  p63Service: "src/services/starBeastRendererExecutionUnfreezeDeclarationResolver.ts",
  p64Type: "src/types/starBeastRendererExecutionUnfreezeDeclarationConsumption.ts",
  p64Service: "src/services/starBeastRendererExecutionUnfreezeDeclarationConsumptionService.ts",
  p65Type: "src/types/starBeastRendererExecutionUnfreezeDeclarationEndpoint.ts",
  p65Service: "src/services/starBeastRendererExecutionUnfreezeDeclarationEndpoint.ts",
  p65Protocol: "docs/GUANYAO_STAR_BEAST_RENDERER_EXECUTION_UNFREEZE_DECLARATION_ENDPOINT_PROTOCOL.md",
  p60Protocol: "docs/GUANYAO_STAR_BEAST_RENDERER_IMPLEMENTATION_UNFREEZE_DECLARATION_CHAIN_FREEZE_PROTOCOL.md",
  p66Protocol: "docs/GUANYAO_STAR_BEAST_RENDERER_EXECUTION_UNFREEZE_DECLARATION_CHAIN_FREEZE_PROTOCOL.md",
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
    ["P61 resolver stays owner-only", "resolveStarBeastRendererExecutionUnfreezeReadiness(", files.p61Service],
    ["P62 resolver stays owner-only", "resolveStarBeastRendererExplicitExecutionUnfreezeDeclarationCommand(", files.p62Service],
    ["P63 resolver stays owner-only", "resolveStarBeastRendererExecutionUnfreezeDeclaration(", files.p63Service],
    ["P64 service stays owner-only", "consumeStarBeastRendererExecutionUnfreezeDeclaration(", files.p64Service],
    ["P65 endpoint stays terminal", "resolveStarBeastRendererExecutionUnfreezeDeclarationEndpoint(", files.p65Service],
  ].forEach(([name, symbol, expectedPath]) => assertEqual(name, callSites(symbol), expectedPath));

  const frozenSource = [
    sources.p61Type,
    sources.p61Service,
    sources.p62Type,
    sources.p62Service,
    sources.p63Type,
    sources.p63Service,
    sources.p64Type,
    sources.p64Service,
    sources.p65Type,
    sources.p65Service,
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
  ].forEach((marker) => assertExcludes("frozen execution unfreeze chain has no runtime dependency", frozenSource, marker));

  [
    'readiness: "READY_FOR_EXPLICIT_RENDERER_EXECUTION_UNFREEZE_DECLARATION"',
    'semanticRole: "STAR_BEAST_RENDERER_EXPLICIT_EXECUTION_UNFREEZE_DECLARATION_COMMAND"',
    'semanticRole: "STAR_BEAST_RENDERER_EXECUTION_UNFREEZE_DECLARATION"',
    'semanticRole: "STAR_BEAST_RENDERER_EXECUTION_UNFREEZE_DECLARATION_CONSUMPTION"',
    'semanticRole: "STAR_BEAST_RENDERER_EXECUTION_UNFREEZE_DECLARATION_ENDPOINT"',
    'endpointStatus: "AVAILABLE_FOR_RENDERER_EXECUTION_UNFREEZE_GOVERNANCE_HANDOFF"',
    "noExecutionUnfreezeIssued: true",
    "noP53ResultConsumption: true",
    "noP59ResultConsumption: true",
    "noFrozenEndpointResultConsumption: true",
    "noFinalBackendSelection: true",
    "noRendererCreation: true",
    "noRenderExecution: true",
  ].forEach((marker) => assertIncludes("P61-P65 semantic boundary remains frozen", frozenSource, marker));

  [
    "RC-STAR-BEAST-RENDERER-EXECUTION-UNFREEZE-DECLARATION-CHAIN-FREEZE-P66",
    "EXECUTION UNFREEZE DECLARATION CHAIN FROZEN",
    "P59/P53 opaque governance references",
    "P61 Execution Unfreeze Readiness",
    "P62 Explicit Execution Unfreeze Declaration Command",
    "P63 Execution Unfreeze Declaration",
    "P64 Declaration Consumption",
    "P65 Execution Unfreeze Declaration Endpoint",
    "P65 Result → no consumer before explicit renderer execution protocol",
    "P65 Endpoint Result 是当前执行解冻声明治理链的冻结终止出口",
    "P53 Runtime Authorization Endpoint Result → P54 frozen terminal",
    "P59 Implementation Unfreeze Declaration Endpoint Result → P60 frozen terminal",
    "P65 Execution Unfreeze Declaration Endpoint Result → P66 frozen terminal",
    "未来真实 Renderer 施工必须建立新的独立 Renderer Execution Protocol",
    "P66 不新增或修改业务类型、Service、Resolver、Endpoint、UI、Runtime、Storage 或视觉资产",
    "P67 独立 Execution Protocol Readiness",
    "P67 位于 P66 冻结链之外",
    "P65 的 opaque governance reference",
    "P67 READY 只表示可以进入未来显式 Execution Protocol Authorization",
    "P67 不解除 P54/P60/P66 三重冻结",
  ].forEach((marker) => assertIncludes("P66 freeze protocol", sources.p66Protocol, marker));

  [
    "P66 Execution Unfreeze Declaration Chain Freeze",
    "P65 Result 是当前执行解冻声明治理链的冻结终止出口",
    "独立 Renderer Execution Protocol 建立前不得新增下游消费者",
  ].forEach((marker) => assertIncludes("P65 protocol declares P66 freeze", sources.p65Protocol, marker));

  [
    "P66 Execution Unfreeze Declaration Chain Freeze",
    "P61–P65 已建立并由 P66 冻结为独立的执行解冻声明治理链",
    "P65 Result 是执行解冻声明治理链冻结终止出口",
    "P66 不解除 P54/P60",
  ].forEach((marker) => assertIncludes("P60 protocol records triple freeze", sources.p60Protocol, marker));

  assertIncludes(
    "P66 gate registered",
    packageJson.scripts?.["check:star-beast-renderer-execution-unfreeze-declaration-chain-freeze"] ?? "",
    "node scripts/check-star-beast-renderer-execution-unfreeze-declaration-chain-freeze.mjs",
  );
  assertIncludes(
    "P66 gate in release",
    packageJson.scripts?.["check:release"] ?? "",
    "npm run check:star-beast-renderer-execution-unfreeze-declaration-chain-freeze",
  );
}

if (failures.length > 0) {
  console.error("\nStar Beast renderer execution unfreeze declaration chain freeze gate failed:");
  failures.forEach((failure) => console.error(`- ${failure}`));
  process.exit(1);
}
console.log("\nStar Beast renderer execution unfreeze declaration chain freeze gate passed.");
