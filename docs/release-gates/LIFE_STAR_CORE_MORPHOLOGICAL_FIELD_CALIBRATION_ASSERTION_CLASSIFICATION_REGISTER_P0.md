# Life Star Core & Morphological Field Calibration Assertion Classification Register P0

Source: `scripts/check-life-star-core-morphological-field-calibration.mjs`

All file checks, marker arrays, Consumer exclusions, registrations, and runtime expectations are expanded into 103 logical assertion IDs.

| IDs | Count | Assertion group | Class | Corrective disposition |
|---:|---:|---|:---:|---|
| 001–010 | 10 | Required protocol/type/service/Renderer/fixture/package files exist | A | KEEP |
| 011–020 | 10 | Exact P102 protocol terminology and first-impression wording | C | RETIRE assertions |
| 021–025 | 5 | Life Star Core public projection structure | B | KEEP |
| 026–027 | 2 | No-flicker and no-pulse temporal facts | A | KEEP |
| 028–029 | 2 | Presence-only and Renderer-parameter contract | B | KEEP |
| 030–031 | 2 | Identity-blind and no-animal-geometry type facts | A | KEEP |
| 032–038 | 7 | Life Presence-to-Life-Star-Core projection service contract | B | KEEP |
| 039–042 | 4 | Core service excludes direct identity engines and scene-model input | A | KEEP |
| 043 | 1 | Broad `fourSymbol` substring exclusion in core service | C | RETIRE brittle lexical assertion |
| 044–051 | 8 | Core service excludes Mother Code/Life Archetype, Storage, and animal labels | A | KEEP |
| 052–054 | 3 | Morphological field public contract | B | KEEP |
| 055–056 | 2 | Shared Renderer consumes Life Star Core projection | B | KEEP |
| 057 | 1 | Exact core-surface geometry implementation marker | C | RETIRE assertion |
| 058–063 | 6 | Surface, influence, breath, contraction, posture, and node-distribution Consumer contract | B | KEEP |
| 064–066 | 3 | Exact spine/branch/LineSegments geometry implementation | C | RETIRE assertions |
| 067 | 1 | Exact absence of Three.js LineLoop implementation | C | RETIRE assertion |
| 068–071 | 4 | Renderer excludes direct identity engines and scene-model input | A | KEEP |
| 072 | 1 | Broad `fourSymbol` substring exclusion in shared Renderer | C | RETIRE failing assertion |
| 073–081 | 9 | Renderer excludes Mother Code, identity labels, Storage, and animal labels | A | KEEP |
| 082 | 1 | Scene projection carries typed Life Star Core | B | KEEP |
| 083–084 | 2 | Gate registration and Release participation | A | KEEP |
| 085–086 | 2 | Two fixture cases produce typed RenderPlans | B | KEEP |
| 087–088 | 2 | Core projections preserve exact Life Presence source references | B | KEEP |
| 089–092 | 4 | Core identity, animal-geometry, flicker, and pulse facts | A | KEEP |
| 093–097 | 5 | Core/surface/morphology/scene response differs with input | B | KEEP |
| 098–101 | 4 | Core influence values remain positive | B | KEEP |
| 102–103 | 2 | Projection does not mutate input RenderPlans | B | KEEP |

## Totals

| Class | Count |
|---|---:|
| A | 45 |
| B | 41 |
| C | 17 |
| D | 0 |
| Total | 103 |

The audit changes no Gate or product implementation.
