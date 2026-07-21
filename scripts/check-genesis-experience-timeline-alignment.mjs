import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import process from "node:process";
import { build } from "esbuild";

const rootDir = process.cwd();
const paths = Object.freeze({
  type: "src/types/genesisManifestationExperienceState.ts",
  service: "src/services/genesisManifestationExperienceState.ts",
  runtime: "src/services/genesisProductionRuntimeConsumer.ts",
  bridge: "src/services/genesisLifeForceManifestationBridge.ts",
  adapter: "src/services/realLifeVisualSourceAdapter.ts",
  consumer: "src/services/realGenesisVisualConsumerSource.ts",
  host: "src/renderers/genesisProductionRendererHost.ts",
  renderer: "src/renderers/genesisWebGLRendererCore.ts",
  packageManifest: "package.json",
});
const source = Object.fromEntries(Object.entries(paths).map(([name, file]) => [name, fs.readFileSync(path.join(rootDir, file), "utf8")]));
const tempDir = fs.mkdtempSync(path.join(os.tmpdir(), "guanyao-genesis-experience-timeline-"));

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
    "DORMANT",
    "TIME_ACCEPTED",
    "COORDINATE_SEEKING",
    "COORDINATE_FOUND",
    "DIRECTION_AWAKENING",
    "FORCE_CONDENSING",
    "PRESENCE_APPROACHING",
    "PRESENCE_RECOGNIZED",
    "TIME_DELIVERY",
    "RECOGNITION_HOLD",
    "WAIT_FOR_TIME_DELIVERY",
    "STAR_RIVER_RESPONDS",
    "FIND_MY_POSITION",
    "MANSION_COORDINATE_FOUND",
    "FOUR_SYMBOL_DIRECTION_AWAKENS",
    "LIFE_FORCE_CONDENSES",
    "STAR_BEAST_APPROACHES",
    "RECOGNIZE_EXISTING_PRESENCE",
    "noTimelineSpeedMutation: true",
    "noTimelineReordering: true",
  ].forEach((marker) => assertIncludes("experience state contract", source.type, marker));
  [
    "initializeGenesisManifestationExperienceState",
    "advanceGenesisManifestationExperienceState",
    "TIME_DELIVERY_ONLY_AT_TIME_RESONANCE",
    "TIME_DELIVERY_REQUIRED",
    "COORDINATE_SEEKING",
    "COORDINATE_FOUND",
    "DIRECTION_AWAKENING",
    "FORCE_CONDENSING",
    "PRESENCE_APPROACHING",
    "PRESENCE_RECOGNIZED",
    "bridge.provenance.sourceKind === \"REAL_ENGINE_RESULT\"",
    "noEngineInvocation: true",
    "noSourceMutation: true",
    "noVisualStateMutation: true",
  ].forEach((marker) => assertIncludes("experience state orchestration", source.service, marker));
  [
    "resolveGenesis",
    "runFourSymbolEngine",
    "runMotherCodeLandingEngine",
    "resolveStarbeastFromBirthDate",
    "createGenesisWebGLRendererCore",
    "setTimeout",
    "window.",
    "fixture",
    "prototype",
  ].forEach((marker) => assertExcludes("experience orchestration remains source and renderer free", source.service, marker));
  assertIncludes("experience state reads existing manifestation bridge", source.service, "lifeForceManifestationBridge");
  assertIncludes("Adapter continues to carry existing projections", source.adapter, "projectionBundle");
  assertIncludes("real consumer keeps projection bundle shape", source.consumer, "projectionBundle: context.visualSource.projectionBundle");
  assertExcludes("renderer host input remains unchanged", source.host, "GenesisManifestationExperienceState");
  assertExcludes("renderer core input remains unchanged", source.renderer, "GenesisManifestationExperienceState");
  assertExcludes("runtime consumer remains untouched by new visual state", source.runtime, "GenesisManifestationExperienceState");

  const packageJson = JSON.parse(source.packageManifest);
  assertEqual(
    "experience timeline gate is registered",
    packageJson.scripts?.["check-genesis-experience-timeline-alignment"],
    "node scripts/check-genesis-experience-timeline-alignment.mjs",
  );

  const entryPath = path.join(tempDir, "timeline-entry.ts");
  const outPath = path.join(tempDir, "timeline-entry.mjs");
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
  assertEqual("life source session is available", lifeSession.status, "AVAILABLE");
  const visualResult = runtime.resolveLaunchLifeVisualSource(lifeSession.session);
  assertEqual("visual source is available", visualResult.status, "AVAILABLE");
  const activation = runtime.activateRealUserGenesisVisualSourceContext({
    lifeSourceSession: lifeSession.session,
    visualSourceAdapterInput: visualResult.input,
    visualSource: visualResult.visualSource,
  });
  assertEqual("real user context is available", activation.status, "AVAILABLE");
  const routeAuthorization = runtime.authorizeGenesisProductionRoute({ routeTarget: "/genesis", sourceReferenceId });
  assertEqual("production route is authorized", routeAuthorization.status, "READY");
  const runtimeInitialized = runtime.initializeGenesisProductionRuntime({ routeAuthorization });
  assertEqual("production runtime initializes", runtimeInitialized.status, "READY");
  const bridge = visualResult.visualSource.projectionBundle.lifeForceManifestationBridge;
  const experienceInitialized = runtime.initializeGenesisManifestationExperienceState({ runtimeSession: runtimeInitialized.session, lifeForceManifestationBridge: bridge });
  assertEqual("experience state initializes", experienceInitialized.status, "READY");
  let experience = experienceInitialized.session;
  assertEqual("initial state is dormant", experience.currentState, "DORMANT");

  let production = runtimeInitialized.session;
  production = runtime.advanceGenesisProductionRuntime({ session: production, trigger: "AUTO_ADVANCE" }).session;
  production = runtime.advanceGenesisProductionRuntime({ session: production, trigger: "AUTO_ADVANCE" }).session;
  const accepted = runtime.advanceGenesisManifestationExperienceState({ session: experience, runtimeSession: production, lifeForceManifestationBridge: bridge, trigger: "TIME_DELIVERY" });
  assertEqual("time delivery is accepted", accepted.status, "READY");
  experience = accepted.session;
  assertEqual("time delivery state", experience.currentState, "TIME_ACCEPTED");
  production = runtime.advanceGenesisProductionRuntime({ session: production, trigger: "TIME_DELIVERY" }).session;

  const transitions = [
    ["COORDINATE_SEEKING", "AUTO_ADVANCE"],
    ["COORDINATE_FOUND", "AUTO_ADVANCE"],
  ];
  for (const [expected, trigger] of transitions) {
    const advanced = runtime.advanceGenesisManifestationExperienceState({ session: experience, runtimeSession: production, lifeForceManifestationBridge: bridge, trigger });
    assertEqual(`${expected} transition`, advanced.status, "READY");
    experience = advanced.session;
  }
  const stageTransitions = [
    ["HEXAGRAM_IMPRINT", "DIRECTION_AWAKENING", "AUTO_ADVANCE"],
    ["LIFE_FORCE", "FORCE_CONDENSING", "AUTO_ADVANCE"],
    ["STAR_BEAST_REVEAL", "PRESENCE_APPROACHING", "AUTO_ADVANCE"],
    ["COMPLETION", "PRESENCE_RECOGNIZED", "RECOGNITION_HOLD"],
  ];
  for (const [runtimeStage, expected, trigger] of stageTransitions) {
    production = runtime.advanceGenesisProductionRuntime({ session: production, trigger: "AUTO_ADVANCE" }).session;
    assertEqual(`${runtimeStage} runtime stage`, production.currentStage, runtimeStage);
    const advanced = runtime.advanceGenesisManifestationExperienceState({ session: experience, runtimeSession: production, lifeForceManifestationBridge: bridge, trigger });
    assertEqual(`${expected} transition`, advanced.status, "READY");
    experience = advanced.session;
    assertEqual(`${expected} state`, experience.currentState, expected);
  }
  assertEqual("experience state source continuity", experience.sourceReferenceId, sourceReferenceId);
  assertEqual("experience state bridge continuity", experience.manifestationBridge, bridge);
  assertEqual("recognition copy key", experience.copyKey, "RECOGNIZE_EXISTING_PRESENCE");
  assertEqual("no automatic post-recognition state", experience.nextState, null);

  const missingBridge = runtime.initializeGenesisManifestationExperienceState({ runtimeSession: runtimeInitialized.session, lifeForceManifestationBridge: null });
  assertEqual("missing bridge is blocked", missingBridge.status, "BLOCKED");
  assertEqual("missing bridge reason", missingBridge.reason, "LIFE_FORCE_MANIFESTATION_BRIDGE_REQUIRED");

  console.log("\n[GENESIS EXPERIENCE TIMELINE ALIGNMENT] PASS");
} catch (error) {
  console.error("[GENESIS EXPERIENCE TIMELINE ALIGNMENT] FAIL");
  console.error(error instanceof Error ? error.message : error);
  process.exitCode = 1;
} finally {
  fs.rmSync(tempDir, { recursive: true, force: true });
}
