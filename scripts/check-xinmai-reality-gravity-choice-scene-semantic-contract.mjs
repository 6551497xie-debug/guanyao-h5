import fs from "node:fs";

const read = (file) => fs.readFileSync(file, "utf8");
const assert = (condition, message) => {
  if (!condition) throw new Error(message);
};

const types = read("src/types/xinmaiRealityGravityChoiceSceneSemanticPresentation.ts");
const sceneTypes = read("src/types/xinmaiContinuousScenePresentation.ts");
const packageJson = JSON.parse(read("package.json"));

for (const stage of [
  "REALITY_APPROACHING",
  "PRESSURE_RECOGNIZED",
  "GRAVITY_OBSERVING",
  "GRAVITY_RECOGNIZED",
  "CHOICE_READY",
  "CHOICE_COMMITTED",
]) {
  assert(types.includes(stage), `Semantic stage missing: ${stage}`);
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
]) {
  assert(types.includes(token), `Boundary token missing: ${token}`);
}
assert(
  sceneTypes.includes("semanticProjection:") &&
    sceneTypes.includes("SEMANTIC_PROJECTION_REQUIRED") &&
    sceneTypes.includes("SEMANTIC_PROJECTION_SAFE_WITHHELD") &&
    sceneTypes.includes("SEMANTIC_PROJECTION_MISMATCH"),
  "Continuous Scene does not carry the typed semantic projection",
);
assert(
  packageJson.scripts?.["check:xinmai-reality-gravity-choice-scene-semantic-contract"] ===
    "node scripts/check-xinmai-reality-gravity-choice-scene-semantic-contract.mjs",
  "Semantic contract gate is not registered",
);

console.log("[XINMAI REALITY GRAVITY CHOICE SCENE SEMANTIC CONTRACT] PASS");
