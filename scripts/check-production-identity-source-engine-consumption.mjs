import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import process from "node:process";
import { build } from "esbuild";

const rootDir = process.cwd();
const files = Object.freeze({
  type: "src/types/productionIdentitySourceEngineConsumption.ts",
  service: "src/services/productionIdentitySourceEngineConsumption.ts",
  authorizationType: "src/types/productionIdentitySourceEngineConsumerAuthorization.ts",
  authorizationService: "src/services/productionIdentitySourceEngineConsumerAuthorization.ts",
  contractType: "src/types/productionIdentitySourceEngineConsumerContract.ts",
  contractService: "src/services/productionIdentitySourceEngineConsumerContract.ts",
  protocol: "docs/GUANYAO_ISOLATED_FORMAL_IDENTITY_SOURCE_ENGINE_CONSUMPTION_PROTOCOL.md",
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
    "export type ProductionIdentitySourceEngineConsumptionInput",
    "ProductionIdentitySourceEngineConsumptionResult",
    "FORMAL_IDENTITY_SOURCE_ENGINE_CONSUMPTION",
    "PERFORMED_ISOLATED",
    "identityConvergence: \"NOT_PERFORMED\"",
    "personalStarBeastCreation: false",
    "engineInvocationPerformed: true",
    "status: \"AVAILABLE\"",
    "status: \"UNAVAILABLE\"",
    "status: \"BLOCKED\"",
  ].forEach((marker) => assertIncludes("P131 consumption type", source.type, marker));
  [
    "export function consumeProductionIdentitySourceEngine",
    "resolveStarbeastFromBirthDate",
    "runMotherCodeLandingEngine",
    "AUTHORIZATION_RESULT_REQUIRED",
    "CONTRACT_RESULT_REQUIRED",
    "ADAPTER_RESULT_REQUIRED",
    "AUTHORIZATION_CONTRACT_MISMATCH",
    "ADAPTER_CONTRACT_MISMATCH",
    "NORMALIZED_DATE_REFERENCE_INVALID",
    "MANSION_ENGINE_NOT_READY",
    "MOTHER_CODE_ENGINE_NOT_READY",
    "identityConvergence: \"NOT_PERFORMED\"",
  ].forEach((marker) => assertIncludes("P131 consumption service", source.service, marker));
  [
    "resolveLifeArchetypeProfileFromMotherCode",
    "localStorage",
    "sessionStorage",
    "document.",
    "createRenderer",
    "createPersonalStarBeast",
  ].forEach((marker) => assertExcludes("P131 consumer remains isolated", source.service, marker));
  [
    "RC-ISOLATED-FORMAL-IDENTITY-SOURCE-ENGINE-CONSUMPTION-P131",
    "P129 Engine Consumer Contract",
    "P130 Isolated Engine Consumption Authorization",
    "P131 Isolated Engine Consumer",
    "resolveStarbeastFromBirthDate",
    "runMotherCodeLandingEngine",
    "identityConvergence = NOT_PERFORMED",
    "personalStarBeastCreation = false",
    "不是身份汇合",
    "不是产品消费",
  ].forEach((marker) => assertIncludes("P131 consumption protocol", source.protocol, marker));
  [
    "ProductionIdentitySourceEngineConsumptionInput",
    "ProductionIdentitySourceEngineConsumptionResult",
    "ProductionIdentitySourceEngineConsumptionReference",
    "from \"./productionIdentitySourceEngineConsumption\"",
  ].forEach((marker) => assertIncludes("P131 type index export", source.typeIndex, marker));
  assertIncludes("P131 gate registered", packageJson.scripts?.["check:production-identity-source-engine-consumption"] ?? "", "node scripts/check-production-identity-source-engine-consumption.mjs");
  assertIncludes("P131 release gate registered", packageJson.scripts?.["postcheck:release"] ?? "", "npm run check:production-identity-source-engine-consumption");

  const modulePath = path.join(os.tmpdir(), `guanyao-p131-consumption-${process.pid}.mjs`);
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
    `, resolveDir: rootDir, sourcefile: "p131-consumption-gate-entry.ts", loader: "ts" },
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
  assertEqual("P130 authorization is ready", engineAuthorization.status, "AUTHORIZED");
  const consumption = runtime.consumeProductionIdentitySourceEngine(Object.freeze({ authorizationResult: engineAuthorization, contractResult: engineContract, adapterResult: adapter }));
  assertEqual("P131 engine consumption is available", consumption.status, "AVAILABLE");
  if (consumption.status === "AVAILABLE") {
    assertEqual("consumption status is exact", consumption.consumptionStatus, "FORMAL_IDENTITY_SOURCE_ENGINE_CONSUMPTION_AVAILABLE");
    assertEqual("engine invocation is isolated", consumption.consumptionReference.engineInvocation, "PERFORMED_ISOLATED");
    assertEqual("identity convergence not performed", consumption.consumptionReference.identityConvergence, "NOT_PERFORMED");
    assertEqual("personal star beast not created", consumption.consumptionReference.personalStarBeastCreation, false);
    assertEqual("mansion engine result is ready", consumption.consumptionReference.mansionEngineResultReference.status, "READY");
    assertEqual("mother code result is ready", consumption.consumptionReference.motherCodeEngineResultReference.status, "READY");
    assertEqual("user binding remains false", consumption.consumptionReference.userBinding, false);
  }
  const missing = runtime.consumeProductionIdentitySourceEngine(Object.freeze({ authorizationResult: null, contractResult: engineContract, adapterResult: adapter }));
  assertEqual("missing authorization is unavailable", missing.status, "UNAVAILABLE");
  assertEqual("missing authorization reason", missing.reason, "AUTHORIZATION_RESULT_REQUIRED");
  const deferred = runtime.normalizeProductionIdentitySourceInput(Object.freeze({ gregorianBirthDate: null, localBirthTime: "13:30" }));
  const deferredBridge = runtime.reviewProductionIdentitySourceNormalizedReferenceBridge(Object.freeze({ normalizationResult: deferred }));
  const deferredReadiness = runtime.resolveProductionIdentitySourceAdapterBridgeImplementationReadiness(Object.freeze({ bridgeReviewResult: deferredBridge }));
  const deferredContract = runtime.reviewProductionIdentitySourceAdapterBridgeImplementationContract(Object.freeze({ readinessResult: deferredReadiness }));
  const deferredAuthorization = runtime.reviewProductionIdentitySourceAdapterImplementationAuthorization(Object.freeze({ contractResult: deferredContract }));
  const deferredAdapter = runtime.adaptProductionIdentitySourceNormalizedReference(Object.freeze({ authorizationResult: deferredAuthorization, contractResult: deferredContract }));
  const deferredConsumption = runtime.consumeProductionIdentitySourceEngine(Object.freeze({ authorizationResult: deferredAuthorization, contractResult: deferredContract, adapterResult: deferredAdapter }));
  assertEqual("deferred authorization is unavailable", deferredConsumption.status, "UNAVAILABLE");
  assertEqual("deferred authorization reason", deferredConsumption.reason, "AUTHORIZATION_RESULT_UNAVAILABLE");
  const invalidContract = Object.freeze({ ...engineContract, boundary: Object.freeze({ ...engineContract.boundary, noEngineInvocation: false }) });
  const blocked = runtime.consumeProductionIdentitySourceEngine(Object.freeze({ authorizationResult: engineAuthorization, contractResult: invalidContract, adapterResult: adapter }));
  assertEqual("invalid contract boundary is blocked", blocked.status, "BLOCKED");
  assertEqual("invalid contract reason", blocked.reason, "CONTRACT_BOUNDARY_INVALID");
}

if (failures.length > 0) {
  console.error("\nIsolated Formal Identity Source Engine Consumption gate failed:");
  failures.forEach((failure) => console.error(`- ${failure}`));
  process.exit(1);
}
console.log("\nIsolated Formal Identity Source Engine Consumption gate passed.");
