import fs from "node:fs";

const read = (path) => fs.readFileSync(path, "utf8");
const types = read("src/types/xinmaiCrystalOwnershipPresentation.ts");
const resolver = read(
  "src/services/xinmaiCrystalOwnershipPresentationResolver.ts",
);
const moment = read(
  "src/components/XinmaiCrystalFormationOwnershipMoment.tsx",
);
const surface = read("src/components/XinmaiLivedResponseReturnSurface.tsx");
const styles = read(
  "src/styles/xinmai-crystal-formation-ownership-moment.css",
);

const assert = (condition, message) => {
  if (!condition) throw new Error(message);
};

for (const state of [
  "FORMATION_PENDING",
  "FORMATION_CONFIRMED",
  "OWNERSHIP_PRESENTED",
  "RECOVERED_EXISTING",
  "SAFE_WITHHELD",
]) {
  assert(types.includes(`\"${state}\"`), `missing Ownership state ${state}`);
}

for (const marker of [
  'successAuthority: "IDB_TRANSACTION_COMPLETE"',
  'authorityWriteback: "FORBIDDEN"',
  "XINMAI_CRYSTAL_OWNERSHIP_PRESENTATION_POLICY",
  '"STATIC_CONFIRMATION_ONLY"',
  "FORMATION_RECEIPT_INVALID",
  "CANONICAL_RECOVERY",
  "receipt.formedCrystal.crystal.copy",
]) {
  assert(
    types.includes(marker) || resolver.includes(marker),
    `missing typed Ownership marker ${marker}`,
  );
}

for (const forbidden of [
  "localStorage",
  "indexedDB",
  "document.",
  "window.",
  "PersonalityRingLite",
  "createdAt",
]) {
  assert(
    !resolver.includes(forbidden),
    `Presentation Resolver consumes forbidden authority: ${forbidden}`,
  );
}

for (const marker of [
  "resolveXinmaiCrystalOwnershipPresentation",
  "XinmaiCrystalFormationOwnershipMoment",
  '"CANONICAL_RECOVERY"',
  'presentationOrigin:',
  'motionPreference: staticPresentation',
]) {
  assert(surface.includes(marker), `return surface missing ${marker}`);
}

assert(
  !moment.includes("CrystalFormationReceipt") &&
    !moment.includes("orchestrateProductionCrystalFormation") &&
    !moment.includes("localStorage") &&
    !moment.includes("indexedDB"),
  "Ownership surface reads Formation or Storage authority directly",
);

for (const marker of [
  'data-crystal-success-authority={visualFacts.successAuthority}',
  'data-authority-writeback="FORBIDDEN"',
  "你可以轻触它，也可以直接继续。",
]) {
  assert(moment.includes(marker), `Ownership moment missing ${marker}`);
}
for (const copy of [
  "你真实走出的这一步，留下了痕迹。",
  "它不证明你更好，只记得你曾经这样选择。",
]) {
  assert(types.includes(copy), `typed Ownership copy missing ${copy}`);
}

for (const forbidden of [
  "Audio(",
  "navigator.vibrate",
  "获得奖励",
  "升级成功",
  "战力提升",
]) {
  assert(!moment.includes(forbidden), `C1 contains forbidden expansion ${forbidden}`);
}

assert(
  styles.includes("xinmai-ownership-crystal-arrive") &&
    styles.includes("prefers-reduced-motion: reduce") &&
    styles.includes('data-motion-presentation="REDUCED_MOTION"'),
  "Motion and Reduced Motion presentation parity is incomplete",
);
assert(
  moment.includes("<svg") &&
    moment.includes("xinmai-crystal-ownership__crystal-shell"),
  "Static SVG Crystal fallback is missing",
);

console.log("[XINMAI CRYSTAL OWNERSHIP PRESENTATION] PASS");
