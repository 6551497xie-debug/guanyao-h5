# Life Presence Scene Projection Calibration Assertion Classification Register P0

Source: `scripts/check-life-presence-scene-projection-calibration.mjs`

All file checks, marker arrays, Consumer exclusions, registrations, and runtime expectations are expanded into 91 logical assertion IDs.

| IDs | Count | Assertion group | Class | Corrective disposition |
|---:|---:|---|:---:|---|
| 001–008 | 8 | Required protocol/type/service/Renderer/fixture/package files exist | A | KEEP |
| 009–017 | 9 | Exact P101 protocol terminology and A/B acceptance copy | C | RETIRE assertions |
| 018–024 | 7 | Projection public type and RenderPlan/Renderer parameter contract | B | KEEP |
| 025–027 | 3 | Identity-blind, no-life-fact, no-animal-geometry type facts | A | KEEP |
| 028–033 | 6 | RenderPlan-to-Life-Presence projection service contract | B | KEEP |
| 034–037 | 4 | Projection service excludes direct identity engines and scene-model input | A | KEEP |
| 038 | 1 | Broad `fourSymbol` substring exclusion in projection service | C | RETIRE brittle lexical assertion |
| 039–046 | 8 | Projection service excludes Mother Code/Life Archetype, Storage, and animal labels | A | KEEP |
| 047–048 | 2 | Shared Renderer consumes Life Presence projection | B | KEEP |
| 049–052 | 4 | Exact spine/branch/halo/structure implementation markers | C | RETIRE assertions |
| 053–054 | 2 | Aggregation and morphological-field Consumer contract | B | KEEP |
| 055–056 | 2 | Exact Three.js Line/LineSegments implementation | C | RETIRE assertions |
| 057 | 1 | Exact absence of Three.js LineLoop implementation | C | RETIRE assertion |
| 058–061 | 4 | Renderer excludes direct identity engines and scene-model input | A | KEEP |
| 062 | 1 | Broad `fourSymbol` substring exclusion in shared Renderer | C | RETIRE failing assertion |
| 063–071 | 9 | Renderer excludes Mother Code, identity labels, Storage, and animal labels | A | KEEP |
| 072 | 1 | Scene projection carries typed Life Presence | B | KEEP |
| 073 | 1 | Scene projection remains identity-blind | A | KEEP |
| 074 | 1 | Scene projection remains Renderer-parameter-only | B | KEEP |
| 075–076 | 2 | Gate registration and Release participation | A | KEEP |
| 077–078 | 2 | Two fixture cases produce typed RenderPlans | B | KEEP |
| 079–080 | 2 | Both Life Presence projections are identity-blind | A | KEEP |
| 081–085 | 5 | Deterministic and input-sensitive Life Presence projection | B | KEEP |
| 086–087 | 2 | Scene projections preserve their Life Presence references | B | KEEP |
| 088–089 | 2 | Projection does not mutate input RenderPlans | B | KEEP |
| 090 | 1 | Projection produces no animal geometry | A | KEEP |
| 091 | 1 | Projection remains RenderPlan-only | B | KEEP |

## Totals

| Class | Count |
|---|---:|
| A | 42 |
| B | 31 |
| C | 18 |
| D | 0 |
| Total | 91 |

The audit changes no Gate or product implementation.
