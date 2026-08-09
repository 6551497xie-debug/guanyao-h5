# XINMAI Phase 3 Returning / C1 / C2 Same-Life Continuity Integration Single-Owner Atomic Migration Audit P0

```text
Traffic light: RED
Blade: Migration Audit / Atomic Presentation Consumer Cutover
Decision: AUDIT ONLY
Runtime / Renderer / CSS / Gate / Authority / Storage / Schema / Copy / Assets: 0 changes
Push: HOLD until exact document delivery
```

## 0. Audit baseline and decision question

```text
Remote / Parent:
cf6d8dd2a80df92513ad05a4151e6643110b9a0f

MAP / PREP:
XINMAI_PHASE_3_RETURNING_C1_C2_SAME_LIFE_CONTINUITY_INTEGRATION_MAP_PREP_P0

C1: CLOSED / PASS
C2: CLOSED / PASS
V1: CLOSED / PASS
V2: CLOSED / PASS
V3: CLOSED / Delivery CLOSED
```

This audit answers one question:

> Can Returning, the six-state checkpoint, C1 Ownership, C2 Same-Life Body / Imprint, the Continuous Scene, and Archive be switched to one read-only lineage projection in one Runtime commit without adding or changing a product Authority?

The answer is **yes**, provided the exact contract and cutover below are applied atomically.

## 1. Current owner inventory

### 1.1 Product authorities that remain untouched

| Authority | Current owner | Persistent effect | V4 access |
| --- | --- | --- | --- |
| Identity / source | existing Identity and Genesis recovery authorities | current source / identity records | typed read only |
| Choice | Choice Action Intention controller / store | committed choice intention | typed read only |
| Departure / Return | Returning Provenance Controller and existing cross-store reconciliation | receipts, target lifecycle, active-key retirement | typed read only |
| Lived Response | Lived Response Authority Controller | Fact or explicit no-fact resolution | typed read only |
| Eligibility | Crystal Eligibility Authority | eligibility record | typed read only |
| Formation | Formation consumer / production orchestrator | Receipt + Crystal in existing transaction | typed read only |
| Body Imprint | Canonical projector + recovery adapter | stable body / imprint projection | typed read only |
| Navigation | route / page event handlers consuming successful typed results | route change | V4 cannot call it |

No new writer, DB version, Store, Index, record field, backfill, or migration is required.

### 1.2 Presentation owners that remain authoritative in their layer

| Layer | Current owner | Frozen outcome |
| --- | --- | --- |
| public checkpoint | `xinmaiLivedResponseCheckpointPresentationResolver` | six existing states |
| C1 ownership | `xinmaiCrystalOwnershipPresentationResolver` | pending / confirmed / presented / recovered / withheld |
| C2 same-life body | `xinmaiSameLifeSurfaceHostResolver` plus trusted presenter proof | Motion / Static / Safe-Withheld |
| Continuous Scene | `XinmaiContinuousSceneHost` at AppShell plus scene resolver / commit proof | Motion / Static / Safe-Withheld |
| accessible body mirror | `xinmaiSameLifeAccessibleSemanticMirror` | Imprint / no-Imprint / withheld, recovery silent |

V4 is a **projection adapter** between these layers. It is not another lifecycle or success owner.

## 2. Current consumer conflict

The code contains no second C2 body presenter and no second Continuous Scene Host. The open conflict is narrower:

1. `XinmaiLivedResponseReturnSurface` resolves checkpoint and ownership state locally.
2. `RealityLifeUniverseCanvas` independently chooses Returning NEAR state by checking whether `sameLifeSurfaceFacts.imprints.length > 0` and uses the first sorted Imprint reference.
3. `PersonalityRingPage` independently publishes the Archive C2 consumer.
4. The checkpoint live region and C2 accessible mirror independently own announcements.

The current shortcut:

```text
RETURNING_OWNERSHIP + any canonical Imprint
→ CRYSTAL_OWNERSHIP + imprints[0]
```

does not prove that the selected Imprint belongs to the current Formation Receipt or that the checkpoint state is `OWNERSHIP_PRESENTED`. With multiple Imprints, lexical ordering can select settled history rather than the current Crystal. It is safe today only because the UI retains C1 authority, but it is not a sufficient V4 continuity proof.

