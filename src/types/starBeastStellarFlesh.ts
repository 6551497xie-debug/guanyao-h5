import type {
  StarBeastCosmicConsciousnessState,
  StarBeastPresenceReference,
} from "./starBeastCosmicConsciousness";

export type StarBeastStellarFleshMode =
  | "DORMANT"
  | "SEEDING"
  | "THIN_FIELD"
  | "SETTLING_FIELD"
  | "STABLE_LIVING_FIELD";

export type StarBeastStellarFleshDensityReference = Readonly<{
  referenceType: "STELLAR_FLESH_DENSITY_EXPRESSION";
  expressionState:
    | "VOID"
    | "SPARSE_SUSPENDED"
    | "SPARSE_LAYERED"
    | "SETTLING_LAYERED"
    | "SETTLED_LAYERED";
}>;

export type StarBeastStellarFleshInnerFieldReference = Readonly<{
  referenceType: "STELLAR_FLESH_INNER_FIELD_EXPRESSION";
  expressionState:
    | "ABSENT"
    | "EMERGING_TRANSLUCENT_FIELD"
    | "STABLE_TRANSLUCENT_FIELD";
}>;

export type StarBeastStellarFleshBoundaryFieldReference = Readonly<{
  referenceType: "STELLAR_FLESH_BOUNDARY_FIELD_EXPRESSION";
  expressionState: "ABSENT" | "FORMING" | "STABLE";
}>;

export type StarBeastStellarFleshState = Readonly<{
  semanticRole: "STAR_BEAST_STELLAR_FLESH_STATE";
  fleshMode: StarBeastStellarFleshMode;
  densityReference: StarBeastStellarFleshDensityReference;
  innerFieldReference: StarBeastStellarFleshInnerFieldReference;
  boundaryFieldReference: StarBeastStellarFleshBoundaryFieldReference;
  consciousnessReference: StarBeastCosmicConsciousnessState;
  presenceReference: StarBeastPresenceReference;
  isolatedPrototypeScope: "ISOLATED_PROTOTYPE_ONLY";
  expressionReferenceOnly: true;
  noVisualFactCopy: true;
  noSourceInference: true;
  noAssetMutation: true;
  noGenesisStateMutation: true;
  noLifeStateMutation: true;
  noRendererContractMutation: true;
  noMemoryCreation: true;
}>;

export type StarBeastStellarFleshResult =
  | Readonly<{
      status: "AVAILABLE";
      state: StarBeastStellarFleshState;
    }>
  | Readonly<{
      status: "BLOCKED";
      reason:
        | "COSMIC_CONSCIOUSNESS_SOURCE_INVALID"
        | "ISOLATED_SCOPE_REQUIRED"
        | "CONSCIOUSNESS_MODE_INVALID";
      consciousnessReference: StarBeastCosmicConsciousnessState;
      noStellarFleshState: true;
    }>;
