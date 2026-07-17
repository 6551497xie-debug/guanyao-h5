import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import process from "node:process";
import { build } from "esbuild";

const rootDir = process.cwd();
const files = Object.freeze({
  type: "src/types/personalStarBeastIdentityExplicitUserBindingAuthorizationDecisionCommand.ts",
  service: "src/services/personalStarBeastIdentityExplicitUserBindingAuthorizationDecisionCommand.ts",
  contractType: "src/types/personalStarBeastIdentityExplicitUserBindingAuthorizationDecisionContract.ts",
  contractService: "src/services/personalStarBeastIdentityExplicitUserBindingAuthorizationDecisionContract.ts",
  protocol: "docs/GUANYAO_PERSONAL_STAR_BEAST_EXPLICIT_USER_BINDING_AUTHORIZATION_DECISION_COMMAND_PROTOCOL.md",
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
    "PersonalStarBeastIdentityExplicitUserBindingAuthorizationDecisionCommandInput",
    "PersonalStarBeastIdentityExplicitUserBindingAuthorizationDecisionCommandResult",
    "EXPLICIT_USER_BINDING_AUTHORIZATION_DECISION",
    "subjectDecision: \"GRANT\" | \"DECLINE\"",
    "decisionScope: \"PERSONAL_STAR_BEAST_IDENTITY_REFERENCE_ONLY\"",
    "authorizationDecisionResolved: false",
    "noDefaultDecision: true",
  ].forEach((marker) => assertIncludes("P141 decision command type", source.type, marker));
  [
    "export function createPersonalStarBeastIdentityExplicitUserBindingAuthorizationDecisionCommand",
    "DECISION_CONTRACT_REQUIRED",
    "DECISION_CONTRACT_UNAVAILABLE",
    "EXPLICIT_DECISION_COMMAND_REQUIRED",
    "DECISION_CONTRACT_BLOCKED",
    "DECISION_CONTRACT_BOUNDARY_INVALID",
    "DECISION_CONTRACT_REFERENCE_INVALID",
    "DECISION_COMMAND_TYPE_INVALID",
    "DECISION_VALUE_INVALID",
    "DECISION_SCOPE_INVALID",
    "DECISION_REFERENCE_INVALID",
    "IDENTITY_REFERENCE_DRIFT",
    "authorizationDecisionResolved: false",
  ].forEach((marker) => assertIncludes("P141 decision command service", source.service, marker));
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
    "resolveAuthorizationDecision",
  ].forEach((marker) => assertExcludes("P141 remains command-only", source.service, marker));
  [
    "RC-PERSONAL-STAR-BEAST-EXPLICIT-USER-BINDING-AUTHORIZATION-DECISION-COMMAND-P141",
    "P140 Explicit User Binding Authorization Decision Contract",
    "GRANT",
    "DECLINE",
    "READY_FOR_AUTHORIZATION_DECISION_RESOLUTION",
    "authorizationDecisionResolved = false",
    "authorizationStatus = NOT_AUTHORIZED",
    "不提供默认决定",
    "不执行用户绑定",
  ].forEach((marker) => assertIncludes("P141 protocol", source.protocol, marker));
  [
    "PersonalStarBeastIdentityExplicitUserBindingAuthorizationDecisionCommandInput",
    "PersonalStarBeastIdentityExplicitUserBindingAuthorizationDecisionCommandResult",
    "PersonalStarBeastIdentityExplicitUserBindingAuthorizationDecisionCommandReference",
    "from \"./personalStarBeastIdentityExplicitUserBindingAuthorizationDecisionCommand\"",
  ].forEach((marker) => assertIncludes("P141 type index export", source.typeIndex, marker));
  assertIncludes("P141 gate registered", packageJson.scripts?.["check:personal-star-beast-explicit-user-binding-authorization-decision-command"] ?? "", "node scripts/check-personal-star-beast-explicit-user-binding-authorization-decision-command.mjs");
  assertIncludes("P141 release gate registered", packageJson.scripts?.["postcheck:release"] ?? "", "npm run check:personal-star-beast-explicit-user-binding-authorization-decision-command");

  const modulePath = path.join(os.tmpdir(), `guanyao-p141-binding-decision-command-${process.pid}.mjs`);
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
    `, resolveDir: rootDir, sourcefile: "p141-binding-decision-command-gate-entry.ts", loader: "ts" },
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
    commandId: "p141-intent-command",
    subjectDecision: "DECLARE_EXPLICIT_USER_BINDING_INTENT",
    confirmationReference: "opaque-confirmation-reference",
    identityReferenceAccepted: true,
    bindingScope: "PERSONAL_STAR_BEAST_IDENTITY_REFERENCE_ONLY",
  });
  const intentResult = runtime.createPersonalStarBeastIdentityExplicitUserBindingAuthorizationCommand(Object.freeze({ reviewResult: review, command: intentCommand }));
  const resolution = runtime.resolvePersonalStarBeastIdentityExplicitUserBindingAuthorization(Object.freeze({ commandResult: intentResult }));
  const decisionContract = runtime.reviewPersonalStarBeastIdentityExplicitUserBindingAuthorizationDecisionContract(Object.freeze({ resolutionResult: resolution }));
  const grantCommand = Object.freeze({
    commandType: "EXPLICIT_USER_BINDING_AUTHORIZATION_DECISION",
    commandId: "p141-grant-command",
    subjectDecision: "GRANT",
    decisionReference: "opaque-explicit-decision-reference-grant",
    identityReferenceAccepted: true,
    decisionScope: "PERSONAL_STAR_BEAST_IDENTITY_REFERENCE_ONLY",
  });
  const grantResult = runtime.createPersonalStarBeastIdentityExplicitUserBindingAuthorizationDecisionCommand(Object.freeze({ decisionContractResult: decisionContract, command: grantCommand }));
  assertEqual("P141 grant command is ready", grantResult.status, "READY");
  if (grantResult.status === "READY") {
    assertEqual("grant command status is exact", grantResult.commandStatus, "READY_FOR_AUTHORIZATION_DECISION_RESOLUTION");
    assertEqual("grant decision is explicit", grantResult.commandReference.subjectDecision, "GRANT");
    assertEqual("grant remains unresolved", grantResult.commandReference.authorizationDecisionResolved, false);
    assertEqual("grant remains not authorized", grantResult.commandReference.authorizationStatus, "NOT_AUTHORIZED");
    assertEqual("grant binding remains deferred", grantResult.commandReference.userBinding, "NOT_PERFORMED");
    assertEqual("grant has no default", grantResult.commandReference.noDefaultDecision, true);
  }
  const declineCommand = Object.freeze({ ...grantCommand, commandId: "p141-decline-command", subjectDecision: "DECLINE", decisionReference: "opaque-explicit-decision-reference-decline" });
  const declineResult = runtime.createPersonalStarBeastIdentityExplicitUserBindingAuthorizationDecisionCommand(Object.freeze({ decisionContractResult: decisionContract, command: declineCommand }));
  assertEqual("P141 decline command is ready", declineResult.status, "READY");
  if (declineResult.status === "READY") assertEqual("decline decision is explicit", declineResult.commandReference.subjectDecision, "DECLINE");
  const missing = runtime.createPersonalStarBeastIdentityExplicitUserBindingAuthorizationDecisionCommand(Object.freeze({ decisionContractResult: decisionContract, command: null }));
  assertEqual("missing explicit command is unavailable", missing.status, "UNAVAILABLE");
  assertEqual("missing command reason", missing.reason, "EXPLICIT_DECISION_COMMAND_REQUIRED");
  const blocked = runtime.createPersonalStarBeastIdentityExplicitUserBindingAuthorizationDecisionCommand(Object.freeze({ decisionContractResult: Object.freeze({ ...decisionContract, boundary: Object.freeze({ ...decisionContract.boundary, authorizationGranted: true }) }), command: grantCommand }));
  assertEqual("invalid contract boundary is blocked", blocked.status, "BLOCKED");
  assertEqual("invalid contract boundary reason", blocked.reason, "DECISION_CONTRACT_BOUNDARY_INVALID");
}

if (failures.length > 0) {
  console.error("\nPersonal Star Beast Explicit User Binding Authorization Decision Command gate failed:");
  failures.forEach((failure) => console.error(`- ${failure}`));
  process.exit(1);
}
console.log("\nPersonal Star Beast Explicit User Binding Authorization Decision Command gate passed.");
