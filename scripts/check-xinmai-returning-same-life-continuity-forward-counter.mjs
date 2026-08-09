import fs from "node:fs";

const read = (file) => fs.readFileSync(file, "utf8");
const assert = (condition, message) => {
  if (!condition) throw new Error(message);
};

const policy = read("src/services/xinmaiReturningSameLifeContinuityPresentationPolicy.ts");
const resolver = read("src/services/xinmaiReturningSameLifeContinuityPresentationResolver.ts");
const surface = read("src/components/XinmaiLivedResponseReturnSurface.tsx");
const ownershipMoment = read("src/components/XinmaiCrystalFormationOwnershipMoment.tsx");
const launch = read("src/pages/LaunchLab.tsx");
const archive = read("src/pages/PersonalityRingPage.tsx");
const checkpoint = read("src/services/xinmaiLivedResponseCheckpointPresentationResolver.ts");
const ownership = read("src/services/xinmaiCrystalOwnershipPresentationResolver.ts");
const sameLife = read("src/services/xinmaiSameLifeSurfaceHostResolver.ts");
const canvas = read("src/components/RealityLifeUniverseCanvas.tsx");
const sceneTypes = read("src/types/xinmaiContinuousScenePresentation.ts");
const sceneResolver = read("src/services/xinmaiContinuousScenePresentationResolver.ts");
const sceneHost = read("src/components/XinmaiContinuousSceneHost.tsx");
const packageJson = JSON.parse(read("package.json"));

assert(
  /XINMAI_RETURNING_SAME_LIFE_CONTINUITY_SCENE_PROJECTION_POLICY\s*=\s*\n?\s*"(?:ENABLED|SAFE_WITHHELD)" as "ENABLED" \| "SAFE_WITHHELD"/.test(policy),
  "V4 Scene projection policy is not a one-switch forward counter",
);
assert(
  resolver.includes("XINMAI_RETURNING_SAME_LIFE_CONTINUITY_SCENE_PROJECTION_POLICY") &&
    resolver.includes("applyXinmaiReturningSameLifeContinuitySceneProjectionPolicy") &&
    resolver.includes('reason: "PRESENTATION_PAUSED"') &&
    !resolver.includes('withheld(input, "PRESENTATION_PAUSED")'),
  "V4 Scene adapter does not isolate the forward policy from lineage validation",
);
assert(
  surface.includes("resolveXinmaiReturningSameLifeContinuityPresentation") &&
    surface.includes("sameLifeContinuityProjection.checkpointState") &&
    surface.includes("<XinmaiCrystalFormationOwnershipMoment") &&
    surface.includes("onContinue={handoffConfirmedCrystal}") &&
    !surface.includes("applyXinmaiReturningSameLifeContinuitySceneProjectionPolicy") &&
    !surface.includes("XINMAI_RETURNING_SAME_LIFE_CONTINUITY_SCENE_PROJECTION_POLICY") &&
    !ownershipMoment.includes("XINMAI_RETURNING_SAME_LIFE_CONTINUITY_SCENE_PROJECTION_POLICY"),
  "Forward Scene policy can still hide C1 Ownership, Crystal, or Continue",
);
assert(
  launch.includes("returningSameLifeSceneProjection") &&
    launch.includes("applyXinmaiReturningSameLifeContinuitySceneProjectionPolicy") &&
    archive.includes("archiveSameLifeSceneProjection") &&
    archive.includes("applyXinmaiReturningSameLifeContinuitySceneProjectionPolicy") &&
    !archive.includes("archiveSameLifeSceneProjection.status ==="),
  "Returning or Archive does not isolate Scene policy from existing product controls",
);
assert(
  checkpoint.includes("OWNERSHIP_PRESENTED") &&
    ownership.includes("IDB_TRANSACTION_COMPLETE") &&
    sameLife.includes("MOTION_SAME_LIFE_SURFACE_PRESENTED") &&
    sameLife.includes("STATIC_SAME_LIFE_SURFACE_PRESENTED"),
  "Forward counter cannot preserve C1/C2 public assets",
);
assert(
  !canvas.includes("sameLifeSurfaceFacts?.imprints[0]") &&
    canvas.includes("pointerInteraction: \"NONE\""),
  "Forward counter can revive the heuristic selector or host hit target",
);
assert(
  sceneTypes.includes("XinmaiContinuousSceneSemanticLayerPlan") &&
    sceneResolver.includes('projectionFamily: "RETURNING_ARCHIVE" as const') &&
    sceneResolver.includes("v4LayerWithheld") &&
    sceneResolver.includes('? "NONE" as const') &&
    sceneHost.includes("data-continuous-scene-semantic-layer") &&
    sceneHost.includes("data-continuous-scene-world-presenter-count"),
  "Forward Counter cannot withhold only V4 NEAR while preserving Base and C2 MID",
);
assert(
  packageJson.scripts?.["check:xinmai-returning-same-life-continuity-forward-counter"] ===
    "node scripts/check-xinmai-returning-same-life-continuity-forward-counter.mjs",
  "V4 counter gate is not registered",
);

console.log("[XINMAI RETURNING SAME-LIFE CONTINUITY FORWARD COUNTER] PASS");
