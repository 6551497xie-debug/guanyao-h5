import fs from "node:fs";

const read = (path) => fs.readFileSync(path, "utf8");
const assert = (condition, message) => {
  if (!condition) throw new Error(message);
};

const app = read("src/App.tsx");
const launch = read("src/pages/LaunchLab.tsx");
const genesis = read("src/components/GenesisProductionRendererCanvasHost.tsx");
const reality = read("src/components/RealityLifeUniverseCanvas.tsx");
const gravity = read("src/pages/GravityPage.tsx");
const archive = read("src/pages/PersonalityRingPage.tsx");
const packageJson = JSON.parse(read("package.json"));

for (const [name, source] of Object.entries({
  App: app,
  LaunchLab: launch,
  Genesis: genesis,
  Reality: reality,
  Gravity: gravity,
  Archive: archive,
})) {
  assert(!source.includes("<canvas"), `${name} still mounts a world Canvas`);
  assert(
    !source.includes("requestAnimationFrame"),
    `${name} still owns a world animation frame`,
  );
}
for (const forbidden of [
  "LifeUniverseRouteFallbackCanvas",
  "SharedLifeUniverseFallback",
  "CosmicPageStarField",
  "CosmicNebulaScene",
  "CosmicAmbientStars",
  "staticLifeWhisperResponseRef.current?.isConnected",
  "realityStaticLifeSurfaceRef.current?.isConnected",
]) {
  assert(
    ![app, launch, genesis, reality, gravity, archive].some((source) =>
      source.includes(forbidden),
    ),
    `Rejected route-local success path remains: ${forbidden}`,
  );
}
assert(
  launch.includes('consumerSurface: "ENTRY_BIRTH"') &&
    genesis.includes('consumerSurface: "GENESIS"') &&
    reality.includes('sameLifeSurfaceConsumer === "GRAVITY"') &&
    reality.includes('sameLifeSurfaceConsumer === "RETURNING"') &&
    reality.includes('sameLifeSurfaceConsumer === "ARCHIVE"'),
  "Formal route consumers do not publish the complete typed surface set",
);
assert(
  app.includes('data-continuous-scene-route-pending="TRUE"') &&
    !app.includes("drawLifeUniverseRouteFallback"),
  "App fallback must be semantic-only and must not claim a second world",
);
assert(
  packageJson.scripts?.["check:xinmai-continuous-scene-consumer-cutover"] ===
    "node scripts/check-xinmai-continuous-scene-consumer-cutover.mjs",
  "Continuous Scene consumer-cutover gate is not registered",
);

console.log("[XINMAI CONTINUOUS SCENE CONSUMER CUTOVER] PASS");
