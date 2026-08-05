import fs from "node:fs";

const read = (path) => fs.readFileSync(path, "utf8");
const styles = read("src/styles/xinmai-same-life-surface.css");
const packageJson = JSON.parse(read("package.json"));

const assert = (condition, message) => {
  if (!condition) throw new Error(message);
};

const recoveredRelationshipSelector =
  '.gy-returning-life-world__relationship-copy:has(\n    [data-crystal-formation-presentation="RECOVERED_EXISTING"]\n  )';
const recoveredSurfaceSelector =
  '.xinmai-lived-response-return-surface:has(\n    [data-crystal-formation-presentation="RECOVERED_EXISTING"]\n  )';
const recoveredOwnershipSelector =
  '.xinmai-crystal-ownership[data-crystal-formation-presentation="RECOVERED_EXISTING"]';

for (const marker of [
  recoveredRelationshipSelector,
  recoveredSurfaceSelector,
  recoveredOwnershipSelector,
  "overflow-x: hidden !important;",
  "overflow-y: hidden !important;",
  "overscroll-behavior-y: contain;",
  "max-height: min(38dvh, 280px) !important;",
  "scroll-padding-block: 12px",
  "@media (max-width: 240px)",
  ".xinmai-life-app:has(",
  "min-width: 0 !important;",
  "max-width: 100%;",
  '"scene meaning"',
  '"actions actions"',
  "grid-template-columns: 68px minmax(0, 1fr);",
  "grid-area: scene;",
  "grid-area: meaning;",
  "grid-area: actions;",
  "width: min(100%, 68px);",
  "min-width: 0;",
  "max-width: 68px;",
]) {
  assert(styles.includes(marker), `missing recovered Ownership hit-target guard: ${marker}`);
}

for (const forbidden of [
  "max-height: min(31dvh, 230px)",
  "grid-template-columns: 58px minmax(0, 1fr)",
  "grid-row: 1 / span 2",
]) {
  assert(
    !styles.includes(forbidden),
    `recovered Ownership clipping path remains: ${forbidden}`,
  );
}

assert(
  packageJson.scripts?.[
    "check:xinmai-c2-recovered-ownership-narrow-hit-target"
  ] ===
    "node scripts/check-xinmai-c2-recovered-ownership-narrow-hit-target.mjs",
  "recovered Ownership hit-target gate is not registered",
);

console.log("[XINMAI C2 RECOVERED OWNERSHIP NARROW HIT TARGET] PASS");
