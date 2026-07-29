import fs from "node:fs";
const recovery = fs.readFileSync(
  "src/services/xinmaiLivedGrowthRecoveryPersistenceAdapter.ts",
  "utf8",
);
const ring = fs.readFileSync("src/services/personalityRingLiteService.ts", "utf8");
if (!recovery.includes("noBackfill: true")) throw new Error("noBackfill missing");
if (!ring.includes("LEGACY_VALID_CRYSTAL")) throw new Error("legacy projection missing");
if (recovery.includes("guanyao:personalityRingLite")) throw new Error("Archive cannot backfill authority");
console.log("[XINMAI LIVED GROWTH NO BACKFILL] PASS");
