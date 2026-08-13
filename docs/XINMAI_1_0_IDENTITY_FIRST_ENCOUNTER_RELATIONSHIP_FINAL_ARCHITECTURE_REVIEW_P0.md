# XINMAI 1.0 — Identity → First Encounter → Relationship Final Architecture Review P0

## Review target

- Runtime Candidate: `876beab707ceb734796d4cac383886f3c455b6f3`
- Candidate parent: `539f32a15d921c08b64ea76e0e395fbd8172d360`
- Review mode: architecture only
- Push: HOLD
- Naming application: DEFERRED
- Reality application: DEFERRED

## Verdict

**B. RED — CANDIDATE NOT READY FOR PROMOTE. RELATIONSHIP RUNTIME AUTHORITY MIGRATION REQUIRED.**

The Candidate corrected the product direction: Identity is no longer treated as Relationship, raw whisper text is not persisted, Naming remains optional, and a typed First Encounter result can be recovered. Those decisions are retained.

It is not yet a mainline-grade Relationship Runtime. The current implementation still lets Life Whisper qualify the relationship, combines `confirm companionship` with `enter Reality`, stores the new receipt through a non-transactional generic session container, and permits an over-broad Legacy handoff. Promoting it would freeze Consumer coupling and concurrency defects into the first formal relationship chain.

## What is accepted from the Candidate

1. **Identity and Relationship are different facts.** A recognized Star Beast identity cannot by itself authorize Relationship.
2. **The Star Beast is an independent pre-existing cosmic life.** Birth resolves encounter coordinates; it does not create the other life.
3. **Private expression is not relationship evidence.** Raw whisper/free text must never enter Relationship Authority.
4. **Naming is independent and optional.** A name is not proof of encounter, trust or companionship.
5. **Relationship recovery is typed and identity-bound.** Source, Star Beast identity and mansion coordinate must match.
6. **Forward SAFE_WITHHELD is the rollback form.** Existing records remain readable; new relationship mutation can be stopped without deleting identity or later assets.

## Blocking architecture findings

### R-01 — Canonical state owner is not yet formal

`xinmaiLifeCompanionFirstEncounterController` owns domain decisions, but persistence is delegated to `sessionService` and the generic `guanyao_h5_session` localStorage object. This container has no relationship-specific transaction, optimistic revision, unique identity constraint, command fence, mutation observer or corruption boundary.

**Impact:** the code can demonstrate recovery in one tab, but it cannot prove an immutable relationship fact under same-tab duplication, multi-tab races, late commands or interrupted writes.

### R-02 — First Encounter can be overwritten by a concurrent tab

The controller performs `read → construct → localStorage write → read`. Two tabs can both read `NOT_FOUND`, generate records with different creation times or different initiation/response tuples, and overwrite the same deterministic key. Both callers may report success even though only the last value survives.

**Impact:** the current receipt is not an immutable canonical receipt.

### R-03 — Relationship incorrectly consumes Life Whisper

The current receipt requires `WHISPER_SHARED | SILENCE_CHOSEN`, and Genesis derives its Star Beast response from the Life Whisper response pipeline.

**Impact:** Life Whisper becomes a hidden prerequisite for Relationship. This reverses the required dependency. The formal order must be:

`Identity → First Encounter → Relationship → optional Life Whisper → later Reality`

### R-04 — Relationship confirmation and Reality entry are one action

The current formal action is `确认同行，进入现实`. The handler commits the First Encounter receipt and then creates a Reality Intent.

**Impact:** the user cannot complete the first life relationship as a meaningful product state in its own right. Relationship becomes a transient prerequisite for Reality rather than XINMAI's first runnable life relationship chain.

### R-05 — Legacy handoff is over-broad

Reality currently resolves `LEGACY_HANDOFF` whenever any current Reality Intent exists, before rejecting a blocked/corrupted Relationship recovery. It does not first require:

- absence of a Relationship receipt rather than corruption;
- exact identity match between the Intent and current recognized Identity;
- an allowed pre-migration origin/qualification;
- explicit read-only Legacy provenance.

LaunchLab also permits a Naming asset to act as a Legacy relationship signal.

**Impact:** corrupted or identity-mismatched relationship evidence can be hidden by an unrelated Intent, and Naming can again become an implicit relationship authority.

### R-06 — Relationship lifecycle is not reconciled with source replacement

A new recognized life source can coexist in the generic session object with a receipt tied to a previous source. The reader correctly reports an identity mismatch, but there is no formal lifecycle decision for source replacement, explicit session reset, historical relationship retention or current-identity selection.

**Impact:** changing the active birth/source context can strand the user behind an unrecoverable current receipt conflict.

### R-07 — Reality Intent does not bind the Relationship receipt

The new Reality Intent says `relationshipAuthority: EXISTING_RELATIONSHIP_RUNTIME`, but stores no Relationship receipt reference, revision or digest.

**Impact:** even after Relationship becomes canonical, Reality cannot prove exactly which relationship state authorized the handoff. This must be addressed in a later Reality Consumer blade, not inside the Relationship Runtime activation.

## Frozen target architecture

### 1. Unique Authority

Create one dedicated canonical authority:

`XinmaiLifeCompanionRelationshipController`

It owns First Encounter observation, explicit companionship confirmation, idempotency and recovery. Genesis/Page/Renderer remain typed command and read-only presentation consumers.

### 2. Canonical persistence

