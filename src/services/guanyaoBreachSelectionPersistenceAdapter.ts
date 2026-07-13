export const GUANYAO_BREACH_SELECTION_STORAGE_KEY = "guanyao:breachSelectionState";
export const GUANYAO_BREACH_SELECTION_SCHEMA_VERSION =
  "GUANYAO_BREACH_SELECTION_V2" as const;

const LEGACY_SELECTED_BREACH_STORAGE_KEY = "guanyao:selectedBreachId";
const LEGACY_ASSET_STATUS_STORAGE_KEY = "guanyao:assetStatus";

export type BreachAssetStatus = "activated" | "sealed";

export type BreachSelectionState = {
  selectedBreachId?: string;
  assetStatus?: BreachAssetStatus;
};

export type VersionedBreachSelectionState = BreachSelectionState & {
  schemaVersion: typeof GUANYAO_BREACH_SELECTION_SCHEMA_VERSION;
};

function isAssetStatus(value: unknown): value is BreachAssetStatus {
  return value === "activated" || value === "sealed";
}

function isVersionedBreachSelectionState(value: unknown): value is VersionedBreachSelectionState {
  if (!value || typeof value !== "object") return false;

  const candidate = value as Partial<VersionedBreachSelectionState>;
  const hasSelectedBreach =
    typeof candidate.selectedBreachId === "string" && candidate.selectedBreachId.length > 0;
  const hasAssetStatus = isAssetStatus(candidate.assetStatus);

  return (
    candidate.schemaVersion === GUANYAO_BREACH_SELECTION_SCHEMA_VERSION &&
    (candidate.selectedBreachId === undefined || hasSelectedBreach) &&
    (candidate.assetStatus === undefined || hasAssetStatus) &&
    (hasSelectedBreach || hasAssetStatus)
  );
}

function readLegacyBreachSelectionState(): BreachSelectionState | null {
  const selectedBreachId = window.localStorage.getItem(LEGACY_SELECTED_BREACH_STORAGE_KEY);
  const rawAssetStatus = window.localStorage.getItem(LEGACY_ASSET_STATUS_STORAGE_KEY);
  const assetStatus = isAssetStatus(rawAssetStatus) ? rawAssetStatus : undefined;

  if (!selectedBreachId && !assetStatus) return null;

  return {
    ...(selectedBreachId ? { selectedBreachId } : {}),
    ...(assetStatus ? { assetStatus } : {}),
  };
}

export function readPersistedBreachSelectionState(): BreachSelectionState | null {
  if (typeof window === "undefined") return null;

  try {
    const raw = window.localStorage.getItem(GUANYAO_BREACH_SELECTION_STORAGE_KEY);
    if (raw) {
      try {
        const parsed = JSON.parse(raw) as unknown;
        if (isVersionedBreachSelectionState(parsed)) return parsed;
      } catch {
        // 损坏或未知的新格式不遮断旧标量数据回流。
      }
    }

    return readLegacyBreachSelectionState();
  } catch {
    return null;
  }
}

export function writeBreachSelectionState(
  input: BreachSelectionState,
): VersionedBreachSelectionState {
  const current = readPersistedBreachSelectionState();
  const selectedBreachId = input.selectedBreachId ?? current?.selectedBreachId;
  const assetStatus = input.assetStatus ?? current?.assetStatus;
  const versionedState = Object.freeze({
    schemaVersion: GUANYAO_BREACH_SELECTION_SCHEMA_VERSION,
    ...(selectedBreachId ? { selectedBreachId } : {}),
    ...(assetStatus ? { assetStatus } : {}),
  });

  if (typeof window !== "undefined") {
    window.localStorage.setItem(
      GUANYAO_BREACH_SELECTION_STORAGE_KEY,
      JSON.stringify(versionedState),
    );
  }

  return versionedState;
}
