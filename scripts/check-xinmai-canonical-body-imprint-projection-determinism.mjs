import { build } from "esbuild";

const bundle = await build({
  entryPoints: ["src/services/xinmaiCanonicalBodyImprintProjector.ts"],
  bundle: true,
  format: "esm",
  platform: "node",
  write: false,
});
const moduleUrl =
  `data:text/javascript;base64,` +
  Buffer.from(bundle.outputFiles[0].text).toString("base64");
const { projectXinmaiCanonicalBodyImprints } = await import(moduleUrl);

const assert = (condition, message) => {
  if (!condition) throw new Error(message);
};
const identity = Object.freeze({
  sourceReferenceId: "source:one",
  starBeastIdentityReferenceId: "starbeast:one",
  mansionCoordinateReferenceId: "mansion:one",
});
const receipt = (index, fencingToken = index) =>
  Object.freeze({
    formationReferenceId: `formation:${index}`,
    crystalReferenceId: `crystal:${index}`,
    crystalEligibilityReferenceId: `eligibility:${index}`,
    eligibilityRevision: 1,
    livedResponseReferenceId: `lived:${index}`,
    choiceActionIntentionReferenceId: `choice:${index}`,
    identityReferences: identity,
    fencingToken,
    formedAt: `2026-01-0${index}T00:00:00.000Z`,
  });
const projection = (sourceReceipt, primaryDimension) =>
  Object.freeze({
    formationReferenceId: sourceReceipt.formationReferenceId,
    crystalReferenceId: sourceReceipt.crystalReferenceId,
    choiceActionIntentionReferenceId:
      sourceReceipt.choiceActionIntentionReferenceId,
    formedAt: sourceReceipt.formedAt,
    formedCrystal: Object.freeze({
      status: "CRYSTALLIZED",
      formationReferenceId: sourceReceipt.formationReferenceId,
      crystalReferenceId: sourceReceipt.crystalReferenceId,
      crystalEligibilityReferenceId:
        sourceReceipt.crystalEligibilityReferenceId,
      eligibilityRevision: sourceReceipt.eligibilityRevision,
      livedResponseReferenceId:
        sourceReceipt.livedResponseReferenceId,
      transmission: Object.freeze({ primaryDimension }),
    }),
  });

const receiptA = receipt(1, 8);
const receiptB = receipt(2, 3);
const projectionA = projection(receiptA, "ACTION");
const projectionB = projection(receiptB, "EMOTION");
const first = projectXinmaiCanonicalBodyImprints({
  identityReferences: identity,
  formationReceipts: [receiptA, receiptB],
  canonicalCrystals: [projectionA, projectionB],
  focusedFormationReferenceId: receiptA.formationReferenceId,
});
const reordered = projectXinmaiCanonicalBodyImprints({
  identityReferences: identity,
  formationReceipts: [receiptB, receiptA],
  canonicalCrystals: [projectionB, projectionA],
  focusedFormationReferenceId: receiptA.formationReferenceId,
});
assert(first.status === "IMPRINT_AVAILABLE", "projection is unavailable");
assert(reordered.status === "IMPRINT_AVAILABLE", "reordered projection is unavailable");
assert(first.imprints.length === 2, "multiple canonical Crystals were overwritten");
assert(
  first.imprints.map((fact) => fact.imprintReferenceId).join("|") ===
    reordered.imprints.map((fact) => fact.imprintReferenceId).join("|"),
  "array order changed canonical Body Imprint identity or ordering",
);
assert(
  first.imprints[0].formationReferenceId === receiptB.formationReferenceId,
  "canonical fencing token is not the stable primary ordering key",
);
assert(
  first.imprints.find(
    (fact) => fact.formationReferenceId === receiptA.formationReferenceId,
  )?.salience === "CURRENT_FORMATION_FOCUS",
  "typed formation focus did not remain a presentation hint",
);
const missingCrystal = projectXinmaiCanonicalBodyImprints({
  identityReferences: identity,
  formationReceipts: [receiptA],
  canonicalCrystals: [],
});
assert(
  missingCrystal.status === "SAFE_WITHHELD" &&
    missingCrystal.reason === "CRYSTAL_PROJECTION_MISSING",
  "Receipt without canonical Crystal did not safe-withhold",
);
const noReceipt = projectXinmaiCanonicalBodyImprints({
  identityReferences: identity,
  formationReceipts: [],
  canonicalCrystals: [],
});
assert(
  noReceipt.status === "NO_CANONICAL_IMPRINT",
  "empty canonical history was confused with failure",
);
const identityMismatch = projectXinmaiCanonicalBodyImprints({
  identityReferences: Object.freeze({
    ...identity,
    sourceReferenceId: "source:other",
  }),
  formationReceipts: [receiptA],
  canonicalCrystals: [projectionA],
});
assert(
  identityMismatch.status === "SAFE_WITHHELD" &&
    identityMismatch.reason === "IDENTITY_MISMATCH",
  "identity mismatch did not safe-withhold",
);
console.log("[XINMAI CANONICAL BODY IMPRINT DETERMINISM] PASS");
