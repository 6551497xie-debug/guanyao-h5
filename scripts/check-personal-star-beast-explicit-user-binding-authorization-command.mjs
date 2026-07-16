import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import process from "node:process";
import { build } from "esbuild";

const rootDir = process.cwd();
const files = Object.freeze({
  type: "src/types/personalStarBeastIdentityExplicitUserBindingAuthorizationCommand.ts",
  service: "src/services/personalStarBeastIdentityExplicitUserBindingAuthorizationCommand.ts",
  reviewType: "src/types/personalStarBeastIdentityExplicitUserBindingAuthorizationReview.ts",
  reviewService: "src/services/personalStarBeastIdentityExplicitUserBindingAuthorizationReview.ts",
  protocol: "docs/GUANYAO_PERSONAL_STAR_BEAST_EXPLICIT_USER_BINDING_AUTHORIZATION_COMMAND_PROTOCOL.md",
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
    "PersonalStarBeastIdentityExplicitUserBindingAuthorizationCommand",
    "PersonalStarBeastIdentityExplicitUserBindingAuthorizationCommandResult",
    "EXPLICIT_USER_BINDING_INTENT",
    "DECLARE_EXPLICIT_USER_BINDING_INTENT",
    "READY_FOR_AUTHORIZATION_RESOLUTION",
    "authorizationStatus: \"NOT_AUTHORIZED\"",
    "userBinding: \"NOT_PERFORMED\"",
    "noRawUserIdentityPayload: true",
  ].forEach((marker) => assertIncludes("P138 command type", source.type, marker));
  [
    "export function createPersonalStarBeastIdentityExplicitUserBindingAuthorizationCommand",
    "AUTHORIZATION_REVIEW_REQUIRED",
    "AUTHORIZATION_REVIEW_UNAVAILABLE",
    "AUTHORIZATION_REVIEW_BLOCKED",
    "REVIEW_BOUNDARY_INVALID",
    "REVIEW_REFERENCE_INVALID",
    "COMMAND_TYPE_INVALID",
    "COMMAND_DECISION_INVALID",
    "COMMAND_SCOPE_INVALID",
    "IDENTITY_REFERENCE_DRIFT",
    "commandStatus: \"READY_FOR_AUTHORIZATION_RESOLUTION\"",
  ].forEach((marker) => assertIncludes("P138 command service", source.service, marker));
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
    "authorizeUser",
  ].forEach((marker) => assertExcludes("P138 remains command-only", source.service, marker));
  [
    "RC-PERSONAL-STAR-BEAST-EXPLICIT-USER-BINDING-AUTHORIZATION-COMMAND-P138",
    "P137 Explicit User Binding Authorization Review",
    "EXPLICIT_USER_BINDING_INTENT",
    "DECLARE_EXPLICIT_USER_BINDING_INTENT",
    "authorizationStatus = NOT_AUTHORIZED",
    "userBinding = NOT_PERFORMED",
    "不把命令直接升级为授权结果",
    "不执行",
  ].forEach((marker) => assertIncludes("P138 protocol", source.protocol, marker));
  [
    "PersonalStarBeastIdentityExplicitUserBindingAuthorizationCommandInput",
    "PersonalStarBeastIdentityExplicitUserBindingAuthorizationCommandResult",
    "PersonalStarBeastIdentityExplicitUserBindingAuthorizationCommandReference",
    "from \"./personalStarBeastIdentityExplicitUserBindingAuthorizationCommand\"",
  ].forEach((marker) => assertIncludes("P138 type index export", source.typeIndex, marker));
  assertIncludes("P138 gate registered", packageJson.scripts?.["check:personal-star-beast-explicit-user-binding-authorization-command"] ?? "", "node scripts/check-personal-star-beast-explicit-user-binding-authorization-command.mjs");
  assertIncludes("P138 release gate registered", packageJson.scripts?.["postcheck:release"] ?? "", "npm run check:personal-star-beast-explicit-user-binding-authorization-command");

  const modulePath = path.join(os.tmpdir(), `guanyao-p138-binding-command-${process.pid}.mjs`);
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
    `, resolveDir: rootDir, sourcefile: "p138-binding-command-gate-entry.ts", loader: "ts" },
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
  const command = Object.freeze({
    commandType: "EXPLICIT_USER_BINDING_INTENT",
    commandId: "p138-test-command",
    subjectDecision: "DECLARE_EXPLICIT_USER_BINDING_INTENT",
    confirmationReference: "opaque-confirmation-reference",
    identityReferenceAccepted: true,
    bindingScope: "PERSONAL_STAR_BEAST_IDENTITY_REFERENCE_ONLY",
  });
  const result = runtime.createPersonalStarBeastIdentityExplicitUserBindingAuthorizationCommand(Object.freeze({ reviewResult: review, command }));
  assertEqual("P138 command is ready", result.status, "READY");
  if (result.status === "READY") {
    assertEqual("command status is exact", result.commandStatus, "READY_FOR_AUTHORIZATION_RESOLUTION");
    assertEqual("subject intent is declared", result.commandReference.subjectIntent, "DECLARED");
    assertEqual("authorization remains not granted", result.commandReference.authorizationStatus, "NOT_AUTHORIZED");
    assertEqual("binding remains deferred", result.commandReference.userBinding, "NOT_PERFORMED");
    assertEqual("product consumption remains deferred", result.commandReference.productConsumption, "NOT_PERFORMED");
    assertEqual("future resolution remains required", result.commandReference.futureAuthorizationResolutionRequired, true);
  }
  const missingReview = runtime.createPersonalStarBeastIdentityExplicitUserBindingAuthorizationCommand(Object.freeze({ reviewResult: null, command }));
  assertEqual("missing review is unavailable", missingReview.status, "UNAVAILABLE");
  assertEqual("missing review reason", missingReview.reason, "AUTHORIZATION_REVIEW_REQUIRED");
  const missingCommand = runtime.createPersonalStarBeastIdentityExplicitUserBindingAuthorizationCommand(Object.freeze({ reviewResult: review, command: null }));
  assertEqual("missing command is unavailable", missingCommand.status, "UNAVAILABLE");
  assertEqual("missing command reason", missingCommand.reason, "EXPLICIT_COMMAND_REQUIRED");
  const blockedReview = runtime.createPersonalStarBeastIdentityExplicitUserBindingAuthorizationCommand(Object.freeze({ reviewResult: Object.freeze({ ...review, boundary: Object.freeze({ ...review.boundary, authorizationGranted: true }) }), command }));
  assertEqual("invalid review boundary is blocked", blockedReview.status, "BLOCKED");
  assertEqual("invalid review reason", blockedReview.reason, "REVIEW_BOUNDARY_INVALID");
}

if (failures.length > 0) {
  console.error("\nPersonal Star Beast Explicit User Binding Authorization Command gate failed:");
  failures.forEach((failure) => console.error(`- ${failure}`));
  process.exit(1);
}
console.log("\nPersonal Star Beast Explicit User Binding Authorization Command gate passed.");
