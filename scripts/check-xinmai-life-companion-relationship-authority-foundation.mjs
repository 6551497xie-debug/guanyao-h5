import { build } from "esbuild";
import { mkdtempSync, readFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { resolve } from "node:path";

const read = (path) => readFileSync(path, "utf8");
const assert = (condition, message) => {
  if (!condition) {
    throw new Error(`[life-companion-relationship-foundation] ${message}`);
  }
};

const types = read("src/types/xinmaiLifeCompanionRelationshipCanonical.ts");
const store = read("src/services/xinmaiLifeCompanionRelationshipCanonicalStore.ts");
const validator = read("src/services/xinmaiLifeCompanionRelationshipEvidenceValidator.ts");
const controller = read("src/services/xinmaiLifeCompanionRelationshipAuthorityController.ts");
const recovery = read("src/services/xinmaiLifeCompanionCanonicalRecoveryAdapter.ts");
const policy = read("src/services/xinmaiLifeCompanionCanonicalMutationPolicy.ts");
const packageJson = JSON.parse(read("package.json"));

for (const marker of [
  '"xinmai-life-companion-canonical"',
  '"life-companion-relationship"',
  '"life-companion-command-fence"',
  '"identityKey"',
  '"firstEncounterReceiptReferenceId"',
  '"outcomeReferenceId"',
  '"relationshipId"',
]) {
  assert(types.includes(marker) || store.includes(marker), `missing ${marker}`);
}
assert(
  (types.match(/"life-companion-[a-z-]+" as const/g) ?? []).length === 2,
  "foundation creates more than two canonical Stores",
);
for (const forbidden of [
  "deleteObjectStore",
  "deleteIndex",
  "localStorage",
  "sessionStorage",
]) {
  assert(!store.includes(forbidden), `canonical Store contains ${forbidden}`);
  assert(!controller.includes(forbidden), `controller contains ${forbidden}`);
}
assert(
  policy.includes('"ENABLED" as "ENABLED" | "SAFE_WITHHELD"') &&
    policy.includes('XINMAI_LIFE_COMPANION_RELATIONSHIP_NEW_MUTATION') &&
    policy.includes("createsRealityIntent: false") &&
    policy.includes("writesLifeWhisper: false") &&
    policy.includes("writesNaming: false"),
  "Phase 2 relationship-only mutation policy is incomplete",
);
assert(
  controller.includes("commitXinmaiLifeCompanionCanonicalRelationship") &&
    controller.includes('type !== "CONFIRM_COMPANIONSHIP"') &&
    controller.includes('"MUTATION_POLICY_SAFE_WITHHELD"') &&
    !controller.includes("localStorage") &&
    !controller.includes("sessionStorage"),
  "Phase 2 relationship Controller contract is incomplete",
);
for (const boundary of [
  "noIdentityAsRelationship",
  "noNamingAsRelationship",
  "noLifeWhisperAsRelationship",
  "noRealityIntentAsRelationship",
  "noBackfill",
  "noCurrentProtocolReinterpretation",
  "corruptEvidenceFailsClosed",
]) {
  assert(recovery.includes(`${boundary}: true`), `missing recovery boundary ${boundary}`);
}
assert(
  validator.includes("hasExactKeys") &&
    validator.includes('crypto.subtle.digest("SHA-256"') &&
    validator.includes("validateXinmaiLifeCompanionRelationshipEvidence") &&
    validator.includes("validateXinmaiLifeCompanionCommandFenceBinding") &&
    validator.includes("createXinmaiLifeCompanionOutcomeReferenceId"),
  "exact schema/digest validator is incomplete",
);
const genesisConsumer = read("src/pages/GenesisProductionExperiencePage.tsx");
assert(
  genesisConsumer.includes("XinmaiLifeCompanionRelationshipActivationSurface") &&
    genesisConsumer.includes('data-life-whisper-entry="DEFERRED"') &&
    genesisConsumer.includes('data-relationship-naming-entry="DEFERRED"') &&
    genesisConsumer.includes('data-reality-entry="DEFERRED"'),
  "formal Genesis consumer is not relationship-only",
);
for (const consumer of ["src/pages/LaunchLab.tsx", "src/pages/RealityProductionRouteEntry.tsx"]) {
  const source = read(consumer);
  assert(
    !source.includes("xinmaiLifeCompanionRelationshipAuthorityController") &&
      !source.includes("xinmaiLifeCompanionCanonicalRecoveryAdapter") &&
      !source.includes("xinmaiLifeCompanionRelationshipCanonicalStore"),
    `unexpected relationship Authority consumer detected in ${consumer}`,
  );
}
assert(
  packageJson.scripts["check:xinmai-life-companion-relationship-authority-foundation"] ===
    "node scripts/check-xinmai-life-companion-relationship-authority-foundation.mjs",
  "foundation Gate is not registered",
);

const clone = (value) => JSON.parse(JSON.stringify(value));
const createState = () => ({ version: 0, mode: "NORMAL", stores: new Map() });

class FakeRequest {
  constructor(transaction, action) {
    this.result = undefined;
    this.error = null;
    this.onsuccess = null;
    this.onerror = null;
    transaction.pending += 1;
    queueMicrotask(() => {
      if (transaction.aborted) return;
      try {
        this.result = action();
        this.onsuccess?.({ target: this });
      } catch (error) {
        this.error = error;
        let prevented = false;
        this.onerror?.({
          target: this,
          preventDefault() { prevented = true; },
        });
        if (!prevented) transaction.abort();
      } finally {
        transaction.pending -= 1;
        transaction.completeWhenReady();
      }
    });
  }
}

class FakeIndex {
  constructor(transaction, storeValue, indexValue) {
    this.transaction = transaction;
    this.storeValue = storeValue;
    this.indexValue = indexValue;
  }
  get(value) {
    return new FakeRequest(this.transaction, () =>
      [...this.storeValue.records.values()].find(
        (record) => record[this.indexValue.keyPath] === value,
      ),
    );
  }
}

class FakeObjectStore {
  constructor(transaction, storeValue) {
    this.transaction = transaction;
    this.storeValue = storeValue;
  }
  createIndex(name, keyPath, options = {}) {
    this.storeValue.indexes.set(name, { keyPath, unique: options.unique === true });
    return {};
  }
  index(name) {
    const value = this.storeValue.indexes.get(name);
    if (!value) throw new Error(`missing index ${name}`);
    return new FakeIndex(this.transaction, this.storeValue, value);
  }
  get(key) {
    return new FakeRequest(this.transaction, () => this.storeValue.records.get(key));
  }
  add(value) {
    return new FakeRequest(this.transaction, () => {
      if (this.transaction.state.mode === "QUOTA_WRITE") {
        throw new DOMException("quota", "QuotaExceededError");
      }
      const key = value[this.storeValue.keyPath];
      if (this.storeValue.records.has(key)) throw new Error("ConstraintError");
      for (const index of this.storeValue.indexes.values()) {
        if (!index.unique) continue;
        const duplicate = [...this.storeValue.records.values()].some(
          (record) => record[index.keyPath] === value[index.keyPath],
        );
        if (duplicate) throw new Error("ConstraintError");
      }
      this.storeValue.records.set(key, clone(value));
      return key;
    });
  }
  count() {
    return new FakeRequest(this.transaction, () => this.storeValue.records.size);
  }
}

class FakeTransaction {
  constructor(state, names) {
    this.state = state;
    this.names = names;
    this.pending = 0;
    this.aborted = false;
    this.settled = false;
    this.oncomplete = null;
    this.onabort = null;
    this.onerror = null;
    this.abortSnapshot = state.mode === "ABORT_TRANSACTION"
      ? new Map([...state.stores].map(([name, store]) => [
          name,
          new Map([...store.records].map(([key, value]) => [key, clone(value)])),
        ]))
      : null;
    queueMicrotask(() => this.completeWhenReady());
  }
  objectStore(name) {
    if (!this.names.includes(name) || !this.state.stores.has(name)) {
      throw new Error(`missing Store ${name}`);
    }
    return new FakeObjectStore(this, this.state.stores.get(name));
  }
  abort() {
    if (this.settled) return;
    this.aborted = true;
    this.settled = true;
    queueMicrotask(() => this.onabort?.());
  }
  completeWhenReady() {
    if (this.settled || this.pending !== 0) return;
    this.settled = true;
    queueMicrotask(() => {
      if (this.state.mode === "ABORT_TRANSACTION") {
        for (const [name, records] of this.abortSnapshot ?? []) {
          this.state.stores.get(name).records = records;
        }
        this.onabort?.();
      }
      else this.oncomplete?.();
    });
  }
}

class FakeDatabase {
  constructor(state) {
    this.state = state;
    this.onversionchange = null;
    this.objectStoreNames = { contains: (name) => this.state.stores.has(name) };
  }
  createObjectStore(name, options) {
    const value = { keyPath: options.keyPath, indexes: new Map(), records: new Map() };
    this.state.stores.set(name, value);
    return new FakeObjectStore({ pending: 0, completeWhenReady() {} }, value);
  }
  transaction(names) {
    return new FakeTransaction(this.state, Array.isArray(names) ? names : [names]);
  }
  close() {}
}

const installIndexedDb = (state) => {
  globalThis.indexedDB = {
    open(_name, version) {
      const request = {
        result: null,
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
        const database = new FakeDatabase(state);
        request.result = database;
        if (version > state.version) {
          request.onupgradeneeded?.();
          state.version = version;
        }
        request.onsuccess?.();
      });
      return request;
    },
  };
};

