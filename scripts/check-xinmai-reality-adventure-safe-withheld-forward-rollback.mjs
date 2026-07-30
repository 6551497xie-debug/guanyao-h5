import fs from "node:fs";

const policy = fs.readFileSync(
  "src/services/xinmaiRealityAdventureContinuityMutationPolicy.ts",
  "utf8",
);
const store = fs.readFileSync(
  "src/services/xinmaiRealityAdventureContinuityTransactionalStore.ts",
  "utf8",
);
const gravity = fs.readFileSync(
  "src/services/xinmaiGravityEntryAdmissionController.ts",
  "utf8",
);
const assert = (condition, message) => {
  if (!condition) throw new Error(message);
};
for (const marker of [
  '"ENABLED" as "ENABLED" | "SAFE_WITHHELD"',
  "canonicalRecoveryRemainsReadable: true",
  "legacySourcesRemainReadOnly: true",
  "noLegacyWriterRestoration: true",
  "noSchemaDowngrade: true",
  "noDatabaseDeletion: true",
]) {
  assert(policy.includes(marker), `forward rollback policy missing ${marker}`);
}
assert(
  store.includes("isRealityAdventureContinuityMutationEnabled"),
  "transaction store is not governed by forward-safe-withhold policy",
);
assert(
  store.includes('reason: "MUTATION_PAUSED"'),
  "paused mutation has no typed outcome",
);
assert(
  gravity.includes('transaction.reason === "MUTATION_PAUSED"'),
  "legal legacy Admission is not read-only recoverable during pause",
);
console.log("[XINMAI REALITY ADVENTURE SAFE WITHHELD FORWARD ROLLBACK] PASS");
