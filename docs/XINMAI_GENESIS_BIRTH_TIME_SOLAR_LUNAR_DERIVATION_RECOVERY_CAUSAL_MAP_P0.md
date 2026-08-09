# XINMAI Genesis Birth Time / Solar-Lunar Derivation / Recovery Causal MAP P0

```text
Traffic Light: YELLOW
Blade: Read-only Causal MAP
Decision: RED MIGRATION AUDIT REQUIRED

Evidence Baseline / Remote:
61b3b18b3dcb0315ae77aa29a84be8f2e9ae51da

Native Release Evidence Session:
PAUSED

Current Mac Origin and the newly confirmed hard-coded default source:
INVALID FOR RELEASE EVIDENCE / PRESERVED / NO CLEANUP

C2 / V5 / Android Evidence:
HOLD

C3 / Haptic / Audio / Prompt-AI / Research / Monetization:
PAUSED / DEFER

Phase 4:
LOCKED
```

## 1. Executive decision

Two independent conditions coexist. They must not be collapsed into one explanation.

1. The current Mac Origin did not contain a recoverable persisted life-source session and recognized identity. `LaunchLab` therefore correctly withheld returning-life recovery and exposed the new-user Genesis input surface. This is an **evidence-environment origin mismatch**, not proof that persisted production recovery regressed.
2. Once that new-user surface appeared, the current production contract presented a direct twelve-branch selector initialized to the hard-coded draft `1995-06-02 / 酉时`. The admission controller accepted that branch as user input and embedded it in the canonical source reference without deriving it from a clock time. It also did not expose the Gregorian-to-lunar calculation. This is a **V2 input-authority contract regression and production-default leak**.

The earliest runtime breakpoint is the V2 birth-coordinate input cutover introduced by `ff2b511365f046574067abaae19c8a14a7e48c54` (recomposed from rejected V2 candidate `0ccdcfbb…`). The cutover preserved a single native input owner and safe recovery, but lost the previously implemented deterministic semantics:

```text
User-entered Gregorian date + local birth time
  -> deterministic Gregorian validation
  -> deterministic lunar derivation
  -> deterministic local-time-to-hour-branch derivation
  -> explicit user confirmation of the derived coordinate
  -> existing source engine / persistence / recovery
```

The current production path instead does:

```text
Hard-coded Gregorian date + directly user-selected hourBranch
  -> date/hourBranch validation
  -> direct sourceReferenceId construction
  -> existing source engine / persistence / recovery
```

This cannot be closed as an evidence-origin correction alone. A RED Migration Audit is required before Runtime changes because the current V2 types and registered Gates intentionally freeze the wrong input shape, while the existing correct normalizer is explicitly marked reference-only and `noProductIntegration`.

## 2. What happened in this evidence session

| Sequence | Typed/code fact | Classification |
|---|---|---|
| Mac browser opened the prepared Production Origin | The Origin did not recover returning-life assets; the visible production surface asked to enter birth information | Evidence Origin lacked the canonical persisted assets needed by the returning-life recovery path |
| `LaunchLab` initialized returning recovery | `recoverXinmaiGenesisBirthSource({ intent: "RESTORE_RETURNING_LIFE", recognizedSourceReferenceId })` returned non-`READY`; `LaunchLab` kept `returningLifeContext = null` | Correct safe withholding; recovery did not invent a default or re-run an engine |
| New-user input session was constructed | `createXinmaiGenesisBirthCoordinateInputSession()` unconditionally created a session draft | Normal new-user presentation after recovery was unavailable |
| The draft appeared as `1995-06-02 / 酉时` | `XINMAI_GENESIS_BIRTH_COORDINATE_DEFAULT_DRAFT` contains those exact values | Production default leak; not a cache inference and not Fixture data |
| User confirmed the visible coordinate | Admission used `draft.hourBranch` directly for `sourceReferenceId`, `birth.hourBranch`, and `periodIndex` | Runtime semantic regression: the system did not derive the branch from the user's actual birth time |
| Release evidence was about to continue | The newly formed source did not conform to the correct birth-time contract | Origin and resulting assets are invalid for Release Evidence; preserve but do not consume them |

### Why Genesis ran again

Current `LaunchLab` first attempts typed recovery. It renders the new input surface when any of the following prevents `returningVisualReady`: no persisted source representations, no recognized identity, recovery mismatch, or missing visual continuity. In this session, the browser showed the new-user input path and had no recoverable canonical returning state. The evidence supports **isolated/wrong Origin or missing Origin assets** as the cause of the rerun.

