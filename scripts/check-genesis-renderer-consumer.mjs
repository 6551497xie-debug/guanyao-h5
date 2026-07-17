import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import process from "node:process";
import { build } from "esbuild";

const rootDir = process.cwd();
const files = Object.freeze({
  type: "src/types/genesisRendererConsumerContract.ts",
  service: "src/services/genesisRendererConsumer.ts",
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
    "GenesisRendererConsumerContract",
    "runtimeStage",
    "visualStateReference",
    "timelineState",
    "renderIntent",
    "transitionProgress",
    "GenesisRendererVisualStateReferences",
    "MOON_ORIGIN",
    "STAR_RIVER",
    "TIME_RESONANCE",
    "SYMBOL_REVEAL",
    "HEXAGRAM_IMPRINT",
    "LIFE_FORCE",
    "STAR_BEAST_REVEAL",
    "COMPLETION",
    "TAIYIN_ENTRY",
    "STELLAR_ORDER",
    "TIME_RESPONSE",
    "SYMBOLIC_FIELD",
    "CHANGE_IMPRINT",
    "LIFE_FORCE_MOTION",
    "LIFE_PRESENCE",
    "RECOGNITION_HOLD",
    "rendererConsumerOnly",
    "noVisualStateMutation",
    "noIdentity",
    "noRendererInvocation",
    "isolatedGenesisRuntimeConsumerOnly",
    "productionIntegration: false",
  ].forEach((marker) => assertIncludes("P14 consumer contract", source.type, marker));

  [
    "resolveGenesisRendererConsumer",
    "GENESIS_RENDERER_CONSUMER_BOUNDARY",
    "referenceForStage",
    "hasRuntimeBoundary",
    "hasTimelineBoundary",
    "hasVisualStateBoundary",
    "RUNTIME_TIMELINE_REFERENCE_MISMATCH",
    "TRANSITION_PROGRESS_INVALID",
    "VISUAL_STATE_BOUNDARY_INVALID",
    "TAIYIN_ENTRY",
    "STELLAR_ORDER",
    "TIME_RESPONSE",
    "SYMBOLIC_FIELD",
    "CHANGE_IMPRINT",
    "LIFE_FORCE_MOTION",
    "LIFE_PRESENCE",
    "RECOGNITION_HOLD",
  ].forEach((marker) => assertIncludes("P14 consumer service", source.service, marker));

  [
    "runMotherCodeLandingEngine",
    "runLifeArchetypeEngine",
    "runHexagramCalculation",
    "runFourSymbolEngine",
    "resolveStarbeastFromBirthDate",
    "createRenderer",
    "createRenderPlan",
    "WebGLRenderingContext",
    "ShaderMaterial",
    "ParticleSystem",
    "localStorage",
    "sessionStorage",
    "fetch(",
    "document.",
    "IdentitySource",
    "MotherCode",
    "LifeArchetype",
  ].forEach((marker) => assertExcludes("P14 consumer remains boundary-only", source.service, marker));

  [
    "GenesisRendererConsumerContract",
    "GenesisRendererConsumerInput",
    "GenesisRendererConsumerResult",
    "GenesisRendererConsumerBoundary",
    "GenesisRendererVisualStateReference",
    "from \"./genesisRendererConsumerContract\"",
  ].forEach((marker) => assertIncludes("P14 type index export", source.typeIndex, marker));
  assertIncludes("P14 gate registered", packageJson.scripts?.["check-genesis-renderer-consumer"] ?? "", "node scripts/check-genesis-renderer-consumer.mjs");
  assertIncludes("P14 release gate registered", packageJson.scripts?.["postcheck:release"] ?? "", "npm run check-genesis-renderer-consumer");

  const modulePath = path.join(os.tmpdir(), `guanyao-genesis-renderer-consumer-${process.pid}.mjs`);
  await build({
    stdin: {
      contents: `export { resolveGenesisRendererConsumer } from "./src/services/genesisRendererConsumer.ts";\nexport { initializeGenesisRuntimeStateMachine } from "./src/services/genesisRuntimeStateMachine.ts";\nexport { resolveGenesisTransitionTimeline } from "./src/services/genesisTransitionTimeline.ts";`,
      resolveDir: rootDir,
      sourcefile: "genesis-renderer-consumer-gate-entry.ts",
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
  const machineResult = runtime.initializeGenesisRuntimeStateMachine({ readinessResult });
  assertEqual("runtime state machine is ready", machineResult.status, "READY");
  if (machineResult.status === "READY") {
    const timelineResult = runtime.resolveGenesisTransitionTimeline({
      stateMachineReference: machineResult.state,
    });
    assertEqual("transition timeline is ready", timelineResult.status, "READY");
    if (timelineResult.status === "READY") {
      const visualState = Object.freeze({
        visualOnly: true,
        identityBlind: true,
        noIdentity: true,
        noEngineInvocation: true,
        noSceneModelInvocation: true,
        noRenderPlanInvocation: true,
        noRendererInvocation: true,
      });
      const completionState = Object.freeze({
        runtimeBoundary: Object.freeze({
          genesisLayerOnly: true,
          noIdentityMutation: true,
          noEngineInvocation: true,
          noRendererInvocation: true,
          noVisualStateMutation: true,
          noRealityCalculation: true,
          noCrystal: true,
          noStorage: true,
        }),
      });
      const visualStateReferences = Object.freeze({
        moonOrigin: visualState,
        starRiver: visualState,
        timeResonance: visualState,
        symbol: visualState,
        hexagram: visualState,
        lifeForce: visualState,
        starBeastPresence: visualState,
        completion: completionState,
      });
      const input = Object.freeze({
        runtimeStateMachineReference: machineResult.state,
        transitionTimelineReference: timelineResult.timeline,
        visualStateReferences,
        transitionProgress: 0.5,
      });
      const ready = runtime.resolveGenesisRendererConsumer(input);
      assertEqual("renderer consumer is ready", ready.status, "READY");
      if (ready.status === "READY") {
        assertEqual("consumer stage is Moon", ready.contract.runtimeStage, "MOON_ORIGIN");
        assertEqual("consumer visual reference is Moon", ready.contract.visualStateReference.referenceType, "MOON_ORIGIN_VISUAL_STATE");
        assertEqual("consumer timeline reference is Moon", ready.contract.timelineState.stage, "MOON_ORIGIN");
        assertEqual("consumer render intent", ready.contract.renderIntent, "TAIYIN_ENTRY");
        assertEqual("consumer progress is preserved", ready.contract.transitionProgress, 0.5);
        assertEqual("consumer remains isolated", ready.boundary.productionIntegration, false);
      }
      const missingRuntime = runtime.resolveGenesisRendererConsumer(Object.freeze({ ...input, runtimeStateMachineReference: null }));
      assertEqual("missing runtime is unavailable", missingRuntime.status, "UNAVAILABLE");
      if (missingRuntime.status === "UNAVAILABLE") assertEqual("missing runtime reason", missingRuntime.reason, "RUNTIME_STATE_REFERENCE_REQUIRED");
      const missingTimeline = runtime.resolveGenesisRendererConsumer(Object.freeze({ ...input, transitionTimelineReference: null }));
      assertEqual("missing timeline is unavailable", missingTimeline.status, "UNAVAILABLE");
      if (missingTimeline.status === "UNAVAILABLE") assertEqual("missing timeline reason", missingTimeline.reason, "TRANSITION_TIMELINE_REFERENCE_REQUIRED");
      const missingVisualState = runtime.resolveGenesisRendererConsumer(Object.freeze({
        ...input,
        visualStateReferences: Object.freeze({ ...visualStateReferences, moonOrigin: null }),
      }));
      assertEqual("missing visual state is unavailable", missingVisualState.status, "UNAVAILABLE");
      if (missingVisualState.status === "UNAVAILABLE") assertEqual("missing visual state reason", missingVisualState.reason, "VISUAL_STATE_REFERENCE_REQUIRED");
      const invalidProgress = runtime.resolveGenesisRendererConsumer(Object.freeze({ ...input, transitionProgress: 1.5 }));
      assertEqual("invalid progress is blocked", invalidProgress.status, "BLOCKED");
      if (invalidProgress.status === "BLOCKED") assertEqual("invalid progress reason", invalidProgress.reason, "TRANSITION_PROGRESS_INVALID");
      const mismatchedTimeline = runtime.resolveGenesisRendererConsumer(Object.freeze({
        ...input,
        transitionTimelineReference: Object.freeze({ ...timelineResult.timeline, runtimeStateMachineReference: null }),
      }));
      assertEqual("mismatched runtime timeline is blocked", mismatchedTimeline.status, "BLOCKED");
      if (mismatchedTimeline.status === "BLOCKED") assertEqual("mismatched runtime timeline reason", mismatchedTimeline.reason, "RUNTIME_TIMELINE_REFERENCE_MISMATCH");
      const invalidVisualBoundary = runtime.resolveGenesisRendererConsumer(Object.freeze({
        ...input,
        visualStateReferences: Object.freeze({ ...visualStateReferences, moonOrigin: Object.freeze({ ...visualState, noIdentity: false }) }),
      }));
      assertEqual("invalid visual boundary is blocked", invalidVisualBoundary.status, "BLOCKED");
      if (invalidVisualBoundary.status === "BLOCKED") assertEqual("invalid visual boundary reason", invalidVisualBoundary.reason, "VISUAL_STATE_BOUNDARY_INVALID");
    }
  }
}

if (failures.length > 0) {
  console.error("\nGenesis renderer consumer gate failed:");
  failures.forEach((failure) => console.error(`- ${failure}`));
  process.exit(1);
}
console.log("\nGenesis renderer consumer gate passed.");
