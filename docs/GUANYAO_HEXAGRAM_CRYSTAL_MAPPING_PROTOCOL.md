# GUANYAO Hexagram Crystal Mapping Protocol

## 00. Document Position

This document defines how:

```text
currentHexagramProfile
+
PersonaMigrationImpact
↓
CrystalState
↓
64 hexagram-code crystal
```

should be understood in Guanyao 1.0.

It is a protocol document only.

It does not modify:

- `src`;
- runtime;
- services;
- storage;
- routes;
- `GravityPage`;
- existing hexagram-code generation;
- 384 yao;
- old R8.

This protocol extends:

- `GUANYAO_HEXAGRAM_CRYSTAL_MIGRATION_CAUSAL_PROTOCOL.md`
- `GUANYAO_PERSONA_MIGRATION_IMPACT_PROTOCOL.md`
- `GUANYAO_PERSONA_TRANSMISSION_RUNTIME_SHAPE_PROTOCOL.md`
- `GUANYAO_PERSONA_BEHAVIOR_DYNAMICS_CORE_V1.md`

## 01. Why This Mapping Exists

The current-round hexagram crystal should not be produced from:

```text
currentHexagramProfile
```

alone.

`currentHexagramProfile` answers:

```text
Where am I now?
```

It is the current-round orientation.

It is not the completed asset.

The 64 hexagram-code crystal answers:

```text
What did this round become after the user moved one response?
```

Therefore the crystal needs two inputs:

1. `currentHexagramProfile` for structure;
2. `PersonaMigrationImpact` for movement.

Without the first, there is no current-round hexagram structure.

Without the second, there is no persona movement to crystallize.

## 02. Core Mapping Formula

The locked formula is:

```text
currentHexagramProfile
+
PersonaMigrationImpact
↓
CrystalState
↓
currentCrystalEndState
↓
64 hexagram-code crystal
↓
Personality Ring Lite trace
```

Chinese product formula:

```text
本局卦象
+
人格迁移影响
↓
本局结晶状态
↓
本局卦码结晶
↓
人格年轮留痕
```

## 03. Input One: currentHexagramProfile

`currentHexagramProfile` provides current-round structure.

It contains or implies:

- lower trigram;
- upper trigram;
- hexagram code;
- hexagram name;
- hexagram title;
- current-round orientation.

It answers:

```text
What hexagram structure has this pressure formed with the mother-code base?
```

Product boundary:

`currentHexagramProfile` is allowed before crystallization.

It may support:

- 本局卦象定位;
- current-round place;
- "where am I now?";
- starbeast entering the current round.

It must not be treated as:

- generated card;
- final result;
- current-round crystal;
- 64 hexagram-code asset.

## 04. Input Two: PersonaMigrationImpact

`PersonaMigrationImpact` provides current-round movement.

It contains or implies:

- source persona migration event;
- old model departed from;
- new response confirmed;
- deflection vector;
- starbeast impact;
- crystallizable imprint;
- impact readiness.

It answers:

```text
What moved in the user's persona dynamics during this round?
```

Product boundary:

`PersonaMigrationImpact` can only become crystal input after:

- the active `PersonaTransmissionUnit` exists;
- the user-facing insight has appeared;
- the micro action has been confirmed;
- a crystallizable trace exists.

It must not be generated from a raw old model alone.

Seeing is not enough.

Migration impact requires a confirmed movement.

## 05. CrystalState Definition

`CrystalState` is the semantic state between:

```text
currentHexagramProfile + PersonaMigrationImpact
```

and:

```text
currentCrystalEndState
```

It is not yet a required TypeScript type.

It is the conceptual readiness state of the current-round crystal.

Minimum semantic shape:

```text
CrystalState

structureSource
movementSource
readiness
crystalMeaning
assetBoundary
ringDepositMeaning
```

### `structureSource`

Comes from `currentHexagramProfile`.

It tells the crystal:

```text
which current-round hexagram structure is being crystallized.
```

### `movementSource`

Comes from `PersonaMigrationImpact`.

It tells the crystal:

```text
which persona movement is being crystallized.
```

### `readiness`

Allowed semantic states:

- `NOT_READY`
- `READY_TO_CRYSTALLIZE`
- `CRYSTALLIZED`

Rules:

- `NOT_READY`: structure or movement is missing.
- `READY_TO_CRYSTALLIZE`: structure exists and impact is ready.
- `CRYSTALLIZED`: the current-round crystal has been formed.

### `crystalMeaning`

The current-round meaning of the crystal.

It should describe:

```text
This round's persona movement inside this hexagram structure.
```

It should not describe:

- general personality;
- prediction;
- reward;
- abstract asset value.

### `assetBoundary`

The boundary that allows the crystal to become a visible 64 hexagram-code asset.

It requires:

- current-round hexagram orientation;
- six-dimension / six-yao completion;
- confirmed micro action when available;
- migration impact readiness.

