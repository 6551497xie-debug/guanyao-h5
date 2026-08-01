# XINMAI Choice Direct Real-life Departure Return Intent Provenance Runtime Causal Closure Revalidation P0

> 任务编号：`XINMAI-CHOICE-DIRECT-REAL-LIFE-DEPARTURE-RETURN-INTENT-PROVENANCE-RUNTIME-CAUSAL-CLOSURE-REVALIDATION-P0`
> 刀型：MAP / Independent Closure Revalidation
> 决策：`NOW — MAP ONLY`
> Runtime / Gate：只读，禁止修改
> 远程分支：`origin/codex/genesis-28-mansion-production-continuity`
> 远程 Runtime：`d4a8ad775dd379e615afe3928aa6257c1cf70e5a`
> Runtime 父提交：`b4eafee8c7d919a84d28fba6749e45b38514a46b`
> Forward Counter：`c1249f2e5a7f4ba20f7dfec994b9e9de1314527b`，仅本地保留
> 主 Layer：Layer 4 Growth / Phase 3 Reality Adventure
> 保护：World、Identity、Relationship、Reality provenance
> 边界：Visual Runtime `DEFER`，Phase 4 `LOCKED`

---

## 一、唯一目标

独立复验远程 Runtime 是否已经把 Choice 后的真实生活离场、明确回访、新 Reality Intent、Lived Response 与 `/reality` 承接收束为单一因果：

```text
Choice COMMITTED
↓ 用户明确点击离场
Departure Receipt
↓ Transaction Complete
Dormant Real-life State
↓ 用户以后明确点击“我回来了”
Idempotent Reality Intent + unique Target Cycle
↓
Return Receipt
↓
READY_FOR_LIVED_RESPONSE
↓ 用户明确解决本次回访
├─ 已尝试 / 改变回应 → Fact + Return Receipt consumption → /reality
└─ 尚未尝试 / 拒绝记录 → no Fact → no /reality
```

本刀不修改 Runtime、Gate、Schema、文案、Renderer 或视觉，不裁决 Phase 3 整体体验是否通过，不解锁 Phase 4。

---

## 二、证据等级

| 标记 | 证据 |
|---|---|
| `R` | 远程分支与提交拓扑 |
| `C` | 远程同 SHA 干净快照 |
| `T` | TypeScript / Production Build |
| `G` | 完整 79 项 XINMAI 交付口径 |
| `B` | 正式生产浏览器路径 |
| `K` | Forward `SAFE_WITHHELD` Counter |

浏览器证据未使用 Acceptance Page、Fixture、开发 Harness、查询参数模拟、手工 Storage 写入或直接服务调用。协议声明和源码字符串不能替代正式点击。

---

## 三、远程与快照完整性

精确远程交付：

```text
Expected Remote Parent：
b4eafee8c7d919a84d28fba6749e45b38514a46b

Pushed Candidate：
d4a8ad775dd379e615afe3928aa6257c1cf70e5a

Remote Branch：
codex/genesis-28-mansion-production-continuity

Push Mode：
NON-FORCED FAST-FORWARD

Post-push Remote HEAD：
d4a8ad775dd379e615afe3928aa6257c1cf70e5a
```

独立关闭快照为 Detached HEAD，精确等于远程 Runtime。Counter 不在远程历史。主工作树既存 34 项修改没有进入 Candidate 或关闭快照。

裁决：`R / C PASS`。

---

## 四、构建、全量门禁与基线黄灯

远程同 SHA 干净快照执行：

```text
TypeScript：PASS
Production Build：PASS
Registered XINMAI Aliases：52 / 52 PASS
Unique Atomic XINMAI Scripts：77 / 77 PASS
Delivery Gate Count：79 / 79 PASS
Missing Aliases：0
新增失败：0
```

Production Bundle 搜索结果：

```text
XinmaiLivedGrowthAcceptancePage：0
xinmai-acceptance：0
DevelopmentFixture：0
```

完整 `check:release` 仍停在远程父基线已经存在的黄灯：

```text
check:mother-code-profile-persistence-semantics
Gravity delegates input resolution missing=resolveDynamicsInputContext({
```

Candidate 没有删除、弱化或取消注册任何 XINMAI Gate；该基线黄灯不是本次 Runtime 新增因果，也不被误报为全仓通过。

裁决：`T / G PASS`。

---

## 五、正式生产因果复验

远程同 SHA 干净快照重新完成原生 Motion 正式路径：

```text
/launch-lab?entryUser=new
→ Genesis Identity
→ Relationship
→ /reality Pressure Recognition
→ /dynamics Gravity Observation
→ deterministic Action Route
→ Choice COMMITTED
→ Explicit Departure
→ Dormant Real-life State
→ /launch-lab?entryUser=old
→ Explicit Return
→ Lived Response
→ Fact
→ /reality
```

