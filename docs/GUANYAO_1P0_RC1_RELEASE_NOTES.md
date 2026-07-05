# GUANYAO 1.0 RC1 Release Notes

## Release Identity

- Release tag: `v1.0.0-rc1`
- Release commit: `9459632 docs(release): freeze guanyao 1.0 main chain`
- Release date: `2026-07-05`
- Release status: `RC1 / frozen main chain`

Remote verification has confirmed:

- `origin/main` points to `9459632`
- `v1.0.0-rc1` resolves to `9459632`
- The working tree was clean before release notes generation

## Frozen Production Flow

### New User Flow

The 1.0 new user production path is frozen as:

1. LaunchLab
2. ENTRY / starbeast entry
3. Origin coordinate axis
4. Five-step coordinate tuning: year / month / day / hour / province
5. Mother code generation
6. Mother code card front / back
7. Reality pressure entry
8. Pressure seed axis
9. Horizontal `01 / 02 / 03` cursor locks one seed into Zhongzhou
10. `/dynamics`
11. Six-dimension transmission
12. Current crystal card
13. Save into Personality Ring Lite

### Returning User Flow

The 1.0 returning user production path is frozen as:

1. LaunchLab
2. ENTRY / starbeast entry
3. Pressure seed axis
4. Zhongzhou lock
5. `/dynamics`
6. Current crystal when mother context is available
7. Save into Personality Ring Lite

### Direct Dynamics Fallback

Direct `/dynamics` entry remains safe when context is missing or incomplete:

- It does not crash
- It does not generate fake crystal state
- It does not generate fake Personality Ring Lite state
- It does not route into legacy flows

## Core Product Capabilities

### Entry

- Visual Timeline Engine is sealed for 1.0
- `debugTimeline` remains an internal node-debug tool
- Production hides internal Node copy
- Production uses a single main starbeast collapse
- New and returning user paths are separated after the entry collapse

### Origin Coordinate

- New user origin coordinate uses five visible tuning steps:
  - year
  - month
  - day
  - hour
  - province
- City is not a visible production step
- The coordinate phase keeps the interface focused on tuning, not form filling
- Time sequence and location orientation are filled before mother code reveal

### Mother Code

- Mother code generation uses `runGeoChronoMotherFusionEngine`
- The generation combines chrono, geo, starbeast, trigram, and mother profile context
- Four Beast x Trigram visual grammar is sealed as the interpretation layer
- Mother code card supports front / back structure:
  - Front: visual recognition surface
  - Back: archetype decoding surface

### Pressure Seed Axis

- The pressure seed axis is sealed as:
  - vertical axis fetches three pressure seeds
  - horizontal `01 / 02 / 03` cursor selects one seed
  - Zhongzhou confirms the selected seed
- Selection requires explicit Zhongzhou confirmation before entering `/dynamics`

### Dynamics

- `/dynamics` reads both mother context and pressure seed context when available
- `currentHexagramProfile` bridge is active
- Six-dimension transmission completes inside `/dynamics`
- The sixth completed dimension automatically enters the crystal end state

### Crystal Card

- The 1.0 end state is a two-stage crystal endpoint:
  - `MOLD`: current crystal has formed
  - `CARD`: current crystal card
- The crystal card includes:
  - current hexagram title
  - lower trigram
  - upper trigram
  - dynamic evolution copy
  - detoxified behavior feature decoding
- The card does not expose raw pressure sentences as the primary final artifact

### Personality Ring Lite

- Personality Ring Lite persists the current crystal end state
- Storage key: `guanyao:personalityRingLite`
- Saving lights one star point for the current crystal
- Duplicate saving of the same crystal is prevented by the lite persistence contract

## Storage / Context Contract

The 1.0 frozen main chain depends on these browser storage contracts:

- `guanyao:motherCodeProfile`
- `guanyao:originMotherContext`
- `guanyao:personaOutputSnapshot`
- `guanyao:selectedPressureSeedContext`
- `guanyao:currentHexagramProfile`
- `guanyao:currentCrystalEndState`
- `guanyao:personalityRingLite`

The production rule is:

- Existing context can be used
- Missing context must degrade safely
- Missing context must not be replaced with fake final product state

## Legacy Isolation

The following systems are not part of the Guanyao 1.0 production main chain and remain isolated:

- `archive`
- `yao-device`
- `repair method`
- `migration`
- `choice`
- `hexagram-stamp`
- old R8 page flow
- collectible asset system
- commercial physical-product buttons

Release rule:

- Do not route the 1.0 main chain into these legacy systems
- Do not restore legacy copy into production end states
- Do not redefine the 1.0 endpoint outside `/dynamics`

## Verification Summary

The release freeze flow has been verified with:

- `npm run build`
- `npm run check:release`
- `git diff --check`
- remote `main` verification
- remote `v1.0.0-rc1` tag verification

Confirmed release refs:

- `origin/main` resolves to `9459632`
- `v1.0.0-rc1^{}` resolves to `9459632`

## Known Non-Blocking Notes

- Production build may report an existing chunk size warning.
- The warning is not a release blocker for RC1.
- Some in-app browser smoke tests may be limited by localStorage or browser session restrictions.
- When browser access is restricted, source-level storage contracts and UI state checks are used as supporting evidence.

## Release Statement

Guanyao 1.0 RC1 is frozen around the launchable production path:

LaunchLab -> origin coordinate / mother code -> pressure seed -> `/dynamics` six-dimension transmission -> current crystal card -> Personality Ring Lite.

No legacy archive, yao-device, migration, choice, hexagram-stamp, old R8, collectible asset, or commercial physical-product flow is part of the 1.0 production main chain.
