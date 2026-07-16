# GUANYAO Personal Star Beast Scene Model Fixture Protocol V1.0

协议编号：`RC-PERSONAL-STAR-BEAST-SCENE-MODEL-FIXTURES-P96`

阶段：`GUANYAO Visual Technical Validation Phase`

状态：`ISOLATED FORMAL FIXTURES ONLY / RENDERER NOT AUTHORIZED`

## 00｜协议目标

P96 冻结两个由正式生命身份驱动的 `PersonalStarBeastSceneModel` 对照样本，用来验证：

```text
Formal Life Identity
↓
P92 Manifestation Grammar
↓
P94 PersonalStarBeastSceneModel
```

是否能够保持“同一语法、不同生命”。

Fixture 不是视觉结果，不是 Renderer Input，不是 RenderPlan，不是视觉资产，也不是 Production 用户数据。

本刀不授权 WebGL，不安装 Three.js，不创建 Renderer，不修改 P40 Adapter。

## 01｜正式来源链

两个案例都只固定隔离验证用的时间输入，不固定任何生命结果。每次建立 Fixture 时必须经过同一正式链：

```text
Gregorian Birth Input
↓
resolveStarbeastFromBirthDate
↓
runMotherCodeLandingEngine
↓
calibrateStarBeastGenesisSource
↓
resolveLifeArchetypeProfileFromMotherCode
↓
freezeStarMansionLifeTrajectorySource
↓
resolvePersonalStarBeastManifestationReadiness
↓
PersonalStarBeastIdentityReference
↓
P94 Scene Model Reference Projection
```

禁止在 Fixture 中手工指定：

- 二十八宿结果；
- 四象结果；
- MotherCode / 母码结果；
- LifeArchetype 结果；
- 动物身份或四象兽资产。

Fixture 只保存正式来源对象和 P94 Scene Model 的引用关系，不复制星宿、四象、母码或生命原力事实。

## 02｜Fixture 合同

`PersonalStarBeastSceneModelFixture` 包含：

- `fixtureId`：隔离样本标识；
- `identitySourceReference`：P89 正式身份汇合来源；
- `mansionSeedReference`：本命星宿生命种子引用；
- `fourSymbolFieldReference`：四象形态场引用；
- `lifeArchetypeReference`：MotherCode → LifeArchetype 正式原力引用；
- `sceneModelReference`：P94 Renderer-neutral Scene Model；
- `validationScope: ISOLATED_PROTOTYPE_ONLY`。

这些字段保持引用关系，不在 Fixture 顶层展开或复制身份事实。

## 03｜两个正式案例

### Case A｜Formal Identity Baseline A

Case A 使用第一组隔离时间输入，经全部正式 Engine 与 P89/P90 来源链得到身份，再投影为 P94 Scene Model。

Case A 不是白虎 Demo，不以四象动物命名，不包含手工身份选择。

### Case B｜Formal Identity Baseline B

Case B 使用另一组隔离时间输入，经完全相同的正式 Engine、P89/P90、P92 和 P94 链得到身份。

Case B 必须与 Case A 满足：

- `PersonalStarBeastIdentityReference` 不同；
- Mansion Seed、Four Symbol Field、LifeArchetype Force 至少一项正式结果不同；
- Scene Model 三类表达引用不同；
- 不通过另建 Renderer 分支制造差异。

## 04｜“同一 Grammar Reference”的校准

P94 的 `PersonalStarBeastManifestationGrammarReference` 必须回指各自的 `sourceIdentityReference`。因此两个身份不能共享同一个对象实例。

P96 对“同一 Manifestation Grammar Reference”的正式定义是：

```text
same referenceId
+
same protocolVersion
+
each reference points to its own formal identity
```

固定为同一 P92 语法合同：

- `referenceId: guanyao:visual-manifestation-grammar:v1`；
- `protocolVersion: GUANYAO_VISUAL_MANIFESTATION_GRAMMAR_V1`。

身份回指不同不代表语法不同；它防止两个生命身份被错误合并。

## 05｜Scene Model 差异定义

P96 不生成视觉参数，只验证表达引用已经分叉：

- Mansion Seed Structure Reference；
- Four Symbol Spatial Field Reference；
- Life Force Modulation Reference。

两个 Scene Model 继续共同保持：

- `rendererNeutral: true`；
- `referenceOnly: true`；
- `noLifeFactCopy: true`；
- `noIdentityCalculation: true`；
- `noAssetGeneration: true`；
- `noDrawCommands: true`；
- `noRendererInvocation: true`。

“引用不同”只证明未来 Adapter 获得了不同语义输入，不代表视觉效果已经完成。

## 06｜Validation Service 边界

`validatePersonalStarBeastSceneModelFixturePair` 只验证：

1. 数量恰好为两个；
2. 两者均在 `ISOLATED_PROTOTYPE_ONLY`；
3. Mansion / Four Symbol 来源为正式 Star Beast Engine；
4. MotherCode / LifeArchetype 来源链一致；
5. Identity、Scene Model 与各表达引用指向同一正式身份；
6. Grammar 的 referenceId 和 protocolVersion 一致；
7. 两个生命来源和 Scene Model 表达引用确实不同。

Validation Service 不重新执行 Engine，不修改 Scene Model，不创建 RenderPlan，不调用 Renderer，不接 WebGL、Canvas、Runtime、UI 或 Storage。

## 07｜Production隔离

P96 Fixture 只存在于 `src/mocks`，不得被 Production 页面、Runtime、Launch、Gravity、Dynamics、Crystal UI 或 Storage 导入。

当前状态继续保持：

- Renderer：`NOT_AUTHORIZED`；
- WebGL：`NOT_ACTIVATED`；
- Three.js：未安装；
- P84–P87：`FOUR_SYMBOL_VISUAL_EXPERIMENT`，不能成为 Fixture 身份来源。

## 08｜P96结论

P96 只冻结“同一语法、不同生命”的正式对照证据。

完成后可以进入：

`Scene Model → RenderPlan Adapter Review`

仍不得直接进入 WebGL 或 Renderer 施工。
