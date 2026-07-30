import fs from "node:fs";
import path from "node:path";
import process from "node:process";
import { build } from "esbuild";

const rootDir = process.cwd();
const read = (file) =>
  fs.readFileSync(path.join(rootDir, file), "utf8");
const files = {
  route: "src/pages/RealityProductionRouteEntry.tsx",
  routeType: "src/types/realityProductionRouteEntry.ts",
  controller:
    "src/services/xinmaiRealityEncounterIntentController.ts",
  recovery:
    "src/services/xinmaiRealityEncounterIntentRecoveryAdapter.ts",
  activation:
    "src/services/realityRouteActivationSourceContext.ts",
  host: "src/components/RealityProductionHost.tsx",
};
const source = Object.fromEntries(
  Object.entries(files).map(([name, file]) => [name, read(file)]),
);

const assertEqual = (name, actual, expected) => {
  if (actual !== expected) {
    throw new Error(`${name} expected=${expected} actual=${actual}`);
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

try {
  const firstRouteEffect = source.route.indexOf("useEffect(() => {");
  const admissionCall = source.route.indexOf(
    "establishRealityEncounterAdmission({",
  );
  const activationCall = source.route.indexOf(
    "activateRealityRouteActivationSourceContext({",
  );

  assertEqual(
    "Route has a post-commit effect owner",
    firstRouteEffect >= 0,
    true,
  );
  assertEqual(
    "Admission executes after the post-commit effect begins",
    admissionCall > firstRouteEffect,
    true,
  );
  assertEqual(
    "Activation executes after the post-commit effect begins",
    activationCall > firstRouteEffect,
    true,
  );
  assertExcludes(
    "Route has no useMemo side-effect owner",
    source.route,
    "useMemo",
  );
  assertExcludes(
    "Route no longer clears Activation during render",
    source.route,
    "clearRealityRouteActivationSourceContext()",
  );
  assertIncludes(
    "Route clears only a stale matching Admission",
    source.route,
    "clearRealityRouteActivationSourceContextForAdmission",
  );
  assertIncludes(
    "Route owns one typed post-commit state",
    source.route,
    "PostCommitAdmissionTransactionState",
  );
  assertIncludes(
    "Route scopes asynchronous publication by epoch",
    source.route,
    "postCommitTransactionEpochRef",
  );
  assertIncludes(
    "Route reuses one committed transaction across Strict Mode effects",
    source.route,
    "committedPostCommitTransactionRef",
  );
  assertIncludes(
    "Transaction identity includes encounter cycle",
    source.route,
    "encounterAdmission.encounterCycleId",
  );
  assertIncludes(
    "Transaction identity includes source reference",
    source.route,
    "encounterAdmission.identityReferences.sourceReferenceId",
  );
  assertIncludes(
    "Transaction identity includes StarBeast reference",
    source.route,
    "starBeastIdentityReferenceId",
  );
  assertIncludes(
    "Transaction identity includes mansion reference",
    source.route,
    "mansionCoordinateReferenceId",
  );
  assertIncludes(
    "Transaction identity includes admission revision",
    source.route,
    "String(encounterAdmission.intentRevision)",
  );
  assertIncludes(
    "Transaction identity includes route target",
    source.route,
    "REALITY_PRODUCTION_ROUTE_TARGET",
  );
  assertIncludes(
    "Route rolls Admission back when Activation cannot commit",
    source.route,
    "rollbackRealityEncounterAdmission",
  );
  assertIncludes(
    "Ordinary cleanup only invalidates UI publication",
    source.route,
    "Cleanup invalidates UI publication only",
  );
  assertExcludes(
    "Route cleanup does not terminate Intent",
    source.route,
    "terminateRealityEncounter(\"EXPLICIT_LEAVE\"",
  );
  assertExcludes(
    "Route has no direct Recovery write",
    source.route,
    "writeRealityEncounterRecoveryCandidate",
  );
  assertExcludes(
    "Route has no direct storage access",
    source.route,
    "sessionStorage",
  );

  for (const marker of [
    "postCommitAdmissionTransactionRequired: true",
    "renderPhaseAdmissionMutationForbidden: true",
    "ordinaryCleanupDoesNotTerminateIntent: true",
    "singleAdmissionSuccessPath: true",
  ]) {
    assertIncludes(
      "Route boundary freezes post-commit ownership",
      source.route,
      marker,
    );
    assertIncludes(
      "Route type freezes post-commit ownership",
      source.routeType,
      marker,
    );
  }

  assertIncludes(
    "Controller commits Admission through canonical transaction",
    source.controller,
    "transactRealityAdventureContinuity",
  );
  assertIncludes(
    "Controller exposes admission rollback only",
    source.controller,
    "rollbackRealityEncounterAdmission",
  );
  assertIncludes(
    "Controller reports Recovery failure",
    source.controller,
    '"RECOVERY_STORAGE_UNAVAILABLE"',
  );
  assertExcludes(
    "Controller remains free of direct storage APIs",
    source.controller,
    "sessionStorage",
  );
  assertIncludes(
    "Recovery Adapter remains the only session writer",
    source.recovery,
    "window.sessionStorage",
  );
  assertIncludes(
    "Activation clear is revision scoped",
    source.activation,
    "clearRealityRouteActivationSourceContextForAdmission",
  );
  assertIncludes(
    "Host remains the typed surface outcome producer",
    source.host,
    "resolveRealitySurfaceAdmissionTransaction",
  );
  assertEqual(
    "Route has one Controller Active caller",
    (source.route.match(/commitRealityEncounterActive/g) ?? []).length,
    2,
  );

  const compileResult = await build({
    entryPoints: [path.join(rootDir, files.route)],
    bundle: true,
    platform: "browser",
    format: "esm",
    target: "es2022",
    write: false,
    logLevel: "silent",
    loader: { ".css": "empty" },
  });
  assertEqual(
    "Post-commit Reality route compiles independently",
    compileResult.errors.length,
    0,
  );

  console.log(
    "\n[XINMAI REALITY ROUTE ADMISSION POST-COMMIT ATOMIC MIGRATION] PASS",
  );
} catch (error) {
  console.error(
    "[XINMAI REALITY ROUTE ADMISSION POST-COMMIT ATOMIC MIGRATION] FAIL",
  );
  console.error(error instanceof Error ? error.message : error);
  process.exit(1);
}
