import { guanyaoHexagramGlyphs } from "../../data/guanyaoHexagramGlyphs";
import type { GuanyaoHexagramCardTemplate } from "../../data/guanyaoHexagramCardTemplateData";

type GuanyaoHexagramCardBackProps = {
  card: GuanyaoHexagramCardTemplate;
};

function HexagramGlyph({ code }: { code: string }) {
  const glyph = guanyaoHexagramGlyphs[code];

  if (!glyph) return null;

  return (
    <div aria-label={`${code} 固定卦形`} style={{ display: "grid", gap: 3, width: 38 }}>
      {glyph.linesTopToBottom.map((line, index) => (
        <span key={`${code}-${index}`} style={{ display: "flex", gap: 5, height: 3 }}>
          {line === "yang" ? (
            <span style={{ flex: 1, borderRadius: 999, background: "rgba(78,57,24,0.72)" }} />
          ) : (
            <>
              <span style={{ flex: 1, borderRadius: 999, background: "rgba(78,57,24,0.62)" }} />
              <span style={{ flex: 1, borderRadius: 999, background: "rgba(78,57,24,0.62)" }} />
            </>
          )}
        </span>
      ))}
    </div>
  );
}

function LineBlock({ title, lines }: { title: string; lines: string[] }) {
  return (
    <section style={{ display: "grid", gap: 8 }}>
      <span style={{ color: "rgba(74,54,25,0.58)", fontSize: 11, letterSpacing: "0.18em" }}>{title}</span>
      <p style={{ margin: 0, color: "rgba(45,34,20,0.86)", fontSize: 17, lineHeight: 1.62, letterSpacing: "0.04em" }}>
        {lines.map((line) => (
          <span key={line}>
            {line}
            <br />
          </span>
        ))}
      </p>
    </section>
  );
}

export function GuanyaoHexagramCardBack({ card }: GuanyaoHexagramCardBackProps) {
  return (
    <article
      aria-label={`${card.code} ${card.hexagramName} ${card.cardName} B 面`}
      style={{
        width: "min(100%, 390px)",
        aspectRatio: "3 / 4",
        boxSizing: "border-box",
        padding: 22,
        display: "grid",
        gridTemplateRows: "auto auto 1fr auto",
        gap: 18,
        color: "#2d2214",
        border: "1px solid rgba(95,70,30,0.28)",
        background:
          "radial-gradient(circle at 50% 12%, rgba(255,255,255,0.52), transparent 26%), linear-gradient(180deg, #efe1bc 0%, #d5b66e 100%)",
        boxShadow: "0 22px 60px rgba(0,0,0,0.22), inset 0 0 0 1px rgba(255,255,255,0.24)",
        overflow: "hidden",
      }}
    >
      <header style={{ display: "grid", gap: 14 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "start", gap: 14 }}>
          <div style={{ display: "grid", gap: 5 }}>
            <span style={{ color: "rgba(74,54,25,0.58)", fontFamily: "SFMono-Regular, Menlo, Monaco, Consolas, monospace", fontSize: 11, letterSpacing: "0.16em" }}>
              NO.{card.code}
            </span>
            <strong style={{ color: "rgba(45,34,20,0.92)", fontSize: 24, lineHeight: 1.1, fontWeight: 500, letterSpacing: "0.06em" }}>
              {card.hexagramName}
            </strong>
            <span style={{ color: "rgba(45,34,20,0.72)", fontSize: 15, lineHeight: 1.4, letterSpacing: "0.08em" }}>
              {card.cardName}
            </span>
          </div>
          <HexagramGlyph code={card.glyphKey} />
        </div>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: 10,
            padding: "10px 0",
            borderTop: "1px solid rgba(74,54,25,0.22)",
            borderBottom: "1px solid rgba(74,54,25,0.18)",
          }}
        >
          <span style={{ color: "rgba(45,34,20,0.7)", fontSize: 12, letterSpacing: "0.12em" }}>上卦｜{card.upperTrigram}</span>
          <span style={{ color: "rgba(45,34,20,0.7)", fontSize: 12, letterSpacing: "0.12em", textAlign: "right" }}>下卦｜{card.lowerTrigram}</span>
        </div>
      </header>

      <LineBlock title="卡魂" lines={card.cardSoulLines} />
      <LineBlock title="复盘" lines={card.reviewQuestionLines} />

      <footer style={{ display: "grid", gap: 2, alignSelf: "end" }}>
        <span style={{ color: "rgba(74,54,25,0.52)", fontFamily: "SFMono-Regular, Menlo, Monaco, Consolas, monospace", fontSize: 10, letterSpacing: "0.18em" }}>
          GUANYAO SANDBOX
        </span>
        <span style={{ color: "rgba(45,34,20,0.7)", fontSize: 12, letterSpacing: "0.16em" }}>观爻</span>
      </footer>
    </article>
  );
}
