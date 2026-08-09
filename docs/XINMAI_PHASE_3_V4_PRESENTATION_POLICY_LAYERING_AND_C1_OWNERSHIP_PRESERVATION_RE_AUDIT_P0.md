# XINMAI Phase 3 — V4 Presentation Policy Layering and C1 Ownership Preservation Re-audit P0

```text
Traffic light: YELLOW / RED RE-AUDIT
Knife: Policy Layering / Forward Counter Corrective Re-audit
Decision: DOC FIRST
Runtime / Gate / Storage / Schema / Authority: 0 changes in this audit
Push: HOLD
```

## 1. Frozen objects and observed failure

- Remote baseline: `05477dc523a9c17ea9a835ed9396fc06b0d6767b`.
- Rejected V4 Candidate evidence: `784ace0b550f948e6ca53df3fd50cb8a637b80fe`.
- Failed direct-child Counter evidence: `2f1dc3b2494f5af80675d42255ac4daf55262f63`.
- Candidate and Counter remain local evidence; neither may be amended, rebased, pushed, or used as the new Runtime parent.

The Candidate positive path passed. On the same legal canonical Origin it presented:

- C1 recovered Ownership from `IDB_TRANSACTION_COMPLETE`;
- the exact Formation Receipt and Crystal;
- one C2 body and canonical Imprint;
- one Continuous Scene Host;
- silent recovery and the native Continue control.

The Counter changed only `XinmaiReturningSameLifeContinuityPresentationPolicy` from `ENABLED` to `SAFE_WITHHELD`. The six-state checkpoint remained `OWNERSHIP_PRESENTED`, but the V4 projection became `SAFE_WITHHELD`; the render condition then removed `XinmaiCrystalFormationOwnershipMoment`, the Crystal control, and Continue. Static Gates passed, but runtime evidence failed the frozen Counter contract.

## 2. Earliest causal breakpoint

The first defect is not C1, C2, checkpoint recovery, canonical data, or Scene rendering. It is the policy placement inside the shared V4 lineage resolver:

```text
one V4 policy
  ↓
shared V4 resolver returns SAFE_WITHHELD before validating lineage
  ↓
same result is consumed by two different responsibility layers
  ├─ Scene projection admission (correct policy scope)
  └─ C1 Ownership render / Continue permission (incorrect policy scope)
```

The rejected Candidate made the V4 resolver both:

1. the deterministic read-only lineage validator; and
2. the feature policy gate for the new Scene projection.

`XinmaiLivedResponseReturnSurface` then used the policy-gated result to authorize an already-closed C1 component and its Continue handoff. Therefore the forward policy crossed from new V4 presentation into pre-existing C1 product interaction.

Primary classification:

```text
GREEN-ELIGIBLE POLICY / RESOLVER LAYERING DEFECT
```

There is no evidence of a new Authority, state-machine, persistence, schema, writer, navigation, C1, or C2 defect.

## 3. Frozen responsibility layers

### 3.1 Layer A — deterministic V4 lineage projection

Owner: `resolveXinmaiReturningSameLifeContinuityPresentation`.

Responsibilities:

- consume existing checkpoint, Returning Provenance, Fact, Eligibility, Formation Receipt, C1 Ownership decision and C2 canonical Body Imprint facts;
- verify exact Receipt → Crystal → Imprint → Body → stable-node lineage;
- produce `PRESENTABLE` or typed fact-integrity `SAFE_WITHHELD`;
- select the current canonical Imprint without `imprints[0]`;
- select the Archive canonical ordered set;
- mark recovered ownership `RECOVERY_SILENT`;
- remain pure and read-only.

This layer is required by the C1 Ownership consumer even when the new V4 Scene projection is paused. The V4 feature policy must not short-circuit this deterministic validation.

### 3.2 Layer B — V4 Scene projection policy adapter

Owner: one pure function in the existing V4 resolver module, mechanically equivalent to:

```text
applyXinmaiReturningSameLifeContinuitySceneProjectionPolicy(projection)
```

Responsibilities:

- read the one policy constant;
- when `ENABLED`, return the validated projection unchanged;
- when `SAFE_WITHHELD`, return a typed V4 Scene `SAFE_WITHHELD / PRESENTATION_PAUSED` result using only the already-validated public references;
- never alter C1, C2, checkpoint, canonical assets, native controls, navigation, Storage, or Authority.

The policy constant must be named and gated as Scene-projection policy, not as the permission to render C1 Ownership.

### 3.3 Layer C — existing product consumers

`XinmaiLivedResponseReturnSurface` consumes the raw validated Layer A projection for:

- exact C1 Ownership lineage agreement;
- Crystal control eligibility;
- Continue handoff agreement;
- recovery announcement policy.

`LaunchLab` and `PersonalityRingPage` publish the Layer B policy-applied projection to the Continuous Scene Host.

The Archive list, C1 Ownership component, C2 body, accessible canonical summary, response controls, and Continue remain owned by their existing authorities and native consumers. They do not consume the V4 Scene policy.

## 4. Required single-direction data flow

```text
Existing typed authorities
  ↓
Pure V4 lineage resolver (always validates)
  ├─ raw validated projection → C1 Ownership / Continue agreement
  └─ Scene policy adapter
       ├─ ENABLED → Continuous Scene Host projection
       └─ SAFE_WITHHELD → Scene projection withheld

C1/C2/native controls never depend on Scene policy
```

Forbidden flows:

- Scene policy → C1 Ownership render permission;
- Scene policy → checkpoint state;
- Scene policy → Continue navigation Authority;
- Scene outcome → Formation or canonical Imprint truth;
- Counter → legacy `imprints[0]`, page-local boolean, old Canvas, old RAF, shared SVG, external orbit, closed ellipse, or second body.

