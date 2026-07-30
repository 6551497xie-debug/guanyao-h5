import fs from "node:fs";

const realityController = fs.readFileSync(
  "src/services/xinmaiRealityEncounterIntentController.ts",
  "utf8",
);
const gravityController = fs.readFileSync(
  "src/services/xinmaiGravityEntryAdmissionController.ts",
  "utf8",
);
const legacy = fs.readFileSync(
  "src/services/xinmaiRealityAdventureContinuityLegacyAdapter.ts",
  "utf8",
);
const assert = (condition, message) => {
  if (!condition) throw new Error(message);
};
assert(
  !realityController.includes("readRealityEncounterRecoveryCandidate"),
  "legacy Reality Intent is backfilled into canonical continuity",
);
assert(
  gravityController.includes('currentAdmissionAuthority = "READ_ONLY_LEGACY"'),
  "legacy Gravity Admission lacks read-only isolation",
);
for (const forbidden of [
  "setItem(",
  "removeItem(",
  "RecognitionReceipt",
  "recognitionReceipt",
  "gravityTransfer",
]) {
  assert(!legacy.includes(forbidden), `legacy adapter creates forbidden ${forbidden}`);
}
assert(legacy.includes("noBackfill: true"), "No Backfill boundary missing");
console.log("[XINMAI RECOGNITION NO BACKFILL] PASS");
