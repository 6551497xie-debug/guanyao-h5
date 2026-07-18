import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import process from "node:process";
import { build } from "esbuild";

const rootDir = process.cwd();
const typePath = path.join(rootDir, "src/types/realUserGenesisVisualSourceContext.ts");
const contextPath = path.join(rootDir, "src/services/realUserGenesisVisualSourceContext.ts");
const resolverPath = path.join(rootDir, "src/services/launchLifeVisualSourceResolver.ts");
const sessionPath = path.join(rootDir, "src/services/launchLifeSourceSession.ts");
const originAdapterPath = path.join(rootDir, "src/services/guanyaoLaunchOriginMotherInputAdapter.ts");
const launchPath = path.join(rootDir, "src/pages/LaunchLab.tsx");
const typeSource = fs.readFileSync(typePath, "utf8");
const contextSource = fs.readFileSync(contextPath, "utf8");
const launchSource = fs.readFileSync(launchPath, "utf8");
const tempDir = fs.mkdtempSync(path.join(os.tmpdir(), "guanyao-real-user-genesis-context-"));

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
    "inMemorySessionOnly: true",
    "realUserSourceOnly: true",
    "existingLifeSourceSessionOnly: true",
    "existingVisualSourceOnly: true",
    "noFixtureFallback: true",
    "noEngineInvocation: true",
    "noRendererInvocation: true",
    "noGenesisRuntimeActivation: true",
    "noNavigationMutation: true",
    "noVisualCalibrationMutation: true",
    "noUIMutation: true",
    "noPersistentStorage: true",
  ].forEach((marker) => assertIncludes("context boundary", typeSource, marker));

  [
    "activateRealUserGenesisVisualSourceContext",
    "readRealUserGenesisVisualSourceContext",
    "clearRealUserGenesisVisualSourceContext",
    'sourceMode: "REAL_USER_EXPERIENCE"',
    "lifeSourceSession: session",
    "visualSourceAdapterInput: input.visualSourceAdapterInput",
    "visualSource: input.visualSource",
  ].forEach((marker) => assertIncludes("context lifecycle", contextSource, marker));

  [
    "resolveStarbeastFromBirthDate",
    "resolveLaunchStarbeastDerivationSource",
    "runMotherCodeLandingEngine",
    "runGeoChronoMotherFusionEngine",
    "resolveLaunchLifeVisualSource",
    "adaptRealLifeVisualSource",
    "ISOLATED_FIXTURE_ENGINE_RESULT",
    "localStorage",
    "sessionStorage",
    "fetch(",
    'from "react"',
    'from "react-router-dom"',
    'from "../runtime/',
    'from "../components/',
  ].forEach((forbidden) =>
    assertExcludes("context remains in-memory source lifecycle only", contextSource, forbidden),
  );

  assertIncludes("Launch resolves real visual source", launchSource, "resolveLaunchLifeVisualSource(sessionResult.session)");
  assertIncludes("Launch activates real visual context", launchSource, "activateRealUserGenesisVisualSourceContext({");
  assertIncludes("Launch clears context when source resets", launchSource, "clearRealUserGenesisVisualSourceContext()");
  assertExcludes("Launch still does not invoke visual adapter directly", launchSource, "adaptRealLifeVisualSource");
  assertExcludes("Launch still does not invoke renderer", launchSource, "renderPersonalStarBeast");

  const [originModule, sessionModule, resolverModule, contextModule] = await Promise.all([
    bundleAndImport(originAdapterPath, "origin-adapter.mjs"),
    bundleAndImport(sessionPath, "life-source-session.mjs"),
    bundleAndImport(resolverPath, "visual-source-resolver.mjs"),
    bundleAndImport(contextPath, "visual-source-context.mjs"),
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

  assertEqual("context starts empty", contextModule.readRealUserGenesisVisualSourceContext(), null);
  const visualResult = resolverModule.resolveLaunchLifeVisualSource(sessionResult.session);
  assertEqual("visual source is available", visualResult.status, "AVAILABLE");
  if (visualResult.status !== "AVAILABLE") throw new Error(visualResult.reason);
  const contextInput = {
    lifeSourceSession: sessionResult.session,
    visualSourceAdapterInput: visualResult.input,
    visualSource: visualResult.visualSource,
  };
  const activation = contextModule.activateRealUserGenesisVisualSourceContext(contextInput);
  assertEqual("context activation is available", activation.status, "AVAILABLE");
  if (activation.status !== "AVAILABLE") throw new Error(activation.reason);

  const context = contextModule.readRealUserGenesisVisualSourceContext();
  assertEqual("context is readable", context, activation.context);
  assertEqual("context is frozen", Object.isFrozen(context), true);
  assertEqual("context mode is real user", context.sourceMode, "REAL_USER_EXPERIENCE");
  assertEqual("context keeps session reference", context.lifeSourceSession, sessionResult.session);
  assertEqual("context keeps source reference", context.sourceReferenceId, sessionResult.session.sourceReferenceId);
  assertEqual("adapter input remains real", context.visualSourceAdapterInput.sourceKind, "REAL_ENGINE_RESULT");
  assertEqual("visual provenance remains real", context.visualSource.provenance.sourceKind, "REAL_ENGINE_RESULT");
  assertEqual("visual source has planned render input", context.visualSource.renderPlanResult.status, "PLANNED");
  assertEqual("visual source has projections", Boolean(context.visualSource.projectionBundle.personalRevealProjection), true);

  const repeatedActivation = contextModule.activateRealUserGenesisVisualSourceContext(contextInput);
  assertEqual("repeat activation is idempotent", repeatedActivation.status, "AVAILABLE");
  if (repeatedActivation.status === "AVAILABLE") {
    assertEqual("repeat activation preserves context", repeatedActivation.context, context);
  }

  contextModule.clearRealUserGenesisVisualSourceContext();
  assertEqual("context clears with source reset", contextModule.readRealUserGenesisVisualSourceContext(), null);

  console.log("\n[REAL USER GENESIS VISUAL SOURCE CONTEXT] PASS");
} catch (error) {
  console.error("[REAL USER GENESIS VISUAL SOURCE CONTEXT] FAIL");
  console.error(error instanceof Error ? error.message : error);
  process.exit(1);
} finally {
  fs.rmSync(tempDir, { recursive: true, force: true });
}
