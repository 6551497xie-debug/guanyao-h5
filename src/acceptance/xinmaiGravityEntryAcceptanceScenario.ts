export const XINMAI_GRAVITY_ENTRY_ACCEPTANCE_QUERY =
  "__xinmaiGravityEntryAcceptance" as const;

export type XinmaiGravityEntryAcceptanceScenario =
  | "NONE"
  | "POSITIVE_MOTION"
  | "POSITIVE_REDUCED_MOTION"
  | "DIRECT_URL_WITHOUT_ADMISSION"
  | "REALITY_ADVENTURE_MOTION"
  | "REALITY_ADVENTURE_REDUCED_MOTION"
  | "REALITY_ADVENTURE_DIRECT_URL";

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
    "REALITY_ADVENTURE_MOTION",
    "REALITY_ADVENTURE_REDUCED_MOTION",
    "REALITY_ADVENTURE_DIRECT_URL",
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

export type RealityAdventureContinuityAcceptanceSnapshot =
  Readonly<{
    status: "READY" | "UNAVAILABLE";
    recordCount: number;
    recognizedReceiptCount: number;
    gravityTransferCount: number;
    gravityAdmissionCount: number;
    canonicalRevisions: readonly number[];
  }>;

export async function readRealityAdventureContinuityAcceptanceSnapshot():
  Promise<RealityAdventureContinuityAcceptanceSnapshot> {
  const emptySnapshot = Object.freeze({
    status: "READY" as const,
    recordCount: 0,
    recognizedReceiptCount: 0,
    gravityTransferCount: 0,
    gravityAdmissionCount: 0,
    canonicalRevisions: Object.freeze([]),
  });
  if (typeof indexedDB === "undefined") {
    return Object.freeze({
      status: "UNAVAILABLE" as const,
      recordCount: 0,
      recognizedReceiptCount: 0,
      gravityTransferCount: 0,
      gravityAdmissionCount: 0,
      canonicalRevisions: Object.freeze([]),
    });
  }
  if (typeof indexedDB.databases === "function") {
    try {
      const databases = await indexedDB.databases();
      if (
        !databases.some(
          (database) =>
            database.name ===
            "xinmai-reality-adventure-continuity",
        )
      ) {
        return emptySnapshot;
      }
    } catch {
      return Object.freeze({
        ...emptySnapshot,
        status: "UNAVAILABLE" as const,
      });
    }
  } else {
    return Object.freeze({
      ...emptySnapshot,
      status: "UNAVAILABLE" as const,
    });
  }
  return new Promise((resolve) => {
    const unavailable = () =>
      resolve(Object.freeze({
        status: "UNAVAILABLE" as const,
        recordCount: 0,
        recognizedReceiptCount: 0,
        gravityTransferCount: 0,
        gravityAdmissionCount: 0,
        canonicalRevisions: Object.freeze([]),
      }));
    const request = indexedDB.open(
      "xinmai-reality-adventure-continuity",
      1,
    );
    request.onerror = unavailable;
    request.onblocked = unavailable;
    request.onsuccess = () => {
      const database = request.result;
      if (
        !database.objectStoreNames.contains(
          "reality-adventure-encounter-continuity",
        )
      ) {
        database.close();
        unavailable();
        return;
      }
      const transaction = database.transaction(
        "reality-adventure-encounter-continuity",
        "readonly",
      );
      const recordsRequest = transaction
        .objectStore(
          "reality-adventure-encounter-continuity",
        )
        .getAll();
      let records: readonly Record<string, unknown>[] = [];
      recordsRequest.onsuccess = () => {
        records = Array.isArray(recordsRequest.result)
          ? recordsRequest.result
          : [];
      };
      transaction.onabort = () => {
        database.close();
        unavailable();
      };
      transaction.oncomplete = () => {
        database.close();
        resolve(Object.freeze({
          status: "READY" as const,
          recordCount: records.length,
          recognizedReceiptCount: records.filter(
            (record) => record.recognitionReceipt !== null,
          ).length,
          gravityTransferCount: records.filter(
            (record) => record.gravityTransfer !== null,
          ).length,
          gravityAdmissionCount: records.filter(
            (record) => record.gravityAdmission !== null,
          ).length,
          canonicalRevisions: Object.freeze(
            records
              .map((record) => record.canonicalRevision)
              .filter(
                (revision): revision is number =>
                  typeof revision === "number",
              ),
          ),
        }));
      };
    };
  });
}
