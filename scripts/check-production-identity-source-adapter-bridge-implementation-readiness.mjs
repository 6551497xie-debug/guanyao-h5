import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import process from "node:process";
import { build } from "esbuild";

const rootDir = process.cwd();
const files = Object.freeze({
  type: "src/types/productionIdentitySourceAdapterBridgeImplementationReadiness.ts",
  service: "src/services/productionIdentitySourceAdapterBridgeImplementationReadiness.ts",
  bridgeType: "src/types/productionIdentitySourceNormalizedReferenceBridge.ts",
  bridgeService: "src/services/productionIdentitySourceNormalizedReferenceBridge.ts",
  protocol: "docs/GUANYAO_FORMAL_IDENTITY_SOURCE_ADAPTER_BRIDGE_IMPLEMENTATION_READINESS_PROTOCOL.md",
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
    "export type ProductionIdentitySourceAdapterBridgeImplementationReadinessInput",
    "ProductionIdentitySourceAdapterBridgeImplementationReadinessResult",
    "READY_FOR_FORMAL_IDENTITY_SOURCE_ADAPTER_BRIDGE_IMPLEMENTATION",
    "FUTURE_ADAPTER_IMPLEMENTATION_ONLY",
    "implementationAuthorized: false",
    "adapterInvocation: \"NOT_PERFORMED\"",
    "engineInvocation: \"NOT_PERFORMED\"",
    "implementationReadinessOnly: true",
    "noAdapterInvocation: true",
    "noEngineInvocation: true",
    "status: \"READY\"",
    "status: \"UNAVAILABLE\"",
    "status: \"BLOCKED\"",
  ].forEach((marker) => assertIncludes("P124 readiness type", source.type, marker));
  [
    "export function resolveProductionIdentitySourceAdapterBridgeImplementationReadiness",
    "bridge.status === \"UNAVAILABLE\"",
    "bridge.status === \"BLOCKED\"",
    "BRIDGE_REVIEW_REQUIRED",
    "BRIDGE_REVIEW_UNAVAILABLE",
    "BRIDGE_REVIEW_BLOCKED",
    "BRIDGE_REVIEW_BOUNDARY_INVALID",
    "FORMAL_IDENTITY_SOURCE_ADAPTER_BRIDGE_REVIEW",
    "FUTURE_FORMAL_IDENTITY_SOURCE_ADAPTER_INPUT_ONLY",
    "LUNAR_BIRTH_DATE_FROM_NORMALIZATION",
    "HOUR_BRANCH_FROM_NORMALIZATION",
  ].forEach((marker) => assertIncludes("P124 readiness service", source.service, marker));
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
  ].forEach((marker) => assertExcludes("P124 readiness remains pre-implementation", source.service, marker));
  [
    "RC-FORMAL-IDENTITY-SOURCE-ADAPTER-BRIDGE-IMPLEMENTATION-READINESS-P124",
    "P122 Input Normalizer",
    "P123 Normalized Reference Bridge Review",
    "P124 Adapter Bridge Implementation Readiness",
    "Future Formal Identity Source Adapter",
    "NOT_AUTHORIZED",
    "implementationAuthorized",
    "adapterInvocation",
    "engineInvocation",
    "不是 Adapter 实现",
    "不进入实现阶段",
  ].forEach((marker) => assertIncludes("P124 readiness protocol", source.protocol, marker));
  [
    "ProductionIdentitySourceAdapterBridgeImplementationReadinessInput",
    "ProductionIdentitySourceAdapterBridgeImplementationReadinessResult",
    "ProductionIdentitySourceAdapterBridgeImplementationReference",
    "from \"./productionIdentitySourceAdapterBridgeImplementationReadiness\"",
  ].forEach((marker) => assertIncludes("P124 type index export", source.typeIndex, marker));
  assertIncludes("P124 gate registered", packageJson.scripts?.["check:production-identity-source-adapter-bridge-implementation-readiness"] ?? "", "node scripts/check-production-identity-source-adapter-bridge-implementation-readiness.mjs");
  assertIncludes("P124 release gate registered", packageJson.scripts?.["postcheck:release"] ?? "", "npm run check:production-identity-source-adapter-bridge-implementation-readiness");

  const modulePath = path.join(os.tmpdir(), `guanyao-p124-readiness-${process.pid}.mjs`);
  await build({
    stdin: { contents: `
      export { normalizeProductionIdentitySourceInput } from "./src/services/productionIdentitySourceInputNormalizer.ts";
      export { reviewProductionIdentitySourceNormalizedReferenceBridge } from "./src/services/productionIdentitySourceNormalizedReferenceBridge.ts";
      export { resolveProductionIdentitySourceAdapterBridgeImplementationReadiness } from "./src/services/productionIdentitySourceAdapterBridgeImplementationReadiness.ts";
    `, resolveDir: rootDir, sourcefile: "p124-readiness-gate-entry.ts", loader: "ts" },
    outfile: modulePath, bundle: true, platform: "node", format: "esm", target: "node20", logLevel: "silent",
  });
  const runtime = await import(`file://${modulePath}?t=${Date.now()}`);
  const normalization = runtime.normalizeProductionIdentitySourceInput(Object.freeze({
    gregorianBirthDate: Object.freeze({ year: 1979, month: 3, day: 28 }),
    localBirthTime: "13:30",
    birthLocationContext: Object.freeze({ country: "CN", region: "Gansu", city: "Lanzhou" }),
  }));
  const bridge = runtime.reviewProductionIdentitySourceNormalizedReferenceBridge(Object.freeze({ normalizationResult: normalization }));
  assertEqual("P123 bridge is ready", bridge.status, "READY");
  const readiness = runtime.resolveProductionIdentitySourceAdapterBridgeImplementationReadiness(Object.freeze({ bridgeReviewResult: bridge }));
  assertEqual("P124 readiness is ready", readiness.status, "READY");
  if (readiness.status === "READY") {
    assertEqual("readiness status is exact", readiness.readiness, "READY_FOR_FORMAL_IDENTITY_SOURCE_ADAPTER_BRIDGE_IMPLEMENTATION");
    assertEqual("implementation remains unauthorized", readiness.implementationReference.implementationAuthorized, false);
    assertEqual("adapter invocation not performed", readiness.implementationReference.adapterInvocation, "NOT_PERFORMED");
    assertEqual("engine invocation not performed", readiness.implementationReference.engineInvocation, "NOT_PERFORMED");
    assertEqual("bridge reference preserved", readiness.implementationReference.sourceBridgeReviewReference, bridge.bridgeReference);
    assertEqual("user binding remains false", readiness.boundary.noUserInputBinding, true);
  }
  const missing = runtime.resolveProductionIdentitySourceAdapterBridgeImplementationReadiness(Object.freeze({ bridgeReviewResult: null }));
  assertEqual("missing bridge review is unavailable", missing.status, "UNAVAILABLE");
  assertEqual("missing bridge reason", missing.reason, "BRIDGE_REVIEW_REQUIRED");
  const deferred = runtime.normalizeProductionIdentitySourceInput(Object.freeze({ gregorianBirthDate: null, localBirthTime: "13:30" }));
  const deferredBridge = runtime.reviewProductionIdentitySourceNormalizedReferenceBridge(Object.freeze({ normalizationResult: deferred }));
  const deferredReadiness = runtime.resolveProductionIdentitySourceAdapterBridgeImplementationReadiness(Object.freeze({ bridgeReviewResult: deferredBridge }));
  assertEqual("deferred bridge is unavailable", deferredReadiness.status, "UNAVAILABLE");
  assertEqual("deferred bridge reason", deferredReadiness.reason, "BRIDGE_REVIEW_UNAVAILABLE");
  const invalidBridge = Object.freeze({ ...bridge, boundary: Object.freeze({ ...bridge.boundary, noAdapterInvocation: false }) });
  const blockedReadiness = runtime.resolveProductionIdentitySourceAdapterBridgeImplementationReadiness(Object.freeze({ bridgeReviewResult: invalidBridge }));
  assertEqual("invalid bridge boundary is blocked", blockedReadiness.status, "BLOCKED");
  assertEqual("invalid bridge reason", blockedReadiness.reason, "BRIDGE_REVIEW_BOUNDARY_INVALID");
}

if (failures.length > 0) {
  console.error("\nFormal Identity Source Adapter Bridge Implementation Readiness gate failed:");
  failures.forEach((failure) => console.error(`- ${failure}`));
  process.exit(1);
}
console.log("\nFormal Identity Source Adapter Bridge Implementation Readiness gate passed.");
