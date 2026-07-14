import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import process from "node:process";
import { build } from "esbuild";

const rootDir = process.cwd();
const adapterPath = path.join(rootDir, "src/services/guanyaoDynamicsSixSpaceProgressAdapter.ts");
const typePath = path.join(rootDir, "src/types/dynamicsSixSpaceProgress.ts");
const gravityPath = path.join(rootDir, "src/pages/GravityPage.tsx");
const adapterSource = fs.readFileSync(adapterPath, "utf8");
const typeSource = fs.readFileSync(typePath, "utf8");
const gravitySource = fs.readFileSync(gravityPath, "utf8");
const tempModulePath = path.join(os.tmpdir(), `guanyao-six-space-progress-${process.pid}.mjs`);

const assertEqual = (name, actual, expected) => {
  if (actual !== expected) throw new Error(`${name} expected=${expected} actual=${actual}`);
  console.log(`PASS | ${name} | expected=${expected} | actual=${actual}`);
};

const assertDeepEqual = (name, actual, expected) => {
  const actualJson = JSON.stringify(actual);
  const expectedJson = JSON.stringify(expected);
  if (actualJson !== expectedJson) throw new Error(`${name} expected=${expectedJson} actual=${actualJson}`);
  console.log(`PASS | ${name} | expected=${expectedJson} | actual=${actualJson}`);
};

const assertIncludes = (name, source, expected) => {
  if (!source.includes(expected)) throw new Error(`${name} missing=${expected}`);
  console.log(`PASS | ${name} | includes=${expected}`);
};

const assertExcludes = (name, source, forbidden) => {
  if (source.includes(forbidden)) throw new Error(`${name} forbidden=${forbidden}`);
  console.log(`PASS | ${name} | forbidden=absent`);
};

const orderedIds = ["body", "emotion", "thought", "action", "memory", "goal"];
const spaceConfigs = orderedIds.map((id, index) => ({ id, no: index + 1 }));
const sixDimensionState = Object.fromEntries(
  orderedIds.map((id, index) => [id, { bloomCount: index }]),
);
const baseInput = (overrides = {}) => ({
  activeDimensionIndex: 0,
  completedDimensionIds: [],
  completedNodeNumbers: [],
  enginePhase: "INIT",
  spaceConfigs,
  sixDimensionState,
  ...overrides,
});

