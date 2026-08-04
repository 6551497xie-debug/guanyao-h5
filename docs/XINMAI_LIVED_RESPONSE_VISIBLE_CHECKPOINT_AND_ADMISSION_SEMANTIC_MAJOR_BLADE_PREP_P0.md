# XINMAI Lived Response Visible Checkpoint and Admission Semantic Major Blade PREP P0

Date: 2026-08-04

Decision: `PREP CLOSED / ATOMIC PRESENTATION APPLICATION READY`

Traffic light: `YELLOW`

Parent: `0669fc4851ed75e20e5c1e3307f745e278f9820c`

Runtime / Gate / Storage / Schema / Authority / Renderer / CSS / copy: `DIFF 0`

Push: `HOLD`

## 1. Objective and inherited finding

This PREP converts the preceding reachability finding into one bounded Presentation contract. It does not add a Growth or Relationship state machine.

Inherited source truth:

```text
the three evidence runs never exposed READY_FOR_LIVED_RESPONSE
↓
no explicit Lived Response confirmation was observed
↓
Fact / Eligibility / Formation Receipt / Crystal / Body Imprint remained 0
```

The existing Fact, Eligibility, Formation and Ownership authorities are functionally reachable and remain unchanged. The open product problem is that `/launch-lab` uses one similar life-world shell for baseline return, explicit Choice return, Lived Response, Formation and Ownership. The internal term `Returning` does not identify any unique screen to a user or evidence operator.

## 2. Product-language rules

Primary UI must not expose these internal terms:

- Returning;
- Admission;
- Eligibility;
- Canonical;
- Receipt;
- reconciliation;
- transaction;
- lifecycle;
- node or reference IDs.

Allowed user language:

- “你的生命世界” for the stable baseline;
- “这一步” for the committed Choice lineage;
- “回到生活” for Explicit Departure;
- “我回来了” for Explicit Return;
- “现实里真实发生的回应” for a Lived Response candidate;
- “Crystal / 晶体留痕” for a confirmed real-action trace;
- “同一生命” for continuity.

The UI must never say or imply that a click itself created growth. Formation language may appear only after the user has explicitly confirmed a real response and the existing Formation authority is pending or complete.

## 3. One read-only Presentation Resolver

Target component boundary:

```text
Returning Provenance Admission
+ Lived Response Fact
+ Crystal Eligibility
+ Formation Outcome / Receipt
+ Ownership Presentation Decision
+ Canonical Body Imprint Decision (secondary only)
+ Motion Preference
↓
XinmaiLivedResponseCheckpointPresentationResolver
↓
XinmaiLivedResponseCheckpointPresentationDecision
↓
LaunchLab / Return Surface / Ownership / Accessible Status
```

The Resolver is pure and read-only. It may map an existing authority state into product language; it must not read Storage, create a Fact, advance Eligibility, trigger Formation, select a route or write a “presented” flag.

Minimum input contract:

```ts
type XinmaiLivedResponseCheckpointPresentationInput = Readonly<{
  identityStatus: "READY" | "UNAVAILABLE" | "MISMATCH";
  admission: XinmaiChoiceReturningProvenanceAdmission | null;
  currentFact: LivedResponseFact | null;
  currentEligibility: CrystalEligibility | null;
  formationReceipt: CrystalFormationReceipt | null;
  formationOutcome:
    | "NOT_REQUESTED"
    | "REQUESTED"
    | "FORMED"
    | "SAFE_WITHHELD";
  ownershipDecision: XinmaiCrystalOwnershipPresentationDecision | null;
  bodyImprintDecision: XinmaiCanonicalBodyImprintDecision;
  motionPreference: "MOTION" | "REDUCED_MOTION";
}>;
```

`REQUESTED` is valid only while a current confirmed Fact and a current `FORMATION_PENDING` Eligibility exist or while the formal Formation command is awaiting its typed outcome. A page-local `busy` flag alone is not enough. If the current code cannot provide a typed request state without inventing a second authority, the public surface remains on the prior truthful state and uses control-level busy semantics only.

Minimum output contract:

```ts
type XinmaiLivedResponseCheckpointPresentationDecision = Readonly<{
  source: "xinmai_lived_response_checkpoint_presentation_resolver";
  state: XinmaiLivedResponseCheckpointPresentationState;
  headline: string;
  support: string;
  primaryAction: XinmaiLivedResponseCheckpointAction | null;
  secondaryActions: readonly XinmaiLivedResponseCheckpointAction[];
  announcement: XinmaiLivedResponseCheckpointAnnouncement | null;
  navigationConsequence: "NONE" | "REVEAL_RESPONSE" | "EXIT_EVIDENCE_TO_REALITY";
  authorityWriteback: "FORBIDDEN";
}>;
```

