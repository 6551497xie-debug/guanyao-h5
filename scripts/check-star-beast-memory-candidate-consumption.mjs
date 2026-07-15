import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import process from "node:process";
import { build } from "esbuild";

const rootDir = process.cwd();
const typePath = path.join(rootDir, "src/types/starBeastMemoryCandidateConsumption.ts");
const typeIndexPath = path.join(rootDir, "src/types/index.ts");
const servicePath = path.join(rootDir, "src/services/starBeastMemoryCandidateConsumptionService.ts");
const eligibilityTypePath = path.join(rootDir, "src/types/starBeastMemoryEligibility.ts");
const eligibilityServicePath = path.join(rootDir, "src/services/starBeastMemoryEligibilityService.ts");
const endpointPath = path.join(rootDir, "src/services/lifeJourneyStageAuthorityDeclarationEndpoint.ts");
const foundationPath = path.join(rootDir, "src/types/originalSelf.ts");
const protocolPath = path.join(rootDir, "docs/GUANYAO_STAR_BEAST_MEMORY_CANDIDATE_CONSUMPTION_PROTOCOL.md");
const packagePath = path.join(rootDir, "package.json");
const tempConsumptionModulePath = path.join(os.tmpdir(), `guanyao-star-beast-memory-candidate-consumption-${process.pid}.mjs`);
const tempEligibilityModulePath = path.join(os.tmpdir(), `guanyao-star-beast-memory-candidate-consumption-eligibility-${process.pid}.mjs`);
const tempEndpointModulePath = path.join(os.tmpdir(), `guanyao-star-beast-memory-candidate-consumption-endpoint-${process.pid}.mjs`);

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
  ["candidate consumption type", typePath],
  ["type index", typeIndexPath],
  ["candidate consumption service", servicePath],
  ["memory eligibility type", eligibilityTypePath],
  ["memory eligibility service", eligibilityServicePath],
  ["authority declaration endpoint", endpointPath],
  ["foundation type", foundationPath],
  ["candidate consumption protocol", protocolPath],
  ["package manifest", packagePath],
]) {
  if (!fs.existsSync(filePath)) failures.push(`${name} file missing=${filePath}`);
  else console.log(`PASS | ${name} file exists`);
}

