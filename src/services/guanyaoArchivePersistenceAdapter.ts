import type { ArchiveItem } from "../types";

export const GUANYAO_ARCHIVE_STORAGE_KEY = "guanyao_h5_archive";
export const GUANYAO_ARCHIVE_SCHEMA_VERSION = "GUANYAO_ARCHIVE_V2" as const;

export type VersionedArchiveState = {
  schemaVersion: typeof GUANYAO_ARCHIVE_SCHEMA_VERSION;
  items: readonly ArchiveItem[];
};

function canUseStorage(): boolean {
  return typeof window !== "undefined" && Boolean(window.localStorage);
}

function isVersionedArchiveState(value: unknown): value is VersionedArchiveState {
  if (!value || typeof value !== "object") return false;

  const candidate = value as Partial<VersionedArchiveState>;
  return (
    candidate.schemaVersion === GUANYAO_ARCHIVE_SCHEMA_VERSION &&
    Array.isArray(candidate.items)
  );
}

export function readPersistedArchives(): ArchiveItem[] {
  if (!canUseStorage()) return [];

  try {
    const raw = window.localStorage.getItem(GUANYAO_ARCHIVE_STORAGE_KEY);
    if (!raw) return [];

    const parsed = JSON.parse(raw) as unknown;
    if (Array.isArray(parsed)) return parsed as ArchiveItem[];
    if (isVersionedArchiveState(parsed)) return [...parsed.items];
  } catch {
    // 损坏或不可用的档案数据不阻断正式页面。
  }

  return [];
}

export function writePersistedArchives(items: readonly ArchiveItem[]): VersionedArchiveState {
  const versionedState = Object.freeze({
    schemaVersion: GUANYAO_ARCHIVE_SCHEMA_VERSION,
    items: Object.freeze([...items]),
  });

  if (canUseStorage()) {
    try {
      window.localStorage.setItem(
        GUANYAO_ARCHIVE_STORAGE_KEY,
        JSON.stringify(versionedState),
      );
    } catch {
      // 保持既有语义：落盘失败时仍允许领域服务返回本次内存结果。
    }
  }

  return versionedState;
}

export function clearPersistedArchives(): void {
  if (!canUseStorage()) return;

  try {
    window.localStorage.removeItem(GUANYAO_ARCHIVE_STORAGE_KEY);
  } catch {
    // 清除失败不影响调用方流程。
  }
}
