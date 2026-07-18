import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import process from "node:process";
import { build } from "esbuild";

const rootDir = process.cwd();
const files = Object.freeze({
  type: "src/types/genesisSpatialDistanceCalibration.ts",
  service: "src/services/genesisSpatialDistanceCalibration.ts",
  rendererType: "src/types/genesisWebGLRendererCore.ts",
  renderer: "src/renderers/genesisWebGLRendererCore.ts",
  harness: "src/pages/PersonalStarBeastWebGLPrototypeHarness.tsx",
  typeIndex: "src/types/index.ts",
  packageManifest: "package.json",
});
const failures = [];
const source = {};

const assertIncludes = (name, value, marker) => {
  if (value.includes(marker)) console.log(`PASS | ${name} | includes=${marker}`);
  else failures.push(`${name} missing=${marker}`);
};
const assertExcludes = (name, value, marker) => {
  if (value.includes(marker)) failures.push(`${name} forbidden=${marker}`);
  else console.log(`PASS | ${name} | forbidden=absent`);
};
const assertEqual = (name, actual, expected) => {
  if (actual === expected) console.log(`PASS | ${name} | expected=${String(expected)}`);
  else failures.push(`${name} expected=${String(expected)} actual=${String(actual)}`);
};
const assertTrue = (name, value) => assertEqual(name, value, true);

for (const [name, relative] of Object.entries(files)) {
  const filePath = path.join(rootDir, relative);
  if (!fs.existsSync(filePath)) failures.push(`${name} missing=${filePath}`);
  else {
    source[name] = fs.readFileSync(filePath, "utf8");
    console.log(`PASS | ${name} file exists`);
  }
}

