# GUANYAO Crystal Mapping Service Contract

## 00. Document Position

This document defines the future service contract for:

```text
CrystalMappingService
```

It specifies how:

```text
currentHexagramProfile
+
PersonaMigrationImpact[]
↓
CrystalMappingService
↓
CrystalState
```

should be understood in Guanyao 1.0.

It is a contract design document only.

It does not modify:

- `src`;
- runtime;
- services;
- storage;
- routes;
- `GravityPage`;
- Crystal Engine;
- existing 64 hexagram-code generation;
- 384 yao;
- old R8.

It extends:

- `GUANYAO_CRYSTAL_STATE_MAPPING_PROTOCOL.md`
- `GUANYAO_PERSONA_MIGRATION_IMPACT_PROTOCOL.md`
- `GUANYAO_HEXAGRAM_CRYSTAL_MAPPING_PROTOCOL.md`
- `GUANYAO_HEXAGRAM_CRYSTAL_MIGRATION_CAUSAL_PROTOCOL.md`

## 01. Service Position

`CrystalMappingService` is not:

- Crystal Engine;
- 64 hexagram-code generator;
- card asset generator;
- storage writer;
- Personality Ring writer;
- route controller;
- frontend component;
- score calculator;
- growth system;
- old R8 adapter.

Its only responsibility is:

```text
Structure + migration impacts
↓
CrystalState
```

In product language:

```text
本局卦象结构 + 人格迁移影响
↓
本局结晶状态
```

The service answers:

```text
Does this round have enough structure and movement to crystallize?
```

It does not answer:

```text
Which 64 hexagram-code card should be generated?
```

That remains outside this service.

## 02. Input Contract

The future input contract should be:

```ts
type CrystalMappingInput = {
  currentHexagramProfile?: CurrentHexagramProfile | null;
  migrationImpacts: readonly PersonaMigrationImpact[];
  source: "runtime" | "fixture" | "fallback";
};
```

This is a design contract only.

It is not implemented in this knife.

### 2.1 `currentHexagramProfile`

Role:

```text
Provides the current-round hexagram structure.
```

It is:

- current-round orientation;
- structure source;
- "where am I now?"

It is not:

- final crystal;
- 64 hexagram-code asset;
- card object;
- user profile;
- prediction.

If missing:

```text
CrystalState.readiness = NOT_READY
```

### 2.2 `migrationImpacts`

Role:

```text
Provides current-round persona movement.
```

Only impacts with:

```text
impactReadiness = READY_FOR_CRYSTAL
```

may enter `CrystalState.impactSources`.

Impacts with:

```text
impactReadiness = NOT_READY
```

must be ignored for crystallization readiness.

They may still exist as pre-crystal movement, but they must not create `currentCrystalEndState`.

### 2.3 `source`

Allowed:

```text
runtime
fixture
fallback
```

Meaning:

- `runtime`: real current-round mapping;
- `fixture`: static validation sample;
- `fallback`: incomplete context.

`source` must not weaken readiness rules.

Fixture input still must respect the same boundary:

```text
structure + ready impact
```

## 03. Output Contract

The future result contract should be:

```ts
type CrystalMappingResult =
  | CrystalMappingSuccess
  | CrystalMappingNotReady;
```

### 3.1 Success

```ts
type CrystalMappingSuccess = {
  status: "PASS";
  crystalState: CrystalState;
};
```

Meaning:

```text
The service produced a valid CrystalState.
```

This does not necessarily mean:

```text
The 64 hexagram-code crystal is visible.
```

A successful result may still contain:

```text
crystalState.readiness = NOT_READY
```

because the service can validly explain why the round is not ready.

### 3.2 Not Ready

```ts
type CrystalMappingNotReady = {
  status: "NOT_READY";
  reason: string;
  crystalState?: CrystalState;
};
```

Meaning:

```text
The service cannot produce a complete CrystalState from the current inputs.
```

Allowed reasons:

- `CURRENT_HEXAGRAM_PROFILE_MISSING`
- `READY_MIGRATION_IMPACT_MISSING`
- `DOMINANT_IMPACT_UNRESOLVED`
- `RAW_ENGINE_LANGUAGE_DETECTED`
- `BOUNDARY_VIOLATION`

Failure must not become:

- fallback crystal;
- fake result;
- default 64 hexagram-code asset;
- storage write;
- UI success state.

## 04. Internal Responsibilities

`CrystalMappingService` should perform five internal steps.

### Step 1: Resolve Structure Source

Input:

```text
currentHexagramProfile
```

Output:

```text
CrystalState.structureSource
```

Rules:

- present profile becomes `structureSource`;
- missing profile makes readiness `NOT_READY`;
- the service must not create a new hexagram profile.

### Step 2: Filter Ready Impacts

Input:

```text
PersonaMigrationImpact[]
```

Output:

```text
CrystalState.impactSources
```

Rules:

- include only `READY_FOR_CRYSTAL`;
- exclude `NOT_READY`;
- do not mutate impacts;
- do not infer readiness from raw engine text.

### Step 3: Resolve Dominant Impact

Input:

```text
impactSources
```

Output:

```text
CrystalState.dominantImpact
```

1.0 rule:

```text
dominantImpact = the single confirmed ready impact
```

If there are no ready impacts:

```text
dominantImpact = null
```

If there are multiple ready impacts:

```text
return NOT_READY / DOMINANT_IMPACT_UNRESOLVED
```

until a separate multi-impact protocol exists.

Do not:

- average impacts;
- concatenate them;
- rank them;
- turn them into score.

### Step 4: Resolve Readiness And Asset Boundary

Readiness rule:

```text
if structureSource exists
and dominantImpact exists
then readiness = READY_TO_CRYSTALLIZE
else readiness = NOT_READY
```

Boundary rule:

```text
NOT_READY:
  canCreateCurrentCrystalEndState = false
  canExposeHexagramAsset = false
  canDepositToRingLite = false

READY_TO_CRYSTALLIZE:
  canCreateCurrentCrystalEndState = true
  canExposeHexagramAsset = false
  canDepositToRingLite = false

CRYSTALLIZED:
  canCreateCurrentCrystalEndState = true
  canExposeHexagramAsset = true
  canDepositToRingLite = true
```

`CrystalMappingService` may produce `READY_TO_CRYSTALLIZE`.

It must not set `CRYSTALLIZED` unless an explicit materialization boundary is passed by a future contract.

### Step 5: Form Crystal Meaning

Input:

```text
structureSource
+
dominantImpact
```

Output:

```text
CrystalState.crystalMeaning
CrystalState.ringDepositMeaning
```

Rules:

- use current-round structure;
- use persona migration impact;
- use user-understandable language;
- do not expose raw engine language;
- do not say the card has already been generated unless readiness is `CRYSTALLIZED`.

## 05. Guardrails

Every produced `CrystalState` must preserve:

```ts
guardrails: {
  noStorageWrite: true;
  noHexagramGeneration: true;
  noCrystalEngineMutation: true;
  noCollectibleAsset: true;
  noScore: true;
  noLevel: true;
  noGrowthValue: true;
  noPetGrowth: true;
  no384Yao: true;
  noArchive: true;
  noOldR8: true;
}
```

The service may prepare a state.

It must not perform the downstream action.

## 06. Relationship To Crystal Engine

`CrystalMappingService` is upstream of Crystal Engine.

It prepares:

```text
CrystalState
```

It does not produce:

```text
currentCrystalEndState
```

It does not mutate:

```text
Crystal Engine
```

Future route:

```text
CrystalMappingService
↓
CrystalState READY_TO_CRYSTALLIZE
↓
Crystal Engine boundary
↓
currentCrystalEndState
```

The Crystal Engine remains the materialization layer.

## 07. Relationship To 64 Hexagram-Code Asset

`CrystalMappingService` does not generate a 64 hexagram-code asset.

It only allows the chain to know:

```text
whether the round is ready to crystallize.
```

The 64 hexagram-code asset can only be exposed after:

```text
CrystalState.readiness = CRYSTALLIZED
```

Before that, frontend language must not say:

- 64 卦码已经生成;
- 卦码卡已经完成;
- 本局资产已经完成;
- 结果已生成.

## 08. Relationship To Personality Ring Lite

`CrystalMappingService` does not write Personality Ring Lite.

It may prepare:

```text
ringDepositMeaning
```

Actual deposit requires:

```text
CrystalState.readiness = CRYSTALLIZED
```

and remains downstream of the mapping service.

## 09. 1.0 Boundary

1.0 service contract supports:

- one `currentHexagramProfile`;
- zero or one dominant ready impact;
- readiness resolution;
- asset boundary resolution;
- ring deposit meaning;
- guardrails.

1.0 service contract does not support:

- multi-impact aggregation;
- full 36 production mapping;
- storage writes;
- route changes;
- Crystal Engine mutation;
- 64 hexagram-code generation;
- 384 yao;
- old R8;
- archive;
- collectible asset system.

## 10. Implementation Route

Recommended future order:

1. Keep this document as service contract.
2. Add TypeScript input / result contracts only when needed.
3. Add a pure function service:

```text
mapCrystalState(input) -> CrystalMappingResult
```

4. Add fixture validation.
5. Add guard script.
6. Only then consider Crystal Engine boundary integration.

Do not skip directly from protocol to Crystal Engine mutation.

## 11. Summary

`CrystalMappingService` is the translator between:

```text
current-round structure + persona migration movement
```

and:

```text
crystallization readiness.
```

It does not create the crystal.

It decides whether the current round has become ready to form one.

Chinese lock:

> CrystalMappingService 只负责把本局卦象结构与人格迁移影响映射为本局结晶状态。它不生成卦码，不写存储，不接 384，不接旧 R8。
