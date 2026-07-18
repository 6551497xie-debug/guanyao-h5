import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import process from "node:process";
import { build } from "esbuild";

const rootDir = process.cwd();
const paths = {
  timing: "src/services/genesisFrozenTimelineTiming.ts",
  orchestrator: "src/services/genesisProductionTimelineOrchestrator.ts",
  type: "src/types/genesisProductionTimelineOrchestrator.ts",
  runtime: "src/services/genesisProductionRuntimeConsumer.ts",
  page: "src/pages/GenesisProductionExperiencePage.tsx",
  prototypeHarness: "src/pages/PersonalStarBeastWebGLPrototypeHarness.tsx",
  routes: "src/routes/guanyaoRoutes.ts",
  app: "src/App.tsx",
  launch: "src/pages/LaunchLab.tsx",
  packageManifest: "package.json",
};
const source = Object.fromEntries(Object.entries(paths).map(([key, file]) => [key, fs.readFileSync(path.join(rootDir, file), "utf8")]));
const tempDir = fs.mkdtempSync(path.join(os.tmpdir(), "guanyao-genesis-production-timeline-"));

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
    "orchestrateGenesisProductionTimeline",
    "GENESIS_FROZEN_STAGE_HOLD_MS",
    'behavior: "AUTO_ADVANCE"',
    'behavior: "WAIT_FOR_TIME_DELIVERY"',
    'behavior: "RECOGNITION_HOLD"',
    'userPauseWindow !== "TIME_DELIVERY_WINDOW"',
    'transitionDuration !== "NO_AUTOMATIC_TRANSITION"',
    "timeDeliveryOnlyInteraction: true",
    "completionRecognitionHoldRequired: true",
    "noTimelineSemanticMutation: true",
  ].forEach((marker) => assertIncludes("production timeline orchestrator", source.orchestrator, marker));
  ["fixture", "prototype", "default", "resolveStarbeastFromBirthDate", "runMotherCodeLandingEngine", "createGenesisWebGLRendererCore", "setTimeout", "window."].forEach(
    (marker) => assertExcludes("orchestrator owns no fixture, engine, renderer, or clock", source.orchestrator, marker),
  );

  assertIncludes("Moon keeps frozen hold", source.timing, "MOON_ORIGIN: 2200");
  assertIncludes("flow stages keep frozen hold", source.timing, "STAR_RIVER: 1800");
  assertIncludes("prototype consumes shared frozen timing", source.prototypeHarness, "GENESIS_FROZEN_STAGE_HOLD_MS");
  assertExcludes("prototype no longer owns Moon timing", source.prototypeHarness, "? 2200 : 1800");

  [
    "orchestrateGenesisProductionTimeline",
    "advanceGenesisProductionRuntime",
    'trigger: "AUTO_ADVANCE"',
    'trigger: "TIME_DELIVERY"',
    "window.setTimeout",
    "window.clearTimeout",
    "把时间交给星河",
    "visualCalibrationBundle={visualCalibrationResult.bundle}",
  ].forEach((marker) => assertIncludes("production page timeline connection", source.page, marker));
  ["fixtureGenesisVisualConsumerSource", "genesisPreviewIntegration", "createIsolatedWebGLRendererPrototype", "resolveStarbeastFromBirthDate", "runMotherCodeLandingEngine", "useNavigate", "localStorage", "sessionStorage"].forEach(
    (marker) => assertExcludes("production page remains source and route isolated", source.page, marker),
  );
  assertIncludes("formal route target is registered", source.routes, 'genesis: "/genesis"');
  assertExcludes("app does not mount production page", source.app, "GenesisProductionExperiencePage");
  assertExcludes("launch navigation remains unchanged", source.launch, "GenesisProductionExperiencePage");

  const packageJson = JSON.parse(source.packageManifest);
  assertIncludes("timeline gate is registered", packageJson.scripts?.["check-genesis-production-timeline-orchestration"] ?? "", "node scripts/check-genesis-production-timeline-orchestration.mjs");

  const entryPath = path.join(tempDir, "entry.ts");
  const outPath = path.join(tempDir, "entry.mjs");
  fs.writeFileSync(entryPath, `export * from ${JSON.stringify(path.join(rootDir, paths.orchestrator))};\nexport * from ${JSON.stringify(path.join(rootDir, paths.runtime))};`);
  await build({ entryPoints: [entryPath], outfile: outPath, bundle: true, platform: "node", format: "esm", target: "node20", logLevel: "silent" });
  const runtime = await import(`file://${outPath}?t=${Date.now()}`);
  const sourceReferenceId = "launch:real-user:002.6i";
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
  assertEqual("runtime initializes", initialized.status, "READY");
  let current = initialized.session;
  const observed = [];
  while (true) {
    const orchestration = runtime.orchestrateGenesisProductionTimeline(current);
    assertEqual(`${current.currentStage} orchestration`, orchestration.status, "READY");
    observed.push([current.currentStage, orchestration.directive.behavior, orchestration.directive.delayMs]);
    if (orchestration.directive.behavior === "RECOGNITION_HOLD") break;
    const advanced = runtime.advanceGenesisProductionRuntime({
      session: current,
      trigger: orchestration.directive.behavior === "WAIT_FOR_TIME_DELIVERY" ? "TIME_DELIVERY" : "AUTO_ADVANCE",
    });
    assertEqual(`${current.currentStage} advances`, advanced.status, "READY");
    current = advanced.session;
  }
  assertEqual("frozen sequence", observed.map(([stage]) => stage).join(","), "MOON_ORIGIN,STAR_RIVER,TIME_RESONANCE,SYMBOL_REVEAL,HEXAGRAM_IMPRINT,LIFE_FORCE,STAR_BEAST_REVEAL,COMPLETION");
  assertEqual("Moon timing unchanged", observed[0][2], 2200);
  assertEqual("Star timing unchanged", observed[1][2], 1800);
  assertEqual("Time waits for delivery", observed[2][1], "WAIT_FOR_TIME_DELIVERY");
  assertEqual("Time has no timer", observed[2][2], null);
  assertEqual("Completion holds recognition", observed[7][1], "RECOGNITION_HOLD");
  assertEqual("Completion has no timer", observed[7][2], null);

  console.log("\n[GENESIS PRODUCTION TIMELINE ORCHESTRATION] PASS");
} catch (error) {
  console.error("[GENESIS PRODUCTION TIMELINE ORCHESTRATION] FAIL");
  console.error(error instanceof Error ? error.message : error);
  process.exit(1);
} finally {
  fs.rmSync(tempDir, { recursive: true, force: true });
}
