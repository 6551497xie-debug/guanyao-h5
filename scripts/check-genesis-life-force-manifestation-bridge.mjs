import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import process from "node:process";
import { build } from "esbuild";

const rootDir = process.cwd();
const paths = Object.freeze({
  alignment: "docs/GUANYAO_WORLD_MODEL_ALIGNMENT_P0.md",
  checkSpec: "docs/GUANYAO_WORLD_MODEL_ALIGNMENT_CHECK_SPEC.md",
  type: "src/types/genesisLifeForceManifestationBridge.ts",
  service: "src/services/genesisLifeForceManifestationBridge.ts",
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
  path.join(os.tmpdir(), "guanyao-genesis-life-force-manifestation-"),
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
    "Projection 只增加来源到视觉的映射",
    "Renderer 参数、Timeline 和视觉校准不因 Source 接入被暗改",
    "不存在 Fixture、Prototype、Default、ReferenceOnly fallback",
  ].forEach((marker) => assertIncludes("alignment check specification", source.checkSpec, marker));

  [
    "GenesisLifeForceManifestationBridge",
    "LIFE_COORDINATE",
    "DIRECTION_FIELD",
    "ARCHETYPE_FORCE",
    "MANIFESTATION_SOURCE",
    "PRESENCE",
    "continuity",
    "noPresenceTransition: true",
    "noStarBeastGeneration: true",
  ].forEach((marker) => assertIncludes("bridge contract", source.type, marker));
  [
    "bridgeGenesisLifeForceManifestation",
    "fourSymbolDirectionProjection",
    "lifeArchetypeProjection",
    "manifestationSource",
    "manifestationSource.presenceState !== \"DORMANT\"",
    "noPresenceTransition: true",
    "noFallback: true",
  ].forEach((marker) => assertIncludes("bridge service", source.service, marker));
  [
    "bridgeGenesisLifeForceManifestation",
    "lifeForceManifestationBridgeResult.bridge",
    "LIFE_FORCE_MANIFESTATION_BRIDGE_FAILED",
  ].forEach((marker) => assertIncludes("adapter carries life-force bridge", source.adapter, marker));
  assertIncludes(
    "projection bundle carries life-force bridge",
    source.bundleType,
    "lifeForceManifestationBridge: GenesisLifeForceManifestationBridge",
  );
  assertIncludes("real consumer carries projection bundle", source.consumer, "projectionBundle: context.visualSource.projectionBundle");
  assertExcludes("production host input remains unchanged", source.host, "lifeForceManifestationBridge");
  assertExcludes("renderer input remains unchanged", source.renderer, "lifeForceManifestationBridge");
  [
    "resolveStarbeastFromBirthDate",
    "runFourSymbolEngine",
    "runMotherCodeLandingEngine",
    "generateStarBeast",
    "createStarBeast",
    "new StarBeast",
  ].forEach((marker) => {
    assertExcludes("bridge has no engine or generation", source.service, marker);
    assertExcludes("bridge type has no engine or generation", source.type, marker);
  });
  assertExcludes("engine has no life-force bridge dependency", source.engine, "genesisLifeForceManifestationBridge");

  const packageJson = JSON.parse(source.packageManifest);
  assertEqual(
    "life-force bridge gate is registered",
    packageJson.scripts?.["check-genesis-life-force-manifestation-bridge"],
    "node scripts/check-genesis-life-force-manifestation-bridge.mjs",
  );

  const entryPath = path.join(tempDir, "bridge-entry.ts");
  const outPath = path.join(tempDir, "bridge-entry.mjs");
  fs.writeFileSync(
    entryPath,
    [
      "src/services/guanyaoLaunchOriginMotherInputAdapter.ts",
      "src/services/launchLifeSourceSession.ts",
      "src/services/launchLifeVisualSourceResolver.ts",
      "src/services/realUserGenesisVisualSourceContext.ts",
      "src/services/genesisVisualConsumerSourceResolver.ts",
      "src/services/genesisProductionRouteAuthorization.ts",
      "src/services/genesisLifeForceManifestationBridge.ts",
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
  const bundle = visualSource.projectionBundle;
  const bridge = bundle.lifeForceManifestationBridge;
  assertEqual("bridge semantic role", bridge.semanticRole, "GENESIS_LIFE_FORCE_MANIFESTATION_BRIDGE");
  assertEqual("bridge source reference is continuous", bridge.sourceReferenceId, sourceReferenceId);
  assertEqual("bridge path is frozen", bridge.manifestationPath.join("→"), "LIFE_COORDINATE→DIRECTION_FIELD→ARCHETYPE_FORCE→MANIFESTATION_SOURCE→PRESENCE");
  assertEqual("bridge continuity is complete", Object.values(bridge.continuity).every(Boolean), true);
  assertEqual("bridge presence starts dormant", bridge.presenceState, "DORMANT");
  assertEqual("bridge forbids presence transition", bridge.noPresenceTransition, true);
  assertEqual("bridge forbids StarBeast generation", bridge.noStarBeastGeneration, true);
  assertEqual("bridge source provenance is real", bridge.provenance.sourceKind, "REAL_ENGINE_RESULT");
  assertEqual("bridge mansion provenance is continuous", bridge.provenance.mansionCoordinateReferenceId, bundle.twentyEightMansionCoordinateProjection.birthMansion.coordinateReferenceId);
  assertEqual("bridge direction provenance is continuous", bridge.provenance.fourSymbolDirectionSourceReferenceId, bundle.fourSymbolLifeDirectionProjection.sourceReferenceId);
  assertEqual("bridge archetype provenance is continuous", bridge.provenance.lifeArchetypeSourceReferenceId, bundle.lifeArchetypeProjection.sourceReferenceId);

  const missingManifestation = runtime.bridgeGenesisLifeForceManifestation({
    sourceReferenceId,
    mansionCoordinateProjection: bundle.twentyEightMansionCoordinateProjection,
    fourSymbolDirectionProjection: bundle.fourSymbolLifeDirectionProjection,
    lifeArchetypeProjection: bundle.lifeArchetypeProjection,
    manifestationSource: null,
  });
  assertEqual("missing manifestation source is blocked", missingManifestation.status, "BLOCKED");
  assertEqual("missing manifestation source has explicit reason", missingManifestation.reason, "MANIFESTATION_SOURCE_REQUIRED");

  const activation = runtime.activateRealUserGenesisVisualSourceContext({
    lifeSourceSession: sessionResult.session,
    visualSourceAdapterInput: visualResult.input,
    visualSource,
  });
  assertEqual("real visual context is available", activation.status, "AVAILABLE");
  const consumerResult = runtime.resolveGenesisVisualConsumerSource({
    sourceExperienceMode: "REAL_USER_EXPERIENCE",
    fixtureCaseIndex: 1,
  });
  assertEqual("real consumer is ready", consumerResult.status, "READY");
  assertEqual("consumer receives bridge", consumerResult.consumerSource.projectionBundle.lifeForceManifestationBridge, bridge);
  assertEqual("real consumer remains real", consumerResult.consumerSource.sourceProvenance, "REAL_USER_SESSION");
  const routeAuthorization = runtime.authorizeGenesisProductionRoute({ routeTarget: "/genesis", sourceReferenceId });
  assertEqual("production route remains authorized", routeAuthorization.status, "READY");

  const fixtureResult = runtime.resolveFixtureGenesisVisualConsumerSource(0);
  assertEqual("fixture consumer remains explicit", fixtureResult.consumerSource.sourceExperienceMode, "FIXTURE_PREVIEW_ONLY");
  assertEqual("fixture bridge remains source-only", fixtureResult.consumerSource.projectionBundle.lifeForceManifestationBridge.noFallback, true);
  assertEqual("fixture bridge provenance remains isolated", fixtureResult.consumerSource.projectionBundle.lifeForceManifestationBridge.provenance.sourceKind, "ISOLATED_FIXTURE_ENGINE_RESULT");
  assertEqual("fixture cannot become real consumer", fixtureResult.consumerSource.sourceProvenance, "FIXTURE_CASE_A");

  console.log("\n[GENESIS LIFE FORCE MANIFESTATION BRIDGE] PASS");
} catch (error) {
  console.error("[GENESIS LIFE FORCE MANIFESTATION BRIDGE] FAIL");
  console.error(error instanceof Error ? error.message : error);
  process.exitCode = 1;
} finally {
  fs.rmSync(tempDir, { recursive: true, force: true });
}
