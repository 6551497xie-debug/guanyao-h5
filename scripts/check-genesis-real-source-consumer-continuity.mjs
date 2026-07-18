import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import process from "node:process";
import { build } from "esbuild";

const rootDir = process.cwd();
const paths = {
  type: "src/types/genesisVisualConsumerSource.ts",
  real: "src/services/realGenesisVisualConsumerSource.ts",
  fixture: "src/services/fixtureGenesisVisualConsumerSource.ts",
  resolver: "src/services/genesisVisualConsumerSourceResolver.ts",
  harness: "src/pages/PersonalStarBeastWebGLPrototypeHarness.tsx",
  previewRoutes: "src/router/previewRoutes.ts",
  renderer: "src/prototypes/isolatedWebGLRendererPrototype.ts",
};
const source = Object.fromEntries(
  Object.entries(paths).map(([name, file]) => [
    name,
    fs.readFileSync(path.join(rootDir, file), "utf8"),
  ]),
);
const tempDir = fs.mkdtempSync(
  path.join(os.tmpdir(), "guanyao-genesis-real-consumer-"),
);

const assertEqual = (name, actual, expected) => {
  if (actual !== expected) {
    throw new Error(`${name} expected=${expected} actual=${actual}`);
  }
  console.log(`PASS | ${name}`);
};
const assertIncludes = (name, text, marker) => {
  if (!text.includes(marker)) throw new Error(`${name} missing=${marker}`);
  console.log(`PASS | ${name}`);
};
const assertExcludes = (name, text, marker) => {
  if (text.toLowerCase().includes(marker.toLowerCase())) {
    throw new Error(`${name} forbidden=${marker}`);
  }
  console.log(`PASS | ${name}`);
};

