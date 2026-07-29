import fs from "node:fs";
const source = fs.readFileSync("src/services/xinmaiLivedResponseAuthorityController.ts", "utf8");
const surface = fs.readFileSync("src/components/XinmaiLivedResponseReturnSurface.tsx", "utf8");
for (const expected of [
  "USER_EXPLICIT_CONFIRMATION",
  "AWAITING_USER_CONFIRMATION",
  "PERSISTENCE_UNAVAILABLE",
  "revokeLivedResponseFact",
  "FORMATION_ALREADY_CONFIRMED",
  "STALE_INTENTION_REVISION",
  "executeXinmaiLivedGrowthTransaction",
  '"REVOKED"',
]) {
  if (!(source + surface).includes(expected)) throw new Error(`missing ${expected}`);
}
console.log("[XINMAI LIVED RESPONSE AUTHORITY] PASS");
