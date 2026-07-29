import fs from "node:fs";
import path from "node:path";
import process from "node:process";

const rootDir = process.cwd();
const files = {
  vite: "vite.config.ts",
  packageManifest: "package.json",
  app: "src/App.tsx",
  launch: "src/pages/LaunchLab.tsx",
  productionPort:
    "src/services/realityExplicitLeaveNavigationDeliveryRuntimePort.ts",
  acceptanceScenario:
    "src/acceptance/xinmaiRealityExplicitLeaveNavigationDeliveryAcceptanceScenario.ts",
  acceptanceFaultPort:
    "src/acceptance/xinmaiRealityExplicitLeaveNavigationDeliveryFaultPort.ts",
  acceptanceEntry: "src/acceptance/main.tsx",
  acceptancePanel:
    "src/acceptance/XinmaiExplicitLeaveAcceptanceEvidencePanel.tsx",
  runner:
    "scripts/run-xinmai-reality-explicit-leave-browser-acceptance.mjs",
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
  "acceptance mode owns the alternate entry",
  source.vite,
  'mode === "xinmai-acceptance"',
);
includes(
  "acceptance mode replaces the neutral runtime port",
  source.vite,
  "xinmaiRealityExplicitLeaveNavigationDeliveryFaultPort.ts",
);
includes(
  "ordinary entry remains the production default",
  source.vite,
  '"/src/main.tsx"',
);

for (const marker of [
  "__xinmaiExplicitLeaveAcceptance",
  "NAVIGATION_INVOCATION_FAILS_ONCE",
  "WATCHDOG_SUPPRESSES_FIRST_OUTCOME",
  "IDENTITY_MISMATCH_ON_FIRST_ATTEMPT",
  "RETURNING_SURFACE_UNAVAILABLE_ON_FIRST_ATTEMPT",
  "STALE_ATTEMPT_PRECEDES_CURRENT_OUTCOME",
  "xinmai-explicit-leave-acceptance-evidence",
]) {
  excludes(
    `production runtime port excludes ${marker}`,
    source.productionPort,
    marker,
  );
  excludes(`App excludes ${marker}`, source.app, marker);
  excludes(`Launch excludes ${marker}`, source.launch, marker);
}

for (const marker of [
  "NAVIGATION_INVOCATION_FAILS_ONCE",
  "WATCHDOG_SUPPRESSES_FIRST_OUTCOME",
  "IDENTITY_MISMATCH_ON_FIRST_ATTEMPT",
  "RETURNING_SURFACE_UNAVAILABLE_ON_FIRST_ATTEMPT",
  "STALE_ATTEMPT_PRECEDES_CURRENT_OUTCOME",
]) {
  includes(
    `scenario registry freezes ${marker}`,
    source.acceptanceScenario,
    marker,
  );
  includes(
    `fault port consumes ${marker}`,
    source.acceptanceFaultPort,
    marker,
  );
}

for (const marker of [
  "invokeRealityExplicitLeaveNavigation",
  "projectRealityExplicitLeaveNavigationDeliveryTicket",
  "projectReturningLifeWorldSurfaceReady",
  "projectReturningLifeWorldDeliveryOutcomes",
]) {
  includes(
    `production port implements ${marker}`,
    source.productionPort,
    marker,
  );
  includes(
    `acceptance port implements ${marker}`,
    source.acceptanceFaultPort,
    marker,
  );
}

includes(
  "App invokes navigation through the neutral port",
  source.app,
  "invokeRealityExplicitLeaveNavigation(navigate, ticket)",
);
includes(
  "Launch reports only typed projected outcomes",
  source.launch,
  "projectReturningLifeWorldDeliveryOutcomes(",
);
includes(
  "Launch projects returning surface readiness",
  source.launch,
  "projectReturningLifeWorldSurfaceReady(",
);

for (const forbidden of [
  "localStorage",
  "sessionStorage",
  "PressureSeed",
  "SixDimension",
  "Gravity",
  "Choice",
  "Crystal",
  "Renderer",
]) {
  excludes(
    `acceptance scenario does not consume ${forbidden}`,
    source.acceptanceScenario + source.acceptanceFaultPort,
    forbidden,
  );
}

includes(
  "acceptance panel exposes a browser-visible evidence surface",
  source.acceptancePanel,
  'data-xinmai-acceptance-harness="EXPLICIT_LEAVE_NAVIGATION_DELIVERY"',
);
includes(
  "acceptance runner requires an explicit scenario",
  source.runner,
  "--scenario",
);
includes(
  "package exposes explicit acceptance mode only",
  source.packageManifest,
  '"dev:xinmai-explicit-leave-acceptance"',
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
  "__xinmaiExplicitLeaveAcceptance",
  "NAVIGATION_INVOCATION_FAILS_ONCE",
  "xinmai-explicit-leave-acceptance-evidence",
  "XINMAI_ACCEPTANCE_NAVIGATION_FAILURE",
]) {
  excludes(
    `production bundle excludes ${marker}`,
    productionBundle,
    marker,
  );
}

console.log(
  "PASS | XINMAI explicit-leave navigation browser acceptance harness",
);
