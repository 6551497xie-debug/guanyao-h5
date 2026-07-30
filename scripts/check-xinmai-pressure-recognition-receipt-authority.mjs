import fs from "node:fs";

const controller = fs.readFileSync(
  "src/services/xinmaiRealityPressureRecognitionController.ts",
  "utf8",
);
const host = fs.readFileSync(
  "src/components/RealityProductionHost.tsx",
  "utf8",
);
const assert = (condition, message) => {
  if (!condition) throw new Error(message);
};
for (const marker of [
  "expectedCanonicalRevision",
  "candidateRevisionReferenceId",
  "candidateBundleRevisionReferenceId",
  "CANDIDATE_REVISION_MISMATCH",
  "CANONICAL_REVISION_MISMATCH",
  "ALREADY_RECOGNIZED",
  "transactRealityAdventureContinuity",
  "recognitionReceiptReferenceId",
  "committedRecord.canonicalRevision",
]) {
  assert(controller.includes(marker), `recognition authority missing ${marker}`);
}
assert(
  controller.indexOf("transactRealityAdventureContinuity") <
    controller.lastIndexOf("status: transaction.value.status"),
  "recognition returns success before the canonical transaction",
);
assert(
  host.includes("recognizeRealityPressureCandidate"),
  "Host does not submit typed recognition command",
);
assert(
  !host.includes('setRecognitionAuthorityState(\n        Object.freeze({\n          receipt: Object.freeze'),
  "Host fabricates Recognition Receipt",
);
for (const forbidden of [
  "localStorage",
  "sessionStorage",
  "data-*",
  "setTimeout(",
]) {
  assert(!controller.includes(forbidden), `recognition authority owns forbidden ${forbidden}`);
}
console.log("[XINMAI PRESSURE RECOGNITION RECEIPT AUTHORITY] PASS");
