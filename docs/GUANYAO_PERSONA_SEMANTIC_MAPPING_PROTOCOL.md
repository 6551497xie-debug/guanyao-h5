# GUANYAO Persona Semantic Mapping Protocol

## 00. Protocol Position

This protocol defines the translation layer between the Guanyao causal engine and the production-facing experience language.

Guanyao already has engine knowledge: pressure readings, inertia signals, cut potential, anti-instinct hints, and revision openings.

The frontend must not expose those engine terms directly.

The role of this protocol is to answer:

- what the backend already knows;
- how that knowledge becomes a persona model explanation;
- how the persona model becomes language a user can feel, understand, and identify with;
- how that language can guide one small model revision without becoming a test, task, diagnosis, or chat system.

Core principle:

> The backend may know complexity. The frontend must let the user feel accuracy.

## 01. Three Language Layers

Guanyao uses three language layers.

### Layer 1: Engine Language

Engine language is machine-facing and implementation-facing.

Examples:

- `pressureReading`
- `motherCodeInfluence`
- `hexagramInfluence`
- `transmissionReading`
- `inertiaSignal`
- `antiInstinctHint`
- `cutPotential`
- `interventionPotential`
- `userAgency`
- `mainCut`
- `secondaryCut`
- `rootCut`

Layer 1 is allowed in code, services, mocks, protocol analysis, and internal debugging.

Layer 1 is not allowed as production-facing user copy.

### Layer 2: Persona Model Language

Persona model language is product-facing. It explains what the engine has found in terms of old persona operation.

Examples:

- The old protection mechanism is starting.
- An inertia reaction is taking over.
- This pressure is entering through the body first.
- The current cut is about stopping the old response before it becomes behavior.
- The user can form a new response here.

Layer 2 is used by product protocol, mapping data, and design reasoning.

It may guide frontend copy, but it is still too explanatory to be shown directly in most 1.0 screens.

### Layer 3: User Language

User language is what the user sees and feels.

It must be concrete, restrained, and recognizable.

Examples:

- You returned to a way that once protected you.
- This thing arrived, and your body tightened first.
- Before you respond, you can pause for one breath.
- This layer has been seen.
- This round left a new way to respond.

Layer 3 is production-facing.

It should make the user feel:

- I can recognize this;
- I am not being judged;
- this is not a diagnosis;
- this is close enough to be useful;
- I can make one small change now.

## 02. Unified Mapping Structure

Every persona unit should pass through the following translation structure before becoming frontend language:

```text
Engine fields
↓
Old model explanation
↓
Real-life experience language
↓
Seeing language
↓
Revision direction
↓
Starbeast change
```

In Chinese product terms:

```text
引擎字段
↓
旧模型解释
↓
现实体验语言
↓
照见语言
↓
修正方向
↓
星兽变化
```

No production copy should be written directly from raw engine fields.

## 03. Engine Field Semantic Functions

| Engine field | Semantic function | User-facing rule |
| --- | --- | --- |
| `pressureReading` | How pressure enters this layer | Translate into a felt situation, not a diagnostic statement. |
| `motherCodeInfluence` | How the original model starts to shape the response | Translate as an old base pattern, not a personality label. |
| `hexagramInfluence` | Where this round is positioned | Translate as current situation, not final outcome. |
| `transmissionReading` | How pressure travels through a dimension | Translate as what is happening in this layer. |
| `inertiaSignal` | The old reaction that is taking over | Translate as a recognizable old way of responding. |
| `antiInstinctHint` | Direction for the anti-instinct move | Translate as one small possible new response. |
| `cutPotential` | Strength or usefulness of the cut | Usually not user-facing in 1.0. |
| `interventionPotential` | How actionable the current opening is | Usually not user-facing in 1.0. |
| `userAgency` | Whether user confirmation is appropriate | Drives interaction weight; do not show the raw term. |
| `mainCut` | The main revision entrance for this round | May drive the current-session revision action. |
| `secondaryCut` | Supporting interpretation | Background only in 1.0 unless needed for clarity. |
| `rootCut` | Deep protection mechanism | Keep restrained; avoid exposing too much too early. |

