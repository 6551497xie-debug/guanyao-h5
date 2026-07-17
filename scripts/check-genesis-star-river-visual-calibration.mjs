import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import process from "node:process";
import { build } from "esbuild";

const rootDir = process.cwd();
const files = Object.freeze({
  type: "src/types/genesisStarRiverVisualState.ts",
  service: "src/services/genesisStarRiverVisualMapping.ts",
  moonType: "src/types/genesisMoonOriginVisualState.ts",
  protocol: "docs/GUANYAO_GENESIS_STAR_RIVER_VISUAL_CALIBRATION_PROTOCOL.md",
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
    "GenesisStarRiverVisualState",
    "starFieldPresence",
    "stellarOrderExpression",
    "mansionGroupExpression",
    "celestialMotionRhythm",
    "spatialDepthExpression",
    "observationState",
    "noBirthTime: true",
    "noMansionResult: true",
    "noFourSymbolResult: true",
    "noMotherCode: true",
    "noPersonalStarBeast: true",
  ].forEach((marker) => assertIncludes("P2 Star River state type", source.type, marker));
  [
    "export function mapGenesisStarRiverVisualState",
    "STELLAR_FIELD_PRESENT",
    "ORDERED_STELLAR_RELATIONS",
    "SEVEN_POINT_GROUP_TENDENCY",
    "SLOW_CELESTIAL_DRIFT",
    "DEEP_LAYERED_COSMOS",
    "QUIET_OBSERVATION",
    "MOON_ORIGIN_REFERENCE_INVALID",
    "starLayerOnly",
    "beastLayerUntouched",
  ].forEach((marker) => assertIncludes("P2 Star River mapping service", source.service, marker));
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
    "motherCodeProfile",
    "personalStarBeast",
  ].forEach((marker) => assertExcludes("P2 Star River mapping remains semantic-only", source.service, marker));
  [
    "RC-GUANYAO-GENESIS-STAR-RIVER-VISUAL-CALIBRATION-P2",
    "星｜星河秩序",
    "星河有序",
    "七宿结构",
    "月华",
    "照见",
    "不提前进入时、象、卦、力、兽",
    "禁止快速飞行",
    "禁止粒子爆发",
    "不修改月层语义",
  ].forEach((marker) => assertIncludes("P2 Star River protocol", source.protocol, marker));
  [
    "GenesisStarRiverVisualState",
    "GenesisStarRiverVisualMappingResult",
    "GenesisStarRiverVisualMappingBoundary",
    "from \"./genesisStarRiverVisualState\"",
  ].forEach((marker) => assertIncludes("P2 type index export", source.typeIndex, marker));
  assertIncludes("P2 gate registered", packageJson.scripts?.["check-genesis-star-river-visual-calibration"] ?? "", "node scripts/check-genesis-star-river-visual-calibration.mjs");
  assertIncludes("P2 release gate registered", packageJson.scripts?.["postcheck:release"] ?? "", "npm run check-genesis-star-river-visual-calibration");

  const modulePath = path.join(os.tmpdir(), `guanyao-genesis-star-river-visual-${process.pid}.mjs`);
  await build({
    stdin: {
      contents: `export { mapGenesisStarRiverVisualState } from "./src/services/genesisStarRiverVisualMapping.ts";`,
      resolveDir: rootDir,
      sourcefile: "genesis-star-river-visual-gate-entry.ts",
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
  const moon = Object.freeze({
    lunarPresence: "TAIYIN_PRESENT",
    moonPhaseExpression: "QUIET_ROUND_MOON",
    cosmicDepth: "UNLOCATED_DEEP_SPACE",
    moonlightField: "SOFT_TAIYIN_FIELD",
    temporalRhythm: "SLOW_STABLE_BREATH",
    entranceState: "ENTERING_TAIYIN_REALM",
    firstScreenCopy: Object.freeze({ primary: "日月运行，星辰有序。", secondary: "你的星位，映照了你来到这个世界时的样子。" }),
    semanticMappingReference: Object.freeze({ semanticLayer: "MOON" }),
    visualOnly: true,
    identityBlind: true,
    noIdentity: true,
    noBirthData: true,
    noMansion: true,
    noFourSymbol: true,
    noMotherCode: true,
    noStarBeast: true,
    noEngineInvocation: true,
    noSceneModelInvocation: true,
    noRenderPlanInvocation: true,
    noRendererInvocation: true,
  });
  const ready = runtime.mapGenesisStarRiverVisualState(Object.freeze({ moonOriginVisualState: moon }));
  assertEqual("Star River mapping is ready", ready.status, "READY");
  if (ready.status === "READY") {
    assertEqual("Star field is present", ready.state.starFieldPresence, "STELLAR_FIELD_PRESENT");
    assertEqual("Stellar order is relational", ready.state.stellarOrderExpression, "ORDERED_STELLAR_RELATIONS");
    assertEqual("Star rhythm is slow", ready.state.celestialMotionRhythm, "SLOW_CELESTIAL_DRIFT");
    assertEqual("Moon is consumed upstream", ready.boundary.moonLayerConsumedAsUpstream, true);
    assertEqual("Four Symbol remains untouched", ready.boundary.symbolLayerUntouched, true);
    assertEqual("Star Beast remains untouched", ready.boundary.beastLayerUntouched, true);
    assertEqual("Star state has no mansion result", ready.state.noMansionResult, true);
  }
  const missing = runtime.mapGenesisStarRiverVisualState(Object.freeze({ moonOriginVisualState: null }));
  assertEqual("missing Moon state unavailable", missing.status, "UNAVAILABLE");
  const invalidMoon = runtime.mapGenesisStarRiverVisualState(Object.freeze({ moonOriginVisualState: Object.freeze({ ...moon, noStarBeast: false }) }));
  assertEqual("invalid Moon reference blocked", invalidMoon.status, "BLOCKED");
  assertEqual("invalid Moon reason", invalidMoon.reason, "MOON_ORIGIN_REFERENCE_INVALID");
}

if (failures.length > 0) {
  console.error("\nGenesis Star River visual calibration gate failed:");
  failures.forEach((failure) => console.error(`- ${failure}`));
  process.exit(1);
}
console.log("\nGenesis Star River visual calibration gate passed.");
