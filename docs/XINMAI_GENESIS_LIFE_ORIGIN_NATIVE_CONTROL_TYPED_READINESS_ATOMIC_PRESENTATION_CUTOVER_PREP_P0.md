# XINMAI Genesis Life-Origin Native-Control Typed-Readiness Atomic Presentation Cutover PREP P0

## 0. Decision

```text
Traffic light: YELLOW
Blade: Major Blade Prep / Atomic Presentation Consumer Cutover
Decision: MAJOR BLADE APPLICATION READY
Migration Audit: NOT REQUIRED
Runtime / Gate / CSS in this PREP: unchanged
Push: HOLD
```

The corrective application is ready as one presentation-only rollback unit. It does not migrate persisted data, create a new state machine, or modify Identity, Birth Source, Recognition, Reality, Scene, Renderer, Storage, or navigation Authority. A Migration Audit is therefore not required.

The application must still be atomic: the current button render predicate, the Continuous Scene `LIFE_ORIGIN` near-object predicate, the native button location, the cross-chunk CSS override, and the click handler's silent guard cannot be changed independently. Partial delivery would preserve either a visible dead control or a second readiness definition.

Frozen baseline:

- Remote and PREP parent: `e5b04c05a2590403f4d41269153cb9a43c535247`
- Causal MAP: `e5b04c05a2590403f4d41269153cb9a43c535247`
- Birth-time evidence Candidate: `b4f5b81d07355ce6dff4f54a55c2760587cae95b`, evidence-only / HOLD
- Birth-time Counter: `2200313f4ae70bdc6405d4e8d6680467b9954ca9`, evidence-only / local
- Invalid evidence Origin remains untouched; this blade neither reads nor clears it.

## 1. Existing facts that remain authoritative

The cutover consumes, but never replaces, these existing facts:

1. `GenesisProductionRouteActivationAuthorization` is the route admission fact and carries the current `sourceReferenceId`.
2. `GenesisVisualConsumerSourceResult` is the real-user visual source and must match the route source.
3. `GenesisProductionRuntimeConsumerResult` owns the Genesis stage. Life-origin interaction is possible only at `COMPLETION` with the existing recognition hold.
4. `GenesisManifestationExperienceStateResult` owns the manifestation sequence. The relevant state is `PRESENCE_APPROACHING`.
5. `GenesisProductionRecognitionRealityResult` owns recognition and Reality-entry eligibility. The life-origin control may lead only toward an existing `RECOGNITION_CONFIRM` session; it cannot create that session.
6. `lifeOriginDiscoveryPhase` remains page-local presentation state: `DORMANT | DISCOVERING | REVEALED`. It is not Identity, Recognition, navigation, or persisted product truth.
7. `XinmaiContinuousSceneHost` remains the single world Host. Its Canvas pointer owner remains `NONE` for Genesis.

No DOM node, CSS property, timer, animation, Canvas frame, Scene outcome, or `elementFromPoint` result may produce or advance any of these facts.

## 2. Unique pure readiness resolver

The application must add exactly one pure read-only resolver:

```text
resolveXinmaiGenesisLifeOriginNativeControlReadiness(input)
```

Recommended files:

- `src/types/xinmaiGenesisLifeOriginNativeControlReadiness.ts`
- `src/services/xinmaiGenesisLifeOriginNativeControlReadinessResolver.ts`
- `src/services/xinmaiGenesisLifeOriginNativeControlPresentationPolicy.ts`

The resolver must not read Storage, DOM, CSS, media queries, time, RAF, Scene outcomes, Renderer state, or navigation state. It must not write anything. The input is an immutable snapshot provided by `GenesisProductionExperiencePage`.

### 2.1 Typed input

The minimum input is:

| Input | Required evidence |
| --- | --- |
| policy | `ENABLED` or `SAFE_WITHHELD`; policy is presentation-only |
| route admission | status and `sourceReferenceId` from current Genesis route authorization |
| visual consumer | status and real-user `sourceReferenceId` |
| production runtime | result status, `sourceReferenceId`, `currentStage`, `runtimeStatus`, `interactionAvailability` |
| manifestation session | result status, `sourceReferenceId`, `currentState` |
| recognition session | null, READY, or BLOCKED; operation, source reference, phase, interaction availability, recognition flags |
| discovery phase | `DORMANT | DISCOVERING | REVEALED` |

