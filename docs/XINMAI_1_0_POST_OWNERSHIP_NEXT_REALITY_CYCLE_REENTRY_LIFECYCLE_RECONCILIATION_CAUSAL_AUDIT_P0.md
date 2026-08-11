# XINMAI 1.0 Post-Ownership Next Reality Cycle Re-entry Lifecycle Reconciliation Causal Audit P0

## 0. Audit decision

```text
Blade:
XINMAI-1.0-POST-OWNERSHIP-NEXT-REALITY-CYCLE-
REENTRY-LIFECYCLE-RECONCILIATION-CAUSAL-AUDIT-P0

Traffic light: RED / AUDIT ONLY
Baseline: d26dfbe97fb948d216388aaf50e6538f1968c027
Runtime / Store / Schema / Authority / UI diff: 0
Push: HOLD

Decision:
POST-OWNERSHIP NEXT-CYCLE LIFECYCLE RECONCILIATION
CORRECTIVE ATOMIC APPLICATION REQUIRED
```

The completed first cycle is valid and must remain immutable. Its Reality Intent being
`TERMINAL` is expected. Reality Admission correctly rejects that terminal Intent with
`INTENT_STATE_NOT_ADMISSIBLE`; Delivery then correctly fails closed as
`ADMISSION_NOT_READY`.

The first product defect is earlier:

> After canonical Formation, Ownership and Body Imprint are already present,
> `XinmaiLivedResponseReturnSurface.handoffConfirmedCrystal()` reuses the completed
> target cycle's `realityIntentReferenceId`. `LaunchLab` then navigates directly to
> `/reality` with that old reference without issuing a next-cycle Intent request.

The completed target Gravity continuity also remains the active continuity owner. A
legal next cycle therefore requires one proof-bound lifecycle transition before a new
request can win the unique active-identity slot:

```text
canonical Formation + Ownership continuation command
→ reconcile target Gravity admission to TERMINAL / START_NEW_REALITY_ENCOUNTER
→ outer Reality Adventure record TERMINAL / START_NEW_ENCOUNTER
→ activeIdentityKey released in the existing Reality IDB transaction
→ preserve the completed record and all Growth assets
→ explicit next-cycle request through RealityEncounterIntentController
→ new Intent / new encounterCycleId / READY_TO_ENTER_REALITY
→ /reality Admission
→ Candidate Delivery
```

This belongs to **explicit post-Ownership next-cycle lifecycle reconciliation plus
next-cycle request creation**, not Reality Admission and not Presentation masking.

---

## 1. Evidence boundary

This audit used only repository source, types, protocols and registered code paths.
It did not refresh or navigate a browser, read or write browser Storage, invoke a
Fixture or Acceptance path, mutate system state, or replay the user action.

Observed Control Tower facts accepted as external evidence:

```text
/reality
guard reason                 INTENT_STATE_NOT_ADMISSIBLE
production status            SOURCE_NOT_READY
presentation                 SOURCE_UNAVAILABLE
retryability                 NON_RETRYABLE
typed cause                  ADMISSION_NOT_READY
Intent authority             TERMINAL
post-commit transaction      FAILED
```

The audit does not reinterpret these DOM facts as Authority. They are matched to the
source-level typed path below.

## 2. Current causal chain and earliest typed break

### 2.1 First-cycle completion is not the break

`realityToGravityCutoverTransaction.ts` converts the active Reality Intent to:

```text
state = TERMINAL
terminalReason = ENCOUNTER_COMPLETED
```

in the same Reality continuity transaction that creates the Gravity transfer and
admission. The outer record continues as `GRAVITY_ADMITTED` and retains its
`activeIdentityKey`; that is the correct handoff from Reality to Gravity, not deletion
of the whole adventure.

The accepted journey then forms six canonical observations, Choice V3, Departure,
Return, a confirmed Lived Fact, Formation Receipt, Crystal, Ownership and Body
Imprint. None of those facts authorizes reuse of the already terminal Reality Intent.

### 2.2 Exact first break

