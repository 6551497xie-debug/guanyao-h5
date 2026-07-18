import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import process from "node:process";
import { build } from "esbuild";

const rootDir = process.cwd();
const paths = {
  contractType: "src/types/realityPressureSeedCaptureContract.ts",
  type: "src/types/realityPressureSeedCandidateSource.ts",
  service: "src/services/realityPressureSeedCandidateSource.ts",
  pressureConsumer: "src/services/realityProductionPressureConsumer.ts",
  pressurePresentation: "src/components/RealityPressurePresentation.tsx",
  productionHost: "src/components/RealityProductionHost.tsx",
  gravityConsumer: "src/services/realityProductionGravityConsumer.ts",
  packageManifest: "package.json",
};
const source = Object.fromEntries(
  Object.entries(paths).map(([name, file]) => [
    name,
    fs.readFileSync(path.join(rootDir, file), "utf8"),
  ]),
);

const assertEqual = (name, actual, expected) => {
  if (actual !== expected) {
    throw new Error(`${name} expected=${expected} actual=${actual}`);
  }
  console.log(`PASS | ${name}`);
};

const assertIncludes = (name, text, marker) => {
  if (!text.includes(marker)) throw new Error(`${name} missing=${marker}`);
  console.log(`PASS | ${name}`);
};

const assertExcludes = (name, text, marker) => {
  if (text.includes(marker)) throw new Error(`${name} forbidden=${marker}`);
  console.log(`PASS | ${name}`);
};

