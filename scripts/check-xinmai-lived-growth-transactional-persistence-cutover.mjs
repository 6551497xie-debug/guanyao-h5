import fs from "node:fs";

const store = fs.readFileSync(
  "src/services/xinmaiLivedGrowthTransactionalStore.ts",
  "utf8",
);
const contract = fs.readFileSync(
  "src/types/xinmaiLivedGrowthTransactionalStore.ts",
  "utf8",
);
const legacy = fs.readFileSync(
  "src/services/xinmaiLivedGrowthRecoveryPersistenceAdapter.ts",
  "utf8",
);
const authority = fs.readFileSync(
  "src/services/xinmaiLivedGrowthTransactionAuthority.ts",
  "utf8",
);
const assert = (condition, message) => {
  if (!condition) throw new Error(message);
};

for (const marker of [
  "xinmai-lived-growth-canonical",
  "canonical-growth-envelope",
  "growth-migration-meta",
  "growth-eligibility-index",
  "growth-formation-index",
  "growth-crystal-projection",
]) {
  assert(
    contract.includes(marker),
    `transactional schema missing ${marker}`,
  );
}
for (const marker of [
  "IDB_TRANSACTION_COMPLETE",
  "transaction.oncomplete",
  "transaction.onabort",
  "request.onblocked",
  "database.onversionchange",
  'durability: "strict"',
  "sourceDigest",
  "NO_LEGACY_SOURCE",
  "LEGACY_WRITER_DETECTED",
  "LEGACY_IMPORT_CONFLICT",
  "writeEnvelopeIndexes(transaction, next)",
]) {
  assert(store.includes(marker), `transactional cutover missing ${marker}`);
}
for (const forbidden of [
  "localStorage.setItem",
  "navigator.locks",
  "locks.request(",
]) {
  assert(!store.includes(forbidden), `store owns forbidden ${forbidden}`);
  assert(
    !authority.includes(forbidden),
    `authority owns forbidden ${forbidden}`,
  );
}
assert(!legacy.includes("setItem("), "V1 localStorage remains mutable");
assert(
  legacy.includes("LEGACY_READ_ONLY_SOURCE"),
  "V1 source is not explicitly read-only",
);
assert(
  authority.includes('successAuthority: "IDB_TRANSACTION_COMPLETE"'),
  "transaction completion is not the only success authority",
);
console.log(
  "[XINMAI LIVED GROWTH TRANSACTIONAL PERSISTENCE CUTOVER] PASS",
);