`src/components/XinmaiLivedResponseReturnSurface.tsx` currently performs:

```text
handoffConfirmedCrystal()
→ onRealityHandoff({
     intentReferenceId:
       selected.returnReceipt.realityProof.realityIntentReferenceId,
     targetEncounterCycleId:
       selected.returnReceipt.targetEncounterCycleId,
     choiceActionIntentionReferenceId
   })
```

That `realityIntentReferenceId` is the target cycle that has already been consumed by
the Reality→Gravity cutover. It is historical provenance, not a new-entry capability.

`src/pages/LaunchLab.tsx` consumes the callback by navigating directly to `/reality`
with the same reference. It does **not** call `requestRealityEncounter()` in this
branch. This is the earliest typed handoff break:

```text
POST_OWNERSHIP_CONTINUE
expected: NEXT_CYCLE_RECONCILIATION_REQUIRED / then NEW_INTENT_READY
actual:   HISTORICAL_TERMINAL_INTENT_REUSED_AS_ROUTE_HANDOFF
```

### 2.3 Why the visible failure is later and correct

`RealityProductionRouteEntry` forwards the supplied route reference to
`establishRealityEncounterAdmission()`. The Admission Controller accepts only:

```text
READY_TO_ENTER_REALITY
ACTIVE_IN_REALITY
RECOVERING
```

and rejects `TERMINAL` as `INTENT_STATE_NOT_ADMISSIBLE`. Route/Host wraps the inner
cause as `ADMISSION_NOT_READY`, marks it non-retryable and renders the protective
state. Admission must remain strict; accepting a terminal Intent would create a
second interpretation of completed history.

### 2.4 A navigation-only correction is insufficient

`LaunchLab`'s legitimate returning-life request path does call
`requestRealityEncounter(origin=RETURNING_LIFE_WORLD, qualification=<explicit
whisper outcome>)`. However:

- `returningLivedResponseActive` remains true for any recovered admission with a
  non-null intention, including completed Growth states, so the normal new-reality
  request surface is withheld while the Ownership surface is active;
- the target Reality Adventure record has crossed into Gravity and owns the unique
  `activeIdentityKey` until its Gravity lifecycle is explicitly terminalized;
- `requestRealityEncounter()` correctly refuses an active Gravity adventure as
  `ACTIVE_ADVENTURE_REQUIRES_CONTINUATION` rather than overwriting it.

Therefore replacing `/reality` with a different URL or hiding the guard would not
make a legal next cycle.

---

## 3. Owner and consumer matrix

| Layer | Unique owner / consumer | Current typed result | Audit decision |
|---|---|---|---|
| Completed Lived Fact / Formation / Crystal | Existing Lived Growth Authority and Formation Authority | canonical and accepted | preserve read-only |
| Ownership continuation command | `XinmaiLivedResponseReturnSurface` | emits old `XinmaiLivedResponseRealityHandoff` | replace with typed reconciliation request; page is not Authority |
| Post-Ownership consumer wiring | `LaunchLab` | direct navigation using historical Intent | coordinate reconciliation, then request; no direct historical handoff |
| Target Gravity lifecycle writer | `XinmaiGravityEntryAdmissionController.terminateGravityEntry()` through `xinmai-reality-adventure-continuity` transaction | can terminalize with `START_NEW_REALITY_ENCOUNTER`, release key through the existing terminalizer | retain as sole Reality lifecycle mutation owner; expose unambiguous typed outcome/idempotency |
| Outer lifecycle terminalizer | `XinmaiRealityAdventureLifecycleReconciliationController.terminalizeXinmaiRealityAdventureLifecycleRecord()` | `TERMINAL`, removes `activeIdentityKey`, preserves record | reuse; do not create a second writer |
| Next-cycle Intent writer | `XinmaiRealityEncounterIntentController.requestRealityEncounter()` | creates fresh Intent only after active slot is free | retain as sole Intent writer |
| Reality Admission | `establishRealityEncounterAdmission()` | terminal old Intent → `INTENT_STATE_NOT_ADMISSIBLE` | correct; do not loosen |
| Route/Host envelope | `RealityProductionRouteEntry` | `ADMISSION_NOT_READY`, Authority-owned retryability | preserve inner cause; consume only new Intent |
| Candidate/Bundle/Delivery | existing 450 Catalog source and Delivery chain | never legally reached in failed re-entry | unchanged |
| Archive | `PersonalityRingPage` | read-only imprint display; Back is browser history only | no lifecycle Authority; must not mutate or infer completion |

