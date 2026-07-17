import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import process from "node:process";
import { build } from "esbuild";

const rootDir = process.cwd();
const files = Object.freeze({
  type: "src/types/genesisRuntimeStateMachine.ts",
  service: "src/services/genesisRuntimeStateMachine.ts",
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
    "GenesisRuntimeStateMachine",
    "GenesisRuntimeStage",
    "MOON_ORIGIN",
    "STAR_RIVER",
    "TIME_RESONANCE",
    "SYMBOL_REVEAL",
    "HEXAGRAM_IMPRINT",
    "LIFE_FORCE",
    "STAR_BEAST_REVEAL",
    "COMPLETION",
    "currentStage",
    "previousStage",
    "nextStage",
    "transitionState",
    "sequenceStatus",
    "ENTERING",
    "ACTIVE",
    "TRANSITIONING",
    "COMPLETED",
    "GenesisRuntimeStateMachineBoundary",
    "noVisualStateMutation",
    "noRendererCommand",
    "noIdentity",
    "userInputOnlyAtTimeResonance",
    "TIME_DELIVERY",
    "AUTO_ADVANCE",
  ].forEach((marker) => assertIncludes("P12 state machine type", source.type, marker));

  [
    "initializeGenesisRuntimeStateMachine",
    "activateGenesisRuntimeStage",
    "completeGenesisRuntimeStage",
    "beginGenesisRuntimeTransition",
    "completeGenesisRuntimeTransition",
    "STAGE_NOT_COMPLETED",
    "INVALID_NEXT_STAGE",
    "TIME_DELIVERY_REQUIRED",
    "TIME_DELIVERY_ONLY_AT_TIME_RESONANCE",
    "SEQUENCE_ALREADY_COMPLETED",
    "MOON_ORIGIN",
    "STAR_RIVER",
    "TIME_RESONANCE",
    "STAR_BEAST_REVEAL",
    "noParallelGenesisStages",
    "noStageReordering",
  ].forEach((marker) => assertIncludes("P12 state machine service", source.service, marker));

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
    "GenesisMoonOriginVisualState",
    "GenesisStarRiverVisualState",
    "GenesisTimeResonanceVisualState",
  ].forEach((marker) => assertExcludes("P12 runtime remains orchestration-only", source.service, marker));

  [
    "GenesisRuntimeStateMachine",
    "GenesisRuntimeStateMachineInput",
    "GenesisRuntimeStateMachineResult",
    "GenesisRuntimeStateMachineBoundary",
    "from \"./genesisRuntimeStateMachine\"",
  ].forEach((marker) => assertIncludes("P12 type index export", source.typeIndex, marker));
  assertIncludes("P12 gate registered", packageJson.scripts?.["check-genesis-runtime-state-machine"] ?? "", "node scripts/check-genesis-runtime-state-machine.mjs");
  assertIncludes("P12 release gate registered", packageJson.scripts?.["postcheck:release"] ?? "", "npm run check-genesis-runtime-state-machine");

  const modulePath = path.join(os.tmpdir(), `guanyao-genesis-runtime-state-machine-${process.pid}.mjs`);
  await build({
    stdin: {
      contents: `export { initializeGenesisRuntimeStateMachine, activateGenesisRuntimeStage, completeGenesisRuntimeStage, beginGenesisRuntimeTransition, completeGenesisRuntimeTransition } from "./src/services/genesisRuntimeStateMachine.ts";`,
      resolveDir: rootDir,
      sourcefile: "genesis-runtime-state-machine-gate-entry.ts",
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
  const initialized = runtime.initializeGenesisRuntimeStateMachine(Object.freeze({ readinessResult }));
  assertEqual("initialization is ready", initialized.status, "READY");
  if (initialized.status === "READY") {
    assertEqual("initial stage is Moon", initialized.state.currentStage, "MOON_ORIGIN");
    assertEqual("initial stage is entering", initialized.state.transitionState, "ENTERING");
    assertEqual("initial next stage is Star", initialized.state.nextStage, "STAR_RIVER");

    const activeMoon = runtime.activateGenesisRuntimeStage(initialized.state);
    assertEqual("Moon activation is ready", activeMoon.status, "READY");
    const completedMoon = activeMoon.status === "READY"
      ? runtime.completeGenesisRuntimeStage(activeMoon.state)
      : activeMoon;
    assertEqual("Moon completion is ready", completedMoon.status, "READY");

    const illegalJump = completedMoon.status === "READY"
      ? runtime.beginGenesisRuntimeTransition({ machine: completedMoon.state, targetStage: "STAR_BEAST_REVEAL", trigger: "AUTO_ADVANCE" })
      : completedMoon;
    assertEqual("illegal Moon to Beast jump is blocked", illegalJump.status, "BLOCKED");
    if (illegalJump.status === "BLOCKED") assertEqual("illegal jump reason", illegalJump.reason, "INVALID_NEXT_STAGE");

    const beginStar = completedMoon.status === "READY"
      ? runtime.beginGenesisRuntimeTransition({ machine: completedMoon.state, targetStage: "STAR_RIVER", trigger: "AUTO_ADVANCE" })
      : completedMoon;
    assertEqual("Moon to Star transition begins", beginStar.status, "READY");
    if (beginStar.status === "READY") assertEqual("transition state is transitioning", beginStar.state.transitionState, "TRANSITIONING");
    const enteredStar = beginStar.status === "READY"
      ? runtime.completeGenesisRuntimeTransition(beginStar.state)
      : beginStar;
    assertEqual("Star transition completes", enteredStar.status, "READY");
    if (enteredStar.status === "READY") {
      assertEqual("entered stage is Star", enteredStar.state.currentStage, "STAR_RIVER");
      assertEqual("entered stage is entering", enteredStar.state.transitionState, "ENTERING");
    }

    const notActive = runtime.completeGenesisRuntimeStage(enteredStar.status === "READY" ? enteredStar.state : initialized.state);
    assertEqual("cannot complete entering stage", notActive.status, "BLOCKED");
    if (notActive.status === "BLOCKED") assertEqual("entering completion reason", notActive.reason, "STAGE_NOT_ACTIVE");

    let machine = enteredStar.status === "READY" ? enteredStar.state : initialized.state;
    for (const stage of ["STAR_RIVER", "TIME_RESONANCE"]) {
      const active = runtime.activateGenesisRuntimeStage(machine);
      if (active.status !== "READY") break;
      const completed = runtime.completeGenesisRuntimeStage(active.state);
      if (completed.status !== "READY") break;
      const target = stage === "STAR_RIVER" ? "TIME_RESONANCE" : "SYMBOL_REVEAL";
      const trigger = stage === "TIME_RESONANCE" ? "TIME_DELIVERY" : "AUTO_ADVANCE";
      const transition = runtime.beginGenesisRuntimeTransition({ machine: completed.state, targetStage: target, trigger });
      if (transition.status !== "READY") break;
      const entered = runtime.completeGenesisRuntimeTransition(transition.state);
      if (entered.status !== "READY") break;
      machine = entered.state;
    }
    assertEqual("time delivery is the only Time exit", machine.currentStage, "SYMBOL_REVEAL");

    const timeMachine = Object.freeze({ ...machine, currentStage: "TIME_RESONANCE", previousStage: "STAR_RIVER", nextStage: "SYMBOL_REVEAL", transitionState: "COMPLETED" });
    const missingTimeDelivery = runtime.beginGenesisRuntimeTransition({ machine: timeMachine, targetStage: "SYMBOL_REVEAL", trigger: "AUTO_ADVANCE" });
    assertEqual("Time cannot auto-advance", missingTimeDelivery.status, "BLOCKED");
    if (missingTimeDelivery.status === "BLOCKED") assertEqual("Time delivery reason", missingTimeDelivery.reason, "TIME_DELIVERY_REQUIRED");
    const deliveredTime = runtime.beginGenesisRuntimeTransition({ machine: timeMachine, targetStage: "SYMBOL_REVEAL", trigger: "TIME_DELIVERY" });
    assertEqual("Time delivery advances", deliveredTime.status, "READY");

    const incomplete = runtime.beginGenesisRuntimeTransition({ machine: enteredStar.status === "READY" ? enteredStar.state : initialized.state, targetStage: "TIME_RESONANCE", trigger: "AUTO_ADVANCE" });
    assertEqual("incomplete stage cannot transition", incomplete.status, "BLOCKED");
    if (incomplete.status === "BLOCKED") assertEqual("incomplete stage reason", incomplete.reason, "STAGE_NOT_COMPLETED");

    const invalidReadiness = runtime.initializeGenesisRuntimeStateMachine(Object.freeze({
      readinessResult: Object.freeze({ ...readinessResult, boundary: Object.freeze({ ...readinessBoundary, noRealityPressure: false }) }),
    }));
    assertEqual("invalid readiness boundary blocks initialization", invalidReadiness.status, "BLOCKED");
    if (invalidReadiness.status === "BLOCKED") assertEqual("invalid readiness reason", invalidReadiness.reason, "READINESS_BOUNDARY_INVALID");
  }

  const missing = runtime.initializeGenesisRuntimeStateMachine(Object.freeze({ readinessResult: null }));
  assertEqual("missing readiness is unavailable", missing.status, "UNAVAILABLE");
  if (missing.status === "UNAVAILABLE") assertEqual("missing readiness reason", missing.reason, "READINESS_RESULT_REQUIRED");
  const unavailableResult = runtime.initializeGenesisRuntimeStateMachine(Object.freeze({ readinessResult: Object.freeze({ status: "UNAVAILABLE" }) }));
  assertEqual("unavailable readiness remains unavailable", unavailableResult.status, "UNAVAILABLE");
  const blockedResult = runtime.initializeGenesisRuntimeStateMachine(Object.freeze({ readinessResult: Object.freeze({ status: "BLOCKED" }) }));
  assertEqual("blocked readiness remains blocked", blockedResult.status, "BLOCKED");
}

if (failures.length > 0) {
  console.error("\nGenesis runtime state machine gate failed:");
  failures.forEach((failure) => console.error(`- ${failure}`));
  process.exit(1);
}
console.log("\nGenesis runtime state machine gate passed.");
