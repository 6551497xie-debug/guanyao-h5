import fs from "node:fs";

const read = (file) => fs.readFileSync(file, "utf8");
const assert = (condition, message) => {
  if (!condition) throw new Error(message);
};

const canvas = read("src/components/RealityLifeUniverseCanvas.tsx");
const surface = read("src/components/XinmaiLivedResponseReturnSurface.tsx");
const launch = read("src/pages/LaunchLab.tsx");
const archive = read("src/pages/PersonalityRingPage.tsx");
const sceneTypes = read("src/types/xinmaiContinuousScenePresentation.ts");
const sceneResolver = read("src/services/xinmaiContinuousScenePresentationResolver.ts");
const sceneHost = read("src/components/XinmaiContinuousSceneHost.tsx");
const packageJson = JSON.parse(read("package.json"));

assert(
  canvas.includes("sameLifeContinuityProjection") &&
    canvas.includes("continuousSceneSemanticProjection") &&
    !canvas.includes("sameLifeSurfaceFacts?.imprints[0]"),
  "Shared canvas still owns the old first-imprint Returning selector",
);
assert(
  surface.includes("onSameLifeContinuityProjection") &&
    surface.includes("sameLifeContinuityProjection.checkpointState") &&
    surface.includes("sameLifeContinuityProjection.lineage.crystalReferenceId") &&
    !surface.includes("applyXinmaiReturningSameLifeContinuitySceneProjectionPolicy") &&
    !surface.includes("XINMAI_RETURNING_SAME_LIFE_CONTINUITY_SCENE_PROJECTION_POLICY"),
  "Lived response surface is not gated only by the raw V4 lineage projection",
);
assert(
  launch.includes("baselineSameLifeContinuityProjection") &&
    launch.includes("acceptSameLifeContinuityProjection") &&
    launch.includes("returningSameLifeSceneProjection") &&
    launch.includes("applyXinmaiReturningSameLifeContinuitySceneProjectionPolicy") &&
    launch.includes("sameLifeContinuityProjection={"),
  "LaunchLab does not publish the policy-layered Returning V4 Scene projection",
);
assert(
  archive.includes("archiveSameLifeContinuityProjection") &&
    archive.includes("archiveSameLifeSceneProjection") &&
    archive.includes("applyXinmaiReturningSameLifeContinuitySceneProjectionPolicy") &&
    archive.includes('consumerSurface: "ARCHIVE"'),
  "Archive is not cut over to the policy-layered V4 Scene projection",
);
assert(
  sceneTypes.includes("XinmaiReturningSameLifeContinuityPresentationProjection") &&
    sceneResolver.includes("returningArchiveProjectionRequired") &&
    sceneResolver.includes("wrongProjectionFamily") &&
    sceneResolver.includes("semanticProjectionLayer") &&
    sceneResolver.includes("v4LayerWithheld") &&
    sceneHost.includes("data-continuous-scene-semantic-layer-reason"),
  "Continuous Scene does not validate the V4 projection family",
);
assert(
  packageJson.scripts?.["check:xinmai-returning-same-life-continuity-consumer-cutover"] ===
    "node scripts/check-xinmai-returning-same-life-continuity-consumer-cutover.mjs",
  "V4 consumer cutover gate is not registered",
);

console.log("[XINMAI RETURNING SAME-LIFE CONTINUITY CONSUMER CUTOVER] PASS");
