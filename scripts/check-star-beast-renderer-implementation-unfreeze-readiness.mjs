import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import process from "node:process";
import { build } from "esbuild";

const rootDir = process.cwd();
const typePath = path.join(
  rootDir,
  "src/types/starBeastRendererImplementationUnfreezeReadiness.ts",
);
const servicePath = path.join(
  rootDir,
  "src/services/starBeastRendererImplementationUnfreezeReadinessService.ts",
);
const typeIndexPath = path.join(rootDir, "src/types/index.ts");
const protocolPath = path.join(
  rootDir,
  "docs/GUANYAO_STAR_BEAST_RENDERER_IMPLEMENTATION_UNFREEZE_READINESS_PROTOCOL.md",
);
const freezeProtocolPath = path.join(
  rootDir,
  "docs/GUANYAO_STAR_BEAST_RENDERER_IMPLEMENTATION_AUTHORIZATION_CHAIN_FREEZE_PROTOCOL.md",
);
const packagePath = path.join(rootDir, "package.json");
const tempModulePath = path.join(
  os.tmpdir(),
  `guanyao-star-beast-renderer-implementation-unfreeze-readiness-${process.pid}.mjs`,
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
  ["unfreeze readiness type", typePath],
  ["unfreeze readiness service", servicePath],
  ["type index", typeIndexPath],
  ["unfreeze readiness protocol", protocolPath],
  ["P54 freeze protocol", freezeProtocolPath],
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
  const freezeProtocolSource = fs.readFileSync(freezeProtocolPath, "utf8");
  const packageJson = JSON.parse(fs.readFileSync(packagePath, "utf8"));

  [
    "export type StarBeastRendererAuthorizationEndpointGovernanceReference",
    'referenceType: "STAR_BEAST_RENDERER_AUTHORIZATION_ENDPOINT_GOVERNANCE"',
    "export type StarBeastRendererImplementationScenarioReference",
    'referenceType: "STAR_BEAST_RENDERER_IMPLEMENTATION_SCENARIO"',
    "export type StarBeastRendererBackendCandidateReference",
    'referenceType: "STAR_BEAST_RENDERER_BACKEND_CANDIDATE"',
    "export type StarBeastRendererFallbackStrategyReference",
    'referenceType: "STAR_BEAST_RENDERER_FALLBACK_STRATEGY"',
    "export type StarBeastRendererImplementationAcceptanceScopeReference",
    'referenceType: "STAR_BEAST_RENDERER_IMPLEMENTATION_ACCEPTANCE_SCOPE"',
    "export type StarBeastRendererImplementationUnfreezeReadinessInput",
    "authorizationEndpointGovernanceReference:",
    "implementationScenarioReference:",
    "backendCandidateReferences: readonly StarBeastRendererBackendCandidateReference[]",
    "fallbackStrategyReference:",
    "acceptanceScopeReference:",
    'readiness: "READY_FOR_EXPLICIT_IMPLEMENTATION_UNFREEZE_DECLARATION"',
    "explicitUnfreezeDeclarationRequired: true",
    "unfreezeDeferred: true",
    "noUnfreezeIssued: true",
    "noAuthorizationEndpointConsumption: true",
    "noFinalBackendSelection: true",
    "noRendererCreation: true",
    "noRenderExecution: true",
    '"AUTHORIZATION_ENDPOINT_GOVERNANCE_REFERENCE_REQUIRED"',
    '"AUTHORIZATION_ENDPOINT_GOVERNANCE_REFERENCE_INVALID"',
    '"IMPLEMENTATION_SCENARIO_REFERENCE_REQUIRED"',
    '"BACKEND_CANDIDATE_REFERENCES_REQUIRED"',
    '"BACKEND_CANDIDATE_REFERENCES_INVALID"',
    '"FALLBACK_STRATEGY_REFERENCE_REQUIRED"',
    '"ACCEPTANCE_SCOPE_REFERENCE_REQUIRED"',
    "export type StarBeastRendererImplementationUnfreezeReadinessResult",
  ].forEach((marker) =>
    assertIncludes("unfreeze readiness type contract", typeSource, marker),
  );

  [
    "export function resolveStarBeastRendererImplementationUnfreezeReadiness",
    "const authorizationEndpointGovernanceReference =",
    "authorizationEndpointGovernanceReference === null",
    'reason: "AUTHORIZATION_ENDPOINT_GOVERNANCE_REFERENCE_REQUIRED"',
    '"STAR_BEAST_RENDERER_AUTHORIZATION_ENDPOINT_GOVERNANCE"',
    'reason: "AUTHORIZATION_ENDPOINT_GOVERNANCE_REFERENCE_INVALID"',
    "input.implementationScenarioReference === null",
    'reason: "IMPLEMENTATION_SCENARIO_REFERENCE_REQUIRED"',
    "input.backendCandidateReferences.length === 0",
    'reason: "BACKEND_CANDIDATE_REFERENCES_REQUIRED"',
    "new Set(",
    'reason: "BACKEND_CANDIDATE_REFERENCES_INVALID"',
    "input.fallbackStrategyReference === null",
    'reason: "FALLBACK_STRATEGY_REFERENCE_REQUIRED"',
    "input.acceptanceScopeReference === null",
    'reason: "ACCEPTANCE_SCOPE_REFERENCE_REQUIRED"',
    'status: "READY"',
    'readiness: "READY_FOR_EXPLICIT_IMPLEMENTATION_UNFREEZE_DECLARATION"',
    "backendCandidateReferences: input.backendCandidateReferences",
    "noUnfreezeIssued: true",
    "noFinalBackendSelection: true",
  ].forEach((marker) =>
    assertIncludes("unfreeze readiness service contract", serviceSource, marker),
  );

  [
    "StarBeastRendererImplementationAuthorizationEndpointResult",
    "starBeastRendererImplementationAuthorizationEndpoint",
    "resolveStarBeastRendererImplementationAuthorizationEndpoint(",
    "consumeStarBeastRendererImplementationAuthorization(",
    "resolveStarBeastRendererImplementationAuthorization(",
    "resolveStarBeastRendererExplicitImplementationAuthorizationCommand(",
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
  ].forEach((marker) =>
    assertExcludes("readiness respects P54 freeze", serviceSource, marker),
  );

  [
    "StarBeastRendererAuthorizationEndpointGovernanceReference",
    "StarBeastRendererBackendCandidateReference",
    "StarBeastRendererImplementationUnfreezeReadinessInput",
    "StarBeastRendererImplementationUnfreezeReadinessResult",
    'from "./starBeastRendererImplementationUnfreezeReadiness"',
  ].forEach((marker) =>
    assertIncludes("type index exports P55 readiness", typeIndexSource, marker),
  );

  const callSites = collectTypeScriptSourcePaths(path.join(rootDir, "src"))
    .filter((filePath) =>
      fs
        .readFileSync(filePath, "utf8")
        .includes("resolveStarBeastRendererImplementationUnfreezeReadiness("),
    )
    .map((filePath) => path.relative(rootDir, filePath))
    .sort();
  assertEqual(
    "P55 readiness has no downstream caller",
    callSites.join(","),
    "src/services/starBeastRendererImplementationUnfreezeReadinessService.ts",
  );

  [
    "RC-STAR-BEAST-RENDERER-IMPLEMENTATION-UNFREEZE-READINESS-P55",
    "IMPLEMENTATION UNFREEZE READINESS",
    "P53 terminal governance reference",
    "READY_FOR_EXPLICIT_IMPLEMENTATION_UNFREEZE_DECLARATION",
    "READY 不是 Unfreeze，不是 Backend Selection，也不是 Renderer Implementation",
    "候选后端集合不是最终后端选择",
    "P55 不修改 P39–P54，不解除 P54 冻结",
    "不导入 `StarBeastRendererImplementationAuthorizationEndpointResult`",
    "不成为 P53 Runtime Result 消费者",
    "P55 Readiness Result → only P56 Explicit Unfreeze Declaration Command",
    "P55 Readiness Resolver → no direct external caller",
    "P56 只消费调用方提供的 P55 Result",
  ].forEach((marker) =>
    assertIncludes("P55 protocol", protocolSource, marker),
  );

  [
    "P53 Result → no consumer before explicit unfreeze",
    "P53 Endpoint Result 是当前授权链的冻结终止出口",
  ].forEach((marker) =>
    assertIncludes("P54 remains unchanged and frozen", freezeProtocolSource, marker),
  );

  assertIncludes(
    "P55 gate is registered",
    packageJson.scripts?.["check:star-beast-renderer-implementation-unfreeze-readiness"] ?? "",
    "node scripts/check-star-beast-renderer-implementation-unfreeze-readiness.mjs",
  );
  assertIncludes(
    "P55 gate participates in release",
    packageJson.scripts?.["check:release"] ?? "",
    "npm run check:star-beast-renderer-implementation-unfreeze-readiness",
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

  const { resolveStarBeastRendererImplementationUnfreezeReadiness } =
    await import(`file://${tempModulePath}?t=${Date.now()}`);

  const authorizationEndpointGovernanceReference = Object.freeze({
    referenceType: "STAR_BEAST_RENDERER_AUTHORIZATION_ENDPOINT_GOVERNANCE",
    referenceId: "p53:authorization-endpoint",
  });
  const implementationScenarioReference = Object.freeze({
    referenceType: "STAR_BEAST_RENDERER_IMPLEMENTATION_SCENARIO",
    referenceId: "scenario:first-star-beast-presence",
  });
  const backendCandidateReferences = Object.freeze([
    Object.freeze({
      referenceType: "STAR_BEAST_RENDERER_BACKEND_CANDIDATE",
      referenceId: "backend-candidate:a",
    }),
    Object.freeze({
      referenceType: "STAR_BEAST_RENDERER_BACKEND_CANDIDATE",
      referenceId: "backend-candidate:b",
    }),
  ]);
  const fallbackStrategyReference = Object.freeze({
    referenceType: "STAR_BEAST_RENDERER_FALLBACK_STRATEGY",
    referenceId: "fallback:first-star-beast-presence",
  });
  const acceptanceScopeReference = Object.freeze({
    referenceType: "STAR_BEAST_RENDERER_IMPLEMENTATION_ACCEPTANCE_SCOPE",
    referenceId: "acceptance:first-renderer-slice",
  });
  const readyInput = Object.freeze({
    authorizationEndpointGovernanceReference,
    implementationScenarioReference,
    backendCandidateReferences,
    fallbackStrategyReference,
    acceptanceScopeReference,
  });
  const readyInputSnapshot = JSON.stringify(readyInput);
  const ready = resolveStarBeastRendererImplementationUnfreezeReadiness(
    readyInput,
  );

  assertEqual("complete governance input is ready", ready.status, "READY");
  assertEqual(
    "ready state requires explicit declaration",
    ready.readiness,
    "READY_FOR_EXPLICIT_IMPLEMENTATION_UNFREEZE_DECLARATION",
  );
  assertEqual(
    "endpoint governance reference is preserved",
    ready.authorizationEndpointGovernanceReference,
    authorizationEndpointGovernanceReference,
  );
  assertEqual(
    "scenario reference is preserved",
    ready.implementationScenarioReference,
    implementationScenarioReference,
  );
  assertEqual(
    "candidate reference collection is preserved",
    ready.backendCandidateReferences,
    backendCandidateReferences,
  );
  assertEqual("ready does not issue unfreeze", ready.noUnfreezeIssued, true);
  assertEqual("ready does not select backend", ready.noFinalBackendSelection, true);
  assertEqual("ready does not mutate input", JSON.stringify(readyInput), readyInputSnapshot);

  const resolve = (overrides) =>
    resolveStarBeastRendererImplementationUnfreezeReadiness(
      Object.freeze({ ...readyInput, ...overrides }),
    );

  assertEqual(
    "missing endpoint governance reference is unavailable",
    resolve({ authorizationEndpointGovernanceReference: null }).status,
    "UNAVAILABLE",
  );
  assertEqual(
    "invalid endpoint governance reference is unavailable",
    resolve({
      authorizationEndpointGovernanceReference: Object.freeze({
        referenceType: "STAR_BEAST_RENDERER_AUTHORIZATION_ENDPOINT_GOVERNANCE",
        referenceId: "",
      }),
    }).reason,
    "AUTHORIZATION_ENDPOINT_GOVERNANCE_REFERENCE_INVALID",
  );
  assertEqual(
    "missing scenario is not ready",
    resolve({ implementationScenarioReference: null }).reason,
    "IMPLEMENTATION_SCENARIO_REFERENCE_REQUIRED",
  );
  assertEqual(
    "missing candidates is not ready",
    resolve({ backendCandidateReferences: Object.freeze([]) }).reason,
    "BACKEND_CANDIDATE_REFERENCES_REQUIRED",
  );
  assertEqual(
    "duplicate candidates are not ready",
    resolve({
      backendCandidateReferences: Object.freeze([
        backendCandidateReferences[0],
        backendCandidateReferences[0],
      ]),
    }).reason,
    "BACKEND_CANDIDATE_REFERENCES_INVALID",
  );
  assertEqual(
    "missing fallback is not ready",
    resolve({ fallbackStrategyReference: null }).reason,
    "FALLBACK_STRATEGY_REFERENCE_REQUIRED",
  );
  assertEqual(
    "missing acceptance scope is not ready",
    resolve({ acceptanceScopeReference: null }).reason,
    "ACCEPTANCE_SCOPE_REFERENCE_REQUIRED",
  );
}

try {
  fs.rmSync(tempModulePath, { force: true });
} catch {
  // Best-effort cleanup outside the repository.
}

if (failures.length > 0) {
  console.error("\nStar Beast renderer implementation unfreeze readiness gate failed:");
  failures.forEach((failure) => console.error(`- ${failure}`));
  process.exit(1);
}

console.log("\nStar Beast renderer implementation unfreeze readiness gate passed.");
