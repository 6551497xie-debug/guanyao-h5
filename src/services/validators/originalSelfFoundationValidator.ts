import type { FourSymbol } from "../../types/guanyaoStarbeast";
import type { OriginalSelfJourneyPhase, OriginalSelfState } from "../../types/originalSelf";

export type OriginalSelfFoundationValidationStatus =
  | "VALID_ORIGINAL_SELF_FOUNDATION"
  | "ORIGINAL_SELF_FOUNDATION_INVALID";

export type OriginalSelfFoundationValidationReason =
  | "ROOT_INVALID"
  | "STAR_BEAST_INVALID"
  | "LIFE_ARCHETYPE_INVALID"
  | "FOUR_SYMBOL_MISMATCH"
  | "LIFE_ARCHETYPE_SOURCE_MISMATCH"
  | "SEMANTIC_PATH_INVALID"
  | "JOURNEY_PHASE_INVALID"
  | "JOURNEY_REFERENCE_INVALID"
  | "STAR_BEAST_BOUNDARY_INVALID"
  | "FOUNDATION_GUARDRAILS_INVALID"
  | "FOUNDATION_IMMUTABILITY_INVALID";

export type OriginalSelfFoundationValidationResult = Readonly<{
  status: OriginalSelfFoundationValidationStatus;
  reasons: readonly OriginalSelfFoundationValidationReason[];
}>;

const FOUR_SYMBOLS: readonly FourSymbol[] = ["青龙", "朱雀", "白虎", "玄武"];

const EXPECTED_ORIGINAL_SELF_SEMANTIC_PATH: readonly OriginalSelfJourneyPhase[] = [
  "ORIGINAL_SELF",
  "STAR_BEAST",
  "LIFE_ARCHETYPE",
  "HEXAGRAM",
  "YAO",
  "CRYSTAL",
];

const isRecord = (value: unknown): value is Record<string, unknown> =>
  typeof value === "object" && value !== null && !Array.isArray(value);

const isReferenceOrNull = (value: unknown): boolean => value === null || isRecord(value);

const hasExactTrueFlags = (value: unknown, keys: readonly string[]): boolean =>
  isRecord(value) && keys.every((key) => value[key] === true);

export const validateOriginalSelfFoundation = (
  state: unknown,
): OriginalSelfFoundationValidationResult => {
  const reasons: OriginalSelfFoundationValidationReason[] = [];

  if (!isRecord(state) || state.semanticRole !== "ORIGINAL_SELF") {
    return {
      status: "ORIGINAL_SELF_FOUNDATION_INVALID",
      reasons: ["ROOT_INVALID"],
    };
  }

  const starBeast = state.starBeast;
  const journey = state.journey;
  const guardrails = state.guardrails;
  const starBeastValid =
    isRecord(starBeast) &&
    starBeast.source === "starbeast_derivation" &&
    starBeast.semanticRole === "ORIGINAL_SELF_LIFE_MANIFESTATION";
  const journeyValid = isRecord(journey) && journey.source === "lifeArchetype";

  if (!starBeastValid) reasons.push("STAR_BEAST_INVALID");

  const starBeastLifeArchetype = starBeastValid ? starBeast.lifeArchetype : null;
  const journeyLifeArchetype = journeyValid ? journey.lifeArchetype : null;
  const lifeArchetypeValid =
    isRecord(starBeastLifeArchetype) &&
    starBeastLifeArchetype.source === "starBeast" &&
    starBeastLifeArchetype.semanticRole === "LIFE_ARCHETYPE" &&
    starBeastLifeArchetype.stableOrigin === true &&
    starBeastLifeArchetype.nonFinalIdentity === true;

  if (!lifeArchetypeValid) reasons.push("LIFE_ARCHETYPE_INVALID");

  const starBeastFourSymbol = starBeastValid ? starBeast.fourSymbol : null;
  const starBeastArchetypeFourSymbol = lifeArchetypeValid ? starBeastLifeArchetype.fourSymbol : null;
  const journeyArchetypeFourSymbol = isRecord(journeyLifeArchetype) ? journeyLifeArchetype.fourSymbol : null;
  if (
    !FOUR_SYMBOLS.includes(starBeastFourSymbol as FourSymbol) ||
    starBeastFourSymbol !== starBeastArchetypeFourSymbol ||
    starBeastFourSymbol !== journeyArchetypeFourSymbol
  ) {
    reasons.push("FOUR_SYMBOL_MISMATCH");
  }

  if (!journeyValid || starBeastLifeArchetype !== journeyLifeArchetype) {
    reasons.push("LIFE_ARCHETYPE_SOURCE_MISMATCH");
  }

  const semanticPath = journeyValid ? journey.semanticPath : null;
  if (
    !Array.isArray(semanticPath) ||
    semanticPath.length !== EXPECTED_ORIGINAL_SELF_SEMANTIC_PATH.length ||
    !EXPECTED_ORIGINAL_SELF_SEMANTIC_PATH.every((phase, index) => semanticPath[index] === phase)
  ) {
    reasons.push("SEMANTIC_PATH_INVALID");
  }

  if (
    !journeyValid ||
    !EXPECTED_ORIGINAL_SELF_SEMANTIC_PATH.includes(journey.currentPhase as OriginalSelfJourneyPhase)
  ) {
    reasons.push("JOURNEY_PHASE_INVALID");
  }

  if (
    !journeyValid ||
    !isReferenceOrNull(journey.hexagram) ||
    !isReferenceOrNull(journey.yao) ||
    !isReferenceOrNull(journey.crystal)
  ) {
    reasons.push("JOURNEY_REFERENCE_INVALID");
  }

  if (
    !starBeastValid ||
    !hasExactTrueFlags(starBeast.boundary, [
      "originalSelfManifestation",
      "notRole",
      "notPet",
      "notPersonalityLabel",
    ])
  ) {
    reasons.push("STAR_BEAST_BOUNDARY_INVALID");
  }

  if (
    !hasExactTrueFlags(guardrails, [
      "noMotherCodeMutation",
      "noHexagramGeneration",
      "noCrystalEngineMutation",
      "noStorageWrite",
      "noUIContract",
      "noAIDependency",
    ])
  ) {
    reasons.push("FOUNDATION_GUARDRAILS_INVALID");
  }

  if (
    !Object.isFrozen(state) ||
    !starBeastValid ||
    !Object.isFrozen(starBeast) ||
    !lifeArchetypeValid ||
    !Object.isFrozen(starBeastLifeArchetype) ||
    !journeyValid ||
    !Object.isFrozen(journey) ||
    !Array.isArray(semanticPath) ||
    !Object.isFrozen(semanticPath) ||
    !Object.isFrozen(starBeast.boundary) ||
    !isRecord(guardrails) ||
    !Object.isFrozen(guardrails)
  ) {
    reasons.push("FOUNDATION_IMMUTABILITY_INVALID");
  }

  return {
    status:
      reasons.length === 0
        ? "VALID_ORIGINAL_SELF_FOUNDATION"
        : "ORIGINAL_SELF_FOUNDATION_INVALID",
    reasons,
  };
};

export const OriginalSelfFoundationValidator = {
  validateOriginalSelfFoundation,
} as const;

export type ValidatedOriginalSelfState = OriginalSelfState;
