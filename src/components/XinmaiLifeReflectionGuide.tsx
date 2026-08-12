import { useEffect, useMemo, useRef, useState } from "react";
import type { SixSpaceId } from "../runtime/guanyaoRuntimeTypes";
import { resolveXinmaiSixDimensionSemanticChoreography } from "../services/xinmaiSixDimensionSemanticChoreographyResolver";
import { requireXinmaiFormalStatePresentation } from "../services/xinmaiSemanticConstitutionFormalStateMatrix";
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
  onConfirm?: () => boolean | void | Promise<boolean | void>;
  onSelfName?: () => boolean | void | Promise<boolean | void>;
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
  const [selectedResponse, setSelectedResponse] =
    useState<XinmaiSixDimensionSemanticResponse | null>(null);
  const [continuePending, setContinuePending] = useState(false);
  const [savedAnnouncement, setSavedAnnouncement] = useState("");
  const [relationReady, setRelationReady] = useState(false);
  const committedResponseRef = useRef<string | null>(null);

  useEffect(() => {
    setSelectedResponse(null);
    setContinuePending(false);
    setSavedAnnouncement("");
    setRelationReady(false);
    committedResponseRef.current = null;
  }, [dimensionId, dimensionStep]);

  if (surface === "REALITY") {
    return (
      <aside className="xinmai-life-reflection-guide xinmai-life-reflection-guide--reality" aria-hidden="true">
        <span>现实观察</span><strong>现实发生时，看看你的回应怎样出现。</strong>
      </aside>
    );
  }

  const relationEstablished = relationReady || phase === "CONFIRMED" || phase === "SELF_NAMED";
  const formalSixState = finalActionState === "PREPARING"
    ? "PREPARING"
    : finalActionState === "SAVING"
      ? "SAVING"
      : finalActionState === "RETRYABLE"
        ? "RETRYABLE"
        : finalActionState === "SAFE_WITHHELD"
          ? "NON_RETRYABLE"
          : "OPEN";
  const finalDisabled = selectedResponse === null || continuePending ||
    finalActionState === "PREPARING" || finalActionState === "SAVING" ||
    finalActionState === "SAFE_WITHHELD";
  const formalSixPresentation = requireXinmaiFormalStatePresentation(
    "SIX_DIMENSION",
    formalSixState,
  );

  async function saveResponse(response: XinmaiSixDimensionSemanticResponse) {
    if (
      committedResponseRef.current === response.id ||
      continuePending ||
      finalActionState === "PREPARING" ||
      finalActionState === "SAVING" ||
      finalActionState === "SAFE_WITHHELD"
    ) return;
    setContinuePending(true);
    try {
      const saved = await onContinue?.(response);
      if (saved) {
        committedResponseRef.current = response.id;
        setSavedAnnouncement(`${grammar.label}已加入反应路径。`);
      }
    } finally {
      setContinuePending(false);
    }
  }

  async function chooseResponse(response: XinmaiSixDimensionSemanticResponse) {
    setSelectedResponse(response);
    setSavedAnnouncement("");
    if (response.mode === "PAUSE") {
      onPause?.();
      return;
    }
    const relationResult = response.mode === "KEEP_OWN_MEANING"
      ? await onSelfName?.()
      : await onConfirm?.();
    if (relationResult === false) return;
    setRelationReady(true);
    if (finalActionState === "READY" || finalActionState === "RETRYABLE") {
      await saveResponse(response);
    }
  }

  useEffect(() => {
    if (
      selectedResponse !== null &&
      relationEstablished &&
      (finalActionState === "READY" || finalActionState === "RETRYABLE") &&
      committedResponseRef.current !== selectedResponse.id &&
      !continuePending
    ) {
      void saveResponse(selectedResponse);
    }
  }, [continuePending, finalActionState, relationEstablished, selectedResponse]);

  const actNumber = dimensionStep <= 2 ? 1 : dimensionStep <= 4 ? 2 : 3;
  const actLabel = actNumber === 1 ? "信号" : actNumber === 2 ? "预测" : "模式与保护目标";

  return (
    <aside
      className="xinmai-life-reflection-guide xinmai-life-reflection-guide--reflection xinmai-six-dimension-semantic"
      data-xinmai-reflection-guide="SIX_DIMENSION_DIFFERENTIATED_SEMANTIC"
      data-xinmai-semantic-dimension={dimensionId}
      data-xinmai-spatial-mode={grammar.spatialMode}
      data-xinmai-visual-semantic-policy={grammar.presentationMode}
      data-xinmai-authority-boundary="FINAL_ACKNOWLEDGEMENT_ONLY"
      data-formal-journey-state={`SIX_DIMENSION/${formalSixPresentation.state}`}
      aria-labelledby={`xinmai-six-question-${dimensionId}`}
    >
      <header className="xinmai-six-dimension-semantic__header">
        <span>第 {actNumber} 幕 · {actLabel}</span>
        <b>{dimensionStep}/6</b>
      </header>
      <div className="xinmai-six-dimension-semantic__scene-cue" aria-hidden="true"><i /></div>
      {dimensionStep === 1 ? <p className="xinmai-six-dimension-semantic__source">{observation}</p> : null}
      <h2 id={`xinmai-six-question-${dimensionId}`}>{grammar.question}</h2>

      {phase === "PAUSED" ? (
        <div className="xinmai-six-dimension-semantic__pause" role="status">
          <p>{selectedResponse?.mirror ?? "这次观察停在这里，尚未保存。"}</p>
          <button type="button" onClick={onResume}>回到这个问题</button>
        </div>
      ) : selectedResponse === null ? (
        <div className="xinmai-six-dimension-semantic__responses" role="group" aria-label={`${grammar.label}观察选项`}>
          {grammar.responses.map((response) => (
            <button
              key={response.id}
              type="button"
              onClick={(event) => {
                event.currentTarget.blur();
                void chooseResponse(response);
              }}
            >
              {response.label}
            </button>
          ))}
        </div>
      ) : (
        <div className="xinmai-six-dimension-semantic__acknowledgement">
          <p className="xinmai-six-dimension-semantic__mirror" role="status" aria-live="polite">
            {selectedResponse.mirror}
          </p>
          {continuePending || finalActionState === "PREPARING" || finalActionState === "SAVING" ? (
            <p className="xinmai-six-dimension-semantic__readiness" role="status" aria-live="polite">
              {finalActionState === "PREPARING" ? "正在准备保存；你的选择还没有丢失。" : "正在加入反应路径…"}
            </p>
          ) : null}
          {finalActionState === "RETRYABLE" ? <button className="xinmai-six-dimension-semantic__primary" type="button" disabled={finalDisabled} onClick={() => void saveResponse(selectedResponse)}>重新加入路径</button> : null}
          {finalActionState === "SAFE_WITHHELD" ? (
            <div role="status">
              <p className="xinmai-six-dimension-semantic__readiness">这次选择暂时不能保存；已经完成的步骤不受影响。</p>
              <button type="button" onClick={onPause}>先停在这里</button>
            </div>
          ) : null}
          <span className="xinmai-six-dimension-semantic__saved" aria-live="polite">{savedAnnouncement}</span>
        </div>
      )}
      {selectedResponse === null ? <p className="xinmai-six-dimension-semantic__boundary">选最接近的一项，路径会自动继续。</p> : null}
    </aside>
  );
}
