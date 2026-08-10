import { createHash } from "node:crypto";
import { readFileSync, writeFileSync, mkdirSync } from "node:fs";
import { dirname, resolve } from "node:path";

const ROOT = resolve(import.meta.dirname, "..");
const LEGACY_REVISION = "GUANYAO_PRESSURE_SEED_MATRIX_CATALOG_2026_07_30_P0";
const TARGET_REVISION = "GUANYAO_PRESSURE_SEED_MATRIX_CATALOG_2026_08_10_FIVE_STAGE_450_P0";
const STAGES = ["YOUTH", "ESTABLISHING", "MID_LIFE", "RESTRUCTURING", "SIXTY_PLUS"];
const NEW_STAGES = ["YOUTH", "MID_LIFE", "RESTRUCTURING", "SIXTY_PLUS"];
const FIELDS = ["POWER", "INTEREST", "RELATION", "FAMILY", "SOCIAL", "EXISTENCE"];
const NATURES = new Set(["EVALUATION", "RESOURCE", "ATTACHMENT", "CONTROL", "OBLIGATION", "BELONGING", "IDENTITY", "SURVIVAL"]);
const STAGE_DIR = { YOUTH: "youth", MID_LIFE: "mid-life", RESTRUCTURING: "restructuring", SIXTY_PLUS: "sixty-plus" };
const STEM = { YOUTH: "YOUTH_CONTENT_PACK_B_90", MID_LIFE: "MID_LIFE_CONTENT_PACK_A_90", RESTRUCTURING: "RESTRUCTURING_CONTENT_PACK_C_90", SIXTY_PLUS: "SIXTY_PLUS_CONTENT_PACK_D_90" };
const BINDING_STEM = { YOUTH: "YOUTH", MID_LIFE: "MID_LIFE", RESTRUCTURING: "RESTRUCTURING", SIXTY_PLUS: "SIXTY_PLUS" };
const OUTPUT_TS = resolve(ROOT, "src/data/generated/guanyaoPressureSeedCatalog20260810FiveStage450.ts");
const OUTPUT_SIDECAR = resolve(ROOT, "docs/generated/xinmai-pressure-candidate/GUANYAO_PRESSURE_SEED_MATRIX_CATALOG_2026_08_10_FIVE_STAGE_450_P0.provenance.json");
const OUTPUT_REPORT = resolve(ROOT, "docs/generated/xinmai-pressure-candidate/GUANYAO_PRESSURE_SEED_MATRIX_CATALOG_2026_08_10_FIVE_STAGE_450_P0.build-report.json");

const read = (path) => readFileSync(resolve(ROOT, path), "utf8");
const json = (path) => JSON.parse(read(path));
const sha256 = (value) => createHash("sha256").update(value).digest("hex");
const fail = (message) => { throw new Error(`[xinmai-450-compiler] ${message}`); };
const assert = (condition, message) => { if (!condition) fail(message); };
const stableJson = (value) => `${JSON.stringify(value, null, 2)}\n`;

function verifyContentDigest(manifest) {
  const value = manifest.items.map((item) => [item.stable_id, item.surface_zh_cn, item.shell_zh_cn, item.content_hash].join("\u001f")).join("\n");
  assert(manifest.lock_digest === `sha256:${sha256(value)}`, `${manifest.life_stage} content digest mismatch`);
}

function verifyBindingDigest(manifest) {
  const value = manifest.items.map((item) => [
    item.authoringStableId,
    item.sourceContentHash,
    item.runtimeSlot,
    item.runtimeSeedId,
    item.pressureNature,
    item.bindingReason,
    item.authorLineage.bindingAuthor,
    item.authorLineage.bindingAuthoringDate,
    item.independentReviewerLineage.reviewer,
    item.independentReviewerLineage.reviewDate,
    item.independentReviewerLineage.reviewDecision,
    item.approvalLockLineage.approvedBy,
    item.approvalLockLineage.approvedAt,
    item.approvalLockLineage.lockedAt,
  ].join("\u001f")).join("\n");
  assert(manifest.digest === `sha256:${sha256(value)}`, `${manifest.lifeStage} binding digest mismatch`);
}

function verifyLockedSourceFiles(stage, contentManifest) {
  const directory = `docs/data/xinmai-pressure-candidate/${STAGE_DIR[stage]}`;
  const sourceCache = new Map();
  for (const item of contentManifest.items) {
    const path = `${directory}/${item.source_file}`;
    const source = sourceCache.get(path) ?? read(path);
    sourceCache.set(path, source);
    for (const expected of [item.stable_id, item.surface_zh_cn, item.shell_zh_cn, item.content_hash]) {
      assert(source.includes(expected), `${stage} locked source drift: ${item.stable_id}`);
    }
  }
}

