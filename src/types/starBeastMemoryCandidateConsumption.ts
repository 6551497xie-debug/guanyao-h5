import type {
  StarBeastMemoryCandidate,
  StarBeastMemoryEligibilityResult,
} from "./starBeastMemoryEligibility";

type MemoryEligibilityAvailable = Extract<
  StarBeastMemoryEligibilityResult,
  { status: "AVAILABLE" }
>;

type MemoryEligibilityNotApplicable = Extract<
  StarBeastMemoryEligibilityResult,
  { status: "NOT_APPLICABLE" }
>;

type MemoryEligibilityUnavailable = Extract<
  StarBeastMemoryEligibilityResult,
  { status: "UNAVAILABLE" }
>;

export type StarBeastMemoryCandidateConsumptionInput = Readonly<{
  memoryEligibilityResult: StarBeastMemoryEligibilityResult;
  candidateReference: StarBeastMemoryCandidate | null;
  sourceDeclarationReference:
    | StarBeastMemoryCandidate["sourceDeclarationReference"]
    | null;
}>;

export type StarBeastMemoryCandidateConsumptionReason =
  "ELIGIBLE_CANDIDATE_READY_FOR_FUTURE_MEMORY_ENGINE";

export type StarBeastMemoryCandidateConsumption = Readonly<{
  semanticRole: "STAR_BEAST_MEMORY_CANDIDATE_CONSUMPTION";
  candidateReference: StarBeastMemoryCandidate;
  sourceEligibilityReference: MemoryEligibilityAvailable;
  sourceDeclarationReference: StarBeastMemoryCandidate["sourceDeclarationReference"];
  consumptionStatus: "AVAILABLE_FOR_FUTURE_MEMORY_ENGINE";
  reason: StarBeastMemoryCandidateConsumptionReason;
  notMemory: true;
  notMemoryRecord: true;
  noMemoryWrite: true;
}>;

export type StarBeastMemoryCandidateConsumptionAvailable = Readonly<{
  status: "AVAILABLE";
  source: "star_beast_memory_candidate_consumption";
  input: StarBeastMemoryCandidateConsumptionInput;
  consumption: StarBeastMemoryCandidateConsumption;
}>;

export type StarBeastMemoryCandidateConsumptionNotApplicable = Readonly<{
  status: "NOT_APPLICABLE";
  source: "star_beast_memory_candidate_consumption";
  reason: "MEMORY_ELIGIBILITY_NOT_APPLICABLE";
  input: StarBeastMemoryCandidateConsumptionInput;
  sourceEligibilityReference: MemoryEligibilityNotApplicable;
  notError: true;
  noMemoryConsumption: true;
}>;

export type StarBeastMemoryCandidateConsumptionUnavailableReason =
  | "MEMORY_ELIGIBILITY_UNAVAILABLE"
  | "MEMORY_CANDIDATE_REFERENCE_REQUIRED"
  | "MEMORY_CANDIDATE_REFERENCE_MISMATCH"
  | "SOURCE_DECLARATION_REFERENCE_REQUIRED"
  | "SOURCE_DECLARATION_REFERENCE_MISMATCH";

export type StarBeastMemoryCandidateConsumptionUnavailable = Readonly<{
  status: "UNAVAILABLE";
  source: "star_beast_memory_candidate_consumption";
  reason: StarBeastMemoryCandidateConsumptionUnavailableReason;
  input: StarBeastMemoryCandidateConsumptionInput;
  sourceEligibilityReference:
    | MemoryEligibilityAvailable
    | MemoryEligibilityUnavailable;
  noMemoryConsumption: true;
}>;

export type StarBeastMemoryCandidateConsumptionResult =
  | StarBeastMemoryCandidateConsumptionAvailable
  | StarBeastMemoryCandidateConsumptionNotApplicable
  | StarBeastMemoryCandidateConsumptionUnavailable;
