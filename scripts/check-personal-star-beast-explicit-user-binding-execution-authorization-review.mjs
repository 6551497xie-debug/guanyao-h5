import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import process from "node:process";
import { build } from "esbuild";

const rootDir = process.cwd();
const files = Object.freeze({
  type: "src/types/personalStarBeastIdentityExplicitUserBindingExecutionAuthorizationReview.ts",
  service: "src/services/personalStarBeastIdentityExplicitUserBindingExecutionAuthorizationReview.ts",
  commandType: "src/types/personalStarBeastIdentityExplicitUserBindingCommand.ts",
  commandService: "src/services/personalStarBeastIdentityExplicitUserBindingCommand.ts",
  protocol: "docs/GUANYAO_PERSONAL_STAR_BEAST_EXPLICIT_USER_BINDING_EXECUTION_AUTHORIZATION_REVIEW_PROTOCOL.md",
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
    "PersonalStarBeastIdentityExplicitUserBindingExecutionAuthorizationReviewInput",
    "PersonalStarBeastIdentityExplicitUserBindingExecutionAuthorizationReviewResult",
    "READY_FOR_EXPLICIT_USER_BINDING_EXECUTION",
    "executionAuthorized: false",
    "bindingExecutionStatus: \"NOT_PERFORMED\"",
    "futureExplicitExecutionRequired: true",
  ].forEach((marker) => assertIncludes("P145 review type", source.type, marker));
  [
    "export function reviewPersonalStarBeastIdentityExplicitUserBindingExecutionAuthorization",
    "COMMAND_RESULT_REQUIRED",
    "COMMAND_RESULT_UNAVAILABLE",
    "COMMAND_RESULT_BLOCKED",
    "COMMAND_BOUNDARY_INVALID",
    "COMMAND_REFERENCE_INVALID",
    "COMMAND_SCOPE_INVALID",
    "IDENTITY_REFERENCE_DRIFT",
    "executionAuthorized: false",
  ].forEach((marker) => assertIncludes("P145 review service", source.service, marker));
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
    "executeUserBinding",
    "consumePersonalStarBeastIdentity",
  ].forEach((marker) => assertExcludes("P145 remains review-only", source.service, marker));
  [
    "RC-PERSONAL-STAR-BEAST-EXPLICIT-USER-BINDING-EXECUTION-AUTHORIZATION-REVIEW-P145",
    "P144 Explicit User Binding Command",
    "READY_FOR_EXPLICIT_USER_BINDING_EXECUTION",
    "executionAuthorized = false",
    "bindingExecutionStatus = NOT_PERFORMED",
    "不执行绑定",
    "不创建授权结果",
  ].forEach((marker) => assertIncludes("P145 protocol", source.protocol, marker));
  [
    "PersonalStarBeastIdentityExplicitUserBindingExecutionAuthorizationReviewInput",
    "PersonalStarBeastIdentityExplicitUserBindingExecutionAuthorizationReviewResult",
    "PersonalStarBeastIdentityExplicitUserBindingExecutionAuthorizationReviewReference",
    "from \"./personalStarBeastIdentityExplicitUserBindingExecutionAuthorizationReview\"",
  ].forEach((marker) => assertIncludes("P145 type index export", source.typeIndex, marker));
  assertIncludes("P145 gate registered", packageJson.scripts?.["check:personal-star-beast-explicit-user-binding-execution-authorization-review"] ?? "", "node scripts/check-personal-star-beast-explicit-user-binding-execution-authorization-review.mjs");
  assertIncludes("P145 release gate registered", packageJson.scripts?.["postcheck:release"] ?? "", "npm run check:personal-star-beast-explicit-user-binding-execution-authorization-review");

  const modulePath = path.join(os.tmpdir(), `guanyao-p145-binding-execution-review-${process.pid}.mjs`);
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
    `, resolveDir: rootDir, sourcefile: "p145-binding-execution-review-gate-entry.ts", loader: "ts" },
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
  const intentCommand = Object.freeze({ commandType: "EXPLICIT_USER_BINDING_INTENT", commandId: "p145-intent-command", subjectDecision: "DECLARE_EXPLICIT_USER_BINDING_INTENT", confirmationReference: "opaque-confirmation-reference", identityReferenceAccepted: true, bindingScope: "PERSONAL_STAR_BEAST_IDENTITY_REFERENCE_ONLY" });
  const intentResult = runtime.createPersonalStarBeastIdentityExplicitUserBindingAuthorizationCommand(Object.freeze({ reviewResult: review, command: intentCommand }));
  const pendingResolution = runtime.resolvePersonalStarBeastIdentityExplicitUserBindingAuthorization(Object.freeze({ commandResult: intentResult }));
  const decisionContract = runtime.reviewPersonalStarBeastIdentityExplicitUserBindingAuthorizationDecisionContract(Object.freeze({ resolutionResult: pendingResolution }));
  const grantDecisionCommand = Object.freeze({ commandType: "EXPLICIT_USER_BINDING_AUTHORIZATION_DECISION", commandId: "p145-grant-decision-command", subjectDecision: "GRANT", decisionReference: "opaque-explicit-decision-reference", identityReferenceAccepted: true, decisionScope: "PERSONAL_STAR_BEAST_IDENTITY_REFERENCE_ONLY" });
  const grantDecisionCommandResult = runtime.createPersonalStarBeastIdentityExplicitUserBindingAuthorizationDecisionCommand(Object.freeze({ decisionContractResult: decisionContract, command: grantDecisionCommand }));
  const grantDecisionResolution = runtime.resolvePersonalStarBeastIdentityExplicitUserBindingAuthorizationDecision(Object.freeze({ decisionCommandResult: grantDecisionCommandResult }));
  const grantEligibility = runtime.resolvePersonalStarBeastIdentityExplicitUserBindingEligibility(Object.freeze({ decisionResolutionResult: grantDecisionResolution }));
  const bindingCommand = Object.freeze({ commandType: "EXPLICIT_PERSONAL_STAR_BEAST_IDENTITY_BINDING", commandId: "p145-binding-command", subjectIntent: "EXECUTE_EXPLICIT_USER_BINDING", executionReference: "opaque-binding-execution-reference", identityReferenceAccepted: true, bindingScope: "PERSONAL_STAR_BEAST_IDENTITY_REFERENCE_ONLY" });
  const commandResult = runtime.createPersonalStarBeastIdentityExplicitUserBindingCommand(Object.freeze({ eligibilityResult: grantEligibility, command: bindingCommand }));
  const reviewResult = runtime.reviewPersonalStarBeastIdentityExplicitUserBindingExecutionAuthorization(Object.freeze({ commandResult }));
  assertEqual("P145 command is ready", commandResult.status, "READY");
  assertEqual("P145 execution review is ready", reviewResult.status, "READY");
  if (reviewResult.status === "READY") {
    assertEqual("P145 review status is exact", reviewResult.reviewStatus, "READY_FOR_EXPLICIT_USER_BINDING_EXECUTION");
    assertEqual("P145 execution remains unauthorized", reviewResult.reviewReference.executionAuthorized, false);
    assertEqual("P145 binding execution remains unperformed", reviewResult.reviewReference.bindingExecutionStatus, "NOT_PERFORMED");
    assertEqual("P145 user binding remains unperformed", reviewResult.reviewReference.userBinding, "NOT_PERFORMED");
    assertEqual("P145 product consumption remains unperformed", reviewResult.reviewReference.productConsumption, "NOT_PERFORMED");
  }
  const missing = runtime.reviewPersonalStarBeastIdentityExplicitUserBindingExecutionAuthorization(Object.freeze({ commandResult: null }));
  assertEqual("missing command result is unavailable", missing.status, "UNAVAILABLE");
  assertEqual("missing command result reason", missing.reason, "COMMAND_RESULT_REQUIRED");
  const blocked = runtime.reviewPersonalStarBeastIdentityExplicitUserBindingExecutionAuthorization(Object.freeze({ commandResult: Object.freeze({ ...commandResult, boundary: Object.freeze({ ...commandResult.boundary, bindingExecutionPerformed: true }) }) }));
  assertEqual("invalid command boundary is blocked", blocked.status, "BLOCKED");
  assertEqual("invalid command boundary reason", blocked.reason, "COMMAND_BOUNDARY_INVALID");
}

if (failures.length > 0) {
  console.error("\nPersonal Star Beast Explicit User Binding Execution Authorization Review gate failed:");
  failures.forEach((failure) => console.error(`- ${failure}`));
  process.exit(1);
}
console.log("\nPersonal Star Beast Explicit User Binding Execution Authorization Review gate passed.");
