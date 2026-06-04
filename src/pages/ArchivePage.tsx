import { useState } from "react";
import { TextLines } from "../components/TextLines";
import { GuanyaoButton } from "../components/visual/GuanyaoButton";
import { GuanyaoShell } from "../components/visual/GuanyaoShell";
import { GuanyaoText } from "../components/visual/GuanyaoText";
import { getArchives } from "../services/archiveService";

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

const archiveBehaviorRadarNodes = [
  {
    window: "7—15 天",
    title: "第7—15天｜身体先报警",
    state: "shift",
    line: "你可能不会立刻反击。你更可能反扣手机，继续刷新，用忙碌麻痹已经醒过来的恐惧。",
  },
  {
    window: "30—45 天",
    title: "第30—45天｜现实代价开始结算",
    state: "pressure",
    line: "真正开始失控的，不是某一句话，而是必须知情的人终于发现你早就知道盘面。",
  },
  {
    window: "60—90 天",
    title: "第60—90天｜旧轨迹要求你回到原位",
    state: "shift",
    line: "它会把再等等包装成成熟，把先别说包装成顾全大局。",
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
    forbid: "不要用忙碌掩盖停滞。不要用勤奋证明你没有害怕。不要再把我很努力当成遮羞布。",
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
        {["你不是在谨慎。", "你是在用反复校准，推迟一次真正的行动。"].map((line) => (
          <GuanyaoText key={line} size="body" tone="muted">
            {line}
          </GuanyaoText>
        ))}
      </div>

      <section className="gy-defense-module">
        <h3>01｜90天行为重力雷达</h3>
        <p className="gy-defense-note">系统不吓唬你。它只用你走完的六爻轨迹，把未来90天里最容易复发的惯性节点摊开。</p>
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
        <h3>03｜90天复盘年轮入口</h3>
        <p className="gy-defense-note">未来90天，每一次顺应惯性或完成偏转，都可以沉积在这里。</p>
        <div className="gy-defense-review-ring" aria-label="90天复盘年轮">
          {archiveReviewRingCells.map((state, index) => (
            <span className={`gy-defense-review-cell gy-defense-review-cell--${state}`} key={`${state}-${index}`} />
          ))}
        </div>
        <p className="gy-defense-note">后续每一次现实偏转，都将沉积为新的行为年轮。</p>
      </section>
    </div>
  );
}

