# RUE-L0 Real User Trace Adapter Spec P0

## 1. ADAPTER PURPOSE

RUE-L0 currently runs on mock deterministic trace.

When future real user data enters the system, it must pass through a unified adapter layer for structural alignment.

This layer is only responsible for:

- field mapping;
- data normalization;
- behavior event standardization.

This layer is not responsible for:

- data collection;
- data storage;
- data analysis logic.

## 2. FIELD MAPPING

The adapter must preserve the following mock-to-real mapping:

- `pushEvent.type` → `eventType`
- `payload.sessionId` → `session_id`
- `payload.timestamp` → `event_time`
- `payload.stepIndex` → `step_index`
- `payload.seedId` → `seed_id`
- `payload.dwellMs` → `dwell_time_ms`
- `payload.gapMs` → `gap_time_ms`
- `payload.transitionMs` → `transition_time_ms`

## 3. EVENT NORMALIZATION

All real events must normalize into the following structure:

```ts
type RUEEventSchema = {
  sessionId: string;
  eventType: RUEEventType;
  timestamp: number;
  stepIndex?: number;
  seedId?: string;
  dwellMs?: number;
  gapMs?: number;
  transitionMs?: number;
};
```

## 4. ADAPTER RULES

### MUST

- force required field completion;
- fill missing fields with null-safe defaults;
- ensure `eventType` belongs to `RUEEventType`;
- ensure `timestamp` is a number.

### MUST NOT

- do not change metrics logic;
- do not change flow or beast calculation;
- do not introduce user identity fields;
- do not create cross-session identity linkage.

## 5. DATA LOSS RULE

The following data must be discarded at the adapter layer:

- user identity information;
- unstructured text content;
- device fingerprint information;
- non-behavior fields.

## 6. COMPATIBILITY PRINCIPLE

The adapter must guarantee:

> mock trace and real trace produce consistent computational meaning inside the RUE engine.

That is:

```text
REAL TRACE → ADAPTER → RUE ENGINE
≡
MOCK TRACE → RUE ENGINE
```

## 7. FINAL STATEMENT

This adapter layer:

- does not change RUE-L0;
- does not extend RUE-L0;
- does not affect the frozen structure.

It only serves as:

> the structural entry boundary for real user data.
