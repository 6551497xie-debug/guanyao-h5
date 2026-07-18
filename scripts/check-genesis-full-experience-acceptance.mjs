import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import process from "node:process";
import { build } from "esbuild";

const rootDir = process.cwd();
const files = Object.freeze({
  type: "src/types/genesisFullExperienceAcceptance.ts",
  service: "src/services/genesisFullExperienceAcceptance.ts",
  typeIndex: "src/types/index.ts",
  packageManifest: "package.json",
});
const failures = [];
const assertIncludes = (name, source, marker) => {
  if (!source.includes(marker)) failures.push(`${name} missing=${marker}`);
  else console.log(`PASS | ${name} | includes=${marker}`);
};
const assertExcludes = (name, source, marker) => {
  if (source.includes(marker)) failures.push(`${name} forbidden=${marker}`);
  else console.log(`PASS | ${name} | forbidden=absent`);
};
const assertEqual = (name, actual, expected) => {
  if (actual !== expected) failures.push(`${name} expected=${String(expected)} actual=${String(actual)}`);
  else console.log(`PASS | ${name} | expected=${String(expected)}`);
};
const absolute = Object.fromEntries(
  Object.entries(files).map(([name, relative]) => [name, path.join(rootDir, relative)]),
);

for (const [name, filePath] of Object.entries(absolute)) {
  if (!fs.existsSync(filePath)) failures.push(`${name} missing=${filePath}`);
  else console.log(`PASS | ${name} file exists`);
}

