import fs from "node:fs";
import path from "node:path";
import process from "node:process";

const root = process.cwd();
const gravityPath = path.join(root, "src/pages/GravityPage.tsx");
const stylesPath = path.join(
  root,
  "src/styles/reality-gravity-presentation.css",
);
const packagePath = path.join(root, "package.json");

const gravity = fs.readFileSync(gravityPath, "utf8");
const styles = fs.readFileSync(stylesPath, "utf8");
const packageJson = JSON.parse(fs.readFileSync(packagePath, "utf8"));
const failures = [];

const requireIncludes = (label, source, markers) => {
  for (const marker of markers) {
    if (!source.includes(marker)) {
      failures.push(`${label}: missing ${JSON.stringify(marker)}`);
    }
  }
};

requireIncludes("validated response authority", gravity, [
  'data-crystal-validation-authority="USER_RECOGNIZED_RESPONSE"',
  'data-crystal-source-anchor="ACTIVE_SIX_DIMENSION_BODY_POSITION"',
  'data-crystal-sediment-direction="RESPONSE_POSITION_INTO_EXISTING_BODY"',
  'data-crystal-identity-invariant="SAME_CORE_SAME_BODY_SAME_LIFE"',
]);

requireIncludes("body sediment, not reward object", gravity, [
  'data-crystal-result-form="LIFE_TEXTURE_NOT_OBJECT"',
  'data-crystal-materialization="SEDIMENT_NOT_REWARD"',
  '"SETTLED_IN_SAME_BODY"',
  '"FLOWING_FROM_RECOGNIZED_RESPONSE_POSITION"',
  "responsePositionToBodyPath",
  "bodySedimentPoint",
]);

requireIncludes("archive waits for body sediment", gravity, [
  'data-crystal-archive-gate={',
  '"BODY_SEDIMENT_SETTLED"',
  '"WAITING_FOR_BODY_SEDIMENT"',
  "disabled={ringPresentation.button.disabled || !archiveReady}",
]);

requireIncludes("restrained visual rhythm", styles, [
  ".gy-crystal-response-sediment__origin",
  ".gy-crystal-response-sediment__flow",
  ".gy-crystal-response-sediment__body-trace",
  "@keyframes gy-crystal-response-enter-body",
  "@keyframes gy-crystal-body-trace-settle",
]);

const userRecognitionIndex = gravity.indexOf(
  "function handleLivedResponseRecognized()",
);
const crystalEndStateIndex = gravity.indexOf(
  "function CurrentCrystalEndStateFocus(",
);
if (userRecognitionIndex < 0 || crystalEndStateIndex < 0) {
  failures.push("recognition-to-Crystal path is missing");
} else if (!gravity.includes("setLivedResponseRecognized(true)")) {
  failures.push("user recognition does not remain the Crystal eligibility authority");
}

const script =
  packageJson.scripts?.[
    "check-xinmai-validated-response-crystal-body-sediment"
  ];
if (
  script !==
  "node scripts/check-xinmai-validated-response-crystal-body-sediment.mjs"
) {
  failures.push("package script is missing or incorrect");
}

if (failures.length > 0) {
  console.error(
    `XINMAI validated response → Crystal body sediment gate failed:\n${failures
      .map((failure) => `- ${failure}`)
      .join("\n")}`,
  );
  process.exit(1);
}

console.log(
  "XINMAI validated response → Crystal body sediment gate passed.",
);
