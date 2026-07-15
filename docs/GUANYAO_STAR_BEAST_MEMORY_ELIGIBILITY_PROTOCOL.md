# GUANYAO Star Beast Memory Eligibility Protocol
# 观爻星兽生命记忆候选资格协议

版本：Evolution Phase 2 前置 / P37

状态：STAR BEAST MEMORY CANDIDATE ELIGIBILITY

施工编号：`RC-STAR-BEAST-MEMORY-ELIGIBILITY-P37`

## 00｜协议定位

Star Beast 不记录所有发生。Star Beast 只记住真正成为生命一部分的经历。

因此固定边界为：

```text
Experience ≠ Memory

Authority Declaration Consumption
↓
Star Beast Memory Eligibility
↓
Future Star Beast Memory Candidate
```

P37 只判断一次已经完成权威声明消费的生命经历，是否具备成为未来 Memory Candidate 的资格。它不写入 Memory，不执行 Growth，也不进入 Visual 或 Runtime。

## 01｜输入边界

`StarBeastMemoryEligibilityInput` 只接收：

- `authorityDeclarationConsumptionResult`：P36 Endpoint 的输出契约；
- `crystalReference`：已有 Crystal 的引用句柄；
- `journeyReference`：已有 Journey 的引用句柄；
- `lifeSubjectReference`：生命主体引用句柄。

三个引用句柄只携带 `referenceType + referenceId`，不得复制 Crystal、Journey 或主体事实。P37 不生成 Crystal，也不读取或重建这些对象。

## 02｜AVAILABLE

只有以下条件同时成立时，P37 返回 AVAILABLE：

1. Authority Declaration Consumption 为 AVAILABLE / DECLARED；
2. Crystal Reference 已提供；
3. Journey Reference 已提供；
4. Life Subject Reference 已提供。

AVAILABLE 生成 `StarBeastMemoryCandidate`，并保持：

- `sourceDeclarationReference` 与上游 Declaration 是同一对象引用；
- `journeyReference` 与输入是同一引用；
- `crystalReference` 与输入是同一引用；
- `eligibilityReason` 固定为 `DECLARED_EXPERIENCE_WITH_COMPLETE_REFERENCES`；
- `notMemory: true`；
- `noMemoryWrite: true`。

Candidate 只是未来记忆候选，不是 Star Beast Memory。

## 03｜NOT_APPLICABLE

Authority Declaration Consumption 为 NOT_APPLICABLE 时，P37 必须返回：

```text
NOT_APPLICABLE / AUTHORITY_DECLARATION_NOT_APPLICABLE
```

这不是错误，只表示这次经历不进入生命记忆候选。P37 不生成 Candidate，也不把审查拒绝改写为信息不足。

## 04｜UNAVAILABLE

以下情况返回 UNAVAILABLE：

- Authority Declaration Consumption 为 UNAVAILABLE；
- Crystal Reference 缺失；
- Journey Reference 缺失；
- Life Subject Reference 缺失。

UNAVAILABLE 表示信息不足、等待未来补充，不生成 Candidate，不自动寻找或补写引用。

## 05｜单向资格判断

P37 的方向只能是：

```text
Authority Declaration Consumption Result
→ Memory Eligibility
```

P37 不得：

- 调用 P36 Authority Declaration Endpoint；
- 调用 P34 Resolver 或 P35 Consumption；
- 重新计算、复制或修改 Declaration；
- 反向触发 Authority Review、Evidence、Readiness 或 Explicit Command。

## 06｜严格禁止

P37 不得：

- 创建、写入、持久化或读取 Star Beast Memory；
- 触发 Star Beast Growth；
- 修改 Star Beast Identity、Life Archetype 或 Original Self Foundation；
- 修改 Journey Stage、Hexagram、Yao、Crystal Engine；
- 接入 Runtime、Persistence、Storage、UI、Visual、网络或 AI。

## 07｜调用所有权

- P36 Endpoint 输出契约只作为 P37 Input 的类型来源；
- P37 Service 不调用 P36 Endpoint 函数；
- P37 Eligibility Service 当前没有下游函数调用者；
- P37 Eligibility Result 只作为 P38 Candidate Consumption Input 的类型来源；
- Future Star Beast Memory 必须通过后续独立 Memory Engine 协议授权。

## 08｜施工范围

P37 只新增：

- `starBeastMemoryEligibility` 类型；
- `starBeastMemoryEligibilityService`；
- 本协议与独立 eligibility gate；
- 类型出口与 release gate 注册。

同时只校准 P21、P34、P36 对 P37 类型引用的合法拓扑，不修改 P0–P36 已有业务结果。

## 09｜验收

1. AVAILABLE / DECLARED 且三个引用完整时才产生 Candidate；
2. Candidate 保留原始 Declaration、Journey、Crystal 引用；
3. NOT_APPLICABLE 保持非错误的资格不适用；
4. UNAVAILABLE 与缺失引用均不产生 Candidate；
5. 不写 Memory、不触发 Growth、不调用 Authority Chain；
6. P21、P24–P36 gates、release、build 与 `git diff --check` 通过。
