# GUANYAO 1.0 Causal Map Protocol

This protocol defines the GUANYAO 1.0 causal map from pressure seed to six-dimensional primary petal, then from six-node completion to the hexagram asset pending candidate.

It is a product and architecture contract. It does not modify runtime code.

## 1. Core Causal Statement

GUANYAO 1.0 must keep this causal chain readable:

```text
Mother Code = who I am
Pressure Seed = what is affecting me now
Primary Petal = where it lands in me
Six Nodes = how I return one small light
Starbeast Feedback = the light is received
Hexagram Asset Pending = this round can become an asset
```

The pressure seed does not judge the user. It only describes the current external disturbance.

The primary petal is not a diagnosis. It is the most useful place to start the user's smallest response.

## 2. Why A Pressure Seed Lands In One Dimension

Pressure enters the user through different felt channels. The same event may touch multiple dimensions, but GUANYAO 1.0 should choose one primary petal for the active round so the user is not asked to fix everything at once.

### Six-Dimensional Landing Model

| Dimension | Front-Stage Name | Landing Signal | User Felt Sense |
| --- | --- | --- | --- |
| body | 身体 | somatic strain, fatigue, breath, tension | "我身体先有反应" |
| emotion | 情绪 | fear, anger, grief, shame, tenderness | "我心里被牵动了" |
| thought | 思想 | explanation loops, self-proof, repeated analysis | "我脑子停不下来" |
| behavior | 行为 | stuck action, avoidance, delay, over-control | "我想动但动不了" |
| memory | 记忆 | old wound, past failure, familiar pain | "以前也这样过" |
| motivation | 动机 | lost direction, desire collapse, future blur | "我不知道往哪走" |

### Product Rule

Choose the dimension that gives the user the clearest and gentlest first action.

Do not choose the dimension that creates the strongest shame.

## 3. Pressure Seed Field To Primary Petal Mapping

Future runtime should use a stable mapping layer. The mapping must be deterministic for the same pressure seed and current persona context.

### Required Pressure Seed Fields

The active pressure seed should be normalized into these conceptual fields:

```ts
type PressureSeedCausalInput = {
  surfaceText: string;
  scenarioDomain: "work" | "relationship" | "family" | "money" | "health" | "self" | "unknown";
  emotionalTone: "fear" | "anger" | "grief" | "shame" | "numb" | "tired" | "unknown";
  bodySignal?: string;
  thoughtPattern?: string;
  behaviorBlock?: string;
  memoryEcho?: string;
  motivationLoss?: string;
};
```

This type is a protocol description only. It is not a required schema change for the current code.

### Mapping Priority

Use the first strong signal in this order:

1. bodySignal -> body
2. behaviorBlock -> behavior
3. thoughtPattern -> thought
4. emotionalTone -> emotion
5. memoryEcho -> memory
6. motivationLoss -> motivation
7. fallback -> body

### Why Body Is The Fallback

Body is the safest default because it gives the user a small, non-judgmental action:

- breathe;
- soften shoulders;
- notice fatigue;
- return one small light.

Body fallback must never imply the user's body is broken or weak.

## 4. Dimension-Specific Mapping Rules

### body

Pressure lands in body when copy contains or implies:

- fatigue;
- chest tightness;
- shoulder tension;
- sleep disturbance;
- breath shallowness;
- bodily heaviness.

Example:

```text
你在这个行业十年了，抬头还是经理。
```

Default landing:

```text
body
```

Reason:

The seed can create somatic compression: chest, shoulders, breath, posture.

### emotion

Pressure lands in emotion when copy contains or implies:

- being ignored;
- fear of rejection;
- anger rising;
- relational hurt;
- sadness or grievance;
- uncertainty in another person's response.

### thought

Pressure lands in thought when copy contains or implies:

- repeated explanation;
- self-proof;
- "why did they do this";
- endless analysis;
- mental rehearsal;
- unable to stop thinking.

### behavior

Pressure lands in behavior when copy contains or implies:

- stuck action;
- delay;
- avoidance;
- wanting to move but not moving;
- repeatedly not starting;
- blocked decision.

### memory

Pressure lands in memory when copy contains or implies:

- "again";
- old failure;
- repeated pattern;
- childhood or past wound;
- familiar pain;
- being pulled back.

