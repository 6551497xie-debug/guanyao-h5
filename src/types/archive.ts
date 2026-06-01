import type { GuanyaoSession } from "./session";

export type ArchiveRecord = {
  id: string;
  session: GuanyaoSession;
  title: string;
  savedAt: string;
};
