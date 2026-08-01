import fs from "node:fs";

const source = fs.readFileSync(
  "src/services/xinmaiCrystalFormationConsumer.ts",
  "utf8",
);
const orchestrator = fs.readFileSync(
  "src/services/xinmaiCrystalFormationProductionOrchestrator.ts",
  "utf8",
);

for (const expected of [
  "executeXinmaiLivedGrowthTransaction",
  "LEGACY_MULTIPLE_FORMATION_RECEIPTS",
  "choiceActionIntentionReferenceId",
  "XINMAI_CRYSTAL_ELIGIBILITY",
  'projection: "PENDING"',
  "SAFE_WITHHELD",
]) {
  if (!source.includes(expected)) throw new Error(`missing ${expected}`);
}
if (
  source.includes("reconcileCanonicalFormationReceiptsToPersonalityRing") ||
  source.includes("readPersonalityRingLite") ||
  source.includes("writePersistedPersonalityRingLiteState")
) {
  throw new Error("Legacy PersonalityRing mirror remains in Formation authority");
}
for (const expected of [
  "readXinmaiLivedGrowthCanonicalState",
  "formCrystalFromEligibility",
  "RECOVERY_RETRY",
  "IDB_TRANSACTION_COMPLETE",
  "SAFE_WITHHELD_UNTIL_CANONICAL_CUTOVER",
]) {
  if (!orchestrator.includes(expected)) {
    throw new Error(`Production Orchestrator missing ${expected}`);
  }
}
console.log("[XINMAI CRYSTAL FORMATION CONSUMER] PASS");
