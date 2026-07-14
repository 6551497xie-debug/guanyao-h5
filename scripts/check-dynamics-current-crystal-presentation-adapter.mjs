import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import process from "node:process";
import { build } from "esbuild";

const rootDir = process.cwd();
const adapterPath = path.join(rootDir, "src/services/guanyaoDynamicsCurrentCrystalPresentationAdapter.ts");
const gravityPath = path.join(rootDir, "src/pages/GravityPage.tsx");
const depositAdapterPath = path.join(rootDir, "src/services/guanyaoDynamicsPersonalityRingDepositAdapter.ts");
const adapterSource = fs.readFileSync(adapterPath, "utf8");
const gravitySource = fs.readFileSync(gravityPath, "utf8");
const depositAdapterSource = fs.readFileSync(depositAdapterPath, "utf8");
const tempModulePath = path.join(os.tmpdir(), `guanyao-current-crystal-presentation-${process.pid}.mjs`);

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
    selectedPressureSeedId: "presentation-seed",
    surface: "不应进入最终表达的压力原句",
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

const dimensionCases = [
  ["body", "身体"],
  ["emotion", "情绪"],
  ["thought", "思想"],
  ["action", "行动"],
  ["memory", "记忆"],
  ["motivation", "动机"],
  ["behavior", "行动"],
  ["unknown", "六个空间"],
];

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

  const { resolveDynamicsCurrentCrystalPresentation } = await import(
    `file://${tempModulePath}?t=${Date.now()}`
  );

  const presentation = resolveDynamicsCurrentCrystalPresentation({ currentCrystalEndState });
  assertEqual("presentation semantic role is final crystal expression", presentation.semanticRole, "CURRENT_CRYSTAL_EXPRESSION");
  assertEqual("presentation resolves hexagram title", presentation.hexagramTitle, "天泽履");
  assertEqual("presentation resolves mother name", presentation.motherName, "兑｜连接者");
  assertEqual("presentation preserves lower trigram", presentation.lowerTrigram, "兑");
  assertEqual("presentation preserves upper trigram", presentation.upperTrigram, "乾");
  assertEqual("presentation resolves formal action dimension", presentation.primaryDimensionLabel, "行动");
  assertEqual("presentation preserves crystal copy", presentation.crystalCopy, currentCrystalEndState.crystal.copy);
  assertEqual(
    "presentation forms card journey",
    presentation.cardJourneyCopy,
    "这一局从【兑｜连接者】进入【天泽履】。经过你的回应和变化，它留下了自己的结晶。",
  );
  assertEqual(
    "presentation forms privacy copy",
    presentation.cardPrivacyCopy,
    "认领这一局留下的变化印记。它只保留人格动态，不暴露具体压力原句。",
  );
  assertEqual("presentation behavior reading count", presentation.behaviorReading.length, 4);
  assertEqual(
    "presentation behavior reading keeps pressure and dimension",
    presentation.behaviorReading[2],
    "这一次压力来自权力压力。它优先留在行动这里。",
  );
  assertEqual(
    "presentation excludes raw pressure surface",
    JSON.stringify(presentation).includes(currentCrystalEndState.pressure.surface),
    false,
  );
  assertEqual("presentation is persona migration expression", presentation.guardrails.isPersonaMigrationExpression, true);
  assertEqual("presentation is not initial hexagram", presentation.guardrails.isInitialHexagram, false);
  assertEqual("presentation is not personality label", presentation.guardrails.isPersonalityLabel, false);
  assertEqual("presentation does not expose pressure surface", presentation.guardrails.exposesPressureSurface, false);

  dimensionCases.forEach(([dimension, label]) => {
    const mapped = resolveDynamicsCurrentCrystalPresentation({
      currentCrystalEndState: {
        ...currentCrystalEndState,
        transmission: {
          completedNodeCount: 6,
          primaryDimension: dimension,
        },
      },
    });
    assertEqual(`${dimension} dimension label`, mapped.primaryDimensionLabel, label);
  });

  const noPrimaryDimension = resolveDynamicsCurrentCrystalPresentation({
    currentCrystalEndState: {
      ...currentCrystalEndState,
      transmission: { completedNodeCount: 6 },
    },
  });
  assertEqual("missing dimension uses six-space label", noPrimaryDimension.primaryDimensionLabel, "六个空间");
  assertEqual(
    "missing dimension uses completed journey copy",
    noPrimaryDimension.behaviorReading[2],
    "这一次压力来自权力压力。它已经穿过六个空间。",
  );

  const fallbackIdentity = resolveDynamicsCurrentCrystalPresentation({
    currentCrystalEndState: {
      ...currentCrystalEndState,
      mother: { motherCodeName: "", lowerTrigram: "兑" },
      hexagram: {
        lowerTrigram: "兑",
        upperTrigram: "乾",
      },
    },
  });
  assertEqual("missing mother name falls back to lower trigram", fallbackIdentity.motherName, "兑");
  assertEqual("missing hexagram identity falls back to round orientation", fallbackIdentity.hexagramTitle, "本局定位");

  assertIncludes(
    "crystal presentation adapter owns independent input",
    adapterSource,
    "export type DynamicsCurrentCrystalPresentationAdapterInput",
  );
  assertIncludes(
    "crystal presentation adapter owns independent result",
    adapterSource,
    "export type DynamicsCurrentCrystalPresentation",
  );
  assertIncludes(
    "crystal presentation adapter declares migration expression",
    adapterSource,
    'semanticRole: "CURRENT_CRYSTAL_EXPRESSION"',
  );
  assertIncludes("crystal presentation adapter blocks initial hexagram semantics", adapterSource, "isInitialHexagram: false");
  assertIncludes("crystal presentation adapter blocks personality label semantics", adapterSource, "isPersonalityLabel: false");
  assertIncludes("crystal presentation adapter blocks raw pressure surface", adapterSource, "exposesPressureSurface: false");
  assertIncludes(
    "Gravity delegates current crystal presentation",
    gravitySource,
    "resolveDynamicsCurrentCrystalPresentation({ currentCrystalEndState: state })",
  );
  assertIncludes("Gravity consumes crystal presentation title", gravitySource, "presentation.hexagramTitle");
  assertIncludes("Gravity consumes crystal presentation reading", gravitySource, "presentation.behaviorReading.map");
  assertExcludes("Gravity no longer owns crystal dimension labels", gravitySource, "function crystalDimensionLabel");
  assertExcludes("Gravity no longer owns crystal behavior reading", gravitySource, "function buildCrystalBehaviorReading");
  assertExcludes("Gravity no longer reads raw hexagram for presentation", gravitySource, "state.hexagram.");
  assertExcludes("Gravity no longer reads raw crystal copy for presentation", gravitySource, "state.crystal.copy");
  assertIncludes(
    "deposit adapter keeps raw crystal entry formation",
    depositAdapterSource,
    "createPersonalityRingLiteEntryFromCrystal(input.currentCrystalEndState)",
  );
  assertIncludes(
    "deposit adapter keeps explicit personality ring deposition",
    depositAdapterSource,
    "savePersonalityRingLiteEntry(entry)",
  );
  assertIncludes(
    "Gravity delegates user-triggered ring deposition",
    gravitySource,
    "depositDynamicsCurrentCrystalToPersonalityRing({",
  );

  console.log("\n[DYNAMICS CURRENT CRYSTAL PRESENTATION ADAPTER] PASS");
} catch (error) {
  console.error("[DYNAMICS CURRENT CRYSTAL PRESENTATION ADAPTER] FAIL");
  console.error(error instanceof Error ? error.message : error);
  process.exit(1);
} finally {
  fs.rmSync(tempModulePath, { force: true });
}
