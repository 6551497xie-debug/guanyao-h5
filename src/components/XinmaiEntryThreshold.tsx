import { useEffect, useState } from "react";

type XinmaiEntryThresholdProps = Readonly<{
  active: boolean;
}>;

type ThresholdPhase = "ENTERING" | "OPENING" | "ENTERED";

const THRESHOLD_TIMING_MS = Object.freeze({
  OPENING: 1_760,
  ENTERED: 2_420,
});

/**
 * XINMAI Screen 0 is a threshold, not a loader.
 *
 * It does not read identity, invoke the Life Engine, or create another
 * universe. It only gives the user's attention enough time to leave the
 * ordinary interface rhythm before the existing Launch life field is shown.
 */
export function XinmaiEntryThreshold({
  active,
}: XinmaiEntryThresholdProps) {
  const [phase, setPhase] = useState<ThresholdPhase>(
    active ? "ENTERING" : "ENTERED",
  );

  useEffect(() => {
    if (!active) {
      setPhase("ENTERED");
      return undefined;
    }

    setPhase("ENTERING");
    const openingTimer = window.setTimeout(() => {
      setPhase("OPENING");
    }, THRESHOLD_TIMING_MS.OPENING);
    const enteredTimer = window.setTimeout(() => {
      setPhase("ENTERED");
    }, THRESHOLD_TIMING_MS.ENTERED);

    return () => {
      window.clearTimeout(openingTimer);
      window.clearTimeout(enteredTimer);
    };
  }, [active]);

  if (!active || phase === "ENTERED") {
    return null;
  }

  const enterNow = () => {
    setPhase("OPENING");
    window.setTimeout(() => {
      setPhase("ENTERED");
    }, 420);
  };

  return (
    <button
      type="button"
      className="xinmai-entry-threshold"
      data-xinmai-screen="0"
      data-xinmai-threshold-phase={phase}
      aria-label="进入星脉之境"
      onClick={enterNow}
    >
      <span className="xinmai-entry-threshold__space" aria-hidden="true">
        <i />
        <i />
        <i />
      </span>
      <span className="xinmai-entry-threshold__pulse" aria-hidden="true">
        <b />
        <b />
        <b />
        <b />
        <b />
        <b />
        <b />
      </span>
      <span className="xinmai-entry-threshold__name">
        <strong>星脉之境</strong>
        <small>XINMAI</small>
      </span>
    </button>
  );
}