The same non-empty `sourceReferenceId` must be present in route admission, visual consumer, production runtime, manifestation session, and a READY recognition session. The resolver must compare the references explicitly; object presence is not enough.

Motion preference, Scene presenter mode, WebGL availability, and viewport size are deliberately absent. They can change presentation motion and geometry, but not readiness.

### 2.2 Typed output

Freeze the public result union to four states:

```text
WAITING
READY
CONSUMED
SAFE_WITHHELD
```

Each result carries:

- `sourceReferenceId: string | null`;
- `controlOwner: NATIVE_BUTTON | NONE`;
- `sceneNearObject: LIFE_ORIGIN | NONE`;
- `reason` as a bounded typed union;
- immutable boundary flags proving presentation-only and no writeback.

#### WAITING

Use only for a legal monotonic interval before all current facts are available, including the React effect interval where Runtime has reached `COMPLETION` but the Recognition session has not yet been initialized.

Allowed reasons:

- `GENESIS_COMPLETION_PENDING`
- `MANIFESTATION_APPROACH_PENDING`
- `RECOGNITION_SESSION_PENDING`

`WAITING` must not be used for a mismatch, blocked result, invalid reference, or state regression.

#### READY

All conditions must hold simultaneously:

- presentation policy `ENABLED`;
- route, visual consumer, runtime, manifestation, and recognition results are READY/current;
- every source reference is equal;
- Runtime is `COMPLETION` and still in its existing recognition hold;
- manifestation state is `PRESENCE_APPROACHING`;
- recognition phase is `AWAITING_RECOGNITION_CONFIRMATION`;
- recognition interaction is `RECOGNITION_CONFIRM`;
- `recognitionConfirmed === false` and Reality entry remains not eligible;
- discovery phase is `DORMANT`.

Only `READY` may expose the life-origin native button and the Scene `LIFE_ORIGIN` near-object description.

#### CONSUMED

Use when all lineage and upstream facts remain current but discovery phase is `DISCOVERING` or `REVEALED`. The life-origin button is absent and the Scene native hit region count is zero. The existing visual discovery timer may change presentation from `DISCOVERING` to `REVEALED`, but it never proves Recognition success.

#### SAFE_WITHHELD

Use for:

- policy `SAFE_WITHHELD`;
- route, consumer, runtime, manifestation, or recognition reference mismatch;
- blocked or invalid recognition session at the expected completion boundary;
- Runtime/manifestation/recognition combinations that cannot occur in the legal monotonic sequence;
- stale source fencing;
- recognition already advanced while discovery still claims `DORMANT`;
- malformed or missing required references after the expected completion boundary.

Bounded reasons must distinguish at least:

```text
PRESENTATION_PAUSED
SOURCE_REFERENCE_MISSING
SOURCE_REFERENCE_MISMATCH
RUNTIME_STATE_MISMATCH
MANIFESTATION_STATE_MISMATCH
RECOGNITION_SESSION_BLOCKED
RECOGNITION_STATE_MISMATCH
DISCOVERY_STATE_MISMATCH
```

Unknown combinations fail closed as `SAFE_WITHHELD`; they cannot be coerced into `WAITING` or `READY`.

## 3. Native-control presentation contract

`GenesisProductionExperiencePage` becomes the only life-origin interaction owner. `GenesisProductionRendererCanvasHost` must no longer render the button or receive an `onLifeOriginDiscoveryRequest` callback.

| Resolver state | Native origin button | `disabled` | `aria-disabled` | effective `pointer-events` | effective tab stop | Scene near object |
| --- | --- | --- | --- | --- | --- | --- |
| WAITING | absent | N/A | N/A | N/A | absent | NONE |
| READY | present exactly once | false | omitted | auto | natural 0 | LIFE_ORIGIN |
| CONSUMED | absent | N/A | N/A | N/A | absent | NONE |
| SAFE_WITHHELD | absent | N/A | N/A | N/A | absent | NONE |

The origin control must not be rendered as a visible disabled button. WAITING is brief and has no actionable user responsibility; a disabled visible control would create a second pseudo-state and ambiguous screen-reader output.

The READY control freezes the current visible and accessible contract:

