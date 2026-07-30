import process from "node:process";
import { spawn } from "node:child_process";

const acceptedScenarios = new Set([
  "REALITY_ADVENTURE_MOTION",
  "REALITY_ADVENTURE_REDUCED_MOTION",
  "REALITY_ADVENTURE_DIRECT_URL",
]);
const argument = process.argv.find((value) =>
  value.startsWith("--scenario="),
);
const scenario = argument?.slice("--scenario=".length) ?? null;
if (scenario === null || !acceptedScenarios.has(scenario)) {
  console.error(
    `Usage: npm run accept:xinmai-reality-adventure-continuity -- --scenario=${[
      ...acceptedScenarios,
    ].join("|")}`,
  );
  process.exit(1);
}
const portArgument = process.argv.find((value) =>
  value.startsWith("--port="),
);
const port = portArgument?.slice("--port=".length) ?? "5196";
const pathname =
  scenario === "REALITY_ADVENTURE_DIRECT_URL"
    ? "/dynamics"
    : "/launch-lab";
const entryQuery =
  scenario === "REALITY_ADVENTURE_DIRECT_URL"
    ? ""
    : "entryUser=new&";
const url =
  `http://127.0.0.1:${port}${pathname}?${entryQuery}` +
  `__xinmaiGravityEntryAcceptance=${encodeURIComponent(scenario)}`;

console.log(`Acceptance scenario: ${scenario}`);
console.log(`Open in a real browser: ${url}`);
console.log(
  "Use only production Launch → Genesis → Reality → Gravity controls; the acceptance panel is read-only evidence.",
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
