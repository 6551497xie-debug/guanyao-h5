import fs from "node:fs";
import path from "node:path";
import process from "node:process";

const rootDir = process.cwd();
const files = Object.freeze({
  p55Type: "src/types/starBeastRendererImplementationUnfreezeReadiness.ts",
  p55Service: "src/services/starBeastRendererImplementationUnfreezeReadinessService.ts",
  p56Type: "src/types/starBeastRendererExplicitImplementationUnfreezeDeclarationCommand.ts",
  p56Service: "src/services/starBeastRendererExplicitImplementationUnfreezeDeclarationCommandService.ts",
  p57Type: "src/types/starBeastRendererImplementationUnfreezeDeclaration.ts",
  p57Service: "src/services/starBeastRendererImplementationUnfreezeDeclarationResolver.ts",
  p58Type: "src/types/starBeastRendererImplementationUnfreezeDeclarationConsumption.ts",
  p58Service: "src/services/starBeastRendererImplementationUnfreezeDeclarationConsumptionService.ts",
  p59Type: "src/types/starBeastRendererImplementationUnfreezeDeclarationEndpoint.ts",
  p59Service: "src/services/starBeastRendererImplementationUnfreezeDeclarationEndpoint.ts",
  p59Protocol: "docs/GUANYAO_STAR_BEAST_RENDERER_IMPLEMENTATION_UNFREEZE_DECLARATION_ENDPOINT_PROTOCOL.md",
  p54Protocol: "docs/GUANYAO_STAR_BEAST_RENDERER_IMPLEMENTATION_AUTHORIZATION_CHAIN_FREEZE_PROTOCOL.md",
  p60Protocol: "docs/GUANYAO_STAR_BEAST_RENDERER_IMPLEMENTATION_UNFREEZE_DECLARATION_CHAIN_FREEZE_PROTOCOL.md",
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

const paths = Object.fromEntries(Object.entries(files).map(([name, relativePath]) => [name, path.join(rootDir, relativePath)]));
for (const [name, filePath] of Object.entries(paths)) {
  if (!fs.existsSync(filePath)) failures.push(`${name} missing=${filePath}`);
  else console.log(`PASS | ${name} file exists`);
}

if (failures.length === 0) {
  const sources = Object.fromEntries(Object.entries(paths).map(([name, filePath]) => [name, fs.readFileSync(filePath, "utf8")]));
  const packageJson = JSON.parse(sources.packageManifest);
  const sourcePaths = collectTypeScriptSourcePaths(path.join(rootDir, "src"));
  const callSites = (symbol) => sourcePaths
    .filter((filePath) => fs.readFileSync(filePath, "utf8").includes(symbol))
    .map((filePath) => path.relative(rootDir, filePath))
    .sort()
    .join(",");

  [
    ["P55 resolver stays owner-only", "resolveStarBeastRendererImplementationUnfreezeReadiness(", files.p55Service],
    ["P56 resolver stays owner-only", "resolveStarBeastRendererExplicitImplementationUnfreezeDeclarationCommand(", files.p56Service],
    ["P57 resolver stays owner-only", "resolveStarBeastRendererImplementationUnfreezeDeclaration(", files.p57Service],
    ["P58 service stays owner-only", "consumeStarBeastRendererImplementationUnfreezeDeclaration(", files.p58Service],
    ["P59 endpoint stays terminal", "resolveStarBeastRendererImplementationUnfreezeDeclarationEndpoint(", files.p59Service],
  ].forEach(([name, symbol, expectedPath]) => assertEqual(name, callSites(symbol), expectedPath));

  const frozenSource = [
    sources.p55Type,
    sources.p55Service,
    sources.p56Type,
    sources.p56Service,
    sources.p57Type,
    sources.p57Service,
    sources.p58Type,
    sources.p58Service,
    sources.p59Type,
    sources.p59Service,
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
  ].forEach((marker) => assertExcludes("frozen unfreeze governance chain has no execution dependency", frozenSource, marker));

  [
    'readiness: "READY_FOR_EXPLICIT_IMPLEMENTATION_UNFREEZE_DECLARATION"',
    'semanticRole: "STAR_BEAST_RENDERER_EXPLICIT_IMPLEMENTATION_UNFREEZE_DECLARATION_COMMAND"',
    'semanticRole: "STAR_BEAST_RENDERER_IMPLEMENTATION_UNFREEZE_DECLARATION"',
    'semanticRole: "STAR_BEAST_RENDERER_IMPLEMENTATION_UNFREEZE_DECLARATION_CONSUMPTION"',
    'semanticRole: "STAR_BEAST_RENDERER_IMPLEMENTATION_UNFREEZE_DECLARATION_ENDPOINT"',
    'endpointStatus: "AVAILABLE_FOR_IMPLEMENTATION_UNFREEZE_GOVERNANCE_HANDOFF"',
    "noUnfreezeIssued: true",
    "noFinalBackendSelection: true",
    "noRendererCreation: true",
    "noRenderExecution: true",
  ].forEach((marker) => assertIncludes("P55-P59 semantic boundary remains frozen", frozenSource, marker));

  [
    "RC-STAR-BEAST-RENDERER-IMPLEMENTATION-UNFREEZE-DECLARATION-CHAIN-FREEZE-P60",
    "IMPLEMENTATION UNFREEZE DECLARATION CHAIN FROZEN",
    "P53 terminal governance reference",
    "P55 Implementation Unfreeze Readiness",
    "P56 Explicit Unfreeze Declaration Command",
    "P57 Implementation Unfreeze Declaration",
    "P58 Declaration Consumption",
    "P59 Unfreeze Declaration Endpoint",
    "P59 Result → no consumer before explicit execution unfreeze",
    "P59 Endpoint Result 是当前解冻声明治理链的冻结终止出口",
    "P53 Runtime Authorization Endpoint Result → still frozen terminal",
    "P55–P59 Declaration Governance Chain → separate frozen terminal at P59",
    "未来真实 Renderer 施工必须先建立新的独立执行解冻协议",
    "P60 不新增或修改业务类型、Service、Resolver、Endpoint、UI、Runtime、Storage 或视觉资产",
    "P61 Execution Unfreeze Readiness Extension",
    "P61 位于 P60 冻结链之外",
    "P61 不消费 P59/P53 Result",
    "READY 只允许进入未来主体显式执行解冻声明流程",
  ].forEach((marker) => assertIncludes("P60 freeze protocol", sources.p60Protocol, marker));

  [
    "P60 Unfreeze Declaration Chain Freeze",
    "P59 Result 是当前解冻声明治理链的冻结终止出口",
    "执行解冻前不得新增下游消费者",
  ].forEach((marker) => assertIncludes("P59 protocol declares P60 freeze", sources.p59Protocol, marker));

  [
    "P60 Declaration Governance Chain Freeze",
    "P55–P59 已建立并冻结为独立的解冻声明治理链",
    "P53 Result 仍是实现授权 Runtime 链冻结终止出口",
    "P59 Result 是解冻声明治理链冻结终止出口",
  ].forEach((marker) => assertIncludes("P54 protocol records double freeze", sources.p54Protocol, marker));

  assertIncludes(
    "P60 gate registered",
    packageJson.scripts?.["check:star-beast-renderer-implementation-unfreeze-declaration-chain-freeze"] ?? "",
    "node scripts/check-star-beast-renderer-implementation-unfreeze-declaration-chain-freeze.mjs",
  );
  assertIncludes(
    "P60 gate in release",
    packageJson.scripts?.["check:release"] ?? "",
    "npm run check:star-beast-renderer-implementation-unfreeze-declaration-chain-freeze",
  );
}

if (failures.length > 0) {
  console.error("\nStar Beast renderer implementation unfreeze declaration chain freeze gate failed:");
  failures.forEach((failure) => console.error(`- ${failure}`));
  process.exit(1);
}
console.log("\nStar Beast renderer implementation unfreeze declaration chain freeze gate passed.");
