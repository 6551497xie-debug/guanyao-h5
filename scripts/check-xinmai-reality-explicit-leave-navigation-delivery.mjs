import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import process from "node:process";
import { build } from "esbuild";

const rootDir = process.cwd();
const paths = {
  transition:
    "src/services/realityExplicitLeaveNavigationDeliveryTransition.ts",
  deliveryType:
    "src/types/realityExplicitLeaveNavigationDelivery.ts",
  app: "src/App.tsx",
  launch: "src/pages/LaunchLab.tsx",
  packageManifest: "package.json",
};
const source = Object.fromEntries(
  Object.entries(paths).map(([name, file]) => [
    name,
    fs.readFileSync(path.join(rootDir, file), "utf8"),
  ]),
);

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
  sourceReferenceId: "life-source-delivery",
  starBeastIdentityReferenceId: "starbeast-delivery",
  mansionCoordinateReferenceId: "mansion-delivery",
});
const request = Object.freeze({
  intentReferenceId: "intent-delivery",
  encounterCycleId: "encounter-delivery",
  expectedIntentRevision: 9,
  identityReferences: identity,
  routeTarget: "/reality",
  terminalReason: "EXPLICIT_LEAVE",
});

const tempDir = fs.mkdtempSync(
  path.join(os.tmpdir(), "xinmai-leave-delivery-"),
);
const entryPath = path.join(tempDir, "runtime-entry.ts");
const outPath = path.join(tempDir, "leave-delivery.mjs");

