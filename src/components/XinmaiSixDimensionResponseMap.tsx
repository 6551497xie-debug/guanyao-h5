import { useEffect, useState } from "react";
import { recoverXinmaiSixDimensionSemanticSelection } from "../services/xinmaiSixDimensionSemanticSelectionRecoveryAdapter";
import { resolveXinmaiSixDimensionResponseMapPresentation } from "../services/xinmaiSixDimensionResponseMapPresentationResolver";
import type { XinmaiSixDimensionResponseMapPresentation } from "../types/xinmaiSixDimensionResponseMapPresentation";

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
        <span>触碰你的现实</span>
        <h3>{presentation.realityTrigger}</h3>
      </header>
      <dl>
        {presentation.items.map((item) => (
          <div key={item.dimensionId} data-response-map-dimension={item.dimensionId}>
            <dt>{item.dimensionLabel}</dt>
            <dd>{item.selectedMeaning}</dd>
          </div>
        ))}
      </dl>
      {microAction ? (
        <p className="xinmai-response-map__causal" data-micro-action-causal-explanation="EXACT_ACTION_GOAL_CHOICE">
          因为你先出现了【{presentation.actionImpulse}】，同时在保护【{presentation.protectedNeed}】，所以下一次先尝试【{microAction}】。
        </p>
      ) : null}
    </section>
  );
}
