import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import process from "node:process";
import { build } from "esbuild";

const rootDir = process.cwd();
const paths = Object.freeze({
  calibrationType:
    "src/types/genesisTwentyEightMansionVisualLayerCalibration.ts",
  calibration:
    "src/services/genesisTwentyEightMansionVisualLayerCalibration.ts",
  page: "src/pages/GenesisProductionExperiencePage.tsx",
  rendererType: "src/types/genesisWebGLRendererCore.ts",
  renderer: "src/renderers/genesisWebGLRendererCore.ts",
  runtime: "src/services/genesisProductionRuntimeConsumer.ts",
  frozenTiming: "src/services/genesisFrozenTimelineTiming.ts",
  sourceAdapter: "src/services/realLifeVisualSourceAdapter.ts",
  starBeastSource: "src/services/genesisStarBeastManifestationSource.ts",
  engine: "src/services/guanyaoStarbeastEngineService.ts",
  packageManifest: "package.json",
});

const source = Object.fromEntries(
  Object.entries(paths).map(([name, file]) => [
    name,
    fs.readFileSync(path.join(rootDir, file), "utf8"),
  ]),
);

const assertEqual = (name, actual, expected) => {
  if (actual !== expected) {
    throw new Error(
      `${name} expected=${String(expected)} actual=${String(actual)}`,
    );
  }
  console.log(`PASS | ${name}`);
};

const assertIncludes = (name, text, marker) => {
  if (!text.includes(marker)) throw new Error(`${name} missing=${marker}`);
  console.log(`PASS | ${name}`);
};

const assertExcludes = (name, text, marker) => {
  if (text.includes(marker)) throw new Error(`${name} forbidden=${marker}`);
  console.log(`PASS | ${name}`);
};

const tempDir = fs.mkdtempSync(
  path.join(os.tmpdir(), "guanyao-genesis-coordinate-seeking-"),
);

