# GUANYAO Choice Life Direction Protocol

## Status

This is the active GUANYAO Choice semantic protocol under the V2 worldview constitution.

It defines Choice as user-owned life direction and distinguishes that meaning from existing breach selection, sixth-yao encoding, revision-action generation, confirmation state, route navigation, and asset status.

This is a semantic registration, not a new candidate layer. It does not create a Choice Domain Runtime or change the current causal chain, UI state, persistence, route, or result.

Its upstream semantic sources are:

- [GUANYAO_WORLDVIEW_CONSTITUTION_V2.md](./GUANYAO_WORLDVIEW_CONSTITUTION_V2.md)
- [GUANYAO_FOUR_BEAST_LIFEFORM_PROTOCOL.md](./GUANYAO_FOUR_BEAST_LIFEFORM_PROTOCOL.md)
- [GUANYAO_GRAVITY_REALITY_PULL_PROTOCOL.md](./GUANYAO_GRAVITY_REALITY_PULL_PROTOCOL.md)
- [GUANYAO_SIX_SPACE_LIFE_EXPERIENCE_PROTOCOL.md](./GUANYAO_SIX_SPACE_LIFE_EXPERIENCE_PROTOCOL.md)
- [GUANYAO_PRESSURE_SEED_ENVIRONMENT_FORCE_PROTOCOL.md](./GUANYAO_PRESSURE_SEED_ENVIRONMENT_FORCE_PROTOCOL.md)

## 1. Locked Definition

> Choice = 星兽在看见现实引力之后，重新选择自己的生命方向。

Choice is the moment in which a person is no longer required to treat an external pull, familiar response, or system suggestion as the only possible direction.

It does not require a dramatic life decision. A small pause, a refusal, a different sentence, an act of staying, or the decision to return later can all restore direction.

Choice is not:

- a correct answer selected by the system;
- a binary measure of obedience or resistance;
- a personality test result;
- a forced anti-instinct action;
- a requirement to oppose every familiar response;
- proof that pressure has disappeared;
- a button click, route transition, or completion animation by itself;
- a new source of starbeast, Mother Code, trigram, current hexagram, or Crystal.

Choice belongs to the user. GUANYAO may reveal possibilities, but it cannot own the decision.

## 2. Life Direction, Not A Standard Answer

“Life direction” does not mean that the product knows the user's destiny or should tell the user what their life plan must be.

It means that, within one real situation, the user can feel:

- what is happening now;
- what is pulling them toward a familiar response;
- what that response may once have protected;
- whether it still fits the present;
- what they want to protect, seek, create, or stop;
- which next response they are willing to recognize as their own.

The product must preserve the difference between:

```text
系统呈现一个可能方向
≠ 用户已经选择

用户点击一个控件
≠ 用户已经完成变化

用户没有继续
≠ 用户失去选择能力
```

## 3. User Sovereignty

The user's Choice rights include the right to:

- recognize a proposed response;
- revise it in their own language;
- choose a smaller response;
- pause without deciding;
- decide not to act yet;
- decline the proposed direction;
- leave the current experience;
- return later;
- say that the system's interpretation does not fit.

Pause, refusal, and non-action can be meaningful Choice when they are owned by the user. They must not automatically be interpreted as avoidance, weakness, or failure.

Silence, timeout, inactivity, page exit, or animation completion must not be treated as consent.

## 4. What The System May And May Not Do

GUANYAO may:

- reflect a pattern that may be occurring;
- explain how an old response may once have protected life;
- present one or more possible response directions;
- help the user make a response smaller and more concrete;
- preserve uncertainty and invite recognition;
- record an explicitly confirmed response through existing runtime boundaries.

GUANYAO must not:

- claim to know the user's only correct choice;
- turn intervention potential or user agency scores into commands;
- select a direction because it is easier for the engine to calculate;
- intensify fear, urgency, or shame to obtain confirmation;
- punish pause, refusal, or exit;
- describe system-generated language as the user's own voice before recognition;
- infer a life decision from navigation or persistence state alone.

