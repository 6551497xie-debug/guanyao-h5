# XINMAI Crystal Formation / Returning Production Reachability Causal MAP P0

Date: 2026-08-04

Decision: `MAP CLOSED / PRODUCT REACHABILITY BREAK IDENTIFIED`

Traffic light: `YELLOW`

Runtime / Gate / Storage / Schema / Authority / Renderer / CSS / copy: `DIFF 0`

Push: `HOLD`

## 1. Frozen objects and evidence boundary

- Remote-tracking baseline: `2881393d78dd9c38014f238b191566878dda5f45`.
- Evidence-only C2 candidate: `a18c92bea2da35a862a14db870734b381cd41ebc`.
- Candidate parent: `2881393d78dd9c38014f238b191566878dda5f45`.
- Candidate is unpushed and changes one Formation-chain host line only: it adds `sameLifeSurfaceConsumer="RETURNING"` to `RealityLifeUniverseCanvas`; it does not change Choice, Departure, Return, Fact, Eligibility, Formation or Ownership controllers.
- Live network remote lookup was unavailable inside the time box; the local remote-tracking ref and candidate parent both resolve to `2881393…`. This limitation does not affect the source-level reachability finding.
- Figma audit board was supplied as an evidence index. No Figma edit or browser rerun was performed. Conclusions below use the supplied accepted screenshots/reports and current typed source contracts.

Accepted visual evidence:

1. `c2-physical-android-a18c92-20260804/02-current-visible-surface-display3.png` — official Android Chrome at `/launch-lab`; generic same-life home/whisper surface.
2. `c2-physical-returning-positive-a18c92-20260804/C2_PHYSICAL_ANDROID_CANONICAL_POSITIVE_RETURNING_EVIDENCE_P0.md` — Chrome product target was `/reality`; typed state was `NO_CANONICAL_IMPRINT`, with zero Formation/Crystal/Imprint references. Its first screenshot was rejected because Chrome was not foregrounded and is not used here.
3. `c2-physical-returning-final-a18c92-20260804/01-returning-current.png` and its report — accepted `/launch-lab` base surface; `NO_CANONICAL_IMPRINT`, zero Formation/Crystal/Imprint references and no Ownership card or bottom Ownership continue action.

Screenshots establish what the user saw. Typed source and public outcomes establish product authority. Neither timestamps nor the user's recollection are treated as authority.

## 2. Causal finding

The earliest common observable break is **before Lived Response confirmation**, not inside Formation or C2:

```text
Choice lineage should be recovered as READY_FOR_LIVED_RESPONSE
↓
XinmaiLivedResponseReturnSurface should mount on /launch-lab
↓
user should choose ATTEMPTED / COMPLETED_AS_INTENDED / CHANGED_RESPONSE
↓
user should click “确认这是实际发生的”

Observed instead in the accepted final capture:
/launch-lab generic same-life home + whisper controls
↓
no active Returning admission surface
↓
no user-confirmed Fact
↓
Eligibility 0 / Formation Receipt 0 / Crystal 0 / Imprint 0
```

The exact missing public checkpoint is `XinmaiChoiceReturningProvenanceAdmission.state === "READY_FOR_LIVED_RESPONSE"` followed by the explicit Fact-confirmation control. None of the three evidence runs captured that checkpoint or any later canonical-positive checkpoint.

This does **not** prove that Recovery is corrupt. It proves that the evidence runs did not preserve an observable admission into the Fact-forming surface. The existing artifacts do not contain a read-only admission reason for those exact runs, so the underlying absence is `NOT DETERMINABLE` without a future state-specific observation.

## 3. Formal production chain

