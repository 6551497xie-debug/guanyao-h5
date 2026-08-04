import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { pathToFileURL } from "node:url";
import { build } from "esbuild";

const root = process.cwd();
const read = (relativePath) =>
  fs.readFileSync(path.join(root, relativePath), "utf8");
const assert = (condition, message) => {
  if (!condition) throw new Error(message);
};

const types = read("src/types/xinmaiLivedResponseCheckpointPresentation.ts");
const resolver = read(
  "src/services/xinmaiLivedResponseCheckpointPresentationResolver.ts",
);
const surface = read("src/components/XinmaiLivedResponseReturnSurface.tsx");
const ownership = read(
  "src/components/XinmaiCrystalFormationOwnershipMoment.tsx",
);
const launch = read("src/pages/LaunchLab.tsx");
const styles = read("src/styles/xinmai-lived-response-checkpoint.css");
const packageJson = read("package.json");

const states = [
  "BASELINE_LIFE_WORLD",
  "RETURN_ACCEPTED_AWAITING_RESPONSE",
  "READY_TO_CONFIRM_REAL_RESPONSE",
  "FORMATION_IN_PROGRESS",
  "OWNERSHIP_PRESENTED",
  "SAFE_WITHHELD",
];
for (const state of states) {
  assert(types.includes(`"${state}"`), `missing checkpoint state ${state}`);
  assert(resolver.includes(`state: "${state}"`), `resolver omits ${state}`);
}

for (const forbidden of [
  "localStorage",
  "sessionStorage",
  "indexedDB",
  "document.",
  "window.",
  "setTimeout",
  "requestAnimationFrame",
  "PersonalityRingLite",
  "orchestrateProductionCrystalFormation",
  "confirmLivedResponseFact",
]) {
  assert(
    !resolver.includes(forbidden),
    `checkpoint resolver consumes forbidden input: ${forbidden}`,
  );
}

for (const marker of [
  'authorityWriteback: "FORBIDDEN"',
  "XINMAI_LIVED_RESPONSE_CHECKPOINT_PRESENTATION_POLICY",
  'readsStorage: false as const',
  'readsDom: false as const',
  'readsTimer: false as const',
  'successAuthority === "IDB_TRANSACTION_COMPLETE"',
  "returnAcceptanceIsCurrent",
  "requestMatchesAuthorities",
]) {
  assert(resolver.includes(marker), `resolver missing boundary ${marker}`);
}

for (const marker of [
  "resolveXinmaiLivedResponseCheckpointPresentation",
  "data-lived-response-checkpoint={checkpointDecision.state}",
  "formationRequestEvidence",
  "returnAcceptanceEvidence",
  "READY_TO_CONFIRM_REAL_RESPONSE",
  "不形成事实或 Crystal；这一步仍会等你。",
  "不记录、不形成，也没有惩罚。",
]) {
  assert(surface.includes(marker), `checkpoint consumer missing ${marker}`);
}

assert(
  !surface.includes('aria-label="现实回应回访"') &&
    !surface.includes("回访入口会在协调完成后开放"),
  "old internal/ambiguous checkpoint copy remains",
);
assert(
  ownership.includes("继续后会离开这段确认画面") &&
    !ownership.includes('aria-live="polite"') &&
    !ownership.includes('className="xinmai-crystal-ownership__meaning" role="status"'),
  "Ownership does not expose the exit consequence or duplicates live status",
);
assert(
  launch.includes("baselineCheckpointDecision.headline") &&
    launch.includes("baselineCheckpointDecision.support") &&
    launch.includes("bodyImprintDecision={canonicalBodyImprintDecision}") &&
    !launch.includes("你的生命仍在这里，") &&
    !launch.includes("等你继续同行。"),
  "LaunchLab still exposes the ambiguous completed-growth baseline",
);

for (const marker of [
  "min-height: 44px",
  "overflow-y: auto",
  "overflow-x: hidden",
  "100dvh",
  "safe-area-inset-bottom",
  "prefers-reduced-motion: reduce",
  ":focus-visible",
]) {
  assert(styles.includes(marker), `checkpoint layout gate missing ${marker}`);
}
assert(
  packageJson.includes('"check:xinmai-lived-response-visible-checkpoint"'),
  "checkpoint gate is not registered",
);