AI can serve as a mirror and possibility generator. It does not receive final authority over the user's interpretation or action.

## 5. Existing Engineering Concepts Are Not Choice Itself

Several existing fields and interactions contain the word “choice” or appear near the Choice route. They must remain semantically distinct.

| Existing Concept | Current Engineering Role | Choice Boundary |
| --- | --- | --- |
| `selectedBreachId` | Persists the selected action or observation point | Identifies where to look, not what life direction the user owns |
| `assetStatus` | Persists legacy `activated / sealed` state | Not success, failure, courage, or proof of Choice |
| `ChoicePage` | Current route for selecting a breach/action point | Route name does not make every interaction a complete product-level Choice |
| `sixthYaoChoice` | Stores the legacy sixth-yao bit | A trajectory encoding, not a moral or psychological decision |
| `finalChoiceCode` | Combines the existing yao path into a legacy code | A representation used by downstream compatibility, not Choice's essence |
| `choiceHistory` | Records legacy path values | Not a complete history of the user's lived choices |
| `SingleModelRevisionAction` | Engine-prepared candidate response | A suggestion until the user recognizes or confirms it |
| `revisionActionConfirmed` | Current-session confirmation gate when a revision action exists | Evidence of confirmation in this flow, not a universal Choice object |
| route navigation | Advances the current UI | Does not prove recognition, consent, or change |

These contracts may remain unchanged. Future code must not collapse them into one field called “Choice” without a separately approved domain design.

## 6. Breach Selection Boundary

A breach or action point answers:

> 从哪里开始，最容易看见当前反应？

It does not answer:

> 你的人生应该走向哪里？

Selecting a breach can prepare a Choice experience by focusing attention. It cannot determine the response on the user's behalf.

The engine may rank or recommend an observation point using existing causal logic. Recommendation must remain distinguishable from user recognition.

An `activated` breach is an engineering state. It does not mean that the user has agreed with the system, completed a life change, or become more valuable.

## 7. Sixth-Yao And Trajectory Encoding Boundary

The existing `sixthYaoChoice`, `finalChoiceCode`, and `choiceHistory` fields belong to the legacy trajectory and code system.

Their values must not be interpreted as:

- positive versus negative Choice;
- courageous versus avoidant behavior;
- correct versus incorrect life direction;
- permission to infer the user's inner motive;
- proof that a ChangeExperience occurred.

The default or fallback bit used by the current trajectory service is a compatibility behavior. A fallback generated by code is not a user-owned Choice.

Choice does not retroactively change the Mother Code lower trigram, Pressure Seed upper trigram, or `currentHexagramProfile`.

## 8. Revision Action And Confirmation Boundary

`SingleModelRevisionAction` is a candidate response prepared from the existing formation and transmission chain.

Its `actionLine`, `sourceReason`, `interventionPotential`, and `userAgency` may help present a possible direction. They do not prove that the direction fits the user.

The current Gravity flow allows a user to confirm a new response. When a revision action exists, `revisionActionConfirmed` is part of the established Crystal readiness gate.

This means:

- the proposed action exists before user confirmation;
- confirmation allows the current flow to treat that response as recognized;
- an unconfirmed action must not be presented as the user's completed change;
- confirmation is scoped to the current experience;
- confirmation does not mean that all future behavior has changed;
- the absence of a revision action preserves the existing compatibility path.

The current button label and presentation can be calibrated in a future, separate front-stage knife. This protocol does not modify it.

## 9. Relationship To Gravity And The Six Spaces

Gravity makes the pull visible. The six spaces show how that pull is being experienced. Choice restores the possibility of direction.

```text
现实引力正在牵引生命
→ 六维让牵引变得可感知
→ 用户看见熟悉反应与保护意义
→ 系统呈现可能的新回应
→ 用户决定是否认领、修改、暂停或拒绝
→ Choice 重新取得方向
```

