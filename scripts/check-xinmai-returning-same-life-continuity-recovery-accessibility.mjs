import fs from "node:fs";

const read = (file) => fs.readFileSync(file, "utf8");
const assert = (condition, message) => {
  if (!condition) throw new Error(message);
};

const resolver = read("src/services/xinmaiReturningSameLifeContinuityPresentationResolver.ts");
const surface = read("src/components/XinmaiLivedResponseReturnSurface.tsx");
const mirror = read("src/services/xinmaiSameLifeAccessibleSemanticMirror.ts");
const ownership = read("src/services/xinmaiCrystalOwnershipPresentationResolver.ts");
const visualSystem = read("src/styles/xinmai-visual-life-system.css");
const packageJson = JSON.parse(read("package.json"));

assert(
  resolver.includes('ownership.state === "RECOVERED_EXISTING"') &&
    resolver.includes('"RECOVERY_SILENT"') &&
    resolver.includes('"ANNOUNCE_ONCE"'),
  "V4 recovery announcement policy is incomplete",
);
assert(
  mirror.includes('autoAnnouncement: "RECOVERY_SILENT"') &&
    ownership.includes('"RECOVERED_EXISTING"'),
  "Existing C1/C2 recovery-silent contract was not preserved",
);
assert(
  surface.includes("lastAnnouncementKeyRef") &&
    surface.includes('role="status"') &&
    !resolver.includes("aria-live") &&
    !resolver.includes("role=\"status\""),
  "V4 introduced a duplicate live-region owner",
);
assert(
  visualSystem.includes(".xinmai-crystal-ownership__crystal-line,") &&
    visualSystem.includes(".xinmai-crystal-ownership__actions") &&
    visualSystem.includes("color: rgba(185, 203, 236, 0.62);") &&
    !visualSystem.match(
      /\.xinmai-crystal-ownership__crystal-line,[\s\S]{0,320}color:\s*rgba\(185,\s*203,\s*236,\s*0\.48\)/,
    ),
  "Ownership auxiliary text contrast correction is missing or has regressed",
);
assert(
  packageJson.scripts?.["check:xinmai-returning-same-life-continuity-recovery-accessibility"] ===
    "node scripts/check-xinmai-returning-same-life-continuity-recovery-accessibility.mjs",
  "V4 recovery/accessibility gate is not registered",
);

console.log("[XINMAI RETURNING SAME-LIFE CONTINUITY RECOVERY ACCESSIBILITY] PASS");
