import fs from "node:fs";

const type = fs.readFileSync(
  "src/types/xinmaiRealityEncounterIntent.ts",
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
const host = fs.readFileSync(
  "src/components/RealityProductionHost.tsx",
  "utf8",
);
const assert = (condition, message) => {
  if (!condition) throw new Error(message);
};
for (const state of [
  "READY_TO_ENTER_REALITY",
  "ACCEPTING_REALITY",
  "FAILED_RETRYABLE",
  "ACTIVE_IN_REALITY",
  "RECOVERING",
  "TERMINAL",
]) {
  assert(type.includes(`"${state}"`), `typed state missing ${state}`);
}
for (const marker of [
  "transactRealityAdventureContinuity",
  "intent.revision !== outcome.intentRevision",
  "isRealitySurfaceAdmissionTransactionValid",
  "recoverCurrentRealityEncounter",
]) {
  assert(controller.includes(marker), `atomic Intent missing ${marker}`);
}
for (const marker of [
  "PostCommitAdmissionTransactionState",
  "postCommitTransactionEpochRef",
  "rollbackRealityEncounterAdmission",
  "commitRealityEncounterActive",
]) {
  assert(route.includes(marker), `post-commit Route missing ${marker}`);
}
assert(host.includes('status: "REALITY_MINIMUM_PRESENTED"'), "Host typed outcome missing");
for (const source of [controller, route]) {
  for (const forbidden of ["sessionStorage", "localStorage"]) {
    assert(!source.includes(forbidden), `atomic path owns forbidden ${forbidden}`);
  }
}
console.log("[XINMAI REALITY ENCOUNTER INTENT ATOMIC MIGRATION] PASS");
