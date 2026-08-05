import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import process from "node:process";
import { build } from "esbuild";

const rootDir = process.cwd();
const read = (file) =>
  fs.readFileSync(path.join(rootDir, file), "utf8");
const source = {
  type: read("src/types/xinmaiRealitySurfaceAdmission.ts"),
  transaction: read(
    "src/services/xinmaiRealitySurfaceAdmissionTransaction.ts",
  ),
  controller: read(
    "src/services/xinmaiRealityEncounterIntentController.ts",
  ),
  route: read("src/pages/RealityProductionRouteEntry.tsx"),
  host: read("src/components/RealityProductionHost.tsx"),
  lifeSurface: read(
    "src/components/RealityLifeUniverseCanvas.tsx",
  ),
  pressureSurface: read(
    "src/components/RealityPressureSeedPresentation.tsx",
  ),
};
const tempDir = fs.mkdtempSync(
  path.join(os.tmpdir(), "xinmai-surface-admission-"),
);
const outPath = path.join(tempDir, "transaction.mjs");

const assertEqual = (name, actual, expected) => {
  if (actual !== expected) {
    throw new Error(
      `${name} expected=${expected} actual=${actual}`,
    );
  }
  console.log(`PASS | ${name}`);
};
const assertIncludes = (name, text, marker) => {
  if (!text.includes(marker)) {
    throw new Error(`${name} missing=${marker}`);
  }
  console.log(`PASS | ${name}`);
};
const assertExcludes = (name, text, marker) => {
  if (text.includes(marker)) {
    throw new Error(`${name} forbidden=${marker}`);
  }
  console.log(`PASS | ${name}`);
};

const identity = Object.freeze({
  sourceReferenceId: "life-source-a",
  starBeastIdentityReferenceId: "starbeast-a",
  mansionCoordinateReferenceId: "mansion-a",
});
const admission = Object.freeze({
  schemaVersion: "XINMAI_REALITY_ENCOUNTER_ADMISSION_V1",
  source: "xinmai_reality_encounter_intent_controller",
  intentReferenceId: "intent-a",
  encounterCycleId: "cycle-a",
  intentRevision: 3,
  state: "ACCEPTING_REALITY",
  routeTarget: "/reality",
  origin: "FIRST_ENCOUNTER",
  qualification: "WHISPER_SKIPPED",
  identityReferences: identity,
  expiresAt: "2026-07-28T12:00:00.000Z",
});
const attempt = Object.freeze({
  intentReferenceId: admission.intentReferenceId,
  encounterCycleId: admission.encounterCycleId,
  intentRevision: admission.intentRevision,
  identityReferences: identity,
});
const lifeSurface = Object.freeze({
  ...attempt,
  status: "REALITY_LIFE_SURFACE_PRESENTED",
  sourceReferenceId: identity.sourceReferenceId,
  surfaceMode: "WEBGL_LIFE_UNIVERSE",
  presentedAt: "2026-07-28T10:00:00.000Z",
});
const pressureSurface = Object.freeze({
  ...attempt,
  status: "REALITY_PRESSURE_SURFACE_PRESENTED",
  sourceReferenceId: identity.sourceReferenceId,
  surfaceMode: "SEMANTIC_PRESSURE_CANDIDATE_SURFACE",
  candidateBundleReferenceId: "bundle-a",
  candidateCount: 3,
  presentedAt: "2026-07-28T10:00:00.100Z",
});

