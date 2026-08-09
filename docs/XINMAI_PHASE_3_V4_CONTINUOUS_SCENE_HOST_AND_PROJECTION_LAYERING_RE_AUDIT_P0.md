# XINMAI Phase 3 — V4 Continuous Scene Host and Projection Layering Re-audit P0

```text
Traffic light: RED
Knife: Re-audit / Host Base, C2 MID and V4 Projection Layering
Decision: RE-AUDIT ONLY
Runtime / Gate / Storage / Schema / Authority / Renderer / CSS / Copy: 0 changes
Push: HOLD
```

## 1. Frozen objects, scope and supersession

- Remote baseline: `da15cf80cac70f2abb8569f624d17691b0d56c53`.
- Evidence-only Runtime Candidate: `1d6d18bf938c8aa50be8da3435b79501c15e7f3c`.
- Evidence-only direct-child Counter: `71c7e4c6478859eb798910babff7d57b7089a44a`.
- Runtime evidence: `v4-policy-layering-corrective-push-gate-20260809/V4_POLICY_LAYERING_CORRECTIVE_RUNTIME_GATE_P0.md`.
- Neither evidence-only commit may be amended, rebased, pushed, or used as the parent of the next delivery Candidate.

The delivered `da15cf8…` re-audit correctly separated raw V4 lineage validation from the V4 feature policy and thereby preserved C1 Ownership in Returning. Its GREEN conclusion is nevertheless superseded by this document because its Counter contract still treated V4 projection withholding as whole Continuous Scene withholding. Archive evidence proved that this removes the shared C2 body commit proof, the canonical Imprint visual and the accessible canonical list.

This audit does not reopen or weaken:

- C1 Formation / Ownership: `CLOSED / PASS`;
- C2 Canonical Body Imprint / Single Presenter: `CLOSED / PASS`;
- V1 Continuous Scene Host: `CLOSED / PASS`;
- V2 Genesis and V3 Reality / Gravity / Choice deliveries.

It only freezes how the already-shared Host composes three independently trustworthy presentation layers.

## 2. Evidence and earliest causal breakpoint

### 2.1 What passed

The evidence-only Candidate proved on one legal canonical Origin:

- raw Returning / Archive lineage projection `PRESENTABLE`;
- C1 recovered Ownership from `IDB_TRANSACTION_COMPLETE`;
- exact Formation and Crystal references;
- C2 canonical decision `IMPRINT_AVAILABLE` and body reference `XINMAI_BODY:1qdewne`;
- one AppShell Continuous Scene Host;
- native Crystal and Continue controls;
- TypeScript, Production Build and `117 / 117` registered Gates.

The Counter correctly preserved Returning C1 Ownership, Crystal and Continue after changing only the V4 Scene projection policy to `SAFE_WITHHELD`.

### 2.2 What failed

On Archive, the same Counter retained the canonical decision and copy stating one formal trace, but produced:

- `CONTINUOUS_SCENE_SAFE_WITHHELD`;
- no C2 same-life body / Imprint visual;
- no C2 surface commit proof;
- zero items in `XinmaiSameLifeAccessibleSemanticMirror`;
- no canonical Archive trace button.

### 2.3 First breakpoint

The first causal break is the shared Scene plan resolver:

```text
V4 policy adapter
  → Returning / Archive projection SAFE_WITHHELD
  → resolveXinmaiContinuousScenePresentation
       maps any semantic SAFE_WITHHELD to whole-plan SAFE_WITHHELD
  → XinmaiContinuousSceneHost does not mount/commit Motion or Static presenter
  → C2 Same-Life commit proof is absent
  → C2 public outcome and accessible mirror cannot confirm canonical items
```

The defect is not in C1, C2, canonical recovery, Storage, IDB, Schema, Renderer, CSS, copy, Archive data, or the one-file policy switch. It is a typed composition error: one optional V4 layer is currently allowed to veto two already-closed lower layers.

Primary classification:

```text
HOST / PROJECTION LAYERING MIGRATION INCOMPLETE
```

## 3. Three-layer ownership contract

The single Host remains physically unique. “Layer” means a typed read-only composition responsibility, not another Host, Presenter, Canvas, RAF, Authority or state machine.

