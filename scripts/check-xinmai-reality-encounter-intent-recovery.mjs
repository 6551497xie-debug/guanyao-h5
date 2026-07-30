import fs from "node:fs";

const legacy = fs.readFileSync(
  "src/services/xinmaiRealityEncounterIntentRecoveryAdapter.ts",
  "utf8",
);
const controller = fs.readFileSync(
  "src/services/xinmaiRealityEncounterIntentController.ts",
  "utf8",
);
const route = fs.readFileSync(
  "src/pages/RealityProductionRouteEntry.tsx",
  "utf8",
);
const assert = (condition, message) => {
  if (!condition) throw new Error(message);
};
assert(legacy.includes("readRealityEncounterRecoveryCandidate"), "legacy reader missing");
for (const forbidden of ["setItem(", "removeItem(", "writeRealityEncounterRecoveryCandidate"]) {
  assert(!legacy.includes(forbidden), `legacy adapter owns forbidden ${forbidden}`);
}
for (const marker of [
  "recoverCurrentRealityEncounter",
  "readRealityAdventureContinuity",
  'kind: "ACTIVE_IDENTITY"',
]) {
  assert(controller.includes(marker), `typed recovery missing ${marker}`);
}
for (const forbidden of ["sessionStorage", "localStorage", "indexedDB"]) {
  assert(!route.includes(forbidden), `Route owns forbidden recovery API ${forbidden}`);
}
console.log("[XINMAI REALITY ENCOUNTER INTENT RECOVERY] PASS");
