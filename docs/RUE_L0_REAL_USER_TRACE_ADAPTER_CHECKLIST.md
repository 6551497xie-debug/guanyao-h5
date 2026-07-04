# RUE-L0 Real User Trace Adapter Checklist P0

This checklist defines the required go/no-go checks before RUE-L0 can receive a real behavior stream.

It does not implement the adapter. It only defines the audit boundary for real user data readiness.

## 1. SYSTEM INTEGRITY CHECK

- RUE-L0 frozen: must be YES.
- Undefined metrics structure exists: must be NO.
- Unlocked event schema exists: must be NO.
- Non-deterministic logic exists: must be NO.

## 2. DATA SAFETY CHECK

- All user identity fields are removed.
- Device fingerprints are removed.
- Precise geographic location is removed.
- Raw text storage is forbidden.
- Anonymous `sessionId` is enabled.

## 3. SCHEMA VALIDATION CHECK

- Every `eventType` belongs to `RUEEventType`.
- `timestamp` is a number and monotonically increasing inside the normalized trace.
- `stepIndex` is standardized with one consistent convention, either 0-based or 1-based.
- `seedId` is nullable-safe.

## 4. COMPATIBILITY CHECK

- Mock trace can be fully replaced by real trace after adapter normalization.
- Metrics do not depend on data source type.
- Summary does not depend on input source.
- Beast vector remains deterministic.

## 5. SAMPLING CHECK

- Sampling rate control is supported.
- Default mode is low-frequency sampling.
- Seed-based sampling is supported without reverse-identifying users.

## 6. RETENTION CHECK

- Raw trace is limited to short-term cache.
- Metrics may be stored long term when identity-free.
- Summary may be stored long term at the statistical layer.
- Suggestion output is stored only at the structure level.

## 7. FORBIDDEN CHECK

- ❌ Do not store user identity.
- ❌ Do not track users across sessions.
- ❌ Do not generate user profiles.
- ❌ Do not introduce UI logic.
- ❌ Do not modify the RUE-L0 structure.

## 8. FINAL GO / NO-GO RULE

```text
ALL CHECKS = PASS → REAL USER MODE ALLOWED
ANY CHECK FAIL → SYSTEM MUST REMAIN MOCK MODE ONLY
```

## 9. FINAL STATEMENT

This checklist is used for:

> moving RUE-L0 from design complete into auditable launch readiness.
