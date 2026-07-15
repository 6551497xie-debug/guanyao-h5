import type { LifeJourneyStageAuthorityDeclarationConsumption } from "../services/lifeJourneyStageAuthorityDeclarationEndpoint";

type AuthorityDeclarationAvailable = Extract<
  LifeJourneyStageAuthorityDeclarationConsumption,
  { status: "AVAILABLE" }
>;

type AuthorityDeclarationNotApplicable = Extract<
  LifeJourneyStageAuthorityDeclarationConsumption,
  { status: "NOT_APPLICABLE" }
>;

type AuthorityDeclarationUnavailable = Extract<
  LifeJourneyStageAuthorityDeclarationConsumption,
  { status: "UNAVAILABLE" }
>;

export type StarBeastMemoryReferenceKind =
  | "CRYSTAL"
  | "JOURNEY"
  | "LIFE_SUBJECT";

export type StarBeastMemoryReference<
  Kind extends StarBeastMemoryReferenceKind,
> = Readonly<{
  referenceType: Kind;
  referenceId: string;
}>;

export type StarBeastMemoryCrystalReference =
  StarBeastMemoryReference<"CRYSTAL">;

export type StarBeastMemoryJourneyReference =
  StarBeastMemoryReference<"JOURNEY">;

export type StarBeastMemoryLifeSubjectReference =
  StarBeastMemoryReference<"LIFE_SUBJECT">;

export type StarBeastMemoryEligibilityInput = Readonly<{
  authorityDeclarationConsumptionResult: LifeJourneyStageAuthorityDeclarationConsumption;
  crystalReference: StarBeastMemoryCrystalReference | null;
  journeyReference: StarBeastMemoryJourneyReference | null;
  lifeSubjectReference: StarBeastMemoryLifeSubjectReference | null;
}>;

export type StarBeastMemoryEligibilityReason =
  "DECLARED_EXPERIENCE_WITH_COMPLETE_REFERENCES";

export type StarBeastMemoryCandidate = Readonly<{
  semanticRole: "STAR_BEAST_MEMORY_CANDIDATE";
  sourceDeclarationReference: AuthorityDeclarationAvailable["declaration"];
  journeyReference: StarBeastMemoryJourneyReference;
  crystalReference: StarBeastMemoryCrystalReference;
  eligibilityReason: StarBeastMemoryEligibilityReason;
  notMemory: true;
  noMemoryWrite: true;
}>;

export type StarBeastMemoryEligibilityAvailable = Readonly<{
  status: "AVAILABLE";
  source: "star_beast_memory_eligibility";
  input: StarBeastMemoryEligibilityInput;
  authorityDeclarationConsumptionResult: AuthorityDeclarationAvailable;
  candidate: StarBeastMemoryCandidate;
}>;

export type StarBeastMemoryEligibilityNotApplicable = Readonly<{
  status: "NOT_APPLICABLE";
  source: "star_beast_memory_eligibility";
  reason: "AUTHORITY_DECLARATION_NOT_APPLICABLE";
  input: StarBeastMemoryEligibilityInput;
  authorityDeclarationConsumptionResult: AuthorityDeclarationNotApplicable;
  notError: true;
  noMemoryCandidate: true;
}>;

export type StarBeastMemoryEligibilityUnavailableReason =
  | "AUTHORITY_DECLARATION_UNAVAILABLE"
  | "CRYSTAL_REFERENCE_REQUIRED"
  | "JOURNEY_REFERENCE_REQUIRED"
  | "LIFE_SUBJECT_REFERENCE_REQUIRED";

export type StarBeastMemoryEligibilityUnavailable = Readonly<{
  status: "UNAVAILABLE";
  source: "star_beast_memory_eligibility";
  reason: StarBeastMemoryEligibilityUnavailableReason;
  input: StarBeastMemoryEligibilityInput;
  authorityDeclarationConsumptionResult:
    | AuthorityDeclarationAvailable
    | AuthorityDeclarationUnavailable;
  noMemoryCandidate: true;
}>;

export type StarBeastMemoryEligibilityResult =
  | StarBeastMemoryEligibilityAvailable
  | StarBeastMemoryEligibilityNotApplicable
  | StarBeastMemoryEligibilityUnavailable;
