# GUANYAO 1.0 Protocol Index

This document is the protocol index for GUANYAO 1.0.

All future Codex work on GUANYAO 1.0 must treat the documents listed here as construction constraints. If a proposed change conflicts with this index, the change must be paused until the product protocol is explicitly updated.

## 1. GUANYAO 1.0 Main Structure Protocol

The current GUANYAO 1.0 main chain is locked as:

```text
时空调频
→ 母码卡 / 本命原力 IP
→ 压力种子 / 引力扰动
→ Cosmic Botanics 六维花冠
→ 主修花瓣 6 节点调频
→ 星兽反馈
→ 64卦人格资产卡结晶
```

### Layer Definition

| Layer | Product Meaning | Runtime Role |
| --- | --- | --- |
| 时空调频 | 用户确认自己的出生时间与出生地 | Chrono + Geo input |
| 母码卡 / 本命原力 IP | 用户看见自己的初始人格结构 | Mother identity artifact |
| 压力种子 / 引力扰动 | 当前现实压力被温和看见 | Pressure context |
| Cosmic Botanics 六维花冠 | 压力落入人格空间后的调频场 | Six-dimensional interaction field |
| 主修花瓣 6 节点调频 | 用户完成一个小而真实的回应动作 | Six-node micro-tuning |
| 星兽反馈 | 星兽接住动作，并把光送回人格结构 | Starbeast lifeforce feedback |
| 64卦人格资产卡结晶 | 本局留下的可收藏人格资产 | Hexagram asset output |

## 2. Core Protocol Directory

### 1.0 Release And Architecture

- [RELEASE_FREEZE_1_0.md](./RELEASE_FREEZE_1_0.md)  
  1.0 release freeze and architecture lock state. Defines the frozen scope and allowed maintenance boundaries.

- [RELEASE_GATE_1_0.md](./RELEASE_GATE_1_0.md)  
  Release gate rules. Defines the standard pre-production check path and forbids partial release bypass.

- [R8_ENGINE_CAUSAL_LOCK.md](./R8_ENGINE_CAUSAL_LOCK.md)  
  Causal lock reference for upstream-only generation and downstream rendering discipline.

### Starbeast And Lifeforce

- [GUANYAO_1_0_BEAST_LIFEFORCE_MATRIX.md](./GUANYAO_1_0_BEAST_LIFEFORCE_MATRIX.md)  
  Starbeast lifeforce feedback matrix. Locks day-night cycle, starbeast emotion states, Finch high-stickiness principles, and the no-punishment mechanism.

### Pressure Seed And Main Chain

- [GUANYAO_1_0_CAUSAL_MAP_PROTOCOL.md](./GUANYAO_1_0_CAUSAL_MAP_PROTOCOL.md)  
  P0 causal chain mapping protocol. Defines how pressure seed lands in the six-dimensional primary petal, how six-node completion creates starbeast feedback, and how Mother Code + pressure seed + primary petal + completion state enters the hexagram asset PENDING candidate.

- [RC_MAIN_CHAIN_PRESSURE_SEED_LOCK.md](./RC_MAIN_CHAIN_PRESSURE_SEED_LOCK.md)  
  Pressure seed main-chain lock. Defines how pressure seed capture belongs to the active GUANYAO 1.0 flow.

- [R8_ENGINE_FULL_PIPELINE_AUDIT.md](./R8_ENGINE_FULL_PIPELINE_AUDIT.md)  
  Full pipeline audit reference for checking whether the running chain remains structurally coherent.

### Mother Code And Persona Asset

- [R8_ENGINE_PERSONALITY_ASSET.md](./R8_ENGINE_PERSONALITY_ASSET.md)  
  Personality asset protocol. Defines how generated personality output becomes an asset rather than a temporary UI result.

- [docs/protocols/three-code-system.md](./protocols/three-code-system.md)  
  Three-code system reference. Use only as protocol context; do not re-open frozen generation paths without explicit unfreeze.

