# XINMAI 1.0 Six-Dimension Canonical Observation Authority Atomic Activation Phase 2 — Evidence Manifest P0

Date: 2026-08-10

Expected parent: `a8ae5f5dc273881e8969c10415b26dd4f8ba225d`

Candidate policy: `SIX_DIMENSION_V2_NEW_MUTATION = ENABLED`

## Authority boundary

- Canonical protocol: `XINMAI_SIX_DIMENSION_PROTOCOL_2026_08_10_V2`.
- Fixed dimensions: `body`, `emotion`, `thought`, `action`, `memory`, `goal`.
- Only an explicit dimension-specific `ACKNOWLEDGE_OBSERVATION` command qualifies as `OBSERVED`.
- `PRESENTED`, route entry, elapsed time, animation completion, engine phase and DOM/page counters do not qualify.
- `SKIPPED`, `DECLINED`, `UNAVAILABLE` and `SAFE_WITHHELD` do not qualify for completion.
- The sixth distinct qualifying item and the single completion receipt are committed in the same IndexedDB transaction.
- Completion proves observation only. It does not create a Reality Fact, Formation Receipt, Crystal or Body Imprint.

## Public typed outcome table

| Layer | Success | Fail-closed outcomes | Retry owner |
|---|---|---|---|
| Item command | `OBSERVATION_RECORDED`, `OBSERVATION_ALREADY_RECORDED`, `NON_QUALIFYING_OUTCOME_RECORDED`, `COMPLETION_RECEIPT_COMMITTED` | policy withheld, invalid command/lineage/dimension, stale aggregate, fence conflict, storage unavailable/blocked/aborted/corrupt | authority result |
| Observation reader | exact canonical subset and optional immutable receipt | missing, revision mismatch, corrupt evidence, storage unavailable | authority result |
| Choice V3 | `XINMAI_CHOICE_ACTION_INTENTION_V3` bound to receipt/set version/protocol/content and evidence digest | receipt missing/mismatch/corrupt, prerequisites not ready, transaction conflict | authority result |
| Presentation/accessibility | read-only mapping of the above | preserves immutable inner cause; no inferred retry | authority result |

No failure envelope is persisted as a second authority.

## Transaction and recovery matrix

| Case | Evidence |
|---|---|
| Screen entry / waiting / animation | zero observed outcomes; product check and Phase 2 gate PASS |
| Refresh after 1, 2, 3, 4, 5 acknowledgements | restored precisely `1,2,3,4,5`; never reconstructed remaining dimensions |
| Sixth acknowledgement | one receipt committed with the sixth item in the same transaction |
| Duplicate command / same item from two tabs | deterministic command fence and item reference return the existing outcome; no second item |
| Concurrent sixth command | unique receipt reference plus one transaction yields one receipt |
| Refresh / Back / Forward / multi-tab | same observation set, receipt reference and digest |
| Stale revision / late tab | fail closed with typed stale/conflict result |
| Abort / blocked / quota or unavailable storage / corrupt evidence | fail closed; no partial receipt and no Choice V3 |
| V1 Gravity and Choice V1/V2 | read-only grandfathering; no backfill and no fabricated V2 receipt |

The registered multi-tab/transaction gates exercise the shared IndexedDB transaction and uniqueness boundary; the Phase 2 gate additionally freezes the six-dimension-specific fence, receipt and V3 proof requirements.

## Hashed Production positive journey

Origin: `http://127.0.0.1:5494`

Birth input: `1990-01-15 10:00` through native date/time controls.

Journey: Birth → Genesis → Reality → Gravity → six explicit canonical acknowledgements → Choice V3 → explicit Departure → explicit Return → `ATTEMPTED` lived response → one Fact → one Formation Receipt → one Crystal → Ownership → one Body Imprint → Archive.

Canonical references:

- Encounter: `reality-encounter:a37934f6-6ea4-4ba1-859b-43845a2c70ae`
- Gravity cycle: `gravity-cycle:c9e7ef1f`
- Runtime seed: `MID_LIFE_POWER_01`
- Catalog revision: `GUANYAO_PRESSURE_SEED_MATRIX_CATALOG_2026_08_10_FIVE_STAGE_450_P0`
- Observation-set reference begins: `six-dimension-observation-set:...reality-encounter%3Aa37934f6-6ea4-4ba1-859b-43845a2c70ae...gravity-cycle%3Ac9e7ef1f...`
- Completion-receipt reference ends with evidence digest: `b63045c861ec8d6b0aa3a8dd53c376892a7de0e2ff544ba08b87702e9b0a2eb3`
- Choice reference: `choice-intention-v3:1maq1m9`
- Choice schema: `XINMAI_CHOICE_ACTION_INTENTION_V3`
- Choice receipt reference: byte-identical to the completion receipt reference.

Before Choice, the receipt existed and the page explicitly stated that no Crystal existed. After explicit Departure, no Fact or Crystal existed. A legitimate `ATTEMPTED` return formed exactly one Crystal/Body lineage. Archive and the returning-life banner both reported one canonical trace. Refresh did not increase the count.

Negative authority gates prove that `NOT_ATTEMPTED` and `DECLINED` form no Fact, Formation Receipt, Crystal or Body Imprint.

## Viewport and motion evidence

