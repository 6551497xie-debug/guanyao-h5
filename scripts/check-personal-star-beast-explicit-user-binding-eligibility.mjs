import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import process from "node:process";
import { build } from "esbuild";

const rootDir = process.cwd();
const files = Object.freeze({
  type: "src/types/personalStarBeastIdentityExplicitUserBindingEligibility.ts",
  service: "src/services/personalStarBeastIdentityExplicitUserBindingEligibility.ts",
  resolutionType: "src/types/personalStarBeastIdentityExplicitUserBindingAuthorizationDecisionResolution.ts",
  resolutionService: "src/services/personalStarBeastIdentityExplicitUserBindingAuthorizationDecisionResolution.ts",
  protocol: "docs/GUANYAO_PERSONAL_STAR_BEAST_EXPLICIT_USER_BINDING_ELIGIBILITY_PROTOCOL.md",
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
    "PersonalStarBeastIdentityExplicitUserBindingEligibilityInput",
    "PersonalStarBeastIdentityExplicitUserBindingEligibilityResult",
    "READY_FOR_EXPLICIT_USER_BINDING_ELIGIBILITY",
    "eligibility: \"ELIGIBLE\" | \"NOT_ELIGIBLE\"",
    "eligibilityReason: \"AUTHORIZED_DECISION\" | \"AUTHORIZATION_DECLINED\"",
    "userBinding: \"NOT_PERFORMED\"",
    "futureExplicitBindingRequired: true",
  ].forEach((marker) => assertIncludes("P143 eligibility type", source.type, marker));
  [
    "export function resolvePersonalStarBeastIdentityExplicitUserBindingEligibility",
    "DECISION_RESOLUTION_REQUIRED",
    "DECISION_RESOLUTION_UNAVAILABLE",
    "DECISION_RESOLUTION_BLOCKED",
    "DECISION_RESOLUTION_BOUNDARY_INVALID",
    "DECISION_RESOLUTION_REFERENCE_INVALID",
    "DECISION_OUTCOME_INVALID",
    "DECISION_SCOPE_INVALID",
    "IDENTITY_REFERENCE_DRIFT",
    "bindingEligible",
    "userBinding: \"NOT_PERFORMED\"",
  ].forEach((marker) => assertIncludes("P143 eligibility service", source.service, marker));
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
    "consumePersonalStarBeastIdentity",
    "createUserProfile",
  ].forEach((marker) => assertExcludes("P143 remains eligibility-only", source.service, marker));
  [
    "RC-PERSONAL-STAR-BEAST-EXPLICIT-USER-BINDING-ELIGIBILITY-P143",
    "P142 Explicit Authorization Decision Resolution",
    "GRANTED / AUTHORIZED",
    "DECLINED / NOT_AUTHORIZED",
    "eligibility = ELIGIBLE",
    "eligibility = NOT_ELIGIBLE",
    "`AUTHORIZED` 只表示授权决定已经成立",
    "不执行绑定",
    "不表示产品已经消费该身份",
  ].forEach((marker) => assertIncludes("P143 protocol", source.protocol, marker));
  [
    "PersonalStarBeastIdentityExplicitUserBindingEligibilityInput",
    "PersonalStarBeastIdentityExplicitUserBindingEligibilityResult",
    "PersonalStarBeastIdentityExplicitUserBindingEligibilityReference",
    "from \"./personalStarBeastIdentityExplicitUserBindingEligibility\"",
  ].forEach((marker) => assertIncludes("P143 type index export", source.typeIndex, marker));
  assertIncludes("P143 gate registered", packageJson.scripts?.["check:personal-star-beast-explicit-user-binding-eligibility"] ?? "", "node scripts/check-personal-star-beast-explicit-user-binding-eligibility.mjs");
  assertIncludes("P143 release gate registered", packageJson.scripts?.["postcheck:release"] ?? "", "npm run check:personal-star-beast-explicit-user-binding-eligibility");

  const modulePath = path.join(os.tmpdir(), `guanyao-p143-binding-eligibility-${process.pid}.mjs`);
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
    `, resolveDir: rootDir, sourcefile: "p143-binding-eligibility-gate-entry.ts", loader: "ts" },
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
    commandId: "p143-intent-command",
    subjectDecision: "DECLARE_EXPLICIT_USER_BINDING_INTENT",
    confirmationReference: "opaque-confirmation-reference",
    identityReferenceAccepted: true,
    bindingScope: "PERSONAL_STAR_BEAST_IDENTITY_REFERENCE_ONLY",
  });
  const intentResult = runtime.createPersonalStarBeastIdentityExplicitUserBindingAuthorizationCommand(Object.freeze({ reviewResult: review, command: intentCommand }));
  const pendingResolution = runtime.resolvePersonalStarBeastIdentityExplicitUserBindingAuthorization(Object.freeze({ commandResult: intentResult }));
  const decisionContract = runtime.reviewPersonalStarBeastIdentityExplicitUserBindingAuthorizationDecisionContract(Object.freeze({ resolutionResult: pendingResolution }));
  const grantCommand = Object.freeze({
    commandType: "EXPLICIT_USER_BINDING_AUTHORIZATION_DECISION",
    commandId: "p143-grant-command",
    subjectDecision: "GRANT",
    decisionReference: "opaque-explicit-decision-reference-grant",
    identityReferenceAccepted: true,
    decisionScope: "PERSONAL_STAR_BEAST_IDENTITY_REFERENCE_ONLY",
  });
  const grantCommandResult = runtime.createPersonalStarBeastIdentityExplicitUserBindingAuthorizationDecisionCommand(Object.freeze({ decisionContractResult: decisionContract, command: grantCommand }));
  const grantResolution = runtime.resolvePersonalStarBeastIdentityExplicitUserBindingAuthorizationDecision(Object.freeze({ decisionCommandResult: grantCommandResult }));
  const grantEligibility = runtime.resolvePersonalStarBeastIdentityExplicitUserBindingEligibility(Object.freeze({ decisionResolutionResult: grantResolution }));
  assertEqual("P143 grant eligibility is ready", grantEligibility.status, "READY");
  if (grantEligibility.status === "READY") {
    assertEqual("grant eligibility is exact", grantEligibility.eligibilityReference.eligibility, "ELIGIBLE");
    assertEqual("grant eligibility reason is exact", grantEligibility.eligibilityReference.eligibilityReason, "AUTHORIZED_DECISION");
    assertEqual("grant binding remains deferred", grantEligibility.eligibilityReference.userBinding, "NOT_PERFORMED");
    assertEqual("grant product consumption remains deferred", grantEligibility.eligibilityReference.productConsumption, "NOT_PERFORMED");
  }
  const declineCommand = Object.freeze({ ...grantCommand, commandId: "p143-decline-command", subjectDecision: "DECLINE", decisionReference: "opaque-explicit-decision-reference-decline" });
  const declineCommandResult = runtime.createPersonalStarBeastIdentityExplicitUserBindingAuthorizationDecisionCommand(Object.freeze({ decisionContractResult: decisionContract, command: declineCommand }));
  const declineResolution = runtime.resolvePersonalStarBeastIdentityExplicitUserBindingAuthorizationDecision(Object.freeze({ decisionCommandResult: declineCommandResult }));
  const declineEligibility = runtime.resolvePersonalStarBeastIdentityExplicitUserBindingEligibility(Object.freeze({ decisionResolutionResult: declineResolution }));
  assertEqual("P143 decline eligibility is ready", declineEligibility.status, "READY");
  if (declineEligibility.status === "READY") {
    assertEqual("decline eligibility is exact", declineEligibility.eligibilityReference.eligibility, "NOT_ELIGIBLE");
    assertEqual("decline eligibility reason is exact", declineEligibility.eligibilityReference.eligibilityReason, "AUTHORIZATION_DECLINED");
    assertEqual("decline binding remains deferred", declineEligibility.eligibilityReference.userBinding, "NOT_PERFORMED");
  }
  const missing = runtime.resolvePersonalStarBeastIdentityExplicitUserBindingEligibility(Object.freeze({ decisionResolutionResult: null }));
  assertEqual("missing resolution is unavailable", missing.status, "UNAVAILABLE");
  assertEqual("missing resolution reason", missing.reason, "DECISION_RESOLUTION_REQUIRED");
  const blocked = runtime.resolvePersonalStarBeastIdentityExplicitUserBindingEligibility(Object.freeze({ decisionResolutionResult: Object.freeze({ ...grantResolution, boundary: Object.freeze({ ...grantResolution.boundary, userBindingPerformed: true }) }) }));
  assertEqual("invalid resolution boundary is blocked", blocked.status, "BLOCKED");
  assertEqual("invalid resolution boundary reason", blocked.reason, "DECISION_RESOLUTION_BOUNDARY_INVALID");
}

if (failures.length > 0) {
  console.error("\nPersonal Star Beast Explicit User Binding Eligibility gate failed:");
  failures.forEach((failure) => console.error(`- ${failure}`));
  process.exit(1);
}
console.log("\nPersonal Star Beast Explicit User Binding Eligibility gate passed.");
