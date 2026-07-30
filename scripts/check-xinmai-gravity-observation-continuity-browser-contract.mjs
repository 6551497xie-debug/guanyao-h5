import fs from "node:fs";

const read = (path) => fs.readFileSync(path, "utf8");
const route = read("src/pages/GravityProductionRouteEntry.tsx");
const host = read("src/components/GravityProductionSurfaceHost.tsx");
const page = read("src/pages/GravityPage.tsx");
const observationSurface = read(
  "src/components/RealityGravityInertiaField.tsx",
);
const controller = read("src/services/xinmaiGravityEncounterContinuityController.ts");
const choice = read("src/services/xinmaiChoiceActionIntentionController.ts");
const confirmFlow = page.slice(
  page.indexOf("async function confirmLifeState"),
  page.indexOf("async function keepOwnUnderstanding"),
);

const assert = (label, condition) => {
  if (!condition) {
    console.error(`FAIL | ${label}`);
    process.exitCode = 1;
    return;
  }
  console.log(`PASS | ${label}`);
};

assert(
  "Production Route resolves continuity after post-commit admission",
  route.indexOf("establishGravityRouteAdmission") <
    route.indexOf("resolveGravityEncounterResumeDecision"),
);
assert(
  "Typed minimum surface establishes AVAILABLE checkpoint",
  host.includes("onAcceptanceOutcome") &&
    route.includes("establishGravityObservationAvailable") &&
    controller.includes('"OBSERVATION_AVAILABLE"'),
);
assert(
  "Refresh derives recognized presentation without persisting animation frames",
  page.includes("recoveredObservationPresentationRef") &&
    page.includes("observationContinuityDecision") &&
    !controller.includes("completedDimensionIds") &&
    !controller.includes("executionSnapshot"),
);
assert(
  "DOM exposes read-only typed continuity evidence and is not a Runtime input",
  page.includes("data-gravity-observation-reference") &&
    page.includes("data-gravity-observation-continuity-state") &&
    page.includes("TYPED_RESUME_DECISION_READ_ONLY_MIRROR") &&
    !controller.includes("data-gravity-observation") &&
    !choice.includes("data-gravity-observation"),
);
assert(
  "Choice recovery wins over observation replay",
  controller.includes('"CHOICE_COMMITTED"') &&
    page.includes('status === "CHOICE_COMMITTED"') &&
    page.includes("setCommittedChoiceActionIntention"),
);
assert(
  "Direct URL still requires Admission",
  route.includes("establishGravityRouteAdmission") &&
    route.includes('status: "BLOCKED"') &&
    !route.includes("readXinmaiGravityObservationContinuityState"),
);
assert(
  "Reduced Motion does not create a second continuity branch",
  observationSurface.includes("data-observation-surface-mode") &&
    observationSurface.includes(
      "STATIC_FIRST_GRAVITY_OBSERVATION",
    ) &&
    !controller.includes("prefers-reduced-motion") &&
    !choice.includes("prefers-reduced-motion") &&
    !controller.includes("STATIC_FIRST_GRAVITY_OBSERVATION"),
);
assert(
  "No UI success occurs before typed transaction outcome",
  page.includes("await onObservationRecognitionRequested") &&
    confirmFlow.indexOf(
      "await onInnerViewRelationEstablished",
    ) < confirmFlow.indexOf('setInnerViewPhase("CONFIRMED")') &&
    page.includes("await commitChoiceActionIntention"),
);

if (process.exitCode) process.exit(process.exitCode);
console.log("[XINMAI GRAVITY OBSERVATION CONTINUITY BROWSER CONTRACT] PASS");
