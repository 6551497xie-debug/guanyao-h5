# GUANYAO Persona Transmission Runtime Shape Protocol

## 00. Protocol Position

This document defines:

```text
PersonaTransmissionRuntimeUnit
```

as the runtime shape of one current-round persona dynamics process.

This is a protocol design document.

It does not modify:

- `src`;
- runtime;
- services;
- storage;
- routes;
- `GravityPage`;
- TypeScript types;
- database fields.

It is not:

- a user profile;
- a personality archive;
- long-term memory;
- a 36-unit production database;
- a storage schema.

## 01. Runtime Unit Definition

`PersonaTransmissionRuntimeUnit` is:

> the active runtime instance of a persona dynamics unit dynamically hit by AI during one real-pressure round.

In Chinese product language:

> 当前这一局现实压力下，AI 命中的一个人格动力单元实例。

It connects:

```text
Reality pressure
↓
Model hit
↓
User experience
↓
Revision action
↓
Crystal trace
```

It answers:

- What pressure entered?
- Which persona space did it enter?
- Which yao stage is active?
- What old model is running?
- What can the user recognize?
- What micro action can be confirmed?
- What trace will this round leave?

## 02. Static Model vs Runtime Instance

### Static Model

Static 36 persona dynamics units answer:

```text
What possible persona change paths exist?
```

They belong to:

- product model;
- 36-yao sample protocol;
- future structured data;
- semantic design.

They do not describe a specific user session by themselves.

### Runtime Instance

`PersonaTransmissionRuntimeUnit` answers:

```text
Which change path is this user experiencing in this round?
```

It belongs to:

- current session;
- AI hit result;
- frontend experience preparation;
- current-session revision action;
- current-round crystal trace.

### Relationship

```text
36 persona dynamics model
↓
dynamic hit
↓
PersonaTransmissionRuntimeUnit
↓
user experience
↓
revision action
↓
crystallization
```

The static model defines possibility.

The runtime unit carries the current event.

## 03. Runtime Shape

The minimal runtime shape is:

```text
PersonaTransmissionRuntimeUnit

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
```

This is a product protocol shape, not a TypeScript type in this knife.

### `identity`

Current instance identity.

Example:

```text
action-five
body-second
thought-three
```

Rules:

- stable enough for runtime reference;
- not shown directly to the user;
- not a storage id in 1.0.

### `dimension`

The persona space.

Allowed values:

- `body`
- `emotion`
- `thought`
- `action`
- `memory`
- `motivation`

It answers:

> Which operating space is pressure entering?

### `yaoStage`

The change stage.

Allowed values:

- `trigger`
- `takeover`
- `explain`
- `solidify`
- `awareness`
- `revision`

Meaning:

| Runtime value | Protocol meaning |
| --- | --- |
| `trigger` | 初爻 · 触发 |
| `takeover` | 二爻 · 接管 |
| `explain` | 三爻 · 解释 |
| `solidify` | 四爻 · 固化 |
| `awareness` | 五爻 · 觉察 |
| `revision` | 上爻 · 修正 |

### `triggerContext`

The hit background.

Sources:

- `pressureSeed`
- `pressureField`
- `motherCodeInfluence`
- `currentHexagramProfile`
- `YaoTransmissionProfile`

It answers:

> Why did this round hit this unit?

It must not be exposed as algorithmic explanation in the frontend.

### `oldModel`

The old persona operating model.

Rules:

- not a personality label;
- not a diagnosis;
- not a type;
- not a fixed identity.

Bad:

```text
control personality
avoidant type
weak execution type
```

Good:

```text
The user creates safety by controlling the environment.
```

or:

```text
The user protects dignity by acting before uncertainty becomes visible.
```

### `inertiaPattern`

The automatic response after the old model starts.

It answers:

> Once the old model is running, what does the user automatically do?

Examples:

- immediately intervene;
- keep the body tense;
- let feeling decide what is real;
- build a fixed explanation;
- repeat an old route;
- protect the core by closing down.

### `insight`

The user-facing seeing language.

It must pass through:

```text
Persona Semantic Mapping
```

It must not directly expose:

- `inertiaSignal`
- `pressureReading`
- `mainCut`
- `antiInstinctHint`
- `cutPotential`
- `interventionPotential`

Rules:

- human language;
- recognizable;
- concrete;
- non-diagnostic;
- non-system;
- not an AI report.

### `revisionDirection`

The model revision direction.

Primary sources:

- `antiInstinctHint`
- `mainCut`

It answers:

> If the old model does not continue unchanged, what direction becomes possible?

It is still product language and may need translation before visible copy.

### `microAction`

The current-session revision action.

Rules:

- small;
- current;
- executable;
- non-task;
- non-check-in;
- non-score.

It is not life advice.

