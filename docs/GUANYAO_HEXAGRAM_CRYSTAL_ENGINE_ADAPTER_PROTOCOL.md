# GUANYAO Hexagram Crystal Engine Adapter Protocol

## 00. Document Position

This protocol defines the adapter relationship between:

```text
HexagramCrystalInput
↓
Hexagram Crystal Engine
↓
64 hexagram-code crystal
```

It is a product and architecture protocol only.

It does not modify:

- `src`;
- runtime;
- services;
- storage;
- routes;
- `GravityPage`;
- `currentHexagramProfile`;
- `currentCrystalEndState`;
- the existing Hexagram Engine;
- the existing 64 hexagram matrix;
- 384 yao;
- old R8.

It extends:

- `GUANYAO_HEXAGRAM_CRYSTAL_MIGRATION_CAUSAL_PROTOCOL.md`
- `GUANYAO_CRYSTAL_STATE_MAPPING_PROTOCOL.md`
- `GUANYAO_HEXAGRAM_CRYSTAL_ADAPTER_PROTOCOL.md`
- `GUANYAO_HEXAGRAM_CRYSTAL_ADAPTER_SERVICE_CONTRACT.md`
- `GUANYAO_PERSONA_BEHAVIOR_DYNAMICS_CORE_V1.md`

## 01. Hexagram Engine Role

The Hexagram Engine does not create persona change.

It should not decide:

- what old persona model was activated;
- what migration happened;
- what revision action the user confirmed;
- whether the user has changed;
- whether the current round can crystallize.

Those belong upstream:

```text
PersonaTransmissionRuntimeUnit
↓
PersonaMigrationImpact
↓
CrystalState
↓
currentCrystalEndState
↓
HexagramCrystalInput
```

The Hexagram Engine is responsible for:

```text
already-formed persona migration
↓
hexagram-code expression
```

In Chinese product language:

> Hexagram Engine 不生成人格变化，它把已经发生的人格迁移表达为本局卦码结晶。

The role is:

```text id="engine_role"
人格迁移
↓
成卦输入
↓
卦码表达
```

## 02. Why This Adapter Exists

Before this protocol, the system already had:

```text
currentHexagramProfile
```

It can determine:

- `hexagramCode`;
- `hexagramName`;
- `hexagramTitle`.

But `currentHexagramProfile` answers:

```text
Where am I now?
```

It is the current-round orientation.

The final 64 hexagram-code crystal should answer:

```text
What did this round become after persona migration?
```

The adapter exists to prevent the chain from collapsing into:

```text
currentHexagramProfile
↓
visible hexagram-code card
```

or:

```text
pressure seed
↓
64 hexagram-code result
```

The locked product chain is:

```text
currentHexagramProfile
+
PersonaMigrationImpact
↓
CrystalState
↓
currentCrystalEndState
↓
HexagramCrystalInput
↓
Hexagram Crystal Engine
↓
64 hexagram-code crystal
```

## 03. Engine Input Boundary

The Hexagram Crystal Engine may only consume:

```text
HexagramCrystalInput
```

It must not consume directly:

- raw `currentHexagramProfile`;
- raw `CrystalState`;
- raw `PersonaMigrationImpact`;
- raw `YaoTransmissionProfile`;
- raw pressure seed;
- raw mother-code profile;
- archive records;
- old R8 assets;
- 384 yao objects.

`HexagramCrystalInput` must already prove:

```text
sourceCrystal.status = CRYSTALLIZED
readiness = READY_FOR_HEXAGRAM_CRYSTAL
```

If not, the engine must fail closed.

## 04. What The Engine Receives

`HexagramCrystalInput` provides four kinds of meaning.

### 1. Source Crystal

The materialized current-round crystal.

It answers:

```text
Has the current round actually crystallized?
```

Required semantics:

- source is `currentCrystalEndState`;
- status is `CRYSTALLIZED`;
- crystal meaning exists.

### 2. Source Hexagram

The current-round hexagram structure.

It answers:

```text
Which hexagram structure is being expressed?
```

It may include:

- lower trigram;
- upper trigram;
- hexagram code;
- hexagram name;
- hexagram title.

This structure may come from `currentHexagramProfile`, but by the time it reaches the engine it must be carried through `currentCrystalEndState` and `HexagramCrystalInput`.

### 3. Migration Trace

The persona movement that happened in the current round.

It answers:

```text
What changed before this became a crystal?
```

It may include:

- source unit id;
- dimension;
- yao stage;
- trace line.

### 4. Dominant Shift

The main persona-dynamics shift.

It answers:

```text
What old response moved toward what new response?
```

It may include:

- from model;
- to response;
- deflection vector.

## 05. Engine Output Boundary

The Hexagram Crystal Engine may produce:

```text
64 hexagram-code crystal expression
```

This may later include:

- visible hexagram-code asset;
- card copy;
- crystal interpretation;
- claimable current-round asset state;
- ring-deposit summary.

But it must not produce:

- a new user profile;
- a score;
- a level;
- a growth value;
- a pet state;
- a long-term behavior history;
- a 384 yao result;
- an old R8 asset;
- an archive record.

