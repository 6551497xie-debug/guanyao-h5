# GUANYAO Crystal State Mapping Protocol

## 00. Document Position

This protocol defines how:

```text
currentHexagramProfile
+
PersonaMigrationImpact[]
↓
CrystalState
↓
currentCrystalEndState
↓
64 hexagram-code crystal
```

should be understood in Guanyao 1.0.

It is a product and architecture protocol only.

It does not modify:

- `src`;
- runtime;
- services;
- storage;
- routes;
- `GravityPage`;
- Crystal Engine;
- existing hexagram-code generation;
- 384 yao;
- old R8.

This document extends:

- `GUANYAO_HEXAGRAM_CRYSTAL_MIGRATION_CAUSAL_PROTOCOL.md`
- `GUANYAO_PERSONA_MIGRATION_IMPACT_PROTOCOL.md`
- `GUANYAO_HEXAGRAM_CRYSTAL_MAPPING_PROTOCOL.md`
- `GUANYAO_PERSONA_BEHAVIOR_DYNAMICS_CORE_V1.md`

## 01. Why CrystalState Exists

`currentHexagramProfile` gives the current round its structure.

It answers:

```text
Where am I now?
```

`PersonaMigrationImpact[]` gives the current round its movement.

It answers:

```text
What actually moved in this round?
```

`CrystalState` is the semantic bridge between structure and final asset.

It answers:

```text
Is there enough structure and movement for this round to crystallize?
```

Without `CrystalState`, the chain can collapse into:

```text
currentHexagramProfile
↓
64 hexagram-code card
```

This would make the hexagram-code feel like an early result.

The locked 1.0 chain is:

```text
currentHexagramProfile
+
PersonaMigrationImpact[]
↓
CrystalState
↓
currentCrystalEndState
↓
64 hexagram-code crystal
```

## 02. Core Definition

`CrystalState` is not:

- a visible card;
- a reward;
- a score;
- a personality label;
- a storage record;
- a prediction;
- a legacy 64-hexagram asset package.

It is:

> the current-round crystallization state formed when a hexagram structure receives one or more confirmed persona migration impacts.

In Chinese product language:

> CrystalState 是本局卦象结构承接人格迁移影响后，是否具备结晶条件的中间状态。

It sits between:

```text
本局卦象定位
```

and:

```text
本局卦码结晶
```

## 03. Inputs

### 1. `currentHexagramProfile`

This is the structure source.

It may contain or imply:

- hexagram code;
- hexagram name;
- upper trigram;
- lower trigram;
- current-round position;
- current-round situation.

It must remain:

```text
本局卦象定位
```

It must not become:

- a final result;
- a visible 64 hexagram-code asset;
- a completed crystal;
- an old R8 card.

### 2. `PersonaMigrationImpact[]`

This is the movement source.

Each impact should represent:

- source persona migration event;
- dimension;
- yao stage;
- old model;
- new response;
- deflection vector;
- starbeast impact;
- crystal imprint;
- impact readiness.

Only impacts with:

```text
impactReadiness = READY_FOR_CRYSTAL
```

can enter `CrystalState`.

Impacts with:

```text
impactReadiness = NOT_READY
```

remain pre-crystal movement.

They must not create `currentCrystalEndState`.

## 04. Minimum CrystalState Shape

The TypeScript contract is now represented by `CrystalState`.

This protocol still does not implement mapping logic.

The minimum semantic shape is:

```text
CrystalState

structureSource
impactSources
dominantImpact
readiness
crystalMeaning
assetBoundary
ringDepositMeaning
guardrails
```

### `structureSource`

The current-round hexagram structure.

Source:

```text
currentHexagramProfile
```

It answers:

```text
Which current-round hexagram structure is crystallizing?
```

### `impactSources`

The crystallizable persona migration impacts.

Source:

```text
PersonaMigrationImpact[]
```

Only ready impacts may be included.

