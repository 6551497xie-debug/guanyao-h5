import { TextLines } from "../components/TextLines";
import { getArchives } from "../services/archiveService";

export function ArchivePage() {
  const archives = getArchives();

  return (
    <section className="stage-card archive-stage">
      <span>08 Archive</span>
      <h2>人格档案</h2>
      {archives.length === 0 ? (
        <p>当前暂无记录</p>
      ) : (
        <div className="archive-list">
          {archives.map((item) => (
            <article className="archive-item" key={item.archiveId}>
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
              <div className="script-block">
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
              <div className="script-block">
                <strong>90天惯性冲突剧本</strong>
                {[item.conflictScript90d.act1, item.conflictScript90d.act2, item.conflictScript90d.act3].map((act) => (
                  <section key={act.title}>
                    <h3>{act.title}</h3>
                    <TextLines lines={act.lines} />
                  </section>
                ))}
              </div>
              <p>反本能节点：{item.antiInstinctNode}</p>
            </article>
          ))}
        </div>
      )}
    </section>
  );
}
