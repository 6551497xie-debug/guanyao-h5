# XINMAI Genesis Birth Time / Solar-Lunar Derivation Single-Owner Atomic Migration Audit P0

```text
Traffic Light: RED
Blade: Migration Audit / Input-Derivation Authority Cutover
Decision: NOW — CORRECTIVE ATOMIC MIGRATION APPLICATION READY

Audit Baseline / Remote HEAD:
8fb1dbf9679b7cf188097faceaaf631f486398a2

Runtime / Storage / Schema / Gate Changes:
0

Current invalid Mac Origin:
PRESERVED / NO CLEANUP / NO BACKFILL / INVALID FOR RELEASE EVIDENCE

C2 / V5 / Android Evidence:
HOLD

C3 / Haptic / Audio / Prompt-AI / Research / Monetization:
PAUSED / DEFER

Phase 4:
LOCKED
```

## 1. Audit verdict

Product Control Tower has frozen all identity-affecting 1.0 rules. The corrective migration is now technically and semantically bounded:

1. Authority input is the local civil Gregorian date plus the local wall-clock time recorded at the birthplace. The UI must say: `按出生证明/家人记忆中的当地时间填写`. Version 1.0 does not require birthplace, calculate true solar time, convert time zones or resolve DST.
2. `23:00–00:59` is one 子时 range. The lunar date is derived only from the Gregorian civil date entered by the user. Version 1.0 does not advance the calculation date for late 子时 and never lets the branch rule change the date.
3. Supported precision is `EXACT (HH:mm)` or `APPROXIMATE_RANGE`. A range is admissible only when every represented clock time maps to one branch. The receipt preserves precision and the original range. `UNKNOWN` or a range spanning multiple branches becomes `BIRTH_TIME_UNRESOLVED / SAFE_WITHHELD`; no personalized Identity or Mother Code may form.

The next knife may be a single RED corrective atomic recomposition on the latest Remote. No further product decision is required for the 1.0 profile frozen here.

## 2. Non-negotiable product contract

```text
User Authority:
Gregorian civil birth date
+ exact local clock time OR an explicitly bounded civil-time interval

Deterministic Derivation Authority:
Gregorian validation
-> Chinese lunisolar date
-> twelve-branch period and ordinal
-> immutable typed derivation receipt

Admission:
explicit confirmation of original input + derived output
-> Source Reference
-> existing Identity / Scene / Growth authorities

Presentation:
may display the receipt
may not write, override, or independently recalculate it
```

Frozen prohibitions:

- The user cannot directly select or write `hourBranch`.
- The user cannot enter a lunar date.
- Lunar date and twelve-branch period cannot become a second Authority.
- No sample date, sample time, default branch, browser locale, current clock or animation may produce an admissible source.
- No page, DOM, Renderer, Scene Host, Storage reader or Gate may derive a replacement result.
- A missing, invalid, unknown or ambiguous time cannot fall back to `酉时`, `子时`, noon, current time or another default.
- Derived facts become admissible only after the user sees the original input and derived result and explicitly confirms once.
- Admission success remains tied to the existing source/persistence transaction and exact recovery proof, not to the confirmation page or navigation.

## 3. Current formal producers and consumers

### 3.1 Current new-source path

