import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import process from "node:process";
import { build } from "esbuild";

const rootDir = process.cwd();
const paths = Object.freeze({
  type: "src/types/genesisPresenceApproachContinuityActivation.ts",
  service: "src/services/genesisPresenceApproachContinuityActivation.ts",
  page: "src/pages/GenesisProductionExperiencePage.tsx",
  experience: "src/services/genesisManifestationExperienceState.ts",
  presence: "src/services/genesisStarBeastPresenceVisualRealization.ts",
  host: "src/renderers/genesisProductionRendererHost.ts",
  renderer: "src/renderers/genesisWebGLRendererCore.ts",
  engine: "src/services/guanyaoStarbeastEngineService.ts",
  packageManifest: "package.json",
});
const source = Object.fromEntries(
  Object.entries(paths).map(([name, file]) => [
    name,
    fs.readFileSync(path.join(rootDir, file), "utf8"),
  ]),
);
const assertEqual = (name, actual, expected) => {
  if (actual !== expected) {
    throw new Error(
      `${name} expected=${String(expected)} actual=${String(actual)}`,
    );
  }
  console.log(`PASS | ${name}`);
};
const assertIncludes = (name, text, marker) => {
  if (!text.includes(marker)) throw new Error(`${name} missing=${marker}`);
  console.log(`PASS | ${name}`);
};
const assertExcludes = (name, text, marker) => {
  if (text.includes(marker)) throw new Error(`${name} forbidden=${marker}`);
  console.log(`PASS | ${name}`);
};

const tempDir = fs.mkdtempSync(
  path.join(os.tmpdir(), "guanyao-genesis-presence-approach-"),
);

