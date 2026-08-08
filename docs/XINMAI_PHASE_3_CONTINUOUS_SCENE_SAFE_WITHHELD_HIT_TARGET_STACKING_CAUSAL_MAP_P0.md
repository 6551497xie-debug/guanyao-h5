# XINMAI Phase 3 Continuous Scene SAFE_WITHHELD Hit-Target / Stacking Causal MAP P0

## 0. Control status

- Knife: `XINMAI-PHASE-3-CONTINUOUS-SCENE-SAFE-WITHHELD-HIT-TARGET-STACKING-CAUSAL-MAP-P0`
- Decision: `YELLOW / MAP ONLY`
- Remote / audit baseline: `ebad68f430f06fceda791582064d6b8edd0f836f`
- Rejected V3 evidence candidate: `edeb793ae3570817f8ba6b78ef4d5846a8598bc8`
- V3 forward counter: `5df51836e1103ca941d01cd28befea4c4e739d5e`
- Runtime, Gate, Candidate, Counter and device changes in this MAP: `0`
- C1: `CLOSED / PASS`
- C2: `CLOSED / PASS`
- V3 delivery: `OPEN / PUSH HOLD`
- Phase 3: `ACTIVE / NOT PASSED`
- C3 Haptic / Audio: `PAUSED / DEFER`
- Phase 4: `LOCKED`

This document maps one bounded defect: a legal native escape action exists in the DOM and accessibility tree while the Continuous Scene Host paints over it and owns its hit point during `CONTINUOUS_SCENE_SAFE_WITHHELD`.

## 1. Accepted current evidence

Accepted physical Android screenshot:

`/Users/xieyanjun/.codex/visualizations/2026/07/22/019f87bd-b535-7723-9184-06a6fd71127e/v3-production-evidence-gate-edeb793-20260808/06-post-dom-current-screen.png`

The screenshot shows official Chrome at `/reality`. The visible product layer contains only the passive reflection copy. The enabled escape action is not painted.

Read-only browser evidence from the same stable frame:

| Evidence | Observed fact |
| --- | --- |
| Route | `/reality` |
| Product state | `SOURCE_NOT_READY` |
| Guard reason | `INTENT_EXPIRED` |
| Reality Intent | `READY_TO_ENTER_REALITY` |
| Post-commit transaction | `FAILED` |
| Scene policy | `ENABLED` |
| Scene outcome | `CONTINUOUS_SCENE_SAFE_WITHHELD` |
| Scene consumer / plan | `NONE / NONE` |
| Scene world presenter count | `0` |
| Viewport | `353 x 703 CSS px`, DPR `3` |
| Document scroll | `scrollTop 0`, `scrollHeight 703`, `clientHeight 703` |
| Scroll containers | `0` |
| Enabled controls | one native `BUTTON`: `这一轮先到这里` |
| Button geometry | `x 98.66`, `y 349.67`, `w 156`, `h 33`; inside viewport |
| Button computed state | `display:block`, `visibility:visible`, `opacity:1`, `pointer-events:auto` |
| Center hit target | `DIV.xinmai-continuous-scene-host`, not the button |

The user cannot solve this by scrolling. The action is neither below the fold nor clipped by a scroll owner. DOM visibility and accessibility-tree presence do not equal a visible or operable product surface.

## 2. Introduction differential

### 2.1 Commit lineage

| Layer | Commit | Relevant change | Attribution |
| --- | --- | --- | --- |
| Pre-V1 audit parent | `6bcf699a…` | no AppShell Continuous Scene Host runtime | defect absent by construction |
| V1 runtime | `d1518240…` | wraps formal routes with `XinmaiContinuousSceneHost`; adds full-viewport fixed Host CSS | **first introduction** |
| V1 closure | `ad947bbd…` | documentation only | unchanged |
| V2 runtime / recovery | `ff2b5113…` and descendants | Genesis input/recovery work | Host/AppShell/route-guard stacking unchanged |
| V3 remote parent | `ebad68f4…` | documentation audit | contains the V1 defect |
| V3 candidate | `edeb793a…` | semantic projection and consumers | no diff in Host CSS, Host component, AppShell or route-guard CSS |

`git blame` assigns every relevant rule in `src/styles/xinmai-continuous-scene.css` to `d1518240…`. The diff from `d1518240…` through `ebad68f4…` is zero for:

- `src/components/AppShell.tsx`
- `src/components/XinmaiContinuousSceneHost.tsx`
- `src/styles/xinmai-continuous-scene.css`
- `src/styles/reality-pressure-presentation.css`

The diff from `ebad68f4…` to `edeb793a…` is also zero for those files. Therefore:

