import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import process from "node:process";
import { build } from "esbuild";

const rootDir = process.cwd();
const files = Object.freeze({
  type: "src/types/releaseBaselineAlignment.ts",
  service: "src/services/releaseBaselineAlignment.ts",
  p109Gate: "scripts/check-genesis-first-impression-tempo-calibration.mjs",
  harness: "src/pages/PersonalStarBeastWebGLPrototypeHarness.tsx",
  typeIndex: "src/types/index.ts",
  packageManifest: "package.json",
});
const failures = [];
const source = {};

const assertIncludes = (name, value, marker) => {
  if (value.includes(marker)) console.log(`PASS | ${name} | includes=${marker}`);
  else failures.push(`${name} missing=${marker}`);
};
const assertExcludes = (name, value, marker) => {
  if (value.includes(marker)) failures.push(`${name} forbidden=${marker}`);
  else console.log(`PASS | ${name} | forbidden=absent`);
};
const assertEqual = (name, actual, expected) => {
  if (actual === expected) console.log(`PASS | ${name} | expected=${String(expected)}`);
  else failures.push(`${name} expected=${String(expected)} actual=${String(actual)}`);
};

for (const [name, relative] of Object.entries(files)) {
  const filePath = path.join(rootDir, relative);
  if (!fs.existsSync(filePath)) failures.push(`${name} missing=${filePath}`);
  else {
    source[name] = fs.readFileSync(filePath, "utf8");
    console.log(`PASS | ${name} file exists`);
  }
}

