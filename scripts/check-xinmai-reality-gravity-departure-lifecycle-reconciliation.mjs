import fs from "node:fs";
import path from "node:path";

const read = (file) => fs.readFileSync(file, "utf8");
const assert = (condition, message) => {
  if (!condition) throw new Error(message);
};
const assertIncludes = (source, marker, label) =>
  assert(source.includes(marker), `${label} missing ${marker}`);

const types = read("src/types/xinmaiRealityAdventureContinuity.ts");
const reconciliationTypes = read(
  "src/types/xinmaiRealityGravityDepartureReconciliation.ts",
);
const store = read(
  "src/services/xinmaiRealityAdventureContinuityTransactionalStore.ts",
);
const owner = read(
  "src/services/xinmaiRealityAdventureLifecycleReconciliationController.ts",
);
const policy = read(
  "src/services/xinmaiRealityAdventureLifecycleReconciliationMutationPolicy.ts",
);
const proof = read(
  "src/services/xinmaiChoiceDepartureReconciliationProofAdapter.ts",
);
const provenance = read(
  "src/services/xinmaiChoiceReturningProvenanceController.ts",
);
const resolver = read(
  "src/services/xinmaiChoiceReturningProvenanceAdmissionResolver.ts",
);
const intent = read("src/services/xinmaiRealityEncounterIntentController.ts");
const gravityAdmission = read(
  "src/services/xinmaiGravityEntryAdmissionController.ts",
);
const realityProof = read(
  "src/services/xinmaiChoiceReturningRealityProofAdapter.ts",
);
const gravityPage = read("src/pages/GravityPage.tsx");
const launch = read("src/pages/LaunchLab.tsx");
const surface = read("src/components/XinmaiLivedResponseReturnSurface.tsx");

for (const marker of [
  'XINMAI_REALITY_ADVENTURE_CONTINUITY_DATABASE_VERSION =\n  1 as const',
  '"XINMAI_REALITY_ADVENTURE_ENCOUNTER_CONTINUITY_V1"',
  '"XINMAI_REALITY_ADVENTURE_ENCOUNTER_CONTINUITY_V2"',
  "departureReconciliation",
]) assertIncludes(types, marker, "logical V2 contract");
for (const marker of [
  "RealityAdventureDepartureReconciliation",
  "XinmaiChoiceDepartureReconciliationProof",
  'state: "EXPLICIT_DEPARTURE_RECONCILED"',
  "crossStoreAtomicityClaim: false",
]) assertIncludes(reconciliationTypes, marker, "reconciliation type");
for (const marker of [
  "deterministicActiveIdentityKey",
  'value.lifecycle === "TERMINAL"',
  "value.activeIdentityKey !== undefined",
  'value.lifecycle !== "TERMINAL"',
  '"XINMAI_REALITY_ADVENTURE_ENCOUNTER_CONTINUITY_V2"',
]) assertIncludes(store, marker, "cross-field validator");
assert(
  !store.includes("XINMAI_REALITY_ADVENTURE_CONTINUITY_DATABASE_VERSION = 2"),
  "physical Reality DB version changed",
);

for (const marker of [
  "terminalizeXinmaiRealityAdventureLifecycleRecord",
  "reconcileXinmaiChoiceExplicitDeparture",
  "readXinmaiChoiceDepartureReconciliation",
  "activeIdentityKey: undefined",
  'status: "ALREADY_RECONCILED"',
  'terminalReason: "EXPLICIT_LEAVE"',
  "transactRealityAdventureContinuity",
]) assertIncludes(owner, marker, "single lifecycle owner");
assert(
  /"(?:ENABLED|PAUSED)" as XinmaiRealityAdventureLifecycleReconciliationMutationPolicy/.test(
    policy,
  ),
  "forward policy must be ENABLED or PAUSED",
);
assertIncludes(
  policy,
  '| "PAUSED";',
  "forward policy safe-withheld state",
);
assertIncludes(
  policy,
  "isXinmaiRealityAdventureLifecycleReconciliationMutationEnabled",
  "forward policy predicate",
);

const serviceFiles = fs
  .readdirSync("src/services")
  .filter((file) => file.endsWith(".ts"));