There is no evidence that the recovery controller selected a default. Its boundary expressly freezes:

- `noSourceEngineInvocation`;
- `noDefaultSource`;
- `noSilentPrecedence`;
- `noBackfill`;
- `noStorageWrite`;
- conflicting primary and mirror references become `SAFE_WITHHELD`.

The current-data Origin must remain intact for audit, but it cannot be reused as a positive Release Evidence Origin.

## 3. Existing correct semantic chain

The repository still contains a deterministic normalization implementation:

| Layer | Producer | Input | Output | Present production use |
|---|---|---|---|---|
| Gregorian input contract | `ProductionIdentitySourceInputNormalizerInput` | `gregorianBirthDate`, `localBirthTime`, optional location context | typed normalization request | Gates/reference implementations only; not bound to current Genesis UI |
| Gregorian validation and lunar derivation | `resolveBirthCalendarFromGregorianDate` | Gregorian year/month/day | canonical Gregorian string + `ChineseLunarBirthDate` | Used by calendar, star-beast and trigram services; bypassed by current V2 admission input path |
| Clock-time to twelve-branch derivation | private `resolveHourBranch` in `productionIdentitySourceInputNormalizer.ts` | validated `HH:mm` | typed `HourBranch` and ordinal | Correct deterministic implementation exists, but boundary is reference-only |
| Normalized source reference | `normalizeProductionIdentitySourceInput` | date, time, optional location | Gregorian + lunar + derived branch + ordinal | No current `LaunchLab`/birth-coordinate production caller |
| Existing engine bridge | `productionIdentitySourceEngineConsumerContract` and related adapters | normalized reference | engine-ready mapping | Contract/gate coverage exists; current native birth form bypasses it |
| Life source session | `createLaunchLifeSourceSession` | canonical source input/results | stable life-source session | Production authority remains active after current admission |
| Persistence and recovery | `persistLaunchLifeSourceSession`, origin mirror, `recoverXinmaiGenesisBirthSource` | typed sessions/references | `READY`, `SOURCE_NOT_READY`, or `SAFE_WITHHELD` | Production single recovery owner; must remain unchanged in meaning |

The normalizer maps clock time deterministically: `23:xx` and `00:xx` belong to 子时; other hours map by the fixed two-hour branch sequence. It calls the Chinese-calendar resolver to derive the lunar date from the Gregorian date. The user does not supply a lunar date.

However, this implementation's boundary currently says:

```text
implementationOnly = true
referenceOnly = true
noUserInputBinding = true
noProductIntegration = true
noUiIntegration = true
noStorageWrite = true
```

Therefore, simply importing it into the UI would change a frozen authority boundary. That productization decision must be explicit and atomic; this MAP does not authorize it.

## 4. Current production producer/consumer/recovery matrix

| Step | Current producer | Current consumer | Exact typed behavior | Finding |
|---|---|---|---|---|
| New input session | `createXinmaiGenesisBirthCoordinateInputSession` | `LaunchLab` | Creates a session-only draft initialized to the hard-coded date and `酉时` | Default leak |
| Native input | `XinmaiGenesisBirthCoordinateControls` | session resolver | Three number inputs plus one direct `hourBranch` `<select>` | User is asked for a derived concept, not actual birth time |
| Validation | `validateXinmaiGenesisBirthCoordinate` | admission controller | Validates date existence and membership of `hourBranch` | No `HH:mm` validation; no derivation |
| Display | birth-coordinate controls | user/a11y tree | Displays Gregorian date and selected branch | Lunar result absent; branch appears user-authored |
| Admission | `confirmXinmaiGenesisBirthCoordinate` | source engine/session | Builds `launch:<date>:<hourBranch>` and passes `hourBranch` directly | Semantic authority break occurs here |
| Source engines | launch-origin/mother adapters | session, visual source, handoff | Consume already supplied branch | Downstream deterministic consumers cannot repair a wrong upstream branch |
| Persistence | session and mother-context writers | recovery adapter | Persists the supplied source facts | Persistence is not the source of `酉时`; it faithfully stores the bad input contract |
| Recovery | `recoverXinmaiGenesisBirthSource` | LaunchLab/Genesis route | Compares primary and origin representations, fences conflicts, never calculates a source | Recovery safety is correct; it cannot derive or correct birth facts |
| Returning presentation | `LaunchLab` | user | Uses recovery when assets exist; otherwise shows the input surface | A missing Origin and a wrong input contract become visible together |

