import fs from "node:fs";

const read = (path) => fs.readFileSync(path, "utf8");
const assert = (condition, message) => {
  if (!condition) throw new Error(message);
};

const controls = read("src/components/XinmaiGenesisBirthCoordinateControls.tsx");
const styles = read("src/styles/xinmai-genesis-birth-coordinate-spatial-interaction.css");
const presentation = read("src/services/xinmaiGenesisBirthCoordinatePresentationResolver.ts");
const packageJson = JSON.parse(read("package.json"));

for (const token of [
  'aria-labelledby="xinmai-genesis-birth-coordinate-title"',
  "<legend>当地民用公历出生日期与时间</legend>",
  'type="time"',
  'value="UNKNOWN"',
  "系统不会进行真太阳时、时区或夏令时换算",
  'role="status"',
  'aria-live="polite"',
  'aria-atomic="true"',
  'type="submit"',
]) {
  assert(controls.includes(token), `Accessible birth control token missing: ${token}`);
}
assert(
  styles.includes("min-height: 48px") &&
    styles.includes(":focus-visible") &&
    styles.includes("prefers-reduced-motion: reduce") &&
    styles.includes("grid-template-columns: 1fr") &&
    !styles.includes("display: none"),
  "Responsive, focus, or Reduced Motion native-control contract is incomplete",
);
assert(
  presentation.includes("BIRTH_COORDINATE_READY") &&
    presentation.includes("confirmationEnabled") &&
    !presentation.includes("animationend") &&
    !presentation.includes("frameCount"),
  "Presentation readiness can be claimed by animation instead of typed validation",
);
assert(
  packageJson.scripts?.["check:xinmai-genesis-birth-coordinate-motion-static-accessibility"] ===
    "node scripts/check-xinmai-genesis-birth-coordinate-motion-static-accessibility.mjs",
  "Motion/static/accessibility gate is not registered",
);

console.log("[XINMAI GENESIS BIRTH COORDINATE MOTION STATIC ACCESSIBILITY] PASS");