- Candidate-unique defect: `NO`
- First introduced: V1 runtime `d1518240…`
- First observed as a delivery blocker: V3 physical Android Gate
- V3 candidate delivery consequence: `REJECT / HOLD` until the inherited defect is corrected and the candidate is recomposed

## 3. Earliest causal breakpoint

### 3.1 Paint and hit-test sequence

```text
AppShell creates isolated .xinmai-life-app stacking context
  -> XinmaiContinuousSceneHost renders first sibling
  -> Host is position:fixed; inset:0; z-index:0
  -> Host always paints opaque #020306 background
  -> Host itself retains pointer-events:auto
  -> route guard is a later normal-flow, non-positioned sibling
  -> SAFE_WITHHELD has no canvas/static presenter, but Host box remains full-screen
  -> Host background paints over route guard
  -> Host box wins document.elementFromPoint(button center)
  -> native escape button remains semantic-only, not visible/operable
```

### 3.2 Exact code-contract gap

`src/styles/xinmai-continuous-scene.css` protects only two descendants:

- a Canvas with pointer owner `NONE` receives `pointer-events:none`;
- the Static Presenter receives `pointer-events:none`.

It does **not** protect the Host container itself. It also gives the Host an opaque background for every outcome, including `CONTINUOUS_SCENE_SAFE_WITHHELD` with `consumer=NONE`, `plan=NONE`, and presenter count `0`.

The existing gates prove single ownership and removal of route-local Canvas/RAF paths, but do not assert either of these safety invariants:

1. an empty or SAFE_WITHHELD Host must not paint over native route recovery controls;
2. only the explicitly selected Canvas pointer owner may intercept input; the Host container must never be an implicit pointer owner.

### 3.3 Primary classification

`GREEN — HOST STACKING / HIT-TARGET NARROW CORRECTION`

This is not a new product state, Authority, presenter, route admission rule, or consumer migration. The typed outcome is already correct. The visual/hit-test behavior fails to honor it.

An atomic migration is not required because:

- `CONTINUOUS_SCENE_SAFE_WITHHELD` remains the single public outcome;
- no consumer changes its success interpretation;
- no C1/C2 fact, presenter proof, scene plan or business state changes;
- the correction can be isolated to the existing Host stylesheet plus one existing registered gate;
- the forward counter can remain the single V3 semantic policy switch.

## 4. Frozen correction contract

### 4.1 Host and pointer ownership

- `.xinmai-continuous-scene-host` is a composition layer, never an implicit hit target.
- The Host container must use `pointer-events:none` in all modes.
- A motion Canvas may use `pointer-events:auto` only when its typed registration says `HOST_CANVAS`.
- A motion Canvas with pointer owner `NONE`, every Static Presenter, and every SAFE_WITHHELD surface remain non-interactive.
- Page-native buttons, links, fields, focus rings and recovery controls remain the only native interaction owners outside an explicitly registered Canvas target.

### 4.2 SAFE_WITHHELD paint contract

When `data-continuous-scene-outcome="CONTINUOUS_SCENE_SAFE_WITHHELD"`:

- Host background is transparent;
- Host cannot intercept pointer input;
- no Canvas, Static Presenter, world presenter or second body is mounted;
- native route failure/recovery content remains visibly painted and operable;
- the Host does not synthesize a replacement success surface;
- DOM/data attributes are observation mirrors only, not success Authority.

Using the typed-outcome mirror to remove an obstruction is permitted; it does not establish scene success. Any missing or untrusted presentation continues to be withheld.

### 4.3 Mode matrix

| Mode | Scene outcome | Host paint | Pointer owner | Native controls |
| --- | --- | --- | --- | --- |
| Motion, trusted plan | `CONTINUOUS_SCENE_MOTION_PRESENTED` | trusted Canvas/world | `HOST_CANVAS` only when explicitly registered; otherwise none | visible, reachable, not covered by Host box |
| Native Reduced Motion | `CONTINUOUS_SCENE_STATIC_PRESENTED` | trusted semantic static presenter | none | visible and reachable |
| WebGL failure static | `CONTINUOUS_SCENE_STATIC_PRESENTED` after failure release | same trusted static presenter | none | visible and reachable |
| Missing/mismatched proof | `CONTINUOUS_SCENE_SAFE_WITHHELD` | transparent Host, no presenter | none | visible and reachable |
| V3 Counter | semantic projection `SAFE_WITHHELD`; Scene resolves withheld as applicable | transparent Host when withheld | none | visible and reachable |

The correction must not alter motion choice, Reduced Motion selection, WebGL failure fallback, C2 public outcomes, or presenter counts.

