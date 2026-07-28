import fs from "node:fs";

const pagePath = "src/pages/GenesisProductionExperiencePage.tsx";
const packagePath = "package.json";
const page = fs.readFileSync(pagePath, "utf8");
const packageJson = fs.readFileSync(packagePath, "utf8");

const checks = [
  {
    label: "one derived readiness fact owns recognition visibility",
    pass:
      page.includes("const recognitionActionReady =") &&
      page.includes("{recognitionActionReady &&\n      recognitionPromptReady ? ("),
  },
  {
    label: "recognition readiness requires the existing interaction authority",
    pass:
      page.includes(
        'recognitionRealityResult.session.interactionAvailability ===\n      "RECOGNITION_CONFIRM"',
      ),
  },
  {
    label: "recognition readiness requires the existing completion stage",
    pass:
      page.includes(
        'productionRuntimeResult.session.currentStage === "COMPLETION"',
      ),
  },
  {
    label: "recognition readiness requires the existing manifestation state",
    pass:
      page.includes(
        'manifestationExperienceResult.session.currentState ===\n      "PRESENCE_APPROACHING"',
      ),
  },
  {
    label: "prompt timing closes when the action is not authoritative",
    pass:
      page.includes(
        '!recognitionActionReady ||\n      lifeOriginDiscoveryPhase !== "REVEALED"',
      ) &&
      page.includes("setRecognitionPromptReady(false);"),
  },
  {
    label: "the existing handler still rejects non-authoritative actions",
    pass:
      page.includes("const confirmRecognition = () => {") &&
      page.includes(
        'manifestationExperienceResult.session.currentState !==\n        "PRESENCE_APPROACHING"',
      ),
  },
  {
    label: "the correction introduces no new state or persistence",
    pass:
      !page.includes("setRecognitionActionReady") &&
      !page.includes("persistRecognitionActionReady") &&
      !page.includes("recognitionActionReadyStorage"),
  },
  {
    label: "the correction gate is registered",
    pass: packageJson.includes(
      '"check-xinmai-first-encounter-recognition-action-reachability-correction"',
    ),
  },
];

let failed = false;
for (const check of checks) {
  if (check.pass) {
    console.log(`PASS | ${check.label}`);
  } else {
    failed = true;
    console.error(`FAIL | ${check.label}`);
  }
}

if (failed) {
  process.exitCode = 1;
} else {
  console.log(
    "\n[XINMAI FIRST ENCOUNTER RECOGNITION ACTION REACHABILITY CORRECTION] PASS",
  );
}
