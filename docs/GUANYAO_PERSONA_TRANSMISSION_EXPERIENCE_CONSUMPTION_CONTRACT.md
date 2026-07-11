# GUANYAO Persona Transmission Experience Consumption Contract

## 00. Document Position

This document defines how a validated:

```text
PersonaTransmissionRuntimeUnit
```

can be converted into a page-consumable experience object.

It is an architecture contract.

It does not modify:

- `src`;
- `GravityPage`;
- runtime;
- services;
- storage;
- routes;
- AI hit logic;
- database fields.

It is not:

- a persona calculation layer;
- a mapping service;
- a validator;
- a UI implementation;
- a copy-generation system;
- a storage schema.

## 01. Architecture Position

The `Experience Consumption Layer` is not:

- persona calculation;
- engine translation;
- runtime validation;
- AI generation;
- data persistence;
- route control;
- visual rendering.

It only handles:

```text
validated PersonaTransmissionRuntimeUnit
↓
page-consumable experience structure
```

Its responsibility begins only after:

```text
MappingService status = PASS
RuntimeValidator status = PASS
```

If the unit is not validated, this layer must not fabricate an experience.

## 02. Full Chain

The locked chain is:

```text
YaoTransmissionProfile
↓
PersonaTransmissionMappingService
↓
PersonaTransmissionRuntimeUnit
↓
PersonaTransmissionRuntimeValidator
↓
PersonaTransmissionExperienceConsumptionModel
↓
GravityPage
```

The consumption layer sits between validator and page.

It does not reach backward into the engine.

It does not write forward into storage.

## 03. Input Contract

Input:

```text
PersonaTransmissionRuntimeUnit
```

Required condition:

```text
validated = true
```

The layer may consume:

- `identity.unitId`
- `dimension`
- `yaoStage`
- `triggerContext`
- `oldModel`
- `inertiaPattern`
- `insight`
- `revisionDirection`
- `microAction`
- `beastCue`
- `crystalTrace`
- `guardrails`

It must not consume:

- raw `YaoTransmissionProfile`
- `pressureReading`
- `inertiaSignal`
- `antiInstinctHint`
- `mainCut`
- `cutPotential`
- `interventionPotential`

## 04. Output Contract

The future page-consumable shape may be:

```ts
type PersonaTransmissionExperienceModel = {
  status: "READY";
  identity: {
    unitId: string;
    dimension: PersonaDimension;
    yaoStage: PersonaYaoStage;
  };
  orientation: {
    pressureLine: string;
    currentRoundLine?: string;
  };
  recognition: {
    oldModelLine: string;
    inertiaLine: string;
    insightLine: string;
  };
  revision: {
    directionLine: string;
    microActionLine: string;
  };
  starbeast: {
    beforeLine: string;
    afterLine: string;
    cueLine: string;
  };
  trace: {
    crystalLine: string;
    depositsToCrystal: boolean;
    depositsToRingLite: boolean;
  };
};
```

This is a design shape only.

It is not a TypeScript implementation in this knife.

## 05. Experience Sections

The page should not display the runtime unit as a raw object.

It should organize it into experience sections.

### 1. Orientation

Answers:

```text
Where am I in this round?
```

Source:

- `triggerContext.pressureSeed`
- `triggerContext.pressureField`
- `triggerContext.currentHexagramProfile`
- `triggerContext.currentHexagramName`

Rules:

- describe current-round position;
- do not imply final 64 hexagram-code crystal exists;
- do not show algorithmic explanation.

### 2. Recognition

Answers:

```text
What old model is running?
```

Source:

- `oldModel`
- `inertiaPattern`
- `insight`

Rules:

- user should feel recognized, not judged;
- no personality label;
- no diagnosis;
- no engine language.

### 3. Revision

Answers:

```text
What can I do differently this time?
```

Source:

- `revisionDirection`
- `microAction`

Rules:

- one current-round movement;
- no task system;
- no check-in;
- no long-term habit program;
- no score.

### 4. Starbeast Cue

Answers:

```text
How does this movement become visible?
```

Source:

- `beastCue.before`
- `beastCue.after`
- `beastCue.cue`

Rules:

- semantic visual cue only;
- not animation parameters;
- not pet state;
- not reward state.

### 5. Trace

Answers:

```text
What does this round leave behind?
```

Source:

- `crystalTrace.traceLine`
- `crystalTrace.shouldDepositToCrystal`
- `crystalTrace.shouldDepositToRingLite`

Rules:

- may prepare current-round crystal language;
- may prepare Personality Ring Lite language;
- must not write storage;
- must not fabricate crystal.

## 06. Fallback Consumption

If mapping result is not `PASS`, the consumption layer should receive no complete runtime unit.

Allowed fallback model:

```ts
type PersonaTransmissionExperienceFallback = {
  status: "NOT_READY";
  reason: string;
};
```

Fallback must not create:

- fake insight;
- fake micro action;
- fake starbeast cue;
- fake crystal trace;
- fake personality-ring state.

Fallback copy direction:

```text
This round has not yet formed a complete persona transmission unit.
```

Chinese direction:

```text
这一局还没有形成完整的人格动力单元。
```

## 07. GravityPage Consumption Boundary

Future `GravityPage` may consume:

- `orientation.pressureLine`
- `recognition.insightLine`
- `revision.microActionLine`
- `starbeast.cueLine`
- `trace.crystalLine`

Future `GravityPage` must not consume:

- `YaoTransmissionProfile`
- `inertiaSignal`
- `pressureReading`
- `antiInstinctHint`
- `mainCut`
- raw validator reasons as user copy

Validator reasons are engineering diagnostics, not frontend language.

## 08. Relationship to Current 1.0 Flow

In 1.0, this layer should remain minimal.

It may support:

- one current-round runtime unit;
- one recognition moment;
- one micro action;
- one starbeast cue;
- one crystal trace.

It must not support:

- full 36-unit production browsing;
- multiple simultaneous runtime units;
- long-term behavior tracking;
- chat;
- social;
- pet growth;
- archive;
- 384 yao direction.

## 09. Acceptance Criteria

The consumption layer is ready only if:

- it receives validated runtime units only;
- it exposes no engine language;
- it organizes experience into clear sections;
- it preserves `currentHexagramProfile` as orientation only;
- it does not imply final crystal before crystal formation;
- it does not write storage;
- it does not mutate runtime units;
- it does not create new persona content.

## 10. Engineering Boundary

This document does not:

- modify code;
- implement the consumption layer;
- modify `GravityPage`;
- modify runtime;
- modify services;
- modify storage;
- modify routes;
- connect AI;
- connect database;
- connect archive;
- connect yao-device;
- connect old R8;
- connect 384 yao direction.

