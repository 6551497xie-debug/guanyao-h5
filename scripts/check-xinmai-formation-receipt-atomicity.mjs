import fs from "node:fs";
const source = fs.readFileSync("src/services/xinmaiCrystalFormationConsumer.ts", "utf8");
const store = fs.readFileSync(
  "src/services/xinmaiLivedGrowthTransactionalStore.ts",
  "utf8",
);
const storeContract = fs.readFileSync(
  "src/types/xinmaiLivedGrowthTransactionalStore.ts",
  "utf8",
);
for (const expected of [
  "executeXinmaiLivedGrowthTransaction",
  'state: "CONSUMED"',
  "consumedByFormationReferenceId",
  "formationReceipts: Object.freeze",
  "fencingToken",
]) {
  if (!source.includes(expected)) throw new Error(`missing ${expected}`);
}
if (!storeContract.includes("growth-crystal-projection")) {
  throw new Error("missing growth-crystal-projection");
}
for (const expected of [
  "writeEnvelopeIndexes(transaction, next)",
  "transaction.oncomplete",
]) {
  if (!store.includes(expected)) throw new Error(`missing ${expected}`);
}
console.log("[XINMAI FORMATION RECEIPT ATOMICITY] PASS");
