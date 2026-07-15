import fs from "node:fs";
import path from "node:path";
import process from "node:process";

const rootDir = process.cwd();

const files = Object.freeze({
  p45Type: "src/types/starBeastRendererReadiness.ts",
  p45Service: "src/services/starBeastRendererReadinessService.ts",
  p46Type: "src/types/starBeastRendererImplementationCandidate.ts",
  p46Service: "src/services/starBeastRendererImplementationCandidateService.ts",
  p47Type: "src/types/starBeastRendererBackendCapability.ts",
  p47Service: "src/services/starBeastRendererBackendCapabilityService.ts",
  p48Type: "src/types/starBeastRendererImplementationCapabilityBinding.ts",
  p48Service:
    "src/services/starBeastRendererImplementationCapabilityBindingService.ts",
  p49Type: "src/types/starBeastRendererImplementationAuthorizationReadiness.ts",
  p49Service:
    "src/services/starBeastRendererImplementationAuthorizationReadinessService.ts",
  p50Type:
    "src/types/starBeastRendererExplicitImplementationAuthorizationCommand.ts",
  p50Service:
    "src/services/starBeastRendererExplicitImplementationAuthorizationCommandService.ts",
  p51Type: "src/types/starBeastRendererImplementationAuthorization.ts",
  p51Service:
    "src/services/starBeastRendererImplementationAuthorizationResolver.ts",
  p52Type:
    "src/types/starBeastRendererImplementationAuthorizationConsumption.ts",
  p52Service:
    "src/services/starBeastRendererImplementationAuthorizationConsumptionService.ts",
  p53Type: "src/types/starBeastRendererImplementationAuthorizationEndpoint.ts",
  p53Service:
    "src/services/starBeastRendererImplementationAuthorizationEndpoint.ts",
  p53Protocol:
    "docs/GUANYAO_STAR_BEAST_RENDERER_IMPLEMENTATION_AUTHORIZATION_ENDPOINT_PROTOCOL.md",
  p44FreezeProtocol:
    "docs/GUANYAO_STAR_BEAST_RENDER_PLAN_CHAIN_FREEZE_PROTOCOL.md",
  p54FreezeProtocol:
    "docs/GUANYAO_STAR_BEAST_RENDERER_IMPLEMENTATION_AUTHORIZATION_CHAIN_FREEZE_PROTOCOL.md",
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
  if (actual !== expected) {
    failures.push(`${name} expected=${expected} actual=${actual}`);
  } else {
    console.log(`PASS | ${name} | expected=${expected} | actual=${actual}`);
  }
};

const collectTypeScriptSourcePaths = (directoryPath) =>
  fs.readdirSync(directoryPath, { withFileTypes: true }).flatMap((entry) => {
    const entryPath = path.join(directoryPath, entry.name);
    if (entry.isDirectory()) return collectTypeScriptSourcePaths(entryPath);
    return /\.tsx?$/.test(entry.name) ? [entryPath] : [];
  });

const absolutePaths = Object.fromEntries(
  Object.entries(files).map(([name, relativePath]) => [
    name,
    path.join(rootDir, relativePath),
  ]),
);

for (const [name, filePath] of Object.entries(absolutePaths)) {
  if (!fs.existsSync(filePath)) failures.push(`${name} file missing=${filePath}`);
  else console.log(`PASS | ${name} file exists`);
}

if (failures.length === 0) {
  const sources = Object.fromEntries(
    Object.entries(absolutePaths).map(([name, filePath]) => [
      name,
      fs.readFileSync(filePath, "utf8"),
    ]),
  );
  const packageJson = JSON.parse(sources.packageManifest);
  const typeScriptSourcePaths = collectTypeScriptSourcePaths(
    path.join(rootDir, "src"),
  );

  const assertCallSites = (name, symbol, expectedRelativePaths) => {
    const actual = typeScriptSourcePaths
      .filter((filePath) => fs.readFileSync(filePath, "utf8").includes(symbol))
      .map((filePath) => path.relative(rootDir, filePath))
      .sort();
    assertEqual(name, actual.join(","), [...expectedRelativePaths].sort().join(","));
  };

  [
    ["P45 resolver stays owner-only", "resolveStarBeastRendererReadiness(", files.p45Service],
    ["P46 resolver stays owner-only", "resolveStarBeastRendererImplementationCandidate(", files.p46Service],
    ["P47 resolver stays owner-only", "resolveStarBeastRendererBackendCapabilityDeclaration(", files.p47Service],
    ["P48 resolver stays owner-only", "resolveStarBeastRendererImplementationCapabilityBinding(", files.p48Service],
    ["P49 resolver stays owner-only", "resolveStarBeastRendererImplementationAuthorizationReadiness(", files.p49Service],
    ["P50 resolver stays owner-only", "resolveStarBeastRendererExplicitImplementationAuthorizationCommand(", files.p50Service],
    ["P51 resolver stays owner-only", "resolveStarBeastRendererImplementationAuthorization(", files.p51Service],
    ["P52 service stays owner-only", "consumeStarBeastRendererImplementationAuthorization(", files.p52Service],
    ["P53 endpoint stays terminal", "resolveStarBeastRendererImplementationAuthorizationEndpoint(", files.p53Service],
  ].forEach(([name, symbol, expectedPath]) =>
    assertCallSites(name, symbol, [expectedPath]),
  );

  const frozenSource = [
    sources.p45Type,
    sources.p45Service,
    sources.p46Type,
    sources.p46Service,
    sources.p47Type,
    sources.p47Service,
    sources.p48Type,
    sources.p48Service,
    sources.p49Type,
    sources.p49Service,
    sources.p50Type,
    sources.p50Service,
    sources.p51Type,
    sources.p51Service,
    sources.p52Type,
    sources.p52Service,
    sources.p53Type,
    sources.p53Service,
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
  ].forEach((marker) =>
    assertExcludes("frozen authorization chain has no implementation dependency", frozenSource, marker),
  );

  [
    'readiness: "READY_FOR_RENDERER_IMPLEMENTATION_PROTOCOL"',
    'semanticRole: "STAR_BEAST_RENDERER_IMPLEMENTATION_CANDIDATE"',
    'semanticRole: "STAR_BEAST_RENDERER_BACKEND_CAPABILITY_DECLARATION"',
    'semanticRole: "STAR_BEAST_RENDERER_IMPLEMENTATION_CAPABILITY_BINDING"',
    'readiness: "READY_FOR_EXPLICIT_RENDERER_IMPLEMENTATION_AUTHORIZATION"',
    'semanticRole: "STAR_BEAST_RENDERER_EXPLICIT_IMPLEMENTATION_AUTHORIZATION_COMMAND"',
    'semanticRole: "STAR_BEAST_RENDERER_IMPLEMENTATION_AUTHORIZATION"',
    'semanticRole: "STAR_BEAST_RENDERER_IMPLEMENTATION_AUTHORIZATION_CONSUMPTION"',
    'semanticRole: "STAR_BEAST_RENDERER_IMPLEMENTATION_AUTHORIZATION_ENDPOINT"',
    'endpointStatus: "AVAILABLE_FOR_IMPLEMENTATION_PROTOCOL_HANDOFF"',
  ].forEach((marker) =>
    assertIncludes("P45-P53 semantic boundary remains frozen", frozenSource, marker),
  );

  [
    "RC-STAR-BEAST-RENDERER-IMPLEMENTATION-AUTHORIZATION-CHAIN-FREEZE-P54",
    "IMPLEMENTATION AUTHORIZATION CHAIN FROZEN",
    "P43 Render Plan Consumption Result",
    "P45 Renderer Readiness",
    "P46 Implementation Candidate",
    "P47 Backend Capability Declaration",
    "P48 Candidate / Capability Binding",
    "P49 Authorization Readiness",
    "P50 Explicit Authorization Command",
    "P51 Implementation Authorization",
    "P52 Authorization Consumption",
    "P53 Authorization Endpoint",
    "P53 Result → no consumer before explicit unfreeze",
    "P53 Endpoint Result 是当前授权链的冻结终止出口",
    "未来真实 Renderer 施工必须先建立独立解冻协议",
    "P54 不新增或修改业务类型、Service、Resolver、Endpoint、UI、Runtime、Storage 或视觉资产",
  ].forEach((marker) =>
    assertIncludes("P54 freeze protocol", sources.p54FreezeProtocol, marker),
  );

  [
    "P54 Authorization Chain Freeze",
    "P53 Result 是当前冻结终止出口",
    "显式解冻前不得新增下游消费者",
  ].forEach((marker) =>
    assertIncludes("P53 protocol declares P54 freeze", sources.p53Protocol, marker),
  );

  [
    "P54 Implementation Authorization Chain Freeze",
    "P53 Endpoint Result 是冻结终止出口",
    "显式解冻前禁止任何下游消费",
  ].forEach((marker) =>
    assertIncludes("P44 freeze protocol records P54", sources.p44FreezeProtocol, marker),
  );

  assertIncludes(
    "P54 gate is registered",
    packageJson.scripts?.["check:star-beast-renderer-implementation-authorization-chain-freeze"] ?? "",
    "node scripts/check-star-beast-renderer-implementation-authorization-chain-freeze.mjs",
  );
  assertIncludes(
    "P54 gate participates in release",
    packageJson.scripts?.["check:release"] ?? "",
    "npm run check:star-beast-renderer-implementation-authorization-chain-freeze",
  );
}

if (failures.length > 0) {
  console.error("\nStar Beast renderer implementation authorization chain freeze gate failed:");
  failures.forEach((failure) => console.error(`- ${failure}`));
  process.exit(1);
}

console.log("\nStar Beast renderer implementation authorization chain freeze gate passed.");