The output is Presentation, not evidence that an authority transition occurred.

## 4. Frozen six-state public model

### State 1 — `BASELINE_LIFE_WORLD`

Authority mapping:

- Identity is ready;
- no intention-bearing admission is recovered;
- no current canonical Ownership claim is being made.

Visible contract:

- Headline: `这里是你的生命世界。`
- Support: `此刻没有等待你确认的现实回应。你可以从这里开始下一段现实。`
- Primary action: existing new-Reality entry, expressed as `和它一起进入新的现实` only after its existing Life Whisper qualification is ready.
- Navigation: existing generic Reality Intent flow.
- Announcement: none on ordinary load.

This state must not say “已经回来完成”“痕迹正在形成” or show a post-Formation visual hierarchy. The stable life body may remain visible, but no Crystal or Body Imprint is claimed.

### State 2 — `LIFE_TRANSITION_REQUIRED`

This state has one typed `transitionKind`; it is not two authorities.

#### `EXPLICIT_DEPARTURE`

Mapping: admission `RESUME_COMMITTED`.

- Headline: `这一步已经由你选定。`
- Support: `现在可以把它带回生活。真实发生什么，仍由你在现实里决定。`
- Primary action: `带着这一步，回到生活`.
- Navigation: none; success reveals the dormant-return checkpoint only after existing Departure and reconciliation authorities confirm it.

#### `EXPLICIT_RETURN`

Mapping: admission `DORMANT_DEPARTURE`.

- Headline: `这一步正在等你回来确认。`
- Support: `只有你明确回来，我们才会询问现实里真实发生了什么。`
- Primary action: `我回来了`.
- Navigation: none; confirmed Return reveals the real-response form.

The UI must not present either action as equivalent to Fact confirmation or Formation.

### State 3 — `REAL_RESPONSE_READY`

Authority mapping: admission `READY_FOR_LIVED_RESPONSE`, identity current and Reality proof current.

- Headline: `现在，只确认现实里真实发生了什么。`
- Support: `尝试过、完成了原来的回应，或换了一种回应，都可以成为这次真实记录。还没尝试或不想记录，也不会受到惩罚。`
- Positive choices:
  - `我试着做了` — helper: `确认后会形成一条真实回应记录，并进入 Crystal 形成确认。`
  - `我完成了原来的回应` — same Fact-forming consequence.
  - `现实里，我用了另一种回应` — helper: `改变回应同样可以成为真实记录，不要求符合原计划。`
- Positive primary action: keep `确认这是实际发生的`.
- Primary-action consequence helper: `确认后，系统才会依据这次真实回应检查 Crystal 是否正式形成。`
- Non-Fact actions:
  - `这一次还没有尝试` — helper: `不形成事实或 Crystal；这一步仍会等你。`
  - `我不想记录这次` — helper: `不记录、不形成，也没有惩罚。`
- Navigation: none.
- Announcement on first confirmed Return only: `你已经回到这一步。现在可以确认现实里真实发生了什么。`

The positive choices and no-Fact actions must not share an undifferentiated button row. Their visual grouping and accessible descriptions must expose their different consequences before activation.

### State 4 — `FORMATION_IN_PROGRESS`

Authority mapping:

- current confirmed Fact exists;
- current Eligibility is `FORMATION_PENDING`, or an allowed typed Formation request outcome is pending;
- no Formation Receipt exists.

Visible contract:

- Headline: `真实回应已经保存。`
- Support: `这道痕迹正在被正式确认。Crystal 还没有形成，完成以前不会提前显示。`
- Primary action: none while a transaction is in flight.
- Retry action: appears only after the existing authority returns a retryable withheld result; that result maps to `SAFE_WITHHELD`, not a perpetual loading state.
- Navigation: none.
- Announcement once: `真实回应已保存，Crystal 尚未形成。`

Timers, animation completion, DOM mounting and `busy` do not create this state.

### State 5 — `OWNERSHIP_PRESENTED`

Authority mapping:

- valid Formation Receipt and Crystal exist;
- Ownership Resolver returns `FORMATION_CONFIRMED`, `OWNERSHIP_PRESENTED` or `RECOVERED_EXISTING`.

Visible contract:

- Headline: keep `你真实走出的这一步，留下了痕迹。`
- Support: keep `它不证明你更好，只记得你曾经这样选择。`
- Fresh-formation context: `这颗 Crystal 来自你刚刚确认的真实回应。`
- Recovered context: `同一颗 Crystal 仍在这里。`
- Optional touch: remains Presentation-only.
- Primary action: keep `带着这道痕迹，继续同行`.
- Exit explanation adjacent to the action: `继续后会离开这段确认画面，进入同一生命的下一段现实。`
- Navigation: `EXIT_EVIDENCE_TO_REALITY`, only through the existing Receipt-guarded handoff.
- Fresh-formation announcement: once, polite.
- Recovered ownership: no “newly formed” announcement and no replay of the first-formation climax.

A valid Receipt/Crystal can show C1 Ownership even when Canonical Body Imprint is separately withheld. It must not claim that the body imprint exists unless the Body Imprint decision is `IMPRINT_AVAILABLE`.

### State 6 — `SAFE_WITHHELD`

Mapping includes:

- identity mismatch or unavailable recovery;
- stale or non-unique provenance;
- Direct URL that claims a step without current proof;
- reconciliation, target or Reality proof unavailable/mismatched;
- confirmed Fact without a current valid Eligibility/Formation path;
- expected Receipt/Crystal missing or invalid;
- body-imprint claim requested without a canonical Imprint.

Visible contract:

- Headline: `这一步暂时还不能被完整确认。`
- Support: `已经保存的现实回应和生命资产仍被保留。不会用旧记录或页面状态代替它。`
- Primary action: reason-specific existing retry only when the typed authority says retryable.
- Non-retryable action: return to the neutral Life World without claiming completion.
- Navigation: never to the Receipt-guarded post-Ownership `/reality` handoff.
- Announcement: polite once when transitioning into the withheld state; ordinary refresh must not repeat it.

Technical reason codes remain in diagnostics and gates, not primary copy.

## 5. Internal-to-public mapping

| Existing typed input | Public state | Notes |
|---|---|---|
| no intention-bearing admission + current identity | `BASELINE_LIFE_WORLD` | not a completed-growth state |
| `RESUME_COMMITTED` | `LIFE_TRANSITION_REQUIRED / EXPLICIT_DEPARTURE` | Choice exists; Departure not yet confirmed |
| `DORMANT_DEPARTURE` | `LIFE_TRANSITION_REQUIRED / EXPLICIT_RETURN` | Departure complete; Return not accepted |
| `READY_FOR_LIVED_RESPONSE` | `REAL_RESPONSE_READY` | explicit Return accepted |
| confirmed Fact + current `FORMATION_PENDING` + no Receipt | `FORMATION_IN_PROGRESS` | success not yet established |
| valid Receipt + Ownership decision available | `OWNERSHIP_PRESENTED` | fresh versus recovered is a presentation origin, not another public state |
| `DEPARTURE_RECONCILIATION_PENDING`, `NO_FACT_TARGET_TERMINATION_PENDING`, `RESUME_REPORTED`, any admission `SAFE_WITHHELD`, invalid claimed asset | `SAFE_WITHHELD` | reason-specific truthful support/retry |
| no-Fact resolution fully terminal | `BASELINE_LIFE_WORLD` | may retain non-punitive acknowledgement during the current interaction, but it must not resemble Formation |

The model intentionally merges `RETURN_ACCEPTED_AWAITING_RESPONSE` into `REAL_RESPONSE_READY`: current production exposes the response form immediately after a confirmed Return. Adding a separate public state would be a second sequence with no independent authority event.

## 6. Consumer cutover matrix

| Consumer | Required role | Forbidden role |
|---|---|---|
| `LaunchLab` | host one checkpoint decision and separate the baseline shell from active Choice return | infer state from local booleans, route, DOM or visual readiness |
| `XinmaiLivedResponseReturnSurface` | render the decision; invoke existing Departure, Return, Fact, no-Fact and Formation authorities | create a second admission or Formation state machine |
| `XinmaiCrystalFormationOwnershipMoment` | render only valid Ownership facts and explain exit consequence | read Receipt/Storage or navigate without the guarded handoff |
| Returning Provenance Recovery Adapter | remain the unique read-only source of admission facts | produce user copy or analytics |
| Formation Orchestrator | remain the unique production Formation caller | become a presentation resolver |
| Canonical Body Imprint Recovery | provide secondary same-life imprint truth | gate valid C1 Ownership or invent an Imprint fallback |
| Same-Life Accessible Semantic Mirror | announce body/imprint facts once | duplicate the checkpoint announcement or translate missing facts into success |
| Reality Route | consume only the confirmed handoff | decide whether Formation occurred |
| Archive | show recovered assets after authority | become a checkpoint or new Growth writer |
| Gate scripts | forbid page/DOM/storage authority and assert mapping completeness | hard-code screenshots as product truth |

