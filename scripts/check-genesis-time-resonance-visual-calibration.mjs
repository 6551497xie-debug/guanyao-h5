import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import process from "node:process";
import { build } from "esbuild";

const rootDir = process.cwd();
const files = Object.freeze({
  type: "src/types/genesisTimeResonanceVisualState.ts",
  service: "src/services/genesisTimeResonanceVisualMapping.ts",
  starType: "src/types/genesisStarRiverVisualState.ts",
  protocol: "docs/GUANYAO_GENESIS_TIME_RESONANCE_VISUAL_CALIBRATION_PROTOCOL.md",
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
    "GenesisTimeResonanceVisualState",
    "temporalEntryState",
    "moonPhaseTransitionExpression",
    "starFieldResponse",
    "temporalRhythm",
    "alignmentState",
    "noBirthMansionResult: true",
    "noFourSymbolResult: true",
    "noHexagram: true",
    "noMotherCode: true",
    "noPersonalStarBeast: true",
  ].forEach((marker) => assertIncludes("P3 Time state type", source.type, marker));
  [
    "export function mapGenesisTimeResonanceVisualState",
    "LIFE_TIME_DELIVERED_TO_STARS",
    "MOONLIGHT_GATHERS_TO_TIME",
    "STELLAR_RHYTHM_RESPONDS",
    "SLOW_TIME_RESONANCE",
    "TEMPORAL_MOMENT_STABILIZED",
    "STAR_RIVER_REFERENCE_INVALID",
    "timeLayerOnly",
    "symbolLayerUntouched",
    "beastLayerUntouched",
  ].forEach((marker) => assertIncludes("P3 Time mapping service", source.service, marker));
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
    "motherCode",
    "personalStarBeast",
  ].forEach((marker) => assertExcludes("P3 Time mapping remains semantic-only", source.service, marker));
  [
    "RC-GUANYAO-GENESIS-TIME-RESONANCE-VISUAL-CALIBRATION-P3",
    "时｜生命时序共振",
    "我把我的时间交给这片星河",
    "圆月向时序月象变化",
    "月牙归位",
    "星河回应",
    "不提前点亮本命星",
    "不提前出现四象",
    "不提前出现星兽",
    "不修改月层",
    "不修改星层",
  ].forEach((marker) => assertIncludes("P3 Time protocol", source.protocol, marker));
  [
    "GenesisTimeResonanceVisualState",
    "GenesisTimeResonanceVisualMappingResult",
    "GenesisTimeResonanceVisualMappingBoundary",
    "from \"./genesisTimeResonanceVisualState\"",
  ].forEach((marker) => assertIncludes("P3 type index export", source.typeIndex, marker));
  assertIncludes("P3 gate registered", packageJson.scripts?.["check-genesis-time-resonance-visual-calibration"] ?? "", "node scripts/check-genesis-time-resonance-visual-calibration.mjs");
  assertIncludes("P3 release gate registered", packageJson.scripts?.["postcheck:release"] ?? "", "npm run check-genesis-time-resonance-visual-calibration");

  const modulePath = path.join(os.tmpdir(), `guanyao-genesis-time-resonance-visual-${process.pid}.mjs`);
  await build({
    stdin: {
      contents: `export { mapGenesisTimeResonanceVisualState } from "./src/services/genesisTimeResonanceVisualMapping.ts";`,
      resolveDir: rootDir,
      sourcefile: "genesis-time-resonance-visual-gate-entry.ts",
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
  const starRiver = Object.freeze({
    starFieldPresence: "STELLAR_FIELD_PRESENT",
    stellarOrderExpression: "ORDERED_STELLAR_RELATIONS",
    mansionGroupExpression: "SEVEN_POINT_GROUP_TENDENCY",
    celestialMotionRhythm: "SLOW_CELESTIAL_DRIFT",
    spatialDepthExpression: "DEEP_LAYERED_COSMOS",
    observationState: "QUIET_OBSERVATION",
    moonOriginReference: Object.freeze({}),
    visualOnly: true,
    identityBlind: true,
    noIdentity: true,
    noBirthTime: true,
    noMansionResult: true,
    noFourSymbolResult: true,
    noMotherCode: true,
    noPersonalStarBeast: true,
    noEngineInvocation: true,
    noSceneModelInvocation: true,
    noRenderPlanInvocation: true,
    noRendererInvocation: true,
  });
  const ready = runtime.mapGenesisTimeResonanceVisualState(Object.freeze({ starRiverVisualState: starRiver }));
  assertEqual("Time Resonance mapping is ready", ready.status, "READY");
  if (ready.status === "READY") {
    assertEqual("Time entry state", ready.state.temporalEntryState, "LIFE_TIME_DELIVERED_TO_STARS");
    assertEqual("Moon transition", ready.state.moonPhaseTransitionExpression, "MOONLIGHT_GATHERS_TO_TIME");
    assertEqual("Star response", ready.state.starFieldResponse, "STELLAR_RHYTHM_RESPONDS");
    assertEqual("Time rhythm is slow", ready.state.temporalRhythm, "SLOW_TIME_RESONANCE");
    assertEqual("Star is consumed upstream", ready.boundary.starLayerConsumedAsUpstream, true);
    assertEqual("Symbol remains untouched", ready.boundary.symbolLayerUntouched, true);
    assertEqual("Beast remains untouched", ready.boundary.beastLayerUntouched, true);
    assertEqual("Time state has no Hexagram", ready.state.noHexagram, true);
  }
  const missing = runtime.mapGenesisTimeResonanceVisualState(Object.freeze({ starRiverVisualState: null }));
  assertEqual("missing Star River unavailable", missing.status, "UNAVAILABLE");
  const invalidStar = runtime.mapGenesisTimeResonanceVisualState(Object.freeze({ starRiverVisualState: Object.freeze({ ...starRiver, noPersonalStarBeast: false }) }));
  assertEqual("invalid Star River reference blocked", invalidStar.status, "BLOCKED");
  assertEqual("invalid Star River reason", invalidStar.reason, "STAR_RIVER_REFERENCE_INVALID");
}

if (failures.length > 0) {
  console.error("\nGenesis Time Resonance visual calibration gate failed:");
  failures.forEach((failure) => console.error(`- ${failure}`));
  process.exit(1);
}
console.log("\nGenesis Time Resonance visual calibration gate passed.");
