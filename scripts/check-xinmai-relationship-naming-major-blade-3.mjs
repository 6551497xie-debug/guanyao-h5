import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import process from "node:process";
import { build } from "esbuild";

const rootDir = process.cwd();
const servicePath = path.join(rootDir, "src/services/sessionService.ts");
const genesisPagePath = path.join(
  rootDir,
  "src/pages/GenesisProductionExperiencePage.tsx",
);
const launchPagePath = path.join(rootDir, "src/pages/LaunchLab.tsx");
const tempModulePath = path.join(
  os.tmpdir(),
  `xinmai-relationship-naming-${process.pid}.mjs`,
);

const storage = new Map();
let storageWriteBlocked = false;
globalThis.window = {
  localStorage: {
    getItem: (key) => storage.get(key) ?? null,
    setItem: (key, value) => {
      if (storageWriteBlocked) throw new Error("storage unavailable");
      storage.set(key, value);
    },
    removeItem: (key) => storage.delete(key),
  },
};

const assertEqual = (name, actual, expected) => {
  if (actual !== expected) {
    throw new Error(`${name} expected=${expected} actual=${actual}`);
  }
  console.log(`PASS | ${name}`);
};

const assertIncludes = (name, source, expected) => {
  if (!source.includes(expected)) {
    throw new Error(`${name} missing=${expected}`);
  }
  console.log(`PASS | ${name}`);
};

const listSourceFiles = (directory) =>
  fs.readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    const entryPath = path.join(directory, entry.name);
    if (entry.isDirectory()) return listSourceFiles(entryPath);
    return /\.(?:ts|tsx)$/.test(entry.name) ? [entryPath] : [];
  });

const sourceReferenceId = "life-source-user-a";
const starBeastIdentityReferenceId = "starbeast-identity-user-a";
const mansionCoordinateReferenceId = "mansion-coordinate-user-a";
const visualContinuity = {
  sourceReferenceId,
  consumerSourceResult: {
    status: "READY",
    consumerSource: {
      sourceExperienceMode: "REAL_USER_EXPERIENCE",
      sourceProvenance: "REAL_USER_SESSION",
      sourceReferenceId,
      projectionBundle: {
        personalRevealProjection: { identityReferenceId: starBeastIdentityReferenceId },
        twentyEightMansionCoordinateProjection: {
          birthMansion: { coordinateReferenceId: mansionCoordinateReferenceId },
        },
      },
    },
  },
  visualCalibrationBundle: {},
  fourSymbolDirectionFieldVisualCalibration: {},
  lifeArchetypeForceCondensationVisualCalibration: {},
};
const recognizedIdentitySession = {
  launchLifeSourceSession: {
    schemaVersion: "GUANYAO_LAUNCH_LIFE_SOURCE_SESSION_V1",
    source: "launch_life_source_session",
    sourceKind: "REAL_ENGINE_RESULT",
    sourceReferenceId,
    birthCoordinate: {},
    starbeastDerivationResult: {},
    motherCodeLandingResult: {},
    originMotherResult: {},
  },
  genesisVisualContinuity: visualContinuity,
  genesisPresenceVisualRealization: {
    visualPresenceState: "RECOGNIZED",
    sourceProvenance: "REAL_USER_SESSION",
    sourceReferenceId,
  },
};

const writeSession = (session) =>
  storage.set(
    "guanyao_h5_session",
    JSON.stringify({
      schemaVersion: "GUANYAO_SESSION_V2",
      session,
    }),
  );