### `ringDepositMeaning`

The meaning that can be saved into Personality Ring Lite.

It should answer:

```text
What trace of this movement remains?
```

## 06. Mapping Rules

### Rule 1: Structure Does Not Equal Crystal

`currentHexagramProfile` alone cannot produce the visible 64 hexagram-code crystal.

It can only produce:

- current position;
- current orientation;
- current-round hexagram field.

### Rule 2: Impact Does Not Replace Structure

`PersonaMigrationImpact` alone cannot produce the visible 64 hexagram-code crystal.

It must be mapped into a current-round hexagram structure.

The impact tells what moved.

The hexagram tells where that movement crystallizes.

### Rule 3: Crystal Requires Both

The 64 hexagram-code crystal is valid only when:

```text
currentHexagramProfile exists
+
PersonaMigrationImpact is READY_FOR_CRYSTAL
```

In current 1.0 code, this may still be represented through:

- `readyToCrystallize`;
- `completedNodeCount`;
- revision action confirmation;
- `currentCrystalEndState`.

This protocol does not require the current object shape to change.

### Rule 4: Crystal Text Must Carry Movement

A crystal should not only say:

```text
This round completed six-dimension transmission.
```

It should eventually be able to say:

```text
This round crystallized a movement from old model to new response.
```

In 1.0, the language can remain light.

The important boundary is causal:

```text
crystal = structure + movement
```

### Rule 5: Ring Deposit Stores Trace, Not Full Event

Personality Ring Lite does not need to store the whole migration impact in 1.0.

It only needs to preserve the trace meaning:

```text
This round left a movement in the user's persona ring.
```

Full event history belongs to 1.1 / 2.0.

## 07. Mapping Example: Action Five Awareness

Input structure:

```text
currentHexagramProfile:
  current-round hexagram orientation under action pressure
```

Input impact:

```text
sourceUnit: action-five-awareness
fromModel: immediate action to recover control
toResponse: confirm the real problem before acting
deflectionVector: from automatic action to conscious action
beastImpact: rushing direction stabilizes
crystalImprint: this round leaves a conscious-action trace
impactReadiness: READY_FOR_CRYSTAL
```

Mapped `CrystalState`:

```text
structureSource:
  current-round hexagram orientation

movementSource:
  action-five-awareness migration impact

readiness:
  READY_TO_CRYSTALLIZE

crystalMeaning:
  this round crystallizes a movement from automatic action to conscious action

assetBoundary:
  may become current-round 64 hexagram-code crystal after confirmation

ringDepositMeaning:
  a trace of conscious action is deposited
```

Frontend expression may remain:

```text
本局结晶已经形成。
认领这一局留下的卦码。
```

But the product meaning underneath is:

```text
This hexagram-code crystal carries both the current hexagram structure and the migration impact.
```

## 08. Relationship To currentCrystalEndState

Current 1.0 implementation may keep `currentCrystalEndState` lightweight.

It currently represents:

- source;
- status;
- mother;
- pressure;
- hexagram;
- transmission;
- crystal copy.

This is acceptable for 1.0 if the causal gate is correct.

Protocol interpretation:

```text
currentCrystalEndState
=
CrystalState materialized for frontend and Personality Ring Lite.
```

Future implementation may add a `migrationImpact` input adapter before `currentCrystalEndState`, but it should not add storage without a separate storage protocol.

## 09. 1.0 Boundary

1.0 can keep:

- current `currentHexagramProfile`;
- current `currentCrystalEndState`;
- current 64 hexagram-code asset language;
- current Personality Ring Lite deposition.

1.0 should conceptually enforce:

- no card before current hexagram orientation;
- no crystal before six-dimension / six-yao completion;
- no crystal before confirmed micro action when a revision action exists;
- no 64 hexagram-code asset without persona movement.

1.0 does not need:

- new storage;
- complete migration history;
- full `PersonaMigrationImpact` runtime object;
- complete 36 production mapping;
- 384 yao.

## 10. Engineering Boundary

This protocol does not require code changes now.

Future implementation order, if needed:

1. Define `PersonaMigrationImpact` type.
2. Map `PersonaTransmissionRuntimeUnit` to `PersonaMigrationImpact`.
3. Validate impact readiness.
4. Feed impact into a crystal-state adapter.
5. Keep `currentCrystalEndState` as the frontend materialization boundary.

Do not implement these steps in this protocol knife.

## 11. Final Lock

The final causal lock is:

```text
currentHexagramProfile gives the crystal its structure.
PersonaMigrationImpact gives the crystal its movement.
Only structure plus movement can become the current-round 64 hexagram-code crystal.
```

Chinese lock:

```text
本局卦象给结晶以结构。
人格迁移影响给结晶以变化。
只有结构与变化合在一起，才构成本局 64 卦码结晶。
```

