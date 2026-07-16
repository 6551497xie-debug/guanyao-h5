import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import process from "node:process";
import { build } from "esbuild";

const rootDir = process.cwd();
const files = Object.freeze({
  type: "src/types/productionIdentitySourceEngineConsumerAuthorization.ts",
  service: "src/services/productionIdentitySourceEngineConsumerAuthorization.ts",
  contractType: "src/types/productionIdentitySourceEngineConsumerContract.ts",
  contractService: "src/services/productionIdentitySourceEngineConsumerContract.ts",
  protocol: "docs/GUANYAO_FORMAL_IDENTITY_SOURCE_ENGINE_CONSUMER_AUTHORIZATION_PROTOCOL.md",
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
    "export type ProductionIdentitySourceEngineConsumerAuthorizationInput",
    "ProductionIdentitySourceEngineConsumerAuthorizationResult",
    "AUTHORIZED_FOR_ISOLATED_ENGINE_CONSUMPTION",
    "ISOLATED_FORMAL_IDENTITY_SOURCE_ENGINE_CONSUMPTION_ONLY",
    "userBindingAuthorization: false",
    "productIntegrationAuthorization: false",
    "engineInvocation: \"NOT_PERFORMED\"",
    "authorizationReviewOnly: true",
    "isolatedEngineConsumptionOnly: true",
    "status: \"AUTHORIZED\"",
    "status: \"UNAVAILABLE\"",
    "status: \"BLOCKED\"",
  ].forEach((marker) => assertIncludes("P130 authorization type", source.type, marker));
  [
    "export function reviewProductionIdentitySourceEngineConsumerAuthorization",
    "contract.status === \"UNAVAILABLE\"",
    "contract.status === \"BLOCKED\"",
    "CONTRACT_RESULT_REQUIRED",
    "CONTRACT_RESULT_UNAVAILABLE",
    "CONTRACT_RESULT_BLOCKED",
    "CONTRACT_BOUNDARY_INVALID",
    "FORMAL_IDENTITY_SOURCE_ENGINE_CONSUMPTION_CONTRACT_READY",
    "FORMAL_IDENTITY_SOURCE_ENGINE_CONSUMPTION_ONLY",
    "engineInvocation === \"NOT_PERFORMED\"",
  ].forEach((marker) => assertIncludes("P130 authorization service", source.service, marker));
  [
    "resolveStarbeastFromBirthDate",
    "runMotherCodeLandingEngine",
    "resolveBirthCalendarFromGregorianDate",
    "adaptProductionIdentitySource(",
    "localStorage",
    "sessionStorage",
    "document.",
    "createRenderer",
  ].forEach((marker) => assertExcludes("P130 authorization remains review-only", source.service, marker));
  [
    "RC-FORMAL-IDENTITY-SOURCE-ENGINE-CONSUMER-AUTHORIZATION-P130",
    "P127 Isolated Adapter",
    "P128 Engine Consumer Readiness",
    "P129 Engine Consumer Contract",
    "P130 Isolated Engine Consumption Authorization",
    "AUTHORIZED_FOR_ISOLATED_ENGINE_CONSUMPTION",
    "NOT_PERFORMED",
    "userBindingAuthorization",
    "productIntegrationAuthorization",
    "不执行引擎",
    "不接入产品",
  ].forEach((marker) => assertIncludes("P130 authorization protocol", source.protocol, marker));
  [
    "ProductionIdentitySourceEngineConsumerAuthorizationInput",
    "ProductionIdentitySourceEngineConsumerAuthorizationResult",
    "ProductionIdentitySourceEngineConsumerAuthorizationReference",
    "from \"./productionIdentitySourceEngineConsumerAuthorization\"",
  ].forEach((marker) => assertIncludes("P130 type index export", source.typeIndex, marker));
  assertIncludes("P130 gate registered", packageJson.scripts?.["check:production-identity-source-engine-consumer-authorization"] ?? "", "node scripts/check-production-identity-source-engine-consumer-authorization.mjs");
  assertIncludes("P130 release gate registered", packageJson.scripts?.["postcheck:release"] ?? "", "npm run check:production-identity-source-engine-consumer-authorization");

  const modulePath = path.join(os.tmpdir(), `guanyao-p130-authorization-${process.pid}.mjs`);
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
    `, resolveDir: rootDir, sourcefile: "p130-authorization-gate-entry.ts", loader: "ts" },
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
  const readiness = runtime.resolveProductionIdentitySourceEngineConsumerReadiness(Object.freeze({ adapterResult: adapter }));
  const contract = runtime.reviewProductionIdentitySourceEngineConsumerContract(Object.freeze({ readinessResult: readiness }));
  assertEqual("P129 contract is ready", contract.status, "READY");
  const authorization = runtime.reviewProductionIdentitySourceEngineConsumerAuthorization(Object.freeze({ contractResult: contract }));
  assertEqual("P130 authorization is granted", authorization.status, "AUTHORIZED");
  if (authorization.status === "AUTHORIZED") {
    assertEqual("authorization status is exact", authorization.authorization, "AUTHORIZED_FOR_ISOLATED_ENGINE_CONSUMPTION");
    assertEqual("user binding is not authorized", authorization.authorizationReference.userBindingAuthorization, false);
    assertEqual("product integration is not authorized", authorization.authorizationReference.productIntegrationAuthorization, false);
    assertEqual("engine invocation not performed", authorization.authorizationReference.engineInvocation, "NOT_PERFORMED");
    assertEqual("contract reference preserved", authorization.authorizationReference.contractReference, contract.contractReference);
  }
  const missing = runtime.reviewProductionIdentitySourceEngineConsumerAuthorization(Object.freeze({ contractResult: null }));
  assertEqual("missing contract is unavailable", missing.status, "UNAVAILABLE");
  assertEqual("missing contract reason", missing.reason, "CONTRACT_RESULT_REQUIRED");
  const deferred = runtime.normalizeProductionIdentitySourceInput(Object.freeze({ gregorianBirthDate: null, localBirthTime: "13:30" }));
  const deferredBridge = runtime.reviewProductionIdentitySourceNormalizedReferenceBridge(Object.freeze({ normalizationResult: deferred }));
  const deferredBridgeReadiness = runtime.resolveProductionIdentitySourceAdapterBridgeImplementationReadiness(Object.freeze({ bridgeReviewResult: deferredBridge }));
  const deferredAdapterContract = runtime.reviewProductionIdentitySourceAdapterBridgeImplementationContract(Object.freeze({ readinessResult: deferredBridgeReadiness }));
  const deferredReadiness = runtime.resolveProductionIdentitySourceEngineConsumerReadiness(Object.freeze({ adapterResult: runtime.adaptProductionIdentitySourceNormalizedReference(Object.freeze({ authorizationResult: runtime.reviewProductionIdentitySourceAdapterImplementationAuthorization(Object.freeze({ contractResult: deferredAdapterContract })), contractResult: deferredAdapterContract })) }));
  const deferredContract = runtime.reviewProductionIdentitySourceEngineConsumerContract(Object.freeze({ readinessResult: deferredReadiness }));
  const deferredAuthorization = runtime.reviewProductionIdentitySourceEngineConsumerAuthorization(Object.freeze({ contractResult: deferredContract }));
  assertEqual("deferred contract is unavailable", deferredAuthorization.status, "UNAVAILABLE");
  assertEqual("deferred contract reason", deferredAuthorization.reason, "CONTRACT_RESULT_UNAVAILABLE");
  const invalidContract = Object.freeze({ ...contract, boundary: Object.freeze({ ...contract.boundary, noEngineInvocation: false }) });
  const blockedAuthorization = runtime.reviewProductionIdentitySourceEngineConsumerAuthorization(Object.freeze({ contractResult: invalidContract }));
  assertEqual("invalid contract boundary is blocked", blockedAuthorization.status, "BLOCKED");
  assertEqual("invalid contract reason", blockedAuthorization.reason, "CONTRACT_BOUNDARY_INVALID");
}

if (failures.length > 0) {
  console.error("\nFormal Identity Source Engine Consumer Authorization gate failed:");
  failures.forEach((failure) => console.error(`- ${failure}`));
  process.exit(1);
}
console.log("\nFormal Identity Source Engine Consumer Authorization gate passed.");
