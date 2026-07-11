import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import process from "node:process";
import { createRequire } from "node:module";
import ts from "typescript";

const rootDir = process.cwd();
const tempRoot = fs.mkdtempSync(path.join(os.tmpdir(), "guanyao-persona-transmission-"));

const sourceFiles = [
  "src/services/personaTransmissionMappingService.ts",
  "src/services/fixtures/personaTransmissionFixtures.ts",
  "src/services/validators/personaTransmissionRuntimeValidator.ts",
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
  const { mapPersonaTransmission } = requireFromTemp("./src/services/personaTransmissionMappingService.js");
  const { actionFiveAwarenessMappingInput } = requireFromTemp("./src/services/fixtures/personaTransmissionFixtures.js");

  const passResult = mapPersonaTransmission(actionFiveAwarenessMappingInput);
  assertEqual("fixture action-five-awareness status", passResult.status, "PASS");
  assertEqual("fixture action-five-awareness unit id", passResult.unit?.identity?.unitId, "action-five-awareness");
  assertEqual("fixture action-five-awareness dimension", passResult.unit?.dimension, "action");
  assertEqual("fixture action-five-awareness yao stage", passResult.unit?.yaoStage, "awareness");

  const missingProfileResult = mapPersonaTransmission({
    ...actionFiveAwarenessMappingInput,
    yaoTransmissionProfile: undefined,
  });
  assertEqual("missing yaoTransmissionProfile status", missingProfileResult.status, "NOT_READY");
  assertEqual("missing yaoTransmissionProfile reason", missingProfileResult.reason, "YAO_TRANSMISSION_PROFILE_MISSING");

  const missingPressureResult = mapPersonaTransmission({
    ...actionFiveAwarenessMappingInput,
    pressureContext: {
      pressureSeedId: "action-five-awareness",
    },
  });
  assertEqual("missing pressure context status", missingPressureResult.status, "NOT_READY");
  assertEqual("missing pressure context reason", missingPressureResult.reason, "PRESSURE_CONTEXT_MISSING");

  console.log("\n[PERSONA TRANSMISSION PIPELINE] PASS");
} catch (error) {
  console.error("[PERSONA TRANSMISSION PIPELINE] FAIL");
  console.error(error instanceof Error ? error.message : error);
  process.exit(1);
} finally {
  fs.rmSync(tempRoot, { recursive: true, force: true });
}
