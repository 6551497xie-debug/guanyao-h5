import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import process from "node:process";
import { build } from "esbuild";

const rootDir = process.cwd();
const adapterPath = path.join(rootDir, "src/services/guanyaoDynamicsPersonalityRingPresentationAdapter.ts");
const gravityPath = path.join(rootDir, "src/pages/GravityPage.tsx");
const adapterSource = fs.readFileSync(adapterPath, "utf8");
const gravitySource = fs.readFileSync(gravityPath, "utf8");
const tempModulePath = path.join(os.tmpdir(), `guanyao-personality-ring-presentation-${process.pid}.mjs`);

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

const currentCrystalEndState = {
  source: "dynamics",
  status: "CRYSTALLIZED",
  createdAt: "2026-07-14T00:00:00.000Z",
  mother: {
    motherCodeName: "兑｜连接者",
    lowerTrigram: "兑",
  },
  pressure: {
    selectedPressureSeedId: "ring-presentation-seed",
    pressureField: "POWER",
  },
  hexagram: {
    lowerTrigram: "兑",
    upperTrigram: "乾",
    hexagramCode: "010",
    hexagramName: "天泽履",
    hexagramTitle: "冰上",
  },
  transmission: {
    completedNodeCount: 6,
    primaryDimension: "action",
  },
  crystal: {
    title: "本局结晶",
    copy: "这一局把快速行动恢复掌控，转向先判断真正要解决的问题。",
  },
};

const entry = (createdAt, hexagramName = "天泽履") => ({
  id: `ring-${createdAt}`,
  createdAt,
  source: "dynamics",
  mother: currentCrystalEndState.mother,
  pressure: currentCrystalEndState.pressure,
  hexagram: {
    ...currentCrystalEndState.hexagram,
    hexagramName,
  },
  transmission: currentCrystalEndState.transmission,
  crystal: currentCrystalEndState.crystal,
});

