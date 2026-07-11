import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import process from "node:process";
import { createRequire } from "node:module";
import ts from "typescript";

const rootDir = process.cwd();
const tempRoot = fs.mkdtempSync(path.join(os.tmpdir(), "guanyao-hexagram-crystal-adapter-"));

const sourceFiles = [
  "src/services/hexagramCrystalAdapterService.ts",
  "src/services/fixtures/crystalMappingFixtures.ts",
  "src/services/fixtures/hexagramCrystalInputFixtures.ts",
  "src/services/fixtures/hexagramCrystalAdapterFixtures.ts",
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
  const { adaptHexagramCrystalInput } = requireFromTemp("./src/services/hexagramCrystalAdapterService.js");
  const {
    actionFiveAwarenessCurrentCrystalEndState,
    actionFiveAwarenessHexagramCrystalAdapterInput,
    actionFiveAwarenessHexagramCrystalAdapterResult,
  } = requireFromTemp("./src/services/fixtures/hexagramCrystalAdapterFixtures.js");

  const readyResult = adaptHexagramCrystalInput(actionFiveAwarenessHexagramCrystalAdapterInput);
  assertEqual("fixture action-five-awareness adapter status", readyResult.status, "READY");
  assertEqual("fixture hexagram crystal readiness", readyResult.input?.readiness, "READY_FOR_HEXAGRAM_CRYSTAL");
  assertEqual("fixture source crystal status", readyResult.input?.sourceCrystal?.status, "CRYSTALLIZED");
  assertEqual("fixture source hexagram name", readyResult.input?.sourceHexagram?.hexagramName, "风山渐");
  assertEqual("fixture source", readyResult.input?.source, "fixture");
  assertEqual("fixture no hexagram generation guardrail", readyResult.input?.guardrails?.noHexagramGeneration, true);
  assertEqual("fixture no currentCrystalEndState mutation guardrail", readyResult.input?.guardrails?.noCurrentCrystalEndStateMutation, true);
  assertEqual("fixture no 384 guardrail", readyResult.input?.guardrails?.no384Yao, true);
  assertEqual("static fixture adapter result status", actionFiveAwarenessHexagramCrystalAdapterResult.status, "READY");
  assertEqual(
    "static fixture adapter result readiness",
    actionFiveAwarenessHexagramCrystalAdapterResult.input?.readiness,
    "READY_FOR_HEXAGRAM_CRYSTAL",
  );

  const missingCrystalResult = adaptHexagramCrystalInput({
    ...actionFiveAwarenessHexagramCrystalAdapterInput,
    sourceCrystal: null,
  });
  assertEqual("missing currentCrystalEndState status", missingCrystalResult.status, "NOT_READY");
  assertEqual(
    "missing currentCrystalEndState reason",
    missingCrystalResult.reason,
    "CURRENT_CRYSTAL_END_STATE_MISSING",
  );

  const notCrystallizedResult = adaptHexagramCrystalInput({
    ...actionFiveAwarenessHexagramCrystalAdapterInput,
    sourceCrystal: {
      ...actionFiveAwarenessCurrentCrystalEndState,
      status: "READY_TO_CRYSTALLIZE",
    },
  });
  assertEqual("not-crystallized currentCrystalEndState status", notCrystallizedResult.status, "NOT_READY");
  assertEqual(
    "not-crystallized currentCrystalEndState reason",
    notCrystallizedResult.reason,
    "CURRENT_CRYSTAL_END_STATE_NOT_CRYSTALLIZED",
  );

  const missingHexagramResult = adaptHexagramCrystalInput({
    ...actionFiveAwarenessHexagramCrystalAdapterInput,
    sourceCrystal: {
      ...actionFiveAwarenessCurrentCrystalEndState,
      hexagram: {},
    },
  });
  assertEqual("missing hexagram structure status", missingHexagramResult.status, "NOT_READY");
  assertEqual("missing hexagram structure reason", missingHexagramResult.reason, "HEXAGRAM_STRUCTURE_MISSING");

  const missingMovementTraceResult = adaptHexagramCrystalInput({
    ...actionFiveAwarenessHexagramCrystalAdapterInput,
    sourceCrystal: {
      ...actionFiveAwarenessCurrentCrystalEndState,
      transmission: {
        completedNodeCount: 0,
        primaryDimension: "action",
      },
    },
  });
  assertEqual("missing movement trace status", missingMovementTraceResult.status, "NOT_READY");
  assertEqual("missing movement trace reason", missingMovementTraceResult.reason, "MOVEMENT_TRACE_MISSING");

  console.log("\n[HEXAGRAM CRYSTAL ADAPTER PIPELINE] PASS");
} catch (error) {
  console.error("[HEXAGRAM CRYSTAL ADAPTER PIPELINE] FAIL");
  console.error(error instanceof Error ? error.message : error);
  process.exit(1);
} finally {
  fs.rmSync(tempRoot, { recursive: true, force: true });
}
