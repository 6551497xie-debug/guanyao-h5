import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import process from "node:process";
import { build } from "esbuild";

const rootDir = process.cwd();
const typePath = path.join(
  rootDir,
  "src/types/starBeastRendererImplementationAuthorization.ts",
);
const servicePath = path.join(
  rootDir,
  "src/services/starBeastRendererImplementationAuthorizationResolver.ts",
);
const typeIndexPath = path.join(rootDir, "src/types/index.ts");
const protocolPath = path.join(
  rootDir,
  "docs/GUANYAO_STAR_BEAST_RENDERER_IMPLEMENTATION_AUTHORIZATION_RESOLVER_PROTOCOL.md",
);
const commandProtocolPath = path.join(
  rootDir,
  "docs/GUANYAO_STAR_BEAST_RENDERER_EXPLICIT_IMPLEMENTATION_AUTHORIZATION_COMMAND_PROTOCOL.md",
);
const freezeProtocolPath = path.join(
  rootDir,
  "docs/GUANYAO_STAR_BEAST_RENDER_PLAN_CHAIN_FREEZE_PROTOCOL.md",
);
const packagePath = path.join(rootDir, "package.json");
const tempModulePath = path.join(
  os.tmpdir(),
  `guanyao-star-beast-renderer-implementation-authorization-resolver-${process.pid}.mjs`,
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
  ["implementation authorization type", typePath],
  ["implementation authorization resolver", servicePath],
  ["type index", typeIndexPath],
  ["implementation authorization protocol", protocolPath],
  ["P50 command protocol", commandProtocolPath],
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
  const commandProtocolSource = fs.readFileSync(commandProtocolPath, "utf8");
  const freezeProtocolSource = fs.readFileSync(freezeProtocolPath, "utf8");
  const packageJson = JSON.parse(fs.readFileSync(packagePath, "utf8"));

  [
    "export type StarBeastRendererImplementationAuthorizationInput",
    "commandResult: StarBeastRendererExplicitImplementationAuthorizationCommandResult | null",
    "export type StarBeastRendererImplementationAuthorization",
    'semanticRole: "STAR_BEAST_RENDERER_IMPLEMENTATION_AUTHORIZATION"',
    'authorizationStatus: "AUTHORIZED_FOR_IMPLEMENTATION_PROTOCOL"',
    'authorizationScope: "STAR_BEAST_RENDERER_IMPLEMENTATION_PROTOCOL"',
    "sourceCommandReference:",
    "authorityReference:",
    "readinessReference:",
    "bindingReference:",
    'authorizationDecision: "AUTHORIZE"',
    "explicitAuthorityConfirmed: true",
    "authorizationOnly: true",
    "noAutomaticImplementation: true",
    "noBackendSelection: true",
    "noRendererCreation: true",
    "noRenderExecution: true",
    "noUIIntegration: true",
    "noRuntimeIntegration: true",
    "noStorageWrite: true",
    'status: "AUTHORIZED"',
    '"EXPLICIT_AUTHORIZATION_COMMAND_NOT_READY"',
    '"EXPLICIT_AUTHORIZATION_COMMAND_INVALID"',
    '"EXPLICIT_AUTHORIZATION_COMMAND_RESULT_REQUIRED"',
    '"EXPLICIT_AUTHORIZATION_COMMAND_UNAVAILABLE"',
    "export type StarBeastRendererImplementationAuthorizationResult",
  ].forEach((marker) =>
    assertIncludes("implementation authorization type contract", typeSource, marker),
  );

  [
    "export function resolveStarBeastRendererImplementationAuthorization",
    "const commandResult = input.commandResult",
    "commandResult === null",
    'commandResult.status === "UNAVAILABLE"',
    'commandResult.status === "NOT_READY"',
    "const isValidExplicitCommand =",
    'command.decision === "AUTHORIZE"',
    "command.authorityConfirmed === true",
    "command.explicit === true",
    "command.readinessReference === readiness",
    "command.bindingReference === readiness.bindingReference",
    'reason: "EXPLICIT_AUTHORIZATION_COMMAND_INVALID"',
    'semanticRole: "STAR_BEAST_RENDERER_IMPLEMENTATION_AUTHORIZATION"',
    "sourceCommandReference: command",
    "authorityReference: command.authorityReference",
    "readinessReference: command.readinessReference",
    "bindingReference: command.bindingReference",
    "authorizationOnly: true",
    'status: "AUTHORIZED"',
  ].forEach((marker) =>
    assertIncludes("implementation authorization resolver contract", serviceSource, marker),
  );

  [
    "resolveStarBeastRendererExplicitImplementationAuthorizationCommand(",
    "resolveStarBeastRendererImplementationAuthorizationReadiness(",
    "resolveStarBeastRendererImplementationCapabilityBinding(",
    "resolveStarBeastRendererImplementationCandidate(",
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
    assertExcludes("authorization remains reference-only", serviceSource, marker),
  );

  [
    "StarBeastRendererImplementationAuthorization",
    "StarBeastRendererImplementationAuthorizationInput",
    "StarBeastRendererImplementationAuthorizationResult",
    'from "./starBeastRendererImplementationAuthorization"',
  ].forEach((marker) =>
    assertIncludes("type index exports P51 authorization", typeIndexSource, marker),
  );

  [
    "RC-STAR-BEAST-RENDERER-IMPLEMENTATION-AUTHORIZATION-RESOLVER-P51",
    "P50 AVAILABLE Command Result",
    "AUTHORIZED_FOR_IMPLEMENTATION_PROTOCOL",
    "EXPLICIT_AUTHORIZATION_COMMAND_INVALID",
    "P50 Command Result → only P51 Implementation Authorization Resolver",
    "P51 Authorization Result → only P52 Authorization Consumption",
    "P51 只读取上位调用方提供的 P50 Result",
    "不选择后端、不创建 Renderer、不执行渲染",
  ].forEach((marker) =>
    assertIncludes("P51 protocol", protocolSource, marker),
  );

  assertIncludes(
    "P50 protocol authorizes only P51 result consumer",
    commandProtocolSource,
    "P50 Command Result → only P51 Implementation Authorization Resolver",
  );
  [
    "P51 Implementation Authorization Resolver Extension",
    "P50 Result 只允许由 P51 Implementation Authorization Resolver 消费",
    "P51 Result 只允许由 P52 Authorization Consumption 消费",
    "正式 Authorization 只开放未来实现协议",
    "resolveStarBeastRendererImplementationAuthorization",
  ].forEach((marker) =>
    assertIncludes("freeze protocol extends through P51", freezeProtocolSource, marker),
  );

  assertIncludes(
    "P51 gate is registered",
    packageJson.scripts?.["check:star-beast-renderer-implementation-authorization-resolver"] ?? "",
    "node scripts/check-star-beast-renderer-implementation-authorization-resolver.mjs",
  );
  assertIncludes(
    "P51 gate participates in release",
    packageJson.scripts?.["check:release"] ?? "",
    "npm run check:star-beast-renderer-implementation-authorization-resolver",
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

  const { resolveStarBeastRendererImplementationAuthorization } = await import(
    `file://${tempModulePath}?t=${Date.now()}`
  );

  const bindingReference = Object.freeze({
    semanticRole: "STAR_BEAST_RENDERER_IMPLEMENTATION_CAPABILITY_BINDING",
  });
  const readiness = Object.freeze({
    status: "READY",
    readiness: "READY_FOR_EXPLICIT_RENDERER_IMPLEMENTATION_AUTHORIZATION",
    bindingReference,
  });
  const authorityReference = Object.freeze({
    referenceType: "STAR_BEAST_RENDERER_IMPLEMENTATION_AUTHORITY",
    referenceId: "release-controller",
  });
  const command = Object.freeze({
    source: "explicit_renderer_implementation_authorization_decision",
    semanticRole:
      "STAR_BEAST_RENDERER_EXPLICIT_IMPLEMENTATION_AUTHORIZATION_COMMAND",
    authorityReference,
    decision: "AUTHORIZE",
    authorizationIntent: "AUTHORIZE_STAR_BEAST_RENDERER_IMPLEMENTATION",
    readinessReference: readiness,
    bindingReference,
    authorityConfirmed: true,
    explicit: true,
    commandOnly: true,
    notAuthorization: true,
    noAutomaticImplementation: true,
    noBackendSelection: true,
    noRendererCreation: true,
    noRenderExecution: true,
    noUIIntegration: true,
    noRuntimeIntegration: true,
    noStorageWrite: true,
  });
  const availableCommandResult = Object.freeze({
    status: "AVAILABLE",
    source: "star_beast_renderer_explicit_implementation_authorization_command",
    input: Object.freeze({}),
    readiness,
    command,
  });

  const authorized = resolveStarBeastRendererImplementationAuthorization(
    Object.freeze({ commandResult: availableCommandResult }),
  );
  assertEqual("valid explicit command is authorized", authorized.status, "AUTHORIZED");
  assertEqual(
    "authorization scope remains protocol-only",
    authorized.authorization.authorizationScope,
    "STAR_BEAST_RENDERER_IMPLEMENTATION_PROTOCOL",
  );
  assertEqual(
    "authorization preserves command reference",
    authorized.authorization.sourceCommandReference,
    command,
  );
  assertEqual(
    "authorization preserves authority reference",
    authorized.authorization.authorityReference,
    authorityReference,
  );
  assertEqual(
    "authorization preserves readiness reference",
    authorized.authorization.readinessReference,
    readiness,
  );
  assertEqual(
    "authorization preserves binding reference",
    authorized.authorization.bindingReference,
    bindingReference,
  );
  assertEqual(
    "authorization remains frozen",
    Object.isFrozen(authorized.authorization),
    true,
  );

  const replacedReadiness = Object.freeze({ ...readiness });
  const invalidReferenceCommandResult = Object.freeze({
    ...availableCommandResult,
    readiness: replacedReadiness,
  });
  const invalidReference = resolveStarBeastRendererImplementationAuthorization(
    Object.freeze({ commandResult: invalidReferenceCommandResult }),
  );
  assertEqual("replaced readiness is not authorized", invalidReference.status, "NOT_READY");
  assertEqual(
    "replaced readiness reports invalid command",
    invalidReference.reason,
    "EXPLICIT_AUTHORIZATION_COMMAND_INVALID",
  );

  const notReady = resolveStarBeastRendererImplementationAuthorization(
    Object.freeze({
      commandResult: Object.freeze({
        status: "NOT_READY",
        reason: "EXPLICIT_AUTHORIZE_DECISION_REQUIRED",
      }),
    }),
  );
  assertEqual("P50 NOT_READY remains not ready", notReady.status, "NOT_READY");
  assertEqual(
    "P50 NOT_READY does not authorize",
    notReady.noAuthorization,
    true,
  );

  const unavailable = resolveStarBeastRendererImplementationAuthorization(
    Object.freeze({
      commandResult: Object.freeze({
        status: "UNAVAILABLE",
        reason: "AUTHORIZATION_READINESS_UNAVAILABLE",
      }),
    }),
  );
  assertEqual("P50 UNAVAILABLE remains unavailable", unavailable.status, "UNAVAILABLE");

  const missing = resolveStarBeastRendererImplementationAuthorization(
    Object.freeze({ commandResult: null }),
  );
  assertEqual("missing P50 result remains unavailable", missing.status, "UNAVAILABLE");
}

try {
  fs.rmSync(tempModulePath, { force: true });
} catch {
  // Best-effort cleanup outside the repository.
}

if (failures.length > 0) {
  console.error("\nStar Beast renderer implementation authorization resolver gate failed:");
  failures.forEach((failure) => console.error(`- ${failure}`));
  process.exit(1);
}

console.log("\nStar Beast renderer implementation authorization resolver gate passed.");