| Step | Formal producer | Formal consumer / typed input | Typed output / persistence | Visible route and control | Failure / withheld boundary |
|---|---|---|---|---|---|
| Choice committed | `GravityPage.handleRevisionActionConfirm()` → `commitChoiceActionIntention()` | validated Gravity observation and selected Action Route | `ChoiceActionIntention state=COMMITTED`, Growth IDB transaction | `/gravity`; confirmed action presentation | non-ready presentation or transaction failure remains uncommitted with retry feedback |
| Explicit Departure | `confirmXinmaiChoiceExplicitDeparture()` from Gravity or Returning surface | committed Choice + current identity + revision | Departure Receipt; Reality reconciliation later makes `DORMANT_DEPARTURE` | `/gravity` or `/launch-lab`; “带着这一步，回到生活” | reconciliation pending is explicit; no Return CTA before dormant state |
| Explicit Return | `confirmXinmaiChoiceExplicitReturn()` | `DORMANT_DEPARTURE` admission + current reconciliation proof | one `READY_FOR_LIVED_RESPONSE` Return Receipt and canonical target cycle | `/launch-lab`; “我回来了” | any unconfirmed/mismatched result stays withheld; generic opening is not Return |
| Lived Response selection | `XinmaiLivedResponseReturnSurface` | admission `READY_FOR_LIVED_RESPONSE` | page-local candidate only; no authority yet | `/launch-lab`; “现实里，实际发生了什么？” plus three positive radios and two no-Fact actions | surface does not mount when no intention-bearing admission is recovered |
| Fact-positive confirmation | `confirmLivedResponseFact()` | explicit candidate + Choice/Return/identity/lineage revisions | confirmed `LivedResponseFact`; Return Receipt consumed in Growth transaction | `/launch-lab`; “确认这是实际发生的” | failed transaction shows “这次事实还没有被保存” and stops |
| No-Fact resolution | `resolveXinmaiChoiceReturnWithoutFact()` | `NOT_ATTEMPTED` or `USER_REJECTED_RECORD` | Return resolved without Fact; target termination; Fact/Eligibility/Formation remain zero | `/launch-lab`; “这一次还没有尝试” / “我不想记录这次” | termination can remain retryable; it must not enter `/reality` |
| Eligibility | `resolveCrystalEligibilityForFact()` | current confirmed Fact | `ELIGIBLE` for `ATTEMPTED`, `COMPLETED_AS_INTENDED`, `CHANGED_RESPONSE`; otherwise withheld | no separate screen; immediately follows positive Fact commit | identity, revision, prior Formation or persistence mismatch rejects/withholds |
| Production Formation | `orchestrateProductionCrystalFormation()` | current Fact + current Eligibility + identity | Formation Receipt + Canonical Crystal through `formCrystalFromEligibility()`; success authority `IDB_TRANSACTION_COMPLETE` | same `/launch-lab` return surface; no second “form” button on the initial path | missing/currentness/provenance/recovery/policy failures produce typed `SAFE_WITHHELD` |
| Formation recovery | `recoverProductionCrystalFormation()` | `TERMINAL_BY_GROWTH` admission with Fact + eligible/pending Eligibility and no Receipt | same Receipt or one recovered Formation | same `/launch-lab`; pending/withheld message and “重试形成结晶” when needed | recovery never creates Eligibility and never fabricates success |
| Ownership | `resolveXinmaiCrystalOwnershipPresentation()` → `XinmaiCrystalFormationOwnershipMoment` | confirmed Receipt + action summary + origin + motion preference | presentation states `FORMATION_CONFIRMED`, `OWNERSHIP_PRESENTED` or `RECOVERED_EXISTING`; no authority writeback | same `/launch-lab`; Crystal, “你真实走出的这一步，留下了痕迹。” | before Receipt: pending or withheld; no Crystal success is shown |
| Ownership touch | local `onOwnershipPresented` callback | typed Ownership facts | presentation-only `PRESENTED`; Growth unchanged | Crystal touch target | optional; not required for continuation |
| Continue / navigation | `handoffConfirmedCrystal()` → `LaunchLab.onRealityHandoff` | confirmed Formation Receipt + Return Receipt | no new Growth fact; route state uses canonical target intent/cycle | Ownership button “带着这道痕迹，继续同行” | if Receipt or Return Receipt is absent, handler returns and navigation is forbidden |
| Returning Body Imprint | canonical recovery + C2 same-life host | Formation Receipt + Crystal + identity/body refs → Canonical Body Imprint decision | `IMPRINT_AVAILABLE` or typed withheld/no-imprint; presentation only | `/launch-lab`, `/reality`, `/archive` depending consumer | no canonical decision cannot be promoted by canvas, DOM or screenshot |

