import fs from "node:fs";

const read = (file) => fs.readFileSync(file, "utf8");
const assert = (condition, message) => {
  if (!condition) throw new Error(message);
};

const types = read("src/types/xinmaiReturningSameLifeContinuityPresentation.ts");
const checkpointTypes = read("src/types/xinmaiLivedResponseCheckpointPresentation.ts");
const resolver = read("src/services/xinmaiReturningSameLifeContinuityPresentationResolver.ts");
const sceneTypes = read("src/types/xinmaiContinuousScenePresentation.ts");
const sceneResolver = read("src/services/xinmaiContinuousScenePresentationResolver.ts");
const sceneHost = read("src/components/XinmaiContinuousSceneHost.tsx");
const packageJson = JSON.parse(read("package.json"));

for (const state of [
  "BASELINE_LIFE_WORLD",
  "RETURN_ACCEPTED_AWAITING_RESPONSE",
  "READY_TO_CONFIRM_REAL_RESPONSE",
  "FORMATION_IN_PROGRESS",
  "OWNERSHIP_PRESENTED",
  "SAFE_WITHHELD",
]) {
  assert(
    checkpointTypes.includes(state) &&
      types.includes("XinmaiLivedResponseCheckpointPresentationState"),
    `V4 checkpoint state missing: ${state}`,
  );
}
for (const token of [
  "presentationOnly: true",
  "pureResolverOnly: true",
  "existingTypedFactsOnly: true",
  "noStorageRead: true",
  "noStorageWrite: true",
  "noDomInput: true",
  "noTimerInput: true",
  "noAuthorityWriteback: true",
  "noNavigationMutation: true",
]) {
  assert(types.includes(token), `V4 boundary token missing: ${token}`);
}
assert(
  resolver.includes("resolveXinmaiReturningSameLifeContinuityPresentation") &&
    resolver.includes("applyXinmaiReturningSameLifeContinuitySceneProjectionPolicy") &&
    resolver.includes("authorityWriteback: \"FORBIDDEN\"") &&
    !resolver.includes('withheld(input, "PRESENTATION_PAUSED")') &&
    !resolver.includes("localStorage") &&
    !resolver.includes("sessionStorage") &&
    !resolver.includes("indexedDB") &&
    !resolver.includes("document.") &&
    !resolver.includes("window.") &&
    !resolver.includes("setTimeout") &&
    !resolver.includes("requestAnimationFrame"),
  "V4 resolver purity or policy layering contract is not preserved",
);
assert(
  sceneTypes.includes("XinmaiContinuousSceneSemanticLayerPlan") &&
    sceneTypes.includes('projectionFamily: "RETURNING_ARCHIVE"') &&
    sceneResolver.includes("semanticProjectionLayer") &&
    sceneHost.includes("data-continuous-scene-semantic-layer"),
  "V4 projection is not represented as an independently observable typed Scene layer",
);
assert(
  packageJson.scripts?.["check:xinmai-returning-same-life-continuity-contract"] ===
    "node scripts/check-xinmai-returning-same-life-continuity-contract.mjs",
  "V4 contract gate is not registered",
);

console.log("[XINMAI RETURNING SAME-LIFE CONTINUITY CONTRACT] PASS");
