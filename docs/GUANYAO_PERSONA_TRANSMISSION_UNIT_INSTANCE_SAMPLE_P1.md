# GUANYAO Persona Transmission Unit Instance Sample P1

## 00. Document Position

This document creates the first complete `PersonaTransmissionRuntimeUnit` sample.

It is a product-model instance sample.

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

- a production data table;
- a full 36-unit library;
- a frontend copy sheet;
- a storage schema;
- a long-term user profile.

The purpose is to verify whether one runtime unit can complete the full Guanyao experience:

```text
hit
↓
reveal
↓
recognize
↓
revise
↓
beast cue
↓
crystal trace
```

## 01. Fixed Sample

This sample uses:

```text
dimension: action
yaoStage: awareness
identity: action-five-awareness
```

Protocol meaning:

```text
行动空间 × 五爻 · 觉察
```

It answers:

> What happens when pressure enters behavior, and the user begins to see the old action model?

## 02. Runtime Unit Shape

```ts
const actionFiveAwarenessSample = {
  identity: {
    unitId: "action-five-awareness",
  },
  dimension: "action",
  yaoStage: "awareness",
  triggerContext: {
    pressureSeed: "A real problem needs to move forward, but the result is uncertain.",
    pressureField: "uncertain_progress",
    motherCodeInfluence: "The user tends to secure value by acting quickly.",
    motherCodeName: "sample-mother-code",
    currentHexagramProfile: "A current-round position that activates action under uncertainty.",
    currentHexagramName: "sample-current-hexagram",
    source: "runtime",
  },
  oldModel: "The user creates temporary safety by moving quickly before uncertainty becomes visible.",
  inertiaPattern: "The user accelerates, takes over, solves immediately, and skips a fresh judgment.",
  insight: "You have learned to use action to feel that things are still within reach.",
  revisionDirection: "From immediate action to conscious action.",
  microAction: "Before acting next time, first name the real problem you are trying to solve.",
  beastCue: {
    before: "Direction light rushes outward, and the front claws keep reaching forward.",
    after: "The direction settles, and the light path gathers before moving.",
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

This code block is an instance shape example only. It is not imported by runtime.

## 03. Hit Background

### Reality Pressure

A real problem needs to move forward, but the result is uncertain.

The user feels:

```text
If I do not act now, the situation may get out of control.
```

This is not just a task pressure. It activates an action-based protection model.

### Mother Code Influence

The mother-code influence in this sample is:

```text
The user tends to confirm value by taking action.
```

The user does not only want to solve the problem.

They also want to avoid the feeling that they are passive, useless, or falling behind.

### Current Hexagram Position

The current-round hexagram position is treated as:

```text
A situation where movement is demanded, but direction is not yet stable.
```

It does not mean the user has already received a final hexagram-code asset.

It only describes where the current round begins.

### YaoTransmissionProfile Signals

The sample assumes these engine-side signals:

```text
inertiaSignal:
  action acceleration under uncertainty

interventionPotential:
  pause before acting

userAgency:
  able to name the real problem before moving
