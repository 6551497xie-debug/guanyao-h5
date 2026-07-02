# QA Dynamics Primary Petal Fixtures

This document records the development-only QA entry for the `/dynamics` primary petal fixture harness.

## 1. Protocol Position

Use this QA flow to verify the runtime causal chain:

```text
selectedPressureSeedContext
-> derivePrimaryPetal()
-> currentPrimarySpaceId
-> CosmicBotanicsField
```

This is a manual runtime check for changes to pressure seed context, primary petal mapping, six-node language, and `/dynamics` rendering.

## 2. Dev-Only Rule

The fixture harness is for development QA only.

- It only works when `import.meta.env.DEV` is `true`.
- Production ignores the `fixture` query.
- It does not write `localStorage`.
- It does not overwrite real user data.
- It does not add formal product UI.

## 3. Fixture URLs

Run these URLs in the local development server.

| URL | Expected primary petal | Recognition marker |
| --- | --- | --- |
| `/dynamics?fixture=body` | body | `胸口发闷` |
| `/dynamics?fixture=emotion` | emotion | `心口` |
| `/dynamics?fixture=thought` | thought | `脑海` |
| `/dynamics?fixture=behavior` | behavior | `脚步` |
| `/dynamics?fixture=memory` | memory | `旧痕` |
| `/dynamics?fixture=motivation` | motivation | `方向` |

## 4. Per-Fixture Acceptance Checklist

For each fixture, confirm:

- `/dynamics` is not blank.
- The primary petal matches the expected dimension.
- Node copy changes with the dimension.
- The seven-star button count is 7.
- Tapping the seven stars can advance all 6 nodes.
- The completion state shows `这一局，已经开始结晶。` exactly once.
- The flow does not route to legacy `/hexagram-stamp`.
- Legacy UI does not leak into the active screen.
- The console has no `error` or `warn`.

## 5. When To Run This QA

Run this fixture check after changing any of:

- pressure seed fields;
- `guanyaoPrimaryPetalResolver`;
- `guanyaoLanguageSystem` six-node copy;
- `CosmicBotanicsField` `currentDimension` wiring;
- `GravityPage` `selectedPressureSeedContext` reading logic.

## 6. Validation Commands

```bash
npm run check:primary-petal
npm run build
npm run check:release
```