It is the smallest new response available in this round.

### `beastCue`

The starbeast feedback.

This is not animation parameter data.

It is not:

- `scale`;
- `opacity`;
- `particle`;
- rendering config.

It is the semantic visual cue that corresponds to model movement.

Example:

```text
before: light track tightens
after: light track opens again
```

or:

```text
before: old path loops under the beast
after: a new path appears beside it
```

### `crystalTrace`

The crystallization trace.

It answers:

> How does this current-round movement enter the 64 hexagram-code crystal and Personality Ring Lite?

It may inform:

- current-round crystal copy;
- 64 hexagram-code card semantics;
- Personality Ring Lite star point.

It must not expose raw pressure content as public identity.

## 04. Lifecycle

`PersonaTransmissionRuntimeUnit` follows:

```text
created
↓
matched
↓
revealed
↓
acknowledged
↓
revised
↓
crystallized
```

### `created`

The current instance is created in the current round.

Pressure context exists.

### `matched`

AI hits the current unit.

The hit is based on:

- pressure seed;
- mother code;
- current hexagram profile;
- `YaoTransmissionProfile`.

### `revealed`

The old model becomes visible.

Frontend may show:

- dimension;
- yao stage;
- insight;
- beast cue.

### `acknowledged`

The user recognizes the old model.

This is not a test answer.

It is the moment of:

```text
This is how I have been responding.
```

### `revised`

The user confirms one new response.

This is the current-session micro action.

### `crystallized`

The current-round movement becomes:

- 64 hexagram-code crystal;
- Personality Ring Lite trace.

## 05. Relationship With Existing Engine

`YaoTransmissionProfile` is responsible for:

```text
persona dynamics calculation
```

`PersonaTransmissionRuntimeUnit` is responsible for:

```text
experience carrying
```

Relationship:

```text
YaoTransmissionProfile
↓
PersonaTransmissionRuntimeUnit
↓
GravityPage
```

Existing engine concepts can inform the runtime unit:

- `pressureReading`
- `motherCodeInfluence`
- `hexagramInfluence`
- `transmissionReading`
- `inertiaSignal`
- `antiInstinctHint`
- `mainCut`
- `secondaryCut`
- `rootCut`
- `interventionPotential`
- `userAgency`

But raw engine language must not go directly to the frontend.

## 06. Relationship With Existing Protocols

This protocol connects:

- `GUANYAO_PERSONA_BEHAVIOR_DYNAMICS_CORE_V1`
- `GUANYAO_PERSONA_MODEL_REVISION_PROTOCOL`
- `GUANYAO_PERSONA_SEMANTIC_MAPPING_PROTOCOL`
- `GUANYAO_36_YAO_MODEL_SAMPLE_PROTOCOL`
- `GUANYAO_36_YAO_TRIGGER_MAPPING_PROTOCOL`
- `GUANYAO_PERSONA_TRANSMISSION_UNIT_PROTOCOL`

It sits between:

```text
protocol model
↓
future runtime implementation
```

It does not replace the core model.

It makes the core model easier to carry at runtime.

## 07. 1.0 Boundary

1.0 can include:

- current-round Runtime Unit;
- current manifestation;
- current revision action;
- current crystal trace.

1.0 does not include:

- storage;
- historical accumulation;
- multi-round persona trajectory;
- full 36 production data;
- beast-mark system;
- 384 yao direction;
- archive;
- yao-device;
- old R8.

## 08. Engineering Evolution Route

Future route:

```text
docs protocol
↓
src/types
↓
runtime state
↓
service mapping
↓
GravityPage
↓
starbeast visual
```

This knife only completes the docs protocol step.

It does not enter `src/types`.

## 09. Minimal Example

```text
identity:
  action-five

dimension:
  action

yaoStage:
  awareness

triggerContext:
  pressureSeed: relationship conflict
  pressureField: relational pressure
  motherCodeInfluence: prove worth through response
  currentHexagramProfile: movement under pressure

oldModel:
  The user restores safety through immediate action.

inertiaPattern:
  Acting before the situation has been understood.

insight:
  You are starting to see that there are other ways to respond.

revisionDirection:
  Create a small gap between impulse and action.

microAction:
  Choose one smaller action instead of the full old reaction.

beastCue:
  before: old path loops under the beast
  after: a new path appears beside it

crystalTrace:
  This round deposits a shift from automatic action to chosen action.
```

## 10. Final Rule

`PersonaTransmissionRuntimeUnit` should help the system know:

```text
what is happening now
what the user can see
what the user can revise
what this round can crystallize
```

It must not become:

- a hidden personality archive;
- a storage object;
- a long-term user profile;
- a 36-unit database;
- a 384 yao payload.

It is a temporary vessel for one current-round persona movement.
