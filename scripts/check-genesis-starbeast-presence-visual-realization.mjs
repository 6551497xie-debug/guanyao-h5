import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import process from "node:process";
import { build } from "esbuild";

const rootDir = process.cwd();
const paths = Object.freeze({
  type: "src/types/genesisStarBeastPresenceVisualRealization.ts",
  service: "src/services/genesisStarBeastPresenceVisualRealization.ts",
  page: "src/pages/GenesisProductionExperiencePage.tsx",
  bridge: "src/services/genesisLifeForceManifestationBridge.ts",
  runtime: "src/services/genesisProductionRuntimeConsumer.ts",
  host: "src/renderers/genesisProductionRendererHost.ts",
  renderer: "src/renderers/genesisWebGLRendererCore.ts",
  packageManifest: "package.json",
});
const source = Object.fromEntries(Object.entries(paths).map(([name, file]) => [name, fs.readFileSync(path.join(rootDir, file), "utf8")]));
const tempDir = fs.mkdtempSync(path.join(os.tmpdir(), "guanyao-genesis-presence-visual-realization-"));
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
    "APPROACHING",
    "PRESENT",
    "RECOGNIZED",
    "NOT_REACHED",
    "RECOGNITION_HOLD",
    "EXISTING_IN_LIFE_COORDINATE",
    "BECOMES_VISIBLE_NOT_GENERATED",
    "noPresenceSourceMutation: true",
    "noEntityGeneration: true",
  ].forEach((marker) => assertIncludes("presence realization contract", source.type, marker));
  [
    "realizeGenesisStarBeastPresence",
    "STAR_BEAST_REVEAL",
    "RECOGNITION_HOLD",
    "RECOGNIZED",
    "bridge.provenance.sourceKind !== \"REAL_ENGINE_RESULT\"",
    "bridge.presenceState !== \"DORMANT\"",
    "noPresenceSourceMutation: true",
    "noAssetGeneration: true",
    "noFallback: true",
  ].forEach((marker) => assertIncludes("presence realization service", source.service, marker));
  [
    "realizeGenesisStarBeastPresence",
    "data-genesis-presence-visual-state",
    "它正在靠近。",
    "它一直在那里。",
    "你终于看见它。",
  ].forEach((marker) => assertIncludes("production page consumes presence realization", source.page, marker));
  [
    "resolveStarbeastFromBirthDate",
    "runFourSymbolEngine",
    "runMotherCodeLandingEngine",
    "createGenesisWebGLRendererCore",
    "setTimeout",
    "GENESIS_FROZEN_STAGE_HOLD_MS",
  ].forEach((marker) => assertExcludes("presence service does not mutate timing or render", source.service, marker));
  assertExcludes("presence realization does not alter Renderer Host", source.host, "GenesisStarBeastPresenceVisualRealization");
  assertExcludes("presence realization does not alter WebGL Core", source.renderer, "GenesisStarBeastPresenceVisualRealization");
  assertExcludes("presence realization does not alter Runtime", source.runtime, "GenesisStarBeastPresenceVisualRealization");
  assertIncludes("manifestation bridge remains source-only", source.bridge, "noPresenceTransition: true");

  const packageJson = JSON.parse(source.packageManifest);
  assertEqual(
    "presence realization gate is registered",
    packageJson.scripts?.["check-genesis-starbeast-presence-visual-realization"],
    "node scripts/check-genesis-starbeast-presence-visual-realization.mjs",
  );

  const entryPath = path.join(tempDir, "presence-entry.ts");
  const outPath = path.join(tempDir, "presence-entry.mjs");
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
  const dormant = runtime.realizeGenesisStarBeastPresence({ runtimeSession: initialized.session, lifeForceManifestationBridge: bridge, recognitionPhase: "NOT_REACHED" });
  assertEqual("early Genesis keeps presence dormant", dormant.status, "READY");
  assertEqual("early presence is dormant", dormant.realization.visualPresenceState, "DORMANT");

  let session = initialized.session;
  for (const trigger of ["AUTO_ADVANCE", "AUTO_ADVANCE", "TIME_DELIVERY", "AUTO_ADVANCE", "AUTO_ADVANCE", "AUTO_ADVANCE"]) {
    session = runtime.advanceGenesisProductionRuntime({ session, trigger }).session;
  }
  assertEqual("runtime reaches StarBeast reveal", session.currentStage, "STAR_BEAST_REVEAL");
  const approaching = runtime.realizeGenesisStarBeastPresence({ runtimeSession: session, lifeForceManifestationBridge: bridge, recognitionPhase: "NOT_REACHED" });
  assertEqual("presence approaching is ready", approaching.status, "READY");
  assertEqual("presence is approaching", approaching.realization.visualPresenceState, "APPROACHING");
  assertEqual("approach copy is semantic", approaching.realization.copyKey, "STAR_BEAST_APPROACHING");
  session = runtime.advanceGenesisProductionRuntime({ session, trigger: "AUTO_ADVANCE" }).session;
  assertEqual("runtime reaches completion", session.currentStage, "COMPLETION");
  const present = runtime.realizeGenesisStarBeastPresence({ runtimeSession: session, lifeForceManifestationBridge: bridge, recognitionPhase: "RECOGNITION_HOLD" });
  assertEqual("presence present is ready", present.status, "READY");
  assertEqual("presence is present", present.realization.visualPresenceState, "PRESENT");
  const recognized = runtime.realizeGenesisStarBeastPresence({ runtimeSession: session, lifeForceManifestationBridge: bridge, recognitionPhase: "RECOGNIZED" });
  assertEqual("presence recognition is ready", recognized.status, "READY");
  assertEqual("presence is recognized", recognized.realization.visualPresenceState, "RECOGNIZED");
  assertEqual("presence origin remains existing", recognized.realization.presenceOrigin, "EXISTING_IN_LIFE_COORDINATE");
  assertEqual("presence is not generated", recognized.realization.appearanceMeaning, "BECOMES_VISIBLE_NOT_GENERATED");
  assertEqual("manifestation source remains dormant", recognized.realization.sourcePresenceState, "DORMANT");
  assertEqual("bridge is not mutated", recognized.realization.noPresenceSourceMutation, true);

  const missingBridge = runtime.realizeGenesisStarBeastPresence({ runtimeSession: session, lifeForceManifestationBridge: null, recognitionPhase: "RECOGNIZED" });
  assertEqual("missing bridge is blocked", missingBridge.status, "BLOCKED");
  assertEqual("missing bridge reason", missingBridge.reason, "LIFE_FORCE_MANIFESTATION_BRIDGE_REQUIRED");
  const mismatched = runtime.realizeGenesisStarBeastPresence({ runtimeSession: session, lifeForceManifestationBridge: { ...bridge, sourceReferenceId: "launch:other" }, recognitionPhase: "RECOGNIZED" });
  assertEqual("mismatched source is blocked", mismatched.status, "BLOCKED");
  assertEqual("mismatched source reason", mismatched.reason, "SOURCE_REFERENCE_MISMATCH");

  console.log("\n[GENESIS STARBEAST PRESENCE VISUAL REALIZATION] PASS");
} catch (error) {
  console.error("[GENESIS STARBEAST PRESENCE VISUAL REALIZATION] FAIL");
  console.error(error instanceof Error ? error.message : error);
  process.exitCode = 1;
} finally {
  fs.rmSync(tempDir, { recursive: true, force: true });
}