| Layer | Formal owner | Existing typed truth | What it may present | What may withhold it |
|---|---|---|---|---|
| Base / FAR | `XinmaiContinuousSceneHost` + Continuous Scene resolver / adapter | source reference, render-plan reference, route admission, motion preference and presenter commit proof | one trusted world surface and FAR composition | Scene policy pause, invalid route/source/render plan, renderer unavailable/failure, presenter commit mismatch |
| C2 MID | existing Same-Life Host resolver, C2 presenter and canonical projector | C2 selection, public outcome, Body / Imprint facts and C2 commit proof | exactly one same-life body and its canonical Imprints | C2 facts/proof/reference mismatch or C2 safe-withheld only |
| V4 Semantic / NEAR | raw V4 lineage resolver + one V4 Scene policy adapter | existing Returning / Archive projection `PRESENTABLE` or typed `SAFE_WITHHELD` | current V4 NEAR object and semantic projection only | V4 fact-integrity reason or V4 policy pause |

Ownership invariants:

1. AppShell owns exactly one Host, world Canvas/Context, RAF, resize, visibility and pointer-listener set.
2. C2 owns exactly one body Presenter inside that Host. V4 cannot create, replace, hide or attest it.
3. V4 owns no world or body; it only proposes the current Returning / Archive semantic projection and optional NEAR object.
4. C1 Ownership, Crystal and Continue remain native product consumers of raw validated lineage and their existing authorities.
5. Archive list and its accessible names remain consumers of the canonical C2 decision plus C2 public surface outcome.
6. No layer writes Identity, Choice, Growth, Formation, Crystal, Body Imprint, navigation or Storage.

## 4. Typed outcome layering

No new public Authority or second state machine is introduced. The existing typed contracts are assigned to their correct layer.

### 4.1 Base Scene public outcome

The existing `XinmaiContinuousSceneOutcome` keeps exactly:

```text
CONTINUOUS_SCENE_MOTION_PRESENTED
CONTINUOUS_SCENE_STATIC_PRESENTED
CONTINUOUS_SCENE_SAFE_WITHHELD
```

`MOTION_PRESENTED` and `STATIC_PRESENTED` prove a trusted Base presenter commit plus every required C2 MID proof. They do not claim that the optional V4 semantic layer is presented.

### 4.2 C2 MID public outcome

The existing C2 contract is unchanged:

```text
MOTION_SAME_LIFE_SURFACE_PRESENTED
STATIC_SAME_LIFE_SURFACE_PRESENTED
SAME_LIFE_SURFACE_SAFE_WITHHELD
```

C2 remains the only success authority for the body / Imprint surface. Scene success must still validate the matching C2 proof whenever a same-life body is required.

### 4.3 V4 layer outcome

The existing `XinmaiReturningSameLifeContinuityPresentationProjection` remains the V4 layer outcome:

```text
PRESENTABLE
SAFE_WITHHELD / typed reason
```

The Continuous Scene plan must preserve that outcome as an explicit internal composition decision instead of narrowing it to `PRESENTABLE | null`. A mechanically equivalent internal typed plan may use:

```text
NOT_REQUIRED
PRESENTED + validated projection
SAFE_WITHHELD + typed reason/reference
```

This plan field is derived in the pure resolver and is presentation-only. It cannot be persisted, recovered as product state, used for navigation, or treated as another public success union.

### 4.4 Returning / Archive split rule

For `RETURNING_OWNERSHIP` and `ARCHIVE` only:

- V4 `PRESENTABLE` + reference match → Base and C2 may present; NEAR follows the projection.
- V4 `SAFE_WITHHELD`, missing projection or projection mismatch → V4 layer is withheld, NEAR becomes `NONE`, interaction count becomes `0`; Base and C2 may still present if their own proofs match.
- Base or C2 mismatch → whole Scene remains `CONTINUOUS_SCENE_SAFE_WITHHELD`.

For `REALITY` and `GRAVITY_CHOICE`, the already-closed V3 semantic projection remains required. Its safe-withheld or mismatch continues to withhold the whole interactive Scene. This audit must not relax V3 admission.

## 5. Why Base presentation is not a false V4 success

When the V4 Counter is active, a valid Archive may legitimately report:

```text
Continuous Scene: MOTION_PRESENTED or STATIC_PRESENTED
C2 body: MOTION_PRESENTED or STATIC_PRESENTED
V4 projection layer: SAFE_WITHHELD / PRESENTATION_PAUSED
NEAR object count: 0
```

This is not a false success because each statement proves a different typed product fact. The Base outcome says the trusted world and required body have committed. It says nothing about V4 semantic projection. Consumers must not infer V4 success from the Base outcome.

Forbidden shortcuts remain:

- treating Canvas, DOM mount, CSS, RAF, frame count, timer, animation completion or absence of console error as any layer success;
- converting arbitrary semantic withholding into Base success;
- omitting the C2 proof when the MID body is required;
- retaining a V4 NEAR target while its projection is withheld;
- using the Base outcome to render C1 Ownership or approve navigation.

## 6. Production consumer matrix