## 04. Translation Rules

### What User Language Must Do

User language must:

- be short;
- be concrete;
- be tied to the current reality pressure;
- avoid judgment;
- avoid therapy jargon;
- avoid system language;
- avoid personality-type labeling;
- help the user identify an old response;
- open one small revision direction.

### What User Language Must Not Do

User language must not say:

- system detected;
- analysis complete;
- result generated;
- your personality is;
- you are this type;
- you should become another person;
- you succeeded;
- you failed;
- reward unlocked;
- task completed.

Guanyao is not a test, diagnosis, task system, pet system, or chat product.

Guanyao is a persona behavior dynamics system that lets a user see one old model and complete one small revision.

## 05. Example Translation Paths

### Example A: Body Layer

Engine fields:

- `pressureReading`: pressure first appears as bodily tension;
- `inertiaSignal`: continue holding even after the body has sent a signal;
- `antiInstinctHint`: pause before taking on more load.

Old model explanation:

The old model treats safety as something that can only be kept by holding everything.

Real-life experience language:

This thing arrived, and your body tightened first.

Seeing language:

You noticed the moment before you kept carrying it.

Revision direction:

Before taking on more, pause for one breath.

Starbeast change:

The beast body moves from contraction toward stable bearing.

### Example B: Emotion Layer

Engine fields:

- `pressureReading`: pressure activates emotional charge;
- `inertiaSignal`: emotion starts deciding before facts are clear;
- `antiInstinctHint`: name the feeling before responding.

Old model explanation:

The old model lets emotion take over fact recognition.

Real-life experience language:

Before the facts were clear, the feeling had already moved first.

Seeing language:

You saw the feeling before it became the whole answer.

Revision direction:

Name the feeling first. Then decide whether to respond.

Starbeast change:

The light field moves from turbulence toward a readable glow.

### Example C: Thought Layer

Engine fields:

- `pressureReading`: pressure becomes an inner story;
- `inertiaSignal`: the mind explains too quickly;
- `antiInstinctHint`: write down the sentence before believing it.

Old model explanation:

The old model protects itself by turning pressure into a fixed explanation.

Real-life experience language:

A sentence appeared in your mind before the situation had finished unfolding.

Seeing language:

You saw the story before it became the only story.

Revision direction:

Write the sentence down before acting from it.

Starbeast change:

The light track moves from tangled lines toward a single visible path.

## 06. Six-Dimension Translation Direction

The six spaces each need a specific language direction.

| Space | Product question | User language direction | Starbeast cue |
| --- | --- | --- | --- |
| Body | How does pressure enter the body? | Sensation, tightening, holding, breath, load | Beast body, contraction, bearing |
| Emotion | How does feeling start deciding for the user? | Feeling, charge, wave, naming | Light field, turbulence, dimming, glow |
| Thought | How does the mind explain pressure? | Sentence, story, interpretation, focus | Light track, line, fork, focus |
| Action | How does the old model become behavior? | Movement, avoidance, pushing, stopping | Direction, step, turn, reach |
| Memory | How does the past cover the present? | Old trace, old scene, repeated route | Old mark, echo light, residue |
| Motivation | What is the user truly trying to protect? | What must be kept, defended, proven, approached | Star core, center light, guarded point |

## 07. Six-Yao Translation Direction

The six yao are not progress dots.

They are model change stages.

| Yao stage | Model meaning | User language direction |
| --- | --- | --- |
| First Yao: Trigger | Pressure enters | It started here. |
| Second Yao: Takeover | Old reaction starts controlling | The old response began to move first. |
| Third Yao: Explanation | Meaning is assigned | A story started to form. |
| Fourth Yao: Solidification | Pattern turns into behavior | It was about to become the familiar action. |
| Fifth Yao: Seeing | User sees the old model | You saw it before it took you over. |
| Upper Yao: Revision | New response becomes possible | Here, one small new response can appear. |

Frontend language may be more poetic, but it must preserve this model order.

## 08. Current-Session Revision Action Mapping

