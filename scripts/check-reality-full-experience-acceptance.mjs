import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import process from "node:process";
import { build } from "esbuild";

const rootDir = process.cwd();
const files = Object.freeze({
  type: "src/types/realityFullExperienceAcceptance.ts",
  service: "src/services/realityFullExperienceAcceptance.ts",
  carry: "src/services/presenceCarryRealityTransition.ts",
  continuity: "src/services/realityExperienceContinuityOptimization.ts",
  typeIndex: "src/types/index.ts",
  packageManifest: "package.json",
});
const failures = [];
const source = {};

const assertIncludes = (name, value, marker) => {
  if (value.includes(marker)) console.log(`PASS | ${name} | includes=${marker}`);
  else failures.push(`${name} missing=${marker}`);
};
const assertExcludes = (name, value, marker) => {
  if (value.includes(marker)) failures.push(`${name} forbidden=${marker}`);
  else console.log(`PASS | ${name} | forbidden=absent`);
};
const assertEqual = (name, actual, expected) => {
  if (actual === expected) console.log(`PASS | ${name} | expected=${String(expected)}`);
  else failures.push(`${name} expected=${String(expected)} actual=${String(actual)}`);
};

for (const [name, relative] of Object.entries(files)) {
  const filePath = path.join(rootDir, relative);
  if (!fs.existsSync(filePath)) failures.push(`${name} missing=${filePath}`);
  else {
    source[name] = fs.readFileSync(filePath, "utf8");
    console.log(`PASS | ${name} file exists`);
  }
}

