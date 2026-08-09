# Pressure Candidate Coverage Matrix P0

## Production target and pack status

| Life Stage | POWER | INTEREST | RELATION | FAMILY | SOCIAL | EXISTENCE | Total | Release status |
|---|---:|---:|---:|---:|---:|---:|---:|---|
| YOUTH | 15 | 15 | 15 | 15 | 15 | 15 | 90 | Pack B / not authored |
| ESTABLISHING | 15 | 15 | 15 | 15 | 15 | 15 | 90 | existing revision locked |
| MID_LIFE | 15 | 15 | 15 | 15 | 15 | 15 | 90 | Pack A / not authored |
| RESTRUCTURING | 15 | 15 | 15 | 15 | 15 | 15 | 90 | Pack C / not authored |
| SIXTY_PLUS | 15 | 15 | 15 | 15 | 15 | 15 | 90 | Pack D / not authored |
| **Total** | **75** | **75** | **75** | **75** | **75** | **75** | **450** | no partial cutover |

Unknown stage coverage target is exactly zero. Any unknown Life Stage outcome remains an explicit typed unsupported condition; it cannot fall back to another stage.

## Per-node 15-slot worksheet

Copy this worksheet once for every Stage × Field node. Replace the five context labels with the field-specific list in the main protocol.

| Context | Rule/information gap | Power/resource asymmetry | Boundary/commitment break | Duplicate result | Review result |
|---|---|---|---|---|---|
| Context 1 | EMPTY | EMPTY | EMPTY | PENDING | PENDING |
| Context 2 | EMPTY | EMPTY | EMPTY | PENDING | PENDING |
| Context 3 | EMPTY | EMPTY | EMPTY | PENDING | PENDING |
| Context 4 | EMPTY | EMPTY | EMPTY | PENDING | PENDING |
| Context 5 | EMPTY | EMPTY | EMPTY | PENDING | PENDING |

Node completion fields:

```yaml
life_stage: ""
pressure_field: ""
expected_count: 15
actual_count: 0
environment_or_other_actor_led: 0 # minimum 5
body_time_resource_led: 0 # minimum 3
negotiated_choice_or_boundary: 0 # minimum 3
metadata_complete_percent: 0
exact_duplicate_checked_percent: 0
semantic_overlap_checked_percent: 0
hard_safety_pass_percent: 0
node_status: EMPTY # EMPTY | DRAFTING | IN_REVIEW | PASSED | LOCKED
```

## Pack lock roll-up

| Gate | Required result |
|---|---|
| Representative calibration | 18/18 reviewed; Product Control `SAMPLE_ACCEPTED` |
| Full coverage | 6 fields × 15 slots = 90 |
| Required metadata | 100% |
| Stable ID uniqueness | 100%; no reused retired IDs |
| Exact duplicate check | 100% against pack and existing locked content |
| Semantic overlap check | 100% cross-field and cross-stage |
| Safety review | 100% pass; no hard rejection |
| Score | every item ≥21/24; dimensions 6–8 all 2 |
| Reviewer coverage | Editorial, Safety, Overlap, Product Control complete |
| Runtime exposure | 0 before final cutover |
| Final result | `PRODUCT_CONTROL_LOCKED` or not eligible |
