import fs from "node:fs";

const app = fs.readFileSync("src/App.tsx", "utf8");
const page = fs.readFileSync(
  "src/pages/XinmaiLivedGrowthAcceptancePage.tsx",
  "utf8",
);
const launch = fs.readFileSync("src/pages/LaunchLab.tsx", "utf8");
const surface = fs.readFileSync(
  "src/components/XinmaiLivedResponseReturnSurface.tsx",
  "utf8",
);
const assert = (value, message) => {
  if (!value) throw new Error(message);
};

for (const marker of [
  "commitChoiceActionIntention",
  "readXinmaiLivedGrowthCanonicalState",
  "并发消费正式资格",
  'data-motion-presentation={reducedMotion ? "STATIC" : "MOTION_ALLOWED"}',
  'data-development-only="true"',
]) {
  assert(page.includes(marker), `acceptance surface missing ${marker}`);
}
for (const marker of [
  "<XinmaiLivedResponseReturnSurface",
  "readXinmaiChoiceReturningProvenanceRecovery",
]) {
  assert(launch.includes(marker), `production returning surface missing ${marker}`);
}
for (const marker of [
  "confirmXinmaiChoiceExplicitDeparture",
  "confirmXinmaiChoiceExplicitReturn",
  "resolveXinmaiChoiceReturnWithoutFact",
  'window.matchMedia("(prefers-reduced-motion: reduce)")',
  'pointerEvents: "auto"',
]) {
  assert(surface.includes(marker), `typed returning surface missing ${marker}`);
}
for (const forbidden of [
  "livedResponseRecognized",
  "localStorage",
  "ELIGIBLE_BY_USER_RECOGNITION",
]) {
  assert(!page.includes(forbidden), `acceptance surface owns forbidden authority: ${forbidden}`);
}
assert(
  app.includes("const XinmaiLivedGrowthAcceptancePage = import.meta.env.DEV"),
  "acceptance module is not development-only",
);
assert(
  app.includes('path="/xinmai-lived-growth-acceptance"'),
  "acceptance route missing",
);
console.log("[XINMAI LIVED GROWTH BROWSER ACCEPTANCE SURFACE] PASS");
