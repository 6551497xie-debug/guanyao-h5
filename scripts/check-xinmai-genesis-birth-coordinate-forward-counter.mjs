import fs from "node:fs";

const read = (path) => fs.readFileSync(path, "utf8");
const assert = (condition, message) => {
  if (!condition) throw new Error(message);
};

const policy = read("src/services/xinmaiGenesisBirthCoordinatePresentationPolicy.ts");
const resolver = read("src/services/xinmaiGenesisBirthCoordinatePresentationResolver.ts");
const controller = read("src/services/xinmaiGenesisBirthCoordinateAdmissionController.ts");
const controls = read("src/components/XinmaiGenesisBirthCoordinateControls.tsx");
const launch = read("src/pages/LaunchLab.tsx");
const packageJson = JSON.parse(read("package.json"));

assert(
  policy.includes('"ENABLED"') &&
    policy.includes('"SAFE_WITHHELD"') &&
    policy.includes("XINMAI_GENESIS_BIRTH_COORDINATE_PRESENTATION_POLICY"),
  "Forward Counter is not represented by one typed policy switch",
);
assert(
  resolver.includes('=== "SAFE_WITHHELD"') &&
    resolver.includes('sceneEnrichment: "SAFE_WITHHELD"') &&
    !controller.includes("XINMAI_GENESIS_BIRTH_COORDINATE_PRESENTATION_POLICY") &&
    controls.includes("确认生命坐标"),
  "Counter can pause the input/Authority path instead of only spatial enrichment",
);
for (const forbidden of [
  'pointerInteraction: "HOST_CANVAS"',
  "captureLaunchLifeSourceSession",
  "beginProductionGenesisContinuity",
]) {
  assert(!launch.includes(forbidden), `Counter boundary can revive legacy path: ${forbidden}`);
}
assert(
  packageJson.scripts?.["check:xinmai-genesis-birth-coordinate-forward-counter"] ===
    "node scripts/check-xinmai-genesis-birth-coordinate-forward-counter.mjs",
  "Forward-counter gate is not registered",
);

console.log("[XINMAI GENESIS BIRTH COORDINATE FORWARD COUNTER] PASS");