关键可见事实：

1. 生命核心长按完成后，页面只出现唯一离场动作“带着这一步，回到生活”；
2. 用户明确点击后，页面进入安静离场终态：

   > 这一步已经被你带回生活。  
   > 不必证明它，也不必现在完成它。  
   > 等你愿意回来时，它会在这里等你。

3. Departure 后没有导航到 `/reality`；
4. 以后从正式 Returning 入口重新进入时，只显示同一 Choice lineage 与“我回来了”；
5. 用户明确点击“我回来了”后，Lived Response 表面才挂载；
6. 用户确认“我试着做了”并留下现实事实后，页面才承接 `/reality`；
7. `/reality` 刷新后继续恢复同一结果；
8. 新标签直接访问 `/dynamics` 只显示“这次看见还没有被完整承接”，不能补造 Admission。

裁决：`B PASS`。

---

## 六、Departure 与 Return 时点

专属 Gate、事务门禁和正式浏览器证据共同证明：

### Departure

```text
Choice COMMITTED
↓ explicit user departure action
Growth Transaction
↓
Departure Receipt
↓ transaction complete
Dormant State
```

此时：

```text
New Reality Intent：0
targetEncounterCycleId：不存在
/reality navigation：0
Return Receipt：0
Lived Response Surface：0
```

刷新、关闭页面、Back / Forward、时间经过和后台生命周期均不能代替 Explicit Departure。

### Return

```text
valid Departure Receipt
↓ explicit “我回来了”
idempotent Reality Intent request
↓
unique targetEncounterCycleId
↓
Growth Transaction writes Return Receipt
↓ transaction complete
READY_FOR_LIVED_RESPONSE
```

Return Intent 已建立而 Growth 写入失败时，同一请求只恢复同一个 Target Cycle；不得生成第二 Intent。Return Receipt 不会在 Intent 确认前提前成立。

裁决：`PASS`。

---

## 七、四类 Lived Response 去向

同一不可变 Runtime SHA 的 Push Gate 浏览器矩阵与本次远程代表路径共同冻结：

| 用户结果 | Fact | Return Receipt | `/reality` | Growth |
|---|---:|---|---|---|
| 已尝试 | `1` | 同事务消费 | 合法承接 | 进入既有 Eligibility 规则 |
| 改变回应 | `1`，记录实际回应 | 同事务消费 | 合法承接 | 不按原 Choice 一致性评分 |
| 尚未尝试 | `0` | 保留可继续关系 | `0` | Eligibility / Crystal 均为 `0` |
| 拒绝记录 | `0` | 结束当前表面并安全同行 | `0` | 不推断用户没有行动 |

所有路径均没有惩罚、倒计时、AI 推测完成或页面成功补偿。Fact 成功而导航失败时，只允许重试 `/reality` 承接，不得重复 Fact 或 Return Receipt 消费。

裁决：`PASS`。

---

## 八、事务、并发与恢复

完整 79 项门禁及同一 Candidate 的 Push Gate 矩阵确认：

- Departure 双击与双标签最终只保留一个确定性 Departure Receipt；
- Return 双击与双标签最终只保留一个 Intent、Target Cycle 和 Return Receipt；
- Fact 写入与 Return Receipt 消费属于同一 Growth 事务；
- Fact 失败时 Return Receipt 不会被错误消费；
- Return Receipt 已消费后不能形成第二 Fact；
- 所有成功反馈晚于事务完成；
- 旧标签晚到、identity / cycle / Choice / Route / Reality Proof 失配均进入 `SAFE_WITHHELD`；
- Target Intent 建立后 Growth 写入失败可幂等恢复，不产生第二 Target；
- Direct URL、页面、DOM、计时器和浏览器生命周期均不能生产 Receipt、Fact 或 Admission；
- `/reality` 导航失败不回滚合法 Fact，也不重新执行 Resolution。

远程代表路径另行确认 Refresh 保持合法 Resolution，新的 Direct URL 不绕过 Admission。

裁决：`PASS`。

---

## 九、V1、Schema 与旧语义隔离

```text
Physical IndexedDB Version：UNCHANGED
Object Store Count：UNCHANGED
Canonical Growth Envelope：V2-compatible
V1 Read：SUPPORTED
V1 Receipt Initialization：EMPTY
Historical Fact Backfill：0
Legacy AWAITING_RETURN → Departure / Return Backfill：0
```

首次合法 V2 写入不删除、不覆盖或重解释既有 Choice、Fact、Eligibility、Formation Receipt、Crystal 与 Archive Projection。V1 / V2 混合标签通过同一 Growth Transaction Authority 协调，旧页面语义不能成为 Receipt 真源。

裁决：`PASS`。

