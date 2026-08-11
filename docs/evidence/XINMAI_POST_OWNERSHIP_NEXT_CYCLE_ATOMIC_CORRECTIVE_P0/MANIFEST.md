# XINMAI post-Ownership next-cycle atomic corrective evidence

Date: 2026-08-11

Expected parent: `8ebafacbbf1d387f60016f4b7585c7c86f4baa73`

Production origin: `http://127.0.0.1:5521`

## Formal product journey

The browser journey used only visible production controls and a clean origin. It
did not use a Fixture, Acceptance query, manual Storage, a backfill, or direct
Authority mutation.

1. Birth `1990-01-15 10:00` produced the deterministic birth summary and entered
   `/genesis`.
2. Genesis identity and relationship recognition entered `/reality`.
3. A real MID_LIFE candidate was selected.
4. Six explicit dimension observations were completed. Canonical progress was
   observed as `0 → 1 → 2 → 3 → 4 → 5 → 6`; no refresh was required.
5. Choice V3, explicit Departure, explicit Return and `ATTEMPTED` produced one
   Fact, one Formation Receipt, one Crystal and one canonical Body Imprint.
6. Ownership reported exactly one trace and exposed one visible
   `带着这道痕迹，继续同行` action.
7. That action reconciled the completed Return target and navigated with a fresh
   Intent. The new cycle reached legal `/reality` admission and real Candidate
   selection; it did not reach `INTENT_STATE_NOT_ADMISSIBLE`.
8. The new Reality surface still reported exactly one historical Crystal trace.
   Starting the cycle itself created no new Fact, Formation, Crystal or Body
   Imprint.
9. `/archive` remained readable and reported the same one canonical trace.

Fresh public Reality references:

- Intent: `reality-intent:d8fe0735-a5f8-4b58-afe8-a100133fd2e3`
- Encounter: `reality-encounter:9d58e643-c1d9-4772-9f47-77314dcfbc2e`
- Intent Authority: `ACTIVE_IN_REALITY`

## Typed state and result matrix

| Boundary | Input | Typed result | Retryability / effect |
|---|---|---|---|
| Completion proof | one exact Choice/Departure/consumed Return/qualifying Fact/consumed Eligibility/FORMED Crystal/current Body | `READY` | no mutation |
| Completion proof | `NOT_ATTEMPTED`, declined, missing or ambiguous lineage | `SAFE_WITHHELD` with immutable proof cause | Authority-owned; no Reality write |
| Target lifecycle | `REALITY_PENDING`, `REALITY_ACTIVE` or `PRESSURE_RECOGNIZED` + `gravityAdmission=null` | `ALLOW` | legal pre-Gravity terminalization |
| Target lifecycle | pre-Gravity + a Gravity admission | `TARGET_CONTINUITY_CORRUPTED` | non-retryable, no write |
| Target lifecycle | `GRAVITY_ADMITTED`/`ACTIVE_IN_GRAVITY` + exact admission | `ALLOW` | existing admission terminalized; none fabricated |
| Target lifecycle | Gravity lifecycle + missing admission | `GRAVITY_ADMISSION_MISSING` | non-retryable, no write |
| Target lifecycle | exact `TERMINAL / START_NEW_ENCOUNTER` | `ALREADY_RECONCILED` | idempotent, no revision increment |
| Target lifecycle | conflicting terminal history | `TERMINAL_REASON_CONFLICT` | non-retryable, no reinterpretation |
| Fresh Intent | terminal source + no active key | `CREATED` | one fresh Intent/Encounter |
| Fresh Intent | exact active continuation winner, including after Reality admission | `ALREADY_CURRENT` | same Intent/Encounter recovered |
| Fresh Intent | true unique-index race with exact winner | `RECOVERED_EXACT_CHOICE_CONTINUATION` | same winner recovered |
| Any stage | transactional availability/abort/closed/write-unconfirmed | `SAFE_WITHHELD` with inner cause | retryable only when Authority says so |
| Any stage | mismatch/corruption/policy pause | `SAFE_WITHHELD` with inner cause | non-retryable; safe return only |

## Saga and recovery evidence

