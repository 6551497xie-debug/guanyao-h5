import {
  XINMAI_CHOICE_ACTION_INTENTION_V3_SCHEMA_VERSION,
  XINMAI_CHOICE_ACTION_INTENTION_V4_SCHEMA_VERSION,
  type ChoiceActionIntentionV3,
  type ChoiceActionIntentionV4,
  type ChoiceFormationSourceSnapshotV2,
  type ChoiceFormationSourceSnapshotV3,
} from "../types/xinmaiChoiceActionIntention";
import {
  XINMAI_SIX_DIMENSION_SEMANTIC_GRAMMAR_REVISION,
  XINMAI_SIX_DIMENSION_V3_PROTOCOL_REVISION,
} from "../types/xinmaiSixDimensionObservation";

const isRecord = (value: unknown): value is Record<string, unknown> =>
  typeof value === "object" && value !== null && !Array.isArray(value);

const hasText = (value: unknown): value is string =>
  typeof value === "string" && value.trim().length > 0;

const isIsoTimestamp = (value: unknown): value is string =>
  hasText(value) && Number.isFinite(Date.parse(value));

const hasFormationBase = (value: Record<string, unknown>): boolean =>
  isRecord(value.formation) &&
  isRecord(value.migrationImpact) &&
  Number.isInteger(value.completedNodeCount) &&
  Number(value.completedNodeCount) >= 0 &&
  hasText(value.primaryDimension) &&
  isRecord(value.action) &&
  value.assetCompletionState === "READY_TO_CRYSTALLIZE";

const hasV2SixDimensionBinding = (value: unknown): boolean =>
  isRecord(value) &&
  hasText(value.completionReceiptReferenceId) &&
  hasText(value.observationSetId) &&
  Number.isInteger(value.observationSetRevision) &&
  Number(value.observationSetRevision) >= 1 &&
  hasText(value.dimensionProtocolRevision) &&
  hasText(value.contentDigest) &&
  hasText(value.evidenceDigest);

const hasV3SixDimensionBinding = (value: unknown): boolean =>
  hasV2SixDimensionBinding(value) &&
  isRecord(value) &&
  value.dimensionProtocolRevision ===
    XINMAI_SIX_DIMENSION_V3_PROTOCOL_REVISION &&
  value.semanticGrammarRevision ===
    XINMAI_SIX_DIMENSION_SEMANTIC_GRAMMAR_REVISION &&
  hasText(value.semanticSelectionAggregateDigest);

export function isChoiceFormationSourceSnapshotV2ReadRecord(
  value: unknown,
): value is ChoiceFormationSourceSnapshotV2 {
  return isRecord(value) &&
    value.schemaVersion === "XINMAI_CHOICE_FORMATION_SOURCE_SNAPSHOT_V2" &&
    hasFormationBase(value) &&
    hasV2SixDimensionBinding(value.sixDimensionObservation) &&
    isRecord(value.sixDimensionObservation) &&
    !("semanticSelectionAggregateDigest" in value.sixDimensionObservation);
}

export function isChoiceFormationSourceSnapshotV3ReadRecord(
  value: unknown,
): value is ChoiceFormationSourceSnapshotV3 {
  return isRecord(value) &&
    value.schemaVersion === "XINMAI_CHOICE_FORMATION_SOURCE_SNAPSHOT_V3" &&
    hasFormationBase(value) &&
    hasV3SixDimensionBinding(value.sixDimensionObservation);
}

const hasChoiceBase = (value: Record<string, unknown>): boolean =>
  value.source === "xinmai_choice_action_intention_controller" &&
  hasText(value.choiceActionIntentionReferenceId) &&
  isRecord(value.identityReferences) &&
  hasText(value.identityReferences.sourceReferenceId) &&
  hasText(value.identityReferences.starBeastIdentityReferenceId) &&
  hasText(value.identityReferences.mansionCoordinateReferenceId) &&
  hasText(value.sourceEncounterCycleId) &&
  (value.targetEncounterCycleId === null ||
    hasText(value.targetEncounterCycleId)) &&
  hasText(value.gravityCycleId) &&
  hasText(value.gravityObservationReferenceId) &&
  typeof value.state === "string" &&
  [
    "COMMITTED",
    "AWAITING_RETURN",
    "REPORTED",
    "CLOSED",
    "WITHDRAWN",
    "SUPERSEDED",
  ].includes(value.state) &&
  Number.isInteger(value.revision) &&
  Number(value.revision) >= 1 &&
  hasText(value.actionSummary) &&
  isRecord(value.actionRouteSnapshot) &&
  isIsoTimestamp(value.committedAt) &&
  isIsoTimestamp(value.updatedAt) &&
  isRecord(value.provenance) &&
  value.provenance.userExplicitCommit === true &&
  value.provenance.noLivedResponseAuthority === true &&
  value.provenance.noCrystalEligibilityAuthority === true;

export function isChoiceActionIntentionV3ReadRecord(
  value: unknown,
): value is ChoiceActionIntentionV3 {
  return isRecord(value) &&
    value.schemaVersion ===
      XINMAI_CHOICE_ACTION_INTENTION_V3_SCHEMA_VERSION &&
    hasChoiceBase(value) &&
    isChoiceFormationSourceSnapshotV2ReadRecord(
      value.formationSourceSnapshot,
    );
}

export function isChoiceActionIntentionV4ReadRecord(
  value: unknown,
): value is ChoiceActionIntentionV4 {
  return isRecord(value) &&
    value.schemaVersion ===
      XINMAI_CHOICE_ACTION_INTENTION_V4_SCHEMA_VERSION &&
    hasChoiceBase(value) &&
    isChoiceFormationSourceSnapshotV3ReadRecord(
      value.formationSourceSnapshot,
    );
}

export const XinmaiChoiceSemanticBindingReadValidator = Object.freeze({
  isSnapshotV2: isChoiceFormationSourceSnapshotV2ReadRecord,
  isSnapshotV3: isChoiceFormationSourceSnapshotV3ReadRecord,
  isChoiceV3: isChoiceActionIntentionV3ReadRecord,
  isChoiceV4: isChoiceActionIntentionV4ReadRecord,
  writesAuthority: false as const,
  choiceV4WriterEnabled: true as const,
});