function loadStage(stage) {
  const directory = `docs/data/xinmai-pressure-candidate/${STAGE_DIR[stage]}`;
  const content = json(`${directory}/${STEM[stage]}_CONTENT_LOCK_MANIFEST_P0.json`);
  const bindingName = `${BINDING_STEM[stage]}_RUNTIME_SEMANTIC_AND_DUAL_ID_BINDING`;
  const bindingPack = json(`${directory}/${bindingName}_PACK_P0.json`);
  const bindingManifest = json(`${directory}/${bindingName}_LOCK_MANIFEST_P0.json`);
  assert(content.pack_status === "PACK_ACCEPTED" && content.active_item_count === 90, `${stage} content is not locked`);
  assert(bindingPack.workflowStatus === "BINDING_ACCEPTED" && bindingPack.recordCount === 90, `${stage} binding pack is not locked`);
  assert(bindingManifest.bindingStatus === "BINDING_ACCEPTED" && bindingManifest.recordCount === 90, `${stage} binding manifest is not locked`);
  assert(content.production_catalog_eligible === false && bindingPack.productionEligible === false && bindingManifest.productionEligible === false, `${stage} lock eligibility drift`);
  verifyContentDigest(content);
  verifyBindingDigest(bindingManifest);
  verifyLockedSourceFiles(stage, content);

  const contentById = new Map(content.items.map((item) => [item.stable_id, item]));
  const bindingManifestById = new Map(bindingManifest.items.map((item) => [item.authoringStableId, item]));
  const records = bindingPack.records.map((record) => {
    const contentItem = contentById.get(record.authoringStableId);
    const bindingItem = bindingManifestById.get(record.authoringStableId);
    assert(contentItem && bindingItem, `${stage} binding/source missing: ${record.authoringStableId}`);
    assert(record.sourceContentHash === contentItem.content_hash, `${stage} content hash mismatch: ${record.authoringStableId}`);
    assert(record.sourceSurfaceZhCn === contentItem.surface_zh_cn && record.sourceShellZhCn === contentItem.shell_zh_cn, `${stage} source text mismatch: ${record.authoringStableId}`);
    assert(record.runtimeSeedId === bindingItem.runtimeSeedId && record.pressureNature === bindingItem.pressureNature && record.bindingReason === bindingItem.bindingReason, `${stage} binding manifest mismatch: ${record.authoringStableId}`);
    assert(record.workflowStatus === "BINDING_ACCEPTED" && record.reviewDecision === "ACCEPT", `${stage} unaccepted binding: ${record.authoringStableId}`);
    assert(record.independentBindingReviewer === "XINMAI_PRODUCT_CONTROL_TOWER" && record.approval?.approvedBy === "XINMAI_PRODUCT_CONTROL_TOWER" && record.lock?.lockedAt, `${stage} binding lineage missing: ${record.authoringStableId}`);
    assert(NATURES.has(record.pressureNature), `${stage} invalid nature: ${record.authoringStableId}`);
    return { record, contentItem, bindingItem };
  });
  return { content, bindingPack, bindingManifest, records };
}

function parseLegacy() {
  const source = read("src/data/guanyaoPressureSeedMatrix.ts");
  const matches = [...source.matchAll(/\{ id: "(ESTABLISHING_(POWER|INTEREST|RELATION|FAMILY|SOCIAL|EXISTENCE)_\d{2})", pressureNature: "([A-Z_]+)", surface: "([^"]*)", shell: "([^"]*)" \}/g)];
  assert(matches.length === 90, `legacy seed count ${matches.length} != 90`);
  return matches.map((match) => ({ id: match[1], stage: "ESTABLISHING", field: match[2], pressureNature: match[3], surface: match[4], shell: match[5] }));
}

