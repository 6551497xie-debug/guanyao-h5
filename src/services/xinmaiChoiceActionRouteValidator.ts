import {
  XINMAI_CHOICE_ACTION_ROUTE_PROTOTYPE_BY_ID,
} from "../data/xinmaiChoiceActionRoutePrototypeCatalog";
import {
  XINMAI_CHOICE_ACTION_ROUTE_CATALOG_REVISION,
  XINMAI_CHOICE_ACTION_ROUTE_RESOLVER_VERSION,
  XINMAI_CHOICE_ACTION_ROUTE_SCHEMA_VERSION,
  XINMAI_CHOICE_ACTION_ROUTE_VALIDATOR_VERSION,
  type ChoiceActionRouteCandidate,
  type ChoiceActionRouteResolverInput,
  type ChoiceActionRouteValidation,
} from "../types/xinmaiChoiceActionRoute";
import { createStableXinmaiGrowthReference } from "./xinmaiLivedGrowthReference";

const hasText = (value: string): boolean => value.trim().length > 0;

const identityMatches = (
  left: ChoiceActionRouteResolverInput["identityReferences"],
  right: ChoiceActionRouteResolverInput["identityReferences"],
): boolean =>
  left.sourceReferenceId === right.sourceReferenceId &&
  left.starBeastIdentityReferenceId ===
    right.starBeastIdentityReferenceId &&
  left.mansionCoordinateReferenceId ===
    right.mansionCoordinateReferenceId;

export const createChoiceActionRouteSetReferenceId = (
  input: ChoiceActionRouteResolverInput,
): string =>
  createStableXinmaiGrowthReference(
    "choice-action-route-set-v1",
    input.identityReferences.sourceReferenceId,
    input.identityReferences.starBeastIdentityReferenceId,
    input.identityReferences.mansionCoordinateReferenceId,
    input.sourceEncounterCycleId,
    input.gravityCycleId,
    input.gravityObservationReferenceId,
    String(input.observationCheckpointRevision),
    input.pressure.selectedPressureSeedId,
    input.pressure.candidateReferenceId,
    input.pressure.pressureField,
    input.pressure.pressureNature,
    input.motherCode.motherCodeProfileId,
    input.motherCode.motherCodeDefinitionId,
    input.motherCode.lowerTrigram,
    XINMAI_CHOICE_ACTION_ROUTE_CATALOG_REVISION,
  );

export const createChoiceActionRouteCanonicalIdentityKey = (
  input: ChoiceActionRouteResolverInput,
  candidate: Pick<
    ChoiceActionRouteCandidate,
    "prototypeId" | "prototypeVersion" | "parameters"
  >,
): string =>
  [
    XINMAI_CHOICE_ACTION_ROUTE_SCHEMA_VERSION,
    XINMAI_CHOICE_ACTION_ROUTE_CATALOG_REVISION,
    XINMAI_CHOICE_ACTION_ROUTE_RESOLVER_VERSION,
    XINMAI_CHOICE_ACTION_ROUTE_VALIDATOR_VERSION,
    input.identityReferences.sourceReferenceId,
    input.identityReferences.starBeastIdentityReferenceId,
    input.identityReferences.mansionCoordinateReferenceId,
    input.sourceEncounterCycleId,
    input.gravityCycleId,
    input.gravityObservationReferenceId,
    String(input.observationCheckpointRevision),
    input.pressure.selectedPressureSeedId,
    input.pressure.candidateReferenceId,
    input.pressure.pressureField,
    input.pressure.pressureNature,
    input.motherCode.motherCodeProfileId,
    input.motherCode.motherCodeDefinitionId,
    input.motherCode.lowerTrigram,
    candidate.prototypeId,
    String(candidate.prototypeVersion),
    candidate.parameters.targetKind,
    candidate.parameters.sceneKind,
    candidate.parameters.scale,
    candidate.parameters.effortBoundary,
    candidate.parameters.requiresUserSafetyConfirmation
      ? "SAFETY_CONFIRMATION_REQUIRED"
      : "SELF_DIRECTED",
  ].map((value) => value.trim().normalize("NFC")).join("|");

export const createChoiceActionRouteReferenceId = (
  canonicalIdentityKey: string,
): string =>
  createStableXinmaiGrowthReference(
    "choice-action-route-v1",
    canonicalIdentityKey,
  );

const safeWithheld = (
  reason: Extract<
    ChoiceActionRouteValidation,
    { status: "SAFE_WITHHELD" }
  >["reason"],
): ChoiceActionRouteValidation =>
  Object.freeze({
    status: "SAFE_WITHHELD" as const,
    candidate: null,
    reason,
  });

