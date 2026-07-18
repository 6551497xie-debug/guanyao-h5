import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import process from "node:process";
import { build } from "esbuild";

const rootDir = process.cwd();
const files = Object.freeze({
  type: "src/types/genesisRealityEntryBridge.ts",
  service: "src/services/genesisRealityEntryBridge.ts",
  completionType: "src/types/genesisCompletionMomentReview.ts",
  completionService: "src/services/genesisCompletionMomentReview.ts",
  typeIndex: "src/types/index.ts",
  packageManifest: "package.json",
});
const failures = [];
const assertIncludes = (name, source, marker) => {
  if (source.includes(marker)) console.log(`PASS | ${name} | includes=${marker}`);
  else failures.push(`${name} missing=${marker}`);
};
const assertExcludes = (name, source, marker) => {
  if (source.includes(marker)) failures.push(`${name} forbidden=${marker}`);
  else console.log(`PASS | ${name} | forbidden=absent`);
};
const assertEqual = (name, actual, expected) => {
  if (actual === expected) console.log(`PASS | ${name} | expected=${String(expected)}`);
  else failures.push(`${name} expected=${String(expected)} actual=${String(actual)}`);
};
const absolute = Object.fromEntries(
  Object.entries(files).map(([name, relative]) => [name, path.join(rootDir, relative)]),
);

for (const [name, filePath] of Object.entries(absolute)) {
  if (fs.existsSync(filePath)) console.log(`PASS | ${name} file exists`);
  else failures.push(`${name} missing=${filePath}`);
}