The first migration target is therefore the heuristic NEAR selection, not any Growth or C2 producer.

## 3. Unique V4 projection owner

### 3.1 Owner

The unique owner is a pure resolver:

```text
resolveXinmaiReturningSameLifeContinuityPresentation
```

Its only responsibility is to validate lineage across existing typed presentation facts and produce a read-only V4 projection.

It owns:

- projection reference generation from stable references;
- checkpoint-to-FAR/MID/NEAR mapping;
- selection of the current canonical Crystal / Imprint / node;
- recovery-silent versus announce-once policy;
- no-fact / mismatch Safe-Withheld presentation decision.

It does not own:

- Identity, Choice, Departure, Return, Fact, Eligibility, Formation, Crystal, Body Imprint, or navigation;
- C1 or C2 public outcomes;
- Scene Host / Canvas / RAF / renderer lifecycle;
- accessible focus movement;
- Storage reads or writes.

### 3.2 Exact type boundary

New type file:

```text
src/types/xinmaiReturningSameLifeContinuityPresentation.ts
```

Required consumer surface:

```text
RETURNING_OWNERSHIP
ARCHIVE
```

Required projection union:

```text
PRESENTABLE
SAFE_WITHHELD
```

`PRESENTABLE` carries:

- `checkpointState` using the existing six-state union;
- `sourceReferenceId` and `sourceRenderPlanReferenceId`;
- `starBeastIdentityReferenceId` and `bodyReferenceId`;
- current Choice / Departure / Return / Fact / Eligibility / Formation references when applicable;
- current Crystal / Imprint reference and stable node only for canonical ownership;
- ordered canonical Imprint references for Archive;
- `nearObjectKind: NONE | LIVED_RESPONSE | CRYSTAL_OWNERSHIP | ARCHIVE_IMPRINT`;
- `nearObjectReferenceId`;
- `presentationOrigin: CURRENT_TRANSACTION | CANONICAL_RECOVERY | SETTLED_ARCHIVE | NONE`;
- `announcementPolicy: ANNOUNCE_ONCE | RECOVERY_SILENT | NONE`;
- `authorityWriteback: FORBIDDEN`.

`SAFE_WITHHELD` reasons are restricted to:

```text
PRESENTATION_PAUSED
IDENTITY_NOT_READY
CHECKPOINT_NOT_TRUSTWORTHY
RETURN_LINEAGE_MISMATCH
FORMATION_LINEAGE_MISMATCH
OWNERSHIP_LINEAGE_MISMATCH
CANONICAL_BODY_UNAVAILABLE
SAME_LIFE_PROOF_UNAVAILABLE
SAME_LIFE_REFERENCE_MISMATCH
CURRENT_IMPRINT_NOT_FOUND
ARCHIVE_REFERENCE_MISMATCH
```

No output may assert that a user action occurred.

## 4. Exact lineage validation

### 4.1 Always required for a presentable same-life projection

- Identity status is current.
- source / render-plan / Identity / Body references are non-empty and mutually equal across C2 facts and current route input.
- the C2 public outcome is Motion or Static presented, never Safe-Withheld.
- C2 proof has `bodyPresenterCount = 1` and the expected WebGL context count for the selected mode.
- ordered Imprint references in the C2 public outcome exactly match canonical facts.

### 4.2 Returning checkpoints before ownership

- baseline may be presentable without a current Crystal;
- `RETURN_ACCEPTED_AWAITING_RESPONSE` requires the exact Return Receipt bound to the current Choice and Departure;
- `READY_TO_CONFIRM_REAL_RESPONSE` requires the current target cycle / Return Receipt and no current Fact;
- `FORMATION_IN_PROGRESS` requires the same Choice / Fact / Eligibility lineage and no Formation Receipt;
- none of these states may select `CRYSTAL_OWNERSHIP`.

### 4.3 Ownership

`CRYSTAL_OWNERSHIP` is presentable only when all of the following match:

