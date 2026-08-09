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
    launch.includes("createXinmaiGenesisBirthCoordinateInputSession(") &&
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
    controls.includes('type="date"') &&
    controls.includes('type="time"') &&
    controls.includes('value="EXACT"') &&
    controls.includes('value="APPROXIMATE_RANGE"') &&
    controls.includes('value="UNKNOWN"') &&
    !controls.includes("XINMAI_GENESIS_BIRTH_HOUR_BRANCHES") &&
    !controls.includes("hourBranch: event.target.value") &&
    controls.includes("确认这组生命起点") &&
    controls.includes('data-chrono-visual-shell="AXIS_GRAMMAR_REWIRED_TO_RAW_BIRTH_INPUT"') &&
    controls.includes("onChange") &&
    !controls.includes("ChronoAxisDualEngine") &&
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
