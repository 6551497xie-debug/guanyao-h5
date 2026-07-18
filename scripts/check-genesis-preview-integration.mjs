import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import process from "node:process";
import { build } from "esbuild";

const rootDir = process.cwd();
const files = Object.freeze({
  type: "src/types/genesisPreviewIntegration.ts",
  service: "src/services/genesisPreviewIntegration.ts",
  typeIndex: "src/types/index.ts",
  packageManifest: "package.json",
});
const failures = [];
const assertIncludes = (name, source, marker) => {
  if (!source.includes(marker)) failures.push(`${name} missing=${marker}`);
  else console.log(`PASS | ${name}`);
};
const assertExcludes = (name, source, marker) => {
  if (source.includes(marker)) failures.push(`${name} forbidden=${marker}`);
  else console.log(`PASS | ${name} absent`);
};
const assertEqual = (name, actual, expected) => {
  if (actual !== expected) failures.push(`${name} expected=${String(expected)} actual=${String(actual)}`);
  else console.log(`PASS | ${name} expected=${String(expected)}`);
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
    "GenesisPreviewIntegration",
    "GenesisPreviewMode",
    "ISOLATED_GENESIS_PREVIEW",
    "runtimeSession",
    "rendererConsumerState",
    "previewLifecycle",
    "INITIALIZED",
    "RUNNING",
    "PAUSED",
    "RESET",
    "COMPLETED",
    "GenesisPreviewIntegrationBoundary",
    "noProductionRoute",
    "noProductionNavigation",
    "noVisualStateMutation",
    "completionRequired",
  ].forEach((marker) => assertIncludes("P16 integration type", source.type, marker));

  [
    "initializeGenesisPreviewIntegration",
    "startGenesisPreviewIntegration",
    "pauseGenesisPreviewIntegration",
    "resetGenesisPreviewIntegration",
    "completeGenesisPreviewIntegration",
    "GENESIS_PREVIEW_INTEGRATION_BOUNDARY",
    "HARNESS_CONSUMER_REFERENCE_MISMATCH",
    "PREVIEW_ALREADY_COMPLETED",
    "COMPLETION_STAGE_REQUIRED",
    "COMPLETION_HOLD_REQUIRED",
    "noAutomaticLoop",
    "noRuntimeStateMachineMutation",
    "noTimelineMutation",
  ].forEach((marker) => assertIncludes("P16 integration service", source.service, marker));

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
    "window.",
    "requestAnimationFrame",
  ].forEach((marker) => assertExcludes("P16 remains integration-only", source.service, marker));

  [
    "GenesisPreviewIntegration",
    "GenesisPreviewIntegrationInput",
    "GenesisPreviewIntegrationResult",
    "GenesisPreviewIntegrationBoundary",
    "from \"./genesisPreviewIntegration\"",
  ].forEach((marker) => assertIncludes("P16 type index export", source.typeIndex, marker));
  assertIncludes(
    "P16 gate registered",
    packageJson.scripts?.["check-genesis-preview-integration"] ?? "",
    "node scripts/check-genesis-preview-integration.mjs",
  );

  const modulePath = path.join(os.tmpdir(), `guanyao-genesis-preview-integration-${process.pid}.mjs`);
  await build({
    stdin: {
      contents: `export { initializeGenesisPreviewIntegration, startGenesisPreviewIntegration, pauseGenesisPreviewIntegration, resetGenesisPreviewIntegration, completeGenesisPreviewIntegration } from "./src/services/genesisPreviewIntegration.ts";`,
      resolveDir: rootDir,
      sourcefile: "genesis-preview-integration-gate-entry.ts",
      loader: "ts",
    },
    outfile: modulePath,
    bundle: true,
    platform: "node",
    format: "esm",
    target: "node20",
    logLevel: "silent",
  });
  const integration = await import(`file://${modulePath}?t=${Date.now()}`);

  const boundary = Object.freeze({
    isolatedPreviewOnly: true,
    devOnly: true,
    noProductionRoute: true,
    noProductionBuildConsumption: true,
    noIdentity: true,
    noUserData: true,
    noEngineResult: true,
    noEngineInvocation: true,
    noStorageReference: true,
    noReality: true,
    noGravity: true,
    noChoice: true,
    noCrystal: true,
    noVisualStateMutation: true,
    noSceneModelMutation: true,
    noRenderPlanMutation: true,
    noRendererSemanticMutation: true,
    noParallelStages: true,
    noStageSkipping: true,
    noAutomaticLoop: true,
    completionRequired: true,
  });
  const sessionFor = (stage, lifecycle = stage === "COMPLETION" ? "COMPLETED" : "START") => {
    const timelineState = Object.freeze({
      stage,
      stageDuration: "SLOWLY_FLOWING",
      transitionDuration: "GRADUAL",
      rhythmProfile: "FLOW",
      transitionEasing: "QUIET_DISSOLVE",
      userPauseWindow: "OBSERVATION_WINDOW",
    });
    const consumer = Object.freeze({
      runtimeStage: stage,
      visualStateReference: Object.freeze({
        stage,
        referenceType: "MOON_ORIGIN_VISUAL_STATE",
        state: Object.freeze({ stage }),
      }),
      timelineState,
      renderIntent: "TAIYIN_ENTRY",
      transitionProgress: 0,
    });
    return Object.freeze({
      harnessMode: "ISOLATED_GENESIS_PREVIEW",
      runtimeSequenceReference: Object.freeze({ currentStage: stage }),
      timelineReference: Object.freeze({}),
      rendererConsumerReference: consumer,
      previewState: Object.freeze({
        lifecycle,
        currentStep: stage,
        currentStage: stage,
        transitionState: "ACTIVE",
        timelineState,
        rendererConsumerInput: consumer,
      }),
      boundary,
    });
  };

  const initialSession = sessionFor("MOON_ORIGIN");
  const initialConsumer = initialSession.rendererConsumerReference;
  const missingSession = integration.initializeGenesisPreviewIntegration({
    runtimeSession: null,
    rendererConsumerState: initialConsumer,
  });
  assertEqual("missing harness session unavailable", missingSession.status, "UNAVAILABLE");
  const missingConsumer = integration.initializeGenesisPreviewIntegration({
    runtimeSession: initialSession,
    rendererConsumerState: null,
  });
  assertEqual("missing consumer state unavailable", missingConsumer.status, "UNAVAILABLE");
  const initialized = integration.initializeGenesisPreviewIntegration({
    runtimeSession: initialSession,
    rendererConsumerState: initialConsumer,
  });
  assertEqual("preview initializes", initialized.status, "READY");
  if (initialized.status === "READY") {
    assertEqual("preview mode is isolated", initialized.integration.previewMode, "ISOLATED_GENESIS_PREVIEW");
    assertEqual("preview lifecycle is initialized", initialized.integration.previewLifecycle, "INITIALIZED");
    const started = integration.startGenesisPreviewIntegration(initialized.integration);
    assertEqual("preview starts", started.status, "READY");
    if (started.status === "READY") {
      assertEqual("preview lifecycle is running", started.integration.previewLifecycle, "RUNNING");
      const paused = integration.pauseGenesisPreviewIntegration(started.integration);
      assertEqual("preview pauses", paused.status, "READY");
      if (paused.status === "READY") {
        assertEqual("preview lifecycle is paused", paused.integration.previewLifecycle, "PAUSED");
        const reset = integration.resetGenesisPreviewIntegration(paused.integration);
        assertEqual("preview resets", reset.status, "READY");
        if (reset.status === "READY") assertEqual("reset returns to initial stage", reset.integration.runtimeSession.previewState.currentStage, "MOON_ORIGIN");
      }
      const preCompletion = integration.completeGenesisPreviewIntegration(started.integration);
      assertEqual("completion is blocked before Completion", preCompletion.status, "BLOCKED");
      if (preCompletion.status === "BLOCKED") assertEqual("pre-completion reason", preCompletion.reason, "COMPLETION_STAGE_REQUIRED");
    }
  }

  const completionSession = sessionFor("COMPLETION");
  const completionInit = integration.initializeGenesisPreviewIntegration({
    runtimeSession: completionSession,
    rendererConsumerState: completionSession.rendererConsumerReference,
  });
  assertEqual("Completion preview initializes", completionInit.status, "READY");
  if (completionInit.status === "READY") {
    const completed = integration.completeGenesisPreviewIntegration(completionInit.integration);
    assertEqual("Completion is reachable", completed.status, "READY");
    if (completed.status === "READY") {
      assertEqual("Completion lifecycle is held", completed.integration.previewLifecycle, "COMPLETED");
      const restart = integration.startGenesisPreviewIntegration(completed.integration);
      assertEqual("completed preview does not loop", restart.status, "BLOCKED");
      if (restart.status === "BLOCKED") assertEqual("completed restart reason", restart.reason, "PREVIEW_ALREADY_COMPLETED");
    }
  }

  const mismatched = integration.initializeGenesisPreviewIntegration({
    runtimeSession: initialSession,
    rendererConsumerState: Object.freeze({ ...initialConsumer, runtimeStage: "STAR_RIVER" }),
  });
  assertEqual("consumer mismatch is blocked", mismatched.status, "BLOCKED");
  if (mismatched.status === "BLOCKED") assertEqual("invalid consumer reason", mismatched.reason, "RENDERER_CONSUMER_BOUNDARY_INVALID");
}

if (failures.length > 0) {
  console.error(`FAIL | genesis preview integration gate\n${failures.join("\n")}`);
  process.exitCode = 1;
} else {
  console.log("PASS | genesis preview integration gate");
}
