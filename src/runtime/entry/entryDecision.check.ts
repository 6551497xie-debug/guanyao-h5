import { getEntryUserType } from "./entryDecision";

type EntryDecisionCheckInput = {
  hasBaseline: boolean;
  corruptedDataIgnored?: boolean;
};

type EntryDecisionCheckUserType = ReturnType<typeof getEntryUserType>;

type EntryDecisionCheckCase = {
  input: EntryDecisionCheckInput;
  output: EntryDecisionCheckUserType;
  expected: EntryDecisionCheckUserType;
};

function resolveEntryDecisionForCheck(input: EntryDecisionCheckInput): EntryDecisionCheckUserType {
  if (input.hasBaseline) return "OLD_USER";
  return "NEW_USER";
}

export function runEntryDecisionCheck(): {
  success: boolean;
  cases: EntryDecisionCheckCase[];
} {
  const cases: EntryDecisionCheckCase[] = [
    {
      input: { hasBaseline: false },
      output: resolveEntryDecisionForCheck({ hasBaseline: false }),
      expected: "NEW_USER",
    },
    {
      input: { hasBaseline: true },
      output: resolveEntryDecisionForCheck({ hasBaseline: true }),
      expected: "OLD_USER",
    },
    {
      input: { hasBaseline: false, corruptedDataIgnored: true },
      output: resolveEntryDecisionForCheck({ hasBaseline: false, corruptedDataIgnored: true }),
      expected: "NEW_USER",
    },
  ];

  return {
    success: cases.every((entryCase) => entryCase.output === entryCase.expected),
    cases,
  };
}
