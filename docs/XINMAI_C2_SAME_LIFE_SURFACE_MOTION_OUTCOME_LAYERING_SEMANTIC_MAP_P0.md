# XINMAI C2 Same-Life Surface Motion Outcome Layering Semantic MAP P0

## 0. Document control

```text
Task:
XINMAI-C2-SAME-LIFE-SURFACE-MOTION-OUTCOME-LAYERING-SEMANTIC-MAP-P0

Traffic Light:
YELLOW

Blade:
MAP / Typed Outcome Layering Review

Decision:
MAP ONLY

Remote Baseline:
a73d8e4bfbbf7dec36124d8a5b317e80c9180f98

Audited C2 Patch Evidence:
598499c0d8fe9607b85fffe62ceb14ede1d4c8b0

Audited C2 Patch Parent:
3c61247a1045fb530deef2da370b0f25de64c9cc

Runtime / Gate / Type / Renderer Diff:
0

Push:
HOLD
```

This MAP resolves one naming and layering ambiguity. It does not reopen the
single-presenter architecture, change any presentation success condition, or
authorize Runtime work.

## 1. Final ruling

```text
PUBLIC CONTRACT FROZEN — RECOMPOSITION READY
```

The formal public `XinmaiSameLifeSurfaceOutcome` contract is:

```text
MOTION_SAME_LIFE_SURFACE_PRESENTED
STATIC_SAME_LIFE_SURFACE_PRESENTED
SAME_LIFE_SURFACE_SAFE_WITHHELD
```

`WEBGL_MOTION_SURFACE_PRESENTED` is not a second public outcome and must not be
introduced as a new Runtime discriminant. In the current implementation,
WebGL is already represented at the internal presenter-evidence layer by the
existing typed commit proof:

```text
presenter = WEBGL_SAME_LIFE_BODY
webglContextCount = 1
bodyPresenterCount = 1
+ exact source / render plan / body / imprint references
```

The current card phrase `WEBGL_MOTION_SURFACE_PRESENTED` is therefore
calibrated as documentation shorthand for “the trusted WebGL motion presenter
produced a valid internal commit proof.” It is not a status that production
pages, Routes, accessibility consumers, or public Host consumers may read.

No new internal union is required. Adding one would duplicate the already
complete `Selection -> CommitProof -> Public Outcome` protocol and risk a
second presentation state machine.

## 2. Why the public contract is technology-neutral

The public fact is that the user received the same-life body and imprint in a
motion presentation. The public fact is not that a particular rendering
library or browser graphics API was used.

This separation preserves all current safety conditions:

```text
Current Motion presenter selected
+ trusted WebGL commit proof
+ exact typed fact match
+ exactly one body presenter
+ exactly one WebGL context
↓
MOTION_SAME_LIFE_SURFACE_PRESENTED
```

Technology neutrality does not loosen the current success criteria. On the
audited C2 implementation, only `WEBGL_SAME_LIFE_BODY` can satisfy the Motion
selection. A future WebGPU or other Motion presenter would require a separate
internal presenter migration and its own proof/gates before it could map to
the unchanged public Motion outcome.

## 3. Existing production layering

### 3.1 Layer 1 — Canonical presentation facts

Producer:

- `resolveXinmaiSameLifeSurfaceFacts()` in
  `src/services/xinmaiSameLifeSurfaceHostResolver.ts`.

Inputs:

- stable source reference;
- renderer-neutral StarBeast render plan;
- Canonical Body Imprint decision.

Output:

- `XinmaiSameLifeSurfaceFacts`, including source, render-plan, identity, body,
  imprint, Crystal, stable-node and deterministic-geometry references.

This layer contains product facts but no surface-success claim.

### 3.2 Layer 2 — Host selection

Existing `XinmaiSameLifeSurfaceSelection` is an internal Host decision:

| Selection | Presenter | Context policy | Meaning |
|---|---|---|---|
| `MOTION_SELECTED` | `WEBGL_SAME_LIFE_BODY` | `REQUIRED` | Current trusted Motion presenter must be used. |
| `STATIC_SELECTED` | `SEMANTIC_STATIC_SAME_LIFE_BODY` | `FORBIDDEN` | Native Reduced Motion or WebGL unavailability must use the same static body. |
| `SAFE_WITHHELD` | none | `FORBIDDEN` | No surface may claim success. |

Reduced Motion is an input to Host selection, not a success outcome.

### 3.3 Layer 3 — Internal presenter evidence

The existing `XinmaiSameLifeSurfaceCommitProof` is the only required internal
presenter evidence type. It contains:

- presenter identity;
- source reference;
- render-plan reference;
- body reference;
- ordered imprint references;
- `bodyPresenterCount: 1`;
- `webglContextCount: 0 | 1`.

