import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import process from "node:process";
import { build } from "esbuild";

const rootDir = process.cwd();
const transitionPath = path.join(
  rootDir,
  "src/services/xinmaiLifeWhisperVisualOutcomeTransition.ts",
);
const presentationPath = path.join(
  rootDir,
  "src/services/xinmaiRelationshipNamingPresentationState.ts",
);
const launchPath = path.join(rootDir, "src/pages/LaunchLab.tsx");
const realityCanvasPath = path.join(
  rootDir,
  "src/components/RealityLifeUniverseCanvas.tsx",
);
const sceneAdapterPath = path.join(
  rootDir,
  "src/renderers/xinmaiContinuousSceneRendererAdapter.ts",
);
const rendererPath = path.join(
  rootDir,
  "src/renderers/genesisWebGLRendererCore.ts",
);
const rendererTypesPath = path.join(
  rootDir,
  "src/types/genesisWebGLRendererCore.ts",
);
const relationshipTypesPath = path.join(
  rootDir,
  "src/types/xinmaiLifeWhisperRelationship.ts",
);
const genesisPath = path.join(
  rootDir,
  "src/pages/GenesisProductionExperiencePage.tsx",
);
const tempDir = fs.mkdtempSync(
  path.join(os.tmpdir(), `xinmai-response-outcome-${process.pid}-`),
);
const transitionModulePath = path.join(tempDir, "transition.mjs");
const presentationModulePath = path.join(tempDir, "presentation.mjs");

const assertEqual = (name, actual, expected) => {
  if (actual !== expected) {
    throw new Error(`${name} expected=${expected} actual=${actual}`);
  }
  console.log(`PASS | ${name}`);
};

const assertIncludes = (name, source, expected) => {
  if (!source.includes(expected)) {
    throw new Error(`${name} missing=${expected}`);
  }
  console.log(`PASS | ${name}`);
};

const assertExcludes = (name, source, forbidden) => {
  if (source.includes(forbidden)) {
    throw new Error(`${name} forbidden=${forbidden}`);
  }
  console.log(`PASS | ${name}`);
};

const sourceReferenceId = "returning-life-source-a";
const currentCycleId = "returning-cycle-2";
const baseTransitionInput = Object.freeze({
  expectedSourceReferenceId: sourceReferenceId,
  currentResponseCycleId: currentCycleId,
  lifeWhisperFact: "WHISPER_SUBMITTED",
  lifeWhisperResponsePhase: "RESPONDING",
});