### Hexagram Asset And 64-Code Card

- [GUANYAO_1_0_HEXAGRAM_ASSET_CANDIDATE_BOUNDARY.md](./GUANYAO_1_0_HEXAGRAM_ASSET_CANDIDATE_BOUNDARY.md)  
  P0 hexagram asset candidate boundary protocol. Defines the position and forbidden boundaries of `hexagramAssetCandidate(PENDING)`, the missing prerequisites before a formal 64-hexagram card, and the minimum next construction direction: `resolveHexagramAssetDraftCandidate()`.

- [GUANYAO_1_0_HEXAGRAM_DRAFT_CANDIDATE_PROTOCOL.md](./GUANYAO_1_0_HEXAGRAM_DRAFT_CANDIDATE_PROTOCOL.md)  
  P0 hexagram asset draft candidate protocol. Defines the position and forbidden boundaries of `hexagramAssetDraftCandidate(DRAFT)`, and locks the missing layers before a formal 64-hexagram card: asset mapping protocol, force translation language, and new asset card shell.

- [GUANYAO_1_0_HEXAGRAM_ASSET_MAPPING_PROTOCOL.md](./GUANYAO_1_0_HEXAGRAM_ASSET_MAPPING_PROTOCOL.md)  
  P0 hexagram asset mapping protocol. Defines how `hexagramAssetDraftCandidate(DRAFT)` enters `hexagramAssetMappingCandidate(MAPPING)`, while keeping MAPPING outside the formal 64-hexagram asset card layer and forbidding formal `hexagramCode`, `hexagramName`, or `cardName` output.

- [GUANYAO_1_0_FORCE_TRANSLATION_PROTOCOL.md](./GUANYAO_1_0_FORCE_TRANSLATION_PROTOCOL.md)  
  P0 force translation protocol. Defines how `hexagramAssetMappingCandidate(MAPPING)` enters `forceTranslationCandidate(FORCE_TRANSLATION)`, while keeping FORCE_TRANSLATION outside the formal 64-hexagram asset card layer and forbidding formal `hexagramCode`, `hexagramName`, or `cardName` output.

- [GUANYAO_1_0_ASSET_SHELL_PROTOCOL.md](./GUANYAO_1_0_ASSET_SHELL_PROTOCOL.md)  
  P0 asset shell protocol. Defines how `forceTranslationCandidate(FORCE_TRANSLATION)` enters `assetShellCandidate(ASSET_SHELL)`, while keeping ASSET_SHELL outside the formal 64-hexagram asset card layer and forbidding formal `hexagramCode`, `hexagramName`, `cardName`, UI, route, or commercialization output.

- [GUANYAO_1_0_CARD_BLUEPRINT_PROTOCOL.md](./GUANYAO_1_0_CARD_BLUEPRINT_PROTOCOL.md)  
  P0 card blueprint protocol. Defines how `assetShellCandidate(ASSET_SHELL)` enters `cardBlueprintCandidate(CARD_BLUEPRINT)`, while keeping CARD_BLUEPRINT outside the formal 64-hexagram asset card layer and forbidding formal `hexagramCode`, `hexagramName`, `cardName`, formal card face, UI, route, or commercialization output.

- [GUANYAO_1_0_ASSET_RENDER_PROTOCOL.md](./GUANYAO_1_0_ASSET_RENDER_PROTOCOL.md)  
  P0 asset render protocol. Defines how `cardBlueprintCandidate(CARD_BLUEPRINT)` enters `assetRenderCandidate(ASSET_RENDER_CANDIDATE)`, while keeping ASSET_RENDER_CANDIDATE outside the formal 64-hexagram asset card layer and forbidding formal `hexagramCode`, `hexagramName`, `cardName`, UI, route, or commercialization output.