The output is an expression of one crystallized current round.

It is not a permanent personality verdict.

## 06. Relationship To Current 1.0 Code

Current code already contains:

- `formCurrentHexagramProfile`;
- `knownHexagramMatrix`;
- `currentCrystalEndState`;
- `HexagramCrystalInput`;
- `HexagramCrystalAdapterService`.

Current code does not yet contain a production path:

```text
HexagramCrystalInput
↓
Hexagram Crystal Engine
```

Therefore the current implementation should be understood as:

```text
currentHexagramProfile defines current-round orientation
currentCrystalEndState gates crystallization
HexagramCrystalInput prepares future engine input
```

It should not yet be described as:

```text
persona migration already changes the final 64 hexagram code
```

That causal layer is defined by this protocol but not yet implemented.

## 07. Code Selection Principle

The engine must not randomly choose a new hexagram code.

If it uses the existing 64 matrix, it should treat `sourceHexagram` as the structural base.

Future code selection may follow one of three strategies:

### Strategy A: Structure-Preserved Crystal

The final 64 hexagram-code crystal keeps:

```text
sourceHexagram.hexagramCode
```

and uses migration trace to shape:

- card meaning;
- crystal copy;
- ring-deposit meaning.

This is safest for 1.0.

### Strategy B: Movement-Weighted Expression

The final crystal keeps the same source structure, but the dominant migration affects:

- title emphasis;
- card surface;
- behavior reading;
- starbeast imprint.

The code remains stable.

### Strategy C: Migration-Shifted Hexagram

The dominant migration can change the final hexagram expression.

This requires a future rule layer.

It must not be introduced without:

- explicit protocol;
- fixture gate;
- no-premature-asset guard;
- no-384 boundary;
- regression checks against old R8.

For 1.0, Strategy A or B is recommended.

## 08. Readiness Rules

The engine may run only when:

```text
HexagramCrystalInput.readiness = READY_FOR_HEXAGRAM_CRYSTAL
sourceCrystal.status = CRYSTALLIZED
sourceHexagram exists
migrationTrace exists
dominantShift exists
guardrails are intact
```

The engine must return `NOT_READY` when:

- `HexagramCrystalInput` is missing;
- source crystal is not crystallized;
- source hexagram is missing;
- migration trace is missing;
- dominant shift is missing;
- guardrails are violated.

It must not synthesize a default card to fill missing context.

## 09. Guardrails

The engine adapter must preserve:

- no storage write;
- no mutation of `currentCrystalEndState`;
- no mutation of `currentHexagramProfile`;
- no mutation of the 64 hexagram matrix;
- no Crystal Engine side effects before explicit engine construction;
- no collectible asset system;
- no score;
- no level;
- no growth value;
- no pet growth;
- no 384 yao;
- no archive;
- no old R8.

## 10. Product Language Boundary

Frontend language should not say:

- the system generated your result;
- your type is fixed;
- the hexagram predicted your future;
- the card was issued when pressure was selected;
- the engine changed you.

Frontend language may say:

- this round has crystallized;
- this hexagram expresses the shape left by this round;
- your confirmed response has left a trace;
- this is the current-round hexagram-code crystal;
- this crystal can enter Personality Ring Lite.

## 11. Relationship To Personality Ring Lite

The Hexagram Crystal Engine may produce a ring-deposit meaning.

It must not write Personality Ring Lite directly.

The final chain remains:

```text
Hexagram Crystal Engine
↓
64 hexagram-code crystal expression
↓
explicit ring deposit boundary
↓
Personality Ring Lite
```

The engine expresses the trace.

The ring layer stores the trace.

They must not collapse.

## 12. Future Engineering Route

Recommended sequence:

```text
Protocol
↓
HexagramCrystalEngineInput / Result type
↓
single action-five-awareness fixture
↓
engine adapter service skeleton
↓
pipeline gate
↓
optional GravityPage consumption
```

Do not start with:

- full 64 production rewrite;
- dynamic 384 mapping;
- old R8 migration;
- storage mutation;
- frontend visual rewrite.

## 13. 1.0 / 1.1 / 2.0 Boundary

### 1.0

Allowed:

- `HexagramCrystalInput` readiness;
- single-case fixture;
- structure-preserved crystal expression;
- no-storage adapter;
- pipeline gate.

Not allowed:

- rewriting 64 matrix;
- changing currentHexagramProfile formation;
- changing currentCrystalEndState;
- 384 yao;
- old R8;
- archive;
- collectible asset system.

### 1.1

Can consider:

- multiple migration fixtures;
- richer crystal copy;
- stronger starbeast imprint;
- ring-deposit summaries.

### 2.0

Can consider:

- movement-shifted hexagram expression;
- complete 36-unit to hexagram-expression mapping;
- 384 yao;
- long-term persona migration graph.

## 14. Final Lock

The Hexagram Crystal Engine must be understood as:

```text
an expression engine for crystallized persona migration
```

not:

```text
a persona change generator
```

The final 1.0 causal rule is:

```text
No HexagramCrystalInput
↓
no Hexagram Crystal Engine
↓
no final 64 hexagram-code crystal expression
```

