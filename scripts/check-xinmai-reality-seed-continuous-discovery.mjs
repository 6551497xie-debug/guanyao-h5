import fs from "node:fs";
import path from "node:path";

const rootDir = process.cwd();
const read = (relativePath) =>
  fs.readFileSync(path.join(rootDir, relativePath), "utf8");

const presentation = read(
  "src/components/RealityPressureSeedPresentation.tsx",
);
const styles = read(
  "src/styles/xinmai-reality-seed-continuous-discovery.css",
);
const bundleContract = read(
  "src/services/realityPressureCrossFieldCandidateBundleContract.ts",
);
const packageJson = JSON.parse(read("package.json"));

const listStart = presentation.indexOf('className="gy-p36__signal-list"');
const listEnd = presentation.indexOf("</div>", listStart);
const continuationPosition = presentation.indexOf(
  'data-reality-seed-continuation="IN_SWIPE_PATH"',
);
const nextBundleActionPosition = presentation.indexOf(
  'data-interaction="PRESSURE_SEED_REQUEST_NEXT_BUNDLE"',
);

const checks = [
  [
    "existing catalog remains three-at-a-time rather than becoming an infinite feed",
    bundleContract.includes("candidatesPerBundle: 3"),
  ],
  [
    "continuation lives after the current candidates in the same swipe path",
    listStart >= 0 &&
      continuationPosition > listStart &&
      nextBundleActionPosition > continuationPosition &&
      listEnd > nextBundleActionPosition,
  ],
  [
    "bundle replacement remounts the rail at its beginning",
    presentation.includes("key={session.candidateBundleReferenceId}"),
  ],
  [
    "continuation consumes the existing cursor without automatic recognition",
    presentation.includes(
      'data-next-bundle-source="EXISTING_PRESSURE_SEED_CURSOR"',
    ) &&
      presentation.includes('data-automatic-recognition="NONE"') &&
      presentation.includes("onClick={onRequestNextBundle}"),
  ],
  [
    "old detached test-like next-group copy is removed",
    !presentation.includes("都不像，换一组"),
  ],
  [
    "the continuation is a restrained fourth spatial stop",
    styles.includes("scroll-snap-align: center") &&
      styles.includes(".gy-reality-seed-continuation"),
  ],
  [
    "reduced motion preserves the discovery action",
    styles.includes("@media (prefers-reduced-motion: reduce)"),
  ],
  [
    "gate is registered",
    packageJson.scripts?.[
      "check-xinmai-reality-seed-continuous-discovery"
    ] ===
      "node scripts/check-xinmai-reality-seed-continuous-discovery.mjs",
  ],
];

let failed = false;
for (const [label, passed] of checks) {
  if (passed) {
    console.log(`PASS | ${label}`);
  } else {
    failed = true;
    console.error(`FAIL | ${label}`);
  }
}

if (failed) process.exit(1);
console.log("\n[XINMAI REALITY SEED CONTINUOUS DISCOVERY] PASS");
