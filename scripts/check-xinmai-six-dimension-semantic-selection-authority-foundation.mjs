import { build } from "esbuild";
import { readFileSync } from "node:fs";

const read = (path) => readFileSync(path, "utf8");
const assert = (condition, message) => {
  if (!condition) {
    throw new Error(`[six-dimension-semantic-foundation] ${message}`);
  }
};

const types = read("src/types/xinmaiSixDimensionObservation.ts");
const choiceTypes = read("src/types/xinmaiChoiceActionIntention.ts");
const storeTypes = read("src/types/xinmaiLivedGrowthTransactionalStore.ts");
const store = read("src/services/xinmaiLivedGrowthTransactionalStore.ts");
const policy = read("src/services/xinmaiSixDimensionSemanticSelectionMutationPolicy.ts");
const foundation = read("src/services/xinmaiSixDimensionSemanticSelectionAuthorityFoundation.ts");
const validator = read("src/services/xinmaiSixDimensionSemanticSelectionEvidenceValidator.ts");
const recovery = read("src/services/xinmaiSixDimensionSemanticSelectionRecoveryAdapter.ts");
const choiceValidator = read("src/services/xinmaiChoiceSemanticBindingReadValidator.ts");
const activeController = read("src/services/xinmaiSixDimensionObservationAuthorityController.ts");
const activeHost = read("src/components/GravityProductionSurfaceHost.tsx");
const activePage = read("src/pages/GravityPage.tsx");
const packageJson = JSON.parse(read("package.json"));

