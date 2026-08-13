# XINMAI 1.0 — Isolated WebGL Renderer Prototype Slice Canvas Capability Release Gate Ownership Re-audit P0

## Verdict

**A. CORRECTIVE APPLICATION READY — ONE B-CLASS CANVAS MODERNIZATION AND ONE C-CLASS LEXICAL RETIREMENT**

Audit only. Renderer, prototype facade, Canvas Consumer, page, route, CSS, Runtime, Authority, DB, Store, schema, Catalog, and Gate implementation are unchanged in this blade.

## Earliest Release failure

`check-isolated-webgl-renderer-prototype-slice` constructs this non-null Canvas double:

```js
Object.freeze({ getContext: () => null })
```

The current shared Renderer reads the typed Canvas surface before selecting its semantic fallback:

```ts
input.canvas?.hasAttribute("data-reality-life-universe-renderer") === true
```

The Gate therefore throws `TypeError: input.canvas?.hasAttribute is not a function` instead of reaching its expected `WEBGL2_UNAVAILABLE` result.

## Ownership decision

The failure is **B — Consumer Contract**.

`GenesisWebGLRendererCoreInput.canvas` is typed as `HTMLCanvasElement | null`. Formal Consumers pass an actual `HTMLCanvasElement`. The Gate is a Consumer of the same public core contract, but its JavaScript-created structural double bypasses TypeScript and implements only one member.

`hasAttribute()` is not accidental presentation detail. The shared Renderer uses Canvas attributes to distinguish the Reality surface and Life-Origin discovery surface without importing page identity. Removing or weakening that check would change formal scene routing.

For the isolated no-WebGL case, the correct test answer is `hasAttribute: () => false`: the double represents neither formal surface and must then continue to `getContext()`, returning the expected typed fallback.

No synthetic Reality attribute may be added. No production guard may convert arbitrary non-Canvas objects into accepted Canvas inputs.

## Masked lexical failure

Replaying the proposed Canvas correction revealed a second pre-existing failure that the original uncaught TypeError had prevented the Gate from reporting:

`P99 Renderer stays identity blind forbidden=fourSymbol`

The shared Renderer legally consumes the reviewed `fourSymbolDirectionFieldVisualCalibration` visual projection. It does not call the Four-Symbol identity engine or infer identity. The broad substring ban therefore confuses a typed downstream visual calibration with upstream identity ownership.

This assertion is **C — Legacy Prototype Detail**, not A. The corrective must retire the single broad `fourSymbol` lexical assertion while preserving the specific bans on identity resolvers, `MotherCode`, `mansionName`, `animalIdentity`, animal labels, and Storage.

## Full Gate classification

All 138 expanded logical assertions are classified in:

`docs/release-gates/ISOLATED_WEBGL_RENDERER_PROTOTYPE_SLICE_ASSERTION_CLASSIFICATION_REGISTER_P0.md`

| Class | Count | Disposition |
|---|---:|---|
| A — Canonical Fact | 41 | KEEP |
| B — Consumer Contract | 62 | KEEP; modernize the one failing Canvas double |
| C — Legacy Presentation / Prototype Detail | 35 | RETIRE from Release ownership enforcement |
| D — Unknown / Ambiguous | 0 | None |
| Total | 138 | Fully classified |

## C-class boundary

The C-class assertions freeze exact Three.js primitives/import topology, the original P98/P99 experiment wording, obsolete “no production/UI/runtime integration” declarations, exact dependency exclusivity, and legacy authorization fixtures. They describe how the first prototype was implemented, not the current shared Renderer’s canonical public behavior.

Retiring these assertions does not delete the prototype, protocol, dependency, or renderer code. It only prevents retired implementation history from owning the Release decision.

## Frozen corrective scope

The next corrective may modify only:

- `scripts/check-isolated-webgl-renderer-prototype-slice.mjs`
- corrective evidence documentation

It must:

1. retain all 41 A-class facts;
2. retain all 62 B-class contracts;
3. update the no-WebGL Canvas double to satisfy the current non-Reality `HTMLCanvasElement` capability boundary;
4. retire all 35 C-class legacy implementation/protocol assertions, including the broad `fourSymbol` lexical ban, from Release ownership enforcement;
5. preserve identity blindness, deterministic projection, typed fallback, authorization boundary, viewport validation, no Storage ownership, and Consumer isolation;
6. run the dedicated Gate and full Release lifecycle;
7. stop at the next independent owner failure.

It must not:

- edit `genesisWebGLRendererCore.ts` or its public input type;
- weaken or remove formal Canvas surface detection;
- add a synthetic Reality/Life-Origin attribute to the test double;
- modify product pages, routes, CSS, Runtime, Authority, DB, Store, schema, or Catalog;
- push or promote.

## Next exact blade

`XINMAI-1.0-ISOLATED-WEBGL-RENDERER-PROTOTYPE-SLICE-CANVAS-CAPABILITY-RELEASE-GATE-OWNER-MODERNIZATION-CORRECTIVE-P0`

Traffic: **YELLOW / GATE EVIDENCE ONLY**

Expected parent: this audit commit

Push: **HOLD**
