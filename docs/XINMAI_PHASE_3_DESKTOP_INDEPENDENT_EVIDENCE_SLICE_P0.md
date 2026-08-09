# XINMAI Phase 3 Desktop Independent Evidence Slice P0

Date: 2026-08-09

## Frozen object and scope

- Immutable candidate / remote: `ff225bc081ef1526c0dd96864d79d3f3ba17a3b2`
- Target branch: `codex/genesis-28-mansion-production-continuity`
- Runtime / Gate / CSS / copy changes: `0`
- VoiceOver native product-window evidence remains independently `OPEN` and was not reclassified.
- Android physical release evidence remains independently `OPEN`.
- C3, Audio, Haptic, AI, Monetization and Phase 4 remain outside this slice.

Evidence directory:

`/Users/xieyanjun/.codex/visualizations/2026/07/22/019f87bd-b535-7723-9184-06a6fd71127e/v5-desktop-independent-slice-20260809/`

## Overall verdict

`OPEN — INDEPENDENT DESKTOP EVIDENCE PARTIALLY CLOSED`

No candidate-unique Runtime defect was found. Navigation recovery and the focus presentation of both primary Ownership controls passed. Native Reduced Motion, real browser 200% zoom, the four exact narrow viewports, full native Tab traversal, Save-Data and background RAF pause were not all legally observable in the current desktop evidence environment. Desktop Release is therefore not closed.

## Production baseline

- Production Build: `PASS`
- Hashed JS: `/assets/index-DuDkAWPy.js`
- Hashed CSS: `/assets/index-CLpG8E7C.css`
- Vite development client: absent from the served HTML
- Initial native macOS Reduced Motion preference: `0`
- Browser motion query: `reduce=false`
- Ownership recovery: `RECOVERED_EXISTING`
- Recovery origin: `CANONICAL_RECOVERY`
- Crystal authority: `IDB_TRANSACTION_COMPLETE`
- Crystal: `crystal:h6jew7`
- Formation: `crystal-formation:1mqc2md`
- Continuous Scene: `CONTINUOUS_SCENE_MOTION_PRESENTED`
- Scene Host: `SINGLE_APP_SHELL_OWNER`
- World presenter count: `1`

## Evidence matrix

| Item | Verdict | Current-run evidence |
| --- | --- | --- |
| Native macOS Reduced Motion | `OPEN` | Original setting was read as `0`. The system preference write was rejected by macOS and the native System Settings window was not exposed to the controllable display session. No query parameter or media emulation was substituted. |
| Real browser 200% zoom | `NOT OBSERVABLE` | Page-level keyboard dispatch did not change `innerWidth` or `devicePixelRatio`; browser-chrome zoom control was not exposed. No CSS zoom or scripted emulation was used. |
| 320 px viewport | `NOT OBSERVABLE` | No legal real browser-window resize channel was exposed. |
| 360 px viewport | `NOT OBSERVABLE` | Same limitation. |
| 390 px viewport | `NOT OBSERVABLE` | Same limitation. |
| 430 px viewport | `NOT OBSERVABLE` | Same limitation. |
| Ownership controls are keyboard-focusable | `PASS` | The unique Crystal button and the continue button both accept keyboard focus and show a visible outline. |
| Full native Tab traversal order | `OPEN` | The browser evidence channel could target and display focus, but it did not expose a trustworthy browser-global Tab traversal starting at the document boundary. DOM order alone was not promoted to a native traversal pass. |
| Refresh recovery | `PASS` | Same Crystal and Formation references recovered as `RECOVERED_EXISTING`; live status remained empty and no first-formation replay was observed. |
| Back recovery | `PASS` | Back from Archive restored the same Ownership surface, Crystal and Formation references. |
| Forward recovery | `PASS` | Forward restored Archive with `XINMAI_BODY:1qdewne`, `BODY_IMPRINT:16d2eug` and one canonical imprint. |
| Direct URL: Archive | `PASS` | Archive recovered the same canonical body/imprint and one accessible archive entry under the single Scene Host. |
| Direct URL: Reality | `PASS` | Terminal intent was safely withheld; Scene outcome was `CONTINUOUS_SCENE_SAFE_WITHHELD`, presenter count `0`, and the native exit control remained enabled. |
| Background RAF pause / resume | `NOT OBSERVABLE` | The product tab could not be made natively hidden through the legal browser channel; `document.hidden` remained `false`. No visibility injection was used. |
| Save-Data | `NOT OBSERVABLE` | The legal page-observation channel did not expose `Navigator.connection`. No network-condition emulation was used. |

## Accepted screenshots

1. `03-visible-user-tab-ownership.jpg` — stable Ownership recovery on the immutable Production bundle.
2. `05-crystal-keyboard-focus.jpg` — visible focus ring on the unique Crystal button.
3. `07-continue-keyboard-focus.jpg` — visible focus ring on the continue button.
4. `08-refresh-recovery.jpg` — refresh restores the same Ownership state without live-status replay.
5. `09-direct-archive.jpg` — direct Archive recovery with one canonical body imprint.
6. `10-back-restores-ownership.jpg` — Back restores the same Ownership state.
7. `11-forward-restores-archive.jpg` — Forward restores Archive and the same body/imprint references.
8. `12-direct-reality-safe-withheld.jpg` — direct Reality access is safely withheld with an enabled native control.

## Accessibility and visual findings

- Ownership exposes exactly one named Crystal button with `aria-pressed=false` and one named continue button in the accessible tree.
- Both primary controls show a distinct focus outline against the dark surface.
- Refresh recovery leaves the polite live region empty, so the first-formation announcement is not replayed by the product state.
- Direct Reality access does not expose a false scene success or a hidden hit target.
- At the observed 914 px viewport, `scrollWidth == clientWidth`; no horizontal overflow was present.
- The exact 200% and 320–430 px reflow claims remain open because a real browser-chrome resize/zoom channel was unavailable.

## Integrity and delivery status

- Runtime/Gate/CSS/copy differences: `0`
- Candidate evidence worktree was clean before this document.
- Main worktree's existing 34 user changes, including `public/brand/`, were not touched.
- This document is the only intended local commit content.
- Push: `HOLD`
- Desktop Phase 3 Release Readiness: `OPEN`
- Android Release: `OPEN`

## Minimum remaining desktop evidence

1. A native macOS browser window that can be placed at true 200% and exact 320/360/390/430 px viewports.
2. Native macOS Reduced Motion control visible to the evidence session, followed by same-asset static-presenter verification and restoration.
3. A browser-global keyboard channel for uninterrupted Tab traversal.
4. A legal visibility transition and a browser exposing `Navigator.connection` if Save-Data is to be observed rather than recorded as unsupported.
