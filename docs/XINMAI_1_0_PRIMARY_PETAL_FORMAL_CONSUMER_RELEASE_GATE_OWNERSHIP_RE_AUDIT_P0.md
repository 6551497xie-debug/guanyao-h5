# XINMAI 1.0 — Primary Petal Formal Consumer Release Gate Ownership Re-audit P0

## Verdict

**A. CORRECTIVE APPLICATION READY — ONE B-CLASS CONSUMER TARGET MODERNIZATION**

Audit only. No Release Gate, Runtime, route, page, fixture, resolver, Authority, Store, schema, or product behavior is modified in this blade.

## Earliest failure

`check:primary-petal` fails at:

`gravity consumes centralized primary petal dev fixture`  
Expected in `GravityPage.tsx`: `resolvePrimaryPetalDevFixture(fixtureKey)`

The resolver and fixture are not missing. The assertion points to the retired owner.

## Ownership finding

Commit `80f2678d72c7e4e7c609b86b4205c4f3e5c60b81` established Gravity Entry Admission Authority and deliberately moved all development-fixture query handling out of production `GravityPage` into `GravityDevelopmentFixtureRouteEntry`.

The current boundaries are:

| Concern | Current owner | Status |
|---|---|---|
| Primary-petal canonical derivation | `guanyaoRuntimeEngine` + `guanyaoPrimaryPetalResolver` | Canonical Runtime fact |
| Neutral IDs and selected pressure context | `src/types/primaryPetal.ts` | Canonical type fact |
| Production Gravity input | `GravityProductionRouteEntry` and trusted production input path | No fixture query consumption |
| Development fixture selection | `GravityDevelopmentFixtureRouteEntry` | Development-only Consumer |
| Development route registration | `App.tsx`, guarded by `import.meta.env.DEV` | Isolated from Production |
| Fixture dictionary and resolver | `primaryPetalDevFixtures.ts` | Test/development support asset |

`GravityDevelopmentFixtureRouteEntry` explicitly freezes:

- `developmentOnly: true`
- `separateFromProductionRoute: true`
- `noProductionRecoveryRead: true`
- `noProductionAdmissionWrite: true`
- `noProductionActiveCommit: true`

There is no authority basis for moving fixture parsing back into `GravityPage`.

## Assertion classification

All 58 source assertion calls were inventoried in:

`docs/release-gates/PRIMARY_PETAL_FORMAL_CONSUMER_ASSERTION_CLASSIFICATION_REGISTER_P0.md`

| Class | Count | Disposition |
|---|---:|---|
| A — Canonical Fact | 16 | KEEP |
| B — Consumer Contract | 42 | KEEP 41 current contracts; MODERNIZE 1 stale Consumer target |
| C — Legacy Presentation Detail | 0 | No visual/presentation assertion belongs to this gate |
| D — Unknown / Ambiguous | 0 | No unresolved ownership |

The failing assertion is B, not C: the product must continue proving that the centralized development fixture has a Consumer, but the evidence must point to the isolated development route rather than production Gravity.

## Frozen corrective

The corrective may change only `scripts/check-primary-petal-resolver.mjs` and its evidence documentation.

It must:

1. Read `GravityDevelopmentFixtureRouteEntry.tsx` as the fixture Consumer source.
2. Prove that it calls `resolvePrimaryPetalDevFixture(fixtureKey)`.
3. Prove the frozen development-only boundary flags.
4. Prove `/dynamics-dev` is registered only under `import.meta.env.DEV`.
5. Prove production `GravityPage` does not import or invoke `resolvePrimaryPetalDevFixture`.
6. Preserve all resolver, fixture mapping, neutral type, Runtime derivation, asset-chain, and consumer-inventory assertions.

It must not:

- Restore fixture query parsing to `GravityPage`.
- Add a fixture fallback to the Production route.
- Change primary-petal derivation, priority, keywords, dimensions, IDs, or selected pressure context.
- Change Runtime, route behavior, page behavior, resolver, fixture data, Authority, DB, Store, schema, Catalog, or persisted data.
- Push or promote.

## Corrective exit criteria

- 58/58 assertion dispositions remain traceable.
- A: 16/16 retained.
- B: 42/42 current owners proven; exactly one target modernized.
- C: 0.
- D: 0.
- `check:primary-petal` passes.
- Full Release advances beyond `check:primary-petal` or stops at a newly independent owner failure.
- Product source diff is zero.
- `git diff --check` passes.
- Worktree clean after commit.

## Next exact knife

`XINMAI-1.0-PRIMARY-PETAL-FORMAL-CONSUMER-RELEASE-GATE-OWNER-MODERNIZATION-CORRECTIVE-P0`

Traffic: **YELLOW / GATE EVIDENCE ONLY**

Expected parent: this audit commit

Push: **HOLD**
