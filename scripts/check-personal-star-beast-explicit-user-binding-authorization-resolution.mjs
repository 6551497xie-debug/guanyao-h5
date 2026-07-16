import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import process from "node:process";
import { build } from "esbuild";

const rootDir = process.cwd();
const files = Object.freeze({
  type: "src/types/personalStarBeastIdentityExplicitUserBindingAuthorizationResolution.ts",
  service: "src/services/personalStarBeastIdentityExplicitUserBindingAuthorizationResolution.ts",
  commandType: "src/types/personalStarBeastIdentityExplicitUserBindingAuthorizationCommand.ts",
  commandService: "src/services/personalStarBeastIdentityExplicitUserBindingAuthorizationCommand.ts",
  protocol: "docs/GUANYAO_PERSONAL_STAR_BEAST_EXPLICIT_USER_BINDING_AUTHORIZATION_RESOLUTION_PROTOCOL.md",
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
    "PersonalStarBeastIdentityExplicitUserBindingAuthorizationResolutionInput",
    "PersonalStarBeastIdentityExplicitUserBindingAuthorizationResolutionResult",
    "PENDING_EXPLICIT_USER_BINDING_AUTHORIZATION",
    "READY_FOR_EXPLICIT_USER_BINDING_AUTHORIZATION_DECISION",
    "authorizationStatus: \"NOT_AUTHORIZED\"",
    "userBinding: \"NOT_PERFORMED\"",
    "authorizationDecisionPending: true",
  ].forEach((marker) => assertIncludes("P139 resolution type", source.type, marker));
  [
    "export function resolvePersonalStarBeastIdentityExplicitUserBindingAuthorization",
    "COMMAND_RESULT_REQUIRED",
    "COMMAND_RESULT_UNAVAILABLE",
    "COMMAND_RESULT_BLOCKED",
    "COMMAND_BOUNDARY_INVALID",
    "COMMAND_REFERENCE_INVALID",
    "COMMAND_SCOPE_INVALID",
    "IDENTITY_REFERENCE_DRIFT",
    "PENDING_EXPLICIT_USER_BINDING_AUTHORIZATION\" as const",
  ].forEach((marker) => assertIncludes("P139 resolution service", source.service, marker));
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
    "authorizeUser",
  ].forEach((marker) => assertExcludes("P139 remains pending-only", source.service, marker));
  [
    "RC-PERSONAL-STAR-BEAST-EXPLICIT-USER-BINDING-AUTHORIZATION-RESOLUTION-P139",
    "P138 Explicit User Binding Authorization Command",
    "PENDING_EXPLICIT_USER_BINDING_AUTHORIZATION",
    "authorizationStatus = NOT_AUTHORIZED",
    "userBinding = NOT_PERFORMED",
    "不生成已授权结果",
    "不执行",
  ].forEach((marker) => assertIncludes("P139 protocol", source.protocol, marker));
  [
    "PersonalStarBeastIdentityExplicitUserBindingAuthorizationResolutionInput",
    "PersonalStarBeastIdentityExplicitUserBindingAuthorizationResolutionResult",
    "PersonalStarBeastIdentityExplicitUserBindingAuthorizationResolutionReference",
    "from \"./personalStarBeastIdentityExplicitUserBindingAuthorizationResolution\"",
  ].forEach((marker) => assertIncludes("P139 type index export", source.typeIndex, marker));
  assertIncludes("P139 gate registered", packageJson.scripts?.["check:personal-star-beast-explicit-user-binding-authorization-resolution"] ?? "", "node scripts/check-personal-star-beast-explicit-user-binding-authorization-resolution.mjs");
  assertIncludes("P139 release gate registered", packageJson.scripts?.["postcheck:release"] ?? "", "npm run check:personal-star-beast-explicit-user-binding-authorization-resolution");

  const modulePath = path.join(os.tmpdir(), `guanyao-p139-binding-resolution-${process.pid}.mjs`);
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
    `, resolveDir: rootDir, sourcefile: "p139-binding-resolution-gate-entry.ts", loader: "ts" },
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
    commandId: "p139-test-command",
    subjectDecision: "DECLARE_EXPLICIT_USER_BINDING_INTENT",
    confirmationReference: "opaque-confirmation-reference",
    identityReferenceAccepted: true,
    bindingScope: "PERSONAL_STAR_BEAST_IDENTITY_REFERENCE_ONLY",
  });
  const commandResult = runtime.createPersonalStarBeastIdentityExplicitUserBindingAuthorizationCommand(Object.freeze({ reviewResult: review, command }));
  const result = runtime.resolvePersonalStarBeastIdentityExplicitUserBindingAuthorization(Object.freeze({ commandResult }));
  assertEqual("P139 resolution is ready", result.status, "READY");
  if (result.status === "READY") {
    assertEqual("resolution status is exact", result.resolutionStatus, "READY_FOR_EXPLICIT_USER_BINDING_AUTHORIZATION_DECISION");
    assertEqual("pending status is exact", result.resolutionReference.resolutionStatus, "PENDING_EXPLICIT_USER_BINDING_AUTHORIZATION");
    assertEqual("authorization remains not granted", result.resolutionReference.authorizationStatus, "NOT_AUTHORIZED");
    assertEqual("binding remains deferred", result.resolutionReference.userBinding, "NOT_PERFORMED");
    assertEqual("product consumption remains deferred", result.resolutionReference.productConsumption, "NOT_PERFORMED");
    assertEqual("future decision remains required", result.resolutionReference.futureAuthorizationDecisionRequired, true);
  }
  const missing = runtime.resolvePersonalStarBeastIdentityExplicitUserBindingAuthorization(Object.freeze({ commandResult: null }));
  assertEqual("missing command result is unavailable", missing.status, "UNAVAILABLE");
  assertEqual("missing command reason", missing.reason, "COMMAND_RESULT_REQUIRED");
  const blocked = runtime.resolvePersonalStarBeastIdentityExplicitUserBindingAuthorization(Object.freeze({ commandResult: Object.freeze({ ...commandResult, boundary: Object.freeze({ ...commandResult.boundary, authorizationGranted: true }) }) }));
  assertEqual("invalid command boundary is blocked", blocked.status, "BLOCKED");
  assertEqual("invalid command reason", blocked.reason, "COMMAND_BOUNDARY_INVALID");
}

if (failures.length > 0) {
  console.error("\nPersonal Star Beast Explicit User Binding Authorization Resolution gate failed:");
  failures.forEach((failure) => console.error(`- ${failure}`));
  process.exit(1);
}
console.log("\nPersonal Star Beast Explicit User Binding Authorization Resolution gate passed.");
