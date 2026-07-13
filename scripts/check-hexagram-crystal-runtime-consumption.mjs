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
  "src/services/crystalMappingService.ts",
  "src/services/hexagramCrystalEngineService.ts",
  "src/services/hexagramCrystalResultConsumptionService.ts",
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

const formConsumption = ({
  formRuntimePersonaMigrationImpact,
  mapCrystalState,
  formHexagramCrystalResult,
  consumeHexagramCrystalResult,
  structureSource,
  unit,
  overrides,
  visualMetadata,
}) => {
  const impact = formRuntimePersonaMigrationImpact({
    sourceUnitId: "gravity-action-awareness",
    dimension: "action",
    yaoStage: "awareness",
    domainFacts: formDomainFacts(unit, overrides, visualMetadata),
  });

  const crystalMappingResult = mapCrystalState({
    structureSource,
    migrationImpacts: impact ? [impact] : [],
    source: "runtime",
  });

  if (crystalMappingResult.status !== "PASS") {
    return {
      impact,
      crystalMappingResult,
      engineResult: null,
      consumption: consumeHexagramCrystalResult({
        result: formHexagramCrystalResult(null),
        source: "runtime",
      }),
    };
  }

  const currentHexagramProfile = crystalMappingResult.crystalState.structureSource.currentHexagramProfile;
  const dominantImpact = crystalMappingResult.crystalState.dominantImpact;
  const engineResult = formHexagramCrystalResult({
    sourceHexagram: {
      lowerTrigram: currentHexagramProfile.lowerTrigram,
      upperTrigram: currentHexagramProfile.upperTrigram,
      hexagramCode: currentHexagramProfile.hexagramCode,
      hexagramName: currentHexagramProfile.hexagramName,
      hexagramTitle: currentHexagramProfile.hexagramTitle,
    },
    crystalMeaning: crystalMappingResult.crystalState.crystalMeaning,
    migrationTrace: {
      traceLine: dominantImpact.crystalImprint.imprintLine,
      sourceUnitId: dominantImpact.sourceUnit.unitId,
      dimension: dominantImpact.dimension,
      yaoStage: dominantImpact.yaoStage,
    },
    dominantShift: {
      fromModel: dominantImpact.fromModel,
      toResponse: dominantImpact.toResponse,
      deflectionVector: dominantImpact.deflectionVector,
    },
    changedLineContext: {
      sourceUnitId: dominantImpact.sourceUnit.unitId,
      dimension: dominantImpact.dimension,
      yaoStage: dominantImpact.yaoStage,
      changedLineHint: dominantImpact.crystalImprint.imprintLine,
    },
    source: "runtime",
  });

  return {
    impact,
    crystalMappingResult,
    engineResult,
    consumption: consumeHexagramCrystalResult({
      result: engineResult,
      source: "runtime",
    }),
  };
};

