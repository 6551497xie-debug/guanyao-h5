import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import process from "node:process";
import { build } from "esbuild";

const rootDir = process.cwd();
const files = Object.freeze({
  adapterType: "src/types/realLifeVisualSourceAdapter.ts",
  adapterService: "src/services/realLifeVisualSourceAdapter.ts",
  fixture: "src/mocks/starBeastSceneModelFixtures.ts",
  harness: "src/pages/PersonalStarBeastWebGLPrototypeHarness.tsx",
  rendererInput: "src/types/genesisWebGLRendererCore.ts",
  packageManifest: "package.json",
});

const failures = [];
const assertIncludes = (name, source, expected) => {
  if (!source.includes(expected)) failures.push(`${name} missing=${expected}`);
  else console.log(`PASS | ${name} | includes=${expected}`);
};
const assertExcludes = (name, source, forbidden) => {
  if (source.includes(forbidden)) failures.push(`${name} forbidden=${forbidden}`);
  else console.log(`PASS | ${name} | forbidden=absent`);
};
const assertEqual = (name, actual, expected) => {
  if (actual !== expected) failures.push(`${name} expected=${String(expected)} actual=${String(actual)}`);
  else console.log(`PASS | ${name} | expected=${String(expected)}`);
};

const sources = Object.fromEntries(
  Object.entries(files).map(([name, relativePath]) => {
    const filePath = path.join(rootDir, relativePath);
    if (!fs.existsSync(filePath)) failures.push(`${name} missing=${filePath}`);
    return [name, fs.existsSync(filePath) ? fs.readFileSync(filePath, "utf8") : ""];
  }),
);

