# GUANYAO Change Experience Unit Protocol

## 00. Document Position

This document defines:

```text
ChangeExperienceUnit
```

as the smallest product-level unit of Guanyao 1.0 self-change experience.

It is derived from:

- `GUANYAO_CHANGE_EXPERIENCE_TEMPLATE_PROTOCOL.md`
- `GUANYAO_PERSONA_BEHAVIOR_DYNAMICS_CORE_V1.md`
- `GUANYAO_PERSONA_TRANSMISSION_UNIT_PROTOCOL.md`
- `GUANYAO_HEXAGRAM_CRYSTAL_MIGRATION_CAUSAL_PROTOCOL.md`

It does not modify:

- runtime;
- `GravityPage`;
- `PersonaTransmission`;
- `PersonaMigrationImpact`;
- `CrystalState`;
- the Hexagram Engine;
- 64 hexagram-code generation;
- storage;
- routes.

It is a product protocol.

It is not a TypeScript contract yet.

## 01. Definition

`ChangeExperienceUnit` is:

> A self-change event that the user can experience in one current-round pressure situation.

It is not:

- a personality label;
- a test result;
- a score;
- an AI judgment;
- a hexagram-code object;
- a storage record;
- a reward;
- a task.

It represents:

> A user, under one real pressure, seeing one old protective response, understanding what it once protected, choosing one new response, and leaving one change imprint.

Chinese product language:

> 用户在某个现实压力下，看见一个旧保护方式，理解它的意义，选择新的回应，并留下变化印记。

## 02. Core Structure

Every `ChangeExperienceUnit` must contain the following product fields.

These fields are experience-level fields.

They must not expose raw engine language.

### 1. `dimension`

The persona space where the change experience occurs.

Allowed values:

```text
body
emotion
thought
action
memory
motivation
```

It answers:

```text
Which part of the user's operating system is changing?
```

Notes:

- `Experience` names the user experience layer.
- `Memory` names the six-dimension persona space where past experience affects current operation.
- Do not name the memory dimension `experience`.
- Do not interpret `ChangeExperience` as `Memory Experience`.

### 2. `pressureContext`

The current real pressure scenario.

It answers:

```text
What real situation is triggering this old model?
```

Rules:

- must be concrete;
- must feel current;
- must not sound like a generic case;
- must not be a psychological category.

### 3. `currentSituation`

The current-round situation orientation.

It answers:

```text
Where is the user now?
```

It may be supported by current hexagram orientation.

It must not be presented as a final result.

### 4. `oldReaction`

The old operating response.

It answers:

```text
How does the user automatically respond under this pressure?
```

Rules:

- describe a protective pattern;
- do not label the whole person;
- do not diagnose;
- do not blame.

Example:

```text
When the result is uncertain, the user first uses action to restore control.
```

### 5. `protectionMeaning`

The protective meaning of the old response.

It answers:

```text
What did this old response once protect?
```

This is the core field.

Without `protectionMeaning`, the unit becomes an analysis report.

With `protectionMeaning`, the user can understand:

```text
I was not wrong. I was using an old protection method.
```

Rules:

- must avoid blame;
- must explain protection without excusing automatic repetition;
- must help the user reclaim the old response as an ability that can be revised.

### 6. `newResponse`

The new response direction.

It answers:

```text
What different response is the user willing to try now?
```

Rules:

- small;
- current-round;
- specific;
- confirmable;
- not a task;
- not a habit plan;
- not a score.

### 7. `transformationMoment`

The moment where change becomes felt.

It answers:

```text
How did the old response move into the new response?
```

It should contain:

```text
old reaction
↓
new response
```

The user should feel:

```text
I moved a little.
```

### 8. `growthMeaning`

The user-facing growth value.

It answers:

```text
What value can the user recognize from this movement?
```

It is not:

- a score;
- a level;
- an achievement;
- a reward;
- a quantified growth metric.

It is:

> The value-language by which the user can own this small change.

Examples:

```text
Action pattern upgraded.
Emotional awareness upgraded.
Cognition upgraded.
Memory wisdom upgraded.
Inner drive awakened.
```

Chinese product shorthand:

