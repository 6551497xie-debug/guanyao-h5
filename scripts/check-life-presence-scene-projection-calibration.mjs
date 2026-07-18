import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import process from "node:process";
import { build } from "esbuild";

const rootDir = process.cwd();
const files = Object.freeze({
  protocol:
    "docs/GUANYAO_PERSONAL_STAR_BEAST_LIFE_PRESENCE_PROJECTION_PROTOCOL.md",
  projectionType: "src/types/personalStarBeastLifePresenceProjection.ts",
  projectionService:
    "src/services/personalStarBeastLifePresenceProjection.ts",
  renderer: "src/renderers/genesisWebGLRendererCore.ts",
  rendererType: "src/types/genesisWebGLRendererCore.ts",
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
    "PersonalStarBeastRenderPlan",
    "PersonalStarBeastLifePresenceProjection",
    "Core Presence",
    "Stellar Skeleton",
    "Morphological Field",
    "identityBlind: true",
    "noAnimalGeometry: true",
    "A/B 第一眼验收",
    "第一眼是否被生命存在击中",
  ].forEach((marker) =>
    assertIncludes("P101 projection protocol", source.protocol, marker),
  );

  [
    "export type PersonalStarBeastLifePresenceProjection",
    'semanticRole: "PERSONAL_STAR_BEAST_LIFE_PRESENCE_PROJECTION"',
    "corePresence",
    "stellarSkeleton",
    "morphologicalField",
    "renderPlanOnly: true",
    "rendererParametersOnly: true",
    "identityBlind: true",
    "noLifeFactCopy: true",
    "noAnimalGeometry: true",
  ].forEach((marker) =>
    assertIncludes("P101 projection type", source.projectionType, marker),
  );

  [
    "export function projectPersonalStarBeastRenderPlanToLifePresence",
    "createIsolatedWebGLPrototypeRenderPlanReference",
    "corePresence",
    "stellarSkeleton",
    "morphologicalField",
    "resolveMorphologicalMode",
  ].forEach((marker) =>
    assertIncludes("P101 projection service", source.projectionService, marker),
  );
  [
    'from "../services/guanyaoStarbeastEngineService"',
    'from "../services/guanyaoLunarMotherCodeLandingAdapter"',
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
    assertExcludes("P101 projection remains RenderPlan-only", source.projectionService, marker),
  );

  [
    "projectPersonalStarBeastRenderPlanToLifePresence",
    "lifePresence",
    "spineSegments",
    "branchCount",
    "coreHalo",
    "structureInfluence",
    "aggregationStrength",
    "morphologicalField",
    "new Line(",
    "new LineSegments(",
  ].forEach((marker) =>
    assertIncludes("P101 renderer projection", source.renderer, marker),
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
    assertExcludes("P101 renderer remains identity blind", source.renderer, marker),
  );

  [
    "lifePresence: PersonalStarBeastLifePresenceProjection",
    "identityBlind: true",
    "rendererParametersOnly: true",
  ].forEach((marker) =>
    assertIncludes("P101 scene projection contract", source.rendererType, marker),
  );

  assertIncludes(
    "P101 gate registered",
    packageJson.scripts?.["check-life-presence-scene-projection-calibration"] ??
      "",
    "node scripts/check-life-presence-scene-projection-calibration.mjs",
  );
  assertIncludes(
    "release includes P101 gate",
    packageJson.scripts?.["postcheck:release"] ?? "",
    "npm run check-life-presence-scene-projection-calibration",
  );

  const modulePath = path.join(
    os.tmpdir(),
    `guanyao-life-presence-projection-${process.pid}.mjs`,
  );
  await build({
    stdin: {
      contents: `
        export {
          PERSONAL_STAR_BEAST_SCENE_MODEL_FIXTURE_CASE_A,
          PERSONAL_STAR_BEAST_SCENE_MODEL_FIXTURE_CASE_B,
        } from "./src/mocks/starBeastSceneModelFixtures.ts";
        export { adaptPersonalStarBeastSceneModelToRenderPlan } from "./src/services/personalStarBeastRenderPlanAdapter.ts";
        export { projectPersonalStarBeastRenderPlanToLifePresence } from "./src/services/personalStarBeastLifePresenceProjection.ts";
        export { projectPersonalStarBeastRenderPlanToWebGLScene } from "./src/prototypes/isolatedWebGLRendererPrototype.ts";
      `,
      resolveDir: rootDir,
      sourcefile: "life-presence-projection-gate-entry.ts",
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
    const projectionA = runtime.projectPersonalStarBeastRenderPlanToLifePresence(planA);
    const projectionB = runtime.projectPersonalStarBeastRenderPlanToLifePresence(planB);
    const repeatedA = runtime.projectPersonalStarBeastRenderPlanToLifePresence(planA);
    const sceneA = runtime.projectPersonalStarBeastRenderPlanToWebGLScene(planA);
    const sceneB = runtime.projectPersonalStarBeastRenderPlanToWebGLScene(planB);

    assertEqual("projection A is identity blind", projectionA.identityBlind, true);
    assertEqual("projection B is identity blind", projectionB.identityBlind, true);
    assertEqual(
      "projection is deterministic",
      JSON.stringify(repeatedA),
      JSON.stringify(projectionA),
    );
    assertEqual(
      "core presence differs for A/B",
      JSON.stringify(projectionA.corePresence) !==
        JSON.stringify(projectionB.corePresence),
      true,
    );
    assertEqual(
      "stellar skeleton differs for A/B",
      JSON.stringify(projectionA.stellarSkeleton) !==
        JSON.stringify(projectionB.stellarSkeleton),
      true,
    );
    assertEqual(
      "morphological field differs for A/B",
      JSON.stringify(projectionA.morphologicalField) !==
        JSON.stringify(projectionB.morphologicalField),
      true,
    );
    assertEqual(
      "morphological modes differ for A/B",
      projectionA.morphologicalField.mode !==
        projectionB.morphologicalField.mode,
      true,
    );
    assertEqual(
      "scene projection carries A life presence",
      sceneA.lifePresence.sourceRenderPlanReferenceId,
      sceneA.sourceRenderPlanReferenceId,
    );
    assertEqual(
      "scene projection carries B life presence",
      sceneB.lifePresence.sourceRenderPlanReferenceId,
      sceneB.sourceRenderPlanReferenceId,
    );
    assertEqual("projection does not mutate plan A", JSON.stringify(planA), beforeA);
    assertEqual("projection does not mutate plan B", JSON.stringify(planB), beforeB);
    assertEqual("projection forbids animal geometry", projectionA.noAnimalGeometry, true);
    assertEqual("projection stays RenderPlan-only", projectionA.renderPlanOnly, true);
    console.log(
      `INFO | P101 A/B presence | A=${projectionA.sourceRenderPlanReferenceId} mode=${projectionA.morphologicalField.mode} spine=${projectionA.stellarSkeleton.spineSegments} branches=${projectionA.stellarSkeleton.branchCount} | B=${projectionB.sourceRenderPlanReferenceId} mode=${projectionB.morphologicalField.mode} spine=${projectionB.stellarSkeleton.spineSegments} branches=${projectionB.stellarSkeleton.branchCount}`,
    );
  }

  fs.unlinkSync(modulePath);
}

if (failures.length > 0) {
  console.error("\nLife Presence Scene Projection Calibration gate failed:");
  failures.forEach((failure) => console.error(`- ${failure}`));
  process.exit(1);
}

console.log("\nLife Presence Scene Projection Calibration gate passed.");
