# GUANYAO Persona Transmission Mapping Validator Protocol

## 00. Document Position

This document defines the validation standard for:

```text
YaoTransmissionProfile
↓
PersonaTransmissionRuntimeUnit
```

It is a product-model validation protocol.

It is not:

- code test;
- unit test;
- runtime implementation;
- service implementation;
- storage schema;
- AI hit logic;
- frontend component design.

The validator answers:

> Is this persona-dynamics translation complete enough to enter user experience?

Its primary purpose is to prevent:

```text
Engine Language
↓
direct leak
↓
user experience
```

## 01. Validation Object

### Input

The input is a `YaoTransmissionProfile`.

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

These fields belong to engine language.

They are not frontend copy.

### Output

The output is a `PersonaTransmissionRuntimeUnit`.

It must contain:

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

These fields belong to experience language.

They are allowed to prepare `GravityPage` experience after passing validation.

## 02. Six-Layer Validation Standard

### 1. Hit Validation

The mapping must explain why this unit was hit.

It must answer:

```text
Why did this pressure enter this dimension?
Why did this pressure hit this yao stage?
```

Pass:

- dimension is grounded in pressure and transmission;
- yao stage is grounded in current model movement;
- trigger context explains the current-round situation;
- the hit does not look random.

Fail:

- dimension is selected without reason;
- yao stage is selected as a fixed step only;
- current pressure has no relation to the unit;
- the hit looks like a generic content pick.

### 2. Model Validation

`oldModel` must describe a protection model under pressure.

It must not be a personality label.

Fail:

```text
You are a control personality.
You are an action type.
You have weak execution.
```

Pass:

```text
You have learned to create safety by controlling the environment.
```

or:

```text
You have learned to use action to keep uncertainty within reach.
```

The old model must be:

- situational;
- behavior-based;
- recognizable;
- non-diagnostic;
- not a fixed identity.

### 3. Inertia Validation

`inertiaPattern` must answer:

```text
Once the old model starts, what does the user automatically do?
```

Pass:

- describes observable automatic response;
- connects to `oldModel`;
- does not blame the user;
- does not expose raw engine terms.

Fail:

```text
inertia increased
behavioral bias activated
model control value high
```

### 4. Insight Validation

`insight` must pass the:

```text
"This is about me."
```

standard.

The user should be able to recognize the line without feeling diagnosed.

Pass language:

- "You have learned..."
- "You are used to..."
- "You begin to see..."
- "This part of you is trying to..."

Fail language:

- "System detected..."
- "Analysis shows..."
- "Your model has..."
- "Your personality defect is..."

The insight must be:

- human;
- specific;
- short;
- current-round relevant;
- non-therapeutic in tone;
- not AI-report language.

### 5. Revision Validation

`revisionDirection` and `microAction` must create one small model movement.

They must answer:

```text
What can the user do differently this time?
```

Pass:

- small;
- concrete;
- current-life executable;
- not a task system;
- not a behavior program;
- not a score or streak.

Fail:

```text
Change your life.
Become more confident.
Keep practicing every day.
Complete this challenge for seven days.
Choose A or B to determine your type.
```

The revision must be a current-round response, not long-term behavior tracking.

### 6. Starbeast Validation

`beastCue` must express persona change.

It must not be pure visual decoration.

Fail:

```text
The light becomes brighter.
The starbeast becomes larger.
Particles increase.
```

Pass:

```text
The tightened light path begins to open again.
```

or:

```text
The starbeast shifts from rushing ahead to holding direction.
```

The cue must map:

```text
persona state
↓
starbeast state
```

not:

```text
UI effect
↓
visual parameter
```

## 03. AI-Tone Failure Rules

Any of the following language patterns should fail validation when present in user-facing fields.

### System Language

Fail:

- detected
- analysis shows
- model judgment
- data indicates
- system reads
- calculation completed

Chinese fail direction:

- 检测到
- 分析显示
- 模型判断
- 数据表明
- 系统读取
- 计算完成

### Psychological Diagnosis Language

Fail:

- you suffer from
- your personality defect
- your problem is
- pathological
- abnormal

Chinese fail direction:

- 你患有
- 你的性格缺陷
- 你的问题是
- 病态
- 异常

### Game Language

Fail:

- upgrade
- level
- experience points
- reward
- streak
- score
- achievement

Chinese fail direction:

- 升级
- 等级
- 经验值
- 奖励
- 连续打卡
- 积分
- 成就

### Allowed User-Language Direction

Pass:

- You are...
- You have learned...
- You are used to...
- You begin to see...
- This moment can...
- Next time, before...

Chinese pass direction:

- 你正在……
- 你习惯……
- 你开始看见……
- 这一刻可以尝试……
- 下一次……之前……

## 04. User Value Validation

