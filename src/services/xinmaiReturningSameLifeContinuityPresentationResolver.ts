import { XINMAI_RETURNING_SAME_LIFE_CONTINUITY_SCENE_PROJECTION_POLICY } from "./xinmaiReturningSameLifeContinuityPresentationPolicy";
import {
  XINMAI_RETURNING_SAME_LIFE_CONTINUITY_PRESENTATION_VERSION,
  type XinmaiReturningSameLifeContinuityLineage,
  type XinmaiReturningSameLifeContinuityPresentationInput,
  type XinmaiReturningSameLifeContinuityPresentationProjection,
  type XinmaiReturningSameLifeContinuitySafeWithheldReason,
} from "../types/xinmaiReturningSameLifeContinuityPresentation";
import type { RealityEncounterIdentityReferences } from "../types/xinmaiRealityEncounterIntent";

const STABLE_NODE_ORDER = Object.freeze([2, 5, 3, 6, 1, 4, 0]);

const stableHash = (value: string): string => {
  let hash = 2166136261;
  for (let index = 0; index < value.length; index += 1) {
    hash ^= value.charCodeAt(index);
    hash = Math.imul(hash, 16777619);
  }
  return (hash >>> 0).toString(36);
};

const sameIdentity = (
  left: RealityEncounterIdentityReferences,
  right: RealityEncounterIdentityReferences,
): boolean =>
  left.sourceReferenceId === right.sourceReferenceId &&
  left.starBeastIdentityReferenceId === right.starBeastIdentityReferenceId &&
  left.mansionCoordinateReferenceId === right.mansionCoordinateReferenceId;

const withheld = (
  input: XinmaiReturningSameLifeContinuityPresentationInput,
  reason: XinmaiReturningSameLifeContinuitySafeWithheldReason,
): XinmaiReturningSameLifeContinuityPresentationProjection =>
  Object.freeze({
    status: "SAFE_WITHHELD" as const,
    schemaVersion:
      XINMAI_RETURNING_SAME_LIFE_CONTINUITY_PRESENTATION_VERSION,
    source:
      "xinmai_returning_same_life_continuity_presentation_resolver" as const,
    semanticProjectionReferenceId:
      input.sourceReferenceId.trim() && input.sourceRenderPlanReferenceId.trim()
        ? `RETURNING_SAME_LIFE:${stableHash(
            `${input.consumerSurface}:${input.sourceReferenceId}:${input.sourceRenderPlanReferenceId}:${reason}`,
          )}`
        : null,
    consumerSurface: input.consumerSurface,
    reason,
    authorityWriteback: "FORBIDDEN" as const,
  });

export function applyXinmaiReturningSameLifeContinuitySceneProjectionPolicy(
  projection: XinmaiReturningSameLifeContinuityPresentationProjection,
): XinmaiReturningSameLifeContinuityPresentationProjection {
  if (
    projection.status === "SAFE_WITHHELD" ||
    XINMAI_RETURNING_SAME_LIFE_CONTINUITY_SCENE_PROJECTION_POLICY === "ENABLED"
  ) {
    return projection;
  }
  return Object.freeze({
    status: "SAFE_WITHHELD" as const,
    schemaVersion:
      XINMAI_RETURNING_SAME_LIFE_CONTINUITY_PRESENTATION_VERSION,
    source:
      "xinmai_returning_same_life_continuity_presentation_resolver" as const,
    semanticProjectionReferenceId: projection.semanticProjectionReferenceId,
    consumerSurface: projection.consumerSurface,
    reason: "PRESENTATION_PAUSED" as const,
    authorityWriteback: "FORBIDDEN" as const,
  });
}