## 5. Exact source of `酉时`

The exact source is code, not inferred browser state:

- `src/services/xinmaiGenesisBirthCoordinatePresentationResolver.ts` defines `XINMAI_GENESIS_BIRTH_COORDINATE_DEFAULT_DRAFT` as year `1995`, month `6`, day `2`, `hourBranch: "酉时"`.
- `src/components/XinmaiGenesisBirthCoordinateControls.tsx` directly binds the selector to `draft.hourBranch` and displays it in the summary.
- `src/services/xinmaiGenesisBirthCoordinateAdmissionController.ts` constructs the stable source reference and engine input directly from `draft.hourBranch`.
- `src/types/xinmaiGenesisBirthCoordinatePresentation.ts` makes `hourBranch` part of the user draft and exposes no clock-time field or derived lunar reference.

Excluded causes:

| Candidate cause | Verdict | Evidence |
|---|---|---|
| Fixture or Acceptance | NO | The value is present in production source and native controls; no fixture is required to produce it |
| Browser cache | NO as first cause | A cache could preserve a previously accepted source, but this surface constructed the exact production default before confirmation |
| Old persisted schema | NO as first cause | Recovery had no usable persisted source; admission formed a new source from the current draft |
| Recovery consumer drift | SECONDARY / NOT the `酉时` source | Recovery correctly withheld when assets were absent; it did not choose the branch |
| Default value leakage | YES | Exact hard-coded production draft |
| Authority contract regression | YES | A derived hour branch became user input and canonical admission input; lunar derivation disappeared from the visible contract |

## 6. Gate findings

The wrong current contract is not merely untested; it is explicitly protected:

- `check-xinmai-genesis-birth-coordinate-single-input-owner` requires exactly three `<input>` elements and one `<select>`, thereby freezing direct branch selection.
- `check-xinmai-genesis-birth-coordinate-admission-authority-boundary` proves that the native controller is the sole writer and invokes existing source/persistence/recovery/handoff services, but it does not require clock-time or lunar derivation.
- `check-xinmai-genesis-birth-source-refresh-recovery` correctly protects `NOT_FOUND`, primary/mirror convergence, conflict withholding, and active-reference fencing.
- `check:production-identity-source-input-normalizer-*` proves the correct date/time/lunar/branch normalizer in isolation, but its own type boundary forbids product/UI integration.

The V2 MAP and Audit documents also froze four provisional values including direct `hourBranch` and allowed the `1995 / 06 / 02 / 酉时` editable default. Runtime faithfully implemented that prior audit. The product-control correction in this MAP supersedes that semantic decision; it does not invalidate V2's single-owner, native-control, Scene Host, or safe-recovery achievements.

## 7. Historical comparison

Before the V2 cutover, `LaunchLab` contained page-local birth coordinates with a numeric clock hour. It derived:

- the two-hour branch using `hourToPeriodLabel(hour)`;
- the lunar display using `resolveBirthCalendarFromGregorianDate` and `formatLunarBirthDate`;
- the engine `hourBranch` and `periodIndex` from the same clock hour.

That old page-local implementation also contained Canvas input, animation/timer coupling, audio/haptic behavior, and page-local authority concerns. It must not be restored wholesale. The valid semantic behavior must be moved into the current native single-owner architecture through a new audited typed normalization boundary.

## 8. Frozen correct product contract

The next migration must preserve this one-way relationship:

```text
User-entered Gregorian birth date
+ User-entered local clock time or clearly bounded clock interval
  -> one typed normalization owner
     -> validate Gregorian date/time
     -> derive lunar date deterministically
     -> derive twelve-branch period deterministically
     -> present both derived results read-only
  -> explicit user confirmation
  -> existing source engine/session/persistence/recovery
```

Frozen constraints:

- The user never enters the lunar date.
- The user never chooses a twelve-branch label as a second birth-time authority.
- A derived lunar date and branch remain read-only presentation until explicit confirmation.
- Missing or invalid time must become typed `UNAVAILABLE`/`BLOCKED`, never a default branch.
- No pre-filled sample date/time may be accepted as a real source without explicit user replacement and confirmation.
- Source reference identity must bind to the normalized proof, not to an unverified page draft.
- No backfill or silent rewrite of existing Identity/Source assets.
- Existing persisted facts that conflict with a newly normalized proof must be `SAFE_WITHHELD`; pages must not choose a winner.
- Recovery remains the only persisted-source reader; the input normalizer does not become a Storage owner.
- Lunar calculation cannot become a second user-authored or persisted authority.

