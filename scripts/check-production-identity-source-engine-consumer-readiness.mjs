import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import process from "node:process";
import { build } from "esbuild";

const rootDir = process.cwd();
const files = Object.freeze({
  type: "src/types/productionIdentitySourceEngineConsumerReadiness.ts",
  service: "src/services/productionIdentitySourceEngineConsumerReadiness.ts",
  adapterType: "src/types/productionIdentitySourceNormalizedReferenceAdapter.ts",
  adapterService: "src/services/productionIdentitySourceNormalizedReferenceAdapter.ts",
  protocol: "docs/GUANYAO_FORMAL_IDENTITY_SOURCE_ENGINE_CONSUMER_READINESS_PROTOCOL.md",
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
    "export type ProductionIdentitySourceEngineConsumerReadinessInput",
    "ProductionIdentitySourceEngineConsumerReadinessResult",
    "FORMAL_IDENTITY_SOURCE_ENGINE_CONSUMER_READINESS",
    "FORMAL_IDENTITY_SOURCE_ENGINE_CONSUMPTION_ONLY",
    "FORMAL_IDENTITY_SOURCE_ENGINE_INPUT_REFERENCE",
    "engineInvocation: \"NOT_PERFORMED\"",
    "productionIntegration: false",
    "userBinding: false",
    "consumerReadinessOnly: true",
    "status: \"READY\"",
    "status: \"UNAVAILABLE\"",
    "status: \"BLOCKED\"",
  ].forEach((marker) => assertIncludes("P128 readiness type", source.type, marker));
  [
    "export function resolveProductionIdentitySourceEngineConsumerReadiness",
    "adapter.status === \"UNAVAILABLE\"",
    "adapter.status === \"BLOCKED\"",
    "ADAPTER_RESULT_REQUIRED",
    "ADAPTER_RESULT_UNAVAILABLE",
    "ADAPTER_RESULT_BLOCKED",
    "ADAPTER_BOUNDARY_INVALID",
    "ISOLATED_FORMAL_IDENTITY_SOURCE_ADAPTER_AVAILABLE",
    "FORMAL_IDENTITY_SOURCE_ENGINE_INPUT_REFERENCE",
    "FORMAL_IDENTITY_SOURCE_NORMALIZATION_REFERENCE",
  ].forEach((marker) => assertIncludes("P128 readiness service", source.service, marker));
  [
    "resolveStarbeastFromBirthDate",
    "runMotherCodeLandingEngine",
    "resolveBirthCalendarFromGregorianDate",
    "adaptProductionIdentitySource(",
    "localStorage",
    "sessionStorage",
    "document.",
    "createRenderer",
  ].forEach((marker) => assertExcludes("P128 readiness remains non-invasive", source.service, marker));
  [
    "RC-FORMAL-IDENTITY-SOURCE-ENGINE-CONSUMER-READINESS-P128",
    "P127 Isolated Formal Identity Source Adapter",
    "P128 Engine Consumer Readiness",
    "Future Formal Identity Source Engine Consumption",
    "NO_ENGINE_INVOCATION",
    "不调用、不修改任何正式引擎",
    "地点仍不参与星兽或母码推导",
    "本刀通过不等于引擎已执行",
  ].forEach((marker) => assertIncludes("P128 readiness protocol", source.protocol, marker));
  [
    "ProductionIdentitySourceEngineConsumerReadinessInput",
    "ProductionIdentitySourceEngineConsumerReadinessResult",
    "ProductionIdentitySourceEngineConsumerReadinessReference",
    "from \"./productionIdentitySourceEngineConsumerReadiness\"",
  ].forEach((marker) => assertIncludes("P128 type index export", source.typeIndex, marker));
  assertIncludes("P128 gate registered", packageJson.scripts?.["check:production-identity-source-engine-consumer-readiness"] ?? "", "node scripts/check-production-identity-source-engine-consumer-readiness.mjs");
  assertIncludes("P128 release gate registered", packageJson.scripts?.["postcheck:release"] ?? "", "npm run check:production-identity-source-engine-consumer-readiness");

  const modulePath = path.join(os.tmpdir(), `guanyao-p128-readiness-${process.pid}.mjs`);
  await build({
    stdin: { contents: `
      export { normalizeProductionIdentitySourceInput } from "./src/services/productionIdentitySourceInputNormalizer.ts";
      export { reviewProductionIdentitySourceNormalizedReferenceBridge } from "./src/services/productionIdentitySourceNormalizedReferenceBridge.ts";
      export { resolveProductionIdentitySourceAdapterBridgeImplementationReadiness } from "./src/services/productionIdentitySourceAdapterBridgeImplementationReadiness.ts";
      export { reviewProductionIdentitySourceAdapterBridgeImplementationContract } from "./src/services/productionIdentitySourceAdapterBridgeImplementationContract.ts";
      export { reviewProductionIdentitySourceAdapterImplementationAuthorization } from "./src/services/productionIdentitySourceAdapterImplementationAuthorization.ts";
      export { adaptProductionIdentitySourceNormalizedReference } from "./src/services/productionIdentitySourceNormalizedReferenceAdapter.ts";
      export { resolveProductionIdentitySourceEngineConsumerReadiness } from "./src/services/productionIdentitySourceEngineConsumerReadiness.ts";
    `, resolveDir: rootDir, sourcefile: "p128-readiness-gate-entry.ts", loader: "ts" },
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
  const contract = runtime.reviewProductionIdentitySourceAdapterBridgeImplementationContract(Object.freeze({ readinessResult: bridgeReadiness }));
  const authorization = runtime.reviewProductionIdentitySourceAdapterImplementationAuthorization(Object.freeze({ contractResult: contract }));
  const adapter = runtime.adaptProductionIdentitySourceNormalizedReference(Object.freeze({ authorizationResult: authorization, contractResult: contract }));
  assertEqual("P127 adapter is available", adapter.status, "AVAILABLE");
  const readiness = runtime.resolveProductionIdentitySourceEngineConsumerReadiness(Object.freeze({ adapterResult: adapter }));
  assertEqual("P128 readiness is ready", readiness.status, "READY");
  if (readiness.status === "READY") {
    assertEqual("readiness status is exact", readiness.readiness, "READY_FOR_FORMAL_IDENTITY_SOURCE_ENGINE_CONSUMPTION");
    assertEqual("consumer scope is engine-only", readiness.consumerReference.consumerScope, "FORMAL_IDENTITY_SOURCE_ENGINE_CONSUMPTION_ONLY");
    assertEqual("input role is exact", readiness.consumerReference.inputRole, "FORMAL_IDENTITY_SOURCE_ENGINE_INPUT_REFERENCE");
    assertEqual("engine invocation not performed", readiness.consumerReference.engineInvocation, "NOT_PERFORMED");
    assertEqual("production integration is false", readiness.consumerReference.productionIntegration, false);
    assertEqual("user binding is false", readiness.consumerReference.userBinding, false);
    assertEqual("adapter reference preserved", readiness.consumerReference.adapterReference, adapter.adapterReference);
  }
  const missing = runtime.resolveProductionIdentitySourceEngineConsumerReadiness(Object.freeze({ adapterResult: null }));
  assertEqual("missing adapter is unavailable", missing.status, "UNAVAILABLE");
  assertEqual("missing adapter reason", missing.reason, "ADAPTER_RESULT_REQUIRED");
  const deferred = runtime.normalizeProductionIdentitySourceInput(Object.freeze({ gregorianBirthDate: null, localBirthTime: "13:30" }));
  const deferredBridge = runtime.reviewProductionIdentitySourceNormalizedReferenceBridge(Object.freeze({ normalizationResult: deferred }));
  const deferredBridgeReadiness = runtime.resolveProductionIdentitySourceAdapterBridgeImplementationReadiness(Object.freeze({ bridgeReviewResult: deferredBridge }));
  const deferredContract = runtime.reviewProductionIdentitySourceAdapterBridgeImplementationContract(Object.freeze({ readinessResult: deferredBridgeReadiness }));
  const deferredAuthorization = runtime.reviewProductionIdentitySourceAdapterImplementationAuthorization(Object.freeze({ contractResult: deferredContract }));
  const deferredAdapter = runtime.adaptProductionIdentitySourceNormalizedReference(Object.freeze({ authorizationResult: deferredAuthorization, contractResult: deferredContract }));
  const deferredReadiness = runtime.resolveProductionIdentitySourceEngineConsumerReadiness(Object.freeze({ adapterResult: deferredAdapter }));
  assertEqual("deferred adapter is unavailable", deferredReadiness.status, "UNAVAILABLE");
  assertEqual("deferred adapter reason", deferredReadiness.reason, "ADAPTER_RESULT_UNAVAILABLE");
  const invalidAdapter = Object.freeze({ ...adapter, boundary: Object.freeze({ ...adapter.boundary, noEngineInvocation: false }) });
  const blocked = runtime.resolveProductionIdentitySourceEngineConsumerReadiness(Object.freeze({ adapterResult: invalidAdapter }));
  assertEqual("invalid adapter boundary is blocked", blocked.status, "BLOCKED");
  assertEqual("invalid adapter reason", blocked.reason, "ADAPTER_BOUNDARY_INVALID");
}

if (failures.length > 0) {
  console.error("\nFormal Identity Source Engine Consumer Readiness gate failed:");
  failures.forEach((failure) => console.error(`- ${failure}`));
  process.exit(1);
}
console.log("\nFormal Identity Source Engine Consumer Readiness gate passed.");
