import type { LifeArchetypeProfile } from "./originalSelfLifeSchema";
import type {
  PersonalStarBeastIdentityReference,
  StarBeastIdentitySource,
} from "./starBeastIdentitySource";
import type { ProductionIdentitySourceConvergenceAuthorizationResult } from "./productionIdentitySourceConvergenceAuthorization";

export type ProductionIdentitySourceConvergenceInput = Readonly<{
  authorizationResult: ProductionIdentitySourceConvergenceAuthorizationResult | null;
}>;

export type ProductionIdentitySourceConvergenceUnavailableReason =
  | "AUTHORIZATION_RESULT_REQUIRED"
  | "AUTHORIZATION_RESULT_UNAVAILABLE";

export type ProductionIdentitySourceConvergenceBlockedReason =
  | "AUTHORIZATION_RESULT_BLOCKED"
  | "AUTHORIZATION_BOUNDARY_INVALID"
  | "MANSION_SOURCE_INVALID"
  | "FOUR_SYMBOL_SOURCE_INVALID"
  | "MOTHER_CODE_SOURCE_INVALID"
  | "LIFE_ARCHETYPE_PROFILE_NOT_READY"
  | "LIFE_ARCHETYPE_SOURCE_INVALID"
  | "SOURCE_COMPONENT_REFERENCE_INVALID";

export type ProductionIdentitySourceConvergenceBoundary = Readonly<{
  convergenceOnly: true;
  isolatedExecutionOnly: true;
  referenceOnly: true;
  profileResolutionPerformed: true;
  noEngineInvocation: true;
  identityConvergencePerformed: true;
  noPersonalStarBeastEntityCreation: true;
  noUserInputBinding: true;
  noProductIntegration: true;
  noRendererInvocation: true;
  noStorageWrite: true;
  noLifeStateMutation: true;
}>;

export type ProductionIdentitySourceConvergenceReference = Readonly<{
  referenceType: "FORMAL_IDENTITY_SOURCE_CONVERGENCE";
  referenceId: string;
  authorizationReference: Extract<
    ProductionIdentitySourceConvergenceAuthorizationResult,
    { status: "AUTHORIZED" }
  >["authorizationReference"];
  identitySource: StarBeastIdentitySource;
  personalStarBeastIdentityReference: PersonalStarBeastIdentityReference;
  lifeArchetypeProfileReference: LifeArchetypeProfile;
  convergenceExecution: "PERFORMED_ISOLATED";
  identityConvergence: "PERFORMED_ISOLATED";
  personalStarBeastCreation: false;
  productionIntegration: false;
  userBinding: false;
  referenceOnly: true;
}>;

export type ProductionIdentitySourceConvergenceAvailable = Readonly<{
  status: "AVAILABLE";
  convergenceStatus: "FORMAL_IDENTITY_SOURCE_CONVERGENCE_AVAILABLE";
  source: "production_identity_source_convergence";
  input: ProductionIdentitySourceConvergenceInput;
  convergenceReference: ProductionIdentitySourceConvergenceReference;
  boundary: ProductionIdentitySourceConvergenceBoundary;
}>;

export type ProductionIdentitySourceConvergenceUnavailable = Readonly<{
  status: "UNAVAILABLE";
  convergenceStatus: "UNAVAILABLE";
  source: "production_identity_source_convergence";
  reason: ProductionIdentitySourceConvergenceUnavailableReason;
  input: ProductionIdentitySourceConvergenceInput;
  convergenceReference: null;
  boundary: Omit<ProductionIdentitySourceConvergenceBoundary, "profileResolutionPerformed" | "identityConvergencePerformed"> & {
    profileResolutionPerformed: false;
    identityConvergencePerformed: false;
  };
}>;

export type ProductionIdentitySourceConvergenceBlocked = Readonly<{
  status: "BLOCKED";
  convergenceStatus: "BLOCKED";
  source: "production_identity_source_convergence";
  reason: ProductionIdentitySourceConvergenceBlockedReason;
  input: ProductionIdentitySourceConvergenceInput;
  convergenceReference: null;
  boundary: Omit<ProductionIdentitySourceConvergenceBoundary, "profileResolutionPerformed" | "identityConvergencePerformed"> & {
    profileResolutionPerformed: false;
    identityConvergencePerformed: false;
  };
}>;

export type ProductionIdentitySourceConvergenceResult =
  | ProductionIdentitySourceConvergenceAvailable
  | ProductionIdentitySourceConvergenceUnavailable
  | ProductionIdentitySourceConvergenceBlocked;
