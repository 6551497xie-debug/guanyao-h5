import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import process from "node:process";
import { build } from "esbuild";

const rootDir = process.cwd();
const paths = Object.freeze({
  type: "src/types/realityPresenceRendererAuthorization.ts",
  service: "src/services/realityPresenceRendererAuthorization.ts",
  realityEntry: "src/pages/RealityProductionRouteEntry.tsx",
  realityHost: "src/components/RealityProductionHost.tsx",
  genesisHost: "src/renderers/genesisProductionRendererHost.ts",
  rendererCore: "src/renderers/genesisWebGLRendererCore.ts",
  engine: "src/services/guanyaoStarbeastEngineService.ts",
  routes: "src/routes/guanyaoRoutes.ts",
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
  path.join(os.tmpdir(), "guanyao-reality-presence-renderer-authorization-"),
);

try {
  [
    "RealityPresenceProductionRendererHostAuthorization",
    'authorizationId: "GUANYAO_REALITY_PRESENCE_PRODUCTION_RENDERER_AUTHORIZATION_V1"',
    'classification: "PRODUCTION"',
    'authorizedTarget: "REALITY_PRESENCE_PRODUCTION_RENDERER_HOST"',
    'authorizedRendererCore: "GENESIS_WEBGL_RENDERER_CORE"',
    'authorizedSourceMode: "REAL_USER_EXPERIENCE"',
    'authorizedSourceProvenance: "REAL_USER_SESSION"',
    'authorizedPresenceState: "RECOGNIZED"',
    'authorizedRealityArrivalState: "REALITY_APPROACHING"',
    'hostEligibility: "ELIGIBLE"',
    'routeIntegrationStatus: "NOT_AUTHORIZED_IN_THIS_CONTRACT"',
    'rendererInvocationStatus: "NOT_STARTED"',
    "productionHostEligibilityOnly: true",
    "noRendererHostImplementation: true",
    "noRouteIntegration: true",
  ].forEach((marker) =>
    assertIncludes("Reality Presence Renderer authorization contract", source.type, marker),
  );
  [
    "authorizeRealityPresenceRenderer",
    "PRESENCE_VISUAL_SOURCE_PROJECTION_REQUIRED",
    "VISUAL_CALIBRATION_HANDOFF_SNAPSHOT_REQUIRED",
    'projection.presenceState !== "RECOGNIZED"',
    'projection.arrivalState !== "REALITY_APPROACHING"',
    'snapshot.runtimeStage !== "COMPLETION"',
    'snapshot.presenceState !== "RECOGNIZED"',
    "SOURCE_REFERENCE_MISMATCH",
    "MANIFESTATION_SOURCE_REFERENCE_MISMATCH",
    "FORBIDDEN_SOURCE_REFERENCE",
    'authorizedTarget: "REALITY_PRESENCE_PRODUCTION_RENDERER_HOST"',
    'rendererInvocationStatus: "NOT_STARTED"',
  ].forEach((marker) =>
    assertIncludes("Reality Presence Renderer authorization validation", source.service, marker),
  );
  [
    "resolveStarbeastFromBirthDate",
    "runFourSymbolEngine",
    "runMotherCodeLandingEngine",
    "createGenesisWebGLRendererCore",
    "createGenesisProductionRendererHost",
    "requestAnimationFrame",
    "setTimeout",
    "Date.now",
    "Math.random",
    "localStorage",
    "sessionStorage",
  ].forEach((marker) =>
    assertExcludes(
      "authorization owns no Engine Renderer timing or storage",
      source.service,
      marker,
    ),
  );
  ["sceneModel:", "renderPlan:", "canvas:", "userData:"].forEach((marker) =>
    assertExcludes("authorization carries no render or user payload", source.service, marker),
  );
  assertExcludes(
    "Reality route does not consume Renderer authorization yet",
    source.realityEntry,
    "RealityPresenceRendererAuthorization",
  );
  assertExcludes(
    "Reality Host does not consume Renderer authorization yet",
    source.realityHost,
    "RealityPresenceRendererAuthorization",
  );
  assertExcludes(
    "Genesis Host remains unchanged",
    source.genesisHost,
    "RealityPresenceRendererAuthorization",
  );
  assertExcludes(
    "Renderer Core remains unchanged",
    source.rendererCore,
    "RealityPresenceRendererAuthorization",
  );
  assertExcludes(
    "Engine remains unchanged",
    source.engine,
    "RealityPresenceRendererAuthorization",
  );
  assertExcludes(
    "Routes remain unchanged",
    source.routes,
    "REALITY_PRESENCE_PRODUCTION_RENDERER_HOST",
  );
  assertIncludes(
    "Reality Presence Renderer authorization type is exported",
    source.typeIndex,
    'from "./realityPresenceRendererAuthorization"',
  );

  const packageJson = JSON.parse(source.packageManifest);
  assertEqual(
    "Reality Presence Renderer authorization gate is registered",
    packageJson.scripts?.["check-reality-presence-renderer-authorization"],
    "node scripts/check-reality-presence-renderer-authorization.mjs",
  );

  const entryPath = path.join(tempDir, "renderer-authorization-entry.ts");
  const outPath = path.join(tempDir, "renderer-authorization-entry.mjs");
  fs.writeFileSync(
    entryPath,
    [
      "src/services/guanyaoLaunchOriginMotherInputAdapter.ts",
      "src/services/launchLifeSourceSession.ts",
      "src/services/launchLifeVisualSourceResolver.ts",
      "src/services/realUserGenesisVisualSourceContext.ts",
      "src/services/genesisProductionRouteAuthorization.ts",
      "src/services/genesisProductionRuntimeConsumer.ts",
      "src/services/genesisManifestationExperienceState.ts",
      "src/services/genesisStarBeastPresenceVisualRealization.ts",
      "src/services/genesisProductionRecognitionRealityEntry.ts",
      "src/services/genesisPresenceRecognitionContinuityActivation.ts",
      "src/services/genesisRealityPresenceContinuityBridge.ts",
      "src/services/realityProductionRouteAuthorization.ts",
      "src/services/realityCoordinatePresenceVisualSourceProjection.ts",
      "src/services/genesisProductionVisualCalibrationBridge.ts",
      "src/services/genesisFourSymbolDirectionFieldVisualCalibration.ts",
      "src/services/genesisLifeArchetypeForceCondensationVisualCalibration.ts",
      "src/services/realityPresenceVisualCalibrationHandoffSnapshot.ts",
      "src/services/realityPresenceRendererAuthorization.ts",
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
  const runtime = await import(`file://${outPath}?authorization=${Date.now()}`);
  runtime.clearRealUserGenesisVisualSourceContext();
  runtime.clearGenesisProductionRealityEntryContext();
  runtime.clearGenesisRealityPresenceContinuityContext();

  const sourceReferenceId =
    "launch:1995-06-02:酉时:广东:广州:reality-renderer-authorization";
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
  const visualContext = runtime.activateRealUserGenesisVisualSourceContext({
    lifeSourceSession: lifeSession.session,
    visualSourceAdapterInput: visualResult.input,
    visualSource: visualResult.visualSource,
  });
  const genesisRouteAuthorization = runtime.authorizeGenesisProductionRoute({
    routeTarget: "/genesis",
    sourceReferenceId,
  });
  let production = runtime.initializeGenesisProductionRuntime({
    routeAuthorization: genesisRouteAuthorization,
  }).session;
  const projectionBundle = visualResult.visualSource.projectionBundle;
  const manifestationBridge = projectionBundle.lifeForceManifestationBridge;
  let experience = runtime.initializeGenesisManifestationExperienceState({
    runtimeSession: production,
    lifeForceManifestationBridge: manifestationBridge,
  }).session;

  production = runtime.advanceGenesisProductionRuntime({
    session: production,
    trigger: "AUTO_ADVANCE",
  }).session;
  production = runtime.advanceGenesisProductionRuntime({
    session: production,
    trigger: "AUTO_ADVANCE",
  }).session;
  experience = runtime.advanceGenesisManifestationExperienceState({
    session: experience,
    runtimeSession: production,
    lifeForceManifestationBridge: manifestationBridge,
    trigger: "TIME_DELIVERY",
  }).session;
  production = runtime.advanceGenesisProductionRuntime({
    session: production,
    trigger: "TIME_DELIVERY",
  }).session;
  for (let index = 0; index < 2; index += 1) {
    experience = runtime.advanceGenesisManifestationExperienceState({
      session: experience,
      runtimeSession: production,
      lifeForceManifestationBridge: manifestationBridge,
      trigger: "AUTO_ADVANCE",
    }).session;
  }
  for (let index = 0; index < 3; index += 1) {
    production = runtime.advanceGenesisProductionRuntime({
      session: production,
      trigger: "AUTO_ADVANCE",
    }).session;
    experience = runtime.advanceGenesisManifestationExperienceState({
      session: experience,
      runtimeSession: production,
      lifeForceManifestationBridge: manifestationBridge,
      trigger: "AUTO_ADVANCE",
    }).session;
  }
  production = runtime.advanceGenesisProductionRuntime({
    session: production,
    trigger: "AUTO_ADVANCE",
  }).session;
  assertEqual("Genesis runtime reaches Completion", production.currentStage, "COMPLETION");

  const recognitionInitialized =
    runtime.initializeGenesisProductionRecognitionRealityEntry(production);
  const recognitionConfirmed =
    runtime.advanceGenesisProductionRecognitionRealityEntry(
      recognitionInitialized.session,
      "RECOGNITION_CONFIRM",
    );
  const experienceRecognized =
    runtime.advanceGenesisManifestationExperienceState({
      session: experience,
      runtimeSession: production,
      lifeForceManifestationBridge: manifestationBridge,
      trigger: "RECOGNITION_CONFIRM",
    });
  const recognizedPresence = runtime.realizeGenesisStarBeastPresence({
    runtimeSession: production,
    lifeForceManifestationBridge: manifestationBridge,
    recognitionPhase: "RECOGNIZED",
  });
  const recognitionContinuity =
    runtime.activateGenesisPresenceRecognitionContinuity({
      manifestationExperienceSession: experienceRecognized.session,
      presenceVisualRealization: recognizedPresence.realization,
      recognitionRealitySession: recognitionConfirmed.session,
    });

  const productionCalibration =
    runtime.bridgeGenesisProductionRuntimeToVisualCalibration(production);
  const directionCalibration =
    runtime.calibrateGenesisFourSymbolDirectionField({
      lifeDirectionProjection:
        projectionBundle.fourSymbolLifeDirectionProjection,
      activeVisualLayer:
        productionCalibration.bundle.genesisVisualRealization.activeVisualLayer,
    });
  const forceCalibration =
    runtime.calibrateGenesisLifeArchetypeForceCondensation({
      lifeArchetypeProjection: projectionBundle.lifeArchetypeProjection,
      directionFieldCalibration: directionCalibration.calibration,
      activeVisualLayer:
        productionCalibration.bundle.genesisVisualRealization.activeVisualLayer,
    });
  const calibrationSnapshot =
    runtime.createRealityPresenceVisualCalibrationHandoffSnapshot({
      productionVisualCalibrationBundle: productionCalibration.bundle,
      fourSymbolDirectionFieldVisualCalibration:
        directionCalibration.calibration,
      lifeArchetypeForceCondensationVisualCalibration:
        forceCalibration.calibration,
      presenceVisualRealization: recognizedPresence.realization,
      presenceRecognitionContinuityActivation:
        recognitionContinuity.activation,
    });
  assertEqual("calibration handoff snapshot is ready", calibrationSnapshot.status, "READY");

  const realityEligible =
    runtime.advanceGenesisProductionRecognitionRealityEntry(
      recognitionConfirmed.session,
      "ENTER_REALITY",
    );
  const realityEntryContext =
    runtime.activateGenesisProductionRealityEntryContext(
      realityEligible.session,
    );
  const presenceContinuityContext =
    runtime.activateGenesisRealityPresenceContinuityContext({
      presenceRealization: recognizedPresence.realization,
      realityEntryContext,
    });
  const realityRouteAuthorization = runtime.authorizeRealityProductionRoute({
    routeTarget: "/reality",
    sourceReferenceId,
  });
  const sourceProjection =
    runtime.projectRealityCoordinatePresenceVisualSource({
      realUserGenesisVisualSourceContext: visualContext.context,
      genesisPresenceContinuityContext: presenceContinuityContext,
      realityRouteAuthorization,
    });
  assertEqual("Reality Presence source projection is ready", sourceProjection.status, "READY");

  const input = Object.freeze({
    presenceVisualSourceProjection: sourceProjection.projection,
    visualCalibrationHandoffSnapshot: calibrationSnapshot.snapshot,
  });
  const result = runtime.authorizeRealityPresenceRenderer(input);
  assertEqual("Reality Presence Renderer authorization is ready", result.status, "READY");
  assertEqual("authorization is Production", result.authorization.classification, "PRODUCTION");
  assertEqual("authorization targets separate Reality Host", result.authorization.authorizedTarget, "REALITY_PRESENCE_PRODUCTION_RENDERER_HOST");
  assertEqual("authorization reuses shared Core", result.authorization.authorizedRendererCore, "GENESIS_WEBGL_RENDERER_CORE");
  assertEqual("authorization keeps real provenance", result.authorization.authorizedSourceProvenance, "REAL_USER_SESSION");
  assertEqual("authorization keeps source reference", result.authorization.authorizedSourceReferenceId, sourceReferenceId);
  assertEqual("authorization keeps manifestation reference", result.authorization.authorizedManifestationSourceReferenceId, sourceProjection.projection.manifestationSourceReferenceId);
  assertEqual("authorization keeps recognized Presence", result.authorization.authorizedPresenceState, "RECOGNIZED");
  assertEqual("authorization is Host eligible", result.authorization.hostEligibility, "ELIGIBLE");
  assertEqual("authorization does not integrate Route", result.authorization.routeIntegrationStatus, "NOT_AUTHORIZED_IN_THIS_CONTRACT");
  assertEqual("authorization does not start Renderer", result.authorization.rendererInvocationStatus, "NOT_STARTED");
  assertEqual("authorization is immutable", Object.isFrozen(result.authorization), true);

  const missingSource = runtime.authorizeRealityPresenceRenderer({
    ...input,
    presenceVisualSourceProjection: null,
  });
  assertEqual("missing source projection is not ready", missingSource.status, "SOURCE_NOT_READY");
  const missingSnapshot = runtime.authorizeRealityPresenceRenderer({
    ...input,
    visualCalibrationHandoffSnapshot: null,
  });
  assertEqual("missing calibration snapshot is not ready", missingSnapshot.status, "SOURCE_NOT_READY");
  const sourceMismatch = runtime.authorizeRealityPresenceRenderer({
    ...input,
    visualCalibrationHandoffSnapshot: Object.freeze({
      ...calibrationSnapshot.snapshot,
      sourceReferenceId: "launch:other-user",
    }),
  });
  assertEqual("cross-session authorization is blocked", sourceMismatch.status, "BLOCKED");
  assertEqual("cross-session reason is explicit", sourceMismatch.guardReason, "SOURCE_REFERENCE_MISMATCH");
  const manifestationMismatch = runtime.authorizeRealityPresenceRenderer({
    ...input,
    visualCalibrationHandoffSnapshot: Object.freeze({
      ...calibrationSnapshot.snapshot,
      manifestationSourceReferenceId: "manifestation:other",
    }),
  });
  assertEqual("different manifestation is blocked", manifestationMismatch.status, "BLOCKED");
  assertEqual("manifestation mismatch reason is explicit", manifestationMismatch.guardReason, "MANIFESTATION_SOURCE_REFERENCE_MISMATCH");
  const fixtureAttempt = runtime.authorizeRealityPresenceRenderer({
    presenceVisualSourceProjection: Object.freeze({
      ...sourceProjection.projection,
      sourceReferenceId: "fixture:case-a",
    }),
    visualCalibrationHandoffSnapshot: Object.freeze({
      ...calibrationSnapshot.snapshot,
      sourceReferenceId: "fixture:case-a",
    }),
  });
  assertEqual("fixture source is blocked", fixtureAttempt.status, "BLOCKED");
  assertEqual("fixture reason is explicit", fixtureAttempt.guardReason, "FORBIDDEN_SOURCE_REFERENCE");

  console.log("\n[REALITY PRESENCE RENDERER AUTHORIZATION] PASS");
} catch (error) {
  console.error("[REALITY PRESENCE RENDERER AUTHORIZATION] FAIL");
  console.error(error instanceof Error ? error.message : error);
  process.exitCode = 1;
} finally {
  fs.rmSync(tempDir, { recursive: true, force: true });
}
