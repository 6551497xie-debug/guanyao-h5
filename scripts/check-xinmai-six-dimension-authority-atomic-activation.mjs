import { readFileSync } from "node:fs";

const read = (path) => readFileSync(path, "utf8");
const assert = (condition, message) => {
  if (!condition) throw new Error(`[six-dimension-phase-2] ${message}`);
};

const types = read("src/types/xinmaiSixDimensionObservation.ts");
const choiceTypes = read("src/types/xinmaiChoiceActionIntention.ts");
const policy = read("src/services/xinmaiSixDimensionObservationRuntimePolicy.ts");
const controller = read("src/services/xinmaiSixDimensionObservationAuthorityController.ts");
const store = read("src/services/xinmaiLivedGrowthTransactionalStore.ts");
const validator = read("src/services/xinmaiSixDimensionObservationEvidenceValidator.ts");
const choice = read("src/services/xinmaiChoiceActionIntentionController.ts");
const choiceValidator = read("src/services/xinmaiChoiceActionIntentionPrerequisiteValidator.ts");
const readiness = read("src/services/xinmaiChoicePresentationReadinessResolver.ts");
const page = read("src/pages/GravityPage.tsx");
const host = read("src/components/GravityProductionSurfaceHost.tsx");
const reflectionGuide = read("src/components/XinmaiLifeReflectionGuide.tsx");
const returnSurface = read("src/components/XinmaiLivedResponseReturnSurface.tsx");
const ownership = read("src/components/XinmaiCrystalFormationOwnershipMoment.tsx");
const packageJson = JSON.parse(read("package.json"));

