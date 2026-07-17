import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import process from "node:process";
import { build } from "esbuild";

const rootDir = process.cwd();
const files = Object.freeze({
  type: "src/types/genesisRuntimeExperienceReadiness.ts",
  service: "src/services/genesisRuntimeExperienceReadiness.ts",
  protocol: "docs/GUANYAO_GENESIS_RUNTIME_EXPERIENCE_READINESS_PROTOCOL.md",
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
    "GenesisRuntimeExperienceReadiness",
    "runtimeSequenceContract",
    "visualStateConsumption",
    "transitionContract",
    "interactionBoundary",
    "rendererConsumptionBoundary",
    "readinessState",
    "MOON_TO_COMPLETION_IN_ORDER",
    "READ_ONLY_UPSTREAM_GENESIS_VISUAL_STATES",
    "CAUSALLY_CONTINUOUS_SLOW_REVEAL",
    "TIME_DELIVERY_ONLY",
    "VISUAL_STATE_TO_RENDERER_ONLY",
    "READY_FOR_RUNTIME_EXPERIENCE_IMPLEMENTATION",
    "COMPLETION",
    "BEAST_TO_COMPLETION",
    "completionMomentReviewResult",
    "noFormalRuntimeIntegration",
    "noRendererInvocation",
    "noUiRendering",
    "noUserInputHandling",
    "noIdentityCalculation",
    "noEngineResultConsumption",
    "noStorageState",
    "noRealityPressure",
    "noGravity",
    "noChoice",
    "noCrystal",
  ].forEach((marker) => assertIncludes("P11 readiness type", source.type, marker));

  [
    "COMPLETION_MOMENT_REVIEW_REQUIRED",
    "COMPLETION_MOMENT_REVIEW_UNAVAILABLE",
    "COMPLETION_MOMENT_REVIEW_BLOCKED",
    "GENESIS_RUNTIME_SEQUENCE_CONTRACT_INVALID",
    "VISUAL_STATE_CONSUMPTION_BOUNDARY_INVALID",
    "TRANSITION_CONTRACT_INVALID",
    "INTERACTION_BOUNDARY_INVALID",
    "RENDERER_CONSUMPTION_BOUNDARY_INVALID",
    "COMPLETION_RUNTIME_BOUNDARY_INVALID",
  ].forEach((marker) => assertIncludes("P11 readiness type", source.type, marker));

  [
    "export function reviewGenesisRuntimeExperienceReadiness",
    "MOON_TO_COMPLETION_IN_ORDER",
    "READ_ONLY_UPSTREAM_GENESIS_VISUAL_STATES",
    "CAUSALLY_CONTINUOUS_SLOW_REVEAL",
    "TIME_DELIVERY_ONLY",
    "VISUAL_STATE_TO_RENDERER_ONLY",
    "BEAST_TO_COMPLETION",
    "noFormalRuntimeIntegration",
    "rendererConsumesVisualStateOnly",
  ].forEach((marker) => assertIncludes("P11 readiness service", source.service, marker));

  [
    "runMotherCodeLandingEngine",
    "runLifeArchetypeEngine",
    "runHexagramCalculation",
    "runFourSymbolEngine",
    "resolveStarbeastFromBirthDate",
    "createRenderer",
    "createRenderPlan",
    "render(",
    "handleUserInput",
    "localStorage",
    "sessionStorage",
    "fetch(",
    "document.",
  ].forEach((marker) => assertExcludes("P11 readiness remains boundary-only", source.service, marker));

  [
    "RC-GUANYAO-GENESIS-RUNTIME-EXPERIENCE-IMPLEMENTATION-READINESS-P11",
    "P1–P10 Genesis 显化链",
    "MOON → STAR → TIME → SYMBOL → HEXAGRAM → FORCE → BEAST → COMPLETION",
    "视觉状态编排",
    "时间轴",
    "转场",
    "交付生命时序",
    "Renderer 只负责表现",
    "READY_FOR_RUNTIME_EXPERIENCE_IMPLEMENTATION",
    "Readiness ≠ Runtime Implementation",
    "不接入：Renderer 调用、UI 渲染、用户输入处理",
    "Reality Pressure、Gravity、Choice、Crystal",
  ].forEach((marker) => assertIncludes("P11 protocol", source.protocol, marker));

  [
    "GenesisRuntimeExperienceReadiness",
    "GenesisRuntimeExperienceReadinessInput",
    "GenesisRuntimeExperienceReadinessResult",
    "GenesisRuntimeExperienceReadinessBoundary",
    "from \"./genesisRuntimeExperienceReadiness\"",
  ].forEach((marker) => assertIncludes("P11 type index export", source.typeIndex, marker));
  assertIncludes("P11 gate registered", packageJson.scripts?.["check-genesis-runtime-experience-readiness"] ?? "", "node scripts/check-genesis-runtime-experience-readiness.mjs");
  assertIncludes("P11 release gate registered", packageJson.scripts?.["postcheck:release"] ?? "", "npm run check-genesis-runtime-experience-readiness");

  const modulePath = path.join(os.tmpdir(), `guanyao-genesis-runtime-experience-readiness-${process.pid}.mjs`);
  await build({
    stdin: {
      contents: `export { reviewGenesisRuntimeExperienceReadiness } from "./src/services/genesisRuntimeExperienceReadiness.ts";`,
      resolveDir: rootDir,
      sourcefile: "genesis-runtime-experience-readiness-gate-entry.ts",
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
    visualStateOrchestrationOnly: true,
    timelineDefinitionOnly: true,
    transitionDefinitionOnly: true,
    userExperienceDefinitionOnly: true,
    noIdentityCalculation: true,
    noEngineResultConsumption: true,
    noRendererCommand: true,
    noStorageState: true,
    noRealityPressure: true,
    noGravity: true,
    noChoice: true,
    noCrystal: true,
    noUserBinding: true,
    noFormalRuntimeIntegration: true,
    noUiMutation: true,
    noVisualStateMutation: true,
  });
  const runtimeResult = Object.freeze({
    status: "READY",
    reviewStatus: "GENESIS_EXPERIENCE_RUNTIME_REVIEW_READY",
    source: "genesis_experience_runtime_review",
    input: Object.freeze({}),
    review: runtimeReview,
    runtimeBoundary,
  });
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
  const completionResult = Object.freeze({
    status: "READY",
    reviewStatus: "GENESIS_COMPLETION_MOMENT_REVIEW_READY",
    source: "genesis_completion_moment_review",
    input: Object.freeze({}),
    review: Object.freeze({
      completionState: "GENESIS_PRESENCE_STABILIZED",
      recognitionMoment: "PERSONAL_STAR_BEAST_RECOGNITION_OPEN",
      presenceStability: "QUIET_PRESENCE_STABLE",
      transitionReadiness: "REALITY_ENTRY_REVIEW_PENDING",
      emotionalClosure: "GENESIS_CLOSURE_OPEN_NOT_FINAL",
      genesisToRealityBoundary: "GENESIS_TO_REALITY_BOUNDARY_HELD",
      experienceRuntimeReviewReference: runtimeResult,
    }),
    runtimeBoundary: completionBoundary,
  });
  const input = Object.freeze({ completionMomentReviewResult: completionResult });
  const ready = runtime.reviewGenesisRuntimeExperienceReadiness(input);
  assertEqual("runtime readiness is ready", ready.status, "READY");
  if (ready.status === "READY") {
    assertEqual("runtime sequence ends at completion", ready.readinessContract.runtimeSequence[7], "COMPLETION");
    assertEqual("runtime transition count", ready.readinessContract.transitions.length, 7);
    assertEqual("visual state consumption is read-only", ready.readinessContract.visualStateConsumption, "READ_ONLY_UPSTREAM_GENESIS_VISUAL_STATES");
    assertEqual("only user participation point", ready.readinessContract.interactionBoundary, "TIME_DELIVERY_ONLY");
    assertEqual("renderer receives visual state only", ready.readinessContract.rendererConsumptionBoundary, "VISUAL_STATE_TO_RENDERER_ONLY");
    assertEqual("no formal runtime integration", ready.boundary.noFormalRuntimeIntegration, true);
    assertEqual("no user input handling", ready.boundary.noUserInputHandling, true);
    assertEqual("no Reality", ready.boundary.noRealityPressure, true);
    assertEqual("no Crystal", ready.boundary.noCrystal, true);
  }
  const missing = runtime.reviewGenesisRuntimeExperienceReadiness(Object.freeze({ completionMomentReviewResult: null }));
  assertEqual("missing completion review unavailable", missing.status, "UNAVAILABLE");
  assertEqual("missing completion reason", missing.reason, "COMPLETION_MOMENT_REVIEW_REQUIRED");
  const upstreamUnavailable = runtime.reviewGenesisRuntimeExperienceReadiness(Object.freeze({ completionMomentReviewResult: Object.freeze({ status: "UNAVAILABLE" }) }));
  assertEqual("unavailable completion remains unavailable", upstreamUnavailable.status, "UNAVAILABLE");
  assertEqual("unavailable completion reason", upstreamUnavailable.reason, "COMPLETION_MOMENT_REVIEW_UNAVAILABLE");
  const upstreamBlocked = runtime.reviewGenesisRuntimeExperienceReadiness(Object.freeze({ completionMomentReviewResult: Object.freeze({ status: "BLOCKED" }) }));
  assertEqual("blocked completion remains blocked", upstreamBlocked.status, "BLOCKED");
  assertEqual("blocked completion reason", upstreamBlocked.reason, "COMPLETION_MOMENT_REVIEW_BLOCKED");
  const drifted = runtime.reviewGenesisRuntimeExperienceReadiness(Object.freeze({
    completionMomentReviewResult: Object.freeze({
      ...completionResult,
      runtimeBoundary: Object.freeze({ ...completionBoundary, noCrystal: false }),
    }),
  }));
  assertEqual("completion boundary drift blocked", drifted.status, "BLOCKED");
  assertEqual("completion boundary drift reason", drifted.reason, "COMPLETION_RUNTIME_BOUNDARY_INVALID");
}

if (failures.length > 0) {
  console.error("\nGenesis runtime experience readiness gate failed:");
  failures.forEach((failure) => console.error(`- ${failure}`));
  process.exit(1);
}
console.log("\nGenesis runtime experience readiness gate passed.");
