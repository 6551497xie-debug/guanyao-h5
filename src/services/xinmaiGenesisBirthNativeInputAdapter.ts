import type {
  XinmaiGenesisBirthCoordinateDraft,
} from "../types/xinmaiGenesisBirthCoordinatePresentation";

export type XinmaiGenesisBirthNativeInputSyncPolicy =
  | "ENABLED"
  | "SAFE_WITHHELD";

export const XINMAI_GENESIS_BIRTH_NATIVE_INPUT_SYNC_POLICY:
  XinmaiGenesisBirthNativeInputSyncPolicy = "ENABLED";

export type XinmaiGenesisBirthNativeInput =
  | Readonly<{ field: "CIVIL_DATE"; value: string }>
  | Readonly<{ field: "PRECISION"; value: XinmaiGenesisBirthCoordinateDraft["precision"] }>
  | Readonly<{ field: "EXACT_LOCAL_TIME"; value: string }>
  | Readonly<{ field: "APPROXIMATE_RANGE_START"; value: string }>
  | Readonly<{ field: "APPROXIMATE_RANGE_END"; value: string }>;

export type XinmaiGenesisBirthNativeInputSyncResult = Readonly<{
  status: "UPDATED" | "UNCHANGED" | "SAFE_WITHHELD";
  draft: XinmaiGenesisBirthCoordinateDraft;
}>;

const sameCivilDate = (
  draft: XinmaiGenesisBirthCoordinateDraft,
  year: number | null,
  month: number | null,
  day: number | null,
) => draft.year === year && draft.month === month && draft.day === day;

export function syncXinmaiGenesisBirthNativeInput(
  draft: XinmaiGenesisBirthCoordinateDraft,
  input: XinmaiGenesisBirthNativeInput,
): XinmaiGenesisBirthNativeInputSyncResult {
  if (XINMAI_GENESIS_BIRTH_NATIVE_INPUT_SYNC_POLICY !== "ENABLED") {
    return Object.freeze({ status: "SAFE_WITHHELD", draft });
  }

  if (input.field === "CIVIL_DATE") {
    const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(input.value);
    const year = match ? Number(match[1]) : null;
    const month = match ? Number(match[2]) : null;
    const day = match ? Number(match[3]) : null;
    if (sameCivilDate(draft, year, month, day)) {
      return Object.freeze({ status: "UNCHANGED", draft });
    }
    return Object.freeze({
      status: "UPDATED",
      draft: Object.freeze({ ...draft, year, month, day }),
    });
  }

  const draftField = {
    PRECISION: "precision",
    EXACT_LOCAL_TIME: "exactLocalTime",
    APPROXIMATE_RANGE_START: "approximateRangeStart",
    APPROXIMATE_RANGE_END: "approximateRangeEnd",
  }[input.field] as
    | "precision"
    | "exactLocalTime"
    | "approximateRangeStart"
    | "approximateRangeEnd";

  if (draft[draftField] === input.value) {
    return Object.freeze({ status: "UNCHANGED", draft });
  }
  return Object.freeze({
    status: "UPDATED",
    draft: Object.freeze({ ...draft, [draftField]: input.value }),
  });
}
