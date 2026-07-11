# GUANYAO Persona Transmission Service Contract

## 00. Document Position

This document defines the engineering contract for:

```text
PersonaTransmissionMappingService
```

It specifies:

```text
input
↓
processing responsibility
↓
output
↓
failure strategy
```

It is a contract design document.

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

- service implementation;
- runtime implementation;
- storage schema;
- AI chat service;
- frontend component design.

## 01. Service Position

`PersonaTransmissionMappingService` is not:

- a persona calculation engine;
- an AI chat service;
- a copy generator;
- a psychological analysis service;
- a recommendation system;
- a storage writer;
- a route controller;
- a UI renderer.

Its only responsibility is:

```text
Engine Language
↓
Experience Language
```

In concrete terms:

```text
YaoTransmissionProfile
↓
PersonaTransmissionRuntimeUnit
```

The service receives calculated persona-dynamics material and returns a user-experience-ready runtime object, or an explicit failure.

## 02. Input Contract

The future input contract should be:

```ts
type PersonaTransmissionMappingInput = {
  yaoTransmissionProfile?: YaoTransmissionProfile;
  pressureContext: PersonaTransmissionPressureContext;
  currentContext: PersonaTransmissionCurrentContext;
  source: "runtime" | "fixture" | "fallback";
};
```

This is a design contract only.

It is not implemented in this knife.

### 2.1 `YaoTransmissionProfile`

Source:

```text
persona dynamics calculation
```

It may contain:

- `pressureReading`
- `motherCodeInfluence`
- `transmissionReading`
- `inertiaSignal`
- `antiInstinctHint`
- `mainCut`
- `cutPotential`
- `interventionPotential`
- `userAgency`

Role:

```text
Provides engine-side persona dynamics material.
```

Boundary:

- not frontend copy;
- not user-facing language;
- not a `PersonaTransmissionRuntimeUnit`;
- not storage.

### 2.2 Pressure Context

Suggested shape:

```ts
type PersonaTransmissionPressureContext = {
  pressureSeed?: string;
  pressureField?: string;
};
```

Role:

```text
Provides the real-world background for the current round.
```

Rules:

- must describe the pressure as a lived situation;
- must not be converted into a user label;
- may be incomplete, but incomplete input must produce explicit fallback.

### 2.3 Current Context

Suggested shape:

```ts
type PersonaTransmissionCurrentContext = {
  currentHexagramProfile?: string;
  currentHexagramName?: string;
  motherCodeProfile?: string;
  motherCodeName?: string;
  motherCodeInfluence?: string;
};
```

Role:

```text
Explains the current round without pretending the final crystal already exists.
```

Boundary:

- `currentHexagramProfile` is current-round orientation;
- it is not a final 64 hexagram-code card;
- `motherCodeProfile` is original persona base context;
- it is not a personality label.

### 2.4 Source

Allowed:

```text
runtime
fixture
fallback
```

Meaning:

- `runtime`: real current-round mapping;
- `fixture`: static validation sample;
- `fallback`: incomplete context, no complete runtime unit.

## 03. Output Contract

The future result contract should be:

```ts
type PersonaTransmissionMappingResult =
  | PersonaTransmissionMappingSuccess
  | PersonaTransmissionMappingNeedsTranslation
  | PersonaTransmissionMappingFailure;
```

### 3.1 Success

```ts
type PersonaTransmissionMappingSuccess = {
  status: "PASS";
  unit: PersonaTransmissionRuntimeUnit;
};
```

Meaning:

```text
The runtime unit is complete enough for current-round experience.
```

The unit must contain:

- `identity`
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

### 3.2 Needs Translation

```ts
type PersonaTransmissionMappingNeedsTranslation = {
  status: "NEEDS_TRANSLATION";
  reason: string;
  partialUnit?: Partial<PersonaTransmissionRuntimeUnit>;
};
```

Meaning:

```text
The engine material is useful, but not safe for user experience yet.
```

Typical reasons:

- old model still sounds like engine language;
- insight sounds like AI analysis;
- micro action is too broad;
- beast cue is only visual effect;
- crystal trace is too generic.

### 3.3 Failure

```ts
type PersonaTransmissionMappingFailure = {
  status: "NOT_READY";
  reason: string;
};
```

Meaning:

```text
The current context cannot form a complete PersonaTransmissionRuntimeUnit.
```

This is not:

- a failed personality judgment;
- an error about the user;
- a broken product state.

It simply means:

```text
This round has not formed enough persona-dynamics material yet.
```

## 04. Internal Responsibility

`PersonaTransmissionMappingService` has six internal responsibilities.

### 1. Normalize Input

Collect:

- pressure context;
- current context;
- `YaoTransmissionProfile`;
- source.

Fail fast if:

- no pressure context exists;
- no engine material exists;
- source is unknown;
- current context is misleading.

### 2. Determine Hit

Determine:

- `dimension`;
- `yaoStage`;
- `identity.unitId`.

The hit must answer:

```text
Why this persona space?
Why this yao stage?
```

No random selection.

No fixed step disguised as dynamic hit.

### 3. Translate Old Model

Map:

```text
inertiaSignal + transmissionReading
↓
oldModel + inertiaPattern
```

Rules:

- no personality labels;
- no diagnosis;
- no raw engine language;
- no system-report tone.

### 4. Translate User Insight

Map:

```text
oldModel + inertiaPattern
↓
insight
```

The insight must pass:

```text
"This is about me."
```

It should feel like recognition, not judgment.

### 5. Translate Revision

Map:

```text
antiInstinctHint + mainCut + interventionPotential + userAgency
↓
revisionDirection + microAction
```

Rules:

- small;
- concrete;
- current-life executable;
- non-task;
- non-check-in;
- non-score;
- non-habit-program.

### 6. Translate Trace

Map:

```text
model movement
↓
beastCue + crystalTrace
```

Rules:

- `beastCue` describes persona movement, not animation parameters;
- `crystalTrace` describes current-round change, not reward;
- no storage write occurs here.

## 05. Failure Strategy

The service must prefer explicit failure over fake completion.

If mapping is incomplete, return:

```text
NOT_READY
```

or:

```text
NEEDS_TRANSLATION
```

Do not fabricate:

- old model;
- insight;
- micro action;
- beast cue;
- crystal trace;
- 64 hexagram-code crystal;
- personality-ring result.

Failure copy direction:

```text
This round has not yet formed a complete persona transmission unit.
```

Chinese direction:

```text
这一局还没有形成完整的人格动力单元。
```

This line is a fallback direction only.

It is not a required UI copy.

## 06. Validation Boundary

`PersonaTransmissionMappingService` should not be trusted alone.

Its output must pass:

```text
PersonaTransmissionMappingValidator
```

before frontend consumption.

Validation statuses:

- `PASS`
- `NEEDS_TRANSLATION`
- `NOT_READY`

If validator status is not `PASS`, `GravityPage` must not treat the unit as complete.

## 07. Guardrails

Every success result must include:

```text
noStorageWrite: true
noLongTermProfile: true
noRawEngineLanguage: true
no384Yao: true
noArchive: true
```

These guardrails mean:

- the service writes no storage;
- the unit is not a user profile;
- raw engine language cannot reach frontend;
- 384 yao direction is not in 1.0 production;
- archive and old asset systems remain isolated.

## 08. Consumer Contract

Future `GravityPage` should consume:

- `status`;
- `unit.insight`;
- `unit.revisionDirection`;
- `unit.microAction`;
- `unit.beastCue`;
- `unit.crystalTrace`;
- fallback reason when not ready.

Future `GravityPage` should not consume:

- `pressureReading`;
- `inertiaSignal`;
- `antiInstinctHint`;
- `mainCut`;
- `cutPotential`;
- `interventionPotential`;
- `userAgency`.

Raw engine language must stop at the mapping service boundary.

## 09. Non-Responsibilities

`PersonaTransmissionMappingService` must not:

- calculate `YaoTransmissionProfile`;
- mutate `YaoTransmissionProfile`;
- generate pressure seeds;
- generate mother codes;
- generate current hexagram profiles;
- generate `currentCrystalEndState`;
- write `personalityRingLite`;
- route users;
- render UI;
- create chat;
- create storage;
- create 384 yao direction;
- connect archive;
- connect yao-device;
- connect old R8.

## 10. Minimal Implementation Order

Recommended future implementation order:

```text
1. Add TypeScript service contract
2. Add static fixture input
3. Add mapping validator function
4. Add one-case mapping function
5. Add service wrapper
6. Add GravityPage read-only consumption
7. Expand cases
```

Do not:

- connect AI first;
- connect storage first;
- connect GravityPage before fallback is explicit;
- expand to all 36 units before one unit passes.

## 11. Acceptance Criteria

The contract is ready for implementation only if:

- input is clearly separated from output;
- failures are explicit;
- service cannot silently fabricate runtime units;
- validation is required;
- guardrails are mandatory;
- raw engine fields are isolated;
- current-round orientation is not confused with final 64 hexagram-code crystal;
- no storage, archive, old R8, yao-device, or 384 is implied.

## 12. Engineering Boundary

This document does not:

- modify code;
- implement service;
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

