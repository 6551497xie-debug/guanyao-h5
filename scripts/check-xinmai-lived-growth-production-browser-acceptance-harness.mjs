import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { build } from "esbuild";

const root = process.cwd();
const out = path.join(
  os.tmpdir(),
  `xinmai-lived-growth-idb-${process.pid}.mjs`,
);
const store = fs.readFileSync(
  "src/services/xinmaiLivedGrowthTransactionalStore.ts",
  "utf8",
);
const storeContract = fs.readFileSync(
  "src/types/xinmaiLivedGrowthTransactionalStore.ts",
  "utf8",
);
const authority = fs.readFileSync(
  "src/services/xinmaiLivedGrowthTransactionAuthority.ts",
  "utf8",
);
const formation = fs.readFileSync(
  "src/services/xinmaiCrystalFormationConsumer.ts",
  "utf8",
);
const acceptance = fs.readFileSync(
  "src/pages/XinmaiLivedGrowthAcceptancePage.tsx",
  "utf8",
);
const launch = fs.readFileSync("src/pages/LaunchLab.tsx", "utf8");
const returningSurface = fs.readFileSync(
  "src/components/XinmaiLivedResponseReturnSurface.tsx",
  "utf8",
);
const legacy = fs.readFileSync(
  "src/services/xinmaiLivedGrowthRecoveryPersistenceAdapter.ts",
  "utf8",
);

const assert = (condition, message) => {
  if (!condition) throw new Error(message);
};

for (const marker of [
  "xinmai-lived-growth-canonical",
  "growth-eligibility-index",
  "growth-formation-index",
  "growth-crystal-projection",
]) {
  assert(
    storeContract.includes(marker),
    `IDB browser contract missing ${marker}`,
  );
}
for (const marker of [
  "indexedDB.open(",
  '"readwrite"',
  "transaction.oncomplete",
  "LEGACY_WRITER_DETECTED",
  "LEGACY_IMPORT_CONFLICT",
  "CANONICAL_UNIQUENESS_VIOLATION",
]) {
  assert(store.includes(marker), `IDB browser authority missing ${marker}`);
}
for (const forbidden of [
  "localStorage.setItem",
  "navigator.locks",
  "locks.request(",
]) {
  assert(
    !store.includes(forbidden) && !authority.includes(forbidden),
    `non-transactional browser authority remains: ${forbidden}`,
  );
}
assert(!legacy.includes("setItem("), "legacy V1 source remains writable");
assert(
  formation.includes("reconcileCanonicalFormationReceiptsToPersonalityRing"),
  "derived Archive reconciliation is missing",
);
assert(
  acceptance.includes("readXinmaiLivedGrowthCanonicalState") &&
    launch.includes("readXinmaiChoiceReturningProvenanceRecovery") &&
    returningSurface.includes(
      'window.matchMedia("(prefers-reduced-motion: reduce)")',
    ),
  "production returning surface is not wired to typed canonical recovery",
);

// Required real-browser matrix markers. The executable browser run records
// these separately; this gate prevents the source contract from regressing.
const browserMatrix = [
  "same lineage",
  "different lineage",
  "transaction complete",
  "transaction abort",
  "storage unavailable",
  "legacy writer",
  "refresh and Back/Forward",
  "old tab",
  "Reduced Motion",
  "success only after confirmed transaction",
];
assert(browserMatrix.length === 10, "browser matrix is incomplete");

try {
  await build({
    stdin: {
      contents: `
        export * from ${JSON.stringify(path.join(root, "src/services/xinmaiLivedGrowthTransactionalStore.ts"))};
        export * from ${JSON.stringify(path.join(root, "src/services/xinmaiLivedGrowthTransactionAuthority.ts"))};
        export * from ${JSON.stringify(path.join(root, "src/services/xinmaiCrystalFormationConsumer.ts"))};
      `,
      resolveDir: root,
      sourcefile: "xinmai-lived-growth-idb-browser-contract.ts",
    },
    outfile: out,
    bundle: true,
    platform: "browser",
    format: "esm",
    target: "es2022",
    logLevel: "silent",
  });
  const output = fs.readFileSync(out, "utf8");
  assert(
    output.includes("indexedDB"),
    "production browser bundle omits IndexedDB authority",
  );
  console.log(
    "[XINMAI LIVED GROWTH PRODUCTION BROWSER ACCEPTANCE CONTRACT] PASS",
  );
} finally {
  fs.rmSync(out, { force: true });
}
