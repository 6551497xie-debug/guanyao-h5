# XINMAI 1.0 Phase 2 Mainline Promotion Review P0

## Review exit

`B. PROMOTION HOLD — RELEASE GATE OWNER RECONCILIATION REQUIRED`

The Phase 2 Runtime Candidate is independently acceptable at its frozen
Identity → First Encounter → Relationship boundary, but it must not enter the
formal mainline while the registered release chain still has a failing gate.

This review does not push, merge, tag, rewrite, or modify the Runtime Candidate
or its direct-child Counter.

## Frozen refs

- Formal remote continuity:
  `4a6471ebd68a9bd46938decb78d13f0058830bdc`
- Runtime Candidate:
  `0e7789d9899dfbba9037f9a24573f273d823d30f`
- Direct-child Forward Counter:
  `bbb092928f3a7c7f4ec1b157ad047122bdb3644c`
- Candidate merge-base with formal continuity:
  `4a6471ebd68a9bd46938decb78d13f0058830bdc`
- Formal continuity versus Candidate:
  `0 behind / 30 ahead`
- Candidate versus Counter:
  `0 behind / 1 ahead`

The Candidate is technically eligible for a non-force fast-forward. The
Candidate and Counter remote branches do not currently exist. The formal
remote continuity remains unchanged.

## Candidate decision

`AUTHORITY ACCEPTED / MAINLINE PROMOTION HELD`

Accepted Phase 2 boundary:

`recognized Identity → typed First Encounter outcome → explicit 确认同行 → canonical Relationship completion`

The Candidate correctly stops at Relationship completion. Life Whisper,
Naming and Reality remain deferred. The canonical Relationship aggregate and
command fence remain owned by the single Relationship Authority and commit in
one IndexedDB transaction. Refresh recovery is canonical and idempotent.

The Candidate itself does not require a Relationship Runtime redesign before
promotion.

## Blocking release gate

The registered release gate below currently fails on the exact Candidate:

`npm run check:mother-code-profile-persistence-semantics`

Failure:

`Launch delegates profile persistence missing=writeMotherCodeProfile(motherHandoff.motherCodeProfile)`

The current Runtime already writes the Mother Code profile through the typed
Birth Coordinate Admission Controller:

`src/services/xinmaiGenesisBirthCoordinateAdmissionController.ts`

That controller calls:

`writeMotherCodeProfile(motherHandoff.motherCodeProfile)`

The failing assertion still expects that implementation detail to exist
directly in `LaunchLab.tsx`. The evidence therefore indicates a stale release
gate owner expectation after the consumer was delegated to the Admission
Controller, not a demonstrated Relationship Authority defect.

Mainline promotion remains held until a narrow corrective reconciles the gate
with the actual typed owner and the complete registered release chain passes.
The corrective must not move persistence back into the page merely to satisfy
a string assertion.

## Counter decision

`DO NOT MERGE INTO MAINLINE`

The Counter is a valid direct-child forward SAFE_WITHHELD release asset. Its
only diff is:

`XINMAI_LIFE_COMPANION_RELATIONSHIP_NEW_MUTATION: ENABLED → SAFE_WITHHELD`

It should be published as a separate, independently addressable rollback
branch or release ref only after the Candidate is promoted. Merging it together
with the Candidate would immediately disable the newly accepted Relationship
mutation and would contradict Phase 2 activation.

If rollback is later authorized, the Counter may become the exact next
fast-forward commit from the Candidate. It must not be cherry-picked, merged
sideways, or included in the initial mainline promotion.

## Migration tag decision

`PERSISTED MIGRATION TAG: NOT REQUIRED`

The Phase 2 Candidate keeps `xinmai-life-companion-canonical` at physical
version `1`, keeps exactly the existing two Stores, performs no backfill, and
does not rewrite or reinterpret legacy records. There is no persisted schema or
data migration to mark.

`IMMUTABLE PROMOTION TAG: REQUIRED`

Because this promotion would fast-forward the formal continuity across 30
accumulated commits and activate a new canonical Relationship mutation path,
the exact Candidate should receive an immutable release/promotion tag after the
release gate passes and immediately before or together with formal promotion.
That tag is provenance and rollback coordination, not a migration tag.

Recommended tag:

`xinmai-1.0-life-companion-relationship-phase2-p0`

## Phase 2 closure decision

`NOT CLOSED`

Phase 2 is functionally complete and authority-accepted, but formal closure
requires all of the following:

1. reconcile the stale Mother Code persistence gate with the typed Admission
   Controller owner;
2. pass the complete registered release chain on the unchanged Candidate plus
   the narrow gate corrective;
3. re-read the formal remote and stop if it no longer equals `4a6471e...`;
4. non-force fast-forward the formal continuity to the approved promotion
   commit;
5. publish the direct-child Counter separately without merging it;
6. create and verify the immutable promotion tag;
7. verify the formal remote, Counter parentage, tag target, and clean worktree.

Only after those checks may Product Control Tower record:

`PHASE 2 CLOSED`

## Next exact knife

`XINMAI-1.0-MOTHER-CODE-PROFILE-PERSISTENCE-GATE-OWNER-RECONCILIATION-CORRECTIVE-P0`

Scope is limited to release-gate ownership/consumer evidence. Runtime
Relationship Authority, DB/Store/Schema, Candidate behavior, Counter policy,
Naming, Life Whisper and Reality remain frozen.

Push remains `HOLD`.
