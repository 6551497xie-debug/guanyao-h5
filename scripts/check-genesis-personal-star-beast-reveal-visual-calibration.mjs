import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import process from "node:process";
import { build } from "esbuild";

const rootDir = process.cwd();
const files = Object.freeze({
  type: "src/types/genesisPersonalStarBeastRevealVisualState.ts",
  service: "src/services/genesisPersonalStarBeastRevealVisualMapping.ts",
  moonType: "src/types/genesisMoonOriginVisualState.ts",
  starType: "src/types/genesisStarRiverVisualState.ts",
  timeType: "src/types/genesisTimeResonanceVisualState.ts",
  symbolType: "src/types/genesisSymbolVisualState.ts",
  hexagramType: "src/types/genesisHexagramVisualState.ts",
  forceType: "src/types/genesisLifeForceVisualState.ts",
  protocol: "docs/GUANYAO_GENESIS_PERSONAL_STAR_BEAST_REVEAL_VISUAL_CALIBRATION_PROTOCOL.md",
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
    "GenesisPersonalStarBeastRevealVisualState",
    "revealPresence",
    "stellarBodyFormation",
    "symbolicEmbodiment",
    "forceExpression",
    "lifePresenceRhythm",
    "revealCompletion",
    "revealRhythmStages",
    "moonOriginVisualReference",
    "starRiverVisualReference",
    "timeResonanceVisualReference",
    "symbolVisualReference",
    "hexagramVisualReference",
    "lifeForceVisualReference",
    "noIdentityId: true",
    "noMansionName: true",
    "noFourSymbolName: true",
    "noMotherCodeId: true",
    "noLifeArchetypeId: true",
    "noUserData: true",
    "noAnimalType: true",
    "noRealityPressure: true",
    "noCrystal: true",
  ].forEach((marker) => assertIncludes("P7 Reveal state type", source.type, marker));
  [
    "export function mapGenesisPersonalStarBeastRevealVisualState",
    "LIFE_PRESENCE_RETURNING",
    "STELLAR_LIFE_STRUCTURE_FORMED",
    "SYMBOLIC_FIELD_CARRIED",
    "LIFE_FORCE_RHYTHM_EMBODIED",
    "QUIET_LIFE_PRESENCE_RHYTHM",
    "PERSONAL_STAR_BEAST_REVEAL_COMPLETE",
    "UPSTREAM_VISUAL_CHAIN_INVALID",
    "beastLayerOnly",
    "forceLayerConsumedAsUpstream",
    "realityPressureUntouched",
    "crystalUntouched",
    "productionUntouched",
  ].forEach((marker) => assertIncludes("P7 Reveal mapping service", source.service, marker));
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
    "realityPressure:",
    "crystalState",
    "animalType",
  ].forEach((marker) => assertExcludes("P7 Reveal mapping remains visual-only", source.service, marker));
  [
    "RC-GUANYAO-GENESIS-PERSONAL-STAR-BEAST-REVEAL-VISUAL-CALIBRATION-P7",
    "兽｜个人星兽归来",
    "星兽不是生成",
    "前六层生命结构共同归来的显化",
    "星辰生命体",
    "星骨 + 象场 + 卦纹 + 原力节律 = 个人星兽",
    "存在 → 成形 → 归来",
    "星尘聚合",
    "星骨连接",
    "空间姿态",
    "运动方向",
    "结构气质",
    "结构纹理",
    "阴阳节律",
    "变化痕迹",
    "呼吸节奏",
    "光流方式",
    "运动倾向",
    "不直接出现动物",
    "不加载模型",
    "不生成角色",
    "不提前接入 Reality Pressure / Gravity",
    "不污染 Production",
    "没有宠物感",
    "游戏 Boss 感",
  ].forEach((marker) => assertIncludes("P7 Reveal protocol", source.protocol, marker));
  [
    "GenesisPersonalStarBeastRevealVisualState",
    "GenesisPersonalStarBeastRevealVisualMappingResult",
    "GenesisPersonalStarBeastRevealVisualMappingBoundary",
    "from \"./genesisPersonalStarBeastRevealVisualState\"",
  ].forEach((marker) => assertIncludes("P7 type index export", source.typeIndex, marker));
  assertIncludes("P7 gate registered", packageJson.scripts?.["check-genesis-personal-star-beast-reveal-visual-calibration"] ?? "", "node scripts/check-genesis-personal-star-beast-reveal-visual-calibration.mjs");
  assertIncludes("P7 release gate registered", packageJson.scripts?.["postcheck:release"] ?? "", "npm run check-genesis-personal-star-beast-reveal-visual-calibration");

  const modulePath = path.join(os.tmpdir(), `guanyao-genesis-personal-star-beast-reveal-${process.pid}.mjs`);
  await build({
    stdin: {
      contents: `export { mapGenesisPersonalStarBeastRevealVisualState } from "./src/services/genesisPersonalStarBeastRevealVisualMapping.ts";`,
      resolveDir: rootDir,
      sourcefile: "genesis-personal-star-beast-reveal-visual-gate-entry.ts",
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
    identityBlind: true,
    noIdentity: true,
    noBirthData: true,
    noMansion: true,
    noFourSymbol: true,
    noMotherCode: true,
    noStarBeast: true,
  });
  const star = Object.freeze({
    starFieldPresence: "STELLAR_FIELD_PRESENT",
    stellarOrderExpression: "ORDERED_STELLAR_RELATIONS",
    mansionGroupExpression: "SEVEN_POINT_GROUP_TENDENCY",
    celestialMotionRhythm: "SLOW_CELESTIAL_DRIFT",
    spatialDepthExpression: "DEEP_LAYERED_COSMOS",
    observationState: "QUIET_OBSERVATION",
    moonOriginReference: moon,
    identityBlind: true,
    noIdentity: true,
    noMansionResult: true,
    noFourSymbolResult: true,
    noMotherCode: true,
    noPersonalStarBeast: true,
  });
  const time = Object.freeze({
    temporalEntryState: "LIFE_TIME_DELIVERED_TO_STARS",
    moonPhaseTransitionExpression: "MOONLIGHT_GATHERS_TO_TIME",
    starFieldResponse: "STELLAR_RHYTHM_RESPONDS",
    temporalRhythm: "SLOW_TIME_RESONANCE",
    alignmentState: "TEMPORAL_MOMENT_STABILIZED",
    starRiverReference: star,
    identityBlind: true,
    noIdentity: true,
    noBirthMansionResult: true,
    noFourSymbolResult: true,
    noHexagram: true,
    noMotherCode: true,
    noPersonalStarBeast: true,
  });
  const symbol = Object.freeze({
    symbolFieldPresence: "SYMBOL_FIELD_EMERGING",
    sevenMansionAggregation: "SEVEN_MANSION_RELATIONS_GATHERING",
    spatialMorphology: "FOUR_DIRECTIONAL_MOTION_FIELD",
    celestialSkeleton: "STAR_BONE_STRUCTURE_FORMING",
    symbolicRhythm: "SLOW_SYMBOLIC_DRIFT",
    alignmentState: "SYMBOL_FIELD_STABILIZED",
    timeResonanceReference: time,
    identityBlind: true,
    noIdentity: true,
    noBirthMansionResult: true,
    noFourSymbolResult: true,
    noHexagram: true,
    noMotherCode: true,
    noPersonalStarBeast: true,
  });
  const hexagram = Object.freeze({
    changePatternPresence: "CHANGE_PATTERN_EMERGING",
    yinYangRhythmExpression: "CONTRACTION_EXPANSION_ALTERNATION",
    yaoStructureExpression: "SIX_LAYER_TRANSFORMATION_STRUCTURE",
    transformationTrace: "CONTINUOUS_STATE_TRANSITION_TRACE",
    imprintState: "LIFE_CHANGE_IMPRINT_FORMING",
    symbolVisualReference: symbol,
    identityBlind: true,
    noIdentity: true,
    noFourSymbolResult: true,
    noHexagramCalculationResult: true,
    noMotherCode: true,
    noLifeArchetype: true,
    noPersonalStarBeast: true,
  });
  const force = Object.freeze({
    forcePresence: "LIFE_FORCE_AWAKENING",
    rhythmExpression: "LIFE_RHYTHM_RECONFIGURING",
    movementExpression: "DYNAMIC_TENDENCY_EMERGING",
    coreActivation: "STAR_CORE_BREATH_REAWAKENING",
    forceInfluence: "STRUCTURE_RESPONDS_TO_FORCE",
    hexagramVisualReference: hexagram,
    identityBlind: true,
    noIdentity: true,
    noMotherCode: true,
    noLifeArchetype: true,
    noPersonalStarBeast: true,
  });
  const input = Object.freeze({
    moonOriginVisualState: moon,
    starRiverVisualState: star,
    timeResonanceVisualState: time,
    symbolVisualState: symbol,
    hexagramVisualState: hexagram,
    lifeForceVisualState: force,
  });
  const ready = runtime.mapGenesisPersonalStarBeastRevealVisualState(input);
  assertEqual("Reveal mapping is ready", ready.status, "READY");
  if (ready.status === "READY") {
    assertEqual("Reveal presence", ready.state.revealPresence, "LIFE_PRESENCE_RETURNING");
    assertEqual("Stellar body is formed", ready.state.stellarBodyFormation, "STELLAR_LIFE_STRUCTURE_FORMED");
    assertEqual("Symbolic field is carried", ready.state.symbolicEmbodiment, "SYMBOLIC_FIELD_CARRIED");
    assertEqual("Force rhythm is embodied", ready.state.forceExpression, "LIFE_FORCE_RHYTHM_EMBODIED");
    assertEqual("Reveal rhythm stages", ready.state.revealRhythmStages.length, 3);
    assertEqual("Beast layer owns output", ready.boundary.beastLayerOnly, true);
    assertEqual("Force is consumed upstream", ready.boundary.forceLayerConsumedAsUpstream, true);
    assertEqual("Reality Pressure remains untouched", ready.boundary.realityPressureUntouched, true);
    assertEqual("Crystal remains untouched", ready.boundary.crystalUntouched, true);
    assertEqual("Output has no animal type", ready.state.noAnimalType, true);
  }
  const missing = runtime.mapGenesisPersonalStarBeastRevealVisualState(Object.freeze({ ...input, lifeForceVisualState: null }));
  assertEqual("missing upstream state unavailable", missing.status, "UNAVAILABLE");
  assertEqual("missing upstream reason", missing.reason, "UPSTREAM_VISUAL_STATES_REQUIRED");
  const invalidChain = runtime.mapGenesisPersonalStarBeastRevealVisualState(Object.freeze({ ...input, hexagramVisualState: Object.freeze({ ...hexagram, symbolVisualReference: Object.freeze({}) }) }));
  assertEqual("invalid upstream chain blocked", invalidChain.status, "BLOCKED");
  assertEqual("invalid upstream reason", invalidChain.reason, "UPSTREAM_VISUAL_CHAIN_INVALID");
}

if (failures.length > 0) {
  console.error("\nGenesis Personal Star Beast reveal visual calibration gate failed:");
  failures.forEach((failure) => console.error(`- ${failure}`));
  process.exit(1);
}
console.log("\nGenesis Personal Star Beast reveal visual calibration gate passed.");
