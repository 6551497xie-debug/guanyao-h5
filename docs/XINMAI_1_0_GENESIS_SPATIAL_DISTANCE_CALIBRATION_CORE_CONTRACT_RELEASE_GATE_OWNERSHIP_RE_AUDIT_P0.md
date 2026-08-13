# XINMAI 1.0 — Genesis Spatial Distance Calibration / Core Contract Release Gate Ownership Re-audit P0

## Verdict

**B. FORMAL BRIDGE TYPE MODERNIZATION READY — NARROW GATE CORRECTIVE REQUIRED**

Push: **HOLD**. This blade is audit-only.

## Earliest break

P44 requires the formal Renderer input and scene contracts to use the original authoring type `GenesisSpatialDistanceCalibration`. The Production Visual Calibration Bridge deliberately exposes `GenesisSpatialDistanceCalibrationCore = Omit<GenesisSpatialDistanceCalibration, "isolatedPrototypeOnly">`, and the formal Renderer Core consumes that bridge type in both fields.

The two failures are stale exact type-name assertions. The typed input, scene field, Runtime mapping, visual consumption, and source-only safeguards all exist and pass.

## A / B / C / D result

- A — Canonical Fact: 74, KEEP.
- B — Consumer Contract: 12, KEEP; modernize two exact Renderer contract assertions to `GenesisSpatialDistanceCalibrationCore`.
- C — Legacy Presentation Detail: 0.
- D — Unknown / Ambiguous: 0.
- Total: 86 assertions.

The exact classification is frozen in `docs/release-gates/GENESIS_SPATIAL_DISTANCE_CALIBRATION_ASSERTION_CLASSIFICATION_REGISTER_P0.md`.

## Corrective boundary

Allowed: update exactly the two formal Renderer type markers in P44.

Forbidden: change the bridge definition, calibration semantics, Renderer, Runtime, Authority, DB, Store, Schema, pages, CSS, or visual output.

## Exit

`APPLICATION READY — SINGLE NARROW RELEASE-GATE CONTRACT CORRECTIVE`

