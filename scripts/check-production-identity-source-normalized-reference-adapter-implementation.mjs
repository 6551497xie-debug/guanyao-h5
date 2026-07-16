import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import process from "node:process";
import { build } from "esbuild";

const rootDir = process.cwd();
const files = Object.freeze({
  type: "src/types/productionIdentitySourceNormalizedReferenceAdapter.ts",
  service: "src/services/productionIdentitySourceNormalizedReferenceAdapter.ts",
  authorizationType: "src/types/productionIdentitySourceAdapterImplementationAuthorization.ts",
  authorizationService: "src/services/productionIdentitySourceAdapterImplementationAuthorization.ts",
  contractType: "src/types/productionIdentitySourceAdapterBridgeImplementationContract.ts",
  contractService: "src/services/productionIdentitySourceAdapterBridgeImplementationContract.ts",
  protocol: "docs/GUANYAO_ISOLATED_FORMAL_IDENTITY_SOURCE_ADAPTER_IMPLEMENTATION_PROTOCOL.md",
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
    "export type ProductionIdentitySourceNormalizedReferenceAdapterInput",
    "ProductionIdentitySourceNormalizedReferenceAdapterResult",
    "ISOLATED_FORMAL_IDENTITY_SOURCE_ADAPTER_OUTPUT",
    "ISOLATED_FORMAL_IDENTITY_SOURCE_ADAPTER_ONLY",
    "FORMAL_IDENTITY_SOURCE_ENGINE_INPUT_REFERENCE",
    "noEngineInvocation: true",
    "noUserInputBinding: true",
    "status: \"AVAILABLE\"",
    "status: \"UNAVAILABLE\"",
    "status: \"BLOCKED\"",
  ].forEach((marker) => assertIncludes("P127 adapter type", source.type, marker));
  [
    "export function adaptProductionIdentitySourceNormalizedReference",
    "authorization.status === \"UNAVAILABLE\"",
    "authorization.status === \"BLOCKED\"",
    "contract.status === \"UNAVAILABLE\"",
    "contract.status === \"BLOCKED\"",
    "AUTHORIZATION_RESULT_REQUIRED",
    "AUTHORIZATION_RESULT_UNAVAILABLE",
    "AUTHORIZATION_RESULT_BLOCKED",
    "AUTHORIZATION_BOUNDARY_INVALID",
    "CONTRACT_RESULT_REQUIRED",
    "CONTRACT_RESULT_UNAVAILABLE",
    "CONTRACT_RESULT_BLOCKED",
    "CONTRACT_BOUNDARY_INVALID",
    "AUTHORIZATION_CONTRACT_REFERENCE_MISMATCH",
    "AUTHORIZED_FOR_ISOLATED_ADAPTER_IMPLEMENTATION",
    "FORMAL_IDENTITY_SOURCE_ADAPTER_INPUT_CONSUMPTION_CONTRACT_READY",
  ].forEach((marker) => assertIncludes("P127 adapter service", source.service, marker));
  [
    "adaptProductionIdentitySource(",
    "resolveProductionIdentitySourceAdapterReadiness",
    "resolveStarbeastFromBirthDate",
    "runMotherCodeLandingEngine",
    "resolveBirthCalendarFromGregorianDate",
    "localStorage",
    "sessionStorage",
    "document.",
    "createRenderer",
  ].forEach((marker) => assertExcludes("P127 adapter remains isolated", source.service, marker));
  [
    "RC-ISOLATED-FORMAL-IDENTITY-SOURCE-ADAPTER-IMPLEMENTATION-P127",
    "P125 Adapter Input Consumption Contract",
    "P126 Isolated Implementation Authorization",
    "P127 Isolated Formal Identity Source Adapter",
    "ISOLATED_FORMAL_IDENTITY_SOURCE_ADAPTER_AVAILABLE",
    "NO_PRODUCT_INTEGRATION",
    "不重新计算生命身份",
    "地点仍为上下文引用",
  ].forEach((marker) => assertIncludes("P127 adapter protocol", source.protocol, marker));
  [
    "ProductionIdentitySourceNormalizedReferenceAdapterInput",
    "ProductionIdentitySourceNormalizedReferenceAdapterResult",
    "ProductionIdentitySourceNormalizedReferenceAdapterReference",
    "from \"./productionIdentitySourceNormalizedReferenceAdapter\"",
  ].forEach((marker) => assertIncludes("P127 type index export", source.typeIndex, marker));
  assertIncludes("P127 gate registered", packageJson.scripts?.["check:production-identity-source-normalized-reference-adapter-implementation"] ?? "", "node scripts/check-production-identity-source-normalized-reference-adapter-implementation.mjs");
  assertIncludes("P127 release gate registered", packageJson.scripts?.["postcheck:release"] ?? "", "npm run check:production-identity-source-normalized-reference-adapter-implementation");

  const modulePath = path.join(os.tmpdir(), `guanyao-p127-adapter-${process.pid}.mjs`);
  await build({
    stdin: { contents: `
      export { normalizeProductionIdentitySourceInput } from "./src/services/productionIdentitySourceInputNormalizer.ts";
      export { reviewProductionIdentitySourceNormalizedReferenceBridge } from "./src/services/productionIdentitySourceNormalizedReferenceBridge.ts";
      export { resolveProductionIdentitySourceAdapterBridgeImplementationReadiness } from "./src/services/productionIdentitySourceAdapterBridgeImplementationReadiness.ts";
      export { reviewProductionIdentitySourceAdapterBridgeImplementationContract } from "./src/services/productionIdentitySourceAdapterBridgeImplementationContract.ts";
      export { reviewProductionIdentitySourceAdapterImplementationAuthorization } from "./src/services/productionIdentitySourceAdapterImplementationAuthorization.ts";
      export { adaptProductionIdentitySourceNormalizedReference } from "./src/services/productionIdentitySourceNormalizedReferenceAdapter.ts";
    `, resolveDir: rootDir, sourcefile: "p127-adapter-gate-entry.ts", loader: "ts" },
    outfile: modulePath, bundle: true, platform: "node", format: "esm", target: "node20", logLevel: "silent",
  });
  const runtime = await import(`file://${modulePath}?t=${Date.now()}`);
  const normalization = runtime.normalizeProductionIdentitySourceInput(Object.freeze({
    gregorianBirthDate: Object.freeze({ year: 1979, month: 3, day: 28 }),
    localBirthTime: "13:30",
    birthLocationContext: Object.freeze({ country: "CN", region: "Gansu", city: "Lanzhou" }),
  }));
  const bridge = runtime.reviewProductionIdentitySourceNormalizedReferenceBridge(Object.freeze({ normalizationResult: normalization }));
  const readiness = runtime.resolveProductionIdentitySourceAdapterBridgeImplementationReadiness(Object.freeze({ bridgeReviewResult: bridge }));
  const contract = runtime.reviewProductionIdentitySourceAdapterBridgeImplementationContract(Object.freeze({ readinessResult: readiness }));
  const authorization = runtime.reviewProductionIdentitySourceAdapterImplementationAuthorization(Object.freeze({ contractResult: contract }));
  assertEqual("P126 authorization is ready", authorization.status, "AUTHORIZED");
  const adapter = runtime.adaptProductionIdentitySourceNormalizedReference(Object.freeze({ authorizationResult: authorization, contractResult: contract }));
  assertEqual("P127 adapter is available", adapter.status, "AVAILABLE");
  if (adapter.status === "AVAILABLE") {
    assertEqual("adapter status is exact", adapter.adapterStatus, "ISOLATED_FORMAL_IDENTITY_SOURCE_ADAPTER_AVAILABLE");
    assertEqual("adapter scope is isolated", adapter.adapterReference.adapterScope, "ISOLATED_FORMAL_IDENTITY_SOURCE_ADAPTER_ONLY");
    assertEqual("adapter output role is engine input reference", adapter.adapterReference.outputRole, "FORMAL_IDENTITY_SOURCE_ENGINE_INPUT_REFERENCE");
    assertEqual("normalized reference is preserved", adapter.adapterReference.normalizedReference, contract.contractReference.readinessReference.sourceBridgeReviewReference.normalizedReference);
    assertEqual("engine invocation remains false", adapter.boundary.noEngineInvocation, true);
    assertEqual("user binding remains false", adapter.boundary.noUserInputBinding, true);
  }
  const missingAuthorization = runtime.adaptProductionIdentitySourceNormalizedReference(Object.freeze({ authorizationResult: null, contractResult: contract }));
  assertEqual("missing authorization is unavailable", missingAuthorization.status, "UNAVAILABLE");
  assertEqual("missing authorization reason", missingAuthorization.reason, "AUTHORIZATION_RESULT_REQUIRED");
  const deferred = runtime.normalizeProductionIdentitySourceInput(Object.freeze({ gregorianBirthDate: null, localBirthTime: "13:30" }));
  const deferredBridge = runtime.reviewProductionIdentitySourceNormalizedReferenceBridge(Object.freeze({ normalizationResult: deferred }));
  const deferredReadiness = runtime.resolveProductionIdentitySourceAdapterBridgeImplementationReadiness(Object.freeze({ bridgeReviewResult: deferredBridge }));
  const deferredContract = runtime.reviewProductionIdentitySourceAdapterBridgeImplementationContract(Object.freeze({ readinessResult: deferredReadiness }));
  const deferredAuthorization = runtime.reviewProductionIdentitySourceAdapterImplementationAuthorization(Object.freeze({ contractResult: deferredContract }));
  const deferredAdapter = runtime.adaptProductionIdentitySourceNormalizedReference(Object.freeze({ authorizationResult: deferredAuthorization, contractResult: deferredContract }));
  assertEqual("deferred authorization is unavailable", deferredAdapter.status, "UNAVAILABLE");
  assertEqual("deferred authorization reason", deferredAdapter.reason, "AUTHORIZATION_RESULT_UNAVAILABLE");
  const mismatched = runtime.adaptProductionIdentitySourceNormalizedReference(Object.freeze({ authorizationResult: authorization, contractResult: Object.freeze({ ...contract, contractReference: Object.freeze({ ...contract.contractReference, referenceId: "drifted" }) }) }));
  assertEqual("authorization and contract drift is blocked", mismatched.status, "BLOCKED");
  assertEqual("authorization and contract drift reason", mismatched.reason, "AUTHORIZATION_CONTRACT_REFERENCE_MISMATCH");
}

if (failures.length > 0) {
  console.error("\nIsolated Formal Identity Source Adapter Implementation gate failed:");
  failures.forEach((failure) => console.error(`- ${failure}`));
  process.exit(1);
}
console.log("\nIsolated Formal Identity Source Adapter Implementation gate passed.");