Every valid `PersonaTransmissionRuntimeUnit` must answer four user questions.

### Question 1

```text
What does this have to do with me?
```

Answered by:

```text
insight
```

The insight must make the unit recognizable.

### Question 2

```text
Why do I operate this way?
```

Answered by:

```text
oldModel + inertiaPattern
```

The user should see the old protection model and its automatic response.

### Question 3

```text
How can I respond differently?
```

Answered by:

```text
revisionDirection + microAction
```

The micro action must be small enough to confirm.

### Question 4

```text
What does this change leave behind?
```

Answered by:

```text
crystalTrace
```

The trace must connect to current-round crystal and Personality Ring Lite.

## 05. Complete Lifecycle Validation

A valid runtime unit must support the full lifecycle:

```text
created
↓
matched
↓
revealed
↓
acknowledged
↓
revised
↓
crystallized
```

### Created

The unit has a stable runtime identity:

- `identity.unitId`
- `dimension`
- `yaoStage`

### Matched

The unit has a clear hit reason:

- reality pressure;
- mother-code influence;
- current hexagram position;
- engine-side transmission signal.

### Revealed

The old model is visible:

- not a label;
- not a diagnosis;
- not a fixed identity.

### Acknowledged

The user can recognize the insight:

- "this is about me";
- not "the system judged me".

### Revised

The user can confirm a micro action:

- one small response;
- no task system;
- no check-in;
- no long-term habit program.

### Crystallized

The runtime unit can leave a trace:

- current-round crystal;
- 64 hexagram-code crystal;
- Personality Ring Lite light point.

## 06. Field Completeness Gate

The runtime unit fails validation if any of these are missing:

- `identity.unitId`
- `dimension`
- `yaoStage`
- `triggerContext`
- `oldModel`
- `inertiaPattern`
- `insight`
- `revisionDirection`
- `microAction`
- `beastCue.before`
- `beastCue.after`
- `beastCue.cue`
- `crystalTrace.traceLine`
- `guardrails`

Optional context fields may be absent only if the fallback remains explicit.

## 07. Guardrail Validation

Every runtime unit must preserve:

```text
noStorageWrite: true
noLongTermProfile: true
noRawEngineLanguage: true
no384Yao: true
noArchive: true
```

Fail if the runtime unit implies:

- storage write;
- long-term profile;
- raw engine language in frontend;
- 384 yao direction;
- archive;
- yao-device;
- old R8;
- collectible asset system;
- score;
- streak;
- pet growth.

## 08. Fallback Validation

If a complete runtime unit cannot be formed:

Do not fabricate:

- `insight`;
- `microAction`;
- `beastCue`;
- `crystalTrace`;
- 64 hexagram-code crystal.

Allowed fallback:

```text
This round has not yet formed a complete persona transmission unit.
```

Chinese direction:

```text
这一局还没有形成完整的人格动力单元。
```

Fallback must remain:

- explicit;
- calm;
- non-alarming;
- non-system-heavy;
- not a fake result.

## 09. Validator Output

The validator should be able to produce one of three outcomes.

### PASS

The mapping is ready for current-round experience.

Requirements:

- all required fields present;
- no raw engine language leak;
- user questions answered;
- lifecycle complete;
- guardrails preserved.

### NEEDS_TRANSLATION

The mapping has useful engine material but is not user-ready.

Typical causes:

- `oldModel` still sounds technical;
- `insight` sounds like AI analysis;
- `microAction` is too broad;
- `beastCue` is only visual effect.

### NOT_READY

The mapping is not safe to enter experience.

Typical causes:

- missing hit reason;
- random dimension or yao stage;
- fake insight;
- fake crystal trace;
- early 64 hexagram-code claim;
- raw engine language in user-facing fields.

## 10. Sample Validation: Action Five Awareness

Using:

```text
identity: action-five-awareness
dimension: action
yaoStage: awareness
```

### Hit

Pass:

```text
The pressure requires movement while direction is still unclear.
```

### Old Model

Pass:

```text
The user creates temporary safety by moving quickly before uncertainty becomes visible.
```

### Inertia

Pass:

```text
The user accelerates, takes over, tries to solve immediately, and skips a fresh judgment.
```

### Insight

Pass:

```text
You have learned to use action to feel that things are still within reach.
```

### Revision

Pass:

```text
Before acting next time, first name the real problem you are trying to solve.
```

### Beast Cue

Pass:

```text
The starbeast shifts from rushing ahead to holding direction.
```

### Crystal Trace

Pass:

```text
This round records a movement from using action to reduce uncertainty toward judging before acting.
```

Overall:

```text
PASS
```

## 11. Implementation Boundary

This protocol does not:

- modify code;
- define TypeScript types;
- create validator code;
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

Future implementation should happen only after this protocol is stable.

