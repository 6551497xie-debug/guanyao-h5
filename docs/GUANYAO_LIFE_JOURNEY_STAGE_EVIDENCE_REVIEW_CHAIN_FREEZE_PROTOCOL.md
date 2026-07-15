# GUANYAO Life Journey Stage Evidence Review Chain Freeze Protocol
# 观爻生命旅程阶段证据审查链冻结协议

版本：Evolution Phase 1 / P29

状态：EVIDENCE REVIEW CHAIN FROZEN

施工编号：`RC-LIFE-JOURNEY-STAGE-EVIDENCE-REVIEW-CHAIN-FREEZE-P29`

## 00｜协议定位

P29 冻结 P24–P28 已建立的生命旅程阶段证据审查链。

本协议不增加新的业务状态，不生成阶段声明，也不把审查链接入 Foundation、Life Schema、Runtime、Persistence、Storage 或 UI。它只固定审查契约、显式决策、结果消费、组合入口与结果就绪之间的职责和调用所有权。

## 01｜冻结的语义链

正式语义顺序固定为：

```text
LifeJourneyStageEvidenceReview Contract
                ↓
Explicit Authority Decision Resolver
                ↓
Review Result Consumption
                ↓
Review Endpoint
                ↓
Review Outcome Readiness
```

其中：

- Review Contract 固定 ACCEPTED / REJECTED 两类完成结果；
- Resolver 只处理显式 Candidate、Reviewer、Decision 与 Rejection Reason；
- Result Consumption 只执行 READY → AVAILABLE、NOT_READY → UNAVAILABLE；
- Endpoint 只组合 Resolver 与 Consumption；
- Readiness 只表达审查结果是否已经形成。

## 02｜冻结的结果语义

以下结果不可被后续施工改写：

```text
ACCEPT  → READY / ACCEPTED → AVAILABLE / ACCEPTED → Readiness READY
REJECT  → READY / REJECTED → AVAILABLE / REJECTED → Readiness READY
无效输入 → NOT_READY → UNAVAILABLE → Readiness NOT_READY
```

REJECTED 是有效完成的审查结果，不是系统错误。Readiness READY 只代表 Review Outcome 已形成，不代表 `LifeJourneyStageAuthorityDeclaration` 已生成，也不代表 Life Journey Stage 已推进。

## 03｜冻结的调用所有权

正式调用方向固定为：

```text
Explicit Declaration Command
└─ Explicit Authority Declaration Readiness
   └─ Authority Evidence Input Adapter
      └─ Readiness
         └─ Endpoint
            ├─ Resolver
            └─ Result Consumption
```

调用所有权固定为：

- Resolver → 只由 Endpoint 调用；
- Result Consumption → 只由 Endpoint 调用；
- Endpoint → 只由 Readiness 调用；
- Readiness → 只由 Authority Evidence Input Adapter 调用；
- Authority Evidence Input Adapter → 只由 Explicit Authority Declaration Readiness 调用；
- Explicit Authority Declaration Readiness → 只由 Explicit Declaration Command 调用；
- Explicit Declaration Command → 当前没有 Runtime、页面或其他业务消费者。

P31 Adapter 是 P30 Authority Evidence Input Contract 建立后获准的唯一冻结链出口。任何后续消费者仍必须先通过独立协议和 gate 明确授权，不得绕过 Adapter 或 Readiness 直接调用 Endpoint、Resolver 或 Consumption。

Adapter 只把 READY / ACCEPTED 投影为 Authority Evidence Input；READY / REJECTED 固定为 NOT_APPLICABLE，NOT_READY 固定为 UNAVAILABLE。Adapter 不生成 Authority Declaration，不生成 Stage Source，也不推进 Life Journey Stage。

Readiness 只把 P31 AVAILABLE 标记为等待显式声明，把 NOT_APPLICABLE 保持为审查终止，把 UNAVAILABLE 标记为 NOT_READY。Readiness 不生成 Authority Declaration，不生成 Stage Source，也不推进 Life Journey Stage。

Command 只在 P32 READY、生命主体存在且收到显式 DECLARE 决定时形成，并保留原始 Readiness、Authority Evidence Input 与 Accepted Review 引用。Command 不生成 Authority Declaration，不生成 Stage Source，也不推进 Life Journey Stage。

## 04｜Authority 与 Stage Source 隔离

P21 `LifeJourneyStageAuthority` 仍是阶段声明的唯一正式权威边界。

证据审查链不得：

- 从 ACCEPTED Review 自动生成 `LifeJourneyStageAuthorityDeclaration`；
- 从 REJECTED Review 推断其他阶段；
- 生成或修改 `LifeJourneyStageSourceInput`；
- 直接调用 `lifeJourneyStageSource`；
- 把 Review Outcome 等同于 Stage Declaration；
- 推进或回退 Life Journey Stage。

证据被接受，只表示它可作为上位权威判断的证据，不等于权威已经声明阶段。

## 05｜系统保护边界

冻结链禁止依赖：

- Original Self Foundation Runtime；
- Original Self Life Schema Mapping；
- Star Beast、Mother Code、Hexagram、Yao 或 Crystal Engine；
- Gravity、Dynamics 或页面进度；
- Persistence、localStorage、sessionStorage；
- React、UI、路由、网络调用或 AI。

Foundation、Life Schema 与 Stage Source 也不得反向消费 Review Readiness。

## 06｜P29 施工边界

P29 只新增：

- 本冻结协议；
- `check:life-journey-stage-evidence-review-chain-freeze`；
- release gate 注册。

P29 不修改 P0–P28 的类型、Adapter、Resolver、Consumption、Endpoint、Readiness、Foundation、Life Schema、Dynamics、Persistence、Storage、UI、AI 或视觉组件。

## 07｜后续解冻条件

在建立 Review Outcome → Authority 的任何桥接前，必须先独立定义：

1. ACCEPTED Review 作为 Authority Input 的最小投影；
2. REJECTED Review 的终止语义；
3. Authority 仍需显式声明而非自动继承 Review 结论；
4. 不允许 Review 直接生成 Stage Source。

任何调用拓扑变化必须先更新本协议与冻结 gate，并独立提交。

## 08｜验收

1. P24–P28 正式文件全部存在；
2. Resolver、Consumption、Endpoint、Readiness 保持单一调用所有权；
3. ACCEPTED 与 REJECTED 都保持完整审查结果语义；
4. UNAVAILABLE 与 NOT_READY 保留原始原因；
5. Authority Declaration 与 Stage Source 保持隔离；
6. 本链路不接 Foundation、Life Schema、Runtime、Persistence、Storage、UI 或 AI；
7. P21、P24–P28 gates、release、build 与 `git diff --check` 通过。
