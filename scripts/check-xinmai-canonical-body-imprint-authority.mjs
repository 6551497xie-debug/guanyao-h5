import fs from "node:fs";

const read = (path) => fs.readFileSync(path, "utf8");
const files = {
  types: read("src/types/xinmaiCanonicalBodyImprint.ts"),
  projector: read("src/services/xinmaiCanonicalBodyImprintProjector.ts"),
  adapter: read("src/services/xinmaiCanonicalBodyImprintRecoveryAdapter.ts"),
  policy: read("src/services/xinmaiCanonicalBodyImprintPresentationPolicy.ts"),
  store: read("src/services/xinmaiLivedGrowthTransactionalStore.ts"),
  storeTypes: read("src/types/xinmaiLivedGrowthTransactionalStore.ts"),
};
const assert = (condition, message) => {
  if (!condition) throw new Error(message);
};

for (const marker of [
  "XINMAI_CANONICAL_BODY_IMPRINT_PROJECTION_V1",
  "XINMAI_CANONICAL_BODY_IMPRINT_VISUAL_FACT",
  "IMPRINT_AVAILABLE",
  "NO_CANONICAL_IMPRINT",
  "SAFE_WITHHELD",
  "formationReferenceId",
  "crystalReferenceId",
  "bodyReferenceId",
  "deterministicGeometryKey",
]) {
  assert(files.types.includes(marker), `missing typed fact marker: ${marker}`);
}
for (const forbidden of [
  "localStorage",
  "sessionStorage",
  "indexedDB",
  "readPersonalityRingLite",
  "createdAt",
  "crystal.copy",
  ".projection",
]) {
  assert(
    !files.projector.includes(forbidden),
    `Projector consumes forbidden authority: ${forbidden}`,
  );
}
assert(
  files.projector.includes("createStableXinmaiGrowthReference") &&
    files.projector.includes('"XINMAI_BODY"') &&
    files.projector.includes('"BODY_IMPRINT"') &&
    files.projector.includes("fencingToken") &&
    files.projector.includes("formationReferenceId.localeCompare"),
  "Projector does not preserve deterministic identity and ordering",
);
assert(
  files.adapter.includes("readXinmaiLivedGrowthCanonicalState") &&
    files.adapter.includes("projectXinmaiCanonicalBodyImprints") &&
    !files.adapter.includes("PersonalityRingLite"),
  "Recovery Adapter is not the unique canonical Growth reader",
);
assert(
  files.store.includes("XINMAI_LIVED_GROWTH_CRYSTAL_PROJECTION_STORE") &&
    files.store.includes("projectionRequest") &&
    files.storeTypes.includes("canonicalProjections"),
  "Canonical Receipt and Crystal projection are not read together",
);
assert(
  files.policy.includes('"ENABLED" | "SAFE_WITHHELD"'),
  "Forward safe-withheld policy is missing",
);
console.log("[XINMAI CANONICAL BODY IMPRINT AUTHORITY] PASS");
