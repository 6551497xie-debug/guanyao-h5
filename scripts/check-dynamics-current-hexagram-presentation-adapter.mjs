import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import process from "node:process";
import { build } from "esbuild";

const rootDir = process.cwd();
const adapterPath = path.join(rootDir, "src/services/guanyaoDynamicsCurrentHexagramPresentationAdapter.ts");
const formationAdapterPath = path.join(rootDir, "src/services/guanyaoCurrentHexagramFormationAdapter.ts");
const gravityPath = path.join(rootDir, "src/pages/GravityPage.tsx");
const adapterSource = fs.readFileSync(adapterPath, "utf8");
const gravitySource = fs.readFileSync(gravityPath, "utf8");
const tempModulePath = path.join(os.tmpdir(), `guanyao-current-hexagram-presentation-${process.pid}.mjs`);

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

const readyInput = {
  status: "READY",
  readiness: "READY_FOR_CURRENT_HEXAGRAM",
  hasPressureContext: true,
  selectedPressureSeedContext: {
    selectedPressureSeedId: "presentation-seed",
    pressureField: "POWER",
    pressureNature: "EVALUATION",
    surface: "上级要求立刻给出结论",
    shell: "担心判断失误",
    scenarioDomain: "BOSS",
    pressureIntensity: 80,
    primaryRelation: "BOSS",
  },
  motherCodeProfile: {
    motherCodeId: "mother-dui",
    motherCodeName: "兑｜连接者",
    lowerTrigram: "兑",
    baseForce: "连接",
    defaultReactionPattern: "先回应关系",
    pressureSensitiveZones: ["评价"],
    defenseTendency: "维持连接",
    behaviorBias: "为了维持连接而快速回应",
  },
  motherTrigram: "兑",
};

const motherPresentation = {
  motherCodeName: "兑｜连接者",
  personaSnapshot: {
    motherCode: "兑｜连接者",
    trigram: "乾",
    fourSymbol: "白虎",
  },
};

const trigramSymbols = [
  ["乾", "☰"],
  ["坤", "☷"],
  ["震", "☳"],
  ["巽", "☴"],
  ["坎", "☵"],
  ["离", "☲"],
  ["艮", "☶"],
  ["兑", "☱"],
];

