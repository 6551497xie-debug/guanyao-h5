import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import process from "node:process";
import { build } from "esbuild";

const rootDir = process.cwd();
const files = Object.freeze({
  type: "src/types/genesisPresenceRecognitionCalibration.ts",
  service: "src/services/genesisPresenceRecognitionCalibration.ts",
  renderer: "src/renderers/genesisWebGLRendererCore.ts",
  harness: "src/pages/PersonalStarBeastWebGLPrototypeHarness.tsx",
  fixture: "src/services/genesisPreviewIntegrationFixture.ts",
  typeIndex: "src/types/index.ts",
  packageManifest: "package.json",
});
const failures = [];
const assertIncludes = (name, source, marker) => {
  if (source.includes(marker)) console.log(`PASS | ${name} | includes=${marker}`);
  else failures.push(`${name} missing=${marker}`);
};
const assertExcludes = (name, source, marker) => {
  if (source.includes(marker)) failures.push(`${name} forbidden=${marker}`);
  else console.log(`PASS | ${name} | forbidden=absent`);
};
const assertEqual = (name, actual, expected) => {
  if (actual === expected) console.log(`PASS | ${name} | expected=${String(expected)}`);
  else failures.push(`${name} expected=${String(expected)} actual=${String(actual)}`);
};
const absolute = Object.fromEntries(
  Object.entries(files).map(([name, relative]) => [name, path.join(rootDir, relative)]),
);

for (const [name, filePath] of Object.entries(absolute)) {
  if (fs.existsSync(filePath)) console.log(`PASS | ${name} file exists`);
  else failures.push(`${name} missing=${filePath}`);
}