```text
行动模式升级
情绪觉察升级
认知升级
经验智慧升级
内在驱动力觉醒
```

### 9. `crystalImprint`

The change imprint left by the current round.

It answers:

```text
What shape did this change leave behind?
```

It is not the hexagram-code object itself.

It is the meaning that can later be expressed through a current-round crystal.

## 03. Dynamics Fields

These fields describe why the change matters.

They do not replace the core structure.

### 1. `rootProtection`

The root protection behind the old response.

Examples:

```text
safety
certainty
control
avoid being hurt
dignity
belonging
value
```

Chinese examples:

```text
安全感
确定感
掌控感
避免受伤
尊严
归属感
价值感
```

### 2. `manifestBehavior`

The visible behavior or felt reaction.

Examples:

```text
push forward quickly
anticipate danger emotionally
analyze repeatedly
hold tension in the body
repeat an old experience
prove the self externally
```

Chinese examples:

```text
快速推进
提前焦虑
反复分析
身体紧绷
旧经验覆盖现在
通过外部结果证明自己
```

### 3. `changeType`

The type of change.

Allowed initial values:

```text
body_shift
emotion_shift
cognition_shift
behavior_shift
memory_shift
motivation_shift
```

It should describe the movement type.

It must not become a score or category shown to users.

## 04. Three Golden Sample Mapping

### A. Action Sample

```text
dimension:
action

pressureContext:
The user faces a situation that must move forward while the outcome remains uncertain.

currentSituation:
The user is pushed into a position where direction must be chosen again.

oldReaction:
The user restores control through immediate action.

protectionMeaning:
Action once helped the user break through difficulty and restore agency.

newResponse:
Judge first, then act.

transformationMoment:
The old response moves from rushing forward to stabilizing direction first.

growthMeaning:
Action pattern upgraded.

crystalImprint:
This round leaves the shape of moving from automatic action to conscious action.

rootProtection:
control

manifestBehavior:
push forward quickly

changeType:
behavior_shift
```

Chinese shorthand:

```text
从：通过行动恢复掌控
到：先判断，再行动
成长价值：行动模式升级
```

### B. Emotion Sample

```text
dimension:
emotion

pressureContext:
Relationship uncertainty activates emotional defense before facts are clear.

currentSituation:
The user is in a relationship situation whose result is not yet clear.

oldReaction:
Emotion makes the factual conclusion too early.

protectionMeaning:
Emotion once helped the user notice relationship risk early and prepare for hurt.

newResponse:
See the emotion first, then confirm the fact.

transformationMoment:
The user does not suppress emotion; the user begins to see what it is signaling.

growthMeaning:
Emotional awareness upgraded.

crystalImprint:
This round leaves a new way of relating to emotion.

rootProtection:
avoid being hurt

manifestBehavior:
emotion anticipates relationship risk

changeType:
emotion_shift
```

Chinese shorthand:

```text
从：情绪替事实下结论
到：先看见情绪，再确认事实
成长价值：情绪觉察升级
```

### C. Thought Sample

```text
dimension:
thought

pressureContext:
Uncertainty activates explanation before the situation is fully known.

currentSituation:
The user is inside a current round where interpretation begins to cover facts.

oldReaction:
Interpretation becomes equal to reality.

protectionMeaning:
Explanation once helped the user create certainty and reduce chaos.

newResponse:
See the fact first, then see the interpretation.

transformationMoment:
The user moves from being inside the explanation to observing the explanation.

growthMeaning:
Cognition upgraded.

crystalImprint:
This round leaves the shape of separating fact from interpretation.

rootProtection:
certainty

manifestBehavior:
repeated analysis

changeType:
cognition_shift
```

Chinese shorthand:

```text
从：解释等同现实
到：先看事实，再看解释
成长价值：认知升级
```

## 05. Relationship With Existing System

`ChangeExperienceUnit` belongs to the user experience layer.

It does not replace existing causal structures.

The relationship is:

```text
ChangeExperienceUnit
↓
PersonaTransmission
↓
CrystalState
↓
Hexagram Crystal
```

### 1. `ChangeExperienceUnit`

Layer:

```text
User experience layer
```

Responsibility:

```text
How the user experiences the change.
```

