import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import process from "node:process";
import { pathToFileURL } from "node:url";
import { build } from "esbuild";

const rootDir = process.cwd();
const tempDir = fs.mkdtempSync(
  path.join(os.tmpdir(), "xinmai-choice-action-route-authority-"),
);
const outfile = path.join(tempDir, "authority.mjs");
const failures = [];

const pass = (name) => console.log(`PASS | ${name}`);
const assertEqual = (name, actual, expected) => {
  if (actual !== expected) {
    failures.push(
      `${name} expected=${String(expected)} actual=${String(actual)}`,
    );
  } else pass(name);
};
const assertTrue = (name, value) => {
  if (!value) failures.push(`${name} expected=true actual=false`);
  else pass(name);
};
const assertIncludes = (name, source, marker) => {
  if (!source.includes(marker)) failures.push(`${name} missing=${marker}`);
  else pass(name);
};
const assertExcludes = (name, source, marker) => {
  if (source.includes(marker)) failures.push(`${name} forbidden=${marker}`);
  else pass(name);
};

await build({
  stdin: {
    contents: `
      export { resolveChoiceActionRoutes } from "./src/services/xinmaiChoiceActionRouteResolver.ts";
      export { validateChoiceActionRouteCandidate } from "./src/services/xinmaiChoiceActionRouteValidator.ts";
      export { XINMAI_CHOICE_ACTION_ROUTE_PROTOTYPE_CATALOG } from "./src/data/xinmaiChoiceActionRoutePrototypeCatalog.ts";
      export { GUANYAO_PRESSURE_SEED_MATRIX_V2 } from "./src/data/guanyaoPressureSeedMatrix.ts";
      export { guanyaoMotherCodeRegistry, toMotherCodeProfile } from "./src/data/guanyaoMotherCodeRegistry.ts";
    `,
    resolveDir: rootDir,
    sourcefile: "xinmai-choice-action-route-authority-entry.ts",
    loader: "ts",
  },
  outfile,
  bundle: true,
  platform: "node",
  format: "esm",
  target: "node20",
  logLevel: "silent",
});

const runtime = await import(
  `${pathToFileURL(outfile).href}?t=${Date.now()}`
);
const seeds = runtime.GUANYAO_PRESSURE_SEED_MATRIX_V2.flatMap(
  (node) =>
    node.seeds.map((seed) => ({
      ...seed,
      pressureField: node.pressureField,
    })),
);
const mothers = runtime.guanyaoMotherCodeRegistry.map((definition) => ({
  definition,
  profile: runtime.toMotherCodeProfile(definition),
}));
const prototypeIds = new Set(
  runtime.XINMAI_CHOICE_ACTION_ROUTE_PROTOTYPE_CATALOG.map(
    (prototype) => prototype.prototypeId,
  ),
);
const observedPrototypeIds = new Set();
const observedRouteReferences = new Set();
let readyCount = 0;
let survivalWithheldCount = 0;
let invalidCount = 0;

const identityReferences = Object.freeze({
  sourceReferenceId: "source:action-route-gate",
  starBeastIdentityReferenceId: "starbeast:action-route-gate",
  mansionCoordinateReferenceId: "mansion:action-route-gate",
});

