import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import process from "node:process";
import { build } from "esbuild";

const rootDir = process.cwd();
const paths = Object.freeze({
  calibrationType:
    "src/types/genesisFourSymbolDirectionFieldVisualCalibration.ts",
  calibration:
    "src/services/genesisFourSymbolDirectionFieldVisualCalibration.ts",
  page: "src/pages/GenesisProductionExperiencePage.tsx",
  canvasHost: "src/components/GenesisProductionRendererCanvasHost.tsx",
  productionHost: "src/renderers/genesisProductionRendererHost.ts",
  rendererType: "src/types/genesisWebGLRendererCore.ts",
  renderer: "src/renderers/genesisWebGLRendererCore.ts",
  lifeDirectionProjection:
    "src/services/genesisFourSymbolLifeDirectionProjection.ts",
  engine: "src/services/guanyaoStarbeastEngineService.ts",
  archetype: "src/services/genesisLifeArchetypeProjection.ts",
  starBeast: "src/services/genesisStarBeastManifestationSource.ts",
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
  path.join(os.tmpdir(), "guanyao-genesis-direction-field-"),
);

try {
  [
    "GENESIS_FOUR_SYMBOL_DIRECTION_FIELD_VISUAL_CALIBRATION",
    '"AWAKENING"',
    "directionFieldExpression",
    "existingDirectionProjectionOnly: true",
    "noFourSymbolCalculation: true",
    "noAnimalGeometry: true",
    "noArchetypeInference: true",
    "noStarBeastAmplification: true",
  ].forEach((marker) =>
    assertIncludes("direction field calibration contract", source.calibrationType, marker),
  );
  [
    'activeVisualLayer === "HEXAGRAM_IMPRINT"',
    '东: Object.freeze({ axisX: 1, axisY: 0',
    '南: Object.freeze({ axisX: 0, axisY: -1',
    '西: Object.freeze({ axisX: -1, axisY: 0',
    '北: Object.freeze({ axisX: 0, axisY: 1',
    "生命力量正在东方展开。",
    "projection.mansionCoordinateReference.referenceId",
  ].forEach((marker) =>
    assertIncludes("existing direction projection drives calibration", source.calibration, marker),
  );
  [
    "resolveStarbeastFromBirthDate",
    "runFourSymbolEngine",
    "runMotherCodeLandingEngine",
    "Math.random",
    "Date.now",
  ].forEach((marker) =>
    assertExcludes("direction calibration has no Engine or fallback", source.calibration, marker),
  );

  [
    "calibrateGenesisFourSymbolDirectionField",
    ".fourSymbolLifeDirectionProjection",
    'session.currentStage !== "HEXAGRAM_IMPRINT"',
    '"COORDINATE_FOUND"',
    '"DIRECTION_AWAKENING"',
    "directionFieldCalibrationResult.calibration.responseMessage",
  ].forEach((marker) =>
    assertIncludes("production consumer activates direction awakening", source.page, marker),
  );
  [
    "fourSymbolDirectionFieldVisualCalibration",
    'data-genesis-direction-field-phase',
  ].forEach((marker) =>
    assertIncludes("canvas host carries visual calibration only", source.canvasHost, marker),
  );
  [
    "DIRECTION_FIELD_CALIBRATION_INVALID",
    "directionFieldCalibration.sourceReferenceId",
    "directionFieldCalibration.mansionCoordinateReferenceId",
    "noStarBeastAmplification",
  ].forEach((marker) =>
    assertIncludes("production host validates direction continuity", source.productionHost, marker),
  );
  assertExcludes(
    "production host does not consume Four Symbol identity source",
    source.productionHost,
    "fourSymbolLifeDirectionProjection",
  );
  [
    "directionFieldGroup",
    "directionFieldMaterial",
    "directionFieldExpression.axisX",
    "directionFieldExpression.axisY",
    "new LineSegments",
  ].forEach((marker) =>
    assertIncludes("renderer realizes direction as field", source.renderer, marker),
  );
  assertExcludes(
    "renderer remains Four Symbol identity blind",
    source.renderer,
    "fourSymbolLifeDirectionProjection",
  );
  assertExcludes(
    "renderer has no animal asset",
    source.renderer,
    "青龙",
  );
  assertExcludes(
    "renderer has no animal asset",
    source.renderer,
    "朱雀",
  );
  assertExcludes(
    "life direction projection stays free of visual field parameters",
    source.lifeDirectionProjection,
    "directionFieldExpression",
  );
  assertExcludes(
    "Engine stays free of visual direction field",
    source.engine,
    "DirectionFieldVisualCalibration",
  );
  assertExcludes(
    "archetype projection is not changed by direction field",
    source.archetype,
    "DirectionFieldVisualCalibration",
  );
  assertExcludes(
    "StarBeast source is not amplified by direction field",
    source.starBeast,
    "DirectionFieldVisualCalibration",
  );

  const packageJson = JSON.parse(source.packageManifest);
  assertEqual(
    "direction field visual realization gate is registered",
    packageJson.scripts?.[
      "check-genesis-four-symbol-direction-field-visual-realization"
    ],
    "node scripts/check-genesis-four-symbol-direction-field-visual-realization.mjs",
  );

  const outPath = path.join(tempDir, "direction-field-gate.mjs");
  await build({
    stdin: {
      contents: `export { calibrateGenesisFourSymbolDirectionField } from "./src/services/genesisFourSymbolDirectionFieldVisualCalibration.ts";`,
      resolveDir: rootDir,
      sourcefile: "genesis-direction-field-gate-entry.ts",
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
  const createProjection = (direction, lifeDirection) =>
    Object.freeze({
      semanticRole: "GENESIS_FOUR_SYMBOL_LIFE_DIRECTION_PROJECTION",
      sourceReferenceId: "launch:real-user:direction-field",
      mansionCoordinateReference: Object.freeze({
        referenceType: "GENESIS_MANSION_COORDINATE_SLOT",
        referenceId: "mansion-coordinate:8",
        coordinateIndex: 8,
        coordinateOrdinal: 9,
      }),
      fourSymbol: "青龙",
      direction,
      lifeDirection,
      provenance: Object.freeze({
        sourceKind: "REAL_ENGINE_RESULT",
        sourceReferenceId: "launch:real-user:direction-field",
        sourceEngine: "guanyao_starbeast_engine",
        sourceProtocolVersion: "GUANYAO_LUNAR_MANSION_V1",
        mansionCoordinateReferenceId: "mansion-coordinate:8",
        fourSymbolResultReferenceType:
          "STAR_BEAST_GENESIS_FOUR_SYMBOL_ENGINE_RESULT",
      }),
    });

  const expected = [
    ["东", "生发", 1, 0],
    ["南", "显化", 0, -1],
    ["西", "行动", -1, 0],
    ["北", "沉潜", 0, 1],
  ];
  for (const [direction, lifeDirection, axisX, axisY] of expected) {
    const result = runtime.calibrateGenesisFourSymbolDirectionField({
      lifeDirectionProjection: createProjection(direction, lifeDirection),
      activeVisualLayer: "HEXAGRAM_IMPRINT",
    });
    assertEqual(`${direction} direction calibration is available`, result.status, "AVAILABLE");
    assertEqual(`${direction} awakens at Hexagram layer`, result.calibration.phase, "AWAKENING");
    assertEqual(`${direction} axis x follows direction`, result.calibration.directionFieldExpression.axisX, axisX);
    assertEqual(`${direction} axis y follows direction`, result.calibration.directionFieldExpression.axisY, axisY);
    assertEqual(`${direction} keeps real provenance`, result.calibration.provenance.sourceKind, "REAL_ENGINE_RESULT");
    assertEqual(`${direction} calibration is immutable`, Object.isFrozen(result.calibration), true);
  }
  const hidden = runtime.calibrateGenesisFourSymbolDirectionField({
    lifeDirectionProjection: createProjection("东", "生发"),
    activeVisualLayer: "SYMBOL_REVEAL",
  });
  assertEqual("direction stays hidden before Coordinate Found", hidden.calibration.phase, "HIDDEN");
  assertEqual("direction has no field opacity before awakening", hidden.calibration.directionFieldExpression.lineOpacity, 0);
  assertEqual(
    "missing projection cannot produce default direction",
    runtime.calibrateGenesisFourSymbolDirectionField({
      lifeDirectionProjection: null,
      activeVisualLayer: "HEXAGRAM_IMPRINT",
    }).status,
    "UNAVAILABLE",
  );

  console.log("\n[GENESIS FOUR SYMBOL DIRECTION FIELD VISUAL REALIZATION] PASS");
} catch (error) {
  console.error("[GENESIS FOUR SYMBOL DIRECTION FIELD VISUAL REALIZATION] FAIL");
  console.error(error instanceof Error ? error.message : error);
  process.exitCode = 1;
} finally {
  fs.rmSync(tempDir, { recursive: true, force: true });
}
