import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import process from "node:process";
import { build } from "esbuild";

const rootDir = process.cwd();
const files = Object.freeze({
  type: "src/types/personalStarBeastIdentityProductReadiness.ts",
  service: "src/services/personalStarBeastIdentityProductReadiness.ts",
  convergenceType: "src/types/productionIdentitySourceConvergence.ts",
  convergenceService: "src/services/productionIdentitySourceConvergence.ts",
  protocol: "docs/GUANYAO_PERSONAL_STAR_BEAST_IDENTITY_PRODUCT_CONSUMPTION_READINESS_PROTOCOL.md",
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
    "export type PersonalStarBeastIdentityProductReadinessInput",
    "PersonalStarBeastIdentityProductReadinessResult",
    "READY_FOR_PERSONAL_STAR_BEAST_IDENTITY_PRODUCT_CONSUMPTION",
    "PERSONAL_STAR_BEAST_IDENTITY_PRODUCT_CONSUMPTION_READINESS",
    "productConsumption: \"NOT_PERFORMED\"",
    "rendererConsumption: false",
    "storageWrite: false",
    "noProductConsumption: true",
  ].forEach((marker) => assertIncludes("P135 readiness type", source.type, marker));
  [
    "export function resolvePersonalStarBeastIdentityProductReadiness",
    "CONVERGENCE_RESULT_REQUIRED",
    "CONVERGENCE_RESULT_UNAVAILABLE",
    "CONVERGENCE_RESULT_BLOCKED",
    "CONVERGENCE_BOUNDARY_INVALID",
    "IDENTITY_REFERENCE_INVALID",
    "IDENTITY_SOURCE_INVALID",
    "LIFE_ARCHETYPE_REFERENCE_INVALID",
    "PERSONAL_STAR_BEAST_IDENTITY_SOURCE",
  ].forEach((marker) => assertIncludes("P135 readiness service", source.service, marker));
  [
    "resolveStarbeastFromBirthDate",
    "runMotherCodeLandingEngine",
    "resolveLifeArchetypeProfileFromMotherCode",
    "localStorage",
    "sessionStorage",
    "document.",
    "createPersonalStarBeast",
    "createRenderer",
  ].forEach((marker) => assertExcludes("P135 readiness remains non-consuming", source.service, marker));
  [
    "RC-PERSONAL-STAR-BEAST-IDENTITY-PRODUCT-READINESS-P135",
    "P134 Formal Identity Source Convergence",
    "READY_FOR_PERSONAL_STAR_BEAST_IDENTITY_PRODUCT_CONSUMPTION",
    "productConsumption = NOT_PERFORMED",
    "userBinding = false",
    "不是产品消费",
    "不是视觉资产",
  ].forEach((marker) => assertIncludes("P135 protocol", source.protocol, marker));
  [
    "PersonalStarBeastIdentityProductReadinessInput",
    "PersonalStarBeastIdentityProductReadinessResult",
    "PersonalStarBeastIdentityProductReadinessReference",
    "from \"./personalStarBeastIdentityProductReadiness\"",
  ].forEach((marker) => assertIncludes("P135 type index export", source.typeIndex, marker));
  assertIncludes("P135 gate registered", packageJson.scripts?.["check:personal-star-beast-identity-product-readiness"] ?? "", "node scripts/check-personal-star-beast-identity-product-readiness.mjs");
  assertIncludes("P135 release gate registered", packageJson.scripts?.["postcheck:release"] ?? "", "npm run check:personal-star-beast-identity-product-readiness");

  const modulePath = path.join(os.tmpdir(), `guanyao-p135-product-readiness-${process.pid}.mjs`);
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
      export { convergeProductionIdentitySource } from "./src/services/productionIdentitySourceConvergence.ts";
      export { resolvePersonalStarBeastIdentityProductReadiness } from "./src/services/personalStarBeastIdentityProductReadiness.ts";
    `, resolveDir: rootDir, sourcefile: "p135-product-readiness-gate-entry.ts", loader: "ts" },
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
  const convergenceReadiness = runtime.resolveProductionIdentitySourceConvergenceReadiness(Object.freeze({ engineConsumptionResult: consumption }));
  const convergenceAuthorization = runtime.authorizeProductionIdentitySourceConvergence(Object.freeze({ readinessResult: convergenceReadiness }));
  const convergence = runtime.convergeProductionIdentitySource(Object.freeze({ authorizationResult: convergenceAuthorization }));
  const readiness = runtime.resolvePersonalStarBeastIdentityProductReadiness(Object.freeze({ convergenceResult: convergence }));
  assertEqual("P135 product readiness is ready", readiness.status, "READY");
  if (readiness.status === "READY") {
    assertEqual("readiness status is exact", readiness.readiness, "READY_FOR_PERSONAL_STAR_BEAST_IDENTITY_PRODUCT_CONSUMPTION");
    assertEqual("product consumption remains deferred", readiness.readinessReference.productConsumption, "NOT_PERFORMED");
    assertEqual("user binding remains false", readiness.readinessReference.userBinding, false);
    assertEqual("renderer consumption remains false", readiness.readinessReference.rendererConsumption, false);
    assertEqual("identity remains reference-only", readiness.readinessReference.referenceOnly, true);
    assertEqual("identity is not an animal", readiness.readinessReference.identityReference.notFourSymbolAnimal, true);
    assertEqual("identity source is preserved", readiness.readinessReference.identitySourceReference.semanticRole, "STAR_BEAST_IDENTITY_SOURCE");
  }
  const missing = runtime.resolvePersonalStarBeastIdentityProductReadiness(Object.freeze({ convergenceResult: null }));
  assertEqual("missing convergence is unavailable", missing.status, "UNAVAILABLE");
  assertEqual("missing convergence reason", missing.reason, "CONVERGENCE_RESULT_REQUIRED");
  const blocked = runtime.resolvePersonalStarBeastIdentityProductReadiness(Object.freeze({ convergenceResult: Object.freeze({ ...convergence, boundary: Object.freeze({ ...convergence.boundary, noProductIntegration: false }) }) }));
  assertEqual("invalid convergence boundary is blocked", blocked.status, "BLOCKED");
  assertEqual("invalid convergence reason", blocked.reason, "CONVERGENCE_BOUNDARY_INVALID");
}

if (failures.length > 0) {
  console.error("\nPersonal Star Beast Identity Product Readiness gate failed:");
  failures.forEach((failure) => console.error(`- ${failure}`));
  process.exit(1);
}
console.log("\nPersonal Star Beast Identity Product Readiness gate passed.");
