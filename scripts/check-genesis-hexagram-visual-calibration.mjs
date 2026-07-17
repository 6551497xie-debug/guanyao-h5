import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import process from "node:process";
import { build } from "esbuild";

const rootDir = process.cwd();
const files = Object.freeze({
  type: "src/types/genesisHexagramVisualState.ts",
  service: "src/services/genesisHexagramVisualMapping.ts",
  symbolType: "src/types/genesisSymbolVisualState.ts",
  protocol: "docs/GUANYAO_GENESIS_HEXAGRAM_VISUAL_CALIBRATION_PROTOCOL.md",
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
    "GenesisHexagramVisualState",
    "changePatternPresence",
    "yinYangRhythmExpression",
    "yaoStructureExpression",
    "transformationTrace",
    "imprintState",
    "changeRhythmModes",
    "noFourSymbolResult: true",
    "noHexagramCalculationResult: true",
    "noMotherCode: true",
    "noLifeArchetype: true",
    "noPersonalStarBeast: true",
  ].forEach((marker) => assertIncludes("P5 Hexagram state type", source.type, marker));
  [
    "export function mapGenesisHexagramVisualState",
    "CHANGE_PATTERN_EMERGING",
    "CONTRACTION_EXPANSION_ALTERNATION",
    "SIX_LAYER_TRANSFORMATION_STRUCTURE",
    "CONTINUOUS_STATE_TRANSITION_TRACE",
    "LIFE_CHANGE_IMPRINT_FORMING",
    "CONTRACTION",
    "EXPANSION",
    "BRIGHTENING",
    "DIMMING",
    "CONTINUITY",
    "BREAK",
    "SYMBOL_VISUAL_REFERENCE_INVALID",
    "hexagramLayerOnly",
    "hexagramCalculationUntouched",
    "forceLayerUntouched",
  ].forEach((marker) => assertIncludes("P5 Hexagram mapping service", source.service, marker));
  [
    "runMotherCodeLandingEngine",
    "resolveStarbeastFromBirthDate",
    "createRenderer",
    "buildSceneModel",
    "createRenderPlan",
    "localStorage",
    "sessionStorage",
    "fetch(",
    "document.",
    "runHexagramCalculation",
    "resolveCurrentHexagram",
    "fourSymbolResult",
    "personalStarBeast",
    "卦卡",
    "命理",
  ].forEach((marker) => assertExcludes("P5 Hexagram mapping remains semantic-only", source.service, marker));
  [
    "RC-GUANYAO-GENESIS-HEXAGRAM-VISUAL-CALIBRATION-P5",
    "卦｜变化印记",
    "变化有规律",
    "收缩与展开",
    "明暗变化",
    "连续与断裂",
    "聚合与分离",
    "六层光纹",
    "六段结构变化",
    "六个变化节点",
    "不预测未来",
    "不预测未来",
    "不提前表达 MotherCode",
    "不生成星兽",
    "不修改月层",
    "不修改星层",
    "不修改时层",
    "不修改象层",
  ].forEach((marker) => assertIncludes("P5 Hexagram protocol", source.protocol, marker));
  [
    "GenesisHexagramVisualState",
    "GenesisHexagramVisualMappingResult",
    "GenesisHexagramVisualMappingBoundary",
    "from \"./genesisHexagramVisualState\"",
  ].forEach((marker) => assertIncludes("P5 type index export", source.typeIndex, marker));
  assertIncludes("P5 gate registered", packageJson.scripts?.["check-genesis-hexagram-visual-calibration"] ?? "", "node scripts/check-genesis-hexagram-visual-calibration.mjs");
  assertIncludes("P5 release gate registered", packageJson.scripts?.["postcheck:release"] ?? "", "npm run check-genesis-hexagram-visual-calibration");

  const modulePath = path.join(os.tmpdir(), `guanyao-genesis-hexagram-visual-${process.pid}.mjs`);
  await build({
    stdin: {
      contents: `export { mapGenesisHexagramVisualState } from "./src/services/genesisHexagramVisualMapping.ts";`,
      resolveDir: rootDir,
      sourcefile: "genesis-hexagram-visual-gate-entry.ts",
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
  const symbol = Object.freeze({
    symbolFieldPresence: "SYMBOL_FIELD_EMERGING",
    sevenMansionAggregation: "SEVEN_MANSION_RELATIONS_GATHERING",
    spatialMorphology: "FOUR_DIRECTIONAL_MOTION_FIELD",
    celestialSkeleton: "STAR_BONE_STRUCTURE_FORMING",
    symbolicRhythm: "SLOW_SYMBOLIC_DRIFT",
    alignmentState: "SYMBOL_FIELD_STABILIZED",
    symbolicMotionModes: [
      "SPROUTING_EXTENSION_CONNECTION",
      "CONVERGENT_BOUNDARY_CONDENSATION",
      "ASCENDING_EXPRESSION_REVEAL",
      "WRAPPED_CARRYING_SINKING",
    ],
    timeResonanceReference: Object.freeze({}),
    visualOnly: true,
    identityBlind: true,
    noIdentity: true,
    noBirthMansionResult: true,
    noFourSymbolResult: true,
    noHexagram: true,
    noMotherCode: true,
    noPersonalStarBeast: true,
    noEngineInvocation: true,
    noSceneModelInvocation: true,
    noRenderPlanInvocation: true,
    noRendererInvocation: true,
  });
  const ready = runtime.mapGenesisHexagramVisualState(Object.freeze({ symbolVisualState: symbol }));
  assertEqual("Hexagram mapping is ready", ready.status, "READY");
  if (ready.status === "READY") {
    assertEqual("Change pattern presence", ready.state.changePatternPresence, "CHANGE_PATTERN_EMERGING");
    assertEqual("Yin yang rhythm", ready.state.yinYangRhythmExpression, "CONTRACTION_EXPANSION_ALTERNATION");
    assertEqual("Six layer structure", ready.state.yaoStructureExpression, "SIX_LAYER_TRANSFORMATION_STRUCTURE");
    assertEqual("Imprint is forming", ready.state.imprintState, "LIFE_CHANGE_IMPRINT_FORMING");
    assertEqual("Six change rhythm modes", ready.state.changeRhythmModes.length, 6);
    assertEqual("Symbol is consumed upstream", ready.boundary.symbolLayerConsumedAsUpstream, true);
    assertEqual("Calculation remains untouched", ready.boundary.hexagramCalculationUntouched, true);
    assertEqual("Force remains untouched", ready.boundary.forceLayerUntouched, true);
    assertEqual("No calculation result", ready.state.noHexagramCalculationResult, true);
  }
  const missing = runtime.mapGenesisHexagramVisualState(Object.freeze({ symbolVisualState: null }));
  assertEqual("missing Symbol Visual unavailable", missing.status, "UNAVAILABLE");
  const invalidSymbol = runtime.mapGenesisHexagramVisualState(Object.freeze({ symbolVisualState: Object.freeze({ ...symbol, noFourSymbolResult: false }) }));
  assertEqual("invalid Symbol reference blocked", invalidSymbol.status, "BLOCKED");
  assertEqual("invalid Symbol reason", invalidSymbol.reason, "SYMBOL_VISUAL_REFERENCE_INVALID");
}

if (failures.length > 0) {
  console.error("\nGenesis Hexagram visual calibration gate failed:");
  failures.forEach((failure) => console.error(`- ${failure}`));
  process.exit(1);
}
console.log("\nGenesis Hexagram visual calibration gate passed.");
