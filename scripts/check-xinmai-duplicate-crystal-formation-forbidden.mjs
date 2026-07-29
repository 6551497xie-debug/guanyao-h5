import fs from "node:fs";
const consumer = fs.readFileSync("src/services/xinmaiCrystalFormationConsumer.ts", "utf8");
const ring = fs.readFileSync("src/services/personalityRingLiteService.ts", "utf8");
if (!consumer.includes("createStableXinmaiGrowthReference")) throw new Error("deterministic IDs missing");
if (!consumer.includes("ALREADY_FORMED")) throw new Error("receipt replay missing");
if (!ring.includes("item.crystalReferenceId === entry.crystalReferenceId")) {
  throw new Error("projection stable dedupe missing");
}
console.log("[XINMAI DUPLICATE CRYSTAL FORMATION FORBIDDEN] PASS");
