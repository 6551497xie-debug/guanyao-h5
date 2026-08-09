# Adult Life Stage Pressure Catalog Migration Blade Plan P0

## Non-negotiable release topology

No content pack changes Runtime, Production Catalog, Adapter, Presentation, Gate, schema, store, or database version. No partial stage coverage is released.

| Order | Blade | Deliverable | Production exposure | Exit required for next blade |
|---:|---|---|---:|---|
| 0 | Protocol Prep | protocol, templates, scorecard, matrix, plan | 0 | `CONTENT PACK A — MID_LIFE AUTHORING READY` |
| 1 | Content Pack A | MID_LIFE 18 samples, then 90 reviewed records | 0 | Pack A `PRODUCT_CONTROL_LOCKED` |
| 2 | Content Pack B | YOUTH 18 samples, then 90 reviewed records | 0 | Pack B `PRODUCT_CONTROL_LOCKED` |
| 3 | Content Pack C | RESTRUCTURING 18 samples, then 90 reviewed records | 0 | Pack C `PRODUCT_CONTROL_LOCKED` |
| 4 | Content Pack D | SIXTY_PLUS 18 samples, then 90 reviewed records | 0 | Pack D `PRODUCT_CONTROL_LOCKED` |
| 5 | Final Runtime Cutover | one atomic catalog/adapter/presentation migration | all five stages together | full production acceptance |

Each pack uses independent docs/data draft commits. For each pack:

1. Author exactly 18 calibration samples: six fields × three mechanics, using three distinct contexts per field.
2. Product Control reviews semantics, stage authenticity, recognizability, safety, and cross-field separation.
3. Only `SAMPLE_ACCEPTED` authorizes expansion to the fixed 6×15 matrix.
4. Complete all metadata, scoring, exact duplicate, semantic overlap, stage stereotype, and responsibility-distribution checks.
5. Product Control samples every field, records a report, and either locks the complete 90 or returns it for revision.
6. Keep locked pack assets outside Production Catalog until step 5 of the table above.

AI-assisted draft records disclose assistance and follow the same human workflow. They receive no automatic promotion privilege.

## Final Runtime Cutover boundaries

The future cutover may proceed only after all four pack locks are independently proven. It must remain schema-preserving unless a new Control Tower decision explicitly supersedes this plan.

The atomic cutover must:

- add all four locked stage bundles and expand Production Catalog age-group coverage in one candidate;
- keep the existing `ESTABLISHING` 90 and its old revision read-only recoverable;
- define a new deterministic catalog revision, stable ordering, stable references, and duplicate rejection;
- preserve the frozen Life Stage router and its age boundaries; never silently/default-fallback a stage;
- propagate the innermost unavailable-bundle reason through Adapter and Presentation Resolver;
- make missing catalog non-retryable-now and remove ineffective immediate retry;
- fix `AWAITING_RELATIONSHIP` only in the returning-life Reality-entry Presentation Resolver when relationship is already `AVAILABLE`;
- leave Reality Intent, Admission, Identity, Growth, Crystal, schemas, stores, and database versions semantically unchanged;
- keep runtime AI dependency at zero.

## Compatibility and suspension behavior

- Existing Identity, Reality Intent, Growth, and Crystal records remain readable and unchanged while new candidate creation is withheld.
- Forward `SAFE_WITHHELD` suspends creation from an unavailable/new catalog revision; it does not delete or rewrite prior-life assets.
- A reference written under the old `ESTABLISHING` revision resolves through that revision, not by substituting text from the new global revision.
- A missing bundle yields an explicit unavailable outcome. It never creates a candidate from fixture text, generic copy, another Life Stage, or AI.

## Final cutover acceptance matrix

- every Life Stage midpoint and every age boundary ±1 year;
- all five stages × six fields with no `UNKNOWN` and no missing bundle;
- deterministic sort, stable reference, revision recovery, and duplicate prevention;
- existing `ESTABLISHING` reference recovery before and after cutover;
- reason propagation and user-action mapping for unavailable and transient outcomes;
- Direct Reality guard, Refresh, Back/Forward, and repeat-entry idempotence;
- TypeScript, Production Build, complete XINMAI Gates, hashed bundle, runtime errors 0;
- 320×568 and 390×844 primary-action reachability;
- current Motion and reduced-motion typed/static branch gates.

This document plans the migration only. It does not authorize Content Pack A or the final cutover.