if (failures.length === 0) {
  const source = Object.fromEntries(
    Object.entries(absolute).map(([name, filePath]) => [name, fs.readFileSync(filePath, "utf8")]),
  );
  const packageJson = JSON.parse(source.packageManifest);

  [
    "GenesisPresenceRecognitionCalibration",
    "subjectHierarchy",
    "lifeCenter",
    "cosmicSupport",
    "recognitionState",
    "presenceStability",
    "subjectWeight",
    "cosmicSupportWeight",
    "centerInfluence",
    "recognitionHold",
    "stillness",
    "noIdentity",
    "noUserData",
    "noAnimalType",
    "noCreatureModel",
    "noEngineResult",
    "isolatedPrototypeOnly",
  ].forEach((marker) => assertIncludes("P20 presence contract", source.type, marker));

  [
    "mapGenesisPresenceRecognitionCalibration",
    "BEAST_SUBJECT_FORMATION",
    "PRESENCE_RECOGNITION",
    "LIFE_SUBJECT_FOREGROUND",
    "STABLE_BREATHING_CENTER",
    "COSMOS_SUPPORTS_LIFE",
    "QUIET_RECOGNITION_HOLD",
    "PRESENCE_RECOGNITION_LAYER_OUT_OF_SCOPE",
    "PRESENCE_RECOGNITION_BOUNDARY_INVALID",
    "rendererVisualCalibrationOnly",
    "presenceRecognitionOnly",
    "animalizationForbidden",
    "productionIntegration: false",
  ].forEach((marker) => assertIncludes("P20 presence mapping", source.service, marker));

  [
    "genesisPresenceRecognitionCalibration",
    "recognitionSubjectWeight",
    "recognitionCosmicSupportWeight",
    "recognitionCenterInfluence",
    "recognitionHold",
    "recognitionStillness",
    "cosmicFieldOpacity *= 0.82",
    "structureGroup.position.z",
    "rendererPresenceRecognitionCalibration",
  ].forEach((marker) => assertIncludes("P20 renderer projection", source.renderer + source.harness, marker));

  [
    "GENESIS_PRESENCE_STABILIZED",
    "GENESIS_COMPLETION_MOMENT_REVIEW",
    "genesisLayerOnly: true",
    "noRealityCalculation: true",
    "noVisualStateMutation: true",
  ].forEach((marker) => assertIncludes("P20 completion preview consumption", source.fixture, marker));

  [
    "IdentitySource",
    "Birth Data",
    "MotherCode",
    "LifeArchetype",
    "AnimalType",
    "CreatureClass",
    "WHITE_TIGER",
    "AZURE_DRAGON",
    "VERMILION_BIRD",
    "BLACK_TORTOISE",
  ].forEach((marker) => assertExcludes("P20 renderer boundary", source.renderer, marker));

  [
    "GenesisPresenceRecognitionCalibration",
    "GenesisPresenceRecognitionCalibrationInput",
    "GenesisPresenceRecognitionCalibrationResult",
    "from \"./genesisPresenceRecognitionCalibration\"",
  ].forEach((marker) => assertIncludes("P20 type index export", source.typeIndex, marker));
  assertIncludes(
    "P20 gate registered",
    packageJson.scripts?.["check-genesis-presence-recognition-calibration"] ?? "",
    "node scripts/check-genesis-presence-recognition-calibration.mjs",
  );

  const modulePath = path.join(os.tmpdir(), `guanyao-genesis-presence-recognition-${process.pid}.mjs`);
  await build({
    stdin: {
      contents: `export { mapGenesisPresenceRecognitionCalibration } from "./src/services/genesisPresenceRecognitionCalibration.ts";`,
      resolveDir: rootDir,
      sourcefile: "genesis-presence-recognition-gate-entry.ts",
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
  const perspectiveFor = (activeVisualLayer) => Object.freeze({
    activeVisualLayer,
    transitionProgress: 0.9,
    cosmicPerspective: "TAIYIN_MOTHER_COSMOS",
    focalHierarchy: "MOON_MOTHER_STAR_ORDER_TIME_RESPONSE",
    moonRole: "TAIYIN_TEMPORAL_MOTHER",
    starRole: "COSMIC_ORDER_FIELD",
    timeRole: "LIFE_RESPONSE_TO_COSMOS",
    presenceBalance: Object.freeze({}),
    rendererOnly: true,
    visualStateConsumed: true,
    noSemanticMutation: true,
    noIdentity: true,
    noEngineInvocation: true,
    noRuntimeMutation: true,
    noTimelineMutation: true,
    isolatedPrototypeOnly: true,
  });

  const beast = runtime.mapGenesisPresenceRecognitionCalibration({
    perspectiveCalibration: perspectiveFor("BEAST_SUBJECT_FORMATION"),
  });
  assertEqual("P20 beast calibration ready", beast.status, "READY");
  assertEqual("P20 beast subject foreground", beast.calibration?.subjectHierarchy, "LIFE_SUBJECT_FOREGROUND");
  assertEqual("P20 beast cosmic support", beast.calibration?.cosmicSupport, "COSMOS_SUPPORTS_LIFE");
  assertEqual("P20 beast animalization forbidden", beast.calibration?.noAnimalType, true);

  const completion = runtime.mapGenesisPresenceRecognitionCalibration({
    perspectiveCalibration: perspectiveFor("PRESENCE_RECOGNITION"),
  });
  assertEqual("P20 completion calibration ready", completion.status, "READY");
  assertEqual("P20 completion recognition hold", completion.calibration?.recognitionHold, 1);
  assertEqual("P20 completion stillness", completion.calibration?.stillness, 0.98);
  assertEqual("P20 completion stability", completion.calibration?.presenceStability, "RECOGNITION_PRESENCE_STABLE");

  const outOfScope = runtime.mapGenesisPresenceRecognitionCalibration({
    perspectiveCalibration: perspectiveFor("MOON_ORIGIN"),
  });
  assertEqual("P20 pre-beast calibration blocked", outOfScope.reason, "PRESENCE_RECOGNITION_LAYER_OUT_OF_SCOPE");
}

if (failures.length > 0) {
  console.error(`FAIL | check-genesis-presence-recognition-calibration | count=${failures.length}`);
  for (const failure of failures) console.error(`- ${failure}`);
  process.exitCode = 1;
} else {
  console.log("PASS | check-genesis-presence-recognition-calibration");
}
