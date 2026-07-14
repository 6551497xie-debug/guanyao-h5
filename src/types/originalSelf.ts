import type { CurrentHexagramProfile, YaoTransmissionProfile } from "./guanyaoCausalEngine";
import type { FourSymbol, TwentyEightMansion } from "./guanyaoStarbeast";
import type { CrystalState } from "./personaTransmission";

export type OriginalSelfSemanticPath = readonly [
  "ORIGINAL_SELF",
  "STAR_BEAST",
  "LIFE_ARCHETYPE",
  "HEXAGRAM",
  "YAO",
  "CRYSTAL",
];

export type OriginalSelfJourneyPhase = OriginalSelfSemanticPath[number];

export type LifeArchetypeState = Readonly<{
  source: "starBeast";
  semanticRole: "LIFE_ARCHETYPE";
  fourSymbol: FourSymbol;
  stableOrigin: true;
  nonFinalIdentity: true;
}>;

export type StarBeastSemanticBoundary = Readonly<{
  originalSelfManifestation: true;
  notRole: true;
  notPet: true;
  notPersonalityLabel: true;
}>;

export type StarBeastState = Readonly<{
  source: "starbeast_derivation";
  semanticRole: "ORIGINAL_SELF_LIFE_MANIFESTATION";
  fourSymbol: FourSymbol;
  mansion?: TwentyEightMansion;
  lifeArchetype: LifeArchetypeState;
  boundary: StarBeastSemanticBoundary;
}>;

export type JourneyState = Readonly<{
  source: "lifeArchetype";
  semanticPath: OriginalSelfSemanticPath;
  currentPhase: OriginalSelfJourneyPhase;
  lifeArchetype: LifeArchetypeState;
  hexagram: CurrentHexagramProfile | null;
  yao: YaoTransmissionProfile | null;
  crystal: CrystalState | null;
}>;

export type OriginalSelfFoundationGuardrails = Readonly<{
  noMotherCodeMutation: true;
  noHexagramGeneration: true;
  noCrystalEngineMutation: true;
  noStorageWrite: true;
  noUIContract: true;
  noAIDependency: true;
}>;

export type OriginalSelfState = Readonly<{
  semanticRole: "ORIGINAL_SELF";
  starBeast: StarBeastState;
  journey: JourneyState;
  guardrails: OriginalSelfFoundationGuardrails;
}>;
