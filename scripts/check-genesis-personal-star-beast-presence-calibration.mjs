import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import process from "node:process";
import { build } from "esbuild";

const rootDir = process.cwd();
const files = Object.freeze({
  type: "src/types/genesisPersonalStarBeastPresenceVisualState.ts",
  service: "src/services/genesisPersonalStarBeastPresenceVisualMapping.ts",
  revealType: "src/types/genesisPersonalStarBeastRevealVisualState.ts",
  protocol: "docs/GUANYAO_GENESIS_PERSONAL_STAR_BEAST_PRESENCE_CALIBRATION_PROTOCOL.md",
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
    "GenesisPersonalStarBeastPresenceVisualState",
    "presenceState",
    "lifeOrientation",
    "breathingRhythm",
    "stellarBodyCohesion",
    "silhouetteEmergence",
    "companionPresence",
    "presenceExpressionModes",
    "revealVisualReference",
    "noIdentityId: true",
    "noMansionName: true",
    "noFourSymbolName: true",
    "noMotherCodeId: true",
    "noLifeArchetypeId: true",
    "noAnimalType: true",
    "noRealityPressure: true",
    "noCrystal: true",
  ].forEach((marker) => assertIncludes("P7.1 Presence state type", source.type, marker));
  [
    "export function mapGenesisPersonalStarBeastPresenceVisualState",
    "LIFE_PRESENCE_ESTABLISHED",
    "PRIMARY_AXIS_EMERGING",
    "SLOW_LIFE_BREATH",
    "STELLAR_BODY_COHESION_FORMING",
    "NON_LITERAL_SILHOUETTE_EMERGING",
    "QUIET_COMPANIONSHIP",
    "REVEAL_VISUAL_REFERENCE_INVALID",
    "presenceLayerOnly",
    "revealLayerConsumedAsUpstream",
    "realityUntouched",
    "crystalUntouched",
    "productionUntouched",
  ].forEach((marker) => assertIncludes("P7.1 Presence mapping service", source.service, marker));
  [
    "resolveStarbeastFromBirthDate",
    "resolveLifeArchetypeProfileFromMotherCode",
    "runMotherCodeLandingEngine",
    "runLifeArchetypeEngine",
    "runHexagramCalculation",
    "runFourSymbolEngine",
    "createRenderer",
    "buildSceneModel",
    "createRenderPlan",
    "localStorage",
    "sessionStorage",
    "fetch(",
    "document.",
    "青龙",
    "白虎",
    "朱雀",
    "玄武",
    "GREEN_DRAGON",
    "WHITE_TIGER",
    "VERMILION_BIRD",
    "BLACK_TORTOISE",
    "animalType:",
    "realityPressure:",
    "crystalState:",
  ].forEach((marker) => assertExcludes("P7.1 Presence mapping remains semantic-only", source.service, marker));
  [
    "RC-GUANYAO-GENESIS-PERSONAL-STAR-BEAST-PRESENCE-CALIBRATION-P7.1",
    "兽｜个人星兽归来",
    "生命存在感校准",
    "让已有结构成为生命",
    "主轴形成",
    "前后关系",
    "生长趋势",
    "星骨连接",
    "粒子聚合",
    "边界形成",
    "局部密度变化",
    "极慢周期",
    "核心响应",
    "整体微变化",
    "静默陪伴",
    "稳定停驻",
    "与用户空间关系",
    "月：提供时间背景",
    "星：提供生命空间",
    "时：提供降临节律",
    "象：提供形态倾向",
    "卦：提供变化纹理",
    "力：提供运动方式",
    "兽：形成存在",
    "不接 Reality、Gravity、Choice、Crystal",
    "没有动物化",
  ].forEach((marker) => assertIncludes("P7.1 Presence protocol", source.protocol, marker));
  [
    "GenesisPersonalStarBeastPresenceVisualState",
    "GenesisPersonalStarBeastPresenceVisualMappingResult",
    "GenesisPersonalStarBeastPresenceVisualMappingBoundary",
    "from \"./genesisPersonalStarBeastPresenceVisualState\"",
  ].forEach((marker) => assertIncludes("P7.1 type index export", source.typeIndex, marker));
  assertIncludes("P7.1 gate registered", packageJson.scripts?.["check-genesis-personal-star-beast-presence-calibration"] ?? "", "node scripts/check-genesis-personal-star-beast-presence-calibration.mjs");
  assertIncludes("P7.1 release gate registered", packageJson.scripts?.["postcheck:release"] ?? "", "npm run check-genesis-personal-star-beast-presence-calibration");

  const modulePath = path.join(os.tmpdir(), `guanyao-genesis-personal-star-beast-presence-${process.pid}.mjs`);
  await build({
    stdin: {
      contents: `export { mapGenesisPersonalStarBeastPresenceVisualState } from "./src/services/genesisPersonalStarBeastPresenceVisualMapping.ts";`,
      resolveDir: rootDir,
      sourcefile: "genesis-personal-star-beast-presence-gate-entry.ts",
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
  const reveal = Object.freeze({
    revealPresence: "LIFE_PRESENCE_RETURNING",
    stellarBodyFormation: "STELLAR_LIFE_STRUCTURE_FORMED",
    symbolicEmbodiment: "SYMBOLIC_FIELD_CARRIED",
    forceExpression: "LIFE_FORCE_RHYTHM_EMBODIED",
    lifePresenceRhythm: "QUIET_LIFE_PRESENCE_RHYTHM",
    revealCompletion: "PERSONAL_STAR_BEAST_REVEAL_COMPLETE",
    revealRhythmStages: ["PRESENCE", "FORMATION", "RETURN"],
    visualOnly: true,
    identityBlind: true,
    noIdentityId: true,
    noMansionName: true,
    noFourSymbolName: true,
    noMotherCodeId: true,
    noLifeArchetypeId: true,
    noUserData: true,
    noAnimalType: true,
    noFourSymbolResult: true,
    noMotherCodeResult: true,
    noLifeArchetypeResult: true,
    noRealityPressure: true,
    noCrystal: true,
    noEngineInvocation: true,
    noIdentitySourceInvocation: true,
    noRendererInvocation: true,
    noSceneModelInvocation: true,
    noRenderPlanInvocation: true,
    noStorageWrite: true,
  });
  const ready = runtime.mapGenesisPersonalStarBeastPresenceVisualState(Object.freeze({ revealVisualState: reveal }));
  assertEqual("Presence mapping is ready", ready.status, "READY");
  if (ready.status === "READY") {
    assertEqual("Presence is established", ready.state.presenceState, "LIFE_PRESENCE_ESTABLISHED");
    assertEqual("Life orientation emerges", ready.state.lifeOrientation, "PRIMARY_AXIS_EMERGING");
    assertEqual("Breathing is slow", ready.state.breathingRhythm, "SLOW_LIFE_BREATH");
    assertEqual("Stellar body cohesion forms", ready.state.stellarBodyCohesion, "STELLAR_BODY_COHESION_FORMING");
    assertEqual("Companion presence is quiet", ready.state.companionPresence, "QUIET_COMPANIONSHIP");
    assertEqual("Four presence modes", ready.state.presenceExpressionModes.length, 4);
    assertEqual("Reveal is consumed upstream", ready.boundary.revealLayerConsumedAsUpstream, true);
    assertEqual("Reality remains untouched", ready.boundary.realityUntouched, true);
    assertEqual("Crystal remains untouched", ready.boundary.crystalUntouched, true);
    assertEqual("Output has no animal type", ready.state.noAnimalType, true);
  }
  const missing = runtime.mapGenesisPersonalStarBeastPresenceVisualState(Object.freeze({ revealVisualState: null }));
  assertEqual("missing Reveal Visual unavailable", missing.status, "UNAVAILABLE");
  assertEqual("missing Reveal reason", missing.reason, "REVEAL_VISUAL_STATE_REQUIRED");
  const invalidReveal = runtime.mapGenesisPersonalStarBeastPresenceVisualState(Object.freeze({ revealVisualState: Object.freeze({ ...reveal, noAnimalType: false }) }));
  assertEqual("invalid Reveal reference blocked", invalidReveal.status, "BLOCKED");
  assertEqual("invalid Reveal reason", invalidReveal.reason, "REVEAL_VISUAL_REFERENCE_INVALID");
}

if (failures.length > 0) {
  console.error("\nGenesis Personal Star Beast presence calibration gate failed:");
  failures.forEach((failure) => console.error(`- ${failure}`));
  process.exit(1);
}
console.log("\nGenesis Personal Star Beast presence calibration gate passed.");
