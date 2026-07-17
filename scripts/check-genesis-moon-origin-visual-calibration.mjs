import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import process from "node:process";
import { build } from "esbuild";

const rootDir = process.cwd();
const files = Object.freeze({
  type: "src/types/genesisMoonOriginVisualState.ts",
  service: "src/services/genesisMoonOriginVisualMapping.ts",
  semanticType: "src/types/genesisVisualSemanticMapping.ts",
  protocol: "docs/GUANYAO_GENESIS_MOON_ORIGIN_VISUAL_CALIBRATION_PROTOCOL.md",
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
    "GenesisMoonOriginVisualState",
    "lunarPresence",
    "moonPhaseExpression",
    "cosmicDepth",
    "moonlightField",
    "temporalRhythm",
    "entranceState",
    "noIdentity: true",
    "noBirthData: true",
    "noMansion: true",
    "noFourSymbol: true",
    "noMotherCode: true",
    "noStarBeast: true",
  ].forEach((marker) => assertIncludes("P1 Moon state type", source.type, marker));
  [
    "export function mapGenesisMoonOriginVisualState",
    "TAIYIN_PRESENT",
    "QUIET_ROUND_MOON",
    "UNLOCATED_DEEP_SPACE",
    "SOFT_TAIYIN_FIELD",
    "SLOW_STABLE_BREATH",
    "ENTERING_TAIYIN_REALM",
    "MOON_MAPPING_BOUNDARY_INVALID",
    "MOON_MAPPING_CONTAINS_LIFE_RESULT",
  ].forEach((marker) => assertIncludes("P1 Moon mapping service", source.service, marker));
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
  ].forEach((marker) => assertExcludes("P1 Moon mapping remains semantic-only", source.service, marker));
  [
    "RC-GUANYAO-GENESIS-MOON-ORIGIN-VISUAL-CALIBRATION-P1",
    "月｜太阴入口",
    "TAIYIN_PRESENT",
    "QUIET_ROUND_MOON",
    "日月运行，星辰有序。",
    "你的星位，映照了你来到这个世界时的样子。",
    "不闪烁",
    "不提前进入星、时、象、卦、力、兽",
    "不修改生命计算",
  ].forEach((marker) => assertIncludes("P1 Moon protocol", source.protocol, marker));
  [
    "GenesisMoonOriginVisualState",
    "GenesisMoonOriginVisualMappingResult",
    "GenesisMoonOriginVisualMappingBoundary",
    "from \"./genesisMoonOriginVisualState\"",
  ].forEach((marker) => assertIncludes("P1 type index export", source.typeIndex, marker));
  assertIncludes("P1 gate registered", packageJson.scripts?.["check-genesis-moon-origin-visual-calibration"] ?? "", "node scripts/check-genesis-moon-origin-visual-calibration.mjs");
  assertIncludes("P1 release gate registered", packageJson.scripts?.["postcheck:release"] ?? "", "npm run check-genesis-moon-origin-visual-calibration");

  const modulePath = path.join(os.tmpdir(), `guanyao-genesis-moon-origin-visual-${process.pid}.mjs`);
  await build({
    stdin: {
      contents: `export { mapGenesisMoonOriginVisualState } from "./src/services/genesisMoonOriginVisualMapping.ts";`,
      resolveDir: rootDir,
      sourcefile: "genesis-moon-origin-visual-gate-entry.ts",
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
  const moonMapping = Object.freeze({
    semanticLayer: "MOON",
    semanticIntent: "太阴入口",
    visualIntent: "让用户进入天地时间场",
    allowedExpression: Object.freeze(["深空", "月华", "圆月", "太阴光场", "慢节律"]),
    forbiddenExpression: Object.freeze(["生命结果", "星兽暗示", "身份提示"]),
    rendererDirection: "以低速月相与柔和光场建立时间入口",
    visualOnly: true,
    identityBlind: true,
    noIdentityCalculation: true,
    noEngineInvocation: true,
    noRendererInvocation: true,
    noSceneModelInvocation: true,
    noRenderPlanInvocation: true,
  });
  const ready = runtime.mapGenesisMoonOriginVisualState(Object.freeze({ semanticMapping: moonMapping }));
  assertEqual("Moon mapping is ready", ready.status, "READY");
  if (ready.status === "READY") {
    assertEqual("Moon presence", ready.state.lunarPresence, "TAIYIN_PRESENT");
    assertEqual("Moon phase", ready.state.moonPhaseExpression, "QUIET_ROUND_MOON");
    assertEqual("Moon rhythm", ready.state.temporalRhythm, "SLOW_STABLE_BREATH");
    assertEqual("Moon remains identity blind", ready.state.identityBlind, true);
    assertEqual("Moon has no Star Beast", ready.state.noStarBeast, true);
    assertEqual("Moon primary copy", ready.state.firstScreenCopy.primary, "日月运行，星辰有序。");
  }
  const missing = runtime.mapGenesisMoonOriginVisualState(Object.freeze({ semanticMapping: null }));
  assertEqual("missing Moon mapping unavailable", missing.status, "UNAVAILABLE");
  const wrongLayer = runtime.mapGenesisMoonOriginVisualState(Object.freeze({ semanticMapping: Object.freeze({ ...moonMapping, semanticLayer: "STAR" }) }));
  assertEqual("later layer is blocked", wrongLayer.status, "BLOCKED");
  assertEqual("later layer reason", wrongLayer.reason, "SEMANTIC_LAYER_NOT_MOON");
  const lifeResult = runtime.mapGenesisMoonOriginVisualState(Object.freeze({ semanticMapping: Object.freeze({ ...moonMapping, visualIntent: "提前显示个人星兽" }) }));
  assertEqual("life result in Moon mapping is blocked", lifeResult.status, "BLOCKED");
  assertEqual("life result reason", lifeResult.reason, "MOON_MAPPING_CONTAINS_LIFE_RESULT");
  const boundary = runtime.mapGenesisMoonOriginVisualState(Object.freeze({ semanticMapping: Object.freeze({ ...moonMapping, identityBlind: false }) }));
  assertEqual("Moon boundary drift is blocked", boundary.status, "BLOCKED");
  assertEqual("Moon boundary reason", boundary.reason, "MOON_MAPPING_BOUNDARY_INVALID");
}

if (failures.length > 0) {
  console.error("\nGenesis Moon Origin visual calibration gate failed:");
  failures.forEach((failure) => console.error(`- ${failure}`));
  process.exit(1);
}
console.log("\nGenesis Moon Origin visual calibration gate passed.");