if (failures.length === 0) {
  const typeSource = fs.readFileSync(typePath, "utf8");
  const typeIndexSource = fs.readFileSync(typeIndexPath, "utf8");
  const serviceSource = fs.readFileSync(servicePath, "utf8");
  const eligibilityTypeSource = fs.readFileSync(eligibilityTypePath, "utf8");
  const eligibilityServiceSource = fs.readFileSync(eligibilityServicePath, "utf8");
  const foundationSource = fs.readFileSync(foundationPath, "utf8");
  const protocolSource = fs.readFileSync(protocolPath, "utf8");
  const packageJson = JSON.parse(fs.readFileSync(packagePath, "utf8"));

  [
    'from "./starBeastMemoryEligibility"',
    "export type StarBeastMemoryCandidateConsumptionInput",
    "memoryEligibilityResult: StarBeastMemoryEligibilityResult",
    "candidateReference: StarBeastMemoryCandidate | null",
    'StarBeastMemoryCandidate["sourceDeclarationReference"]',
    "export type StarBeastMemoryCandidateConsumption",
    'semanticRole: "STAR_BEAST_MEMORY_CANDIDATE_CONSUMPTION"',
    "candidateReference: StarBeastMemoryCandidate",
    "sourceEligibilityReference: MemoryEligibilityAvailable",
    'consumptionStatus: "AVAILABLE_FOR_FUTURE_MEMORY_ENGINE"',
    "reason: StarBeastMemoryCandidateConsumptionReason",
    "notMemory: true",
    "notMemoryRecord: true",
    "noMemoryWrite: true",
    "export type StarBeastMemoryCandidateConsumptionAvailable",
    'status: "AVAILABLE"',
    "export type StarBeastMemoryCandidateConsumptionNotApplicable",
    'status: "NOT_APPLICABLE"',
    'reason: "MEMORY_ELIGIBILITY_NOT_APPLICABLE"',
    "notError: true",
    "export type StarBeastMemoryCandidateConsumptionUnavailable",
    'status: "UNAVAILABLE"',
    '"MEMORY_ELIGIBILITY_UNAVAILABLE"',
    '"MEMORY_CANDIDATE_REFERENCE_REQUIRED"',
    '"MEMORY_CANDIDATE_REFERENCE_MISMATCH"',
    '"SOURCE_DECLARATION_REFERENCE_REQUIRED"',
    '"SOURCE_DECLARATION_REFERENCE_MISMATCH"',
    "export type StarBeastMemoryCandidateConsumptionResult",
  ].forEach((marker) => assertIncludes("candidate consumption type contract", typeSource, marker));

  [
    "CrystalState",
    "JourneyState",
    "OriginalSelfState",
    "StarBeastState",
    "StarBeastGrowth",
    "Presence",
    "Response",
    "Archive",
    "localStorage",
    "sessionStorage",
    'from "react"',
  ].forEach((marker) => assertExcludes("candidate consumption type stores references only", typeSource, marker));

  [
    "export function consumeStarBeastMemoryCandidate",
    "input: StarBeastMemoryCandidateConsumptionInput",
    "): StarBeastMemoryCandidateConsumptionResult",
    "const sourceEligibilityReference = input.memoryEligibilityResult",
    'if (sourceEligibilityReference.status === "NOT_APPLICABLE")',
    'if (sourceEligibilityReference.status === "UNAVAILABLE")',
    "if (input.candidateReference === null)",
    "input.candidateReference !== sourceEligibilityReference.candidate",
    "if (input.sourceDeclarationReference === null)",
    "input.candidateReference.sourceDeclarationReference",
    "const consumption: StarBeastMemoryCandidateConsumption = Object.freeze",
    "candidateReference: input.candidateReference",
    "sourceEligibilityReference,",
    "sourceDeclarationReference: input.sourceDeclarationReference",
    'consumptionStatus: "AVAILABLE_FOR_FUTURE_MEMORY_ENGINE"',
    'reason: "ELIGIBLE_CANDIDATE_READY_FOR_FUTURE_MEMORY_ENGINE"',
    "consumption,",
  ].forEach((marker) => assertIncludes("candidate consumption service contract", serviceSource, marker));

  [
    "resolveStarBeastMemoryEligibility(",
    "resolveLifeJourneyStageAuthorityDeclarationConsumption(",
    "resolveLifeJourneyStageAuthorityDeclaration(",
    "consumeLifeJourneyStageAuthorityDeclarationResult(",
    "LifeJourneyStageSourceInput",
    "resolveLifeJourneyStageSource(",
    "StarBeastState",
    "StarBeastGrowth",
    "Presence",
    "Response",
    "Gravity",
    "Dynamics",
    "CrystalState",
    "Archive",
    "localStorage",
    "sessionStorage",
    "fetch(",
    'from "react"',
    "/pages/",
    "/components/",
  ].forEach((marker) => assertExcludes("candidate consumption service stays consumption-only", serviceSource, marker));

  [
    "StarBeastMemoryCandidateConsumptionInput",
    "StarBeastMemoryCandidateConsumptionResult",
    "StarBeastMemoryCandidateConsumption",
    'from "./starBeastMemoryCandidateConsumption"',
  ].forEach((marker) => assertIncludes("type index exports candidate consumption", typeIndexSource, marker));

  assertIncludes("P37 owns memory candidate", eligibilityTypeSource, "export type StarBeastMemoryCandidate");
  assertExcludes("P37 eligibility service does not call P38", eligibilityServiceSource, "consumeStarBeastMemoryCandidate");
  assertExcludes("foundation does not consume candidate consumption", foundationSource, "StarBeastMemoryCandidateConsumption");

  const typeScriptSourcePaths = collectTypeScriptSourcePaths(path.join(rootDir, "src"));
  const consumptionCallSites = typeScriptSourcePaths
    .filter((filePath) => fs.readFileSync(filePath, "utf8").includes("consumeStarBeastMemoryCandidate("))
    .map((filePath) => path.relative(rootDir, filePath))
    .sort();
  assertEqual(
    "candidate consumption has no downstream consumer",
    consumptionCallSites.join(","),
    "src/services/starBeastMemoryCandidateConsumptionService.ts",
  );

  const eligibilityCallSites = typeScriptSourcePaths
    .filter((filePath) => fs.readFileSync(filePath, "utf8").includes("resolveStarBeastMemoryEligibility("))
    .map((filePath) => path.relative(rootDir, filePath))
    .sort();
  assertEqual(
    "candidate consumption does not call eligibility service",
    eligibilityCallSites.join(","),
    "src/services/starBeastMemoryEligibilityService.ts",
  );

  [
    "RC-STAR-BEAST-MEMORY-CANDIDATE-CONSUMPTION-P38",
    "STAR BEAST MEMORY CANDIDATE CONSUMPTION",
    "Candidate ≠ Memory",
    "未来 Memory Engine 可读取的稳定候选消费结果",
    "AVAILABLE_FOR_FUTURE_MEMORY_ENGINE",
    "MEMORY_ELIGIBILITY_NOT_APPLICABLE",
    "这不是错误",
    "UNAVAILABLE 表示 Candidate 信息不足或引用不一致",
    "P38 Service 不调用 P37 Eligibility Service",
    "P38 Candidate Consumption 当前没有下游业务消费者",
    "不创建 Memory",
    "不触发 Growth、Archive 或 Visual",
    "Memory Engine 正式创建时机保持冻结",
  ].forEach((marker) => assertIncludes("candidate consumption protocol", protocolSource, marker));

  assertIncludes(
    "candidate consumption gate command is registered",
    packageJson.scripts?.["check:star-beast-memory-candidate-consumption"] ?? "",
    "node scripts/check-star-beast-memory-candidate-consumption.mjs",
  );
  assertIncludes(
    "candidate consumption gate participates in release",
    packageJson.scripts?.["check:release"] ?? "",
    "npm run check:star-beast-memory-candidate-consumption",
  );

  await Promise.all([
    build({ entryPoints: [servicePath], outfile: tempConsumptionModulePath, bundle: true, platform: "node", format: "esm", target: "node20", logLevel: "silent" }),
    build({ entryPoints: [eligibilityServicePath], outfile: tempEligibilityModulePath, bundle: true, platform: "node", format: "esm", target: "node20", logLevel: "silent" }),
    build({ entryPoints: [endpointPath], outfile: tempEndpointModulePath, bundle: true, platform: "node", format: "esm", target: "node20", logLevel: "silent" }),
  ]);

  const { consumeStarBeastMemoryCandidate } = await import(`file://${tempConsumptionModulePath}?t=${Date.now()}`);
  const { resolveStarBeastMemoryEligibility } = await import(`file://${tempEligibilityModulePath}?t=${Date.now()}`);
  const { resolveLifeJourneyStageAuthorityDeclarationConsumption } = await import(`file://${tempEndpointModulePath}?t=${Date.now()}`);

  const trigger = Object.freeze({ trigger: "LIFE_DIRECTION_CHOICE_COMPLETED", semanticStage: "CHOICE", semanticRole: "LIFE_JOURNEY_STAGE_TRIGGER_EVIDENCE", explicit: true, requiresAuthorityDeclaration: true, noTransitionDecision: true, noAutomaticProgression: true });
  const evidenceCandidate = Object.freeze({
    evidenceSource: Object.freeze({ boundary: "formal_life_journey_evidence_provider", sourceReference: "formal-source:memory-candidate-consumption" }),
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
  const acceptedReadinessInput = Object.freeze({ candidate: evidenceCandidate, reviewer: authority, decision: "ACCEPT" });
  const commandInput = Object.freeze({ readinessInput: acceptedReadinessInput, subject: "life_subject", decision: "DECLARE" });
  const declarationAvailable = resolveLifeJourneyStageAuthorityDeclarationConsumption(Object.freeze({ commandInput, authority }));
  const crystalReference = Object.freeze({ referenceType: "CRYSTAL", referenceId: "crystal:memory-candidate" });
  const journeyReference = Object.freeze({ referenceType: "JOURNEY", referenceId: "journey:choice" });
  const lifeSubjectReference = Object.freeze({ referenceType: "LIFE_SUBJECT", referenceId: "life-subject:self" });
  const eligibilityAvailable = resolveStarBeastMemoryEligibility(Object.freeze({ authorityDeclarationConsumptionResult: declarationAvailable, crystalReference, journeyReference, lifeSubjectReference }));
  const availableInput = Object.freeze({
    memoryEligibilityResult: eligibilityAvailable,
    candidateReference: eligibilityAvailable.candidate,
    sourceDeclarationReference: eligibilityAvailable.candidate.sourceDeclarationReference,
  });
  const availableSnapshot = JSON.stringify(availableInput);
  const available = consumeStarBeastMemoryCandidate(availableInput);
  assertEqual("available eligibility creates candidate consumption", available.status, "AVAILABLE");
  assertEqual("consumption is future-engine available", available.consumption.consumptionStatus, "AVAILABLE_FOR_FUTURE_MEMORY_ENGINE");
  assertEqual("consumption preserves candidate reference", available.consumption.candidateReference === eligibilityAvailable.candidate, true);
  assertEqual("consumption preserves eligibility reference", available.consumption.sourceEligibilityReference === eligibilityAvailable, true);
  assertEqual("consumption preserves declaration reference", available.consumption.sourceDeclarationReference === eligibilityAvailable.candidate.sourceDeclarationReference, true);
  assertEqual("candidate consumption is not memory", available.consumption.notMemory, true);
  assertEqual("candidate consumption is not memory record", available.consumption.notMemoryRecord, true);
  assertEqual("candidate consumption cannot write memory", available.consumption.noMemoryWrite, true);
  assertEqual("candidate consumption object is frozen", Object.isFrozen(available.consumption), true);
  assertEqual("available result is frozen", Object.isFrozen(available), true);
  assertEqual("service does not mutate available input", JSON.stringify(availableInput), availableSnapshot);

  const rejectedReadinessInput = Object.freeze({ candidate: evidenceCandidate, reviewer: authority, decision: "REJECT", rejectionReason: "AUTHORITY_CONTEXT_INSUFFICIENT" });
  const rejectedCommandInput = Object.freeze({ readinessInput: rejectedReadinessInput, subject: "life_subject", decision: "DECLARE" });
  const declarationNotApplicable = resolveLifeJourneyStageAuthorityDeclarationConsumption(Object.freeze({ commandInput: rejectedCommandInput, authority }));
  const eligibilityNotApplicable = resolveStarBeastMemoryEligibility(Object.freeze({ authorityDeclarationConsumptionResult: declarationNotApplicable, crystalReference, journeyReference, lifeSubjectReference }));
  const notApplicable = consumeStarBeastMemoryCandidate(Object.freeze({ memoryEligibilityResult: eligibilityNotApplicable, candidateReference: null, sourceDeclarationReference: null }));
  assertEqual("not applicable eligibility stays not applicable", notApplicable.status, "NOT_APPLICABLE");
  assertEqual("not applicable is not error", notApplicable.notError, true);
  assertEqual("not applicable creates no consumption", "consumption" in notApplicable, false);
  assertEqual("not applicable preserves eligibility reference", notApplicable.sourceEligibilityReference === eligibilityNotApplicable, true);

  const declarationUnavailable = resolveLifeJourneyStageAuthorityDeclarationConsumption(Object.freeze({ commandInput, authority: null }));
  const eligibilityUnavailable = resolveStarBeastMemoryEligibility(Object.freeze({ authorityDeclarationConsumptionResult: declarationUnavailable, crystalReference, journeyReference, lifeSubjectReference }));
  const unavailable = consumeStarBeastMemoryCandidate(Object.freeze({ memoryEligibilityResult: eligibilityUnavailable, candidateReference: null, sourceDeclarationReference: null }));
  assertEqual("unavailable eligibility remains unavailable", unavailable.status, "UNAVAILABLE");
  assertEqual("unavailable eligibility reason", unavailable.reason, "MEMORY_ELIGIBILITY_UNAVAILABLE");
  assertEqual("unavailable creates no consumption", "consumption" in unavailable, false);

  const missingCandidate = consumeStarBeastMemoryCandidate(Object.freeze({ ...availableInput, candidateReference: null }));
  assertEqual("missing candidate is unavailable", missingCandidate.status, "UNAVAILABLE");
  assertEqual("missing candidate reason", missingCandidate.reason, "MEMORY_CANDIDATE_REFERENCE_REQUIRED");

  const copiedCandidate = Object.freeze({ ...eligibilityAvailable.candidate });
  const mismatchedCandidate = consumeStarBeastMemoryCandidate(Object.freeze({ ...availableInput, candidateReference: copiedCandidate }));
  assertEqual("mismatched candidate is unavailable", mismatchedCandidate.status, "UNAVAILABLE");
  assertEqual("mismatched candidate reason", mismatchedCandidate.reason, "MEMORY_CANDIDATE_REFERENCE_MISMATCH");

  const missingDeclaration = consumeStarBeastMemoryCandidate(Object.freeze({ ...availableInput, sourceDeclarationReference: null }));
  assertEqual("missing declaration is unavailable", missingDeclaration.status, "UNAVAILABLE");
  assertEqual("missing declaration reason", missingDeclaration.reason, "SOURCE_DECLARATION_REFERENCE_REQUIRED");

  const copiedDeclaration = Object.freeze({ ...eligibilityAvailable.candidate.sourceDeclarationReference });
  const mismatchedDeclaration = consumeStarBeastMemoryCandidate(Object.freeze({ ...availableInput, sourceDeclarationReference: copiedDeclaration }));
  assertEqual("mismatched declaration is unavailable", mismatchedDeclaration.status, "UNAVAILABLE");
  assertEqual("mismatched declaration reason", mismatchedDeclaration.reason, "SOURCE_DECLARATION_REFERENCE_MISMATCH");
}

fs.rmSync(tempConsumptionModulePath, { force: true });
fs.rmSync(tempEligibilityModulePath, { force: true });
fs.rmSync(tempEndpointModulePath, { force: true });

if (failures.length > 0) {
  console.error("\n[STAR BEAST MEMORY CANDIDATE CONSUMPTION] FAIL");
  failures.forEach((failure) => console.error(`- ${failure}`));
  process.exit(1);
}
console.log("\n[STAR BEAST MEMORY CANDIDATE CONSUMPTION] PASS");
