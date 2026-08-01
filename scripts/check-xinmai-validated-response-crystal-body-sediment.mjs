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
  "confirmLivedResponseFact",
  "resolveCrystalEligibilityForFact",
  "returnReceiptReferenceId:",
]) {
  assert(surface.includes(marker), `return surface missing ${marker}`);
}
assert(
  !surface.includes("formCrystalFromEligibility"),
  "Return surface must not form Crystal directly",
);
for (const marker of [
  "XINMAI_LIVED_RESPONSE_FACT",
  "XINMAI_CRYSTAL_ELIGIBILITY",
  "formationReceipts",
  "reconcileCanonicalFormationReceiptsToPersonalityRing",
  'projection === "PROJECTED"',
]) {
  assert(formation.includes(marker), `formal body sediment missing ${marker}`);
}
assert(
  deposit.includes("receipt.formedCrystal"),
  "Archive projection does not consume confirmed canonical Receipts",
);
assert(
  deposit.includes("writePersistedPersonalityRingLiteState(next)"),
  "Archive projection is not isolated as a derived mirror",
);
assert(
  !formation.includes("depositDynamicsCurrentCrystalToPersonalityRing"),
  "Formation still owns the legacy direct Archive deposit",
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
