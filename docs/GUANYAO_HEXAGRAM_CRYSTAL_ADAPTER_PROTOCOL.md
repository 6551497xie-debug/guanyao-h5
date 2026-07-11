# GUANYAO Hexagram Crystal Adapter Protocol

## 00. Document Position

This protocol defines the boundary between:

```text
CrystalState
↓
HexagramCrystalInput
↓
Hexagram Crystal Engine
↓
64 hexagram-code crystal
```

It focuses on the adapter layer after:

```text
CrystalState
↓
currentCrystalEndState
```

has become ready for frontend materialization.

This document is a product and architecture protocol only.

It does not modify:

- `src`;
- runtime;
- services;
- storage;
- routes;
- `GravityPage`;
- `currentCrystalEndState`;
- Crystal Engine;
- existing 64 hexagram-code generation;
- 384 yao;
- old R8.

It extends:

- `GUANYAO_HEXAGRAM_CRYSTAL_MIGRATION_CAUSAL_PROTOCOL.md`
- `GUANYAO_CRYSTAL_STATE_MAPPING_PROTOCOL.md`
- `GUANYAO_HEXAGRAM_CRYSTAL_MAPPING_PROTOCOL.md`
- `GUANYAO_PERSONA_MIGRATION_IMPACT_PROTOCOL.md`
- `GUANYAO_PERSONA_BEHAVIOR_DYNAMICS_CORE_V1.md`

## 01. Why This Adapter Exists

`currentCrystalEndState` is the frontend materialization boundary.

It answers:

```text
Has this current round become a crystallized state?
```

The 64 hexagram-code crystal is the visible asset boundary.

It answers:

```text
What visible current-round hexagram-code asset can the user claim?
```

These two boundaries must not collapse into one.

If they collapse, the product risks becoming:

```text
currentHexagramProfile
↓
visible card
```

or:

```text
CrystalState READY
↓
asset issued
```

Both are premature.

The adapter exists to make the final boundary explicit:

```text
currentCrystalEndState must be crystallized
before it can become HexagramCrystalInput.
```

## 02. Core Definition

`HexagramCrystalInput` is not:

- a new hexagram generator;
- a new storage model;
- a card component;
- a user profile;
- a score;
- a collectible asset object;
- a 384 yao entry;
- an old R8 bridge.

It is:

> the minimum safe input that a crystallized current-round state can provide to the 64 hexagram-code crystal layer.

In Chinese product language:

> HexagramCrystalInput 是本局结晶状态进入 64 卦码结晶层前的安全适配输入。

It sits between:

```text
currentCrystalEndState
```

and:

```text
64 卦码结晶
```

## 03. Required Upstream Conditions

The adapter can only run after all upstream conditions are satisfied:

```text
currentHexagramProfile exists
PersonaMigrationImpact exists and is ready
CrystalState = READY_TO_CRYSTALLIZE
CrystalEndStateAdapterService = READY_FOR_CURRENT_CRYSTAL_END_STATE
currentCrystalEndState = CRYSTALLIZED
```

The adapter must not run when:

- `currentHexagramProfile` is only an orientation;
- `CrystalState` is `NOT_READY`;
- `CrystalState` is only `READY_TO_CRYSTALLIZE` but not materialized;
- the current-session revision action is not confirmed;
- `currentCrystalEndState` is missing;
- `currentCrystalEndState.status !== CRYSTALLIZED`.

## 04. HexagramCrystalInput Minimum Shape

The adapter should produce a minimum semantic input:

```text
HexagramCrystalInput

source
structure
movement
crystal
assetBoundary
ringBoundary
guardrails
```

### `source`

Where the input came from.

Allowed 1.0 source:

```text
currentCrystalEndState
```

It must not come directly from:

- `currentHexagramProfile`;
- raw `CrystalState`;
- raw `PersonaMigrationImpact`;
- raw `YaoTransmissionProfile`;
- old R8;
- archive;
- 384 yao.

### `structure`

The current-round hexagram structure.

It may include:

- lower trigram;
- upper trigram;
- hexagram code;
- hexagram name;
- hexagram title;
- mother-code source;
- pressure source.

It answers:

```text
Which current-round hexagram structure is being crystallized?
```

### `movement`

The current-round persona movement.

It may include:

- dominant persona migration impact;
- old model departed from;
- new response confirmed;
- deflection meaning;
- starbeast impact;
- crystal imprint.

It answers:

```text
What changed inside this structure?
```

If no movement exists, the adapter must not produce a final crystal input.

### `crystal`

The crystallized current-round meaning.

It may include:

- title;
- current-round crystal copy;
- asset-facing meaning;
- ring-facing meaning.

It answers:

```text
What did this round become after the user moved one response?
```

### `assetBoundary`

The visible 64 hexagram-code asset boundary.

Allowed only when:

```text
currentCrystalEndState.status = CRYSTALLIZED
```

Before this:

- do not show "64 hexagram-code asset completed";
- do not show "hexagram-code card generated";
- do not allow final asset claim.

### `ringBoundary`

The Personality Ring Lite deposit boundary.

Allowed only after:

```text
64 hexagram-code crystal is formed
```

