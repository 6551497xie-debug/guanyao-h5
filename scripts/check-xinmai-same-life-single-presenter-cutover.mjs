import fs from "node:fs";

const read = (path) => fs.readFileSync(path, "utf8");
const canvas = read("src/components/RealityLifeUniverseCanvas.tsx");
const renderer = read("src/renderers/genesisWebGLRendererCore.ts");
const resolver = read("src/services/xinmaiSameLifeSurfaceHostResolver.ts");
const staticPresenter = read("src/components/XinmaiSemanticStaticSameLifeSurface.tsx");
const gravityRoute = read("src/pages/GravityProductionRouteEntry.tsx");
const gravityHost = read("src/components/GravityProductionSurfaceHost.tsx");
const gravityPage = read("src/pages/GravityPage.tsx");
const packageJson = JSON.parse(read("package.json"));
const assert = (condition, message) => {
  if (!condition) throw new Error(message);
};

for (const status of [
  "MOTION_SAME_LIFE_SURFACE_PRESENTED",
  "STATIC_SAME_LIFE_SURFACE_PRESENTED",
  "SAME_LIFE_SURFACE_SAFE_WITHHELD",
]) {
  assert(resolver.includes(status), `Public outcome missing: ${status}`);
}
for (const forbidden of [
  "frameCount > 0",
  "realityStaticLifeSurfaceRef.current?.isConnected",
  "staticLifeWhisperResponseRef.current?.isConnected",
]) {
  assert(!canvas.includes(forbidden), `Forbidden success source remains: ${forbidden}`);
}
assert(
  canvas.includes('sameLifeSurfaceSelection.status === "MOTION_SELECTED" ? <canvas') &&
    canvas.includes("XinmaiSemanticStaticSameLifeSurface") &&
    canvas.includes("sameLifeSurfaceCommitProof"),
  "Host does not select exactly one committed body presenter",
);
assert(
  renderer.includes("canonicalBodyImprintGroup") &&
    renderer.includes('presenter: "WEBGL_SAME_LIFE_BODY"') &&
    staticPresenter.includes('webglContextCount: 0 as const'),
  "Motion/static presenter proof is incomplete",
);
assert(
  !staticPresenter.includes("filter") &&
    !staticPresenter.includes("mix-blend-mode") &&
    !canvas.includes('filter="blur(1.1px)"'),
  "Rejected per-path filtered body remains",
);
assert(
  gravityRoute.includes("readXinmaiCanonicalBodyImprintRecovery") &&
    gravityHost.includes("canonicalBodyImprintDecision") &&
    gravityPage.includes('sameLifeSurfaceConsumer="GRAVITY"'),
  "Gravity canonical same-life facts are not wired through Route/Host/Page",
);
assert(
  packageJson.scripts?.["check:xinmai-same-life-single-presenter"] ===
    "node scripts/check-xinmai-same-life-single-presenter-cutover.mjs",
  "Single-presenter gate is not registered",
);
console.log("[XINMAI SAME-LIFE SINGLE PRESENTER CUTOVER] PASS");
