import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import process from "node:process";
import { build } from "esbuild";

const rootDir = process.cwd();
const files = Object.freeze({
  type: "src/types/starBeastPrototypeExplicitExecutionAuthorizationCommand.ts",
  service: "src/services/starBeastPrototypeExplicitExecutionAuthorizationCommand.ts",
  readinessType: "src/types/starBeastPrototypeRendererExecutionReadiness.ts",
  readinessService: "src/services/starBeastPrototypeRendererExecutionReadiness.ts",
  protocol: "docs/GUANYAO_STAR_BEAST_PROTOTYPE_EXPLICIT_EXECUTION_AUTHORIZATION_COMMAND_PROTOCOL.md",
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
    "export type StarBeastPrototypeExecutionAuthorityReference",
    'authorityScope: "ISOLATED_PROTOTYPE_EXECUTION_ONLY"',
    '"AUTHORIZE_ISOLATED_PROTOTYPE_EXECUTION"',
    "export type StarBeastPrototypeExplicitExecutionAuthorizationCommandInput",
    "readinessResultReference:",
    "authorityReference: StarBeastPrototypeExecutionAuthorityReference | null",
    "export type StarBeastPrototypeExplicitExecutionAuthorizationCommand",
    '"STAR_BEAST_PROTOTYPE_EXPLICIT_EXECUTION_AUTHORIZATION_COMMAND"',
    '"AUTHORIZE_FUTURE_ISOLATED_PROTOTYPE_EXECUTION_RESOLUTION"',
    'status: "AVAILABLE"',
    'status: "NOT_READY"',
    'status: "UNAVAILABLE"',
    'status: "BLOCKED"',
    "commandOnly: true",
    "notExecutionAuthorization: true",
    "executionAuthorizationDeferred: true",
    "noRendererInvocation: true",
    "noRenderExecution: true",
    "noBackendSelection: true",
    "noCanvasConnection: true",
    "noStarbeastLabConnection: true",
    "noRuntimeIntegration: true",
    "noStorageWrite: true",
  ].forEach((marker) =>
    assertIncludes("prototype explicit command type", typeSource, marker),
  );

  [
    "export function resolveStarBeastPrototypeExplicitExecutionAuthorizationCommand",
    'readiness.status === "UNAVAILABLE"',
    'readiness.status === "BLOCKED"',
    '"PROTOTYPE_EXECUTION_AUTHORITY_REFERENCE_REQUIRED"',
    '"PROTOTYPE_EXECUTION_AUTHORITY_REFERENCE_INVALID"',
    '"EXPLICIT_ISOLATED_PROTOTYPE_EXECUTION_DECISION_REQUIRED"',
    'input.decision !== "AUTHORIZE_ISOLATED_PROTOTYPE_EXECUTION"',
    'status: "AVAILABLE"',
    "readiness.inputContractReference",
    "readiness.executionSliceReference",
    "readiness.executionStopReference",
  ].forEach((marker) =>
    assertIncludes("prototype explicit command service", serviceSource, marker),
  );

  [
    "resolveStarBeastPrototypeRendererExecutionReadiness(",
    "resolveStarBeastPrototypeRendererInputContract(",
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
    assertExcludes("command stays decision-only", serviceSource, marker),
  );

  [
    "StarBeastPrototypeExplicitExecutionAuthorizationCommand",
    "resolveStarBeastPrototypeExplicitExecutionAuthorizationCommand",
    "starBeastPrototypeExplicitExecutionAuthorizationCommand",
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
            "resolveStarBeastPrototypeExplicitExecutionAuthorizationCommand(",
          )
        ) {
          callSites.push(path.relative(rootDir, entryPath));
        }
      }
    }
  };
  collect(path.join(rootDir, "src"));
  assertEqual("command has no runtime consumer", callSites.join(","), files.service);

  [
    "RC-STAR-BEAST-PROTOTYPE-EXPLICIT-EXECUTION-AUTHORIZATION-COMMAND-P85",
    "P84 READY",
    "主体显式 AUTHORIZE",
    "Command 不是正式 Authorization",
    "不得从 P84 READY 自动生成 Command",
    "ISOLATED_PROTOTYPE_EXECUTION_ONLY",
    "AUTHORIZE_ISOLATED_PROTOTYPE_EXECUTION",
    "AVAILABLE",
    "NOT_READY",
    "UNAVAILABLE",
    "BLOCKED",
    "不替代、不解除、不复用",
    "不反向调用 P84",
    "不得被 Renderer 直接消费",
  ].forEach((marker) =>
    assertIncludes("prototype explicit command protocol", protocolSource, marker),
  );

  assertIncludes(
    "type index exports command input",
    typeIndexSource,
    "StarBeastPrototypeExplicitExecutionAuthorizationCommandInput",
  );
  assertIncludes(
    "type index exports command result",
    typeIndexSource,
    "StarBeastPrototypeExplicitExecutionAuthorizationCommandResult",
  );
  assertIncludes(
    "type index exports prototype authority",
    typeIndexSource,
    "StarBeastPrototypeExecutionAuthorityReference",
  );
  assertIncludes(
    "prototype explicit command gate registered",
    packageJson.scripts?.[
      "check:star-beast-prototype-explicit-execution-authorization-command"
    ] ?? "",
    "node scripts/check-star-beast-prototype-explicit-execution-authorization-command.mjs",
  );
  assertIncludes(
    "prototype explicit command gate participates in release",
    packageJson.scripts?.["postcheck:release"] ?? "",
    "npm run check:star-beast-prototype-explicit-execution-authorization-command",
  );

  const modulePath = path.join(
    os.tmpdir(),
    `guanyao-prototype-explicit-command-${process.pid}.mjs`,
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
  const { resolveStarBeastPrototypeExplicitExecutionAuthorizationCommand } =
    await import(`file://${modulePath}?t=${Date.now()}`);

  const inputContractReference = Object.freeze({
    semanticRole: "STAR_BEAST_PROTOTYPE_RENDERER_INPUT_CONTRACT",
  });
  const executionSliceReference = Object.freeze({
    referenceType: "STAR_BEAST_PROTOTYPE_EXECUTION_SLICE",
    referenceId: "test:isolated-slice",
    scope: "ISOLATED_PROTOTYPE_ONLY",
    reversible: true,
  });
  const executionStopReference = Object.freeze({
    referenceType: "STAR_BEAST_PROTOTYPE_EXECUTION_STOP",
    referenceId: "test:boundary-stop",
    stopOnBoundaryViolation: true,
  });
  const ready = Object.freeze({
    status: "READY",
    readiness:
      "READY_FOR_EXPLICIT_ISOLATED_PROTOTYPE_EXECUTION_AUTHORIZATION",
    source: "star_beast_prototype_renderer_execution_readiness",
    input: Object.freeze({}),
    sourceInputContractResultReference: Object.freeze({ status: "AVAILABLE" }),
    inputContractReference,
    executionSliceReference,
    executionStopReference,
    boundary: Object.freeze({
      readinessOnly: true,
      explicitExecutionAuthorizationRequired: true,
      executionAuthorizationDeferred: true,
      noRendererInvocation: true,
      noRenderExecution: true,
      noDrawCommands: true,
      noBackendSelection: true,
      noRenderPlanGeneration: true,
      noCanvasConnection: true,
      noStarbeastLabConnection: true,
      noRuntimeIntegration: true,
      noStorageWrite: true,
    }),
  });
  const authorityReference = Object.freeze({
    referenceType: "STAR_BEAST_PROTOTYPE_EXECUTION_AUTHORITY",
    referenceId: "test:life-subject-authority",
    authorityScope: "ISOLATED_PROTOTYPE_EXECUTION_ONLY",
  });
  const availableInput = Object.freeze({
    readinessResultReference: ready,
    authorityReference,
    decision: "AUTHORIZE_ISOLATED_PROTOTYPE_EXECUTION",
  });
  const before = JSON.stringify(availableInput);
  const available =
    resolveStarBeastPrototypeExplicitExecutionAuthorizationCommand(
      availableInput,
    );

  assertEqual("READY plus explicit decision creates command", available.status, "AVAILABLE");
  assertEqual("command preserves readiness", available.command.readinessReference === ready, true);
  assertEqual("command preserves authority", available.command.authorityReference === authorityReference, true);
  assertEqual("command preserves input contract", available.command.inputContractReference === inputContractReference, true);
  assertEqual("command preserves execution slice", available.command.executionSliceReference === executionSliceReference, true);
  assertEqual("command preserves stop reference", available.command.executionStopReference === executionStopReference, true);
  assertEqual("command is not authorization", available.command.boundary.notExecutionAuthorization, true);
  assertEqual("command does not invoke renderer", available.command.boundary.noRendererInvocation, true);
  assertEqual("command does not execute render", available.command.boundary.noRenderExecution, true);
  assertEqual("command mutates no input", JSON.stringify(availableInput) === before, true);

  const noDecision =
    resolveStarBeastPrototypeExplicitExecutionAuthorizationCommand(
      Object.freeze({ ...availableInput, decision: null }),
    );
  assertEqual("missing explicit decision is not ready", noDecision.status, "NOT_READY");
  assertEqual("missing decision reason", noDecision.reason, "EXPLICIT_ISOLATED_PROTOTYPE_EXECUTION_DECISION_REQUIRED");

  const noAuthority =
    resolveStarBeastPrototypeExplicitExecutionAuthorizationCommand(
      Object.freeze({ ...availableInput, authorityReference: null }),
    );
  assertEqual("missing authority is not ready", noAuthority.status, "NOT_READY");
  assertEqual("missing authority reason", noAuthority.reason, "PROTOTYPE_EXECUTION_AUTHORITY_REFERENCE_REQUIRED");

  const invalidAuthority =
    resolveStarBeastPrototypeExplicitExecutionAuthorizationCommand(
      Object.freeze({
        ...availableInput,
        authorityReference: Object.freeze({
          ...authorityReference,
          authorityScope: "PRODUCT_RUNTIME",
        }),
      }),
    );
  assertEqual("non-isolated authority is not ready", invalidAuthority.status, "NOT_READY");
  assertEqual("non-isolated authority reason", invalidAuthority.reason, "PROTOTYPE_EXECUTION_AUTHORITY_REFERENCE_INVALID");

  const unavailableReadiness = Object.freeze({
    status: "UNAVAILABLE",
    reason: "INPUT_CONTRACT_RESULT_REFERENCE_REQUIRED",
  });
  const unavailable =
    resolveStarBeastPrototypeExplicitExecutionAuthorizationCommand(
      Object.freeze({
        ...availableInput,
        readinessResultReference: unavailableReadiness,
      }),
    );
  assertEqual("P84 unavailable stays unavailable", unavailable.status, "UNAVAILABLE");
  assertEqual("P84 unavailable reason is preserved", unavailable.sourceReadinessReason, unavailableReadiness.reason);

  const blockedReadiness = Object.freeze({
    status: "BLOCKED",
    reason: "INPUT_CONTRACT_REFERENCE_MISMATCH",
  });
  const blocked =
    resolveStarBeastPrototypeExplicitExecutionAuthorizationCommand(
      Object.freeze({
        ...availableInput,
        readinessResultReference: blockedReadiness,
      }),
    );
  assertEqual("P84 blocked stays blocked", blocked.status, "BLOCKED");
  assertEqual("P84 blocked reason is preserved", blocked.sourceReadinessReason, blockedReadiness.reason);

  fs.rmSync(modulePath, { force: true });
}

if (failures.length > 0) {
  console.error(
    `FAIL | star beast prototype explicit execution authorization command | count=${failures.length}`,
  );
  failures.forEach((failure) => console.error(`- ${failure}`));
  process.exit(1);
}

console.log(
  "PASS | star beast prototype explicit execution authorization command gate",
);
