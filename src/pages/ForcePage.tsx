import { useState } from "react";
import { Link } from "react-router-dom";
import { TextLines } from "../components/TextLines";
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
  const [recordMessage, setRecordMessage] = useState("");
  const [savedReading, setSavedReading] = useState<typeof forceReadingTemplate & { createdAt: string }>();

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

  function handleRecord() {
    const forceReading = persistForceReading();

    setSavedReading(forceReading);
    setRecordMessage("已记录本次原力定格");
  }

  return (
    <GuanyaoShell density="compact">
      <section className="gy-front-screen gy-front-instrument gy-force-screen" data-intensity="fixed">
        <div className="gy-front-copy gyFadeRise">
          <GuanyaoText className="gy-text-muted-coord" as="span" size="eyebrow" tone="faint">
            GY / 02 / FORCE
          </GuanyaoText>
          <GuanyaoText className="gy-force-readout" as="h2" size="title">
            原力定格
          </GuanyaoText>
          <GuanyaoText className="gy-text-instrument" size="body" tone="faint">
            引力场已确立
          </GuanyaoText>
        </div>
        <article className="gy-front-panel gy-force-imprint gyFadeRise">
          <div className="gy-front-meta">
            <GuanyaoText as="span" size="eyebrow" tone="faint">
              Code {forceReadingTemplate.code}
            </GuanyaoText>
            <GuanyaoText as="span" size="eyebrow" tone="gold">
              {forceReadingTemplate.symbol} {forceReadingTemplate.forceName} · {forceReadingTemplate.archetype}
            </GuanyaoText>
          </div>
          <div className="gy-front-lines">
            {["它不是你的标签。", "它是你此刻与现实重力对撞时，", "最先燃尽的那股原力。"].map((line) => (
              <GuanyaoText key={line} size="body" tone="muted">
                {line}
              </GuanyaoText>
            ))}
          </div>
        </article>
        <div className="gy-front-actions">
          <GuanyaoButton variant="secondary" onClick={handleRecord}>
            记录解卦
          </GuanyaoButton>
          <Link to="/scene" onClick={persistForceReading}>
            <GuanyaoButton className="gy-front-gate" as="span" variant="ghost">
              继续探索
            </GuanyaoButton>
          </Link>
        </div>
        <div className="gy-front-note">
          {recordMessage ? (
            <GuanyaoText size="body" tone="gold">
              {recordMessage}
            </GuanyaoText>
          ) : null}
        </div>
      {savedReading ? (
        <article className="reading-panel gyFadeRise">
          <GuanyaoText as="h3" size="body">
            原力解卦已记录
          </GuanyaoText>
          <section>
            <strong>原力定格</strong>
            <p>Code {savedReading.code}</p>
            <p>
              {savedReading.symbol} {savedReading.forceName} · {savedReading.archetype}
            </p>
          </section>
          <section>
            <strong>核心映照</strong>
            <TextLines lines={savedReading.coreMirror} />
          </section>
          <section>
            <strong>防御机制</strong>
            <TextLines lines={savedReading.defensePattern} />
          </section>
          <section>
            <strong>当前提醒</strong>
            <TextLines lines={savedReading.currentReminder} />
          </section>
        </article>
      ) : null}
      </section>
    </GuanyaoShell>
  );
}
