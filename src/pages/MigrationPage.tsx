import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { GuanyaoShell } from "../components/visual/GuanyaoShell";
import { GuanyaoText } from "../components/visual/GuanyaoText";
import { migrations } from "../data/migrations";
import { yaoCodes } from "../data/yaoCodes";
import { saveArchive } from "../services/archiveService";
import { buildYaoCodeCard, buildYaoCodeResult, normalizeGuaFieldFromLegacy } from "../services/codeContractService";
import { getSession, updateSession } from "../services/sessionService";
import { consumeEnergy, getTimeSandglassState } from "../services/timeSandglassService";
import { buildFinalChoiceCode } from "../services/trajectoryService";
import type { CausalContextPackage, GuanyaoSession, MigrationCard, RepairTargetResult, YaoCodeCard, YaoCodeResult } from "../types";

const ninetyDayScriptBills = [
  {
    title: "第一幕｜近期惯性引爆点",
    window: "7—15 天",
    trigger: "一条催促、一次临时变动、一个迟迟没有答案的消息，可能重新把你推回旧轨道。",
    inertia: "你会继续等待更完整的准备感。越等待，越容易把行动误认为风险。",
    bodySignalLabel: "身体信号",
    bodySignal: "拖延开始前，身体可能先出现紧绷、发闷、反复刷新或无法真正休息的信号。",
    antiInstinct: "不要证明自己。只完成一个最小动作，让轨迹先发生一次偏移。",
  },
  {
    title: "第二幕｜中期执念过载点",
    window: "30—45 天",
    trigger: "当外部压力没有明显变化，你会开始用解释、校准、准备来维持停滞。",
    inertia: "真正消耗你的，不是外界阻力，而是反复校准。你会继续等待一个更安全的开始时刻。",
    bodySignalLabel: "现实代价",
    bodySignal: "行动被延后，关系被悬置，真正的问题继续留在原位。",
    antiInstinct: "停止新增解释。删掉一个用来拖延行动的准备动作。",
  },
  {
    title: "第三幕｜90天反本能节点",
    window: "60—90 天",
    trigger: "当你再次想把行动推迟到“更确定以后”，节点会出现。",
    inertia: "你会本能地照旧反应：继续等、继续校准、继续让轨迹停在原地。",
    bodySignalLabel: "现实代价",
    bodySignal: "如果继续沿着这条轨迹，你更容易把停滞误认为谨慎，把退后误认为安全。",
    antiInstinct: "选择一个最小动作，在当天完成。不要证明自己，只让轨迹发生偏移。",
  },
];

const behaviorDefenseVerdict = [
  "系统不吓唬你。",
  "它只用你刚刚走完的六爻轨迹，",
  "把未来90天里最容易复发的惯性节点摊开。",
  "你真正要防的，不是外面的事。",
  "是你在压力出现时，那个太熟练的旧反应。",
];

const behaviorRadarNodes = [
  {
    window: ninetyDayScriptBills[0].window,
    title: "第7—15天｜身体先报警",
    state: "shift",
    line: "你可能不会立刻反击，也不会立刻说清楚。你更可能反扣手机，继续刷新，用一点无意义的忙碌麻痹已经醒过来的恐惧。",
  },
  {
    window: ninetyDayScriptBills[1].window,
    title: "第30—45天｜现实代价开始结算",
    state: "pressure",
    line: "你以为隐瞒是在保护局面。但系统推演到这里，必须知情的人会发现：你早就知道问题存在，只是一直没有把真实盘面交出来。",
  },
  {
    window: ninetyDayScriptBills[2].window,
    title: "第60—90天｜旧轨迹要求你回到原位",
    state: "shift",
    line: "这条轨迹最会骗你的地方，就是它永远不像逃避。它会把再等等包装成成熟，把先别说包装成顾全大局。",
  },
] as const;

