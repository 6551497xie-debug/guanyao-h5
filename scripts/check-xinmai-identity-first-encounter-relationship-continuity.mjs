import { readFileSync } from "node:fs";

const read = (path) => readFileSync(path, "utf8");
const assert = (condition, message) => {
  if (!condition) {
    throw new Error(`[identity-first-encounter-relationship] ${message}`);
  }
};

const types = read("src/types/xinmaiLifeCompanionRelationshipCanonical.ts");
const policy = read("src/services/xinmaiLifeCompanionCanonicalMutationPolicy.ts");
const controller = read("src/services/xinmaiLifeCompanionRelationshipAuthorityController.ts");
const recovery = read("src/services/xinmaiLifeCompanionCanonicalRecoveryAdapter.ts");
const genesis = read("src/pages/GenesisProductionExperiencePage.tsx");

for (const value of [
  "XINMAI_LIFE_COMPANION_RELATIONSHIP_V1",
  "XINMAI_LIFE_COMPANION_FIRST_ENCOUNTER_RECEIPT_V1",
  "XINMAI_LIFE_COMPANION_RELATIONSHIP_PROTOCOL_2026_08_13_P1",
  'state: "COMPANIONSHIP_CONFIRMED"',
  "noRawWhisperPersistence: true",
]) {
  assert(types.includes(value), `missing frozen relationship contract: ${value}`);
}

assert(
  policy.includes('"ENABLED" as "ENABLED" | "SAFE_WITHHELD"') &&
    policy.includes("createsRealityIntent: false") &&
    policy.includes("writesLifeWhisper: false") &&
    policy.includes("writesNaming: false"),
  "forward relationship policy is missing",
);
assert(
  controller.includes("commitXinmaiLifeCompanionCanonicalRelationship") &&
    controller.includes('type !== "CONFIRM_COMPANIONSHIP"') &&
    controller.includes("noRawWhisperPersistence: true") &&
    !controller.includes("whisperText"),
  "first encounter is not identity-bound or persists private whisper text",
);
assert(
  recovery.includes('status: "READY"') &&
    recovery.includes("noNamingAsRelationship") &&
    recovery.includes("noLifeWhisperAsRelationship") &&
    recovery.includes("noRealityIntentAsRelationship"),
  "relationship recovery improperly consumes optional Naming",
);

assert(
  genesis.includes("XinmaiLifeCompanionRelationshipActivationSurface") &&
    !genesis.includes("requestRealityEncounter") &&
    !genesis.includes("commitXinmaiLifeCompanionFirstEncounter"),
  "formal Genesis did not cut over to the canonical Relationship consumer",
);
for (const copy of [
  "开始寻找远方生命",
  "认出这个生命",
  "现在，你可以决定是否从这里开始同行",
]) {
  assert(genesis.includes(copy), `missing user-visible journey action: ${copy}`);
}
assert(
  genesis.includes('data-life-whisper-entry="DEFERRED"') &&
    genesis.includes('data-relationship-naming-entry="DEFERRED"') &&
    genesis.includes('data-reality-entry="DEFERRED"'),
  "Genesis does not expose the typed First Encounter/Relationship state",
);

console.log("[XINMAI IDENTITY → FIRST ENCOUNTER → RELATIONSHIP] PASS");
