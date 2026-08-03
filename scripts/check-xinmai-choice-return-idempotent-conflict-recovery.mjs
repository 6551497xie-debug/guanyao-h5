import fs from "node:fs";

const read = (path) => fs.readFileSync(path, "utf8");
const continuityTypes = read("src/types/xinmaiRealityAdventureContinuity.ts");
const intentTypes = read("src/types/xinmaiRealityEncounterIntent.ts");
const store = read(
  "src/services/xinmaiRealityAdventureContinuityTransactionalStore.ts",
);
const intent = read("src/services/xinmaiRealityEncounterIntentController.ts");
const returning = read(
  "src/services/xinmaiChoiceReturningProvenanceController.ts",
);
const packageJson = read("package.json");

const assertIncludes = (source, marker, label) => {
  if (!source.includes(marker)) {
    throw new Error(`${label} missing ${marker}`);
  }
};

for (const marker of [
  "RealityAdventureContinuityUniqueConstraintContext",
  '"CANONICAL_RECORD_PUT"',
  '"RETAINED_RECORD_PUT"',
  '"TRANSACTION_UNKNOWN"',
  "attemptedActiveIdentityKey",
]) {
  assertIncludes(continuityTypes, marker, "continuity types");
}

for (const marker of [
  "RealityEncounterRequestDisposition",
  '"CREATED"',
  '"ALREADY_CURRENT"',
  '"RECOVERED_EXACT_CHOICE_RETURN"',
  '"RETURN_CONFLICT_WINNER_NOT_VISIBLE"',
  '"RETURN_CONFLICT_PROOF_MISMATCH"',
]) {
  assertIncludes(intentTypes, marker, "intent types");
}

for (const marker of [
  'operation: "CANONICAL_RECORD_PUT" as const',
  'operation: "RETAINED_RECORD_PUT" as const',
  'operation: "TRANSACTION_UNKNOWN" as const',
  "attemptedEncounterCycleId",
  "attemptedActiveIdentityKey",
]) {
  assertIncludes(store, marker, "transactional store");
}

for (const marker of [
  "CHOICE_RETURN_CONFLICT_MAX_CANONICAL_READS = 3",
  "recoverExactChoiceReturnAfterUniqueConflict",
  'kind: "ACTIVE_IDENTITY"',
  'kind: "ENCOUNTER"',
  'transaction.reason === "UNIQUE_CONSTRAINT_REJECTED"',
  'transaction.uniqueConstraint?.operation ===',
  '"CANONICAL_RECORD_PUT"',
  "transaction.uniqueConstraint.attemptedActiveIdentityKey ===",
  'record.lifecycle === "REALITY_PENDING"',
  'intent.state === "READY_TO_ENTER_REALITY"',
  'intent.origin === "CHOICE_RETURN"',
  'intent.qualification === "EXPLICIT_RETURN_TO_CHOICE"',
  "intent.choiceActionIntentionReferenceId ===",
  "intent.departureReceiptReferenceId ===",
  "intent.departureReconciliationReferenceId ===",
  "intent.returnIntentRequestReferenceId ===",
  "intent.returnAttemptRevision ===",
  "intent.sourceEncounterCycleId ===",
  '"RECOVERED_EXACT_CHOICE_RETURN" as const',
  '"RETURN_CONFLICT_PROOF_MISMATCH"',
  '"RETURN_CONFLICT_WINNER_NOT_VISIBLE"',
]) {
  assertIncludes(intent, marker, "intent controller");
}

if (intent.includes("setTimeout(") || intent.includes("setInterval(")) {
  throw new Error("timer must not become conflict recovery authority");
}
if (
  !intent.includes('input.origin === "CHOICE_RETURN"') ||
  intent.indexOf('transaction.reason === "UNIQUE_CONSTRAINT_REJECTED"') <
    intent.indexOf('input.origin === "CHOICE_RETURN"')
) {
  throw new Error("unique conflict recovery is not scoped to CHOICE_RETURN");
}

for (const marker of [
  'requested.requestDisposition === "CREATED"',
  '"RETURNED" as const',
  '"ALREADY_RETURNED" as const',
  "executeXinmaiLivedGrowthTransaction(",
  "returnIntentRequestReferenceId === returnIntentRequestReferenceId",
  "exact.targetEncounterCycleId !== requested.intent.encounterCycleId",
]) {
  assertIncludes(returning, marker, "returning controller");
}

for (const forbidden of [
  "localStorage",
  "sessionStorage",
  "document.querySelector",
  "dataset.",
]) {
  if (intent.includes(forbidden)) {
    throw new Error(`intent recovery uses forbidden authority ${forbidden}`);
  }
}

assertIncludes(
  packageJson,
  "check:xinmai-choice-return-idempotent-conflict-recovery",
  "package registration",
);

console.log(
  "[XINMAI CHOICE RETURN IDEMPOTENT CONFLICT RECOVERY] PASS",
);
