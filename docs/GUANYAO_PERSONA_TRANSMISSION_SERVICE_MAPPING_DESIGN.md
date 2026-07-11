# GUANYAO Persona Transmission Service Mapping Design

## 00. Document Position

This document defines the future service architecture for:

```text
YaoTransmissionProfile
↓
PersonaTransmissionMappingService
↓
PersonaTransmissionRuntimeUnit
```

It is an architecture design document.

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

- a service implementation;
- a runtime implementation;
- a storage schema;
- an AI prompt;
- a 36-unit production database;
- a frontend component plan.

## 01. Service Responsibility

The future independent responsibility should be:

```text
PersonaTransmissionMappingService
```

It is not responsible for:

- calculating personality;
- generating pressure seeds;
- creating mother codes;
- creating current hexagram profiles;
- managing users;
- writing storage;
- handling history;
- deciding routes;
- rendering UI.

It is only responsible for:

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

The service receives persona-dynamics calculation material.

It returns a user-experience-ready runtime unit.

## 02. Full Pipeline

The complete pipeline should be:

```text
pressureSeed
↓
motherCodeProfile
↓
currentHexagramProfile
↓
YaoTransmissionProfile
↓
PersonaTransmissionMappingService
↓
PersonaTransmissionRuntimeUnit
↓
Mapping Validator
↓
GravityPage consumption
↓
current-round revision action
↓
currentCrystalEndState
↓
personalityRingLite
```

Important boundary:

`PersonaTransmissionMappingService` sits after the engine calculation and before frontend experience.

It must not replace the engine.

It must not replace `GravityPage`.

It must not write storage.

## 03. Service Input

The minimal service input should include:

```ts
type PersonaTransmissionMappingInput = {
  pressureSeed?: string;
  pressureField?: string;
  motherCodeName?: string;
  motherCodeInfluence?: string;
  currentHexagramName?: string;
  currentHexagramProfile?: string;
  yaoTransmissionProfile: YaoTransmissionProfile;
  source: "runtime" | "fixture" | "fallback";
};
```

This is a design shape only.

It is not a TypeScript contract in this knife.

### Input Sources

| Input | Source role |
| --- | --- |
| `pressureSeed` | Reality pressure text or summary. |
| `pressureField` | Current pressure domain or inferred field. |
| `motherCodeName` | Display-safe mother-code reference. |
| `motherCodeInfluence` | Mother-code influence translated away from labels. |
| `currentHexagramName` | Display-safe current-round hexagram name. |
| `currentHexagramProfile` | Current-round orientation, not final asset. |
| `yaoTransmissionProfile` | Engine calculation output. |
| `source` | Runtime source guard: runtime, fixture, or fallback. |

## 04. Service Output

The output must be:

```text
PersonaTransmissionRuntimeUnit
```

With the Type Contract shape:

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

The output must be ready for frontend consumption only after validator pass.

It must not expose raw engine language.

## 05. Internal Service Steps

The mapping service should use six internal steps.

### Step 1: Normalize Input

Goal:

```text
Collect current-round context into a stable mapping input.
```

Checks:

- pressure exists or fallback is explicit;
- mother-code influence is safe to use;
- current hexagram profile is treated as orientation, not final card;
- `YaoTransmissionProfile` exists;
- source is known.

### Step 2: Determine Runtime Identity

Goal:

```text
dimension + yaoStage → identity.unitId
```

Examples:

```text
action + awareness → action-five-awareness
body + takeover → body-second-takeover
thought + explain → thought-three-explain
```

Rules:

- `identity.unitId` is not a storage id;
- it is not shown to users;
- it is only stable enough for current-round reference.

### Step 3: Translate Old Model

Goal:

```text
engine inertia
↓
old protection model
```

Bad:

```text
action bias activated
control personality
avoidant model detected
```

Good:

```text
The user creates temporary safety by moving quickly before uncertainty becomes visible.
```

The output feeds:

- `oldModel`
- `inertiaPattern`

### Step 4: Translate User Insight

Goal:

```text
old model
↓
recognizable user language
```

Example:

```text
You have learned to use action to feel that things are still within reach.
```

The output feeds:

- `insight`

Rules:

- no raw engine terms;
- no diagnosis;
- no personality labels;
- no system-report tone.

### Step 5: Translate Revision

Goal:

```text
antiInstinctHint + mainCut + interventionPotential + userAgency
↓
revisionDirection + microAction
```

Example:

```text
revisionDirection:
  From immediate action to conscious action.

microAction:
  Before acting next time, first name the real problem you are trying to solve.
```

Rules:

