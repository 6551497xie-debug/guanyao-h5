# GUANYAO Persona Migration Impact Protocol

## 00. Document Position

This document defines:

```text
PersonaMigrationImpact
```

as the impact layer between:

```text
PersonaTransmissionUnit
↓
Crystal Engine
↓
64 hexagram-code crystal
```

It is a product and architecture protocol.

It does not modify:

- `src`;
- runtime;
- services;
- storage;
- routes;
- `GravityPage`;
- hexagram-code generation;
- 384 yao;
- old R8.

This document extends:

- `GUANYAO_HEXAGRAM_CRYSTAL_MIGRATION_CAUSAL_PROTOCOL.md`
- `GUANYAO_PERSONA_TRANSMISSION_UNIT_PROTOCOL.md`
- `GUANYAO_PERSONA_TRANSMISSION_RUNTIME_SHAPE_PROTOCOL.md`
- `GUANYAO_PERSONA_BEHAVIOR_DYNAMICS_CORE_V1.md`

## 01. Definition

`PersonaMigrationImpact` is not:

- a result;
- a score;
- an evaluation;
- a growth value;
- a level;
- a reward;
- a long-term user profile field.

It is:

> the deflection impact produced by one persona migration event on the user's current-round persona dynamics structure.

In Chinese product language:

> PersonaMigrationImpact 是一次人格迁移事件对本局人格动力结构造成的偏转影响。

It answers:

```text
What changed in the user's running persona dynamics after this migration event?
```

It sits between:

```text
The user confirmed one micro revision.
```

and:

```text
The current round crystallizes as a 64 hexagram-code asset.
```

## 02. Why This Layer Is Needed

Without `PersonaMigrationImpact`, the chain risks becoming:

```text
PersonaTransmissionUnit
↓
Crystal
```

This is too abrupt.

It can make the 64 hexagram-code crystal feel like a card issued after an action, rather than a crystal formed from an actual persona movement.

`PersonaMigrationImpact` clarifies the missing causal middle:

```text
Old model was seen.
↓
Micro action was confirmed.
↓
Persona dynamics deflected.
↓
Crystal engine can crystallize that movement.
```

The crystal should not encode only the event.

It should encode the event's impact.

## 03. Relationship To PersonaTransmissionUnit

`PersonaTransmissionUnit` describes:

```text
Which persona migration event is active?
```

It contains:

- dimension;
- yao stage;
- old model;
- inertia pattern;
- insight;
- revision direction;
- micro action;
- beast cue;
- crystal trace.

`PersonaMigrationImpact` describes:

```text
What did that event change in this round?
```

It is derived from:

- `revisionDirection`;
- `microAction`;
- `beastCue`;
- `crystalTrace`;
- user confirmation;
- current hexagram orientation.

The transmission unit identifies the movement.

The migration impact summarizes the movement's effect.

## 04. Relationship To Crystal Engine

The Crystal Engine should not consume raw engine language as user meaning.

It should also not consume only a raw `PersonaTransmissionUnit`.

The ideal causal relationship is:

```text
PersonaTransmissionUnit
↓
PersonaMigrationImpact
↓
Crystal Engine
↓
currentCrystalEndState
↓
64 hexagram-code crystal
```

In 1.0, this can remain a product protocol boundary.

Future engineering may map:

```text
crystalTrace
```

into:

```text
PersonaMigrationImpact
```

without changing storage.

## 05. Minimum Impact Shape

A `PersonaMigrationImpact` should contain the following semantic parts.

This is not a TypeScript contract yet.

### 1. `sourceUnit`

The active persona migration event.

It should reference:

- unit identity;
- dimension;
- yao stage.

Example:

```text
action-five-awareness
```

### 2. `fromModel`

The old operating model being departed from.

Example:

```text
using immediate action to recover control
```

It should come from:

- `oldModel`;
- `inertiaPattern`;
- `insight`.

### 3. `toResponse`

The new response direction becoming possible.

Example:

```text
confirm the real problem before acting
```

It should come from:

- `revisionDirection`;
- `microAction`;
- user confirmation.

### 4. `deflectionVector`

The persona-dynamics direction of movement.

Examples:

- from tightening to sensing;
- from emotional takeover to naming;
- from explanation to observation;
- from immediate action to conscious action;
- from old trace to current evidence;
- from hidden protection to conscious protection.

It should not be a score.

It is a qualitative vector.

### 5. `beastImpact`

The starbeast expression of the movement.

It should come from:

- `beastCue.before`;
- `beastCue.after`;
- `beastCue.cue`.

It is not:

- animation parameters;
- scale;
- opacity;
- particle count.

