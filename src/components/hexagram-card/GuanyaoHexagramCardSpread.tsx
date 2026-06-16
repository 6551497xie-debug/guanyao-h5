import type { GuanyaoHexagramCardTemplate } from "../../data/guanyaoHexagramCardTemplateData";
import { GuanyaoHexagramCardBack } from "./GuanyaoHexagramCardBack";
import { GuanyaoHexagramCardFront } from "./GuanyaoHexagramCardFront";

type GuanyaoHexagramCardSpreadProps = {
  card: GuanyaoHexagramCardTemplate;
};

export function GuanyaoHexagramCardSpread({ card }: GuanyaoHexagramCardSpreadProps) {
  return (
    <section
      aria-label={`${card.code} ${card.hexagramName} ${card.cardName} A/B 面预览`}
      style={{
        display: "grid",
        gap: 18,
        padding: "28px 0 38px",
        borderBottom: "1px solid rgba(246,232,188,0.12)",
      }}
    >
      <header style={{ display: "grid", gap: 6 }}>
        <span style={{ color: "rgba(229,196,126,0.62)", fontFamily: "SFMono-Regular, Menlo, Monaco, Consolas, monospace", fontSize: 11, letterSpacing: "0.16em" }}>
          {card.code} / {card.upperTrigram}-{card.lowerTrigram}
        </span>
        <h2 style={{ margin: 0, color: "rgba(246,240,221,0.9)", fontSize: "clamp(24px, 5vw, 34px)", lineHeight: 1.16, fontWeight: 380 }}>
          {card.hexagramName}《{card.cardName}》
        </h2>
      </header>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(280px, 390px))",
          gap: 22,
          alignItems: "start",
        }}
      >
        <GuanyaoHexagramCardFront card={card} />
        <GuanyaoHexagramCardBack card={card} />
      </div>

      <details
        style={{
          maxWidth: 820,
          color: "rgba(246,240,221,0.58)",
          border: "1px solid rgba(229,196,126,0.12)",
          padding: "12px 14px",
          background: "rgba(246,232,188,0.025)",
        }}
      >
        <summary style={{ cursor: "pointer", color: "rgba(229,196,126,0.72)", fontSize: 13, letterSpacing: "0.08em" }}>
          visual asset slot / prompts
        </summary>
        <div style={{ display: "grid", gap: 8, paddingTop: 12, fontSize: 13, lineHeight: 1.7 }}>
          <p style={{ margin: 0 }}>文件名：{card.visualFilename}</p>
          <p style={{ margin: 0 }}>资产槽：{card.visualAssetUrl}</p>
          <p style={{ margin: 0 }}>当前状态：{card.visualAssetUrl ? "image slot ready / fallback on missing image" : "using placeholder"}</p>
          <p style={{ margin: 0 }}>结构：{card.visualStructure}</p>
          <p style={{ margin: 0 }}>旧字段提示词：{card.visualPrompt}</p>
          <p style={{ margin: 0 }}>positive prompt：{card.visualPositivePrompt}</p>
          <p style={{ margin: 0 }}>negative prompt：{card.visualNegativePrompt}</p>
          {card.visualRiskNotes?.length ? (
            <p style={{ margin: 0, color: "rgba(229,196,126,0.68)" }}>构图风险：{card.visualRiskNotes.join(" / ")}</p>
          ) : null}
        </div>
      </details>
    </section>
  );
}
