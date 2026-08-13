# XINMAI 1.0 — Star Beast Genesis Experience Preview / Mother Code Consumer Release Gate Ownership Re-audit P0

## Verdict

**A. CORRECTIVE APPLICATION READY — TWO B-CLASS CROSS-GATE TARGET MODERNIZATIONS**

Audit only. No Gate, Preview, route, page, style, Mother Code source, Identity source, Runtime, Authority, DB, Store, schema, Catalog, or product behavior is modified in this blade.

## Earliest post-release failure

`check:star-beast-genesis-experience-preview` reports two missing strings:

1. `source bridge is only consumed by schema entry, isolated genesis previews, scene model fixtures, and formal identity convergence`
2. `mother code source is owned by entry, isolated genesis previews, scene model fixtures, and formal identity convergence`

The Gate is reading the current Mother Code source and foundation Gates, but expects their retired pre-visual-source ownership labels.

## Current ownership proof

The actual `resolveLifeArchetypeProfileFromMotherCode` Consumer set is:

- `src/pages/StarBeastGenesisPreview.tsx`
- `src/pages/StarBeastGenesisRendererSlicePreview.tsx`
- `src/services/motherCodeLifeArchetypeSource.ts`
- `src/services/originalSelfLifeSchemaEntry.ts`
- `src/services/productionIdentitySourceConvergence.ts`
- `src/services/realLifeVisualSourceAdapter.ts`

Both authoritative upstream Gates already assert this exact set and describe it as:

`schema entry, isolated genesis previews, real life visual adapter, and formal identity convergence`

Commit `aa6d2e6` (`feat: bridge real life results to visual sources`) replaced the old scene-model-fixture ownership with the formal `realLifeVisualSourceAdapter`. The Preview Gate was not recalibrated with that migration.

## Assertion classification

All 75 expanded logical assertions are individually classified in:

`docs/release-gates/STAR_BEAST_GENESIS_EXPERIENCE_PREVIEW_ASSERTION_CLASSIFICATION_REGISTER_P0.md`

| Class | Count | Disposition |
|---|---:|---|
| A — Canonical Fact | 15 | KEEP |
| B — Consumer Contract | 42 | KEEP 40 current targets; MODERNIZE 2 stale cross-Gate strings |
| C — Legacy Presentation Detail | 18 | RETIRE from Release ownership enforcement |
| D — Unknown / Ambiguous | 0 | None |
| Total | 75 | Fully classified |

## Why the two failures are B, not C

The Preview must continue proving that it consumes the same Mother Code ownership contract accepted by the source and foundation Gates. That cross-Gate agreement is a valid Consumer contract.

Only its target text is stale. The corrective must update the two expected strings to `real life visual adapter`; it must not remove the ownership checks or reintroduce scene-model fixtures.

## C-class disposition

The 18 C-class assertions are exact preview copy, exact stage labels/order, CSS selectors/media-query implementation, and the root `main` element detail. They are not Canonical Runtime facts or formal Consumer ownership.

They may be retired from this Release Gate in the corrective, but this does not delete or redesign the preview. Visual acceptance belongs to its own presentation/visual review boundary.

## Frozen corrective scope

The next corrective may modify only:

- `scripts/check-star-beast-genesis-experience-preview.mjs`
- corrective evidence documentation

It must:

1. Keep all 15 A-class assertions.
2. Keep all 40 current B-class assertions.
3. Modernize exactly two B-class cross-Gate target strings from `scene model fixtures` to `real life visual adapter`.
4. Retire all 18 C-class presentation implementation assertions.
5. Preserve Preview isolation, no Storage/network/navigation/runtime mutation, dev route isolation, P86/P87 ownership, manual-acceptance boundary, and Release registration.
6. Run the dedicated Gate and full Release lifecycle.
7. Stop at the next independent owner failure.

It must not:

- change Mother Code source or its Consumer set;
- restore a scene-model-fixture Consumer;
- edit Preview UI, CSS, route, protocol, Runtime, Authority, Store, schema, Catalog, or product behavior;
- push or promote.

## Corrective exit criteria

- 75/75 audited assertions remain traceable.
- A: 15/15 retained.
- B: 42/42 current owners proven; exactly two targets modernized.
- C: 18/18 retired from this Release Gate.
- D: 0.
- Dedicated Preview Gate passes.
- Full Release lifecycle advances or stops at a newly independent owner failure.
- Product source diff is zero.
- `git diff --check` passes.

## Next exact blade

`XINMAI-1.0-STAR-BEAST-GENESIS-EXPERIENCE-PREVIEW-MOTHER-CODE-CONSUMER-RELEASE-GATE-OWNER-MODERNIZATION-CORRECTIVE-P0`

Traffic: **YELLOW / GATE EVIDENCE ONLY**

Expected parent: this audit commit

Push: **HOLD**
