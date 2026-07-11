import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import process from "node:process";
import { createRequire } from "node:module";
import ts from "typescript";

const rootDir = process.cwd();
const tempRoot = fs.mkdtempSync(path.join(os.tmpdir(), "guanyao-crystal-mapping-"));

const sourceFiles = [
  "src/services/crystalMappingService.ts",
  "src/services/fixtures/crystalMappingFixtures.ts",
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
  const { mapCrystalState } = requireFromTemp("./src/services/crystalMappingService.js");
  const {
    actionFiveAwarenessCrystalMappingInput,
    actionFiveAwarenessCrystalState,
    actionFiveAwarenessMigrationImpact,
  } = requireFromTemp("./src/services/fixtures/crystalMappingFixtures.js");

  const passResult = mapCrystalState(actionFiveAwarenessCrystalMappingInput);
  assertEqual("fixture action-five-awareness crystal mapping status", passResult.status, "PASS");
  assertEqual("fixture crystal readiness", passResult.crystalState?.readiness, "READY_TO_CRYSTALLIZE");
  assertEqual(
    "fixture dominant impact unit id",
    passResult.crystalState?.dominantImpact?.sourceUnit?.unitId,
    "action-five-awareness",
  );
  assertEqual("fixture can create currentCrystalEndState", passResult.crystalState?.assetBoundary?.canCreateCurrentCrystalEndState, true);
  assertEqual("fixture cannot expose hexagram asset yet", passResult.crystalState?.assetBoundary?.canExposeHexagramAsset, false);
  assertEqual("fixture cannot deposit ring lite yet", passResult.crystalState?.assetBoundary?.canDepositToRingLite, false);

  assertEqual("static fixture crystal state readiness", actionFiveAwarenessCrystalState.readiness, "READY_TO_CRYSTALLIZE");
  assertEqual("static fixture visible asset boundary", actionFiveAwarenessCrystalState.assetBoundary.canExposeHexagramAsset, false);

  const missingStructureResult = mapCrystalState({
    ...actionFiveAwarenessCrystalMappingInput,
    structureSource: null,
  });
  assertEqual("missing currentHexagramProfile status", missingStructureResult.status, "NOT_READY");
  assertEqual("missing currentHexagramProfile reason", missingStructureResult.reason, "CURRENT_HEXAGRAM_PROFILE_MISSING");
  assertEqual("missing currentHexagramProfile crystal readiness", missingStructureResult.crystalState?.readiness, "NOT_READY");

  const missingReadyImpactResult = mapCrystalState({
    ...actionFiveAwarenessCrystalMappingInput,
    migrationImpacts: [
      {
        ...actionFiveAwarenessMigrationImpact,
        impactReadiness: "NOT_READY",
      },
    ],
  });
  assertEqual("missing ready impact status", missingReadyImpactResult.status, "NOT_READY");
  assertEqual("missing ready impact reason", missingReadyImpactResult.reason, "READY_MIGRATION_IMPACT_MISSING");
  assertEqual("missing ready impact crystal readiness", missingReadyImpactResult.crystalState?.readiness, "NOT_READY");

  const multipleReadyImpactResult = mapCrystalState({
    ...actionFiveAwarenessCrystalMappingInput,
    migrationImpacts: [
      actionFiveAwarenessMigrationImpact,
      {
        ...actionFiveAwarenessMigrationImpact,
        sourceUnit: {
          ...actionFiveAwarenessMigrationImpact.sourceUnit,
          unitId: "action-five-awareness-copy",
        },
      },
    ],
  });
  assertEqual("multiple ready impacts status", multipleReadyImpactResult.status, "NOT_READY");
  assertEqual("multiple ready impacts reason", multipleReadyImpactResult.reason, "DOMINANT_IMPACT_UNRESOLVED");
  assertEqual("multiple ready impacts crystal readiness", multipleReadyImpactResult.crystalState?.readiness, "NOT_READY");

  console.log("\n[CRYSTAL MAPPING PIPELINE] PASS");
} catch (error) {
  console.error("[CRYSTAL MAPPING PIPELINE] FAIL");
  console.error(error instanceof Error ? error.message : error);
  process.exit(1);
} finally {
  fs.rmSync(tempRoot, { recursive: true, force: true });
}
