# Guanyao Runtime SDK v1.0 Quickstart

## Install

Conceptual package name:

```bash
npm install @guanyao/runtime-engine
```

## Import

```ts
import { createGuanyaoEcosystem } from "@guanyao/runtime-engine";
import type { ExecutionSnapshot, RuntimeIntent } from "@guanyao/runtime-engine";
```

## Create an Ecosystem

```ts
const ecosystem = createGuanyaoEcosystem();
```

The ecosystem is the official public entry point. Consumers should not import or depend on internal kernel, graph, plugin, or governance modules.

## Spawn a Runtime Instance

```ts
const instance = ecosystem.spawn(snapshot);
```

`snapshot` must be an `ExecutionSnapshot`. The runtime treats it as immutable input.

## Execute an Intent

```ts
const intent: RuntimeIntent = {
  type: "NODE_ADVANCE_REQUEST",
  payload: {
    context: "focus",
  },
};

const nextInstance = ecosystem.execute(instance, intent);
```

`execute()` returns a new ecosystem instance with an updated snapshot. It does not mutate the previous instance in place.

## Inspect Projection

```ts
const view = ecosystem.inspect(nextInstance);

console.log(view.snapshot);
console.log(view.projection);
```

`inspect()` derives a projection from the current snapshot. Projection is output data for UI, simulations, or other consumers.

## Full Example

```ts
import { createGuanyaoEcosystem } from "@guanyao/runtime-engine";
import type { ExecutionSnapshot, RuntimeIntent } from "@guanyao/runtime-engine";

const ecosystem = createGuanyaoEcosystem();

const snapshot: ExecutionSnapshot = {
  seed: {
    id: "seed-001",
    text: "A real-world pressure has appeared.",
    category: "body",
    intensity: 0.62,
  },
  primaryDimension: "body",
  beast: {
    active: true,
    resonance: 0,
    tone: "calm",
  },
  node: {
    current: 1,
    completed: [],
    locked: false,
  },
  runtime: {
    isReady: true,
    enginePhase: "SEED_ACTIVE",
    uiPhase: "SEED_ACTIVE",
  },
};

const intent: RuntimeIntent = {
  type: "NODE_ADVANCE_REQUEST",
  payload: {
    context: "focus",
  },
};

const instance = ecosystem.spawn(snapshot);
const result = ecosystem.execute(instance, intent);
const view = ecosystem.inspect(result);

console.log(view.projection);
```

## Deterministic Replay

The same snapshot and the same intent sequence must produce the same final snapshot and projection.

```ts
const first = ecosystem.execute(instance, intent);
const second = ecosystem.execute(instance, intent);

// first and second are equivalent outputs for equivalent inputs.
```

## Safe Failure Behavior

Invalid or unsupported intent input resolves safely through the governed intent layer. Consumers should expect a safe `NOOP` or validation failure rather than undefined behavior.

