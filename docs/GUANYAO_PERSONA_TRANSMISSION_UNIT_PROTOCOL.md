# GUANYAO Persona Transmission Unit Protocol

## 00. Protocol Position

This document defines the smallest complete unit of Guanyao persona behavior dynamics:

```text
PersonaTransmissionUnit
```

A `PersonaTransmissionUnit` is the smallest complete unit through which a real pressure enters the user's persona system, becomes visible, creates a revision opportunity, and deposits as a trace.

It connects:

```text
Pressure seed
-> Mother code
-> Current hexagram orientation
-> Six-dimension / six-yao transmission
-> Current-session revision action
-> 64 hexagram-code crystal
-> Personality ring trace
```

## 01. Definition

A persona transmission unit is not:

- one line of copy;
- one visual node;
- one test result;
- one suggestion;
- one task;
- one habit prompt.

It is:

> One old persona model running inside one persona space, at one change stage, under one real pressure, with one possible revision direction.

In Chinese product terms:

> 一个现实压力进入用户人格系统后，在某个人格空间、某个变化阶段里，显影出的一次旧模型运行与修正机会。

## 02. Core Structure

Every `PersonaTransmissionUnit` must contain the following fields at the protocol level.

This is not a TypeScript implementation requirement yet.

It is the product model contract.

### 1. `identity`

The unique identity of the unit.

Example:

```text
body-second-yao
action-fifth-yao
thought-third-yao
```

Required components:

- `dimension`
- `yaoStage`

The identity must be stable enough for future mapping, but it should not be shown directly to users.

### 2. `trigger`

The hit condition.

It answers:

> Why does this unit become active now?

Input sources:

- pressure seed;
- pressure field;
- mother code influence;
- current hexagram profile;
- `YaoTransmissionProfile`;
- main cut / secondary cut / root cut when available.

The trigger should never be explained to the user as algorithmic logic.

It is used to select the unit.

### 3. `dimension`

The persona space entered by pressure.

Allowed values:

- `body`
- `emotion`
- `thought`
- `action`
- `memory`
- `motivation`

It answers:

> Which operating space of the user is being affected?

### 4. `yaoStage`

The model change stage.

Allowed stages:

- First Yao: Trigger
- Second Yao: Takeover
- Third Yao: Explanation
- Fourth Yao: Solidification
- Fifth Yao: Seeing
- Upper Yao: Revision

It answers:

> How far has the old model already moved?

### 5. `oldModel`

The old persona operating model.

This must not be a personality label.

Do not write:

```text
control personality
avoidant personality
anxious personality
weak execution type
```

Write instead:

```text
The user tries to create safety by controlling the environment.
```

or:

```text
The user protects dignity by acting before uncertainty becomes visible.
```

The old model describes a protection strategy under pressure.

It does not define the whole person.

### 6. `inertiaPattern`

The automatic response after the old model starts.

It answers:

> What does the user tend to do once the old model is running?

Examples:

- immediately intervene;
- solve too quickly;
- keep the body tense;
- build a fixed explanation;
- repeat a familiar route;
- protect dignity by silence;
- prove worth by over-action.

The inertia pattern is not blame.

It is the visible movement of an old protection mechanism.

### 7. `userFacingInsight`

The seeing language.

It answers:

> What can the user recognize as true without feeling judged?

Rules:

- use human language;
- stay close to a real situation;
- be easy to identify with;
- avoid technical terms;
- avoid diagnosis;
- avoid system language;
- avoid personality labeling.

Good example:

```text
You are used to using action to erase uncertainty.
```

Bad example:

```text
Your action inertia pattern has been detected.
```

### 8. `revisionDirection`

The direction of model revision.

It answers:

> If the old model does not continue unchanged, what direction becomes possible?

Examples:

- from tightening to sensing;
- from emotional takeover to naming;
- from explanation to observation;
- from immediate action to smaller action;
- from old trace to current evidence;
- from hidden protection to conscious protection.

This is still product language.

It may need translation before production frontend copy.

### 9. `microAction`

The current-session revision action.

It must be:

- small;
- concrete;
- available now;
- tied to the hit unit;
- free from moral pressure.

It must not be:

- life advice;
- an assignment;
- a task system;
- a behavior check-in;
- a long-term habit instruction;
- a score.

Examples:

- release one point of tension;
- name one fact that has actually happened;
- choose one smaller action;
- write down the sentence before believing it;
- pause for one breath before responding.

### 10. `beastState`

The starbeast state mapping.

It contains:

- `before`: the old model state;
- `after`: the revised state.

Examples:

```text
before: light track tightens
after: one light line loosens
```

```text
before: old route loops under the beast's feet
after: a new path appears beside the old route
```

The starbeast mapping is not decoration.

It is how the user's model movement becomes lifeform-visible.

### 11. `crystalTrace`

The crystal deposition trace.

It answers:

> What does this unit leave behind after the current round is completed?

