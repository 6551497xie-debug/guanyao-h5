import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import process from "node:process";
import { build } from "esbuild";

const rootDir = process.cwd();
const paths = Object.freeze({
  type: "src/types/genesisPresenceRecognitionContinuityActivation.ts",
  service: "src/services/genesisPresenceRecognitionContinuityActivation.ts",
  experienceType: "src/types/genesisManifestationExperienceState.ts",
  experience: "src/services/genesisManifestationExperienceState.ts",
  page: "src/pages/GenesisProductionExperiencePage.tsx",
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
  path.join(os.tmpdir(), "guanyao-genesis-presence-recognition-"),
);

try {
  [
    "GENESIS_PRESENCE_RECOGNITION_CONTINUITY_ACTIVATION",
    'experienceState: "PRESENCE_RECOGNIZED"',
    'previousExperienceState: "PRESENCE_APPROACHING"',
    'visualPresenceState: "RECOGNIZED"',
    'sourcePresenceState: "DORMANT"',
    'recognitionConfirmed: true',
    'recognitionMeaning: "RECOGNIZES_EXISTING_PRESENCE"',
    "noAutomaticRecognition: true",
    "noRealityEntry: true",
  ].forEach((marker) =>
    assertIncludes("recognition continuity contract", source.type, marker),
  );
  [
    "activateGenesisPresenceRecognitionContinuity",
    'experience.currentState !== "PRESENCE_RECOGNIZED"',
    'experience.previousState !== "PRESENCE_APPROACHING"',
    'presence.visualPresenceState !== "RECOGNIZED"',
    'recognition.phase !== "AWAITING_REALITY_ENTRY_CONFIRMATION"',
    "recognition.recognitionConfirmed !== true",
    "explicitRecognitionConfirmed: true",
  ].forEach((marker) =>
    assertIncludes("recognition continuity validation", source.service, marker),
  );
  [
    'trigger === "RECOGNITION_CONFIRM"',
    "explicitRecognitionOnlyCompletionAction: true",
  ].forEach((marker) =>
    assertIncludes("experience requires explicit recognition", source.experience, marker),
  );
  assertIncludes(
    "experience trigger contract exposes explicit recognition",
    source.experienceType,
    '| "RECOGNITION_CONFIRM"',
  );
  assertExcludes(
    "experience trigger no longer recognizes on hold",
    source.experienceType,
    '| "RECOGNITION_HOLD"',
  );
  [
    "activateGenesisPresenceRecognitionContinuity",
    'trigger: "RECOGNITION_CONFIRM"',
    'recognitionPhase: "RECOGNIZED"',
    'data-genesis-presence-recognition-continuity="READY"',
    "presenceRecognitionContinuityResult?.status !== \"READY\"",
  ].forEach((marker) =>
    assertIncludes("production page activates explicit recognition", source.page, marker),
  );
  [
    "resolveStarbeastFromBirthDate",
    "runFourSymbolEngine",
    "runMotherCodeLandingEngine",
    "createGenesisWebGLRendererCore",
    "setTimeout",
    "Date.now",
    "Math.random",
  ].forEach((marker) =>
    assertExcludes("recognition continuity owns no Engine Renderer or timing", source.service, marker),
  );
  assertExcludes("Production Host remains unchanged", source.host, "PresenceRecognitionContinuity");
  assertExcludes("Renderer remains unchanged", source.renderer, "PresenceRecognitionContinuity");
  assertExcludes("Engine remains unchanged", source.engine, "PresenceRecognitionContinuity");

  const packageJson = JSON.parse(source.packageManifest);
  assertEqual(
    "recognition continuity gate is registered",
    packageJson.scripts?.["check-genesis-presence-recognition-continuity-activation"],
    "node scripts/check-genesis-presence-recognition-continuity-activation.mjs",
  );

  const entryPath = path.join(tempDir, "presence-recognition-entry.ts");
  const outPath = path.join(tempDir, "presence-recognition-entry.mjs");
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
  let production = runtime.initializeGenesisProductionRuntime({ routeAuthorization }).session;
  const bridge = visualResult.visualSource.projectionBundle.lifeForceManifestationBridge;
  let experience = runtime.initializeGenesisManifestationExperienceState({
    runtimeSession: production,
    lifeForceManifestationBridge: bridge,
  }).session;
  production = runtime.advanceGenesisProductionRuntime({ session: production, trigger: "AUTO_ADVANCE" }).session;
  production = runtime.advanceGenesisProductionRuntime({ session: production, trigger: "AUTO_ADVANCE" }).session;
  experience = runtime.advanceGenesisManifestationExperienceState({ session: experience, runtimeSession: production, lifeForceManifestationBridge: bridge, trigger: "TIME_DELIVERY" }).session;
  production = runtime.advanceGenesisProductionRuntime({ session: production, trigger: "TIME_DELIVERY" }).session;
  for (let index = 0; index < 2; index += 1) {
    experience = runtime.advanceGenesisManifestationExperienceState({ session: experience, runtimeSession: production, lifeForceManifestationBridge: bridge, trigger: "AUTO_ADVANCE" }).session;
  }
  for (let index = 0; index < 3; index += 1) {
    production = runtime.advanceGenesisProductionRuntime({ session: production, trigger: "AUTO_ADVANCE" }).session;
    experience = runtime.advanceGenesisManifestationExperienceState({ session: experience, runtimeSession: production, lifeForceManifestationBridge: bridge, trigger: "AUTO_ADVANCE" }).session;
  }
  assertEqual("experience reaches Presence Approaching", experience.currentState, "PRESENCE_APPROACHING");
  production = runtime.advanceGenesisProductionRuntime({ session: production, trigger: "AUTO_ADVANCE" }).session;
  assertEqual("runtime reaches Completion", production.currentStage, "COMPLETION");
  const recognitionInitialized = runtime.initializeGenesisProductionRecognitionRealityEntry(production);
  const present = runtime.realizeGenesisStarBeastPresence({
    runtimeSession: production,
    lifeForceManifestationBridge: bridge,
    recognitionPhase: "RECOGNITION_HOLD",
  });
  assertEqual("presence is present before recognition", present.realization.visualPresenceState, "PRESENT");
  const premature = runtime.advanceGenesisManifestationExperienceState({
    session: experience,
    runtimeSession: production,
    lifeForceManifestationBridge: bridge,
    trigger: "AUTO_ADVANCE",
  });
  assertEqual("automatic recognition is blocked", premature.status, "BLOCKED");
  const beforeConfirmation = runtime.activateGenesisPresenceRecognitionContinuity({
    manifestationExperienceSession: experience,
    presenceVisualRealization: present.realization,
    recognitionRealitySession: recognitionInitialized.session,
  });
  assertEqual("present is not recognized", beforeConfirmation.status, "BLOCKED");

  const recognitionConfirmed = runtime.advanceGenesisProductionRecognitionRealityEntry(
    recognitionInitialized.session,
    "RECOGNITION_CONFIRM",
  );
  const experienceRecognized = runtime.advanceGenesisManifestationExperienceState({
    session: experience,
    runtimeSession: production,
    lifeForceManifestationBridge: bridge,
    trigger: "RECOGNITION_CONFIRM",
  });
  const presenceRecognized = runtime.realizeGenesisStarBeastPresence({
    runtimeSession: production,
    lifeForceManifestationBridge: bridge,
    recognitionPhase: "RECOGNIZED",
  });
  const continuity = runtime.activateGenesisPresenceRecognitionContinuity({
    manifestationExperienceSession: experienceRecognized.session,
    presenceVisualRealization: presenceRecognized.realization,
    recognitionRealitySession: recognitionConfirmed.session,
  });
  assertEqual("recognition continuity is ready", continuity.status, "READY");
  assertEqual("experience is explicitly recognized", continuity.activation.experienceState, "PRESENCE_RECOGNIZED");
  assertEqual("visual presence is recognized", continuity.activation.visualPresenceState, "RECOGNIZED");
  assertEqual("source presence remains dormant", continuity.activation.sourcePresenceState, "DORMANT");
  assertEqual("recognition is explicit", continuity.activation.recognitionConfirmed, true);
  assertEqual("continuity does not enter Reality", continuity.activation.noRealityEntry, true);
  assertEqual("continuity activation is immutable", Object.isFrozen(continuity.activation), true);

  const mismatch = runtime.activateGenesisPresenceRecognitionContinuity({
    manifestationExperienceSession: experienceRecognized.session,
    presenceVisualRealization: presenceRecognized.realization,
    recognitionRealitySession: {
      ...recognitionConfirmed.session,
      sourceReferenceId: "launch:other-user",
    },
  });
  assertEqual("mismatched user cannot recognize", mismatch.status, "BLOCKED");
  assertEqual("mismatched source reason", mismatch.reason, "SOURCE_REFERENCE_MISMATCH");

  console.log("\n[GENESIS PRESENCE RECOGNITION CONTINUITY ACTIVATION] PASS");
} catch (error) {
  console.error("[GENESIS PRESENCE RECOGNITION CONTINUITY ACTIVATION] FAIL");
  console.error(error instanceof Error ? error.message : error);
  process.exitCode = 1;
} finally {
  fs.rmSync(tempDir, { recursive: true, force: true });
}
