# Guanyao Runtime SDK v1.0 Examples

## Example 1: Headless Node Progression

```ts
import { createGuanyaoEcosystem } from "@guanyao/runtime-engine";
import type { RuntimeIntent } from "@guanyao/runtime-engine";

const ecosystem = createGuanyaoEcosystem();
const instance = ecosystem.spawn(snapshot);

const advanceIntent: RuntimeIntent = {
  type: "NODE_ADVANCE_REQUEST",
  payload: {
    context: "focus",
  },
};

const next = ecosystem.execute(instance, advanceIntent);
const view = ecosystem.inspect(next);

console.log(view.snapshot.node.current);
console.log(view.projection.cosmicNodeStep);
```

## Example 2: Deterministic Replay

```ts
const ecosystem = createGuanyaoEcosystem();
const instance = ecosystem.spawn(snapshot);

const intents = [
  { type: "NODE_ADVANCE_REQUEST", payload: { context: "focus" } },
  { type: "NODE_ADVANCE_REQUEST", payload: { context: "focus" } },
  { type: "NODE_ADVANCE_REQUEST", payload: { context: "focus" } },
] as const;

const finalA = intents.reduce((current, intent) => ecosystem.execute(current, intent), instance);
const finalB = intents.reduce((current, intent) => ecosystem.execute(current, intent), instance);

console.log(ecosystem.inspect(finalA).projection);
console.log(ecosystem.inspect(finalB).projection);
```

Equivalent input sequences produce equivalent projections.

## Example 3: Multi-Instance Isolation

```ts
const ecosystem = createGuanyaoEcosystem();

const bodyInstance = ecosystem.spawn(bodySnapshot);
const motivationInstance = ecosystem.spawn(motivationSnapshot);

const bodyResult = ecosystem.execute(bodyInstance, {
  type: "NODE_ADVANCE_REQUEST",
  payload: { context: "focus" },
});

const motivationView = ecosystem.inspect(motivationInstance);
const bodyView = ecosystem.inspect(bodyResult);

console.log(bodyView.snapshot.primaryDimension);
console.log(motivationView.snapshot.primaryDimension);
```

The motivation instance is not affected by body instance execution.

## Example 4: Projection for Any Renderer

```ts
const ecosystem = createGuanyaoEcosystem();
const instance = ecosystem.spawn(snapshot);
const view = ecosystem.inspect(instance);

renderWhateverYouWant({
  primaryDimension: view.snapshot.primaryDimension,
  sixDimensionState: view.projection.cosmicSixDimensionState,
  narrativePhase: view.projection.cosmicNarrativePhase,
  starbeastFeedback: view.projection.starbeastFeedback,
});
```

The SDK does not require React, DOM, browser APIs, or a route system.

## Example 5: Safe Invalid Intent Handling

```ts
const ecosystem = createGuanyaoEcosystem();
const instance = ecosystem.spawn(snapshot);

const result = ecosystem.execute(instance, {
  type: "UNKNOWN_INTENT",
  payload: {},
});

const view = ecosystem.inspect(result);

console.log(view.snapshot);
```

Invalid intent input is resolved through the governed intent layer and should not produce unpredictable behavior.

