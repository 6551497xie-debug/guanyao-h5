import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import process from "node:process";
import { build } from "esbuild";

const rootDir = process.cwd();
const files = Object.freeze({
  type: "src/types/personalStarBeastIdentityRealUserStorageImplementationAuthorizationDecisionResolution.ts",
  service: "src/services/personalStarBeastIdentityRealUserStorageImplementationAuthorizationDecisionResolution.ts",
  commandType: "src/types/personalStarBeastIdentityRealUserStorageImplementationAuthorizationDecisionCommand.ts",
  commandService: "src/services/personalStarBeastIdentityRealUserStorageImplementationAuthorizationDecisionCommand.ts",
  protocol: "docs/GUANYAO_PERSONAL_STAR_BEAST_REAL_USER_STORAGE_IMPLEMENTATION_AUTHORIZATION_DECISION_RESOLUTION_PROTOCOL.md",
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
    "PersonalStarBeastIdentityRealUserStorageImplementationAuthorizationDecisionResolutionInput",
    "PersonalStarBeastIdentityRealUserStorageImplementationAuthorizationDecisionResolutionResult",
    "GRANTED",
    "DECLINED",
    "AUTHORIZED_FOR_FUTURE_IMPLEMENTATION",
    "authorizationDecisionResolved: true",
    "futureImplementationConsumptionRequired: true",
  ].forEach((marker) => assertIncludes("P154 decision resolution type", source.type, marker));
  [
    "export function resolvePersonalStarBeastIdentityRealUserStorageImplementationAuthorizationDecision",
    "DECISION_COMMAND_RESULT_REQUIRED",
    "DECISION_COMMAND_RESULT_UNAVAILABLE",
    "DECISION_COMMAND_RESULT_BLOCKED",
    "DECISION_COMMAND_BOUNDARY_INVALID",
    "DECISION_COMMAND_REFERENCE_INVALID",
    "DECISION_COMMAND_TYPE_INVALID",
    "DECISION_SCOPE_INVALID",
    "authorizationDecisionResolved: true",
    "realAuthenticationPerformed: false",
    "storageWritePerformed: false",
  ].forEach((marker) => assertIncludes("P154 decision resolution service", source.service, marker));
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
  ].forEach((marker) => assertExcludes("P154 remains decision-resolution-only", source.service, marker));
  [
    "RC-PERSONAL-STAR-BEAST-REAL-USER-STORAGE-IMPLEMENTATION-AUTHORIZATION-DECISION-RESOLUTION-P154",
    "P153 Explicit Implementation Authorization Decision Command",
    "GRANT",
    "DECLINE",
    "AUTHORIZED",
    "NOT_AUTHORIZED",
    "authorizationDecisionResolved = true",
    "futureImplementationConsumptionRequired = true",
    "不执行真实认证",
    "不写 Storage",
  ].forEach((marker) => assertIncludes("P154 protocol", source.protocol, marker));
  [
    "PersonalStarBeastIdentityRealUserStorageImplementationAuthorizationDecisionResolutionInput",
    "PersonalStarBeastIdentityRealUserStorageImplementationAuthorizationDecisionResolutionResult",
    "PersonalStarBeastIdentityRealUserStorageImplementationAuthorizationDecisionResolutionReference",
    "from \"./personalStarBeastIdentityRealUserStorageImplementationAuthorizationDecisionResolution\"",
  ].forEach((marker) => assertIncludes("P154 type index export", source.typeIndex, marker));
  assertIncludes("P154 gate registered", packageJson.scripts?.["check:personal-star-beast-real-user-storage-implementation-authorization-decision-resolution"] ?? "", "node scripts/check-personal-star-beast-real-user-storage-implementation-authorization-decision-resolution.mjs");
  assertIncludes("P154 release gate registered", packageJson.scripts?.["postcheck:release"] ?? "", "npm run check:personal-star-beast-real-user-storage-implementation-authorization-decision-resolution");

  const modulePath = path.join(os.tmpdir(), `guanyao-p154-real-user-storage-decision-resolution-${process.pid}.mjs`);
  await build({
    stdin: {
      contents: `export { resolvePersonalStarBeastIdentityRealUserStorageImplementationAuthorizationDecision } from "./src/services/personalStarBeastIdentityRealUserStorageImplementationAuthorizationDecisionResolution.ts";`,
      resolveDir: rootDir,
      sourcefile: "p154-real-user-storage-decision-resolution-gate-entry.ts",
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
  const makeCommandResult = (subjectDecision) => Object.freeze({
    status: "READY",
    commandStatus: "READY_FOR_AUTHORIZATION_DECISION_RESOLUTION",
    source: "personal_star_beast_identity_real_user_storage_implementation_authorization_decision_command",
    input: Object.freeze({ resolutionResult: null, command: null }),
    commandReference: Object.freeze({
      referenceType: "PERSONAL_STAR_BEAST_IDENTITY_REAL_USER_STORAGE_IMPLEMENTATION_AUTHORIZATION_DECISION_COMMAND_REFERENCE",
      referenceId: `p153-${subjectDecision.toLowerCase()}-command-reference`,
      commandVersion: "V1",
      command: Object.freeze({
        commandType: "EXPLICIT_REAL_USER_STORAGE_IMPLEMENTATION_AUTHORIZATION_DECISION",
        commandId: `p153-${subjectDecision.toLowerCase()}-command`,
        subjectDecision,
        decisionReference: `opaque-decision:p154-${subjectDecision.toLowerCase()}`,
        identityReferenceAccepted: true,
        decisionScope: "REAL_USER_STORAGE_IMPLEMENTATION_ONLY",
      }),
      decisionCommandContractOnly: true,
      referenceOnly: true,
      decisionCommandAccepted: true,
      subjectDecision,
      authorizationDecisionResolved: false,
      authorizationStatus: "NOT_AUTHORIZED",
      implementationAuthorized: false,
      realAuthentication: "NOT_AUTHORIZED",
      storageAdapter: "NOT_AUTHORIZED",
      productIntegration: "NOT_AUTHORIZED",
      futureDecisionResolutionRequired: true,
      noDefaultDecision: true,
      noAutomaticAuthorization: true,
      noUIIntegration: true,
      noEngineInvocation: true,
      noRendererInvocation: true,
      noLifeStateMutation: true,
    }),
    boundary: Object.freeze({
      decisionCommandContractOnly: true,
      referenceOnly: true,
      decisionCommandAccepted: true,
      authorizationDecisionResolved: false,
      authorizationGranted: false,
      implementationAuthorized: false,
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
  const grant = runtime.resolvePersonalStarBeastIdentityRealUserStorageImplementationAuthorizationDecision(Object.freeze({ decisionCommandResult: makeCommandResult("GRANT") }));
  assertEqual("P154 GRANT resolution is ready", grant.status, "READY");
  if (grant.status === "READY") {
    assertEqual("P154 GRANT status is exact", grant.resolutionStatus, "READY_FOR_REAL_USER_STORAGE_IMPLEMENTATION_AUTHORIZATION_CONSUMPTION");
    assertEqual("P154 GRANT outcome", grant.resolutionReference.decisionOutcome, "GRANTED");
    assertEqual("P154 GRANT authorization", grant.resolutionReference.authorizationStatus, "AUTHORIZED");
    assertEqual("P154 GRANT implementation authorization", grant.resolutionReference.implementationAuthorized, true);
    assertEqual("P154 GRANT authentication deferred to future implementation", grant.resolutionReference.realAuthentication, "AUTHORIZED_FOR_FUTURE_IMPLEMENTATION");
    assertEqual("P154 GRANT no authentication performed", grant.boundary.realAuthenticationPerformed, false);
  }
  const decline = runtime.resolvePersonalStarBeastIdentityRealUserStorageImplementationAuthorizationDecision(Object.freeze({ decisionCommandResult: makeCommandResult("DECLINE") }));
  assertEqual("P154 DECLINE resolution is ready", decline.status, "READY");
  if (decline.status === "READY") {
    assertEqual("P154 DECLINE outcome", decline.resolutionReference.decisionOutcome, "DECLINED");
    assertEqual("P154 DECLINE authorization", decline.resolutionReference.authorizationStatus, "NOT_AUTHORIZED");
    assertEqual("P154 DECLINE implementation authorization", decline.resolutionReference.implementationAuthorized, false);
  }
  const missing = runtime.resolvePersonalStarBeastIdentityRealUserStorageImplementationAuthorizationDecision(Object.freeze({ decisionCommandResult: null }));
  assertEqual("missing P153 command is unavailable", missing.status, "UNAVAILABLE");
  assertEqual("missing P153 command reason", missing.reason, "DECISION_COMMAND_RESULT_REQUIRED");
  const unavailable = runtime.resolvePersonalStarBeastIdentityRealUserStorageImplementationAuthorizationDecision(Object.freeze({ decisionCommandResult: Object.freeze({ status: "UNAVAILABLE" }) }));
  assertEqual("unavailable P153 command stays unavailable", unavailable.status, "UNAVAILABLE");
  assertEqual("unavailable P153 command reason", unavailable.reason, "DECISION_COMMAND_RESULT_UNAVAILABLE");
  const blocked = runtime.resolvePersonalStarBeastIdentityRealUserStorageImplementationAuthorizationDecision(Object.freeze({ decisionCommandResult: Object.freeze({ status: "BLOCKED" }) }));
  assertEqual("blocked P153 command stays blocked", blocked.status, "BLOCKED");
  assertEqual("blocked P153 command reason", blocked.reason, "DECISION_COMMAND_RESULT_BLOCKED");
  const invalidBoundary = runtime.resolvePersonalStarBeastIdentityRealUserStorageImplementationAuthorizationDecision(Object.freeze({
    decisionCommandResult: Object.freeze({
      ...makeCommandResult("GRANT"),
      boundary: Object.freeze({ ...makeCommandResult("GRANT").boundary, storageWritePerformed: true }),
    }),
  }));
  assertEqual("invalid P153 boundary is blocked", invalidBoundary.status, "BLOCKED");
  assertEqual("invalid P153 boundary reason", invalidBoundary.reason, "DECISION_COMMAND_BOUNDARY_INVALID");
  const invalidScope = runtime.resolvePersonalStarBeastIdentityRealUserStorageImplementationAuthorizationDecision(Object.freeze({
    decisionCommandResult: Object.freeze({
      ...makeCommandResult("GRANT"),
      commandReference: Object.freeze({
        ...makeCommandResult("GRANT").commandReference,
        command: Object.freeze({ ...makeCommandResult("GRANT").commandReference.command, decisionScope: "PERSONAL_STAR_BEAST_IDENTITY_REFERENCE_ONLY" }),
      }),
    }),
  }));
  assertEqual("invalid P153 scope is blocked", invalidScope.status, "BLOCKED");
  assertEqual("invalid P153 scope reason", invalidScope.reason, "DECISION_SCOPE_INVALID");
}

if (failures.length > 0) {
  console.error("\nPersonal Star Beast Real User Storage Implementation Authorization Decision Resolution gate failed:");
  failures.forEach((failure) => console.error(`- ${failure}`));
  process.exit(1);
}
console.log("\nPersonal Star Beast Real User Storage Implementation Authorization Decision Resolution gate passed.");
