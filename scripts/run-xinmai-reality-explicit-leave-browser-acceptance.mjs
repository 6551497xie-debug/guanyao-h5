import process from "node:process";
import { spawn } from "node:child_process";

const acceptedScenarios = new Set([
  "NAVIGATION_INVOCATION_FAILS_ONCE",
  "WATCHDOG_SUPPRESSES_FIRST_OUTCOME",
  "IDENTITY_MISMATCH_ON_FIRST_ATTEMPT",
  "RETURNING_SURFACE_UNAVAILABLE_ON_FIRST_ATTEMPT",
  "STALE_ATTEMPT_PRECEDES_CURRENT_OUTCOME",
]);

const argument = process.argv.find((value) =>
  value.startsWith("--scenario="),
);
const scenario = argument?.slice("--scenario=".length) ?? null;
if (scenario === null || !acceptedScenarios.has(scenario)) {
  console.error(
    `Usage: npm run accept:xinmai-explicit-leave-navigation -- --scenario=${[
      ...acceptedScenarios,
    ].join("|")}`,
  );
  process.exit(1);
}

const portArgument = process.argv.find((value) =>
  value.startsWith("--port="),
);
const port = portArgument?.slice("--port=".length) ?? "5193";
const url =
  `http://127.0.0.1:${port}/launch-lab?` +
  `__xinmaiExplicitLeaveAcceptance=${encodeURIComponent(scenario)}`;

console.log(`Acceptance scenario: ${scenario}`);
console.log(`Open in a real browser: ${url}`);
console.log(
  "The fixed evidence panel is acceptance-only and records the typed fault path.",
);

const vite = spawn(
  process.platform === "win32"
    ? "node_modules/.bin/vite.cmd"
    : "node_modules/.bin/vite",
  [
    "--mode",
    "xinmai-acceptance",
    "--host",
    "127.0.0.1",
    "--port",
    port,
    "--strictPort",
  ],
  {
    cwd: process.cwd(),
    stdio: "inherit",
  },
);

const stop = () => {
  if (!vite.killed) vite.kill("SIGTERM");
};
process.once("SIGINT", stop);
process.once("SIGTERM", stop);
vite.once("exit", (code) => process.exit(code ?? 0));
