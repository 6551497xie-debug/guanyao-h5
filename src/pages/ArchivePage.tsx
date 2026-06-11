import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { TextLines } from "../components/TextLines";
import { GuanyaoShell } from "../components/visual/GuanyaoShell";
import { GuanyaoText } from "../components/visual/GuanyaoText";
import { getArchives } from "../services/archiveService";
import type { ArchiveItem, CausalContextPackage, YaoBit } from "../types";

function formatArchiveTime(createdAt: string) {
  return new Intl.DateTimeFormat("zh-CN", {
    year: "numeric",
    month: "numeric",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  }).format(new Date(createdAt));
}

function formatYaoBit(bit: YaoBit | null | undefined) {
  if (bit === 0) return "反本能偏转";
  if (bit === 1) return "照旧反应";
  return "未记录";
}

function formatYaoPath(path: YaoBit[] | undefined) {
  return path && path.length > 0 ? path.join("") : "未记录";
}

function readFragmentText(fragment: any) {
  return fragment?.text ?? fragment?.title ?? "未记录";
}

function readForceText(forceResult: any) {
  if (!forceResult) return "未记录";
  return [forceResult.symbol, forceResult.forceName, forceResult.archetype].filter(Boolean).join(" · ") || forceResult.forceKey || "未记录";
}

function readSceneText(sceneSeed: CausalContextPackage["sceneSeed"]) {
  return sceneSeed?.flashLine ?? sceneSeed?.title ?? "未记录";
}

function readGuaFieldText(context: CausalContextPackage | undefined) {
  const guaField = context?.guaField ?? context?.motherCode;
  if (!guaField) return "未记录";
  const legacy = guaField as NonNullable<CausalContextPackage["motherCode"]>;
  const name = guaField.hexagramName ?? legacy.name;
  return `${guaField.code64} ${name}｜${guaField.title}`;
}

function readYuanCodeText(context: CausalContextPackage | undefined) {
  const yuanCode = context?.yuanCode ?? context?.chronoCode;
  if (yuanCode) return `${yuanCode.userFacingName ?? yuanCode.personalitySourceCode}｜${yuanCode.sourceSeal ?? yuanCode.shortSeal}`;
  return context?.chronoProfile?.chronoPrototypeCard
    ? `${context.chronoProfile.chronoPrototypeCard.trigramSymbol} ${context.chronoProfile.chronoPrototypeCard.trigramName}｜${context.chronoProfile.chronoPrototypeCard.archetypeName}`
    : "未记录";
}

function renderYuanCodeDetail(context: CausalContextPackage | undefined) {
  const yuanCode = context?.yuanCode ?? context?.chronoCode;
  if (!yuanCode) return null;

  return (
    <div className="gy-yuan-source-detail">
      <p>入局底色：{yuanCode.userFacingName ?? yuanCode.name}</p>
      {yuanCode.frontName ? <p>前台读数：{yuanCode.frontName}</p> : null}
      <p>根资产代码：{yuanCode.personalitySourceCode}</p>
      {yuanCode.gravityVector ? <p>行为重力向量：{yuanCode.gravityVector}</p> : null}
      {yuanCode.sourceMechanism ? <p>源代码运行机制：{yuanCode.sourceMechanism}</p> : null}
      {yuanCode.sourceCore ? <p>源代码核心剖面：{yuanCode.sourceCore}</p> : null}
      {yuanCode.sourceShadow ? <p>驱动阴影：{yuanCode.sourceShadow}</p> : null}
      {yuanCode.sourceCodeSlice ? <p>降维核心剖面：{yuanCode.sourceCodeSlice}</p> : null}
      {yuanCode.grayNote ? <p>骨灰注释：{yuanCode.grayNote}</p> : null}
      <p>底色压印：{yuanCode.sourceSeal ?? yuanCode.shortSeal}</p>
      {yuanCode.systemPerspective && yuanCode.systemPerspective.length > 0 ? (
        <div>
          <strong>SYSTEM PERSPECTIVE</strong>
          {yuanCode.systemPerspective.map((line) => (
            <p key={line}>{line}</p>
          ))}
        </div>
      ) : null}
      {yuanCode.thematicField && yuanCode.thematicField.length > 0 ? (
        <p>THEMATIC FIELD：{yuanCode.thematicField.join(" · ")}</p>
      ) : null}
      {yuanCode.coreImpulse ? <p>核心冲动：{yuanCode.coreImpulse}</p> : null}
      {yuanCode.shadowInertia ? <p>阴影惯性：{yuanCode.shadowInertia}</p> : null}
    </div>
  );
}

