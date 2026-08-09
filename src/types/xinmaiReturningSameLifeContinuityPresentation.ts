import type { XinmaiCanonicalBodyImprintDecision } from "./xinmaiCanonicalBodyImprint";
import type { CrystalEligibility, CrystalFormationReceipt } from "./xinmaiCrystalEligibility";
import type { XinmaiCrystalOwnershipPresentationDecision } from "./xinmaiCrystalOwnershipPresentation";
import type { LivedResponseFact } from "./xinmaiLivedResponse";
import type {
  XinmaiLivedResponseCheckpointPresentationDecision,
  XinmaiLivedResponseCheckpointPresentationState,
  XinmaiLivedResponseReturnAcceptanceEvidence,
} from "./xinmaiLivedResponseCheckpointPresentation";
import type { XinmaiChoiceReturningProvenanceAdmission } from "./xinmaiChoiceReturningProvenance";

export const XINMAI_RETURNING_SAME_LIFE_CONTINUITY_PRESENTATION_VERSION =
  "XINMAI_RETURNING_SAME_LIFE_CONTINUITY_PRESENTATION_V1" as const;

export type XinmaiReturningSameLifeContinuityConsumerSurface =
  | "RETURNING_OWNERSHIP"
  | "ARCHIVE";

export type XinmaiReturningSameLifeContinuityLineage = Readonly<{
  sourceReferenceId: string;
  sourceRenderPlanReferenceId: string;
  identityReferenceId: string;
  bodyReferenceId: string;
  choiceActionIntentionReferenceId: string | null;
  departureReceiptReferenceId: string | null;
  returnReceiptReferenceId: string | null;
  livedResponseReferenceId: string | null;
  crystalEligibilityReferenceId: string | null;
  formationReferenceId: string | null;
  crystalReferenceId: string | null;
  imprintReferenceId: string | null;
  stableNodeIndex: number | null;
}>;

export type XinmaiReturningSameLifeContinuityPresentationOrigin =
  | "NONE"
  | "CURRENT_TRANSACTION"
  | "CANONICAL_RECOVERY"
  | "SETTLED_ARCHIVE";

export type XinmaiReturningSameLifeContinuitySafeWithheldReason =
  | "PRESENTATION_PAUSED"
  | "IDENTITY_NOT_READY"
  | "CHECKPOINT_NOT_TRUSTWORTHY"
  | "RETURN_LINEAGE_MISMATCH"
  | "FORMATION_LINEAGE_MISMATCH"
  | "OWNERSHIP_LINEAGE_MISMATCH"
  | "CANONICAL_BODY_UNAVAILABLE"
  | "CURRENT_IMPRINT_NOT_FOUND"
  | "ARCHIVE_REFERENCE_MISMATCH";

type SharedInput = Readonly<{
  identityStatus: "READY" | "UNAVAILABLE" | "MISMATCH";
  sourceReferenceId: string;
  sourceRenderPlanReferenceId: string;
  canonicalBodyImprintDecision: XinmaiCanonicalBodyImprintDecision;
}>;

export type XinmaiReturningSameLifeContinuityPresentationInput =
  | (SharedInput &
      Readonly<{
        consumerSurface: "RETURNING_OWNERSHIP";
        checkpointDecision: XinmaiLivedResponseCheckpointPresentationDecision;
        admission: XinmaiChoiceReturningProvenanceAdmission | null;
        currentFact: LivedResponseFact | null;
        currentEligibility: CrystalEligibility | null;
        formationReceipt: CrystalFormationReceipt | null;
        returnAcceptanceEvidence: XinmaiLivedResponseReturnAcceptanceEvidence | null;
        ownershipDecision: XinmaiCrystalOwnershipPresentationDecision | null;
      }>)
  | (SharedInput &
      Readonly<{
        consumerSurface: "ARCHIVE";
        selectedImprintReferenceId: string | null;
      }>);

export type XinmaiReturningSameLifeContinuityPresentationProjection =
  | Readonly<{
      status: "PRESENTABLE";
      schemaVersion:
        typeof XINMAI_RETURNING_SAME_LIFE_CONTINUITY_PRESENTATION_VERSION;
      source: "xinmai_returning_same_life_continuity_presentation_resolver";
      semanticProjectionReferenceId: string;
      consumerSurface: XinmaiReturningSameLifeContinuityConsumerSurface;
      checkpointState: XinmaiLivedResponseCheckpointPresentationState;
      lineage: XinmaiReturningSameLifeContinuityLineage;
      canonicalImprintReferenceIds: readonly string[];
      nearObjectKind:
        | "NONE"
        | "LIVED_RESPONSE"
        | "CRYSTAL_OWNERSHIP"
        | "ARCHIVE_IMPRINT";
      nearObjectReferenceId: string | null;
      presentationOrigin: XinmaiReturningSameLifeContinuityPresentationOrigin;
      announcementPolicy: "ANNOUNCE_ONCE" | "RECOVERY_SILENT" | "NONE";
      authorityWriteback: "FORBIDDEN";
    }>
  | Readonly<{
      status: "SAFE_WITHHELD";
      schemaVersion:
        typeof XINMAI_RETURNING_SAME_LIFE_CONTINUITY_PRESENTATION_VERSION;
      source: "xinmai_returning_same_life_continuity_presentation_resolver";
      semanticProjectionReferenceId: string | null;
      consumerSurface: XinmaiReturningSameLifeContinuityConsumerSurface;
      reason: XinmaiReturningSameLifeContinuitySafeWithheldReason;
      authorityWriteback: "FORBIDDEN";
    }>;

export const XINMAI_RETURNING_SAME_LIFE_CONTINUITY_PRESENTATION_BOUNDARY =
  Object.freeze({
    presentationOnly: true as const,
    pureResolverOnly: true as const,
    existingTypedFactsOnly: true as const,
    noStorageRead: true as const,
    noStorageWrite: true as const,
    noDomInput: true as const,
    noTimerInput: true as const,
    noAnimationAuthority: true as const,
    noControllerCall: true as const,
    noAuthorityWriteback: true as const,
    noNavigationMutation: true as const,
    noUserTextSeed: true as const,
  });
