import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import process from "node:process";
import { build } from "esbuild";

const rootDir = process.cwd();
const paths = {
  type: "src/types/genesisProductionRecognitionRealityEntry.ts",
  service: "src/services/genesisProductionRecognitionRealityEntry.ts",
  page: "src/pages/GenesisProductionExperiencePage.tsx",
  routes: "src/routes/guanyaoRoutes.ts",
  launch: "src/pages/LaunchLab.tsx",
  packageManifest: "package.json",
};
const source = Object.fromEntries(Object.entries(paths).map(([key, file]) => [key, fs.readFileSync(path.join(rootDir, file), "utf8")]));
const tempDir = fs.mkdtempSync(path.join(os.tmpdir(), "guanyao-genesis-recognition-reality-"));

const assertEqual = (name, actual, expected) => {
  if (actual !== expected) throw new Error(`${name} expected=${expected} actual=${actual}`);
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
    "GenesisProductionRealityEntrySession",
    '"AWAITING_RECOGNITION_CONFIRMATION"',
    '"AWAITING_REALITY_ENTRY_CONFIRMATION"',
    '"REALITY_ENTRY_ELIGIBLE"',
    '"RECOGNITION_CONFIRM"',
    '"ENTER_REALITY"',
    "GenesisProductionRealityEntryContext",
    "noAutomaticRealityEntry: true",
    "noRealityRouteActivation: true",
    "noPressureExecution: true",
  ].forEach((marker) => assertIncludes("production recognition reality contract", source.type, marker));

  [
    "initializeGenesisProductionRecognitionRealityEntry",
    "advanceGenesisProductionRecognitionRealityEntry",
    "activateGenesisProductionRealityEntryContext",
    "readGenesisProductionRealityEntryContext",
    "clearGenesisProductionRealityEntryContext",
    'currentStage !== "COMPLETION"',
    'runtimeStatus !== "RECOGNITION_HOLD"',
    'event !== "RECOGNITION_CONFIRM"',
    'event !== "ENTER_REALITY"',
    "hasForbiddenSourceReference",
    "sourceReferenceId: session.sourceReferenceId",
  ].forEach((marker) => assertIncludes("production recognition reality service", source.service, marker));
  [
    "genesisRealityEntryBridge",
    "recognitionRealityEntryBridgeFix",
    "recognitionSpaceUIRuntime",
    "realityEntrySpaceUIRuntime",
    "fixtureGenesisVisualConsumerSource",
    "resolveStarbeastFromBirthDate",
    "runMotherCodeLandingEngine",
    "createGenesisWebGLRendererCore",
    "navigate(",
    "localStorage",
    "sessionStorage",
  ].forEach((marker) => assertExcludes("production bridge owns no prototype, engine, renderer, route, or storage", source.service, marker));

  [
    "initializeGenesisProductionRecognitionRealityEntry",
    "advanceGenesisProductionRecognitionRealityEntry",
    "activateGenesisProductionRealityEntryContext",
    'data-interaction="RECOGNITION_CONFIRM"',
    'data-interaction="ENTER_REALITY"',
    'data-reality-entry-eligibility=',
    "带着这份看见进入现实准备",
    "进入现实观察",
    "Reality Entry 已准备好。",
  ].forEach((marker) => assertIncludes("production page owns explicit completion interactions", source.page, marker));
  assertIncludes("production page resolves explicit Reality handoff", source.page, "resolveGenesisProductionRealityRouteHandoff");
  assertIncludes("production page navigates only to authorized handoff target", source.page, "navigate(handoff.routeTarget)");
  assertExcludes("production page starts no Pressure runtime", source.page, "resolvePressureRecognitionUIRuntime");
  assertIncludes("Reality route is now registered behind its own authorization", source.routes, 'reality: "/reality"');
  assertExcludes("Launch to Genesis remains deferred", source.launch, "GUANYAO_ROUTES.genesis");

  const packageJson = JSON.parse(source.packageManifest);
  assertIncludes("recognition reality gate is registered", packageJson.scripts?.["check-genesis-production-recognition-reality-entry"] ?? "", "node scripts/check-genesis-production-recognition-reality-entry.mjs");

  const entryPath = path.join(tempDir, "entry.ts");
  const outPath = path.join(tempDir, "entry.mjs");
  fs.writeFileSync(entryPath, `export * from ${JSON.stringify(path.join(rootDir, paths.service))};\nexport * from ${JSON.stringify(path.join(rootDir, "src/services/genesisProductionRuntimeConsumer.ts"))};`);
  await build({ entryPoints: [entryPath], outfile: outPath, bundle: true, platform: "node", format: "esm", target: "node20", logLevel: "silent" });
  const runtime = await import(`file://${outPath}?t=${Date.now()}`);
  const sourceReferenceId = "launch:real-user:002.6n";
  const initialized = runtime.initializeGenesisProductionRuntime({
    routeAuthorization: {
      status: "READY",
      authorizationState: "AUTHORIZED_PRODUCTION_GENESIS",
      routeTarget: "/genesis",
      sourceExperienceMode: "REAL_USER_EXPERIENCE",
      sourceProvenance: "REAL_USER_SESSION",
      sourceReferenceId,
      productionRendererAuthorization: { authorizedSourceReferenceId: sourceReferenceId },
    },
  });
  const tooEarly = runtime.initializeGenesisProductionRecognitionRealityEntry(initialized.session);
  assertEqual("recognition cannot begin before Completion", tooEarly.reason, "GENESIS_COMPLETION_REQUIRED");

  let genesisSession = initialized.session;
  while (genesisSession.currentStage !== "COMPLETION") {
    const advanced = runtime.advanceGenesisProductionRuntime({
      session: genesisSession,
      trigger: genesisSession.currentStage === "TIME_RESONANCE" ? "TIME_DELIVERY" : "AUTO_ADVANCE",
    });
    genesisSession = advanced.session;
  }
  const recognition = runtime.initializeGenesisProductionRecognitionRealityEntry(genesisSession);
  assertEqual("Completion opens recognition", recognition.status, "READY");
  assertEqual("recognition is the first explicit gate", recognition.session.interactionAvailability, "RECOGNITION_CONFIRM");
  assertEqual("source remains continuous at recognition", recognition.session.sourceReferenceId, sourceReferenceId);
  assertEqual("recognition session is immutable", Object.isFrozen(recognition.session), true);

  const realityTooEarly = runtime.advanceGenesisProductionRecognitionRealityEntry(recognition.session, "ENTER_REALITY");
  assertEqual("Reality cannot open before recognition", realityTooEarly.reason, "RECOGNITION_CONFIRM_REQUIRED");
  const recognized = runtime.advanceGenesisProductionRecognitionRealityEntry(recognition.session, "RECOGNITION_CONFIRM");
  assertEqual("recognition confirmation succeeds", recognized.status, "READY");
  assertEqual("Reality requires a second explicit action", recognized.session.interactionAvailability, "ENTER_REALITY");
  assertEqual("Reality is not yet eligible", recognized.session.realityEntryEligibility, "NOT_ELIGIBLE");
  const eligible = runtime.advanceGenesisProductionRecognitionRealityEntry(recognized.session, "ENTER_REALITY");
  assertEqual("explicit Reality entry succeeds", eligible.status, "READY");
  assertEqual("Reality entry becomes eligible", eligible.session.realityEntryEligibility, "ELIGIBLE");
  assertEqual("eligible source remains continuous", eligible.session.sourceReferenceId, sourceReferenceId);

  runtime.clearGenesisProductionRealityEntryContext();
  assertEqual("ineligible session cannot activate context", runtime.activateGenesisProductionRealityEntryContext(recognized.session), null);
  const context = runtime.activateGenesisProductionRealityEntryContext(eligible.session);
  assertEqual("eligible session activates context", context.eligibility, "ELIGIBLE");
  assertEqual("context keeps source continuity", context.sourceReferenceId, sourceReferenceId);
  assertEqual("context is readable in process", runtime.readGenesisProductionRealityEntryContext(), context);

  const fixtureRuntime = { ...genesisSession, sourceReferenceId: "fixture:case-a" };
  const fixtureAttempt = runtime.initializeGenesisProductionRecognitionRealityEntry(fixtureRuntime);
  assertEqual("fixture reference is rejected", fixtureAttempt.reason, "SOURCE_REFERENCE_INVALID");

  console.log("\n[GENESIS PRODUCTION RECOGNITION REALITY ENTRY] PASS");
} catch (error) {
  console.error("[GENESIS PRODUCTION RECOGNITION REALITY ENTRY] FAIL");
  console.error(error instanceof Error ? error.message : error);
  process.exit(1);
} finally {
  fs.rmSync(tempDir, { recursive: true, force: true });
}