```

These signals must not be shown directly to the user.

They must be translated into persona-model language and then user-facing language.

## 04. Old Persona Model

The old model is not:

```text
action personality
execution type
busy person
```

The old model is:

```text
The user creates temporary safety by moving quickly before uncertainty becomes visible.
```

In Chinese product language:

```text
在压力靠近时，用户会通过快速行动，先把不确定感压下去。
```

This is a protection model, not a personality label.

## 05. Inertia Pattern

When the old model starts, the user automatically tends to:

- accelerate handling;
- take over responsibility;
- solve immediately;
- skip a fresh judgment;
- use motion to reduce anxiety;
- treat stillness as danger.

The key inertia is:

```text
Action replaces discernment.
```

In Chinese product language:

```text
行动先于判断。
```

## 06. User-Facing Insight

The user-facing insight must pass the semantic mapping layer.

Do not say:

```text
behavior inertia increased
decision model shifted
system detected action bias
```

Use reality language:

```text
You have learned to use action to feel that things are still within reach.
```

Chinese front-stage direction:

```text
你已经习惯用行动，让自己感觉事情仍在掌控之中。
```

This line should help the user feel:

```text
This is about me.
I can recognize this.
It is not judging me.
```

## 07. Revision Direction

The revision direction is not:

```text
stop acting
be less active
do nothing
```

The revision direction is:

```text
from immediate action
to conscious action
```

Chinese product language:

```text
从立刻行动，转向有意识地行动。
```

This keeps action as a force.

It only changes the user's relationship with action.

## 08. Micro Action

The micro action is:

```text
Before acting next time, first name the real problem you are trying to solve.
```

Chinese front-stage direction:

```text
下一次准备行动前，先确认一次真正要解决的问题。
```

Rules:

- It is small.
- It is specific.
- It can happen in the current life context.
- It is not a task system.
- It is not a check-in.
- It is not a habit program.
- It does not ask the user to change their whole personality.

The user confirms a new response direction, not a performance goal.

## 09. Starbeast Change Mapping

The starbeast does not become a pet, reward, or animation gimmick.

It expresses the movement of the persona model.

### Old State

```text
Direction light rushes outward.
The front claws keep reaching forward.
The light path is fast but scattered.
```

Meaning:

```text
The user tries to resolve uncertainty by moving before seeing clearly.
```

### Revised State

```text
The direction settles.
The light path gathers before moving.
The front claws stop rushing and begin to choose direction.
```

Meaning:

```text
The user keeps action, but lets judgment return before action starts.
```

### Beast Cue

```text
The starbeast shifts from rushing ahead to holding direction.
```

This is not animation design.

It is a semantic visual cue for future implementation.

## 10. Crystal Trace

This unit should leave a crystal trace.

The trace is not:

```text
saved a sentence
completed a task
earned a reward
```

The trace is:

```text
This round records a movement from using action to reduce uncertainty toward judging before acting.
```

Chinese product language:

```text
这一局留下的变化，是你从“用行动压下不确定”，移动到“先判断，再行动”。
```

### Relation to 64 Hexagram-Code Crystal

The 64 hexagram-code crystal should not be treated as a prediction or report.

In this sample, it carries the stage shape formed after the action model has been seen and slightly revised.

### Relation to Personality Ring Lite

Personality Ring Lite should receive this as one light point of change:

```text
One round where action stopped being only a defense and began becoming a chosen response.
```

It does not create:

- archive;
- collectible asset system;
- long-term behavior tracking;
- 384 yao direction;
- pet growth record.

## 11. Lifecycle Verification

### 1. Created

The runtime unit is created for the current round.

```text
identity = action-five-awareness
dimension = action
yaoStage = awareness
```

### 2. Matched

The unit is matched because:

- pressure demands movement;
- uncertainty is high;
- the mother-code influence favors action as proof of value;
- the current hexagram position activates action under unstable direction;
- engine signals suggest action acceleration and intervention potential.

### 3. Revealed

The old model is revealed:

```text
The user creates temporary safety by moving quickly before uncertainty becomes visible.
```

### 4. Acknowledged

The user can recognize:

```text
You have learned to use action to feel that things are still within reach.
```

This is not a diagnosis.

It is a moment of recognition.

### 5. Revised

The user confirms:

```text
Before acting next time, first name the real problem you are trying to solve.
```

This is the current-round revision action.

### 6. Crystallized

The round can leave a trace:

```text
from using action to reduce uncertainty
to judging before acting
```

This trace can support:

- current-round crystal;
- 64 hexagram-code crystal language;
- Personality Ring Lite light point.

## 12. Validation Result

This sample proves that a single `PersonaTransmissionRuntimeUnit` can carry:

- hit background;
- old persona model;
- inertia pattern;
- user-facing insight;
- revision direction;
- micro action;
- starbeast cue;
- crystal trace.

It is enough to form one complete Guanyao experience unit.

It is not enough to form the full runtime system by itself.

The next step should be:

```text
single-case Runtime Unit fixture
↓
mapping rule from YaoTransmissionProfile
↓
GravityPage consumption
```

Code should not consume raw engine language directly.

It should consume the translated runtime unit.

## 13. Engineering Boundary

This sample does not:

- modify code;
- define TypeScript types;
- write storage;
- create AI hit logic;
- connect runtime;
- connect services;
- change routes;
- connect archive;
- connect yao-device;
- connect old R8;
- connect 384 yao direction.