- [GUANYAO_1_0_FINAL_ASSET_PROTOCOL.md](./GUANYAO_1_0_FINAL_ASSET_PROTOCOL.md)  
  P0 final asset candidate protocol. Defines how `assetRenderCandidate(ASSET_RENDER_CANDIDATE)` enters `finalAssetCandidate(FINAL_ASSET_CANDIDATE)`, while keeping FINAL_ASSET_CANDIDATE outside the formal 64-hexagram asset card layer and forbidding formal `hexagramCode`, `hexagramName`, `cardName`, `finalAssetId`, UI, route, or commercialization output.

- [GUANYAO_1_0_OFFICIAL_ASSET_GENERATION_PROTOCOL.md](./GUANYAO_1_0_OFFICIAL_ASSET_GENERATION_PROTOCOL.md)  
  P0 official asset generation candidate protocol. Defines how `finalAssetCandidate(FINAL_ASSET_CANDIDATE)` enters `officialAssetGenerationCandidate(OFFICIAL_ASSET_GENERATION_CANDIDATE)`, while this stage still does not output a formal asset card object and does not connect UI, route, or commercialization.

- [GUANYAO_1_0_OFFICIAL_ASSET_OBJECT_PROTOCOL.md](./GUANYAO_1_0_OFFICIAL_ASSET_OBJECT_PROTOCOL.md)  
  P0 official asset object protocol. Defines how `officialAssetGenerationCandidate(OFFICIAL_ASSET_GENERATION_CANDIDATE)` enters `officialAssetObject(OFFICIAL_ASSET_OBJECT)`. OFFICIAL_ASSET_OBJECT is the official asset data layer, but it is still not UI and does not connect route, legacy `/hexagram-stamp`, collection, payment, unlock, or commercialization.

- [GUANYAO_1_0_ASSET_CARD_RENDER_PROTOCOL.md](./GUANYAO_1_0_ASSET_CARD_RENDER_PROTOCOL.md)  
  P0 asset card render candidate protocol. Defines how `officialAssetObject(OFFICIAL_ASSET_OBJECT)` enters `assetCardRenderCandidate(ASSET_CARD_RENDER_CANDIDATE)`. This stage is still not UI, not a page, not a route, and not a commercial entry. It must not output `hexagramCode`, `hexagramName`, `cardName`, `finalAssetId`, or `officialAssetId`.

- [GUANYAO_1_0_ASSET_CARD_UI_PROTOCOL.md](./GUANYAO_1_0_ASSET_CARD_UI_PROTOCOL.md)  
  P0 asset card UI candidate protocol. Defines how `assetCardRenderCandidate(ASSET_CARD_RENDER_CANDIDATE)` enters `assetCardUiCandidate(ASSET_CARD_UI_CANDIDATE)`. This stage is still not a React page, not a route, not a formal asset card page, and not a commercialization or collection entry.

- [R8_ENGINE_HEXAGRAM_FORMATION.md](./R8_ENGINE_HEXAGRAM_FORMATION.md)  
  Hexagram formation protocol. Defines how final hexagram assets should be treated as generated output.

- [R8_ENGINE_YAO_TRANSMISSION.md](./R8_ENGINE_YAO_TRANSMISSION.md)  
  Yao transmission protocol. Relevant to six-node logic and future hexagram asset completion.

- [R8_HEXAGRAM_CARD_COLLECTIBLE_VISUAL_STANDARD.md](./R8_HEXAGRAM_CARD_COLLECTIBLE_VISUAL_STANDARD.md)  
  Collectible visual standard for hexagram cards.

- [R8_HEXAGRAM_CARD_MULTI_REFERENCE_SYSTEM.md](./R8_HEXAGRAM_CARD_MULTI_REFERENCE_SYSTEM.md)  
  Multi-reference system for hexagram card design consistency.

- [R8_HEXAGRAM_CARD_V08_ASSET_AUDIT_001_006.md](./R8_HEXAGRAM_CARD_V08_ASSET_AUDIT_001_006.md)  
  Existing hexagram card asset audit reference.

### Language System And Expression

- [docs/protocols/language-style.md](./protocols/language-style.md)  
  Front-stage language style protocol.