All formal producers and consumers of this transition are enumerated above.
`UNKNOWN consumers = 0` within the audited production path. Legacy Archive code and
prototype routes do not own the canonical Body Imprint or lifecycle.

## 4. Frozen legal reconciliation contract

### 4.1 Preconditions

A post-Ownership next-cycle reconciliation command may be issued only when all of
the following agree:

- same three identity references;
- canonical Choice Action Intention reference;
- canonical Explicit Departure and Explicit Return lineage;
- target Encounter and its Reality Intent reference;
- target Gravity admission reference, Gravity cycle and observation reference;
- confirmed Lived Fact;
- one canonical Formation Receipt and Crystal for that Choice;
- canonical Body Imprint projection references that Formation/Crystal;
- explicit user continuation command after Ownership is present;
- target lifecycle is the exact active Gravity continuation or already the exact
  reconciled terminal result.

Ownership UI state, animation completion, route entry, DOM attributes and browser
history are not proof.

### 4.2 Single legal mutation

The only legal mutation is the existing Reality continuity transition:

```text
Gravity admission
  ACTIVE_IN_GRAVITY or GRAVITY_ADMITTED
  → TERMINAL / START_NEW_REALITY_ENCOUNTER

Outer Reality Adventure
  GRAVITY_ADMITTED or ACTIVE_IN_GRAVITY
  → TERMINAL / START_NEW_ENCOUNTER

activeIdentityKey
  exact identity key
  → absent
```

The terminal historical record remains in the same Store. Its old Intent, pressure,
recognition receipt, Gravity transfer/admission and revision/fencing lineage remain
readable. No Fact, Crystal, Body Imprint, Archive item or six-dimension evidence is
rewritten, invalidated or copied.

### 4.3 Saga boundary

Reality continuity and Lived Growth are different transaction authorities. The
application must not claim cross-DB atomicity:

```text
1. read and validate immutable Growth proof
2. Reality IDB reconciliation transaction complete
3. publish RECONCILED or ALREADY_RECONCILED
4. explicit next-cycle request transaction creates one new Intent
5. only a confirmed request result may navigate to /reality
```

If step 2 succeeds and step 4 fails, the completed first cycle remains safe and the
user may retry the **new request**, not the already completed lifecycle mutation.

### 4.4 New typed ephemeral result

The future corrective should freeze an ephemeral, non-persisted result such as:

```ts
type PostOwnershipNextCycleReconciliationResult =
  | {
      status: "RECONCILED" | "ALREADY_RECONCILED";
      targetEncounterCycleId: string;
      terminalReason: "START_NEW_ENCOUNTER";
      canonicalRevision: number;
      fencingToken: number;
      retryability: "NOT_NEEDED";
      reason: null;
    }
  | {
      status: "SAFE_WITHHELD";
      targetEncounterCycleId: string | null;
      retryability: "RETRYABLE" | "NON_RETRYABLE";
      reason:
        | "PROOF_UNAVAILABLE"
        | "PROOF_MISMATCH"
        | "FORMATION_NOT_CANONICAL"
        | "BODY_IMPRINT_NOT_CURRENT"
        | "TARGET_LIFECYCLE_NOT_RECONCILABLE"
        | "STALE_REVISION"
        | "TRANSACTION_UNAVAILABLE"
        | "TRANSACTION_ABORTED"
        | "RECOVERY_CORRUPTED";
    };
```

The exact names may follow repository conventions, but an ambiguous nullable return
from `terminateGravityEntry()` is insufficient for a user-facing handoff. Inner
causes and Authority-owned retryability must survive to Presentation.

