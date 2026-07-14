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
  assertEqual("pressure headline begins with present experience", pressure.headline, "这一刻，你的感受和回应正在出现。");
  assertEqual(
    "pressure supporting copy invites observation before change",
    pressure.supportingCopy,
    "先不用改变什么，只看见此刻发生了什么。",
  );
  assertEqual("pressure copy names the present situation", pressure.pressureCopy, "这件事已经来到你面前。");
  assertEqual(
    "pressure beast copy observes how response happens",
    pressure.beastCopy,
    "你与星兽会从这里一起看见，回应如何发生。",
  );
  assertEqual(
    "pressure stage begins with observation instead of a missing result",
    pressure.crystalCopy,
    "这一局刚刚开始，先看见此刻的回应。",
  );
  assertEqual("product loop label passes through", pressure.loopLabel, pressureInput.loopLabel);
  assertEqual("experience state is frozen", Object.isFrozen(pressure), true);
  assertEqual("adapter does not mutate input", JSON.stringify(pressureInput), pressureSnapshot);

  const pressureAndBeast = resolveDynamicsExperienceState(baseInput({ timelineCurrent: "T0.95" }));
  assertEqual("blackhole timeline focuses pressure and beast", pressureAndBeast.primaryFocus, "PRESSURE_AND_BEAST");

  const awareness = resolveDynamicsExperienceState(baseInput({ uiPhase: "DIMENSION_LOCKED" }));
  assertEqual("dimension lock maps to awareness", awareness.stage, "AWARENESS");
  assertEqual("awareness focuses beast and dimension", awareness.primaryFocus, "BEAST_AND_DIMENSION");
  assertEqual("awareness headline remains unchanged", awareness.headline, "这一颗压力，被看见了。");

  const action = resolveDynamicsExperienceState(baseInput({ uiPhase: "NODE_RUNNING", currentNode: 3 }));
  assertEqual("node running maps to action", action.stage, "ACTION");
  assertEqual("action focuses dimension flow", action.primaryFocus, "DIMENSION_FLOW");
  assertEqual("third node title remains unchanged", action.nodeCopy.title, "你开始解释这件事");
  assertEqual(
    "action previews a user-owned response",
    action.crystalCopy,
    "完成六维后，准备好时，你可以认领一个新的回应。",
  );

  const transformation = resolveDynamicsExperienceState(baseInput({ completedNodeCount: 5, currentNode: 6 }));
  assertEqual("five completed nodes map to transformation", transformation.stage, "TRANSFORMATION");
  assertEqual("transformation focuses dimension flow", transformation.primaryFocus, "DIMENSION_FLOW");
  assertEqual("transformation headline remains unchanged", transformation.headline, "这一局正在收束。");
  assertEqual(
    "transformation stage keeps change in progress without demanding an answer",
    transformation.crystalCopy,
    "这一局的变化正在发生，还不需要得出答案。",
  );

  const crystalByCount = resolveDynamicsExperienceState(baseInput({ completedNodeCount: 6 }));
  assertEqual("six completed nodes map to crystal", crystalByCount.stage, "CRYSTAL");
  assertEqual("crystal focuses crystallization", crystalByCount.primaryFocus, "CRYSTALLIZATION");
  assertEqual(
    "crystal transition preserves user agency",
    crystalByCount.supportingCopy,
    "当你愿意认领一个新的回应，这一局会留下它发生过的变化印记。",
  );
  assertEqual(
    "crystal action leaves timing with the user",
    crystalByCount.nodeCopy.actionText,
    "准备好时，你可以认领一个新的回应。",
  );
  assertEqual(
    "crystal copy frames imprint as a user-owned response",
    crystalByCount.crystalCopy,
    "你走完了六层。准备好时，你可以认领一个新的回应，让这一局的变化留下印记。",
  );

  const crystalByEngine = resolveDynamicsExperienceState(baseInput({ enginePhase: "COMPLETE" }));
  assertEqual("complete engine maps to crystal", crystalByEngine.stage, "CRYSTAL");

  const dimensionCopies = {
    body: ["压力先落在身体里。", "身体比意识更早知道压力来了。", "先感到它，是身体在帮你准备回应。"],
    emotion: ["情绪先到了。", "你正在经历的感受，可能让这件事看起来更重。", "它不是问题，它是在提醒你哪里需要被照看。"],
    thought: ["解释开始成形。", "你看见的不只是事情，还有你给它的意义。", "这种解释曾帮你抓住确定感。"],
    action: ["回应的方向露出来了。", "结果还不确定时，你会先用行动把局面拉回掌控。", "行动力是能力，现在需要先判断再出手。"],
    memory: ["旧经验被带到了现在。", "过去正在参与此刻，让现在像曾经的某一幕。", "它曾保护你，这一次可以只作为参考。"],
    goal: ["守护的核心露出来了。", "这些反应背后，有一个你不想失去的重要东西。", "动机不是计划，是你正在保护的价值感。"],
  };
  Object.entries(dimensionCopies).forEach(([focalDimension, [response, insight, understanding]]) => {
    const projected = resolveDynamicsExperienceState(baseInput({ uiPhase: "NODE_RUNNING", focalDimension }));
    assertEqual(`${focalDimension} response copy`, projected.nodeCopy.text.endsWith(response), true);
    assertEqual(`${focalDimension} insight copy`, projected.nodeCopy.dimensionInsight, insight);
    assertEqual(`${focalDimension} understanding copy`, projected.nodeCopy.dimensionUnderstanding, understanding);
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
  assertEqual(
    "Gravity reuses experience supporting copy in both presentation positions",
    gravitySource.split("displayExperienceState.supportingCopy").length - 1,
    2,
  );
  assertExcludes("experience adapter removes conditional imprint language", adapterSource, "才会留下变化印记");
  assertExcludes("experience adapter removes passive response waiting", adapterSource, "等待新的回应");
  assertExcludes("experience adapter removes passive confirmation language", adapterSource, "新的回应被确认");
  assertExcludes("experience adapter removes missing-imprint framing", adapterSource, "尚未留下变化印记");
  assertExcludes("experience adapter removes pressure-through-body language", adapterSource, "压力正在穿过你");
  assertExcludes("experience adapter removes system entry language", adapterSource, "当前压力正在进入");
  assertExcludes("experience adapter removes predictive reaction language", adapterSource, "反应即将出现");
  assertExcludes("Gravity removes crystallization gate language", gravitySource, "本局才会结晶");
  assertExcludes("Gravity no longer owns experience resolver", gravitySource, "function resolveExperienceState");
  assertExcludes("Gravity no longer owns dimension response copy", gravitySource, "SIX_DIMENSION_RESPONSE_COPY");
  assertExcludes("Gravity no longer owns semantic stage copy", gravitySource, "YAO_SEMANTIC_STAGES");
  assertExcludes("Gravity does not own pressure headline", gravitySource, "这一刻，你的感受和回应正在出现。");

  console.log("\n[DYNAMICS EXPERIENCE STATE ADAPTER] PASS");
} catch (error) {
  console.error("[DYNAMICS EXPERIENCE STATE ADAPTER] FAIL");
  console.error(error instanceof Error ? error.message : error);
  process.exit(1);
} finally {
  fs.rmSync(tempModulePath, { force: true });
}
