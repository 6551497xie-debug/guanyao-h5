import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import process from "node:process";
import { build } from "esbuild";

const rootDir = process.cwd();
const typePath = path.join(
  rootDir,
  "src/types/starBeastRendererImplementationAuthorizationConsumption.ts",
);
const servicePath = path.join(
  rootDir,
  "src/services/starBeastRendererImplementationAuthorizationConsumptionService.ts",
);
const typeIndexPath = path.join(rootDir, "src/types/index.ts");
const protocolPath = path.join(
  rootDir,
  "docs/GUANYAO_STAR_BEAST_RENDERER_IMPLEMENTATION_AUTHORIZATION_CONSUMPTION_PROTOCOL.md",
);
const authorizationProtocolPath = path.join(
  rootDir,
  "docs/GUANYAO_STAR_BEAST_RENDERER_IMPLEMENTATION_AUTHORIZATION_RESOLVER_PROTOCOL.md",
);
const freezeProtocolPath = path.join(
  rootDir,
  "docs/GUANYAO_STAR_BEAST_RENDER_PLAN_CHAIN_FREEZE_PROTOCOL.md",
);
const packagePath = path.join(rootDir, "package.json");
const tempModulePath = path.join(
  os.tmpdir(),
  `guanyao-star-beast-renderer-implementation-authorization-consumption-${process.pid}.mjs`,
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

for (const [name, filePath] of [
  ["authorization consumption type", typePath],
  ["authorization consumption service", servicePath],
  ["type index", typeIndexPath],
  ["authorization consumption protocol", protocolPath],
  ["P51 authorization protocol", authorizationProtocolPath],
  ["render plan chain freeze protocol", freezeProtocolPath],
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
  const authorizationProtocolSource = fs.readFileSync(
    authorizationProtocolPath,
    "utf8",
  );
  const freezeProtocolSource = fs.readFileSync(freezeProtocolPath, "utf8");
  const packageJson = JSON.parse(fs.readFileSync(packagePath, "utf8"));

  [
    "export type StarBeastRendererImplementationAuthorizationConsumptionInput",
    "authorizationResult: StarBeastRendererImplementationAuthorizationResult | null",
    "export type StarBeastRendererImplementationAuthorizationConsumption",
    'semanticRole: "STAR_BEAST_RENDERER_IMPLEMENTATION_AUTHORIZATION_CONSUMPTION"',
    "authorizationReference:",
    "sourceAuthorizationResult:",
    "sourceCommandReference:",
    "authorityReference:",
    "bindingReference:",
    'consumptionStatus: "AVAILABLE_FOR_FUTURE_IMPLEMENTATION_ENDPOINT"',
    "authorizationConsumedOnly: true",
    "implementationDeferred: true",
    "noBackendSelection: true",
    "noRendererCreation: true",
    "noRenderExecution: true",
    "noUIIntegration: true",
    "noRuntimeIntegration: true",
    "noStorageWrite: true",
    '"IMPLEMENTATION_AUTHORIZATION_NOT_READY"',
    '"IMPLEMENTATION_AUTHORIZATION_RESULT_REQUIRED"',
    '"IMPLEMENTATION_AUTHORIZATION_UNAVAILABLE"',
    "export type StarBeastRendererImplementationAuthorizationConsumptionResult",
  ].forEach((marker) =>
    assertIncludes("authorization consumption type contract", typeSource, marker),
  );

  [
    "export function consumeStarBeastRendererImplementationAuthorization",
    "const sourceAuthorizationResult = input.authorizationResult",
    "sourceAuthorizationResult === null",
    'sourceAuthorizationResult.status === "UNAVAILABLE"',
    'sourceAuthorizationResult.status === "NOT_READY"',
    "const authorizationReference = sourceAuthorizationResult.authorization",
    'semanticRole:',
    '"STAR_BEAST_RENDERER_IMPLEMENTATION_AUTHORIZATION_CONSUMPTION"',
    "authorizationReference,",
    "sourceAuthorizationResult,",
    "sourceCommandReference: authorizationReference.sourceCommandReference",
    "authorityReference: authorizationReference.authorityReference",
    "bindingReference: authorizationReference.bindingReference",
    'consumptionStatus: "AVAILABLE_FOR_FUTURE_IMPLEMENTATION_ENDPOINT"',
    "authorizationConsumedOnly: true",
    "implementationDeferred: true",
    'status: "AVAILABLE"',
  ].forEach((marker) =>
    assertIncludes("authorization consumption service contract", serviceSource, marker),
  );

  [
    "resolveStarBeastRendererImplementationAuthorization(",
    "resolveStarBeastRendererExplicitImplementationAuthorizationCommand(",
    "resolveStarBeastRendererImplementationAuthorizationReadiness(",
    "resolveStarBeastRendererImplementationCapabilityBinding(",
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
    assertExcludes("consumption remains reference-only", serviceSource, marker),
  );

  [
    "StarBeastRendererImplementationAuthorizationConsumption",
    "StarBeastRendererImplementationAuthorizationConsumptionInput",
    "StarBeastRendererImplementationAuthorizationConsumptionResult",
    'from "./starBeastRendererImplementationAuthorizationConsumption"',
  ].forEach((marker) =>
    assertIncludes("type index exports P52 consumption", typeIndexSource, marker),
  );

  [
    "RC-STAR-BEAST-RENDERER-IMPLEMENTATION-AUTHORIZATION-CONSUMPTION-P52",
    "P51 AUTHORIZED Result",
    "AVAILABLE_FOR_FUTURE_IMPLEMENTATION_ENDPOINT",
    "P51 Authorization Result → only P52 Authorization Consumption",
    "P52 Consumption Result → only P53 Implementation Authorization Endpoint",
    "P52 只读取上位调用方提供的 P51 Result",
    "不选择后端、不创建 Renderer、不执行渲染",
  ].forEach((marker) =>
    assertIncludes("P52 protocol", protocolSource, marker),
  );

  assertIncludes(
    "P51 protocol authorizes only P52 result consumer",
    authorizationProtocolSource,
    "P51 Authorization Result → only P52 Authorization Consumption",
  );
  [
    "P52 Implementation Authorization Consumption Extension",
    "P51 Result 只允许由 P52 Authorization Consumption 消费",
    "P52 Result 只允许由 P53 Implementation Authorization Endpoint 消费",
    "P52 是 P51 Result 的唯一授权消费者",
    "consumeStarBeastRendererImplementationAuthorization",
  ].forEach((marker) =>
    assertIncludes("freeze protocol extends through P52", freezeProtocolSource, marker),
  );

  assertIncludes(
    "P52 gate is registered",
    packageJson.scripts?.["check:star-beast-renderer-implementation-authorization-consumption"] ?? "",
    "node scripts/check-star-beast-renderer-implementation-authorization-consumption.mjs",
  );
  assertIncludes(
    "P52 gate participates in release",
    packageJson.scripts?.["check:release"] ?? "",
    "npm run check:star-beast-renderer-implementation-authorization-consumption",
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

  const { consumeStarBeastRendererImplementationAuthorization } = await import(
    `file://${tempModulePath}?t=${Date.now()}`
  );

  const bindingReference = Object.freeze({ semanticRole: "CAPABILITY_BINDING" });
  const authorityReference = Object.freeze({
    referenceType: "STAR_BEAST_RENDERER_IMPLEMENTATION_AUTHORITY",
    referenceId: "release-controller",
  });
  const sourceCommandReference = Object.freeze({
    semanticRole:
      "STAR_BEAST_RENDERER_EXPLICIT_IMPLEMENTATION_AUTHORIZATION_COMMAND",
  });
  const authorization = Object.freeze({
    source: "explicit_renderer_implementation_authorization_command",
    semanticRole: "STAR_BEAST_RENDERER_IMPLEMENTATION_AUTHORIZATION",
    authorizationStatus: "AUTHORIZED_FOR_IMPLEMENTATION_PROTOCOL",
    authorizationScope: "STAR_BEAST_RENDERER_IMPLEMENTATION_PROTOCOL",
    sourceCommandReference,
    authorityReference,
    readinessReference: Object.freeze({}),
    bindingReference,
    authorizationDecision: "AUTHORIZE",
    explicitAuthorityConfirmed: true,
    authorizationOnly: true,
    noAutomaticImplementation: true,
    noBackendSelection: true,
    noRendererCreation: true,
    noRenderExecution: true,
    noUIIntegration: true,
    noRuntimeIntegration: true,
    noStorageWrite: true,
  });
  const authorizedResult = Object.freeze({
    status: "AUTHORIZED",
    source: "star_beast_renderer_implementation_authorization_resolver",
    input: Object.freeze({}),
    commandResult: Object.freeze({}),
    authorization,
  });

  const available = consumeStarBeastRendererImplementationAuthorization(
    Object.freeze({ authorizationResult: authorizedResult }),
  );
  assertEqual("AUTHORIZED result is consumable", available.status, "AVAILABLE");
  assertEqual(
    "consumption targets future endpoint only",
    available.consumption.consumptionStatus,
    "AVAILABLE_FOR_FUTURE_IMPLEMENTATION_ENDPOINT",
  );
  assertEqual(
    "consumption preserves authorization reference",
    available.consumption.authorizationReference,
    authorization,
  );
  assertEqual(
    "consumption preserves source result reference",
    available.consumption.sourceAuthorizationResult,
    authorizedResult,
  );
  assertEqual(
    "consumption preserves command reference",
    available.consumption.sourceCommandReference,
    sourceCommandReference,
  );
  assertEqual(
    "consumption preserves authority reference",
    available.consumption.authorityReference,
    authorityReference,
  );
  assertEqual(
    "consumption preserves binding reference",
    available.consumption.bindingReference,
    bindingReference,
  );
  assertEqual(
    "consumption remains frozen",
    Object.isFrozen(available.consumption),
    true,
  );

  const notReady = consumeStarBeastRendererImplementationAuthorization(
    Object.freeze({
      authorizationResult: Object.freeze({
        status: "NOT_READY",
        reason: "EXPLICIT_AUTHORIZATION_COMMAND_NOT_READY",
      }),
    }),
  );
  assertEqual("P51 NOT_READY remains not ready", notReady.status, "NOT_READY");
  assertEqual(
    "P51 NOT_READY does not create consumption",
    notReady.noAuthorizationConsumption,
    true,
  );

  const unavailable = consumeStarBeastRendererImplementationAuthorization(
    Object.freeze({
      authorizationResult: Object.freeze({
        status: "UNAVAILABLE",
        reason: "EXPLICIT_AUTHORIZATION_COMMAND_UNAVAILABLE",
      }),
    }),
  );
  assertEqual("P51 UNAVAILABLE remains unavailable", unavailable.status, "UNAVAILABLE");

  const missing = consumeStarBeastRendererImplementationAuthorization(
    Object.freeze({ authorizationResult: null }),
  );
  assertEqual("missing P51 result remains unavailable", missing.status, "UNAVAILABLE");
}

try {
  fs.rmSync(tempModulePath, { force: true });
} catch {
  // Best-effort cleanup outside the repository.
}

if (failures.length > 0) {
  console.error("\nStar Beast renderer implementation authorization consumption gate failed:");
  failures.forEach((failure) => console.error(`- ${failure}`));
  process.exit(1);
}

console.log("\nStar Beast renderer implementation authorization consumption gate passed.");
