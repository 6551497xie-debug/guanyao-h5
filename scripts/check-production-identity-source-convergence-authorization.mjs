import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import process from "node:process";
import { build } from "esbuild";

const rootDir = process.cwd();
const files = Object.freeze({
  type: "src/types/productionIdentitySourceConvergenceAuthorization.ts",
  service: "src/services/productionIdentitySourceConvergenceAuthorization.ts",
  readinessType: "src/types/productionIdentitySourceConvergenceReadiness.ts",
  readinessService: "src/services/productionIdentitySourceConvergenceReadiness.ts",
  protocol: "docs/GUANYAO_FORMAL_IDENTITY_SOURCE_CONVERGENCE_AUTHORIZATION_PROTOCOL.md",
  typeIndex: "src/types/index.ts",
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
  if (actual !== expected) failures.push(`${name} expected=${String(expected)} actual=${String(actual)}`);
  else console.log(`PASS | ${name} | expected=${String(expected)}`);
};
const absolute = Object.fromEntries(Object.entries(files).map(([name, relative]) => [name, path.join(rootDir, relative)]));

for (const [name, filePath] of Object.entries(absolute)) {
  if (!fs.existsSync(filePath)) failures.push(`${name} missing=${filePath}`);
  else console.log(`PASS | ${name} file exists`);
}

if (failures.length === 0) {
  const source = Object.fromEntries(Object.entries(absolute).map(([name, filePath]) => [name, fs.readFileSync(filePath, "utf8")]));
  const packageJson = JSON.parse(source.packageManifest);
  [
    "export type ProductionIdentitySourceConvergenceAuthorizationInput",
    "ProductionIdentitySourceConvergenceAuthorizationResult",
    "AUTHORIZED_FOR_ISOLATED_IDENTITY_SOURCE_CONVERGENCE",
    "convergenceExecution: \"NOT_PERFORMED\"",
    "identityConvergence: \"NOT_PERFORMED\"",
    "personalStarBeastCreation: false",
    "noIdentityConvergence: true",
    "noEngineInvocation: true",
  ].forEach((marker) => assertIncludes("P133 authorization type", source.type, marker));
  [
    "export function authorizeProductionIdentitySourceConvergence",
    "READINESS_RESULT_REQUIRED",
    "READINESS_RESULT_UNAVAILABLE",
    "READINESS_RESULT_BLOCKED",
    "READINESS_BOUNDARY_INVALID",
    "AUTHORIZED_FOR_ISOLATED_IDENTITY_SOURCE_CONVERGENCE",
    "convergenceExecution: \"NOT_PERFORMED\"",
  ].forEach((marker) => assertIncludes("P133 authorization service", source.service, marker));
  [
    "resolveStarbeastFromBirthDate",
    "runMotherCodeLandingEngine",
    "resolveLifeArchetypeProfileFromMotherCode",
    "localStorage",
    "sessionStorage",
    "document.",
    "createPersonalStarBeast",
  ].forEach((marker) => assertExcludes("P133 authorization remains non-executing", source.service, marker));
  [
    "RC-FORMAL-IDENTITY-SOURCE-CONVERGENCE-AUTHORIZATION-P133",
    "P132 Convergence Readiness",
    "AUTHORIZED_FOR_ISOLATED_IDENTITY_SOURCE_CONVERGENCE",
    "授权不是执行",
    "convergenceExecution = NOT_PERFORMED",
    "personalStarBeastCreation = false",
  ].forEach((marker) => assertIncludes("P133 protocol", source.protocol, marker));
  [
    "ProductionIdentitySourceConvergenceAuthorizationInput",
    "ProductionIdentitySourceConvergenceAuthorizationResult",
    "ProductionIdentitySourceConvergenceAuthorizationReference",
    "from \"./productionIdentitySourceConvergenceAuthorization\"",
  ].forEach((marker) => assertIncludes("P133 type index export", source.typeIndex, marker));
  assertIncludes("P133 gate registered", packageJson.scripts?.["check:production-identity-source-convergence-authorization"] ?? "", "node scripts/check-production-identity-source-convergence-authorization.mjs");
  assertIncludes("P133 release gate registered", packageJson.scripts?.["postcheck:release"] ?? "", "npm run check:production-identity-source-convergence-authorization");

  const modulePath = path.join(os.tmpdir(), `guanyao-p133-convergence-authorization-${process.pid}.mjs`);
  await build({
    stdin: { contents: `
      export { normalizeProductionIdentitySourceInput } from "./src/services/productionIdentitySourceInputNormalizer.ts";
      export { reviewProductionIdentitySourceNormalizedReferenceBridge } from "./src/services/productionIdentitySourceNormalizedReferenceBridge.ts";
      export { resolveProductionIdentitySourceAdapterBridgeImplementationReadiness } from "./src/services/productionIdentitySourceAdapterBridgeImplementationReadiness.ts";
      export { reviewProductionIdentitySourceAdapterBridgeImplementationContract } from "./src/services/productionIdentitySourceAdapterBridgeImplementationContract.ts";
      export { reviewProductionIdentitySourceAdapterImplementationAuthorization } from "./src/services/productionIdentitySourceAdapterImplementationAuthorization.ts";
      export { adaptProductionIdentitySourceNormalizedReference } from "./src/services/productionIdentitySourceNormalizedReferenceAdapter.ts";
      export { resolveProductionIdentitySourceEngineConsumerReadiness } from "./src/services/productionIdentitySourceEngineConsumerReadiness.ts";
      export { reviewProductionIdentitySourceEngineConsumerContract } from "./src/services/productionIdentitySourceEngineConsumerContract.ts";
      export { reviewProductionIdentitySourceEngineConsumerAuthorization } from "./src/services/productionIdentitySourceEngineConsumerAuthorization.ts";
      export { consumeProductionIdentitySourceEngine } from "./src/services/productionIdentitySourceEngineConsumption.ts";
      export { resolveProductionIdentitySourceConvergenceReadiness } from "./src/services/productionIdentitySourceConvergenceReadiness.ts";
      export { authorizeProductionIdentitySourceConvergence } from "./src/services/productionIdentitySourceConvergenceAuthorization.ts";
    `, resolveDir: rootDir, sourcefile: "p133-convergence-authorization-gate-entry.ts", loader: "ts" },
    outfile: modulePath, bundle: true, platform: "node", format: "esm", target: "node20", logLevel: "silent",
  });
  const runtime = await import(`file://${modulePath}?t=${Date.now()}`);
  const normalization = runtime.normalizeProductionIdentitySourceInput(Object.freeze({
    gregorianBirthDate: Object.freeze({ year: 1979, month: 3, day: 28 }),
    localBirthTime: "13:30",
    birthLocationContext: Object.freeze({ country: "CN", region: "Gansu", city: "Lanzhou" }),
  }));
  const bridge = runtime.reviewProductionIdentitySourceNormalizedReferenceBridge(Object.freeze({ normalizationResult: normalization }));
  const bridgeReadiness = runtime.resolveProductionIdentitySourceAdapterBridgeImplementationReadiness(Object.freeze({ bridgeReviewResult: bridge }));
  const adapterContract = runtime.reviewProductionIdentitySourceAdapterBridgeImplementationContract(Object.freeze({ readinessResult: bridgeReadiness }));
  const adapterAuthorization = runtime.reviewProductionIdentitySourceAdapterImplementationAuthorization(Object.freeze({ contractResult: adapterContract }));
  const adapter = runtime.adaptProductionIdentitySourceNormalizedReference(Object.freeze({ authorizationResult: adapterAuthorization, contractResult: adapterContract }));
  const engineReadiness = runtime.resolveProductionIdentitySourceEngineConsumerReadiness(Object.freeze({ adapterResult: adapter }));
  const engineContract = runtime.reviewProductionIdentitySourceEngineConsumerContract(Object.freeze({ readinessResult: engineReadiness }));
  const engineAuthorization = runtime.reviewProductionIdentitySourceEngineConsumerAuthorization(Object.freeze({ contractResult: engineContract }));
  const consumption = runtime.consumeProductionIdentitySourceEngine(Object.freeze({ authorizationResult: engineAuthorization, contractResult: engineContract, adapterResult: adapter }));
  const readiness = runtime.resolveProductionIdentitySourceConvergenceReadiness(Object.freeze({ engineConsumptionResult: consumption }));
  const authorization = runtime.authorizeProductionIdentitySourceConvergence(Object.freeze({ readinessResult: readiness }));
  assertEqual("P133 convergence authorization is granted", authorization.status, "AUTHORIZED");
  if (authorization.status === "AUTHORIZED") {
    assertEqual("authorization status is exact", authorization.authorization, "AUTHORIZED_FOR_ISOLATED_IDENTITY_SOURCE_CONVERGENCE");
    assertEqual("convergence execution remains deferred", authorization.authorizationReference.convergenceExecution, "NOT_PERFORMED");
    assertEqual("identity convergence remains deferred", authorization.authorizationReference.identityConvergence, "NOT_PERFORMED");
    assertEqual("personal star beast remains absent", authorization.authorizationReference.personalStarBeastCreation, false);
    assertEqual("authorization remains isolated", authorization.boundary.isolatedConvergenceOnly, true);
  }
  const missing = runtime.authorizeProductionIdentitySourceConvergence(Object.freeze({ readinessResult: null }));
  assertEqual("missing readiness is unavailable", missing.status, "UNAVAILABLE");
  assertEqual("missing readiness reason", missing.reason, "READINESS_RESULT_REQUIRED");
  const blocked = runtime.authorizeProductionIdentitySourceConvergence(Object.freeze({ readinessResult: Object.freeze({ ...readiness, boundary: Object.freeze({ ...readiness.boundary, noIdentityConvergence: false }) }) }));
  assertEqual("invalid readiness boundary is blocked", blocked.status, "BLOCKED");
  assertEqual("invalid readiness reason", blocked.reason, "READINESS_BOUNDARY_INVALID");
}

if (failures.length > 0) {
  console.error("\nFormal Identity Source Convergence Authorization gate failed:");
  failures.forEach((failure) => console.error(`- ${failure}`));
  process.exit(1);
}
console.log("\nFormal Identity Source Convergence Authorization gate passed.");
