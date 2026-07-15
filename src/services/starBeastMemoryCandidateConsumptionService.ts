import type {
  StarBeastMemoryCandidateConsumption,
  StarBeastMemoryCandidateConsumptionInput,
  StarBeastMemoryCandidateConsumptionResult,
} from "../types/starBeastMemoryCandidateConsumption";

export function consumeStarBeastMemoryCandidate(
  input: StarBeastMemoryCandidateConsumptionInput,
): StarBeastMemoryCandidateConsumptionResult {
  const sourceEligibilityReference = input.memoryEligibilityResult;

  if (sourceEligibilityReference.status === "NOT_APPLICABLE") {
    return Object.freeze({
      status: "NOT_APPLICABLE",
      source: "star_beast_memory_candidate_consumption",
      reason: "MEMORY_ELIGIBILITY_NOT_APPLICABLE",
      input,
      sourceEligibilityReference,
      notError: true,
      noMemoryConsumption: true,
    });
  }

  if (sourceEligibilityReference.status === "UNAVAILABLE") {
    return Object.freeze({
      status: "UNAVAILABLE",
      source: "star_beast_memory_candidate_consumption",
      reason: "MEMORY_ELIGIBILITY_UNAVAILABLE",
      input,
      sourceEligibilityReference,
      noMemoryConsumption: true,
    });
  }

  if (input.candidateReference === null) {
    return Object.freeze({
      status: "UNAVAILABLE",
      source: "star_beast_memory_candidate_consumption",
      reason: "MEMORY_CANDIDATE_REFERENCE_REQUIRED",
      input,
      sourceEligibilityReference,
      noMemoryConsumption: true,
    });
  }

  if (input.candidateReference !== sourceEligibilityReference.candidate) {
    return Object.freeze({
      status: "UNAVAILABLE",
      source: "star_beast_memory_candidate_consumption",
      reason: "MEMORY_CANDIDATE_REFERENCE_MISMATCH",
      input,
      sourceEligibilityReference,
      noMemoryConsumption: true,
    });
  }

  if (input.sourceDeclarationReference === null) {
    return Object.freeze({
      status: "UNAVAILABLE",
      source: "star_beast_memory_candidate_consumption",
      reason: "SOURCE_DECLARATION_REFERENCE_REQUIRED",
      input,
      sourceEligibilityReference,
      noMemoryConsumption: true,
    });
  }

  if (
    input.sourceDeclarationReference !==
    input.candidateReference.sourceDeclarationReference
  ) {
    return Object.freeze({
      status: "UNAVAILABLE",
      source: "star_beast_memory_candidate_consumption",
      reason: "SOURCE_DECLARATION_REFERENCE_MISMATCH",
      input,
      sourceEligibilityReference,
      noMemoryConsumption: true,
    });
  }

  const consumption: StarBeastMemoryCandidateConsumption = Object.freeze({
    semanticRole: "STAR_BEAST_MEMORY_CANDIDATE_CONSUMPTION",
    candidateReference: input.candidateReference,
    sourceEligibilityReference,
    sourceDeclarationReference: input.sourceDeclarationReference,
    consumptionStatus: "AVAILABLE_FOR_FUTURE_MEMORY_ENGINE",
    reason: "ELIGIBLE_CANDIDATE_READY_FOR_FUTURE_MEMORY_ENGINE",
    notMemory: true,
    notMemoryRecord: true,
    noMemoryWrite: true,
  });

  return Object.freeze({
    status: "AVAILABLE",
    source: "star_beast_memory_candidate_consumption",
    input,
    consumption,
  });
}
