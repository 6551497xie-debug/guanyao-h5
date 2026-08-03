# XINMAI Reality / Gravity / Departure Lifecycle Reconciliation and Return Idempotent Conflict Runtime Causal Closure Revalidation P0

## Closure decision

```text
Runtime Authority：
CLOSED / PASS

Runtime Delivery：
CLOSED

Runtime SHA：
edc9be6d963731b12322789e5ee2e47561ae10a8

Closure Document Push：
HOLD
```

This revalidation was performed from a clean worktree created at the delivered remote HEAD. Runtime, Gate, Storage, Schema, CSS and product copy were not modified.

## Immutable delivery chain

- Remote branch: `codex/genesis-28-mansion-production-continuity`
- Remote HEAD: `edc9be6d963731b12322789e5ee2e47561ae10a8`
- Runtime parent: `65b16ff773e6a8dfb1cffb0ba73a8e37c802abe4`
- Forward Counter: `ea73bb7c6f8eccb7832d31428359bb98d88c6479`
- Counter parent: remote HEAD exactly
- Rejected `7b60c71806d9c0ffb63fa1fb7383ba2251b6433b` is not in the delivered ancestry.

## Engineering revalidation

| Check | Remote runtime | Forward Counter |
|---|---:|---:|
| Forced TypeScript | PASS | PASS |
| Production Build | PASS | PASS |
| Registered XINMAI Gates | 87 | 87 |
| Complete XINMAI execution | 87/87 PASS | 87/87 PASS |

- Production runtime main asset: `index-BEq4w8sk.js`; CSS: `index-BdDbSl1M.css`.
- Production Counter main asset: `index-DLBivjPW.js`; CSS: `index-BdDbSl1M.css`.
- Evidence Harness, Fixture, Acceptance and fault-injection identifiers in Production assets: 0.
- New physical database, Object Store, index, Writer or Authority: 0.
- `activeIdentityKey` release mutation owner: 1, `XinmaiRealityAdventureLifecycleReconciliationController`.
- `mother-code-profile` remains the exact pre-existing yellow: Gravity lacks `resolveDynamicsInputContext({`; new failure count is 0.

## Departure lifecycle authority

The delivered runtime preserves the following single causal order:

```text
Choice COMMITTED
→ source activeIdentityKey retained
→ Explicit Departure Growth transaction complete
→ typed Departure reconciliation proof
→ independent Reality reconciliation transaction
→ outer lifecycle TERMINAL / EXPLICIT_LEAVE
→ Gravity admission terminal
→ source activeIdentityKey released once
→ DORMANT_DEPARTURE
```

Refresh, browser close, Back/Forward and Choice COMMITTED do not release the key. The terminal historical record and all Growth assets remain preserved.

Three independent public-authority concurrency rounds produced `DEPARTED + ALREADY_DEPARTED`, with exactly one Departure Receipt in every round.

## Explicit Return and read-after-conflict

Three independent true-concurrency rounds produced:

```text
RETURNED + ALREADY_RETURNED
Target Cycle：1
Target Intent：1
Return Receipt：1
```

Both Reality read-write transactions began before the winner completed. The competitor then received the unique conflict, aborted and recovered the exact canonical winner through a fresh read-only transaction.

Constraint classification remains narrow:

- `ConstraintError` alone is never success.
- Recovery requires `CHOICE_RETURN` plus a canonical-record put conflict at the active identity key boundary.
- Identity, Choice, Departure Receipt, reconciliation proof, request reference, source Encounter, return attempt, purpose, lifecycle, Target Intent and source terminal proof must all match.
- Different request, Identity, Choice, Departure, Source Encounter and purpose all remained BLOCKED.
- Retained-record, transaction-unknown, primary-key and other Store conflicts have no success mapping.

When the first canonical winner read was unavailable, bounded read-after-conflict recovered the same Target without timers becoming Authority.

## Failure and recovery

Winner Reality transaction abort produced:

```text
first result：SAFE_WITHHELD / RECOVERY_CORRUPTED
Target：0
Return Receipt：0
existing Departure Receipt：1
```

A legal retry produced one Target and one Return Receipt. No cross-database atomicity was claimed; the already committed Growth Departure remained intact.

Three later stale/refresh-equivalent calls all returned `ALREADY_RETURNED` with the same Target and Return Receipt count 1.

Connection close, blocked open, quota/write failure and non-eligible constraints remain typed non-recoverable branches and cannot enter `ALREADY_RETURNED`. V1 remains `NO BACKFILL`.

## No-fact and Formation boundaries

Two public-authority no-fact resolutions were executed:

- `NOT_ATTEMPTED`
- `USER_REJECTED_RECORD`

Both produced:

```text
Fact：0
Eligibility：0
Formation：0
Target lifecycle：TERMINAL
Target activeIdentityKey：absent
/reality handoff：not eligible
```

The positive path produced exactly one confirmed Fact, one Eligibility and one Formation Receipt. Formation success Authority was `IDB_TRANSACTION_COMPLETE`. The presentation handoff remains guarded by a confirmed Formation Receipt and cannot run from Fact or Eligibility alone.

## Forward Counter

The Counter remains the direct child of remote HEAD and local-only.

Three Counter attempts returned `SAFE_WITHHELD / MUTATION_PAUSED` for both Departure and Return. Existing Target and Return Receipt remained readable.

After one formal Formation, Counter revalidation confirmed identical before/after counts:

```text
Choice：4
Departure Receipt：4
Return Receipt：4
Fact：1
Formation Receipt / Crystal：1
Canonical Body Imprint：IMPRINT_AVAILABLE
```

The Counter does not restore blind create, Receipt-only admission, direct key release or the rejected candidate path.

## Evidence and cleanup

External evidence:

`/Users/xieyanjun/.codex/visualizations/2026/07/22/019f87bd-b535-7723-9184-06a6fd71127e/reality-return-conflict-closure-edc9-20260804/closure-runtime-summary.json`

The evidence databases were deleted after revalidation, the browser surface was finalized and the temporary localhost service was stopped. The remote runtime snapshot, Counter snapshot and main worktree were not mutated by the evidence harness.

## Stage boundary and next knife

```text
Phase 3：ACTIVE / NOT PASSED
C2：WAITING FOR CURRENT-HEAD RECOMPOSITION
C3：DEFER
Phase 4：LOCKED
```

The next knife must be:

`XINMAI-C2-SAME-LIFE-SINGLE-PRESENTER-CURRENT-HEAD-RECOMPOSITION-P0`

C3 must not begin before C2 is recomposed from the new remote runtime authority and independently delivered.
