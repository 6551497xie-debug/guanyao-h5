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
const pagePath = path.join(
  rootDir,
  "src/pages/GenesisProductionExperiencePage.tsx",
);
const hostPath = path.join(
  rootDir,
  "src/components/GenesisProductionRendererCanvasHost.tsx",
);
const propsPath = path.join(
  rootDir,
  "src/types/genesisProductionExperiencePage.ts",
);
const rendererPath = path.join(
  rootDir,
  "src/renderers/genesisWebGLRendererCore.ts",
);
const tempDir = fs.mkdtempSync(
  path.join(os.tmpdir(), `xinmai-first-response-${process.pid}-`),
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

const sourceReferenceId = "first-encounter-life-source";
const currentCycleId = "first-encounter-life-whisper-cycle-2";
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
    "Motion start does not counterfeit settlement",
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
    "Motion completion exposes its authority",
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
    "Reduced Motion settles only from a presented static response",
    staticPresented.action,
    "SETTLE",
  );
  assertEqual(
    "Static presentation exposes its authority",
    staticPresented.authority,
    "STATIC_VISUAL_OUTCOME",
  );

  for (const [name, overrides, expectedAction, expectedReason] of [
    [
      "Stale response cycle cannot settle",
      {
        outcome: {
          responseCycleId: "first-encounter-life-whisper-cycle-1",
          sourceReferenceId,
          status: "MOTION_RESPONSE_COMPLETED",
          surfaceMode: "WEBGL_MOTION",
        },
      },
      "IGNORE",
      "CYCLE_MISMATCH",
    ],
    [
      "Identity mismatch cannot settle",
      {
        outcome: {
          responseCycleId: currentCycleId,
          sourceReferenceId: "other-life-source",
          status: "MOTION_RESPONSE_COMPLETED",
          surfaceMode: "WEBGL_MOTION",
        },
      },
      "IGNORE",
      "IDENTITY_MISMATCH",
    ],
    [
      "Skipped whisper cannot consume response outcome",
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
      "IGNORE",
      "RELATIONSHIP_FACT_MISMATCH",
    ],
    [
      "Context loss remains unavailable",
      {
        outcome: {
          responseCycleId: currentCycleId,
          sourceReferenceId,
          status: "VISUAL_RESPONSE_UNAVAILABLE",
          surfaceMode: "WEBGL_MOTION",
          reason: "WEBGL_CONTEXT_LOST",
        },
      },
      "MARK_UNAVAILABLE",
      "WEBGL_CONTEXT_LOST",
    ],
  ]) {
    const result = transition.resolveLifeWhisperVisualOutcomeTransition({
      ...baseTransitionInput,
      ...overrides,
    });
    assertEqual(name, result.action, expectedAction);
    assertEqual(`${name} keeps truthful reason`, result.reason, expectedReason);
  }

  const unavailableFacts = {
    lifeWhisperFact: "WHISPER_SUBMITTED",
    lifeWhisperResponsePhase: "UNAVAILABLE",
  };
  assertEqual(
    "Unavailable visual response does not silently unlock Reality",
    presentation.resolveFirstEncounterRealityEntryIntent(
      unavailableFacts,
    ),
    false,
  );
  assertEqual(
    "Explicit continuation unlocks Reality without counterfeit SETTLED",
    presentation.resolveFirstEncounterRealityEntryIntent({
      ...unavailableFacts,
      unavailableContinuation:
        "CONTINUE_WITHOUT_CONFIRMED_RESPONSE",
    }),
    true,
  );

  const page = fs.readFileSync(pagePath, "utf8");
  const host = fs.readFileSync(hostPath, "utf8");
  const props = fs.readFileSync(propsPath, "utf8");
  const renderer = fs.readFileSync(rendererPath, "utf8");

  assertExcludes(
    "First Encounter fixed success timer is removed",
    page,
    "LIFE_WHISPER_RESPONSE_HOLD_MS",
  );
  assertExcludes(
    "First Encounter response timer ref is removed",
    page,
    "lifeWhisperResponseTimerRef",
  );
  assertIncludes(
    "Timeout remains a failure watchdog only",
    page,
    "FIRST_ENCOUNTER_LIFE_WHISPER_OUTCOME_WATCHDOG_MS",
  );
  assertIncludes(
    "Watchdog marks visual response unavailable",
    page,
    'setLifeWhisperUnavailableReason("OUTCOME_WATCHDOG_EXPIRED")',
  );
  assertIncludes(
    "Page consumes shared typed transition",
    page,
    "resolveLifeWhisperVisualOutcomeTransition",
  );
  assertIncludes(
    "First Encounter carries an opaque response cycle",
    page,
    "first-encounter-life-whisper-cycle-",
  );
  assertIncludes(
    "Host receives the current response cycle",
    page,
    "responseCycleId: lifeWhisperResponseCycleId",
  );
  assertIncludes(
    "Page receives typed surface outcome",
    page,
    "onLifeWhisperVisualResponseOutcome=",
  );
  assertIncludes(
    "Unavailable response offers retry",
    page,
    'data-interaction="RETRY_LIFE_WHISPER_RESPONSE"',
  );
  assertIncludes(
    "Unavailable response offers explicit continuation",
    page,
    'data-interaction="CONTINUE_WITHOUT_CONFIRMED_RESPONSE"',
  );

  const settledWrites =
    page.match(/setLifeWhisperResponsePhase\("SETTLED"\)/g) ?? [];
  assertEqual(
    "First Encounter SETTLED has exactly one Page write",
    settledWrites.length,
    1,
  );

  assertIncludes(
    "Host prop contract is typed",
    props,
    "LifeWhisperSurfaceVisualResponseOutcome",
  );
  assertIncludes(
    "Surface Host polls renderer visual outcome",
    host,
    "controller.getSnapshot().lifeWhisperVisualResponseOutcome",
  );
  assertIncludes(
    "Outcome de-duplication remains identity-scoped",
    host,
    "consumerSourceResult.consumerSource.sourceReferenceId}:",
  );
  assertIncludes(
    "Static outcome requires a connected rendered surface",
    host,
    "staticLifeWhisperResponseRef.current?.isConnected !== true",
  );
  assertIncludes(
    "Reduced Motion reports semantic static presentation",
    host,
    'status: "STATIC_RESPONSE_PRESENTED"',
  );
  assertIncludes(
    "Renderer failure path remains development-only",
    host,
    "import.meta.env.DEV",
  );
  assertIncludes(
    "Renderer failure has an isolated browser override",
    host,
    '"__xinmaiRendererFailure"',
  );
  assertExcludes(
    "Renderer does not receive Life Whisper original text",
    host,
    "lifeWhisperText",
  );
  assertExcludes(
    "Renderer does not read visual outcome from DOM",
    renderer,
    "data-life-whisper-response-outcome",
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
      `${relativePath} does not consume First Encounter visual outcome`,
      source,
      "first-encounter-life-whisper-cycle-",
    );
  }

  console.log(
    "\n[XINMAI FIRST ENCOUNTER STARBEAST RESPONSE OUTCOME ATOMIC MIGRATION] PASS",
  );
} catch (error) {
  console.error(
    "[XINMAI FIRST ENCOUNTER STARBEAST RESPONSE OUTCOME ATOMIC MIGRATION] FAIL",
  );
  console.error(error instanceof Error ? error.stack ?? error.message : error);
  process.exit(1);
} finally {
  fs.rmSync(tempDir, { recursive: true, force: true });
}
