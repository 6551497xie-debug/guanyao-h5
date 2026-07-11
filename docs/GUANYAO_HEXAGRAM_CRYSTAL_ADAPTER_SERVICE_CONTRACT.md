# GUANYAO Hexagram Crystal Adapter Service Contract

## 00. Document Position

This document defines the future service contract for:

```text
HexagramCrystalAdapterService
```

It specifies how:

```text
currentCrystalEndState
↓
HexagramCrystalAdapterService
↓
HexagramCrystalInput
```

should be understood in Guanyao 1.0.

It is a contract design document only.

It does not modify:

- `src`;
- runtime;
- services implementation;
- storage;
- routes;
- `GravityPage`;
- `currentCrystalEndState`;
- Crystal Engine;
- existing 64 hexagram-code generation;
- 384 yao;
- old R8.

It extends:

- `GUANYAO_HEXAGRAM_CRYSTAL_ADAPTER_PROTOCOL.md`
- `GUANYAO_CRYSTAL_STATE_MAPPING_PROTOCOL.md`
- `GUANYAO_HEXAGRAM_CRYSTAL_MIGRATION_CAUSAL_PROTOCOL.md`
- `GUANYAO_PERSONA_MIGRATION_IMPACT_PROTOCOL.md`
- `GUANYAO_PERSONA_BEHAVIOR_DYNAMICS_CORE_V1.md`

## 01. Service Position

`HexagramCrystalAdapterService` is not:

- a hexagram generator;
- a hexagram calculator;
- a pressure analysis service;
- a persona analysis service;
- a card generator;
- a storage writer;
- a Personality Ring writer;
- a route controller;
- a frontend component;
- a Crystal Engine implementation;
- a 384 yao bridge;
- an old R8 adapter.

Its only responsibility is:

```text
CRYSTALLIZED currentCrystalEndState
↓
HexagramCrystalInput
```

In product language:

```text
已完成的本局结晶
↓
64 卦码结晶层可消费的安全输入
```

The service answers:

```text
Can this crystallized current-round state enter the 64 hexagram-code crystal layer?
```

It does not answer:

```text
Which card should be rendered?
```

That remains outside this service.

## 02. Complete Chain

The locked upstream and downstream chain is:

```text
currentHexagramProfile
↓
six-dimension / six-yao migration
↓
PersonaMigrationImpact
↓
CrystalState
↓
currentCrystalEndState
↓
HexagramCrystalAdapterService
↓
HexagramCrystalInput
↓
Hexagram Engine
↓
64 hexagram-code crystal
```

Chinese product chain:

```text
本局卦象定位
↓
六维六爻人格迁移
↓
人格迁移影响
↓
本局结晶状态
↓
本局结晶
↓
卦码结晶输入适配
↓
64 卦码结晶
```

No 1.0 production path should skip:

```text
currentCrystalEndState
```

and pass directly from:

```text
CrystalState
```

to:

```text
64 hexagram-code crystal
```

## 03. Input Contract

The future input contract should be:

```ts
type HexagramCrystalAdapterInput = {
  currentCrystalEndState?: CurrentCrystalEndStateLike | null;
  source: "runtime" | "fixture" | "fallback";
};
```

This is a design contract only.

It is not implemented in this knife.

### 3.1 `currentCrystalEndState`

Role:

```text
Provides the materialized current-round crystal.
```

It is allowed only when:

```text
currentCrystalEndState.source = "dynamics"
currentCrystalEndState.status = "CRYSTALLIZED"
```

It may contain:

- mother source;
- pressure source;
- current-round hexagram;
- six-dimension completion trace;
- crystal title;
- crystal copy.

It must not be:

- raw `currentHexagramProfile`;
- raw `CrystalState`;
- raw `PersonaMigrationImpact`;
- raw `YaoTransmissionProfile`;
- an archive record;
- an old R8 asset;
- a 384 yao object.

### 3.2 `source`

Allowed:

```text
runtime
fixture
fallback
```

Meaning:

- `runtime`: real current-round adapter input;
- `fixture`: static validation sample;
- `fallback`: incomplete context.

`source` must not weaken the crystallization rule.

Fixture input still must require:

```text
currentCrystalEndState.status = CRYSTALLIZED
```

## 04. Output Contract

The future output contract should be:

```ts
type HexagramCrystalAdapterResult =
  | HexagramCrystalAdapterSuccess
  | HexagramCrystalAdapterNotReady;
```

### 4.1 Success

```ts
type HexagramCrystalAdapterSuccess = {
  status: "READY";
  input: HexagramCrystalInput;
};
```

Meaning:

```text
The service produced a valid HexagramCrystalInput.
```

This does not mean:

```text
The Hexagram Engine has already generated the final visible asset.
```

It only means the input is safe for the next layer.

### 4.2 Not Ready

```ts
type HexagramCrystalAdapterNotReady = {
  status: "NOT_READY";
  reason: HexagramCrystalAdapterNotReadyReason;
};
```

Meaning:

```text
The current state cannot enter the 64 hexagram-code crystal layer.
```

Recommended reasons:

- `CURRENT_CRYSTAL_END_STATE_MISSING`
- `CURRENT_CRYSTAL_END_STATE_NOT_CRYSTALLIZED`
- `HEXAGRAM_STRUCTURE_MISSING`
- `MOVEMENT_TRACE_MISSING`
- `BOUNDARY_VIOLATION`

The service should fail closed.

It must never create a default 64 hexagram-code input to fill missing context.

## 05. Internal Responsibilities

The service should perform five small checks.

### 1. Source Check

Confirm:

```text
currentCrystalEndState exists
currentCrystalEndState.source = dynamics
```

If missing:

```text
NOT_READY / CURRENT_CRYSTAL_END_STATE_MISSING
```

### 2. Crystallization Check

Confirm:

```text
currentCrystalEndState.status = CRYSTALLIZED
```

If not:

```text
NOT_READY / CURRENT_CRYSTAL_END_STATE_NOT_CRYSTALLIZED
```

### 3. Structure Extraction

Extract:

- lower trigram;
- upper trigram;
- hexagram code;
- hexagram name;
- hexagram title.

If structure cannot be read:

```text
NOT_READY / HEXAGRAM_STRUCTURE_MISSING
```

### 4. Movement Trace Extraction

Extract:

- crystal meaning;
- migration trace;
- dominant shift when available;
- ring deposit meaning when available.

If no current-round movement can be expressed:

```text
NOT_READY / MOVEMENT_TRACE_MISSING
```

### 5. Guardrail Assembly

Attach guardrails:

- no storage write;
- no direct hexagram generation;
- no `currentCrystalEndState` mutation;
- no Crystal Engine mutation;
- no collectible asset;
- no score;
- no level;
- no growth value;
- no pet growth;
- no 384 yao;
- no archive;
- no old R8.

If guardrails cannot be preserved:

```text
NOT_READY / BOUNDARY_VIOLATION
```

## 06. What The Service Must Not Do

`HexagramCrystalAdapterService` must not:

- generate or change hexagram code;
- mutate `currentCrystalEndState`;
- call Crystal Engine;
- render card UI;
- write storage;
- write Personality Ring Lite;
- infer persona movement from raw pressure alone;
- expose 64 hexagram-code asset before `CRYSTALLIZED`;
- create long-term user history;
- add scoring, levels, growth, or pet state;
- call archive / old R8 / 384 yao systems.

## 07. Relationship To Existing Types

The existing type:

```text
HexagramCrystalInput
```

is the target output shape.

The service should not invent a second shape.

It should map from crystallized state into:

```text
sourceCrystal
sourceHexagram
migrationTrace
dominantShift
crystalMeaning
readiness
source
guardrails
```

The readiness must be:

```text
READY_FOR_HEXAGRAM_CRYSTAL
```

only after the crystallized boundary is satisfied.

## 08. Relationship To CrystalEndStateAdapterService

`CrystalEndStateAdapterService` handles:

```text
CrystalState
↓
currentCrystalEndState boundary
```

`HexagramCrystalAdapterService` handles:

```text
currentCrystalEndState
↓
HexagramCrystalInput
```

They are consecutive, not interchangeable.

`HexagramCrystalAdapterService` must not accept raw `CrystalState`.

## 09. Relationship To Hexagram Engine

The Hexagram Engine may later consume:

```text
HexagramCrystalInput
```

But the adapter service must not:

- trigger the engine;
- generate the card;
- decide card layout;
- decide card visuals;
- write the final asset.

The adapter only prepares a safe input.

## 10. Fixture Requirement

Before runtime consumption, the service should be proven through a fixture.

Required fixture:

```text
action-five-awareness
```

Expected success:

```text
currentCrystalEndState = CRYSTALLIZED
↓
HexagramCrystalInput.readiness = READY_FOR_HEXAGRAM_CRYSTAL
```

Expected not-ready cases:

- missing `currentCrystalEndState`;
- status not `CRYSTALLIZED`;
- missing hexagram structure;
- missing movement trace;
- boundary violation.

## 11. 1.0 Boundary

1.0 may include:

- typed adapter input;
- fixture validation;
- service skeleton;
- pipeline gate;
- later GravityPage consumption.

1.0 must not include:

- new 64 hexagram generator;
- storage schema change;
- full 36 production library;
- 384 yao;
- old R8;
- archive;
- collectible asset system;
- long-term behavior tracking;
- score;
- level;
- pet growth.

## 12. Future Engineering Route

Recommended future order:

```text
service contract
↓
service skeleton
↓
fixture mapping
↓
pipeline gate
↓
GravityPage consumption
↓
card visual refinement
```

Do not jump directly from contract to UI.

The service should be independently checked before it enters production flow.

## 13. Locked Service Formula

The service formula is:

```text
if currentCrystalEndState exists
and currentCrystalEndState.source = dynamics
and currentCrystalEndState.status = CRYSTALLIZED
and hexagram structure exists
and movement trace exists
then HexagramCrystalInput READY_FOR_HEXAGRAM_CRYSTAL
else NOT_READY
```

Chinese formula:

```text
如果本局结晶已经完成
并且它来自真实 dynamics 链路
并且保留了本局卦象结构
并且保留了人格迁移痕迹
则可以进入 64 卦码结晶输入层
否则保持未就绪
```