### `dominantImpact`

The primary movement that gives this crystal its current-round meaning.

In 1.0, the dominant impact should usually be the single confirmed current-round migration event.

If multiple impacts exist later, the dominant impact must be selected by a separate protocol.

Do not silently average multiple impacts.

### `readiness`

Allowed semantic states:

- `NOT_READY`
- `READY_TO_CRYSTALLIZE`
- `CRYSTALLIZED`

Rules:

- `NOT_READY`: structure is missing, or no ready impact exists.
- `READY_TO_CRYSTALLIZE`: structure exists and at least one ready impact exists.
- `CRYSTALLIZED`: `currentCrystalEndState` has been formed from the ready state.

### `crystalMeaning`

The current-round meaning of the crystal.

It should express:

```text
This round's persona migration inside this hexagram structure.
```

It should not express:

- general personality;
- fate;
- prediction;
- reward;
- system achievement;
- abstract asset value.

### `assetBoundary`

Defines when the user can see or claim a 64 hexagram-code crystal.

The user-facing asset boundary is:

```text
CrystalState = CRYSTALLIZED
```

Before this boundary:

- do not show "64 hexagram-code asset completed";
- do not show "hexagram-code card generated";
- do not treat `currentHexagramProfile` as the final card.

### `ringDepositMeaning`

Defines what can enter Personality Ring Lite.

The ring should receive:

```text
the trace of this round's crystallized persona movement
```

not:

- raw engine data;
- a score;
- a task completion stamp;
- a collectible asset record.

### `guardrails`

CrystalState must preserve:

- no storage schema change without a separate storage protocol;
- no 384 yao;
- no old R8;
- no archive;
- no collectible asset system;
- no score;
- no level;
- no pet growth.

## 05. Mapping Rule

The locked mapping rule is:

```text
if currentHexagramProfile exists
and PersonaMigrationImpact[] contains at least one READY_FOR_CRYSTAL impact
then CrystalState.readiness = READY_TO_CRYSTALLIZE
```

Otherwise:

```text
CrystalState.readiness = NOT_READY
```

When the crystal is materialized:

```text
CrystalState.readiness = CRYSTALLIZED
```

and the frontend may represent it as:

```text
currentCrystalEndState
↓
64 hexagram-code crystal
↓
Personality Ring Lite trace
```

## 06. CrystalState Formation Rule

CrystalState is formed by a pure semantic mapping.

It should not:

- mutate `currentHexagramProfile`;
- mutate `PersonaMigrationImpact`;
- generate a new hexagram;
- write storage;
- call Crystal Engine;
- create `currentCrystalEndState` directly.

The mapping is:

```text
structureSource = currentHexagramProfile ? currentHexagramProfile : null

impactSources = PersonaMigrationImpact[]
  filtered by impactReadiness = READY_FOR_CRYSTAL

dominantImpact = selectDominantImpact(impactSources)

readiness = resolveCrystalReadiness(structureSource, dominantImpact)

crystalMeaning = formCrystalMeaning(structureSource, dominantImpact)

assetBoundary = resolveAssetBoundary(readiness)

ringDepositMeaning = formRingDepositMeaning(dominantImpact)

guardrails = fixed 1.0 boundaries
```

### Structure Rule

If `currentHexagramProfile` is missing:

```text
structureSource = null
readiness = NOT_READY
```

The current round cannot crystallize without a hexagram structure.

This protects the product from:

- generating a crystal from a micro action alone;
- treating persona movement as a free-floating result;
- creating a 64 hexagram-code asset without a current-round position.

### Impact Rule

Only ready impacts enter the state:

```text
impactSources = impacts where impactReadiness = READY_FOR_CRYSTAL
```

Do not include impacts that are:

- only seen but not confirmed;
- missing a micro action;
- missing a crystal imprint;
- marked `NOT_READY`;
- derived only from raw engine language.