try {
  await Promise.all([
    build({
      entryPoints: [transitionPath],
      outfile: transitionModulePath,
      bundle: true,
      platform: "node",
      format: "esm",
      target: "node20",
      logLevel: "silent",
    }),
    build({
      entryPoints: [presentationPath],
      outfile: presentationModulePath,
      bundle: true,
      platform: "node",
      format: "esm",
      target: "node20",
      logLevel: "silent",
    }),
  ]);
  const transition = await import(
    `file://${transitionModulePath}?t=${Date.now()}`
  );
  const presentation = await import(
    `file://${presentationModulePath}?t=${Date.now()}`
  );

  const motionStarted =
    transition.resolveLifeWhisperVisualOutcomeTransition({
      ...baseTransitionInput,
      outcome: {
        responseCycleId: currentCycleId,
        sourceReferenceId,
        status: "MOTION_RESPONSE_STARTED",
        surfaceMode: "WEBGL_MOTION",
      },
    });
  assertEqual(
    "Motion start does not settle relationship",
    motionStarted.action,
    "IGNORE",
  );

  const motionCompleted =
    transition.resolveLifeWhisperVisualOutcomeTransition({
      ...baseTransitionInput,
      outcome: {
        responseCycleId: currentCycleId,
        sourceReferenceId,
        status: "MOTION_RESPONSE_COMPLETED",
        surfaceMode: "WEBGL_MOTION",
      },
    });
  assertEqual(
    "Motion completion settles from visual authority",
    motionCompleted.action,
    "SETTLE",
  );
  assertEqual(
    "Motion completion keeps explicit authority",
    motionCompleted.authority,
    "MOTION_VISUAL_OUTCOME",
  );

  const staticPresented =
    transition.resolveLifeWhisperVisualOutcomeTransition({
      ...baseTransitionInput,
      outcome: {
        responseCycleId: currentCycleId,
        sourceReferenceId,
        status: "STATIC_RESPONSE_PRESENTED",
        surfaceMode: "SEMANTIC_STATIC_FALLBACK",
        reason: "REDUCED_MOTION_REQUESTED",
      },
    });
  assertEqual(
    "Reduced Motion settles only after static presentation",
    staticPresented.action,
    "SETTLE",
  );
  assertEqual(
    "Static presentation keeps explicit authority",
    staticPresented.authority,
    "STATIC_VISUAL_OUTCOME",
  );

  const unavailable =
    transition.resolveLifeWhisperVisualOutcomeTransition({
      ...baseTransitionInput,
      outcome: {
        responseCycleId: currentCycleId,
        sourceReferenceId,
        status: "VISUAL_RESPONSE_UNAVAILABLE",
        surfaceMode: "WEBGL_MOTION",
        reason: "WEBGL_CONTEXT_LOST",
      },
    });
  assertEqual(
    "Context loss never settles relationship",
    unavailable.action,
    "MARK_UNAVAILABLE",
  );

  for (const [name, overrides, expectedReason] of [
    [
      "stale cycle outcome is rejected",
      {
        outcome: {
          responseCycleId: "returning-cycle-1",
          sourceReferenceId,
          status: "MOTION_RESPONSE_COMPLETED",
          surfaceMode: "WEBGL_MOTION",
        },
      },
      "CYCLE_MISMATCH",
    ],
    [
      "identity-mismatched outcome is rejected",
      {
        outcome: {
          responseCycleId: currentCycleId,
          sourceReferenceId: "other-life-source",
          status: "MOTION_RESPONSE_COMPLETED",
          surfaceMode: "WEBGL_MOTION",
        },
      },
      "IDENTITY_MISMATCH",
    ],
    [
      "skipped whisper cannot consume visual completion",
      {
        lifeWhisperFact: "WHISPER_SKIPPED",
        lifeWhisperResponsePhase: "SKIPPED",
        outcome: {
          responseCycleId: currentCycleId,
          sourceReferenceId,
          status: "MOTION_RESPONSE_COMPLETED",
          surfaceMode: "WEBGL_MOTION",
        },
      },
      "RELATIONSHIP_FACT_MISMATCH",
    ],
  ]) {
    const result = transition.resolveLifeWhisperVisualOutcomeTransition({
      ...baseTransitionInput,
      ...overrides,
    });
    assertEqual(name, result.action, "IGNORE");
    assertEqual(`${name} keeps truthful reason`, result.reason, expectedReason);
  }

  const unavailableIntentBase = {
    lifeWhisperFact: "WHISPER_SUBMITTED",
    lifeWhisperResponsePhase: "UNAVAILABLE",
  };
  assertEqual(
    "Unavailable response does not silently unlock Reality",
    presentation.resolveLifeWhisperRealityEntryIntent(
      unavailableIntentBase,
    ),
    false,
  );
  assertEqual(
    "Explicit continuation remains nonblocking without counterfeit SETTLED",
    presentation.resolveLifeWhisperRealityEntryIntent({
      ...unavailableIntentBase,
      unavailableContinuation:
        "CONTINUE_WITHOUT_CONFIRMED_RESPONSE",
    }),
    true,
  );

  const launch = fs.readFileSync(launchPath, "utf8");
  const realityCanvas = fs.readFileSync(realityCanvasPath, "utf8");
  const sceneAdapter = fs.readFileSync(sceneAdapterPath, "utf8");
  const renderer = fs.readFileSync(rendererPath, "utf8");
  const rendererTypes = fs.readFileSync(rendererTypesPath, "utf8");
  const relationshipTypes = fs.readFileSync(
    relationshipTypesPath,
    "utf8",
  );
  const genesis = fs.readFileSync(genesisPath, "utf8");

  assertExcludes(
    "Returning success timer authority is removed",
    launch,
    "RETURNING_LIFE_WHISPER_RESPONSE_HOLD_MS",
  );
  assertIncludes(
    "Timeout is failure watchdog only",
    launch,
    "RETURNING_LIFE_WHISPER_OUTCOME_WATCHDOG_MS",
  );
  assertIncludes(
    "Watchdog marks outcome unavailable",
    launch,
    'setReturningLifeWhisperUnavailableReason(\n          "OUTCOME_WATCHDOG_EXPIRED"',
  );
  assertIncludes(
    "Page consumes typed visual outcome transition",
    launch,
    "resolveLifeWhisperVisualOutcomeTransition",
  );
  assertIncludes(
    "Returning surface receives a typed outcome consumer",
    launch,
    "onLifeWhisperVisualResponseOutcome=",
  );
  assertIncludes(
    "Retry creates a new response cycle",
    launch,
    "retryReturningLifeWhisperResponse",
  );
  assertIncludes(
    "Unavailable continuation remains explicit",
    launch,
    'data-interaction="CONTINUE_WITHOUT_CONFIRMED_RESPONSE"',
  );
  assertIncludes(
    "Renderer snapshot exposes visual outcome only",
    rendererTypes,
    "lifeWhisperVisualResponseOutcome",
  );
  assertIncludes(
    "Renderer reports completed motion after rendering",
    renderer,
    'status: "MOTION_RESPONSE_COMPLETED"',
  );
  assertIncludes(
    "Renderer reports context loss without SETTLED",
    renderer,
    'reason: "WEBGL_CONTEXT_LOST"',
  );
  assertIncludes(
    "Surface Host consumes renderer snapshot",
    sceneAdapter,
    "const snapshot = controller.getSnapshot()",
  );
  assertIncludes(
    "Surface Host preserves Life Whisper outcome consumption",
    sceneAdapter,
    "snapshot.lifeWhisperVisualResponseOutcome",
  );
  assertIncludes(
    "Static outcome requires a presenter commit proof",
    realityCanvas,
    'sameLifeSurfaceCommitProof?.presenter !==\n      "SEMANTIC_STATIC_SAME_LIFE_BODY"',
  );
  assertExcludes(
    "Static outcome no longer trusts DOM connection as authority",
    realityCanvas,
    ".isConnected",
  );
  assertIncludes(
    "Reduced Motion outcome is a semantic static presentation",
    realityCanvas,
    'status: "STATIC_RESPONSE_PRESENTED"',
  );
  assertIncludes(
    "Native Reduced Motion is selected before a renderer is created",
    realityCanvas,
    'window.matchMedia("(prefers-reduced-motion: reduce)")',
  );
  assertExcludes(
    "Reduced Motion query overrides are removed",
    realityCanvas,
    'searchParams.get("__xinmaiReducedMotion")',
  );
  assertIncludes(
    "Renderer failure browser path remains isolated from production",
    realityCanvas,
    '"__xinmaiRendererFailure"',
  );
  assertIncludes(
    "Visual facts carry an opaque response cycle",
    relationshipTypes,
    "responseCycleId: string | null",
  );
  assertIncludes(
    "First Encounter now reuses the shared response-cycle contract",
    genesis,
    "responseCycleId: lifeWhisperResponseCycleId",
  );
  assertExcludes(
    "First Encounter no longer keeps a fixed success timer",
    genesis,
    "LIFE_WHISPER_RESPONSE_HOLD_MS",
  );
  assertExcludes(
    "Renderer does not read Life Whisper outcome from DOM",
    renderer,
    "data-life-whisper-response-outcome",
  );

  const settledWrites = launch.match(
    /setReturningLifeWhisperResponsePhase\("SETTLED"\)/g,
  ) ?? [];
  assertEqual(
    "Returning SETTLED has exactly one Page write",
    settledWrites.length,
    1,
  );

  for (const relativePath of [
    "src/components/RealityProductionHost.tsx",
    "src/pages/RealityProductionRouteEntry.tsx",
    "src/pages/GravityPage.tsx",
    "src/pages/ChoicePage.tsx",
    "src/services/personalityRingLiteService.ts",
  ]) {
    const source = fs.readFileSync(path.join(rootDir, relativePath), "utf8");
    assertExcludes(
      `${relativePath} does not consume visual outcome`,
      source,
      "LifeWhisperSurfaceVisualResponseOutcome",
    );
    assertExcludes(
      `${relativePath} does not consume response cycle`,
      source,
      "responseCycleId",
    );
  }

  console.log(
    "\n[XINMAI RETURNING STARBEAST RESPONSE OUTCOME ATOMIC MIGRATION] PASS",
  );
} catch (error) {
  console.error(
    "[XINMAI RETURNING STARBEAST RESPONSE OUTCOME ATOMIC MIGRATION] FAIL",
  );
  console.error(error instanceof Error ? error.stack ?? error.message : error);
  process.exit(1);
} finally {
  fs.rmSync(tempDir, { recursive: true, force: true });
}
