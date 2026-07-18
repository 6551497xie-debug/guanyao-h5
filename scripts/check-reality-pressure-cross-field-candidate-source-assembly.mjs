import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import process from "node:process";
import { build } from "esbuild";

const rootDir = process.cwd();
const paths = {
  service: "src/services/realityPressureSeedCandidateSource.ts",
  resolver: "src/services/guanyaoPressureSeedSceneBindingService.ts",
  contract: "src/services/realityPressureCrossFieldCandidateBundleContract.ts",
  capture: "src/services/realityPressureSeedCaptureAdapter.ts",
  consumer: "src/services/realityProductionPressureSeedConsumer.ts",
  packageManifest: "package.json",
};
const source = Object.fromEntries(
  Object.entries(paths).map(([name, file]) => [
    name,
    fs.readFileSync(path.join(rootDir, file), "utf8"),
  ]),
);

const assertEqual = (name, actual, expected) => {
  if (actual !== expected) throw new Error(`${name} expected=${expected} actual=${actual}`);
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
    "resolveRealityPressureCrossFieldCandidateBundlePlan",
    "getPressureSeedSceneCandidateAtMatrixSlot",
    '"CANDIDATE_CATALOG_EXHAUSTED"',
    "crossFieldBundleContractRequired: true",
    "explicitCatalogExhaustionRequired: true",
  ].forEach((marker) => assertIncludes("Candidate Source uses cross-field assembly", source.service, marker));
  assertIncludes("slot resolver rejects unlocked catalogs", source.resolver, 'node.status !== "locked"');
  ["GUANYAO_PRESSURE_SEED_MATRIX_V2", "Math.random", "buildSelectedPressureSeedContext", "localStorage", "sessionStorage", "react", "useNavigate"].forEach(
    (marker) => assertExcludes("Candidate Source keeps its frozen boundary", source.service, marker),
  );
  assertExcludes("Capture Adapter input remains unchanged", source.capture, "RealityPressureCrossField");
  assertExcludes("Pressure Consumer input remains unchanged", source.consumer, "RealityPressureCrossField");

  const packageJson = JSON.parse(source.packageManifest);
  assertIncludes(
    "assembly gate is registered",
    packageJson.scripts?.["check-reality-pressure-cross-field-candidate-source-assembly"] ?? "",
    "node scripts/check-reality-pressure-cross-field-candidate-source-assembly.mjs",
  );

  const tempDir = fs.mkdtempSync(path.join(os.tmpdir(), "guanyao-cross-field-source-"));
  const outPath = path.join(tempDir, "source.mjs");
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
  const baseRequest = {
    sourceExperienceMode: "REAL_USER_EXPERIENCE",
    sourceReferenceId: "launch:real-user:work-003n",
    candidateCursor: null,
    excludedCandidateReferenceIds: [],
    ageSegment: "ESTABLISHING",
    ageSegmentRole: "CATALOG_ROUTING_ONLY",
  };

  let request = baseRequest;
  const bundles = [];
  for (let sequence = 0; sequence < 30; sequence += 1) {
    const result = runtime.resolveRealityPressureSeedCandidateSource(request);
    assertEqual(`source bundle ${sequence + 1} is ready`, result.status, "READY");
    const records = result.context.candidateRecords;
    assertEqual(`source bundle ${sequence + 1} carries three candidates`, records.length, 3);
    assertEqual(
      `source bundle ${sequence + 1} fields are distinct`,
      new Set(records.map((record) => record.seed.pressureField)).size,
      3,
    );
    assertEqual(
      `source bundle ${sequence + 1} candidate shape is unchanged`,
      result.context.candidateBundle.candidates.every(
        (candidate) => Object.keys(candidate).sort().join(",") === "candidateReferenceId,shell,surface",
      ),
      true,
    );
    bundles.push(records);
    request = {
      ...baseRequest,
      candidateCursor: result.context.candidateBundle.nextCandidateCursor,
      excludedCandidateReferenceIds: [
        ...request.excludedCandidateReferenceIds,
        ...records.map((record) => record.candidateReferenceId),
      ],
    };
  }

  for (let index = 0; index < bundles.length; index += 2) {
    const fields = new Set(
      [...bundles[index], ...bundles[index + 1]].map((record) => record.seed.pressureField),
    );
    assertEqual(`source bundle pair ${index / 2 + 1} covers six fields`, fields.size, 6);
  }
  const allIds = bundles.flat().map((record) => record.candidateReferenceId);
  assertEqual("all ninety Matrix candidates are delivered once", allIds.length, 90);
  assertEqual("no candidate is repeated", new Set(allIds).size, 90);

  const exhausted = runtime.resolveRealityPressureSeedCandidateSource(request);
  assertEqual("catalog exhaustion is source-not-ready", exhausted.status, "SOURCE_NOT_READY");
  assertEqual("catalog exhaustion reason is explicit", exhausted.reason, "CANDIDATE_CATALOG_EXHAUSTED");
  assertEqual("catalog exhaustion never creates a bundle", exhausted.context, null);

  const unavailableAge = runtime.resolveRealityPressureSeedCandidateSource({
    ...baseRequest,
    ageSegment: "MID_LIFE",
  });
  assertEqual("missing age catalog does not fallback", unavailableAge.status, "SOURCE_NOT_READY");
  assertEqual("missing age catalog creates no bundle", unavailableAge.context, null);

  const first = runtime.resolveRealityPressureSeedCandidateSource(baseRequest);
  const tamperedExclusions = first.context.candidateBundle.candidates.map(
    (candidate) => candidate.candidateReferenceId,
  );
  tamperedExclusions[0] = "ESTABLISHING_POWER_02";
  const tampered = runtime.resolveRealityPressureSeedCandidateSource({
    ...baseRequest,
    candidateCursor: first.context.candidateBundle.nextCandidateCursor,
    excludedCandidateReferenceIds: tamperedExclusions,
  });
  assertEqual("tampered exclusion history is blocked", tampered.status, "BLOCKED");
  assertEqual("tampered history cannot move the cursor", tampered.reason, "CANDIDATE_CURSOR_MISMATCH");

  console.log("\n[REALITY PRESSURE CROSS-FIELD CANDIDATE SOURCE ASSEMBLY] PASS");
} catch (error) {
  console.error("[REALITY PRESSURE CROSS-FIELD CANDIDATE SOURCE ASSEMBLY] FAIL");
  console.error(error instanceof Error ? error.message : error);
  process.exitCode = 1;
}
