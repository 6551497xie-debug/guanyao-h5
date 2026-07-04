export type EntryBaselineContext = {
  exists: boolean;
  source?: "localStorage" | "session" | "server";
  createdAt?: number;
};

export function getBaselineContext(): EntryBaselineContext {
  try {
    if (typeof window === "undefined" || !window.localStorage) {
      return { exists: false };
    }

    const rawBaseline = window.localStorage.getItem("rue_baseline");
    if (!rawBaseline) return { exists: false };

    const baseline = JSON.parse(rawBaseline) as { createdAt?: unknown };
    const createdAt = typeof baseline.createdAt === "number" ? baseline.createdAt : undefined;

    return {
      exists: true,
      source: "localStorage",
      ...(createdAt !== undefined ? { createdAt } : {}),
    };
  } catch {
    return { exists: false };
  }
}
