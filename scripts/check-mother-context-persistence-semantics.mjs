import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import process from "node:process";
import { build } from "esbuild";

const rootDir = process.cwd();
const adapterPath = path.join(rootDir, "src/services/guanyaoStoredMotherContextAdapter.ts");
const handoffPath = path.join(rootDir, "src/services/guanyaoDynamicsMotherHandoffAdapter.ts");
const inputAdapterPath = path.join(rootDir, "src/services/guanyaoDynamicsInputContextAdapter.ts");
const persistencePath = path.join(rootDir, "src/services/guanyaoOriginMotherContextPersistenceAdapter.ts");
const typePath = path.join(rootDir, "src/types/gravityRuntimeInput.ts");
const fusionTypePath = path.join(rootDir, "src/types/guanyaoGeoChronoMotherFusion.ts");
const launchPath = path.join(rootDir, "src/pages/LaunchLab.tsx");
const gravityPath = path.join(rootDir, "src/pages/GravityPage.tsx");
const adapterSource = fs.readFileSync(adapterPath, "utf8");
const handoffSource = fs.readFileSync(handoffPath, "utf8");
const inputAdapterSource = fs.readFileSync(inputAdapterPath, "utf8");
const persistenceSource = fs.readFileSync(persistencePath, "utf8");
const typeSource = fs.readFileSync(typePath, "utf8");
const fusionTypeSource = fs.readFileSync(fusionTypePath, "utf8");
const launchSource = fs.readFileSync(launchPath, "utf8");
const gravitySource = fs.readFileSync(gravityPath, "utf8");
const tempAdapterPath = path.join(os.tmpdir(), `guanyao-mother-context-adapter-${process.pid}.mjs`);
const tempHandoffPath = path.join(os.tmpdir(), `guanyao-mother-handoff-${process.pid}.mjs`);
const tempPersistencePath = path.join(os.tmpdir(), `guanyao-mother-context-persistence-${process.pid}.mjs`);

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

