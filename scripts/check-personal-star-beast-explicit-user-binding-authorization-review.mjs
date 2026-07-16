import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import process from "node:process";
import { build } from "esbuild";

const rootDir = process.cwd();
const files = Object.freeze({
  type: "src/types/personalStarBeastIdentityExplicitUserBindingAuthorizationReview.ts",
  service: "src/services/personalStarBeastIdentityExplicitUserBindingAuthorizationReview.ts",
  contractType: "src/types/personalStarBeastIdentityProductConsumptionContract.ts",
  contractService: "src/services/personalStarBeastIdentityProductConsumptionContract.ts",
  protocol: "docs/GUANYAO_PERSONAL_STAR_BEAST_EXPLICIT_USER_BINDING_AUTHORIZATION_REVIEW_PROTOCOL.md",
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
    "PersonalStarBeastIdentityExplicitUserBindingAuthorizationReviewInput",
    "PersonalStarBeastIdentityExplicitUserBindingAuthorizationReviewResult",
    "READY_FOR_EXPLICIT_USER_BINDING_AUTHORIZATION",
    "authorizationStatus: \"NOT_AUTHORIZED\"",
    "userBinding: \"NOT_PERFORMED\"",
    "userConsent: \"NOT_CAPTURED\"",
    "futureExplicitAuthorizationRequired: true",
  ].forEach((marker) => assertIncludes("P137 review type", source.type, marker));
  [
    "export function reviewPersonalStarBeastIdentityExplicitUserBindingAuthorization",
    "PRODUCT_CONSUMPTION_CONTRACT_REQUIRED",
    "PRODUCT_CONSUMPTION_CONTRACT_UNAVAILABLE",
    "PRODUCT_CONSUMPTION_CONTRACT_BLOCKED",
    "CONTRACT_BOUNDARY_INVALID",
    "CONTRACT_REFERENCE_INVALID",
    "EXPLICIT_BINDING_SCOPE_INVALID",
    "IDENTITY_REFERENCE_DRIFT",
    "authorizationStatus: \"NOT_AUTHORIZED\"",
  ].forEach((marker) => assertIncludes("P137 review service", source.service, marker));
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
    "captureUserConsent",
  ].forEach((marker) => assertExcludes("P137 remains review-only", source.service, marker));
  [
    "RC-PERSONAL-STAR-BEAST-EXPLICIT-USER-BINDING-AUTHORIZATION-REVIEW-P137",
    "P136 Product Consumption Contract",
    "READY_FOR_EXPLICIT_USER_BINDING_AUTHORIZATION",
    "authorizationStatus = NOT_AUTHORIZED",
    "userBinding = NOT_PERFORMED",
    "userConsent = NOT_CAPTURED",
    "不采集用户同意",
    "不执行绑定",
  ].forEach((marker) => assertIncludes("P137 protocol", source.protocol, marker));
  [
    "PersonalStarBeastIdentityExplicitUserBindingAuthorizationReviewInput",
    "PersonalStarBeastIdentityExplicitUserBindingAuthorizationReviewResult",
    "PersonalStarBeastIdentityExplicitUserBindingAuthorizationReviewReference",
    "from \"./personalStarBeastIdentityExplicitUserBindingAuthorizationReview\"",
  ].forEach((marker) => assertIncludes("P137 type index export", source.typeIndex, marker));
  assertIncludes("P137 gate registered", packageJson.scripts?.["check:personal-star-beast-explicit-user-binding-authorization-review"] ?? "", "node scripts/check-personal-star-beast-explicit-user-binding-authorization-review.mjs");
  assertIncludes("P137 release gate registered", packageJson.scripts?.["postcheck:release"] ?? "", "npm run check:personal-star-beast-explicit-user-binding-authorization-review");

  const modulePath = path.join(os.tmpdir(), `guanyao-p137-binding-review-${process.pid}.mjs`);
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
      export { reviewPersonalStarBeastIdentityExplicitUserBindingAuthorization } from "./src/services/personalStarBeastIdentityExplicitUserBindingAuthorizationReview.ts";
    `, resolveDir: rootDir, sourcefile: "p137-binding-review-gate-entry.ts", loader: "ts" },
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
  const review = runtime.reviewPersonalStarBeastIdentityExplicitUserBindingAuthorization(Object.freeze({ productConsumptionContractResult: contract }));
  assertEqual("P137 review is ready", review.status, "READY");
  if (review.status === "READY") {
    assertEqual("review status is exact", review.reviewStatus, "READY_FOR_EXPLICIT_USER_BINDING_AUTHORIZATION");
    assertEqual("authorization remains not granted", review.reviewReference.authorizationStatus, "NOT_AUTHORIZED");
    assertEqual("binding remains deferred", review.reviewReference.userBinding, "NOT_PERFORMED");
    assertEqual("consent remains absent", review.reviewReference.userConsent, "NOT_CAPTURED");
    assertEqual("product consumption remains deferred", review.reviewReference.productConsumption, "NOT_PERFORMED");
    assertEqual("explicit authorization remains required", review.reviewReference.futureExplicitAuthorizationRequired, true);
  }
  const missing = runtime.reviewPersonalStarBeastIdentityExplicitUserBindingAuthorization(Object.freeze({ productConsumptionContractResult: null }));
  assertEqual("missing contract is unavailable", missing.status, "UNAVAILABLE");
  assertEqual("missing contract reason", missing.reason, "PRODUCT_CONSUMPTION_CONTRACT_REQUIRED");
  const blocked = runtime.reviewPersonalStarBeastIdentityExplicitUserBindingAuthorization(Object.freeze({ productConsumptionContractResult: Object.freeze({ ...contract, boundary: Object.freeze({ ...contract.boundary, noUserBinding: false }) }) }));
  assertEqual("invalid contract boundary is blocked", blocked.status, "BLOCKED");
  assertEqual("invalid contract reason", blocked.reason, "CONTRACT_BOUNDARY_INVALID");
}

if (failures.length > 0) {
  console.error("\nPersonal Star Beast Explicit User Binding Authorization Review gate failed:");
  failures.forEach((failure) => console.error(`- ${failure}`));
  process.exit(1);
}
console.log("\nPersonal Star Beast Explicit User Binding Authorization Review gate passed.");
