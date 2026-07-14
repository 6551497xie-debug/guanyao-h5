import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import process from "node:process";
import { build } from "esbuild";

const rootDir = process.cwd();
const adapterPath = path.join(rootDir, "src/services/guanyaoDynamicsValueFlowAdapter.ts");
const gravityPath = path.join(rootDir, "src/pages/GravityPage.tsx");
const adapterSource = fs.readFileSync(adapterPath, "utf8");
const gravitySource = fs.readFileSync(gravityPath, "utf8");
const tempModulePath = path.join(os.tmpdir(), `guanyao-value-flow-${process.pid}.mjs`);

const assertEqual = (name, actual, expected) => {
  if (actual !== expected) throw new Error(`${name} expected=${expected} actual=${actual}`);
  console.log(`PASS | ${name} | expected=${expected} | actual=${actual}`);
};

const assertIncludes = (name, source, expected) => {
  if (!source.includes(expected)) throw new Error(`${name} missing=${expected}`);
  console.log(`PASS | ${name} | includes=${expected}`);
};

const assertExcludes = (name, source, forbidden) => {
  if (source.includes(forbidden)) throw new Error(`${name} forbidden=${forbidden}`);
  console.log(`PASS | ${name} | forbidden=absent`);
};

const baseInput = (overrides = {}) => ({
  seedIntensity: 0,
  hasSeedCategory: false,
  completedNodeCount: 0,
  nodeLocked: false,
  enginePhase: "INIT",
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

  const { resolveDynamicsValueFlow } = await import(`file://${tempModulePath}?t=${Date.now()}`);

  const initialInput = baseInput();
  const initialSnapshot = JSON.stringify(initialInput);
  const initial = resolveDynamicsValueFlow(initialInput);
  assertEqual("initial behavior signals", initial.behaviorSignals.join("|"), "");
  assertEqual("initial pressure state", initial.pressureState, "LOW");
  assertEqual("initial emotional state", initial.emotionalState, "CALM");
  assertEqual("initial asset trigger", initial.assetTrigger, "NONE");
  assertEqual("initial monetization event", initial.monetizationEvent, "NONE");
  assertEqual("value flow result is frozen", Object.isFrozen(initial), true);
  assertEqual("behavior signals are frozen", Object.isFrozen(initial.behaviorSignals), true);
  assertEqual("hourglass loop remains closed", initial.hourglassLoopClosed, true);
  assertEqual("value flow remains non-invasive", initial.nonInvasive, true);
  assertEqual("adapter does not mutate input", JSON.stringify(initialInput), initialSnapshot);

  const medium = resolveDynamicsValueFlow(baseInput({ seedIntensity: 0.38 }));
  assertEqual("medium pressure threshold", medium.pressureState, "MEDIUM");
  assertEqual("medium pressure maps to tension", medium.emotionalState, "TENSION");

  const categoryBoost = resolveDynamicsValueFlow(baseInput({ seedIntensity: 0.3, hasSeedCategory: true }));
  assertEqual("seed category contributes pressure boost", categoryBoost.pressureState, "MEDIUM");

  const stalled = resolveDynamicsValueFlow(baseInput({ seedIntensity: 0.5, enginePhase: "NODE_RUNNING" }));
  assertEqual("empty running node emits stall", stalled.behaviorSignals.join("|"), "NODE_STALL");
  assertEqual("stall boost reaches high pressure", stalled.pressureState, "HIGH");
  assertEqual("high pressure maps to struggle", stalled.emotionalState, "STRUGGLE");
  assertEqual("high stalled flow exposes hourglass offer state", stalled.monetizationEvent, "HOURGLASS_INVERSION_OFFER");

  const locked = resolveDynamicsValueFlow(baseInput({ nodeLocked: true }));
  assertEqual("locked node emits stall outside running phase", locked.behaviorSignals.join("|"), "NODE_STALL");

  const progressing = resolveDynamicsValueFlow(baseInput({ completedNodeCount: 2, enginePhase: "NODE_RUNNING" }));
  assertEqual("running progress emits progress and breakthrough", progressing.behaviorSignals.join("|"), "NODE_PROGRESS|NODE_BREAKTHROUGH");
  assertEqual("two nodes do not trigger asset", progressing.assetTrigger, "NONE");

  const seedAsset = resolveDynamicsValueFlow(baseInput({ completedNodeCount: 3 }));
  assertEqual("three nodes expose seed asset state", seedAsset.assetTrigger, "SEED_ASSET");

  const breakthrough = resolveDynamicsValueFlow(baseInput({ completedNodeCount: 5, enginePhase: "NODE_RUNNING" }));
  assertEqual("five nodes map to breakthrough", breakthrough.emotionalState, "BREAKTHROUGH");
  assertEqual("five nodes expose emotional peak asset", breakthrough.assetTrigger, "EMOTIONAL_PEAK_ASSET");
  assertEqual("five nodes expose enhancement offer state", breakthrough.monetizationEvent, "UNLOCK_ENHANCEMENT_OFFER");

  const crystal = resolveDynamicsValueFlow(baseInput({ completedNodeCount: 6 }));
  assertEqual("six nodes emit completion", crystal.behaviorSignals.join("|"), "NODE_PROGRESS|COMPLETION_EVENT");
  assertEqual("six nodes map to crystallization", crystal.emotionalState, "CRYSTALLIZATION");
  assertEqual("six nodes expose crystal asset", crystal.assetTrigger, "64_HEXAGRAM_CRYSTAL_ASSET");
  assertEqual("six nodes expose asset upgrade state", crystal.monetizationEvent, "ASSET_UPGRADE_OFFER");

  const engineComplete = resolveDynamicsValueFlow(baseInput({ enginePhase: "COMPLETE" }));
  assertEqual("complete engine emits completion", engineComplete.behaviorSignals.join("|"), "COMPLETION_EVENT");
  assertEqual("complete engine maps to crystallization", engineComplete.emotionalState, "CRYSTALLIZATION");
  assertEqual("complete engine exposes crystal asset", engineComplete.assetTrigger, "64_HEXAGRAM_CRYSTAL_ASSET");
  assertEqual("upgrade state still requires six completed nodes", engineComplete.monetizationEvent, "NONE");

  const clamped = resolveDynamicsValueFlow(baseInput({ seedIntensity: 2 }));
  assertEqual("seed intensity clamps before pressure projection", clamped.pressureState, "HIGH");

  assertIncludes("adapter owns independent input", adapterSource, "export type DynamicsValueFlowAdapterInput");
  assertIncludes("adapter owns independent result", adapterSource, "export type DynamicsValueFlowResult");
  assertIncludes("adapter locks non-invasive semantics", adapterSource, "nonInvasive: true");
  assertExcludes("adapter does not consume execution snapshot", adapterSource, "ExecutionSnapshot");
  assertExcludes("adapter stays localStorage neutral", adapterSource, "localStorage");
  assertExcludes("adapter does not call network", adapterSource, "fetch(");
  assertExcludes("adapter does not dispatch commerce events", adapterSource, "dispatchEvent");
  assertIncludes("Gravity delegates value flow", gravitySource, "resolveDynamicsValueFlow({");
  assertIncludes("Gravity passes seed intensity", gravitySource, "seedIntensity: executionSnapshot.seed.intensity");
  assertIncludes("Gravity passes completed node count", gravitySource, "completedNodeCount: executionSnapshot.node.completed.length");
  assertIncludes("Gravity consumes projected behavior", gravitySource, "valueFlow.behaviorSignals.join");
  assertIncludes("Gravity consumes projected monetization state", gravitySource, "valueFlow.monetizationEvent");
  assertExcludes("Gravity no longer owns value flow resolver", gravitySource, "function resolveValueFlow");
  assertExcludes("Gravity no longer owns behavior signal resolver", gravitySource, "function resolveBehaviorSignals");
  assertExcludes("Gravity no longer owns monetization resolver", gravitySource, "function resolveMonetizationEvent");
  assertExcludes("Gravity no longer owns value flow state type", gravitySource, "type ValueFlowState");

  console.log("\n[DYNAMICS VALUE FLOW ADAPTER] PASS");
} catch (error) {
  console.error("[DYNAMICS VALUE FLOW ADAPTER] FAIL");
  console.error(error instanceof Error ? error.message : error);
  process.exit(1);
} finally {
  fs.rmSync(tempModulePath, { force: true });
}
