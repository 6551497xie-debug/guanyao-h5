import fs from "node:fs";

const surface = fs.readFileSync(
  "src/components/XinmaiLivedResponseReturnSurface.tsx",
  "utf8",
);
const orchestrator = fs.readFileSync(
  "src/services/xinmaiCrystalFormationProductionOrchestrator.ts",
  "utf8",
);
const formation = fs.readFileSync(
  "src/services/xinmaiCrystalFormationConsumer.ts",
  "utf8",
);
const launch = fs.readFileSync("src/pages/LaunchLab.tsx", "utf8");
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
  "orchestrateProductionCrystalFormation",
  'data-crystal-formation-authority="IDB_TRANSACTION_COMPLETE"',
  "returnReceiptReferenceId:",
]) {
  assert(surface.includes(marker), `return surface missing ${marker}`);
}
assert(
  !surface.includes("formCrystalFromEligibility"),
  "Return surface must not call the low-level Formation authority",
);
assert(
  orchestrator.includes("formCrystalFromEligibility") &&
    orchestrator.includes("readXinmaiLivedGrowthCanonicalState"),
  "Production Orchestrator is not the typed Formation consumer",
);
assert(
  formation.includes('projection: "PENDING"') &&
    !formation.includes("reconcileCanonicalFormationReceiptsToPersonalityRing"),
  "Formation Receipt must retain honest Archive projection semantics",
);
assert(
  !launch.includes("readPersonalityRingLite") &&
    launch.includes("SAFE_WITHHELD_UNTIL_CANONICAL_CUTOVER"),
  "Returning Body Imprint did not enter safe-withheld isolation",
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