- Back to Ownership followed by the same visible action recovered the same fresh
  Intent and Encounter references after the fresh cycle was already
  `ACTIVE_IN_REALITY`.
- Two tabs issued the same visible command concurrently. The unique active
  identity converged on the same Encounter. The losing tab initially observed
  the existing strict `INTENT_NOT_CURRENT` route guard after the other tab had
  already advanced the Intent; refresh recovered the same admitted cycle. No
  second active cycle was created.
- Archive issued the same typed command and recovered the same fresh Intent and
  Encounter.
- The executable state resolver gate covers both valid pre-Gravity null-admission
  states and valid existing-Gravity states, plus missing/corrupt/terminal conflict
  outcomes.
- The existing Reality transaction remains the single terminalization/key-release
  writer. The existing Intent controller and unique `activeIdentityKey` remain
  the fresh-cycle fence. No second DB, Store or page-local fence was added.

## Accessibility and responsive evidence

- The visible command exposes busy/disabled state and an `aria-live` status.
- Retryable failures preserve a real command; non-retryable failures remove the
  fake retry and preserve a safe completed-asset message.
- Keyboard-accessible native buttons were used through Birth, Reality, six
  dimensions, Return, Ownership and Archive. The long-hold Choice control was
  exercised on its visible named button.
- Responsive viewport overrides for `390×844` and `320×568` were requested. The
  in-app browser backend in this desktop session capped the captured content
  viewport at 278 CSS pixels; the full journey and both next-cycle actions still
  remained reachable below the supported 320-pixel product minimum. Existing
  registered narrow-hit-target and return-surface overflow gates passed. Exact
  screenshot pixel dimensions are recorded below and are not represented as
  native 390/320 captures.

## Screenshots

- `01-ownership-first-cycle-390x844.jpg` — first-cycle Ownership state. Browser
  capture: 229×430 pixels.
- `02-fresh-reality-cycle-390x844.jpg` — fresh admitted Reality cycle. Browser
  capture: 229×430 pixels.
- `03-fresh-reality-cycle-320x568.jpg` — requested narrow override. Browser
  capture: 229×289 pixels.
- `04-fresh-reality-cycle-visible-production.jpg` — visible expanded browser
  capture of the fresh cycle.
- `05-archive-first-cycle-preserved.jpg` — Archive still reports one canonical
  trace and exposes the same typed next-cycle action.

## Production resources and runtime

- Entry JS: `assets/index-PHFETRpD.js`
- Entry CSS: `assets/index-ShMXuHjA.css`
- Entry JS SHA-256:
  `866a24baa1b18f27f34b16c8bd431e10fd334600aa46f087a5d7a80ccfb3852a`
- Entry CSS SHA-256:
  `43155e1e1fa5009455f139b5c9a7959c2ea3bb3bb78d80c7b9817605e08bcee9`
- Archive chunk: `assets/PersonalityRingPage-BWW-ufQo.js`;
  SHA-256 `e4d077e2fc7cf358c598fb6160112c7489e861eb53bec8d3c89413d7045df283`.
- `/@vite/client` and `/src/main.tsx` returned the SPA HTML fallback with
  `Content-Type: text/html`; neither was loaded as executable JavaScript.
- Executable asset filenames containing Fixture/Acceptance/Draft/authoring: 0.
- Executable bundle matches for `src/fixtures`, `/fixtures/`,
  `acceptance-harness`, `AI_ASSISTED`, or binding-author metadata: 0.
- Runtime error/warning logs across both journey tabs: 0.

## Engineering verification

- TypeScript/build: PASS.
- Direct corrective gate: PASS.
- Choice-returning provenance gate: PASS.
- Life-trace/new-Reality continuity gate: PASS.
- Registered XINMAI gates: 102/102 PASS.
- Full release gate has one pre-existing parent-baseline failure at
  `check:mother-code-profile-persistence-semantics`; the same missing historical
  marker reproduces at exact parent `8ebafac...`. New release-gate failures: 0.
- Reality DB/Store/Index/Persisted Schema changes: 0.
- Growth/Crystal/Body/Six-Dimension Authority semantic changes: 0.
