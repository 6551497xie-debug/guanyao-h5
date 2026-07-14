# GUANYAO Crystal Life Imprint Protocol

## Status

This is the active GUANYAO Crystal semantic protocol under the V2 worldview constitution.

It defines Crystal as the life imprint left by one lived experience and locks its relationship to the current hexagram, six-node completion, Choice, ChangeExperience, PersonaMigrationImpact, runtime expression, card view, and Personality Ring Lite.

This is a semantic registration, not a new candidate layer. It does not change Crystal Runtime, readiness rules, mapping, engine input, result consumption, persistence, or card output.

Its upstream semantic sources are:

- [GUANYAO_WORLDVIEW_CONSTITUTION_V2.md](./GUANYAO_WORLDVIEW_CONSTITUTION_V2.md)
- [GUANYAO_FOUR_BEAST_LIFEFORM_PROTOCOL.md](./GUANYAO_FOUR_BEAST_LIFEFORM_PROTOCOL.md)
- [GUANYAO_SIX_SPACE_LIFE_EXPERIENCE_PROTOCOL.md](./GUANYAO_SIX_SPACE_LIFE_EXPERIENCE_PROTOCOL.md)
- [GUANYAO_GRAVITY_REALITY_PULL_PROTOCOL.md](./GUANYAO_GRAVITY_REALITY_PULL_PROTOCOL.md)
- [GUANYAO_CHOICE_LIFE_DIRECTION_PROTOCOL.md](./GUANYAO_CHOICE_LIFE_DIRECTION_PROTOCOL.md)

Existing Crystal documents remain authoritative engineering references inside their technical scopes. This protocol is the active product-meaning source when legacy “personality asset”, reward, score, or final-identity wording conflicts with the V2 worldview.

## 1. Locked Definition

> Crystal = 这一次生命体验留下的星辰印记。

Crystal expresses what remains after a real situation has been experienced, a familiar pull has been seen, and a different relationship or response has become possible.

It records a movement such as:

- the body becoming a signal rather than a command;
- emotion becoming information rather than a verdict;
- thought becoming an interpretation rather than the whole reality;
- action regaining direction rather than repeating automatically;
- memory becoming reference rather than prediction;
- motivation becoming visible beneath external evaluation.

Crystal is not:

- the user's initial hexagram;
- the current hexagram by itself;
- a permanent personality label;
- a final judgment about who the user is;
- a score, level, rarity, or growth value;
- a reward for completing tasks;
- proof that pressure has disappeared;
- a prediction of future fortune;
- a collectible card, archive entry, or ring entry by itself.

Crystal is the imprint. Card, collection, and ring are possible carriers of that imprint.

## 2. One Round, Not A Final Self

Crystal is always scoped to “这一局”.

The words `CRYSTALLIZED`, “current crystal end state”, and “最终卦晶表达” describe the completion of the current runtime expression path. They do not mean:

- the user has finished changing;
- the user's identity has become fixed;
- one response will remain true forever;
- the system has discovered the user's essential final form.

A life can leave many imprints across time. Later experience may deepen, contradict, or reinterpret an earlier imprint without making the earlier experience false.

## 3. Current Hexagram And Crystal Are Different

`currentHexagramProfile` means:

> 本局卦象定位——这一局中，原始生命倾向与现实环境力量如何相遇。

Crystal means:

> 这次相遇经过体验、觉察与选择之后，留下了什么变化印记。

The relationship remains:

```text
母码 → 下卦
压力种子语义分类 → 上卦
下卦 + 上卦 → currentHexagramProfile

currentHexagramProfile 提供本局结构身份
+ PersonaMigrationImpact 提供变化痕迹
→ Crystal 表达这一局留下的生命印记
```

Crystal inherits the lower trigram, upper trigram, hexagram code, name, or title from the current hexagram structure. It does not mutate the hexagram matrix, recalculate the upper or lower trigram, or generate a different fate result.

The inherited hexagram identity is the structural carrier of the imprint, not proof that the initial hexagram and Crystal are the same object.

## 4. Locked Runtime Chain

The established Crystal chain remains:

```text
ChangeExperience Domain Runtime
→ PersonaMigrationImpact
→ CrystalState
→ HexagramCrystalEngineInput
→ HexagramCrystalResult
→ HexagramCrystalResultConsumption
→ currentCrystalEndState / 本局最终卦晶表达模型
```

Each layer has one responsibility:

| Layer | Responsibility | Must Not Mean |
| --- | --- | --- |
| ChangeExperience Domain Runtime | Provides a structured lived-change unit | Task completion alone |
| PersonaMigrationImpact | Expresses the movement from a familiar model to a new response | Permanent personality migration |
| CrystalState | Combines current-round structure with one dominant ready impact | UI, storage, collectible asset, or final identity |
| HexagramCrystalEngineInput | Carries inherited hexagram identity, migration trace, and dominant shift | A new hexagram-generation request |
| HexagramCrystalResult | Forms a current-round Crystal expression | A card, route, archive, or storage write |
| HexagramCrystalResultConsumption | Authorizes read-only entry into the expression layer | Permission to mutate the matrix or persist automatically |
| currentCrystalEndState | Exposes the current-round expression model to Dynamics | A permanent user profile or automatic ring deposit |

No downstream layer may invent a change that is absent from the upstream ChangeExperience and PersonaMigrationImpact material.

## 5. ChangeExperience And PersonaMigrationImpact Boundary

Crystal does not arise directly from pressure, six-space progress, or a system suggestion.

The content source must remain an established change movement:

```text
熟悉的反应
→ 用户看见其保护意义
→ 新回应被认领或确认
→ ChangeExperience
→ PersonaMigrationImpact
```

`PersonaMigrationImpact` contributes:

- `fromModel`;
- `toResponse`;
- `deflectionVector`;
- the dominant dimension and yao stage;
- the migration trace;
- the Crystal imprint line.

These fields describe one current-round movement. “Migration” does not mean that the user's whole personality has been replaced.

Prepared migration data may exist before final presentation. It must not be narrated as completed lived change until the established confirmation and readiness boundaries are satisfied.

## 6. Six-Node Completion Boundary

Six-node completion is a runtime prerequisite, not Crystal itself.

The current endpoint requires the established formation, six completed nodes, crystallization readiness, and a migration impact. When a revision action exists, the current Dynamics adapter also requires its confirmation.

Therefore:

```text
六节点完成
≠ Crystal 已经形成

节点未完成
≠ 用户失败

节点完成速度
≠ Crystal 价值
```

Completion provides a boundary through which an imprint may be expressed. It does not award an imprint for obedience or effort.

## 7. CrystalState Boundary

`CrystalState` is the internal semantic state that combines:

- `structureSource` from `currentHexagramProfile`;
- ready `impactSources`;
- one `dominantImpact`;
- `crystalMeaning`;
- readiness and asset boundaries;
- ring-deposit meaning and guardrails.

Its readiness values are technical workflow states:

| Readiness | Engineering Meaning | Not A User Meaning |
| --- | --- | --- |
| `NOT_READY` | Required structure or impact is missing | The user failed or has no value |
| `READY_TO_CRYSTALLIZE` | The semantic state can enter the end-state adapter | The user has completed growth |
| `CRYSTALLIZED` | The current expression path has reached its scoped endpoint | The user's identity is now final |

`CrystalState` remains storage-neutral and UI-neutral. It does not itself create a collectible, score, level, archive, 384-yao result, or Personality Ring entry.

## 8. Hexagram Crystal Engine Boundary

`HexagramCrystalEngineInput` must carry existing evidence:

- inherited source-hexagram identity;
- Crystal meaning;
- migration trace;
- dominant shift;
- changed-line context;
- source and guardrails.

The engine may form a `crystalLine` and migration expression from this material. It must not:

- change `currentHexagramProfile`;
- generate a different upper or lower trigram;
- mutate the 64-hexagram matrix;
- invent a migration trace;
- produce a score, level, rarity, or pet-growth value;
- write storage;
- create a collectible asset.

`HexagramCrystalResult` remains a current-round expression result. Its `CURRENT_ROUND_HEXAGRAM_CRYSTAL` boundary is not a declaration of permanent identity.

## 9. Result Consumption And currentCrystalEndState

`HexagramCrystalResultConsumption` is a read-only bridge into the expression layer.

It inherits the source hexagram identity and carries forward:

- `crystalLine`;
- `migrationLine`;
- Crystal meaning;
- migration trace;
- dominant shift.

It cannot render UI, write storage, create a collectible, connect the old R8 chain, or mutate the hexagram matrix.

`currentCrystalEndState` is the current Dynamics expression endpoint. It contains the current-round mother reference, pressure context, inherited hexagram identity, six-space transmission summary, and Crystal copy.

The “end state” is an endpoint for this chain, not the end of the person's life story.

## 10. Presentation Boundary

`DynamicsCurrentCrystalPresentation` translates `currentCrystalEndState` into user-facing meaning.

Its active guardrails remain:

- it is a migration expression;
- it is not the initial hexagram;
- it is not a personality label;
- it does not expose the pressure surface in the current Crystal presentation.

The current card title may use the inherited hexagram name or title. This means:

> 这枚生命印记发生在这一局卦象结构中。

It does not mean:

> 这枚印记就是用户永远的卦，或系统重新算出了一个结果。

Existing presentation language that still uses “人格动态” or “行为特征解码” is compatibility copy and can be calibrated in a later, separate front-stage knife.

## 11. Card, Collectible, And Asset Boundary

The card view is a visual carrier for Crystal. It is not Crystal's ontology.

Likewise, the frozen candidate asset chain, official asset object, UI candidate, and collectible standards are engineering and presentation structures. They must not redefine Crystal as:

- a reward item;
- a rarity class;
- proof of psychological achievement;
- a commercial entitlement;
- a replacement for the user's lived experience.

A Crystal may be meaningful before it is saved, collected, shared, rendered as a card, or connected to any future commercial layer.

Not collecting or saving a Crystal must not reduce its meaning or punish the user.

## 12. Personality Ring Lite Boundary

Personality Ring Lite is a persistence carrier for eligible `currentCrystalEndState` entries.

The established flow remains explicit:

```text
currentCrystalEndState 已形成
→ 用户查看本局变化印记
→ 用户主动选择“保存入人格年轮”
→ deposit adapter 校验并写入
→ presentation adapter 只读呈现保存结果
```

Crystal formation does not automatically deposit to the ring.

The ring entry count is a collection count, not:

- a growth level;
- a spiritual rank;
- a measure of self-awareness;
- proof that one user has changed more than another.

The ring is a way to revisit life imprints over time. It is not a scoreboard.

The current persisted entry retains pressure context for compatibility, while the active Crystal presentation guardrail hides the pressure surface. Any future privacy or data-minimization change requires a separate persistence audit and migration knife.

## 13. Choice And Non-Deposit Boundary

Choice remains with the user after Crystal has formed.

The user may:

- view the imprint without saving it;
- switch from the Crystal form to the card view;
- save it to Personality Ring Lite;
- leave without depositing;
- return later where supported by the current product flow.

Saving is not a second proof of change. Not saving is not rejection of the experience.

The product must not use collection pressure, scarcity, countdowns, or loss warnings to force deposit.

## 14. Front-Stage Language Boundary

Preferred direction:

- “这一局，留下了一枚属于你的生命印记。”
- “它记录的不是压力本身，而是你与它之间发生的变化。”
- “这不是最终答案，只是这一次真实经历留下的星点。”
- “你可以保存它，也可以只在这一刻看见它。”
- “本局卦象承载了这次变化，但它不定义你的一生。”
- “以后回望时，你会看见自己曾经怎样重新取得方向。”

Avoid:

- “恭喜完成任务，获得稀有结晶。”
- “这就是你的最终人格卦。”
- “六维满级后自动生成成长资产。”
- “结晶越多，生命等级越高。”
- “未收藏的结晶将失效。”
- “这枚卦晶预测了你的未来。”
- “系统已经确认你完成了人格迁移。”
- “保存后才算真正改变。”

## 15. Visual And Emotional Direction

Crystal should feel like a quiet trace of something genuinely lived, not loot released after a battle.

Suitable visual expressions include:

- a star point condensing from the path already travelled;
- light retaining a subtle changed direction;
- a transparent mineral or stellar trace containing layered memory;
- a calm shift from movement into presence;
- connection to a larger constellation without rank or rarity.

Avoid treasure chests, rarity colors, victory explosions, score counters, level-up language, pet-growth bars, or aggressive collection pressure.

The emotional objective is:

> 原来这一段经历没有消失，它在我身上留下了一点真实的光。

## 16. Engineering Compatibility Boundary

This protocol does not change:

- ChangeExperience Domain Runtime;
- `PersonaMigrationImpact`, `CrystalState`, or readiness values;
- Crystal mapping and end-state adaptation;
- `HexagramCrystalEngineInput`, `HexagramCrystalResult`, or result consumption;
- `currentCrystalEndState` structure or runtime endpoint;
- current hexagram identity inheritance;
- six-node completion and revision-confirmation gates;
- Dynamics Crystal and presentation adapters;
- explicit Personality Ring Lite deposit behavior;
- persistence schema, legacy reading, or stored pressure context;
- card view, routes, archive, collection, or user results.

Any change to front-stage Crystal copy, card composition, privacy handling, deposit interaction, or personality-ring naming must be executed as a separate knife with the relevant expression, runtime, persistence, and release gates.

## 17. Protocol Priority

For Crystal product meaning, this document takes precedence over legacy “personality asset”, “task reward”, “growth score”, “final personality”, “automatic collection”, and “pressure transformed into asset” wording.

Legacy types, candidate stages, card protocols, and persistence structures remain valid engineering references where they do not conflict with the V2 worldview constitution or this protocol.
