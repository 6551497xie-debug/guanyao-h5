# GUANYAO Hexagram Crystal Migration Causal Protocol

## 00. Document Position

This document locks the causal chain of Guanyao's current-round hexagram crystallization experience.

It is a product protocol document.

It does not modify:

- `src`;
- runtime;
- services;
- storage;
- routes;
- `GravityPage`;
- 64 hexagram-code generation;
- 384 yao;
- old R8.

This protocol should be read together with:

- `GUANYAO_PERSONA_BEHAVIOR_DYNAMICS_CORE_V1.md`
- `GUANYAO_PERSONA_TRANSMISSION_UNIT_PROTOCOL.md`
- `GUANYAO_PERSONA_TRANSMISSION_RUNTIME_SHAPE_PROTOCOL.md`
- `GUANYAO_FOUR_BEAST_LIFEFORM_PROTOCOL.md`

## 01. What Guanyao Hexagram Formation Is Not

Guanyao is not:

- birth data directly generating a personality label;
- pressure directly generating a result card;
- a prediction system;
- a personality type report;
- an old R8 hexagram asset package;
- a 384 yao device;
- an archive or collectible asset system.

The user should never feel:

```text
I entered data, so the system gave me a final personality result.
```

or:

```text
I selected pressure, so the system immediately issued a 64 hexagram-code card.
```

## 02. Core Definition

Guanyao's current-round hexagram formation is:

> A real pressure entering the user's mother-code base, forming a current-round hexagram orientation, passing through six-dimension / six-yao persona migration, creating one persona-dynamics deflection, and finally crystallizing as a current-round 64 hexagram-code asset.

In Chinese product language:

> 现实压力进入母码底盘后，先形成本局卦象；本局卦象进入六维六爻人格迁移，用户看见旧模型并完成一次微小修正，随后人格动力发生偏转，最终沉积为本局卦码结晶，并进入人格年轮。

## 03. The Only Causal Chain

The locked 1.0 chain is:

```text
Mother-code base
↓
Pressure seed
↓
Current hexagram orientation
↓
Six-dimension / six-yao persona migration
↓
Persona-dynamics deflection
↓
Current-round hexagram-code crystal
↓
Personality Ring Lite
```

Chinese frontend semantics:

```text
母码底盘
↓
压力种子
↓
本局卦象
↓
六维六爻人格迁移
↓
人格动力偏转
↓
本局卦码结晶
↓
人格年轮
```

No 1.0 production path should bypass this chain.

## 04. Causal Node Definitions

### 1. Mother-Code Base

The mother code is the user's original persona base.

It answers:

```text
What is the user's base operating structure before this current pressure enters?
```

It is not:

- a final personality result;
- a fixed fate label;
- a 64 hexagram-code card.

In frontend language, it can appear as:

- `8 母码`;
- `原始人格底盘`;
- `母码卡`.

### 2. Pressure Seed

The pressure seed is the current real pressure entering the system.

It answers:

```text
What is pressing the user in this round?
```

It is not:

- a personality quiz answer;
- a diagnosis;
- a final asset trigger by itself.

The pressure seed activates the mother-code base.

It does not directly issue a hexagram-code card.

### 3. Current Hexagram Orientation

The current hexagram orientation is the first current-round positioning layer.

It answers:

```text
Where am I now?
```

It is formed from:

- mother-code base;
- pressure seed;
- current pressure field.

Engineering may represent this through `currentHexagramProfile`.

Product boundary:

`currentHexagramProfile` is a current-round orientation bridge.

It is not:

- the final 64 hexagram-code asset;
- the visible hexagram-code card;
- a completed result;
- the user's final personality form.

Frontend expression should remain situational:

- current position;
- current round;
- pressure has formed a situation;
- the starbeast has entered this round.

It must not say:

- 64 hexagram-code card generated;
- final result generated;
- full asset completed.

### 4. Six-Dimension / Six-Yao Persona Migration

Six dimensions are the six spaces where persona operation changes under pressure:

- body;
- emotion;
- thought;
- action;
- memory;
- motivation.

Six yao are the six stages of a persona migration process:

- trigger;
- takeover;
- explain;
- solidify;
- awareness;
- revision.

Together they form the migration field:

```text
6 spaces x 6 yao stages = 36 possible persona migration events
```

The current round does not need to expose all 36 events to the user.

The current round needs to identify the active persona migration event that matters most.

This is carried by `PersonaTransmissionUnit` / `PersonaTransmissionRuntimeUnit`.

### 5. Persona-Dynamics Deflection

Persona-dynamics deflection is the moment when the user's old model no longer continues unchanged.

It requires:

1. old model manifestation;
2. user-facing seeing language;
3. current-session micro action;
4. user confirmation;
5. starbeast state shift.

It answers:

```text
What moved in me during this round?
```

This is the causal threshold between:

```text
I saw my old model.
```

and:

```text
I made one small new response possible.
```

In 1.0, this does not require:

- long-term tracking;
- scoring;
- tasks;
- habits;
- storage of a new profile;
- a behavior cultivation system.

### 6. Current-Round Hexagram-Code Crystal

The current-round hexagram-code crystal is the visible asset after migration and deflection.

It answers:

```text
What did this round become after I moved one response?
```

