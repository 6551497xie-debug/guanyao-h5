# GUANYAO Change Experience Presentation Adapter Protocol

## 00. Document Position

This document defines:

```text
ChangeExperiencePresentationAdapter
```

as the boundary between:

```text
PersonaTransmissionExperienceModel
+
ChangeExperienceUnit
```

and:

```text
GravityPage-consumable user experience presentation
```

It is a product and architecture protocol.

It does not modify:

- `GravityPage`;
- runtime;
- `PersonaTransmission`;
- `PersonaMigrationImpact`;
- `CrystalState`;
- the Hexagram Engine;
- 64 hexagram-code generation;
- storage;
- routes.

It is not a TypeScript contract yet.

## 01. Adapter Responsibility

`ChangeExperiencePresentationAdapter` has one responsibility:

```text
Convert runtime experience material and product change-experience asset
into a page-consumable presentation object.
```

It combines:

```text
PersonaTransmissionExperienceModel
```

with:

```text
ChangeExperienceUnit
```

to produce:

```text
ChangeExperiencePresentation
```

for `GravityPage`.

The adapter exists because the two inputs answer different questions.

`PersonaTransmissionExperienceModel` answers:

```text
What did the runtime persona-transmission chain produce for this round?
```

`ChangeExperienceUnit` answers:

```text
What self-change experience should the user be able to recognize and own?
```

The adapter answers:

```text
What should the page show now?
```

## 02. Forbidden Responsibilities

`ChangeExperiencePresentationAdapter` must not:

- judge whether persona migration really happened;
- calculate persona dynamics;
- generate `PersonaMigrationImpact`;
- decide `CrystalState`;
- decide crystal readiness;
- generate a hexagram code;
- generate a 64 hexagram-code asset;
- write storage;
- create history;
- create scores, levels, growth values, or rewards;
- reach into raw engine fields;
- replace `PersonaTransmission`;
- replace `ChangeExperienceUnit`;
- replace `CrystalState`.

It is a presentation adapter only.

## 03. Input Protocol

### A. Runtime Input

Input:

```text
PersonaTransmissionExperienceModel
```

It provides runtime experience material:

- `orientation`;
- `recognition`;
- `revision`;
- `starbeast`;
- `trace`.

It may provide:

- current pressure line;
- current-round line;
- runtime old-model line;
- inertia line;
- insight line;
- runtime revision direction;
- micro action;
- starbeast cue;
- trace line;
- deposit flags.

It must not be treated as:

- a product-level self-change asset;
- the user's full growth meaning;
- a crystal state;
- a final hexagram result.

### B. Product Experience Input

Input:

```text
ChangeExperienceUnit
```

It provides product experience material:

- `pressureContext`;
- `currentSituation`;
- `oldReaction`;
- `protectionMeaning`;
- `newResponse`;
- `transformationMoment`;
- `growthMeaning`;
- `crystalImprint`.

It may also provide:

- `dimension`;
- `rootProtection`;
- `manifestBehavior`;
- `changeType`.

It must not be treated as:

- runtime status;
- persona-dynamics causal impact;
- migration proof;
- crystal readiness;
- storage state;
- hexagram-code asset.

## 04. Output Protocol

Output:

```text
ChangeExperiencePresentation
```

Audience:

```text
GravityPage
```

Recommended structure:

```text
context
  pressure
  situation

recognition
  oldReaction
  protectionMeaning

revision
  newResponse
  transformationMoment

meaning
  growthMeaning
  crystalImprint

visual
  starbeast
  trace
```

### A. `context`

Answers:

```text
What pressure is entering, and where is the user now?
```

Preferred source:

- `ChangeExperienceUnit.context.pressureContext`;
- `ChangeExperienceUnit.context.currentSituation`.

Runtime may supplement with current-round orientation if the product field is missing or too generic.

### B. `recognition`

Answers:

```text
What old response is running, and why did it once protect the user?
```

Preferred source:

- `ChangeExperienceUnit.recognition.oldReaction`;
- `ChangeExperienceUnit.recognition.protectionMeaning`.

Runtime may supplement with `PersonaTransmissionExperienceModel.recognition.insightLine`.

Raw runtime terms must not appear.

### C. `revision`

Answers:

```text
What new response is the user choosing, and what moved?
```

Preferred source:

- `ChangeExperienceUnit.revision.newResponse`;
- `ChangeExperienceUnit.revision.transformationMoment`.

Runtime may supplement with `PersonaTransmissionExperienceModel.revision.microActionLine`.

### D. `meaning`

Answers:

```text
What value did this movement create, and what imprint did it leave?
```

Preferred source:

- `ChangeExperienceUnit.meaning.growthMeaning`;
- `ChangeExperienceUnit.meaning.crystalImprint`.

`PersonaTransmissionExperienceModel` must not invent `growthMeaning`.

### E. `visual`

Answers:

```text
How should starbeast and trace material support the experience?
```

Preferred source:

- `PersonaTransmissionExperienceModel.starbeast`;
- `PersonaTransmissionExperienceModel.trace`.

`ChangeExperienceUnit` may guide the meaning of the visual layer, but it should not become animation parameters.

## 05. Field Priority

If fields overlap or conflict, priority is:

### User Experience Meaning

Use:

```text
ChangeExperienceUnit
```

for:

- pressure context;
- current situation;
- old reaction;
- protection meaning;
- new response;
- transformation moment;
- growth meaning;
- crystal imprint.

### Runtime State And Visual Trace

Use:

```text
PersonaTransmissionExperienceModel
```

for:

- runtime orientation supplement;
- starbeast cue;
- trace flags;
- current runtime identity;
- current runtime dimension and yao stage.

### Forbidden Priority

Never prefer raw runtime or engine language over user experience language.

Forbidden examples:

- `inertiaSignal`;
- `pressureReading`;
- `antiInstinctHint`;
- `mainCut`;
- `cutPotential`;
- `interventionPotential`;
- `deflectionVector`;
- `readiness`;
- `crystallized`;
- `hexagramCode`;
- `storage`.

## 06. Boundary Diagram

The intended chain is:

```text
PersonaTransmissionRuntime
↓
PersonaTransmissionExperienceModel

+

ChangeExperienceUnit
↓
ChangeExperiencePresentationAdapter
↓
GravityPage
```

Expanded product chain:

```text
PersonaTransmission
↓
PersonaTransmissionExperienceModel
        +
ChangeExperienceUnit
↓
ChangeExperiencePresentationAdapter
↓
GravityPage
↓
Transformation Moment
↓
CrystalState
↓
Hexagram Crystal
```

## 07. 1.0 Boundary

For Guanyao 1.0, the adapter may support:

- one current-round `PersonaTransmissionExperienceModel`;
- one matching `ChangeExperienceUnit`;
- one page-consumable presentation object;
- action-five-awareness fixture validation.

It must not support yet:

- multi-unit simultaneous presentation;
- long-term user history;
- 36-unit production library;
- storage;
- 384 yao direction;
- AI chat;
- social graph;
- pet growth.

## 08. Implementation Rule

Future implementation must follow this order:

```text
Protocol
↓
Type Contract
↓
Fixture
↓
Validator
↓
Gate
↓
GravityPage consumption
```

No `GravityPage` integration should happen before:

- adapter input is typed;
- adapter output is typed;
- action-five fixture passes;
- boundary validator blocks raw engine and crystal-state fields.

## 09. Final Lock

`ChangeExperiencePresentationAdapter` is a bridge.

It is not the cause of change.

It is not the proof of change.

It is not the crystal.

It only prepares the user's current self-change experience for presentation.
