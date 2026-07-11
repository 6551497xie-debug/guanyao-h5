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
  "src/services/fixtures/personaTransmissionExperienceFixtures.ts",
  "src/services/fixtures/personaTransmissionExperiencePresentationFixtures.ts",
  "src/services/validators/personaTransmissionRuntimeValidator.ts",
  "src/services/validators/personaTransmissionExperienceValidator.ts",
];

const forbiddenPresentationPatterns = [
  "pressureReading",
  "inertiaSignal",
  "antiInstinctHint",
  "mainCut",
  "检测到",
  "分析显示",
  "模型判断",
  "等级",
  "升级",
  "经验",
  "奖励",
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

const assertNoForbiddenPresentationLanguage = (presentation) => {
  const presentationText = JSON.stringify(presentation);
  const forbiddenPattern = forbiddenPresentationPatterns.find((pattern) => presentationText.includes(pattern));

  if (forbiddenPattern) {
    throw new Error(`presentation forbidden language found=${forbiddenPattern}`);
  }

  console.log("PASS | presentation language guard | forbidden=none");
};

try {
  sourceFiles.forEach(transpileToTemp);
  const requireFromTemp = createRequire(path.join(tempRoot, "check.cjs"));
  const { mapPersonaTransmission } = requireFromTemp("./src/services/personaTransmissionMappingService.js");
  const { actionFiveAwarenessMappingInput } = requireFromTemp("./src/services/fixtures/personaTransmissionFixtures.js");
  const {
    actionFiveAwarenessExperienceModel,
    createPersonaTransmissionExperienceModel,
  } = requireFromTemp("./src/services/fixtures/personaTransmissionExperienceFixtures.js");
  const {
    actionFiveAwarenessExperiencePresentation,
    createPersonaTransmissionExperiencePresentation,
  } = requireFromTemp("./src/services/fixtures/personaTransmissionExperiencePresentationFixtures.js");
  const {
    validatePersonaTransmissionExperienceModel,
  } = requireFromTemp("./src/services/validators/personaTransmissionExperienceValidator.js");

  const passResult = mapPersonaTransmission(actionFiveAwarenessMappingInput);
  assertEqual("fixture action-five-awareness status", passResult.status, "PASS");
  assertEqual("fixture action-five-awareness unit id", passResult.unit?.identity?.unitId, "action-five-awareness");
  assertEqual("fixture action-five-awareness dimension", passResult.unit?.dimension, "action");
  assertEqual("fixture action-five-awareness yao stage", passResult.unit?.yaoStage, "awareness");

  const experienceResult = createPersonaTransmissionExperienceModel(passResult.unit);
  assertEqual("fixture action-five-awareness experience status", experienceResult.status, "READY");
  assertEqual("fixture action-five-awareness experience unit id", experienceResult.identity?.unitId, "action-five-awareness");
  assertEqual("fixture action-five-awareness experience dimension", experienceResult.identity?.dimension, "action");
  assertEqual("fixture action-five-awareness experience yao stage", experienceResult.identity?.yaoStage, "awareness");
  assertEqual(
    "fixture action-five-awareness experience insight",
    experienceResult.recognition?.insightLine,
    "你已经习惯用行动，让自己重新获得掌控感。",
  );

  const experienceValidation = validatePersonaTransmissionExperienceModel(experienceResult);
  assertEqual("fixture action-five-awareness experience validation", experienceValidation.status, "PASS");

  const staticExperienceValidation = validatePersonaTransmissionExperienceModel(actionFiveAwarenessExperienceModel);
  assertEqual("static action-five-awareness experience validation", staticExperienceValidation.status, "PASS");

  const presentation = createPersonaTransmissionExperiencePresentation(experienceResult);
  assertEqual("fixture action-five-awareness presentation unit id", presentation.identity?.unitId, "action-five-awareness");
  assertEqual("fixture action-five-awareness presentation orientation question", presentation.orientation?.question, "发生了什么？");
  assertEqual("fixture action-five-awareness presentation recognition question", presentation.recognition?.question, "为什么会这样？");
  assertEqual("fixture action-five-awareness presentation revision question", presentation.revision?.question, "我可以怎么不同？");
  assertEqual("fixture action-five-awareness presentation starbeast question", presentation.starbeast?.question, "我的变化如何发生？");
  assertEqual("fixture action-five-awareness presentation trace question", presentation.trace?.question, "变化在哪里留下？");
  assertEqual(
    "fixture action-five-awareness presentation micro action",
    presentation.revision?.microActionLine,
    "下一次行动前，先确认真正要解决的问题。",
  );
  assertNoForbiddenPresentationLanguage(presentation);

  assertEqual(
    "static action-five-awareness presentation unit id",
    actionFiveAwarenessExperiencePresentation.identity?.unitId,
    "action-five-awareness",
  );
  assertNoForbiddenPresentationLanguage(actionFiveAwarenessExperiencePresentation);

  const unknownExperienceResult = createPersonaTransmissionExperienceModel({
    ...passResult.unit,
    identity: {
      unitId: "unknown-unit",
    },
  });
  assertEqual("unknown runtime unit experience status", unknownExperienceResult.status, "NOT_READY");
  assertEqual(
    "unknown runtime unit experience reason",
    unknownExperienceResult.reason,
    "PERSONA_TRANSMISSION_EXPERIENCE_FIXTURE_NOT_IMPLEMENTED",
  );

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