It organizes:

- pressure context;
- old response;
- protection meaning;
- new response;
- growth meaning;
- crystal imprint.

### 2. `PersonaTransmission`

Layer:

```text
Persona dynamics calculation layer
```

Responsibility:

```text
Which old model is running, and what revision direction is available.
```

It should provide the dynamics behind the experience.

It should not be shown raw to users.

### 3. `CrystalState`

Layer:

```text
Change deposition layer
```

Responsibility:

```text
How the completed movement becomes a crystallizable state.
```

It is not the user-facing experience unit.

### 4. `Hexagram Crystal`

Layer:

```text
Change expression layer
```

Responsibility:

```text
How the crystallized change is expressed as a current-round hexagram-code asset.
```

It must not be generated before the user has completed the change experience.

## 06. ChangeExperienceUnit Boundary Guard

Core principle:

```text
ChangeExperienceUnit may mirror migration meaning for user experience,
but it must not become the causal impact object.
```

Chinese:

```text
ChangeExperienceUnit 可以表达迁移意义，
但不能替代 PersonaMigrationImpact 成为人格动力因果对象。
```

### A. `ChangeExperienceUnit`

`ChangeExperienceUnit` is a user experience expression object.

It is responsible for:

- what the user sees;
- how the user understands the change;
- how the user recognizes the old protection;
- how the user owns the new response;
- how the user claims the growth value.

It is not responsible for:

- judging whether migration truly happened;
- calculating persona-dynamics deflection;
- generating causal impact;
- deciding crystal eligibility;
- producing `currentCrystalEndState`;
- generating a 64 hexagram-code crystal.

### B. `PersonaMigrationImpact`

`PersonaMigrationImpact` is a persona-dynamics causal object.

It is responsible for:

- `fromModel`;
- `toResponse`;
- `deflectionVector`;
- `impactSource`;
- causal movement;
- readiness for crystal mapping.

It is not responsible for:

- directly showing frontend copy;
- carrying the full user experience flow;
- expressing growth value language;
- replacing `ChangeExperienceUnit`;
- becoming a user-facing report.

### C. Field Boundary

#### `oldReaction`

`ChangeExperienceUnit`:

```text
User-recognizable old response description.
```

`PersonaMigrationImpact`:

```text
Causal source of the old model.
```

#### `newResponse`

`ChangeExperienceUnit`:

```text
The new response the user confirms.
```

`PersonaMigrationImpact`:

```text
The persona-dynamics deflection direction.
```

#### `growthMeaning`

`ChangeExperienceUnit`:

```text
User-facing value expression.
```

`PersonaMigrationImpact`:

```text
Forbidden. It must not carry growth value language.
```

Reason:

```text
Growth Meaning belongs to user value expression, not causal impact calculation.
```

#### `crystalImprint`

`ChangeExperienceUnit`:

```text
The change imprint the user can recognize and own.
```

`PersonaMigrationImpact`:

```text
A migration impact summary only.
```

It may inform crystal mapping, but it must not become the visible crystal card copy by itself.

## 07. Future Expansion Rules

Future `ChangeExperienceUnit` candidates must follow these rules:

1. The unit must have a concrete pressure context.
2. The unit must describe an old protective response, not a personality label.
3. The unit must include `protectionMeaning`.
4. The unit must include a small, confirmable `newResponse`.
5. The unit must include a felt `transformationMoment`.
6. The unit must include a non-gamified `growthMeaning`.
7. The unit must include a `crystalImprint`.
8. The unit must not expose raw engine fields.
9. The unit must not create a new storage requirement.
10. The unit must not directly generate a 64 hexagram-code crystal.

## 08. Boundary

This protocol does not authorize:

- expanding the 36 model;
- adding a pressure library;
- changing runtime state;
- changing `GravityPage`;
- changing `PersonaTransmissionUnit`;
- changing `PersonaMigrationImpact`;
- changing `CrystalState`;
- changing the Hexagram Engine;
- changing 64 hexagram-code generation;
- writing storage;
- adding routes.

Any future implementation must first prove that the `ChangeExperienceUnit` can be mapped from existing persona dynamics without breaking the causal chain.
