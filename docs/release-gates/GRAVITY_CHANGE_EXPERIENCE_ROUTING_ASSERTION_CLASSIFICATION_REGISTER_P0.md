# Gravity Change Experience Routing Assertion Classification Register P0

Source: `scripts/check-gravity-change-experience-routing.mjs`

Classification vocabulary:

- **A** — Canonical Fact: Runtime/product fact that must remain true.
- **B** — Consumer Contract: a formal Consumer ownership or consumption boundary.
- **C** — Legacy Presentation Detail: retired prop, copy, component or DOM implementation detail.
- **D** — Unknown/Ambiguous: insufficient ownership evidence; must be held.

| ID | Source assertion | Class | Corrective disposition |
|---:|---|:---:|---|
| 01 | gravity change experience route count | A | KEEP |
| 02 | gravity change experience route uniqueness | A | KEEP |
| 03 | gravity change experience smoke fixture count | A | KEEP |
| 04 | gravity change experience smoke fixture key uniqueness | A | KEEP |
| 05 | gravity change experience smoke key count | A | KEEP |
| 06 | gravity change experience smoke key uniqueness | A | KEEP |
| 07 | per-dimension awareness route dimension | A | KEEP |
| 08 | per-dimension awareness route unit | A | KEEP |
| 09 | presentation matches unit imprint | A | KEEP |
| 10 | per-smoke route dimension | A | KEEP |
| 11 | per-smoke fixture key | A | KEEP |
| 12 | per-smoke revision layer | A | KEEP |
| 13 | per-smoke revision yao | A | KEEP |
| 14 | per-smoke intervention potential | A | KEEP |
| 15 | per-smoke user agency | A | KEEP |
| 16 | per-smoke action line present | A | KEEP |
| 17 | per-smoke source reason present | A | KEEP |
| 18 | smoke pressure context present | A | KEEP |
| 19 | smoke mother profile present | A | KEEP |
| 20 | smoke persona output present | A | KEEP |
| 21 | smoke revision action present | A | KEEP |
| 22 | non-awareness route without smoke disconnected | A | KEEP |
| 23 | unknown layer disconnected | A | KEEP |
| 24 | runtime consumes centralized route | B | KEEP current owner |
| 25 | development Gravity entry consumes centralized smoke fixture | B | KEEP current owner |
| 26 | runtime consumes centralized smoke revision action | B | KEEP current owner |
| 27 | Gravity consumes unified change-experience runtime | B | KEEP current owner |
| 28 | Gravity does not own smoke revision routing | B | KEEP ownership boundary |
| 29 | Gravity does not import smoke presentation fixtures | B | KEEP ownership boundary |
| 30 | smoke fixtures consume neutral runtime input types | A | KEEP |
| 31 | smoke fixtures do not own stored mother-profile type | A | KEEP |
| 32 | smoke fixtures do not own stored persona-output type | A | KEEP |
| 33 | runtime input types own stored origin mother context | A | KEEP |
| 34 | runtime input types own Dynamics input context | A | KEEP |
| 35 | Gravity does not own stored origin mother context type | A | KEEP |
| 36 | Gravity does not own Dynamics input context type | A | KEEP |
| 37 | Gravity does not own smoke fixture constants | A | KEEP |
| 38 | Gravity presentation marker follows typed Action Route | B | KEEP current owner |
| 39 | Gravity does not own unit routing | B | KEEP ownership boundary |
| 40 | Gravity does not own presentation routing | B | KEEP ownership boundary |
| 41 | Gravity does not own layer-dimension routing | B | KEEP ownership boundary |
| 42 | Gravity does not consume dormant first-response label | C | RETIRE assertion |
| 43 | Gravity does not import dormant first-response copy | C | RETIRE assertion |
| 44 | Gravity removes familiar-reaction label | C | RETIRE assertion |
| 45 | Gravity does not own first-response copy | C | RETIRE assertion |
| 46 | observation surface emits typed presented outcome | B | KEEP current Consumer contract |
| 47 | observation surface emits Motion first observation | B | KEEP current Consumer contract |
| 48 | observation surface emits Static first observation | B | KEEP current Consumer contract |
| 49 | typed observation requires current Reality trace | B | KEEP current contract |
| 50 | typed observation requires first-observation affordance | B | KEEP current contract |
| 51 | Gravity Host aggregates typed surface outcomes | B | KEEP current owner |
| 52 | Gravity Host reports typed minimum surface | B | KEEP current owner |
| 53 | Gravity watchdog reports unavailable | B | KEEP fail-closed contract |
| 54 | Gravity watchdog cannot report success | B | KEEP fail-closed contract |
| 55 | Gravity Controller owns Active commit | A | KEEP Authority fact |
| 56 | Gravity Page cannot produce Active | B | KEEP Authority boundary |
| 57 | Gravity Host cannot produce Active | B | KEEP Authority boundary |
| 58 | Gravity Route cannot produce Active | B | KEEP Authority boundary |
| 59 | Pressure presentation does not consume first-response label | C | RETIRE assertion |
| 60 | Choice presentation does not consume first-response label | C | RETIRE assertion |
| 61 | Crystal presentation does not consume first-response label | C | RETIRE assertion |
| 62 | legacy direct Choice-to-Crystal flow is isolated | B | KEEP current boundary |
| 63 | exact `UNDERSTAND_THEN_PAUSE_THEN_PARTICIPATE` DOM marker | C | RETIRE assertion |
| 64 | exact `CANDIDATE_NOT_CONCLUSION` DOM marker | C | RETIRE assertion; current failure |
| 65 | Choice holds response space before Crystal | B | MODERNIZE to typed Choice/Growth owners |
| 66 | Choice explicitly continues through Reality lifecycle | B | MODERNIZE to typed Departure/Return owners |
| 67 | fresh Reality preserves completed-life continuity | B | MODERNIZE to next-cycle reconciliation owner |
| 68 | Crystal withheld until qualifying lived response | B | MODERNIZE to Crystal Eligibility Authority |
| 69 | Choice does not claim reality has changed | B | MODERNIZE to formal semantic and Choice contracts |

## Totals

| Class | Count |
|---|---:|
| A | 32 |
| B | 28 |
| C | 9 |
| D | 0 |
| Total | 69 |

No assertion is deleted or modernized by this audit commit. This register freezes the permitted scope of the subsequent corrective.

