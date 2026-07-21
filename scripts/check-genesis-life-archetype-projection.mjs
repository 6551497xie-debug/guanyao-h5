import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import process from "node:process";
import { build } from "esbuild";

const rootDir = process.cwd();
const paths = Object.freeze({
  alignment: "docs/GUANYAO_WORLD_MODEL_ALIGNMENT_P0.md",
  checkSpec: "docs/GUANYAO_WORLD_MODEL_ALIGNMENT_CHECK_SPEC.md",
  type: "src/types/genesisLifeArchetypeProjection.ts",
  service: "src/services/genesisLifeArchetypeProjection.ts",
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
  path.join(os.tmpdir(), "guanyao-genesis-life-archetype-"),
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
    "生命来源层",
    "二十八宿坐标显化",
    "Visual 与 Renderer 永远是生命事实的消费者",
  ].forEach((marker) => assertIncludes("world model alignment", source.alignment, marker));
  [
    "Projection 只增加来源到视觉的映射",
    "四象、MotherCode、StarBeast Asset 不参与反推星宿",
    "Renderer 参数、Timeline 和视觉校准不因 Source 接入被暗改",
  ].forEach((marker) => assertIncludes("alignment check specification", source.checkSpec, marker));

  [
    "GenesisLifeArchetypeProjection",
    "fourSymbolDirectionReference",
    "lifeArchetype",
    "archetypeName",
    "originalForce",
    "lifeIntention",
    "shadowPattern",
    "awakeningDirection",
    "provenance",
    "starBeastManifestationReadiness",
    "noStarBeastGeneration: true",
    "noLifeArchetypeCalculation: true",
  ].forEach((marker) => assertIncludes("archetype projection contract", source.type, marker));
  [
    "ARCHETYPE_MEANING_BY_CODE",
    "QIAN: Object.freeze({ archetypeName: \"创世者\", archetypeDirection: \"创造\" })",
    "KUN: Object.freeze({ archetypeName: \"承载者\", archetypeDirection: \"承载\" })",
    "ZHEN: Object.freeze({ archetypeName: \"行动者\", archetypeDirection: \"启动\" })",
    "XUN: Object.freeze({ archetypeName: \"渗透者\", archetypeDirection: \"融入\" })",
    "KAN: Object.freeze({ archetypeName: \"深潜者\", archetypeDirection: \"穿越\" })",
    "LI: Object.freeze({ archetypeName: \"照见者\", archetypeDirection: \"显明\" })",
    "GEN: Object.freeze({ archetypeName: \"守望者\", archetypeDirection: \"守护\" })",
    "DUI: Object.freeze({ archetypeName: \"连接者\", archetypeDirection: \"连接\" })",
    "motherCode.profileReference !== motherCode.landingResultReference.motherCodeProfile",
    "lifeArchetype.sourceMotherCodeId !== motherCode.profileReference.motherCodeId",
    "noFallback: true",
  ].forEach((marker) => assertIncludes("archetype projection service", source.service, marker));
  [
    "projectGenesisLifeArchetype",
    "lifeArchetypeResult.projection",
    "LIFE_ARCHETYPE_PROJECTION_FAILED",
    "manifestationReadinessReference: readinessReference",
  ].forEach((marker) => assertIncludes("adapter carries archetype projection", source.adapter, marker));
  assertIncludes("projection bundle carries archetype projection", source.bundleType, "lifeArchetypeProjection: GenesisLifeArchetypeProjection");
  assertIncludes("real consumer carries projection bundle", source.consumer, "projectionBundle: context.visualSource.projectionBundle");
  assertExcludes("production host input remains unchanged", source.host, "lifeArchetypeProjection");
  assertExcludes("renderer input remains unchanged", source.renderer, "lifeArchetypeProjection");
  [
    "resolveStarbeastFromBirthDate",
    "runFourSymbolEngine",
    "runMotherCodeLandingEngine",
    "guanyaoStarbeastEngineService",
    "generateStarBeast",
  ].forEach((marker) => {
    assertExcludes("archetype projection has no engine or generation", source.service, marker);
    assertExcludes("archetype projection has no engine or generation", source.type, marker);
  });
  assertExcludes("engine has no archetype projection dependency", source.engine, "genesisLifeArchetypeProjection");

  const packageJson = JSON.parse(source.packageManifest);
  assertEqual(
    "archetype projection gate is registered",
    packageJson.scripts?.["check-genesis-life-archetype-projection"],
    "node scripts/check-genesis-life-archetype-projection.mjs",
  );

  const entryPath = path.join(tempDir, "archetype-entry.ts");
  const outPath = path.join(tempDir, "archetype-entry.mjs");
  fs.writeFileSync(
    entryPath,
    [
      "src/services/guanyaoLaunchOriginMotherInputAdapter.ts",
      "src/services/launchLifeSourceSession.ts",
      "src/services/launchLifeVisualSourceResolver.ts",
      "src/services/realUserGenesisVisualSourceContext.ts",
      "src/services/genesisVisualConsumerSourceResolver.ts",
      "src/services/genesisProductionRouteAuthorization.ts",
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
  const directionProjection = visualSource.projectionBundle.fourSymbolLifeDirectionProjection;
  const projection = visualSource.projectionBundle.lifeArchetypeProjection;
  assertEqual("archetype projection is available", projection.semanticRole, "GENESIS_LIFE_ARCHETYPE_PROJECTION");
  assertEqual("archetype source reference follows session", projection.sourceReferenceId, sourceReferenceId);
  assertEqual("archetype direction reference is continuous", projection.fourSymbolDirectionReference, directionProjection);
  assertEqual("archetype code follows existing profile", projection.lifeArchetype, visualSource.trajectorySource.lifeArchetypeProfileReference.code);
  assertEqual("archetype name is frozen semantic", projection.archetypeName, ({ QIAN: "创世者", KUN: "承载者", ZHEN: "行动者", XUN: "渗透者", KAN: "深潜者", LI: "照见者", GEN: "守望者", DUI: "连接者" })[projection.lifeArchetype]);
  assertEqual("original force follows existing profile", projection.originalForce, visualSource.trajectorySource.lifeArchetypeProfileReference.originalForce);
  assertEqual("life intention follows existing profile", projection.lifeIntention, visualSource.trajectorySource.lifeArchetypeProfileReference.lifeIntention);
  assertEqual("shadow pattern follows existing profile", projection.shadowPattern, visualSource.trajectorySource.lifeArchetypeProfileReference.shadowPattern);
  assertEqual("awakening direction follows existing profile", projection.awakeningDirection, visualSource.trajectorySource.lifeArchetypeProfileReference.awakeningDirection);
  assertEqual("MotherCode provenance is continuous", projection.provenance.motherCodeProfileReferenceId, visualSource.trajectorySource.motherCodeProfileReference.profileReference.motherCodeId);
  assertEqual("manifestation readiness is reference only", projection.starBeastManifestationReadiness, "READY_FOR_PERSONAL_STAR_BEAST_MANIFESTATION_DESIGN");
  assertEqual("archetype projection forbids StarBeast generation", projection.noStarBeastGeneration, true);
  assertEqual("archetype projection forbids fallback", projection.noFallback, true);

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
  assertEqual("consumer receives archetype projection", consumerResult.consumerSource.projectionBundle.lifeArchetypeProjection, projection);
  assertEqual("real consumer remains real", consumerResult.consumerSource.sourceProvenance, "REAL_USER_SESSION");

  const fixtureResult = runtime.resolveFixtureGenesisVisualConsumerSource(0);
  assertEqual("fixture consumer remains explicit", fixtureResult.consumerSource.sourceExperienceMode, "FIXTURE_PREVIEW_ONLY");
  assertEqual("fixture archetype projection remains available", fixtureResult.consumerSource.projectionBundle.lifeArchetypeProjection.noFallback, true);
  assertEqual("fixture archetype source remains isolated", fixtureResult.consumerSource.projectionBundle.lifeArchetypeProjection.provenance.motherCodeSourceEngine, "guanyao_lunar_mother_code_landing");
  assertEqual("fixture cannot become real consumer", fixtureResult.consumerSource.sourceProvenance, "FIXTURE_CASE_A");

  console.log("\n[GENESIS LIFE ARCHETYPE PROJECTION] PASS");
} catch (error) {
  console.error("[GENESIS LIFE ARCHETYPE PROJECTION] FAIL");
  console.error(error instanceof Error ? error.message : error);
  process.exitCode = 1;
} finally {
  fs.rmSync(tempDir, { recursive: true, force: true });
}
