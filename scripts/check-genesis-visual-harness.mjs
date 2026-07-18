import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import process from "node:process";
import { build } from "esbuild";

const rootDir = process.cwd();
const files = Object.freeze({
  type: "src/types/genesisVisualHarness.ts",
  service: "src/services/genesisVisualHarness.ts",
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
    "GenesisVisualHarness",
    "harnessMode",
    "ISOLATED_GENESIS_PREVIEW",
    "runtimeSequenceReference",
    "timelineReference",
    "rendererConsumerReference",
    "previewState",
    "currentStage",
    "transitionState",
    "timelineState",
    "rendererConsumerInput",
    "START",
    "END",
    "isolatedPreviewOnly",
    "devOnly",
    "noProductionRoute",
    "noProductionBuildConsumption",
    "noIdentity",
    "noUserData",
    "noEngineResult",
    "noStorageReference",
    "noVisualStateMutation",
    "noStageSkipping",
    "noAutomaticLoop",
    "completionRequired",
  ].forEach((marker) => assertIncludes("P15 harness type", source.type, marker));

  [
    "startGenesisVisualHarness",
    "advanceGenesisVisualHarness",
    "endGenesisVisualHarness",
    "GENESIS_VISUAL_HARNESS_BOUNDARY",
    "STAGE_SEQUENCE",
    "MOON_ORIGIN",
    "STAR_RIVER",
    "TIME_RESONANCE",
    "SYMBOL_REVEAL",
    "HEXAGRAM_IMPRINT",
    "LIFE_FORCE",
    "STAR_BEAST_REVEAL",
    "COMPLETION",
    "hasRuntimeBoundary",
    "hasTimelineBoundary",
    "hasRendererConsumerBoundary",
    "hasHarnessInputBoundary",
    "hasSessionBoundary",
    "HARNESS_STAGE_SKIP_FORBIDDEN",
    "HARNESS_PARALLEL_STAGE_FORBIDDEN",
    "COMPLETION_REQUIRED",
    "COMPLETION_ALREADY_REACHED",
    "HARNESS_NOT_COMPLETED",
    "ISOLATED_GENESIS_PREVIEW",
  ].forEach((marker) => assertIncludes("P15 harness service", source.service, marker));

  [
    "runMotherCodeLandingEngine",
    "runLifeArchetypeEngine",
    "runHexagramCalculation",
    "runFourSymbolEngine",
    "resolveStarbeastFromBirthDate",
    "createRenderer",
    "createRenderPlan",
    "setInterval",
    "setTimeout",
    "requestAnimationFrame",
    "window.",
    "document.",
    "localStorage",
    "sessionStorage",
    "fetch(",
    "navigate(",
  ].forEach((marker) => assertExcludes("P15 harness remains orchestration-only", source.service, marker));

  [
    "GenesisVisualHarness",
    "GenesisVisualHarnessInput",
    "GenesisVisualHarnessAdvanceInput",
    "GenesisVisualHarnessResult",
    "GenesisVisualHarnessBoundary",
    "from \"./genesisVisualHarness\"",
  ].forEach((marker) => assertIncludes("P15 type index export", source.typeIndex, marker));
  assertIncludes("P15 gate registered", packageJson.scripts?.["check-genesis-visual-harness"] ?? "", "node scripts/check-genesis-visual-harness.mjs");
  assertIncludes("P15 release gate registered", packageJson.scripts?.["postcheck:release"] ?? "", "npm run check-genesis-visual-harness");

  const modulePath = path.join(os.tmpdir(), `guanyao-genesis-visual-harness-${process.pid}.mjs`);
  await build({
    stdin: {
      contents: `export { startGenesisVisualHarness, advanceGenesisVisualHarness, endGenesisVisualHarness } from "./src/services/genesisVisualHarness.ts";`,
      resolveDir: rootDir,
      sourcefile: "genesis-visual-harness-gate-entry.ts",
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

  const runtimeBoundary = Object.freeze({
    stateMachineOnly: true,
    sequenceOrchestrationOnly: true,
    noVisualStateMutation: true,
    noVisualStateCreation: true,
    noIdentity: true,
    noUserData: true,
    noEngineResult: true,
    noRendererCommand: true,
    noRendererInvocation: true,
    noSceneModelMutation: true,
    noRenderPlanMutation: true,
    noReality: true,
    noGravity: true,
    noChoice: true,
    noCrystal: true,
    noStorage: true,
    noParallelGenesisStages: true,
    noStageReordering: true,
    userInputOnlyAtTimeResonance: true,
  });
  const timelineBoundary = Object.freeze({
    timelineDefinitionOnly: true,
    noFastRhythm: true,
    noRendererAnimation: true,
    noWebGL: true,
    noShader: true,
    noParticleParameters: true,
    noVisualStateMutation: true,
    noIdentityMutation: true,
    noEngineInvocation: true,
    noStorageWrite: true,
    noUserFlowIntegration: true,
    noReality: true,
    noGravity: true,
    noChoice: true,
    noCrystal: true,
  });
  const stages = [
    "MOON_ORIGIN",
    "STAR_RIVER",
    "TIME_RESONANCE",
    "SYMBOL_REVEAL",
    "HEXAGRAM_IMPRINT",
    "LIFE_FORCE",
    "STAR_BEAST_REVEAL",
    "COMPLETION",
  ];
  const runtimeFor = (stageIndex) => Object.freeze({
    currentStage: stages[stageIndex],
    previousStage: stageIndex === 0 ? null : stages[stageIndex - 1],
    nextStage: stageIndex === stages.length - 1 ? null : stages[stageIndex + 1],
    transitionState: "ENTERING",
    sequenceStatus: stageIndex === stages.length - 1 ? "COMPLETED" : "RUNNING",
    readinessReference: Object.freeze({ status: "READY" }),
    boundary: runtimeBoundary,
  });
  const timelineFor = (runtimeReference) => Object.freeze({
    stages: Object.freeze(stages.map((stage) => Object.freeze({
      stage,
      stageDuration: stage === "COMPLETION" ? "COMPLETION_HOLD" : "SLOWLY_FLOWING",
      transitionDuration: stage === "COMPLETION" ? "NO_AUTOMATIC_TRANSITION" : "GRADUAL",
      rhythmProfile: stage === "TIME_RESONANCE" || stage === "HEXAGRAM_IMPRINT" ? "RESPONSE" : stage === "MOON_ORIGIN" || stage === "STAR_BEAST_REVEAL" || stage === "COMPLETION" ? "DEEP" : "FLOW",
      transitionEasing: "QUIET_DISSOLVE",
      userPauseWindow: stage === "TIME_RESONANCE" ? "TIME_DELIVERY_WINDOW" : stage === "COMPLETION" ? "RECOGNITION_WINDOW" : "OBSERVATION_WINDOW",
    }))),
    completionHold: "LONG_RECOGNITION_HOLD",
    runtimeStateMachineReference: runtimeReference,
    boundary: timelineBoundary,
  });
  const consumerFor = (stage, timeline) => Object.freeze({
    runtimeStage: stage,
    visualStateReference: Object.freeze({ stage }),
    timelineState: timeline.stages.find((entry) => entry.stage === stage),
    renderIntent: "SEMANTIC_STAGE_REFERENCE",
    transitionProgress: 0.5,
  });
  const inputFor = (stageIndex) => {
    const runtimeReference = runtimeFor(stageIndex);
    const timelineReference = timelineFor(runtimeReference);
    return Object.freeze({
      runtimeSequenceReference: runtimeReference,
      timelineReference,
      rendererConsumerReference: consumerFor(stages[stageIndex], timelineReference),
    });
  };

  const start = runtime.startGenesisVisualHarness(inputFor(0));
  assertEqual("isolated harness starts ready", start.status, "READY");
  if (start.status === "READY") {
    assertEqual("harness mode is isolated", start.harness.harnessMode, "ISOLATED_GENESIS_PREVIEW");
    assertEqual("harness starts at Moon", start.harness.previewState.currentStage, "MOON_ORIGIN");
    assertEqual("harness starts at START", start.harness.previewState.currentStep, "START");
    assertEqual("harness exposes transition state", start.harness.previewState.transitionState, "ENTERING");
    assertEqual("harness exposes timeline state", start.harness.previewState.timelineState.stage, "MOON_ORIGIN");
    assertEqual("harness exposes consumer input", start.harness.previewState.rendererConsumerInput.runtimeStage, "MOON_ORIGIN");
    assertEqual("harness stays isolated", start.harness.boundary.noProductionRoute, true);

    const skipInput = inputFor(2);
    const skipped = runtime.advanceGenesisVisualHarness({
      session: start.harness,
      nextRuntimeSequenceReference: skipInput.runtimeSequenceReference,
      nextTimelineReference: skipInput.timelineReference,
      nextRendererConsumerReference: skipInput.rendererConsumerReference,
    });
    assertEqual("stage skip is blocked", skipped.status, "BLOCKED");
    if (skipped.status === "BLOCKED") assertEqual("stage skip reason", skipped.reason, "HARNESS_STAGE_SKIP_FORBIDDEN");

    let session = start.harness;
    for (let stageIndex = 1; stageIndex < stages.length; stageIndex += 1) {
      const debugInput = inputFor(stageIndex);
      const advanced = runtime.advanceGenesisVisualHarness({
        session,
        nextRuntimeSequenceReference: debugInput.runtimeSequenceReference,
        nextTimelineReference: debugInput.timelineReference,
        nextRendererConsumerReference: debugInput.rendererConsumerReference,
      });
      assertEqual(`stage ${stages[stageIndex]} advances`, advanced.status, "READY");
      if (advanced.status !== "READY") break;
      session = advanced.harness;
    }
    assertEqual("completion is reached", session.previewState.currentStage, "COMPLETION");
    assertEqual("completion lifecycle is held", session.previewState.lifecycle, "COMPLETED");
    const ended = runtime.endGenesisVisualHarness(session);
    assertEqual("harness ends explicitly", ended.status, "READY");
    if (ended.status === "READY") {
      assertEqual("harness end step", ended.harness.previewState.currentStep, "END");
      assertEqual("harness end does not loop", ended.harness.previewState.lifecycle, "END");
      const afterEnd = runtime.advanceGenesisVisualHarness({
        session: ended.harness,
        nextRuntimeSequenceReference: inputFor(0).runtimeSequenceReference,
        nextTimelineReference: inputFor(0).timelineReference,
        nextRendererConsumerReference: inputFor(0).rendererConsumerReference,
      });
      assertEqual("harness does not auto-loop", afterEnd.status, "BLOCKED");
      if (afterEnd.status === "BLOCKED") assertEqual("auto-loop reason", afterEnd.reason, "COMPLETION_ALREADY_REACHED");
    }
  }
  const missing = runtime.startGenesisVisualHarness({
    runtimeSequenceReference: null,
    timelineReference: null,
    rendererConsumerReference: null,
  });
  assertEqual("missing harness references unavailable", missing.status, "UNAVAILABLE");
}

if (failures.length > 0) {
  console.error("\nGenesis visual harness gate failed:");
  failures.forEach((failure) => console.error(`- ${failure}`));
  process.exit(1);
}
console.log("\nGenesis visual harness gate passed.");
