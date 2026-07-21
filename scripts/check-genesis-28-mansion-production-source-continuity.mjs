import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import process from "node:process";
import { build } from "esbuild";

const rootDir = process.cwd();
const paths = Object.freeze({
  alignment: "docs/GUANYAO_WORLD_MODEL_ALIGNMENT_P0.md",
  adapter: "src/services/realLifeVisualSourceAdapter.ts",
  projection: "src/services/genesisTwentyEightMansionCoordinateProjection.ts",
  calibration: "src/services/genesisTwentyEightMansionVisualLayerCalibration.ts",
  host: "src/renderers/genesisProductionRendererHost.ts",
  renderer: "src/renderers/genesisWebGLRendererCore.ts",
  engine: "src/services/guanyaoStarbeastEngineService.ts",
  packageManifest: "package.json",
});

const source = Object.fromEntries(
  Object.entries(paths).map(([name, file]) => [
    name,
    fs.readFileSync(path.join(rootDir, file), "utf8"),
  ]),
);
const tempDir = fs.mkdtempSync(
  path.join(os.tmpdir(), "guanyao-genesis-28-mansion-production-continuity-"),
);

const assertEqual = (name, actual, expected) => {
  if (actual !== expected) {
    throw new Error(`${name} expected=${String(expected)} actual=${String(actual)}`);
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

const createScene = (runtime, consumerSource, calibrationBundle) =>
  runtime.projectPersonalStarBeastRenderPlanToWebGLScene(
    consumerSource.renderPlanResult.plan,
    null,
    null,
    null,
    null,
    null,
    null,
    calibrationBundle.genesisVisualRealization,
    calibrationBundle.genesisPerspectiveCalibration,
    calibrationBundle.genesisPresenceRecognitionCalibration,
    calibrationBundle.genesisSpatialDistanceCalibration,
    consumerSource.projectionBundle.twentyEightMansionCoordinateProjection,
  );

const advance = (runtime, session, trigger, expectedStage) => {
  const result = runtime.advanceGenesisProductionRuntime({ session, trigger });
  assertEqual(`advance to ${expectedStage}`, result.status, "READY");
  assertEqual(`stage is ${expectedStage}`, result.session.currentStage, expectedStage);
  return result.session;
};

try {
  [
    "既有 Mansion Result",
    "真实 Life Source 引用",
    "Genesis Visual Projection",
    "Renderer 显化",
    "真实模式必须携带 Mansion provenance",
  ].forEach((marker) => assertIncludes("world model alignment", source.alignment, marker));

  [
    "projectGenesisTwentyEightMansionCoordinates",
    "mansionResultReference:",
    "const sourceReferenceId = input.sourceReferenceId.trim();",
  ].forEach((marker) => assertIncludes("adapter projects existing mansion result", source.adapter, marker));
  [
    "existingMansionResultOnly: true",
    "noMansionCalculation: true",
    "noIdentitySelection: true",
    "noFallback: true",
  ].forEach((marker) => assertIncludes("coordinate projection boundary", source.projection, marker));
  [
    "starRiverShowsCompleteField: true",
    "timeResonanceKeepsFieldUnclaimed: true",
    "postTimeDeliveryRevealsBirthCoordinate: true",
  ].forEach((marker) => assertIncludes("visual reveal boundary", source.calibration, marker));
  [
    'sourceKind !== "REAL_ENGINE_RESULT"',
    "mansionCoordinateProjection.sourceReferenceId",
    'blocked("MANSION_COORDINATE_SOURCE_INVALID")',
  ].forEach((marker) => assertIncludes("production host guards real mansion source", source.host, marker));
  [
    "calibrateGenesisTwentyEightMansionVisualLayer",
    "mansionCoordinateVisualLayer",
    "birthMansionPointMaterial",
  ].forEach((marker) => assertIncludes("renderer consumes calibrated layer", source.renderer, marker));
  [
    "resolveStarbeastFromBirthDate",
    "GUANYAO_TWENTY_EIGHT_MANSIONS",
  ].forEach((marker) => {
    assertExcludes("projection does not call engine", source.projection, marker);
    assertExcludes("visual calibration does not call engine", source.calibration, marker);
    assertExcludes("renderer does not call engine", source.renderer, marker);
  });
  assertExcludes(
    "engine has no production visualization dependency",
    source.engine,
    "genesisTwentyEightMansionVisualLayerCalibration",
  );

  const packageJson = JSON.parse(source.packageManifest);
  assertEqual(
    "continuity gate is registered",
    packageJson.scripts?.["check-genesis-28-mansion-production-source-continuity"],
    "node scripts/check-genesis-28-mansion-production-source-continuity.mjs",
  );

  const entryPath = path.join(tempDir, "continuity-entry.ts");
  const outPath = path.join(tempDir, "continuity-entry.mjs");
  fs.writeFileSync(
    entryPath,
    [
      "src/services/guanyaoLaunchOriginMotherInputAdapter.ts",
      "src/services/launchLifeSourceSession.ts",
      "src/services/launchLifeVisualSourceResolver.ts",
      "src/services/realUserGenesisVisualSourceContext.ts",
      "src/services/genesisVisualConsumerSourceResolver.ts",
      "src/services/genesisProductionRouteAuthorization.ts",
      "src/services/genesisProductionRuntimeConsumer.ts",
      "src/services/genesisProductionVisualCalibrationBridge.ts",
      "src/renderers/genesisProductionRendererHost.ts",
      "src/renderers/genesisWebGLRendererCore.ts",
    ]
      .map((file) => `export * from ${JSON.stringify(path.join(rootDir, file))};`)
      .join("\n"),
  );
  await build({
    entryPoints: [entryPath],
    outfile: outPath,
    bundle: true,
    platform: "node",
    format: "esm",
    target: "node20",
    logLevel: "silent",
  });
  const runtime = await import(`file://${outPath}?t=${Date.now()}`);

  runtime.clearRealUserGenesisVisualSourceContext();
  const sourceReferenceId = "launch:1995-06-02:酉时:广东:广州";
  const originResults = runtime.resolveLaunchOriginMotherSourceResults({
    birth: { year: 1995, month: 6, day: 2, hourBranch: "酉时" },
    periodIndex: 0,
    geo: { province: "广东", city: "广州" },
    starbeast: { nodeCount: 28, primaryNodeIndex: 0, originLightTrace: "28光兽入口" },
  });
  const sessionResult = runtime.createLaunchLifeSourceSession({
    sourceReferenceId,
    birthCoordinate: { year: 1995, month: 6, day: 2, hourBranch: "酉时" },
    ...originResults,
  });
  assertEqual("real life session is available", sessionResult.status, "AVAILABLE");

  const visualResult = runtime.resolveLaunchLifeVisualSource(sessionResult.session);
  assertEqual("real visual source is available", visualResult.status, "AVAILABLE");
  const projection =
    visualResult.visualSource.projectionBundle.twentyEightMansionCoordinateProjection;
  assertEqual("projection uses real engine result", projection.sourceKind, "REAL_ENGINE_RESULT");
  assertEqual("projection reference follows session", projection.sourceReferenceId, sourceReferenceId);
  assertEqual("projection contains 28 coordinates", projection.coordinateCount, 28);
  assertEqual("projection has exactly one birth coordinate", projection.coordinates.filter((coordinate) => coordinate.isBirthMansionCoordinate).length, 1);
  assertEqual("birth mansion follows existing engine result", projection.birthMansion.mansion, sessionResult.session.starbeastDerivationResult.mansion);
  assertEqual("projection forbids fallback", projection.noFallback, true);

  const activation = runtime.activateRealUserGenesisVisualSourceContext({
    lifeSourceSession: sessionResult.session,
    visualSourceAdapterInput: visualResult.input,
    visualSource: visualResult.visualSource,
  });
  assertEqual("real visual context is available", activation.status, "AVAILABLE");
  assertEqual("context reference remains continuous", activation.context.sourceReferenceId, sourceReferenceId);

  const consumerResult = runtime.resolveGenesisVisualConsumerSource({
    sourceExperienceMode: "REAL_USER_EXPERIENCE",
    fixtureCaseIndex: 1,
  });
  assertEqual("real consumer is ready", consumerResult.status, "READY");
  assertEqual("real consumer ignores fixture selector", consumerResult.consumerSource.sourceProvenance, "REAL_USER_SESSION");
  assertEqual("consumer receives identical projection", consumerResult.consumerSource.projectionBundle.twentyEightMansionCoordinateProjection, projection);

  const routeAuthorization = runtime.authorizeGenesisProductionRoute({
    routeTarget: "/genesis",
    sourceReferenceId,
  });
  assertEqual("production route is authorized", routeAuthorization.status, "READY");
  assertEqual("route reference remains continuous", routeAuthorization.sourceReferenceId, sourceReferenceId);
  const fixtureAttempt = runtime.authorizeGenesisProductionRoute({
    routeTarget: "/genesis",
    sourceReferenceId: "fixture:case-a",
  });
  assertEqual("fixture cannot enter production route", fixtureAttempt.status, "BLOCKED");

  const initialized = runtime.initializeGenesisProductionRuntime({ routeAuthorization });
  assertEqual("production runtime initializes", initialized.status, "READY");
  let runtimeSession = initialized.session;
  runtimeSession = advance(runtime, runtimeSession, "AUTO_ADVANCE", "STAR_RIVER");

  const starCalibration = runtime.bridgeGenesisProductionRuntimeToVisualCalibration(runtimeSession);
  assertEqual("star calibration is ready", starCalibration.status, "READY");
  const starScene = createScene(runtime, consumerResult.consumerSource, starCalibration.bundle);
  assertEqual("star river shows complete mansion field", starScene.mansionCoordinateVisualLayer.visibility, "MANSION_FIELD_VISIBLE");
  assertEqual("star river keeps field unclaimed", starScene.mansionCoordinateVisualLayer.coordinates.filter((coordinate) => coordinate.visualRole === "BIRTH_MANSION_COORDINATE").length, 0);

  runtimeSession = advance(runtime, runtimeSession, "AUTO_ADVANCE", "TIME_RESONANCE");
  const timeCalibration = runtime.bridgeGenesisProductionRuntimeToVisualCalibration(runtimeSession);
  const timeScene = createScene(runtime, consumerResult.consumerSource, timeCalibration.bundle);
  assertEqual("time keeps mansion field visible", timeScene.mansionCoordinateVisualLayer.visibility, "MANSION_FIELD_VISIBLE");
  assertEqual("time does not claim birth coordinate early", timeScene.mansionCoordinateVisualLayer.coordinates.filter((coordinate) => coordinate.visualRole === "BIRTH_MANSION_COORDINATE").length, 0);

  runtimeSession = advance(runtime, runtimeSession, "TIME_DELIVERY", "SYMBOL_REVEAL");
  const symbolCalibration = runtime.bridgeGenesisProductionRuntimeToVisualCalibration(runtimeSession);
  const symbolScene = createScene(runtime, consumerResult.consumerSource, symbolCalibration.bundle);
  assertEqual("post delivery reveals birth coordinate", symbolScene.mansionCoordinateVisualLayer.visibility, "BIRTH_MANSION_COORDINATE_REVEALED");
  assertEqual("post delivery reveals exactly one coordinate", symbolScene.mansionCoordinateVisualLayer.coordinates.filter((coordinate) => coordinate.visualRole === "BIRTH_MANSION_COORDINATE").length, 1);
  assertEqual("revealed coordinate follows engine mansion index", symbolScene.mansionCoordinateVisualLayer.birthCoordinate.coordinateIndex, projection.birthMansion.mansionIndex);

  const hostResult = runtime.createGenesisProductionRendererHost({
    canvas: null,
    width: 1280,
    height: 720,
    pixelRatio: 1,
    reducedMotion: false,
    authorization: routeAuthorization.productionRendererAuthorization,
    consumerSourceResult: consumerResult,
    ...symbolCalibration.bundle,
  });
  assertEqual("real mansion source reaches production host", hostResult.status, "FALLBACK_REQUIRED");
  assertEqual("host reference remains continuous", hostResult.sourceReferenceId, sourceReferenceId);
  assertEqual("null canvas preserves semantic fallback", hostResult.fallback.reason, "CANVAS_REQUIRED");
  assertEqual("host scene keeps 28 mansion coordinates", hostResult.fallback.sceneProjection.mansionCoordinateField.coordinateCount, 28);
  assertEqual("host scene reveals source mansion coordinate", hostResult.fallback.sceneProjection.mansionCoordinateVisualLayer.birthCoordinate.coordinateIndex, projection.birthMansion.mansionIndex);

  console.log("\n[GENESIS 28 MANSION PRODUCTION SOURCE CONTINUITY] PASS");
} catch (error) {
  console.error("[GENESIS 28 MANSION PRODUCTION SOURCE CONTINUITY] FAIL");
  console.error(error instanceof Error ? error.message : error);
  process.exitCode = 1;
} finally {
  fs.rmSync(tempDir, { recursive: true, force: true });
}
