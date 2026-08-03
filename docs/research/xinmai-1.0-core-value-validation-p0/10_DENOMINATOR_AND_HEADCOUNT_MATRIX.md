# 10｜最终分母与人数换算矩阵

> 模板状态：`FROZEN CALCULATION RULES / EMPTY COUNTS`

## 1. 冻结人数

```text
N_RECRUITED = [填写]
N_ENROLLED = [填写]
N_DAY0_DEPARTED = [填写]
N_FORMATION_OBSERVED = [填写]
N_FREE_LOOP_COMPLETED = [填写]
N_SPONTANEOUS_RETURN = [填写]
N_RETURNED_ANY = [填写]
N_CONCEPT_EXPOSED = [填写]
N_CONTINUITY_SELECTED = [填写]
N_WAITLIST_INTENT = [填写]
N_TECHNICAL_BLOCKED = [填写]
N_WITHDRAWN = [填写]
```

## 2. 8–12人换算

| 分母 | ≥80% | ≥75% | ≥50% | ≥40% | ≥25% | ≤20%最多 |
|---:|---:|---:|---:|---:|---:|---:|
| 8 | 7 | 6 | 4 | 4 | 2 | 1 |
| 9 | 8 | 7 | 5 | 4 | 3 | 1 |
| 10 | 8 | 8 | 5 | 4 | 3 | 2 |
| 11 | 9 | 9 | 6 | 5 | 3 | 2 |
| 12 | 10 | 9 | 6 | 5 | 3 | 2 |

## 3. ≥70%可变分母

| 实际分母 | 至少人数 |
|---:|---:|
| 4 | 3 |
| 5 | 4 |
| 6 | 5 |
| 7 | 5 |
| 8 | 6 |
| 9 | 7 |
| 10 | 7 |
| 11 | 8 |
| 12 | 9 |

其他分母使用向上取整。≤20%使用向下取整。

## 4. A层计算

```text
A_core_value = N_A_UNAIDED_CORE_VALUE / N_FORMATION_OBSERVED
A_attempt_vs_success = N_A_ATTEMPT_CORRECT / N_FORMATION_OBSERVED
A_same_life = N_A_SAME_LIFE_CORRECT / N_FORMATION_OBSERVED
A_misframe = N_A_REWARD_ASTROLOGY_AI_MISFRAME / N_FORMATION_OBSERVED
A_reach = N_FORMATION_OBSERVED / N_ENROLLED
```

`N_FORMATION_OBSERVED < 6`：A层`INCONCLUSIVE`。

冻结判断：

- `A_core_value ≥ 80%`；
- `A_attempt_vs_success ≥ 75%`；
- `A_same_life ≥ 75%`；
- `A_misframe ≤ 20%`；
- 上述结果必须与`A_reach`并列报告，不能只解释已经看见Formation的子样本。

## 5. B层计算

```text
B_spontaneous_primary = N_SPONTANEOUS_RETURN / N_DAY0_DEPARTED
B_spontaneous_all = N_SPONTANEOUS_RETURN / N_ENROLLED
B_continuity_reason = N_CONTINUITY_MOTIVATED_RETURN / N_SPONTANEOUS_RETURN
B_other_only = N_NEW_CONTENT_COMFORT_NOVELTY_ONLY / N_RETURNED_ANY
B_prompted = N_RESEARCHER_PROMPTED_RETURN / N_DAY0_DEPARTED
```

研究提醒后的回访不能加入`N_SPONTANEOUS_RETURN`。

冻结判断：

- `B_spontaneous_primary ≥ 50%`；
- `B_continuity_reason ≥ 70%`；
- `B_other_only ≤ 20%`；
- `B_spontaneous_all`和`B_prompted`必须并列展示，不得把研究提醒后的回访补入主结果。

## 6. C层三分母

必须完整填报，不得择优引用：

| 分子 | / N_ENROLLED | / N_FREE_LOOP_COMPLETED | / N_SPONTANEOUS_RETURN |
|---|---|---|---|
| N_CONTINUITY_SELECTED | `[ ] / [ ]` | `[ ] / [ ]` | `[ ] / [ ]` |
| N_WAITLIST_INTENT | `[ ] / [ ]` | `[ ] / [ ]` | `[ ] / [ ]` |

概念理解另报：

```text
C_correct_payment_object = N_CORRECT_PAYMENT_OBJECT / N_CONCEPT_EXPOSED
C_asset_lock_misbelief = N_ASSET_LOCK_MISBELIEF / N_CONCEPT_EXPOSED
C_pay_to_grow_misbelief = N_PAY_TO_GROW_MISBELIEF / N_CONCEPT_EXPOSED
```

分母为0时写`0 / 0 — NOT OBSERVABLE`。

冻结判断：

- `N_CONTINUITY_SELECTED / N_ENROLLED ≥ 40%`；
- `N_WAITLIST_INTENT / N_ENROLLED ≥ 25%`；
- `C_correct_payment_object ≥ 70%`；
- `N_ASSET_LOCK_MISBELIEF = 0`；
- 禁止时点商业概念暴露次数`= 0`；
- 免费闭环完成者与自然回访者的高比例只能解释选择偏差，不能替代全部入组分母。

## 7. 路径处置矩阵

| 路径 | N_ENROLLED | N_FREE_LOOP_COMPLETED | 成功分子 |
|---|---:|---:|---:|
| 完整形成 | 1 | 1 | 按实际证据 |
| 尚未尝试 | 1 | 0 | 0 |
| 拒绝记录 | 1 | 0 | 0 |
| 技术阻断 | 1 | 0 | 0，并单列阻断 |
| 入组后退出 | 1 | 0 | 0，并单列退出 |
| Day 0前未开始 | 0 | 0 | 0，仅计N_RECRUITED |

## 8. C层最低人数方向

以`N_ENROLLED`为保守主分母：

| N_ENROLLED | Continuity选择≥40% | Waitlist意向≥25% |
|---:|---:|---:|
| 8 | 4 | 2 |
| 9 | 4 | 3 |
| 10 | 4 | 3 |
| 11 | 5 | 3 |
| 12 | 5 | 3 |

自然回访者或免费闭环完成者中的高比例不能替代此总分母结果。