const output = path.join(
  os.tmpdir(),
  `xinmai-lived-response-checkpoint-${process.pid}.mjs`,
);
try {
  await build({
    entryPoints: [
      path.join(
        root,
        "src/services/xinmaiLivedResponseCheckpointPresentationResolver.ts",
      ),
    ],
    outfile: output,
    bundle: true,
    platform: "node",
    format: "esm",
    target: "es2022",
    logLevel: "silent",
  });
  const { resolveXinmaiLivedResponseCheckpointPresentation: resolve } =
    await import(`${pathToFileURL(output).href}?v=${Date.now()}`);
  const body = Object.freeze({
    status: "NO_CANONICAL_IMPRINT",
    bodyReferenceId: "body:one",
    identityReferences: Object.freeze({}),
    imprints: Object.freeze([]),
    focusedImprintReferenceId: null,
    reason: null,
  });
  const base = Object.freeze({
    identityStatus: "READY",
    admission: null,
    currentFact: null,
    currentEligibility: null,
    formationReceipt: null,
    formationRequestEvidence: null,
    returnAcceptanceEvidence: null,
    formationFailure: false,
    ownershipDecision: null,
    bodyImprintDecision: body,
    motionPreference: "MOTION",
  });
  const isCounter = /\|\s*"SAFE_WITHHELD"\s*=\s*"SAFE_WITHHELD"/.test(
    resolver,
  );
  if (isCounter) {
    assert(resolve(base).state === "SAFE_WITHHELD", "counter policy is not withheld");
  } else {
    assert(resolve(base).state === "BASELINE_LIFE_WORLD", "baseline mapping failed");
    const returnReceipt = Object.freeze({
      state: "READY_FOR_LIVED_RESPONSE",
      returnReceiptReferenceId: "return:accepted",
      choiceActionIntentionReferenceId: "choice:one",
      departureReceiptReferenceId: "departure:one",
    });
    const awaitingResponse = resolve({
      ...base,
      admission: Object.freeze({
        state: "DORMANT_DEPARTURE",
        intention: Object.freeze({
          choiceActionIntentionReferenceId: "choice:one",
        }),
        departureReceipt: Object.freeze({
          departureReceiptReferenceId: "departure:one",
        }),
      }),
      returnAcceptanceEvidence: Object.freeze({
        choiceActionIntentionReferenceId: "choice:one",
        returnReceipt,
      }),
    });
    assert(
      awaitingResponse.state === "RETURN_ACCEPTED_AWAITING_RESPONSE",
      "accepted Return checkpoint mapping failed",
    );
    const readyReceipt = Object.freeze({
      returnReceiptReferenceId: "return:one",
    });
    assert(
      resolve({ ...base, admission: { state: "READY_FOR_LIVED_RESPONSE", returnReceipt: readyReceipt } }).state ===
        "READY_TO_CONFIRM_REAL_RESPONSE",
      "ready response mapping failed",
    );
    const fact = Object.freeze({
      choiceActionIntentionReferenceId: "choice:one",
      livedResponseReferenceId: "fact:one",
    });
    const eligibility = Object.freeze({
      choiceActionIntentionReferenceId: "choice:one",
      livedResponseReferenceId: "fact:one",
      crystalEligibilityReferenceId: "eligibility:one",
      state: "FORMATION_PENDING",
    });
    const formationInput = {
      ...base,
      admission: Object.freeze({
        state: "TERMINAL_BY_GROWTH",
        intention: Object.freeze({
          choiceActionIntentionReferenceId: "choice:one",
        }),
      }),
      currentFact: fact,
      currentEligibility: eligibility,
      formationRequestEvidence: Object.freeze({
        choiceActionIntentionReferenceId: "choice:one",
        livedResponseReferenceId: "fact:one",
        crystalEligibilityReferenceId: "eligibility:one",
      }),
    };
    assert(
      resolve(formationInput).state === "FORMATION_IN_PROGRESS",
      "formation pending mapping failed",
    );
    assert(
      resolve({ ...formationInput, motionPreference: "REDUCED_MOTION" }).state ===
        resolve(formationInput).state,
      "motion preference changes checkpoint semantics",
    );
    assert(
      resolve({ ...base, identityStatus: "MISMATCH" }).state === "SAFE_WITHHELD",
      "identity mismatch is not withheld",
    );
    const receipt = Object.freeze({
      status: "FORMED",
      formationReferenceId: "formation:one",
      crystalReferenceId: "crystal:one",
      choiceActionIntentionReferenceId: "choice:one",
    });
    const ownershipDecision = Object.freeze({
      state: "FORMATION_CONFIRMED",
      visualFacts: Object.freeze({
        successAuthority: "IDB_TRANSACTION_COMPLETE",
        formationReferenceId: "formation:one",
        crystalReferenceId: "crystal:one",
        choiceActionIntentionReferenceId: "choice:one",
      }),
    });
    assert(
      resolve({ ...base, formationReceipt: receipt, ownershipDecision }).state ===
        "OWNERSHIP_PRESENTED",
      "Receipt-backed Ownership mapping failed",
    );
  }
} finally {
  fs.rmSync(output, { force: true });
}

console.log("[XINMAI LIVED RESPONSE VISIBLE CHECKPOINT] PASS");
