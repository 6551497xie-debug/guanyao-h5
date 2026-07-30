import fs from "node:fs";

const store = fs.readFileSync(
  "src/services/xinmaiRealityAdventureContinuityTransactionalStore.ts",
  "utf8",
);
const observer = fs.readFileSync(
  "src/services/xinmaiRealityAdventureContinuityRevisionObserver.ts",
  "utf8",
);
const recognition = fs.readFileSync(
  "src/services/xinmaiRealityPressureRecognitionController.ts",
  "utf8",
);
const cutover = fs.readFileSync(
  "src/services/realityToGravityCutoverTransaction.ts",
  "utf8",
);
const realityRoute = fs.readFileSync(
  "src/pages/RealityProductionRouteEntry.tsx",
  "utf8",
);
const gravityRoute = fs.readFileSync(
  "src/pages/GravityProductionRouteEntry.tsx",
  "utf8",
);
const assert = (condition, message) => {
  if (!condition) throw new Error(message);
};
for (const marker of [
  "recognitionReceiptReferenceId",
  "gravityTransferReferenceId",
  "gravityAdmissionReferenceId",
  "gravityCycleId",
  "{ unique: true }",
]) {
  assert(store.includes(marker), `cross-tab unique index missing ${marker}`);
}
for (const source of [recognition, cutover]) {
  for (const marker of ["canonicalRevision", "fencingToken"]) {
    assert(source.includes(marker), `cross-tab mutation missing ${marker}`);
  }
}
for (const marker of [
  "BroadcastChannel",
  "notificationOnly: true",
  "rereadRequired: true",
  "noAuthority: true",
]) {
  assert(observer.includes(marker), `revision observer missing ${marker}`);
}
for (const source of [realityRoute, gravityRoute]) {
  assert(
    source.includes("subscribeToRealityAdventureContinuityRevision"),
    "production route does not re-read after cross-tab revision",
  );
}
console.log("[XINMAI RECOGNITION CROSS-TAB FENCING] PASS");
