import type { LaunchLifeSourceSession } from "../types/launchLifeSourceSession";
import { GUANYAO_HOUR_BRANCH_ORDINALS } from "./guanyaoLunarTrigramLandingResolver";
import { resolveBirthCalendarFromGregorianDate } from "./guanyaoBirthCalendarService";
import {
  createXinmaiBirthSourceReceiptReferenceId,
  deriveXinmaiHourBranchFromApproximateRange,
  deriveXinmaiHourBranchFromExactLocalTime,
} from "./xinmaiBirthTimeDerivationService";

const sameLunar = (
  left: Readonly<{ relatedYear: number; month: number; day: number; isLeapMonth: boolean }>,
  right: Readonly<{ relatedYear: number; month: number; day: number; isLeapMonth: boolean }>,
): boolean =>
  left.relatedYear === right.relatedYear &&
  left.month === right.month &&
  left.day === right.day &&
  left.isLeapMonth === right.isLeapMonth;

const validateSession = (
  session: LaunchLifeSourceSession | null | undefined,
  requireFrozen: boolean,
): session is LaunchLifeSourceSession => {
  try {
    if (
    !session ||
    (requireFrozen &&
      (!Object.isFrozen(session) || !Object.isFrozen(session.provenance))) ||
    session.source !== "launch_life_source_session" ||
    session.sourceKind !== "REAL_ENGINE_RESULT" ||
    session.sourceReferenceId.trim().length === 0 ||
    session.provenance.sourceKind !== "REAL_ENGINE_RESULT" ||
    session.provenance.sourceReferenceId !== session.sourceReferenceId ||
    session.boundary.immutableCarrier !== true ||
    session.boundary.existingEngineResultsOnly !== true ||
    session.boundary.noEngineInvocation !== true ||
    session.boundary.noStorageWrite !== true
    ) return false;
    if (session.schemaVersion === "GUANYAO_LAUNCH_LIFE_SOURCE_SESSION_V1") {
      return session.provenance.birthSource === "LAUNCH_USER_CONFIRMED";
    }
    const receipt = session.birthSourceDerivationReceipt;
    if (
    session.provenance.birthSource !== "LAUNCH_USER_CONFIRMED_DERIVATION_RECEIPT" ||
    receipt.schemaVersion !== "XINMAI_GENESIS_BIRTH_SOURCE_DERIVATION_RECEIPT_V1" ||
    receipt.authority.rawInputUserConfirmed !== true ||
    receipt.authority.branchAndLunarDeterministicallyDerived !== true ||
    receipt.authority.noDirectDerivedValueWrite !== true ||
    receipt.rawInput.precision === "UNKNOWN"
    ) return false;
    const calendar = resolveBirthCalendarFromGregorianDate(
    receipt.rawInput.localCivilGregorianDate,
  );
    if (
    calendar.status !== "READY" ||
    calendar.gregorianBirthDate !== receipt.canonicalGregorianBirthDate ||
    !sameLunar(calendar.lunarBirthDate, receipt.calendarResolution.lunarBirthDate) ||
    !sameLunar(calendar.lunarBirthDate, session.starbeastDerivationResult.lunarBirthDate)
    ) return false;
    const exactBranch = receipt.rawInput.precision === "EXACT"
    ? deriveXinmaiHourBranchFromExactLocalTime(receipt.rawInput.exactLocalTime ?? "")
    : null;
    const rangeBranch = receipt.rawInput.precision === "APPROXIMATE_RANGE"
    ? deriveXinmaiHourBranchFromApproximateRange(
        receipt.rawInput.approximateRangeStart ?? "",
        receipt.rawInput.approximateRangeEnd ?? "",
      )
    : null;
    const branch = exactBranch ?? (rangeBranch?.status === "READY" ? rangeBranch.hourBranch : null);
    const evidence = receipt.rawInput.precision === "EXACT"
    ? receipt.rawInput.exactLocalTime ?? ""
    : `${receipt.rawInput.approximateRangeStart}-${receipt.rawInput.approximateRangeEnd}`;
    const expectedReference = branch === null ? null : createXinmaiBirthSourceReceiptReferenceId({
    gregorianBirthDate: calendar.gregorianBirthDate,
    precision: receipt.rawInput.precision,
    inputEvidence: evidence,
    hourBranch: branch,
  });
    return (
    branch !== null &&
    receipt.derivedHourBranch === branch &&
    receipt.derivedHourBranchOrdinal === GUANYAO_HOUR_BRANCH_ORDINALS[branch] &&
    receipt.receiptReferenceId === expectedReference &&
    receipt.derivedHourBranch === session.birthCoordinate.hourBranch &&
    receipt.canonicalGregorianBirthDate === session.starbeastDerivationResult.gregorianBirthDate &&
    session.sourceReferenceId === `launch:v2:${receipt.receiptReferenceId}`
    );
  } catch {
    return false;
  }
};

export const isTrustedXinmaiLaunchLifeSourceSession = (
  session: LaunchLifeSourceSession | null | undefined,
): session is LaunchLifeSourceSession => validateSession(session, true);

export const isRecoverableXinmaiLaunchLifeSourceSession = (
  session: LaunchLifeSourceSession | null | undefined,
): session is LaunchLifeSourceSession => validateSession(session, false);
