import fs from "node:fs";
import path from "node:path";
import process from "node:process";

const rootDir = process.cwd();

const files = Object.freeze({
  reviewType: "src/types/lifeJourneyStageEvidenceReview.ts",
  resolver: "src/services/lifeJourneyStageEvidenceReviewResolver.ts",
  consumption: "src/services/lifeJourneyStageEvidenceReviewResultConsumption.ts",
  endpoint: "src/services/lifeJourneyStageEvidenceReviewEndpoint.ts",
  readiness: "src/services/lifeJourneyStageEvidenceReviewReadiness.ts",
  authorityEvidenceInputType: "src/types/lifeJourneyStageAuthorityEvidenceInput.ts",
  authorityEvidenceInputAdapter: "src/services/lifeJourneyStageAuthorityEvidenceInputAdapter.ts",
  explicitAuthorityReadiness: "src/services/lifeJourneyStageExplicitAuthorityReadiness.ts",
  explicitDeclarationCommand: "src/services/lifeJourneyStageExplicitDeclarationCommand.ts",
  authorityType: "src/types/lifeJourneyStageAuthority.ts",
  stageSource: "src/services/lifeJourneyStageSource.ts",
  foundationType: "src/types/originalSelf.ts",
  lifeSchemaType: "src/types/originalSelfLifeSchema.ts",
  protocol: "docs/GUANYAO_LIFE_JOURNEY_STAGE_EVIDENCE_REVIEW_CHAIN_FREEZE_PROTOCOL.md",
  packageManifest: "package.json",
});

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

const absolutePathByName = Object.fromEntries(
  Object.entries(files).map(([name, relativePath]) => [name, path.join(rootDir, relativePath)]),
);

for (const [name, filePath] of Object.entries(absolutePathByName)) {
  if (!fs.existsSync(filePath)) failures.push(`${name} file missing=${filePath}`);
  else console.log(`PASS | ${name} file exists`);
}