## 5. Accessibility contract

- A native enabled action present in the accessibility tree must also be visibly perceivable and physically hit-testable.
- Center and all four inset corners of `这一轮先到这里` must hit the native `BUTTON`, not the Host, Canvas, reflection copy or an invisible overlay.
- Keyboard focus must paint above the Host and must not disappear behind its background.
- Reading order remains route status/copy then recovery action; the Scene Host remains `aria-hidden`/non-semantic.
- Motion and Reduced Motion expose the same action name and route result.
- No claim of full TalkBack/VoiceOver compliance follows from this correction; physical hit testing, keyboard focus and semantic-tree evidence are required at its independent Push Gate.

## 6. Corrective candidate and counter boundary

The rejected V3 candidate must not receive a corrective child for delivery. The new immutable candidate must be recomposed from the latest documentation baseline:

1. deliver this single MAP document as a non-forced fast-forward from `ebad68f4…`;
2. mechanically replay the exact V3 runtime patch `edeb793a… ^..edeb793a…` onto that documentation head;
3. add the narrow Host stylesheet correction;
4. strengthen the already registered Continuous Scene consumer-cutover gate to assert the frozen paint/hit contract;
5. produce one atomic Runtime candidate commit;
6. generate a new direct-child V3 forward counter with only `ENABLED -> SAFE_WITHHELD` in `xinmaiRealityGravityChoiceSceneSemanticPresentationPolicy.ts`.

Runtime delta beyond the mechanically replayed V3 files is frozen to:

- `src/styles/xinmai-continuous-scene.css`
- `scripts/check-xinmai-continuous-scene-consumer-cutover.mjs`

No package alias is required because the strengthened gate is already registered. If implementation requires a Host component change, route-specific z-index patch, business copy change, type/outcome change, second counter file, or consumer logic change, stop and reclassify to `YELLOW MAJOR BLADE PREP`.

The new Counter must keep the correction. It must not restore:

- an opaque SAFE_WITHHELD Host;
- Host-container pointer interception;
- blind route-local Canvas or fallback success;
- old V3 semantic presentation;
- any C1/C2 legacy or second presenter.

## 7. Verification matrix for the corrective candidate

### Engineering

- Candidate parent equals the delivered MAP remote head.
- Old `edeb793a…` and `5df5183…` remain evidence-only and outside the new candidate ancestry.
- V3 runtime file/content patch equivalence holds, excluding only the frozen CSS/gate correction.
- TypeScript, Production Build and every registered XINMAI gate pass.
- Gate deletion, alias loss and weakening: `0`.
- Production Bundle contains no Fixture, Acceptance or fault-injection code.
- New DB, Store, Index, Writer, Authority, state, presenter or public outcome: `0`.

### Browser / physical evidence

- `/reality` + `SOURCE_NOT_READY` + `INTENT_EXPIRED`: the enabled escape button is visibly painted.
- Document has no scroll owner: the action is still reachable without scrolling.
- Button center and four inset corners hit the native button.
- Host center outside an explicit Canvas interaction does not become an implicit pointer owner.
- Motion: one Host/Canvas/Context/RAF and no second body; page-native recovery controls remain above the Host.
- Reduced Motion: zero WebGL/RAF, one Static Presenter, same native control visibility/hit behavior.
- SAFE_WITHHELD: zero world presenters, transparent/pass-through Host, native status and controls intact.
- Direct URL, refresh, Back/Forward, stale intent, missing source, identity mismatch and recovery failure retain safe, operable exits.
- Narrow viewports `320x568`, `353x703`, `360x800`, `390x844`, `430x932` and native 200% preserve the same result.
- Semantic tree, Tab focus, physical touch and screenshot agree; no DOM-only success.
- Android animation settings are restored after evidence capture.

## 8. Final decision

**GREEN CORRECTION READY — RECOMPOSE V3 CANDIDATE**

The first causal breakpoint is V1 commit `d1518240…`: the full-viewport Host was introduced with an always-opaque background and implicit pointer ownership, while the existing route guard remained a normal-flow sibling. V2 and V3 did not introduce or modify this behavior. The defect is inherited baseline debt that blocks V3 delivery but does not invalidate V3 semantic projection.

The correction is a two-file, non-semantic Host CSS/gate hardening inside a newly recomposed V3 candidate. Runtime push remains `HOLD` pending its independent Push Gate.

## 9. Validation applicability

- `git diff --check`: required.
- Commit scope: exactly this one new document.
- TypeScript / Production Build: `N/A` for this document-only MAP.
- Runtime validation begins only after exact document delivery and isolated candidate recomposition.