function readYaoCodeText(context: CausalContextPackage | undefined) {
  if (!context?.yaoCode) return "未记录";
  return `${context.yaoCode.code384}｜${context.yaoCode.personalityBehaviorTrack}`;
}

function readMotherAssetText(context: CausalContextPackage | undefined) {
  const motherAsset = context?.motherCode ?? context?.guaField;
  if (!motherAsset) return "No.--｜母型待压印";

  const legacy = motherAsset as NonNullable<CausalContextPackage["motherCode"]>;
  const name = motherAsset.hexagramName ?? legacy.name ?? "母型";
  return `No.${motherAsset.code64}｜${name}｜${motherAsset.title}`;
}

function readTimeSandglassText(context: CausalContextPackage | undefined) {
  const sandglass = context?.timeSandglass ?? context?.energyState;
  if (!sandglass) return "未记录";
  return `${sandglass.currentEnergy}/${sandglass.maxEnergy}${sandglass.unitName}｜${sandglass.status}`;
}

function renderCausalSource(context: CausalContextPackage | undefined, item: ArchiveItem) {
  if (!context) {
    return (
      <div className="gy-causal-source-stack">
        <p>入局底色｜8：未记录</p>
        <p>压力显影：未记录</p>
        <p>母码驱动锁定：未记录</p>
        <p>现实触发证据：未记录</p>
        <p>观爻母码｜64：未记录</p>
        <p>旧惯性链：{formatYaoPath(undefined)}</p>
        <p>破口选择：未记录</p>
        <p>观爻爻器｜384：未记录</p>
        <p>器法：{item.migrationDirection.code} {item.migrationDirection.traditionalName}{item.migrationDirection.scriptTitle}｜上爻</p>
        <p>90天复发观察：已生成</p>
        <p>时间沙漏状态：未记录</p>
      </div>
    );
  }

  return (
    <div className="gy-causal-source-stack">
      <p>入局底色｜8：{readYuanCodeText(context)}</p>
      {renderYuanCodeDetail(context)}
      <p>压力显影：{readFragmentText(context.identityFragment)}</p>
      <p>母码驱动锁定：{readForceText(context.forceResult)}</p>
      <p>现实触发证据：{readSceneText(context.sceneSeed)}</p>
      <p>观爻母码｜64：{readGuaFieldText(context)}</p>
      <p>旧惯性链：{formatYaoPath(context.interactiveYaoPath && context.interactiveYaoPath.length >= 5 ? context.interactiveYaoPath : context.autoYaoPath)}</p>
      <p>破口选择：{formatYaoBit(context.sixthYaoChoice)}</p>
      <p>观爻爻器｜384：{readYaoCodeText(context)}</p>
        <p>最终轨迹代码：{context.finalChoiceCode}</p>
        <p>器法：{context.yaoCodeCard.code}</p>
        <p>90天复发观察：{context.defenseBook90d.sections.join(" / ")}</p>
        <p>时间沙漏状态：{readTimeSandglassText(context)}</p>
    </div>
  );
}

const archiveBehaviorRadarNodes = [
  {
    window: "7—15 天",
    title: "第7—15天｜身体先报警",
    state: "shift",
    line: "你可能不会立刻反击，也不会立刻说清楚。你更可能反扣手机，继续刷新，用一点无意义的忙碌麻痹已经醒过来的恐惧。",
  },
  {
    window: "30—45 天",
    title: "第30—45天｜现实代价开始结算",
    state: "pressure",
    line: "必须知情的人会发现：你早就知道问题存在，只是一直没有把真实盘面交出来。",
  },
  {
    window: "60—90 天",
    title: "第60—90天｜旧轨迹要求你回到原位",
    state: "shift",
    line: "这条轨迹最会骗你的地方，就是它永远不像逃避。它会把再等等包装成成熟，把先别说包装成顾全大局。",
  },
] as const;

