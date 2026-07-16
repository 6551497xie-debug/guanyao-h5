import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import process from "node:process";
import { build } from "esbuild";

const rootDir = process.cwd();
const files = Object.freeze({
  type: "src/types/productionIdentitySourceAdapterBridgeImplementationContract.ts",
  service: "src/services/productionIdentitySourceAdapterBridgeImplementationContract.ts",
  readinessType: "src/types/productionIdentitySourceAdapterBridgeImplementationReadiness.ts",
  readinessService: "src/services/productionIdentitySourceAdapterBridgeImplementationReadiness.ts",
  protocol: "docs/GUANYAO_FORMAL_IDENTITY_SOURCE_ADAPTER_BRIDGE_IMPLEMENTATION_CONTRACT_PROTOCOL.md",
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
    "export type ProductionIdentitySourceAdapterBridgeImplementationContractInput",
    "ProductionIdentitySourceAdapterBridgeImplementationContractResult",
    "FORMAL_IDENTITY_SOURCE_ADAPTER_INPUT_CONSUMPTION_CONTRACT",
    "NORMALIZED_LUNAR_DATE_HOUR_BRANCH_WITH_LOCATION_CONTEXT_REFERENCE",
    "NORMALIZED_REFERENCE_LUNAR_BIRTH_DATE",
    "NORMALIZED_REFERENCE_HOUR_BRANCH",
    "NORMALIZED_REFERENCE_HOUR_BRANCH_ORDINAL",
    "NORMALIZED_REFERENCE_LOCATION_CONTEXT_ONLY",
    "contractOnly: true",
    "adapterInvocation: \"NOT_PERFORMED\"",
    "engineInvocation: \"NOT_PERFORMED\"",
    "status: \"READY\"",
    "status: \"UNAVAILABLE\"",
    "status: \"BLOCKED\"",
  ].forEach((marker) => assertIncludes("P125 contract type", source.type, marker));
  [
    "export function reviewProductionIdentitySourceAdapterBridgeImplementationContract",
    "readiness.status === \"UNAVAILABLE\"",
    "readiness.status === \"BLOCKED\"",
    "READINESS_RESULT_REQUIRED",
    "READINESS_RESULT_UNAVAILABLE",
    "READINESS_RESULT_BLOCKED",
    "READINESS_BOUNDARY_INVALID",
    "FORMAL_IDENTITY_SOURCE_ADAPTER_BRIDGE_IMPLEMENTATION_READINESS",
    "FUTURE_ADAPTER_IMPLEMENTATION_ONLY",
    "implementationAuthorized === false",
    "NOT_PERFORMED",
  ].forEach((marker) => assertIncludes("P125 contract service", source.service, marker));
  [
    "adaptProductionIdentitySource",
    "resolveProductionIdentitySourceAdapterReadiness",
    "resolveStarbeastFromBirthDate",
    "runMotherCodeLandingEngine",
    "resolveBirthCalendarFromGregorianDate",
    "localStorage",
    "sessionStorage",
    "document.",
    "createRenderer",
  ].forEach((marker) => assertExcludes("P125 contract remains isolated", source.service, marker));
  [
    "RC-FORMAL-IDENTITY-SOURCE-ADAPTER-BRIDGE-IMPLEMENTATION-CONTRACT-P125",
    "P122 Input Normalizer",
    "P123 Normalized Reference Bridge Review",
    "P124 Adapter Bridge Implementation Readiness",
    "P125 Adapter Input Consumption Contract",
    "NOT_PERFORMED",
    "不是 Adapter 实现",
    "地点仍然只是上下文引用",
    "不接真实用户",
  ].forEach((marker) => assertIncludes("P125 contract protocol", source.protocol, marker));
  [
    "ProductionIdentitySourceAdapterBridgeImplementationContractInput",
    "ProductionIdentitySourceAdapterBridgeImplementationContractResult",
    "ProductionIdentitySourceAdapterBridgeImplementationContractReference",
    "from \"./productionIdentitySourceAdapterBridgeImplementationContract\"",
  ].forEach((marker) => assertIncludes("P125 type index export", source.typeIndex, marker));
  assertIncludes("P125 gate registered", packageJson.scripts?.["check:production-identity-source-adapter-bridge-implementation-contract"] ?? "", "node scripts/check-production-identity-source-adapter-bridge-implementation-contract.mjs");
  assertIncludes("P125 release gate registered", packageJson.scripts?.["postcheck:release"] ?? "", "npm run check:production-identity-source-adapter-bridge-implementation-contract");

  const modulePath = path.join(os.tmpdir(), `guanyao-p125-contract-${process.pid}.mjs`);
  await build({
    stdin: { contents: `
      export { normalizeProductionIdentitySourceInput } from "./src/services/productionIdentitySourceInputNormalizer.ts";
      export { reviewProductionIdentitySourceNormalizedReferenceBridge } from "./src/services/productionIdentitySourceNormalizedReferenceBridge.ts";
      export { resolveProductionIdentitySourceAdapterBridgeImplementationReadiness } from "./src/services/productionIdentitySourceAdapterBridgeImplementationReadiness.ts";
      export { reviewProductionIdentitySourceAdapterBridgeImplementationContract } from "./src/services/productionIdentitySourceAdapterBridgeImplementationContract.ts";
    `, resolveDir: rootDir, sourcefile: "p125-contract-gate-entry.ts", loader: "ts" },
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
  assertEqual("P124 readiness is ready", readiness.status, "READY");
  const contract = runtime.reviewProductionIdentitySourceAdapterBridgeImplementationContract(Object.freeze({ readinessResult: readiness }));
  assertEqual("P125 contract is ready", contract.status, "READY");
  if (contract.status === "READY") {
    assertEqual("contract status is exact", contract.contractStatus, "FORMAL_IDENTITY_SOURCE_ADAPTER_INPUT_CONSUMPTION_CONTRACT_READY");
    assertEqual("input shape is frozen", contract.contractReference.inputShape, "NORMALIZED_LUNAR_DATE_HOUR_BRANCH_WITH_LOCATION_CONTEXT_REFERENCE");
    assertEqual("lunar source is normalized", contract.contractReference.sourceMapping.lunarBirthDate, "NORMALIZED_REFERENCE_LUNAR_BIRTH_DATE");
    assertEqual("hour source is normalized", contract.contractReference.sourceMapping.hourBranch, "NORMALIZED_REFERENCE_HOUR_BRANCH");
    assertEqual("location remains context-only", contract.contractReference.sourceMapping.locationContext, "NORMALIZED_REFERENCE_LOCATION_CONTEXT_ONLY");
    assertEqual("adapter invocation is not performed", contract.contractReference.adapterInvocation, "NOT_PERFORMED");
    assertEqual("engine invocation is not performed", contract.contractReference.engineInvocation, "NOT_PERFORMED");
    assertEqual("readiness reference preserved", contract.contractReference.readinessReference, readiness.implementationReference);
  }
  const missing = runtime.reviewProductionIdentitySourceAdapterBridgeImplementationContract(Object.freeze({ readinessResult: null }));
  assertEqual("missing readiness is unavailable", missing.status, "UNAVAILABLE");
  assertEqual("missing readiness reason", missing.reason, "READINESS_RESULT_REQUIRED");
  const deferred = runtime.normalizeProductionIdentitySourceInput(Object.freeze({ gregorianBirthDate: null, localBirthTime: "13:30" }));
  const deferredBridge = runtime.reviewProductionIdentitySourceNormalizedReferenceBridge(Object.freeze({ normalizationResult: deferred }));
  const deferredReadiness = runtime.resolveProductionIdentitySourceAdapterBridgeImplementationReadiness(Object.freeze({ bridgeReviewResult: deferredBridge }));
  const deferredContract = runtime.reviewProductionIdentitySourceAdapterBridgeImplementationContract(Object.freeze({ readinessResult: deferredReadiness }));
  assertEqual("deferred readiness is unavailable", deferredContract.status, "UNAVAILABLE");
  assertEqual("deferred readiness reason", deferredContract.reason, "READINESS_RESULT_UNAVAILABLE");
  const invalidReadiness = Object.freeze({ ...readiness, boundary: Object.freeze({ ...readiness.boundary, noAdapterInvocation: false }) });
  const blocked = runtime.reviewProductionIdentitySourceAdapterBridgeImplementationContract(Object.freeze({ readinessResult: invalidReadiness }));
  assertEqual("invalid readiness boundary is blocked", blocked.status, "BLOCKED");
  assertEqual("invalid readiness reason", blocked.reason, "READINESS_BOUNDARY_INVALID");
}

if (failures.length > 0) {
  console.error("\nFormal Identity Source Adapter Bridge Implementation Contract gate failed:");
  failures.forEach((failure) => console.error(`- ${failure}`));
  process.exit(1);
}
console.log("\nFormal Identity Source Adapter Bridge Implementation Contract gate passed.");
