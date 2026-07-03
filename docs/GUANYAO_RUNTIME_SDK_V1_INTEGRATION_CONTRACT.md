# Guanyao Runtime SDK v1.0 Integration Contract

## Official Contract

The only official external usage contract is:

```ts
const ecosystem = createGuanyaoEcosystem();
const instance = ecosystem.spawn(snapshot);
const result = ecosystem.execute(instance, intent);
const view = ecosystem.inspect(result);
```

## Input Contract

External consumers provide:

- `ExecutionSnapshot`
- `RuntimeIntent`

Rules:

- snapshot is immutable input
- intent must be governed structure
- consumers must not rely on internal graph, kernel, plugin, or governance implementation

## Output Contract

External consumers receive:

- updated `ExecutionSnapshot`
- derived `RuntimeProjection`

Rules:

- projection is derived from snapshot
- projection is not a state store
- projection must not be used to mutate execution state

## Boundary Contract

Inside SDK:

- engine core
- execution kernel
- intent governance
- plugin pipeline
- graph system
- coherence validation

Outside SDK:

- ecosystem API
- snapshot interface
- intent interface
- projection output

No cross-boundary access is allowed.

## Hidden Internals

The following are implementation details and are not part of the public contract:

- `executionKernel`
- `sceneGraph`
- `interactionGraph`
- `intentEngine`
- `pluginPipeline`
- `coherenceValidator`
- plugin registry internals
- orchestrator internals

## Determinism Contract

Given:

- identical initial snapshot
- identical intent sequence

The SDK must produce:

- identical execution result
- identical projection output

Strictly forbidden:

- randomness
- timer dependency
- external clock dependency
- DOM dependency
- React lifecycle dependency
- browser storage dependency
- hidden mutable global runtime state

## Multi-Instance Isolation

Each ecosystem instance is isolated by snapshot boundary.

Rules:

- no shared mutable runtime state
- no cross-instance contamination
- no retained execution history
- no hidden cache

## Plugin Safety Contract

Plugins are internal and additive only.

Rules:

- plugins cannot override final execution snapshot
- plugins cannot bypass intent governance
- plugins cannot mutate snapshot in place
- plugins cannot introduce timing or randomness into the public contract
- plugin pipeline is not exposed as public API

## Failure Mode Contract

Safe failure states:

- invalid intent -> `NOOP` or rejected command
- inconsistent snapshot -> validation failure
- plugin conflict -> ignored, no execution override

The SDK should never fail unpredictably because of malformed external input.

## Versioning Contract

Current version:

```text
Guanyao Runtime SDK v1.0.0
```

Rules:

- v1.0.0 is the frozen production baseline
- v1.1+ may add backward-compatible extensions only
- breaking changes are not allowed in v1.x
- SDK evolution must happen by extension, not mutation

