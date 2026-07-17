import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import process from "node:process";
import { build } from "esbuild";

const rootDir = process.cwd();
const files = Object.freeze({
  type: "src/types/personalStarBeastIdentityExplicitUserBindingCommand.ts",
  service: "src/services/personalStarBeastIdentityExplicitUserBindingCommand.ts",
  eligibilityType: "src/types/personalStarBeastIdentityExplicitUserBindingEligibility.ts",
  eligibilityService: "src/services/personalStarBeastIdentityExplicitUserBindingEligibility.ts",
  protocol: "docs/GUANYAO_PERSONAL_STAR_BEAST_EXPLICIT_USER_BINDING_COMMAND_PROTOCOL.md",
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
    "PersonalStarBeastIdentityExplicitUserBindingCommandInput",
    "PersonalStarBeastIdentityExplicitUserBindingCommandResult",
    "EXPLICIT_PERSONAL_STAR_BEAST_IDENTITY_BINDING",
    "EXECUTE_EXPLICIT_USER_BINDING",
    "READY_FOR_EXPLICIT_USER_BINDING_EXECUTION",
    "bindingExecutionDeferred: true",
    "userBinding: \"NOT_PERFORMED\"",
    "futureBindingExecutionRequired: true",
  ].forEach((marker) => assertIncludes("P144 binding command type", source.type, marker));
  [
    "export function createPersonalStarBeastIdentityExplicitUserBindingCommand",
    "ELIGIBILITY_RESULT_REQUIRED",
    "ELIGIBILITY_RESULT_UNAVAILABLE",
    "BINDING_NOT_ELIGIBLE",
    "EXPLICIT_BINDING_COMMAND_REQUIRED",
    "ELIGIBILITY_RESULT_BLOCKED",
    "ELIGIBILITY_BOUNDARY_INVALID",
    "ELIGIBILITY_REFERENCE_INVALID",
    "COMMAND_TYPE_INVALID",
    "COMMAND_SCOPE_INVALID",
    "COMMAND_REFERENCE_INVALID",
    "IDENTITY_REFERENCE_DRIFT",
    "bindingExecutionDeferred: true",
  ].forEach((marker) => assertIncludes("P144 binding command service", source.service, marker));
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
  ].forEach((marker) => assertExcludes("P144 remains command-only", source.service, marker));
  [
    "RC-PERSONAL-STAR-BEAST-EXPLICIT-USER-BINDING-COMMAND-P144",
    "P143 Explicit User Binding Eligibility",
    "ELIGIBLE",
    "NOT_ELIGIBLE",
    "READY_FOR_EXPLICIT_USER_BINDING_EXECUTION",
    "bindingExecutionDeferred = true",
    "userBinding = NOT_PERFORMED",
    "不执行命令",
    "不等于用户已经绑定",
    "不提供默认命令",
  ].forEach((marker) => assertIncludes("P144 protocol", source.protocol, marker));
  [
    "PersonalStarBeastIdentityExplicitUserBindingCommandInput",
    "PersonalStarBeastIdentityExplicitUserBindingCommandResult",
    "PersonalStarBeastIdentityExplicitUserBindingCommandReference",
    "from \"./personalStarBeastIdentityExplicitUserBindingCommand\"",
  ].forEach((marker) => assertIncludes("P144 type index export", source.typeIndex, marker));
  assertIncludes("P144 gate registered", packageJson.scripts?.["check:personal-star-beast-explicit-user-binding-command"] ?? "", "node scripts/check-personal-star-beast-explicit-user-binding-command.mjs");
  assertIncludes("P144 release gate registered", packageJson.scripts?.["postcheck:release"] ?? "", "npm run check:personal-star-beast-explicit-user-binding-command");

  const modulePath = path.join(os.tmpdir(), `guanyao-p144-binding-command-${process.pid}.mjs`);
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
    `, resolveDir: rootDir, sourcefile: "p144-binding-command-gate-entry.ts", loader: "ts" },
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
  const intentCommand = Object.freeze({
    commandType: "EXPLICIT_USER_BINDING_INTENT",
    commandId: "p144-intent-command",
    subjectDecision: "DECLARE_EXPLICIT_USER_BINDING_INTENT",
    confirmationReference: "opaque-confirmation-reference",
    identityReferenceAccepted: true,
    bindingScope: "PERSONAL_STAR_BEAST_IDENTITY_REFERENCE_ONLY",
  });
  const intentResult = runtime.createPersonalStarBeastIdentityExplicitUserBindingAuthorizationCommand(Object.freeze({ reviewResult: review, command: intentCommand }));
  const pendingResolution = runtime.resolvePersonalStarBeastIdentityExplicitUserBindingAuthorization(Object.freeze({ commandResult: intentResult }));
  const decisionContract = runtime.reviewPersonalStarBeastIdentityExplicitUserBindingAuthorizationDecisionContract(Object.freeze({ resolutionResult: pendingResolution }));
  const grantDecisionCommand = Object.freeze({
    commandType: "EXPLICIT_USER_BINDING_AUTHORIZATION_DECISION",
    commandId: "p144-grant-decision-command",
    subjectDecision: "GRANT",
    decisionReference: "opaque-explicit-decision-reference-grant",
    identityReferenceAccepted: true,
    decisionScope: "PERSONAL_STAR_BEAST_IDENTITY_REFERENCE_ONLY",
  });
  const grantDecisionCommandResult = runtime.createPersonalStarBeastIdentityExplicitUserBindingAuthorizationDecisionCommand(Object.freeze({ decisionContractResult: decisionContract, command: grantDecisionCommand }));
  const grantDecisionResolution = runtime.resolvePersonalStarBeastIdentityExplicitUserBindingAuthorizationDecision(Object.freeze({ decisionCommandResult: grantDecisionCommandResult }));
  const grantEligibility = runtime.resolvePersonalStarBeastIdentityExplicitUserBindingEligibility(Object.freeze({ decisionResolutionResult: grantDecisionResolution }));
  const grantBindingCommand = Object.freeze({
    commandType: "EXPLICIT_PERSONAL_STAR_BEAST_IDENTITY_BINDING",
    commandId: "p144-grant-binding-command",
    subjectIntent: "EXECUTE_EXPLICIT_USER_BINDING",
    executionReference: "opaque-binding-execution-reference",
    identityReferenceAccepted: true,
    bindingScope: "PERSONAL_STAR_BEAST_IDENTITY_REFERENCE_ONLY",
  });
  const grantResult = runtime.createPersonalStarBeastIdentityExplicitUserBindingCommand(Object.freeze({ eligibilityResult: grantEligibility, command: grantBindingCommand }));
  assertEqual("P144 eligible command is ready", grantResult.status, "READY");
  if (grantResult.status === "READY") {
    assertEqual("binding command status is exact", grantResult.commandStatus, "READY_FOR_EXPLICIT_USER_BINDING_EXECUTION");
    assertEqual("binding execution remains deferred", grantResult.commandReference.bindingExecutionDeferred, true);
    assertEqual("user binding remains deferred", grantResult.commandReference.userBinding, "NOT_PERFORMED");
    assertEqual("product consumption remains deferred", grantResult.commandReference.productConsumption, "NOT_PERFORMED");
  }
  const declineDecisionCommand = Object.freeze({ ...grantDecisionCommand, commandId: "p144-decline-decision-command", subjectDecision: "DECLINE", decisionReference: "opaque-explicit-decision-reference-decline" });
  const declineDecisionCommandResult = runtime.createPersonalStarBeastIdentityExplicitUserBindingAuthorizationDecisionCommand(Object.freeze({ decisionContractResult: decisionContract, command: declineDecisionCommand }));
  const declineDecisionResolution = runtime.resolvePersonalStarBeastIdentityExplicitUserBindingAuthorizationDecision(Object.freeze({ decisionCommandResult: declineDecisionCommandResult }));
  const declineEligibility = runtime.resolvePersonalStarBeastIdentityExplicitUserBindingEligibility(Object.freeze({ decisionResolutionResult: declineDecisionResolution }));
  const declinedCommand = runtime.createPersonalStarBeastIdentityExplicitUserBindingCommand(Object.freeze({ eligibilityResult: declineEligibility, command: grantBindingCommand }));
  assertEqual("not eligible binding command is unavailable", declinedCommand.status, "UNAVAILABLE");
  assertEqual("not eligible binding command reason", declinedCommand.reason, "BINDING_NOT_ELIGIBLE");
  const missing = runtime.createPersonalStarBeastIdentityExplicitUserBindingCommand(Object.freeze({ eligibilityResult: grantEligibility, command: null }));
  assertEqual("missing binding command is unavailable", missing.status, "UNAVAILABLE");
  assertEqual("missing binding command reason", missing.reason, "EXPLICIT_BINDING_COMMAND_REQUIRED");
  const blocked = runtime.createPersonalStarBeastIdentityExplicitUserBindingCommand(Object.freeze({ eligibilityResult: Object.freeze({ ...grantEligibility, boundary: Object.freeze({ ...grantEligibility.boundary, userBindingPerformed: true }) }), command: grantBindingCommand }));
  assertEqual("invalid eligibility boundary is blocked", blocked.status, "BLOCKED");
  assertEqual("invalid eligibility boundary reason", blocked.reason, "ELIGIBILITY_BOUNDARY_INVALID");
}

if (failures.length > 0) {
  console.error("\nPersonal Star Beast Explicit User Binding Command gate failed:");
  failures.forEach((failure) => console.error(`- ${failure}`));
  process.exit(1);
}
console.log("\nPersonal Star Beast Explicit User Binding Command gate passed.");