| Consumer | Base outcome | C2 outcome / proof | V4 raw projection | V4 policy-applied projection | Must survive V4 Counter |
|---|---:|---:|---:|---:|---|
| `XinmaiContinuousSceneHost` | produces | validates when body required | no | consumes as layer plan | one Base Host and trusted Presenter |
| `xinmaiContinuousSceneRendererAdapter` | produces commit evidence | carries exact C2 proof | no | consumes only presented NEAR; safe means zero NEAR | Base + C2 commit path |
| `RealityLifeUniverseCanvas` | publishes request / observes | produces C2 outcome | no | publishes V4 layer to Host | C2 body / Imprint and semantic mirror |
| `LaunchLab` scene publisher | observes | passes canonical facts | retains raw for C1 handoff | yes | C1 checkpoint and native controls |
| `XinmaiLivedResponseReturnSurface` | no authority | reads canonical facts indirectly | yes, raw only | no | Ownership, Crystal and Continue |
| `PersonalityRingPage` scene publisher | observes | canonical decision + C2 outcome | computes raw | yes | Archive copy, list, buttons and a11y names |
| `XinmaiSameLifeAccessibleSemanticMirror` | no | yes, exclusive | no | no | canonical summary and item list |
| V3 Reality / Gravity semantic consumers | required | as existing | not V4 | existing V3 projection | unchanged; V3 safe still withholds whole Scene |
| Gates / evidence observers | observe only | observe only | observe only | observe only | never become Authority |

`UNKNOWN = 0` for the scoped production consumers.

## 7. Atomic Runtime migration boundary

The next Candidate must be recomposed from the exact remote document head created by this audit. `1d6d18b…` and `71c7e4c…` remain evidence only and must not enter the new ancestry.

The single Runtime commit may mechanically reapply the reviewed V4 Runtime patch and add only these host-layer corrections:

1. `src/types/xinmaiContinuousScenePresentation.ts`
   - retain the V4 typed layer decision in a presentable Scene plan;
   - distinguish layer safe-withheld from whole Scene safe-withheld without adding product Authority.
2. `src/services/xinmaiContinuousScenePresentationResolver.ts`
   - keep V3 whole-scene admission unchanged;
   - for Returning / Archive, resolve V4 safe/missing/mismatch to layer-only withholding and force NEAR `NONE`;
   - continue independently validating source, render plan, identity and C2 selection.
3. `src/components/XinmaiContinuousSceneHost.tsx`
   - expose only a read-only observation mirror of the V4 layer status if needed for legal runtime evidence;
   - do not change Host count, renderer ownership or public Base outcome.
4. Existing V4 Candidate files
   - preserve the raw lineage / Scene policy split, C1 consumer separation, Archive selection and consumer cutover already reviewed.
5. Existing V4 Gates
   - strengthen contract, consumer and forward-counter checks to cover the three-layer invariant.

Expected scope is the reviewed 15-file V4 patch plus at most the existing Host component for a read-only layer observation mirror. No CSS, copy, renderer implementation, asset, page state machine, database, schema, store, index, writer or Authority change is authorized.

If correct behavior requires another Host, another Presenter, a renderer fork, a second policy file, an Authority change or persistence, Runtime must stop with `RE-AUDIT REQUIRED`.

## 8. Single-policy Forward Counter

The new Counter must be the new Candidate's direct child and change exactly one file:

```text
src/services/xinmaiReturningSameLifeContinuityPresentationPolicy.ts

ENABLED → SAFE_WITHHELD
```

The Counter must yield:

- V4 Returning / Archive layer: `SAFE_WITHHELD / PRESENTATION_PAUSED`;
- V4 NEAR object / hit target: `NONE / 0`;
- V1 Base Host: remains trusted Motion or Static;
- C2 MID body / canonical Imprints: remains trusted with one Presenter;
- C1 Ownership, Crystal and Continue: preserved;
- Archive canonical list and accessible names: preserved;
- recovery: silent, with no replay;
- legacy Canvas, RAF, shared SVG, external orbit, closed ellipse, second body, `imprints[0]` shortcut and page-local success: remain absent.

Expanding the Counter to a second Runtime file means the encapsulation contract failed and Runtime must stop.

## 9. Gate requirements

Existing registered V1–V4 Gates must be strengthened without deletion, alias loss or weakened assertions. They must prove:

1. Returning / Archive V4 `SAFE_WITHHELD` is layer-only when Base and C2 independently validate.
2. Reality / Gravity V3 `SAFE_WITHHELD` still withholds the whole Scene.
3. A layer-withheld plan has NEAR kind `NONE`, reference `null`, count `0`, and no Host Canvas pointer target.
4. Base Scene commit still requires one Host, one world presenter and exact mode-specific Context / RAF counts.
5. A required same-life body still requires exact C2 body / Imprint proof and one body presenter.
6. C1 Ownership / Crystal / Continue and Archive list / accessible mirror do not import or compare the V4 policy.
7. The Counter remains a one-file policy patch and restores no legacy path.
8. No Storage, DOM, timer, animation or navigation becomes a resolver input or success authority.
9. Production Bundle contains no Acceptance, Fixture, harness or fault injection.

Static Gates remain necessary but insufficient; the Counter must pass runtime evidence on a legal canonical Origin.

## 10. Runtime acceptance matrix

### Candidate

- Returning current and recovered Ownership: Base, C2 and V4 all present; exact Receipt / Crystal / Imprint / Body / stable node; no replay.
- Archive single and multiple Imprints: Base, C2 and V4 all present; canonical list and visible body agree.
- Motion: world Canvas / Context / RAF `1 / 1 / 1`; body presenter `1`.
- native Reduced Motion: Context / RAF `0 / 0`; one Static world and one Static same-life body.
- WebGL failure: failed runtime and listeners released; Static Base and Static C2 take over; same typed references.
- refresh, Back/Forward and Direct URL: recover or safely withhold from current typed facts only.
- no identity, stale route, C2 facts/proof mismatch and corrupted canonical facts: whole Scene safe-withheld; no false C2 list.
- V3 Reality / Gravity regression: semantic safe-withheld still blocks the whole interactive Scene.
- no duplicate Host, body, orbit, ellipse, pointer target or accessible announcement.

### Counter

- Returning: Base + C2 + C1 remain visible and semantically available; V4 layer safe-withheld; NEAR `0`.
- Archive: Base + C2 body / Imprint, canonical list, native buttons and accessible names remain; V4 layer safe-withheld; NEAR `0`.
- Motion and Reduced Motion maintain the same facts and layer split.
- C1/C2 canonical assets remain readable; existing product controls remain reachable.
- TypeScript, Production Build and all registered Gates pass independently.

### Engineering integrity

- new Candidate parent equals the delivered audit document head;
- new Counter parent equals the new Candidate;
- rejected Candidate / Counter ancestry absent;
- Runtime diff contains no DB / Store / Index / Writer / Authority / Renderer / CSS / copy / asset change;
- Candidate and Counter clean; main user worktree untouched;
- Desktop-first runtime evidence complete before any Runtime push.

## 11. Rollback and delivery unit

- Runtime is one atomic three-layer composition Candidate.
- The direct-child one-policy Counter is the forward safe-withheld unit.
- Ordinary rollback must not restore the rejected whole-Host withholding, old V4 shortcuts or legacy presentation paths.
- Candidate remains Push HOLD until an independent Desktop-first Gate passes Candidate and Counter.
- After exact non-forced delivery, a remote clean-snapshot closure revalidation is still required.
- V5 remains locked until V4 Delivery is closed.

## 12. Stage freeze

```text
C1 Formation / Ownership: CLOSED / PASS
C2 Canonical Body Imprint / Single Presenter: CLOSED / PASS
V1 Continuous Scene Host: CLOSED / PASS
V2 Genesis: CLOSED / PASS
V3 Reality / Gravity / Choice: CLOSED / PASS
V4 Candidate 1d6d18b: EVIDENCE ONLY / REJECTED DELIVERY
V4 Counter 71c7e4c: EVIDENCE ONLY / NOT TRIGGERED
V4 Runtime Delivery: OPEN
V5: LOCKED
Phase 3: ACTIVE / NOT PASSED
C3 Haptic: PAUSED
Audio: SAFE_WITHHELD / SILENT
Prompt / AI Runtime: DEFER
Research Execution: BLOCKED
Monetization Runtime: DEFER
Phase 4: LOCKED
```

## 13. Final verdict

```text
NOW — CORRECTIVE ATOMIC MIGRATION APPLICATION READY
```

The product direction is unique: V4 may withhold only its own semantic / NEAR projection; it may not veto the already-trusted V1 Base Host, C2 same-life body / Imprint, C1 Ownership or native controls. The correction requires no product decision, Authority, Storage, Schema, Renderer, CSS, copy or asset change. It is ready for an exact document delivery followed by a current-head atomic Runtime recomposition and a one-policy direct-child Counter.

## 14. Audit validation record

```text
Document scope: one new Migration Re-audit document
Runtime / Gate / Storage / Schema / Authority / Renderer / CSS / Copy / Assets: 0
TypeScript / Production Build: N/A (doc-only)
git diff --check: required before commit
Push: HOLD until exact document delivery
```