function compile() {
  const legacy = parseLegacy();
  const loaded = Object.fromEntries(NEW_STAGES.map((stage) => [stage, loadStage(stage)]));
  const runtimeIds = new Set(legacy.map((item) => item.id));
  const target = [];
  const provenance = [];

  for (const stage of STAGES) {
    if (stage === "ESTABLISHING") {
      for (const item of legacy) {
        target.push(item);
        provenance.push({ runtimeSeedId: item.id, lifeStage: stage, pressureField: item.field, pressureNature: item.pressureNature, revision: LEGACY_REVISION, provenance: "LEGACY_PRODUCTION_BASELINE", historicalReviewClaim: "NONE" });
      }
      continue;
    }
    const stageRecords = loaded[stage].records;
    for (const field of FIELDS) {
      const records = stageRecords.filter(({ record }) => record.pressureField === field).sort((a, b) => Number(a.record.runtimeSlot) - Number(b.record.runtimeSlot));
      assert(records.length === 15, `${stage}/${field} coverage ${records.length} != 15`);
      records.forEach(({ record, contentItem, bindingItem }, index) => {
        const slot = String(index + 1).padStart(2, "0");
        assert(record.runtimeSlot === slot && record.runtimeSeedId === `${stage}_${field}_${slot}`, `${stage}/${field} slot drift at ${slot}`);
        assert(!runtimeIds.has(record.runtimeSeedId), `runtime ID collision: ${record.runtimeSeedId}`);
        runtimeIds.add(record.runtimeSeedId);
        target.push({ id: record.runtimeSeedId, stage, field, pressureNature: record.pressureNature, surface: record.sourceSurfaceZhCn, shell: record.sourceShellZhCn });
        provenance.push({
          runtimeSeedId: record.runtimeSeedId,
          authoringStableId: record.authoringStableId,
          sourceContentHash: record.sourceContentHash,
          lifeStage: stage,
          pressureField: field,
          coverageContext: record.coverageContext,
          pressureMechanic: record.pressureMechanic,
          pressureNature: record.pressureNature,
          bindingReason: record.bindingReason,
          revision: TARGET_REVISION,
          contentReviewLineage: contentItem.review_lineage,
          bindingReviewLineage: bindingItem.independentReviewerLineage,
          approvalLockLineage: bindingItem.approvalLockLineage,
        });
      });
    }
  }
  assert(target.length === 450 && runtimeIds.size === 450, "target coverage/uniqueness failed");
  const allowedShellDuplicate = "同一小时出现两项签到";
  const duplicateShells = [...new Set(target.map((item) => item.shell).filter((value, index, all) => all.indexOf(value) !== index))];
  assert(duplicateShells.length === 1 && duplicateShells[0] === allowedShellDuplicate, `unaccepted shell overlap: ${duplicateShells.join(",")}`);

  const nodes = STAGES.flatMap((stage) => FIELDS.map((field) => ({ ageGroup: stage, pressureField: field, status: "locked", seeds: target.filter((item) => item.stage === stage && item.field === field).map(({ id, pressureNature, surface, shell }) => ({ id, pressureNature, surface, shell })) })));
  const artifactPayload = { revision: TARGET_REVISION, nodes };
  const artifactDigest = sha256(JSON.stringify(artifactPayload));
  const generatedTs = `// Generated by scripts/compile-xinmai-pressure-candidate-catalog.mjs. Do not edit.\nimport type { PressureSeedMatrixNode, PressureSeedMatrixSeed } from "../../types/guanyaoPressureSeed";\n\nexport const GUANYAO_PRESSURE_SEED_TARGET_CATALOG_REVISION = ${JSON.stringify(TARGET_REVISION)} as const;\nexport const GUANYAO_PRESSURE_SEED_TARGET_CATALOG_DIGEST = ${JSON.stringify(`sha256:${artifactDigest}`)} as const;\nconst generatedNodes: PressureSeedMatrixNode[] = ${JSON.stringify(nodes, null, 2)};\nexport const GUANYAO_PRESSURE_SEED_TARGET_CATALOG_20260810: readonly PressureSeedMatrixNode[] = Object.freeze(\n  generatedNodes.map((node) =>\n    Object.freeze({\n      ...node,\n      seeds: Object.freeze(\n        node.seeds.map((seed) => Object.freeze({ ...seed })),\n      ) as unknown as PressureSeedMatrixSeed[],\n    }),\n  ),\n);\n`;
  const sidecar = { schemaVersion: "XINMAI_PRESSURE_CANDIDATE_CATALOG_PROVENANCE_V1", targetRevision: TARGET_REVISION, artifactDigest: `sha256:${artifactDigest}`, recordCount: provenance.length, records: provenance };
  const natureDistribution = Object.fromEntries([...NATURES].map((nature) => [nature, target.filter((item) => item.pressureNature === nature).length]));
  const report = {
    schemaVersion: "XINMAI_PRESSURE_CANDIDATE_CATALOG_BUILD_REPORT_V1",
    compiler: "scripts/compile-xinmai-pressure-candidate-catalog.mjs",
    legacyRevision: LEGACY_REVISION,
    targetRevision: TARGET_REVISION,
    artifactDigest: `sha256:${artifactDigest}`,
    counts: { total: 450, byStage: Object.fromEntries(STAGES.map((stage) => [stage, target.filter((item) => item.stage === stage).length])), byNature: natureDistribution },
    manifestDigests: Object.fromEntries(NEW_STAGES.flatMap((stage) => [[`${stage}:content`, loaded[stage].content.lock_digest], [`${stage}:binding`, loaded[stage].bindingManifest.digest]])),
    acceptedShellOverlapException: { shell: allowedShellDuplicate, count: target.filter((item) => item.shell === allowedShellDuplicate).length },
    runtimeMetadataExcluded: ["authoringStableId", "contentHash", "reviewer", "approval", "lock", "AI_ASSISTED", "Draft", "Fixture", "Acceptance"],
  };
  return { generatedTs, sidecar: stableJson(sidecar), report: stableJson(report) };
}

const outputs = compile();
const mode = process.argv.includes("--check") ? "check" : "write";
for (const [path, value] of [[OUTPUT_TS, outputs.generatedTs], [OUTPUT_SIDECAR, outputs.sidecar], [OUTPUT_REPORT, outputs.report]]) {
  if (mode === "check") assert(readFileSync(path, "utf8") === value, `generated drift: ${path.slice(ROOT.length + 1)}`);
  else { mkdirSync(dirname(path), { recursive: true }); writeFileSync(path, value); }
}
console.log(`[xinmai-450-compiler] ${mode.toUpperCase()} PASS: 450 candidates; artifact ${JSON.parse(outputs.report).artifactDigest}`);
