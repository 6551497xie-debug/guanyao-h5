import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import process from "node:process";
import { build } from "esbuild";

const rootDir = process.cwd();
const adapterPath = path.join(rootDir, "src/services/guanyaoDynamicsVisualStateAdapter.ts");
const typePath = path.join(rootDir, "src/types/dynamicsVisualState.ts");
const gravityPath = path.join(rootDir, "src/pages/GravityPage.tsx");
const adapterSource = fs.readFileSync(adapterPath, "utf8");
const typeSource = fs.readFileSync(typePath, "utf8");
const gravitySource = fs.readFileSync(gravityPath, "utf8");
const tempModulePath = path.join(os.tmpdir(), `guanyao-visual-state-${process.pid}.mjs`);

const assertEqual = (name, actual, expected) => {
  if (actual !== expected) throw new Error(`${name} expected=${expected} actual=${actual}`);
  console.log(`PASS | ${name} | expected=${expected} | actual=${actual}`);
};

const assertClose = (name, actual, expected) => {
  if (Math.abs(actual - expected) > 1e-9) throw new Error(`${name} expected=${expected} actual=${actual}`);
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
  completedNodeCount: 0,
  currentNode: 1,
  seedIntensity: undefined,
  beastResonance: 0.5,
  beastTone: "calm",
  enginePhase: "INIT",
  uiPhase: "INIT",
  runtimePrimaryDimension: "body",
  sequentialFocalDimension: "action",
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

  const { resolveDynamicsVisualState } = await import(`file://${tempModulePath}?t=${Date.now()}`);

  const initialInput = baseInput();
  const initialSnapshot = JSON.stringify(initialInput);
  const initial = resolveDynamicsVisualState(initialInput);
  assertEqual("initial visual depth", initial.visualDepthState, "background_calm");
  assertEqual("initial spatial composition", initial.spatialComposition, "calm_state");
  assertEqual("initial timeline coordinate", initial.timeline.current, "T0.0");
  assertEqual("initial timeline label", initial.timeline.label, "T0.0 -> calm state");
  assertClose("missing seed uses pressure fallback", initial.primitives.PRESSURE.intensity, 0.32);
  assertEqual("calm visual dimension stays dormant", initial.primitives.DIMENSION.state, "dormant");
  assertClose("calm dimension intensity", initial.primitives.DIMENSION.intensity, 0.28);
  assertClose("initial particle intensity", initial.primitives.PARTICLE.intensity, 0.32);
  assertClose("initial transition energy follows resonance", initial.primitives.PARTICLE.transitionEnergy, 0.21);
  assertClose("initial pressure urgency", initial.primitives.PRESSURE.urgency, 0.2304);
  assertEqual("visual state is frozen", Object.isFrozen(initial), true);
  assertEqual("adapter does not mutate input", JSON.stringify(initialInput), initialSnapshot);

  const phaseCases = [
    ["SEED_ACTIVE", "structural_activation", "blackhole_activation", "T0.95", "T0.95 -> blackhole activation"],
    ["DIMENSION_LOCKED", "entity_emergence", "beast_emergence", "T2.4", "T2.4 -> beast emergence"],
    ["NODE_RUNNING", "interaction_focus", "node_focus_collapse", "T3.6", "T3.6 -> node focus collapse"],
    ["COMPLETE", "crystallization", "supernova_crystallization", "completion", "completion -> supernova crystallization"],
  ];
  phaseCases.forEach(([uiPhase, depth, composition, timeline, label]) => {
    const projected = resolveDynamicsVisualState(baseInput({ uiPhase }));
    assertEqual(`${uiPhase} visual depth`, projected.visualDepthState, depth);
    assertEqual(`${uiPhase} composition`, projected.spatialComposition, composition);
    assertEqual(`${uiPhase} timeline`, projected.timeline.current, timeline);
    assertEqual(`${uiPhase} timeline label`, projected.timeline.label, label);
  });

  const calmDimensionTones = {
    body: "176,210,206",
    emotion: "199,169,107",
    thought: "184,200,224",
    action: "222,196,154",
    memory: "190,178,214",
    goal: "210,190,150",
  };
  Object.entries(calmDimensionTones).forEach(([runtimePrimaryDimension, tone]) => {
    const projected = resolveDynamicsVisualState(baseInput({ runtimePrimaryDimension }));
    assertEqual(`${runtimePrimaryDimension} calm color temperature`, projected.colorTemperature, tone);
  });
  assertEqual(
    "sovereign tone overrides dimension color",
    resolveDynamicsVisualState(baseInput({ runtimePrimaryDimension: "thought", beastTone: "sovereign" })).colorTemperature,
    "222,196,154",
  );
  assertEqual(
    "charge tone overrides dimension color",
    resolveDynamicsVisualState(baseInput({ runtimePrimaryDimension: "thought", beastTone: "charge" })).colorTemperature,
    "199,169,107",
  );
  assertEqual(
    "strain tone overrides dimension color",
    resolveDynamicsVisualState(baseInput({ runtimePrimaryDimension: "thought", beastTone: "strain" })).colorTemperature,
    "176,210,206",
  );

  const aligned = resolveDynamicsVisualState(baseInput({
    runtimePrimaryDimension: "body",
    sequentialFocalDimension: "memory",
  }));
  assertEqual("sequential dimension owns visual focus", aligned.focalDimension, "memory");
  assertEqual("sequential dimension owns primitive focus", aligned.primitives.DIMENSION.activeDimension, "memory");
  assertEqual("runtime dimension still owns color", aligned.colorTemperature, "176,210,206");

  const destabilized = resolveDynamicsVisualState(baseInput({
    uiPhase: "SEED_ACTIVE",
    seedIntensity: 0.8,
  }));
  assertEqual("early high pressure destabilizes dimension", destabilized.primitives.DIMENSION.state, "destabilized");
  const stabilized = resolveDynamicsVisualState(baseInput({
    uiPhase: "SEED_ACTIVE",
    seedIntensity: 0.8,
    completedNodeCount: 3,
  }));
  assertEqual("node progress stabilizes dimension", stabilized.primitives.DIMENSION.state, "active");

  const running = resolveDynamicsVisualState(baseInput({
    uiPhase: "NODE_RUNNING",
    enginePhase: "NODE_RUNNING",
    seedIntensity: 0.8,
    completedNodeCount: 3,
  }));
  assertClose("running pressure urgency stays full", running.primitives.PRESSURE.urgency, 0.8);
  assertClose("interaction transition energy follows progress", running.primitives.PARTICLE.transitionEnergy, 0.5);
  assertClose("node activity follows progress", running.primitives.PARTICLE.nodeActivity, 0.5);

  const complete = resolveDynamicsVisualState(baseInput({
    uiPhase: "COMPLETE",
    enginePhase: "COMPLETE",
    completedNodeCount: 8,
    beastResonance: 2,
  }));
  assertClose("completed progress clamps to one", complete.primitives.PARTICLE.nodeActivity, 1);
  assertClose("resonance clamps to one", complete.primitives.BEAST.coherence, 1);
  assertClose("complete engine removes pressure instability", complete.primitives.PRESSURE.instability, 0);
  assertClose("crystallization transition energy", complete.primitives.PARTICLE.transitionEnergy, 1);

  assertEqual("z-depth background remains fixed", complete.zDepth.background, 0);
  assertEqual("z-depth narrative remains fixed", complete.zDepth.narrative, 4);

  assertIncludes("adapter owns independent input", adapterSource, "export type DynamicsVisualStateAdapterInput");
  assertIncludes("visual state owns independent type", typeSource, "export type DynamicsVisualState");
  assertExcludes("adapter does not consume execution snapshot", adapterSource, "ExecutionSnapshot");
  assertExcludes("adapter does not consume runtime projection", adapterSource, "RuntimeProjection");
  assertExcludes("adapter does not access DOM", adapterSource, "document.");
  assertExcludes("adapter does not own timers", adapterSource, "setTimeout");
  assertExcludes("adapter stays localStorage neutral", adapterSource, "localStorage");
  assertIncludes("Gravity delegates visual state", gravitySource, "resolveDynamicsVisualState({");
  assertIncludes("Gravity passes runtime primary dimension", gravitySource, "runtimePrimaryDimension: runtimeProjection.currentPrimarySpaceId");
  assertIncludes("Gravity passes sequential focus", gravitySource, "sequentialFocalDimension: sequentialCurrentSpaceId");
  assertExcludes("Gravity no longer owns visual resolver", gravitySource, "function resolveVisualState");
  assertExcludes("Gravity no longer owns visual alignment", gravitySource, "alignVisualStateToSequentialDimension");
  assertExcludes("Gravity no longer owns visual timeline", gravitySource, "VISUAL_TIMELINE_SYNC");
  assertExcludes("Gravity no longer owns visual state type", gravitySource, "type VisualState");

  console.log("\n[DYNAMICS VISUAL STATE ADAPTER] PASS");
} catch (error) {
  console.error("[DYNAMICS VISUAL STATE ADAPTER] FAIL");
  console.error(error instanceof Error ? error.message : error);
  process.exit(1);
} finally {
  fs.rmSync(tempModulePath, { force: true });
}
