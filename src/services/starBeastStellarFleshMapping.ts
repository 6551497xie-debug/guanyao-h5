import type {
  StarBeastCosmicConsciousnessState,
  StarBeastPresenceReference,
} from "../types/starBeastCosmicConsciousness";
import type {
  StarBeastStellarFleshBoundaryFieldReference,
  StarBeastStellarFleshDensityReference,
  StarBeastStellarFleshInnerFieldReference,
  StarBeastStellarFleshMode,
  StarBeastStellarFleshResult,
  StarBeastStellarFleshState,
} from "../types/starBeastStellarFlesh";

type StellarFleshExpression = Readonly<{
  fleshMode: StarBeastStellarFleshMode;
  densityReference: StarBeastStellarFleshDensityReference;
  innerFieldReference: StarBeastStellarFleshInnerFieldReference;
  boundaryFieldReference: StarBeastStellarFleshBoundaryFieldReference;
}>;

const expressionReference = <
  const T extends Readonly<Record<string, string>>,
>(
  reference: T,
): T => Object.freeze(reference);

const STELLAR_FLESH_CONSCIOUSNESS_MAPPING: Readonly<
  Record<StarBeastCosmicConsciousnessState["consciousnessMode"], StellarFleshExpression>
> = Object.freeze({
  DORMANT: Object.freeze({
    fleshMode: "DORMANT",
    densityReference: expressionReference({
      referenceType: "STELLAR_FLESH_DENSITY_EXPRESSION",
      expressionState: "VOID",
    }),
    innerFieldReference: expressionReference({
      referenceType: "STELLAR_FLESH_INNER_FIELD_EXPRESSION",
      expressionState: "ABSENT",
    }),
    boundaryFieldReference: expressionReference({
      referenceType: "STELLAR_FLESH_BOUNDARY_FIELD_EXPRESSION",
      expressionState: "ABSENT",
    }),
  }),
  ORDERING: Object.freeze({
    fleshMode: "SEEDING",
    densityReference: expressionReference({
      referenceType: "STELLAR_FLESH_DENSITY_EXPRESSION",
      expressionState: "SPARSE_SUSPENDED",
    }),
    innerFieldReference: expressionReference({
      referenceType: "STELLAR_FLESH_INNER_FIELD_EXPRESSION",
      expressionState: "ABSENT",
    }),
    boundaryFieldReference: expressionReference({
      referenceType: "STELLAR_FLESH_BOUNDARY_FIELD_EXPRESSION",
      expressionState: "ABSENT",
    }),
  }),
  EMERGING: Object.freeze({
    fleshMode: "THIN_FIELD",
    densityReference: expressionReference({
      referenceType: "STELLAR_FLESH_DENSITY_EXPRESSION",
      expressionState: "SPARSE_LAYERED",
    }),
    innerFieldReference: expressionReference({
      referenceType: "STELLAR_FLESH_INNER_FIELD_EXPRESSION",
      expressionState: "EMERGING_TRANSLUCENT_FIELD",
    }),
    boundaryFieldReference: expressionReference({
      referenceType: "STELLAR_FLESH_BOUNDARY_FIELD_EXPRESSION",
      expressionState: "FORMING",
    }),
  }),
  AWAKENING: Object.freeze({
    fleshMode: "SETTLING_FIELD",
    densityReference: expressionReference({
      referenceType: "STELLAR_FLESH_DENSITY_EXPRESSION",
      expressionState: "SETTLING_LAYERED",
    }),
    innerFieldReference: expressionReference({
      referenceType: "STELLAR_FLESH_INNER_FIELD_EXPRESSION",
      expressionState: "STABLE_TRANSLUCENT_FIELD",
    }),
    boundaryFieldReference: expressionReference({
      referenceType: "STELLAR_FLESH_BOUNDARY_FIELD_EXPRESSION",
      expressionState: "STABLE",
    }),
  }),
  QUIET_PRESENCE: Object.freeze({
    fleshMode: "STABLE_LIVING_FIELD",
    densityReference: expressionReference({
      referenceType: "STELLAR_FLESH_DENSITY_EXPRESSION",
      expressionState: "SETTLED_LAYERED",
    }),
    innerFieldReference: expressionReference({
      referenceType: "STELLAR_FLESH_INNER_FIELD_EXPRESSION",
      expressionState: "STABLE_TRANSLUCENT_FIELD",
    }),
    boundaryFieldReference: expressionReference({
      referenceType: "STELLAR_FLESH_BOUNDARY_FIELD_EXPRESSION",
      expressionState: "STABLE",
    }),
  }),
});

const blocked = (
  consciousnessReference: StarBeastCosmicConsciousnessState,
  reason: Extract<StarBeastStellarFleshResult, { status: "BLOCKED" }>["reason"],
): StarBeastStellarFleshResult =>
  Object.freeze({
    status: "BLOCKED",
    reason,
    consciousnessReference,
    noStellarFleshState: true,
  });

export function resolveStarBeastStellarFlesh(
  consciousnessReference: StarBeastCosmicConsciousnessState,
): StarBeastStellarFleshResult {
  if (
    consciousnessReference.semanticRole !==
      "STAR_BEAST_COSMIC_CONSCIOUSNESS_STATE" ||
    consciousnessReference.expressionReferenceOnly !== true
  ) {
    return blocked(
      consciousnessReference,
      "COSMIC_CONSCIOUSNESS_SOURCE_INVALID",
    );
  }

  if (
    consciousnessReference.isolatedPrototypeScope !==
    "ISOLATED_PROTOTYPE_ONLY"
  ) {
    return blocked(consciousnessReference, "ISOLATED_SCOPE_REQUIRED");
  }

  const expression =
    STELLAR_FLESH_CONSCIOUSNESS_MAPPING[
      consciousnessReference.consciousnessMode
    ];
  if (!expression) {
    return blocked(consciousnessReference, "CONSCIOUSNESS_MODE_INVALID");
  }

  const presenceReference: StarBeastPresenceReference =
    consciousnessReference.presenceReference;
  const state: StarBeastStellarFleshState = Object.freeze({
    semanticRole: "STAR_BEAST_STELLAR_FLESH_STATE",
    ...expression,
    consciousnessReference,
    presenceReference,
    isolatedPrototypeScope: "ISOLATED_PROTOTYPE_ONLY",
    expressionReferenceOnly: true,
    noVisualFactCopy: true,
    noSourceInference: true,
    noAssetMutation: true,
    noGenesisStateMutation: true,
    noLifeStateMutation: true,
    noRendererContractMutation: true,
    noMemoryCreation: true,
  });

  return Object.freeze({ status: "AVAILABLE", state });
}

export const STAR_BEAST_STELLAR_FLESH_CONSCIOUSNESS_MAPPING =
  STELLAR_FLESH_CONSCIOUSNESS_MAPPING;