try {
  [
    '"REAL_USER_EXPERIENCE"',
    '"FIXTURE_PREVIEW_ONLY"',
    'status: "SOURCE_NOT_READY"',
    "noCrossModeFallback: true",
    "noEngineInvocation: true",
    "rendererInputShapePreserved: true",
    "productionRendererActivation: false",
  ].forEach((marker) => assertIncludes("explicit source boundary", source.type, marker));

  [
    "readRealUserGenesisVisualSourceContext()",
    'sourceProvenance: "REAL_USER_SESSION"',
    "context.visualSource.renderPlanResult",
    "context.visualSource.projectionBundle",
    'status: "SOURCE_NOT_READY"',
  ].forEach((marker) => assertIncludes("real context consumer", source.real, marker));
  [
    "../mocks/",
    "resolveFixtureGenesisVisualConsumerSource",
    "PERSONAL_STAR_BEAST_SCENE_MODEL_FIXTURE",
    "createIsolatedWebGLRendererPrototype",
    "resolveStarbeastFromBirthDate",
    "runMotherCodeLandingEngine",
    "adaptRealLifeVisualSource",
  ].forEach(
    (marker) => assertExcludes("real consumer has no alternate source", source.real, marker),
  );

  [
    "PERSONAL_STAR_BEAST_SCENE_MODEL_FIXTURE_CASE_A",
    "PERSONAL_STAR_BEAST_SCENE_MODEL_FIXTURE_CASE_B",
    'sourceExperienceMode: "FIXTURE_PREVIEW_ONLY"',
  ].forEach((marker) => assertIncludes("fixture preview consumer", source.fixture, marker));

  assertIncludes(
    "real mode selects only real resolver",
    source.resolver,
    'input.sourceExperienceMode === "REAL_USER_EXPERIENCE"',
  );
  assertIncludes(
    "fixture mode selects only fixture resolver",
    source.resolver,
    "resolveFixtureGenesisVisualConsumerSource(input.fixtureCaseIndex)",
  );
  assertExcludes("resolver has no implicit default source", source.resolver, "??");

  assertExcludes(
    "consumer no longer imports fixtures directly",
    source.harness,
    "../mocks/starBeastSceneModelFixtures",
  );
  [
    "resolveGenesisVisualConsumerSource({",
    "sourceExperienceMode,",
    "consumerSource?.renderPlanResult.plan",
    "consumerSource?.projectionBundle",
    "renderPlan: plan",
    "projectionBundle.timeSequenceRecognitionProjection",
  ].forEach((marker) => assertIncludes("consumer uses selected source", source.harness, marker));
  assertIncludes(
    "preview route is explicit fixture mode",
    source.previewRoutes,
    'sourceExperienceMode: "FIXTURE_PREVIEW_ONLY"',
  );
  assertIncludes(
    "prototype renderer remains production forbidden",
    source.renderer,
    'authorization.productionStatus !== "FORBIDDEN"',
  );

  const entryPath = path.join(tempDir, "continuity-entry.ts");
  const outPath = path.join(tempDir, "continuity-entry.mjs");
  fs.writeFileSync(
    entryPath,
    [
      `export * from ${JSON.stringify(path.join(rootDir, "src/services/guanyaoLaunchOriginMotherInputAdapter.ts"))};`,
      `export * from ${JSON.stringify(path.join(rootDir, "src/services/launchLifeSourceSession.ts"))};`,
      `export * from ${JSON.stringify(path.join(rootDir, "src/services/launchLifeVisualSourceResolver.ts"))};`,
      `export * from ${JSON.stringify(path.join(rootDir, "src/services/realUserGenesisVisualSourceContext.ts"))};`,
      `export * from ${JSON.stringify(path.join(rootDir, "src/services/genesisVisualConsumerSourceResolver.ts"))};`,
    ].join("\n"),
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
  const missing = runtime.resolveGenesisVisualConsumerSource({
    sourceExperienceMode: "REAL_USER_EXPERIENCE",
    fixtureCaseIndex: 0,
  });
  assertEqual("missing real context returns SOURCE_NOT_READY", missing.status, "SOURCE_NOT_READY");
  assertEqual("missing real context has no fallback", missing.consumerSource, null);

  const originResults = runtime.resolveLaunchOriginMotherSourceResults({
    birth: { year: 1979, month: 4, day: 15, hourBranch: "子时" },
    periodIndex: 0,
    geo: { province: "甘肃", city: "兰州" },
    starbeast: { nodeCount: 28, primaryNodeIndex: 6, originLightTrace: "28光兽入口" },
  });
  const sessionResult = runtime.createLaunchLifeSourceSession({
    sourceReferenceId: "launch:1979-04-15:子时:甘肃:兰州",
    birthCoordinate: { year: 1979, month: 4, day: 15, hourBranch: "子时" },
    ...originResults,
  });
  assertEqual("real life session is available", sessionResult.status, "AVAILABLE");
  const visualResult = runtime.resolveLaunchLifeVisualSource(sessionResult.session);
  assertEqual("real visual source is available", visualResult.status, "AVAILABLE");
  const activation = runtime.activateRealUserGenesisVisualSourceContext({
    lifeSourceSession: sessionResult.session,
    visualSourceAdapterInput: visualResult.input,
    visualSource: visualResult.visualSource,
  });
  assertEqual("real visual context is available", activation.status, "AVAILABLE");

  const real = runtime.resolveGenesisVisualConsumerSource({
    sourceExperienceMode: "REAL_USER_EXPERIENCE",
    fixtureCaseIndex: 1,
  });
  assertEqual("real consumer source is ready", real.status, "READY");
  assertEqual("real provenance is traceable", real.consumerSource.sourceProvenance, "REAL_USER_SESSION");
  assertEqual("real reference remains continuous", real.consumerSource.sourceReferenceId, sessionResult.session.sourceReferenceId);
  assertEqual("render plan result is passed through", real.consumerSource.renderPlanResult, visualResult.visualSource.renderPlanResult);
  assertEqual("projection bundle is passed through", real.consumerSource.projectionBundle, visualResult.visualSource.projectionBundle);

  const fixtureA = runtime.resolveGenesisVisualConsumerSource({
    sourceExperienceMode: "FIXTURE_PREVIEW_ONLY",
    fixtureCaseIndex: 0,
  });
  const fixtureB = runtime.resolveGenesisVisualConsumerSource({
    sourceExperienceMode: "FIXTURE_PREVIEW_ONLY",
    fixtureCaseIndex: 1,
  });
  assertEqual("fixture A remains ready", fixtureA.status, "READY");
  assertEqual("fixture B remains ready", fixtureB.status, "READY");
  assertEqual("fixture A provenance", fixtureA.consumerSource.sourceProvenance, "FIXTURE_CASE_A");
  assertEqual("fixture B provenance", fixtureB.consumerSource.sourceProvenance, "FIXTURE_CASE_B");
  assertEqual("fixture cases remain distinct", fixtureA.consumerSource.sourceReferenceId === fixtureB.consumerSource.sourceReferenceId, false);

  console.log("\n[GENESIS REAL SOURCE CONSUMER CONTINUITY] PASS");
} catch (error) {
  console.error("[GENESIS REAL SOURCE CONSUMER CONTINUITY] FAIL");
  console.error(error instanceof Error ? error.message : error);
  process.exit(1);
} finally {
  fs.rmSync(tempDir, { recursive: true, force: true });
}