| Layer | Current producer | Output / consumer | Finding |
|---|---|---|---|
| Input draft | `createXinmaiGenesisBirthCoordinateInputSession` | session-only `XinmaiGenesisBirthCoordinateDraft` | Hard-coded `1995-06-02 / 酉时`; no clock-time field |
| Native controls | `XinmaiGenesisBirthCoordinateControls` | `LaunchLab` session updates | Three date inputs plus direct twelve-branch `<select>` |
| Validation | `validateXinmaiGenesisBirthCoordinate` | Admission controller | Validates date and `HourBranch`; cannot validate clock time or interval |
| Presentation | `resolveXinmaiGenesisBirthCoordinatePresentation` | control headline, summary, confirmation | Shows date + direct branch; no lunar result or derivation proof |
| Admission | `confirmXinmaiGenesisBirthCoordinate` | launch-origin engines, session, persistence | Builds Source Reference directly from date + user-selected branch |
| Star-beast source | `resolveLaunchStarbeastDerivationSource` / `resolveStarbeastFromBirthDate` | Launch source results | Re-derives lunar date from Gregorian date through the shared calendar service |
| Mother Code source | `runMotherCodeLandingEngine` / `resolveLunarTrigramLanding` | Launch source results | Re-derives lunar date, consumes supplied branch and ordinal mapping |
| Source session | `createLaunchLifeSourceSession` | persistence / visual adapters | Carries `ChronoCoordinate`; no normalization receipt |
| Source persistence | `persistLaunchLifeSourceSession`, origin mirror writers | recovery controller | Stores the admitted source exactly; does not derive it |
| Recovery | `recoverXinmaiGenesisBirthSource` | LaunchLab, Genesis, Reality identity recovery | Exact primary/mirror matching, no defaults, no backfill |
| Identity | Genesis visual projections and `recoverRealityRecognizedIdentity` | Reality/Gravity/Growth | Consume stable Source Reference and derived engine results |
| Body Reference | `resolveXinmaiCanonicalBodyReferenceId` | C2 Imprint/Body consumers | Deterministically consumes Source + StarBeast + mansion identity refs; does not read birth input |

### 3.2 Existing deterministic reference implementation

| Producer | Present boundary | Reusable result |
|---|---|---|
| `resolveBirthCalendarFromGregorianDate` | canonical pure calendar service | Reuse as the sole Gregorian-to-Chinese-lunisolar algorithm owner |
| private `resolveHourBranch` in `productionIdentitySourceInputNormalizer.ts` | reference-only implementation | Logic is reusable, but must be extracted into a canonical pure time-derivation service before production use |
| `normalizeProductionIdentitySourceInput` | `implementationOnly`, `referenceOnly`, `noUserInputBinding`, `noProductIntegration`, `noUiIntegration` | Do not productize this wrapper by merely changing flags |
| normalized-reference bridge/adapter/engine consumption chain | isolated, reference-only, no product integration | Useful contract evidence; not the production Admission path |

### 3.3 Recovery and downstream consumers

| Consumer | Authoritative input today | Target receipt relationship |
|---|---|---|
| `LaunchLab` | recovered source or page input session | publishes user input to one derivation owner; never derives locally |
| `XinmaiGenesisBirthCoordinateControls` | page session decision | renders original input and read-only derived results; never owns `hourBranch` |
| Admission controller | direct draft | accepts only a current, frozen typed receipt plus explicit confirmation |
| Launch origin adapters | `ChronoCoordinate` | consume the receipt's canonical engine coordinate and validate calendar equality |
| `LaunchLifeSourceSession` | source ref + engine results | V2 session carries receipt/reference lineage; V1 remains legacy read-only |
| Source recovery controller | persisted V1 session | reads V1 or V2; never creates a receipt or fills missing fields |
| Genesis route admission | recovered life-source session | requires matching source/session/receipt lineage for V2; typed legacy proof for V1 |
| Reality identity recovery | stable source + visual references | validates V2 receipt lineage transitively; no raw time/calendar derivation |
| Body Imprint projector | identity references | remains unchanged; Body Reference is transitively bound to receipt through Source Reference |
| C1/C2 consumers | Identity/Crystal/Body typed facts | remain unchanged; never inspect raw birth input |

`Body Reference consumes the receipt` means it consumes identity references whose Source Reference was authorized by that receipt. It must not ingest raw birth time or calculate lunar/branch facts itself.

## 4. Target single-owner types

The migration should introduce one production-owned immutable receipt, mechanically equivalent to:

```ts
type XinmaiGenesisBirthTimeInput =
  | {
      precision: "EXACT";
      gregorianBirthDate: { year: number; month: number; day: number };
      localBirthTime: string; // validated HH:mm
    }
  | {
      precision: "APPROXIMATE_RANGE";
      gregorianBirthDate: { year: number; month: number; day: number };
      intervalStart: string;
      intervalEnd: string;
      crossesCivilDateBoundary: boolean;
    };

type XinmaiGenesisBirthSourceDerivationReceipt = {
  schemaVersion: "XINMAI_GENESIS_BIRTH_SOURCE_DERIVATION_V2";
  receiptReferenceId: string;
  input: XinmaiGenesisBirthTimeInput;
  canonicalGregorianBirthDate: string;
  lunarBirthDate: ChineseLunarBirthDate;
  hourBranch: HourBranch;
  hourBranchOrdinal: number;
  calendarProtocolVersion: string;
  timeDerivationProtocolVersion: string;
  civilDateBoundaryPolicy: string;
  timeZonePolicy: string;
  status: "READY_TO_CONFIRM" | "CONFIRMED";
};
```

The actual union may use project naming conventions, but these facts and proof fields cannot be omitted.

`UNKNOWN` is a provisional input state, not a receipt-producing variant. It may retain a Gregorian date draft for later completion but cannot create `XinmaiGenesisBirthSourceDerivationReceipt`.

### Receipt rules

- It is pure and frozen.
- `READY_TO_CONFIRM` is read-only presentation, not Identity or Storage success.
- Admission accepts only a `CONFIRMED` receipt produced from the current input revision.
- Editing any original input invalidates the previous receipt.
- Receipt identity includes protocol versions and the canonical input evidence; it cannot be based on page revision alone.
- Source Reference is generated from the confirmed receipt, never from the draft.
- Source Reference must use a V2 namespace or receipt reference to prevent accidental collision with V1 direct-branch sources.
- Identity and Body never parse date/time from the Source Reference.
- Raw input is not copied into marketing, analytics, AI, pricing or user profiling.
- The receipt preserves `EXACT` or `APPROXIMATE_RANGE`; presentation cannot collapse an approximate range into a fabricated exact minute.

## 5. Unique derivation owners

### 5.1 Lunar date

`guanyaoBirthCalendarService.resolveBirthCalendarFromGregorianDate` remains the unique calculation algorithm owner. Current behavior:

- validates a Gregorian date in the supported range `1901–2100`;
- uses the Chinese calendar implementation exposed by `Intl.DateTimeFormat`;
- freezes protocol `GUANYAO_BIRTH_CALENDAR_V1` and calculation zone `Asia/Shanghai`;
- returns leap-month information via `isLeapMonth`;
- returns `CALENDAR_UNAVAILABLE` rather than inventing a lunar date when support is missing.

Downstream star-beast and Mother Code services may revalidate the receipt by calling the same canonical service, but cannot create a competing calendar algorithm. Their result must exactly equal the receipt's calendar resolution; mismatch is `SAFE_WITHHELD`.

### 5.2 Twelve-branch period

Move the clock-time mapping out of the reference-only normalizer's private function into one canonical pure service, for example:

```text
xinmaiBirthTimeDerivationService
```

Both the reference-only normalizer and the new production derivation controller consume this service. No duplicate tables or page-local mapping remain.

An interval is derivable only when every represented local clock time maps to the same branch. A range within `23:00–00:59` remains 子时 even if its notation crosses midnight; the user-entered Gregorian civil date remains the calendar date. An interval crossing a branch returns typed `BIRTH_TIME_UNRESOLVED`; it cannot ask the user to choose the derived branch.

### 5.3 Product orchestration owner

One `XinmaiGenesisBirthSourceDerivationController` (or mechanically equivalent name) owns:

```text
validate original input
-> call calendar owner
-> call time-derivation owner
-> assemble typed receipt
-> return READY / SOURCE_NOT_READY / SAFE_WITHHELD
```

It does not write Storage, Identity, Body, Mother Code or Scene state. Admission remains the sole source-writing orchestrator after explicit confirmation.

## 6. Confirmation and Admission contract

The confirmation surface must show, together:

- the original Gregorian civil date;
- the original exact local time or bounded interval;
- the derived Chinese lunar date, including leap-month marker;
- the derived twelve-branch label;
- a concise explanation that the latter two are system-derived;
- the instruction `按出生证明/家人记忆中的当地时间填写` before confirmation;
- one explicit confirmation control and one edit path.

Primary UI cannot ask the user to fill a lunar date or choose a branch. No default source may be pre-confirmed.

Admission sequence:

```text
confirmed typed receipt
-> verify current input reference and policy versions
-> derive V2 Source Reference from receipt
-> adapt receipt to existing engine coordinate
-> run existing deterministic engines
-> verify engine calendar/branch outputs equal receipt
-> create V2 LaunchLifeSourceSession carrying receipt lineage
-> persist existing source assets
-> recover exact primary/mirror proof
-> authorize Genesis handoff
```

Any mismatch becomes `SAFE_WITHHELD`; the page cannot repair or choose a result.

## 7. Source, Identity and Body lineage

Target lineage:

```text
Derivation Receipt V2
  -> Source Reference V2
     -> Launch Life Source Session V2
        -> Genesis Identity references
           -> Reality/Growth identity references
              -> Canonical Body Reference
```

Frozen rules:

- One receipt produces one canonical Source Reference under one policy version.
- A different input or policy cannot overwrite an existing Source Reference.
- StarBeast identity and mansion references remain existing engine outputs.
- Body Reference remains the deterministic function of Source + StarBeast + mansion references.
- C1 Formation, C2 Body Imprint, Crystal and Growth Authority do not change.
- A receipt mismatch with persisted Identity is withheld; it never rewrites Body/Crystal assets.

## 8. V1 compatibility, no backfill and current invalid Origin

### 8.1 V1 read compatibility

Existing `GUANYAO_LAUNCH_LIFE_SOURCE_SESSION_V1` records contain Gregorian date + direct branch but no exact time or derivation receipt. The missing proof cannot be reconstructed.

The migration must:

- keep V1 records readable;
- wrap recovery in a typed `LEGACY_SOURCE_READ_ONLY` result in memory;
- preserve the original Source Reference and all recognized Identity/C1/C2/Growth assets;
- never claim that V1 has a V2 derivation proof;
- never persist a synthesized time, lunar receipt or confirmation;
- never auto-open the direct branch selector for a recovered valid V1 identity.

### 8.2 V1 new admission

After cutover, production creation of V1 records is `0`. The old hard-coded default, direct branch selector and `date + direct branch` Admission path exit in the same Runtime commit.

### 8.3 Reconfirmation

This migration does not infer an exact time from an existing V1 branch and does not mutate an existing V1 identity into V2. If a recognized V1 user chooses to correct or re-confirm birth data, the form must collect the original local civil time as `EXACT` or `APPROXIMATE_RANGE` and generate a new typed receipt. It may never reverse-map `hourBranch` into a fabricated minute or range.

Until such a migration is authorized:

- valid, internally consistent V1 assets remain readable as legacy facts;
- incomplete/conflicting V1 data is `SAFE_WITHHELD`;
- no backfill and no automatic replacement occur;
- if the V1 source already has dependent Identity/C1/C2/Growth assets, the new receipt remains `PENDING_IDENTITY_RECONCILIATION` and cannot replace Source/Identity/Body automatically;
- if no dependent identity assets exist, the explicitly confirmed V2 receipt may enter the normal new-source Admission path;
- reconciling a V2 receipt with an established V1 identity is a separate future identity-lineage migration, not part of this corrective blade.

### 8.4 Current invalid Origin

The current Mac Origin and its newly confirmed direct-branch source remain untouched. They are excluded from Release Evidence. The corrective migration neither deletes them nor upgrades them. Evidence resumes on a legal existing canonical Origin or a fresh Origin after corrective delivery closure.

## 9. Time zone, DST, midnight and leap-month audit

### Current facts

