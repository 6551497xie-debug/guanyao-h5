import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import process from "node:process";
import { build } from "esbuild";

const rootDir = process.cwd();
const paths = {
  type: "src/types/pressureSeedMatrixAgeCoverageContract.ts",
  service: "src/services/pressureSeedMatrixAgeCoverageContract.ts",
  matrix: "src/data/guanyaoPressureSeedMatrix.ts",
  candidateSource: "src/services/realityPressureSeedCandidateSource.ts",
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
    "PressureSeedMatrixAgeCoverageNode",
    "PressureSeedMatrixAgeCatalogCoverage",
    "PressureSeedMatrixAgeCoverageBoundary",
    "PressureSeedMatrixAgeCoverageSnapshot",
    "PressureSeedMatrixAgeCatalogEligibilityResult",
    'status: "SOURCE_NOT_READY"',
    'reason: "AGE_CATALOG_NOT_READY"',
  ].forEach((marker) =>
    assertIncludes("age coverage type contract", source.type, marker),
  );

  [
    "coverageContractOnly: true",
    "existingLockedMatrixReadOnly: true",
    "explicitAgeCatalogRequired: true",
    "allSixPressureFieldsRequired: true",
    "fifteenSeedsPerNodeRequired: true",
    "noAgeCatalogFallback: true",
    "noDraftPoolPromotion: true",
    "noMatrixMutation: true",
    "noEngineInvocation: true",
    "noCandidateAssembly: true",
    "noCaptureExecution: true",
    "noRuntimeIntegration: true",
    "noUiIntegration: true",
    "noStorageRead: true",
    "noStorageWrite: true",
  ].forEach((marker) =>
    assertIncludes("age coverage boundary", source.service, marker),
  );

  [
    '"YOUTH"',
    '"ESTABLISHING"',
    '"MID_LIFE"',
    '"RESTRUCTURING"',
    '"SIXTY_PLUS"',
    "getPressureSeedMatrixAgeCoverageSnapshot",
    "resolvePressureSeedMatrixAgeCatalogEligibility",
    'reason: "AGE_CATALOG_NOT_READY"',
  ].forEach((marker) =>
    assertIncludes("age coverage implementation", source.service, marker),
  );

  [
    "GUANYAO_PRESSURE_SEED_DRAFT_POOL",
    "getPressureSeedSceneTriplet",
    "resolveRealityPressureSeedCandidateSource",
    "buildSelectedPressureSeedContext",
    "localStorage",
    "sessionStorage",
    "react",
    "useNavigate",
  ].forEach((marker) =>
    assertExcludes(
      "contract performs no draft promotion, candidate assembly, capture, runtime, UI, or storage",
      source.service,
      marker,
    ),
  );

  assertIncludes(
    "existing Matrix remains establishing-only",
    source.matrix,
    'PRESSURE_SEED_AGE_GROUPS: PressureSeedRuntimeAgeGroup[] = ["ESTABLISHING"]',
  );
  assertExcludes(
    "candidate source is not integrated by coverage contract knife",
    source.candidateSource,
    "resolvePressureSeedMatrixAgeCatalogEligibility",
  );

  const packageJson = JSON.parse(source.packageManifest);
  assertIncludes(
    "coverage gate is registered",
    packageJson.scripts?.[
      "check-pressure-seed-matrix-age-coverage-contract"
    ] ?? "",
    "node scripts/check-pressure-seed-matrix-age-coverage-contract.mjs",
  );

  const tempDir = fs.mkdtempSync(
    path.join(os.tmpdir(), "guanyao-pressure-seed-age-coverage-"),
  );
  const outPath = path.join(tempDir, "coverage-contract.mjs");
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

  const snapshot = runtime.getPressureSeedMatrixAgeCoverageSnapshot();
  assertEqual("target covers five age catalogs", snapshot.targetAgeGroupCount, 5);
  assertEqual("target covers six pressure fields", snapshot.targetPressureFieldCount, 6);
  assertEqual("target contains thirty nodes", snapshot.targetNodeCount, 30);
  assertEqual("target contains 450 seed slots", snapshot.targetSeedCount, 450);
  assertEqual("current Matrix keeps six locked nodes", snapshot.lockedNodeCount, 6);
  assertEqual("current Matrix keeps ninety ready seeds", snapshot.readySeedCount, 90);
  assertEqual("twenty-four nodes remain explicit", snapshot.missingNodeCount, 24);
  assertEqual("360 seed slots remain missing", snapshot.missingSeedCount, 360);
  assertEqual("production coverage remains partial", snapshot.productionReadiness, "PARTIAL");
  assertEqual("coverage snapshot is immutable", Object.isFrozen(snapshot), true);
  assertEqual("catalog collection is immutable", Object.isFrozen(snapshot.catalogs), true);

  const establishing = runtime.resolvePressureSeedMatrixAgeCatalogEligibility("ESTABLISHING");
  assertEqual("establishing catalog is eligible", establishing.status, "READY");
  assertEqual("establishing catalog has six nodes", establishing.catalog.lockedNodeCount, 6);
  assertEqual("establishing catalog has ninety seeds", establishing.catalog.readySeedCount, 90);

  for (const ageGroup of ["YOUTH", "MID_LIFE", "RESTRUCTURING", "SIXTY_PLUS"]) {
    const result = runtime.resolvePressureSeedMatrixAgeCatalogEligibility(ageGroup);
    assertEqual(`${ageGroup} catalog is not silently replaced`, result.status, "SOURCE_NOT_READY");
    assertEqual(`${ageGroup} reason is explicit`, result.reason, "AGE_CATALOG_NOT_READY");
    assertEqual(`${ageGroup} has no locked nodes`, result.catalog.lockedNodeCount, 0);
  }

  assertEqual("coverage boundary is immutable", Object.isFrozen(snapshot.boundary), true);
  assertEqual("age fallback is forbidden", snapshot.boundary.noAgeCatalogFallback, true);
  assertEqual("draft promotion is forbidden", snapshot.boundary.noDraftPoolPromotion, true);
  assertEqual("runtime remains untouched", snapshot.boundary.noRuntimeIntegration, true);

  console.log("\n[PRESSURE SEED MATRIX AGE COVERAGE CONTRACT] PASS");
} catch (error) {
  console.error("[PRESSURE SEED MATRIX AGE COVERAGE CONTRACT] FAIL");
  console.error(error instanceof Error ? error.message : error);
  process.exitCode = 1;
}
