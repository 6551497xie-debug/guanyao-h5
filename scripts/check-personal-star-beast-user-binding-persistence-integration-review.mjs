import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import process from "node:process";
import { build } from "esbuild";

const rootDir = process.cwd();
const files = Object.freeze({
  type: "src/types/personalStarBeastIdentityUserBindingPersistenceIntegrationReview.ts",
  service: "src/services/personalStarBeastIdentityUserBindingPersistenceIntegrationReview.ts",
  executionType: "src/types/personalStarBeastIdentityExplicitUserBindingExecution.ts",
  executionService: "src/services/personalStarBeastIdentityExplicitUserBindingExecution.ts",
  protocol: "docs/GUANYAO_PERSONAL_STAR_BEAST_USER_BINDING_PERSISTENCE_INTEGRATION_REVIEW_PROTOCOL.md",
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
    "PersonalStarBeastIdentityUserBindingPersistenceIntegrationReviewInput",
    "PersonalStarBeastIdentityUserBindingPersistenceIntegrationReviewResult",
    "READY_FOR_REAL_USER_STORAGE_BINDING_INTEGRATION_REVIEW",
    "integrationAuthorized: false",
    "storagePersistence: \"DEFERRED\"",
    "realUserBinding: \"DOMAIN_REFERENCE_BOUND\"",
    "futureIntegrationReviewRequired: true",
  ].forEach((marker) => assertIncludes("P148 review type", source.type, marker));
  [
    "export function reviewPersonalStarBeastIdentityUserBindingPersistenceIntegration",
    "BINDING_EXECUTION_RESULT_REQUIRED",
    "BINDING_EXECUTION_RESULT_UNAVAILABLE",
    "BINDING_EXECUTION_RESULT_BLOCKED",
    "BINDING_EXECUTION_BOUNDARY_INVALID",
    "BINDING_REFERENCE_INVALID",
    "IDENTITY_REFERENCE_DRIFT",
    "integrationAuthorized: false",
  ].forEach((marker) => assertIncludes("P148 review service", source.service, marker));
  [
    "localStorage",
    "sessionStorage",
    "document.",
    "writeStorage",
    "createUserProfile",
    "bindUser",
    "createRenderer",
    "runMotherCodeLandingEngine",
    "resolveStarbeastFromBirthDate",
  ].forEach((marker) => assertExcludes("P148 remains review-only", source.service, marker));
  [
    "RC-PERSONAL-STAR-BEAST-USER-BINDING-PERSISTENCE-INTEGRATION-REVIEW-P148",
    "P147 Explicit User Binding Execution",
    "READY_FOR_REAL_USER_STORAGE_BINDING_INTEGRATION_REVIEW",
    "integrationAuthorized = false",
    "storagePersistence = DEFERRED",
    "不写 Storage",
    "不接真实认证",
  ].forEach((marker) => assertIncludes("P148 protocol", source.protocol, marker));
  [
    "PersonalStarBeastIdentityUserBindingPersistenceIntegrationReviewInput",
    "PersonalStarBeastIdentityUserBindingPersistenceIntegrationReviewResult",
    "PersonalStarBeastIdentityUserBindingPersistenceIntegrationReviewReference",
    "from \"./personalStarBeastIdentityUserBindingPersistenceIntegrationReview\"",
  ].forEach((marker) => assertIncludes("P148 type index export", source.typeIndex, marker));
  assertIncludes("P148 gate registered", packageJson.scripts?.["check:personal-star-beast-user-binding-persistence-integration-review"] ?? "", "node scripts/check-personal-star-beast-user-binding-persistence-integration-review.mjs");
  assertIncludes("P148 release gate registered", packageJson.scripts?.["postcheck:release"] ?? "", "npm run check:personal-star-beast-user-binding-persistence-integration-review");

  const modulePath = path.join(os.tmpdir(), `guanyao-p148-binding-persistence-review-${process.pid}.mjs`);
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
      export { createPersonalStarBeastIdentityExplicitUserBindingAuthorizationDecisionCommand } from "./src/services/personalStarBeastIdentityExplicitUserBindingAuthorizationDecisionCommand.ts";
      export { resolvePersonalStarBeastIdentityExplicitUserBindingAuthorizationDecision } from "./src/services/personalStarBeastIdentityExplicitUserBindingAuthorizationDecisionResolution.ts";
      export { resolvePersonalStarBeastIdentityExplicitUserBindingEligibility } from "./src/services/personalStarBeastIdentityExplicitUserBindingEligibility.ts";
      export { createPersonalStarBeastIdentityExplicitUserBindingCommand } from "./src/services/personalStarBeastIdentityExplicitUserBindingCommand.ts";
      export { reviewPersonalStarBeastIdentityExplicitUserBindingExecutionAuthorization } from "./src/services/personalStarBeastIdentityExplicitUserBindingExecutionAuthorizationReview.ts";
      export { confirmPersonalStarBeastIdentityExplicitUserBindingExecutionAuthorization } from "./src/services/personalStarBeastIdentityExplicitUserBindingExecutionAuthorizationConfirmation.ts";
      export { executePersonalStarBeastIdentityExplicitUserBinding } from "./src/services/personalStarBeastIdentityExplicitUserBindingExecution.ts";
      export { reviewPersonalStarBeastIdentityUserBindingPersistenceIntegration } from "./src/services/personalStarBeastIdentityUserBindingPersistenceIntegrationReview.ts";
    `, resolveDir: rootDir, sourcefile: "p148-binding-persistence-review-gate-entry.ts", loader: "ts" },
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
  const intentCommand = Object.freeze({ commandType: "EXPLICIT_USER_BINDING_INTENT", commandId: "p148-intent-command", subjectDecision: "DECLARE_EXPLICIT_USER_BINDING_INTENT", confirmationReference: "opaque-confirmation-reference", identityReferenceAccepted: true, bindingScope: "PERSONAL_STAR_BEAST_IDENTITY_REFERENCE_ONLY" });
  const intentResult = runtime.createPersonalStarBeastIdentityExplicitUserBindingAuthorizationCommand(Object.freeze({ reviewResult: review, command: intentCommand }));
  const pendingResolution = runtime.resolvePersonalStarBeastIdentityExplicitUserBindingAuthorization(Object.freeze({ commandResult: intentResult }));
  const decisionContract = runtime.reviewPersonalStarBeastIdentityExplicitUserBindingAuthorizationDecisionContract(Object.freeze({ resolutionResult: pendingResolution }));
  const grantDecisionCommand = Object.freeze({ commandType: "EXPLICIT_USER_BINDING_AUTHORIZATION_DECISION", commandId: "p148-grant-decision-command", subjectDecision: "GRANT", decisionReference: "opaque-explicit-decision-reference", identityReferenceAccepted: true, decisionScope: "PERSONAL_STAR_BEAST_IDENTITY_REFERENCE_ONLY" });
  const grantDecisionCommandResult = runtime.createPersonalStarBeastIdentityExplicitUserBindingAuthorizationDecisionCommand(Object.freeze({ decisionContractResult: decisionContract, command: grantDecisionCommand }));
  const grantDecisionResolution = runtime.resolvePersonalStarBeastIdentityExplicitUserBindingAuthorizationDecision(Object.freeze({ decisionCommandResult: grantDecisionCommandResult }));
  const grantEligibility = runtime.resolvePersonalStarBeastIdentityExplicitUserBindingEligibility(Object.freeze({ decisionResolutionResult: grantDecisionResolution }));
  const bindingCommand = Object.freeze({ commandType: "EXPLICIT_PERSONAL_STAR_BEAST_IDENTITY_BINDING", commandId: "p148-binding-command", subjectIntent: "EXECUTE_EXPLICIT_USER_BINDING", executionReference: "opaque-binding-execution-reference", identityReferenceAccepted: true, bindingScope: "PERSONAL_STAR_BEAST_IDENTITY_REFERENCE_ONLY" });
  const commandResult = runtime.createPersonalStarBeastIdentityExplicitUserBindingCommand(Object.freeze({ eligibilityResult: grantEligibility, command: bindingCommand }));
  const executionReview = runtime.reviewPersonalStarBeastIdentityExplicitUserBindingExecutionAuthorization(Object.freeze({ commandResult }));
  const confirmation = Object.freeze({ commandType: "EXPLICIT_USER_BINDING_EXECUTION_AUTHORIZATION_CONFIRMATION", commandId: "p148-confirmation-command", subjectDecision: "CONFIRM_EXPLICIT_USER_BINDING_EXECUTION_AUTHORIZATION", confirmationReference: "opaque-execution-authorization-confirmation", identityReferenceAccepted: true, bindingScope: "PERSONAL_STAR_BEAST_IDENTITY_REFERENCE_ONLY" });
  const confirmationResult = runtime.confirmPersonalStarBeastIdentityExplicitUserBindingExecutionAuthorization(Object.freeze({ reviewResult: executionReview, confirmation }));
  const executionResult = runtime.executePersonalStarBeastIdentityExplicitUserBinding(Object.freeze({ authorizationConfirmationResult: confirmationResult, userSubjectReference: "user-subject:p148-fixture" }));
  const reviewResult = runtime.reviewPersonalStarBeastIdentityUserBindingPersistenceIntegration(Object.freeze({ executionResult }));
  assertEqual("P147 binding execution is complete", executionResult.status, "BOUND");
  assertEqual("P148 integration review is ready", reviewResult.status, "READY");
  if (reviewResult.status === "READY") {
    assertEqual("P148 review status is exact", reviewResult.reviewStatus, "READY_FOR_REAL_USER_STORAGE_BINDING_INTEGRATION_REVIEW");
    assertEqual("P148 integration is not authorized", reviewResult.reviewReference.integrationAuthorized, false);
    assertEqual("P148 storage remains deferred", reviewResult.reviewReference.storagePersistence, "DEFERRED");
    assertEqual("P148 product integration remains unperformed", reviewResult.reviewReference.productIntegration, "NOT_PERFORMED");
  }
  const missing = runtime.reviewPersonalStarBeastIdentityUserBindingPersistenceIntegration(Object.freeze({ executionResult: null }));
  assertEqual("missing execution result is unavailable", missing.status, "UNAVAILABLE");
  assertEqual("missing execution result reason", missing.reason, "BINDING_EXECUTION_RESULT_REQUIRED");
  const blocked = runtime.reviewPersonalStarBeastIdentityUserBindingPersistenceIntegration(Object.freeze({ executionResult: Object.freeze({ ...executionResult, boundary: Object.freeze({ ...executionResult.boundary, storageWritePerformed: true }) }) }));
  assertEqual("invalid execution boundary is blocked", blocked.status, "BLOCKED");
  assertEqual("invalid execution boundary reason", blocked.reason, "BINDING_EXECUTION_BOUNDARY_INVALID");
}

if (failures.length > 0) {
  console.error("\nPersonal Star Beast User Binding Persistence Integration Review gate failed:");
  failures.forEach((failure) => console.error(`- ${failure}`));
  process.exit(1);
}
console.log("\nPersonal Star Beast User Binding Persistence Integration Review gate passed.");