| Concern | Current code fact | Gap |
|---|---|---|
| Calendar zone | `Asia/Shanghai` is fixed in `guanyaoBirthCalendarService` | 1.0 now freezes it as the Chinese-calendar calculation protocol, not a birthplace conversion |
| Clock time | normalizer accepts a raw `HH:mm` string | 1.0 now freezes local civil clock meaning; no offset/place/DST conversion |
| Location | optional location is explicitly excluded from StarBeast and Mother Code derivation | Correct for 1.0; birthplace and true-solar-time inputs remain excluded |
| 子时 | current mapping treats `23:xx` and `00:xx` as 子时 | 1.0 now freezes one 子时 and no late-子 calculation-day shift |
| Lunar date | derived from the entered Gregorian date at a stable midday instant | Correct for 1.0; time never changes the entered date |
| Leap month | service returns `isLeapMonth`; engine consumes it | Needs receipt-level equality and boundary fixtures, not user input |
| Unsupported calendar | typed unavailable | Correct safe behavior; no fallback calendar |

### Frozen 1.0 profile

```text
Input meaning:
Local civil Gregorian date and local civil wall-clock time as recorded on a birth certificate or remembered by family.

Time-zone conversion:
NONE. The product does not convert to UTC or another location.
Birthplace/DST metadata does not affect P0 derivation.

Branch mapping:
23:00–00:59 = 子时; other branches are fixed two-hour civil-time ranges.

Calculation date:
Keep the Gregorian civil date entered by the user; do not shift 23:xx to the next day.

Unknown/ambiguous time:
No canonical Identity or Mother Code admission. Preserve a date draft for later completion and show truthful BIRTH_TIME_UNRESOLVED / SAFE_WITHHELD.
```

This profile matches the existing engine's date semantics and avoids false precision from place, solar-time, time-zone or DST conversion.

Any future birth-place instant conversion, historical DST resolution, true-solar-time calculation or late-子 day advancement requires a new versioned audit because it needs expanded inputs, time-zone data and new identity compatibility rules.

## 10. Recovery matrix

| Persisted/current state | Target decision |
|---|---|
| No source, blank exact input | `SOURCE_NOT_READY / DATE_OR_TIME_REQUIRED`; no default |
| Exact valid local date/time | derive receipt, show confirmation; no persistence before confirmation |
| Approximate range wholly inside one branch | derive receipt with `APPROXIMATE_RANGE` evidence and preserve endpoints |
| Approximate range crosses multiple branches | `SAFE_WITHHELD / BIRTH_TIME_UNRESOLVED` |
| Unknown time | save only a non-authoritative date draft; `BIRTH_TIME_UNRESOLVED`; no Identity/Mother Code |
| Invalid Gregorian date/time | `SAFE_WITHHELD / INVALID_BIRTH_INPUT` |
| Calendar implementation unavailable | `SOURCE_NOT_READY / CALENDAR_UNAVAILABLE` |
| V2 receipt + engine result exact match | Admission may persist and recover |
| Receipt/engine calendar or branch mismatch | `SAFE_WITHHELD / DERIVATION_PROOF_MISMATCH` |
| V2 primary/mirror exact match | `READY / PRIMARY_AND_ORIGIN_MATCHED` |
| V2 primary/mirror conflict | existing `SAFE_WITHHELD`; no precedence |
| V1 valid recognized identity/assets | `LEGACY_SOURCE_READ_ONLY`; preserve Source/Identity/C1/C2 |
| V1 incomplete/conflicting | `SAFE_WITHHELD`; no backfill |
| Existing V1 plus newly entered V2 input | do not merge; explicit future identity migration required |
| Refresh/Back/Forward | recover receipt/session; never recreate input default or replay confirmation |
| Direct URL without recovery proof | `SOURCE_NOT_READY`/`SAFE_WITHHELD` |
| Current invalid evidence Origin | readable under legacy rules, never accepted as Release evidence |

## 11. Atomic consumer cutover and file boundary

The corrective Runtime must be one atomic commit based on the latest Remote at application time. It cannot append to or push a stale/rejected candidate.

