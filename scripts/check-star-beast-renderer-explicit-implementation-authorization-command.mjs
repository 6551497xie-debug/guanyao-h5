import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import process from "node:process";
import { build } from "esbuild";

const rootDir = process.cwd();
const commandTypePath = path.join(
  rootDir,
  "src/types/starBeastRendererExplicitImplementationAuthorizationCommand.ts",
);
const commandServicePath = path.join(
  rootDir,
  "src/services/starBeastRendererExplicitImplementationAuthorizationCommandService.ts",
);
const readinessServicePath = path.join(
  rootDir,
  "src/services/starBeastRendererImplementationAuthorizationReadinessService.ts",
);
const typeIndexPath = path.join(rootDir, "src/types/index.ts");
const protocolPath = path.join(
  rootDir,
  "docs/GUANYAO_STAR_BEAST_RENDERER_EXPLICIT_IMPLEMENTATION_AUTHORIZATION_COMMAND_PROTOCOL.md",
);
const readinessProtocolPath = path.join(
  rootDir,
  "docs/GUANYAO_STAR_BEAST_RENDERER_IMPLEMENTATION_AUTHORIZATION_READINESS_PROTOCOL.md",
);
const freezeProtocolPath = path.join(
  rootDir,
  "docs/GUANYAO_STAR_BEAST_RENDER_PLAN_CHAIN_FREEZE_PROTOCOL.md",
);
const packagePath = path.join(rootDir, "package.json");
const tempModulePath = path.join(
  os.tmpdir(),
  `guanyao-star-beast-renderer-explicit-implementation-authorization-command-${process.pid}.mjs`,
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
  ["explicit authorization command type", commandTypePath],
  ["explicit authorization command service", commandServicePath],
  ["authorization readiness service", readinessServicePath],
  ["type index", typeIndexPath],
  ["explicit authorization command protocol", protocolPath],
  ["authorization readiness protocol", readinessProtocolPath],
  ["render plan chain freeze protocol", freezeProtocolPath],
  ["package manifest", packagePath],
]) {
  if (!fs.existsSync(filePath)) failures.push(`${name} file missing=${filePath}`);
  else console.log(`PASS | ${name} file exists`);
}

