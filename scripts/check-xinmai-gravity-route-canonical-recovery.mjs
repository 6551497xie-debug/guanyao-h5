import fs from "node:fs";

const controller = fs.readFileSync(
  "src/services/xinmaiGravityEntryAdmissionController.ts",
  "utf8",
);
const route = fs.readFileSync(
  "src/pages/GravityProductionRouteEntry.tsx",
  "utf8",
);
const assert = (condition, message) => {
  if (!condition) throw new Error(message);
};
for (const marker of [
  "transactRealityAdventureContinuity",
  'kind: "ADMISSION"',
  'kind: "ACTIVE_IDENTITY"',
  "readCanonicalGravityAdmission",
  "canonicalIndexedDbRecoveryOnlyForNewRuntime",
  "transactionCompleteSuccessOnly",
]) {
  assert(controller.includes(marker), `Gravity Controller missing ${marker}`);
}
for (const marker of [
  "establishGravityRouteAdmission",
  "readCanonicalGravityAdmission",
  "subscribeToRealityAdventureContinuityRevision",
]) {
  assert(route.includes(marker), `Gravity Route missing ${marker}`);
}
for (const forbidden of [
  "sessionStorage",
  "localStorage",
  "indexedDB",
  "readGravityEntryRecoveryCandidate",
]) {
  assert(!route.includes(forbidden), `Gravity Route owns forbidden ${forbidden}`);
}
console.log("[XINMAI GRAVITY ROUTE CANONICAL RECOVERY] PASS");
