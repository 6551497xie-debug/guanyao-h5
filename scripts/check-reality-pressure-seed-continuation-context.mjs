import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import process from "node:process";
import { build } from "esbuild";

const rootDir = process.cwd();
const paths = {
  type: "src/types/realityPressureSeedContinuationContext.ts",
  service: "src/services/realityPressureSeedContinuationContext.ts",
  route: "src/pages/RealityProductionRouteEntry.tsx",
  routeType: "src/types/realityProductionRouteEntry.ts",
  host: "src/components/RealityProductionHost.tsx",
  consumer: "src/services/realityProductionPressureSeedConsumer.ts",
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
    throw new Error(`${name} expected=${expected} actual=${actual}`);
  }
  console.log(`PASS | ${name}`);
};
const assertIncludes = (name, text, marker) => {
  if (!text.includes(marker)) throw new Error(`${name} missing=${marker}`);
  console.log(`PASS | ${name}`);
};
const assertExcludes = (name, text, marker) => {
  if (text.includes(marker)) throw new Error(`${name} forbidden=${marker}`);
  console.log(`PASS | ${name}`);
};

try {
  [
    "RealityPressureSeedContinuationContext",
    'phase: "READY_FOR_CONSUMER_INITIALIZATION"',
    'phase: "ACTIVE"',
    "pressureSeedSession: null",
    "existingRouteResultsOnly: true",
    "existingPressureSeedSessionOnly: true",
    "explicitUserRecognitionRequired: true",
    "noCandidateSelection: true",
  ].forEach((marker) =>
    assertIncludes("continuation context contract", source.type, marker),
  );

  [
    "createRealityPressureSeedContinuationContext",
    "attachRealityPressureSeedSessionToContinuationContext",
    'phase: "READY_FOR_CONSUMER_INITIALIZATION"',
    'phase: "ACTIVE"',
    "pressureSeedSession: null",
    "Object.freeze",
  ].forEach((marker) =>
    assertIncludes("continuation context implementation", source.service, marker),
  );

  [
    "new Date(",
    "Date.now",
    "resolveLaunchOriginMother",
    "createLaunchLifeSourceSession",
    "resolveRealityPressureSeedCandidateSource",
    "initializeRealityProductionPressureSeedConsumer",
    "advanceRealityProductionPressureSeedConsumer",
    "captureRealityPressureSeed",
    "initializeRealityProductionGravityConsumer",
    "localStorage",
    "sessionStorage",
    "react",
  ].forEach((marker) =>
    assertExcludes(
      "continuation carrier performs no clock, Engine, source, Consumer, capture, Gravity, UI, or storage work",
      source.service,
      marker,
    ),
  );

  assertIncludes(
    "Route creates initial continuation context",
    source.route,
    "createRealityPressureSeedContinuationContext({",
  );
  assertIncludes(
    "Route requires continuation readiness",
    source.route,
    'pressureSeedContinuationResult?.status !== "READY"',
  );
  assertIncludes(
    "Route boundary declares continuation requirement",
    source.routeType,
    "pressureSeedContinuationContextRequired: true",
  );
  assertExcludes(
    "Host remains disconnected from continuation context",
    source.host,
    "RealityPressureSeedContinuationContext",
  );
  assertExcludes(
    "V2 Consumer remains disconnected from continuation context",
    source.consumer,
    "RealityPressureSeedContinuationContext",
  );

  const packageJson = JSON.parse(source.packageManifest);
  assertIncludes(
    "continuation gate is registered",
    packageJson.scripts?.[
      "check-reality-pressure-seed-continuation-context"
    ] ?? "",
    "node scripts/check-reality-pressure-seed-continuation-context.mjs",
  );

  const tempDir = fs.mkdtempSync(
    path.join(os.tmpdir(), "guanyao-pressure-continuation-"),
  );
  const entryPath = path.join(tempDir, "entry.ts");
  const outPath = path.join(tempDir, "pressure-continuation.mjs");
  fs.writeFileSync(
    entryPath,
    `export * from ${JSON.stringify(path.join(rootDir, paths.service))};`,
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
  const runtime = await import(`file://${outPath}?t=${Date.now()}`);
  const sourceReferenceId = "launch:real-user:work-004d";
  const activationReferenceId = "candidate-activation:work-004d";
  const bundleReferenceId = "bundle:work-004d:1";
  const routeAuthorization = Object.freeze({
    status: "READY",
    authorizationState: "AUTHORIZED_PRODUCTION_REALITY_SOURCE",
    routeTarget: "/reality",
    sourceReferenceId,
    sourceContext: Object.freeze({
      sourceExperienceMode: "REAL_USER_EXPERIENCE",
      sourceProvenance: "REAL_USER_SESSION",
    }),
  });
  const candidateActivationContext = Object.freeze({
    contextReferenceId: activationReferenceId,
    sourceReferenceId,
  });
  const activationRequestContext = Object.freeze({
    sourceReferenceId,
    activationContextReferenceId: activationReferenceId,
  });
  const deliverySession = Object.freeze({
    sourceReferenceId,
    currentBundleReferenceId: bundleReferenceId,
  });
  const candidateSourceContext = Object.freeze({
    sourceReferenceId,
    bundleReferenceId,
  });
  const consumerInput = Object.freeze({
    routeAuthorization,
    candidateSourceContext,
  });
  const activationResult = Object.freeze({
    status: "READY",
    sourceReferenceId,
    candidateActivationContext,
  });
  const requestResult = Object.freeze({
    status: "READY",
    sourceReferenceId,
    candidateActivationContextReferenceId: activationReferenceId,
    candidateRequestContext: activationRequestContext,
  });
  const deliveryResult = Object.freeze({
    status: "READY",
    sourceReferenceId,
    candidateActivationContextReferenceId: activationReferenceId,
    deliverySession,
    candidateSourceContext,
    consumerInput,
  });

  const initial = runtime.createRealityPressureSeedContinuationContext({
    routeAuthorization,
    routeCandidateActivationResult: activationResult,
    routeCandidateRequestResult: requestResult,
    routeDeliveryResult: deliveryResult,
  });
  assertEqual("valid route results create context", initial.status, "READY");
  assertEqual(
    "initial phase is explicit",
    initial.context.phase,
    "READY_FOR_CONSUMER_INITIALIZATION",
  );
  assertEqual("initial V2 session is absent", initial.context.pressureSeedSession, null);
  assertEqual("context is immutable", Object.isFrozen(initial.context), true);
  assertEqual("provenance is immutable", Object.isFrozen(initial.context.provenance), true);
  assertEqual("activation context is forwarded", initial.context.candidateActivationContext, candidateActivationContext);
  assertEqual("delivery session is forwarded", initial.context.deliverySession, deliverySession);

  const pressureSeedSession = Object.freeze({
    sourceReferenceId,
    candidateBundleReferenceId: bundleReferenceId,
  });
  const active = runtime.attachRealityPressureSeedSessionToContinuationContext({
    context: initial.context,
    consumerResult: Object.freeze({
      status: "READY",
      session: pressureSeedSession,
    }),
  });
  assertEqual("existing V2 session can be attached", active.status, "READY");
  assertEqual("active phase is explicit", active.context.phase, "ACTIVE");
  assertEqual("V2 session is forwarded by identity", active.context.pressureSeedSession, pressureSeedSession);
  assertEqual("active context is immutable", Object.isFrozen(active.context), true);

  const sourceMismatch = runtime.createRealityPressureSeedContinuationContext({
    routeAuthorization,
    routeCandidateActivationResult: activationResult,
    routeCandidateRequestResult: requestResult,
    routeDeliveryResult: Object.freeze({
      ...deliveryResult,
      sourceReferenceId: "launch:other-user",
    }),
  });
  assertEqual("source mismatch is blocked", sourceMismatch.reason, "SOURCE_REFERENCE_MISMATCH");

  const fixture = runtime.createRealityPressureSeedContinuationContext({
    routeAuthorization: Object.freeze({
      ...routeAuthorization,
      sourceReferenceId: "fixture:case-a",
    }),
    routeCandidateActivationResult: activationResult,
    routeCandidateRequestResult: requestResult,
    routeDeliveryResult: deliveryResult,
  });
  assertEqual("fixture source is blocked", fixture.reason, "FORBIDDEN_SOURCE_REFERENCE");

  const bundleMismatch = runtime.attachRealityPressureSeedSessionToContinuationContext({
    context: initial.context,
    consumerResult: Object.freeze({
      status: "READY",
      session: Object.freeze({
        sourceReferenceId,
        candidateBundleReferenceId: "bundle:other",
      }),
    }),
  });
  assertEqual("bundle mismatch is blocked", bundleMismatch.reason, "BUNDLE_REFERENCE_MISMATCH");

  console.log("PASS | WORK-004D pressure seed continuation context gate");
} catch (error) {
  console.error(error instanceof Error ? error.message : error);
  process.exitCode = 1;
}
