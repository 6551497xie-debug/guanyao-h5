import fs from "node:fs";
const gravity = fs.readFileSync("src/pages/GravityPage.tsx", "utf8");
const controller = fs.readFileSync("src/services/xinmaiChoiceActionIntentionController.ts", "utf8");
for (const expected of [
  "await commitChoiceActionIntention(",
  "choicePresentationDecision.structuralInput",
  "CHOICE_ACTION_INTENTION_COMMITTED",
  "await bindChoiceActionIntentionToRealityEncounter({",
]) {
  if (!gravity.includes(expected)) throw new Error(`missing ${expected}`);
}
if (!controller.includes("noLivedResponseAuthority: true")) {
  throw new Error("Choice intention boundary missing");
}
if (!controller.includes("executeXinmaiLivedGrowthTransaction")) {
  throw new Error("Choice mutations bypass the transaction authority");
}
if (
  !controller.includes(
    "validateChoiceActionIntentionPrerequisites(input)",
  )
) {
  throw new Error("Choice controller bypasses shared prerequisites");
}
for (const expected of [
  "resolveChoiceActionRoutes(",
  "const currentRouteResolution = resolveChoiceActionRoutes(",
  "actionRouteSnapshot: Object.freeze({",
  'lifecycleState: "CONSUMED_BY_CHOICE" as const',
  '"XINMAI_CHOICE_ACTION_ROUTE_AUTHORITY" as const',
]) {
  if (!controller.includes(expected)) {
    throw new Error(`Choice V2 atomic Route boundary missing ${expected}`);
  }
}
if (controller.includes("changeExperienceRouteProof")) {
  throw new Error("Legacy Change Experience proof still grants Choice");
}
console.log("[XINMAI CHOICE ACTION INTENTION BOUNDARY] PASS");
