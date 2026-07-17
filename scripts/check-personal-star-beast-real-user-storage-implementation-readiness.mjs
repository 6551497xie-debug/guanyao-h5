import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import process from "node:process";
import { build } from "esbuild";

const rootDir = process.cwd();
const files = Object.freeze({
  type: "src/types/personalStarBeastIdentityRealUserStorageImplementationReadiness.ts",
  service: "src/services/personalStarBeastIdentityRealUserStorageImplementationReadiness.ts",
  consumptionType: "src/types/personalStarBeastIdentityRealUserStorageImplementationAuthorizationConsumption.ts",
  protocol: "docs/GUANYAO_PERSONAL_STAR_BEAST_REAL_USER_STORAGE_IMPLEMENTATION_READINESS_PROTOCOL.md",
  typeIndex: "src/types/index.ts",
  packageManifest: "package.json",
});
const failures = [];
const assertIncludes = (name, source, marker) => {
  if (!source.includes(marker)) failures.push(`${name} missing=${marker}`);
  else console.log(`PASS | ${name} | includes=${marker}`);
};
const assertExcludes = (name, source, marker) => {
  if (source.includes(marker)) failures.push(`${name} forbidden=${marker}`);
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
    "PersonalStarBeastIdentityRealUserStorageImplementationReadinessInput",
    "PersonalStarBeastIdentityRealUserStorageImplementationReadinessResult",
    "READY_FOR_REAL_USER_STORAGE_IMPLEMENTATION_REVIEW",
    "FUTURE_REAL_USER_STORAGE_IMPLEMENTATION_REVIEW_ONLY",
    "REAL_USER_STORAGE_IMPLEMENTATION_REVIEW_ONLY",
    "implementationNotStarted: true",
    "mayCreateAuthenticationAdapter: false",
    "mayCreateStorageAdapter: false",
    "mayInvokeAuthentication: false",
    "mayReadStorage: false",
    "mayWriteStorage: false",
  ].forEach((marker) => assertIncludes("P156 readiness type", source.type, marker));
  [
    "export function resolvePersonalStarBeastIdentityRealUserStorageImplementationReadiness",
    "AUTHORIZATION_CONSUMPTION_RESULT_REQUIRED",
    "AUTHORIZATION_CONSUMPTION_RESULT_UNAVAILABLE",
    "AUTHORIZATION_CONSUMPTION_RESULT_BLOCKED",
    "AUTHORIZATION_CONSUMPTION_BOUNDARY_INVALID",
    "AUTHORIZATION_CONSUMPTION_REFERENCE_INVALID",
    "IMPLEMENTATION_AUTHORIZATION_DECLINED",
    "READY_FOR_REAL_USER_STORAGE_IMPLEMENTATION_REVIEW",
  ].forEach((marker) => assertIncludes("P156 readiness service", source.service, marker));
  [
    "localStorage",
    "sessionStorage",
    "window.",
    "document.",
    "fetch(",
    "signIn(",
    "authenticate(",
    "createAuthenticationAdapter",
    "createStorageAdapter",
    "writeStorage",
    "readStorage",
    "bindRealUser",
  ].forEach((marker) => assertExcludes("P156 remains review-only", source.service, marker));
  [
    "RC-PERSONAL-STAR-BEAST-REAL-USER-STORAGE-IMPLEMENTATION-READINESS-P156",
    "READY_FOR_REAL_USER_STORAGE_IMPLEMENTATION_REVIEW",
    "不创建 Adapter",
    "不调用认证 SDK",
    "不绑定真实用户",
    "不读写 Storage",
    "implementationNotStarted = true",
  ].forEach((marker) => assertIncludes("P156 protocol", source.protocol, marker));
  [
    "PersonalStarBeastIdentityRealUserStorageImplementationReadinessInput",
    "PersonalStarBeastIdentityRealUserStorageImplementationReadinessResult",
    "PersonalStarBeastIdentityRealUserStorageImplementationReadinessReady",
    "from \"./personalStarBeastIdentityRealUserStorageImplementationReadiness\"",
  ].forEach((marker) => assertIncludes("P156 type index export", source.typeIndex, marker));
  assertIncludes("P156 gate registered", packageJson.scripts?.["check:personal-star-beast-real-user-storage-implementation-readiness"] ?? "", "node scripts/check-personal-star-beast-real-user-storage-implementation-readiness.mjs");
  assertIncludes("P156 release gate registered", packageJson.scripts?.["postcheck:release"] ?? "", "npm run check:personal-star-beast-real-user-storage-implementation-readiness");

  const modulePath = path.join(os.tmpdir(), `guanyao-p156-real-user-storage-readiness-${process.pid}.mjs`);
  await build({
    stdin: {
      contents: `export { resolvePersonalStarBeastIdentityRealUserStorageImplementationReadiness } from "./src/services/personalStarBeastIdentityRealUserStorageImplementationReadiness.ts";`,
      resolveDir: rootDir,
      sourcefile: "p156-readiness-gate-entry.ts",
      loader: "ts",
    },
    outfile: modulePath,
    bundle: true,
    platform: "node",
    format: "esm",
    target: "node20",
    logLevel: "silent",
  });
  const runtime = await import(`file://${modulePath}?t=${Date.now()}`);
  const sourceDecisionResolutionReference = Object.freeze({ referenceId: "p154-gate-reference" });
  const availableConsumption = Object.freeze({
    status: "AVAILABLE",
    source: "personal_star_beast_identity_real_user_storage_implementation_authorization_consumption",
    input: Object.freeze({ decisionResolutionResult: null }),
    consumption: Object.freeze({
      semanticRole: "REAL_USER_STORAGE_IMPLEMENTATION_AUTHORIZATION_CONSUMPTION",
      authorizationDecisionResolutionReference: sourceDecisionResolutionReference,
      sourceDecisionResolutionResult: Object.freeze({ status: "READY" }),
      decisionOutcome: "GRANTED",
      authorizationStatus: "AUTHORIZED",
      implementationAuthorized: true,
      consumptionStatus: "AVAILABLE_FOR_FUTURE_REAL_USER_STORAGE_IMPLEMENTATION",
      authorizationConsumedOnly: true,
      implementationDeferred: true,
      realAuthenticationDeferred: true,
      storageWriteDeferred: true,
      productIntegrationDeferred: true,
      noUIIntegration: true,
      noEngineInvocation: true,
      noRendererInvocation: true,
      noLifeStateMutation: true,
    }),
  });
  const ready = runtime.resolvePersonalStarBeastIdentityRealUserStorageImplementationReadiness(Object.freeze({ authorizationConsumptionResult: availableConsumption }));
  assertEqual("P156 AVAILABLE becomes review-ready", ready.status, "READY");
  if (ready.status === "READY") {
    assertEqual("P156 readiness label", ready.readiness, "READY_FOR_REAL_USER_STORAGE_IMPLEMENTATION_REVIEW");
    assertEqual("P156 adapter creation remains false", ready.readinessReference.implementationScope.mayCreateStorageAdapter, false);
    assertEqual("P156 authentication invocation remains false", ready.readinessReference.implementationScope.mayInvokeAuthentication, false);
  }
  const declined = runtime.resolvePersonalStarBeastIdentityRealUserStorageImplementationReadiness(Object.freeze({ authorizationConsumptionResult: Object.freeze({ status: "NOT_AUTHORIZED", reason: "IMPLEMENTATION_AUTHORIZATION_DECLINED" }) }));
  assertEqual("P156 declined remains not authorized", declined.status, "NOT_AUTHORIZED");
  const missing = runtime.resolvePersonalStarBeastIdentityRealUserStorageImplementationReadiness(Object.freeze({ authorizationConsumptionResult: null }));
  assertEqual("P156 missing consumption unavailable", missing.status, "UNAVAILABLE");
  const unavailable = runtime.resolvePersonalStarBeastIdentityRealUserStorageImplementationReadiness(Object.freeze({ authorizationConsumptionResult: Object.freeze({ status: "UNAVAILABLE" }) }));
  assertEqual("P156 unavailable consumption stays unavailable", unavailable.status, "UNAVAILABLE");
  const blocked = runtime.resolvePersonalStarBeastIdentityRealUserStorageImplementationReadiness(Object.freeze({ authorizationConsumptionResult: Object.freeze({ status: "BLOCKED" }) }));
  assertEqual("P156 blocked consumption stays blocked", blocked.status, "BLOCKED");
  const tampered = runtime.resolvePersonalStarBeastIdentityRealUserStorageImplementationReadiness(Object.freeze({ authorizationConsumptionResult: Object.freeze({ ...availableConsumption, consumption: Object.freeze({ ...availableConsumption.consumption, storageWriteDeferred: false }) }) }));
  assertEqual("P156 boundary drift is blocked", tampered.status, "BLOCKED");
  assertEqual("P156 boundary drift reason", tampered.reason, "AUTHORIZATION_CONSUMPTION_BOUNDARY_INVALID");
}

if (failures.length > 0) {
  console.error("\nPersonal Star Beast Real User Storage Implementation Readiness gate failed:");
  failures.forEach((failure) => console.error(`- ${failure}`));
  process.exit(1);
}
console.log("\nPersonal Star Beast Real User Storage Implementation Readiness gate passed.");