try {
  await build({
    entryPoints: [
      path.join(
        rootDir,
        "src/services/xinmaiRealitySurfaceAdmissionTransaction.ts",
      ),
    ],
    outfile: outPath,
    bundle: true,
    platform: "node",
    format: "esm",
    target: "node20",
    logLevel: "silent",
  });
  const runtime = await import(`file://${outPath}?t=${Date.now()}`);

  const missingLife =
    runtime.resolveRealitySurfaceAdmissionTransaction({
      admission,
      lifeSurfaceOutcome: null,
      pressureSurfaceOutcome: pressureSurface,
    });
  assertEqual(
    "transaction waits for typed life outcome",
    missingLife.reason,
    "LIFE_SURFACE_OUTCOME_REQUIRED",
  );

  const missingPressure =
    runtime.resolveRealitySurfaceAdmissionTransaction({
      admission,
      lifeSurfaceOutcome: lifeSurface,
      pressureSurfaceOutcome: null,
    });
  assertEqual(
    "transaction waits for typed pressure outcome",
    missingPressure.reason,
    "PRESSURE_SURFACE_OUTCOME_REQUIRED",
  );

  const staleLife =
    runtime.resolveRealitySurfaceAdmissionTransaction({
      admission,
      lifeSurfaceOutcome: Object.freeze({
        ...lifeSurface,
        encounterCycleId: "cycle-old",
      }),
      pressureSurfaceOutcome: pressureSurface,
    });
  assertEqual(
    "stale life outcome cannot enter transaction",
    staleLife.reason,
    "LIFE_SURFACE_OUTCOME_MISMATCH",
  );

  const unavailablePressure =
    runtime.resolveRealitySurfaceAdmissionTransaction({
      admission,
      lifeSurfaceOutcome: lifeSurface,
      pressureSurfaceOutcome: Object.freeze({
        ...attempt,
        status: "REALITY_PRESSURE_SURFACE_UNAVAILABLE",
        sourceReferenceId: identity.sourceReferenceId,
        reason: "CANDIDATE_BUNDLE_EMPTY",
        reportedAt: "2026-07-28T10:00:00.100Z",
      }),
    });
  assertEqual(
    "unavailable pressure outcome cannot commit",
    unavailablePressure.reason,
    "PRESSURE_SURFACE_NOT_PRESENTED",
  );

  const ready =
    runtime.resolveRealitySurfaceAdmissionTransaction({
      admission,
      lifeSurfaceOutcome: lifeSurface,
      pressureSurfaceOutcome: pressureSurface,
    });
  assertEqual("two typed outcomes create transaction", ready.status, "READY");
  assertEqual(
    "motion transaction names exact minimum surface",
    ready.transaction.minimumSurface,
    "REALITY_LIFE_UNIVERSE_AND_PRESSURE_CANDIDATES",
  );
  assertEqual(
    "valid transaction matches current attempt",
    runtime.isRealitySurfaceAdmissionTransactionValid(
      ready.transaction,
      attempt,
    ),
    true,
  );
  assertEqual(
    "identity mismatch invalidates transaction",
    runtime.isRealitySurfaceAdmissionTransactionValid(
      ready.transaction,
      Object.freeze({
        ...attempt,
        identityReferences: Object.freeze({
          ...identity,
          mansionCoordinateReferenceId: "mansion-other",
        }),
      }),
    ),
    false,
  );

  const staticReady =
    runtime.resolveRealitySurfaceAdmissionTransaction({
      admission,
      lifeSurfaceOutcome: Object.freeze({
        ...lifeSurface,
        surfaceMode: "SEMANTIC_STATIC_LIFE_UNIVERSE",
      }),
      pressureSurfaceOutcome: pressureSurface,
    });
  assertEqual(
    "static surface is a real typed minimum",
    staticReady.transaction.minimumSurface,
    "REALITY_STATIC_LIFE_UNIVERSE_AND_PRESSURE_CANDIDATES",
  );

  for (const marker of [
    "RealityLifeSurfaceOutcome",
    "RealityPressureSurfaceOutcome",
    "RealitySurfaceAdmissionTransaction",
    "candidateCount",
    "identityReferences",
  ]) {
    assertIncludes("typed transaction contract", source.type, marker);
  }
  assertIncludes(
    "life surface consumes a renderer-owned same-life commit proof",
    source.lifeSurface,
    "rendererSnapshot.sameLifeSurfaceCommitProof",
  );
  assertExcludes(
    "life surface does not treat a rendered frame as presenter authority",
    source.lifeSurface,
    "rendererSnapshot.frameCount > 0",
  );
  assertIncludes(
    "life surface waits for the visible Reality phase",
    source.lifeSurface,
    'arrivalPhase !== "SETTLED"',
  );
  assertIncludes(
    "life surface exposes static fallback outcome",
    source.lifeSurface,
    "SEMANTIC_STATIC_LIFE_UNIVERSE",
  );
  assertIncludes(
    "pressure surface reports its own typed outcome",
    source.pressureSurface,
    "onRealityPressureSurfaceOutcome",
  );
  assertIncludes(
    "Host mounts pressure surface only after life presentation",
    source.host,
    'surfaceOutcomes.lifeSurfaceOutcome?.status ===',
  );
  assertIncludes(
    "Host assembles one typed transaction",
    source.host,
    "resolveRealitySurfaceAdmissionTransaction",
  );
  assertIncludes(
    "Host watchdog is failure-only",
    source.host,
    "SURFACE_OUTCOME_WATCHDOG_EXPIRED",
  );
  assertExcludes(
    "Host no longer inspects child DOM",
    source.host,
    "querySelector",
  );
  assertExcludes(
    "Host no longer uses frame delay as success",
    source.host,
    "requestAnimationFrame",
  );
  assertIncludes(
    "Controller validates the transaction",
    source.controller,
    "isRealitySurfaceAdmissionTransactionValid",
  );
  assertIncludes(
    "Route requires typed surface transaction",
    source.route,
    "typedSurfaceAdmissionTransactionRequired: true",
  );

  console.log(
    "\n[XINMAI REALITY SURFACE OUTCOME ADMISSION TRANSACTION] PASS",
  );
} catch (error) {
  console.error(
    "[XINMAI REALITY SURFACE OUTCOME ADMISSION TRANSACTION] FAIL",
  );
  console.error(error instanceof Error ? error.message : error);
  process.exitCode = 1;
} finally {
  fs.rmSync(tempDir, { recursive: true, force: true });
}
