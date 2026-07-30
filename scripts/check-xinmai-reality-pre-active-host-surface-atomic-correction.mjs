import fs from "node:fs";
import path from "node:path";
import process from "node:process";
import { build } from "esbuild";

const rootDir = process.cwd();
const read = (file) =>
  fs.readFileSync(path.join(rootDir, file), "utf8");
const source = {
  route: read("src/pages/RealityProductionRouteEntry.tsx"),
  host: read("src/components/RealityProductionHost.tsx"),
  presentation: read(
    "src/components/RealityPressureSeedPresentation.tsx",
  ),
  routeType: read("src/types/realityProductionRouteEntry.ts"),
  presentationType: read(
    "src/types/realityPressureSeedPresentation.ts",
  ),
  controller: read(
    "src/services/xinmaiRealityEncounterIntentController.ts",
  ),
  packageManifest: read("package.json"),
};

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

try {
  for (const marker of [
    "RealityActiveCommitReceipt",
    "preActivePresentationReady",
    "activeInteractionReady",
    "RealityHostInteractionAuthority",
    'phase: "PRE_ACTIVE_PRESENTATION"',
    'phase: "ACTIVE_INTERACTION"',
    "admissionRevision:",
    "activeRevision:",
    "encounterAdmission.intentRevision + 1",
    "commitRealityEncounterActive(outcome)",
    "setActiveCommitReceipt",
    "realityInteractionAuthority={",
  ]) {
    assertIncludes(
      "Route establishes one typed pre-active to active cutover",
      source.route,
      marker,
    );
  }

  assertEqual(
    "Route mounts one production Host",
    (
      source.route.match(
        /<RealityProductionHost(?:\s|>)/g,
      ) ?? []
    ).length,
    1,
  );
  assertExcludes(
    "Old Active-before-Host guard is removed",
    source.route,
    "ACTIVE_REALITY_INTENT_REQUIRED",
  );
  assertExcludes(
    "Old reference-only Active receipt is removed",
    source.route,
    "activeIntentReferenceId",
  );
  assertEqual(
    "Controller remains the only Route Active command",
    (
      source.route.match(
        /commitRealityEncounterActive/g,
      ) ?? []
    ).length,
    2,
  );
  assertIncludes(
    "Controller still owns the Active transition",
    source.controller,
    'state: "ACTIVE_IN_REALITY"',
  );
  assertIncludes(
    "Controller advances the Active revision",
    source.controller,
    "const active = nextIntent(intent",
  );

  for (const marker of [
    "realityInteractionAuthority",
    "realityInteractionActive",
    '"PRE_ACTIVE_REALITY_SURFACE_PRESENTATION"',
    '"AUTHORIZED_PRODUCTION_REALITY_SOURCE"',
    "data-reality-host-instance-key={acceptanceAttemptKey}",
    '"PRE_ACTIVE_PRESENTATION"',
    '"ACTIVE_INTERACTION"',
    '"NOT_READY_UNTIL_REALITY_ACTIVE"',
    "interactionEnabled={realityInteractionActive}",
    "!realityInteractionActive ||",
    "encounterAdmission.intentRevision + 1",
  ]) {
    assertIncludes(
      "Host presents one surface before Active and gates interaction",
      source.host,
      marker,
    );
  }
  assertEqual(
    "Pressure commands, receipt recovery and Gravity approach are Active-gated",
    (
      source.host.match(
        /!realityInteractionActive \|\|/g,
      ) ?? []
    ).length,
    5,
  );
  assertExcludes(
    "Host cannot own Active Controller mutation",
    source.host,
    "commitRealityEncounterActive",
  );

  for (const marker of [
    "interactionEnabled: boolean",
    "RealityPressureSeedPresentationProps",
  ]) {
    assertIncludes(
      "Candidate surface receives an explicit interaction contract",
      source.presentationType,
      marker,
    );
  }
  for (const marker of [
    "interactionEnabled &&",
    '"PRE_ACTIVE_PRESENTATION_ONLY"',
    '"ACTIVE_INTERACTION"',
  ]) {
    assertIncludes(
      "Candidate surface stays visible while actions remain locked",
      source.presentation,
      marker,
    );
  }

  for (const marker of [
    "preActiveHostSurfaceRequired: true",
    "singleHostPhaseTransitionRequired: true",
    "controllerActiveAuthorityOnly: true",
    "admissionActiveRevisionSeparationRequired: true",
    "preActiveSurfacePresentationRequired: true",
    "activeInteractionAuthorityRequired: true",
    "preActivePressureInteractionForbidden: true",
  ]) {
    assertIncludes(
      "Route and Host contract freeze the causal cutover",
      source.routeType,
      marker,
    );
  }

  for (const forbidden of [
    "querySelector",
    "MutationObserver",
    "sessionStorage",
    "localStorage",
  ]) {
    assertExcludes(
      "Atomic correction creates no DOM or storage authority",
      `${source.route}\n${source.host}`,
      forbidden,
    );
  }

  const packageJson = JSON.parse(source.packageManifest);
  assertIncludes(
    "Atomic correction gate is registered",
    packageJson.scripts?.[
      "check:xinmai-reality-pre-active-host-surface-atomic-correction"
    ] ?? "",
    "node scripts/check-xinmai-reality-pre-active-host-surface-atomic-correction.mjs",
  );

  const compileResult = await build({
    entryPoints: [
      path.join(
        rootDir,
        "src/pages/RealityProductionRouteEntry.tsx",
      ),
    ],
    bundle: true,
    platform: "browser",
    format: "esm",
    target: "es2022",
    write: false,
    logLevel: "silent",
    loader: { ".css": "empty" },
  });
  assertEqual(
    "Corrected Reality route compiles independently",
    compileResult.errors.length,
    0,
  );

  console.log(
    "\n[XINMAI REALITY PRE-ACTIVE HOST SURFACE ATOMIC CORRECTION] PASS",
  );
} catch (error) {
  console.error(
    "[XINMAI REALITY PRE-ACTIVE HOST SURFACE ATOMIC CORRECTION] FAIL",
  );
  console.error(
    error instanceof Error ? error.message : error,
  );
  process.exit(1);
}
