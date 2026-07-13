import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import process from "node:process";
import { createRequire } from "node:module";
import ts from "typescript";

const rootDir = process.cwd();
const tempRoot = fs.mkdtempSync(path.join(os.tmpdir(), "guanyao-hexagram-crystal-result-consumption-"));

const sourceFiles = [
  "src/services/hexagramCrystalResultConsumptionService.ts",
  "src/services/fixtures/crystalMappingFixtures.ts",
  "src/services/fixtures/hexagramCrystalInputFixtures.ts",
  "src/services/fixtures/hexagramCrystalEngineFixtures.ts",
  "src/services/fixtures/hexagramCrystalResultConsumptionFixtures.ts",
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

const assertAbsent = (name, object, forbiddenFields) => {
  const present = forbiddenFields.filter((field) => Object.prototype.hasOwnProperty.call(object, field));
  if (present.length > 0) {
    throw new Error(`${name} forbidden fields present=${present.join(",")}`);
  }
  console.log(`PASS | ${name} | forbidden=none`);
};

try {
  sourceFiles.forEach(transpileToTemp);
  const requireFromTemp = createRequire(path.join(tempRoot, "check.cjs"));
  const {
    actionFiveAwarenessHexagramCrystalResultConsumptionInput,
    actionFiveAwarenessHexagramCrystalResultConsumption,
  } = requireFromTemp("./src/services/fixtures/hexagramCrystalResultConsumptionFixtures.js");
  const { actionFiveAwarenessHexagramCrystalResult } = requireFromTemp(
    "./src/services/fixtures/hexagramCrystalEngineFixtures.js",
  );
  const { consumeHexagramCrystalResult } = requireFromTemp(
    "./src/services/hexagramCrystalResultConsumptionService.js",
  );
  const { actionFiveAwarenessMigrationImpact } = requireFromTemp("./src/services/fixtures/crystalMappingFixtures.js");

  const serviceConsumption = consumeHexagramCrystalResult({
    result: actionFiveAwarenessHexagramCrystalResult,
    source: "fixture",
  });
  const consumption = actionFiveAwarenessHexagramCrystalResultConsumption;
  assertEqual("fixture result consumption status", consumption.status, "READY_FOR_HEXAGRAM_EXPRESSION_LAYER");
  assertEqual("service result consumption status", serviceConsumption.status, "READY_FOR_HEXAGRAM_EXPRESSION_LAYER");
  assertEqual("fixture consumption input source", actionFiveAwarenessHexagramCrystalResultConsumptionInput.source, "fixture");
  assertEqual("fixture input result status", actionFiveAwarenessHexagramCrystalResultConsumptionInput.result.status, "READY");
  assertEqual(
    "fixture source expression is result expression",
    consumption.payload.sourceExpression.migrationLine,
    actionFiveAwarenessHexagramCrystalResult.expression.migrationLine,
  );
  assertEqual("fixture inherited hexagram name", consumption.payload.inheritedIdentity.hexagramName, "风山渐");
  assertEqual(
    "fixture crystal line comes from result",
    consumption.payload.crystalLine,
    actionFiveAwarenessHexagramCrystalResult.expression.crystalLine,
  );
  assertEqual(
    "fixture migration line comes from migration impact",
    consumption.payload.migrationLine,
    `${actionFiveAwarenessMigrationImpact.fromModel} → ${actionFiveAwarenessMigrationImpact.toResponse}`,
  );
  assertEqual(
    "fixture crystal meaning comes from result source input",
    consumption.payload.crystalMeaning,
    actionFiveAwarenessHexagramCrystalResult.sourceInput.crystalMeaning,
  );
  assertEqual(
    "fixture migration trace comes from result source input",
    consumption.payload.migrationTrace.traceLine,
    actionFiveAwarenessHexagramCrystalResult.sourceInput.migrationTrace.traceLine,
  );
  assertEqual(
    "fixture dominant shift comes from result source input",
    consumption.payload.dominantShift.deflectionVector,
    actionFiveAwarenessHexagramCrystalResult.sourceInput.dominantShift.deflectionVector,
  );
  assertEqual(
    "fixture readiness comes from result",
    consumption.payload.readiness,
    actionFiveAwarenessHexagramCrystalResult.readiness,
  );
  assertEqual(
    "service consumption matches fixture migration line",
    serviceConsumption.payload.migrationLine,
    consumption.payload.migrationLine,
  );
  assertEqual("fixture can enter expression layer", consumption.payload.boundary.canEnterHexagramExpressionLayer, true);
  assertEqual("fixture cannot mutate matrix", consumption.payload.boundary.canMutateHexagramMatrix, false);
  assertEqual("fixture cannot render UI", consumption.payload.boundary.canRenderUi, false);
  assertEqual("fixture cannot write storage", consumption.payload.boundary.canWriteStorage, false);
  assertEqual("fixture cannot create collectible asset", consumption.payload.boundary.canCreateCollectibleAsset, false);
  assertEqual("fixture cannot connect 384", consumption.payload.boundary.canConnect384, false);
  assertEqual("fixture cannot connect old R8", consumption.payload.boundary.canConnectOldR8, false);

  assertAbsent("fixture consumption payload boundary", consumption.payload, [
    "route",
    "storage",
    "ui",
    "score",
    "level",
    "growthValue",
    "hexagramMatrixMutation",
    "collectibleAsset",
  ]);

  const notReadyConsumption = consumeHexagramCrystalResult({
    result: {
      status: "NOT_READY",
      readiness: "NOT_READY",
      reason: "HEXAGRAM_CRYSTAL_INPUT_MISSING",
    },
    source: "fixture",
  });
  assertEqual("service not-ready result blocks consumption", notReadyConsumption.status, "NOT_READY");
  assertEqual(
    "service not-ready result reason",
    notReadyConsumption.reason,
    "HEXAGRAM_CRYSTAL_RESULT_NOT_READY",
  );

  console.log("\n[HEXAGRAM CRYSTAL RESULT CONSUMPTION] PASS");
} catch (error) {
  console.error("[HEXAGRAM CRYSTAL RESULT CONSUMPTION] FAIL");
  console.error(error instanceof Error ? error.message : error);
  process.exit(1);
} finally {
  fs.rmSync(tempRoot, { recursive: true, force: true });
}
