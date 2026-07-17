import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import process from "node:process";
import { build } from "esbuild";

const rootDir = process.cwd();
const files = Object.freeze({
  type: "src/types/personalStarBeastIdentityRealUserStorageIntegrationPlanReview.ts",
  service: "src/services/personalStarBeastIdentityRealUserStorageIntegrationPlanReview.ts",
  sourceReviewType: "src/types/personalStarBeastIdentityUserBindingPersistenceIntegrationReview.ts",
  sourceReviewService: "src/services/personalStarBeastIdentityUserBindingPersistenceIntegrationReview.ts",
  protocol: "docs/GUANYAO_PERSONAL_STAR_BEAST_REAL_USER_STORAGE_INTEGRATION_PLAN_REVIEW_PROTOCOL.md",
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
    "PersonalStarBeastIdentityRealUserStorageIntegrationPlanReviewInput",
    "PersonalStarBeastIdentityRealUserStorageIntegrationPlanReviewResult",
    "READY_FOR_REAL_USER_STORAGE_ADAPTER_INTEGRATION_PLAN",
    "REAL_USER_AUTHENTICATION_SUBJECT_REFERENCE",
    "PERSONAL_STAR_BEAST_IDENTITY_BINDING_STORAGE_ADAPTER",
    "PERSONAL_STAR_BEAST_IDENTITY_PRODUCT_CONSUMER",
    "integrationAuthorized: false",
    "storageAdapter: \"DESIGN_ONLY\"",
    "implementationAuthorized: false",
  ].forEach((marker) => assertIncludes("P149 plan review type", source.type, marker));
  [
    "export function reviewPersonalStarBeastIdentityRealUserStorageIntegrationPlan",
    "PERSISTENCE_INTEGRATION_REVIEW_REQUIRED",
    "PERSISTENCE_INTEGRATION_REVIEW_UNAVAILABLE",
    "PERSISTENCE_INTEGRATION_REVIEW_BLOCKED",
    "PERSISTENCE_INTEGRATION_REVIEW_BOUNDARY_INVALID",
    "PERSISTENCE_INTEGRATION_REVIEW_REFERENCE_INVALID",
    "integrationAuthorized: false",
    "realAuthentication: \"DEFERRED\"",
    "storageAdapter: \"DESIGN_ONLY\"",
    "productConsumption: \"DEFERRED\"",
  ].forEach((marker) => assertIncludes("P149 plan review service", source.service, marker));
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
    "createRenderer",
    "runMotherCodeLandingEngine",
    "resolveStarbeastFromBirthDate",
  ].forEach((marker) => assertExcludes("P149 remains plan-only", source.service, marker));
  [
    "RC-PERSONAL-STAR-BEAST-REAL-USER-STORAGE-INTEGRATION-PLAN-REVIEW-P149",
    "P148 User Binding Persistence Integration Review",
    "READY_FOR_REAL_USER_STORAGE_ADAPTER_INTEGRATION_PLAN",
    "integrationAuthorized = false",
    "realAuthentication = DEFERRED",
    "storageAdapter = DESIGN_ONLY",
    "不调用真实认证 SDK",
    "不读写",
  ].forEach((marker) => assertIncludes("P149 protocol", source.protocol, marker));
  [
    "PersonalStarBeastIdentityRealUserStorageIntegrationPlanReviewInput",
    "PersonalStarBeastIdentityRealUserStorageIntegrationPlanReviewResult",
    "PersonalStarBeastIdentityRealUserStorageIntegrationPlanReviewReference",
    "from \"./personalStarBeastIdentityRealUserStorageIntegrationPlanReview\"",
  ].forEach((marker) => assertIncludes("P149 type index export", source.typeIndex, marker));
  assertIncludes("P149 gate registered", packageJson.scripts?.["check:personal-star-beast-real-user-storage-integration-plan-review"] ?? "", "node scripts/check-personal-star-beast-real-user-storage-integration-plan-review.mjs");
  assertIncludes("P149 release gate registered", packageJson.scripts?.["postcheck:release"] ?? "", "npm run check:personal-star-beast-real-user-storage-integration-plan-review");

  const modulePath = path.join(os.tmpdir(), `guanyao-p149-real-user-storage-plan-review-${process.pid}.mjs`);
  await build({
    stdin: {
      contents: `export { reviewPersonalStarBeastIdentityRealUserStorageIntegrationPlan } from "./src/services/personalStarBeastIdentityRealUserStorageIntegrationPlanReview.ts";`,
      resolveDir: rootDir,
      sourcefile: "p149-real-user-storage-plan-review-gate-entry.ts",
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
  const readyReference = Object.freeze({
    referenceType: "PERSONAL_STAR_BEAST_IDENTITY_USER_BINDING_PERSISTENCE_INTEGRATION_REVIEW",
    referenceId: "p148-review-fixture",
    reviewVersion: "V1",
    integrationAuthorized: false,
    storagePersistence: "DEFERRED",
    realUserBinding: "DOMAIN_REFERENCE_BOUND",
    productIntegration: "NOT_PERFORMED",
    futureIntegrationReviewRequired: true,
    noAutomaticIntegration: true,
    noStorageWrite: true,
    noUserProfileCreation: true,
    noUIIntegration: true,
    noEngineInvocation: true,
    noRendererInvocation: true,
    noLifeStateMutation: true,
  });
  const readyP148 = Object.freeze({
    status: "READY",
    reviewStatus: "READY_FOR_REAL_USER_STORAGE_BINDING_INTEGRATION_REVIEW",
    source: "personal_star_beast_identity_user_binding_persistence_integration_review",
    input: Object.freeze({ executionResult: null }),
    reviewReference: readyReference,
    boundary: Object.freeze({
      reviewOnly: true,
      referenceOnly: true,
      integrationAuthorized: false,
      storageWritePerformed: false,
      realUserBindingPerformed: false,
      productIntegrationPerformed: false,
      noStorageWrite: true,
      noUserProfileCreation: true,
      noUIIntegration: true,
      noEngineInvocation: true,
      noRendererInvocation: true,
      noLifeStateMutation: true,
    }),
  });
  const ready = runtime.reviewPersonalStarBeastIdentityRealUserStorageIntegrationPlan(Object.freeze({ persistenceIntegrationReviewResult: readyP148 }));
  assertEqual("P149 valid P148 review is ready", ready.status, "READY");
  if (ready.status === "READY") {
    assertEqual("P149 review status is exact", ready.reviewStatus, "READY_FOR_REAL_USER_STORAGE_ADAPTER_INTEGRATION_PLAN");
    assertEqual("P149 integration remains unauthorized", ready.reviewReference.integrationAuthorized, false);
    assertEqual("P149 authentication remains deferred", ready.reviewReference.realAuthentication, "DEFERRED");
    assertEqual("P149 storage remains design-only", ready.reviewReference.storageAdapter, "DESIGN_ONLY");
    assertEqual("P149 product consumption remains deferred", ready.reviewReference.productConsumption, "DEFERRED");
    assertEqual("P149 implementation remains unauthorized", ready.reviewReference.implementationAuthorized, false);
  }
  const missing = runtime.reviewPersonalStarBeastIdentityRealUserStorageIntegrationPlan(Object.freeze({ persistenceIntegrationReviewResult: null }));
  assertEqual("missing P148 review is unavailable", missing.status, "UNAVAILABLE");
  assertEqual("missing P148 review reason", missing.reason, "PERSISTENCE_INTEGRATION_REVIEW_REQUIRED");
  const unavailable = runtime.reviewPersonalStarBeastIdentityRealUserStorageIntegrationPlan(Object.freeze({ persistenceIntegrationReviewResult: Object.freeze({ status: "UNAVAILABLE" }) }));
  assertEqual("unavailable P148 review stays unavailable", unavailable.status, "UNAVAILABLE");
  assertEqual("unavailable P148 review reason", unavailable.reason, "PERSISTENCE_INTEGRATION_REVIEW_UNAVAILABLE");
  const blocked = runtime.reviewPersonalStarBeastIdentityRealUserStorageIntegrationPlan(Object.freeze({ persistenceIntegrationReviewResult: Object.freeze({ status: "BLOCKED" }) }));
  assertEqual("blocked P148 review stays blocked", blocked.status, "BLOCKED");
  assertEqual("blocked P148 review reason", blocked.reason, "PERSISTENCE_INTEGRATION_REVIEW_BLOCKED");
  const invalidBoundary = runtime.reviewPersonalStarBeastIdentityRealUserStorageIntegrationPlan(Object.freeze({
    persistenceIntegrationReviewResult: Object.freeze({
      ...readyP148,
      boundary: Object.freeze({ ...readyP148.boundary, storageWritePerformed: true }),
    }),
  }));
  assertEqual("invalid P148 boundary is blocked", invalidBoundary.status, "BLOCKED");
  assertEqual("invalid P148 boundary reason", invalidBoundary.reason, "PERSISTENCE_INTEGRATION_REVIEW_BOUNDARY_INVALID");
  const invalidReference = runtime.reviewPersonalStarBeastIdentityRealUserStorageIntegrationPlan(Object.freeze({
    persistenceIntegrationReviewResult: Object.freeze({
      ...readyP148,
      reviewReference: Object.freeze({ ...readyReference, integrationAuthorized: true }),
    }),
  }));
  assertEqual("invalid P148 reference is blocked", invalidReference.status, "BLOCKED");
  assertEqual("invalid P148 reference reason", invalidReference.reason, "PERSISTENCE_INTEGRATION_REVIEW_REFERENCE_INVALID");
}

if (failures.length > 0) {
  console.error("\nPersonal Star Beast Real User Storage Integration Plan Review gate failed:");
  failures.forEach((failure) => console.error(`- ${failure}`));
  process.exit(1);
}
console.log("\nPersonal Star Beast Real User Storage Integration Plan Review gate passed.");