The system must not require the user to finish every interpretation before Choice becomes valid. Nor should it promise that one Choice will remove all future Gravity.

## 10. Relationship To ChangeExperience

Choice creates the possibility of change, but a system suggestion alone is not a ChangeExperience.

The semantic boundary is:

```text
候选回应被呈现
→ 用户认领或明确确认新的回应
→ 新回应可以进入 ChangeExperience
→ PersonaMigrationImpact 表达本局动力偏转
```

Existing adapters may prepare revision and migration material before presentation. That preparation remains an engineering fact; it must not be narrated as completed user change before the established confirmation boundary is satisfied.

Choice may also be pause or refusal. Such a Choice does not have to fabricate a ChangeExperience or Crystal merely to prove that the interaction was valuable.

## 11. Relationship To Crystal

Crystal is not awarded for choosing the answer preferred by GUANYAO.

When the established runtime gates are satisfied, Crystal may express the life imprint left by a recognized new response. It must not express:

- system compliance;
- completion speed;
- how bravely the user defeated pressure;
- whether the user selected the recommended breach;
- whether the user followed an anti-instinct instruction perfectly.

Choice does not directly choose the final hexagram name or Crystal text. It enters the existing ChangeExperience and PersonaMigrationImpact path through established adapters.

## 12. Front-Stage Language Boundary

Preferred direction:

- “这是一种可能的回应，你可以感受它是否接近自己。”
- “不用马上决定，你可以先停在这里。”
- “如果这句话不属于你，可以换成你自己的说法。”
- “压力还在，但你可以决定怎样继续靠近它。”
- “你也可以暂时不行动，等方向更清楚一点。”
- “这一刻，你愿意认领哪一种回应？”

Avoid:

- “系统已经替你找到正确选择。”
- “请选择推荐答案以完成变化。”
- “拒绝行动说明你仍被旧模式控制。”
- “只有反本能才是成长。”
- “确认后你就完成了人格修复。”
- “不继续将失去本局能量。”
- “算法比你更清楚你真正想要什么。”

## 13. Interaction And Visual Boundary

Choice should feel like direction returning to the user, not a test being graded.

Suitable interaction qualities include:

- visible room to pause;
- no forced countdown;
- clear distinction between suggestion and confirmation;
- the ability to leave or return without punishment;
- gentle branching, widening, reorientation, or regained orbit;
- starbeast posture responding after user recognition, not before it.

Avoid “correct answer” glow, error-red rejection, coercive urgency, irreversible warnings, punishment animation, or celebratory effects that imply the user defeated themselves.

## 14. Engineering Compatibility Boundary

This protocol does not change:

- `ChoicePage.tsx`, its current breach-selection role, or its route;
- `selectedBreachId`, `assetStatus`, or breach-selection persistence;
- legacy localStorage fallback reading;
- `sixthYaoChoice`, `finalChoiceCode`, `choiceHistory`, or trajectory behavior;
- `SingleModelRevisionAction` or its adapter;
- `revisionActionConfirmed` state or the existing Crystal readiness rule;
- GravityPage presentation and interaction;
- ChangeExperience, PersonaMigrationImpact, or Crystal calculations;
- Mother Code, starbeast, trigram, or current-hexagram formation;
- existing cards, archives, user results, or release routes.

Any implementation of explicit pause, decline, rewrite, or return-later interactions must be executed as a separate knife with its own state, accessibility, persistence, and Crystal-boundary review.

## 15. Protocol Priority

For Choice product meaning, this document takes precedence over legacy “sixth-yao bit”, “anti-instinct correction”, “breach activation”, “correct cut”, “task completion”, and system-selected answer wording.

Legacy fields and pages remain valid engineering references where they do not conflict with the V2 worldview constitution or this protocol.