const temp = mkdtempSync(resolve(tmpdir(), "xinmai-life-companion-foundation-"));
const runtimePath = resolve(temp, "runtime.mjs");
await build({
  stdin: {
    contents: `
      export * from ${JSON.stringify(resolve("src/services/xinmaiLifeCompanionRelationshipAuthorityController.ts"))};
      export * from ${JSON.stringify(resolve("src/services/xinmaiLifeCompanionRelationshipCanonicalStore.ts"))};
      export * from ${JSON.stringify(resolve("src/services/xinmaiLifeCompanionRelationshipEvidenceValidator.ts"))};
      export * from ${JSON.stringify(resolve("src/services/xinmaiLifeCompanionCanonicalRecoveryAdapter.ts"))};
      export * from ${JSON.stringify(resolve("src/types/xinmaiLifeCompanionRelationshipCanonical.ts"))};
    `,
    resolveDir: process.cwd(),
    sourcefile: "life-companion-foundation-gate.ts",
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

const controllerState = createState();
installIndexedDb(controllerState);
const controllerCommit = await runtime.executeXinmaiLifeCompanionRelationshipCommand({
  type: "CONFIRM_COMPANIONSHIP",
  identityReferences: {
    sourceReferenceId: "source:controller",
    starBeastIdentityReferenceId: "beast:controller",
    mansionCoordinateReferenceId: "mansion:controller",
  },
  responseCycleReferenceId: "cycle:controller",
  visualOutcomeReferenceId: "outcome:controller",
  visualOutcome: "MOTION_RESPONSE",
});
assert(controllerCommit.status === "COMMITTED", "enabled Controller did not commit");
const controllerCounts = await runtime.inspectXinmaiLifeCompanionCanonicalStoreCounts();
assert(controllerCounts.relationships === 1 && controllerCounts.fences === 1, "Controller did not write exactly one aggregate/fence");

const state = createState();
installIndexedDb(state);
const countsBefore = await runtime.inspectXinmaiLifeCompanionCanonicalStoreCounts();
assert(countsBefore.status === "READY" && countsBefore.relationships === 0 && countsBefore.fences === 0, "fresh DB is not empty");
assert(state.version === 1, "physical DB version is not 1");
assert([...state.stores.keys()].sort().join("|") === "life-companion-command-fence|life-companion-relationship", "DB does not have exactly two Stores");
assert(state.stores.get("life-companion-relationship").indexes.get("identityKey").unique === true, "identityKey is not unique");
assert(state.stores.get("life-companion-command-fence").indexes.get("outcomeReferenceId").unique === true, "outcomeReferenceId is not unique");

const identity = Object.freeze({
  sourceReferenceId: "source:one",
  starBeastIdentityReferenceId: "beast:one",
  mansionCoordinateReferenceId: "mansion:one",
});
const identityKey = runtime.createXinmaiLifeCompanionIdentityKey(identity);
const relationshipId = await runtime.createXinmaiLifeCompanionRelationshipId(identity);
assert(relationshipId !== null, "deterministic relationship ID was not created");
const receiptEvidence = {
  relationshipId,
  identityKey,
  identityReferences: identity,
  responseCycleReferenceId: "cycle:one",
  visualOutcomeReferenceId: "outcome:one",
  visualOutcome: "MOTION_RESPONSE",
};
const evidenceDigest = await runtime.digestXinmaiLifeCompanionEvidence(receiptEvidence);
const commandReferenceId =
  runtime.createXinmaiLifeCompanionCommandReferenceId(evidenceDigest);
const relationshipBase = {
  schemaVersion: runtime.XINMAI_LIFE_COMPANION_RELATIONSHIP_SCHEMA_VERSION,
  protocolRevision: runtime.XINMAI_LIFE_COMPANION_RELATIONSHIP_PROTOCOL_REVISION,
  relationshipId,
  identityKey,
  identityReferences: identity,
  state: "COMPANIONSHIP_CONFIRMED",
  firstEncounterReceiptReferenceId:
    runtime.createXinmaiLifeCompanionFirstEncounterReceiptReferenceId(
      evidenceDigest,
    ),
  revision: 1,
};
const relationshipDigest = await runtime.digestXinmaiLifeCompanionEvidence({
  schemaVersion: relationshipBase.schemaVersion,
  protocolRevision: relationshipBase.protocolRevision,
  relationshipId: relationshipBase.relationshipId,
  identityKey: relationshipBase.identityKey,
  firstEncounterReceiptReferenceId:
    relationshipBase.firstEncounterReceiptReferenceId,
  firstEncounterEvidenceDigest: evidenceDigest,
  state: relationshipBase.state,
  revision: relationshipBase.revision,
});
const relationship = Object.freeze({
  ...relationshipBase,
  firstEncounterReceipt: Object.freeze({
    schemaVersion: runtime.XINMAI_LIFE_COMPANION_FIRST_ENCOUNTER_RECEIPT_SCHEMA_VERSION,
    receiptReferenceId: relationshipBase.firstEncounterReceiptReferenceId,
    ...receiptEvidence,
    evidenceDigest,
    observedAt: "2026-08-13T00:00:00.000Z",
  }),
  relationshipDigest,
  createdAt: "2026-08-13T00:00:00.000Z",
  updatedAt: "2026-08-13T00:00:00.000Z",
  provenance: Object.freeze({
    identityAuthority: "EXISTING_RECOGNIZED_LIFE",
    relationshipAuthority: "XINMAI_LIFE_COMPANION_RELATIONSHIP_CONTROLLER",
    explicitCompanionshipConfirmationRequired: true,
    lifeWhisperRequired: false,
    namingRequired: false,
    realityRequired: false,
    noRawWhisperPersistence: true,
    noPrivateFreeTextPersistence: true,
    noBackfill: true,
  }),
});
const commandDigest =
  await runtime.digestXinmaiLifeCompanionRelationshipCommand(
    commandReferenceId,
    relationship,
  );
assert(commandDigest !== null, "deterministic command digest was not created");
const fence = Object.freeze({
  schemaVersion: runtime.XINMAI_LIFE_COMPANION_COMMAND_FENCE_SCHEMA_VERSION,
  commandReferenceId,
  outcomeReferenceId:
    runtime.createXinmaiLifeCompanionOutcomeReferenceId(commandDigest),
  relationshipId,
  identityKey,
  commandDigest,
  outcome: "COMPANIONSHIP_CONFIRMED",
  committedAt: "2026-08-13T00:00:00.000Z",
});
assert(await runtime.validateXinmaiLifeCompanionRelationshipEvidence(relationship), "valid relationship evidence was rejected");
assert(await runtime.validateXinmaiLifeCompanionCommandFenceBinding(relationship, fence), "valid command fence binding was rejected");
assert(!runtime.isXinmaiLifeCompanionRelationshipAggregate({ ...relationship, rawWhisper: "private" }), "aggregate accepted an undeclared private field");
assert(!runtime.isXinmaiLifeCompanionRelationshipAggregate({ ...relationship, provenance: { ...relationship.provenance, privateText: "private" } }), "provenance accepted an undeclared private field");
assert(!runtime.isXinmaiLifeCompanionCommandFence({ ...fence, privateText: "private" }), "command fence accepted an undeclared field");
assert(!(await runtime.validateXinmaiLifeCompanionCommandFenceBinding(relationship, { ...fence, commandDigest: "tampered" })), "tampered command digest was accepted");
const committed = await runtime.commitXinmaiLifeCompanionCanonicalRelationship(relationship, fence);
assert(committed.status === "COMMITTED", "foundation transaction did not commit atomically");
const duplicate = await runtime.commitXinmaiLifeCompanionCanonicalRelationship(relationship, fence);
assert(duplicate.status === "ALREADY_COMMITTED", "same command is not idempotent");
const countsAfter = await runtime.inspectXinmaiLifeCompanionCanonicalStoreCounts();
assert(countsAfter.relationships === 1 && countsAfter.fences === 1, "duplicate command created duplicate records");
const recovered = await runtime.recoverXinmaiLifeCompanionCanonicalRelationship(identity);
assert(recovered.status === "READY", "canonical relationship did not recover");

const conflictingCommandDigest =
  await runtime.digestXinmaiLifeCompanionRelationshipCommand(
    "command:two",
    relationship,
  );
assert(conflictingCommandDigest !== null, "second deterministic command digest was not created");
const conflictingFence = Object.freeze({
  ...fence,
  commandReferenceId: "command:two",
  commandDigest: conflictingCommandDigest,
  outcomeReferenceId:
    runtime.createXinmaiLifeCompanionOutcomeReferenceId(
      conflictingCommandDigest,
    ),
});
const conflict = await runtime.commitXinmaiLifeCompanionCanonicalRelationship(relationship, conflictingFence);
assert(conflict.status === "CONFLICT", "second command did not fail closed");

state.stores.get("life-companion-relationship").records.get(relationshipId).relationshipDigest = "corrupt";
const corrupted = await runtime.recoverXinmaiLifeCompanionCanonicalRelationship(identity);
assert(corrupted.status === "BLOCKED" && corrupted.reason === "RELATIONSHIP_CORRUPTED", "corrupt evidence did not fail closed");

const blockedState = createState();
blockedState.mode = "BLOCKED";
installIndexedDb(blockedState);
const blocked = await runtime.readXinmaiLifeCompanionCanonicalRelationship(identity);
assert(blocked.status === "UNAVAILABLE" && blocked.reason === "STORAGE_BLOCKED", "blocked open is not typed");

delete globalThis.indexedDB;
const unavailable = await runtime.readXinmaiLifeCompanionCanonicalRelationship(identity);
assert(unavailable.status === "UNAVAILABLE" && unavailable.reason === "STORAGE_UNAVAILABLE", "unavailable storage is not typed");

state.mode = "ABORT_TRANSACTION";
installIndexedDb(state);
const aborted = await runtime.readXinmaiLifeCompanionCanonicalRelationship(identity);
assert(aborted.status === "UNAVAILABLE" && aborted.reason === "TRANSACTION_ABORTED", "aborted transaction is not typed");
state.mode = "NORMAL";

const quotaState = createState();
installIndexedDb(quotaState);
await runtime.inspectXinmaiLifeCompanionCanonicalStoreCounts();
quotaState.mode = "QUOTA_WRITE";
const quota = await runtime.commitXinmaiLifeCompanionCanonicalRelationship(relationship, fence);
assert(quota.status === "UNAVAILABLE" && quota.reason === "STORAGE_QUOTA_EXCEEDED", "quota failure is not typed");
quotaState.mode = "NORMAL";
const quotaCounts = await runtime.inspectXinmaiLifeCompanionCanonicalStoreCounts();
assert(quotaCounts.relationships === 0 && quotaCounts.fences === 0, "quota failure left a partial write");

const abortWriteState = createState();
installIndexedDb(abortWriteState);
await runtime.inspectXinmaiLifeCompanionCanonicalStoreCounts();
abortWriteState.mode = "ABORT_TRANSACTION";
const abortedWrite = await runtime.commitXinmaiLifeCompanionCanonicalRelationship(relationship, fence);
assert(abortedWrite.status === "UNAVAILABLE" && abortedWrite.reason === "TRANSACTION_ABORTED", "write transaction abort was reported as committed");
abortWriteState.mode = "NORMAL";
const abortWriteCounts = await runtime.inspectXinmaiLifeCompanionCanonicalStoreCounts();
assert(abortWriteCounts.relationships === 0 && abortWriteCounts.fences === 0, "aborted write left a partial record");

const concurrentSameState = createState();
installIndexedDb(concurrentSameState);
await runtime.inspectXinmaiLifeCompanionCanonicalStoreCounts();
const concurrentSame = await Promise.all([
  runtime.commitXinmaiLifeCompanionCanonicalRelationship(relationship, fence),
  runtime.commitXinmaiLifeCompanionCanonicalRelationship(relationship, fence),
]);
assert(concurrentSame.filter((entry) => entry.status === "COMMITTED").length === 1, "same-command race did not produce one commit");
assert(concurrentSame.every((entry) => entry.status === "COMMITTED" || entry.status === "ALREADY_COMMITTED" || entry.status === "CONFLICT"), "same-command race produced an invalid outcome");
const concurrentSameCounts = await runtime.inspectXinmaiLifeCompanionCanonicalStoreCounts();
assert(concurrentSameCounts.relationships === 1 && concurrentSameCounts.fences === 1, "same-command race created duplicate records");

const concurrentDifferentState = createState();
installIndexedDb(concurrentDifferentState);
await runtime.inspectXinmaiLifeCompanionCanonicalStoreCounts();
const concurrentDifferent = await Promise.all([
  runtime.commitXinmaiLifeCompanionCanonicalRelationship(relationship, fence),
  runtime.commitXinmaiLifeCompanionCanonicalRelationship(relationship, conflictingFence),
]);
assert(concurrentDifferent.filter((entry) => entry.status === "COMMITTED").length === 1, "different-command race did not produce one commit");
assert(concurrentDifferent.filter((entry) => entry.status === "CONFLICT").length === 1, "different-command race did not fence the loser");
const concurrentDifferentCounts = await runtime.inspectXinmaiLifeCompanionCanonicalStoreCounts();
assert(concurrentDifferentCounts.relationships === 1 && concurrentDifferentCounts.fences === 1, "different-command race created duplicate records");

console.log("[XINMAI LIFE COMPANION RELATIONSHIP AUTHORITY FOUNDATION] PASS");
