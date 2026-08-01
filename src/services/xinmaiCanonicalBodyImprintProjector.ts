import { resolveLifeUniverseCrystalSourceSlot } from "../renderers/lifeUniverseStarField";
import type { CrystalFormationReceipt } from "../types/xinmaiCrystalEligibility";
import type {
  XinmaiCanonicalBodyImprintDecision,
  XinmaiCanonicalBodyImprintSourceSlot,
  XinmaiCanonicalBodyImprintVisualFact,
} from "../types/xinmaiCanonicalBodyImprint";
import { XINMAI_CANONICAL_BODY_IMPRINT_PROJECTION_VERSION } from "../types/xinmaiCanonicalBodyImprint";
import type { XinmaiLivedGrowthCanonicalProjectionRecord } from "../types/xinmaiLivedGrowthTransactionalStore";
import type { RealityEncounterIdentityReferences } from "../types/xinmaiRealityEncounterIntent";
import { createStableXinmaiGrowthReference } from "./xinmaiLivedGrowthReference";

export type XinmaiCanonicalBodyImprintProjectionInput = Readonly<{
  identityReferences: RealityEncounterIdentityReferences;
  formationReceipts: readonly CrystalFormationReceipt[];
  canonicalCrystals:
    readonly XinmaiLivedGrowthCanonicalProjectionRecord[];
  focusedFormationReferenceId?: string | null;
  focusedChoiceActionIntentionReferenceId?: string | null;
}>;

const sameIdentity = (
  left: RealityEncounterIdentityReferences,
  right: RealityEncounterIdentityReferences,
): boolean =>
  left.sourceReferenceId === right.sourceReferenceId &&
  left.starBeastIdentityReferenceId ===
    right.starBeastIdentityReferenceId &&
  left.mansionCoordinateReferenceId ===
    right.mansionCoordinateReferenceId;

export const resolveXinmaiCanonicalBodyReferenceId = (
  identityReferences: RealityEncounterIdentityReferences,
): string =>
  createStableXinmaiGrowthReference(
    "XINMAI_BODY",
    identityReferences.sourceReferenceId,
    identityReferences.starBeastIdentityReferenceId,
    identityReferences.mansionCoordinateReferenceId,
  );

const safeWithheld = (
  identityReferences: RealityEncounterIdentityReferences,
  reason: Extract<
    XinmaiCanonicalBodyImprintDecision,
    { status: "SAFE_WITHHELD" }
  >["reason"],
): XinmaiCanonicalBodyImprintDecision =>
  Object.freeze({
    status: "SAFE_WITHHELD" as const,
    bodyReferenceId:
      resolveXinmaiCanonicalBodyReferenceId(identityReferences),
    identityReferences,
    imprints: Object.freeze([]),
    focusedImprintReferenceId: null,
    reason,
  });

