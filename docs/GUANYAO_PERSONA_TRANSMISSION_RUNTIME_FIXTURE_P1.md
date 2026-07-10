# GUANYAO Persona Transmission Runtime Fixture P1

## 00. Document Position

This document defines the first static runtime fixture for:

```text
YaoTransmissionProfile
↓
PersonaTransmissionRuntimeUnit
```

It is a product-model fixture document.

It does not modify:

- `src`;
- runtime;
- services;
- storage;
- routes;
- `GravityPage`;
- AI hit logic;
- database fields.

It is not:

- real user data;
- storage data;
- a user profile;
- a production sample;
- a 36-unit production database;
- an AI prompt output.

The purpose is to verify that engine-side persona dynamics signals can be translated into a frontend-ready `PersonaTransmissionRuntimeUnit`.

## 01. Fixed Case

This fixture continues the first runtime unit sample:

```text
identity: action-five-awareness
dimension: action
yaoStage: awareness
```

Protocol meaning:

```text
行动空间 × 五爻 · 觉察
```

This fixture should answer:

> How does one `YaoTransmissionProfile` become one `PersonaTransmissionRuntimeUnit`?

## 02. Input Layer Simulation

### `pressureSeed`

Reality pressure:

```text
A real problem needs to move forward, but the result is uncertain.
```

Chinese product direction:

```text
有一件事必须推进，但结果仍然不确定。
```

The pressure is not simply "work".

It specifically activates:

```text
movement under uncertainty
```

### `motherCode`

Mother-code influence:

```text
The user tends to use action to recover a sense of control and value.
```

Chinese product direction:

```text
用户容易通过行动重新获得掌控感，也用行动确认自己的价值。
```

This does not mean the user is an "action type".

It only describes how the original persona base tends to respond under pressure.

### `currentHexagramProfile`

Current-round position:

```text
The round forms in a situation where movement is demanded before direction is fully clear.
```

Chinese product direction:

```text
这一局形成在“需要推进，但方向尚未完全清楚”的位置。
```

Boundary:

- this is not the final 64 hexagram-code crystal;
- this is not a hexagram-code card;
- this only locates the current round before six-dimensional transmission.

## 03. Simulated `YaoTransmissionProfile`

The engine-side simulation:

```ts
const simulatedYaoTransmissionProfile = {
  pressureReading:
    "The pressure asks the user to move while the outcome is still uncertain.",
  motherCodeInfluence:
    "The mother-code base makes action feel like the fastest way to regain control.",
  transmissionReading:
    "Pressure enters the action space and exposes a pattern of moving before rejudging.",
  inertiaSignal:
    "Action acceleration under uncertainty.",
  antiInstinctHint:
    "Pause before acting and name the real problem first.",
  cutPotential:
    "The action impulse can be cut at the moment before taking over responsibility.",
  interventionPotential:
    "The user can insert one moment of judgment before movement.",
  userAgency:
    "The user can choose conscious action instead of immediate action.",
};
```

This object is a fixture shape only.

It is not imported into code.

It should not be displayed directly in the frontend.

## 04. Mapping Rule

The fixture uses this mapping:

| Engine-side signal | Runtime Unit field | Translation rule |
| --- | --- | --- |
| `pressureReading` | `triggerContext.pressureSeed` | Convert pressure into a real-life situation. |
| `motherCodeInfluence` | `triggerContext.motherCodeInfluence` | Keep as background influence, not user label. |
| `transmissionReading` | `triggerContext.pressureField` and unit hit reason | Extract the operating space and hit context. |
| `inertiaSignal` | `inertiaPattern` | Translate raw inertia into observable user behavior. |
| `antiInstinctHint` | `revisionDirection` and `microAction` | Convert hint into one small response direction. |
| `cutPotential` | `revisionDirection` | Identify where the old model can be interrupted. |
| `interventionPotential` | `microAction` | Turn intervention into one confirmable action. |
| `userAgency` | `microAction` and `crystalTrace` | Ensure the user has a real point of agency. |

The frontend must not consume raw engine signals.

It should consume the translated runtime unit.

## 05. Runtime Unit Output

The mapped `PersonaTransmissionRuntimeUnit`:

```ts
const actionFiveAwarenessRuntimeFixture = {
  identity: {
    unitId: "action-five-awareness",
  },
  dimension: "action",
  yaoStage: "awareness",
  triggerContext: {
    pressureSeed:
      "A real problem needs to move forward, but the result is uncertain.",
    pressureField: "movement_under_uncertainty",
    motherCodeInfluence:
      "The user tends to use action to recover a sense of control and value.",
    motherCodeName: "sample-mother-code",
    currentHexagramProfile:
      "The round forms where movement is demanded before direction is fully clear.",
    currentHexagramName: "sample-current-hexagram",
    source: "runtime",
  },
  oldModel:
    "The user creates temporary safety by moving quickly before uncertainty becomes visible.",
  inertiaPattern:
    "The user accelerates, takes over, tries to solve immediately, and skips a fresh judgment.",
  insight:
    "You have learned to use action to feel that things are still within reach.",
  revisionDirection: "From immediate action to conscious action.",
  microAction:
    "Before acting next time, first name the real problem you are trying to solve.",
  beastCue: {
    before:
      "Direction light rushes outward, and the front claws keep reaching forward.",
    after:
      "The direction settles, and the light path gathers before moving.",
    cue: "The starbeast shifts from rushing ahead to holding direction.",
  },
  crystalTrace: {
    traceLine:
      "This round records a movement from using action to reduce uncertainty toward judging before acting.",
    shouldDepositToCrystal: true,
    shouldDepositToRingLite: true,
  },
  guardrails: {
    noStorageWrite: true,
    noLongTermProfile: true,
    noRawEngineLanguage: true,
    no384Yao: true,
    noArchive: true,
  },
};
```

This fixture matches the Type Contract shape:

```text
identity
dimension
yaoStage
triggerContext
oldModel
inertiaPattern
insight
revisionDirection
microAction
beastCue
crystalTrace
guardrails
```

## 06. Translation Verification

### Raw Engine Language

Do not show:

```text
inertiaSignal:
  Action acceleration under uncertainty.

interventionPotential:
  The user can insert one moment of judgment before movement.
```

### Persona Model Language

Intermediate product meaning:

```text
The old model uses action to reduce uncertainty before the situation is fully seen.
```

### User-Facing Language

Frontend-ready line:

```text
You have learned to use action to feel that things are still within reach.
```

Chinese product direction:

```text
你已经习惯用行动，让自己感觉事情仍在掌控之中。
```

### Revision Language

Frontend-ready micro action:

```text
Before acting next time, first name the real problem you are trying to solve.
```

Chinese product direction:

```text
下一次准备行动前，先确认一次真正要解决的问题。
```

## 07. Experience Chain Verification

### Hit

The unit is hit because:

- pressure requires movement;
- uncertainty is high;
- mother-code influence makes action feel stabilizing;
- current hexagram position places the user before clear direction;
- engine signals show action acceleration and intervention potential.

### Reveal

The old model becomes visible:

```text
The user creates temporary safety by moving quickly before uncertainty becomes visible.
```

### Recognize

The user can recognize:

```text
You have learned to use action to feel that things are still within reach.
```

### Revise

The user confirms:

```text
Before acting next time, first name the real problem you are trying to solve.
```

### Starbeast Cue

The starbeast does not reward the user.

It expresses the model shift:

```text
from rushing ahead
to holding direction
```

### Crystal Trace

The crystal trace records:

```text
from using action to reduce uncertainty
to judging before acting
```

## 08. Guardrail Verification

This fixture keeps all 1.0 guardrails:

```text
noStorageWrite: true
noLongTermProfile: true
noRawEngineLanguage: true
no384Yao: true
noArchive: true
```

It does not create:

- storage writes;
- user archive;
- long-term profile;
- pet growth state;
- score;
- streak;
- 384 yao direction;
- yao-device;
- old R8 asset;
- collectible asset system.

## 09. What This Fixture Proves

This fixture proves:

1. A `YaoTransmissionProfile` can be translated into a `PersonaTransmissionRuntimeUnit`.
2. The runtime unit can carry hit background, old model, user insight, micro action, beast cue, and crystal trace.
3. The frontend does not need raw engine language.
4. A single runtime unit is enough to create one complete current-round persona movement.
5. The fixture can become the first test case for future mapping logic.

It does not prove:

- full 36-unit production readiness;
- AI dynamic hit quality;
- storage design;
- GravityPage integration;
- starbeast visual implementation.

## 10. Next Step

Recommended next step:

```text
YaoTransmissionProfile mapping rule
↓
single runtime fixture validator
↓
GravityPage read-only consumption design
```

Do not connect storage before the runtime mapping is stable.

Do not let the frontend consume raw engine fields directly.

## 11. Engineering Boundary

This fixture does not:

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

