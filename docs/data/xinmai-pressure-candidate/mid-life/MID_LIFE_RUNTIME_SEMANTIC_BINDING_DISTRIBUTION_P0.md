# MID_LIFE Runtime Semantic Binding Distribution P0

Status: `AUTHOR SELF-CHECK / NOT INDEPENDENT REVIEW`

## Total distribution

| Field | EVALUATION | RESOURCE | ATTACHMENT | CONTROL | OBLIGATION | BELONGING | IDENTITY | SURVIVAL | Total |
|---|---:|---:|---:|---:|---:|---:|---:|---:|---:|
| POWER | 4 | 2 | 0 | 6 | 3 | 0 | 0 | 0 | 15 |
| INTEREST | 0 | 13 | 0 | 2 | 0 | 0 | 0 | 0 | 15 |
| RELATION | 0 | 2 | 7 | 4 | 2 | 0 | 0 | 0 | 15 |
| FAMILY | 0 | 6 | 0 | 3 | 6 | 0 | 0 | 0 | 15 |
| SOCIAL | 0 | 1 | 0 | 1 | 4 | 9 | 0 | 0 | 15 |
| EXISTENCE | 0 | 9 | 0 | 0 | 0 | 0 | 5 | 1 | 15 |
| TOTAL | 4 | 33 | 7 | 16 | 15 | 9 | 5 | 1 | 90 |

No distribution quota was applied.

## Mechanic × nature observation

| Mechanic | EVALUATION | RESOURCE | ATTACHMENT | CONTROL | OBLIGATION | BELONGING | IDENTITY | SURVIVAL | Total |
|---|---:|---:|---:|---:|---:|---:|---:|---:|---:|
| RULE_OR_INFORMATION_GAP | 2 | 11 | 4 | 2 | 5 | 4 | 2 | 0 | 30 |
| POWER_OR_RESOURCE_ASYMMETRY | 1 | 15 | 1 | 6 | 2 | 4 | 1 | 0 | 30 |
| BOUNDARY_OR_COMMITMENT_BREAK | 1 | 7 | 2 | 8 | 8 | 1 | 2 | 1 | 30 |

The rows differ across nature values, which confirms the draft was not produced by a three-mechanic mapping.

## IDENTITY draft list

- `MID_LIFE_EXISTENCE_07` → `PC-MID_LIFE-EXISTENCE-WORK_ROLE_MEANING-RULE_GAP-01`: 旧工作内容结束而新角色内容缺失，核心是用户在持续工作中的角色定位无法成立。
- `MID_LIFE_EXISTENCE_08` → `PC-MID_LIFE-EXISTENCE-WORK_ROLE_MEANING-RESOURCE_ASYMMETRY-01`: 实际持续投入与职责表留下的角色内容不一致，核心是工作身份被错误定义。
- `MID_LIFE_EXISTENCE_09` → `PC-MID_LIFE-EXISTENCE-WORK_ROLE_MEANING-COMMITMENT_BREAK-01`: 已经退出讲师职责却仍被排入下一期，核心是已结束的工作角色仍被外部继续指认。
- `MID_LIFE_EXISTENCE_13` → `PC-MID_LIFE-EXISTENCE-TRANSITION_DIRECTION-RULE_GAP-01`: 结束现有工作后新方向没有开始时间，核心是下一段工作与生活角色尚未形成。
- `MID_LIFE_EXISTENCE_15` → `PC-MID_LIFE-EXISTENCE-TRANSITION_DIRECTION-OLD_COMMITMENT_BREAK-02`: 已停止旧接单却被旧客户拉回并挤压新方向面试，核心是新旧职业身份的归属冲突。

## SURVIVAL draft list

- `MID_LIFE_EXISTENCE_12` → `PC-MID_LIFE-EXISTENCE-FINANCIAL_BASELINE-COMMITMENT_BREAK-01`: 承诺转来的费用未到账并造成当周基本开销缺口，核心已直接触及最低生活基线而非普通预算不便。

`SURVIVAL` triggers downstream Choice safe-withholding. Its only use is not author-accepted and remains a named independent-review risk.

## Coverage and dual-ID proof

- 90 records; six fields ×15.
- Each field contains slots `01..15` exactly once.
- 90 authoring stable IDs, 90 Runtime IDs, and 90 source hashes are individually unique.
- Runtime ID form is exactly `MID_LIFE_<FIELD>_<01..15>`.
- Mapping is bijective and explicit in the binding pack.
