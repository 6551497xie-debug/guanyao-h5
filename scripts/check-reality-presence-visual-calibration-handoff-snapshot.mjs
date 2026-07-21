import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import process from "node:process";
import { build } from "esbuild";

const rootDir = process.cwd();
const paths = Object.freeze({
  type: "src/types/realityPresenceVisualCalibrationHandoffSnapshot.ts",
  service: "src/services/realityPresenceVisualCalibrationHandoffSnapshot.ts",
  realityEntry: "src/pages/RealityProductionRouteEntry.tsx",
  realityHost: "src/components/RealityProductionHost.tsx",
  renderer: "src/renderers/genesisWebGLRendererCore.ts",
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
  path.join(os.tmpdir(), "guanyao-reality-presence-calibration-handoff-"),
);

try {
  [
    "REALITY_PRESENCE_VISUAL_CALIBRATION_HANDOFF_SNAPSHOT",
    'runtimeStage: "COMPLETION"',
    'presenceState: "RECOGNIZED"',
    'handoffState: "READY_FOR_REALITY_PRESENCE_RENDERER_AUTHORIZATION"',
    "productionVisualCalibrationBundle",
    "fourSymbolDirectionFieldVisualCalibration",
    "lifeArchetypeForceCondensationVisualCalibration",
    "presenceVisualRealization",
    "presenceRecognitionContinuityActivation",
    "preserveExistingCalibrationObjectIdentity: true",
    "noCalibrationCopy: true",
    "noCalibrationMutation: true",
    "noRendererAuthorization: true",
    "noRouteIntegration: true",
  ].forEach((marker) =>
    assertIncludes("Reality calibration handoff contract", source.type, marker),
  );
  [
    "createRealityPresenceVisualCalibrationHandoffSnapshot",
    'production.runtimeStage !== "COMPLETION"',
    'production.genesisVisualRealization.activeVisualLayer !== "COMPLETION"',
    'production.genesisVisualRealization.visualExpressionMode !==',
    'direction.phase !== "ESTABLISHED"',
    'force.phase !== "ESTABLISHED"',
    'presence.visualPresenceState !== "RECOGNIZED"',
    'recognition.experienceState !== "PRESENCE_RECOGNIZED"',
    "SOURCE_REFERENCE_MISMATCH",
    "MANIFESTATION_SOURCE_REFERENCE_MISMATCH",
    "genesisVisualRealization: production.genesisVisualRealization",
    "fourSymbolDirectionFieldVisualCalibration: direction",
  ].forEach((marker) =>
    assertIncludes("Reality calibration handoff validation", source.service, marker),
  );
  [
    "resolveStarbeastFromBirthDate",
    "runFourSymbolEngine",
    "runMotherCodeLandingEngine",
    "createGenesisWebGLRendererCore",
    "createGenesisProductionRendererHost",
    "setTimeout",
    "Date.now",
    "Math.random",
    "localStorage",
    "sessionStorage",
  ].forEach((marker) =>
    assertExcludes(
      "snapshot owns no Engine Renderer timing fallback or storage",
      source.service,
      marker,
    ),
  );
  assertExcludes(
    "Reality route does not consume calibration snapshot yet",
    source.realityEntry,
    "RealityPresenceVisualCalibrationHandoffSnapshot",
  );
  assertExcludes(
    "Reality Host does not consume calibration snapshot yet",
    source.realityHost,
    "RealityPresenceVisualCalibrationHandoffSnapshot",
  );
  assertExcludes(
    "Renderer remains unchanged",
    source.renderer,
    "RealityPresenceVisualCalibrationHandoffSnapshot",
  );
  assertExcludes(
    "Engine remains unchanged",
    source.engine,
    "RealityPresenceVisualCalibrationHandoffSnapshot",
  );
  assertIncludes(
    "handoff snapshot type is exported",
    source.typeIndex,
    'from "./realityPresenceVisualCalibrationHandoffSnapshot"',
  );

  const packageJson = JSON.parse(source.packageManifest);
  assertEqual(
    "Reality Presence calibration handoff gate is registered",
    packageJson.scripts?.[
      "check-reality-presence-visual-calibration-handoff-snapshot"
    ],
    "node scripts/check-reality-presence-visual-calibration-handoff-snapshot.mjs",
  );

  const entryPath = path.join(tempDir, "calibration-handoff-entry.ts");
  const outPath = path.join(tempDir, "calibration-handoff-entry.mjs");
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
      "src/services/genesisProductionVisualCalibrationBridge.ts",
      "src/services/genesisFourSymbolDirectionFieldVisualCalibration.ts",
      "src/services/genesisLifeArchetypeForceCondensationVisualCalibration.ts",
      "src/services/realityPresenceVisualCalibrationHandoffSnapshot.ts",
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
  const runtime = await import(`file://${outPath}?handoff=${Date.now()}`);
  runtime.clearRealUserGenesisVisualSourceContext();

  const sourceReferenceId =
    "launch:1995-06-02:酉时:广东:广州:reality-calibration-handoff";
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
  runtime.activateRealUserGenesisVisualSourceContext({
    lifeSourceSession: lifeSession.session,
    visualSourceAdapterInput: visualResult.input,
    visualSource: visualResult.visualSource,
  });
  const routeAuthorization = runtime.authorizeGenesisProductionRoute({
    routeTarget: "/genesis",
    sourceReferenceId,
  });
  let production = runtime.initializeGenesisProductionRuntime({
    routeAuthorization,
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
  assertEqual("explicit Presence recognition is ready", recognitionContinuity.status, "READY");

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
  const input = Object.freeze({
    productionVisualCalibrationBundle: productionCalibration.bundle,
    fourSymbolDirectionFieldVisualCalibration:
      directionCalibration.calibration,
    lifeArchetypeForceCondensationVisualCalibration:
      forceCalibration.calibration,
    presenceVisualRealization: recognizedPresence.realization,
    presenceRecognitionContinuityActivation:
      recognitionContinuity.activation,
  });
  const result =
    runtime.createRealityPresenceVisualCalibrationHandoffSnapshot(input);
  assertEqual("Reality Presence calibration handoff is ready", result.status, "READY");
  const snapshot = result.snapshot;
  assertEqual("handoff keeps real user provenance", snapshot.sourceProvenance, "REAL_USER_SESSION");
  assertEqual("handoff freezes Completion state", snapshot.runtimeStage, "COMPLETION");
  assertEqual("handoff freezes recognized Presence", snapshot.presenceState, "RECOGNIZED");
  assertEqual("handoff is ready only for later authorization", snapshot.handoffState, "READY_FOR_REALITY_PRESENCE_RENDERER_AUTHORIZATION");
  assertEqual("handoff reuses exact production bundle", snapshot.productionVisualCalibrationBundle, productionCalibration.bundle);
  assertEqual("handoff reuses exact visual realization", snapshot.genesisVisualRealization, productionCalibration.bundle.genesisVisualRealization);
  assertEqual("handoff reuses exact perspective calibration", snapshot.genesisPerspectiveCalibration, productionCalibration.bundle.genesisPerspectiveCalibration);
  assertEqual("handoff reuses exact recognition calibration", snapshot.genesisPresenceRecognitionCalibration, productionCalibration.bundle.genesisPresenceRecognitionCalibration);
  assertEqual("handoff reuses exact spatial calibration", snapshot.genesisSpatialDistanceCalibration, productionCalibration.bundle.genesisSpatialDistanceCalibration);
  assertEqual("handoff reuses exact direction calibration", snapshot.fourSymbolDirectionFieldVisualCalibration, directionCalibration.calibration);
  assertEqual("handoff reuses exact force calibration", snapshot.lifeArchetypeForceCondensationVisualCalibration, forceCalibration.calibration);
  assertEqual("handoff reuses exact Presence realization", snapshot.presenceVisualRealization, recognizedPresence.realization);
  assertEqual("handoff reuses exact recognition continuity", snapshot.presenceRecognitionContinuityActivation, recognitionContinuity.activation);
  assertEqual("handoff snapshot is immutable", Object.isFrozen(snapshot), true);
  assertEqual("handoff does not authorize Renderer", snapshot.noRendererAuthorization, true);
  assertEqual("handoff does not integrate Route", snapshot.noRouteIntegration, true);

  const missingProduction =
    runtime.createRealityPresenceVisualCalibrationHandoffSnapshot({
      ...input,
      productionVisualCalibrationBundle: null,
    });
  assertEqual("missing Production calibration is not ready", missingProduction.status, "SOURCE_NOT_READY");
  const wrongStage =
    runtime.createRealityPresenceVisualCalibrationHandoffSnapshot({
      ...input,
      productionVisualCalibrationBundle: Object.freeze({
        ...productionCalibration.bundle,
        runtimeStage: "STAR_BEAST_REVEAL",
      }),
    });
  assertEqual("non-Completion calibration is blocked", wrongStage.status, "BLOCKED");
  assertEqual("non-Completion reason is explicit", wrongStage.reason, "GENESIS_COMPLETION_CALIBRATION_INVALID");
  const sourceMismatch =
    runtime.createRealityPresenceVisualCalibrationHandoffSnapshot({
      ...input,
      fourSymbolDirectionFieldVisualCalibration: Object.freeze({
        ...directionCalibration.calibration,
        sourceReferenceId: "launch:other-user",
      }),
    });
  assertEqual("cross-session calibration is blocked", sourceMismatch.status, "BLOCKED");
  assertEqual("cross-session reason is explicit", sourceMismatch.reason, "SOURCE_REFERENCE_MISMATCH");
  const manifestationMismatch =
    runtime.createRealityPresenceVisualCalibrationHandoffSnapshot({
      ...input,
      presenceRecognitionContinuityActivation: Object.freeze({
        ...recognitionContinuity.activation,
        manifestationSourceReferenceId: "manifestation:other",
      }),
    });
  assertEqual("different manifestation is blocked", manifestationMismatch.status, "BLOCKED");
  assertEqual("manifestation mismatch reason is explicit", manifestationMismatch.reason, "MANIFESTATION_SOURCE_REFERENCE_MISMATCH");

  console.log("\n[REALITY PRESENCE VISUAL CALIBRATION HANDOFF SNAPSHOT] PASS");
} catch (error) {
  console.error("[REALITY PRESENCE VISUAL CALIBRATION HANDOFF SNAPSHOT] FAIL");
  console.error(error instanceof Error ? error.message : error);
  process.exitCode = 1;
} finally {
  fs.rmSync(tempDir, { recursive: true, force: true });
}
