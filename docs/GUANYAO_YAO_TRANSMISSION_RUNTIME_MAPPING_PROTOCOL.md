# GUANYAO Yao Transmission Runtime Mapping Protocol

## 00. Document Position

This document defines the mapping protocol from:

```text
YaoTransmissionProfile
↓
PersonaTransmissionRuntimeUnit
```

It answers:

> How does a persona-dynamics calculation result become a user-perceivable persona-dynamics experience object?

This protocol does not modify:

- `src`;
- runtime;
- services;
- storage;
- routes;
- `GravityPage`;
- AI hit logic;
- database fields.

It is not:

- a production mapping implementation;
- a prompt template;
- a storage schema;
- a frontend copy sheet;
- a 36-unit production database.

## 01. Core Principle

`YaoTransmissionProfile` is not user-facing content.

It belongs to:

```text
Engine Language
```

Examples:

- `pressureReading`
- `motherCodeInfluence`
- `transmissionReading`
- `inertiaSignal`
- `antiInstinctHint`
- `cutPotential`
- `interventionPotential`
- `userAgency`

These fields can help the system understand the current persona movement.

They must not be displayed directly in the frontend.

`PersonaTransmissionRuntimeUnit` belongs to:

```text
Experience Language
```

It helps the user understand:

```text
Why am I operating this way?
What old model is running?
What can I recognize?
What small response can change this round?
What trace will this change leave?
```

Relationship:

```text
YaoTransmissionProfile
↓
semantic translation
↓
PersonaTransmissionRuntimeUnit
↓
GravityPage experience
```

## 02. Three-Layer Translation

Every mapping must pass through three layers.

### Layer 1: Engine Language

Machine-readable or model-readable signal.

Example:

```text
inertiaSignal:
  action acceleration under uncertainty
```

This layer is allowed inside engine/service/mapping logic.

It is not allowed as frontend copy.

### Layer 2: Persona Model Language

Product-understandable model explanation.

Example:

```text
The old model uses fast action to reduce uncertainty before the situation is fully seen.
```

This layer explains the persona mechanism.

It is useful for mapping and QA, but should still be compressed before the user sees it.

### Layer 3: User Language

User-facing, recognizable language.

Example:

```text
You have learned to use action to feel that things are still within reach.
```

Chinese direction:

```text
你已经习惯用行动，让自己感觉事情仍在掌控之中。
```

This is the language that can enter `insight`.

## 03. Field Mapping Overview

| YaoTransmissionProfile field | Runtime Unit field | Mapping purpose |
| --- | --- | --- |
| `pressureReading` | `triggerContext.pressureSeed` | Describe the reality pressure as a human situation. |
| `motherCodeInfluence` | `triggerContext.motherCodeInfluence` | Carry the original persona base influence without labeling the user. |
| `transmissionReading` | `triggerContext.pressureField` | Identify the pressure field and persona space. |
| `transmissionReading` | `dimension` | Infer which persona space is active. |
| `transmissionReading` / stage hit | `yaoStage` | Infer the current change stage. |
| `inertiaSignal` | `oldModel` | Translate inertia into the old protection model. |
| `inertiaSignal` | `inertiaPattern` | Translate inertia into observable automatic behavior. |
| `antiInstinctHint` | `revisionDirection` | Translate the anti-instinct hint into a new response direction. |
| `mainCut` | `revisionDirection` | Identify the main current-round correction entry. |
| `cutPotential` | `revisionDirection` | Identify where the old model can be interrupted. |
| `interventionPotential` | `microAction` | Convert intervention potential into one confirmable action. |
| `userAgency` | `microAction` | Ensure the action belongs to the user and is currently possible. |
| `userAgency` | `crystalTrace` | Confirm that the change can leave a current-round trace. |

No runtime unit field should be copied from engine language without translation.

## 04. Runtime Identity Mapping

### `identity.unitId`

Constructed from:

```text
dimension + yaoStage
```

Example:

```text
action-five-awareness
```

Rules:

- stable enough for runtime reference;
- not shown directly to user;
- not a storage id in 1.0;
- not a long-term profile id.

### `dimension`

Allowed values:

- `body`
- `emotion`
- `thought`
- `action`
- `memory`
- `motivation`

Mapping rule:

```text
Which persona operating space does the pressure primarily enter?
```

Examples:

- body: pressure first enters sensation or somatic reaction;
- emotion: pressure first enters feeling judgment;
- thought: pressure first enters explanation;
- action: pressure becomes behavior;
- memory: pressure activates old traces;
- motivation: pressure exposes what the user wants to protect.

### `yaoStage`

Allowed values:

- `trigger`
- `takeover`
- `explain`
- `solidify`
- `awareness`
- `revision`

Mapping rule:

```text
Which stage of model change is currently active?
```

Stage meanings:

| Runtime value | Protocol meaning | Model question |
| --- | --- | --- |
| `trigger` | 初爻 · 触发 | How did pressure enter? |
| `takeover` | 二爻 · 接管 | How did the old response take control? |
| `explain` | 三爻 · 解释 | How did the mind make meaning? |
| `solidify` | 四爻 · 固化 | How did the response become a pattern? |
| `awareness` | 五爻 · 觉察 | What does the user begin to see? |
| `revision` | 上爻 · 修正 | What new response becomes possible? |

## 05. Trigger Context Mapping

`triggerContext` answers:

```text
Why did this round hit this unit?
```

It may include:

- `pressureSeed`;
- `pressureField`;
- `motherCodeInfluence`;
- `motherCodeName`;
- `currentHexagramProfile`;
- `currentHexagramName`;
- `source`.

Rules:

- use real-life language;
- do not expose algorithmic scoring;
- do not say the final 64 hexagram-code asset is already generated;
- do not turn the mother code into a personality label;
- do not expose old R8, archive, or 384 yao direction.

Example:

```text
pressureSeed:
  A real problem needs to move forward, but the result is uncertain.

pressureField:
  movement_under_uncertainty

motherCodeInfluence:
  The user tends to use action to recover a sense of control and value.
```

## 06. Old Model Mapping

`oldModel` answers:

```text
What protection model starts under pressure?
```

Do not map to personality labels.

Bad:

```text
action personality
control type
avoidant type
execution bias
```

Good:

```text
The user creates temporary safety by moving quickly before uncertainty becomes visible.
```

Chinese direction:

```text
在压力靠近时，用户会通过快速行动，先把不确定感压下去。
```

`oldModel` should be:

- behavioral;
- situational;
- recognizable;
- non-diagnostic;
- not a fixed identity.

## 07. Inertia Pattern Mapping

`inertiaPattern` answers:

```text
What does the user automatically do once the old model starts?
```

Source:

- primarily `inertiaSignal`;
- supported by `transmissionReading`;
- checked against `pressureReading`.

Example:

Engine:

```text
inertiaSignal:
  action acceleration under uncertainty
```

Runtime:

```text
The user accelerates, takes over, tries to solve immediately, and skips a fresh judgment.
```

The runtime field should describe observable movement, not internal model jargon.

## 08. Insight Mapping

`insight` answers:

```text
What can the user recognize about themselves?
```

It must pass through the Persona Semantic Mapping protocol.

Forbidden:

```text
inertia increased
behavior model shifted
system detected action bias
decision pattern exposed
```

Allowed:

```text
You have learned to use action to feel that things are still within reach.
```

Chinese direction:

```text
你已经习惯用行动，让自己感觉事情仍在掌控之中。
```

`insight` must feel like recognition, not diagnosis.

## 09. Revision Direction Mapping

`revisionDirection` answers:

```text
If the user does not repeat the old model, what direction becomes possible?
```

Sources:

- `antiInstinctHint`;
- `mainCut`;
- `cutPotential`;
- `interventionPotential`.

Rules:

- do not demand a personality change;
- do not create a task;
- do not create an A/B test;
- do not create a habit program;
- preserve the original force when possible.

Example:

```text
From immediate action to conscious action.
```

Chinese direction:

```text
从立刻行动，转向有意识地行动。
```

## 10. Micro Action Mapping

`microAction` answers:

```text
What is the smallest current-round response the user can confirm?
```

Sources:

- `antiInstinctHint`;
- `interventionPotential`;
- `userAgency`.

