import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import process from "node:process";
import { build } from "esbuild";

const rootDir = process.cwd();
const files = Object.freeze({
  type: "src/types/productionIdentitySourceAdapterImplementationAuthorization.ts",
  service: "src/services/productionIdentitySourceAdapterImplementationAuthorization.ts",
  contractType: "src/types/productionIdentitySourceAdapterBridgeImplementationContract.ts",
  contractService: "src/services/productionIdentitySourceAdapterBridgeImplementationContract.ts",
  protocol: "docs/GUANYAO_FORMAL_IDENTITY_SOURCE_ADAPTER_IMPLEMENTATION_AUTHORIZATION_PROTOCOL.md",
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
    "export type ProductionIdentitySourceAdapterImplementationAuthorizationInput",
    "ProductionIdentitySourceAdapterImplementationAuthorizationResult",
    "AUTHORIZED_FOR_ISOLATED_ADAPTER_IMPLEMENTATION",
    "ISOLATED_FORMAL_IDENTITY_SOURCE_ADAPTER_IMPLEMENTATION_ONLY",
    "userBindingAuthorization: false",
    "productIntegrationAuthorization: false",
    "adapterInvocation: \"NOT_PERFORMED\"",
    "engineInvocation: \"NOT_PERFORMED\"",
    "authorizationReviewOnly: true",
    "status: \"AUTHORIZED\"",
    "status: \"UNAVAILABLE\"",
    "status: \"BLOCKED\"",
  ].forEach((marker) => assertIncludes("P126 authorization type", source.type, marker));
  [
    "export function reviewProductionIdentitySourceAdapterImplementationAuthorization",
    "contract.status === \"UNAVAILABLE\"",
    "contract.status === \"BLOCKED\"",
    "CONTRACT_RESULT_REQUIRED",
    "CONTRACT_RESULT_UNAVAILABLE",
    "CONTRACT_RESULT_BLOCKED",
    "CONTRACT_BOUNDARY_INVALID",
    "FORMAL_IDENTITY_SOURCE_ADAPTER_INPUT_CONSUMPTION_CONTRACT_READY",
    "NORMALIZED_LUNAR_DATE_HOUR_BRANCH_WITH_LOCATION_CONTEXT_REFERENCE",
    "implementationAuthorized === false",
    "NOT_PERFORMED",
  ].forEach((marker) => assertIncludes("P126 authorization service", source.service, marker));
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
  ].forEach((marker) => assertExcludes("P126 authorization remains review-only", source.service, marker));
  [
    "RC-FORMAL-IDENTITY-SOURCE-ADAPTER-IMPLEMENTATION-AUTHORIZATION-P126",
    "P122 Input Normalizer",
    "P123 Normalized Reference Bridge Review",
    "P124 Adapter Bridge Implementation Readiness",
    "P125 Adapter Input Consumption Contract",
    "P126 Isolated Adapter Implementation Authorization",
    "AUTHORIZED_FOR_ISOLATED_ADAPTER_IMPLEMENTATION",
    "NOT_PERFORMED",
    "userBindingAuthorization",
    "productIntegrationAuthorization",
    "不实现、不调用 Adapter",
    "不进入 Adapter 实施",
  ].forEach((marker) => assertIncludes("P126 authorization protocol", source.protocol, marker));
  [
    "ProductionIdentitySourceAdapterImplementationAuthorizationInput",
    "ProductionIdentitySourceAdapterImplementationAuthorizationResult",
    "ProductionIdentitySourceAdapterImplementationAuthorizationReference",
    "from \"./productionIdentitySourceAdapterImplementationAuthorization\"",
  ].forEach((marker) => assertIncludes("P126 type index export", source.typeIndex, marker));
  assertIncludes("P126 gate registered", packageJson.scripts?.["check:production-identity-source-adapter-implementation-authorization"] ?? "", "node scripts/check-production-identity-source-adapter-implementation-authorization.mjs");
  assertIncludes("P126 release gate registered", packageJson.scripts?.["postcheck:release"] ?? "", "npm run check:production-identity-source-adapter-implementation-authorization");

  const modulePath = path.join(os.tmpdir(), `guanyao-p126-authorization-${process.pid}.mjs`);
  await build({
    stdin: { contents: `
      export { normalizeProductionIdentitySourceInput } from "./src/services/productionIdentitySourceInputNormalizer.ts";
      export { reviewProductionIdentitySourceNormalizedReferenceBridge } from "./src/services/productionIdentitySourceNormalizedReferenceBridge.ts";
      export { resolveProductionIdentitySourceAdapterBridgeImplementationReadiness } from "./src/services/productionIdentitySourceAdapterBridgeImplementationReadiness.ts";
      export { reviewProductionIdentitySourceAdapterBridgeImplementationContract } from "./src/services/productionIdentitySourceAdapterBridgeImplementationContract.ts";
      export { reviewProductionIdentitySourceAdapterImplementationAuthorization } from "./src/services/productionIdentitySourceAdapterImplementationAuthorization.ts";
    `, resolveDir: rootDir, sourcefile: "p126-authorization-gate-entry.ts", loader: "ts" },
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
  assertEqual("P125 contract is ready", contract.status, "READY");
  const authorization = runtime.reviewProductionIdentitySourceAdapterImplementationAuthorization(Object.freeze({ contractResult: contract }));
  assertEqual("P126 authorization is granted", authorization.status, "AUTHORIZED");
  if (authorization.status === "AUTHORIZED") {
    assertEqual("authorization status is exact", authorization.authorization, "AUTHORIZED_FOR_ISOLATED_ADAPTER_IMPLEMENTATION");
    assertEqual("user binding is not authorized", authorization.authorizationReference.userBindingAuthorization, false);
    assertEqual("product integration is not authorized", authorization.authorizationReference.productIntegrationAuthorization, false);
    assertEqual("adapter invocation not performed", authorization.authorizationReference.adapterInvocation, "NOT_PERFORMED");
    assertEqual("engine invocation not performed", authorization.authorizationReference.engineInvocation, "NOT_PERFORMED");
    assertEqual("contract reference preserved", authorization.authorizationReference.contractReference, contract.contractReference);
  }
  const missing = runtime.reviewProductionIdentitySourceAdapterImplementationAuthorization(Object.freeze({ contractResult: null }));
  assertEqual("missing contract is unavailable", missing.status, "UNAVAILABLE");
  assertEqual("missing contract reason", missing.reason, "CONTRACT_RESULT_REQUIRED");
  const deferred = runtime.normalizeProductionIdentitySourceInput(Object.freeze({ gregorianBirthDate: null, localBirthTime: "13:30" }));
  const deferredBridge = runtime.reviewProductionIdentitySourceNormalizedReferenceBridge(Object.freeze({ normalizationResult: deferred }));
  const deferredReadiness = runtime.resolveProductionIdentitySourceAdapterBridgeImplementationReadiness(Object.freeze({ bridgeReviewResult: deferredBridge }));
  const deferredContract = runtime.reviewProductionIdentitySourceAdapterBridgeImplementationContract(Object.freeze({ readinessResult: deferredReadiness }));
  const deferredAuthorization = runtime.reviewProductionIdentitySourceAdapterImplementationAuthorization(Object.freeze({ contractResult: deferredContract }));
  assertEqual("deferred contract is unavailable", deferredAuthorization.status, "UNAVAILABLE");
  assertEqual("deferred contract reason", deferredAuthorization.reason, "CONTRACT_RESULT_UNAVAILABLE");
  const invalidContract = Object.freeze({ ...contract, boundary: Object.freeze({ ...contract.boundary, noAdapterInvocation: false }) });
  const blockedAuthorization = runtime.reviewProductionIdentitySourceAdapterImplementationAuthorization(Object.freeze({ contractResult: invalidContract }));
  assertEqual("invalid contract boundary is blocked", blockedAuthorization.status, "BLOCKED");
  assertEqual("invalid contract reason", blockedAuthorization.reason, "CONTRACT_BOUNDARY_INVALID");
}

if (failures.length > 0) {
  console.error("\nFormal Identity Source Adapter Implementation Authorization gate failed:");
  failures.forEach((failure) => console.error(`- ${failure}`));
  process.exit(1);
}
console.log("\nFormal Identity Source Adapter Implementation Authorization gate passed.");
