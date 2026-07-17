import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import process from "node:process";
import { build } from "esbuild";

const rootDir = process.cwd();
const files = Object.freeze({
  type: "src/types/personalStarBeastIdentityExplicitUserBindingAuthorizationDecisionResolution.ts",
  service: "src/services/personalStarBeastIdentityExplicitUserBindingAuthorizationDecisionResolution.ts",
  commandType: "src/types/personalStarBeastIdentityExplicitUserBindingAuthorizationDecisionCommand.ts",
  commandService: "src/services/personalStarBeastIdentityExplicitUserBindingAuthorizationDecisionCommand.ts",
  protocol: "docs/GUANYAO_PERSONAL_STAR_BEAST_EXPLICIT_USER_BINDING_AUTHORIZATION_DECISION_RESOLUTION_PROTOCOL.md",
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
    "PersonalStarBeastIdentityExplicitUserBindingAuthorizationDecisionResolutionInput",
    "PersonalStarBeastIdentityExplicitUserBindingAuthorizationDecisionResolutionResult",
    "READY_FOR_EXPLICIT_USER_BINDING_AUTHORIZATION_DECISION_CONSUMPTION",
    "decisionOutcome: \"GRANTED\" | \"DECLINED\"",
    "authorizationDecisionResolved: true",
    "userBinding: \"NOT_PERFORMED\"",
    "futureUserBindingRequired: true",
  ].forEach((marker) => assertIncludes("P142 decision resolution type", source.type, marker));
  [
    "export function resolvePersonalStarBeastIdentityExplicitUserBindingAuthorizationDecision",
    "DECISION_COMMAND_RESULT_REQUIRED",
    "DECISION_COMMAND_RESULT_UNAVAILABLE",
    "DECISION_COMMAND_RESULT_BLOCKED",
    "DECISION_COMMAND_BOUNDARY_INVALID",
    "DECISION_COMMAND_REFERENCE_INVALID",
    "DECISION_COMMAND_TYPE_INVALID",
    "DECISION_SCOPE_INVALID",
    "IDENTITY_REFERENCE_DRIFT",
    "decisionOutcome",
    "authorizationDecisionResolved: true",
  ].forEach((marker) => assertIncludes("P142 decision resolution service", source.service, marker));
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
  ].forEach((marker) => assertExcludes("P142 remains resolution-only", source.service, marker));
  [
    "RC-PERSONAL-STAR-BEAST-EXPLICIT-USER-BINDING-AUTHORIZATION-DECISION-RESOLUTION-P142",
    "P141 Explicit Authorization Decision Command",
    "GRANT",
    "DECLINE",
    "decisionOutcome = GRANTED",
    "decisionOutcome = DECLINED",
    "authorizationStatus = AUTHORIZED",
    "userBinding = NOT_PERFORMED",
    "不提供默认决定",
    "不执行：",
  ].forEach((marker) => assertIncludes("P142 protocol", source.protocol, marker));
  [
    "PersonalStarBeastIdentityExplicitUserBindingAuthorizationDecisionResolutionInput",
    "PersonalStarBeastIdentityExplicitUserBindingAuthorizationDecisionResolutionResult",
    "PersonalStarBeastIdentityExplicitUserBindingAuthorizationDecisionResolutionReference",
    "from \"./personalStarBeastIdentityExplicitUserBindingAuthorizationDecisionResolution\"",
  ].forEach((marker) => assertIncludes("P142 type index export", source.typeIndex, marker));
  assertIncludes("P142 gate registered", packageJson.scripts?.["check:personal-star-beast-explicit-user-binding-authorization-decision-resolution"] ?? "", "node scripts/check-personal-star-beast-explicit-user-binding-authorization-decision-resolution.mjs");
  assertIncludes("P142 release gate registered", packageJson.scripts?.["postcheck:release"] ?? "", "npm run check:personal-star-beast-explicit-user-binding-authorization-decision-resolution");

  const modulePath = path.join(os.tmpdir(), `guanyao-p142-binding-decision-resolution-${process.pid}.mjs`);
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
    `, resolveDir: rootDir, sourcefile: "p142-binding-decision-resolution-gate-entry.ts", loader: "ts" },
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
    commandId: "p142-intent-command",
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
    commandId: "p142-grant-command",
    subjectDecision: "GRANT",
    decisionReference: "opaque-explicit-decision-reference-grant",
    identityReferenceAccepted: true,
    decisionScope: "PERSONAL_STAR_BEAST_IDENTITY_REFERENCE_ONLY",
  });
  const grantCommandResult = runtime.createPersonalStarBeastIdentityExplicitUserBindingAuthorizationDecisionCommand(Object.freeze({ decisionContractResult: decisionContract, command: grantCommand }));
  const grantResult = runtime.resolvePersonalStarBeastIdentityExplicitUserBindingAuthorizationDecision(Object.freeze({ decisionCommandResult: grantCommandResult }));
  assertEqual("P142 grant resolution is ready", grantResult.status, "READY");
  if (grantResult.status === "READY") {
    assertEqual("grant outcome is exact", grantResult.resolutionReference.decisionOutcome, "GRANTED");
    assertEqual("grant authorization is exact", grantResult.resolutionReference.authorizationStatus, "AUTHORIZED");
    assertEqual("grant decision is resolved", grantResult.resolutionReference.authorizationDecisionResolved, true);
    assertEqual("grant binding remains deferred", grantResult.resolutionReference.userBinding, "NOT_PERFORMED");
    assertEqual("grant product consumption remains deferred", grantResult.resolutionReference.productConsumption, "NOT_PERFORMED");
  }
  const declineCommand = Object.freeze({ ...grantCommand, commandId: "p142-decline-command", subjectDecision: "DECLINE", decisionReference: "opaque-explicit-decision-reference-decline" });
  const declineCommandResult = runtime.createPersonalStarBeastIdentityExplicitUserBindingAuthorizationDecisionCommand(Object.freeze({ decisionContractResult: decisionContract, command: declineCommand }));
  const declineResult = runtime.resolvePersonalStarBeastIdentityExplicitUserBindingAuthorizationDecision(Object.freeze({ decisionCommandResult: declineCommandResult }));
  assertEqual("P142 decline resolution is ready", declineResult.status, "READY");
  if (declineResult.status === "READY") {
    assertEqual("decline outcome is exact", declineResult.resolutionReference.decisionOutcome, "DECLINED");
    assertEqual("decline authorization is exact", declineResult.resolutionReference.authorizationStatus, "NOT_AUTHORIZED");
    assertEqual("decline binding remains deferred", declineResult.resolutionReference.userBinding, "NOT_PERFORMED");
  }
  const missing = runtime.resolvePersonalStarBeastIdentityExplicitUserBindingAuthorizationDecision(Object.freeze({ decisionCommandResult: null }));
  assertEqual("missing decision command is unavailable", missing.status, "UNAVAILABLE");
  assertEqual("missing decision command reason", missing.reason, "DECISION_COMMAND_RESULT_REQUIRED");
  const blocked = runtime.resolvePersonalStarBeastIdentityExplicitUserBindingAuthorizationDecision(Object.freeze({ decisionCommandResult: Object.freeze({ ...grantCommandResult, boundary: Object.freeze({ ...grantCommandResult.boundary, authorizationDecisionResolved: true }) }) }));
  assertEqual("invalid command boundary is blocked", blocked.status, "BLOCKED");
  assertEqual("invalid command boundary reason", blocked.reason, "DECISION_COMMAND_BOUNDARY_INVALID");
}

if (failures.length > 0) {
  console.error("\nPersonal Star Beast Explicit User Binding Authorization Decision Resolution gate failed:");
  failures.forEach((failure) => console.error(`- ${failure}`));
  process.exit(1);
}
console.log("\nPersonal Star Beast Explicit User Binding Authorization Decision Resolution gate passed.");
