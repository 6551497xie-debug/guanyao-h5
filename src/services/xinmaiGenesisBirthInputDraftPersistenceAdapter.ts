import type { XinmaiGenesisBirthCoordinateDraft } from "../types/xinmaiGenesisBirthCoordinatePresentation";
import type { XinmaiGenesisBirthInputDraftAsset } from "../types/xinmaiGenesisBirthSourceDerivation";
import {
  persistXinmaiGenesisBirthInputDraft,
  readXinmaiGenesisBirthInputDraft,
} from "./sessionService";

export const XINMAI_GENESIS_BIRTH_INPUT_DRAFT_PERSISTENCE_BOUNDARY =
  Object.freeze({
    existingSessionDocumentOnly: true as const,
    nonAuthoritativeDraftOnly: true as const,
    cannotFormIdentity: true as const,
    noDerivedBranchWrite: true as const,
    noLunarWrite: true as const,
    noBackfill: true as const,
  });

export function persistXinmaiGenesisBirthCoordinateDraft(
  draft: XinmaiGenesisBirthCoordinateDraft,
): void {
  const asset: XinmaiGenesisBirthInputDraftAsset = Object.freeze({
    schemaVersion: "XINMAI_GENESIS_BIRTH_INPUT_DRAFT_V1" as const,
    date: Object.freeze({
      year: draft.year,
      month: draft.month,
      day: draft.day,
    }),
    precision: draft.precision,
    exactLocalTime: draft.exactLocalTime,
    approximateRangeStart: draft.approximateRangeStart,
    approximateRangeEnd: draft.approximateRangeEnd,
    nonAuthoritativeDraft: true as const,
    cannotFormIdentity: true as const,
  });
  persistXinmaiGenesisBirthInputDraft(asset);
}

export function recoverXinmaiGenesisBirthCoordinateDraft():
  XinmaiGenesisBirthCoordinateDraft | null {
  const asset = readXinmaiGenesisBirthInputDraft();
  if (asset === null) return null;
  return Object.freeze({
    year: asset.date.year,
    month: asset.date.month,
    day: asset.date.day,
    precision: asset.precision,
    exactLocalTime: asset.exactLocalTime,
    approximateRangeStart: asset.approximateRangeStart,
    approximateRangeEnd: asset.approximateRangeEnd,
  });
}
