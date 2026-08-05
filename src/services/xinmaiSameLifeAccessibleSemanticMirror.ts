import type { XinmaiCanonicalBodyImprintDecision } from "../types/xinmaiCanonicalBodyImprint";
import type { XinmaiSameLifeSurfaceOutcome } from "../types/xinmaiSameLifeSurfacePresentation";

export type XinmaiSameLifeAccessibleSemanticMirror = Readonly<{
  status: "IMPRINT_AVAILABLE" | "NO_CANONICAL_IMPRINT" | "SAFE_WITHHELD";
  summary: string;
  items: readonly Readonly<{
    imprintReferenceId: string;
    stableOrdinal: number;
    visibleLabel: string;
    accessibleName: string;
  }>[];
  autoAnnouncement: "RECOVERY_SILENT";
  authorityWriteback: "FORBIDDEN";
}>;

const safeWithheld = (): XinmaiSameLifeAccessibleSemanticMirror =>
  Object.freeze({
    status: "SAFE_WITHHELD" as const,
    summary: "身体留痕暂时无法确认。既有生命资产仍被保留。",
    items: Object.freeze([]),
    autoAnnouncement: "RECOVERY_SILENT" as const,
    authorityWriteback: "FORBIDDEN" as const,
  });

const formatTime = (formedAt: string, spoken: boolean) => {
  const date = new Date(formedAt);
  const parts = new Intl.DateTimeFormat("zh-CN", {
    month: "numeric",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  }).formatToParts(date);
  const part = (type: Intl.DateTimeFormatPartTypes) =>
    parts.find((candidate) => candidate.type === type)?.value ?? "";
  return spoken
    ? `${part("month")}月${part("day")}日${part("hour")}点${part("minute")}分`
    : `${part("month")}月${part("day")}日 ${part("hour")}:${part("minute")}`;
};

export function resolveXinmaiSameLifeAccessibleSemanticMirror(input: Readonly<{
  canonicalDecision: XinmaiCanonicalBodyImprintDecision;
  surfaceOutcome: XinmaiSameLifeSurfaceOutcome | null;
}>): XinmaiSameLifeAccessibleSemanticMirror {
  const outcome = input.surfaceOutcome;
  if (
    outcome === null ||
    outcome.status === "SAME_LIFE_SURFACE_SAFE_WITHHELD" ||
    input.canonicalDecision.status === "SAFE_WITHHELD"
  ) {
    return safeWithheld();
  }
  if (
    outcome.facts.bodyReferenceId !== input.canonicalDecision.bodyReferenceId
  ) {
    return safeWithheld();
  }
  if (input.canonicalDecision.status === "NO_CANONICAL_IMPRINT") {
    if (outcome.facts.imprints.length !== 0) return safeWithheld();
    return Object.freeze({
      status: "NO_CANONICAL_IMPRINT" as const,
      summary:
        "这段同行的生命里，还没有可以确认的晶体留痕。真实成长发生后，它会留在同一生命经络中。",
      items: Object.freeze([]),
      autoAnnouncement: "RECOVERY_SILENT" as const,
      authorityWriteback: "FORBIDDEN" as const,
    });
  }
  const canonical = new Map(
    input.canonicalDecision.imprints.map((imprint) => [
      imprint.imprintReferenceId,
      imprint,
    ]),
  );
  if (canonical.size !== outcome.facts.imprints.length) {
    return safeWithheld();
  }
  const items = outcome.facts.imprints.map((fact, index) => {
    const imprint = canonical.get(fact.imprintReferenceId);
    if (!imprint || imprint.bodyReferenceId !== fact.bodyReferenceId) {
      return null;
    }
    const stableOrdinal = index + 1;
    return Object.freeze({
      imprintReferenceId: fact.imprintReferenceId,
      stableOrdinal,
      visibleLabel: `真实回应 · ${formatTime(imprint.formedAt, false)}`,
      accessibleName:
        `第${stableOrdinal}道生命留痕。来自一次已经确认的真实回应，` +
        `形成于${formatTime(imprint.formedAt, true)}，仍保留在同一生命经络中。`,
    });
  });
  if (items.some((item) => item === null)) return safeWithheld();
  const typedItems = items.filter((item) => item !== null);
  const count = typedItems.length;
  return Object.freeze({
    status: "IMPRINT_AVAILABLE" as const,
    summary:
      count === 1
        ? "这段同行的生命里，已经留下1道来自真实回应的晶体留痕。它仍在同一生命经络中。"
        : `这段同行的生命里，已经留下${count}道来自真实回应的晶体留痕。它们仍在同一生命经络中。`,
    items: Object.freeze(typedItems),
    autoAnnouncement: "RECOVERY_SILENT" as const,
    authorityWriteback: "FORBIDDEN" as const,
  });
}
