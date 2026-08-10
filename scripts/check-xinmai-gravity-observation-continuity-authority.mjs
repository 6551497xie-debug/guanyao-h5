import fs from "node:fs";

const read = (path) => fs.readFileSync(path, "utf8");
const admission = read("src/services/xinmaiGravityEntryAdmissionController.ts");
const cutover = read("src/services/realityToGravityCutoverTransaction.ts");
const admissionTypes = read("src/types/xinmaiGravityEntryAdmission.ts");
const host = read("src/components/GravityProductionSurfaceHost.tsx");
const controller = read("src/services/xinmaiGravityEncounterContinuityController.ts");
const recovery = read("src/services/xinmaiGravityEncounterContinuityRecoveryAdapter.ts");
const store = read("src/services/xinmaiLivedGrowthTransactionalStore.ts");
const storeTypes = read("src/types/xinmaiLivedGrowthTransactionalStore.ts");
const continuityTypes = read("src/types/xinmaiGravityObservationContinuity.ts");
const page = read("src/pages/GravityPage.tsx");
const route = read("src/pages/GravityProductionRouteEntry.tsx");
const choice = read("src/services/xinmaiChoiceActionIntentionController.ts");

const assert = (label, condition) => {
  if (!condition) {
    console.error(`FAIL | ${label}`);
    process.exitCode = 1;
    return;
  }
  console.log(`PASS | ${label}`);
};

assert(
  "Atomic cutover is the stable Observation Reference generator",
  cutover.includes("`gravity-observation:${digest}`") &&
    cutover.includes("gravityObservationReferenceId,") &&
    !admission.includes("`gravity-observation:${opaqueId()}`") &&
    admissionTypes.includes("gravityObservationReferenceId: string"),
);
assert(
  "Host consumes stable reference and has no revision-derived Observation ID",
  host.includes("admission.gravityObservationReferenceId") &&
    !host.includes("gravity-observation:${admission.gravityCycleId}") &&
    !host.includes("gravity-observation:${admission.gravityCycleId}:${admission.revision}"),
);
assert(
  "Admission, recovery, ticket, route and runtime schemas cut over together",
  admissionTypes.includes("XINMAI_GRAVITY_ENTRY_ADMISSION_V2") &&
    admissionTypes.includes("XINMAI_GRAVITY_ENTRY_RECOVERY_V2") &&
    admissionTypes.includes("XINMAI_GRAVITY_ROUTE_TICKET_V2") &&
    admissionTypes.includes("XINMAI_GRAVITY_ROUTE_ADMISSION_V2") &&
    admissionTypes.includes("XINMAI_GRAVITY_PRODUCTION_RUNTIME_INPUT_V2"),
);
assert(
  "Checkpoint is a dedicated V2 IndexedDB store",
  /DATABASE_VERSION\s*=\s*3/.test(storeTypes) &&
    store.includes("XINMAI_GRAVITY_OBSERVATION_CONTINUITY_STORE") &&
    store.includes('"gravityObservationReferenceId"') &&
    store.includes("{ unique: true }"),
);
assert(
  "Checkpoint contains only stable life facts",
  continuityTypes.includes('"OBSERVATION_AVAILABLE"') &&
    continuityTypes.includes('"OBSERVATION_RECOGNIZED"') &&
    !/activeDimensionIndex|completedDimensionIds|executionSnapshot|innerViewPhase|cameraPosition|animationPercent/.test(
      continuityTypes,
    ),
);
assert(
  "Transaction complete is the checkpoint success authority",
  store.includes("transactXinmaiGravityObservationContinuity") &&
    store.includes("transaction.oncomplete") &&
    controller.includes("transactionCompleteIsSuccess: true"),
);
assert(
  "Typed Recovery Adapter is the unique public progress recovery owner",
  recovery.includes("uniquePublicProgressRecoveryOwner: true") &&
    route.includes("resolveGravityEncounterResumeDecision") &&
    !page.includes("sessionStorage") &&
    !page.includes("localStorage") &&
    !route.includes("sessionStorage") &&
    !route.includes("localStorage"),
);
assert(
  "Recognition is persisted before Page presents confirmed state",
  page.includes("onObservationRecognitionRequested") &&
    page.includes('result.status !== "RECOGNIZED"') &&
    controller.includes("recognizeGravityObservation") &&
    controller.includes('"USER_EXPLICIT_GRAVITY_RECOGNITION"'),
);
assert(
  "Choice validates and consumes the Checkpoint in the same transaction",
  choice.includes("transactXinmaiGravityObservationContinuity") &&
    choice.includes("expectedObservationCheckpointRevision") &&
    choice.includes('"OBSERVATION_RECOGNIZED"') &&
    choice.includes('"CONSUMED_BY_CHOICE"') &&
    choice.includes("growthEnvelope: Object.freeze"),
);
assert(
  "Choice cannot be produced by page-local recognition alone",
  !choice.includes("livedResponseRecognized") &&
    !choice.includes("innerViewRelation") &&
    !choice.includes("setTimeout") &&
    !choice.includes("data-"),
);
assert(
  "V1 Admission recovery is not backfilled into a checkpoint",
  admissionTypes.includes("XINMAI_GRAVITY_ENTRY_ADMISSION_V2") &&
    controller.includes("OBSERVATION_STALE") &&
    !controller.includes("XINMAI_GRAVITY_ENTRY_ADMISSION_V1") &&
    !recovery.includes("create") &&
    recovery.includes("noV1ObservationBackfill: true"),
);
assert(
  "Renderer and DOM remain forbidden continuity authorities",
  controller.includes("noRendererAuthority: true") &&
    recovery.includes("noRendererStorageRead: true") &&
    !controller.includes("querySelector") &&
    !controller.includes("dataset") &&
    !controller.includes("localStorage") &&
    !controller.includes("sessionStorage"),
);

if (process.exitCode) process.exit(process.exitCode);
console.log("[XINMAI GRAVITY OBSERVATION CONTINUITY AUTHORITY] PASS");