if (failures.length === 0) {
  const packageJson = JSON.parse(source.packageManifest);

  [
    "GenesisSpatialDistanceCalibration",
    "spatialDepth",
    "celestialDistance",
    "lifePresenceDistance",
    "focusTransition",
    "approachState",
    "depthScale",
    "contrast",
    "edgeDefinition",
    "focusStrength",
    "approachProgress",
    "presenceCarry",
    "noBlurSubstitution",
    "noSemanticMutation",
    "noGenesisRuntimeMutation",
    "noAnimalization",
    "isolatedPrototypeOnly",
  ].forEach((marker) => assertIncludes("P44 spatial distance type", source.type, marker));

  [
    "mapGenesisSpatialDistanceCalibration",
    "DEEP_COSMIC_DISTANCE",
    "REMOTE_MOON_SURFACE",
    "ORDERED_STAR_RIVER_DEPTH",
    "TIME_RESPONSE_FIELD",
    "FORMING_LIFE_FIELD",
    "LIFE_PRESENCE_APPROACH",
    "LIFE_PRESENCE_NEAR_HOLD",
    "GRADUAL_APPROACH",
    "RECOGNITION_HOLD",
    "noBlurSubstitution",
    "SPATIAL_DISTANCE_BOUNDARY_INVALID",
    "SPATIAL_DISTANCE_LAYER_OUT_OF_SCOPE",
    "PRESENCE_RECOGNITION_CALIBRATION_REQUIRED",
    "productionIntegration: false",
  ].forEach((marker) => assertIncludes("P44 spatial distance service", source.service, marker));

  [
    "genesisSpatialDistanceCalibration: GenesisSpatialDistanceCalibration | null",
    "genesisSpatialDistanceCalibration?: GenesisSpatialDistanceCalibration | null",
  ].forEach((marker) => assertIncludes("P44 renderer input boundary", source.rendererType, marker));

  [
    "genesisSpatialDistanceCalibration",
    "spatialDepthScale",
    "spatialContrast",
    "spatialEdgeDefinition",
    "spatialApproachProgress",
    "spatialPresenceCarry",
    "data-genesis-spatial-distance-calibration",
  ].forEach((marker) => assertIncludes("P44 renderer consumption", source.renderer + source.harness, marker));

  [
    "GenesisSpatialDistanceCalibration",
    "GenesisSpatialDistanceCalibrationInput",
    "GenesisSpatialDistanceCalibrationResult",
    "from \"./genesisSpatialDistanceCalibration\"",
  ].forEach((marker) => assertIncludes("P44 type index export", source.typeIndex, marker));

  [
    "check-genesis-spatial-distance-calibration",
    "check-genesis-perspective-calibration",
    "check-genesis-presence-recognition-calibration",
    "check-genesis-space-ui-runtime",
    "check-recognition-space-ui-runtime",
    "check-life-journey-full-loop-revalidation",
  ].forEach((scriptName) =>
    assertIncludes("P44 gate chain", source.packageManifest, scriptName),
  );

  [
    "IdentitySource",
    "MotherCode",
    "LifeArchetype",
    "localStorage",
    "sessionStorage",
    "resetGenesis",
    "setPreviewStageIndex",
    "generatePressure",
    "generateGravity",
    "generateChoice",
    "generateCrystal",
  ].forEach((marker) => assertExcludes("P44 mapping remains visual-only", source.service, marker));

  const modulePath = path.join(os.tmpdir(), `guanyao-spatial-distance-${process.pid}.mjs`);
  await build({
    stdin: {
      contents: `export { mapGenesisSpatialDistanceCalibration } from "./src/services/genesisSpatialDistanceCalibration.ts";`,
      resolveDir: rootDir,
      sourcefile: "genesis-spatial-distance-gate-entry.ts",
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
  const realizationFor = (activeVisualLayer, transitionProgress = 0.5) => Object.freeze({
    activeVisualLayer,
    visualExpressionMode: "ORDERED_STAR_RIVER",
    transitionProgress,
    environmentalState: Object.freeze({
      cosmicDepth: "DEEP_LAYERED_COSMOS",
      moonlight: "SOFT_TAIYIN_FIELD",
      stellarOrder: "ORDERED_RELATIONS",
      temporalResponse: "SLOW_DRIFT",
    }),
    focalElementState: Object.freeze({
      focalElement: "MOON_DISC",
      coreLightSuppression: 0.7,
      ambientFocus: 0.5,
    }),
    rendererOnly: true,
    visualStateConsumed: true,
    runtimeConsumed: true,
    timelineConsumed: true,
    identityBlind: true,
    noIdentity: true,
    noEngineInvocation: true,
    noVisualStateMutation: true,
    noRuntimeMutation: true,
    noTimelineMutation: true,
    noLifeFactCopy: true,
    noRendererSemanticCreation: true,
    isolatedPrototypeOnly: true,
  });
  const perspective = Object.freeze({
    activeVisualLayer: "PRESENCE_RECOGNITION",
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
  const presence = Object.freeze({
    activeLayer: "PRESENCE_RECOGNITION",
    subjectHierarchy: "LIFE_SUBJECT_FOREGROUND",
    lifeCenter: "STABLE_BREATHING_CENTER",
    cosmicSupport: "COSMOS_SUPPORTS_LIFE",
    recognitionState: "QUIET_RECOGNITION_HOLD",
    presenceStability: "RECOGNITION_PRESENCE_STABLE",
    subjectWeight: 1.24,
    cosmicSupportWeight: 0.56,
    centerInfluence: 1.06,
    recognitionHold: 1,
    stillness: 0.98,
    rendererOnly: true,
    perspectiveCalibrationConsumed: true,
    noIdentity: true,
    noUserData: true,
    noAnimalType: true,
    noCreatureModel: true,
    noEngineResult: true,
    noVisualStateMutation: true,
    noRuntimeMutation: true,
    noTimelineMutation: true,
    isolatedPrototypeOnly: true,
  });

  const moon = runtime.mapGenesisSpatialDistanceCalibration({
    visualRealization: realizationFor("MOON_ORIGIN"),
    perspectiveCalibration: perspective,
    presenceRecognitionCalibration: null,
  });
  assertEqual("P44 Moon calibration", moon.status, "READY");
  if (moon.status === "READY") {
    assertEqual("P44 Moon spatial depth", moon.calibration.spatialDepth, "DEEP_COSMIC_DISTANCE");
    assertTrue("P44 Moon clear edge", moon.calibration.edgeDefinition > 0.8);
    assertTrue("P44 Moon low contrast", moon.calibration.contrast < 0.8);
  }

  const star = runtime.mapGenesisSpatialDistanceCalibration({
    visualRealization: realizationFor("STAR_RIVER"),
    perspectiveCalibration: perspective,
    presenceRecognitionCalibration: null,
  });
  assertEqual("P44 Star calibration", star.status, "READY");
  if (star.status === "READY") {
    assertEqual("P44 Star focus", star.calibration.focusTransition, "ORDERED_FIELD_FOCUS");
    assertTrue("P44 Star deeper scale", star.calibration.depthScale > 1);
  }

  const beast = runtime.mapGenesisSpatialDistanceCalibration({
    visualRealization: realizationFor("STAR_BEAST_REVEAL", 0.8),
    perspectiveCalibration: perspective,
    presenceRecognitionCalibration: presence,
  });
  assertEqual("P44 Beast calibration", beast.status, "READY");
  if (beast.status === "READY") {
    assertEqual("P44 Beast approach", beast.calibration.approachState, "GRADUAL_APPROACH");
    assertTrue("P44 Beast structure edge", beast.calibration.edgeDefinition > 0.9);
    assertTrue("P44 Beast presence carry", beast.calibration.presenceCarry > 0.9);
  }

  const completion = runtime.mapGenesisSpatialDistanceCalibration({
    visualRealization: realizationFor("COMPLETION", 1),
    perspectiveCalibration: perspective,
    presenceRecognitionCalibration: presence,
  });
  assertEqual("P44 Completion calibration", completion.status, "READY");
  if (completion.status === "READY") {
    assertEqual("P44 Completion approach", completion.calibration.approachState, "RECOGNITION_HOLD");
    assertEqual("P44 Completion presence carry", completion.calibration.presenceCarry, 1);
  }

  const missingPresence = runtime.mapGenesisSpatialDistanceCalibration({
    visualRealization: realizationFor("STAR_BEAST_REVEAL"),
    perspectiveCalibration: perspective,
    presenceRecognitionCalibration: null,
  });
  assertEqual("P44 missing presence unavailable", missingPresence.status, "UNAVAILABLE");
  if (missingPresence.status === "UNAVAILABLE") {
    assertEqual(
      "P44 missing presence reason",
      missingPresence.reason,
      "PRESENCE_RECOGNITION_CALIBRATION_REQUIRED",
    );
  }

  const invalidProgress = runtime.mapGenesisSpatialDistanceCalibration({
    visualRealization: realizationFor("MOON_ORIGIN", 1.2),
    perspectiveCalibration: perspective,
    presenceRecognitionCalibration: null,
  });
  assertEqual("P44 invalid progress blocked", invalidProgress.status, "BLOCKED");
}

if (failures.length > 0) {
  console.error(`FAIL | check-genesis-spatial-distance-calibration | count=${failures.length}`);
  failures.forEach((failure) => console.error(`- ${failure}`));
  process.exitCode = 1;
} else {
  console.log("PASS | check-genesis-spatial-distance-calibration");
}
