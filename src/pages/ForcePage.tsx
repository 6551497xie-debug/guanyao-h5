import { useEffect } from "react";
import { Link } from "react-router-dom";
import { GuanyaoShell } from "../components/visual/GuanyaoShell";
import { GuanyaoText } from "../components/visual/GuanyaoText";
import { getForceReading } from "../data/forceReadings";
import { normalizeSceneForceId } from "../services/sceneService";
import { getSession, updateSession } from "../services/sessionService";

const forceActionLines: Record<string, string[]> = {
  乾: ["母码线索已锁定。", "母码驱动的反应很快：一遇到压力，你会先把局面抓回手里。", "不是因为你真的稳，而是失控会让你觉得自己正在掉下去。"],
  坤: ["母码线索已锁定。", "母码驱动的反应很快：一遇到压力，你会先把别人托住。", "不是因为你不累，而是你太习惯把自己的需要往后放。"],
  震: ["母码线索已锁定。", "母码驱动的反应很快：一遇到压力，你会先动起来。", "不是因为你真的有方向，而是停下来会让问题变得太清楚。"],
  巽: ["母码线索已锁定。", "母码驱动的反应很快：一遇到压力，你会先观察风向。", "不是因为你没有立场，而是正面冲突会让你太快暴露自己。"],
  坎: ["母码线索已锁定。", "母码驱动的反应很快：一遇到压力，你会先沉下去。", "不是因为你真的冷静，而是把事情说出来会让危险变得太近。"],
  离: ["母码线索已锁定。", "母码驱动的反应很快：一遇到压力，你会先让自己看起来还亮着。", "不是因为你不累，而是暗下来会让你觉得自己快要消失。"],
  艮: ["母码线索已锁定。", "母码驱动的反应很快：一遇到压力，你会先停住。", "不是因为你真的冷静，而是往前一步会让问题变得太真实。"],
  兑: ["母码线索已锁定。", "母码驱动的反应很快：一遇到压力，你会先把关系稳住。", "不是因为你没有边界，而是冷场会让你害怕关系直接断掉。"],
};

const forceHighlightTokens = [
  "抓回手里",
  "托住",
  "先动起来",
  "观察风向",
  "沉下去",
  "看起来还亮着",
  "停住",
  "稳住",
  "停下来",
  "太清楚",
  "失控",
  "冲突",
  "暴露",
  "危险",
  "真实",
  "冷场",
  "断掉",
  "下坠",
];

const forceMonitorAxes: Record<string, { id: string; label: string; value: string }[]> = {
  乾: [
    { id: "01", label: "现实高压", value: "抓回手里" },
    { id: "02", label: "控制防御", value: "停下 = 坠落" },
    { id: "03", label: "失控恐惧", value: "失控 = 下坠" },
  ],
  坤: [
    { id: "01", label: "现实高压", value: "先托住" },
    { id: "02", label: "责任防御", value: "放下 = 亏欠" },
    { id: "03", label: "需求压低", value: "自己后置" },
  ],
  震: [
    { id: "01", label: "现实高压", value: "先动起来" },
    { id: "02", label: "动作防御", value: "停下 = 暴露" },
    { id: "03", label: "失重恐惧", value: "空白 = 下坠" },
  ],
  巽: [
    { id: "01", label: "现实高压", value: "观察风向" },
    { id: "02", label: "回避防御", value: "冲突 = 暴露" },
    { id: "03", label: "边界摇摆", value: "正面太近" },
  ],
  坎: [
    { id: "01", label: "现实高压", value: "先沉下去" },
    { id: "02", label: "深潜防御", value: "说出 = 危险" },
    { id: "03", label: "风险感知", value: "危险贴近" },
  ],
  离: [
    { id: "01", label: "现实高压", value: "保持发亮" },
    { id: "02", label: "外显防御", value: "暗下 = 消失" },
    { id: "03", label: "评价牵引", value: "必须被看见" },
  ],
  艮: [
    { id: "01", label: "现实高压", value: "先停住" },
    { id: "02", label: "冻结防御", value: "前进 = 真实" },
    { id: "03", label: "拖延牵引", value: "不动保命" },
  ],
  兑: [
    { id: "01", label: "现实高压", value: "稳住关系" },
    { id: "02", label: "关系防御", value: "冷场 = 断掉" },
    { id: "03", label: "外放牵引", value: "先把话接住" },
  ],
};