try {
  await build({
    stdin: {
      contents: [
        `export { resolveDynamicsCurrentHexagramPresentation } from ${JSON.stringify(adapterPath)};`,
        `export { resolveCurrentHexagramFormation } from ${JSON.stringify(formationAdapterPath)};`,
      ].join("\n"),
      resolveDir: rootDir,
      sourcefile: "current-hexagram-presentation-gate.ts",
      loader: "ts",
    },
    outfile: tempModulePath,
    bundle: true,
    platform: "node",
    format: "esm",
    target: "node20",
    logLevel: "silent",
  });

  const {
    resolveCurrentHexagramFormation,
    resolveDynamicsCurrentHexagramPresentation,
  } = await import(`file://${tempModulePath}?t=${Date.now()}`);

  const formation = resolveCurrentHexagramFormation(readyInput);
  const presentation = resolveDynamicsCurrentHexagramPresentation({
    formation,
    motherPresentation,
  });
  assertEqual("presentation resolves from formation", Boolean(presentation), true);
  assertEqual("presentation semantic role is current orientation", presentation?.semanticRole, "CURRENT_HEXAGRAM_ORIENTATION");
  assertEqual("presentation title follows current hexagram name", presentation?.title, "天泽履");
  assertEqual("presentation mark follows formation trigrams", presentation?.trigramMark, "☱☰");
  assertEqual("presentation lower trigram stays formation lower", presentation?.lowerTrigram, "兑");
  assertEqual("presentation upper trigram stays formation upper", presentation?.upperTrigram, "乾");
  assertEqual("presentation starbeast enters formation lower", presentation?.starbeastIngress, "白虎入兑");
  assertEqual("presentation is current round orientation", presentation?.guardrails.isCurrentRoundOrientation, true);
  assertEqual("presentation is not final crystal", presentation?.guardrails.isFinalCrystal, false);
  assertEqual("presentation is not personality label", presentation?.guardrails.isPersonalityLabel, false);

  const noStarbeast = resolveDynamicsCurrentHexagramPresentation({
    formation,
    motherPresentation: { motherCodeName: "兑｜连接者", personaSnapshot: null },
  });
  assertEqual("missing starbeast keeps empty ingress", noStarbeast?.starbeastIngress, "");

  assertEqual(
    "missing formation yields no presentation",
    resolveDynamicsCurrentHexagramPresentation({ formation: null, motherPresentation }),
    null,
  );

  const titleFallback = resolveDynamicsCurrentHexagramPresentation({
    formation: {
      ...formation,
      currentHexagramProfile: {
        ...formation.currentHexagramProfile,
        hexagramName: "",
        hexagramTitle: "冰上",
      },
    },
    motherPresentation,
  });
  assertEqual("empty name falls back to hexagram title", titleFallback?.title, "冰上");

  const codeFallback = resolveDynamicsCurrentHexagramPresentation({
    formation: {
      ...formation,
      currentHexagramProfile: {
        ...formation.currentHexagramProfile,
        hexagramName: "",
        hexagramTitle: "",
      },
    },
    motherPresentation,
  });
  assertEqual("empty name and title fall back to code", codeFallback?.title, formation.currentHexagramProfile.hexagramCode);

  trigramSymbols.forEach(([trigram, symbol]) => {
    const mapped = resolveDynamicsCurrentHexagramPresentation({
      formation: {
        ...formation,
        currentHexagramProfile: {
          ...formation.currentHexagramProfile,
          lowerTrigram: trigram,
          upperTrigram: trigram,
        },
      },
      motherPresentation,
    });
    assertEqual(`${trigram} symbol mapping`, mapped?.trigramMark, `${symbol}${symbol}`);
  });

  assertIncludes(
    "presentation adapter owns independent input",
    adapterSource,
    "export type DynamicsCurrentHexagramPresentationAdapterInput",
  );
  assertIncludes(
    "presentation adapter owns independent output",
    adapterSource,
    "export type DynamicsCurrentHexagramPresentation",
  );
  assertIncludes(
    "presentation adapter locks current orientation role",
    adapterSource,
    'semanticRole: "CURRENT_HEXAGRAM_ORIENTATION"',
  );
  assertIncludes("presentation adapter blocks final crystal semantics", adapterSource, "isFinalCrystal: false");
  assertIncludes("presentation adapter blocks personality label semantics", adapterSource, "isPersonalityLabel: false");
  assertIncludes(
    "Gravity delegates current hexagram presentation",
    gravitySource,
    "resolveDynamicsCurrentHexagramPresentation({",
  );
  assertIncludes(
    "Gravity renders adapter title",
    gravitySource,
    "currentHexagramPresentation.title",
  );
  assertIncludes(
    "Gravity renders adapter starbeast ingress",
    gravitySource,
    "currentHexagramPresentation.starbeastIngress",
  );
  assertIncludes("Gravity keeps current orientation label", gravitySource, "本局卦象定位");
  assertExcludes("Gravity no longer owns trigram symbol mapping", gravitySource, "function trigramSymbolLabel");
  assertExcludes("Gravity no longer assembles orientation title", gravitySource, "currentHexagramOrientationTitle");
  assertExcludes("Gravity no longer assembles orientation mark", gravitySource, "currentHexagramOrientationMark");
  assertExcludes("Gravity no longer assembles starbeast ingress", gravitySource, "currentHexagramOrientationBeast");
  assertExcludes("Gravity no longer extracts current hexagram profile", gravitySource, "const currentHexagramProfile =");

  console.log("\n[DYNAMICS CURRENT HEXAGRAM PRESENTATION ADAPTER] PASS");
} catch (error) {
  console.error("[DYNAMICS CURRENT HEXAGRAM PRESENTATION ADAPTER] FAIL");
  console.error(error instanceof Error ? error.message : error);
  process.exit(1);
} finally {
  fs.rmSync(tempModulePath, { force: true });
}
