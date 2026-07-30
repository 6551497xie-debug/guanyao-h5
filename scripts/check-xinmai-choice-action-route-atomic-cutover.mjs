import fs from "node:fs";

const paths = Object.freeze({
  type: "src/types/xinmaiChoiceActionIntention.ts",
  controller:
    "src/services/xinmaiChoiceActionIntentionController.ts",
  validator:
    "src/services/xinmaiChoiceActionIntentionPrerequisiteValidator.ts",
  policy:
    "src/services/xinmaiChoiceActionRouteRuntimePolicy.ts",
  resolver:
    "src/services/xinmaiChoicePresentationReadinessResolver.ts",
  host: "src/components/GravityProductionSurfaceHost.tsx",
  page: "src/pages/GravityPage.tsx",
  fixture: "src/pages/GravityDevelopmentFixtureRouteEntry.tsx",
  legacyPresentationAdapter:
    "src/services/guanyaoDynamicsChangeExperienceRuntimeAdapter.ts",
});
const source = Object.fromEntries(
  Object.entries(paths).map(([name, sourcePath]) => [
    name,
    fs.readFileSync(sourcePath, "utf8"),
  ]),
);
const failures = [];
const requireSource = (name, text, marker) => {
  if (!text.includes(marker)) failures.push(`${name} missing=${marker}`);
  else console.log(`PASS | ${name}`);
};
const forbidSource = (name, text, marker) => {
  if (text.includes(marker)) failures.push(`${name} forbidden=${marker}`);
  else console.log(`PASS | ${name}`);
};

for (const marker of [
  '"XINMAI_CHOICE_ACTION_INTENTION_V2"',
  "actionRouteSnapshot: ChoiceActionRouteSnapshot",
  "actionRouteResolverInput: ChoiceActionRouteResolverInput",
  "selectedActionRouteReferenceId: string",
]) {
  requireSource("Choice V2 owns selected Route Snapshot", source.type, marker);
}
for (const marker of [
  "transactXinmaiGravityObservationContinuity(",
  "resolveChoiceActionRoutes(",
  "validateChoiceActionIntentionPrerequisites(input)",
  "actionRouteSnapshot: Object.freeze({",
  'lifecycle: "CONSUMED_BY_CHOICE" as const',
  'sourceAuthority:',
  '"XINMAI_CHOICE_ACTION_ROUTE_AUTHORITY" as const',
  'lifecycleState: "CONSUMED_BY_CHOICE" as const',
]) {
  requireSource(
    "Route and Observation commit in one existing transaction",
    source.controller,
    marker,
  );
}
requireSource(
  "transaction revalidates Route after Observation reread",
  source.controller,
  "const currentRouteResolution = resolveChoiceActionRoutes(",
);
requireSource(
  "shared structural validator re-resolves Route",
  source.validator,
  "const routeResolution = resolveChoiceActionRoutes(",
);
requireSource(
  "production Host resolves typed Routes",
  source.host,
  "resolveProductionChoiceActionRoutes({",
);
requireSource(
  "production Host passes typed Routes",
  source.host,
  "actionRouteResolution={actionRouteResolution}",
);
requireSource(
  "presentation consumes only typed Route decision",
  source.page,
  "choicePresentationDecision.actionRouteCandidate",
);
requireSource(
  "development Fixture is safe-withheld",
  source.fixture,
  'reason: "OBSERVATION_NOT_RECOGNIZED" as const',
);
requireSource(
  "legacy smoke input is development-only",
  source.legacyPresentationAdapter,
  "import.meta.env.DEV",
);
requireSource(
  "production Host supplies no smoke Fixture",
  source.host,
  "experienceSmokeFixture={null}",
);
requireSource(
  "forward pause has a single policy switch",
  source.policy,
  "resolveXinmaiChoiceActionRouteRuntimeMode",
);
requireSource(
  "forward pause preserves an explicit safe-withheld mode",
  source.policy,
  '"SAFE_WITHHELD"',
);
for (const text of [
  source.controller,
  source.validator,
  source.resolver,
]) {
  forbidSource(
    "legacy Route proof no longer grants Choice",
    text,
    "changeExperienceRouteProof",
  );
}
forbidSource(
  "legacy page Boolean does not grant Choice",
  source.page,
  "isRevisionActionPending",
);
forbidSource(
  "old global presentation pause is removed",
  source.resolver,
  "XINMAI_NEW_CHOICE_PRESENTATION_MUTATIONS_PAUSED",
);
for (const marker of [
  "localStorage",
  "sessionStorage",
  "indexedDB",
]) {
  forbidSource(
    "no independent Route Storage",
    [
      source.validator,
      source.policy,
      source.resolver,
      source.host,
    ].join("\n"),
    marker,
  );
}

if (failures.length > 0) {
  console.error("\n[XINMAI CHOICE ACTION ROUTE ATOMIC CUTOVER] FAIL");
  for (const failure of failures) console.error(`- ${failure}`);
  process.exitCode = 1;
} else {
  console.log("\n[XINMAI CHOICE ACTION ROUTE ATOMIC CUTOVER] PASS");
}
