# XINMAI Genesis Reveal Hit Target and Typed Readiness Causal MAP P0

## 0. Decision

```text
Traffic light: YELLOW
Blade: Causal MAP / Native-control typed-readiness alignment
Runtime / Gate / CSS: unchanged
Final exit: YELLOW — MAJOR BLADE PREP REQUIRED
```

The visible Genesis reveal control is not a CSS-only defect that is safe to correct under a GREEN knife. The effective Production cascade makes the real `BUTTON` non-hit-testable, and the button's render condition is also weaker than the handler's typed readiness guard. Fixing only `pointer-events` would expose a real interval in which a visible enabled button can reach a handler that must silently refuse the request. The correction therefore needs one atomic presentation-consumer cutover that aligns visibility, hit testing, keyboard activation, and the existing typed readiness decision without changing the state machine or any Authority.

Frozen objects:

- Remote baseline: `eb076dd12800c91a50affb7dee86c8c39d8d6df6`
- Birth-time evidence Candidate: `b4f5b81d07355ce6dff4f54a55c2760587cae95b`
- Birth-time Counter: `2200313f4ae70bdc6405d4e8d6680467b9954ca9`
- Push Gate evidence: `genesis-birth-time-solar-lunar-derivation-push-gate-20260809`
- Candidate remains evidence-only and unpushed.
- The invalid evidence Origin is not read, cleared, rewritten, or migrated by this MAP.

## 1. Exact first breakpoint

The first causal breakpoint is the Production CSS cascade for `.gy-genesis-production-experience__origin-invitation`.

### Source rules

`src/styles/genesis-production-experience.css` defines the historical visual-label rule:

```css
.gy-genesis-production-experience__origin-invitation,
.gy-genesis-production-experience__origin-identity {
  pointer-events: none;
}
```

`src/styles/xinmai-continuous-scene.css` later declares:

```css
.gy-genesis-production-experience__origin-invitation {
  pointer-events: auto;
}
```

The selectors have equal specificity. Source-file order does not determine Production order because the files are delivered by different chunks:

- `src/main.tsx` imports `xinmai-continuous-scene.css`; its rule is emitted in the main CSS bundle.
- `GenesisProductionRouteEntry.tsx` and `GenesisProductionExperiencePage.tsx` import `genesis-production-experience.css`; it is emitted in the lazy Genesis route CSS chunk.
- The route CSS is attached after the main bundle when `/genesis` loads, so its equal-specificity `pointer-events:none` wins.

Observed compiled evidence:

- main bundle rule: `pointer-events:auto`
- lazy `GenesisProductionRouteEntry-*.css` rule loaded afterward: grouped `pointer-events:none`
- computed button value: `pointer-events:none`
- `elementFromPoint` at center and all corners: `MAIN`, never `BUTTON`
- semantic click and physical pointer click: no transition
- runtime warnings/errors: 0

The Continuous Scene Host is not the direct intercepting element: the fixed Host and its Canvas with pointer owner `NONE` are correctly `pointer-events:none`. The page `MAIN` becomes the hit result because the real button removes itself from pointer hit testing.

## 2. First-introduction history

| Commit | Change | Product consequence |
| --- | --- | --- |
| `3b369054d3aa372c9e879e8b0a0f29b85a07e47f` | Introduced `pointer-events:none` for `.origin-invitation`; at that time the element was a decorative, `aria-hidden` paragraph and the Canvas owned the click. | Correct for the old ownership model. |
| `d15182409ba00f307c2064f21fbc125d11d6fc06` | V1 Continuous Scene removed the route Canvas pointer owner and converted the decorative paragraph into the real native `BUTTON`; added an intended `pointer-events:auto` rule in main-bundle Continuous Scene CSS. | First defective commit. The route CSS still loads later and restores `none`. |
| `95b6c058228fbf651962f7475885815e67704661` | Strengthened SAFE_WITHHELD exit hit targets and Host transparency. | Did not cover the Genesis reveal button. |

The four relevant files have zero diff between Remote `eb076dd...` and Birth-time Candidate `b4f5b81...`:

- `src/components/GenesisProductionRendererCanvasHost.tsx`
- `src/pages/GenesisProductionExperiencePage.tsx`
- `src/styles/genesis-production-experience.css`
- `src/styles/xinmai-continuous-scene.css`

Classification: `BASELINE_EXISTING = YES`; `BIRTH_TIME_CANDIDATE_UNIQUE = NO`.

## 3. Typed readiness alignment

The public control and its handler do not consume the same readiness predicate.

### Current visible-control predicate

`GenesisProductionRendererCanvasHost` renders the reveal `BUTTON` when:

```text
visualCalibrationBundle.runtimeStage = COMPLETION
AND lifeOriginDiscoveryPhase = DORMANT
```

### Current handler predicate

`beginLifeOriginDiscovery` mutates presentation only when:

```text
productionRuntimeResult = READY
AND productionRuntimeResult.session.currentStage = COMPLETION
AND recognitionInteractionAvailability = RECOGNITION_CONFIRM
AND lifeOriginDiscoveryPhase = DORMANT
```

`recognitionInteractionAvailability` is produced by the existing typed Recognition/Reality session, initialized in a React effect after completion is observed. Therefore `runtimeStage=COMPLETION` is necessary but is not a structural proof that `RECOGNITION_CONFIRM` is already current in the same render. The child can publish a visible enabled control before the handler is admissible.

The handler's guard is correct and must remain. The defect is presentation readiness drift, not an Authority failure. A correction must not remove or weaken the guard, infer readiness from the DOM, or let the Scene Host create recognition readiness.

## 4. Genesis control inventory

| Control | Current visibility input | Handler revalidation | Hit-layer finding |
| --- | --- | --- | --- |
| Recovery `返回出生信息` | Route authorization/recovery not READY | direct local navigation only | Native button; recovery surface not covered by the defective selector. |
| Reveal `轻触这束光` | visual runtime `COMPLETION` + discovery `DORMANT` | additionally requires typed `RECOGNITION_CONFIRM` | **DEFECT:** effective pointer `none`; visibility/handler predicate drift. |
| Recognition `认出它一直在那里` | `recognitionActionReady` + quiet-hold completion | revalidates Recognition session, runtime and manifestation | Predicates are substantially aligned; native button styles do not set pointer `none`. |
| Reality entry `进入现实观察` | typed `ENTER_REALITY`, presence continuity, response settled, relationship intent resolved | revalidates the same typed facts before creating Reality intent | Aligned; no Canvas success input. |
| Life whisper skip/submit/retry/continue | `lifeWhisperEntryReady` and typed response phase | handlers revalidate current fact/phase | Native controls inside z-index 2 form; no defective pointer rule. |
| Relationship naming skip/submit | `relationshipNamingReady` and naming state | handlers revalidate naming readiness and typed visual continuity | Native controls; optional asset remains nonblocking. |

`UNKNOWN = 0` for formal Genesis controls.

## 5. Canvas, Host and overlay ownership

```text
XinmaiContinuousSceneHost (fixed, z=0, pointer-events:none)
  -> Canvas pointer owner NONE for Genesis reveal
  -> Motion/Static presentation only

Genesis page MAIN
  -> owns native controls
  -> must remain above the Scene Host
  -> must not consume Scene success as Recognition Authority

Decorative overlays
  -> origin identity / time response / presence response / static response
  -> pointer-events:none

Interactive overlays
  -> reveal button / recognition / Reality entry / whisper / naming
  -> native controls only
```

The Scene Host is correctly transparent to native input in Motion, Static and SAFE_WITHHELD modes. The defect comes from retaining the former decorative-label rule on the new native button.

The route-pending status has z-index 2 and no explicit pointer rule. It is not present in the captured stable reveal state, but the next blade must verify that a transition overlay cannot cover a still-visible native control; the old NEAR hit target must be revoked before route transition.

## 6. Motion, Reduced Motion and narrow viewport

### Motion / Static

- The same native reveal control is rendered in Motion and Reduced Motion.
- The Host uses `pointerInteraction:NONE`; neither WebGL nor Static presenter should own this action.
- The broken route CSS is mode-independent, so both modes inherit the hit-target failure.
- WebGL/Static outcome must not enable the button; typed recognition readiness remains the only admission.

### Reduced Motion secondary defect

The current Reduced Motion rule disables only whisper/naming arrival animation. It does not disable:

- `gy-genesis-origin-invitation-breathe`
- `gy-genesis-origin-identity-reveal`

Thus the origin invitation still breathes under native Reduced Motion. This is related presentation debt and belongs in the same atomic presentation blade, but it does not authorize changes to Scene or Recognition Authority.

### Narrow viewport

- Genesis is constrained to 320–430 CSS px and the reveal control is positioned at `top:72%`, with the intended minimum hit size 128×44.
- Geometric presence is not enough: the Push Gate proved that the actual hit object is `MAIN`.
- At 320×568 and other short heights, the route-pending overlay and bottom completion actions must be checked for overlap.
- Center plus four-corner `elementFromPoint`, keyboard Enter/Space, focus visibility and scroll/crop must be verified at 320×568, 360×800, 390×844 and 430×932.

## 7. Why existing gates passed

