import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import process from "node:process";
import { build } from "esbuild";

const rootDir = process.cwd();
const files = Object.freeze({
  type: "src/types/genesisCompletionMomentReview.ts",
  service: "src/services/genesisCompletionMomentReview.ts",
  protocol: "docs/GUANYAO_GENESIS_COMPLETION_MOMENT_REVIEW_PROTOCOL.md",
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
    "GenesisCompletionMomentReview",
    "completionState",
    "recognitionMoment",
    "presenceStability",
    "transitionReadiness",
    "emotionalClosure",
    "GENESIS_PRESENCE_STABILIZED",
    "PERSONAL_STAR_BEAST_RECOGNITION_OPEN",
    "QUIET_PRESENCE_STABLE",
    "REALITY_ENTRY_REVIEW_PENDING",
    "GENESIS_CLOSURE_OPEN_NOT_FINAL",
    "GenesisToRealityBoundary",
    "runtimeBoundary",
    "noRealityCalculation",
    "noCrystal",
    "noStorage",
    "noNewGenesisLayer",
  ].forEach((marker) => assertIncludes("P10 completion type", source.type, marker));

  [
    "export function reviewGenesisCompletionMoment",
    "EXPERIENCE_RUNTIME_REVIEW_REQUIRED",
    "EXPERIENCE_RUNTIME_REVIEW_UNAVAILABLE",
    "EXPERIENCE_RUNTIME_REVIEW_BLOCKED",
    "GENESIS_RUNTIME_SEQUENCE_INVALID",
    "GENESIS_PRESENCE_STABILIZED",
    "PERSONAL_STAR_BEAST_RECOGNITION_OPEN",
    "REALITY_ENTRY_REVIEW_PENDING",
    "GENESIS_TO_REALITY_BOUNDARY_HELD",
    "completionReviewOnly",
    "genesisLayerOnly",
    "realityEntryBoundaryHeld",
    "noRealityCalculation",
    "noPressureAnalysis",
    "noGravity",
    "noChoice",
    "noCrystal",
    "noStorage",
    "noUserProfile",
    "noIdentityMutation",
    "noEngineInvocation",
    "noRendererInvocation",
    "noUiFlowMutation",
    "noVisualStateMutation",
    "noNewGenesisLayer",
  ].forEach((marker) => assertIncludes("P10 completion service", source.service, marker));

  [
    "resolveStarbeastFromBirthDate",
    "resolveLifeArchetypeProfileFromMotherCode",
    "runMotherCodeLandingEngine",
    "runLifeArchetypeEngine",
    "runHexagramCalculation",
    "runFourSymbolEngine",
    "createReality",
    "calculateReality",
    "analyzePressure",
    "generateCrystal",
    "createRenderer",
    "createRenderPlan",
    "localStorage",
    "sessionStorage",
    "fetch(",
    "document.",
  ].forEach((marker) => assertExcludes("P10 completion remains boundary-only", source.service, marker));

  [
    "RC-GUANYAO-GENESIS-COMPLETION-MOMENT-REVIEW-P10",
    "Genesis 七层显化完成后",
    "停驻与认领瞬间",
    "星兽出现不是结束",
    "停驻（Presence）",
    "认领（Recognition）",
    "过渡准备（Transition）",
    "我看见它",
    "接下来，我开始经历现实",
    "Genesis\n回答：我从哪里来",
    "Reality\n回答：我正在经历什么",
    "不接入 Reality、Pressure、Gravity、Choice、Crystal、Storage 或 User Profile",
    "不创建新的 Genesis 生命层",
  ].forEach((marker) => assertIncludes("P10 protocol", source.protocol, marker));

  [
    "GenesisCompletionMomentReview",
    "GenesisCompletionMomentReviewInput",
    "GenesisCompletionMomentReviewResult",
    "GenesisCompletionRuntimeBoundary",
    "from \"./genesisCompletionMomentReview\"",
  ].forEach((marker) => assertIncludes("P10 type index export", source.typeIndex, marker));
  assertIncludes("P10 gate registered", packageJson.scripts?.["check-genesis-completion-moment-review"] ?? "", "node scripts/check-genesis-completion-moment-review.mjs");
  assertIncludes("P10 release gate registered", packageJson.scripts?.["postcheck:release"] ?? "", "npm run check-genesis-completion-moment-review");

  const modulePath = path.join(os.tmpdir(), `guanyao-genesis-completion-moment-review-${process.pid}.mjs`);
  await build({
    stdin: {
      contents: `export { reviewGenesisCompletionMoment } from "./src/services/genesisCompletionMomentReview.ts";`,
      resolveDir: rootDir,
      sourcefile: "genesis-completion-moment-review-gate-entry.ts",
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
  const runtimeReview = Object.freeze({
    experienceSequence: ["MOON", "STAR", "TIME", "SYMBOL", "HEXAGRAM", "FORCE", "BEAST"],
    transitionState: "CAUSALLY_CONTINUOUS",
    temporalFlow: "SLOW_CONTINUOUS_REVEAL",
    userParticipationPoint: "TIME_DELIVERY_ONLY",
    revealJourneyState: "SEVEN_LAYER_REVEAL_RUNTIME_REVIEW_READY",
    transitions: ["MOON_TO_STAR", "STAR_TO_TIME", "TIME_TO_SYMBOL", "SYMBOL_TO_HEXAGRAM", "HEXAGRAM_TO_FORCE", "FORCE_TO_BEAST"],
  });
  const runtimeBoundary = Object.freeze({
    reviewOnly: true,
    noFormalRuntimeIntegration: true,
    noRealityPressure: true,
    noGravity: true,
    noChoice: true,
    noCrystal: true,
    noStorageState: true,
  });
  const runtimeResult = Object.freeze({
    status: "READY",
    reviewStatus: "GENESIS_EXPERIENCE_RUNTIME_REVIEW_READY",
    source: "genesis_experience_runtime_review",
    input: Object.freeze({}),
    review: runtimeReview,
    runtimeBoundary,
  });
  const input = Object.freeze({ experienceRuntimeReviewResult: runtimeResult });
  const ready = runtime.reviewGenesisCompletionMoment(input);
  assertEqual("completion review is ready", ready.status, "READY");
  if (ready.status === "READY") {
    assertEqual("completion state is stabilized", ready.review.completionState, "GENESIS_PRESENCE_STABILIZED");
    assertEqual("recognition remains open", ready.review.recognitionMoment, "PERSONAL_STAR_BEAST_RECOGNITION_OPEN");
    assertEqual("presence is stable", ready.review.presenceStability, "QUIET_PRESENCE_STABLE");
    assertEqual("reality entry remains pending", ready.review.transitionReadiness, "REALITY_ENTRY_REVIEW_PENDING");
    assertEqual("closure is not final", ready.review.emotionalClosure, "GENESIS_CLOSURE_OPEN_NOT_FINAL");
    assertEqual("boundary is held", ready.review.genesisToRealityBoundary, "GENESIS_TO_REALITY_BOUNDARY_HELD");
    assertEqual("no Reality calculation", ready.runtimeBoundary.noRealityCalculation, true);
    assertEqual("no Crystal connection", ready.runtimeBoundary.noCrystal, true);
    assertEqual("no new Genesis layer", ready.runtimeBoundary.noNewGenesisLayer, true);
  }
  const missing = runtime.reviewGenesisCompletionMoment(Object.freeze({ experienceRuntimeReviewResult: null }));
  assertEqual("missing runtime review unavailable", missing.status, "UNAVAILABLE");
  assertEqual("missing runtime reason", missing.reason, "EXPERIENCE_RUNTIME_REVIEW_REQUIRED");
  const upstreamUnavailable = runtime.reviewGenesisCompletionMoment(Object.freeze({
    experienceRuntimeReviewResult: Object.freeze({ status: "UNAVAILABLE" }),
  }));
  assertEqual("unavailable runtime remains unavailable", upstreamUnavailable.status, "UNAVAILABLE");
  assertEqual("unavailable runtime reason", upstreamUnavailable.reason, "EXPERIENCE_RUNTIME_REVIEW_UNAVAILABLE");
  const upstreamBlocked = runtime.reviewGenesisCompletionMoment(Object.freeze({
    experienceRuntimeReviewResult: Object.freeze({ status: "BLOCKED" }),
  }));
  assertEqual("blocked runtime remains blocked", upstreamBlocked.status, "BLOCKED");
  assertEqual("blocked runtime reason", upstreamBlocked.reason, "EXPERIENCE_RUNTIME_REVIEW_BLOCKED");
  const drifted = runtime.reviewGenesisCompletionMoment(Object.freeze({
    experienceRuntimeReviewResult: Object.freeze({
      ...runtimeResult,
      runtimeBoundary: Object.freeze({ ...runtimeBoundary, noCrystal: false }),
    }),
  }));
  assertEqual("invalid runtime boundary blocked", drifted.status, "BLOCKED");
  assertEqual("invalid runtime boundary reason", drifted.reason, "GENESIS_RUNTIME_SEQUENCE_INVALID");
}

if (failures.length > 0) {
  console.error("\nGenesis completion moment review gate failed:");
  failures.forEach((failure) => console.error(`- ${failure}`));
  process.exit(1);
}
console.log("\nGenesis completion moment review gate passed.");
