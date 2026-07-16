import type {
  StarBeastGenesisExperienceState,
  StarBeastGenesisRevealBlocked,
  StarBeastGenesisRevealReady,
  StarBeastGenesisRevealResult,
  StarBeastGenesisRevealUnavailable,
} from "./starBeastGenesisExperience";

export type StarBeastGenesisPreviewScopeReference = Readonly<{
  referenceType: "STAR_BEAST_GENESIS_PREVIEW_SCOPE";
  referenceId: string;
  scope: "ISOLATED_GENESIS_PREVIEW_ONLY";
}>;

export type StarBeastGenesisManualAcceptanceReference = Readonly<{
  referenceType: "STAR_BEAST_GENESIS_MANUAL_ACCEPTANCE";
  referenceId: string;
  humanReviewRequired: true;
  noAutomaticProductAcceptance: true;
}>;

export type StarBeastGenesisExperiencePresentationReadinessInput = Readonly<{
  genesisRevealResultReference: StarBeastGenesisRevealResult | null;
  genesisExperienceStateReference: StarBeastGenesisExperienceState | null;
  previewScopeReference: StarBeastGenesisPreviewScopeReference | null;
  manualAcceptanceReference:
    | StarBeastGenesisManualAcceptanceReference
    | null;
}>;

type StarBeastGenesisExperiencePresentationReadinessBoundary = Readonly<{
  readinessOnly: true;
  noPresentationCreation: true;
  noUIIntegration: true;
  noLaunchIntegration: true;
  noRendererInvocation: true;
  noCanvasConnection: true;
  noLifeStateMutation: true;
  noAssetMutation: true;
  noRuntimeIntegration: true;
  noStorageWrite: true;
}>;

export type StarBeastGenesisExperiencePresentationReadinessReady = Readonly<{
  status: "READY";
  readiness: "READY_FOR_ISOLATED_GENESIS_EXPERIENCE_PREVIEW";
  source: "star_beast_genesis_experience_presentation_readiness";
  input: StarBeastGenesisExperiencePresentationReadinessInput;
  genesisRevealResultReference: StarBeastGenesisRevealReady;
  genesisExperienceStateReference:
    StarBeastGenesisRevealReady["experienceState"];
  previewScopeReference: StarBeastGenesisPreviewScopeReference;
  manualAcceptanceReference: StarBeastGenesisManualAcceptanceReference;
  boundary: StarBeastGenesisExperiencePresentationReadinessBoundary;
}>;

export type StarBeastGenesisExperiencePresentationReadinessUnavailableReason =
  | "GENESIS_REVEAL_RESULT_REFERENCE_REQUIRED"
  | "GENESIS_REVEAL_UNAVAILABLE"
  | "GENESIS_EXPERIENCE_STATE_REFERENCE_REQUIRED"
  | "PREVIEW_SCOPE_REFERENCE_REQUIRED"
  | "MANUAL_ACCEPTANCE_REFERENCE_REQUIRED";

export type StarBeastGenesisExperiencePresentationReadinessUnavailable =
  Readonly<{
    status: "UNAVAILABLE";
    readiness: "UNAVAILABLE";
    source: "star_beast_genesis_experience_presentation_readiness";
    reason: StarBeastGenesisExperiencePresentationReadinessUnavailableReason;
    input: StarBeastGenesisExperiencePresentationReadinessInput;
    genesisRevealResultReference:
      | StarBeastGenesisRevealReady
      | StarBeastGenesisRevealUnavailable
      | null;
    sourceUnavailableReason:
      | StarBeastGenesisRevealUnavailable["reason"]
      | null;
    boundary: StarBeastGenesisExperiencePresentationReadinessBoundary;
  }>;

export type StarBeastGenesisExperiencePresentationReadinessBlockedReason =
  | "GENESIS_REVEAL_BLOCKED"
  | "GENESIS_EXPERIENCE_STATE_REFERENCE_MISMATCH"
  | "GENESIS_REVEAL_BOUNDARY_INVALID"
  | "PREVIEW_SCOPE_REFERENCE_INVALID"
  | "MANUAL_ACCEPTANCE_REFERENCE_INVALID";

export type StarBeastGenesisExperiencePresentationReadinessBlocked = Readonly<{
  status: "BLOCKED";
  readiness: "BLOCKED";
  source: "star_beast_genesis_experience_presentation_readiness";
  reason: StarBeastGenesisExperiencePresentationReadinessBlockedReason;
  input: StarBeastGenesisExperiencePresentationReadinessInput;
  genesisRevealResultReference:
    | StarBeastGenesisRevealReady
    | StarBeastGenesisRevealBlocked;
  sourceBlockedReason: StarBeastGenesisRevealBlocked["reason"] | null;
  boundary: StarBeastGenesisExperiencePresentationReadinessBoundary;
}>;

export type StarBeastGenesisExperiencePresentationReadinessResult =
  | StarBeastGenesisExperiencePresentationReadinessReady
  | StarBeastGenesisExperiencePresentationReadinessUnavailable
  | StarBeastGenesisExperiencePresentationReadinessBlocked;