It is the meaning of the visual shift.

### 6. `crystalImprint`

The crystallizable trace.

It should come from:

- `crystalTrace.traceLine`;
- `crystalTrace.shouldDepositToCrystal`;
- `crystalTrace.shouldDepositToRingLite`.

It answers:

```text
What exactly can this round leave behind?
```

### 7. `impactReadiness`

Whether the migration impact is ready to feed the crystal boundary.

Allowed semantic states:

- `NOT_READY`
- `READY_FOR_CRYSTAL`

It can only become `READY_FOR_CRYSTAL` after:

- the active unit exists;
- the user-facing insight has been shown;
- the micro action has been confirmed;
- the impact has a crystal imprint.

## 06. Causal Rules

### Rule 1: No Impact Without User Confirmation

Seeing an old model is not yet impact.

Impact begins only when the user confirms one new response.

Product meaning:

```text
I saw myself.
```

is different from:

```text
I moved one response.
```

Only the second can feed the crystal.

### Rule 2: No Crystal From Raw Unit Alone

The 64 hexagram-code crystal should not be formed from only:

- dimension;
- yao stage;
- old model;
- insight.

It must be formed after:

- revision direction;
- micro action;
- user confirmation;
- crystal imprint.

### Rule 3: Impact Is Current-Round Only In 1.0

In 1.0, `PersonaMigrationImpact` is current-round.

It does not create:

- long-term profile;
- growth level;
- behavior score;
- streak;
- habit record.

It only prepares:

- current-round crystallization;
- Personality Ring Lite deposition.

### Rule 4: Impact Is Qualitative

`PersonaMigrationImpact` should describe movement.

It should not quantify the user.

Avoid:

```text
agency score increased by 20
growth value +1
level improved
```

Use:

```text
from automatic action to conscious action
```

or:

```text
from old protection to a chosen response
```

## 07. Action-Five-Awareness Example

Source unit:

```text
action-five-awareness
```

Dimension:

```text
action
```

Yao stage:

```text
awareness
```

From model:

```text
The user uses immediate action to recover control under uncertainty.
```

To response:

```text
Before acting, the user confirms the real problem that needs to be solved.
```

Deflection vector:

```text
from automatic action to conscious action
```

Beast impact:

```text
The starbeast shifts from rushing forward to stabilizing its direction.
```

Crystal imprint:

```text
This round leaves a trace of moving from automatic action to conscious action.
```

Impact readiness:

```text
READY_FOR_CRYSTAL
```

Only after this impact exists should the crystal boundary be considered semantically complete.

## 08. Frontend Language Boundary

`PersonaMigrationImpact` is mostly not frontend copy.

Frontend may express it through short lines such as:

- 这一局，你留下了一种新的回应方式。
- 从自动行动，转向有意识行动。
- 星兽先稳住方向，再继续前行。
- 这一局的变化，开始结晶。

Frontend must not expose:

- `impactReadiness`;
- raw engine fields;
- scores;
- algorithmic cause;
- old R8 migration terms.

## 09. Engineering Boundary

This protocol does not require immediate engineering changes.

Future implementation may introduce:

- a TypeScript type;
- a mapping function from `PersonaTransmissionRuntimeUnit`;
- a validator;
- a `currentCrystalEndState` input adapter.

But 1.0 should not introduce:

- storage fields;
- database persistence;
- profile mutation;
- long-term migration history;
- 384 yao;
- old R8 migration pipeline.

If implemented later, it should remain in memory for the current round unless a separate storage protocol is approved.

## 10. Relationship To Existing Fields

Existing fields already point toward this layer:

| Existing field | Migration impact meaning |
| --- | --- |
| `revisionDirection` | where the movement goes |
| `microAction` | how the movement is confirmed |
| `beastCue` | how the movement is visually expressed |
| `crystalTrace` | what the movement can leave |
| `currentCrystalEndState` | crystallized output after readiness |
| Personality Ring Lite entry | deposited trace after crystallization |

`crystalTrace` is not a full impact object yet.

It is the current trace seed.

`PersonaMigrationImpact` is the causal interpretation of that trace.

## 11. 1.0 Lock

The locked 1.0 causal statement is:

```text
PersonaTransmissionUnit does not directly become a 64 hexagram-code crystal.
It first produces a PersonaMigrationImpact.
Only an impact that includes a confirmed micro action and crystallizable trace can feed the current-round crystal boundary.
```

Chinese lock:

```text
人格迁移事件不会直接变成本局卦码结晶。
它先形成人格迁移影响。
只有包含已确认微动作与可沉积痕迹的影响，才可以进入本局结晶边界。
```

