import fs from "node:fs";
import path from "node:path";
import process from "node:process";

const rootDir = process.cwd();
const read = (file) => fs.readFileSync(path.join(rootDir, file), "utf8");
const source = {
  type: read("src/types/xinmaiRealityEncounterIntent.ts"),
  controller: read("src/services/xinmaiRealityEncounterIntentController.ts"),
  recovery: read("src/services/xinmaiRealityEncounterIntentRecoveryAdapter.ts"),
  identity: read("src/services/realityRecognizedIdentityRecoveryAdapter.ts"),
  genesis: read("src/pages/GenesisProductionExperiencePage.tsx"),
  returning: read("src/pages/LaunchLab.tsx"),
  choice: read("src/pages/GravityPage.tsx"),
  route: read("src/pages/RealityProductionRouteEntry.tsx"),
  routeType: read("src/types/realityProductionRouteEntry.ts"),
  authorization: read("src/services/realityProductionRouteAuthorization.ts"),
  activation: read("src/services/realityRouteActivationSourceContext.ts"),
  host: read("src/components/RealityProductionHost.tsx"),
  surfaceTransaction: read(
    "src/services/xinmaiRealitySurfaceAdmissionTransaction.ts",
  ),
  lifeSurface: read(
    "src/components/RealityLifeUniverseCanvas.tsx",
  ),
  pressureSurface: read(
    "src/components/RealityPressureSeedPresentation.tsx",
  ),
  app: read("src/App.tsx"),
};

const assertIncludes = (name, text, marker) => {
  if (!text.includes(marker)) throw new Error(`${name} missing=${marker}`);
  console.log(`PASS | ${name}`);
};
const assertExcludes = (name, text, marker) => {
  if (text.includes(marker)) throw new Error(`${name} forbidden=${marker}`);
  console.log(`PASS | ${name}`);
};
const assertEqual = (name, actual, expected) => {
  if (actual !== expected) throw new Error(`${name} expected=${expected} actual=${actual}`);
  console.log(`PASS | ${name}`);
};