if (failures.length === 0) {
  const packageJson = JSON.parse(source.packageManifest);

  [
    "RealityFullExperienceAcceptance",
    "presenceCarryQuality",
    "pressureObservationQuality",
    "gravityAwarenessQuality",
    "choiceAgencyQuality",
    "crystalTransitionReadiness",
    "realityJourneyIntegrity",
    "PRESENCE_CARRY",
    "PRESSURE_ANALYSIS_DRIFT",
    "GRAVITY_JUDGEMENT_DRIFT",
    "CHOICE_AGENCY_WEAK",
    "PRESENCE_CARRY_BREAK",
    "CRYSTAL_REWARD_DRIFT",
    "OBSERVATION_ONLY",
    "INERTIA_OBSERVATION_ONLY",
    "RESPONSE_SPACE_ONLY",
    "TRANSFORMATION_RECOGNITION_READY",
    "noEngineMutation",
    "noStorage",
  ].forEach((marker) =>
    assertIncludes("P47 acceptance type", source.type, marker),
  );

  [
    "reviewRealityFullExperienceAcceptance",
    "REALITY_FULL_EXPERIENCE_ACCEPTANCE_SEQUENCE",
    "PRESENCE_CARRY_REQUIRED",
    "REALITY_CONTINUITY_REQUIRED",
    "PRESSURE_RUNTIME_REQUIRED",
    "GRAVITY_RUNTIME_REQUIRED",
    "CHOICE_RUNTIME_REQUIRED",
    "CRYSTAL_RUNTIME_REQUIRED",
    "REALITY_SEQUENCE_INVALID",
    "PRESENCE_CARRY_DISCONTINUOUS",
    "REALITY_FLOW_BROKEN",
    "PRESSURE_BOUNDARY_INCOMPLETE",
    "GRAVITY_BOUNDARY_INCOMPLETE",
    "CHOICE_BOUNDARY_INCOMPLETE",
    "REALITY_ACCEPTANCE_BOUNDARY_INVALID",
    "manualObservationOnly",
    "noAutomaticRepair",
    "noRuntimeMutation",
    "noUIMutation",
    "noEngineMutation",
    "noStorage",
    "PENDING_HUMAN_ACCEPTANCE",
  ].forEach((marker) =>
    assertIncludes("P47 acceptance service", source.service, marker),
  );

  [
    "IdentitySource",
    "MotherCode",
    "LifeArchetype",
    "localStorage",
    "sessionStorage",
    "fetch(",
    "window.",
    "document.",
    "requestAnimationFrame",
    "resolvePressureRecognition",
    "resolveGravityExperience",
    "resolveChoiceExperience",
    "resolveCrystalExperience",
    "setPreviewStageIndex",
    "resetGenesis",
    "createRenderer",
    "createRenderPlan",
  ].forEach((marker) =>
    assertExcludes("P47 remains review-only", source.service, marker),
  );

  [
    "PresenceCarryRealityTransition",
    "RealityExperienceContinuityOptimization",
  ].forEach((marker) =>
    assertIncludes("P47 upstream boundary", source.type, marker),
  );
  assertIncludes(
    "P47 type index export",
    source.typeIndex,
    "./realityFullExperienceAcceptance",
  );
  assertIncludes(
    "P47 gate registered",
    packageJson.scripts?.["check-reality-full-experience-acceptance"] ?? "",
    "node scripts/check-reality-full-experience-acceptance.mjs",
  );
  assertIncludes(
    "P47 release gate registered",
    packageJson.scripts?.["postcheck:release"] ?? "",
    "npm run check-reality-full-experience-acceptance",
  );

  const modulePath = path.join(
    os.tmpdir(),
    `guanyao-reality-full-acceptance-${process.pid}.mjs`,
  );
  await build({
    stdin: {
      contents:
        'export { reviewRealityFullExperienceAcceptance } from "./src/services/realityFullExperienceAcceptance.ts";',
      resolveDir: rootDir,
      sourcefile: "reality-full-experience-acceptance-gate-entry.ts",
      loader: "ts",
    },
    outfile: modulePath,
    bundle: true,
    platform: "node",
    format: "esm",
    target: "node20",
    logLevel: "silent",
  });
  const runtime = await import(`file://${modulePath}?t=${Date.now()}`);

  const baseInput = {
    presenceCarry: Object.freeze({
      semanticRole: "PRESENCE_CARRY_REALITY_TRANSITION",
      presenceContinuity: "CONTINUOUS",
    }),
    continuity: Object.freeze({
      semanticRole: "REALITY_EXPERIENCE_CONTINUITY_OPTIMIZATION",
      pressureContinuity: "ACKNOWLEDGED",
      gravityContinuity: "ACKNOWLEDGED",
      choiceContinuity: "ACTIVE_RESPONSE",
      realityFlowIntegrity: "CONTINUOUS",
    }),
    pressureRuntime: Object.freeze({
      semanticRole: "PRESSURE_RECOGNITION_UI_RUNTIME",
    }),
    gravityRuntime: Object.freeze({
      semanticRole: "GRAVITY_EXPERIENCE_UI_RUNTIME",
    }),
    choiceRuntime: Object.freeze({
      semanticRole: "CHOICE_EXPERIENCE_UI_RUNTIME",
    }),
    crystalRuntime: Object.freeze({
      semanticRole: "CRYSTAL_EXPERIENCE_UI_RUNTIME",
    }),
    observedStages: Object.freeze([
      "PRESENCE_CARRY",
      "PRESSURE",
      "GRAVITY",
      "CHOICE",
      "CRYSTAL_READY",
    ]),
    presenceCarryQuality: "PASS",
    pressureObservationQuality: "PASS",
    gravityAwarenessQuality: "PASS",
    choiceAgencyQuality: "PASS",
    crystalTransitionReadiness: "PASS",
    realityJourneyIntegrity: "PASS",
  };

  const accepted = runtime.reviewRealityFullExperienceAcceptance(baseInput);
  assertEqual("P47 Reality review ready", accepted.status, "READY");
  assertEqual("P47 Reality review accepted", accepted.reviewStatus, "ACCEPTED");
  assertEqual("P47 Reality journey pass", accepted.review?.overallJourneyState, "PASS");
  assertEqual("P47 Presence Carry continuous", accepted.review?.presenceCarryContinuity, "CONTINUOUS");
  assertEqual("P47 Pressure observation boundary", accepted.review?.pressureBoundary, "OBSERVATION_ONLY");
  assertEqual("P47 Gravity boundary", accepted.review?.gravityBoundary, "INERTIA_OBSERVATION_ONLY");
  assertEqual("P47 Choice boundary", accepted.review?.choiceBoundary, "RESPONSE_SPACE_ONLY");
  assertEqual("P47 Crystal ready boundary", accepted.review?.crystalBoundary, "TRANSFORMATION_RECOGNITION_READY");

  const pending = runtime.reviewRealityFullExperienceAcceptance({
    ...baseInput,
    presenceCarryQuality: undefined,
    pressureObservationQuality: undefined,
    gravityAwarenessQuality: undefined,
    choiceAgencyQuality: undefined,
    crystalTransitionReadiness: undefined,
    realityJourneyIntegrity: undefined,
  });
  assertEqual("P47 pending human acceptance", pending.reviewStatus, "PENDING_HUMAN_ACCEPTANCE");
  assertEqual("P47 pending journey state", pending.review?.overallJourneyState, "NEEDS_REVIEW");

  const issue = runtime.reviewRealityFullExperienceAcceptance({
    ...baseInput,
    issues: Object.freeze([
      Object.freeze({
        stage: "PRESSURE",
        issueType: "PRESSURE_ANALYSIS_DRIFT",
        observation: "pressure language needs a human review",
        manualAcceptanceNote: "check observation wording before productization",
      }),
    ]),
  });
  assertEqual("P47 issue review state", issue.reviewStatus, "NEEDS_REVIEW");
  assertEqual("P47 issue category recorded", issue.review?.issueTypes[0], "PRESSURE_ANALYSIS_DRIFT");

  const missingCarry = runtime.reviewRealityFullExperienceAcceptance({
    ...baseInput,
    presenceCarry: null,
  });
  assertEqual("P47 missing Presence Carry unavailable", missingCarry.status, "UNAVAILABLE");
  assertEqual("P47 missing Presence Carry reason", missingCarry.reason, "PRESENCE_CARRY_REQUIRED");

  const invalidSequence = runtime.reviewRealityFullExperienceAcceptance({
    ...baseInput,
    observedStages: Object.freeze([
      "PRESENCE_CARRY",
      "PRESSURE",
      "CHOICE",
      "GRAVITY",
      "CRYSTAL_READY",
    ]),
  });
  assertEqual("P47 invalid sequence blocked", invalidSequence.status, "BLOCKED");
  assertEqual("P47 invalid sequence reason", invalidSequence.reason, "REALITY_SEQUENCE_INVALID");

  const brokenCarry = runtime.reviewRealityFullExperienceAcceptance({
    ...baseInput,
    presenceCarry: Object.freeze({ presenceContinuity: "BROKEN" }),
  });
  assertEqual("P47 broken Presence Carry blocked", brokenCarry.status, "BLOCKED");
  assertEqual("P47 broken Presence Carry reason", brokenCarry.reason, "PRESENCE_CARRY_DISCONTINUOUS");
}

if (failures.length > 0) {
  console.error(`FAIL | check-reality-full-experience-acceptance | count=${failures.length}`);
  for (const failure of failures) console.error(`- ${failure}`);
  process.exitCode = 1;
} else {
  console.log("PASS | check-reality-full-experience-acceptance");
}