try {
  await Promise.all([
    build({
      entryPoints: [adapterPath],
      outfile: tempAdapterPath,
      bundle: true,
      platform: "node",
      format: "esm",
      target: "node20",
      logLevel: "silent",
    }),
    build({
      entryPoints: [handoffPath],
      outfile: tempHandoffPath,
      bundle: true,
      platform: "node",
      format: "esm",
      target: "node20",
      logLevel: "silent",
    }),
    build({
      entryPoints: [persistencePath],
      outfile: tempPersistencePath,
      bundle: true,
      platform: "node",
      format: "esm",
      target: "node20",
      logLevel: "silent",
    }),
  ]);

  const { resolveStoredMotherFourSymbol } = await import(`file://${tempAdapterPath}?t=${Date.now()}`);
  const { buildDynamicsMotherHandoff } = await import(`file://${tempHandoffPath}?t=${Date.now()}`);
  const {
    GUANYAO_ORIGIN_MOTHER_CONTEXT_SCHEMA_VERSION,
    readPersistedOriginMotherContext,
    writeOriginMotherContext,
  } = await import(`file://${tempPersistencePath}?t=${Date.now()}`);
  const context = (originMotherContext, personaOutputSnapshot = null) => ({
    selectedPressureSeedContext: null,
    motherCodeProfile: null,
    originMotherContext,
    personaOutputSnapshot,
  });

  assertEqual(
    "formal starbeast fourSymbol wins conflicting legacy values",
    resolveStoredMotherFourSymbol(context(
      { starbeast: { fourSymbol: "青龙" }, fourBeast: "白虎", geo: { symbol: "玄武" } },
      { fourBeast: "朱雀", direction: "白虎" },
    )),
    "青龙",
  );
  assertEqual(
    "legacy top-level fourBeast remains readable",
    resolveStoredMotherFourSymbol(context({ fourBeast: "白虎" })),
    "白虎",
  );
  assertEqual(
    "legacy geo symbol remains readable",
    resolveStoredMotherFourSymbol(context({ geo: { symbol: "玄武", province: "甘肃" } })),
    "玄武",
  );
  assertEqual(
    "legacy persona fourBeast remains readable",
    resolveStoredMotherFourSymbol(context(null, { fourBeast: "朱雀" })),
    "朱雀",
  );
  assertEqual(
    "oldest persona direction remains readable",
    resolveStoredMotherFourSymbol(context(null, { direction: "青龙" })),
    "青龙",
  );

  const motherHandoff = buildDynamicsMotherHandoff({
    mother_seed: { direction: "青龙", timePhase: "X2-Y3", starResidue: "28宿节点-07" },
    geo: { province: "甘肃", city: "兰州", role: "birth location context" },
    chrono: { lockPoint: "X2-Y3", timePhaseIndex: 1, calibrationIndex: 2, role: "temporal axis" },
    starbeast: {
      fourSymbol: "青龙",
      primaryNode: "28宿节点-07",
      originLightTrace: "28光兽入口",
      role: "identity residue",
    },
    mother: {
      trigram: "兑",
      profile: {
        motherCodeId: "M08",
        motherCodeName: "兑｜连接者",
        baseForce: "连接",
        defaultReactionPattern: "先建立连接",
        pressureSensitiveZones: [],
        defenseTendency: "维持关系",
        behaviorBias: "寻找回应",
      },
      definition: {
        trigramSymbol: "☱",
        trigramImage: "泽",
        baseDrive: "连接",
        defaultReactionChain: "寻找回应",
        shadowInertia: "依赖反馈",
        personalityAsset: "连接力",
        assetSummary: "让关系流动",
      },
    },
  });
  assertEqual("mother handoff is immutable", Object.isFrozen(motherHandoff), true);
  assertEqual("mother handoff profile follows resolved trigram", motherHandoff.motherCodeProfile.trigram, "兑");
  assertEqual("mother handoff keeps formal starbeast", motherHandoff.originMotherContext.starbeast.fourSymbol, "青龙");
  assertEqual("mother handoff persona keeps formal fourSymbol", motherHandoff.personaOutputSnapshot.starbeast.fourSymbol, "青龙");
  assertEqual("mother handoff preserves star origin index", motherHandoff.personaOutputSnapshot.starOrigin.index, 6);

  const storage = new Map();
  let rejectWrites = false;
  globalThis.window = {
    localStorage: {
      getItem: (key) => storage.get(key) ?? null,
      setItem: (key, value) => {
        if (rejectWrites) throw new Error("storage write rejected");
        storage.set(key, value);
      },
    },
  };
  storage.set("guanyao:originMotherContext", JSON.stringify({ source: "legacy", trigram: "兑" }));
  assertEqual(
    "persistence adapter reads unversioned legacy context",
    readPersistedOriginMotherContext()?.trigram,
    "兑",
  );
  const versionedContext = writeOriginMotherContext({ source: "launch-lab", trigram: "震" });
  assertEqual(
    "persistence adapter attaches schema version",
    versionedContext.schemaVersion,
    GUANYAO_ORIGIN_MOTHER_CONTEXT_SCHEMA_VERSION,
  );
  assertEqual("persistence adapter preserves context immutability", Object.isFrozen(versionedContext), true);
  assertEqual(
    "persistence adapter stores schema version",
    JSON.parse(storage.get("guanyao:originMotherContext")).schemaVersion,
    "GUANYAO_ORIGIN_MOTHER_CONTEXT_V2",
  );

  rejectWrites = true;
  const rejectedWriteContext = writeOriginMotherContext({ source: "launch-lab", trigram: "坎" });
  rejectWrites = false;
  assertEqual(
    "rejected storage write preserves resolved context",
    rejectedWriteContext.trigram,
    "坎",
  );
  assertEqual(
    "rejected storage write preserves schema version",
    rejectedWriteContext.schemaVersion,
    GUANYAO_ORIGIN_MOTHER_CONTEXT_SCHEMA_VERSION,
  );
  assertEqual(
    "rejected storage write preserves context immutability",
    Object.isFrozen(rejectedWriteContext),
    true,
  );
  assertEqual(
    "rejected storage write does not replace persisted context",
    JSON.parse(storage.get("guanyao:originMotherContext")).trigram,
    "震",
  );

  const availableWindow = globalThis.window;
  globalThis.window = {};
  const unavailableStorageContext = writeOriginMotherContext({
    source: "launch-lab",
    trigram: "离",
  });
  globalThis.window = availableWindow;
  assertEqual(
    "unavailable storage preserves resolved context",
    unavailableStorageContext.trigram,
    "离",
  );
  assertEqual(
    "unavailable storage preserves context immutability",
    Object.isFrozen(unavailableStorageContext),
    true,
  );

  const dynamicsInputBlock = inputAdapterSource.slice(
    inputAdapterSource.indexOf("export function resolveDynamicsInputContext"),
  );
  const geoResultBlock = fusionTypeSource.slice(
    fusionTypeSource.indexOf("geo: Readonly<{"),
    fusionTypeSource.indexOf("chrono: Readonly<{"),
  );
  const storedContextBlock = typeSource.slice(
    typeSource.indexOf("export type StoredOriginMotherContext"),
    typeSource.indexOf("export type DynamicsInputContext"),
  );
  assertIncludes("stored context type owns formal starbeast", typeSource, "starbeast?: {");
  assertIncludes("runtime input owns formal mother handoff bundle", typeSource, "export type DynamicsMotherHandoff");
  assertIncludes("stored context type recognizes schema version", storedContextBlock, 'schemaVersion?: "GUANYAO_ORIGIN_MOTHER_CONTEXT_V2"');
  assertIncludes("stored context type owns formal fourSymbol", typeSource, "fourSymbol?: string;");
  assertExcludes("formal stored context excludes geo symbol", storedContextBlock, "symbol?:");
  assertExcludes("formal stored context excludes top-level fourBeast", storedContextBlock, "fourBeast?:");
  assertIncludes("handoff adapter builds complete starbeast context", handoffSource, "starbeast: reveal.starbeast");
  assertIncludes("Launch delegates mother handoff construction", launchSource, "buildDynamicsMotherHandoff(reveal)");
  assertIncludes(
    "Launch persists adapter-owned origin context",
    launchSource,
    "writeOriginMotherContext(motherHandoff.originMotherContext)",
  );
  assertIncludes(
    "Launch carries mother bundle into Dynamics route",
    launchSource,
    "mother: dynamicsMotherHandoffRef.current",
  );
  assertIncludes(
    "Launch names persistence latch as an attempt",
    launchSource,
    "originMotherContextPersistenceAttempted",
  );
  assertExcludes(
    "Launch does not mislabel persistence attempt as success",
    launchSource,
    "originMotherContextPersisted",
  );
  assertExcludes("Launch does not own origin context storage key", launchSource, "guanyao:originMotherContext");
  assertExcludes("new handoff stops top-level fourBeast mirror", handoffSource, "fourBeast:");
  assertExcludes("fusion geo contract does not carry symbol", geoResultBlock, "symbol:");
  assertIncludes("fusion starbeast contract carries formal fourSymbol", fusionTypeSource, "fourSymbol: FourSymbol;");
  assertIncludes("gravity delegates stored fourSymbol resolution", gravitySource, "resolveStoredMotherFourSymbol(input)");
  assertIncludes(
    "Dynamics input adapter delegates origin context reading",
    inputAdapterSource,
    "readPersistedOriginMotherContext()",
  );
  assertIncludes("Gravity delegates input resolution", gravitySource, "resolveDynamicsInputContext({");
  assertIncludes(
    "Dynamics input adapter prioritizes routed mother profile",
    dynamicsInputBlock,
    "handoffState?.mother?.motherCodeProfile ??",
  );
  assertIncludes(
    "Dynamics input adapter prioritizes routed origin context",
    dynamicsInputBlock,
    "handoffState?.mother?.originMotherContext ??",
  );
  assertIncludes(
    "Dynamics input adapter prioritizes routed persona snapshot",
    dynamicsInputBlock,
    "handoffState?.mother?.personaOutputSnapshot ??",
  );
  assertEqual(
    "routed origin context precedes persistence fallback",
    dynamicsInputBlock.indexOf("handoffState?.mother?.originMotherContext ??") <
      dynamicsInputBlock.indexOf("readPersistedOriginMotherContext()"),
    true,
  );
  assertExcludes("Gravity does not own origin context storage key", gravitySource, "guanyao:originMotherContext");
  assertExcludes("gravity does not read legacy geo symbol directly", gravitySource, "originMotherContext?.geo?.symbol");
  assertIncludes("adapter isolates legacy context shape", adapterSource, "type LegacyStoredOriginMotherContext");
  assertIncludes("adapter retains legacy geo symbol fallback", adapterSource, "legacyContext?.geo?.symbol");
  assertIncludes("persistence adapter owns origin context storage key", persistenceSource, 'GUANYAO_ORIGIN_MOTHER_CONTEXT_STORAGE_KEY = "guanyao:originMotherContext"');
  assertIncludes("persistence adapter owns schema version", persistenceSource, '"GUANYAO_ORIGIN_MOTHER_CONTEXT_V2" as const');

  console.log("\n[MOTHER CONTEXT PERSISTENCE SEMANTICS] PASS");
} catch (error) {
  console.error("[MOTHER CONTEXT PERSISTENCE SEMANTICS] FAIL");
  console.error(error instanceof Error ? error.message : error);
  process.exit(1);
} finally {
  fs.rmSync(tempAdapterPath, { force: true });
  fs.rmSync(tempHandoffPath, { force: true });
  fs.rmSync(tempPersistencePath, { force: true });
}
