import { clearTraceLog, getTraceLog, pushEvent } from "./rueTraceMockPipe";

export type RUETraceMockPipeCheckResult = {
  success: boolean;
  steps: string[];
  error?: string;
};

export function runRUETraceMockPipeCheck(): RUETraceMockPipeCheckResult {
  const steps: string[] = [];

  try {
    clearTraceLog();
    steps.push("cleared initial trace log");

    const first = pushEvent("launch_entry", { sessionId: "check-session", timestamp: 1 });
    const second = pushEvent("step_view", { sessionId: "check-session", timestamp: 2, stepIndex: 1 });
    const third = pushEvent("hesitation_gap", { sessionId: "check-session", timestamp: 3, gapMs: 1200 });
    const ids = [first.id, second.id, third.id];

    if (ids.join(",") !== "1,2,3") {
      return {
        success: false,
        steps,
        error: `expected ids [1,2,3], received [${ids.join(",")}]`,
      };
    }
    steps.push("validated deterministic id increment");

    const snapshot = getTraceLog();
    if (snapshot.length !== 3) {
      return {
        success: false,
        steps,
        error: `expected trace log length 3, received ${snapshot.length}`,
      };
    }
    steps.push("validated trace log length");

    const firstSnapshotEvent = snapshot[0];
    if (!firstSnapshotEvent) {
      return {
        success: false,
        steps,
        error: "expected first snapshot event to exist",
      };
    }

    firstSnapshotEvent.payload.mutated = true;
    const snapshotAfterMutation = getTraceLog();
    if (snapshotAfterMutation[0]?.payload.mutated === true) {
      return {
        success: false,
        steps,
        error: "expected getTraceLog to return a snapshot copy",
      };
    }
    steps.push("validated snapshot copy isolation");

    clearTraceLog();
    if (getTraceLog().length !== 0) {
      return {
        success: false,
        steps,
        error: "expected trace log to be empty after clearTraceLog",
      };
    }
    steps.push("validated clearTraceLog empties trace log");

    const resetEvent = pushEvent("launch_re_entry", { sessionId: "check-session", timestamp: 4 });
    if (resetEvent.id !== 1) {
      return {
        success: false,
        steps,
        error: `expected reset id 1, received ${resetEvent.id}`,
      };
    }
    steps.push("validated clearTraceLog resets deterministic id");

    clearTraceLog();
    steps.push("restored empty trace log");

    return {
      success: true,
      steps,
    };
  } catch (error) {
    clearTraceLog();

    return {
      success: false,
      steps,
      error: error instanceof Error ? error.message : "unknown RUE trace mock pipe check error",
    };
  }
}
