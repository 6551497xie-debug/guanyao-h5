# Consumer / Owner 迁移清单 P0

## 1. 正式路由 Owner

| 旅程 | 路由 Owner | 正式消费者 | 状态 |
|---|---|---|---|
| Launch/Birth/Return hub | `src/App.tsx` → `/launch-lab` | `src/pages/LaunchLab.tsx` | ACTIVE |
| Genesis | `/genesis` | `src/pages/GenesisProductionRouteEntry.tsx`, `GenesisProductionExperiencePage.tsx` | ACTIVE |
| Reality | `/reality` | `RealityProductionRouteEntry.tsx`, `RealityProductionHost.tsx`, `RealityPressureSeedPresentation.tsx` | ACTIVE |
| Six dimensions/Choice | `/dynamics` | `GravityProductionRouteEntry.tsx`, `GravityPage.tsx` | ACTIVE |
| Archive | `/archive` | `PersonalityRingPage.tsx` | ACTIVE |

`ArchivePage.tsx`、Legacy Dynamics、Labs、Acceptance 与 development fixture 均非正式 owner；不得在未来 Cutover 中改成第二 Presenter。

## 2. 原子迁移 Owner 清单

| 域 | 唯一未来语义 Owner | 当前直接消费者/CSS | 迁移类别 | Authority 边界 |
|---|---|---|---|---|
| Birth copy | 新统一 Semantic Journey Resolver（单 owner） | `XinmaiGenesisBirthCoordinateControls.tsx`, `LaunchLab.tsx`, birth-coordinate CSS | copy | Birth controllers 不改 |
| Genesis/continuity | 同上 | `GenesisProductionExperiencePage.tsx`, `GenesisProductionRendererCanvasHost.tsx`, Genesis CSS | copy + sequence | Identity/presence 不改 |
| Whisper | 同上 | first/returning Whisper blocks in `GenesisProductionExperiencePage.tsx`, `LaunchLab.tsx`; `xinmaiLifeWhisperVisualOutcomeTransition.ts` read-only | optionality + copy | raw text不持久化；visual outcome不改 |
| Naming | 同上 | `xinmaiRelationshipNamingPresentationState.ts`, first Genesis naming block, returning/Ownership naming block in `LaunchLab.tsx` | consumer relocation | existing naming asset writer/schema不改 |
| Reality | 同上 | `RealityProductionRouteEntry.tsx`, `RealityProductionHost.tsx`, `RealityPressureSeedPresentation.tsx`, reality CSS | copy + read-only ordering | Catalog/Intent/Admission不改 |
| Six-dimension intro/items | `xinmaiSixDimensionSemanticChoreographyResolver.ts` remains bounded grammar owner; journey resolver supplies framing | `GravityPage.tsx`, `XinmaiLifeReflectionGuide.tsx`, six-dimension CSS | copy + framing | Set/Item/Receipt/grammar IDs不改 |
| Response Map | `xinmaiSixDimensionResponseMapPresentationResolver.ts` | `XinmaiSixDimensionResponseMap.tsx` | copy + three-layer hypothesis panel | recovery/semantic evidence不改 |
| Choice/Departure | unified journey resolver | `GravityPage.tsx`, Choice presentation components/styles | copy + action hierarchy | Choice V4/writer不改 |
| Return/no-fact | unified journey resolver | `XinmaiLivedResponseReturnSurface.tsx` and its CSS | copy + state/action map | no-fact/Fact controllers不改 |
| Crystal/Ownership | `xinmaiCrystalOwnershipPresentationResolver.ts` + unified journey resolver | `XinmaiCrystalFormationOwnershipMoment.tsx`, ownership CSS | copy + optional Naming placement | Formation/Crystal/Body不改 |
| Archive | unified journey resolver | `PersonalityRingPage.tsx`, archive/ring styles | copy + trace hierarchy | canonical projections不改 |
| Fresh Reality | `xinmaiFreshRealityVisibleNoveltyPresentationResolver.ts` + unified journey resolver | Reality consumers/CSS | copy + read-only ordering | fresh lifecycle不改 |

## 3. 当前正式语义 Consumer（精确文件）

Future Candidate 允许触及的 Runtime 类别仅限下列已核对文件或其单一新 Resolver/类型/CSS：

- `src/App.tsx`（只在需要保持唯一 route owner 时；预期零变化）；
- `src/pages/LaunchLab.tsx`；
- `src/pages/GenesisProductionExperiencePage.tsx`；
- `src/pages/GenesisProductionRouteEntry.tsx`（只读 wiring）；
- `src/pages/RealityProductionRouteEntry.tsx`；
- `src/pages/GravityPage.tsx`；
- `src/pages/PersonalityRingPage.tsx`；
- `src/components/XinmaiGenesisBirthCoordinateControls.tsx`；
- `src/components/GenesisProductionRendererCanvasHost.tsx`；
- `src/components/RealityProductionHost.tsx`；
- `src/components/RealityPressureSeedPresentation.tsx`；
- `src/components/XinmaiLifeReflectionGuide.tsx`；
- `src/components/XinmaiSixDimensionResponseMap.tsx`；
- `src/components/XinmaiLivedResponseReturnSurface.tsx`；
- `src/components/XinmaiCrystalFormationOwnershipMoment.tsx`；
- `src/services/xinmaiRelationshipNamingPresentationState.ts`；
- `src/services/xinmaiSixDimensionSemanticChoreographyResolver.ts`；
- `src/services/xinmaiSixDimensionResponseMapPresentationResolver.ts`；
- `src/services/xinmaiCrystalOwnershipPresentationResolver.ts`；
- `src/services/xinmaiCrystalValueLinePresentationResolver.ts`；
- `src/services/xinmaiFreshRealityVisibleNoveltyPresentationResolver.ts`；
- `src/services/xinmaiPostOwnershipNextRealityCyclePresentationResolver.ts`；
- directly associated presentation types and CSS files under `src/styles/`.

## 4. CSS Owner 收敛

未来 Cutover 保持“一屏一个 scroll owner、一个标题区、一个 persistent action zone”。允许修改：Birth/Genesis experience styles、Reality seed continuous discovery、six-dimension/Gravity presentation、response-map、lived-response return、Crystal ownership、Personality Ring。禁止全局视觉重做、2.5D、材质、Audio/Haptic。

## 5. 不得触及的 Writer/Authority 类别

- `xinmaiGenesisBirth*Controller`；
- `xinmaiRealityEncounterIntentController`、Admission/Lifecycle transactions；
- `xinmaiSixDimensionObservationAuthorityController`、semantic selection mutation、transactional store；
- `xinmaiChoiceActionIntentionController`；
- lived response/Fact/Eligibility/Formation/Crystal/Body writers；
- Pressure Catalog/compiler/revision；
- IndexedDB schema/store/index declarations。

## 6. UNKNOWN 清零

| 类别 | 已核对 | UNKNOWN |
|---|---:|---:|
| 正式 routes | 5 | 0 |
| 旅程节点 | 23 | 0 |
| 正式 page/component consumer groups | 15 | 0 |
| Resolver/adapter owner groups | 8 | 0 |
| CSS owner groups | 7 | 0 |
| Authority/writer exclusion groups | 6 | 0 |

UNKNOWN 总数：`0`。
