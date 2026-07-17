import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import process from "node:process";
import { build } from "esbuild";

const rootDir = process.cwd();
const files = Object.freeze({
  type: "src/types/genesisExperienceRuntimeReview.ts",
  service: "src/services/genesisExperienceRuntimeReview.ts",
  protocol: "docs/GUANYAO_GENESIS_EXPERIENCE_RUNTIME_REVIEW_PROTOCOL.md",
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
const absolute = Object.fromEntries(Object.entries(files).map(([name, relative]) => [name, path.join(rootDir, relative)]));

for (const [name, filePath] of Object.entries(absolute)) {
  if (!fs.existsSync(filePath)) failures.push(`${name} missing=${filePath}`);
  else console.log(`PASS | ${name} file exists`);
}

if (failures.length === 0) {
  const source = Object.fromEntries(Object.entries(absolute).map(([name, filePath]) => [name, fs.readFileSync(filePath, "utf8")]));
  const packageJson = JSON.parse(source.packageManifest);

  [
    "GenesisExperienceRuntimeReview",
    "experienceSequence",
    "transitionState",
    "temporalFlow",
    "userParticipationPoint",
    "revealJourneyState",
    "runtimeBoundary",
    "TIME_DELIVERY_ONLY",
    "SLOW_CONTINUOUS_REVEAL",
    "MOON",
    "STAR",
    "TIME",
    "SYMBOL",
    "HEXAGRAM",
    "FORCE",
    "BEAST",
    "MOON_TO_STAR",
    "STAR_TO_TIME",
    "TIME_TO_SYMBOL",
    "SYMBOL_TO_HEXAGRAM",
    "HEXAGRAM_TO_FORCE",
    "FORCE_TO_BEAST",
  ].forEach((marker) => assertIncludes("P9 runtime review type", source.type, marker));

  [
    "export function reviewGenesisExperienceRuntime",
    "FULL_SEQUENCE_REVIEW_REQUIRED",
    "FULL_SEQUENCE_REVIEW_UNAVAILABLE",
    "FULL_SEQUENCE_REVIEW_BLOCKED",
    "EXPERIENCE_TRANSITION_STATE_INVALID",
    "CAUSALLY_CONTINUOUS",
    "visualStateOrchestrationOnly",
    "timelineDefinitionOnly",
    "transitionDefinitionOnly",
    "userExperienceDefinitionOnly",
    "noIdentityCalculation",
    "noEngineResultConsumption",
    "noRendererCommand",
    "noStorageState",
    "noRealityPressure",
    "noGravity",
    "noChoice",
    "noCrystal",
    "noFormalRuntimeIntegration",
    "noUiMutation",
    "noVisualStateMutation",
  ].forEach((marker) => assertIncludes("P9 runtime review service", source.service, marker));

  [
    "resolveStarbeastFromBirthDate",
    "resolveLifeArchetypeProfileFromMotherCode",
    "runMotherCodeLandingEngine",
    "runLifeArchetypeEngine",
    "runHexagramCalculation",
    "runFourSymbolEngine",
    "createRenderer",
    "buildSceneModel",
    "createRenderPlan",
    "localStorage",
    "sessionStorage",
    "fetch(",
    "document.",
    "import \\\"../services",
  ].forEach((marker) => assertExcludes("P9 runtime review remains contract-only", source.service, marker));

  [
    "RC-GUANYAO-GENESIS-EXPERIENCE-RUNTIME-INTEGRATION-REVIEW-P9",
    "月｜进入",
    "星｜发现",
    "时｜交付",
    "象｜显影",
    "卦｜印记",
    "力｜苏醒",
    "兽｜归来",
    "交付生命时序",
    "月华照见星河",
    "时间进入已有秩序",
    "时序改变星辰关系",
    "变化沉积印记",
    "规律唤醒动力",
    "动力形成生命存在",
    "不选择四象",
    "不接入 Reality Pressure、Gravity、Choice、Crystal",
  ].forEach((marker) => assertIncludes("P9 protocol", source.protocol, marker));

  [
    "GenesisExperienceRuntimeReview",
    "GenesisExperienceRuntimeReviewInput",
    "GenesisExperienceRuntimeReviewResult",
    "GenesisExperienceRuntimeBoundary",
    "from \"./genesisExperienceRuntimeReview\"",
  ].forEach((marker) => assertIncludes("P9 type index export", source.typeIndex, marker));
  assertIncludes("P9 gate registered", packageJson.scripts?.["check-genesis-experience-runtime-review"] ?? "", "node scripts/check-genesis-experience-runtime-review.mjs");
  assertIncludes("P9 release gate registered", packageJson.scripts?.["postcheck:release"] ?? "", "npm run check-genesis-experience-runtime-review");

  const modulePath = path.join(os.tmpdir(), `guanyao-genesis-experience-runtime-review-${process.pid}.mjs`);
  await build({
    stdin: {
      contents: `export { reviewGenesisExperienceRuntime } from "./src/services/genesisExperienceRuntimeReview.ts";`,
      resolveDir: rootDir,
      sourcefile: "genesis-experience-runtime-review-gate-entry.ts",
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
  const fullReview = Object.freeze({
    sequenceIntegrity: "SEVEN_LAYER_SEQUENCE_INTACT",
    transitionQuality: "CAUSALLY_CONTINUOUS",
    semanticContinuity: "LIFE_JOURNEY_CONTINUOUS",
    visualCausality: "UPSTREAM_VISUAL_STATE_DRIVES_NEXT_LAYER",
    revealJourneyState: "PERSONAL_STAR_BEAST_PRESENCE_ARRIVED",
    sequence: ["MOON", "STAR", "TIME", "SYMBOL", "HEXAGRAM", "FORCE", "BEAST"],
    transitions: ["MOON_TO_STAR", "STAR_TO_TIME", "TIME_TO_SYMBOL", "SYMBOL_TO_HEXAGRAM", "HEXAGRAM_TO_FORCE", "FORCE_TO_BEAST"],
    boundary: {
      genesisIntegrationOnly: true,
      visualStatesConsumedAsUpstream: true,
      identityUntouched: true,
      userDataUntouched: true,
      engineResultsUntouched: true,
      rendererCommandsUntouched: true,
      realityUntouched: true,
      gravityUntouched: true,
      choiceUntouched: true,
      crystalUntouched: true,
      storageUntouched: true,
    },
  });
  const fullReviewResult = Object.freeze({
    status: "READY",
    reviewStatus: "GENESIS_FULL_SEQUENCE_REVIEW_READY",
    source: "genesis_full_sequence_review",
    input: Object.freeze({}),
    review: fullReview,
    boundary: fullReview.boundary,
  });
  const input = Object.freeze({ fullSequenceReviewResult: fullReviewResult });
  const ready = runtime.reviewGenesisExperienceRuntime(input);
  assertEqual("runtime review is ready", ready.status, "READY");
  if (ready.status === "READY") {
    assertEqual("runtime sequence count", ready.review.experienceSequence.length, 7);
    assertEqual("runtime transition count", ready.review.transitions.length, 6);
    assertEqual("only user participation point", ready.review.userParticipationPoint, "TIME_DELIVERY_ONLY");
    assertEqual("temporal flow is continuous", ready.review.temporalFlow, "SLOW_CONTINUOUS_REVEAL");
    assertEqual("runtime is review-only", ready.runtimeBoundary.reviewOnly, true);
    assertEqual("no formal runtime integration", ready.runtimeBoundary.noFormalRuntimeIntegration, true);
    assertEqual("reality remains untouched", ready.runtimeBoundary.noRealityPressure, true);
    assertEqual("crystal remains untouched", ready.runtimeBoundary.noCrystal, true);
  }
  const missing = runtime.reviewGenesisExperienceRuntime(Object.freeze({ fullSequenceReviewResult: null }));
  assertEqual("missing P8 review unavailable", missing.status, "UNAVAILABLE");
  assertEqual("missing P8 reason", missing.reason, "FULL_SEQUENCE_REVIEW_REQUIRED");
  const upstreamUnavailable = runtime.reviewGenesisExperienceRuntime(Object.freeze({
    fullSequenceReviewResult: Object.freeze({ status: "UNAVAILABLE" }),
  }));
  assertEqual("unavailable P8 remains unavailable", upstreamUnavailable.status, "UNAVAILABLE");
  assertEqual("unavailable P8 reason", upstreamUnavailable.reason, "FULL_SEQUENCE_REVIEW_UNAVAILABLE");
  const upstreamBlocked = runtime.reviewGenesisExperienceRuntime(Object.freeze({
    fullSequenceReviewResult: Object.freeze({ status: "BLOCKED" }),
  }));
  assertEqual("blocked P8 remains blocked", upstreamBlocked.status, "BLOCKED");
  assertEqual("blocked P8 reason", upstreamBlocked.reason, "FULL_SEQUENCE_REVIEW_BLOCKED");
  const drifted = runtime.reviewGenesisExperienceRuntime(Object.freeze({
    fullSequenceReviewResult: Object.freeze({
      ...fullReviewResult,
      review: Object.freeze({ ...fullReview, transitionQuality: "BROKEN" }),
    }),
  }));
  assertEqual("runtime transition drift blocked", drifted.status, "BLOCKED");
  assertEqual("runtime transition drift reason", drifted.reason, "EXPERIENCE_TRANSITION_STATE_INVALID");
}

if (failures.length > 0) {
  console.error("\nGenesis experience runtime review gate failed:");
  failures.forEach((failure) => console.error(`- ${failure}`));
  process.exit(1);
}
console.log("\nGenesis experience runtime review gate passed.");
