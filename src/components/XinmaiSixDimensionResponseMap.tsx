import { useEffect, useState } from "react";
import { recoverXinmaiSixDimensionSemanticSelection } from "../services/xinmaiSixDimensionSemanticSelectionRecoveryAdapter";
import {
  resolveXinmaiMicroActionCausalExplanation,
  resolveXinmaiSixDimensionResponseMapPresentation,
} from "../services/xinmaiSixDimensionResponseMapPresentationResolver";
import type { XinmaiSixDimensionResponseMapPresentation } from "../types/xinmaiSixDimensionResponseMapPresentation";
import { resolveXinmaiJourneySemanticPresentation } from "../services/xinmaiJourneySemanticPresentationResolver";

export function XinmaiSixDimensionResponseMap({
  observationSetId,
  realityTrigger,
  microAction,
  compact = false,
  onReadyChange,
}: Readonly<{
  observationSetId: string;
  realityTrigger?: string;
  microAction?: string;
  compact?: boolean;
  onReadyChange?: (ready: boolean) => void;
}>) {
  const semantic = resolveXinmaiJourneySemanticPresentation("RESPONSE_MAP");
  const [presentation, setPresentation] =
    useState<XinmaiSixDimensionResponseMapPresentation | null>(null);

  useEffect(() => {
    let cancelled = false;
    onReadyChange?.(false);
    void recoverXinmaiSixDimensionSemanticSelection(observationSetId)
      .then((recovery) =>
        resolveXinmaiSixDimensionResponseMapPresentation(
          recovery,
          realityTrigger,
        ))
      .then((next) => {
        if (!cancelled) {
          setPresentation(next);
          onReadyChange?.(next.state !== "SAFE_WITHHELD");
        }
      });
    return () => {
      cancelled = true;
      onReadyChange?.(false);
    };
  }, [observationSetId, onReadyChange, realityTrigger]);

  if (presentation === null) {
    return <p role="status" aria-live="polite">正在取回你刚才的六个观察……</p>;
  }
  if (presentation.state === "LEGACY_GENERIC_ONLY") {
    return (
      <section className="xinmai-response-map xinmai-response-map--legacy" aria-label="六维观察回看">
        <h3>你曾从六个窗口看过这段现实</h3>
        <p>这段较早的记录没有保存每一项具体选择，因此这里不替你补写答案。</p>
      </section>
    );
  }
  if (presentation.state === "SAFE_WITHHELD") {
    return (
      <section className="xinmai-response-map xinmai-response-map--withheld" aria-label="六维观察暂不可用">
        <h3>这次观察仍被保留</h3>
        <p>具体选择暂时无法安全取回，因此这里不作推断。</p>
      </section>
    );
  }
  return (
    <section
      className={`xinmai-response-map${compact ? " xinmai-response-map--compact" : ""}`}
      aria-label="我刚才选择的六维回应图谱"
      data-six-dimension-response-map="EXACT_PERSISTED_SELECTIONS"
    >
      <header>
        <span>现实情境</span>
        <h3>{semantic.purpose}</h3>
        <blockquote>{presentation.realityTrigger}</blockquote>
      </header>
      <dl aria-label="自动反应路径">
        {presentation.items.map((item) => (
          <div key={item.dimensionId} data-response-map-dimension={item.dimensionId}>
            <dt>{item.dimensionLabel}</dt>
            <dd>{item.selectedMeaning}</dd>
          </div>
        ))}
      </dl>
      <section className="xinmai-response-map__three-layer" aria-label="三种同时在场的力量" data-three-layer-authority="PRESENTATION_ONLY_NO_WRITE">
        <h4>这条路径里，三种力量可能同时在场</h4>
        <ul>
          <li><b>生存：</b>身体与安全正在保护什么？</li>
          <li><b>社会：</b>关系、身份或规则正在要求什么？</li>
          <li><b>文明：</b>你愿意把什么价值带到未来？</li>
        </ul>
      </section>
      {microAction ? (
        <p className="xinmai-response-map__causal" data-micro-action-causal-explanation="EXACT_ACTION_GOAL_CHOICE">
          {resolveXinmaiMicroActionCausalExplanation(
            presentation.actionSemanticResponseId,
            presentation.goalSemanticResponseId,
            microAction,
          )}
        </p>
      ) : null}
    </section>
  );
}