## 4. Branch semantics

| User-visible branch | Fact | Eligibility | Formation / Crystal | Reality handoff |
|---|---:|---:|---:|---:|
| “我试着做了” (`ATTEMPTED`) + “确认这是实际发生的” | 1 | 1 | 1 after IDB completion | only after Ownership continue |
| “我完成了原来的回应” (`COMPLETED_AS_INTENDED`) + confirm | 1 | 1 | 1 | only after Ownership continue |
| “现实里，我用了另一种回应” (`CHANGED_RESPONSE`) + confirm | 1 | 1 | 1 | only after Ownership continue |
| “这一次还没有尝试” (`NOT_ATTEMPTED`) | 0 | 0 | 0 | 0 |
| “我不想记录这次” (`USER_REJECTED_RECORD`) | 0 | 0 | 0 | 0 |

The positive labels correctly distinguish attempted, completed-as-intended and changed-response **once the return form is visible**. The two no-Fact paths are also separate controls. The semantic weakness is that the screen does not tell the user that the three radio choices plus “确认这是实际发生的” are the only branch that can proceed to Formation, while the surrounding home copy repeatedly says “继续同行” without identifying which checkpoint is active.

## 5. Production caller inventory

`formCrystalFromEligibility()` has exactly these direct source callers:

- production: `xinmaiCrystalFormationProductionOrchestrator.ts` — one low-level production caller;
- isolated development/acceptance: `XinmaiLivedGrowthAcceptancePage.tsx` — not a production consumer.

Production surfaces call the orchestrator, not the low-level consumer:

- post-Fact commit: `orchestrateProductionCrystalFormation({ trigger: "POST_FACT_COMMIT" })`;
- mount-time canonical recovery for eligible/pending lineage: `recoverProductionCrystalFormation()`;
- explicit retry after a typed Formation failure: `recoverProductionCrystalFormation()`.

A valid current Eligibility can therefore reach the unique production consumer in both baseline `2881393…` and evidence candidate `a18c92b…`. Targeted registered checks passed:

```text
choice-returning-provenance-authority  PASS
lived-response-authority              PASS
crystal-eligibility-authority         PASS
crystal-formation-production-orchestrator PASS
crystal-ownership-presentation        PASS
```

No source evidence establishes a missing Formation consumer or an unreachable valid Eligibility. The observed zero assets are upstream of that consumer.

## 6. Three-misjudgment matrix

| Evidence run | What the user believed | Accepted public evidence | Earliest evidenced break | Health |
|---|---|---|---|---|
| Physical Android initial run | flow completed / returned home | `/launch-lab` generic same-life surface and whisper/relationship controls; no accepted canonical-positive capture | no observable `READY_FOR_LIVED_RESPONSE` or Ownership checkpoint | `OPEN` |
| “canonical positive” run | stopped at Returning | Chrome target `/reality`; `NO_CANONICAL_IMPRINT`, `NOT_STARTED`, `NOT_READY`; Receipt/Crystal/Imprint counts 0 | no Fact/Eligibility/Formation authority visible before route observation | `OPEN` |
| Final stopped run | stopped at stable Ownership/Returning | accepted `/launch-lab` base surface; `NO_CANONICAL_IMPRINT`; no Receipt, Crystal, Imprint or “带着这道痕迹，继续同行” | Lived Response/Formation checkpoint not reached or not recovered | `OPEN` |

The repetition is a product-language and checkpoint problem, not evidence that the user repeatedly made the same mistake.

## 7. Classification

### A. Product semantics / copy gap — `ESTABLISHED`

