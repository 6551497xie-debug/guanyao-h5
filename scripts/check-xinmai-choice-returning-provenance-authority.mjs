import fs from "node:fs";

const read = (path) => fs.readFileSync(path, "utf8");
const types = read("src/types/xinmaiChoiceReturningProvenance.ts");
const envelope = read("src/types/xinmaiLivedGrowthRecovery.ts");
const persistence = read("src/services/xinmaiLivedGrowthRecoveryPersistenceAdapter.ts");
const storeTypes = read("src/types/xinmaiLivedGrowthTransactionalStore.ts");
const controller = read("src/services/xinmaiChoiceReturningProvenanceController.ts");
const proof = read("src/services/xinmaiChoiceReturningRealityProofAdapter.ts");
const resolutionProof = read("src/services/xinmaiChoiceReturnResolutionProofAdapter.ts");
const resolver = read("src/services/xinmaiChoiceReturningProvenanceAdmissionResolver.ts");
const recovery = read("src/services/xinmaiChoiceReturningProvenanceRecoveryAdapter.ts");
const fact = read("src/services/xinmaiLivedResponseAuthorityController.ts");
const intent = read("src/services/xinmaiRealityEncounterIntentController.ts");
const route = read("src/pages/RealityProductionRouteEntry.tsx");
const gravity = read("src/pages/GravityPage.tsx");
const launch = read("src/pages/LaunchLab.tsx");
const surface = read("src/components/XinmaiLivedResponseReturnSurface.tsx");
const surfaceStyles = read("src/styles/xinmai-lived-response-checkpoint.css");
const departureProof = read("src/services/xinmaiChoiceDepartureReconciliationProofAdapter.ts");
const lifecycleOwner = read("src/services/xinmaiRealityAdventureLifecycleReconciliationController.ts");

const assertIncludes = (source, marker) => {
  if (!source.includes(marker)) throw new Error(`missing ${marker}`);
};

for (const marker of [
  "XINMAI_CHOICE_DEPARTURE_RECEIPT_V1",
  "XINMAI_CHOICE_RETURN_RECEIPT_V1",
  "noTargetEncounterYet: true",
  "userExplicitDeparture: true",
  "userExplicitReturn: true",
  "noActionCompletionClaim: true",
]) assertIncludes(types, marker);

assertIncludes(envelope, "XINMAI_LIVED_GROWTH_RECOVERY_V2");
assertIncludes(envelope, "choiceExplicitDepartureReceipts");
assertIncludes(envelope, "choiceExplicitReturnReceipts");
assertIncludes(storeTypes, "XINMAI_LIVED_GROWTH_DATABASE_VERSION = 3");
for (const marker of [
  "isXinmaiLivedGrowthLegacyEnvelopeV1",
  "upgradeXinmaiLivedGrowthEnvelopeV1",
  "choiceExplicitDepartureReceipts: Object.freeze([])",
  "choiceExplicitReturnReceipts: Object.freeze([])",
]) assertIncludes(persistence, marker);

for (const marker of [
  'commandType: "CONFIRM_CHOICE_DEPARTURE" as const',
  'state: "DORMANT_DEPARTURE" as const',
  'origin: "CHOICE_RETURN"',
  'qualification: "EXPLICIT_RETURN_TO_CHOICE"',
  'commandType: "CONFIRM_CHOICE_RETURN" as const',
  'state: "READY_FOR_LIVED_RESPONSE" as const',
  'commandType: "RESOLVE_CHOICE_RETURN_WITHOUT_FACT" as const',
  "executeXinmaiLivedGrowthTransaction(",
]) assertIncludes(controller, marker);

if (
  controller.indexOf('commandType: "CONFIRM_CHOICE_DEPARTURE"') >
  controller.indexOf("requestRealityEncounter({")
) {
  throw new Error("Departure must commit before Return creates Reality Intent");
}

for (const marker of [
  "readRealityAdventureContinuity({",
  'kind: "ENCOUNTER"',
  'origin !== "CHOICE_RETURN"',
  'qualification !== "EXPLICIT_RETURN_TO_CHOICE"',
  "readOnly: true as const",
  "noStorageWrite: true as const",
]) assertIncludes(proof, marker);

