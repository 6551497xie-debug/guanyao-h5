import { guanyaoHexagramGlyphs } from "../../data/guanyaoHexagramGlyphs";
import type { GuanyaoHexagramCardTemplate } from "../../data/guanyaoHexagramCardTemplateData";
import { GuanyaoHexagramVisualPlaceholder } from "./GuanyaoHexagramVisualPlaceholder";

type GuanyaoHexagramCardFrontProps = {
  card: GuanyaoHexagramCardTemplate;
};

function HexagramGlyph({ code }: { code: string }) {
  const glyph = guanyaoHexagramGlyphs[code];

  if (!glyph) return null;

  return (
    <div aria-label={`${code} 固定卦形`} style={{ display: "grid", gap: 3, width: 34 }}>
      {glyph.linesTopToBottom.map((line, index) => (
        <span
          key={`${code}-${index}`}
          style={{
            display: "flex",
            gap: 5,
            height: 3,
          }}
        >
          {line === "yang" ? (
            <span style={{ flex: 1, borderRadius: 999, background: "rgba(246,232,188,0.74)" }} />
          ) : (
            <>
              <span style={{ flex: 1, borderRadius: 999, background: "rgba(246,232,188,0.62)" }} />
              <span style={{ flex: 1, borderRadius: 999, background: "rgba(246,232,188,0.62)" }} />
            </>
          )}
        </span>
      ))}
    </div>
  );
}

export function GuanyaoHexagramCardFront({ card }: GuanyaoHexagramCardFrontProps) {
  const isLongHexagramName = card.hexagramName.length >= 4;

  return (
    <article
      aria-label={`${card.code} ${card.hexagramName} ${card.cardName} A 面`}
      style={{
        width: "min(100%, 390px)",
        aspectRatio: "3 / 4",
        boxSizing: "border-box",
        padding: 22,
        display: "grid",
        gridTemplateRows: "auto auto minmax(0, 1fr) auto auto auto",
        gap: 14,
        color: "#f6f0dd",
        border: "1px solid rgba(229,196,126,0.42)",
        background:
          "radial-gradient(circle at 50% 35%, rgba(221,184,97,0.2), transparent 36%), linear-gradient(180deg, #12110f 0%, #050505 100%)",
        boxShadow: "0 22px 60px rgba(0,0,0,0.36), inset 0 0 0 1px rgba(255,255,255,0.035)",
        overflow: "hidden",
      }}
    >
      <header style={{ display: "flex", justifyContent: "space-between", alignItems: "start", gap: 16 }}>
        <span style={{ color: "rgba(246,232,188,0.62)", fontFamily: "SFMono-Regular, Menlo, Monaco, Consolas, monospace", fontSize: 11, letterSpacing: "0.16em" }}>
          NO.{card.code}
        </span>
        <HexagramGlyph code={card.glyphKey} />
      </header>

      <section style={{ display: "grid", gap: 4 }}>
        <h2
          style={{
            margin: 0,
            color: "rgba(246,240,221,0.95)",
            fontSize: isLongHexagramName ? 34 : 40,
            lineHeight: 1.02,
            fontWeight: 420,
            letterSpacing: "0.08em",
          }}
        >
          {card.hexagramName}
        </h2>
        <p style={{ margin: 0, color: "rgba(229,196,126,0.82)", fontSize: isLongHexagramName ? 15 : 17, lineHeight: 1.35, letterSpacing: "0.08em" }}>
          《{card.cardName}》
        </p>
      </section>

      <GuanyaoHexagramVisualPlaceholder code={card.code} visualStructure={card.visualStructure} />

      <p style={{ margin: 0, color: "rgba(246,240,221,0.86)", fontSize: 18, lineHeight: 1.45, fontWeight: 360, textAlign: "left", letterSpacing: "0.03em" }}>
        {card.quoteLines.map((line) => (
          <span key={line}>
            {line}
            <br />
          </span>
        ))}
      </p>

      <p style={{ margin: 0, color: "rgba(229,196,126,0.72)", fontSize: 12, lineHeight: 1.5, letterSpacing: "0.18em" }}>
        {card.tags.join("｜")}
      </p>

      <footer style={{ display: "grid", gap: 2 }}>
        <span style={{ color: "rgba(246,232,188,0.5)", fontFamily: "SFMono-Regular, Menlo, Monaco, Consolas, monospace", fontSize: 10, letterSpacing: "0.18em" }}>
          GUANYAO SANDBOX
        </span>
        <span style={{ color: "rgba(246,240,221,0.62)", fontSize: 12, letterSpacing: "0.16em" }}>观爻</span>
      </footer>
    </article>
  );
}