## 5. Next-cycle request contract

After reconciliation succeeds, the application must use the existing Intent
Controller to create a **new** Intent and Encounter. It must not transform the old
Intent back to ready.

The recommended product sequence is:

```text
Ownership continuation
→ reconcile completed target adventure
→ return/present same life world with completed assets intact
→ explicit next-reality request
→ requestRealityEncounter(RETURNING_LIFE_WORLD, explicit qualification)
→ new reference + new encounterCycleId
→ /reality
```

If Product Control requires Ownership continuation itself to be the explicit
next-reality request, that requires a separately reviewed qualification for this
command. It must not falsely reuse a Whisper qualification or reactivate the dormant
`CHOICE_CONTINUATION` path. This audit recommends retaining the already legitimate
returning-life explicit request and separating lifecycle reconciliation from Intent
creation.

The following are forbidden:

- reusing `returnReceipt.realityProof.realityIntentReferenceId`;
- changing the old terminal state to ready;
- changing Admission to accept terminal records;
- deleting the old record to clear the unique index;
- defaulting to current/last Intent when route state is stale;
- creating a new Encounter before the reconciliation transaction confirms key
  release;
- page-local cycle counters or Storage flags.

## 6. Idempotency, refresh and concurrency

### 6.1 Duplicate command

The idempotency key must be derived from immutable canonical references, minimally:

```text
formationReferenceId
targetEncounterCycleId
gravityAdmissionReferenceId
START_NEW_REALITY_ENCOUNTER
```

The first valid command terminalizes once. A duplicate with identical proof returns
`ALREADY_RECONCILED` and does not increment again. A command with different proof is
`PROOF_MISMATCH`, never success.

### 6.2 Refresh / Back / Forward

- Refresh before reconciliation recovers the completed Ownership state and active
  target lifecycle; it does not create a new Intent.
- Refresh after reconciliation but before request recovers the terminal target and
  completed assets; the user can issue the new request once.
- Refresh after request recovers the one active new Intent through
  `activeIdentityKey` and returns `ALREADY_CURRENT` when the explicit request matches.
- Back/Forward may revisit Archive, LaunchLab or the old `/reality` history entry,
  but old route state cannot authorize Admission. The UI must direct to the truthful
  same-life/new-request state rather than retry the terminal Intent.

### 6.3 Late tab

A late tab holding the old target reference receives a non-retryable historical
terminal outcome. It cannot reopen the completed record. If a new active Intent
exists, it may only recover that Intent through the canonical active-identity read;
it must not substitute route-state identity for request proof.

### 6.4 Concurrent tabs

Two tabs reconciling the same proof produce one terminal mutation and one exact
`ALREADY_RECONCILED`. Two subsequent equal next-cycle requests produce one new
record and one exact canonical recovery/`ALREADY_CURRENT`; the unique
`activeIdentityKey` remains the final fence. Different commands or identities remain
blocked. ConstraintError alone is never success.

### 6.5 Failures

- blocked/open/quota/abort/connection/corruption: fail closed, preserve all first
  cycle assets, expose typed retryability;
- stale target revision: reread canonical state and accept only an exact already
  reconciled terminal record;
- reconciliation complete/request unavailable: retry only request creation;
- request complete/navigation interrupted: recover the same active new Intent;
- no branch may backfill, delete, or infer completion from Formation presentation.

## 7. Expected end-state versus defect

| State | Classification |
|---|---|
| Old Reality Intent `TERMINAL / ENCOUNTER_COMPLETED` | expected, immutable history |
| Admission rejects old terminal Intent | expected safety behavior |
| Old Fact/Crystal/Body Imprint/Archive remain recoverable | required |
| Ownership callback calls `/reality` with old Intent | formal handoff defect |
| Completed target Gravity continuity not reconciled for next-cycle start | lifecycle reconciliation defect |
| Normal next-reality request hidden while completed Growth admission remains active | consumer lifecycle classification defect |
| Guard copy/action reflects non-retryable old Intent | downstream truthful symptom, not root cause |

## 8. Future corrective migration scope

