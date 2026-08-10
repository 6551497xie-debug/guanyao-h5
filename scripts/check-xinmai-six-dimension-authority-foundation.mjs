import { build } from "esbuild";
import { mkdtempSync, readFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { resolve } from "node:path";

const root = resolve(import.meta.dirname, "..");
const read = (path) => readFileSync(resolve(root, path), "utf8");
const assert = (condition, message) => {
  if (!condition) {
    throw new Error(`[six-dimension-foundation] ${message}`);
  }
};

const types = read("src/types/xinmaiSixDimensionObservation.ts");
const storeTypes = read("src/types/xinmaiLivedGrowthTransactionalStore.ts");
const store = read("src/services/xinmaiLivedGrowthTransactionalStore.ts");
const policy = read("src/services/xinmaiSixDimensionObservationRuntimePolicy.ts");
const controller = read("src/services/xinmaiSixDimensionObservationAuthorityController.ts");
const recovery = read("src/services/xinmaiSixDimensionObservationRecoveryAdapter.ts");
const validator = read("src/services/xinmaiSixDimensionObservationEvidenceValidator.ts");
const packageJson = JSON.parse(read("package.json"));

assert(
  storeTypes.includes("XINMAI_LIVED_GROWTH_DATABASE_VERSION = 3"),
  "IndexedDB physical version is not 3",
);

const exactNewStores = [
  "six-dimension-observation-set",
  "six-dimension-completion-receipt",
  "six-dimension-command-fence",
];
for (const name of exactNewStores) {
  assert(types.includes(`"${name}"`), `missing Store ${name}`);
  assert(store.includes(name.replaceAll("-", "_").toUpperCase()) || store.includes("XINMAI_SIX_DIMENSION"), `Store ${name} is not consumed`);
}
assert(
  (types.match(/six-dimension-[a-z-]+" as const/g) ?? []).length === 3,
  "foundation defines a fourth six-dimension Store",
);

for (const marker of [
  '"canonicalLineageKey"',
  '"identityKey"',
  '"encounterCycleId"',
  '"observationSetId"',
  '"evidenceDigest"',
  '"outcomeReferenceId"',
]) {
  assert(store.includes(marker), `missing frozen Store/index marker ${marker}`);
}
for (const forbidden of [
  "deleteObjectStore",
  "deleteIndex",
  "localStorage.setItem",
  "sessionStorage.setItem",
]) {
  assert(!store.includes(forbidden), `Store contains forbidden ${forbidden}`);
  assert(!controller.includes(forbidden), `Controller contains forbidden ${forbidden}`);
}
assert(
  !/\.put\(|\.add\(|\.delete\(/.test(controller),
  "Phase 1 Controller contains a persistence mutation",
);
assert(
  policy.includes('"SAFE_WITHHELD" as const') &&
    policy.includes("createsObservationSet: false") &&
    policy.includes("writesCompletionReceipt: false") &&
    policy.includes("writesCommandFence: false") &&
    policy.includes("createsChoiceV3: false"),
  "zero-write policy is not frozen",
);
assert(
  controller.includes('status: "SAFE_WITHHELD"') &&
    controller.includes('code: "MUTATION_POLICY_SAFE_WITHHELD"') &&
    controller.includes('retryability: "NOT_RETRYABLE"'),
  "Controller does not return the frozen non-retryable outcome",
);
assert(
  !controller.includes("readXinmaiSixDimensionAuthoritySnapshot") &&
    !controller.includes("xinmaiLivedGrowthTransactionalStore"),
  "withheld Controller touches the transactional Store",
);
assert(
  recovery.includes("noBackfill: true") &&
    recovery.includes("noInferredCompletion: true") &&
    recovery.includes("noCurrentRevisionReinterpretation: true"),
  "recovery boundary does not fail closed",
);
for (const marker of [
  "PENDING",
  "OBSERVED",
  "SKIPPED",
  "DECLINED",
  "UNAVAILABLE",
  "IMPACT_RECOGNIZED_PRESENT",
  "IMPACT_RECOGNIZED_ABSENT",
  "IMPACT_RECOGNIZED_UNCERTAIN",
  "noRawWhisperPersistence",
  "noPrivateFreeTextPersistence",
]) {
  assert(types.includes(marker), `typed contract missing ${marker}`);
}
assert(
  validator.includes("hasExactKeys") &&
    validator.includes("validateSixDimensionSetReceiptPair") &&
    validator.includes('crypto.subtle.digest(\n    "SHA-256"'),
  "fail-closed schema/digest validation is incomplete",
);

for (const forbiddenPath of [
  "src/pages/GravityPage.tsx",
  "src/pages/GravityProductionRouteEntry.tsx",
  "src/components/GravityProductionSurfaceHost.tsx",
  "src/types/xinmaiChoiceActionIntention.ts",
  "src/services/xinmaiChoiceActionIntentionController.ts",
]) {
  const source = read(forbiddenPath);
  assert(
    !source.includes("xinmaiSixDimensionObservation"),
    `Phase 1 consumer wiring detected in ${forbiddenPath}`,
  );
  assert(
    !source.includes("XINMAI_CHOICE_ACTION_INTENTION_V3"),
    `Choice V3 detected in ${forbiddenPath}`,
  );
}

assert(
  packageJson.scripts["check:xinmai-six-dimension-authority-foundation"] ===
    "node scripts/check-xinmai-six-dimension-authority-foundation.mjs",
  "foundation gate is not registered",
);
assert(
  packageJson.scripts["check:xinmai-lived-growth-authority"].includes(
    "npm run check:xinmai-six-dimension-authority-foundation",
  ),
  "foundation gate is absent from XINMAI authority gates",
);
assert(
  packageJson.scripts["postcheck:release"].includes(
    "npm run check:xinmai-six-dimension-authority-foundation",
  ),
  "foundation gate is absent from release gates",
);

const cloneStores = (stores) =>
  new Map(
    [...stores].map(([name, storeValue]) => [
      name,
      {
        keyPath: storeValue.keyPath,
        indexes: new Map(
          [...storeValue.indexes].map(([indexName, index]) => [
            indexName,
            { ...index },
          ]),
        ),
        records: new Map(storeValue.records),
      },
    ]),
  );

const createState = (version = 0, stores = new Map()) => ({
  version,
  stores,
  mode: "NORMAL",
});

class FakeObjectStore {
  constructor(transaction, storeValue) {
    this.transaction = transaction;
    this.storeValue = storeValue;
  }
  createIndex(name, keyPath, options = {}) {
    this.storeValue.indexes.set(name, {
      keyPath,
      unique: options.unique === true,
    });
    return {};
  }
  getAll() {
    const request = { result: undefined, onsuccess: null, onerror: null };
    this.transaction.pending += 1;
    queueMicrotask(() => {
      request.result = [...this.storeValue.records.values()];
      request.onsuccess?.();
      this.transaction.pending -= 1;
      this.transaction.completeWhenReady();
    });
    return request;
  }
}

class FakeTransaction {
  constructor(state, names, mode) {
    this.state = state;
    this.names = names;
    this.mode = mode;
    this.pending = 0;
    this.oncomplete = null;
    this.onabort = null;
    this.onerror = null;
    this.error = null;
    queueMicrotask(() => this.completeWhenReady());
  }
  objectStore(name) {
    if (!this.names.includes(name) || !this.state.stores.has(name)) {
      throw new Error(`missing object Store ${name}`);
    }
    return new FakeObjectStore(this, this.state.stores.get(name));
  }
  completeWhenReady() {
    if (this.pending !== 0 || this.settled) return;
    this.settled = true;
    queueMicrotask(() => {
      if (this.state.mode === "ABORT_READ") this.onabort?.();
      else this.oncomplete?.();
    });
  }
}

class FakeDatabase {
  constructor(state) {
    this.state = state;
    this.onversionchange = null;
    this.objectStoreNames = {
      contains: (name) => this.state.stores.has(name),
    };
  }
  createObjectStore(name, options) {
    if (this.state.stores.has(name)) throw new Error(`duplicate Store ${name}`);
    const storeValue = {
      keyPath: options.keyPath,
      indexes: new Map(),
      records: new Map(),
    };
    this.state.stores.set(name, storeValue);
    return new FakeObjectStore({ pending: 0, completeWhenReady() {} }, storeValue);
  }
  transaction(names, mode) {
    const requested = Array.isArray(names) ? names : [names];
    return new FakeTransaction(this.state, requested, mode);
  }
  close() {}
}

const installFakeIndexedDb = (initialState) => {
  const state = initialState;
  globalThis.indexedDB = {
    open(_name, requestedVersion) {
      const request = {
        result: null,
        transaction: null,
        onupgradeneeded: null,
        onblocked: null,
        onerror: null,
        onsuccess: null,
      };
      queueMicrotask(() => {
        if (state.mode === "BLOCKED") {
          request.onblocked?.();
          return;
        }
        if (requestedVersion < state.version) {
          request.onerror?.();
          return;
        }
        if (requestedVersion > state.version) {
          const upgraded = createState(state.version, cloneStores(state.stores));
          const database = new FakeDatabase(upgraded);
          request.result = database;
          request.transaction = { onabort: null };
          try {
            request.onupgradeneeded?.();
          } catch {
            request.onerror?.();
            return;
          }
          if (state.mode === "ABORT_UPGRADE") {
            request.onerror?.();
            return;
          }
          state.version = requestedVersion;
          state.stores = upgraded.stores;
        }
        request.result = new FakeDatabase(state);
        request.onsuccess?.();
      });
      return request;
    },
  };
  return state;
};

const createLegacyV2State = () => {
  const names = [
    "canonical-growth-envelope",
    "growth-migration-meta",
    "growth-eligibility-index",
    "growth-formation-index",
    "growth-crystal-projection",
    "gravity-observation-continuity",
  ];
  const stores = new Map(
    names.map((name) => [
      name,
      {
        keyPath: "id",
        indexes: new Map(),
        records: new Map([["legacy-sentinel", { id: "legacy-sentinel", store: name }]]),
      },
    ]),
  );
  return createState(2, stores);
};

const temp = mkdtempSync(resolve(tmpdir(), "xinmai-six-dimension-foundation-"));
const runtimePath = resolve(temp, "foundation.mjs");
await build({
  stdin: {
    contents: `
      export * from ${JSON.stringify(resolve(root, "src/services/xinmaiSixDimensionObservationAuthorityController.ts"))};
      export * from ${JSON.stringify(resolve(root, "src/services/xinmaiSixDimensionObservationEvidenceValidator.ts"))};
      export * from ${JSON.stringify(resolve(root, "src/services/xinmaiSixDimensionObservationRecoveryAdapter.ts"))};
      export * from ${JSON.stringify(resolve(root, "src/services/xinmaiLivedGrowthTransactionalStore.ts"))};
    `,
    resolveDir: root,
    sourcefile: "xinmai-six-dimension-foundation-gate.ts",
    loader: "ts",
  },
  outfile: runtimePath,
  bundle: true,
  platform: "node",
  format: "esm",
  target: "node20",
  logLevel: "silent",
});
const runtime = await import(`file://${runtimePath}?t=${Date.now()}`);

const withheld = await runtime.executeXinmaiSixDimensionObservationCommand({
  type: "SKIP_DIMENSION",
  commandReferenceId: "gate-command",
  observationSetId: "gate-set",
  dimensionId: "body",
  expectedSetRevision: 1,
  expectedItemRevision: 0,
});
assert(
  withheld.status === "SAFE_WITHHELD" &&
    withheld.cause.code === "MUTATION_POLICY_SAFE_WITHHELD" &&
    withheld.cause.retryability === "NOT_RETRYABLE",
  "mutation policy runtime behavior drift",
);

const identityKey = runtime.createSixDimensionIdentityKey("source", "star", "mansion");
const lineageA = runtime.createSixDimensionCanonicalLineageKey(identityKey, "encounter", "gravity", "seed", "catalog");
const lineageB = runtime.createSixDimensionCanonicalLineageKey(identityKey, "encounter", "gravity", "seed-2", "catalog");
assert(lineageA === runtime.createSixDimensionCanonicalLineageKey(identityKey, "encounter", "gravity", "seed", "catalog"), "lineage ID is not deterministic");
assert(lineageA !== lineageB, "lineage ID does not fence pressure provenance");
const digestA = await runtime.sha256CanonicalValue({ b: 2, a: 1 });
const digestB = await runtime.sha256CanonicalValue({ a: 1, b: 2 });
assert(digestA === digestB && digestA.length === 64, "canonical SHA-256 is not deterministic");

const fresh = installFakeIndexedDb(createState());
const freshRead = await runtime.readXinmaiSixDimensionAuthoritySnapshot();
assert(freshRead.status === "FOUND", "fresh DB did not open");
assert(fresh.version === 3, "fresh DB version is not 3");
assert(exactNewStores.every((name) => fresh.stores.has(name)), "fresh DB missing a frozen Store");
assert(exactNewStores.every((name) => fresh.stores.get(name).records.size === 0), "fresh DB created six-dimension records");
assert(freshRead.snapshot.observationSets.length === 0 && freshRead.snapshot.completionReceipts.length === 0 && freshRead.snapshot.commandFences.length === 0, "fresh Authority snapshot is not zero-write");

const legacy = installFakeIndexedDb(createLegacyV2State());
const legacyBefore = new Map([...legacy.stores].map(([name, value]) => [name, JSON.stringify([...value.records])]));
const upgradedRead = await runtime.readXinmaiSixDimensionAuthoritySnapshot();
assert(upgradedRead.status === "FOUND" && legacy.version === 3, "v2 to v3 upgrade failed");
for (const [name, records] of legacyBefore) {
  assert(legacy.stores.has(name), `legacy Store removed: ${name}`);
  assert(JSON.stringify([...legacy.stores.get(name).records]) === records, `legacy records rewritten: ${name}`);
}
assert(exactNewStores.every((name) => legacy.stores.has(name) && legacy.stores.get(name).records.size === 0), "v2 upgrade did not preserve zero-write policy");

const blocked = installFakeIndexedDb(createLegacyV2State());
blocked.mode = "BLOCKED";
const blockedRead = await runtime.readXinmaiSixDimensionAuthoritySnapshot();
assert(blockedRead.status === "SAFE_WITHHELD" && blockedRead.cause.code === "TRANSACTION_OPEN_BLOCKED", "blocked upgrade typed outcome mismatch");

const abortedUpgrade = installFakeIndexedDb(createLegacyV2State());
const beforeAbortStores = [...abortedUpgrade.stores.keys()];
abortedUpgrade.mode = "ABORT_UPGRADE";
const abortedUpgradeRead = await runtime.readXinmaiSixDimensionAuthoritySnapshot();
assert(abortedUpgradeRead.status === "UNAVAILABLE", "aborted upgrade did not fail closed");
assert(abortedUpgrade.version === 2 && JSON.stringify([...abortedUpgrade.stores.keys()]) === JSON.stringify(beforeAbortStores), "aborted upgrade left a half migration");

const abortedRead = installFakeIndexedDb(createState());
await runtime.readXinmaiSixDimensionAuthoritySnapshot();
abortedRead.mode = "ABORT_READ";
const aborted = await runtime.readXinmaiSixDimensionAuthoritySnapshot();
assert(aborted.status === "SAFE_WITHHELD" && aborted.cause.code === "TRANSACTION_ABORTED", "aborted read typed outcome mismatch");

const corrupt = installFakeIndexedDb(createState());
await runtime.readXinmaiSixDimensionAuthoritySnapshot();
corrupt.stores.get("six-dimension-observation-set").records.set("corrupt", { schemaVersion: "UNKNOWN" });
const corruptRead = await runtime.readXinmaiSixDimensionAuthoritySnapshot();
assert(corruptRead.status === "CORRUPTED" && corruptRead.cause.code === "RECOVERY_CORRUPTED", "corruption did not fail closed");

for (const name of exactNewStores) {
  assert(fresh.stores.get(name).records.size === 0, `ordinary Foundation read wrote ${name}`);
}

console.log("[XINMAI SIX-DIMENSION AUTHORITY FOUNDATION] PASS");
