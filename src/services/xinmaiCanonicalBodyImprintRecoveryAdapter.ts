import type { XinmaiCanonicalBodyImprintDecision } from "../types/xinmaiCanonicalBodyImprint";
import type { RealityEncounterIdentityReferences } from "../types/xinmaiRealityEncounterIntent";
import { readXinmaiLivedGrowthCanonicalState } from "./xinmaiLivedGrowthTransactionalStore";
import { XINMAI_CANONICAL_BODY_IMPRINT_PRESENTATION_POLICY } from "./xinmaiCanonicalBodyImprintPresentationPolicy";
import {
  projectXinmaiCanonicalBodyImprints,
  resolveXinmaiCanonicalBodyReferenceId,
} from "./xinmaiCanonicalBodyImprintProjector";

export type XinmaiCanonicalBodyImprintRecoveryInput = Readonly<{
  identityReferences: RealityEncounterIdentityReferences;
  visualContinuity: Readonly<{ sourceReferenceId: string }>;
  focusedFormationReferenceId?: string | null;
  focusedChoiceActionIntentionReferenceId?: string | null;
}>;

const safeWithheld = (
  input: XinmaiCanonicalBodyImprintRecoveryInput,
  reason: Extract<
    XinmaiCanonicalBodyImprintDecision,
    { status: "SAFE_WITHHELD" }
  >["reason"],
): XinmaiCanonicalBodyImprintDecision =>
  Object.freeze({
    status: "SAFE_WITHHELD" as const,
    bodyReferenceId:
      resolveXinmaiCanonicalBodyReferenceId(
        input.identityReferences,
      ),
    identityReferences: input.identityReferences,
    imprints: Object.freeze([]),
    focusedImprintReferenceId: null,
    reason,
  });

export async function readXinmaiCanonicalBodyImprintRecovery(
  input: XinmaiCanonicalBodyImprintRecoveryInput,
): Promise<XinmaiCanonicalBodyImprintDecision> {
  if (XINMAI_CANONICAL_BODY_IMPRINT_PRESENTATION_POLICY !== "ENABLED") {
    return safeWithheld(input, "PRESENTATION_PAUSED");
  }
  if (
    input.visualContinuity.sourceReferenceId !==
    input.identityReferences.sourceReferenceId
  ) {
    return safeWithheld(input, "IDENTITY_MISMATCH");
  }
  const canonical = await readXinmaiLivedGrowthCanonicalState();
  if (canonical.status !== "FOUND") {
    return safeWithheld(
      input,
      canonical.status === "CORRUPTED"
        ? "RECOVERY_CORRUPTED"
        : "RECOVERY_UNAVAILABLE",
    );
  }
  return projectXinmaiCanonicalBodyImprints({
    identityReferences: input.identityReferences,
    formationReceipts: canonical.envelope.formationReceipts,
    canonicalCrystals: canonical.canonicalProjections,
    focusedFormationReferenceId:
      input.focusedFormationReferenceId,
    focusedChoiceActionIntentionReferenceId:
      input.focusedChoiceActionIntentionReferenceId,
  });
}

export const XinmaiCanonicalBodyImprintRecoveryAdapter = Object.freeze({
  read: readXinmaiCanonicalBodyImprintRecovery,
});