---

## 十、Motion、Reduced Motion 与 Pointer

本次远程干净快照原生偏好为：

```text
prefers-reduced-motion: reduce = false
```

因此本次重新完成完整 Motion 正式路径。原生 Reduced Motion 证据来自推送前同一不可变 Candidate SHA `d4a8ad7…`，没有使用查询参数模拟；远程 HEAD、干净快照 HEAD 与该浏览器证据 SHA 已重新核为完全相同。两种模式共同消费同一 Typed Admission、Receipt、Intent、Fact 与 Resolution 语义，只有视觉 Outcome 类型不同。

Pointer 真实点击复验：

```text
READY_FOR_LIVED_RESPONSE
→ Lived Response controls mounted and clickable

RESUME_COMMITTED / AWAITING_EXPLICIT_RETURN / RESUME_REPORTED / SAFE_WITHHELD
→ no clickable Lived Response bypass
```

透明 Canvas 没有覆盖正式按钮，Pointer Fix 没有形成独立 Admission 旁路。

裁决：`PASS`。

---

## 十一、Forward SAFE_WITHHELD Counter

Counter：

```text
c1249f2e5a7f4ba20f7dfec994b9e9de1314527b
```

父提交精确为远程 Runtime：

```text
d4a8ad775dd379e615afe3928aa6257c1cf70e5a
```

Counter 只修改：

```text
src/services/xinmaiChoiceReturningProvenanceMutationPolicy.ts
1 insertion / 1 deletion
```

独立 Counter 快照执行：

```text
TypeScript：PASS
Production Build：PASS
Registered XINMAI Aliases：52 / 52 PASS
Unique Atomic XINMAI Scripts：77 / 77 PASS
Delivery Gate Count：79 / 79 PASS
```

在已有 Fact / Target Reality 的浏览器数据上，Counter 仍能只读恢复同一生命与 `/reality`；新 Departure、Return 和 Resolution 由唯一 policy switch 暂停。它不降级 Schema、不删除 Receipt、不复活 `COMMITTED → Lived Response`、旧开放 Growth Item 或混合 Departure 按钮。

Counter 保持本地，不推送。

裁决：`K PASS`。

---

## 十二、关闭裁决

```text
Exact Remote Delivery：PASS

Departure Receipt Authority：PASS

Departure-time Reality Intent：0

Return-time Target Intent：UNIQUE / PASS

Return Receipt Authority：PASS

Fact + Return Consumption Atomicity：PASS

Attempted / Changed Response：Fact → /reality PASS

Not Attempted / Reject Record：No Fact / No Reality PASS

Refresh / Back / Forward / Direct URL：PASS

Multi-tab / stale / mismatch：PASS

V1 / No Backfill / Schema Protection：PASS

Motion / Native Reduced Motion Semantic Parity：PASS

Pointer Reachability：PASS

Forward SAFE_WITHHELD：PASS

Returning Provenance Runtime Authority：ESTABLISHED

Returning Provenance Runtime Delivery：CLOSED / PASS
```

`CLOSED` 只表示：

> Choice 不再提前制造新的 Reality；用户明确离场只形成 Departure Receipt，明确回来后才建立唯一 Target Intent，现实回应被用户确认后才由 `/reality` 承接。

它不表示：

- Phase 3 已 `PASSED`；
- Reality Adventure 的离场、回访、Crystal 归因和 Body Imprint 体验已关闭；
- Visual Runtime 已获授权；
- Phase 4 已解锁；
- 浏览器生命周期或等待时长可以推测用户事实。

阶段保持：

```text
Phase 3：ACTIVE / NOT PASSED
Visual Runtime：DEFER
Phase 4：LOCKED
```

---

## 十三、刀后交通灯与下一刀

本刀没有发现由本次 Runtime 新增的黄灯或红灯。

既有独立黄灯继续保持：

```text
mother-code-profile：YELLOW / BASELINE MAP
```

它没有成为本次 Returning Provenance 的正式消费者，不反向阻塞本刀关闭。

下一刀固定为：

```text
XINMAI-PHASE-3-REALITY-ADVENTURE-
END-TO-END-CLOSURE-REVALIDATION-P1

交通灯：YELLOW
刀型：MAP / Phase Closure Revalidation
决策：NOW — MAP ONLY
```

下一刀必须从正式生产入口重新判断：

```text
First Encounter
→ Relationship
→ Reality Pressure Recognition
→ Gravity Observation
→ Action Route Choice
→ Explicit Real-life Departure
→ Explicit Return
→ Lived Response
→ Crystal Formation
→ Returning Body Imprint
```

是否同时具备技术闭环、恢复连续性和用户理解；不得在该审计中顺带修改 Runtime、Gate、文案、视觉或解锁 Phase 4。
