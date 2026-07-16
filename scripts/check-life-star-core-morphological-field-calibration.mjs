import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import process from "node:process";
import { build } from "esbuild";

const rootDir = process.cwd();
const files = Object.freeze({
  protocol:
    "docs/GUANYAO_PERSONAL_STAR_BEAST_LIFE_STAR_CORE_MORPHOLOGICAL_FIELD_CALIBRATION_PROTOCOL.md",
  coreType: "src/types/personalStarBeastLifeStarCoreProjection.ts",
  coreService: "src/services/personalStarBeastLifeStarCoreProjection.ts",
  presenceType: "src/types/personalStarBeastLifePresenceProjection.ts",
  presenceService: "src/services/personalStarBeastLifePresenceProjection.ts",
  renderer: "src/prototypes/isolatedWebGLRendererPrototype.ts",
  rendererType: "src/types/isolatedWebGLRendererPrototype.ts",
  fixtures: "src/mocks/starBeastSceneModelFixtures.ts",
  planAdapter: "src/services/personalStarBeastRenderPlanAdapter.ts",
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
  if (actual !== expected) {
    failures.push(`${name} expected=${String(expected)} actual=${String(actual)}`);
  } else {
    console.log(`PASS | ${name} | expected=${String(expected)}`);
  }
};

const absolute = Object.fromEntries(
  Object.entries(files).map(([name, relativePath]) => [
    name,
    path.join(rootDir, relativePath),
  ]),
);

for (const [name, filePath] of Object.entries(absolute)) {
  if (!fs.existsSync(filePath)) failures.push(`${name} missing=${filePath}`);
  else console.log(`PASS | ${name} file exists`);
}

if (failures.length === 0) {
  const source = Object.fromEntries(
    Object.entries(absolute).map(([name, filePath]) => [
      name,
      fs.readFileSync(filePath, "utf8"),
    ]),
  );
  const packageJson = JSON.parse(source.packageManifest);

  [
    "Life Star Core Projection",
    "Core Presence",
    "Surface Presence",
    "Core Influence",
    "Slow Temporal Rhythm",
    "Morphological Field",
    "spatialContraction",
    "postureBias",
    "nodeDistributionBias",
    "第一眼是否进入“生命星核”",
  ].forEach((marker) =>
    assertIncludes("P102 calibration protocol", source.protocol, marker),
  );

  [
    "export type PersonalStarBeastLifeStarCoreProjection",
    'semanticRole: "PERSONAL_STAR_BEAST_LIFE_STAR_CORE_PROJECTION"',
    "surfacePresence",
    "coreInfluence",
    "temporalRhythm",
    "noFlicker: true",
    "noPulseEffect: true",
    "presenceProjectionOnly: true",
    "rendererParametersOnly: true",
    "identityBlind: true",
    "noAnimalGeometry: true",
  ].forEach((marker) =>
    assertIncludes("P102 core contract", source.coreType, marker),
  );

  [
    "export function projectLifePresenceToLifeStarCore",
    "PersonalStarBeastLifePresenceProjection",
    "surfaceVariation",
    "structureResponse",
    "lightFlowReach",
    "nodeBreathCoupling",
    "periodSeconds",
  ].forEach((marker) =>
    assertIncludes("P102 core projection service", source.coreService, marker),
  );
  [
    "resolveStarbeastFromBirthDate",
    "runMotherCodeLandingEngine",
    "resolveLifeArchetypeProfileFromMotherCode",
    "PersonalStarBeastSceneModel",
    "fourSymbol",
    "MotherCode",
    "LifeArchetype",
    "localStorage",
    "sessionStorage",
    "青龙",
    "白虎",
    "朱雀",
    "玄武",
  ].forEach((marker) =>
    assertExcludes("P102 core remains presence-only", source.coreService, marker),
  );

  [
    "spatialContraction",
    "postureBias",
    "nodeDistributionBias",
  ].forEach((marker) =>
    assertIncludes("P102 morphological contract", source.presenceType, marker),
  );

  [
    "projectLifePresenceToLifeStarCore",
    "lifeStarCore",
    "coreSurface",
    "surfacePresence",
    "structureResponse",
    "nodeBreathCoupling",
    "spatialContraction",
    "postureBias",
    "nodeDistributionBias",
    "spinePositions",
    "branchPositions",
    "new LineSegments(",
  ].forEach((marker) =>
    assertIncludes("P102 Renderer projection", source.renderer, marker),
  );
  [
    "new LineLoop",
    "resolveStarbeastFromBirthDate",
    "runMotherCodeLandingEngine",
    "resolveLifeArchetypeProfileFromMotherCode",
    "PersonalStarBeastSceneModel",
    "fourSymbol",
    "MotherCode",
    "mansionName",
    "animalIdentity",
    "localStorage",
    "sessionStorage",
    "青龙",
    "白虎",
    "朱雀",
    "玄武",
  ].forEach((marker) =>
    assertExcludes("P102 Renderer remains identity blind", source.renderer, marker),
  );

  assertIncludes(
    "P102 scene projection carries core",
    source.rendererType,
    "lifeStarCore: PersonalStarBeastLifeStarCoreProjection",
  );
  assertIncludes(
    "P102 gate registered",
    packageJson.scripts?.["check-life-star-core-morphological-field-calibration"] ??
      "",
    "node scripts/check-life-star-core-morphological-field-calibration.mjs",
  );
  assertIncludes(
    "release includes P102 gate",
    packageJson.scripts?.["postcheck:release"] ?? "",
    "npm run check-life-star-core-morphological-field-calibration",
  );

  const modulePath = path.join(
    os.tmpdir(),
    `guanyao-life-star-core-calibration-${process.pid}.mjs`,
  );
  await build({
    stdin: {
      contents: `
        export {
          PERSONAL_STAR_BEAST_SCENE_MODEL_FIXTURE_CASE_A,
          PERSONAL_STAR_BEAST_SCENE_MODEL_FIXTURE_CASE_B,
        } from "./src/mocks/starBeastSceneModelFixtures.ts";
        export { adaptPersonalStarBeastSceneModelToRenderPlan } from "./src/services/personalStarBeastRenderPlanAdapter.ts";
        export { projectLifePresenceToLifeStarCore } from "./src/services/personalStarBeastLifeStarCoreProjection.ts";
        export { projectPersonalStarBeastRenderPlanToLifePresence } from "./src/services/personalStarBeastLifePresenceProjection.ts";
        export { projectPersonalStarBeastRenderPlanToWebGLScene } from "./src/prototypes/isolatedWebGLRendererPrototype.ts";
      `,
      resolveDir: rootDir,
      sourcefile: "life-star-core-calibration-gate-entry.ts",
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
  const resultA = runtime.adaptPersonalStarBeastSceneModelToRenderPlan(
    runtime.PERSONAL_STAR_BEAST_SCENE_MODEL_FIXTURE_CASE_A.sceneModelReference,
  );
  const resultB = runtime.adaptPersonalStarBeastSceneModelToRenderPlan(
    runtime.PERSONAL_STAR_BEAST_SCENE_MODEL_FIXTURE_CASE_B.sceneModelReference,
  );
  assertEqual("case A produces RenderPlan", resultA.status, "PLANNED");
  assertEqual("case B produces RenderPlan", resultB.status, "PLANNED");

  if (resultA.status === "PLANNED" && resultB.status === "PLANNED") {
    const planA = resultA.plan;
    const planB = resultB.plan;
    const beforeA = JSON.stringify(planA);
    const beforeB = JSON.stringify(planB);
    const presenceA = runtime.projectPersonalStarBeastRenderPlanToLifePresence(planA);
    const presenceB = runtime.projectPersonalStarBeastRenderPlanToLifePresence(planB);
    const coreA = runtime.projectLifePresenceToLifeStarCore(presenceA);
    const coreB = runtime.projectLifePresenceToLifeStarCore(presenceB);
    const sceneA = runtime.projectPersonalStarBeastRenderPlanToWebGLScene(planA);
    const sceneB = runtime.projectPersonalStarBeastRenderPlanToWebGLScene(planB);

    assertEqual(
      "core A preserves presence source",
      coreA.sourceLifePresenceProjectionReferenceId,
      presenceA.sourceRenderPlanReferenceId,
    );
    assertEqual(
      "core B preserves presence source",
      coreB.sourceLifePresenceProjectionReferenceId,
      presenceB.sourceRenderPlanReferenceId,
    );
    assertEqual("core projection is identity blind", coreA.identityBlind, true);
    assertEqual("core projection has no animal geometry", coreA.noAnimalGeometry, true);
    assertEqual("core temporal rhythm forbids flicker", coreA.temporalRhythm.noFlicker, true);
    assertEqual("core temporal rhythm forbids pulse", coreA.temporalRhythm.noPulseEffect, true);
    assertEqual(
      "core influence differs for A/B",
      JSON.stringify(coreA.coreInfluence) !== JSON.stringify(coreB.coreInfluence),
      true,
    );
    assertEqual(
      "surface presence differs for A/B",
      JSON.stringify(coreA.surfacePresence) !== JSON.stringify(coreB.surfacePresence),
      true,
    );
    assertEqual(
      "morphological field differs for A/B",
      JSON.stringify(presenceA.morphologicalField) !==
        JSON.stringify(presenceB.morphologicalField),
      true,
    );
    assertEqual(
      "scene structure differs beyond color",
      JSON.stringify(sceneA.mansionStructure) !==
        JSON.stringify(sceneB.mansionStructure),
      true,
    );
    assertEqual(
      "scene field behavior differs beyond color",
      JSON.stringify(sceneA.formField) !== JSON.stringify(sceneB.formField),
      true,
    );
    assertEqual("core influence is positive", coreA.coreInfluence.influenceRadius > 0, true);
    assertEqual("core structure response is positive", coreA.coreInfluence.structureResponse > 0, true);
    assertEqual("core light flow reaches field", coreA.coreInfluence.lightFlowReach > 0, true);
    assertEqual("core node breath coupling exists", coreA.coreInfluence.nodeBreathCoupling > 0, true);
    assertEqual("P102 does not mutate plan A", JSON.stringify(planA), beforeA);
    assertEqual("P102 does not mutate plan B", JSON.stringify(planB), beforeB);
    console.log(
      `INFO | P102 A/B | A core=${coreA.coreInfluence.influenceRadius.toFixed(3)} mode=${presenceA.morphologicalField.mode} contraction=${presenceA.morphologicalField.spatialContraction.toFixed(3)} | B core=${coreB.coreInfluence.influenceRadius.toFixed(3)} mode=${presenceB.morphologicalField.mode} contraction=${presenceB.morphologicalField.spatialContraction.toFixed(3)}`,
    );
  }

  fs.unlinkSync(modulePath);
}

if (failures.length > 0) {
  console.error("\nLife Star Core & Morphological Field Calibration gate failed:");
  failures.forEach((failure) => console.error(`- ${failure}`));
  process.exit(1);
}

console.log("\nLife Star Core & Morphological Field Calibration gate passed.");
