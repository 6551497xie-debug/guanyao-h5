# Isolated WebGL Renderer Prototype Slice Assertion Classification Register P0

Source: `scripts/check-isolated-webgl-renderer-prototype-slice.mjs`

All arrays, file checks, dependency checks, Consumer scans, and runtime expectations are expanded into 138 logical assertion IDs. Every ID belongs to exactly one range below.

| IDs | Count | Assertion group | Class | Corrective disposition |
|---:|---:|---|:---:|---|
| 001–019 | 19 | Required source/protocol/type/Consumer/package files exist | A | KEEP |
| 020–022 | 3 | Identity → Manifestation → Visual State → Renderer ordering and formal identity | A | KEEP |
| 023 | 1 | P97 supplies identity-blind RenderPlan | B | KEEP |
| 024 | 1 | Exact P98 first-experiment authorization wording | C | RETIRE assertion |
| 025–030 | 6 | Shared prototype/core public type exports | B | KEEP |
| 031–032 | 2 | Scene semantic role and typed static fallback mode | B | KEEP |
| 033 | 1 | Renderer projection remains identity-blind | A | KEEP |
| 034 | 1 | Prototype consumes RenderPlan only | B | KEEP |
| 035–036 | 2 | Original authorization/manual-frame experiment switches | C | RETIRE assertions |
| 037 | 1 | Shared core does not own the animation loop | B | KEEP |
| 038–041 | 4 | Obsolete no-production/no-UI/no-formal-user/no-runtime prototype declarations | C | RETIRE assertions |
| 042 | 1 | Renderer/prototype owns no Storage write | A | KEEP |
| 043 | 1 | RenderPlan-to-scene projection export | B | KEEP |
| 044–045 | 2 | Exact Three.js import and constructor choice | C | RETIRE assertions |
| 046 | 1 | WebGL2 capability request | B | KEEP |
| 047–053 | 7 | Exact Scene/Camera/Points/Line/Mesh/Light/render implementation | C | RETIRE assertions |
| 054–059 | 6 | Context loss/recovery, render/resize/dispose, typed fallback surface | B | KEEP |
| 060–063 | 4 | Isolated facade, shared-core delegation, authorization blocks | B | KEEP |
| 064–065 | 2 | Prototype/shared core do not own scheduling loops | B | KEEP |
| 066–079 | 14 | Renderer excludes identity engines, identity labels, animal symbols, and Storage | A | KEEP |
| 080–090 | 11 | Exact original P99 protocol title/copy/next-step wording | C | RETIRE assertions |
| 091–093 | 3 | Shared authorization reference and public type exports | B | KEEP |
| 094–097 | 4 | Exact dependency presence/absence and single import-site topology | C | RETIRE assertions |
| 098–112 | 15 | Prototype facade remains absent from formal pages/routes and old Lab surfaces | B | KEEP isolation boundary |
| 113–114 | 2 | Gate registration and Release participation | A | KEEP |
| 115–116 | 2 | Two fixture cases produce typed RenderPlans | B | KEEP |
| 117 | 1 | Legacy P98 authorization fixture remains exactly authorized | C | RETIRE assertion |
| 118–119 | 2 | Both scene projections are identity-blind | A | KEEP |
| 120–124 | 5 | Deterministic and input-sensitive projection behavior | B | KEEP |
| 125–126 | 2 | Legacy P98 missing-authorization status/reason fixture | C | RETIRE assertions |
| 127–128 | 2 | Missing Canvas typed fallback | B | KEEP |
| 129–130 | 2 | Reduced Motion typed fallback | B | KEEP |
| 131–132 | 2 | Non-Reality Canvas without WebGL2 returns typed fallback | B | KEEP; modernize Canvas double |
| 133–136 | 4 | Invalid viewport and pixel ratio fail closed | B | KEEP |
| 137–138 | 2 | Unbound RenderPlan fails closed | B | KEEP |

## Totals

| Class | Count |
|---|---:|
| A | 42 |
| B | 62 |
| C | 34 |
| D | 0 |
| Total | 138 |

The audit changes no Gate or product implementation.
