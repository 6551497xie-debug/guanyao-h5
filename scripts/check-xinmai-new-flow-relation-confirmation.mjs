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
    "confirmed, user-named, and paused relations share one life response",
    guide.includes(
      "const relationSettlingVisible =\n    relationEstablished || phase === \"PAUSED\"",
    ) &&
      guide.includes(
        'data-xinmai-relation-response="SAME_LIFE_SETTLING"',
      ) &&
      guide.includes(
        'className="xinmai-life-reflection-guide__relation-settling"',
      ) &&
      guide.includes('? "SAME_LIFE_RELATION_SETTLING"'),
  ],
  [
    "all three relation outcomes remain explicit without becoming scores",
    guide.includes('"RECOGNIZED"') &&
      guide.includes('"USER_KEEPS_OWN_MEANING"') &&
      guide.includes('"PAUSED_WITHOUT_LOSS"') &&
      guide.includes('data-xinmai-result-model="NONE"'),
  ],
  [
    "the same life identity and new-flow memory remain",
    guide.includes('data-xinmai-life-identity="UNCHANGED"') &&
      guide.includes('data-xinmai-new-flow-memory="RETAINED"') &&
      guide.includes(
        'data-xinmai-equilibrium="AFTER_EXPERIENCE_NOT_INITIAL"',
      ),
  ],
  [
    "relation actions are not answer or restart actions",
    guide.includes(
      'data-xinmai-agency-purpose="RELATION_CONFIRMATION_NOT_CHOICE_ANSWER"',
    ) &&
      guide.includes(
        'data-xinmai-relation-action="RESUME_RELATION_NOT_RESTART"',
      ) &&
      guide.includes(
        'data-xinmai-relation-action="SETTLE_INTO_LIFE_NO_ROUTE"',
      ),
  ],
  [
    "Choice and Crystal remain unstarted while relation settles",
    guide.includes('data-xinmai-choice-stage="NOT_STARTED"') &&
      guide.includes('data-xinmai-crystal-stage="NOT_STARTED"'),
  ],
  [
    "the existing meridian settles into a restrained new equilibrium",
    styles.includes(
      '[data-xinmai-life-signal-mode="SAME_LIFE_RELATION_SETTLING"]',
    ) &&
      styles.includes("@keyframes xinmai-inner-view-new-equilibrium") &&
      styles.includes("@keyframes xinmai-inner-view-relation-flow-settle") &&
      styles.includes("stroke-dasharray: 0.11 0.89"),
  ],
  [
    "paused relation slows without deleting the same flow",
    styles.includes(
      '[data-dynamics-inner-view-phase="PAUSED"]',
    ) &&
      styles.includes("animation-duration: 7.2s") &&
      !styles.includes("display: none;\n  animation-duration: 7.2s"),
  ],
  [
    "reduced motion keeps the relation response legible",
    styles.includes("@media (prefers-reduced-motion: reduce)") &&
      styles.includes(
        ".xinmai-life-reflection-guide__relation-settling,",
      ) &&
      styles.includes(
        ".xinmai-life-reflection-guide__relation-settling > i,",
      ),
  ],
  [
    "no Choice execution, Crystal formation, success state, or new model is introduced",
    !/EXECUTE_CHOICE|FORM_CRYSTAL|SUCCESS_STATE|NEW_RELATION_MODEL|RELATION_SCORE/.test(
      `${guide}\n${styles}`,
    ),
  ],
  [
    "gate is registered",
    packageJson.scripts?.["check-xinmai-new-flow-relation-confirmation"] ===
      "node scripts/check-xinmai-new-flow-relation-confirmation.mjs",
  ],
];

let failed = false;
for (const [name, passed] of checks) {
  console.log(`${passed ? "PASS" : "FAIL"} | ${name}`);
  failed ||= !passed;
}

if (failed) {
  console.error("\n[XINMAI NEW FLOW RELATION CONFIRMATION] FAILED");
  process.exit(1);
}

console.log("\n[XINMAI NEW FLOW RELATION CONFIRMATION] PASS");
