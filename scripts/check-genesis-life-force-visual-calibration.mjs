import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import process from "node:process";
import { build } from "esbuild";

const rootDir = process.cwd();
const files = Object.freeze({
  type: "src/types/genesisLifeForceVisualState.ts",
  service: "src/services/genesisLifeForceVisualMapping.ts",
  hexagramType: "src/types/genesisHexagramVisualState.ts",
  protocol: "docs/GUANYAO_GENESIS_LIFE_FORCE_VISUAL_CALIBRATION_PROTOCOL.md",
  typeIndex: "src/types/index.ts",
  packageManifest: "package.json",
});
const failures = [];
const assertIncludes = (name, source, marker) => {
  if (!source.includes(marker)) failures.push(`${name} missing=${marker}`);
  else console.log(`PASS | ${name} | includes=${marker}`);
};
const assertExcludes = (name, source, marker) => {
  if (source.includes(marker)) failures.push(`${name} forbidden=${marker}`);
  else console.log(`PASS | ${name} | forbidden=absent`);
};
const assertEqual = (name, actual, expected) => {
  if (actual !== expected) failures.push(`${name} expected=${String(expected)} actual=${String(actual)}`);
  else console.log(`PASS | ${name} | expected=${String(expected)}`);
};
const absolute = Object.fromEntries(Object.entries(files).map(([name, relative]) => [name, path.join(rootDir, relative)]));

for (const [name, filePath] of Object.entries(absolute)) {
  if (!fs.existsSync(filePath)) failures.push(`${name} missing=${filePath}`);
  else console.log(`PASS | ${name} file exists`);
}

