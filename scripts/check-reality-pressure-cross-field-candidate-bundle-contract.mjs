import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import process from "node:process";
import { build } from "esbuild";

const rootDir = process.cwd();
const paths = {
  type: "src/types/realityPressureCrossFieldCandidateBundleContract.ts",
  service: "src/services/realityPressureCrossFieldCandidateBundleContract.ts",
  candidateSource: "src/services/realityPressureSeedCandidateSource.ts",
  captureAdapter: "src/services/realityPressureSeedCaptureAdapter.ts",
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
    "RealityPressureCrossFieldBundleCursor",
    "RealityPressureCrossFieldCandidateBundlePlan",
    "RealityPressureCrossFieldCandidateBundlePlanResult",
    "RealityPressureCrossFieldCandidateBundleContract",
    '"CANDIDATE_CATALOG_EXHAUSTED"',
  ].forEach((marker) => assertIncludes("cross-field type contract", source.type, marker));

  [
    'GROUP_A: Object.freeze(["POWER", "RELATION", "FAMILY"] as const)',
    'GROUP_B: Object.freeze(["EXISTENCE", "INTEREST", "SOCIAL"] as const)',
    "createRealityPressureCrossFieldBundleCursor",
    "resolveRealityPressureCrossFieldCandidateBundlePlan",
    "deterministicCrossFieldComposition: true",
    "noRandomSelection: true",
    "noAutomaticRecognition: true",
    "noCandidateSourceIntegration: true",
    "noCaptureAdapterChange: true",
  ].forEach((marker) => assertIncludes("cross-field contract service", source.service, marker));

  [
    "GUANYAO_PRESSURE_SEED_MATRIX_V2",
    "getPressureSeedSceneTriplet",
    "resolveRealityPressureSeedCandidateSource",
    "buildSelectedPressureSeedContext",
    "Math.random",
    "localStorage",
    "sessionStorage",
    "react",
    "useNavigate",
  ].forEach((marker) =>
    assertExcludes("contract performs no source, capture, engine, runtime, UI, or storage work", source.service, marker),
  );

  assertExcludes(
    "current Candidate Source is not switched by contract knife",
    source.candidateSource,
    "realityPressureCrossFieldCandidateBundleContract",
  );
  assertExcludes(
    "Capture Adapter is not changed by contract knife",
    source.captureAdapter,
    "realityPressureCrossFieldCandidateBundleContract",
  );

  const packageJson = JSON.parse(source.packageManifest);
  assertIncludes(
    "cross-field gate is registered",
    packageJson.scripts?.["check-reality-pressure-cross-field-candidate-bundle-contract"] ?? "",
    "node scripts/check-reality-pressure-cross-field-candidate-bundle-contract.mjs",
  );

  const tempDir = fs.mkdtempSync(path.join(os.tmpdir(), "guanyao-cross-field-bundle-"));
  const outPath = path.join(tempDir, "contract.mjs");
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
  const contract = runtime.REALITY_PRESSURE_CROSS_FIELD_BUNDLE_CONTRACT;
  assertEqual("bundle keeps three candidates", contract.candidatesPerBundle, 3);
  assertEqual("bundle requires three fields", contract.distinctFieldsPerBundle, 3);
  assertEqual("two bundles cover six fields", contract.bundlesPerCompleteFieldCoverage, 2);
  assertEqual("contract plans thirty bundles", contract.bundleCapacity, 30);

  let cursor = runtime.createRealityPressureCrossFieldBundleCursor(
    "real-user-session:work-003m",
    "ESTABLISHING",
  );
  const plans = [];
  for (let sequence = 0; sequence < 30; sequence += 1) {
    const result = runtime.resolveRealityPressureCrossFieldCandidateBundlePlan(cursor);
    assertEqual(`bundle ${sequence + 1} is ready`, result.status, "READY");
    assertEqual(`bundle ${sequence + 1} sequence is continuous`, result.plan.bundleSequence, sequence);
    assertEqual(`bundle ${sequence + 1} has three slots`, result.plan.slots.length, 3);
    assertEqual(
      `bundle ${sequence + 1} fields are distinct`,
      new Set(result.plan.slots.map((slot) => slot.pressureField)).size,
      3,
    );
    assertEqual(
      `bundle ${sequence + 1} alternates field group`,
      result.plan.fieldGroup,
      sequence % 2 === 0 ? "GROUP_A" : "GROUP_B",
    );
    assertEqual(
      `bundle ${sequence + 1} preserves source reference`,
      result.plan.sourceReferenceId,
      "real-user-session:work-003m",
    );
    plans.push(result.plan);
    cursor = result.plan.nextCursor;
  }

  const allFields = ["POWER", "INTEREST", "RELATION", "FAMILY", "SOCIAL", "EXISTENCE"];
  for (let pair = 0; pair < plans.length; pair += 2) {
    const covered = new Set(
      [...plans[pair].slots, ...plans[pair + 1].slots].map((slot) => slot.pressureField),
    );
    assertEqual(`bundle pair ${pair / 2 + 1} covers all fields`, covered.size, 6);
  }
  for (const field of allFields) {
    const slots = plans.flatMap((plan) => plan.slots).filter((slot) => slot.pressureField === field);
    assertEqual(`${field} appears fifteen times`, slots.length, 15);
    assertEqual(
      `${field} offsets preserve Matrix order`,
      slots.map((slot) => slot.fieldSeedOffset).join(","),
      Array.from({ length: 15 }, (_, index) => index).join(","),
    );
  }

  const exhausted = runtime.resolveRealityPressureCrossFieldCandidateBundlePlan(cursor);
  assertEqual("catalog exhaustion is explicit", exhausted.status, "SOURCE_NOT_READY");
  assertEqual("catalog exhaustion has stable reason", exhausted.reason, "CANDIDATE_CATALOG_EXHAUSTED");
  assertEqual("contract is immutable", Object.isFrozen(contract), true);
  assertEqual("field rotation is immutable", Object.isFrozen(contract.fieldRotation), true);

  console.log("\n[REALITY PRESSURE CROSS-FIELD CANDIDATE BUNDLE CONTRACT] PASS");
} catch (error) {
  console.error("[REALITY PRESSURE CROSS-FIELD CANDIDATE BUNDLE CONTRACT] FAIL");
  console.error(error instanceof Error ? error.message : error);
  process.exitCode = 1;
}