The next Runtime knife must be an atomic consumer/Authority-coordination correction.
Allowed exact categories:

1. a typed post-Ownership next-cycle reconciliation contract;
2. one coordinator that validates existing Growth/Formation/Body lineage read-only
   and delegates the Reality mutation to the existing Gravity/Reality continuity
   writer;
3. a typed/idempotent result from the existing Gravity termination path if required;
4. `XinmaiLivedResponseReturnSurface` handoff semantics;
5. `LaunchLab` completed-admission classification and next-cycle request wiring;
6. `RealityProductionRouteEntry` only for consuming the preserved typed cause or
   redirecting a known historical handoff; Admission rules remain unchanged;
7. direct Gates for proof, idempotency, stale/late/multitab and asset preservation;
8. a direct-child Forward SAFE_WITHHELD Counter that pauses only this new
   reconciliation/new-request coordination.

Expected persisted migration:

```text
DB version: 0 change
Store:      0 new / 0 changed
Index:      0 new / 0 changed
Schema:     0 persisted change
Backfill:   forbidden
```

The existing Reality Adventure continuity Store, active identity unique index,
terminalizer, Gravity admission and Intent Controller remain the only Authorities.

Forbidden scope:

- six-dimension Authority/evidence changes;
- Pressure Catalog 450, Birth, Identity or Relationship;
- Choice/Fact/Formation/Crystal/Body semantic changes;
- visual refinement, Audio, Haptic, AI or Phase 4;
- Archive becoming a Writer;
- manual Storage recovery or page-local lifecycle flags.

## 9. Required application evidence

The corrective must prove, on a clean hashed Production origin:

1. full first cycle still forms exactly one six-dimension receipt, Choice, Fact,
   Formation, Crystal and Body Imprint;
2. Ownership continuation does not navigate with the old Intent;
3. target Gravity/outer lifecycle reconciles once and releases the active identity
   key without deleting history;
4. first-cycle references and Archive count remain unchanged after refresh;
5. explicit next-cycle request creates a new Intent and encounter, both different
   from the old target;
6. `/reality` admits the new Intent and Delivery becomes READY;
7. repeated click, refresh, Back/Forward, late tab and two concurrent tabs create
   exactly one next active cycle;
8. stale direct `/reality` with the old Intent remains blocked and cannot mutate;
9. transaction failures preserve old assets and expose accurate retryability;
10. TypeScript, Production Build and all registered XINMAI Gates pass;
11. Production bundle contains no Fixture/Acceptance/manual injection/AI authoring
    metadata and runtime errors/warnings are zero;
12. 390×844 and 320×568 keep the real action reachable; Motion and native Reduced
    Motion expose identical Authority facts.

## 10. Separately recorded UX debt — not part of this correction

```text
SIX-DIMENSION INTERACTION RHYTHM — OPEN UX DEBT
```

All six dimensions repeat “第一次靠近 → 第二次靠近 → 第三次靠近 → 这像我 →
继续”, producing procedural fatigue. This is the first visual-semantic refinement
goal after repeated-cycle readiness closes.

That future refinement must preserve:

- six distinct canonical item commands and acknowledgements;
- explicit user causality for every item;
- one completion receipt only after six qualifying outcomes;
- refresh/idempotency/Choice V3 evidence semantics;
- no automatic completion, bulk acknowledgement or page-derived count.

It must not be mixed into the lifecycle correction.

## 11. Next knife recommendation

```text
XINMAI-1.0-POST-OWNERSHIP-NEXT-REALITY-CYCLE-
REENTRY-LIFECYCLE-RECONCILIATION-AND-FRESH-INTENT-
ATOMIC-CORRECTIVE-P0

Traffic light: RED / STRICT ATOMIC APPLICATION
Expected Parent: this docs-only Audit Candidate
Runtime Push: HOLD
```

The corrective Candidate must preserve `d26dfbe…` behavior, form a direct-child
SAFE_WITHHELD Counter, and stop after Control Tower E2E evidence. It must not start
the six-dimension rhythm refinement.
