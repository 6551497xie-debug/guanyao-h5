import type { LifeArchetypeProfile } from "./originalSelfLifeSchema";
import type {
  StarBeastGenesisFourSymbolResultReference,
  StarBeastGenesisMansionResultReference,
  StarBeastGenesisMotherCodeProfileReference,
} from "./starBeastGenesisSourceIdentity";

export type StarBeastMansionSeedSource = Readonly<{
  semanticRole: "BIRTH_MANSION_LIFE_SEED";
  sourceMansionResultReference: StarBeastGenesisMansionResultReference;
  noFourSymbolSubstitution: true;
  noMotherCodeSubstitution: true;
}>;

export type StarBeastFourSymbolFieldSource = Readonly<{
  semanticRole: "FOUR_SYMBOL_MORPHOLOGICAL_FIELD";
  sourceFourSymbolResultReference: StarBeastGenesisFourSymbolResultReference;
  noAnimalModelGeneration: true;
  noMotherCodeInference: true;
}>;

export type StarBeastLifeArchetypeForceSource = Readonly<{
  semanticRole: "LIFE_ARCHETYPE_FORCE";
  sourceMotherCodeProfileReference: StarBeastGenesisMotherCodeProfileReference;
  sourceLifeArchetypeProfileReference: LifeArchetypeProfile;
  noFourSymbolGeneration: true;
  noMansionSourceMutation: true;
}>;

export type PersonalStarBeastIdentityReference = Readonly<{
  referenceType: "PERSONAL_STAR_BEAST_IDENTITY_SOURCE";
  referenceId: string;
  semanticRole: "MANSION_SEED_FIELD_FORCE_CONVERGENCE";
  notFourSymbolAnimal: true;
  notGeneratedAsset: true;
  notLifeState: true;
}>;

export type StarBeastIdentitySource = Readonly<{
  semanticRole: "STAR_BEAST_IDENTITY_SOURCE";
  mansionSeed: StarBeastMansionSeedSource;
  fourSymbolField: StarBeastFourSymbolFieldSource;
  lifeArchetypeForce: StarBeastLifeArchetypeForceSource;
  personalStarBeastReference: PersonalStarBeastIdentityReference;
  boundary: Readonly<{
    independentSourcesBeforeConvergence: true;
    mansionDoesNotInferFourSymbolField: true;
    fourSymbolDoesNotInferLifeArchetypeForce: true;
    motherCodeDoesNotChangeMansionSource: true;
    identitySourceOnly: true;
    noPersonalStarBeastEntityCreation: true;
    noRendererAssetCreation: true;
  }>;
}>;
