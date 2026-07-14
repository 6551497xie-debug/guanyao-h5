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
    bodyAwarenessChangeExperiencePresentation,
    emotionChangeAwarenessChangeExperiencePresentation,
    thoughtChangeCognitionChangeExperiencePresentation,
    actionFiveAwarenessChangeExperiencePresentation,
    memoryWisdomChangeExperiencePresentation,
    motivationDriveChangeExperiencePresentation,
  } = requireFromTemp("./src/services/fixtures/changeExperiencePresentationFixtures.js");
  const {
    validateChangeExperiencePresentation,
  } = requireFromTemp("./src/services/validators/changeExperiencePresentationValidator.js");

  const presentationCases = [
    {
      space: "body",
      name: "body-awareness change experience presentation",
      presentation: bodyAwarenessChangeExperiencePresentation,
    },
    {
      space: "emotion",
      name: "emotion-change change experience presentation",
      presentation: emotionChangeAwarenessChangeExperiencePresentation,
    },
    {
      space: "thought",
      name: "thought-change change experience presentation",
      presentation: thoughtChangeCognitionChangeExperiencePresentation,
    },
    {
      space: "action",
      name: "action-five change experience presentation",
      presentation: actionFiveAwarenessChangeExperiencePresentation,
    },
    {
      space: "memory",
      name: "memory-wisdom change experience presentation",
      presentation: memoryWisdomChangeExperiencePresentation,
    },
    {
      space: "motivation",
      name: "motivation-drive change experience presentation",
      presentation: motivationDriveChangeExperiencePresentation,
    },
  ];

  assertEqual("six-space presentation case count", presentationCases.length, 6);
  assertEqual(
    "six-space presentation uniqueness",
    new Set(presentationCases.map(({ space }) => space)).size,
    6,
  );

  presentationCases.forEach(({ name, presentation }) => {
    assertEqual(
      `${name} first response label`,
      presentation.recognition.firstResponseLabel,
      "这一刻首先出现的回应",
    );
    const validResult = validateChangeExperiencePresentation(presentation);
    assertEqual(
      name,
      validResult.status,
      "VALID_CHANGE_EXPERIENCE_PRESENTATION",
    );
  });

  const missingFirstResponseLabelResult = validateChangeExperiencePresentation({
    ...bodyAwarenessChangeExperiencePresentation,
    recognition: {
      ...bodyAwarenessChangeExperiencePresentation.recognition,
      firstResponseLabel: "",
    },
  });
  assertEqual(
    "first response label is required",
    missingFirstResponseLabelResult.reasons.includes("RECOGNITION_INCOMPLETE"),
    true,
  );

  presentationCases.forEach(({ name, presentation }) => {
    const invalidBoundaryResult = validateChangeExperiencePresentation({
      ...presentation,
      hexagramCode: "01",
    });
    assertEqual(
      `${name} boundary field guard`,
      invalidBoundaryResult.status,
      "CHANGE_EXPERIENCE_PRESENTATION_INVALID",
    );
    assertEqual(
      `${name} boundary field reason`,
      invalidBoundaryResult.reasons.includes("INVALID_PRESENTATION_BOUNDARY"),
      true,
    );
  });

  console.log("[CHANGE EXPERIENCE PRESENTATION] PASS");
} finally {
  fs.rmSync(tempRoot, { recursive: true, force: true });
}
