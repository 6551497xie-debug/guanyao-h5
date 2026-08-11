import { readFileSync } from "node:fs";

const read = (path) => readFileSync(path, "utf8");
const assert = (condition, message) => {
  if (!condition) {
    throw new Error(`[post-ownership-next-cycle] ${message}`);
  }
};
const requireAll = (source, markers, owner) => {
  for (const marker of markers) {
    assert(source.includes(marker), `${owner} missing ${marker}`);
  }
};

const types = read("src/types/xinmaiPostOwnershipNextRealityCycle.ts");
const proof = read("src/services/xinmaiCompletedReturnTargetProofAdapter.ts");
const lifecycle = read(
  "src/services/xinmaiRealityAdventureLifecycleReconciliationController.ts",
);
const lifecycleResolver = read(
  "src/services/xinmaiCompletedReturnTargetLifecycleResolver.ts",
);
const coordinator = read(
  "src/services/xinmaiPostOwnershipNextRealityCycleController.ts",
);
const policy = read(
  "src/services/xinmaiPostOwnershipNextRealityCycleMutationPolicy.ts",
);
const intent = read("src/services/xinmaiRealityEncounterIntentController.ts");
const intentTypes = read("src/types/xinmaiRealityEncounterIntent.ts");
const surface = read("src/components/XinmaiLivedResponseReturnSurface.tsx");
const ownership = read("src/components/XinmaiCrystalFormationOwnershipMoment.tsx");
const launch = read("src/pages/LaunchLab.tsx");
const archive = read("src/pages/PersonalityRingPage.tsx");
const continuityTypes = read("src/types/xinmaiRealityAdventureContinuity.ts");
const growthStoreTypes = read("src/types/xinmaiLivedGrowthTransactionalStore.ts");
const packageJson = JSON.parse(read("package.json"));

requireAll(types, [
  "XinmaiCompletedReturnTargetProof",
  "XinmaiCompletedReturnTargetReconciliationResult",
  '"COMPLETION_PROOF"',
  '"TARGET_RECONCILIATION"',
  '"FRESH_INTENT_REQUEST"',
  '"RETRYABLE" | "NON_RETRYABLE"',
], "typed contract");
requireAll(proof, [
  'choice.state !== "REPORTED"',
  'returnReceipt.state !== "CONSUMED_BY_FACT"',
  'candidate.state === "CONFIRMED"',
  '"ATTEMPTED"',
  '"COMPLETED_AS_INTENDED"',
  '"CHANGED_RESPONSE"',
  'eligibility.state !== "CONSUMED"',
  'candidate.status === "FORMED"',
  'formation.formedCrystal.status !== "CRYSTALLIZED"',
  "projectXinmaiCanonicalBodyImprints",
  '"UNRESOLVED_NEWER_CHOICE"',
  "readOnly: true as const",
], "proof reader");
for (const forbidden of [
  "localStorage",
  "sessionStorage",
  "indexedDB",
  "OWNERSHIP_PRESENTED",
  "archiveService",
]) {
  assert(!proof.includes(forbidden), `proof reader owns forbidden ${forbidden}`);
}
requireAll(lifecycle, [
  "reconcileXinmaiCompletedReturnTargetForNextEncounter",
  "transactRealityAdventureContinuity<Decision>",
  'terminalReason: "START_NEW_ENCOUNTER"',
  "terminalizeXinmaiRealityAdventureLifecycleRecord",
  '"START_NEW_REALITY_ENCOUNTER"',
  "reconcileCompletedReturnTarget",
], "single reconciliation owner");
assert(
  !read("src/services/xinmaiGravityEntryAdmissionController.ts").includes(
    "reconcileCompletedReturnTarget",
  ),
  "Gravity Controller became a second completed-return owner",
);
requireAll(coordinator, [
  "readXinmaiCompletedReturnTargetProof",
  "reconcileXinmaiCompletedReturnTargetForNextEncounter",
  "requestRealityEncounter",
  'origin: "CHOICE_CONTINUATION"',
  'qualification: "CHOICE_ACTION_INTENTION_COMMITTED"',
  "resumableSaga: true as const",
  "crossDatabaseAtomicityClaim: false as const",
], "resumable saga");
requireAll(intent, [
  'origin === "CHOICE_CONTINUATION"',
  "canStartChoiceContinuationFromRecord",
  "exactChoiceContinuationWinnerMatches",
  "recoverExactChoiceContinuationAfterUniqueConflict",
  'record.terminalReason === "START_NEW_ENCOUNTER"',
  'record.lifecycle !== "TERMINAL"',
  'intent.state !== "TERMINAL"',
  'requestDisposition: "ALREADY_CURRENT"',
], "fresh Intent owner");
requireAll(intentTypes, [
  '"RECOVERED_EXACT_CHOICE_CONTINUATION"',
  '"CONTINUATION_CONFLICT_WINNER_NOT_VISIBLE"',
  '"CONTINUATION_CONFLICT_PROOF_MISMATCH"',
], "fresh Intent typed result");
assert(
  policy.includes(
    'POST_OWNERSHIP_NEXT_CYCLE_NEW_MUTATION:\n  XinmaiPostOwnershipNextRealityCycleMutationPolicy = "ENABLED"',
  ) ||
    policy.includes(
      'POST_OWNERSHIP_NEXT_CYCLE_NEW_MUTATION:\n  XinmaiPostOwnershipNextRealityCycleMutationPolicy = "SAFE_WITHHELD"',
    ),
  "Candidate/Counter policy is not the frozen one-line switch",
);
assert(
  !surface.includes(
    "returnReceipt.realityProof.realityIntentReferenceId",
  ) &&
    surface.includes("onNextRealityCycleRequest") &&
    surface.includes("data-next-reality-cycle-retryability") &&
    surface.includes("data-next-reality-cycle-typed-cause"),
  "Ownership consumer still reuses the historical Intent or hides typed feedback",
);
requireAll(launch, [
  "beginXinmaiPostOwnershipNextRealityCycle",
  "result.freshIntent.intentReferenceId",
  '"POST_OWNERSHIP_FRESH_INTENT"',
], "Launch consumer");
requireAll(archive, [
  "beginXinmaiPostOwnershipNextRealityCycle",
  "nextCycleImprint.choiceActionIntentionReferenceId",
  "nextCycleImprint.formationReferenceId",
  "result.freshIntent.intentReferenceId",
  "data-next-reality-cycle-retryability",
  'role="status"',
], "Archive read-only command consumer");
requireAll(ownership, [
  "continueDisabled",
  "continueBusy",
  "aria-busy={continueBusy}",
], "accessible action");

