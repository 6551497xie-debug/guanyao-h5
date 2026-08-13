# XINMAI 1.0 — Primary Petal Formal Consumer Release Gate Owner Modernization Corrective P0 Evidence

## Exit

**PRIMARY PETAL RELEASE GATE OWNER MODERNIZED — PRODUCT RUNTIME UNCHANGED**

This corrective updates Release Gate evidence only. It does not change Runtime, route behavior, page behavior, fixture data, resolver behavior, Authority, DB, Store, schema, Catalog, or persisted records.

## Corrected ownership evidence

The stale B-class assertion expected `resolvePrimaryPetalDevFixture(fixtureKey)` inside production `GravityPage.tsx`. The current legal Consumer is `GravityDevelopmentFixtureRouteEntry.tsx`.

The modernized gate now proves:

1. The isolated development route invokes `resolvePrimaryPetalDevFixture(fixtureKey)`.
2. Its frozen boundary declares `developmentOnly` and `separateFromProductionRoute`.
3. It declares no Production recovery read, admission write, or active commit.
4. `/dynamics-dev` remains registered beneath the `import.meta.env.DEV` boundary.
5. Production `GravityPage` neither imports nor invokes the development fixture resolver.

This preserves the Fixture Consumer contract without returning development query parsing to the Production Gravity owner.

## Assertion disposition continuity

The 58 audited original assertions retain their dispositions:

| Class | Audited | Corrective disposition |
|---|---:|---|
| A — Canonical Fact | 16 | 16 retained |
| B — Consumer Contract | 42 | 41 unchanged; 1 owner target modernized |
| C — Legacy Presentation Detail | 0 | 0 |
| D — Unknown / Ambiguous | 0 | 0 |

The modernized B-class target is expanded into explicit boundary checks so a future move of fixture behavior into Production fails closed.

## Scope proof

Allowed implementation change:

- `scripts/check-primary-petal-resolver.mjs`

Documentation:

- this evidence file

Product source changes: **0**.

## Verification record

- `check:primary-petal`: **PASS**
- Original audited dispositions: **58/58 traceable**
- A retained: **16/16**
- B current owners proven: **42/42**; exactly one owner target modernized
- C: **0**
- D: **0**
- Product source diff: **0**
- `git diff --check`: **PASS**

The full Release chain advanced beyond `check:primary-petal`, then continued through the downstream asset candidate and component chain before stopping at a newly independent owner failure:

`check:gravity-change-experience-routing`

The failing assertion expects this retired Choice presentation marker:

`data-choice-protective-understanding="CANDIDATE_NOT_CONCLUSION"`

This corrective does not modify that Gate or restore that marker. Its ownership requires a separate classification audit.

## Next independent review boundary

`XINMAI-1.0-GRAVITY-CHANGE-EXPERIENCE-ROUTING-FORMAL-CONSUMER-RELEASE-GATE-OWNERSHIP-RE-AUDIT-P0`

Audit first. Every assertion must be classified as Canonical Fact, Consumer Contract, Legacy Presentation Detail, or Unknown/Ambiguous before any corrective application.
