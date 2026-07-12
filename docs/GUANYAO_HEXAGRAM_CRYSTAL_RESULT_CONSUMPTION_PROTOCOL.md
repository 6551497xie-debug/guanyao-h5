# GUANYAO Hexagram Crystal Result Consumption Protocol

## 01. Purpose

This protocol defines how `HexagramCrystalResult` enters the next hexagram expression layer.

It is a consumption boundary only.

It does not:

- generate a new 64-hexagram mapping;
- mutate the hexagram matrix;
- render UI;
- write storage;
- create a collectible asset;
- connect 384 yao;
- connect old R8.

## 02. Source Position

The upstream chain is:

```text
currentHexagramProfile
+
PersonaMigrationImpact
↓
HexagramCrystalInput
↓
HexagramCrystalEngineInput
↓
HexagramCrystalEngineService
↓
HexagramCrystalResult
```

`HexagramCrystalResult` is the first stable post-migration hexagram crystal expression result.

## 03. First-stage Identity Rule

In P1, crystal identity may inherit:

- `hexagramCode`;
- `hexagramName`;
- `hexagramTitle`;

from `currentHexagramProfile` through `sourceHexagram`.

This does not mean the final crystal is the initial hexagram result.

The identity is inherited as a stable current-round container, while the change meaning must come from migration input.

## 04. Mandatory Migration Meaning

The following fields must come from migration input:

- `crystalLine`;
- `migrationLine`;
- `dominantShift`;
- `migrationTrace`.

The downstream expression layer must not rebuild these fields from UI copy, storage, or raw `currentHexagramProfile`.

## 05. Consumption Object

`HexagramCrystalResultConsumption` is the boundary object for the next expression layer.

It contains:

- `sourceExpression`;
- `inheritedIdentity`;
- `crystalLine`;
- `migrationLine`;
- `boundary`.

It does not contain:

- UI state;
- route data;
- storage keys;
- 64-matrix mutation instructions;
- score;
- level;
- growth value;
- collectible ownership state.

## 06. Boundary Rules

`HexagramCrystalResultConsumption.boundary` must keep:

```text
canEnterHexagramExpressionLayer = true
canMutateHexagramMatrix = false
canRenderUi = false
canWriteStorage = false
canCreateCollectibleAsset = false
canConnect384 = false
canConnectOldR8 = false
```

This layer prepares expression consumption. It does not become the expression renderer.

## 07. Not Ready Conditions

The result cannot enter the expression layer if:

- `HexagramCrystalResult.status` is not `READY`;
- expression is missing;
- inherited identity is missing;
- `migrationLine` is missing;
- boundary protection is violated.

## 08. Stable Chain

```text
HexagramCrystalResult
↓
HexagramCrystalResultConsumption
↓
Future Hexagram Expression Layer
```

The future expression layer may format, select visual language, or prepare asset expression, but it must not recalculate persona migration.
