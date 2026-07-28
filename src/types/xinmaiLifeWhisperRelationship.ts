export type LifeWhisperRelationshipFact =
  | "NONE"
  | "WHISPER_SUBMITTED"
  | "WHISPER_SKIPPED";

export type LifeWhisperRelationshipResponsePhase =
  | "DORMANT"
  | "RESPONDING"
  | "SETTLED"
  | "SKIPPED";

export type LifeWhisperRelationshipVisualFact = Readonly<{
  lifeWhisperFact: LifeWhisperRelationshipFact;
  lifeWhisperResponsePhase: LifeWhisperRelationshipResponsePhase;
}>;

export const DORMANT_LIFE_WHISPER_RELATIONSHIP_VISUAL_FACT:
  LifeWhisperRelationshipVisualFact = Object.freeze({
    lifeWhisperFact: "NONE",
    lifeWhisperResponsePhase: "DORMANT",
  });
