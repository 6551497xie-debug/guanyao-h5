import type { LifeArchetypeProfile } from "./originalSelfLifeSchema";
import type {
  PersonalStarBeastIdentityReference,
  StarBeastIdentitySource,
} from "./starBeastIdentitySource";
import type { ProductionIdentitySourceConvergenceResult } from "./productionIdentitySourceConvergence";

export type PersonalStarBeastIdentityProductReadinessInput = Readonly<{
  convergenceResult: ProductionIdentitySourceConvergenceResult | null;
}>;

export type PersonalStarBeastIdentityProductReadinessUnavailableReason =
  | "CONVERGENCE_RESULT_REQUIRED"
  | "CONVERGENCE_RESULT_UNAVAILABLE";

export type PersonalStarBeastIdentityProductReadinessBlockedReason =
  | "CONVERGENCE_RESULT_BLOCKED"
  | "CONVERGENCE_BOUNDARY_INVALID"
  | "IDENTITY_REFERENCE_INVALID"
  | "IDENTITY_SOURCE_INVALID"
  | "LIFE_ARCHETYPE_REFERENCE_INVALID";

export type PersonalStarBeastIdentityProductReadinessBoundary = Readonly<{
  readinessOnly: true;
  productConsumptionReadinessOnly: true;
  referenceOnly: true;
  noEngineInvocation: true;
  noProductConsumption: true;
  noUserBinding: true;
  noRendererInvocation: true;
  noStorageWrite: true;
  noVisualAssetCreation: true;
  noLifeStateMutation: true;
}>;

export type PersonalStarBeastIdentityProductReadinessReference = Readonly<{
  referenceType: "PERSONAL_STAR_BEAST_IDENTITY_PRODUCT_CONSUMPTION_READINESS";
  referenceId: string;
  identityReference: PersonalStarBeastIdentityReference;
  identitySourceReference: StarBeastIdentitySource;
  lifeArchetypeProfileReference: LifeArchetypeProfile;
  consumptionScope: "PRODUCT_EXPERIENCE_REFERENCE_ONLY";
  productConsumption: "NOT_PERFORMED";
  userBinding: false;
  rendererConsumption: false;
  storageWrite: false;
  referenceOnly: true;
}>;

export type PersonalStarBeastIdentityProductReadinessReady = Readonly<{
  status: "READY";
  readiness: "READY_FOR_PERSONAL_STAR_BEAST_IDENTITY_PRODUCT_CONSUMPTION";
  source: "personal_star_beast_identity_product_readiness";
  input: PersonalStarBeastIdentityProductReadinessInput;
  readinessReference: PersonalStarBeastIdentityProductReadinessReference;
  boundary: PersonalStarBeastIdentityProductReadinessBoundary;
}>;

export type PersonalStarBeastIdentityProductReadinessUnavailable = Readonly<{
  status: "UNAVAILABLE";
  readiness: "UNAVAILABLE";
  source: "personal_star_beast_identity_product_readiness";
  reason: PersonalStarBeastIdentityProductReadinessUnavailableReason;
  input: PersonalStarBeastIdentityProductReadinessInput;
  readinessReference: null;
  boundary: PersonalStarBeastIdentityProductReadinessBoundary;
}>;

export type PersonalStarBeastIdentityProductReadinessBlocked = Readonly<{
  status: "BLOCKED";
  readiness: "BLOCKED";
  source: "personal_star_beast_identity_product_readiness";
  reason: PersonalStarBeastIdentityProductReadinessBlockedReason;
  input: PersonalStarBeastIdentityProductReadinessInput;
  readinessReference: null;
  boundary: PersonalStarBeastIdentityProductReadinessBoundary;
}>;

export type PersonalStarBeastIdentityProductReadinessResult =
  | PersonalStarBeastIdentityProductReadinessReady
  | PersonalStarBeastIdentityProductReadinessUnavailable
  | PersonalStarBeastIdentityProductReadinessBlocked;