### Dominant Impact Rule

In 1.0:

```text
dominantImpact = the single confirmed current-round impact
```

If no ready impact exists:

```text
dominantImpact = null
readiness = NOT_READY
```

If more than one ready impact exists in future:

```text
dominantImpact must be selected explicitly
```

Do not:

- average impacts;
- concatenate all impacts into a report;
- turn impacts into a score;
- choose by array order without a rule.

### Readiness Rule

Readiness must be derived only from structure and movement:

```text
if structureSource exists
and dominantImpact exists
then readiness = READY_TO_CRYSTALLIZE
else readiness = NOT_READY
```

After `currentCrystalEndState` is actually materialized:

```text
readiness = CRYSTALLIZED
```

`READY_TO_CRYSTALLIZE` is not the same as `CRYSTALLIZED`.

It means:

```text
the round has enough structure and movement to form a crystal
```

It does not mean:

```text
the 64 hexagram-code crystal has already been issued
```

### Crystal Meaning Rule

`crystalMeaning` should combine:

```text
current-round hexagram structure
+
dominant persona migration
```

It should answer:

```text
What did this round become after this movement?
```

It should not answer:

- what type of person the user is;
- what will happen in the future;
- whether the user succeeded;
- whether the user earned an asset.

### Asset Boundary Rule

`assetBoundary` should follow readiness:

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

This preserves the difference between:

```text
ready to crystallize
```

and:

```text
visible 64 hexagram-code crystal
```

### Ring Deposit Rule

`ringDepositMeaning` should be formed from:

```text
dominantImpact.crystalImprint
```

It should express:

```text
what this round's migration left behind
```

It should not store:

- raw `PersonaMigrationImpact`;
- raw `currentHexagramProfile`;
- raw engine language;
- a score;
- a long-term profile field.

## 07. Aggregation Rule For PersonaMigrationImpact[]

In 1.0, the expected production shape is:

```text
one current-round PersonaMigrationImpact
```

Therefore the 1.0 aggregation rule is simple:

```text
readyImpact = the confirmed current-round impact
dominantImpact = readyImpact
```

If multiple impacts appear in future versions:

- do not merge them automatically;
- do not turn them into a score;
- do not rank them as achievements;
- do not create a long-term profile;
- do not create a 36-unit report.

Future multi-impact aggregation must define:

- dominant movement;
- supporting movements;
- conflict between impacts;
- crystal imprint priority;
- ring deposit priority.

That belongs to 1.1 / 2.0.

## 08. Mapping Examples

### Example A: Missing Structure

Input:

```text
currentHexagramProfile = null
PersonaMigrationImpact[] = [READY_FOR_CRYSTAL impact]
```

Output:

```text
structureSource = null
impactSources = [impact]
dominantImpact = impact
readiness = NOT_READY
assetBoundary.canCreateCurrentCrystalEndState = false
```

Reason:

The user may have completed a movement, but the current-round hexagram structure is missing.

No 64 hexagram-code crystal may be formed.

### Example B: Missing Ready Impact

Input:

```text
currentHexagramProfile = present
PersonaMigrationImpact[] = []
```

Output:

```text
structureSource = currentHexagramProfile
impactSources = []
dominantImpact = null
readiness = NOT_READY
assetBoundary.canCreateCurrentCrystalEndState = false
```

Reason:

The round has a structure, but no confirmed persona migration movement.

The user is still before crystallization.

### Example C: Ready To Crystallize

Input:

```text
currentHexagramProfile = present
PersonaMigrationImpact[] = [READY_FOR_CRYSTAL action-five-awareness impact]
```

Output:

```text
structureSource = currentHexagramProfile
impactSources = [action-five-awareness impact]
dominantImpact = action-five-awareness impact
readiness = READY_TO_CRYSTALLIZE
assetBoundary.canCreateCurrentCrystalEndState = true
assetBoundary.canExposeHexagramAsset = false
assetBoundary.canDepositToRingLite = false
```