if (failures.length === 0) {
  [
    "StarbeastDerivationReady",
    "LunarMotherCodeLandingResult",
    "SelectedPressureSeedContext",
    "PersonalStarBeastSceneModel",
    "PersonalStarBeastRenderPlan",
    "RealLifeVisualProjectionBundle",
    "RealLifeVisualSourceProvenance",
    "noEngineInvocation: true",
    "noIdentityRecalculation: true",
    "noPressureCalculation: true",
    "noHexagramCalculation: true",
    "noCrystalCalculation: true",
    "noRendererInvocation: true",
    "noRuntimeMutation: true",
    "noVisualCalibrationMutation: true",
  ].forEach((marker) => assertIncludes("adapter contract", sources.adapterType, marker));

  [
    "export function adaptRealLifeVisualSource",
    'source: "real_life_visual_source_adapter"',
    "calibrateStarBeastGenesisSource",
    "resolveLifeArchetypeProfileFromMotherCode",
    "freezeStarMansionLifeTrajectorySource",
    "resolvePersonalStarBeastManifestationReadiness",
    "adaptPersonalStarBeastSceneModelToRenderPlan",
    "projectGenesisTimeSequenceRecognition",
    "projectGenesisBirthMansionIgnition",
    "projectGenesisFourSymbolAlignment",
    "projectGenesisLifeForceInfusion",
    "projectGenesisPersonalReveal",
    "projectGenesisRealityPressure",
  ].forEach((marker) => assertIncludes("adapter assembles existing sources", sources.adapterService, marker));

  [
    "resolveStarbeastFromBirthDate",
    "runMotherCodeLandingEngine",
    "guanyaoStarbeastEngineService",
    "guanyaoLunarMotherCodeLandingAdapter",
  ].forEach((marker) => assertExcludes("adapter has no Engine call", sources.adapterService, marker));

  [
    "resolveStarbeastFromBirthDate",
    "runMotherCodeLandingEngine",
    "adaptRealLifeVisualSource",
    "starbeastDerivationResult: starbeastResult",
    "motherCodeLandingResult",
    "selectedPressureSeedContext: null",
  ].forEach((marker) => assertIncludes("fixture supplies inputs only", sources.fixture, marker));

  [
    "calibrateStarBeastGenesisSource",
    "resolveLifeArchetypeProfileFromMotherCode",
    "freezeStarMansionLifeTrajectorySource",
    "resolvePersonalStarBeastManifestationReadiness",
    "adaptPersonalStarBeastSceneModelToRenderPlan",
    "projectGenesisTimeSequenceRecognition",
    "projectGenesisBirthMansionIgnition",
    "projectGenesisFourSymbolAlignment",
    "projectGenesisLifeForceInfusion",
    "projectGenesisPersonalReveal",
    "projectGenesisRealityPressure",
  ].forEach((marker) => assertExcludes("fixture does not assemble visual sources", sources.fixture, marker));

  [
    "consumerSource?.renderPlanResult.plan",
    "consumerSource?.projectionBundle",
    "renderPlan: plan",
    "timeSequenceRecognitionProjection:",
    "birthMansionIgnitionProjection:",
    "morphologicalFieldAlignmentProjection:",
    "lifeForceInfusionProjection:",
    "personalRevealProjection:",
    "realityPressureProjection:",
  ].forEach((marker) => assertIncludes("harness preserves renderer input", sources.harness, marker));

  [
    "createGenesisProjectionBundle",
    "adaptPersonalStarBeastSceneModelToRenderPlan",
    "projectGenesisTimeSequenceRecognition",
    "projectGenesisBirthMansionIgnition",
    "projectGenesisFourSymbolAlignment",
    "projectGenesisLifeForceInfusion",
    "projectGenesisPersonalReveal",
    "projectGenesisRealityPressure",
  ].forEach((marker) => assertExcludes("harness only consumes adapter output", sources.harness, marker));

  [
    "renderPlan: PersonalStarBeastRenderPlan | null",
    "timeSequenceRecognitionProjection?: GenesisTimeSequenceRecognitionProjection | null",
    "birthMansionIgnitionProjection?: GenesisBirthMansionIgnitionProjection | null",
    "morphologicalFieldAlignmentProjection?: GenesisFourSymbolAlignmentProjection | null",
    "lifeForceInfusionProjection?: GenesisLifeForceInfusionProjection | null",
    "personalRevealProjection?: GenesisPersonalRevealProjection | null",
    "realityPressureProjection?: GenesisRealityPressureProjection | null",
  ].forEach((marker) => assertIncludes("renderer input contract remains unchanged", sources.rendererInput, marker));

  const packageJson = JSON.parse(sources.packageManifest);
  assertIncludes(
    "adapter gate is registered",
    packageJson.scripts?.["check-real-life-visual-source-adapter"] ?? "",
    "node scripts/check-real-life-visual-source-adapter.mjs",
  );

  const modulePath = path.join(os.tmpdir(), `guanyao-real-life-visual-source-adapter-${process.pid}.mjs`);
  await build({
    stdin: {
      contents: `
        export {
          PERSONAL_STAR_BEAST_SCENE_MODEL_FIXTURE_CASE_A,
          PERSONAL_STAR_BEAST_SCENE_MODEL_FIXTURE_CASE_B,
        } from "./src/mocks/starBeastSceneModelFixtures.ts";
      `,
      resolveDir: rootDir,
      sourcefile: "real-life-visual-source-adapter-gate-entry.ts",
      loader: "ts",
    },
    outfile: modulePath,
    bundle: true,
    platform: "node",
    format: "esm",
    target: "node20",
    logLevel: "silent",
  });

  const runtime = await import(`file://${modulePath}?t=${Date.now()}`);
  const fixtures = [
    runtime.PERSONAL_STAR_BEAST_SCENE_MODEL_FIXTURE_CASE_A,
    runtime.PERSONAL_STAR_BEAST_SCENE_MODEL_FIXTURE_CASE_B,
  ];
  for (const fixture of fixtures) {
    const visualSource = fixture.visualSourceReference;
    const provenance = visualSource.provenance;
    assertEqual(`${fixture.fixtureId} scene model identity preserved`, fixture.sceneModelReference, visualSource.sceneModel);
    assertEqual(`${fixture.fixtureId} identity source preserved`, fixture.identitySourceReference, visualSource.identitySourceReference);
    assertEqual(`${fixture.fixtureId} render plan remains planned`, visualSource.renderPlanResult.status, "PLANNED");
    assertEqual(`${fixture.fixtureId} plan reference preserved`, visualSource.renderPlan, visualSource.renderPlanResult.plan);
    assertEqual(`${fixture.fixtureId} projection bundle complete`, Object.values(visualSource.projectionBundle).every(Boolean), true);
    assertEqual(`${fixture.fixtureId} source kind traceable`, provenance.sourceKind, "ISOLATED_FIXTURE_ENGINE_RESULT");
    assertEqual(`${fixture.fixtureId} source reference traceable`, provenance.sourceReferenceId, fixture.fixtureId);
    assertEqual(`${fixture.fixtureId} StarBeast Engine traceable`, provenance.starbeastEngine, "guanyao_starbeast_engine");
    assertEqual(`${fixture.fixtureId} MotherCode Engine traceable`, provenance.motherCodeEngine, "guanyao_lunar_mother_code_landing");
    assertEqual(`${fixture.fixtureId} no fixture pressure input`, provenance.selectedPressureSeedId, null);
  }
}

if (failures.length > 0) {
  console.error("\nReal Life Visual Source Adapter gate failed:");
  failures.forEach((failure) => console.error(`- ${failure}`));
  process.exit(1);
}

console.log("\nReal Life Visual Source Adapter gate passed.");