const antiInstinctOperationCards = [
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

const reviewRingCells = Array.from({ length: 90 }, (_, index) => {
  if ([12, 44].includes(index)) return "inertia";
  if ([14, 61, 78].includes(index)) return "shift";
  return "empty";
});

function buildRepairTarget(session: GuanyaoSession, card: MigrationCard, yaoCodeCard: YaoCodeCard): RepairTargetResult {
  const motherAsset = normalizeGuaFieldFromLegacy(session.guaFieldResult ?? session.guaField ?? session.currentMotherCode ?? session.motherCodeResult ?? session.motherCode);
  const registryYaoCode = yaoCodes.find((entry) => entry.motherCode === motherAsset?.code64) ?? yaoCodes[0];

  return {
    repairLayer: registryYaoCode?.repairLayer ?? "RELATIONSHIP",
    repairTargetName: registryYaoCode?.repairTarget ?? "责任系统",
    damagePattern: yaoCodeCard.coreSeal || card.shortReading.join(""),
    antiInstinctAction: card.antiInstinctNode || registryYaoCode?.action || "把今天最容易拖延的一步，缩小到十分钟内完成。",
    riskWindow: "15 / 45 / 90 天观察节点",
    archiveStatus: "待压入行为修复资产库",
  };
}

function buildCausalContextPackage(
  session: GuanyaoSession,
  card: MigrationCard,
  finalChoiceCode: string,
  yaoCode: YaoCodeResult,
  yaoCodeCard: YaoCodeCard,
  repairTarget: RepairTargetResult,
): CausalContextPackage {
  return {
    chronoProfile: session.chronoProfile ?? null,
    yuanCode: session.yuanCode ?? session.chronoCode ?? null,
    chronoCode: session.chronoCode ?? session.yuanCode ?? null,
    identityFragment: session.selectedFragment ?? null,
    forceResult: session.forceReading ?? session.forceProfile ?? null,
    sceneSeed: session.selectedSceneSlice ?? session.realitySeed ?? null,
    guaField: normalizeGuaFieldFromLegacy(session.guaFieldResult ?? session.guaField ?? session.currentMotherCode ?? session.motherCodeResult ?? session.motherCode),
    motherCode: session.currentMotherCode ?? session.motherCodeResult ?? session.motherCode ?? null,
    autoYaoPath: session.autoYaoPath,
    interactiveYaoPath: session.interactiveYaoPath ?? [],
    sixthYaoChoice: session.sixthYaoChoice,
    finalChoiceCode,
    yaoCode,
    yaoCodeCard: {
      code: yaoCodeCard.title,
      title: yaoCodeCard.title,
      track: yaoCodeCard.sourceYaoCode?.personalityBehaviorTrack ?? `${card.currentTrack.code} ${card.currentTrack.traditionalName}${card.currentTrack.scriptTitle} → ${card.migrationDirection.code} ${card.migrationDirection.traditionalName}${card.migrationDirection.scriptTitle}`,
      source: yaoCodeCard.coreSeal,
    },
    repairTarget,
    defenseBook90d: yaoCodeCard.defenseBook90d ?? {
      title: "90天复发观察",
      sections: ["90天复发观察雷达", "3张反本能防线记录", "90天修复年轮"],
    },
    timeSandglass: session.timeSandglass ?? session.energyState ?? getTimeSandglassState(),
    energyState: session.energyState ?? session.timeSandglass ?? getTimeSandglassState(),
  };
}

function readMotherAssetLabel(session: GuanyaoSession) {
  const motherAsset = normalizeGuaFieldFromLegacy(session.guaFieldResult ?? session.guaField ?? session.currentMotherCode ?? session.motherCodeResult ?? session.motherCode);

  if (!motherAsset) {
    return "No.--｜母型待压印";
  }

  return `No.${motherAsset.code64}｜${motherAsset.hexagramName}｜${motherAsset.title}`;
}

function buildYaoWeaponName(...sources: Array<string | undefined>) {
  const source = sources.filter(Boolean).join("｜");

  if (/硬骨|硬撑|扛住|咬合/.test(source)) return "硬骨切断器";
  if (/拖延|停滞|推迟|等待|校准/.test(source)) return "破局切断器";
  if (/越界|答应|讨好/.test(source)) return "拒绝越界盾";
  if (/失控|下坠|混乱/.test(source)) return "停止失重钩";
  if (/回避|沉默|断联|隐藏/.test(source)) return "延迟回应针";
  return "硬骨切断刃";
}

function BehaviorDefenseKit() {
  return (
    <div className="gy-defense-kit">
      <div className="gy-defense-verdict">
        {behaviorDefenseVerdict.map((line) => (
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
          {behaviorRadarNodes.map((node) => (
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
          {antiInstinctOperationCards.map((card) => (
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
          {reviewRingCells.map((state, index) => (
            <span className={`gy-defense-review-cell gy-defense-review-cell--${state}`} key={`${state}-${index}`} />
          ))}
        </div>
        <p className="gy-defense-note">你不是在打卡。你是在记录自己有没有从旧轨道里醒来。</p>
        <p className="gy-defense-note">每一个骨灰格，都是一次你没有记录的旧反应。每一个冷金点，都是一次你从惯性里夺回来的动作。</p>
      </section>
    </div>
  );
}

export function MigrationPage() {
  const navigate = useNavigate();
  const [systemReadoutOpen, setSystemReadoutOpen] = useState(false);
  const session = getSession();
  const { card, finalChoiceCode } = useMemo(() => {
    const sessionCode = getSession().finalChoiceCode;
    const nextFinalChoiceCode = sessionCode || buildFinalChoiceCode() || "101100";
    const matchedCard = migrations.find((item) => item.choiceCode === nextFinalChoiceCode) ?? migrations[0];

    return {
      card: matchedCard,
      finalChoiceCode: nextFinalChoiceCode,
    };
  }, []);
  const yaoCode = useMemo(() => buildYaoCodeResult(session, card, finalChoiceCode), [card, finalChoiceCode, session]);
  const yaoCodeCard = useMemo(() => buildYaoCodeCard(session, card, finalChoiceCode, yaoCode), [card, finalChoiceCode, session, yaoCode]);
  const repairTarget = useMemo(() => buildRepairTarget(session, card, yaoCodeCard), [card, session, yaoCodeCard]);

  function handleSave() {
    const timeSandglass = consumeEnergy("archive_save", 0, "压入修复年轮");
    updateSession({
      yaoCode,
      yaoCodeResult: yaoCode,
      yaoCodeCard,
      repairTarget,
      defenseBook90d: yaoCodeCard.defenseBook90d,
      timeSandglass,
      energyState: timeSandglass,
    });
    saveArchive({
      ...card,
      finalChoiceCode,
      repairTarget,
      causalContext: buildCausalContextPackage(getSession(), card, finalChoiceCode, yaoCode, yaoCodeCard, repairTarget),
    });
    navigate("/archive");
  }

  const cleanScriptTitle = card.migrationDirection.scriptTitle.replace(/[《》]/g, "");
  const yaoCodeNo = `No.${card.migrationDirection.code}`;
  const yaoCodeTitle = `${card.migrationDirection.traditionalName}【${cleanScriptTitle}】`;
  const motherAssetLabel = readMotherAssetLabel(session);
  const yaoWeaponName = buildYaoWeaponName(yaoCodeCard.title, yaoCodeCard.coreSeal, card.antiInstinctNode);
  const yaoImplementLabel = `${card.migrationDirection.code}-5｜${yaoWeaponName}`;

  return (
    <GuanyaoShell className="gy-migration-r1-shell" density="compact">
      <section className="gy-migration-r1-screen gyFadeRise" aria-label="本次修复卡">
        <header className="gy-migration-r1-header">
          <GuanyaoText as="span" size="eyebrow" tone="gold">
            GY / 07 / YAO_IMPLEMENT
          </GuanyaoText>
          <GuanyaoText as="span" size="eyebrow" tone="faint">
            ⏳ 基础修复卡已生成 ｜ 本次行为轨迹已冻结
          </GuanyaoText>
          <span className="gy-migration-r1-hourglass">修复权限：基础层</span>
          <h1 className="gy-migration-r1-title">
            <span>{yaoCodeNo}</span>
            <strong>{yaoCodeTitle}</strong>
          </h1>
          <div className="gy-migration-r1-meta">
            <span>轨迹代码 // {finalChoiceCode}</span>
            <span>9.9 基础修复闭环已完成</span>
          </div>
        </header>

        <main className="gy-migration-r1-panel">
          <section className="gy-migration-r1-delivery" aria-label="本局爻器与器法生成">
            <div className="gy-migration-r1-verdict">
              <p>本局爻器已生成。</p>
              <p>{yaoImplementLabel}</p>
              <p>它不负责安慰你。它只负责切断旧反应。</p>
              <p>器法：{repairTarget.antiInstinctAction}</p>
            </div>
            <button className="gy-migration-r1-system-toggle" type="button" onClick={() => setSystemReadoutOpen((value) => !value)}>
              {systemReadoutOpen ? "收起系统读数" : "展开系统读数"}
            </button>
            {systemReadoutOpen ? (
              <div className="gy-migration-r1-grid" aria-label="系统读数">
                <div>
                  <span>卦码</span>
                  <strong>{motherAssetLabel}</strong>
                </div>
                <div>
                  <span>爻器</span>
                  <strong>{yaoImplementLabel}</strong>
                </div>
                <div>
                  <span>修复落点</span>
                  <strong>{repairTarget.repairTargetName}</strong>
                </div>
                <div>
                  <span>复发观察窗口</span>
                  <strong>{repairTarget.riskWindow}</strong>
                </div>
                <div>
                  <span>沉积状态</span>
                  <strong>{repairTarget.archiveStatus}</strong>
                </div>
              </div>
            ) : null}
          </section>

          <section className="gy-migration-r1-settlement" aria-label="观察冻结主轨">
            <div className="gy-migration-r1-settlement-line" aria-hidden="true" />
            <span>观察冻结</span>
            <em>本次基础修复卡已生成。更深层修复记录已生成，尚未开封。</em>
          </section>

          <section className="gy-migration-r1-gear" aria-label="已生成记录区">
            <div className="gy-migration-r1-gear-head">
              <span>深层修复记录已生成，尚未开封</span>
              <strong>深层修复记录已冻结</strong>
              <em>稍后可在行为修复资产库继续开封</em>
            </div>
            <div className="gy-migration-r1-gear-slots">
              <article>
                <span>📓 90天行为防御本</span>
                <em>观察冻结｜尚未开封</em>
                <strong>完整记录：未来90天行为冲突与防御路径</strong>
              </article>
              <article>
                <span>⏳ 高风险窗口</span>
                <em>观察冻结｜尚未开封</em>
                <strong>观察窗口：15 / 45天现实代价节点</strong>
              </article>
              <article>
                <span>🛡️ 反本能防线记录</span>
                <em>观察冻结｜尚未开封</em>
                <strong>防线记录：明确切断刃 / 拒绝越界盾 / 停止失重钩</strong>
              </article>
            </div>
            <p className="gy-migration-r1-warning">
              本次修复卡可先沉积入修复年轮。深层修复记录可稍后从行为修复资产库继续开封。
            </p>
            <span className="gy-migration-r1-archive">深层修复记录已生成，稍后可在行为修复资产库开封</span>
          </section>
        </main>

        <footer className="gy-migration-r1-profit-lock" aria-label="行为修复资产沉积闸门">
          <button className="gy-migration-r1-primary-deposit" type="button" onClick={handleSave}>
            沿线右滑，压入资产库
          </button>
          <span>修复资产先沉积入库 · 深层修复记录留待开封</span>
        </footer>
      </section>
    </GuanyaoShell>
  );
}
