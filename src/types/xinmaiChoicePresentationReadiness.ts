import type { CurrentHexagramFormationResult } from "./currentHexagramFormation";
import type { DynamicsExperienceStage } from "./dynamicsExperiencePresentation";
import type { HexagramAssetCandidateCompletionState } from "../services/guanyaoHexagramAssetCandidateResolver";
import type {
  ChoiceActionIntention,
  ChoiceFormationSourceSnapshot,
  CommitChoiceActionIntentionInput,
} from "./xinmaiChoiceActionIntention";
import type {
  ChoiceActionRouteCandidate,
  ChoiceActionRouteResolution,
} from "./xinmaiChoiceActionRoute";
import type {
  CrystalEligibility,
  CrystalFormationReceipt,
} from "./xinmaiCrystalEligibility";
import type { LivedResponseFact } from "./xinmaiLivedResponse";
import type {
  GravityObservationResumeDecision,
} from "./xinmaiGravityObservationContinuity";
import type { GravitySurfaceAdmissionAttempt } from "./xinmaiGravitySurfaceAdmission";
import type { RealityEncounterIdentityReferences } from "./xinmaiRealityEncounterIntent";
import type {
  CanonicalSixDimensionObservationSetRecord,
  SixDimensionCompletionReceiptRecord,
  SixDimensionFailureCause,
} from "./xinmaiSixDimensionObservation";

export type ChoicePresentationLineage = Readonly<{
  identityReferences: RealityEncounterIdentityReferences;
  sourceEncounterCycleId: string;
  gravityCycleId: string;
  gravityObservationReferenceId: string;
  observationCheckpointRevision: number;
}>;

export type ChoiceGrowthTerminalSummaryRequest = Readonly<{
  identityReferences: RealityEncounterIdentityReferences;
  sourceEncounterCycleId: string;
  gravityCycleId: string;
  gravityObservationReferenceId: string;
}>;

type ChoiceGrowthTerminalSummaryBase = Readonly<{
  request: ChoiceGrowthTerminalSummaryRequest;
  canonicalRevision: number | null;
  resolvedAt: string;
}>;

export type ChoiceGrowthTerminalSummary =
  | (ChoiceGrowthTerminalSummaryBase &
      Readonly<{
        state: "NONE";
        choiceActionIntention: null;
        livedResponseFact: null;
        crystalEligibility: null;
        formationReceipt: null;
        reason: null;
      }>)
  | (ChoiceGrowthTerminalSummaryBase &
      Readonly<{
        state: "CHOICE_COMMITTED";
        choiceActionIntention: ChoiceActionIntention;
        livedResponseFact: null;
        crystalEligibility: null;
        formationReceipt: null;
        reason: null;
      }>)
  | (ChoiceGrowthTerminalSummaryBase &
      Readonly<{
        state: "LIVED_RESPONSE_RECORDED";
        choiceActionIntention: ChoiceActionIntention;
        livedResponseFact: LivedResponseFact;
        crystalEligibility: null;
        formationReceipt: null;
        reason: null;
      }>)
  | (ChoiceGrowthTerminalSummaryBase &
      Readonly<{
        state: "ELIGIBILITY_AVAILABLE";
        choiceActionIntention: ChoiceActionIntention;
        livedResponseFact: LivedResponseFact;
        crystalEligibility: CrystalEligibility;
        formationReceipt: null;
        reason: null;
      }>)
  | (ChoiceGrowthTerminalSummaryBase &
      Readonly<{
        state: "CRYSTAL_FORMED";
        choiceActionIntention: ChoiceActionIntention;
        livedResponseFact: LivedResponseFact;
        crystalEligibility: CrystalEligibility;
        formationReceipt: CrystalFormationReceipt;
        reason: null;
      }>)
  | (ChoiceGrowthTerminalSummaryBase &
      Readonly<{
        state: "RECOVERY_UNAVAILABLE" | "RECOVERY_CORRUPTED";
        choiceActionIntention: null;
        livedResponseFact: null;
        crystalEligibility: null;
        formationReceipt: null;
        reason: string;
      }>);

export type ChoicePresentationOperationalState = Readonly<{
  summaryPending: boolean;
  choiceMutationPending: boolean;
  recoveryFailure: string | null;
}>;

