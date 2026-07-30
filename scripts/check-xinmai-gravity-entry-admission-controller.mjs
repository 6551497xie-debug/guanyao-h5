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
  "export async function establishGravityRouteAdmission",
  "export async function commitGravityEntryActive",
  "transactRealityAdventureContinuity",
  "isGravitySurfaceAdmissionTransactionValid",
  "canonicalIndexedDbRecoveryOnlyForNewRuntime: true",
  "transactionCompleteSuccessOnly: true",
  "readCanonicalGravityAdmission",
]) {
  assert(controller.includes(marker), `Gravity Admission Controller missing ${marker}`);
}
for (const marker of [
  "establishGravityRouteAdmission",
  "commitGravityEntryActive",
  "observeGravityActiveCommit",
]) {
  assert(route.includes(marker), `Gravity Route missing ${marker}`);
}
for (const forbidden of ["sessionStorage", "localStorage", "prepareGravityEntryTransfer"]) {
  assert(!controller.includes(forbidden), `Gravity Controller owns forbidden ${forbidden}`);
}
console.log("[XINMAI GRAVITY ENTRY ADMISSION CONTROLLER] PASS");
