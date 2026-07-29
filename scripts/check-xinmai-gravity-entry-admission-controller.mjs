import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import process from "node:process";
import { build } from "esbuild";

const root = process.cwd();
const temporary = fs.mkdtempSync(
  path.join(os.tmpdir(), "xinmai-gravity-controller-"),
);
const output = path.join(temporary, "controller.mjs");
const assert = (name, condition) => {
  if (!condition) throw new Error(`FAIL | ${name}`);
  console.log(`PASS | ${name}`);
};
const identity = Object.freeze({
  sourceReferenceId: "source-a",
  starBeastIdentityReferenceId: "beast-a",
  mansionCoordinateReferenceId: "mansion-a",
});
const storage = new Map();
globalThis.window = {
  sessionStorage: {
    getItem: (key) => storage.get(key) ?? null,
    setItem: (key, value) => storage.set(key, String(value)),
    removeItem: (key) => storage.delete(key),
  },
};

try {
  await build({
    entryPoints: [
      path.join(
        root,
        "src/services/xinmaiGravityEntryAdmissionController.ts",
      ),
    ],
    outfile: output,
    bundle: true,
    platform: "node",
    format: "esm",
    target: "node20",
    logLevel: "silent",
  });
  const runtime = await import(`file://${output}?t=${Date.now()}`);
  const reality = Object.freeze({
    schemaVersion: "XINMAI_REALITY_ENCOUNTER_INTENT_V1",
    source: "xinmai_reality_encounter_intent_controller",
    intentReferenceId: "intent-a",
    encounterCycleId: "encounter-a",
    revision: 4,
    state: "ACTIVE_IN_REALITY",
    routeTarget: "/reality",
    origin: "FIRST_ENCOUNTER",
    qualification: "WHISPER_SKIPPED",
    issuedAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    expiresAt: new Date(Date.now() + 60_000).toISOString(),
    failure: null,
    terminalReason: null,
    ...identity,
  });
  const selected = Object.freeze({
    selectedPressureSeedId: "seed-a",
    surface: "现实正在靠近",
    primaryDimension: "body",
  });
  const capture = Object.freeze({
    sourceReferenceId: identity.sourceReferenceId,
    bundleReferenceId: "bundle-a",
    candidateReferenceId: "seed-a",
  });
  const request = Object.freeze({
    schemaVersion: "XINMAI_GRAVITY_ENTRY_TRANSFER_REQUEST_V1",
    source: "reality_production_host",
    requestedAt: new Date().toISOString(),
    userExplicitRequest: true,
    identityReferences: identity,
    sourceReality: Object.freeze({
      intentReferenceId: reality.intentReferenceId,
      encounterCycleId: reality.encounterCycleId,
      intentRevision: reality.revision,
      origin: reality.origin,
      qualification: reality.qualification,
      state: "ACTIVE_IN_REALITY",
    }),
    pressureSession: Object.freeze({
      schemaVersion:
        "GUANYAO_REALITY_PRODUCTION_PRESSURE_SEED_SESSION_V2",
      source: "reality_production_pressure_seed_consumer",
      sourceExperienceMode: "REAL_USER_EXPERIENCE",
      sourceProvenance: "REAL_USER_SESSION",
      sourceReferenceId: identity.sourceReferenceId,
      candidateBundleReferenceId: "bundle-a",
      captureState: "SEED_RECOGNIZED",
      gravityReadiness: "READY",
      selectedPressureSeedContext: selected,
      captureProvenance: capture,
    }),
    bodyApproachProof: Object.freeze({
      source: "reality_inner_view_approach",
      innerViewEntry: "CURRENT_LIFE_WEATHER_BODY_APPROACHED",
      bodyApproachConfirmed: true,
      confirmedAt: new Date().toISOString(),
      sourceReferenceId: identity.sourceReferenceId,
      encounterCycleId: reality.encounterCycleId,
    }),
    visualContinuity: Object.freeze({
      sourceReferenceId: identity.sourceReferenceId,
    }),
  });
  const prepared = runtime.prepareGravityEntryTransfer({
    request,
    currentRealityIntent: reality,
  });
  assert("explicit request prepares one Gravity admission", prepared.status === "PREPARED");
  assert("Gravity owns a distinct cycle", prepared.admission.gravityCycleId !== reality.encounterCycleId);
  assert("prepared state has no Active claim", prepared.admission.state === "TRANSFER_PREPARED");
  assert("Controller TTL is exactly two hours", Date.parse(prepared.admission.expiresAt) - Date.parse(prepared.admission.issuedAt) === 2 * 60 * 60 * 1_000);
  assert("Controller has no storage or navigation authority", runtime.GRAVITY_ENTRY_ADMISSION_CONTROLLER_BOUNDARY.noDirectStorageRead && runtime.GRAVITY_ENTRY_ADMISSION_CONTROLLER_BOUNDARY.noNavigation);
} finally {
  fs.rmSync(temporary, { recursive: true, force: true });
}
