# XINMAI Lived Response / Crystal Formation Safe Withheld Rollback Runbook P0

## 1. Purpose

This runbook defines the only permitted production rollback for the Phase 3
Lived Response and Crystal Eligibility authority cutover.

Rollback means:

```text
new Crystal formation is temporarily withheld
+
confirmed Lived Response Facts remain readable
+
existing Crystal and Archive assets remain readable
+
unconsumed Eligibility remains recoverable
+
the legacy page-local boolean authority stays deleted
```

Rollback must never restore `livedResponseRecognized`, a page callback, a DOM
fact, a timer, or a Choice click as Crystal Eligibility authority.

## 2. Activation triggers

Prepare a forward counter-commit when any of these facts is confirmed:

- more than one authority can form a Crystal;
- one Eligibility produces more than one Formation Receipt or Crystal;
- Receipt and formed Crystal cannot be recovered as the same deterministic
  formation;
- identity, encounter, Gravity observation, Choice, or Lived Response
  provenance crosses users or cycles;
- multi-tab fencing cannot reject a second consumer;
- the interface presents permanent formation before Receipt confirmation;
- Archive projection failure causes a second formation;
- any production consumer still uses the legacy page-local authority.

## 3. Counter-commit boundary

The counter-commit is independent from this migration commit. It must:

1. switch the Crystal Formation consumer to a top-level `SAFE_WITHHELD`
   result before acquiring a formation reservation;
2. preserve the Lived Response, Eligibility, Receipt, and Personality Ring
   schemas and their readers;
3. preserve confirmed Receipts and already formed Crystal payloads;
4. leave pending Eligibility unconsumed and retryable;
5. leave pending formation reservations visible for diagnosis, without
   projecting them as formed;
6. keep all legacy local-authority prohibition gates active;
7. make no change to World, Identity, Relationship, Reality, Gravity, Choice,
   or Phase 4.

The counter-commit must not delete user data and must not use `git revert` when
that would restore the old authority path.

## 4. Recovery after withholding

When a corrected Formation consumer is ready:

```text
read formal Eligibility
↓
validate identity and provenance
↓
reuse the deterministic formation identity
↓
resume the same reservation or reject it as stale
↓
confirm one Receipt
↓
project the confirmed Receipt
```

No historical page state is backfilled into a Fact, Eligibility, or Receipt.
No new encounter cycle is created merely because formation is retried.

## 5. Verification

Before deploying the counter-commit:

- TypeScript passes;
- production build passes;
- legacy local authority remains absent;
- new formations return `SAFE_WITHHELD`;
- existing Receipts and Crystal remain readable;
- pending Eligibility is not consumed;
- no duplicate Formation ID appears after refresh or multi-tab retry;
- Archive projection is not used as formation authority;
- Phase 4 remains locked.

## 6. Ownership

Product Control Tower authorizes activation. The forward counter-commit is the
rollback unit. It does not reopen the deleted page authority and does not
change the product semantics frozen by the Migration Audit.
