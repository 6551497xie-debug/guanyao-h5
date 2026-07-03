# Guanyao Runtime SDK v1.0

## What This Is

Guanyao Runtime SDK v1.0 is a deterministic spatial behavior execution system based on:

- immutable `ExecutionSnapshot`
- governed `RuntimeIntent`
- plugin-augmented but non-authoritative runtime internals
- deterministic execution kernel
- projection output for UI or headless consumers

Core principle:

```text
Input (ExecutionSnapshot + RuntimeIntent)
-> Deterministic Engine
-> Output (ExecutionSnapshot + RuntimeProjection)
```

## Official Entry Point

The official public entry point is:

```ts
createGuanyaoEcosystem()
```

External consumers should not depend on runtime internals such as the execution kernel, graph system, plugin pipeline, intent governance internals, or orchestration helpers.

## Canonical Usage

```ts
import { createGuanyaoEcosystem } from "@guanyao/runtime-engine";

const ecosystem = createGuanyaoEcosystem();

const instance = ecosystem.spawn(snapshot);

const result = ecosystem.execute(instance, intent);

const view = ecosystem.inspect(result);
```

## Mental Model

Guanyao System has four public mental layers:

1. Input Layer
   - `ExecutionSnapshot`
   - `RuntimeIntent`

2. Engine Layer
   - deterministic execution kernel
   - governed intent resolution
   - plugin-augmented internals that cannot override execution outcome

3. State Layer
   - `ExecutionSnapshot` as the single source of truth

4. Output Layer
   - `RuntimeProjection` as derived rendering and consumer data

## Supported Consumers

The SDK is suitable for:

- headless runtime systems
- simulation engines
- AI orchestration systems
- deterministic execution pipelines
- external embedding systems

The SDK does not assume a UI, DOM, browser lifecycle, React runtime, timer, random source, or external clock.

## Public API

### Ecosystem API

```ts
createGuanyaoEcosystem()
ecosystem.spawn(snapshot)
ecosystem.execute(instance, intent)
ecosystem.inspect(instance)
ecosystem.destroy(instance)
```

### Data Contracts

```ts
ExecutionSnapshot
RuntimeIntent
RuntimeProjection
EcosystemInstance
EcosystemInspection
```

## Guarantees

1. Determinism Guarantee
   - identical snapshot plus identical intent sequence produces identical snapshot and projection output

2. Isolation Guarantee
   - multiple ecosystem instances do not share mutable runtime state

3. Immutability Guarantee
   - snapshots are cloned and treated as immutable boundaries

4. Plugin Safety Guarantee
   - plugins are internal, additive, and cannot replace the final execution result

5. Framework Independence Guarantee
   - no React, DOM, browser storage, timer, randomness, or external clock dependency is required by the SDK contract

## Safe Failure Modes

- invalid intent -> `NOOP` or rejected command
- inconsistent snapshot -> validation failure
- plugin conflict -> ignored, with no execution override

The runtime fails safely. It should never produce unpredictable execution behavior from invalid input.

## Boundaries

Exposed to consumers:

- ecosystem API
- snapshot interface
- intent interface
- projection output

Hidden implementation:

- execution kernel
- intent governance internals
- plugin pipeline
- graph system
- coherence validator
- orchestration internals

## Versioning

Guanyao Runtime SDK v1.0.0 is the frozen production contract.

Version rules:

- `v1.0.0` is the immutable baseline
- `v1.1+` may add backward-compatible extensions only
- no breaking changes are allowed in the `v1.x` line
- SDK evolution must happen through extension, not mutation

## What This System Is

Guanyao Runtime SDK is:

> A deterministic spatial behavior execution system based on immutable state transformation and governed intent resolution.

## What This System Is Not

It is not:

- a React component library
- a route system
- a UI framework
- a storage system
- a commercial/paywall layer
- a random simulation engine
- a timer-driven animation runtime
- a public plugin marketplace

