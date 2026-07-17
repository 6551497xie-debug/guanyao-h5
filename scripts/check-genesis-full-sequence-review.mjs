import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import process from "node:process";
import { build } from "esbuild";

const rootDir = process.cwd();
const files = Object.freeze({
  type: "src/types/genesisFullSequenceReview.ts",
  service: "src/services/genesisFullSequenceReview.ts",
  protocol: "docs/GUANYAO_GENESIS_FULL_SEQUENCE_REVIEW_PROTOCOL.md",
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
    "GenesisFullSequenceReview",
    "sequenceIntegrity",
    "transitionQuality",
    "semanticContinuity",
    "visualCausality",
    "revealJourneyState",
    "MOON",
    "STAR",
    "TIME",
    "SYMBOL",
    "HEXAGRAM",
    "FORCE",
    "BEAST",
    "MOON_TO_STAR",
    "STAR_TO_TIME",
    "TIME_TO_SYMBOL",
    "SYMBOL_TO_HEXAGRAM",
    "HEXAGRAM_TO_FORCE",
    "FORCE_TO_BEAST",
  ].forEach((marker) => assertIncludes("P8 review type", source.type, marker));

  [
    "export function reviewGenesisFullSequence",
    "SEVEN_LAYER_SEQUENCE_INTACT",
    "CAUSALLY_CONTINUOUS",
    "LIFE_JOURNEY_CONTINUOUS",
    "UPSTREAM_VISUAL_STATE_DRIVES_NEXT_LAYER",
    "GENESIS_VISUAL_STATES_REQUIRED",
    "GENESIS_TRANSITION_CAUSALITY_INVALID",
    "genesisIntegrationOnly",
    "visualStatesConsumedAsUpstream",
    "identityUntouched",
    "rendererCommandsUntouched",
    "realityUntouched",
    "crystalUntouched",
  ].forEach((marker) => assertIncludes("P8 review service", source.service, marker));

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
  ].forEach((marker) => assertExcludes("P8 review remains review-only", source.service, marker));

  [
    "RC-GUANYAO-GENESIS-FULL-SEQUENCE-INTEGRATION-REVIEW-P8",
    "月｜太阴入口",
    "星｜星河秩序",
    "时｜生命时序共振",
    "象｜四象显影",
    "卦｜变化印记",
    "力｜生命原力",
    "兽｜个人星兽存在",
    "月华照见星河",
    "时间进入已有秩序",
    "时间改变星河状态",
    "运动规律沉积",
    "结构影响动力",
    "生命逐渐归来",
    "不是七个彼此独立的视觉模块",
    "不修改任何视觉状态",
    "不接入 Reality、Gravity、Choice、Crystal",
  ].forEach((marker) => assertIncludes("P8 protocol", source.protocol, marker));

  [
    "GenesisFullSequenceReview",
    "GenesisFullSequenceReviewInput",
    "GenesisFullSequenceReviewResult",
    "GenesisFullSequenceReviewBoundary",
    "from \"./genesisFullSequenceReview\"",
  ].forEach((marker) => assertIncludes("P8 type index export", source.typeIndex, marker));
  assertIncludes("P8 gate registered", packageJson.scripts?.["check-genesis-full-sequence-review"] ?? "", "node scripts/check-genesis-full-sequence-review.mjs");
  assertIncludes("P8 release gate registered", packageJson.scripts?.["postcheck:release"] ?? "", "npm run check-genesis-full-sequence-review");

  const modulePath = path.join(os.tmpdir(), `guanyao-genesis-full-sequence-review-${process.pid}.mjs`);
  await build({
    stdin: {
      contents: `export { reviewGenesisFullSequence } from "./src/services/genesisFullSequenceReview.ts";`,
      resolveDir: rootDir,
      sourcefile: "genesis-full-sequence-review-gate-entry.ts",
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
    entranceState: "ENTERING_TAIYIN_REALM",
    visualOnly: true,
    identityBlind: true,
    noStarBeast: true,
    noEngineInvocation: true,
  });
  const star = Object.freeze({
    moonOriginReference: moon,
    starFieldPresence: "STELLAR_FIELD_PRESENT",
    stellarOrderExpression: "ORDERED_STELLAR_RELATIONS",
    mansionGroupExpression: "SEVEN_POINT_GROUP_TENDENCY",
    identityBlind: true,
    noPersonalStarBeast: true,
  });
  const time = Object.freeze({
    starRiverReference: star,
    temporalEntryState: "LIFE_TIME_DELIVERED_TO_STARS",
    starFieldResponse: "STELLAR_RHYTHM_RESPONDS",
    identityBlind: true,
    noPersonalStarBeast: true,
  });
  const symbol = Object.freeze({
    timeResonanceReference: time,
    symbolFieldPresence: "SYMBOL_FIELD_EMERGING",
    sevenMansionAggregation: "SEVEN_MANSION_RELATIONS_GATHERING",
    identityBlind: true,
    noPersonalStarBeast: true,
  });
  const hexagram = Object.freeze({
    symbolVisualReference: symbol,
    changePatternPresence: "CHANGE_PATTERN_EMERGING",
    yaoStructureExpression: "SIX_LAYER_TRANSFORMATION_STRUCTURE",
    identityBlind: true,
    noPersonalStarBeast: true,
  });
  const force = Object.freeze({
    hexagramVisualReference: hexagram,
    forcePresence: "LIFE_FORCE_AWAKENING",
    forceInfluence: "STRUCTURE_RESPONDS_TO_FORCE",
    identityBlind: true,
    noPersonalStarBeast: true,
  });
  const reveal = Object.freeze({
    moonOriginVisualReference: moon,
    starRiverVisualReference: star,
    timeResonanceVisualReference: time,
    symbolVisualReference: symbol,
    hexagramVisualReference: hexagram,
    lifeForceVisualReference: force,
    revealPresence: "LIFE_PRESENCE_RETURNING",
    revealCompletion: "PERSONAL_STAR_BEAST_REVEAL_COMPLETE",
    revealRhythmStages: ["PRESENCE", "FORMATION", "RETURN"],
    identityBlind: true,
    noAnimalType: true,
    noRealityPressure: true,
    noCrystal: true,
  });
  const presence = Object.freeze({
    revealVisualReference: reveal,
    presenceState: "LIFE_PRESENCE_ESTABLISHED",
    lifeOrientation: "PRIMARY_AXIS_EMERGING",
    breathingRhythm: "SLOW_LIFE_BREATH",
    stellarBodyCohesion: "STELLAR_BODY_COHESION_FORMING",
    companionPresence: "QUIET_COMPANIONSHIP",
    identityBlind: true,
    noAnimalType: true,
    noRealityPressure: true,
    noCrystal: true,
  });
  const input = Object.freeze({
    moonOriginVisualState: moon,
    starRiverVisualState: star,
    timeResonanceVisualState: time,
    symbolVisualState: symbol,
    hexagramVisualState: hexagram,
    lifeForceVisualState: force,
    personalStarBeastRevealVisualState: reveal,
    personalStarBeastPresenceVisualState: presence,
  });
  const ready = runtime.reviewGenesisFullSequence(input);
  assertEqual("full sequence review is ready", ready.status, "READY");
  if (ready.status === "READY") {
    assertEqual("seven-layer count", ready.review.sequence.length, 7);
    assertEqual("six transition count", ready.review.transitions.length, 6);
    assertEqual("first layer is MOON", ready.review.sequence[0], "MOON");
    assertEqual("last layer is BEAST", ready.review.sequence[6], "BEAST");
    assertEqual("transition quality is causal", ready.review.transitionQuality, "CAUSALLY_CONTINUOUS");
    assertEqual("review does not mutate states", ready.boundary.visualStatesConsumedAsUpstream, true);
    assertEqual("reality remains untouched", ready.boundary.realityUntouched, true);
    assertEqual("crystal remains untouched", ready.boundary.crystalUntouched, true);
  }
  const missing = runtime.reviewGenesisFullSequence(Object.freeze({ ...input, hexagramVisualState: null }));
  assertEqual("missing visual state unavailable", missing.status, "UNAVAILABLE");
  assertEqual("missing visual state reason", missing.reason, "GENESIS_VISUAL_STATES_REQUIRED");
  const broken = runtime.reviewGenesisFullSequence(Object.freeze({
    ...input,
    timeResonanceVisualState: Object.freeze({ ...time, starRiverReference: Object.freeze({}) }),
  }));
  assertEqual("broken transition blocked", broken.status, "BLOCKED");
  assertEqual("broken transition reason", broken.reason, "GENESIS_TRANSITION_CAUSALITY_INVALID");
}

if (failures.length > 0) {
  console.error("\nGenesis full sequence review gate failed:");
  failures.forEach((failure) => console.error(`- ${failure}`));
  process.exit(1);
}
console.log("\nGenesis full sequence review gate passed.");