export function ArchivePage() {
  const archives = getArchives();
  const [expandedArchiveId, setExpandedArchiveId] = useState<string | null>(null);
  const archiveReadout = archives.length === 0 ? "暂无偏转沉积" : `已沉积 ${archives.length} 次偏转`;

  return (
    <GuanyaoShell className="gy-delivery-shell" density="compact">
      <section className="gy-delivery-stage gy-archive-stage gy-causal-line gy-causal-line-sediment gyFadeRise">
        <GuanyaoText as="span" size="eyebrow" tone="gold">
          档案沉淀
        </GuanyaoText>
        <GuanyaoText as="h2" size="title">
          人格档案
        </GuanyaoText>
        <GuanyaoText className="gy-archive-readout" as="span" size="eyebrow" tone="faint">
          {archiveReadout}
        </GuanyaoText>
        {archives.length === 0 ? (
          <div className="gy-archive-empty">
            <GuanyaoText size="body" tone="muted">
              当前暂无记录
            </GuanyaoText>
            <GuanyaoText size="body" tone="faint">
              完成一次人格迁移后，它会沉积在这里。
            </GuanyaoText>
          </div>
        ) : (
          <div className="gy-archive-list">
            {archives.map((item) => {
              const isExpanded = expandedArchiveId === item.archiveId;

              return (
                <article className="gy-archive-card" key={item.archiveId}>
                  <div className="gy-archive-summary">
                    <div className="gy-archive-summary-row gy-archive-summary-code">
                      <span>六爻代码</span>
                      <strong>{item.finalChoiceCode}</strong>
                    </div>
                    <div className="gy-archive-summary-row gy-archive-summary-track">
                      <span>迁移轨迹</span>
                      <p>
                        {item.currentTrack.code} {item.currentTrack.traditionalName}
                        {item.currentTrack.scriptTitle} → {item.migrationDirection.code} {item.migrationDirection.traditionalName}
                        {item.migrationDirection.scriptTitle}
                      </p>
                    </div>
                    <div className="gy-archive-summary-row gy-archive-summary-time">
                      <span>沉积时间</span>
                      <p>{formatArchiveTime(item.createdAt)}</p>
                    </div>
                  </div>
                  <GuanyaoButton className="gy-behavior-gate gy-behavior-gate-save" variant="ghost" onClick={() => setExpandedArchiveId(isExpanded ? null : item.archiveId)}>
                    {isExpanded ? "收起档案" : "展开这次偏转"}
                  </GuanyaoButton>
                  {isExpanded ? (
                    <div className="gy-analysis-stack gyFadeRise">
                      <nav className="gy-archive-anchor-nav" aria-label="档案分段">
                        <a href={`#archive-${item.archiveId}-fixed`}>爻码卡</a>
                        <a href={`#archive-${item.archiveId}-90d`}>90天防御本</a>
                        <a href={`#archive-${item.archiveId}-anti`}>反本能动作</a>
                        <a href={`#archive-${item.archiveId}-track`}>因果轨迹</a>
                      </nav>
                      <div className="gy-analysis-card" id={`archive-${item.archiveId}-fixed`}>
                        <GuanyaoText className="gy-archive-section-note" as="span" size="eyebrow" tone="faint">
                          查看本次六爻偏转生成的爻码状态。
                        </GuanyaoText>
                        <strong>爻码卡</strong>
                        <p>
                          {item.migrationDirection.code} {item.migrationDirection.traditionalName}
                          {item.migrationDirection.scriptTitle}｜上爻
                        </p>
                        <p>轨迹代码：{item.finalChoiceCode}</p>
                        <strong>{item.originGravityCoordinate?.title ?? "因果来源"}</strong>
                        {item.originGravityCoordinate ? (
                          <>
                            <p>{item.originGravityCoordinate.coordinate}</p>
                            <section>
                              <h3>
                                主因｜{item.originGravityCoordinate.primaryFactor.forceKey}：
                                {item.originGravityCoordinate.primaryFactor.archetype}｜
                                {item.originGravityCoordinate.primaryFactor.role}
                              </h3>
                              <TextLines lines={item.originGravityCoordinate.primaryFactor.lines} />
                            </section>
                            <section>
                              <h3>
                                潜因｜{item.originGravityCoordinate.secondaryFactor.forceKey}：
                                {item.originGravityCoordinate.secondaryFactor.archetype}｜
                                {item.originGravityCoordinate.secondaryFactor.role}
                              </h3>
                              <TextLines lines={item.originGravityCoordinate.secondaryFactor.lines} />
                            </section>
                            <section>
                              <h3>塌缩点</h3>
                              <TextLines lines={item.originGravityCoordinate.collapsePoint} />
                            </section>
                          </>
                        ) : (
                          <p>这条轨迹的原力双因子尚未完全展开。</p>
                        )}
                      </div>
                      <div className="gy-analysis-card" id={`archive-${item.archiveId}-90d`}>
                        <GuanyaoText className="gy-archive-section-note" as="span" size="eyebrow" tone="faint">
                          查看这条轨迹未来90天更容易反复触发的位置，以及对应的操作工具。
                        </GuanyaoText>
                        <strong>90天行为防御本</strong>
                        <ArchiveBehaviorDefenseKit />
                      </div>
                      <div className="gy-analysis-card" id={`archive-${item.archiveId}-anti`}>
                        <GuanyaoText className="gy-archive-section-note" as="span" size="eyebrow" tone="faint">
                          查看可以带回现实执行的三张操作卡。
                        </GuanyaoText>
                        <strong>反本能节点</strong>
                        <p>{item.antiInstinctNode}</p>
                      </div>
                      <div className="gy-analysis-card" id={`archive-${item.archiveId}-track`}>
                        <GuanyaoText className="gy-archive-section-note" as="span" size="eyebrow" tone="faint">
                          查看这次迁移结果由哪些前因推导而来。
                        </GuanyaoText>
                        <strong>轨迹</strong>
                        <p>六爻代码：{item.finalChoiceCode}</p>
                        <p>
                          当前轨迹：{item.currentTrack.code} {item.currentTrack.traditionalName}
                          {item.currentTrack.scriptTitle}
                        </p>
                        <p>
                          迁移方向：{item.migrationDirection.code} {item.migrationDirection.traditionalName}
                          {item.migrationDirection.scriptTitle}
                        </p>
                      </div>
                    </div>
                  ) : null}
                </article>
              );
            })}
          </div>
        )}
      </section>
    </GuanyaoShell>
  );
}