| Gate family | What it proves | Missing assertion |
| --- | --- | --- |
| Continuous Scene consumer cutover | Host/Canvas pointer ownership and old Canvas removal | Does not inspect native `LIFE_ORIGIN` control or cross-chunk CSS order. |
| Genesis birth-coordinate continuous scene | Single Host and visible control copy | Checks source strings, not compiled cascade, hit target or typed readiness. |
| Life-origin star-map reveal | User-trigger markers and reveal timer | Originated under the former Canvas-owner model; does not prove the new native button receives an event. |
| Genesis production page | Runtime/route structural boundaries | Does not run `elementFromPoint` or compare render and handler predicates. |
| Existing narrow hit-target gate | Recovered C2 Ownership control only | Does not cover Genesis controls. |

The failure escaped because all current checks are source-level or test another control. None loads the hashed Production main CSS plus lazy Genesis CSS and asserts final computed style and real hit ownership.

## 8. Why GREEN correction is rejected

A single CSS edit can make the button physically hit-testable, but it cannot prove that the typed `RECOGNITION_CONFIRM` result is current whenever the button is visibly enabled. That would retain a visible silent-return path.

The safe cutover needs a small but multi-consumer presentation contract:

1. derive one read-only `lifeOriginInteractionReady` decision from existing runtime completion, Recognition `RECOGNITION_CONFIRM`, and discovery `DORMANT`;
2. render/enable the native button only from that decision;
3. keep the handler's full typed revalidation;
4. co-locate final hit-target CSS with the lazy Genesis route CSS, so chunk load order cannot reverse it;
5. remove the now-misleading duplicate control override from Continuous Scene CSS;
6. disable origin invitation/identity animation under Reduced Motion;
7. add a compiled Production hit/readiness gate.

This changes no state machine transition or Authority, but it necessarily changes the typed presentation consumer boundary and `GenesisProductionRendererCanvasHost` inputs. That exceeds the authorized GREEN pure-CSS correction.

## 9. Frozen next-blade scope

Recommended next knife:

```text
XINMAI-GENESIS-LIFE-ORIGIN-NATIVE-CONTROL-
TYPED-READINESS-ATOMIC-PRESENTATION-CUTOVER-P0

Traffic light: YELLOW
Blade: Major Blade / Atomic Presentation Consumer Cutover
Decision: PREP FIRST, then Runtime only after scope closure
```

Estimated Runtime boundary after PREP:

- `src/pages/GenesisProductionExperiencePage.tsx`
- `src/components/GenesisProductionRendererCanvasHost.tsx`
- `src/types/genesisProductionExperiencePage.ts`
- `src/styles/genesis-production-experience.css`
- `src/styles/xinmai-continuous-scene.css`
- one new/strengthened registered Genesis hit/readiness gate
- `package.json` gate registration if a new alias is required

Forbidden:

- Recognition/Reality state-machine changes
- Identity, Birth Source, Reality Intent, Pressure, Gravity or navigation Authority changes
- Scene Host pointer ownership changes
- Canvas click restoration or second success path
- DOM/animation/timer readiness
- copy changes
- Renderer, Storage, Schema or asset changes

Rollback must withhold the new native reveal presentation while preserving route recovery, the Continuous Scene base surface and all existing typed assets. It must not restore the former Canvas pointer owner.

## 10. Required acceptance matrix

- hashed Production bundle with main and lazy Genesis CSS
- Motion and native Reduced Motion
- control absent/disabled before typed `RECOGNITION_CONFIRM`
- control visible and enabled only when typed readiness is current
- center/four corners hit the same `BUTTON`
- pointer, Enter and Space each produce exactly one `DORMANT → DISCOVERING` transition
- refresh and Back/Forward recover without duplicate reveal or silent return
- 320×568, 360×800, 390×844, 430×932
- route-pending overlay cannot intercept a live native control
- Host/Canvas pointer owner remains `NONE`
- source reference unchanged across reveal
- no Scene outcome, RAF, timer, DOM or CSS value becomes Recognition Authority
- no default/Fixture/Acceptance/fault injection in Production

After this baseline correction is delivered and independently closed, the Birth-time Runtime patch must be recomposed from the new Remote. Old `b4f5b81...` remains evidence-only; the recomposed patch must prove content/patch equivalence excluding the new baseline correction, and must receive a new direct-child Counter before the unfinished Birth-time Push Gate resumes.

## 11. Stage status

```text
Genesis reveal reachability: OPEN / BASELINE DEFECT
Birth-time Candidate: HOLD / EVIDENCE ONLY
Birth-time Push Gate: REJECTED AT GENESIS HANDOFF
C2 / V5 / Android: HOLD
C3 / Audio / Haptic / AI / Monetization: DEFER
Phase 4: LOCKED
```

TypeScript / Build: N/A for this doc-only MAP.
