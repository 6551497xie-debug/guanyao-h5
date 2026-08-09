# Pressure Candidate Review Scorecard P0

Score each dimension `0 = fail`, `1 = revise`, `2 = pass`. Passing requires at least 21/24, all hard-safety dimensions at 2, and no rejection condition.

| # | Dimension | 2-point evidence | Hard safety |
|---:|---|---|:---:|
| 1 | Observable occurrence | actor/context and visible action or non-action are explicit | |
| 2 | Two-second recognition | answerable as “像我 / 不完全是 / 不是现在” without interpretation | |
| 3 | Field fit | one primary Pressure Field is unambiguous | |
| 4 | Stage salience and portfolio contribution | credible for the stage and adds a required actor/commitment/constraint/choice to the pack; adjacent-stage plausibility is allowed | |
| 5 | Concrete specificity | neither generic philosophy nor an over-detailed story | |
| 6 | No diagnosis or inner-state invention | no psychology, trauma, prognosis, fate, or personality claim | **yes** |
| 7 | Responsibility balance | user is not made sole cause; system/other actor and resource constraints are respected | **yes** |
| 8 | Safety and non-stereotyping | no forbidden shame, fear, disease implication, or generational assumption | **yes** |
| 9 | Plain and brief Chinese | surface ≤30 and shell ≤20 Chinese characters excluding punctuation | |
| 10 | Surface/shell separation | surface states occurrence; shell states immediate stake | |
| 11 | Distinctness | no exact, normalized, near-semantic, or cross-stage mechanical duplicate | |
| 12 | Play readiness | creates a recognizable choice point without advice or prescribed answer | |

## Review record

```yaml
stable_id: "<candidate id>"
scores: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
total: 0
hard_safety_pass: false
exact_duplicate_check: PENDING
semantic_overlap_check: PENDING
stage_stereotype_check: PENDING
decision: REJECT # REJECT | REVISE | PASS
reviewer_id: ""
reviewed_at: ""
reason: ""
```

## Hard rejection conditions

- diagnosis, trauma inference, personality/fate/maturity judgment, advice, therapy language, or philosophical explanation;
- age fear, disease implication, retirement/care fear, marriage/fertility shame, wealth shame, or generational stereotype;
- mechanical replacement of age/stage words, or decorative tenure/count/“长期” used only to prove stage; durations required by the event remain allowed;
- duplicate or materially overlapping situation within the node, pack, existing locked 90, or another stage;
- Mother Code, stars, Identity, runtime AI, or real-user personal data used as a causal input;
- AI-assisted content directly promoted, undisclosed assistance, author self-approval, or missing review provenance;
- wrong Field or fixed coverage slot, missing required metadata, unstable/reused ID, or inconsistent revision;
- content claims success, failure, or user responsibility without an observable event.

## Node and pack review

- [ ] Each node has exactly 15 unique context × mechanic slots.
- [ ] Each node has ≥5 environment/system/other-actor-led, ≥3 body/time/resource-led, and ≥3 negotiated-choice/boundary situations.
- [ ] The complete pack—not every isolated item—credibly distributes role transitions, parallel existing commitments, limited time/resources, care/shared-life coordination, and exit/reselection.
- [ ] Normalized exact-match comparison is 100% complete.
- [ ] Semantic overlap comparison covers the full new pack and existing locked 90.
- [ ] Editorial, Safety, Overlap, and Product Control reviewers are attributable and separated from authors.
- [ ] Product Control sampled every field and recorded accept/revise/reject counts.
- [ ] All rejected IDs are retired or returned to DRAFT; none are silently replaced under the same content hash.