assert(
  storeTypes.includes("XINMAI_LIVED_GROWTH_DATABASE_VERSION = 3"),
  "physical DB version changed",
);
assert(
  (types.match(/six-dimension-[a-z-]+\" as const/g) ?? []).length === 3,
  "six-dimension Store count is not exactly three",
);
assert(
  (store.match(/\.createIndex\(/g) ?? []).length === 14,
  "canonical DB index count is not exactly 14",
);
for (const forbidden of [
  "deleteObjectStore",
  "deleteIndex",
  "XINMAI_LIVED_GROWTH_DATABASE_VERSION = 4",
]) {
  assert(!store.includes(forbidden), `forbidden DB topology change: ${forbidden}`);
}

for (const marker of [
  "XINMAI_SIX_DIMENSION_PROTOCOL_2026_08_11_V3",
  "XINMAI_SIX_DIMENSION_SEMANTIC_GRAMMAR_2026_08_11_V1",
  "XINMAI_SIX_DIMENSION_OBSERVATION_SET_V3",
  "XINMAI_SIX_DIMENSION_COMPLETION_RECEIPT_V2",
  "CanonicalSixDimensionObservationItemV2",
  "CanonicalSixDimensionObservationItemV3",
  "CanonicalSixDimensionObservationSetRecord",
  "SixDimensionCompletionReceiptRecord",
]) {
  assert(types.includes(marker), `missing V2/V3 contract: ${marker}`);
}
for (const responseId of [
  "LOCATED", "UNLOCATED",
  "CLEAR", "MIXED", "UNCERTAIN",
  "SENTENCE", "FRAGMENT", "PRIVATE",
  "ADVANCE", "WITHDRAW", "PAUSE",
  "THEN", "NOW",
  "NEED", "VALUE",
]) {
  assert(types.includes(`\"${responseId}\"`), `missing bounded response ${responseId}`);
}
assert(
    choiceTypes.includes("XINMAI_CHOICE_ACTION_INTENTION_V4") &&
    choiceTypes.includes("XINMAI_CHOICE_FORMATION_SOURCE_SNAPSHOT_V3") &&
    choiceValidator.includes("choiceV4WriterEnabled: true"),
  "Choice V4 type/validator activation contract is incomplete",
);
assert(
  /XINMAI_SIX_DIMENSION_SEMANTIC_SELECTION_NEW_MUTATION:[\s\S]*?=\s*"(?:ENABLED|SAFE_WITHHELD)"/.test(policy) &&
    policy.includes("transactionWritesAllowed:") &&
    policy.includes("receiptV2CreationAllowed:") &&
    policy.includes("choiceV4CreationAllowed:"),
  "Phase 2 semantic mutation/counter policy is not explicitly frozen",
);
for (const activeConsumer of [activeController, activeHost, activePage]) {
  assert(
    !activeConsumer.includes("SemanticSelectionAuthorityFoundation"),
    "Phase 2 consumer depends on the zero-write foundation controller",
  );
}
assert(
  activeController.includes("ACKNOWLEDGE_SEMANTIC_SELECTION_V3") &&
    activeHost.includes("ACKNOWLEDGE_SEMANTIC_SELECTION_V3") &&
    activePage.includes("SixDimensionSemanticResponseId"),
  "Phase 2 product path is not wired to bounded semantic commands",
);
assert(
  !foundation.includes("transactXinmaiSixDimensionObservation") &&
    !foundation.includes("xinmaiLivedGrowthTransactionalStore") &&
    !/\.put\(|\.add\(|\.delete\(/.test(foundation),
  "foundation controller can reach persistence",
);
for (const marker of [
  "createSixDimensionSemanticSelectionDigest",
  "createSixDimensionSemanticSelectionReferenceId",
  "createSixDimensionSemanticSelectionAggregateDigest",
  "validateSixDimensionSemanticSelectionIntegrity",
]) {
  assert(validator.includes(marker), `missing deterministic helper ${marker}`);
}
for (const marker of [
  "LEGACY_GENERIC_ONLY",
  "SEMANTIC_SELECTION_NOT_RECORDED",
  "noBackfill: true",
  "noDefaultSelection: true",
  "noCurrentGrammarReinterpretation: true",
]) {
  assert(recovery.includes(marker), `legacy recovery boundary missing ${marker}`);
}

const bundle = await build({
  stdin: {
    contents: `
      export * from "./src/types/xinmaiSixDimensionObservation.ts";
      export * from "./src/services/xinmaiSixDimensionSemanticSelectionEvidenceValidator.ts";
      export * from "./src/services/xinmaiSixDimensionSemanticSelectionRecoveryAdapter.ts";
      export * from "./src/services/xinmaiSixDimensionSemanticSelectionAuthorityFoundation.ts";
      export * from "./src/services/xinmaiChoiceSemanticBindingReadValidator.ts";
    `,
    resolveDir: process.cwd(),
    sourcefile: "semantic-selection-foundation-gate.ts",
    loader: "ts",
  },
  bundle: true,
  platform: "node",
  format: "esm",
  write: false,
  logLevel: "silent",
});
const runtime = await import(
  `data:text/javascript;base64,${Buffer.from(bundle.outputFiles[0].text).toString("base64")}`
);

const withheld = await runtime.executeXinmaiSixDimensionSemanticSelectionCommand({
  type: "ACKNOWLEDGE_SEMANTIC_SELECTION_V3",
  commandReferenceId: "gate-command",
  observationSetId: "gate-set",
  dimensionId: "body",
  semanticGrammarRevision:
    runtime.XINMAI_SIX_DIMENSION_SEMANTIC_GRAMMAR_REVISION,
  semanticResponseId: "LOCATED",
  expectedSetRevision: 1,
  expectedItemRevision: 0,
  sourceReferenceId: "source:body",
});
assert(
  withheld.status === "SAFE_WITHHELD" &&
    withheld.cause.code === "MUTATION_POLICY_SAFE_WITHHELD" &&
    withheld.cause.retryability === "NOT_RETRYABLE",
  "foundation controller does not return frozen withheld outcome",
);

const now = "2026-08-11T00:00:00.000Z";
const identityReferences = Object.freeze({
  sourceReferenceId: "source:gate",
  starBeastIdentityReferenceId: "star:gate",
  mansionCoordinateReferenceId: "mansion:gate",
});
const provenance = Object.freeze({
  authority: "XINMAI_SIX_DIMENSION_OBSERVATION_AUTHORITY",
  explicitUserAcknowledgementRequired: true,
  noRawWhisperPersistence: true,
  noPrivateFreeTextPersistence: true,
  noChoiceAuthority: true,
  noCrystalAuthority: true,
  noRendererAuthority: true,
});
const receiptProvenance = Object.freeze({
  authority: "XINMAI_SIX_DIMENSION_OBSERVATION_AUTHORITY",
  allSixDistinctObserved: true,
  noChoiceAuthority: true,
  noActionAuthority: true,
  noFactAuthority: true,
  noCrystalAuthority: true,
});

const baseSet = (suffix) => ({
  schemaVersion: runtime.XINMAI_SIX_DIMENSION_OBSERVATION_V3_SCHEMA_VERSION,
  observationSetId: `set:${suffix}`,
  canonicalLineageKey: `lineage:${suffix}`,
  identityKey: "identity:gate",
  identityReferences,
  encounterCycleId: `encounter:${suffix}`,
  gravityCycleId: `gravity:${suffix}`,
  gravityObservationReferenceId: `gravity-observation:${suffix}`,
  pressure: Object.freeze({
    runtimeSeedId: "YOUTH_POWER_01",
    candidateReferenceId: "candidate:gate",
    catalogRevision: "catalog:gate",
  }),
  dimensionProtocolRevision:
    runtime.XINMAI_SIX_DIMENSION_V3_PROTOCOL_REVISION,
  semanticGrammarRevision:
    runtime.XINMAI_SIX_DIMENSION_SEMANTIC_GRAMMAR_REVISION,
  dimensionOrder: runtime.XINMAI_SIX_DIMENSION_IDS,
  lifecycle: "OPEN",
  revision: 1,
  lastCommittedCommandReferenceId: "command:create",
  contentDigest: "PENDING",
  evidenceDigest: null,
  completionReceiptReferenceId: null,
  createdAt: now,
  updatedAt: now,
  committedAt: null,
  provenance,
});

const pendingItems = (setId) => runtime.XINMAI_SIX_DIMENSION_IDS.map(
  (dimensionId, index) => Object.freeze({
    dimensionId,
    ordinal: index + 1,
    state: "PENDING",
    sourceReferenceId: `source:${setId}:${dimensionId}`,
    outcomeReferenceId: null,
    acknowledgement: null,
    semanticSelection: null,
    itemRevision: 0,
    committedByCommandReferenceId: null,
    presentedAt: null,
    observedAt: null,
    updatedAt: now,
    terminalReason: null,
  }),
);

const makeSelection = async (set, dimensionId, semanticResponseId) => {
  const semanticSelectionDigest =
    await runtime.createSixDimensionSemanticSelectionDigest({
      schemaVersion: set.schemaVersion,
      dimensionProtocolRevision: set.dimensionProtocolRevision,
      canonicalLineageKey: set.canonicalLineageKey,
      observationSetId: set.observationSetId,
      dimensionId,
      semanticGrammarRevision: set.semanticGrammarRevision,
      semanticResponseId,
    });
  return Object.freeze({
    semanticGrammarRevision: set.semanticGrammarRevision,
    semanticResponseId,
    semanticSelectionReferenceId:
      runtime.createSixDimensionSemanticSelectionReferenceId(
        { observationSetId: set.observationSetId, dimensionId },
        semanticSelectionDigest,
      ),
    semanticSelectionDigest,
  });
};

const makeOpenSubset = async (dimensionId, semanticResponseId, suffix) => {
  const base = baseSet(suffix);
  const items = pendingItems(base.observationSetId);
  const selection = await makeSelection(base, dimensionId, semanticResponseId);
  const target = runtime.XINMAI_SIX_DIMENSION_IDS.indexOf(dimensionId);
  items[target] = Object.freeze({
    ...items[target],
    state: "OBSERVED",
    outcomeReferenceId: `outcome:${suffix}:${dimensionId}`,
    acknowledgement: "IMPACT_RECOGNIZED_PRESENT",
    semanticSelection: selection,
    itemRevision: 1,
    committedByCommandReferenceId: `command:${suffix}:${dimensionId}`,
    observedAt: now,
  });
  const provisional = Object.freeze({ ...base, items: Object.freeze(items) });
  return Object.freeze({
    ...provisional,
    contentDigest: await runtime.createSixDimensionV3ContentDigest(provisional),
  });
};

let boundedCount = 0;
for (const dimensionId of runtime.XINMAI_SIX_DIMENSION_IDS) {
  for (const responseId of runtime.XINMAI_SIX_DIMENSION_SEMANTIC_RESPONSE_IDS[dimensionId]) {
    boundedCount += 1;
    const set = await makeOpenSubset(
      dimensionId,
      responseId,
      `${dimensionId}:${responseId}`,
    );
    const recovered =
      await runtime.recoverXinmaiSixDimensionSemanticSelectionFromRecords(
        set,
        null,
      );
    assert(
      recovered.status === "EXACT_SUBSET" &&
        recovered.selections.length === 1 &&
        recovered.selections[0].selection.semanticResponseId === responseId,
      `bounded response did not recover exactly: ${dimensionId}/${responseId}`,
    );
  }
}
assert(boundedCount === 17, `expected 17 bounded responses, received ${boundedCount}`);

const chosen = Object.freeze({
  body: "LOCATED",
  emotion: "MIXED",
  thought: "PRIVATE",
  action: "WITHDRAW",
  memory: "NOW",
  goal: "VALUE",
});
const completeBase = baseSet("complete");
const completePending = pendingItems(completeBase.observationSetId);
const completeItems = [];
for (let index = 0; index < runtime.XINMAI_SIX_DIMENSION_IDS.length; index += 1) {
  const dimensionId = runtime.XINMAI_SIX_DIMENSION_IDS[index];
  const selection = await makeSelection(
    completeBase,
    dimensionId,
    chosen[dimensionId],
  );
  completeItems.push(Object.freeze({
    ...completePending[index],
    state: "OBSERVED",
    outcomeReferenceId: `outcome:complete:${dimensionId}`,
    acknowledgement: "IMPACT_RECOGNIZED_PRESENT",
    semanticSelection: selection,
    itemRevision: 1,
    committedByCommandReferenceId: `command:complete:${dimensionId}`,
    observedAt: now,
  }));
}
let completeSet = Object.freeze({
  ...completeBase,
  items: Object.freeze(completeItems),
  lifecycle: "COMPLETED",
  revision: 7,
  lastCommittedCommandReferenceId: "command:complete:goal",
  committedAt: now,
  completionReceiptReferenceId: "receipt:complete",
});
completeSet = Object.freeze({
  ...completeSet,
  contentDigest: await runtime.createSixDimensionV3ContentDigest(completeSet),
});
completeSet = Object.freeze({
  ...completeSet,
  evidenceDigest: await runtime.createSixDimensionV3EvidenceDigest(completeSet),
});
const selectionReferences = completeItems.map(
  (item) => item.semanticSelection.semanticSelectionReferenceId,
);
const selectionDigests = completeItems.map(
  (item) => item.semanticSelection.semanticSelectionDigest,
);
const completeReceipt = Object.freeze({
  schemaVersion:
    runtime.XINMAI_SIX_DIMENSION_COMPLETION_RECEIPT_V2_SCHEMA_VERSION,
  completionReceiptReferenceId: "receipt:complete",
  observationSetId: completeSet.observationSetId,
  observationSetRevision: completeSet.revision,
  identityKey: completeSet.identityKey,
  identityReferences,
  encounterCycleId: completeSet.encounterCycleId,
  gravityCycleId: completeSet.gravityCycleId,
  gravityObservationReferenceId: completeSet.gravityObservationReferenceId,
  pressure: completeSet.pressure,
  dimensionProtocolRevision: completeSet.dimensionProtocolRevision,
  semanticGrammarRevision: completeSet.semanticGrammarRevision,
  itemOutcomeReferences: Object.freeze(
    completeItems.map((item) => item.outcomeReferenceId),
  ),
  semanticSelectionReferences: Object.freeze(selectionReferences),
  semanticSelectionDigests: Object.freeze(selectionDigests),
  semanticSelectionAggregateDigest:
    await runtime.createSixDimensionSemanticSelectionAggregateDigest(
      selectionDigests,
    ),
  contentDigest: completeSet.contentDigest,
  evidenceDigest: completeSet.evidenceDigest,
  completedAt: now,
  provenance: receiptProvenance,
});
const exactComplete =
  await runtime.recoverXinmaiSixDimensionSemanticSelectionFromRecords(
    completeSet,
    completeReceipt,
  );
assert(
  exactComplete.status === "EXACT_COMPLETE" &&
    exactComplete.selections.length === 6,
  "valid V3 complete set did not recover exact map",
);

const digestA = await runtime.createSixDimensionSemanticSelectionDigest({
  schemaVersion: completeSet.schemaVersion,
  dimensionProtocolRevision: completeSet.dimensionProtocolRevision,
  canonicalLineageKey: completeSet.canonicalLineageKey,
  observationSetId: completeSet.observationSetId,
  dimensionId: "action",
  semanticGrammarRevision: completeSet.semanticGrammarRevision,
  semanticResponseId: "ADVANCE",
});
const digestB = await runtime.createSixDimensionSemanticSelectionDigest({
  schemaVersion: completeSet.schemaVersion,
  dimensionProtocolRevision: completeSet.dimensionProtocolRevision,
  canonicalLineageKey: completeSet.canonicalLineageKey,
  observationSetId: completeSet.observationSetId,
  dimensionId: "action",
  semanticGrammarRevision: completeSet.semanticGrammarRevision,
  semanticResponseId: "ADVANCE",
});
assert(digestA === digestB && digestA.length === 64, "selection digest is not deterministic");

const invalidTuple = structuredClone(
  await makeOpenSubset("body", "LOCATED", "invalid-tuple"),
);
invalidTuple.items[0].semanticSelection.semanticResponseId = "ADVANCE";
assert(
  (await runtime.recoverXinmaiSixDimensionSemanticSelectionFromRecords(
    invalidTuple,
    null,
  )).status === "SAFE_WITHHELD",
  "invalid dimension/response tuple did not fail closed",
);
const unknownGrammar = structuredClone(
  await makeOpenSubset("emotion", "CLEAR", "unknown-grammar"),
);
unknownGrammar.semanticGrammarRevision = "UNKNOWN_GRAMMAR";
assert(
  (await runtime.recoverXinmaiSixDimensionSemanticSelectionFromRecords(
    unknownGrammar,
    null,
  )).cause.code === "SEMANTIC_GRAMMAR_REVISION_UNKNOWN",
  "unknown grammar did not preserve typed failure",
);
const badDigest = structuredClone(
  await makeOpenSubset("goal", "NEED", "bad-digest"),
);
badDigest.items[5].semanticSelection.semanticSelectionDigest = "bad";
assert(
  (await runtime.recoverXinmaiSixDimensionSemanticSelectionFromRecords(
    badDigest,
    null,
  )).cause.code === "SEMANTIC_SELECTION_DIGEST_MISMATCH",
  "selection digest mismatch did not fail closed",
);
const missingSelection = structuredClone(
  await makeOpenSubset("action", "PAUSE", "missing-selection"),
);
missingSelection.items[3].semanticSelection = null;
assert(
  (await runtime.recoverXinmaiSixDimensionSemanticSelectionFromRecords(
    missingSelection,
    null,
  )).status === "SAFE_WITHHELD",
  "observed item with missing selection did not fail closed",
);
const mixedReceipt = Object.freeze({
  ...completeReceipt,
  schemaVersion: runtime.XINMAI_SIX_DIMENSION_COMPLETION_RECEIPT_SCHEMA_VERSION,
});
assert(
  (await runtime.recoverXinmaiSixDimensionSemanticSelectionFromRecords(
    completeSet,
    mixedReceipt,
  )).cause.code === "MIXED_OBSERVATION_PROTOCOL_VERSIONS",
  "mixed V2/V3 pair did not fail closed",
);

const legacySet = Object.freeze({
  schemaVersion: runtime.XINMAI_SIX_DIMENSION_OBSERVATION_SCHEMA_VERSION,
  observationSetId: "legacy:set",
  canonicalLineageKey: "legacy:lineage",
  identityKey: "identity:gate",
  identityReferences,
  encounterCycleId: "legacy:encounter",
  gravityCycleId: "legacy:gravity",
  gravityObservationReferenceId: "legacy:gravity-observation",
  pressure: completeSet.pressure,
  dimensionProtocolRevision: runtime.XINMAI_SIX_DIMENSION_PROTOCOL_REVISION,
  dimensionOrder: runtime.XINMAI_SIX_DIMENSION_IDS,
  items: Object.freeze(runtime.XINMAI_SIX_DIMENSION_IDS.map(
    (dimensionId, index) => Object.freeze({
      dimensionId,
      ordinal: index + 1,
      state: "PENDING",
      sourceReferenceId: `legacy:source:${dimensionId}`,
      outcomeReferenceId: null,
      acknowledgement: null,
      itemRevision: 0,
      committedByCommandReferenceId: null,
      presentedAt: null,
      observedAt: null,
      updatedAt: now,
      terminalReason: null,
    }),
  )),
  lifecycle: "OPEN",
  revision: 1,
  lastCommittedCommandReferenceId: "legacy:command",
  contentDigest: "legacy:content",
  evidenceDigest: null,
  completionReceiptReferenceId: null,
  createdAt: now,
  updatedAt: now,
  committedAt: null,
  provenance,
});
const legacy =
  await runtime.recoverXinmaiSixDimensionSemanticSelectionFromRecords(
    legacySet,
    null,
  );
assert(
  legacy.status === "LEGACY_GENERIC_ONLY" &&
    legacy.cause.code === "SEMANTIC_SELECTION_NOT_RECORDED" &&
    legacy.selections === null,
  "legacy V2 recovery invented semantic selection",
);

const legacyCompleteItems = legacySet.items.map((item) => Object.freeze({
  ...item,
  state: "OBSERVED",
  outcomeReferenceId: `legacy:outcome:${item.dimensionId}`,
  acknowledgement: "IMPACT_RECOGNIZED_PRESENT",
  itemRevision: 1,
  committedByCommandReferenceId: `legacy:command:${item.dimensionId}`,
  observedAt: now,
}));
const legacyCompleteSet = Object.freeze({
  ...legacySet,
  items: Object.freeze(legacyCompleteItems),
  lifecycle: "COMPLETED",
  revision: 7,
  lastCommittedCommandReferenceId: "legacy:command:goal",
  evidenceDigest: "legacy:evidence",
  completionReceiptReferenceId: "legacy:receipt",
  committedAt: now,
});
const legacyReceipt = Object.freeze({
  schemaVersion:
    runtime.XINMAI_SIX_DIMENSION_COMPLETION_RECEIPT_SCHEMA_VERSION,
  completionReceiptReferenceId: "legacy:receipt",
  observationSetId: legacyCompleteSet.observationSetId,
  observationSetRevision: legacyCompleteSet.revision,
  identityKey: legacyCompleteSet.identityKey,
  identityReferences,
  encounterCycleId: legacyCompleteSet.encounterCycleId,
  gravityCycleId: legacyCompleteSet.gravityCycleId,
  gravityObservationReferenceId:
    legacyCompleteSet.gravityObservationReferenceId,
  pressure: legacyCompleteSet.pressure,
  dimensionProtocolRevision: legacyCompleteSet.dimensionProtocolRevision,
  itemOutcomeReferences: Object.freeze(
    legacyCompleteItems.map((item) => item.outcomeReferenceId),
  ),
  contentDigest: legacyCompleteSet.contentDigest,
  evidenceDigest: legacyCompleteSet.evidenceDigest,
  completedAt: now,
  provenance: receiptProvenance,
});
const legacyComplete =
  await runtime.recoverXinmaiSixDimensionSemanticSelectionFromRecords(
    legacyCompleteSet,
    legacyReceipt,
  );
assert(
  legacyComplete.status === "LEGACY_GENERIC_ONLY" &&
    legacyComplete.observedDimensionIds.length === 6 &&
    legacyComplete.selections === null,
  "complete V2 Receipt V1 did not recover as truthful generic-only evidence",
);

const badAggregateReceipt = structuredClone(completeReceipt);
badAggregateReceipt.semanticSelectionAggregateDigest = "bad-aggregate";
assert(
  (await runtime.recoverXinmaiSixDimensionSemanticSelectionFromRecords(
    completeSet,
    badAggregateReceipt,
  )).status === "SAFE_WITHHELD",
  "aggregate selection digest mismatch did not fail closed",
);

const corruptDiscriminant = structuredClone(legacySet);
corruptDiscriminant.schemaVersion = "UNKNOWN_OBSERVATION_SCHEMA";
assert(
  (await runtime.recoverXinmaiSixDimensionSemanticSelectionFromRecords(
    corruptDiscriminant,
    null,
  )).status === "SAFE_WITHHELD",
  "corrupt schema discriminant did not fail closed",
);

assert(
  packageJson.scripts["check:xinmai-six-dimension-semantic-selection-authority-foundation"] ===
    "node scripts/check-xinmai-six-dimension-semantic-selection-authority-foundation.mjs",
  "foundation gate is not registered",
);
assert(
  packageJson.scripts["check:xinmai-lived-growth-authority"].includes(
    "check:xinmai-six-dimension-semantic-selection-authority-foundation",
  ),
  "foundation gate is absent from lived-growth authority suite",
);
console.log("[XINMAI SIX-DIMENSION SEMANTIC SELECTION FOUNDATION] PASS");
