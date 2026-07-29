import fs from "node:fs";
import process from "node:process";

const canvas = fs.readFileSync(
  "src/components/RealityLifeUniverseCanvas.tsx",
  "utf8",
);
const observation = fs.readFileSync(
  "src/components/RealityGravityInertiaField.tsx",
  "utf8",
);
const host = fs.readFileSync(
  "src/components/GravityProductionSurfaceHost.tsx",
  "utf8",
);
const transaction = fs.readFileSync(
  "src/services/xinmaiGravitySurfaceAdmissionTransaction.ts",
  "utf8",
);
const assert = (name, condition) => {
  if (!condition) throw new Error(`FAIL | ${name}`);
  console.log(`PASS | ${name}`);
};
const watchdogBlock = host.slice(
  host.indexOf("const watchdog = window.setTimeout"),
  host.indexOf("return ("),
);
assert("same-life Canvas emits Motion outcome", canvas.includes("WEBGL_SAME_LIFE_SURFACE"));
assert("same-life Canvas emits Static outcome", canvas.includes("SEMANTIC_STATIC_SAME_LIFE_SURFACE"));
assert("observation emits Motion outcome", observation.includes("MOTION_FIRST_GRAVITY_OBSERVATION"));
assert("observation emits Reduced Motion Static outcome", observation.includes("STATIC_FIRST_GRAVITY_OBSERVATION"));
assert("outcomes are emitted after committed surface presence", observation.includes("fieldRef.current?.isConnected"));
assert("Host aggregates typed outcomes", host.includes("resolveGravitySurfaceAdmissionTransaction"));
assert(
  "watchdog reports failure only",
  watchdogBlock.includes('reportUnavailable("SURFACE_OUTCOME_WATCHDOG_EXPIRED")') &&
    !watchdogBlock.includes('status: "GRAVITY_MINIMUM_PRESENTED"'),
);
assert("transaction validates cycle and revision", transaction.includes("outcome.admissionRevision === attempt.admissionRevision") && transaction.includes("outcome.gravityCycleId === attempt.gravityCycleId"));
process.exitCode = 0;