Reason:

The current-round structure and movement are both present.

The round may now enter `currentCrystalEndState`, but the visible asset is not issued until crystallization is materialized.

### Example D: Crystallized

Input:

```text
CrystalState = READY_TO_CRYSTALLIZE
currentCrystalEndState = materialized
```

Output:

```text
readiness = CRYSTALLIZED
assetBoundary.canCreateCurrentCrystalEndState = true
assetBoundary.canExposeHexagramAsset = true
assetBoundary.canDepositToRingLite = true
```

Reason:

The round has crossed the frontend materialization boundary.

The user can now recognize the 64 hexagram-code crystal and deposit its trace into Personality Ring Lite.

## 09. Causal Chain

The complete causal chain is:

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
64 hexagram-code crystal
↓
Personality Ring Lite
```

Chinese product chain:

```text
母码底盘
↓
现实压力
↓
本局卦象定位
↓
人格传导单元
↓
人格迁移影响
↓
本局结晶状态
↓
本局卦码结晶
↓
人格年轮留痕
```

## 10. Relationship To currentCrystalEndState

`currentCrystalEndState` is the frontend materialization boundary.

It should represent:

```text
CrystalState after it becomes crystallized.
```

In 1.0, `currentCrystalEndState` may remain lightweight.

It does not need to store:

- full `PersonaMigrationImpact[]`;
- full `CrystalState`;
- long-term model history;
- 36-unit trace;
- 384 yao.

But it should not be semantically treated as valid unless the chain has passed:

```text
currentHexagramProfile
+
ready PersonaMigrationImpact
↓
CrystalState READY_TO_CRYSTALLIZE
```

## 11. User-Facing Semantics

Before CrystalState is ready, allowed language:

- 本局正在显影。
- 这一局还在穿过你。
- 本局正在等待结晶条件。

After CrystalState is ready but before materialization:

- 本局具备进入结晶的条件。
- 这一局的变化，开始结晶。

After CrystalState is crystallized:

- 本局结晶已经形成。
- 认领这一局留下的卦码。
- 保存入人格年轮。

Forbidden before crystallization:

- 64 卦码已经生成。
- 卦码卡已经完成。
- 本局资产已经完成。
- 结果已生成。

## 12. 1.0 Boundary

1.0 can include:

- `currentHexagramProfile`;
- one confirmed `PersonaMigrationImpact`;
- `CrystalState` as protocol boundary;
- `currentCrystalEndState`;
- 64 hexagram-code crystal;
- Personality Ring Lite trace.

1.0 should not include:

- full multi-impact aggregation;
- full 36 production library;
- long-term model tracking;
- 384 yao;
- old R8;
- archive;
- collectible asset system;
- pet growth;
- score or level.

## 13. Engineering Route

Recommended future implementation order:

1. Keep `PersonaMigrationImpact` type stable.
2. Keep `CrystalState` as a type contract only until mapping implementation is explicitly requested.
3. Build a pure mapping adapter:

```text
currentHexagramProfile + PersonaMigrationImpact[] -> CrystalState
```

4. Keep `currentCrystalEndState` as the frontend materialization boundary.
5. Do not write storage until a separate storage protocol exists.
6. Do not modify existing hexagram-code generation without a separate engine change request.

## 14. Summary

`currentHexagramProfile` gives the crystal its structure.

`PersonaMigrationImpact[]` gives the crystal its movement.

`CrystalState` decides whether structure and movement are ready to crystallize.

`currentCrystalEndState` materializes that readiness for the frontend.

The 64 hexagram-code crystal is therefore not an early result.

It is:

> the current-round persona movement crystallized inside the current-round hexagram structure.

Chinese lock:

> 本局卦象给结晶以结构，人格迁移影响给结晶以变化。只有结构与变化同时成立，才进入本局 64 卦码结晶。
