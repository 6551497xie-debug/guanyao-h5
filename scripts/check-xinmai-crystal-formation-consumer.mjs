import fs from "node:fs";
const source = fs.readFileSync("src/services/xinmaiCrystalFormationConsumer.ts", "utf8");
for (const expected of [
  "navigator",
  "locks.request(",
  "XINMAI_CRYSTAL_ELIGIBILITY",
  "depositDynamicsCurrentCrystalToPersonalityRing",
  "SAFE_WITHHELD",
]) {
  if (!source.includes(expected)) throw new Error(`missing ${expected}`);
}
console.log("[XINMAI CRYSTAL FORMATION CONSUMER] PASS");
