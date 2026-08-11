import { readFileSync } from "node:fs";
import { resolve } from "node:path";

const read = (path) =>
  readFileSync(resolve(process.cwd(), path), "utf8");

const returning = read("src/components/XinmaiLivedResponseReturnSurface.tsx");
const launch = read("src/pages/LaunchLab.tsx");
const route = read("src/pages/RealityProductionRouteEntry.tsx");
const host = read("src/components/RealityProductionHost.tsx");
const resolutionProof = read(
  "src/services/xinmaiChoiceReturnResolutionProofAdapter.ts",
);
const nextCycle = read(
  "src/services/xinmaiPostOwnershipNextRealityCycleController.ts",
);

const requireSource = (source, fragment, message) => {
  if (!source.includes(fragment)) {
    throw new Error(message);
  }
};

requireSource(
  returning,
  "onNextRealityCycleRequest",
  "The completed Return surface must issue a typed next-cycle command.",
);
if (returning.includes("returnReceipt.realityProof.realityIntentReferenceId")) {
  throw new Error("Completed Return surface still routes with the historical Intent.");
}
requireSource(
  returning,
  "returnReceiptReferenceId:",
  "The lived-response Fact must consume the exact Return Receipt.",
);
requireSource(
  launch,
  '"POST_OWNERSHIP_FRESH_INTENT"',
  "Launch must navigate only with a fresh post-Ownership Intent.",
);
requireSource(
  nextCycle,
  'origin: "CHOICE_CONTINUATION"',
  "The next Reality cycle must use the existing typed Intent Controller.",
);
requireSource(
  route,
  "readXinmaiChoiceReturnResolutionProof",
  "Reality Route Entry must revalidate the Growth resolution proof.",
);
requireSource(
  route,
  "choiceReturn={choiceReturn}",
  "Reality Route Entry must pass the typed return marker to its host.",
);
requireSource(
  host,
  'choiceReturn === "CHOICE_RETURN_LIVED_RESPONSE_RESOLVED"',
  "Reality Host must consume the typed resolved-return marker.",
);
requireSource(
  host,
  'data-choice-body-continuity="SAME_CORE_SAME_BODY"',
  "The resolved response must continue on the same life body.",
);
requireSource(
  host,
  'data-choice-life-trace-pressure-role="MEMORY_INFLUENCE_NOT_CURRENT_PRESSURE"',
  "Historical pressure must remain memory rather than current Reality.",
);
requireSource(
  resolutionProof,
  'returnReceipt.state === "CONSUMED_BY_FACT"',
  "The route proof must require a Return Receipt consumed by a Fact.",
);

for (const forbidden of [
  "RESTORE_OLD_PRESSURE",
  "CRYSTAL_GENERATED",
  "成长完成",
  "获得奖励",
  "升级",
]) {
  if (
    returning.includes(forbidden) ||
    route.includes(forbidden) ||
    host.includes(forbidden) ||
    resolutionProof.includes(forbidden)
  ) {
    throw new Error(`Forbidden continuity claim detected: ${forbidden}`);
  }
}

console.log("XINMAI life trace -> new Reality continuity gate: PASS");
