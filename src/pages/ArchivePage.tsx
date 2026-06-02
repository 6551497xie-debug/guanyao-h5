import { useState } from "react";
import { TextLines } from "../components/TextLines";
import { GuanyaoButton } from "../components/visual/GuanyaoButton";
import { GuanyaoShell } from "../components/visual/GuanyaoShell";
import { GuanyaoText } from "../components/visual/GuanyaoText";
import { getArchives } from "../services/archiveService";

export function ArchivePage() {
  const archives = getArchives();
  const [expandedArchiveId, setExpandedArchiveId] = useState<string | null>(null);

  return (
    <GuanyaoShell className="gy-delivery-shell" density="compact">
      <section className="gy-delivery-stage gyFadeRise">
        <GuanyaoText as="span" size="eyebrow" tone="gold">
          档案沉淀
        </GuanyaoText>
        <GuanyaoText as="h2" size="title">
          人格档案
        </GuanyaoText>
        {archives.length === 0 ? (
          <GuanyaoText size="body" tone="muted">
            当前暂无记录
          </GuanyaoText>
        ) : (
          <div className="gy-archive-list">
            {archives.map((item) => {
              const isExpanded = expandedArchiveId === item.archiveId;

              return (
                <article className="gy-archive-card" key={item.archiveId}>
                  <div className="gy-archive-summary">
                    <p>创建时间：{new Date(item.createdAt).toLocaleString()}</p>
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
                  <GuanyaoButton variant="ghost" onClick={() => setExpandedArchiveId(isExpanded ? null : item.archiveId)}>
                    {isExpanded ? "收起档案" : "展开档案"}
                  </GuanyaoButton>
                  {isExpanded ? (
                    <div className="gy-analysis-stack gyFadeRise">
                      <div className="gy-analysis-card">
                        <strong>{item.originGravityCoordinate?.title ?? "第0幕｜出厂重力坐标"}</strong>
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
                      <div className="gy-analysis-card">
                        <strong>90天惯性冲突剧本</strong>
                        {[item.conflictScript90d.act1, item.conflictScript90d.act2, item.conflictScript90d.act3].map((act) => (
                          <section key={act.title}>
                            <h3>{act.title}</h3>
                            <TextLines lines={act.lines} />
                          </section>
                        ))}
                      </div>
                      <div className="gy-analysis-card">
                        <strong>反本能节点</strong>
                        <p>{item.antiInstinctNode}</p>
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