try {
  [
    "GENESIS_PRESENCE_APPROACH_CONTINUITY_ACTIVATION",
    'experienceState: "PRESENCE_APPROACHING"',
    'previousExperienceState: "FORCE_CONDENSING"',
    'visualPresenceState: "APPROACHING"',
    'sourcePresenceState: "DORMANT"',
    'presenceOrigin: "EXISTING_IN_LIFE_COORDINATE"',
    'appearanceMeaning: "BECOMES_VISIBLE_NOT_GENERATED"',
    "noEntityGeneration: true",
    "noAssetGeneration: true",
    "noTimelineSpeedMutation: true",
  ].forEach((marker) =>
    assertIncludes("presence approach continuity contract", source.type, marker),
  );
  [
    "activateGenesisPresenceApproachContinuity",
    'experience.currentState !== "PRESENCE_APPROACHING"',
    'experience.previousState !== "FORCE_CONDENSING"',
    'presence.visualPresenceState !== "APPROACHING"',
    "experience.bridgeReferenceId !==",
    "experienceAndVisualPresenceAligned: true",
  ].forEach((marker) =>
    assertIncludes("presence approach continuity validation", source.service, marker),
  );
  [
    "resolveStarbeastFromBirthDate",
    "runFourSymbolEngine",
    "runMotherCodeLandingEngine",
    "createGenesisWebGLRendererCore",
    "setTimeout",
    "Date.now",
    "Math.random",
  ].forEach((marker) =>
    assertExcludes("continuity activation owns no Engine, Renderer, or timing", source.service, marker),
  );
  [
    "activateGenesisPresenceApproachContinuity",
    'session.currentStage !== "STAR_BEAST_REVEAL"',
    '"FORCE_CONDENSING"',
    '"PRESENCE_APPROACHING"',
    'visualPresenceState !==\n        "APPROACHING"',
    "data-genesis-presence-approach-continuity",
    'presenceApproachContinuityResult?.status === "READY"',
  ].forEach((marker) =>
    assertIncludes("production page activates aligned approach", source.page, marker),
  );
  assertIncludes(
    "frozen experience order remains authoritative",
    source.experience,
    'if (currentState === "FORCE_CONDENSING") return runtimeStage === "STAR_BEAST_REVEAL" && trigger === "AUTO_ADVANCE"',
  );
  assertIncludes(
    "existing Presence realization remains authoritative",
    source.presence,
    'runtimeStage === "STAR_BEAST_REVEAL" && recognitionPhase === "NOT_REACHED"',
  );
  assertExcludes(
    "Production Host remains unchanged by continuity activation",
    source.host,
    "GenesisPresenceApproachContinuityActivation",
  );
  assertExcludes(
    "Renderer remains unchanged by continuity activation",
    source.renderer,
    "GenesisPresenceApproachContinuityActivation",
  );
  assertExcludes(
    "Engine remains free of continuity activation",
    source.engine,
    "PresenceApproachContinuity",
  );

  const packageJson = JSON.parse(source.packageManifest);
  assertEqual(
    "presence approach continuity gate is registered",
    packageJson.scripts?.[
      "check-genesis-presence-approach-continuity-activation"
    ],
    "node scripts/check-genesis-presence-approach-continuity-activation.mjs",
  );

  const entryPath = path.join(tempDir, "presence-approach-entry.ts");
  const outPath = path.join(tempDir, "presence-approach-entry.mjs");
  fs.writeFileSync(
    entryPath,
    [
      "src/services/guanyaoLaunchOriginMotherInputAdapter.ts",
      "src/services/launchLifeSourceSession.ts",
      "src/services/launchLifeVisualSourceResolver.ts",
      "src/services/realUserGenesisVisualSourceContext.ts",
      "src/services/genesisProductionRouteAuthorization.ts",
      "src/services/genesisProductionRuntimeConsumer.ts",
      "src/services/genesisManifestationExperienceState.ts",
      "src/services/genesisStarBeastPresenceVisualRealization.ts",
      "src/services/genesisPresenceApproachContinuityActivation.ts",
    ]
      .map((file) =>
        `export * from ${JSON.stringify(path.join(rootDir, file))};`,
      )
      .join("\n"),
  );
  await build({
    entryPoints: [entryPath],
    outfile: outPath,
    bundle: true,
    platform: "node",
    format: "esm",
    target: "node20",
    logLevel: "silent",
  });
  const runtime = await import(`file://${outPath}?t=${Date.now()}`);
  runtime.clearRealUserGenesisVisualSourceContext();
  const sourceReferenceId = "launch:1995-06-02:酉时:广东:广州";
  const originResults = runtime.resolveLaunchOriginMotherSourceResults({
    birth: { year: 1995, month: 6, day: 2, hourBranch: "酉时" },
    periodIndex: 0,
    geo: { province: "广东", city: "广州" },
    starbeast: {
      nodeCount: 28,
      primaryNodeIndex: 0,
      originLightTrace: "28光兽入口",
    },
  });
  const lifeSession = runtime.createLaunchLifeSourceSession({
    sourceReferenceId,
    birthCoordinate: {
      year: 1995,
      month: 6,
      day: 2,
      hourBranch: "酉时",
    },
    ...originResults,
  });
  assertEqual("life session is available", lifeSession.status, "AVAILABLE");
  const visualResult = runtime.resolveLaunchLifeVisualSource(lifeSession.session);
  assertEqual("visual source is available", visualResult.status, "AVAILABLE");
  const activation = runtime.activateRealUserGenesisVisualSourceContext({
    lifeSourceSession: lifeSession.session,
    visualSourceAdapterInput: visualResult.input,
    visualSource: visualResult.visualSource,
  });
  assertEqual("real user context is available", activation.status, "AVAILABLE");
  const routeAuthorization = runtime.authorizeGenesisProductionRoute({
    routeTarget: "/genesis",
    sourceReferenceId,
  });
  const initializedRuntime = runtime.initializeGenesisProductionRuntime({
    routeAuthorization,
  });
  const bridge =
    visualResult.visualSource.projectionBundle.lifeForceManifestationBridge;
  let runtimeSession = initializedRuntime.session;
  let experienceResult = runtime.initializeGenesisManifestationExperienceState({
    runtimeSession,
    lifeForceManifestationBridge: bridge,
  });
  runtimeSession = runtime.advanceGenesisProductionRuntime({
    session: runtimeSession,
    trigger: "AUTO_ADVANCE",
  }).session;
  runtimeSession = runtime.advanceGenesisProductionRuntime({
    session: runtimeSession,
    trigger: "AUTO_ADVANCE",
  }).session;
  experienceResult = runtime.advanceGenesisManifestationExperienceState({
    session: experienceResult.session,
    runtimeSession,
    lifeForceManifestationBridge: bridge,
    trigger: "TIME_DELIVERY",
  });
  runtimeSession = runtime.advanceGenesisProductionRuntime({
    session: runtimeSession,
    trigger: "TIME_DELIVERY",
  }).session;
  for (let index = 0; index < 2; index += 1) {
    experienceResult = runtime.advanceGenesisManifestationExperienceState({
      session: experienceResult.session,
      runtimeSession,
      lifeForceManifestationBridge: bridge,
      trigger: "AUTO_ADVANCE",
    });
  }
  runtimeSession = runtime.advanceGenesisProductionRuntime({
    session: runtimeSession,
    trigger: "AUTO_ADVANCE",
  }).session;
  experienceResult = runtime.advanceGenesisManifestationExperienceState({
    session: experienceResult.session,
    runtimeSession,
    lifeForceManifestationBridge: bridge,
    trigger: "AUTO_ADVANCE",
  });
  runtimeSession = runtime.advanceGenesisProductionRuntime({
    session: runtimeSession,
    trigger: "AUTO_ADVANCE",
  }).session;
  experienceResult = runtime.advanceGenesisManifestationExperienceState({
    session: experienceResult.session,
    runtimeSession,
    lifeForceManifestationBridge: bridge,
    trigger: "AUTO_ADVANCE",
  });
  assertEqual("experience reaches Force Condensing", experienceResult.session.currentState, "FORCE_CONDENSING");
  runtimeSession = runtime.advanceGenesisProductionRuntime({
    session: runtimeSession,
    trigger: "AUTO_ADVANCE",
  }).session;
  assertEqual("runtime reaches StarBeast Reveal", runtimeSession.currentStage, "STAR_BEAST_REVEAL");
  const presenceResult = runtime.realizeGenesisStarBeastPresence({
    runtimeSession,
    lifeForceManifestationBridge: bridge,
    recognitionPhase: "NOT_REACHED",
  });
  assertEqual("existing Presence realization approaches", presenceResult.realization.visualPresenceState, "APPROACHING");
  experienceResult = runtime.advanceGenesisManifestationExperienceState({
    session: experienceResult.session,
    runtimeSession,
    lifeForceManifestationBridge: bridge,
    trigger: "AUTO_ADVANCE",
  });
  assertEqual("experience reaches Presence Approaching", experienceResult.session.currentState, "PRESENCE_APPROACHING");
  const continuity = runtime.activateGenesisPresenceApproachContinuity({
    manifestationExperienceSession: experienceResult.session,
    presenceVisualRealization: presenceResult.realization,
  });
  assertEqual("presence approach continuity is ready", continuity.status, "READY");
  assertEqual("continuity keeps real provenance", continuity.activation.sourceProvenance, "REAL_USER_SESSION");
  assertEqual("continuity follows manifestation source", continuity.activation.manifestationSourceReferenceId, bridge.provenance.manifestationSourceReferenceId);
  assertEqual("continuity does not generate presence", continuity.activation.sourcePresenceState, "DORMANT");
  assertEqual("continuity activation is immutable", Object.isFrozen(continuity.activation), true);

  const early = runtime.activateGenesisPresenceApproachContinuity({
    manifestationExperienceSession: {
      ...experienceResult.session,
      currentState: "FORCE_CONDENSING",
      previousState: "DIRECTION_AWAKENING",
    },
    presenceVisualRealization: presenceResult.realization,
  });
  assertEqual("Force Condensing cannot expose approach early", early.status, "BLOCKED");
  assertEqual("early approach reason", early.reason, "EXPERIENCE_STATE_INVALID");
  const mismatched = runtime.activateGenesisPresenceApproachContinuity({
    manifestationExperienceSession: experienceResult.session,
    presenceVisualRealization: {
      ...presenceResult.realization,
      sourceReferenceId: "launch:other-user",
    },
  });
  assertEqual("mismatched source cannot activate approach", mismatched.status, "BLOCKED");
  assertEqual("mismatched source reason", mismatched.reason, "SOURCE_REFERENCE_MISMATCH");

  console.log("\n[GENESIS PRESENCE APPROACH CONTINUITY ACTIVATION] PASS");
} catch (error) {
  console.error("[GENESIS PRESENCE APPROACH CONTINUITY ACTIVATION] FAIL");
  console.error(error instanceof Error ? error.message : error);
  process.exitCode = 1;
} finally {
  fs.rmSync(tempDir, { recursive: true, force: true });
}
