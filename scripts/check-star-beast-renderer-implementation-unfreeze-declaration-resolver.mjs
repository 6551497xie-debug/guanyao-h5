import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import process from "node:process";
import { build } from "esbuild";

const rootDir = process.cwd();
const typePath = path.join(
  rootDir,
  "src/types/starBeastRendererImplementationUnfreezeDeclaration.ts",
);
const servicePath = path.join(
  rootDir,
  "src/services/starBeastRendererImplementationUnfreezeDeclarationResolver.ts",
);
const commandServicePath = path.join(
  rootDir,
  "src/services/starBeastRendererExplicitImplementationUnfreezeDeclarationCommandService.ts",
);
const typeIndexPath = path.join(rootDir, "src/types/index.ts");
const protocolPath = path.join(
  rootDir,
  "docs/GUANYAO_STAR_BEAST_RENDERER_IMPLEMENTATION_UNFREEZE_DECLARATION_PROTOCOL.md",
);
const commandProtocolPath = path.join(
  rootDir,
  "docs/GUANYAO_STAR_BEAST_RENDERER_EXPLICIT_IMPLEMENTATION_UNFREEZE_DECLARATION_COMMAND_PROTOCOL.md",
);
const packagePath = path.join(rootDir, "package.json");
const tempModulePath = path.join(
  os.tmpdir(),
  `guanyao-star-beast-renderer-unfreeze-declaration-${process.pid}.mjs`,
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
  ["unfreeze declaration type", typePath],
  ["unfreeze declaration resolver", servicePath],
  ["explicit unfreeze command service", commandServicePath],
  ["type index", typeIndexPath],
  ["unfreeze declaration protocol", protocolPath],
  ["explicit unfreeze command protocol", commandProtocolPath],
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
  const packageJson = JSON.parse(fs.readFileSync(packagePath, "utf8"));
  const sourcePaths = collectTypeScriptSourcePaths(path.join(rootDir, "src"));
  const assertCallSites = (name, symbol, expectedRelativePaths) => {
    const actual = sourcePaths
      .filter((filePath) => fs.readFileSync(filePath, "utf8").includes(symbol))
      .map((filePath) => path.relative(rootDir, filePath))
      .sort();
    assertEqual(name, actual.join(","), [...expectedRelativePaths].sort().join(","));
  };

  [
    "export type StarBeastRendererImplementationUnfreezeDeclarationInput",
    "commandResult: StarBeastRendererExplicitImplementationUnfreezeDeclarationCommandResult | null",
    "export type StarBeastRendererImplementationUnfreezeDeclaration",
    'semanticRole: "STAR_BEAST_RENDERER_IMPLEMENTATION_UNFREEZE_DECLARATION"',
    'declarationStatus: "DECLARED_FOR_IMPLEMENTATION_UNFREEZE_PROTOCOL"',
    'declarationScope: "STAR_BEAST_RENDERER_IMPLEMENTATION_UNFREEZE_PROTOCOL"',
    "sourceCommandReference:",
    "authorityReference:",
    "readinessReference:",
    "authorizationEndpointGovernanceReference:",
    "implementationScenarioReference:",
    "backendCandidateReferences:",
    "fallbackStrategyReference:",
    "acceptanceScopeReference:",
    'unfreezeDecision: "DECLARE_UNFREEZE"',
    "explicitAuthorityConfirmed: true",
    "declarationOnly: true",
    "unfreezeExecutionDeferred: true",
    "noUnfreezeIssued: true",
    "noAuthorizationEndpointConsumption: true",
    "noFinalBackendSelection: true",
    "noRendererCreation: true",
    "noRenderExecution: true",
    'status: "DECLARED"',
    '"EXPLICIT_UNFREEZE_DECLARATION_COMMAND_NOT_READY"',
    '"EXPLICIT_UNFREEZE_DECLARATION_COMMAND_INVALID"',
    '"EXPLICIT_UNFREEZE_DECLARATION_COMMAND_RESULT_REQUIRED"',
    '"EXPLICIT_UNFREEZE_DECLARATION_COMMAND_UNAVAILABLE"',
  ].forEach((marker) => assertIncludes("P57 type contract", typeSource, marker));

  [
    "export function resolveStarBeastRendererImplementationUnfreezeDeclaration",
    "const commandResult = input.commandResult",
    "commandResult === null",
    'commandResult.status === "UNAVAILABLE"',
    'commandResult.status === "NOT_READY"',
    "const isValidExplicitCommand =",
    'command.source === "explicit_renderer_implementation_unfreeze_decision"',
    'command.decision === "DECLARE_UNFREEZE"',
    "command.readinessReference === readiness",
    "command.authorizationEndpointGovernanceReference ===",
    "command.backendCandidateReferences === readiness.backendCandidateReferences",
    'semanticRole:',
    '"STAR_BEAST_RENDERER_IMPLEMENTATION_UNFREEZE_DECLARATION"',
    "sourceCommandReference: command",
    "unfreezeExecutionDeferred: true",
    "noUnfreezeIssued: true",
    'status: "DECLARED"',
  ].forEach((marker) => assertIncludes("P57 resolver contract", serviceSource, marker));

  [
    "resolveStarBeastRendererExplicitImplementationUnfreezeDeclarationCommand(",
    "resolveStarBeastRendererImplementationUnfreezeReadiness(",
    "StarBeastRendererImplementationAuthorizationEndpointResult",
    "resolveStarBeastRendererImplementationAuthorizationEndpoint(",
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
    "fourSymbol",
    "Hexagram",
    "personality",
  ].forEach((marker) => assertExcludes("P57 stays declaration-only", serviceSource, marker));

  [
    "StarBeastRendererImplementationUnfreezeDeclaration",
    "StarBeastRendererImplementationUnfreezeDeclarationInput",
    "StarBeastRendererImplementationUnfreezeDeclarationResult",
    "StarBeastRendererImplementationUnfreezeDeclarationUnavailableReason",
    'from "./starBeastRendererImplementationUnfreezeDeclaration"',
  ].forEach((marker) => assertIncludes("type index exports P57", typeIndexSource, marker));

  assertCallSites(
    "P56 resolver remains without direct external caller",
    "resolveStarBeastRendererExplicitImplementationUnfreezeDeclarationCommand(",
    ["src/services/starBeastRendererExplicitImplementationUnfreezeDeclarationCommandService.ts"],
  );
  assertCallSites(
    "P57 resolver has no downstream consumer",
    "resolveStarBeastRendererImplementationUnfreezeDeclaration(",
    ["src/services/starBeastRendererImplementationUnfreezeDeclarationResolver.ts"],
  );

  [
    "RC-STAR-BEAST-RENDERER-IMPLEMENTATION-UNFREEZE-DECLARATION-RESOLVER-P57",
    "IMPLEMENTATION UNFREEZE DECLARATION",
    "P56 Explicit Implementation Unfreeze Declaration Command Result",
    "Declaration 不是实际 Unfreeze，不解除 P54 冻结",
    "P57 只消费调用方提供的 P56 Result",
    "DECLARED_FOR_IMPLEMENTATION_UNFREEZE_PROTOCOL",
    "P56 Command Result → only P57 Implementation Unfreeze Declaration Resolver",
    "P57 Declaration Result → only P58 Declaration Consumption",
    "P57 Declaration Resolver → no direct external caller",
    "不消费 `StarBeastRendererImplementationAuthorizationEndpointResult`",
    "P58 只消费调用方提供的 P57 Result",
  ].forEach((marker) => assertIncludes("P57 protocol", protocolSource, marker));
  [
    "P56 Command Result → only P57 Implementation Unfreeze Declaration Resolver",
    "P56 Command Resolver → no direct external caller",
    "P57 只消费调用方提供的 P56 Result",
  ].forEach((marker) => assertIncludes("P56 protocol permits only P57", commandProtocolSource, marker));

  assertIncludes(
    "P57 gate is registered",
    packageJson.scripts?.["check:star-beast-renderer-implementation-unfreeze-declaration-resolver"] ?? "",
    "node scripts/check-star-beast-renderer-implementation-unfreeze-declaration-resolver.mjs",
  );
  assertIncludes(
    "P57 gate participates in release",
    packageJson.scripts?.["check:release"] ?? "",
    "npm run check:star-beast-renderer-implementation-unfreeze-declaration-resolver",
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
  const { resolveStarBeastRendererImplementationUnfreezeDeclaration } =
    await import(`file://${tempModulePath}?t=${Date.now()}`);

  const authorizationEndpointGovernanceReference = Object.freeze({ referenceId: "governance:p53" });
  const implementationScenarioReference = Object.freeze({ referenceId: "scenario:first" });
  const backendCandidateReferences = Object.freeze([Object.freeze({ referenceId: "backend:canvas2d" })]);
  const fallbackStrategyReference = Object.freeze({ referenceId: "fallback:static" });
  const acceptanceScopeReference = Object.freeze({ referenceId: "acceptance:first" });
  const readiness = Object.freeze({
    status: "READY",
    authorizationEndpointGovernanceReference,
    implementationScenarioReference,
    backendCandidateReferences,
    fallbackStrategyReference,
    acceptanceScopeReference,
  });
  const authorityReference = Object.freeze({
    referenceType: "STAR_BEAST_RENDERER_IMPLEMENTATION_UNFREEZE_AUTHORITY",
    referenceId: "unfreeze-authority:product-owner",
  });
  const command = Object.freeze({
    source: "explicit_renderer_implementation_unfreeze_decision",
    semanticRole: "STAR_BEAST_RENDERER_EXPLICIT_IMPLEMENTATION_UNFREEZE_DECLARATION_COMMAND",
    authorityReference,
    decision: "DECLARE_UNFREEZE",
    declarationIntent: "DECLARE_STAR_BEAST_RENDERER_IMPLEMENTATION_UNFREEZE",
    readinessReference: readiness,
    authorizationEndpointGovernanceReference,
    implementationScenarioReference,
    backendCandidateReferences,
    fallbackStrategyReference,
    acceptanceScopeReference,
    authorityConfirmed: true,
    explicit: true,
    commandOnly: true,
    notUnfreezeDeclaration: true,
    noUnfreezeIssued: true,
  });
  const commandResult = Object.freeze({ status: "AVAILABLE", readiness, command });
  const input = Object.freeze({ commandResult });
  const snapshot = JSON.stringify(input);
  const declared = resolveStarBeastRendererImplementationUnfreezeDeclaration(input);

  assertEqual("valid P56 command is declared", declared.status, "DECLARED");
  assertEqual("declaration preserves command", declared.declaration.sourceCommandReference === command, true);
  assertEqual("declaration preserves authority", declared.declaration.authorityReference === authorityReference, true);
  assertEqual("declaration preserves readiness", declared.declaration.readinessReference === readiness, true);
  assertEqual("declaration preserves governance ref", declared.declaration.authorizationEndpointGovernanceReference === authorizationEndpointGovernanceReference, true);
  assertEqual("declaration preserves scenario ref", declared.declaration.implementationScenarioReference === implementationScenarioReference, true);
  assertEqual("declaration preserves candidate refs", declared.declaration.backendCandidateReferences === backendCandidateReferences, true);
  assertEqual("declaration preserves fallback ref", declared.declaration.fallbackStrategyReference === fallbackStrategyReference, true);
  assertEqual("declaration preserves scope ref", declared.declaration.acceptanceScopeReference === acceptanceScopeReference, true);
  assertEqual("declaration defers execution", declared.declaration.unfreezeExecutionDeferred, true);
  assertEqual("declaration issues no unfreeze", declared.declaration.noUnfreezeIssued, true);
  assertEqual("declaration selects no backend", declared.declaration.noFinalBackendSelection, true);
  assertEqual("declaration creates no renderer", declared.declaration.noRendererCreation, true);
  assertEqual("declaration is frozen", Object.isFrozen(declared.declaration), true);
  assertEqual("result is frozen", Object.isFrozen(declared), true);
  assertEqual("input is not mutated", JSON.stringify(input), snapshot);

  const invalidCommand = Object.freeze({
    ...command,
    implementationScenarioReference: Object.freeze({ referenceId: "scenario:replaced" }),
  });
  const invalid = resolveStarBeastRendererImplementationUnfreezeDeclaration(
    Object.freeze({ commandResult: Object.freeze({ status: "AVAILABLE", readiness, command: invalidCommand }) }),
  );
  assertEqual("inconsistent command is not ready", invalid.status, "NOT_READY");
  assertEqual("invalid command reason", invalid.reason, "EXPLICIT_UNFREEZE_DECLARATION_COMMAND_INVALID");
  assertEqual("invalid command creates no declaration", "declaration" in invalid, false);

  const notReady = resolveStarBeastRendererImplementationUnfreezeDeclaration(
    Object.freeze({ commandResult: Object.freeze({ status: "NOT_READY", reason: "UNFREEZE_READINESS_NOT_READY" }) }),
  );
  assertEqual("P56 NOT_READY stays NOT_READY", notReady.status, "NOT_READY");
  assertEqual("P56 NOT_READY reason", notReady.reason, "EXPLICIT_UNFREEZE_DECLARATION_COMMAND_NOT_READY");
  assertEqual("source reason is preserved", notReady.sourceCommandReason, "UNFREEZE_READINESS_NOT_READY");

  const unavailable = resolveStarBeastRendererImplementationUnfreezeDeclaration(
    Object.freeze({ commandResult: Object.freeze({ status: "UNAVAILABLE", reason: "UNFREEZE_READINESS_UNAVAILABLE" }) }),
  );
  assertEqual("P56 UNAVAILABLE stays UNAVAILABLE", unavailable.status, "UNAVAILABLE");
  assertEqual("P56 UNAVAILABLE reason", unavailable.reason, "EXPLICIT_UNFREEZE_DECLARATION_COMMAND_UNAVAILABLE");

  const missing = resolveStarBeastRendererImplementationUnfreezeDeclaration(
    Object.freeze({ commandResult: null }),
  );
  assertEqual("missing P56 result is unavailable", missing.status, "UNAVAILABLE");
  assertEqual("missing P56 result reason", missing.reason, "EXPLICIT_UNFREEZE_DECLARATION_COMMAND_RESULT_REQUIRED");
}

try {
  fs.rmSync(tempModulePath, { force: true });
} catch {
  // Temporary gate output is best-effort cleanup only.
}

if (failures.length > 0) {
  console.error("\nStar Beast renderer implementation unfreeze declaration resolver gate failed:");
  failures.forEach((failure) => console.error(`- ${failure}`));
  process.exit(1);
}

console.log("\nStar Beast renderer implementation unfreeze declaration resolver gate passed.");