function renderForceLine(line: string) {
  const token = forceHighlightTokens.find((highlightToken) => line.includes(highlightToken));

  if (!token) {
    return line;
  }

  const [before, after] = line.split(token);

  return (
    <>
      {before}
      <span>{token}</span>
      {after}
    </>
  );
}

export function ForcePage() {
  const session = getSession();
  const primaryForce = session.selectedFragment?.forceMapping?.[0];
  const forceReadingTemplate = getForceReading(primaryForce);
  const forceLines = forceActionLines[forceReadingTemplate.forceKey] ?? forceReadingTemplate.coreMirror ?? [];
  const forceName = `${forceReadingTemplate.symbol}｜${forceReadingTemplate.archetype}`;
  const forceImpulseLine = (forceLines[1] ?? "").replace("它背后有一股力：", "母码驱动的反应很快：");
  const forceReactionLine = forceImpulseLine.replace("母码驱动的反应很快：", "");
  const forceDissectionLine = forceLines[2] ?? "";
  const monitorAxes = forceMonitorAxes[forceReadingTemplate.forceKey] ?? forceMonitorAxes.乾;

  useEffect(() => {
    document.body.classList.add("gy-force-r1-mode");
    return () => document.body.classList.remove("gy-force-r1-mode");
  }, []);

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
    <GuanyaoShell className="gy-force-shell" density="compact">
      <section className="gy-force-r1-screen" data-intensity="fixed">
        <header className="gy-force-r1-header gyFadeRise">
          <GuanyaoText className="gy-force-r1-coord" as="span" size="eyebrow" tone="faint">
            GY / 02 / MOTHER_LOCK
          </GuanyaoText>
          <GuanyaoText className="gy-force-r1-status" as="span" size="eyebrow" tone="faint">
            行为母码冷凝中
          </GuanyaoText>
          <GuanyaoText className="gy-force-r1-title" as="h1" size="title">
            母码驱动已锁定
          </GuanyaoText>
        </header>

        <main className="gy-force-r1-main gyFadeRise">
          <section className="gy-force-r1-lock" aria-label="母码驱动锁定舱">
            <div className="gy-force-r1-code">
              <GuanyaoText as="span" size="eyebrow" tone="faint">
                Code {forceReadingTemplate.code}
              </GuanyaoText>
              <GuanyaoText as="span" size="eyebrow" tone="gold">
                {forceName}
              </GuanyaoText>
            </div>
            <GuanyaoText className="gy-force-r1-lock-state" as="span" size="eyebrow" tone="faint">
              母码线索已锁定｜驱动源冷凝完成
            </GuanyaoText>
            <div className="gy-force-r1-axis" aria-label="三轴识别监视面板">
              <span className="gy-force-r1-anchor" />
              <div className="gy-force-r1-axis-readouts">
                {monitorAxes.map((axis) => (
                  <span className="gy-force-r1-axis-row" key={axis.id}>
                    <span>识别轴 {axis.id} · {axis.label}</span>
                    <strong>{axis.value}</strong>
                  </span>
                ))}
              </div>
            </div>
          </section>

          <section className="gy-force-r1-dissection" aria-label="母码驱动解剖舱">
            <GuanyaoText className="gy-force-r1-response-readout" as="p" size="body" tone="muted">
              [ 状态：母码驱动 ➔ No.{forceReadingTemplate.code} {forceReadingTemplate.archetype} ]
            </GuanyaoText>
            <div className="gy-force-r1-copy-block">
              {forceReactionLine ? (
                <GuanyaoText as="p" size="body" tone="muted">
                  {renderForceLine(forceReactionLine)}
                </GuanyaoText>
              ) : null}
            </div>
            {forceDissectionLine ? (
              <GuanyaoText className="gy-force-r1-cold-line" as="p" size="body" tone="muted">
                {renderForceLine(forceDissectionLine)}
              </GuanyaoText>
            ) : null}
          </section>
        </main>

        <footer className="gy-force-r1-gate gyFadeRise">
          <GuanyaoText className="gy-force-r1-gate-note" as="p" size="eyebrow" tone="faint">
            外部压力信号待接入。
          </GuanyaoText>
          <Link className="gy-force-r1-gate-link" to="/scene" onClick={persistForceReading}>
            <GuanyaoText as="span" size="body" tone="default">
              接入现实触发证据
            </GuanyaoText>
          </Link>
        </footer>
      </section>
    </GuanyaoShell>
  );
}