try {
  await build({
    entryPoints: [servicePath],
    outfile: tempModulePath,
    bundle: true,
    platform: "node",
    format: "esm",
    target: "node20",
    logLevel: "silent",
  });

  const service = await import(`file://${tempModulePath}?t=${Date.now()}`);
  writeSession(recognizedIdentitySession);

  assertEqual(
    "recognized identity starts unnamed without backfill",
    service.readStarBeastRelationshipNamingAsset().status,
    "UNNAMED",
  );

  const created = service.createStarBeastRelationshipNamingAsset({
    relationshipName: " 安泉 ",
  });
  assertEqual("create relationship name succeeds", created.status, "READY");
  assertEqual("create is persisted", created.persistence, "PERSISTED");
  assertEqual("relationship name is normalized", created.asset.relationshipName, "安泉");
  assertEqual(
    "source reference is bound",
    created.asset.sourceReferenceId,
    sourceReferenceId,
  );
  assertEqual(
    "starbeast identity reference is bound",
    created.asset.starBeastIdentityReferenceId,
    starBeastIdentityReferenceId,
  );
  assertEqual(
    "mansion coordinate reference is bound",
    created.asset.mansionCoordinateReferenceId,
    mansionCoordinateReferenceId,
  );
  assertEqual(
    "returning read restores same relationship name",
    service.readStarBeastRelationshipNamingAsset().asset.relationshipName,
    "安泉",
  );
  assertEqual(
    "create does not overwrite an existing relationship",
    service.createStarBeastRelationshipNamingAsset({
      relationshipName: "别名",
    }).reason,
    "RELATIONSHIP_NAME_ALREADY_EXISTS",
  );

  const renamed = service.renameStarBeastRelationshipNamingAsset({
    relationshipName: "静泉",
  });
  assertEqual("rename succeeds", renamed.status, "READY");
  assertEqual("returning read restores renamed value", service.readStarBeastRelationshipNamingAsset().asset.relationshipName, "静泉");
  assertEqual("rename preserves creation time", renamed.asset.createdAt, created.asset.createdAt);
  assertEqual("rename advances revision", renamed.asset.revision, created.asset.revision + 1);

  const cleared = service.clearStarBeastRelationshipNamingAsset();
  assertEqual("clear succeeds", cleared.status, "READY");
  assertEqual("clear leaves an explicit unnamed tombstone", service.readStarBeastRelationshipNamingAsset().status, "CLEARED");
  assertEqual("cleared asset carries no name", cleared.asset.relationshipName, null);

  const recreated = service.createStarBeastRelationshipNamingAsset({
    relationshipName: "新泉",
  });
  assertEqual("cleared relationship can be named later", recreated.status, "READY");
  assertEqual("later naming keeps asset lineage", recreated.asset.createdAt, created.asset.createdAt);
  assertEqual(
    "delete succeeds",
    service.deleteStarBeastRelationshipNamingAsset().outcome,
    "DELETED",
  );
  assertEqual(
    "deleted relationship returns as unnamed",
    service.readStarBeastRelationshipNamingAsset().status,
    "UNNAMED",
  );

  const mismatchCases = [
    ["sourceReferenceId", "life-source-user-b"],
    ["starBeastIdentityReferenceId", "starbeast-identity-user-b"],
    ["mansionCoordinateReferenceId", "mansion-coordinate-user-b"],
  ];
  for (const [field, mismatchValue] of mismatchCases) {
    writeSession(recognizedIdentitySession);
    const relationship = service.createStarBeastRelationshipNamingAsset({
      relationshipName: "安泉",
    });
    const envelope = JSON.parse(storage.get("guanyao_h5_session"));
    envelope.session.starBeastRelationshipNamingAsset = {
      ...relationship.asset,
      [field]: mismatchValue,
    };
    storage.set("guanyao_h5_session", JSON.stringify(envelope));
    const mismatchRead = service.readStarBeastRelationshipNamingAsset();
    assertEqual(`${field} mismatch is rejected`, mismatchRead.status, "UNAVAILABLE");
    assertEqual(`${field} mismatch degrades without consumption`, mismatchRead.reason, "IDENTITY_REFERENCE_MISMATCH");
    assertEqual(
      `${field} mismatch cannot be overwritten`,
      service.createStarBeastRelationshipNamingAsset({
        relationshipName: "他者之名",
      }).reason,
      "IDENTITY_REFERENCE_MISMATCH",
    );
  }

  writeSession(recognizedIdentitySession);
  storageWriteBlocked = true;
  const currentCycleOnly = service.createStarBeastRelationshipNamingAsset({
    relationshipName: "此刻",
    visualContinuity,
  });
  assertEqual(
    "storage failure keeps current-cycle naming nonblocking",
    currentCycleOnly.status,
    "READY",
  );
  assertEqual(
    "storage failure is reported without false persistence",
    currentCycleOnly.persistence,
    "CURRENT_CYCLE_ONLY",
  );
  assertEqual(
    "storage failure does not restore unpersisted raw text",
    service.readStarBeastRelationshipNamingAsset().status,
    "UNNAMED",
  );
  storageWriteBlocked = false;

  writeSession(recognizedIdentitySession);
  service.createStarBeastRelationshipNamingAsset({
    relationshipName: "待删",
  });
  storageWriteBlocked = true;
  assertEqual(
    "failed deletion is never falsely confirmed",
    service.deleteStarBeastRelationshipNamingAsset().outcome,
    "DELETE_UNCONFIRMED",
  );
  storageWriteBlocked = false;
  const relationshipAfterUnconfirmedDelete =
    service.readStarBeastRelationshipNamingAsset();
  assertEqual(
    "failed deletion keeps last confirmed relationship available",
    relationshipAfterUnconfirmedDelete.status,
    "AVAILABLE",
  );
  assertEqual(
    "failed deletion keeps last confirmed relationship name",
    relationshipAfterUnconfirmedDelete.asset.relationshipName,
    "待删",
  );

  const genesisSource = fs.readFileSync(genesisPagePath, "utf8");
  const launchSource = fs.readFileSync(launchPagePath, "utf8");
  assertIncludes(
    "naming opens only after whisper response settles",
    genesisSource,
    'lifeWhisperResponsePhase === "SETTLED"',
  );
  assertIncludes(
    "first encounter supports voluntary skip",
    genesisSource,
    'data-interaction="RELATIONSHIP_NAMING_SKIPPED"',
  );
  assertIncludes(
    "returning life restores relationship asset",
    launchSource,
    "readStarBeastRelationshipNamingAsset()",
  );
  assertIncludes(
    "returning life exposes user-driven rename",
    launchSource,
    "renameStarBeastRelationshipNamingAsset",
  );
  assertIncludes(
    "returning life exposes user-driven clear",
    launchSource,
    "clearStarBeastRelationshipNamingAsset",
  );
  assertIncludes(
    "returning life exposes user-driven delete",
    launchSource,
    "deleteStarBeastRelationshipNamingAsset",
  );

  const allowedConsumers = new Set([
    path.join(rootDir, "src/pages/GenesisProductionExperiencePage.tsx"),
    path.join(rootDir, "src/pages/LaunchLab.tsx"),
    path.join(rootDir, "src/services/sessionService.ts"),
    path.join(
      rootDir,
      "src/services/xinmaiRelationshipNamingPresentationState.ts",
    ),
    path.join(rootDir, "src/types/starBeastRelationshipNamingAsset.ts"),
  ]);
  const namingTokens =
    /StarBeastRelationshipNaming|starBeastRelationshipNamingAsset|relationshipName/u;
  const unauthorizedConsumers = listSourceFiles(
    path.join(rootDir, "src"),
  ).filter(
    (filePath) =>
      !allowedConsumers.has(filePath) &&
      namingTokens.test(fs.readFileSync(filePath, "utf8")),
  );
  assertEqual(
    "renderer pressure AI six-dimension gravity choice crystal and archive do not consume relationship name",
    unauthorizedConsumers.join(","),
    "",
  );
  assertEqual(
    "relationship name is not exposed as a renderer DOM input",
    /data-[^=]*relationship-name-value/u.test(
      `${genesisSource}\n${launchSource}`,
    ),
    false,
  );

  console.log("\n[XINMAI RELATIONSHIP NAMING MAJOR BLADE 3] PASS");
} catch (error) {
  console.error("[XINMAI RELATIONSHIP NAMING MAJOR BLADE 3] FAIL");
  console.error(error instanceof Error ? error.stack ?? error.message : error);
  process.exit(1);
} finally {
  fs.rmSync(tempModulePath, { force: true });
}