for (const seed of seeds) {
  for (const { definition, profile } of mothers) {
    const input = Object.freeze({
      identityReferences,
      sourceEncounterCycleId:
        `encounter:${seed.id}:${definition.trigram}`,
      gravityCycleId: `gravity:${seed.id}:${definition.trigram}`,
      gravityObservationReferenceId:
        `observation:${seed.id}:${definition.trigram}`,
      observationCheckpointRevision: 2,
      observationStatus: "OBSERVATION_RECOGNIZED",
      pressure: Object.freeze({
        selectedPressureSeedId: seed.id,
        candidateReferenceId: `candidate:${seed.id}`,
        pressureField: seed.pressureField,
        pressureNature: seed.pressureNature,
      }),
      motherCode: Object.freeze({
        motherCodeProfileId: profile.motherCodeId,
        motherCodeDefinitionId: String(definition.motherCodeId),
        lowerTrigram: definition.trigram,
      }),
    });
    const first = runtime.resolveChoiceActionRoutes(input);
    const second = runtime.resolveChoiceActionRoutes(
      Object.freeze({
        ...input,
        identityReferences: Object.freeze({
          ...input.identityReferences,
        }),
        pressure: Object.freeze({ ...input.pressure }),
        motherCode: Object.freeze({ ...input.motherCode }),
      }),
    );
    if (seed.pressureNature === "SURVIVAL") {
      if (
        first.status !== "SAFE_WITHHELD" ||
        first.reason !== "SURVIVAL_CONTEXT_SAFE_WITHHELD" ||
        first.candidates.length !== 0
      ) {
        invalidCount += 1;
      } else {
        survivalWithheldCount += 1;
      }
      continue;
    }
    if (
      first.status !== "READY" ||
      second.status !== "READY" ||
      first.routeSetReferenceId !== second.routeSetReferenceId ||
      first.candidates.length === 0 ||
      first.candidates.length > 3
    ) {
      invalidCount += 1;
      continue;
    }
    readyCount += 1;
    const firstReferences = first.candidates.map(
      (candidate) => candidate.actionRouteReferenceId,
    );
    const secondReferences = second.candidates.map(
      (candidate) => candidate.actionRouteReferenceId,
    );
    if (JSON.stringify(firstReferences) !== JSON.stringify(secondReferences)) {
      invalidCount += 1;
    }
    for (const candidate of first.candidates) {
      const validation =
        runtime.validateChoiceActionRouteCandidate(candidate, input);
      if (
        validation.status !== "VALID" ||
        candidate.safety.safetyLevel !==
          "P0_LOW_RISK_REVERSIBLE" ||
        candidate.provenance.aiHasNoAuthority !== true ||
        candidate.provenance.userHasNotActedYet !== true
      ) {
        invalidCount += 1;
      }
      observedPrototypeIds.add(candidate.prototypeId);
      observedRouteReferences.add(candidate.actionRouteReferenceId);
    }
  }
}

assertEqual("Pressure Seed count", seeds.length, 90);
assertEqual("Mother Code count", mothers.length, 8);
assertEqual("seven frozen prototypes", prototypeIds.size, 7);
assertEqual("704 non-Survival combinations are ready", readyCount, 704);
assertEqual(
  "16 Survival combinations are safe-withheld",
  survivalWithheldCount,
  16,
);
assertEqual("invalid matrix outcomes", invalidCount, 0);
assertEqual(
  "all seven prototypes are produced",
  observedPrototypeIds.size,
  7,
);
assertTrue(
  "route references are not collapsed across lineages",
  observedRouteReferences.size >= readyCount,
);

const sourcePaths = [
  "src/types/xinmaiChoiceActionRoute.ts",
  "src/data/xinmaiChoiceActionRoutePrototypeCatalog.ts",
  "src/services/xinmaiChoiceActionRouteResolver.ts",
  "src/services/xinmaiChoiceActionRouteValidator.ts",
  "src/services/xinmaiChoiceActionRouteRuntimeInputAdapter.ts",
];
const source = sourcePaths
  .map((sourcePath) =>
    fs.readFileSync(path.join(rootDir, sourcePath), "utf8"),
  )
  .join("\n");
for (const marker of [
  "localStorage",
  "sessionStorage",
  "indexedDB",
  "Math.random",
  "Date.now",
  "new Date",
  "prefers-reduced-motion",
]) {
  assertExcludes("Route authority remains pure", source, marker);
}
for (const marker of [
  "P0_LOW_RISK_REVERSIBLE",
  "SURVIVAL_CONTEXT_SAFE_WITHHELD",
  "CURATED_PARAMETERIZED_PROTOTYPE",
  "aiHasNoAuthority: true",
  "CURRENT_RECOGNIZED_OBSERVATION_ONLY",
]) {
  assertIncludes("Route product boundary is explicit", source, marker);
}

if (failures.length > 0) {
  console.error("\n[XINMAI CHOICE ACTION ROUTE AUTHORITY] FAIL");
  for (const failure of failures) console.error(`- ${failure}`);
  process.exitCode = 1;
} else {
  console.log("\n[XINMAI CHOICE ACTION ROUTE AUTHORITY] PASS");
}
