import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import process from "node:process";
import { build } from "esbuild";

const rootDir = process.cwd();
const typePath = path.join(rootDir, "src/types/starBeastMemoryEligibility.ts");
const typeIndexPath = path.join(rootDir, "src/types/index.ts");
const servicePath = path.join(rootDir, "src/services/starBeastMemoryEligibilityService.ts");
const endpointPath = path.join(rootDir, "src/services/lifeJourneyStageAuthorityDeclarationEndpoint.ts");
const foundationPath = path.join(rootDir, "src/types/originalSelf.ts");
const protocolPath = path.join(rootDir, "docs/GUANYAO_STAR_BEAST_MEMORY_ELIGIBILITY_PROTOCOL.md");
const packagePath = path.join(rootDir, "package.json");
const tempServiceModulePath = path.join(os.tmpdir(), `guanyao-star-beast-memory-eligibility-${process.pid}.mjs`);
const tempEndpointModulePath = path.join(os.tmpdir(), `guanyao-star-beast-memory-eligibility-endpoint-${process.pid}.mjs`);

const failures = [];
const assertIncludes = (name, source, expected) => {
  if (!source.includes(expected)) failures.push(`${name} missing=${expected}`);
  else console.log(`PASS | ${name} | includes=${expected}`);
};
const assertExcludes = (name, source, forbidden) => {
  if (source.includes(forbidden)) failures.push(`${name} forbidden=${forbidden}`);
  else console.log(`PASS | ${name} | forbidden=absent`);
};
const assertEqual = (name, actual, expected) => {
  if (actual !== expected) failures.push(`${name} expected=${expected} actual=${actual}`);
  else console.log(`PASS | ${name} | expected=${expected} | actual=${actual}`);
};
const collectTypeScriptSourcePaths = (directoryPath) =>
  fs.readdirSync(directoryPath, { withFileTypes: true }).flatMap((entry) => {
    const entryPath = path.join(directoryPath, entry.name);
    if (entry.isDirectory()) return collectTypeScriptSourcePaths(entryPath);
    return /\.tsx?$/.test(entry.name) ? [entryPath] : [];
  });

for (const [name, filePath] of [
  ["memory eligibility type", typePath],
  ["type index", typeIndexPath],
  ["memory eligibility service", servicePath],
  ["authority declaration endpoint", endpointPath],
  ["foundation type", foundationPath],
  ["memory eligibility protocol", protocolPath],
  ["package manifest", packagePath],
]) {
  if (!fs.existsSync(filePath)) failures.push(`${name} file missing=${filePath}`);
  else console.log(`PASS | ${name} file exists`);
}

