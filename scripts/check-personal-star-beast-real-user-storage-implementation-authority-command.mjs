import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import process from "node:process";
import { build } from "esbuild";

const rootDir = process.cwd();
const files = Object.freeze({
  type: "src/types/personalStarBeastIdentityRealUserStorageImplementationAuthorityCommand.ts",
  service: "src/services/personalStarBeastIdentityRealUserStorageImplementationAuthorityCommand.ts",
  reviewType: "src/types/personalStarBeastIdentityRealUserStorageIntegrationAuthorizationReview.ts",
  reviewService: "src/services/personalStarBeastIdentityRealUserStorageIntegrationAuthorizationReview.ts",
  protocol: "docs/GUANYAO_PERSONAL_STAR_BEAST_REAL_USER_STORAGE_IMPLEMENTATION_AUTHORITY_COMMAND_PROTOCOL.md",
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
    "PersonalStarBeastIdentityRealUserStorageImplementationAuthorityCommandInput",
    "PersonalStarBeastIdentityRealUserStorageImplementationAuthorityCommandResult",
    "EXPLICIT_REAL_USER_STORAGE_ADAPTER_IMPLEMENTATION_AUTHORITY_COMMAND",
    "AUTHORIZE_REAL_USER_STORAGE_ADAPTER_IMPLEMENTATION",
    "authorizationStatus: \"NOT_AUTHORIZED\"",
    "implementationAuthorized: false",
    "futureAuthorizationResolutionRequired: true",
  ].forEach((marker) => assertIncludes("P151 command type", source.type, marker));
  [
    "export function createPersonalStarBeastIdentityRealUserStorageImplementationAuthorityCommand",
    "AUTHORIZATION_REVIEW_REQUIRED",
    "AUTHORIZATION_REVIEW_UNAVAILABLE",
    "AUTHORIZATION_REVIEW_BLOCKED",
    "REVIEW_BOUNDARY_INVALID",
    "REVIEW_REFERENCE_INVALID",
    "COMMAND_TYPE_INVALID",
    "COMMAND_DECISION_INVALID",
    "COMMAND_SCOPE_INVALID",
    "authorizationGranted: false",
    "commandExecutionPerformed: false",
  ].forEach((marker) => assertIncludes("P151 command service", source.service, marker));
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
  ].forEach((marker) => assertExcludes("P151 remains command-only", source.service, marker));
  [
    "RC-PERSONAL-STAR-BEAST-REAL-USER-STORAGE-IMPLEMENTATION-AUTHORITY-COMMAND-P151",
    "P150 Real User Storage Integration Authorization Review",
    "READY_FOR_AUTHORIZATION_RESOLUTION",
    "authorizationStatus = NOT_AUTHORIZED",
    "implementationAuthorized = false",
    "futureAuthorizationResolutionRequired = true",
    "不解析 command 的授权结果",
    "不调用真实认证 SDK",
    "不创建或调用 Storage Adapter",
  ].forEach((marker) => assertIncludes("P151 protocol", source.protocol, marker));
  [
    "PersonalStarBeastIdentityRealUserStorageImplementationAuthorityCommandInput",
    "PersonalStarBeastIdentityRealUserStorageImplementationAuthorityCommandResult",
    "PersonalStarBeastIdentityRealUserStorageImplementationAuthorityCommandReference",
    "from \"./personalStarBeastIdentityRealUserStorageImplementationAuthorityCommand\"",
  ].forEach((marker) => assertIncludes("P151 type index export", source.typeIndex, marker));
  assertIncludes("P151 gate registered", packageJson.scripts?.["check:personal-star-beast-real-user-storage-implementation-authority-command"] ?? "", "node scripts/check-personal-star-beast-real-user-storage-implementation-authority-command.mjs");
  assertIncludes("P151 release gate registered", packageJson.scripts?.["postcheck:release"] ?? "", "npm run check:personal-star-beast-real-user-storage-implementation-authority-command");

  const modulePath = path.join(os.tmpdir(), `guanyao-p151-real-user-storage-authority-command-${process.pid}.mjs`);
  await build({
    stdin: {
      contents: `export { createPersonalStarBeastIdentityRealUserStorageImplementationAuthorityCommand } from "./src/services/personalStarBeastIdentityRealUserStorageImplementationAuthorityCommand.ts";`,
      resolveDir: rootDir,
      sourcefile: "p151-real-user-storage-authority-command-gate-entry.ts",
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
  const reviewReference = Object.freeze({
    referenceType: "PERSONAL_STAR_BEAST_IDENTITY_REAL_USER_STORAGE_INTEGRATION_AUTHORIZATION_REVIEW",
    referenceId: "p150-authorization-review-fixture",
    reviewVersion: "V1",
    reviewOnly: true,
    authorizationStatus: "AWAITING_EXPLICIT_IMPLEMENTATION_AUTHORITY",
    authorizationGranted: false,
    implementationAuthorized: false,
    realAuthentication: "NOT_AUTHORIZED",
    storageAdapter: "NOT_AUTHORIZED",
    productIntegration: "NOT_AUTHORIZED",
    explicitAuthorityRequired: true,
    futureExplicitAuthorityCommandRequired: true,
    noAutomaticAuthorization: true,
    noUIIntegration: true,
    noEngineInvocation: true,
    noRendererInvocation: true,
    noLifeStateMutation: true,
  });
  const readyP150 = Object.freeze({
    status: "READY",
    reviewStatus: "READY_FOR_EXPLICIT_REAL_USER_STORAGE_ADAPTER_IMPLEMENTATION_AUTHORITY",
    source: "personal_star_beast_identity_real_user_storage_integration_authorization_review",
    input: Object.freeze({ planReviewResult: null }),
    reviewReference,
    boundary: Object.freeze({
      reviewOnly: true,
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
  const command = Object.freeze({
    commandType: "EXPLICIT_REAL_USER_STORAGE_ADAPTER_IMPLEMENTATION_AUTHORITY_COMMAND",
    commandId: "p151-authority-command",
    subjectDecision: "AUTHORIZE_REAL_USER_STORAGE_ADAPTER_IMPLEMENTATION",
    authorityReference: "opaque-authority:p151-fixture",
    identityReferenceAccepted: true,
    implementationScope: "REAL_AUTHENTICATION_AND_STORAGE_ADAPTER_IMPLEMENTATION_ONLY",
  });
  const ready = runtime.createPersonalStarBeastIdentityRealUserStorageImplementationAuthorityCommand(Object.freeze({ authorizationReviewResult: readyP150, command }));
  assertEqual("P151 valid review and command are ready", ready.status, "READY");
  if (ready.status === "READY") {
    assertEqual("P151 command status is exact", ready.commandStatus, "READY_FOR_AUTHORIZATION_RESOLUTION");
    assertEqual("P151 subject intent is declared", ready.commandReference.subjectIntent, "DECLARED");
    assertEqual("P151 authorization remains pending", ready.commandReference.authorizationStatus, "NOT_AUTHORIZED");
    assertEqual("P151 implementation remains unauthorized", ready.commandReference.implementationAuthorized, false);
    assertEqual("P151 future resolution required", ready.commandReference.futureAuthorizationResolutionRequired, true);
  }
  const missingReview = runtime.createPersonalStarBeastIdentityRealUserStorageImplementationAuthorityCommand(Object.freeze({ authorizationReviewResult: null, command }));
  assertEqual("missing P150 review is unavailable", missingReview.status, "UNAVAILABLE");
  assertEqual("missing P150 review reason", missingReview.reason, "AUTHORIZATION_REVIEW_REQUIRED");
  const missingCommand = runtime.createPersonalStarBeastIdentityRealUserStorageImplementationAuthorityCommand(Object.freeze({ authorizationReviewResult: readyP150, command: null }));
  assertEqual("missing authority command is unavailable", missingCommand.status, "UNAVAILABLE");
  assertEqual("missing authority command reason", missingCommand.reason, "EXPLICIT_AUTHORITY_COMMAND_REQUIRED");
  const unavailableReview = runtime.createPersonalStarBeastIdentityRealUserStorageImplementationAuthorityCommand(Object.freeze({ authorizationReviewResult: Object.freeze({ status: "UNAVAILABLE" }), command }));
  assertEqual("unavailable P150 review stays unavailable", unavailableReview.status, "UNAVAILABLE");
  assertEqual("unavailable P150 review reason", unavailableReview.reason, "AUTHORIZATION_REVIEW_UNAVAILABLE");
  const blockedReview = runtime.createPersonalStarBeastIdentityRealUserStorageImplementationAuthorityCommand(Object.freeze({ authorizationReviewResult: Object.freeze({ status: "BLOCKED" }), command }));
  assertEqual("blocked P150 review stays blocked", blockedReview.status, "BLOCKED");
  assertEqual("blocked P150 review reason", blockedReview.reason, "AUTHORIZATION_REVIEW_BLOCKED");
  const invalidBoundary = runtime.createPersonalStarBeastIdentityRealUserStorageImplementationAuthorityCommand(Object.freeze({
    authorizationReviewResult: Object.freeze({
      ...readyP150,
      boundary: Object.freeze({ ...readyP150.boundary, storageWritePerformed: true }),
    }),
    command,
  }));
  assertEqual("invalid P150 boundary is blocked", invalidBoundary.status, "BLOCKED");
  assertEqual("invalid P150 boundary reason", invalidBoundary.reason, "REVIEW_BOUNDARY_INVALID");
  const invalidCommand = runtime.createPersonalStarBeastIdentityRealUserStorageImplementationAuthorityCommand(Object.freeze({
    authorizationReviewResult: readyP150,
    command: Object.freeze({ ...command, subjectDecision: "DECLARE_EXPLICIT_USER_BINDING_INTENT" }),
  }));
  assertEqual("invalid command decision is blocked", invalidCommand.status, "BLOCKED");
  assertEqual("invalid command decision reason", invalidCommand.reason, "COMMAND_DECISION_INVALID");
}

if (failures.length > 0) {
  console.error("\nPersonal Star Beast Real User Storage Implementation Authority Command gate failed:");
  failures.forEach((failure) => console.error(`- ${failure}`));
  process.exit(1);
}
console.log("\nPersonal Star Beast Real User Storage Implementation Authority Command gate passed.");
