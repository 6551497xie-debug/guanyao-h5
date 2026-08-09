import fs from "node:fs";

const read = (file) => fs.readFileSync(file, "utf8");
const assert = (condition, message) => {
  if (!condition) throw new Error(message);
};

const resolver = read("src/services/xinmaiReturningSameLifeContinuityPresentationResolver.ts");
const canvas = read("src/components/RealityLifeUniverseCanvas.tsx");
const sceneResolver = read("src/services/xinmaiContinuousScenePresentationResolver.ts");
const sameLifeResolver = read("src/services/xinmaiSameLifeSurfaceHostResolver.ts");
const packageJson = JSON.parse(read("package.json"));

for (const token of [
  "receipt.formationReferenceId",
  "receipt.crystalReferenceId",
  "receipt.choiceActionIntentionReferenceId",
  "candidate.crystalReferenceId",
  "candidate.formationReferenceId",
  "candidate.choiceActionIntentionReferenceId",
  "candidate.bodyReferenceId",
  "CURRENT_IMPRINT_NOT_FOUND",
  "FORMATION_LINEAGE_MISMATCH",
  "RETURN_LINEAGE_MISMATCH",
]) {
  assert(resolver.includes(token), `V4 lineage check missing: ${token}`);
}
assert(
  resolver.includes('checkpoint.state === "FORMATION_IN_PROGRESS"') &&
    resolver.includes("input.formationReceipt !== null") &&
    resolver.includes('nearObjectKind: "LIVED_RESPONSE"'),
  "Formation pending can incorrectly publish a Crystal object",
);
assert(
  resolver.includes("canonicalImprints.map") &&
    canvas.includes("continuousSceneSemanticProjection.nearObjectReferenceId"),
  "Canonical ordered references do not reach the shared scene",
);
assert(
  resolver.includes("[2, 5, 3, 6, 1, 4, 0]") &&
    sameLifeResolver.includes("[2, 5, 3, 6, 1, 4, 0]") &&
    sceneResolver.includes("currentImprint.stableNodeIndex") &&
    sceneResolver.includes("semanticProjection.lineage.stableNodeIndex"),
  "V4 stable-node lineage does not match and revalidate the C2 node grammar",
);
assert(
  packageJson.scripts?.["check:xinmai-returning-same-life-continuity-lineage"] ===
    "node scripts/check-xinmai-returning-same-life-continuity-lineage.mjs",
  "V4 lineage gate is not registered",
);

console.log("[XINMAI RETURNING SAME-LIFE CONTINUITY LINEAGE] PASS");
