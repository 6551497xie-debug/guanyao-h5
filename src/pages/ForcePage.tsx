import { useState } from "react";
import { Link } from "react-router-dom";
import { TextLines } from "../components/TextLines";
import { getForceReading } from "../data/forceReadings";
import { getSession, updateSession } from "../services/sessionService";

export function ForcePage() {
  const session = getSession();
  const primaryForce = session.selectedFragment?.forceMapping?.[0];
  const forceReadingTemplate = getForceReading(primaryForce);
  const [recordMessage, setRecordMessage] = useState("");
  const [savedReading, setSavedReading] = useState<typeof forceReadingTemplate & { createdAt: string }>();

  function handleRecord() {
    const forceReading = {
      ...forceReadingTemplate,
      createdAt: new Date().toISOString(),
    };

    updateSession({
      selectedFragment: session.selectedFragment,
      forceProfile: forceReading,
      forceReading,
    });
    setSavedReading(forceReading);
    setRecordMessage("已记录本次原力定格");
  }

  return (
    <section className="stage-card">
      <span>02 Force</span>
      <h2>
        原力定格，
        <br />
        引力场已确立。
      </h2>
      <p>Code {forceReadingTemplate.code}</p>
      <p>
        {forceReadingTemplate.symbol} {forceReadingTemplate.forceName} · {forceReadingTemplate.archetype}
      </p>
      <TextLines
        className="choice-copy"
        lines={["它不是你的标签。", "它是你此刻与现实重力对撞时，", "最先燃尽的那股原力。"]}
      />
      <div className="action-row">
        <button className="secondary-action" type="button" onClick={handleRecord}>
          记录解卦
        </button>
        <Link className="primary-action" to="/scene">
          继续探索
        </Link>
      </div>
      {recordMessage ? <p className="inline-note">{recordMessage}</p> : null}
      {savedReading ? (
        <article className="reading-panel">
          <h3>原力解卦已记录</h3>
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
  );
}
