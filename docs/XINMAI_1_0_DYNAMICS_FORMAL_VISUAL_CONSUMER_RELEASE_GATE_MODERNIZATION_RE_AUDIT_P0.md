# XINMAI 1.0 — Dynamics Formal Visual Consumer Release Gate Modernization Re-audit P0

## Verdict

**A. CORRECTIVE APPLICATION READY — RELEASE GATE EVIDENCE ONLY**

This blade is audit-only. It does not modify a Release Gate, Runtime, Consumer, page, renderer, CSS, Authority, Store, schema, or persisted record.

The next corrective may modernize Release Gate evidence only. It must not restore retired props, copy, components, or visual blocks merely to satisfy an old assertion.

## Scope and method

- Inventory source: the 17 registered `check:dynamics-*` entries in the Release aggregate.
- Direct execution: all 17 gates were run against the exact audit parent.
- Assertion inventory: every source-level assertion call was classified. Assertions inside loops are counted once at source level even when they execute more than once.
- Classification authority:
  - **A — Canonical Fact / KEEP:** deterministic domain or Runtime fact, type boundary, compatibility rule, safety constraint, or fail-closed behavior.
  - **B — Consumer Contract / MODERNIZE:** formal Consumer ownership or consumption that must remain proven, but whose evidence must point to the current typed owner and contract.
  - **C — Legacy Presentation Detail / RETIRE:** obsolete prop, component, exact copy, exact title, visual composition, or removed presentation path.
  - **D — Unknown or Ambiguous / HOLD:** ownership cannot be proven. Nothing in this class may be deleted or restored before a focused decision.

The complete item-level record is in `docs/release-gates/DYNAMICS_FORMAL_VISUAL_CONSUMER_ASSERTION_CLASSIFICATION_REGISTER_P0.md`.

## Inventory result

| Measure | Result |
|---|---:|
| Registered Dynamics Release Gates | 17 |
| Source assertion calls | 610 |
| A — KEEP | 337 |
| B — MODERNIZE | 168 |
| C — RETIRE | 105 |
| D — HOLD | 0 |
| Direct gate PASS | 12 |
| Direct gate FAIL | 5 |

`D = 0` is an audit result, not an assumption. The only initially ambiguous assertion—visible rendering of `currentHexagramPresentation.title`—was resolved by source history: commit `3c60e7e20f8eb307f33eeee222f4d4eedbc9158e` intentionally removed the visible orientation block while retaining the typed adapter and structural markers. The title, starbeast-ingress, and exact “力量如何相遇” copy assertions therefore belong to C, not D.

## Direct execution matrix

| Gate | Result | Audit disposition |
|---|---|---|
| input-context | PASS | Preserve A; modernize B; retire C according to register. |
| mother-presentation | PASS | Preserve A; modernize B; retire C according to register. |
| input-readiness | PASS | Preserve A; modernize B; retire C according to register. |
| visual-state | PASS | Preserve A; modernize B; retire C according to register. |
| baihu-core-stars | PASS | Current Life Constellation / real-life visual source evidence remains the formal contract. |
| six-space-progress | FAIL | Retire the removed Gravity `pollenBursts` prop-consumption assertion; do not restore the prop. Preserve adapter facts classified A. |
| experience-state | FAIL | Retire the obsolete exact pressure-headline bytes; preserve the typed state transitions and readiness facts. |
| value-flow | PASS | Preserve A; modernize B to current typed owners. |
| experience-readiness-presentation | FAIL | Retire the obsolete exact safe-preview copy; preserve fail-closed readiness behavior and current actionable presentation contract. |
| current-hexagram-presentation | FAIL | Retire removed visible orientation/title/ingress copy assertions; preserve adapter formation mapping and current structural consumption. |
| revision-action | PASS | Preserve A; modernize B; retire C according to register. |
| migration-impact | PASS | Preserve compatibility and migration facts. |
| change-experience-runtime | PASS | Preserve Runtime state and deterministic mapping facts. |
| crystal-runtime | PASS | Wrapper/delegated gate; no source assertion call in this file. Underlying Runtime evidence remains registered. |
| current-crystal-presentation | FAIL | Retire stale exact “这一局/生命印记” copy bytes; preserve current journey-trace meaning, privacy boundary, and typed Crystal consumer. |
| personality-ring-deposit | PASS | Wrapper/delegated gate; no source assertion call in this file. Underlying deposit evidence remains registered. |
| personality-ring-presentation | PASS | Preserve A; modernize B; retire exact presentation details classified C. |

## Frozen corrective rules

The corrective is permitted only if all of the following remain true:

1. **A assertions are not weakened, deleted, inverted, or replaced by page-source string checks.** They must continue to prove the same canonical fact.
2. **B assertions must name the current formal owner and typed consumption boundary.** A B assertion may be rewritten, moved to a purpose-built gate, or replaced by a stronger behavioral proof; it may not be silently removed.
3. **C assertions are retired without restoring the retired product surface.** No obsolete prop, old copy, old component, or former visual block may be reintroduced to make a gate green.
4. **D remains HOLD.** This audit found zero D items. If the corrective discovers a new ambiguity, it must stop and classify it as D rather than guessing.
5. **Passing gates are in scope.** Their B and C assertions must also be reconciled so the Release suite no longer carries hidden legacy evidence that happens to pass today.
6. **The corrective is evidence-only.** Runtime, Authority, page behavior, CSS, renderer, DB, Store, schema, Catalog, and persisted records are frozen.
7. **Release success is necessary but not sufficient.** The corrective must also show that no forbidden legacy token was restored and that the complete registered Release aggregate reaches the next independent failure, or passes in full.

## Owner model after modernization

- Domain/Runtime facts are owned by their typed adapters, controllers, validators, and immutable contracts.
- Formal visual consumption is owned by the current Dynamics/Gravity consumers and presentation resolvers.
- Release Gates verify those owners; they do not become a second product specification.
- Exact copy and component topology are not canonical unless a separately approved product contract explicitly freezes them.

## Corrective boundary

### Allowed

- Update the 17 Dynamics gate scripts and their Release registration evidence.
- Add narrowly scoped gate helpers where they reduce brittle source-string coupling.
- Update audit/build documentation and gate fixtures that contain no production behavior.
- Remove C assertions and replace B assertions with current formal Consumer proofs.

### Prohibited

- Modify Runtime or Consumer code to satisfy a gate.
- Restore `pollenBursts` on Gravity.
- Restore removed current-hexagram title/ingress/copy blocks.
- Revert current semantic-constitution wording to obsolete exact strings.
- Change Authority, DB, Store, schema, writer, Catalog, lifecycle, or persisted data.
- Push or promote as part of the corrective without a separate Product Control Tower decision.

## Exit criteria for the next blade

- 610/610 source assertion dispositions remain traceable to this register.
- A: 337/337 canonical facts preserved or strengthened.
- B: 168/168 current formal Consumer contracts modernized and independently attributable.
- C: 105/105 legacy presentation details retired with no product restoration.
- D: 0, or corrective stops on the first newly discovered D.
- All 17 direct Dynamics gates pass.
- Full Release aggregate is run from a clean worktree.
- Runtime/Consumer/Page/CSS/Authority/DB/Store/Schema/Catalog diff is zero.
- `git diff --check` passes.

## Next exact knife

`XINMAI-1.0-DYNAMICS-FORMAL-VISUAL-CONSUMER-RELEASE-GATE-MODERNIZATION-CORRECTIVE-P0`

Traffic: **YELLOW / GATE EVIDENCE ONLY**

Expected parent: this audit commit

Push: **HOLD**