```text
checkpoint.state = OWNERSHIP_PRESENTED
Formation Receipt.status = FORMED
C1 successAuthority = IDB_TRANSACTION_COMPLETE
C1 formationReferenceId = Receipt formationReferenceId
C1 crystalReferenceId = Receipt crystalReferenceId
C1 choiceActionIntentionReferenceId = Receipt choiceActionIntentionReferenceId
Canonical Body Imprint contains exactly one Imprint whose crystalReferenceId = Receipt crystalReferenceId
Imprint bodyReferenceId = current C2 bodyReferenceId
C2 committed facts contain the same Imprint reference and stable node
```

The current Crystal is selected by Receipt → Crystal → Imprint matching. `imprints[0]` is forbidden as a current-ownership selector.

### 4.4 Archive

Archive is not a current Ownership surface. It may present `ARCHIVE_IMPRINT` only from the complete ordered canonical Imprint set already validated by C2. It never claims `CURRENT_TRANSACTION`, never owns a Continue action, and never re-announces Formation.

## 5. No-fact and failure contract

For `NOT_ATTEMPTED` or `USER_REJECTED_RECORD`:

- Fact, Eligibility, Formation Receipt, Crystal, and new Body Imprint must all be absent;
- a `RESOLVED_WITHOUT_FACT` Return Receipt remains historical evidence only;
- the target termination owner remains the existing lifecycle owner;
- while target termination is pending, V4 is Safe-Withheld or non-interactive pending;
- after legal terminalization, V4 may return to truthful baseline;
- no Crystal NEAR object, no ownership announcement, and no automatic Reality navigation.

For any lineage mismatch:

- V4 is Safe-Withheld;
- existing C1 / C2 canonical assets remain readable through their own public surfaces;
- no record is deleted or rewritten;
- no page infers recovery from a ConstraintError, DOM state, or elapsed time.

## 6. Publisher and consumer order

### 6.1 Returning publisher

`XinmaiLivedResponseReturnSurface` already owns the local presentation inputs that change during Fact / Formation / Ownership. It therefore computes the pure V4 projection and publishes it upward through one typed callback:

```text
onSameLifeContinuityProjection(projection)
```

The callback is presentation-only. `LaunchLab` stores only the latest immutable projection for rendering and never treats it as Authority. The callback cannot trigger navigation, Storage, or mutation.

`LaunchLab` passes the current projection to `RealityLifeUniverseCanvas`. When there is no active Returning admission, it computes the baseline V4 projection from the same pure resolver rather than maintaining a second heuristic.

### 6.2 Scene consumer

`RealityLifeUniverseCanvas` accepts an optional V4 projection only for `RETURNING` and `ARCHIVE`. It publishes that projection as the Continuous Scene semantic input. It no longer derives the Returning NEAR object from `imprints.length` or `imprints[0]`.

The Continuous Scene resolver validates the V4 projection lineage just as it validates the V3 Reality / Gravity projection. It remains the sole scene-plan owner.

### 6.3 Ownership consumer

`XinmaiLivedResponseReturnSurface` may render `XinmaiCrystalFormationOwnershipMoment` only when both the checkpoint and V4 projection confirm the same current ownership references. The C1 component itself requires no new Authority and no copy change.

### 6.4 Archive consumer

`PersonalityRingPage` computes an Archive V4 projection from canonical Body Imprint and the C2 public outcome, then passes it to the shared scene publisher. It remains a read-only archive; legacy history is still isolated.

## 7. Accessible semantic ownership

- The checkpoint surface remains the only owner of the first-time Formation / Ownership live announcement.
- The same-life accessible mirror remains recovery-silent.
- The V4 projection exposes `announcementPolicy` for validation but does not render a second live region.
- `CANONICAL_RECOVERY` always yields `RECOVERY_SILENT`.
- Archive never announces current formation.
- native response, Crystal, Continue, retry, and navigation controls remain in DOM.
- the Scene Host remains non-intercepting for V4 because V4 adds no host-canvas hit target.

No additional accessible semantic mirror module is required. Adding one would create a duplicate presentation announcer and is explicitly rejected.

## 8. Continuous Scene type integration

The existing `semanticProjection` field accepts only the V3 Reality / Gravity projection. The migration extends it to a tagged presentation union:

```text
Reality / Gravity / Choice semantic projection
OR
Returning / Archive same-life continuity projection
```

The field remains read-only and presentation-only. The resolver requires:

- V3 projection for `REALITY` and `GRAVITY_CHOICE`;
- V4 projection for `RETURNING_OWNERSHIP` and `ARCHIVE`;
- no V3 or V4 projection for `ENTRY_BIRTH` / `GENESIS` unless a later audited blade says otherwise.

This is not a second state machine: each projection is a validated input to one existing Scene resolver and one public Scene outcome.

## 9. Exact atomic file boundary

### 9.1 New production files

```text
src/types/xinmaiReturningSameLifeContinuityPresentation.ts
src/services/xinmaiReturningSameLifeContinuityPresentationResolver.ts
src/services/xinmaiReturningSameLifeContinuityPresentationPolicy.ts
```

### 9.2 Modified production consumers

```text
src/types/xinmaiContinuousScenePresentation.ts
src/services/xinmaiContinuousScenePresentationResolver.ts
src/components/RealityLifeUniverseCanvas.tsx
src/components/XinmaiLivedResponseReturnSurface.tsx
src/pages/LaunchLab.tsx
src/pages/PersonalityRingPage.tsx
```

`XinmaiCrystalFormationOwnershipMoment.tsx` requires no change; the validated upstream render condition is sufficient and preserves C1 exactly.

No CSS or copy change is authorized.

### 9.3 New registered gates

```text
scripts/check-xinmai-returning-same-life-continuity-contract.mjs
scripts/check-xinmai-returning-same-life-continuity-consumer-cutover.mjs
scripts/check-xinmai-returning-same-life-continuity-lineage.mjs
scripts/check-xinmai-returning-same-life-continuity-recovery-accessibility.mjs
scripts/check-xinmai-returning-same-life-continuity-forward-counter.mjs
package.json
```

No existing gate may be deleted, omitted, renamed, or weakened.

### 9.4 Stop conditions during implementation

Stop and return to re-audit if implementation requires:

- changing any product controller or recovery adapter;
- changing C1 / C2 / V1 / V3 public outcome names or proof rules;
- adding a DB, Store, Index, writer, schema version, record field, or backfill;
- adding a second Host, Canvas, RAF, body presenter, or accessible live region;
- changing Ownership or checkpoint copy;
- adding a second policy file for the counter;
- modifying any file outside the exact production and gate list above, except formatter-generated package lock metadata if the repository actually requires it.

## 10. Atomic removal requirements

The same Runtime commit must remove:

- Returning current-object selection based on `imprints.length > 0`;
- Returning current-reference selection based on `imprints[0]`;
- Archive near-object selection without the V4 Archive projection;
- any V4 rendering path that accepts a checkpoint state without matching C1 / C2 lineage;
- duplicate recovery announcements;
- current Ownership rendering after a no-fact resolution.

Old and new selection paths may not coexist behind separate page booleans.

## 11. Forward SAFE_WITHHELD Counter

The direct-child counter changes exactly:

```text
src/services/xinmaiReturningSameLifeContinuityPresentationPolicy.ts

ENABLED → SAFE_WITHHELD
```

When paused:

- V4 Returning / Archive scene projection is Safe-Withheld;
- no V4 near object or scene success is committed;
- C1 Ownership, C2 Motion / Static body, canonical assets, existing six-state checkpoint UI, response controls, Crystal control, Continue control, and Archive list remain usable;
- V1–V3 remain closed and are not reverted;
- no heuristic `imprints[0]`, page-local success, duplicate announcement, old Canvas, old RAF, external orbit, closed ellipse, or double presenter is restored.

If one policy switch cannot preserve these properties, the Runtime encapsulation has failed.

## 12. Verification matrix

### 12.1 Engineering and gates

- Candidate parent equals the latest remote document head;
- one atomic Runtime commit;
- direct-child counter;
- TypeScript, Production Build, all registered XINMAI gates;
- baseline / candidate / counter gate count and alias registration;
- gate deletion / omission / weakening = 0;
- new DB / Store / Index / writer / Authority = 0;
- one Scene Host, one C2 body presenter, no route-local world;
- Production bundle Acceptance / Fixture / fault injection / test harness = 0;
- counter diff is one policy file.

### 12.2 Resolver cases

