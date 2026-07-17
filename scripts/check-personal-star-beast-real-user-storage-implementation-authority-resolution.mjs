import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import process from "node:process";
import { build } from "esbuild";

const rootDir = process.cwd();
const files = Object.freeze({
  type: "src/types/personalStarBeastIdentityRealUserStorageImplementationAuthorityResolution.ts",
  service: "src/services/personalStarBeastIdentityRealUserStorageImplementationAuthorityResolution.ts",
  commandType: "src/types/personalStarBeastIdentityRealUserStorageImplementationAuthorityCommand.ts",
  commandService: "src/services/personalStarBeastIdentityRealUserStorageImplementationAuthorityCommand.ts",
  protocol: "docs/GUANYAO_PERSONAL_STAR_BEAST_REAL_USER_STORAGE_IMPLEMENTATION_AUTHORITY_RESOLUTION_PROTOCOL.md",
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
    "PersonalStarBeastIdentityRealUserStorageImplementationAuthorityResolutionInput",
    "PersonalStarBeastIdentityRealUserStorageImplementationAuthorityResolutionResult",
    "PENDING_EXPLICIT_REAL_USER_STORAGE_IMPLEMENTATION_AUTHORIZATION",
    "READY_FOR_EXPLICIT_REAL_USER_STORAGE_IMPLEMENTATION_AUTHORIZATION_DECISION",
    "authorizationDecisionPending: true",
    "authorizationStatus: \"NOT_AUTHORIZED\"",
    "implementationAuthorized: false",
    "futureAuthorizationDecisionRequired: true",
  ].forEach((marker) => assertIncludes("P152 resolution type", source.type, marker));
  [
    "export function resolvePersonalStarBeastIdentityRealUserStorageImplementationAuthority",
    "COMMAND_RESULT_REQUIRED",
    "COMMAND_RESULT_UNAVAILABLE",
    "COMMAND_RESULT_BLOCKED",
    "COMMAND_BOUNDARY_INVALID",
    "COMMAND_REFERENCE_INVALID",
    "COMMAND_SCOPE_INVALID",
    "authorizationDecisionPending: true",
    "authorizationGranted: false",
  ].forEach((marker) => assertIncludes("P152 resolution service", source.service, marker));
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
  ].forEach((marker) => assertExcludes("P152 remains resolution-only", source.service, marker));
  [
    "RC-PERSONAL-STAR-BEAST-REAL-USER-STORAGE-IMPLEMENTATION-AUTHORITY-RESOLUTION-P152",
    "P151 Explicit Implementation Authority Command",
    "READY_FOR_EXPLICIT_REAL_USER_STORAGE_IMPLEMENTATION_AUTHORIZATION_DECISION",
    "authorizationStatus = NOT_AUTHORIZED",
    "implementationAuthorized = false",
    "futureAuthorizationDecisionRequired = true",
    "不生成 `authorizationGranted`",
    "不调用真实认证 SDK",
    "不创建或调用 Storage Adapter",
  ].forEach((marker) => assertIncludes("P152 protocol", source.protocol, marker));
  [
    "PersonalStarBeastIdentityRealUserStorageImplementationAuthorityResolutionInput",
    "PersonalStarBeastIdentityRealUserStorageImplementationAuthorityResolutionResult",
    "PersonalStarBeastIdentityRealUserStorageImplementationAuthorityResolutionReference",
    "from \"./personalStarBeastIdentityRealUserStorageImplementationAuthorityResolution\"",
  ].forEach((marker) => assertIncludes("P152 type index export", source.typeIndex, marker));
  assertIncludes("P152 gate registered", packageJson.scripts?.["check:personal-star-beast-real-user-storage-implementation-authority-resolution"] ?? "", "node scripts/check-personal-star-beast-real-user-storage-implementation-authority-resolution.mjs");
  assertIncludes("P152 release gate registered", packageJson.scripts?.["postcheck:release"] ?? "", "npm run check:personal-star-beast-real-user-storage-implementation-authority-resolution");

  const modulePath = path.join(os.tmpdir(), `guanyao-p152-real-user-storage-authority-resolution-${process.pid}.mjs`);
  await build({
    stdin: {
      contents: `export { resolvePersonalStarBeastIdentityRealUserStorageImplementationAuthority } from "./src/services/personalStarBeastIdentityRealUserStorageImplementationAuthorityResolution.ts";`,
      resolveDir: rootDir,
      sourcefile: "p152-real-user-storage-authority-resolution-gate-entry.ts",
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
  const commandReference = Object.freeze({
    referenceType: "PERSONAL_STAR_BEAST_IDENTITY_REAL_USER_STORAGE_IMPLEMENTATION_AUTHORITY_COMMAND_REFERENCE",
    referenceId: "p151-command-reference-fixture",
    commandVersion: "V1",
    command: Object.freeze({
      commandType: "EXPLICIT_REAL_USER_STORAGE_ADAPTER_IMPLEMENTATION_AUTHORITY_COMMAND",
      commandId: "p151-command-fixture",
      subjectDecision: "AUTHORIZE_REAL_USER_STORAGE_ADAPTER_IMPLEMENTATION",
      authorityReference: "opaque-authority:p152-fixture",
      identityReferenceAccepted: true,
      implementationScope: "REAL_AUTHENTICATION_AND_STORAGE_ADAPTER_IMPLEMENTATION_ONLY",
    }),
    commandStatus: "AVAILABLE_FOR_AUTHORIZATION_RESOLUTION",
    subjectIntent: "DECLARED",
    authorizationStatus: "NOT_AUTHORIZED",
    implementationAuthorized: false,
    realAuthentication: "NOT_AUTHORIZED",
    storageAdapter: "NOT_AUTHORIZED",
    productIntegration: "NOT_AUTHORIZED",
    futureAuthorizationResolutionRequired: true,
    noAutomaticAuthorization: true,
    noUIIntegration: true,
    noEngineInvocation: true,
    noRendererInvocation: true,
    noLifeStateMutation: true,
  });
  const readyP151 = Object.freeze({
    status: "READY",
    commandStatus: "READY_FOR_AUTHORIZATION_RESOLUTION",
    source: "personal_star_beast_identity_real_user_storage_implementation_authority_command",
    input: Object.freeze({ authorizationReviewResult: null, command: commandReference.command }),
    commandReference,
    boundary: Object.freeze({
      commandContractOnly: true,
      referenceOnly: true,
      commandExecutionPerformed: false,
      authorizationGranted: false,
      implementationAuthorized: false,
      realAuthenticationPerformed: false,
      storageWritePerformed: false,
      storageReadPerformed: false,
      productIntegrationPerformed: false,
      noAutomaticAuthorization: true,
      noUIIntegration: true,
      noEngineInvocation: true,
      noRendererInvocation: true,
      noLifeStateMutation: true,
    }),
  });
  const ready = runtime.resolvePersonalStarBeastIdentityRealUserStorageImplementationAuthority(Object.freeze({ commandResult: readyP151 }));
  assertEqual("P152 valid command is ready", ready.status, "READY");
  if (ready.status === "READY") {
    assertEqual("P152 resolution status is exact", ready.resolutionStatus, "READY_FOR_EXPLICIT_REAL_USER_STORAGE_IMPLEMENTATION_AUTHORIZATION_DECISION");
    assertEqual("P152 resolution remains pending", ready.resolutionReference.resolutionStatus, "PENDING_EXPLICIT_REAL_USER_STORAGE_IMPLEMENTATION_AUTHORIZATION");
    assertEqual("P152 authorization remains ungranted", ready.resolutionReference.authorizationStatus, "NOT_AUTHORIZED");
    assertEqual("P152 implementation remains unauthorized", ready.resolutionReference.implementationAuthorized, false);
    assertEqual("P152 future decision required", ready.resolutionReference.futureAuthorizationDecisionRequired, true);
  }
  const missing = runtime.resolvePersonalStarBeastIdentityRealUserStorageImplementationAuthority(Object.freeze({ commandResult: null }));
  assertEqual("missing P151 command is unavailable", missing.status, "UNAVAILABLE");
  assertEqual("missing P151 command reason", missing.reason, "COMMAND_RESULT_REQUIRED");
  const unavailable = runtime.resolvePersonalStarBeastIdentityRealUserStorageImplementationAuthority(Object.freeze({ commandResult: Object.freeze({ status: "UNAVAILABLE" }) }));
  assertEqual("unavailable P151 command stays unavailable", unavailable.status, "UNAVAILABLE");
  assertEqual("unavailable P151 command reason", unavailable.reason, "COMMAND_RESULT_UNAVAILABLE");
  const blocked = runtime.resolvePersonalStarBeastIdentityRealUserStorageImplementationAuthority(Object.freeze({ commandResult: Object.freeze({ status: "BLOCKED" }) }));
  assertEqual("blocked P151 command stays blocked", blocked.status, "BLOCKED");
  assertEqual("blocked P151 command reason", blocked.reason, "COMMAND_RESULT_BLOCKED");
  const invalidBoundary = runtime.resolvePersonalStarBeastIdentityRealUserStorageImplementationAuthority(Object.freeze({
    commandResult: Object.freeze({
      ...readyP151,
      boundary: Object.freeze({ ...readyP151.boundary, storageWritePerformed: true }),
    }),
  }));
  assertEqual("invalid P151 boundary is blocked", invalidBoundary.status, "BLOCKED");
  assertEqual("invalid P151 boundary reason", invalidBoundary.reason, "COMMAND_BOUNDARY_INVALID");
  const invalidScope = runtime.resolvePersonalStarBeastIdentityRealUserStorageImplementationAuthority(Object.freeze({
    commandResult: Object.freeze({
      ...readyP151,
      commandReference: Object.freeze({
        ...commandReference,
        command: Object.freeze({ ...commandReference.command, implementationScope: "PERSONAL_STAR_BEAST_IDENTITY_REFERENCE_ONLY" }),
      }),
    }),
  }));
  assertEqual("invalid P151 scope is blocked", invalidScope.status, "BLOCKED");
  assertEqual("invalid P151 scope reason", invalidScope.reason, "COMMAND_SCOPE_INVALID");
}

if (failures.length > 0) {
  console.error("\nPersonal Star Beast Real User Storage Implementation Authority Resolution gate failed:");
  failures.forEach((failure) => console.error(`- ${failure}`));
  process.exit(1);
}
console.log("\nPersonal Star Beast Real User Storage Implementation Authority Resolution gate passed.");
