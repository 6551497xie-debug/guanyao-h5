# GUANYAO 36 Yao Trigger Mapping Protocol

## 00. Protocol Position

This document defines how a Guanyao 36-yao persona transmission unit is selected.

It answers three questions:

1. Why does this round enter this persona space?
2. Why does this round hit this yao stage?
3. Why does this round generate this revision direction?

This protocol does not implement the mapping in code.

It defines the product logic that future code should follow.

## 01. Hit Principle

36 yao are not a fixed linear checklist.

They are not:

```text
Body 1 -> Body 2 -> Body 3 -> Body 4 -> Body 5 -> Body 6
```

for every user and every pressure.

36 yao are persona transmission units selected by the current round.

The hit is determined by:

- the user's current pressure seed;
- the mother code base model;
- the current hexagram orientation;
- the current inertia model;
- the existing `YaoTransmissionProfile`.

The selected unit is the one that most needs to become visible in this round.

## 02. Hit Formula

The product-level formula is:

```text
Pressure seed
+
Mother code influence
+
Current hexagram orientation
+
YaoTransmissionProfile
↓
Persona transmission unit hit
↓
Space
+
Yao stage
+
Old model
+
Revision direction
```

In Chinese product language:

```text
压力种子
+
母码影响
+
本局卦象
+
YaoTransmissionProfile
↓
人格传导单元命中
↓
空间
+
爻位
+
旧模型
+
修正方向
```

The hit result should not be explained to the user as an algorithm.

The frontend should only show:

- what is being seen;
- where the old model is moving;
- what small revision direction is available.

## 03. Input Sources

### Pressure Seed

The pressure seed answers:

> What is pressing the user now?

It carries:

- surface pressure;
- pressure category;
- pressure field;
- current emotional or behavioral charge.

The pressure seed is the first reason a transmission unit can be hit.

Without pressure, the 36-yao unit should not become an active current-round reading.

### Mother Code Influence

The mother code answers:

> What old base model receives this pressure?

It carries:

- original trigram structure;
- four-beast manifestation;
- original persona base;
- the user's pre-pressure operating tendency.

The mother code shapes how the same pressure enters different users.

### Current Hexagram Orientation

The current hexagram orientation answers:

> Where is the user standing in this round?

It must not be treated as the final 64 hexagram-code asset.

It is a positioning layer before six-dimension / six-yao transmission.

It helps determine:

- whether the pressure is entering through withdrawal, confrontation, blockage, dispersion, return, containment, or other current-round structures;
- which persona space is likely to become primary;
- which old model is being activated.

### YaoTransmissionProfile

`YaoTransmissionProfile` answers:

> What is the actual transmission shape of this pressure in this layer?

Relevant fields:

- `pressureReading`
- `motherCodeInfluence`
- `hexagramInfluence`
- `transmissionReading`
- `inertiaSignal`
- `antiInstinctHint`
- `cutPotential`
- `interventionPotential`
- `userAgency`

These fields should be used to select and translate the current transmission unit.

They must not be displayed directly as frontend copy.

## 04. Space Hit Rule

The persona space is selected by asking:

> Which layer of the user is first being taken over by this pressure?

Possible spaces:

- Body
- Emotion
- Thought
- Action
- Memory
- Motivation

### Body Space Hit

Hit body when the pressure first appears as:

- tightening;
- fatigue;
- breath change;
- heaviness;
- alertness;
- somatic defense;
- inability to relax.

Primary question:

> Is the body already reacting before the user has chosen a response?

### Emotion Space Hit

Hit emotion when the pressure first appears as:

- fear;
- shame;
- anger;
- anxiety;
- grievance;
- attachment;
- emotional takeover.

Primary question:

> Has feeling started deciding what the situation means?

### Thought Space Hit

Hit thought when the pressure first appears as:

- explanation loop;
- prediction;
- self-justification;
- proof-seeking;
- over-interpretation;
- story fixation.

Primary question:

> Is the mind building a story before the user can see the situation?

### Action Space Hit

Hit action when the pressure first appears as:

- impulsive solving;
- avoidance;
- delay;
- over-control;
- compensation;
- silence;
- withdrawal;
- automatic doing.

Primary question:

> Is the old model becoming behavior?

### Memory Space Hit

Hit memory when the pressure first appears as:

- old wound activation;
- old success replay;
- fear from past scenes;
- repeated relational pattern;
- current evidence being overwritten by old traces.

Primary question:

> Is the past covering the present?

### Motivation Space Hit

Hit motivation when the pressure first appears as:

- hidden need to protect dignity;
- need to prove worth;
- need to keep control;
- need to avoid abandonment;
- need to hold direction;
- survival-level guarding.

Primary question:

> What is the user truly trying to protect?

## 05. Yao Stage Hit Rule

The yao stage is selected by asking:

> How far has the old model already moved?

The yao stage is not a chronological click count.

It is a model-change stage.

### First Yao: Trigger

Hit first yao when:

- pressure has just entered;
- the old model is not fully visible;
- the first signal has appeared;
- the user can still observe before being taken over.