try {
  [
    "RealityPressureSeedCandidateSourceBoundary",
    "RealityPressureSeedCandidateSourceRecord",
    "RealityPressureSeedCandidateSourceContext",
    "RealityPressureSeedCandidateSourceResult",
    'status: "READY"',
    'status: "SOURCE_NOT_READY" | "BLOCKED"',
    '"AGE_SEGMENT_REQUIRED"',
    '"CATALOG_ROUTING_ROLE_REQUIRED"',
    '"CANDIDATE_CURSOR_MISMATCH"',
    '"CANDIDATE_SOURCE_FALLBACK_DETECTED"',
    '"CANDIDATE_CATALOG_EXHAUSTED"',
  ].forEach((marker) =>
    assertIncludes("candidate source type contract", source.type, marker),
  );

  [
    "productionCandidateSourceOnly: true",
    "existingMatrixResolverOnly: true",
    "crossFieldBundleContractRequired: true",
    "explicitCatalogExhaustionRequired: true",
    "explicitCatalogRoutingContextRequired: true",
    "presentationSafeBundleOnly: true",
    "internalCandidateRecordsIsolated: true",
    "noFixtureSource: true",
    "noPrototypeSource: true",
    "noDefaultSource: true",
    "noSourceFallback: true",
    "noNewPressureEngine: true",
    "noDirectMatrixRead: true",
    "noAutomaticSelection: true",
    "noCaptureExecution: true",
    "noSelectedPressureSeedContext: true",
    "noPressureConsumerIntegration: true",
    "noGravityIntegration: true",
    "noUiIntegration: true",
    "noStorageRead: true",
    "noStorageWrite: true",
  ].forEach((marker) =>
    assertIncludes("candidate source boundary", source.service, marker),
  );

  [
    "export function resolveRealityPressureSeedCandidateSource",
    "resolveRealityPressureCrossFieldCandidateBundlePlan(",
    "getPressureSeedSceneCandidateAtMatrixSlot({",
    "request.ageSegment",
    'ageSegmentRole !== "CATALOG_ROUTING_ONLY"',
    'selectionMode: "USER_RECOGNITION_REQUIRED"',
    'candidateSource: "PRESSURE_SEED_MATRIX_V2"',
    'userRecognitionRequired: true',
    'noAutomaticSelection: true',
    'noDefaultCandidate: true',
  ].forEach((marker) =>
    assertIncludes("candidate source assembly", source.service, marker),
  );

  [
    "GUANYAO_PRESSURE_SEED_MATRIX_V2",
    "buildSelectedPressureSeedContext",
    "initializeRealityProductionPressureConsumer",
    "advanceRealityProductionPressureConsumer",
    "initializeRealityProductionGravityConsumer",
    "writeSelectedPressureSeedContext",
    "readPersistedSelectedPressureSeedContext",
    "localStorage",
    "sessionStorage",
    "react",
    "useNavigate",
    "createGenesisWebGLRendererCore",
  ].forEach((marker) =>
    assertExcludes(
      "source starts no direct Matrix, capture, consumer, UI, route, renderer, or storage",
      source.service,
      marker,
    ),
  );

  assertExcludes(
    "Pressure consumer is not integrated in WORK-003B",
    source.pressureConsumer,
    "RealityPressureSeedCandidateSourceContext",
  );
  assertExcludes(
    "Pressure presentation is not integrated in WORK-003B",
    source.pressurePresentation,
    "RealityPressureSeedCandidateBundle",
  );
  assertExcludes(
    "Production host is not integrated in WORK-003B",
    source.productionHost,
    "resolveRealityPressureSeedCandidateSource",
  );
  assertExcludes(
    "Gravity is not integrated in WORK-003B",
    source.gravityConsumer,
    "RealityPressureSeedCandidateSourceContext",
  );

  const packageJson = JSON.parse(source.packageManifest);
  assertIncludes(
    "candidate source gate is registered",
    packageJson.scripts?.["check-reality-pressure-seed-candidate-source"] ?? "",
    "node scripts/check-reality-pressure-seed-candidate-source.mjs",
  );

  const tempDir = fs.mkdtempSync(
    path.join(os.tmpdir(), "guanyao-pressure-seed-candidate-source-"),
  );
  const outPath = path.join(tempDir, "candidate-source.mjs");
  await build({
    entryPoints: [path.join(rootDir, paths.service)],
    outfile: outPath,
    bundle: true,
    platform: "node",
    format: "esm",
    target: "node20",
    logLevel: "silent",
  });
  const runtime = await import(`file://${outPath}?t=${Date.now()}`);
  const resolve = runtime.resolveRealityPressureSeedCandidateSource;

  const baseRequest = {
    sourceExperienceMode: "REAL_USER_EXPERIENCE",
    sourceReferenceId: "launch:real-user:work-003b",
    candidateCursor: null,
    excludedCandidateReferenceIds: [],
    ageSegment: "ESTABLISHING",
    ageSegmentRole: "CATALOG_ROUTING_ONLY",
  };

  const missingAge = resolve({
    ...baseRequest,
    ageSegment: undefined,
    ageSegmentRole: undefined,
  });
  assertEqual("missing age never falls back", missingAge.status, "SOURCE_NOT_READY");
  assertEqual("missing age reason is explicit", missingAge.reason, "AGE_SEGMENT_REQUIRED");

  const forbidden = resolve({
    ...baseRequest,
    sourceReferenceId: "fixture:case-a",
  });
  assertEqual("fixture source is blocked", forbidden.status, "BLOCKED");
  assertEqual("fixture creates no context", forbidden.context, null);

  const wrongRole = resolve({ ...baseRequest, ageSegmentRole: undefined });
  assertEqual("implicit catalog routing is blocked", wrongRole.status, "BLOCKED");
  assertEqual("catalog routing role is explicit", wrongRole.reason, "CATALOG_ROUTING_ROLE_REQUIRED");

  const wrongCursor = resolve({ ...baseRequest, candidateCursor: "default" });
  assertEqual("untracked cursor is blocked", wrongCursor.status, "BLOCKED");
  assertEqual("cursor mismatch is explicit", wrongCursor.reason, "CANDIDATE_CURSOR_MISMATCH");

  const unavailableAge = resolve({ ...baseRequest, ageSegment: "MID_LIFE" });
  assertEqual("missing age catalog never falls back", unavailableAge.status, "SOURCE_NOT_READY");
  assertEqual(
    "age catalog mismatch is explicit",
    unavailableAge.reason,
    "CANDIDATE_BUNDLE_NOT_AVAILABLE",
  );

  const ready = resolve(baseRequest);
  assertEqual("explicit real request resolves candidates", ready.status, "READY");
  assertEqual("bundle carries three candidates", ready.context.candidateBundle.candidates.length, 3);
  assertEqual("source context carries three isolated records", ready.context.candidateRecords.length, 3);
  assertEqual("candidate bundle is frozen", Object.isFrozen(ready.context.candidateBundle), true);
  assertEqual("candidate list is frozen", Object.isFrozen(ready.context.candidateBundle.candidates), true);
  assertEqual("candidate records are frozen", Object.isFrozen(ready.context.candidateRecords), true);
  assertEqual("source context is frozen", Object.isFrozen(ready.context), true);
  assertEqual("candidate source is Matrix V2", ready.context.candidateBundle.provenance.candidateSource, "PRESSURE_SEED_MATRIX_V2");
  assertEqual("selection remains user-owned", ready.context.candidateBundle.selectionMode, "USER_RECOGNITION_REQUIRED");
  assertEqual("no default candidate is declared", ready.context.candidateBundle.provenance.noDefaultCandidate, true);
  assertEqual("no candidate is automatically selected", ready.context.candidateBundle.provenance.noAutomaticSelection, true);
  assertEqual("bundle reference remains continuous", ready.context.bundleReferenceId, ready.context.candidateBundle.bundleReferenceId);
  assertEqual("source reference remains continuous", ready.context.sourceReferenceId, baseRequest.sourceReferenceId);
  assertEqual(
    "first bundle is cross-field Group A",
    ready.context.candidateRecords.map((record) => record.seed.pressureField).join(","),
    "POWER,RELATION,FAMILY",
  );

  for (const candidate of ready.context.candidateBundle.candidates) {
    assertEqual("presentation candidate exposes only three fields", Object.keys(candidate).sort().join(","), "candidateReferenceId,shell,surface");
  }
  for (const record of ready.context.candidateRecords) {
    assertEqual("catalog routing preserves requested age", record.seed.primaryAge, "ESTABLISHING");
  }

  const currentIds = ready.context.candidateBundle.candidates.map(
    (candidate) => candidate.candidateReferenceId,
  );
  const next = resolve({
    ...baseRequest,
    candidateCursor: ready.context.candidateBundle.nextCandidateCursor,
    excludedCandidateReferenceIds: currentIds,
  });
  assertEqual("next bundle resolves through explicit cursor", next.status, "READY");
  assertEqual(
    "second bundle is cross-field Group B",
    next.context.candidateRecords.map((record) => record.seed.pressureField).join(","),
    "EXISTENCE,INTEREST,SOCIAL",
  );
  assertEqual(
    "next bundle does not reuse excluded candidates",
    next.context.candidateBundle.candidates.some((candidate) =>
      currentIds.includes(candidate.candidateReferenceId),
    ),
    false,
  );

  assertEqual("source boundary is frozen", Object.isFrozen(ready.boundary), true);
  assertEqual("source invokes no new Pressure engine", ready.boundary.noNewPressureEngine, true);
  assertEqual("source performs no capture", ready.boundary.noCaptureExecution, true);
  assertEqual("source writes no storage", ready.boundary.noStorageWrite, true);

  console.log("\n[REALITY PRESSURE SEED CANDIDATE SOURCE] PASS");
} catch (error) {
  console.error("[REALITY PRESSURE SEED CANDIDATE SOURCE] FAIL");
  console.error(error instanceof Error ? error.message : error);
  process.exitCode = 1;
}
