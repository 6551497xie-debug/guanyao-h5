# GUANYAO Pressure Upper Trigram Mapping Protocol

## 01. Protocol Purpose

This protocol locks the boundary between:

```text
Pressure Seed

Pressure Field

Pressure Seed Classification

Upper Trigram

CurrentHexagramProfile

Hexagram Crystal
```

It clarifies that `PressureField` describes pressure strength and window.

It does not directly generate the upper trigram.

The upper trigram is formed by pressure-seed classification after the pressure seed is read through the current-round semantic classifier.

## 02. Pressure Field

`PressureField` describes the current pressure environment strength.

It is responsible for:

- `upperFieldWeight`;
- `riskWindow`;
- `gravityValue`;
- pressure intensity;
- pressure duration;
- current pressure window.

It answers:

```text
How strongly is this pressure field acting in this round?
```

It is not responsible for:

- choosing the upper trigram directly;
- generating a final hexagram crystal;
- deciding whether persona migration has happened;
- replacing pressure-seed classification.

In earlier engineering language, `PressureField` was referenced by `upperSource`, but its real role is field strength and window, not direct upper-trigram selection.

## 03. Pressure Seed

`PressureSeed` is the structured expression of a real pressure.

It carries:

- `surface`;
- `shell`;
- `pressureNature`;
- `primaryRelation`;
- `mappingHint`;
- `engineHint`;
- semantic tags;
- current pressure context.

It answers:

```text
What real pressure is entering the user's life system now?
```

It is not:

- a personality label;
- a diagnosis;
- a final result;
- a crystal by itself.

## 04. Pressure Seed Classification

`Pressure Seed Classification` reads the structured pressure seed and identifies the external situation formed by this pressure.

It is responsible for:

- reading pressure-seed semantic material;
- scoring the pressure against the current-round classifier;
- forming `UpperCodeFormation`;
- outputting `upperTrigram`.

It should preserve the three-line classification principle:

```text
pressure seed

↓

personalityDynamicsLine
systemMechanismLine
lifecycleStageLine

↓

external environment type

↓

upperTrigram
```

The pressure seed is not a hardcoded one-step mapping to the upper trigram.

The pressure seed first enters classification.

The classifier then forms the upper trigram.

## 05. Upper Trigram

`Upper Trigram` is the current situation image formed when external pressure enters the user's life system.

It represents:

```text
What external pressure shape is pressing into this round?
```

It is not:

- the final result;
- the hexagram crystal;
- the user's fate;
- the user's completed change;
- a card asset by itself.

It belongs to the pre-crystal layer.

It helps form current-round orientation.

## 06. CurrentHexagramProfile

`CurrentHexagramProfile` is formed by:

```text
mother-code lower trigram

+

pressure upper trigram
```

It answers:

```text
What round am I entering now?
```

It is:

- current-round orientation;
- the structure of this round;
- a bridge into the six-dimension experience.

It is not:

- the completed hexagram crystal;
- the user's final result;
- the final 64 hexagram-code asset;
- proof that persona migration has happened.

## 07. Hexagram Crystal

`Hexagram Crystal` is the expression left after persona migration.

It answers:

```text
What shape did this round leave after the user changed one response?
```

It requires:

- current-round structure from `CurrentHexagramProfile`;
- migration movement from `PersonaMigrationImpact` / `CrystalState`;
- completed transformation context.

It belongs to the post-migration layer.

It must not be confused with the pre-crystal upper trigram.

## 08. Final Causal Chain

The locked causal chain is:

```text
Mother Code

↓

Lower Trigram


Pressure Seed

↓

Pressure Semantic Classification

↓

Upper Trigram


Lower Trigram + Upper Trigram

↓

CurrentHexagramProfile

↓

Six-Dimension Experience

↓

Persona Migration

↓

CrystalState

↓

Hexagram Crystal
```

## 09. Naming Alignment

Earlier engineering treated the upper source as pressure-field-derived.

That was understandable historically, but semantically incomplete.

The recommended future naming is one of:

```text
upperSource: "pressure_seed_classification"
```

or:

```text
upperSource: "pressure_upper_trigram_mapping"
```

Preferred meaning:

```text
PressureField = pressure strength and risk window

PressureSeedClassification = upper-trigram formation
```

## 10. Boundary Guard

Do not treat `PressureField` as the direct upper-trigram generator.

Do not treat `PressureSeed` as a final asset trigger.

Do not treat `UpperTrigram` as the final result.

Do not treat `CurrentHexagramProfile` as a completed crystal.

Do not treat `HexagramCrystal` as the cause of the current round.

## 11. Engineering Evolution Route

Future alignment may proceed as:

```text
docs protocol

↓

type naming review

↓

upperSource semantic alignment

↓

optional PressureUpperTrigramMapping service boundary

↓

GravityPage language remains current-round orientation
```

This protocol does not require immediate code changes.

It only locks the semantic boundary for future implementation.
