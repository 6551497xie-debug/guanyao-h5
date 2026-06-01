import { useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { TextLines } from "../components/TextLines";
import { migrations } from "../data/migrations";
import { saveArchive } from "../services/archiveService";
import { getSession } from "../services/sessionService";
import { buildFinalChoiceCode } from "../services/trajectoryService";

export function MigrationPage() {
  const navigate = useNavigate();
  const { card, finalChoiceCode } = useMemo(() => {
    const sessionCode = getSession().finalChoiceCode;
    const nextFinalChoiceCode = sessionCode || buildFinalChoiceCode() || "101100";
    const matchedCard = migrations.find((item) => item.choiceCode === nextFinalChoiceCode) ?? migrations[0];

    return {
      card: matchedCard,
      finalChoiceCode: nextFinalChoiceCode,
    };
  }, []);

  function handleSave() {
    saveArchive({
      ...card,
      finalChoiceCode,
    });
    navigate("/archive");
  }

  return (
    <section className="stage-card migration-stage">
      <span>07 Migration</span>
      <h2>人格迁移成果卡</h2>
      <div className="info-grid track-grid">
        <article>
          <strong>当前轨迹</strong>
          <p>
            {card.currentTrack.code} {card.currentTrack.traditionalName}
            {card.currentTrack.scriptTitle}
          </p>
        </article>
        <article>
          <strong>迁移方向</strong>
          <p>
            {card.migrationDirection.code} {card.migrationDirection.traditionalName}
            {card.migrationDirection.scriptTitle}
          </p>
        </article>
        <article>
          <strong>六爻代码</strong>
          <p>{finalChoiceCode}</p>
        </article>
      </div>
      <TextLines className="stage-list reading-list" lines={[card.cardTitle, ...card.shortReading]} />
      <div className="script-block origin-block">
        <strong>{card.originGravityCoordinate?.title ?? "第0幕｜出厂重力坐标"}</strong>
        {card.originGravityCoordinate ? (
          <>
            <p>{card.originGravityCoordinate.coordinate}</p>
            <section>
              <h3>
                主因｜{card.originGravityCoordinate.primaryFactor.forceKey}：
                {card.originGravityCoordinate.primaryFactor.archetype}｜
                {card.originGravityCoordinate.primaryFactor.role}
              </h3>
              <TextLines lines={card.originGravityCoordinate.primaryFactor.lines} />
            </section>
            <section>
              <h3>
                潜因｜{card.originGravityCoordinate.secondaryFactor.forceKey}：
                {card.originGravityCoordinate.secondaryFactor.archetype}｜
                {card.originGravityCoordinate.secondaryFactor.role}
              </h3>
              <TextLines lines={card.originGravityCoordinate.secondaryFactor.lines} />
            </section>
            <section>
              <h3>塌缩点</h3>
              <TextLines lines={card.originGravityCoordinate.collapsePoint} />
            </section>
          </>
        ) : (
          <p>这条轨迹的原力双因子尚未完全展开。</p>
        )}
      </div>
      <div className="script-block ninety-day-block">
        <strong>90天惯性冲突剧本</strong>
        {[card.conflictScript90d.act1, card.conflictScript90d.act2, card.conflictScript90d.act3].map((act) => (
          <section key={act.title}>
            <h3>{act.title}</h3>
            <TextLines lines={act.lines} />
          </section>
        ))}
      </div>
      <p className="anti-node">反本能节点：{card.antiInstinctNode}</p>
      <button className="primary-action" type="button" onClick={handleSave}>
        保存到档案
      </button>
    </section>
  );
}
