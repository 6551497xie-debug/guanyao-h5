import { useEffect, useState } from "react";
import {
  XINMAI_GRAVITY_ENTRY_ACCEPTANCE_SCENARIO,
  readRealityAdventureContinuityAcceptanceSnapshot,
  readGravityEntryAcceptanceEvidence,
  type RealityAdventureContinuityAcceptanceSnapshot,
  type XinmaiGravityEntryAcceptanceEvidence,
} from "./xinmaiGravityEntryAcceptanceScenario";

export function XinmaiGravityEntryAcceptanceEvidencePanel() {
  const [events, setEvents] = useState<
    readonly XinmaiGravityEntryAcceptanceEvidence[]
  >(readGravityEntryAcceptanceEvidence);
  const [continuity, setContinuity] =
    useState<RealityAdventureContinuityAcceptanceSnapshot | null>(
      null,
    );

  useEffect(() => {
    const update = () => {
      setEvents(readGravityEntryAcceptanceEvidence());
      void readRealityAdventureContinuityAcceptanceSnapshot()
        .then(setContinuity);
    };
    window.addEventListener(
      "xinmai-gravity-entry-acceptance-evidence",
      update,
    );
    update();
    return () =>
      window.removeEventListener(
        "xinmai-gravity-entry-acceptance-evidence",
        update,
      );
  }, []);

  if (XINMAI_GRAVITY_ENTRY_ACCEPTANCE_SCENARIO === "NONE") {
    return null;
  }

  const latest =
    events.length === 0 ? null : events[events.length - 1];
  return (
    <aside
      data-xinmai-acceptance-harness="GRAVITY_ENTRY_PRODUCTION_BROWSER"
      data-xinmai-acceptance-scenario={
        XINMAI_GRAVITY_ENTRY_ACCEPTANCE_SCENARIO
      }
      data-xinmai-acceptance-event-count={events.length}
      data-xinmai-acceptance-latest-event={
        latest?.event ?? "NONE"
      }
      data-xinmai-continuity-record-count={
        continuity?.recordCount ?? 0
      }
      data-xinmai-recognition-receipt-count={
        continuity?.recognizedReceiptCount ?? 0
      }
      data-xinmai-gravity-transfer-count={
        continuity?.gravityTransferCount ?? 0
      }
      data-xinmai-gravity-admission-count={
        continuity?.gravityAdmissionCount ?? 0
      }
      style={{
        position: "fixed",
        left: 8,
        top: 8,
        zIndex: 10001,
        width: "min(48vw, 520px)",
        maxHeight: "46vh",
        overflow: "auto",
        padding: "10px 12px",
        border: "1px solid rgba(166, 207, 215, 0.3)",
        borderRadius: 10,
        background: "rgba(2, 6, 10, 0.92)",
        color: "rgba(225, 236, 232, 0.9)",
        font: "11px/1.5 ui-monospace, SFMono-Regular, monospace",
        pointerEvents: "none",
      }}
    >
      <strong>
        Gravity Acceptance ·{" "}
        {XINMAI_GRAVITY_ENTRY_ACCEPTANCE_SCENARIO}
      </strong>
      <p style={{ margin: "6px 0 0" }}>
        Canonical · records {continuity?.recordCount ?? 0}
        {" · "}receipts {continuity?.recognizedReceiptCount ?? 0}
        {" · "}transfers {continuity?.gravityTransferCount ?? 0}
        {" · "}admissions {continuity?.gravityAdmissionCount ?? 0}
      </p>
      <ol style={{ margin: "8px 0 0", paddingLeft: 18 }}>
        {events.map((event) => (
          <li
            key={event.sequence}
            data-xinmai-gravity-acceptance-event={event.event}
          >
            {event.event}
            {event.detail === null ? "" : ` · ${event.detail}`}
          </li>
        ))}
      </ol>
    </aside>
  );
}
