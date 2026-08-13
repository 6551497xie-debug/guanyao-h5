# XINMAI 1.0 — Identity → First Encounter → Relationship

## Product Control Tower decision

This blade closes the first formal relationship continuity gap. Identity answers **which independent cosmic life the user has found**. First Encounter records **whether the user shared a short expression or chose silence, and what observable response followed**. Relationship becomes available only after that exchange is explicitly confirmed. Identity by itself is never Relationship.

The world axiom remains frozen:

> Birth is not the beginning of the other life. Birth is the beginning of your encounter.

## Construction judgment table

| Control question | Frozen answer |
| --- | --- |
| World layer | Identity + Relationship |
| Product phase | Phase 1 → Phase 2 |
| Engines consumed | Existing Life Origin Engine; Life Companion relationship projection |
| Existing Runtime | Recognized identity and optional Naming already existed; canonical First Encounter/Relationship recovery did not |
| Asset impact | One bounded versioned receipt in the existing session container; no raw whisper; no Identity or Naming rewrite |
| Blade class | Authority migration + atomic consumer cutover |
| Completion standard | Recognized identity → expression or chosen silence → typed Star Beast response → explicit companionship confirmation → recoverable Relationship → Reality Intent |

## Frozen journey contract

1. **Identity** — the user recognizes one pre-existing Star Beast identity resolved from the confirmed birth coordinate.
2. **First Encounter** — the user either shares a temporary whisper or explicitly chooses silence.
3. **Response** — the product records only a bounded observable response outcome: motion, static presence, explicitly accepted unavailable response, or held silence.
4. **Relationship** — the user presses `确认同行，进入现实`; only then is one immutable First Encounter receipt written.
5. **Reality handoff** — a new Reality Intent can be requested only after that receipt succeeds.

Private expression is presentation-only. Its text is cleared and never persisted. The receipt stores only the bounded initiation and response outcome.

## Runtime and recovery

- Schema: `XINMAI_LIFE_COMPANION_FIRST_ENCOUNTER_V1`
- Protocol: `XINMAI_LIFE_COMPANION_RELATIONSHIP_2026_08_13_P0`
- Relationship projection: `FIRST_ENCOUNTER_COMPLETED / FIRST_EXCHANGE_ESTABLISHED / MET`
- Naming is not consumed by Relationship Recovery; it remains an independent optional asset and is not an entry gate.
- Identity mismatch, malformed receipt and persistence failure fail closed with typed retryability.
- Repeated command for the same identity recovers the existing receipt instead of creating a second encounter.
- An already-existing pre-migration Reality Intent is accepted only as `LEGACY_HANDOFF`; no receipt is fabricated and no historical whisper is reconstructed.

## Persistence boundary

- Existing persistence container: `guanyao_h5_session`
- Added asset key: `xinmaiLifeCompanionFirstEncounterReceipt`
- IndexedDB, Store, Index and public persisted database schema changes: **0**
- Birth, Identity derivation, optional Naming writer, Pressure Catalog 450, Six-Dimension, Choice, Fact, Crystal and Body authority changes: **0**

## Forward counter

The direct-child Counter changes only:

`XINMAI_LIFE_COMPANION_RELATIONSHIP_RUNTIME_POLICY: ENABLED → SAFE_WITHHELD`

It disables new First Encounter receipt creation while keeping Identity, Naming, existing relationship receipts and existing Reality assets readable. It does not restore Identity-as-Relationship or invent a fallback relationship.

## Acceptance evidence required

- New user: Birth coordinate → Identity recognized → First Encounter expression or silence → Star Beast response → explicit companionship confirmation → Reality.
- Refresh after Relationship confirmation recovers `READY` without Naming.
- Raw whisper is absent from persisted session data.
- Double activation converges on one receipt.
- Missing or corrupted receipt does not pass as Relationship.
- A legacy pre-existing Reality Intent remains readable without backfill.