User-facing direction:

This is where it starts.

### Second Yao: Takeover

Hit second yao when:

- old reaction has started to control the field;
- the user feels the response becoming automatic;
- emotion, body, thought, or behavior begins moving without choice.

User-facing direction:

The old response has begun to move first.

### Third Yao: Explanation

Hit third yao when:

- the mind gives meaning to the pressure;
- the user starts justifying, predicting, defending, or explaining;
- the story becomes stronger than observation.

User-facing direction:

The old model is starting to explain reality.

### Fourth Yao: Solidification

Hit fourth yao when:

- the pattern is turning into behavior;
- the user is about to repeat a known route;
- the old model has moved from internal signal into action structure.

User-facing direction:

The old reaction is becoming the familiar action.

### Fifth Yao: Seeing

Hit fifth yao when:

- the user has enough distance to see the model;
- the old reaction is visible before it fully takes over;
- a conscious cut becomes possible.

User-facing direction:

You can see it before it takes you over.

### Upper Yao: Revision

Hit upper yao when:

- a new response is possible;
- the old reaction has been seen;
- the user can confirm one small movement;
- the current-session revision action can appear.

User-facing direction:

Here, one small new response can begin.

## 06. Revision Direction Rule

The revision direction is generated from the current cut.

Preferred source order:

1. `mainCut`
2. `antiInstinctHint`
3. `interventionPotential`
4. `userAgency`
5. `rootCut`
6. `secondaryCut`

The revision direction must be:

- small;
- concrete;
- current-round specific;
- connected to the hit space;
- connected to the hit yao stage;
- not a task system;
- not a growth score;
- not a personality conclusion.

It should answer:

> What is one old response that can move now?

## 07. Hit Examples

### Example A: Body x Second Yao

Input:

- pressure seed: debt pressure;
- mother code influence: boundary protection;
- current hexagram orientation: retreat / containment;
- `inertiaSignal`: keep holding tension to stay safe;
- `antiInstinctHint`: lower one layer of defense.

Hit:

```text
Body Space
+
Second Yao: Takeover
```

Old model:

Staying alert is the only way to stay safe.

Revision direction:

Release one point of tension you are still holding.

Starbeast:

The skeletal light track tightens, then one line loosens.

### Example B: Action x Fifth Yao

Input:

- pressure seed: relationship conflict;
- mother code influence: prove worth through response;
- current hexagram orientation: movement under pressure;
- `inertiaSignal`: act before understanding;
- `antiInstinctHint`: create a gap before responding;
- `userAgency`: high.

Hit:

```text
Action Space
+
Fifth Yao: Seeing
```

Old model:

The user tries to restore safety through immediate action.

Revision direction:

Choose one smaller action instead of the full old reaction.

Starbeast:

A new path appears beside the old route.

### Example C: Thought x Third Yao

Input:

- pressure seed: uncertainty about future;
- mother code influence: security through explanation;
- current hexagram orientation: blockage and interpretation;
- `inertiaSignal`: build a fixed story;
- `antiInstinctHint`: write down the sentence before believing it.

Hit:

```text
Thought Space
+
Third Yao: Explanation
```

Old model:

The mind turns pressure into a story to protect the user from uncertainty.

Revision direction:

Write the sentence down before acting from it.

Starbeast:

The light track forks, then one line becomes readable.

## 08. Relationship With Frontend Progression

The current 1.0 frontend may still let the user pass through visible node 1-6 inside each dimension.

But protocol-level hit logic is different:

- visible nodes help the user experience transmission;
- hit logic determines what the current unit means;
- the frontend should not imply every user must literally complete all 36 units.

In 1.0:

- nodes may remain simple;
- semantic bridge may label node 1-6 by yao stage;
- the strongest hit can drive the current-session revision action.

In 1.1:

- a partial 36-unit map may select stronger per-space/per-yao language.

In 2.0:

- hit logic may drive full 384 yao direction and dynamic starbeast behavior.

## 09. Relationship With Existing Engine

Current engine support:

- pressure seed exists;
- mother code profile exists;
- current hexagram profile exists;
- `YaoTransmissionProfile` exists;
- `mainCut`, `secondaryCut`, and `rootCut` exist;
- `antiInstinctHint`, `cutPotential`, `interventionPotential`, and `userAgency` exist.

Therefore:

```text
The trigger mapping protocol can be mapped onto the existing engine foundation.
```

But:

```text
The full 36-unit hit table is not yet a production data layer.
```

1.0 should not require a full data build.

## 10. Boundary

This protocol does not:

- modify code;
- modify runtime;
- modify services;
- modify storage;
- modify route;
- create a 36-unit production dataset;
- connect 384 yao direction;
- connect yao-device;
- connect archive;
- connect old R8;
- create a task system;
- create a habit system.

## 11. Final Rule

The user should never feel:

> The system randomly gave me a node.

The user should feel:

> This is the layer where my old response is becoming visible.
>
> This is the point where one small new response can begin.

The mapping exists so the product can explain itself internally while the frontend stays simple, felt, and precise.
