import fs from "node:fs";

const cutover = fs.readFileSync(
  "src/services/realityToGravityCutoverTransaction.ts",
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
  'state: "TERMINAL"',
  "deterministicDigest",
  "gravity-transfer:",
  "gravity-admission:",
  "gravity-cycle:",
  "gravity-observation:",
  "SOURCE_CANONICAL_SUPERSEDED",
]) {
  assert(cutover.includes(marker), `atomic cutover missing ${marker}`);
}
for (const forbidden of [
  "sessionStorage",
  "localStorage",
  "Math.random",
  "crypto.randomUUID",
  "navigate(",
]) {
  assert(!cutover.includes(forbidden), `atomic cutover owns forbidden ${forbidden}`);
}
assert(
  cutover.indexOf("recognitionReceipt: consumedReceipt") <
    cutover.indexOf('lifecycle: "GRAVITY_ADMITTED"'),
  "Receipt consumption is not committed with Gravity Admission",
);
console.log("[XINMAI RECOGNITION TRANSFER ADMISSION ATOMICITY] PASS");
