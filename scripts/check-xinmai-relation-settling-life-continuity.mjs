import fs from "node:fs";
import path from "node:path";
import process from "node:process";

const root = process.cwd();
const read = (relativePath) =>
  fs.readFileSync(path.join(root, relativePath), "utf8");

const guide = read("src/components/XinmaiLifeReflectionGuide.tsx");
const styles = read("src/styles/xinmai-inner-view-three-approach.css");
const packageJson = JSON.parse(read("package.json"));

const checks = [
  [
    "relation settling becomes a stable same-life continuity state",
    guide.includes(
      "const [lifeContinuityStable, setLifeContinuityStable] = useState(false)",
    ) &&
      guide.includes('"LIFE_CONTINUES"') &&
      guide.includes('"STABLE_AFTER_UNDERSTANDING"') &&
      guide.includes(
        'data-xinmai-life-continuity-presence="SAME_LIFE_STILL_HERE"',
      ),
  ],
  [
    "understanding settles into life without changing identity or losing memory",
    guide.includes('data-xinmai-life-identity="UNCHANGED"') &&
      guide.includes('data-xinmai-new-flow-memory="RETAINED"') &&
      guide.includes(
        "这份理解已经沉回生命，它仍按自己的节律呼吸。",
      ),
  ],
  [
    "the continuity action stays in place and does not route",
    guide.includes(
      'data-xinmai-relation-action="SETTLE_INTO_LIFE_NO_ROUTE"',
    ) &&
      guide.includes("setLifeContinuityStable(true);") &&
      guide.includes("const saved = await onContinue?.();") &&
      guide.includes("if (saved) setLifeContinuityStable(true);") &&
      guide.includes('data-xinmai-route-transition="NONE"') &&
      guide.includes('data-xinmai-module-transition="NONE"') &&
      !guide.includes("NAVIGATE_TO_CHOICE"),
  ],
  [
    "Choice timing remains intentionally unresolved",
    guide.includes(
      'data-xinmai-choice-timing="UNDECIDED_NOT_TRIGGERED_BY_UNDERSTANDING"',
    ) &&
      guide.includes('data-xinmai-choice-trigger="WITHHELD"') &&
      guide.includes('data-xinmai-choice-stage="NOT_STARTED"'),
  ],
  [
    "Crystal remains outside life continuity",
    guide.includes('data-xinmai-crystal-stage="NOT_STARTED"') &&
      !/FORM_CRYSTAL|CRYSTAL_REWARD|CRYSTAL_SUCCESS/.test(guide),
  ],
  [
    "the same meridian continues with a quieter living rhythm",
    styles.includes(
      '[data-xinmai-life-continuity="STABLE_AFTER_UNDERSTANDING"]',
    ) &&
      styles.includes("@keyframes xinmai-inner-view-life-continuity-breath") &&
      styles.includes("@keyframes xinmai-inner-view-life-continuity-flow") &&
      styles.includes("animation-duration: 4.6s") &&
      styles.includes("10.8s ease-in-out"),
  ],
  [
    "stable continuity is not a frozen final frame",
    styles.includes("infinite") &&
      styles.includes("stroke-dashoffset: 0.18") &&
      styles.includes("stroke-dashoffset: 0.08") &&
      !styles.includes("LIFE_CONTINUITY_FINAL_RESULT"),
  ],
  [
    "reduced motion keeps the stable presence readable",
    styles.includes("@media (prefers-reduced-motion: reduce)") &&
      styles.includes(
        ".xinmai-life-reflection-guide__continuity-whisper,",
      ),
  ],
  [
    "no Choice event, new phase model, route, or analysis layer is introduced",
    !/TRIGGER_CHOICE_EVENT|NEW_CONTINUITY_PHASE_MODEL|NAVIGATE_TO_CHOICE|LIFE_ANALYSIS_RESULT/.test(
      `${guide}\n${styles}`,
    ),
  ],
  [
    "gate is registered",
    packageJson.scripts?.[
      "check-xinmai-relation-settling-life-continuity"
    ] ===
      "node scripts/check-xinmai-relation-settling-life-continuity.mjs",
  ],
];

let failed = false;
for (const [name, passed] of checks) {
  console.log(`${passed ? "PASS" : "FAIL"} | ${name}`);
  failed ||= !passed;
}

if (failed) {
  console.error("\n[XINMAI RELATION SETTLING -> LIFE CONTINUITY] FAILED");
  process.exit(1);
}

console.log("\n[XINMAI RELATION SETTLING -> LIFE CONTINUITY] PASS");
