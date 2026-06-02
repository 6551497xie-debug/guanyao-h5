# H5-4A Visual QA Matrix

## Scope

H5-4A establishes the visual engineering base only. It does not connect the new visual primitives to pages, routes, state, services, data, payment, or API code.

## Files

| Area | File | QA expectation |
| --- | --- | --- |
| Tokens | `src/styles/tokens.css` | Defines prefixed `--gy-*` color, spacing, radius, shadow, and shell tokens. |
| Motion | `src/styles/motion.css` | Defines prefixed motion tokens and reduced-motion handling. |
| System CSS | `src/styles/guanyao-visual-system.css` | Imports tokens and motion, exposes prefixed `.gy-*` classes only. |
| Shell primitive | `src/components/visual/GuanyaoShell.tsx` | Provides shell and optional stage wrapper without page coupling. |
| Text primitive | `src/components/visual/GuanyaoText.tsx` | Provides typed text sizes and tones without business copy. |
| Button primitive | `src/components/visual/GuanyaoButton.tsx` | Provides typed button variants without routing or flow behavior. |
| Entry import | `src/main.tsx` | Imports the visual system CSS once after existing global CSS. |

## Non-Regression Checks

| Check | Expected result |
| --- | --- |
| Existing routes | No route structure changes. |
| Gravity page | `GravityPage.tsx` remains untouched. |
| Gravity wave | `GravityWave.tsx` remains untouched. |
| State machine | No changes to `autoYaoPath`, `sixthYaoChoice`, or `finalChoiceCode`. |
| Data and services | No changes to migration matching, archive saving, API, payment, or service logic. |
| Page copy | No page text changes. |
| Third-party libraries | No new animation library or dependency. |
| Dev server | `npm run dev` should start normally after H5-4A. |

## H5-4B Readiness

H5-4B can begin after the app compiles with the new visual base and the new primitives remain unconnected to business pages. The next stage may decide how `GravityPage.tsx` and `GravityWave.tsx` consume the visual system.
