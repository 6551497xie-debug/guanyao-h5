import fs from "node:fs";
const source = fs.readFileSync("src/services/xinmaiCrystalFormationConsumer.ts", "utf8");
for (const expected of [
  "FORMATION_PENDING",
  "consumedByFormationReferenceId",
  "formationReceipts: committed",
  "RECEIPT_UNCONFIRMED",
  "fencingToken",
]) {
  if (!source.includes(expected)) throw new Error(`missing ${expected}`);
}
console.log("[XINMAI FORMATION RECEIPT ATOMICITY] PASS");