try {
  const gravityPageSource = fs.readFileSync(path.join(rootDir, "src/pages/GravityPage.tsx"), "utf8");
  assertIncludes("gravity final endpoint consumes result consumption", gravityPageSource, "consumeHexagramCrystalResult");
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

  sourceFiles.forEach(transpileToTemp);
  const requireFromTemp = createRequire(path.join(tempRoot, "check.cjs"));
  const { formRuntimePersonaMigrationImpact } = requireFromTemp(
    "./src/services/personaMigrationImpactRuntimeService.js",
  );
  const { mapCrystalState } = requireFromTemp("./src/services/crystalMappingService.js");
  const { formHexagramCrystalResult } = requireFromTemp("./src/services/hexagramCrystalEngineService.js");
  const { consumeHexagramCrystalResult } = requireFromTemp(
    "./src/services/hexagramCrystalResultConsumptionService.js",
  );
  const { actionFiveAwarenessChangeExperienceUnit } = requireFromTemp(
    "./src/services/fixtures/changeExperienceFixtures.js",
  );
  const { actionFiveAwarenessCrystalStructureSource } = requireFromTemp(
    "./src/services/fixtures/crystalMappingFixtures.js",
  );

  const baseRuntime = formConsumption({
    formRuntimePersonaMigrationImpact,
    mapCrystalState,
    formHexagramCrystalResult,
    consumeHexagramCrystalResult,
    structureSource: actionFiveAwarenessCrystalStructureSource,
    unit: actionFiveAwarenessChangeExperienceUnit,
  });

  assertEqual("runtime consumption status", baseRuntime.consumption.status, "READY_FOR_HEXAGRAM_EXPRESSION_LAYER");
  assertEqual("runtime result status", baseRuntime.engineResult.status, "READY");
  assertEqual("runtime inherited source hexagram", baseRuntime.consumption.payload.inheritedIdentity.hexagramName, "风山渐");
  assertEqual(
    "runtime consumption migration line comes from result",
    baseRuntime.consumption.payload.migrationLine,
    baseRuntime.engineResult.expression.migrationLine,
  );
  assertEqual(
    "runtime consumption crystal line comes from result",
    baseRuntime.consumption.payload.crystalLine,
    baseRuntime.engineResult.expression.crystalLine,
  );
  assertEqual(
    "runtime consumption carries dominant shift",
    baseRuntime.consumption.payload.dominantShift.deflectionVector,
    baseRuntime.impact.deflectionVector,
  );
  assertEqual(
    "runtime consumption carries migration trace",
    baseRuntime.consumption.payload.migrationTrace.traceLine,
    baseRuntime.impact.crystalImprint.imprintLine,
  );

  const changedMigration = formConsumption({
    formRuntimePersonaMigrationImpact,
    mapCrystalState,
    formHexagramCrystalResult,
    consumeHexagramCrystalResult,
    structureSource: actionFiveAwarenessCrystalStructureSource,
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
    changedMigration.consumption.payload.inheritedIdentity.hexagramName,
    baseRuntime.consumption.payload.inheritedIdentity.hexagramName,
  );
  assertEqual(
    "changed migration updates migration line",
    changedMigration.consumption.payload.migrationLine,
    "旧反应被 runtime 改变。 → 新的回应方向被 runtime 改变。",
  );
  assertEqual(
    "changed migration updates crystal line",
    changedMigration.consumption.payload.crystalLine,
    "这一局把旧反应被 runtime 改变。转向新的回应方向被 runtime 改变。",
  );
  assertEqual(
    "changed migration updates dominant shift",
    changedMigration.consumption.payload.dominantShift.deflectionVector,
    "runtime-dominant-shift-changed",
  );

  const visualOnlyMutation = formConsumption({
    formRuntimePersonaMigrationImpact,
    mapCrystalState,
    formHexagramCrystalResult,
    consumeHexagramCrystalResult,
    structureSource: actionFiveAwarenessCrystalStructureSource,
    unit: actionFiveAwarenessChangeExperienceUnit,
    visualMetadata: {
      starbeastBefore: "visual-only before changed",
      starbeastAfter: "visual-only after changed",
      starbeastCue: "visual-only cue changed",
    },
  });

  assertEqual(
    "visual metadata does not change migration line",
    visualOnlyMutation.consumption.payload.migrationLine,
    baseRuntime.consumption.payload.migrationLine,
  );
  assertEqual(
    "visual metadata does not change crystal line",
    visualOnlyMutation.consumption.payload.crystalLine,
    baseRuntime.consumption.payload.crystalLine,
  );
  assertEqual(
    "visual metadata does not change dominant shift",
    visualOnlyMutation.consumption.payload.dominantShift.deflectionVector,
    baseRuntime.consumption.payload.dominantShift.deflectionVector,
  );

  const notReadyConsumption = consumeHexagramCrystalResult({
    result: formHexagramCrystalResult(null),
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
