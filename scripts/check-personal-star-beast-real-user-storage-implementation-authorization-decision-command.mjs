import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import process from "node:process";
import { build } from "esbuild";

const rootDir = process.cwd();
const files = Object.freeze({
  type: "src/types/personalStarBeastIdentityRealUserStorageImplementationAuthorizationDecisionCommand.ts",
  service: "src/services/personalStarBeastIdentityRealUserStorageImplementationAuthorizationDecisionCommand.ts",
  resolutionType: "src/types/personalStarBeastIdentityRealUserStorageImplementationAuthorityResolution.ts",
  resolutionService: "src/services/personalStarBeastIdentityRealUserStorageImplementationAuthorityResolution.ts",
  protocol: "docs/GUANYAO_PERSONAL_STAR_BEAST_REAL_USER_STORAGE_IMPLEMENTATION_AUTHORIZATION_DECISION_COMMAND_PROTOCOL.md",
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
    "PersonalStarBeastIdentityRealUserStorageImplementationAuthorizationDecisionCommandInput",
    "PersonalStarBeastIdentityRealUserStorageImplementationAuthorizationDecisionCommandResult",
    "EXPLICIT_REAL_USER_STORAGE_IMPLEMENTATION_AUTHORIZATION_DECISION",
    "allowedDecisions: readonly [\"GRANT\", \"DECLINE\"]",
    "authorizationDecisionResolved: false",
    "implementationAuthorized: false",
    "futureDecisionResolutionRequired: true",
  ].forEach((marker) => assertIncludes("P153 decision command type", source.type, marker));
  [
    "export function createPersonalStarBeastIdentityRealUserStorageImplementationAuthorizationDecisionCommand",
    "AUTHORITY_RESOLUTION_REQUIRED",
    "AUTHORITY_RESOLUTION_UNAVAILABLE",
    "AUTHORITY_RESOLUTION_BLOCKED",
    "AUTHORITY_RESOLUTION_BOUNDARY_INVALID",
    "AUTHORITY_RESOLUTION_REFERENCE_INVALID",
    "DECISION_COMMAND_TYPE_INVALID",
    "DECISION_VALUE_INVALID",
    "DECISION_SCOPE_INVALID",
    "DECISION_REFERENCE_INVALID",
    "authorizationDecisionResolved: false",
  ].forEach((marker) => assertIncludes("P153 decision command service", source.service, marker));
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
  ].forEach((marker) => assertExcludes("P153 remains decision-command-only", source.service, marker));
  [
    "RC-PERSONAL-STAR-BEAST-REAL-USER-STORAGE-IMPLEMENTATION-AUTHORIZATION-DECISION-COMMAND-P153",
    "P152 Implementation Authority Resolution",
    "READY_FOR_AUTHORIZATION_DECISION_RESOLUTION",
    "subjectDecision = GRANT | DECLINE",
    "authorizationDecisionResolved = false",
    "implementationAuthorized = false",
    "futureDecisionResolutionRequired = true",
    "不解析 `GRANT / DECLINE` 的最终结果",
    "不调用真实认证 SDK",
    "不创建或调用 Storage Adapter",
  ].forEach((marker) => assertIncludes("P153 protocol", source.protocol, marker));
  [
    "PersonalStarBeastIdentityRealUserStorageImplementationAuthorizationDecisionCommandInput",
    "PersonalStarBeastIdentityRealUserStorageImplementationAuthorizationDecisionCommandResult",
    "PersonalStarBeastIdentityRealUserStorageImplementationAuthorizationDecisionCommandReference",
    "from \"./personalStarBeastIdentityRealUserStorageImplementationAuthorizationDecisionCommand\"",
  ].forEach((marker) => assertIncludes("P153 type index export", source.typeIndex, marker));
  assertIncludes("P153 gate registered", packageJson.scripts?.["check:personal-star-beast-real-user-storage-implementation-authorization-decision-command"] ?? "", "node scripts/check-personal-star-beast-real-user-storage-implementation-authorization-decision-command.mjs");
  assertIncludes("P153 release gate registered", packageJson.scripts?.["postcheck:release"] ?? "", "npm run check:personal-star-beast-real-user-storage-implementation-authorization-decision-command");

  const modulePath = path.join(os.tmpdir(), `guanyao-p153-real-user-storage-decision-command-${process.pid}.mjs`);
  await build({
    stdin: {
      contents: `export { createPersonalStarBeastIdentityRealUserStorageImplementationAuthorizationDecisionCommand } from "./src/services/personalStarBeastIdentityRealUserStorageImplementationAuthorizationDecisionCommand.ts";`,
      resolveDir: rootDir,
      sourcefile: "p153-real-user-storage-decision-command-gate-entry.ts",
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
  const resolutionReference = Object.freeze({
    referenceType: "PERSONAL_STAR_BEAST_IDENTITY_REAL_USER_STORAGE_IMPLEMENTATION_AUTHORITY_RESOLUTION",
    referenceId: "p152-resolution-reference-fixture",
    resolutionVersion: "V1",
    commandReference: Object.freeze({
      referenceType: "PERSONAL_STAR_BEAST_IDENTITY_REAL_USER_STORAGE_IMPLEMENTATION_AUTHORITY_COMMAND_REFERENCE",
      referenceId: "p151-command-reference-fixture",
      command: Object.freeze({
        commandType: "EXPLICIT_REAL_USER_STORAGE_ADAPTER_IMPLEMENTATION_AUTHORITY_COMMAND",
        commandId: "p151-command-fixture",
        subjectDecision: "AUTHORIZE_REAL_USER_STORAGE_ADAPTER_IMPLEMENTATION",
        authorityReference: "opaque-authority:p153-fixture",
        identityReferenceAccepted: true,
        implementationScope: "REAL_AUTHENTICATION_AND_STORAGE_ADAPTER_IMPLEMENTATION_ONLY",
      }),
    }),
    resolutionStatus: "PENDING_EXPLICIT_REAL_USER_STORAGE_IMPLEMENTATION_AUTHORIZATION",
    authorizationStatus: "NOT_AUTHORIZED",
    implementationAuthorized: false,
    realAuthentication: "NOT_AUTHORIZED",
    storageAdapter: "NOT_AUTHORIZED",
    productIntegration: "NOT_AUTHORIZED",
    futureAuthorizationDecisionRequired: true,
    resolutionOnly: true,
    referenceOnly: true,
    noAutomaticAuthorization: true,
    noUIIntegration: true,
    noEngineInvocation: true,
    noRendererInvocation: true,
    noLifeStateMutation: true,
  });
  const readyP152 = Object.freeze({
    status: "READY",
    resolutionStatus: "READY_FOR_EXPLICIT_REAL_USER_STORAGE_IMPLEMENTATION_AUTHORIZATION_DECISION",
    source: "personal_star_beast_identity_real_user_storage_implementation_authority_resolution",
    input: Object.freeze({ commandResult: null }),
    resolutionReference,
    boundary: Object.freeze({
      resolutionOnly: true,
      referenceOnly: true,
      authorizationDecisionPending: true,
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
  const makeCommand = (subjectDecision) => Object.freeze({
    commandType: "EXPLICIT_REAL_USER_STORAGE_IMPLEMENTATION_AUTHORIZATION_DECISION",
    commandId: `p153-${subjectDecision.toLowerCase()}-decision-command`,
    subjectDecision,
    decisionReference: `opaque-decision:p153-${subjectDecision.toLowerCase()}`,
    identityReferenceAccepted: true,
    decisionScope: "REAL_USER_STORAGE_IMPLEMENTATION_ONLY",
  });
  const grant = runtime.createPersonalStarBeastIdentityRealUserStorageImplementationAuthorizationDecisionCommand(Object.freeze({ resolutionResult: readyP152, command: makeCommand("GRANT") }));
  assertEqual("P153 GRANT command is ready", grant.status, "READY");
  if (grant.status === "READY") {
    assertEqual("P153 GRANT command status is exact", grant.commandStatus, "READY_FOR_AUTHORIZATION_DECISION_RESOLUTION");
    assertEqual("P153 GRANT remains unresolved", grant.commandReference.authorizationDecisionResolved, false);
    assertEqual("P153 GRANT remains unauthorized", grant.commandReference.authorizationStatus, "NOT_AUTHORIZED");
    assertEqual("P153 GRANT implementation remains unauthorized", grant.commandReference.implementationAuthorized, false);
  }
  const decline = runtime.createPersonalStarBeastIdentityRealUserStorageImplementationAuthorizationDecisionCommand(Object.freeze({ resolutionResult: readyP152, command: makeCommand("DECLINE") }));
  assertEqual("P153 DECLINE command is ready", decline.status, "READY");
  if (decline.status === "READY") assertEqual("P153 DECLINE preserved", decline.commandReference.subjectDecision, "DECLINE");
  const missingResolution = runtime.createPersonalStarBeastIdentityRealUserStorageImplementationAuthorizationDecisionCommand(Object.freeze({ resolutionResult: null, command: makeCommand("GRANT") }));
  assertEqual("missing P152 resolution is unavailable", missingResolution.status, "UNAVAILABLE");
  assertEqual("missing P152 resolution reason", missingResolution.reason, "AUTHORITY_RESOLUTION_REQUIRED");
  const missingCommand = runtime.createPersonalStarBeastIdentityRealUserStorageImplementationAuthorizationDecisionCommand(Object.freeze({ resolutionResult: readyP152, command: null }));
  assertEqual("missing decision command is unavailable", missingCommand.status, "UNAVAILABLE");
  assertEqual("missing decision command reason", missingCommand.reason, "EXPLICIT_DECISION_COMMAND_REQUIRED");
  const unavailableResolution = runtime.createPersonalStarBeastIdentityRealUserStorageImplementationAuthorizationDecisionCommand(Object.freeze({ resolutionResult: Object.freeze({ status: "UNAVAILABLE" }), command: makeCommand("GRANT") }));
  assertEqual("unavailable P152 resolution stays unavailable", unavailableResolution.status, "UNAVAILABLE");
  assertEqual("unavailable P152 resolution reason", unavailableResolution.reason, "AUTHORITY_RESOLUTION_UNAVAILABLE");
  const blockedResolution = runtime.createPersonalStarBeastIdentityRealUserStorageImplementationAuthorizationDecisionCommand(Object.freeze({ resolutionResult: Object.freeze({ status: "BLOCKED" }), command: makeCommand("GRANT") }));
  assertEqual("blocked P152 resolution stays blocked", blockedResolution.status, "BLOCKED");
  assertEqual("blocked P152 resolution reason", blockedResolution.reason, "AUTHORITY_RESOLUTION_BLOCKED");
  const invalidBoundary = runtime.createPersonalStarBeastIdentityRealUserStorageImplementationAuthorizationDecisionCommand(Object.freeze({
    resolutionResult: Object.freeze({ ...readyP152, boundary: Object.freeze({ ...readyP152.boundary, storageWritePerformed: true }) }),
    command: makeCommand("GRANT"),
  }));
  assertEqual("invalid P152 boundary is blocked", invalidBoundary.status, "BLOCKED");
  assertEqual("invalid P152 boundary reason", invalidBoundary.reason, "AUTHORITY_RESOLUTION_BOUNDARY_INVALID");
  const invalidDecision = runtime.createPersonalStarBeastIdentityRealUserStorageImplementationAuthorizationDecisionCommand(Object.freeze({ resolutionResult: readyP152, command: Object.freeze({ ...makeCommand("GRANT"), subjectDecision: "AUTHORIZE" }) }));
  assertEqual("invalid decision value is blocked", invalidDecision.status, "BLOCKED");
  assertEqual("invalid decision value reason", invalidDecision.reason, "DECISION_VALUE_INVALID");
}

if (failures.length > 0) {
  console.error("\nPersonal Star Beast Real User Storage Implementation Authorization Decision Command gate failed:");
  failures.forEach((failure) => console.error(`- ${failure}`));
  process.exit(1);
}
console.log("\nPersonal Star Beast Real User Storage Implementation Authorization Decision Command gate passed.");