if (failures.length === 0) {
  const commandTypeSource = fs.readFileSync(commandTypePath, "utf8");
  const commandServiceSource = fs.readFileSync(commandServicePath, "utf8");
  const typeIndexSource = fs.readFileSync(typeIndexPath, "utf8");
  const protocolSource = fs.readFileSync(protocolPath, "utf8");
  const readinessProtocolSource = fs.readFileSync(readinessProtocolPath, "utf8");
  const freezeProtocolSource = fs.readFileSync(freezeProtocolPath, "utf8");
  const packageJson = JSON.parse(fs.readFileSync(packagePath, "utf8"));
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
    "export type StarBeastRendererImplementationAuthorityReference",
    'referenceType: "STAR_BEAST_RENDERER_IMPLEMENTATION_AUTHORITY"',
    "export type StarBeastRendererExplicitImplementationAuthorizationDecision",
    '"AUTHORIZE"',
    "export type StarBeastRendererExplicitImplementationAuthorizationCommandInput",
    "readinessResult: StarBeastRendererImplementationAuthorizationReadinessResult | null",
    "authorityReference: StarBeastRendererImplementationAuthorityReference | null",
    "decision: StarBeastRendererExplicitImplementationAuthorizationDecision | null",
    "export type StarBeastRendererExplicitImplementationAuthorizationCommand",
    'semanticRole: "STAR_BEAST_RENDERER_EXPLICIT_IMPLEMENTATION_AUTHORIZATION_COMMAND"',
    'authorizationIntent: "AUTHORIZE_STAR_BEAST_RENDERER_IMPLEMENTATION"',
    "readinessReference: StarBeastRendererImplementationAuthorizationReadinessReady",
    "bindingReference: StarBeastRendererImplementationAuthorizationReadinessReady",
    "authorityConfirmed: true",
    "explicit: true",
    "commandOnly: true",
    "notAuthorization: true",
    "noAutomaticImplementation: true",
    "noBackendSelection: true",
    "noRendererCreation: true",
    "noRenderExecution: true",
    "noUIIntegration: true",
    "noRuntimeIntegration: true",
    "noStorageWrite: true",
    '"AUTHORIZATION_READINESS_NOT_READY"',
    '"IMPLEMENTATION_AUTHORITY_REFERENCE_REQUIRED"',
    '"EXPLICIT_AUTHORIZE_DECISION_REQUIRED"',
    '"AUTHORIZATION_READINESS_RESULT_REQUIRED"',
    '"AUTHORIZATION_READINESS_UNAVAILABLE"',
    "export type StarBeastRendererExplicitImplementationAuthorizationCommandResult",
  ].forEach((marker) =>
    assertIncludes("explicit authorization command type contract", commandTypeSource, marker),
  );

  [
    "export function resolveStarBeastRendererExplicitImplementationAuthorizationCommand",
    "const readiness = input.readinessResult",
    "readiness === null",
    'reason: "AUTHORIZATION_READINESS_RESULT_REQUIRED"',
    'readiness.status === "UNAVAILABLE"',
    'reason: "AUTHORIZATION_READINESS_UNAVAILABLE"',
    "sourceReadinessReason: readiness.reason",
    'readiness.status === "NOT_READY"',
    'reason: "AUTHORIZATION_READINESS_NOT_READY"',
    "input.authorityReference === null",
    'reason: "IMPLEMENTATION_AUTHORITY_REFERENCE_REQUIRED"',
    'input.decision !== "AUTHORIZE"',
    'reason: "EXPLICIT_AUTHORIZE_DECISION_REQUIRED"',
    'semanticRole:',
    '"STAR_BEAST_RENDERER_EXPLICIT_IMPLEMENTATION_AUTHORIZATION_COMMAND"',
    "authorityReference: input.authorityReference",
    "decision: input.decision",
    "readinessReference: readiness",
    "bindingReference: readiness.bindingReference",
    "commandOnly: true",
    "notAuthorization: true",
    "noRendererCreation: true",
    "noRenderExecution: true",
    'status: "AVAILABLE"',
  ].forEach((marker) =>
    assertIncludes("explicit authorization command service contract", commandServiceSource, marker),
  );

  [
    "resolveStarBeastRendererImplementationAuthorizationReadiness(",
    "resolveStarBeastRendererImplementationCapabilityBinding(",
    "resolveStarBeastRendererImplementationCandidate(",
    "resolveStarBeastRendererBackendCapabilityDeclaration(",
    "resolveStarBeastRendererReadiness(",
    ".capabilities",
    ".channels",
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
    'from "@react-three',
    'from "react"',
    "/pages/",
    "/components/",
    "localStorage",
    "sessionStorage",
    "fetch(",
    "fourSymbol",
    "FourSymbol",
    "Hexagram",
    "personality",
    "Persona",
  ].forEach((marker) =>
    assertExcludes("command stays explicit-reference-only", commandServiceSource, marker),
  );

  [
    "StarBeastRendererExplicitImplementationAuthorizationCommand",
    "StarBeastRendererExplicitImplementationAuthorizationCommandInput",
    "StarBeastRendererExplicitImplementationAuthorizationCommandResult",
    "StarBeastRendererImplementationAuthorityReference",
    'from "./starBeastRendererExplicitImplementationAuthorizationCommand"',
  ].forEach((marker) =>
    assertIncludes("type index exports explicit authorization command", typeIndexSource, marker),
  );

  assertCallSites(
    "P49 resolver remains without external direct caller",
    "resolveStarBeastRendererImplementationAuthorizationReadiness(",
    ["src/services/starBeastRendererImplementationAuthorizationReadinessService.ts"],
  );
  assertCallSites(
    "P50 command resolver has no downstream consumer",
    "resolveStarBeastRendererExplicitImplementationAuthorizationCommand(",
    ["src/services/starBeastRendererExplicitImplementationAuthorizationCommandService.ts"],
  );

  [
    "RC-STAR-BEAST-RENDERER-EXPLICIT-IMPLEMENTATION-AUTHORIZATION-COMMAND-P50",
    "EXPLICIT IMPLEMENTATION AUTHORIZATION COMMAND",
    "P49 READY_FOR_EXPLICIT_RENDERER_IMPLEMENTATION_AUTHORIZATION",
    "STAR_BEAST_RENDERER_IMPLEMENTATION_AUTHORITY Reference",
    "explicit AUTHORIZE decision",
    "系统不能根据 READY 自动授权",
    "IMPLEMENTATION_AUTHORITY_REFERENCE_REQUIRED",
    "EXPLICIT_AUTHORIZE_DECISION_REQUIRED",
    "AUTHORIZATION_READINESS_NOT_READY",
    "AUTHORIZATION_READINESS_UNAVAILABLE",
    "AUTHORIZATION_READINESS_RESULT_REQUIRED",
    "commandOnly: true",
    "notAuthorization: true",
    "P49 Result → only P50 Explicit Authorization Command",
    "P50 只消费调用方提供的 P49 Result",
    "生成 Renderer Implementation Authorization",
  ].forEach((marker) =>
    assertIncludes("explicit authorization command protocol", protocolSource, marker),
  );

  assertIncludes(
    "P49 protocol authorizes only P50 result consumer",
    readinessProtocolSource,
    "P49 Readiness Result → only P50 Explicit Authorization Command",
  );
  [
    "P50 Explicit Implementation Authorization Command Extension",
    "P49 Result 只允许由 P50 Explicit Authorization Command 消费",
    "Command 不等于 Authorization",
    "resolveStarBeastRendererExplicitImplementationAuthorizationCommand",
  ].forEach((marker) =>
    assertIncludes("freeze protocol extends through P50", freezeProtocolSource, marker),
  );

  assertIncludes(
    "explicit authorization command gate is registered",
    packageJson.scripts?.["check:star-beast-renderer-explicit-implementation-authorization-command"] ?? "",
    "node scripts/check-star-beast-renderer-explicit-implementation-authorization-command.mjs",
  );
  assertIncludes(
    "explicit authorization command gate participates in release",
    packageJson.scripts?.["check:release"] ?? "",
    "npm run check:star-beast-renderer-explicit-implementation-authorization-command",
  );

  await build({
    entryPoints: [commandServicePath],
    outfile: tempModulePath,
    bundle: true,
    platform: "node",
    format: "esm",
    target: "node20",
    logLevel: "silent",
  });

  const { resolveStarBeastRendererExplicitImplementationAuthorizationCommand } =
    await import(`file://${tempModulePath}?t=${Date.now()}`);

  const bindingReference = Object.freeze({
    semanticRole: "STAR_BEAST_RENDERER_IMPLEMENTATION_CAPABILITY_BINDING",
  });
  const readinessReady = Object.freeze({
    status: "READY",
    readiness: "READY_FOR_EXPLICIT_RENDERER_IMPLEMENTATION_AUTHORIZATION",
    bindingReference,
  });
  const authorityReference = Object.freeze({
    referenceType: "STAR_BEAST_RENDERER_IMPLEMENTATION_AUTHORITY",
    referenceId: "renderer-implementation-authority:product-owner",
  });
  const availableInput = Object.freeze({
    readinessResult: readinessReady,
    authorityReference,
    decision: "AUTHORIZE",
  });
  const availableSnapshot = JSON.stringify(availableInput);
  const available = resolveStarBeastRendererExplicitImplementationAuthorizationCommand(availableInput);

  assertEqual("ready explicit authorize creates command", available.status, "AVAILABLE");
  assertEqual("command preserves readiness", available.command.readinessReference === readinessReady, true);
  assertEqual("command preserves binding", available.command.bindingReference === bindingReference, true);
  assertEqual("command preserves authority reference", available.command.authorityReference === authorityReference, true);
  assertEqual("command is explicit", available.command.explicit, true);
  assertEqual("command is not authorization", available.command.notAuthorization, true);
  assertEqual("command selects no backend", available.command.noBackendSelection, true);
  assertEqual("command creates no renderer", available.command.noRendererCreation, true);
  assertEqual("command executes no render", available.command.noRenderExecution, true);
  assertEqual("command is frozen", Object.isFrozen(available.command), true);
  assertEqual("available result is frozen", Object.isFrozen(available), true);
  assertEqual("command does not mutate input", JSON.stringify(availableInput), availableSnapshot);

  const missingAuthority = resolveStarBeastRendererExplicitImplementationAuthorizationCommand(
    Object.freeze({ ...availableInput, authorityReference: null }),
  );
  assertEqual("missing authority is not ready", missingAuthority.status, "NOT_READY");
  assertEqual("missing authority reason is stable", missingAuthority.reason, "IMPLEMENTATION_AUTHORITY_REFERENCE_REQUIRED");
  assertEqual("missing authority creates no command", "command" in missingAuthority, false);

  const missingDecision = resolveStarBeastRendererExplicitImplementationAuthorizationCommand(
    Object.freeze({ ...availableInput, decision: null }),
  );
  assertEqual("missing decision is not ready", missingDecision.status, "NOT_READY");
  assertEqual("missing decision reason is stable", missingDecision.reason, "EXPLICIT_AUTHORIZE_DECISION_REQUIRED");

  const readinessNotReady = Object.freeze({
    status: "NOT_READY",
    reason: "CAPABILITY_BINDING_NOT_READY",
  });
  const notReady = resolveStarBeastRendererExplicitImplementationAuthorizationCommand(
    Object.freeze({ ...availableInput, readinessResult: readinessNotReady }),
  );
  assertEqual("upstream not ready stays not ready", notReady.status, "NOT_READY");
  assertEqual("upstream not-ready reason is stable", notReady.reason, "AUTHORIZATION_READINESS_NOT_READY");
  assertEqual("upstream reason is preserved", notReady.sourceReadinessReason, "CAPABILITY_BINDING_NOT_READY");

  const readinessUnavailable = Object.freeze({
    status: "UNAVAILABLE",
    reason: "CAPABILITY_BINDING_UNAVAILABLE",
  });
  const unavailable = resolveStarBeastRendererExplicitImplementationAuthorizationCommand(
    Object.freeze({ ...availableInput, readinessResult: readinessUnavailable }),
  );
  assertEqual("upstream unavailable stays unavailable", unavailable.status, "UNAVAILABLE");
  assertEqual("upstream unavailable reason is stable", unavailable.reason, "AUTHORIZATION_READINESS_UNAVAILABLE");
  assertEqual("unavailable upstream reason is preserved", unavailable.sourceReadinessReason, "CAPABILITY_BINDING_UNAVAILABLE");

  const missingReadiness = resolveStarBeastRendererExplicitImplementationAuthorizationCommand(
    Object.freeze({ ...availableInput, readinessResult: null }),
  );
  assertEqual("missing readiness is unavailable", missingReadiness.status, "UNAVAILABLE");
  assertEqual("missing readiness reason is stable", missingReadiness.reason, "AUTHORIZATION_READINESS_RESULT_REQUIRED");
}

try {
  fs.rmSync(tempModulePath, { force: true });
} catch {
  // Temporary gate output is best-effort cleanup only.
}

if (failures.length > 0) {
  console.error("\nStar Beast renderer explicit implementation authorization command gate failed:");
  failures.forEach((failure) => console.error(`- ${failure}`));
  process.exit(1);
}

console.log("\nStar Beast renderer explicit implementation authorization command gate passed.");