All production consumers must receive one resolved decision. Page, Canvas, Renderer and accessible mirror may not independently translate the admission union.

## 7. Accessibility contract

- The checkpoint has one programmatic heading and one status region.
- Baseline load is not announced as an event.
- Explicit Return confirmation announces once when `REAL_RESPONSE_READY` is first reached.
- Fact confirmation announces only the confirmed Fact boundary; it does not say Crystal exists.
- Formation completion announcement occurs only after the Receipt-backed Ownership decision exists.
- `RECOVERED_EXISTING`, refresh and Back/Forward do not replay “new Crystal formed”.
- Announcement deduplication uses stable authority references plus the transition kind in an in-memory Presentation session. It must not write a Growth fact or permanent “heard” flag.
- The Same-Life Body Imprint semantic mirror and the checkpoint status must divide responsibility: checkpoint describes the current action/formation stage; body mirror describes the lasting body state.
- Positive and no-Fact choices expose consequence text through visible copy and accessible descriptions; color is not the only distinction.
- Focus order follows headline → explanation → response choices → confirmation/no-Fact actions. Ownership focus reaches Crystal touch first and the clearly named exit action afterward.
- Motion and Reduced Motion return the same state, copy, accessible name, references and navigation consequence. Motion preference changes execution only.
- `SAFE_WITHHELD` is never `aria-hidden`; technical IDs and hidden SVG paths remain silent.

## 8. Analytics and research boundary

This PREP authorizes no analytics writer. If a later research instrument is separately authorized, only these coarse, typed Presentation observations are eligible:

Allowed candidates:

- checkpoint state presented;
- explicit Return action offered / confirmed;
- Fact-forming branch selected;
- no-Fact branch selected;
- Formation Receipt-backed Ownership shown;
- Ownership exit action used;
- recovered Ownership shown without replay.

Forbidden:

- raw Lived Response text or Life Whisper text;
- identity, Receipt, Crystal, Imprint or node IDs in marketing analytics;
- inferred vulnerability, diagnosis, personality, Bagua or destiny labels;
- withheld reason as a retargeting or pricing signal;
- timing pressure, repeated prompts or “almost completed” conversion events;
- treating a button click, animation finish or page view as Fact/Formation success;
- using the events for paywall, subscription, upsell or urgency prompts.

Research may measure whether users can name the current checkpoint and distinguish Fact-forming from no-Fact paths. It may not tell users the intended answer before observation.

## 9. Commercial and ethical boundaries

- Crystal remains a trace of a user-confirmed real action, never a reward, score, streak or random drop.
- No state celebrates moral quality, courage, compliance or completion.
- No state diagnoses, predicts destiny or assigns personality.
- The user may choose not to try or not to record without losing identity, prior assets or future access.
- Formation and Ownership surfaces contain no paywall, subscription prompt, upsell or waiting-list request.
- AI / Prompt Runtime cannot name the current checkpoint, confirm Fact, form Crystal or decide withheld recovery.
- No Bagua, Mother Code or personality classification is added.
- Phase 4 remains locked.

## 10. Estimated atomic file boundary

Expected implementation files:

```text
src/types/xinmaiLivedResponseCheckpointPresentation.ts          NEW
src/services/xinmaiLivedResponseCheckpointPresentationResolver.ts NEW
src/components/XinmaiLivedResponseReturnSurface.tsx             ADAPT
src/components/XinmaiCrystalFormationOwnershipMoment.tsx         ADAPT (exit explanation only)
src/pages/LaunchLab.tsx                                          ADAPT host/cutover
src/styles/xinmai-crystal-formation-ownership-moment.css          ADAPT only if grouping/focus needs it
src/styles/<existing returning life stylesheet>                  ADAPT baseline/checkpoint distinction
scripts/check-xinmai-lived-response-visible-checkpoint.mjs        NEW
scripts/check-xinmai-crystal-formation-production-orchestrator.mjs ADAPT regression only
package.json                                                      REGISTER gate
```

No change is allowed to:

- Growth transaction or store;
- Returning Provenance Controller/Recovery semantics;
- Fact, Eligibility or Formation authority;
- Canonical Body Imprint projector;
- database, Object Store, Index, schema or Writer;
- Renderer or same-life presenter truth;
- Reality admission and navigation authority.

If implementation requires a new persisted field, changing an authority union, reading Storage from a page or altering the Formation command, stop for RED Migration Audit. If only the expected Presentation files are needed, remain YELLOW because multiple formal checkpoints and consumers switch atomically.

## 11. Rollback unit

Prepare a forward, local-only policy Counter whose parent is the final candidate:

```text
LIVED_RESPONSE_VISIBLE_CHECKPOINT_PRESENTATION
ENABLED → SAFE_WITHHELD
```

Counter behavior:

- withhold the new checkpoint headings, consequence helpers and announcements;
- keep the neutral same-life baseline surface usable;
- preserve and recover Choice, Departure, Return, Fact, Eligibility, Receipt, Crystal and Body Imprint;
- keep C1 Ownership assets readable, but do not invent a second route to them;
- never restore page-local inference, blind navigation, Legacy authority or duplicate announcements;
- never delete or rewrite user assets.

The Counter is not a normal revert to the ambiguous shell. It is a safe Presentation pause.

## 12. Browser evidence matrix for the application blade

| Case | Required visible proof | Required typed proof |
|---|---|---|
| no active Choice | baseline explicitly says no response is awaiting confirmation | admission absent; no Fact/Receipt/Imprint claim |
| Choice committed | departure checkpoint and its unique action | `RESUME_COMMITTED` |
| Departure reconciled | explicit Return checkpoint | `DORMANT_DEPARTURE` |
| Return confirmed | real-response form with consequence grouping | `READY_FOR_LIVED_RESPONSE` |
| ATTEMPTED | positive branch + confirm | Fact 1, Eligibility 1, Receipt only after IDB complete |
| CHANGED_RESPONSE | same consequence without “failed original plan” language | Fact 1, Eligibility 1, Receipt only after IDB complete |
| NOT_ATTEMPTED | explicit no-formation, non-punitive acknowledgement | Fact/Eligibility/Receipt 0; target terminal |
| DECLINED | explicit no-record/no-formation acknowledgement | Fact/Eligibility/Receipt 0; target terminal |
| Formation pending | no Crystal success and no navigation | confirmed Fact + allowed typed pending state + Receipt 0 |
| fresh Formation | Ownership article and exact exit action | Receipt/Crystal 1; `CURRENT_TRANSACTION` |
| refresh / Back / Forward | recovered Ownership without replay | same references; `CANONICAL_RECOVERY` |
| Direct URL / stale / mismatch | withheld copy, no claimed step | typed mismatch or unavailable reason; no success |
| Body Imprint unavailable | C1 fact may remain, no same-life imprint claim | valid Receipt/Crystal, Imprint withheld separately |
| Motion / Reduced Motion | identical state/copy/actions | same references and consequence |
| 320×568 through 430×932 / 200% | checkpoint and relevant primary action reachable | no state difference |
| keyboard / VoiceOver / TalkBack release gate | order and announcement parity | no duplicate “newly formed” replay |
| Counter | neutral baseline and asset recovery remain | checkpoint policy withheld; authorities unchanged |

Evidence instructions must never say only “stop at Returning”. The exact fresh-Formation stop condition is:

> Stop when the Crystal Ownership surface is stable and the bottom action reads “带着这道痕迹，继续同行”. Do not press that action.

## 13. Next-blade decision

```text
XINMAI-LIVED-RESPONSE-VISIBLE-CHECKPOINT-
AND-ADMISSION-SEMANTIC-ATOMIC-APPLICATION-P0

Traffic light: YELLOW
Blade: Product Semantic Major Blade / Atomic Presentation Consumer Cutover
Decision: NOW — APPLICATION READY, subject to separate authorization
```

This is not a GREEN copy correction. It introduces a typed read-only resolver and atomically changes how baseline, Departure, Return, Fact confirmation, Formation, Ownership and accessibility consumers explain existing authority. A partial landing would preserve the current ambiguity or create two public interpretations of the same state.

It is not RED because Storage, Schema, Growth Authority, Formation Authority and navigation authority remain unchanged.

Stage status:

```text
PREP: CLOSED / PASS
C2: OPEN / Push HOLD
C2 resume condition: checkpoint application closes, then one canonical-positive Ownership capture follows the unambiguous stop condition
C3: DEFER
Phase 3: ACTIVE / NOT PASSED
Phase 4: LOCKED
```