if (failures.length === 0) {
  const sources = Object.fromEntries(
    Object.entries(absolutePathByName).map(([name, filePath]) => [name, fs.readFileSync(filePath, "utf8")]),
  );
  const packageJson = JSON.parse(sources.packageManifest);
  const typeScriptSourcePaths = collectTypeScriptSourcePaths(path.join(rootDir, "src"));

  const assertCallSites = (name, symbol, expectedRelativePaths) => {
    const actual = typeScriptSourcePaths
      .filter((filePath) => fs.readFileSync(filePath, "utf8").includes(symbol))
      .map((filePath) => path.relative(rootDir, filePath))
      .sort();
    assertEqual(name, actual.join(","), [...expectedRelativePaths].sort().join(","));
  };

  assertCallSites(
    "review resolver is owned by endpoint",
    "resolveLifeJourneyStageEvidenceReview(",
    [files.resolver, files.endpoint],
  );
  assertCallSites(
    "review result consumption is owned by endpoint",
    "consumeLifeJourneyStageEvidenceReviewResult(",
    [files.consumption, files.endpoint],
  );
  assertCallSites(
    "review endpoint is owned by readiness",
    "resolveLifeJourneyStageEvidenceReviewConsumption(",
    [files.endpoint, files.readiness],
  );
  assertCallSites(
    "review readiness is only consumed by authority evidence input adapter",
    "resolveLifeJourneyStageEvidenceReviewReadiness(",
    [files.readiness, files.authorityEvidenceInputAdapter],
  );
  assertCallSites(
    "authority evidence input adapter is only consumed by explicit authority readiness",
    "adaptLifeJourneyStageAuthorityEvidenceInput(",
    [files.authorityEvidenceInputAdapter, files.explicitAuthorityReadiness],
  );
  assertCallSites(
    "explicit authority readiness is only consumed by declaration command",
    "resolveLifeJourneyStageExplicitAuthorityReadiness(",
    [files.explicitAuthorityReadiness, files.explicitDeclarationCommand],
  );

  [
    'status: "ACCEPTED"',
    "acceptedAsEvidence: true",
    'status: "REJECTED"',
    "acceptedAsEvidence: false",
    "reason: LifeJourneyStageEvidenceRejectionReason",
    "notStageDeclaration: true",
    "noAutomaticProgression: true",
  ].forEach((marker) => assertIncludes("review contract remains frozen", sources.reviewType, marker));

  [
    "LifeJourneyStageEvidenceReviewResolverInput",
    'decision: LifeJourneyStageEvidenceReviewDecision | null',
    'status: "READY"',
    'status: "NOT_READY"',
    'status: "ACCEPTED"',
    'status: "REJECTED"',
    "reason: input.rejectionReason",
  ].forEach((marker) => assertIncludes("explicit review resolver remains frozen", sources.resolver, marker));

  [
    'status: "AVAILABLE"',
    'status: "UNAVAILABLE"',
    "result: LifeJourneyStageEvidenceReviewResolverReady",
    "result: LifeJourneyStageEvidenceReviewResolverNotReady",
    "disposition: result.review.status",
    "reason: result.reason",
  ].forEach((marker) => assertIncludes("review consumption remains frozen", sources.consumption, marker));

  [
    "LifeJourneyStageEvidenceReviewEndpointInput",
    "consumeLifeJourneyStageEvidenceReviewResult(",
    "resolveLifeJourneyStageEvidenceReview(input)",
  ].forEach((marker) => assertIncludes("review endpoint remains composition-only", sources.endpoint, marker));
  ["if (", "switch ("].forEach((marker) => assertExcludes("review endpoint has no decision branch", sources.endpoint, marker));

  [
    'readiness: "READY_FOR_LIFE_JOURNEY_STAGE_EVIDENCE_REVIEW_OUTCOME"',
    'readiness: "NOT_READY"',
    'if (consumption.status !== "AVAILABLE")',
    "reason: consumption.reason",
    "disposition: consumption.disposition",
  ].forEach((marker) => assertIncludes("review outcome readiness remains frozen", sources.readiness, marker));

  [
    "LifeJourneyStageAuthorityEvidenceInput<LifeJourneyStageEvidenceAccepted>",
    'status: "AVAILABLE"',
    'status: "NOT_APPLICABLE"',
    'reason: "REVIEW_REJECTED"',
    'status: "UNAVAILABLE"',
    "const readiness = resolveLifeJourneyStageEvidenceReviewReadiness(input)",
    "authority: review.reviewer",
    "proposedStage: review.candidate.trigger.semanticStage",
    "notAuthorityDeclaration: true",
    "notStageSourceInput: true",
  ].forEach((marker) =>
    assertIncludes(
      "authority evidence input adapter is the authorized frozen-chain exit",
      sources.authorityEvidenceInputAdapter,
      marker,
    ),
  );

  [
    'export type LifeJourneyStageDeclarationSubject = "life_subject"',
    'export type LifeJourneyStageExplicitDeclarationDecision = "DECLARE"',
    "const readiness = resolveLifeJourneyStageExplicitAuthorityReadiness(input.readinessInput)",
    'if (input.subject !== "life_subject")',
    'if (input.decision !== "DECLARE")',
    "targetStage: readiness.authorityEvidenceInput.proposedStage",
    "authorityEvidenceInput: readiness.authorityEvidenceInput",
    "evidenceReview: readiness.authorityEvidenceInput.review",
    "notAuthorityDeclaration: true",
    "notStageSourceInput: true",
  ].forEach((marker) =>
    assertIncludes(
      "explicit declaration command is the authorized readiness consumer",
      sources.explicitDeclarationCommand,
      marker,
    ),
  );

  [
    'readiness: "READY_FOR_EXPLICIT_AUTHORITY_DECLARATION"',
    'readiness: "NOT_APPLICABLE_FOR_AUTHORITY_DECLARATION"',
    'readiness: "NOT_READY"',
    "const adapterResult = adaptLifeJourneyStageAuthorityEvidenceInput(input)",
    "authorityEvidenceInput: adapterResult.authorityEvidenceInput",
    "notAuthorityDeclaration: true",
    "notStageSourceInput: true",
  ].forEach((marker) =>
    assertIncludes(
      "explicit authority readiness is the authorized adapter consumer",
      sources.explicitAuthorityReadiness,
      marker,
    ),
  );

  [
    'export type LifeJourneyStageAuthority = "original_self_life_journey_orchestrator"',
    "exclusiveAuthority: true",
    "noStageTransition: true",
    "noRuntimeAdapter: true",
  ].forEach((marker) => assertIncludes("stage authority remains exclusive", sources.authorityType, marker));

  [
    "resolveLifeJourneyStageEvidenceReviewReadiness",
    "LifeJourneyStageEvidenceReviewReadiness",
  ].forEach((marker) => assertExcludes("stage source stays independent", sources.stageSource, marker));

  [
    "lifeJourneyStageEvidenceReviewResolver",
    "lifeJourneyStageEvidenceReviewResultConsumption",
    "lifeJourneyStageEvidenceReviewEndpoint",
    "lifeJourneyStageEvidenceReviewReadiness",
  ].forEach((marker) => {
    assertExcludes("foundation stays independent", sources.foundationType, marker);
    assertExcludes("life schema stays independent", sources.lifeSchemaType, marker);
  });

  const chainSource = [
    sources.reviewType,
    sources.resolver,
    sources.consumption,
    sources.endpoint,
    sources.readiness,
    sources.authorityEvidenceInputAdapter,
    sources.explicitAuthorityReadiness,
    sources.explicitDeclarationCommand,
  ].join("\n");

  [
    "LifeJourneyStageAuthorityDeclaration",
    "LifeJourneyStageSourceInput",
    "lifeJourneyStageSource",
    "OriginalSelfState",
    "OriginalSelfLifeSchema",
    "fourSymbol",
    "StarBeast",
    "MotherCode",
    "Hexagram",
    "Gravity",
    "Dynamics",
    "CrystalState",
    "localStorage",
    "sessionStorage",
    'from "react"',
    'from "react-router-dom"',
    "fetch(",
    "/pages/",
    "/components/",
  ].forEach((marker) => assertExcludes("frozen review chain has no forbidden dependency", chainSource, marker));

  [
    "RC-LIFE-JOURNEY-STAGE-EVIDENCE-REVIEW-CHAIN-FREEZE-P29",
    "EVIDENCE REVIEW CHAIN FROZEN",
    "Review Contract",
    "Explicit Authority Decision Resolver",
    "Review Result Consumption",
    "Review Endpoint",
    "Review Outcome Readiness",
    "REJECTED 是有效完成的审查结果",
    "Resolver → 只由 Endpoint 调用",
    "Endpoint → 只由 Readiness 调用",
    "Readiness → 只由 Authority Evidence Input Adapter 调用",
    "Authority Evidence Input Adapter → 只由 Explicit Authority Declaration Readiness 调用",
    "Explicit Authority Declaration Readiness → 只由 Explicit Declaration Command 调用",
    "Adapter 不生成 Authority Declaration",
    "Readiness 不生成 Authority Declaration",
    "Command 不生成 Authority Declaration",
    "Review Outcome 等同于 Stage Declaration",
    "P29 不修改 P0–P28",
  ].forEach((marker) => assertIncludes("review chain freeze protocol", sources.protocol, marker));

  assertIncludes(
    "review chain freeze gate command is registered",
    packageJson.scripts?.["check:life-journey-stage-evidence-review-chain-freeze"] ?? "",
    "node scripts/check-life-journey-stage-evidence-review-chain-freeze.mjs",
  );
  assertIncludes(
    "review chain freeze gate participates in release",
    packageJson.scripts?.["check:release"] ?? "",
    "npm run check:life-journey-stage-evidence-review-chain-freeze",
  );
}

if (failures.length > 0) {
  console.error("\n[LIFE JOURNEY STAGE EVIDENCE REVIEW CHAIN FREEZE] FAIL");
  failures.forEach((failure) => console.error(`- ${failure}`));
  process.exit(1);
}

console.log("\n[LIFE JOURNEY STAGE EVIDENCE REVIEW CHAIN FREEZE] PASS");
