import fs from "node:fs";

const read = (path) => fs.readFileSync(path, "utf8");
const files = {
  launch: read("src/pages/LaunchLab.tsx"),
  route: read("src/pages/RealityProductionRouteEntry.tsx"),
  archive: read("src/pages/PersonalityRingPage.tsx"),
  host: read("src/components/RealityProductionHost.tsx"),
  canvas: read("src/components/RealityLifeUniverseCanvas.tsx"),
  renderer: read("src/renderers/genesisWebGLRendererCore.ts"),
  resolver: read("src/services/xinmaiSameLifeSurfaceHostResolver.ts"),
  staticPresenter: read("src/components/XinmaiSemanticStaticSameLifeSurface.tsx"),
  hostTypes: read("src/types/realityProductionRouteEntry.ts"),
};
const assert = (condition, message) => {
  if (!condition) throw new Error(message);
};

for (const [name, source] of Object.entries({
  launch: files.launch,
  route: files.route,
  archive: files.archive,
})) {
  assert(
    source.includes("readXinmaiCanonicalBodyImprintRecovery"),
    `${name} does not consume the unique Recovery Adapter`,
  );
}
assert(
  files.host.includes("canonicalBodyImprintDecision") &&
    files.canvas.includes("canonicalBodyImprintDecision") &&
    files.hostTypes.includes("XinmaiCanonicalBodyImprintDecision"),
  "Typed visual facts do not cross Route/Host/Canvas",
);
for (const [name, source] of Object.entries(files)) {
  if (name === "archive") continue;
  assert(
    !source.includes("readPersonalityRingLite"),
    `${name} still reads PersonalityRingLite`,
  );
}
for (const forbidden of [
  "latestCrystalMemoryKey",
  "latestCrystalSourceSlot",
  "canonicalBodyImprintReadModelAvailable = false",
]) {
  assert(
    !Object.values(files).some((source) => source.includes(forbidden)),
    `Legacy Body Imprint consumer remains: ${forbidden}`,
  );
}
assert(
  files.archive.includes('data-personality-ring-body-authority="FORBIDDEN"') &&
    files.archive.includes("LEGACY_HISTORY_LABEL_ONLY") &&
    !files.archive.includes("resolveLifeUniverseCrystalImprintGeometry") &&
    !files.archive.includes("resolveLifeUniverseCrystalSourceSlot") &&
    !files.archive.includes("crystal.copy"),
  "Archive still interprets Legacy ordering or copy as Body Imprint",
);
assert(
  files.canvas.includes("sameLifeSurfaceFacts") &&
    files.renderer.includes("sameLifeSurfaceFacts") &&
    files.renderer.includes("canonicalBodyImprintGroup") &&
    files.staticPresenter.includes("facts.imprints") &&
    files.resolver.includes("resolveXinmaiSameLifeSurfaceFacts") &&
    !files.canvas.includes("localStorage") &&
    !files.canvas.includes("indexedDB") &&
    !files.canvas.includes("PersonalityRingLite") &&
    !files.renderer.includes("localStorage") &&
    !files.renderer.includes("indexedDB"),
  "Canvas is not a typed-fact-only consumer",
);
console.log("[XINMAI CANONICAL BODY IMPRINT CONSUMER CUTOVER] PASS");