assert(
  policy.includes("XINMAI_SIX_DIMENSION_V2_NEW_MUTATION_POLICY") &&
    (policy.includes(
      'defineXinmaiSixDimensionV2NewMutationPolicy("ENABLED")',
    ) ||
      policy.includes(
        'defineXinmaiSixDimensionV2NewMutationPolicy("SAFE_WITHHELD")',
      )),
  "audited Candidate/Counter policy switch is missing",
);
assert(
  types.includes('"body"') &&
    types.includes('"emotion"') &&
    types.includes('"thought"') &&
    types.includes('"action"') &&
    types.includes('"memory"') &&
    types.includes('"goal"'),
  "frozen six-dimension protocol is incomplete",
);
assert(
  controller.includes("items.every(") &&
    controller.includes('item.state === "OBSERVED"') &&
    controller.includes("createSixDimensionEvidenceDigest") &&
    controller.includes("createSixDimensionCompletionReceiptReferenceId"),
  "completion is not derived exclusively from six explicit OBSERVED items",
);
for (const forbidden of [
  "enginePhase",
  "animationPercent",
  "completedNodeCount",
  "timeSpent",
  "localStorage",
  "sessionStorage",
]) {
  assert(
    !controller.includes(forbidden),
    `Controller consumes forbidden presentation authority: ${forbidden}`,
  );
}
assert(
  controller.includes("transactXinmaiSixDimensionObservation") &&
    store.includes("setStore.put(input.observationSet)") &&
    store.includes("fenceStore.add(input.commandFence)") &&
    store.includes("receiptStore.add(input.completionReceipt)") &&
    store.includes("createStrictReadwriteTransaction(database)"),
  "set/fence/sixth-item receipt are not committed by one strict transaction",
);
assert(
  store.includes("currentFence.inputDigest") &&
    store.includes('"ALREADY_COMMITTED"') &&
    store.includes('"STALE_REVISION"') &&
    store.includes('"CANONICAL_UNIQUENESS_VIOLATION"'),
  "idempotency, stale fencing, or uniqueness outcomes are missing",
);
assert(
  validator.includes('crypto.subtle.digest(\n    "SHA-256"') &&
    validator.includes("validateSixDimensionSetReceiptPair"),
  "canonical digest/receipt validation is missing",
);
assert(
  choiceTypes.includes("XINMAI_CHOICE_ACTION_INTENTION_V3") &&
    choiceTypes.includes("XINMAI_CHOICE_FORMATION_SOURCE_SNAPSHOT_V2") &&
    choiceTypes.includes("completionReceiptReferenceId") &&
    choiceTypes.includes("observationSetRevision") &&
    choiceTypes.includes("dimensionProtocolRevision") &&
    choiceTypes.includes("evidenceDigest"),
  "Choice V3 receipt binding contract is incomplete",
);
assert(
  choice.includes("commitChoiceActionIntentionV3") &&
    choice.includes("requiredSixDimensionCompletion") === false &&
    choice.includes("completionReceiptReferenceId") &&
    store.includes("requiredSixDimensionCompletion") &&
    choiceValidator.includes("validateChoiceActionIntentionV3Prerequisites"),
  "Choice V3 is not independently receipt-gated",
);
assert(
  readiness.includes("newChoiceV3Authority") &&
    readiness.includes("SIX_DIMENSION_COMPLETION_REQUIRED") &&
    readiness.indexOf('summary.state === "CHOICE_COMMITTED"') <
      readiness.indexOf("newChoiceV3Authority.cause"),
  "legacy recovery and new V3 readiness are not separated",
);
assert(
  !page.includes("setCompletedDimensionIds") &&
    !page.includes("DYNAMICS_SEQUENTIAL_SIX_SPACE_IDS,\n          ]") &&
    page.includes("sixDimensionAuthority.observationSet?.items") &&
    page.includes("onSixDimensionAcknowledgement") &&
    page.includes("commitChoiceActionIntentionV3"),
  "page-local completion or recovery-to-all-six still authorizes the product",
);
assert(
  host.includes("executeXinmaiSixDimensionObservationCommand") &&
    host.includes('type: "ACKNOWLEDGE_DIMENSION"') &&
    host.includes("readXinmaiGravityObservationContinuityState"),
  "Production Host is not wired to typed canonical commands",
);
assert(
  reflectionGuide.includes("onContinue,") &&
    reflectionGuide.includes("const saved = await onContinue?.();") &&
    reflectionGuide.includes("if (saved) setSavedAnnouncement") &&
    reflectionGuide.includes('data-xinmai-authority-boundary="FINAL_ACKNOWLEDGEMENT_ONLY"') &&
    page.includes("key={sequentialCurrentSpaceId}") &&
    page.includes('data-dynamics-current-dimension-label={currentDimensionLabel}') &&
    !page.includes("initialInnerViewRelation={innerViewRelation}") &&
    page.includes(
      'function handleLifeCoreApproach() {\n    if (!innerViewRelationEstablished) {\n      approachLifeState();\n    }\n  }',
    ) &&
    page.includes("finally {") &&
    page.includes("dimensionTransitionLockRef.current = false;"),
  "per-dimension reflection can inherit prior state, bypass final continuation, or strand its lock",
);
assert(
  page.includes("confirmButtonRef.current?.blur();") &&
    returnSurface.includes("document.activeElement.blur();") &&
    ownership.includes("event.currentTarget.blur();"),
  "state-changing actions can leave focus inside an aria-hidden surface",
);
assert(
  !page.includes("indexedDB") &&
    !page.includes("localStorage.setItem") &&
    !host.includes("localStorage.setItem"),
  "Presentation writes Authority storage directly",
);
assert(
  packageJson.scripts["check:xinmai-six-dimension-authority-atomic-activation"] ===
    "node scripts/check-xinmai-six-dimension-authority-atomic-activation.mjs" &&
    packageJson.scripts["check:xinmai-lived-growth-authority"].includes(
      "check:xinmai-six-dimension-authority-atomic-activation",
    ),
  "Phase 2 gate is not fully registered",
);

for (const forbidden of [
  "deleteObjectStore",
  "deleteIndex",
  "XINMAI_LIVED_GROWTH_DATABASE_VERSION = 4",
]) {
  assert(!store.includes(forbidden), `forbidden DB migration: ${forbidden}`);
}
assert(
  (types.match(/six-dimension-[a-z-]+" as const/g) ?? []).length === 3,
  "a fourth six-dimension Store was introduced",
);

console.log("[XINMAI SIX-DIMENSION AUTHORITY ATOMIC ACTIVATION] PASS");
