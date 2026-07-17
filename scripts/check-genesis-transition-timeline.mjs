import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import process from "node:process";
import { build } from "esbuild";

const rootDir = process.cwd();
const files = Object.freeze({
  type: "src/types/genesisTransitionTimeline.ts",
  service: "src/services/genesisTransitionTimeline.ts",
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
    "GenesisTransitionTimeline",
    "stageDuration",
    "transitionDuration",
    "rhythmProfile",
    "transitionEasing",
    "userPauseWindow",
    "completionHold",
    "DEEP",
    "FLOW",
    "RESPONSE",
    "NO_AUTOMATIC_TRANSITION",
    "LONG_RECOGNITION_HOLD",
    "noFastRhythm",
    "timelineDefinitionOnly",
    "noRendererAnimation",
    "noWebGL",
    "noShader",
    "noParticleParameters",
    "runtimeStateMachineReference",
  ].forEach((marker) => assertIncludes("P13 timeline type", source.type, marker));

  [
    "resolveGenesisTransitionTimeline",
    "STAGE_ORDER",
    "MOON_ORIGIN",
    "STAR_RIVER",
    "TIME_RESONANCE",
    "SYMBOL_REVEAL",
    "HEXAGRAM_IMPRINT",
    "LIFE_FORCE",
    "STAR_BEAST_REVEAL",
    "COMPLETION",
    "TIME_DELIVERY_WINDOW",
    "RECOGNITION_WINDOW",
    "LONG_RECOGNITION_HOLD",
    "FAST_RHYTHM_FORBIDDEN",
    "USER_PAUSE_WINDOW_MISSING",
    "COMPLETION_HOLD_MISSING",
    "noFastRhythm",
    "noRendererAnimation",
    "timelineDefinitionOnly",
  ].forEach((marker) => assertIncludes("P13 timeline service", source.service, marker));

  [
    "createRenderer",
    "createRenderPlan",
    "WebGLRenderingContext",
    "ShaderMaterial",
    "ParticleSystem",
    "runMotherCodeLandingEngine",
    "runLifeArchetypeEngine",
    "runHexagramCalculation",
    "runFourSymbolEngine",
    "resolveStarbeastFromBirthDate",
    "createRenderer",
    "createRenderPlan",
    "localStorage",
    "sessionStorage",
    "fetch(",
    "document.",
  ].forEach((marker) => assertExcludes("P13 timeline remains semantic-only", source.service, marker));

  [
    "GenesisTransitionTimeline",
    "GenesisTransitionTimelineInput",
    "GenesisTransitionTimelineResult",
    "GenesisTransitionTimelineBoundary",
    "from \"./genesisTransitionTimeline\"",
  ].forEach((marker) => assertIncludes("P13 type index export", source.typeIndex, marker));
  assertIncludes("P13 gate registered", packageJson.scripts?.["check-genesis-transition-timeline"] ?? "", "node scripts/check-genesis-transition-timeline.mjs");
  assertIncludes("P13 release gate registered", packageJson.scripts?.["postcheck:release"] ?? "", "npm run check-genesis-transition-timeline");

  const modulePath = path.join(os.tmpdir(), `guanyao-genesis-transition-timeline-${process.pid}.mjs`);
  await build({
    stdin: {
      contents: `export { resolveGenesisTransitionTimeline } from "./src/services/genesisTransitionTimeline.ts";`,
      resolveDir: rootDir,
      sourcefile: "genesis-transition-timeline-gate-entry.ts",
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

  const readinessBoundary = Object.freeze({
    readinessReviewOnly: true,
    noFormalRuntimeIntegration: true,
    noRendererInvocation: true,
    noUiRendering: true,
    noUserInputHandling: true,
    noIdentityCalculation: true,
    noEngineResultConsumption: true,
    noStorageState: true,
    noRealityPressure: true,
    noGravity: true,
    noChoice: true,
    noCrystal: true,
    noUserBinding: true,
    noIdentityMutation: true,
    noSceneModelMutation: true,
    noRenderPlanMutation: true,
    noVisualStateMutation: true,
    rendererConsumesVisualStateOnly: true,
  });
  const readinessResult = Object.freeze({
    status: "READY",
    readiness: "READY_FOR_RUNTIME_EXPERIENCE_IMPLEMENTATION",
    source: "genesis_runtime_experience_readiness",
    input: Object.freeze({}),
    readinessContract: Object.freeze({
      runtimeSequenceContract: "MOON_TO_COMPLETION_IN_ORDER",
      visualStateConsumption: "READ_ONLY_UPSTREAM_GENESIS_VISUAL_STATES",
      transitionContract: "CAUSALLY_CONTINUOUS_SLOW_REVEAL",
      interactionBoundary: "TIME_DELIVERY_ONLY",
      rendererConsumptionBoundary: "VISUAL_STATE_TO_RENDERER_ONLY",
      readinessState: "READY_FOR_RUNTIME_EXPERIENCE_IMPLEMENTATION",
    }),
    boundary: readinessBoundary,
  });
  const stateMachine = Object.freeze({
    currentStage: "MOON_ORIGIN",
    previousStage: null,
    nextStage: "STAR_RIVER",
    transitionState: "ENTERING",
    sequenceStatus: "RUNNING",
    readinessReference: readinessResult,
    boundary: Object.freeze({
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
    }),
  });
  const input = Object.freeze({ stateMachineReference: stateMachine });
  const ready = runtime.resolveGenesisTransitionTimeline(input);
  assertEqual("timeline is ready", ready.status, "READY");
  if (ready.status === "READY") {
    assertEqual("timeline stage count", ready.timeline.stages.length, 8);
    assertEqual("timeline first stage", ready.timeline.stages[0].stage, "MOON_ORIGIN");
    assertEqual("timeline last stage", ready.timeline.stages[7].stage, "COMPLETION");
    assertEqual("Moon uses deep rhythm", ready.timeline.stages[0].rhythmProfile, "DEEP");
    assertEqual("Star uses flow rhythm", ready.timeline.stages[1].rhythmProfile, "FLOW");
    assertEqual("Time uses response rhythm", ready.timeline.stages[2].rhythmProfile, "RESPONSE");
    assertEqual("Symbol uses flow rhythm", ready.timeline.stages[3].rhythmProfile, "FLOW");
    assertEqual("Hexagram uses response rhythm", ready.timeline.stages[4].rhythmProfile, "RESPONSE");
    assertEqual("Force uses flow rhythm", ready.timeline.stages[5].rhythmProfile, "FLOW");
    assertEqual("Beast uses deep rhythm", ready.timeline.stages[6].rhythmProfile, "DEEP");
    assertEqual("Completion uses deep rhythm", ready.timeline.stages[7].rhythmProfile, "DEEP");
    assertEqual("Time pause window", ready.timeline.stages[2].userPauseWindow, "TIME_DELIVERY_WINDOW");
    assertEqual("Completion pause window", ready.timeline.stages[7].userPauseWindow, "RECOGNITION_WINDOW");
    assertEqual("Completion hold", ready.timeline.completionHold, "LONG_RECOGNITION_HOLD");
    assertEqual("Completion does not auto-transition", ready.timeline.stages[7].transitionDuration, "NO_AUTOMATIC_TRANSITION");
    assertEqual("timeline boundary is renderer-free", ready.boundary.noRendererAnimation, true);
  }
  const missing = runtime.resolveGenesisTransitionTimeline(Object.freeze({ stateMachineReference: null }));
  assertEqual("missing state machine unavailable", missing.status, "UNAVAILABLE");
  if (missing.status === "UNAVAILABLE") assertEqual("missing state machine reason", missing.reason, "STATE_MACHINE_REFERENCE_REQUIRED");
  const unavailableState = runtime.resolveGenesisTransitionTimeline(Object.freeze({ stateMachineReference: Object.freeze({ ...stateMachine, readinessReference: Object.freeze({ status: "UNAVAILABLE" }) }) }));
  assertEqual("unavailable state machine remains unavailable", unavailableState.status, "UNAVAILABLE");
  const blockedState = runtime.resolveGenesisTransitionTimeline(Object.freeze({ stateMachineReference: Object.freeze({ ...stateMachine, readinessReference: Object.freeze({ status: "BLOCKED" }) }) }));
  assertEqual("blocked state machine remains blocked", blockedState.status, "BLOCKED");
  const invalidBoundary = runtime.resolveGenesisTransitionTimeline(Object.freeze({
    stateMachineReference: Object.freeze({
      ...stateMachine,
      boundary: Object.freeze({ ...stateMachine.boundary, noStageReordering: false }),
    }),
  }));
  assertEqual("invalid state machine boundary blocked", invalidBoundary.status, "BLOCKED");
  if (invalidBoundary.status === "BLOCKED") assertEqual("invalid state machine reason", invalidBoundary.reason, "STATE_MACHINE_BOUNDARY_INVALID");
}

if (failures.length > 0) {
  console.error("\nGenesis transition timeline gate failed:");
  failures.forEach((failure) => console.error(`- ${failure}`));
  process.exit(1);
}
console.log("\nGenesis transition timeline gate passed.");
