import fs from "node:fs";

const read = (file) => fs.readFileSync(file, "utf8");
const assert = (condition, message) => {
  if (!condition) throw new Error(message);
};

const canvas = read("src/components/RealityLifeUniverseCanvas.tsx");
const reality = read("src/components/RealityProductionHost.tsx");
const gravity = read("src/pages/GravityPage.tsx");
const inertia = read("src/components/RealityGravityInertiaField.tsx");
const packageJson = JSON.parse(read("package.json"));

assert(
  canvas.includes("sceneSemanticFacts") &&
    canvas.includes("resolveXinmaiRealityGravityChoiceSceneSemanticPresentation") &&
    canvas.includes("semanticProjection: sceneSemanticProjection") &&
    !canvas.includes('continuousSceneSurface === "GRAVITY_CHOICE"\n        ? "GRAVITY_OBSERVATION"'),
  "Reality/Gravity Canvas keeps the fixed Gravity near-object success path",
);
assert(
  reality.includes("recognitionReceiptReferenceId") &&
    reality.includes("recognitionCanonicalRevision") &&
    reality.includes("sceneSemanticFacts={realitySceneSemanticFacts}"),
  "Reality recognition proof is not delivered to the semantic resolver",
);
assert(
  gravity.includes("gravitySceneSemanticFacts") &&
    gravity.includes("choiceDecision: choicePresentationDecision") &&
    gravity.includes("actionRouteResolution") &&
    gravity.includes("sceneSemanticFacts={gravitySceneSemanticFacts}"),
  "Gravity/Choice typed decisions are not delivered atomically",
);
assert(
  inertia.includes("semanticProjection") &&
    inertia.includes("PROTECTION_BENEFIT_COST_BALANCE") &&
    inertia.includes("COMMITTED_NOT_LIVED"),
  "Gravity NEAR presenter still owns or omits the typed Choice stage",
);
assert(
  packageJson.scripts?.["check:xinmai-reality-gravity-choice-scene-consumer-cutover"] ===
    "node scripts/check-xinmai-reality-gravity-choice-scene-consumer-cutover.mjs",
  "Consumer-cutover gate is not registered",
);

console.log("[XINMAI REALITY GRAVITY CHOICE SCENE CONSUMER CUTOVER] PASS");
