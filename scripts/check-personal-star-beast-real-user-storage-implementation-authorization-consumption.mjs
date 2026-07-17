import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import process from "node:process";
import { build } from "esbuild";

const rootDir = process.cwd();
const files = Object.freeze({
  type: "src/types/personalStarBeastIdentityRealUserStorageImplementationAuthorizationConsumption.ts",
  service: "src/services/personalStarBeastIdentityRealUserStorageImplementationAuthorizationConsumption.ts",
  resolutionType: "src/types/personalStarBeastIdentityRealUserStorageImplementationAuthorizationDecisionResolution.ts",
  resolutionService: "src/services/personalStarBeastIdentityRealUserStorageImplementationAuthorizationDecisionResolution.ts",
  protocol: "docs/GUANYAO_PERSONAL_STAR_BEAST_REAL_USER_STORAGE_IMPLEMENTATION_AUTHORIZATION_CONSUMPTION_PROTOCOL.md",
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
    "PersonalStarBeastIdentityRealUserStorageImplementationAuthorizationConsumptionInput",
    "PersonalStarBeastIdentityRealUserStorageImplementationAuthorizationConsumptionResult",
    "AVAILABLE_FOR_FUTURE_REAL_USER_STORAGE_IMPLEMENTATION",
    "IMPLEMENTATION_AUTHORIZATION_DECLINED",
    "implementationDeferred: true",
    "realAuthenticationDeferred: true",
    "storageWriteDeferred: true",
  ].forEach((marker) => assertIncludes("P155 consumption type", source.type, marker));
  [
    "export function consumePersonalStarBeastIdentityRealUserStorageImplementationAuthorization",
    "DECISION_RESOLUTION_RESULT_REQUIRED",
    "DECISION_RESOLUTION_RESULT_UNAVAILABLE",
    "DECISION_RESOLUTION_RESULT_BLOCKED",
    "DECISION_RESOLUTION_BOUNDARY_INVALID",
    "DECISION_RESOLUTION_REFERENCE_INVALID",
    "IMPLEMENTATION_AUTHORIZATION_DECLINED",
    "authorizationConsumedOnly: true",
    "implementationDeferred: true",
  ].forEach((marker) => assertIncludes("P155 consumption service", source.service, marker));
  [
    "localStorage",
    "sessionStorage",
    "window.",
    "document.",
    "fetch(",
    "signIn(",
    "authenticate(",
    "createUserProfile",
    "writeStorage",
    "createStorageAdapter",
    "createRenderer",
    "runMotherCodeLandingEngine",
    "resolveStarbeastFromBirthDate",
  ].forEach((marker) => assertExcludes("P155 remains consumption-only", source.service, marker));
  [
    "RC-PERSONAL-STAR-BEAST-REAL-USER-STORAGE-IMPLEMENTATION-AUTHORIZATION-CONSUMPTION-P155",
    "P154 Explicit Implementation Authorization Decision Resolution",
    "AVAILABLE_FOR_FUTURE_REAL_USER_STORAGE_IMPLEMENTATION",
    "IMPLEMENTATION_AUTHORIZATION_DECLINED",
    "implementationDeferred = true",
    "realAuthenticationDeferred = true",
    "storageWriteDeferred = true",
    "不调用认证 SDK",
    "不创建或调用 Storage Adapter",
  ].forEach((marker) => assertIncludes("P155 protocol", source.protocol, marker));
  [
    "PersonalStarBeastIdentityRealUserStorageImplementationAuthorizationConsumptionInput",
    "PersonalStarBeastIdentityRealUserStorageImplementationAuthorizationConsumptionResult",
    "PersonalStarBeastIdentityRealUserStorageImplementationAuthorizationConsumptionAvailable",
    "from \"./personalStarBeastIdentityRealUserStorageImplementationAuthorizationConsumption\"",
  ].forEach((marker) => assertIncludes("P155 type index export", source.typeIndex, marker));
  assertIncludes("P155 gate registered", packageJson.scripts?.["check:personal-star-beast-real-user-storage-implementation-authorization-consumption"] ?? "", "node scripts/check-personal-star-beast-real-user-storage-implementation-authorization-consumption.mjs");
  assertIncludes("P155 release gate registered", packageJson.scripts?.["postcheck:release"] ?? "", "npm run check:personal-star-beast-real-user-storage-implementation-authorization-consumption");

  const modulePath = path.join(os.tmpdir(), `guanyao-p155-real-user-storage-authorization-consumption-${process.pid}.mjs`);
  await build({
    stdin: {
      contents: `export { consumePersonalStarBeastIdentityRealUserStorageImplementationAuthorization } from "./src/services/personalStarBeastIdentityRealUserStorageImplementationAuthorizationConsumption.ts";`,
      resolveDir: rootDir,
      sourcefile: "p155-real-user-storage-authorization-consumption-gate-entry.ts",
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
  const makeResolutionResult = (decisionOutcome) => Object.freeze({
    status: "READY",
    resolutionStatus: "READY_FOR_REAL_USER_STORAGE_IMPLEMENTATION_AUTHORIZATION_CONSUMPTION",
    source: "personal_star_beast_identity_real_user_storage_implementation_authorization_decision_resolution",
    input: Object.freeze({ decisionCommandResult: null }),
    resolutionReference: Object.freeze({
      referenceType: "PERSONAL_STAR_BEAST_IDENTITY_REAL_USER_STORAGE_IMPLEMENTATION_AUTHORIZATION_DECISION_RESOLUTION",
      referenceId: `p154-${decisionOutcome.toLowerCase()}-resolution-reference`,
      resolutionVersion: "V1",
      decisionCommandReference: Object.freeze({}),
      decisionOutcome,
      authorizationStatus: decisionOutcome === "GRANTED" ? "AUTHORIZED" : "NOT_AUTHORIZED",
      implementationAuthorized: decisionOutcome === "GRANTED",
      realAuthentication: decisionOutcome === "GRANTED" ? "AUTHORIZED_FOR_FUTURE_IMPLEMENTATION" : "NOT_AUTHORIZED",
      storageAdapter: decisionOutcome === "GRANTED" ? "AUTHORIZED_FOR_FUTURE_IMPLEMENTATION" : "NOT_AUTHORIZED",
      productIntegration: "NOT_AUTHORIZED",
      authorizationDecisionResolved: true,
      decisionResolutionOnly: true,
      referenceOnly: true,
      futureImplementationConsumptionRequired: true,
      noDefaultDecision: true,
      noAutomaticAuthorization: true,
      noUIIntegration: true,
      noEngineInvocation: true,
      noRendererInvocation: true,
      noLifeStateMutation: true,
    }),
    boundary: Object.freeze({
      decisionResolutionOnly: true,
      referenceOnly: true,
      authorizationDecisionResolved: true,
      authorizationGranted: decisionOutcome === "GRANTED",
      implementationAuthorized: decisionOutcome === "GRANTED",
      realAuthenticationPerformed: false,
      storageWritePerformed: false,
      storageReadPerformed: false,
      productIntegrationPerformed: false,
      noDefaultDecision: true,
      noAutomaticAuthorization: true,
      noUIIntegration: true,
      noEngineInvocation: true,
      noRendererInvocation: true,
      noLifeStateMutation: true,
    }),
  });
  const granted = runtime.consumePersonalStarBeastIdentityRealUserStorageImplementationAuthorization(Object.freeze({ decisionResolutionResult: makeResolutionResult("GRANTED") }));
  assertEqual("P155 GRANTED result is available", granted.status, "AVAILABLE");
  if (granted.status === "AVAILABLE") {
    assertEqual("P155 consumption status is exact", granted.consumption.consumptionStatus, "AVAILABLE_FOR_FUTURE_REAL_USER_STORAGE_IMPLEMENTATION");
    assertEqual("P155 implementation remains deferred", granted.consumption.implementationDeferred, true);
    assertEqual("P155 authentication remains deferred", granted.consumption.realAuthenticationDeferred, true);
    assertEqual("P155 storage remains deferred", granted.consumption.storageWriteDeferred, true);
  }
  const declined = runtime.consumePersonalStarBeastIdentityRealUserStorageImplementationAuthorization(Object.freeze({ decisionResolutionResult: makeResolutionResult("DECLINED") }));
  assertEqual("P155 DECLINED result is not authorized", declined.status, "NOT_AUTHORIZED");
  assertEqual("P155 DECLINED reason is exact", declined.reason, "IMPLEMENTATION_AUTHORIZATION_DECLINED");
  const missing = runtime.consumePersonalStarBeastIdentityRealUserStorageImplementationAuthorization(Object.freeze({ decisionResolutionResult: null }));
  assertEqual("missing P154 resolution is unavailable", missing.status, "UNAVAILABLE");
  assertEqual("missing P154 resolution reason", missing.reason, "DECISION_RESOLUTION_RESULT_REQUIRED");
  const unavailable = runtime.consumePersonalStarBeastIdentityRealUserStorageImplementationAuthorization(Object.freeze({ decisionResolutionResult: Object.freeze({ status: "UNAVAILABLE" }) }));
  assertEqual("unavailable P154 resolution stays unavailable", unavailable.status, "UNAVAILABLE");
  assertEqual("unavailable P154 resolution reason", unavailable.reason, "DECISION_RESOLUTION_RESULT_UNAVAILABLE");
  const blocked = runtime.consumePersonalStarBeastIdentityRealUserStorageImplementationAuthorization(Object.freeze({ decisionResolutionResult: Object.freeze({ status: "BLOCKED" }) }));
  assertEqual("blocked P154 resolution stays blocked", blocked.status, "BLOCKED");
  assertEqual("blocked P154 resolution reason", blocked.reason, "DECISION_RESOLUTION_RESULT_BLOCKED");
  const invalidBoundary = runtime.consumePersonalStarBeastIdentityRealUserStorageImplementationAuthorization(Object.freeze({
    decisionResolutionResult: Object.freeze({
      ...makeResolutionResult("GRANTED"),
      boundary: Object.freeze({ ...makeResolutionResult("GRANTED").boundary, storageWritePerformed: true }),
    }),
  }));
  assertEqual("invalid P154 boundary is blocked", invalidBoundary.status, "BLOCKED");
  assertEqual("invalid P154 boundary reason", invalidBoundary.reason, "DECISION_RESOLUTION_BOUNDARY_INVALID");
  const invalidReference = runtime.consumePersonalStarBeastIdentityRealUserStorageImplementationAuthorization(Object.freeze({
    decisionResolutionResult: Object.freeze({
      ...makeResolutionResult("GRANTED"),
      resolutionReference: Object.freeze({ ...makeResolutionResult("GRANTED").resolutionReference, implementationAuthorized: false }),
    }),
  }));
  assertEqual("invalid P154 reference is blocked", invalidReference.status, "BLOCKED");
  assertEqual("invalid P154 reference reason", invalidReference.reason, "DECISION_RESOLUTION_REFERENCE_INVALID");
}

if (failures.length > 0) {
  console.error("\nPersonal Star Beast Real User Storage Implementation Authorization Consumption gate failed:");
  failures.forEach((failure) => console.error(`- ${failure}`));
  process.exit(1);
}
console.log("\nPersonal Star Beast Real User Storage Implementation Authorization Consumption gate passed.");
