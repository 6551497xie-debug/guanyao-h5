import type { BaseRUEPayload, RUEEventType, RUEPayloadFor } from "./index";

export type AssertValidRUEEventPayload<E extends RUEEventType> = RUEPayloadFor<E> extends BaseRUEPayload ? true : never;

type AssertPayloadAssignable<E extends RUEEventType, Payload extends RUEPayloadFor<E>> = true;

type _GoodEntry = AssertValidRUEEventPayload<"launch_entry">;
type _GoodFlow = AssertValidRUEEventPayload<"step_view">;
type _GoodExit = AssertValidRUEEventPayload<"session_exit">;
type _GoodEngagement = AssertValidRUEEventPayload<"hesitation_gap">;

// @ts-expect-error step_view requires BaseRUEPayload.sessionId.
type _BadFlowMissingSessionId = AssertPayloadAssignable<"step_view", { timestamp: 1 }>;

// @ts-expect-error session_exit requires ExitEventPayload.exitReason.
type _BadExitMissingReason = AssertPayloadAssignable<"session_exit", { sessionId: "s1"; timestamp: 1 }>;

// @ts-expect-error session_exit only accepts the locked exitReason union.
type _BadExitReason = AssertPayloadAssignable<"session_exit", { sessionId: "s1"; timestamp: 1; exitReason: "timeout" }>;