const presentable = (
  input: XinmaiReturningSameLifeContinuityPresentationInput,
  fields: Readonly<{
    checkpointState: Extract<
      XinmaiReturningSameLifeContinuityPresentationProjection,
      { status: "PRESENTABLE" }
    >["checkpointState"];
    lineage: XinmaiReturningSameLifeContinuityLineage;
    canonicalImprintReferenceIds: readonly string[];
    nearObjectKind: Extract<
      XinmaiReturningSameLifeContinuityPresentationProjection,
      { status: "PRESENTABLE" }
    >["nearObjectKind"];
    nearObjectReferenceId: string | null;
    presentationOrigin: Extract<
      XinmaiReturningSameLifeContinuityPresentationProjection,
      { status: "PRESENTABLE" }
    >["presentationOrigin"];
    announcementPolicy: Extract<
      XinmaiReturningSameLifeContinuityPresentationProjection,
      { status: "PRESENTABLE" }
    >["announcementPolicy"];
  }>,
): XinmaiReturningSameLifeContinuityPresentationProjection =>
  Object.freeze({
    status: "PRESENTABLE" as const,
    schemaVersion:
      XINMAI_RETURNING_SAME_LIFE_CONTINUITY_PRESENTATION_VERSION,
    source:
      "xinmai_returning_same_life_continuity_presentation_resolver" as const,
    semanticProjectionReferenceId: `RETURNING_SAME_LIFE:${stableHash(
      [
        input.consumerSurface,
        input.sourceReferenceId,
        input.sourceRenderPlanReferenceId,
        fields.checkpointState,
        fields.lineage.choiceActionIntentionReferenceId ?? "NO_CHOICE",
        fields.lineage.formationReferenceId ?? "NO_FORMATION",
        fields.lineage.imprintReferenceId ?? "NO_CURRENT_IMPRINT",
        fields.canonicalImprintReferenceIds.join(","),
      ].join(":"),
    )}`,
    consumerSurface: input.consumerSurface,
    ...fields,
    canonicalImprintReferenceIds: Object.freeze([
      ...fields.canonicalImprintReferenceIds,
    ]),
    authorityWriteback: "FORBIDDEN" as const,
  });

const validateIdentity = (
  input: XinmaiReturningSameLifeContinuityPresentationInput,
): XinmaiReturningSameLifeContinuityLineage | null => {
  const canonical = input.canonicalBodyImprintDecision;
  if (
    input.identityStatus !== "READY" ||
    input.sourceReferenceId.trim().length === 0 ||
    input.sourceRenderPlanReferenceId.trim().length === 0 ||
    canonical.status === "SAFE_WITHHELD" ||
    canonical.identityReferences.sourceReferenceId !== input.sourceReferenceId ||
    canonical.bodyReferenceId.trim().length === 0
  ) {
    return null;
  }
  return Object.freeze({
    sourceReferenceId: input.sourceReferenceId,
    sourceRenderPlanReferenceId: input.sourceRenderPlanReferenceId,
    identityReferenceId:
      canonical.identityReferences.starBeastIdentityReferenceId,
    bodyReferenceId: canonical.bodyReferenceId,
    choiceActionIntentionReferenceId: null,
    departureReceiptReferenceId: null,
    returnReceiptReferenceId: null,
    livedResponseReferenceId: null,
    crystalEligibilityReferenceId: null,
    formationReferenceId: null,
    crystalReferenceId: null,
    imprintReferenceId: null,
    stableNodeIndex: null,
  });
};

const withAdmissionLineage = (
  base: XinmaiReturningSameLifeContinuityLineage,
  input: Extract<
    XinmaiReturningSameLifeContinuityPresentationInput,
    { consumerSurface: "RETURNING_OWNERSHIP" }
  >,
): XinmaiReturningSameLifeContinuityLineage | null => {
  const admission = input.admission;
  if (admission === null || admission.intention === null) return base;
  const identity = admission.intention.identityReferences;
  const canonicalIdentity = input.canonicalBodyImprintDecision.identityReferences;
  if (canonicalIdentity === null || !sameIdentity(identity, canonicalIdentity)) {
    return null;
  }
  const departure = admission.departureReceipt;
  const returned = admission.returnReceipt;
  if (
    (departure !== null && !sameIdentity(departure.identityReferences, identity)) ||
    (returned !== null &&
      (!sameIdentity(returned.identityReferences, identity) ||
        returned.choiceActionIntentionReferenceId !==
          admission.intention.choiceActionIntentionReferenceId ||
        departure === null ||
        returned.departureReceiptReferenceId !==
          departure.departureReceiptReferenceId))
  ) {
    return null;
  }
  return Object.freeze({
    ...base,
    choiceActionIntentionReferenceId:
      admission.intention.choiceActionIntentionReferenceId,
    departureReceiptReferenceId:
      departure?.departureReceiptReferenceId ?? null,
    returnReceiptReferenceId: returned?.returnReceiptReferenceId ?? null,
  });
};

