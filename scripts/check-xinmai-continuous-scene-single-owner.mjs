import fs from "node:fs";

const read = (path) => fs.readFileSync(path, "utf8");
const assert = (condition, message) => {
  if (!condition) throw new Error(message);
};

const appShell = read("src/components/AppShell.tsx");
const host = read("src/components/XinmaiContinuousSceneHost.tsx");
const context = read("src/components/XinmaiContinuousSceneHostContext.tsx");
const adapter = read("src/renderers/xinmaiContinuousSceneRendererAdapter.ts");
const c2Resolver = read("src/services/xinmaiSameLifeSurfaceHostResolver.ts");
const packageJson = JSON.parse(read("package.json"));
const formalConsumers = [
  "src/App.tsx",
  "src/pages/LaunchLab.tsx",
  "src/components/GenesisProductionRendererCanvasHost.tsx",
  "src/components/RealityLifeUniverseCanvas.tsx",
  "src/components/RealityGravityInertiaField.tsx",
  "src/pages/GravityPage.tsx",
  "src/pages/PersonalityRingPage.tsx",
].map(read);

assert(
  (appShell.match(/<XinmaiContinuousSceneHost>/g) ?? []).length === 1,
  "AppShell must mount exactly one Continuous Scene Host",
);
assert(
  (host.match(/<canvas/g) ?? []).length === 1 &&
    formalConsumers.every((source) => !source.includes("<canvas")),
  "Production world Canvas must have one AppShell owner",
);
for (const ownerToken of [
  "window.requestAnimationFrame",
  "new ResizeObserver",
  'document.addEventListener("visibilitychange"',
  'canvas.addEventListener("pointerdown"',
]) {
  assert(host.includes(ownerToken), `Host owner token missing: ${ownerToken}`);
  assert(
    formalConsumers.every((source) => !source.includes(ownerToken)),
    `Route-local owner remains: ${ownerToken}`,
  );
}
assert(
  context.includes("registerPresentation") &&
    host.includes("registration.runtimeFactory.create") &&
    adapter.includes("hostInvokesFactory: true") &&
    adapter.includes("hostOwnsCanvas: true") &&
    adapter.includes("hostOwnsAnimationFrame: true"),
  "Typed publisher-to-Host adapter boundary is incomplete",
);
assert(
  host.includes("sceneHostCount: 1 as const") &&
    host.includes("worldPresenterCount: 1 as const") &&
    adapter.includes("bodyPresenterCount: 1 as const") &&
    c2Resolver.includes("MOTION_SAME_LIFE_SURFACE_PRESENTED") &&
    c2Resolver.includes("STATIC_SAME_LIFE_SURFACE_PRESENTED") &&
    c2Resolver.includes("SAME_LIFE_SURFACE_SAFE_WITHHELD"),
  "Single Host must preserve the frozen C2 proof and public outcomes",
);
assert(
  packageJson.scripts?.["check:xinmai-continuous-scene-single-owner"] ===
    "node scripts/check-xinmai-continuous-scene-single-owner.mjs",
  "Continuous Scene single-owner gate is not registered",
);

console.log("[XINMAI CONTINUOUS SCENE SINGLE OWNER] PASS");
