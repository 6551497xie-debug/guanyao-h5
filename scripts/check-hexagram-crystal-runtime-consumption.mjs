import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import process from "node:process";
import { createRequire } from "node:module";
import ts from "typescript";

const rootDir = process.cwd();
const tempRoot = fs.mkdtempSync(path.join(os.tmpdir(), "guanyao-hexagram-crystal-runtime-consumption-"));

const sourceFiles = [
  "src/services/personaMigrationImpactRuntimeService.ts",
  "src/services/crystalEndStateAdapterService.ts",
  "src/services/crystalMappingService.ts",
  "src/services/hexagramCrystalEngineService.ts",
  "src/services/hexagramCrystalResultConsumptionService.ts",
  "src/services/hexagramCrystalRuntimeEndpointService.ts",
  "src/services/fixtures/changeExperienceFixtures.ts",
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

const assertIncludes = (name, source, expected) => {
  if (!source.includes(expected)) throw new Error(`${name} missing=${expected}`);
  console.log(`PASS | ${name} | includes=${expected}`);
};

const assertNotIncludes = (name, source, forbidden) => {
  if (source.includes(forbidden)) throw new Error(`${name} forbidden=${forbidden}`);
  console.log(`PASS | ${name} | forbidden=absent`);
};

const formDomainFacts = (unit, overrides = {}, visualMetadata) => ({
  oldReaction: overrides.oldReaction ?? unit.recognition.oldReaction,
  revisedResponse: overrides.revisedResponse ?? unit.revision.newResponse,
  crystalImprint: overrides.crystalImprint ?? unit.meaning.crystalImprint,
  migrationTrace: overrides.migrationTrace ?? unit.revision.transformationMoment,
  dominantShift:
    overrides.dominantShift ??
    `${unit.recognition.rootProtection}:${unit.recognition.manifestBehavior} → ${unit.revision.changeType}`,
  visualMetadata,
});

const formCurrentCrystalEndState = ({
  formRuntimePersonaMigrationImpact,
  resolveRuntimeCurrentCrystalEndState,
  currentHexagramProfile,
  unit,
  overrides,
  visualMetadata,
}) => {
  const dimension = unit.dimension;
  const impact = formRuntimePersonaMigrationImpact({
    sourceUnitId: `gravity-${dimension}-awareness`,
    dimension,
    yaoStage: "awareness",
    domainFacts: formDomainFacts(unit, overrides, visualMetadata),
  });

  return {
    impact,
    currentCrystalEndState: resolveRuntimeCurrentCrystalEndState({
      currentHexagramProfile,
      motherCodeName: "乾",
      selectedPressureSeedContext: {
        selectedPressureSeedId: `${dimension}-change-experience`,
        surface: unit.context.pressureContext,
        pressureField: dimension.toUpperCase(),
      },
      completedNodeCount: 6,
      primaryDimension: dimension,
      readyToCrystallize: true,
      migrationImpact: impact,
      createdAt: "2026-07-13T00:00:00.000Z",
    }),
  };
};

try {
  const gravityPageSource = fs.readFileSync(path.join(rootDir, "src/pages/GravityPage.tsx"), "utf8");
  assertIncludes(
    "gravity final endpoint delegates to Dynamics crystal adapter",
    gravityPageSource,
    "resolveDynamicsCurrentCrystalEndState({",
  );
  assertNotIncludes(
    "gravity no longer calls runtime crystal endpoint directly",
    gravityPageSource,
    "resolveRuntimeCurrentCrystalEndState",
  );
  assertNotIncludes(
    "gravity no longer calls result consumption directly",
    gravityPageSource,
    "consumeHexagramCrystalResult",
  );
  assertNotIncludes(
    "gravity no longer calls crystal mapping directly",
    gravityPageSource,
    "mapCrystalState",
  );
  assertNotIncludes(
    "gravity no longer calls hexagram crystal engine directly",
    gravityPageSource,
    "formHexagramCrystalResult",
  );
  assertNotIncludes(
    "gravity final hexagram lower is not direct currentHexagramProfile",
    gravityPageSource,
    "lowerTrigram: currentHexagramProfile.lowerTrigram",
  );
  assertNotIncludes(
    "gravity final hexagram upper is not direct currentHexagramProfile",
    gravityPageSource,
    "upperTrigram: currentHexagramProfile.upperTrigram",
  );
  assertNotIncludes(
    "gravity final hexagram name is not direct currentHexagramProfile",
    gravityPageSource,
    "hexagramName: currentHexagramProfile.hexagramName",
  );
  assertNotIncludes(
    "gravity does not persist raw current hexagram orientation",
    gravityPageSource,
    "guanyao:currentHexagramProfile",
  );
  assertNotIncludes(
    "gravity does not persist raw current crystal end state",
    gravityPageSource,
    "guanyao:currentCrystalEndState",
  );
  assertNotIncludes(
    "gravity does not own generic runtime snapshot storage",
    gravityPageSource,
    "writeJsonToStorage",
  );
  assertIncludes(
    "gravity keeps explicit personality ring deposition adapter",
    gravityPageSource,
    "createPersonalityRingLiteEntryFromCrystal(state)",
  );
  assertIncludes(
    "gravity keeps explicit personality ring persistence",
    gravityPageSource,
    "savePersonalityRingLiteEntry(entry)",
  );

  sourceFiles.forEach(transpileToTemp);
  const requireFromTemp = createRequire(path.join(tempRoot, "check.cjs"));
  const { formRuntimePersonaMigrationImpact } = requireFromTemp(
    "./src/services/personaMigrationImpactRuntimeService.js",
  );
  const { resolveRuntimeCurrentCrystalEndState } = requireFromTemp(
    "./src/services/hexagramCrystalRuntimeEndpointService.js",
  );
  const { consumeHexagramCrystalResult } = requireFromTemp(
    "./src/services/hexagramCrystalResultConsumptionService.js",
  );
  const {
    actionFiveAwarenessChangeExperienceUnit,
    bodyAwarenessChangeExperienceUnit,
    emotionChangeAwarenessChangeExperienceUnit,
    memoryWisdomChangeExperienceUnit,
    motivationDriveChangeExperienceUnit,
    thoughtChangeCognitionChangeExperienceUnit,
  } = requireFromTemp(
    "./src/services/fixtures/changeExperienceFixtures.js",
  );
  const { actionFiveAwarenessCrystalStructureSource } = requireFromTemp(
    "./src/services/fixtures/crystalMappingFixtures.js",
  );
  const currentHexagramProfile = actionFiveAwarenessCrystalStructureSource.currentHexagramProfile;

  const sixSpaceCases = [
    {
      dimension: "body",
      unit: bodyAwarenessChangeExperienceUnit,
    },
    {
      dimension: "emotion",
      unit: emotionChangeAwarenessChangeExperienceUnit,
    },
    {
      dimension: "thought",
      unit: thoughtChangeCognitionChangeExperienceUnit,
    },
    {
      dimension: "action",
      unit: actionFiveAwarenessChangeExperienceUnit,
    },
    {
      dimension: "memory",
      unit: memoryWisdomChangeExperienceUnit,
    },
    {
      dimension: "motivation",
      unit: motivationDriveChangeExperienceUnit,
    },
  ];

  assertEqual("six-space runtime consumption case count", sixSpaceCases.length, 6);
  assertEqual(
    "six-space runtime consumption uniqueness",
    new Set(sixSpaceCases.map(({ dimension }) => dimension)).size,
    6,
  );

  sixSpaceCases.forEach(({ dimension, unit }) => {
    const runtime = formCurrentCrystalEndState({
      formRuntimePersonaMigrationImpact,
      resolveRuntimeCurrentCrystalEndState,
      currentHexagramProfile,
      unit,
    });

    assertEqual(`${dimension} runtime impact is ready`, runtime.impact?.impactReadiness, "READY_FOR_CRYSTAL");
    assertEqual(`${dimension} runtime endpoint returns currentCrystalEndState`, Boolean(runtime.currentCrystalEndState), true);
    assertEqual(
      `${dimension} runtime endpoint primary dimension`,
      runtime.currentCrystalEndState.transmission.primaryDimension,
      dimension,
    );
    assertEqual(
      `${dimension} runtime endpoint crystal line`,
      runtime.currentCrystalEndState.crystal.copy,
      `这一局把${unit.recognition.oldReaction}转向${unit.revision.newResponse}`,
    );
    assertEqual(
      `${dimension} runtime endpoint inherits source hexagram`,
      runtime.currentCrystalEndState.hexagram.hexagramName,
      currentHexagramProfile.hexagramName,
    );
    assertEqual(
      `${dimension} runtime impact carries crystal imprint`,
      runtime.impact.crystalImprint.imprintLine,
      unit.meaning.crystalImprint,
    );
  });

  const baseRuntime = formCurrentCrystalEndState({
    formRuntimePersonaMigrationImpact,
    resolveRuntimeCurrentCrystalEndState,
    currentHexagramProfile,
    unit: actionFiveAwarenessChangeExperienceUnit,
  });

  assertEqual("runtime endpoint returns currentCrystalEndState", Boolean(baseRuntime.currentCrystalEndState), true);
  assertEqual("runtime endpoint inherited source hexagram", baseRuntime.currentCrystalEndState.hexagram.hexagramName, "风山渐");
  assertEqual(
    "runtime endpoint crystal line comes from result consumption",
    baseRuntime.currentCrystalEndState.crystal.copy,
    "这一局把你习惯通过行动快速恢复掌控。转向先判断真正要解决的问题，再采取行动。",
  );
  assertEqual(
    "runtime endpoint primary dimension comes from migration trace",
    baseRuntime.currentCrystalEndState.transmission.primaryDimension,
    "action",
  );
  assertEqual(
    "runtime endpoint blocks storage writes",
    baseRuntime.currentCrystalEndState.source,
    "dynamics",
  );

  const changedMigration = formCurrentCrystalEndState({
    formRuntimePersonaMigrationImpact,
    resolveRuntimeCurrentCrystalEndState,
    currentHexagramProfile,
    unit: actionFiveAwarenessChangeExperienceUnit,
    overrides: {
      oldReaction: "旧反应被 runtime 改变。",
      revisedResponse: "新的回应方向被 runtime 改变。",
      crystalImprint: "新的迁移痕迹被 runtime 改变。",
      migrationTrace: "新的迁移轨迹。",
      dominantShift: "runtime-dominant-shift-changed",
    },
  });

  assertEqual(
    "source hexagram identity remains inherited",
    changedMigration.currentCrystalEndState.hexagram.hexagramName,
    baseRuntime.currentCrystalEndState.hexagram.hexagramName,
  );
  assertEqual(
    "changed migration updates crystal line",
    changedMigration.currentCrystalEndState.crystal.copy,
    "这一局把旧反应被 runtime 改变。转向新的回应方向被 runtime 改变。",
  );
  assertEqual(
    "changed migration updates impact dominant shift",
    changedMigration.impact.deflectionVector,
    "runtime-dominant-shift-changed",
  );

  const visualOnlyMutation = formCurrentCrystalEndState({
    formRuntimePersonaMigrationImpact,
    resolveRuntimeCurrentCrystalEndState,
    currentHexagramProfile,
    unit: actionFiveAwarenessChangeExperienceUnit,
    visualMetadata: {
      starbeastBefore: "visual-only before changed",
      starbeastAfter: "visual-only after changed",
      starbeastCue: "visual-only cue changed",
    },
  });

  assertEqual(
    "visual metadata does not change crystal line",
    visualOnlyMutation.currentCrystalEndState.crystal.copy,
    baseRuntime.currentCrystalEndState.crystal.copy,
  );
  assertEqual(
    "visual metadata does not change dominant shift",
    visualOnlyMutation.impact.deflectionVector,
    baseRuntime.impact.deflectionVector,
  );

  const notReadyCurrentCrystal = resolveRuntimeCurrentCrystalEndState({
    currentHexagramProfile,
    motherCodeName: "乾",
    selectedPressureSeedContext: null,
    completedNodeCount: 6,
    readyToCrystallize: true,
    migrationImpact: null,
  });
  assertEqual("not ready endpoint blocks currentCrystalEndState", notReadyCurrentCrystal, null);

  const notReadyConsumption = consumeHexagramCrystalResult({
    result: {
      status: "NOT_READY",
      readiness: "NOT_READY",
      reason: "HEXAGRAM_CRYSTAL_INPUT_MISSING",
    },
    source: "runtime",
  });
  assertEqual("not ready result blocks consumption", notReadyConsumption.status, "NOT_READY");
  assertEqual(
    "not ready result reason",
    notReadyConsumption.reason,
    "HEXAGRAM_CRYSTAL_RESULT_NOT_READY",
  );

  console.log("\n[HEXAGRAM CRYSTAL RUNTIME CONSUMPTION] PASS");
} catch (error) {
  console.error("[HEXAGRAM CRYSTAL RUNTIME CONSUMPTION] FAIL");
  console.error(error instanceof Error ? error.message : error);
  process.exit(1);
} finally {
  fs.rmSync(tempRoot, { recursive: true, force: true });
}
