import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import process from "node:process";
import ts from "typescript";

const rootDir = process.cwd();
const resolverPaths = [
  "src/services/guanyaoHexagramAssetDraftCandidateResolver.ts",
  "src/services/guanyaoHexagramAssetMappingCandidateResolver.ts",
  "src/services/guanyaoForceTranslationCandidateResolver.ts",
  "src/services/guanyaoAssetShellCandidateResolver.ts",
  "src/services/guanyaoCardBlueprintCandidateResolver.ts",
  "src/services/guanyaoAssetRenderCandidateResolver.ts",
  "src/services/guanyaoFinalAssetCandidateResolver.ts",
  "src/services/guanyaoOfficialAssetGenerationCandidateResolver.ts",
  "src/services/guanyaoOfficialAssetObjectResolver.ts",
];
const tempModulePath = path.join(os.tmpdir(), `guanyao-asset-chain-e2e-${process.pid}.mjs`);
const forbiddenFields = [
  "hexagramCode",
  "hexagramName",
  "cardName",
  "finalAssetId",
  "officialAssetId",
  "price",
  "paywall",
  "unlock",
  "collection",
  "route",
  "legacyRoute",
];

function transpileResolver(relativePath) {
  const source = fs.readFileSync(path.join(rootDir, relativePath), "utf8");
  return ts.transpileModule(source, {
    compilerOptions: {
      module: ts.ModuleKind.ES2022,
      target: ts.ScriptTarget.ES2022,
      strict: true,
    },
  }).outputText;
}

function hasForbiddenKey(value, pathParts = []) {
  if (Array.isArray(value)) {
    return value
      .map((item, index) => hasForbiddenKey(item, [...pathParts, String(index)]))
      .find(Boolean);
  }

  if (value && typeof value === "object") {
    for (const [key, child] of Object.entries(value)) {
      const nextPath = [...pathParts, key];
      if (forbiddenFields.includes(key)) {
        return nextPath.join(".");
      }

      const nested = hasForbiddenKey(child, nextPath);
      if (nested) {
        return nested;
      }
    }
  }

  return "";
}

fs.writeFileSync(tempModulePath, resolverPaths.map(transpileResolver).join("\n"));

try {
  const {
    resolveHexagramAssetDraftCandidate,
    resolveHexagramAssetMappingCandidate,
    resolveForceTranslationCandidate,
    resolveAssetShellCandidate,
    resolveCardBlueprintCandidate,
    resolveAssetRenderCandidate,
    resolveFinalAssetCandidate,
    resolveOfficialAssetGenerationCandidate,
    resolveOfficialAssetObject,
  } = await import(`file://${tempModulePath}`);

  const fixtures = [
    {
      name: "body full asset chain",
      input: {
        status: "PENDING",
        motherCode: "乾",
        trigram: "乾为天",
        fourSymbol: "白虎",
        pressureSeedId: "seed-body-001",
        pressureSeedText: "你在这个行业十年了，抬头还是经理。",
        primaryDimension: "body",
        completedNodeCount: 6,
        completionState: "READY_TO_CRYSTALLIZE",
        candidateReason: "这颗现实扰动已经被你送回一轮光。它还不是最终卦码，但已经具备结晶条件。",
      },
    },
    {
      name: "motivation full asset chain",
      input: {
        status: "PENDING",
        motherCode: "兑",
        trigram: "兑为泽",
        fourSymbol: "白虎",
        pressureSeedId: "seed-motivation-001",
        pressureSeedText: "你不知道该往哪走。",
        primaryDimension: "motivation",
        completedNodeCount: 6,
        completionState: "READY_TO_CRYSTALLIZE",
        candidateReason: "这颗现实扰动已经被你送回一轮光。它还不是最终卦码，但已经具备结晶条件。",
      },
    },
  ];

  const rows = fixtures.map((fixture) => {
    const pending = fixture.input;
    const draft = resolveHexagramAssetDraftCandidate(pending);
    const mapping = resolveHexagramAssetMappingCandidate(draft);
    const forceTranslation = resolveForceTranslationCandidate(mapping);
    const assetShell = resolveAssetShellCandidate(forceTranslation);
    const cardBlueprint = resolveCardBlueprintCandidate(assetShell);
    const assetRender = resolveAssetRenderCandidate(cardBlueprint);
    const finalAsset = resolveFinalAssetCandidate(assetRender);
    const officialGeneration = resolveOfficialAssetGenerationCandidate(finalAsset);
    const officialAssetObject = resolveOfficialAssetObject(officialGeneration);

    const stages = {
      pending,
      draft,
      mapping,
      forceTranslation,
      assetShell,
      cardBlueprint,
      assetRender,
      finalAsset,
      officialGeneration,
      officialAssetObject,
    };
    const forbiddenPath = hasForbiddenKey(stages);
    const passed =
      officialAssetObject.status === "OFFICIAL_ASSET_OBJECT" &&
      officialAssetObject.readiness === "READY_FOR_ASSET_CARD_RENDER" &&
      officialAssetObject.assetCardRenderRequired === true &&
      officialAssetObject.forbiddenLegacyRoute === true &&
      officialAssetObject.commercialPayloadForbidden === true &&
      !forbiddenPath;

    return {
      name: fixture.name,
      primaryDimension: fixture.input.primaryDimension,
      finalStatus: officialAssetObject.status,
      finalReadiness: officialAssetObject.readiness,
      assetCardRenderRequired: officialAssetObject.assetCardRenderRequired,
      forbiddenLegacyRoute: officialAssetObject.forbiddenLegacyRoute,
      commercialPayloadForbidden: officialAssetObject.commercialPayloadForbidden,
      forbiddenPath,
      stages,
      passed,
    };
  });

  rows.forEach((row) => {
    const mark = row.passed ? "PASS" : "FAIL";
    console.log(
      `${mark} | ${row.name} | dimension=${row.primaryDimension} | final=${row.finalStatus}/${row.finalReadiness} | forbidden=${row.forbiddenPath || "none"}`,
    );
  });

  const failedRows = rows.filter((row) => !row.passed);
  if (failedRows.length > 0) {
    console.error(`\n[ASSET CHAIN E2E] FAIL: ${failedRows.length}/${rows.length} fixture(s) mismatched.`);
    console.error(JSON.stringify(failedRows, null, 2));
    process.exit(1);
  }

  console.log(`\n[ASSET CHAIN E2E] PASS: ${rows.length}/${rows.length} fixture(s) reached OFFICIAL_ASSET_OBJECT.`);
} finally {
  fs.rmSync(tempModulePath, { force: true });
}
