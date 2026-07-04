import { getBaselineContext } from "./baselineContext";
import { detectUserType, type UserType } from "./userTypeDetector";

export function getEntryUserType(): UserType {
  const baseline = getBaselineContext();

  return detectUserType({
    hasBaseline: baseline.exists,
  });
}
