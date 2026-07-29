import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import process from "node:process";
import { build } from "esbuild";

const root = process.cwd();
const adapterPath = path.join(
  root,
  "src/services/guanyaoDynamicsCrystalRuntimeAdapter.ts",
);
const out = path.join(os.tmpdir(), `xinmai-crystal-adapter-${process.pid}.mjs`);
const source = fs.readFileSync(adapterPath, "utf8");
const assert = (value, message) => {
  if (!value) throw new Error(message);
};

const readyInput = {
  status: "READY",
  readiness: "READY_FOR_CURRENT_HEXAGRAM",
  hasPressureContext: true,
  selectedPressureSeedContext: {
    selectedPressureSeedId: "seed",
    pressureField: "POWER",
    pressureNature: "EVALUATION",
    surface: "现实靠近",
    shell: "担心失败",
    scenarioDomain: "BOSS",
    pressureIntensity: 80,
    primaryRelation: "BOSS",
  },
  motherCodeProfile: {
    motherCodeId: "mother-dui",
    motherCodeName: "兑｜连接者",
    lowerTrigram: "兑",
    baseForce: "连接",
    defaultReactionPattern: "先回应",
    pressureSensitiveZones: ["评价"],
    defenseTendency: "维持连接",
    behaviorBias: "快速回应",
  },
  motherTrigram: "兑",
};

try {
  await build({
    stdin: {
      contents: `
export * from ${JSON.stringify(adapterPath)};
export * from ${JSON.stringify(path.join(root, "src/services/guanyaoCurrentHexagramFormationAdapter.ts"))};
export * from ${JSON.stringify(path.join(root, "src/services/guanyaoDynamicsMigrationImpactAdapter.ts"))};
export * from ${JSON.stringify(path.join(root, "src/services/changeExperienceRuntimeRoutingService.ts"))};
export * from ${JSON.stringify(path.join(root, "src/services/fixtures/changeExperienceRuntimeSmokeFixtures.ts"))};
`,
      resolveDir: root,
      sourcefile: "crystal-adapter-gate.ts",
    },
    outfile: out,
    bundle: true,
    platform: "node",
    format: "esm",
    target: "node20",
    logLevel: "silent",
  });
  const api = await import(`file://${out}?t=${Date.now()}`);
  const formation = api.resolveCurrentHexagramFormation(readyInput);
  const action = api.resolveChangeExperienceRuntimeSmokeRevisionAction("action-five");
  const route = api.resolveChangeExperienceRuntimeRoute(action, "action-five");
  const migrationImpact = api.resolveDynamicsMigrationImpact({
    action,
    changeExperienceRoute: route,
  });
  const input = {
    formationSourceSnapshot: {
      formation,
      migrationImpact,
      completedNodeCount: 6,
      primaryDimension: "action",
      action,
      assetCompletionState: "READY_TO_CRYSTALLIZE",
    },
    formationAuthorization: {
      authority: "XINMAI_CRYSTAL_ELIGIBILITY",
      status: "AUTHORIZED",
      crystalEligibilityReferenceId: "eligibility:one",
      eligibilityRevision: 1,
      livedResponseReferenceId: "lived-response:one",
      formationReferenceId: "formation:one",
      crystalReferenceId: "crystal:one",
      formedAt: "2026-07-29T00:00:00.000Z",
    },
  };
  const formed = api.resolveDynamicsCurrentCrystalEndState(input);
  assert(formed?.crystalReferenceId === "crystal:one", "formal Crystal reference lost");
  assert(
    formed?.crystalEligibilityReferenceId === "eligibility:one",
    "Eligibility provenance lost",
  );
  assert(
    formed?.createdAt === "2026-07-29T00:00:00.000Z",
    "formation timestamp is not authoritative",
  );
  assert(
    api.resolveDynamicsCurrentCrystalEndState({
      ...input,
      formationAuthorization: {
        ...input.formationAuthorization,
        authority: "LEGACY_PAGE_BOOLEAN",
      },
    }) === null,
    "legacy authority was accepted",
  );
  assert(
    api.resolveDynamicsCurrentCrystalEndState({
      ...input,
      formationSourceSnapshot: {
        ...input.formationSourceSnapshot,
        assetCompletionState: "INCOMPLETE",
      },
    }) === null,
    "incomplete formation source was accepted",
  );
  for (const marker of [
    "formationAuthorization",
    "XINMAI_CRYSTAL_ELIGIBILITY",
    "formationIdentity",
  ]) {
    assert(source.includes(marker), `missing ${marker}`);
  }
  for (const forbidden of [
    "revisionActionConfirmed",
    "livedResponseRecognized",
    "ELIGIBLE_BY_USER_RECOGNITION",
  ]) {
    assert(!source.includes(forbidden), `legacy authority remains: ${forbidden}`);
  }
  console.log("[DYNAMICS CRYSTAL RUNTIME ADAPTER] PASS");
} finally {
  fs.rmSync(out, { force: true });
}