- element: native `BUTTON`, `type="button"`;
- visible label: `轻触这束光`;
- accessible name: `轻触这束光，发现属于你的生命星宿`;
- one DOM instance, one accessibility node, one pointer target;
- center and all four inset corners must resolve to that same `BUTTON`;
- Enter and Space use native activation; no `role=button`, manual keyboard listener, Canvas click, or duplicate overlay;
- minimum target `128 × 44 CSS px` and a visible `:focus-visible` indicator;
- no positive `z-index` decorative layer may cover its hit rectangle.

The CSS declaration that establishes its final hit behavior must live with the lazy Genesis route stylesheet. `xinmai-continuous-scene.css` must not contain a competing `.origin-invitation` interaction rule. CSS import/chunk order must therefore be incapable of changing the outcome.

## 4. Handler final revalidation

Rendering from READY does not replace transaction-time validation. `beginLifeOriginDiscovery` must call the same resolver again with the current typed snapshot.

```text
render snapshot → resolver READY → one native BUTTON
physical/native activation
→ same resolver on current facts
→ READY: DORMANT → DISCOVERING once
→ otherwise: no transition + typed SAFE_WITHHELD presentation feedback
```

The handler may not rely on a captured `isReady` boolean alone. It may not silently return on a current mismatch. It must not mutate Recognition, Reality entry, source references, or Scene facts. The only allowed successful mutation is the existing page-local discovery transition.

Double activation while React is committing the first transition must converge: after the first `DORMANT → DISCOVERING`, the second revalidation returns `CONSUMED`, and no second timer or reveal sequence is created.

## 5. Failure and accessibility feedback

### WAITING

Do not announce a failure and do not expose a disabled origin control. Existing Genesis progress semantics remain responsible for the legal waiting interval.

### SAFE_WITHHELD

The page must expose one restrained visible and semantic status, once per transition:

```text
这束光暂时无法确认。已保存的出生信息仍被保留。
```

The status uses `role="status"` / polite live semantics. It must not expose typed reason codes, claim Identity failure, or ask the user to repeat completed input. Recovery uses one separate native button with the existing label `返回出生信息`; it navigates to the formal Birth input surface and does not write or clear data.

Refresh/recovery must not replay the same live announcement merely because the DOM remounted with an unchanged recovered state. The accessible snapshot still contains the status text.

The origin button and recovery button can never exist simultaneously. Decorative identity text remains a status after `REVEALED`, not a button.

## 6. Canvas, Host, overlay, and Scene responsibilities

### Page

- creates the resolver input from existing typed results;
- renders the unique button or SAFE_WITHHELD feedback;
- owns the final handler revalidation;
- publishes no new Authority.

### `GenesisProductionRendererCanvasHost`

- receives the resolver result as a read-only prop;
- publishes `nearObjectKind=LIFE_ORIGIN` only for READY;
- renders no interactive DOM and receives no click callback;
- keeps Scene `pointerInteraction=NONE`;
- may render the existing decorative visual response to discovery phase.

### `XinmaiContinuousSceneHost`

- remains the unique world Canvas/Context/RAF owner;
- consumes the typed Scene plan only;
- Host, Canvas with pointer owner NONE, Static presenter, and all overlays remain `pointer-events:none` over native controls;
- Scene `hitRegionContract=NATIVE_CONTROL` describes the external native owner; it does not create one.

### Suspense route-pending overlay

The route-pending status is never a hit owner. Its final computed `pointer-events` must be `none`; it cannot remain above or intercept a live native control. It does not participate in readiness.

### Renderer

The WebGL/Static Renderer consumes discovery phase and visual facts only. It does not consume browser hit tests and must not invoke the handler. No Renderer file is expected to change.

## 7. Motion and Reduced Motion

The resolver result, button DOM, accessible name, target geometry, focus order, and handler are identical in Motion and native Reduced Motion.

Motion may retain the restrained invitation breathing and identity reveal. Native Reduced Motion must disable both `gy-genesis-origin-invitation-breathe` and `gy-genesis-origin-identity-reveal` while preserving their final opacity, transform, placement, text, and hit area. Static presentation cannot wait for RAF or animation completion before enabling READY.

WebGL failure and Semantic Static fallback do not alter native-control readiness. If upstream typed facts remain READY, the native button remains usable over the trusted static surface. If typed facts do not match, the control remains SAFE_WITHHELD even when the visual is visible.

