import fs from "node:fs";
import path from "node:path";
import process from "node:process";

const rootDir = process.cwd();
const files = Object.freeze({
  gravity: "src/pages/GravityPage.tsx",
  host: "src/components/RealityProductionHost.tsx",
  route: "src/pages/RealityProductionRouteEntry.tsx",
  renderer: "src/renderers/genesisWebGLRendererCore.ts",
  hostType: "src/types/realityProductionRouteEntry.ts",
  packageManifest: "package.json",
});
const failures = [];

const read = (relativePath) =>
  fs.readFileSync(path.join(rootDir, relativePath), "utf8");
const sources = Object.fromEntries(
  Object.entries(files).map(([name, relativePath]) => [name, read(relativePath)]),
);
const assertIncludes = (name, source, marker) => {
  if (source.includes(marker)) {
    console.log(`PASS | ${name} | includes=${marker}`);
  } else {
    failures.push(`${name} missing=${marker}`);
  }
};
const assertExcludes = (name, source, marker) => {
  if (source.includes(marker)) {
    failures.push(`${name} forbidden=${marker}`);
  } else {
    console.log(`PASS | ${name} | forbidden=absent`);
  }
};

[
  "NEW_REALITY_RESPONSE_UNDER_OBSERVATION",
  'data-choice-body-continuity="SAME_CORE_SAME_BODY"',
  'data-choice-growth-claim="NONE"',
  "AWAITING_USER_RECOGNITION",
  "CHOICE_ACTION_INTENTION_COMMITTED",
].forEach((marker) =>
  assertIncludes("Dynamics carries one life rhythm through observation", sources.gravity, marker),
);

[
  "CURRENT_REALITY_RESPONSE_READY_FOR_OBSERVATION",
  "AWAITING_REALITY_CONTACT",
  "SAME_BODY_NEW_CADENCE_CARRIED_TO_REALITY",
  'data-choice-body-continuity="SAME_CORE_SAME_BODY"',
  'data-choice-growth-claim="NONE_UNTIL_USER_RECOGNIZES"',
  'data-choice-crystal-stage="NOT_STARTED"',
  "先看身体怎样回应，不急着把不同叫作改变。",
].forEach((marker) =>
  assertIncludes("Reality validates response without awarding growth", sources.host, marker),
);

assertIncludes(
  "Reality route preserves the existing Choice continuation",
  sources.route,
  "choiceContinuation={choiceContinuation}",
);
assertIncludes(
  "Reality host contract reuses the existing continuation",
  sources.hostType,
  'choiceContinuation?: "CHOICE_ACTION_INTENTION_CONTINUATION" | null',
);
assertIncludes(
  "Shared renderer consumes the continued response rhythm",
  sources.renderer,
  'choiceResponseState === "NEW_RESPONSE_POSSIBILITY"',
);
assertIncludes(
  "P0 validation gate is registered",
  sources.packageManifest,
  '"check-xinmai-new-reality-response-rhythm-validation"',
);

[
  "CHOICE_UPGRADE",
  "RESPONSE_REWARD",
  "AUTO_RECOGNIZED_DIFFERENCE",
  "SYSTEM_CONFIRMED_GROWTH",
].forEach((marker) =>
  assertExcludes(
    "Validation adds no upgrade, reward, or system judgement",
    sources.gravity + sources.host,
    marker,
  ),
);

if (failures.length > 0) {
  console.error("\n[XINMAI NEW REALITY RESPONSE RHYTHM VALIDATION] FAIL");
  failures.forEach((failure) => console.error(failure));
  process.exit(1);
}

console.log("\n[XINMAI NEW REALITY RESPONSE RHYTHM VALIDATION] PASS");
