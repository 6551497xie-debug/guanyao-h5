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
  },
  {
    branch: "r1-demo-dynamics",
    status: "DEPRECATED / ISOLATED / NOT IN ACTIVE 1.0 FLOW",
    owns: [
      "R1 demo dynamics readout",
      "old interaction trajectory rail",
      "legacy pressure-risk scan gate",
    ],
  },
];

export function LegacyDynamicsDormant({ branch }: { branch: LegacyDynamicsDormantBranch }) {
  void branch;
  return null;
}
