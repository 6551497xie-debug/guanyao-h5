import fs from "node:fs";
const gravity = fs.readFileSync("src/pages/GravityPage.tsx", "utf8")
  .replace(/\/\*[\s\S]*?\*\//g, "");
for (const forbidden of [
  "livedResponseRecognized",
  "setLivedResponseRecognized",
  "revisionActionConfirmed",
  "ELIGIBLE_BY_USER_RECOGNITION",
  "USER_RECOGNIZED_RESPONSE",
]) {
  if (gravity.includes(forbidden)) throw new Error(`legacy authority found ${forbidden}`);
}
console.log("[XINMAI LEGACY LOCAL CRYSTAL AUTHORITY FORBIDDEN] PASS");