It must connect to:

- 64 hexagram-code crystal;
- Personality Ring Lite;
- future personality ring traces.

The crystal trace does not store raw pressure exposure as public identity.

It stores the model movement:

```text
old reaction seen
-> small revision confirmed
-> current-round form deposited
```

## 03. Full Lifecycle

A `PersonaTransmissionUnit` follows this lifecycle:

```text
Trigger
↓
Hit
↓
Manifestation
↓
Seeing
↓
Revision
↓
Deposition
```

### Trigger

Reality pressure enters.

The unit becomes possible because pressure touches a specific part of the user's model.

### Hit

The system identifies the most relevant persona space and yao stage.

The hit should be driven by:

- pressure seed;
- mother code;
- current hexagram orientation;
- `YaoTransmissionProfile`.

### Manifestation

The old model becomes visible through:

- user-facing insight;
- starbeast state;
- dimension / yao stage;
- current pressure context.

### Seeing

The user recognizes:

> This is how I have been protecting myself.

This is the emotional center of the unit.

### Revision

The user confirms one small new response.

The unit must not ask the user to change their personality.

It only asks the user to move one old response in the current round.

### Deposition

The model movement becomes a current-round crystal.

The crystal can become:

- a 64 hexagram-code asset;
- a Personality Ring Lite star point;
- a future personality ring trace.

## 04. Minimal Schema Example

Example:

```text
identity:
  body-second-yao

trigger:
  pressureSeed: debt pressure
  pressureField: material pressure
  motherCodeInfluence: boundary protection
  currentHexagramProfile: retreat / containment

dimension:
  body

yaoStage:
  secondYao.takeover

oldModel:
  Staying alert is the only way to stay safe.

inertiaPattern:
  Continuous tightening.

userFacingInsight:
  You have learned to keep yourself ready for impact.

revisionDirection:
  Allow the body to lower one layer of defense.

microAction:
  Release one point of tension you are still holding.

beastState:
  before: skeletal light track tightens
  after: one light line loosens

crystalTrace:
  This round deposits a shift from bodily defense to stable bearing.
```

## 05. Relationship With Current Engine Fields

Current engine fields can map to this unit as follows:

| PersonaTransmissionUnit field | Existing source |
| --- | --- |
| `trigger.pressureSeed` | selected pressure seed context |
| `trigger.pressureField` | pressure field / category |
| `trigger.motherCodeInfluence` | `motherCodeInfluence` |
| `trigger.currentHexagramProfile` | `currentHexagramProfile` |
| `dimension` | primary petal / six-space resolver |
| `yaoStage` | `yaoLayer` or future stage mapping |
| `oldModel` | `motherCodeInfluence` + `hexagramInfluence` + `inertiaSignal` |
| `inertiaPattern` | `inertiaSignal` |
| `userFacingInsight` | semantic mapping layer |
| `revisionDirection` | `antiInstinctHint` + `mainCut` |
| `microAction` | translated anti-instinct direction |
| `beastState` | starbeast mapping layer |
| `crystalTrace` | current crystal / personality ring layer |

This means the concept can be mapped onto the existing engine foundation.

But the full unit should not be created by exposing raw engine fields directly.

## 06. Frontend Rule

The frontend should not display the whole unit.

In 1.0, the frontend should only expose:

- current dimension;
- current yao stage;
- one user-facing insight;
- one microAction;
- one starbeast cue;
- one crystal trace after completion.

The rest remains backend/product structure.

The user should not read a schema.

The user should feel a recognition.

## 07. Product Boundary

`PersonaTransmissionUnit` is not:

- a 384 yao direction;
- a yao-device payload;
- an archive item;
- a collectible asset system;
- a task;
- a behavior training record;
- a psychological diagnosis.

It is the smallest current-round unit of persona model recognition and revision.

## 08. 1.0 / 1.1 / 2.0 Boundary

### 1.0

1.0 may use this protocol to:

- align six-dimension / six-yao language;
- drive current-session revision action;
- clarify crystal meaning;
- keep frontend copy from becoming generic.

1.0 does not need:

- full persisted `PersonaTransmissionUnit` storage;
- full 36-unit data table;
- long-term behavior tracking;
- 384 yao direction.

### 1.1

1.1 may introduce:

- partial structured units;
- richer starbeast state mapping;
- multi-round traces;
- stronger personality ring deposition.

### 2.0

2.0 may introduce:

- complete 36-unit production data;
- 384 yao direction expansion;
- long-term persona model migration;
- dynamic starbeast life system.

## 09. Final Rule

Every future Guanyao persona interaction should be able to answer:

```text
Which PersonaTransmissionUnit is active?
What old model did it expose?
What new response did the user confirm?
What trace did this round leave?
```

If it cannot answer these questions, it is probably only visual decoration or generic analysis.

Guanyao's core must remain:

> one pressure,
> one old model seen,
> one small response moved,
> one trace deposited.
