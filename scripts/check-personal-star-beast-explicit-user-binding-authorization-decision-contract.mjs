import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import process from "node:process";
import { build } from "esbuild";

const rootDir = process.cwd();
const files = Object.freeze({
  type: "src/types/personalStarBeastIdentityExplicitUserBindingAuthorizationDecisionContract.ts",
  service: "src/services/personalStarBeastIdentityExplicitUserBindingAuthorizationDecisionContract.ts",
  resolutionType: "src/types/personalStarBeastIdentityExplicitUserBindingAuthorizationResolution.ts",
  resolutionService: "src/services/personalStarBeastIdentityExplicitUserBindingAuthorizationResolution.ts",
  protocol: "docs/GUANYAO_PERSONAL_STAR_BEAST_EXPLICIT_USER_BINDING_AUTHORIZATION_DECISION_CONTRACT_PROTOCOL.md",
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
    "PersonalStarBeastIdentityExplicitUserBindingAuthorizationDecisionContractInput",
    "PersonalStarBeastIdentityExplicitUserBindingAuthorizationDecisionContractResult",
    "READY_FOR_EXPLICIT_USER_BINDING_AUTHORIZATION_DECISION",
    "decisionStatus: \"NOT_DECIDED\"",
    "authorizationStatus: \"NOT_AUTHORIZED\"",
    "allowedDecisions: readonly [\"GRANT\", \"DECLINE\"]",
    "noDefaultDecision: true",
  ].forEach((marker) => assertIncludes("P140 decision contract type", source.type, marker));
  [
    "export function reviewPersonalStarBeastIdentityExplicitUserBindingAuthorizationDecisionContract",
    "RESOLUTION_RESULT_REQUIRED",
    "RESOLUTION_RESULT_UNAVAILABLE",
    "RESOLUTION_RESULT_BLOCKED",
    "RESOLUTION_BOUNDARY_INVALID",
    "RESOLUTION_REFERENCE_INVALID",
    "DECISION_SCOPE_INVALID",
    "IDENTITY_REFERENCE_DRIFT",
    "decisionStatus: \"NOT_DECIDED\"",
  ].forEach((marker) => assertIncludes("P140 decision contract service", source.service, marker));
  [
    "resolveStarbeastFromBirthDate",
    "runMotherCodeLandingEngine",
    "resolveLifeArchetypeProfileFromMotherCode",
    "localStorage",
    "sessionStorage",
    "document.",
    "createRenderer",
    "writeStorage",
    "bindUser",
    "grantAuthorization",
    "captureUserDecision",
  ].forEach((marker) => assertExcludes("P140 remains contract-only", source.service, marker));
  [
    "RC-PERSONAL-STAR-BEAST-EXPLICIT-USER-BINDING-AUTHORIZATION-DECISION-CONTRACT-P140",
    "P139 Pending Authorization Resolution",
    "PERSONAL_STAR_BEAST_IDENTITY_REFERENCE_ONLY",
    "GRANT",
    "DECLINE",
    "decisionStatus = NOT_DECIDED",
    "authorizationStatus = NOT_AUTHORIZED",
    "不默认决定",
    "不执行绑定",
  ].forEach((marker) => assertIncludes("P140 protocol", source.protocol, marker));
  [
    "PersonalStarBeastIdentityExplicitUserBindingAuthorizationDecisionContractInput",
    "PersonalStarBeastIdentityExplicitUserBindingAuthorizationDecisionContractResult",
    "PersonalStarBeastIdentityExplicitUserBindingAuthorizationDecisionContractReference",
    "from \"./personalStarBeastIdentityExplicitUserBindingAuthorizationDecisionContract\"",
  ].forEach((marker) => assertIncludes("P140 type index export", source.typeIndex, marker));
  assertIncludes("P140 gate registered", packageJson.scripts?.["check:personal-star-beast-explicit-user-binding-authorization-decision-contract"] ?? "", "node scripts/check-personal-star-beast-explicit-user-binding-authorization-decision-contract.mjs");
  assertIncludes("P140 release gate registered", packageJson.scripts?.["postcheck:release"] ?? "", "npm run check:personal-star-beast-explicit-user-binding-authorization-decision-contract");

  const modulePath = path.join(os.tmpdir(), `guanyao-p140-binding-decision-contract-${process.pid}.mjs`);
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
      export { createPersonalStarBeastIdentityExplicitUserBindingAuthorizationCommand } from "./src/services/personalStarBeastIdentityExplicitUserBindingAuthorizationCommand.ts";
      export { resolvePersonalStarBeastIdentityExplicitUserBindingAuthorization } from "./src/services/personalStarBeastIdentityExplicitUserBindingAuthorizationResolution.ts";
      export { reviewPersonalStarBeastIdentityExplicitUserBindingAuthorizationDecisionContract } from "./src/services/personalStarBeastIdentityExplicitUserBindingAuthorizationDecisionContract.ts";
    `, resolveDir: rootDir, sourcefile: "p140-binding-decision-contract-gate-entry.ts", loader: "ts" },
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
  const productContract = runtime.reviewPersonalStarBeastIdentityProductConsumptionContract(Object.freeze({ readinessResult: readiness }));
  const review = runtime.reviewPersonalStarBeastIdentityExplicitUserBindingAuthorization(Object.freeze({ productConsumptionContractResult: productContract }));
  const command = Object.freeze({
    commandType: "EXPLICIT_USER_BINDING_INTENT",
    commandId: "p140-test-command",
    subjectDecision: "DECLARE_EXPLICIT_USER_BINDING_INTENT",
    confirmationReference: "opaque-confirmation-reference",
    identityReferenceAccepted: true,
    bindingScope: "PERSONAL_STAR_BEAST_IDENTITY_REFERENCE_ONLY",
  });
  const commandResult = runtime.createPersonalStarBeastIdentityExplicitUserBindingAuthorizationCommand(Object.freeze({ reviewResult: review, command }));
  const resolution = runtime.resolvePersonalStarBeastIdentityExplicitUserBindingAuthorization(Object.freeze({ commandResult }));
  const result = runtime.reviewPersonalStarBeastIdentityExplicitUserBindingAuthorizationDecisionContract(Object.freeze({ resolutionResult: resolution }));
  assertEqual("P140 decision contract is ready", result.status, "READY");
  if (result.status === "READY") {
    assertEqual("contract status is exact", result.contractStatus, "READY_FOR_EXPLICIT_USER_BINDING_AUTHORIZATION_DECISION");
    assertEqual("decision remains not decided", result.contractReference.decisionStatus, "NOT_DECIDED");
    assertEqual("authorization remains not granted", result.contractReference.authorizationStatus, "NOT_AUTHORIZED");
    assertEqual("binding remains deferred", result.contractReference.userBinding, "NOT_PERFORMED");
    assertEqual("product consumption remains deferred", result.contractReference.productConsumption, "NOT_PERFORMED");
    assertEqual("no default decision", result.contractReference.noDefaultDecision, true);
    assertEqual("future decision remains required", result.contractReference.futureExplicitDecisionRequired, true);
  }
  const missing = runtime.reviewPersonalStarBeastIdentityExplicitUserBindingAuthorizationDecisionContract(Object.freeze({ resolutionResult: null }));
  assertEqual("missing resolution is unavailable", missing.status, "UNAVAILABLE");
  assertEqual("missing resolution reason", missing.reason, "RESOLUTION_RESULT_REQUIRED");
  const blocked = runtime.reviewPersonalStarBeastIdentityExplicitUserBindingAuthorizationDecisionContract(Object.freeze({ resolutionResult: Object.freeze({ ...resolution, boundary: Object.freeze({ ...resolution.boundary, authorizationGranted: true }) }) }));
  assertEqual("invalid resolution boundary is blocked", blocked.status, "BLOCKED");
  assertEqual("invalid resolution reason", blocked.reason, "RESOLUTION_BOUNDARY_INVALID");
}

if (failures.length > 0) {
  console.error("\nPersonal Star Beast Explicit User Binding Authorization Decision Contract gate failed:");
  failures.forEach((failure) => console.error(`- ${failure}`));
  process.exit(1);
}
console.log("\nPersonal Star Beast Explicit User Binding Authorization Decision Contract gate passed.");
