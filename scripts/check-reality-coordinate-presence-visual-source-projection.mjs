import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import process from "node:process";
import { build } from "esbuild";

const rootDir = process.cwd();
const paths = Object.freeze({
  type: "src/types/realityCoordinatePresenceVisualSourceProjection.ts",
  service: "src/services/realityCoordinatePresenceVisualSourceProjection.ts",
  realityEntry: "src/pages/RealityProductionRouteEntry.tsx",
  realityHost: "src/components/RealityProductionHost.tsx",
  rendererHost: "src/renderers/genesisProductionRendererHost.ts",
  rendererCore: "src/renderers/genesisWebGLRendererCore.ts",
  engine: "src/services/guanyaoStarbeastEngineService.ts",
  typeIndex: "src/types/index.ts",
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

const tempDir = fs.mkdtempSync(
  path.join(os.tmpdir(), "guanyao-reality-presence-source-projection-"),
);

try {
  [
    "REALITY_COORDINATE_PRESENCE_VISUAL_SOURCE_PROJECTION",
    'presenceState: "RECOGNIZED"',
    'continuityState: "CARRIED_TO_REALITY"',
    'arrivalState: "REALITY_APPROACHING"',
    'coordinateRole: "REALITY_COORDINATE_OBSERVATION"',
    "sceneModel",
    "renderPlan",
    "projectionBundle",
    "immutableProjectionOnly: true",
    "preserveExistingVisualObjectIdentity: true",
    "noVisualSourceCopy: true",
    "noRendererInvocation: true",
    "noPressureExecution: true",
  ].forEach((marker) =>
    assertIncludes("Reality Presence visual source contract", source.type, marker),
  );
  [
    "projectRealityCoordinatePresenceVisualSource",
    'visualContext.sourceMode !== "REAL_USER_EXPERIENCE"',
    'continuity.presenceState !== "RECOGNIZED"',
    'continuity.continuityState !== "CARRIED_TO_REALITY"',
    'authorization.status !== "READY"',
    "MANIFESTATION_SOURCE_REFERENCE_MISMATCH",
    "sceneModel: visualSource.sceneModel",
    "renderPlan: visualSource.renderPlan",
    "projectionBundle: visualSource.projectionBundle",
  ].forEach((marker) =>
    assertIncludes("Reality Presence source projection validation", source.service, marker),
  );
  [
    "resolveStarbeastFromBirthDate",
    "runFourSymbolEngine",
    "runMotherCodeLandingEngine",
    "createGenesisWebGLRendererCore",
    "createGenesisProductionRendererHost",
    "resolvePressure",
    "setTimeout",
    "Date.now",
    "Math.random",
    "localStorage",
    "sessionStorage",
  ].forEach((marker) =>
    assertExcludes("projection owns no Engine Renderer Pressure timing or storage", source.service, marker),
  );
  assertExcludes("Reality route does not consume projection yet", source.realityEntry, "RealityCoordinatePresenceVisualSourceProjection");
  assertExcludes("Reality Host does not consume projection yet", source.realityHost, "RealityCoordinatePresenceVisualSourceProjection");
  assertExcludes("Renderer Host remains unchanged", source.rendererHost, "RealityCoordinatePresenceVisualSourceProjection");
  assertExcludes("Renderer Core remains unchanged", source.rendererCore, "RealityCoordinatePresenceVisualSourceProjection");
  assertExcludes("Engine remains unchanged", source.engine, "RealityCoordinatePresenceVisualSourceProjection");
  assertIncludes("projection type is exported", source.typeIndex, 'from "./realityCoordinatePresenceVisualSourceProjection"');

  const packageJson = JSON.parse(source.packageManifest);
  assertEqual(
    "Reality Presence source projection gate is registered",
    packageJson.scripts?.["check-reality-coordinate-presence-visual-source-projection"],
    "node scripts/check-reality-coordinate-presence-visual-source-projection.mjs",
  );

  const entryPath = path.join(tempDir, "reality-presence-projection-entry.ts");
  const outPath = path.join(tempDir, "reality-presence-projection-entry.mjs");
  fs.writeFileSync(
    entryPath,
    [
      "src/services/guanyaoLaunchOriginMotherInputAdapter.ts",
      "src/services/launchLifeSourceSession.ts",
      "src/services/launchLifeVisualSourceResolver.ts",
      "src/services/realUserGenesisVisualSourceContext.ts",
      "src/services/genesisProductionRouteAuthorization.ts",
      "src/services/genesisProductionRuntimeConsumer.ts",
      "src/services/genesisStarBeastPresenceVisualRealization.ts",
      "src/services/genesisProductionRecognitionRealityEntry.ts",
      "src/services/genesisRealityPresenceContinuityBridge.ts",
      "src/services/realityProductionRouteAuthorization.ts",
      "src/services/realityCoordinatePresenceVisualSourceProjection.ts",
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
  const runtime = await import(`file://${outPath}?projection=${Date.now()}`);
  runtime.clearRealUserGenesisVisualSourceContext();
  runtime.clearGenesisProductionRealityEntryContext();
  runtime.clearGenesisRealityPresenceContinuityContext();

  const sourceReferenceId = "launch:1995-06-02:酉时:广东:广州:reality-presence";
  const originResults = runtime.resolveLaunchOriginMotherSourceResults({
    birth: { year: 1995, month: 6, day: 2, hourBranch: "酉时" },
    periodIndex: 0,
    geo: { province: "广东", city: "广州" },
    starbeast: {
      nodeCount: 28,
      primaryNodeIndex: 0,
      originLightTrace: "28光兽入口",
    },
  });
  const lifeSession = runtime.createLaunchLifeSourceSession({
    sourceReferenceId,
    birthCoordinate: { year: 1995, month: 6, day: 2, hourBranch: "酉时" },
    ...originResults,
  });
  const visualResult = runtime.resolveLaunchLifeVisualSource(lifeSession.session);
  const visualContextResult = runtime.activateRealUserGenesisVisualSourceContext({
    lifeSourceSession: lifeSession.session,
    visualSourceAdapterInput: visualResult.input,
    visualSource: visualResult.visualSource,
  });
  assertEqual("real Genesis visual context is available", visualContextResult.status, "AVAILABLE");

  const genesisAuthorization = runtime.authorizeGenesisProductionRoute({
    routeTarget: "/genesis",
    sourceReferenceId,
  });
  let production = runtime.initializeGenesisProductionRuntime({
    routeAuthorization: genesisAuthorization,
  }).session;
  while (production.currentStage !== "COMPLETION") {
    production = runtime.advanceGenesisProductionRuntime({
      session: production,
      trigger:
        production.currentStage === "TIME_RESONANCE"
          ? "TIME_DELIVERY"
          : "AUTO_ADVANCE",
    }).session;
  }
  const bridge = visualResult.visualSource.projectionBundle.lifeForceManifestationBridge;
  const recognizedPresence = runtime.realizeGenesisStarBeastPresence({
    runtimeSession: production,
    lifeForceManifestationBridge: bridge,
    recognitionPhase: "RECOGNIZED",
  });
  const recognition = runtime.initializeGenesisProductionRecognitionRealityEntry(production);
  const recognitionConfirmed = runtime.advanceGenesisProductionRecognitionRealityEntry(
    recognition.session,
    "RECOGNITION_CONFIRM",
  );
  const realityEligible = runtime.advanceGenesisProductionRecognitionRealityEntry(
    recognitionConfirmed.session,
    "ENTER_REALITY",
  );
  const realityEntryContext = runtime.activateGenesisProductionRealityEntryContext(
    realityEligible.session,
  );
  const continuityContext = runtime.activateGenesisRealityPresenceContinuityContext({
    presenceRealization: recognizedPresence.realization,
    realityEntryContext,
  });
  assertEqual("recognized Presence reaches Reality continuity", continuityContext.bridge.continuityState, "CARRIED_TO_REALITY");
  const realityAuthorization = runtime.authorizeRealityProductionRoute({
    routeTarget: "/reality",
    sourceReferenceId,
  });
  assertEqual("Reality route is authorized", realityAuthorization.status, "READY");

  const projectionResult = runtime.projectRealityCoordinatePresenceVisualSource({
    realUserGenesisVisualSourceContext: visualContextResult.context,
    genesisPresenceContinuityContext: continuityContext,
    realityRouteAuthorization: realityAuthorization,
  });
  assertEqual("Reality Presence source projection is ready", projectionResult.status, "READY");
  const projection = projectionResult.projection;
  assertEqual("projection keeps real provenance", projection.sourceProvenance, "REAL_USER_SESSION");
  assertEqual("projection keeps recognized Presence", projection.presenceState, "RECOGNIZED");
  assertEqual("projection keeps Reality arrival", projection.arrivalState, "REALITY_APPROACHING");
  assertEqual("projection reuses exact visual source", projection.visualSource, visualResult.visualSource);
  assertEqual("projection reuses exact SceneModel", projection.sceneModel, visualResult.visualSource.sceneModel);
  assertEqual("projection reuses exact RenderPlan", projection.renderPlan, visualResult.visualSource.renderPlan);
  assertEqual("projection reuses exact RenderPlan result", projection.renderPlanResult, visualResult.visualSource.renderPlanResult);
  assertEqual("projection reuses exact ProjectionBundle", projection.projectionBundle, visualResult.visualSource.projectionBundle);
  assertEqual("manifestation reference stays continuous", projection.manifestationSourceReferenceId, continuityContext.bridge.manifestationSourceReferenceId);
  assertEqual("projection is immutable", Object.isFrozen(projection), true);
  assertEqual("projection does not invoke Renderer", projection.noRendererInvocation, true);
  assertEqual("projection does not mutate Pressure", projection.noPressureMutation, true);

  const missingContinuity = runtime.projectRealityCoordinatePresenceVisualSource({
    realUserGenesisVisualSourceContext: visualContextResult.context,
    genesisPresenceContinuityContext: null,
    realityRouteAuthorization: realityAuthorization,
  });
  assertEqual("missing Presence continuity stops projection", missingContinuity.status, "SOURCE_NOT_READY");
  const sourceMismatch = runtime.projectRealityCoordinatePresenceVisualSource({
    realUserGenesisVisualSourceContext: visualContextResult.context,
    genesisPresenceContinuityContext: continuityContext,
    realityRouteAuthorization: {
      ...realityAuthorization,
      sourceReferenceId: "launch:other-user",
    },
  });
  assertEqual("cross-session projection is blocked", sourceMismatch.status, "BLOCKED");
  assertEqual("cross-session reason is explicit", sourceMismatch.reason, "SOURCE_REFERENCE_MISMATCH");
  const manifestationMismatch = runtime.projectRealityCoordinatePresenceVisualSource({
    realUserGenesisVisualSourceContext: visualContextResult.context,
    genesisPresenceContinuityContext: {
      ...continuityContext,
      bridge: {
        ...continuityContext.bridge,
        manifestationSourceReferenceId: "manifestation:other",
      },
    },
    realityRouteAuthorization: realityAuthorization,
  });
  assertEqual("different StarBeast manifestation is blocked", manifestationMismatch.status, "BLOCKED");
  assertEqual("manifestation mismatch reason is explicit", manifestationMismatch.reason, "MANIFESTATION_SOURCE_REFERENCE_MISMATCH");

  console.log("\n[REALITY COORDINATE PRESENCE VISUAL SOURCE PROJECTION] PASS");
} catch (error) {
  console.error("[REALITY COORDINATE PRESENCE VISUAL SOURCE PROJECTION] FAIL");
  console.error(error instanceof Error ? error.message : error);
  process.exitCode = 1;
} finally {
  fs.rmSync(tempDir, { recursive: true, force: true });
}
