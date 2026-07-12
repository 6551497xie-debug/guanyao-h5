import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import process from "node:process";
import { createRequire } from "node:module";
import ts from "typescript";

const rootDir = process.cwd();
const tempRoot = fs.mkdtempSync(path.join(os.tmpdir(), "guanyao-change-experience-presentation-"));

const sourceFiles = [
  "src/services/fixtures/personaTransmissionFixtures.ts",
  "src/services/fixtures/personaTransmissionExperienceFixtures.ts",
  "src/services/fixtures/changeExperienceFixtures.ts",
  "src/services/changeExperiencePresentationAdapter.ts",
  "src/services/fixtures/changeExperiencePresentationFixtures.ts",
  "src/services/validators/changeExperiencePresentationValidator.ts",
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
    actionFiveAwarenessChangeExperiencePresentation,
  } = requireFromTemp("./src/services/fixtures/changeExperiencePresentationFixtures.js");
  const {
    validateChangeExperiencePresentation,
  } = requireFromTemp("./src/services/validators/changeExperiencePresentationValidator.js");

  const validResult = validateChangeExperiencePresentation(actionFiveAwarenessChangeExperiencePresentation);
  assertEqual(
    "action-five change experience presentation",
    validResult.status,
    "VALID_CHANGE_EXPERIENCE_PRESENTATION",
  );

  const invalidBoundaryResult = validateChangeExperiencePresentation({
    ...actionFiveAwarenessChangeExperiencePresentation,
    hexagramCode: "01",
  });
  assertEqual(
    "presentation boundary field guard",
    invalidBoundaryResult.status,
    "CHANGE_EXPERIENCE_PRESENTATION_INVALID",
  );
  assertEqual("presentation boundary field reason", invalidBoundaryResult.reasons.includes("INVALID_PRESENTATION_BOUNDARY"), true);

  console.log("[CHANGE EXPERIENCE PRESENTATION] PASS");
} finally {
  fs.rmSync(tempRoot, { recursive: true, force: true });
}
