# XINMAI Genesis Birth Source Derivation Runtime Closure Revalidation P0

## Closure decision

**RUNTIME AUTHORITY CLOSED / DELIVERY CLOSED / PASS**

The delivered Runtime commit `9bf5807b6f6d22993eb6c6a3219097bd4839ca20` was independently revalidated from a new clean snapshot after exact remote delivery. No Runtime, Gate, page, CSS, Storage, Schema, or asset was modified during closure.

## Immutable chain

- Previous remote parent: `a0a523c731e59c3c70c184396973c9815dbcafec`
- Delivered Runtime: `9bf5807b6f6d22993eb6c6a3219097bd4839ca20`
- Target branch after Runtime delivery: `codex/genesis-28-mansion-production-continuity`
- Forward SAFE_WITHHELD Counter: `7267712a305b69df9aa01ed853d517774dea1b72`
- Counter parent: `9bf5807b6f6d22993eb6c6a3219097bd4839ca20`
- Counter remote references: `0`; the Counter remains local only.

## Independent clean-snapshot engineering evidence

The closure snapshot was created directly at the verified remote Runtime SHA. It did not reuse the Push Gate build directory, browser process, Origin, generated bundle, or TypeScript cache.

| Check | Runtime snapshot | Counter snapshot |
|---|---:|---:|
| TypeScript | PASS | PASS through Production build |
| Production build | PASS; 391 modules | PASS; 391 modules |
| Complete registered XINMAI gates | 123 / 123 PASS | 123 / 123 PASS |
| Deleted, omitted, or weakened gates | 0 | 0 |
| Production Acceptance / Fixture / fault-injection assets | 0 | 0 |

Runtime Production bundle identifiers included:

- `index-CPRYfEeY.js`
- `index-BJV5n3as.css`
- `GenesisProductionRouteEntry-ozKBeJnQ.js`

Counter Production main bundle: `index-BcHwCnw8.js`.

The following six required gate aliases remain registered and target their expected scripts:

1. `check:xinmai-genesis-birth-source-derivation-single-owner`
2. `check:xinmai-genesis-birth-source-derivation-boundaries`
3. `check:xinmai-genesis-birth-source-v1-no-backfill`
4. `check:xinmai-genesis-birth-source-consumer-cutover`
5. `check:xinmai-genesis-life-origin-native-control-readiness`
6. `check:xinmai-genesis-life-origin-native-control-production-hit-target`

## Authority closure

The clean-snapshot source, registered gates, and accepted immutable-SHA Push Gate evidence jointly establish:

- The sole production user input authority is the local civil Gregorian birth date plus either an exact local clock time or an explicit approximate range.
- There is no direct production earthly-branch selector and no hard-coded `酉时` default.
- The earthly branch and lunar result are deterministic derivations, not second user-authored authorities.
- `23:30` resolves to `子时`; the civil Gregorian date remains unchanged while the lunar date is derived from that date.
- Boundary cases `22:59`, `23:00`, `00:59`, and `01:00` resolve to `亥时`, `子时`, `子时`, and `丑时` respectively.
- A range wholly inside one earthly branch may form a derivation receipt; a cross-branch range becomes `BIRTH_TIME_UNRESOLVED` and cannot form personalized Identity.
- `UNKNOWN` remains unresolved and forms neither a derivation receipt nor personalized Identity.
- V1 direct-shichen assets are read-only compatible, `NO BACKFILL`, and never infer a fabricated exact clock time.
- Refresh and Back/Forward recovery preserve the same Birth Source, derived branch, lunar resolution, and Source Reference.
- Genesis Native Control remains one native BUTTON with one interaction owner. The Motion presentation meaning and typed readiness contract did not regress.

The accepted external Push Gate evidence is bound to the same immutable Runtime SHA and is stored outside the repository under:

`genesis-birth-source-derivation-push-gate-p0/XINMAI_GENESIS_BIRTH_SOURCE_DERIVATION_RUNTIME_INDEPENDENT_PUSH_GATE_P0.md`

## Counter closure

The Forward Counter is the direct child of the delivered Runtime and changes only:

`src/services/xinmaiGenesisBirthSourceDerivationPolicy.ts`

Its independent build and all 123 gates passed. It safely pauses new Birth derivation and Identity formation while preserving existing valid V1/V2 assets and read-only recovery. It does not restore the hard-coded branch default, direct-shichen production input, a second date authority, or a legacy Genesis interaction owner.

## Scope and stage boundary

- Runtime delivery: CLOSED / PASS
- Birth source derivation authority: CLOSED / PASS
- Counter: LOCAL ONLY / NOT TRIGGERED / NOT PUSHED
- C2 and V5 release evidence: unchanged by this closure
- C3, AI, commercialization, and Phase 4: not entered
- Main worktree user changes and `public/brand/`: untouched

No candidate-unique defect, authority split, false success, schema expansion, or asset damage was found. Any later work must use the remote Closure HEAD as its exact parent and must not reuse the local Counter as a normal forward Runtime commit.