try {
  await build({
    entryPoints: [adapterPath],
    outfile: tempModulePath,
    bundle: true,
    platform: "node",
    format: "esm",
    target: "node20",
    logLevel: "silent",
  });

  const {
    DYNAMICS_SEQUENTIAL_SIX_SPACE_IDS,
    resolveDynamicsSixSpaceProgress,
  } = await import(`file://${tempModulePath}?t=${Date.now()}`);

  const initialInput = baseInput();
  const initialInputSnapshot = JSON.stringify(initialInput);
  const initial = resolveDynamicsSixSpaceProgress(initialInput);
  assertEqual("semantic role", initial.semanticRole, "SIX_SPACE_PROGRESS");
  assertDeepEqual("sequential protocol", initial.sequentialSpaceIds, orderedIds);
  assertEqual("initial current space", initial.currentSpaceId, "body");
  assertEqual("initial current step", initial.currentSpaceStep, 1);
  assertEqual("initial completed space count", initial.completedSpaceCount, 0);
  assertEqual("initial completed inner node count", initial.completedInnerNodeCount, 0);
  assertEqual("initial current petal is active", initial.petalStates.body, "active");
  assertEqual("initial next petal is dormant", initial.petalStates.emotion, "dormant");
  assertEqual("pollen follows botanics bloom count", initial.pollenBursts.goal, 5);
  assertEqual("initial feedback is incomplete", initial.starbeastFeedbackComplete, false);
  assertEqual("adapter does not mutate input", JSON.stringify(initialInput), initialInputSnapshot);

  const running = resolveDynamicsSixSpaceProgress(baseInput({
    activeDimensionIndex: 2,
    completedDimensionIds: ["emotion", "body", "emotion"],
    completedNodeNumbers: [0, 1, 1, 4, 6, 7],
    enginePhase: "NODE_RUNNING",
  }));
  assertEqual("running current space", running.currentSpaceId, "thought");
  assertEqual("running current step", running.currentSpaceStep, 3);
  assertDeepEqual("completed spaces deduplicate in protocol order", running.completedSpaceIds, ["body", "emotion"]);
  assertEqual("completed space count", running.completedSpaceCount, 2);
  assertEqual("completed node compatibility preserves valid duplicates", running.completedInnerNodeCount, 4);
  assertEqual("completed petal blooms", running.petalStates.body, "blooming");
  assertEqual("current unfinished petal is active", running.petalStates.thought, "active");
  assertEqual("later petal stays dormant", running.petalStates.action, "dormant");
  assertEqual("running feedback remains incomplete", running.starbeastFeedbackComplete, false);

  const currentAlreadyCompleted = resolveDynamicsSixSpaceProgress(baseInput({
    activeDimensionIndex: 3,
    completedDimensionIds: ["action"],
  }));
  assertEqual("completed state wins over current state", currentAlreadyCompleted.petalStates.action, "blooming");

  const reorderedConfig = resolveDynamicsSixSpaceProgress(baseInput({
    activeDimensionIndex: 4,
    spaceConfigs: [...spaceConfigs].reverse(),
  }));
  assertEqual("current step resolves by space id", reorderedConfig.currentSpaceStep, 5);

  assertEqual(
    "negative current index clamps to body",
    resolveDynamicsSixSpaceProgress(baseInput({ activeDimensionIndex: -4 })).currentSpaceId,
    "body",
  );
  assertEqual(
    "overflow current index clamps to goal",
    resolveDynamicsSixSpaceProgress(baseInput({ activeDimensionIndex: 12 })).currentSpaceId,
    "goal",
  );

  const complete = resolveDynamicsSixSpaceProgress(baseInput({
    activeDimensionIndex: 5,
    completedDimensionIds: ["body"],
    enginePhase: "COMPLETE",
  }));
  assertDeepEqual("complete engine fills every space", complete.completedSpaceIds, orderedIds);
  assertEqual("complete engine counts every space", complete.completedSpaceCount, 6);
  orderedIds.forEach((id) => assertEqual(`complete ${id} petal blooms`, complete.petalStates[id], "blooming"));
  assertEqual("complete engine finishes starbeast feedback", complete.starbeastFeedbackComplete, true);

  const allSpacesBeforeEngineComplete = resolveDynamicsSixSpaceProgress(baseInput({
    completedDimensionIds: orderedIds,
    enginePhase: "NODE_RUNNING",
  }));
  assertEqual(
    "all spaces alone do not finish starbeast feedback",
    allSpacesBeforeEngineComplete.starbeastFeedbackComplete,
    false,
  );

  assertEqual("result is frozen", Object.isFrozen(initial), true);
  assertEqual("sequence is frozen", Object.isFrozen(DYNAMICS_SEQUENTIAL_SIX_SPACE_IDS), true);
  assertEqual("completed ids are frozen", Object.isFrozen(initial.completedSpaceIds), true);
  assertEqual("petal states are frozen", Object.isFrozen(initial.petalStates), true);
  assertEqual("pollen bursts are frozen", Object.isFrozen(initial.pollenBursts), true);
  assertEqual("guardrails are frozen", Object.isFrozen(initial.guardrails), true);
  assertEqual("adapter cannot advance runtime", initial.guardrails.advancesRuntime, false);
  assertEqual("adapter cannot write storage", initial.guardrails.writesStorage, false);
  assertEqual("adapter cannot control animation", initial.guardrails.controlsAnimation, false);

  assertIncludes("adapter owns independent input", adapterSource, "export type DynamicsSixSpaceProgressAdapterInput");
  assertIncludes("progress owns independent output type", typeSource, "export type DynamicsSixSpaceProgress");
  assertExcludes("adapter does not consume execution snapshot", adapterSource, "ExecutionSnapshot");
  assertExcludes("adapter does not consume runtime projection", adapterSource, "RuntimeProjection");
  assertExcludes("adapter does not call runtime engine", adapterSource, "GuanyaoRuntimeEngine");
  assertExcludes("adapter does not access DOM", adapterSource, "document.");
  assertExcludes("adapter does not own timers", adapterSource, "setTimeout");
  assertExcludes("adapter stays localStorage neutral", adapterSource, "localStorage");
  assertIncludes("Gravity delegates six-space progress", gravitySource, "resolveDynamicsSixSpaceProgress({");
  assertIncludes("Gravity consumes projected current space", gravitySource, "sixSpaceProgress.currentSpaceId");
  assertIncludes("Gravity consumes projected petal states", gravitySource, "petalStates={sixSpaceProgress.petalStates}");
  assertIncludes("Gravity consumes projected pollen bursts", gravitySource, "pollenBursts={sixSpaceProgress.pollenBursts}");
  assertExcludes("Gravity no longer owns sequence literal", gravitySource, "const SEQUENTIAL_SIX_SPACE_IDS");
  assertExcludes("Gravity no longer owns completed-node counter", gravitySource, "function countCompletedSixDimensions");
  assertExcludes("Gravity no longer builds petal records", gravitySource, "function buildSpaceRecord");
  assertExcludes("Gravity no longer owns visible petal projection", gravitySource, "const visiblePetalStates");
  assertExcludes("Gravity no longer owns pollen projection", gravitySource, "const cosmicPollenBursts");

  console.log("\n[DYNAMICS SIX SPACE PROGRESS ADAPTER] PASS");
} catch (error) {
  console.error("[DYNAMICS SIX SPACE PROGRESS ADAPTER] FAIL");
  console.error(error instanceof Error ? error.message : error);
  process.exit(1);
} finally {
  fs.rmSync(tempModulePath, { force: true });
}
