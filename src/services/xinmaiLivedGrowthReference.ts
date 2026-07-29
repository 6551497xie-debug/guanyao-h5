export function createStableXinmaiGrowthReference(
  namespace: string,
  ...parts: readonly string[]
): string {
  const source = `${namespace}|${parts.join("|")}`;
  let hash = 2166136261;
  for (let index = 0; index < source.length; index += 1) {
    hash ^= source.charCodeAt(index);
    hash = Math.imul(hash, 16777619);
  }
  return `${namespace}:${(hash >>> 0).toString(36)}`;
}

export function createEphemeralXinmaiGrowthReference(
  namespace: string,
): string {
  const random =
    typeof crypto !== "undefined" &&
    typeof crypto.randomUUID === "function"
      ? crypto.randomUUID()
      : `${Date.now().toString(36)}-${Math.random().toString(36).slice(2)}`;
  return `${namespace}:${random}`;
}
