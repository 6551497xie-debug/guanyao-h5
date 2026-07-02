/**
 * DEPRECATED / ISOLATED / NOT IN ACTIVE 1.0 FLOW.
 *
 * Dormant archive marker for the pre-1.0 Dynamics branches:
 * - legacy six-space pages
 * - weapon selection / weapon card flows
 * - annular asset settlement
 * - R1 demo dynamics readout
 *
 * These branches are intentionally excluded from the active /dynamics render tree.
 * The active 1.0 path is:
 * selectedPressureSeedContext -> CosmicBotanicsField -> six-node tuning
 * -> starbeast feedback -> hexagram asset pending.
 *
 * Source traceability lives in git history before RC-DYNAMICS-LEGACY-DORMANT-EXTRACT-P1.
 */

export type LegacyDynamicsDormantBranch =
  | "six-space-weapon-annular-asset"
  | "r1-demo-dynamics";

export const LEGACY_DYNAMICS_DORMANT_BRANCHES: ReadonlyArray<{
  branch: LegacyDynamicsDormantBranch;
  status: "DEPRECATED / ISOLATED / NOT IN ACTIVE 1.0 FLOW";
  owns: string[];
  legacyStorageKeys: string[];
  legacyCopyFamilies: string[];
}> = [
  {
    branch: "six-space-weapon-annular-asset",
    status: "DEPRECATED / ISOLATED / NOT IN ACTIVE 1.0 FLOW",
    owns: [
      "legacy six-dimensional render tree",
      "weapon selection and weapon card branches",
      "annular asset settlement branch",
      "legacy localStorage-driven fallback UI",
    ],
    legacyStorageKeys: [
      "guanyao:selectedBodyWeapon",
      "guanyao:selectedEmotionWeapon",
      "guanyao:sixSpace:*",
      "guanyao:*BreakthroughCompleted",
    ],
    legacyCopyFamilies: [
      "left-swipe weapon selection prompts",
      "old reaction reveal copy",
      "annular asset settlement copy",
      "high-risk window copy",
    ],
  },
  {
    branch: "r1-demo-dynamics",
    status: "DEPRECATED / ISOLATED / NOT IN ACTIVE 1.0 FLOW",
    owns: [
      "R1 demo dynamics readout",
      "old interaction trajectory rail",
      "legacy pressure-risk scan gate",
    ],
    legacyStorageKeys: [
      "guanyao:autoYaoPath",
      "guanyao:interactiveYaoPath",
      "guanyao:selectedSceneSlice",
    ],
    legacyCopyFamilies: [
      "R1 demo dynamics title and summary",
      "mother ledger readout copy",
      "binary pressure-risk readouts",
    ],
  },
];

export const LEGACY_DYNAMICS_DORMANT_BOUNDARY = {
  activeFlow: [
    "selectedPressureSeedContext",
    "CosmicBotanicsField",
    "currentDimension",
    "sixNodeTuning",
    "starbeastFeedback",
    "hexagramAssetPending",
  ],
  rule: "Legacy branches are traceable here but cannot render, write, or drive /dynamics.",
} as const;

export function LegacyDynamicsDormant({ branch }: { branch: LegacyDynamicsDormantBranch }) {
  void branch;
  return null;
}
