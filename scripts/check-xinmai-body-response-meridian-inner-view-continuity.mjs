import fs from "node:fs";
import path from "node:path";
import process from "node:process";

const root = process.cwd();
const read = (relativePath) =>
  fs.readFileSync(path.join(root, relativePath), "utf8");

const gravityPage = read("src/pages/GravityPage.tsx");
const realityCanvas = read("src/components/RealityLifeUniverseCanvas.tsx");
const continuityStyles = read(
  "src/styles/xinmai-reality-seed-body-response.css",
);
const packageJson = JSON.parse(read("package.json"));

const checks = [
  [
    "Reality keeps the approached body anchor on the existing life canvas",
    realityCanvas.includes(
      'data-inner-view-approach-state={innerViewApproachState}',
    ) &&
      realityCanvas.includes(
        'data-inner-view-body-anchor={`${realitySeedBodyTargetX}:48`}',
      ),
  ],
  [
    "Gravity reuses the same body canvas instead of creating a new subject",
    gravityPage.includes(
      'innerViewApproachState={\n                  innerViewBodyContinuityActive\n                    ? "BODY_APPROACHED"',
    ) &&
      gravityPage.includes(
        'data-inner-view-first-frame={\n          innerViewBodyContinuityActive',
      ),
  ],
  [
    "the first Reality-led inner-view frame begins at existing meridian depth one",
    gravityPage.includes(
      'useState<\n    | "OBSERVING"\n    | "FIRST_APPROACH"',
    ) &&
      gravityPage.includes(
        '(() => (innerViewEntryEstablished ? "FIRST_APPROACH" : "OBSERVING"))',
      ) &&
      gravityPage.includes(
        'data-inner-view-meridian-source="EXISTING_BIRTH_MANSION_BODY_RELATION"',
      ),
  ],
  [
    "the life body returns after the short arrival breath rather than waiting for Gravity analysis",
    gravityPage.includes("lifeObservationStageWithheld") &&
      gravityPage.includes(
        "(gravityEntryContinuityActive && !innerViewBodyContinuityActive)",
      ) &&
      gravityPage.includes(
        'data-inner-view-analysis-stage="USER_LED_OBSERVATION_NOT_ANALYSIS"',
      ),
  ],
  [
    "inertia remains behind the initial body-led inner view",
    gravityPage.includes(
      "gravityEntryContinuityActive &&\n                  !innerViewBodyContinuityActive",
    ) &&
      gravityPage.includes(
        "刚才回应的地方，开始显出生命的流动。",
      ),
  ],
  [
    "approach motion is restrained and preserves reduced-motion access",
    continuityStyles.includes("transform: scale(1.018)") &&
      continuityStyles.includes(
        '[data-inner-view-arrival="SAME_RESPONSE_POINT"]',
      ) &&
      continuityStyles.includes("@media (prefers-reduced-motion: reduce)") &&
      continuityStyles.includes("transform: none"),
  ],
  [
    "no second core, new meridian score, or automatic analysis language was added",
    ![gravityPage, realityCanvas, continuityStyles].some((source) =>
      /(?:entry-visual|identity-effect)="SECOND_CORE"|data-meridian-score=|data-analysis-stage="AUTO_ANALYSIS"|NEW_ENGINE/.test(
        source,
      ),
    ),
  ],
  [
    "gate is registered",
    packageJson.scripts?.[
      "check-xinmai-body-response-meridian-inner-view-continuity"
    ] ===
      "node scripts/check-xinmai-body-response-meridian-inner-view-continuity.mjs",
  ],
];

let failed = false;
for (const [name, passed] of checks) {
  console.log(`${passed ? "PASS" : "FAIL"} | ${name}`);
  failed ||= !passed;
}

if (failed) {
  console.error(
    "\n[XINMAI BODY RESPONSE -> MERIDIAN INNER VIEW CONTINUITY] FAILED",
  );
  process.exit(1);
}

console.log(
  "\n[XINMAI BODY RESPONSE -> MERIDIAN INNER VIEW CONTINUITY] PASS",
);
