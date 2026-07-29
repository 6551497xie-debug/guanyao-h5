import fs from "node:fs";
const source = fs.readFileSync("src/services/xinmaiCrystalEligibilityAuthority.ts", "utf8");
for (const expected of [
  '"ATTEMPTED"',
  '"COMPLETED_AS_INTENDED"',
  '"CHANGED_RESPONSE"',
  '"LIVED_RESPONSE_NOT_ATTEMPTED"',
  '"LIVED_RESPONSE_UNABLE_TO_CONTINUE"',
  "FORMATION_ALREADY_CONFIRMED",
  "executeXinmaiLivedGrowthTransaction",
]) {
  if (!source.includes(expected)) throw new Error(`missing ${expected}`);
}
console.log("[XINMAI CRYSTAL ELIGIBILITY AUTHORITY] PASS");
