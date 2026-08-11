# XINMAI 1.0 NOT_ATTEMPTED Return Checkpoint Plain-Language Corrective Evidence P0

## Delivery identity

- Expected parent: `a74a09cf3e58d356beeed29ed549f5a54ffbce53`
- Scope: presentation consumer, checkpoint CSS, and directly registered gates only
- Authority / DB / Store / Schema / Writer delta: `0`
- Push: `HOLD`

## Before → after DOM contract

Parent presentation exposed a generic checkpoint header above a second confirmation card and used the visible phrases `这一次还没有尝试`, `不会形成 Fact 或 Crystal`, `回到生活，之后再来`, and `现在重新确认`.

Corrected Production DOM exposes one decision group while a no-record resolution is pending:

```text
你准备带回生活的这一步
<exact actionSummary>

还没有在现实里试过，也没关系。
这次不会留下成长记录。你可以先把这一步带回生活，真正试过以后再回来；如果刚才选错了，也可以返回重新选择。

先回到生活
保留这一步，不留下成长记录；等你真正试过，再从返回入口继续。
返回重新选择
```

`USER_REJECTED_RECORD` uses the same hierarchy with its distinct decision:

```text
不想留下这次记录，也可以。
确认不记录，回到生命世界
返回重新选择
```

The generic header and multi-choice switcher are withheld only while `pendingNoFactResolution` is active. Public pending-state copy contains no `Fact` or `Crystal` terminology.

## Action and Authority evidence

| Branch/action | Consumer behavior | Authority behavior |
|---|---|---|
| NOT_ATTEMPTED / `先回到生活` | Calls the existing `resolveWithoutFact("NOT_ATTEMPTED")` path | No Fact, Crystal, Formation Receipt, or Body Imprint is created |
| USER_REJECTED_RECORD / `确认不记录，回到生命世界` | Calls the existing `resolveWithoutFact("USER_REJECTED_RECORD")` path | No Fact, Crystal, Formation Receipt, or Body Imprint is created |
| Either branch / `返回重新选择` | Runs only `setPendingNoFactResolution(null)` | No Authority command or persistence mutation |

Clean hashed Production interaction confirmed that the secondary action restores the three prior lived-response choices and that NOT_ATTEMPTED returns to the same action summary with `这一步仍会等你` feedback. Runtime error/warning log count was `0`.

## Mechanical evidence

- `npm run build`: PASS (TypeScript project build + Production Vite build)
- `npm run check:xinmai-not-attempted-return-checkpoint-plain-language`: PASS
- `npm run check:xinmai-lived-response-visible-checkpoint`: PASS
- `npm run check:xinmai-visual-semantic-experience-atomic-cutover`: PASS
- `npm run check:xinmai-lived-growth-authority`: PASS
- `git diff --check`: PASS

## Visual evidence boundary

The available in-app capture surface reported `innerWidth=278`, `innerHeight=603`, and `document.scrollWidth=320` even after requesting `390×844`. It cannot certify native `390×844` or `320×568` screenshots. No capped image is represented as native device evidence. Uncapped manual-device screenshots remain required for final visual acceptance; CSS and direct gates freeze 44px targets, visible focus, safe-area handling, overflow wrapping, and native Reduced Motion semantic parity.
