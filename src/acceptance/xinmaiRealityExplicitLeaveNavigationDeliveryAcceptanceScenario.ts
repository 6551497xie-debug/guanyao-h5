export const XINMAI_EXPLICIT_LEAVE_ACCEPTANCE_QUERY =
  "__xinmaiExplicitLeaveAcceptance" as const;

export type XinmaiExplicitLeaveAcceptanceScenario =
  | "NONE"
  | "NAVIGATION_INVOCATION_FAILS_ONCE"
  | "WATCHDOG_SUPPRESSES_FIRST_OUTCOME"
  | "IDENTITY_MISMATCH_ON_FIRST_ATTEMPT"
  | "RETURNING_SURFACE_UNAVAILABLE_ON_FIRST_ATTEMPT"
  | "STALE_ATTEMPT_PRECEDES_CURRENT_OUTCOME";

export type XinmaiExplicitLeaveAcceptanceEvidence =
  Readonly<{
    sequence: number;
    scenario: XinmaiExplicitLeaveAcceptanceScenario;
    event: string;
    deliveryReferenceId: string | null;
    deliveryAttempt: number | null;
    detail: string | null;
  }>;

const scenarios = new Set<XinmaiExplicitLeaveAcceptanceScenario>([
  "NAVIGATION_INVOCATION_FAILS_ONCE",
  "WATCHDOG_SUPPRESSES_FIRST_OUTCOME",
  "IDENTITY_MISMATCH_ON_FIRST_ATTEMPT",
  "RETURNING_SURFACE_UNAVAILABLE_ON_FIRST_ATTEMPT",
  "STALE_ATTEMPT_PRECEDES_CURRENT_OUTCOME",
]);

const requestedScenario = new URLSearchParams(
  window.location.search,
).get(XINMAI_EXPLICIT_LEAVE_ACCEPTANCE_QUERY);

export const XINMAI_EXPLICIT_LEAVE_ACCEPTANCE_SCENARIO:
  XinmaiExplicitLeaveAcceptanceScenario =
  requestedScenario !== null &&
  scenarios.has(
    requestedScenario as XinmaiExplicitLeaveAcceptanceScenario,
  )
    ? (requestedScenario as XinmaiExplicitLeaveAcceptanceScenario)
    : "NONE";

const consumedFaults = new Set<string>();
const evidence: XinmaiExplicitLeaveAcceptanceEvidence[] = [];

export function consumeAcceptanceFaultOnce(key: string): boolean {
  if (consumedFaults.has(key)) return false;
  consumedFaults.add(key);
  return true;
}

export function recordAcceptanceEvidence(input: {
  event: string;
  deliveryReferenceId?: string | null;
  deliveryAttempt?: number | null;
  detail?: string | null;
}): void {
  evidence.push(
    Object.freeze({
      sequence: evidence.length + 1,
      scenario: XINMAI_EXPLICIT_LEAVE_ACCEPTANCE_SCENARIO,
      event: input.event,
      deliveryReferenceId:
        input.deliveryReferenceId ?? null,
      deliveryAttempt: input.deliveryAttempt ?? null,
      detail: input.detail ?? null,
    }),
  );
  window.dispatchEvent(
    new CustomEvent("xinmai-explicit-leave-acceptance-evidence"),
  );
}

export function readAcceptanceEvidence(): readonly XinmaiExplicitLeaveAcceptanceEvidence[] {
  return Object.freeze(evidence.slice());
}
