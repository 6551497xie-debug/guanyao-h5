export type XinmaiChoiceReturningProvenanceMutationMode =
  | "ENABLED"
  | "PAUSED";

export const XINMAI_CHOICE_RETURNING_PROVENANCE_MUTATION_MODE:
  XinmaiChoiceReturningProvenanceMutationMode = "ENABLED";

export const isXinmaiChoiceReturningProvenanceMutationEnabled = (
  mode: XinmaiChoiceReturningProvenanceMutationMode =
    XINMAI_CHOICE_RETURNING_PROVENANCE_MUTATION_MODE,
): boolean => mode === "ENABLED";