The current-session revision action should be generated from the strongest available revision source.

Preferred source order:

1. `mainCut`
2. corresponding `antiInstinctHint`
3. corresponding `inertiaSignal`
4. `interventionPotential`
5. `userAgency`

The output should include:

- old reaction line;
- seeing line;
- one small revision line;
- confirmation copy;
- starbeast cue.

It must not become:

- A/B selection;
- personality quiz;
- task list;
- habit system;
- growth score;
- check-in;
- reward.

The action is a confirmation of one new response direction.

## 09. Starbeast Semantic Mapping

The starbeast is not a pet, companion, reward mascot, or external assistant.

The starbeast is the lifeform manifestation of the user's changing persona model.

Semantic mapping:

```text
Old model exposed
↓
Starbeast state becomes readable
↓
Revision action confirmed
↓
Starbeast shifts slightly
↓
Current round crystallizes
```

Dimension mapping:

- Body revision affects beast posture and bearing.
- Emotion revision affects light field stability.
- Thought revision affects light track clarity.
- Action revision affects direction and forward movement.
- Memory revision affects old marks and residue.
- Motivation revision affects star core visibility.

The frontend may express this visually in 1.0 through small copy and light state changes.

It must not imply pet growth, leveling, reward, or companionship dependency.

## 10. Frontend Output Contract

Future frontend-visible persona units should avoid raw engine terms and expose translated fields.

Suggested semantic contract:

```text
userFacingOldPattern
userFacingExperienceLine
userFacingSeeingLine
userFacingRevisionLine
starbeastCue
internalSourceFields
doNotShow
```

This is a protocol contract, not a code change requirement.

1.0 may implement only part of this contract through localized copy mapping.

## 11. Relationship To Existing Protocols

### Persona Model Revision Protocol

Defines the system:

```text
Reality pressure
↓
Old persona model activates
↓
Six-dimension six-yao manifestation
↓
Current-session revision action
↓
Hexagram-code crystal
↓
Personality ring trace
```

### Four Beast Lifeform Protocol

Defines the lifeform:

```text
Four beasts
↓
Mother code manifestation
↓
Starbeast as persona lifeform
↓
Light trace and ring deposition
```

### Persona Semantic Mapping Protocol

Defines the translation:

```text
Engine knowing
↓
Persona model meaning
↓
User-felt language
↓
Starbeast-readable change
```

This protocol sits between the engine and the frontend.

## 12. 1.0 / 1.1 / 2.0 Boundary

### 1.0

1.0 should support:

- translation of engine fields into restrained user-facing language;
- current-session revision action copy;
- six-dimension and six-yao language alignment;
- candidate crystal copy safety;
- real crystal and 64 hexagram-code asset language;
- starbeast light feedback at a minimal semantic level.

1.0 should not require:

- a complete 36-unit production data table;
- long-term behavior tracking;
- full starbeast dynamic behavior;
- 384 yao direction;
- archive;
- yao-device;
- old R8.

### 1.1

1.1 may add:

- partial 36-unit mapping data;
- multi-round revision trace;
- beast marks;
- light track deposition;
- richer personality ring traces.

### 2.0

2.0 may add:

- complete 36-unit mapping;
- 384 yao direction;
- dynamic starbeast behavior;
- long-term persona model migration;
- full personality star map.

## 13. Deprecated / Isolated Language

The following expressions should not guide 1.0 production copy:

- six-dimension feedback as the final definition;
- node completion as progress-only language;
- system analysis complete;
- result generated;
- personality type result;
- crystal code as primary frontend naming;
- archive;
- collectible asset system;
- yao-device;
- 384 yao device;
- old R8;
- repair method as a production route.

Preferred upgraded terms:

- six-dimension persona model revision space;
- manifestation stage;
- current-session revision action;
- current-round crystal;
- 64 hexagram-code asset;
- personality ring trace.

## 14. Final Rule

Guanyao must translate before it presents.

The frontend is not an explanation engine.

The frontend is a mirror that lets the user feel:

> This is how my old model moved.
>
> I can change one small response here.
>
> This round has left a trace.
