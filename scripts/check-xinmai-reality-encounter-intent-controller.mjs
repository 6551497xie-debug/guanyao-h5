import fs from "node:fs";

const controller = fs.readFileSync(
  "src/services/xinmaiRealityEncounterIntentController.ts",
  "utf8",
);
const store = fs.readFileSync(
  "src/services/xinmaiRealityAdventureContinuityTransactionalStore.ts",
  "utf8",
);
const assert = (condition, message) => {
  if (!condition) throw new Error(message);
};
for (const marker of [
  "export async function requestRealityEncounter",
  "export async function establishRealityEncounterAdmission",
  "export async function commitRealityEncounterActive",
  "export async function terminateRealityEncounter",
  "const INTENT_TTL_MS = 2 * 60 * 60 * 1_000",
  "transactRealityAdventureContinuity",
  "transactionCompleteSuccessOnly: true",
  "canonicalIndexedDbPersistenceOnly: true",
]) {
  assert(controller.includes(marker), `Intent Controller missing ${marker}`);
}
for (const forbidden of [
  "sessionStorage",
  "localStorage",
  "writeRealityEncounterRecoveryCandidate",
]) {
  assert(!controller.includes(forbidden), `Intent Controller owns forbidden ${forbidden}`);
}
assert(store.includes("transaction.oncomplete"), "IDB completion is not the success point");
console.log("[XINMAI REALITY ENCOUNTER INTENT CONTROLLER] PASS");
