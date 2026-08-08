import fs from "node:fs";

const read = (file) => fs.readFileSync(file, "utf8");
const assert = (condition, message) => {
  if (!condition) throw new Error(message);
};

const policy = read("src/services/xinmaiRealityGravityChoiceSceneSemanticPresentationPolicy.ts");
const resolver = read("src/services/xinmaiRealityGravityChoiceSceneSemanticResolver.ts");
const reality = read("src/components/RealityProductionHost.tsx");
const gravity = read("src/pages/GravityPage.tsx");
const packageJson = JSON.parse(read("package.json"));

assert(
  policy.includes('"ENABLED"') &&
    policy.includes('"SAFE_WITHHELD"') &&
    policy.includes("XINMAI_REALITY_GRAVITY_CHOICE_SCENE_SEMANTIC_PRESENTATION_POLICY"),
  "V3 Counter is not one typed policy switch",
);
assert(
  resolver.includes("XINMAI_REALITY_GRAVITY_CHOICE_SCENE_SEMANTIC_PRESENTATION_POLICY") &&
    resolver.includes('"SAFE_WITHHELD"') &&
    resolver.includes('withheld(input, "PRESENTATION_PAUSED")'),
  "V3 policy does not safe-withhold the new Presentation",
);
for (const forbidden of [
  "XINMAI_REALITY_GRAVITY_CHOICE_SCENE_SEMANTIC_PRESENTATION_POLICY",
]) {
  assert(!reality.includes(forbidden), "Reality Authority consumes V3 policy");
  assert(!gravity.includes(forbidden), "Gravity/Choice Authority consumes V3 policy");
}
assert(
  gravity.includes("commitChoiceActionIntention") &&
    gravity.includes("confirmXinmaiChoiceExplicitDeparture") &&
    reality.includes("onRequestGravityTransfer"),
  "Counter can remove native Authority controls instead of only Presentation",
);
assert(
  packageJson.scripts?.["check:xinmai-reality-gravity-choice-scene-forward-counter"] ===
    "node scripts/check-xinmai-reality-gravity-choice-scene-forward-counter.mjs",
  "Forward-counter gate is not registered",
);

console.log("[XINMAI REALITY GRAVITY CHOICE SCENE FORWARD COUNTER] PASS");
