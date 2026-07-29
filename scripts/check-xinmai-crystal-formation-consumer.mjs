import fs from "node:fs";
const source = fs.readFileSync("src/services/xinmaiCrystalFormationConsumer.ts", "utf8");
for (const expected of [
  "executeXinmaiLivedGrowthTransaction",
  "LEGACY_MULTIPLE_FORMATION_RECEIPTS",
  "choiceActionIntentionReferenceId",
  "XINMAI_CRYSTAL_ELIGIBILITY",
  "reconcileCanonicalFormationReceiptsToPersonalityRing",
  "SAFE_WITHHELD",
]) {
  if (!source.includes(expected)) throw new Error(`missing ${expected}`);
}
const projectionBlock = source.slice(
  source.indexOf("const projectReceipt"),
  source.indexOf("export async function formCrystalFromEligibility"),
);
if (
  projectionBlock.indexOf("reconcileCanonicalFormationReceiptsToPersonalityRing") >
  projectionBlock.indexOf("executeXinmaiLivedGrowthTransaction")
) {
  throw new Error(
    "Derived Archive mirror is not attempted after canonical Formation",
  );
}
if (
  projectionBlock.slice(
    projectionBlock.indexOf("(current) =>"),
  ).includes("reconcileCanonicalFormationReceiptsToPersonalityRing")
) {
  throw new Error("derived localStorage mirror leaked into IDB transaction");
}
console.log("[XINMAI CRYSTAL FORMATION CONSUMER] PASS");
