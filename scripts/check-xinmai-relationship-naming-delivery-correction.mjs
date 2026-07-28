import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import process from "node:process";
import { build } from "esbuild";

const rootDir = process.cwd();
const presentationStatePath = path.join(
  rootDir,
  "src/services/xinmaiRelationshipNamingPresentationState.ts",
);
const genesisPagePath = path.join(
  rootDir,
  "src/pages/GenesisProductionExperiencePage.tsx",
);
const launchPagePath = path.join(rootDir, "src/pages/LaunchLab.tsx");
const tempModulePath = path.join(
  os.tmpdir(),
  `xinmai-relationship-naming-delivery-correction-${process.pid}.mjs`,
);

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

try {
  await build({
    entryPoints: [presentationStatePath],
    outfile: tempModulePath,
    bundle: true,
    platform: "node",
    format: "esm",
    target: "node20",
    logLevel: "silent",
  });

  const presentation = await import(
    `file://${tempModulePath}?t=${Date.now()}`
  );
  const skippedEligibility =
    presentation.resolveRelationshipNamingEntryEligibility({
      lifeWhisperEntryReady: true,
      lifeWhisperFact: "WHISPER_SKIPPED",
      lifeWhisperResponsePhase: "SKIPPED",
    });
  assertEqual(
    "Gate A skipped whisper reaches optional naming",
    skippedEligibility.status,
    "READY",
  );
  assertEqual(
    "Gate A skipped whisper does not counterfeit settled response",
    skippedEligibility.source,
    "WHISPER_SKIPPED",
  );
  assertEqual(
    "Gate A skipped whisper does not trigger starbeast response",
    skippedEligibility.triggerStarBeastResponse,
    false,
  );
  assertEqual(
    "Gate A naming remains optional",
    skippedEligibility.namingOptional,
    true,
  );
  assertEqual(
    "Gate A Reality remains nonblocking",
    skippedEligibility.realityEntryBlocked,
    false,
  );

  const respondingEligibility =
    presentation.resolveRelationshipNamingEntryEligibility({
      lifeWhisperEntryReady: true,
      lifeWhisperFact: "WHISPER_SUBMITTED",
      lifeWhisperResponsePhase: "RESPONDING",
    });
  assertEqual(
    "submitted whisper waits for confirmed response settling",
    respondingEligibility.status,
    "NOT_READY",
  );
  const settledEligibility =
    presentation.resolveRelationshipNamingEntryEligibility({
      lifeWhisperEntryReady: true,
      lifeWhisperFact: "WHISPER_SUBMITTED",
      lifeWhisperResponsePhase: "SETTLED",
    });
  assertEqual(
    "submitted and settled whisper reaches naming",
    settledEligibility.status,
    "READY",
  );
  assertEqual(
    "submitted path names its truthful source",
    settledEligibility.source,
    "WHISPER_RESPONSE_SETTLED",
  );
  const realityIntentCases = [
    ["undecided whisper cannot enter Reality", "NONE", "DORMANT", false],
    [
      "responding whisper cannot enter Reality",
      "WHISPER_SUBMITTED",
      "RESPONDING",
      false,
    ],
    [
      "settled whisper can enter Reality",
      "WHISPER_SUBMITTED",
      "SETTLED",
      true,
    ],
    [
      "explicit silence can enter Reality",
      "WHISPER_SKIPPED",
      "SKIPPED",
      true,
    ],
  ];
  for (const [name, lifeWhisperFact, lifeWhisperResponsePhase, expected] of
    realityIntentCases) {
    assertEqual(
      name,
      presentation.resolveFirstEncounterRealityEntryIntent({
        lifeWhisperFact,
        lifeWhisperResponsePhase,
      }),
      expected,
    );
  }

  const confirmedAsset = Object.freeze({
    schemaVersion: "XINMAI_STARBEAST_RELATIONSHIP_NAMING_ASSET_V1",
    sourceReferenceId: "life-source-user-a",
    starBeastIdentityReferenceId: "starbeast-identity-user-a",
    mansionCoordinateReferenceId: "mansion-coordinate-user-a",
    relationshipName: "静泉",
    createdAt: "2026-07-28T00:00:00.000Z",
    updatedAt: "2026-07-28T00:00:00.000Z",
    revision: 1,
  });
  const lastConfirmed = Object.freeze({
    status: "AVAILABLE",
    asset: confirmedAsset,
  });
  const unconfirmedDelete =
    presentation.resolveRelationshipNameDeletePresentation({
      lastConfirmedRelationshipNaming: lastConfirmed,
      deleteOutcome: "DELETE_UNCONFIRMED",
    });
  assertEqual(
    "Gate B unconfirmed delete keeps confirmed named state",
    unconfirmedDelete.relationshipNaming.status,
    "AVAILABLE",
  );
  assertEqual(
    "Gate B unconfirmed delete keeps confirmed name",
    unconfirmedDelete.relationshipNaming.asset.relationshipName,
    "静泉",
  );
  assertEqual(
    "Gate B unconfirmed delete exposes truthful feedback",
    unconfirmedDelete.feedback,
    "DELETE_UNCONFIRMED",
  );
  assertEqual(
    "Gate B unconfirmed delete allows retry",
    unconfirmedDelete.canRetry,
    true,
  );
  assertEqual(
    "Gate B unconfirmed delete does not block Reality",
    unconfirmedDelete.realityEntryBlocked,
    false,
  );

  for (const confirmedOutcome of ["DELETED", "ALREADY_UNNAMED"]) {
    const confirmedDelete =
      presentation.resolveRelationshipNameDeletePresentation({
        lastConfirmedRelationshipNaming: lastConfirmed,
        deleteOutcome: confirmedOutcome,
      });
    assertEqual(
      `${confirmedOutcome} enters unnamed only after authoritative outcome`,
      confirmedDelete.relationshipNaming.status,
      "UNNAMED",
    );
    assertEqual(
      `${confirmedOutcome} clears failure feedback`,
      confirmedDelete.feedback,
      null,
    );
  }

  const genesisSource = fs.readFileSync(genesisPagePath, "utf8");
  const launchSource = fs.readFileSync(launchPagePath, "utf8");
  assertIncludes(
    "Genesis consumes the shared naming eligibility behavior",
    genesisSource,
    "resolveRelationshipNamingEntryEligibility",
  );
  assertIncludes(
    "Genesis consumes explicit relation intent for Reality entry",
    genesisSource,
    "resolveFirstEncounterRealityEntryIntent",
  );
  assertIncludes(
    "Reality handler rejects unresolved relation intent",
    genesisSource,
    "!lifeWhisperRelationIntentResolved",
  );
  assertIncludes(
    "returning UI consumes authoritative delete outcome",
    launchSource,
    "deleteOutcome: deleteResult.outcome",
  );
  assertIncludes(
    "returning UI keeps an explicit unconfirmed-delete fact",
    launchSource,
    'setReturningRelationshipNameFeedback(presentation.feedback)',
  );

  console.log(
    "\n[XINMAI RELATIONSHIP NAMING DELIVERY CORRECTION] PASS",
  );
} catch (error) {
  console.error(
    "[XINMAI RELATIONSHIP NAMING DELIVERY CORRECTION] FAIL",
  );
  console.error(error instanceof Error ? error.stack ?? error.message : error);
  process.exit(1);
} finally {
  fs.rmSync(tempModulePath, { force: true });
}