- `/launch-lab` says “你的生命仍在这里，等你继续同行” in both no-Imprint home state and the wider returning life world.
- The generic whisper/new-Reality controls occupy the same visual shell used to host the formal return surface.
- “继续同行” appears in multiple unrelated controls; the canonical Ownership continue control has a different longer label but was never visible in the captures.
- The Fact-forming consequence of the positive branch is not previewed.

### B. Consumer reachability gap — `NOT ESTABLISHED`

- The production source has one orchestrator and one low-level production consumer.
- A valid Eligibility reaches that orchestrator synchronously after Fact commit and through canonical recovery.
- No direct caller bypass or missing consumer was found.

### C. State / recovery gap — `OBSERVED AS MISSING CHECKPOINT; ROOT REASON OPEN`

- The final `/launch-lab` capture mounted generic whisper controls, which means `returningLivedResponseActive` was false and no intention-bearing admission was exposed.
- The supplied evidence does not preserve the exact admission union/reason for the three runs. It cannot distinguish “formal Departure/Return never committed” from “committed lineage not recovered” without another state-specific read.
- This is an observability/recovery diagnosis gap, not permission to change Storage or infer from time.

### D. Test-instruction mismatch — `ESTABLISHED`

- `Returning` is an internal consumer/host term. It is not the name of a route or a unique user-visible screen.
- The UI says “回到我的生命世界”, “我回来了”, “现实回应回访” and “你的生命仍在这里”; `/launch-lab` hosts both generic home and formal return/Ownership states.
- Therefore “停在 Returning” did not identify the required state. The unambiguous stop condition is: **the Crystal Ownership article is visible and its bottom action reads “带着这道痕迹，继续同行”; do not press it.**

## 8. Closed versus open

Functionally closed:

- Fact authority and branch distinction;
- Eligibility determination;
- unique Production Formation consumer;
- `IDB_TRANSACTION_COMPLETE` success boundary;
- Ownership handoff guarded by Receipt;
- no-Fact paths produce no Fact/Eligibility/Crystal and no `/reality` handoff;
- candidate C2 patch does not alter this causal chain.

Experience-open:

- the home shell does not expose whether the user is in generic life return, explicit Choice return, Lived Response, Formation pending, Ownership or post-Ownership handoff;
- `Returning` evidence language does not map to a unique visible state;
- the positive Fact branch does not explain that confirmation is the Formation entry;
- the reason an expected Choice lineage was absent from the three captured return surfaces remains unobserved.

## 9. Next blade and C2 decision

Next blade:

```text
XINMAI-CRYSTAL-FORMATION-RETURNING-
VISIBLE-CHECKPOINT-AND-ADMISSION-
SEMANTIC-PREP-P0

Traffic light: YELLOW
Blade: Product Semantic / Presentation Reachability Prep
Decision: NOW — PREP ONLY
```

Exact scope to freeze before any implementation:

1. map the existing admission union to one visible, user-language checkpoint per state;
2. give generic `/launch-lab` home, explicit “我回来了”, Lived Response, Formation pending, Ownership and recovered Ownership distinguishable headings/actions without creating new Authority;
3. make the positive branch consequence explicit before confirmation, while keeping no-Fact paths non-punitive;
4. define a single evidence stop condition using visible copy plus existing typed state;
5. add no Storage, Writer, state machine, route or Formation consumer;
6. if existing typed facts are sufficient, the later implementation can be a GREEN atomic Presentation refinement limited to `LaunchLab`, `XinmaiLivedResponseReturnSurface` and evidence instructions; if the admission reason is not available to Presentation, stop for a YELLOW typed Presentation MAP rather than reading Storage from the page.

C2 status:

```text
C2 Visual Candidate: structurally unchanged / evidence-only
C2 Push: HOLD
C2 Push Gate: cannot resume until a canonical-positive Ownership checkpoint is reached and preserved under unambiguous instructions
C3: DEFER
Phase 3: ACTIVE / NOT PASSED
Phase 4: LOCKED
```

C2 should not be rejected: no C2 visual/runtime defect was established. It also cannot be declared ready, because the required canonical-positive product state has not been observed.
