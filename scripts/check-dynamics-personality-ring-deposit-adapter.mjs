import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import process from "node:process";
import { build } from "esbuild";

const root = process.cwd();
const adapterPath = path.join(
  root,
  "src/services/guanyaoDynamicsPersonalityRingDepositAdapter.ts",
);
const out = path.join(os.tmpdir(), `xinmai-ring-deposit-${process.pid}.mjs`);
const storage = new Map();
let rejectWrites = false;
globalThis.window = {
  localStorage: {
    getItem: (key) => storage.get(key) ?? null,
    setItem: (key, value) => {
      if (rejectWrites) throw new Error("rejected");
      storage.set(key, String(value));
    },
  },
};
const assert = (value, message) => {
  if (!value) throw new Error(message);
};
const crystal = {
  source: "dynamics",
  status: "CRYSTALLIZED",
  createdAt: "2026-07-29T00:00:00.000Z",
  formationReferenceId: "formation:one",
  crystalReferenceId: "crystal:one",
  crystalEligibilityReferenceId: "eligibility:one",
  eligibilityRevision: 1,
  livedResponseReferenceId: "response:one",
  mother: { motherCodeName: "兑｜连接者", lowerTrigram: "兑" },
  pressure: { selectedPressureSeedId: "seed", surface: "现实", pressureField: "POWER" },
  hexagram: { lowerTrigram: "兑", upperTrigram: "乾", hexagramName: "天泽履" },
  transmission: { completedNodeCount: 6, primaryDimension: "action" },
  crystal: { title: "本局结晶", copy: "一次真实回应。" },
};
const receipt = {
  schemaVersion: "XINMAI_CRYSTAL_FORMATION_RECEIPT_V1",
  source: "xinmai_crystal_formation_consumer",
  formationReferenceId: "formation:one",
  crystalReferenceId: "crystal:one",
  crystalEligibilityReferenceId: "eligibility:one",
  eligibilityRevision: 1,
  livedResponseReferenceId: "response:one",
  choiceActionIntentionReferenceId: "choice:one",
  identityReferences: {
    sourceReferenceId: "source:one",
    starBeastIdentityReferenceId: "beast:one",
    mansionCoordinateReferenceId: "mansion:one",
  },
  formationKey: "key:one",
  fencingToken: 1,
  formedCrystal: crystal,
  status: "FORMED",
  formedAt: crystal.createdAt,
  projection: "PENDING",
  projectionUpdatedAt: crystal.createdAt,
  provenance: {
    factAuthority: "XINMAI_LIVED_RESPONSE_FACT",
    eligibilityAuthority: "XINMAI_CRYSTAL_ELIGIBILITY",
    deterministicFormation: true,
    noBackfill: true,
  },
};

try {
  await build({
    entryPoints: [adapterPath],
    outfile: out,
    bundle: true,
    platform: "node",
    format: "esm",
    target: "node20",
    logLevel: "silent",
  });
  const { depositDynamicsCurrentCrystalToPersonalityRing } = await import(
    `file://${out}?t=${Date.now()}`
  );
  const deposited = depositDynamicsCurrentCrystalToPersonalityRing({
    formationReceipt: receipt,
  });
  assert(deposited.status === "DEPOSITED", "confirmed receipt was not projected");
  assert(
    deposited.entry?.crystalReferenceId === "crystal:one",
    "formal Crystal reference not projected",
  );
  const duplicate = depositDynamicsCurrentCrystalToPersonalityRing({
    formationReceipt: receipt,
  });
  assert(duplicate.status === "DUPLICATE", "Receipt replay duplicated Archive entry");
  assert(
    JSON.parse(storage.get("guanyao:personalityRingLite")).entries.length === 1,
    "Archive contains a duplicate",
  );
  storage.clear();
  rejectWrites = true;
  const failed = depositDynamicsCurrentCrystalToPersonalityRing({
    formationReceipt: receipt,
  });
  rejectWrites = false;
  assert(failed.status === "REJECTED", "projection failure was reported as success");
  const source = fs.readFileSync(adapterPath, "utf8");
  assert(source.includes("input.formationReceipt"), "Receipt is not the adapter input");
  assert(!source.includes("livedResponseRecognized"), "page authority leaked into projection");
  console.log("[DYNAMICS PERSONALITY RING DEPOSIT ADAPTER] PASS");
} finally {
  fs.rmSync(out, { force: true });
}
