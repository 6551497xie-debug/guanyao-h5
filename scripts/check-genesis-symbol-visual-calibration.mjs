import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import process from "node:process";
import { build } from "esbuild";

const rootDir = process.cwd();
const files = Object.freeze({
  type: "src/types/genesisSymbolVisualState.ts",
  service: "src/services/genesisSymbolVisualMapping.ts",
  timeType: "src/types/genesisTimeResonanceVisualState.ts",
  protocol: "docs/GUANYAO_GENESIS_SYMBOL_VISUAL_CALIBRATION_PROTOCOL.md",
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
    "GenesisSymbolVisualState",
    "symbolFieldPresence",
    "sevenMansionAggregation",
    "spatialMorphology",
    "celestialSkeleton",
    "symbolicRhythm",
    "alignmentState",
    "noBirthMansionResult: true",
    "noFourSymbolResult: true",
    "noHexagram: true",
    "noMotherCode: true",
    "noPersonalStarBeast: true",
    "symbolicMotionModes",
  ].forEach((marker) => assertIncludes("P4 Symbol state type", source.type, marker));
  [
    "export function mapGenesisSymbolVisualState",
    "SYMBOL_FIELD_EMERGING",
    "SEVEN_MANSION_RELATIONS_GATHERING",
    "FOUR_DIRECTIONAL_MOTION_FIELD",
    "STAR_BONE_STRUCTURE_FORMING",
    "SLOW_SYMBOLIC_DRIFT",
    "SYMBOL_FIELD_STABILIZED",
    "SPROUTING_EXTENSION_CONNECTION",
    "CONVERGENT_BOUNDARY_CONDENSATION",
    "ASCENDING_EXPRESSION_REVEAL",
    "WRAPPED_CARRYING_SINKING",
    "TIME_RESONANCE_REFERENCE_INVALID",
    "symbolLayerOnly",
    "fourSymbolCalculationUntouched",
    "beastLayerUntouched",
  ].forEach((marker) => assertIncludes("P4 Symbol mapping service", source.service, marker));
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
    "fourSymbolResult",
    "personalStarBeast",
    "青龙",
    "白虎",
    "朱雀",
    "玄武",
  ].forEach((marker) => assertExcludes("P4 Symbol mapping remains semantic-only", source.service, marker));
  [
    "RC-GUANYAO-GENESIS-SYMBOL-VISUAL-CALIBRATION-P4",
    "象｜四象显影",
    "星辰正在形成一种生命秩序",
    "生发、延展、连接",
    "收束、凝聚、边界",
    "升腾、表达、显化",
    "承载、包裹、沉潜",
    "时间进入",
    "星河响应",
    "七宿聚合",
    "象形成",
    "不提前生成卦",
    "不提前生成 MotherCode",
    "不提前生成 Personal Star Beast",
    "不提前生成动物身份",
    "不修改月层",
    "不修改星层",
    "不修改时层",
  ].forEach((marker) => assertIncludes("P4 Symbol protocol", source.protocol, marker));
  [
    "GenesisSymbolVisualState",
    "GenesisSymbolVisualMappingResult",
    "GenesisSymbolVisualMappingBoundary",
    "from \"./genesisSymbolVisualState\"",
  ].forEach((marker) => assertIncludes("P4 type index export", source.typeIndex, marker));
  assertIncludes("P4 gate registered", packageJson.scripts?.["check-genesis-symbol-visual-calibration"] ?? "", "node scripts/check-genesis-symbol-visual-calibration.mjs");
  assertIncludes("P4 release gate registered", packageJson.scripts?.["postcheck:release"] ?? "", "npm run check-genesis-symbol-visual-calibration");

  const modulePath = path.join(os.tmpdir(), `guanyao-genesis-symbol-visual-${process.pid}.mjs`);
  await build({
    stdin: {
      contents: `export { mapGenesisSymbolVisualState } from "./src/services/genesisSymbolVisualMapping.ts";`,
      resolveDir: rootDir,
      sourcefile: "genesis-symbol-visual-gate-entry.ts",
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
  const timeResonance = Object.freeze({
    temporalEntryState: "LIFE_TIME_DELIVERED_TO_STARS",
    moonPhaseTransitionExpression: "MOONLIGHT_GATHERS_TO_TIME",
    starFieldResponse: "STELLAR_RHYTHM_RESPONDS",
    temporalRhythm: "SLOW_TIME_RESONANCE",
    alignmentState: "TEMPORAL_MOMENT_STABILIZED",
    starRiverReference: Object.freeze({}),
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
  const ready = runtime.mapGenesisSymbolVisualState(Object.freeze({ timeResonanceVisualState: timeResonance }));
  assertEqual("Symbol mapping is ready", ready.status, "READY");
  if (ready.status === "READY") {
    assertEqual("Symbol field presence", ready.state.symbolFieldPresence, "SYMBOL_FIELD_EMERGING");
    assertEqual("Seven mansion aggregation", ready.state.sevenMansionAggregation, "SEVEN_MANSION_RELATIONS_GATHERING");
    assertEqual("Spatial morphology", ready.state.spatialMorphology, "FOUR_DIRECTIONAL_MOTION_FIELD");
    assertEqual("Symbolic rhythm is slow", ready.state.symbolicRhythm, "SLOW_SYMBOLIC_DRIFT");
    assertEqual("Four motion modes", ready.state.symbolicMotionModes.length, 4);
    assertEqual("Time is consumed upstream", ready.boundary.timeLayerConsumedAsUpstream, true);
    assertEqual("Four symbol calculation remains untouched", ready.boundary.fourSymbolCalculationUntouched, true);
    assertEqual("Beast remains untouched", ready.boundary.beastLayerUntouched, true);
    assertEqual("Symbol state has no Personal Star Beast", ready.state.noPersonalStarBeast, true);
  }
  const missing = runtime.mapGenesisSymbolVisualState(Object.freeze({ timeResonanceVisualState: null }));
  assertEqual("missing Time Resonance unavailable", missing.status, "UNAVAILABLE");
  const invalidTime = runtime.mapGenesisSymbolVisualState(Object.freeze({ timeResonanceVisualState: Object.freeze({ ...timeResonance, noFourSymbolResult: false }) }));
  assertEqual("invalid Time Resonance reference blocked", invalidTime.status, "BLOCKED");
  assertEqual("invalid Time Resonance reason", invalidTime.reason, "TIME_RESONANCE_REFERENCE_INVALID");
}

if (failures.length > 0) {
  console.error("\nGenesis Symbol visual calibration gate failed:");
  failures.forEach((failure) => console.error(`- ${failure}`));
  process.exit(1);
}
console.log("\nGenesis Symbol visual calibration gate passed.");
