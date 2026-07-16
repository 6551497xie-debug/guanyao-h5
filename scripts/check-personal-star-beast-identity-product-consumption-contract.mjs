import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import process from "node:process";
import { build } from "esbuild";

const rootDir = process.cwd();
const files = Object.freeze({
  type: "src/types/personalStarBeastIdentityProductConsumptionContract.ts",
  service: "src/services/personalStarBeastIdentityProductConsumptionContract.ts",
  readinessType: "src/types/personalStarBeastIdentityProductReadiness.ts",
  readinessService: "src/services/personalStarBeastIdentityProductReadiness.ts",
  protocol: "docs/GUANYAO_PERSONAL_STAR_BEAST_IDENTITY_PRODUCT_CONSUMPTION_CONTRACT.md",
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
    "PersonalStarBeastIdentityProductConsumptionContractInput",
    "PersonalStarBeastIdentityProductConsumptionContractResult",
    "PERSONAL_STAR_BEAST_IDENTITY_PRODUCT_CONSUMPTION_CONTRACT_READY",
    "PERSONAL_STAR_BEAST_IDENTITY_PRODUCT_CONSUMPTION_CONTRACT",
    "explicitUserBindingRequired: true",
    "productConsumption: \"NOT_PERFORMED\"",
    "noAutomaticUserBinding: true",
  ].forEach((marker) => assertIncludes("P136 contract type", source.type, marker));
  [
    "export function reviewPersonalStarBeastIdentityProductConsumptionContract",
    "READINESS_RESULT_REQUIRED",
    "READINESS_RESULT_UNAVAILABLE",
    "READINESS_RESULT_BLOCKED",
    "READINESS_BOUNDARY_INVALID",
    "READINESS_REFERENCE_INVALID",
    "IDENTITY_SOURCE_DRIFT",
    "CONSUMPTION_SCOPE_INVALID",
    "explicitUserBindingRequired: true",
  ].forEach((marker) => assertIncludes("P136 contract service", source.service, marker));
  [
    "resolveStarbeastFromBirthDate",
    "runMotherCodeLandingEngine",
    "resolveLifeArchetypeProfileFromMotherCode",
    "localStorage",
    "sessionStorage",
    "document.",
    "createPersonalStarBeast",
    "createRenderer",
    "bindUser",
  ].forEach((marker) => assertExcludes("P136 remains contract-only", source.service, marker));
  [
    "RC-PERSONAL-STAR-BEAST-IDENTITY-PRODUCT-CONSUMPTION-CONTRACT-P136",
    "P135 Product Consumption Readiness",
    "productConsumption = NOT_PERFORMED",
    "noAutomaticUserBinding = true",
    "explicitUserBindingRequired = true",
    "不是产品消费实现",
    "不是用户绑定",
  ].forEach((marker) => assertIncludes("P136 protocol", source.protocol, marker));
  [
    "PersonalStarBeastIdentityProductConsumptionContractInput",
    "PersonalStarBeastIdentityProductConsumptionContractResult",
    "PersonalStarBeastIdentityProductConsumptionContractReference",
    "from \"./personalStarBeastIdentityProductConsumptionContract\"",
  ].forEach((marker) => assertIncludes("P136 type index export", source.typeIndex, marker));
  assertIncludes("P136 gate registered", packageJson.scripts?.["check:personal-star-beast-identity-product-consumption-contract"] ?? "", "node scripts/check-personal-star-beast-identity-product-consumption-contract.mjs");
  assertIncludes("P136 release gate registered", packageJson.scripts?.["postcheck:release"] ?? "", "npm run check:personal-star-beast-identity-product-consumption-contract");

  const modulePath = path.join(os.tmpdir(), `guanyao-p136-product-contract-${process.pid}.mjs`);
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
      export { reviewPersonalStarBeastIdentityProductConsumptionContract } from "./src/services/personalStarBeastIdentityProductConsumptionContract.ts";
    `, resolveDir: rootDir, sourcefile: "p136-product-contract-gate-entry.ts", loader: "ts" },
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
  const contract = runtime.reviewPersonalStarBeastIdentityProductConsumptionContract(Object.freeze({ readinessResult: readiness }));
  assertEqual("P136 contract is ready", contract.status, "READY");
  if (contract.status === "READY") {
    assertEqual("contract status is exact", contract.contractStatus, "PERSONAL_STAR_BEAST_IDENTITY_PRODUCT_CONSUMPTION_CONTRACT_READY");
    assertEqual("consumption remains deferred", contract.contractReference.productConsumption, "NOT_PERFORMED");
    assertEqual("explicit binding remains required", contract.contractReference.explicitUserBindingRequired, true);
    assertEqual("automatic binding remains disabled", contract.contractReference.noAutomaticUserBinding, true);
    assertEqual("contract is reference-only", contract.contractReference.referenceOnly, true);
    assertEqual("renderer remains deferred", contract.contractReference.noRendererInvocation, true);
  }
  const missing = runtime.reviewPersonalStarBeastIdentityProductConsumptionContract(Object.freeze({ readinessResult: null }));
  assertEqual("missing readiness is unavailable", missing.status, "UNAVAILABLE");
  assertEqual("missing readiness reason", missing.reason, "READINESS_RESULT_REQUIRED");
  const blocked = runtime.reviewPersonalStarBeastIdentityProductConsumptionContract(Object.freeze({ readinessResult: Object.freeze({ ...readiness, boundary: Object.freeze({ ...readiness.boundary, noUserBinding: false }) }) }));
  assertEqual("invalid readiness boundary is blocked", blocked.status, "BLOCKED");
  assertEqual("invalid readiness reason", blocked.reason, "READINESS_BOUNDARY_INVALID");
}

if (failures.length > 0) {
  console.error("\nPersonal Star Beast Identity Product Consumption Contract gate failed:");
  failures.forEach((failure) => console.error(`- ${failure}`));
  process.exit(1);
}
console.log("\nPersonal Star Beast Identity Product Consumption Contract gate passed.");
