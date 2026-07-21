import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import process from "node:process";
import { build } from "esbuild";

const rootDir = process.cwd();
const paths = Object.freeze({
  alignment: "docs/GUANYAO_WORLD_MODEL_ALIGNMENT_P0.md",
  checkSpec: "docs/GUANYAO_WORLD_MODEL_ALIGNMENT_CHECK_SPEC.md",
  type: "src/types/genesisStarBeastManifestationSource.ts",
  service: "src/services/genesisStarBeastManifestationSource.ts",
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
  path.join(os.tmpdir(), "guanyao-genesis-starbeast-manifestation-source-"),
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
    "世界模型统一判断",
    "Genesis 让既有生命来源被看见",
    "Visual 与 Renderer 永远是生命事实的消费者",
    "二十八宿坐标显化",
  ].forEach((marker) => assertIncludes("world model alignment", source.alignment, marker));
  [
    "四象、MotherCode、StarBeast Asset 不参与反推星宿",
    "Renderer 参数、Timeline 和视觉校准不因 Source 接入被暗改",
    "不存在 Fixture、Prototype、Default、ReferenceOnly fallback",
  ].forEach((marker) => assertIncludes("alignment check specification", source.checkSpec, marker));

  [
    "GenesisStarBeastManifestationSource",
    "mansionCoordinateReference",
    "fourSymbolDirectionReference",
    "lifeArchetypeReference",
    "manifestationReferenceId",
    "presenceState",
    "provenance",
    "DORMANT",
    "APPROACHING",
    "PRESENT",
    "RECOGNIZED",
    "noStarBeastGeneration: true",
    "noAssetGeneration: true",
  ].forEach((marker) => assertIncludes("manifestation source contract", source.type, marker));
  [
    "resolveGenesisStarBeastManifestationSource",
    "mansionResult.status !== \"READY\"",
    "fourSymbolResult !== mansionResult",
    "presenceState: \"DORMANT\"",
    "noEntityCreation: true",
    "noAssetGeneration: true",
    "noFallback: true",
  ].forEach((marker) => assertIncludes("manifestation source service", source.service, marker));
  [
    "resolveGenesisStarBeastManifestationSource",
    "starBeastManifestationSourceResult.source",
    "STAR_BEAST_MANIFESTATION_SOURCE_FAILED",
  ].forEach((marker) => assertIncludes("adapter carries manifestation source", source.adapter, marker));
  assertIncludes("projection bundle carries manifestation source", source.bundleType, "starBeastManifestationSource: GenesisStarBeastManifestationSource");
  assertIncludes("real consumer carries projection bundle", source.consumer, "projectionBundle: context.visualSource.projectionBundle");
  assertExcludes("production host input remains unchanged", source.host, "starBeastManifestationSource");
  assertExcludes("renderer input remains unchanged", source.renderer, "starBeastManifestationSource");
  [
    "resolveStarbeastFromBirthDate",
    "runFourSymbolEngine",
    "runMotherCodeLandingEngine",
    "generateStarBeast",
    "createStarBeast",
    "new StarBeast",
  ].forEach((marker) => {
    assertExcludes("manifestation source has no engine or generation", source.service, marker);
    assertExcludes("manifestation source has no engine or generation", source.type, marker);
  });
  assertExcludes("engine has no manifestation source dependency", source.engine, "genesisStarBeastManifestationSource");

  const packageJson = JSON.parse(source.packageManifest);
  assertEqual(
    "manifestation source gate is registered",
    packageJson.scripts?.["check-genesis-starbeast-manifestation-source"],
    "node scripts/check-genesis-starbeast-manifestation-source.mjs",
  );

  const entryPath = path.join(tempDir, "manifestation-entry.ts");
  const outPath = path.join(tempDir, "manifestation-entry.mjs");
  fs.writeFileSync(
    entryPath,
    [
      "src/services/guanyaoLaunchOriginMotherInputAdapter.ts",
      "src/services/launchLifeSourceSession.ts",
      "src/services/launchLifeVisualSourceResolver.ts",
      "src/services/realUserGenesisVisualSourceContext.ts",
      "src/services/genesisVisualConsumerSourceResolver.ts",
      "src/services/genesisProductionRouteAuthorization.ts",
      "src/services/genesisStarBeastManifestationSource.ts",
      "src/services/genesisLifeArchetypeProjection.ts",
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

  const visualSource = visualResult.visualSource;
  const manifestationSource = visualSource.projectionBundle.starBeastManifestationSource;
  const mansionProjection = visualSource.projectionBundle.twentyEightMansionCoordinateProjection;
  const directionProjection = visualSource.projectionBundle.fourSymbolLifeDirectionProjection;
  const archetypeProjection = visualSource.projectionBundle.lifeArchetypeProjection;
  assertEqual("manifestation source is available", manifestationSource.semanticRole, "GENESIS_STAR_BEAST_MANIFESTATION_SOURCE");
  assertEqual("manifestation source reference follows session", manifestationSource.sourceReferenceId, sourceReferenceId);
  assertEqual("mansion source is continuous", manifestationSource.mansionCoordinateReference.coordinateReferenceId, mansionProjection.birthMansion.coordinateReferenceId);
  assertEqual("four symbol source is continuous", manifestationSource.fourSymbolDirectionReference, directionProjection);
  assertEqual("life archetype source is continuous", manifestationSource.lifeArchetypeReference, archetypeProjection);
  assertEqual("presence starts dormant", manifestationSource.presenceState, "DORMANT");
  assertEqual("presence reference starts dormant", manifestationSource.presenceReference.presenceState, "DORMANT");
  assertEqual("presence reference does not create entity", manifestationSource.presenceReference.noEntityCreation, true);
  assertEqual("manifestation source forbids StarBeast generation", manifestationSource.noStarBeastGeneration, true);
  assertEqual("manifestation source forbids asset generation", manifestationSource.noAssetGeneration, true);
  assertEqual("manifestation source forbids fallback", manifestationSource.noFallback, true);
  assertEqual("identity provenance is continuous", manifestationSource.provenance.starBeastIdentityReferenceId, visualSource.identitySourceReference.personalStarBeastReference.referenceId);
  assertEqual("readiness provenance is continuous", manifestationSource.provenance.manifestationReadinessReferenceId, archetypeProjection.starBeastManifestationReadinessReference.referenceId);
  assertEqual("production source kind is real", manifestationSource.provenance.sourceKind, "REAL_ENGINE_RESULT");

  const missingIdentity = runtime.resolveGenesisStarBeastManifestationSource({
    sourceReferenceId,
    mansionCoordinateProjection: mansionProjection,
    fourSymbolDirectionProjection: directionProjection,
    lifeArchetypeProjection: archetypeProjection,
    starBeastIdentitySourceReference: null,
  });
  assertEqual("missing identity source is blocked", missingIdentity.status, "BLOCKED");
  assertEqual("missing identity source has explicit reason", missingIdentity.reason, "STAR_BEAST_IDENTITY_SOURCE_REQUIRED");

  const activation = runtime.activateRealUserGenesisVisualSourceContext({
    lifeSourceSession: sessionResult.session,
    visualSourceAdapterInput: visualResult.input,
    visualSource: visualSource,
  });
  assertEqual("real visual context is available", activation.status, "AVAILABLE");
  const consumerResult = runtime.resolveGenesisVisualConsumerSource({
    sourceExperienceMode: "REAL_USER_EXPERIENCE",
    fixtureCaseIndex: 1,
  });
  assertEqual("real consumer is ready", consumerResult.status, "READY");
  assertEqual("consumer receives manifestation source", consumerResult.consumerSource.projectionBundle.starBeastManifestationSource, manifestationSource);
  assertEqual("real consumer remains real", consumerResult.consumerSource.sourceProvenance, "REAL_USER_SESSION");
  const routeAuthorization = runtime.authorizeGenesisProductionRoute({
    routeTarget: "/genesis",
    sourceReferenceId,
  });
  assertEqual("production route remains authorized", routeAuthorization.status, "READY");

  const fixtureResult = runtime.resolveFixtureGenesisVisualConsumerSource(0);
  assertEqual("fixture consumer remains explicit", fixtureResult.consumerSource.sourceExperienceMode, "FIXTURE_PREVIEW_ONLY");
  assertEqual("fixture manifestation source remains available", fixtureResult.consumerSource.projectionBundle.starBeastManifestationSource.noFallback, true);
  assertEqual("fixture manifestation source remains isolated", fixtureResult.consumerSource.projectionBundle.starBeastManifestationSource.provenance.sourceKind, "ISOLATED_FIXTURE_ENGINE_RESULT");
  assertEqual("fixture cannot become real consumer", fixtureResult.consumerSource.sourceProvenance, "FIXTURE_CASE_A");

  console.log("\n[GENESIS STARBEAST MANIFESTATION SOURCE] PASS");
} catch (error) {
  console.error("[GENESIS STARBEAST MANIFESTATION SOURCE] FAIL");
  console.error(error instanceof Error ? error.message : error);
  process.exitCode = 1;
} finally {
  fs.rmSync(tempDir, { recursive: true, force: true });
}