assert(
  continuityTypes.includes(
    "XINMAI_REALITY_ADVENTURE_CONTINUITY_DATABASE_VERSION =\n  1 as const",
  ),
  "Reality DB version changed",
);
assert(
  growthStoreTypes.includes("XINMAI_LIVED_GROWTH_DATABASE_VERSION = 3"),
  "Growth DB version changed",
);
assert(
  packageJson.scripts["check:xinmai-post-ownership-next-cycle-atomic-corrective"] ===
    "node scripts/check-xinmai-post-ownership-next-cycle-atomic-corrective.mjs",
  "gate is not registered",
);

requireAll(lifecycleResolver, [
  'input.lifecycle === "REALITY_PENDING"',
  'input.lifecycle === "REALITY_ACTIVE"',
  'input.lifecycle === "PRESSURE_RECOGNIZED"',
  'input.lifecycle === "GRAVITY_ADMITTED"',
  'input.lifecycle === "ACTIVE_IN_GRAVITY"',
  'return hasGravity ? "TARGET_CONTINUITY_CORRUPTED" : "ALLOW"',
  'if (!hasGravity) return "GRAVITY_ADMISSION_MISSING"',
  'input.gravityAdmissionState === "ACTIVE_IN_GRAVITY"',
  'input.outerTerminalReason === "START_NEW_ENCOUNTER"',
  '? "ALREADY_RECONCILED"',
  ': "TERMINAL_REASON_CONFLICT"',
], "executable state classifier");

const { classifyXinmaiCompletedReturnTargetLifecycle: classify } =
  await import(
    new URL(
      "../src/services/xinmaiCompletedReturnTargetLifecycleResolver.ts",
      import.meta.url,
    )
  );
const base = Object.freeze({
  activeIdentityKeyPresent: true,
  outerTerminalReason: null,
  intentState: "ACTIVE_IN_REALITY",
  intentTerminalReason: null,
  gravityTerminalReason: null,
});
for (const lifecycleState of [
  "REALITY_PENDING",
  "REALITY_ACTIVE",
  "PRESSURE_RECOGNIZED",
]) {
  assert(
    classify({ ...base, lifecycle: lifecycleState, gravityAdmissionState: null }) ===
      "ALLOW",
    `${lifecycleState} without Gravity must be legally terminalizable`,
  );
  assert(
    classify({
      ...base,
      lifecycle: lifecycleState,
      gravityAdmissionState: "ACTIVE_IN_GRAVITY",
    }) === "TARGET_CONTINUITY_CORRUPTED",
    `${lifecycleState} with Gravity must fail closed`,
  );
}
for (const lifecycleState of ["GRAVITY_ADMITTED", "ACTIVE_IN_GRAVITY"]) {
  assert(
    classify({ ...base, lifecycle: lifecycleState, gravityAdmissionState: null }) ===
      "GRAVITY_ADMISSION_MISSING",
    `${lifecycleState} without Gravity admission must fail closed`,
  );
  assert(
    classify({
      ...base,
      lifecycle: lifecycleState,
      gravityAdmissionState: "ACTIVE_IN_GRAVITY",
    }) === "ALLOW",
    `${lifecycleState} with exact active Gravity must be allowed`,
  );
}
assert(
  classify({
    ...base,
    lifecycle: "TERMINAL",
    activeIdentityKeyPresent: false,
    outerTerminalReason: "START_NEW_ENCOUNTER",
    intentState: "TERMINAL",
    intentTerminalReason: "START_NEW_ENCOUNTER",
    gravityAdmissionState: null,
  }) === "ALREADY_RECONCILED",
  "exact terminal winner must be idempotently recoverable",
);
assert(
  classify({
    ...base,
    lifecycle: "TERMINAL",
    activeIdentityKeyPresent: false,
    outerTerminalReason: "INTENT_EXPIRED",
    intentState: "TERMINAL",
    intentTerminalReason: "INTENT_EXPIRED",
    gravityAdmissionState: null,
  }) === "TERMINAL_REASON_CONFLICT",
  "conflicting terminal history must not be reinterpreted",
);

console.log("[XINMAI POST-OWNERSHIP NEXT-CYCLE ATOMIC CORRECTIVE] PASS");
