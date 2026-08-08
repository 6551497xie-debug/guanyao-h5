import fs from "node:fs";

const read = (path) => fs.readFileSync(path, "utf8");
const assert = (condition, message) => {
  if (!condition) throw new Error(message);
};

const policy = read("src/services/xinmaiContinuousScenePresentationPolicy.ts");
const resolver = read("src/services/xinmaiContinuousScenePresentationResolver.ts");
const host = read("src/components/XinmaiContinuousSceneHost.tsx");
const reality = read("src/components/RealityLifeUniverseCanvas.tsx");
const ownership = read("src/components/XinmaiCrystalFormationOwnershipMoment.tsx");
const checkpoint = read("src/components/XinmaiLivedResponseReturnSurface.tsx");
const packageJson = JSON.parse(read("package.json"));

assert(
  /XINMAI_CONTINUOUS_SCENE_PRESENTATION_POLICY\s*=\s*\n?\s*"(?:ENABLED|SAFE_WITHHELD)" as "ENABLED" \| "SAFE_WITHHELD"/.test(policy),
  "Counter policy must remain one typed ENABLED/SAFE_WITHHELD switch",
);
assert(
  resolver.includes('=== "SAFE_WITHHELD"') &&
    resolver.includes('withheld(input, "PRESENTATION_PAUSED")') &&
    host.includes("XINMAI_CONTINUOUS_SCENE_PRESENTATION_POLICY"),
  "Counter policy is not consumed by the pure Resolver and single Host",
);
assert(
  reality.includes("resolveXinmaiSameLifeSurfaceSelection") &&
    reality.includes("resolveXinmaiSameLifeAccessibleSemanticMirror") &&
    reality.includes("canonicalBodyImprintDecision") &&
    ownership.includes("visualFacts.formationReferenceId") &&
    ownership.includes("visualFacts.crystalReferenceId") &&
    ownership.includes("带着这道痕迹，继续同行") &&
    checkpoint.includes("XinmaiCrystalFormationOwnershipMoment"),
  "Counter cannot prove preservation of C1/C2 assets and native controls",
);
for (const forbidden of [
  "SharedLifeUniverseFallback",
  "CosmicPageStarField",
  "LifeUniverseRouteFallbackCanvas",
]) {
  assert(
    ![host, reality, ownership, checkpoint].some((source) =>
      source.includes(forbidden),
    ),
    `Counter boundary can revive a rejected producer: ${forbidden}`,
  );
}
assert(
  packageJson.scripts?.["check:xinmai-continuous-scene-forward-counter"] ===
    "node scripts/check-xinmai-continuous-scene-forward-counter.mjs",
  "Continuous Scene forward-counter gate is not registered",
);

console.log("[XINMAI CONTINUOUS SCENE FORWARD COUNTER] PASS");