const archiveOperationCards = [
  {
    title: "操作卡 01｜身体中断",
    when: "当你开始反复刷新、反扣手机、假装自己还在处理问题。",
    action: "断开屏幕 12 分钟。离开原位置。走到有自然光的地方。让身体先从假死里退出来。",
    forbid: "不要解释。不要补救。不要发长消息。不要继续用刷新证明自己还在掌控。",
    done: "身体离开原位。手机离开手。当天完成一个 10 分钟内能结束的小动作。",
  },
  {
    title: "操作卡 02｜底牌交出",
    when: "当你又想继续隐瞒真实进度，继续把盘面往后拖。",
    action: "找一个必须知情的人。只交出三句话：现在发生了什么；还能撑多久；你需要对方知道什么。",
    forbid: "不要包装。不要铺垫。不要卖惨。不要让沉默继续替你做决定。",
    done: "至少一个必须知情的人，知道真实情况。",
  },
  {
    title: "操作卡 03｜删减动作",
    when: "当你想用更多计划、会议、解释、准备，证明自己还在推进。",
    action: "删掉一个最像表面补救的动作。停止新增战线。只保留一个能触碰真实问题的动作。",
    forbid: "不要用忙碌掩盖停滞。不要用勤奋证明你没有害怕。不要再把“我很努力”当成遮羞布。",
    done: "少做一件消耗动作。把能量交还给真正有效的动作。",
  },
] as const;

const archiveReviewRingCells = Array.from({ length: 90 }, (_, index) => {
  if ([12, 44].includes(index)) return "inertia";
  if ([14, 61, 78].includes(index)) return "shift";
  return "empty";
});

