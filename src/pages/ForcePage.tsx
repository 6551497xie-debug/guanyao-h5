import { Link } from "react-router-dom";
import { GuanyaoButton } from "../components/visual/GuanyaoButton";
import { GuanyaoShell } from "../components/visual/GuanyaoShell";
import { GuanyaoText } from "../components/visual/GuanyaoText";
import { getForceReading } from "../data/forceReadings";
import { normalizeSceneForceId } from "../services/sceneService";
import { getSession, updateSession } from "../services/sessionService";

export function ForcePage() {
  const session = getSession();
  const primaryForce = session.selectedFragment?.forceMapping?.[0];
  const forceReadingTemplate = getForceReading(primaryForce);

  function persistForceReading() {
    const forceReading = {
      ...forceReadingTemplate,
      createdAt: new Date().toISOString(),
    };

    updateSession({
      selectedFragment: session.selectedFragment,
      selectedForceId: normalizeSceneForceId(forceReadingTemplate.forceKey),
      selectedForceName: `${forceReadingTemplate.symbol} ${forceReadingTemplate.forceName} · ${forceReadingTemplate.archetype}`,
      forceProfile: forceReading,
      forceReading,
    });

    return forceReading;
  }

  return (
    <GuanyaoShell density="compact">
      <section className="gy-front-screen gy-front-instrument gy-force-screen gy-causal-line gy-causal-line-compress" data-intensity="fixed">
        <div className="gy-front-copy gyFadeRise">
          <GuanyaoText className="gy-text-muted-coord" as="span" size="eyebrow" tone="faint">
            GY / 02 / FORCE
          </GuanyaoText>
          <GuanyaoText className="gy-force-readout" as="h2" size="title">
            原力已定格
          </GuanyaoText>
          <GuanyaoText className="gy-text-instrument" size="body" tone="faint">
            你刚认领的人格碎片，正在沉入本次原力。
          </GuanyaoText>
        </div>
        <article className="gy-front-panel gy-force-imprint gy-force-press-readout gyFadeRise">
          <div className="gy-front-meta">
            <GuanyaoText as="span" size="eyebrow" tone="faint">
              Code {forceReadingTemplate.code}
            </GuanyaoText>
            <GuanyaoText as="span" size="eyebrow" tone="gold">
              {forceReadingTemplate.symbol} {forceReadingTemplate.forceName} · {forceReadingTemplate.archetype}
            </GuanyaoText>
          </div>
          <div className="gy-front-lines">
            {["是一股正在推动你反复行动的力量。", "你不是热爱行动。", "你只是太害怕一停下来，就看见真正的问题还在原地。"].map((line) => (
              <GuanyaoText key={line} size="body" tone="muted">
                {line}
              </GuanyaoText>
            ))}
          </div>
        </article>
        <div className="gy-front-actions">
          <Link to="/scene" onClick={persistForceReading}>
            <GuanyaoButton className="gy-front-gate gy-behavior-gate gy-behavior-gate-primary" as="span" variant="ghost">
              继续推进
            </GuanyaoButton>
          </Link>
        </div>
      </section>
    </GuanyaoShell>
  );
}
