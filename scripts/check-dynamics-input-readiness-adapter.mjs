import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import process from "node:process";
import { build } from "esbuild";

const rootDir = process.cwd();
const adapterPath = path.join(rootDir, "src/services/guanyaoDynamicsInputReadinessAdapter.ts");
const gravityPath = path.join(rootDir, "src/pages/GravityPage.tsx");
const adapterSource = fs.readFileSync(adapterPath, "utf8");
const gravitySource = fs.readFileSync(gravityPath, "utf8");
const tempModulePath = path.join(os.tmpdir(), `guanyao-dynamics-input-readiness-${process.pid}.mjs`);

const assertEqual = (name, actual, expected) => {
  if (actual !== expected) throw new Error(`${name} expected=${expected} actual=${actual}`);
  console.log(`PASS | ${name} | expected=${expected} | actual=${actual}`);
};

const assertIncludes = (name, source, expected) => {
  if (!source.includes(expected)) throw new Error(`${name} missing=${expected}`);
  console.log(`PASS | ${name} | includes=${expected}`);
};

const assertExcludes = (name, source, forbidden) => {
  if (source.includes(forbidden)) throw new Error(`${name} forbidden=${forbidden}`);
  console.log(`PASS | ${name} | forbidden=absent`);
};

const emptyInput = () => ({
  selectedPressureSeedContext: null,
  motherCodeProfile: null,
  originMotherContext: null,
  personaOutputSnapshot: null,
});

const pressureContext = {
  selectedPressureSeedId: "seed-ready",
  matrixCode: "POWER-EVALUATION",
  surface: "这一局压力",
};

try {
  await build({
    entryPoints: [adapterPath],
    outfile: tempModulePath,
    bundle: true,
    platform: "node",
    format: "esm",
    target: "node20",
    logLevel: "silent",
  });

  const { resolveDynamicsInputReadiness } = await import(`file://${tempModulePath}?t=${Date.now()}`);

  const pressureMissing = resolveDynamicsInputReadiness(emptyInput());
  assertEqual("empty input is not ready", pressureMissing.status, "NOT_READY");
  assertEqual("empty input reports pressure reason", pressureMissing.reason, "PRESSURE_CONTEXT_MISSING");
  assertEqual("empty input has no pressure context", pressureMissing.hasPressureContext, false);

  const motherMissing = resolveDynamicsInputReadiness({
    ...emptyInput(),
    selectedPressureSeedContext: pressureContext,
  });
  assertEqual("pressure-only input is not ready", motherMissing.status, "NOT_READY");
  assertEqual("pressure-only input reports mother reason", motherMissing.reason, "MOTHER_CONTEXT_MISSING");
  assertEqual("pressure-only input preserves locked pressure", motherMissing.hasPressureContext, true);

  const readyInput = resolveDynamicsInputReadiness({
    ...emptyInput(),
    selectedPressureSeedContext: pressureContext,
    motherCodeProfile: {
      motherCodeName: "兑｜连接者",
      trigram: "兑",
      baseDrive: "连接",
    },
  });
  assertEqual("complete input is ready", readyInput.status, "READY");
  assertEqual("complete input has formal readiness", readyInput.readiness, "READY_FOR_CURRENT_HEXAGRAM");
  assertEqual("ready input preserves pressure seed", readyInput.selectedPressureSeedContext?.selectedPressureSeedId, "seed-ready");
  assertEqual("ready input resolves lower trigram", readyInput.motherCodeProfile?.lowerTrigram, "兑");
  assertEqual("ready input preserves source trigram", readyInput.motherTrigram, "兑");
  assertEqual("ready input keeps legacy base drive fallback", readyInput.motherCodeProfile?.baseForce, "连接");

  const originCompatible = resolveDynamicsInputReadiness({
    ...emptyInput(),
    selectedPressureSeedContext: pressureContext,
    originMotherContext: {
      mother: {
        trigram: "坎",
        profile: { baseDrive: "穿越" },
      },
    },
    personaOutputSnapshot: { motherCodeName: "坎｜穿越者" },
  });
  assertEqual("legacy origin mother context remains compatible", originCompatible.status, "READY");
  assertEqual("persona can supplement legacy mother name", originCompatible.motherCodeProfile?.motherCodeName, "坎｜穿越者");
  assertEqual("origin context can supplement lower trigram", originCompatible.motherCodeProfile?.lowerTrigram, "坎");

  const personaOptional = resolveDynamicsInputReadiness({
    ...emptyInput(),
    selectedPressureSeedContext: pressureContext,
    motherCodeProfile: { motherCodeName: "震｜启动者", lowerTrigram: "震" },
  });
  assertEqual("persona snapshot is optional for readiness", personaOptional.status, "READY");

  const invalidMother = resolveDynamicsInputReadiness({
    ...emptyInput(),
    selectedPressureSeedContext: pressureContext,
    motherCodeProfile: { motherCodeName: "未知母码", lowerTrigram: "未知" },
  });
  assertEqual("invalid lower trigram blocks formation", invalidMother.status, "NOT_READY");
  assertEqual("invalid lower trigram reports mother reason", invalidMother.reason, "MOTHER_CONTEXT_MISSING");

  assertIncludes("readiness adapter owns explicit ready state", adapterSource, 'status: "READY"');
  assertIncludes("readiness adapter owns pressure missing reason", adapterSource, '"PRESSURE_CONTEXT_MISSING"');
  assertIncludes("readiness adapter owns mother missing reason", adapterSource, '"MOTHER_CONTEXT_MISSING"');
  assertIncludes("Gravity delegates readiness resolution", gravitySource, "resolveDynamicsInputReadiness(dynamicsInputContext)");
  assertIncludes("current hexagram formation consumes readiness", gravitySource, "resolveCurrentHexagramFormation(dynamicsInputReadiness)");
  assertIncludes(
    "preview state delegates readiness presentation",
    gravitySource,
    "resolveDynamicsExperienceReadinessPresentation({",
  );
  assertIncludes(
    "pressure marker follows readiness pressure flag",
    gravitySource,
    "data-dynamics-pressure-context={experienceReadinessPresentation.pressureContextMarker}",
  );
  assertExcludes("Gravity no longer owns mother profile normalization", gravitySource, "function normalizeMotherCodeProfileForHexagram");
  assertExcludes("Gravity no longer infers pressure readiness with Boolean", gravitySource, "Boolean(dynamicsInputContext.selectedPressureSeedContext)");

  console.log("\n[DYNAMICS INPUT READINESS ADAPTER] PASS");
} catch (error) {
  console.error("[DYNAMICS INPUT READINESS ADAPTER] FAIL");
  console.error(error instanceof Error ? error.message : error);
  process.exit(1);
} finally {
  fs.rmSync(tempModulePath, { force: true });
}
