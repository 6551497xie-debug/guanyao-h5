import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import process from "node:process";
import { build } from "esbuild";

const rootDir = process.cwd();
const paths = {
  type: "src/types/realityPressureCandidateRequestContextBridge.ts",
  service: "src/services/realityPressureCandidateRequestContextBridge.ts",
  candidateSource: "src/services/realityPressureSeedCandidateSource.ts",
  productionHost: "src/components/RealityProductionHost.tsx",
  pressureConsumer: "src/services/realityProductionPressureSeedConsumer.ts",
  pressurePresentation: "src/components/RealityPressurePresentation.tsx",
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
    "RealityPressureCandidateCatalogRequest",
    "RealityPressureCandidateRequestContextBridgeBoundary",
    "RealityPressureCandidateRequestContextBridgeInput",
    "RealityPressureCandidateRequestContext",
    "RealityPressureCandidateRequestContextBridgeResult",
    'ageSegmentRole: "CATALOG_ROUTING_ONLY"',
    'sourceProvenance: "REAL_USER_SESSION"',
    'ageResolution: "CONFIRMED_BIRTH_COORDINATE_AGE_ROUTING"',
    'noPressureInference: true',
    '"AS_OF_DATE_REQUIRED"',
    '"BIRTH_DATE_AFTER_AS_OF_DATE"',
    '"AGE_NOT_SUPPORTED"',
  ].forEach((marker) =>
    assertIncludes("candidate request bridge contract", source.type, marker),
  );

  [
    "requestContextBridgeOnly: true",
    "existingLaunchLifeSourceSessionOnly: true",
    "confirmedBirthCoordinateOnly: true",
    "ageSegmentCatalogRoutingOnly: true",
    "explicitAsOfDateRequired: true",
    "deterministicAgeResolutionOnly: true",
    "sourceReferenceContinuityRequired: true",
    "immutableOutputOnly: true",
    "noFixtureSource: true",
    "noPrototypeSource: true",
    "noDefaultSource: true",
    "noSourceFallback: true",
    "noSystemClock: true",
    "noEngineInvocation: true",
    "noMatrixRead: true",
    "noCandidateSourceInvocation: true",
    "noCandidateAssembly: true",
    "noCaptureExecution: true",
    "noPressureConsumerIntegration: true",
    "noGravityIntegration: true",
    "noUiIntegration: true",
    "noStorageRead: true",
    "noStorageWrite: true",
  ].forEach((marker) =>
    assertIncludes("candidate request bridge boundary", source.service, marker),
  );

  [
    "bridgeRealityPressureCandidateRequestContext",
    'session.provenance.birthSource === "LAUNCH_USER_CONFIRMED"',
    "const resolveAge =",
    "const resolveAgeSegment =",
    'if (age <= 24) return "YOUTH"',
    'if (age <= 34) return "ESTABLISHING"',
    'if (age <= 44) return "MID_LIFE"',
    'if (age <= 59) return "RESTRUCTURING"',
    'return "SIXTY_PLUS"',
    'ageSegmentRole: "CATALOG_ROUTING_ONLY"',
    'noPressureInference: true',
  ].forEach((marker) =>
    assertIncludes("candidate request bridge mapping", source.service, marker),
  );

  [
    "Date.now",
    "new Date()",
    "GUANYAO_PRESSURE_SEED_MATRIX_V2",
    "getPressureSeedSceneTriplet",
    "resolveRealityPressureSeedCandidateSource",
    "buildSelectedPressureSeedContext",
    "captureRealityPressureSeed",
    "initializeRealityProductionPressureSeedConsumer",
    "localStorage",
    "sessionStorage",
    "react",
    "useNavigate",
    "createGenesisWebGLRendererCore",
  ].forEach((marker) =>
    assertExcludes(
      "bridge starts no clock, Matrix, candidate source, capture, consumer, UI, renderer, route, or storage",
      source.service,
      marker,
    ),
  );

  assertExcludes(
    "Production Host is not integrated in WORK-003E",
    source.productionHost,
    "bridgeRealityPressureCandidateRequestContext",
  );
  assertExcludes(
    "Pressure Seed consumer is not integrated with bridge in WORK-003E",
    source.pressureConsumer,
    "RealityPressureCandidateRequestContext",
  );
  assertExcludes(
    "Pressure UI is not integrated in WORK-003E",
    source.pressurePresentation,
    "RealityPressureCandidateRequestContext",
  );

  const packageJson = JSON.parse(source.packageManifest);
  assertIncludes(
    "candidate request bridge gate is registered",
    packageJson.scripts?.["check-reality-pressure-candidate-request-context-bridge"] ?? "",
    "node scripts/check-reality-pressure-candidate-request-context-bridge.mjs",
  );

  const tempDir = fs.mkdtempSync(
    path.join(os.tmpdir(), "guanyao-pressure-candidate-request-bridge-"),
  );
  const entryPath = path.join(tempDir, "entry.ts");
  const outPath = path.join(tempDir, "entry.mjs");
  fs.writeFileSync(
    entryPath,
    [
      `export * from ${JSON.stringify(path.join(rootDir, paths.service))};`,
      `export * from ${JSON.stringify(path.join(rootDir, paths.candidateSource))};`,
    ].join("\n"),
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

  const makeSession = (birthCoordinate, sourceReferenceId = "launch:real-user:work-003e") =>
    Object.freeze({
      schemaVersion: "GUANYAO_LAUNCH_LIFE_SOURCE_SESSION_V1",
      source: "launch_life_source_session",
      sourceKind: "REAL_ENGINE_RESULT",
      sourceReferenceId,
      birthCoordinate,
      starbeastDerivationResult: {},
      motherCodeLandingResult: {},
      originMotherResult: {},
      provenance: Object.freeze({
        sourceKind: "REAL_ENGINE_RESULT",
        sourceReferenceId,
        birthSource: "LAUNCH_USER_CONFIRMED",
      }),
      boundary: Object.freeze({
        immutableCarrier: true,
        existingEngineResultsOnly: true,
        noEngineInvocation: true,
        noStorageWrite: true,
      }),
    });
  const inputFor = (lifeSourceSession, asOfDate = "2026-07-19") => ({
    lifeSourceSession,
    asOfDate,
    candidateCursor: null,
    excludedCandidateReferenceIds: [],
  });

  const mutableSession = {
    ...makeSession({ year: 1996, month: 7, day: 20 }),
  };
  const mutable = runtime.bridgeRealityPressureCandidateRequestContext(
    inputFor(mutableSession),
  );
  assertEqual("mutable session is not accepted", mutable.status, "SOURCE_NOT_READY");

  const missingDate = runtime.bridgeRealityPressureCandidateRequestContext({
    ...inputFor(makeSession({ year: 1996, month: 7, day: 20 })),
    asOfDate: "",
  });
  assertEqual("missing as-of date is not defaulted", missingDate.status, "SOURCE_NOT_READY");
  assertEqual("missing date reason is explicit", missingDate.reason, "AS_OF_DATE_REQUIRED");

  const invalidDate = runtime.bridgeRealityPressureCandidateRequestContext(
    inputFor(makeSession({ year: 1996, month: 7, day: 20 }), "2026-02-30"),
  );
  assertEqual("invalid date is blocked", invalidDate.status, "BLOCKED");
  assertEqual("invalid date reason is explicit", invalidDate.reason, "AS_OF_DATE_INVALID");

  const futureBirth = runtime.bridgeRealityPressureCandidateRequestContext(
    inputFor(makeSession({ year: 2027, month: 1, day: 1 })),
  );
  assertEqual("future birth is blocked", futureBirth.status, "BLOCKED");
  assertEqual("future birth reason is explicit", futureBirth.reason, "BIRTH_DATE_AFTER_AS_OF_DATE");

  const underage = runtime.bridgeRealityPressureCandidateRequestContext(
    inputFor(makeSession({ year: 2010, month: 1, day: 1 })),
  );
  assertEqual("unsupported age is blocked", underage.status, "BLOCKED");
  assertEqual("unsupported age reason is explicit", underage.reason, "AGE_NOT_SUPPORTED");

  const establishing = runtime.bridgeRealityPressureCandidateRequestContext(
    inputFor(makeSession({ year: 1996, month: 7, day: 20 })),
  );
  assertEqual("real session bridges candidate request", establishing.status, "READY");
  assertEqual("birthday boundary is deterministic", establishing.context.ageAtRequest, 29);
  assertEqual("age routes to establishing catalog", establishing.context.ageSegment, "ESTABLISHING");
  assertEqual("age has catalog-only role", establishing.context.ageSegmentRole, "CATALOG_ROUTING_ONLY");
  assertEqual("request source remains continuous", establishing.context.candidateRequest.sourceReferenceId, establishing.context.sourceReferenceId);
  assertEqual("bridge does not infer Pressure", establishing.context.provenance.noPressureInference, true);
  assertEqual("bridge context is immutable", Object.isFrozen(establishing.context), true);
  assertEqual("candidate request is immutable", Object.isFrozen(establishing.context.candidateRequest), true);
  assertEqual("raw birth session is not carried downstream", "lifeSourceSession" in establishing.context, false);
  assertEqual("raw birth coordinate is not carried downstream", "birthCoordinate" in establishing.context, false);

  const candidateSource = runtime.resolveRealityPressureSeedCandidateSource(
    establishing.context.candidateRequest,
  );
  assertEqual("bridged establishing request reaches candidate source", candidateSource.status, "READY");
  assertEqual("candidate source keeps reference continuity", candidateSource.context.sourceReferenceId, establishing.context.sourceReferenceId);

  const midLife = runtime.bridgeRealityPressureCandidateRequestContext(
    inputFor(makeSession({ year: 1986, month: 1, day: 1 })),
  );
  assertEqual("mid-life session still bridges honestly", midLife.status, "READY");
  assertEqual("mid-life age segment is preserved", midLife.context.ageSegment, "MID_LIFE");
  const unavailableCatalog = runtime.resolveRealityPressureSeedCandidateSource(
    midLife.context.candidateRequest,
  );
  assertEqual("missing mid-life catalog never falls back", unavailableCatalog.status, "BLOCKED");
  assertEqual("catalog mismatch remains explicit", unavailableCatalog.reason, "CANDIDATE_SOURCE_AGE_SEGMENT_MISMATCH");

  assertEqual("bridge boundary is frozen", Object.isFrozen(establishing.boundary), true);
  assertEqual("bridge uses no system clock", establishing.boundary.noSystemClock, true);
  assertEqual("bridge invokes no Engine", establishing.boundary.noEngineInvocation, true);
  assertEqual("bridge reads no Matrix", establishing.boundary.noMatrixRead, true);

  console.log("\n[REALITY PRESSURE CANDIDATE REQUEST CONTEXT BRIDGE] PASS");
} catch (error) {
  console.error("[REALITY PRESSURE CANDIDATE REQUEST CONTEXT BRIDGE] FAIL");
  console.error(error instanceof Error ? error.message : error);
  process.exitCode = 1;
}
