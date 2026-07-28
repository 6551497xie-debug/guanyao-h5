import { readFileSync } from "node:fs";
import { resolve } from "node:path";

const read = (path) =>
  readFileSync(resolve(process.cwd(), path), "utf8");

const launch = read("src/pages/LaunchLab.tsx");
const routeEntry = read("src/pages/RealityProductionRouteEntry.tsx");
const host = read("src/components/RealityProductionHost.tsx");
const canvas = read("src/components/RealityLifeUniverseCanvas.tsx");

const requireSource = (source, fragment, message) => {
  if (!source.includes(fragment)) {
    throw new Error(message);
  }
};

requireSource(
  launch,
  'returningEntry: "SAME_LIFE_NEW_REALITY"',
  "Returning life world must explicitly enter a new Reality encounter.",
);
requireSource(
  launch,
  "latestCrystalSourceSlot",
  "Returning life world must carry the original Crystal body position.",
);
requireSource(
  routeEntry,
  "PostCommitAdmissionTransactionState",
  "A returning entry must establish its new current-event activation after Route commit.",
);
requireSource(
  routeEntry,
  "clearRealityRouteActivationSourceContextForAdmission",
  "A stale returning transaction may clear only its own cycle-scoped activation.",
);
requireSource(
  host,
  'data-reality-entry-cycle="NEW_REALITY_ENCOUNTER"',
  "Reality must begin a new encounter rather than replay history.",
);
requireSource(
  host,
  '"MEMORY_ONLY"',
  "Historical pressure may only be consumed as memory.",
);
requireSource(
  host,
  '"AWAITING_NEW_RECOGNITION"',
  "A new Reality must await a newly recognized current event.",
);
requireSource(
  canvas,
  'data-reality-life-memory="PAST_AS_TEXTURE_NOT_CURRENT_EVENT"',
  "Past experience must remain a texture, not the current event.",
);
requireSource(
  canvas,
  'data-reality-crystal-imprint-direction="SAME_RESPONSE_POSITION_INTO_SAME_BODY"',
  "Crystal must remain at the same response position on the same body.",
);
requireSource(
  canvas,
  'data-reality-crystal-imprint-status="REMEMBERED_NOT_CURRENT_EVENT"',
  "Crystal must be remembered without becoming the current event.",
);

if (
  canvas.includes(
    '<rect\n                x={lifeMemoryGeometry.latestCrystal.target[0]',
  )
) {
  throw new Error(
    "Reality Crystal must not return as an independent collectible square.",
  );
}

console.log(
  "XINMAI returning imprint -> new Reality continuity gate: PASS",
);