- neutral baseline with no current formation;
- committed Choice before Departure;
- Dormant Departure before explicit Return;
- accepted Return / response pending;
- response ready with no Fact;
- ATTEMPTED Fact and CHANGED_RESPONSE Fact;
- Formation pending with no Receipt / Crystal object;
- current Ownership with exact Receipt / Crystal / Imprint / node;
- recovered Ownership with the same references and no announcement;
- no-fact terminal and no-fact termination pending;
- identity, Choice, Departure, Return, Fact, Eligibility, Formation, Body, Imprint, node, C2 proof mismatch;
- no Imprint, one Imprint, multiple Imprints;
- current Crystal is selected by receipt match, not sort order;
- Archive receives the full settled canonical set.

### 12.3 Browser and visual evidence

- desktop hashed Production positive path through Ownership;
- refresh at Ready, Formation recovery, Ownership recovery, Archive;
- Back / Forward and Direct URL;
- Motion / native Reduced Motion semantic parity where legally available;
- 320×568, 360×800, 390×844, 430×932, keyboard, native 200%;
- Crystal and Continue native-button hit tests;
- no duplicate live announcements on recovery;
- no magenta block, second body, external orbit, closed ellipse, overlap, or current Crystal on the wrong node;
- physical Android and TalkBack remain Phase 3 Android Release Gate unless a candidate-specific defect is observed earlier.

### 12.4 Counter

- V4 projection Safe-Withheld;
- canonical Receipt / Crystal / Body / Imprint and C1 / C2 surfaces remain readable;
- response, retry, Crystal, Continue, and Archive controls remain native and reachable;
- heuristic selector and duplicate announcement do not return;
- TypeScript, Build, all gates pass.

## 13. Rollback and delivery discipline

- The Runtime candidate is one commit on the latest remote head.
- The counter is its direct child, local only.
- A normal revert of the Runtime commit must not restore the removed heuristic selector; delivery rollback uses the validated counter while canonical assets remain intact.
- Candidate Push remains HOLD until an independent desktop-first Push Gate passes.
- Runtime delivery is exact, non-forced, and followed by independent clean-snapshot closure revalidation.
- Physical-device Android composition, native Reduced Motion, and TalkBack remain explicit Phase 3 Release Gate items.

## 14. Stage freeze

```text
C1 Formation / Ownership: CLOSED / PASS
C2 Canonical Body Imprint / Single Presenter: CLOSED / PASS
V1 Continuous Scene Host: CLOSED / PASS
V2 Genesis Birth Spatial Interaction: CLOSED / PASS
V3 Reality / Gravity / Choice: CLOSED / Delivery CLOSED
V4 Returning / C1 / C2 Integration: OPEN
V5 Accessibility / Performance / Android Closure: LOCKED until V4 delivery closure
Global Continuous Life World: OPEN
Phase 3: ACTIVE / NOT PASSED
C3 Haptic: PAUSED
Audio: SAFE_WITHHELD / SILENT
Prompt / AI Runtime: DEFER
Research Execution: BLOCKED
Monetization Runtime: DEFER
Phase 4: LOCKED
```

## 15. Final audit verdict

```text
NOW — ATOMIC MIGRATION APPLICATION READY
```

Evidence for readiness:

- every required fact already has one typed production owner;
- the open defect is a deterministic read-only consumer selection gap;
- no schema, writer, Authority, copy, renderer, or CSS change is needed;
- the existing AppShell Scene Host and C2 presenter remain unique;
- the exact consumer list and removal list are finite;
- one V4 policy can safely withhold the new projection without deleting or hiding canonical assets;
- no unresolved product-semantic choice remains.

The authorized Runtime blade is:

```text
XINMAI-PHASE-3-RETURNING-C1-C2-SAME-LIFE-
CONTINUITY-INTEGRATION-SINGLE-OWNER-
ATOMIC-CONSUMER-CUTOVER-P0

Traffic light: RED
Decision: STRICT ATOMIC SCOPE
```

## 16. Validation record

```text
Document scope: one new Migration Audit document
Runtime / Renderer / CSS / Gate / Authority / Storage / Schema / Copy / Assets: 0
TypeScript / Production Build: N/A (doc-only)
git diff --check: required before commit
Push: HOLD pending exact document delivery
```
