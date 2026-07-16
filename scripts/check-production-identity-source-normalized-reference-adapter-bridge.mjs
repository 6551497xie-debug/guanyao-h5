import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import process from "node:process";
import { build } from "esbuild";

const rootDir = process.cwd();
const files = Object.freeze({
  type: "src/types/productionIdentitySourceNormalizedReferenceBridge.ts",
  service: "src/services/productionIdentitySourceNormalizedReferenceBridge.ts",
  protocol: "docs/GUANYAO_NORMALIZED_REFERENCE_FORMAL_IDENTITY_SOURCE_ADAPTER_BRIDGE_PROTOCOL.md",
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
    "export type ProductionIdentitySourceNormalizedReferenceBridgeInput",
    "ProductionIdentitySourceNormalizedReferenceBridgeResult",
    "FORMAL_IDENTITY_SOURCE_ADAPTER_BRIDGE_REVIEW",
    "FUTURE_FORMAL_IDENTITY_SOURCE_ADAPTER_INPUT_ONLY",
    "LUNAR_BIRTH_DATE_FROM_NORMALIZATION",
    "HOUR_BRANCH_FROM_NORMALIZATION",
    "CONTEXT_REFERENCE_ONLY",
    "FORMAL_IDENTITY_SOURCE_ADAPTER_INPUT",
    "noAdapterInvocation: true",
    "noEngineInvocation: true",
    "noIdentityRecalculation: true",
    "status: \"READY\"",
    "status: \"UNAVAILABLE\"",
    "status: \"BLOCKED\"",
  ].forEach((marker) => assertIncludes("P123 bridge type", source.type, marker));
  [
    "export function reviewProductionIdentitySourceNormalizedReferenceBridge",
    "normalization.status === \"UNAVAILABLE\"",
    "normalization.status === \"BLOCKED\"",
    "NORMALIZATION_RESULT_REQUIRED",
    "NORMALIZATION_RESULT_UNAVAILABLE",
    "NORMALIZATION_RESULT_BLOCKED",
    "NORMALIZATION_REFERENCE_INVALID",
    "FORMAL_IDENTITY_SOURCE_NORMALIZATION_READY",
    "BIRTH_LOCATION_CONTEXT_REFERENCE",
    "locationExcludedFromStarBeastDerivation",
    "locationExcludedFromMotherCodeDerivation",
  ].forEach((marker) => assertIncludes("P123 bridge service", source.service, marker));
  [
    "resolveStarbeastFromBirthDate",
    "runMotherCodeLandingEngine",
    "resolveBirthCalendarFromGregorianDate",
    "localStorage",
    "sessionStorage",
    "document.",
    "createRenderer",
    "adaptProductionIdentitySource",
    "resolveProductionIdentitySourceAdapterReadiness",
  ].forEach((marker) => assertExcludes("P123 bridge remains review-only", source.service, marker));
  [
    "RC-NORMALIZED-REFERENCE-FORMAL-IDENTITY-SOURCE-ADAPTER-BRIDGE-P123",
    "P122 Input Normalizer",
    "P123 Normalized Reference Bridge Review",
    "Future Formal Identity Source Adapter",
    "NO_ADAPTER_INVOCATION",
    "不是正式适配器调用",
    "地点不参与星兽推导",
    "地点不参与母码推导",
    "不重新计算日期、时辰、身份、星兽或生命状态",
  ].forEach((marker) => assertIncludes("P123 bridge protocol", source.protocol, marker));
  [
    "ProductionIdentitySourceNormalizedReferenceBridgeInput",
    "ProductionIdentitySourceNormalizedReferenceBridgeResult",
    "ProductionIdentitySourceNormalizedReferenceBridgeReference",
    "from \"./productionIdentitySourceNormalizedReferenceBridge\"",
  ].forEach((marker) => assertIncludes("P123 type index export", source.typeIndex, marker));
  assertIncludes("P123 gate registered", packageJson.scripts?.["check:production-identity-source-normalized-reference-adapter-bridge"] ?? "", "node scripts/check-production-identity-source-normalized-reference-adapter-bridge.mjs");
  assertIncludes("P123 release gate registered", packageJson.scripts?.["postcheck:release"] ?? "", "npm run check:production-identity-source-normalized-reference-adapter-bridge");

  const modulePath = path.join(os.tmpdir(), `guanyao-p123-bridge-${process.pid}.mjs`);
  await build({
    stdin: { contents: `
      export { normalizeProductionIdentitySourceInput } from "./src/services/productionIdentitySourceInputNormalizer.ts";
      export { reviewProductionIdentitySourceNormalizedReferenceBridge } from "./src/services/productionIdentitySourceNormalizedReferenceBridge.ts";
    `, resolveDir: rootDir, sourcefile: "p123-bridge-gate-entry.ts", loader: "ts" },
    outfile: modulePath, bundle: true, platform: "node", format: "esm", target: "node20", logLevel: "silent",
  });
  const runtime = await import(`file://${modulePath}?t=${Date.now()}`);
  const normalization = runtime.normalizeProductionIdentitySourceInput(Object.freeze({
    gregorianBirthDate: Object.freeze({ year: 1979, month: 3, day: 28 }),
    localBirthTime: "13:30",
    birthLocationContext: Object.freeze({ country: "CN", region: "Gansu", city: "Lanzhou" }),
  }));
  assertEqual("P122 normalization is ready", normalization.status, "READY");
  const bridge = runtime.reviewProductionIdentitySourceNormalizedReferenceBridge(Object.freeze({ normalizationResult: normalization }));
  assertEqual("ready normalization creates bridge review", bridge.status, "READY");
  if (bridge.status === "READY") {
    assertEqual("bridge status is review-ready", bridge.bridgeStatus, "READY_FOR_FORMAL_IDENTITY_SOURCE_ADAPTER_BRIDGE_REVIEW");
    assertEqual("bridge preserves normalized reference", bridge.bridgeReference.normalizedReference, normalization.normalizationReference);
    assertEqual("downstream role is adapter input", bridge.bridgeReference.downstreamExpectation.downstreamInputRole, "FORMAL_IDENTITY_SOURCE_ADAPTER_INPUT");
    assertEqual("adapter invocation remains false", bridge.bridgeReference.noAdapterInvocation, true);
    assertEqual("engine invocation remains false", bridge.bridgeReference.noEngineInvocation, true);
    assertEqual("user binding remains false", bridge.bridgeReference.noUserInputBinding, true);
    assertEqual("raw location is absent", JSON.stringify(bridge).includes("Lanzhou"), false);
    assertEqual("raw time is absent", JSON.stringify(bridge).includes("13:30"), false);
  }
  const missing = runtime.reviewProductionIdentitySourceNormalizedReferenceBridge(Object.freeze({ normalizationResult: null }));
  assertEqual("missing normalization is unavailable", missing.status, "UNAVAILABLE");
  assertEqual("missing normalization reason", missing.reason, "NORMALIZATION_RESULT_REQUIRED");
  const deferred = runtime.normalizeProductionIdentitySourceInput(Object.freeze({ gregorianBirthDate: null, localBirthTime: "13:30" }));
  const deferredBridge = runtime.reviewProductionIdentitySourceNormalizedReferenceBridge(Object.freeze({ normalizationResult: deferred }));
  assertEqual("deferred normalization stays unavailable", deferredBridge.status, "UNAVAILABLE");
  assertEqual("deferred normalization reason", deferredBridge.reason, "NORMALIZATION_RESULT_UNAVAILABLE");
  const invalid = Object.freeze({ ...normalization, boundary: Object.freeze({ ...normalization.boundary, noStarBeastCreation: false }) });
  const blocked = runtime.reviewProductionIdentitySourceNormalizedReferenceBridge(Object.freeze({ normalizationResult: invalid }));
  assertEqual("invalid normalization boundary is blocked", blocked.status, "BLOCKED");
  assertEqual("invalid normalization reason", blocked.reason, "NORMALIZATION_REFERENCE_INVALID");
}

if (failures.length > 0) {
  console.error("\nNormalized Reference Formal Identity Source Adapter Bridge gate failed:");
  failures.forEach((failure) => console.error(`- ${failure}`));
  process.exit(1);
}
console.log("\nNormalized Reference Formal Identity Source Adapter Bridge gate passed.");
