import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import process from "node:process";
import { build } from "esbuild";

const rootDir = process.cwd();
const adapterPath = path.join(rootDir, "src/services/guanyaoDynamicsExperienceStateAdapter.ts");
const gravityPath = path.join(rootDir, "src/pages/GravityPage.tsx");
const adapterSource = fs.readFileSync(adapterPath, "utf8");
const gravitySource = fs.readFileSync(gravityPath, "utf8");
const tempModulePath = path.join(os.tmpdir(), `guanyao-experience-state-${process.pid}.mjs`);

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
  completedNodeCount: 0,
  currentNode: 1,
  enginePhase: "INIT",
  uiPhase: "INIT",
  focalDimension: "body",
  timelineCurrent: "T0.0",
  loopLabel: "当前压力 → 六个空间 → 看见反应",
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

  const { resolveDynamicsExperienceState } = await import(`file://${tempModulePath}?t=${Date.now()}`);

  const pressureInput = baseInput();
  const pressureSnapshot = JSON.stringify(pressureInput);
  const pressure = resolveDynamicsExperienceState(pressureInput);
  assertEqual("initial runtime maps to pressure", pressure.stage, "PRESSURE");
  assertEqual("initial timeline focuses pressure field", pressure.primaryFocus, "PRESSURE_FIELD");
  assertEqual("experience state is frozen", Object.isFrozen(pressure), true);
  assertEqual("adapter does not mutate input", JSON.stringify(pressureInput), pressureSnapshot);

  const pressureAndBeast = resolveDynamicsExperienceState(baseInput({ timelineCurrent: "T0.95" }));
  assertEqual("blackhole timeline focuses pressure and beast", pressureAndBeast.primaryFocus, "PRESSURE_AND_BEAST");

  const awareness = resolveDynamicsExperienceState(baseInput({ uiPhase: "DIMENSION_LOCKED" }));
  assertEqual("dimension lock maps to awareness", awareness.stage, "AWARENESS");
  assertEqual("awareness focuses beast and dimension", awareness.primaryFocus, "BEAST_AND_DIMENSION");

  const action = resolveDynamicsExperienceState(baseInput({ uiPhase: "NODE_RUNNING", currentNode: 3 }));
  assertEqual("node running maps to action", action.stage, "ACTION");
  assertEqual("action focuses dimension flow", action.primaryFocus, "DIMENSION_FLOW");

  const transformation = resolveDynamicsExperienceState(baseInput({ completedNodeCount: 5, currentNode: 6 }));
  assertEqual("five completed nodes map to transformation", transformation.stage, "TRANSFORMATION");
  assertEqual("transformation focuses dimension flow", transformation.primaryFocus, "DIMENSION_FLOW");

  const crystalByCount = resolveDynamicsExperienceState(baseInput({ completedNodeCount: 6 }));
  assertEqual("six completed nodes map to crystal", crystalByCount.stage, "CRYSTAL");
  assertEqual("crystal focuses crystallization", crystalByCount.primaryFocus, "CRYSTALLIZATION");

  const crystalByEngine = resolveDynamicsExperienceState(baseInput({ enginePhase: "COMPLETE" }));
  assertEqual("complete engine maps to crystal", crystalByEngine.stage, "CRYSTAL");

  const dimensionCopies = {
    body: ["压力先落在身体里。", "身体比意识更早知道压力来了。", "这也许是身体曾经用来准备回应的方式。"],
    emotion: ["情绪先到了。", "你正在经历的感受，可能让这件事看起来更重。", "这种感受也许正在提醒你，哪里需要被照看。"],
    thought: ["解释开始成形。", "你看见的不只是事情，还有你给它的意义。", "这种解释也许曾经帮你抓住一点确定感。"],
    action: ["回应的方向露出来了。", "结果还不确定时，你会先用行动把局面拉回掌控。", "这个动作也许曾经帮你更快稳住局面。"],
    memory: ["旧经验被带到了现在。", "过去正在参与此刻，让现在像曾经的某一幕。", "这段过去也许曾经保护你，这一次可以先把它看清。"],
    goal: ["守护的核心露出来了。", "这些反应背后，有一个你不想失去的重要东西。", "这些反应背后，也许有一个你一直想守住的重要东西。"],
  };
  Object.entries(dimensionCopies).forEach(([focalDimension, [response, insight, understanding]]) => {
    const projected = resolveDynamicsExperienceState(baseInput({ uiPhase: "NODE_RUNNING", focalDimension }));
  });

  assertIncludes("adapter owns minimal input", adapterSource, "export type DynamicsExperienceStateAdapterInput");
  assertIncludes("adapter returns unified experience state", adapterSource, "): DynamicsExperienceState {");
  assertIncludes("adapter owns stage projection", adapterSource, "const stage: DynamicsExperienceStage");
  assertExcludes("adapter does not consume execution snapshot", adapterSource, "ExecutionSnapshot");
  assertExcludes("adapter does not consume visual state", adapterSource, "VisualState");
  assertExcludes("adapter does not advance runtime", adapterSource, "GuanyaoRuntimeEngine.");
  assertExcludes("adapter stays localStorage neutral", adapterSource, "localStorage");
  assertIncludes("Gravity delegates experience state", gravitySource, "resolveDynamicsExperienceState({");
  assertIncludes("Gravity passes completed node count", gravitySource, "completedNodeCount: executionSnapshot.node.completed.length");
  assertIncludes("Gravity passes focal dimension", gravitySource, "focalDimension: visualState.focalDimension");
  assertIncludes("Gravity passes timeline coordinate", gravitySource, "timelineCurrent: visualState.timeline.current");
  assertIncludes("Gravity product loop begins from reality fact", gravitySource, '"现实事实被看见"');
  assertIncludes("Gravity onboarding begins from one life window", gravitySource, '"先观察一个生命窗口"');
  assertIncludes("Gravity user perception keeps protective meaning tentative", gravitySource, '"这些回应也许曾经保护我"');
  assertExcludes("experience adapter removes conditional imprint language", adapterSource, "才会留下变化印记");
  assertExcludes("experience adapter removes passive response waiting", adapterSource, "等待新的回应");
  assertExcludes("experience adapter removes passive confirmation language", adapterSource, "新的回应被确认");
  assertExcludes("experience adapter removes missing-imprint framing", adapterSource, "尚未留下变化印记");
  assertExcludes("experience adapter removes pressure-through-body language", adapterSource, "压力正在穿过你");
  assertExcludes("experience adapter removes system entry language", adapterSource, "当前压力正在进入");
  assertExcludes("experience adapter removes predictive reaction language", adapterSource, "反应即将出现");
  assertExcludes("experience adapter removes six-space process forecast", adapterSource, "它将穿过身体");
  assertExcludes("experience adapter removes unfolding announcement", adapterSource, "六个空间即将展开");
  assertExcludes("experience adapter removes layered-pressure count copy", adapterSource, "压力已经被你看过几层");
  assertExcludes("experience adapter removes settled-reaction judgment", adapterSource, "你的反应正在安定下来");
  assertExcludes("Gravity removes crystallization gate language", gravitySource, "本局才会结晶");
  assertExcludes("Gravity no longer owns experience resolver", gravitySource, "function resolveExperienceState");

  console.log("\n[DYNAMICS EXPERIENCE STATE ADAPTER] PASS");
} catch (error) {
  console.error("[DYNAMICS EXPERIENCE STATE ADAPTER] FAIL");
  console.error(error instanceof Error ? error.message : error);
  process.exit(1);
} finally {
  fs.rmSync(tempModulePath, { force: true });
}
