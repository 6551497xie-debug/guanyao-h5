import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import process from "node:process";
import { build } from "esbuild";

const rootDir = process.cwd();
const paths = {
  bridge: "src/services/genesisProductionVisualCalibrationBridge.ts",
  type: "src/types/genesisProductionVisualCalibrationBridge.ts",
  page: "src/pages/GenesisProductionExperiencePage.tsx",
  canvasHost: "src/components/GenesisProductionRendererCanvasHost.tsx",
  productionHost: "src/renderers/genesisProductionRendererHost.ts",
  core: "src/renderers/genesisWebGLRendererCore.ts",
  routes: "src/routes/guanyaoRoutes.ts",
  app: "src/App.tsx",
  launch: "src/pages/LaunchLab.tsx",
  packageManifest: "package.json",
};
const source = Object.fromEntries(Object.entries(paths).map(([key, file]) => [key, fs.readFileSync(path.join(rootDir, file), "utf8")]));
const tempDir = fs.mkdtempSync(path.join(os.tmpdir(), "guanyao-genesis-production-calibration-"));

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
    "bridgeGenesisProductionRuntimeToVisualCalibration",
    "prototypeAuthorizationNotInherited: true",
    "withoutPrototypeAuthorization",
    "mapGenesisRendererVisualRealization",
    "mapGenesisPerspectiveCalibration",
    "mapGenesisPresenceRecognitionCalibration",
    "mapGenesisSpatialDistanceCalibration",
    "noCalibrationValueMutation: true",
    "noVisualSemanticMutation: true",
    "noEngineInvocation: true",
    "noRendererInvocation: true",
  ].forEach((marker) => assertIncludes("production calibration bridge", source.bridge, marker));

  ["fixture", "case-a", "case-b", "default source", "resolveStarbeastFromBirthDate", "runMotherCodeLandingEngine", "createGenesisWebGLRendererCore"].forEach(
    (marker) => assertExcludes("bridge owns no fixture, engine, or renderer", source.bridge, marker),
  );
  [
    "GenesisProductionVisualCalibrationBundle",
    'sourceProvenance: "REAL_USER_SESSION"',
    "GenesisRendererVisualRealizationCore",
    "GenesisPerspectiveCalibrationCore",
    "GenesisPresenceRecognitionCalibrationCore",
    "GenesisSpatialDistanceCalibrationCore",
  ].forEach((marker) => assertIncludes("production calibration contract", source.type, marker));

  assertIncludes("page initializes production runtime", source.page, "initializeGenesisProductionRuntime");
  assertIncludes("page resolves production calibration", source.page, "bridgeGenesisProductionRuntimeToVisualCalibration");
  assertIncludes("canvas receives production calibration bundle", source.page, "visualCalibrationBundle={visualCalibrationResult.bundle}");
  assertIncludes("canvas passes visual realization", source.canvasHost, "visualCalibrationBundle.genesisVisualRealization");
  assertIncludes("production host remains the renderer facade", source.productionHost, "createGenesisWebGLRendererCore({");
  assertExcludes("formal route remains unregistered", source.routes, 'genesis: "/genesis"');
  assertExcludes("app does not mount production page", source.app, "GenesisProductionExperiencePage");
  assertExcludes("launch navigation remains unchanged", source.launch, "GenesisProductionExperiencePage");

  const packageJson = JSON.parse(source.packageManifest);
  assertIncludes("production calibration gate is registered", packageJson.scripts?.["check-genesis-production-visual-calibration-bridge"] ?? "", "node scripts/check-genesis-production-visual-calibration-bridge.mjs");

  const entryPath = path.join(tempDir, "entry.ts");
  const outPath = path.join(tempDir, "entry.mjs");
  fs.writeFileSync(entryPath, `export * from ${JSON.stringify(path.join(rootDir, paths.bridge))};\nexport * from ${JSON.stringify(path.join(rootDir, "src/services/genesisProductionRuntimeConsumer.ts"))};`);
  await build({ entryPoints: [entryPath], outfile: outPath, bundle: true, platform: "node", format: "esm", target: "node20", logLevel: "silent" });
  const runtime = await import(`file://${outPath}?t=${Date.now()}`);
  const stages = ["MOON_ORIGIN", "STAR_RIVER", "TIME_RESONANCE", "SYMBOL_REVEAL", "HEXAGRAM_IMPRINT", "LIFE_FORCE", "STAR_BEAST_REVEAL", "COMPLETION"];
  for (const stage of stages) {
    const session = Object.freeze({
      sourceExperienceMode: "REAL_USER_EXPERIENCE",
      sourceProvenance: "REAL_USER_SESSION",
      sourceReferenceId: "launch:real-user:002.6h",
      currentStage: stage,
      timelineState: Object.freeze({ stage }),
      boundary: runtime.GENESIS_PRODUCTION_RUNTIME_CONSUMER_BOUNDARY,
    });
    const result = runtime.bridgeGenesisProductionRuntimeToVisualCalibration(session);
    assertEqual(`${stage} calibration bridge`, result.status, "READY");
    assertEqual(`${stage} stage continuity`, result.bundle.runtimeStage, stage);
    assertEqual(`${stage} provenance continuity`, result.bundle.sourceProvenance, "REAL_USER_SESSION");
    for (const value of [result.bundle.genesisVisualRealization, result.bundle.genesisPerspectiveCalibration, result.bundle.genesisPresenceRecognitionCalibration, result.bundle.genesisSpatialDistanceCalibration]) {
      if (value !== null) assertEqual(`${stage} excludes prototype authorization`, "isolatedPrototypeOnly" in value, false);
    }
  }
  assertExcludes("renderer core no longer requires prototype calibration types", source.core, "GenesisRendererVisualRealization } from");
  console.log("\n[GENESIS PRODUCTION VISUAL CALIBRATION BRIDGE] PASS");
} catch (error) {
  console.error("[GENESIS PRODUCTION VISUAL CALIBRATION BRIDGE] FAIL");
  console.error(error instanceof Error ? error.message : error);
  process.exit(1);
} finally {
  fs.rmSync(tempDir, { recursive: true, force: true });
}
