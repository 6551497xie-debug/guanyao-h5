import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import process from "node:process";
import { build } from "esbuild";

const rootDir = process.cwd();
const files = Object.freeze({
  type: "src/types/starBeastPrototypeRendererExecutionReadiness.ts",
  service: "src/services/starBeastPrototypeRendererExecutionReadiness.ts",
  upstreamType: "src/types/starBeastPrototypeRendererInputContract.ts",
  upstreamService: "src/services/starBeastPrototypeRendererInputContract.ts",
  protocol: "docs/GUANYAO_STAR_BEAST_PROTOTYPE_RENDERER_EXECUTION_READINESS_PROTOCOL.md",
  typeIndex: "src/types/index.ts",
  lab: "src/pages/StarbeastLab.tsx",
  packageManifest: "package.json",
});
const failures = [];
const assertIncludes = (name, source, expected) => {
  if (!source.includes(expected)) failures.push(`${name} missing=${expected}`);
  else console.log(`PASS | ${name} | includes=${expected}`);
};
const assertExcludes = (name, source, forbidden) => {
  if (source.includes(forbidden)) failures.push(`${name} forbidden=${forbidden}`);
  else console.log(`PASS | ${name} | forbidden=absent`);
};
const assertEqual = (name, actual, expected) => {
  if (actual !== expected) failures.push(`${name} expected=${expected} actual=${actual}`);
  else console.log(`PASS | ${name} | expected=${expected} | actual=${actual}`);
};
const absolute = Object.fromEntries(
  Object.entries(files).map(([name, relativePath]) => [
    name,
    path.join(rootDir, relativePath),
  ]),
);

for (const [name, filePath] of Object.entries(absolute)) {
  if (!fs.existsSync(filePath)) failures.push(`${name} missing=${filePath}`);
  else console.log(`PASS | ${name} file exists`);
}