Motion producer:

- `genesisWebGLRendererCore.ts` consumes typed same-life facts;
- after the renderer submits the scene, it exposes a commit proof with
  `presenter: WEBGL_SAME_LIFE_BODY` and `webglContextCount: 1`;
- the proof does not claim the public outcome.

Static producer:

- `XinmaiSemanticStaticSameLifeSurface.tsx` deterministically projects the
  same typed facts;
- it emits a commit proof with
  `presenter: SEMANTIC_STATIC_SAME_LIFE_BODY` and
  `webglContextCount: 0`;
- it does not claim the public outcome.

Internal proof health is not determined by:

- `frameCount > 0`;
- DOM connection or `data-*`;
- RAF completion;
- CSS class or animation completion;
- elapsed timer;
- Console text.

RAF transports Renderer snapshots to the Host, but is not a success
criterion. `frameCount` exists in the generic Renderer snapshot and is not
read by `commitXinmaiSameLifeSurfaceOutcome()`.

### 3.4 Layer 4 — Public Host outcome

`commitXinmaiSameLifeSurfaceOutcome()` is the only mapping boundary. It checks
the selected presenter against the internal proof and requires:

- exact presenter match;
- exact source reference;
- exact render-plan reference;
- exact body reference;
- exact ordered imprint references;
- exactly one body presenter;
- the expected WebGL context count.

Any mismatch yields:

```text
SAME_LIFE_SURFACE_SAFE_WITHHELD
reason = PRESENTER_COMMIT_MISMATCH
```

Only a complete matching proof maps to the public Motion or Static outcome.

## 4. Producer matrix

| Component | Produces | Layer | May produce public success? |
|---|---|---|---|
| Canonical Body Imprint recovery/projector | Canonical decision | Canonical authority input | No presentation success. |
| `resolveXinmaiSameLifeSurfaceFacts` | Typed same-life facts | Facts | No. |
| `resolveXinmaiSameLifeSurfaceSelection` | Motion/Static/Safe selection | Internal Host selection | No. |
| `genesisWebGLRendererCore` | WebGL commit proof | Internal presenter evidence | No. |
| `XinmaiSemanticStaticSameLifeSurface` | Static commit proof | Internal presenter evidence | No. |
| `commitXinmaiSameLifeSurfaceOutcome` | Motion/Static/Safe public outcome | Public Host outcome | Yes, uniquely. |
| Accessible Semantic Mirror | Accessible read model | Public presentation consumer | No; writeback forbidden. |

Producer UNKNOWN count: `0`.

## 5. Consumer matrix

| Consumer | Internal evidence | Public Host outcome | Ruling |
|---|---:|---:|---|
| `genesisWebGLRendererCore` | Produces WebGL proof | No | Renderer must not import public outcome semantics. |
| `XinmaiSemanticStaticSameLifeSurface` | Produces Static proof | No | Static presenter must not claim public success. |
| `RealityLifeUniverseCanvas` | Yes | Yes | It is the unique surface Host/orchestrator: selects one presenter, receives proof, commits public outcome. |
| Reality `Route` | No | No direct read | Recovers canonical facts and admission; it must not depend on WebGL naming. |
| `RealityProductionHost` | No direct proof read | Indirect projected life-surface outcome | Same-life public outcome is translated by the Canvas Host; Reality admission does not read the WebGL implementation name. |
| Gravity `Route` | No | No direct read | Recovers canonical facts and lifecycle state only. |
| `GravityProductionSurfaceHost` / `GravityPage` | No direct proof read | Indirect projected gravity-surface outcome | Hosts the Canvas with consumer `GRAVITY`; it must not own presenter mapping. |
| Returning / `LaunchLab` | No direct proof read | Canvas-local public outcome | Supplies typed facts; the Canvas and semantic mirror own surface confirmation. |
| Archive / `PersonalityRingPage` | No | Yes | Receives public outcome for its accessible historical association. |
| Accessible Semantic Mirror | No | Yes | Requires public outcome plus canonical decision; never reads WebGL, SVG, DOM or Renderer state. |
| Reality/Gravity admission resolvers | No | Their own typed projected surface outcome | Must not consume `WEBGL_MOTION_SURFACE_PRESENTED`. |
| C2 single-presenter gate | Yes | Yes | Correctly checks both layers: presenter proof and public outcomes. |

Consumer UNKNOWN count: `0`.

## 6. Public outcome mapping

The mapping is frozen as follows:

