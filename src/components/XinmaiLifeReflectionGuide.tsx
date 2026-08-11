import { useEffect, useMemo, useState } from "react";
import type { SixSpaceId } from "../runtime/guanyaoRuntimeTypes";
import { resolveXinmaiSixDimensionSemanticChoreography } from "../services/xinmaiSixDimensionSemanticChoreographyResolver";
import { resolveXinmaiJourneySemanticPresentation } from "../services/xinmaiJourneySemanticPresentationResolver";
import type { XinmaiSixDimensionSemanticResponse } from "../types/xinmaiSixDimensionSemanticChoreography";

type ReflectionPhase =
  | "OBSERVING" | "FIRST_APPROACH" | "SECOND_APPROACH" | "THIRD_APPROACH"
  | "CONFIRMED" | "SELF_NAMED" | "PAUSED";

type XinmaiLifeReflectionGuideProps = Readonly<{
  surface: "REALITY" | "REFLECTION";
  dimensionId?: SixSpaceId;
  dimensionStep?: number;
  phase?: ReflectionPhase;
  observation?: string;
  onConfirm?: () => void;
  onSelfName?: () => void;
  onPause?: () => void;
  onResume?: () => void;
  finalActionState?: "PREPARING" | "READY" | "SAVING" | "RETRYABLE" | "SAFE_WITHHELD";
  onContinue?: (
    response: XinmaiSixDimensionSemanticResponse,
  ) => Promise<boolean>;
}>;

export function XinmaiLifeReflectionGuide({
  surface,
  dimensionId = "body",
  dimensionStep = 1,
  phase = "OBSERVING",
  observation,
  onConfirm,
  onSelfName,
  onPause,
  onResume,
  finalActionState = "READY",
  onContinue,
}: XinmaiLifeReflectionGuideProps) {
  const grammar = useMemo(
    () => resolveXinmaiSixDimensionSemanticChoreography(dimensionId),
    [dimensionId],
  );
  const semantic = resolveXinmaiJourneySemanticPresentation(
    dimensionId.toUpperCase() as "BODY" | "EMOTION" | "THOUGHT" | "ACTION" | "MEMORY" | "GOAL",
  );
  const [selectedResponse, setSelectedResponse] =
    useState<XinmaiSixDimensionSemanticResponse | null>(null);
  const [continuePending, setContinuePending] = useState(false);
  const [savedAnnouncement, setSavedAnnouncement] = useState("");

  useEffect(() => {
    setSelectedResponse(null);
    setContinuePending(false);
    setSavedAnnouncement("");
  }, [dimensionId, dimensionStep]);

  if (surface === "REALITY") {
    return (
      <aside className="xinmai-life-reflection-guide xinmai-life-reflection-guide--reality" aria-hidden="true">
        <span>现实观察</span><strong>现实发生时，看看你的回应怎样出现。</strong>
      </aside>
    );
  }

  const relationEstablished = phase === "CONFIRMED" || phase === "SELF_NAMED";
  const finalDisabled =
    selectedResponse === null ||
    continuePending || finalActionState === "PREPARING" ||
    finalActionState === "SAVING" || finalActionState === "SAFE_WITHHELD";
  const readinessCopy =
    finalActionState === "PREPARING" ? "这一维观察正在准备，尚未保存。" :
    finalActionState === "SAVING" || continuePending ? "正在保存这一维观察。" :
    finalActionState === "RETRYABLE" ? "这次观察还没有保存，可以重新尝试。" :
    finalActionState === "SAFE_WITHHELD" ? "这一维暂时无法保存，已有生命记录仍被保留。" :
    "你的选择只在当前画面中；确认保存后才会成为这一维观察。";

  function chooseResponse(response: XinmaiSixDimensionSemanticResponse) {
    setSelectedResponse(response);
    setSavedAnnouncement("");
    if (response.mode === "PAUSE") onPause?.();
    else if (response.mode === "KEEP_OWN_MEANING") onSelfName?.();
    else onConfirm?.();
  }

  return (
    <aside
      className="xinmai-life-reflection-guide xinmai-life-reflection-guide--reflection xinmai-six-dimension-semantic"
      data-xinmai-reflection-guide="SIX_DIMENSION_DIFFERENTIATED_SEMANTIC"
      data-xinmai-semantic-dimension={dimensionId}
      data-xinmai-spatial-mode={grammar.spatialMode}
      data-xinmai-visual-semantic-policy={grammar.presentationMode}
      data-xinmai-authority-boundary="FINAL_ACKNOWLEDGEMENT_ONLY"
      aria-labelledby={`xinmai-six-question-${dimensionId}`}
    >
      <header className="xinmai-six-dimension-semantic__header">
        <span>{dimensionStep}/6 · {grammar.label}</span>
        <b>{selectedResponse ? "尚未保存" : "等待选择"}</b>
      </header>
      <p className="xinmai-six-dimension-semantic__purpose">{semantic.explanation}</p>
      <div className="xinmai-six-dimension-semantic__scene-cue" aria-hidden="true"><i /></div>
      <p className="xinmai-six-dimension-semantic__source">{observation}</p>
      <h2 id={`xinmai-six-question-${dimensionId}`}>{grammar.question}</h2>

      {phase === "PAUSED" ? (
        <div className="xinmai-six-dimension-semantic__pause" role="status">
          <p>{selectedResponse?.mirror ?? "这次观察停在这里，尚未保存。"}</p>
          <button type="button" onClick={onResume}>回到这个问题</button>
        </div>
      ) : !relationEstablished ? (
        <div className="xinmai-six-dimension-semantic__responses" role="group" aria-label={`${grammar.label}观察选项`}>
          {grammar.responses.map((response) => (
            <button key={response.id} type="button" onClick={() => chooseResponse(response)}>
              {response.label}
            </button>
          ))}
        </div>
      ) : (
        <div className="xinmai-six-dimension-semantic__acknowledgement">
          <p className="xinmai-six-dimension-semantic__mirror" role="status" aria-live="polite">
            {selectedResponse?.mirror ?? "你的理解已被保留；这一维仍未保存。"}
          </p>
          <p className="xinmai-six-dimension-semantic__readiness" role="status" aria-live="polite">{readinessCopy}</p>
          <button
            className="xinmai-six-dimension-semantic__primary"
            type="button"
            disabled={finalDisabled}
            aria-busy={continuePending || finalActionState === "PREPARING" || finalActionState === "SAVING" ? "true" : undefined}
            onClick={async () => {
              if (finalDisabled) return;
              setContinuePending(true);
              try {
                if (selectedResponse === null) return;
                const saved = await onContinue?.(selectedResponse);
                if (saved) setSavedAnnouncement(`${grammar.label}观察已保存。`);
              } finally { setContinuePending(false); }
            }}
          >
            {continuePending || finalActionState === "SAVING" ? "正在保存" :
             finalActionState === "PREPARING" ? "这一维观察正在准备" :
             finalActionState === "RETRYABLE" ? `重新${grammar.acknowledgementLabel}` :
             finalActionState === "SAFE_WITHHELD" ? "这一维暂时无法保存" : grammar.acknowledgementLabel}
          </button>
          {finalActionState === "SAFE_WITHHELD" ? <button type="button" onClick={onPause}>先停在这里</button> : null}
          <span className="xinmai-six-dimension-semantic__saved" aria-live="polite">{savedAnnouncement}</span>
        </div>
      )}
      <p className="xinmai-six-dimension-semantic__boundary">这里只保存你明确确认的观察；下一步仍由你决定。</p>
    </aside>
  );
}
