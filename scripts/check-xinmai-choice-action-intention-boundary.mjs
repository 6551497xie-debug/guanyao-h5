import fs from "node:fs";
const gravity = fs.readFileSync("src/pages/GravityPage.tsx", "utf8");
const controller = fs.readFileSync("src/services/xinmaiChoiceActionIntentionController.ts", "utf8");
for (const expected of [
  "commitChoiceActionIntention({",
  "CHOICE_ACTION_INTENTION_COMMITTED",
  "bindChoiceActionIntentionToRealityEncounter({",
]) {
  if (!gravity.includes(expected)) throw new Error(`missing ${expected}`);
}
if (!controller.includes("noLivedResponseAuthority: true")) {
  throw new Error("Choice intention boundary missing");
}
console.log("[XINMAI CHOICE ACTION INTENTION BOUNDARY] PASS");
