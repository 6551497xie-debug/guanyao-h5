import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import process from "node:process";
import { createRequire } from "node:module";
import ts from "typescript";

const rootDir = process.cwd();
const tempRoot = fs.mkdtempSync(path.join(os.tmpdir(), "guanyao-hexagram-crystal-runtime-bridge-"));

const sourceFiles = [
  "src/services/personaMigrationImpactRuntimeService.ts",
  "src/services/crystalMappingService.ts",
  "src/services/hexagramCrystalEngineService.ts",
  "src/services/changeExperiencePresentationAdapter.ts",
  "src/services/fixtures/changeExperienceFixtures.ts",
  "src/services/fixtures/personaTransmissionFixtures.ts",
  "src/services/fixtures/personaTransmissionExperienceFixtures.ts",
  "src/services/fixtures/changeExperiencePresentationFixtures.ts",
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

try {
  sourceFiles.forEach(transpileToTemp);
  const requireFromTemp = createRequire(path.join(tempRoot, "check.cjs"));
  const { formRuntimePersonaMigrationImpact } = requireFromTemp(
    "./src/services/personaMigrationImpactRuntimeService.js",
  );
  const { mapCrystalState } = requireFromTemp("./src/services/crystalMappingService.js");
  const { formHexagramCrystalResult } = requireFromTemp("./src/services/hexagramCrystalEngineService.js");
  const { actionFiveAwarenessChangeExperienceUnit } = requireFromTemp(
    "./src/services/fixtures/changeExperienceFixtures.js",
  );
  const { actionFiveAwarenessCrystalStructureSource } = requireFromTemp(
    "./src/services/fixtures/crystalMappingFixtures.js",
  );

  const formDomainFacts = (unit, visualMetadata) => ({
    oldReaction: unit.recognition.oldReaction,
    revisedResponse: unit.revision.newResponse,
    crystalImprint: unit.meaning.crystalImprint,
    migrationTrace: unit.revision.transformationMoment,
    dominantShift: `${unit.recognition.rootProtection}:${unit.recognition.manifestBehavior} → ${unit.revision.changeType}`,
    visualMetadata,
  });

  const runtimeImpact = formRuntimePersonaMigrationImpact({
    sourceUnitId: "gravity-action-awareness",
    dimension: "action",
    yaoStage: "awareness",
    domainFacts: formDomainFacts(actionFiveAwarenessChangeExperienceUnit),
  });

  assertEqual("runtime migration impact exists", Boolean(runtimeImpact), true);
  assertEqual("runtime impact source unit", runtimeImpact?.sourceUnit?.unitId, "gravity-action-awareness");
  assertEqual("runtime impact dimension", runtimeImpact?.dimension, "action");
  assertEqual("runtime impact yao stage", runtimeImpact?.yaoStage, "awareness");
  assertEqual(
    "runtime impact from model comes from change experience domain",
    runtimeImpact?.fromModel,
    actionFiveAwarenessChangeExperienceUnit.recognition.oldReaction,
  );
  assertEqual(
    "runtime impact to response comes from change experience domain",
    runtimeImpact?.toResponse,
    actionFiveAwarenessChangeExperienceUnit.revision.newResponse,
  );
  assertEqual("runtime impact readiness", runtimeImpact?.impactReadiness, "READY_FOR_CRYSTAL");
  assertEqual("runtime impact guardrail no storage", runtimeImpact?.guardrails?.noStorageWrite, true);

  const presentationOnlyCopyMutation = {
    context: {
      pressureContext: "presentation-only copy changed",
      currentSituation: "presentation-only situation changed",
    },
    visual: {
      starbeast: {
        beforeState: "presentation visual before changed",
        afterState: "presentation visual after changed",
        cueLine: "presentation visual cue changed",
      },
    },
  };
  assertEqual("presentation-only mutation remains outside runtime impact input", Boolean(presentationOnlyCopyMutation), true);

  const visualMetadataImpact = formRuntimePersonaMigrationImpact({
    sourceUnitId: "gravity-action-awareness",
    dimension: "action",
    yaoStage: "awareness",
    domainFacts: formDomainFacts(actionFiveAwarenessChangeExperienceUnit, {
      starbeastBefore: "visual metadata before changed",
      starbeastAfter: "visual metadata after changed",
      starbeastCue: "visual metadata cue changed",
    }),
  });

  assertEqual("visual metadata impact exists", Boolean(visualMetadataImpact), true);
  assertEqual("visual metadata does not change from model", visualMetadataImpact?.fromModel, runtimeImpact?.fromModel);
  assertEqual("visual metadata does not change to response", visualMetadataImpact?.toResponse, runtimeImpact?.toResponse);
  assertEqual(
    "visual metadata does not change crystal imprint",
    visualMetadataImpact?.crystalImprint?.imprintLine,
    runtimeImpact?.crystalImprint?.imprintLine,
  );
  assertEqual(
    "visual metadata does not change deflection vector",
    visualMetadataImpact?.deflectionVector,
    runtimeImpact?.deflectionVector,
  );
  assertEqual(
    "visual metadata does not change readiness",
    visualMetadataImpact?.impactReadiness,
    runtimeImpact?.impactReadiness,
  );

  const crystalMappingResult = mapCrystalState({
    structureSource: actionFiveAwarenessCrystalStructureSource,
    migrationImpacts: [runtimeImpact],
    source: "runtime",
  });

  assertEqual("runtime crystal mapping status", crystalMappingResult.status, "PASS");
  assertEqual("runtime crystal state readiness", crystalMappingResult.crystalState?.readiness, "READY_TO_CRYSTALLIZE");
  assertEqual(
    "runtime crystal state dominant impact",
    crystalMappingResult.crystalState?.dominantImpact?.sourceUnit?.unitId,
    "gravity-action-awareness",
  );

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

  assertEqual("runtime hexagram crystal engine status", engineResult.status, "READY");
  assertEqual("runtime engine inherited identity", engineResult.expression?.hexagramName, "风山渐");
  assertEqual(
    "runtime engine migration line",
    engineResult.expression?.migrationLine,
    `${runtimeImpact.fromModel} → ${runtimeImpact.toResponse}`,
  );
  assertEqual("runtime engine source", engineResult.sourceInput?.source, "runtime");
  assertEqual("runtime engine no matrix mutation", engineResult.guardrails?.noHexagramMatrixMutation, true);

  console.log("\n[HEXAGRAM CRYSTAL RUNTIME BRIDGE] PASS");
} catch (error) {
  console.error("[HEXAGRAM CRYSTAL RUNTIME BRIDGE] FAIL");
  console.error(error instanceof Error ? error.message : error);
  process.exit(1);
} finally {
  fs.rmSync(tempRoot, { recursive: true, force: true });
}