if (failures.length === 0) {
  const source = Object.fromEntries(Object.entries(absolute).map(([name, filePath]) => [name, fs.readFileSync(filePath, "utf8")]));
  const packageJson = JSON.parse(source.packageManifest);
  [
    "GenesisLifeForceVisualState",
    "forcePresence",
    "rhythmExpression",
    "movementExpression",
    "coreActivation",
    "forceInfluence",
    "forceExpressionModes",
    "noMotherCode: true",
    "noLifeArchetype: true",
    "noEightArchetypeNames: true",
    "noPersonalStarBeast: true",
  ].forEach((marker) => assertIncludes("P6 Life Force state type", source.type, marker));
  [
    "export function mapGenesisLifeForceVisualState",
    "LIFE_FORCE_AWAKENING",
    "LIFE_RHYTHM_RECONFIGURING",
    "DYNAMIC_TENDENCY_EMERGING",
    "STAR_CORE_BREATH_REAWAKENING",
    "STRUCTURE_RESPONDS_TO_FORCE",
    "BREATH_RATE_SHIFT",
    "AGGREGATION_RHYTHM_SHIFT",
    "LIGHT_FLOW_RHYTHM_SHIFT",
    "STRUCTURE_RESPONSE_SHIFT",
    "HEXAGRAM_VISUAL_REFERENCE_INVALID",
    "forceLayerOnly",
    "motherCodeUntouched",
    "beastLayerUntouched",
  ].forEach((marker) => assertIncludes("P6 Life Force mapping service", source.service, marker));
  [
    "runMotherCodeLandingEngine",
    "resolveLifeArchetypeProfileFromMotherCode",
    "runLifeArchetypeEngine",
    "motherCodeId",
    "lifeArchetypeId",
    "QIAN",
    "KUN",
    "ZHEN",
    "XUN",
    "KAN",
    "\"LI\"",
    "GEN",
    "DUI",
    "resolveStarbeastFromBirthDate",
    "createRenderer",
    "buildSceneModel",
    "createRenderPlan",
    "localStorage",
    "sessionStorage",
    "fetch(",
    "document.",
    "fourSymbolResult",
    "personalStarBeast",
    "animalIdentity",
  ].forEach((marker) => assertExcludes("P6 Life Force mapping remains semantic-only", source.service, marker));
  [
    "RC-GUANYAO-GENESIS-LIFE-FORCE-VISUAL-CALIBRATION-P6",
    "力｜生命原力",
    "力不是添加。力是生命原本携带的动力方式开始苏醒",
    "生命开始以自己的方式运行",
    "呼吸频率变化",
    "聚合节奏变化",
    "光流节奏变化",
    "结构响应变化",
    "流动方向变化",
    "展开/收束变化",
    "稳定/突破变化",
    "内聚/外放变化",
    "星核呼吸变化",
    "内部光流变化",
    "结构稳定变化",
    "星骨张力变化",
    "形态场变化",
    "空间关系变化",
    "不提前生成星兽",
    "不改变卦层",
    "不修改月层",
    "不修改星层",
    "不修改时层",
    "不修改象层",
    "不修改卦层",
    "卦 → 变化规律 → 力 → 动力方式",
    "卦回答：如何变化。力回答：以什么方式变化。",
    "象 + 卦 + 力",
  ].forEach((marker) => assertIncludes("P6 Life Force protocol", source.protocol, marker));
  [
    "GenesisLifeForceVisualState",
    "GenesisLifeForceVisualMappingResult",
    "GenesisLifeForceVisualMappingBoundary",
    "from \"./genesisLifeForceVisualState\"",
  ].forEach((marker) => assertIncludes("P6 type index export", source.typeIndex, marker));
  assertIncludes("P6 gate registered", packageJson.scripts?.["check-genesis-life-force-visual-calibration"] ?? "", "node scripts/check-genesis-life-force-visual-calibration.mjs");
  assertIncludes("P6 release gate registered", packageJson.scripts?.["postcheck:release"] ?? "", "npm run check-genesis-life-force-visual-calibration");

  const modulePath = path.join(os.tmpdir(), `guanyao-genesis-life-force-visual-${process.pid}.mjs`);
  await build({
    stdin: {
      contents: `export { mapGenesisLifeForceVisualState } from "./src/services/genesisLifeForceVisualMapping.ts";`,
      resolveDir: rootDir,
      sourcefile: "genesis-life-force-visual-gate-entry.ts",
      loader: "ts",
    },
    outfile: modulePath,
    bundle: true,
    platform: "node",
    format: "esm",
    target: "node20",
    logLevel: "silent",
  });
  const runtime = await import(`file://${modulePath}?t=${Date.now()}`);
  const hexagram = Object.freeze({
    changePatternPresence: "CHANGE_PATTERN_EMERGING",
    yinYangRhythmExpression: "CONTRACTION_EXPANSION_ALTERNATION",
    yaoStructureExpression: "SIX_LAYER_TRANSFORMATION_STRUCTURE",
    transformationTrace: "CONTINUOUS_STATE_TRANSITION_TRACE",
    imprintState: "LIFE_CHANGE_IMPRINT_FORMING",
    changeRhythmModes: ["CONTRACTION", "EXPANSION", "BRIGHTENING", "DIMMING", "CONTINUITY", "BREAK"],
    symbolVisualReference: Object.freeze({}),
    visualOnly: true,
    identityBlind: true,
    noIdentity: true,
    noFourSymbolResult: true,
    noHexagramCalculationResult: true,
    noMotherCode: true,
    noLifeArchetype: true,
    noPersonalStarBeast: true,
    noEngineInvocation: true,
    noHexagramCalculationInvocation: true,
    noSceneModelInvocation: true,
    noRenderPlanInvocation: true,
    noRendererInvocation: true,
  });
  const ready = runtime.mapGenesisLifeForceVisualState(Object.freeze({ hexagramVisualState: hexagram }));
  assertEqual("Life Force mapping is ready", ready.status, "READY");
  if (ready.status === "READY") {
    assertEqual("Force presence", ready.state.forcePresence, "LIFE_FORCE_AWAKENING");
    assertEqual("Force rhythm", ready.state.rhythmExpression, "LIFE_RHYTHM_RECONFIGURING");
    assertEqual("Force movement", ready.state.movementExpression, "DYNAMIC_TENDENCY_EMERGING");
    assertEqual("Core activation", ready.state.coreActivation, "STAR_CORE_BREATH_REAWAKENING");
    assertEqual("Force influence", ready.state.forceInfluence, "STRUCTURE_RESPONDS_TO_FORCE");
    assertEqual("Four force expression modes", ready.state.forceExpressionModes.length, 4);
    assertEqual("Hexagram is consumed upstream", ready.boundary.hexagramLayerConsumedAsUpstream, true);
    assertEqual("MotherCode remains untouched", ready.boundary.motherCodeUntouched, true);
    assertEqual("Beast remains untouched", ready.boundary.beastLayerUntouched, true);
    assertEqual("No Personal Star Beast", ready.state.noPersonalStarBeast, true);
  }
  const missing = runtime.mapGenesisLifeForceVisualState(Object.freeze({ hexagramVisualState: null }));
  assertEqual("missing Hexagram Visual unavailable", missing.status, "UNAVAILABLE");
  const invalidHexagram = runtime.mapGenesisLifeForceVisualState(Object.freeze({ ...{ hexagramVisualState: hexagram }, hexagramVisualState: Object.freeze({ ...hexagram, noMotherCode: false }) }));
  assertEqual("invalid Hexagram reference blocked", invalidHexagram.status, "BLOCKED");
  assertEqual("invalid Hexagram reason", invalidHexagram.reason, "HEXAGRAM_VISUAL_REFERENCE_INVALID");
}

if (failures.length > 0) {
  console.error("\nGenesis Life Force visual calibration gate failed:");
  failures.forEach((failure) => console.error(`- ${failure}`));
  process.exit(1);
}
console.log("\nGenesis Life Force visual calibration gate passed.");
