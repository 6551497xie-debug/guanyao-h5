import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import process from "node:process";
import { build } from "esbuild";

const rootDir = process.cwd();
const typePath = path.join(
  rootDir,
  "src/types/starBeastRendererImplementationAuthorizationEndpoint.ts",
);
const servicePath = path.join(
  rootDir,
  "src/services/starBeastRendererImplementationAuthorizationEndpoint.ts",
);
const typeIndexPath = path.join(rootDir, "src/types/index.ts");
const protocolPath = path.join(
  rootDir,
  "docs/GUANYAO_STAR_BEAST_RENDERER_IMPLEMENTATION_AUTHORIZATION_ENDPOINT_PROTOCOL.md",
);
const consumptionProtocolPath = path.join(
  rootDir,
  "docs/GUANYAO_STAR_BEAST_RENDERER_IMPLEMENTATION_AUTHORIZATION_CONSUMPTION_PROTOCOL.md",
);
const freezeProtocolPath = path.join(
  rootDir,
  "docs/GUANYAO_STAR_BEAST_RENDER_PLAN_CHAIN_FREEZE_PROTOCOL.md",
);
const authorizationChainFreezeProtocolPath = path.join(
  rootDir,
  "docs/GUANYAO_STAR_BEAST_RENDERER_IMPLEMENTATION_AUTHORIZATION_CHAIN_FREEZE_PROTOCOL.md",
);
const packagePath = path.join(rootDir, "package.json");
const tempModulePath = path.join(
  os.tmpdir(),
  `guanyao-star-beast-renderer-implementation-authorization-endpoint-${process.pid}.mjs`,
);

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

for (const [name, filePath] of [
  ["authorization endpoint type", typePath],
  ["authorization endpoint service", servicePath],
  ["type index", typeIndexPath],
  ["authorization endpoint protocol", protocolPath],
  ["P52 consumption protocol", consumptionProtocolPath],
  ["render plan chain freeze protocol", freezeProtocolPath],
  ["authorization chain freeze protocol", authorizationChainFreezeProtocolPath],
  ["package manifest", packagePath],
]) {
  if (!fs.existsSync(filePath)) failures.push(`${name} file missing=${filePath}`);
  else console.log(`PASS | ${name} file exists`);
}

