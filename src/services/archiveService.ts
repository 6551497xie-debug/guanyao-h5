import type { ArchiveItem, MigrationCard } from "../types";

const ARCHIVE_KEY = "guanyao_h5_archive";

function canUseStorage(): boolean {
  return typeof window !== "undefined" && Boolean(window.localStorage);
}

export function getArchives(): ArchiveItem[] {
  if (!canUseStorage()) {
    return [];
  }

  try {
    const rawArchive = window.localStorage.getItem(ARCHIVE_KEY);
    return rawArchive ? (JSON.parse(rawArchive) as ArchiveItem[]) : [];
  } catch {
    return [];
  }
}

export function saveArchive(item: MigrationCard & { finalChoiceCode: string }): ArchiveItem[] {
  const archiveItem: ArchiveItem = {
    archiveId: crypto.randomUUID(),
    createdAt: new Date().toISOString(),
    finalChoiceCode: item.finalChoiceCode,
    choiceCode: item.choiceCode,
    currentTrack: item.currentTrack,
    migrationDirection: item.migrationDirection,
    cardTitle: item.cardTitle,
    shortReading: item.shortReading,
    originGravityCoordinate: item.originGravityCoordinate,
    conflictScript90d: item.conflictScript90d,
    antiInstinctNode: item.antiInstinctNode,
    status: item.status,
  };

  const nextArchive = [archiveItem, ...getArchives()];

  if (canUseStorage()) {
    try {
      window.localStorage.setItem(ARCHIVE_KEY, JSON.stringify(nextArchive));
    } catch {
      return nextArchive;
    }
  }

  return nextArchive;
}

export function clearArchives(): void {
  if (!canUseStorage()) {
    return;
  }

  try {
    window.localStorage.removeItem(ARCHIVE_KEY);
  } catch {
    return;
  }
}