if (failures.length === 0) {
  const source = Object.fromEntries(
    Object.entries(absolute).map(([name, filePath]) => [name, fs.readFileSync(filePath, "utf8")]),
  );
  const packageJson = JSON.parse(source.packageManifest);

  [
    "GenesisRealityEntryBridge",
    "genesisCompletionReference",
    "recognitionState",
    "realityEntryReadiness",
    "transitionIntent",
    "bridgeState",
    "GENESIS_RECOGNITION_HELD",
    "REALITY_ENTRY_REVIEW_PENDING",
    "CARRY_RECOGNITION_FORWARD",
    "GENESIS_COMPLETION_HELD",
    "GenesisRealityEntryBridgeBoundary",
    "experienceBridgeOnly",
    "realityEntryBoundaryOnly",
    "noRealityCalculation",
    "noPressureCalculation",
    "noGravityCalculation",
    "noChoiceCalculation",
    "noCrystalGeneration",
    "noArchiveWrite",
    "noIdentityMutation",
    "noEngineInvocation",
    "noRendererInvocation",
    "noVisualStateMutation",
    "noRuntimeMutation",
    "noStorageWrite",
    "productionIntegration: false",
    "isolatedPrototypeOnly",
  ].forEach((marker) => assertIncludes("P21 bridge type", source.type, marker));

  [
    "reviewGenesisRealityEntryBridge",
    "GENESIS_COMPLETION_REFERENCE_REQUIRED",
    "GENESIS_COMPLETION_REVIEW_UNAVAILABLE",
    "GENESIS_COMPLETION_REVIEW_BLOCKED",
    "GENESIS_COMPLETION_BOUNDARY_INVALID",
    "GENESIS_TO_REALITY_BOUNDARY_HELD",
    "REALITY_ENTRY_REVIEW_PENDING",
    "GENESIS_RECOGNITION_HELD",
    "CARRY_RECOGNITION_FORWARD",
    "REALITY_ENTRY_BRIDGE_READY",
    "noRealityCalculation",
    "noPressureAnalysis",
    "noGravity",
    "noChoice",
    "noCrystal",
    "noStorage",
    "noIdentityMutation",
    "noEngineInvocation",
    "noRendererInvocation",
    "noVisualStateMutation",
  ].forEach((marker) => assertIncludes("P21 bridge service", source.service, marker));

  [
    "calculateReality",
    "createReality",
    "analyzePressure",
    "calculateGravity",
    "resolveChoice",
    "generateCrystal",
    "archiveReality",
    "createRenderer",
    "localStorage",
    "sessionStorage",
    "fetch(",
    "document.",
  ].forEach((marker) => assertExcludes("P21 bridge remains review-only", source.service, marker));

  [
    "GenesisCompletionMomentReviewResult",
    "GenesisRealityEntryBridgeInput",
    "GenesisRealityEntryBridgeResult",
    "from \"./genesisRealityEntryBridge\"",
  ].forEach((marker) => assertIncludes("P21 type index export", source.typeIndex, marker));
  assertIncludes(
    "P21 gate registered",
    packageJson.scripts?.["check-genesis-reality-entry-bridge"] ?? "",
    "node scripts/check-genesis-reality-entry-bridge.mjs",
  );
  assertIncludes(
    "P21 release gate registered",
    packageJson.scripts?.["postcheck:release"] ?? "",
    "npm run check-genesis-reality-entry-bridge",
  );

  const modulePath = path.join(os.tmpdir(), `guanyao-genesis-reality-entry-bridge-${process.pid}.mjs`);
  await build({
    stdin: {
      contents: `export { reviewGenesisRealityEntryBridge } from "./src/services/genesisRealityEntryBridge.ts";`,
      resolveDir: rootDir,
      sourcefile: "genesis-reality-entry-bridge-gate-entry.ts",
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
  const completionBoundary = Object.freeze({
    completionReviewOnly: true,
    genesisLayerOnly: true,
    realityEntryBoundaryHeld: true,
    noRealityCalculation: true,
    noPressureAnalysis: true,
    noGravity: true,
    noChoice: true,
    noCrystal: true,
    noStorage: true,
    noUserProfile: true,
    noIdentityMutation: true,
    noEngineInvocation: true,
    noRendererInvocation: true,
    noUiFlowMutation: true,
    noVisualStateMutation: true,
    noNewGenesisLayer: true,
  });
  const completionReady = Object.freeze({
    status: "READY",
    review: Object.freeze({
      recognitionMoment: "PERSONAL_STAR_BEAST_RECOGNITION_OPEN",
      transitionReadiness: "REALITY_ENTRY_REVIEW_PENDING",
      genesisToRealityBoundary: "GENESIS_TO_REALITY_BOUNDARY_HELD",
      runtimeBoundary: completionBoundary,
    }),
  });
  const ready = runtime.reviewGenesisRealityEntryBridge({
    genesisCompletionReference: completionReady,
  });
  assertEqual("P21 bridge ready after Completion", ready.status, "READY");
  if (ready.status === "READY") {
    assertEqual("P21 preserves Completion reference", ready.bridge.genesisCompletionReference, completionReady);
    assertEqual("P21 recognition is held", ready.bridge.recognitionState, "GENESIS_RECOGNITION_HELD");
    assertEqual("P21 reality remains pending", ready.bridge.realityEntryReadiness, "REALITY_ENTRY_REVIEW_PENDING");
    assertEqual("P21 carries recognition forward", ready.bridge.transitionIntent, "CARRY_RECOGNITION_FORWARD");
    assertEqual("P21 bridge state is ready", ready.bridge.bridgeState, "REALITY_ENTRY_BRIDGE_READY");
    assertEqual("P21 no pressure calculation", ready.boundary.noPressureCalculation, true);
    assertEqual("P21 no gravity calculation", ready.boundary.noGravityCalculation, true);
    assertEqual("P21 no Choice calculation", ready.boundary.noChoiceCalculation, true);
    assertEqual("P21 no Crystal generation", ready.boundary.noCrystalGeneration, true);
  }
  const missing = runtime.reviewGenesisRealityEntryBridge({ genesisCompletionReference: null });
  assertEqual("P21 missing Completion unavailable", missing.status, "UNAVAILABLE");
  assertEqual("P21 missing Completion reason", missing.reason, "GENESIS_COMPLETION_REFERENCE_REQUIRED");
  const blocked = runtime.reviewGenesisRealityEntryBridge({
    genesisCompletionReference: Object.freeze({ status: "BLOCKED" }),
  });
  assertEqual("P21 blocked Completion remains blocked", blocked.status, "BLOCKED");
  assertEqual("P21 blocked Completion reason", blocked.reason, "GENESIS_COMPLETION_REVIEW_BLOCKED");
  const invalid = runtime.reviewGenesisRealityEntryBridge({
    genesisCompletionReference: Object.freeze({
      ...completionReady,
      review: Object.freeze({
        ...completionReady.review,
        runtimeBoundary: Object.freeze({ ...completionBoundary, noRealityCalculation: false }),
      }),
    }),
  });
  assertEqual("P21 invalid Completion boundary blocked", invalid.status, "BLOCKED");
  assertEqual("P21 invalid Completion reason", invalid.reason, "GENESIS_COMPLETION_BOUNDARY_INVALID");
}

if (failures.length > 0) {
  console.error("\nGenesis Reality Entry Bridge gate failed:");
  failures.forEach((failure) => console.error(`- ${failure}`));
  process.exit(1);
}
console.log("\nGenesis Reality Entry Bridge gate passed.");
