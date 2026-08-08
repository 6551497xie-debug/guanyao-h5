import fs from "node:fs";

const read = (file) => fs.readFileSync(file, "utf8");
const assert = (condition, message) => {
  if (!condition) throw new Error(message);
};

const resolver = read("src/services/xinmaiRealityGravityChoiceSceneSemanticResolver.ts");
const types = read("src/types/xinmaiRealityGravityChoiceSceneSemanticPresentation.ts");
const packageJson = JSON.parse(read("package.json"));

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
  "commitChoiceActionIntention",
  "RecognitionController",
  "ContinuityController",
]) {
  assert(!resolver.includes(forbidden), `Resolver crosses Authority boundary: ${forbidden}`);
}
assert(
  types.includes("noControllerCall: true") &&
    types.includes("noAuthorityWriteback: true") &&
    resolver.includes("hashStableReference") &&
    resolver.includes("CHOICE_COMMITTED_NOT_LIVED"),
  "One-way deterministic Presentation boundary is incomplete",
);
assert(
  packageJson.scripts?.["check:xinmai-reality-gravity-choice-scene-authority-boundary"] ===
    "node scripts/check-xinmai-reality-gravity-choice-scene-authority-boundary.mjs",
  "Authority-boundary gate is not registered",
);

console.log("[XINMAI REALITY GRAVITY CHOICE SCENE AUTHORITY BOUNDARY] PASS");
