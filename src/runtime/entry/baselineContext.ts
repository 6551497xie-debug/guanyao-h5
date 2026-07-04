export type EntryBaselineContext = {
  exists: boolean;
  source?: "localStorage" | "session" | "server";
  createdAt?: number;
};

export function getBaselineContext(): EntryBaselineContext {
  return { exists: false };
}
