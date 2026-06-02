import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { TextLines } from "../components/TextLines";
import { GuanyaoButton } from "../components/visual/GuanyaoButton";
import { GuanyaoShell } from "../components/visual/GuanyaoShell";
import { GuanyaoText } from "../components/visual/GuanyaoText";
import { migrations } from "../data/migrations";
import { saveArchive } from "../services/archiveService";
import { getSession } from "../services/sessionService";
import { buildFinalChoiceCode } from "../services/trajectoryService";

export function MigrationPage() {
  const navigate = useNavigate();
  const [isExpanded, setIsExpanded] = useState(false);
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
    <GuanyaoShell className="gy-delivery-shell" density="compact">
      <section className="gy-delivery-stage gy-causal-line gy-causal-line-press gyFadeRise">
        <div className="gy-result-hero">
          <GuanyaoText className="gy-text-instrument" as="span" size="eyebrow" tone="gold">
            迁移压印
          </GuanyaoText>
          <GuanyaoText as="h2" size="title">
            人格迁移已压印
          </GuanyaoText>
          <GuanyaoText className="gy-migration-verdict" size="body" tone="muted">
            {card.cardTitle}
          </GuanyaoText>
        </div>

        <div className="gy-result-frame">
          <div className="gy-result-code gy-result-code--primary">
            <GuanyaoText className="gy-text-muted-coord" as="span" size="eyebrow" tone="faint">
              轨迹代码
            </GuanyaoText>
            <GuanyaoText size="body" tone="gold">
              {finalChoiceCode}
            </GuanyaoText>
          </div>
          <div>
            <GuanyaoText className="gy-text-muted-coord" as="span" size="eyebrow" tone="faint">
              当前轨迹
            </GuanyaoText>
            <GuanyaoText size="body">
              {card.currentTrack.code} {card.currentTrack.traditionalName}
              {card.currentTrack.scriptTitle}
            </GuanyaoText>
          </div>
          <GuanyaoText className="gy-result-arrow" size="title" tone="gold">
            ↓
          </GuanyaoText>
          <div>
            <GuanyaoText className="gy-text-muted-coord" as="span" size="eyebrow" tone="faint">
              迁移方向
            </GuanyaoText>
            <GuanyaoText size="body">
              {card.migrationDirection.code} {card.migrationDirection.traditionalName}
              {card.migrationDirection.scriptTitle}
            </GuanyaoText>
          </div>
        </div>

        <div className="gy-delivery-copy gy-delivery-copy--compact gy-result-core-copy">
          {["前五爻不是选择。", "它们只是惯性替你走完的轨迹。", "最后一爻，才暴露你是否愿意停下那条旧路。"].map((line) => (
            <GuanyaoText key={line} size="body" tone="muted">
              {line}
            </GuanyaoText>
          ))}
        </div>

        <div className="gy-delivery-actions">
          <GuanyaoButton className="gy-behavior-gate gy-behavior-gate-secondary" variant="ghost" onClick={() => setIsExpanded((current) => !current)}>
            {isExpanded ? "收起 90 天剧本" : "展开 90 天惯性冲突剧本"}
          </GuanyaoButton>
          <GuanyaoButton className="gy-behavior-gate gy-behavior-gate-save" variant="gate" onClick={handleSave}>
            保存到人格档案
          </GuanyaoButton>
        </div>

        {isExpanded ? (
          <div className="gy-analysis-stack gyFadeRise">
            <details className="gy-analysis-card">
              <summary>第0幕｜出厂重力坐标</summary>
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
            </details>
            <details className="gy-analysis-card">
              <summary>90天惯性冲突剧本</summary>
              {[card.conflictScript90d.act1, card.conflictScript90d.act2, card.conflictScript90d.act3].map((act) => (
                <section key={act.title}>
                  <h3>{act.title}</h3>
                  <TextLines lines={act.lines} />
                </section>
              ))}
            </details>
            <details className="gy-analysis-card">
              <summary>反本能节点</summary>
              <p>{card.antiInstinctNode}</p>
            </details>
            <details className="gy-analysis-card">
              <summary>轨迹代码</summary>
              <p>{finalChoiceCode}</p>
              <p>
                {card.currentTrack.code} → {card.migrationDirection.code}
              </p>
            </details>
          </div>
        ) : null}
      </section>
    </GuanyaoShell>
  );
}
