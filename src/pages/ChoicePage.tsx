import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { getGuanyaoR8ReadModel } from "../adapters/guanyaoR8ReadModelAdapter";
import { CausalRail } from "../components/causal/CausalRail";
import { GUANYAO_ROUTES } from "../routes/guanyaoRoutes";
import {
  readPersistedBreachSelectionState,
  writeBreachSelectionState,
} from "../services/guanyaoBreachSelectionPersistenceAdapter";

export function ChoicePage() {
  const navigate = useNavigate();
  const [readModel] = useState(() => getGuanyaoR8ReadModel());
  const breaches = [
    {
      id: "main-cut",
      type: "primary",
      tag: "主要行动点",
      title: readModel.yaoStage.mainCut.spaceName,
      description: readModel.yaoStage.mainCut.completionReason,
      riskLine: "系统已标记最能改写旧反应的位置。",
    },
    {
      id: "secondary-cut",
      type: "secondary",
      tag: "辅助行动点",
      title: readModel.yaoStage.secondaryCut.spaceName,
      description: readModel.yaoStage.secondaryCut.completionReason,
      riskLine: "这一层不是终点，但已经出现明显信号。",
    },
    {
      id: "root-cut",
      type: "secondary",
      tag: "深层保护点",
      title: readModel.yaoStage.rootCut.spaceName,
      description: readModel.yaoStage.rootCut.completionReason,
      riskLine: "这里记录本局真正想保护的东西。",
    },
  ] as const;
  const [selectedBreachId, setSelectedBreachId] = useState(() => {
    return readPersistedBreachSelectionState()?.selectedBreachId ?? breaches[0].id;
  });

  const selectedBreach = breaches.find((breach) => breach.id === selectedBreachId) ?? breaches[0];

  function handleSelectBreach(breachId: string) {
    setSelectedBreachId(breachId);
    writeBreachSelectionState({ selectedBreachId: breachId });
  }

  function handleCommitCut() {
    writeBreachSelectionState({
      selectedBreachId: selectedBreach.id,
      assetStatus: "activated",
    });
    navigate(GUANYAO_ROUTES.yaoDevice);
  }

  return (
    <main
      style={{
        minHeight: "100dvh",
        width: "100%",
        boxSizing: "border-box",
        padding: "44px 20px calc(36px + env(safe-area-inset-bottom))",
        display: "flex",
        flexDirection: "column",
        gap: 16,
        background: "#050607",
        color: "#f5f5f5",
        overflowX: "hidden",
        overflowY: "auto",
        WebkitOverflowScrolling: "touch",
      }}
    >
      <span
        style={{
          color: "rgba(199,169,107,0.72)",
          fontFamily: "SFMono-Regular, Menlo, Monaco, Consolas, monospace",
          fontSize: 12,
          letterSpacing: "0.16em",
        }}
      >
        06｜人格行为动力引擎
      </span>
      <span
        style={{
          color: "rgba(245,245,245,0.42)",
          fontFamily: "SFMono-Regular, Menlo, Monaco, Consolas, monospace",
          fontSize: 11,
          letterSpacing: "0.12em",
        }}
      >
        SIX_DIMENSION_SPACE_RENDERED
      </span>

      <header style={{ display: "grid", gap: 10 }}>
        <h1
          style={{
            margin: 0,
            color: "rgba(245,245,245,0.88)",
            fontSize: "clamp(26px, 8vw, 38px)",
            lineHeight: 1.14,
            fontWeight: 420,
          }}
        >
          人格行为动力引擎启动
        </h1>
        <p
          style={{
            margin: 0,
            color: "rgba(245,245,245,0.62)",
            fontSize: 15,
            lineHeight: 1.72,
          }}
        >
          {readModel.yaoStage.chainSummary}
        </p>
      </header>

      <section
        aria-label="行动点显影"
        style={{
          display: "grid",
          gap: 12,
          padding: "14px 0",
          borderTop: "1px solid rgba(85,85,85,0.58)",
          borderBottom: "1px solid rgba(85,85,85,0.34)",
        }}
      >
        {breaches.map((breach) => {
          const isSelected = breach.id === selectedBreach.id;
          const isPrimary = breach.type === "primary";

          return (
            <button
              key={breach.id}
              type="button"
              onClick={() => handleSelectBreach(breach.id)}
              style={{
                width: "100%",
                padding: isPrimary ? "18px 0" : "14px 0",
                border: 0,
                borderTop: isPrimary ? "1px solid rgba(199,169,107,0.46)" : "1px solid rgba(85,85,85,0.36)",
                borderBottom: isSelected ? "1px solid rgba(199,169,107,0.72)" : "1px solid rgba(85,85,85,0.22)",
                background: isSelected ? "rgba(199,169,107,0.075)" : "transparent",
                color: "inherit",
                display: "grid",
                gap: 9,
                textAlign: "left",
                opacity: isSelected ? 1 : isPrimary ? 0.78 : 0.58,
              }}
            >
              <span
                style={{
                  color: isSelected ? "rgba(199,169,107,0.84)" : "rgba(245,245,245,0.4)",
                  fontFamily: "SFMono-Regular, Menlo, Monaco, Consolas, monospace",
                  fontSize: 11,
                  letterSpacing: "0.14em",
                }}
              >
                {breach.tag}
              </span>
              <strong
                style={{
                  color: isSelected ? "rgba(245,245,245,0.92)" : "rgba(245,245,245,0.72)",
                  fontSize: isPrimary ? 21 : 18,
                  lineHeight: 1.24,
                  fontWeight: 380,
                }}
              >
                {breach.title}
              </strong>
              <span
                style={{
                  color: "rgba(245,245,245,0.66)",
                  fontSize: 14,
                  lineHeight: 1.62,
                }}
              >
                {breach.description}
              </span>
              <span
                style={{
                  color: isSelected ? "rgba(199,169,107,0.72)" : "rgba(245,245,245,0.38)",
                  fontSize: 13,
                  lineHeight: 1.56,
                }}
              >
                {breach.riskLine}
              </span>
            </button>
          );
        })}
      </section>

      <p
        style={{
          margin: 0,
          color: "rgba(245,245,245,0.48)",
          fontSize: 13,
          lineHeight: 1.6,
        }}
      >
        主要行动点、辅助行动点、深层保护点已从六维人格空间中显影。
      </p>

      <CausalRail statusLabel="进入处置页" rightHint="右滑进入处置页" onRight={handleCommitCut} />
    </main>
  );
}
