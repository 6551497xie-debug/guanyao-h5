# XINMAI 1.0 Mother Code Profile Persistence Gate Owner Reconciliation Corrective P0

## Exit

`A. RELEASE GATE OWNERSHIP CONFLICT RESOLVED`

`B. MAINLINE PROMOTION HOLD — BAIHU FORMAL CONSUMER DISPOSITION REQUIRED`

This Corrective reconciles the registered persistence gates with the current
typed Birth/Genesis and Gravity production ownership. It changes no Runtime
writer, persistence adapter, Authority, DB, Store, schema, page, route, visual
behavior, or Phase 2 Relationship behavior.

Push remains `HOLD`.

## Exact parent and scope

- Exact parent:
  `c9c6f112f4bd22da97a840edab6d1bbfe7a08e72`
- Reviewed Phase 2 Runtime Candidate:
  `0e7789d9899dfbba9037f9a24573f273d823d30f`
- Reviewed direct-child Counter:
  `bbb092928f3a7c7f4ec1b157ad047122bdb3644c`

Corrected gates:

1. `check-mother-code-profile-persistence-semantics.mjs`
2. `check-mother-context-persistence-semantics.mjs`
3. `check-persona-snapshot-persistence-semantics.mjs`
4. `check-selected-pressure-seed-context-persistence-semantics.mjs`

The fourth gate was included because the complete Release Gate exposed the
same stale Launch/Gravity consumer assumptions after the Mother handoff gates
were reconciled. It remains a gate-only correction and changes no pressure
Runtime behavior.

## Reconciled ownership

### Birth and Genesis

`LaunchLab` owns the visible birth-coordinate interaction and calls the typed
`XinmaiGenesisBirthCoordinateAdmissionController`.

The Admission Controller owns the atomic handoff orchestration and delegates
the actual writes to the existing adapters:

- `writeMotherCodeProfile(...)`
- `writeOriginMotherContext(...)`
- `writePersonaOutputSnapshot(...)`

Only the persistence adapters own their storage keys and schema versions.
Moving these calls back into `LaunchLab` merely to satisfy old source-string
assertions is explicitly forbidden.

### Gravity production

`GravityPage` consumes a typed `DynamicsInputContext` prop. The production
route delegates assembly to `resolveGravityProductionRuntimeInput(...)`, which
uses the admitted current pressure and the trusted Launch Life Source Session.
It does not reconstruct current facts from historical profile/context/persona
storage.

The legacy Dynamics input adapter and Scene path remain readable and unchanged
for compatibility; they are no longer misidentified as the formal production
Gravity owner.

## Verification

- Mother Code Profile persistence semantics: `PASS`
- Mother Context persistence semantics: `PASS`
- Persona Snapshot persistence semantics: `PASS`
- Selected Pressure Seed Context persistence semantics: `PASS`
- TypeScript / Production Build: `PASS` (`436 modules`)
- Relationship Authority Foundation: `PASS`
- Relationship Atomic Activation: `PASS`
- Identity → First Encounter → Relationship continuity: `PASS`
- `git diff --check`: `PASS`
- Runtime/DB/Store/Schema/Writer/Page/Route behavior diff: `0`

## Full Release Gate review

The complete registered `check:release` was rerun after each ownership
reconciliation. It now passes all four corrected persistence gates and advances
to the next independent failure:

`check:dynamics-baihu-core-stars-adapter`

Failure:

`Gravity delegates BaiHu core stars missing=resolveDynamicsBaiHuCoreStars({`

This is not another proven source-owner rename. Repository inspection finds the
resolver implementation and its gate, but no current Runtime consumer under
`src/**`. The old gate expected `GravityPage` to resolve and render the BaiHu
core stars; the current formal Gravity page no longer does so.

Product Control Tower must decide whether this visual adapter is:

1. still a required formal consumer and must be reconnected through the current
   typed production host; or
2. intentionally retired by the newer Star Beast visual architecture and must
   be explicitly deprecated with replacement evidence.

Changing that gate without this disposition would hide a real consumer gap.
Restoring the old page-local call without architecture review would recreate an
obsolete ownership pattern.

## Mainline promotion decision

`HOLD`

The Mother Code Profile persistence ownership conflict is closed. The Phase 2
Relationship Candidate remains Authority-accepted. Mainline promotion is still
blocked because the complete registered Release Gate does not pass.

The Runtime Candidate, Counter, formal remote, and release tag remain
unchanged. No promotion tag is created in this blade.

## Phase 2 closure

`NOT CLOSED`

Formal closure still requires:

1. BaiHu formal consumer disposition and any separately authorized corrective;
2. complete registered Release Gate `PASS`;
3. fresh formal-remote topology verification;
4. non-force mainline promotion;
5. separate Counter publication without merging it;
6. immutable promotion tag verification;
7. post-promotion remote verification.

## Next exact knife

`XINMAI-1.0-DYNAMICS-BAIHU-CORE-STARS-FORMAL-CONSUMER-DISPOSITION-RE-AUDIT-P0`

`RED / AUDIT ONLY`

The audit must identify the current visual owner, formal consumer, replacement
contract, Reduced Motion equivalence, legacy compatibility, and whether the
adapter is reconnected or explicitly retired. It must not start by restoring a
page-local `GravityPage` call.