try {
  for (const state of [
    "READY_TO_ENTER_REALITY",
    "ACCEPTING_REALITY",
    "FAILED_RETRYABLE",
    "ACTIVE_IN_REALITY",
    "RECOVERING",
    "TERMINAL",
  ]) {
    assertIncludes(`typed state ${state}`, source.type, `"${state}"`);
  }
  assertIncludes("Controller solely generates cycle", source.controller, "encounterCycleId: `reality-encounter:${opaqueId()}`");
  assertIncludes("Controller commits only Host outcome", source.controller, "commitRealityEncounterActive");
  assertIncludes("Controller rejects stale revision", source.controller, "currentIntent.revision !== outcome.intentRevision");
  assertIncludes("Recovery Adapter is the storage boundary", source.recovery, "window.sessionStorage");
  assertExcludes("Controller has no storage API", source.controller, "sessionStorage");
  assertIncludes("Identity Adapter consumes three existing refs", source.identity, "starBeastIdentityReferenceId");
  assertIncludes("Identity Adapter consumes mansion coordinate ref", source.identity, "mansionCoordinateReferenceId");

  for (const [name, text, origin] of [
    ["Genesis", source.genesis, "FIRST_ENCOUNTER"],
    ["Returning", source.returning, "RETURNING_LIFE_WORLD"],
    ["Choice", source.choice, "CHOICE_CONTINUATION"],
  ]) {
    assertIncludes(`${name} requests the single Intent authority`, text, "requestRealityEncounter");
    assertIncludes(`${name} carries its explicit origin`, text, `origin: "${origin}"`);
    assertIncludes(`${name} navigates with intent reference`, text, "intentReferenceId");
  }
  assertExcludes("Genesis no longer activates Reality source", source.genesis, "activateRealityRouteActivationSourceContext");
  assertExcludes("Returning does not create activation source", source.returning, "activateRealityRouteActivationSourceContext");
  assertExcludes("Choice does not write Recovery storage", source.choice, "xinmaiRealityEncounterIntentRecoveryAdapter");

  assertIncludes("Route asks Controller for admission", source.route, "establishRealityEncounterAdmission");
  assertIncludes("Route owns post-commit transaction state", source.route, "PostCommitAdmissionTransactionState");
  assertIncludes("Route scopes post-commit work by epoch", source.route, "postCommitTransactionEpochRef");
  assertIncludes("Route reuses one committed transaction across Strict Mode effects", source.route, "committedPostCommitTransactionRef");
  assertIncludes("Route can rollback an incomplete Admission", source.route, "rollbackRealityEncounterAdmission");
  assertExcludes("Route no longer mutates Admission in useMemo", source.route, "useMemo");
  assertExcludes("Route no longer clears Activation during render", source.route, "clearRealityRouteActivationSourceContext()");
  assertIncludes("Route consumes typed identity recovery", source.route, "recoverRealityRecognizedIdentity");
  for (const marker of [
    "typedIdentityRecoveryAdapterConsumptionOnly: true",
    "typedIntentRecoveryViaControllerOnly: true",
    "noDirectStorageRead: true",
    "recoveryCandidateIsNotAuthority: true",
    "identityOnlyAuthorizationForbidden: true",
    "postCommitAdmissionTransactionRequired: true",
    "renderPhaseAdmissionMutationForbidden: true",
    "ordinaryCleanupDoesNotTerminateIntent: true",
    "singleAdmissionSuccessPath: true",
  ]) {
    assertIncludes("Route recovery boundary names the current typed path", source.route, marker);
    assertIncludes("Route recovery type names the current typed path", source.routeType, marker);
  }
  assertIncludes("Route reports assembly failure", source.route, "failRealityEncounterAcceptance");
  assertIncludes("Route commits through Controller", source.route, "commitRealityEncounterActive");
  assertIncludes("Reality handoff terminates entry intent", source.route, 'terminateRealityEncounter(\n        "ENCOUNTER_COMPLETED"');
  assertExcludes("Route no longer restores identity-only Entry Context", source.route, "restoreGenesisProductionRealityEntryContext");
  assertExcludes("Route does not read persisted identity services directly", source.route, "readPersistedGenesisVisualContinuity");
  assertExcludes("Route has no fixed encounter cycle", source.route, 'return "NEW_REALITY_ENCOUNTER"');

  assertIncludes("Authorization receives explicit admission", source.authorization, "input.encounterAdmission");
  assertIncludes("Authorization receives explicit identity context", source.authorization, "input.identityEntryContext");
  assertExcludes("Authorization removed implicit Entry Context read", source.authorization, "readGenesisProductionRealityEntryContext");
  assertIncludes("Activation is cycle-scoped", source.activation, "encounterAdmission.encounterCycleId");
  assertIncludes("Activation is revision-scoped", source.activation, "encounterAdmission.intentRevision");

  assertIncludes("Host reports real minimum surface outcome", source.host, 'status: "REALITY_MINIMUM_PRESENTED"');
  assertIncludes("Host assembles typed surface transaction", source.host, "resolveRealitySurfaceAdmissionTransaction");
  assertIncludes("Life surface reports typed outcome", source.lifeSurface, "onRealityLifeSurfaceOutcome");
  assertIncludes("Pressure surface reports typed outcome", source.pressureSurface, "onRealityPressureSurfaceOutcome");
  assertIncludes("Surface transaction validates identity", source.surfaceTransaction, "identityMatches");
  assertExcludes("Host no longer inspects child DOM", source.host, "querySelector");
  assertExcludes("Host has no frame-delay success path", source.host, "requestAnimationFrame");
  assertIncludes("Host does not own Active state", source.host, "onRealityAcceptanceOutcome");
  assertIncludes("App owns route chunk failure boundary", source.app, "RealityRouteLoadBoundary");
  assertIncludes("App reports route load failure", source.app, 'reason: "ROUTE_LOAD_UNAVAILABLE"');
  assertIncludes("App retries the same Controller intent", source.app, "retryRealityEncounterAcceptance");

  for (const forbidden of [
    "lifeWhisperText",
    "relationshipName",
    "selectedPressureSeedContext",
    "sixDimension",
    "gravityState",
    "choiceResult",
    "archiveEntry",
  ]) {
    assertExcludes(`Intent contract excludes ${forbidden}`, source.type, forbidden);
  }

  const runtimeConsumers = [
    ["Pressure Seed consumer", read("src/services/realityProductionPressureSeedConsumer.ts")],
    ["Six Dimension page", source.choice],
    ["Crystal runtime", read("src/services/guanyaoDynamicsCrystalRuntimeAdapter.ts")],
    ["Renderer", read("src/renderers/genesisWebGLRendererCore.ts")],
  ];
  for (const [name, text] of runtimeConsumers) {
    if (name === "Six Dimension page") continue;
    assertExcludes(`${name} does not consume Intent Controller`, text, "xinmaiRealityEncounterIntentController");
  }
  assertEqual(
    "Runtime has one commitActive caller outside Controller",
    (source.route.match(/commitRealityEncounterActive/g) ?? []).length,
    2,
  );

  console.log("\n[XINMAI REALITY ENCOUNTER INTENT ATOMIC MIGRATION] PASS");
} catch (error) {
  console.error("[XINMAI REALITY ENCOUNTER INTENT ATOMIC MIGRATION] FAIL");
  console.error(error instanceof Error ? error.message : error);
  process.exit(1);
}
