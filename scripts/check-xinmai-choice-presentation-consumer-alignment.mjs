import fs from "node:fs";

const page = fs.readFileSync("src/pages/GravityPage.tsx", "utf8");
const controller = fs.readFileSync(
  "src/services/xinmaiChoiceActionIntentionController.ts",
  "utf8",
);
const resolver = fs.readFileSync(
  "src/services/xinmaiChoicePresentationReadinessResolver.ts",
  "utf8",
);
const validator = fs.readFileSync(
  "src/services/xinmaiChoiceActionIntentionPrerequisiteValidator.ts",
  "utf8",
);

const requireSource = (name, source, expected) => {
  if (!source.includes(expected)) {
    throw new Error(`${name} missing=${expected}`);
  }
};
const forbidSource = (name, source, forbidden) => {
  if (source.includes(forbidden)) {
    throw new Error(`${name} forbidden=${forbidden}`);
  }
};

forbidSource(
  "legacy page boolean authority",
  page,
  "isRevisionActionPending",
);
forbidSource(
  "legacy false entry label",
  page,
  "OLD_PATH_RESTARTING_THEN_PAUSE",
);
requireSource(
  "page consumes resolver",
  page,
  "resolveChoicePresentationReadiness({",
);
requireSource(
  "page displays only ready decision",
  page,
  '"READY_TO_PRESENT"',
);
requireSource(
  "page commits validated structure",
  page,
  "choicePresentationDecision.structuralInput",
);
requireSource(
  "controller shares validator",
  controller,
  "validateChoiceActionIntentionPrerequisites(input)",
);
requireSource(
  "validator pure boundary",
  validator,
  "noAuthorityProof: true",
);
requireSource(
  "resolver no commit authority",
  resolver,
  "noCommitAuthority: true",
);
requireSource(
  "route required before ready",
  resolver,
  "CHANGE_EXPERIENCE_ROUTE_REQUIRED",
);
requireSource(
  "migration impact required before ready",
  resolver,
  "MIGRATION_IMPACT_REQUIRED",
);
forbidSource(
  "awareness enum cannot directly grant ready",
  resolver,
  'experienceStage === "AWARENESS"',
);
forbidSource(
  "six dimension count cannot directly grant ready",
  page,
  "completedSixDimensionCount >= 6",
);

console.log("[XINMAI CHOICE PRESENTATION CONSUMER ALIGNMENT] PASS");
