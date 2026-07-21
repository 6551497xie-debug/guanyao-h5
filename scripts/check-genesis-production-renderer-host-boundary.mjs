import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import process from "node:process";
import { build } from "esbuild";

const rootDir = process.cwd();
const paths = {
  host: "src/renderers/genesisProductionRendererHost.ts",
  hostType: "src/types/genesisProductionRendererHost.ts",
  core: "src/renderers/genesisWebGLRendererCore.ts",
  prototype: "src/prototypes/isolatedWebGLRendererPrototype.ts",
  routes: "src/routes/guanyaoRoutes.ts",
  previewRoutes: "src/router/previewRoutes.ts",
  app: "src/App.tsx",
  packageManifest: "package.json",
};
const source = Object.fromEntries(
  Object.entries(paths).map(([name, file]) => [
    name,
    fs.readFileSync(path.join(rootDir, file), "utf8"),
  ]),
);
const tempDir = fs.mkdtempSync(
  path.join(os.tmpdir(), "guanyao-genesis-production-renderer-host-"),
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
  if (text.includes(marker)) throw new Error(`${name} forbidden=${marker}`);
  console.log(`PASS | ${name}`);
};

try {
  [
    "export function createGenesisProductionRendererHost",
    "createGenesisWebGLRendererCore",
    'authorization.classification === "PRODUCTION"',
    'authorization.authorizedSourceMode === "REAL_USER_EXPERIENCE"',
    'authorization.authorizedSourceProvenance === "REAL_USER_SESSION"',
    'authorization.fixtureSourceStatus === "FORBIDDEN"',
    'authorization.prototypeAuthorizationStatus === "NOT_ACCEPTED"',
    'return blocked("SOURCE_NOT_READY")',
    'return blocked("SOURCE_MODE_INVALID")',
    'return blocked("SOURCE_PROVENANCE_INVALID")',
    'return blocked("SOURCE_REFERENCE_NOT_AUTHORIZED")',
    "projectionBundle.timeSequenceRecognitionProjection",
    "projectionBundle.birthMansionIgnitionProjection",
    "projectionBundle.morphologicalFieldAlignmentProjection",
    "projectionBundle.lifeForceInfusionProjection",
    "projectionBundle.personalRevealProjection",
    "projectionBundle.realityPressureProjection",
  ].forEach((marker) => assertIncludes("production host boundary", source.host, marker));

  [
    "fixtureGenesisVisualConsumerSource",
    "starBeastSceneModelFixtures",
    "resolveGenesisVisualConsumerSource",
    "realUserGenesisVisualSourceContext",
    "resolveStarbeastFromBirthDate",
    "runMotherCodeLandingEngine",
    "adaptRealLifeVisualSource",
    "react-router-dom",
    "useNavigate",
    "requestAnimationFrame",
    "localStorage",
    "sessionStorage",
  ].forEach((marker) => assertExcludes("host owns no source, engine, route, or loop", source.host, marker));

  [
    'classification: "PRODUCTION"',
    'authorizedTarget: "GENESIS_PRODUCTION_RENDERER_HOST"',
    'authorizedRendererCore: "GENESIS_WEBGL_RENDERER_CORE"',
    'authorizedSourceMode: "REAL_USER_EXPERIENCE"',
    'authorizedSourceProvenance: "REAL_USER_SESSION"',
    'authorizedRouteTarget: "/genesis"',
    'routeActivationEligibility: "ELIGIBLE"',
    'routeIntegrationStatus: "AUTHORIZED_EXPLICIT_ROUTE_ACTIVATION"',
    "noPrototypeAuthorization: true",
    "noFixtureSource: true",
    "noSourceFallback: true",
    "noRouteIntegration: true",
    "noUIIntegration: true",
    "noAnimationLoopOwnership: true",
  ].forEach((marker) => assertIncludes("production authorization contract", source.hostType, marker));

  assertIncludes(
    "prototype authorization remains forbidden",
    source.prototype,
    'authorization.productionStatus !== "FORBIDDEN"',
  );
  assertExcludes("formal route remains absent", source.routes, "genesisExperience");
  assertExcludes("preview routes do not mount production host", source.previewRoutes, "GenesisProductionRendererHost");
  assertExcludes("app does not mount production host", source.app, "GenesisProductionRendererHost");

  const packageJson = JSON.parse(source.packageManifest);
  assertIncludes(
    "production host gate is registered",
    packageJson.scripts?.["check-genesis-production-renderer-host-boundary"] ?? "",
    "node scripts/check-genesis-production-renderer-host-boundary.mjs",
  );

  const entryPath = path.join(tempDir, "host-entry.ts");
  const outPath = path.join(tempDir, "host-entry.mjs");
  fs.writeFileSync(
    entryPath,
    [
      `export * from ${JSON.stringify(path.join(rootDir, "src/services/guanyaoLaunchOriginMotherInputAdapter.ts"))};`,
      `export * from ${JSON.stringify(path.join(rootDir, "src/services/launchLifeSourceSession.ts"))};`,
      `export * from ${JSON.stringify(path.join(rootDir, "src/services/launchLifeVisualSourceResolver.ts"))};`,
      `export * from ${JSON.stringify(path.join(rootDir, "src/services/realUserGenesisVisualSourceContext.ts"))};`,
      `export * from ${JSON.stringify(path.join(rootDir, "src/services/genesisVisualConsumerSourceResolver.ts"))};`,
      `export * from ${JSON.stringify(path.join(rootDir, "src/services/genesisFourSymbolDirectionFieldVisualCalibration.ts"))};`,
      `export * from ${JSON.stringify(path.join(rootDir, "src/services/genesisLifeArchetypeForceCondensationVisualCalibration.ts"))};`,
      `export * from ${JSON.stringify(path.join(rootDir, "src/renderers/genesisProductionRendererHost.ts"))};`,
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
  const notReadySource = runtime.resolveGenesisVisualConsumerSource({
    sourceExperienceMode: "REAL_USER_EXPERIENCE",
    fixtureCaseIndex: 0,
  });
  const pendingAuthorization = Object.freeze({
    authorizationId: "GUANYAO_GENESIS_PRODUCTION_RENDERER_HOST_AUTHORIZATION_V2",
    classification: "PRODUCTION",
    authorizedRouteTarget: "/genesis",
    routeActivationEligibility: "ELIGIBLE",
    authorizedTarget: "GENESIS_PRODUCTION_RENDERER_HOST",
    authorizedRendererCore: "GENESIS_WEBGL_RENDERER_CORE",
    authorizedSourceMode: "REAL_USER_EXPERIENCE",
    authorizedSourceProvenance: "REAL_USER_SESSION",
    authorizedSourceReferenceId: "launch:pending",
    productionRenderingStatus: "AUTHORIZED",
    formalUserSourceStatus: "AUTHORIZED",
    fixtureSourceStatus: "FORBIDDEN",
    prototypeAuthorizationStatus: "NOT_ACCEPTED",
    routeIntegrationStatus: "AUTHORIZED_EXPLICIT_ROUTE_ACTIVATION",
    fallbackRequired: true,
  });
  const baseHostInput = Object.freeze({
    canvas: null,
    width: 1280,
    height: 720,
    pixelRatio: 1,
    reducedMotion: false,
  });
  const notReady = runtime.createGenesisProductionRendererHost({
    ...baseHostInput,
    authorization: pendingAuthorization,
    consumerSourceResult: notReadySource,
  });
  assertEqual("missing real context is blocked", notReady.status, "BLOCKED");
  assertEqual("missing real context reason", notReady.reason, "SOURCE_NOT_READY");

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
  assertEqual("real session is available", sessionResult.status, "AVAILABLE");
  const visualResult = runtime.resolveLaunchLifeVisualSource(sessionResult.session);
  assertEqual("real visual source is available", visualResult.status, "AVAILABLE");
  const activation = runtime.activateRealUserGenesisVisualSourceContext({
    lifeSourceSession: sessionResult.session,
    visualSourceAdapterInput: visualResult.input,
    visualSource: visualResult.visualSource,
  });
  assertEqual("real visual context is available", activation.status, "AVAILABLE");
  const realSource = runtime.resolveGenesisVisualConsumerSource({
    sourceExperienceMode: "REAL_USER_EXPERIENCE",
    fixtureCaseIndex: 0,
  });
  assertEqual("real consumer source is ready", realSource.status, "READY");
  const directionFieldCalibrationResult =
    runtime.calibrateGenesisFourSymbolDirectionField({
      lifeDirectionProjection:
        realSource.consumerSource.projectionBundle
          .fourSymbolLifeDirectionProjection,
      activeVisualLayer: "MOON_ORIGIN",
    });
  assertEqual(
    "real direction field calibration is available",
    directionFieldCalibrationResult.status,
    "AVAILABLE",
  );
  const archetypeForceCalibrationResult =
    runtime.calibrateGenesisLifeArchetypeForceCondensation({
      lifeArchetypeProjection:
        realSource.consumerSource.projectionBundle.lifeArchetypeProjection,
      directionFieldCalibration: directionFieldCalibrationResult.calibration,
      activeVisualLayer: "MOON_ORIGIN",
    });
  assertEqual(
    "real archetype force calibration is available",
    archetypeForceCalibrationResult.status,
    "AVAILABLE",
  );

  const authorization = Object.freeze({
    ...pendingAuthorization,
    authorizedSourceReferenceId: sessionResult.session.sourceReferenceId,
  });
  const fixtureSource = runtime.resolveGenesisVisualConsumerSource({
    sourceExperienceMode: "FIXTURE_PREVIEW_ONLY",
    fixtureCaseIndex: 0,
  });
  const fixtureAuthorization = Object.freeze({
    ...pendingAuthorization,
    authorizedSourceReferenceId: fixtureSource.consumerSource.sourceReferenceId,
  });
  const fixtureAttempt = runtime.createGenesisProductionRendererHost({
    ...baseHostInput,
    authorization: fixtureAuthorization,
    consumerSourceResult: fixtureSource,
  });
  assertEqual("fixture source is rejected", fixtureAttempt.status, "BLOCKED");
  assertEqual("fixture source cannot cross production mode", fixtureAttempt.reason, "SOURCE_MODE_INVALID");

  const missingAuthorization = runtime.createGenesisProductionRendererHost({
    ...baseHostInput,
    authorization: null,
    consumerSourceResult: realSource,
  });
  assertEqual("authorization is mandatory", missingAuthorization.reason, "AUTHORIZATION_REQUIRED");

  const mismatchedReference = runtime.createGenesisProductionRendererHost({
    ...baseHostInput,
    authorization: pendingAuthorization,
    consumerSourceResult: realSource,
  });
  assertEqual("source reference must be authorized", mismatchedReference.reason, "SOURCE_REFERENCE_NOT_AUTHORIZED");

  const hostResult = runtime.createGenesisProductionRendererHost({
    ...baseHostInput,
    authorization,
    consumerSourceResult: realSource,
    fourSymbolDirectionFieldVisualCalibration:
      directionFieldCalibrationResult.calibration,
    lifeArchetypeForceCondensationVisualCalibration:
      archetypeForceCalibrationResult.calibration,
  });
  assertEqual("real source reaches renderer host", hostResult.status, "FALLBACK_REQUIRED");
  assertEqual("host provenance remains real", hostResult.sourceProvenance, "REAL_USER_SESSION");
  assertEqual("host source reference remains traceable", hostResult.sourceReferenceId, sessionResult.session.sourceReferenceId);
  assertEqual("null canvas keeps semantic fallback", hostResult.fallback.reason, "CANVAS_REQUIRED");
  assertEqual("renderer semantics remain preserved", hostResult.fallback.preservesRenderPlanSemantics, true);

  console.log("\n[GENESIS PRODUCTION RENDERER HOST BOUNDARY] PASS");
} catch (error) {
  console.error("[GENESIS PRODUCTION RENDERER HOST BOUNDARY] FAIL");
  console.error(error instanceof Error ? error.message : error);
  process.exit(1);
} finally {
  fs.rmSync(tempDir, { recursive: true, force: true });
}
