import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import process from "node:process";
import { build } from "esbuild";

const rootDir = process.cwd();
const paths = {
  type: "src/types/realityPressureCandidateDeliverySession.ts",
  service: "src/services/realityPressureCandidateDeliverySession.ts",
  candidateSource: "src/services/realityPressureSeedCandidateSource.ts",
  capture: "src/services/realityPressureSeedCaptureAdapter.ts",
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
  if (actual !== expected) throw new Error(`${name} expected=${expected} actual=${actual}`);
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
    "RealityPressureCandidateDeliverySession",
    "RealityPressureCandidateDeliverySessionInitializeInput",
    "RealityPressureCandidateDeliverySessionAdvanceInput",
    "RealityPressureCandidateDeliverySessionResult",
    "deliveredCandidateReferenceIds: readonly string[]",
    "nextCandidateCursor: string | null",
  ].forEach((marker) => assertIncludes("delivery session type contract", source.type, marker));

  [
    "initializeRealityPressureCandidateDeliverySession",
    "advanceRealityPressureCandidateDeliverySession",
    "candidateCursorContinuityRequired: true",
    "cumulativeCandidateHistoryRequired: true",
    "uniqueCandidateDeliveryRequired: true",
    "noCandidateSourceResolution: true",
    "noCaptureExecution: true",
    "noPressureConsumerIntegration: true",
  ].forEach((marker) => assertIncludes("delivery session boundary", source.service, marker));

  [
    "resolveRealityPressureSeedCandidateSource",
    "getPressureSeedSceneCandidateAtMatrixSlot",
    "captureRealityPressureSeed",
    "initializeRealityProductionPressureSeedConsumer",
    "GUANYAO_PRESSURE_SEED_MATRIX_V2",
    "Math.random",
    "localStorage",
    "sessionStorage",
    "react",
    "useNavigate",
  ].forEach((marker) =>
    assertExcludes("delivery session performs no source, capture, engine, UI, or storage work", source.service, marker),
  );
  assertExcludes("Capture Adapter remains unchanged", source.capture, "CandidateDeliverySession");
  assertExcludes("Pressure Consumer remains unchanged", source.consumer, "CandidateDeliverySession");

  const packageJson = JSON.parse(source.packageManifest);
  assertIncludes(
    "delivery session gate is registered",
    packageJson.scripts?.["check-reality-pressure-candidate-delivery-session-contract"] ?? "",
    "node scripts/check-reality-pressure-candidate-delivery-session-contract.mjs",
  );

  const tempDir = fs.mkdtempSync(path.join(os.tmpdir(), "guanyao-delivery-session-"));
  const entryPath = path.join(tempDir, "entry.ts");
  fs.writeFileSync(
    entryPath,
    [
      `export * from ${JSON.stringify(path.join(rootDir, paths.candidateSource))};`,
      `export * from ${JSON.stringify(path.join(rootDir, paths.service))};`,
    ].join("\n"),
  );
  const outPath = path.join(tempDir, "delivery-session.mjs");
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
  const baseRequest = {
    sourceExperienceMode: "REAL_USER_EXPERIENCE",
    sourceReferenceId: "launch:real-user:work-003o",
    candidateCursor: null,
    excludedCandidateReferenceIds: [],
    ageSegment: "ESTABLISHING",
    ageSegmentRole: "CATALOG_ROUTING_ONLY",
  };
  let request = baseRequest;
  let sourceResult = runtime.resolveRealityPressureSeedCandidateSource(request);
  let deliveryResult = runtime.initializeRealityPressureCandidateDeliverySession({
    candidateSourceResult: sourceResult,
  });
  assertEqual("first source initializes delivery session", deliveryResult.status, "READY");
  assertEqual("first delivery sequence is one", deliveryResult.session.deliverySequence, 1);
  assertEqual("first session carries three delivered references", deliveryResult.session.deliveredCandidateReferenceIds.length, 3);
  assertEqual("delivery session is immutable", Object.isFrozen(deliveryResult.session), true);
  assertEqual("candidate history is immutable", Object.isFrozen(deliveryResult.session.deliveredCandidateReferenceIds), true);

  for (let sequence = 1; sequence < 30; sequence += 1) {
    request = {
      ...baseRequest,
      candidateCursor: deliveryResult.session.nextCandidateCursor,
      excludedCandidateReferenceIds: deliveryResult.session.deliveredCandidateReferenceIds,
    };
    sourceResult = runtime.resolveRealityPressureSeedCandidateSource(request);
    deliveryResult = runtime.advanceRealityPressureCandidateDeliverySession({
      session: deliveryResult.session,
      candidateSourceResult: sourceResult,
    });
    assertEqual(`delivery sequence ${sequence + 1} advances`, deliveryResult.status, "READY");
    assertEqual(`delivery sequence ${sequence + 1} is explicit`, deliveryResult.session.deliverySequence, sequence + 1);
  }
  assertEqual("delivery session carries thirty bundle references", deliveryResult.session.deliveredBundleReferenceIds.length, 30);
  assertEqual("delivery session carries ninety candidate references", deliveryResult.session.deliveredCandidateReferenceIds.length, 90);
  assertEqual("delivery history contains no repeated candidate", new Set(deliveryResult.session.deliveredCandidateReferenceIds).size, 90);

  const otherSource = runtime.resolveRealityPressureSeedCandidateSource({
    ...baseRequest,
    sourceReferenceId: "launch:real-user:other-session",
  });
  const sourceMismatch = runtime.advanceRealityPressureCandidateDeliverySession({
    session: deliveryResult.session,
    candidateSourceResult: otherSource,
  });
  assertEqual("different source session is blocked", sourceMismatch.status, "BLOCKED");
  assertEqual("source mismatch is explicit", sourceMismatch.reason, "SOURCE_REFERENCE_MISMATCH");

  const exhaustedSource = runtime.resolveRealityPressureSeedCandidateSource({
    ...baseRequest,
    candidateCursor: deliveryResult.session.nextCandidateCursor,
    excludedCandidateReferenceIds: deliveryResult.session.deliveredCandidateReferenceIds,
  });
  const exhaustedAdvance = runtime.advanceRealityPressureCandidateDeliverySession({
    session: deliveryResult.session,
    candidateSourceResult: exhaustedSource,
  });
  assertEqual("exhausted source cannot fabricate a session", exhaustedAdvance.status, "BLOCKED");
  assertEqual("source-not-ready boundary is explicit", exhaustedAdvance.reason, "CANDIDATE_SOURCE_NOT_READY");
  assertEqual("blocked advance retains last valid session", exhaustedAdvance.session, deliveryResult.session);

  console.log("\n[REALITY PRESSURE CANDIDATE DELIVERY SESSION CONTRACT] PASS");
} catch (error) {
  console.error("[REALITY PRESSURE CANDIDATE DELIVERY SESSION CONTRACT] FAIL");
  console.error(error instanceof Error ? error.message : error);
  process.exitCode = 1;
}
