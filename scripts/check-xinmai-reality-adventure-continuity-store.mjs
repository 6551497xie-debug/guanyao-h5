import fs from "node:fs";

const types = fs.readFileSync(
  "src/types/xinmaiRealityAdventureContinuity.ts",
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
  '"xinmai-reality-adventure-continuity"',
  '"reality-adventure-encounter-continuity"',
  '"reality-adventure-continuity-migration-meta"',
  "encounterCycleId",
  "canonicalRevision",
  "fencingToken",
  "recognitionReceipt",
  "gravityTransfer",
  "gravityAdmission",
]) {
  assert(types.includes(marker), `continuity contract missing ${marker}`);
}
for (const marker of [
  "indexedDB.open",
  '"readwrite"',
  'durability: "strict"',
  "transaction.oncomplete",
  "transaction.onabort",
  "request.onblocked",
  "database.onversionchange",
  "{ unique: true }",
  "isRealityAdventureContinuityMutationEnabled",
]) {
  assert(store.includes(marker), `continuity store missing ${marker}`);
}
for (const forbidden of [
  "localStorage.setItem",
  "sessionStorage.setItem",
  "navigator.locks",
  "request.onsuccess = () => resolve",
]) {
  assert(!store.includes(forbidden), `continuity store owns forbidden ${forbidden}`);
}
console.log("[XINMAI REALITY ADVENTURE CONTINUITY STORE] PASS");
