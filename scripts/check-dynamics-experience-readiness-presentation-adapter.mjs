import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import process from "node:process";
import { build } from "esbuild";

const rootDir = process.cwd();
const adapterPath = path.join(rootDir, "src/services/guanyaoDynamicsExperienceReadinessPresentationAdapter.ts");
const typePath = path.join(rootDir, "src/types/dynamicsExperiencePresentation.ts");
const gravityPath = path.join(rootDir, "src/pages/GravityPage.tsx");
const adapterSource = fs.readFileSync(adapterPath, "utf8");
const typeSource = fs.readFileSync(typePath, "utf8");
const gravitySource = fs.readFileSync(gravityPath, "utf8");
const tempModulePath = path.join(os.tmpdir(), `guanyao-experience-readiness-presentation-${process.pid}.mjs`);

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

const pressureExperienceState = {
  stage: "PRESSURE",
  primaryFocus: "PRESSURE_FIELD",
  loopLabel: "看见 → 修正 → 留下",
  headline: "原始压力文案",
  supportingCopy: "原始支持文案",
  pressureCopy: "原始压力说明",
  beastCopy: "原始星兽说明",
  nodeCopy: {
    title: "压力刚开始出现",
    text: "你开始注意到这一层的反应。",
    actionText: "先看见它从哪里开始。",
  },
  crystalCopy: "原始结晶文案",
};

const pressureMissing = {
  status: "NOT_READY",
  readiness: "NOT_READY",
  reason: "PRESSURE_CONTEXT_MISSING",
  hasPressureContext: false,
};

const motherMissing = {
  status: "NOT_READY",
  readiness: "NOT_READY",
  reason: "MOTHER_CONTEXT_MISSING",
  hasPressureContext: true,
};

