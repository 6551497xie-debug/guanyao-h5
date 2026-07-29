import fs from "node:fs";
import path from "node:path";

const root = "src";
const authorityPath =
  "src/services/xinmaiLivedGrowthTransactionAuthority.ts";
const storePath =
  "src/services/xinmaiLivedGrowthTransactionalStore.ts";
const adapterPath =
  "src/services/xinmaiLivedGrowthRecoveryPersistenceAdapter.ts";
const authority = fs.readFileSync(authorityPath, "utf8");
const contract = fs.readFileSync(
  "src/types/xinmaiLivedGrowthTransaction.ts",
  "utf8",
);
const adapter = fs.readFileSync(
  adapterPath,
  "utf8",
);
const store = fs.readFileSync(storePath, "utf8");
const files = [];
const walk = (directory) => {
  for (const entry of fs.readdirSync(directory, { withFileTypes: true })) {
    const target = path.join(directory, entry.name);
    if (entry.isDirectory()) walk(target);
    else if (/\.(ts|tsx)$/.test(entry.name)) files.push(target);
  }
};
walk(root);
const assert = (condition, message) => {
  if (!condition) throw new Error(message);
};

for (const marker of [
  "transactXinmaiLivedGrowthCanonicalState",
  "INDEXED_DB_CANONICAL_TRANSACTION",
  "IDB_TRANSACTION_COMPLETE",
  "localStorageMutationAuthority: false",
  "webLockAuthority: false",
]) {
  assert(authority.includes(marker), `transaction authority missing ${marker}`);
}
for (const marker of [
  "indexedDB.open(",
  '"readwrite"',
  "transaction.oncomplete",
  "writeEnvelopeIndexes(transaction, next)",
  "LEGACY_WRITER_DETECTED",
  'durability: "strict"',
]) {
  assert(store.includes(marker), `canonical store missing ${marker}`);
}
for (const forbidden of [
  "navigator.locks",
  "locks.request(",
  "localStorage.setItem",
  "writeXinmaiLivedGrowthRecoveryCandidate",
]) {
  assert(
    !authority.includes(forbidden) && !store.includes(forbidden),
    `non-transactional authority remains: ${forbidden}`,
  );
}
assert(!adapter.includes("setItem("), "legacy V1 adapter is still writable");
assert(
  contract.includes("TRANSACTION_STORAGE_UNAVAILABLE") &&
    contract.includes("LEGACY_WRITER_DETECTED"),
  "transactional failure contract is incomplete",
);
for (const file of files) {
  const source = fs.readFileSync(file, "utf8");
  if (
    file !== authorityPath &&
    file !== adapterPath &&
    file !== storePath &&
    source.includes("transactXinmaiLivedGrowthCanonicalState")
  ) {
    throw new Error(`direct Canonical writer remains in ${file}`);
  }
}
for (const file of [
  "src/services/xinmaiChoiceActionIntentionController.ts",
  "src/services/xinmaiLivedResponseAuthorityController.ts",
  "src/services/xinmaiCrystalEligibilityAuthority.ts",
  "src/services/xinmaiCrystalFormationConsumer.ts",
]) {
  const source = fs.readFileSync(file, "utf8");
  assert(
    source.includes("executeXinmaiLivedGrowthTransaction"),
    `${file} bypasses the unique transaction authority`,
  );
}
console.log("[XINMAI LIVED GROWTH TRANSACTION AUTHORITY] PASS");
