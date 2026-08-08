import fs from "node:fs";

const read = (path) => fs.readFileSync(path, "utf8");
const assert = (condition, message) => {
  if (!condition) throw new Error(message);
};

const launch = read("src/pages/LaunchLab.tsx");
const controls = read("src/components/XinmaiGenesisBirthCoordinateControls.tsx");
const packageJson = JSON.parse(read("package.json"));

assert(
  launch.includes("<XinmaiGenesisBirthCoordinateControls") &&
    launch.includes('pointerInteraction: "NONE" as const') &&
    launch.includes("createXinmaiGenesisBirthCoordinateInputSession()") &&
    launch.includes("updateXinmaiGenesisBirthCoordinateInput(current, draft)") &&
    launch.includes('intent: "CONFIRM_BIRTH_COORDINATE"') &&
    launch.includes("inputSession: confirmingSession") &&
    !launch.includes("captureLaunchLifeSourceSession") &&
    !launch.includes("beginProductionGenesisContinuity") &&
    !launch.includes("resolveLaunchOriginMotherSourceResults"),
  "Birth input is not exclusively owned by the native control consumer",
);
for (const legacyOwner of [
  "birthCoordinateDraft",
  "birthCoordinatePhase",
  "birthCoordinateFailureReason",
]) {
  assert(
    !launch.includes(legacyOwner),
    `Legacy page-local input owner remains: ${legacyOwner}`,
  );
}
assert(
  controls.includes("<fieldset") &&
    (controls.match(/<input/g) ?? []).length === 3 &&
    (controls.match(/<select/g) ?? []).length === 1 &&
    controls.includes("确认生命坐标") &&
    controls.includes("onConfirm"),
  "Native birth-coordinate control group is incomplete",
);
for (const forbidden of ["<canvas", "getContext(", "onPointerDown", "vibrate(", "AudioContext"]) {
  assert(!controls.includes(forbidden), `Native input owns forbidden behavior: ${forbidden}`);
}
assert(
  packageJson.scripts?.["check:xinmai-genesis-birth-coordinate-single-input-owner"] ===
    "node scripts/check-xinmai-genesis-birth-coordinate-single-input-owner.mjs",
  "Single-input-owner gate is not registered",
);

console.log("[XINMAI GENESIS BIRTH COORDINATE SINGLE INPUT OWNER] PASS");