export type ChoicePresentationReadinessInput = Readonly<{
  surfaceAttempt: GravitySurfaceAdmissionAttempt | null;
  observationDecision: GravityObservationResumeDecision;
  experienceStage: DynamicsExperienceStage;
  formation: CurrentHexagramFormationResult | null;
  assetCandidate: Readonly<{
    completionState: HexagramAssetCandidateCompletionState;
    completedNodeCount: number;
  }>;
  actionRouteResolution: ChoiceActionRouteResolution;
  growthTerminalSummary: ChoiceGrowthTerminalSummary;
  operationalState: ChoicePresentationOperationalState;
  newChoiceV3Authority: Readonly<{
    observationSet: CanonicalSixDimensionObservationSetRecord | null;
    completionReceipt: SixDimensionCompletionReceiptRecord | null;
    cause: SixDimensionFailureCause | null;
  }>;
}>;

export type ChoicePresentationWithheldReason =
  | "SURFACE_ATTEMPT_REQUIRED"
  | "OBSERVATION_NOT_RECOGNIZED"
  | "SIX_DIMENSION_COMPLETION_REQUIRED"
  | "ACTION_ROUTE_REQUIRED"
  | "FORMATION_SOURCE_REQUIRED"
  | "FORMATION_SOURCE_INCOMPLETE"
  | "STRUCTURAL_PREREQUISITE_INVALID";

export type ChoicePresentationSafeWithheldReason =
  | "SUMMARY_PENDING"
  | "CHOICE_MUTATION_PENDING"
  | "RECOVERY_UNAVAILABLE"
  | "RECOVERY_CORRUPTED"
  | "IDENTITY_MISMATCH"
  | "ENCOUNTER_MISMATCH"
  | "GRAVITY_LINEAGE_MISMATCH"
  | "OBSERVATION_LINEAGE_MISMATCH"
  | "SUMMARY_CONFLICT"
  | "ACTION_ROUTE_SAFE_WITHHELD"
  | "ACTION_ROUTE_RUNTIME_PAUSED"
  | "SIX_DIMENSION_AUTHORITY_UNAVAILABLE"
  | "RUNTIME_RECOVERY_FAILURE";

type ChoicePresentationDecisionBase = Readonly<{
  experienceStage: DynamicsExperienceStage;
  resolvedAt: string;
}>;

export type ChoicePresentationReadinessDecision =
  | (ChoicePresentationDecisionBase &
      Readonly<{
        state: "READY_TO_PRESENT";
        reason: "ALL_TYPED_PREREQUISITES_READY";
        lineage: ChoicePresentationLineage;
        actionRouteCandidate: ChoiceActionRouteCandidate;
        formationSourceSnapshot: ChoiceFormationSourceSnapshot;
        structuralInput: CommitChoiceActionIntentionInput;
        choiceActionIntention: null;
        terminalTarget: null;
        growthReferenceId: null;
      }>)
  | (ChoicePresentationDecisionBase &
      Readonly<{
        state: "WITHHELD";
        reason: ChoicePresentationWithheldReason;
        lineage: ChoicePresentationLineage | null;
        actionRouteCandidate: null;
        formationSourceSnapshot: null;
        structuralInput: null;
        choiceActionIntention: null;
        terminalTarget: null;
        growthReferenceId: null;
      }>)
  | (ChoicePresentationDecisionBase &
      Readonly<{
        state: "RESUME_COMMITTED";
        reason: "CANONICAL_CHOICE_EXISTS";
        lineage: ChoicePresentationLineage;
        actionRouteCandidate: null;
        formationSourceSnapshot: null;
        structuralInput: null;
        choiceActionIntention: ChoiceActionIntention;
        terminalTarget: null;
        growthReferenceId: string;
      }>)
  | (ChoicePresentationDecisionBase &
      Readonly<{
        state: "TERMINAL_BY_GROWTH";
        reason: "HIGHER_GROWTH_ASSET_EXISTS";
        lineage: ChoicePresentationLineage;
        actionRouteCandidate: null;
        formationSourceSnapshot: null;
        structuralInput: null;
        choiceActionIntention: ChoiceActionIntention;
        terminalTarget:
          | "LIVED_RESPONSE_RETURN"
          | "CRYSTAL_FORMATION"
          | "RETURNING_BODY_IMPRINT";
        growthReferenceId: string;
      }>)
  | (ChoicePresentationDecisionBase &
      Readonly<{
        state: "SAFE_WITHHELD";
        reason: ChoicePresentationSafeWithheldReason;
        lineage: ChoicePresentationLineage | null;
        actionRouteCandidate: null;
        formationSourceSnapshot: null;
        structuralInput: null;
        choiceActionIntention: null;
        terminalTarget: null;
        growthReferenceId: null;
      }>);
