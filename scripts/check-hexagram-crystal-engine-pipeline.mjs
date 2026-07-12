import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import process from "node:process";
import { createRequire } from "node:module";
import ts from "typescript";

const rootDir = process.cwd();
const tempRoot = fs.mkdtempSync(path.join(os.tmpdir(), "guanyao-hexagram-crystal-engine-"));

const sourceFiles = [
  "src/services/hexagramCrystalEngineService.ts",
  "src/services/fixtures/crystalMappingFixtures.ts",
  "src/services/fixtures/hexagramCrystalInputFixtures.ts",
  "src/services/fixtures/hexagramCrystalEngineFixtures.ts",
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
  const { formHexagramCrystalResult } = requireFromTemp("./src/services/hexagramCrystalEngineService.js");
  const {
    actionFiveAwarenessHexagramCrystalEngineInput,
    actionFiveAwarenessHexagramCrystalResult,
  } = requireFromTemp("./src/services/fixtures/hexagramCrystalEngineFixtures.js");
  const { actionFiveAwarenessMigrationImpact } = requireFromTemp("./src/services/fixtures/crystalMappingFixtures.js");

  const readyResult = formHexagramCrystalResult(actionFiveAwarenessHexagramCrystalEngineInput);
  assertEqual("fixture action-five-awareness engine status", readyResult.status, "READY");
  assertEqual("fixture engine readiness", readyResult.readiness, "READY_FOR_HEXAGRAM_CRYSTAL_EXPRESSION");
  assertEqual("fixture identity inherits current hexagram", readyResult.expression?.hexagramName, "风山渐");
  assertEqual(
    "fixture crystal line comes from migration crystal meaning",
    readyResult.expression?.crystalLine,
    actionFiveAwarenessHexagramCrystalEngineInput.crystalMeaning,
  );
  assertEqual(
    "fixture migration line comes from dominant shift",
    readyResult.expression?.migrationLine,
    `${actionFiveAwarenessMigrationImpact.fromModel} → ${actionFiveAwarenessMigrationImpact.toResponse}`,
  );
  assertEqual(
    "fixture source input dominant shift from impact",
    readyResult.sourceInput?.dominantShift?.deflectionVector,
    actionFiveAwarenessMigrationImpact.deflectionVector,
  );
  assertEqual("fixture no hexagram matrix mutation guardrail", readyResult.guardrails?.noHexagramMatrixMutation, true);
  assertEqual("static fixture result status", actionFiveAwarenessHexagramCrystalResult.status, "READY");
  assertEqual(
    "static fixture result migration line",
    actionFiveAwarenessHexagramCrystalResult.expression?.migrationLine,
    readyResult.expression?.migrationLine,
  );

  const missingInputResult = formHexagramCrystalResult(null);
  assertEqual("missing engine input status", missingInputResult.status, "NOT_READY");
  assertEqual("missing engine input reason", missingInputResult.reason, "HEXAGRAM_CRYSTAL_INPUT_MISSING");

  const missingHexagramResult = formHexagramCrystalResult({
    ...actionFiveAwarenessHexagramCrystalEngineInput,
    sourceHexagram: {},
  });
  assertEqual("missing source hexagram status", missingHexagramResult.status, "NOT_READY");
  assertEqual("missing source hexagram reason", missingHexagramResult.reason, "SOURCE_HEXAGRAM_MISSING");

  const missingTraceResult = formHexagramCrystalResult({
    ...actionFiveAwarenessHexagramCrystalEngineInput,
    migrationTrace: {
      ...actionFiveAwarenessHexagramCrystalEngineInput.migrationTrace,
      traceLine: "",
    },
  });
  assertEqual("missing migration trace status", missingTraceResult.status, "NOT_READY");
  assertEqual("missing migration trace reason", missingTraceResult.reason, "MIGRATION_TRACE_MISSING");

  const missingShiftResult = formHexagramCrystalResult({
    ...actionFiveAwarenessHexagramCrystalEngineInput,
    dominantShift: {
      ...actionFiveAwarenessHexagramCrystalEngineInput.dominantShift,
      toResponse: "",
    },
  });
  assertEqual("missing dominant shift status", missingShiftResult.status, "NOT_READY");
  assertEqual("missing dominant shift reason", missingShiftResult.reason, "DOMINANT_SHIFT_MISSING");

  console.log("\n[HEXAGRAM CRYSTAL ENGINE PIPELINE] PASS");
} catch (error) {
  console.error("[HEXAGRAM CRYSTAL ENGINE PIPELINE] FAIL");
  console.error(error instanceof Error ? error.message : error);
  process.exit(1);
} finally {
  fs.rmSync(tempRoot, { recursive: true, force: true });
}
