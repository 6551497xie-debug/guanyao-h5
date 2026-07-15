import type {
  StarBeastMemoryCandidate,
  StarBeastMemoryEligibilityInput,
  StarBeastMemoryEligibilityResult,
} from "../types/starBeastMemoryEligibility";

export function resolveStarBeastMemoryEligibility(
  input: StarBeastMemoryEligibilityInput,
): StarBeastMemoryEligibilityResult {
  const authorityDeclarationConsumptionResult =
    input.authorityDeclarationConsumptionResult;

  if (authorityDeclarationConsumptionResult.status === "NOT_APPLICABLE") {
    return Object.freeze({
      status: "NOT_APPLICABLE",
      source: "star_beast_memory_eligibility",
      reason: "AUTHORITY_DECLARATION_NOT_APPLICABLE",
      input,
      authorityDeclarationConsumptionResult,
      notError: true,
      noMemoryCandidate: true,
    });
  }

  if (authorityDeclarationConsumptionResult.status === "UNAVAILABLE") {
    return Object.freeze({
      status: "UNAVAILABLE",
      source: "star_beast_memory_eligibility",
      reason: "AUTHORITY_DECLARATION_UNAVAILABLE",
      input,
      authorityDeclarationConsumptionResult,
      noMemoryCandidate: true,
    });
  }

  if (input.crystalReference === null) {
    return Object.freeze({
      status: "UNAVAILABLE",
      source: "star_beast_memory_eligibility",
      reason: "CRYSTAL_REFERENCE_REQUIRED",
      input,
      authorityDeclarationConsumptionResult,
      noMemoryCandidate: true,
    });
  }

  if (input.journeyReference === null) {
    return Object.freeze({
      status: "UNAVAILABLE",
      source: "star_beast_memory_eligibility",
      reason: "JOURNEY_REFERENCE_REQUIRED",
      input,
      authorityDeclarationConsumptionResult,
      noMemoryCandidate: true,
    });
  }

  if (input.lifeSubjectReference === null) {
    return Object.freeze({
      status: "UNAVAILABLE",
      source: "star_beast_memory_eligibility",
      reason: "LIFE_SUBJECT_REFERENCE_REQUIRED",
      input,
      authorityDeclarationConsumptionResult,
      noMemoryCandidate: true,
    });
  }

  const candidate: StarBeastMemoryCandidate = Object.freeze({
    semanticRole: "STAR_BEAST_MEMORY_CANDIDATE",
    sourceDeclarationReference:
      authorityDeclarationConsumptionResult.declaration,
    journeyReference: input.journeyReference,
    crystalReference: input.crystalReference,
    eligibilityReason: "DECLARED_EXPERIENCE_WITH_COMPLETE_REFERENCES",
    notMemory: true,
    noMemoryWrite: true,
  });

  return Object.freeze({
    status: "AVAILABLE",
    source: "star_beast_memory_eligibility",
    input,
    authorityDeclarationConsumptionResult,
    candidate,
  });
}
