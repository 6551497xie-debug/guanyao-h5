# RUE-L0 Audit Incident Report Template P0

This document defines the manual incident report template for RUE-L0 under REAL USER OBSERVATION MODE.

It is a documentation artifact only. It does not implement code, runtime logic, automation, backend behavior, UI behavior, or system expansion.

## 1. PURPOSE

This template is used to record:

> abnormal events that occur while RUE-L0 is running under real user observation.

The template applies when a rollback event, audit FAIL event, or governance-triggered abnormal condition must be recorded manually.

## 2. INCIDENT TYPES

Incident reports must use one or more of the following incident types:

- DATA INTEGRITY FAILURE
- PRIVACY VIOLATION RISK
- METRICS DIVERGENCE
- SYSTEM INSTABILITY
- ROLLBACK TRIGGERED EVENT

These incident types align with the RUE-L0 rollback criteria and audit-only governance boundary.

## 3. INCIDENT REPORT STRUCTURE

Incident reports must follow the structure below.

### A. BASIC INFO

```ts
type RUEIncidentBasicInfo = {
  incidentId: string;
  timestamp: number;
  mode: "REAL USER OBSERVATION" | "MOCK FALLBACK";
  severity: "LOW" | "MEDIUM" | "HIGH" | "CRITICAL";
};
```

Required fields:

- `incidentId`: stable incident identifier;
- `timestamp`: incident detection time;
- `mode`: system mode at the time of reporting;
- `severity`: incident severity level.

### B. TRIGGER SOURCE

```ts
type RUEIncidentTriggerSource = {
  traceLayer: boolean;
  metricsLayer: boolean;
  flowLayer: boolean;
  beastLayer: boolean;
  adapterLayer: boolean;
};
```

Trigger source records where the incident was detected:

- trace layer;
- metrics layer;
- flow layer;
- beast layer;
- adapter layer.

### C. FAILURE DESCRIPTION

```ts
type RUEIncidentFailureDescription = {
  whatHappened: string;
  detectedAnomaly: string;
  affectedSystemLayer: string;
};
```

Failure description must include:

- what happened;
- detected anomaly;
- affected system layer.

### D. IMPACT ANALYSIS

```ts
type RUEIncidentImpactAnalysis = {
  affectedMetrics: string;
  affectedFlows: string;
  dataIntegrityStatus: "PASS" | "FAIL" | "DEGRADED";
  userObservationStatus: "ACTIVE" | "STOPPED" | "MOCK_FALLBACK";
};
```

Impact analysis must include:

- affected metrics;
- affected flows;
- data integrity status;
- user observation status.

### E. ROLLBACK ACTION TAKEN

```ts
type RUEIncidentRollbackAction = {
  switchedToMockMode: boolean;
  stoppedIngestion: boolean;
  frozenRealTracePipeline: boolean;
};
```

Rollback action records whether the incident caused:

- switched to MOCK MODE;
- stopped ingestion;
- frozen real trace pipeline.

### F. RECOVERY STATUS

```ts
type RUEIncidentRecoveryStatus = {
  systemStateAfterRollback: string;
  validationResults: string;
  restartEligibility: "ELIGIBLE" | "NOT_ELIGIBLE" | "REQUIRES_REVIEW";
};
```

Recovery status must include:

- system state after rollback;
- validation results;
- restart eligibility.

## 4. SEVERITY CLASSIFICATION

Severity levels are defined as:

- `LOW`: minor deviation;
- `MEDIUM`: metric instability;
- `HIGH`: system inconsistency;
- `CRITICAL`: privacy or structural failure.

Severity classification is used only for incident reporting and governance review. It does not authorize structural modification.

## 5. RULES

Incident reporting must follow these rules:

- do not affect RUE-L0 structure;
- do not change metrics logic;
- do not change flow logic;
- do not change beast logic;
- do not modify adapter layer;
- do not modify governance layer;
- use this template only for incident records.

Incident reports are audit records, not system changes.

## 6. PURPOSE STATEMENT

This template is used to:

> ensure RUE-L0 has complete incident traceability during runtime operation.

## 7. CONSTRAINTS

This document forbids:

- code implementation;
- runtime logic;
- system expansion;
- backend integration;
- UI integration;
- automated incident handling.

This is a pure documentation record structure.
