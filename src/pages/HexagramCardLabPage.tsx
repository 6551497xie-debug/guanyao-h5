import { GuanyaoHexagramCardSpread } from "../components/hexagram-card/GuanyaoHexagramCardSpread";
import { guanyaoHexagramCardTemplates } from "../data/guanyaoHexagramCardTemplateData";

export function HexagramCardLabPage() {
  return (
    <main
      style={{
        minHeight: "100dvh",
        boxSizing: "border-box",
        padding: "7dvh clamp(18px, 5vw, 52px) calc(8dvh + env(safe-area-inset-bottom))",
        background: "radial-gradient(circle at 50% 0%, rgba(229,196,126,0.08), transparent 34%), #050505",
        color: "#f6f0dd",
      }}
    >
      <header style={{ maxWidth: 920, display: "grid", gap: 12, paddingBottom: 20 }}>
        <span style={{ color: "rgba(229,196,126,0.62)", fontFamily: "SFMono-Regular, Menlo, Monaco, Consolas, monospace", fontSize: 12, letterSpacing: "0.18em" }}>
          GUANYAO SANDBOX / CARD TEMPLATE LAB
        </span>
        <h1 style={{ margin: 0, color: "rgba(246,240,221,0.94)", fontSize: "clamp(32px, 7vw, 56px)", lineHeight: 1.08, fontWeight: 390 }}>
          64卦码卡工业化模板实验室
        </h1>
        <p style={{ margin: 0, maxWidth: 720, color: "rgba(246,240,221,0.58)", fontSize: 15, lineHeight: 1.72 }}>
          当前用于验证 001—010 的 A/B 面模板：A 面只接无字主视觉底图，文字、卦形、标签、LOGO 与 B 面卡背均由固定模板生成。
        </p>
      </header>

      <div style={{ display: "grid", gap: 8 }}>
        {guanyaoHexagramCardTemplates.map((card) => (
          <GuanyaoHexagramCardSpread key={card.code} card={card} />
        ))}
      </div>
    </main>
  );
}
