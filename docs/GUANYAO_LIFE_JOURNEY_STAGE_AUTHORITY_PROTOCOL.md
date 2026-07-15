# GUANYAO Life Journey Stage Authority Protocol
# 观爻生命旅程阶段声明权协议

版本：Evolution Phase 1 / P21

状态：EXPLICIT STAGE AUTHORITY

施工编号：`RC-LIFE-JOURNEY-STAGE-AUTHORITY-P21`

## 00｜协议定位

P21 回答一个且仅一个问题：谁有权显式声明 `LifeJourneyStage`。

唯一正式声明权属于：

```text
original_self_life_journey_orchestrator
```

它位于 Original Self Life Schema 的上位编排层。P21 只建立 Authority 类型边界，不实现 Orchestrator，不接 P15 Source，也不定义生命事件如何触发阶段变化。

## 01｜正式声明

`LifeJourneyStageAuthorityDeclaration` 必须包含：

- `authority: original_self_life_journey_orchestrator`；
- `sourceBoundary: upper_schema`；
- 一个显式 `lifeJourneyStage`；
- `semanticRole: EXPLICIT_LIFE_JOURNEY_STAGE_DECLARATION`；
- 禁止自动推进、Runtime 推断和 Foundation phase 推断的边界声明。

声明表达的是上位编排层已经明确给出当前阶段，不表达阶段已经由某个 Runtime 状态自动证明。

## 02｜唯一声明权

以下对象没有 `LifeJourneyStage` 声明权：

- 页面、路由或视觉组件；
- Gravity、Dynamics 或六维体验状态；
- `OriginalSelfJourneyPhase`；
- Mother Code、Star Beast、fourSymbol；
- Hexagram、Yao、Crystal 或 Archive readiness；
- localStorage、sessionStorage 或其他持久化快照；
- AI 输出。

这些对象未来可以成为独立触发协议审查的证据来源，但不能直接写入、推断或推进 Life Journey Stage。

## 03｜与 P15 Source 的边界

P15 继续接收：

```text
LifeJourneyStageSourceInput {
  source: upper_schema_caller
  lifeJourneyStage
}
```

P21 将 `upper_schema_caller` 的正式权威身份限定为 `original_self_life_journey_orchestrator`，但本刀不新增 Authority → Source Adapter，也不修改 P15 的输入、Resolver 或结果。

后续若接入，固定方向只能是：

```text
LifeJourneyStageAuthorityDeclaration
↓ 独立 Adapter
LifeJourneyStageSourceInput
```

不得由 Source、Foundation 或 Runtime 反向生成 Authority Declaration。

## 04｜暂不定义阶段触发

P21 不回答以下问题：

- 什么生命事件触发 ORIGIN → AWAKENING；
- 是否允许跳过阶段；
- 是否允许回退或循环；
- 一个阶段何时完成；
- 阶段切换需要哪些证据。

这些属于后续独立的 Stage Trigger / Transition Protocol。P21 通过 `triggerRulesDeferred: true` 与 `noStageTransition: true` 明确保持该问题未决，禁止先写临时映射。

## 05｜工程边界

P21 只新增：

- `LifeJourneyStageAuthority`；
- `LifeJourneyStageAuthorityDeclaration`；
- `LifeJourneyStageAuthorityBoundary`；
- 本协议与独立 authority gate；
- 类型出口与 release gate 注册。

P21 不修改：

- P0–P20 Foundation 与 Life Schema 链路；
- P15 `LifeJourneyStageSourceInput`；
- Adapter、Resolver、Endpoint；
- Mother Code、Star Beast、Hexagram、Gravity、Yao、Crystal；
- Dynamics、Persistence、Storage、UI、视觉或 AI。

## 06｜验收

1. Authority 身份唯一且属于上位 Life Journey Orchestrator；
2. Declaration 必须显式携带七阶段之一；
3. Declaration 明确禁止自动推进、Runtime 推断和 Foundation phase 推断；
4. P21 Declaration 只允许由显式 Authority Declaration Resolver 构造；
5. P15 Source 与 P12–P20 调用拓扑保持不变；
6. authority gate、P12–P20 gates、release、build 与 `git diff --check` 通过。

## 07｜P34 授权扩展

P34 在不修改 P21 类型的前提下，建立 `LifeJourneyStageAuthorityDeclaration` 的唯一正式构造边界。

固定前提为：

```text
life_subject 显式 DECLARE Command
+ original_self_life_journey_orchestrator
→ LifeJourneyStageAuthorityDeclaration
```

Resolver 不得绕过主体 Command，也不得仅凭 Review、Readiness、Runtime 或页面状态生成 Declaration。P34 Declaration 仍不是 `LifeJourneyStageSourceInput`，不表示 Journey Stage 已推进。
