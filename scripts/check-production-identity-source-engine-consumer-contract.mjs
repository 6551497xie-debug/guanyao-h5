import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import process from "node:process";
import { build } from "esbuild";

const rootDir = process.cwd();
const files = Object.freeze({
  type: "src/types/productionIdentitySourceEngineConsumerContract.ts",
  service: "src/services/productionIdentitySourceEngineConsumerContract.ts",
  readinessType: "src/types/productionIdentitySourceEngineConsumerReadiness.ts",
  readinessService: "src/services/productionIdentitySourceEngineConsumerReadiness.ts",
  protocol: "docs/GUANYAO_FORMAL_IDENTITY_SOURCE_ENGINE_CONSUMER_CONTRACT_PROTOCOL.md",
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
    "export type ProductionIdentitySourceEngineConsumerContractInput",
    "ProductionIdentitySourceEngineConsumerContractResult",
    "FORMAL_IDENTITY_SOURCE_ENGINE_CONSUMPTION_CONTRACT",
    "FORMAL_IDENTITY_SOURCE_ENGINE_INPUT_REFERENCE",
    "NORMALIZED_REFERENCE_LUNAR_BIRTH_DATE",
    "NORMALIZED_REFERENCE_HOUR_BRANCH",
    "NORMALIZED_REFERENCE_HOUR_BRANCH_ORDINAL",
    "NORMALIZED_REFERENCE_LOCATION_CONTEXT_ONLY",
    "engineInvocation: \"NOT_PERFORMED\"",
    "productionIntegration: false",
    "userBinding: false",
    "status: \"READY\"",
    "status: \"UNAVAILABLE\"",
    "status: \"BLOCKED\"",
  ].forEach((marker) => assertIncludes("P129 contract type", source.type, marker));
  [
    "export function reviewProductionIdentitySourceEngineConsumerContract",
    "readiness.status === \"UNAVAILABLE\"",
    "readiness.status === \"BLOCKED\"",
    "READINESS_RESULT_REQUIRED",
    "READINESS_RESULT_UNAVAILABLE",
    "READINESS_RESULT_BLOCKED",
    "READINESS_BOUNDARY_INVALID",
    "READY_FOR_FORMAL_IDENTITY_SOURCE_ENGINE_CONSUMPTION",
    "ISOLATED_FORMAL_IDENTITY_SOURCE_ADAPTER_OUTPUT",
    "FORMAL_IDENTITY_SOURCE_ENGINE_INPUT_REFERENCE",
  ].forEach((marker) => assertIncludes("P129 contract service", source.service, marker));
  [
    "resolveStarbeastFromBirthDate",
    "runMotherCodeLandingEngine",
    "resolveBirthCalendarFromGregorianDate",
    "adaptProductionIdentitySource(",
    "localStorage",
    "sessionStorage",
    "document.",
    "createRenderer",
  ].forEach((marker) => assertExcludes("P129 contract remains non-invasive", source.service, marker));
  [
    "RC-FORMAL-IDENTITY-SOURCE-ENGINE-CONSUMER-CONTRACT-P129",
    "P127 Isolated Adapter",
    "P128 Engine Consumer Readiness",
    "P129 Engine Consumer Contract",
    "NO_ENGINE_INVOCATION",
    "contract-only",
    "地点只表达出生地点上下文",
    "本刀通过只表示“引擎消费契约已冻结”",
  ].forEach((marker) => assertIncludes("P129 contract protocol", source.protocol, marker));
  [
    "ProductionIdentitySourceEngineConsumerContractInput",
    "ProductionIdentitySourceEngineConsumerContractResult",
    "ProductionIdentitySourceEngineConsumerContractReference",
    "from \"./productionIdentitySourceEngineConsumerContract\"",
  ].forEach((marker) => assertIncludes("P129 type index export", source.typeIndex, marker));
  assertIncludes("P129 gate registered", packageJson.scripts?.["check:production-identity-source-engine-consumer-contract"] ?? "", "node scripts/check-production-identity-source-engine-consumer-contract.mjs");
  assertIncludes("P129 release gate registered", packageJson.scripts?.["postcheck:release"] ?? "", "npm run check:production-identity-source-engine-consumer-contract");

  const modulePath = path.join(os.tmpdir(), `guanyao-p129-contract-${process.pid}.mjs`);
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
    `, resolveDir: rootDir, sourcefile: "p129-contract-gate-entry.ts", loader: "ts" },
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
  const authorization = runtime.reviewProductionIdentitySourceAdapterImplementationAuthorization(Object.freeze({ contractResult: adapterContract }));
  const adapter = runtime.adaptProductionIdentitySourceNormalizedReference(Object.freeze({ authorizationResult: authorization, contractResult: adapterContract }));
  const readiness = runtime.resolveProductionIdentitySourceEngineConsumerReadiness(Object.freeze({ adapterResult: adapter }));
  assertEqual("P128 readiness is ready", readiness.status, "READY");
  const contract = runtime.reviewProductionIdentitySourceEngineConsumerContract(Object.freeze({ readinessResult: readiness }));
  assertEqual("P129 contract is ready", contract.status, "READY");
  if (contract.status === "READY") {
    assertEqual("contract status is exact", contract.contractStatus, "FORMAL_IDENTITY_SOURCE_ENGINE_CONSUMPTION_CONTRACT_READY");
    assertEqual("input shape is engine reference", contract.contractReference.inputShape, "FORMAL_IDENTITY_SOURCE_ENGINE_INPUT_REFERENCE");
    assertEqual("lunar source is normalized", contract.contractReference.sourceMapping.lunarBirthDate, "NORMALIZED_REFERENCE_LUNAR_BIRTH_DATE");
    assertEqual("hour source is normalized", contract.contractReference.sourceMapping.hourBranch, "NORMALIZED_REFERENCE_HOUR_BRANCH");
    assertEqual("ordinal source is normalized", contract.contractReference.sourceMapping.hourBranchOrdinal, "NORMALIZED_REFERENCE_HOUR_BRANCH_ORDINAL");
    assertEqual("location remains context-only", contract.contractReference.sourceMapping.locationContext, "NORMALIZED_REFERENCE_LOCATION_CONTEXT_ONLY");
    assertEqual("engine invocation not performed", contract.contractReference.engineInvocation, "NOT_PERFORMED");
    assertEqual("production integration is false", contract.contractReference.productionIntegration, false);
    assertEqual("user binding is false", contract.contractReference.userBinding, false);
    assertEqual("readiness reference preserved", contract.contractReference.readinessReference, readiness.consumerReference);
  }
  const missing = runtime.reviewProductionIdentitySourceEngineConsumerContract(Object.freeze({ readinessResult: null }));
  assertEqual("missing readiness is unavailable", missing.status, "UNAVAILABLE");
  assertEqual("missing readiness reason", missing.reason, "READINESS_RESULT_REQUIRED");
  const deferred = runtime.normalizeProductionIdentitySourceInput(Object.freeze({ gregorianBirthDate: null, localBirthTime: "13:30" }));
  const deferredBridge = runtime.reviewProductionIdentitySourceNormalizedReferenceBridge(Object.freeze({ normalizationResult: deferred }));
  const deferredBridgeReadiness = runtime.resolveProductionIdentitySourceAdapterBridgeImplementationReadiness(Object.freeze({ bridgeReviewResult: deferredBridge }));
  const deferredAdapterContract = runtime.reviewProductionIdentitySourceAdapterBridgeImplementationContract(Object.freeze({ readinessResult: deferredBridgeReadiness }));
  const deferredAuthorization = runtime.reviewProductionIdentitySourceAdapterImplementationAuthorization(Object.freeze({ contractResult: deferredAdapterContract }));
  const deferredAdapter = runtime.adaptProductionIdentitySourceNormalizedReference(Object.freeze({ authorizationResult: deferredAuthorization, contractResult: deferredAdapterContract }));
  const deferredReadiness = runtime.resolveProductionIdentitySourceEngineConsumerReadiness(Object.freeze({ adapterResult: deferredAdapter }));
  const deferredContract = runtime.reviewProductionIdentitySourceEngineConsumerContract(Object.freeze({ readinessResult: deferredReadiness }));
  assertEqual("deferred readiness is unavailable", deferredContract.status, "UNAVAILABLE");
  assertEqual("deferred readiness reason", deferredContract.reason, "READINESS_RESULT_UNAVAILABLE");
  const invalidReadiness = Object.freeze({ ...readiness, boundary: Object.freeze({ ...readiness.boundary, noEngineInvocation: false }) });
  const blocked = runtime.reviewProductionIdentitySourceEngineConsumerContract(Object.freeze({ readinessResult: invalidReadiness }));
  assertEqual("invalid readiness boundary is blocked", blocked.status, "BLOCKED");
  assertEqual("invalid readiness reason", blocked.reason, "READINESS_BOUNDARY_INVALID");
}

if (failures.length > 0) {
  console.error("\nFormal Identity Source Engine Consumer Contract gate failed:");
  failures.forEach((failure) => console.error(`- ${failure}`));
  process.exit(1);
}
console.log("\nFormal Identity Source Engine Consumer Contract gate passed.");