for (const state of [
  "RESUME_COMMITTED",
  "DEPARTURE_RECONCILIATION_PENDING",
  "DORMANT_DEPARTURE",
  "READY_FOR_LIVED_RESPONSE",
  "RESUME_REPORTED",
  "TERMINAL_BY_GROWTH",
  "SAFE_WITHHELD",
]) assertIncludes(resolver, state);

assertIncludes(recovery, "readXinmaiChoiceReturningProvenanceAdmissions");
assertIncludes(recovery, "readOnly: true as const");

for (const marker of [
  "choiceExplicitReturnReceipts: Object.freeze(",
  'state: "CONSUMED_BY_FACT" as const',
  "consumedLivedResponseReferenceId: fact.livedResponseReferenceId",
  "validateXinmaiChoiceReturningRealityProof(",
  "isXinmaiChoiceReturningProvenanceMutationEnabled()",
]) assertIncludes(fact, marker);

for (const marker of [
  "readXinmaiChoiceReturnResolutionProof(currentIntent)",
  'currentIntent?.origin === "CHOICE_RETURN"',
]) assertIncludes(route, marker);
assertIncludes(
  resolutionProof,
  'admission.returnReceipt.state === "CONSUMED_BY_FACT"',
);

for (const marker of [
  'origin === "CHOICE_RETURN"',
  'returnIntentRequestReferenceId ===',
  "activeChoiceReturnRecovery",
  'kind: "ENCOUNTER" as const',
  'record.lifecycle === "TERMINAL"',
  'record.terminalReason === "EXPLICIT_LEAVE"',
  "departureReconciliationReferenceId",
  'reason: "DEPARTURE_RECONCILIATION_REQUIRED"',
  'reason: "ACTIVE_ADVENTURE_REQUIRES_CONTINUATION"',
]) assertIncludes(intent, marker);

for (const marker of [
  "readXinmaiLivedGrowthCanonicalState",
  "createStableXinmaiGrowthReference",
  "readOnly: true as const",
]) assertIncludes(departureProof, marker);
for (const marker of [
  "reconcileXinmaiChoiceExplicitDeparture",
  "activeIdentityKey: undefined",
  'status: "ALREADY_RECONCILED"',
]) assertIncludes(lifecycleOwner, marker);

assertIncludes(gravity, "await confirmXinmaiChoiceExplicitDeparture({");
if (gravity.includes("requestRealityEncounter({")) {
  throw new Error("Departure still creates a Reality Intent");
}
assertIncludes(gravity, "DormantRealLifeDepartureFocus");
assertIncludes(launch, "readXinmaiChoiceReturningProvenanceRecovery(");
assertIncludes(launch, "beginXinmaiPostOwnershipNextRealityCycle(");
assertIncludes(launch, 'nextRealityCycle:');
if (launch.includes('choiceReturn:\n                          "CHOICE_RETURN_LIVED_RESPONSE_RESOLVED"')) {
  throw new Error("completed Return consumer still reuses the old Reality Intent");
}
assertIncludes(surface, "confirmXinmaiChoiceExplicitReturn({");
assertIncludes(surface, "我回来了");
assertIncludes(surfaceStyles, "pointer-events: auto");
assertIncludes(surface, 'window.matchMedia("(prefers-reduced-motion: reduce)")');
for (const forbidden of [
  "readOpenXinmaiLivedGrowthReturnItems",
  "bindChoiceActionIntentionToRealityEncounter",
]) {
  if ((gravity + launch).includes(forbidden)) {
    throw new Error(`production consumer still uses ${forbidden}`);
  }
}
for (const source of [controller, proof, departureProof, lifecycleOwner, resolutionProof, resolver, recovery]) {
  if (source.includes("localStorage") || source.includes("sessionStorage")) {
    throw new Error("provenance authority bypasses typed stores");
  }
}

console.log("[XINMAI CHOICE RETURNING PROVENANCE AUTHORITY] PASS");