## 5. Corrective atomic recomposition boundary

The new Runtime Candidate must be rebuilt from the latest remote document head produced by this re-audit. The rejected `784ace0…` commit must not become its ancestor.

The recomposition may reuse the rejected Candidate's reviewed V4 Runtime patch, with only the following corrective deltas:

1. remove the policy early-return from the deterministic V4 lineage resolver;
2. introduce the pure Scene projection policy adapter in the same resolver module;
3. rename the policy constant to make its Scene-only scope explicit;
4. publish the policy-applied projection to `RealityLifeUniverseCanvas` from Returning and Archive;
5. keep `XinmaiLivedResponseReturnSurface` on the raw validated projection;
6. strengthen the existing forward-counter Gate so it proves the C1 Ownership component, Crystal control, Continue control and Archive list do not read the Scene policy.

No new Runtime file is required beyond the rejected Candidate's existing 15-file boundary. No CSS, copy, renderer, database, schema, store, index, writer, Authority, asset, or route-state change is allowed.

## 6. Direct-child Forward Counter contract

The Counter remains exactly one file and one policy value:

```text
src/services/xinmaiReturningSameLifeContinuityPresentationPolicy.ts

ENABLED → SAFE_WITHHELD
```

Required Counter runtime behavior:

- V4 Returning / Archive Scene projection: `SAFE_WITHHELD / PRESENTATION_PAUSED`;
- Continuous Scene V4 near object and Scene success: withheld;
- C1 Ownership: still rendered from exact validated C1/V4 lineage;
- Crystal native button: present and usable;
- Continue native button: present and usable;
- C2 Motion / Static body and canonical assets: readable;
- six-state checkpoint, response controls and Archive list: readable and usable;
- recovery remains silent;
- old heuristic and legacy success paths remain absent.

If this behavior cannot be obtained with the one policy file, Runtime encapsulation fails and requires a new Migration Audit. It must not be solved by expanding the Counter to business pages or restoring old paths.

## 7. Gate strengthening

The forward-counter Gate must fail if any of these consumers import or compare the Scene policy:

- `XinmaiLivedResponseReturnSurface` C1 render branch;
- `XinmaiCrystalFormationOwnershipMoment`;
- the Crystal native control;
- Continue handoff;
- Archive list and canonical accessible summary.

It must prove:

- policy import count is limited to the V4 Scene adapter path;
- raw lineage resolver has no policy early-return;
- Counter remains a one-file patch;
- `imprints[0]` remains absent from current Returning selection;
- V1–V3 and C1/C2 Gates remain registered and unchanged.

Static checks are necessary but not sufficient. The independent Push Gate must run the Counter on the same legal canonical Origin and visibly confirm Ownership, Crystal, Continue and Archive remain available while the new V4 Scene projection is withheld.

## 8. Runtime and browser verification matrix

### Candidate

- baseline, return accepted, ready, formation in progress, ownership and archive pure resolver paths;
- exact current Receipt / Crystal / Imprint / Body / stable node;
- current and recovered Ownership;
- no-fact path has no Ownership;
- mismatch and corrupted lineage are Safe-Withheld;
- Motion and Reduced Motion share the same raw semantic projection;
- one Scene Host and one C2 body presenter;
- refresh, Back/Forward and Direct URL preserve or withhold by existing Authority;
- no duplicate recovery announcement;
- TypeScript, Production Build and all registered Gates;
- Production Bundle contains no Acceptance, Fixture, harness or fault injection.

### Counter

- same legal canonical Origin as Candidate;
- V4 Scene projection is Safe-Withheld;
- raw C1 Ownership is still `RECOVERED_EXISTING`;
- exact Formation and Crystal references remain;
- Crystal and Continue controls remain real native buttons and are reachable;
- Archive list and canonical Body / Imprint remain;
- no legacy path is restored;
- one-file diff, TypeScript, Build and all Gates.

## 9. Rollback and delivery

- Runtime is one new atomic Candidate on the exact re-audit document parent.
- Counter is its direct child and local only.
- Candidate remains Push HOLD until an independent Push Gate passes both Candidate and Counter runtime behavior.
- After an exact non-forced Runtime delivery, remote clean-snapshot closure revalidation is still required.
- V5 remains locked until V4 Delivery is closed.

## 10. Stage freeze

```text
C1 Formation / Ownership: CLOSED / PASS
C2 Canonical Body Imprint / Single Presenter: CLOSED / PASS
V1 Continuous Scene Host: CLOSED / PASS
V2 Genesis Birth Spatial Interaction: CLOSED / PASS
V3 Reality / Gravity / Choice: CLOSED / PASS
V4 rejected Candidate 784ace0: EVIDENCE ONLY
V4 rejected Counter 2f1dc3b: EVIDENCE ONLY
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

## 11. Final verdict

```text
GREEN CORRECTIVE ATOMIC RECOMPOSITION READY
```

The failure is a narrow presentation-policy layering defect. The correction requires no new product decision, Authority, state, persistence, schema, Writer, CSS, renderer, copy, or asset. It is safe to deliver this document, then mechanically recompose the reviewed V4 Runtime with the frozen Layer A / Layer B split and a one-policy direct-child Counter.

## 12. Validation record

```text
Document scope: one new Re-audit document
Runtime / Gate / Storage / Schema / Authority / Renderer / CSS / Copy / Assets: 0
TypeScript / Production Build: N/A (doc-only)
git diff --check: required before commit
Push: HOLD until exact document delivery
```
