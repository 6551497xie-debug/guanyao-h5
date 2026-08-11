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
        "这里还没有由你确认的现实结果。完成一次现实验证后，记录会出现在这里。",
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
        `形成于${formatTime(imprint.formedAt, true)}，并保留在你的观察记录中。`,
    });
  });
  if (items.some((item) => item === null)) return safeWithheld();
  const typedItems = items.filter((item) => item !== null);
  const count = typedItems.length;
  return Object.freeze({
    status: "IMPRINT_AVAILABLE" as const,
    summary:
      count === 1
        ? "这里有1道来自你确认过的现实结果。"
        : `这里有${count}道来自你确认过的现实结果。`,
    items: Object.freeze(typedItems),
    autoAnnouncement: "RECOVERY_SILENT" as const,
    authorityWriteback: "FORBIDDEN" as const,
  });
}