if (failures.length === 0) {
  const typeSource = fs.readFileSync(typePath, "utf8");
  const serviceSource = fs.readFileSync(servicePath, "utf8");
  const typeIndexSource = fs.readFileSync(typeIndexPath, "utf8");
  const protocolSource = fs.readFileSync(protocolPath, "utf8");
  const consumptionProtocolSource = fs.readFileSync(
    consumptionProtocolPath,
    "utf8",
  );
  const freezeProtocolSource = fs.readFileSync(freezeProtocolPath, "utf8");
  const authorizationChainFreezeProtocolSource = fs.readFileSync(
    authorizationChainFreezeProtocolPath,
    "utf8",
  );
  const packageJson = JSON.parse(fs.readFileSync(packagePath, "utf8"));

  [
    "export type StarBeastRendererImplementationAuthorizationEndpointInput",
    "consumptionResult: StarBeastRendererImplementationAuthorizationConsumptionResult | null",
    "export type StarBeastRendererImplementationAuthorizationEndpoint",
    'semanticRole: "STAR_BEAST_RENDERER_IMPLEMENTATION_AUTHORIZATION_ENDPOINT"',
    "sourceConsumptionResult:",
    "authorizationConsumptionReference:",
    "authorizationReference:",
    "sourceCommandReference:",
    "authorityReference:",
    "bindingReference:",
    'endpointStatus: "AVAILABLE_FOR_IMPLEMENTATION_PROTOCOL_HANDOFF"',
    "authorizationHandoffOnly: true",
    "implementationDeferred: true",
    "noBackendSelection: true",
    "noRendererCreation: true",
    "noRenderExecution: true",
    "noUIIntegration: true",
    "noRuntimeIntegration: true",
    "noStorageWrite: true",
    '"AUTHORIZATION_CONSUMPTION_NOT_READY"',
    '"AUTHORIZATION_CONSUMPTION_RESULT_REQUIRED"',
    '"AUTHORIZATION_CONSUMPTION_UNAVAILABLE"',
    "export type StarBeastRendererImplementationAuthorizationEndpointResult",
  ].forEach((marker) =>
    assertIncludes("authorization endpoint type contract", typeSource, marker),
  );

  [
    "export function resolveStarBeastRendererImplementationAuthorizationEndpoint",
    "const sourceConsumptionResult = input.consumptionResult",
    "sourceConsumptionResult === null",
    'sourceConsumptionResult.status === "UNAVAILABLE"',
    'sourceConsumptionResult.status === "NOT_READY"',
    "const authorizationConsumptionReference =",
    "sourceConsumptionResult.consumption",
    'semanticRole:',
    '"STAR_BEAST_RENDERER_IMPLEMENTATION_AUTHORIZATION_ENDPOINT"',
    "sourceConsumptionResult,",
    "authorizationConsumptionReference,",
    "authorizationConsumptionReference.authorizationReference",
    "authorizationConsumptionReference.sourceCommandReference",
    "authorizationConsumptionReference.authorityReference",
    "authorizationConsumptionReference.bindingReference",
    'endpointStatus: "AVAILABLE_FOR_IMPLEMENTATION_PROTOCOL_HANDOFF"',
    "authorizationHandoffOnly: true",
    "implementationDeferred: true",
    'status: "AVAILABLE"',
  ].forEach((marker) =>
    assertIncludes("authorization endpoint service contract", serviceSource, marker),
  );

  [
    "consumeStarBeastRendererImplementationAuthorization(",
    "resolveStarBeastRendererImplementationAuthorization(",
    "resolveStarBeastRendererExplicitImplementationAuthorizationCommand(",
    "resolveStarBeastRendererImplementationAuthorizationReadiness(",
    ".capabilities",
    ".channels",
    "HTMLCanvasElement",
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
    "fourSymbol",
    "Hexagram",
    "personality",
  ].forEach((marker) =>
    assertExcludes("endpoint remains handoff-only", serviceSource, marker),
  );

  [
    "StarBeastRendererImplementationAuthorizationEndpoint",
    "StarBeastRendererImplementationAuthorizationEndpointInput",
    "StarBeastRendererImplementationAuthorizationEndpointResult",
    'from "./starBeastRendererImplementationAuthorizationEndpoint"',
  ].forEach((marker) =>
    assertIncludes("type index exports P53 endpoint", typeIndexSource, marker),
  );

  const endpointCallSites = collectTypeScriptSourcePaths(path.join(rootDir, "src"))
    .filter((filePath) =>
      fs
        .readFileSync(filePath, "utf8")
        .includes("resolveStarBeastRendererImplementationAuthorizationEndpoint("),
    )
    .map((filePath) => path.relative(rootDir, filePath))
    .sort();
  assertEqual(
    "P53 endpoint has no downstream consumer",
    endpointCallSites.join(","),
    "src/services/starBeastRendererImplementationAuthorizationEndpoint.ts",
  );

  [
    "RC-STAR-BEAST-RENDERER-IMPLEMENTATION-AUTHORIZATION-ENDPOINT-P53",
    "P52 AVAILABLE Authorization Consumption",
    "AVAILABLE_FOR_IMPLEMENTATION_PROTOCOL_HANDOFF",
    "P52 Consumption Result → only P53 Implementation Authorization Endpoint",
    "P53 只读取上位调用方提供的 P52 Result",
    "不选择后端、不创建 Renderer、不执行渲染",
  ].forEach((marker) =>
    assertIncludes("P53 protocol", protocolSource, marker),
  );

  assertIncludes(
    "P52 protocol authorizes only P53 result consumer",
    consumptionProtocolSource,
    "P52 Consumption Result → only P53 Implementation Authorization Endpoint",
  );
  [
    "P53 Implementation Authorization Endpoint Extension",
    "P52 Result 只允许由 P53 Implementation Authorization Endpoint 消费",
    "P53 是 P52 Result 的唯一授权消费者",
    "resolveStarBeastRendererImplementationAuthorizationEndpoint",
  ].forEach((marker) =>
    assertIncludes("freeze protocol extends through P53", freezeProtocolSource, marker),
  );

  [
    "## 07｜P54 Authorization Chain Freeze",
    "P53 Result 是当前冻结终止出口",
    "显式解冻前不得新增下游消费者",
  ].forEach((marker) =>
    assertIncludes("P53 protocol declares P54 freeze", protocolSource, marker),
  );

  [
    "RC-STAR-BEAST-RENDERER-IMPLEMENTATION-AUTHORIZATION-CHAIN-FREEZE-P54",
    "P53 Result → no consumer before explicit unfreeze",
    "P53 Endpoint Result 是当前授权链的冻结终止出口",
  ].forEach((marker) =>
    assertIncludes("P54 freezes P53 terminal", authorizationChainFreezeProtocolSource, marker),
  );

  assertIncludes(
    "P53 gate is registered",
    packageJson.scripts?.["check:star-beast-renderer-implementation-authorization-endpoint"] ?? "",
    "node scripts/check-star-beast-renderer-implementation-authorization-endpoint.mjs",
  );
  assertIncludes(
    "P53 gate participates in release",
    packageJson.scripts?.["check:release"] ?? "",
    "npm run check:star-beast-renderer-implementation-authorization-endpoint",
  );

  await build({
    entryPoints: [servicePath],
    outfile: tempModulePath,
    bundle: true,
    platform: "node",
    format: "esm",
    target: "node20",
    logLevel: "silent",
  });

  const { resolveStarBeastRendererImplementationAuthorizationEndpoint } =
    await import(`file://${tempModulePath}?t=${Date.now()}`);

  const bindingReference = Object.freeze({ semanticRole: "CAPABILITY_BINDING" });
  const authorityReference = Object.freeze({
    referenceType: "STAR_BEAST_RENDERER_IMPLEMENTATION_AUTHORITY",
    referenceId: "release-controller",
  });
  const sourceCommandReference = Object.freeze({
    semanticRole:
      "STAR_BEAST_RENDERER_EXPLICIT_IMPLEMENTATION_AUTHORIZATION_COMMAND",
  });
  const authorizationReference = Object.freeze({
    semanticRole: "STAR_BEAST_RENDERER_IMPLEMENTATION_AUTHORIZATION",
    sourceCommandReference,
    authorityReference,
    bindingReference,
  });
  const authorizationConsumptionReference = Object.freeze({
    semanticRole:
      "STAR_BEAST_RENDERER_IMPLEMENTATION_AUTHORIZATION_CONSUMPTION",
    authorizationReference,
    sourceAuthorizationResult: Object.freeze({}),
    sourceCommandReference,
    authorityReference,
    bindingReference,
    consumptionStatus: "AVAILABLE_FOR_FUTURE_IMPLEMENTATION_ENDPOINT",
    authorizationConsumedOnly: true,
    implementationDeferred: true,
    noBackendSelection: true,
    noRendererCreation: true,
    noRenderExecution: true,
    noUIIntegration: true,
    noRuntimeIntegration: true,
    noStorageWrite: true,
  });
  const availableConsumptionResult = Object.freeze({
    status: "AVAILABLE",
    source: "star_beast_renderer_implementation_authorization_consumption",
    input: Object.freeze({}),
    consumption: authorizationConsumptionReference,
  });

  const available = resolveStarBeastRendererImplementationAuthorizationEndpoint(
    Object.freeze({ consumptionResult: availableConsumptionResult }),
  );
  assertEqual("AVAILABLE consumption reaches endpoint", available.status, "AVAILABLE");
  assertEqual(
    "endpoint exposes handoff only",
    available.endpoint.endpointStatus,
    "AVAILABLE_FOR_IMPLEMENTATION_PROTOCOL_HANDOFF",
  );
  assertEqual(
    "endpoint preserves consumption result reference",
    available.endpoint.sourceConsumptionResult,
    availableConsumptionResult,
  );
  assertEqual(
    "endpoint preserves consumption reference",
    available.endpoint.authorizationConsumptionReference,
    authorizationConsumptionReference,
  );
  assertEqual(
    "endpoint preserves authorization reference",
    available.endpoint.authorizationReference,
    authorizationReference,
  );
  assertEqual(
    "endpoint preserves command reference",
    available.endpoint.sourceCommandReference,
    sourceCommandReference,
  );
  assertEqual(
    "endpoint preserves authority reference",
    available.endpoint.authorityReference,
    authorityReference,
  );
  assertEqual(
    "endpoint preserves binding reference",
    available.endpoint.bindingReference,
    bindingReference,
  );
  assertEqual("endpoint remains frozen", Object.isFrozen(available.endpoint), true);

  const notReady = resolveStarBeastRendererImplementationAuthorizationEndpoint(
    Object.freeze({
      consumptionResult: Object.freeze({
        status: "NOT_READY",
        reason: "IMPLEMENTATION_AUTHORIZATION_NOT_READY",
      }),
    }),
  );
  assertEqual("P52 NOT_READY remains not ready", notReady.status, "NOT_READY");
  assertEqual("P52 NOT_READY creates no endpoint", notReady.noEndpoint, true);

  const unavailable = resolveStarBeastRendererImplementationAuthorizationEndpoint(
    Object.freeze({
      consumptionResult: Object.freeze({
        status: "UNAVAILABLE",
        reason: "IMPLEMENTATION_AUTHORIZATION_UNAVAILABLE",
      }),
    }),
  );
  assertEqual("P52 UNAVAILABLE remains unavailable", unavailable.status, "UNAVAILABLE");

  const missing = resolveStarBeastRendererImplementationAuthorizationEndpoint(
    Object.freeze({ consumptionResult: null }),
  );
  assertEqual("missing P52 result remains unavailable", missing.status, "UNAVAILABLE");
}

try {
  fs.rmSync(tempModulePath, { force: true });
} catch {
  // Best-effort cleanup outside the repository.
}

if (failures.length > 0) {
  console.error("\nStar Beast renderer implementation authorization endpoint gate failed:");
  failures.forEach((failure) => console.error(`- ${failure}`));
  process.exit(1);
}

console.log("\nStar Beast renderer implementation authorization endpoint gate passed.");
