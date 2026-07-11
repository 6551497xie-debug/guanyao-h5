import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import process from "node:process";
import { createRequire } from "node:module";
import ts from "typescript";

const rootDir = process.cwd();
const tempRoot = fs.mkdtempSync(path.join(os.tmpdir(), "guanyao-change-experience-unit-"));

const sourceFiles = [
  "src/services/fixtures/changeExperienceFixtures.ts",
  "src/services/validators/changeExperienceUnitValidator.ts",
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
  const {
    actionFiveAwarenessChangeExperienceUnit,
  } = requireFromTemp("./src/services/fixtures/changeExperienceFixtures.js");
  const {
    validateChangeExperienceUnit,
  } = requireFromTemp("./src/services/validators/changeExperienceUnitValidator.js");

  const validResult = validateChangeExperienceUnit(actionFiveAwarenessChangeExperienceUnit);
  assertEqual("action-five change experience fixture", validResult.status, "VALID_CHANGE_EXPERIENCE_UNIT");

  const invalidBoundaryResult = validateChangeExperienceUnit({
    ...actionFiveAwarenessChangeExperienceUnit,
    readiness: "READY_TO_CRYSTALLIZE",
  });
  assertEqual("boundary field guard", invalidBoundaryResult.status, "CHANGE_EXPERIENCE_UNIT_INVALID");
  assertEqual("boundary field reason", invalidBoundaryResult.reasons.includes("INVALID_BOUNDARY"), true);

  console.log("[CHANGE EXPERIENCE UNIT] PASS");
} finally {
  fs.rmSync(tempRoot, { recursive: true, force: true });
}
