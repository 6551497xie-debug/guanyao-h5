import { useEffect, useState } from "react";
import {
  XINMAI_EXPLICIT_LEAVE_ACCEPTANCE_SCENARIO,
  readAcceptanceEvidence,
  type XinmaiExplicitLeaveAcceptanceEvidence,
} from "./xinmaiRealityExplicitLeaveNavigationDeliveryAcceptanceScenario";

export function XinmaiExplicitLeaveAcceptanceEvidencePanel() {
  const [events, setEvents] = useState<
    readonly XinmaiExplicitLeaveAcceptanceEvidence[]
  >(readAcceptanceEvidence);

  useEffect(() => {
    const update = () => setEvents(readAcceptanceEvidence());
    window.addEventListener(
      "xinmai-explicit-leave-acceptance-evidence",
      update,
    );
    return () =>
      window.removeEventListener(
        "xinmai-explicit-leave-acceptance-evidence",
        update,
      );
  }, []);

  return (
    <aside
      data-xinmai-acceptance-harness="EXPLICIT_LEAVE_NAVIGATION_DELIVERY"
      data-xinmai-acceptance-scenario={
        XINMAI_EXPLICIT_LEAVE_ACCEPTANCE_SCENARIO
      }
      data-xinmai-acceptance-event-count={events.length}
      style={{
        position: "fixed",
        right: 8,
        top: 8,
        zIndex: 10000,
        width: "min(42vw, 420px)",
        maxHeight: "42vh",
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
      <strong>Acceptance · {XINMAI_EXPLICIT_LEAVE_ACCEPTANCE_SCENARIO}</strong>
      <ol style={{ margin: "8px 0 0", paddingLeft: 18 }}>
        {events.map((event) => (
          <li
            key={event.sequence}
            data-xinmai-acceptance-event={event.event}
          >
            {event.deliveryAttempt === null
              ? event.event
              : `#${event.deliveryAttempt} ${event.event}`}
          </li>
        ))}
      </ol>
    </aside>
  );
}
