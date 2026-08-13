# XINMAI 1.0 — Product Release Acceptance P0

## Exit

**RED — RELATIONSHIP RECOVERY CONSUMER / LIFECYCLE OWNERSHIP RECONCILIATION REQUIRED**

Candidate: `977be88067c13f7c0b53ce0ce0a5135900eb0520`  
Acceptance branch: `codex/xinmai-1-0-product-release-acceptance-p0`  
Push: **HOLD**

## Engineering baseline

- Full registered Release suite: **PASS** (`exit 0`).
- TypeScript + Production Build: **PASS**, 436 modules.
- Hashed Production origin: `http://127.0.0.1:5652`.
- Main JS: `index-_MBwC12m.js`.
- Main CSS: `index-DAwlB2wY.css`.
- Browser application errors/warnings: **0**.

## Visible first-run acceptance

The official visible product controls completed:

`Launch → 校准相遇坐标 → Genesis → 开始寻找远方生命 → 认出这个生命 → 确认同行 → 关系安全保存`

Input used: `1990-01-15 10:00`.  
Visible identity: `东方青龙 · 角宿`.

The terminal Relationship surface correctly stated:

- `你已经认出彼此，也确认从这里开始同行。`
- `你们的关系已经安全保存。`
- Naming and Reality were not started automatically.

## Release blocker

After a normal browser refresh on `/genesis`, the formal Consumer returned to:

1. `星河正在寻找你的生命坐标`;
2. `开始寻找远方生命`;
3. `认出这个生命`.

It did not restore the already confirmed Relationship terminal surface. The user is therefore asked to repeat First Encounter and recognition even though the previous screen claimed the canonical relationship was safely saved.

## Earliest typed ownership break

`XinmaiLifeCompanionRelationshipActivationSurface` owns canonical relationship recovery, but it is mounted only after page-local First Encounter and recognition prerequisites become ready. `GenesisProductionExperiencePage` does not recover the canonical Relationship early enough to select the returning Relationship presentation path.

Consequently:

- Writer/Store recovery may exist;
- the formal page Consumer cannot use it until the user repeats the very actions the recovered relationship should supersede;
- persisted Relationship and visible lifecycle presentation diverge after refresh.

This is a genuine Consumer/lifecycle ownership conflict, not a visual refinement or Gate wording issue.

## Frozen scope

No Runtime correction was attempted. The acceptance blade changed no Product, Authority, Store, Schema, Page, CSS, or Gate implementation.

The next review must decide the single returning-Relationship presentation owner, recovery timing, idempotent refresh/back behavior, and the legal transition from an existing Relationship to the completed Phase boundary. It must not backfill, duplicate the Relationship, or infer Relationship from Naming/Whisper/Reality.

## Decision

Product Release promotion: **BLOCKED**.  
Architecture Review re-entry: **REQUIRED**, limited to Relationship recovery Consumer/lifecycle ownership.