if (failures.length === 0) {
  const source = Object.fromEntries(
    Object.entries(absolute).map(([name, filePath]) => [name, fs.readFileSync(filePath, "utf8")]),
  );
  const packageJson = JSON.parse(source.packageManifest);

  [
    "GenesisFullExperienceAcceptance",
    "firstImpression",
    "journeyContinuity",
    "lifeRecognition",
    "emotionalCompletion",
    "systemIntegrity",
    "SEMANTIC_MISMATCH",
    "VISUAL_WEIGHT_IMBALANCE",
    "TRANSITION_BREAK",
    "LIFE_PRESENCE_WEAK",
    "OVER_EXPLANATION",
    "MOON_ORIGIN",
    "STAR_RIVER",
    "TIME_RESONANCE",
    "SYMBOL_REVEAL",
    "HEXAGRAM_IMPRINT",
    "LIFE_FORCE",
    "STAR_BEAST_REVEAL",
    "COMPLETION",
    "PENDING_HUMAN_REVIEW",
  ].forEach((marker) => assertIncludes("P19 acceptance type", source.type, marker));

  [
    "reviewGenesisFullExperience",
    "GENESIS_FULL_EXPERIENCE_SEQUENCE",
    "completionReachable",
    "EIGHT_STAGE_SEQUENCE_INVALID",
    "COMPLETION_NOT_REACHABLE",
    "GENESIS_ACCEPTANCE_BOUNDARY_INVALID",
    "PRODUCTION_INTEGRATION_PRESENT",
    "acceptanceReviewOnly",
    "noVisualStateMutation",
    "noRuntimeMutation",
    "noTimelineMutation",
    "noRendererMutation",
    "PENDING_HUMAN_REVIEW",
  ].forEach((marker) => assertIncludes("P19 acceptance service", source.service, marker));

  [
    "resolveStarbeastFromBirthDate",
    "resolveLifeArchetypeProfileFromMotherCode",
    "runMotherCodeLandingEngine",
    "runLifeArchetypeEngine",
    "runHexagramCalculation",
    "runFourSymbolEngine",
    "createRenderer",
    "createRenderPlan",
    "localStorage",
    "sessionStorage",
    "fetch(",
    "document.",
    "window.",
    "requestAnimationFrame",
  ].forEach((marker) => assertExcludes("P19 remains review-only", source.service, marker));

  [
    "GenesisFullExperienceAcceptance",
    "GenesisFullExperienceAcceptanceInput",
    "GenesisFullExperienceAcceptanceResult",
    "GenesisExperienceIssueCategory",
    "from \"./genesisFullExperienceAcceptance\"",
  ].forEach((marker) => assertIncludes("P19 type index export", source.typeIndex, marker));
  assertIncludes(
    "P19 gate registered",
    packageJson.scripts?.["check-genesis-full-experience-acceptance"] ?? "",
    "node scripts/check-genesis-full-experience-acceptance.mjs",
  );

  const modulePath = path.join(os.tmpdir(), `guanyao-genesis-full-experience-acceptance-${process.pid}.mjs`);
  await build({
    stdin: {
      contents: `export { reviewGenesisFullExperience } from "./src/services/genesisFullExperienceAcceptance.ts";`,
      resolveDir: rootDir,
      sourcefile: "genesis-full-experience-acceptance-gate-entry.ts",
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
  const completion = Object.freeze({
    status: "READY",
    reviewStatus: "GENESIS_COMPLETION_MOMENT_REVIEW_READY",
    source: "genesis_completion_moment_review",
    review: Object.freeze({
      completionState: "GENESIS_PRESENCE_STABILIZED",
      recognitionMoment: "PERSONAL_STAR_BEAST_RECOGNITION_OPEN",
      presenceStability: "QUIET_PRESENCE_STABLE",
      genesisToRealityBoundary: "GENESIS_TO_REALITY_BOUNDARY_HELD",
    }),
    runtimeBoundary: completionBoundary,
  });
  const previewBoundary = Object.freeze({
    isolatedPreviewOnly: true,
    devOnly: true,
    noProductionRoute: true,
    noProductionNavigation: true,
    noProductionBuildConsumption: true,
    noIdentity: true,
    noUserData: true,
    noEngineResult: true,
    noEngineInvocation: true,
    noStorage: true,
    noReality: true,
    noGravity: true,
    noChoice: true,
    noCrystal: true,
    noVisualStateMutation: true,
    noRuntimeStateMachineMutation: true,
    noTimelineMutation: true,
    noRendererSemanticMutation: true,
    noAutomaticLoop: true,
    completionRequired: true,
  });
  const preview = Object.freeze({
    status: "READY",
    operation: "COMPLETE",
    source: "genesis_preview_integration",
    integration: Object.freeze({
      previewMode: "ISOLATED_GENESIS_PREVIEW",
      previewLifecycle: "COMPLETED",
      boundary: previewBoundary,
    }),
  });
  const sequence = Object.freeze([
    "MOON_ORIGIN",
    "STAR_RIVER",
    "TIME_RESONANCE",
    "SYMBOL_REVEAL",
    "HEXAGRAM_IMPRINT",
    "LIFE_FORCE",
    "STAR_BEAST_REVEAL",
    "COMPLETION",
  ]);
  const baseInput = {
    completionMomentReviewResult: completion,
    previewIntegrationResult: preview,
    observedSequence: sequence,
    issueCategories: ["VISUAL_WEIGHT_IMBALANCE", "LIFE_PRESENCE_WEAK"],
  };

  const accepted = runtime.reviewGenesisFullExperience(baseInput);
  assertEqual("P19 eight-stage review status", accepted.status, "READY");
  assertEqual("P19 human review status", accepted.reviewStatus, "PENDING_HUMAN_REVIEW");
  assertEqual("P19 completion reachable", accepted.review?.completionReachable, true);
  assertEqual("P19 system integrity", accepted.review?.systemIntegrity, "PASS");
  assertEqual("P19 issue category count", accepted.review?.issueCategories.length, 2);

  const skipped = runtime.reviewGenesisFullExperience({
    ...baseInput,
    observedSequence: sequence.slice(0, 7),
  });
  assertEqual("P19 skipped completion blocked", skipped.reason, "EIGHT_STAGE_SEQUENCE_INVALID");

  const reordered = runtime.reviewGenesisFullExperience({
    ...baseInput,
    observedSequence: Object.freeze([
      "MOON_ORIGIN",
      "STAR_RIVER",
      "SYMBOL_REVEAL",
      "TIME_RESONANCE",
      "HEXAGRAM_IMPRINT",
      "LIFE_FORCE",
      "STAR_BEAST_REVEAL",
      "COMPLETION",
    ]),
  });
  assertEqual("P19 reordered sequence blocked", reordered.reason, "EIGHT_STAGE_SEQUENCE_INVALID");

  const production = runtime.reviewGenesisFullExperience({
    ...baseInput,
    previewIntegrationResult: {
      ...preview,
      integration: {
        ...preview.integration,
        previewLifecycle: "COMPLETED",
        boundary: { ...previewBoundary, noProductionRoute: false },
      },
    },
  });
  assertEqual("P19 production integration blocked", production.reason, "PRODUCTION_INTEGRATION_PRESENT");
}

if (failures.length > 0) {
  console.error(`FAIL | check-genesis-full-experience-acceptance | count=${failures.length}`);
  for (const failure of failures) console.error(`- ${failure}`);
  process.exitCode = 1;
} else {
  console.log("PASS | check-genesis-full-experience-acceptance");
}
