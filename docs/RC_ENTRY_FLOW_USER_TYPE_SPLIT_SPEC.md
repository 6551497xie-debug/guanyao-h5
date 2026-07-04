# RC-ENTRY-FLOW-USER-TYPE-SPLIT-SPEC-P0

## 1. Purpose

This document defines the entry split between new-user onboarding and returning-user pressure entry.

It does not add a new product model, UI layer, route, runtime engine, or narrative system.

The only purpose is to clarify when the system should use:

- New User Path: 光兽 -> 原始坐标装填 -> 压力种子
- Returning User Path: 光兽 -> 压力种子

## 2. Core Entry Principle

The entry system must remain a single coherent experience:

```text
光兽出现
-> 用户进入
-> 系统装填当前所需输入
-> 压力种子进入 /dynamics
```

The split is only about input readiness:

- New user has no baseline input.
- Returning user already has baseline input and only needs current pressure.

## 3. User Type Boundary

### 3.1 New User

Definition:

A new user is a user without an existing local baseline entry context.

Allowed path:

```text
光兽
-> 原始坐标装填
-> baseline entry context created
-> 压力种子
-> /dynamics
```

Entry condition:

- No valid baseline entry context exists.
- No completed original-coordinate loading record exists.
- The system cannot safely infer the baseline input.

Visual meaning:

- 光兽 is the entry mirror.
- 原始坐标装填 is baseline calibration.
- The coordinate axis represents initial alignment, not current pressure.
- The axis should feel stable, measured, and foundational.

Forbidden:

- Do not present original-coordinate loading as pressure seed selection.
- Do not use pressure seed language before baseline entry context exists.
- Do not imply identity, destiny, origin mythology, or persona classification.

### 3.2 Returning User

Definition:

A returning user is a user with an existing valid baseline entry context.

Allowed path:

```text
光兽
-> 压力种子
-> /dynamics
```

Entry condition:

- Valid baseline entry context exists.
- The system can proceed directly to current pressure capture.

Visual meaning:

- 光兽 is the current-state mirror.
- 压力种子 is the active pressure input.
- The pressure axis represents current pressure selection and loading.
- The axis should feel responsive, charged, and state-driven.

Forbidden:

- Do not force returning users through original-coordinate loading.
- Do not expose baseline calibration language in pressure seed selection.
- Do not make pressure seed selection look like birth/original-coordinate input.

## 4. State Machine Boundary

### New User State Chain

```text
STARFIELD_IDLE
-> ASSEMBLY
-> FORMATION
-> APPROACH
-> READY
-> STARBEAST_SANDIFY
-> AXIS_EMERGENCE
-> TIME_CALIBRATION
-> GEO_BIND
-> DISPLAY_LOCK
-> ENTRY_PRE_COLLAPSE
-> ENTRY_LIGHT_CONVERGENCE
-> ENTRY_STATIC_RENDER
-> PRESSURE_CANVAS_ACTIVE
-> SEED_SELECTED
-> SNAPSHOT_GENERATED
-> DYNAMICS_HANDOFF
```

Meaning:

The beast can dissolve into the original-coordinate axis only for new users.

### Returning User State Chain

```text
STARFIELD_IDLE
-> ASSEMBLY
-> FORMATION
-> APPROACH
-> READY
-> PRESSURE_CANVAS_ACTIVE
-> SEED_SELECTED
-> SNAPSHOT_GENERATED
-> DYNAMICS_HANDOFF
```

Meaning:

The beast proceeds directly into current pressure capture for returning users.

## 5. Visual Semantic Boundary

### Original Coordinate Loading

Allowed visual grammar:

- stable axis
- slow calibration points
- warm-gold confirmation
- foundational baseline tone

Semantic role:

```text
baseline calibration
```

It must not mean:

- current pressure
- transformation trigger
- asset generation
- identity/persona/origin classification

### Pressure Seed Loading

Allowed visual grammar:

- pressure scan
- active seed selection
- current state loading
- responsive axis or charged field

Semantic role:

```text
current pressure capture
```

It must not mean:

- birth/original coordinate
- permanent identity
- personality label
- destiny or origin mapping

## 6. Color Boundary

The color system must stay coherent but can express different input roles.

### Shared Base

- deep starfield background
- cool white star light
- warm gold completion / lock

### New User Calibration

- warm gold = baseline lock
- muted white = calibration state
- axis motion = measured alignment

### Returning User Pressure Capture

- cool white = readable current state
- charged blue/cyan = pressure scan only
- warm gold = selected seed lock

Rule:

Blue/cyan must never imply original-coordinate identity. It can only represent pressure scanning or current-state detection.

## 7. Copy Boundary

### New User Copy

Allowed:

- 原始坐标装填
- 基准已校准
- 光兽正在靠近
- 进入压力

Forbidden:

- 人格
- 命运
- 星源
- 出生解释
- 被定义

### Returning User Copy

Allowed:

- 当前压力
- 压力种子
- 状态已识别
- 点击光兽

Forbidden:

- 原始坐标
- 出生地
- 出生时段
- 永久身份
- 人格类型

## 8. Handoff Rule

Both paths must converge before /dynamics:

```text
selectedPressureSeedContext
-> ExecutionSnapshot
-> /dynamics
```

The /dynamics page must not care whether the user came from new-user calibration or returning-user pressure capture.

The only allowed downstream input is the pressure-derived runtime context.

## 9. Implementation Guardrails

This spec does not authorize:

- UI redesign
- new route
- new runtime engine logic
- new state model
- new narrative system
- commercial logic

Future implementation may only:

- choose which entry path to run
- clarify path-specific copy
- clarify path-specific visual semantics
- preserve the current /dynamics handoff

## 10. Final Decision

The entry system must be interpreted as:

```text
New User:
光兽 -> 原始坐标装填 -> 压力种子 -> /dynamics

Returning User:
光兽 -> 压力种子 -> /dynamics
```

This split is now the official entry-flow boundary for the next implementation pass.