if (failures.length === 0) {
  const packageJson = JSON.parse(source.packageManifest);

  [
    "ReleaseBaselineAlignment",
    "gateReference",
    "expectedContract",
    "currentContract",
    "alignmentState",
    "P109_FIRST_IMPRESSION_TEMPO_CALIBRATION",
    "arrivalEndMs: 1400",
    "presenceStartMs: 3800",
    "phaseContract",
    "ALIGNED",
    "COMPATIBLE",
    "noExperienceLogicChange",
    "engineeringStabilityOnly",
    "noRuntimeMutation",
    "noUIMutation",
    "noGenesisMutation",
    "noRealityMutation",
    "noStorage",
  ].forEach((marker) =>
    assertIncludes("P49 alignment type", source.type, marker),
  );

  [
    "resolveReleaseBaselineAlignment",
    "alignReleaseBaseline",
    "P109_FIRST_IMPRESSION_TIMING_CONTRACT",
    "GATE_REFERENCE_REQUIRED",
    "EXPECTED_CONTRACT_REQUIRED",
    "CURRENT_CONTRACT_REQUIRED",
    "GATE_REFERENCE_INVALID",
    "BASELINE_CONTRACT_MISMATCH",
    "ALIGNMENT_BOUNDARY_INVALID",
    "engineeringStabilityOnly",
    "noExperienceLogicChange",
    "noRuntimeMutation",
    "noUIMutation",
    "noGenesisMutation",
    "noRealityMutation",
    "noStorage",
  ].forEach((marker) =>
    assertIncludes("P49 alignment service", source.service, marker),
  );

  [
    "resolveStarbeastFromBirthDate",
    "runMotherCodeLandingEngine",
    "runHexagramCalculation",
    "setPreviewStageIndex",
    "resetGenesis",
    "createRenderer",
    "createRenderPlan",
    "localStorage",
    "sessionStorage",
    "fetch(",
    "window.",
    "document.",
  ].forEach((marker) =>
    assertExcludes("P49 remains engineering-only", source.service, marker),
  );

  [
    "const FIRST_IMPRESSION_TIMING = Object.freeze({",
    "arrivalEndMs: 1400",
    "presenceStartMs: 3800",
    "FIRST_IMPRESSION_TIMING.arrivalEndMs",
    "FIRST_IMPRESSION_TIMING.presenceStartMs",
    'type FirstImpressionPhase = "ARRIVAL" | "FORMATION" | "PRESENCE"',
  ].forEach((marker) =>
    assertIncludes("P49 P109 Harness contract", source.harness, marker),
  );

  [
    "FIRST_IMPRESSION_TIMING",
    "P109_FIRST_IMPRESSION_TEMPO_CALIBRATION",
    "P40_FULL_LOOP_ACCEPTANCE",
    "P41_EXPERIENCE_OPTIMIZATION_REVIEW",
    "P43_FULL_LOOP_REVALIDATION",
    "P44_SPATIAL_DISTANCE_CALIBRATION",
    "P45_PRESENCE_CARRY",
    "P46_REALITY_CONTINUITY",
    "P47_REALITY_FULL_EXPERIENCE_ACCEPTANCE",
  ].forEach((marker) =>
    assertIncludes("P49 upstream compatibility", source.service + source.packageManifest, marker),
  );

  assertIncludes(
    "P49 type index export",
    source.typeIndex,
    "./releaseBaselineAlignment",
  );
  assertIncludes(
    "P49 standalone gate registered",
    packageJson.scripts?.["check-release-baseline-alignment"] ?? "",
    "node scripts/check-release-baseline-alignment.mjs",
  );
  assertIncludes(
    "P49 release gate registered",
    packageJson.scripts?.["postcheck:release"] ?? "",
    "npm run check-release-baseline-alignment",
  );

  const modulePath = path.join(
    os.tmpdir(),
    `guanyao-release-baseline-alignment-${process.pid}.mjs`,
  );
  await build({
    stdin: {
      contents:
        'export { resolveReleaseBaselineAlignment } from "./src/services/releaseBaselineAlignment.ts";',
      resolveDir: rootDir,
      sourcefile: "release-baseline-alignment-gate-entry.ts",
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
  const expectedContract = Object.freeze({
    arrivalEndMs: 1400,
    presenceStartMs: 3800,
    phaseContract: '"ARRIVAL" | "FORMATION" | "PRESENCE"',
  });
  const aligned = runtime.resolveReleaseBaselineAlignment({
    gateReference: "P109_FIRST_IMPRESSION_TEMPO_CALIBRATION",
    expectedContract,
    currentContract: expectedContract,
  });
  assertEqual("P49 aligned result ready", aligned.status, "READY");
  assertEqual("P49 aligned state", aligned.alignment?.alignmentState, "ALIGNED");
  assertEqual("P49 compatibility result", aligned.alignment?.compatibilityResult, "COMPATIBLE");
  assertEqual("P49 no UI flow change", aligned.alignment?.noUIFlowChange, true);

  const mismatch = runtime.resolveReleaseBaselineAlignment({
    gateReference: "P109_FIRST_IMPRESSION_TEMPO_CALIBRATION",
    expectedContract,
    currentContract: Object.freeze({
      arrivalEndMs: 1200,
      presenceStartMs: 3800,
      phaseContract: '"ARRIVAL" | "FORMATION" | "PRESENCE"',
    }),
  });
  assertEqual("P49 mismatch blocked", mismatch.status, "BLOCKED");
  assertEqual("P49 mismatch reason", mismatch.reason, "BASELINE_CONTRACT_MISMATCH");

  const missingGate = runtime.resolveReleaseBaselineAlignment({
    gateReference: null,
    expectedContract,
    currentContract: expectedContract,
  });
  assertEqual("P49 missing gate unavailable", missingGate.status, "UNAVAILABLE");
  assertEqual("P49 missing gate reason", missingGate.reason, "GATE_REFERENCE_REQUIRED");
}

if (failures.length > 0) {
  console.error(`FAIL | check-release-baseline-alignment | count=${failures.length}`);
  for (const failure of failures) console.error(`- ${failure}`);
  process.exitCode = 1;
} else {
  console.log("PASS | check-release-baseline-alignment");
}
