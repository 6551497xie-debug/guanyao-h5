# XINMAI 1.0 — Genesis Four-Symbol Alignment Projection / Renderer Contract Release Gate Ownership Re-audit P0

## Verdict

**A. CORRECTIVE APPLICATION READY — FORMAL RENDERER OWNER MUST REPLACE THE LEGACY ALIAS OWNER**

Audit only. Gate, projection, Renderer, Runtime, Authority, persistence, pages, and CSS are unchanged. Push: **HOLD**.

## Earliest failure

`P105 renderer contract carries alignment missing=morphologicalFieldAlignment: GenesisFourSymbolAlignmentProjection | null`

P105 searches the obsolete concrete shape in `isolatedWebGLRendererPrototype.ts`, which now aliases `GenesisWebGLRendererCoreSceneProjection`. The exact typed field remains in `src/types/genesisWebGLRendererCore.ts`; the formal Core consumes it and the Production Host supplies it from the real-user projection bundle.

The product fact remains intact. The Release assertion points at the wrong Owner.

## Classification

All 84 assertions and all discovered Consumers are classified in:

`docs/release-gates/GENESIS_FOUR_SYMBOL_ALIGNMENT_PROJECTION_ASSERTION_CLASSIFICATION_REGISTER_P0.md`

| Class | Count | Decision |
|---|---:|---|
| A — Canonical Fact | 59 | KEEP |
| B — Consumer Contract | 13 | KEEP / MODERNIZE formal owner target |
| C — Legacy Detail | 12 | RETIRE |
| D — Unknown | 0 | None |

The C set is limited to prototype ownership and exact protocol/prototype wording. Specific no-animal-identity, no-animal-geometry, no-Mother-Code, no-personal-Star-Beast, source-role, generic-morphology, no-Storage, and no-mutation facts remain protected.

UNKNOWN Consumer/Owner matches: **0**.

## Frozen corrective

The next corrective may change only:

- `scripts/check-genesis-four-symbol-alignment-projection.mjs`
- corrective evidence documentation

It must retain A59/B13, retire C12, target the formal Renderer Core/Production Host, import the runtime scene projection directly from the Core, run the dedicated Gate and full Release, and stop at the next independent failure.

Product/Renderer/projection/Runtime/Authority/DB/Store/schema/page/CSS changes are forbidden.

## Next exact blade

`XINMAI-1.0-GENESIS-FOUR-SYMBOL-ALIGNMENT-PROJECTION-FORMAL-RENDERER-CONSUMER-RELEASE-GATE-OWNER-MODERNIZATION-CORRECTIVE-P0`

Traffic: **YELLOW / GATE EVIDENCE ONLY**  
Push: **HOLD**