Use a dedicated IndexedDB container:

- Database: `xinmai-life-companion-canonical`
- Physical version: `1`
- Store 1: `life-companion-relationship`
  - keyPath: `relationshipId`
  - unique index: `identityKey`
  - unique index: `firstEncounterReceiptReferenceId`
- Store 2: `life-companion-command-fence`
  - keyPath: `commandReferenceId`
  - unique index: `outcomeReferenceId`
  - non-unique index: `relationshipId`

No third Store is required. Naming remains in its existing optional asset boundary and is not copied into the relationship aggregate.

### 3. Canonical states

- `IDENTITY_RECOGNIZED` — external prerequisite read from existing Identity Authority; not written by Relationship.
- `FIRST_ENCOUNTER_OBSERVED` — a typed visual encounter outcome bound to the exact Identity; presentation timers and DOM presence cannot form it.
- `COMPANIONSHIP_CONFIRMED` — explicit user confirmation that forms the relationship.

One command may atomically record the qualifying First Encounter outcome and confirm companionship, but the UI label must be only `确认同行`. It must not navigate to Reality in the same action.

### 4. First Encounter evidence

The evidence is bounded and does not consume Life Whisper:

- exact recognized Identity references;
- exact visual response cycle/reference;
- typed response outcome: `MOTION_RESPONSE | STATIC_RESPONSE | RESPONSE_UNAVAILABLE_ACCEPTED`;
- explicit user command: `CONFIRM_COMPANIONSHIP`;
- protocol revision, aggregate revision and evidence digest.

Silence or a future Life Whisper may happen after the relationship is established. Neither is required to form it.

### 5. Consumer topology

```text
Identity Authority (read only)
        ↓ exact identity references
First Encounter visual outcome adapter
        ↓ typed evidence only
Relationship Controller + canonical transaction
        ↓ COMPANIONSHIP_CONFIRMED
Relationship Recovery Adapter
        ↓
Genesis Relationship completion surface
```

The following are explicitly excluded from the Relationship activation blade:

- Naming mutation or eligibility changes;
- Life Whisper mutation or response semantics;
- Reality Intent creation/admission/presentation;
- Pressure Seed, Gravity, Choice, Crystal and Archive;
- Birth/Identity derivation changes.

## Legacy compatibility matrix

| Existing state | Formal decision |
| --- | --- |
| Identity only, no relationship | `RELATIONSHIP_NOT_ESTABLISHED`; user may complete First Encounter now |
| Existing Naming asset | Preserve read-only; never infer Relationship |
| Existing pre-migration Reality Intent | Continue that exact Reality asset under explicit `LEGACY_REALITY_HANDOFF`; never create a Relationship record |
| Missing Relationship record | Not corruption; ordinary not-established state |
| Corrupt or identity-mismatched Relationship record | Fail closed; Legacy handoff forbidden |
| Candidate localStorage V1 receipt | Pre-production evidence only; do not auto-backfill into canonical Runtime |
| New recognized source with older relationship history | Preserve historical record; active relationship lookup is exact-identity only; no overwrite or deletion |

## Migration sequence required before Product Control Tower promotion

### Phase 1 — Relationship Authority Foundation

- dedicated DB v1 and exact two Stores;
- types, validators, digest/reference helpers;
- controller, reader, recovery adapter and transaction harness;
- multi-tab, duplicate, late command, abort, blocked, quota/unavailable and corruption gates;
- mutation policy fixed `SAFE_WITHHELD`;
- zero Genesis, Life Whisper, Naming or Reality consumer wiring;
- ordinary product use creates zero canonical relationship records.

### Phase 2 — Identity → First Encounter → Relationship Atomic Activation

- consume exact recognized Identity;
- consume typed visual First Encounter outcome independent of Life Whisper;
- explicit `确认同行` command;
- atomic aggregate + receipt + command fence commit;
- refresh/multi-tab recovery;
- Relationship completion surface that stops before Life Whisper, Naming and Reality;
- policy `ENABLED`;
- direct-child one-policy Forward Counter.

Only after Phase 2 independent acceptance may Product Control Tower decide whether the Relationship Runtime Candidate is ready to Promote Mainline.

## Rollback strategy

Rollback is forward-only and non-destructive.

The direct-child Counter changes exactly:

`LIFE_COMPANION_RELATIONSHIP_NEW_MUTATION: ENABLED → SAFE_WITHHELD`

Counter requirements:

- existing canonical relationship aggregates and receipts remain read-only recoverable;
- Identity and First Encounter visual presentation remain available;
- no fallback to Identity-as-Relationship, Naming-as-Relationship or page-local relationship state;
- no Store deletion, schema downgrade, record rewrite or Legacy backfill;
- UI exposes a typed non-retryable safe-withheld state and an honest exit;
- future Life Whisper/Reality consumers are not rolled back because they are not yet wired in this phase.

## Product Control Tower gate

Current Candidate `876beab…` must **not** be promoted or pushed as the Relationship mainline Candidate.

The next exact knife is:

`XINMAI-1.0-LIFE-COMPANION-RELATIONSHIP-CANONICAL-AUTHORITY-FOUNDATION-PHASE-1-P0`

Expected parent: this Final Architecture Review commit.

Traffic light: **RED / AUTHORITY FOUNDATION ONLY**.

Do not begin Naming, Life Whisper or Reality consumer work until Relationship Phase 2 is independently accepted.