export function projectXinmaiCanonicalBodyImprints(
  input: XinmaiCanonicalBodyImprintProjectionInput,
): XinmaiCanonicalBodyImprintDecision {
  const bodyReferenceId = resolveXinmaiCanonicalBodyReferenceId(
    input.identityReferences,
  );
  if (input.formationReceipts.length === 0) {
    if (input.canonicalCrystals.length > 0) {
      return safeWithheld(
        input.identityReferences,
        "RECEIPT_MISSING",
      );
    }
    return Object.freeze({
      status: "NO_CANONICAL_IMPRINT" as const,
      bodyReferenceId,
      identityReferences: input.identityReferences,
      imprints: Object.freeze([]),
      focusedImprintReferenceId: null,
      reason: null,
    });
  }

  const formationIds = new Set<string>();
  const crystalIds = new Set<string>();
  const choiceLineages = new Set<string>();
  const projectionByFormation = new Map(
    input.canonicalCrystals.map((projection) => [
      projection.formationReferenceId,
      projection,
    ]),
  );
  if (
    projectionByFormation.size !== input.canonicalCrystals.length
  ) {
    return safeWithheld(
      input.identityReferences,
      "DUPLICATE_LINEAGE",
    );
  }

  const facts: XinmaiCanonicalBodyImprintVisualFact[] = [];
  for (const receipt of input.formationReceipts) {
    if (!sameIdentity(receipt.identityReferences, input.identityReferences)) {
      return safeWithheld(
        input.identityReferences,
        "IDENTITY_MISMATCH",
      );
    }
    if (
      formationIds.has(receipt.formationReferenceId) ||
      crystalIds.has(receipt.crystalReferenceId) ||
      choiceLineages.has(receipt.choiceActionIntentionReferenceId)
    ) {
      return safeWithheld(
        input.identityReferences,
        "DUPLICATE_LINEAGE",
      );
    }
    formationIds.add(receipt.formationReferenceId);
    crystalIds.add(receipt.crystalReferenceId);
    choiceLineages.add(receipt.choiceActionIntentionReferenceId);

    const canonicalCrystal = projectionByFormation.get(
      receipt.formationReferenceId,
    );
    if (!canonicalCrystal) {
      return safeWithheld(
        input.identityReferences,
        "CRYSTAL_PROJECTION_MISSING",
      );
    }
    const formedCrystal = canonicalCrystal.formedCrystal;
    if (
      canonicalCrystal.crystalReferenceId !== receipt.crystalReferenceId ||
      canonicalCrystal.choiceActionIntentionReferenceId !==
        receipt.choiceActionIntentionReferenceId ||
      canonicalCrystal.formedAt !== receipt.formedAt ||
      formedCrystal.formationReferenceId !== receipt.formationReferenceId ||
      formedCrystal.crystalReferenceId !== receipt.crystalReferenceId ||
      formedCrystal.crystalEligibilityReferenceId !==
        receipt.crystalEligibilityReferenceId ||
      formedCrystal.eligibilityRevision !== receipt.eligibilityRevision ||
      formedCrystal.livedResponseReferenceId !==
        receipt.livedResponseReferenceId ||
      formedCrystal.status !== "CRYSTALLIZED"
    ) {
      return safeWithheld(
        input.identityReferences,
        "CRYSTAL_PROJECTION_MISSING",
      );
    }
    const primaryDimension =
      formedCrystal.transmission.primaryDimension?.trim() || null;
    const sourceSlot = resolveLifeUniverseCrystalSourceSlot(
      primaryDimension,
    ) as XinmaiCanonicalBodyImprintSourceSlot;
    const imprintReferenceId = createStableXinmaiGrowthReference(
      "BODY_IMPRINT",
      bodyReferenceId,
      receipt.crystalReferenceId,
      XINMAI_CANONICAL_BODY_IMPRINT_PROJECTION_VERSION,
    );
    const focused =
      input.focusedFormationReferenceId ===
        receipt.formationReferenceId ||
      input.focusedChoiceActionIntentionReferenceId ===
        receipt.choiceActionIntentionReferenceId;
    facts.push(
      Object.freeze({
        semanticRole:
          "XINMAI_CANONICAL_BODY_IMPRINT_VISUAL_FACT" as const,
        schemaVersion:
          XINMAI_CANONICAL_BODY_IMPRINT_PROJECTION_VERSION,
        bodyReferenceId,
        imprintReferenceId,
        sourceReferenceId:
          input.identityReferences.sourceReferenceId,
        starBeastIdentityReferenceId:
          input.identityReferences.starBeastIdentityReferenceId,
        mansionCoordinateReferenceId:
          input.identityReferences.mansionCoordinateReferenceId,
        formationReferenceId: receipt.formationReferenceId,
        crystalReferenceId: receipt.crystalReferenceId,
        crystalEligibilityReferenceId:
          receipt.crystalEligibilityReferenceId,
        livedResponseReferenceId:
          receipt.livedResponseReferenceId,
        choiceActionIntentionReferenceId:
          receipt.choiceActionIntentionReferenceId,
        choiceLineage: Object.freeze({
          choiceActionIntentionReferenceId:
            receipt.choiceActionIntentionReferenceId,
          livedResponseReferenceId:
            receipt.livedResponseReferenceId,
        }),
        fencingToken: receipt.fencingToken,
        formedAt: receipt.formedAt,
        imprintKind:
          "REAL_WORLD_RESPONSE_CRYSTAL_TRACE" as const,
        primaryDimension,
        sourceSlot,
        deterministicGeometryKey:
          createStableXinmaiGrowthReference(
            "BODY_IMPRINT_GEOMETRY",
            bodyReferenceId,
            receipt.crystalReferenceId,
            XINMAI_CANONICAL_BODY_IMPRINT_PROJECTION_VERSION,
            String(sourceSlot),
          ),
        presentationLayer: "BODY_TRACE" as const,
        state: "READY" as const,
        salience: focused
          ? "CURRENT_FORMATION_FOCUS" as const
          : "SETTLED_HISTORY" as const,
      }),
    );
    projectionByFormation.delete(receipt.formationReferenceId);
  }
  if (projectionByFormation.size > 0) {
    return safeWithheld(
      input.identityReferences,
      "RECEIPT_MISSING",
    );
  }
  facts.sort(
    (left, right) =>
      left.fencingToken - right.fencingToken ||
      left.formationReferenceId.localeCompare(
        right.formationReferenceId,
      ),
  );
  const focusedFact = facts.find(
    (fact) => fact.salience === "CURRENT_FORMATION_FOCUS",
  );
  return Object.freeze({
    status: "IMPRINT_AVAILABLE" as const,
    bodyReferenceId,
    identityReferences: input.identityReferences,
    imprints: Object.freeze(facts),
    focusedImprintReferenceId:
      focusedFact?.imprintReferenceId ?? null,
    reason: null,
  });
}

export const XinmaiCanonicalBodyImprintProjector = Object.freeze({
  project: projectXinmaiCanonicalBodyImprints,
});
