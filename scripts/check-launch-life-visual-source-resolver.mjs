import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import process from "node:process";
import { build } from "esbuild";

const rootDir = process.cwd();
const typePath = path.join(rootDir, "src/types/launchLifeVisualSourceResolver.ts");
const resolverPath = path.join(rootDir, "src/services/launchLifeVisualSourceResolver.ts");
const adapterPath = path.join(rootDir, "src/services/realLifeVisualSourceAdapter.ts");
const sessionPath = path.join(rootDir, "src/services/launchLifeSourceSession.ts");
const originAdapterPath = path.join(rootDir, "src/services/guanyaoLaunchOriginMotherInputAdapter.ts");
const launchPath = path.join(rootDir, "src/pages/LaunchLab.tsx");
const typeSource = fs.readFileSync(typePath, "utf8");
const resolverSource = fs.readFileSync(resolverPath, "utf8");
const adapterSource = fs.readFileSync(adapterPath, "utf8");
const launchSource = fs.readFileSync(launchPath, "utf8");
const tempDir = fs.mkdtempSync(path.join(os.tmpdir(), "guanyao-launch-life-visual-source-"));

const assertEqual = (name, actual, expected) => {
  if (actual !== expected) throw new Error(`${name} expected=${expected} actual=${actual}`);
  console.log(`PASS | ${name} | expected=${expected} | actual=${actual}`);
};

const assertIncludes = (name, source, expected) => {
  if (!source.includes(expected)) throw new Error(`${name} missing=${expected}`);
  console.log(`PASS | ${name} | includes=${expected}`);
};

const assertExcludes = (name, source, forbidden) => {
  if (source.includes(forbidden)) throw new Error(`${name} forbidden=${forbidden}`);
  console.log(`PASS | ${name} | forbidden=absent`);
};

const bundleAndImport = async (entryPath, outputName) => {
  const outfile = path.join(tempDir, outputName);
  await build({
    entryPoints: [entryPath],
    outfile,
    bundle: true,
    platform: "node",
    format: "esm",
    target: "node20",
    logLevel: "silent",
  });
  return import(`file://${outfile}?t=${Date.now()}`);
};