| CSS viewport | `visualViewport` | DPR | `scrollWidth` | Result |
|---|---|---:|---:|---|
| 390×844 | 390×844, scale 1 | 1 | 390 | six observations, receipt and Choice V3 reachable; no horizontal overflow |
| 320×568 | 320×568, scale 1 | 1 | 320 | Choice, Departure, Return, lived response and Archive reachable by normal scrolling; no horizontal overflow |

Local screenshots:

- `/private/tmp/xinmai-phase2-choice-390x844-final.png`
- `/private/tmp/xinmai-phase2-choice-320x568-final.png`
- `/private/tmp/xinmai-phase2-archive-320x568-final.png`

Native `prefers-reduced-motion` was `false` during this run. Motion changes do not participate in canonical item, receipt or Choice formation; registered static/reduced-motion contracts preserve identical facts. Native reduced-motion `true` was not system-switched in this engineering run and is an explicit acceptance follow-up, not claimed as observed.

## Engineering and hygiene

- Persisted database remains version 3.
- Six-dimension stores remain exactly: observation set, completion receipt and command fence. No fourth store.
- Pressure Catalog 450, Birth, Identity, Relationship, Growth, Crystal and Body authority semantics are unchanged.
- Production bundle consumes hashed assets and contains no executable Fixture/Acceptance/manual-failure-injection route and no AI authoring/review metadata.
- TypeScript, Production Build and all registered XINMAI gates are required to pass for Candidate and Counter.

## Open evidence findings

- Baseline rendering telemetry emits Canvas readback and WebGL texture warnings in headless Chrome. No application exception, unhandled rejection, authority failure or React accessibility-focus warning occurred after the Phase 2 focus corrections. These rendering warnings pre-exist the blade and are not modified because visual/WebGL work is explicitly out of scope.
- Native reduced-motion `true` remains a Control Tower environment evidence item; no CSS, query, script emulation or system-setting mutation was used.

## Per-dimension reflection-state corrective evidence

Corrective parent: `37ef5b5d5d9e455c88390192c21e4c1077413410`.

Hashed Production origins: `http://127.0.0.1:5496` and `http://127.0.0.1:5497`.

The corrective keeps the canonical observation set, item command, completion receipt and Choice V3 contracts unchanged. It resets only the mounted presentation identity for the newly pending dimension. Each pending dimension now starts at `OBSERVING`, with its local relationship/confirmation state unset and the life-reflection continuity guide remounted for that dimension. Global Identity, Gravity recognition and the persisted canonical subset are preserved.

### Continuous causality

- A clean visible-control journey advanced `0 → 1 → 2 → 3 → 4 → 5 → 6` without refresh, back navigation, hidden targets or coordinate-only actions.
- Every dimension visibly identified the current observation and exposed its own first approach, second approach, third approach, explicit acknowledgement and final continue controls.
- The canonical count incremented only after that dimension's final explicit continue action.
- Immediately after each commit, the next dimension opened at `OBSERVING`; it did not inherit `CONFIRMED`, `SELF_NAMED`, `PAUSED` or stable state from the prior dimension.
- The life-core approach control no longer calls the canonical commit callback merely because the global relationship is already recognized.
- Receipt remained `NONE` through count 5. Count 6 produced one completion receipt; its evidence digest ended in `7836928227217ffee19b30a0099e7dadf25411d009cc1a0a141aa3407b788cc5` on the refresh-matrix origin.

### Refresh and alternate-path matrix

| Checkpoint | Before reload | After reload | Pending presentation | Receipt |
|---:|---:|---:|---|---|
| 1 | body only | body only | emotion / `OBSERVING` / first approach | `NONE` |
| 2 | body + emotion | same two | thought / `OBSERVING` / first approach | `NONE` |
| 3 | first three | same three | action / `OBSERVING` / first approach | `NONE` |
| 4 | first four | same four | memory / `OBSERVING` / first approach | `NONE` |
| 5 | first five | same five | goal / `OBSERVING` / first approach | `NONE` |

The representative later `goal` dimension also passed `PAUSED → resume → THIRD_APPROACH → SELF_NAMED → final continue`; no step committed evidence before final continue.

### Downstream regression

After the unique receipt, the same formal journey completed a visible long-press Choice, explicit Departure, explicit Return and `ATTEMPTED` lived response. Receipt alone still showed no Crystal. The legitimate return formed one Crystal/Body lineage, and Archive showed exactly one formal growth trace before and after refresh. No second Fact, Formation Receipt, Crystal or Body Imprint was presented.

### Corrective viewport evidence

| CSS viewport | `visualViewport` | DPR | `scrollWidth` | Result |
|---|---|---:|---:|---|
| 390×844 | 390×844.286, scale 1 | 1.4 | 390 | full-width Archive/Body trace; no horizontal overflow |
| 320×568 | 320×567.857, scale 1 | 1.4 | 320 | full-width Archive/Body trace; no horizontal overflow |

Screenshot bytes are physical-pixel outputs at DPR 1.4 and therefore are not expected to equal the CSS viewport dimensions one-for-one:

- `/private/tmp/xinmai-six-dimension-corrective-archive-390x844.jpg`
- `/private/tmp/xinmai-six-dimension-corrective-archive-320x568.jpg`

Native `prefers-reduced-motion` remained `false`; no CSS, query parameter, script or event simulation was used to claim reduced-motion evidence. Visible controls retained button semantics and accessible names throughout the six dimension-specific sequences and downstream actions.
