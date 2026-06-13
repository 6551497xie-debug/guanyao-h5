import { useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { getGuanyaoR8ReadModel } from "../adapters/guanyaoR8ReadModelAdapter";
import { CausalRail } from "../components/causal/CausalRail";
import { GUANYAO_ROUTES } from "../routes/guanyaoRoutes";

const assetReadoutLabels = [
  ["基础原力", "baseDrive"],
  ["阴影惯性", "shadowInertia"],
  ["受压方式", "pressureMode"],
  ["默认反应链", "defaultReactionChain"],
  ["解封潜能", "unlockPotential"],
] as const;

export function MotherCodePage() {
  const navigate = useNavigate();
  const readModel = useMemo(() => getGuanyaoR8ReadModel(), []);
  const motherCode = readModel.motherCodeStage;

  return (
    <main
      style={{
        minHeight: "100dvh",
        width: "min(100%, 520px)",
        margin: "0 auto",
        boxSizing: "border-box",
        padding: "48px 22px calc(40px + env(safe-area-inset-bottom))",
        display: "flex",
        flexDirection: "column",
        gap: 18,
        background:
          "radial-gradient(circle at 50% 18%, rgba(0,184,212,0.08), transparent 32%), linear-gradient(180deg, #050607 0%, #020303 100%)",
        color: "rgba(246,243,236,0.88)",
        overflowX: "hidden",
      }}
    >
      <header
        style={{
          display: "grid",
          gap: 8,
          paddingTop: "2vh",
        }}
      >
        <span
          style={{
            color: "rgba(246,243,236,0.48)",
            fontFamily: "SFMono-Regular, Menlo, Monaco, Consolas, monospace",
            fontSize: 12,
            letterSpacing: "0.16em",
          }}
        >
          02｜母码显影
        </span>
        <span
          style={{
            color: "rgba(0,184,212,0.72)",
            fontFamily: "SFMono-Regular, Menlo, Monaco, Consolas, monospace",
            fontSize: 11,
            letterSpacing: "0.16em",
          }}
        >
          GY / MOTHER-CODE / ASSET
        </span>
      </header>

      <section
        style={{
          display: "grid",
          gap: 12,
          marginTop: "2vh",
        }}
      >
        <h1
          style={{
            margin: 0,
            color: "rgba(246,243,236,0.9)",
            fontSize: "clamp(26px, 6.8vw, 34px)",
            fontWeight: 360,
            lineHeight: 1.22,
            letterSpacing: "0.06em",
          }}
        >
          母码底盘已成形。
        </h1>
        <p
          style={{
            margin: 0,
            maxWidth: 390,
            color: "rgba(246,243,236,0.64)",
            fontSize: 15,
            lineHeight: 1.7,
            letterSpacing: "0.04em",
          }}
        >
          它不是你的性格标签。
          <br />
          它是你在压力来临前，最先启动的行为源代码。
        </p>
      </section>

      <section
        aria-label="母码资产卡"
        style={{
          display: "grid",
          gap: 16,
          marginTop: "1vh",
          padding: "18px 0 6px",
          borderTop: "1px solid rgba(246,243,236,0.12)",
          borderBottom: "1px solid rgba(246,243,236,0.08)",
        }}
      >
        <div
          style={{
            display: "grid",
            gap: 8,
          }}
        >
          <span
            style={{
              color: "rgba(246,243,236,0.44)",
              fontFamily: "SFMono-Regular, Menlo, Monaco, Consolas, monospace",
              fontSize: 11,
              letterSpacing: "0.14em",
            }}
          >
            母码资产卡
          </span>
          <strong
            style={{
              color: "rgba(246,243,236,0.92)",
              fontSize: "clamp(24px, 6vw, 32px)",
              fontWeight: 360,
              lineHeight: 1.15,
              letterSpacing: "0.08em",
            }}
          >
            {motherCode.motherCodeName}
          </strong>
        </div>

        <div
          style={{
            display: "grid",
            gap: 12,
          }}
        >
          {assetReadoutLabels.map(([label, key]) => (
            <article
              key={label}
              style={{
                display: "grid",
                gap: 7,
                padding: "12px 0",
                borderTop: "1px solid rgba(246,243,236,0.075)",
              }}
            >
              <span
                style={{
                  color: "rgba(0,184,212,0.68)",
                  fontFamily: "SFMono-Regular, Menlo, Monaco, Consolas, monospace",
                  fontSize: 11,
                  letterSpacing: "0.13em",
                }}
              >
                {label}
              </span>
              <p
                style={{
                  margin: 0,
                  color: key === "defaultReactionChain" ? "rgba(246,243,236,0.86)" : "rgba(246,243,236,0.68)",
                  fontSize: key === "defaultReactionChain" ? 18 : 14,
                  lineHeight: key === "defaultReactionChain" ? 1.45 : 1.68,
                  fontWeight: key === "defaultReactionChain" ? 380 : 300,
                  letterSpacing: "0.04em",
                }}
              >
                {motherCode[key]}
              </p>
            </article>
          ))}
        </div>
      </section>

      <div
        style={{
          display: "grid",
          gap: 8,
          marginTop: "auto",
        }}
      >
        <span
          style={{
            color: "rgba(246,243,236,0.36)",
            fontFamily: "SFMono-Regular, Menlo, Monaco, Consolas, monospace",
            fontSize: 11,
            letterSpacing: "0.12em",
          }}
        >
          MOTHER_CODE_ASSET_RENDERED
        </span>
        <CausalRail statusLabel="进入现实压力场" rightHint="右滑进入现实压力场" onRight={() => navigate(GUANYAO_ROUTES.pressureSeed)} />
      </div>
    </main>
  );
}
