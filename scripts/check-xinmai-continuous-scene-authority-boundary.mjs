import fs from "node:fs";

const read = (path) => fs.readFileSync(path, "utf8");
const assert = (condition, message) => {
  if (!condition) throw new Error(message);
};

const types = read("src/types/xinmaiContinuousScenePresentation.ts");
const resolver = read("src/services/xinmaiContinuousScenePresentationResolver.ts");
const adapter = read("src/renderers/xinmaiContinuousSceneRendererAdapter.ts");
const packageJson = JSON.parse(read("package.json"));

for (const token of [
  "presentationOnly: true",
  "routePublishesTypedFactsOnly: true",
  "noStorageRead: true",
  "noStorageWrite: true",
  "noAuthorityWriteback: true",
  "noNavigationMutation: true",
  "noDomSuccessAuthority: true",
  "noTimerSuccessAuthority: true",
]) {
  assert(types.includes(token), `Presentation boundary token missing: ${token}`);
}
for (const forbidden of [
  "localStorage",
  "sessionStorage",
  "indexedDB",
  "document.",
  "window.",
  "requestAnimationFrame",
  "setTimeout",
  "setInterval",
  "Math.random",
  "new Date",
  "navigate(",
]) {
  assert(!resolver.includes(forbidden), `Resolver is not pure: ${forbidden}`);
}
assert(
  resolver.includes("hashStableReference") &&
    resolver.includes("sourceRenderPlanReferenceId") &&
    resolver.includes("nearObjectReferenceId") &&
    !resolver.includes("write") &&
    adapter.includes("existingRendererCoreOnly: true") &&
    adapter.includes("noAuthorityWriteback: true"),
  "Deterministic one-way Presentation contract is incomplete",
);
for (const status of [
  "CONTINUOUS_SCENE_MOTION_PRESENTED",
  "CONTINUOUS_SCENE_STATIC_PRESENTED",
  "CONTINUOUS_SCENE_SAFE_WITHHELD",
]) {
  assert(types.includes(status), `Public scene outcome missing: ${status}`);
}
assert(
  packageJson.scripts?.["check:xinmai-continuous-scene-authority-boundary"] ===
    "node scripts/check-xinmai-continuous-scene-authority-boundary.mjs",
  "Continuous Scene authority-boundary gate is not registered",
);

console.log("[XINMAI CONTINUOUS SCENE AUTHORITY BOUNDARY] PASS");