export function validateChoiceActionRouteCandidate(
  candidate: ChoiceActionRouteCandidate,
  input: ChoiceActionRouteResolverInput,
): ChoiceActionRouteValidation {
  if (
    candidate.schemaVersion !==
      XINMAI_CHOICE_ACTION_ROUTE_SCHEMA_VERSION
  ) {
    return safeWithheld("SCHEMA_VERSION_MISMATCH");
  }
  if (
    candidate.catalogRevision !==
      XINMAI_CHOICE_ACTION_ROUTE_CATALOG_REVISION ||
    candidate.resolverVersion !==
      XINMAI_CHOICE_ACTION_ROUTE_RESOLVER_VERSION ||
    candidate.validatorVersion !==
      XINMAI_CHOICE_ACTION_ROUTE_VALIDATOR_VERSION
  ) {
    return safeWithheld("CATALOG_VERSION_MISMATCH");
  }
  const prototype =
    XINMAI_CHOICE_ACTION_ROUTE_PROTOTYPE_BY_ID[
      candidate.prototypeId
    ];
  if (!prototype) return safeWithheld("PROTOTYPE_NOT_FOUND");
  if (
    prototype.prototypeVersion !== candidate.prototypeVersion
  ) {
    return safeWithheld("PROTOTYPE_VERSION_MISMATCH");
  }
  if (
    !identityMatches(candidate.identityReferences, input.identityReferences) ||
    candidate.sourceEncounterCycleId !==
      input.sourceEncounterCycleId ||
    candidate.gravityProvenance.gravityCycleId !==
      input.gravityCycleId ||
    candidate.gravityProvenance.gravityObservationReferenceId !==
      input.gravityObservationReferenceId ||
    candidate.gravityProvenance.observationCheckpointRevision !==
      input.observationCheckpointRevision
  ) {
    return safeWithheld("IDENTITY_OR_LINEAGE_MISMATCH");
  }
  if (
    candidate.pressureProvenance.selectedPressureSeedId !==
      input.pressure.selectedPressureSeedId ||
    candidate.pressureProvenance.candidateReferenceId !==
      input.pressure.candidateReferenceId ||
    candidate.pressureProvenance.pressureField !==
      input.pressure.pressureField ||
    candidate.pressureProvenance.pressureNature !==
      input.pressure.pressureNature
  ) {
    return safeWithheld("PRESSURE_PROVENANCE_MISMATCH");
  }
  if (input.pressure.pressureNature === "SURVIVAL") {
    return safeWithheld("SURVIVAL_CONTEXT_FORBIDDEN");
  }
  if (
    candidate.motherCodeProvenance.motherCodeProfileId !==
      input.motherCode.motherCodeProfileId ||
    candidate.motherCodeProvenance.motherCodeDefinitionId !==
      input.motherCode.motherCodeDefinitionId ||
    candidate.motherCodeProvenance.lowerTrigram !==
      input.motherCode.lowerTrigram
  ) {
    return safeWithheld("MOTHER_CODE_PROVENANCE_MISMATCH");
  }
  if (
    !prototype.allowedTargetKinds.includes(
      candidate.parameters.targetKind,
    ) ||
    !prototype.allowedSceneKinds.includes(
      candidate.parameters.sceneKind,
    ) ||
    !prototype.allowedEffortBoundaries.includes(
      candidate.parameters.effortBoundary,
    ) ||
    prototype.interactionSafetyConfirmationRequired !==
      candidate.parameters.requiresUserSafetyConfirmation
  ) {
    return safeWithheld("PARAMETER_NOT_ALLOWED");
  }
  if (
    !hasText(candidate.action.visibleAction) ||
    !hasText(candidate.action.completionPrompt) ||
    !hasText(candidate.action.actionVerb) ||
    !hasText(candidate.action.actionObject) ||
    !hasText(candidate.action.sceneBoundary)
  ) {
    return safeWithheld("ACTION_NOT_JUDGEABLE");
  }
  if (
    candidate.safety.safetyLevel !==
      "P0_LOW_RISK_REVERSIBLE" ||
    candidate.safety.userMayDecline !== true ||
    candidate.safety.userMayDefer !== true ||
    candidate.safety.noOutcomePromise !== true ||
    candidate.safety.validatorVersion !==
      XINMAI_CHOICE_ACTION_ROUTE_VALIDATOR_VERSION ||
    candidate.safety.forbiddenContextMatches.length !== 0
  ) {
    return safeWithheld("SAFETY_BOUNDARY_INVALID");
  }
  const canonicalIdentityKey =
    createChoiceActionRouteCanonicalIdentityKey(input, candidate);
  if (
    candidate.routeSetReferenceId !==
      createChoiceActionRouteSetReferenceId(input) ||
    candidate.canonicalIdentityKey !== canonicalIdentityKey ||
    candidate.actionRouteReferenceId !==
      createChoiceActionRouteReferenceId(canonicalIdentityKey)
  ) {
    return safeWithheld("REFERENCE_MISMATCH");
  }
  return Object.freeze({
    status: "VALID" as const,
    candidate,
    reason: null,
  });
}

export const XinmaiChoiceActionRouteValidator = Object.freeze({
  validate: validateChoiceActionRouteCandidate,
  pure: true as const,
  synchronous: true as const,
  noStorageRead: true as const,
  noStorageWrite: true as const,
  noAiAuthority: true as const,
  noDomAuthority: true as const,
  noRendererAuthority: true as const,
});
