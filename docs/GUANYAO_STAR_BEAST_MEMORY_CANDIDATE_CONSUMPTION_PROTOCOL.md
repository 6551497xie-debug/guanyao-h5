# GUANYAO Star Beast Memory Candidate Consumption Protocol
# 观爻星兽生命记忆候选消费协议

版本：Evolution Phase 2 前置 / P38

状态：STAR BEAST MEMORY CANDIDATE CONSUMPTION

施工编号：`RC-STAR-BEAST-MEMORY-CANDIDATE-CONSUMPTION-P38`

## 00｜协议定位

核心边界固定为：

```text
Candidate ≠ Memory
```

Memory Candidate 只表示一段生命经历具备成为未来星兽记忆的资格。是否真正成为 Memory，必须由后续独立 Memory Engine 决定。

P38 的定义是：

> 将已经具备生命记忆资格的候选经历，转换为未来 Memory Engine 可读取的稳定候选消费结果。

P38 不创建 Memory，不写 Storage，不触发 Growth、Archive 或 Visual。

## 01｜输入边界

`StarBeastMemoryCandidateConsumptionInput` 只保存三个引用：

- `memoryEligibilityResult`：P37 Eligibility Result 原始引用；
- `candidateReference`：P37 Candidate 原始引用，如不存在则为 null；
- `sourceDeclarationReference`：Candidate 的原始 Declaration 引用，如不存在则为 null。

P38 不复制生命经历、Journey、Crystal、主体或 Declaration 事实。

## 02｜AVAILABLE

只有以下条件同时满足时，P38 返回 AVAILABLE：

1. Eligibility Result 为 AVAILABLE；
2. Candidate Reference 存在；
3. Candidate Reference 与 Eligibility Result 中的 Candidate 是同一对象；
4. Source Declaration Reference 存在；
5. Source Declaration Reference 与 Candidate 中的 Declaration 是同一对象。

AVAILABLE 生成 `StarBeastMemoryCandidateConsumption`，其固定字段为：

- `candidateReference`：原始 Candidate 引用；
- `sourceEligibilityReference`：原始 Eligibility Result 引用；
- `sourceDeclarationReference`：原始 Declaration 引用；
- `consumptionStatus: AVAILABLE_FOR_FUTURE_MEMORY_ENGINE`；
- `reason: ELIGIBLE_CANDIDATE_READY_FOR_FUTURE_MEMORY_ENGINE`。

同时必须明确：

- `notMemory: true`；
- `notMemoryRecord: true`；
- `noMemoryWrite: true`。

## 03｜NOT_APPLICABLE

Eligibility Result 为 NOT_APPLICABLE 时，P38 保持：

```text
NOT_APPLICABLE / MEMORY_ELIGIBILITY_NOT_APPLICABLE
```

这不是错误，只表示这次经历不进入未来记忆链。P38 不生成 Candidate Consumption，也不创建 Memory。

## 04｜UNAVAILABLE

以下情况返回 UNAVAILABLE：

- Eligibility Result 为 UNAVAILABLE；
- Candidate Reference 缺失；
- Candidate Reference 与 Eligibility Candidate 引用不一致；
- Source Declaration Reference 缺失；
- Source Declaration Reference 与 Candidate Declaration 引用不一致。

UNAVAILABLE 表示 Candidate 信息不足或引用不一致，等待未来补充；它不重新执行 Eligibility，也不修复或复制引用。

## 05｜单向消费

调用方向只能是：

```text
Memory Eligibility Result
↓
Candidate Consumption
```

P38 不得：

- 调用 `resolveStarBeastMemoryEligibility`；
- 调用 Authority Endpoint、Resolver 或 Consumption；
- 重新判断 Authority、Declaration 或 Memory Eligibility；
- 修改 P37 Eligibility Result 或 Candidate。

## 06｜严格禁止

P38 禁止：

- 创建 `StarBeastMemory` 或任何 Memory Record；
- 写入或读取 Storage、Persistence；
- 修改用户画像；
- 修改 StarBeastState、StarBeastGrowth、Presence 或 Response；
- 修改 Crystal、Archive、Journey Stage 或 Authority Declaration；
- 接入 Runtime、UI、Visual、网络或 AI。

## 07｜调用所有权

- P37 Eligibility Result 只作为 P38 Input 的类型来源；
- P38 Service 不调用 P37 Eligibility Service；
- P38 Candidate Consumption 当前没有下游业务消费者；
- Memory Engine 正式创建时机保持冻结，必须等待总控重新评估并独立授权。

## 08｜施工范围

P38 只新增：

- `starBeastMemoryCandidateConsumption` 类型；
- `starBeastMemoryCandidateConsumptionService`；
- 本协议与独立 candidate consumption gate；
- 类型出口与 release gate 注册。

同时只校准 P37 对 P38 类型引用的合法拓扑，不修改 P0–P37 已有结果。

## 09｜验收

1. AVAILABLE Eligibility 与完整一致引用生成 Candidate Consumption；
2. NOT_APPLICABLE 保持非错误且不生成 Memory；
3. UNAVAILABLE、缺失或错配引用保持等待；
4. Consumption 只保留 Candidate、Eligibility、Declaration 原始引用；
5. 不创建 Memory，不修改 StarBeastState、Growth、Crystal 或 Archive；
6. P37 gate、release、build 与 `git diff --check` 通过。
