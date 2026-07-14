import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import process from "node:process";
import { build } from "esbuild";

const rootDir = process.cwd();
const adapterPath = path.join(rootDir, "src/services/guanyaoDynamicsMotherPresentationAdapter.ts");
const assetCandidatePath = path.join(rootDir, "src/services/guanyaoHexagramAssetCandidateResolver.ts");
const gravityPath = path.join(rootDir, "src/pages/GravityPage.tsx");
const adapterSource = fs.readFileSync(adapterPath, "utf8");
const gravitySource = fs.readFileSync(gravityPath, "utf8");
const tempModulePath = path.join(os.tmpdir(), `guanyao-dynamics-mother-presentation-${process.pid}.mjs`);

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

const context = ({
  motherCodeProfile = null,
  originMotherContext = null,
  personaOutputSnapshot = null,
} = {}) => ({
  selectedPressureSeedContext: null,
  motherCodeProfile,
  originMotherContext,
  personaOutputSnapshot,
});

try {
  await build({
    stdin: {
      contents: [
        `export { resolveDynamicsMotherPresentation } from ${JSON.stringify(adapterPath)};`,
        `export { resolveHexagramAssetCandidate } from ${JSON.stringify(assetCandidatePath)};`,
      ].join("\n"),
      resolveDir: rootDir,
      sourcefile: "dynamics-mother-presentation-gate.ts",
      loader: "ts",
    },
    outfile: tempModulePath,
    bundle: true,
    platform: "node",
    format: "esm",
    target: "node20",
    logLevel: "silent",
  });

  const {
    resolveDynamicsMotherPresentation,
    resolveHexagramAssetCandidate,
  } = await import(`file://${tempModulePath}?t=${Date.now()}`);

  const formal = resolveDynamicsMotherPresentation({
    context: context({
      motherCodeProfile: {
        motherCodeName: "兑｜正式母码",
        trigram: "兑",
        lowerTrigram: "巽",
      },
      originMotherContext: {
        starbeast: { fourSymbol: "青龙" },
        fourBeast: "白虎",
        geo: { symbol: "玄武" },
        mother: {
          trigram: "坎",
          profile: { motherCodeName: "坎｜origin 母码" },
        },
        trigram: "离",
      },
      personaOutputSnapshot: {
        motherCodeName: "震｜persona 母码",
        motherCode: "震",
        trigram: "震",
        starbeast: { fourSymbol: "朱雀" },
      },
    }),
  });
  assertEqual("formal profile mother name wins", formal.motherCodeName, "兑｜正式母码");
  assertEqual("formal profile trigram wins", formal.personaSnapshot?.trigram, "兑");
  assertEqual("formal origin starbeast wins", formal.personaSnapshot?.fourSymbol, "青龙");
  assertEqual("presentation snapshot carries mother name", formal.personaSnapshot?.motherCode, "兑｜正式母码");

  const lowerTrigramFallback = resolveDynamicsMotherPresentation({
    context: context({ motherCodeProfile: { motherCodeName: "巽｜渗透者", lowerTrigram: "巽" } }),
  });
  assertEqual("profile lower trigram remains readable", lowerTrigramFallback.personaSnapshot?.trigram, "巽");

  const originFallback = resolveDynamicsMotherPresentation({
    context: context({
      originMotherContext: {
        mother: {
          trigram: "坎",
          profile: { motherCodeName: "坎｜origin 母码" },
        },
      },
    }),
  });
  assertEqual("origin mother name remains readable", originFallback.motherCodeName, "坎｜origin 母码");
  assertEqual("origin mother trigram remains readable", originFallback.personaSnapshot?.trigram, "坎");

  const personaFallback = resolveDynamicsMotherPresentation({
    context: context({
      personaOutputSnapshot: {
        motherCodeName: "震｜persona 母码",
        motherCode: "震",
        trigram: "震",
        starbeast: { fourSymbol: "朱雀" },
      },
    }),
  });
  assertEqual("persona mother name remains readable", personaFallback.motherCodeName, "震｜persona 母码");
  assertEqual("persona trigram remains readable", personaFallback.personaSnapshot?.trigram, "震");
  assertEqual("persona formal fourSymbol remains readable", personaFallback.personaSnapshot?.fourSymbol, "朱雀");

  const oldestMotherCodeFallback = resolveDynamicsMotherPresentation({
    context: context({ personaOutputSnapshot: { motherCode: "艮", trigram: "艮" } }),
  });
  assertEqual("oldest persona motherCode remains readable", oldestMotherCodeFallback.motherCodeName, "艮");

  const legacyFourSymbolFallback = resolveDynamicsMotherPresentation({
    context: context({ originMotherContext: { geo: { symbol: "玄武" } } }),
  });
  assertEqual("legacy geo symbol remains fourSymbol fallback", legacyFourSymbolFallback.personaSnapshot?.fourSymbol, "玄武");
  assertEqual("fourSymbol-only context keeps empty mother name", legacyFourSymbolFallback.motherCodeName, "");

  const missing = resolveDynamicsMotherPresentation({ context: context() });
  assertEqual("missing context keeps empty mother name", missing.motherCodeName, "");
  assertEqual("missing context yields no persona snapshot", missing.personaSnapshot, null);

  const assetCandidate = resolveHexagramAssetCandidate({
    personaSnapshot: formal.personaSnapshot,
    selectedPressureSeedContext: null,
    currentPrimarySpaceId: "body",
    completedNodeCount: 0,
  });
  assertEqual("asset candidate receives presentation mother", assetCandidate.motherCode, "兑｜正式母码");
  assertEqual("asset candidate receives presentation trigram", assetCandidate.trigram, "兑");
  assertEqual("asset candidate receives presentation fourSymbol", assetCandidate.fourSymbol, "青龙");

  assertIncludes(
    "mother presentation adapter owns independent input",
    adapterSource,
    "export type DynamicsMotherPresentationAdapterInput",
  );
  assertIncludes(
    "mother presentation adapter owns independent result",
    adapterSource,
    "export type DynamicsMotherPresentationResult",
  );
  assertIncludes(
    "mother presentation adapter delegates fourSymbol compatibility",
    adapterSource,
    "resolveStoredMotherFourSymbol(context)",
  );
  assertIncludes(
    "Gravity delegates mother presentation",
    gravitySource,
    "resolveDynamicsMotherPresentation({ context: dynamicsInputContext })",
  );
  assertIncludes(
    "Gravity consumes unified mother snapshot",
    gravitySource,
    "motherPresentation.personaSnapshot",
  );
  assertIncludes(
    "Gravity consumes unified mother name",
    gravitySource,
    "motherPresentation.motherCodeName",
  );
  assertExcludes("Gravity no longer owns mother name fallback", gravitySource, "function resolveMotherCodeName");
  assertExcludes("Gravity no longer owns mother snapshot fallback", gravitySource, "function resolveMotherPersonaSnapshot");
  assertExcludes("Gravity no longer resolves stored fourSymbol", gravitySource, "resolveStoredMotherFourSymbol");

  console.log("\n[DYNAMICS MOTHER PRESENTATION ADAPTER] PASS");
} catch (error) {
  console.error("[DYNAMICS MOTHER PRESENTATION ADAPTER] FAIL");
  console.error(error instanceof Error ? error.message : error);
  process.exit(1);
} finally {
  fs.rmSync(tempModulePath, { force: true });
}
