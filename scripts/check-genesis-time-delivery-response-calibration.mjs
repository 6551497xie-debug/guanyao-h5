import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import process from "node:process";
import { build } from "esbuild";

const rootDir = process.cwd();
const paths = Object.freeze({
  protocol: "docs/GUANYAO_GENESIS_TIME_RESONANCE_VISUAL_CALIBRATION_PROTOCOL.md",
  type: "src/types/genesisTimeDeliveryResponseCalibration.ts",
  service: "src/services/genesisTimeDeliveryResponseCalibration.ts",
  page: "src/pages/GenesisProductionExperiencePage.tsx",
  styles: "src/styles/genesis-production-experience.css",
  runtime: "src/services/genesisProductionRuntimeConsumer.ts",
  experience: "src/services/genesisManifestationExperienceState.ts",
  bridge: "src/services/genesisLifeForceManifestationBridge.ts",
  realityContinuity: "src/services/genesisRealityPresenceContinuityBridge.ts",
  host: "src/renderers/genesisProductionRendererHost.ts",
  renderer: "src/renderers/genesisWebGLRendererCore.ts",
  packageManifest: "package.json",
});
const source = Object.fromEntries(Object.entries(paths).map(([name, file]) => [name, fs.readFileSync(path.join(rootDir, file), "utf8")]));
const tempDir = fs.mkdtempSync(path.join(os.tmpdir(), "guanyao-genesis-time-delivery-response-"));
const assertEqual = (name, actual, expected) => {
  if (actual !== expected) throw new Error(`${name} expected=${String(expected)} actual=${String(actual)}`);
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
    "LIFE_TIME_DELIVERED_TO_STARS",
    "MOONLIGHT_GATHERS_TO_TIME",
    "STELLAR_RHYTHM_RESPONDS",
    "TEMPORAL_MOMENT_STABILIZED",
    "不是表单提交、数据读取或计算结果展示",
  ].forEach((marker) => assertIncludes("time resonance protocol", source.protocol, marker));
  [
    "GenesisTimeDeliveryResponseCalibration",
    "TIME_ACCEPTED",
    "COORDINATE_SEEKING",
    "STAR_RIVER_RESPONDS",
    "FIND_MY_POSITION",
    "MOONLIGHT_GATHERS_TO_TIME",
    "STELLAR_RHYTHM_RESPONDS",
    "TEMPORAL_MOMENT_STABILIZED",
    "noRendererParameterMutation: true",
    "noTimelineSpeedMutation: true",
    "noSourceMutation: true",
  ].forEach((marker) => assertIncludes("response calibration contract", source.type, marker));
  [
    "calibrateGenesisTimeDeliveryResponse",
    "TIME_RESONANCE",
    "TIME_DELIVERY",
    "acceptedExperienceSession",
    "experience.currentState !== \"TIME_ACCEPTED\"",
    "experience.nextState !== \"COORDINATE_SEEKING\"",
    "bridge.provenance.sourceKind !== \"REAL_ENGINE_RESULT\"",
    "responseMessage: \"星河回应：你的时间已进入时序。\"",
    "noRendererParameterMutation: true",
    "noTimelineSpeedMutation: true",
    "noFallback: true",
  ].forEach((marker) => assertIncludes("response calibration service", source.service, marker));
  [
    "calibrateGenesisTimeDeliveryResponse",
    "advanceGenesisManifestationExperienceState",
    "acceptedExperienceSession: acceptedExperienceResult.session",
    "data-genesis-time-delivery-response",
    "data-genesis-manifestation-experience-state",
    "timeDeliveryResponse.responseMessage",
    "timeDeliveryResponse.seekingMessage",
  ].forEach((marker) => assertIncludes("production page consumes response calibration", source.page, marker));
  [
    ".gy-genesis-production-experience__time-response",
    "pointer-events: none",
  ].forEach((marker) => assertIncludes("time response remains presentation-only", source.styles, marker));
  [
    "resolveStarbeastFromBirthDate",
    "runFourSymbolEngine",
    "runMotherCodeLandingEngine",
    "createGenesisWebGLRendererCore",
    "setTimeout",
    "GENESIS_FROZEN_STAGE_HOLD_MS",
  ].forEach((marker) => assertExcludes("response calibration service does not mutate timing or render", source.service, marker));
  assertExcludes("response calibration does not alter Renderer Host", source.host, "GenesisTimeDeliveryResponseCalibration");
  assertExcludes("response calibration does not alter WebGL Core", source.renderer, "GenesisTimeDeliveryResponseCalibration");
  assertExcludes("response calibration does not alter Runtime", source.runtime, "GenesisTimeDeliveryResponseCalibration");
  assertExcludes("response calibration does not alter Reality continuity", source.realityContinuity, "GenesisTimeDeliveryResponseCalibration");
  assertIncludes("TIME_DELIVERY remains the only experience user action", source.experience, "timeDeliveryOnlyUserAction: true");
  assertIncludes("Dormant waits for explicit delivery", source.experience, 'session.currentState === "DORMANT" && input.trigger !== "TIME_DELIVERY"');

  const packageJson = JSON.parse(source.packageManifest);
  assertEqual(
    "response calibration gate is registered",
    packageJson.scripts?.["check-genesis-time-delivery-response-calibration"],
    "node scripts/check-genesis-time-delivery-response-calibration.mjs",
  );

  const entryPath = path.join(tempDir, "response-entry.ts");
  const outPath = path.join(tempDir, "response-entry.mjs");
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
      "src/services/genesisTimeDeliveryResponseCalibration.ts",
      "src/services/genesisLifeForceManifestationBridge.ts",
      "src/services/genesisStarBeastManifestationSource.ts",
      "src/services/genesisLifeArchetypeProjection.ts",
      "src/services/genesisFourSymbolLifeDirectionProjection.ts",
    ].map((file) => `export * from ${JSON.stringify(path.join(rootDir, file))};`).join("\n"),
  );
  await build({ entryPoints: [entryPath], outfile: outPath, bundle: true, platform: "node", format: "esm", target: "node20", logLevel: "silent" });
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
  assertEqual("life session is available", lifeSession.status, "AVAILABLE");
  const visualResult = runtime.resolveLaunchLifeVisualSource(lifeSession.session);
  assertEqual("visual source is available", visualResult.status, "AVAILABLE");
  const activation = runtime.activateRealUserGenesisVisualSourceContext({ lifeSourceSession: lifeSession.session, visualSourceAdapterInput: visualResult.input, visualSource: visualResult.visualSource });
  assertEqual("real user context is available", activation.status, "AVAILABLE");
  const routeAuthorization = runtime.authorizeGenesisProductionRoute({ routeTarget: "/genesis", sourceReferenceId });
  assertEqual("production route is authorized", routeAuthorization.status, "READY");
  const initialized = runtime.initializeGenesisProductionRuntime({ routeAuthorization });
  assertEqual("production runtime initializes", initialized.status, "READY");
  const bridge = visualResult.visualSource.projectionBundle.lifeForceManifestationBridge;
  const experienceInitialized = runtime.initializeGenesisManifestationExperienceState({ runtimeSession: initialized.session, lifeForceManifestationBridge: bridge });
  assertEqual("experience state initializes", experienceInitialized.status, "READY");
  let experience = experienceInitialized.session;
  assertEqual("before delivery experience is dormant", experience.currentState, "DORMANT");
  assertEqual("before delivery coordinate is not visible", experience.nextState, "TIME_ACCEPTED");
  let session = initialized.session;
  session = runtime.advanceGenesisProductionRuntime({ session, trigger: "AUTO_ADVANCE" }).session;
  session = runtime.advanceGenesisProductionRuntime({ session, trigger: "AUTO_ADVANCE" }).session;
  assertEqual("runtime reaches Time Resonance", session.currentStage, "TIME_RESONANCE");
  const timeResonanceSession = session;
  const automaticDelivery = runtime.advanceGenesisManifestationExperienceState({ session: experience, runtimeSession: session, lifeForceManifestationBridge: bridge, trigger: "AUTO_ADVANCE" });
  assertEqual("TIME_DELIVERY is required at Dormant", automaticDelivery.status, "BLOCKED");
  assertEqual("automatic delivery is rejected", automaticDelivery.reason, "TIME_DELIVERY_REQUIRED");
  const acceptedExperience = runtime.advanceGenesisManifestationExperienceState({ session: experience, runtimeSession: session, lifeForceManifestationBridge: bridge, trigger: "TIME_DELIVERY" });
  assertEqual("click enters Time Accepted", acceptedExperience.status, "READY");
  experience = acceptedExperience.session;
  assertEqual("accepted experience state", experience.currentState, "TIME_ACCEPTED");
  const ready = runtime.calibrateGenesisTimeDeliveryResponse({ runtimeSession: session, lifeForceManifestationBridge: bridge, acceptedExperienceSession: experience });
  assertEqual("response calibration is ready", ready.status, "READY");
  assertEqual("response state is Time Accepted", ready.calibration.responseState, "TIME_ACCEPTED");
  assertEqual("response points to Coordinate Seeking", ready.calibration.nextExperienceState, "COORDINATE_SEEKING");
  assertEqual("Moon response is gathered", ready.calibration.moonPhaseResponse, "MOONLIGHT_GATHERS_TO_TIME");
  assertEqual("Star response is present", ready.calibration.starFieldResponse, "STELLAR_RHYTHM_RESPONDS");
  assertEqual("temporal response is stabilized", ready.calibration.temporalResponse, "TEMPORAL_MOMENT_STABILIZED");
  assertEqual("response source remains continuous", ready.calibration.sourceReferenceId, sourceReferenceId);
  assertEqual("response bridge remains continuous", ready.calibration.manifestationBridge, bridge);
  assertEqual("response cannot alter Renderer parameters", ready.calibration.noRendererParameterMutation, true);
  assertEqual("response cannot alter Timeline speed", ready.calibration.noTimelineSpeedMutation, true);

  session = runtime.advanceGenesisProductionRuntime({ session, trigger: "TIME_DELIVERY" }).session;
  const seekingExperience = runtime.advanceGenesisManifestationExperienceState({ session: experience, runtimeSession: session, lifeForceManifestationBridge: bridge, trigger: "AUTO_ADVANCE" });
  assertEqual("Time Accepted enters Coordinate Seeking", seekingExperience.status, "READY");
  assertEqual("coordinate seeking state", seekingExperience.session.currentState, "COORDINATE_SEEKING");
  assertEqual("coordinate seeking keeps source", seekingExperience.session.sourceReferenceId, sourceReferenceId);

  const missingBridge = runtime.calibrateGenesisTimeDeliveryResponse({ runtimeSession: timeResonanceSession, lifeForceManifestationBridge: null, acceptedExperienceSession: experience });
  assertEqual("missing bridge is blocked", missingBridge.status, "BLOCKED");
  assertEqual("missing bridge reason", missingBridge.reason, "LIFE_FORCE_MANIFESTATION_BRIDGE_REQUIRED");
  const missingExperience = runtime.calibrateGenesisTimeDeliveryResponse({ runtimeSession: timeResonanceSession, lifeForceManifestationBridge: bridge, acceptedExperienceSession: null });
  assertEqual("explicit accepted session remains required", missingExperience.status, "BLOCKED");
  const wrongStage = runtime.calibrateGenesisTimeDeliveryResponse({ runtimeSession: initialized.session, lifeForceManifestationBridge: bridge, acceptedExperienceSession: experience });
  assertEqual("response outside Time Resonance is blocked", wrongStage.status, "BLOCKED");
  assertEqual("wrong stage reason", wrongStage.reason, "TIME_RESONANCE_REQUIRED");

  console.log("\n[GENESIS TIME DELIVERY RESPONSE CALIBRATION] PASS");
} catch (error) {
  console.error("[GENESIS TIME DELIVERY RESPONSE CALIBRATION] FAIL");
  console.error(error instanceof Error ? error.message : error);
  process.exitCode = 1;
} finally {
  fs.rmSync(tempDir, { recursive: true, force: true });
}