## 8. Route and recovery matrix

| Entry/recovery case | Required result |
| --- | --- |
| normal first completion | WAITING during legal recognition-session initialization, then READY |
| refresh with a valid recovered Birth source | recompute only from recovered typed source; no DOM/CSS recovery shortcut |
| Back/Forward to Genesis | route admission and all source references must be current before READY |
| Direct `/genesis` without a valid source | existing route `SOURCE_NOT_READY`; resolver/page interaction never mounts |
| Direct `/genesis` with a valid recovered source | legal Genesis replay may proceed; readiness is recomputed, never restored from DOM |
| source changes while page is mounted | dispose prior presentation phase and resolve against the new source; mismatch SAFE_WITHHELD |
| Recognition already confirmed | CONSUMED only when the current discovery lineage is coherent; otherwise SAFE_WITHHELD |
| stale/blocked recognition session | SAFE_WITHHELD |
| Motion ↔ Reduced Motion change | same readiness and source reference; only motion presentation changes |
| WebGL → Static failure fallback | same readiness and source reference; native control remains the owner |

No new persistence or backfill is permitted for readiness or discovery phase.

## 9. Production Gate contract

The corrective commit must add and register a failing gate that covers three different proof layers. Source-string presence alone is insufficient.

### 9.1 Resolver matrix gate

- compile/import the real resolver;
- prove WAITING, READY, CONSUMED, and every SAFE_WITHHELD reason family;
- source, runtime, manifestation, or recognition mismatch never returns READY;
- policy counter returns SAFE_WITHHELD;
- resolver contains no Storage, DOM, timer, RAF, navigation, Renderer, or mutation dependency.

### 9.2 Consumer-alignment gate

- exactly one life-origin native button producer: `GenesisProductionExperiencePage`;
- `GenesisProductionRendererCanvasHost` contains no button, callback, click handler, keyboard handler, or pointer owner;
- READY is the sole predicate for both native button presence and Scene `LIFE_ORIGIN` publication;
- handler calls the same resolver and reports a typed withheld result rather than silently returning;
- old completion-only and `DORMANT`-only successful predicates are absent;
- Host/Canvas interaction owner remains NONE.

### 9.3 Hashed Production hit-target and cascade gate

Run against the built hashed Production bundle and the formal `/genesis` route, not Vite dev, Fixture, Acceptance, query injection, or manual Storage.

For READY in Motion and native Reduced Motion:

- computed `pointer-events=auto`;
- computed visibility and opacity are usable;
- native `disabled=false`, `aria-disabled` absent, effective `tabIndex=0`;
- center plus four inset corners resolve to the same BUTTON;
- focus-visible is perceivable;
- main and lazy CSS chunks cannot reverse the result;
- route-pending overlay and Host do not intercept;
- exactly one activation enters DISCOVERING.

The compiled CSS check must fail if any later-loaded rule gives the control `pointer-events:none`, hides it, or covers its hit region. A source regex that merely finds `pointer-events:auto` does not pass this gate.

Also verify:

- 320×568, 360×800, 390×844, 430×932;
- browser 200% zoom;
- pointer, Enter, and Space;
- refresh and Back/Forward;
- no duplicate status announcement on recovery;
- Production Bundle contains no Fixture, Acceptance, fault injection, or test harness.

## 10. Atomic consumer cutover and file boundary

Expected application files:

1. `src/types/xinmaiGenesisLifeOriginNativeControlReadiness.ts` — typed resolver contract.
2. `src/services/xinmaiGenesisLifeOriginNativeControlReadinessResolver.ts` — sole pure resolver.
3. `src/services/xinmaiGenesisLifeOriginNativeControlPresentationPolicy.ts` — one-field policy and Counter seam.
4. `src/types/index.ts` — export the public presentation types, if required by the existing type registry.
5. `src/types/genesisProductionExperiencePage.ts` — replace callback-based CanvasHost prop with the typed readiness result.
6. `src/pages/GenesisProductionExperiencePage.tsx` — sole resolver caller, native button owner, handler revalidation, and withheld feedback.
7. `src/components/GenesisProductionRendererCanvasHost.tsx` — remove button/callback; consume readiness only for Scene near-object publication.
8. `src/styles/genesis-production-experience.css` — final button hit/focus/geometry rules and Reduced Motion parity.
9. `src/styles/xinmai-continuous-scene.css` — remove competing button rule and make route-pending overlay non-interactive.
10. `scripts/check-xinmai-genesis-life-origin-native-control-readiness.mjs` — resolver and consumer alignment gate.
11. one Production hashed-bundle hit-target gate script, if it cannot be safely contained in item 10.
12. `package.json` — register both gates in the complete XINMAI suite.

