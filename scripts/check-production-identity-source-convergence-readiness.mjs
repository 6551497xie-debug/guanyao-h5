import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import process from "node:process";
import { build } from "esbuild";

const rootDir = process.cwd();
const files = Object.freeze({
  type: "src/types/productionIdentitySourceConvergenceReadiness.ts",
  service: "src/services/productionIdentitySourceConvergenceReadiness.ts",
  consumptionType: "src/types/productionIdentitySourceEngineConsumption.ts",
  consumptionService: "src/services/productionIdentitySourceEngineConsumption.ts",
  protocol: "docs/GUANYAO_FORMAL_IDENTITY_SOURCE_CONVERGENCE_READINESS_PROTOCOL.md",
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
    "export type ProductionIdentitySourceConvergenceReadinessInput",
    "ProductionIdentitySourceConvergenceReadinessResult",
    "READY_FOR_FORMAL_IDENTITY_SOURCE_CONVERGENCE",
    "convergence: \"NOT_PERFORMED\"",
    "personalStarBeastCreation: false",
    "sourceIndependence",
    "noIdentityConvergence: true",
    "noEngineInvocation: true",
  ].forEach((marker) => assertIncludes("P132 readiness type", source.type, marker));
  [
    "export function resolveProductionIdentitySourceConvergenceReadiness",
    "ENGINE_CONSUMPTION_RESULT_REQUIRED",
    "ENGINE_CONSUMPTION_RESULT_UNAVAILABLE",
    "ENGINE_CONSUMPTION_RESULT_BLOCKED",
    "MANSION_SOURCE_NOT_READY",
    "FOUR_SYMBOL_SOURCE_NOT_READY",
    "MOTHER_CODE_SOURCE_NOT_READY",
    "SOURCE_INDEPENDENCE_INVALID",
    "identityConvergence",
  ].forEach((marker) => assertIncludes("P132 readiness service", source.service, marker));
  [
    "resolveStarbeastFromBirthDate",
    "runMotherCodeLandingEngine",
    "resolveLifeArchetypeProfileFromMotherCode",
    "localStorage",
    "sessionStorage",
    "document.",
    "createPersonalStarBeast",
  ].forEach((marker) => assertExcludes("P132 readiness remains non-executing", source.service, marker));
  [
    "RC-FORMAL-IDENTITY-SOURCE-CONVERGENCE-READINESS-P132",
    "P131 Isolated Engine Consumption",
    "READY_FOR_FORMAL_IDENTITY_SOURCE_CONVERGENCE",
    "两条来源保持独立计算",
    "convergence = NOT_PERFORMED",
    "personalStarBeastCreation = false",
    "不是身份汇合",
  ].forEach((marker) => assertIncludes("P132 protocol", source.protocol, marker));
  [
    "ProductionIdentitySourceConvergenceReadinessInput",
    "ProductionIdentitySourceConvergenceReadinessResult",
    "ProductionIdentitySourceConvergenceReadinessReference",
    "from \"./productionIdentitySourceConvergenceReadiness\"",
  ].forEach((marker) => assertIncludes("P132 type index export", source.typeIndex, marker));
  assertIncludes("P132 gate registered", packageJson.scripts?.["check:production-identity-source-convergence-readiness"] ?? "", "node scripts/check-production-identity-source-convergence-readiness.mjs");
  assertIncludes("P132 release gate registered", packageJson.scripts?.["postcheck:release"] ?? "", "npm run check:production-identity-source-convergence-readiness");

  const modulePath = path.join(os.tmpdir(), `guanyao-p132-convergence-readiness-${process.pid}.mjs`);
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
    `, resolveDir: rootDir, sourcefile: "p132-convergence-readiness-gate-entry.ts", loader: "ts" },
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
  assertEqual("P132 convergence readiness is ready", readiness.status, "READY");
  if (readiness.status === "READY") {
    assertEqual("readiness status is exact", readiness.readiness, "READY_FOR_FORMAL_IDENTITY_SOURCE_CONVERGENCE");
    assertEqual("convergence remains deferred", readiness.readinessReference.convergence, "NOT_PERFORMED");
    assertEqual("personal star beast remains absent", readiness.readinessReference.personalStarBeastCreation, false);
    assertEqual("source independence is explicit", readiness.readinessReference.sourceIndependence.motherCodeFromIndependentFormalEngine, true);
    assertEqual("readiness does not invoke engine", readiness.boundary.noEngineInvocation, true);
  }
  const missing = runtime.resolveProductionIdentitySourceConvergenceReadiness(Object.freeze({ engineConsumptionResult: null }));
  assertEqual("missing consumption is unavailable", missing.status, "UNAVAILABLE");
  assertEqual("missing consumption reason", missing.reason, "ENGINE_CONSUMPTION_RESULT_REQUIRED");
  const blocked = runtime.resolveProductionIdentitySourceConvergenceReadiness(Object.freeze({ engineConsumptionResult: Object.freeze({ ...consumption, boundary: Object.freeze({ ...consumption.boundary, noIdentityConvergence: false }) }) }));
  assertEqual("invalid consumption boundary is blocked", blocked.status, "BLOCKED");
  assertEqual("invalid consumption reason", blocked.reason, "ENGINE_CONSUMPTION_BOUNDARY_INVALID");
}

if (failures.length > 0) {
  console.error("\nFormal Identity Source Convergence Readiness gate failed:");
  failures.forEach((failure) => console.error(`- ${failure}`));
  process.exit(1);
}
console.log("\nFormal Identity Source Convergence Readiness gate passed.");