export function resolveXinmaiReturningSameLifeContinuityPresentation(
  input: XinmaiReturningSameLifeContinuityPresentationInput,
): XinmaiReturningSameLifeContinuityPresentationProjection {
  const base = validateIdentity(input);
  if (base === null) return withheld(input, "IDENTITY_NOT_READY");

  const canonical = input.canonicalBodyImprintDecision;
  const canonicalImprints = [...canonical.imprints].sort((left, right) =>
    left.imprintReferenceId.localeCompare(right.imprintReferenceId),
  );
  if (input.consumerSurface === "ARCHIVE") {
    const selectedReference =
      input.selectedImprintReferenceId ??
      canonical.focusedImprintReferenceId ??
      canonicalImprints[0]?.imprintReferenceId ??
      null;
    const selected =
      selectedReference === null
        ? null
        : canonicalImprints.find(
            (imprint) => imprint.imprintReferenceId === selectedReference,
          ) ?? null;
    if (selectedReference !== null && selected === null) {
      return withheld(input, "ARCHIVE_REFERENCE_MISMATCH");
    }
    const lineage = Object.freeze({
      ...base,
      formationReferenceId: selected?.formationReferenceId ?? null,
      crystalReferenceId: selected?.crystalReferenceId ?? null,
      imprintReferenceId: selected?.imprintReferenceId ?? null,
      stableNodeIndex: selected === null
        ? null
        : STABLE_NODE_ORDER[
            canonicalImprints.findIndex(
              (imprint) =>
                imprint.imprintReferenceId === selected.imprintReferenceId,
            ) % STABLE_NODE_ORDER.length
          ],
    });
    return presentable(input, {
      checkpointState: "BASELINE_LIFE_WORLD",
      lineage,
      canonicalImprintReferenceIds: canonicalImprints.map(
        (imprint) => imprint.imprintReferenceId,
      ),
      nearObjectKind: selected === null ? "NONE" : "ARCHIVE_IMPRINT",
      nearObjectReferenceId: selected?.imprintReferenceId ?? null,
      presentationOrigin: "SETTLED_ARCHIVE",
      announcementPolicy: "RECOVERY_SILENT",
    });
  }

  const lineage = withAdmissionLineage(base, input);
  if (lineage === null) return withheld(input, "RETURN_LINEAGE_MISMATCH");
  const checkpoint = input.checkpointDecision;
  if (checkpoint.state === "SAFE_WITHHELD") {
    return withheld(input, "CHECKPOINT_NOT_TRUSTWORTHY");
  }

  if (checkpoint.state === "OWNERSHIP_PRESENTED") {
    const receipt = input.formationReceipt;
    const ownership = input.ownershipDecision;
    if (
      receipt === null ||
      ownership === null ||
      ownership.state === "FORMATION_PENDING" ||
      ownership.state === "SAFE_WITHHELD" ||
      ownership.visualFacts.successAuthority !== "IDB_TRANSACTION_COMPLETE" ||
      ownership.visualFacts.formationReferenceId !== receipt.formationReferenceId ||
      ownership.visualFacts.crystalReferenceId !== receipt.crystalReferenceId ||
      ownership.visualFacts.choiceActionIntentionReferenceId !==
        receipt.choiceActionIntentionReferenceId ||
      lineage.choiceActionIntentionReferenceId !==
        receipt.choiceActionIntentionReferenceId
    ) {
      return withheld(input, "OWNERSHIP_LINEAGE_MISMATCH");
    }
    const imprint = canonicalImprints.find(
      (candidate) =>
        candidate.crystalReferenceId === receipt.crystalReferenceId &&
        candidate.formationReferenceId === receipt.formationReferenceId &&
        candidate.choiceActionIntentionReferenceId ===
          receipt.choiceActionIntentionReferenceId &&
        candidate.bodyReferenceId === base.bodyReferenceId,
    );
    if (imprint === undefined) {
      return withheld(input, "CURRENT_IMPRINT_NOT_FOUND");
    }
    const stableNodeOrdinal = canonicalImprints.findIndex(
      (candidate) =>
        candidate.imprintReferenceId === imprint.imprintReferenceId,
    );
    const stableNodeIndex =
      STABLE_NODE_ORDER[stableNodeOrdinal % STABLE_NODE_ORDER.length];
    const ownershipLineage = Object.freeze({
      ...lineage,
      livedResponseReferenceId: receipt.livedResponseReferenceId,
      crystalEligibilityReferenceId: receipt.crystalEligibilityReferenceId,
      formationReferenceId: receipt.formationReferenceId,
      crystalReferenceId: receipt.crystalReferenceId,
      imprintReferenceId: imprint.imprintReferenceId,
      stableNodeIndex,
    });
    const recovered = ownership.state === "RECOVERED_EXISTING";
    return presentable(input, {
      checkpointState: checkpoint.state,
      lineage: ownershipLineage,
      canonicalImprintReferenceIds: canonicalImprints.map(
        (candidate) => candidate.imprintReferenceId,
      ),
      nearObjectKind: "CRYSTAL_OWNERSHIP",
      nearObjectReferenceId: imprint.imprintReferenceId,
      presentationOrigin: recovered
        ? "CANONICAL_RECOVERY"
        : "CURRENT_TRANSACTION",
      announcementPolicy: recovered ? "RECOVERY_SILENT" : "ANNOUNCE_ONCE",
    });
  }

  if (checkpoint.state === "FORMATION_IN_PROGRESS") {
    const fact = input.currentFact;
    const eligibility = input.currentEligibility;
    if (
      fact === null ||
      eligibility === null ||
      input.formationReceipt !== null ||
      fact.choiceActionIntentionReferenceId !==
        lineage.choiceActionIntentionReferenceId ||
      eligibility.choiceActionIntentionReferenceId !==
        fact.choiceActionIntentionReferenceId ||
      eligibility.livedResponseReferenceId !== fact.livedResponseReferenceId ||
      !sameIdentity(fact.identityReferences, eligibility.identityReferences)
    ) {
      return withheld(input, "FORMATION_LINEAGE_MISMATCH");
    }
    return presentable(input, {
      checkpointState: checkpoint.state,
      lineage: Object.freeze({
        ...lineage,
        livedResponseReferenceId: fact.livedResponseReferenceId,
        crystalEligibilityReferenceId:
          eligibility.crystalEligibilityReferenceId,
      }),
      canonicalImprintReferenceIds: canonicalImprints.map(
        (imprint) => imprint.imprintReferenceId,
      ),
      nearObjectKind: "LIVED_RESPONSE",
      nearObjectReferenceId: fact.livedResponseReferenceId,
      presentationOrigin: "NONE",
      announcementPolicy: "NONE",
    });
  }

  if (checkpoint.state === "RETURN_ACCEPTED_AWAITING_RESPONSE") {
    const accepted = input.returnAcceptanceEvidence;
    if (
      accepted === null ||
      lineage.choiceActionIntentionReferenceId !==
        accepted.choiceActionIntentionReferenceId ||
      lineage.departureReceiptReferenceId !==
        accepted.returnReceipt.departureReceiptReferenceId
    ) {
      return withheld(input, "RETURN_LINEAGE_MISMATCH");
    }
    return presentable(input, {
      checkpointState: checkpoint.state,
      lineage: Object.freeze({
        ...lineage,
        returnReceiptReferenceId:
          accepted.returnReceipt.returnReceiptReferenceId,
      }),
      canonicalImprintReferenceIds: canonicalImprints.map(
        (imprint) => imprint.imprintReferenceId,
      ),
      nearObjectKind: "LIVED_RESPONSE",
      nearObjectReferenceId: accepted.returnReceipt.returnReceiptReferenceId,
      presentationOrigin: "NONE",
      announcementPolicy: "NONE",
    });
  }

  if (checkpoint.state === "READY_TO_CONFIRM_REAL_RESPONSE") {
    const receipt = input.admission?.returnReceipt ?? null;
    if (
      receipt === null ||
      receipt.state !== "READY_FOR_LIVED_RESPONSE" ||
      lineage.returnReceiptReferenceId !== receipt.returnReceiptReferenceId
    ) {
      return withheld(input, "RETURN_LINEAGE_MISMATCH");
    }
    return presentable(input, {
      checkpointState: checkpoint.state,
      lineage,
      canonicalImprintReferenceIds: canonicalImprints.map(
        (imprint) => imprint.imprintReferenceId,
      ),
      nearObjectKind: "LIVED_RESPONSE",
      nearObjectReferenceId: receipt.returnReceiptReferenceId,
      presentationOrigin: "NONE",
      announcementPolicy: "NONE",
    });
  }

  const baselineNearReference =
    lineage.choiceActionIntentionReferenceId ??
    lineage.departureReceiptReferenceId ??
    null;
  return presentable(input, {
    checkpointState: checkpoint.state,
    lineage,
    canonicalImprintReferenceIds: canonicalImprints.map(
      (imprint) => imprint.imprintReferenceId,
    ),
    nearObjectKind: baselineNearReference === null ? "NONE" : "LIVED_RESPONSE",
    nearObjectReferenceId: baselineNearReference,
    presentationOrigin: "NONE",
    announcementPolicy: "NONE",
  });
}

export const XinmaiReturningSameLifeContinuityPresentationResolver =
  Object.freeze({
    resolve: resolveXinmaiReturningSameLifeContinuityPresentation,
    readsStorage: false as const,
    writesAuthority: false as const,
    navigates: false as const,
  });
