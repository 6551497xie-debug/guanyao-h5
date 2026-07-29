import fs from "node:fs";

const surface = fs.readFileSync(
  "src/components/XinmaiLivedResponseReturnSurface.tsx",
  "utf8",
);
const formation = fs.readFileSync(
  "src/services/xinmaiCrystalFormationConsumer.ts",
  "utf8",
);
const deposit = fs.readFileSync(
  "src/services/guanyaoDynamicsPersonalityRingDepositAdapter.ts",
  "utf8",
);
const gravity = fs.readFileSync("src/pages/GravityPage.tsx", "utf8");
const stripComments = (source) =>
  source.replace(/\/\*[\s\S]*?\*\//g, "").replace(/\/\/.*$/gm, "");
const assert = (value, message) => {
  if (!value) throw new Error(message);
};

for (const marker of [
  'data-lived-response-authority="USER_CONFIRMED_FACT"',
  'data-crystal-eligibility-authority="FORMAL_AUTHORITY_ONLY"',
  "formCrystalFromEligibility",
  "让这次回应留在生命里",
]) {
  assert(surface.includes(marker), `return surface missing ${marker}`);
}
for (const marker of [
  "XINMAI_LIVED_RESPONSE_FACT",
  "XINMAI_CRYSTAL_ELIGIBILITY",
  "formationReceipts",
  "depositDynamicsCurrentCrystalToPersonalityRing",
]) {
  assert(formation.includes(marker), `formal body sediment missing ${marker}`);
}
assert(
  deposit.includes("input.formationReceipt.formedCrystal"),
  "Archive projection does not consume a confirmed Receipt",
);
const executableGravity = stripComments(gravity);
for (const legacy of [
  "setLivedResponseRecognized",
  "handleLivedResponseRecognized",
  "depositDynamicsCurrentCrystalToPersonalityRing",
]) {
  assert(!executableGravity.includes(legacy), `legacy page authority remains: ${legacy}`);
}
console.log("XINMAI validated lived response → formal Crystal sediment gate passed.");
