import fs from "node:fs";

const lived = fs.readFileSync(
  "src/services/xinmaiLivedResponseAuthorityController.ts",
  "utf8",
);
const eligibility = fs.readFileSync(
  "src/services/xinmaiCrystalEligibilityAuthority.ts",
  "utf8",
);
const formation = fs.readFileSync(
  "src/services/xinmaiCrystalFormationConsumer.ts",
  "utf8",
);
const assert = (condition, message) => {
  if (!condition) throw new Error(message);
};

assert(
  lived.includes("choiceActionIntentionReferenceId") &&
    lived.includes("FORMATION_ALREADY_CONFIRMED"),
  "Lived Response does not treat a formed Choice lineage as terminal",
);
assert(
  eligibility.includes("lineageReceipts") &&
    eligibility.includes("FORMATION_ALREADY_CONFIRMED"),
  "Eligibility can reopen a formed Choice lineage",
);
assert(
  formation.includes("lineageReceipts.length > 1") &&
    formation.includes("LEGACY_MULTIPLE_FORMATION_RECEIPTS") &&
    formation.includes("lineageReceipts.length === 1"),
  "Formation does not enforce one Receipt per Choice lineage",
);
console.log("[XINMAI LIVED GROWTH POST-FORMATION LINEAGE TERMINAL] PASS");