### motivation

Pressure lands in motivation when copy contains or implies:

- not knowing where to go;
- loss of desire;
- no reason to continue;
- future blur;
- pretending not to want;
- direction collapse.

## 5. Primary Petal To Six-Node Completion

Once the pressure seed lands in a primary petal, the user should complete only one six-node micro-tuning chain for that round.

### Six Nodes

| Node | Product Name | Function | Completion Meaning |
| --- | --- | --- | --- |
| 1 | 镜面 / 觉察 | see what is happening | user admits one true feeling |
| 2 | 斩断 / 破局 | interrupt the old loop | user loosens the automatic reaction |
| 3 | 播种 / 调频 | choose one small repair action | user gives the body/mind a gentle next step |
| 4 | 汇聚 / 蓄能 | hold intention briefly | user gives attention back to the current self |
| 5 | 显影 | see the returning light | user notices a small change |
| 6 | 共振 / 破茧 | let the field respond | the round reaches crystallization pending |

### Completion Rule

Six-node completion is valid when:

```text
active primary petal exists
AND pressure seed context exists
AND all six nodes have reached completed or current final state
AND starbeast feedback has been triggered at least once
```

Do not call it "task completed" in front-stage language.

Call it:

```text
这一局，已经开始结晶。
```

## 6. Starbeast Feedback Rule

Starbeast feedback is valid only when it receives a user micro-action from the six-node chain.

It must express:

```text
the starbeast received the user's small light
```

It must not express:

```text
the starbeast became weaker because the user failed
```

### Feedback Stages

| User State | Starbeast Feedback |
| --- | --- |
| node started | core stars lightly respond |
| node advanced | star dust density increases |
| node completed | primary stars brighten slightly |
| round pending | starbeast holds stable protective mood |

The starbeast remains a shield. It is never a pet that suffers because the user did not act.

## 7. Hexagram Asset Pending Candidate

The hexagram asset candidate is not generated from the pressure seed alone.

It requires the full causal package:

```text
Mother Code
+ Pressure Seed
+ Primary Petal
+ Six-Node Completion State
+ Starbeast Feedback Trace
= Hexagram Asset Pending Candidate
```

### Candidate Input Contract

Future implementation should treat the pending candidate as:

```ts
type HexagramAssetPendingCandidate = {
  motherCode: string;
  trigram: string;
  direction: "青龙" | "朱雀" | "白虎" | "玄武";
  pressureSeedText: string;
  primaryDimension: "body" | "emotion" | "thought" | "behavior" | "memory" | "motivation";
  completedNodeCount: number;
  starbeastFeedbackState: "strained" | "charging" | "sovereign";
};
```

This is a protocol target, not a current schema requirement.

### Pending Means

PENDING means:

- the round has enough causal material to become an asset;
- the final 64-hexagram card is not yet actively generated in the current runtime;
- the system must not route back to legacy `/hexagram-stamp`;
- the user should feel completion, not a cliff.

## 8. Current Code Next Minimal Running Point

The next smallest runtime point should be:

```text
selectedPressureSeedContext
→ derivePrimaryPetal()
→ pass currentDimension into CosmicBotanicsField
```

### Why This Is The Next Knife

Current `/dynamics` can already show:

- pressure seed context;
- Cosmic Botanics field;
- six-node progression;
- starbeast feedback;
- PENDING outlet.

The missing causal lock is:

```text
why this pressure seed lands in this primary petal
```

The next implementation should not generate the final hexagram yet. It should first make the primary petal deterministic from pressure seed fields.

## 9. Forbidden Behavior

Do not:

- let pressure seed directly generate a hexagram asset;
- bypass six-node completion;
- route to legacy `/hexagram-stamp`;
- frame primary petal mapping as a diagnosis;
- make unfinished nodes feel like failure;
- use red failure states;
- describe pressure as user guilt;
- turn six nodes into checklist tasks.

## 10. Summary

GUANYAO 1.0 causal map:

```text
The user is seen.
The pressure seed is noticed.
The seed lands in one gentle starting place.
The user returns one small light through six nodes.
The starbeast receives it.
The round becomes ready to crystallize.
```

This is the bridge from emotional truth to persona asset.
