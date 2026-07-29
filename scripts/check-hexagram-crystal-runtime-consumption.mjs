import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { build } from "esbuild";

const root = process.cwd();
const endpoint = path.join(
  root,
  "src/services/hexagramCrystalRuntimeEndpointService.ts",
);
const out = path.join(os.tmpdir(), `hexagram-crystal-runtime-${process.pid}.mjs`);
const assert = (value, message) => {
  if (!value) throw new Error(message);
};
try {
  await build({
    entryPoints: [endpoint],
    outfile: out,
    bundle: true,
    platform: "node",
    format: "esm",
    target: "node20",
    logLevel: "silent",
  });
  const api = await import(`file://${out}?t=${Date.now()}`);
  const migrationImpact = {
    sourceUnit: {
      unitId: "unit",
      dimension: "action",
      yaoStage: "awareness",
    },
    dimension: "action",
    yaoStage: "awareness",
    fromModel: "旧回应",
    toResponse: "新回应",
    deflectionVector: "PAUSE_BEFORE_ACTION",
    beastImpact: {
      before: "收紧",
      after: "松开",
      cue: "呼吸",
    },
    crystalImprint: {
      imprintLine: "一次真实回应",
      shouldFeedCrystal: true,
      shouldDepositToRingLite: false,
    },
    impactReadiness: "READY_FOR_CRYSTAL",
    guardrails: {
      noStorageWrite: true,
      noLongTermProfile: true,
      noScore: true,
      noGrowthValue: true,
      noRawEngineLanguage: true,
      no384Yao: true,
      noArchive: true,
    },
  };
  const result = api.resolveRuntimeCurrentCrystalEndState({
    currentHexagramProfile: {
      lowerTrigram: "兑",
      upperTrigram: "乾",
      hexagramCode: "010",
      hexagramName: "天泽履",
      hexagramTitle: "冰上",
    },
    motherCodeName: "兑｜连接者",
    selectedPressureSeedContext: {
      selectedPressureSeedId: "seed",
      surface: "现实",
      pressureField: "POWER",
    },
    completedNodeCount: 6,
    primaryDimension: "action",
    readyToCrystallize: true,
    migrationImpact,
    formationIdentity: {
      formationReferenceId: "formation:one",
      crystalReferenceId: "crystal:one",
      crystalEligibilityReferenceId: "eligibility:one",
      eligibilityRevision: 1,
      livedResponseReferenceId: "response:one",
      formedAt: "2026-07-29T00:00:00.000Z",
    },
  });
  assert(result?.formationReferenceId === "formation:one", "formation identity lost");
  assert(result?.crystalReferenceId === "crystal:one", "Crystal identity lost");
  assert(
    result?.livedResponseReferenceId === "response:one",
    "Lived Response provenance lost",
  );
  const source = fs.readFileSync(endpoint, "utf8");
  assert(source.includes("formationIdentity"), "endpoint lacks formal Formation input");
  assert(!source.includes("livedResponseRecognized"), "page authority leaked into endpoint");
  console.log("[HEXAGRAM CRYSTAL RUNTIME CONSUMPTION] PASS");
} finally {
  fs.rmSync(out, { force: true });
}
