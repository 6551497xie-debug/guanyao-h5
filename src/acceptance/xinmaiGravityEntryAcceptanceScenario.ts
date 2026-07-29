export const XINMAI_GRAVITY_ENTRY_ACCEPTANCE_QUERY =
  "__xinmaiGravityEntryAcceptance" as const;

export type XinmaiGravityEntryAcceptanceScenario =
  | "NONE"
  | "POSITIVE_MOTION"
  | "POSITIVE_REDUCED_MOTION"
  | "DIRECT_URL_WITHOUT_ADMISSION";

export type XinmaiGravityEntryAcceptanceEvidence =
  Readonly<{
    sequence: number;
    scenario: XinmaiGravityEntryAcceptanceScenario;
    event: string;
    admissionReferenceId: string | null;
    gravityCycleId: string | null;
    admissionRevision: number | null;
    detail: string | null;
  }>;

const scenarios =
  new Set<XinmaiGravityEntryAcceptanceScenario>([
    "POSITIVE_MOTION",
    "POSITIVE_REDUCED_MOTION",
    "DIRECT_URL_WITHOUT_ADMISSION",
  ]);

const requestedScenario = new URLSearchParams(
  window.location.search,
).get(XINMAI_GRAVITY_ENTRY_ACCEPTANCE_QUERY);

export const XINMAI_GRAVITY_ENTRY_ACCEPTANCE_SCENARIO:
  XinmaiGravityEntryAcceptanceScenario =
  requestedScenario !== null &&
  scenarios.has(
    requestedScenario as XinmaiGravityEntryAcceptanceScenario,
  )
    ? (requestedScenario as XinmaiGravityEntryAcceptanceScenario)
    : "NONE";

const evidence: XinmaiGravityEntryAcceptanceEvidence[] = [];

export function recordGravityEntryAcceptanceEvidence(input: {
  event: string;
  admissionReferenceId?: string | null;
  gravityCycleId?: string | null;
  admissionRevision?: number | null;
  detail?: string | null;
}): void {
  evidence.push(
    Object.freeze({
      sequence: evidence.length + 1,
      scenario: XINMAI_GRAVITY_ENTRY_ACCEPTANCE_SCENARIO,
      event: input.event,
      admissionReferenceId:
        input.admissionReferenceId ?? null,
      gravityCycleId: input.gravityCycleId ?? null,
      admissionRevision: input.admissionRevision ?? null,
      detail: input.detail ?? null,
    }),
  );
  window.dispatchEvent(
    new CustomEvent("xinmai-gravity-entry-acceptance-evidence"),
  );
}

export function readGravityEntryAcceptanceEvidence():
  readonly XinmaiGravityEntryAcceptanceEvidence[] {
  return Object.freeze(evidence.slice());
}
