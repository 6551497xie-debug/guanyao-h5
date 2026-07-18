import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import process from "node:process";
import { build } from "esbuild";

const rootDir = process.cwd();
const typePath = path.join(
  rootDir,
  "src/types/launchLifeSourceVisualAdapterInputBridge.ts",
);
const bridgePath = path.join(
  rootDir,
  "src/services/launchLifeSourceVisualAdapterInputBridge.ts",
);
const sessionPath = path.join(rootDir, "src/services/launchLifeSourceSession.ts");
const originAdapterPath = path.join(
  rootDir,
  "src/services/guanyaoLaunchOriginMotherInputAdapter.ts",
);
const typeSource = fs.readFileSync(typePath, "utf8");
const bridgeSource = fs.readFileSync(bridgePath, "utf8");
const tempDir = fs.mkdtempSync(
  path.join(os.tmpdir(), "guanyao-launch-life-visual-input-bridge-"),
);

const assertEqual = (name, actual, expected) => {
  if (actual !== expected) {
    throw new Error(`${name} expected=${expected} actual=${actual}`);
  }
  console.log(`PASS | ${name} | expected=${expected} | actual=${actual}`);
};

const assertIncludes = (name, source, expected) => {
  if (!source.includes(expected)) throw new Error(`${name} missing=${expected}`);
  console.log(`PASS | ${name} | includes=${expected}`);
};

const assertExcludes = (name, source, forbidden) => {
  if (source.includes(forbidden)) {
    throw new Error(`${name} forbidden=${forbidden}`);
  }
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
    "inputMappingOnly: true",
    "existingSessionOnly: true",
    "preservesSourceProvenance: true",
    "preservesEngineResultReferences: true",
    "noEngineInvocation: true",
    "noVisualAdapterInvocation: true",
    "noSceneModelAssembly: true",
    "noRenderPlanAssembly: true",
    "noProjectionAssembly: true",
    "noRendererInvocation: true",
    "noRuntimeMutation: true",
    "noVisualMutation: true",
    "noUIMutation: true",
    "noStorageWrite: true",
  ].forEach((marker) => assertIncludes("bridge boundary", typeSource, marker));

  [
    "mapLaunchLifeSourceSessionToVisualAdapterInput",
    "session: LaunchLifeSourceSession",
    "): RealLifeVisualSourceAdapterInput",
    "sourceKind: session.sourceKind",
    "sourceReferenceId: session.sourceReferenceId",
    "starbeastDerivationResult: session.starbeastDerivationResult",
    "motherCodeLandingResult: session.motherCodeLandingResult",
    "selectedPressureSeedContext: null",
  ].forEach((marker) => assertIncludes("bridge mapping", bridgeSource, marker));

  [
    "adaptRealLifeVisualSource(",
    "resolveStarbeastFromBirthDate",
    "resolveLaunchStarbeastDerivationSource",
    "runMotherCodeLandingEngine",
    "runGeoChronoMotherFusionEngine",
    "PersonalStarBeastSceneModel",
    "adaptPersonalStarBeastSceneModelToRenderPlan",
    "projectGenesis",
    'from "../runtime/',
    'from "../components/',
    "localStorage",
    "sessionStorage",
    'from "react"',
  ].forEach((forbidden) =>
    assertExcludes("bridge remains mapping-only", bridgeSource, forbidden),
  );

  const [originModule, sessionModule, bridgeModule] = await Promise.all([
    bundleAndImport(originAdapterPath, "origin-adapter.mjs"),
    bundleAndImport(sessionPath, "life-source-session.mjs"),
    bundleAndImport(bridgePath, "visual-input-bridge.mjs"),
  ]);
  const { resolveLaunchOriginMotherSourceResults } = originModule;
  const { createLaunchLifeSourceSession } = sessionModule;
  const { mapLaunchLifeSourceSessionToVisualAdapterInput } = bridgeModule;

  const launchInput = {
    birth: { year: 1979, month: 4, day: 15, hourBranch: "子时" },
    periodIndex: 0,
    geo: { province: "甘肃", city: "兰州" },
    starbeast: {
      nodeCount: 28,
      primaryNodeIndex: 6,
      originLightTrace: "28光兽入口",
    },
  };
  const sourceResults = resolveLaunchOriginMotherSourceResults(launchInput);
  const sessionResult = createLaunchLifeSourceSession({
    sourceReferenceId: "launch:1979-04-15:子时:甘肃:兰州",
    birthCoordinate: launchInput.birth,
    ...sourceResults,
  });
  assertEqual("session is available", sessionResult.status, "AVAILABLE");
  if (sessionResult.status !== "AVAILABLE") {
    throw new Error(`unexpected blocked session=${sessionResult.reason}`);
  }

  const sessionSnapshot = JSON.stringify(sessionResult.session);
  const adapterInput = mapLaunchLifeSourceSessionToVisualAdapterInput(
    sessionResult.session,
  );

  assertEqual("adapter input is frozen", Object.isFrozen(adapterInput), true);
  assertEqual("source kind continuity", adapterInput.sourceKind, "REAL_ENGINE_RESULT");
  assertEqual(
    "source reference continuity",
    adapterInput.sourceReferenceId,
    sessionResult.session.sourceReferenceId,
  );
  assertEqual(
    "starbeast reference continuity",
    adapterInput.starbeastDerivationResult,
    sessionResult.session.starbeastDerivationResult,
  );
  assertEqual(
    "mother code reference continuity",
    adapterInput.motherCodeLandingResult,
    sessionResult.session.motherCodeLandingResult,
  );
  assertEqual(
    "pressure remains absent",
    adapterInput.selectedPressureSeedContext,
    null,
  );
  assertEqual("birth coordinate does not leak", "birthCoordinate" in adapterInput, false);
  assertEqual("origin mother does not leak", "originMotherResult" in adapterInput, false);
  assertEqual(
    "mapping does not mutate session",
    JSON.stringify(sessionResult.session) === sessionSnapshot,
    true,
  );

  console.log("\n[LAUNCH LIFE SOURCE → VISUAL ADAPTER INPUT BRIDGE] PASS");
} catch (error) {
  console.error("[LAUNCH LIFE SOURCE → VISUAL ADAPTER INPUT BRIDGE] FAIL");
  console.error(error instanceof Error ? error.message : error);
  process.exit(1);
} finally {
  fs.rmSync(tempDir, { recursive: true, force: true });
}