| Internal selection | Required internal proof | Public outcome |
|---|---|---|
| `MOTION_SELECTED` | `WEBGL_SAME_LIFE_BODY`, context `1`, presenter `1`, exact facts | `MOTION_SAME_LIFE_SURFACE_PRESENTED` |
| `STATIC_SELECTED` | `SEMANTIC_STATIC_SAME_LIFE_BODY`, context `0`, presenter `1`, exact facts | `STATIC_SAME_LIFE_SURFACE_PRESENTED` |
| `SAFE_WITHHELD` | no proof | `SAME_LIFE_SURFACE_SAFE_WITHHELD` |
| Any proof mismatch | rejected proof | `SAME_LIFE_SURFACE_SAFE_WITHHELD` |

The phrase `WEBGL_MOTION_SURFACE_PRESENTED` may appear only in architecture
prose as a description of the first row’s internal evidence. It must not be:

- added to `XinmaiSameLifeSurfaceOutcome`;
- emitted by a Route or Page;
- consumed by the Accessible Semantic Mirror;
- persisted;
- used as a fourth Host state;
- used to bypass commit-proof validation.

## 7. Motion, Reduced Motion and failure boundaries

### Motion

Current Motion remains WebGL-only. A public Motion outcome requires a valid
WebGL presenter proof. Public technology neutrality does not admit DOM,
generic animation or an arbitrary Canvas as success.

### Native Reduced Motion

Native Reduced Motion selects the Static presenter before Renderer creation.
Its only successful public outcome is:

```text
STATIC_SAME_LIFE_SURFACE_PRESENTED
```

It cannot emit Motion and cannot create a WebGL context before hiding it.

### WebGL failure

WebGL unavailability or trusted failure exits the failed presenter and selects
the same Static presenter. It can only emit Static after a matching Static
commit proof. Without such proof, the result remains Safe-Withheld.

## 8. Assessment of the old audited C2 patch

The old `598499c…` patch already implements the correct layering:

1. Its Renderer and Static component produce internal
   `XinmaiSameLifeSurfaceCommitProof` values.
2. Its Host Resolver validates those proofs against typed facts and selection.
3. Its public union uses the technology-neutral Motion/Static/Safe statuses.
4. Its public consumers never require a `WEBGL_MOTION_SURFACE_PRESENTED`
   discriminant.
5. Its C2 gate explicitly protects both the internal presenter identities and
   the public statuses.

Therefore:

```text
Old C2 typed layering:
PASS

Public outcome rename:
NOT REQUIRED / PROHIBITED IN MECHANICAL RECOMPOSITION

New internal outcome union:
NOT REQUIRED

Type Migration Prep:
NOT REQUIRED
```

## 9. Recomposition impact

The next current-head recomposition may reuse the already audited exact
23-file C2 patch without changing its public outcome discriminants.

The recomposition card must use:

```text
Public:
MOTION_SAME_LIFE_SURFACE_PRESENTED
STATIC_SAME_LIFE_SURFACE_PRESENTED
SAME_LIFE_SURFACE_SAFE_WITHHELD

Internal proof:
WEBGL_SAME_LIFE_BODY / webglContextCount=1
SEMANTIC_STATIC_SAME_LIFE_BODY / webglContextCount=0
```

It must not require a Runtime rename to
`WEBGL_MOTION_SURFACE_PRESENTED`. All other C2 frozen architecture, visual,
accessibility, low-vision and rollback boundaries remain unchanged.

If mechanical recomposition exposes a different conflict, that conflict must
be reviewed independently; this MAP does not authorize resolving unrelated
consumer or lifecycle differences.

## 10. Gate requirements for the recomposed candidate

The existing C2 gate must continue proving:

- all three public statuses are present;
- Motion proof presenter is `WEBGL_SAME_LIFE_BODY`;
- Static proof presenter is `SEMANTIC_STATIC_SAME_LIFE_BODY`;
- presenter count is exactly one;
- Motion context count is one;
- Static context count is zero;
- frame count, DOM connection and CSS are not success sources;
- Reality, Gravity, Returning and Archive receive the same typed facts;
- Accessible Semantic Mirror consumes only the public Host outcome;
- failure and mismatch map to Safe-Withheld.

No gate may require the rejected public name.

## 11. Delivery and phase state

```text
Public Same-Life Host Contract:
FROZEN

C2 Current-Head Recomposition:
READY TO RE-RUN

C2 Runtime Candidate:
NOT YET CREATED

C2 Forward Counter:
NOT YET CREATED

Runtime / Gate / Type / Renderer Diff in this MAP:
0

Remote:
a73d8e4bfbbf7dec36124d8a5b317e80c9180f98

Push:
HOLD

Phase 3:
ACTIVE / NOT PASSED

C2:
OPEN

C3:
DEFER

Phase 4:
LOCKED
```

## 12. Highest product rule

The Host tells downstream consumers which same-life experience was safely
presented. It does not expose which graphics API happened to implement that
experience. The internal presenter must still prove its own health before the
Host may state the product fact.