function ArchiveBehaviorDefenseKit() {
  return (
    <div className="gy-defense-kit">
      <div className="gy-defense-verdict">
        {["系统不吓唬你。", "它只用你走完的六爻轨迹，把未来90天里最容易复发的惯性节点摊开。", "你真正要防的，不是外面的事。", "是你在压力出现时，那个太熟练的旧反应。"].map((line) => (
          <GuanyaoText key={line} size="body" tone="muted">
            {line}
          </GuanyaoText>
        ))}
      </div>

      <section className="gy-defense-module">
        <h3>01｜90天行为重力雷达</h3>
        <p className="gy-defense-note">如果继续顺着目前的行为惯性走，未来90天，最容易反复触发的不是灾难，而是你那套已经练得很熟的自保动作。</p>
        <p className="gy-defense-note">装作没事。继续硬撑。把话咽回去。把手机反扣。把真实盘面继续往后拖。</p>
        <div className="gy-defense-radar" aria-label="90天行为重力雷达">
          <div className="gy-defense-radar-line" aria-hidden="true" />
          {archiveBehaviorRadarNodes.map((node) => (
            <article className={`gy-defense-radar-node gy-defense-radar-node--${node.state}`} key={node.title}>
              <span>{node.window}</span>
              <strong>{node.title}</strong>
              <p>{node.line}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="gy-defense-module">
        <h3>02｜3张反本能操作卡</h3>
        <p className="gy-defense-note">当旧惯性再次启动时，不要再临场想办法。直接执行卡片上的动作。</p>
        <div className="gy-defense-card-stack">
          {archiveOperationCards.map((card) => (
            <article className="gy-defense-action-card" key={card.title}>
              <strong>{card.title}</strong>
              <div className="gy-defense-field">
                <span>适用时刻</span>
                <p>{card.when}</p>
              </div>
              <div className="gy-defense-field">
                <span>立即动作</span>
                <p>{card.action}</p>
              </div>
              <div className="gy-defense-field">
                <span>禁止动作</span>
                <p>{card.forbid}</p>
              </div>
              <div className="gy-defense-field gy-defense-field--done">
                <span>完成标准</span>
                <p>{card.done}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="gy-defense-module">
        <h3>03｜90天复盘年轮</h3>
        <p className="gy-defense-note">未来90天，每一次顺应惯性或完成偏转，都可以沉积在这里。</p>
        <div className="gy-defense-review-ring" aria-label="90天复盘年轮">
          {archiveReviewRingCells.map((state, index) => (
            <span className={`gy-defense-review-cell gy-defense-review-cell--${state}`} key={`${state}-${index}`} />
          ))}
        </div>
        <p className="gy-defense-note">你不是在打卡。你是在记录自己有没有从旧轨道里醒来。</p>
        <p className="gy-defense-note">每一个骨灰格，都是一次你没有记录的旧反应。每一个冷金点，都是一次你从惯性里夺回来的动作。</p>
      </section>
    </div>
  );
}

function readArchiveAssetCode(item: ArchiveItem) {
  return item.causalContext?.yaoCode?.code384 ?? item.causalContext?.yaoCodeCard?.code ?? item.finalChoiceCode ?? item.choiceCode ?? "YAO_CODE";
}

function readArchiveAssetTrack(item: ArchiveItem) {
  const migration = item.migrationDirection
    ? `${item.migrationDirection.code} ${item.migrationDirection.traditionalName}${item.migrationDirection.scriptTitle}`
    : "";
  const current = item.currentTrack
    ? `${item.currentTrack.code} ${item.currentTrack.traditionalName}${item.currentTrack.scriptTitle}`
    : "";

  if (current && migration) return `${current} → ${migration}`;
  return migration || current || item.causalContext?.yaoCodeCard?.track || "轨迹已沉积";
}

function readArchiveAssetName(item: ArchiveItem) {
  const yao = item.causalContext?.yaoCode;
  if (yao?.personalityBehaviorTrack) return yao.personalityBehaviorTrack;
  if (item.causalContext?.yaoCodeCard?.title) return item.causalContext.yaoCodeCard.title;
  if (item.cardTitle) return item.cardTitle;
  return readArchiveAssetTrack(item);
}

function readArchiveAntiNode(item: ArchiveItem) {
  return item.antiInstinctNode || formatYaoBit(item.causalContext?.sixthYaoChoice) || "反本能节点已记录";
}

function buildArchiveYaoWeaponName(...sources: Array<string | undefined>) {
  const source = sources.filter(Boolean).join("｜");

  if (/硬骨|硬撑|扛住|咬合/.test(source)) return "硬骨切断器";
  if (/拖延|停滞|推迟|等待|校准/.test(source)) return "破局切断器";
  if (/越界|答应|讨好/.test(source)) return "拒绝越界盾";
  if (/失控|下坠|混乱/.test(source)) return "停止失重钩";
  if (/回避|沉默|断联|隐藏/.test(source)) return "延迟回应针";
  return "硬骨切断刃";
}

function readArchiveYaoWeapon(item: ArchiveItem) {
  const weaponCode = item.causalContext?.yaoCode?.code384 ?? item.finalChoiceCode ?? item.choiceCode ?? "YAO_IMPLEMENT";
  const weaponName = buildArchiveYaoWeaponName(
    item.causalContext?.yaoCodeCard?.title,
    item.causalContext?.yaoCodeCard?.source,
    item.antiInstinctNode,
    item.cardTitle,
    readArchiveAssetTrack(item),
  );

  return `${weaponCode}｜${weaponName}`;
}

function readArchiveAction(item: ArchiveItem) {
  return item.repairTarget?.antiInstinctAction ?? item.causalContext?.repairTarget?.antiInstinctAction ?? item.antiInstinctNode ?? item.causalContext?.yaoCodeCard?.source ?? "把今天最容易拖延的一步，缩小到十分钟内完成。";
}

function readArchiveRepairLayer(item: ArchiveItem) {
  return item.repairTarget?.repairLayer ?? item.causalContext?.repairTarget?.repairLayer ?? "SELF";
}

function readArchiveRepairTarget(item: ArchiveItem) {
  return item.repairTarget?.repairTargetName ?? item.causalContext?.repairTarget?.repairTargetName ?? "器法落点待生成";
}

function readArchiveRiskWindow(item: ArchiveItem) {
  return item.repairTarget?.riskWindow ?? item.causalContext?.repairTarget?.riskWindow ?? "15 / 45 / 90 天观察节点";
}

const archiveVaultSlots = [
  {
    key: "yao",
    code: "ASSET_01",
    label: "基础器法卡",
    value: "等待沉积",
    line: "完成一次一次观爻后，本局基础器法卡会压入人格资产年轮轴。",
  },
  {
    key: "defense",
    code: "ASSET_02",
    label: "反本能防线记录",
    value: "观察冻结",
    line: "防线记录不会在空库里生成。它只在真实行为轨迹完成后留下刻痕。",
  },
  {
    key: "window",
    code: "ASSET_03",
    label: "观察窗口",
    value: "尚未开封",
    line: "15 / 45 天窗口需要先有一条行为资产，才能被打开。",
  },
] as const;

type ArchiveVaultSlotKey = (typeof archiveVaultSlots)[number]["key"];

export function ArchivePage() {
  const navigate = useNavigate();
  const [activeVaultSlot, setActiveVaultSlot] = useState<ArchiveVaultSlotKey>("yao");
  const [expandedArchiveId, setExpandedArchiveId] = useState<string | null>(null);
  const archives = getArchives();
  const sortedArchives = [...archives].sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  const latestAsset = sortedArchives[0];
  const settledCount = sortedArchives.length;
  const yaoCodeCount = sortedArchives.filter((item) => item.finalChoiceCode || item.causalContext?.yaoCode || item.causalContext?.yaoCodeCard?.code).length;
  const pendingRecordCount = 0;
  const activeSlot = archiveVaultSlots.find((slot) => slot.key === activeVaultSlot) ?? archiveVaultSlots[0];

  return (
    <GuanyaoShell className="gy-delivery-shell" density="compact">
      <section className="gy-archive-vault gyFadeRise">
        <header className="gy-archive-vault-header">
          <span>GY / 08 / ARCHIVE_VAULT</span>
          <em>{sortedArchives.length > 0 ? "本次沉积已入库" : "人格资产库待写入"}</em>
          <h1>{sortedArchives.length > 0 ? "本次观爻已入库" : "人格资产库"}</h1>
          <p>{sortedArchives.length > 0 ? "人格资产 +1 ｜ 深层记录待开封" : "人格资产 ｜ 复发冻结 ｜ 深层记录"}</p>
        </header>

        {sortedArchives.length === 0 ? (
          <section className="gy-archive-vault-empty">
            <div className="gy-archive-vault-empty-copy">
              <span>VAULT_EMPTY</span>
              <h2>人格资产库尚未沉积</h2>
              <p>
                完成一次一次观爻后，
                <br />
                本次母码、爻器与器法
                <br />
                将压入人格资产年轮轴。
              </p>
            </div>

            <section className="gy-archive-vault-readout gy-archive-vault-readout--empty" aria-label="空仓人格资产读数">
              <span>人格资产年轮</span>
              <div>
                <strong>00</strong>
                <em>人格资产</em>
              </div>
              <div>
                <strong>00</strong>
                <em>复发冻结</em>
              </div>
              <div>
                <strong>00</strong>
                <em>人格资产年轮</em>
              </div>
            </section>

            <div className="gy-archive-vault-console" aria-label="人格资产库空仓校准台">
              <div className="gy-archive-vault-console-axis" aria-hidden="true" />
              <div className="gy-archive-vault-slot-grid">
                {[
                  { code: "槽位 01", label: "母码", value: "未写入" },
                  { code: "槽位 02", label: "爻器", value: "未压印" },
                  { code: "槽位 03", label: "器法", value: "未生成" },
                ].map((slot) => (
                  <button className="gy-archive-vault-slot" key={slot.code} type="button">
                    <span>{slot.code}</span>
                    <strong>{slot.label}</strong>
                    <em>{slot.value}</em>
                  </button>
                ))}
              </div>
            </div>

            <button type="button" onClick={() => navigate("/")}>
              沿线右滑，捕获第一枚行为种子
            </button>
          </section>
        ) : (
          <>
            <section className="gy-archive-vault-latest" aria-label="最近一次行为资产">
              <span>本次观爻已入库</span>
              <strong>人格资产 +1</strong>
              <h2>{readArchiveAssetName(latestAsset)}</h2>
              <p>母码：{readMotherAssetText(latestAsset.causalContext)}</p>
              <p>爻器：{readArchiveYaoWeapon(latestAsset)}</p>
              <p>器法：{readArchiveAction(latestAsset)}</p>
              <em><span className="gy-archive-label-en">Status｜</span>沉积状态：人格资产已沉积｜深层记录待开封</em>
              <button
                className="gy-archive-vault-deep-toggle"
                type="button"
                onClick={() => setExpandedArchiveId(expandedArchiveId === latestAsset.archiveId ? null : latestAsset.archiveId)}
              >
                {expandedArchiveId === latestAsset.archiveId ? "收起深层记录" : "展开深层记录"}
              </button>
              {expandedArchiveId === latestAsset.archiveId ? (
                <div className="gy-archive-vault-deep-record">
                  <p><span className="gy-archive-label-en">母码｜</span>系统母码：{readMotherAssetText(latestAsset.causalContext)}</p>
                  <p><span className="gy-archive-label-en">爻器｜</span>系统爻器：{readArchiveYaoWeapon(latestAsset)}</p>
                  <p><span className="gy-archive-label-en">器法｜</span>器法落点：{readArchiveRepairTarget(latestAsset)}</p>
                  <p><span className="gy-archive-label-en">器法层｜</span>器法层：{readArchiveRepairLayer(latestAsset)}</p>
                  <p><span className="gy-archive-label-en">复发窗口｜</span>复发观察窗口：{readArchiveRiskWindow(latestAsset)}</p>
                  <p>本局反本能节点：{readArchiveAntiNode(latestAsset)}</p>
                </div>
              ) : null}
            </section>

            <section className="gy-archive-vault-readout" aria-label="人格资产年轮总览">
              <span>人格资产年轮</span>
              <div>
                <strong>{settledCount}</strong>
                <em>人格资产</em>
              </div>
              <div>
                <strong>{pendingRecordCount}</strong>
                <em>复发冻结</em>
              </div>
              <div>
                <strong>{yaoCodeCount}</strong>
                <em>人格资产年轮</em>
              </div>
            </section>

            <section className="gy-archive-vault-axis" aria-label="人格资产年轮轴">
              <span>人格资产年轮轴</span>
              <div>
                {sortedArchives.map((item, index) => (
                  <article key={item.archiveId}>
                    <i>{`人格资产年轮_${String(index + 1).padStart(2, "0")}`}</i>
                    <time>{formatArchiveTime(item.createdAt)}</time>
                    <strong>母码：{readMotherAssetText(item.causalContext)}</strong>
                    <p>爻器：{readArchiveYaoWeapon(item)}</p>
                    <p>器法：{readArchiveAction(item)}</p>
                    <em><span className="gy-archive-label-en">Status｜</span>沉积状态：已沉积</em>
                    <button
                      className="gy-archive-vault-deep-toggle"
                      type="button"
                      onClick={() => setExpandedArchiveId(expandedArchiveId === item.archiveId ? null : item.archiveId)}
                    >
                      {expandedArchiveId === item.archiveId ? "收起深层记录" : "展开深层记录"}
                    </button>
                    {expandedArchiveId === item.archiveId ? (
                      <div className="gy-archive-vault-deep-record">
                        <p><span className="gy-archive-label-en">母码｜</span>系统母码：{readMotherAssetText(item.causalContext)}</p>
                        <p><span className="gy-archive-label-en">爻器｜</span>系统爻器：{readArchiveYaoWeapon(item)}</p>
                        <p><span className="gy-archive-label-en">器法｜</span>器法落点：{readArchiveRepairTarget(item)}</p>
                        <p><span className="gy-archive-label-en">器法层｜</span>器法层：{readArchiveRepairLayer(item)}</p>
                        <p><span className="gy-archive-label-en">复发窗口｜</span>复发观察窗口：{readArchiveRiskWindow(item)}</p>
                        <p>本局反本能节点：{readArchiveAntiNode(item)}</p>
                      </div>
                    ) : null}
                  </article>
                ))}
              </div>
            </section>

            <section className="gy-archive-vault-pending" aria-label="深层记录待开封">
              <span>深层记录待开封</span>
              {archiveVaultSlots.slice(1).map((slot) => (
                <button
                  className={`gy-archive-vault-pending-slot${activeVaultSlot === slot.key ? " gy-archive-vault-pending-slot--active" : ""}`}
                  key={slot.key}
                  type="button"
                  onClick={() => setActiveVaultSlot(slot.key)}
                >
                  <strong>{slot.label}</strong>
                  <em>{slot.value === "尚未开封" ? "观察冻结｜尚未开封" : `${slot.value}｜尚未开封`}</em>
                </button>
              ))}
              <div className="gy-archive-vault-slot-readout gy-archive-vault-slot-readout--pending">
                <span>{activeSlot.code} // {activeSlot.label}</span>
                <p>{activeSlot.line}</p>
              </div>
              <button className="gy-archive-vault-unseal" type="button" onClick={() => setActiveVaultSlot("defense")}>
                开封深层记录
              </button>
            </section>

            <button className="gy-archive-vault-return" type="button" onClick={() => navigate("/")}>
              返回沙盒
            </button>
          </>
        )}
      </section>
    </GuanyaoShell>
  );
}