It is not:

- a prediction;
- a personality label;
- a reward;
- a raw analysis report;
- a card issued before the user sees and confirms the migration.

Engineering may represent this through `currentCrystalEndState`.

Product boundary:

`currentCrystalEndState` can only become the user's visible 64 hexagram-code asset after:

- the current hexagram orientation exists;
- six-dimension / six-yao transmission is complete;
- the persona migration event has become visible;
- the current-session revision action has been confirmed when available.

### 7. Personality Ring Lite

The personality ring is the current-round deposition layer.

It answers:

```text
Where does this change remain?
```

In 1.0, it is Lite:

- one current-round trace;
- one ring point;
- one deposited persona movement.

It is not:

- a complete personality archive;
- a social graph;
- a pet growth system;
- a long-term behavior tracker.

## 05. Two Hexagram Moments

Guanyao has two different hexagram moments.

They must not be collapsed.

### First Moment: Current Hexagram Orientation

Position:

```text
Pressure seed
↓
Current hexagram orientation
↓
Six-dimension / six-yao persona migration
```

It answers:

```text
Where am I now?
```

Allowed frontend language:

- 本局卦象定位;
- 当前处境;
- 这一局开始了;
- 四象兽进入这一局.

Forbidden frontend language:

- 64 卦码资产已生成;
- 卦码卡已完成;
- 本局结晶已经形成;
- 最终结果.

### Second Moment: Hexagram-Code Crystal

Position:

```text
Six-dimension / six-yao persona migration
↓
Persona-dynamics deflection
↓
Current-round hexagram-code crystal
```

It answers:

```text
What did I become after walking through this round?
```

Allowed frontend language:

- 本局结晶已经形成;
- 本局卦码;
- 64 卦码资产;
- 卦码卡;
- 保存入人格年轮.

## 06. Migration Event as the Causal Middle

`PersonaTransmissionUnit` should be understood as the runtime carrier of a persona migration event.

The product meaning is:

```text
One pressure
inside one persona space
at one yao stage
reveals one old model
creates one micro revision
and leaves one trace.
```

This event is the causal middle between:

```text
current hexagram orientation
```

and:

```text
hexagram-code crystal
```

Without this migration event, the hexagram-code crystal becomes only a result card.

With this migration event, the hexagram-code crystal becomes a trace of user movement.

## 07. Starbeast Role in the Causal Chain

The starbeast is not decoration.

The starbeast expresses the persona migration event.

It should show:

- pressure entering;
- old model tightening;
- seeing becoming possible;
- micro revision beginning;
- trace depositing.

In the causal chain:

```text
Mother code
↓
Pressure
↓
Current hexagram
↓
Migration event
↓
Starbeast state shift
↓
Crystal trace
```

The starbeast confirms that the current-round hexagram-code crystal is not a static card.

It is the visible residue of a movement.

## 08. Frontend Language Rules

### Before Persona Migration Completes

Allowed:

- 本局开始显影;
- 当前维度正在显影;
- 旧反应正在浮出;
- 这一层被看见了;
- 本局具备进入结晶的条件.

Forbidden:

- 本局结晶已经形成;
- 64 卦码已生成;
- 卦码卡已完成;
- 结果生成;
- AI 分析完成.

### After Persona-Dynamics Deflection

Allowed:

- 这一局，你留下了一种新的回应方式;
- 本局结晶已经形成;
- 认领这一局留下的卦码;
- 保存入人格年轮.

Forbidden:

- 获得奖励;
- 升级;
- 打卡完成;
- 任务完成;
- 完整人格资产包.

## 09. Engineering Boundary

This protocol does not require code changes.

It does not change:

- `currentHexagramProfile`;
- `currentCrystalEndState`;
- `resolveHexagramAssetCandidate`;
- `resolveCurrentCrystalEndState`;
- 64 hexagram-code generation;
- storage keys;
- route structure.

Engineering interpretation:

- `currentHexagramProfile` remains current-round orientation.
- `PersonaTransmissionRuntimeUnit` carries the active migration event.
- `currentCrystalEndState` remains the crystallization boundary.
- Personality Ring Lite remains the deposition boundary.

## 10. 1.0 Boundary

1.0 includes:

- mother-code base;
- pressure seed;
- current hexagram orientation;
- six-dimension / six-yao semantic bridge;
- one active persona migration event;
- current-session revision action;
- starbeast light feedback;
- current-round 64 hexagram-code crystal;
- Personality Ring Lite trace.

1.0 does not include:

- complete 36-unit production database;
- long-term persona migration tracking;
- 384 yao;
- yao-device;
- old R8;
- archive;
- collectible asset system;
- social graph;
- chat;
- pet growth.

## 11. Final Lock

The locked causal statement is:

> The 64 hexagram-code card is not generated because pressure entered. It crystallizes because the mother-code base met real pressure, formed a current-round hexagram orientation, passed through six-dimension / six-yao persona migration, produced one persona-dynamics deflection, and deposited that movement as a current-round trace.

Chinese lock:

> 64 卦码不是压力进入后的即时结果，而是母码底盘遇现实压力成局后，经过本局卦象定位、六维六爻人格迁移、人格动力偏转，最终沉积出的本局卦码结晶。

