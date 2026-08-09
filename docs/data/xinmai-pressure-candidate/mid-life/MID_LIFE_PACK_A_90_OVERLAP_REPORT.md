# MID_LIFE Content Pack A 90 — Overlap Report P0

Status: `AUTHORING SCAN ONLY / INDEPENDENT SEMANTIC REVIEW REQUIRED`

Comparison sets:

1. all 90 active MID_LIFE items (18 accepted samples + 72 drafts);
2. existing locked ESTABLISHING 90;
3. existing Draft Pool;
4. field/context/mechanic slot identities.

Normalization uses Unicode NFKC and removes punctuation and whitespace. Approximate scan uses unique Chinese-character bigram Jaccard similarity across all surface and shell strings.

## Results

| Scan | Result |
|---|---:|
| duplicate active stable IDs | 0 |
| duplicate normalized strings inside MID_LIFE 90 | 0 |
| exact normalized matches against ESTABLISHING 90 + Draft Pool | 0 |
| duplicate field/context/mechanic slots | 0 |
| internal bigram pairs ≥0.25 | 0 |
| internal bigram pairs ≥0.20 and <0.25 | 7 |
| legacy bigram pairs ≥0.25 | 1 |
| legacy bigram pairs ≥0.20 and <0.25 | 1 |

## Closest internal neighborhoods

The highest internal score is 0.231. The main neighborhoods are:

- no available budget versus no available living space;
- waiting for two approvals versus the same relationship event recurring;
- allocation audit basis versus household contribution audit;
- no shared free time versus no complete practice period;
- care/work time collisions within the same EXISTENCE context;
- relationship availability not counted versus family schedule not considered;
- two FAMILY commitment-break events with different decisions: purchase versus cohabitation.

These pairs use different actors, stakes, fields, or contexts. They remain flagged for human review; the authoring scan does not accept them.

## Legacy neighborhood

The only legacy pair at 0.25 is the already independently accepted POWER sample shell “你的版本没有进入讨论” versus Draft Pool wording “你的选择暂时没有进入安排”. The sample text is unchanged by the 72-item authoring pass. Product Control should confirm its prior acceptance remains valid in the complete-pack context.

## Boundary checks requiring human judgment

- POWER authority/access versus INTEREST settlement/resources;
- INTEREST shared-household money versus FAMILY household labor/money;
- RELATION bilateral shared-life negotiation versus FAMILY kin/household decisions;
- SOCIAL visibility/belonging versus POWER access;
- EXISTENCE financial baseline versus INTEREST contract/debt;
- EXISTENCE time structure versus FAMILY care scheduling.
