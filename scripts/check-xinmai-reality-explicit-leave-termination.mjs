import fs from "node:fs";

const transaction = fs.readFileSync(
  "src/services/realityExplicitLeaveTerminationTransaction.ts",
  "utf8",
);
const controller = fs.readFileSync(
  "src/services/xinmaiRealityEncounterIntentController.ts",
  "utf8",
);
const app = fs.readFileSync("src/App.tsx", "utf8");
const route = fs.readFileSync(
  "src/pages/RealityProductionRouteEntry.tsx",
  "utf8",
);
const assert = (condition, message) => {
  if (!condition) throw new Error(message);
};
for (const marker of [
  "export async function executeRealityExplicitLeaveTermination",
  "await terminateRealityEncounter",
  '"EXPLICIT_LEAVE"',
]) {
  assert(transaction.includes(marker), `explicit leave transaction missing ${marker}`);
}
for (const marker of [
  "export async function terminateRealityEncounter",
  "transactRealityAdventureContinuity",
  'state: "TERMINAL"',
  "activeIdentityKey: undefined",
]) {
  assert(controller.includes(marker), `explicit leave authority missing ${marker}`);
}
assert(route.includes("createRealityExplicitLeaveRequestFromIntent"), "Route typed leave request missing");
assert(app.includes("executeRealityExplicitLeaveTermination"), "App explicit leave owner missing");
for (const source of [transaction, controller, route]) {
  for (const forbidden of ["sessionStorage", "localStorage"]) {
    assert(!source.includes(forbidden), `leave path owns forbidden ${forbidden}`);
  }
}
console.log("[XINMAI REALITY EXPLICIT LEAVE TERMINATION] PASS");
