import type { ArchiveItem, CausalContextPackage, MigrationCard } from "../types";
import {
  clearPersistedArchives,
  readPersistedArchives,
  writePersistedArchives,
} from "./guanyaoArchivePersistenceAdapter";

export function getArchives(): ArchiveItem[] {
  return readPersistedArchives();
}

export function saveArchive(item: MigrationCard & { finalChoiceCode: string; causalContext?: CausalContextPackage; repairTarget?: ArchiveItem["repairTarget"] }): ArchiveItem[] {
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
    repairTarget: item.repairTarget ?? item.causalContext?.repairTarget ?? null,
    causalContext: item.causalContext,
  };

  const nextArchive = [archiveItem, ...getArchives()];
  writePersistedArchives(nextArchive);

  return nextArchive;
}

export function clearArchives(): void {
  clearPersistedArchives();
}