### Mandatory type/service/consumer scope

```text
src/types/xinmaiGenesisBirthCoordinatePresentation.ts
src/types/xinmaiGenesisBirthSourceDerivation.ts            # new typed receipt/draft/result unions
src/types/productionIdentitySourceInputNormalizer.ts
src/types/launchLifeSourceSession.ts
src/types/index.ts

src/services/productionIdentitySourceInputNormalizer.ts
src/services/guanyaoBirthCalendarService.ts             # protocol use; code only if approved policy requires it
src/services/xinmaiBirthTimeDerivationService.ts         # new unique clock-time owner
src/services/xinmaiGenesisBirthSourceDerivationController.ts # new receipt orchestrator
src/services/xinmaiGenesisBirthSourceDerivationPolicy.ts # new Counter seam
src/services/xinmaiGenesisBirthCoordinatePresentationResolver.ts
src/services/xinmaiGenesisBirthCoordinateAdmissionController.ts
src/services/launchLifeSourceSession.ts
src/services/sessionService.ts
src/services/xinmaiGenesisBirthSourceRecoveryController.ts
src/services/xinmaiGenesisBirthInputDraftPersistenceAdapter.ts # new draft-only writer

src/components/XinmaiGenesisBirthCoordinateControls.tsx
src/pages/LaunchLab.tsx
src/pages/GenesisProductionRouteEntry.tsx                # only if receipt-lineage admission is not already transitive

package.json
directly related registered Gate scripts
```

`realityRecognizedIdentityRecoveryAdapter` and `xinmaiCanonicalBodyImprintProjector` should remain unchanged if the source-session/identity receipt lineage is proven transitively. If implementation requires either to parse raw birth data or recalculate derivation, stop with re-audit.

### Same-commit removals

- hard-coded `1995 / 06 / 02 / 酉时` production draft;
- production `hourBranch` selector;
- `XinmaiGenesisBirthCoordinateDraft.hourBranch` as a user input;
- Admission's direct `draft.hourBranch` use;
- page/source-reference construction from an unconfirmed draft;
- all Gates that require exactly three inputs + one direct branch select;
- any direct V1 new-source success path.

### Provisional-date persistence boundary

Because 1.0 permits saving a Gregorian date and adding time later, the Runtime may add one typed provisional draft asset through the existing session document and one dedicated adapter. It must not add a DB, Object Store, Index, Identity writer or engine result. The draft:

- is explicitly `NON_AUTHORITATIVE / BIRTH_TIME_UNRESOLVED`;
- may contain the entered Gregorian date and unfinished time evidence;
- cannot contain user-authored lunar or branch values;
- cannot be consumed by Admission, Identity, Mother Code, Scene success or Body Reference;
- is replaced only by explicit user edits;
- is independently removable without deleting canonical life assets;
- remains readable under the Forward Counter while new Admission is paused.

### Same-commit preservation

- V2 native single input owner and accessible native form responsibility;
- V1 Continuous Scene Host;
- existing source persistence and exact recovery owner;
- Identity, StarBeast, Mother Code, Growth, Formation, Crystal, Body and C1/C2 Authority;
- Motion/Reduced Motion semantic parity;
- existing recognized V1 assets and no-backfill behavior.

## 12. Gate migration and validation

### Existing Gates to update, not delete

- all five `check-xinmai-genesis-birth-coordinate-*` Gates;
- all five `check-xinmai-genesis-birth-source-*` recovery Gates;
- registered `production-identity-source-input-normalizer-*` Gates;
- normalized-reference and engine-consumer Gates whose isolated boundary must remain intact.

### Required new/strengthened assertions