if (failures.length === 0) {
  const typeSource = fs.readFileSync(absolute.type, "utf8");
  const serviceSource = fs.readFileSync(absolute.service, "utf8");
  const protocolSource = fs.readFileSync(absolute.protocol, "utf8");
  const typeIndexSource = fs.readFileSync(absolute.typeIndex, "utf8");
  const labSource = fs.readFileSync(absolute.lab, "utf8");
  const packageJson = JSON.parse(
    fs.readFileSync(absolute.packageManifest, "utf8"),
  );

  [
    "export type StarBeastPrototypeRendererExecutionReadinessInput",
    "inputContractResultReference:",
    "inputContractReference: StarBeastPrototypeRendererInputContract | null",
    "executionSliceReference: StarBeastPrototypeExecutionSliceReference | null",
    "executionStopReference: StarBeastPrototypeExecutionStopReference | null",
    'scope: "ISOLATED_PROTOTYPE_ONLY"',
    "reversible: true",
    "stopOnBoundaryViolation: true",
    'status: "READY"',
    'status: "UNAVAILABLE"',
    'status: "BLOCKED"',
    '"READY_FOR_EXPLICIT_ISOLATED_PROTOTYPE_EXECUTION_AUTHORIZATION"',
    "readinessOnly: true",
    "explicitExecutionAuthorizationRequired: true",
    "executionAuthorizationDeferred: true",
    "noRendererInvocation: true",
    "noRenderExecution: true",
    "noBackendSelection: true",
    "noCanvasConnection: true",
    "noStarbeastLabConnection: true",
    "noRuntimeIntegration: true",
    "noStorageWrite: true",
  ].forEach((marker) =>
    assertIncludes("prototype execution readiness type", typeSource, marker),
  );

  [
    "export function resolveStarBeastPrototypeRendererExecutionReadiness",
    'inputContractResult.status === "UNAVAILABLE"',
    'inputContractResult.status === "BLOCKED"',
    '"INPUT_CONTRACT_REFERENCE_MISMATCH"',
    '"INPUT_CONTRACT_BOUNDARY_INVALID"',
    '"EXECUTION_SLICE_REFERENCE_INVALID"',
    '"EXECUTION_STOP_REFERENCE_INVALID"',
    'contract.semanticRole !== "STAR_BEAST_PROTOTYPE_RENDERER_INPUT_CONTRACT"',
    'contract.rendererNeutral !== true',
    'contract.referenceOnly !== true',
    '"READY_FOR_EXPLICIT_ISOLATED_PROTOTYPE_EXECUTION_AUTHORIZATION"',
  ].forEach((marker) =>
    assertIncludes("prototype execution readiness service", serviceSource, marker),
  );

  [
    "resolveStarBeastPrototypeRendererInputContract(",
    "resolveStarBeastPrototypeExpressionChannelConsumption(",
    "adaptStarBeastAssetPrototype(",
    "resolveStarBeastRenderPlan",
    "requestAnimationFrame",
    "performance.now",
    "getContext(",
    "CanvasRenderingContext",
    "localStorage",
    "sessionStorage",
    "fetch(",
    "WebGL",
    'from "three"',
    'from "react"',
  ].forEach((marker) =>
    assertExcludes("readiness stays judgment-only", serviceSource, marker),
  );

  [
    "StarBeastPrototypeRendererExecutionReadiness",
    "resolveStarBeastPrototypeRendererExecutionReadiness",
    "starBeastPrototypeRendererExecutionReadiness",
  ].forEach((marker) =>
    assertExcludes("StarbeastLab remains disconnected", labSource, marker),
  );

  const callSites = [];
  const collect = (directoryPath) => {
    for (const entry of fs.readdirSync(directoryPath, { withFileTypes: true })) {
      const entryPath = path.join(directoryPath, entry.name);
      if (entry.isDirectory()) collect(entryPath);
      else if (/\.tsx?$/.test(entry.name)) {
        const source = fs.readFileSync(entryPath, "utf8");
        if (
          source.includes(
            "resolveStarBeastPrototypeRendererExecutionReadiness(",
          )
        ) {
          callSites.push(path.relative(rootDir, entryPath));
        }
      }
    }
  };
  collect(path.join(rootDir, "src"));
  assertEqual("readiness has no runtime consumer", callSites.join(","), files.service);

  [
    "RC-STAR-BEAST-PROTOTYPE-RENDERER-EXECUTION-READINESS-P84",
    "Readiness 不是 Authorization",
    "不自动绘制星兽",
    "只保存引用",
    "READY | UNAVAILABLE | BLOCKED",
    "ISOLATED_PROTOTYPE_ONLY",
    "可撤销",
    "READY_FOR_EXPLICIT_ISOLATED_PROTOTYPE_EXECUTION_AUTHORIZATION",
    "不替代、不解除也不绕过",
    "不调用 Renderer",
    "不得被 Renderer 直接消费",
  ].forEach((marker) =>
    assertIncludes("prototype execution readiness protocol", protocolSource, marker),
  );

  assertIncludes(
    "type index exports readiness input",
    typeIndexSource,
    "StarBeastPrototypeRendererExecutionReadinessInput",
  );
  assertIncludes(
    "type index exports readiness result",
    typeIndexSource,
    "StarBeastPrototypeRendererExecutionReadinessResult",
  );
  assertIncludes(
    "type index exports execution slice reference",
    typeIndexSource,
    "StarBeastPrototypeExecutionSliceReference",
  );
  assertIncludes(
    "prototype execution readiness gate registered",
    packageJson.scripts?.[
      "check:star-beast-prototype-renderer-execution-readiness"
    ] ?? "",
    "node scripts/check-star-beast-prototype-renderer-execution-readiness.mjs",
  );
  assertIncludes(
    "prototype execution readiness gate participates in release",
    packageJson.scripts?.["postcheck:release"] ?? "",
    "npm run check:star-beast-prototype-renderer-execution-readiness",
  );

  const modulePath = path.join(
    os.tmpdir(),
    `guanyao-prototype-execution-readiness-${process.pid}.mjs`,
  );
  await build({
    entryPoints: [absolute.service],
    outfile: modulePath,
    bundle: true,
    platform: "node",
    format: "esm",
    target: "node20",
    logLevel: "silent",
  });
  const { resolveStarBeastPrototypeRendererExecutionReadiness } =
    await import(`file://${modulePath}?t=${Date.now()}`);

  const isolationScopeReference = Object.freeze({
    referenceType: "STAR_BEAST_PROTOTYPE_ISOLATION_SCOPE",
    referenceId: "test:isolated-prototype",
    scope: "ISOLATED_PROTOTYPE_ONLY",
  });
  const rendererContractReference = Object.freeze({
    referenceType: "STAR_BEAST_RENDERER_CONTRACT",
    referenceId: "test:renderer-contract",
  });
  const expressionChannelsReference = Object.freeze([]);
  const sourceInputReference = Object.freeze({
    referenceType: "STAR_BEAST_PROTOTYPE_RENDERER_INPUT_REFERENCE",
    referenceId: "test:p82-input",
    expressionChannelsReference,
    rendererContractReference,
    isolatedPrototypeScopeReference: isolationScopeReference,
    stableConsumptionReference: true,
    notRenderInput: true,
    notRenderPlan: true,
    notVisualOutput: true,
    noVisualParametersCopied: true,
  });
  const inputContractBoundary = Object.freeze({
    inputContractOnly: true,
    noRendererInvocation: true,
    noRenderExecution: true,
    noDrawCommands: true,
    noPixelParameters: true,
    noRenderPlanGeneration: true,
    noExpressionChannelMutation: true,
    noAssetDefinitionMutation: true,
    noCanvasConnection: true,
    noStarbeastLabConnection: true,
    noRuntimeIntegration: true,
    noStorageWrite: true,
  });
  const contract = Object.freeze({
    semanticRole: "STAR_BEAST_PROTOTYPE_RENDERER_INPUT_CONTRACT",
    sourceConsumptionResultReference: Object.freeze({ status: "AVAILABLE" }),
    sourceInputReference,
    rendererRequestReference: Object.freeze({
      referenceType: "STAR_BEAST_PROTOTYPE_RENDERER_REQUEST",
      referenceId: "test:p83-request",
      requestPurpose: "VALIDATE_ISOLATED_PROTOTYPE_EXPRESSION",
    }),
    expressionChannelsReference,
    rendererContractReference,
    isolatedPrototypeScopeReference: isolationScopeReference,
    contractStatus:
      "AVAILABLE_FOR_FUTURE_PROTOTYPE_RENDERER_EXECUTION_READINESS",
    rendererNeutral: true,
    referenceOnly: true,
    boundary: inputContractBoundary,
  });
  const availableContractResult = Object.freeze({
    status: "AVAILABLE",
    source: "star_beast_prototype_renderer_input_contract",
    input: Object.freeze({}),
    contract,
  });
  const executionSliceReference = Object.freeze({
    referenceType: "STAR_BEAST_PROTOTYPE_EXECUTION_SLICE",
    referenceId: "test:reversible-isolated-slice",
    scope: "ISOLATED_PROTOTYPE_ONLY",
    reversible: true,
  });
  const executionStopReference = Object.freeze({
    referenceType: "STAR_BEAST_PROTOTYPE_EXECUTION_STOP",
    referenceId: "test:boundary-stop",
    stopOnBoundaryViolation: true,
  });
  const readyInput = Object.freeze({
    inputContractResultReference: availableContractResult,
    inputContractReference: contract,
    executionSliceReference,
    executionStopReference,
  });
  const before = JSON.stringify(readyInput);
  const ready = resolveStarBeastPrototypeRendererExecutionReadiness(readyInput);

  assertEqual("valid P83 contract is ready", ready.status, "READY");
  assertEqual(
    "ready only enters explicit authorization",
    ready.readiness,
    "READY_FOR_EXPLICIT_ISOLATED_PROTOTYPE_EXECUTION_AUTHORIZATION",
  );
  assertEqual("ready preserves P83 result", ready.sourceInputContractResultReference === availableContractResult, true);
  assertEqual("ready preserves contract", ready.inputContractReference === contract, true);
  assertEqual("ready preserves execution slice", ready.executionSliceReference === executionSliceReference, true);
  assertEqual("ready preserves stop reference", ready.executionStopReference === executionStopReference, true);
  assertEqual("readiness does not invoke renderer", ready.boundary.noRendererInvocation, true);
  assertEqual("readiness does not execute render", ready.boundary.noRenderExecution, true);
  assertEqual("readiness requires explicit authorization", ready.boundary.explicitExecutionAuthorizationRequired, true);
  assertEqual("readiness mutates no input", JSON.stringify(readyInput) === before, true);

  const missingContract = resolveStarBeastPrototypeRendererExecutionReadiness(
    Object.freeze({ ...readyInput, inputContractReference: null }),
  );
  assertEqual("missing contract is unavailable", missingContract.status, "UNAVAILABLE");
  assertEqual("missing contract reason", missingContract.reason, "INPUT_CONTRACT_REFERENCE_REQUIRED");

  const unavailableUpstream = Object.freeze({
    status: "UNAVAILABLE",
    reason: "PROTOTYPE_RENDERER_INPUT_REFERENCE_REQUIRED",
  });
  const unavailable = resolveStarBeastPrototypeRendererExecutionReadiness(
    Object.freeze({ ...readyInput, inputContractResultReference: unavailableUpstream }),
  );
  assertEqual("P83 unavailable stays unavailable", unavailable.status, "UNAVAILABLE");
  assertEqual("P83 unavailable reason is preserved", unavailable.sourceUnavailableReason, unavailableUpstream.reason);

  const blockedUpstream = Object.freeze({
    status: "BLOCKED",
    reason: "PROTOTYPE_RENDERER_INPUT_REFERENCE_MISMATCH",
  });
  const upstreamBlocked = resolveStarBeastPrototypeRendererExecutionReadiness(
    Object.freeze({ ...readyInput, inputContractResultReference: blockedUpstream }),
  );
  assertEqual("P83 blocked stays blocked", upstreamBlocked.status, "BLOCKED");
  assertEqual("P83 blocked reason is preserved", upstreamBlocked.sourceBlockedReason, blockedUpstream.reason);

  const driftedContract = Object.freeze({ ...contract });
  const referenceBlocked = resolveStarBeastPrototypeRendererExecutionReadiness(
    Object.freeze({ ...readyInput, inputContractReference: driftedContract }),
  );
  assertEqual("contract reference drift is blocked", referenceBlocked.status, "BLOCKED");
  assertEqual("contract drift reason", referenceBlocked.reason, "INPUT_CONTRACT_REFERENCE_MISMATCH");

  const invalidSlice = resolveStarBeastPrototypeRendererExecutionReadiness(
    Object.freeze({
      ...readyInput,
      executionSliceReference: Object.freeze({
        ...executionSliceReference,
        reversible: false,
      }),
    }),
  );
  assertEqual("non-reversible slice is blocked", invalidSlice.status, "BLOCKED");
  assertEqual("non-reversible slice reason", invalidSlice.reason, "EXECUTION_SLICE_REFERENCE_INVALID");

  const invalidStop = resolveStarBeastPrototypeRendererExecutionReadiness(
    Object.freeze({
      ...readyInput,
      executionStopReference: Object.freeze({
        ...executionStopReference,
        stopOnBoundaryViolation: false,
      }),
    }),
  );
  assertEqual("invalid stop is blocked", invalidStop.status, "BLOCKED");
  assertEqual("invalid stop reason", invalidStop.reason, "EXECUTION_STOP_REFERENCE_INVALID");

  fs.rmSync(modulePath, { force: true });
}

if (failures.length > 0) {
  console.error(
    `FAIL | star beast prototype renderer execution readiness | count=${failures.length}`,
  );
  failures.forEach((failure) => console.error(`- ${failure}`));
  process.exit(1);
}

console.log("PASS | star beast prototype renderer execution readiness gate");