- [docs/protocols/forbidden-terms.md](./protocols/forbidden-terms.md)  
  Forbidden expression protocol. Must be checked before shipping new front-stage copy.

- [docs/protocols/workflow.md](./protocols/workflow.md)  
  Workflow protocol reference for product construction discipline.

### Visual And QA

- [H5_VISUAL_QA_MATRIX.md](./H5_VISUAL_QA_MATRIX.md)  
  H5 visual QA matrix.

- [R8_VISUAL_DIRECTION_V2.md](./R8_VISUAL_DIRECTION_V2.md)  
  Visual direction reference.

- [R8_VISUAL_CHAIN_REBUILD_PLAN.md](./R8_VISUAL_CHAIN_REBUILD_PLAN.md)  
  Visual chain rebuild reference.

- [R8_VISUAL_SYSTEM_TOKENS_P1_PLAN.md](./R8_VISUAL_SYSTEM_TOKENS_P1_PLAN.md)  
  Visual token plan reference.

- [R8_VISUAL_SYSTEM_TOKENS_P1_IMPLEMENTATION.md](./R8_VISUAL_SYSTEM_TOKENS_P1_IMPLEMENTATION.md)  
  Visual token implementation reference.

## 3. Highest Expression Constraints

The following constraints are mandatory across all GUANYAO 1.0 front-stage UI, copy, animation, sound, haptic, and asset output:

1. 星兽永不惩罚用户。
2. 未完成不等于失败。
3. 黑洞是外部扰动，不是用户罪责。
4. 压力种子用于看见现实，不用于审判用户。
5. 六节点不是任务打卡，而是微小调频。
6. 卦码卡不是吉凶判词，而是人格资产结晶。
7. 前台禁止吉凶、失败、惩罚、能量不足、未完成羞耻等表达。

### Front-Stage Forbidden Tone

Do not use language that implies:

- the user failed the system;
- the starbeast is disappointed;
- the pressure seed is the user's fault;
- unfinished action equals moral weakness;
- anxiety must be intensified to create engagement;
- the hexagram asset is a judgment of good or bad fortune.

## 4. Construction Order Constraints

Current implementation priority is locked as:

### P0 | Causal Chain Completion

```text
压力种子
→ 主修花瓣映射
→ 6节点完成态
→ 卦码资产结晶出口
```

Goal: make the active 1.0 chain structurally complete before adding more surface variation.

Current P0 asset chain has reached:

```text
selectedPressureSeedContext
→ derivePrimaryPetal()
→ currentPrimarySpaceId
→ 6节点完成态
→ starbeastFeedbackComplete
→ hexagramAssetCandidate(PENDING)
→ resolveHexagramAssetDraftCandidate()
→ hexagramAssetDraftCandidate(DRAFT)
→ resolveHexagramAssetMappingCandidate()
→ hexagramAssetMappingCandidate(MAPPING)
→ resolveForceTranslationCandidate()
→ forceTranslationCandidate(FORCE_TRANSLATION)
→ resolveAssetShellCandidate()
→ assetShellCandidate(ASSET_SHELL)
→ resolveCardBlueprintCandidate()
→ cardBlueprintCandidate(CARD_BLUEPRINT)
→ resolveAssetRenderCandidate()
→ assetRenderCandidate(ASSET_RENDER_CANDIDATE)
→ resolveFinalAssetCandidate()
→ finalAssetCandidate(FINAL_ASSET_CANDIDATE)
→ resolveOfficialAssetGenerationCandidate()
→ officialAssetGenerationCandidate(OFFICIAL_ASSET_GENERATION_CANDIDATE)
→ resolveOfficialAssetObject()
→ officialAssetObject(OFFICIAL_ASSET_OBJECT)
→ resolveAssetCardRenderCandidate()
→ assetCardRenderCandidate(ASSET_CARD_RENDER_CANDIDATE)
```

Current P0 asset-chain next code direction is locked as:

```text
assetCardRenderCandidate(ASSET_CARD_RENDER_CANDIDATE)
→ resolveAssetCardUiCandidate()
→ assetCardUiCandidate(ASSET_CARD_UI_CANDIDATE)
```

This next step must use [GUANYAO_1_0_ASSET_CARD_UI_PROTOCOL.md](./GUANYAO_1_0_ASSET_CARD_UI_PROTOCOL.md) as its construction basis.

It may only output:

```text
assetCardUiCandidate(ASSET_CARD_UI_CANDIDATE)
```

It must not generate the formal 64-hexagram card.

For P0 asset-chain work, explicitly forbidden:

- Do not connect back to legacy `/hexagram-stamp`.
- Do not revive the old annular asset flow.
- Do not revive the old instrument/weapon card system.
- Do not directly generate the formal 64-hexagram card.
- Do not output formal `hexagramCode`.
- Do not output formal `hexagramName`.
- Do not output formal `cardName`.
- Do not output a formal asset ID.
- Do not output a formal card face.
- Do not connect UI.
- Do not generate a real React page.
- Do not add routes.
- Do not create an asset card page.
- Do not output formal UI or React components.
- Do not output `archiveRoute` or `legacyRoute`.
- Do not add commercialization.
- Do not add collection, payment, or unlock fields.
- Do not output fortune or misfortune judgments.
- Do not output punitive expressions such as failure, unfinished shame, or insufficient energy.
- OFFICIAL_ASSET_OBJECT may form `assetSource`, `forceIdentity`, and `assetNarrative`, but it must not connect rendering, route, or commercial payloads.
- ASSET_CARD_RENDER_CANDIDATE may only prepare render candidate source and slots. It must not become a React component, page, route, card face, collection entry, or commercial entry.
- ASSET_CARD_UI_CANDIDATE may only prepare UI candidate sections. It must not become a real React page, formal asset card page, route, legacy `/hexagram-stamp` entry, collection entry, payment entry, unlock entry, or commercial payload.
- If formal `hexagramCode`, `hexagramName`, or `cardName` fields are required, first add `GUANYAO_1_0_HEXAGRAM_IDENTITY_ASSIGNMENT_PROTOCOL.md`.

### P1 | Content Chain Completion

```text
压力种子语言
→ 六节点语言
→ 星兽低语
→ 64卦原力转译
```

Goal: keep the user emotionally held while the system reveals pressure and asks for micro-action.

### P2 | Visual Chain Optimization

```text
昼夜循环
→ 星兽呼吸
→ 粒子情绪
→ 白虎星象精修
```

Goal: improve visual life without reopening generation architecture.

### P3 | Commercialization Access

```text
付费解锁
→ 资产收藏
→ 连续局
→ 会员体系
```

Goal: only after P0-P2 are stable, connect monetization as a continuation of asset value, not as an interruption.

## 5. Forbidden Construction Behavior

This protocol index forbids the following unless an explicit unfreeze protocol is issued:

- Do not change generation architecture.
- Do not add a second pressure seed path.
- Do not revive legacy `/pressure-seed → /hexagram-stamp` as active flow.
- Do not reintroduce weapon / annular asset / old six-space branches into `/dynamics`.
- Do not bypass release gate checks.
- Do not add new symbolic systems to the front-stage language.
- Do not turn Cosmic Botanics into a static form UI.
- Do not turn six nodes into a task checklist.
- Do not add commercial gates before the active causal chain is complete.

## 6. Codex Construction Rule

For future Codex work:

1. Read this protocol index before changing any active 1.0 flow.
2. Identify which P-level the requested work belongs to.
3. Check whether the requested change touches frozen architecture.
4. If it touches frozen architecture, stop and request explicit unfreeze.
5. If it is UI, copy, visual, or docs only, keep the change scoped to that layer.
6. Always preserve the highest expression constraints.

GUANYAO 1.0 is not a pile of pages. It is a continuous causal field:

```text
I am seen
→ I meet what is happening
→ I return one small light
→ I leave an asset behind
```
