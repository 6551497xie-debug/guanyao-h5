import { readFileSync } from "node:fs";

const read = (path) => readFileSync(path, "utf8");
const assert = (condition, message) => {
  if (!condition) {
    throw new Error(`[identity-first-encounter-relationship] ${message}`);
  }
};

const types = read("src/types/xinmaiLifeCompanionRelationship.ts");
const policy = read("src/services/xinmaiLifeCompanionRelationshipRuntimePolicy.ts");
const controller = read("src/services/xinmaiLifeCompanionFirstEncounterController.ts");
const recovery = read("src/services/xinmaiLifeCompanionRelationshipRecoveryAdapter.ts");
const session = read("src/services/sessionService.ts");
const genesis = read("src/pages/GenesisProductionExperiencePage.tsx");
const reality = read("src/pages/RealityProductionRouteEntry.tsx");
const presentation = read("src/services/xinmaiRealityEntryPresentationResolver.ts");

for (const value of [
  "XINMAI_LIFE_COMPANION_FIRST_ENCOUNTER_V1",
  "XINMAI_LIFE_COMPANION_RELATIONSHIP_2026_08_13_P0",
  'encounterState: "FIRST_ENCOUNTER_COMPLETED"',
  'trustState: "FIRST_EXCHANGE_ESTABLISHED"',
  'companionState: "MET"',
  "rawWhisperPersisted: false",
]) {
  assert(types.includes(value), `missing frozen relationship contract: ${value}`);
}

assert(
  policy.includes('"ENABLED"') &&
    policy.includes('"SAFE_WITHHELD"'),
  "forward relationship policy is missing",
);
assert(
  controller.includes("resolveRecognizedRelationshipIdentityReferences") &&
    controller.includes("persistXinmaiLifeCompanionFirstEncounterReceipt") &&
    controller.includes('initiation === "SILENCE_CHOSEN"') &&
    controller.includes("rawWhisperPersisted: false") &&
    !controller.includes("whisperText"),
  "first encounter is not identity-bound or persists private whisper text",
);
assert(
  session.includes("readXinmaiLifeCompanionFirstEncounterReceipt") &&
    session.includes("persistXinmaiLifeCompanionFirstEncounterReceipt") &&
    session.includes("IDENTITY_REFERENCE_MISMATCH"),
  "first encounter receipt is not recoverable and identity-fenced",
);
assert(
  recovery.includes('status: "READY"') &&
    !recovery.includes("readStarBeastRelationshipNamingAsset") &&
    !recovery.includes("naming:"),
  "relationship recovery improperly consumes optional Naming",
);

const commitIndex = genesis.indexOf("commitXinmaiLifeCompanionFirstEncounter");
const requestIndex = genesis.indexOf("await requestRealityEncounter", commitIndex);
assert(
  commitIndex >= 0 && requestIndex > commitIndex,
  "Reality intent can be created before the First Encounter receipt",
);
for (const copy of [
  "开始寻找远方生命",
  "认出这个生命",
  "确认同行，进入现实",
]) {
  assert(genesis.includes(copy), `missing user-visible journey action: ${copy}`);
}
assert(
  genesis.includes("data-first-encounter-authority") &&
    genesis.includes("data-life-companion-relationship"),
  "Genesis does not expose the typed First Encounter/Relationship state",
);
assert(
  reality.includes("recoverXinmaiLifeCompanionRelationship") &&
    reality.includes('"LEGACY_HANDOFF"') &&
    !reality.includes("relationshipAvailable: identityRecovery.status"),
  "Reality still treats Identity as Relationship or lacks legacy read-only recovery",
);
assert(
  presentation.includes('relationshipReadiness:') &&
    presentation.includes('"NOT_ESTABLISHED"') &&
    presentation.includes('"RELATIONSHIP_UNAVAILABLE"'),
  "Reality Presentation does not distinguish missing from corrupt relationship evidence",
);

console.log("[XINMAI IDENTITY → FIRST ENCOUNTER → RELATIONSHIP] PASS");