1. one user input owner; no user-authored lunar or branch field;
2. one canonical time-derivation function/table;
3. one canonical Gregorian-to-lunar service;
4. no hard-coded admissible date/time/branch default;
5. exact time and single-branch interval cases;
6. `22:59`, `23:00`, `23:59`, `00:00`, `00:59`, `01:00` boundary matrix proving 子时 and no date advancement;
7. invalid/unknown/cross-branch interval withholding;
8. known normal date, leap day, lunar leap-month and calendar-unavailable cases;
9. receipt/input revision fencing;
10. confirmation is not persistence success;
11. engine calendar/branch equality with receipt;
12. V1 read-only recovery and no backfill;
13. current invalid Origin is not auto-upgraded and V1 branch is never reverse-mapped to a fabricated time;
14. Source/Identity/Body reference lineage remains one-way;
15. Direct URL, refresh, Back/Forward and stale-tab recovery;
16. Production Bundle contains no Fixture/Acceptance/default-source escape;
17. Forward Counter never restores direct branch selection or default Admission.

TypeScript, Production Build, full registered Gates, hashed Production browser evidence and cold-recovery evidence are required in the Runtime Candidate and Push Gate, not this Audit.

## 13. Forward SAFE_WITHHELD Counter and rollback

The Runtime Candidate must introduce a single policy seam, for example:

```text
Xinmai Genesis Birth Source Derivation Admission Policy
ENABLED -> SAFE_WITHHELD
```

The direct-child Counter should modify only that policy file. It must:

- pause new V2 derivation confirmation and source admission;
- keep V1/V2 persisted source, Identity, Growth, Crystal, Body and C1/C2 assets readable;
- keep the non-authoritative incomplete birth-date draft readable for later completion;
- preserve recovery and native controls in truthful read-only/withheld states;
- never restore the hard-coded default, direct branch selector or unreceipted V1 writer;
- never delete or rewrite the current invalid Origin.

An ordinary Git revert of the corrective migration is not a safe product rollback because it would revive the known direct-branch/default path. Delivery rollback is the forward Counter. If one policy file cannot withhold the new writer while preserving recovery, the Runtime application must stop for re-audit.

## 14. Product rules closed and next knife

Product Control Tower has frozen the 1.0 profile:

- local civil Gregorian date and local wall-clock time as written;
- no birthplace, true solar time, time-zone or DST conversion;
- `23:00–00:59` is 子时 without changing the entered date;
- `EXACT` and same-branch `APPROXIMATE_RANGE` are admissible;
- `UNKNOWN` and cross-branch ranges are unresolved and cannot create Identity or Mother Code;
- a Gregorian date draft may be saved for later time completion, but remains non-authoritative;
- V1 direct-branch records remain read-only with no backfill or reverse inference.

The next knife is authorized for application planning:

```text
XINMAI-GENESIS-BIRTH-TIME-SOLAR-LUNAR-DERIVATION-
SINGLE-OWNER-CORRECTIVE-ATOMIC-RECOMPOSITION-P0

Traffic Light: RED
Blade: Corrective Atomic Migration
Decision: NOW — STRICT FROZEN SCOPE / CANDIDATE PUSH HOLD
```

Runtime was not modified by this Audit. Application must begin from the latest exact Remote, form one atomic Candidate and a direct-child Forward Counter, then pass an independent Push Gate before delivery.

## 15. Stage status and delivery discipline

| Area | Status |
|---|---|
| Causal MAP | DELIVERED at `8fb1dbf…` |
| Audit architecture | CLOSED / APPLICATION READY |
| Runtime Application | NEXT KNIFE AUTHORIZED / NOT IMPLEMENTED |
| Current invalid Origin | PRESERVED / INVALID FOR RELEASE EVIDENCE |
| C2 / V5 / Android Evidence | HOLD |
| C1 / C2 Authority and assets | UNCHANGED |
| C3 / Haptic / Audio | PAUSED / DEFER |
| Prompt-AI / Research / Monetization | DEFER |
| Phase 4 | LOCKED |

- This Audit adds exactly one document.
- Runtime, Gate, Storage, Schema, Renderer, CSS, copy and assets changed: `0`.
- TypeScript / Production Build: `N/A` for doc-only Audit.
- `git diff --check`: required before local commit.
- Audit commit: local only; Push `HOLD`.
- Main worktree and its existing 34 user changes remain untouched.
