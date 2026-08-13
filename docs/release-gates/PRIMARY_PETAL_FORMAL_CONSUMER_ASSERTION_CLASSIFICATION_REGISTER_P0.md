# Primary Petal Formal Consumer Release Gate Assertion Register P0

This register classifies all 58 source-level assertion calls in `scripts/check-primary-petal-resolver.mjs`. Loop assertions are counted once at source level and may execute multiple times.

- A / KEEP: **16**
- B / MODERNIZE_OR_KEEP: **42**
- C / RETIRE: **0**
- D / HOLD: **0**

| ID | Line | Class | Action | Assertion | Rationale |
|---|---:|:---:|---|---|---|
| PETAL-001 | 158 | A | KEEP | primary petal dev fixture count | Deterministic resolver, fixture, neutral-type, compatibility, or architecture-boundary fact. |
| PETAL-002 | 159 | A | KEEP | primary petal dev fixture key uniqueness | Deterministic resolver, fixture, neutral-type, compatibility, or architecture-boundary fact. |
| PETAL-003 | 164 | A | KEEP | ${…} dev fixture resolver | Deterministic resolver, fixture, neutral-type, compatibility, or architecture-boundary fact. |
| PETAL-004 | 167 | A | KEEP | unknown dev fixture stays disconnected | Deterministic resolver, fixture, neutral-type, compatibility, or architecture-boundary fact. |
| PETAL-005 | 168 | B | MODERNIZE_OR_KEEP | gravity consumes centralized primary petal dev fixture | Owner/consumer evidence must name the current formal boundary; keep when current, modernize the one stale Gravity fixture target. |
| PETAL-006 | 173 | B | MODERNIZE_OR_KEEP | gravity no longer owns primary petal dev fixtures | Owner/consumer evidence must name the current formal boundary; keep when current, modernize the one stale Gravity fixture target. |
| PETAL-007 | 178 | A | KEEP | neutral primary petal types own primary petal id | Deterministic resolver, fixture, neutral-type, compatibility, or architecture-boundary fact. |
| PETAL-008 | 183 | A | KEEP | neutral primary petal types own protocol dimension | Deterministic resolver, fixture, neutral-type, compatibility, or architecture-boundary fact. |
| PETAL-009 | 188 | A | KEEP | neutral primary petal types own selected pressure context | Deterministic resolver, fixture, neutral-type, compatibility, or architecture-boundary fact. |
| PETAL-010 | 193 | B | MODERNIZE_OR_KEEP | primary petal resolver consumes neutral types | Owner/consumer evidence must name the current formal boundary; keep when current, modernize the one stale Gravity fixture target. |
| PETAL-011 | 198 | A | KEEP | primary petal resolver no longer re-exports neutral types | Deterministic resolver, fixture, neutral-type, compatibility, or architecture-boundary fact. |
| PETAL-012 | 203 | A | KEEP | primary petal resolver no longer owns selected pressure context type | Deterministic resolver, fixture, neutral-type, compatibility, or architecture-boundary fact. |
| PETAL-013 | 208 | B | MODERNIZE_OR_KEEP | gravity runtime input consumes neutral primary petal type | Owner/consumer evidence must name the current formal boundary; keep when current, modernize the one stale Gravity fixture target. |
| PETAL-014 | 213 | B | MODERNIZE_OR_KEEP | gravity runtime input no longer depends on primary petal service | Owner/consumer evidence must name the current formal boundary; keep when current, modernize the one stale Gravity fixture target. |
| PETAL-015 | 218 | A | KEEP | runtime types consume neutral primary petal types | Deterministic resolver, fixture, neutral-type, compatibility, or architecture-boundary fact. |
| PETAL-016 | 223 | A | KEEP | runtime types no longer depend on primary petal service | Deterministic resolver, fixture, neutral-type, compatibility, or architecture-boundary fact. |
| PETAL-017 | 228 | B | MODERNIZE_OR_KEEP | scene graph consumes neutral primary petal types | Owner/consumer evidence must name the current formal boundary; keep when current, modernize the one stale Gravity fixture target. |
| PETAL-018 | 233 | B | MODERNIZE_OR_KEEP | scene graph no longer depends on primary petal service | Owner/consumer evidence must name the current formal boundary; keep when current, modernize the one stale Gravity fixture target. |
| PETAL-019 | 238 | B | MODERNIZE_OR_KEEP | runtime engine consumes neutral selected pressure context type | Owner/consumer evidence must name the current formal boundary; keep when current, modernize the one stale Gravity fixture target. |
| PETAL-020 | 243 | B | MODERNIZE_OR_KEEP | runtime engine keeps primary petal runtime functions | Owner/consumer evidence must name the current formal boundary; keep when current, modernize the one stale Gravity fixture target. |
| PETAL-021 | 248 | B | MODERNIZE_OR_KEEP | gravity consumes neutral selected pressure context type | Owner/consumer evidence must name the current formal boundary; keep when current, modernize the one stale Gravity fixture target. |
| PETAL-022 | 253 | B | MODERNIZE_OR_KEEP | gravity no longer depends on primary petal service types | Owner/consumer evidence must name the current formal boundary; keep when current, modernize the one stale Gravity fixture target. |
| PETAL-023 | 258 | A | KEEP | change experience smoke fixtures consume neutral primary petal type | Deterministic resolver, fixture, neutral-type, compatibility, or architecture-boundary fact. |
| PETAL-024 | 263 | A | KEEP | change experience smoke fixtures no longer depend on primary petal service types | Deterministic resolver, fixture, neutral-type, compatibility, or architecture-boundary fact. |
| PETAL-025 | 268 | A | KEEP | primary petal dev fixtures consume neutral primary petal types | Deterministic resolver, fixture, neutral-type, compatibility, or architecture-boundary fact. |
| PETAL-026 | 273 | A | KEEP | primary petal dev fixtures no longer depend on primary petal service types | Deterministic resolver, fixture, neutral-type, compatibility, or architecture-boundary fact. |
| PETAL-027 | 278 | B | MODERNIZE_OR_KEEP | hexagram asset candidate consumes neutral primary petal types | Owner/consumer evidence must name the current formal boundary; keep when current, modernize the one stale Gravity fixture target. |
| PETAL-028 | 283 | A | KEEP | hexagram asset candidate keeps primary petal runtime function only | Deterministic resolver, fixture, neutral-type, compatibility, or architecture-boundary fact. |
| PETAL-029 | 288 | B | MODERNIZE_OR_KEEP | hexagram asset candidate primary petal service import count | Owner/consumer evidence must name the current formal boundary; keep when current, modernize the one stale Gravity fixture target. |
| PETAL-030 | 293 | B | MODERNIZE_OR_KEEP | hexagram asset draft candidate consumes neutral primary petal type | Owner/consumer evidence must name the current formal boundary; keep when current, modernize the one stale Gravity fixture target. |
| PETAL-031 | 298 | B | MODERNIZE_OR_KEEP | hexagram asset draft candidate no longer depends on primary petal service | Owner/consumer evidence must name the current formal boundary; keep when current, modernize the one stale Gravity fixture target. |
| PETAL-032 | 303 | B | MODERNIZE_OR_KEEP | hexagram asset mapping candidate consumes neutral primary petal type | Owner/consumer evidence must name the current formal boundary; keep when current, modernize the one stale Gravity fixture target. |
| PETAL-033 | 308 | B | MODERNIZE_OR_KEEP | hexagram asset mapping candidate no longer depends on primary petal service | Owner/consumer evidence must name the current formal boundary; keep when current, modernize the one stale Gravity fixture target. |
| PETAL-034 | 313 | B | MODERNIZE_OR_KEEP | force translation candidate consumes neutral primary petal type | Owner/consumer evidence must name the current formal boundary; keep when current, modernize the one stale Gravity fixture target. |
| PETAL-035 | 318 | B | MODERNIZE_OR_KEEP | force translation candidate no longer depends on primary petal service | Owner/consumer evidence must name the current formal boundary; keep when current, modernize the one stale Gravity fixture target. |
| PETAL-036 | 323 | B | MODERNIZE_OR_KEEP | asset shell candidate consumes neutral primary petal type | Owner/consumer evidence must name the current formal boundary; keep when current, modernize the one stale Gravity fixture target. |
| PETAL-037 | 328 | B | MODERNIZE_OR_KEEP | asset shell candidate no longer depends on primary petal service | Owner/consumer evidence must name the current formal boundary; keep when current, modernize the one stale Gravity fixture target. |
| PETAL-038 | 333 | B | MODERNIZE_OR_KEEP | card blueprint candidate consumes neutral primary petal type | Owner/consumer evidence must name the current formal boundary; keep when current, modernize the one stale Gravity fixture target. |
| PETAL-039 | 338 | B | MODERNIZE_OR_KEEP | card blueprint candidate no longer depends on primary petal service | Owner/consumer evidence must name the current formal boundary; keep when current, modernize the one stale Gravity fixture target. |
| PETAL-040 | 343 | B | MODERNIZE_OR_KEEP | asset render candidate consumes neutral primary petal type | Owner/consumer evidence must name the current formal boundary; keep when current, modernize the one stale Gravity fixture target. |
| PETAL-041 | 348 | B | MODERNIZE_OR_KEEP | asset render candidate no longer depends on primary petal service | Owner/consumer evidence must name the current formal boundary; keep when current, modernize the one stale Gravity fixture target. |
| PETAL-042 | 353 | B | MODERNIZE_OR_KEEP | final asset candidate consumes neutral primary petal type | Owner/consumer evidence must name the current formal boundary; keep when current, modernize the one stale Gravity fixture target. |
| PETAL-043 | 358 | B | MODERNIZE_OR_KEEP | final asset candidate no longer depends on primary petal service | Owner/consumer evidence must name the current formal boundary; keep when current, modernize the one stale Gravity fixture target. |
| PETAL-044 | 363 | B | MODERNIZE_OR_KEEP | official asset generation candidate consumes neutral primary petal type | Owner/consumer evidence must name the current formal boundary; keep when current, modernize the one stale Gravity fixture target. |
| PETAL-045 | 368 | B | MODERNIZE_OR_KEEP | official asset generation candidate no longer depends on primary petal service | Owner/consumer evidence must name the current formal boundary; keep when current, modernize the one stale Gravity fixture target. |
| PETAL-046 | 373 | B | MODERNIZE_OR_KEEP | official asset object consumes neutral primary petal type | Owner/consumer evidence must name the current formal boundary; keep when current, modernize the one stale Gravity fixture target. |
| PETAL-047 | 378 | B | MODERNIZE_OR_KEEP | official asset object no longer depends on primary petal service | Owner/consumer evidence must name the current formal boundary; keep when current, modernize the one stale Gravity fixture target. |
| PETAL-048 | 383 | B | MODERNIZE_OR_KEEP | asset card render candidate consumes neutral primary petal type | Owner/consumer evidence must name the current formal boundary; keep when current, modernize the one stale Gravity fixture target. |
| PETAL-049 | 388 | B | MODERNIZE_OR_KEEP | asset card render candidate no longer depends on primary petal service | Owner/consumer evidence must name the current formal boundary; keep when current, modernize the one stale Gravity fixture target. |
| PETAL-050 | 393 | B | MODERNIZE_OR_KEEP | asset card ui candidate consumes neutral primary petal type | Owner/consumer evidence must name the current formal boundary; keep when current, modernize the one stale Gravity fixture target. |
| PETAL-051 | 398 | B | MODERNIZE_OR_KEEP | asset card ui candidate no longer depends on primary petal service | Owner/consumer evidence must name the current formal boundary; keep when current, modernize the one stale Gravity fixture target. |
| PETAL-052 | 403 | B | MODERNIZE_OR_KEEP | ui component candidate consumes neutral primary petal type | Owner/consumer evidence must name the current formal boundary; keep when current, modernize the one stale Gravity fixture target. |
| PETAL-053 | 408 | B | MODERNIZE_OR_KEEP | ui component candidate no longer depends on primary petal service | Owner/consumer evidence must name the current formal boundary; keep when current, modernize the one stale Gravity fixture target. |
| PETAL-054 | 413 | B | MODERNIZE_OR_KEEP | component implementation candidate consumes neutral primary petal type | Owner/consumer evidence must name the current formal boundary; keep when current, modernize the one stale Gravity fixture target. |
| PETAL-055 | 418 | B | MODERNIZE_OR_KEEP | component implementation candidate no longer depends on primary petal service | Owner/consumer evidence must name the current formal boundary; keep when current, modernize the one stale Gravity fixture target. |
| PETAL-056 | 423 | B | MODERNIZE_OR_KEEP | safe component stub candidate consumes neutral primary petal type | Owner/consumer evidence must name the current formal boundary; keep when current, modernize the one stale Gravity fixture target. |
| PETAL-057 | 428 | B | MODERNIZE_OR_KEEP | safe component stub candidate no longer depends on primary petal service | Owner/consumer evidence must name the current formal boundary; keep when current, modernize the one stale Gravity fixture target. |
| PETAL-058 | 438 | B | MODERNIZE_OR_KEEP | primary petal service is limited to runtime consumers | Owner/consumer evidence must name the current formal boundary; keep when current, modernize the one stale Gravity fixture target. |