try {
  [
    "sessionToVisualSourceOnly: true",
    "existingSessionOnly: true",
    "delegatesInputMapping: true",
    "delegatesVisualSourceAdapter: true",
    "realUserSourceOnly: true",
    "noFixtureFallback: true",
    "noEngineInvocation: true",
    "noRendererInvocation: true",
    "noRuntimeMutation: true",
    "noVisualCalibrationMutation: true",
    "noUIMutation: true",
    "noStorageWrite: true",
  ].forEach((marker) => assertIncludes("resolver boundary", typeSource, marker));

  [
    "resolveLaunchLifeVisualSource",
    "session: LaunchLifeSourceSession",
    "): RealLifeVisualSourceAdapterResult",
    "mapLaunchLifeSourceSessionToVisualAdapterInput(session)",
    "adaptRealLifeVisualSource(",
  ].forEach((marker) => assertIncludes("resolver composition", resolverSource, marker));

  [
    "resolveStarbeastFromBirthDate",
    "resolveLaunchStarbeastDerivationSource",
    "runMotherCodeLandingEngine",
    "runGeoChronoMotherFusionEngine",
    "ISOLATED_FIXTURE_ENGINE_RESULT",
    'from "../runtime/',
    'from "../components/',
    "localStorage",
    "sessionStorage",
    'from "react"',
  ].forEach((forbidden) =>
    assertExcludes("resolver stays source-only", resolverSource, forbidden),
  );

  assertIncludes("frozen time origin calibration remains unchanged", adapterSource, "originCoordinateReference: SHARED_TIME_ORIGIN_REFERENCE");
  assertIncludes("frozen time sequence calibration remains unchanged", adapterSource, "timeSequenceReference: SHARED_TIME_SEQUENCE_REFERENCE");
  assertIncludes("frozen quality calibration remains unchanged", adapterSource, 'referenceId: "fixture:isolated-prototype:neutral-quality"');
  assertExcludes("Launch does not consume visual source resolver yet", launchSource, "resolveLaunchLifeVisualSource");

  const [originModule, sessionModule, resolverModule] = await Promise.all([
    bundleAndImport(originAdapterPath, "origin-adapter.mjs"),
    bundleAndImport(sessionPath, "life-source-session.mjs"),
    bundleAndImport(resolverPath, "visual-source-resolver.mjs"),
  ]);
  const sourceResults = originModule.resolveLaunchOriginMotherSourceResults({
    birth: { year: 1979, month: 4, day: 15, hourBranch: "子时" },
    periodIndex: 0,
    geo: { province: "甘肃", city: "兰州" },
    starbeast: { nodeCount: 28, primaryNodeIndex: 6, originLightTrace: "28光兽入口" },
  });
  const sessionResult = sessionModule.createLaunchLifeSourceSession({
    sourceReferenceId: "launch:1979-04-15:子时:甘肃:兰州",
    birthCoordinate: { year: 1979, month: 4, day: 15, hourBranch: "子时" },
    ...sourceResults,
  });
  assertEqual("session is available", sessionResult.status, "AVAILABLE");
  if (sessionResult.status !== "AVAILABLE") throw new Error(sessionResult.reason);

  const visualResult = resolverModule.resolveLaunchLifeVisualSource(sessionResult.session);
  if (visualResult.status !== "AVAILABLE") {
    throw new Error(`real visual source blocked=${visualResult.reason}`);
  }
  assertEqual("real visual source is available", visualResult.status, "AVAILABLE");

  assertEqual("adapter input source is real", visualResult.input.sourceKind, "REAL_ENGINE_RESULT");
  assertEqual("adapter input keeps session reference", visualResult.input.sourceReferenceId, sessionResult.session.sourceReferenceId);
  assertEqual("visual provenance source is real", visualResult.visualSource.provenance.sourceKind, "REAL_ENGINE_RESULT");
  assertEqual("visual provenance keeps source reference", visualResult.visualSource.provenance.sourceReferenceId, sessionResult.session.sourceReferenceId);
  assertEqual("scene model is assembled", visualResult.visualSource.sceneModel.semanticRole, "PERSONAL_STAR_BEAST_RENDERER_NEUTRAL_SCENE_MODEL");
  assertEqual("render plan is planned", visualResult.visualSource.renderPlanResult.status, "PLANNED");
  assertEqual("time projection is available", Boolean(visualResult.visualSource.projectionBundle.timeSequenceRecognitionProjection), true);
  assertEqual("mansion projection is available", Boolean(visualResult.visualSource.projectionBundle.birthMansionIgnitionProjection), true);
  assertEqual("four symbol projection is available", Boolean(visualResult.visualSource.projectionBundle.morphologicalFieldAlignmentProjection), true);
  assertEqual("life force projection is available", Boolean(visualResult.visualSource.projectionBundle.lifeForceInfusionProjection), true);
  assertEqual("personal reveal projection is available", Boolean(visualResult.visualSource.projectionBundle.personalRevealProjection), true);
  assertEqual("pressure projection remains absent", visualResult.visualSource.projectionBundle.realityPressureProjection, null);

  const sourceProvenance = visualResult.visualSource.provenance;
  assertEqual("real provenance is not fixture", sourceProvenance.sourceKind === "ISOLATED_FIXTURE_ENGINE_RESULT", false);
  assertEqual("real provenance reference is not fixture", sourceProvenance.sourceReferenceId.startsWith("fixture:"), false);
  assertEqual("real provenance reference is not prototype", sourceProvenance.sourceReferenceId.startsWith("prototype:"), false);
  assertEqual("real provenance reference is not default", sourceProvenance.sourceReferenceId.startsWith("default:"), false);

  console.log("\n[LAUNCH LIFE VISUAL SOURCE RESOLVER] PASS");
} catch (error) {
  console.error("[LAUNCH LIFE VISUAL SOURCE RESOLVER] FAIL");
  console.error(error instanceof Error ? error.message : error);
  process.exit(1);
} finally {
  fs.rmSync(tempDir, { recursive: true, force: true });
}
