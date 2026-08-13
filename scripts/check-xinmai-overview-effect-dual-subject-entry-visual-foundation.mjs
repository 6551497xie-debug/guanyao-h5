import { readFileSync } from "node:fs";

const read = (path) => readFileSync(new URL(`../${path}`, import.meta.url), "utf8");
const fail = (message) => {
  throw new Error(`XINMAI overview-effect entry gate failed: ${message}`);
};
const requireText = (source, text, message) => {
  if (!source.includes(text)) fail(message);
};

const renderer = read("src/renderers/xinmaiOverviewEffectEntryScene.ts");
const staticPresenter = read("src/components/XinmaiOverviewEffectEntryStatic.tsx");
const launch = read("src/pages/LaunchLab.tsx");
const controls = read("src/components/XinmaiGenesisBirthCoordinateControls.tsx");
const semantic = read("src/services/xinmaiJourneySemanticPresentationResolver.ts");
const policy = read("src/services/xinmaiOverviewEffectEntryPresentationPolicy.ts");
const worldAxiom = read("src/services/xinmaiEncounterWorldAxiom.ts");

requireText(renderer, "drawSunlight", "missing off-screen solar illumination");
requireText(renderer, "drawEarth", "missing Earth reality field");
requireText(renderer, "drawMoon", "missing lunar-distance reference");
requireText(renderer, "drawStarBeastSignal", "missing independent star-beast life signal");
requireText(renderer, "reducedMotion", "missing reduced-motion equivalent input");
requireText(
  staticPresenter,
  "DUAL_SUBJECT_SINGLE_FACT_SOURCE",
  "static presenter does not expose the dual-subject boundary",
);
requireText(
  launch,
  "XinmaiOverviewEffectEntryStatic",
  "continuous scene static consumer is not wired",
);
requireText(
  launch,
  "drawXinmaiOverviewEffectEntryScene",
  "motion canvas consumer is not wired",
);
requireText(
  controls,
  'data-subject-anchor="FIRST_PERSON_OBSERVER_AND_ACTOR"',
  "human subject anchor is not public",
);
requireText(
  controls,
  'data-star-beast-relation="OTHER_COSMIC_LIFE"',
  "star beast is not identified as another cosmic life",
);
requireText(
  controls,
  'data-world-axiom="BIRTH_BEGINS_ENCOUNTER_NOT_LIFE"',
  "encounter world axiom is not public",
);
requireText(
  worldAxiom,
  "出生不是生命的开始，而是相遇的开始",
  "encounter world axiom is not frozen",
);
requireText(semantic, "XINMAI_ENCOUNTER_WORLD_AXIOM.publicStatement", "entry semantics bypass the frozen world axiom");
requireText(semantic, "校准相遇坐标", "entry action remains a form-filling task");
requireText(
  policy,
  'XINMAI_OVERVIEW_EFFECT_ENTRY_PRESENTATION_POLICY',
  "missing forward presentation policy",
);
requireText(policy, '= "ENABLED"', "candidate overview effect is not enabled");
requireText(
  launch,
  "XINMAI_OVERVIEW_EFFECT_ENTRY_PRESENTATION_POLICY",
  "motion renderer does not consume the forward presentation policy",
);

for (const forbidden of [
  "indexedDB",
  "localStorage",
  "sessionStorage",
  "writeMotherCode",
  "createReality",
  "commitChoice",
]) {
  if (renderer.includes(forbidden) || staticPresenter.includes(forbidden)) {
    fail(`presentation foundation contains forbidden authority dependency: ${forbidden}`);
  }
}

console.log("XINMAI overview-effect dual-subject entry visual foundation: PASS");