const motherPresentation = {
  motherCodeName: "兑｜连接者",
  personaSnapshot: {
    motherCode: "兑｜连接者",
    trigram: "兑",
    fourSymbol: "白虎",
  },
};

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

  const { resolveDynamicsExperienceReadinessPresentation } = await import(
    `file://${tempModulePath}?t=${Date.now()}`
  );

  const stateSnapshot = JSON.stringify(pressureExperienceState);
  const preview = resolveDynamicsExperienceReadinessPresentation({
    experienceState: pressureExperienceState,
    inputReadiness: pressureMissing,
    motherPresentation,
  });
  assertEqual("presentation owns semantic role", preview.semanticRole, "EXPERIENCE_READINESS_PRESENTATION");
  assertEqual("missing pressure enters safe preview", preview.mode, "SAFE_PREVIEW");
  assertEqual("safe preview exposes fallback marker", preview.pressureContextMarker, "fallback");
  assertEqual("safe preview keeps loop label", preview.experienceState.loopLabel, "六个空间预览");
  assertEqual("safe preview opens without waiting language", preview.experienceState.headline, "这一局还没有开始。");
  assertEqual(
    "safe preview leaves entry timing with the user",
    preview.experienceState.supportingCopy,
    "准备好时，选择此刻最想看清的一件事。",
  );
  assertEqual(
    "safe preview does not demand an explanation or answer",
    preview.experienceState.pressureCopy,
    "先不用解释，也不需要立刻得出答案。",
  );
  assertEqual(
    "safe preview brings user and starbeast into six spaces together",
    preview.experienceState.beastCopy,
    "你与星兽会从这里一起走进六个空间。",
  );
  assertEqual("presentation does not mutate base state", JSON.stringify(pressureExperienceState), stateSnapshot);

  const noMother = resolveDynamicsExperienceReadinessPresentation({
    experienceState: pressureExperienceState,
    inputReadiness: motherMissing,
    motherPresentation: { motherCodeName: "", personaSnapshot: null },
  });
  assertEqual("pressure without mother keeps runtime copy", noMother.mode, "RUNTIME");
  assertEqual("pressure context remains connected", noMother.pressureContextMarker, "connected");
  assertEqual("missing mother reference stays hidden", noMother.motherReference.visible, false);
  assertEqual("runtime state preserves identity", noMother.experienceState, pressureExperienceState);

  const motherConnected = resolveDynamicsExperienceReadinessPresentation({
    experienceState: pressureExperienceState,
    inputReadiness: motherMissing,
    motherPresentation,
  });
  assertEqual("pressure stage exposes mother connection", motherConnected.mode, "MOTHER_CONNECTED");
  assertEqual("mother connection keeps headline", motherConnected.experienceState.headline, "母码已接入。");
  assertEqual(
    "mother connection keeps supporting copy",
    motherConnected.experienceState.supportingCopy,
    "这一颗压力正在穿过你的母码。",
  );
  assertEqual(
    "mother connection keeps pressure copy",
    motherConnected.experienceState.pressureCopy,
    "母码已接入，压力开始进入六个空间。",
  );
  assertEqual("mother reference is visible", motherConnected.motherReference.visible, true);
  assertEqual("mother reference keeps name", motherConnected.motherReference.name, "兑｜连接者");
  assertEqual("mother reference keeps label", motherConnected.motherReference.label, "母码：兑｜连接者");

  const awarenessState = { ...pressureExperienceState, stage: "AWARENESS" };
  const progressed = resolveDynamicsExperienceReadinessPresentation({
    experienceState: awarenessState,
    inputReadiness: motherMissing,
    motherPresentation,
  });
  assertEqual("progressed experience uses runtime mode", progressed.mode, "RUNTIME");
  assertEqual("progressed state preserves identity", progressed.experienceState, awarenessState);

  assertEqual("presentation is read only", preview.guardrails.readOnly, true);
  assertEqual("presentation never advances runtime", preview.guardrails.advancesRuntime, false);
  assertEqual("presentation never writes storage", preview.guardrails.writesStorage, false);

  assertIncludes(
    "adapter owns independent input",
    adapterSource,
    "export type DynamicsExperienceReadinessPresentationAdapterInput",
  );
  assertIncludes(
    "adapter owns independent result",
    adapterSource,
    "export type DynamicsExperienceReadinessPresentation",
  );
  assertIncludes("experience state is independently typed", typeSource, "export type DynamicsExperienceState");
  assertExcludes("presentation stays localStorage neutral", adapterSource, "localStorage");
  assertExcludes("presentation does not advance runtime", adapterSource, "GuanyaoRuntimeEngine");
  assertExcludes("presentation does not deposit crystal", adapterSource, "depositDynamics");
  assertExcludes("safe preview removes technical preview copy", adapterSource, "当前为安全预览状态");
  assertExcludes("safe preview removes missing-context copy", adapterSource, "缺少本局上下文");
  assertExcludes("safe preview removes pressure waiting copy", adapterSource, "等待这一颗压力进入");
  assertExcludes("safe preview removes confirmation-gated copy", adapterSource, "压力确认后展开");
  assertIncludes(
    "Gravity delegates readiness presentation",
    gravitySource,
    "resolveDynamicsExperienceReadinessPresentation({",
  );
  assertIncludes(
    "Gravity consumes projected experience state",
    gravitySource,
    "experienceReadinessPresentation.experienceState",
  );
  assertIncludes(
    "Gravity consumes projected pressure marker",
    gravitySource,
    "experienceReadinessPresentation.pressureContextMarker",
  );
  assertIncludes(
    "Gravity consumes projected mother reference",
    gravitySource,
    "experienceReadinessPresentation.motherReference.label",
  );
  assertExcludes("Gravity no longer owns pressure readiness alias", gravitySource, "hasLockedPressureSeed");
  assertExcludes("Gravity does not own preview invitation", gravitySource, "这一局还没有开始。");
  assertExcludes("Gravity no longer owns mother connection headline", gravitySource, "母码已接入。");

  console.log("\n[DYNAMICS EXPERIENCE READINESS PRESENTATION ADAPTER] PASS");
} catch (error) {
  console.error("[DYNAMICS EXPERIENCE READINESS PRESENTATION ADAPTER] FAIL");
  console.error(error instanceof Error ? error.message : error);
  process.exit(1);
} finally {
  fs.rmSync(tempModulePath, { force: true });
}
