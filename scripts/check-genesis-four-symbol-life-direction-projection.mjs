import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import process from "node:process";
import { build } from "esbuild";

const rootDir = process.cwd();
const paths = Object.freeze({
  alignment: "docs/GUANYAO_WORLD_MODEL_ALIGNMENT_P0.md",
  checkSpec: "docs/GUANYAO_WORLD_MODEL_ALIGNMENT_CHECK_SPEC.md",
  type: "src/types/genesisFourSymbolLifeDirectionProjection.ts",
  service: "src/services/genesisFourSymbolLifeDirectionProjection.ts",
  adapter: "src/services/realLifeVisualSourceAdapter.ts",
  bundleType: "src/types/realLifeVisualSourceAdapter.ts",
  consumer: "src/services/realGenesisVisualConsumerSource.ts",
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
  path.join(os.tmpdir(), "guanyao-genesis-four-symbol-life-direction-"),
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

try {
  [
    "既有 Mansion Result",
    "四象",
    "坐标映射属于 Visual Projection / Adapter 边界",
  ].forEach((marker) => assertIncludes("world model alignment", source.alignment, marker));
  [
    "二十八宿坐标显化专项检查",
    "Projection 只增加来源到视觉的映射",
    "真实用户模式携带 Mansion provenance",
  ].forEach((marker) => assertIncludes("alignment check specification", source.checkSpec, marker));

  [
    "GenesisFourSymbolLifeDirectionProjection",
    "mansionCoordinateReference",
    "fourSymbol",
    "direction",
    "lifeDirection",
    "provenance",
    "noFourSymbolCalculation: true",
    "noMansionCalculation: true",
  ].forEach((marker) => assertIncludes("direction projection contract", source.type, marker));
  [
    "DIRECTION_BY_SYMBOL",
    "青龙: Object.freeze({ direction: \"东\", lifeDirection: \"生发\" })",
    "朱雀: Object.freeze({ direction: \"南\", lifeDirection: \"显化\" })",
    "白虎: Object.freeze({ direction: \"西\", lifeDirection: \"行动\" })",
    "玄武: Object.freeze({ direction: \"北\", lifeDirection: \"沉潜\" })",
    "mansionProjection.birthMansion.mansionIndex",
    "result.mansionIndex !== mansionProjection.birthMansion.mansionIndex",
    "noFallback: true",
  ].forEach((marker) => assertIncludes("direction projection service", source.service, marker));
  [
    "projectGenesisFourSymbolLifeDirection",
    "fourSymbolLifeDirectionProjection:",
    "FOUR_SYMBOL_LIFE_DIRECTION_PROJECTION_FAILED",
  ].forEach((marker) => assertIncludes("adapter carries direction projection", source.adapter, marker));
  assertIncludes(
    "projection bundle carries direction projection",
    source.bundleType,
    "fourSymbolLifeDirectionProjection: GenesisFourSymbolLifeDirectionProjection",
  );
  assertIncludes("real consumer carries projection bundle", source.consumer, "projectionBundle: context.visualSource.projectionBundle");
  assertExcludes("production host input remains unchanged", source.host, "fourSymbolLifeDirectionProjection");
  assertExcludes("renderer input remains unchanged", source.renderer, "fourSymbolLifeDirectionProjection");
  [
    "resolveStarbeastFromBirthDate",
    "runFourSymbolEngine",
    "guanyaoStarbeastEngineService",
  ].forEach((marker) => {
    assertExcludes("direction projection has no engine call", source.service, marker);
    assertExcludes("direction projection has no engine call", source.type, marker);
  });
  assertExcludes("engine has no direction projection dependency", source.engine, "genesisFourSymbolLifeDirectionProjection");

  const packageJson = JSON.parse(source.packageManifest);
  assertEqual(
    "direction projection gate is registered",
    packageJson.scripts?.["check-genesis-four-symbol-life-direction-projection"],
    "node scripts/check-genesis-four-symbol-life-direction-projection.mjs",
  );

  const entryPath = path.join(tempDir, "direction-entry.ts");
  const outPath = path.join(tempDir, "direction-entry.mjs");
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
      "src/services/genesisFourSymbolLifeDirectionProjection.ts",
      "src/services/fixtureGenesisVisualConsumerSource.ts",
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
  const projection = visualResult.visualSource.projectionBundle.fourSymbolLifeDirectionProjection;
  assertEqual("direction projection is available", projection.semanticRole, "GENESIS_FOUR_SYMBOL_LIFE_DIRECTION_PROJECTION");
  assertEqual("direction source reference follows session", projection.sourceReferenceId, sourceReferenceId);
  assertEqual("direction source kind is real", projection.provenance.sourceKind, "REAL_ENGINE_RESULT");
  assertEqual("direction mansion coordinate is continuous", projection.mansionCoordinateReference.referenceId, visualResult.visualSource.projectionBundle.twentyEightMansionCoordinateProjection.birthMansion.coordinateReferenceId);
  assertEqual("direction four symbol follows engine result", projection.fourSymbol, sessionResult.session.starbeastDerivationResult.fourSymbol);
  assertEqual("direction follows engine result", projection.direction, sessionResult.session.starbeastDerivationResult.direction);
  const expectedLifeDirectionBySymbol = {
    青龙: "生发",
    朱雀: "显化",
    白虎: "行动",
    玄武: "沉潜",
  };
  assertEqual(
    "four symbol maps to life direction",
    projection.lifeDirection,
    expectedLifeDirectionBySymbol[projection.fourSymbol],
  );
  assertEqual("direction projection forbids fallback", projection.noFallback, true);
  assertEqual("direction projection forbids engine invocation", projection.noEngineInvocation, true);

  const activation = runtime.activateRealUserGenesisVisualSourceContext({
    lifeSourceSession: sessionResult.session,
    visualSourceAdapterInput: visualResult.input,
    visualSource: visualResult.visualSource,
  });
  assertEqual("real visual context is available", activation.status, "AVAILABLE");
  const consumerResult = runtime.resolveGenesisVisualConsumerSource({
    sourceExperienceMode: "REAL_USER_EXPERIENCE",
    fixtureCaseIndex: 1,
  });
  assertEqual("real consumer is ready", consumerResult.status, "READY");
  assertEqual("consumer receives direction projection", consumerResult.consumerSource.projectionBundle.fourSymbolLifeDirectionProjection, projection);
  assertEqual("real consumer remains real", consumerResult.consumerSource.sourceProvenance, "REAL_USER_SESSION");

  const routeAuthorization = runtime.authorizeGenesisProductionRoute({
    routeTarget: "/genesis",
    sourceReferenceId,
  });
  assertEqual("production route remains authorized", routeAuthorization.status, "READY");
  const fixtureResult = runtime.resolveFixtureGenesisVisualConsumerSource(0);
  assertEqual("fixture consumer remains explicit", fixtureResult.consumerSource.sourceExperienceMode, "FIXTURE_PREVIEW_ONLY");
  assertEqual("fixture direction projection remains available", fixtureResult.consumerSource.projectionBundle.fourSymbolLifeDirectionProjection.noFallback, true);
  assertEqual("fixture direction source remains isolated", fixtureResult.consumerSource.projectionBundle.fourSymbolLifeDirectionProjection.provenance.sourceKind, "ISOLATED_FIXTURE_ENGINE_RESULT");
  assertEqual("fixture cannot become real consumer", fixtureResult.consumerSource.sourceProvenance, "FIXTURE_CASE_A");

  console.log("\n[GENESIS FOUR SYMBOL LIFE DIRECTION PROJECTION] PASS");
} catch (error) {
  console.error("[GENESIS FOUR SYMBOL LIFE DIRECTION PROJECTION] FAIL");
  console.error(error instanceof Error ? error.message : error);
  process.exitCode = 1;
} finally {
  fs.rmSync(tempDir, { recursive: true, force: true });
}