try {
  fs.writeFileSync(
    entryPath,
    `export * from ${JSON.stringify(path.join(rootDir, paths.transition))};`,
    "utf8",
  );
  await build({
    entryPoints: [entryPath],
    outfile: outPath,
    bundle: true,
    platform: "node",
    format: "esm",
    target: "node20",
    logLevel: "silent",
  });
  const runtime = await import(
    `file://${outPath}?t=${Date.now()}`
  );

  const pending =
    runtime.beginRealityExplicitLeaveNavigationDelivery(
      request,
      "2026-07-29T08:00:00.000Z",
    );
  assertEqual(
    "confirmed termination starts navigation only",
    pending.status,
    "TERMINATION_CONFIRMED_NAVIGATION_PENDING",
  );
  assertEqual(
    "delivery ticket targets the returning life world",
    pending.ticket.targetRoute,
    "/launch-lab",
  );
  assertEqual(
    "delivery ticket preserves the exact encounter",
    pending.ticket.encounterCycleId,
    request.encounterCycleId,
  );

  const requested =
    runtime.markRealityExplicitLeaveNavigationRequested(
      pending,
      "2026-07-29T08:00:01.000Z",
    );
  assertEqual(
    "navigation request is not delivery success",
    requested.status,
    "NAVIGATION_REQUESTED",
  );

  const staleReference =
    runtime.consumeReturningLifeWorldDeliveryOutcome(
      requested,
      Object.freeze({
        status: "LIFE_WORLD_DELIVERED",
        deliveryReferenceId: "stale-delivery",
        deliveryAttempt: 1,
        targetRoute: "/launch-lab",
        ...identity,
        presentedAt: "2026-07-29T08:00:02.000Z",
        authority: "RETURNING_LIFE_WORLD_POST_COMMIT",
      }),
    );
  assertEqual(
    "late delivery reference cannot settle the current ticket",
    staleReference.status,
    "STALE_OUTCOME_REJECTED",
  );
  assertEqual(
    "stale outcome leaves navigation requested",
    staleReference.state.status,
    "NAVIGATION_REQUESTED",
  );

  const unavailable =
    runtime.consumeReturningLifeWorldDeliveryOutcome(
      requested,
      Object.freeze({
        status: "LIFE_WORLD_DELIVERY_UNAVAILABLE",
        deliveryReferenceId:
          requested.ticket.deliveryReferenceId,
        deliveryAttempt: requested.ticket.deliveryAttempt,
        reason: "RETURNING_LIFE_SURFACE_NOT_COMMITTED",
      }),
    );
  assertEqual(
    "missing committed life surface becomes retryable",
    unavailable.state.status,
    "NAVIGATION_RETRYABLE",
  );
  const retried =
    runtime.retryRealityExplicitLeaveNavigationDelivery(
      unavailable.state,
    );
  assertEqual(
    "retry is navigation-only pending",
    retried.status,
    "TERMINATION_CONFIRMED_NAVIGATION_PENDING",
  );
  assertEqual(
    "retry preserves the delivery identity",
    retried.ticket.deliveryReferenceId,
    requested.ticket.deliveryReferenceId,
  );
  assertEqual(
    "retry preserves the encounter cycle",
    retried.ticket.encounterCycleId,
    requested.ticket.encounterCycleId,
  );
  assertEqual(
    "retry advances only the delivery attempt",
    retried.ticket.deliveryAttempt,
    2,
  );

  const secondRequested =
    runtime.markRealityExplicitLeaveNavigationRequested(
      retried,
      "2026-07-29T08:00:03.000Z",
    );
  const lateFirstAttempt =
    runtime.consumeReturningLifeWorldDeliveryOutcome(
      secondRequested,
      Object.freeze({
        status: "LIFE_WORLD_DELIVERED",
        deliveryReferenceId:
          secondRequested.ticket.deliveryReferenceId,
        deliveryAttempt: 1,
        targetRoute: "/launch-lab",
        ...identity,
        presentedAt: "2026-07-29T08:00:04.000Z",
        authority: "RETURNING_LIFE_WORLD_POST_COMMIT",
      }),
    );
  assertEqual(
    "old delivery attempt cannot pollute retry",
    lateFirstAttempt.status,
    "STALE_OUTCOME_REJECTED",
  );

  const identityMismatch =
    runtime.consumeReturningLifeWorldDeliveryOutcome(
      secondRequested,
      Object.freeze({
        status: "LIFE_WORLD_DELIVERED",
        deliveryReferenceId:
          secondRequested.ticket.deliveryReferenceId,
        deliveryAttempt:
          secondRequested.ticket.deliveryAttempt,
        targetRoute: "/launch-lab",
        ...identity,
        starBeastIdentityReferenceId: "other-starbeast",
        presentedAt: "2026-07-29T08:00:05.000Z",
        authority: "RETURNING_LIFE_WORLD_POST_COMMIT",
      }),
    );
  assertEqual(
    "identity mismatch cannot complete delivery",
    identityMismatch.state.status,
    "NAVIGATION_RETRYABLE",
  );
  assertEqual(
    "identity mismatch keeps its precise truth",
    identityMismatch.state.reason,
    "STARBEAST_IDENTITY_MISMATCH",
  );

  const delivered =
    runtime.consumeReturningLifeWorldDeliveryOutcome(
      secondRequested,
      Object.freeze({
        status: "LIFE_WORLD_DELIVERED",
        deliveryReferenceId:
          secondRequested.ticket.deliveryReferenceId,
        deliveryAttempt:
          secondRequested.ticket.deliveryAttempt,
        targetRoute: "/launch-lab",
        ...identity,
        presentedAt: "2026-07-29T08:00:06.000Z",
        authority: "RETURNING_LIFE_WORLD_POST_COMMIT",
      }),
    );
  assertEqual(
    "typed post-commit life surface is the only success",
    delivered.state.status,
    "LIFE_WORLD_DELIVERED",
  );

  for (const marker of [
    "appCoordinatorOnly: true",
    "terminationAuthorityRemainsController: true",
    "typedLaunchPostCommitOutcomeRequired: true",
    "pureNavigationRetryOnly: true",
    "noNavigateCallSuccessAuthority: true",
    "noPathnameOnlySuccessAuthority: true",
    "noDomRuntimeInput: true",
    "noFixedTimerSuccess: true",
    "noPersistence: true",
    "noRendererConsumer: true",
    "noPressureConsumer: true",
    "noGrowthConsumer: true",
    "noSecondIntentController: true",
  ]) {
    assertIncludes(
      "navigation delivery boundary is frozen",
      source.deliveryType,
      marker,
    );
  }
  assertIncludes(
    "App starts delivery only after confirmed termination",
    source.app,
    'if (result.status === "TERMINATED_AND_LEFT")',
  );
  assertIncludes(
    "App delegates delivery outcome to the returning surface",
    source.app,
    "onExplicitLeaveNavigationDeliveryOutcome",
  );
  assertIncludes(
    "App exposes pure navigation retry",
    source.app,
    'data-interaction="RETRY_LIFE_WORLD_NAVIGATION"',
  );
  assertIncludes(
    "watchdog reports retryable failure only",
    source.app,
    '"NAVIGATION_OUTCOME_WATCHDOG_EXPIRED"',
  );
  assertExcludes(
    "old combined navigate success branch is removed",
    source.app,
    'result.status === "TERMINATED_AND_LEFT" ||',
  );
  assertIncludes(
    "Launch reports a typed committed life surface",
    source.launch,
    'authority: "RETURNING_LIFE_WORLD_POST_COMMIT" as const',
  );
  assertIncludes(
    "Launch validates recognized identity before delivery",
    source.launch,
    "recoverRealityRecognizedIdentity({",
  );
  assertIncludes(
    "Launch requires returning visual readiness",
    source.launch,
    "if (!returningVisualReady)",
  );
  for (const [name, text] of [
    ["delivery transition", source.transition],
    ["delivery type", source.deliveryType],
  ]) {
    for (const forbidden of [
      "sessionStorage",
      "localStorage",
      "MutationObserver",
      "querySelector",
      "PressureSeed",
      "SixDimension",
      "Gravity",
      "Choice",
      "Crystal",
      "../renderers/",
    ]) {
      assertExcludes(
        `${name} has no forbidden runtime consumer`,
        text,
        forbidden,
      );
    }
  }

  const packageJson = JSON.parse(source.packageManifest);
  assertIncludes(
    "navigation delivery gate is registered",
    packageJson.scripts?.[
      "check-xinmai-reality-explicit-leave-navigation-delivery"
    ] ?? "",
    "node scripts/check-xinmai-reality-explicit-leave-navigation-delivery.mjs",
  );

  console.log(
    "\n[XINMAI REALITY EXPLICIT LEAVE NAVIGATION DELIVERY] PASS",
  );
} catch (error) {
  console.error(
    "[XINMAI REALITY EXPLICIT LEAVE NAVIGATION DELIVERY] FAIL",
  );
  console.error(error instanceof Error ? error.message : error);
  process.exitCode = 1;
} finally {
  fs.rmSync(tempDir, { recursive: true, force: true });
}