const directReleaseOwners = serviceFiles.filter((file) =>
  read(path.join("src/services", file)).includes("activeIdentityKey: undefined"),
);
assert(
  directReleaseOwners.length === 1 &&
    directReleaseOwners[0] ===
      "xinmaiRealityAdventureLifecycleReconciliationController.ts",
  `activeIdentityKey release owners invalid: ${directReleaseOwners.join(",")}`,
);

for (const marker of [
  "readXinmaiLivedGrowthCanonicalState",
  "createStableXinmaiGrowthReference",
  "observedGrowthEnvelopeRevision",
  "readOnly: true as const",
  "noBackfill: true as const",
]) assertIncludes(proof, marker, "typed Growth proof adapter");
for (const forbidden of ["localStorage", "sessionStorage", "document.", "window."]) {
  assert(!proof.includes(forbidden), `proof adapter owns forbidden ${forbidden}`);
}

for (const marker of [
  "createXinmaiChoiceDepartureReconciliationProof",
  "reconcileXinmaiChoiceExplicitDeparture",
  'status: "DEPARTURE_RECONCILIATION_PENDING"',
  "readXinmaiChoiceDepartureReconciliation",
  "departureReconciliationReferenceId:",
  "terminateRealityEncounter({",
]) assertIncludes(provenance, marker, "Departure/Return Saga");
for (const marker of [
  '"DEPARTURE_RECONCILIATION_PENDING"',
  '"DEPARTURE_RECONCILIATION_UNAVAILABLE"',
  '"DEPARTURE_RECONCILIATION_MISMATCH"',
]) assertIncludes(resolver, marker, "typed Returning admission");

for (const marker of [
  'reason: "ACTIVE_ADVENTURE_REQUIRES_CONTINUATION"',
  'reason: "DEPARTURE_RECONCILIATION_REQUIRED"',
  'input.origin === "CHOICE_RETURN" &&',
  '"MUTATION_PAUSED"',
  "terminalizeXinmaiRealityAdventureLifecycleRecord",
  '"XINMAI_REALITY_ADVENTURE_ENCOUNTER_CONTINUITY_V2"',
]) assertIncludes(intent, marker, "Reality request cutover");
assert(
  !intent.includes("activeIdentityKey: undefined"),
  "Reality Intent still releases activeIdentityKey directly",
);
assert(
  !gravityAdmission.includes("activeIdentityKey: undefined"),
  "Gravity Admission still releases activeIdentityKey directly",
);
for (const marker of [
  "departureReconciliationReferenceId",
  "sourceReconciliation",
  'source.record.lifecycle !== "TERMINAL"',
  "readXinmaiChoiceReturnTargetLifecycle",
  'record.activeIdentityKey === undefined',
]) assertIncludes(realityProof, marker, "Return source proof gate");

for (const marker of [
  "DepartureReconciliationPendingFocus",
  'state: "DEPARTURE_RECONCILIATION_PENDING" as const',
]) assertIncludes(gravityPage, marker, "Gravity pending presentation");
for (const marker of [
  "ACTIVE_ADVENTURE_REQUIRES_CONTINUATION",
  "DEPARTURE_RECONCILIATION_REQUIRED",
  "returningRealityIntentFeedback",
]) assertIncludes(launch, marker, "generic Returning feedback");
for (const marker of [
  'selected.state !== "DEPARTURE_RECONCILIATION_PENDING"',
  "重试协调",
  'selected.state !== "NO_FACT_TARGET_TERMINATION_PENDING"',
  "重试结束本次确认",
]) assertIncludes(surface, marker, "Returning retry surface");
for (const marker of [
  'state: "NO_FACT_TARGET_TERMINATION_PENDING" as const',
  '"TARGET_TERMINATION_UNAVAILABLE"',
  '"TARGET_TERMINATION_MISMATCH"',
]) assertIncludes(resolver, marker, "no-fact target recovery");

for (const source of [owner, proof, provenance, resolver, intent, gravityAdmission]) {
  for (const forbidden of ["data-*", "setTimeout(", "localStorage.setItem", "sessionStorage.setItem"]) {
    assert(!source.includes(forbidden), `authority contains forbidden ${forbidden}`);
  }
}

console.log(
  "[XINMAI REALITY GRAVITY DEPARTURE LIFECYCLE RECONCILIATION] PASS",
);