## 9. Legal re-evidence protocol

The current Mac Origin is excluded from all Desktop, C2, V5, and Android Release evidence. It remains untouched for audit.

Release evidence may resume only after the corrective Runtime is delivered and independently closed:

1. Start a hashed Production bundle from the closed corrective Remote.
2. Use either:
   - an existing legal Origin whose primary and mirror representations recover the same canonical source, identity, Growth, Formation, Crystal, and Body Imprint; or
   - a fresh clean Origin in which the user enters the real Gregorian date and real local time once through the corrected native form.
3. Before confirmation, capture typed evidence showing:
   - the entered Gregorian date/time;
   - the deterministically derived branch (the branch expected from the user's real time, reported here as 子时 without persisting the raw time);
   - the deterministically derived lunar date;
   - lunar and branch fields are read-only derived values, not independent controls.
4. After explicit confirmation, prove the stable source reference, recovery proof, and Genesis handoff.
5. Cold refresh must recover the same source; no default draft or recomputation may replace it.
6. Only then continue Ownership, VoiceOver, Reduced Motion, 200%, Android, and remaining V5 evidence.

Prohibited evidence shortcuts remain: Storage writes, Fixture/Acceptance, query parameters, copying canonical records across Origins, clearing the invalid Origin and calling it clean production evidence, or accepting a pre-filled draft as the user's source.

## 10. Next blade and atomic boundary

```text
XINMAI-GENESIS-BIRTH-TIME-SOLAR-LUNAR-DERIVATION-
SINGLE-OWNER-ATOMIC-MIGRATION-AUDIT-P0

Traffic Light: RED
Blade: Migration Audit / Input Normalization Authority Cutover
Decision: NOW — AUDIT ONLY
```

The Audit must decide the single safe productization route:

1. explicitly promote the existing reference-only normalizer into an authorized typed production boundary; or
2. extract an equivalent pure primitive while keeping the existing reference artifact isolated.

It must freeze, in one atomic rollback unit:

- type change from direct `hourBranch` draft to Gregorian date + local clock time/interval;
- deterministic Gregorian-to-lunar and clock-time-to-branch proof;
- native controls and derived read-only display;
- admission controller consumption of the normalized proof;
- source-reference compatibility and no-backfill policy;
- LaunchLab/Genesis/returning/recovery consumers;
- all V2 Gates that currently require direct branch selection;
- a direct-child SAFE_WITHHELD Counter that pauses new birth-source admission without deleting or rewriting existing assets.

If the audit requires a new DB, Store, Index, second writer, lunar user input, or a silent migration of existing identity assets, it must stop with re-audit/blocked. The correct target should preserve V1 Scene Host, V2 native single input owner, V2 recovery owner, C1/C2 Authority, Growth, Formation, Crystal, and Body Imprint unchanged.

## 11. Closure status

| Area | Status |
|---|---|
| Cause of Genesis rerun | CLOSED: current evidence Origin lacked recoverable canonical assets |
| Cause of visible `酉时` | CLOSED: production hard-coded draft plus direct branch selector/admission |
| Fixture/cache/old-schema hypothesis | REJECTED as first cause |
| Existing deterministic Gregorian→lunar and time→branch code | FOUND, but reference-only and not a current production UI consumer |
| Current V2 input contract | REGRESSED against corrected product semantics |
| Recovery safety | PRESERVED; not the source of the wrong branch |
| Current Origin | INVALID FOR RELEASE EVIDENCE / PRESERVED |
| Native Release Evidence Session | HOLD |
| Corrective Runtime | NOT AUTHORIZED by this MAP |
| Next step | RED Migration Audit |

## 12. Delivery discipline

- This commit adds exactly this one document.
- Runtime, Gate, CSS, Renderer, Authority, Storage, Schema, assets, and current browser data changed: `0`.
- TypeScript and Production Build: `N/A` for doc-only causal MAP.
- `git diff --check`: required before local commit.
- Push: `HOLD`.
- Main worktree and its existing 34 user changes remain untouched.