It must deposit:

```text
the trace of a crystallized persona movement
```

not:

- raw engine output;
- a task result;
- a score;
- a collectible record.

### `guardrails`

The adapter must preserve:

- no storage schema change;
- no direct 64 hexagram regeneration;
- no mutation of `currentCrystalEndState`;
- no Crystal Engine mutation;
- no 384 yao;
- no old R8;
- no archive;
- no collectible asset system;
- no score;
- no level;
- no pet growth.

## 05. Adapter Rule

The locked rule is:

```text
if currentCrystalEndState.status = CRYSTALLIZED
and currentCrystalEndState.source = dynamics
then HexagramCrystalInput may be created
```

Otherwise:

```text
HexagramCrystalInput = NOT_READY
```

The adapter must not infer crystallization from:

- six dimensions completed alone;
- `READY_TO_CRYSTALLIZE` alone;
- a visible revision action alone;
- a raw hexagram code alone;
- the existence of a pressure seed alone.

## 06. Relationship To CrystalState

`CrystalState` decides whether structure and movement are ready to crystallize.

`currentCrystalEndState` materializes that readiness.

`HexagramCrystalInput` adapts the materialized state for the 64 hexagram-code crystal layer.

They are three distinct boundaries:

```text
CrystalState
  semantic readiness

currentCrystalEndState
  crystallized materialization

HexagramCrystalInput
  final asset input
```

`CrystalState` must not be passed directly into the visible 64 hexagram-code asset layer.

## 07. Relationship To Existing 1.0 Implementation

Current 1.0 production may keep `currentCrystalEndState` lightweight.

The adapter protocol does not require changing the existing object.

It only requires that future 64 hexagram-code crystal generation treat:

```text
currentCrystalEndState.status = CRYSTALLIZED
```

as the minimum entry condition.

In 1.0, the existing visible card can continue to read:

- mother;
- pressure;
- hexagram;
- transmission;
- crystal copy.

Future implementation may add `HexagramCrystalInput` as a typed adapter without changing storage.

## 08. User-Facing Language Boundary

Before `HexagramCrystalInput` exists:

Allowed:

- 本局正在结晶;
- 本局具备结晶条件;
- 这一局正在形成可保存的痕迹.

Forbidden:

- 64 卦码资产已完成;
- 卦码卡已生成;
- 本局卦码已经发放.

After `HexagramCrystalInput` exists and the crystal layer completes:

Allowed:

- 本局卦码结晶;
- 64 卦码资产;
- 认领这一局留下的卦码;
- 保存入人格年轮 Lite.

## 09. Failure States

The adapter should fail closed.

Recommended failure meanings:

### `CURRENT_CRYSTAL_END_STATE_MISSING`

No crystallized current-round state exists.

### `CURRENT_CRYSTAL_END_STATE_NOT_CRYSTALLIZED`

The state exists but is not finalized.

### `HEXAGRAM_STRUCTURE_MISSING`

The crystal cannot identify its current-round hexagram structure.

### `MOVEMENT_TRACE_MISSING`

The crystal cannot identify what moved.

### `BOUNDARY_VIOLATION`

The input attempts to expose asset, ring deposit, storage, 384, archive, old R8, score, level, or growth semantics too early.

## 10. 1.0 / 1.1 / 2.0 Boundary

### 1.0

Can contain:

- `currentCrystalEndState`;
- a lightweight adapter boundary;
- 64 hexagram-code crystal display;
- Personality Ring Lite deposit after crystallization.

Must not contain:

- full 36 production database;
- 384 yao;
- old R8;
- archive;
- collectible asset system;
- long-term behavior tracking;
- score;
- level;
- pet growth.

### 1.1

May consider:

- typed `HexagramCrystalInput`;
- richer migration imprint;
- starbeast impact inside the final card;
- multi-round trace comparison.

### 2.0

May consider:

- full persona migration impact library;
- 384 yao direction system;
- dynamic starbeast lifeform system;
- long-term persona evolution map.

## 11. Engineering Evolution Route

Recommended future order:

```text
protocol
↓
type contract
↓
fixture
↓
adapter service
↓
pipeline gate
↓
GravityPage consumption
↓
visual card refinement
```

Do not skip directly from protocol to UI.

The adapter should be proven with a fixture before it is consumed by `GravityPage`.

## 12. Final Locked Chain

The complete 1.0 causal chain is:

```text
Mother-code base
↓
Pressure seed
↓
currentHexagramProfile
↓
PersonaTransmissionRuntimeUnit
↓
PersonaMigrationImpact
↓
CrystalState
↓
currentCrystalEndState
↓
HexagramCrystalInput
↓
64 hexagram-code crystal
↓
Personality Ring Lite
```

Chinese product chain:

```text
母码底盘
↓
压力种子
↓
本局卦象定位
↓
人格迁移单元
↓
人格迁移影响
↓
本局结晶状态
↓
本局结晶
↓
64 卦码结晶输入
↓
64 卦码资产
↓
人格年轮 Lite
```

This protocol locks only the final adapter boundary:

```text
currentCrystalEndState
↓
HexagramCrystalInput
↓
64 hexagram-code crystal
```
