import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import process from "node:process";
import { createRequire } from "node:module";
import ts from "typescript";

const rootDir = process.cwd();
const tempRoot = fs.mkdtempSync(path.join(os.tmpdir(), "guanyao-crystal-end-state-adapter-"));

const sourceFiles = [
  "src/services/crystalEndStateAdapterService.ts",
  "src/services/fixtures/crystalMappingFixtures.ts",
  "src/services/fixtures/crystalEndStateAdapterFixtures.ts",
];

const transpileToTemp = (sourcePath) => {
  const absoluteSourcePath = path.join(rootDir, sourcePath);
  const source = fs.readFileSync(absoluteSourcePath, "utf8");
  const transpiled = ts.transpileModule(source, {
    compilerOptions: {
      module: ts.ModuleKind.CommonJS,
      target: ts.ScriptTarget.ES2022,
      strict: true,
    },
  });
  const outputPath = path.join(tempRoot, sourcePath.replace(/\.ts$/, ".js"));
  fs.mkdirSync(path.dirname(outputPath), { recursive: true });
  fs.writeFileSync(outputPath, transpiled.outputText);
};

const assertEqual = (name, actual, expected) => {
  if (actual !== expected) {
    throw new Error(`${name} expected=${expected} actual=${actual}`);
  }
  console.log(`PASS | ${name} | expected=${expected} | actual=${actual}`);
};

try {
  sourceFiles.forEach(transpileToTemp);
  const requireFromTemp = createRequire(path.join(tempRoot, "check.cjs"));
  const { adaptCrystalState } = requireFromTemp("./src/services/crystalEndStateAdapterService.js");
  const {
    actionFiveAwarenessCrystalEndStateAdapterInput,
    actionFiveAwarenessCrystalEndStateAdapterResult,
  } = requireFromTemp("./src/services/fixtures/crystalEndStateAdapterFixtures.js");

  const passResult = adaptCrystalState(actionFiveAwarenessCrystalEndStateAdapterInput);
  assertEqual("fixture action-five-awareness adapter status", passResult.status, "READY");
  assertEqual("fixture adapter readiness", passResult.readiness, "READY_FOR_CURRENT_CRYSTAL_END_STATE");
  assertEqual("fixture adapter can adapt", passResult.boundary.canAdaptToCurrentCrystalEndState, true);
  assertEqual("fixture adapter next readiness", passResult.boundary.nextCrystalStateReadiness, "CRYSTALLIZED");
  assertEqual("fixture adapter exposes asset after adapt", passResult.boundary.canExposeHexagramAssetAfterAdapt, true);
  assertEqual("fixture adapter deposits ring after adapt", passResult.boundary.canDepositToRingLiteAfterAdapt, true);

  assertEqual("static fixture adapter status", actionFiveAwarenessCrystalEndStateAdapterResult.status, "READY");
  assertEqual(
    "static fixture adapter next readiness",
    actionFiveAwarenessCrystalEndStateAdapterResult.boundary.nextCrystalStateReadiness,
    "CRYSTALLIZED",
  );

  const notReadyCrystalStateResult = adaptCrystalState({
    ...actionFiveAwarenessCrystalEndStateAdapterInput,
    crystalState: {
      ...actionFiveAwarenessCrystalEndStateAdapterInput.crystalState,
      readiness: "NOT_READY",
      assetBoundary: {
        ...actionFiveAwarenessCrystalEndStateAdapterInput.crystalState.assetBoundary,
        canCreateCurrentCrystalEndState: false,
      },
    },
  });
  assertEqual("not-ready crystal state adapter status", notReadyCrystalStateResult.status, "NOT_READY");
  assertEqual(
    "not-ready crystal state adapter reason",
    notReadyCrystalStateResult.reason,
    "CRYSTAL_STATE_NOT_READY_TO_CRYSTALLIZE",
  );

  const closedBoundaryResult = adaptCrystalState({
    ...actionFiveAwarenessCrystalEndStateAdapterInput,
    crystalState: {
      ...actionFiveAwarenessCrystalEndStateAdapterInput.crystalState,
      assetBoundary: {
        ...actionFiveAwarenessCrystalEndStateAdapterInput.crystalState.assetBoundary,
        canCreateCurrentCrystalEndState: false,
      },
    },
  });
  assertEqual("closed currentCrystalEndState boundary status", closedBoundaryResult.status, "NOT_READY");
  assertEqual(
    "closed currentCrystalEndState boundary reason",
    closedBoundaryResult.reason,
    "CURRENT_CRYSTAL_END_STATE_BOUNDARY_CLOSED",
  );

  const prematureAssetResult = adaptCrystalState({
    ...actionFiveAwarenessCrystalEndStateAdapterInput,
    crystalState: {
      ...actionFiveAwarenessCrystalEndStateAdapterInput.crystalState,
      assetBoundary: {
        ...actionFiveAwarenessCrystalEndStateAdapterInput.crystalState.assetBoundary,
        canExposeHexagramAsset: true,
      },
    },
  });
  assertEqual("premature asset boundary status", prematureAssetResult.status, "NOT_READY");
  assertEqual("premature asset boundary reason", prematureAssetResult.reason, "HEXAGRAM_ASSET_BOUNDARY_PREMATURE");

  const prematureRingResult = adaptCrystalState({
    ...actionFiveAwarenessCrystalEndStateAdapterInput,
    crystalState: {
      ...actionFiveAwarenessCrystalEndStateAdapterInput.crystalState,
      ringDepositMeaning: {
        ...actionFiveAwarenessCrystalEndStateAdapterInput.crystalState.ringDepositMeaning,
        shouldDepositToRingLite: true,
      },
    },
  });
  assertEqual("premature ring boundary status", prematureRingResult.status, "NOT_READY");
  assertEqual("premature ring boundary reason", prematureRingResult.reason, "RING_DEPOSIT_BOUNDARY_PREMATURE");

  console.log("\n[CRYSTAL END STATE ADAPTER PIPELINE] PASS");
} catch (error) {
  console.error("[CRYSTAL END STATE ADAPTER PIPELINE] FAIL");
  console.error(error instanceof Error ? error.message : error);
  process.exit(1);
} finally {
  fs.rmSync(tempRoot, { recursive: true, force: true });
}