const state = (entries) => ({
  version: "1.0",
  updatedAt: "2026-07-14T04:00:00.000Z",
  entries,
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

  const { resolveDynamicsPersonalityRingPresentation } = await import(
    `file://${tempModulePath}?t=${Date.now()}`
  );

  const emptyState = state([]);
  const emptySnapshot = JSON.stringify(emptyState);
  const ready = resolveDynamicsPersonalityRingPresentation({
    state: emptyState,
    currentCrystalEndState,
  });
  assertEqual("presentation owns ring semantic role", ready.semanticRole, "PERSONALITY_RING_PRESENTATION");
  assertEqual("empty ring is not deposited", ready.isDeposited, false);
  assertEqual("empty ring count", ready.entryCount, 0);
  assertEqual("ready button status", ready.button.status, "READY_TO_DEPOSIT");
  assertEqual("ready button remains enabled", ready.button.disabled, false);
  assertEqual("ready button label", ready.button.label, "保存入人格年轮");
  assertEqual("empty ring hides confirmation", ready.confirmation.visible, false);
  assertEqual("current crystal supplies recent title", ready.recentHexagramTitle, "天泽履");
  assertEqual("presentation does not mutate state", JSON.stringify(emptyState), emptySnapshot);

  const depositedState = state([entry(currentCrystalEndState.createdAt)]);
  const deposited = resolveDynamicsPersonalityRingPresentation({
    state: depositedState,
    currentCrystalEndState,
  });
  assertEqual("matching crystal is deposited", deposited.isDeposited, true);
  assertEqual("deposited ring count", deposited.entryCount, 1);
  assertEqual("deposited button status", deposited.button.status, "DEPOSITED");
  assertEqual("deposited button is disabled", deposited.button.disabled, true);
  assertEqual("deposited button label", deposited.button.label, "已留痕");
  assertEqual("deposited ring shows confirmation", deposited.confirmation.visible, true);
  assertEqual("confirmation title remains unchanged", deposited.confirmation.title, "人格年轮已点亮");
  assertEqual(
    "confirmation copy remains unchanged",
    deposited.confirmation.copy,
    "这一局，已经成为你人格年轮上的一枚星点。",
  );
  assertEqual(
    "confirmation summary remains unchanged",
    deposited.confirmation.summary,
    "已留痕 · 1 枚结晶 · 最近一枚：天泽履",
  );

  const otherCrystalState = state([entry("2026-07-14T01:00:00.000Z", "风山渐")]);
  const available = resolveDynamicsPersonalityRingPresentation({
    state: otherCrystalState,
    currentCrystalEndState,
  });
  assertEqual("other ring entry does not mark current crystal", available.isDeposited, false);
  assertEqual("other ring entry still contributes count", available.entryCount, 1);

  const multiEntryState = state([
    entry("2026-07-14T02:00:00.000Z", "风山渐"),
    entry(currentCrystalEndState.createdAt),
  ]);
  const multiEntry = resolveDynamicsPersonalityRingPresentation({
    state: multiEntryState,
    currentCrystalEndState,
  });
  assertEqual("matching entry can appear anywhere", multiEntry.isDeposited, true);
  assertEqual("multi-entry count remains exact", multiEntry.entryCount, 2);
  assertEqual(
    "multi-entry summary keeps current crystal title",
    multiEntry.confirmation.summary,
    "已留痕 · 2 枚结晶 · 最近一枚：天泽履",
  );

  const fallbackTitle = resolveDynamicsPersonalityRingPresentation({
    state: emptyState,
    currentCrystalEndState: {
      ...currentCrystalEndState,
      hexagram: {
        lowerTrigram: "兑",
        upperTrigram: "乾",
      },
    },
  });
  assertEqual("missing hexagram identity falls back to round orientation", fallbackTitle.recentHexagramTitle, "本局定位");

  assertEqual("presentation is read only", ready.guardrails.readOnly, true);
  assertEqual("presentation never writes storage", ready.guardrails.writesStorage, false);
  assertEqual("presentation never deposits crystal", ready.guardrails.depositsCrystal, false);

  assertIncludes(
    "ring presentation adapter owns independent input",
    adapterSource,
    "export type DynamicsPersonalityRingPresentationAdapterInput",
  );
  assertIncludes(
    "ring presentation adapter owns independent result",
    adapterSource,
    "export type DynamicsPersonalityRingPresentation",
  );
  assertIncludes("ring presentation adapter declares read-only guardrail", adapterSource, "readOnly: true");
  assertIncludes("ring presentation adapter blocks storage writes", adapterSource, "writesStorage: false");
  assertIncludes("ring presentation adapter blocks deposits", adapterSource, "depositsCrystal: false");
  assertExcludes("ring presentation adapter stays localStorage neutral", adapterSource, "localStorage");
  assertExcludes("ring presentation adapter does not read persistence", adapterSource, "readPersonalityRingLite");
  assertExcludes("ring presentation adapter does not save persistence", adapterSource, "savePersonalityRingLiteEntry");
  assertExcludes("ring presentation adapter does not invoke deposit adapter", adapterSource, "depositDynamicsCurrentCrystal");

  assertIncludes(
    "Gravity delegates ring presentation",
    gravitySource,
    "resolveDynamicsPersonalityRingPresentation({",
  );
  assertIncludes("Gravity consumes ring button state", gravitySource, "ringPresentation.button.status");
  assertIncludes("Gravity consumes ring confirmation", gravitySource, "ringPresentation.confirmation.summary");
  assertExcludes("Gravity no longer owns saved entry search", gravitySource, "savedEntry");
  assertExcludes("Gravity no longer searches ring entries", gravitySource, "ringLiteState.entries.find");
  assertExcludes("Gravity no longer counts ring entries", gravitySource, "ringLiteState.entries.length");

  console.log("\n[DYNAMICS PERSONALITY RING PRESENTATION ADAPTER] PASS");
} catch (error) {
  console.error("[DYNAMICS PERSONALITY RING PRESENTATION ADAPTER] FAIL");
  console.error(error instanceof Error ? error.message : error);
  process.exit(1);
} finally {
  fs.rmSync(tempModulePath, { force: true });
}
