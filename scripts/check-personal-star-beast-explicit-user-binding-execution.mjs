import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import process from "node:process";
import { build } from "esbuild";

const rootDir = process.cwd();
const files = Object.freeze({
  type: "src/types/personalStarBeastIdentityExplicitUserBindingExecution.ts",
  service: "src/services/personalStarBeastIdentityExplicitUserBindingExecution.ts",
  confirmationType: "src/types/personalStarBeastIdentityExplicitUserBindingExecutionAuthorizationConfirmation.ts",
  confirmationService: "src/services/personalStarBeastIdentityExplicitUserBindingExecutionAuthorizationConfirmation.ts",
  protocol: "docs/GUANYAO_PERSONAL_STAR_BEAST_EXPLICIT_USER_BINDING_EXECUTION_PROTOCOL.md",
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
    "PersonalStarBeastIdentityExplicitUserBindingExecutionInput",
    "PersonalStarBeastIdentityExplicitUserBindingExecutionResult",
    "EXPLICIT_USER_BINDING_EXECUTION",
    "EXPLICIT_USER_BINDING_EXECUTED",
    "bindingExecutionStatus: \"PERFORMED\"",
    "userBinding: \"PERFORMED\"",
    "storagePersistence: \"DEFERRED\"",
    "persistenceDeferred: true",
  ].forEach((marker) => assertIncludes("P147 execution type", source.type, marker));
  [
    "export function executePersonalStarBeastIdentityExplicitUserBinding",
    "AUTHORIZATION_CONFIRMATION_REQUIRED",
    "AUTHORIZATION_CONFIRMATION_UNAVAILABLE",
    "AUTHORIZATION_CONFIRMATION_BLOCKED",
    "CONFIRMATION_BOUNDARY_INVALID",
    "CONFIRMATION_REFERENCE_INVALID",
    "USER_SUBJECT_REFERENCE_REQUIRED",
    "USER_SUBJECT_REFERENCE_INVALID",
    "IDENTITY_REFERENCE_DRIFT",
    "storagePersistence: \"DEFERRED\"",
  ].forEach((marker) => assertIncludes("P147 execution service", source.service, marker));
  [
    "localStorage",
    "sessionStorage",
    "document.",
    "writeStorage",
    "createUserProfile",
    "consumeProductIdentity",
    "runMotherCodeLandingEngine",
    "resolveStarbeastFromBirthDate",
    "resolveLifeArchetypeProfileFromMotherCode",
    "createRenderer",
  ].forEach((marker) => assertExcludes("P147 stays domain-only", source.service, marker));
  [
    "RC-PERSONAL-STAR-BEAST-EXPLICIT-USER-BINDING-EXECUTION-P147",
    "P146 Explicit Execution Authorization Confirmation",
    "EXPLICIT_USER_BINDING_EXECUTED",
    "bindingExecutionStatus = PERFORMED",
    "storagePersistence = DEFERRED",
    "不写入 Storage",
    "不创建用户档案",
  ].forEach((marker) => assertIncludes("P147 protocol", source.protocol, marker));
  [
    "PersonalStarBeastIdentityExplicitUserBindingExecutionInput",
    "PersonalStarBeastIdentityExplicitUserBindingExecutionResult",
    "PersonalStarBeastIdentityExplicitUserBindingReference",
    "from \"./personalStarBeastIdentityExplicitUserBindingExecution\"",
  ].forEach((marker) => assertIncludes("P147 type index export", source.typeIndex, marker));
  assertIncludes("P147 gate registered", packageJson.scripts?.["check:personal-star-beast-explicit-user-binding-execution"] ?? "", "node scripts/check-personal-star-beast-explicit-user-binding-execution.mjs");
  assertIncludes("P147 release gate registered", packageJson.scripts?.["postcheck:release"] ?? "", "npm run check:personal-star-beast-explicit-user-binding-execution");

  const modulePath = path.join(os.tmpdir(), `guanyao-p147-binding-execution-${process.pid}.mjs`);
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
    `, resolveDir: rootDir, sourcefile: "p147-binding-execution-gate-entry.ts", loader: "ts" },
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
  const intentCommand = Object.freeze({ commandType: "EXPLICIT_USER_BINDING_INTENT", commandId: "p147-intent-command", subjectDecision: "DECLARE_EXPLICIT_USER_BINDING_INTENT", confirmationReference: "opaque-confirmation-reference", identityReferenceAccepted: true, bindingScope: "PERSONAL_STAR_BEAST_IDENTITY_REFERENCE_ONLY" });
  const intentResult = runtime.createPersonalStarBeastIdentityExplicitUserBindingAuthorizationCommand(Object.freeze({ reviewResult: review, command: intentCommand }));
  const pendingResolution = runtime.resolvePersonalStarBeastIdentityExplicitUserBindingAuthorization(Object.freeze({ commandResult: intentResult }));
  const decisionContract = runtime.reviewPersonalStarBeastIdentityExplicitUserBindingAuthorizationDecisionContract(Object.freeze({ resolutionResult: pendingResolution }));
  const grantDecisionCommand = Object.freeze({ commandType: "EXPLICIT_USER_BINDING_AUTHORIZATION_DECISION", commandId: "p147-grant-decision-command", subjectDecision: "GRANT", decisionReference: "opaque-explicit-decision-reference", identityReferenceAccepted: true, decisionScope: "PERSONAL_STAR_BEAST_IDENTITY_REFERENCE_ONLY" });
  const grantDecisionCommandResult = runtime.createPersonalStarBeastIdentityExplicitUserBindingAuthorizationDecisionCommand(Object.freeze({ decisionContractResult: decisionContract, command: grantDecisionCommand }));
  const grantDecisionResolution = runtime.resolvePersonalStarBeastIdentityExplicitUserBindingAuthorizationDecision(Object.freeze({ decisionCommandResult: grantDecisionCommandResult }));
  const grantEligibility = runtime.resolvePersonalStarBeastIdentityExplicitUserBindingEligibility(Object.freeze({ decisionResolutionResult: grantDecisionResolution }));
  const bindingCommand = Object.freeze({ commandType: "EXPLICIT_PERSONAL_STAR_BEAST_IDENTITY_BINDING", commandId: "p147-binding-command", subjectIntent: "EXECUTE_EXPLICIT_USER_BINDING", executionReference: "opaque-binding-execution-reference", identityReferenceAccepted: true, bindingScope: "PERSONAL_STAR_BEAST_IDENTITY_REFERENCE_ONLY" });
  const commandResult = runtime.createPersonalStarBeastIdentityExplicitUserBindingCommand(Object.freeze({ eligibilityResult: grantEligibility, command: bindingCommand }));
  const reviewResult = runtime.reviewPersonalStarBeastIdentityExplicitUserBindingExecutionAuthorization(Object.freeze({ commandResult }));
  const confirmation = Object.freeze({ commandType: "EXPLICIT_USER_BINDING_EXECUTION_AUTHORIZATION_CONFIRMATION", commandId: "p147-confirmation-command", subjectDecision: "CONFIRM_EXPLICIT_USER_BINDING_EXECUTION_AUTHORIZATION", confirmationReference: "opaque-execution-authorization-confirmation", identityReferenceAccepted: true, bindingScope: "PERSONAL_STAR_BEAST_IDENTITY_REFERENCE_ONLY" });
  const confirmationResult = runtime.confirmPersonalStarBeastIdentityExplicitUserBindingExecutionAuthorization(Object.freeze({ reviewResult, confirmation }));
  const executionResult = runtime.executePersonalStarBeastIdentityExplicitUserBinding(Object.freeze({ authorizationConfirmationResult: confirmationResult, userSubjectReference: "user-subject:p147-fixture" }));
  assertEqual("P146 authorization confirmation is ready", confirmationResult.status, "READY");
  assertEqual("P147 binding execution is bound", executionResult.status, "BOUND");
  if (executionResult.status === "BOUND") {
    assertEqual("P147 execution status is exact", executionResult.executionStatus, "EXPLICIT_USER_BINDING_EXECUTED");
    assertEqual("P147 binding is performed", executionResult.bindingReference.bindingExecutionStatus, "PERFORMED");
    assertEqual("P147 user binding is performed", executionResult.bindingReference.userBinding, "PERFORMED");
    assertEqual("P147 persistence remains deferred", executionResult.bindingReference.storagePersistence, "DEFERRED");
    assertEqual("P147 product consumption remains deferred", executionResult.bindingReference.productConsumption, "NOT_PERFORMED");
    assertEqual("P147 identity reference is preserved", executionResult.bindingReference.personalStarBeastIdentityReference, confirmationResult.confirmationReference.reviewReference.commandReference.eligibilityReference.decisionResolutionReference.decisionCommandReference.decisionContractReference.resolutionReference.commandReference.reviewReference.contractReference.readinessReference.identityReference);
  }
  const missing = runtime.executePersonalStarBeastIdentityExplicitUserBinding(Object.freeze({ authorizationConfirmationResult: confirmationResult, userSubjectReference: null }));
  assertEqual("missing user subject is unavailable", missing.status, "UNAVAILABLE");
  assertEqual("missing user subject reason", missing.reason, "USER_SUBJECT_REFERENCE_REQUIRED");
  const invalid = runtime.executePersonalStarBeastIdentityExplicitUserBinding(Object.freeze({ authorizationConfirmationResult: confirmationResult, userSubjectReference: "raw-user-payload" }));
  assertEqual("raw user subject is blocked", invalid.status, "BLOCKED");
  assertEqual("raw user subject reason", invalid.reason, "USER_SUBJECT_REFERENCE_INVALID");
  const blocked = runtime.executePersonalStarBeastIdentityExplicitUserBinding(Object.freeze({ authorizationConfirmationResult: Object.freeze({ ...confirmationResult, boundary: Object.freeze({ ...confirmationResult.boundary, executionAuthorized: false }) }), userSubjectReference: "user-subject:p147-fixture" }));
  assertEqual("invalid confirmation boundary is blocked", blocked.status, "BLOCKED");
  assertEqual("invalid confirmation boundary reason", blocked.reason, "CONFIRMATION_BOUNDARY_INVALID");
}

if (failures.length > 0) {
  console.error("\nPersonal Star Beast Explicit User Binding Execution gate failed:");
  failures.forEach((failure) => console.error(`- ${failure}`));
  process.exit(1);
}
console.log("\nPersonal Star Beast Explicit User Binding Execution gate passed.");