No change is expected in:

- `GenesisProductionRouteEntry.tsx`;
- Recognition, Runtime, Manifestation, Identity, Birth Source, Reality, Pressure, Gravity, Choice, or navigation services;
- `XinmaiContinuousSceneHost.tsx` or the Scene resolver;
- WebGL/Static Renderers;
- Storage, Schema, DB, Store, Index, Worker, assets, or product success copy.

If implementation requires one of those changes, the application must stop and return to re-audit.

### Old paths removed in the same commit

- button rendering inside `GenesisProductionRendererCanvasHost`;
- `onLifeOriginDiscoveryRequest` CanvasHost prop;
- completion-plus-DORMANT-only button predicate;
- completion-plus-DORMANT-only Scene near-object predicate;
- duplicate `.origin-invitation { pointer-events:auto }` rule in main Continuous Scene CSS;
- silent handler return for a once-visible control;
- Canvas/Host/overlay as a possible hit owner.

The old paths cannot coexist with the new resolver beyond the atomic commit.

## 11. Forward SAFE_WITHHELD Counter

The Runtime Candidate must have a direct-child Counter. The preferred Counter changes exactly:

```text
src/services/xinmaiGenesisLifeOriginNativeControlPresentationPolicy.ts
ENABLED → SAFE_WITHHELD
```

Counter behavior:

- resolver returns `SAFE_WITHHELD / PRESENTATION_PAUSED`;
- no life-origin native button or Scene near target is exposed;
- restrained status and formal Birth recovery control remain available;
- existing Birth source, Genesis progress, Recognition facts, Identity assets, C1/C2, Reality/Gravity controls, and Continuous Scene base/static surface remain readable;
- no old Canvas click, old button-in-Renderer path, competing CSS override, or completion-only readiness predicate is restored.

If the Counter needs a second Runtime file, the policy seam has failed and the Candidate must not be delivered.

Counter verification includes TypeScript, Production Build, the complete Gate suite, resolver policy matrix, asset preservation, no old pointer owner, and no Production test artifact.

## 12. Application and evidence sequence

```text
PREP document exact delivery
→ YELLOW Atomic Presentation Application
→ direct-child Forward SAFE_WITHHELD Counter
→ independent Desktop hashed Production Push Gate
→ exact non-forced Remote delivery only after PASS
→ clean-snapshot Closure Revalidation
→ recomposition of Birth-time Runtime from the new Remote
→ new direct-child Birth-time Counter
→ resume Birth-time Push Gate from the rejected Genesis handoff
```

The old Birth-time Candidate `b4f5b81...` never becomes an ancestor of the corrected delivery. Its Runtime patch must be mechanically recomposed on the corrected Remote, with content and patch equivalence proven after excluding this baseline presentation correction.

## 13. Stop conditions

Stop and request re-audit if implementation discovers:

- a need to change Recognition or Genesis Runtime transition semantics;
- a new persisted state, Schema, Store, Writer, or recovery Authority;
- a second native control or second readiness producer;
- Scene/Renderer evidence required to make the control READY;
- an inability to withhold via the one-file policy Counter;
- a need to restore Canvas pointer input;
- source-reference rules that cannot be resolved by current immutable facts.

## 14. Stage status

```text
Genesis Reveal MAP: DELIVERED
Genesis native-control typed readiness: APPLICATION READY / NOT IMPLEMENTED
Birth-time Candidate b4f5b81: EVIDENCE ONLY / HOLD
Birth-time Push Gate: HOLD AT BASELINE GENESIS DEFECT
C2 / V5 / Android: HOLD
C3 / Audio / Haptic / AI / Monetization: DEFER
Phase 4: LOCKED
```

TypeScript / Production Build: N/A for this doc-only PREP.
