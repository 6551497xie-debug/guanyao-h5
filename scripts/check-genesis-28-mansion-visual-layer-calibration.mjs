import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import process from "node:process";
import { build } from "esbuild";

const rootDir = process.cwd();
const files = Object.freeze({
  type: "src/types/genesisTwentyEightMansionVisualLayerCalibration.ts",
  service: "src/services/genesisTwentyEightMansionVisualLayerCalibration.ts",
  renderer: "src/renderers/genesisWebGLRendererCore.ts",
  timeline: "src/services/genesisProductionTimelineOrchestrator.ts",
  engine: "src/services/guanyaoStarbeastEngineService.ts",
  packageManifest: "package.json",
});

const failures = [];
const assertEqual = (name, actual, expected) => {
  if (actual !== expected) failures.push(`${name} expected=${String(expected)} actual=${String(actual)}`);
  else console.log(`PASS | ${name}`);
};
const assertIncludes = (name, source, marker) => {
  if (!source.includes(marker)) failures.push(`${name} missing=${marker}`);
  else console.log(`PASS | ${name}`);
};
const assertExcludes = (name, source, marker) => {
  if (source.includes(marker)) failures.push(`${name} forbidden=${marker}`);
  else console.log(`PASS | ${name}`);
};

const sources = Object.fromEntries(
  Object.entries(files).map(([name, relativePath]) => {
    const absolutePath = path.join(rootDir, relativePath);
    if (!fs.existsSync(absolutePath)) failures.push(`${name} missing=${relativePath}`);
    return [name, fs.existsSync(absolutePath) ? fs.readFileSync(absolutePath, "utf8") : ""];
  }),
);

if (failures.length === 0) {
  [
    '"HIDDEN"',
    '"MANSION_FIELD_VISIBLE"',
    '"BIRTH_MANSION_COORDINATE_REVEALED"',
    "starRiverShowsCompleteField: true",
    "timeResonanceKeepsFieldUnclaimed: true",
    "postTimeDeliveryRevealsBirthCoordinate: true",
    "noExistingCalibrationMutation: true",
  ].forEach((marker) => assertIncludes("visual calibration contract", sources.type, marker));

  [
    'activeVisualLayer === "STAR_RIVER"',
    'activeVisualLayer === "TIME_RESONANCE"',
    '"SYMBOL_REVEAL"',
    "coordinate.normalizedOrbitPosition",
    'visualRole:',
    "noEngineInvocation: true",
    "noTimelineMutation: true",
  ].forEach((marker) => assertIncludes("stage-safe calibration", sources.service, marker));

  [
    "calibrateGenesisTwentyEightMansionVisualLayer",
    "mansionCoordinateGroup",
    "neutralPositions",
    "birthMansionPointMaterial",
    "birthExpression.breathingPeriodSeconds",
  ].forEach((marker) => assertIncludes("renderer visual layer", sources.renderer, marker));
  [
    "resolveStarbeastFromBirthDate",
    "GUANYAO_TWENTY_EIGHT_MANSIONS",
    "mansionResult.mansion",
  ].forEach((marker) => assertExcludes("visual layer has no engine or mansion identity", sources.service, marker));
  assertExcludes(
    "timeline has no coordinate visual coupling",
    sources.timeline,
    "MANSION_COORDINATE",
  );
  assertExcludes(
    "engine has no visual calibration coupling",
    sources.engine,
    "MANSION_VISUAL_CALIBRATION",
  );

  const packageJson = JSON.parse(sources.packageManifest);
  assertEqual(
    "gate registered",
    packageJson.scripts?.["check-genesis-28-mansion-visual-layer-calibration"],
    "node scripts/check-genesis-28-mansion-visual-layer-calibration.mjs",
  );

  const tempDir = fs.mkdtempSync(
    path.join(os.tmpdir(), "guanyao-genesis-28-mansion-visual-layer-"),
  );
  try {
    const outfile = path.join(tempDir, "gate.mjs");
    await build({
      stdin: {
        contents: `
          export { calibrateGenesisTwentyEightMansionVisualLayer } from "./src/services/genesisTwentyEightMansionVisualLayerCalibration.ts";
          export { PERSONAL_STAR_BEAST_SCENE_MODEL_FIXTURE_CASE_A } from "./src/mocks/starBeastSceneModelFixtures.ts";
        `,
        resolveDir: rootDir,
        sourcefile: "genesis-28-mansion-visual-layer-gate-entry.ts",
        loader: "ts",
      },
      outfile,
      bundle: true,
      platform: "node",
      format: "esm",
      target: "node20",
      logLevel: "silent",
    });
    const runtime = await import(`file://${outfile}?t=${Date.now()}`);
    const projection =
      runtime.PERSONAL_STAR_BEAST_SCENE_MODEL_FIXTURE_CASE_A
        .visualSourceReference.projectionBundle
        .twentyEightMansionCoordinateProjection;
    const calibrate = (activeVisualLayer) =>
      runtime.calibrateGenesisTwentyEightMansionVisualLayer({
        coordinateProjection: projection,
        activeVisualLayer,
      }).calibration;

    const moon = calibrate("MOON_ORIGIN");
    const star = calibrate("STAR_RIVER");
    const time = calibrate("TIME_RESONANCE");
    const symbol = calibrate("SYMBOL_REVEAL");
    assertEqual("moon keeps mansion field hidden", moon.visibility, "HIDDEN");
    assertEqual("star river shows complete field", star.visibility, "MANSION_FIELD_VISIBLE");
    assertEqual("time keeps field unclaimed", time.visibility, "MANSION_FIELD_VISIBLE");
    assertEqual("post-delivery stage reveals birth coordinate", symbol.visibility, "BIRTH_MANSION_COORDINATE_REVEALED");
    assertEqual("star river keeps 28 coordinates", star.coordinates.length, 28);
    assertEqual(
      "star river has no claimed coordinate",
      star.coordinates.filter((coordinate) => coordinate.visualRole === "BIRTH_MANSION_COORDINATE").length,
      0,
    );
    assertEqual(
      "symbol has one birth coordinate",
      symbol.coordinates.filter((coordinate) => coordinate.visualRole === "BIRTH_MANSION_COORDINATE").length,
      1,
    );
    assertEqual(
      "birth coordinate follows source index",
      symbol.birthCoordinate.coordinateIndex,
      projection.birthMansion.mansionIndex,
    );
    assertEqual("calibration is frozen", Object.isFrozen(symbol), true);
  } finally {
    fs.rmSync(tempDir, { recursive: true, force: true });
  }
}

if (failures.length > 0) {
  console.error("\nGenesis 28 Mansion Visual Layer Calibration gate failed:");
  failures.forEach((failure) => console.error(`- ${failure}`));
  process.exit(1);
}

console.log("\nGenesis 28 Mansion Visual Layer Calibration gate passed.");