- micro action must be small;
- not a task;
- not a check-in;
- not a long-term habit program;
- not a choice game.

### Step 6: Translate Trace and Beast Cue

Goal:

```text
model movement
↓
beastCue + crystalTrace
```

Example:

```text
beastCue:
  The starbeast shifts from rushing ahead to holding direction.

crystalTrace:
  This round records a movement from using action to reduce uncertainty toward judging before acting.
```

Rules:

- `beastCue` is not animation config;
- `crystalTrace` is not reward text;
- neither creates storage by itself.

## 06. Validator Position

The mapping service must run before validation.

The validator must run before `GravityPage` consumption.

Pipeline:

```text
YaoTransmissionProfile
↓
PersonaTransmissionMappingService
↓
PersonaTransmissionMappingValidator
↓
PersonaTransmissionRuntimeUnit accepted for experience
```

Validator outcomes:

- `PASS`: ready for current-round experience;
- `NEEDS_TRANSLATION`: useful material exists but not user-ready;
- `NOT_READY`: unsafe or incomplete.

If validation is not `PASS`, `GravityPage` must not treat the unit as complete.

## 07. Fallback Policy

If the service cannot create a complete unit:

Do not fabricate:

- `insight`;
- `microAction`;
- `beastCue`;
- `crystalTrace`;
- 64 hexagram-code crystal.

Return a fallback state:

```text
PersonaTransmissionRuntimeUnit is not ready.
```

Chinese product direction:

```text
这一局还没有形成完整的人格动力单元。
```

Fallback must preserve:

- no fake insight;
- no fake revision action;
- no fake crystal trace;
- no fake personality-ring state.

## 08. Service Boundary With Existing Systems

### With YaoTransmissionProfile

`YaoTransmissionProfile` calculates persona-dynamics material.

`PersonaTransmissionMappingService` translates it.

Do not merge them.

### With GravityPage

`GravityPage` should eventually consume:

- `insight`;
- `microAction`;
- `beastCue`;
- `crystalTrace`;
- validation state.

It should not directly consume:

- `inertiaSignal`;
- `pressureReading`;
- `antiInstinctHint`;
- `mainCut`;
- `cutPotential`;
- `interventionPotential`.

### With Storage

The mapping service must not write storage.

It may prepare current-round experience material only.

### With Current Crystal

`currentCrystalEndState` remains the crystal generation boundary.

The mapping service may prepare `crystalTrace`.

It must not create final crystal state by itself.

### With Personality Ring Lite

The mapping service may describe the trace that could later be deposited.

It must not write to `personalityRingLite`.

## 09. Minimal Public API Design

Future service API could be:

```ts
mapYaoTransmissionToRuntimeUnit(input): PersonaTransmissionRuntimeUnit | PersonaTransmissionRuntimeFallback
```

or:

```ts
createPersonaTransmissionRuntimeUnit(input): {
  status: "PASS" | "NEEDS_TRANSLATION" | "NOT_READY";
  unit?: PersonaTransmissionRuntimeUnit;
  reason?: string;
}
```

Design preference:

```text
status + unit + reason
```

Reason:

- explicit fallback;
- safer GravityPage consumption;
- easier validator integration;
- avoids pretending incomplete units are complete.

This is only a service shape design.

It is not implemented in this knife.

## 10. 1.0 Scope

1.0 may support:

- one current-round runtime unit;
- one current-round revision action;
- one current-round beast cue;
- one current-round crystal trace;
- fixture-driven validation;
- no persistence.

1.0 must not support:

- full 36 production database;
- multi-unit experience;
- long-term personality tracking;
- storage writes;
- social system;
- chat;
- pet growth;
- 384 yao direction;
- archive;
- yao-device;
- old R8.

## 11. Implementation Order

Recommended order:

```text
1. Keep protocol stable
2. Add mapping service type shape
3. Add static fixture validator
4. Add service mapping for one case
5. Add GravityPage read-only consumption
6. Add fallback display
7. Expand mapping cases
```

Do not:

- connect storage first;
- connect AI first;
- connect GravityPage directly to raw engine fields;
- expand to 36 production units before one case passes.

## 12. Acceptance Criteria

A future `PersonaTransmissionMappingService` is acceptable only if:

- it receives engine language;
- it outputs experience language;
- it keeps raw engine fields away from frontend;
- it creates no storage writes;
- it preserves 1.0 guardrails;
- it produces explicit fallback when incomplete;
- it passes the mapping validator;
- it can explain why the unit was hit;
- it can explain what the user recognizes;
- it can explain what micro action is possible;
- it can explain what trace remains.

## 13. Engineering Boundary

This document does not:

- modify code;
- create a service;
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