Rules:

- small;
- specific;
- current-life executable;
- non-task;
- non-check-in;
- non-score;
- not a long-term behavior program.

Example:

```text
Before acting next time, first name the real problem you are trying to solve.
```

Chinese direction:

```text
下一次准备行动前，先确认一次真正要解决的问题。
```

The action confirms a new response direction.

It does not create a task system.

## 11. Beast Cue Mapping

`beastCue` answers:

```text
How does the persona movement become visible through the starbeast?
```

It is not:

- animation parameters;
- `scale`;
- `opacity`;
- `particle`;
- a pet state;
- a reward state.

It is semantic visual direction.

Fields:

```text
before
after
cue
```

Example:

```text
before:
  Direction light rushes outward, and the front claws keep reaching forward.

after:
  The direction settles, and the light path gathers before moving.

cue:
  The starbeast shifts from rushing ahead to holding direction.
```

This gives future visual design a model basis without forcing implementation details.

## 12. Crystal Trace Mapping

`crystalTrace` answers:

```text
What movement does this round leave behind?
```

It must connect to:

- current-round crystal;
- 64 hexagram-code crystal;
- Personality Ring Lite.

It must not create:

- archive;
- collectible asset system;
- old R8 asset;
- 384 yao direction;
- long-term behavior tracking.

Example:

```text
traceLine:
  This round records a movement from using action to reduce uncertainty toward judging before acting.
```

Chinese direction:

```text
这一局留下的变化，是你从“用行动压下不确定”，移动到“先判断，再行动”。
```

## 13. Guardrail Mapping

Every runtime unit must include 1.0 guardrails:

```text
noStorageWrite: true
noLongTermProfile: true
noRawEngineLanguage: true
no384Yao: true
noArchive: true
```

Meaning:

- `noStorageWrite`: this object is current-session experience shape, not persistence;
- `noLongTermProfile`: it must not become a user profile;
- `noRawEngineLanguage`: frontend must not show raw engine fields;
- `no384Yao`: 384 yao direction is not in 1.0 production;
- `noArchive`: archive and collectible asset systems remain isolated.

These guardrails should stay in the Type Contract.

## 14. Mapping Quality Gate

A mapped runtime unit is valid only if all questions can be answered:

1. What pressure entered?
2. Which persona space did it hit?
3. Which yao stage is active?
4. What old model is running?
5. What automatic behavior appears?
6. What can the user recognize?
7. What new response direction is possible?
8. What small action can be confirmed?
9. What starbeast cue expresses the movement?
10. What crystal trace will remain?

If any answer is missing, the mapping is not ready for `GravityPage`.

## 15. Fallback Rule

If engine inputs are incomplete:

Do not:

- fabricate a runtime unit;
- generate fake insight;
- generate fake micro action;
- generate fake crystal trace;
- pretend 64 hexagram-code crystal is complete.

Allowed fallback:

```text
The current round has not yet formed a complete persona transmission unit.
```

Chinese direction:

```text
这一局还没有形成完整的人格动力单元。
```

Fallback must remain explicit and non-alarming.

## 16. 1.0 Boundary

1.0 may use this protocol for:

- one current-round runtime unit;
- one current-round revision action;
- one current-round crystal trace;
- light starbeast feedback;
- GravityPage experience preparation.

1.0 must not use this protocol for:

- full 36-unit production database;
- long-term behavior tracking;
- 384 yao direction;
- yao-device;
- archive;
- social system;
- chat;
- pet growth;
- score or streak.

## 17. Implementation Order

Recommended order:

```text
docs protocol
↓
static fixture
↓
mapping validator
↓
service mapping
↓
GravityPage consumption
↓
starbeast visual refinement
```

Do not connect `GravityPage` directly to raw `YaoTransmissionProfile` fields.

Do not write storage before the runtime mapping is stable.

## 18. Engineering Boundary

This protocol does not:

- modify code;
- define new TypeScript types;
- modify runtime;
- modify services;
- modify storage;
- modify routes;
- modify `GravityPage`;
- connect AI;
- connect database;
- connect archive;
- connect yao-device;
- connect old R8;
- connect 384 yao direction.