try {
  [
    '"UNCLAIMED_FIELD"',
    '"SEEKING_TO_FOUND"',
    '"FOUND"',
    "coordinateFormationExpression",
    "existingCoordinatesMoveToSourcePositions: true",
    "coordinateSeekingMovesExistingPoints: true",
    "coordinateFoundRevealsSourceBirthCoordinate: true",
    "noStarBeastAmplification: true",
  ].forEach((marker) =>
    assertIncludes("coordinate seeking calibration contract", source.calibrationType, marker),
  );
  [
    "GENESIS_COORDINATE_SEEKING_VISUAL_SETTLE_MS",
    "coordinateSeekingSettleMilliseconds: 1100",
    'activeVisualLayer === "TIME_RESONANCE"',
    'activeVisualLayer === "SYMBOL_REVEAL"',
    'return "SEEKING_TO_FOUND" as const',
    "existingCoordinatesMoveToSourcePositions: true",
  ].forEach((marker) =>
    assertIncludes("existing 28 Mansion layer owns seeking calibration", source.calibration, marker),
  );
  [
    "resolveStarbeastFromBirthDate",
    "runFourSymbolEngine",
    "runMotherCodeLandingEngine",
    "Math.random",
    "Date.now",
  ].forEach((marker) =>
    assertExcludes("coordinate calibration has no Engine or fallback", source.calibration, marker),
  );

  [
    'manifestationExperienceResult.session.currentState !==',
    '"COORDINATE_SEEKING"',
    "GENESIS_COORDINATE_SEEKING_VISUAL_SETTLE_MS",
    "const foundResult = advanceGenesisManifestationExperienceState",
    "你的时间找到了位置。",
  ].forEach((marker) =>
    assertIncludes("production experience reaches Coordinate Found", source.page, marker),
  );

  [
    "initialAngularOffsetRadians",
    "mansionCoordinateGroup.rotation.z",
    "mansionCoordinateGroup.scale.set",
    "mansionOrbitMaterial",
    "birthCoordinateAxisMaterial",
    "coordinateFormationProgress",
    "birthRevealProgress",
  ].forEach((marker) =>
    assertIncludes("existing Renderer Core realizes calibrated coordinates", source.renderer, marker),
  );
  assertExcludes(
    "Renderer input shape remains experience-state free",
    source.rendererType,
    "GenesisManifestationExperienceState",
  );
  assertExcludes(
    "Runtime remains free of coordinate visual timing",
    source.runtime,
    "GENESIS_COORDINATE_SEEKING_VISUAL_SETTLE_MS",
  );
  assertIncludes(
    "frozen Symbol Reveal stage duration is unchanged",
    source.frozenTiming,
    "SYMBOL_REVEAL: 1800",
  );
  assertExcludes(
    "Source Adapter remains free of coordinate visual timing",
    source.sourceAdapter,
    "GENESIS_COORDINATE_SEEKING_VISUAL_SETTLE_MS",
  );
  assertExcludes(
    "StarBeast source is not amplified by coordinate calibration",
    source.starBeastSource,
    "coordinateFormationExpression",
  );
  assertExcludes(
    "Engine remains free of coordinate visual calibration",
    source.engine,
    "SEEKING_TO_FOUND",
  );

  const packageJson = JSON.parse(source.packageManifest);
  assertEqual(
    "coordinate seeking visual gate is registered",
    packageJson.scripts?.["check-genesis-coordinate-seeking-visual-calibration"],
    "node scripts/check-genesis-coordinate-seeking-visual-calibration.mjs",
  );

  const outPath = path.join(tempDir, "coordinate-seeking-gate.mjs");
  await build({
    stdin: {
      contents: `
        export { calibrateGenesisTwentyEightMansionVisualLayer } from "./src/services/genesisTwentyEightMansionVisualLayerCalibration.ts";
        export { PERSONAL_STAR_BEAST_SCENE_MODEL_FIXTURE_CASE_A } from "./src/mocks/starBeastSceneModelFixtures.ts";
      `,
      resolveDir: rootDir,
      sourcefile: "genesis-coordinate-seeking-visual-gate-entry.ts",
      loader: "ts",
    },
    outfile: outPath,
    bundle: true,
    platform: "node",
    format: "esm",
    target: "node20",
    logLevel: "silent",
  });
  const runtime = await import(`file://${outPath}?t=${Date.now()}`);
  const projection =
    runtime.PERSONAL_STAR_BEAST_SCENE_MODEL_FIXTURE_CASE_A
      .visualSourceReference.projectionBundle
      .twentyEightMansionCoordinateProjection;
  const calibrate = (activeVisualLayer) =>
    runtime.calibrateGenesisTwentyEightMansionVisualLayer({
      coordinateProjection: projection,
      activeVisualLayer,
    }).calibration;

  const timeAccepted = calibrate("TIME_RESONANCE");
  const coordinateSeeking = calibrate("SYMBOL_REVEAL");
  const coordinateFound = calibrate("HEXAGRAM_IMPRINT");
  assertEqual(
    "Time Accepted keeps coordinate unclaimed",
    timeAccepted.coordinateFormationExpression.phase,
    "UNCLAIMED_FIELD",
  );
  assertEqual(
    "Coordinate Seeking moves toward source positions",
    coordinateSeeking.coordinateFormationExpression.phase,
    "SEEKING_TO_FOUND",
  );
  assertEqual(
    "Coordinate Seeking settles before frozen stage completes",
    coordinateSeeking.coordinateFormationExpression.settleDurationMilliseconds < 1800,
    true,
  );
  assertEqual(
    "Coordinate Found keeps the source position",
    coordinateFound.coordinateFormationExpression.phase,
    "FOUND",
  );
  assertEqual(
    "Coordinate Found reveals exactly one birth coordinate",
    coordinateFound.coordinates.filter(
      (coordinate) => coordinate.visualRole === "BIRTH_MANSION_COORDINATE",
    ).length,
    1,
  );
  assertEqual(
    "visual calibration is immutable",
    Object.isFrozen(coordinateSeeking.coordinateFormationExpression),
    true,
  );

  console.log("\n[GENESIS COORDINATE SEEKING VISUAL CALIBRATION] PASS");
} catch (error) {
  console.error("[GENESIS COORDINATE SEEKING VISUAL CALIBRATION] FAIL");
  console.error(error instanceof Error ? error.message : error);
  process.exitCode = 1;
} finally {
  fs.rmSync(tempDir, { recursive: true, force: true });
}
