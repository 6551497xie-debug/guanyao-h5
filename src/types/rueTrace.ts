export type RUEEntryEvent = "launch_entry" | "launch_re_entry";

export type RUEFlowEvent = "step_view" | "step_complete" | "step_retry" | "step_back";

export type RUEExitEvent = "session_exit" | "session_abandon";

export type RUEEngagementEvent = "dwell_time" | "click_repeat" | "hesitation_gap";

export type RUEEventType = RUEEntryEvent | RUEFlowEvent | RUEExitEvent | RUEEngagementEvent;

