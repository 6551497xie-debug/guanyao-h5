import { execFileSync } from "node:child_process";
import { mkdtempSync, readFileSync, readdirSync } from "node:fs";
import { tmpdir } from "node:os";
import { resolve } from "node:path";
import { build } from "esbuild";

const root = resolve(import.meta.dirname, "..");
const read = (path) => readFileSync(resolve(root, path), "utf8");
const assert = (condition, message) => {
  if (!condition) throw new Error(`[xinmai-450-gate] ${message}`);
};

execFileSync(process.execPath, ["scripts/compile-xinmai-pressure-candidate-catalog.mjs", "--check"], {
  cwd: root,
  stdio: "inherit",
});

const report = JSON.parse(read("docs/generated/xinmai-pressure-candidate/GUANYAO_PRESSURE_SEED_MATRIX_CATALOG_2026_08_10_FIVE_STAGE_450_P0.build-report.json"));
assert(report.counts.total === 450, "target coverage must be 450");
for (const stage of ["YOUTH", "ESTABLISHING", "MID_LIFE", "RESTRUCTURING", "SIXTY_PLUS"]) {
  assert(report.counts.byStage[stage] === 90, `${stage} coverage must be 90`);
}
assert(JSON.stringify(report.counts.byNature) === JSON.stringify({ EVALUATION: 31, RESOURCE: 150, ATTACHMENT: 38, CONTROL: 87, OBLIGATION: 79, BELONGING: 49, IDENTITY: 14, SURVIVAL: 2 }), "nature distribution drift");
assert(report.acceptedShellOverlapException.shell === "同一小时出现两项签到" && report.acceptedShellOverlapException.count === 2, "accepted shell overlap drift");

const registry = read("src/data/guanyaoPressureSeedCatalogRevisionRegistry.ts");
assert(registry.includes("GUANYAO_PRESSURE_SEED_MATRIX_CATALOG_2026_07_30_P0"), "legacy revision missing");
assert(registry.includes("GUANYAO_PRESSURE_SEED_TARGET_CATALOG_REVISION"), "target revision missing");
assert(registry.includes('TARGET_450_NEW_CREATION_POLICY = "ENABLED"') || registry.includes('TARGET_450_NEW_CREATION_POLICY = "SAFE_WITHHELD"'), "counter policy invalid");
assert(!registry.includes("fallback"), "revision registry must not fallback");

const source = read("src/services/realityPressureSeedCandidateSource.ts");
for (const token of ["catalogRevision", "resolveGuanyaoPressureSeedCatalogRevision", "STAGE_NOT_IN_CATALOG", "SOURCE_REVISION_MISMATCH", "TARGET_450_NEW_CREATION_POLICY"]) {
  assert(source.includes(token), `candidate source missing ${token}`);
}
assert(source.includes("input.catalogRevision"), "recovery must use persisted revision");
assert(!source.includes('"GUANYAO_PRESSURE_SEED_MATRIX_CATALOG_2026_07_30_P0" as const'), "candidate source must not pin active requests to legacy");

const failureType = read("src/types/realityPressureFailureEnvelope.ts");
for (const cause of ["STAGE_NOT_IN_CATALOG", "CATALOG_REVISION_UNKNOWN", "CATALOG_ARTIFACT_UNAVAILABLE", "SOURCE_INVALID", "SOURCE_REVISION_MISMATCH", "RUNTIME_ID_BINDING_MISSING", "PRESSURE_NATURE_BINDING_MISSING", "BUNDLE_BUILD_CONFLICT", "DELIVERY_NOT_READY", "INTENT_NOT_READY", "ADMISSION_NOT_READY", "LIFECYCLE_NOT_READY"]) {
  assert(failureType.includes(`"${cause}"`), `failure cause missing ${cause}`);
}
for (const path of [
  "src/services/realityPressureCandidateDeliverySession.ts",
  "src/services/realityPressureCandidateDeliveryOrchestration.ts",
  "src/services/realityPressureActivationDeliveryOrchestrationBridge.ts",
  "src/services/realityRouteDeliveryOrchestrationBridge.ts",
]) {
  const value = read(path);
  assert(value.includes("failure"), `${path} does not preserve failure`);
  assert(value.includes("appendRealityPressureFailureStage"), `${path} replaces rather than appends cause`);
}

const resolverPath = "src/services/xinmaiRealityEntryPresentationResolver.ts";
const resolver = read(resolverPath);
assert(resolver.includes("retryability") && resolver.includes("showRetry: false"), "presentation retryability mapping missing");
assert(resolver.includes("AWAITING_RELATIONSHIP") && resolver.includes("CATALOG_UNAVAILABLE"), "presentation state mapping incomplete");
const launch = read("src/pages/LaunchLab.tsx");
const route = read("src/pages/RealityProductionRouteEntry.tsx");
assert(launch.includes("resolveXinmaiRealityEntryPresentation") && route.includes("resolveXinmaiRealityEntryPresentation"), "presentation resolver consumers incomplete");
assert(!launch.includes('? returningLifeWhisperRealityIntentReady\n              ? "READY"\n              : "AWAITING_RELATIONSHIP"'), "legacy awaiting relationship inference remains");
assert(route.includes("entryPresentation.showRetry && retryAvailable"), "route retry button still guesses retryability");

