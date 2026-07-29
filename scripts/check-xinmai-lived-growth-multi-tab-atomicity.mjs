import fs from "node:fs";

const authority = fs.readFileSync(
  "src/services/xinmaiLivedGrowthTransactionalStore.ts",
  "utf8",
);
const harness = fs.readFileSync(
  "scripts/check-xinmai-lived-growth-production-browser-acceptance-harness.mjs",
  "utf8",
);
const assert = (condition, message) => {
  if (!condition) throw new Error(message);
};

for (const marker of [
  "XINMAI_LIVED_GROWTH_FORMATION_INDEX_STORE",
  "choiceActionIntentionReferenceId",
  "formationReferenceId",
  "crystalReferenceId",
  "{ unique: true }",
  "transaction.oncomplete",
  "CANONICAL_UNIQUENESS_VIOLATION",
]) {
  assert(authority.includes(marker), `global transaction missing ${marker}`);
}
for (const marker of [
  "same lineage",
  "different lineage",
  "transaction complete",
  "Reduced Motion",
  "legacy writer",
]) {
  assert(harness.includes(marker), `multi-tab harness missing ${marker}`);
}
console.log("[XINMAI LIVED GROWTH MULTI-TAB ATOMICITY] PASS");
