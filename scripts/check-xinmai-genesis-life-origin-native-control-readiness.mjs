import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import process from "node:process";
import { build } from "esbuild";

const root = process.cwd();
const temp = fs.mkdtempSync(
  path.join(os.tmpdir(), "xinmai-genesis-life-origin-readiness-"),
);
const entry = path.join(temp, "entry.ts");
const output = path.join(temp, "bundle.mjs");
const read = (relative) =>
  fs.readFileSync(path.join(root, relative), "utf8");
const assert = (condition, message) => {
  if (!condition) throw new Error(message);
};

try {
  fs.writeFileSync(
    entry,
    `export { resolveXinmaiGenesisLifeOriginNativeControlReadiness as resolve } from ${JSON.stringify(path.join(root, "src/services/xinmaiGenesisLifeOriginNativeControlReadinessResolver.ts"))};\nexport { XINMAI_GENESIS_LIFE_ORIGIN_NATIVE_CONTROL_PRESENTATION_POLICY as policy } from ${JSON.stringify(path.join(root, "src/services/xinmaiGenesisLifeOriginNativeControlPresentationPolicy.ts"))};`,
  );
  await build({
    entryPoints: [entry],
    outfile: output,
    bundle: true,
    platform: "node",
    format: "esm",
    target: "node20",
    logLevel: "silent",
  });
  const { resolve, policy } = await import(`file://${output}?t=${Date.now()}`);
  const sourceReferenceId = "launch:genesis-native-control";
  const routeAuthorization = {
    status: "READY",
    sourceReferenceId,
  };
  const consumerSourceResult = {
    status: "READY",
    consumerSource: { sourceReferenceId },
  };
  const productionRuntimeResult = {
    status: "READY",
    session: {
      sourceReferenceId,
      currentStage: "COMPLETION",
      runtimeStatus: "RECOGNITION_HOLD",
      interactionAvailability: "RECOGNITION_HOLD",
    },
  };
  const manifestationExperienceResult = {
    status: "READY",
    session: {
      sourceReferenceId,
      currentState: "PRESENCE_APPROACHING",
    },
  };
  const recognitionRealityResult = {
    status: "READY",
    session: {
      sourceReferenceId,
      phase: "AWAITING_RECOGNITION_CONFIRMATION",
      interactionAvailability: "RECOGNITION_CONFIRM",
      recognitionConfirmed: false,
      realityEntryConfirmed: false,
      realityEntryEligibility: "NOT_ELIGIBLE",
    },
  };
  const base = {
    policy: "ENABLED",
    routeAuthorization,
    consumerSourceResult,
    productionRuntimeResult,
    manifestationExperienceResult,
    recognitionRealityResult,
    discoveryPhase: "DORMANT",
    activationRevalidation: "CURRENT",
  };

  const ready = resolve(base);
  assert(
    ready.status === "READY" &&
      ready.controlOwner === "NATIVE_BUTTON" &&
      ready.sceneNearObject === "LIFE_ORIGIN" &&
      ready.sourceReferenceId === sourceReferenceId,
    "current typed readiness does not produce the unique native control",
  );
  const currentPolicyDecision = resolve({ ...base, policy });
  assert(
    policy === "ENABLED"
      ? currentPolicyDecision.status === "READY"
      : policy === "SAFE_WITHHELD" &&
          currentPolicyDecision.status === "SAFE_WITHHELD" &&
          currentPolicyDecision.reason === "PRESENTATION_PAUSED",
    "checked-in presentation policy is not consumed by the typed resolver",
  );
  assert(
    resolve({
      ...base,
      productionRuntimeResult: {
        ...productionRuntimeResult,
        session: {
          ...productionRuntimeResult.session,
          currentStage: "STAR_BEAST_REVEAL",
          runtimeStatus: "RUNNING",
          interactionAvailability: "NONE",
        },
      },
      recognitionRealityResult: null,
    }).status === "WAITING",
    "legal pre-completion progress is not WAITING",
  );
  assert(
    resolve({ ...base, recognitionRealityResult: null }).reason ===
      "RECOGNITION_SESSION_PENDING",
    "completion does not wait for recognition-session initialization",
  );
  assert(
    resolve({ ...base, discoveryPhase: "DISCOVERING" }).status ===
      "CONSUMED" &&
      resolve({ ...base, discoveryPhase: "REVEALED" }).status ===
        "CONSUMED",
    "discovery presentation can expose a duplicate native control",
  );
  assert(
    resolve({ ...base, policy: "SAFE_WITHHELD" }).reason ===
      "PRESENTATION_PAUSED",
    "forward policy does not safely withhold the control",
  );
  assert(
    resolve({
      ...base,
      activationRevalidation: "SAFE_WITHHELD",
    }).reason === "ACTIVATION_REVALIDATION_FAILED",
    "handler revalidation failure is silent",
  );
  assert(
    resolve({
      ...base,
      consumerSourceResult: {
        ...consumerSourceResult,
        consumerSource: { sourceReferenceId: "launch:other" },
      },
    }).reason === "SOURCE_REFERENCE_MISMATCH",
    "source-reference mismatch can expose READY",
  );
  assert(
    resolve({
      ...base,
      recognitionRealityResult: {
        status: "BLOCKED",
        reason: "SESSION_INVALID",
        session: null,
      },
    }).reason === "RECOGNITION_SESSION_BLOCKED",
    "blocked recognition session can expose READY",
  );
  assert(
    resolve({
      ...base,
      recognitionRealityResult: {
        ...recognitionRealityResult,
        session: {
          ...recognitionRealityResult.session,
          phase: "AWAITING_REALITY_ENTRY_CONFIRMATION",
          interactionAvailability: "ENTER_REALITY",
          recognitionConfirmed: true,
        },
      },
    }).status === "SAFE_WITHHELD",
    "advanced Recognition with DORMANT discovery can expose READY",
  );

  const resolverSource = read(
    "src/services/xinmaiGenesisLifeOriginNativeControlReadinessResolver.ts",
  );
  const pageSource = read("src/pages/GenesisProductionExperiencePage.tsx");
  const canvasHostSource = read(
    "src/components/GenesisProductionRendererCanvasHost.tsx",
  );
  const typeSource = read(
    "src/types/xinmaiGenesisLifeOriginNativeControlReadiness.ts",
  );
  const packageJson = JSON.parse(read("package.json"));

  for (const forbidden of [
    "localStorage",
    "sessionStorage",
    "indexedDB",
    "document.",
    "window.",
    "setTimeout",
    "setInterval",
    "requestAnimationFrame",
    "navigate(",
    "continuousSceneOutcome",
  ]) {
    assert(
      !resolverSource.includes(forbidden),
      `readiness resolver contains forbidden input/write path: ${forbidden}`,
    );
  }
  assert(
    typeSource.includes('status: "WAITING"') &&
      typeSource.includes('status: "READY"') &&
      typeSource.includes('status: "CONSUMED"') &&
      typeSource.includes('status: "SAFE_WITHHELD"'),
    "typed readiness union is incomplete",
  );
  assert(
    (pageSource.match(/data-genesis-life-origin-native-control="READY"/g) ?? [])
      .length === 1 &&
      pageSource.includes("resolveXinmaiGenesisLifeOriginNativeControlReadiness(") &&
      pageSource.includes("lifeOriginControlReadiness.status === \"READY\"") &&
      pageSource.includes("setLifeOriginActivationRevalidation(\"SAFE_WITHHELD\")"),
    "Page is not the single typed native-control owner",
  );
  assert(
    !canvasHostSource.includes("onLifeOriginDiscoveryRequest") &&
      !canvasHostSource.includes("<button") &&
      canvasHostSource.includes(
        'lifeOriginControlReadiness.status === "READY"',
      ) &&
      canvasHostSource.includes('pointerInteraction: "NONE" as const'),
    "CanvasHost still owns the native interaction or a second readiness path",
  );
  assert(
    packageJson.scripts?.[
      "check:xinmai-genesis-life-origin-native-control-readiness"
    ] ===
      "node scripts/check-xinmai-genesis-life-origin-native-control-readiness.mjs",
    "native-control readiness gate is not registered",
  );

  console.log(
    "[XINMAI GENESIS LIFE ORIGIN NATIVE CONTROL READINESS] PASS",
  );
} finally {
  fs.rmSync(temp, { recursive: true, force: true });
}