const generated = read("src/data/generated/guanyaoPressureSeedCatalog20260810FiveStage450.ts");
for (const forbidden of ["AI_ASSISTED", "reviewer", "approval", "authoringStableId", "SAMPLE_DRAFT", "PACK_DRAFT", "Fixture", "Acceptance"]) {
  assert(!generated.includes(forbidden), `runtime artifact contains build-only metadata: ${forbidden}`);
}
const packageJson = JSON.parse(read("package.json"));
assert(packageJson.scripts["check:xinmai-five-stage-450-catalog-atomic-migration"] === "node scripts/check-xinmai-five-stage-450-catalog-atomic-migration.mjs", "gate is not registered");

const distFiles = readdirSync(resolve(root, "dist/assets")).filter((name) => name.endsWith(".js"));
const dist = distFiles.map((name) => read(`dist/assets/${name}`)).join("\n");
for (const forbidden of ["AI_ASSISTED", "XINMAI_PRODUCT_CONTROL_TOWER", "authoringStableId", "bindingReason"]) {
  assert(!dist.includes(forbidden), `production bundle contains review metadata: ${forbidden}`);
}
assert(!read("dist/index.html").includes("/@vite/client") && !read("dist/index.html").includes("/src/main.tsx"), "production index contains Vite development entry");

const temp = mkdtempSync(resolve(tmpdir(), "xinmai-450-runtime-gate-"));
const runtimePath = resolve(temp, "candidate-source.mjs");
await build({
  entryPoints: [resolve(root, "src/services/realityPressureSeedCandidateSource.ts")],
  outfile: runtimePath,
  bundle: true,
  platform: "node",
  format: "esm",
  target: "node20",
  logLevel: "silent",
});
const runtime = await import(`file://${runtimePath}?t=${Date.now()}`);
const baseRequest = Object.freeze({
  sourceExperienceMode: "REAL_USER_EXPERIENCE",
  sourceReferenceId: "launch:real-user:xinmai-450-gate",
  candidateCursor: null,
  excludedCandidateReferenceIds: Object.freeze([]),
  ageSegment: "ESTABLISHING",
  ageSegmentRole: "CATALOG_ROUTING_ONLY",
});
const active = runtime.resolveRealityPressureSeedCandidateSource(baseRequest);
const policy = registry.match(/TARGET_450_NEW_CREATION_POLICY = "(ENABLED|SAFE_WITHHELD)"/)?.[1];
assert(policy === "ENABLED" ? active.status === "READY" : active.failure?.cause === "TARGET_450_NEW_CREATION_SAFE_WITHHELD", "counter policy behavior mismatch");
if (active.status === "READY") {
  const second = runtime.resolveRealityPressureSeedCandidateSource(baseRequest);
  assert(JSON.stringify(active.context.candidateBundle) === JSON.stringify(second.context.candidateBundle), "same request bundle is not deterministic");
  const fnv = (value) => {
    let hash = 0x811c9dc5;
    for (let index = 0; index < value.length; index += 1) {
      hash ^= value.charCodeAt(index);
      hash = Math.imul(hash, 0x01000193);
    }
    return (hash >>> 0).toString(16).padStart(8, "0");
  };
  const legacyRevision = "GUANYAO_PRESSURE_SEED_MATRIX_CATALOG_2026_07_30_P0";
  const records = active.context.candidateRecords;
  const candidateRevisionIds = records.map(({ seed }) => `pressure-candidate-revision:${fnv(JSON.stringify([legacyRevision, seed.id, seed.surface, seed.shell, seed.pressureField, seed.primaryAge]))}`);
  const legacyBundleRevision = `pressure-bundle-revision:${fnv(JSON.stringify([legacyRevision, baseRequest.sourceReferenceId, baseRequest.ageSegment, records.map(({ seed }) => seed.id), candidateRevisionIds]))}`;
  const recovered = runtime.recoverRealityPressureSeedCandidateSource({
    sourceReferenceId: baseRequest.sourceReferenceId,
    ageSegment: baseRequest.ageSegment,
    candidateBundleReferenceId: active.context.bundleReferenceId,
    candidateBundleRevisionReferenceId: legacyBundleRevision,
    catalogRevision: legacyRevision,
  });
  assert(recovered.status === "READY" && recovered.context.catalogRevision === legacyRevision, "legacy persisted revision recovery failed");
}
const unknown = runtime.recoverRealityPressureSeedCandidateSource({
  sourceReferenceId: baseRequest.sourceReferenceId,
  ageSegment: baseRequest.ageSegment,
  candidateBundleReferenceId: "unknown",
  candidateBundleRevisionReferenceId: "unknown",
  catalogRevision: "UNKNOWN_REVISION",
});
assert(unknown.status === "SOURCE_NOT_READY" && unknown.failure.cause === "CATALOG_REVISION_UNKNOWN" && unknown.failure.retryability === "NON_RETRYABLE", "unknown revision typed failure mismatch");

console.log(`[xinmai-450-gate] PASS: ${report.counts.total} candidates; policy ${policy}; ${report.artifactDigest}`);
