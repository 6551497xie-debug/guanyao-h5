import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import process from "node:process";
import { build } from "esbuild";

const rootDir = process.cwd();
const paths = {
  type: "src/types/realityProductionPressureHostInputContract.ts",
  service: "src/services/realityProductionPressureHostInputContract.ts",
  deliveryBridge: "src/services/realityRouteDeliveryOrchestrationBridge.ts",
  route: "src/pages/RealityProductionRouteEntry.tsx",
  routeType: "src/types/realityProductionRouteEntry.ts",
  host: "src/components/RealityProductionHost.tsx",
  pressureSeedConsumer:
    "src/services/realityProductionPressureSeedConsumer.ts",
  gravity: "src/services/realityProductionGravityConsumer.ts",
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
    "RealityProductionPressureHostInputContractBoundary",
    "RealityProductionPressureHostInputContractInput",
    "RealityProductionPressureHostInput",
    "readyRouteDeliveryOnly: true",
    "consumerInputForwardingOnly: true",
    "noPressureSeedConsumerInvocation: true",
    "consumerNotExecuted: true",
  ].forEach((marker) =>
    assertIncludes("pressure host input contract", source.type, marker),
  );

  [
    "resolveRealityProductionPressureHostInput",
    "isRealityProductionPressureHostInputReady",
    "deliverySession: deliveryResult.deliverySession",
    "consumerInput: deliveryResult.consumerInput",
    "consumerNotExecuted: true",
    "Object.freeze",
  ].forEach((marker) =>
    assertIncludes("pressure host input implementation", source.service, marker),
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
    "useNavigate",
    "react",
  ].forEach((marker) =>
    assertExcludes(
      "contract performs no clock, Engine, Candidate Source, V2 Consumer, Gravity, UI, or storage work",
      source.service,
      marker,
    ),
  );

  assertIncludes(
    "Route resolves Host input",
    source.route,
    "resolveRealityProductionPressureHostInput({",
  );
  assertIncludes(
    "Route passes Host input",
    source.route,
    "pressureSeedHostInput={pressureHostInputResult.input}",
  );
  assertIncludes(
    "Host validates immutable input",
    source.host,
    "isRealityProductionPressureHostInputReady(",
  );
  assertIncludes(
    "Host props require pressure input",
    source.routeType,
    "pressureSeedHostInput: RealityProductionPressureHostInput",
  );
  assertExcludes(
    "Host does not initialize V2 Consumer",
    source.host,
    "initializeRealityProductionPressureSeedConsumer",
  );
  assertExcludes(
    "Host does not advance V2 Consumer",
    source.host,
    "advanceRealityProductionPressureSeedConsumer",
  );
  assertExcludes(
    "V2 Consumer remains unmodified",
    source.pressureSeedConsumer,
    "RealityProductionPressureHostInput",
  );
  assertExcludes(
    "Gravity remains unmodified",
    source.gravity,
    "RealityProductionPressureHostInput",
  );

  const packageJson = JSON.parse(source.packageManifest);
  assertIncludes(
    "pressure host input gate is registered",
    packageJson.scripts?.[
      "check-reality-production-pressure-host-input-contract"
    ] ?? "",
    "node scripts/check-reality-production-pressure-host-input-contract.mjs",
  );

  const tempDir = fs.mkdtempSync(
    path.join(os.tmpdir(), "guanyao-pressure-host-input-"),
  );
  const entryPath = path.join(tempDir, "entry.ts");
  const outPath = path.join(tempDir, "pressure-host-input.mjs");
  fs.writeFileSync(
    entryPath,
    [
      `export * from ${JSON.stringify(path.join(rootDir, paths.deliveryBridge))};`,
      `export * from ${JSON.stringify(path.join(rootDir, paths.service))};`,
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
  const sourceReferenceId = "launch:real-user:work-004a";
  const routeAuthorization = Object.freeze({
    status: "READY",
    authorizationState: "AUTHORIZED_PRODUCTION_REALITY_SOURCE",
    routeTarget: "/reality",
    sourceReferenceId,
    sourceContext: Object.freeze({
      sourceExperienceMode: "REAL_USER_EXPERIENCE",
      sourceProvenance: "REAL_USER_SESSION",
      sourceReferenceId,
    }),
  });
  const deliverySession = Object.freeze({
    sourceReferenceId,
    currentBundleReferenceId: "bundle:work-004a:1",
  });
  const candidateSourceContext = Object.freeze({
    sourceReferenceId,
  });
  const consumerInput = Object.freeze({
    routeAuthorization,
    candidateSourceContext,
  });
  const deliveryResult = Object.freeze({
    status: "READY",
    operation: "INITIALIZE",
    sourceReferenceId,
    routeActivationContextReferenceId: "route-activation:work-004a",
    candidateActivationContextReferenceId:
      "candidate-activation:work-004a",
    deliverySession,
    candidateSourceContext,
    consumerInput,
    provenance: Object.freeze({
      sourceReferenceId,
      noCandidateSelection: true,
      consumerNotExecuted: true,
    }),
    boundary: runtime.REALITY_ROUTE_DELIVERY_ORCHESTRATION_BRIDGE_BOUNDARY,
  });

  const ready = runtime.resolveRealityProductionPressureHostInput({
    routeAuthorization,
    routeDeliveryResult: deliveryResult,
  });
  assertEqual("ready delivery creates Host input", ready.status, "READY");
  assertEqual("source reference remains continuous", ready.input.sourceReferenceId, sourceReferenceId);
  assertEqual("delivery session is forwarded by identity", ready.input.deliverySession, deliverySession);
  assertEqual("consumer input is forwarded by identity", ready.input.consumerInput, consumerInput);
  assertEqual("Host input is immutable", Object.isFrozen(ready.input), true);
  assertEqual("Host provenance is immutable", Object.isFrozen(ready.input.provenance), true);
  assertEqual("Consumer remains unexecuted", ready.input.provenance.consumerNotExecuted, true);
  assertEqual("Host validator accepts ready input", runtime.isRealityProductionPressureHostInputReady(ready.input, sourceReferenceId), true);
  assertEqual("Host validator rejects another source", runtime.isRealityProductionPressureHostInputReady(ready.input, "launch:other-user"), false);

  const missing = runtime.resolveRealityProductionPressureHostInput({
    routeAuthorization,
    routeDeliveryResult: Object.freeze({
      status: "SOURCE_NOT_READY",
    }),
  });
  assertEqual("missing delivery is source not ready", missing.status, "SOURCE_NOT_READY");
  assertEqual("missing delivery reason is explicit", missing.reason, "ROUTE_DELIVERY_NOT_READY");

  const mismatch = runtime.resolveRealityProductionPressureHostInput({
    routeAuthorization: Object.freeze({
      ...routeAuthorization,
      sourceReferenceId: "launch:other-user",
      sourceContext: Object.freeze({
        ...routeAuthorization.sourceContext,
        sourceReferenceId: "launch:other-user",
      }),
    }),
    routeDeliveryResult: deliveryResult,
  });
  assertEqual("source mismatch is blocked", mismatch.status, "BLOCKED");
  assertEqual("source mismatch reason is explicit", mismatch.reason, "SOURCE_REFERENCE_MISMATCH");

  console.log("\n[REALITY PRODUCTION PRESSURE HOST INPUT CONTRACT] PASS");
} catch (error) {
  console.error("[REALITY PRODUCTION PRESSURE HOST INPUT CONTRACT] FAIL");
  console.error(error instanceof Error ? error.message : error);
  process.exitCode = 1;
}
