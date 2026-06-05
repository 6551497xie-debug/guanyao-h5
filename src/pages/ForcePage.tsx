import { Link } from "react-router-dom";
import { GuanyaoButton } from "../components/visual/GuanyaoButton";
import { GuanyaoShell } from "../components/visual/GuanyaoShell";
import { GuanyaoText } from "../components/visual/GuanyaoText";
import { getForceReading } from "../data/forceReadings";
import { normalizeSceneForceId } from "../services/sceneService";
import { getSession, updateSession } from "../services/sessionService";

const forceActionLines: Record<string, string[]> = {
  乾: ["你认领的，不只是一个状态。", "它背后有一股力：一遇到压力，你会先把局面抓回手里。", "不是因为你真的稳，而是失控会让你觉得自己正在掉下去。"],
  坤: ["你认领的，不只是一个状态。", "它背后有一股力：一遇到压力，你会先把别人托住。", "不是因为你不累，而是你太习惯把自己的需要往后放。"],
  震: ["你认领的，不只是一个状态。", "它背后有一股力：一遇到压力，你会先动起来。", "不是因为你真的有方向，而是停下来会让问题变得太清楚。"],
  巽: ["你认领的，不只是一个状态。", "它背后有一股力：一遇到压力，你会先观察风向。", "不是因为你没有立场，而是正面冲突会让你太快暴露自己。"],
  坎: ["你认领的，不只是一个状态。", "它背后有一股力：一遇到压力，你会先沉下去。", "不是因为你真的冷静，而是把事情说出来会让危险变得太近。"],
  离: ["你认领的，不只是一个状态。", "它背后有一股力：一遇到压力，你会先让自己看起来还亮着。", "不是因为你不累，而是暗下来会让你觉得自己快要消失。"],
  艮: ["你认领的，不只是一个状态。", "它背后有一股力：一遇到压力，你会先停住。", "不是因为你真的冷静，而是往前一步会让问题变得太真实。"],
  兑: ["你认领的，不只是一个状态。", "它背后有一股力：一遇到压力，你会先把关系稳住。", "不是因为你没有边界，而是冷场会让你害怕关系直接断掉。"],
};

export function ForcePage() {
  const session = getSession();
  const primaryForce = session.selectedFragment?.forceMapping?.[0];
  const forceReadingTemplate = getForceReading(primaryForce);
  const forceLines = [
    ...(forceActionLines[forceReadingTemplate.forceKey] ?? forceReadingTemplate.coreMirror ?? []),
    "这股力已经记录。下一步，把它放进正在发生的现实里。",
  ];

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
            刚才那块人格碎片，已经暴露出它背后的驱动力。
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
            {forceLines.map((line) => (
              <GuanyaoText key={line} size="body" tone="muted">
                {line}
              </GuanyaoText>
            ))}
          </div>
        </article>
        <div className="gy-front-actions">
          <Link to="/scene" onClick={persistForceReading}>
            <GuanyaoButton className="gy-front-gate gy-behavior-gate gy-behavior-gate-primary" as="span" variant="ghost">
              添加现实种子
            </GuanyaoButton>
          </Link>
        </div>
      </section>
    </GuanyaoShell>
  );
}
