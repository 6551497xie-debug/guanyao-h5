import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import process from "node:process";
import { build } from "esbuild";

const rootDir = process.cwd();
const files = Object.freeze({
  type: "src/types/personalStarBeastIdentityRealUserStorageIntegrationAuthorizationReview.ts",
  service: "src/services/personalStarBeastIdentityRealUserStorageIntegrationAuthorizationReview.ts",
  planType: "src/types/personalStarBeastIdentityRealUserStorageIntegrationPlanReview.ts",
  planService: "src/services/personalStarBeastIdentityRealUserStorageIntegrationPlanReview.ts",
  protocol: "docs/GUANYAO_PERSONAL_STAR_BEAST_REAL_USER_STORAGE_INTEGRATION_AUTHORIZATION_REVIEW_PROTOCOL.md",
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
    "PersonalStarBeastIdentityRealUserStorageIntegrationAuthorizationReviewInput",
    "PersonalStarBeastIdentityRealUserStorageIntegrationAuthorizationReviewResult",
    "READY_FOR_EXPLICIT_REAL_USER_STORAGE_ADAPTER_IMPLEMENTATION_AUTHORITY",
    "AWAITING_EXPLICIT_IMPLEMENTATION_AUTHORITY",
    "authorizationGranted: false",
    "implementationAuthorized: false",
    "futureExplicitAuthorityCommandRequired: true",
  ].forEach((marker) => assertIncludes("P150 authorization review type", source.type, marker));
  [
    "export function reviewPersonalStarBeastIdentityRealUserStorageIntegrationAuthorization",
    "INTEGRATION_PLAN_REVIEW_REQUIRED",
    "INTEGRATION_PLAN_REVIEW_UNAVAILABLE",
    "INTEGRATION_PLAN_REVIEW_BLOCKED",
    "INTEGRATION_PLAN_REVIEW_BOUNDARY_INVALID",
    "INTEGRATION_PLAN_REVIEW_REFERENCE_INVALID",
    "authorizationGranted: false",
    "implementationAuthorized: false",
    "noAutomaticAuthorization: true",
  ].forEach((marker) => assertIncludes("P150 authorization review service", source.service, marker));
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
  ].forEach((marker) => assertExcludes("P150 remains authorization-review-only", source.service, marker));
  [
    "RC-PERSONAL-STAR-BEAST-REAL-USER-STORAGE-INTEGRATION-AUTHORIZATION-REVIEW-P150",
    "P149 Real User Storage Integration Plan Review",
    "READY_FOR_EXPLICIT_REAL_USER_STORAGE_ADAPTER_IMPLEMENTATION_AUTHORITY",
    "authorizationStatus = AWAITING_EXPLICIT_IMPLEMENTATION_AUTHORITY",
    "authorizationGranted = false",
    "implementationAuthorized = false",
    "不自动授予实现权",
    "不调用真实认证 SDK",
    "不创建 Storage Adapter",
  ].forEach((marker) => assertIncludes("P150 protocol", source.protocol, marker));
  [
    "PersonalStarBeastIdentityRealUserStorageIntegrationAuthorizationReviewInput",
    "PersonalStarBeastIdentityRealUserStorageIntegrationAuthorizationReviewResult",
    "PersonalStarBeastIdentityRealUserStorageIntegrationAuthorizationReviewReference",
    "from \"./personalStarBeastIdentityRealUserStorageIntegrationAuthorizationReview\"",
  ].forEach((marker) => assertIncludes("P150 type index export", source.typeIndex, marker));
  assertIncludes("P150 gate registered", packageJson.scripts?.["check:personal-star-beast-real-user-storage-integration-authorization-review"] ?? "", "node scripts/check-personal-star-beast-real-user-storage-integration-authorization-review.mjs");
  assertIncludes("P150 release gate registered", packageJson.scripts?.["postcheck:release"] ?? "", "npm run check:personal-star-beast-real-user-storage-integration-authorization-review");

  const modulePath = path.join(os.tmpdir(), `guanyao-p150-real-user-storage-authorization-review-${process.pid}.mjs`);
  await build({
    stdin: {
      contents: `export { reviewPersonalStarBeastIdentityRealUserStorageIntegrationAuthorization } from "./src/services/personalStarBeastIdentityRealUserStorageIntegrationAuthorizationReview.ts";`,
      resolveDir: rootDir,
      sourcefile: "p150-real-user-storage-authorization-review-gate-entry.ts",
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
  const planReference = Object.freeze({
    referenceType: "PERSONAL_STAR_BEAST_IDENTITY_REAL_USER_STORAGE_INTEGRATION_PLAN_REVIEW",
    referenceId: "p149-plan-fixture",
    reviewVersion: "V1",
    planOnly: true,
    reviewOnly: true,
    integrationAuthorized: false,
    realAuthentication: "DEFERRED",
    storageAdapter: "DESIGN_ONLY",
    productConsumption: "DEFERRED",
    implementationAuthorized: false,
    futureImplementationReviewRequired: true,
    noAutomaticIntegration: true,
    noUIIntegration: true,
    noEngineInvocation: true,
    noRendererInvocation: true,
    noLifeStateMutation: true,
    authenticationSubjectContract: Object.freeze({
      opaqueSubjectOnly: true,
      rawIdentityPayloadAccepted: false,
    }),
    storageAdapterContract: Object.freeze({
      writeAuthority: "FUTURE_AUTHORIZED_ADAPTER_ONLY",
      identityRecomputationForbidden: true,
      lifeStateMutationForbidden: true,
    }),
    productConsumerContract: Object.freeze({
      automaticBindingForbidden: true,
      uiIntegrationDeferred: true,
      rendererAccessForbidden: true,
      engineInvocationForbidden: true,
      lifeStateMutationForbidden: true,
    }),
  });
  const readyP149 = Object.freeze({
    status: "READY",
    reviewStatus: "READY_FOR_REAL_USER_STORAGE_ADAPTER_INTEGRATION_PLAN",
    source: "personal_star_beast_identity_real_user_storage_integration_plan_review",
    input: Object.freeze({ persistenceIntegrationReviewResult: null }),
    reviewReference: planReference,
    boundary: Object.freeze({
      planOnly: true,
      reviewOnly: true,
      implementationAuthorized: false,
      realAuthenticationPerformed: false,
      storageWritePerformed: false,
      storageReadPerformed: false,
      productIntegrationPerformed: false,
      noUIIntegration: true,
      noEngineInvocation: true,
      noRendererInvocation: true,
      noLifeStateMutation: true,
    }),
  });
  const ready = runtime.reviewPersonalStarBeastIdentityRealUserStorageIntegrationAuthorization(Object.freeze({ planReviewResult: readyP149 }));
  assertEqual("P150 valid P149 plan is ready", ready.status, "READY");
  if (ready.status === "READY") {
    assertEqual("P150 review status is exact", ready.reviewStatus, "READY_FOR_EXPLICIT_REAL_USER_STORAGE_ADAPTER_IMPLEMENTATION_AUTHORITY");
    assertEqual("P150 authorization remains pending", ready.reviewReference.authorizationStatus, "AWAITING_EXPLICIT_IMPLEMENTATION_AUTHORITY");
    assertEqual("P150 authorization remains ungranted", ready.reviewReference.authorizationGranted, false);
    assertEqual("P150 implementation remains unauthorized", ready.reviewReference.implementationAuthorized, false);
    assertEqual("P150 explicit authority is required", ready.reviewReference.explicitAuthorityRequired, true);
  }
  const missing = runtime.reviewPersonalStarBeastIdentityRealUserStorageIntegrationAuthorization(Object.freeze({ planReviewResult: null }));
  assertEqual("missing P149 plan is unavailable", missing.status, "UNAVAILABLE");
  assertEqual("missing P149 plan reason", missing.reason, "INTEGRATION_PLAN_REVIEW_REQUIRED");
  const unavailable = runtime.reviewPersonalStarBeastIdentityRealUserStorageIntegrationAuthorization(Object.freeze({ planReviewResult: Object.freeze({ status: "UNAVAILABLE" }) }));
  assertEqual("unavailable P149 plan stays unavailable", unavailable.status, "UNAVAILABLE");
  assertEqual("unavailable P149 plan reason", unavailable.reason, "INTEGRATION_PLAN_REVIEW_UNAVAILABLE");
  const blocked = runtime.reviewPersonalStarBeastIdentityRealUserStorageIntegrationAuthorization(Object.freeze({ planReviewResult: Object.freeze({ status: "BLOCKED" }) }));
  assertEqual("blocked P149 plan stays blocked", blocked.status, "BLOCKED");
  assertEqual("blocked P149 plan reason", blocked.reason, "INTEGRATION_PLAN_REVIEW_BLOCKED");
  const invalidBoundary = runtime.reviewPersonalStarBeastIdentityRealUserStorageIntegrationAuthorization(Object.freeze({
    planReviewResult: Object.freeze({
      ...readyP149,
      boundary: Object.freeze({ ...readyP149.boundary, storageWritePerformed: true }),
    }),
  }));
  assertEqual("invalid P149 boundary is blocked", invalidBoundary.status, "BLOCKED");
  assertEqual("invalid P149 boundary reason", invalidBoundary.reason, "INTEGRATION_PLAN_REVIEW_BOUNDARY_INVALID");
  const invalidReference = runtime.reviewPersonalStarBeastIdentityRealUserStorageIntegrationAuthorization(Object.freeze({
    planReviewResult: Object.freeze({
      ...readyP149,
      reviewReference: Object.freeze({ ...planReference, implementationAuthorized: true }),
    }),
  }));
  assertEqual("invalid P149 reference is blocked", invalidReference.status, "BLOCKED");
  assertEqual("invalid P149 reference reason", invalidReference.reason, "INTEGRATION_PLAN_REVIEW_REFERENCE_INVALID");
}

if (failures.length > 0) {
  console.error("\nPersonal Star Beast Real User Storage Integration Authorization Review gate failed:");
  failures.forEach((failure) => console.error(`- ${failure}`));
  process.exit(1);
}
console.log("\nPersonal Star Beast Real User Storage Integration Authorization Review gate passed.");
