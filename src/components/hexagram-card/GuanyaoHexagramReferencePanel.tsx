import { useState } from "react";
import type { GuanyaoHexagramCardTemplate } from "../../data/guanyaoHexagramCardTemplateData";
import type { HexagramVisualReference } from "../../data/guanyaoHexagramVisualReferenceLibrary";
import { guanyaoHexagramVisualReferenceLibrary } from "../../data/guanyaoHexagramVisualReferenceLibrary";

type GuanyaoHexagramReferencePanelProps = {
  card: GuanyaoHexagramCardTemplate;
};

function ReferenceImagePreview({ reference }: { reference: HexagramVisualReference }) {
  const [isMissing, setIsMissing] = useState(false);

  if (isMissing) {
    return <p style={{ margin: 0, color: "rgba(229,196,126,0.68)" }}>reference image pending</p>;
  }

  return (
    <img
      src={reference.referenceImagePath}
      alt={`${reference.name} reference`}
      loading="lazy"
      onError={() => setIsMissing(true)}
      style={{
        width: "min(220px, 100%)",
        aspectRatio: "3 / 4",
        objectFit: "cover",
        border: "1px solid rgba(229,196,126,0.16)",
        background: "rgba(246,232,188,0.04)",
        display: "block",
      }}
    />
  );
}

export function GuanyaoHexagramReferencePanel({ card }: GuanyaoHexagramReferencePanelProps) {
  const references = card.referenceIds.map((referenceId) => guanyaoHexagramVisualReferenceLibrary[referenceId]).filter(Boolean);

  return (
    <div style={{ display: "grid", gap: 10, paddingTop: 4 }}>
      <p style={{ margin: 0 }}>visualTopology：{card.visualTopology}</p>
      <p style={{ margin: 0 }}>referenceIds：{card.referenceIds.join(" / ")}</p>
      <p style={{ margin: 0 }}>referenceStrategy：{card.referenceStrategy}</p>
      <p style={{ margin: 0 }}>referenceGenerationNote：{card.referenceGenerationNote}</p>

      {references.map((reference) => (
        <div
          key={reference.id}
          style={{
            display: "grid",
            gap: 6,
            padding: "10px 12px",
            border: "1px solid rgba(229,196,126,0.1)",
            background: "rgba(0,0,0,0.18)",
          }}
        >
          <p style={{ margin: 0, color: "rgba(246,240,221,0.72)" }}>
            {reference.name} · {reference.referenceRole}
          </p>
          <p style={{ margin: 0 }}>referenceImagePath：{reference.referenceImagePath}</p>
          <ReferenceImagePreview reference={reference} />
          <p style={{ margin: 0 }}>usageNote：{reference.usageNote}</p>
          <p style={{ margin: 0 }}>doUse：{reference.doUse.join(" / ")}</p>
          <p style={{ margin: 0 }}>doNotUse：{reference.doNotUse.join(" / ")}</p>
        </div>
      ))}
    </div>
  );
}
