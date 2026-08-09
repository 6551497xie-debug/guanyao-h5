import fs from "node:fs";

const read = (file) => fs.readFileSync(file, "utf8");
const assert = (condition, message) => {
  if (!condition) throw new Error(message);
};

const resolver = read("src/services/xinmaiReturningSameLifeContinuityPresentationResolver.ts");
const surface = read("src/components/XinmaiLivedResponseReturnSurface.tsx");
const mirror = read("src/services/xinmaiSameLifeAccessibleSemanticMirror.ts");
const ownership = read("src/services/xinmaiCrystalOwnershipPresentationResolver.ts");
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
  packageJson.scripts?.["check:xinmai-returning-same-life-continuity-recovery-accessibility"] ===
    "node scripts/check-xinmai-returning-same-life-continuity-recovery-accessibility.mjs",
  "V4 recovery/accessibility gate is not registered",
);

console.log("[XINMAI RETURNING SAME-LIFE CONTINUITY RECOVERY ACCESSIBILITY] PASS");
