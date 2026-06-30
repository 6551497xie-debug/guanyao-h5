import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getGuanyaoR8ReadModel } from "../adapters/guanyaoR8ReadModelAdapter";
import { CausalRail } from "../components/causal/CausalRail";
import { GUANYAO_ROUTES } from "../routes/guanyaoRoutes";
import { buildMotherCodeAssetLines, getMotherCodeAsset } from "../services/guanyaoMotherCodeAssetService";

const causalReadoutLabels = [
  ["因果位置", "causalPosition"],
  ["基础原力", "baseDrive"],
  ["压力入口", "pressureEntry"],
  ["默认反应链", "defaultReactionChain"],
] as const;

export function MotherCodePage() {
  const navigate = useNavigate();
  const [isMotherCardFlipped, setIsMotherCardFlipped] = useState(false);
  const readModel = useMemo(() => getGuanyaoR8ReadModel(), []);
  const motherCode = readModel.motherCodeStage;
  const motherCodeAsset = useMemo(() => getMotherCodeAsset(motherCode), [motherCode]);
  const motherCodeAssetLines = useMemo(() => buildMotherCodeAssetLines(motherCodeAsset), [motherCodeAsset]);
  const motherAssetMap = useMemo(() => {
    return motherCodeAssetLines.reduce<Record<string, string>>((acc, line) => {
      const [label, ...valueParts] = line.split("：");
      acc[label] = valueParts.join("：");
      return acc;
    }, {});
  }, [motherCodeAssetLines]);

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
          它不是一枚静态标签。
          <br />
          它是你在压力来临前，最先启动的行为源代码。
        </p>
      </section>

      <section
        aria-label="母码资产卡"
        style={{
          display: "grid",
          gap: 18,
          marginTop: "1vh",
          padding: "14px 0 2px",
        }}
      >
        <button
          type="button"
          onClick={() => setIsMotherCardFlipped((value) => !value)}
          aria-label="点击翻转母码卡"
          style={{
            appearance: "none",
            border: 0,
            background: "transparent",
            padding: 0,
            color: "inherit",
            perspective: 980,
            cursor: "pointer",
            outline: "none",
          }}
        >
          <div
            style={{
              width: "min(78vw, 326px)",
              aspectRatio: "0.68",
              margin: "0 auto",
              position: "relative",
              transformStyle: "preserve-3d",
              transform: isMotherCardFlipped ? "rotateY(180deg)" : "rotateY(0deg)",
              transition: "transform 560ms cubic-bezier(.16,1,.3,1)",
            }}
          >
            <div
              aria-hidden={isMotherCardFlipped}
              style={{
                position: "absolute",
                inset: 0,
                border: "1px solid rgba(0,184,212,0.72)",
                background:
                  "radial-gradient(circle at 50% 39%, rgba(0,184,212,0.14), rgba(0,0,0,0.94) 62%)",
                boxShadow: "0 0 34px rgba(0,184,212,0.16), inset 0 0 30px rgba(0,184,212,0.055)",
                backfaceVisibility: "hidden",
                display: "grid",
                alignContent: "space-between",
                padding: "22px 20px",
                textAlign: "left",
              }}
            >
              <div style={{ display: "grid", gap: 7 }}>
                <span
                  style={{
                    color: "rgba(0,184,212,0.72)",
                    fontFamily: "SFMono-Regular, Menlo, Monaco, Consolas, monospace",
                    fontSize: 10,
                    letterSpacing: "0.12em",
                  }}
                >
                  母码卡 / {motherCode.visualAssetCode}
                </span>
                <strong
                  style={{
                    color: "rgba(246,243,236,0.94)",
                    fontSize: "clamp(26px, 7vw, 34px)",
                    lineHeight: 1.12,
                    fontWeight: 760,
                    letterSpacing: "0.05em",
                  }}
                >
                  {motherCodeAsset?.name ?? motherCode.motherCodeName}
                </strong>
              </div>

              <div style={{ display: "grid", placeItems: "center", gap: 13 }}>
                <span
                  aria-hidden="true"
                  style={{
                    color: "rgba(0,184,212,0.92)",
                    fontSize: 78,
                    lineHeight: 1,
                    fontWeight: 280,
                    textShadow: "0 0 20px rgba(0,184,212,0.28)",
                  }}
                >
                  {motherCode.trigramSymbol}
                </span>
                <span
                  style={{
                    color: "rgba(246,243,236,0.62)",
                    fontFamily: "SFMono-Regular, Menlo, Monaco, Consolas, monospace",
                    fontSize: 11,
                    letterSpacing: "0.12em",
                    textAlign: "center",
                    lineHeight: 1.55,
                  }}
                >
                  {motherCode.xiantianDisplay}｜{motherCode.trigramImage}｜{motherCode.wuxing}
                </span>
              </div>

              <div style={{ display: "grid", gap: 8 }}>
                <p style={{ margin: 0, color: "rgba(246,243,236,0.78)", fontSize: 14, lineHeight: 1.6, letterSpacing: "0.03em" }}>
                  {motherAssetMap["原力"] ?? motherCode.baseDrive}
                </p>
                <span style={{ color: "rgba(246,243,236,0.34)", fontFamily: "SFMono-Regular, Menlo, Monaco, Consolas, monospace", fontSize: 10, letterSpacing: "0.1em" }}>
                  轻触翻面
                </span>
              </div>
            </div>

            <div
              aria-hidden={!isMotherCardFlipped}
              style={{
                position: "absolute",
                inset: 0,
                border: "1px solid rgba(246,243,236,0.66)",
                background: "linear-gradient(180deg, rgba(0,184,212,0.1), rgba(0,0,0,0.95))",
                boxShadow: "0 0 34px rgba(246,243,236,0.1), inset 0 0 28px rgba(0,184,212,0.07)",
                backfaceVisibility: "hidden",
                transform: "rotateY(180deg)",
                display: "grid",
                alignContent: "center",
                gap: 14,
                padding: "24px 22px",
                textAlign: "left",
              }}
            >
              <span
                style={{
                  color: "rgba(0,184,212,0.76)",
                  fontFamily: "SFMono-Regular, Menlo, Monaco, Consolas, monospace",
                  fontSize: 11,
                  letterSpacing: "0.12em",
                }}
              >
                母码资产｜背面读取
              </span>
              {[
                ["原力", motherAssetMap["原力"] ?? motherCode.baseDrive],
                ["默认保护", motherAssetMap["默认保护"] ?? motherCode.defaultReactionChain],
                ["压力中的误用", motherAssetMap["压力中的误用"] ?? motherCode.shadowInertia],
                ["资产回收", motherAssetMap["资产回收"] ?? motherCode.personalityAsset],
              ].map(([label, value]) => (
                <div key={label} style={{ display: "grid", gap: 5 }}>
                  <span
                    style={{
                      color: "rgba(0,184,212,0.68)",
                      fontFamily: "SFMono-Regular, Menlo, Monaco, Consolas, monospace",
                      fontSize: 10,
                      letterSpacing: "0.12em",
                    }}
                  >
                    {label}
                  </span>
                  <p style={{ margin: 0, color: "rgba(246,243,236,0.76)", fontSize: 13, lineHeight: 1.6, letterSpacing: "0.03em" }}>
                    {value}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </button>

        <div
          style={{
            display: "grid",
            gap: 8,
          }}
        >
          {causalReadoutLabels.map(([label, key]) => (
            <article
              key={label}
              style={{
                display: "grid",
                gap: 7,
                padding: "8px 0",
                borderTop: "1px solid rgba(246,243,236,0.055)",
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
          母码资产已显影
        </span>
        <CausalRail statusLabel="进入现实压力场" rightHint="右滑进入现实压力场" onRight={() => navigate(GUANYAO_ROUTES.pressureSeed)} />
      </div>
    </main>
  );
}
