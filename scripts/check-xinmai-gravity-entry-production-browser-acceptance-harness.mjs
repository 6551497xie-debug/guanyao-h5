import fs from "node:fs";
import path from "node:path";
import process from "node:process";

const rootDir = process.cwd();
const files = {
  vite: "vite.config.ts",
  packageManifest: "package.json",
  app: "src/App.tsx",
  acceptanceEntry: "src/acceptance/main.tsx",
  productionPort:
    "src/services/gravityEntryAcceptanceRuntimePort.ts",
  scenario:
    "src/acceptance/xinmaiGravityEntryAcceptanceScenario.ts",
  faultPort:
    "src/acceptance/xinmaiGravityEntryAcceptanceFaultPort.ts",
  panel:
    "src/acceptance/XinmaiGravityEntryAcceptanceEvidencePanel.tsx",
  runner:
    "scripts/run-xinmai-gravity-entry-production-browser-acceptance.mjs",
  realityRoute: "src/pages/RealityProductionRouteEntry.tsx",
  gravityRoute: "src/pages/GravityProductionRouteEntry.tsx",
  lifeSurface: "src/components/RealityLifeUniverseCanvas.tsx",
  observationSurface:
    "src/components/RealityGravityInertiaField.tsx",
  launch: "src/pages/LaunchLab.tsx",
  genesis: "src/pages/GenesisProductionExperiencePage.tsx",
  realityHost: "src/components/RealityProductionHost.tsx",
};

const source = Object.fromEntries(
  Object.entries(files).map(([name, file]) => [
    name,
    fs.readFileSync(path.join(rootDir, file), "utf8"),
  ]),
);

const pass = (name) => console.log(`PASS | ${name}`);
const assert = (name, condition, detail = "") => {
  if (!condition) {
    throw new Error(`${name}${detail ? ` | ${detail}` : ""}`);
  }
  pass(name);
};
const includes = (name, text, marker) =>
  assert(name, text.includes(marker), `missing=${marker}`);
const excludes = (name, text, marker) =>
  assert(name, !text.includes(marker), `forbidden=${marker}`);

includes(
  "existing acceptance build is reused",
  source.vite,
  'mode === "xinmai-acceptance"',
);
includes(
  "existing explicit-leave alias remains installed",
  source.vite,
  "xinmaiRealityExplicitLeaveNavigationDeliveryFaultPort.ts",
);
includes(
  "Gravity neutral port is replaced only in acceptance mode",
  source.vite,
  "xinmaiGravityEntryAcceptanceFaultPort.ts",
);
includes(
  "ordinary entry remains the production default",
  source.vite,
  '"/src/main.tsx"',
);

for (const marker of [
  "POSITIVE_MOTION",
  "POSITIVE_REDUCED_MOTION",
  "DIRECT_URL_WITHOUT_ADMISSION",
]) {
  includes(`scenario registry freezes ${marker}`, source.scenario, marker);
  includes(`runner exposes ${marker}`, source.runner, marker);
}

for (const marker of [
  "projectGravityLifeSurfaceOutcomes",
  "projectGravityObservationSurfaceOutcomes",
  "observeRealityToGravityCutoverResult",
  "observeGravityRouteGuard",
  "observeGravityRouteAdmissionResult",
  "observeGravityHostAcceptanceOutcome",
  "observeGravityActiveCommit",
]) {
  includes(`production port implements ${marker}`, source.productionPort, marker);
  includes(`acceptance port implements ${marker}`, source.faultPort, marker);
}

includes(
  "Reality cutover reports a typed transaction result",
  source.realityRoute,
  "observeRealityToGravityCutoverResult(cutover)",
);
includes(
  "Gravity route reports typed admission",
  source.gravityRoute,
  "observeGravityRouteAdmissionResult(routeAdmission)",
);
includes(
  "Gravity Host reports typed acceptance outcome",
  source.gravityRoute,
  "observeGravityHostAcceptanceOutcome(outcome)",
);
includes(
  "Controller commit remains the only Active observation",
  source.gravityRoute,
  "observeGravityActiveCommit(active)",
);
includes(
  "life surface projects typed outcomes through the neutral port",
  source.lifeSurface,
  "projectGravityLifeSurfaceOutcomes(typedOutcome)",
);
includes(
  "observation surface projects typed outcomes through the neutral port",
  source.observationSurface,
  "projectGravityObservationSurfaceOutcomes(typedOutcome)",
);

includes(
  "evidence panel is acceptance-only",
  source.panel,
  'data-xinmai-acceptance-harness="GRAVITY_ENTRY_PRODUCTION_BROWSER"',
);
includes(
  "same acceptance entry mounts the Gravity evidence panel",
  source.acceptanceEntry,
  "<XinmaiGravityEntryAcceptanceEvidencePanel />",
);
includes(
  "runner starts from the real new-user Launch entry",
  source.runner,
  "entryUser=new",
);
includes(
  "runner uses the production Dynamics direct URL",
  source.runner,
  '"/dynamics"',
);
includes(
  "Launch still executes the real source path",
  source.launch,
  "createLaunchLifeSourceSession({",
);
includes(
  "Genesis path exposes real recognition",
  source.genesis,
  "RECOGNITION_CONFIRM",
);
includes(
  "Genesis path exposes the real Reality intent",
  source.genesis,
  "ENTER_REALITY",
);
includes(
  "Reality exposes the real pressure recognition",
  source.realityHost,
  "PRESSURE_SEED_RECOGNIZE",
);

for (const forbidden of [
  "localStorage",
  "sessionStorage",
  "PressureSeed",
  "SixDimension",
  "Choice",
  "Crystal",
  "Renderer",
  "commitGravityEntryActive",
  "establishGravityRouteAdmission",
  "executeRealityToGravityCutover",
]) {
  excludes(
    `acceptance scenario and observer do not own ${forbidden}`,
    source.scenario + source.faultPort,
    forbidden,
  );
}

for (const marker of [
  "__xinmaiGravityEntryAcceptance",
  "POSITIVE_MOTION",
  "DIRECT_URL_WITHOUT_ADMISSION",
  "xinmai-gravity-entry-acceptance-evidence",
]) {
  excludes(`production neutral port excludes ${marker}`, source.productionPort, marker);
  excludes(`App excludes ${marker}`, source.app, marker);
}

includes(
  "package exposes the Gravity harness check",
  source.packageManifest,
  '"check:xinmai-gravity-entry-production-browser-acceptance-harness"',
);
includes(
  "package exposes the Gravity browser runner",
  source.packageManifest,
  '"accept:xinmai-gravity-entry"',
);

const productionDist = path.join(rootDir, "dist");
assert(
  "production dist exists for isolation proof",
  fs.existsSync(productionDist),
);
const productionBundle = fs
  .readdirSync(path.join(productionDist, "assets"))
  .filter((file) => file.endsWith(".js"))
  .map((file) =>
    fs.readFileSync(path.join(productionDist, "assets", file), "utf8"),
  )
  .join("\n");
for (const marker of [
  "__xinmaiGravityEntryAcceptance",
  "POSITIVE_REDUCED_MOTION",
  "DIRECT_URL_WITHOUT_ADMISSION",
  "xinmai-gravity-entry-acceptance-evidence",
]) {
  excludes(
    `production bundle excludes ${marker}`,
    productionBundle,
    marker,
  );
}

console.log(
  "PASS | XINMAI Gravity entry production browser acceptance harness",
);