if (failures.length === 0) {
  const typeSource = fs.readFileSync(typePath, "utf8");
  const typeIndexSource = fs.readFileSync(typeIndexPath, "utf8");
  const serviceSource = fs.readFileSync(servicePath, "utf8");
  const endpointSource = fs.readFileSync(endpointPath, "utf8");
  const foundationSource = fs.readFileSync(foundationPath, "utf8");
  const protocolSource = fs.readFileSync(protocolPath, "utf8");
  const packageJson = JSON.parse(fs.readFileSync(packagePath, "utf8"));

  [
    'import type { LifeJourneyStageAuthorityDeclarationConsumption } from "../services/lifeJourneyStageAuthorityDeclarationEndpoint"',
    "export type StarBeastMemoryReferenceKind",
    '"CRYSTAL"',
    '"JOURNEY"',
    '"LIFE_SUBJECT"',
    "export type StarBeastMemoryReference<",
    "referenceType: Kind",
    "referenceId: string",
    "export type StarBeastMemoryEligibilityInput",
    "authorityDeclarationConsumptionResult: LifeJourneyStageAuthorityDeclarationConsumption",
    "crystalReference: StarBeastMemoryCrystalReference | null",
    "journeyReference: StarBeastMemoryJourneyReference | null",
    "lifeSubjectReference: StarBeastMemoryLifeSubjectReference | null",
    "export type StarBeastMemoryCandidate",
    'semanticRole: "STAR_BEAST_MEMORY_CANDIDATE"',
    'sourceDeclarationReference: AuthorityDeclarationAvailable["declaration"]',
    "journeyReference: StarBeastMemoryJourneyReference",
    "crystalReference: StarBeastMemoryCrystalReference",
    "eligibilityReason: StarBeastMemoryEligibilityReason",
    "notMemory: true",
    "noMemoryWrite: true",
    "export type StarBeastMemoryEligibilityAvailable",
    'status: "AVAILABLE"',
    "export type StarBeastMemoryEligibilityNotApplicable",
    'status: "NOT_APPLICABLE"',
    'reason: "AUTHORITY_DECLARATION_NOT_APPLICABLE"',
    "notError: true",
    "export type StarBeastMemoryEligibilityUnavailable",
    'status: "UNAVAILABLE"',
    '"AUTHORITY_DECLARATION_UNAVAILABLE"',
    '"CRYSTAL_REFERENCE_REQUIRED"',
    '"JOURNEY_REFERENCE_REQUIRED"',
    '"LIFE_SUBJECT_REFERENCE_REQUIRED"',
    "export type StarBeastMemoryEligibilityResult",
  ].forEach((marker) => assertIncludes("memory eligibility type contract", typeSource, marker));

  [
    "CrystalState",
    "JourneyState",
    "OriginalSelfState",
    "StarBeastState",
    "localStorage",
    "sessionStorage",
    'from "react"',
  ].forEach((marker) => assertExcludes("memory eligibility type stores references only", typeSource, marker));

  [
    "export function resolveStarBeastMemoryEligibility",
    "input: StarBeastMemoryEligibilityInput",
    "): StarBeastMemoryEligibilityResult",
    'if (authorityDeclarationConsumptionResult.status === "NOT_APPLICABLE")',
    'if (authorityDeclarationConsumptionResult.status === "UNAVAILABLE")',
    "if (input.crystalReference === null)",
    "if (input.journeyReference === null)",
    "if (input.lifeSubjectReference === null)",
    "const candidate: StarBeastMemoryCandidate = Object.freeze",
    "sourceDeclarationReference:",
    "authorityDeclarationConsumptionResult.declaration",
    "journeyReference: input.journeyReference",
    "crystalReference: input.crystalReference",
    'eligibilityReason: "DECLARED_EXPERIENCE_WITH_COMPLETE_REFERENCES"',
    "candidate,",
  ].forEach((marker) => assertIncludes("memory eligibility service contract", serviceSource, marker));

  [
    "resolveLifeJourneyStageAuthorityDeclarationConsumption(",
    "resolveLifeJourneyStageAuthorityDeclaration(",
    "consumeLifeJourneyStageAuthorityDeclarationResult(",
    "resolveLifeJourneyStageExplicitDeclarationCommand(",
    "LifeJourneyStageSourceInput",
    "resolveLifeJourneyStageSource(",
    "StarBeastState",
    "Growth",
    "Gravity",
    "Dynamics",
    "CrystalState",
    "localStorage",
    "sessionStorage",
    "fetch(",
    'from "react"',
    "/pages/",
    "/components/",
  ].forEach((marker) => assertExcludes("memory eligibility service stays eligibility-only", serviceSource, marker));

  [
    "StarBeastMemoryEligibilityInput",
    "StarBeastMemoryEligibilityResult",
    "StarBeastMemoryCandidate",
    'from "./starBeastMemoryEligibility"',
  ].forEach((marker) => assertIncludes("type index exports memory eligibility", typeIndexSource, marker));

  assertIncludes(
    "P36 endpoint exposes consumption output contract",
    endpointSource,
    "export type { LifeJourneyStageAuthorityDeclarationConsumption }",
  );
  assertExcludes("foundation does not consume memory eligibility", foundationSource, "StarBeastMemoryEligibility");

  const serviceCallSites = collectTypeScriptSourcePaths(path.join(rootDir, "src"))
    .filter((filePath) => fs.readFileSync(filePath, "utf8").includes("resolveStarBeastMemoryEligibility("))
    .map((filePath) => path.relative(rootDir, filePath))
    .sort();
  assertEqual(
    "memory eligibility has no downstream consumer",
    serviceCallSites.join(","),
    "src/services/starBeastMemoryEligibilityService.ts",
  );

  const endpointCallSites = collectTypeScriptSourcePaths(path.join(rootDir, "src"))
    .filter((filePath) => fs.readFileSync(filePath, "utf8").includes("resolveLifeJourneyStageAuthorityDeclarationConsumption("))
    .map((filePath) => path.relative(rootDir, filePath))
    .sort();
  assertEqual(
    "memory eligibility does not call authority declaration endpoint",
    endpointCallSites.join(","),
    "src/services/lifeJourneyStageAuthorityDeclarationEndpoint.ts",
  );

  [
    "RC-STAR-BEAST-MEMORY-ELIGIBILITY-P37",
    "STAR BEAST MEMORY CANDIDATE ELIGIBILITY",
    "Experience ≠ Memory",
    "Authority Declaration Consumption",
    "Future Star Beast Memory Candidate",
    "Candidate 只是未来记忆候选，不是 Star Beast Memory",
    "AVAILABLE / DECLARED",
    "AUTHORITY_DECLARATION_NOT_APPLICABLE",
    "这不是错误",
    "UNAVAILABLE 表示信息不足、等待未来补充",
    "P37 Service 不调用 P36 Endpoint 函数",
    "P37 Eligibility Service 当前没有下游函数调用者",
    "P37 Eligibility Result 只作为 P38 Candidate Consumption Input 的类型来源",
    "不写入 Memory",
    "不执行 Growth",
  ].forEach((marker) => assertIncludes("memory eligibility protocol", protocolSource, marker));

  assertIncludes(
    "memory eligibility gate command is registered",
    packageJson.scripts?.["check:star-beast-memory-eligibility"] ?? "",
    "node scripts/check-star-beast-memory-eligibility.mjs",
  );
  assertIncludes(
    "memory eligibility gate participates in release",
    packageJson.scripts?.["check:release"] ?? "",
    "npm run check:star-beast-memory-eligibility",
  );

  await Promise.all([
    build({ entryPoints: [servicePath], outfile: tempServiceModulePath, bundle: true, platform: "node", format: "esm", target: "node20", logLevel: "silent" }),
    build({ entryPoints: [endpointPath], outfile: tempEndpointModulePath, bundle: true, platform: "node", format: "esm", target: "node20", logLevel: "silent" }),
  ]);

  const { resolveStarBeastMemoryEligibility } = await import(`file://${tempServiceModulePath}?t=${Date.now()}`);
  const { resolveLifeJourneyStageAuthorityDeclarationConsumption } = await import(`file://${tempEndpointModulePath}?t=${Date.now()}`);

  const trigger = Object.freeze({
    trigger: "LIFE_DIRECTION_CHOICE_COMPLETED",
    semanticStage: "CHOICE",
    semanticRole: "LIFE_JOURNEY_STAGE_TRIGGER_EVIDENCE",
    explicit: true,
    requiresAuthorityDeclaration: true,
    noTransitionDecision: true,
    noAutomaticProgression: true,
  });
  const candidate = Object.freeze({
    evidenceSource: Object.freeze({
      boundary: "formal_life_journey_evidence_provider",
      sourceReference: "formal-source:memory-eligibility",
    }),
    trigger,
    semanticRole: "LIFE_JOURNEY_STAGE_TRIGGER_EVIDENCE_CANDIDATE",
    immutable: true,
    traceable: true,
    requiresAuthorityReview: true,
    notStageDeclaration: true,
    notAuthorityDecision: true,
    noAutomaticProgression: true,
  });
  const authority = "original_self_life_journey_orchestrator";
  const acceptedReadinessInput = Object.freeze({ candidate, reviewer: authority, decision: "ACCEPT" });
  const commandInput = Object.freeze({ readinessInput: acceptedReadinessInput, subject: "life_subject", decision: "DECLARE" });
  const declarationAvailable = resolveLifeJourneyStageAuthorityDeclarationConsumption(Object.freeze({ commandInput, authority }));
  const crystalReference = Object.freeze({ referenceType: "CRYSTAL", referenceId: "crystal:current-imprint" });
  const journeyReference = Object.freeze({ referenceType: "JOURNEY", referenceId: "journey:choice" });
  const lifeSubjectReference = Object.freeze({ referenceType: "LIFE_SUBJECT", referenceId: "life-subject:self" });
  const availableInput = Object.freeze({ authorityDeclarationConsumptionResult: declarationAvailable, crystalReference, journeyReference, lifeSubjectReference });
  const availableSnapshot = JSON.stringify(availableInput);
  const available = resolveStarBeastMemoryEligibility(availableInput);
  assertEqual("declared experience is memory eligible", available.status, "AVAILABLE");
  assertEqual("candidate is not memory", available.candidate.notMemory, true);
  assertEqual("candidate cannot write memory", available.candidate.noMemoryWrite, true);
  assertEqual("candidate preserves declaration reference", available.candidate.sourceDeclarationReference === declarationAvailable.declaration, true);
  assertEqual("candidate preserves journey reference", available.candidate.journeyReference === journeyReference, true);
  assertEqual("candidate preserves crystal reference", available.candidate.crystalReference === crystalReference, true);
  assertEqual("eligibility preserves input", available.input === availableInput, true);
  assertEqual("candidate excludes copied life subject", "lifeSubjectReference" in available.candidate, false);
  assertEqual("candidate is frozen", Object.isFrozen(available.candidate), true);
  assertEqual("available result is frozen", Object.isFrozen(available), true);
  assertEqual("service does not mutate available input", JSON.stringify(availableInput), availableSnapshot);

  const rejectedReadinessInput = Object.freeze({ candidate, reviewer: authority, decision: "REJECT", rejectionReason: "AUTHORITY_CONTEXT_INSUFFICIENT" });
  const rejectedCommandInput = Object.freeze({ readinessInput: rejectedReadinessInput, subject: "life_subject", decision: "DECLARE" });
  const declarationNotApplicable = resolveLifeJourneyStageAuthorityDeclarationConsumption(Object.freeze({ commandInput: rejectedCommandInput, authority }));
  const notApplicableInput = Object.freeze({ authorityDeclarationConsumptionResult: declarationNotApplicable, crystalReference, journeyReference, lifeSubjectReference });
  const notApplicable = resolveStarBeastMemoryEligibility(notApplicableInput);
  assertEqual("rejected experience is not applicable", notApplicable.status, "NOT_APPLICABLE");
  assertEqual("not applicable is not error", notApplicable.notError, true);
  assertEqual("not applicable creates no candidate", "candidate" in notApplicable, false);
  assertEqual("not applicable preserves upstream result", notApplicable.authorityDeclarationConsumptionResult === declarationNotApplicable, true);

  const declarationUnavailable = resolveLifeJourneyStageAuthorityDeclarationConsumption(Object.freeze({ commandInput, authority: null }));
  const unavailableInput = Object.freeze({ authorityDeclarationConsumptionResult: declarationUnavailable, crystalReference, journeyReference, lifeSubjectReference });
  const unavailable = resolveStarBeastMemoryEligibility(unavailableInput);
  assertEqual("unavailable declaration remains unavailable", unavailable.status, "UNAVAILABLE");
  assertEqual("unavailable declaration reason", unavailable.reason, "AUTHORITY_DECLARATION_UNAVAILABLE");
  assertEqual("unavailable creates no candidate", "candidate" in unavailable, false);

  for (const [name, overrides, expectedReason] of [
    ["crystal", { crystalReference: null }, "CRYSTAL_REFERENCE_REQUIRED"],
    ["journey", { journeyReference: null }, "JOURNEY_REFERENCE_REQUIRED"],
    ["life subject", { lifeSubjectReference: null }, "LIFE_SUBJECT_REFERENCE_REQUIRED"],
  ]) {
    const incomplete = resolveStarBeastMemoryEligibility(Object.freeze({ ...availableInput, ...overrides }));
    assertEqual(`missing ${name} reference is unavailable`, incomplete.status, "UNAVAILABLE");
    assertEqual(`missing ${name} reason`, incomplete.reason, expectedReason);
    assertEqual(`missing ${name} creates no candidate`, "candidate" in incomplete, false);
  }
}

fs.rmSync(tempServiceModulePath, { force: true });
fs.rmSync(tempEndpointModulePath, { force: true });

if (failures.length > 0) {
  console.error("\n[STAR BEAST MEMORY ELIGIBILITY] FAIL");
  failures.forEach((failure) => console.error(`- ${failure}`));
  process.exit(1);
}
console.log("\n[STAR BEAST MEMORY ELIGIBILITY] PASS");
