import fs from "node:fs";

const cutover = fs.readFileSync(
  "src/services/realityToGravityCutoverTransaction.ts",
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
const hostContract = fs.readFileSync(
  "src/types/realityProductionRouteEntry.ts",
  "utf8",
);
const assert = (condition, message) => {
  if (!condition) throw new Error(message);
};
for (const marker of [
  "transactRealityAdventureContinuity",
  "CONSUMED_BY_GRAVITY_TRANSFER",
  "gravityTransfer: transfer",
  "gravityAdmission: admission",
  'lifecycle: "GRAVITY_ADMITTED"',
  "deterministicDigest",
]) {
  assert(cutover.includes(marker), `atomic cutover missing ${marker}`);
}
assert(
  hostContract.includes("request: GravityEntryTransferRequest") &&
    host.includes("onRequestGravityTransfer("),
  "Host typed request missing",
);
assert(route.includes("executeRealityToGravityCutover"), "Route cutover consumer missing");
assert(route.includes('cutover.status === "COMMITTED"'), "Route navigates without commit proof");
for (const forbidden of ["sessionStorage", "localStorage", "Math.random", "navigate("]) {
  assert(!cutover.includes(forbidden), `cutover owns forbidden ${forbidden}`);
}
console.log("[XINMAI REALITY TO GRAVITY ATOMIC CUTOVER] PASS");
